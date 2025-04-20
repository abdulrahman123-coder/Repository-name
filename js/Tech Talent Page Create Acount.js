// كود عداد الخطواط
function nextStep(contrStep) {
    let step = document.getElementById(`step${contrStep}Form`);

    if (!step.checkValidity()) {
        step.reportValidity();
        return;
    }

    document.getElementById(`step${contrStep}`).classList.add('hidden');
    document.getElementById(`step${contrStep + 1}`)?.classList.remove('hidden');

    document.getElementById(`moveStep${contrStep}`)?.classList.replace('active', 'complet');
    document.getElementById(`moveStep${contrStep + 1}`)?.classList.add('active');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/// كود جلب المرتكز و المحافظات
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

    // إضافة المحافظات إلى القائمة
    Object.keys(locations).forEach(state => {
        stateSelect.appendChild(new Option(state, state));
    });

    // تحديث المراكز عند تغيير المحافظة
    stateSelect.addEventListener("change", function () {
        citySelect.innerHTML = '<option value="">اختر المركز</option>';
        locations[stateSelect.value]?.forEach(city => {
            citySelect.appendChild(new Option(city, city));
        });
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// التحكم في نعم و لا
function menuSelect(show) {
    document.getElementById("shiftOptions").style.display = show ? "block" : "none";
}

function menuHealthSelect(show) {
    document.getElementById("healthDetails").style.display = show ? "block" : "none";
}

function campanyInput(show) {
    document.getElementById("company").style.display = show ? "block" : "none";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////تأكيد كلمة المرور

document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("confirm_password").addEventListener("input", validatePassword);

function validatePassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let errorMessage = document.getElementById("password_error");
    
    // تحقق من قوة كلمة المرور
    let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let isStrong = strongRegex.test(password);
    
    if (password !== confirmPassword) {
        errorMessage.textContent = "كلمة المرور غير متطابقة";
        errorMessage.style.display = "block";
    } else if (!isStrong) {
        errorMessage.textContent = "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، وحرف خاص";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///// مكتبه الارقام

// let phoneInput = document.querySelector("#phone");
// let errorMsg = document.querySelector("#error-msg");

// let iti = window.intlTelInput(phoneInput, {
//     initialCountry: "eg",      
//     preferredCountries: ["eg", "sa", "ae", "jo"], 
//     separateDialCode: true,       
//     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
// });

// phoneInput.addEventListener('blur', () => {
//     if (phoneInput.value.trim()) {
//         if (iti.isValidNumber()) {
//             errorMsg.textContent = "";
//             errorMsg.classList.remove("active");
//         } else {
//             errorMsg.textContent = "رقم الهاتف غير صحيح!";
//             errorMsg.classList.add("active");
//         }
//     }
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// القبول علي الشرط
document.getElementById("cheked").addEventListener("change", function() {
    const submitBtn = document.getElementById("submitBtn");
    
    if (this.checked) {
        submitBtn.style.display = "block";
    } else {
        submitBtn.style.display = "none"; 
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveData() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let Confirmpassword = document.getElementById("confirm_password").value;
    let photo = document.getElementById("photo").files[0];

    let gender = document.getElementById("gender").value;
    let job = document.getElementById("job").value;
    let about = document.getElementById("about").value;
    let education = document.getElementById("education").value;
    let experience = document.getElementById("experience").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;

    let shiftOptions = document.getElementById("shiftOptions").value;
    let healthDetails = document.getElementById("healthDetails").value;
    let salarymonth = document.getElementById("salarymonth").value;
    let salaryday = document.getElementById("salaryday").value;

    if (name && age && job && photo && password && Confirmpassword && phone) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // تحقق إن الإيميل مش مكرر
            if (users.some(user => user.email === email)) {
                alert("هذا البريد الإلكتروني مسجل بالفعل");
                return;
            }

            const userId = (users.length + 1).toString(); // ✅ id تسلسلي

            let userData = {
                id: userId,
                name, age, phone, 
                password,
                photo: e.target.result,
                email, gender, job, about, education, 
                experience, state, city, shiftOptions, 
                healthDetails, salarymonth, salaryday,
                ratings: [],
                workImages: [], 
                certificateImages: []
            };


            users.push(userData);

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(userData));
            localStorage.setItem("currentUserId", userId);
            localStorage.setItem("lastLogin", new Date().toISOString());
            
            // لا نحتاج لـ selectedUser هنا
            window.location.href = "../html/indx.html";
        };

        reader.readAsDataURL(photo);
    } else {
        alert("الرجاء ملء جميع الحقول المطلوبة");
    }
}
