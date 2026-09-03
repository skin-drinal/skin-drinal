let cart = [];
const PHONE_NUMBER = "201000000000"; // استبدلي هذا برقم الواتساب الخاص بكِ

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}

function addToCart(title, price) {
    cart.push({ title, price });
    updateCart();
    toggleCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        document.getElementById('total-price').innerText = 'LE 0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `<span>${item.title}</span> <b>LE ${item.price}</b>`;
        cartContainer.appendChild(row);
    });

    document.getElementById('total-price').innerText = `LE ${total}`;
}

function sendOrderWhatsapp() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    let message = "🛍️ *New Order - SKIN.DRINAL*\n\n";
    let total = 0;
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.title} - LE ${item.price}\n`;
        total += item.price;
    });
    message += `\n*Total:* LE ${total}`;

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}
