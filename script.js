const accounts = { kosei: "0000", cho: "0624" };

const translations = {
  zh: {
    appSubtitle: "日本代購後台", loginTitle: "代購 ERP", language: "語言", account: "帳號", password: "密碼", login: "登入", logout: "登出", jpyCurrency: "日幣", twdCurrency: "台幣",
    todayWork: "今日工作", dashboard: "總覽", pendingOrders: "待處理訂單", warehouseItems: "倉庫包裹", unpaidCustomers: "未付款客戶", advanceTotal: "代墊總額",
    orders: "訂單", products: "商品", purchaseItems: "進貨項目", inventory: "庫存", packages: "包裹", shipping: "出貨", customers: "客戶", accounting: "對帳", settings: "設定",
    addOrder: "新增訂單", addProduct: "新增商品", addPurchase: "新增進貨", addPackage: "新增包裹", addShipment: "新增出貨", addCustomer: "新增客戶", addPayment: "新增付款", addShippingAdvance: "新增運費代墊費用",
    save: "儲存", saveSettings: "儲存設定", edit: "修改", delete: "刪除", customerName: "客戶姓名", itemName: "商品名稱", price: "商品金額", salePrice: "售價", averageUnitPrice: "平均單價", paidAmount: "付款金額", paymentNote: "備註", productImage: "商品圖片", selectProduct: "選擇既有商品",
    quantity: "數量", unitPrice: "單價", unitCost: "進貨單價", shippingCost: "運費", transportCost: "交通費", supplier: "供應商 / 店家", stock: "庫存", orderTotal: "訂單總額", purchaseTotal: "進貨總成本",
    koseiAdvance: "kosei 代墊", choAdvance: "cho 代墊", advanceTwd: "目前幣別", productAdvance: "商品代墊", shippingAdvance: "運費代墊", backupStatus: "自動備份", dailyBackup: "每天", exchangeRate: "日幣換台幣匯率", displayCurrency: "顯示幣別", exportData: "匯出資料", importData: "匯入資料",
    loginFailed: "帳號或密碼錯誤", noData: "目前沒有資料", paidBy: "付款人", customer: "客戶", method: "方式", contact: "聯絡方式", confirmDelete: "確定要刪除這筆資料嗎？", shippingFee: "運費", transportFee: "交通費", stockIn: "入庫存", stocked: "已入庫存",
    addInventoryLog: "調整庫存", stockOut: "出庫", stockSet: "盤點設定", inventoryNote: "備註", movementType: "類型", inventoryHistory: "庫存紀錄", currentStock: "目前庫存", lowStock: "低庫存", inventoryValue: "庫存價值", salesValue: "可售金額", totalUnits: "總庫存數", beforeStock: "調整前", afterStock: "調整後", operator: "操作人"
  },
  ja: {
    appSubtitle: "日本購入代行バックオフィス", loginTitle: "購入代行 ERP", language: "言語", account: "アカウント", password: "パスワード", login: "ログイン", logout: "ログアウト", jpyCurrency: "日本円", twdCurrency: "台湾ドル",
    todayWork: "本日の業務", dashboard: "概要", pendingOrders: "未処理注文", warehouseItems: "倉庫荷物", unpaidCustomers: "未払い顧客", advanceTotal: "立替合計",
    orders: "注文", products: "商品", purchaseItems: "仕入項目", inventory: "在庫", packages: "荷物", shipping: "出荷", customers: "顧客", accounting: "精算", settings: "設定",
    addOrder: "注文追加", addProduct: "商品追加", addPurchase: "仕入追加", addPackage: "荷物追加", addShipment: "出荷追加", addCustomer: "顧客追加", addPayment: "支払い追加", addShippingAdvance: "送料立替費用を追加",
    save: "保存", saveSettings: "設定保存", edit: "編集", delete: "削除", customerName: "顧客名", itemName: "商品名", price: "商品金額", salePrice: "販売価格", averageUnitPrice: "平均単価", paidAmount: "支払金額", paymentNote: "メモ", productImage: "商品画像", selectProduct: "既存商品を選択",
    quantity: "数量", unitPrice: "単価", unitCost: "仕入単価", shippingCost: "送料", transportCost: "交通費", supplier: "仕入先 / 店舗", stock: "在庫", orderTotal: "注文合計", purchaseTotal: "仕入合計",
    koseiAdvance: "kosei 立替", choAdvance: "cho 立替", advanceTwd: "現在通貨", productAdvance: "商品立替", shippingAdvance: "送料立替", backupStatus: "自動バックアップ", dailyBackup: "毎日", exchangeRate: "JPYからTWDのレート", displayCurrency: "表示通貨", exportData: "データを書き出す", importData: "データを読み込む",
    loginFailed: "アカウントまたはパスワードが違います", noData: "データがありません", paidBy: "支払者", customer: "顧客", method: "方法", contact: "連絡先", confirmDelete: "このデータを削除しますか？", shippingFee: "送料", transportFee: "交通費", stockIn: "在庫入庫", stocked: "入庫済み",
    addInventoryLog: "在庫調整", stockOut: "出庫", stockSet: "棚卸設定", inventoryNote: "メモ", movementType: "種類", inventoryHistory: "在庫履歴", currentStock: "現在在庫", lowStock: "低在庫", inventoryValue: "在庫金額", salesValue: "販売予定額", totalUnits: "総在庫数", beforeStock: "調整前", afterStock: "調整後", operator: "担当者"
  }
};

