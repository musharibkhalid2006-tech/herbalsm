/* =========================================================
   HERBA · L·S·M  —  MAIN SITE LOGIC
   ========================================================= */

/* ---------- Mobile Nav Toggle (Global Function & Auto Close) ---------- */
function toggleNav() {
  const mainNav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  if (mainNav) {
    mainNav.classList.toggle('open');
    mainNav.classList.toggle('active');
  }
  if (navToggle) {
    navToggle.classList.toggle('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  // Direct Event Listener Fallback
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav && navToggle) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open', 'active');
        navToggle.classList.remove('active');
      }
    }
  });
});

/* ---------- Hero Slider ---------- */
let heroIndex = 0;
let heroTimer;
function initHeroSlider(){
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  if(!slides.length) return;

  function show(i){
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[i].classList.add("active");
    if(dots[i]) dots[i].classList.add("active");
    heroIndex = i;
  }
  function next(){ show((heroIndex + 1) % slides.length); }

  dots.forEach((d, i) => d.addEventListener("click", () => {
    show(i);
    resetHeroTimer();
  }));

  function resetHeroTimer(){
    clearInterval(heroTimer);
    heroTimer = setInterval(next, 5000);
  }

  show(0);
  resetHeroTimer();
}

/* ---------- Product Card Template ---------- */
function productCardHTML(p){
  const discount = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice * 100)) : null;
  return `
  <div class="product-card" data-cat="${p.category}">
    <div class="product-media">
      <div class="badges-col">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        ${discount ? `<span class="badge gold">-${discount}%</span>` : ""}
      </div>
      <button class="wish-btn" aria-label="Add to Wishlist" onclick="showToast('Added to your Wishlist')">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2 4.5 5.6 4a5 5 0 0 1 6.4 2 5 5 0 0 1 6.4-2c3.6.5 5.2 4.1 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>
      </button>
      <img src="${p.image}" alt="${p.title}" loading="lazy">
    </div>
    <div class="product-info">
      <span class="product-cat">${p.categoryLabel}</span>
      <h3 class="product-title">${p.title}</h3>
      <span class="product-vol">${p.volume}</span>
      <div class="price-row">
        <span class="price">${STORE.currency}${p.price.toLocaleString()}</span>
        ${p.oldPrice ? `<span class="price-old">${STORE.currency}${p.oldPrice.toLocaleString()}</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="btn-add" data-id="${p.id}" onclick="addToCart('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Add to Cart
        </button>
        <button class="btn-icon-wa" aria-label="Order via WhatsApp" onclick="orderSingleViaWhatsApp('${p.id}')">
          <svg viewBox="0 0 32 32"><path d="M16.04 2.67c-7.33 0-13.28 5.95-13.28 13.28 0 2.34.62 4.63 1.79 6.64L2.67 29.3l6.87-1.8a13.24 13.24 0 0 0 6.5 1.66h.01c7.33 0 13.28-5.95 13.28-13.28S23.37 2.67 16.04 2.67zm0 24.3h-.01a11 11 0 0 1-5.6-1.53l-.4-.24-4.08 1.07 1.09-3.97-.26-.41a10.98 10.98 0 0 1-1.69-5.84c0-6.08 4.95-11.02 11.03-11.02 2.94 0 5.71 1.15 7.79 3.23a10.95 10.95 0 0 1 3.23 7.8c0 6.08-4.95 11.02-11.03 11.02h-.07zm6.04-8.26c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.05 1.3-.19.22-.39.25-.72.08-.33-.17-1.4-.52-2.66-1.65-.98-.88-1.65-1.96-1.84-2.29-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.17-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.8-1.02-2.47-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.42-.3.33-1.16 1.13-1.16 2.76s1.19 3.2 1.35 3.42c.17.22 2.34 3.58 5.68 5.02.79.34 1.41.55 1.89.7.79.25 1.51.22 2.08.13.63-.1 1.96-.8 2.24-1.57.28-.77.28-1.44.19-1.57-.08-.14-.3-.22-.63-.39z"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function categoryCardHTML(c){
  return `
  <a class="cat-card" href="products.html?cat=${c.id}">
    <img src="${c.img}" alt="${c.name}" style="object-position:${c.imgPosition || 'center'};">
    <div class="cat-overlay">
      <svg class="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 2C8 6 6 10 6 13a6 6 0 0 0 12 0c0-3-2-7-6-11z"/></svg>
      <h3>${c.name}</h3>
      <span>${c.tagline}</span>
    </div>
  </a>`;
}

/* ---------- Homepage Render ---------- */
function renderHomepage(){
  const catWrap = document.getElementById("categoryGrid");
  if(catWrap && typeof CATEGORIES !== "undefined") catWrap.innerHTML = CATEGORIES.map(categoryCardHTML).join("");

  const featuredWrap = document.getElementById("featuredGrid");
  if(featuredWrap && typeof PRODUCTS !== "undefined"){
    const featured = PRODUCTS.slice(0, 4);
    featuredWrap.innerHTML = featured.map(productCardHTML).join("");
  }

  const bestWrap = document.getElementById("bestsellerGrid");
  if(bestWrap && typeof PRODUCTS !== "undefined"){
    const best = PRODUCTS.filter(p => p.badge === "Best Seller");
    bestWrap.innerHTML = best.map(productCardHTML).join("");
  }
}

/* ---------- Product Listing & Search ---------- */
let activeFilter = "all";
let activeSort = "default";
let searchTerm = "";

