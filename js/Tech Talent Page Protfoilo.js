let currentUserId = localStorage.getItem("currentUserId");
let users = JSON.parse(localStorage.getItem("users")) || [];
let selectedUserId = localStorage.getItem("selectedUserId");
let currentUser = users.find(user => user.id === (selectedUserId || currentUserId)) || {};
let originalUserData = JSON.parse(JSON.stringify(currentUser));

// عرض الإشعارات
function loadMessages() {
    let currentUserId = localStorage.getItem("currentUserId");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.id === currentUserId);
    let email = currentUser?.email;

    console.log("إيميل الفني الحالي:", email);

    if (!email) {
        console.log("لم يتم العثور على إيميل المستخدم الحالي");
        return;
    }

    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    console.log("كل الإشعارات:", notifications);

    let notificationBox = document.getElementById("notificationBox");

    if (!notificationBox) {
        console.log("لم يتم العثور على حاوية الإشعارات في الصفحة");
        return;
    }

    notificationBox.innerHTML = "";

    let userNotifications = notifications.filter(n => n.userEmail === email);
    console.log("الإشعارات المصفاة للفني:", userNotifications);

    if (userNotifications.length === 0) {
        notificationBox.innerHTML = "<p>لا توجد إشعارات حاليًا</p>";
    } else {
        userNotifications.forEach(notif => {
            let div = document.createElement("div");
            div.className = `notification ${notif.type}`;
            div.innerHTML = `
                <div>
                    <p>${notif.message}</p>
                    <p>من: ${notif.fromName || 'غير معروف'} (${notif.fromPhone || 'غير متوفر'})</p>
                    <p>المحافظة: ${notif.state || 'غير محدد'} - المركز: ${notif.city || 'غير محدد'}</p>
                    <p>التاريخ: ${notif.timestamp}</p>
                </div>
            `;
            notificationBox.appendChild(div);
        });
    }
}

// باقي الكود الخاص بإدارة بيانات المستخدم والصور والتقييمات
const editableFields = [
    "userName", "userAge", "userGender", "userJob",
    "userPhone", "userEmail", "userCity", "userArea",
    "userEducation", "userExperience", "usershiftOptions", "userAbout"
];

function displayUserData(user) {
    if (!user) return;

    document.getElementById("userName").textContent = user.name || "غير محدد";
    document.getElementById("userAge").textContent = user.age || "غير محدد";
    document.getElementById("userGender").textContent = user.gender || "غير محدد";
    document.getElementById("userJob").textContent = user.job || "غير محدد";
    document.getElementById("userPhone").textContent = user.phone || "غير محدد";
    document.getElementById("userEmail").textContent = user.email || "غير محدد";
    document.getElementById("userCity").textContent = user.state || "غير محدد";
    document.getElementById("userArea").textContent = user.city || "غير محدد";
    document.getElementById("userEducation").textContent = user.education || "غير محدد";
    document.getElementById("userExperience").textContent = user.experience || "غير محدد";
    document.getElementById("usershiftOptions").textContent = user.shiftOptions || "غير محدد";
    document.getElementById("userAbout").textContent = user.about || "لا توجد معلومات";

    if (user.photo) {
        document.getElementById("photo").src = user.photo;
    }
}

function enableEditMode() {
    editableFields.forEach(fieldId => {
        const fieldElement = document.getElementById(fieldId);
        const inputElement = document.createElement(fieldId === "userAbout" ? "textarea" : "input");
        inputElement.type = "text";
        inputElement.value = fieldElement.textContent;
        inputElement.id = `${fieldId}_edit`;
        inputElement.className = "inp";
        fieldElement.parentNode.replaceChild(inputElement, fieldElement);
    });

    document.getElementById("editButton").style.display = "none";
    document.getElementById("saveButton").style.display = "inline-block";
    document.getElementById("cancelButton").style.display = "inline-block";
}