const defaultData = {
  settings: { exchangeRate: 0.22, displayCurrency: "JPY" },
  orders: [
    { id: "O-001", customer: "林小姐", productId: "P-001", item: "藥妝補貨", quantity: 1, unitPrice: 12800, total: 12800, status: "報價中" },
    { id: "O-002", customer: "Cho", productId: "P-002", item: "限定周邊", quantity: 2, unitPrice: 6800, total: 13600, status: "已採購" }
  ],
  products: [
    { id: "P-001", name: "藥妝補貨", customer: "林小姐", price: 12800, shippingCost: 0, salePrice: 12800, stock: 0, image: "" },
    { id: "P-002", name: "限定周邊", customer: "Cho", price: 6800, shippingCost: 0, salePrice: 6800, stock: 0, image: "" }
  ],
  purchaseItems: [
    { id: "I-001", productId: "P-001", item: "藥妝補貨", supplier: "大阪藥妝店", quantity: 1, unitCost: 11800, shippingCost: 500, transportCost: 0, totalCost: 12300, status: "待採購", stocked: false }
  ],
  inventoryLogs: [],
  packages: [{ id: "B-001", no: "JP-WH-001", customer: "林小姐", status: "日本倉入庫" }],
  shipping: [{ id: "S-001", customer: "林小姐", method: "空運", status: "待出貨" }],
  customers: [{ id: "C-001", name: "林小姐", contact: "LINE: lin.jp", paymentStatus: "未付款" }, { id: "C-002", name: "Cho", contact: "LINE: cho", paymentStatus: "已付款" }],
  payments: [{ id: "A-001", productId: "P-001", type: "product", payer: "kosei", note: "", amount: 12800 }, { id: "A-002", productId: "P-002", type: "product", payer: "cho", note: "", amount: 6800 }]
};

