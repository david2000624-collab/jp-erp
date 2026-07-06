const accounts = {
  kosei: "0000",
  cho: "0624",
};

const translations = {
  zh: {
    appSubtitle: "日本代購後台",
    loginTitle: "代購 ERP",
    language: "語言",
    account: "帳號",
    password: "密碼",
    login: "登入",
    logout: "登出",
    todayWork: "今日工作",
    dashboard: "總覽",
    pendingOrders: "待處理訂單",
    warehouseItems: "倉庫包裹",
    shipments: "待出貨",
    advanceTotal: "代墊總額",
    orders: "訂單",
    products: "商品",
    packages: "包裹",
    shipping: "出貨",
    customers: "客戶",
    accounting: "對帳",
    addOrder: "新增訂單",
    addProduct: "新增商品",
    addPackage: "新增包裹",
    addShipment: "新增出貨",
    addCustomer: "新增客戶",
    addPayment: "新增付款",
    save: "儲存",
    customerName: "客戶姓名",
    itemName: "商品名稱",
    priceYen: "商品金額 JPY",
    paidAmount: "付款金額 JPY",
    koseiAdvance: "kosei 代墊",
    choAdvance: "cho 代墊",
    loginFailed: "帳號或密碼錯誤",
    noData: "目前沒有資料",
    paidBy: "付款人",
    amount: "金額",
    customer: "客戶",
    status: "狀態",
    method: "方式",
    contact: "聯絡方式",
  },
  ja: {
    appSubtitle: "日本購入代行バックオフィス",
    loginTitle: "購入代行 ERP",
    language: "言語",
    account: "アカウント",
    password: "パスワード",
    login: "ログイン",
    logout: "ログアウト",
    todayWork: "本日の業務",
    dashboard: "概要",
    pendingOrders: "未処理注文",
    warehouseItems: "倉庫荷物",
    shipments: "出荷待ち",
    advanceTotal: "立替合計",
    orders: "注文",
    products: "商品",
    packages: "荷物",
    shipping: "出荷",
    customers: "顧客",
    accounting: "精算",
    addOrder: "注文追加",
    addProduct: "商品追加",
    addPackage: "荷物追加",
    addShipment: "出荷追加",
    addCustomer: "顧客追加",
    addPayment: "支払い追加",
    save: "保存",
    customerName: "顧客名",
    itemName: "商品名",
    priceYen: "商品金額 JPY",
    paidAmount: "支払金額 JPY",
    koseiAdvance: "kosei 立替",
    choAdvance: "cho 立替",
    loginFailed: "アカウントまたはパスワードが違います",
    noData: "データがありません",
    paidBy: "支払者",
    amount: "金額",
    customer: "顧客",
    status: "状態",
    method: "方法",
    contact: "連絡先",
  },
};

const defaultData = {
  orders: [
    { id: "O-001", customer: "林小姐", item: "藥妝補貨", status: "報價中" },
    { id: "O-002", customer: "Cho", item: "限定周邊", status: "已採購" },
  ],
  products: [
    { id: "P-001", name: "藥妝補貨", customer: "林小姐", price: 12800 },
    { id: "P-002", name: "限定周邊", customer: "Cho", price: 6800 },
  ],
  packages: [{ id: "B-001", no: "JP-WH-001", customer: "林小姐", status: "日本倉入庫" }],
  shipping: [{ id: "S-001", customer: "林小姐", method: "空運", status: "待出貨" }],
  customers: [
    { id: "C-001", name: "林小姐", contact: "LINE: lin.jp" },
    { id: "C-002", name: "Cho", contact: "LINE: cho" },
  ],
  payments: [
    { id: "A-001", productId: "P-001", payer: "kosei", amount: 12800 },
    { id: "A-002", productId: "P-002", payer: "cho", amount: 6800 },
  ],
};

const hasServer = location.protocol !== "file:";
const state = {
  lang: localStorage.getItem("erpLang") || "zh",
  currentUser: localStorage.getItem("erpUser") || "",
  data: loadLocalData(),
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadLocalData() {
  const saved = localStorage.getItem("erpData");
  return saved ? JSON.parse(saved) : clone(defaultData);
}

async function syncFromServer() {
  if (!hasServer) return;
  try {
    const response = await fetch("./api/data", { cache: "no-store" });
    if (!response.ok) return;
    state.data = await response.json();
    localStorage.setItem("erpData", JSON.stringify(state.data));
    renderAll();
  } catch {
    // Local file mode keeps using browser storage.
  }
}

async function saveData() {
  localStorage.setItem("erpData", JSON.stringify(state.data));
  if (!hasServer) return;

  try {
    await fetch("./api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.data),
    });
  } catch {
    // If the server is offline, the user can still keep local data.
  }
}

