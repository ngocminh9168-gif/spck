document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username or email already exists
    const existingUser = users.find(user => user.name === name || user.email === email);
    if (existingUser) {
        if (existingUser.name === name) {
            alert("Tên người dùng đã tồn tại! Vui lòng chọn tên khác.");
        } else {
            alert("Email đã được sử dụng! Vui lòng sử dụng email khác.");
        }
        return;
    }

    // Add new user
    const role = ((name === 'admin' && password === 'admin123') || (name === 'minh' && password === '123456')) ? 'admin' : 'user';
    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    // Clear input fields for security
    document.getElementById("signupName").value = '';
    document.getElementById("signupEmail").value = '';
    document.getElementById("signupPassword").value = '';

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
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
