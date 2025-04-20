function loadCards() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let technicians = document.getElementById("technicians");
    technicians.innerHTML = "";

    users.forEach((user, index) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${user.photo}" alt="صورة المستخدم">
            <h3>${user.name}</h3>
            <p><strong>التخصص:</strong> ${user.job}</p>
            <p><strong>العمر:</strong> ${user.age} سنة</p>
            <p><strong>الخبرة:</strong> ${user.experience}</p>
            <div class="card-buttons">
                <button onclick="viewDetails(${index})" class="btn">الملف</button>
                <button onclick="viewDetails(${index})" class="btn .company-only .people-only"> التواصل </button>
                <button onclick="rateNow(${index})" class="btn rate-btn .company-only .people-only">قيم الآن</button>
            </div>
        `;
        technicians.appendChild(card);
    });
}
function viewDetails(index) {
    localStorage.setItem("selectedUser", index);
    localStorage.setItem("fromCards", "true"); 
    window.location.href = "../html/Tech Talent Page Protfoilo.html";
}

function filterCards() {
    let job = document.getElementById("job").value;
    let state = document.getElementById("state").value;
    let experience = document.getElementById("experience").value;
    let shiftOptions = document.getElementById("shiftOptions").value;
    let salarymonth = document.getElementById("salarymonth").value;
    let salaryday = document.getElementById("salaryday").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let filteredUsers = users.filter(user => {
        let jobFilter = job === "" || user.job === job;
        let stateFilter = state === "" || user.state === state;
        let experienceFilter = experience === "" || user.experience === experience;
        let shiftFilter = shiftOptions === "" || user.shiftOptions === shiftOptions;
        let salarymonthFilter = salarymonth === "" || user.salarymonth.toString() === salarymonth.toString();
        let salarydayFilter = salaryday === "" || user.salaryday.toString() === salaryday.toString();

        return jobFilter && stateFilter && experienceFilter && shiftFilter && salarymonthFilter && salarydayFilter;
    });

    let technicians = document.getElementById("technicians");
    technicians.innerHTML = "";

    filteredUsers.forEach((user, index) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${user.photo}" alt="صورة المستخدم">
            <h3>${user.name}</h3>
            <p><strong>التخصص:</strong> ${user.job}</p>
            <p><strong>العمر:</strong> ${user.age} سنة</p>
            <p><strong>الخبرة:</strong> ${user.experience}</p>
            <div class="card-buttons">
                <button onclick="viewDetails(${index})" class="btn">الملف</button>
                <button onclick="viewDetails(${index})" class="btn .company-only .people-only"> التواصل </button>
                <button onclick="rateNow(${index})" class="btn rate-btn company-only people-only">قيم الآن</button>
            </div>
        `;
        technicians.appendChild(card);
    });
}

// التقييم
let currentRatingUserIndex = null;
function openRatingModal(index) {
    currentRatingUserIndex = index;
    let modal = document.getElementById("ratingModal");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userName = users[index]?.name || "المستخدم";
    
    document.querySelector(".rating-header h3").textContent = `تقييم ${userName}`;
    modal.style.display = "flex";

    resetStars();
    document.getElementById("rating-comment").value = "";
}

function resetStars() {
    document.querySelectorAll("#rating-stars .star").forEach(star => {
        star.classList.remove("active");
        star.textContent = "☆";
    });
}

function setupStarRating() {
    document.querySelectorAll("#rating-stars .star").forEach(star => {
        star.addEventListener("click", function() {
            let value = parseInt(this.getAttribute("data-value"));
            document.querySelectorAll("#rating-stars .star").forEach((s, i) => {
                s.classList.toggle("active", i < value);
                s.textContent = i < value ? "★" : "☆";
            });
        });
    });
}

function submitRating() {
    let ratingValue = document.querySelectorAll("#rating-stars .star.active").length;
    let comment = document.getElementById("rating-comment").value.trim();

    if (ratingValue === 0) {
        console.log("الرجاء اختيار تقييم من 1 إلى 5 نجوم");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    
    if (!users[currentRatingUserIndex].ratings) {
        users[currentRatingUserIndex].ratings = [];
    }

    users[currentRatingUserIndex].ratings.push({
        stars: ratingValue,
        comment: comment || "لا يوجد تعليق",
        date: new Date().toLocaleDateString("ar-EG"),
        raterName: currentUser.name || "مستخدم مجهول",
        raterPhoto: currentUser.photo || "default-profile.jpg"
    });

    localStorage.setItem("users", JSON.stringify(users));
    console.log(`تم إرسال تقييمك بنجاح (${ratingValue} نجوم)`);
    closeRatingModal();
}

function closeRatingModal() {
    document.getElementById("ratingModal").style.display = "none";
}

// تهيئة الأحداث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    setupStarRating();
    document.getElementById("submit-rating").addEventListener("click", submitRating);
    document.getElementById("cancel-rating").addEventListener("click", closeRatingModal);
    document.getElementById("close-rating").addEventListener("click", closeRatingModal);

    document.getElementById("ratingModal").addEventListener("click", function(e) {
        if (e.target === this) closeRatingModal();
    });

    loadCards();
});

window.rateNow = openRatingModal;

// الإشعارات
function hireNow(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const selectedUser = users[index];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    
    if (!selectedUser || !currentUser.email) return;

    // إنشاء إشعار جديد بالهيكل المناسب لقسم notifications
    const notificationMessage = `طلب توظيف جديد من ${currentUser.name || "مستخدم مجهول"} (${currentUser.phone || "غير متوفر"})`;
    addTargetedNotification(notificationMessage, selectedUser.email, "info");

    alert("تم إرسال طلب التوظيف بنجاح");
}

// دالة إضافة إشعار لمستخدم معين
function addTargetedNotification(message, targetEmail, type = "info") {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({ 
        message, 
        type, 
        timestamp: new Date().toLocaleString(), 
        userEmail: targetEmail 
    });
    if (notifications.length > 20) {
        notifications.shift();
    }
    localStorage.setItem("notifications", JSON.stringify(notifications));
    let audio = new Audio('notification.mp3');
    audio.play().catch(() => console.log("صوت الإشعار غير متاح"));
}


document.addEventListener("DOMContentLoaded", function () {
    const userType = localStorage.getItem('userType');

    // عناصر للشركات فقط
    const companyOnlyElements = document.querySelectorAll(".company-only");

    // عناصر للفنيين فقط
    const technicianOnlyElements = document.querySelectorAll(".technician-only");

    // عناصر للمواطنين فقط
    const peopleOnlyElements = document.querySelectorAll(".people-only");

    // أخفي الكل مبدأيًا
    companyOnlyElements.forEach(el => el.style.display = "none");
    technicianOnlyElements.forEach(el => el.style.display = "none");
    peopleOnlyElements.forEach(el => el.style.display = "none");

    // أظهر حسب النوع
    if (userType === "company") {
        companyOnlyElements.forEach(el => el.style.display = "block");
    } else if (userType === "technician") {
        technicianOnlyElements.forEach(el => el.style.display = "block");
    } else if (userType === "people") {
        peopleOnlyElements.forEach(el => el.style.display = "block");
    }
});