function saveUserData() {
    let hasError = false;
    const updatedUser = {
        name: document.getElementById("userName_edit")?.value.trim() || "",
        age: document.getElementById("userAge_edit")?.value.trim() || "",
        gender: document.getElementById("userGender_edit")?.value.trim() || "",
        job: document.getElementById("userJob_edit")?.value.trim() || "",
        phone: document.getElementById("userPhone_edit")?.value.trim() || "",
        email: document.getElementById("userEmail_edit")?.value.trim() || "",
        state: document.getElementById("userCity_edit")?.value.trim() || "",
        city: document.getElementById("userArea_edit")?.value.trim() || "",
        education: document.getElementById("userEducation_edit")?.value.trim() || "",
        experience: document.getElementById("userExperience_edit")?.value.trim() || "",
        shiftOptions: document.getElementById("usershiftOptions_edit")?.value.trim() || "",
        about: document.getElementById("userAbout_edit")?.value.trim() || "",
        photo: currentUser.photo 
    };
    const requiredFields = [
        "userName_edit", "userAge_edit", "userGender_edit", "userJob_edit",
        "userPhone_edit", "userEmail_edit", "userCity_edit", "userArea_edit",
        "userEducation_edit", "userExperience_edit", "usershiftOptions_edit", "userAbout_edit"
    ];
    requiredFields.forEach(fieldId => {
        const inputElement = document.getElementById(fieldId);
        if (inputElement && !inputElement.value.trim()) {
            hasError = true;
            inputElement.style.border = "2px solid red";
        } else if (inputElement) {
            inputElement.style.border = "1px solid #ccc";
        }
    });
    if (hasError) {
        console.log("يرجى ملء جميع الحقول قبل الحفظ!");
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(user => user.id === currentUser.id ? { ...user, ...updatedUser } : user);
    localStorage.setItem("users", JSON.stringify(users));
    currentUser = { ...updatedUser };
    originalUserData = { ...updatedUser };
    location.reload();
}

function cancelEdit() {
    editableFields.forEach(fieldId => {
        const editField = document.getElementById(`${fieldId}_edit`);
        if (editField) {
            const textElement = document.createElement("span");
            textElement.id = fieldId;
            const key = fieldId.replace("user", "").toLowerCase();
            textElement.textContent = originalUserData[key] || "غير محدد";
            editField.parentNode.replaceChild(textElement, editField);
        }
    });

    document.getElementById("editButton").style.display = "inline-block";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
}

function loadAllData() {
    try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUserId = localStorage.getItem("currentUserId");
        const currentUserIndex = users.findIndex(user => user.id === currentUserId);
        return { 
            users, 
            selectedIndex: currentUserIndex !== -1 ? currentUserIndex : null 
        };
    } catch (error) {
        console.error("حدث خطأ أثناء تحميل البيانات:", error);
        return { users: [], selectedIndex: null };
    }
}

function saveAllData(users) {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
        console.error("حدث خطأ أثناء حفظ البيانات:", error);
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
}

function validateImage(file) {
    const MAX_SIZE = 2 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
    if (!file) {
        showNotification("الرجاء اختيار صورة أولاً", "error");
        return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
        showNotification("نوع الملف غير مدعوم. الرجاء اختيار صورة (JPEG, PNG, GIF)", "error");
        return false;
    }
    if (file.size > MAX_SIZE) {
        showNotification("حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 2MB", "error");
        return false;
    }
    return true;
}

function createImageContainer(imgSrc, type) {
    try {
        const container = document.createElement('div');
        container.className = `${type}-image-container`;
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = `${type}-image`;
        img.alt = type === 'work' ? 'صورة عمل سابق' : 'صورة شهادة';
        img.onerror = () => {
            container.innerHTML = '<div class="image-error">خطأ في تحميل الصورة</div>';
        };
        img.onclick = () => showImagePopup(imgSrc);
        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-image technician-only';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'حذف الصورة';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteImage(imgSrc, type);
        };
        const currentUserId = localStorage.getItem("currentUserId");
        const selectedUserId = localStorage.getItem("selectedUserId");
        const isOwner = !selectedUserId || selectedUserId === currentUserId;
        deleteBtn.style.display = isOwner ? 'block' : 'none';
        container.appendChild(img);
        container.appendChild(deleteBtn);
        return container;
    } catch (error) {
        console.error("حدث خطأ أثناء إنشاء حاوية الصورة:", error);
        return document.createElement('div');
    }
}