function getFilteredProducts(){
  if(typeof PRODUCTS === "undefined") return [];
  let list = [...PRODUCTS];

  if(activeFilter !== "all"){
    list = list.filter(p => p.category === activeFilter);
  }
  if(searchTerm.trim() !== ""){
    const q = searchTerm.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if(activeSort === "price-asc") list.sort((a,b) => a.price - b.price);
  if(activeSort === "price-desc") list.sort((a,b) => b.price - a.price);
  if(activeSort === "name") list.sort((a,b) => a.title.localeCompare(b.title));

  return list;
}

function renderListingPage(){
  const wrap = document.getElementById("listingGrid");
  if(!wrap) return;
  const list = getFilteredProducts();

  const countElem = document.getElementById("resultsCount");
  if(countElem) {
    countElem.textContent = `${list.length} product${list.length !== 1 ? "s" : ""} mile`;
  }

  wrap.innerHTML = list.length
    ? list.map(productCardHTML).join("")
    : `<p style="grid-column:1/-1;color:var(--text-muted);text-align:center;padding:60px 0;">No products found. Try adjusting your filters or search criteria.</p>`;
}

function setFilter(cat){
  activeFilter = cat;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === cat));

  const url = new URL(window.location);
  if(cat === "all") url.searchParams.delete("cat");
  else url.searchParams.set("cat", cat);
  window.history.replaceState({}, "", url);
  initNavHighlight();

  renderListingPage();
}

function initListingControls(){
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("cat");
  if(catParam) activeFilter = catParam;
  const qParam = params.get("q");
  if(qParam){
    searchTerm = qParam;
    document.querySelectorAll(".site-search").forEach(i => i.value = qParam);
  }

  document.querySelectorAll(".chip").forEach(chip => {
    if(chip.dataset.cat === activeFilter) chip.classList.add("active");
    chip.addEventListener("click", () => setFilter(chip.dataset.cat));
  });

  const sortSelect = document.getElementById("sortSelect");
  if(sortSelect){
    sortSelect.addEventListener("change", e => {
      activeSort = e.target.value;
      renderListingPage();
    });
  }

  const searchInputs = document.querySelectorAll(".site-search");
  searchInputs.forEach(input => {
    input.addEventListener("input", e => {
      searchTerm = e.target.value;
      renderListingPage();
    });
  });

  renderListingPage();
}

/* ---------- Order Modal ---------- */
function openOrderModal(){
  if(typeof getCart === "function" && getCart().length === 0){
    showToast("Your cart is empty — please add products before checking out.");
    return;
  }
  document.getElementById("orderModal")?.classList.add("open");
}
function closeOrderModal(){
  document.getElementById("orderModal")?.classList.remove("open");
}
function submitOrderForm(e){
  e.preventDefault();
  const customer = {
    name: document.getElementById("custName").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    address: document.getElementById("custAddress").value.trim(),
    notes: document.getElementById("custNotes").value.trim(),
  };
  if(typeof sendOrderToWhatsApp === "function") {
    sendOrderToWhatsApp(customer);
  }
  closeOrderModal();
}

function initNavHighlight(){
  const links = document.querySelectorAll("nav.main-nav a");
  links.forEach(l => l.classList.remove("active"));

  const page = window.location.pathname.split("/").pop() || "index.html";
  const cat = new URLSearchParams(window.location.search).get("cat");

  let targetHref;
  if(page === "products.html"){
    if(cat === "hair-oils") targetHref = "products.html?cat=hair-oils";
    else if(cat === "shampoo") targetHref = "products.html?cat=shampoo";
    else targetHref = "products.html";
  }else{
    targetHref = "index.html";
  }

  links.forEach(l => {
    if(l.getAttribute("href") === targetHref) l.classList.add("active");
  });
}

function initScrollSpy(){
  const homeLink    = document.querySelector('nav.main-nav a[href="index.html"]');
  const aboutLink   = document.querySelector('nav.main-nav a[href="index.html#about"]');
  const contactLink = document.querySelector('nav.main-nav a[href="index.html#contact"]');
  const aboutSection   = document.getElementById("about");
  const contactSection = document.getElementById("contact");

  if(!aboutSection || !contactSection) return;

  const spyLinks = [aboutLink, contactLink].filter(Boolean);

  function setActive(link){
    spyLinks.forEach(l => l.classList.remove("active"));
    homeLink?.classList.remove("active");
    link?.classList.add("active");
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      setActive(entry.target.id === "about" ? aboutLink : contactLink);
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  observer.observe(aboutSection);
  observer.observe(contactSection);

  aboutLink?.addEventListener("click", () => setActive(aboutLink));
  contactLink?.addEventListener("click", () => setActive(contactLink));

  window.addEventListener("scroll", () => {
    if(window.scrollY < aboutSection.offsetTop - 200){
      spyLinks.forEach(l => l.classList.remove("active"));
      homeLink?.classList.add("active");
    }
  });
}

/* ---------- Init Everything ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  renderHomepage();
  initListingControls();
  initNavHighlight();
  initScrollSpy();

  document.getElementById("cartOverlay")?.addEventListener("click", () => {
    if(typeof closeCart === "function") closeCart();
  });

  const form = document.getElementById("orderForm");
  if(form) form.addEventListener("submit", submitOrderForm);
});

/* ---------- Lightbox Logic ---------- */
function openLightbox(src){
  const overlay = document.getElementById("lightboxOverlay");
  const img = document.getElementById("lightboxImg");
  if(!overlay || !img) return;
  img.src = src;
  overlay.classList.add("open");
}

function closeLightbox(){
  document.getElementById("lightboxOverlay")?.classList.remove("open");
}

document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeLightbox();
}); 
