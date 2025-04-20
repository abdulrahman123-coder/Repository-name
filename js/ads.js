// منع الكتابة أو اللصق في حقل تاريخ انتهاء الإعلان
document.getElementById("adExpiry").addEventListener("keydown", function(event) {
    event.preventDefault();
});

document.getElementById("adExpiry").addEventListener("paste", function(event) {
    event.preventDefault();
});

let companyData = {};
const email = localStorage.getItem("company_loggedIn");
let useCompanyLogo = true;

// جلب بيانات الشركة من localStorage
if (email) {
    companyData = JSON.parse(localStorage.getItem("company_" + email)) || {};
    const companyLogoPreview = document.getElementById('companyLogoPreview');
    if (companyData.logo && companyLogoPreview) {
        companyLogoPreview.src = companyData.logo;
    } else if (!companyLogoPreview) {
        console.warn("العنصر companyLogoPreview غير موجود في الـ HTML");
    }
} else {
    window.location.href = "indx.html";
}

// التعامل مع اختيار استخدام شعار الشركة
document.getElementById('useCompanyLogo').addEventListener('click', function() {
    useCompanyLogo = true;
    this.classList.add('selected');
    document.getElementById('uploadCustomImage').classList.remove('selected');
    document.getElementById('customImagePreview').style.display = 'none';
});

// التعامل مع اختيار رفع صورة مخصصة
document.getElementById('uploadCustomImage').addEventListener('click', function() {
    useCompanyLogo = false;
    this.classList.add('selected');
    document.getElementById('useCompanyLogo').classList.remove('selected');
    document.getElementById('adImage').click();
});

// التعامل مع رفع الصورة المخصصة
document.getElementById('adImage').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('customImagePreview').src = event.target.result;
            document.getElementById('customImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// دالة إنشاء الإعلان
function createAd() {
    const adTitle = document.getElementById("adTitle").value.trim();
    const adDescription = document.getElementById("adDescription").value.trim();
    const adCategory = document.getElementById("adCategory").value;
    const adExpiry = document.getElementById("adExpiry").value;

    if (!adTitle || !adDescription || !adCategory || !adExpiry) {
        alert("الرجاء ملء جميع الحقول المطلوبة");
        return;
    }

    const adData = {
        id: Date.now(),
        title: adTitle,
        description: adDescription,
        category: adCategory,
        expiryDate: adExpiry,
        companyName: companyData.companyName,
        companyField: companyData.field,
        companyPhone: companyData.phone,
        companyEmail: companyData.email,
        createdAt: new Date().toISOString()
    };

    if (useCompanyLogo && companyData.logo) {
        // استخدام شعار الشركة
        adData.image = companyData.logo;
        saveAd(adData);
    } else if (!useCompanyLogo) {
        // التأكد من أن هناك صورة مرفوعة
        let fileInput = document.getElementById('adImage');
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                adData.image = e.target.result;
                saveAd(adData);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            alert("يرجى اختيار صورة للإعلان أو استخدام شعار الشركة.");
        }
    } else {
        alert("يرجى اختيار شعار الشركة أو رفع صورة مخصصة للإعلان.");
    }
}

// دالة حفظ الإعلان في localStorage
function saveAd(adData) {
    let ads = JSON.parse(localStorage.getItem("company_ads")) || [];

    // تقليل حجم الصورة (اختياري)
    if (adData.image && adData.image.length > 1000000) { // لو الصورة أكبر من 1 ميجابايت
        console.warn("الصورة كبيرة جدًا، قد تتسبب في مشاكل تخزين");
    }

    // حد أقصى لعدد الإعلانات
    if (ads.length >= 10) {
        ads.shift(); // حذف أقدم إعلان
    }

    ads.push(adData);
    try {
        localStorage.setItem("company_ads", JSON.stringify(ads));
        alert("تم نشر الإعلان بنجاح!");
        window.location.href = "company.html";
    } catch (e) {
        console.error("خطأ أثناء حفظ الإعلان: ", e);
        alert("فشل في حفظ الإعلان بسبب نفاد المساحة. حاولي حذف بعض الإعلانات القديمة.");
    }
}