// كود عرض الإعلانات
document.addEventListener('DOMContentLoaded', function() {
    const ads = JSON.parse(localStorage.getItem("peopleRequests")) || [];
    const allAdsContainer = document.getElementById('allAdsPeople');
    
    if (ads.length === 0) {
        allAdsContainer.innerHTML = '<div class="no-ads"><p>لا توجد إعلانات متاحة حالياً</p></div>';
    } else {
        ads.forEach((ad, index) => {
            const adCard = document.createElement('div');
            adCard.className = 'ad-card';
            adCard.setAttribute('data-index', index); // إضافة data-index لتحديد الإعلان
            adCard.innerHTML = `
                ${ad.image ? `<img src="${ad.image}" class="ad-image" alt="${ad.title}">` : ''}
                <div class="ad-content">
                    <h3 class="ad-title">${ad.title}</h3>
                    <div class="ad-company">${ad.companyName}</div>
                    <p class="ad-description">${ad.description}</p>
                    <div class="ad-meta">
                        <span>${ad.category}</span>
                        <span> ${new Date(ad.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div class="ad-meta">
                        <span> ${ad.companyPhone}</span>
                        <span> ${ad.companyEmail}</span>
                    </div>
                </div>
                <button class="apply-button" onclick="applyToAd(${index})">تقديم</button>
            `;
            allAdsContainer.appendChild(adCard);
        });
    }
});

// دالة التقديم على الإعلان
function applyToAd(adIndex) {
    let requests = JSON.parse(localStorage.getItem("peopleRequests")) || [];
    let ad = requests[adIndex];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // التأكد من إن المستخدم مش صاحب الإعلان
    if (ad.companyEmail === currentUser.email) {
        addNotification("لا يمكنك التقديم على إعلانك الخاص!", "error");
        return;
    }

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    let alreadyApplied = applications.some(app => app.adId === adIndex && app.technicianEmail === currentUser.email);
    if (alreadyApplied) {
        addNotification("لقد تقدمت لهذا الإعلان بالفعل!", "error");
        return;
    }

    let applicationId = Date.now(); // معرف فريد للطلب
    applications.push({
        adId: adIndex,
        applicationId: applicationId,
        technicianEmail: currentUser.email,
        status: "pending"
    });
    localStorage.setItem("applications", JSON.stringify(applications));

    let ownerLink = `people_dashboard.html?email=${currentUser.email}`;
    let notificationMessage = `
        تقدّم ${currentUser.name} (${currentUser.phone}) على إعلانك: ${ad.title} - ${ad.description}.
        <a href="${ownerLink}">عرض بيانات المتقدم</a>
        <button onclick="handleApplicationFromNotification(${adIndex}, '${currentUser.email}', 'accepted', ${applicationId})">قبول</button>
        <button onclick="handleApplicationFromNotification(${adIndex}, '${currentUser.email}', 'rejected', ${applicationId})">رفض</button>
    `;
    addTargetedNotification(notificationMessage, ad.companyEmail, "info");

    addNotification(`تم التقديم على إعلان ${ad.title} بنجاح!`, "success");
    alert("تم التقديم بنجاح!");
}

// دالة إضافة إشعار للمستخدم الحالي
function addNotification(message, type = "success") {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    notifications.push({ message, type, timestamp: new Date().toLocaleString(), userEmail: currentUser.email });
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

// تفعيل السيرش بار
function searchFunction() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".ad-card");

    cards.forEach(card => {
        let cardText = card.textContent.toLowerCase();
        if (input === '' || cardText.includes(input)) {
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
        }
    });
}