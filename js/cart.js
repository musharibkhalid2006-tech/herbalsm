/* =========================================================
   HERBA · L·S·M  —  CART LOGIC + WHATSAPP ORDER FLOW
   ========================================================= */

const CART_KEY = "herba_cart_v1";

/* ---------- State ---------- */
function getCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }catch(e){
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function addToCart(productId, qty = 1){
  const product = getProductById(productId);
  if(!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if(existing){
    existing.qty += qty;
  }else{
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast(`${product.title} Item added to your cart!`);
  flashAddButton(productId);
}

function updateQty(productId, delta){
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
}

function removeFromCart(productId){
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function clearCart(){
  saveCart([]);
}

function cartTotal(){
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const p = getProductById(item.id);
    return p ? sum + (p.price * item.qty) : sum;
  }, 0);
}

function cartItemCount(){
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* ---------- UI: cart count badge ---------- */
function updateCartCount(){
  const count = cartItemCount();
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------- UI: render drawer items ---------- */
function renderCart(){
  const cart = getCart();
  const wrap = document.getElementById("cartItems");
  const footTotal = document.getElementById("cartTotalAmt");
  if(!wrap) return;

  if(cart.length === 0){
    wrap.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-13z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L4 3H2"/></svg>
        <p>Your cart is currently empty.<br>Explore our products and start shopping.</p>
      </div>`;
    if(footTotal) footTotal.textContent = STORE.currency + "0";
    return;
  }

  wrap.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if(!p) return "";
    return `
    <div class="cart-item" data-id="${p.id}">
      <img src="${p.image}" alt="${p.title}">
      <div class="cart-item-info">
        <h4>${p.title}</h4>
        <div class="cart-item-vol">${p.volume}</div>
        <div class="qty-row">
          <button class="qty-btn" onclick="updateQty('${p.id}',-1)" aria-label="Reduce quantity">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${p.id}',1)" aria-label="Increase quantity">+</button>
        </div>
        <a class="remove-btn" onclick="removeFromCart('${p.id}')">Remove</a>
      </div>
      <div class="cart-item-price">${STORE.currency}${(p.price * item.qty).toLocaleString()}</div>
    </div>`;
  }).join("");

  if(footTotal) footTotal.textContent = STORE.currency + cartTotal().toLocaleString();
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function flashAddButton(productId){
  document.querySelectorAll(`.btn-add[data-id="${productId}"]`).forEach(btn => {
    const original = btn.innerHTML;
    btn.classList.add("added");
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> Added`;
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = original;
    }, 1400);
  });
}

/* ---------- Drawer open/close ---------- */
function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

/* ---------- WhatsApp order message builder ---------- */
function buildWhatsAppMessage(customer){
  const cart = getCart();
  let msg = `Assalam-o-Alaikum HERBA L.S.M team! I would like to place an order for the following items:\n\n`;

  cart.forEach((item, i) => {
    const p = getProductById(item.id);
    if(!p) return;
    msg += `${i + 1}. ${p.title} (${p.volume}) x${item.qty} — ${STORE.currency}${(p.price * item.qty).toLocaleString()}\n`;
  });

  msg += `\nTotal: ${STORE.currency}${cartTotal().toLocaleString()}\n`;
  msg += `\n---- Delivery Details ----\n`;
  msg += `Name: ${customer.name || "[Enter Your Full Name]"}\n`;
  msg += `Phone: ${customer.phone || "[Enter Your Full Number]"}\n`;
  msg += `Address: ${customer.address || "[Enter Your Full Address]"}\n`;
  if(customer.notes) msg += `Note: ${customer.notes}\n`;
  msg += `\nPlease confirm my order and let me know the estimated delivery time. Thank you`;

  return msg;
}

function sendOrderToWhatsApp(customer){
  if(getCart().length === 0){
    showToast("Your cart is empty — please add items before checking out.");
    return;
  }
  const text = encodeURIComponent(buildWhatsAppMessage(customer));
  const url = `https://wa.me/923702271313?text=${text}`;
  window.open(url, "_blank");
}

/* Quick single-product WhatsApp order (from product card) */
function orderSingleViaWhatsApp(productId){
  const p = getProductById(productId);
  if(!p) return;
  let msg = `Assalam-o-Alaikum HERBA L.S.M! I would like to order this product:\n\n`;
  msg += `• ${p.title} (${p.volume}) — ${STORE.currency}${p.price.toLocaleString()}\n\n`;
  msg += `Please guide me on how to confirm my order and proceed with payment.`;
  const url = `https://wa.me/923702271313?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
