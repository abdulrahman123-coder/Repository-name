
document.addEventListener("DOMContentLoaded", function () {
    let stateSelect = document.getElementById("state");
    let citySelect = document.getElementById("city");

    let locations = {
        "القاهرة": ["حي مصر الجديدة", "حي المعادي", "حي شبرا", "حي حلوان", "حي مدينة نصر", "حي السيدة زينب", "حي الزمالك", "حي المقطم", "حي المطرية", "حي عين شمس"],
        "الجيزة": ["مركز الجيزة", "مركز إمبابة", "مركز الوراق", "مركز كرداسة", "مركز أبو النمرس", "مركز البدرشين", "مركز العياط", "مركز الصف", "مركز أطفيح", "مركز الواحات البحرية"],
        "الإسكندرية": ["حي العجمي", "حي سيدي جابر", "حي محرم بك", "حي المنتزه", "حي الرمل", "حي العامرية", "حي الجمرك", "حي غرب الإسكندرية", "حي شرق الإسكندرية"],
        "القليوبية": ["بنها", "طوخ", "قليوب", "الخانكة", "شبرا الخيمة", "القناطر الخيرية", "العبور", "كفر شكر", "الخصوص"],
        "الشرقية": ["الزقازيق", "بلبيس", "العاشر من رمضان", "أبو كبير", "منيا القمح", "ههيا", "فاقوس", "أبو حماد", "ديرب نجم", "الإبراهيمية"],
        "الدقهلية": ["المنصورة", "ميت غمر", "دكرنس", "طلخا", "منية النصر", "أجا", "السنبلاوين", "بلقاس", "المطرية"],
        "المنوفية": ["شبين الكوم", "قويسنا", "تلا", "الباجور", "منوف", "أشمون", "سرس الليان"],
        "الغربية": ["طنطا", "المحلة الكبرى", "كفر الزيات", "السنطة", "زفتى", "قطور", "سمنود", "بسيون"],
        "كفر الشيخ": ["كفر الشيخ", "دسوق", "فوه", "بلطيم", "سيدي سالم", "الحامول", "مطوبس", "بيلا"],
        "البحيرة": ["دمنهور", "كفر الدوار", "رشيد", "إدكو", "المحمودية", "حوش عيسى", "إيتاي البارود", "كوم حمادة", "شبراخيت", "أبو حمص"],
        "دمياط": ["دمياط", "رأس البر", "فارسكور", "كفر سعد", "الزرقا"],
        "بورسعيد": ["حي الشرق", "حي العرب", "حي المناخ", "حي الضواحي", "حي الزهور", "حي الجنوب", "حي غرب"],
        "الإسماعيلية": ["الإسماعيلية", "فايد", "التل الكبير", "القنطرة شرق", "القنطرة غرب", "أبو صوير"],
        "السويس": ["حي السويس", "حي الأربعين", "حي عتاقة", "حي الجناين", "حي فيصل"],
        "الفيوم": ["الفيوم", "إطسا", "سنورس", "طامية", "أبشواي", "يوسف الصديق"],
        "بني سويف": ["بني سويف", "إهناسيا", "ناصر", "الواسطى", "ببا", "سمسطا", "الفشن"],
        "المنيا": ["المنيا", "أبو قرقاص", "مطاي", "سمالوط", "بني مزار", "ملوي", "دير مواس", "العدوة", "مغاغة"],
        "أسيوط": ["أسيوط", "ديروط", "منفلوط", "القوصية", "أبنوب", "الفتح", "أبو تيج", "الغنايم", "صدفا"],
        "سوهاج": ["سوهاج", "أخميم", "جرجا", "البلينا", "طما", "طهطا", "المراغة", "دار السلام", "المنشاة"],
        "قنا": ["قنا", "أبو تشت", "فرشوط", "نجع حمادي", "دشنا", "الوقف", "قوص", "نقادة", "قفط"],
        "الأقصر": ["الأقصر", "إسنا", "أرمنت", "الزينية", "البياضية", "القرنة"],
        "أسوان": ["أسوان", "كوم أمبو", "دراو", "نصر النوبة", "إدفو"],
        "البحر الأحمر": ["الغردقة", "رأس غارب", "سفاجا", "القصير", "مرسى علم", "حلايب", "شلاتين"],
        "الوادي الجديد": ["الخارجة", "الداخلة", "الفرافرة", "بلاط", "باريس"],
        "مطروح": ["مرسى مطروح", "الحمام", "العلمين", "الضبعة", "سيدي براني", "النجيلة", "السلوم", "سيوة"],
        "شمال سيناء": ["العريش", "الشيخ زويد", "رفح", "الحسنة", "نخل"],
        "جنوب سيناء": ["الطور", "شرم الشيخ", "دهب", "نويبع", "طابا", "سانت كاترين", "أبو رديس", "أبو زنيمة"],
    };

    Object.keys(locations).forEach(state => {
        stateSelect.appendChild(new Option(state, state));
    });

    stateSelect.addEventListener("change", function () {
        citySelect.innerHTML = '<option value="">اختر المركز</option>';
        locations[stateSelect.value]?.forEach(city => {
            citySelect.appendChild(new Option(city, city));
        });
    });

    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
    document.getElementById("password").addEventListener("input", validatePassword);
    document.getElementById("confirmPassword").addEventListener("input", validateConfirmPassword);
});
function signup() {
    let email = document.getElementById("company_email").value;
    let password = document.getElementById("company_password").value;
    let confirmPassword = document.getElementById("company_confirm_password").value;
    let phone = document.getElementById("company_phone").value;
    let companyName = document.getElementById("company_name").value;
    let field = document.getElementById("company_field").value;
    let description = document.getElementById("company_description").value;
    let benefits = document.getElementById("company_benefits").value;
    let logo = document.getElementById("company_logo").files[0];
    let state = document.getElementById("state").value.trim();
    let city = document.getElementById("city").value.trim();
    
    let isValid = true;
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
    
    if (!companyName) {
        document.getElementById("error_company_name").innerText = "يجب إدخال اسم الشركة";
        document.getElementById("error_company_name").style.display = "block";
        isValid = false;
    }
    
    if (!/^[0-9]{10,15}$/.test(phone)) {
        document.getElementById("error_company_phone").innerText = "رقم الهاتف غير صحيح";
        document.getElementById("error_company_phone").style.display = "block";
        isValid = false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById("error_company_email").innerText = "البريد الإلكتروني غير صالح";
        document.getElementById("error_company_email").style.display = "block";
        isValid = false;
    }
    
    if (password.length < 6 || password !== confirmPassword) {
        document.getElementById("error_company_password").innerText = "يجب أن تكون كلمة المرور 6 أحرف على الأقل ومتطابقة";
        document.getElementById("error_company_password").style.display = "block";
        isValid = false;
    }
    
    if (!isValid) return;
    
    let userData = { email, password, phone, companyName, field, description, benefits, logo: null ,state, city};
    
    if (logo) {
let reader = new FileReader();
reader.onload = function () {
userData.logo = reader.result;
localStorage.setItem("company_" + email, JSON.stringify(userData));
localStorage.setItem("company_loggedIn", email);  
window.location.href = "company.html";
};
reader.readAsDataURL(logo);
} else {
localStorage.setItem("company_" + email, JSON.stringify(userData));
localStorage.setItem("company_loggedIn", email); 
window.location.href = "company.html";
}
}