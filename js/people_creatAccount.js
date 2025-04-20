// كود المحافظات و المراكز
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
// التأكد من صحه الايميل
function validateEmail() {
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("emailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = " البريد الإلكتروني غير صالح! مثال: example@gmail.com";
    } else {
        emailError.textContent = "";
    }
}
// التأكد من صحه رقم الهاتف 
function validatePhone() {
    let phoneInput = document.getElementById("phone");
    let phoneError = document.getElementById("phoneError");

    let phoneNumber = phoneInput.value.trim();

    // التحقق من أن الرقم يتكون من 11 رقمًا ويبدأ بـ 01
    let phoneRegex = /^01\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
        phoneError.textContent = "يجب أن يتكون الرقم من 11 رقمًا ويبدأ بـ 01!";
    } else {
        phoneError.textContent = "";
    }
}

// إضافة مستمع الحدث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    let phoneInput = document.getElementById("phone");

    // التحقق أثناء الكتابة
    phoneInput.addEventListener("input", validatePhone);
});

// التأكد من صحه الباسورد
function validatePassword() {
    let password = document.getElementById("password").value.trim();
    let passwordError = document.getElementById("passwordError");
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
        passwordError.textContent = " يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير وصغير!";
    } else {
        passwordError.textContent = "";
    }
}
// تأكيد الباسورد
function validateConfirmPassword() {
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = " كلمة المرور غير متطابقة!";
    } else {
        confirmPasswordError.textContent = "";
    }
}
// حفظ البيانات في الذاكره
function savePeopleData() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let state = document.getElementById("state").value.trim();
    let city = document.getElementById("city").value.trim();

    if (!name || !phone || !email || !password || !confirmPassword || !state || !city) {
        error.textContent = "برجاء ملئ الحقول الفارغه";
        return;
    }

    let userData = { name, phone, email, password, state, city };
    saveToStorage(userData);
}
function saveToStorage(userData) {
    let users = JSON.parse(localStorage.getItem("peopleUsers")) || [];

    const existingUser = users.find(u => u.email === userData.email || u.phone === userData.phone);

    if (existingUser) {
        let message = existingUser.email === userData.email ?
        " البريد الإلكتروني مستخدم بالفعل!" : " رقم الهاتف مستخدم بالفعل!";
        alert(message);
        return;
    }

    users.push(userData);
    localStorage.setItem("peopleUsers", JSON.stringify(users));
    localStorage.setItem("currentPeopleUser", JSON.stringify(userData));

    window.location.href = "people_dashboard.html";
}
