/* ==========================================================================
   SMARTSTORE - COMPLETE JAVASCRIPT ENGINE (Phones & Headphones Only)
   ========================================================================== */

// 1. CHANGE YOUR DEFAULT WEBSITE NAME HERE:
// Options: "SmartStore", "SmartShop", "SmartPortal", "Shopping Cart"
const DEFAULT_STORE_NAME = "SmartStore";

// 2. STORAGE KEYS (Used to save data in your browser)
const STORAGE_KEYS = {
  PRODUCTS: "smartstore_products_v2",
  CART: "smartstore_cart_v2",
  USER: "smartstore_user_v2",
  ADMIN: "smartstore_admin_v2",
  BRAND: "smartstore_brand_v2"
};

// 3. DEFAULT CATALOG (Strictly Smartphones & Headphones)
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Vivo T4 5G",
    brand: "Vivo",
    category: "Smartphones",
    price: 21999,
    mrp: 25999,
    specs: ["8GB RAM", "128GB Storage", "120Hz AMOLED", "5000mAh Turbo"],
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    isActive: true,   // Website Status: true = Active/Visible, false = Hidden
    inStock: true     // Stock Status: true = Have/In Stock, false = Out of Stock
  },
  {
    id: "p2",
    name: "iPhone 16",
    brand: "Apple",
    category: "Smartphones",
    price: 77900,
    mrp: 79900,
    specs: ["A18 Bionic", "128GB", "48MP Fusion Camera", "Action Button"],
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "p3",
    name: "Samsung Galaxy S24 5G",
    brand: "Samsung",
    category: "Smartphones",
    price: 64999,
    mrp: 74999,
    specs: ["8GB RAM", "256GB", "Galaxy AI", "120Hz Dynamic AMOLED"],
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "p4",
    name: "OnePlus 13R 5G",
    brand: "OnePlus",
    category: "Smartphones",
    price: 42999,
    mrp: 45999,
    specs: ["12GB RAM", "256GB", "Snapdragon 8 Gen 3", "100W SuperVOOC"],
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: false // Out of Stock by default so you can see how it looks
  },
  {
    id: "p5",
    name: "Nothing Phone (2a) Plus",
    brand: "Nothing",
    category: "Smartphones",
    price: 27999,
    mrp: 29999,
    specs: ["8GB RAM", "256GB", "Glyph Interface", "50MP Dual Camera"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "p6",
    name: "Redmi Note 14 Pro+ 5G",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 29999,
    mrp: 33999,
    specs: ["12GB RAM", "256GB", "200MP OIS Camera", "IP68 Rating"],
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=80",
    isActive: false, // Hidden by default — Admin can turn it ON
    inStock: true
  },
  {
    id: "h1",
    name: "Sony WH-1000XM5 Wireless ANC",
    brand: "Sony",
    category: "Headphones",
    price: 26990,
    mrp: 34990,
    specs: ["Studio ANC", "30 Hr Battery", "Multipoint Bluetooth"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "h2",
    name: "boAt Rockerz 551ANC",
    brand: "boAt",
    category: "Headphones",
    price: 2999,
    mrp: 4990,
    specs: ["35dB Active Noise Cancelling", "100 Hr Playback", "40mm Drivers"],
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "h3",
    name: "Realme Buds Air 6 Pro",
    brand: "Realme",
    category: "Headphones",
    price: 4499,
    mrp: 5999,
    specs: ["50dB Smart ANC", "Hi-Res LDAC Audio", "40 Hr Total Playback"],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  },
  {
    id: "h4",
    name: "Apple AirPods Max",
    brand: "Apple",
    category: "Headphones",
    price: 54900,
    mrp: 59900,
    specs: ["Spatial Audio", "Pro Active Noise Cancellation", "20 Hr Battery"],
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    inStock: true
  }
];

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let products = loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
let cart = loadFromStorage(STORAGE_KEYS.CART, []);
let currentUser = loadFromStorage(STORAGE_KEYS.USER, null);
let isAdminLoggedIn = loadFromStorage(STORAGE_KEYS.ADMIN, false);
let storeName = localStorage.getItem(STORAGE_KEYS.BRAND) || DEFAULT_STORE_NAME;
let selectedCategory = "All";

// Safe LocalStorage Loader
function loadFromStorage(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(fallbackValue));
  } catch (err) {
    console.warn("Storage load error, using fallback:", err);
    return JSON.parse(JSON.stringify(fallbackValue));
  }
}

