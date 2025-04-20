let email = localStorage.getItem("company_loggedIn");
let originalData = null;

if (email) {
    let userData = JSON.parse(localStorage.getItem("company_" + email));
    if (userData) {
        originalData = { ...userData };
        
        document.getElementById("edit_company_name").value = userData.companyName || "";
        document.getElementById("edit_company_email").value = userData.email || "";
        document.getElementById("edit_company_phone").value = userData.phone || "";
        document.getElementById("edit_company_field").value = userData.field || "";
        document.getElementById("edit_state").value = userData.state || "";
        document.getElementById("edit_city").value = userData.city || "";
        
        document.getElementById("company_description_display").textContent = userData.description || "لا توجد نبذة متاحة";
        document.getElementById("company_benefits_display").textContent = userData.benefits || "لا توجد مميزات متاحة";
        
        if (userData.logo) {
            document.getElementById("dashboard_company_logo").src = userData.logo;
        }
    } else {
        window.location.href = "indx.html"; 
    }
} else {
    window.location.href = "indx.html"; 
}

function enableEditing() {
    document.querySelectorAll("input, select").forEach(el => el.disabled = false);
    document.getElementById("edit_company_logo").classList.remove("hidden");

    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("cancelBtn").style.display = "inline-block";
    document.getElementById("editBtn").style.display = "none";
}

function cancelEditing() {
    document.getElementById("edit_company_name").value = originalData.companyName || "";
    document.getElementById("edit_company_phone").value = originalData.phone || "";
    document.getElementById("edit_company_field").value = originalData.field || "";
    document.getElementById("edit_state").value = originalData.state || "";
    document.getElementById("edit_city").value = originalData.city || "";

    document.getElementById("company_description_display").textContent = originalData.description || "لا توجد نبذة متاحة";
    document.getElementById("company_benefits_display").textContent = originalData.benefits || "لا توجد مميزات متاحة";
    
    if (originalData.logo) {
        document.getElementById("dashboard_company_logo").src = originalData.logo;
    }

    disableEditing();
}

function disableEditing() {
    document.querySelectorAll("input, select").forEach(el => el.disabled = true);
    document.getElementById("edit_company_logo").classList.add("hidden");

    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
    document.getElementById("editBtn").style.display = "inline-block";
}

