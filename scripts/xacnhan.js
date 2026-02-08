// Check login
if (!localStorage.getItem("isLoggedIn") && !sessionStorage.getItem("isLoggedIn")) {
    alert("Vui lòng đăng nhập để mua tài khoản!");
    window.location.href = "login.html";
}

function confirmBuy() {
    // Check login before allowing purchase
    if (!localStorage.getItem("isLoggedIn") && !sessionStorage.getItem("isLoggedIn")) {
        // Show modal for guests
        document.getElementById('guest-modal').style.display = 'block';
        return;
    }

    // Get account details from the page
    const accountTitle = document.querySelector('.confirm-info h2').textContent;
    const accountDetails = document.querySelector('.confirm-info p').textContent.replace('<strong>', '').replace('</strong>', '').replace('Giá: ', '');

    // Add to purchased accounts
    let purchasedAccounts = JSON.parse(localStorage.getItem('purchasedAccounts')) || [];
    purchasedAccounts.push(`${accountTitle} - ${accountDetails}`);
    localStorage.setItem('purchasedAccounts', JSON.stringify(purchasedAccounts));

    // Show confirmation modal
    const isDarkMode = document.body.classList.contains('dark-mode');
    const modalBg = isDarkMode ? '#1e1e1e' : 'white';
    const textColor = isDarkMode ? 'white' : 'black';
    const confirmModal = document.createElement('div');
    confirmModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: ${modalBg}; color: ${textColor}; padding: 20px; border-radius: 10px; text-align: center;">
                <h2>Cảm ơn bạn đã mua đúng tài khoản!</h2>
                <p>Vui lòng liên hệ admin để nhận thông tin.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #22c55e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmModal);
}

function cancelBuy() {
    window.history.back();
}

function addToCart() {
    // Get account details from the page
    const accountTitle = document.querySelector('.confirm-info h2').textContent;
    const accountDetails = document.querySelector('.confirm-info p').textContent.replace('<strong>', '').replace('</strong>', '').replace('Giá: ', '');

    // Add to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(`${accountTitle} - ${accountDetails}`);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${accountTitle} added to cart!`);
}

function showCartModal() {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let totalPrice = 0;
    let cartItems = '';

    shoppingCart.forEach((item, index) => {
        // Extract price from item string, e.g., "Acc Blox Fruit #005 - Level 2400 | Trái budha - 300.000 VNĐ"
        const priceMatch = item.match(/(\d+\.\d+) VNĐ/);
        if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace('.', ''));
            totalPrice += price;
        }
        cartItems += `<li>${item} <button onclick="removeFromCart(${index})">Xóa</button></li>`;
    });

    const isDarkMode = document.body.classList.contains('dark-mode');
    const modalBg = isDarkMode ? '#1e1e1e' : 'white';
    const textColor = isDarkMode ? 'white' : 'black';

    const cartModal = document.createElement('div');
    cartModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: ${modalBg}; color: ${textColor}; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%;">
                <span style="float: right; cursor: pointer; font-size: 28px;" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h2>Giỏ hàng</h2>
                <ul style="list-style: none; padding: 0;">${cartItems}</ul>
                <p><strong>Tổng tiền: ${totalPrice.toLocaleString()} VNĐ</strong></p>
                <button onclick="buyAll()" style="background: #22c55e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">Mua tất cả</button>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Đóng</button>
            </div>
        </div>
    `;
    document.body.appendChild(cartModal);
}

function removeFromCart(index) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    shoppingCart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    // Refresh modal
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
    showCartModal();
}

function buyAll() {
    // Check login
    if (!localStorage.getItem("isLoggedIn") && !sessionStorage.getItem("isLoggedIn")) {
        alert("Vui lòng đăng nhập để mua tài khoản!");
        window.location.href = "login.html";
        return;
    }

    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let purchasedAccounts = JSON.parse(localStorage.getItem('purchasedAccounts')) || [];
    purchasedAccounts.push(...shoppingCart);
    localStorage.setItem('purchasedAccounts', JSON.stringify(purchasedAccounts));
    localStorage.removeItem('shoppingCart');

    // Show confirmation
    const isDarkMode = document.body.classList.contains('dark-mode');
    const modalBg = isDarkMode ? '#1e1e1e' : 'white';
    const textColor = isDarkMode ? 'white' : 'black';
    const confirmModal = document.createElement('div');
    confirmModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: ${modalBg}; color: ${textColor}; padding: 20px; border-radius: 10px; text-align: center;">
                <h2>Cảm ơn bạn đã mua tất cả tài khoản!</h2>
                <p>Vui lòng liên hệ admin để nhận thông tin.</p>
                <button onclick="this.parentElement.parentElement.remove(); window.location.reload()" style="background: #22c55e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmModal);
}

// Guest Modal
const guestModal = document.getElementById('guest-modal');
const continueGuestBtn = document.getElementById('continue-guest');
const signInBtn = document.getElementById('sign-in');

continueGuestBtn.addEventListener('click', () => {
    guestModal.style.display = 'none';
    alert("Bạn không thể mua tài khoản khi chưa đăng nhập!");
});

signInBtn.addEventListener('click', () => {
    guestModal.style.display = 'none';
    window.location.href = 'signin.html';
});

// Close guest modal
const guestCloseBtns = guestModal.querySelectorAll('.close');
guestCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        guestModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === guestModal) {
        guestModal.style.display = 'none';
    }
});

// Dark Mode Toggle
const body = document.body;

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}