function showImagePopup(imgSrc) {
    try {
        const popup = document.createElement('div');
        popup.className = 'image-popup';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'popup-image';
        img.alt = 'صورة مكبرة';
        img.onerror = () => {
            popup.innerHTML = '<div class="popup-error">خطأ في تحميل الصورة</div>';
        };
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-popup';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => document.body.removeChild(popup);
        popup.appendChild(closeBtn);
        popup.appendChild(img);
        document.body.appendChild(popup);
        popup.onclick = (e) => e.target === popup && document.body.removeChild(popup);
    } catch (error) {
        console.error("حدث خطأ أثناء عرض الصورة:", error);
        showNotification("حدث خطأ أثناء عرض الصورة", "error");
    }
}

function deleteImage(imgSrc, type) {
    try {
        const { users } = loadAllData();
        const currentUserId = localStorage.getItem("currentUserId");
        const userIndex = users.findIndex(user => user.id === currentUserId);
        if (userIndex === -1) return;
        const user = users[userIndex];
        if (!user) return;
        if (type === 'work' && user.workImages) {
            user.workImages = user.workImages.filter(img => img !== imgSrc);
        } else if (type === 'certificate' && user.certificateImages) {
            user.certificateImages = user.certificateImages.filter(img => img !== imgSrc);
        }
        saveAllData(users);
        if (type === 'work') {
            loadWorkImages();
        } else {
            loadCertificateImages();
        }
        showNotification("تم حذف الصورة بنجاح", "success");
    } catch (error) {
        console.error("حدث خطأ أثناء حذف الصورة:", error);
        showNotification("حدث خطأ أثناء حذف الصورة", "error");
    }
}

function saveImage(inputId, galleryId, type) {
    try {
        const input = document.getElementById(inputId);
        if (!input.files || !input.files[0]) {
            showNotification("الرجاء اختيار صورة أولاً", "error");
            return;
        }
        const file = input.files[0];
        if (!validateImage(file)) return;
        const { users, selectedIndex } = loadAllData();
        const currentUserId = localStorage.getItem("currentUserId");
        const userIndex = users.findIndex(user => user.id === currentUserId);
        if (userIndex === -1) {
            showNotification("المستخدم غير موجود", "error");
            return;
        }
        if (!users[userIndex][`${type}Images`]) {
            users[userIndex][`${type}Images`] = [];
        }
        const reader = new FileReader();
        reader.onloadstart = () => {
            showNotification("جاري تحميل الصورة...", "info");
        };
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            const gallery = document.getElementById(galleryId);
            if (gallery) {
                gallery.appendChild(createImageContainer(imageUrl, type));
                users[userIndex][`${type}Images`].push(imageUrl);
                saveAllData(users);
                input.value = '';
                showNotification(`تم حفظ ${type === 'work' ? 'صورة العمل' : 'صورة الشهادة'} بنجاح`, "success");
            }
        };
        reader.onerror = () => {
            showNotification("حدث خطأ أثناء قراءة الصورة", "error");
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error(`حدث خطأ أثناء حفظ ${type === 'work' ? 'صورة العمل' : 'صورة الشهادة'}:`, error);
        showNotification(`حدث خطأ أثناء حفظ ${type === 'work' ? 'صورة العمل' : 'صورة الشهادة'}`, "error");
    }
}

function saveWorkImage() {
    saveImage('workImage', 'workImageGallery', 'work');
}

function saveCertificateImage() {
    saveImage('certificateImage', 'certificateImageGallery', 'certificate');
}

