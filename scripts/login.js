document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    const loginData = {
        email,
        password,
        remember,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem("classSync_login", JSON.stringify(loginData));

    console.log("Login data saved:", loginData);
    alert("Login information saved!");

    // Clear form
    document.getElementById("loginForm").reset();
});

// Load saved data on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("classSync_login");
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.remember) {
            document.getElementById("email").value = data.email;
            document.getElementById("remember").checked = true;
        }
    }
});