function money(amount) {
  return `¥${Number(amount || 0).toLocaleString()}`;
}

function text(key) {
  return translations[state.lang][key] || translations.zh[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "ja" ? "ja" : "zh-Hant";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = text(node.dataset.i18nPlaceholder);
  });
  document.querySelector("#loginLang").value = state.lang;
  document.querySelector("#appLang").value = state.lang;
  localStorage.setItem("erpLang", state.lang);
  renderAll();
}

function setLanguage(lang) {
  state.lang = lang;
  applyLanguage();
}

function showApp() {
  document.querySelector("#loginScreen").classList.add("hidden");
  document.querySelector("#appShell").classList.remove("hidden");
  renderAll();
  syncFromServer();
}

function showLogin() {
  document.querySelector("#loginScreen").classList.remove("hidden");
  document.querySelector("#appShell").classList.add("hidden");
}

function activateView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".tab, .bottom-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
}

function badgeClass(status) {
  if (status.includes("待") || status.includes("報價")) return "pill warn";
  if (status.includes("已")) return "pill blue";
  return "pill";
}

function emptyList() {
  return `<div class="item-card"><span class="meta">${text("noData")}</span></div>`;
}

function renderOrders() {
  const html = state.data.orders
    .map(
      (order) => `
        <article class="item-card">
          <div class="item-top">
            <strong>${order.item}</strong>
            <span class="${badgeClass(order.status)}">${order.status}</span>
          </div>
          <span class="meta">${text("customer")}: ${order.customer} / ${order.id}</span>
        </article>
      `,
    )
    .join("");
  document.querySelector("#orderList").innerHTML = html || emptyList();
}

function renderProducts() {
  const html = state.data.products
    .map(
      (product) => `
        <article class="item-card">
          <div class="item-top">
            <strong>${product.name}</strong>
            <span class="pill">${money(product.price)}</span>
          </div>
          <span class="meta">${text("customer")}: ${product.customer} / ${product.id}</span>
        </article>
      `,
    )
    .join("");
  document.querySelector("#productList").innerHTML = html || emptyList();
}

function renderPackages() {
  const html = state.data.packages
    .map(
      (pack) => `
        <article class="item-card">
          <div class="item-top">
            <strong>${pack.no}</strong>
            <span class="${badgeClass(pack.status)}">${pack.status}</span>
          </div>
          <span class="meta">${text("customer")}: ${pack.customer}</span>
        </article>
      `,
    )
    .join("");
  document.querySelector("#packageList").innerHTML = html || emptyList();
}

function renderShipping() {
  const html = state.data.shipping
    .map(
      (shipment) => `
        <article class="item-card">
          <div class="item-top">
            <strong>${shipment.customer}</strong>
            <span class="${badgeClass(shipment.status)}">${shipment.status}</span>
          </div>
          <span class="meta">${text("method")}: ${shipment.method} / ${shipment.id}</span>
        </article>
      `,
    )
    .join("");
  document.querySelector("#shippingList").innerHTML = html || emptyList();
}

function renderCustomers() {
  const html = state.data.customers
    .map(
      (customer) => `
        <article class="item-card">
          <div class="item-top">
            <strong>${customer.name}</strong>
            <span class="pill">${customer.id}</span>
          </div>
          <span class="meta">${text("contact")}: ${customer.contact}</span>
        </article>
      `,
    )
    .join("");
  document.querySelector("#customerList").innerHTML = html || emptyList();
}

function renderAccounting() {
  const productSelect = document.querySelector("#paymentProduct");
  productSelect.innerHTML = state.data.products
    .map((product) => `<option value="${product.id}">${product.name} / ${product.customer} / ${money(product.price)}</option>`)
    .join("");

  const totals = state.data.payments.reduce(
    (sum, payment) => {
      sum[payment.payer] += Number(payment.amount || 0);
      return sum;
    },
    { kosei: 0, cho: 0 },
  );

  document.querySelector("#koseiAdvance").textContent = money(totals.kosei);
  document.querySelector("#choAdvance").textContent = money(totals.cho);
  document.querySelector("#advanceTotal").textContent = money(totals.kosei + totals.cho);

  const html = state.data.payments
    .map((payment) => {
      const product = state.data.products.find((item) => item.id === payment.productId);
      return `
        <article class="item-card">
          <div class="item-top">
            <strong>${product ? product.name : payment.productId}</strong>
            <span class="pill">${money(payment.amount)}</span>
          </div>
          <span class="meta">${text("paidBy")}: ${payment.payer} / ${product ? product.customer : ""}</span>
        </article>
      `;
    })
    .join("");
  document.querySelector("#paymentList").innerHTML = html || emptyList();
}

