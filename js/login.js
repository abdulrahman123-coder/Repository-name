
function login() {
    let email = document.getElementById("company_login_email").value;
    let password = document.getElementById("company_login_password").value;

    let userData = localStorage.getItem("company_" + email);
    
    if (userData) {
        let user = JSON.parse(userData);
        
        if (user.password === password) {
            localStorage.setItem("company_loggedIn", email);
            window.location.href = "company.html";
        } else {
            alert("كلمة المرور غير صحيحة!"); 
        }
    } else {
        alert("المستخدم غير موجود!"); 
    }
}
