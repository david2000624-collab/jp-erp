const accounts = { kosei: "0000", cho: "0624" };

const translations = {
  zh: {
    appSubtitle: "日本代購後台", loginTitle: "代購 ERP", language: "語言", account: "帳號", password: "密碼", login: "登入", logout: "登出",
    todayWork: "今日工作", dashboard: "總覽", pendingOrders: "待處理訂單", warehouseItems: "倉庫包裹", unpaidCustomers: "未付款客戶", advanceTotal: "代墊總額",
    orders: "訂單", products: "商品", purchaseItems: "進貨項目", packages: "包裹", shipping: "出貨", customers: "客戶", accounting: "對帳", settings: "設定",
    addOrder: "新增訂單", addProduct: "新增商品", addPurchase: "新增進貨", addPackage: "新增包裹", addShipment: "新增出貨", addCustomer: "新增客戶", addPayment: "新增付款",
    save: "儲存", saveSettings: "儲存設定", edit: "修改", delete: "刪除", customerName: "客戶姓名", itemName: "商品名稱", price: "商品金額", paidAmount: "付款金額",
    quantity: "數量", unitPrice: "單價", unitCost: "進貨單價", shippingCost: "運費", transportCost: "交通費", supplier: "供應商 / 店家", orderTotal: "訂單總額", purchaseTotal: "進貨總成本",
    koseiAdvance: "kosei 代墊", choAdvance: "cho 代墊", advanceTwd: "台幣換算", backupStatus: "自動備份", exchangeRate: "日幣換台幣匯率", displayCurrency: "顯示幣別",
    loginFailed: "帳號或密碼錯誤", noData: "目前沒有資料", paidBy: "付款人", customer: "客戶", method: "方式", contact: "聯絡方式", confirmDelete: "確定要刪除這筆資料嗎？", shippingFee: "運費", transportFee: "交通費"
  },
  ja: {
    appSubtitle: "日本購入代行バックオフィス", loginTitle: "購入代行 ERP", language: "言語", account: "アカウント", password: "パスワード", login: "ログイン", logout: "ログアウト",
    todayWork: "本日の業務", dashboard: "概要", pendingOrders: "未処理注文", warehouseItems: "倉庫荷物", unpaidCustomers: "未払い顧客", advanceTotal: "立替合計",
    orders: "注文", products: "商品", purchaseItems: "仕入項目", packages: "荷物", shipping: "出荷", customers: "顧客", accounting: "精算", settings: "設定",
    addOrder: "注文追加", addProduct: "商品追加", addPurchase: "仕入追加", addPackage: "荷物追加", addShipment: "出荷追加", addCustomer: "顧客追加", addPayment: "支払い追加",
    save: "保存", saveSettings: "設定保存", edit: "編集", delete: "削除", customerName: "顧客名", itemName: "商品名", price: "商品金額", paidAmount: "支払金額",
    quantity: "数量", unitPrice: "単価", unitCost: "仕入単価", shippingCost: "送料", transportCost: "交通費", supplier: "仕入先 / 店舗", orderTotal: "注文合計", purchaseTotal: "仕入合計",
    koseiAdvance: "kosei 立替", choAdvance: "cho 立替", advanceTwd: "台湾ドル換算", backupStatus: "自動バックアップ", exchangeRate: "JPYからTWDのレート", displayCurrency: "表示通貨",
    loginFailed: "アカウントまたはパスワードが違います", noData: "データがありません", paidBy: "支払者", customer: "顧客", method: "方法", contact: "連絡先", confirmDelete: "このデータを削除しますか？", shippingFee: "送料", transportFee: "交通費"
  }
};

