// كود الانميشن 
AOS.init({
    duration: 1000, 
    easing: "ease",
    });
// كود اظهار اجابه الاسئله الشائعه 
    document.querySelectorAll(".Q").forEach(function(question) {
question.addEventListener("click", function() {
    let answer = this.nextElementSibling; 

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block"; 
    } else {
        answer.style.display = "none"; 
    }
});
});
// تغير صوره الخلفيه في الصفحه الرئسيه
const images = [ "../img/H2.png" , "../img/H3.png","../img/H4.png"];
let index = 0;
function changeImage() {
index = (index + 1) % images.length;
document.getElementById("slideshow").src = images[index];
}
setInterval(changeImage, 4000);
//  كود اضافه صوره بدل اللجو و حذف ازرار تسجيل الدخول لصفحه المواطن
document.addEventListener("DOMContentLoaded", function () {
    let userData = JSON.parse(localStorage.getItem("peopleUsers"));

    if (userData) {
        let header = document.querySelector(".header_contaner");
        let loginButtons = document.querySelectorAll(".log_in");
        let logos = document.querySelectorAll(".logo");  

        if (header && loginButtons.length > 0 && logos.length > 0) {

            loginButtons.forEach(button => button.style.display = "none");


            let profileContainer1 = document.createElement("div");
            profileContainer1.className = "profile-container1";
            profileContainer1.innerHTML = `
                <img src="../img/user.jpg" alt="Profile" class="profile-img">
                <div class="profile-dropdown1">
                    <div class="dropdown-content1">
                        <a href="people_dashboard.html">👤 الملف الشخصي</a>
                        <a href="#" id="logout" onclick="logout()">🚪 تسجيل الخروج</a>
                    </div>
                </div>
            `;

            logos.forEach(logo => {
                logo.parentNode.replaceChild(profileContainer1, logo);
            });


            const dropdown1 = profileContainer1.querySelector(".profile-dropdown1");

            profileContainer1.addEventListener("mouseenter", () => {
                dropdown1.classList.add("show");
            });

            profileContainer1.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    dropdown1.classList.remove("show");
                }, 300);
            });

            document.getElementById("logout").addEventListener("click", function () {
                localStorage.removeItem("peopleUsers"); 
                location.reload();
            });

        } else {
            console.error("❌ العناصر المطلوبة غير موجودة في الصفحة.");
        }
    } else {
        console.warn("⚠️ لا توجد بيانات مستخدم في localStorage.");
    }
});

// back to the top btu 
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑'; 
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { 
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});  
// نظام تسجيل الدخول للشركة   
document.addEventListener("DOMContentLoaded", function () {
    const loggedInEmail = localStorage.getItem("company_loggedIn");
    
    if (loggedInEmail) {
        const userDataStr = localStorage.getItem("company_" + loggedInEmail);
        const userData_company = userDataStr ? JSON.parse(userDataStr) : null;

        if (userData_company) {
            const header = document.querySelector(".header_contaner");
            const loginButtons = document.querySelectorAll(".log_in");
            const logos = document.querySelectorAll(".logo");  

            if (header && loginButtons.length > 0 && logos.length > 0) {
                // إخفاء أزرار الدخول
                loginButtons.forEach(button => button.style.display = "none");

                // إنشاء عنصر البروفايل
                const profileContainer2 = document.createElement("div");
                profileContainer2.className = "profile-container2";
                profileContainer2.innerHTML = `
                    <img src="${userData_company.logo || '../img/user.jpg'}" alt="Profile" class="profile-img">
                    <div class="profile-dropdown2">
                        <div class="dropdown-content2">
                            <a href="company.html">👤 الملف الشخصي</a>
                            <a href="#" id="logout2" onclick="logout()">🚪 تسجيل الخروج</a>
                        </div>
                    </div>
                `;

                // استبدال الشعارات
                logos.forEach(logo => {
                    logo.parentNode.replaceChild(profileContainer2, logo);
                });

                // إضافة تفاعل القائمة المنسدلة
                const dropdown2 = profileContainer2.querySelector(".profile-dropdown2");
                profileContainer2.addEventListener("mouseenter", () => {
                    dropdown2.classList.add("show");
                });
                profileContainer2.addEventListener("mouseleave", () => {
                    setTimeout(() => {
                        dropdown2.classList.remove("show");
                    }, 300);
                });

                // تسجيل الخروج
                document.getElementById("logout2").addEventListener("click", function (e) {
                    e.preventDefault();
                    localStorage.removeItem("company_loggedIn");
                    window.location.href = "indx.html"; 
                });
            } else {
                console.error("❌ العناصر المطلوبة غير موجودة في الصفحة.");
            }
        } else {
            console.warn("⚠️ لا توجد بيانات شركة في localStorage.");
        }
    } else {
        console.warn("⚠️ لا يوجد مستخدم مسجل دخول.");
    }
});





