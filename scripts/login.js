// Add admin account on load if not exists
let users = JSON.parse(localStorage.getItem("users")) || [];
if (!users.find(u => u.name === 'admin')) {
    users.push({name: 'admin', email: 'admin@admin.com', password: '0705009168sai'});
    localStorage.setItem("users", JSON.stringify(users));
}

// Toggle hiện/ẩn mật khẩu, tránh lỗi overflow/đè icon
const pwdInput = document.getElementById('loginPassword');
const togglePwd = document.getElementById('togglePwd');
togglePwd.addEventListener('click', () => {
    const isHidden = pwdInput.type === 'password';
    pwdInput.type = isHidden ? 'text' : 'password';
    togglePwd.innerHTML = isHidden
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';
});

// Validate cơ bản, hiển thị lỗi gọn gàng thay vì alert
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('loginUsername');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const rememberMe = document.getElementById('rememberMe');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!usernameInput.value) {
        usernameError.style.display = 'block';
        valid = false;
    }
    if (!pwdInput.value || pwdInput.value.length < 6) {
        passwordError.style.display = 'block';
        valid = false;
    }
    if (!valid) return;

    const username = usernameInput.value;
    const password = pwdInput.value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by username or email
    const user = users.find(u => u.name === username || u.email === username);

    if (!user) {
        passwordError.textContent = "Tên người dùng không tồn tại!";
        passwordError.style.display = 'block';
    } else if (user.password !== password) {
        passwordError.textContent = "Mật khẩu không đúng!";
        passwordError.style.display = 'block';
    } else {
        // Set user data in localStorage
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);
        // Clear input fields for security
        usernameInput.value = '';
        pwdInput.value = '';
        if (user.name === 'admin') {
            localStorage.setItem("isAdmin", "true");
            alert("Đăng nhập admin thành công!");
            window.location.href = "customer-accounts.html";
        } else {
            localStorage.setItem("isAdmin", "false");
            alert("Đăng nhập thành công!");
            window.location.href = "main.html";
        }
    }
});

// Chặn truy cập navbar nếu chưa đăng nhập (ưu tiên sessionStorage trước)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        const isLoggedInSession = sessionStorage.getItem("isLoggedIn") === "true";
        const isLoggedInLocal = localStorage.getItem("isLoggedIn") === "true";
        const isLoggedIn = isLoggedInSession || isLoggedInLocal;

        if (!isLoggedIn) {
            e.preventDefault();
            alert("Vui lòng đăng nhập để vào!");
            // ở trang login thì không chuyển nữa
        }
    });
});
function toggleChat() {
    const chat = document.getElementById("chatbotBox");
    chat.style.display = chat.style.display === "none" ? "block" : "none";
}

// Dark Mode Toggle
const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else {
    darkModeToggle.textContent = '🌙';
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙';
    }
});
