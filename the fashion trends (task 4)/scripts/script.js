// script.js
const links = document.querySelectorAll('#navbar a');
const currentPage = window.location.pathname;

links.forEach(link => {
  if (link.getAttribute('href') === currentPage.split('/').pop()) {
    link.classList.add('active');
  }
});

// Load cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const buttons = document.querySelectorAll('.add-cart');
const cartCountDisplay = document.querySelector('.cart-count');

// Update cart count badge
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountDisplay.textContent = totalItems;

  if (totalItems === 0) {
    cartCountDisplay.style.display = 'none';
  } else {
    cartCountDisplay.style.display = 'inline-block';
  }
}

// Add to cart logic
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productBox = btn.closest('.product-box');
    const controls = productBox.querySelector('.cart-controls');
    const quantityInput = controls.querySelector('.quantity');
    const brand = productBox.querySelector('.brand')?.textContent.trim() || 'Unknown';
    const priceText = productBox.querySelector('.price')?.textContent || '0';
    const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // remove $ if present
    const quantity = parseInt(quantityInput.value) || 1;

    if (controls.style.display === 'none' || controls.style.display === '') {
      controls.style.display = 'block';
      btn.textContent = 'Added';

      const existingItem = cart.find(item => item.brand === brand && item.price === price);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ brand, price, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    } else {
      controls.style.display = 'none';
      btn.textContent = 'Add to Cart';
    }
  });
});

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.brand}</span>
      <span>${item.quantity} x $${item.price}</span>
    `;
    cartItemsContainer.appendChild(div);
  });
}
function clearCart() {
  localStorage.removeItem('cart');
  displayCartItems();
  document.querySelector('.cart-count').textContent = '0';
}

const bar = document.getElementById('bar');
const mobileLinks = document.getElementById('mobile-links');

bar.addEventListener('click', () => {
  mobileLinks.classList.toggle('show');
  mobileLinks.classList.toggle('hidden');
});



if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js')
          .then(reg => console.log('Service Worker registered:', reg))
          .catch(err => console.log('Service Worker registration failed:', err));
      });
    }

    // Optional: push notification permission
    if (Notification && Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Welcome to Fashion Trends!');
        }
      });
    }
