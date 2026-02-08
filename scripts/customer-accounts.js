function toggleChat() {
    const chat = document.getElementById("chatbotBox");
    chat.style.display = chat.style.display === "none" ? "block" : "none";
}

// User Modal
const navProfileImg = document.getElementById('nav-profile-picture');
const navIcon = document.getElementById('nav-icon');
const userModal = document.getElementById('user-modal');
const settingsToggle = document.getElementById('settings-toggle');
const settingsContent = document.getElementById('settings-content');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const logoutBtn = document.getElementById('logout-btn');

navProfileImg.addEventListener('click', () => {
    userModal.style.display = 'block';
    loadUserData();
});

navIcon.addEventListener('click', () => {
    userModal.style.display = 'block';
    loadUserData();
});

settingsToggle.addEventListener('click', () => {
    settingsContent.style.display = settingsContent.style.display === 'none' ? 'block' : 'none';
});

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light Mode';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙 Dark Mode';
    }
});

// Close modals
const closeBtns = document.getElementsByClassName('close');
for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', () => {
        userModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === userModal) {
        userModal.style.display = 'none';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('purchasedAccounts');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

function loadUserData() {
    const username = localStorage.getItem('userName') || 'Guest';
    const email = localStorage.getItem('userEmail') || 'guest@example.com';
    const profilePicture = localStorage.getItem('profilePicture');
    const profileImg = document.getElementById('profile-picture');
    const navProfileImg = document.getElementById('nav-profile-picture');
    const navIcon = document.getElementById('nav-icon');
    if (profilePicture) {
        profileImg.src = profilePicture;
        profileImg.style.display = 'block';
        navProfileImg.src = profilePicture;
        navProfileImg.style.display = 'inline';
        navIcon.style.display = 'none';
        navProfileImg.onerror = () => {
            navProfileImg.style.display = 'none';
            navIcon.style.display = 'inline';
        };
    } else {
        profileImg.style.display = 'none';
        navProfileImg.style.display = 'none';
        navIcon.style.display = 'inline';
    }
    document.getElementById('user-info').innerHTML = `
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;

    const purchasedAccounts = JSON.parse(localStorage.getItem('purchasedAccounts')) || [];
    const list = document.getElementById('purchased-accounts');
    list.innerHTML = purchasedAccounts.length > 0
        ? purchasedAccounts.map(acc => `<li>${acc}</li>`).join('')
        : '<li>No purchases yet.</li>';
}

// Custom Accounts CRUD
const accountForm = document.getElementById('account-form');
const accountsList = document.getElementById('accounts-list');
let editingIndex = -1;

function loadAccounts() {
    const accounts = JSON.parse(localStorage.getItem('customAccounts')) || [];
    accountsList.innerHTML = '';
    accounts.forEach((account, index) => {
        const accountItem = document.createElement('div');
        accountItem.className = 'account-item';
        accountItem.innerHTML = `
            <div class="account-info">
                <img src="${account.image}" alt="${account.name}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
                <div>
                    <strong>${account.name}</strong> - Level ${account.level} | ${account.fruit} | ${account.price}
                </div>
            </div>
            <div class="account-actions">
                <button class="edit-btn" onclick="editAccount(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteAccount(${index})">Delete</button>
            </div>
        `;
        accountsList.appendChild(accountItem);
    });
}

accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('account-name').value;
    const level = document.getElementById('account-level').value;
    const fruit = document.getElementById('account-fruit').value;
    const price = document.getElementById('account-price').value;
    const image = document.getElementById('account-image').value;
    const email = document.getElementById('customer-email').value;

    const accounts = JSON.parse(localStorage.getItem('customAccounts')) || [];

    if (editingIndex >= 0) {
        accounts[editingIndex] = { name, level, fruit, price, image, email };
        editingIndex = -1;
        accountForm.querySelector('button').textContent = 'Submit for Approval';
    } else {
        accounts.push({ name, level, fruit, price, image, email });
    }

    localStorage.setItem('customAccounts', JSON.stringify(accounts));
    accountForm.reset();
    loadAccounts();
});

function editAccount(index) {
    const accounts = JSON.parse(localStorage.getItem('customAccounts')) || [];
    const account = accounts[index];
    document.getElementById('account-name').value = account.name;
    document.getElementById('account-level').value = account.level;
    document.getElementById('account-fruit').value = account.fruit;
    document.getElementById('account-price').value = account.price;
    document.getElementById('account-image').value = account.image;
    editingIndex = index;
    accountForm.querySelector('button').textContent = 'Update Submission';
}

function deleteAccount(index) {
    const accounts = JSON.parse(localStorage.getItem('customAccounts')) || [];
    accounts.splice(index, 1);
    localStorage.setItem('customAccounts', JSON.stringify(accounts));
    loadAccounts();
}

// Load accounts on page load
loadAccounts();

// Guest Modal
const guestModal = document.getElementById('guest-modal');
const continueGuestBtn = document.getElementById('continue-guest');
const signInBtn = document.getElementById('sign-in');
let targetUrl = '';

continueGuestBtn.addEventListener('click', () => {
    guestModal.style.display = 'none';
    window.location.href = targetUrl;
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