const defaultData = {
  settings: { exchangeRate: 0.22, displayCurrency: "JPY" },
  orders: [
    { id: "O-001", customer: "林小姐", productId: "P-001", item: "藥妝補貨", quantity: 1, unitPrice: 12800, total: 12800, status: "報價中" },
    { id: "O-002", customer: "Cho", productId: "P-002", item: "限定周邊", quantity: 2, unitPrice: 6800, total: 13600, status: "已採購" }
  ],
  products: [
    { id: "P-001", name: "藥妝補貨", customer: "林小姐", price: 12800 },
    { id: "P-002", name: "限定周邊", customer: "Cho", price: 6800 }
  ],
  purchaseItems: [
    { id: "I-001", productId: "P-001", item: "藥妝補貨", supplier: "大阪藥妝店", quantity: 1, unitCost: 11800, shippingCost: 500, transportCost: 0, totalCost: 12300, status: "待採購" }
  ],
  packages: [{ id: "B-001", no: "JP-WH-001", customer: "林小姐", status: "日本倉入庫" }],
  shipping: [{ id: "S-001", customer: "林小姐", method: "空運", status: "待出貨" }],
  customers: [{ id: "C-001", name: "林小姐", contact: "LINE: lin.jp", paymentStatus: "未付款" }, { id: "C-002", name: "Cho", contact: "LINE: cho", paymentStatus: "已付款" }],
  payments: [{ id: "A-001", productId: "P-001", payer: "kosei", amount: 12800 }, { id: "A-002", productId: "P-002", payer: "cho", amount: 6800 }]
};

const config = {
  orders: { prefix: "O", formId: "orderForm", numeric: ["quantity"], money: ["unitPrice"] },
  products: { prefix: "P", formId: "productForm", money: ["price"] },
  purchaseItems: { prefix: "I", formId: "purchaseForm", numeric: ["quantity"], money: ["unitCost", "shippingCost", "transportCost"] },
  packages: { prefix: "B", formId: "packageForm" },
  shipping: { prefix: "S", formId: "shippingForm" },
  customers: { prefix: "C", formId: "customerForm" },
  payments: { prefix: "A", formId: "accountingForm", money: ["amount"] }
};

const hasServer = location.protocol !== "file:";
const state = { lang: localStorage.getItem("erpLang") || "zh", currentUser: localStorage.getItem("erpUser") || "", data: normalize(loadLocalData()) };

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadLocalData() { const saved = localStorage.getItem("erpData"); return saved ? JSON.parse(saved) : clone(defaultData); }
function normalize(data) {
  const merged = { ...clone(defaultData), ...data, settings: { ...defaultData.settings, ...(data.settings || {}) } };
  merged.purchaseItems = merged.purchaseItems || [];
  merged.customers = (merged.customers || []).map((customer) => ({ ...customer, paymentStatus: customer.paymentStatus || "未付款" }));
  merged.orders = (merged.orders || []).map((order) => {
    const product = (merged.products || []).find((item) => item.id === order.productId || item.name === order.item);
    const quantity = Number(order.quantity || 1);
    const unitPrice = Number(order.unitPrice || product?.price || order.total || 0);
    return { ...order, productId: order.productId || product?.id || "", item: order.item || product?.name || "", quantity, unitPrice, total: quantity * unitPrice };
  });
  merged.purchaseItems = merged.purchaseItems.map((item) => {
    const product = (merged.products || []).find((productItem) => productItem.id === item.productId || productItem.name === item.item);
    const quantity = Number(item.quantity || 1);
    const unitCost = Number(item.unitCost || product?.price || 0);
    const shippingCost = Number(item.shippingCost || 0);
    const transportCost = Number(item.transportCost || 0);
    return { ...item, productId: item.productId || product?.id || "", item: item.item || product?.name || "", quantity, unitCost, shippingCost, transportCost, totalCost: quantity * unitCost + shippingCost + transportCost, status: item.status || "待採購" };
  });
  return merged;
}
function text(key) { return translations[state.lang][key] || translations.zh[key] || key; }
function rate() { return Number(state.data.settings.exchangeRate || 0.22) || 0.22; }
function jpyToTwd(amount) { return Number(amount || 0) * rate(); }
function twdToJpy(amount) { return Number(amount || 0) / rate(); }
function toJpy(amount, currency) { return currency === "TWD" ? twdToJpy(amount) : Number(amount || 0); }
function fromJpy(amount, currency) { return currency === "TWD" ? jpyToTwd(amount) : Number(amount || 0); }
function displayCurrency() { return state.data.settings.displayCurrency || "JPY"; }
function money(amount, currency = displayCurrency()) {
  const value = currency === "TWD" ? jpyToTwd(amount) : Number(amount || 0);
  const formatted = value.toLocaleString(undefined, { maximumFractionDigits: currency === "TWD" ? 0 : 2 });
  return currency === "TWD" ? `NT$${formatted}` : `¥${formatted}`;
}
function productName(productId, fallback = "") { return state.data.products.find((item) => item.id === productId)?.name || fallback || productId; }
function currencySelect(form, fieldName) { return form.querySelector(`[data-currency-for="${fieldName}"]`); }
function moneyInputValue(jpyValue, currency) { const value = fromJpy(jpyValue, currency); return Number.isFinite(value) ? Math.round(value * 100) / 100 : 0; }