function renderSummary() {
  document.querySelector("#pendingOrders").textContent = state.data.orders.filter((order) => order.status !== "已入庫").length;
  document.querySelector("#warehouseItems").textContent = state.data.packages.length;
  document.querySelector("#shipmentCount").textContent = state.data.shipping.filter((item) => item.status === "待出貨").length;
}

function renderAll() {
  if (!document.querySelector("#appShell")) return;
  renderOrders();
  renderProducts();
  renderPackages();
  renderShipping();
  renderCustomers();
  renderAccounting();
  renderSummary();
}

function nextId(prefix, list) {
  return `${prefix}-${String(list.length + 1).padStart(3, "0")}`;
}

document.querySelector("#loginBtn").addEventListener("click", () => {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  if (accounts[username] === password) {
    state.currentUser = username;
    localStorage.setItem("erpUser", username);
    document.querySelector("#loginError").textContent = "";
    showApp();
    return;
  }
  document.querySelector("#loginError").textContent = text("loginFailed");
});

document.querySelector("#logoutBtn").addEventListener("click", () => {
  state.currentUser = "";
  localStorage.removeItem("erpUser");
  showLogin();
});

document.querySelector("#loginLang").addEventListener("change", (event) => setLanguage(event.target.value));
document.querySelector("#appLang").addEventListener("change", (event) => setLanguage(event.target.value));

document.querySelectorAll(".tab, .bottom-link").forEach((button) => {
  button.addEventListener("click", () => activateView(button.dataset.view));
});

document.querySelectorAll("[data-open-form]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.openForm}`).classList.toggle("hidden");
  });
});

document.querySelector("#orderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.orders.unshift({
    id: nextId("O", state.data.orders),
    customer: document.querySelector("#orderCustomer").value.trim(),
    item: document.querySelector("#orderItem").value.trim(),
    status: document.querySelector("#orderStatus").value,
  });
  event.target.reset();
  saveData();
  renderAll();
});

document.querySelector("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.products.unshift({
    id: nextId("P", state.data.products),
    name: document.querySelector("#productName").value.trim(),
    customer: document.querySelector("#productCustomer").value.trim(),
    price: Number(document.querySelector("#productPrice").value || 0),
  });
  event.target.reset();
  saveData();
  renderAll();
});

document.querySelector("#packageForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.packages.unshift({
    id: nextId("B", state.data.packages),
    no: document.querySelector("#packageNo").value.trim(),
    customer: document.querySelector("#packageCustomer").value.trim(),
    status: document.querySelector("#packageStatus").value,
  });
  event.target.reset();
  saveData();
  renderAll();
});

document.querySelector("#shippingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.shipping.unshift({
    id: nextId("S", state.data.shipping),
    customer: document.querySelector("#shippingCustomer").value.trim(),
    method: document.querySelector("#shippingMethod").value,
    status: document.querySelector("#shippingStatus").value,
  });
  event.target.reset();
  saveData();
  renderAll();
});

document.querySelector("#customerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.customers.unshift({
    id: nextId("C", state.data.customers),
    name: document.querySelector("#customerName").value.trim(),
    contact: document.querySelector("#customerLine").value.trim(),
  });
  event.target.reset();
  saveData();
  renderAll();
});

document.querySelector("#accountingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.payments.unshift({
    id: nextId("A", state.data.payments),
    productId: document.querySelector("#paymentProduct").value,
    payer: document.querySelector("#paymentPayer").value,
    amount: Number(document.querySelector("#paymentAmount").value || 0),
  });
  event.target.reset();
  saveData();
  renderAll();
});

if ("serviceWorker" in navigator && hasServer) {
  navigator.serviceWorker.register("sw.js");
}

applyLanguage();
if (state.currentUser) {
  showApp();
} else {
  showLogin();
}