// Format Indian Rupee (₹)
function formatINR(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

// Calculate Discount Percentage
function getDiscountPercent(price, mrp) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
// ==========================================================================
// INITIALIZE APP WHEN PAGE LOADS
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
  applyStoreName(storeName);
  updateAuthUI();
  syncCartWithInventory();
  renderShop();
  renderAdminTable();
  renderCart();
});

// ==========================================================================
// STORE NAME / BRANDING CONTROLLER
// ==========================================================================
function updateStoreName() {
  const input = document.getElementById("storeNameInput");
  if (!input) return;

  const newName = input.value.trim();
  if (!newName) {
    showToast("Please enter a valid store name!");
    return;
  }
  storeName = newName;
  localStorage.setItem(STORAGE_KEYS.BRAND, storeName);
  applyStoreName(storeName);
  showToast(`Website renamed to "${storeName}"!`);
}

function applyStoreName(name) {
  document.title = `${name} | Phones & Audio`;

  const brandText = document.getElementById("brandNameText");
  if (brandText) brandText.textContent = name;

  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) heroTitle.textContent = `Welcome to ${name}`;

  const storeInput = document.getElementById("storeNameInput");
  if (storeInput) storeInput.value = name;
}

// ==========================================================================
// NAVIGATION BETWEEN SHOP, USER LOGIN & ADMIN PORTAL
// ==========================================================================
function switchView(viewName) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

  const searchBox = document.getElementById("navSearchBox");

  if (viewName === "shop") {
    document.getElementById("view-shop").classList.add("active");
    document.getElementById("navShopBtn").classList.add("active");
    if (searchBox) searchBox.style.visibility = "visible";
    renderShop();
  } else if (viewName === "user-login") {
    document.getElementById("view-user-login").classList.add("active");
    document.getElementById("navUserBtn").classList.add("active");
    if (searchBox) searchBox.style.visibility = "hidden";
  } else if (viewName === "admin") {
    document.getElementById("view-admin").classList.add("active");
    document.getElementById("navAdminBtn").classList.add("active");
    if (searchBox) searchBox.style.visibility = "hidden";
    renderAdminTable();
  }
}
// ==========================================================================
// CUSTOMER SHOPPING VIEW (Strictly Smartphones & Headphones)
// ==========================================================================
function setCategory(category) {
  selectedCategory = category;
  document.querySelectorAll(".cat-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });
  renderShop();
}

function renderShop() {
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const inStockCheckbox = document.getElementById("inStockOnly");

  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const hideOutOfStock = inStockCheckbox ? inStockCheckbox.checked : false;

  // STEP 1: Only show items that Admin has marked as ACTIVE on Website
  const activeProducts = products.filter(item => item.isActive === true);

  // Update Hero Banner counter
  const statCountEl = document.getElementById("statActiveCount");
  if (statCountEl) statCountEl.textContent = activeProducts.length;

  // STEP 2: Filter by Category (Smartphones / Headphones), Stock, and Search
  const filteredProducts = activeProducts.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStock = !hideOutOfStock || item.inStock === true;
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.specs.join(" ").toLowerCase().includes(query);

    return matchesCategory && matchesStock && matchesSearch;
  });
  // Empty State
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="admin-card" style="grid-column: 1 / -1; text-align: center; padding: 45px 20px;">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
        <h3>No Phones or Headphones Found</h3>
        <p style="color: #94a3b8; margin-top: 6px; font-size: 0.9rem;">
          Try searching a different brand or open the <strong>Admin Portal</strong> to activate hidden devices.
        </p>
      </div>
    `;
    return;
  }

  // Render Product Cards
  grid.innerHTML = filteredProducts.map(item => {
    const fallbackEmoji = item.category === "Smartphones" ? "📱" : "🎧";
    const discount = getDiscountPercent(item.price, item.mrp);

    const imageHTML = item.image
      ? `<img src="${item.image}" alt="${item.name}" loading="lazy" 
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
         <span class="fallback-emoji" style="display:none;">${fallbackEmoji}</span>`
      : `<span class="fallback-emoji">${fallbackEmoji}</span>`;

    return `
      <div class="product-card">
        <div class="card-img-box">
          ${imageHTML}
          <span class="badge-top-left">${item.category}</span>
          <span class="badge-stock ${item.inStock ? "in" : "out"}">
            ${item.inStock ? "● Available" : "● Out of Stock"}
          </span>
        </div>
        <div class="card-body">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="card-brand">${item.brand}</span>
            ${discount > 0 ? `<span style="color:#10b981; font-size:0.75rem; font-weight:800;">${discount}% OFF</span>` : ""}
          </div>

          <h3 class="card-title">${item.name}</h3>

          <div class="spec-pills">
            ${item.specs.map(spec => `<span class="spec-pill">${spec}</span>`).join("")}
          </div>

          <div class="card-footer">
            <div>
              <span class="price-now">${formatINR(item.price)}</span>
              ${item.mrp > item.price ? `<span class="price-mrp">${formatINR(item.mrp)}</span>` : ""}
            </div>

            <button class="btn-primary" 
              ${!item.inStock ? "disabled" : ""} 
              onclick="addToCart('${item.id}')">
              ${item.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// USER LOGIN & LOGOUT SYSTEM
// ==========================================================================
function handleUserLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("userEmail").value.trim();
  if (!emailInput) return;

  // Create readable name from email or phone number
  const rawName = emailInput.includes("@") ? emailInput.split("@")[0] : emailInput;
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  currentUser = {
    name: formattedName,
    email: emailInput
  };

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  updateAuthUI();
  showToast(`Welcome back, ${currentUser.name}!`);
  switchView("shop");
}
function quickUserDemoLogin() {
  currentUser = {
    name: "Nazmul",
    email: "nazmul@smartstore.in"
  };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  updateAuthUI();
  showToast(`Logged in as ${currentUser.name}!`);
  switchView("shop");
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.USER);
  updateAuthUI();
  showToast("User logged out successfully.");
}