function toggleMenu() {
    let navList = document.getElementById("nav-list");
    navList.classList.toggle("show");
}



function setUserType(userType) {
    localStorage.setItem('userType', userType);
    // تعيين حالة تسجيل الدخول عند اختيار النوع
    localStorage.setItem('isLoggedIn', true);
}

document.addEventListener("DOMContentLoaded", function () {
    // العثور على جميع الأزرار أو الروابط التي تحتوي على الكلاس "restricted"
    let restrictedElements = document.querySelectorAll(".restricted");

    // العثور على الرسالة وزر الإغلاق
    let message = document.getElementById("login-message");
    let closeBtn = document.getElementById("close-message");

    // إضافة حدث لكل عنصر محظور
    restrictedElements.forEach(element => {
        element.addEventListener("click", function (e) {
            // تحقق من حالة تسجيل الدخول من localStorage
            let isLoggedIn = localStorage.getItem("isLoggedIn");

            // إذا لم يكن المستخدم مسجلًا للدخول
            if (!isLoggedIn) {
                // منع التفاعل مع العنصر
                e.preventDefault(); 

                // تعطيل العنصر
                element.style.pointerEvents = "none";  
                element.style.opacity = "0.5";        

                // عرض رسالة تطلب من المستخدم تسجيل الدخول
                message.style.display = "block";
            }
        });
    });

    // إغلاق الرسالة عند النقر على زر الإغلاق
    closeBtn.addEventListener("click", function () {
        message.style.display = "none";
    });
});

///جلب البيانات في landing بتاع الفني 
document.addEventListener("DOMContentLoaded", function () {
    let userData = JSON.parse(localStorage.getItem("currentUser"));

    if (userData) {
        let header = document.querySelector(".header_contaner");
        let loginButtons = document.querySelectorAll(".log_in");
        let logos = document.querySelectorAll(".logo");  

        if (header && loginButtons.length > 0 && logos.length > 0) {
            // إخفاء أزرار تسجيل الدخول
            loginButtons.forEach(button => button.style.display = "none");

            // استبدال الشعار بصورة المستخدم داخل profileContainer
            let profileContainer = document.createElement("div");
            profileContainer.className = "profile-container";
            profileContainer.innerHTML = `
                <img src="${userData.photo}" alt="Profile" class="profile-img">
                <div class="profile-dropdown">
                    <div class="dropdown-content">
                        <a href="Tech Talent Page Protfoilo.html">👤 الملف الشخصي</a>
                        <a href="#" id="logout">🚪 تسجيل الخروج</a>
                    </div>
                </div>
            `;
            logos.forEach(logo => {
                logo.parentNode.replaceChild(profileContainer, logo);
            });

            // التحكم في إظهار وإخفاء القائمة المنسدلة
            const dropdown = profileContainer.querySelector(".profile-dropdown");

            profileContainer.addEventListener("mouseenter", () => {
                dropdown.classList.add("show");
            });

            profileContainer.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    dropdown.classList.remove("show");
                }, 300);
            });

            document.getElementById("logout").addEventListener("click", function () {
                localStorage.removeItem("currentUser");
                location.reload();
            });

        } else {
            console.error("❌ العناصر المطلوبة غير موجودة في الصفحة.");
        }
    } else {
        console.warn("⚠️ لا توجد بيانات مستخدم في localStorage.");
    }
});




function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
}


