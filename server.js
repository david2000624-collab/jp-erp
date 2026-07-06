const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;
const dataDir = process.env.DATA_DIR || root;
const dataFile = path.join(dataDir, "data.json");
const backupDir = path.join(dataDir, "backups");

const defaultData = {
  settings: { exchangeRate: 0.22 },
  orders: [
    { id: "O-001", customer: "林小姐", productId: "P-001", item: "藥妝補貨", quantity: 1, unitPrice: 12800, total: 12800, status: "報價中" },
    { id: "O-002", customer: "Cho", productId: "P-002", item: "限定周邊", quantity: 2, unitPrice: 6800, total: 13600, status: "已採購" },
  ],
  products: [
    { id: "P-001", name: "藥妝補貨", customer: "林小姐", price: 12800 },
    { id: "P-002", name: "限定周邊", customer: "Cho", price: 6800 },
  ],
  packages: [{ id: "B-001", no: "JP-WH-001", customer: "林小姐", status: "日本倉入庫" }],
  shipping: [{ id: "S-001", customer: "林小姐", method: "空運", status: "待出貨" }],
  customers: [
    { id: "C-001", name: "林小姐", contact: "LINE: lin.jp", paymentStatus: "未付款" },
    { id: "C-002", name: "Cho", contact: "LINE: cho", paymentStatus: "已付款" },
  ],
  payments: [
    { id: "A-001", productId: "P-001", payer: "kosei", amount: 12800 },
    { id: "A-002", productId: "P-002", payer: "cho", amount: 6800 },
  ],
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
  const name = `data-${reason}-${timestamp()}.json`;
  fs.copyFileSync(dataFile, path.join(backupDir, name));
  const backups = fs
    .readdirSync(backupDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .reverse();
  backups.slice(30).forEach((file) => fs.unlinkSync(path.join(backupDir, file)));
}

function normalizeData(data) {
  const merged = { ...defaultData, ...data, settings: { ...defaultData.settings, ...(data.settings || {}) } };
  merged.customers = (merged.customers || []).map((customer) => ({
    ...customer,
    paymentStatus: customer.paymentStatus || "未付款",
  }));
  merged.orders = (merged.orders || []).map((order) => {
    const product = (merged.products || []).find((item) => item.id === order.productId || item.name === order.item);
    const quantity = Number(order.quantity || 1);
    const unitPrice = Number(order.unitPrice || product?.price || order.total || 0);
    return {
      ...order,
      productId: order.productId || product?.id || "",
      item: order.item || product?.name || "",
      quantity,
      unitPrice,
      total: Number(order.total || quantity * unitPrice),
    };
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
      if (body.length > 2_000_000) request.destroy();
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
setInterval(() => writeBackup("scheduled"), 6 * 60 * 60 * 1000);

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
    sendJson(response, 200, {
      backups: fs.readdirSync(backupDir).filter((file) => file.endsWith(".json")).sort().reverse(),
    });
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