async function syncFromServer() {
  if (!hasServer) return;
  try {
    const response = await fetch("./api/data", { cache: "no-store" });
    if (response.ok) {
      state.data = normalize(await response.json());
      localStorage.setItem("erpData", JSON.stringify(state.data));
      renderAll();
    }
  } catch {}
}
async function saveData() {
  state.data = normalize(state.data);
  localStorage.setItem("erpData", JSON.stringify(state.data));
  if (!hasServer) return;
  try { await fetch("./api/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state.data) }); } catch {}
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "ja" ? "ja" : "zh-Hant";
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = text(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => { node.placeholder = text(node.dataset.i18nPlaceholder); });
  document.querySelector("#loginLang").value = state.lang;
  document.querySelector("#appLang").value = state.lang;
  localStorage.setItem("erpLang", state.lang);
  renderAll();
}
function setLanguage(lang) { state.lang = lang; applyLanguage(); }
function showApp() { document.querySelector("#loginScreen").classList.add("hidden"); document.querySelector("#appShell").classList.remove("hidden"); renderAll(); syncFromServer(); }
function showLogin() { document.querySelector("#loginScreen").classList.remove("hidden"); document.querySelector("#appShell").classList.add("hidden"); }
function activateView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".tab, .bottom-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}
function badgeClass(status) { if ((status || "").includes("未") || (status || "").includes("待") || (status || "").includes("報價")) return "pill warn"; if ((status || "").includes("已")) return "pill blue"; return "pill"; }
function emptyList() { return `<div class="item-card"><span class="meta">${text("noData")}</span></div>`; }
function actions(collection, id) { return `<div class="item-actions"><button class="secondary-button" type="button" data-edit="${collection}" data-id="${id}">${text("edit")}</button><button class="danger-button" type="button" data-delete="${collection}" data-id="${id}">${text("delete")}</button></div>`; }

function renderProductSelects() {
  const orderOptions = state.data.products.map((product) => `<option value="${product.id}">${product.name} / ${money(product.price)}</option>`).join("");
  document.querySelector("#orderProduct").innerHTML = orderOptions || `<option value="">${text("noData")}</option>`;
  document.querySelector("#purchaseProduct").innerHTML = orderOptions || `<option value="">${text("noData")}</option>`;
  document.querySelector("#paymentProduct").innerHTML = state.data.products.map((product) => `<option value="${product.id}">${product.name} / ${product.customer} / ${money(product.price)}</option>`).join("");
}
function updateOrderTotalPreview() {
  const currency = currencySelect(document.querySelector("#orderForm"), "unitPrice").value;
  const unitPrice = toJpy(document.querySelector("#orderUnitPrice").value, currency);
  document.querySelector("#orderTotalPreview").textContent = money(Number(document.querySelector("#orderQuantity").value || 0) * unitPrice);
}
function updatePurchaseTotalPreview() {
  const form = document.querySelector("#purchaseForm");
  const unitCost = toJpy(document.querySelector("#purchaseUnitCost").value, currencySelect(form, "unitCost").value);
  const shippingCost = toJpy(document.querySelector("#purchaseShippingCost").value, currencySelect(form, "shippingCost").value);
  const transportCost = toJpy(document.querySelector("#purchaseTransportCost").value, currencySelect(form, "transportCost").value);
  document.querySelector("#purchaseTotalPreview").textContent = money(Number(document.querySelector("#purchaseQuantity").value || 0) * unitCost + shippingCost + transportCost);
}
function syncOrderPriceFromProduct() {
  const product = state.data.products.find((item) => item.id === document.querySelector("#orderProduct").value);
  const currency = currencySelect(document.querySelector("#orderForm"), "unitPrice").value;
  if (product) document.querySelector("#orderUnitPrice").value = moneyInputValue(product.price || 0, currency);
  updateOrderTotalPreview();
}
function syncPurchaseCostFromProduct() {
  const product = state.data.products.find((item) => item.id === document.querySelector("#purchaseProduct").value);
  const input = document.querySelector("#purchaseUnitCost");
  if (product && !input.value) input.value = moneyInputValue(product.price || 0, currencySelect(document.querySelector("#purchaseForm"), "unitCost").value);
  updatePurchaseTotalPreview();
}

function renderOrders() {
  document.querySelector("#orderList").innerHTML = state.data.orders.map((order) => `<article class="item-card"><div class="item-top"><strong>${productName(order.productId, order.item)}</strong><span class="${badgeClass(order.status)}">${order.status}</span></div><span class="meta">${text("customer")}: ${order.customer} / ${order.quantity} x ${money(order.unitPrice)} = ${money(order.total)}</span>${actions("orders", order.id)}</article>`).join("") || emptyList();
}
function renderProducts() {
  document.querySelector("#productList").innerHTML = state.data.products.map((product) => `<article class="item-card"><div class="item-top"><strong>${product.name}</strong><span class="pill">${money(product.price)} / ${money(product.price, "TWD")}</span></div><span class="meta">${text("customer")}: ${product.customer} / ${product.id}</span>${actions("products", product.id)}</article>`).join("") || emptyList();
}
function renderPurchaseItems() {
  document.querySelector("#purchaseList").innerHTML = state.data.purchaseItems.map((item) => `<article class="item-card"><div class="item-top"><strong>${productName(item.productId, item.item)}</strong><span class="${badgeClass(item.status)}">${item.status}</span></div><span class="meta">${item.supplier || "-"} / ${item.quantity} x ${money(item.unitCost)} + ${text("shippingFee")} ${money(item.shippingCost)} + ${text("transportFee")} ${money(item.transportCost)} = ${money(item.totalCost)}</span>${actions("purchaseItems", item.id)}</article>`).join("") || emptyList();
}
function renderPackages() {
  document.querySelector("#packageList").innerHTML = state.data.packages.map((pack) => `<article class="item-card"><div class="item-top"><strong>${pack.no}</strong><span class="${badgeClass(pack.status)}">${pack.status}</span></div><span class="meta">${text("customer")}: ${pack.customer}</span>${actions("packages", pack.id)}</article>`).join("") || emptyList();
}
function renderShipping() {
  document.querySelector("#shippingList").innerHTML = state.data.shipping.map((shipment) => `<article class="item-card"><div class="item-top"><strong>${shipment.customer}</strong><span class="${badgeClass(shipment.status)}">${shipment.status}</span></div><span class="meta">${text("method")}: ${shipment.method} / ${shipment.id}</span>${actions("shipping", shipment.id)}</article>`).join("") || emptyList();
}
function renderCustomers() {
  document.querySelector("#customerList").innerHTML = state.data.customers.map((customer) => `<article class="item-card"><div class="item-top"><strong>${customer.name}</strong><span class="${badgeClass(customer.paymentStatus)}">${customer.paymentStatus}</span></div><span class="meta">${text("contact")}: ${customer.contact || "-"} / ${customer.id}</span>${actions("customers", customer.id)}</article>`).join("") || emptyList();
}
function renderAccounting() {
  const totals = state.data.payments.reduce((sum, payment) => { sum[payment.payer] += Number(payment.amount || 0); return sum; }, { kosei: 0, cho: 0 });
  const total = totals.kosei + totals.cho;
  document.querySelector("#koseiAdvance").textContent = money(totals.kosei);
  document.querySelector("#choAdvance").textContent = money(totals.cho);
  document.querySelector("#advanceTotal").textContent = money(total);
  document.querySelector("#advanceTwd").textContent = money(total, "TWD");
  document.querySelector("#paymentList").innerHTML = state.data.payments.map((payment) => {
    const product = state.data.products.find((item) => item.id === payment.productId);
    return `<article class="item-card"><div class="item-top"><strong>${product ? product.name : payment.productId}</strong><span class="pill">${money(payment.amount)} / ${money(payment.amount, "TWD")}</span></div><span class="meta">${text("paidBy")}: ${payment.payer} / ${product ? product.customer : ""}</span>${actions("payments", payment.id)}</article>`;
  }).join("") || emptyList();
}
function renderSettings() {
  document.querySelector("#exchangeRate").value = state.data.settings.exchangeRate;
  document.querySelector("#displayCurrency").value = displayCurrency();
}
function renderSummary() {
  document.querySelector("#pendingOrders").textContent = state.data.orders.filter((order) => order.status !== "已入庫").length;
  document.querySelector("#purchaseCount").textContent = state.data.purchaseItems.length;
  document.querySelector("#unpaidCustomers").textContent = state.data.customers.filter((customer) => customer.paymentStatus !== "已付款").length;
}
function renderAll() {
  if (!document.querySelector("#appShell")) return;
  state.data = normalize(state.data);
  renderProductSelects(); renderOrders(); renderProducts(); renderPurchaseItems(); renderPackages(); renderShipping(); renderCustomers(); renderAccounting(); renderSettings(); renderSummary();
  updateOrderTotalPreview(); updatePurchaseTotalPreview();
}

function nextId(prefix, list) { return `${prefix}-${String(list.length + 1).padStart(3, "0")}`; }
function formValues(form, collection) {
  const numeric = config[collection].numeric || [];
  const moneyFields = config[collection].money || [];
  const values = [...form.querySelectorAll("[data-field]")].reduce((result, field) => {
    const name = field.dataset.field;
    if (moneyFields.includes(name)) result[name] = toJpy(field.value, currencySelect(form, name).value);
    else result[name] = numeric.includes(name) ? Number(field.value || 0) : field.value.trim();
    return result;
  }, {});
  if (collection === "orders") {
    const product = state.data.products.find((item) => item.id === values.productId);
    values.item = product?.name || "";
    values.total = Number(values.quantity || 0) * Number(values.unitPrice || 0);
  }
  if (collection === "purchaseItems") {
    const product = state.data.products.find((item) => item.id === values.productId);
    values.item = product?.name || "";
    values.totalCost = Number(values.quantity || 0) * Number(values.unitCost || 0) + Number(values.shippingCost || 0) + Number(values.transportCost || 0);
  }
  return values;
}
function fillForm(collection, id) {
  const form = document.querySelector(`#${config[collection].formId}`);
  const item = state.data[collection].find((entry) => entry.id === id);
  if (!form || !item) return;
  form.dataset.editingId = id;
  form.classList.remove("hidden");
  form.querySelectorAll("[data-field]").forEach((field) => {
    const currency = currencySelect(form, field.dataset.field)?.value;
    field.value = currency ? moneyInputValue(item[field.dataset.field] || 0, currency) : item[field.dataset.field] ?? "";
  });
  updateOrderTotalPreview(); updatePurchaseTotalPreview();
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}
function upsertFromForm(event, collection) {
  event.preventDefault();
  const form = event.target;
  const values = formValues(form, collection);
  const editingId = form.dataset.editingId;
  if (editingId) {
    state.data[collection] = state.data[collection].map((item) => item.id === editingId ? { ...item, ...values } : item);
    delete form.dataset.editingId;
  } else {
    state.data[collection].unshift({ id: nextId(config[collection].prefix, state.data[collection]), ...values });
  }
  form.reset(); syncOrderPriceFromProduct(); syncPurchaseCostFromProduct(); saveData(); renderAll();
}

document.querySelector("#loginBtn").addEventListener("click", () => {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  if (accounts[username] === password) { state.currentUser = username; localStorage.setItem("erpUser", username); document.querySelector("#loginError").textContent = ""; showApp(); return; }
  document.querySelector("#loginError").textContent = text("loginFailed");
});
document.querySelector("#logoutBtn").addEventListener("click", () => { state.currentUser = ""; localStorage.removeItem("erpUser"); showLogin(); });
document.querySelector("#loginLang").addEventListener("change", (event) => setLanguage(event.target.value));
document.querySelector("#appLang").addEventListener("change", (event) => setLanguage(event.target.value));
document.querySelectorAll(".tab, .bottom-link").forEach((button) => button.addEventListener("click", () => activateView(button.dataset.view)));
document.querySelectorAll("[data-open-form]").forEach((button) => button.addEventListener("click", () => { const form = document.querySelector(`#${button.dataset.openForm}`); delete form.dataset.editingId; form.reset(); form.classList.toggle("hidden"); syncOrderPriceFromProduct(); syncPurchaseCostFromProduct(); }));
document.querySelector("#orderProduct").addEventListener("change", syncOrderPriceFromProduct);
document.querySelector("#orderQuantity").addEventListener("input", updateOrderTotalPreview);
document.querySelector("#orderUnitPrice").addEventListener("input", updateOrderTotalPreview);
document.querySelector("#purchaseProduct").addEventListener("change", syncPurchaseCostFromProduct);
document.querySelector("#purchaseQuantity").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseUnitCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseShippingCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseTransportCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelectorAll("[data-currency-for]").forEach((select) => select.addEventListener("change", () => { updateOrderTotalPreview(); updatePurchaseTotalPreview(); }));
document.querySelector("#orderForm").addEventListener("submit", (event) => upsertFromForm(event, "orders"));
document.querySelector("#productForm").addEventListener("submit", (event) => upsertFromForm(event, "products"));
document.querySelector("#purchaseForm").addEventListener("submit", (event) => upsertFromForm(event, "purchaseItems"));
document.querySelector("#packageForm").addEventListener("submit", (event) => upsertFromForm(event, "packages"));
document.querySelector("#shippingForm").addEventListener("submit", (event) => upsertFromForm(event, "shipping"));
document.querySelector("#customerForm").addEventListener("submit", (event) => upsertFromForm(event, "customers"));
document.querySelector("#accountingForm").addEventListener("submit", (event) => upsertFromForm(event, "payments"));
document.querySelector("#settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.data.settings.exchangeRate = Number(document.querySelector("#exchangeRate").value || 0.22);
  state.data.settings.displayCurrency = document.querySelector("#displayCurrency").value;
  saveData(); renderAll();
});
document.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");
  if (editButton) fillForm(editButton.dataset.edit, editButton.dataset.id);
  if (deleteButton && confirm(text("confirmDelete"))) { const collection = deleteButton.dataset.delete; state.data[collection] = state.data[collection].filter((item) => item.id !== deleteButton.dataset.id); saveData(); renderAll(); }
});
if ("serviceWorker" in navigator && hasServer) navigator.serviceWorker.register("sw.js");
applyLanguage();
if (state.currentUser) showApp(); else showLogin();