const config = {
  orders: { prefix: "O", formId: "orderForm", numeric: ["quantity"], money: ["unitPrice"] },
  products: { prefix: "P", formId: "productForm", numeric: ["stock"], money: ["price", "shippingCost", "salePrice"] },
  purchaseItems: { prefix: "I", formId: "purchaseForm", numeric: ["quantity"], money: ["unitCost", "shippingCost", "transportCost"] },
  inventoryLogs: { prefix: "M", formId: "inventoryForm", numeric: ["quantity"] },
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
  merged.inventoryLogs = merged.inventoryLogs || [];
  merged.products = (merged.products || []).map((product) => ({ ...product, price: Number(product.price || 0), shippingCost: Number(product.shippingCost || 0), salePrice: Number(product.salePrice || product.price || 0), stock: Number(product.stock || 0), image: product.image || "" }));
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
    return { ...item, productId: item.productId || product?.id || "", item: item.item || product?.name || "", quantity, unitCost, shippingCost, transportCost, totalCost: quantity * unitCost + shippingCost + transportCost, status: item.status || "待採購", stocked: Boolean(item.stocked) };
  });
  merged.inventoryLogs = merged.inventoryLogs.map((log) => ({
    ...log,
    quantity: Number(log.quantity || 0),
    beforeStock: Number(log.beforeStock || 0),
    afterStock: Number(log.afterStock || 0),
    createdAt: log.createdAt || new Date().toISOString()
  }));
  merged.payments = (merged.payments || []).map((payment) => ({ ...payment, productId: payment.type === "shipping" ? "" : payment.productId || "", type: payment.type || "product", note: payment.note || "", amount: Number(payment.amount || 0) }));
  return merged;
}
function text(key) { return translations[state.lang][key] || translations.zh[key] || key; }
function rate() { return Number(state.data.settings.exchangeRate || 0.22) || 0.22; }
function jpyToTwd(amount) { return Number(amount || 0) * rate(); }
function twdToJpy(amount) { return Number(amount || 0) / rate(); }
function toJpy(amount, currency) { return currency === "TWD" ? twdToJpy(amount) : Number(amount || 0); }
function fromJpy(amount, currency) { return currency === "TWD" ? jpyToTwd(amount) : Number(amount || 0); }
function displayCurrency() { return state.data.settings.displayCurrency || "JPY"; }
function setDisplayCurrency(currency) {
  state.data.settings.displayCurrency = currency;
  saveData();
  renderAll();
}
function money(amount, currency = displayCurrency()) {
  const value = currency === "TWD" ? jpyToTwd(amount) : Number(amount || 0);
  const formatted = value.toLocaleString(undefined, { maximumFractionDigits: currency === "TWD" ? 0 : 2 });
  return currency === "TWD" ? `NT$${formatted}` : `¥${formatted}`;
}
function productName(productId, fallback = "") { return state.data.products.find((item) => item.id === productId)?.name || fallback || productId; }
function productById(productId) { return state.data.products.find((item) => item.id === productId); }
function currencySelect(form, fieldName) { return form.querySelector(`[data-currency-for="${fieldName}"]`); }
function moneyInputValue(jpyValue, currency) { const value = fromJpy(jpyValue, currency); return Number.isFinite(value) ? Math.round(value * 100) / 100 : 0; }
function rememberCurrencySelections() {
  document.querySelectorAll("[data-currency-for]").forEach((select) => { select.dataset.lastCurrency = select.value; });
}
function updateMoneyInputCurrency(select) {
  const form = select.closest("form");
  const field = form?.querySelector(`[data-field="${select.dataset.currencyFor}"]`);
  const oldCurrency = select.dataset.lastCurrency || "JPY";
  const newCurrency = select.value;
  if (field && field.value !== "") {
    field.value = moneyInputValue(toJpy(field.value, oldCurrency), newCurrency);
  }
  select.dataset.lastCurrency = newCurrency;
  updateOrderTotalPreview();
  updatePurchaseTotalPreview();
}
function shortDate(value) { return value ? new Date(value).toLocaleString(state.lang === "ja" ? "ja-JP" : "zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : ""; }
function inventoryTypeLabel(type) { return type === "out" ? text("stockOut") : type === "set" ? text("stockSet") : text("stockIn"); }
function paymentTypeLabel(type) { return type === "shipping" ? text("shippingAdvance") : text("productAdvance"); }
function paymentTitle(payment) {
  if (payment.type === "shipping") return payment.note || text("shippingAdvance");
  return productName(payment.productId, payment.note || payment.productId);
}
function averageUnitPrice(product) {
  const stock = Number(product.stock || 0);
  const shippingShare = stock > 0 ? Number(product.shippingCost || 0) / stock : Number(product.shippingCost || 0);
  return Number(product.price || 0) + shippingShare;
}
function productImageMarkup(product) {
  return product.image ? `<img class="product-image" src="${product.image}" alt="${product.name}" />` : `<div class="product-image placeholder">JP</div>`;
}
function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.76));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function handleProductImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const imageData = await resizeImageFile(file);
  document.querySelector('#productForm [data-field="image"]').value = imageData;
}

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

