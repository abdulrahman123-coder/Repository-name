document.addEventListener("DOMContentLoaded", function () {
    let currentUser = JSON.parse(localStorage.getItem("currentPeopleUser"));
    let email = localStorage.getItem("people_loggedIn");

    // التحقق من وجود المستخدم
    console.log("Current People User:", currentUser); 
    console.log("People Logged In Email:", email); 


    if (currentUser) {
        document.getElementById("userName").textContent = currentUser.name;
        document.getElementById("userEmail").textContent = currentUser.email;
        document.getElementById("userState").textContent = currentUser.state;
        document.getElementById("userCity").textContent = currentUser.city;
        document.getElementById("phone").textContent = currentUser.phone;

        document.getElementById("editUserName").value = currentUser.name;
        document.getElementById("editUserEmail").value = currentUser.email;
        document.getElementById("editUserState").value = currentUser.state;
        document.getElementById("editUserCity").value = currentUser.city;
        document.getElementById("editPhone").value = currentUser.phone;
    } else {
        console.log("No current user data found in localStorage");
        window.location.href = "indx.html"; // إعادة توجيه إذا ما كانش فيه بيانات للمستخدم
        return;
    }

    document.getElementById("editBtn").addEventListener("click", function () {
        toggleEditMode(true);
    });

    document.getElementById("saveBtn").addEventListener("click", function () {
        saveUpdatedData();
    });

    function toggleEditMode(editMode) {
        const spans = document.querySelectorAll(".p_dash span");
        const inputs = document.querySelectorAll(".p_dash input");

        spans.forEach(span => span.style.display = editMode ? "none" : "inline");
        inputs.forEach(input => input.style.display = editMode ? "inline" : "none");

        document.getElementById("editBtn").style.display = editMode ? "none" : "inline-block";
        document.getElementById("saveBtn").style.display = editMode ? "inline-block" : "none";
    }

    function saveUpdatedData() {
        let updatedUser = {
            name: document.getElementById("editUserName").value.trim(),
            email: document.getElementById("editUserEmail").value.trim(),
            state: document.getElementById("editUserState").value.trim(),
            city: document.getElementById("editUserCity").value.trim(),
            phone: document.getElementById("editPhone").value.trim()
        };

        if (!updatedUser.name || !updatedUser.email || !updatedUser.state || !updatedUser.city || !updatedUser.phone) {
            document.getElementById("error").innerText = "! يرجى ملء جميع الحقول ";
            return;
        }

        let users = JSON.parse(localStorage.getItem("peopleUsers")) || [];
        let index = users.findIndex(user => user.email === currentUser.email);

        if (index !== -1) {
            users[index] = updatedUser;
        }

        localStorage.setItem("peopleUsers", JSON.stringify(users));
        localStorage.setItem("currentPeopleUser", JSON.stringify(updatedUser));

        document.getElementById("userName").textContent = updatedUser.name;
        document.getElementById("userEmail").textContent = updatedUser.email;
        document.getElementById("userState").textContent = updatedUser.state;
        document.getElementById("userCity").textContent = updatedUser.city;
        document.getElementById("phone").textContent = updatedUser.phone;

        toggleEditMode(false);
    }

    toggleEditMode(false);

    // عرض الإشعارات بعد تحميل بيانات المستخدم
    displayNotifications();
});

// اظهار رساله الي المستخدم بتأكيد اضافه الاعلان 
function showMessage(message, color) {
    let alertBox = document.getElementById("alertMessage");
    alertBox.innerText = message;
    alertBox.style.display = "block";
    alertBox.style.backgroundColor = color;
    alertBox.style.color = "white";
}

// حفظ بيانات اعلان المواطن 
function saveToStorage(){
    let maj = document.getElementById("maj").value;
    let text = document.getElementById("text").value;
    let datetime = document.getElementById("datetime").value;
    let location = document.getElementById("location").value;

    let currentUser = JSON.parse(localStorage.getItem("currentPeopleUser")) || {};
    let userName = currentUser.name || "مستخدم مجهول";
    let userPhone = currentUser.phone || "غير متوفر";
    let userEmail = currentUser.email || "غير متوفر";
    let userField = currentUser.field || "مجال غير محدد";

    if (maj && text && datetime && location) {
        let requestData = { 
            title: maj, 
            description: text, 
            expiryDate: datetime, 
            category: maj, 
            location: location, 
            companyName: userName,
            companyField: userField,
            companyPhone: userPhone,
            companyEmail: userEmail
        };

        let requests = JSON.parse(localStorage.getItem("peopleRequests")) || [];
        requests.push(requestData);
        localStorage.setItem("peopleRequests", JSON.stringify(requests));

        showMessage("تم رفع الإعلان بنجاح!", "green");
        setTimeout(() => {
            window.location.href = "people_dashboard.html";
        }, 2000);
    } else {
        showMessage("يرجى ملء جميع الحقول المطلوبة!", "red");
    }
}

document.getElementById("requestForm").addEventListener("submit", function (e) {
    e.preventDefault();
    saveToStorage();
});

// جلب إيميل العميل من localStorage
let email = localStorage.getItem("people_loggedIn");

// دالة عرض الإشعارات
function displayNotifications() {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    let notificationBox = document.getElementById("notifications"); // تغيير من notificationBox إلى notifications
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
        console.log("notifications div not found in the DOM"); // للتحقق إذا كان العنصر موجود
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
    let requests = JSON.parse(localStorage.getItem("peopleRequests")) || [];
    let ad = requests[adId];
    let technician = JSON.parse(localStorage.getItem("users")).find(user => user.email === technicianEmail);

    let application = applications.find(app => app.applicationId === applicationId);
    if (application) {
        application.status = status;
        localStorage.setItem("applications", JSON.stringify(applications));

        let statusText = status === "accepted" ? "تم القبول" : "تم الرفض";
        let ownerLink = `people_dashboard.html?email=${email}`;
        let notificationMessage = `
            ${statusText} لطلبك على الإعلان: ${ad.title} - ${ad.description}.
            <a href="${ownerLink}">عرض بيانات صاحب الإعلان</a>
        `;
        addTargetedNotification(notificationMessage, technician.email, status === "accepted" ? "success" : "error");

        if (status === "accepted") {
            requests = requests.filter((_, index) => index !== adId);
            localStorage.setItem("peopleRequests", JSON.stringify(requests));
            applications = applications.filter(app => app.adId !== adId);
            localStorage.setItem("applications", JSON.stringify(applications));
        }

        addNotification(`تم ${statusText === "تم القبول" ? "قبول" : "رفض"} طلب ${technician.name}!`, status === "accepted" ? "success" : "error");

        // إزالة الإشعار بعد القبول/الرفض
        let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
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