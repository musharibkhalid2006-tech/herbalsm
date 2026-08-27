document.addEventListener('DOMContentLoaded', () => {
  const productModal = document.getElementById('productModal');
  const closeProductModal = document.getElementById('closeProductModal');
  const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
  
  let currentProductData = null; // Currently opened product ka data store karne ke liye

  // 1. Dynamic product cards click detection
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    
    // Check agar click product card par hua hai
    if (card) {
      // Ignore click agar direct Add to Cart ya WhatsApp button par ho
      if (
        e.target.closest('.btn-add') || 
        e.target.closest('.btn-icon-wa') || 
        e.target.closest('.wish-btn') || 
        e.target.closest('.wa-quick-btn')
      ) {
        return;
      }

      // Card attributes / text extract karein
      const img = card.querySelector('img') ? card.querySelector('img').src : '';
      const cat = card.querySelector('.product-cat, .cat-tag, .eyebrow') ? card.querySelector('.product-cat, .cat-tag, .eyebrow').innerText : '';
      const title = card.querySelector('h3, .product-title, h4') ? card.querySelector('h3, .product-title, h4').innerText : '';
      const vol = card.querySelector('.product-vol, .volume') ? card.querySelector('.product-vol, .volume').innerText : '';
      
      const priceElem = card.querySelector('.price, .current-price');
      const priceText = priceElem ? priceElem.innerText : '';
      
      const oldPriceElem = card.querySelector('.price-old, .old-price');
      const oldPriceText = oldPriceElem ? oldPriceElem.innerText : '';

      // ID fetch karein agar element ya button par dataset mojood ho
      const pId = card.dataset.id || (card.querySelector('[data-id]') ? card.querySelector('[data-id]').dataset.id : null);

      // Current product reference save karein
      currentProductData = {
        id: pId,
        name: title,
        title: title,
        price: priceText,
        img: img,
        image: img
      };

      // Modal UI update karein
      if (document.getElementById('modalProductImg')) document.getElementById('modalProductImg').src = img;
      if (document.getElementById('modalProductCat')) document.getElementById('modalProductCat').innerText = cat;
      if (document.getElementById('modalProductTitle')) document.getElementById('modalProductTitle').innerText = title;
      if (document.getElementById('modalProductVol')) document.getElementById('modalProductVol').innerText = vol;
      if (document.getElementById('modalProductPrice')) document.getElementById('modalProductPrice').innerText = priceText;
      if (document.getElementById('modalProductOldPrice')) document.getElementById('modalProductOldPrice').innerText = oldPriceText;

      // Modal display open karein
      if (productModal) {
        productModal.classList.add('open');
        productModal.style.display = 'flex';
      }
    }
  });

  // 2. Modal Add to Cart Button Click Logic
  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      if (!currentProductData) return;

      // Clear clean price value (e.g. "Rs. 900" -> 900)
      const numericPrice = parseFloat(currentProductData.price.replace(/[^0-9.]/g, '')) || 0;

      // Check karein cart.js mein kon sa function available hai
      if (typeof addToCart === 'function') {
        // Agar aapki cart.js mein ID ya Object pass hota ho
        if (currentProductData.id) {
          addToCart(currentProductData.id);
        } else {
          addToCart(currentProductData.title || currentProductData.name, numericPrice, currentProductData.img);
        }
      } else if (typeof cart !== 'undefined' && Array.isArray(cart)) {
        // Manual cart array Push Fallback
        cart.push({
          title: currentProductData.title,
          price: numericPrice,
          img: currentProductData.img,
          qty: 1
        });
        if (typeof updateCartUI === 'function') updateCartUI();
      }

      // Close modal after adding to cart
      productModal.classList.remove('open');
      productModal.style.display = 'none';

      // Notification / Toast
      if (typeof showToast === 'function') {
        showToast(`${currentProductData.title} added to cart!`);
      }
    });
  }

  // 3. Close Modal handlers
  if (closeProductModal) {
    closeProductModal.addEventListener('click', () => {
      productModal.classList.remove('open');
      productModal.style.display = 'none';
    });
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        productModal.classList.remove('open');
        productModal.style.display = 'none';
      }
    });
  }
});