function exportData() {
  const blob = new Blob([JSON.stringify(normalize(state.data), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `jp-erp-data-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      state.data = normalize(JSON.parse(reader.result));
      await saveData();
      renderAll();
      alert(text("save"));
    } catch {
      alert(text("noData"));
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
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
  const orderOptions = state.data.products.map((product) => `<option value="${product.id}">${product.name} / ${money(product.salePrice || product.price)}</option>`).join("");
  document.querySelector("#orderProduct").innerHTML = orderOptions || `<option value="">${text("noData")}</option>`;
  document.querySelector("#purchaseProduct").innerHTML = `<option value="">${text("selectProduct")}</option>${orderOptions}`;
  document.querySelector("#inventoryProduct").innerHTML = orderOptions || `<option value="">${text("noData")}</option>`;
  document.querySelector("#paymentProduct").innerHTML = state.data.products.map((product) => `<option value="${product.id}">${product.name} / ${product.customer} / ${money(product.salePrice || product.price)}</option>`).join("");
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
  if (product) document.querySelector("#orderUnitPrice").value = moneyInputValue(product.salePrice || product.price || 0, currency);
  updateOrderTotalPreview();
}
function syncPurchaseCostFromProduct() {
  const product = state.data.products.find((item) => item.id === document.querySelector("#purchaseProduct").value);
  const input = document.querySelector("#purchaseUnitCost");
  if (product) {
    document.querySelector("#purchaseItemName").value = product.name;
    if (!input.value) input.value = moneyInputValue(product.price || 0, currencySelect(document.querySelector("#purchaseForm"), "unitCost").value);
  }
  updatePurchaseTotalPreview();
}

function renderOrders() {
  document.querySelector("#orderList").innerHTML = state.data.orders.map((order) => `<article class="item-card"><div class="item-top"><strong>${productName(order.productId, order.item)}</strong><span class="${badgeClass(order.status)}">${order.status}</span></div><span class="meta">${text("customer")}: ${order.customer} / ${order.quantity} x ${money(order.unitPrice)} = ${money(order.total)}</span>${actions("orders", order.id)}</article>`).join("") || emptyList();
}
function renderProducts() {
  document.querySelector("#productList").innerHTML = state.data.products.map((product) => `<article class="item-card product-card">${productImageMarkup(product)}<div><div class="item-top"><strong>${product.name}</strong><span class="pill">${text("salePrice")}: ${money(product.salePrice || product.price)}</span></div><span class="meta">${text("averageUnitPrice")}: ${money(averageUnitPrice(product))} / ${text("price")}: ${money(product.price)} / ${text("shippingFee")}: ${money(product.shippingCost)} / ${text("customer")}: ${product.customer || "-"} / ${text("stock")}: ${product.stock || 0} / ${product.id}</span></div>${actions("products", product.id)}</article>`).join("") || emptyList();
}
function renderPurchaseItems() {
  document.querySelector("#purchaseList").innerHTML = state.data.purchaseItems.map((item) => `<article class="item-card"><div class="item-top"><strong>${productName(item.productId, item.item)}</strong><span class="${badgeClass(item.stocked ? text("stocked") : item.status)}">${item.stocked ? text("stocked") : item.status}</span></div><span class="meta">${item.supplier || "-"} / ${item.quantity} x ${money(item.unitCost)} + ${text("shippingFee")} ${money(item.shippingCost)} + ${text("transportFee")} ${money(item.transportCost)} = ${money(item.totalCost)}</span><div class="item-actions">${!item.stocked ? `<button class="secondary-button" type="button" data-stock-in="${item.id}">${text("stockIn")}</button>` : ""}<button class="secondary-button" type="button" data-edit="purchaseItems" data-id="${item.id}">${text("edit")}</button><button class="danger-button" type="button" data-delete="purchaseItems" data-id="${item.id}">${text("delete")}</button></div></article>`).join("") || emptyList();
}
function renderInventory() {
  const totalUnits = state.data.products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  const lowStock = state.data.products.filter((product) => Number(product.stock || 0) <= 2).length;
  const inventoryValue = state.data.products.reduce((sum, product) => sum + Number(product.stock || 0) * Number(product.price || 0), 0);
  const salesValue = state.data.products.reduce((sum, product) => sum + Number(product.stock || 0) * Number(product.salePrice || product.price || 0), 0);
  document.querySelector("#inventoryUnits").textContent = totalUnits;
  document.querySelector("#inventoryTotalUnits").textContent = totalUnits;
  document.querySelector("#inventoryLowStock").textContent = lowStock;
  document.querySelector("#inventoryValue").textContent = `${money(inventoryValue)} / ${text("salesValue")}: ${money(salesValue)}`;
  document.querySelector("#inventoryLogCount").textContent = state.data.inventoryLogs.length;

  const productCards = state.data.products.map((product) => {
    const stock = Number(product.stock || 0);
    return `<article class="item-card"><div class="item-top"><strong>${product.name}</strong><span class="${stock <= 2 ? "pill warn" : "pill"}">${text("currentStock")}: ${stock}</span></div><span class="meta">${text("averageUnitPrice")}: ${money(averageUnitPrice(product))} / ${text("salePrice")}: ${money(product.salePrice || product.price)} / ${text("inventoryValue")}: ${money(stock * Number(product.price || 0))} / ${text("salesValue")}: ${money(stock * Number(product.salePrice || product.price || 0))} / ${product.id}</span></article>`;
  }).join("");
  const logCards = state.data.inventoryLogs.slice(0, 20).map((log) => `<article class="item-card"><div class="item-top"><strong>${productName(log.productId)}</strong><span class="pill blue">${inventoryTypeLabel(log.type)}</span></div><span class="meta">${text("quantity")}: ${log.quantity} / ${text("beforeStock")}: ${log.beforeStock} / ${text("afterStock")}: ${log.afterStock} / ${text("operator")}: ${log.user || "-"} / ${shortDate(log.createdAt)}</span>${log.note ? `<span class="meta">${log.note}</span>` : ""}</article>`).join("");
  document.querySelector("#inventoryList").innerHTML = productCards || emptyList();
  if (logCards) document.querySelector("#inventoryList").insertAdjacentHTML("beforeend", `<div class="section-title compact-title"><h2 data-i18n="inventoryHistory">${text("inventoryHistory")}</h2></div>${logCards}`);
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
  const shippingTotal = state.data.payments.filter((payment) => payment.type === "shipping").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  document.querySelector("#koseiAdvance").textContent = money(totals.kosei);
  document.querySelector("#choAdvance").textContent = money(totals.cho);
  document.querySelector("#shippingAdvance").textContent = money(shippingTotal);
  document.querySelector("#advanceTotal").textContent = money(total);
  document.querySelector("#advanceTwd").textContent = money(total);
  document.querySelector("#paymentList").innerHTML = state.data.payments.map((payment) => {
    const product = state.data.products.find((item) => item.id === payment.productId);
    const customer = payment.type === "shipping" ? payment.note || "-" : product ? product.customer : "";
    return `<article class="item-card"><div class="item-top"><strong>${paymentTypeLabel(payment.type)} - ${paymentTitle(payment)}</strong><span class="pill">${money(payment.amount)}</span></div><span class="meta">${text("paidBy")}: ${payment.payer} / ${customer}</span>${actions("payments", payment.id)}</article>`;
  }).join("") || emptyList();
}
function renderCurrencyToggle() {
  document.querySelectorAll("[data-currency-toggle]").forEach((button) => {
    button.classList.toggle("active", button.dataset.currencyToggle === displayCurrency());
  });
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
  renderProductSelects(); renderOrders(); renderProducts(); renderPurchaseItems(); renderInventory(); renderPackages(); renderShipping(); renderCustomers(); renderAccounting(); renderSettings(); renderSummary(); renderCurrencyToggle();
  rememberCurrencySelections();
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
    values.item = values.item || product?.name || "";
    values.productId = product?.id || "";
    values.totalCost = Number(values.quantity || 0) * Number(values.unitCost || 0) + Number(values.shippingCost || 0) + Number(values.transportCost || 0);
  }
  if (collection === "payments" && values.type === "shipping") {
    values.productId = "";
    values.note = values.note || text("shippingAdvance");
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
    if (field.type === "file") return;
    const currency = currencySelect(form, field.dataset.field)?.value;
    field.value = currency ? moneyInputValue(item[field.dataset.field] || 0, currency) : item[field.dataset.field] ?? "";
  });
  const fileInput = form.querySelector('input[type="file"]');
  if (fileInput) fileInput.value = "";
  syncPaymentType();
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

function addInventoryMovement({ productId, type = "in", quantity = 0, note = "" }) {
  const product = productById(productId);
  if (!product) return;
  const amount = Math.max(0, Number(quantity || 0));
  const beforeStock = Number(product.stock || 0);
  let afterStock = beforeStock;
  if (type === "out") afterStock = Math.max(0, beforeStock - amount);
  else if (type === "set") afterStock = amount;
  else afterStock = beforeStock + amount;
  product.stock = afterStock;
  state.data.inventoryLogs.unshift({
    id: nextId("M", state.data.inventoryLogs),
    productId,
    type,
    quantity: amount,
    beforeStock,
    afterStock,
    note,
    user: state.currentUser,
    createdAt: new Date().toISOString()
  });
}

function submitInventoryForm(event) {
  event.preventDefault();
  const form = event.target;
  addInventoryMovement({
    productId: document.querySelector("#inventoryProduct").value,
    type: document.querySelector("#inventoryType").value,
    quantity: document.querySelector("#inventoryQuantity").value,
    note: document.querySelector("#inventoryNote").value.trim()
  });
  form.reset();
  saveData();
  renderAll();
}

function syncPaymentType() {
  const type = document.querySelector("#paymentType").value;
  const productSelect = document.querySelector("#paymentProduct");
  const noteInput = document.querySelector("#paymentNote");
  productSelect.disabled = type === "shipping";
  productSelect.classList.toggle("hidden", type === "shipping");
  if (type === "shipping" && !noteInput.value) noteInput.value = text("shippingAdvance");
}

function openShippingAdvanceForm() {
  const form = document.querySelector("#accountingForm");
  delete form.dataset.editingId;
  form.reset();
  form.classList.remove("hidden");
  document.querySelector("#paymentType").value = "shipping";
  document.querySelector("#paymentNote").value = text("shippingAdvance");
  syncPaymentType();
  rememberCurrencySelections();
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function stockInPurchaseItem(id) {
  const item = state.data.purchaseItems.find((entry) => entry.id === id);
  if (!item || item.stocked) return;
  let product = state.data.products.find((entry) => entry.id === item.productId);
  if (!product) {
    product = { id: nextId("P", state.data.products), name: item.item || "新商品", customer: "", price: item.unitCost || 0, shippingCost: item.shippingCost || 0, salePrice: item.unitCost || 0, stock: 0, image: "" };
    item.productId = product.id;
    state.data.products.unshift(product);
  }
  addInventoryMovement({ productId: product.id, type: "in", quantity: item.quantity, note: `${text("purchaseItems")}: ${item.id}` });
  item.stocked = true;
  item.status = "已入庫";
  saveData();
  renderAll();
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
document.querySelectorAll("[data-currency-toggle]").forEach((button) => button.addEventListener("click", () => setDisplayCurrency(button.dataset.currencyToggle)));
document.querySelectorAll(".tab, .bottom-link").forEach((button) => button.addEventListener("click", () => activateView(button.dataset.view)));
document.querySelectorAll("[data-open-form]").forEach((button) => button.addEventListener("click", () => { const form = document.querySelector(`#${button.dataset.openForm}`); delete form.dataset.editingId; form.reset(); form.classList.toggle("hidden"); syncOrderPriceFromProduct(); syncPurchaseCostFromProduct(); syncPaymentType(); rememberCurrencySelections(); }));
document.querySelector("[data-open-shipping-advance]").addEventListener("click", openShippingAdvanceForm);
document.querySelector("#orderProduct").addEventListener("change", syncOrderPriceFromProduct);
document.querySelector("#orderQuantity").addEventListener("input", updateOrderTotalPreview);
document.querySelector("#orderUnitPrice").addEventListener("input", updateOrderTotalPreview);
document.querySelector("#purchaseProduct").addEventListener("change", syncPurchaseCostFromProduct);
document.querySelector("#purchaseQuantity").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseUnitCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseShippingCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#purchaseTransportCost").addEventListener("input", updatePurchaseTotalPreview);
document.querySelector("#paymentType").addEventListener("change", syncPaymentType);
document.querySelector("#productImageFile").addEventListener("change", handleProductImageUpload);
document.querySelectorAll("[data-currency-for]").forEach((select) => select.addEventListener("change", () => updateMoneyInputCurrency(select)));
document.querySelector("#orderForm").addEventListener("submit", (event) => upsertFromForm(event, "orders"));
document.querySelector("#productForm").addEventListener("submit", (event) => upsertFromForm(event, "products"));
document.querySelector("#purchaseForm").addEventListener("submit", (event) => upsertFromForm(event, "purchaseItems"));
document.querySelector("#inventoryForm").addEventListener("submit", submitInventoryForm);
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
document.querySelector("#exportDataBtn").addEventListener("click", exportData);
document.querySelector("#importDataFile").addEventListener("change", importData);
document.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");
  const stockInButton = event.target.closest("[data-stock-in]");
  if (editButton) fillForm(editButton.dataset.edit, editButton.dataset.id);
  if (stockInButton) stockInPurchaseItem(stockInButton.dataset.stockIn);
  if (deleteButton && confirm(text("confirmDelete"))) { const collection = deleteButton.dataset.delete; state.data[collection] = state.data[collection].filter((item) => item.id !== deleteButton.dataset.id); saveData(); renderAll(); }
});
if ("serviceWorker" in navigator && hasServer) navigator.serviceWorker.register("sw.js");
applyLanguage();
syncPaymentType();
rememberCurrencySelections();
if (state.currentUser) showApp(); else showLogin();