function loadImages(galleryId, type) {
    try {
        const { users } = loadAllData();
        const currentUserId = localStorage.getItem("currentUserId");
        const selectedUserId = localStorage.getItem("selectedUserId");
        const userId = selectedUserId || currentUserId;
        const user = users.find(u => u.id === userId);
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        gallery.innerHTML = '';
        if (user?.[`${type}Images`]) {
            user[`${type}Images`].forEach(imgSrc => {
                if (imgSrc && (imgSrc.startsWith('data:image') || imgSrc.startsWith('blob:'))) {
                    gallery.appendChild(createImageContainer(imgSrc, type));
                }
            });
        }
    } catch (error) {
        console.error(`حدث خطأ أثناء تحميل ${type === 'work' ? 'صور الأعمال' : 'صور الشهادات'}:`, error);
        showNotification(`حدث خطأ أثناء تحميل ${type === 'work' ? 'صور الأعمال' : 'صور الشهادات'}`, "error");
    }
}

function loadWorkImages() {
    loadImages('workImageGallery', 'work');
}

function loadCertificateImages() {
    loadImages('certificateImageGallery', 'certificate');
}

function loadRatings() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let selectedUserId = localStorage.getItem("selectedUserId");
    let currentUserId = localStorage.getItem("currentUserId");
    let userId = selectedUserId || currentUserId;
    let user = users.find(u => u.id === userId);
    let ratingsContainer = document.getElementById("ratings-container");
    if (!ratingsContainer) return;
    ratingsContainer.innerHTML = "";
    if (user?.ratings?.length > 0) {
        user.ratings.forEach(rating => {
            let ratingElement = document.createElement("div");
            ratingElement.className = "rating-item";
            ratingElement.innerHTML = `
                <div class="rater-info">
                    <img src="${rating.raterPhoto}" alt="صورة المقيّم" class="rater-photo">
                    <span class="rater-name">${rating.raterName}</span>
                </div>
                <div class="rating-stars">
                    ${"★".repeat(rating.stars)}${"☆".repeat(5 - rating.stars)}
                </div>
                <div class="rating-date">${rating.date}</div>
                <div class="rating-comment">${rating.comment}</div>
            `;
            ratingsContainer.appendChild(ratingElement);
        });
    } else {
        ratingsContainer.innerHTML = '<p class="no-ratings">لا توجد تقييمات حتى الآن</p>';
    }
}

// حدث تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    const userType = localStorage.getItem('userType');

    // إدارة إظهار/إخفاء العناصر حسب نوع المستخدم
    const companyOnlyElements = document.querySelectorAll(".company-only");
    const technicianOnlyElements = document.querySelectorAll(".technician-only");
    const peopleOnlyElements = document.querySelectorAll(".people-only");

    companyOnlyElements.forEach(el => el.style.display = "none");
    technicianOnlyElements.forEach(el => el.style.display = "none");
    peopleOnlyElements.forEach(el => el.style.display = "none");

    if (userType === "company") {
        companyOnlyElements.forEach(el => el.style.display = "block");
    } else if (userType === "technician") {
        technicianOnlyElements.forEach(el => el.style.display = "block");
    } else if (userType === "people") {
        peopleOnlyElements.forEach(el => el.style.display = "block");
    }

    // عرض بيانات المستخدم
    displayUserData(currentUser);

    // إضافة الأحداث للأزرار
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");

    editButton?.addEventListener("click", enableEditMode);
    saveButton?.addEventListener("click", saveUserData);
    cancelButton?.addEventListener("click", cancelEdit);

    // تحميل الصور والتقييمات والإشعارات
    loadWorkImages();
    loadCertificateImages();
    loadRatings();
    loadMessages();

    // إضافة الأحداث لأزرار حفظ الصور
    document.getElementById('saveWorkBtn')?.addEventListener('click', saveWorkImage);
    document.getElementById('saveCertificateBtn')?.addEventListener('click', saveCertificateImage);
});