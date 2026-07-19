const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;
const dataDir = process.env.DATA_DIR || root;
const dataFile = path.join(dataDir, "data.json");
const backupDir = path.join(dataDir, "backups");
const dailyBackupMs = 24 * 60 * 60 * 1000;
const backupFilePattern = /^data-[\w-]+\.json$/;

const defaultData = {
  settings: { exchangeRate: 0.22, displayCurrency: "JPY" },
  orders: [
    { id: "O-001", customer: "林小姐", productId: "P-001", item: "藥妝補貨", quantity: 1, unitPrice: 12800, total: 12800, status: "報價中" },
    { id: "O-002", customer: "Cho", productId: "P-002", item: "限定周邊", quantity: 2, unitPrice: 6800, total: 13600, status: "已採購" },
  ],
  products: [
    { id: "P-001", name: "藥妝補貨", customer: "林小姐", price: 12800, shippingCost: 0, salePrice: 12800, stock: 0, image: "" },
    { id: "P-002", name: "限定周邊", customer: "Cho", price: 6800, shippingCost: 0, salePrice: 6800, stock: 0, image: "" },
  ],
  purchaseItems: [
    { id: "I-001", productId: "P-001", item: "藥妝補貨", supplier: "大阪藥妝店", quantity: 1, unitCost: 11800, shippingCost: 500, transportCost: 0, totalCost: 12300, status: "待採購", stocked: false },
  ],
  inventoryLogs: [],
  packages: [{ id: "B-001", no: "JP-WH-001", customer: "林小姐", status: "日本倉入庫" }],
  shipping: [{ id: "S-001", customer: "林小姐", method: "空運", status: "待出貨" }],
  customers: [
    { id: "C-001", name: "林小姐", contact: "LINE: lin.jp", paymentStatus: "未付款" },
    { id: "C-002", name: "Cho", contact: "LINE: cho", paymentStatus: "已付款" },
  ],
  payments: [
    { id: "A-001", productId: "P-001", type: "product", payer: "kosei", note: "", amount: 12800 },
    { id: "A-002", productId: "P-002", type: "product", payer: "cho", note: "", amount: 6800 },
  ],
  splitPayments: [],
  settlementPayments: [],
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function ensureDataFile() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(backupDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function writeBackup(reason = "auto") {
  ensureDataFile();
  if (!fs.existsSync(dataFile)) return;
  const file = `data-${reason}-${timestamp()}.json`;
  fs.copyFileSync(dataFile, path.join(backupDir, file));
  const backups = fs.readdirSync(backupDir).filter((file) => backupFilePattern.test(file)).sort().reverse();
  backups.slice(30).forEach((file) => fs.unlinkSync(path.join(backupDir, file)));
  return file;
}

function safeBackupPath(file) {
  if (!backupFilePattern.test(file)) return "";
  const fullPath = path.join(backupDir, file);
  return fullPath.startsWith(backupDir) ? fullPath : "";
}

function normalizeData(data) {
  const merged = { ...defaultData, ...data, settings: { ...defaultData.settings, ...(data.settings || {}) } };
  merged.purchaseItems = merged.purchaseItems || [];
  merged.inventoryLogs = merged.inventoryLogs || [];
  merged.splitPayments = merged.splitPayments || [];
  merged.settlementPayments = merged.settlementPayments || [];
  merged.products = (merged.products || []).map((product) => ({ ...product, price: Number(product.price || 0), shippingCost: Number(product.shippingCost || 0), salePrice: Number(product.salePrice || product.price || 0), stock: Number(product.stock || 0), image: product.image || "" }));
  merged.customers = (merged.customers || []).map((customer) => ({ ...customer, paymentStatus: customer.paymentStatus || "未付款" }));
  const customersByName = new Map((merged.customers || []).map((customer) => [customer.name, customer]));
  const packagesByCustomer = new Map((merged.packages || []).map((pack) => [pack.customer, pack]));
  const shippingByCustomer = new Map((merged.shipping || []).map((shipment) => [shipment.customer, shipment]));
  merged.orders = (merged.orders || []).map((order) => {
    const product = (merged.products || []).find((item) => item.id === order.productId || item.name === order.item);
    const customer = customersByName.get(order.customer) || {};
    const pack = packagesByCustomer.get(order.customer) || {};
    const shipment = shippingByCustomer.get(order.customer) || {};
    const quantity = Number(order.quantity || 1);
    const unitPrice = Number(order.unitPrice || product?.price || order.total || 0);
    return {
      ...order,
      productId: order.productId || product?.id || "",
      item: order.item || product?.name || "",
      contact: order.contact || customer.contact || "",
      packageNo: order.packageNo || pack.no || "",
      shippingMethod: order.shippingMethod || shipment.method || "",
      stockDeducted: Boolean(order.stockDeducted),
      status: order.status || customer.paymentStatus || shipment.status || pack.status || "報價中",
      quantity,
      unitPrice,
      total: Number(order.total || quantity * unitPrice),
    };
  });
  merged.purchaseItems = (merged.purchaseItems || []).map((item) => {
    const product = (merged.products || []).find((productItem) => productItem.id === item.productId || productItem.name === item.item);
    const quantity = Number(item.quantity || 1);
    const unitCost = Number(item.unitCost || item.totalCost || product?.price || 0);
    const shippingCost = Number(item.shippingCost || 0);
    const transportCost = Number(item.transportCost || 0);
    return { ...item, productId: item.productId || product?.id || "", item: item.item || product?.name || "", quantity, unitCost, shippingCost, transportCost, totalCost: Number(item.totalCost || quantity * unitCost + shippingCost + transportCost), status: item.status || "待採購", stocked: Boolean(item.stocked) };
  });
  merged.inventoryLogs = (merged.inventoryLogs || []).map((log) => ({
    ...log,
    quantity: Number(log.quantity || 0),
    beforeStock: Number(log.beforeStock || 0),
    afterStock: Number(log.afterStock || 0),
    createdAt: log.createdAt || new Date().toISOString(),
  }));
  merged.payments = (merged.payments || []).map((payment) => ({ ...payment, productId: payment.type === "shipping" ? "" : payment.productId || "", type: payment.type || "product", note: payment.note || "", amount: Number(payment.amount || 0) }));
  merged.splitPayments = (merged.splitPayments || []).map((payment) => ({ ...payment, receiver: payment.receiver || "kosei", note: payment.note || "", amount: Number(payment.amount || 0), createdAt: payment.createdAt || new Date().toISOString() }));
  merged.settlementPayments = (merged.settlementPayments || []).map((payment) => {
    let receiver = payment.receiver || "kosei";
    const payer = payment.payer || (receiver === "kosei" ? "cho" : "kosei");
    if (payer === receiver) receiver = payer === "kosei" ? "cho" : "kosei";
    return { ...payment, type: payment.type || "advance", payer, receiver, note: payment.note || "", amount: Number(payment.amount || 0), createdAt: payment.createdAt || new Date().toISOString() };
  });
  return merged;
}

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8_000_000) request.destroy();
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function serveFile(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^[/\\]+/, "");
  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);
  const indexPath = path.join(root, "index.html");

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(indexPath, (indexError, indexContent) => {
        if (indexError) {
          response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          response.end("Not found");
          return;
        }
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
        response.end(indexContent);
      });
      return;
    }
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  });
}

