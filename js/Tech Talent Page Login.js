document.addEventListener("DOMContentLoaded", function () {
    let forgotPasswordLink = document.getElementById("forgot-password-link");
    let popup = document.getElementById("forgot-password-Popup");
    
    if (popup) popup.style.display = "none";

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function (event) {
            event.preventDefault();
            popup.style.display = "flex";
        });
    }

    document.querySelector(".close")?.addEventListener("click", () => popup.style.display = "none");

    let loginForm = document.querySelector("form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("mail").value.trim();
            let password = document.getElementById("password").value.trim();

            if (!email || !password) {
                console.log("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                window.location.href = "indx.html"; 
            } else {
                console.log("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
            }
        });
    }
});