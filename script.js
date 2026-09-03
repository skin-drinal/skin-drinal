// ==========================================
// SKIN.DRINAL - Cart & Free Shipping Logic
// ==========================================

// قائمة المنتجات كمثال (يمكنك التعديل عليها بحرية)
const products = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    price: 650,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    price: 1200,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Barrier Repair Moisturizer",
    price: 850,
    image: "https://images.unsplash.com/photo-1608248597261-833244677271?auto=format&fit=crop&w=500&q=80"
  }
];

let cart = [];
const FREE_SHIPPING_THRESHOLD = 2500;

// عناصر الواجهة
const productGrid = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const navDrawer = document.getElementById('navDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const openDrawerBtn = document.getElementById('openDrawerBtn');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCount = document.getElementById('cartCount');
const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

// عرض المنتجات في الصفحة
function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="product-price">${product.price} EGP</div>
      <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// إضافة منتج للسلة
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();
}

// تغيير الكمية أو الحذف
function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCart();
}

// تحديث حسابات السلة والرسالة الشرطية
function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.innerText = totalItems;
  cartSubtotal.innerText = `${subtotal} EGP`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    return;
  }

  // حساب المتبقي للشحن المجاني
  const amountNeeded = FREE_SHIPPING_THRESHOLD - subtotal;
  let freeShippingBanner = '';

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    // رسالة التهنئة عند الوصول للشرط
    freeShippingBanner = `
      <div style="background-color: #d4edda; color: #155724; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 15px; font-weight: 600; font-size: 0.85rem; border: 1px solid #c3e6cb;">
        🎉 Congratulations! You've unlocked Free Shipping!
      </div>
    `;
  } else {
    // رسالة تشجيعية توضح المبلغ المتبقي
    freeShippingBanner = `
      <div style="background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 15px; font-size: 0.85rem; border: 1px solid #ffeeba;">
        Add <strong>${amountNeeded} EGP</strong> more to get Free Shipping!
      </div>
    `;
  }

  // عرض محتويات السلة + رسالة الشحن
  cartItemsContainer.innerHTML = freeShippingBanner + cart.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <div>
        <strong style="font-size: 0.9rem; display: block;">${item.name}</strong>
        <span style="font-size: 0.8rem; color: #666;">${item.price} EGP × ${item.quantity}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button onclick="changeQuantity(${item.id}, -1)" style="padding: 2px 8px; border: 1px solid #ccc; background: #fff; cursor: pointer; border-radius: 4px;">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)" style="padding: 2px 8px; border: 1px solid #ccc; background: #fff; cursor: pointer; border-radius: 4px;">+</button>
      </div>
    </div>
  `).join('');
}

// فتح وإغلاق القوائم الجانبية
function openCart() {
  cartDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
}

function closeCart() {
  cartDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
}

function openDrawer() {
  navDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
}

function closeDrawers() {
  cartDrawer.classList.remove('active');
  navDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
}

// الأحداث (Event Listeners)
if (openCartBtn) openCartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawers);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawers);

// إرسال الطلب عبر الواتساب
if (whatsappCheckoutBtn) {
  whatsappCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if (!name || !phone || !address) {
      alert("Please fill in your delivery details.");
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    let itemsList = cart.map(i => `• ${i.name} (x${i.quantity}) - ${i.price * i.quantity} EGP`).join('%0A');
    
    let message = `*New Order - Skin.Drinal*%0A%0A`;
    message += `*Customer Info:*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0A%0A`;
    message += `*Order Items:*%0A${itemsList}%0A%0A`;
    message += `*Subtotal:* ${subtotal} EGP%0A`;
    message += `*Shipping:* ${isFreeShipping ? 'FREE ✨' : 'Standard Delivery'}%0A`;

    // رقم الواتساب المخصص لاستقبال الطلبات
    const whatsappNumber = "201000000000"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  });
}

// تشغيل العرض عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCart();
});
    