// ==========================================================================
// ADMIN LOGIN & INVENTORY CONTROL SYSTEM
// ==========================================================================
function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("adminUser").value.trim().toLowerCase();
  const password = document.getElementById("adminPass").value.trim();

  // Default Admin Login Check
  if (password === "admin123" || (username === "admin@smartstore.in" && password.length >= 4)) {
    isAdminLoggedIn = true;
    localStorage.setItem(STORAGE_KEYS.ADMIN, "true");
    updateAuthUI();
    renderAdminTable();
    showToast("Admin Portal Unlocked!");
  } else {
    alert("Invalid Admin Credentials!\n\nUse Email: admin@smartstore.in\nPassword: admin123");
  }
}

function quickAdminDemoLogin() {
  isAdminLoggedIn = true;
  localStorage.setItem(STORAGE_KEYS.ADMIN, "true");
  updateAuthUI();
  renderAdminTable();
  showToast("Admin Dashboard Unlocked!");
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  localStorage.removeItem(STORAGE_KEYS.ADMIN);
  updateAuthUI();
  showToast("Admin logged out.");
}

function updateAuthUI() {
  // 1. Update Customer UI
  const userStatusText = document.getElementById("userStatusText");
  const userLoggedOutBox = document.getElementById("userLoggedOutBox");
  const userLoggedInBox = document.getElementById("userLoggedInBox");

  if (currentUser) {
    if (userStatusText) userStatusText.textContent = `👤 ${currentUser.name}`;
    if (userLoggedOutBox) userLoggedOutBox.style.display = "none";
    if (userLoggedInBox) userLoggedInBox.style.display = "block";
    document.getElementById("loggedUserName").textContent = currentUser.name;
    document.getElementById("loggedUserEmail").textContent = currentUser.email;
  } else {
    if (userStatusText) userStatusText.textContent = "User Login";
    if (userLoggedOutBox) userLoggedOutBox.style.display = "block";
    if (userLoggedInBox) userLoggedInBox.style.display = "none";
  }
  // 2. Update Admin UI
  const adminStatusText = document.getElementById("adminStatusText");
  const adminLoginBox = document.getElementById("adminLoginBox");
  const adminDashboardBox = document.getElementById("adminDashboardBox");

  if (isAdminLoggedIn) {
    if (adminStatusText) adminStatusText.textContent = "⚡ Admin (Active)";
    if (adminLoginBox) adminLoginBox.style.display = "none";
    if (adminDashboardBox) adminDashboardBox.style.display = "block";
  } else {
    if (adminStatusText) adminStatusText.textContent = "Admin Portal";
    if (adminLoginBox) adminLoginBox.style.display = "block";
    if (adminDashboardBox) adminDashboardBox.style.display = "none";
  }
}