function previewLogo() {
    let file = document.getElementById("edit_company_logo").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("dashboard_company_logo").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveChanges() {
    let companyName = document.getElementById("edit_company_name").value.trim();
    let phone = document.getElementById("edit_company_phone").value.trim();
    let field = document.getElementById("edit_company_field").value.trim();
    let state = document.getElementById("edit_state").value.trim();
    let city = document.getElementById("edit_city").value.trim();
    let logo = document.getElementById("dashboard_company_logo").src;

    document.querySelectorAll(".error").forEach(e => e.style.display = "none");

    let isValid = true;
    if (companyName === "") {
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    }
    if (phone === "" || !/^[0-9]{10,15}$/.test(phone)) {
        document.getElementById("phoneError").style.display = "block";
        isValid = false;
    }
    if (field === "") {
        document.getElementById("fieldError").style.display = "block";
        isValid = false;
    }
    if (state === "" || city === "") {
        document.getElementById("locationError").style.display = "block";
        isValid = false;
    }

    if (isValid) {
        let updatedData = { 
            ...originalData,
            companyName,
            phone,
            field,
            state,
            city,
            logo
        };
        
        localStorage.setItem("company_" + email, JSON.stringify(updatedData));
        originalData = { ...updatedData };
        
        disableEditing();
    }
}

function logout() {
    localStorage.removeItem("company_loggedIn");
    window.location.href = "indx.html";
}

// دالة عرض الإشعارات
function displayNotifications() {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    let notificationBox = document.getElementById("notificationBox");
    console.log("All Notifications:", notifications); // للتحقق من الإشعارات
    console.log("Current Email:", email); // للتحقق من الإيميل
    if (notificationBox) {
        notificationBox.innerHTML = "";
        let userNotifications = notifications.filter(n => n.userEmail === email);
        console.log("Filtered Notifications:", userNotifications); // للتحقق من الإشعارات المصفاة
        if (userNotifications.length === 0) {
            notificationBox.innerHTML = "<p>لا توجد إشعارات حاليًا</p>";
        } else {
            userNotifications.forEach((notif, index) => {
                let div = document.createElement("div");
                div.className = `notification ${notif.type}`;
                if (notif.message.includes("تقدّم") && notif.message.includes("على إعلانك")) {
                    div.innerHTML = `
                        <div>${notif.timestamp}: ${notif.message}</div>
                        <div>
                            <button onclick="deleteNotification(${index})">حذف</button>
                        </div>
                    `;
                } else {
                    div.innerHTML = `
                        <p>${notif.timestamp}: ${notif.message}</p>
                        <button onclick="deleteNotification(${index})">حذف</button>
                    `;
                }
                notificationBox.appendChild(div);
            });
        }
    } else {
        console.log("notificationBox not found in the DOM"); // للتحقق إذا كان العنصر موجود
    }
}

// دالة حذف إشعار
function deleteNotification(index) {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    let userNotifications = notifications.filter(n => n.userEmail === email);
    let globalIndex = notifications.findIndex(n => 
        n.userEmail === email && 
        n.message === userNotifications[index].message && 
        n.timestamp === userNotifications[index].timestamp
    );
    if (globalIndex !== -1) {
        notifications.splice(globalIndex, 1);
        localStorage.setItem("notifications", JSON.stringify(notifications));
        displayNotifications();
    }
}

// دالة مسح كل الإشعارات
function clearNotifications() {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications = notifications.filter(n => n.userEmail !== email);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    displayNotifications();
}

// دالة التعامل مع القبول/الرفض من الإشعار
function handleApplicationFromNotification(adId, technicianEmail, status, applicationId) {
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    let requests = JSON.parse(localStorage.getItem("company_ads")) || [];
    let ad = requests[adId];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let technician = users.find(user => user.email === technicianEmail);

    console.log("إيميل الفني الممرر:", technicianEmail);
    console.log("بيانات الفني:", technician);

    let application = applications.find(app => app.applicationId === applicationId);
    if (application) {
        application.status = status;
        localStorage.setItem("applications", JSON.stringify(applications));

        let statusText = status === "accepted" ? "تم القبول" : "تم الرفض";
        let email = localStorage.getItem("company_loggedIn");
        let companyData = JSON.parse(localStorage.getItem("company_" + email)) || {};

        // التأكد من وجود بيانات الشركة
        console.log("بيانات الشركة:", companyData);

        let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

        let notificationMessage = `تم ${statusText === "تم القبول" ? "قبول" : "رفض"} طلبك على الإعلان: ${ad.title} - ${ad.description}`;
        addTargetedNotification(
            notificationMessage,
            technician.email,
            status === "accepted" ? "success" : "error",
            ad.title,
            ad.description,
            companyData.companyName || "شركة مجهولة", // 
            companyData.phone || "غير متوفر",
            companyData.logo || "../img/default-user.png",
            companyData.state || "غير محدد",
            companyData.city || "غير محدد"
        );

        if (status === "accepted") {
            requests = requests.filter((_, index) => index !== adId);
            localStorage.setItem("company_ads", JSON.stringify(requests));
            applications = applications.filter(app => app.adId !== adId);
            localStorage.setItem("applications", JSON.stringify(applications));
        }

        addNotification(`تم ${statusText === "تم القبول" ? "قبول" : "رفض"} طلب ${technician.name}!`, status === "accepted" ? "success" : "error");

        notifications = notifications.filter(n => !n.message.includes(`تقدّم ${technician.name} (${technician.phone}) على إعلانك: ${ad.title} - ${ad.description}`));
        localStorage.setItem("notifications", JSON.stringify(notifications));
        displayNotifications();
    }
}

// دالة إضافة إشعار للمستخدم الحالي
function addNotification(message, type = "success") {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({ message, type, timestamp: new Date().toLocaleString(), userEmail: email });
    if (notifications.length > 20) {
        notifications.shift();
    }
    localStorage.setItem("notifications", JSON.stringify(notifications));
    let audio = new Audio('notification.mp3');
    audio.play().catch(() => console.log("صوت الإشعار غير متاح"));
}

// دالة إضافة إشعار لمستخدم معين
function addTargetedNotification(message, targetEmail, type = "info") {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({ message, type, timestamp: new Date().toLocaleString(), userEmail: targetEmail });
    if (notifications.length > 20) {
        notifications.shift();
    }
    localStorage.setItem("notifications", JSON.stringify(notifications));
    let audio = new Audio('notification.mp3');
    audio.play().catch(() => console.log("صوت الإشعار غير متاح"));
}

// تشغيل الدوال عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // الكود الأصلي بتاعك لعرض بيانات الشركة
    if (email) {
        let userData = JSON.parse(localStorage.getItem("company_" + email));
        if (userData) {
            originalData = { ...userData };
            
            document.getElementById("edit_company_name").value = userData.companyName || "";
            document.getElementById("edit_company_email").value = userData.email || "";
            document.getElementById("edit_company_phone").value = userData.phone || "";
            document.getElementById("edit_company_field").value = userData.field || "";
            document.getElementById("edit_state").value = userData.state || "";
            document.getElementById("edit_city").value = userData.city || "";
            
            document.getElementById("company_description_display").textContent = userData.description || "لا توجد نبذة متاحة";
            document.getElementById("company_benefits_display").textContent = userData.benefits || "لا توجد مميزات متاحة";
            
            if (userData.logo) {
                document.getElementById("dashboard_company_logo").src = userData.logo;
            }
        } else {
            window.location.href = "indx.html"; 
        }
    } else {
        window.location.href = "indx.html"; 
    }

    // عرض الإشعارات
    displayNotifications();
});