ensureDataFile();
setInterval(() => writeBackup("daily"), dailyBackupMs);

const server = http.createServer(async (request, response) => {
  if (request.url === "/api/data" && request.method === "GET") {
    ensureDataFile();
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    fs.createReadStream(dataFile).pipe(response);
    return;
  }

  if (request.url === "/api/data" && request.method === "POST") {
    try {
      const body = await readBody(request);
      const data = normalizeData(JSON.parse(body));
      writeBackup("before-save");
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { ok: false });
    }
    return;
  }

  if (request.url === "/api/backups" && request.method === "GET") {
    ensureDataFile();
    sendJson(response, 200, { backups: fs.readdirSync(backupDir).filter((file) => backupFilePattern.test(file)).sort().reverse() });
    return;
  }

  if (request.url === "/api/backups" && request.method === "POST") {
    try {
      ensureDataFile();
      const file = writeBackup("manual");
      sendJson(response, 200, { ok: true, file });
    } catch {
      sendJson(response, 500, { ok: false });
    }
    return;
  }

  if (request.url.startsWith("/api/backups/") && request.method === "GET") {
    ensureDataFile();
    const file = decodeURIComponent(request.url.replace("/api/backups/", ""));
    const backupPath = safeBackupPath(file);
    if (!backupPath || !fs.existsSync(backupPath)) {
      sendJson(response, 404, { ok: false });
      return;
    }
    sendJson(response, 200, normalizeData(JSON.parse(fs.readFileSync(backupPath, "utf8"))));
    return;
  }

  if (request.url === "/api/restore" && request.method === "POST") {
    try {
      ensureDataFile();
      const body = await readBody(request);
      const { file } = JSON.parse(body);
      const backupPath = safeBackupPath(file || "");
      if (!backupPath || !fs.existsSync(backupPath)) {
        sendJson(response, 404, { ok: false });
        return;
      }
      writeBackup("before-restore");
      const data = normalizeData(JSON.parse(fs.readFileSync(backupPath, "utf8")));
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
      sendJson(response, 200, { ok: true, restored: file });
    } catch {
      sendJson(response, 400, { ok: false });
    }
    return;
  }

  if (request.method === "GET") {
    serveFile(request, response);
    return;
  }

  response.writeHead(405);
  response.end("Method not allowed");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`ERP server running: http://localhost:${port}`);
});
