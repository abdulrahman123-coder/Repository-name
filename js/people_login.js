document.addEventListener("DOMContentLoaded", function () {
    // عناصر نافذة "نسيت كلمة السر"
    let forgotPasswordLink = document.getElementById("forgot-password-link");
    let forgotPasswordPopup = document.getElementById("forgot-password-Popup");
    let closeBtn = document.querySelector(".close");

    // إخفاء النافذة في البداية
    if (forgotPasswordPopup) {
        forgotPasswordPopup.style.display = "none";
    }

    // فتح النافذة عند النقر على الرابط
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function (e) {
            e.preventDefault();
            forgotPasswordPopup.style.display = "flex"; // عرض النافذة
        });
    }

    // إغلاق النافذة عند النقر على (X)
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            forgotPasswordPopup.style.display = "none"; // إخفاء النافذة
        });
    }

    // إغلاق النافذة عند النقر خارجها
    window.addEventListener("click", function (e) {
        if (e.target === forgotPasswordPopup) {
            forgotPasswordPopup.style.display = "none"; // إخفاء النافذة
        }
    });
});
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
function validateTechnicianLogin() {
    let emailInput = document.getElementById("mail").value.trim();
    let passwordInput = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "../html/indx.html"; // صفحة الداشبورد للفني
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
}

