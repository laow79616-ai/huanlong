// Simple cart + products loader for the fantasy toy demo

const CART_KEY = 'nothosaur_demo_cart';

let products = [];
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

async function loadProducts() {
  try {
    const res = await fetch('js/products.json');
    products = await res.json();
  } catch (e) {
    console.error('Failed to load products', e);
    products = [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  const cartItemsEl = document.getElementById('cart-items');
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p style="color:#a0a0a0;text-align:center;padding:40px 0;">Your cart is empty</p>';
    document.getElementById('cart-total-price').textContent = '$0.00';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => {
    const p = products.find(pr => pr.id === item.id) || {};
    return `
      <div class="cart-item">
        <img src="${p.image || ''}" alt="${p.name || ''}">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name || item.id}</div>
          <div class="cart-item-meta">${item.size || ''} / ${item.firmness || ''} × ${item.qty}</div>
          <div class="product-price">$${(p.price * item.qty).toFixed(2)}</div>
        </div>
        <button onclick="removeFromCart('${item.id}', '${item.size}', '${item.firmness}')" style="background:none;border:none;color:#ff1493;cursor:pointer;font-size:1.2rem;">×</button>
      </div>
    `;
  }).join('');

  const total = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
}

function addToCart(id, size = 'M', firmness = 'Medium', qty = 1) {
  const existing = cart.find(i => i.id === id && i.size === size && i.firmness === firmness);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, firmness, qty });
  }
  saveCart();
  openCart();
}

function removeFromCart(id, size, firmness) {
  cart = cart.filter(i => !(i.id === id && i.size === size && i.firmness === firmness));
  saveCart();
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}

function toggleMobileMenu() {
  document.getElementById('mobile-nav')?.classList.toggle('open');
}

function renderProductGrid(containerId, filterFn = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let list = filterFn ? products.filter(filterFn) : products;
  container.innerHTML = list.map(p => `
    <a href="product.html?id=${p.id}" class="product-card">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.subtitle || ''}</div>
        <div class="product-price">${p.fromPrice ? 'From ' : ''}$${p.price.toFixed(2)}</div>
      </div>
    </a>
  `).join('');
}

function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return products.find(p => p.id === id) || products[0];
}

function renderProductDetail() {
  const p = getProductFromUrl();
  if (!p) return;

  document.getElementById('detail-img').src = p.image;
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-subtitle').textContent = p.subtitle || '';
  document.getElementById('detail-price').textContent = `From $${p.price.toFixed(2)}`;
  document.getElementById('detail-desc').textContent = p.description || '';

  const featuresEl = document.getElementById('detail-features');
  if (featuresEl) {
    featuresEl.innerHTML = (p.features || []).map(f => `<li>${f}</li>`).join('');
  }

  // Size buttons
  const sizeEl = document.getElementById('size-options');
  if (sizeEl) {
    sizeEl.innerHTML = (p.sizes || ['M']).map((s, i) =>
      `<button class="option-btn ${i === 1 ? 'active' : ''}" data-value="${s}" onclick="selectOption(this, 'size')">${s}</button>`
    ).join('');
  }

  // Firmness buttons
  const firmEl = document.getElementById('firmness-options');
  if (firmEl) {
    firmEl.innerHTML = (p.firmness || ['Medium']).map((f, i) =>
      `<button class="option-btn ${i === 0 ? 'active' : ''}" data-value="${f}" onclick="selectOption(this, 'firmness')">${f}</button>`
    ).join('');
  }

  // Store current selection
  window.currentProduct = p;
  window.selectedSize = (p.sizes || ['M'])[1] || 'M';
  window.selectedFirmness = (p.firmness || ['Medium'])[0];
}

function selectOption(btn, type) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (type === 'size') window.selectedSize = btn.dataset.value;
  if (type === 'firmness') window.selectedFirmness = btn.dataset.value;
}

function handleAddToCart() {
  if (!window.currentProduct) return;
  const qty = parseInt(document.getElementById('qty')?.value || 1);
  addToCart(window.currentProduct.id, window.selectedSize, window.selectedFirmness, qty);
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  updateCartUI();

  if (document.getElementById('home-products')) {
    renderProductGrid('home-products');
  }
  if (document.getElementById('all-products')) {
    renderProductGrid('all-products');
  }
  if (document.getElementById('detail-name')) {
    renderProductDetail();
  }
});