// ==========================================================================
// ADMIN PRODUCT TABLE & INSTANT TOGGLES (Active on Website / In Stock)
// ==========================================================================
function saveProducts() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  syncCartWithInventory();
  renderShop();
  renderAdminTable();
  renderCart();
}

function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  const totalCountEl = document.getElementById("adminTotalCount");
  if (!tbody) return;

  if (totalCountEl) totalCountEl.textContent = products.length;

  tbody.innerHTML = products.map(item => `
    <tr>
      <td>
        <strong>${item.name}</strong>
        <div style="font-size: 0.75rem; color: #94a3b8;">${item.brand}</div>
      </td>
      <td>
        <span style="font-size: 0.8rem;">${item.category === "Smartphones" ? "📱" : "🎧"} ${item.category}</span>
      </td>
      <td>
        <strong>${formatINR(item.price)}</strong>
        <div style="font-size: 0.72rem; color: #64748b; text-decoration: line-through;">${formatINR(item.mrp)}</div>
      </td>
      <td>
        <button class="status-pill ${item.isActive ? "on" : "off"}" onclick="toggleWebsiteActive('${item.id}')">
          ${item.isActive ? "✓ ACTIVE ON SITE" : "✕ HIDDEN ON SITE"}
        </button>
      </td>
      <td>
        <button class="status-pill ${item.inStock ? "on" : "off"}" onclick="toggleStockStatus('${item.id}')">
          ${item.inStock ? "✓ HAVE IN STOCK" : "✕ OUT OF STOCK"}
        </button>
      </td>
      <td class="row-actions">
        <button class="btn-secondary" onclick="startEditProduct('${item.id}')">Edit</button>
        <button class="btn-danger" onclick="deleteProduct('${item.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}
// Toggle 1: Whether the Phone/Headphone is ACTIVE on the website or HIDDEN
function toggleWebsiteActive(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  item.isActive = !item.isActive;
  saveProducts();
  showToast(`${item.name}: ${item.isActive ? "Now ACTIVE on Website" : "HIDDEN from Website"}`);
}

// Toggle 2: Whether the Phone/Headphone is IN STOCK or OUT OF STOCK
function toggleStockStatus(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  item.inStock = !item.inStock;
  saveProducts();
  showToast(`${item.name}: ${item.inStock ? "Marked IN STOCK" : "Marked OUT OF STOCK"}`);
}

// Add or Update a Phone / Headphone from the Admin Form
function saveProductFromForm(event) {
  event.preventDefault();

  const editId = document.getElementById("editProductId").value;
  const name = document.getElementById("pName").value.trim();
  const brand = document.getElementById("pBrand").value.trim();
  const category = document.getElementById("pCategory").value;
  const price = Number(document.getElementById("pPrice").value);
  const mrp = Number(document.getElementById("pMrp").value) || price;
  const specsRaw = document.getElementById("pSpecs").value;
  const image = document.getElementById("pImage").value.trim();
  const isActive = document.getElementById("pActive").checked;
  const inStock = document.getElementById("pStock").checked;

  // Strictly enforce only the 2 allowed categories
  const validCategory = category === "Headphones" ? "Headphones" : "Smartphones";

  const productData = {
    id: editId || "dev_" + Date.now(),
    name,
    brand,
    category: validCategory,
    price,
    mrp: mrp < price ? price : mrp,
    specs: specsRaw.split(",").map(s => s.trim()).filter(Boolean),
    image,
    isActive,
    inStock
  };

  if (editId) {
    const index = products.findIndex(p => p.id === editId);
    if (index !== -1) {
      products[index] = productData;
      showToast(`Updated "${productData.name}"!`);
    }
  } else {
    products.unshift(productData);
    showToast(`Added "${productData.name}" to store!`);
  }

  resetProductForm();
  saveProducts();
}
// Load a product into the Admin Form for editing
function startEditProduct(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  document.getElementById("formTitle").textContent = `✏️ Editing: ${item.name}`;
  document.getElementById("editProductId").value = item.id;
  document.getElementById("pName").value = item.name;
  document.getElementById("pBrand").value = item.brand;
  document.getElementById("pCategory").value = item.category;
  document.getElementById("pPrice").value = item.price;
  document.getElementById("pMrp").value = item.mrp;
  document.getElementById("pSpecs").value = item.specs.join(", ");
  document.getElementById("pImage").value = item.image || "";
  document.getElementById("pActive").checked = item.isActive;
  document.getElementById("pStock").checked = item.inStock;

  document.getElementById("saveProductBtn").textContent = "Update Device";
  document.getElementById("cancelEditBtn").style.display = "inline-block";

  // Smooth scroll up to form on mobile/smaller screens
  document.getElementById("productForm").scrollIntoView({ behavior: "smooth" });
}

function resetProductForm() {
  const form = document.getElementById("productForm");
  if (form) form.reset();

  document.getElementById("editProductId").value = "";
  document.getElementById("formTitle").textContent = "➕ Add New Phone or Headphone";
  document.getElementById("saveProductBtn").textContent = "Save to Catalog";
  document.getElementById("cancelEditBtn").style.display = "none";
}

function deleteProduct(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  products = products.filter(p => p.id !== productId);
  saveProducts();
  showToast(`Deleted "${item.name}".`);
}

function resetDefaultData() {
  products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  saveProducts();
  showToast("Default Phones & Headphones restored!");
}
// ==========================================================================
// SHOPPING CART ENGINE
// ==========================================================================
function toggleCart(open) {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer) drawer.classList.toggle("open", open);
  if (overlay) overlay.classList.toggle("open", open);
}

// Automatically remove items from cart if Admin hides them or marks them Out of Stock
function syncCartWithInventory() {
  cart = cart.filter(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    if (!product || !product.isActive || !product.inStock) {
      return false;
    }
    // Keep price updated if Admin edited the price
    cartItem.name = product.name;
    cartItem.price = product.price;
    return true;
  });
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (!product.isActive || !product.inStock) {
    showToast("Sorry, this item is currently unavailable!");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveCart();
  showToast(`🛒 ${product.name} added to cart!`);
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== productId);
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  renderCart();
}
function renderCart() {
  const listEl = document.getElementById("cartItemsList");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotalPrice");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (countEl) countEl.textContent = totalQty;
  if (totalEl) totalEl.textContent = formatINR(totalAmount);

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; color: #94a3b8; margin-top: 50px;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛒</div>
        <p>Your cart is empty.</p>
        <p style="font-size: 0.78rem; margin-top: 4px;">Add smartphones or headphones to begin.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-sub">${formatINR(item.price)} × ${item.qty} = <strong>${formatINR(item.price * item.qty)}</strong></div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join("");
}

function checkoutCart() {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add a phone or headphone first.");
    return;
  }

  if (!currentUser) {
    toggleCart(false);
    switchView("user-login");
    showToast("Please sign in to complete your purchase!");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemSummary = cart.map(i => `• ${i.name} (x${i.qty})`).join("\n");

  alert(
    `✅ Order Confirmed on ${storeName}!\n\n` +
    `Customer: ${currentUser.name} (${currentUser.email})\n\n` +
    `Items Ordered:\n${itemSummary}\n\n` +
    `Total Paid: ${formatINR(totalAmount)}`
  );

  cart = [];
  saveCart();
  toggleCart(false);
  showToast("Order placed successfully! 🎉");
}
// ==========================================================================
// TOAST NOTIFICATION HELPER
// ==========================================================================
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}