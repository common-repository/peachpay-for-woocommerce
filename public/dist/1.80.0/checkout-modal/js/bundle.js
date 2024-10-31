"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var GLOBAL = {
    completedOrder: null,
    phpData: null,
    linkedProductsIds: []
};
function $qs(selector, cb) {
    if (cb === void 0) { cb = null; }
    var $element = document.querySelector(selector);
    if ($element && cb !== null) {
        cb($element);
    }
    return $element;
}
function $qsAll(selector, callback) {
    var result = Array.from(document.querySelectorAll(selector));
    if (callback) {
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var $element = result_1[_i];
            callback($element);
        }
    }
    return result;
}
function eventClick(event) {
    if (event.type === 'click') {
        return true;
    }
    else if (event.type === 'keypress') {
        var key = event.key;
        if (key === 'Enter' || key === ' ') {
            return true;
        }
    }
    return false;
}
function onWindowMessage(eventName, cb) {
    var _this = this;
    self.addEventListener('message', function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(event.data.event === eventName)) return [3, 2];
                    return [4, cb(event.data)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2];
            }
        });
    }); }, false);
}
function onWindowDataFetch(endpoint, requestCallback) {
    var _this = this;
    self.addEventListener('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(message.data.event === endpoint)) return [3, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, requestCallback(message.data.request)];
                case 2:
                    response = _a.sent();
                    message.ports[0].postMessage({
                        result: response
                    });
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    message.ports[0].postMessage({
                        error: error_1
                    });
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
}
function fetchWindowData(targetWindow, endpoint, request) {
    return new Promise(function (resolve, reject) {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (_a) {
            var data = _a.data;
            channel.port1.close();
            if (data.error) {
                reject(data.error);
            }
            else {
                resolve(data.result);
            }
        };
        if (!targetWindow) {
            reject(new Error('Target window is not valid.'));
        }
        else {
            targetWindow.postMessage({
                event: endpoint,
                request: request
            }, '*', [
                channel.port2
            ]);
        }
    });
}
function fetchHostWindowData(endpoint, request) {
    return fetchWindowData(window.top, endpoint, request);
}
function loadScript(src, scriptWindowObject, callback) {
    if (document.querySelector("script[src=\"".concat(src, "\"]")) || window[scriptWindowObject !== null && scriptWindowObject !== void 0 ? scriptWindowObject : '']) {
        callback();
    }
    var $script = document.createElement('script');
    $script.type = 'text/javascript';
    $script.src = src;
    $script.onreadystatechange = callback;
    $script.onload = callback;
    document.head.appendChild($script);
}
function stripHtml(html, preFilterSelector) {
    if (preFilterSelector === void 0) { preFilterSelector = 'a'; }
    var temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;
    if (preFilterSelector) {
        temporalDivElement.querySelectorAll(preFilterSelector).forEach(function ($el) { return $el.remove(); });
    }
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
}
function formEntry(formData, key) {
    var _a;
    if (formData.get(key) === null) {
        return '';
    }
    return (_a = formData.get(key)) !== null && _a !== void 0 ? _a : '';
}
function cleanFormFields(formInfoRecord) {
    var _a, _b, _c, _d, _e, _f;
    var _loop_1 = function (field) {
        var additionalFields = Object.entries((_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.additional_fields) !== null && _b !== void 0 ? _b : {}).map(function (_a) {
            var _ = _a[0], value = _a[1];
            return value;
        });
        if (additionalFields.find(function (f) { return f.field_name === field; }) && formInfoRecord[field]) {
            return "continue";
        }
        var billingFields = Object.entries((_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields) !== null && _d !== void 0 ? _d : {}).map(function (_a) {
            var _ = _a[0], value = _a[1];
            return value;
        });
        if (billingFields.find(function (f) { return f.field_name === field; }) && formInfoRecord[field]) {
            return "continue";
        }
        var shippingFields = Object.entries((_f = (_e = GLOBAL.phpData) === null || _e === void 0 ? void 0 : _e.shipping_fields) !== null && _f !== void 0 ? _f : {}).map(function (_a) {
            var _ = _a[0], value = _a[1];
            return value;
        });
        if (shippingFields.find(function (f) { return f.field_name === field; }) && formInfoRecord[field]) {
            return "continue";
        }
        if (isDefaultField(field, 'shipping') || isDefaultField(field, 'billing')) {
            formInfoRecord[field] = '';
            return "continue";
        }
        if (formInfoRecord[field]) {
            return "continue";
        }
        else {
            delete formInfoRecord[field];
        }
    };
    for (var field in formInfoRecord) {
        _loop_1(field);
    }
}
function isDefaultField(name, section) {
    var defaultFieldNames = [
        section + '_email',
        section + '_phone',
        section + '_first_name',
        section + '_last_name',
        section + '_company',
        section + '_address_1',
        section + '_address_2',
        section + '_postcode',
        section + '_city',
        section + '_state',
        section + '_country',
    ];
    return defaultFieldNames.includes(name);
}
function isRequiredField(name, fieldData, fieldInfo) {
    var fieldDataInfo = false;
    for (var orderNumber in fieldData) {
        if (name === fieldData[orderNumber].field_name) {
            fieldDataInfo = fieldData[orderNumber].field_required ? true : false;
        }
    }
    var countryLocaleRule = true;
    if (fieldInfo) {
        if (fieldInfo.required === undefined) {
            countryLocaleRule = true;
        }
        else {
            countryLocaleRule = fieldInfo === null || fieldInfo === void 0 ? void 0 : fieldInfo.required;
        }
    }
    return fieldDataInfo && countryLocaleRule;
}
var peachpayi18n = {
    "ar": {
        "+ ADD A COUPON CODE": "+ أضف رمز القسيمة",
        "+ COUPON": "+ قسيمة",
        "+ NEW CARD": "+ بطاقة جديدة",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ استرداد بطاقة الهدايا / رصيد المتجر",
        "ADD": "يضيف",
        "Accept": "قبول",
        "Account": "الحساب",
        "Account login": "تسجل الدخول",
        "Account name": "أسم الحساب",
        "Account registration": "تسجيل حساب",
        "Add": "يضيف",
        "Additional information": "معلومات إضافية",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "بعد تحديد <b> دفع </ b> ، ستظهر مطالبة لتحديد حساب مصرفي.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "بعد تحديد <b> الدفع </ b> ، ستتم إعادة توجيهك لإتمام الدفع.",
        "After selecting pay you will be redirected to complete your payment.": "بعد اختيار الدفع ، ستتم إعادة توجيهك لإكمال الدفع.",
        "After selecting pay, a window will appear where you can complete your payment.": "بعد اختيار الدفع ، ستظهر نافذة يمكنك من خلالها إتمام عملية الدفع.",
        "An unknown error occurred. Please refresh the page and try again.": "حدث خطأ غير معروف. يرجى تحديث الصفحة وحاول مرة أخرى.",
        "Another step will appear after submitting your order to complete your purchase details.": "ستظهر خطوة أخرى بعد تقديم طلبك لإكمال تفاصيل الشراء.",
        "Apartment": "شقة",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "تم تحديد Apple Pay للدفع.",
        "BILLING": "الفواتير",
        "Back": "خلف",
        "Bill to": "مشروع قانون ل",
        "Billing": "الفواتير",
        "Billing method": "طريقة الفواتير",
        "By clicking <b>Accept</b>, you authorize": "بالنقر فوق <b> قبول </ b> ، أنت تصرح",
        "By clicking the button above, you agree to": "بالنقر فوق الزر أعلاه ، فإنك توافق على",
        "Cancel": "يلغي",
        "Card": "بطاقة",
        "Cart is empty": "البطاقه خاليه",
        "Cheque": "التحقق من",
        "City": "مدينة",
        "Click to refresh shipping price": "انقر لتحديث سعر الشحن",
        "Close": "قريب",
        "Continue": "يكمل",
        "Country": "دولة",
        "County": "مقاطعة",
        "Coupon code": "رمز الكوبون",
        "Currency": "عملة",
        "Customize": "يعدل أو يكيف",
        "Delivery date": "تاريخ التسليم او الوصول",
        "Done": "فعله",
        "Edit": "تعديل",
        "Email": "بريد الالكتروني",
        "Email or Username": "البريد الإلكتروني أو اسم المستخدم",
        "Exit checkout": "الخروج من الخروج",
        "First name": "الاسم الأول",
        "First renewal": "التجديد الأول",
        "Gift card number": "رقم بطاقة الهدية",
        "Google Pay": "جوجل باي",
        "Google Pay selected for checkout.": "تم تحديد Google Pay للدفع.",
        "I verify that the country I have entered is the one I reside in": "أتحقق من أن البلد الذي أدخلته هو البلد الذي أقيم فيه",
        "Initial Shipment": "الشحنة الأولية",
        "Last name": "الكنية",
        "Login": "تسجيل الدخول",
        "My cart": "عربة التسوق الخاصة بي",
        "Name": "اسم",
        "No thanks": "لا شكرا",
        "Note: Payments may take up to 5 days to complete.": "ملاحظة: قد يستغرق استكمال الدفعات ما يصل إلى 5 أيام.",
        "Order notes": "ترتيب ملاحظات",
        "Order summary": "ملخص الطلب",
        "P24 Bank": "بنك P24",
        "PAYMENT": "دفع",
        "Password": "كلمه السر",
        "Pay": "دفع",
        "Pay with a cheque": "ادفع بشيك",
        "Payment": "قسط",
        "Payment method": "طريقة الدفع او السداد",
        "Payment via Wire/Bank Transfer": "الدفع عن طريق التحويل البنكي / البنكي",
        "Personal": "الشخصية",
        "Phone number": "رقم الهاتف",
        "Place order": "مكان الامر",
        "Please go back and try again. Missing required field": "الرجاء العودة والمحاولة مجددا. حقل مطلوب مفقود",
        "Postal code": "الرمز البريدي",
        "Powered by": "مشغل بواسطة",
        "Privacy Policy": "سياسة الخصوصية",
        "Processing": "يعالج",
        "Province": "المحافظة",
        "Purchase order": "أمر شراء",
        "Recommended for you": "موصى به لك",
        "Recurring total": "المجموع المتكرر",
        "Register": "يسجل",
        "Remove": "إزالة",
        "Return": "يعود",
        "Review your information": "راجع معلوماتك",
        "SHIPPING": "الشحن",
        "Save changes": "احفظ التغييرات",
        "Select a country": "اختر دولة",
        "Select a province": "اختر المحافظة",
        "Select a state": "اختر ولاية",
        "Ship to": "سافر على متن سفينة لِـ",
        "Shipping": "شحن",
        "Shipping method": "طريقة الشحن",
        "Sorry, something went wrong. Please refresh the page and try again.": "عذرا، هناك خطأ ما. يرجى تحديث الصفحة وحاول مرة أخرى.",
        "Sorry, this store does not ship to your location.": "عذرا ، هذا المتجر لا يشحن إلى موقعك.",
        "State": "حالة",
        "Street address": ".عنوان الشارع",
        "Subtotal": "المجموع الفرعي",
        "Tax": "ضريبة",
        "Terms of Service": "شروط الخدمة",
        "Test mode: customers cannot see PeachPay": "وضع الاختبار: لا يمكن للعملاء رؤية PeachPay",
        "The customer canceled choosing a bank account.": "ألغى العميل اختيار حساب بنكي.",
        "The merchant has not enabled any payment methods": "لم يقم التاجر بتمكين أي طرق دفع",
        "The required mandate was not accepted. Payment canceled.": "لم يتم قبول التفويض المطلوب. تم إلغاء الدفع.",
        "There are no eligible or active payment methods available for this order.": "لا توجد طرق دفع مؤهلة أو نشطة متاحة لهذا الطلب.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "طريقة الدفع هذه لا تدعم العملة المحددة ، وعند النقر فوق هذه الرسالة سيتم التبديل إلى العملة",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "طريقة الدفع هذه لا تدعم العملة المحددة. عند تحديد هذا ، سيتم التبديل إلى العملة",
        "This payment method does not support the selected currency. Please switch currencies.": "طريقة الدفع هذه لا تدعم العملة المحددة. يرجى تبديل العملات.",
        "Total": "المجموع",
        "US bank account": "حساب بنكي أمريكي",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "تعذر التحقق من هذا الحساب المصرفي. الرجاء استخدام حساب مصرفي مختلف أو اختيار طريقة دفع جديدة.",
        "Unknown order error occurred": "حدث خطأ طلب غير معروف",
        "Use different shipping address": "استخدم عنوان شحن مختلف",
        "VIEW SAVED CARDS": "عرض البطاقات المحفوظة",
        "Verified": "تم التحقق",
        "View options": "عرض الخيارات",
        "Wire/Bank Transfer": "حوالة مصرفية / بنكية",
        "You entered an invalid coupon code": "لقد أدخلت رمز قسيمة غير صالح",
        "You entered an invalid gift card": "لقد أدخلت بطاقة هدية غير صالحة",
        "additional": "إضافي",
        "and": "و",
        "apply": "يتقدم",
        "coupon": "قسيمة",
        "eps Bank": "بنك eps",
        "iDEAL Bank": "بنك iDEAL",
        "privacy policy": "سياسة خاصة",
        "pursuant to": "يؤدي الى",
        "services and/or purchase of products from ": "الخدمات و / أو شراء المنتجات من",
        "terms": "مصلحات",
        "terms and conditions": "الأحكام والشروط",
        "the": "ال",
        "the store's": "المتجر",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "للخصم من الحساب المصرفي المحدد أعلاه لأي مبلغ مستحق للرسوم الناشئة عن استخدامك لـ",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "موقع الويب والشروط ، حتى يتم إلغاء هذا التفويض. يمكنك تعديل هذا التفويض أو إلغائه في أي وقت عن طريق إرسال إشعار إلى",
        "with 30 (thirty) days notice.": "مع إشعار لمدة 30 (ثلاثين) يومًا."
    },
    "bg-BG": {
        "+ ADD A COUPON CODE": "+ ДОБАВЯНЕ НА КОД НА КУПОН",
        "+ COUPON": "+ КУПОН",
        "+ NEW CARD": "+ НОВА КАРТА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ИЗКУПЕТЕ КАРТА ЗА ПОДАРЪК/КРЕДИТ ЗА МАГАЗИН",
        "ADD": "ДОБАВЯНЕ",
        "Accept": "Приеми",
        "Account": "Сметка",
        "Account login": "Влизане в акаунта",
        "Account name": "Име на акаунта",
        "Account registration": "Регистрация на акаунт",
        "Add": "Добавете",
        "Additional information": "Допълнителна информация",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "След като изберете <b>Плащане</b>, ще се появи подкана за избор на банкова сметка.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "След като изберете <b>Плащане</b>, ще бъдете пренасочени, за да завършите плащането си.",
        "After selecting pay you will be redirected to complete your payment.": "След като изберете плащане, ще бъдете пренасочени да завършите плащането си.",
        "After selecting pay, a window will appear where you can complete your payment.": "След като изберете плащане, ще се появи прозорец, където можете да завършите плащането си.",
        "An unknown error occurred. Please refresh the page and try again.": "Възникна неизвестна грешка. Моля, опреснете страницата и опитайте отново.",
        "Another step will appear after submitting your order to complete your purchase details.": "След като изпратите поръчката си, ще се появи друга стъпка, за да завършите подробностите за покупката.",
        "Apartment": "Апартамент",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay избран за плащане.",
        "BILLING": "ТАКСУВАНЕ",
        "Back": "обратно",
        "Bill to": "Сметка на",
        "Billing": "Таксуване",
        "Billing method": "Метод на таксуване",
        "By clicking <b>Accept</b>, you authorize": "Като щракнете върху <b>Приемам</b>, вие упълномощавате",
        "By clicking the button above, you agree to": "Като щракнете върху бутона по-горе, вие се съгласявате",
        "Cancel": "Отмяна",
        "Card": "карта",
        "Cart is empty": "Количката е празна",
        "Cheque": "Проверете",
        "City": "град",
        "Click to refresh shipping price": "Кликнете, за да опресните цената за доставка",
        "Close": "Близо",
        "Continue": "продължи",
        "Country": "Държава",
        "County": "окръг",
        "Coupon code": "Код на купон",
        "Currency": "Валута",
        "Customize": "Персонализиране",
        "Delivery date": "Дата на доставка",
        "Done": "Свършен",
        "Edit": "редактиране",
        "Email": "електронна поща",
        "Email or Username": "Имейл или потребителско име",
        "Exit checkout": "Изход от касата",
        "First name": "Първо име",
        "First renewal": "Първо подновяване",
        "Gift card number": "Номер на карта за подарък",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay е избран за плащане.",
        "I verify that the country I have entered is the one I reside in": "Потвърждавам, че държавата, в която съм влязъл, е тази, в която пребивавам",
        "Initial Shipment": "Първоначално изпращане",
        "Last name": "Фамилия",
        "Login": "Влизам",
        "My cart": "Моята количка",
        "Name": "Име",
        "No thanks": "Не благодаря",
        "Note: Payments may take up to 5 days to complete.": "Забележка: Завършването на плащанията може да отнеме до 5 дни.",
        "Order notes": "Бележки за поръчката",
        "Order summary": "Резюме на поръчката",
        "P24 Bank": "Банка P24",
        "PAYMENT": "ПЛАЩАНЕ",
        "Password": "парола",
        "Pay": "Плати",
        "Pay with a cheque": "Платете с чек",
        "Payment": "Плащане",
        "Payment method": "Начин на плащане",
        "Payment via Wire/Bank Transfer": "Плащане чрез банков превод",
        "Personal": "Лични",
        "Phone number": "Телефонен номер",
        "Place order": "Поръчай",
        "Please go back and try again. Missing required field": "Моля, върнете се и опитайте отново. Липсва задължително поле",
        "Postal code": "Пощенски код",
        "Powered by": "Задвижвани от",
        "Privacy Policy": "Политика за поверителност",
        "Processing": "Обработка",
        "Province": "провинция",
        "Purchase order": "Поръчка",
        "Recommended for you": "препоръчително за теб",
        "Recurring total": "Повтарящо се общо",
        "Register": "Регистрирам",
        "Remove": "Премахване",
        "Return": "Връщане",
        "Review your information": "Прегледайте информацията си",
        "SHIPPING": "ДОСТАВКА",
        "Save changes": "Запазите промените",
        "Select a country": "Изберете държава",
        "Select a province": "Изберете провинция",
        "Select a state": "Изберете състояние",
        "Ship to": "Изпратете до",
        "Shipping": "Доставка",
        "Shipping method": "Начин на доставка",
        "Sorry, something went wrong. Please refresh the page and try again.": "Съжалявам нещо се обърка. Моля, опреснете страницата и опитайте отново.",
        "Sorry, this store does not ship to your location.": "За съжаление този магазин не доставя до вашето местоположение.",
        "State": "състояние",
        "Street address": "Адрес на улица",
        "Subtotal": "Междинна сума",
        "Tax": "данък",
        "Terms of Service": "Условия за ползване",
        "Test mode: customers cannot see PeachPay": "Тестов режим: клиентите не могат да виждат PeachPay",
        "The customer canceled choosing a bank account.": "Клиентът се отказа от избора на банкова сметка.",
        "The merchant has not enabled any payment methods": "Търговецът не е активирал никакви методи на плащане",
        "The required mandate was not accepted. Payment canceled.": "Необходимият мандат не беше приет. Плащането е отменено.",
        "There are no eligible or active payment methods available for this order.": "Няма налични подходящи или активни методи на плащане за тази поръчка.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Този начин на плащане не поддържа избраната валута, при щракване върху това съобщение валутата ще премине към",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Този начин на плащане не поддържа избраната валута. При избор на това валутата ще премине към",
        "This payment method does not support the selected currency. Please switch currencies.": "Този начин на плащане не поддържа избраната валута. Моля, сменете валутите.",
        "Total": "Обща сума",
        "US bank account": "банкова сметка в САЩ",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Не може да се потвърди тази банкова сметка. Моля, използвайте друга банкова сметка или изберете нов метод на плащане.",
        "Unknown order error occurred": "Възникна грешка при неизвестна поръчка",
        "Use different shipping address": "Използвайте различен адрес за доставка",
        "VIEW SAVED CARDS": "ВИЖТЕ ЗАПАЗЕНИ КАРТИ",
        "Verified": "Потвърдено",
        "View options": "Вижте опциите",
        "Wire/Bank Transfer": "Банков превод",
        "You entered an invalid coupon code": "Въведохте невалиден код на талон",
        "You entered an invalid gift card": "Въведохте невалидна карта за подарък",
        "additional": "допълнителен",
        "and": "и",
        "apply": "Приложи",
        "coupon": "купон",
        "eps Bank": "eps банка",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "политика за поверителност",
        "pursuant to": "в съответствие с",
        "services and/or purchase of products from ": "услуги и/или покупка на продукти от",
        "terms": "термини",
        "terms and conditions": "правила и условия",
        "the": "на",
        "the store's": "на магазина",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "за дебитиране на посочената по-горе банкова сметка за всяка дължима сума за такси, произтичащи от използването на",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "уебсайт и условия, докато това разрешение не бъде отменено. Можете да промените или отмените това разрешение по всяко време, като изпратите уведомление до",
        "with 30 (thirty) days notice.": "с 30 (тридесет) дневно предизвестие."
    },
    "bs-BA": {
        "+ ADD A COUPON CODE": "+ DODAJTE KOD ZA POPUST",
        "+ COUPON": "+ KUPON",
        "+ NEW CARD": "+ NOVA KARTICA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ISKLJUČITE POKLON KARTICU/KREDIT TRGOVINE",
        "ADD": "DODATI",
        "Accept": "Prihvati",
        "Account": "Račun",
        "Account login": "Prijava na račun",
        "Account name": "Ime računa",
        "Account registration": "Registracija računa",
        "Add": "Dodati",
        "Additional information": "Dodatne informacije",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Nakon odabira <b>Plati</b> pojavit će se upit za odabir bankovnog računa.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Nakon što odaberete <b>Plati</b>, bit ćete preusmjereni da završite plaćanje.",
        "After selecting pay you will be redirected to complete your payment.": "Nakon odabira plaćanja bićete preusmereni da dovršite plaćanje.",
        "After selecting pay, a window will appear where you can complete your payment.": "Nakon odabira plaćanja, pojavit će se prozor u kojem možete izvršiti uplatu.",
        "An unknown error occurred. Please refresh the page and try again.": "Došlo je do nepoznate greške. Osvježite stranicu i pokušajte ponovo.",
        "Another step will appear after submitting your order to complete your purchase details.": "Nakon slanja narudžbe pojavit će se još jedan korak kako biste dovršili detalje kupovine.",
        "Apartment": "Stan",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay odabran za naplatu.",
        "BILLING": "BILLING",
        "Back": "Vrati se",
        "Bill to": "Bill to",
        "Billing": "Naplata",
        "Billing method": "Način naplate",
        "By clicking <b>Accept</b>, you authorize": "Klikom na <b>Prihvati</b> dajete ovlaštenje",
        "By clicking the button above, you agree to": "Klikom na dugme iznad, prihvatate",
        "Cancel": "Otkaži",
        "Card": "Kartica",
        "Cart is empty": "Korpa je prazna",
        "Cheque": "Proveri",
        "City": "Grad",
        "Click to refresh shipping price": "Kliknite da osvežite cenu dostave",
        "Close": "Zatvori",
        "Continue": "Nastavi",
        "Country": "Država",
        "County": "Država",
        "Coupon code": "Kupon kod",
        "Currency": "Valuta",
        "Customize": "Prilagodi",
        "Delivery date": "Datum dostave",
        "Done": "Gotovo",
        "Edit": "Uredi",
        "Email": "Email",
        "Email or Username": "E-mail ili korisničko ime",
        "Exit checkout": "Izađite iz naplate",
        "First name": "Ime",
        "First renewal": "Prva obnova",
        "Gift card number": "Broj poklon kartice",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay odabran za naplatu.",
        "I verify that the country I have entered is the one I reside in": "Potvrđujem da je zemlja u kojoj se trenutno nalazim ona u kojoj živim",
        "Initial Shipment": "Inicijalna pošiljka",
        "Last name": "Prezime",
        "Login": "Ulogovati se",
        "My cart": "Moja kolica",
        "Name": "Ime",
        "No thanks": "Ne hvala",
        "Note: Payments may take up to 5 days to complete.": "Napomena: Uplate mogu potrajati do 5 dana.",
        "Order notes": "Porudžbenice",
        "Order summary": "Sažetak Narudžbe",
        "P24 Bank": "P24 Banka",
        "PAYMENT": "PLAĆANJE",
        "Password": "Lozinka",
        "Pay": "Plati",
        "Pay with a cheque": "Platite čekom",
        "Payment": "Plaćanje",
        "Payment method": "Način plaćanja",
        "Payment via Wire/Bank Transfer": "Plaćanje putem bankovnog transfera",
        "Personal": "Lični",
        "Phone number": "Telefonski broj",
        "Place order": "Naručite",
        "Please go back and try again. Missing required field": "Vratite se i pokušajte ponovo. Nedostaje obavezno polje",
        "Postal code": "Poštanski broj",
        "Powered by": "Powered by",
        "Privacy Policy": "Politika privatnosti",
        "Processing": "Obrada",
        "Province": "Regija",
        "Purchase order": "Porudžbenica",
        "Recommended for you": "Preporučeno za vas",
        "Recurring total": "Ponavljajući ukupno",
        "Register": "Registrujte se",
        "Remove": "Ukloni",
        "Return": "Povratak",
        "Review your information": "Pregledajte svoje podatke",
        "SHIPPING": "SHIPPING",
        "Save changes": "Sačuvaj promjene",
        "Select a country": "Odaberite državu",
        "Select a province": "Odaberite regiju",
        "Select a state": "Odaberite državu",
        "Ship to": "Pošaljite na",
        "Shipping": "Dostava",
        "Shipping method": "Način dostave",
        "Sorry, something went wrong. Please refresh the page and try again.": "Žao nam je, nešto je pošlo po zlu. Osvežite stranicu i pokušajte ponovo.",
        "Sorry, this store does not ship to your location.": "Žao nam je, ova trgovina ne dostavlja na vašu lokaciju.",
        "State": "Država",
        "Street address": "Ulica i broj",
        "Subtotal": "Ukupno proizvodi",
        "Tax": "Porez",
        "Terms of Service": "Uslovi korištenja",
        "Test mode: customers cannot see PeachPay": "Testni način: kupci ne mogu videti PeachPay",
        "The customer canceled choosing a bank account.": "Kupac je otkazao odabir bankovnog računa.",
        "The merchant has not enabled any payment methods": "Trgovac nije omogućio nijedan način plaćanja",
        "The required mandate was not accepted. Payment canceled.": "Traženi mandat nije prihvaćen. Plaćanje je otkazano.",
        "There are no eligible or active payment methods available for this order.": "Za ovu narudžbu nema dostupnih prihvatljivih ili aktivnih načina plaćanja.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Ovaj način plaćanja ne podržava odabranu valutu, klikom na ovu poruku valuta će se promeniti",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Ovaj način plaćanja ne podržava odabranu valutu. Kada odaberete ovo, valuta će se promeniti na",
        "This payment method does not support the selected currency. Please switch currencies.": "Ovaj način plaćanja ne podržava odabranu valutu. Molimo promenite valutu.",
        "Total": "Ukupno za uplatu",
        "US bank account": "Američki bankovni račun",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Nije moguće potvrditi ovaj bankovni račun. Koristite drugi bankovni račun ili odaberite novi način plaćanja.",
        "Unknown order error occurred": "Došlo je do nepoznate greške u narudžbi",
        "Use different shipping address": "Koristite drugu adresu za dostavu",
        "VIEW SAVED CARDS": "POGLEDAJTE SAČUVANE KARTICE",
        "Verified": "Potvrditi",
        "View options": "Prikaži opcije",
        "Wire/Bank Transfer": "Bankovni transfer",
        "You entered an invalid coupon code": "Uneli ste nevažeći promo kod",
        "You entered an invalid gift card": "Uneli ste nevažeću poklon karticu",
        "additional": "dodatno",
        "and": "i",
        "apply": "primijeniti",
        "coupon": "kupon",
        "eps Bank": "eps banka",
        "iDEAL Bank": "iDEAL banka",
        "privacy policy": "politika privatnosti",
        "pursuant to": "u skladu sa",
        "services and/or purchase of products from ": "usluge i/ili kupovinu proizvoda od",
        "terms": "uslovi",
        "terms and conditions": "odredbe i uslovi",
        "the": "the",
        "the store's": "radnji",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "da zadužite gore navedeni bankovni račun za bilo koji iznos koji se duguje za troškove koji proizlaze iz vašeg korištenja",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "web stranicu i uslove, dok se ovo ovlaštenje ne opozove. Možete izmijeniti ili poništiti ovo ovlaštenje u bilo koje vrijeme tako što ćete obavijestiti",
        "with 30 (thirty) days notice.": "uz najavu od 30 (trideset) dana."
    },
    "ca": {
        "+ ADD A COUPON CODE": "+ AFEGUEIX UN CODI DE CUPON",
        "+ COUPON": "+ CUPÓ",
        "+ NEW CARD": "+ NOVA TARGETA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ BENEFICIA DE LA TARGETA REGAL/CREDIT DE LA BOTIGA",
        "ADD": "AFEGIR",
        "Accept": "Acceptar",
        "Account": "Compte",
        "Account login": "Inici de sessió al compte",
        "Account name": "Nom del compte",
        "Account registration": "Registre del compte",
        "Add": "Afegeix",
        "Additional information": "Informació adicional",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Després de seleccionar <b>Paga</b>, apareixerà una sol·licitud per seleccionar un compte bancari.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Després de seleccionar <b>Paga</b>, se us redirigirà per completar el pagament.",
        "After selecting pay you will be redirected to complete your payment.": "Després de seleccionar el pagament, se us redirigirà per completar el pagament.",
        "After selecting pay, a window will appear where you can complete your payment.": "Després de seleccionar el pagament, apareixerà una finestra on podeu completar el pagament.",
        "An unknown error occurred. Please refresh the page and try again.": "S'ha produït un error desconegut. Actualitzeu la pàgina i torneu-ho a provar.",
        "Another step will appear after submitting your order to complete your purchase details.": "Un altre pas apareixerà després d'enviar la comanda per completar els detalls de la compra.",
        "Apartment": "Apartament",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay seleccionat per pagar.",
        "BILLING": "FACTURACIÓ",
        "Back": "esquena",
        "Bill to": "Factura a",
        "Billing": "Facturació",
        "Billing method": "Mètode de facturació",
        "By clicking <b>Accept</b>, you authorize": "En fer clic a <b>Accepta</b>, autoritzeu",
        "By clicking the button above, you agree to": "En fer clic al botó de dalt, acceptes",
        "Cancel": "Cancel · lar",
        "Card": "Targeta",
        "Cart is empty": "El carretó està buit",
        "Cheque": "Comproveu",
        "City": "ciutat",
        "Click to refresh shipping price": "Feu clic per actualitzar el preu d'enviament",
        "Close": "Tanca",
        "Continue": "Continua",
        "Country": "País",
        "County": "comtat",
        "Coupon code": "Codi de cupó",
        "Currency": "Moneda",
        "Customize": "Personalitza",
        "Delivery date": "Data de lliurament",
        "Done": "Fet",
        "Edit": "Edita",
        "Email": "Correu electrònic",
        "Email or Username": "Correu electrònic o nom d'usuari",
        "Exit checkout": "Sortir de la caixa",
        "First name": "Nom",
        "First renewal": "Primera renovació",
        "Gift card number": "Número de targeta regal",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay seleccionat per pagar.",
        "I verify that the country I have entered is the one I reside in": "Verifico que el país on he entrat és el on visc",
        "Initial Shipment": "Enviament inicial",
        "Last name": "Cognom",
        "Login": "iniciar Sessió",
        "My cart": "El meu carro",
        "Name": "Nom",
        "No thanks": "No gràcies",
        "Note: Payments may take up to 5 days to complete.": "Nota: els pagaments poden trigar fins a 5 dies a completar-se.",
        "Order notes": "Notes de comanda",
        "Order summary": "Resum de la comanda",
        "P24 Bank": "Banc P24",
        "PAYMENT": "PAGAMENT",
        "Password": "Contrasenya",
        "Pay": "Pagar",
        "Pay with a cheque": "Paga amb un xec",
        "Payment": "Pagament",
        "Payment method": "Mètode de pagament",
        "Payment via Wire/Bank Transfer": "Pagament mitjançant transferència bancària",
        "Personal": "Personal",
        "Phone number": "Número de telèfon",
        "Place order": "Fes la comanda",
        "Please go back and try again. Missing required field": "Si us plau, torneu i torneu-ho a provar. Falta el camp obligatori",
        "Postal code": "Codi Postal",
        "Powered by": "Impulsat per",
        "Privacy Policy": "Política de privacitat",
        "Processing": "Tramitació",
        "Province": "Província",
        "Purchase order": "Ordre de compra",
        "Recommended for you": "Recomanat per a tu",
        "Recurring total": "Total recurrent",
        "Register": "Registra't",
        "Remove": "Eliminar",
        "Return": "Tornar",
        "Review your information": "Revisa la teva informació",
        "SHIPPING": "ENVIAMENT",
        "Save changes": "Guardar canvis",
        "Select a country": "Seleccioneu un país",
        "Select a province": "Seleccioneu una província",
        "Select a state": "Seleccioneu un estat",
        "Ship to": "Enviament a",
        "Shipping": "Enviament",
        "Shipping method": "Mètode d'enviament",
        "Sorry, something went wrong. Please refresh the page and try again.": "Ho sentim, alguna cosa ha anat malament. Actualitzeu la pàgina i torneu-ho a provar.",
        "Sorry, this store does not ship to your location.": "Ho sentim, aquesta botiga no envia a la teva ubicació.",
        "State": "Estat",
        "Street address": "adreça",
        "Subtotal": "Subtotal",
        "Tax": "Impost",
        "Terms of Service": "Termes del servei",
        "Test mode: customers cannot see PeachPay": "Mode de prova: els clients no poden veure PeachPay",
        "The customer canceled choosing a bank account.": "El client va cancel·lar l'elecció d'un compte bancari.",
        "The merchant has not enabled any payment methods": "El comerciant no ha activat cap mètode de pagament",
        "The required mandate was not accepted. Payment canceled.": "No es va acceptar el mandat requerit. Pagament cancel·lat.",
        "There are no eligible or active payment methods available for this order.": "No hi ha mètodes de pagament elegibles o actius disponibles per a aquesta comanda.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Aquest mètode de pagament no admet la moneda seleccionada; en fer clic en aquest missatge, la moneda canviarà",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Aquesta forma de pagament no admet la moneda seleccionada. En seleccionar-ho, la moneda canviarà a",
        "This payment method does not support the selected currency. Please switch currencies.": "Aquesta forma de pagament no admet la moneda seleccionada. Si us plau, canvieu de moneda.",
        "Total": "Total",
        "US bank account": "compte bancari dels EUA",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "No es pot verificar aquest compte bancari. Utilitzeu un compte bancari diferent o trieu un mètode de pagament nou.",
        "Unknown order error occurred": "S'ha produït un error de comanda desconegut",
        "Use different shipping address": "Utilitzeu una adreça d'enviament diferent",
        "VIEW SAVED CARDS": "VISUALITZA TARGETES DESADES",
        "Verified": "Verificat",
        "View options": "Veure opcions",
        "Wire/Bank Transfer": "Transferència bancària",
        "You entered an invalid coupon code": "Heu introduït un codi de cupó no vàlid",
        "You entered an invalid gift card": "Has introduït una targeta regal no vàlida",
        "additional": "addicionals",
        "and": "i",
        "apply": "aplicar",
        "coupon": "cupó",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "política de privacitat",
        "pursuant to": "d'acord amb",
        "services and/or purchase of products from ": "serveis i/o compra de productes de",
        "terms": "termes",
        "terms and conditions": "termes i condicions",
        "the": "el",
        "the store's": "de la botiga",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "per carregar al compte bancari especificat anteriorment qualsevol quantitat deguda pels càrrecs derivats de l'ús que feu",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "lloc web i condicions, fins que aquesta autorització sigui revocada. Podeu modificar o cancel·lar aquesta autorització en qualsevol moment notificant-ho a",
        "with 30 (thirty) days notice.": "amb un preavís de 30 (trenta) dies."
    },
    "cs-CZ": {
        "+ ADD A COUPON CODE": "+ PŘIDEJTE KÓD KUPÓNU",
        "+ COUPON": "+ KUPON",
        "+ NEW CARD": "+ NOVÁ KARTA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ UPLATNĚTE DÁRKOVOU KARTU/KREDIT OBCHOD",
        "ADD": "PŘIDAT",
        "Accept": "Akceptovat",
        "Account": "Účet",
        "Account login": "Přihlášení k účtu",
        "Account name": "Jméno účtu",
        "Account registration": "Registrace účtu",
        "Add": "Přidat",
        "Additional information": "Dodatečné informace",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Po výběru <b>Zaplatit</b> se zobrazí výzva k výběru bankovního účtu.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Po výběru možnosti <b>Zaplatit</b> budete přesměrováni k dokončení platby.",
        "After selecting pay you will be redirected to complete your payment.": "Po výběru platby budete přesměrováni k dokončení platby.",
        "After selecting pay, a window will appear where you can complete your payment.": "Po výběru platby se zobrazí okno, kde můžete dokončit platbu.",
        "An unknown error occurred. Please refresh the page and try again.": "Nastala neznámá chyba. Obnovte stránku a zkuste to znovu.",
        "Another step will appear after submitting your order to complete your purchase details.": "Po odeslání objednávky se objeví další krok k doplnění údajů o nákupu.",
        "Apartment": "Byt",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay vybrán pro placení.",
        "BILLING": "ÚČTOVÁNÍ",
        "Back": "Zadní",
        "Bill to": "Účtovat",
        "Billing": "Fakturace",
        "Billing method": "Způsob účtování",
        "By clicking <b>Accept</b>, you authorize": "Kliknutím na <b>Přijmout</b> povolujete",
        "By clicking the button above, you agree to": "Kliknutím na tlačítko výše souhlasíte",
        "Cancel": "zrušení",
        "Card": "Kartu",
        "Cart is empty": "Košík je prázdný",
        "Cheque": "Šek",
        "City": "Město",
        "Click to refresh shipping price": "Kliknutím obnovíte cenu dopravy",
        "Close": "Zavřít",
        "Continue": "Pokračovat",
        "Country": "Země",
        "County": "okres",
        "Coupon code": "Kód kupónu",
        "Currency": "Měna",
        "Customize": "Přizpůsobit",
        "Delivery date": "Datum doručení",
        "Done": "Hotovo",
        "Edit": "Upravit",
        "Email": "E-mailem",
        "Email or Username": "E-mail nebo uživatelské jméno",
        "Exit checkout": "Odejít z pokladny",
        "First name": "Jméno",
        "First renewal": "První obnovení",
        "Gift card number": "Číslo dárkové karty",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "K placení vybrána služba Google Pay.",
        "I verify that the country I have entered is the one I reside in": "Ověřuji, že země, do které jsem zadal, je zemí, ve které bydlím",
        "Initial Shipment": "Počáteční zásilka",
        "Last name": "Příjmení",
        "Login": "Přihlásit se",
        "My cart": "Můj vozík",
        "Name": "název",
        "No thanks": "Ne, díky",
        "Note: Payments may take up to 5 days to complete.": "Poznámka: Dokončení plateb může trvat až 5 dní.",
        "Order notes": "Poznámky k objednávce",
        "Order summary": "Přehled objednávky",
        "P24 Bank": "Banka P24",
        "PAYMENT": "ZPŮSOB PLATBY",
        "Password": "Heslo",
        "Pay": "Platit",
        "Pay with a cheque": "Zaplaťte šekem",
        "Payment": "Způsob platby",
        "Payment method": "Způsob platby",
        "Payment via Wire/Bank Transfer": "Platba převodem/bankovním převodem",
        "Personal": "Osobní",
        "Phone number": "Telefonní číslo",
        "Place order": "Objednejte si",
        "Please go back and try again. Missing required field": "Vraťte se prosím zpět a zkuste to znovu. chybí povinné pole",
        "Postal code": "Poštovní směrovací číslo",
        "Powered by": "Poháněno",
        "Privacy Policy": "Zásady ochrany osobních údajů",
        "Processing": "zpracovává se",
        "Province": "Provincie",
        "Purchase order": "Nákupní objednávka",
        "Recommended for you": "doporučeno pro tebe",
        "Recurring total": "Opakující se celkem",
        "Register": "Registrovat",
        "Remove": "Odstranit",
        "Return": "Vrátit se",
        "Review your information": "zkontrolujte si své informace",
        "SHIPPING": "LODNÍ DOPRAVA",
        "Save changes": "Uložit změny",
        "Select a country": "Vyber zemi",
        "Select a province": "Vyberte provincii",
        "Select a state": "Vyberte stát",
        "Ship to": "Dopravit do",
        "Shipping": "Lodní doprava",
        "Shipping method": "Způsob dopravy",
        "Sorry, something went wrong. Please refresh the page and try again.": "Promiň, něco se pokazilo. Obnovte stránku a zkuste to znovu.",
        "Sorry, this store does not ship to your location.": "Litujeme, tento obchod nedodává do vaší lokality.",
        "State": "Stát",
        "Street address": "adresa ulice",
        "Subtotal": "Mezisoučet",
        "Tax": "Daň",
        "Terms of Service": "Podmínky služby",
        "Test mode: customers cannot see PeachPay": "Testovací režim: zákazníci nevidí PeachPay",
        "The customer canceled choosing a bank account.": "Zákazník zrušil výběr bankovního účtu.",
        "The merchant has not enabled any payment methods": "Obchodník nepovolil žádné platební metody",
        "The required mandate was not accepted. Payment canceled.": "Požadovaný mandát nebyl přijat. Platba zrušena.",
        "There are no eligible or active payment methods available for this order.": "Pro tuto objednávku nejsou k dispozici žádné způsobilé ani aktivní platební metody.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Tato platební metoda nepodporuje vybranou měnu, po kliknutí na tuto zprávu se měna přepne",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Tato platební metoda nepodporuje vybranou měnu. Při výběru této měny se přepne na",
        "This payment method does not support the selected currency. Please switch currencies.": "Tato platební metoda nepodporuje vybranou měnu. Změňte měny.",
        "Total": "Celkový",
        "US bank account": "americký bankovní účet",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Tento bankovní účet nelze ověřit. Použijte prosím jiný bankovní účet nebo zvolte nový způsob platby.",
        "Unknown order error occurred": "Došlo k neznámé chybě objednávky",
        "Use different shipping address": "Použijte jinou dodací adresu",
        "VIEW SAVED CARDS": "ZOBRAZIT ULOŽENÉ KARTY",
        "Verified": "Ověřeno",
        "View options": "Zobrazit možnosti",
        "Wire/Bank Transfer": "Bankovním převodem",
        "You entered an invalid coupon code": "Zadali jste neplatný kód kupónu",
        "You entered an invalid gift card": "Zadali jste neplatnou dárkovou kartu",
        "additional": "další",
        "and": "a",
        "apply": "aplikovat",
        "coupon": "kupón",
        "eps Bank": "banka eps",
        "iDEAL Bank": "iDEAL banka",
        "privacy policy": "Zásady ochrany osobních údajů",
        "pursuant to": "podle",
        "services and/or purchase of products from ": "služby a/nebo nákup produktů od",
        "terms": "podmínky",
        "terms and conditions": "pravidla a podmínky",
        "the": "a",
        "the store's": "obchody",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "odepsat z výše uvedeného bankovního účtu jakoukoli částku dlužnou za poplatky vyplývající z vašeho používání",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "webové stránky a podmínky, dokud nebude toto oprávnění zrušeno. Toto oprávnění můžete kdykoli změnit nebo zrušit zasláním upozornění",
        "with 30 (thirty) days notice.": "s výpovědní lhůtou 30 (třiceti) dnů."
    },
    "da-DK": {
        "+ ADD A COUPON CODE": "+ TILFØJ EN KUPONKODE",
        "+ COUPON": "+ KUPON",
        "+ NEW CARD": "+ NYT KORT",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ INDLØS GAVEKORT/BUTIKSKREDIT",
        "ADD": "TILFØJE",
        "Accept": "Acceptere",
        "Account": "Konto",
        "Account login": "Konto login",
        "Account name": "Kontonavn",
        "Account registration": "Kontoregistrering",
        "Add": "Tilføje",
        "Additional information": "Yderligere Information",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Når du har valgt <b>Betal</b>, vises en prompt for at vælge en bankkonto.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Når du har valgt <b>Betal</b>, bliver du omdirigeret til at gennemføre din betaling.",
        "After selecting pay you will be redirected to complete your payment.": "Når du har valgt betaling, bliver du omdirigeret til at gennemføre din betaling.",
        "After selecting pay, a window will appear where you can complete your payment.": "Når du har valgt betal, kommer der et vindue frem, hvor du kan gennemføre din betaling.",
        "An unknown error occurred. Please refresh the page and try again.": "Der opstod en ukendt fejl. Opdater venligst siden og prøv igen.",
        "Another step will appear after submitting your order to complete your purchase details.": "Et andet trin vises efter indsendelse af din ordre for at fuldføre dine købsoplysninger.",
        "Apartment": "Lejlighed",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay valgt til kassen.",
        "BILLING": "FAKTURERING",
        "Back": "Tilbage",
        "Bill to": "Regning til",
        "Billing": "Fakturering",
        "Billing method": "Faktureringsmetode",
        "By clicking <b>Accept</b>, you authorize": "Ved at klikke på <b>Acceptér</b> godkender du",
        "By clicking the button above, you agree to": "Ved at klikke på knappen ovenfor accepterer du",
        "Cancel": "Afbestille",
        "Card": "Kort",
        "Cart is empty": "Kurven er tom",
        "Cheque": "Kontrollere",
        "City": "By",
        "Click to refresh shipping price": "Klik for at opdatere forsendelsesprisen",
        "Close": "Tæt",
        "Continue": "Blive ved",
        "Country": "Land",
        "County": "Amt",
        "Coupon code": "Kuponkode",
        "Currency": "betalingsmiddel",
        "Customize": "Tilpas",
        "Delivery date": "Leveringsdato",
        "Done": "Færdig",
        "Edit": "Redigere",
        "Email": "E-mail",
        "Email or Username": "E-mail eller brugernavn",
        "Exit checkout": "Afslut kassen",
        "First name": "Fornavn",
        "First renewal": "Første fornyelse",
        "Gift card number": "Gavekort nummer",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay er valgt til kassen.",
        "I verify that the country I have entered is the one I reside in": "Jeg bekræfter, at det land, jeg har indtastet, er det, jeg bor i",
        "Initial Shipment": "Indledende forsendelse",
        "Last name": "Efternavn",
        "Login": "Log på",
        "My cart": "Min vogn",
        "Name": "Navn",
        "No thanks": "Nej tak",
        "Note: Payments may take up to 5 days to complete.": "Bemærk: Det kan tage op til 5 dage at gennemføre betalinger.",
        "Order notes": "Bestillingssedler",
        "Order summary": "Ordreoversigt",
        "P24 Bank": "P24 Bank",
        "PAYMENT": "BETALING",
        "Password": "Adgangskode",
        "Pay": "Betale",
        "Pay with a cheque": "Betal med en check",
        "Payment": "Betaling",
        "Payment method": "Betalingsmetode",
        "Payment via Wire/Bank Transfer": "Betaling via bankoverførsel",
        "Personal": "Personlig",
        "Phone number": "Telefonnummer",
        "Place order": "Angiv bestilling",
        "Please go back and try again. Missing required field": "Gå venligst tilbage og prøv igen. Mangler obligatorisk felt",
        "Postal code": "Postnummer",
        "Powered by": "Drevet af",
        "Privacy Policy": "Fortrolighedspolitik",
        "Processing": "Forarbejdning",
        "Province": "Provins",
        "Purchase order": "Indkøbsordre",
        "Recommended for you": "anbefalet til dig",
        "Recurring total": "Tilbagevendende total",
        "Register": "Tilmeld",
        "Remove": "Fjerne",
        "Return": "Vend tilbage",
        "Review your information": "Gennemgå dine oplysninger",
        "SHIPPING": "FORSENDELSE",
        "Save changes": "Gem ændringer",
        "Select a country": "Vælg et land",
        "Select a province": "Vælg en provins",
        "Select a state": "Vælg en stat",
        "Ship to": "Send til",
        "Shipping": "Forsendelse",
        "Shipping method": "Fragtmetode",
        "Sorry, something went wrong. Please refresh the page and try again.": "Undskyld, noget gik galt. Opdater venligst siden og prøv igen.",
        "Sorry, this store does not ship to your location.": "Beklager, denne butik sender ikke til din placering.",
        "State": "Stat",
        "Street address": "Vejnavn",
        "Subtotal": "Subtotal",
        "Tax": "Skat",
        "Terms of Service": "Servicevilkår",
        "Test mode: customers cannot see PeachPay": "Testtilstand: kunder kan ikke se PeachPay",
        "The customer canceled choosing a bank account.": "Kunden annullerede ved at vælge en bankkonto.",
        "The merchant has not enabled any payment methods": "Sælgeren har ikke aktiveret nogen betalingsmetoder",
        "The required mandate was not accepted. Payment canceled.": "Det nødvendige mandat blev ikke accepteret. Betaling annulleret.",
        "There are no eligible or active payment methods available for this order.": "Der er ingen kvalificerede eller aktive betalingsmetoder tilgængelige for denne ordre.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Denne betalingsmetode understøtter ikke den valgte valuta, ved at klikke på denne meddelelse skifter valutaen til",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Denne betalingsmetode understøtter ikke den valgte valuta. Når du vælger dette, skifter valutaen til",
        "This payment method does not support the selected currency. Please switch currencies.": "Denne betalingsmetode understøtter ikke den valgte valuta. Skift venligst valuta.",
        "Total": "i alt",
        "US bank account": "amerikansk bankkonto",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Denne bankkonto kunne ikke bekræftes. Brug venligst en anden bankkonto, eller vælg en ny betalingsmetode.",
        "Unknown order error occurred": "Ukendt ordrefejl opstod",
        "Use different shipping address": "Brug en anden leveringsadresse",
        "VIEW SAVED CARDS": "SE GEMTE KORT",
        "Verified": "Verificeret",
        "View options": "Se muligheder",
        "Wire/Bank Transfer": "Bankoverførsel",
        "You entered an invalid coupon code": "Du har indtastet en ugyldig kuponkode",
        "You entered an invalid gift card": "Du har indtastet et ugyldigt gavekort",
        "additional": "ekstra",
        "and": "og",
        "apply": "ansøge",
        "coupon": "kupon",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "Fortrolighedspolitik",
        "pursuant to": "i henhold til",
        "services and/or purchase of products from ": "tjenester og/eller køb af produkter fra",
        "terms": "vilkår",
        "terms and conditions": "vilkår og betingelser",
        "the": "det",
        "the store's": "butikkens",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "at debitere den ovenfor angivne bankkonto for ethvert skyldigt beløb for gebyrer, der opstår som følge af din brug af",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "hjemmeside og vilkår, indtil denne tilladelse tilbagekaldes. Du kan til enhver tid ændre eller annullere denne tilladelse ved at give besked til",
        "with 30 (thirty) days notice.": "med 30 (tredive) dages varsel."
    },
    "de-DE": {
        "+ ADD A COUPON CODE": "+ GUTSCHEINCODE HINZUFÜGEN",
        "+ COUPON": "+ GUTSCHEIN",
        "+ NEW CARD": "+ NEUE KARTE",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ GESCHENKKARTE EINLÖSEN/GUTSCHRIFT AUFBEWAHREN",
        "ADD": "HINZUFÜGEN",
        "Accept": "Annehmen",
        "Account": "Konto",
        "Account login": "Account Login",
        "Account name": "Kontobezeichnung",
        "Account registration": "Kontoregistrierung",
        "Add": "Hinzufügen",
        "Additional information": "Zusätzliche Information",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Nach Auswahl von <b>Bezahlen</b> erscheint eine Aufforderung zur Auswahl eines Bankkontos.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Nachdem Sie <b>Bezahlen</b> ausgewählt haben, werden Sie weitergeleitet, um Ihre Zahlung abzuschließen.",
        "After selecting pay you will be redirected to complete your payment.": "Nachdem Sie „Bezahlen“ ausgewählt haben, werden Sie weitergeleitet, um Ihre Zahlung abzuschließen.",
        "After selecting pay, a window will appear where you can complete your payment.": "Nachdem Sie Bezahlen ausgewählt haben, erscheint ein Fenster, in dem Sie Ihre Zahlung abschließen können.",
        "An unknown error occurred. Please refresh the page and try again.": "Ein unbekannter Fehler ist aufgetreten. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",
        "Another step will appear after submitting your order to complete your purchase details.": "Nach dem Absenden Ihrer Bestellung wird ein weiterer Schritt angezeigt, um Ihre Kaufdetails zu vervollständigen.",
        "Apartment": "Wohnung",
        "Apple Pay": "ApplePay",
        "Apple Pay selected for checkout.": "Apple Pay zum Bezahlen ausgewählt.",
        "BILLING": "ABRECHNUNG",
        "Back": "Der Rücken",
        "Bill to": "Gesetzesentwurf für",
        "Billing": "Abrechnung",
        "Billing method": "Abrechnungsmethode",
        "By clicking <b>Accept</b>, you authorize": "Indem Sie auf <b>Akzeptieren</b> klicken, stimmen Sie zu",
        "By clicking the button above, you agree to": "Indem Sie auf die Schaltfläche oben klicken, stimmen Sie zu",
        "Cancel": "Absagen",
        "Card": "Karte",
        "Cart is empty": "Einkaufswagen ist leer",
        "Cheque": "Überprüfen",
        "City": "Stadt",
        "Click to refresh shipping price": "Klicken Sie hier, um den Versandpreis zu aktualisieren",
        "Close": "Nah dran",
        "Continue": "Fortsetzen",
        "Country": "Land",
        "County": "Bezirk",
        "Coupon code": "Gutscheincode",
        "Currency": "Währung",
        "Customize": "Anpassen",
        "Delivery date": "Lieferdatum",
        "Done": "Fertig",
        "Edit": "Bearbeiten",
        "Email": "Email",
        "Email or Username": "E-Mail Adresse oder Benutzername",
        "Exit checkout": "Kasse verlassen",
        "First name": "Vorname",
        "First renewal": "Erste Erneuerung",
        "Gift card number": "Geschenkkartennummer",
        "Google Pay": "GooglePay",
        "Google Pay selected for checkout.": "Google Pay zum Bezahlen ausgewählt.",
        "I verify that the country I have entered is the one I reside in": "Ich bestätige, dass das Land, in das ich eingereist bin, das Land ist, in dem ich wohne",
        "Initial Shipment": "Erstversand",
        "Last name": "Familienname, Nachname",
        "Login": "Anmeldung",
        "My cart": "Mein Warenkorb",
        "Name": "Name",
        "No thanks": "Nein Danke",
        "Note: Payments may take up to 5 days to complete.": "Hinweis: Zahlungen können bis zu 5 Tage dauern.",
        "Order notes": "Anmerkungen zu Deiner Bestellung",
        "Order summary": "Bestellübersicht",
        "P24 Bank": "P24-Bank",
        "PAYMENT": "ZAHLUNG",
        "Password": "Passwort",
        "Pay": "Zahlen",
        "Pay with a cheque": "Zahlen Sie mit einem Scheck",
        "Payment": "Zahlung",
        "Payment method": "Zahlungsmethode",
        "Payment via Wire/Bank Transfer": "Zahlung per Überweisung/Banküberweisung",
        "Personal": "persönlich",
        "Phone number": "Telefonnummer",
        "Place order": "Bestellung aufgeben",
        "Please go back and try again. Missing required field": "Bitte gehen Sie zurück und versuchen Sie es erneut. Pflichtfeld fehlt",
        "Postal code": "Postleitzahl",
        "Powered by": "Unterstützt von",
        "Privacy Policy": "Datenschutz-Bestimmungen",
        "Processing": "wird bearbeitet",
        "Province": "Provinz",
        "Purchase order": "Bestellung",
        "Recommended for you": "für dich empfohlen",
        "Recurring total": "Wiederkehrende Summe",
        "Register": "Registrieren",
        "Remove": "Entfernen",
        "Return": "Zurückkehren",
        "Review your information": "Überprüfen Sie Ihre Informationen",
        "SHIPPING": "VERSAND",
        "Save changes": "Änderungen speichern",
        "Select a country": "Wähle ein Land",
        "Select a province": "Wählen Sie eine Provinz",
        "Select a state": "Wähle einen Staat",
        "Ship to": "Ausliefern",
        "Shipping": "Versand",
        "Shipping method": "Versandart",
        "Sorry, something went wrong. Please refresh the page and try again.": "Entschuldigung, etwas ist schief gelaufen. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",
        "Sorry, this store does not ship to your location.": "Entschuldigung, dieser Shop liefert nicht an Ihren Standort.",
        "State": "Bundesland",
        "Street address": "Adresse",
        "Subtotal": "Zwischensumme",
        "Tax": "Steuer",
        "Terms of Service": "Nutzungsbedingungen",
        "Test mode: customers cannot see PeachPay": "Testmodus: Kunden können PeachPay nicht sehen",
        "The customer canceled choosing a bank account.": "Der Kunde hat die Auswahl eines Bankkontos abgebrochen.",
        "The merchant has not enabled any payment methods": "Der Händler hat keine Zahlungsmethoden aktiviert",
        "The required mandate was not accepted. Payment canceled.": "Das erforderliche Mandat wurde nicht angenommen. Zahlung storniert.",
        "There are no eligible or active payment methods available for this order.": "Für diese Bestellung sind keine zulässigen oder aktiven Zahlungsmethoden verfügbar.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Wenn Sie auf diese Meldung klicken, wird die Währung geändert",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Wenn Sie dies auswählen, wechselt die Währung zu",
        "This payment method does not support the selected currency. Please switch currencies.": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Bitte Währung wechseln.",
        "Total": "Gesamt",
        "US bank account": "US-Bankkonto",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Dieses Bankkonto kann nicht bestätigt werden. Bitte verwenden Sie ein anderes Bankkonto oder wählen Sie eine neue Zahlungsmethode.",
        "Unknown order error occurred": "Unbekannter Bestellfehler aufgetreten",
        "Use different shipping address": "Verwenden Sie eine andere Lieferadresse",
        "VIEW SAVED CARDS": "GESPEICHERTE KARTEN ANZEIGEN",
        "Verified": "Verifiziert",
        "View options": "Optionen anzeigen",
        "Wire/Bank Transfer": "Überweisung/Banküberweisung",
        "You entered an invalid coupon code": "Sie haben einen ungültigen Gutscheincode eingegeben",
        "You entered an invalid gift card": "Sie haben eine ungültige Geschenkkarte eingegeben",
        "additional": "zusätzlich",
        "and": "und",
        "apply": "anwenden",
        "coupon": "Coupon",
        "eps Bank": "eps-Bank",
        "iDEAL Bank": "iDEAL-Bank",
        "privacy policy": "Datenschutz-Bestimmungen",
        "pursuant to": "gem",
        "services and/or purchase of products from ": "Dienstleistungen und/oder Kauf von Produkten von",
        "terms": "Bedingungen",
        "terms and conditions": "Geschäftsbedingungen",
        "the": "das",
        "the store's": "die Läden",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "das oben angegebene Bankkonto mit einem geschuldeten Betrag für Gebühren zu belasten, die sich aus Ihrer Nutzung von ergeben",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "Website und Bedingungen, bis diese Genehmigung widerrufen wird. Sie können diese Genehmigung jederzeit durch Mitteilung an ändern oder widerrufen",
        "with 30 (thirty) days notice.": "mit einer Frist von 30 (dreißig) Tagen."
    },
    "el": {
        "+ ADD A COUPON CODE": "+ ΠΡΟΣΘΗΚΗ ΚΩΔΙΚΟΥ ΚΟΥΠΟΝΙΟΥ",
        "+ COUPON": "+ ΚΟΥΠΟΝΙ",
        "+ NEW CARD": "+ ΝΕΑ ΚΑΡΤΑ",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ΕΞΑΡΓΥΡΩΣΤΕ ΔΩΡΟΚΑΡΤΑ/ΠΙΣΤΩΣΗ ΚΑΤΑΣΤΗΜΑΤΟΣ",
        "ADD": "ΠΡΟΣΘΗΚΗ",
        "Accept": "Αποδέχομαι",
        "Account": "Λογαριασμός",
        "Account login": "Είσοδος σε λογαριασμό",
        "Account name": "Όνομα λογαριασμού",
        "Account registration": "Εγγραφή λογαριασμού",
        "Add": "Προσθήκη",
        "Additional information": "Επιπλέον πληροφορίες",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Αφού επιλέξετε <b>Πληρωμή</b> θα εμφανιστεί ένα μήνυμα για να επιλέξετε έναν τραπεζικό λογαριασμό.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Αφού επιλέξετε <b>Πληρωμή</b> θα ανακατευθυνθείτε για να ολοκληρώσετε την πληρωμή σας.",
        "After selecting pay you will be redirected to complete your payment.": "Αφού επιλέξετε την πληρωμή, θα ανακατευθυνθείτε για να ολοκληρώσετε την πληρωμή σας.",
        "After selecting pay, a window will appear where you can complete your payment.": "Αφού επιλέξετε πληρωμή, θα εμφανιστεί ένα παράθυρο όπου μπορείτε να ολοκληρώσετε την πληρωμή σας.",
        "An unknown error occurred. Please refresh the page and try again.": "Συνέβη ένα άγνωστο σφάλμα. Ανανεώστε τη σελίδα και δοκιμάστε ξανά.",
        "Another step will appear after submitting your order to complete your purchase details.": "Ένα άλλο βήμα θα εμφανιστεί μετά την υποβολή της παραγγελίας σας για να ολοκληρώσετε τα στοιχεία αγοράς σας.",
        "Apartment": "Διαμέρισμα",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Επιλέχθηκε το Apple Pay για ολοκλήρωση αγοράς.",
        "BILLING": "ΧΡΕΩΣΗ",
        "Back": "Πίσω",
        "Bill to": "Bill to",
        "Billing": "Χρεωση",
        "Billing method": "Μέθοδος χρέωσης",
        "By clicking <b>Accept</b>, you authorize": "Κάνοντας κλικ στην επιλογή <b>Αποδοχή</b>, εξουσιοδοτείτε",
        "By clicking the button above, you agree to": "Κάνοντας κλικ στο παραπάνω κουμπί, συμφωνείτε με",
        "Cancel": "Ματαίωση",
        "Card": "Κάρτα",
        "Cart is empty": "Το καλάθι είναι άδειο",
        "Cheque": "Έλεγχος",
        "City": "Πόλη",
        "Click to refresh shipping price": "Κάντε κλικ για ανανέωση της τιμής αποστολής",
        "Close": "Κλείσε",
        "Continue": "Συνέχισε",
        "Country": "Χώρα",
        "County": "Κομητεία",
        "Coupon code": "Κωδικός κουπονιού",
        "Currency": "Νόμισμα",
        "Customize": "Προσαρμογή",
        "Delivery date": "Ημερομηνία παράδοσης",
        "Done": "Ολοκληρώθηκε",
        "Edit": "Επεξεργασία",
        "Email": "E-mail",
        "Email or Username": "E-mail ή το όνομα χρήστη",
        "Exit checkout": "Έξοδος από το ταμείο",
        "First name": "Ονομα",
        "First renewal": "Πρώτη ανανέωση",
        "Gift card number": "Αριθμός δωροκάρτας",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Επιλέχθηκε το Google Pay για ολοκλήρωση αγοράς.",
        "I verify that the country I have entered is the one I reside in": "Επαληθεύω ότι η χώρα την οποία έχω εισάγει είναι αυτή στην οποία διαμένω",
        "Initial Shipment": "Αρχική Αποστολή",
        "Last name": "Επίθετο",
        "Login": "Σύνδεση",
        "My cart": "Το καλάθι μου",
        "Name": "Όνομα",
        "No thanks": "Όχι ευχαριστώ",
        "Note: Payments may take up to 5 days to complete.": "Σημείωση: Οι πληρωμές ενδέχεται να χρειαστούν έως και 5 ημέρες για να ολοκληρωθούν.",
        "Order notes": "Σημειώσεις παραγγελίας",
        "Order summary": "Περίληψη παραγγελίας",
        "P24 Bank": "Τράπεζα P24",
        "PAYMENT": "ΠΛΗΡΩΜΗ",
        "Password": "Κωδικός πρόσβασης",
        "Pay": "Πληρωμή",
        "Pay with a cheque": "Πληρώστε με επιταγή",
        "Payment": "Πληρωμή",
        "Payment method": "Μέθοδος πληρωμής",
        "Payment via Wire/Bank Transfer": "Πληρωμή μέσω τραπεζικού εμβάσματος",
        "Personal": "Προσωπικός",
        "Phone number": "Τηλέφωνο",
        "Place order": "Παραγγέλνω",
        "Please go back and try again. Missing required field": "Επιστρέψτε και δοκιμάστε ξανά. Λείπει υποχρεωτικό πεδίο",
        "Postal code": "Ταχυδρομικός Κώδικας",
        "Powered by": "Powered by",
        "Privacy Policy": "Πολιτική Απορρήτου",
        "Processing": "Επεξεργασία",
        "Province": "Επαρχία",
        "Purchase order": "Εντολή αγοράς",
        "Recommended for you": "Συνιστάται για εσένα",
        "Recurring total": "Επαναλαμβανόμενο σύνολο",
        "Register": "Κανω ΕΓΓΡΑΦΗ",
        "Remove": "Αφαιρώ",
        "Return": "Επιστροφή",
        "Review your information": "Ελέγξτε τις πληροφορίες σας",
        "SHIPPING": "ΑΠΟΣΤΟΛΗ",
        "Save changes": "Αποθήκευσε τις αλλαγές",
        "Select a country": "Επιλέξτε χώρα",
        "Select a province": "Επιλέξτε επαρχία",
        "Select a state": "Επιλέξτε πολιτεία",
        "Ship to": "Αποστολή προς",
        "Shipping": "Αποστολη",
        "Shipping method": "Μέθοδος αποστολής",
        "Sorry, something went wrong. Please refresh the page and try again.": "Συγνώμη, κάτι πήγε στραβά. Ανανεώστε τη σελίδα και δοκιμάστε ξανά.",
        "Sorry, this store does not ship to your location.": "Λυπούμαστε, αυτό το κατάστημα δεν αποστέλλει στην τοποθεσία σας.",
        "State": "Πολιτεία",
        "Street address": "Διεύθυνση",
        "Subtotal": "Μερικό σύνολο",
        "Tax": "Φόρος",
        "Terms of Service": "Όροι χρήσης",
        "Test mode: customers cannot see PeachPay": "Δοκιμαστική λειτουργία: οι πελάτες δεν μπορούν να δουν το PeachPay",
        "The customer canceled choosing a bank account.": "Ο πελάτης ακύρωσε την επιλογή τραπεζικού λογαριασμού.",
        "The merchant has not enabled any payment methods": "Ο έμπορος δεν έχει ενεργοποιήσει κανέναν τρόπο πληρωμής",
        "The required mandate was not accepted. Payment canceled.": "Η απαιτούμενη εντολή δεν έγινε αποδεκτή. Η πληρωμή ακυρώθηκε.",
        "There are no eligible or active payment methods available for this order.": "Δεν υπάρχουν διαθέσιμες ή ενεργές μέθοδοι πληρωμής για αυτήν την παραγγελία.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα, κάνοντας κλικ σε αυτό το μήνυμα το νόμισμα θα αλλάξει σε",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα. Με την επιλογή αυτού, το νόμισμα θα αλλάξει σε",
        "This payment method does not support the selected currency. Please switch currencies.": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα. Αλλάξτε νόμισμα.",
        "Total": "Σύνολο",
        "US bank account": "Τραπεζικός λογαριασμός των ΗΠΑ",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Δεν είναι δυνατή η επαλήθευση αυτού του τραπεζικού λογαριασμού. Χρησιμοποιήστε διαφορετικό τραπεζικό λογαριασμό ή επιλέξτε νέο τρόπο πληρωμής.",
        "Unknown order error occurred": "Παρουσιάστηκε άγνωστο σφάλμα παραγγελίας",
        "Use different shipping address": "Χρησιμοποιήστε διαφορετική διεύθυνση αποστολής",
        "VIEW SAVED CARDS": "ΠΡΟΒΟΛΗ ΑΠΟΘΗΚΕΥΜΕΝΩΝ ΚΑΡΤΩΝ",
        "Verified": "Επαληθεύτηκε",
        "View options": "Προβολή επιλογών",
        "Wire/Bank Transfer": "Τραπεζικό έμβασμα",
        "You entered an invalid coupon code": "Εισαγάγατε έναν μη έγκυρο κωδικό κουπονιού",
        "You entered an invalid gift card": "Εισαγάγατε μια μη έγκυρη δωροκάρτα",
        "additional": "πρόσθετος",
        "and": "και",
        "apply": "ισχύουν",
        "coupon": "κουπόνι",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "Τράπεζα IDEAL",
        "privacy policy": "πολιτική απορρήτου",
        "pursuant to": "σύμφωνα με",
        "services and/or purchase of products from ": "υπηρεσίες ή/και αγορά προϊόντων από",
        "terms": "όροι",
        "terms and conditions": "όροι και προϋποθέσεις",
        "the": "την",
        "the store's": "τα μαγαζιά",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "να χρεώσετε τον τραπεζικό λογαριασμό που καθορίζεται παραπάνω για οποιοδήποτε ποσό οφείλετε για χρεώσεις που προκύπτουν από τη χρήση του",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "τον ιστότοπο και τους όρους, έως ότου ανακληθεί αυτή η εξουσιοδότηση. Μπορείτε να τροποποιήσετε ή να ακυρώσετε αυτήν την εξουσιοδότηση ανά πάσα στιγμή παρέχοντας ειδοποίηση στο",
        "with 30 (thirty) days notice.": "με προειδοποίηση 30 (τριάντα) ημερών."
    },
    "es-ES": {
        "+ ADD A COUPON CODE": "+ AÑADIR UN CÓDIGO DE CUPÓN",
        "+ COUPON": "+ CUPÓN",
        "+ NEW CARD": "+ NUEVA TARJETA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ CANJEAR TARJETA DE REGALO/CRÉDITO DE LA TIENDA",
        "ADD": "AGREGAR",
        "Accept": "Aceptar",
        "Account": "Cuenta",
        "Account login": "Cuenta de Ingreso",
        "Account name": "Nombre de la cuenta",
        "Account registration": "Registro de cuenta",
        "Add": "Agregar",
        "Additional information": "Información Adicional",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Después de seleccionar <b>Pagar</b>, aparecerá un mensaje para seleccionar una cuenta bancaria.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Después de seleccionar <b>Pagar</b>, será redirigido para completar su pago.",
        "After selecting pay you will be redirected to complete your payment.": "Después de seleccionar pagar, será redirigido para completar su pago.",
        "After selecting pay, a window will appear where you can complete your payment.": "Después de seleccionar pagar, aparecerá una ventana donde puede completar su pago.",
        "An unknown error occurred. Please refresh the page and try again.": "Un error desconocido ocurrió. Actualice la página y vuelva a intentarlo.",
        "Another step will appear after submitting your order to complete your purchase details.": "Aparecerá otro paso después de enviar su pedido para completar los detalles de su compra.",
        "Apartment": "Departamento",
        "Apple Pay": "pago de manzana",
        "Apple Pay selected for checkout.": "Apple Pay seleccionado para pagar.",
        "BILLING": "FACTURACIÓN",
        "Back": "atrás",
        "Bill to": "Cobrar a",
        "Billing": "Facturación",
        "Billing method": "método de facturación",
        "By clicking <b>Accept</b>, you authorize": "Al hacer clic en <b>Aceptar</b>, autoriza",
        "By clicking the button above, you agree to": "Al hacer clic en el botón de arriba, usted acepta",
        "Cancel": "Cancelar",
        "Card": "Tarjeta",
        "Cart is empty": "El carrito esta vacío",
        "Cheque": "Controlar",
        "City": "Ciudad",
        "Click to refresh shipping price": "Haga clic para actualizar el precio de envío",
        "Close": "Cerca",
        "Continue": "Continuar",
        "Country": "País",
        "County": "Condado",
        "Coupon code": "Código promocional",
        "Currency": "Divisa",
        "Customize": "personalizar",
        "Delivery date": "Fecha de entrega",
        "Done": "Hecho",
        "Edit": "Editar",
        "Email": "Correo electrónico",
        "Email or Username": "Correo electrónico o nombre de usuario",
        "Exit checkout": "Salir del Checkout",
        "First name": "Nombre",
        "First renewal": "Primera renovación",
        "Gift card number": "Numero de tarjeta de regalo",
        "Google Pay": "Pago de Google",
        "Google Pay selected for checkout.": "Google Pay seleccionado para pagar.",
        "I verify that the country I have entered is the one I reside in": "Verifico que el país en el que he entrado es en el que resido",
        "Initial Shipment": "Envío inicial",
        "Last name": "Apellido",
        "Login": "Acceso",
        "My cart": "Mi carrito",
        "Name": "Nombre",
        "No thanks": "No, gracias",
        "Note: Payments may take up to 5 days to complete.": "Nota: Los pagos pueden tardar hasta 5 días en completarse.",
        "Order notes": "Pedidos",
        "Order summary": "Resumen del pedido",
        "P24 Bank": "Banco P24",
        "PAYMENT": "PAGO",
        "Password": "Clave",
        "Pay": "Pagar",
        "Pay with a cheque": "Paga con un cheque",
        "Payment": "Pago",
        "Payment method": "Método de pago",
        "Payment via Wire/Bank Transfer": "Pago mediante transferencia bancaria/cable",
        "Personal": "Personal",
        "Phone number": "Número de teléfono",
        "Place order": "Realizar pedido",
        "Please go back and try again. Missing required field": "Por favor, regrese y vuelva a intentarlo. Faltan campos requeridos",
        "Postal code": "Código Postal",
        "Powered by": "Energizado por",
        "Privacy Policy": "Política de privacidad",
        "Processing": "Procesando",
        "Province": "Provincia",
        "Purchase order": "Orden de compra",
        "Recommended for you": "Recomendado para ti",
        "Recurring total": "total recurrente",
        "Register": "Registro",
        "Remove": "Remover",
        "Return": "Devolver",
        "Review your information": "revisa tu información",
        "SHIPPING": "ENVÍO",
        "Save changes": "Guardar cambios",
        "Select a country": "Seleccione un país",
        "Select a province": "Seleccione una provincia",
        "Select a state": "Selecciona un Estado",
        "Ship to": "Envie a",
        "Shipping": "Envío",
        "Shipping method": "Método de envío",
        "Sorry, something went wrong. Please refresh the page and try again.": "Perdón, algo salió mal. Actualice la página y vuelva a intentarlo.",
        "Sorry, this store does not ship to your location.": "Lo sentimos, esta tienda no realiza envíos a su ubicación.",
        "State": "Expresar",
        "Street address": "Dirección",
        "Subtotal": "Total parcial",
        "Tax": "Impuesto",
        "Terms of Service": "Términos de servicio",
        "Test mode: customers cannot see PeachPay": "Modo de prueba: los clientes no pueden ver PeachPay",
        "The customer canceled choosing a bank account.": "El cliente canceló la elección de una cuenta bancaria.",
        "The merchant has not enabled any payment methods": "El comerciante no ha habilitado ningún método de pago.",
        "The required mandate was not accepted. Payment canceled.": "El mandato requerido no fue aceptado. Pago cancelado.",
        "There are no eligible or active payment methods available for this order.": "No hay métodos de pago elegibles o activos disponibles para este pedido.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Este método de pago no admite la moneda seleccionada, al hacer clic en este mensaje, la moneda cambiará a",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Este método de pago no admite la moneda seleccionada. Al seleccionar esto, la moneda cambiará a",
        "This payment method does not support the selected currency. Please switch currencies.": "Este método de pago no admite la moneda seleccionada. Cambie de moneda.",
        "Total": "Total",
        "US bank account": "cuenta bancaria de EE. UU.",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "No se puede verificar esta cuenta bancaria. Utilice una cuenta bancaria diferente o elija un nuevo método de pago.",
        "Unknown order error occurred": "Se produjo un error de pedido desconocido",
        "Use different shipping address": "Usar una dirección de envío diferente",
        "VIEW SAVED CARDS": "VER TARJETAS GUARDADAS",
        "Verified": "Verificado",
        "View options": "Ver opciones",
        "Wire/Bank Transfer": "Transferencia electrónica/bancaria",
        "You entered an invalid coupon code": "Ingresó un código de cupón no válido",
        "You entered an invalid gift card": "Ingresó una tarjeta de regalo no válida",
        "additional": "adicional",
        "and": "y",
        "apply": "aplicar",
        "coupon": "cupón",
        "eps Bank": "Banco eps",
        "iDEAL Bank": "Banco iDEAL",
        "privacy policy": "política de privacidad",
        "pursuant to": "conforme a",
        "services and/or purchase of products from ": "servicios y/o compra de productos de",
        "terms": "términos",
        "terms and conditions": "Términos y condiciones",
        "the": "la",
        "the store's": "las tiendas",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "para debitar la cuenta bancaria especificada anteriormente por cualquier monto adeudado por los cargos que surjan de su uso de",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "sitio web y términos, hasta que se revoque esta autorización. Puede modificar o cancelar esta autorización en cualquier momento mediante notificación a",
        "with 30 (thirty) days notice.": "con 30 (treinta) días de anticipación."
    },
    "fr-FR": {
        "+ ADD A COUPON CODE": "+ AJOUTER UN CODE PROMO",
        "+ COUPON": "+ COUPON",
        "+ NEW CARD": "+ NOUVELLE CARTE",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ÉCHANGER UNE CARTE-CADEAU OU UN CRÉDIT D’ACHAT",
        "ADD": "AJOUTER",
        "Accept": "Accepter",
        "Account": "Compte",
        "Account login": "Connexion au compte",
        "Account name": "Nom du compte",
        "Account registration": "Enregistrement du Compte",
        "Add": "Ajouter",
        "Additional information": "Informations Complémentaires",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Après avoir sélectionné <b>Payer</b>, une invite apparaîtra pour sélectionner un compte bancaire.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Après avoir sélectionné <b>Payer</b>, vous serez redirigé pour effectuer votre paiement.",
        "After selecting pay you will be redirected to complete your payment.": "Après avoir sélectionné “payer”, vous serez redirigé pour terminer votre paiement.",
        "After selecting pay, a window will appear where you can complete your payment.": "Après avoir sélectionné payer, une fenêtre apparaîtra où vous pourrez effectuer votre paiement.",
        "An unknown error occurred. Please refresh the page and try again.": "Une erreur inconnue est survenue. Veuillez actualiser la page et réessayer.",
        "Another step will appear after submitting your order to complete your purchase details.": "Une autre étape apparaîtra après avoir soumis votre commande pour compléter les détails de votre achat.",
        "Apartment": "L’appartement",
        "Apple Pay": "Payer Apple",
        "Apple Pay selected for checkout.": "Apple Pay sélectionné pour le paiement.",
        "BILLING": "FACTURATION",
        "Back": "Retour",
        "Bill to": "facturer",
        "Billing": "La facturation",
        "Billing method": "Méthode de facturation",
        "By clicking <b>Accept</b>, you authorize": "En cliquant sur <b>Accepter</b>, vous autorisez",
        "By clicking the button above, you agree to": "En cliquant sur le bouton ci-dessus, vous acceptez",
        "Cancel": "Annuler",
        "Card": "La carte",
        "Cart is empty": "Le panier est vide",
        "Cheque": "Chèque",
        "City": "La ville",
        "Click to refresh shipping price": "Cliquez pour actualiser le prix d'expédition",
        "Close": "proche",
        "Continue": "Continuer",
        "Country": "Les Pays",
        "County": "Comté",
        "Coupon code": "Code promo",
        "Currency": "Devise",
        "Customize": "Personnaliser",
        "Delivery date": "La date de livraison",
        "Done": "Fait",
        "Edit": "Modifier",
        "Email": "E-mail",
        "Email or Username": "E-mail ou nom d'utilisateur",
        "Exit checkout": "Quitter la caisse",
        "First name": "Prénom",
        "First renewal": "Premier renouvellement",
        "Gift card number": "Numéro de la carte-cadeau",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay sélectionné pour le paiement.",
        "I verify that the country I have entered is the one I reside in": "Je vérifie que le pays que j'ai entré est celui dans lequel je réside",
        "Initial Shipment": "Expédition initiale",
        "Last name": "Nom de famille",
        "Login": "Connexion",
        "My cart": "Mon panier",
        "Name": "Nom",
        "No thanks": "Non merci",
        "Note: Payments may take up to 5 days to complete.": "Remarque : Les paiements peuvent prendre jusqu'à 5 jours pour être effectués.",
        "Order notes": "Notes d'ordre",
        "Order summary": "Récapitulatif de la commande",
        "P24 Bank": "Banque P24",
        "PAYMENT": "PAIEMENT",
        "Password": "Mot de passe",
        "Pay": "Payer",
        "Pay with a cheque": "Payer par chèque",
        "Payment": "Paiement",
        "Payment method": "Mode de paiement",
        "Payment via Wire/Bank Transfer": "Paiement par fil/virement bancaire",
        "Personal": "Personnel",
        "Phone number": "Numéro de téléphone",
        "Place order": "Passer la commande",
        "Please go back and try again. Missing required field": "Réessayer. Champ obligatoire manquant",
        "Postal code": "Code Postal",
        "Powered by": "Alimenté par",
        "Privacy Policy": "Politique de confidentialité",
        "Processing": "Traitement",
        "Province": "Province",
        "Purchase order": "Bon de commande",
        "Recommended for you": "Recommandé pour vous",
        "Recurring total": "Coût récurrent",
        "Register": "S'inscrire",
        "Remove": "Effacer",
        "Return": "Revenir",
        "Review your information": "Vérifiez vos informations",
        "SHIPPING": "EXPÉDITION",
        "Save changes": "Sauvegarder les modifications",
        "Select a country": "Choisissez un pays",
        "Select a province": "Sélectionnez une province",
        "Select a state": "Sélectionner un état",
        "Ship to": "Envoyez à",
        "Shipping": "Expédition",
        "Shipping method": "Mode de livraison",
        "Sorry, something went wrong. Please refresh the page and try again.": "Désolé, quelque chose s'est mal passé. Veuillez actualiser la page et réessayer.",
        "Sorry, this store does not ship to your location.": "Désolé, ce magasin ne livre pas à votre emplacement.",
        "State": "L’état",
        "Street address": "Adresse de la rue",
        "Subtotal": "Sous-total",
        "Tax": "L’impôt",
        "Terms of Service": "Conditions d'utilisation",
        "Test mode: customers cannot see PeachPay": "Mode test : les clients ne peuvent pas voir PeachPay",
        "The customer canceled choosing a bank account.": "Le client a annulé le choix d'un compte bancaire.",
        "The merchant has not enabled any payment methods": "Le marchand n'a activé aucun mode de paiement",
        "The required mandate was not accepted. Payment canceled.": "Le mandat requis n'a pas été accepté. Paiement annulé.",
        "There are no eligible or active payment methods available for this order.": "Aucun mode de paiement éligible ou actif n'est disponible pour cette commande.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Ce mode de paiement ne prend pas en charge la devise sélectionnée, en cliquant sur ce message, la devise passera à",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Ce mode de paiement ne prend pas en charge la devise sélectionnée. En sélectionnant ceci, la devise passera à",
        "This payment method does not support the selected currency. Please switch currencies.": "Ce mode de paiement ne prend pas en charge la devise sélectionnée. Veuillez changer de devise.",
        "Total": "Coûte",
        "US bank account": "compte bancaire américain",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Impossible de vérifier ce compte bancaire. Veuillez utiliser un autre compte bancaire ou choisir un nouveau mode de paiement.",
        "Unknown order error occurred": "Une erreur de commande inconnue s'est produite",
        "Use different shipping address": "Utiliser une adresse de livraison différente",
        "VIEW SAVED CARDS": "VOIR LES CARTES SAUVEGARDÉES",
        "Verified": "Vérifié",
        "View options": "Options d'affichage",
        "Wire/Bank Transfer": "Virement bancaire/virement bancaire",
        "You entered an invalid coupon code": "Vous avez saisi un code de coupon invalide",
        "You entered an invalid gift card": "Vous avez entré une carte-cadeau invalide",
        "additional": "Additionnel",
        "and": "et",
        "apply": "appliquer",
        "coupon": "coupon",
        "eps Bank": "Banque EPS",
        "iDEAL Bank": "Banque idéale",
        "privacy policy": "La politique de confidentialité",
        "pursuant to": "conformément à",
        "services and/or purchase of products from ": "services et/ou achat de produits auprès de",
        "terms": "Les termes",
        "terms and conditions": "Les termes et conditions",
        "the": "la",
        "the store's": "les magasins",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "de débiter le compte bancaire spécifié ci-dessus de tout montant dû pour les frais découlant de votre utilisation de",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "le site Web et les conditions, jusqu'à ce que cette autorisation soit révoquée. Vous pouvez modifier ou annuler cette autorisation à tout moment en avisant",
        "with 30 (thirty) days notice.": "avec un préavis de 30 (trente) jours."
    },
    "hi-IN": {
        "+ ADD A COUPON CODE": "+ एक कूपन कोड जोड़ें",
        "+ COUPON": "+ कूपन",
        "+ NEW CARD": "+ नया कार्ड",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ रिडीम गिफ्ट कार्ड/स्टोर क्रेडिट",
        "ADD": "जोड़ें",
        "Accept": "स्वीकार करना",
        "Account": "खाता",
        "Account login": "खाता प्रवेश",
        "Account name": "खाता नाम",
        "Account registration": "खाता पंजीकरण",
        "Add": "जोड़ें",
        "Additional information": "अतिरिक्त जानकारी",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "<b>भुगतान करें</b> का चयन करने के बाद एक बैंक खाते का चयन करने के लिए एक संकेत दिखाई देगा।",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "<b>भुगतान करें</b> का चयन करने के बाद आपको अपना भुगतान पूरा करने के लिए पुनर्निर्देशित किया जाएगा।",
        "After selecting pay you will be redirected to complete your payment.": "वेतन का चयन करने के बाद आपको अपना भुगतान पूरा करने के लिए पुनर्निर्देशित किया जाएगा।",
        "After selecting pay, a window will appear where you can complete your payment.": "भुगतान का चयन करने के बाद, एक विंडो दिखाई देगी जहां आप अपना भुगतान पूरा कर सकते हैं।",
        "An unknown error occurred. Please refresh the page and try again.": "एक अज्ञात ग़लती हुई। पृष्ठ को रीफ्रेश करें और पुन: प्रयास करें।",
        "Another step will appear after submitting your order to complete your purchase details.": "अपना खरीद विवरण पूरा करने के लिए अपना ऑर्डर सबमिट करने के बाद एक और चरण दिखाई देगा।",
        "Apartment": "अपार्टमेंट",
        "Apple Pay": "मोटी वेतन",
        "Apple Pay selected for checkout.": "ऐप्पल पे चेकआउट के लिए चुना गया।",
        "BILLING": "बिलिंग",
        "Back": "पीछे",
        "Bill to": "बिल प्राप्तकर्ता",
        "Billing": "बिलिंग",
        "Billing method": "बिलिंग विधि",
        "By clicking <b>Accept</b>, you authorize": "<b>स्वीकार करें</b> क्लिक करके, आप अधिकृत करते हैं",
        "By clicking the button above, you agree to": "ऊपर दिए गए बटन पर क्लिक करके, आप सहमत हैं",
        "Cancel": "रद्द करना",
        "Card": "कार्ड",
        "Cart is empty": "कार्ट खाली है",
        "Cheque": "जांच",
        "City": "शहर",
        "Click to refresh shipping price": "शिपिंग मूल्य ताज़ा करने के लिए क्लिक करें",
        "Close": "बंद करना",
        "Continue": "जारी रखें",
        "Country": "देश",
        "County": "काउंटी",
        "Coupon code": "कूपन कोड",
        "Currency": "मुद्रा",
        "Customize": "अनुकूलित करें",
        "Delivery date": "डिलीवरी की तारीख",
        "Done": "पूर्ण",
        "Edit": "संपादन करना",
        "Email": "ईमेल",
        "Email or Username": "ईमेल या उपयोगकर्ता का नाम",
        "Exit checkout": "चेकआउट से बाहर निकलें",
        "First name": "संतोष",
        "First renewal": "पहला नवीनीकरण",
        "Gift card number": "गिफ्ट कार्ड नंबर",
        "Google Pay": "गूगल पे",
        "Google Pay selected for checkout.": "चेकआउट के लिए Google Pay चुना गया.",
        "I verify that the country I have entered is the one I reside in": "मैं सत्यापित करता/करती हूं कि जिस देश में मैंने प्रवेश किया है वह वही देश है जिसमें मैं रहता हूं",
        "Initial Shipment": "प्रारंभिक शिपमेंट",
        "Last name": "उपनाम",
        "Login": "लॉग इन करें",
        "My cart": "मेरी गाड़ी",
        "Name": "नाम",
        "No thanks": "जी नहीं, धन्यवाद",
        "Note: Payments may take up to 5 days to complete.": "नोट: भुगतान पूरा होने में 5 दिन तक लग सकते हैं।",
        "Order notes": "ऑर्डर नोट",
        "Order summary": "आदेश सारांश",
        "P24 Bank": "P24 बैंक",
        "PAYMENT": "भुगतान",
        "Password": "पासवर्ड",
        "Pay": "भुगतान करना",
        "Pay with a cheque": "चेक से भुगतान करें",
        "Payment": "भुगतान",
        "Payment method": "भुगतान का तरीका",
        "Payment via Wire/Bank Transfer": "वायर/बैंक हस्तांतरण के माध्यम से भुगतान",
        "Personal": "निजी",
        "Phone number": "फ़ोन नंबर",
        "Place order": "आदेश देना",
        "Please go back and try again. Missing required field": "कृपया पीछे जाएं और दोबारा कोशिश करें। आवश्यक क्षेत्र उपलभ्ध नही है",
        "Postal code": "डाक कोड",
        "Powered by": "द्वारा संचालित",
        "Privacy Policy": "गोपनीयता नीति",
        "Processing": "प्रसंस्करण",
        "Province": "प्रांत",
        "Purchase order": "खरीद आदेश",
        "Recommended for you": "आप के लिए अनुशंसित",
        "Recurring total": "आवर्ती कुल",
        "Register": "पंजीकरण करवाना",
        "Remove": "हटाना",
        "Return": "वापस करना",
        "Review your information": "आपके सूचना की समीक्षा करें",
        "SHIPPING": "शिपिंग",
        "Save changes": "परिवर्तनों को सुरक्षित करें",
        "Select a country": "एक देश चुनें",
        "Select a province": "एक प्रांत का चयन करें",
        "Select a state": "एक राज्य का चयन करें",
        "Ship to": "यहां भेजें",
        "Shipping": "शिपिंग",
        "Shipping method": "शिपिंग का तरीका",
        "Sorry, something went wrong. Please refresh the page and try again.": "क्षमा करें, कुछ गलत हो गया। पृष्ठ को रीफ्रेश करें और पुन: प्रयास करें।",
        "Sorry, this store does not ship to your location.": "क्षमा करें, यह स्टोर आपके स्थान पर शिप नहीं करता है।",
        "State": "राज्य",
        "Street address": "गली का पता",
        "Subtotal": "उप-योग",
        "Tax": "कर",
        "Terms of Service": "सेवा की शर्तें",
        "Test mode: customers cannot see PeachPay": "परीक्षण मोड: ग्राहक पीचपे नहीं देख सकते हैं",
        "The customer canceled choosing a bank account.": "ग्राहक ने बैंक खाता चुनना रद्द कर दिया।",
        "The merchant has not enabled any payment methods": "व्यापारी ने कोई भुगतान विधि सक्षम नहीं की है",
        "The required mandate was not accepted. Payment canceled.": "आवश्यक जनादेश स्वीकार नहीं किया गया था। भुगतान रद्द कर दिया गया।",
        "There are no eligible or active payment methods available for this order.": "इस आदेश के लिए कोई योग्य या सक्रिय भुगतान विधियां उपलब्ध नहीं हैं।",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है, इस संदेश पर क्लिक करने पर मुद्रा स्विच हो जाएगी",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है। इसे चुनने पर, मुद्रा स्विच हो जाएगी",
        "This payment method does not support the selected currency. Please switch currencies.": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है। कृपया मुद्राएं बदलें।",
        "Total": "कुल",
        "US bank account": "यूएस बैंक खाता",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "इस बैंक खाते को सत्यापित करने में असमर्थ. कृपया किसी भिन्न बैंक खाते का उपयोग करें या कोई नई भुगतान विधि चुनें।",
        "Unknown order error occurred": "अज्ञात आदेश त्रुटि हुई",
        "Use different shipping address": "अलग शिपिंग पते का उपयोग करें",
        "VIEW SAVED CARDS": "सहेजे गए कार्ड देखें",
        "Verified": "सत्यापित",
        "View options": "विकल्प देखें",
        "Wire/Bank Transfer": "वायर/बैंक स्थानांतरण",
        "You entered an invalid coupon code": "आपने एक अमान्य कूपन कोड दर्ज किया है",
        "You entered an invalid gift card": "आपने एक अमान्य उपहार कार्ड दर्ज किया है",
        "additional": "अतिरिक्त",
        "and": "और",
        "apply": "लागू",
        "coupon": "कूपन",
        "eps Bank": "ईपीएस बैंक",
        "iDEAL Bank": "आइडियल बैंक",
        "privacy policy": "गोपनीयता नीति",
        "pursuant to": "के अनुसार",
        "services and/or purchase of products from ": "सेवाओं और/या से उत्पादों की खरीद",
        "terms": "शर्तें",
        "terms and conditions": "नियम और शर्तें",
        "the": "",
        "the store's": "दुकानें",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "के आपके उपयोग से उत्पन्न होने वाले शुल्कों के लिए किसी भी राशि के लिए ऊपर निर्दिष्ट बैंक खाते से डेबिट करने के लिए",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "वेबसाइट और शर्तें, जब तक कि यह प्राधिकरण निरस्त नहीं हो जाता। आप किसी भी समय नोटिस देकर इस प्राधिकरण को संशोधित या रद्द कर सकते हैं",
        "with 30 (thirty) days notice.": "30 (तीस) दिनों के नोटिस के साथ।"
    },
    "it": {
        "+ ADD A COUPON CODE": "+ AGGIUNGI UN CODICE COUPON",
        "+ COUPON": "+ BUONO",
        "+ NEW CARD": "+ NUOVA CARTA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ UTILIZZA CARTA REGALO/CREDITO NEGOZIO",
        "ADD": "INSERISCI",
        "Accept": "Accettare",
        "Account": "Account",
        "Account login": "Account login",
        "Account name": "Nome utente",
        "Account registration": "Registrazione dell'account",
        "Add": "Aggiungere",
        "Additional information": "Informazioni aggiuntive",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Dopo aver selezionato <b>Paga</b> apparirà una richiesta per selezionare un conto bancario.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Dopo aver selezionato <b>Paga</b> verrai reindirizzato per completare il pagamento.",
        "After selecting pay you will be redirected to complete your payment.": "Dopo aver selezionato paga verrai reindirizzato per completare il pagamento.",
        "After selecting pay, a window will appear where you can complete your payment.": "Dopo aver selezionato paga, apparirà una finestra in cui puoi completare il pagamento.",
        "An unknown error occurred. Please refresh the page and try again.": "Si è verificato un errore sconosciuto. Perfavore ricarica la pagina e riprova.",
        "Another step will appear after submitting your order to complete your purchase details.": "Dopo aver inviato l'ordine verrà visualizzato un altro passaggio per completare i dettagli dell'acquisto.",
        "Apartment": "Appartamento",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay selezionato per il pagamento.",
        "BILLING": "FATTURAZIONE",
        "Back": "Di ritorno",
        "Bill to": "Fatturare a",
        "Billing": "Fatturazione",
        "Billing method": "Metodo di fatturazione",
        "By clicking <b>Accept</b>, you authorize": "Facendo clic su <b>Accetta</b>, autorizzi",
        "By clicking the button above, you agree to": "Facendo clic sul pulsante in alto, accetti",
        "Cancel": "Annulla",
        "Card": "Carta",
        "Cart is empty": "Il carrello è vuoto",
        "Cheque": "Dai un'occhiata",
        "City": "Città",
        "Click to refresh shipping price": "Fare clic per aggiornare il prezzo di spedizione",
        "Close": "Chiudere",
        "Continue": "Continua",
        "Country": "Paese",
        "County": "contea",
        "Coupon code": "Codice coupon",
        "Currency": "Moneta",
        "Customize": "personalizzare",
        "Delivery date": "Data di consegna",
        "Done": "Fatto",
        "Edit": "Modificare",
        "Email": "E-mail",
        "Email or Username": "Email o nome utente",
        "Exit checkout": "Esci dalla cassa",
        "First name": "nome di battesimo",
        "First renewal": "Primo rinnovo",
        "Gift card number": "Numero della carta regalo",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay selezionato per il pagamento.",
        "I verify that the country I have entered is the one I reside in": "Verifico che il paese in cui ho inserito è quello in cui risiedo",
        "Initial Shipment": "Spedizione iniziale",
        "Last name": "Cognome",
        "Login": "Login",
        "My cart": "La mia carta",
        "Name": "Nome",
        "No thanks": "No grazie",
        "Note: Payments may take up to 5 days to complete.": "Nota: il completamento dei pagamenti può richiedere fino a 5 giorni.",
        "Order notes": "Note sull'ordine",
        "Order summary": "Riepilogo ordine",
        "P24 Bank": "P24 Banca",
        "PAYMENT": "PAGAMENTO",
        "Password": "Parola d'ordine",
        "Pay": "Paga",
        "Pay with a cheque": "Paga con un assegno",
        "Payment": "Pagamento",
        "Payment method": "Metodo di pagamento",
        "Payment via Wire/Bank Transfer": "Pagamento tramite Bonifico/Bonifico Bancario",
        "Personal": "Personale",
        "Phone number": "Numero di telefono",
        "Place order": "Invia ordine",
        "Please go back and try again. Missing required field": "Torna indietro e riprova. campo richiesto mancante",
        "Postal code": "Codice postale",
        "Powered by": "Offerto da",
        "Privacy Policy": "politica sulla riservatezza",
        "Processing": "in lavorazione",
        "Province": "Provincia",
        "Purchase order": "Ordinazione d'acquisto",
        "Recommended for you": "raccomandato per te",
        "Recurring total": "Totale ricorrente",
        "Register": "Registrati",
        "Remove": "Rimuovere",
        "Return": "Ritorno",
        "Review your information": "rivedi le tue informazioni",
        "SHIPPING": "SPEDIZIONE",
        "Save changes": "Salvare le modifiche",
        "Select a country": "Seleziona un Paese",
        "Select a province": "Seleziona una provincia",
        "Select a state": "Seleziona uno stato",
        "Ship to": "Spedire a",
        "Shipping": "Spedizione",
        "Shipping method": "Metodo di spedizione",
        "Sorry, something went wrong. Please refresh the page and try again.": "Scusa, qualcosa è andato storto. Perfavore ricarica la pagina e riprova.",
        "Sorry, this store does not ship to your location.": "Siamo spiacenti, questo negozio non effettua spedizioni nella tua posizione.",
        "State": "Stato",
        "Street address": "indirizzo",
        "Subtotal": "totale parziale",
        "Tax": "Imposta",
        "Terms of Service": "Termini di servizio",
        "Test mode: customers cannot see PeachPay": "Modalità test: i clienti non possono vedere PeachPay",
        "The customer canceled choosing a bank account.": "Il cliente ha annullato la scelta di un conto bancario.",
        "The merchant has not enabled any payment methods": "Il commerciante non ha abilitato alcun metodo di pagamento",
        "The required mandate was not accepted. Payment canceled.": "Il mandato richiesto non è stato accettato. Pagamento annullato.",
        "There are no eligible or active payment methods available for this order.": "Non sono disponibili metodi di pagamento idonei o attivi per questo ordine.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Questo metodo di pagamento non supporta la valuta selezionata, facendo clic su questo messaggio la valuta passerà",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Questo metodo di pagamento non supporta la valuta selezionata. Selezionando questo, la valuta passerà a",
        "This payment method does not support the selected currency. Please switch currencies.": "Questo metodo di pagamento non supporta la valuta selezionata. Si prega di cambiare valuta.",
        "Total": "Totale",
        "US bank account": "Conto bancario statunitense",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Impossibile verificare questo conto bancario. Utilizza un conto bancario diverso o scegli un nuovo metodo di pagamento.",
        "Unknown order error occurred": "Si è verificato un errore di ordine sconosciuto",
        "Use different shipping address": "Usa un indirizzo di spedizione diverso",
        "VIEW SAVED CARDS": "VISUALIZZA LE CARTE SALVATE",
        "Verified": "Verificato",
        "View options": "Visualizza opzioni",
        "Wire/Bank Transfer": "Bonifico/Bonifico Bancario",
        "You entered an invalid coupon code": "Hai inserito un codice coupon non valido",
        "You entered an invalid gift card": "Hai inserito una carta regalo non valida",
        "additional": "aggiuntivo",
        "and": "e",
        "apply": "applicare",
        "coupon": "buono",
        "eps Bank": "eps banca",
        "iDEAL Bank": "Banca ideale",
        "privacy policy": "politica sulla riservatezza",
        "pursuant to": "ai sensi di",
        "services and/or purchase of products from ": "servizi e/o acquisto di prodotti da",
        "terms": "termini",
        "terms and conditions": "Termini e Condizioni",
        "the": "il",
        "the store's": "i negozi",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "addebitare sul conto bancario sopra specificato l'importo dovuto per gli oneri derivanti dal tuo utilizzo",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "sito web e termini, fino alla revoca di tale autorizzazione. È possibile modificare o annullare questa autorizzazione in qualsiasi momento dandone avviso a",
        "with 30 (thirty) days notice.": "con preavviso di 30 (trenta) giorni."
    },
    "ja": {
        "+ ADD A COUPON CODE": "+クーポンコードを追加する",
        "+ COUPON": "+ クーポン",
        "+ NEW CARD": "+新しいカード",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ギフトカード/ストアクレジットを利用する",
        "ADD": "追加",
        "Accept": "承認",
        "Account": "アカウント",
        "Account login": "アカウントログイン",
        "Account name": "アカウント名",
        "Account registration": "アカウントの登録",
        "Add": "追加",
        "Additional information": "追加情報",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "<b>Pay</b> を選択すると、銀行口座を選択するプロンプトが表示されます。",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "<b>Pay</b> を選択すると、支払いを完了するためにリダイレクトされます。",
        "After selecting pay you will be redirected to complete your payment.": "支払いを選択すると、支払いを完了するためにリダイレクトされます。",
        "After selecting pay, a window will appear where you can complete your payment.": "支払いを選択すると、支払いを完了するためのウィンドウが表示されます。",
        "An unknown error occurred. Please refresh the page and try again.": "不明なエラーが発生しました。ページを更新して、もう一度お試しください。",
        "Another step will appear after submitting your order to complete your purchase details.": "注文を送信した後、購入の詳細を完了するための別のステップが表示されます。",
        "Apartment": "アパート",
        "Apple Pay": "アップルペイ",
        "Apple Pay selected for checkout.": "チェックアウトに Apple Pay が選択されました。",
        "BILLING": "請求する",
        "Back": "戻る",
        "Bill to": "請求書送付先",
        "Billing": "請求する",
        "Billing method": "請求方法",
        "By clicking <b>Accept</b>, you authorize": "<b>同意</b>をクリックすると、承認されます",
        "By clicking the button above, you agree to": "上のボタンをクリックすると、同意したことになります",
        "Cancel": "キャンセル",
        "Card": "カード",
        "Cart is empty": "カートは空です",
        "Cheque": "小切手",
        "City": "街",
        "Click to refresh shipping price": "クリックして送料を更新",
        "Close": "近い",
        "Continue": "継続する",
        "Country": "国",
        "County": "郡",
        "Coupon code": "クーポンコード",
        "Currency": "通貨",
        "Customize": "カスタマイズ",
        "Delivery date": "配送日",
        "Done": "終わり",
        "Edit": "編集",
        "Email": "Eメール",
        "Email or Username": "メールアドレスまたはユーザ名",
        "Exit checkout": "チェックアウトを終了",
        "First name": "ファーストネーム",
        "First renewal": "最初の更新",
        "Gift card number": "ギフトカード番号",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "チェックアウトに Google Pay が選択されました。",
        "I verify that the country I have entered is the one I reside in": "私が入国した国が私が居住している国であることを確認します",
        "Initial Shipment": "最初の出荷",
        "Last name": "苗字",
        "Login": "ログイン",
        "My cart": "私のカート",
        "Name": "名前",
        "No thanks": "結構です",
        "Note: Payments may take up to 5 days to complete.": "注: 支払いが完了するまでに最大 5 日かかる場合があります。",
        "Order notes": "注文メモ",
        "Order summary": "注文の概要",
        "P24 Bank": "P24銀行",
        "PAYMENT": "支払い",
        "Password": "パスワード",
        "Pay": "支払い",
        "Pay with a cheque": "小切手で支払う",
        "Payment": "支払い",
        "Payment method": "支払方法",
        "Payment via Wire/Bank Transfer": "電信送金/銀行振込によるお支払い",
        "Personal": "個人的",
        "Phone number": "電話番号",
        "Place order": "注文する",
        "Please go back and try again. Missing required field": "戻ってもう一度やり直してください。必須フィールドがありません",
        "Postal code": "郵便番号",
        "Powered by": "搭載",
        "Privacy Policy": "プライバシーポリシー",
        "Processing": "処理",
        "Province": "州",
        "Purchase order": "注文書",
        "Recommended for you": "あなたへのおすすめ",
        "Recurring total": "経常合計",
        "Register": "登録",
        "Remove": "削除する",
        "Return": "戻る",
        "Review your information": "情報を確認する",
        "SHIPPING": "運送",
        "Save changes": "変更内容を保存",
        "Select a country": "国を選択",
        "Select a province": "都道府県を選択",
        "Select a state": "州を選択",
        "Ship to": "送り先",
        "Shipping": "運送",
        "Shipping method": "配送方法",
        "Sorry, something went wrong. Please refresh the page and try again.": "申し訳ありませんが、問題が発生しました。ページを更新して、もう一度お試しください。",
        "Sorry, this store does not ship to your location.": "申し訳ありませんが、このストアはお住まいの地域に発送されません。",
        "State": "州",
        "Street address": "住所",
        "Subtotal": "小計",
        "Tax": "税",
        "Terms of Service": "利用規約",
        "Test mode: customers cannot see PeachPay": "テストモード：顧客はPeachPayを見ることができません",
        "The customer canceled choosing a bank account.": "お客様が銀行口座の選択をキャンセルしました。",
        "The merchant has not enabled any payment methods": "マーチャントは支払い方法を有効にしていません",
        "The required mandate was not accepted. Payment canceled.": "必要な委任は受け入れられませんでした。支払いがキャンセルされました。",
        "There are no eligible or active payment methods available for this order.": "この注文に利用できる適格または有効な支払い方法はありません。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "この支払い方法は選択した通貨をサポートしていません。このメッセージをクリックすると、通貨がに切り替わります",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "この支払い方法は、選択した通貨をサポートしていません。これを選択すると、通貨はに切り替わります",
        "This payment method does not support the selected currency. Please switch currencies.": "この支払い方法は、選択した通貨をサポートしていません。通貨を切り替えてください。",
        "Total": "合計",
        "US bank account": "米国の銀行口座",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "この銀行口座を確認できません。別の銀行口座を使用するか、新しい支払い方法を選択してください。",
        "Unknown order error occurred": "不明な注文エラーが発生しました",
        "Use different shipping address": "別の配送先住所を使用する",
        "VIEW SAVED CARDS": "保存されたカードを表示する",
        "Verified": "確認済み",
        "View options": "オプションを表示",
        "Wire/Bank Transfer": "電信送金/銀行振込",
        "You entered an invalid coupon code": "無効なクーポンコードを入力しました",
        "You entered an invalid gift card": "無効なギフトカードを入力しました",
        "additional": "追加",
        "and": "と",
        "apply": "申し込み",
        "coupon": "クーポン",
        "eps Bank": "eps銀行",
        "iDEAL Bank": "理想の銀行",
        "privacy policy": "プライバシーポリシー",
        "pursuant to": "に従って",
        "services and/or purchase of products from ": "からのサービスおよび/または製品の購入",
        "terms": "条項",
        "terms and conditions": "規約と条件",
        "the": "the",
        "the store's": "店舗",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "上記の銀行口座から、お客様による",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "この許可が取り消されるまで、ウェブサイトと条件。に通知することにより、いつでもこの承認を修正または取り消すことができます。",
        "with 30 (thirty) days notice.": "30 日前に通知します。"
    },
    "ko-KR": {
        "+ ADD A COUPON CODE": "+ 쿠폰 코드 추가",
        "+ COUPON": "+ 쿠폰",
        "+ NEW CARD": "+ 새 카드",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 기프트 카드/매장 크레딧 사용",
        "ADD": "추가하다",
        "Accept": "수용하다",
        "Account": "계정",
        "Account login": "계정 로그인",
        "Account name": "계정 이름",
        "Account registration": "계정 등록",
        "Add": "추가하다",
        "Additional information": "추가 정보",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "<b>지불</b>을 선택하면 은행 계좌를 선택하라는 메시지가 나타납니다.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "<b>지불</b>을 선택하면 지불을 완료하도록 리디렉션됩니다.",
        "After selecting pay you will be redirected to complete your payment.": "지불을 선택하면 지불을 완료하기 위해 리디렉션됩니다.",
        "After selecting pay, a window will appear where you can complete your payment.": "결제를 선택하면 결제를 완료할 수 있는 창이 나타납니다.",
        "An unknown error occurred. Please refresh the page and try again.": "알 수없는 오류가 발생했습니다. 페이지를 새로고침하고 다시 시도하십시오.",
        "Another step will appear after submitting your order to complete your purchase details.": "주문을 제출하면 구매 세부 정보를 완료하는 또 다른 단계가 나타납니다.",
        "Apartment": "아파트",
        "Apple Pay": "애플 페이",
        "Apple Pay selected for checkout.": "결제를 위해 Apple Pay가 선택되었습니다.",
        "BILLING": "청구",
        "Back": "뒤",
        "Bill to": "청구 대상",
        "Billing": "청구",
        "Billing method": "청구 방법",
        "By clicking <b>Accept</b>, you authorize": "<b>수락</b>을 클릭하면",
        "By clicking the button above, you agree to": "위 버튼을 클릭하면 동의하는 것으로 간주됩니다.",
        "Cancel": "취소",
        "Card": "카드",
        "Cart is empty": "장바구니가 비어 있습니다.",
        "Cheque": "확인하다",
        "City": "도시",
        "Click to refresh shipping price": "배송비 새로고침 클릭",
        "Close": "닫다",
        "Continue": "계속하다",
        "Country": "국가",
        "County": "군",
        "Coupon code": "쿠폰 코드",
        "Currency": "통화",
        "Customize": "사용자 정의",
        "Delivery date": "배송 날짜",
        "Done": "완료",
        "Edit": "편집하다",
        "Email": "이메일",
        "Email or Username": "이메일 또는 사용자 이름",
        "Exit checkout": "결제 종료",
        "First name": "이름",
        "First renewal": "첫 번째 갱신",
        "Gift card number": "기프트 카드 번호",
        "Google Pay": "구글 페이",
        "Google Pay selected for checkout.": "결제를 위해 Google Pay가 선택되었습니다.",
        "I verify that the country I have entered is the one I reside in": "내가 입력한 국가가 내가 거주하는 국가인지 확인합니다.",
        "Initial Shipment": "초기 선적",
        "Last name": "성",
        "Login": "로그인",
        "My cart": "내 카트",
        "Name": "이름",
        "No thanks": "고맙지 만 사양 할게",
        "Note: Payments may take up to 5 days to complete.": "참고: 결제가 완료되는 데 최대 5일이 소요될 수 있습니다.",
        "Order notes": "주문 메모",
        "Order summary": "주문 요약",
        "P24 Bank": "P24 은행",
        "PAYMENT": "지불",
        "Password": "비밀번호",
        "Pay": "지불",
        "Pay with a cheque": "수표로 지불",
        "Payment": "지불",
        "Payment method": "지불 방법",
        "Payment via Wire/Bank Transfer": "전신환/은행 송금을 통한 지불",
        "Personal": "개인적인",
        "Phone number": "전화 번호",
        "Place order": "주문하기",
        "Please go back and try again. Missing required field": "돌아가서 다시 시도하십시오. 필수 항목 누락",
        "Postal code": "우편 번호",
        "Powered by": "에 의해 구동",
        "Privacy Policy": "개인 정보 정책",
        "Processing": "처리",
        "Province": "주",
        "Purchase order": "구매 주문",
        "Recommended for you": "당신을 위해 추천 된",
        "Recurring total": "반복 합계",
        "Register": "등록하다",
        "Remove": "제거하다",
        "Return": "반품",
        "Review your information": "정보 검토",
        "SHIPPING": "배송",
        "Save changes": "변경 사항을 저장하다",
        "Select a country": "국가를 고르시 오",
        "Select a province": "지방을 선택하십시오",
        "Select a state": "상태 선택",
        "Ship to": "배송지",
        "Shipping": "배송",
        "Shipping method": "배송 방법",
        "Sorry, something went wrong. Please refresh the page and try again.": "죄송합니다. 문제가 발생했습니다. 페이지를 새로고침하고 다시 시도하십시오.",
        "Sorry, this store does not ship to your location.": "죄송합니다. 이 상점은 귀하의 위치로 배송되지 않습니다.",
        "State": "상태",
        "Street address": "주소",
        "Subtotal": "소계",
        "Tax": "세",
        "Terms of Service": "서비스 약관",
        "Test mode: customers cannot see PeachPay": "테스트 모드: 고객이 PeachPay를 볼 수 없습니다.",
        "The customer canceled choosing a bank account.": "고객이 은행 계좌 선택을 취소했습니다.",
        "The merchant has not enabled any payment methods": "판매자가 결제 수단을 활성화하지 않았습니다.",
        "The required mandate was not accepted. Payment canceled.": "필요한 위임이 수락되지 않았습니다. 결제가 취소되었습니다.",
        "There are no eligible or active payment methods available for this order.": "이 주문에 사용할 수 있는 적격 또는 활성 결제 방법이 없습니다.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "이 결제 방법은 선택한 통화를 지원하지 않습니다. 이 메시지를 클릭하면 통화가 다음으로 전환됩니다.",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "이 결제 수단은 선택한 통화를 지원하지 않습니다. 이것을 선택하면 통화가 다음으로 전환됩니다.",
        "This payment method does not support the selected currency. Please switch currencies.": "이 결제 수단은 선택한 통화를 지원하지 않습니다. 통화를 전환하십시오.",
        "Total": "총",
        "US bank account": "미국 은행 계좌",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "이 은행 계좌를 확인할 수 없습니다. 다른 은행 계좌를 사용하거나 새로운 결제 수단을 선택하세요.",
        "Unknown order error occurred": "알 수 없는 주문 오류가 발생했습니다",
        "Use different shipping address": "다른 배송 주소 사용",
        "VIEW SAVED CARDS": "저장된 카드 보기",
        "Verified": "확인됨",
        "View options": "보기 옵션",
        "Wire/Bank Transfer": "전신환/은행 송금",
        "You entered an invalid coupon code": "잘못된 쿠폰 코드를 입력했습니다.",
        "You entered an invalid gift card": "잘못된 기프트 카드를 입력했습니다.",
        "additional": "추가의",
        "and": "그리고",
        "apply": "적용하다",
        "coupon": "쿠폰",
        "eps Bank": "eps 은행",
        "iDEAL Bank": "아이딜 은행",
        "privacy policy": "개인 정보 정책",
        "pursuant to": "에 따라",
        "services and/or purchase of products from ": "서비스 및/또는 제품 구매",
        "terms": "자귀",
        "terms and conditions": "이용약관",
        "the": "그만큼",
        "the store's": "상점들",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "귀하의 사용으로 인해 발생하는 비용에 대해 위에 명시된 은행 계좌에서 인출",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "이 승인이 취소될 때까지 웹사이트 및 약관. 귀하는 에 통지하여 언제든지 이 승인을 수정하거나 취소할 수 있습니다.",
        "with 30 (thirty) days notice.": "30일(30일)의 통지와 함께."
    },
    "lb-LU": {
        "+ ADD A COUPON CODE": "+ ENG COUPON CODE bäizefügen",
        "+ COUPON": "+ COUPON",
        "+ NEW CARD": "+ NEW KAART",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ GIFT CARD / STORE CREDIT REDEEM",
        "ADD": "ADD",
        "Accept": "Akzeptéieren",
        "Account": "Kont",
        "Account login": "Kont Login",
        "Account name": "Benotzernumm",
        "Account registration": "Kont Aschreiwung",
        "Add": "Addéieren",
        "Additional information": "Zousätzlech Informatiounen",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Nodeems Dir <b>Pay</b> gewielt hutt, erschéngt eng Ufro fir e Bankkonto ze wielen.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Nodeems Dir <b>Pay</b> gewielt hutt, gitt Dir ëmgeleet fir Är Bezuelung ofzeschléissen.",
        "After selecting pay you will be redirected to complete your payment.": "Nodeems Dir Bezuelung gewielt hutt, gitt Dir ëmgeleet fir Är Bezuelung ofzeschléissen.",
        "After selecting pay, a window will appear where you can complete your payment.": "Nodeems Dir Pai auswielt, erschéngt eng Fënster wou Dir Är Bezuelung fäerdeg bréngt.",
        "An unknown error occurred. Please refresh the page and try again.": "En onbekannte Feeler ass geschitt. Erfrëscht w.e.g. d'Säit a probéiert nach eng Kéier.",
        "Another step will appear after submitting your order to complete your purchase details.": "En anere Schrëtt erschéngt nodeems Dir Är Bestellung ofginn hutt fir Är Kafdetailer ofzeschléissen.",
        "Apartment": "Appartement",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay ausgewielt fir d'Kasse.",
        "BILLING": "BILLING",
        "Back": "Zréck",
        "Bill to": "Bill zu",
        "Billing": "Rechnung",
        "Billing method": "Rechnung Method",
        "By clicking <b>Accept</b>, you authorize": "Andeems Dir op <b>Akzeptéieren</b> klickt, autoriséiert Dir",
        "By clicking the button above, you agree to": "Andeems Dir op de Knäppchen hei uewen klickt, sidd Dir averstanen",
        "Cancel": "Ofbriechen",
        "Card": "Kaart",
        "Cart is empty": "Weenchen ass eidel",
        "Cheque": "Check",
        "City": "Stad",
        "Click to refresh shipping price": "Klickt fir de Versandpräis z'erfrëschen",
        "Close": "Zoumaachen",
        "Continue": "Fuert weider",
        "Country": "Land",
        "County": "Grofschaft",
        "Coupon code": "Coupon Code",
        "Currency": "Währung",
        "Customize": "Personnaliséieren",
        "Delivery date": "Liwwerungsdatum",
        "Done": "Gemaach",
        "Edit": "Edit",
        "Email": "E-Mail",
        "Email or Username": "E-Mail oder Benotzernumm",
        "Exit checkout": "Ausgoen Kees",
        "First name": "Virnumm",
        "First renewal": "Éischt Erneierung",
        "Gift card number": "Cadeau Kaart Zuel",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay ausgewielt fir d'Kasse.",
        "I verify that the country I have entered is the one I reside in": "Ech verifizéieren datt d'Land wou ech aginn hunn ass dat an deem ech wunnen",
        "Initial Shipment": "Éischt Versand",
        "Last name": "Familljennumm",
        "Login": "Login",
        "My cart": "Mäi Weenchen",
        "Name": "Numm",
        "No thanks": "Nee Merci",
        "Note: Payments may take up to 5 days to complete.": "Notiz: Bezuelungen kënne bis zu 5 Deeg daueren bis se fäerdeg sinn.",
        "Order notes": "Uerdnung Notizen",
        "Order summary": "Bestellung Resumé",
        "P24 Bank": "P24 Bank",
        "PAYMENT": "BEZUELEN",
        "Password": "Passwuert",
        "Pay": "Bezuelen",
        "Pay with a cheque": "Bezuelen mat engem Scheck",
        "Payment": "Bezuelen",
        "Payment method": "Bezuelmethod",
        "Payment via Wire/Bank Transfer": "Bezuelung iwwer Wire / Bankiwwerweisung",
        "Personal": "Perséinlech",
        "Phone number": "Telefonsnummer",
        "Place order": "Bestellung maachen",
        "Please go back and try again. Missing required field": "Gitt w.e.g. zréck a probéiert nach eng Kéier. Vermësst néideg Feld",
        "Postal code": "Postleitzuel",
        "Powered by": "Bereetgestallt vun",
        "Privacy Policy": "Privatsphär Politik",
        "Processing": "Veraarbechtung",
        "Province": "Provënz",
        "Purchase order": "Akeef Uerdnung",
        "Recommended for you": "Recommandéiert fir Iech",
        "Recurring total": "Widderhuelend Ganzen",
        "Register": "Aschreiwen",
        "Remove": "Ewechzehuelen",
        "Return": "Retour",
        "Review your information": "Iwwerpréift Är Informatioun",
        "SHIPPING": "LIWWERUNG",
        "Save changes": "Ännerungen späicheren",
        "Select a country": "Wielt e Land",
        "Select a province": "Wielt eng Provënz",
        "Select a state": "Wielt e Staat",
        "Ship to": "Schiff an",
        "Shipping": "Liwwerung",
        "Shipping method": "Versandmethod",
        "Sorry, something went wrong. Please refresh the page and try again.": "Entschëllegt, eppes ass falsch gaang. Erfrëscht w.e.g. d'Säit a probéiert nach eng Kéier.",
        "Sorry, this store does not ship to your location.": "Entschëllegt, dëse Buttek schéckt net op Är Plaz.",
        "State": "Staat",
        "Street address": "Strooss Adress",
        "Subtotal": "Subtotal",
        "Tax": "Steier",
        "Terms of Service": "Konditioune vum Service",
        "Test mode: customers cannot see PeachPay": "Testmodus: Clienten kënnen PeachPay net gesinn",
        "The customer canceled choosing a bank account.": "De Client huet d'Auswiel vun engem Bankkonto annuléiert.",
        "The merchant has not enabled any payment methods": "Den Händler huet keng Bezuelmethoden aktivéiert",
        "The required mandate was not accepted. Payment canceled.": "Dat néidegt Mandat gouf net ugeholl. Bezuelung annuléiert.",
        "There are no eligible or active payment methods available for this order.": "Et gi keng berechtegt oder aktiv Bezuelmethoden verfügbar fir dës Bestellung.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung, wann Dir op dëse Message klickt, wiesselt d'Währung op",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung. Wann Dir dëst auswielt, wiesselt d'Währung op",
        "This payment method does not support the selected currency. Please switch currencies.": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung. Weg schalt Währungen.",
        "Total": "Ganzen",
        "US bank account": "US Bankkonto",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Kann dëse Bankkonto net verifizéieren. Benotzt w.e.g. en anere Bankkonto oder wielt eng nei Bezuelmethod.",
        "Unknown order error occurred": "Onbekannte Bestellungsfehler ass geschitt",
        "Use different shipping address": "Benotzt eng aner Versandadress",
        "VIEW SAVED CARDS": "VIEW GESPERT KAARTEN",
        "Verified": "Verifizéiert",
        "View options": "View Optiounen",
        "Wire/Bank Transfer": "Wire / Bank Transfert",
        "You entered an invalid coupon code": "Dir hutt en ongëlteg Coupon Code aginn",
        "You entered an invalid gift card": "Dir hutt eng ongëlteg Geschenkkaart aginn",
        "additional": "zousätzlech",
        "and": "an",
        "apply": "gëllen",
        "coupon": "Coupon",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "Privatsphär Politik",
        "pursuant to": "geméiss",
        "services and/or purchase of products from ": "Servicer an / oder Kaf vun Produite vun",
        "terms": "Begrëffer",
        "terms and conditions": "Konditioune",
        "the": "den",
        "the store's": "dem Buttek",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "de Bankkonto uewen spezifizéiert ze debitéieren fir all Betrag, dee schëlleg ass fir Käschten déi aus Ärem Gebrauch entstinn",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "Websäit a Konditioune, bis dës Autorisatioun zréckgezunn ass. Dir kënnt dës Autorisatioun zu all Moment änneren oder annuléieren andeems Dir eng Notifikatioun un",
        "with 30 (thirty) days notice.": "mat 30 (drësseg) Deeg Notiz."
    },
    "nl-NL": {
        "+ ADD A COUPON CODE": "+ EEN COUPONCODE TOEVOEGEN",
        "+ COUPON": "+ COUPON",
        "+ NEW CARD": "+ NIEUWE KAART",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ VERWISSEL CADEAUBON/STORE CREDIT",
        "ADD": "TOEVOEGEN",
        "Accept": "Aanvaarden",
        "Account": "Account",
        "Account login": "Account login",
        "Account name": "Accountnaam",
        "Account registration": "Accountregistratie",
        "Add": "Toevoegen",
        "Additional information": "Extra informatie",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Na het selecteren van <b>Betalen</b> verschijnt er een prompt om een bankrekening te selecteren.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Nadat u <b>Betalen</b> heeft geselecteerd, wordt u doorgestuurd om uw betaling te voltooien.",
        "After selecting pay you will be redirected to complete your payment.": "Na het selecteren van betalen wordt u doorgestuurd om uw betaling af te ronden.",
        "After selecting pay, a window will appear where you can complete your payment.": "Nadat u betalen heeft geselecteerd, verschijnt er een venster waarin u uw betaling kunt voltooien.",
        "An unknown error occurred. Please refresh the page and try again.": "Een onbekende fout is opgetreden. Ververs de pagina en probeer het opnieuw.",
        "Another step will appear after submitting your order to complete your purchase details.": "Na het verzenden van uw bestelling verschijnt er nog een stap om uw aankoopgegevens te voltooien.",
        "Apartment": "Appartement",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay geselecteerd om af te rekenen.",
        "BILLING": "FACTURATIE",
        "Back": "Rug",
        "Bill to": "Rekening naar",
        "Billing": "Facturering",
        "Billing method": "Factureringsmethode:",
        "By clicking <b>Accept</b>, you authorize": "Door op <b>Accepteren</b> te klikken, machtigt u",
        "By clicking the button above, you agree to": "Door op de bovenstaande knop te klikken, gaat u akkoord met:",
        "Cancel": "Annuleren",
        "Card": "Kaart",
        "Cart is empty": "Winkelwagen is leeg",
        "Cheque": "Controleren",
        "City": "Stad",
        "Click to refresh shipping price": "Klik om de verzendkosten te vernieuwen",
        "Close": "Dichtbij",
        "Continue": "Doorgaan",
        "Country": "Land",
        "County": "District",
        "Coupon code": "Coupon code",
        "Currency": "Munteenheid",
        "Customize": "Aanpassen",
        "Delivery date": "Bezorgdatum",
        "Done": "Gedaan",
        "Edit": "Bewerk",
        "Email": "E-mail",
        "Email or Username": "E-mail of gebruikersnaam",
        "Exit checkout": "Afrekenen afsluiten",
        "First name": "Voornaam",
        "First renewal": "Eerste verlenging",
        "Gift card number": "Cadeaukaartnummer",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay geselecteerd om af te rekenen.",
        "I verify that the country I have entered is the one I reside in": "Ik verifieer dat het land dat ik heb ingevoerd het land is waarin ik woon",
        "Initial Shipment": "Eerste zending:",
        "Last name": "Achternaam",
        "Login": "Log in",
        "My cart": "Mijn wagen",
        "Name": "Naam",
        "No thanks": "Nee, dank u wel",
        "Note: Payments may take up to 5 days to complete.": "Opmerking: het kan tot 5 dagen duren voordat betalingen zijn voltooid.",
        "Order notes": "Bestel notities",
        "Order summary": "Overzicht van de bestelling",
        "P24 Bank": "P24 Bank",
        "PAYMENT": "BETALING",
        "Password": "Wachtwoord",
        "Pay": "Betalen",
        "Pay with a cheque": "Betaal met een cheque",
        "Payment": "Betaling",
        "Payment method": "Betalingswijze",
        "Payment via Wire/Bank Transfer": "Betaling via overschrijving/bankoverschrijving",
        "Personal": "persoonlijk",
        "Phone number": "Telefoonnummer",
        "Place order": "Plaats bestelling",
        "Please go back and try again. Missing required field": "Ga terug en probeer het opnieuw. ontbrekende vereiste veld",
        "Postal code": "Postcode",
        "Powered by": "Aangedreven door",
        "Privacy Policy": "Privacybeleid",
        "Processing": "Verwerken",
        "Province": "Provincie",
        "Purchase order": "Bestelling",
        "Recommended for you": "aanbevolen voor jou",
        "Recurring total": "Terugkerend totaal",
        "Register": "Register",
        "Remove": "Verwijderen",
        "Return": "Opbrengst",
        "Review your information": "Herzie je informatie",
        "SHIPPING": "VERZENDEN",
        "Save changes": "Wijzigingen opslaan",
        "Select a country": "Selecteer een land",
        "Select a province": "Selecteer een provincie",
        "Select a state": "Selecteer een staat",
        "Ship to": "Verzend naar",
        "Shipping": "Verzending",
        "Shipping method": "Verzendmethode:",
        "Sorry, something went wrong. Please refresh the page and try again.": "Sorry, er ging iets mis. Ververs de pagina en probeer het opnieuw.",
        "Sorry, this store does not ship to your location.": "Sorry, deze winkel verzendt niet naar jouw locatie.",
        "State": "Staat",
        "Street address": "Adres",
        "Subtotal": "Subtotaal",
        "Tax": "Belasting",
        "Terms of Service": "Servicevoorwaarden",
        "Test mode: customers cannot see PeachPay": "Testmodus: klanten kunnen PeachPay niet zien",
        "The customer canceled choosing a bank account.": "De klant heeft het kiezen van een bankrekening geannuleerd.",
        "The merchant has not enabled any payment methods": "De handelaar heeft geen betaalmethoden ingeschakeld",
        "The required mandate was not accepted. Payment canceled.": "Het vereiste mandaat werd niet aanvaard. Betaling geannuleerd.",
        "There are no eligible or active payment methods available for this order.": "Er zijn geen geschikte of actieve betaalmethoden beschikbaar voor deze bestelling.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Deze betaalmethode ondersteunt de geselecteerde valuta niet, bij het klikken op dit bericht zal de valuta overschakelen naar",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Deze betaalmethode ondersteunt de geselecteerde valuta niet. Als u dit selecteert, schakelt de valuta over naar",
        "This payment method does not support the selected currency. Please switch currencies.": "Deze betaalmethode ondersteunt de geselecteerde valuta niet. Wissel alstublieft van valuta.",
        "Total": "Totaal",
        "US bank account": "Amerikaanse bankrekening",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Kan deze bankrekening niet verifiëren. Gebruik een andere bankrekening of kies een nieuwe betaalmethode.",
        "Unknown order error occurred": "Er is een onbekende bestellingsfout opgetreden",
        "Use different shipping address": "Gebruik ander verzendadres",
        "VIEW SAVED CARDS": "OPGESLAGEN KAARTEN BEKIJKEN",
        "Verified": "Geverifieerd",
        "View options": "Bekijk opties",
        "Wire/Bank Transfer": "Overboeking/bankoverschrijving",
        "You entered an invalid coupon code": "U heeft een ongeldige couponcode ingevoerd",
        "You entered an invalid gift card": "Je hebt een ongeldige cadeaubon ingevoerd",
        "additional": "aanvullend",
        "and": "en",
        "apply": "van toepassing zijn",
        "coupon": "coupon",
        "eps Bank": "eps-bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "privacybeleid",
        "pursuant to": "op grond van",
        "services and/or purchase of products from ": "diensten en/of aankoop van producten van",
        "terms": "termen",
        "terms and conditions": "voorwaarden",
        "the": "de",
        "the store's": "de winkels",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "om de hierboven vermelde bankrekening te debiteren voor elk verschuldigd bedrag voor kosten die voortvloeien uit uw gebruik van:",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "website en voorwaarden, totdat deze toestemming wordt ingetrokken. U kunt deze machtiging op elk moment wijzigen of annuleren door een kennisgeving aan:",
        "with 30 (thirty) days notice.": "met een opzegtermijn van 30 (dertig) dagen."
    },
    "pt-PT": {
        "+ ADD A COUPON CODE": "+ ADICIONE UM CÓDIGO DE CUPOM",
        "+ COUPON": "+ CUPOM",
        "+ NEW CARD": "+ NOVO CARTÃO",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ RESGATAR CARTÃO-PRESENTE/CRÉDITO NA LOJA",
        "ADD": "ADICIONAR",
        "Accept": "Aceitar",
        "Account": "Conta",
        "Account login": "Login da conta",
        "Account name": "Nome da conta",
        "Account registration": "Registro de conta",
        "Add": "Adicionar",
        "Additional information": "Informação adicional",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Após selecionar <b>Pagar</b>, aparecerá um prompt para selecionar uma conta bancária.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Após selecionar <b>Pagar</b>, você será redirecionado para concluir seu pagamento.",
        "After selecting pay you will be redirected to complete your payment.": "Após selecionar o pagamento, você será redirecionado para concluir seu pagamento.",
        "After selecting pay, a window will appear where you can complete your payment.": "Após selecionar o pagamento, aparecerá uma janela onde você poderá concluir seu pagamento.",
        "An unknown error occurred. Please refresh the page and try again.": "Ocorreu um erro desconhecido. Atualize a página e tente novamente.",
        "Another step will appear after submitting your order to complete your purchase details.": "Outra etapa aparecerá após o envio do seu pedido para completar os detalhes da sua compra.",
        "Apartment": "Apartamento",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay selecionado para checkout.",
        "BILLING": "COBRANÇA",
        "Back": "De volta",
        "Bill to": "projeto de lei para",
        "Billing": "Cobrança",
        "Billing method": "Método de cobrança",
        "By clicking <b>Accept</b>, you authorize": "Ao clicar em <b>Aceitar</b>, você autoriza",
        "By clicking the button above, you agree to": "Ao clicar no botão acima, você concorda em",
        "Cancel": "Cancelar",
        "Card": "Cartão",
        "Cart is empty": "carrinho esta vazio",
        "Cheque": "Verifica",
        "City": "Cidade",
        "Click to refresh shipping price": "Clique para atualizar o preço do frete",
        "Close": "Perto",
        "Continue": "Continuar",
        "Country": "País",
        "County": "Condado",
        "Coupon code": "Código do cupom",
        "Currency": "Moeda",
        "Customize": "Customizar",
        "Delivery date": "Data de entrega",
        "Done": "Feito",
        "Edit": "Editar",
        "Email": "E-mail",
        "Email or Username": "Email ou nome de usuário",
        "Exit checkout": "Sair da finalização da compra",
        "First name": "Primeiro nome",
        "First renewal": "Primeira renovação",
        "Gift card number": "Número do cartão-presente",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay selecionado para finalização da compra.",
        "I verify that the country I have entered is the one I reside in": "Certifico que o país em que entrei é aquele em que resido",
        "Initial Shipment": "Remessa inicial",
        "Last name": "Último nome",
        "Login": "Conecte-se",
        "My cart": "Meu carrinho",
        "Name": "Nome",
        "No thanks": "Não, obrigado",
        "Note: Payments may take up to 5 days to complete.": "Observação: os pagamentos podem levar até 5 dias para serem concluídos.",
        "Order notes": "Notas de pedidos",
        "Order summary": "Resumo do pedido",
        "P24 Bank": "Banco P24",
        "PAYMENT": "FORMA DE PAGAMENTO",
        "Password": "Senha",
        "Pay": "Pagar",
        "Pay with a cheque": "Pague com cheque",
        "Payment": "Pagamento",
        "Payment method": "Forma de pagamento",
        "Payment via Wire/Bank Transfer": "Pagamento via Transferência Bancária",
        "Personal": "Pessoal",
        "Phone number": "Número de telefone",
        "Place order": "Faça a encomenda",
        "Please go back and try again. Missing required field": "Por favor volte e tente novamente. Campo obrigatório ausente",
        "Postal code": "Código postal",
        "Powered by": "Distribuído por",
        "Privacy Policy": "Política de Privacidade",
        "Processing": "Em processamento",
        "Province": "Província",
        "Purchase order": "Ordem de Compra",
        "Recommended for you": "Recomendado para você",
        "Recurring total": "Total recorrente",
        "Register": "Registro",
        "Remove": "Remover",
        "Return": "Retornar",
        "Review your information": "Revise sua informação",
        "SHIPPING": "ENVIO",
        "Save changes": "Salvar alterações",
        "Select a country": "Selecione um pais",
        "Select a province": "Selecione uma província",
        "Select a state": "Selecione um Estado",
        "Ship to": "Enviar para",
        "Shipping": "Envio",
        "Shipping method": "Método de envio",
        "Sorry, something went wrong. Please refresh the page and try again.": "Desculpe, algo deu errado. Atualize a página e tente novamente.",
        "Sorry, this store does not ship to your location.": "Desculpe, esta loja não envia para sua localização.",
        "State": "Estado",
        "Street address": "endereço da Rua",
        "Subtotal": "Subtotal",
        "Tax": "Imposto",
        "Terms of Service": "Termos de serviço",
        "Test mode: customers cannot see PeachPay": "Modo de teste: os clientes não podem ver o PeachPay",
        "The customer canceled choosing a bank account.": "O cliente cancelou a escolha de uma conta bancária.",
        "The merchant has not enabled any payment methods": "O comerciante não ativou nenhum método de pagamento",
        "The required mandate was not accepted. Payment canceled.": "O mandato exigido não foi aceito. Pagamento cancelado.",
        "There are no eligible or active payment methods available for this order.": "Não há métodos de pagamento qualificados ou ativos disponíveis para este pedido.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Este método de pagamento não é compatível com a moeda selecionada, ao clicar nesta mensagem a moeda mudará para",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Este método de pagamento não é compatível com a moeda selecionada. Ao selecionar isso, a moeda mudará para",
        "This payment method does not support the selected currency. Please switch currencies.": "Este método de pagamento não é compatível com a moeda selecionada. Por favor, troque as moedas.",
        "Total": "Total",
        "US bank account": "conta bancária americana",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Não foi possível verificar esta conta bancária. Use uma conta bancária diferente ou escolha uma nova forma de pagamento.",
        "Unknown order error occurred": "Ocorreu um erro de pedido desconhecido",
        "Use different shipping address": "Use um endereço de entrega diferente",
        "VIEW SAVED CARDS": "VER CARTÕES GUARDADOS",
        "Verified": "Verificado",
        "View options": "Ver opções",
        "Wire/Bank Transfer": "Transferência bancária/eletrônica",
        "You entered an invalid coupon code": "Você inseriu um código de cupom inválido",
        "You entered an invalid gift card": "Você inseriu um vale-presente inválido",
        "additional": "adicional",
        "and": "e",
        "apply": "Aplique",
        "coupon": "cupom",
        "eps Bank": "banco eps",
        "iDEAL Bank": "Banco ideal",
        "privacy policy": "política de Privacidade",
        "pursuant to": "de acordo com",
        "services and/or purchase of products from ": "serviços e/ou compra de produtos de",
        "terms": "termos",
        "terms and conditions": "termos e Condições",
        "the": "a",
        "the store's": "as lojas",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "debitar na conta bancária especificada acima qualquer valor devido por cobranças decorrentes do uso do",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "site e termos, até que esta autorização seja revogada. Você pode alterar ou cancelar esta autorização a qualquer momento, notificando a",
        "with 30 (thirty) days notice.": "com 30 (trinta) dias de antecedência."
    },
    "ro-RO": {
        "+ ADD A COUPON CODE": "+ ADĂUGAȚI UN COD CUPON",
        "+ COUPON": "+ CUPON",
        "+ NEW CARD": "+ CARD NOU",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ RUTILIZAȚI CARDUL CADOU/CREDIT DE MAGAZIN",
        "ADD": "ADĂUGA",
        "Accept": "Accept",
        "Account": "Cont",
        "Account login": "Conectare la cont",
        "Account name": "Nume de cont",
        "Account registration": "Înregistrarea contului",
        "Add": "Adăuga",
        "Additional information": "Informații suplimentare",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "După ce selectați <b>Plătiți</b>, va apărea o solicitare pentru a selecta un cont bancar.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "După ce selectați <b>Plătiți</b>, veți fi redirecționat pentru a finaliza plata.",
        "After selecting pay you will be redirected to complete your payment.": "După ce ați selectat plata, veți fi redirecționat pentru a finaliza plata.",
        "After selecting pay, a window will appear where you can complete your payment.": "După ce ați selectat plata, va apărea o fereastră în care vă puteți finaliza plata.",
        "An unknown error occurred. Please refresh the page and try again.": "O eroare necunoscută s-a întamplat. Vă rugăm să reîmprospătați pagina și să încercați din nou.",
        "Another step will appear after submitting your order to complete your purchase details.": "Un alt pas va apărea după trimiterea comenzii pentru a finaliza detaliile de achiziție.",
        "Apartment": "Apartament",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay selectat pentru finalizare.",
        "BILLING": "FACTURAREA",
        "Back": "Înapoi",
        "Bill to": "Proiect de lege pentru",
        "Billing": "Facturare",
        "Billing method": "Metoda de facturare",
        "By clicking <b>Accept</b>, you authorize": "Făcând clic pe <b>Accept</b>, autorizați",
        "By clicking the button above, you agree to": "Făcând clic pe butonul de mai sus, sunteți de acord",
        "Cancel": "Anulare",
        "Card": "Card",
        "Cart is empty": "Coșul este gol",
        "Cheque": "Verifica",
        "City": "Oraș",
        "Click to refresh shipping price": "Faceți clic pentru a reîmprospăta prețul de expediere",
        "Close": "Închide",
        "Continue": "Continua",
        "Country": "Țară",
        "County": "jud",
        "Coupon code": "Cod cupon",
        "Currency": "Valută",
        "Customize": "Personalizați",
        "Delivery date": "Data de livrare",
        "Done": "Terminat",
        "Edit": "Editați | ×",
        "Email": "E-mail",
        "Email or Username": "Adresă de e-mail sau nume de utilizator",
        "Exit checkout": "Ieșiți din casă",
        "First name": "Nume",
        "First renewal": "Prima reînnoire",
        "Gift card number": "Numărul cardului cadou",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay selectat pentru finalizare.",
        "I verify that the country I have entered is the one I reside in": "Verific că țara în care am intrat este cea în care locuiesc",
        "Initial Shipment": "Livrare inițială",
        "Last name": "Nume",
        "Login": "Autentificare",
        "My cart": "Caruciorul meu",
        "Name": "Nume",
        "No thanks": "Nu multumesc",
        "Note: Payments may take up to 5 days to complete.": "Notă: finalizarea plăților poate dura până la 5 zile.",
        "Order notes": "Note de comandă",
        "Order summary": "Comanda Rezumat",
        "P24 Bank": "P24 Bank",
        "PAYMENT": "PLATĂ",
        "Password": "Parola",
        "Pay": "A plati",
        "Pay with a cheque": "Plătiți cu un cec",
        "Payment": "Plată",
        "Payment method": "Modalitate de plată",
        "Payment via Wire/Bank Transfer": "Plata prin transfer bancar",
        "Personal": "Personal",
        "Phone number": "Numar de telefon",
        "Place order": "Plasați comanda",
        "Please go back and try again. Missing required field": "Vă rugăm să reveniți și să încercați din nou. Lipsește câmp obligatoriu",
        "Postal code": "Cod poștal",
        "Powered by": "Cu sprijinul",
        "Privacy Policy": "Politica de Confidențialitate",
        "Processing": "Prelucrare",
        "Province": "Provincie",
        "Purchase order": "Comandă de achiziție",
        "Recommended for you": "recomandat pentru tine",
        "Recurring total": "Total recurent",
        "Register": "Inregistreaza-te",
        "Remove": "Elimina",
        "Return": "Întoarcere",
        "Review your information": "Examinați-vă informațiile",
        "SHIPPING": "TRANSPORT",
        "Save changes": "Salvează modificările",
        "Select a country": "Selecteaza o tara",
        "Select a province": "Selectați o provincie",
        "Select a state": "Selecteaza un stat",
        "Ship to": "Îmbarca spre",
        "Shipping": "livrare",
        "Shipping method": "Metodă de livrare",
        "Sorry, something went wrong. Please refresh the page and try again.": "Scuze, ceva a mers greșit. Vă rugăm să reîmprospătați pagina și să încercați din nou.",
        "Sorry, this store does not ship to your location.": "Ne pare rău, acest magazin nu se livrează în locația dvs.",
        "State": "Stat",
        "Street address": "adresa străzii",
        "Subtotal": "Subtotal",
        "Tax": "Impozit",
        "Terms of Service": "Termenii serviciului",
        "Test mode: customers cannot see PeachPay": "Mod de testare: clienții nu pot vedea PeachPay",
        "The customer canceled choosing a bank account.": "Clientul a anulat alegerea unui cont bancar.",
        "The merchant has not enabled any payment methods": "Comerciantul nu a activat nicio metodă de plată",
        "The required mandate was not accepted. Payment canceled.": "Mandatul cerut nu a fost acceptat. Plata anulată.",
        "There are no eligible or active payment methods available for this order.": "Nu există metode de plată eligibile sau active disponibile pentru această comandă.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Această metodă de plată nu acceptă moneda selectată, când faceți clic pe acest mesaj moneda se va comuta",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Această metodă de plată nu acceptă moneda selectată. La selectarea acesteia, moneda va trece la",
        "This payment method does not support the selected currency. Please switch currencies.": "Această metodă de plată nu acceptă moneda selectată. Vă rugăm să schimbați moneda.",
        "Total": "Total",
        "US bank account": "cont bancar american",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Nu se poate verifica acest cont bancar. Vă rugăm să utilizați un alt cont bancar sau să alegeți o nouă metodă de plată.",
        "Unknown order error occurred": "A apărut o eroare de comandă necunoscută",
        "Use different shipping address": "Utilizați o adresă de expediere diferită",
        "VIEW SAVED CARDS": "VEZI CARDURI SALVATE",
        "Verified": "Verificat",
        "View options": "Vizualizați opțiunile",
        "Wire/Bank Transfer": "Transfer bancar",
        "You entered an invalid coupon code": "Ați introdus un cod de cupon nevalid",
        "You entered an invalid gift card": "Ați introdus un card cadou nevalid",
        "additional": "adiţional",
        "and": "și",
        "apply": "aplica",
        "coupon": "cupon",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "Politica de Confidențialitate",
        "pursuant to": "conform",
        "services and/or purchase of products from ": "servicii și/sau achiziție de produse de la",
        "terms": "termeni",
        "terms and conditions": "Termeni și condiții",
        "the": "cel",
        "the store's": "magazinele",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "pentru a debita contul bancar specificat mai sus pentru orice sumă datorată pentru taxele care decurg din utilizarea de către dumneavoastră a",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "site-ul web și termenii, până la revocarea acestei autorizații. Puteți modifica sau anula această autorizație în orice moment, furnizând o notificare către",
        "with 30 (thirty) days notice.": "cu un preaviz de 30 (treizeci) de zile."
    },
    "ru-RU": {
        "+ ADD A COUPON CODE": "+ ДОБАВИТЬ КОД КУПОНА",
        "+ COUPON": "+ КУПОН",
        "+ NEW CARD": "+ НОВАЯ КАРТА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ПОКУПАТЬ ПОДАРОЧНУЮ КАРТУ/КРЕДИТ В МАГАЗИНЕ",
        "ADD": "ДОБАВЛЯТЬ",
        "Accept": "Принимать",
        "Account": "Счет",
        "Account login": "Логин аккаунта",
        "Account name": "Название аккаунта",
        "Account registration": "Регистрация аккаунта",
        "Add": "Добавлять",
        "Additional information": "Дополнительная информация",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "После выбора <b>Оплатить</b> появится запрос на выбор банковского счета.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "После выбора <b>Оплатить</b> вы будете перенаправлены для завершения платежа.",
        "After selecting pay you will be redirected to complete your payment.": "После выбора оплаты вы будете перенаправлены для завершения платежа.",
        "After selecting pay, a window will appear where you can complete your payment.": "После выбора оплаты появится окно, в котором вы можете завершить платеж.",
        "An unknown error occurred. Please refresh the page and try again.": "Произошла неизвестная ошибка. Пожалуйста, обновите страницу и повторите попытку.",
        "Another step will appear after submitting your order to complete your purchase details.": "Еще один шаг появится после отправки вашего заказа, чтобы заполнить информацию о покупке.",
        "Apartment": "Квартира",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay выбран для оплаты.",
        "BILLING": "БИЛЛИНГ",
        "Back": "Назад",
        "Bill to": "Плательщик",
        "Billing": "Выставление счетов",
        "Billing method": "Способ выставления счетов",
        "By clicking <b>Accept</b>, you authorize": "Нажимая <b>Принять</b>, вы разрешаете",
        "By clicking the button above, you agree to": "Нажимая кнопку выше, вы соглашаетесь",
        "Cancel": "Отмена",
        "Card": "Карта",
        "Cart is empty": "Корзина пуста",
        "Cheque": "Проверьте",
        "City": "Город",
        "Click to refresh shipping price": "Нажмите, чтобы обновить стоимость доставки",
        "Close": "Закрывать",
        "Continue": "Продолжать",
        "Country": "Страна",
        "County": "округ",
        "Coupon code": "Код купона",
        "Currency": "Валюта",
        "Customize": "Настроить",
        "Delivery date": "Дата доставки",
        "Done": "Сделанный",
        "Edit": "Редактировать",
        "Email": "Эл. адрес",
        "Email or Username": "Электронная почта или имя пользователя",
        "Exit checkout": "Выйти из кассы",
        "First name": "Имя",
        "First renewal": "Первое обновление",
        "Gift card number": "Номер подарочной карты",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Для оплаты выбран Google Pay.",
        "I verify that the country I have entered is the one I reside in": "Я подтверждаю, что страна, в которую я въехал, является той, в которой я проживаю",
        "Initial Shipment": "Первоначальная отгрузка",
        "Last name": "Фамилия",
        "Login": "Авторизоваться",
        "My cart": "Моя тележка",
        "Name": "Имя",
        "No thanks": "Спасибо, не надо",
        "Note: Payments may take up to 5 days to complete.": "Примечание. Платежи могут занять до 5 дней.",
        "Order notes": "Примечания к заказу",
        "Order summary": "Итог заказа",
        "P24 Bank": "Банк П24",
        "PAYMENT": "ОПЛАТА",
        "Password": "Пароль",
        "Pay": "Платить",
        "Pay with a cheque": "Оплатить чеком",
        "Payment": "Оплата",
        "Payment method": "Метод оплаты",
        "Payment via Wire/Bank Transfer": "Оплата банковским переводом/банковским переводом",
        "Personal": "Личный",
        "Phone number": "Телефонный номер",
        "Place order": "Разместить заказ",
        "Please go back and try again. Missing required field": "Пожалуйста вернитесь и попробуйте снова. Отсутсвует необходимое поле",
        "Postal code": "Почтовый Код",
        "Powered by": "Питаться от",
        "Privacy Policy": "Политика конфиденциальности",
        "Processing": "Обработка",
        "Province": "Провинция",
        "Purchase order": "Заказ на покупку",
        "Recommended for you": "Рекомендуется для вас",
        "Recurring total": "Общая сумма",
        "Register": "регистр",
        "Remove": "Удалять",
        "Return": "Возвращаться",
        "Review your information": "Проверьте свою информацию",
        "SHIPPING": "ПЕРЕВОЗКИ",
        "Save changes": "Сохранить изменения",
        "Select a country": "Выберите страну",
        "Select a province": "Выберите провинцию",
        "Select a state": "Выберите штат",
        "Ship to": "Доставить",
        "Shipping": "Перевозки",
        "Shipping method": "Способ доставки",
        "Sorry, something went wrong. Please refresh the page and try again.": "Извините, что-то пошло не так. Пожалуйста, обновите страницу и повторите попытку.",
        "Sorry, this store does not ship to your location.": "Извините, этот магазин не осуществляет доставку в ваш город.",
        "State": "Состояние",
        "Street address": "адрес улицы",
        "Subtotal": "Промежуточный итог",
        "Tax": "налог",
        "Terms of Service": "условия обслуживания",
        "Test mode: customers cannot see PeachPay": "Тестовый режим: клиенты не видят PeachPay",
        "The customer canceled choosing a bank account.": "Клиент отменил выбор банковского счета.",
        "The merchant has not enabled any payment methods": "Продавец не активировал способы оплаты",
        "The required mandate was not accepted. Payment canceled.": "Требуемый мандат не был принят. Платеж отменен.",
        "There are no eligible or active payment methods available for this order.": "Для этого заказа нет подходящих или активных способов оплаты.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Этот способ оплаты не поддерживает выбранную валюту, при нажатии на это сообщение валюта изменится на",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Этот способ оплаты не поддерживает выбранную валюту. При выборе этого валюта переключится на",
        "This payment method does not support the selected currency. Please switch currencies.": "Этот способ оплаты не поддерживает выбранную валюту. Пожалуйста, переключите валюту.",
        "Total": "Общее",
        "US bank account": "банковский счет в США",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Не удалось подтвердить этот банковский счет. Пожалуйста, используйте другой банковский счет или выберите новый способ оплаты.",
        "Unknown order error occurred": "Произошла неизвестная ошибка заказа",
        "Use different shipping address": "Использовать другой адрес доставки",
        "VIEW SAVED CARDS": "ПОСМОТРЕТЬ СОХРАНЕННЫЕ КАРТЫ",
        "Verified": "проверено",
        "View options": "Параметры просмотра",
        "Wire/Bank Transfer": "Банковский перевод/банковский перевод",
        "You entered an invalid coupon code": "Вы ввели неверный код купона",
        "You entered an invalid gift card": "Вы ввели недействительную подарочную карту",
        "additional": "дополнительный",
        "and": "и",
        "apply": "подать заявление",
        "coupon": "купон",
        "eps Bank": "эпс банк",
        "iDEAL Bank": "ИДЕАЛ Банк",
        "privacy policy": "политика конфиденциальности",
        "pursuant to": "в соответствии с",
        "services and/or purchase of products from ": "услуги и/или покупка товаров у",
        "terms": "условия",
        "terms and conditions": "условия и положения",
        "the": "в",
        "the store's": "магазины",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "дебетовать банковский счет, указанный выше, на любую сумму, причитающуюся за сборы, возникающие в результате использования вами",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "веб-сайт и условия, пока это разрешение не будет отозвано. Вы можете изменить или отменить это разрешение в любое время, уведомив",
        "with 30 (thirty) days notice.": "с уведомлением за 30 (тридцать) дней."
    },
    "sl-SI": {
        "+ ADD A COUPON CODE": "+ DODAJ KODO KUPON",
        "+ COUPON": "+ KUPON",
        "+ NEW CARD": "+ NOVA KARTICA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ IZKLJUČITE DARILNO KARTICO/KREDIT TRGOVINE",
        "ADD": "DODAJ",
        "Accept": "Sprejmi",
        "Account": "račun",
        "Account login": "Prijava v račun",
        "Account name": "Ime računa",
        "Account registration": "Registracija računa",
        "Add": "Dodaj",
        "Additional information": "Dodatne informacije",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Ko izberete <b>Plačaj</b>, se prikaže poziv za izbiro bančnega računa.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Ko izberete <b>Plačaj</b>, boste preusmerjeni na dokončanje plačila.",
        "After selecting pay you will be redirected to complete your payment.": "Po izbiri plačila boste preusmerjeni na dokončanje plačila.",
        "After selecting pay, a window will appear where you can complete your payment.": "Po izbiri plačila se prikaže okno, kjer lahko zaključite plačilo.",
        "An unknown error occurred. Please refresh the page and try again.": "Prišlo je do neznane napake. Osvežite stran in poskusite znova.",
        "Another step will appear after submitting your order to complete your purchase details.": "Po oddaji naročila se prikaže še en korak za dokončanje podrobnosti nakupa.",
        "Apartment": "Apartma",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay izbran za blagajno.",
        "BILLING": "OBRAČUNAVANJE",
        "Back": "Nazaj",
        "Bill to": "Račun za",
        "Billing": "Zaračunavanje",
        "Billing method": "Način obračunavanja",
        "By clicking <b>Accept</b>, you authorize": "Če kliknete <b>Sprejmi</b>, pooblastite",
        "By clicking the button above, you agree to": "S klikom na zgornji gumb se strinjate",
        "Cancel": "Prekliči",
        "Card": "Kartica",
        "Cart is empty": "Košarica je prazna",
        "Cheque": "Preverite",
        "City": "mesto",
        "Click to refresh shipping price": "Kliknite za osvežitev cene pošiljanja",
        "Close": "Zapri",
        "Continue": "Nadaljuj",
        "Country": "Država",
        "County": "okrožje",
        "Coupon code": "Koda kupona",
        "Currency": "valuta",
        "Customize": "Prilagoditi",
        "Delivery date": "Datum dostave",
        "Done": "Končano",
        "Edit": "Uredi",
        "Email": "E-naslov",
        "Email or Username": "E-poštni naslov ali uporabniško ime",
        "Exit checkout": "Izhod iz blagajne",
        "First name": "Ime",
        "First renewal": "Prva obnova",
        "Gift card number": "Številka darilne kartice",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay izbran za blagajno.",
        "I verify that the country I have entered is the one I reside in": "Potrjujem, da je država, v katero sem vstopil, tista, v kateri prebivam",
        "Initial Shipment": "Začetna pošiljka",
        "Last name": "Priimek",
        "Login": "Vpiši se",
        "My cart": "Moj voziček",
        "Name": "Ime",
        "No thanks": "Ne hvala",
        "Note: Payments may take up to 5 days to complete.": "Opomba: dokončanje plačil lahko traja do 5 dni.",
        "Order notes": "Opombe naročila",
        "Order summary": "Povzetek naročila",
        "P24 Bank": "Banka P24",
        "PAYMENT": "PLAČILO",
        "Password": "Geslo",
        "Pay": "plačati",
        "Pay with a cheque": "Plačajte s čekom",
        "Payment": "Plačilo",
        "Payment method": "Način plačila",
        "Payment via Wire/Bank Transfer": "Plačilo z bančnim nakazilom",
        "Personal": "Osebno",
        "Phone number": "Telefonska številka",
        "Place order": "Naročiti",
        "Please go back and try again. Missing required field": "Prosimo, vrnite se in poskusite znova. Manjka obvezno polje",
        "Postal code": "Poštna številka",
        "Powered by": "Poganja ga",
        "Privacy Policy": "Politika zasebnosti",
        "Processing": "Obravnavati",
        "Province": "provinca",
        "Purchase order": "Naročilnica",
        "Recommended for you": "Priporočeno za vas",
        "Recurring total": "Ponavljajoče se skupno",
        "Register": "Registrirajte se",
        "Remove": "Odstrani",
        "Return": "Vrnitev",
        "Review your information": "Preglejte svoje podatke",
        "SHIPPING": "DOSTAVA",
        "Save changes": "Shrani spremembe",
        "Select a country": "Izberite državo",
        "Select a province": "Izberite provinco",
        "Select a state": "Izberite državo",
        "Ship to": "Poslati v",
        "Shipping": "Dostava",
        "Shipping method": "Način pošiljanja",
        "Sorry, something went wrong. Please refresh the page and try again.": "Oprostite, nekaj je šlo narobe. Osvežite stran in poskusite znova.",
        "Sorry, this store does not ship to your location.": "Žal ta trgovina ne pošilja na vašo lokacijo.",
        "State": "Država",
        "Street address": "naslov ceste",
        "Subtotal": "Vmesni seštevek",
        "Tax": "davek",
        "Terms of Service": "Pogoji storitve",
        "Test mode: customers cannot see PeachPay": "Testni način: stranke ne vidijo PeachPay",
        "The customer canceled choosing a bank account.": "Stranka je preklicala izbiro bančnega računa.",
        "The merchant has not enabled any payment methods": "Trgovec ni omogočil nobenega načina plačila",
        "The required mandate was not accepted. Payment canceled.": "Zahtevani mandat ni bil sprejet. Plačilo preklicano.",
        "There are no eligible or active payment methods available for this order.": "Za to naročilo ni na voljo nobenih ustreznih ali aktivnih plačilnih sredstev.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "To plačilno sredstvo ne podpira izbrane valute, s klikom na to sporočilo se bo valuta preklopila",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "To plačilno sredstvo ne podpira izbrane valute. Ko izberete to, se valuta preklopi na",
        "This payment method does not support the selected currency. Please switch currencies.": "To plačilno sredstvo ne podpira izbrane valute. Prosimo, zamenjajte valuto.",
        "Total": "Skupaj",
        "US bank account": "bančni račun v ZDA",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Tega bančnega računa ni mogoče preveriti. Uporabite drug bančni račun ali izberite nov način plačila.",
        "Unknown order error occurred": "Prišlo je do neznane napake pri naročilu",
        "Use different shipping address": "Uporabite drug naslov za dostavo",
        "VIEW SAVED CARDS": "OGLED SHRANJENIH KARTIC",
        "Verified": "Preverjeno",
        "View options": "Ogled možnosti",
        "Wire/Bank Transfer": "Bančno nakazilo",
        "You entered an invalid coupon code": "Vnesli ste neveljavno kodo kupona",
        "You entered an invalid gift card": "Vnesli ste neveljavno darilno kartico",
        "additional": "dodatno",
        "and": "in",
        "apply": "uporabiti",
        "coupon": "kupon",
        "eps Bank": "banka eps",
        "iDEAL Bank": "Banka iDEAL",
        "privacy policy": "politika zasebnosti",
        "pursuant to": "v skladu z",
        "services and/or purchase of products from ": "storitev in/ali nakup izdelkov pri",
        "terms": "pogojev",
        "terms and conditions": "pogoji",
        "the": "the",
        "the store's": "v trgovini",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "za bremenitev zgoraj navedenega bančnega računa za morebitne dolgovane zneske za stroške, ki izhajajo iz vaše uporabe",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "spletne strani in pogojev, dokler to pooblastilo ni preklicano. To pooblastilo lahko kadar koli spremenite ali prekličete z obvestilom na",
        "with 30 (thirty) days notice.": "z odpovednim rokom 30 (trideset) dni."
    },
    "sv-SE": {
        "+ ADD A COUPON CODE": "+ LÄGG TILL EN KUPONGKOD",
        "+ COUPON": "+ KUPONG",
        "+ NEW CARD": "+ NYTT KORT",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ LÖS IN PRESENTKORT/BUTIKKREDIT",
        "ADD": "LÄGG TILL",
        "Accept": "Acceptera",
        "Account": "konto",
        "Account login": "Kontoinloggning",
        "Account name": "Kontonamn",
        "Account registration": "Kontoregistrering",
        "Add": "Lägg till",
        "Additional information": "Ytterligare information",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "När du har valt <b>Betala</b> visas en uppmaning om att välja ett bankkonto.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "När du har valt <b>Betala</b> kommer du att omdirigeras för att slutföra din betalning.",
        "After selecting pay you will be redirected to complete your payment.": "När du har valt betala kommer du att omdirigeras för att slutföra din betalning.",
        "After selecting pay, a window will appear where you can complete your payment.": "Efter att ha valt betalning kommer ett fönster upp där du kan slutföra din betalning.",
        "An unknown error occurred. Please refresh the page and try again.": "Ett okänt fel uppstod. Uppdatera sidan och försök igen.",
        "Another step will appear after submitting your order to complete your purchase details.": "Ett annat steg visas efter att du har skickat din beställning för att slutföra dina köpuppgifter.",
        "Apartment": "Lägenhet",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay har valts för kassan.",
        "BILLING": "FAKTURERING",
        "Back": "Tillbaka",
        "Bill to": "Bill till",
        "Billing": "Fakturering",
        "Billing method": "Faktureringsmetod",
        "By clicking <b>Accept</b>, you authorize": "Genom att klicka på <b>Acceptera</b> godkänner du",
        "By clicking the button above, you agree to": "Genom att klicka på knappen ovan godkänner du",
        "Cancel": "Avbryt",
        "Card": "Kort",
        "Cart is empty": "Varukorgen är tom",
        "Cheque": "Kolla upp",
        "City": "Stad",
        "Click to refresh shipping price": "Klicka för att uppdatera fraktpriset",
        "Close": "Stänga",
        "Continue": "Fortsätta",
        "Country": "Land",
        "County": "Grevskap",
        "Coupon code": "Kupongskod",
        "Currency": "Valuta",
        "Customize": "Anpassa",
        "Delivery date": "Leveransdatum",
        "Done": "Gjort",
        "Edit": "Redigera",
        "Email": "E-post",
        "Email or Username": "Email eller användarnamn",
        "Exit checkout": "Gå ur kassan",
        "First name": "Förnamn",
        "First renewal": "Första förnyelsen",
        "Gift card number": "Presentkortsnummer",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Google Pay har valts för kassan.",
        "I verify that the country I have entered is the one I reside in": "Jag verifierar att det land jag har angett är det jag bor i",
        "Initial Shipment": "Första leverans",
        "Last name": "Efternamn",
        "Login": "Logga in",
        "My cart": "Min vagn",
        "Name": "namn",
        "No thanks": "Nej tack",
        "Note: Payments may take up to 5 days to complete.": "Obs! Det kan ta upp till 5 dagar att slutföra betalningar.",
        "Order notes": "Beställ anteckningar",
        "Order summary": "Ordersammanfattning",
        "P24 Bank": "P24 Bank",
        "PAYMENT": "BETALNING",
        "Password": "Lösenord",
        "Pay": "Betala",
        "Pay with a cheque": "Betala med check",
        "Payment": "Betalning",
        "Payment method": "Betalningsmetod",
        "Payment via Wire/Bank Transfer": "Betalning via banköverföring",
        "Personal": "Personlig",
        "Phone number": "Telefonnummer",
        "Place order": "Beställa",
        "Please go back and try again. Missing required field": "Gå tillbaka och försök igen. Ett nödvändigt fält saknas",
        "Postal code": "Postnummer",
        "Powered by": "Drivs av",
        "Privacy Policy": "Integritetspolicy",
        "Processing": "Bearbetning",
        "Province": "Provins",
        "Purchase order": "Inköpsorder",
        "Recommended for you": "Rekommenderat för dig",
        "Recurring total": "Återkommande totalt",
        "Register": "Registrera",
        "Remove": "Ta bort",
        "Return": "Lämna tillbaka",
        "Review your information": "Se över din information",
        "SHIPPING": "FRAKT",
        "Save changes": "Spara ändringar",
        "Select a country": "Välj ett land",
        "Select a province": "Välj en provins",
        "Select a state": "Välj en stat",
        "Ship to": "Frakta till",
        "Shipping": "Frakt",
        "Shipping method": "Frakt metod",
        "Sorry, something went wrong. Please refresh the page and try again.": "Förlåt, något gick fel. Uppdatera sidan och försök igen.",
        "Sorry, this store does not ship to your location.": "Tyvärr, denna butik skickar inte till din plats.",
        "State": "stat",
        "Street address": "Gatuadress",
        "Subtotal": "Delsumma",
        "Tax": "Beskatta",
        "Terms of Service": "Användarvillkor",
        "Test mode: customers cannot see PeachPay": "Testläge: kunder kan inte se PeachPay",
        "The customer canceled choosing a bank account.": "Kunden avbröt valet av bankkonto.",
        "The merchant has not enabled any payment methods": "Säljaren har inte aktiverat några betalningsmetoder",
        "The required mandate was not accepted. Payment canceled.": "Det erforderliga mandatet accepterades inte. Betalning avbruten.",
        "There are no eligible or active payment methods available for this order.": "Det finns inga kvalificerade eller aktiva betalningsmetoder tillgängliga för denna beställning.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Den här betalningsmetoden stöder inte den valda valutan, när du klickar på detta meddelande kommer valutan att växla till",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Denna betalningsmetod stöder inte den valda valutan. När du väljer detta kommer valutan att växla till",
        "This payment method does not support the selected currency. Please switch currencies.": "Denna betalningsmetod stöder inte den valda valutan. Vänligen byt valuta.",
        "Total": "Total",
        "US bank account": "amerikanskt bankkonto",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Det gick inte att verifiera detta bankkonto. Använd ett annat bankkonto eller välj en ny betalningsmetod.",
        "Unknown order error occurred": "Okänt beställningsfel uppstod",
        "Use different shipping address": "Använd annan leveransadress",
        "VIEW SAVED CARDS": "VISA SPARADE KORT",
        "Verified": "Verifierad",
        "View options": "Visa alternativ",
        "Wire/Bank Transfer": "Banköverföring",
        "You entered an invalid coupon code": "Du angav en ogiltig kupongkod",
        "You entered an invalid gift card": "Du angav ett ogiltigt presentkort",
        "additional": "ytterligare",
        "and": "och",
        "apply": "tillämpa",
        "coupon": "kupong",
        "eps Bank": "eps Bank",
        "iDEAL Bank": "iDEAL Bank",
        "privacy policy": "integritetspolicy",
        "pursuant to": "enligt",
        "services and/or purchase of products from ": "tjänster och/eller köp av produkter från",
        "terms": "villkor",
        "terms and conditions": "Villkor",
        "the": "de",
        "the store's": "affärerna",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "att debitera bankkontot som anges ovan för eventuellt belopp som är skyldigt för avgifter som härrör från din användning av",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "webbplats och villkor, tills detta tillstånd återkallas. Du kan när som helst ändra eller avbryta denna auktorisation genom att meddela",
        "with 30 (thirty) days notice.": "med 30 (trettio) dagars varsel."
    },
    "th": {
        "+ ADD A COUPON CODE": "+ เพิ่มรหัสคูปอง",
        "+ COUPON": "+ คูปอง",
        "+ NEW CARD": "+ การ์ดใหม่",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ แลกบัตรของขวัญ/เครดิตร้านค้า",
        "ADD": "เพิ่ม",
        "Accept": "ยอมรับ",
        "Account": "บัญชี",
        "Account login": "เข้าสู้ระบบบัญชี",
        "Account name": "ชื่อบัญชี",
        "Account registration": "การลงทะเบียนบัญชี",
        "Add": "เพิ่ม",
        "Additional information": "ข้อมูลเพิ่มเติม",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "หลังจากเลือก <b>ชำระเงิน</b> จะปรากฏข้อความให้เลือกบัญชีธนาคาร",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "หลังจากเลือก <b>ชำระเงิน</b> คุณจะถูกเปลี่ยนเส้นทางเพื่อชำระเงินให้เสร็จสิ้น",
        "After selecting pay you will be redirected to complete your payment.": "หลังจากเลือกชำระเงินแล้ว ระบบจะเปลี่ยนเส้นทางเพื่อชำระเงินให้เสร็จสิ้น",
        "After selecting pay, a window will appear where you can complete your payment.": "หลังจากเลือกการชำระเงิน หน้าต่างจะปรากฏขึ้นเพื่อให้คุณชำระเงินได้สำเร็จ",
        "An unknown error occurred. Please refresh the page and try again.": "เกิดข้อผิดพลาดที่ไม่รู้จัก โปรดรีเฟรชหน้าแล้วลองอีกครั้ง",
        "Another step will appear after submitting your order to complete your purchase details.": "ขั้นตอนอื่นจะปรากฏขึ้นหลังจากส่งคำสั่งซื้อของคุณเพื่อกรอกรายละเอียดการซื้อของคุณ",
        "Apartment": "อพาร์ทเม้น",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "เลือก Apple Pay สำหรับการชำระเงิน",
        "BILLING": "การเรียกเก็บเงิน",
        "Back": "กลับ",
        "Bill to": "ส่งเบิกไปที่",
        "Billing": "การเรียกเก็บเงิน",
        "Billing method": "วิธีการเรียกเก็บเงิน",
        "By clicking <b>Accept</b>, you authorize": "การคลิก <b>ยอมรับ</b> แสดงว่าคุณอนุญาต",
        "By clicking the button above, you agree to": "การคลิกปุ่มด้านบนแสดงว่าคุณยอมรับ",
        "Cancel": "ยกเลิก",
        "Card": "การ์ด",
        "Cart is empty": "รถเข็นว่างเปล่า",
        "Cheque": "ตรวจสอบ",
        "City": "เมือง",
        "Click to refresh shipping price": "คลิกเพื่อรีเฟรชราคาส่ง",
        "Close": "ปิด I",
        "Continue": "ดำเนินการต่อ",
        "Country": "ประเทศ",
        "County": "เขต",
        "Coupon code": "รหัสคูปอง",
        "Currency": "สกุลเงิน",
        "Customize": "ปรับแต่ง",
        "Delivery date": "วันที่จัดส่ง",
        "Done": "เสร็จแล้ว",
        "Edit": "แก้ไข",
        "Email": "อีเมล",
        "Email or Username": "อีเมล์หรือชื่อผู้ใช้",
        "Exit checkout": "ออกจากการชำระเงิน",
        "First name": "ชื่อจริง",
        "First renewal": "ต่ออายุครั้งแรก",
        "Gift card number": "หมายเลขบัตรของขวัญ",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "เลือก Google Pay สำหรับการชำระเงิน",
        "I verify that the country I have entered is the one I reside in": "ฉันยืนยันว่าประเทศที่ฉันเข้ามาเป็นประเทศที่ฉันอาศัยอยู่",
        "Initial Shipment": "การจัดส่งครั้งแรก",
        "Last name": "นามสกุล",
        "Login": "เข้าสู่ระบบ",
        "My cart": "รถเข็นของฉัน",
        "Name": "ชื่อ",
        "No thanks": "ไม่เป็นไรขอบคุณ",
        "Note: Payments may take up to 5 days to complete.": "หมายเหตุ: การชำระเงินอาจใช้เวลาถึง 5 วันจึงจะเสร็จสมบูรณ์",
        "Order notes": "หมายเหตุการสั่งซื้อ",
        "Order summary": "สรุปคำสั่งซื้อ",
        "P24 Bank": "ธนาคาร P24",
        "PAYMENT": "การชำระเงิน",
        "Password": "รหัสผ่าน",
        "Pay": "จ่าย",
        "Pay with a cheque": "จ่ายด้วยเช็ค",
        "Payment": "การชำระเงิน",
        "Payment method": "วิธีการชำระเงิน",
        "Payment via Wire/Bank Transfer": "ชำระเงินด้วยการโอนเงินผ่านธนาคาร/โอนเงินผ่านธนาคาร",
        "Personal": "ส่วนตัว",
        "Phone number": "หมายเลขโทรศัพท์",
        "Place order": "สถานที่การสั่งซื้อ",
        "Please go back and try again. Missing required field": "โปรดกลับไปและลองอีกครั้ง ไม่มีช่องที่ต้องกรอก",
        "Postal code": "รหัสไปรษณีย์",
        "Powered by": "ขับเคลื่อนโดย",
        "Privacy Policy": "นโยบายความเป็นส่วนตัว",
        "Processing": "กำลังประมวลผล",
        "Province": "จังหวัด",
        "Purchase order": "ใบสั่งซื้อ",
        "Recommended for you": "แนะนำสำหรับคุณ",
        "Recurring total": "ยอดรวมที่เกิดซ้ำ",
        "Register": "ลงทะเบียน",
        "Remove": "ลบ",
        "Return": "กลับ",
        "Review your information": "ตรวจสอบข้อมูลของคุณ",
        "SHIPPING": "การส่งสินค้า",
        "Save changes": "บันทึกการเปลี่ยนแปลง",
        "Select a country": "เลือกประเทศ",
        "Select a province": "เลือกจังหวัด",
        "Select a state": "เลือกรัฐ",
        "Ship to": "ส่งไปที่",
        "Shipping": "การส่งสินค้า",
        "Shipping method": "วิธีจัดส่ง",
        "Sorry, something went wrong. Please refresh the page and try again.": "ขอโทษมีบางอย่างผิดพลาด. โปรดรีเฟรชหน้าแล้วลองอีกครั้ง",
        "Sorry, this store does not ship to your location.": "ขออภัย ร้านค้านี้ไม่ได้จัดส่งไปยังตำแหน่งของคุณ",
        "State": "สถานะ",
        "Street address": "ที่อยู่ถนน",
        "Subtotal": "ยอดรวม",
        "Tax": "ภาษี",
        "Terms of Service": "เงื่อนไขการให้บริการ",
        "Test mode: customers cannot see PeachPay": "โหมดทดสอบ: ลูกค้าไม่สามารถเห็น PeachPay",
        "The customer canceled choosing a bank account.": "ลูกค้ายกเลิกการเลือกบัญชีธนาคาร",
        "The merchant has not enabled any payment methods": "ร้านค้าไม่ได้เปิดใช้งานวิธีการชำระเงินใด ๆ",
        "The required mandate was not accepted. Payment canceled.": "ไม่ยอมรับอาณัติที่จำเป็น การชำระเงินถูกยกเลิก",
        "There are no eligible or active payment methods available for this order.": "ไม่มีวิธีการชำระเงินที่มีสิทธิ์หรือใช้งานได้สำหรับคำสั่งซื้อนี้",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก เมื่อคลิกข้อความนี้ สกุลเงินจะเปลี่ยนเป็น",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก เมื่อเลือกตัวเลือกนี้ สกุลเงินจะเปลี่ยนเป็น",
        "This payment method does not support the selected currency. Please switch currencies.": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก กรุณาเปลี่ยนสกุลเงิน",
        "Total": "ทั้งหมด",
        "US bank account": "บัญชีธนาคารของสหรัฐอเมริกา",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "ไม่สามารถตรวจสอบบัญชีธนาคารนี้ได้ โปรดใช้บัญชีธนาคารอื่นหรือเลือกวิธีการชำระเงินใหม่",
        "Unknown order error occurred": "เกิดข้อผิดพลาดในการสั่งซื้อที่ไม่รู้จัก",
        "Use different shipping address": "ใช้ที่อยู่จัดส่งอื่น",
        "VIEW SAVED CARDS": "ดูการ์ดที่บันทึกไว้",
        "Verified": "ตรวจสอบแล้ว",
        "View options": "ดูตัวเลือก",
        "Wire/Bank Transfer": "โอนเงิน/โอนเงินผ่านธนาคาร",
        "You entered an invalid coupon code": "คุณป้อนรหัสคูปองไม่ถูกต้อง",
        "You entered an invalid gift card": "คุณป้อนบัตรของขวัญที่ไม่ถูกต้อง",
        "additional": "เพิ่มเติม",
        "and": "และ",
        "apply": "นำมาใช้",
        "coupon": "คูปอง",
        "eps Bank": "eps ธนาคาร",
        "iDEAL Bank": "ธนาคาร iDEAL",
        "privacy policy": "นโยบายความเป็นส่วนตัว",
        "pursuant to": "ตาม",
        "services and/or purchase of products from ": "บริการและ/หรือซื้อสินค้าจาก",
        "terms": "เงื่อนไข",
        "terms and conditions": "ข้อกำหนดและเงื่อนไข",
        "the": "ที่",
        "the store's": "ของร้าน",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "เพื่อหักบัญชีธนาคารที่ระบุไว้ข้างต้นสำหรับจำนวนเงินที่ค้างชำระสำหรับค่าใช้จ่ายที่เกิดขึ้นจากการใช้งานของคุณ",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "เว็บไซต์และข้อกำหนด จนกว่าการอนุญาตนี้จะถูกยกเลิก คุณสามารถแก้ไขหรือยกเลิกการอนุญาตนี้ได้ตลอดเวลาโดยแจ้งไปยัง",
        "with 30 (thirty) days notice.": "โดยแจ้งล่วงหน้า 30 (สามสิบ) วัน"
    },
    "uk": {
        "+ ADD A COUPON CODE": "+ ДОДАТИ КОД КУПОНА",
        "+ COUPON": "+ КУПОН",
        "+ NEW CARD": "+ НОВА КАРТКА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ВИКЛЮЧИТИ ПОДАРУНКУ КАРТКУ/КРЕДИТ МАГАЗИНУ",
        "ADD": "ДОДАТИ",
        "Accept": "прийняти",
        "Account": "Обліковий запис",
        "Account login": "Вхід в обліковий запис",
        "Account name": "Ім'я облікового запису",
        "Account registration": "Реєстрація облікового запису",
        "Add": "додати",
        "Additional information": "Додаткова інформація",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "Після вибору <b>Оплатити</b> з’явиться запит на вибір банківського рахунку.",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "Після вибору <b>Оплатити</b> ви будете перенаправлені для завершення платежу.",
        "After selecting pay you will be redirected to complete your payment.": "Після вибору оплати вас буде переспрямовано для завершення оплати.",
        "After selecting pay, a window will appear where you can complete your payment.": "Після вибору оплати з’явиться вікно, де можна завершити оплату.",
        "An unknown error occurred. Please refresh the page and try again.": "Сталася невідома помилка. Будь ласка, оновіть сторінку та повторіть спробу.",
        "Another step will appear after submitting your order to complete your purchase details.": "Після надсилання замовлення з’явиться ще один крок для завершення деталей покупки.",
        "Apartment": "Квартира",
        "Apple Pay": "Apple Pay",
        "Apple Pay selected for checkout.": "Apple Pay вибрано для оплати.",
        "BILLING": "БІЛІНГ",
        "Back": "Назад",
        "Bill to": "Виставити рахунок",
        "Billing": "Виставлення рахунків",
        "Billing method": "Спосіб виставлення рахунків",
        "By clicking <b>Accept</b>, you authorize": "Натискаючи <b>Прийняти</b>, ви авторизуєтесь",
        "By clicking the button above, you agree to": "Натискаючи кнопку вище, ви погоджуєтеся",
        "Cancel": "Скасувати",
        "Card": "Картка",
        "Cart is empty": "Кошик порожній",
        "Cheque": "Перевірте",
        "City": "Місто",
        "Click to refresh shipping price": "Натисніть, щоб оновити ціну доставки",
        "Close": "Закрити",
        "Continue": "Продовжуйте",
        "Country": "Країна",
        "County": "повіт",
        "Coupon code": "Код купона",
        "Currency": "Валюта",
        "Customize": "Налаштувати",
        "Delivery date": "Дата доставки",
        "Done": "Готово",
        "Edit": "Редагувати",
        "Email": "Електронна пошта",
        "Email or Username": "Електронна пошта або ім'я користувача",
        "Exit checkout": "Вийти з каси",
        "First name": "Ім'я",
        "First renewal": "Перше оновлення",
        "Gift card number": "Номер подарункової картки",
        "Google Pay": "Google Pay",
        "Google Pay selected for checkout.": "Для оплати вибрано Google Pay.",
        "I verify that the country I have entered is the one I reside in": "Я підтверджую, що країна, в яку я ввійшов, є тією, в якій я проживаю",
        "Initial Shipment": "Початкове відправлення",
        "Last name": "Прізвище",
        "Login": "Логін",
        "My cart": "Мій візок",
        "Name": "Ім'я",
        "No thanks": "Ні, дякую",
        "Note: Payments may take up to 5 days to complete.": "Примітка. Платежі можуть тривати до 5 днів.",
        "Order notes": "Примітки до замовлення",
        "Order summary": "Підсумок Замовлення",
        "P24 Bank": "Банк Р24",
        "PAYMENT": "ОПЛАТА",
        "Password": "Пароль",
        "Pay": "Платити",
        "Pay with a cheque": "Оплата чеком",
        "Payment": "оплата",
        "Payment method": "Спосіб оплати",
        "Payment via Wire/Bank Transfer": "Оплата банківським переказом",
        "Personal": "Особистий",
        "Phone number": "Номер телефону",
        "Place order": "Зробити замовлення",
        "Please go back and try again. Missing required field": "Будь ласка, поверніться та спробуйте ще раз. Відсутнє обов’язкове поле",
        "Postal code": "Поштовий індекс",
        "Powered by": "Працює на",
        "Privacy Policy": "Політика конфіденційності",
        "Processing": "Обробка",
        "Province": "провінція",
        "Purchase order": "Замовлення на придбання",
        "Recommended for you": "рекомендовано для вас",
        "Recurring total": "Повторюваний підсумок",
        "Register": "зареєструватися",
        "Remove": "Видалити",
        "Return": "Повернення",
        "Review your information": "Перегляньте свою інформацію",
        "SHIPPING": "ДОСТАВКА",
        "Save changes": "Зберегти зміни",
        "Select a country": "Виберіть країну",
        "Select a province": "Виберіть провінцію",
        "Select a state": "Виберіть стан",
        "Ship to": "Відправити до",
        "Shipping": "Доставка",
        "Shipping method": "Метод доставки",
        "Sorry, something went wrong. Please refresh the page and try again.": "Вибачте, щось пішло не так. Оновіть сторінку та спробуйте ще раз.",
        "Sorry, this store does not ship to your location.": "На жаль, цей магазин не доставляє до вашого місцезнаходження.",
        "State": "держава",
        "Street address": "Адреса вулиці",
        "Subtotal": "Проміжний підсумок",
        "Tax": "податок",
        "Terms of Service": "Умови обслуговування",
        "Test mode: customers cannot see PeachPay": "Тестовий режим: клієнти не бачать PeachPay",
        "The customer canceled choosing a bank account.": "Клієнт скасував вибір банківського рахунку.",
        "The merchant has not enabled any payment methods": "Продавець не активував жодних методів оплати",
        "The required mandate was not accepted. Payment canceled.": "Необхідний мандат не був прийнятий. Платіж скасовано.",
        "There are no eligible or active payment methods available for this order.": "Для цього замовлення немає доступних або активних способів оплати.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Цей спосіб оплати не підтримує вибрану валюту, після натискання на це повідомлення валюта перейде",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Цей спосіб оплати не підтримує вибрану валюту. Після вибору цього параметра валюта перейде на",
        "This payment method does not support the selected currency. Please switch currencies.": "Цей спосіб оплати не підтримує вибрану валюту. Будь ласка, змініть валюту.",
        "Total": "Всього",
        "US bank account": "банківський рахунок США",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "Не вдалося підтвердити цей банківський рахунок. Скористайтеся іншим банківським рахунком або виберіть новий спосіб оплати.",
        "Unknown order error occurred": "Сталася невідома помилка замовлення",
        "Use different shipping address": "Використовуйте іншу адресу доставки",
        "VIEW SAVED CARDS": "ПЕРЕГЛЯНУТИ ЗБЕРЕЖЕНІ КАРТКИ",
        "Verified": "Перевірено",
        "View options": "Переглянути параметри",
        "Wire/Bank Transfer": "Банківський переказ",
        "You entered an invalid coupon code": "Ви ввели недійсний код купона",
        "You entered an invalid gift card": "Ви ввели недійсну подарункову картку",
        "additional": "додатковий",
        "and": "і",
        "apply": "застосувати",
        "coupon": "купон",
        "eps Bank": "eps банк",
        "iDEAL Bank": "iDEAL Банк",
        "privacy policy": "політика конфіденційності",
        "pursuant to": "відповідно до",
        "services and/or purchase of products from ": "послуги та/або придбання продуктів у",
        "terms": "терміни",
        "terms and conditions": "правила та умови",
        "the": "в",
        "the store's": "магазину",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "для списання з банківського рахунку, зазначеного вище, на будь-яку суму заборгованості за витрати, пов’язані з використанням вами",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "веб-сайт і умови, доки цей дозвіл не буде відкликано. Ви можете змінити або скасувати цей дозвіл у будь-який час, повідомивши про це",
        "with 30 (thirty) days notice.": "з повідомленням за 30 (тридцять) днів."
    },
    "zh-CN": {
        "+ ADD A COUPON CODE": "+ 添加优惠券代码",
        "+ COUPON": "+ 优惠券",
        "+ NEW CARD": "+ 新卡",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 兑换礼品卡/商店信用卡",
        "ADD": "添加",
        "Accept": "接受",
        "Account": "帐户",
        "Account login": "帐号登录",
        "Account name": "帐户名称",
        "Account registration": "账户注册",
        "Add": "添加",
        "Additional information": "附加信息",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "选择<b>支付</b>后，将出现选择银行账户的提示。",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "选择<b>支付</b>后，您将被重定向以完成付款。",
        "After selecting pay you will be redirected to complete your payment.": "选择付款后，您将被重定向以完成付款。",
        "After selecting pay, a window will appear where you can complete your payment.": "选择付款后，将出现一个窗口，您可以在其中完成付款。",
        "An unknown error occurred. Please refresh the page and try again.": "出现未知错误。请刷新页面并重试。",
        "Another step will appear after submitting your order to complete your purchase details.": "提交订单以完成购买详细信息后，将出现另一个步骤。",
        "Apartment": "公寓",
        "Apple Pay": "苹果支付",
        "Apple Pay selected for checkout.": "选择 Apple Pay 进行结账。",
        "BILLING": "计费",
        "Back": "后退",
        "Bill to": "记账到",
        "Billing": "计费",
        "Billing method": "计费方式",
        "By clicking <b>Accept</b>, you authorize": "点击<b>接受</b>，即表示您授权",
        "By clicking the button above, you agree to": "点击上方按钮，即表示您同意",
        "Cancel": "取消",
        "Card": "卡片",
        "Cart is empty": "购物车是空的",
        "Cheque": "查看",
        "City": "城市",
        "Click to refresh shipping price": "点击刷新运费",
        "Close": "关",
        "Continue": "继续",
        "Country": "国家",
        "County": "县",
        "Coupon code": "优惠券代码",
        "Currency": "货币",
        "Customize": "定制",
        "Delivery date": "邮寄日期",
        "Done": "完毕",
        "Edit": "编辑",
        "Email": "电子邮件",
        "Email or Username": "电子邮件或用户名",
        "Exit checkout": "退出结帐",
        "First name": "名",
        "First renewal": "第一次更新",
        "Gift card number": "礼品卡号",
        "Google Pay": "谷歌支付",
        "Google Pay selected for checkout.": "已选择 Google Pay 进行结帐。",
        "I verify that the country I have entered is the one I reside in": "我确认我输入的国家是我居住的国家",
        "Initial Shipment": "初始装运",
        "Last name": "姓",
        "Login": "登录",
        "My cart": "我的车",
        "Name": "姓名",
        "No thanks": "不，谢谢",
        "Note: Payments may take up to 5 days to complete.": "注意：付款最多可能需要 5 天才能完成。",
        "Order notes": "订单备注",
        "Order summary": "订单摘要",
        "P24 Bank": "P24 银行",
        "PAYMENT": "支付",
        "Password": "密码",
        "Pay": "支付",
        "Pay with a cheque": "用支票付款",
        "Payment": "支付",
        "Payment method": "付款方式",
        "Payment via Wire/Bank Transfer": "通过电汇/银行转账付款",
        "Personal": "个人的",
        "Phone number": "电话号码",
        "Place order": "下订单",
        "Please go back and try again. Missing required field": "请返回重试。缺少必填字段",
        "Postal code": "邮政编码",
        "Powered by": "供电",
        "Privacy Policy": "隐私政策",
        "Processing": "加工",
        "Province": "省",
        "Purchase order": "采购订单",
        "Recommended for you": "为你推荐",
        "Recurring total": "经常性总计",
        "Register": "登记",
        "Remove": "消除",
        "Return": "返回",
        "Review your information": "查看您的信息",
        "SHIPPING": "航运",
        "Save changes": "保存更改",
        "Select a country": "选择一个国家",
        "Select a province": "选择一个省份",
        "Select a state": "选择一个州",
        "Ship to": "运送到",
        "Shipping": "船运",
        "Shipping method": "邮寄方式",
        "Sorry, something went wrong. Please refresh the page and try again.": "抱歉，出了一些问题。请刷新页面并重试。",
        "Sorry, this store does not ship to your location.": "对不起，这家商店不送货到您的位置。",
        "State": "状态",
        "Street address": "街道地址",
        "Subtotal": "小计",
        "Tax": "税",
        "Terms of Service": "服务条款",
        "Test mode: customers cannot see PeachPay": "测试模式：客户看不到PeachPay",
        "The customer canceled choosing a bank account.": "客户取消选择银行账户。",
        "The merchant has not enabled any payment methods": "商户未启用任何支付方式",
        "The required mandate was not accepted. Payment canceled.": "未接受所需的授权。付款已取消。",
        "There are no eligible or active payment methods available for this order.": "此订单没有可用的合格或有效付款方式。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "此付款方式不支持所选币种，点击此消息后币种将切换为",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "此付款方式不支持所选货币。选择此项后，货币将切换为",
        "This payment method does not support the selected currency. Please switch currencies.": "此付款方式不支持所选货币。请切换货币。",
        "Total": "全部的",
        "US bank account": "美国银行账户",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "无法验证此银行帐户。请使用其他银行帐户或选择新的付款方式。",
        "Unknown order error occurred": "发生未知订单错误",
        "Use different shipping address": "使用不同的送货地址",
        "VIEW SAVED CARDS": "查看保存的卡片",
        "Verified": "已验证",
        "View options": "查看选项",
        "Wire/Bank Transfer": "电汇/银行转账",
        "You entered an invalid coupon code": "您输入的优惠券代码无效",
        "You entered an invalid gift card": "您输入的礼品卡无效",
        "additional": "额外的",
        "and": "和",
        "apply": "申请",
        "coupon": "优惠券",
        "eps Bank": "每股收益银行",
        "iDEAL Bank": "理想银行",
        "privacy policy": "隐私政策",
        "pursuant to": "根据",
        "services and/or purchase of products from ": "服务和/或购买产品",
        "terms": "条款",
        "terms and conditions": "条款和条件",
        "the": "这",
        "the store's": "商店的",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "从上述银行账户中扣除因您使用",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "网站和条款，直到此授权被撤销。您可以随时修改或取消此授权，只需通知",
        "with 30 (thirty) days notice.": "提前 30（三十）天通知。"
    },
    "zh-TW": {
        "+ ADD A COUPON CODE": "+ 添加優惠券代碼",
        "+ COUPON": "+ 優惠券",
        "+ NEW CARD": "+ 新卡",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 兌換禮品卡/商店信用卡",
        "ADD": "添加",
        "Accept": "接受",
        "Account": "帳戶",
        "Account login": "帳號登錄",
        "Account name": "帳戶名稱",
        "Account registration": "賬戶註冊",
        "Add": "添加",
        "Additional information": "附加信息",
        "After selecting <b>Pay</b> a prompt will appear to select a bank account.": "選擇<b>支付</b>後，將出現選擇銀行賬戶的提示。",
        "After selecting <b>Pay</b> you will be redirected to complete your payment.": "選擇<b>支付</b>後，您將被重定向以完成付款。",
        "After selecting pay you will be redirected to complete your payment.": "選擇付款後，您將被重定向以完成付款。",
        "After selecting pay, a window will appear where you can complete your payment.": "選擇付款後，將出現一個窗口，您可以在其中完成付款。",
        "An unknown error occurred. Please refresh the page and try again.": "出現未知錯誤。請刷新頁面並重試。",
        "Another step will appear after submitting your order to complete your purchase details.": "提交訂單以完成購買詳細信息後，將出現另一個步驟。",
        "Apartment": "公寓",
        "Apple Pay": "蘋果支付",
        "Apple Pay selected for checkout.": "選擇 Apple Pay 進行結賬。",
        "BILLING": "計費",
        "Back": "後退",
        "Bill to": "記賬到",
        "Billing": "計費",
        "Billing method": "計費方式",
        "By clicking <b>Accept</b>, you authorize": "點擊<b>接受</b>，即表示您授權",
        "By clicking the button above, you agree to": "點擊上方按鈕，即表示您同意",
        "Cancel": "取消",
        "Card": "卡片",
        "Cart is empty": "購物車是空的",
        "Cheque": "查看",
        "City": "城市",
        "Click to refresh shipping price": "點擊刷新運費",
        "Close": "關",
        "Continue": "繼續",
        "Country": "國家",
        "County": "縣",
        "Coupon code": "優惠券代碼",
        "Currency": "貨幣",
        "Customize": "定制",
        "Delivery date": "郵寄日期",
        "Done": "完畢",
        "Edit": "編輯",
        "Email": "電子郵件",
        "Email or Username": "電子郵件或用戶名",
        "Exit checkout": "退出結帳",
        "First name": "名",
        "First renewal": "第一次更新",
        "Gift card number": "禮品卡號",
        "Google Pay": "谷歌支付",
        "Google Pay selected for checkout.": "已選擇 Google Pay 進行結帳。",
        "I verify that the country I have entered is the one I reside in": "我確認我輸入的國家是我居住的國家",
        "Initial Shipment": "初始裝運",
        "Last name": "姓",
        "Login": "登錄",
        "My cart": "我的車",
        "Name": "姓名",
        "No thanks": "不，謝謝",
        "Note: Payments may take up to 5 days to complete.": "注意：付款最多可能需要 5 天才能完成。",
        "Order notes": "訂單備註",
        "Order summary": "訂單摘要",
        "P24 Bank": "P24 銀行",
        "PAYMENT": "支付",
        "Password": "密碼",
        "Pay": "支付",
        "Pay with a cheque": "用支票付款",
        "Payment": "支付",
        "Payment method": "付款方式",
        "Payment via Wire/Bank Transfer": "通過電匯/銀行轉賬付款",
        "Personal": "個人的",
        "Phone number": "電話號碼",
        "Place order": "下訂單",
        "Please go back and try again. Missing required field": "請返回重試。缺少必填字段",
        "Postal code": "郵政編碼",
        "Powered by": "供電",
        "Privacy Policy": "隱私政策",
        "Processing": "加工",
        "Province": "省",
        "Purchase order": "採購訂單",
        "Recommended for you": "為你推薦",
        "Recurring total": "經常性總計",
        "Register": "登記",
        "Remove": "消除",
        "Return": "返回",
        "Review your information": "查看您的信息",
        "SHIPPING": "航運",
        "Save changes": "保存更改",
        "Select a country": "選擇一個國家",
        "Select a province": "選擇一個省份",
        "Select a state": "選擇一個州",
        "Ship to": "運送到",
        "Shipping": "船運",
        "Shipping method": "郵寄方式",
        "Sorry, something went wrong. Please refresh the page and try again.": "抱歉，出了一些問題。請刷新頁面並重試。",
        "Sorry, this store does not ship to your location.": "對不起，這家商店不送貨到您的位置。",
        "State": "狀態",
        "Street address": "街道地址",
        "Subtotal": "小計",
        "Tax": "稅",
        "Terms of Service": "服務條款",
        "Test mode: customers cannot see PeachPay": "測試模式：客戶看不到PeachPay",
        "The customer canceled choosing a bank account.": "客戶取消選擇銀行賬戶。",
        "The merchant has not enabled any payment methods": "商戶未啟用任何支付方式",
        "The required mandate was not accepted. Payment canceled.": "未接受所需的授權。付款已取消。",
        "There are no eligible or active payment methods available for this order.": "此訂單沒有可用的合格或有效付款方式。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "此付款方式不支持所選幣種，點擊此消息後幣種將切換為",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "此付款方式不支持所選貨幣。選擇此項後，貨幣將切換為",
        "This payment method does not support the selected currency. Please switch currencies.": "此付款方式不支持所選貨幣。請切換貨幣。",
        "Total": "全部的",
        "US bank account": "美國銀行賬戶",
        "Unable to verify this bank account. Please use a different bank account or choose a new payment method.": "無法驗證此銀行帳戶。請使用其他銀行帳戶或選擇新的付款方式。",
        "Unknown order error occurred": "發生未知訂單錯誤",
        "Use different shipping address": "使用不同的送貨地址",
        "VIEW SAVED CARDS": "查看保存的卡片",
        "Verified": "已驗證",
        "View options": "查看選項",
        "Wire/Bank Transfer": "電匯/銀行轉賬",
        "You entered an invalid coupon code": "您輸入的優惠券代碼無效",
        "You entered an invalid gift card": "您輸入的禮品卡無效",
        "additional": "額外的",
        "and": "和",
        "apply": "申請",
        "coupon": "優惠券",
        "eps Bank": "每股收益銀行",
        "iDEAL Bank": "理想銀行",
        "privacy policy": "隱私政策",
        "pursuant to": "根據",
        "services and/or purchase of products from ": "服務和/或購買產品",
        "terms": "條款",
        "terms and conditions": "條款和條件",
        "the": "這",
        "the store's": "商店的",
        "to debit the bank account specified above for any amount owed for charges arising from your use of": "從上述銀行賬戶中扣除因您使用",
        "website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ": "網站和條款，直到此授權被撤銷。您可以隨時修改或取消此授權，只需通知",
        "with 30 (thirty) days notice.": "提前 30（三十）天通知。"
    }
};
function isDevEnvironment(baseUrl) {
    return baseUrl === 'https://dev.peachpay.app/' || baseUrl === 'https://dev.peachpay.local/' || baseUrl === 'https://prod.peachpay.local/';
}
function capitalizeFirstLetter(string) {
    var stringToUpper = String(string);
    return stringToUpper.charAt(0).toUpperCase() + stringToUpper.slice(1);
}
function peachpayAlert(message, action) {
    if (action === void 0) { action = ''; }
    window.parent.postMessage({
        event: 'peachpayAlert',
        action: action,
        message: message
    }, '*');
}
var initialState = {
    environment: {
        language: 'en-US',
        plugin: {
            version: '',
            mode: 'live',
            pageType: 'cart',
            buttonColor: '#FF876C',
            featureSupport: {}
        },
        customer: {
            existing: false,
            mobile: false,
            saveToLocalStorage: true
        },
        modalUI: {
            open: false,
            page: 'info',
            loadingMode: 'finished',
            requestedPage: undefined
        }
    },
    peachPayOrder: {
        sessionId: '',
        customerAddressValidated: false,
        additionalFields: {},
        errorMessage: ''
    },
    peachPayCustomer: {
        version: 2,
        form_fields: {
            shipping_company: '',
            shipping_email: '',
            shipping_first_name: '',
            shipping_last_name: '',
            shipping_address_1: '',
            shipping_address_2: '',
            shipping_city: '',
            shipping_state: '',
            shipping_country: '',
            shipping_postcode: '',
            shipping_phone: '',
            billing_company: '',
            billing_email: '',
            billing_first_name: '',
            billing_last_name: '',
            billing_address_1: '',
            billing_address_2: '',
            billing_city: '',
            billing_state: '',
            billing_country: '',
            billing_postcode: '',
            billing_phone: ''
        }
    },
    merchantCustomer: {
        username: '',
        loggedIn: false
    },
    merchantConfiguration: {
        id: '',
        name: '',
        hostName: '',
        general: {
            currency: {
                name: 'United States Dollar',
                code: 'USD',
                symbol: '$',
                position: 'left',
                thousands_separator: ',',
                decimal_separator: '.',
                rounding: 'disabled',
                number_of_decimals: 2,
                hidden: false
            }
        },
        shipping: {
            shippingZones: 0
        },
        tax: {
            displayPricesInCartAndCheckout: 'excludeTax'
        },
        accountsAndPrivacy: {
            allowGuestCheckout: true,
            allowAccountLoginDuringCheckout: true,
            allowAccountRegistrationDuringCheckout: true,
            autoGenerateUsername: false,
            autoGeneratePassword: false
        }
    },
    calculatedCarts: {
        0: {
            package_record: {},
            cart: [],
            summary: {
                fees_record: {},
                coupons_record: {},
                gift_card_record: {},
                subtotal: 0,
                total_shipping: 0,
                total_tax: 0,
                total: 0
            },
            cart_meta: {
                is_virtual: false
            }
        }
    },
    paymentConfiguration: {
        selectedPaymentMethod: '',
        providers: {},
        ui: {
            primaryMethods: [
                undefined,
                undefined,
                undefined
            ]
        }
    }
};
var DispatchActionType;
function getInProgressCustomer() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var iFrameWindow;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iFrameWindow = (_a = document.querySelector('#one-click-iframe')) === null || _a === void 0 ? void 0 : _a.contentWindow;
                    if (!iFrameWindow) {
                        return [2, null];
                    }
                    return [4, fetchWindowData(iFrameWindow, 'pp-get-inprogress-customer-data', 2)];
                case 1: return [2, _b.sent()];
            }
        });
    });
}
(function (DispatchActionType) {
    DispatchActionType["INIT"] = 'init';
    DispatchActionType["ENVIRONMENT"] = 'environment';
    DispatchActionType["ORDER_SESSION_ID"] = 'peachpayOrder/sessionId';
    DispatchActionType["ORDER_ADDRESS_VALIDATED"] = 'peachpayOrder/addressValidated';
    DispatchActionType["ORDER_SET_EXTRA_FIELDS"] = 'peachpayOrder/extraFields/set';
    DispatchActionType["ORDER_SET_ERROR_MESSAGE"] = 'peachpayOrder/errorMessage/set';
    DispatchActionType["PEACHPAY_CUSTOMER"] = 'peachpay/customer';
    DispatchActionType["PEACHPAY_CUSTOMER_STRIPE_ID"] = 'peachpay/customer/stripeId';
    DispatchActionType["MERCHANT_CUSTOMER"] = 'merchant/customer';
    DispatchActionType["MERCHANT_CUSTOMER_EXIST"] = 'merchant/customer/exist';
    DispatchActionType["ENVIRONMENT_LANGUAGE"] = 'modal/language';
    DispatchActionType["MERCHANT_NAME"] = 'merchant/name';
    DispatchActionType["MERCHANT_HOSTNAME"] = 'merchant/hostname';
    DispatchActionType["MERCHANT_GENERAL"] = 'merchant/general';
    DispatchActionType["MERCHANT_GENERAL_CURRENCY"] = 'merchant/general/currency';
    DispatchActionType["MERCHANT_ACCOUNT"] = 'merchant/accounts';
    DispatchActionType["MERCHANT_TAX"] = 'merchant/tax';
    DispatchActionType["MERCHANT_SHIPPING"] = 'merchant/shipping';
    DispatchActionType["DEFAULT_CART_CONTENTS"] = 'default/cart/contents';
    DispatchActionType["DEFAULT_CART_CALCULATION"] = 'default/cart/calculation';
    DispatchActionType["CART_CALCULATION"] = 'cart/calculation';
    DispatchActionType["CART_SHIPPING_SELECTION"] = 'cart/shipping/selection';
    DispatchActionType["ENVIRONMENT_SET_FEATURES"] = "ENVIRONMENT_SET_FEATURES";
    DispatchActionType["PEACHPAY_CUSTOMER_SHIPPING"] = "PEACHPAY_CUSTOMER_SHIPPING";
    DispatchActionType["PAYMENT_SET_METHOD"] = "PAYMENT_SET_METHOD";
    DispatchActionType["PAYMENT_REGISTER_PROVIDER"] = "PAYMENT_REGISTER_PROVIDER";
    DispatchActionType["PEACHPAY_CUSTOMER_ADD_PAYMENT_METHOD"] = 'PEACHPAY_CUSTOMER_PAYMENT_METHOD';
    DispatchActionType["PEACHPAY_CUSTOMER_SET_PREFERRED_PAYMENT_METHOD"] = "PEACHPAY_CUSTOMER_SET_PREFERRED_PAYMENT_METHOD";
    DispatchActionType["PEACHPAY_CUSTOMER_REMOVE_PAYMENT_METHOD"] = "PEACHPAY_CUSTOMER_REMOVE_PAYMENT_METHOD";
    DispatchActionType["PEACHPAY_CUSTOMER_FIELDS"] = "PEACHPAY_CUSTOMER_FIELDS";
    DispatchActionType["PAYMENT_INITILIZE_UI"] = "PAYMENT_INITILIZE_UI";
    DispatchActionType["PAYMENT_SWAP_PRIMARY_WITH_SECONDARY"] = "PAYMENT_SWAP_PRIMARY_WITH_SECONDARY";
    DispatchActionType["PAYMENT_SWAP_OUT_PRIMARY"] = "PAYMENT_SWAP_OUT_PRIMARY";
    DispatchActionType["MERCHANT_ID"] = "MERCHANT_ID";
})(DispatchActionType || (DispatchActionType = {}));
function peachPayOrderReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.ORDER_SESSION_ID:
            return __assign(__assign({}, state), { sessionId: action.payload });
        case DispatchActionType.ORDER_ADDRESS_VALIDATED:
            return __assign(__assign({}, state), { customerAddressValidated: action.payload });
        case DispatchActionType.ORDER_SET_EXTRA_FIELDS:
            return __assign(__assign({}, state), { additionalFields: __assign({}, action.payload) });
        case DispatchActionType.ORDER_SET_ERROR_MESSAGE:
            return __assign(__assign({}, state), { errorMessage: action.payload });
        default:
            return __assign({}, state);
    }
}
function environmentReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.ENVIRONMENT:
            return __assign(__assign({}, action.payload), { customer: __assign({}, action.payload.customer), plugin: __assign({}, action.payload.plugin), modalUI: __assign({}, action.payload.modalUI) });
        case DispatchActionType.ENVIRONMENT_LANGUAGE:
            return __assign(__assign({}, state), { language: action.payload });
        case DispatchActionType.ENVIRONMENT_SET_FEATURES:
            return __assign(__assign({}, state), { plugin: __assign(__assign({}, state.plugin), { featureSupport: action.payload }) });
        default:
            return __assign(__assign({}, state), { modalUI: __assign({}, state.modalUI) });
    }
}
function merchantCustomerReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.MERCHANT_CUSTOMER:
            return __assign({}, action.payload);
        default:
            return __assign({}, state);
    }
}
function peachPayCustomerReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.PEACHPAY_CUSTOMER:
            return __assign(__assign({}, state), action.payload);
        case DispatchActionType.PEACHPAY_CUSTOMER_FIELDS:
            return __assign(__assign({}, state), { form_fields: __assign({}, action.payload) });
        case DispatchActionType.PEACHPAY_CUSTOMER_STRIPE_ID:
            return __assign(__assign({}, state), { stripe_customer_id: action.payload });
        case DispatchActionType.PEACHPAY_CUSTOMER_ADD_PAYMENT_METHOD:
            {
                var newState = __assign(__assign({}, state), { payment_methods: __assign({}, state.payment_methods) });
                var payload = action.payload;
                if (!newState.payment_methods) {
                    newState.payment_methods = {};
                }
                if (!newState.payment_methods[payload[0]]) {
                    newState.payment_methods[payload[0]] = [];
                }
                newState.payment_methods[payload[0]].unshift(payload[1]);
                return newState;
            }
        case DispatchActionType.PEACHPAY_CUSTOMER_SET_PREFERRED_PAYMENT_METHOD:
            {
                return __assign(__assign({}, state), { preferred_payment_method: action.payload });
            }
        case DispatchActionType.PEACHPAY_CUSTOMER_SHIPPING:
            {
                if (state.form_fields.ship_to_different_address === '1') {
                    return __assign(__assign({}, state), { form_fields: __assign(__assign({}, state.form_fields), { shipping_country: action.payload.country, shipping_state: action.payload.state, shipping_city: action.payload.city, shipping_postcode: action.payload.postcode }) });
                }
                else {
                    return __assign(__assign({}, state), { form_fields: __assign(__assign({}, state.form_fields), { billing_country: action.payload.country, billing_state: action.payload.state, billing_city: action.payload.city, billing_postcode: action.payload.postcode }) });
                }
            }
        case DispatchActionType.PEACHPAY_CUSTOMER_REMOVE_PAYMENT_METHOD:
            {
                var newState1 = __assign({}, state);
                var payload1 = action.payload;
                if (!newState1.payment_methods) {
                    return newState1;
                }
                var savedMethods = newState1.payment_methods[payload1.id];
                if (!savedMethods) {
                    return newState1;
                }
                savedMethods.splice(Number.parseInt(payload1.index), 1);
                newState1.payment_methods[payload1.id] = savedMethods;
                return newState1;
            }
        default:
            return __assign({}, state);
    }
}
function merchantConfigurationReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.MERCHANT_GENERAL_CURRENCY:
            return __assign(__assign({}, state), { general: __assign(__assign({}, state.general), { currency: __assign({}, action.payload) }) });
        case DispatchActionType.MERCHANT_GENERAL:
            return __assign(__assign({}, state), { general: __assign({}, action.payload) });
        case DispatchActionType.MERCHANT_ACCOUNT:
            return __assign(__assign({}, state), { accountsAndPrivacy: __assign({}, action.payload) });
        case DispatchActionType.MERCHANT_TAX:
            return __assign(__assign({}, state), { tax: __assign({}, action.payload) });
        case DispatchActionType.MERCHANT_SHIPPING:
            return __assign(__assign({}, state), { shipping: __assign({}, action.payload) });
        case DispatchActionType.MERCHANT_HOSTNAME:
            return __assign(__assign({}, state), { hostName: action.payload });
        case DispatchActionType.MERCHANT_NAME:
            return __assign(__assign({}, state), { name: action.payload });
        case DispatchActionType.MERCHANT_ID:
            return __assign(__assign({}, state), { id: action.payload });
        default:
            return Object.assign({}, state);
    }
}
function cartReducer(state, action) {
    var _a;
    switch (action.type) {
        case DispatchActionType.DEFAULT_CART_CONTENTS:
            return __assign(__assign({}, state), { 0: __assign(__assign({}, state['0']), { cart: action.payload }) });
        case DispatchActionType.DEFAULT_CART_CALCULATION:
            return __assign(__assign({}, state), { 0: __assign({}, action.payload) });
        case DispatchActionType.CART_CALCULATION:
            return __assign({}, action.payload);
        case DispatchActionType.CART_SHIPPING_SELECTION:
            {
                var payload = action.payload;
                var newState = __assign({}, state);
                if (!newState[payload.cartKey] || !((_a = newState[payload.cartKey]) === null || _a === void 0 ? void 0 : _a.package_record)) {
                    return newState;
                }
                var packageRecord = newState[payload.cartKey].package_record;
                if (!packageRecord[payload.shippingPackageKey]) {
                    return newState;
                }
                packageRecord[payload.shippingPackageKey].selected_method = payload.packageMethodId;
                return newState;
            }
        default:
            return __assign({}, state);
    }
}
function paymentConfigurationReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.PAYMENT_SET_METHOD:
            return __assign(__assign({}, state), { selectedPaymentMethod: action.payload });
        case DispatchActionType.PAYMENT_REGISTER_PROVIDER:
            return __assign(__assign({}, state), { providers: __assign(__assign({}, state.providers), action.payload) });
        case DispatchActionType.PAYMENT_INITILIZE_UI:
            return __assign(__assign({}, state), { ui: {
                    primaryMethods: __spreadArray([], action.payload.primaryMethods, true)
                } });
        case DispatchActionType.PAYMENT_SWAP_PRIMARY_WITH_SECONDARY:
            {
                var payload = action.payload;
                var existingPrimary = state.ui.primaryMethods;
                return __assign(__assign({}, state), { ui: {
                        primaryMethods: [
                            existingPrimary[0],
                            existingPrimary[1],
                            payload
                        ]
                    } });
            }
        case DispatchActionType.PAYMENT_SWAP_OUT_PRIMARY:
            {
                var payload1 = action.payload;
                return __assign(__assign({}, state), { ui: {
                        primaryMethods: payload1
                    } });
            }
        default:
            return __assign({}, state);
    }
}
function rootReducer(state, action) {
    if (state === void 0) { state = initialState; }
    return __assign(__assign({}, state), { peachPayOrder: peachPayOrderReducer(state.peachPayOrder, action), environment: environmentReducer(state.environment, action), merchantCustomer: merchantCustomerReducer(state.merchantCustomer, action), peachPayCustomer: peachPayCustomerReducer(state.peachPayCustomer, action), merchantConfiguration: merchantConfigurationReducer(state.merchantConfiguration, action), calculatedCarts: cartReducer(state.calculatedCarts, action), paymentConfiguration: paymentConfigurationReducer(state.paymentConfiguration, action) });
}
var store = createStore(rootReducer);
function getBaseURL(merchantHostname, isTestMode) {
    var address = new URL('https://' + merchantHostname);
    merchantHostname = address.host + (address.pathname !== '/' ? address.pathname : '');
    if (isTestMode) {
        switch (merchantHostname) {
            case 'store.local':
            case 'woo.store.local':
                return 'https://dev.peachpay.local/';
            default:
                return 'https://dev.peachpay.app/';
        }
    }
    switch (merchantHostname) {
        case 'localhost':
        case '127.0.0.1':
        case 'woo.peachpay.app':
        case 'theme1.peachpay.app':
        case 'theme2.peachpay.app':
        case 'theme3.peachpay.app':
        case 'theme4.peachpay.app':
        case 'theme5.peachpay.app':
        case 'qa.peachpay.app':
        case 'qa-david.peachpay.app':
        case 'qa-vikrant.peachpay.app':
        case 'demo-plum.peachpay.app':
        case 'demo.peachpay.app':
            return 'https://dev.peachpay.app/';
        case 'store.local':
        case 'woo.store.local':
            return 'https://prod.peachpay.local/';
        default:
            return 'https://prod.peachpay.app/';
    }
}
function createDispatchUpdate(type) {
    return function (payload) { return ({
        type: type,
        payload: payload
    }); };
}
var updateMerchantCurrencyConfig = createDispatchUpdate(DispatchActionType.MERCHANT_GENERAL_CURRENCY);
var updateMerchantTaxConfig = createDispatchUpdate(DispatchActionType.MERCHANT_TAX);
var updateMerchantGeneralConfig = createDispatchUpdate(DispatchActionType.MERCHANT_GENERAL);
var updateMerchantAccountConfig = createDispatchUpdate(DispatchActionType.MERCHANT_ACCOUNT);
var updateMerchantShippingConfig = createDispatchUpdate(DispatchActionType.MERCHANT_SHIPPING);
var updateMerchantHostName = createDispatchUpdate(DispatchActionType.MERCHANT_HOSTNAME);
var updateMerchantName = createDispatchUpdate(DispatchActionType.MERCHANT_NAME);
var updateMerchantId = createDispatchUpdate(DispatchActionType.MERCHANT_ID);
var MerchantConfiguration = {
    id: function () { return store.getState().merchantConfiguration.id; },
    name: function () { return store.getState().merchantConfiguration.name; },
    hostName: function () { return store.getState().merchantConfiguration.hostName; },
    general: {
        wcLocationInfoData: function () { return store.getState().merchantConfiguration.general.wcLocationInfoData; }
    },
    currency: {
        configuration: function () { return store.getState().merchantConfiguration.general.currency; },
        code: function () { return store.getState().merchantConfiguration.general.currency.code; },
        symbol: function () { return store.getState().merchantConfiguration.general.currency.symbol; }
    },
    tax: {
        displayMode: function () { return store.getState().merchantConfiguration.tax.displayPricesInCartAndCheckout; }
    },
    shipping: {
        shippingZones: function () { return store.getState().merchantConfiguration.shipping.shippingZones; }
    },
    accounts: {
        loginDuringCheckoutEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.allowAccountLoginDuringCheckout; },
        registrationDuringCheckoutEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.allowAccountRegistrationDuringCheckout; },
        allowGuestCheckout: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.allowGuestCheckout; },
        generatePasswordEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.autoGeneratePassword; },
        generateUsernameEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.autoGenerateUsername; }
    }
};
function updateEnvironment(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        type: DispatchActionType.ENVIRONMENT,
        payload: {
            language: (_a = options.language) !== null && _a !== void 0 ? _a : Environment.language(),
            customer: {
                existing: (_b = options.customerExists) !== null && _b !== void 0 ? _b : Environment.customer.existing(),
                mobile: (_c = options.customerIsMobile) !== null && _c !== void 0 ? _c : Environment.customer.mobile(),
                saveToLocalStorage: (_d = options.saveToLocalStorage) !== null && _d !== void 0 ? _d : Environment.customer.saveToLocalStorage()
            },
            plugin: {
                version: (_e = options.pluginVersion) !== null && _e !== void 0 ? _e : Environment.plugin.version(),
                mode: typeof options.pluginIsTestMode === 'boolean' ? options.pluginIsTestMode ? 'test' : 'live' : Environment.plugin.mode(),
                buttonColor: (_f = options.pluginButtonColor) !== null && _f !== void 0 ? _f : Environment.plugin.buttonColor(),
                pageType: (_g = options.pluginPageType) !== null && _g !== void 0 ? _g : Environment.plugin.pageType(),
                featureSupport: store.getState().environment.plugin.featureSupport
            },
            modalUI: {
                open: (_h = options.modalIsOpen) !== null && _h !== void 0 ? _h : Environment.modalUI.open(),
                page: (_j = options.modalPageType) !== null && _j !== void 0 ? _j : Environment.modalUI.page(),
                loadingMode: (_k = options.modalLoading) !== null && _k !== void 0 ? _k : Environment.modalUI.loadingMode(),
                requestedPage: (_l = options.requestedPage) !== null && _l !== void 0 ? _l : Environment.modalUI.requestedPage()
            }
        }
    };
}
function setFeatureSupport(features) {
    if (features === void 0) { features = {}; }
    return {
        type: DispatchActionType.ENVIRONMENT_SET_FEATURES,
        payload: features
    };
}
var updateLanguage = createDispatchUpdate(DispatchActionType.ENVIRONMENT_LANGUAGE);
var startModalLoading = function () { return updateEnvironment({
    modalLoading: 'loading'
}); };
var startModalProcessing = function () { return updateEnvironment({
    modalLoading: 'processing'
}); };
var stopModalLoading = function () { return updateEnvironment({
    modalLoading: 'finished'
}); };
var Environment = {
    environment: function () { return store.getState().environment; },
    language: function () { return store.getState().environment.language; },
    testMode: function () { return store.getState().environment.plugin.mode === 'test'; },
    apiURL: function () { return getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()); },
    isTestOrDevSite: function () { return isDevEnvironment(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode())); },
    customer: {
        existing: function () { return store.getState().environment.customer.existing; },
        mobile: function () { return store.getState().environment.customer.mobile; },
        saveToLocalStorage: function () { return store.getState().environment.customer.saveToLocalStorage; }
    },
    plugin: {
        version: function () { return store.getState().environment.plugin.version; },
        mode: function () { return store.getState().environment.plugin.mode; },
        buttonColor: function () { return store.getState().environment.plugin.buttonColor; },
        pageType: function () { return store.getState().environment.plugin.pageType; }
    },
    modalUI: {
        open: function () { return store.getState().environment.modalUI.open; },
        page: function () { return store.getState().environment.modalUI.page; },
        loadingMode: function () { return store.getState().environment.modalUI.loadingMode; },
        requestedPage: function () { return store.getState().environment.modalUI.requestedPage; }
    }
};
function getLocaleText(key) {
    var wpLocale = Environment.language();
    if (wpLocale == 'en-US' || !peachpayi18n[wpLocale] || !peachpayi18n[wpLocale][key]) {
        return key;
    }
    return peachpayi18n[wpLocale][key];
}
var accountLoginExplanation = function () {
    return getLocaleText("An account with this merchant's store allows you to view recent orders, manage your personal information, and make subscriptions for applicable merchants.");
};
function getCustomer() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var iFrameWindow;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iFrameWindow = (_a = document.querySelector('#one-click-iframe')) === null || _a === void 0 ? void 0 : _a.contentWindow;
                    if (!iFrameWindow) {
                        return [2, null];
                    }
                    return [4, fetchWindowData(iFrameWindow, 'pp-get-existing-customer-data', 2)];
                case 1: return [2, _b.sent()];
            }
        });
    });
}
var Feature = {
    enabled: function (flag) { var _a, _b; return (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : false; },
    version: function (flag) { var _a, _b; return (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0; },
    metadata: function (flag, key) { var _a, _b, _c; return (_c = (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : null; },
    dynamicMetadata: function (flag, key, cartKey) {
        var _a, _b, _c, _d;
        if (cartKey === void 0) { cartKey = '0'; }
        return (_d = (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.feature_metadata) === null || _b === void 0 ? void 0 : _b[flag]) === null || _c === void 0 ? void 0 : _c[key]) !== null && _d !== void 0 ? _d : null;
    }
};
var FeatureFlag;
(function (FeatureFlag) {
    FeatureFlag["COUPON_INPUT"] = 'coupon_input';
    FeatureFlag["GIFTCARD_INPUT"] = 'giftcard_input';
    FeatureFlag["ORDER_NOTES_INPUT"] = 'order_notes_input';
    FeatureFlag["VIRTUAL_PRODUCT_FIELDS"] = 'enable_virtual_product_fields';
    FeatureFlag["STRIPE"] = 'stripe_payment_method';
    FeatureFlag["STRIPE_PAYMENT_REQUEST"] = 'stripe_payment_request';
    FeatureFlag["PAYPAL"] = 'paypal_payment_method';
    FeatureFlag["AMAZON"] = 'amazonpay_payment_method';
    FeatureFlag["SQUARE"] = 'square_payment_method';
    FeatureFlag["CURRENCY_SWITCHER_INPUT"] = 'currency_switcher_input';
    FeatureFlag["ONE_CLICK_UPSELL"] = 'peachpay_ocu';
    FeatureFlag["RECOMMENDED_PRODUCTS"] = 'recommended_products';
    FeatureFlag["QUANTITY_CHANGER"] = 'display_quantity_changer';
    FeatureFlag["PRODUCT_IMAGES"] = 'display_product_images';
    FeatureFlag["PURCHASE_ORDER"] = 'purchase_order_payment_method';
    FeatureFlag["COD_PAYMENT"] = 'cod_payment_method';
    FeatureFlag["CHEQUE_PAYMENT"] = 'cheque_payment_method';
    FeatureFlag["BACS_PAYMENT"] = 'bacs_payment_method';
    FeatureFlag["STORE_SUPPORT_MESSAGE"] = 'store_support_message';
    FeatureFlag["FIELD_EDITOR"] = 'enable_field_editor';
    FeatureFlag["USE_WC_COUNTRY_LOCALE"] = 'use_wc_country_locale';
    FeatureFlag["MERCHANT_LOGO"] = 'merchant_logo';
    FeatureFlag["ADDRESS_AUTOCOMPLETE"] = 'address_autocomplete';
    FeatureFlag["BUTTON_SHADOW"] = 'button_shadow';
    FeatureFlag["TRANSACTION_THRESHOLDS"] = 'transaction_thresholds';
})(FeatureFlag || (FeatureFlag = {}));
function addOrderNotesToAdditionalFields(phpData) {
    var _a, _b, _c;
    var fieldData = (_a = phpData === null || phpData === void 0 ? void 0 : phpData.additional_fields) !== null && _a !== void 0 ? _a : [];
    var fieldOrder = (_c = (_b = phpData === null || phpData === void 0 ? void 0 : phpData.additional_fields_order) === null || _b === void 0 ? void 0 : _b.map(function (fo) { return Number(fo); })) !== null && _c !== void 0 ? _c : [];
    if (Feature.enabled(FeatureFlag.ORDER_NOTES_INPUT)) {
        var orderNotesData = {
            'field_default': '',
            'field_enable': 'yes',
            'field_label': getLocaleText('Order notes'),
            'field_name': 'order_comments',
            'field_required': '',
            'type_list': 'text',
            'field_placeholder': ' ',
            'width': '100'
        };
        var temp = Array.from(Array(Object.keys(fieldData).length + 2).keys()).slice(1);
        temp = temp.filter(function (n) { return !fieldOrder.includes(n); });
        var fieldId = temp[0];
        fieldData[fieldId] = orderNotesData;
        fieldOrder.push(fieldId);
    }
    return {
        fieldData: fieldData,
        fieldOrder: fieldOrder
    };
}
function handleResponsiveness() {
    var _a, _b;
    var ppModalContent = $qs("#pp-modal-content");
    if (ppModalContent) {
        var location1 = ppModalContent.classList.contains('pp-content-returning') ? 'existing' : 'new';
        if (window.matchMedia('(max-width: 900px)').matches) {
            (_a = $qs("#pp-".concat(location1, "-customer-checkout"))) === null || _a === void 0 ? void 0 : _a.classList.add('pp-dark-blur');
            ppModalContent.style.height = '100vh';
            ppModalContent.style.overflow = 'hidden';
            ppModalContent.classList.remove('pp-content-pb');
        }
        else {
            (_b = $qs("#pp-".concat(location1, "-customer-checkout"))) === null || _b === void 0 ? void 0 : _b.classList.remove('pp-dark-blur');
            ppModalContent === null || ppModalContent === void 0 ? void 0 : ppModalContent.style.removeProperty('height');
            ppModalContent === null || ppModalContent === void 0 ? void 0 : ppModalContent.style.removeProperty('overflow');
        }
    }
}
function renderModalNavigation(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (modalPage === 'info') {
        (_a = $qs('#pp-exit-mobile')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#pp-back-to-info-mobile')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#pp-back-to-shipping-mobile')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
    }
    else if (modalPage === 'shipping') {
        (_d = $qs('#pp-exit-mobile')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        (_e = $qs('#pp-back-to-info-mobile')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('#pp-back-to-shipping-mobile')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
    }
    else if (modalPage === 'payment') {
        (_g = $qs('#pp-exit-mobile')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#pp-back-to-info-mobile')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
        (_j = $qs('#pp-back-to-shipping-mobile')) === null || _j === void 0 ? void 0 : _j.classList.remove('hide');
    }
}
function renderModalPageIndicator(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    if (modalPage === 'info') {
        (_a = $qs('#pp-checkout-status-left')) === null || _a === void 0 ? void 0 : _a.classList.add('current');
        (_b = $qs('#pp-checkout-status-left-text')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#pp-checkout-status-middle')) === null || _c === void 0 ? void 0 : _c.classList.remove('current');
        (_d = $qs('#pp-checkout-status-middle')) === null || _d === void 0 ? void 0 : _d.classList.add('no-fill');
        (_e = $qs('#pp-checkout-status-middle')) === null || _e === void 0 ? void 0 : _e.removeEventListener('click', backToShipping);
        (_f = $qs('#pp-checkout-status-middle-text')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        (_g = $qs('#pp-checkout-status-right')) === null || _g === void 0 ? void 0 : _g.classList.remove('current');
        (_h = $qs('#pp-checkout-status-right')) === null || _h === void 0 ? void 0 : _h.classList.add('no-fill');
        (_j = $qs('#pp-checkout-status-right')) === null || _j === void 0 ? void 0 : _j.removeEventListener('click', shippingToPayment);
    }
    else if (modalPage === 'shipping') {
        (_k = $qs('#pp-checkout-status-left')) === null || _k === void 0 ? void 0 : _k.classList.remove('current');
        (_l = $qs('#pp-checkout-status-left-text')) === null || _l === void 0 ? void 0 : _l.classList.remove('hide');
        (_m = $qs('#pp-checkout-status-middle')) === null || _m === void 0 ? void 0 : _m.classList.remove('no-fill');
        (_o = $qs('#pp-checkout-status-middle')) === null || _o === void 0 ? void 0 : _o.classList.add('current');
        (_p = $qs('#pp-checkout-status-middle')) === null || _p === void 0 ? void 0 : _p.removeEventListener('click', backToShipping);
        (_q = $qs('#pp-checkout-status-middle-text')) === null || _q === void 0 ? void 0 : _q.classList.add('hide');
        (_r = $qs('#pp-checkout-status-right')) === null || _r === void 0 ? void 0 : _r.classList.remove('current');
        (_s = $qs('#pp-checkout-status-right')) === null || _s === void 0 ? void 0 : _s.classList.add('no-fill');
        (_t = $qs('#pp-checkout-status-right')) === null || _t === void 0 ? void 0 : _t.addEventListener('click', shippingToPayment);
    }
    else if (modalPage === 'payment') {
        (_u = $qs('#pp-checkout-status-left')) === null || _u === void 0 ? void 0 : _u.classList.remove('current');
        (_v = $qs('#pp-checkout-status-left-text')) === null || _v === void 0 ? void 0 : _v.classList.remove('hide');
        (_w = $qs('#pp-checkout-status-middle')) === null || _w === void 0 ? void 0 : _w.classList.remove('current');
        (_x = $qs('#pp-checkout-status-middle')) === null || _x === void 0 ? void 0 : _x.classList.remove('no-fill');
        (_y = $qs('#pp-checkout-status-middle')) === null || _y === void 0 ? void 0 : _y.addEventListener('click', backToShipping);
        (_z = $qs('#pp-checkout-status-middle-text')) === null || _z === void 0 ? void 0 : _z.classList.remove('hide');
        (_0 = $qs('#pp-checkout-status-right')) === null || _0 === void 0 ? void 0 : _0.classList.add('current');
        (_1 = $qs('#pp-checkout-status-right')) === null || _1 === void 0 ? void 0 : _1.classList.remove('no-fill');
        (_2 = $qs('#pp-checkout-status-right')) === null || _2 === void 0 ? void 0 : _2.removeEventListener('click', shippingToPayment);
    }
    (_3 = $qs('#pp-checkout-status-left')) === null || _3 === void 0 ? void 0 : _3.addEventListener('click', backToInfo);
}
var updateCustomerStripeId = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_STRIPE_ID);
var updateCustomerFields = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_FIELDS);
var updateCustomer = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER);
var updateCustomerShippingShortAddress = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_SHIPPING);
var removeSavedPaymentMethod = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_REMOVE_PAYMENT_METHOD);
var updateCustomerPreferredPaymentMethod = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_SET_PREFERRED_PAYMENT_METHOD);
var addSavedPaymentMethod = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_ADD_PAYMENT_METHOD);
function getShippingField(field) {
    var _a, _b, _c;
    var openShippingDetails = (_a = store.getState().peachPayCustomer.form_fields) === null || _a === void 0 ? void 0 : _a.ship_to_different_address;
    return (_c = (_b = store.getState().peachPayCustomer.form_fields) === null || _b === void 0 ? void 0 : _b["".concat(openShippingDetails === '1' ? 'shipping' : 'billing', "_").concat(field)]) !== null && _c !== void 0 ? _c : '';
}
var PeachPayCustomer = {
    data: function () { return store.getState().peachPayCustomer; },
    billing: {
        email: function () { return store.getState().peachPayCustomer.form_fields.billing_email; },
        fullName: function () { return store.getState().peachPayCustomer.form_fields.billing_first_name + ' ' + store.getState().peachPayCustomer.form_fields.billing_last_name; },
        firstName: function () { return store.getState().peachPayCustomer.form_fields.billing_first_name; },
        lastName: function () { return store.getState().peachPayCustomer.form_fields.billing_last_name; },
        phone: function () { return store.getState().peachPayCustomer.form_fields.billing_phone; },
        company: function () { return store.getState().peachPayCustomer.form_fields.billing_company; },
        address1: function () { return store.getState().peachPayCustomer.form_fields.billing_address_1; },
        address2: function () { return store.getState().peachPayCustomer.form_fields.billing_address_2; },
        city: function () { return store.getState().peachPayCustomer.form_fields.billing_city; },
        state: function () { return store.getState().peachPayCustomer.form_fields.billing_state; },
        country: function () { return store.getState().peachPayCustomer.form_fields.billing_country; },
        postal: function () { return store.getState().peachPayCustomer.form_fields.billing_postcode; }
    },
    shipping: {
        email: function () { return getShippingField('email'); },
        fullName: function () { return getShippingField('first_name') + ' ' + getShippingField('first_name'); },
        firstName: function () { return getShippingField('first_name'); },
        lastName: function () { return getShippingField('last_name'); },
        phone: function () { return getShippingField('phone'); },
        company: function () { return getShippingField('company'); },
        address1: function () { return getShippingField('address_1'); },
        address2: function () { return getShippingField('address_2'); },
        city: function () { return getShippingField('city'); },
        state: function () { return getShippingField('state'); },
        country: function () { return getShippingField('country'); },
        postal: function () { return getShippingField('postcode'); }
    },
    shipToDifferentAddress: function () { return store.getState().peachPayCustomer.form_fields.ship_to_different_address === '1'; },
    stripeId: function () { var _a; return (_a = store.getState().peachPayCustomer.stripe_customer_id) !== null && _a !== void 0 ? _a : ''; },
    stripeBillingDetails: function () { return ({
        name: PeachPayCustomer.billing.firstName() + ' ' + PeachPayCustomer.billing.lastName(),
        email: PeachPayCustomer.billing.email(),
        phone: PeachPayCustomer.billing.phone(),
        address: {
            city: PeachPayCustomer.billing.city(),
            country: PeachPayCustomer.billing.country(),
            line1: PeachPayCustomer.billing.address1(),
            line2: PeachPayCustomer.billing.address2(),
            postal_code: PeachPayCustomer.billing.postal(),
            state: PeachPayCustomer.billing.state()
        }
    }); },
    stripeShippingDetails: function () { return ({
        name: PeachPayCustomer.shipping.firstName() + ' ' + PeachPayCustomer.shipping.lastName(),
        phone: PeachPayCustomer.shipping.phone(),
        address: {
            city: PeachPayCustomer.shipping.city(),
            country: PeachPayCustomer.shipping.country(),
            line1: PeachPayCustomer.shipping.address1(),
            line2: PeachPayCustomer.shipping.address2(),
            postal_code: PeachPayCustomer.shipping.postal(),
            state: PeachPayCustomer.shipping.state()
        }
    }); },
    shippingShortAddress: function () { return ({
        country: PeachPayCustomer.shipping.country(),
        state: PeachPayCustomer.shipping.state(),
        city: PeachPayCustomer.shipping.city(),
        postcode: PeachPayCustomer.shipping.postal()
    }); },
    wcShippingAddress: function () { return ({
        shipping_first_name: getShippingField('first_name'),
        shipping_last_name: getShippingField('last_name'),
        shipping_company: getShippingField('company'),
        shipping_country: getShippingField('country'),
        shipping_address_1: getShippingField('address_1'),
        shipping_address_2: getShippingField('address_2'),
        shipping_city: getShippingField('city'),
        shipping_state: getShippingField('state'),
        shipping_postcode: getShippingField('postcode'),
        shipping_phone: getShippingField('phone')
    }); },
    wcBillingAddress: function () { return ({
        billing_first_name: PeachPayCustomer.billing.firstName(),
        billing_last_name: PeachPayCustomer.billing.lastName(),
        billing_company: PeachPayCustomer.billing.company(),
        billing_email: PeachPayCustomer.billing.email(),
        billing_phone: PeachPayCustomer.billing.phone(),
        billing_country: PeachPayCustomer.billing.country(),
        billing_address_1: PeachPayCustomer.billing.address1(),
        billing_address_2: PeachPayCustomer.billing.address2(),
        billing_city: PeachPayCustomer.billing.city(),
        billing_state: PeachPayCustomer.billing.state(),
        billing_postcode: PeachPayCustomer.billing.postal()
    }); },
    retrieveSavedPaymentMethod: function (providerKey, methodKey, savedIndex) {
        var _a, _b, _c, _d, _e, _f, _g;
        var savedKey = providerKey + ':' + methodKey;
        var savedData = (_c = (_b = (_a = store.getState().peachPayCustomer.payment_methods) === null || _a === void 0 ? void 0 : _a[savedKey]) === null || _b === void 0 ? void 0 : _b[Number.parseInt(savedIndex !== null && savedIndex !== void 0 ? savedIndex : '-1')]) !== null && _c !== void 0 ? _c : null;
        var methodData = (_g = (_f = (_e = (_d = store.getState().paymentConfiguration.providers) === null || _d === void 0 ? void 0 : _d[providerKey]) === null || _e === void 0 ? void 0 : _e.methods) === null || _f === void 0 ? void 0 : _f[methodKey]) !== null && _g !== void 0 ? _g : null;
        return [
            savedData,
            methodData
        ];
    },
    retrieveSavedPaymentMethods: function (providerKey, methodKey) {
        var _a, _b, _c, _d, _e, _f;
        var savedKey = providerKey + ':' + methodKey;
        var savedData = (_b = (_a = store.getState().peachPayCustomer.payment_methods) === null || _a === void 0 ? void 0 : _a[savedKey]) !== null && _b !== void 0 ? _b : null;
        var methodData = (_f = (_e = (_d = (_c = store.getState().paymentConfiguration.providers) === null || _c === void 0 ? void 0 : _c[providerKey]) === null || _d === void 0 ? void 0 : _d.methods) === null || _e === void 0 ? void 0 : _e[methodKey]) !== null && _f !== void 0 ? _f : null;
        return [
            savedData,
            methodData
        ];
    },
    preferredPaymentMethod: function () { var _a; return (_a = store.getState().peachPayCustomer.preferred_payment_method) !== null && _a !== void 0 ? _a : null; }
};
function initAdditionalFields(message) {
    var _a = addOrderNotesToAdditionalFields(message.phpData), fieldData = _a.fieldData, fieldOrder = _a.fieldOrder;
    renderAdditionalFields(fieldData, fieldOrder);
}
var setSessionId = createDispatchUpdate(DispatchActionType.ORDER_SESSION_ID);
var updateCustomerAddressValidation = createDispatchUpdate(DispatchActionType.ORDER_ADDRESS_VALIDATED);
var setExtraFields = createDispatchUpdate(DispatchActionType.ORDER_SET_EXTRA_FIELDS);
function syncFields(event) {
    var $form = event.target.closest('form');
    var fieldRecord = {};
    for (var _i = 0, _a = Array.from($form.elements); _i < _a.length; _i++) {
        var $element = _a[_i];
        if ($element.tagName === 'INPUT') {
            var $input = $element;
            if ([
                'radio',
                'checkbox'
            ].includes($input.type)) {
                if ($input.checked) {
                    fieldRecord[$input.name] = $input.value;
                }
                else {
                    continue;
                }
            }
            else {
                fieldRecord[$input.name] = $input.value;
            }
        }
        else if ($element.tagName === 'SELECT') {
            var $select = $element;
            fieldRecord[$select.name] = $select.value;
        }
        else if ($element.tagName === 'TEXTAREA') {
            var $textarea = $element;
            fieldRecord[$textarea.name] = $textarea.value;
        }
    }
    if ($form.id === 'additional-fields-existing') {
        syncExistingAdditionalFieldsPreview(fieldRecord);
    }
    cleanFormFields(fieldRecord);
    store.dispatch(setExtraFields(fieldRecord));
}
function syncExistingAdditionalFieldsPreview(fieldRecord) {
    for (var _i = 0, _a = Object.entries(fieldRecord); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var div = $qs("div[name=".concat(key, "].pp-additional-preview .pp-additional-preview-value"));
        if (div) {
            if (value === '') {
                div.innerHTML = div.classList.contains('required') ? 'Not yet filled out' : 'N/A';
                div.classList.add('initial');
            }
            else {
                div.innerHTML = value;
                div.classList.remove('initial');
            }
            if (div.scrollWidth > div.clientWidth) {
                div.classList.add('faded');
            }
            else {
                div.classList.remove('faded');
            }
        }
    }
}
function generateAdditionalFieldsPreview(fieldData) {
    return "<div class=\"pp-additional-preview\" name=\"".concat(fieldData.field_name, "\">\n\t\t<div class=\"pp-additional-preview-label").concat(fieldData.field_required ? ' required' : '', "\">").concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "</div>\n\t\t<div class=\"pp-additional-preview-value").concat(fieldData.field_required ? ' required' : '', " initial\">").concat(fieldData.field_required ? 'Not yet filled out' : 'N/A', "</div>\n\t\t<div class=\"pp-fade-right\"></div>\n\t</div>");
}
function displayInputStatus(accordionHeader, isInitial) {
    if (isInitial) {
        accordionHeader.classList.add('initial');
    }
    else {
        accordionHeader.classList.remove('initial');
    }
}
function handleNonTextInputAccessibility(event) {
    if ([
        'ENTER',
        ' '
    ].includes(event.key)) {
        var $element = event.target;
        var input = $element.querySelector('input');
        if (input) {
            if (input.type === 'radio') {
                input.checked = true;
            }
            else {
                input.checked = !input.checked;
            }
        }
    }
    syncFields(event);
}
function toggleAccordionCollapseState(accordionHeader) {
    if (accordionHeader.classList.contains('fill')) {
        accordionHeader.classList.remove('fill');
    }
    else {
        accordionHeader.classList.add('fill');
    }
    var $inner = accordionHeader.nextElementSibling;
    if ($inner) {
        if ($inner.classList.contains('collapse')) {
            $inner.classList.remove('collapse');
            $inner.classList.remove('dim');
            $inner.querySelectorAll('input, textarea, select, .pp-radio-line, .pp-checkbox-input-container').forEach(function ($element) {
                $element.setAttribute('tabindex', '0');
                if ($element.classList.contains('pp-radio-line') || $element.classList.contains('pp-checkbox-input-container')) {
                    $element.addEventListener('keypress', handleNonTextInputAccessibility);
                }
            });
        }
        else {
            $inner.classList.add('dim');
            setTimeout(function () {
                $inner.classList.add('collapse');
            }, 300);
            $inner.querySelectorAll('input, textarea, select, .pp-radio-line, .pp-checkbox-input-container').forEach(function ($element) {
                $element.setAttribute('tabindex', '-1');
                if ($element.classList.contains('pp-radio-line') || $element.classList.contains('pp-checkbox-input-container')) {
                    $element.removeEventListener('keypress', handleNonTextInputAccessibility);
                }
            });
        }
    }
    var $chevron = accordionHeader.getElementsByTagName('img')[0];
    if ($chevron) {
        if ($chevron.style.transform === 'scaleY(-1)') {
            $chevron.style.transform = 'scaleY(1)';
        }
        else {
            $chevron.style.transform = 'scaleY(-1)';
        }
    }
}
function inputIsInitial($inner, $field) {
    var isInitial = true;
    if ($field.tagName === 'INPUT') {
        if ($field.type === 'checkbox') {
            isInitial = !$field.checked;
        }
        else if ($field.type === 'radio') {
            var $selectedOption = $inner.querySelector('.extra-field:checked');
            isInitial = $selectedOption === null;
        }
        else {
            isInitial = $field.value === '';
        }
    }
    else {
        isInitial = $field.value === '';
    }
    return isInitial;
}
function accordionHeaderListener(event) {
    var $ah = event.target;
    if ($ah) {
        if ([
            'ENTER',
            ' '
        ].includes(event.key)) {
            event.stopImmediatePropagation();
            toggleAccordionCollapseState($ah);
        }
    }
}
function addAdditionalFieldsEventHandlers() {
    var _a, _b;
    $qsAll('.pp-accordion-header').forEach(function ($ah) {
        $ah.addEventListener('click', function (event) {
            event.stopImmediatePropagation();
            toggleAccordionCollapseState($ah);
        });
    });
    $qsAll('.pp-accordion-section').forEach(function ($as) {
        $as.querySelectorAll('input, textarea, select, .pp-radio-line, .pp-checkbox-input-container').forEach(function ($element) {
            $element.setAttribute('tabindex', '-1');
        });
        var $ah = $as.querySelector('.pp-accordion-header');
        if ($ah) {
            $ah.addEventListener('focus', function () {
                $ah === null || $ah === void 0 ? void 0 : $ah.addEventListener('keypress', accordionHeaderListener);
            });
            $ah.addEventListener('blur', function () {
                $ah === null || $ah === void 0 ? void 0 : $ah.removeEventListener('keypress', accordionHeaderListener);
            });
        }
    });
    $qsAll('.pp-new-field input, .pp-new-field textarea, .pp-new-field select').forEach(function ($element) {
        $element.addEventListener('change', function (event) {
            syncFields(event);
        });
    });
    (_a = $qs('#additional-fields-new')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', syncFields);
    (_b = $qs('#additional-fields-existing')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', syncFields);
}
function collectAdditionalFieldData(fieldData, fieldOrder) {
    var _a, _b, _c;
    var fieldDataRecord = {};
    var location1 = Environment.customer.existing() ? 'existing' : 'new';
    for (var _i = 0, fieldOrder_1 = fieldOrder; _i < fieldOrder_1.length; _i++) {
        var orderNumber = fieldOrder_1[_i];
        var fieldName = fieldData[orderNumber].field_name;
        var temporaryData = {
            name: ''
        };
        temporaryData.label = fieldData[orderNumber].field_label;
        temporaryData.name = fieldName;
        if (fieldData[orderNumber].field_enable) {
            if (fieldData[orderNumber].type_list === 'radio') {
                var $selectedRadio = $qs("input[type=\"radio\"][name=".concat(fieldName, "]:checked"));
                if ($selectedRadio === null || $selectedRadio === void 0 ? void 0 : $selectedRadio.value) {
                    temporaryData.value = $selectedRadio === null || $selectedRadio === void 0 ? void 0 : $selectedRadio.value;
                    fieldDataRecord[temporaryData.name] = (_a = temporaryData.value) !== null && _a !== void 0 ? _a : '';
                }
            }
            else if (fieldData[orderNumber].type_list === 'checkbox') {
                var $checkbox = $qs("input[type=\"checkbox\"][name=".concat(fieldName, "]"));
                temporaryData.value = ($checkbox === null || $checkbox === void 0 ? void 0 : $checkbox.checked) ? 'yes' : 'no';
                fieldDataRecord[temporaryData.name] = (_b = temporaryData.value) !== null && _b !== void 0 ? _b : '';
            }
            else {
                var $element = $qs("#".concat(fieldName, "-").concat(location1));
                temporaryData.value = $element === null || $element === void 0 ? void 0 : $element.value;
                fieldDataRecord[temporaryData.name] = (_c = temporaryData.value) !== null && _c !== void 0 ? _c : '';
            }
        }
    }
    return fieldDataRecord;
}
var setOrderError = createDispatchUpdate(DispatchActionType.ORDER_SET_ERROR_MESSAGE);
var PeachPayOrder = {
    sessionId: function () { return store.getState().peachPayOrder.sessionId; },
    contents: function () { return store.getState().calculatedCarts[0].cart; },
    errorMessage: function () { return store.getState().peachPayOrder.errorMessage; },
    collectSelectedShipping: function () {
        var _a;
        var carts = store.getState().calculatedCarts;
        var selectedShippingMethodsRecord = {};
        for (var _i = 0, _b = Object.keys(carts); _i < _b.length; _i++) {
            var cartKey = _b[_i];
            var cart = carts[cartKey];
            if (!cart) {
                continue;
            }
            for (var _c = 0, _d = Object.keys((_a = cart.package_record) !== null && _a !== void 0 ? _a : {}); _c < _d.length; _c++) {
                var packageKey = _d[_c];
                var packageRecord = cart.package_record[packageKey];
                if (!packageRecord) {
                    continue;
                }
                var shippingKey = cartKey === '0' ? packageKey : "".concat(cartKey, "_").concat(packageKey);
                selectedShippingMethodsRecord[shippingKey] = packageRecord.selected_method;
            }
        }
        return selectedShippingMethodsRecord;
    },
    orderFormRecord: function () {
        var _a = GLOBAL.phpData ? addOrderNotesToAdditionalFields(GLOBAL.phpData) : {
            fieldData: [],
            fieldOrder: []
        }, fieldData = _a.fieldData, fieldOrder = _a.fieldOrder;
        var formInfoRecord = __assign(__assign(__assign(__assign({}, PeachPayCustomer.data().form_fields), PeachPayCustomer.wcBillingAddress()), PeachPayCustomer.wcShippingAddress()), collectAdditionalFieldData(fieldData, fieldOrder));
        cleanFormFields(formInfoRecord);
        formInfoRecord['ship_to_different_address'] = PeachPayCustomer.shipToDifferentAddress() ? '1' : '0';
        for (var _i = 0, _b = Object.entries(PeachPayOrder.collectSelectedShipping()); _i < _b.length; _i++) {
            var _c = _b[_i], packageKey = _c[0], selectedOption = _c[1];
            formInfoRecord["shipping_method[".concat(packageKey, "]")] = selectedOption;
        }
        return formInfoRecord;
    },
    customerAddressValidated: function () { return store.getState().peachPayOrder.customerAddressValidated; },
    extraFieldsRecord: function () { return store.getState().peachPayOrder.additionalFields; }
};
function renderAdditionalFields(fieldData, fieldOrder) {
    var _a, _b, _c;
    if (Feature.enabled(FeatureFlag.ORDER_NOTES_INPUT)) {
        var orderNotesData = {
            'field_default': '',
            'field_enable': 'yes',
            'field_label': 'Order notes',
            'field_name': 'order_comments',
            'field_required': '',
            'type_list': 'text',
            'field_placeholder': ' ',
            'width': '100'
        };
        fieldData[Object.keys(fieldData).length] = orderNotesData;
    }
    if (fieldData.length === 0 || fieldOrder.length === 0) {
        return;
    }
    $qsAll('#additional-fields-new, #additional-fields-existing', function ($element) {
        $element.addEventListener('submit', function (e) {
            e.preventDefault();
            return false;
        });
    });
    (_a = $qs('#additional-fields-new')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    (_b = $qs('#additional-fields-existing')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    (_c = $qs('#pp-existing-checkout-group-additional')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
    generateFields(fieldData, fieldOrder);
    addAdditionalFieldsEventHandlers();
    var previousExtraFields = PeachPayOrder.extraFieldsRecord();
    renderExtraFields(previousExtraFields);
    store.subscribe(function () {
        var extraFields = PeachPayOrder.extraFieldsRecord();
        if (JSON.stringify(previousExtraFields) !== JSON.stringify(extraFields)) {
            renderExtraFields(extraFields);
            previousExtraFields = extraFields;
        }
    });
}
function renderExtraFields(extraFieldData) {
    for (var _i = 0, _a = Object.entries(extraFieldData); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var $element = $qs("[name=\"".concat(key, "\"].extra-field"));
        if (($element === null || $element === void 0 ? void 0 : $element.tagName) === 'INPUT') {
            var $input = $element;
            if ([
                'radio',
                'checkbox'
            ].includes($input.type)) {
                $qsAll("[name=\"".concat(key, "\"][value=\"").concat(value, "\"].extra-field"), function ($radio) { return $radio.checked = true; });
                continue;
            }
            else {
                $input.value = value;
            }
        }
        else if (($element === null || $element === void 0 ? void 0 : $element.tagName) === 'SELECT') {
            var $select = $element;
            $select.value = value;
        }
        else if (($element === null || $element === void 0 ? void 0 : $element.tagName) === 'TEXTAREA') {
            var $textarea = $element;
            $textarea.value = value;
        }
    }
    $qsAll('.pp-accordion-header').forEach(function ($ah) {
        var $inner = $ah.nextElementSibling;
        var $field = $inner.querySelector('input, textarea, select');
        var isInitial = inputIsInitial($inner, $field);
        displayInputStatus($ah, isInitial);
    });
}
function generateFields(fieldData, fieldOrder) {
    var field = function (location1, fieldDataSingle, accordion) { return "<div class=\"pp-new-field\">\n\t\t\t".concat(generateFieldElement(location1, fieldDataSingle, accordion), "\n\t\t</div>"); };
    var newPageElement = document.querySelector('#additional-fields-new');
    var existPageElement = document.querySelector('#additional-fields-existing');
    if (fieldOrder.length === 1) {
        if (newPageElement) {
            newPageElement.innerHTML += field('-new', fieldData[fieldOrder[0]], false);
        }
        if (existPageElement) {
            existPageElement.innerHTML += field('-existing', fieldData[fieldOrder[0]], false);
            existPageElement.innerHTML += "<button id=\"pp-additional-cancel\" class=\"btn pp-section-mt\">\n\t\t\t<span class=\"button-text\">".concat(getLocaleText('Done'), "</span>\n\t\t</button>");
            existPageElement.style.gap = '12px';
            var summaryFields_1 = '';
            fieldOrder.forEach(function (orderNumber) {
                var datum = fieldData[orderNumber];
                summaryFields_1 += generateAdditionalFieldsPreview(datum);
            });
            var preview = $qs('#pp-returning-additional-fields-preview');
            if (preview) {
                preview.innerHTML += summaryFields_1;
            }
        }
    }
    else {
        if (newPageElement) {
            var fields_1 = '';
            fieldOrder.forEach(function (orderNumber) {
                var datum = fieldData[orderNumber];
                var fieldItem = field('-new', datum, true);
                fields_1 += fieldItem;
            });
            newPageElement.innerHTML += fields_1;
        }
        if (existPageElement) {
            var fields1_1 = '';
            var summaryFields1_1 = '';
            fieldOrder.forEach(function (orderNumber) {
                var datum = fieldData[orderNumber];
                fields1_1 += field('-existing', datum, false);
                summaryFields1_1 += generateAdditionalFieldsPreview(datum);
            });
            existPageElement.innerHTML += fields1_1;
            existPageElement.innerHTML += "<button id=\"pp-additional-cancel\" class=\"btn pp-section-mt\">\n\t\t\t<span class=\"button-text\">".concat(getLocaleText('Done'), "</span>\n\t\t</button>");
            var preview1 = $qs('#pp-returning-additional-fields-preview');
            if (preview1) {
                preview1.innerHTML += summaryFields1_1;
            }
        }
    }
}
function generateFieldElement(location1, fieldData, accordion) {
    var _a, _b;
    var elementString = '';
    var accordionBuilder = function (inner) {
        return "\n\t\t\t<div class=\"pp-accordion-section\">\n\t\t\t\t<div class=\"pp-accordion-header".concat(fieldData.field_required ? ' required' : '', "\" tabindex=\"0\">\n\t\t\t\t\t<div class=\"pp-accordion-header-text\">\n\t\t\t\t\t\t").concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"img/chevron-down-solid.svg\" class=\"pp-accordion-arrow\"/>\n\t\t\t\t\t<div class=\"pp-accordion-header-bg\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"accordion-inner dim collapse\" tabindex=\"-1\">\n\t\t\t\t\t").concat(inner, "\n\t\t\t\t</div>\n\t\t\t</div>");
    };
    var formLabelBuilder = function (location1) { return "<label for=\"".concat(fieldData.field_name + location1, "\" class=\"pp-form-label\">\n\t\t\t").concat(fieldData.field_label + (fieldData.field_required ? '*' : !accordion ? ' (optional)' : ''), "\n\t\t</label>"); };
    var labelBuilder = function (location1) { return "<label for=\"".concat(fieldData.field_name + location1, "\">\n\t\t\t").concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t</label>"); };
    var textAreaBuilder = function (location1) {
        var _a;
        var inner = "<textarea type=\"".concat(fieldData.type_list, "\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tclass=\"extra-field\"\n\t\t\tid=\"").concat(fieldData.field_name).concat(location1, "\"\n\t\t\tplaceholder=\"").concat((_a = fieldData.field_placeholder) !== null && _a !== void 0 ? _a : ' ', "\"\n\t\t\t").concat(fieldData.field_default ? "value=\"".concat(fieldData.field_default, "\"") : '', "\n\t\t\t").concat(fieldData.field_required ? 'required' : '', "></textarea>");
        if (!accordion) {
            return "<div class=\"flex-col\">\n\t\t\t\t".concat(inner, "\n\t\t\t\t").concat(fieldData.field_label ? formLabelBuilder(location1) : '', "\n\t\t\t</div>");
        }
        else {
            return accordionBuilder("\n\t\t\t\t<div class=\"flex-col\">\n\t\t\t\t\t".concat(inner, "\n\t\t\t\t\t").concat(fieldData.field_label ? formLabelBuilder(location1) : '', "\n\t\t\t\t</div>"));
        }
    };
    var inputBuilder = function (location1) {
        var _a;
        var inner = "<input type=\"text\"\n\t\t\tname=\"".concat(fieldData.field_name, "\"\n\t\t\tclass=\"extra-field\"\n\t\t\tid=\"").concat(fieldData.field_name + location1, "\"\n\t\t\tplaceholder=\"").concat((_a = fieldData.field_placeholder) !== null && _a !== void 0 ? _a : ' ', "\"\n\t\t\t").concat(fieldData.field_default ? "value=\"".concat(fieldData.field_default, "\"") : '', "\n\t\t\t").concat(fieldData.field_required ? 'required' : '', "/>");
        if (!accordion) {
            return "<div class=\"flex-col\">\n\t\t\t\t".concat(labelBuilder(location1), "\n\t\t\t\t").concat(inner, "</div>");
        }
        else {
            return accordionBuilder("\n\t\t\t\t<div class=\"flex-col\">\n\t\t\t\t\t".concat(inner, "\n\t\t\t\t\t").concat(fieldData.field_label ? formLabelBuilder(location1) : '', "\n\t\t\t\t</div>"));
        }
    };
    var headerBuilder = function () {
        if (!accordion) {
            return "\n\t\t\t\t<div class=\"pp-accordion-section-header pp-accordion-header-text\">\n\t\t\t\t\t".concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t\t\t</div>");
        }
        else {
            return "\n\t\t\t\t<div class=\"pp-accordion-section\">\n\t\t\t\t\t<div class=\"pp-accordion-section-header pp-accordion-header-text\">\n\t\t\t\t\t\t".concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"pp-accordion-section-header pp-accordion-header-bg\"></div>\n\t\t\t\t</div>");
        }
    };
    var selectBuilder = function (location1, optionOrder) {
        var inner = "<select name=".concat(fieldData.field_name, "\n\t\t\tid=\"").concat(fieldData.field_name).concat(location1, "\"\n\t\t\tclass=\"pp-").concat(fieldData.type_list, "-box").concat(location1 === '-new' ? ' new-text' : '', " w-100 extra-field\" ").concat(fieldData.field_required ? 'required' : '', "\n\t\t\t>\n\t\t\t").concat(optionBuilder(optionOrder), "\n\t\t</select>");
        if (!accordion) {
            return "<div class=\"flex-col\">\n\t\t\t\t".concat(labelBuilder(location1), "\n\t\t\t\t").concat(inner, "</div>");
        }
        else {
            return accordionBuilder(inner);
        }
    };
    var optionBuilder = function (optionOrder) {
        if (optionOrder.length === 0) {
            return;
        }
        var optionList = '<option value="">Please Select</option>';
        optionOrder.forEach(function (value) {
            if (value[0] && value[1]) {
                optionList += "<option value=\"".concat(value[0], "\">").concat(value[1], "</option>");
            }
        });
        return optionList;
    };
    var radioFieldBuilder = function (location1, optionOrder) {
        var inner = '';
        optionOrder.forEach(function (value) {
            if (value[0] && value[1]) {
                inner += "\n\t\t\t\t\t<div class=\"pp-radio-line\">\n\t\t\t\t\t\t<input type=".concat(fieldData.type_list, "\n\t\t\t\t\t\t\tname=").concat(fieldData.field_name, " \n\t\t\t\t\t\t\tid=\"").concat(fieldData.field_name + location1 + '-' + value[0], "\"\n\t\t\t\t\t\t\tvalue=\"").concat(value[0], "\"\n\t\t\t\t\t\t\tclass=\"input-").concat(fieldData.type_list, " extra-field\"\n\t\t\t\t\t\t\t").concat(fieldData.field_required ? 'required' : '', "/>\n\t\t\t\t\t\t<label for=\"").concat(fieldData.field_name).concat(location1, "-").concat(value[0], "\">\n\t\t\t\t\t\t\t").concat(value[1], "\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>");
            }
        });
        if (!accordion) {
            return "<div class=\"flex-col\">\n\t\t\t\t".concat(labelBuilder(location1), "\n\t\t\t\t").concat(inner, "</div>");
        }
        else {
            return accordionBuilder(inner);
        }
    };
    var checkboxBuilder = function () {
        var inner = "\n\t\t<div class=\"pp-checkbox-input-container\">\n\t\t<input\n\t\t\ttype=\"checkbox\"\n\t\t\tid=\"".concat(fieldData.field_name, "\"\n\t\t\tclass=\"pp-form-checkbox extra-field\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tvalue=\"").concat(fieldData.field_default ? fieldData.field_default : '1', "\"\n\t\t\tstyle=\"float: right;\"\n\t\t\t").concat(fieldData.field_required ? 'required' : '', "\n\t\t>\n\t\t").concat(labelBuilder(location1), "\n\t\t</div>");
        if (!accordion) {
            return "<div class=\"flex-col\">\n\t\t\t\t".concat(labelBuilder(location1), "\n\t\t\t\t").concat(inner, "</div>");
        }
        else {
            return accordionBuilder(inner);
        }
    };
    if (fieldData.type_list === 'text') {
        elementString = textAreaBuilder(location1);
        return elementString;
    }
    else if (fieldData.type_list === 'select') {
        elementString += selectBuilder(location1, (_a = fieldData.option_order) !== null && _a !== void 0 ? _a : []);
        return elementString;
    }
    else if (fieldData.type_list === 'radio') {
        elementString += radioFieldBuilder(location1, (_b = fieldData.option_order) !== null && _b !== void 0 ? _b : []);
        return elementString;
    }
    else if (fieldData.type_list === 'checkbox') {
        elementString += checkboxBuilder();
        return elementString;
    }
    else if (fieldData.type_list === 'header') {
        elementString += headerBuilder();
        return elementString;
    }
    else {
        elementString = inputBuilder(location1);
        return elementString;
    }
}
function renderModalPage(modalPage) {
    renderInfoPageDisplay(modalPage);
    renderShippingPageDisplay(modalPage);
    renderPaymentPageDisplay(modalPage);
    renderReturningPageDisplay(modalPage);
    renderModalButtonShadow();
}
var updateCartCalculation = createDispatchUpdate(DispatchActionType.CART_CALCULATION);
createDispatchUpdate(DispatchActionType.DEFAULT_CART_CONTENTS);
var updateCartPackageShippingMethod = createDispatchUpdate(DispatchActionType.CART_SHIPPING_SELECTION);
function createCartSelectors(cartKey) {
    if (cartKey === void 0) { cartKey = '0'; }
    return {
        selectedShippingMethod: function (packageKey) {
            var _a, _b, _c, _d;
            if (packageKey === void 0) { packageKey = '0'; }
            return (_d = (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.package_record) === null || _b === void 0 ? void 0 : _b[packageKey]) === null || _c === void 0 ? void 0 : _c.selected_method) !== null && _d !== void 0 ? _d : '';
        },
        selectedShippingMethodDetails: function (packageKey) {
            var _a, _b, _c;
            if (packageKey === void 0) { packageKey = '0'; }
            return (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.package_record) === null || _b === void 0 ? void 0 : _b[packageKey]) !== null && _c !== void 0 ? _c : null;
        },
        contents: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.cart) !== null && _b !== void 0 ? _b : []; },
        subtotal: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.subtotal) !== null && _b !== void 0 ? _b : 0; },
        feeTotal: function (fee) { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.fees_record[fee]) !== null && _b !== void 0 ? _b : 0; },
        totalAppliedFees: function () { var _a, _b; return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.fees_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
            var _ = _a[0], value = _a[1];
            return previousValue + (value !== null && value !== void 0 ? value : 0);
        }, 0); },
        couponTotal: function (coupon) { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record[coupon]) !== null && _b !== void 0 ? _b : 0; },
        totalAppliedCoupons: function () { var _a, _b; return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
            var _ = _a[0], value = _a[1];
            return previousValue + (value !== null && value !== void 0 ? value : 0);
        }, 0); },
        couponRecord: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record) !== null && _b !== void 0 ? _b : {}; },
        giftCardTotal: function (giftCard) { var _a, _b, _c; return (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) === null || _b === void 0 ? void 0 : _b[giftCard]) !== null && _c !== void 0 ? _c : 0; },
        totalAppliedGiftCards: function () { var _a, _b; return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
            var _ = _a[0], value = _a[1];
            return previousValue + (value !== null && value !== void 0 ? value : 0);
        }, 0); },
        totalShipping: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total_shipping) !== null && _b !== void 0 ? _b : 0; },
        totalTax: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total_tax) !== null && _b !== void 0 ? _b : 0; },
        total: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total) !== null && _b !== void 0 ? _b : 0; },
        shippingMethods: function (packageKey) {
            var _a, _b, _c, _d;
            if (packageKey === void 0) { packageKey = '0'; }
            var methods = (_d = (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.package_record) === null || _b === void 0 ? void 0 : _b[packageKey]) === null || _c === void 0 ? void 0 : _c.methods) !== null && _d !== void 0 ? _d : {};
            return Object.entries(methods).map(function (_a) {
                var id = _a[0], method = _a[1];
                method.id = id;
                return method;
            });
        }
    };
}
var DefaultCart = createCartSelectors('0');
var Carts = {
    anyShippingMethodsAvailable: function () {
        for (var _i = 0, _a = Object.keys(store.getState().calculatedCarts); _i < _a.length; _i++) {
            var cartKey = _a[_i];
            var calculatedCart = store.getState().calculatedCarts[cartKey];
            if (!calculatedCart) {
                continue;
            }
            for (var _b = 0, _c = Object.keys(calculatedCart.package_record); _b < _c.length; _b++) {
                var packageKey = _c[_b];
                var shippingPackage = calculatedCart.package_record[packageKey];
                if (!shippingPackage || Object.entries(shippingPackage.methods).length === 0) {
                    continue;
                }
                return true;
            }
        }
        return false;
    },
    virtual: function () {
        for (var _i = 0, _a = Object.keys(store.getState().calculatedCarts); _i < _a.length; _i++) {
            var cartKey = _a[_i];
            var calculatedCart = store.getState().calculatedCarts[cartKey];
            if (!calculatedCart) {
                continue;
            }
            if (!calculatedCart.cart_meta.is_virtual) {
                return false;
            }
        }
        return true;
    },
    anyVirtual: function () {
        var _a;
        var carts = store.getState().calculatedCarts;
        for (var cartKey in carts) {
            var cart = (_a = carts[cartKey]) === null || _a === void 0 ? void 0 : _a.cart;
            if (!cart) {
                continue;
            }
            for (var itemKey in cart) {
                var item = cart[itemKey];
                if (item.virtual)
                    return true;
            }
        }
        return false;
    },
    collectSelectedShipping: function () {
        var _a;
        var carts = store.getState().calculatedCarts;
        var selectedShippingMethods = [];
        for (var _i = 0, _b = Object.values(carts); _i < _b.length; _i++) {
            var cart = _b[_i];
            if (!cart) {
                continue;
            }
            for (var _c = 0, _d = Object.entries((_a = cart.package_record) !== null && _a !== void 0 ? _a : {}); _c < _d.length; _c++) {
                var _e = _d[_c], packageKey = _e[0], packageRecord = _e[1];
                if (!packageRecord) {
                    continue;
                }
                selectedShippingMethods.push({
                    methodKey: "".concat(packageKey),
                    selectedShipping: packageRecord.selected_method
                });
            }
        }
        return selectedShippingMethods;
    },
    subscriptionPresent: function () {
        for (var _i = 0, _a = Object.keys(store.getState().calculatedCarts); _i < _a.length; _i++) {
            var cartKey = _a[_i];
            var calculatedCart = store.getState().calculatedCarts[cartKey];
            if (!calculatedCart) {
                continue;
            }
            if (calculatedCart.cart_meta.subscription) {
                return true;
            }
        }
        return false;
    },
    total: function () {
        var total = 0;
        for (var _i = 0, _a = Object.keys(store.getState().calculatedCarts); _i < _a.length; _i++) {
            var cartKey = _a[_i];
            var calculatedCart = store.getState().calculatedCarts[cartKey];
            if (!calculatedCart) {
                continue;
            }
            total += calculatedCart.summary.total;
        }
        return total;
    }
};
function initPaymentMethods() {
    handleMorePMToggle();
    handlePMTabOptionsEvents();
    handleMoreOptionsEvents();
    handleExpressOptionEvents();
    handleSavedPMOptionEvents();
    handleNewPMOptionButtonEvents();
    handleSavedPMOptionButtonEvents();
    store.subscribe(function () {
        reactToMethodFiltering();
        renderSelectedPM();
        processPMTabOptions();
        setTabIndex();
    });
}
function createCustomDispatchUpdate(type, transformer) {
    return function (input) {
        var payload = transformer(input);
        return {
            type: type,
            payload: payload
        };
    };
}
var setPaymentMethod = createCustomDispatchUpdate(DispatchActionType.PAYMENT_SET_METHOD, function (input) {
    if (input.index) {
        return input.provider + ':' + input.method + ':' + input.index;
    }
    else {
        return input.provider + ':' + input.method;
    }
});
var registerPaymentProvider = createDispatchUpdate(DispatchActionType.PAYMENT_REGISTER_PROVIDER);
var initilizePrimaryPaymentMethodUI = createCustomDispatchUpdate(DispatchActionType.PAYMENT_INITILIZE_UI, function () {
    var _a, _b, _c;
    var primaryMethods = [];
    var eligibleMethods = PaymentConfiguration.allEligibleMethods();
    var stripeCardIndex = eligibleMethods.findIndex(function (pm) { return pm.provider === 'stripe' && pm.method === 'card'; });
    if (stripeCardIndex !== -1) {
        primaryMethods.push({
            provider: 'stripe',
            method: 'card'
        });
        eligibleMethods.splice(stripeCardIndex, 1);
    }
    var squareIndex = eligibleMethods.findIndex(function (pm) { return pm.provider === 'square' && pm.method === 'card'; });
    if (squareIndex !== -1) {
        primaryMethods.push({
            provider: 'square',
            method: 'card'
        });
        eligibleMethods.splice(squareIndex, 1);
    }
    var paypalIndex = eligibleMethods.findIndex(function (pm) { return pm.provider === 'paypal' && pm.method === 'default'; });
    if (paypalIndex !== -1) {
        primaryMethods.push({
            provider: 'paypal',
            method: 'default'
        });
        eligibleMethods.splice(paypalIndex, 1);
    }
    var selectedIndex = eligibleMethods.findIndex(function (pm) { return PaymentConfiguration.selectedProvider() === pm.provider && PaymentConfiguration.selectedProviderMethod() === pm.method; });
    if (selectedIndex !== -1) {
        primaryMethods.push({
            provider: PaymentConfiguration.selectedProvider(),
            method: PaymentConfiguration.selectedProviderMethod()
        });
        eligibleMethods.splice(selectedIndex, 1);
    }
    for (var _i = 0, eligibleMethods_1 = eligibleMethods; _i < eligibleMethods_1.length; _i++) {
        var pm = eligibleMethods_1[_i];
        if (primaryMethods.length > 2) {
            break;
        }
        primaryMethods.push({
            provider: pm.provider,
            method: pm.method
        });
    }
    return {
        primaryMethods: [
            (_a = primaryMethods[0]) !== null && _a !== void 0 ? _a : undefined,
            (_b = primaryMethods[1]) !== null && _b !== void 0 ? _b : undefined,
            (_c = primaryMethods[2]) !== null && _c !== void 0 ? _c : undefined
        ]
    };
});
var swapPrimaryWithSecondary = createDispatchUpdate(DispatchActionType.PAYMENT_SWAP_PRIMARY_WITH_SECONDARY);
var swapOutPrimary = createCustomDispatchUpdate(DispatchActionType.PAYMENT_SWAP_OUT_PRIMARY, function (targetMethod) {
    var existingPrimary = store.getState().paymentConfiguration.ui.primaryMethods;
    var primaryIndex = existingPrimary.indexOf(targetMethod);
    if (!existingPrimary.includes(targetMethod) || primaryIndex < 0) {
        return existingPrimary;
    }
    existingPrimary.splice(primaryIndex, 1);
    var secondaryMethods = PaymentConfiguration.allEligibleMethods().filter(function (method) { return !PaymentConfiguration.isPrimaryMethod(method.provider, method.method); });
    return [
        existingPrimary[0],
        existingPrimary[1],
        secondaryMethods[0]
    ];
});
var PaymentConfiguration = {
    data: function () { return store.getState().paymentConfiguration; },
    selectedPaymentMethod: function () { return store.getState().paymentConfiguration.selectedPaymentMethod; },
    selectedProvider: function () { var _a, _b; return (_b = (_a = store.getState().paymentConfiguration.selectedPaymentMethod.split(':')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ''; },
    selectedProviderMethod: function () { var _a, _b; return (_b = (_a = store.getState().paymentConfiguration.selectedPaymentMethod.split(':')) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : ''; },
    selectedProviderMethodIndex: function () { var _a, _b; return (_b = (_a = store.getState().paymentConfiguration.selectedPaymentMethod.split(':')) === null || _a === void 0 ? void 0 : _a[2]) !== null && _b !== void 0 ? _b : ''; },
    isProviderAndMethodSelected: function (provider, method, index) {
        if (index === void 0) { index = ''; }
        var selected = store.getState().paymentConfiguration.selectedPaymentMethod;
        if (!selected) {
            return false;
        }
        var selectedArray = selected.split(':');
        if (index) {
            return selectedArray[0] === provider && selectedArray[1] === method && selectedArray[2] === index;
        }
        return selectedArray[0] === provider && selectedArray[1] === method;
    },
    isPrimaryMethod: function (providerKey, methodKey) {
        var slot1 = store.getState().paymentConfiguration.ui.primaryMethods[0];
        if (slot1 && slot1.provider === providerKey && slot1.method === methodKey) {
            return true;
        }
        var slot2 = store.getState().paymentConfiguration.ui.primaryMethods[1];
        if (slot2 && slot2.provider === providerKey && slot2.method === methodKey) {
            return true;
        }
        var slot3 = store.getState().paymentConfiguration.ui.primaryMethods[2];
        if (slot3 && slot3.provider === providerKey && slot3.method === methodKey) {
            return true;
        }
        return false;
    },
    eligibleMethod: function (providerKey, methodKey, index) {
        var _a, _b;
        var provider = store.getState().paymentConfiguration.providers[providerKey];
        if (!provider) {
            return false;
        }
        var method = provider.methods[methodKey];
        if (!method) {
            return false;
        }
        var saved = PeachPayCustomer.retrieveSavedPaymentMethod(providerKey, methodKey, index)[0];
        if (!saved && index) {
            return false;
        }
        if (method.initialized !== undefined && method.initialized === false) {
            return false;
        }
        if (method.supports.browser !== undefined && method.supports.browser === false) {
            return false;
        }
        var cartsTotal = Carts.total();
        var minimumTotal = (_a = method.supports.minimumTotal) !== null && _a !== void 0 ? _a : 'n/a';
        var maximumTotal = (_b = method.supports.maximumTotal) !== null && _b !== void 0 ? _b : 'n/a';
        if (minimumTotal !== 'n/a' && !isNaN(parseFloat(minimumTotal)) && cartsTotal < parseFloat(minimumTotal)) {
            return false;
        }
        if (maximumTotal !== 'n/a' && !isNaN(parseFloat(maximumTotal)) && cartsTotal > parseFloat(maximumTotal)) {
            return false;
        }
        var currencyCode = MerchantConfiguration.currency.code();
        if (!method.supports.currencies.includes(currencyCode) && !method.supports.currencies.includes('ALL') && !method.supports.defaultCurrency) {
            return false;
        }
        var customerCountryCode = PeachPayCustomer.billing.country();
        if (!method.supports.customerCountries.includes(customerCountryCode) && !method.supports.customerCountries.includes('ALL')) {
            return false;
        }
        if (Carts.subscriptionPresent()) {
            if (!method.supports.productTypes.includes('subscriptions')) {
                return false;
            }
        }
        if (!PaymentConfiguration.methodValidForSelectedShipping(method)) {
            return false;
        }
        return true;
    },
    eligibleMethodCount: function () {
        var count = 0;
        var data = PaymentConfiguration.data();
        for (var providerKey in data.providers) {
            var provider = data.providers[providerKey];
            if (!provider) {
                continue;
            }
            for (var methodKey in provider.methods) {
                var method = provider.methods[methodKey];
                if (!method) {
                    continue;
                }
                if (PaymentConfiguration.eligibleMethod(providerKey, methodKey)) {
                    count++;
                }
            }
        }
        return count;
    },
    firstEligibleMethod: function () {
        if (PaymentConfiguration.eligibleMethod('stripe', 'card')) {
            return {
                provider: 'stripe',
                method: 'card'
            };
        }
        else if (PaymentConfiguration.eligibleMethod('paypal', 'default')) {
            return {
                provider: 'paypal',
                method: 'default'
            };
        }
        var data = PaymentConfiguration.data();
        for (var providerKey in data.providers) {
            var provider = data.providers[providerKey];
            if (!provider) {
                continue;
            }
            for (var methodKey in provider.methods) {
                var method = provider.methods[methodKey];
                if (!method) {
                    continue;
                }
                if (PaymentConfiguration.eligibleMethod(providerKey, methodKey)) {
                    var saved = PeachPayCustomer.retrieveSavedPaymentMethods(providerKey, methodKey)[0];
                    if (saved === null || saved === void 0 ? void 0 : saved.length) {
                        return {
                            provider: providerKey,
                            method: methodKey,
                            index: '0'
                        };
                    }
                    else {
                        return {
                            provider: providerKey,
                            method: methodKey
                        };
                    }
                }
            }
        }
        return null;
    },
    checkEligibleOrFindAlternate: function (method) {
        if (method && PaymentConfiguration.eligibleMethod(method.provider, method.method, method.index) && PaymentConfiguration.methodSupportsCurrentCurrency(method.provider, method.method)) {
            return method;
        }
        return PaymentConfiguration.firstEligibleMethod();
    },
    getMethodDefaultCurrency: function (providerKey, methodKey) {
        var provider = store.getState().paymentConfiguration.providers[providerKey];
        if (!provider) {
            return null;
        }
        var method = provider.methods[methodKey];
        if (!method) {
            return null;
        }
        return method.supports.defaultCurrency;
    },
    methodSupportsCurrentCurrency: function (providerKey, methodKey) {
        var provider = store.getState().paymentConfiguration.providers[providerKey];
        if (!provider) {
            return false;
        }
        var method = provider.methods[methodKey];
        if (!method) {
            return false;
        }
        var currencyCode = MerchantConfiguration.currency.code();
        if (!method.supports.currencies.includes(currencyCode) && !method.supports.currencies.includes('ALL')) {
            return false;
        }
        return true;
    },
    allEligibleMethods: function () {
        var eligibleMethods = [];
        var data = PaymentConfiguration.data();
        for (var providerKey in data.providers) {
            var provider = data.providers[providerKey];
            if (!provider) {
                continue;
            }
            for (var methodKey in provider.methods) {
                var method = provider.methods[methodKey];
                if (!method) {
                    continue;
                }
                if (PaymentConfiguration.eligibleMethod(providerKey, methodKey)) {
                    eligibleMethods.push({
                        provider: providerKey,
                        method: methodKey,
                        config: method
                    });
                }
            }
        }
        return eligibleMethods;
    },
    selectedMethodConfiguration: function () {
        var data = PaymentConfiguration.data();
        var provider = data.providers[PaymentConfiguration.selectedProvider()];
        var method = provider.methods[PaymentConfiguration.selectedProviderMethod()];
        return method;
    },
    methodValidForSelectedShipping: function (methodConfig) {
        var _a;
        var supportedShipping = methodConfig.supports.shippingMethods;
        var virtual = Carts.virtual();
        if (virtual && !methodConfig.supports.virtualProducts) {
            return false;
        }
        if (supportedShipping.length === 0)
            return true;
        var selectedShipping = (_a = Carts.collectSelectedShipping()[0]) === null || _a === void 0 ? void 0 : _a.selectedShipping;
        if (!selectedShipping)
            return true;
        return supportedShipping.includes(selectedShipping) || supportedShipping.includes(selectedShipping.split(':')[0]);
    }
};
function reactToMethodFiltering() {
    var selectedProviderKey = PaymentConfiguration.selectedProvider();
    var selectedMethodKey = PaymentConfiguration.selectedProviderMethod();
    var primaryMethods = PaymentConfiguration.data().ui.primaryMethods;
    var secondaryMethods = PaymentConfiguration.allEligibleMethods().filter(function (method) { return !PaymentConfiguration.isPrimaryMethod(method.provider, method.method); });
    for (var key in primaryMethods) {
        var method = primaryMethods[key];
        if (!method)
            continue;
        if (!PaymentConfiguration.eligibleMethod(method.provider, method.method)) {
            var secondaryMethods1 = PaymentConfiguration.allEligibleMethods().filter(function (method) { return !PaymentConfiguration.isPrimaryMethod(method.provider, method.method); });
            if (secondaryMethods1.length > 0) {
                store.dispatch(swapOutPrimary(method));
                return;
            }
        }
    }
    if (!PaymentConfiguration.eligibleMethod(selectedProviderKey, selectedMethodKey)) {
        var firstEligibleMethod = PaymentConfiguration.firstEligibleMethod();
        if (firstEligibleMethod) {
            store.dispatch(setPaymentMethod({
                provider: firstEligibleMethod.provider,
                method: firstEligibleMethod.method
            }));
            return;
        }
    }
    if (secondaryMethods.length) {
        for (var _i = 0, primaryMethods_1 = primaryMethods; _i < primaryMethods_1.length; _i++) {
            var method1 = primaryMethods_1[_i];
            if (!method1) {
                store.dispatch(initilizePrimaryPaymentMethodUI());
                return;
            }
        }
    }
}
function handleMorePMToggle() {
    var _a, _b;
    (_a = $qs('#pp-pm-expander img')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        (_a = $qs('#pp-pms-existing')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hide');
        (_b = $qs('#pp-pm-expander img')) === null || _b === void 0 ? void 0 : _b.classList.toggle('selected');
        $qs('#pp-pms-existing', function ($el) {
            if ($el.style.overflow === 'visible') {
                $el.style.overflow = 'hidden';
            }
            else {
                $el.style.overflow = 'visible';
            }
        });
        setTabIndex();
    });
    (_b = $qs('#pp-pm-expander img')) === null || _b === void 0 ? void 0 : _b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            var $target = e.target;
            $target.click();
        }
    });
}
function setTabIndex() {
    var _a;
    var isHidden = (_a = $qs('#pp-pms-existing')) === null || _a === void 0 ? void 0 : _a.classList.contains('hide');
    $qsAll('#pp-pms-existing [tabindex]', function ($el) {
        $el.setAttribute('tabindex', isHidden ? '-1' : '0');
    });
}
function generateMainForm(message) {
    var _a, _b, _c, _d;
    return "<form id=\"pp-info-form\" class=\"pp-info-form pp-info-form-new flex col\"><div class=\"flex col pp-form-rows-container\">" + formGenerator((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields_order) !== null && _d !== void 0 ? _d : [], 'billing') + '</div></form>';
}
function generateShippingForm(message) {
    var _a, _b, _c, _d;
    return '<div class="flex col pp-form-rows-container">' + formGenerator((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields_order) !== null && _d !== void 0 ? _d : [], 'shipping') + '</div>';
}
function initBillingFormReturning(message) {
    var _a, _b, _c, _d;
    return formGenerator((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields_order) !== null && _d !== void 0 ? _d : [], 'billing');
}
function installCustomerFormFields(message) {
    var _a, _b;
    var form = generateMainForm(message);
    (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', form);
    var returningForm = initBillingFormReturning(message);
    (_b = $qs('#pp-info-form-returning .pp-form-rows-container')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterbegin', returningForm);
}
function installCustomerBillingFields(message) {
    var _a;
    var newForm = generateShippingForm(message);
    (_a = $qs('#shipping-details fieldset')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', newForm);
}
function initCustomer(message) {
    initCustomerEvents(message);
}
function captureSentryException(error, extra, fingerprint) {
    try {
        Sentry.withScope(function (scope) {
            if (!extra) {
                extra = {};
            }
            extra['session_id'] = PeachPayOrder.sessionId();
            extra['merchant_name'] = MerchantConfiguration.name();
            extra['merchant_url'] = MerchantConfiguration.hostName();
            extra['plugin_version'] = Environment.plugin.version();
            try {
                Object.entries(extra).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return scope.setExtra(key, value);
                });
            }
            catch (_a) { }
            if (fingerprint) {
                try {
                    scope.setFingerprint(fingerprint);
                }
                catch (_b) { }
            }
            Sentry.captureException(error);
        });
    }
    catch (_a) { }
}
function getOrderService() {
    return {
        placeOrder: placeWCOrder,
        setOrderStatus: setWCOrderStatus,
        addOrderNote: addWCOrderNote,
        getOrderRedirect: getOrderRedirect,
        startTransaction: function (paymentGateway, paymentGatewayVariation) {
            if (paymentGatewayVariation === void 0) { paymentGatewayVariation = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var transactionUpdates, transactionId, complete;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transactionUpdates = [];
                            return [4, createPaymentTransaction(paymentGateway, paymentGatewayVariation)];
                        case 1:
                            transactionId = _a.sent();
                            complete = false;
                            if (!transactionId) {
                                return [2, null];
                            }
                            return [2, {
                                    getId: function () {
                                        return transactionId;
                                    },
                                    update: function (options) {
                                        transactionUpdates.push(options);
                                    },
                                    complete: function (options) { return __awaiter(_this, void 0, void 0, function () {
                                        var update;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (complete) {
                                                        console.error('Developer error: Transaction already completed.');
                                                        return [2, false];
                                                    }
                                                    complete = true;
                                                    if (options) {
                                                        transactionUpdates.push(options);
                                                    }
                                                    if (transactionUpdates.length === 0) {
                                                        return [2, false];
                                                    }
                                                    update = transactionUpdates.reduce(function (pt, ct) { return (__assign(__assign({}, pt), ct)); }, {});
                                                    return [4, updatePaymentTransaction(transactionId, update)];
                                                case 1: return [2, _a.sent()];
                                            }
                                        });
                                    }); }
                                }];
                    }
                });
            });
        }
    };
}
function setWCOrderStatus(order, transaction, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var request, result;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    request = {
                        session: {
                            id: PeachPayOrder.sessionId()
                        },
                        order: {
                            id: order.order_id,
                            status: (_a = options.orderStatus) !== null && _a !== void 0 ? _a : 'pending',
                            message: (_b = options === null || options === void 0 ? void 0 : options.note) !== null && _b !== void 0 ? _b : '',
                            paymentMethod: PaymentConfiguration.selectedProvider(),
                            stripeCustomerId: (_d = (_c = options === null || options === void 0 ? void 0 : options.stripe) === null || _c === void 0 ? void 0 : _c.customer_id) !== null && _d !== void 0 ? _d : undefined,
                            stripeTransactionId: (_f = (_e = options === null || options === void 0 ? void 0 : options.stripe) === null || _e === void 0 ? void 0 : _e.charge_id) !== null && _f !== void 0 ? _f : undefined,
                            paypalTransactionId: (_h = (_g = options === null || options === void 0 ? void 0 : options.paypal) === null || _g === void 0 ? void 0 : _g.transaction_id) !== null && _h !== void 0 ? _h : undefined
                        }
                    };
                    return [4, fetchHostWindowData('pp-set-order-status', request)];
                case 1:
                    result = _j.sent();
                    if (result) {
                        transaction === null || transaction === void 0 ? void 0 : transaction.update(__assign({}, options));
                    }
                    else {
                        transaction === null || transaction === void 0 ? void 0 : transaction.update(__assign(__assign({}, options), { orderStatus: 'unknown' }));
                    }
                    return [2, result];
            }
        });
    });
}
function addWCOrderNote(order, note) {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = {
                        id: order.order_id,
                        note: note
                    };
                    return [4, fetchHostWindowData('pp-add-order-note', request)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function initDeliveryDate() {
    var _a, _b, _c;
    (_a = $qs('#existing-delivery-date')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', checkDeliveryDateIsValid);
    (_b = $qs('#existing-delivery-date')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', updateDeliveryDate);
    (_c = $qs('#delivery-date')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', checkDeliveryDateIsValid);
    store.subscribe(function () {
        renderDeliveryDate();
    });
}
function collectDeliveryDate() {
    var _a, _b;
    return (_b = (_a = $qs('#delivery-date')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
}
var returningCustomerFormIdDifferentiator = 'returning-customer';
var newCustomerFormIdDifferentiator = 'new-customer';
function updateCustomerMerchantAccount(merchantCustomer) {
    return {
        type: DispatchActionType.MERCHANT_CUSTOMER,
        payload: merchantCustomer
    };
}
function initMerchantAccount(message) {
    var _a, _b, _c, _d, _e, _f, _g;
    initMerchantAccountEvents();
    var accountDetails = message.phpData.merchant_customer_account;
    store.dispatch(updateMerchantAccountConfig({
        allowGuestCheckout: (_a = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.allow_guest_checkout) !== null && _a !== void 0 ? _a : true,
        allowAccountLoginDuringCheckout: (_b = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.checkout_login_enabled) !== null && _b !== void 0 ? _b : true,
        allowAccountRegistrationDuringCheckout: (_c = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.checkout_registration_enabled) !== null && _c !== void 0 ? _c : true,
        autoGenerateUsername: (_d = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.auto_generate_username) !== null && _d !== void 0 ? _d : false,
        autoGeneratePassword: (_e = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.auto_generate_password) !== null && _e !== void 0 ? _e : false
    }));
    store.dispatch(updateCustomerMerchantAccount({
        username: (_f = accountDetails.email) !== null && _f !== void 0 ? _f : '',
        loggedIn: (_g = accountDetails.logged_in) !== null && _g !== void 0 ? _g : false
    }));
}
function initMerchantAccountEvents() {
    var currentPage = Environment.modalUI.page();
    store.subscribe(function () {
        if (currentPage !== Environment.modalUI.page()) {
            currentPage = Environment.modalUI.page();
            if (currentPage === 'returning') {
                setEmailFieldDefaultValues(returningCustomerFormIdDifferentiator);
            }
            else if (currentPage == 'payment') {
                setEmailFieldDefaultValues(newCustomerFormIdDifferentiator);
            }
        }
    });
}
function getLoginTypeDefault() {
    if (shouldAllowMerchantCustomerAccountOmission()) {
        return 'none';
    }
    else if (shouldAllowMerchantCustomerAccountLogin()) {
        return 'login';
    }
    else if (shouldAllowMerchantCustomerAccountRegistration()) {
        return 'register';
    }
    return '';
}
function shouldRenderAccountLoginForms() {
    return shouldAllowMerchantCustomerAccountLogin() || shouldAllowMerchantCustomerAccountRegistration();
}
function getCustomerAccountFormHeaderLabel(idDifferentiator) {
    var loginType = getMerchantCustomerAccountLoginType(idDifferentiator);
    var merchantName = MerchantConfiguration.name();
    switch (loginType) {
        case 'login':
            {
                return merchantName + ' ' + getLocaleText('Account login');
            }
        case 'register':
            {
                return merchantName + ' ' + getLocaleText('Account registration');
            }
        case 'none':
        default:
            {
                return '';
            }
    }
}
function getMerchantCustomerAccountLoginType(idDifferentiator) {
    var $checkedLoginTypeRadio = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-type\"]:checked"));
    return $checkedLoginTypeRadio ? $checkedLoginTypeRadio.value : getLoginTypeDefault();
}
function getMerchantCustomerAccountPasswordValue(idDifferentiator, isRegistration) {
    var $input;
    if (isRegistration) {
        $input = $qs("input[name=\"".concat(idDifferentiator, "-store-account-registration-password\"]"));
    }
    else {
        $input = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-password\"]"));
    }
    if (!$input) {
        return '';
    }
    return $input.value;
}
function getMerchantCustomerAccountEmailValue(idDifferentiator, isRegistration) {
    var $input;
    if (isRegistration) {
        $input = $qs("input[name=\"".concat(idDifferentiator, "-store-account-registration-email\"]"));
    }
    else {
        $input = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-email\"]"));
    }
    if (!$input) {
        return '';
    }
    return $input.value;
}
function stateProvinceOrCounty(countryCode) {
    switch (countryCode) {
        case 'US':
        case 'MY':
        case 'AU':
            return [
                getLocaleText('Select a state'),
                getLocaleText('State')
            ];
        case 'GB':
            return [
                getLocaleText('County'),
                null
            ];
        default:
            return [
                getLocaleText('Select a province'),
                getLocaleText('Province')
            ];
    }
}
function isEUCountry(countryCode) {
    var EUCountries = [
        'AT',
        'BE',
        'BG',
        'CY',
        'CZ',
        'DK',
        'EE',
        'FI',
        'FR',
        'DE',
        'GR',
        'HU',
        'IE',
        'IT',
        'LV',
        'LT',
        'LU',
        'MT',
        'NL',
        'PL',
        'PT',
        'RO',
        'SK',
        'SI',
        'ES',
        'SE'
    ];
    if (EUCountries.includes(countryCode)) {
        return true;
    }
    return false;
}
function initVAT(message) {
    initVatEvents();
    if (message.phpData.vat_self_verify === '1') {
        renderVerifyLocation();
    }
    var vatTypesRequiringID = message.phpData.vat_required === '1' || message.phpData.vat_required === '2' && isEUCountry(PeachPayCustomer.shipping.country());
    if (vatTypesRequiringID) {
        renderVATIDInput();
    }
}
function initVatEvents() {
    var _a;
    (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        var _a, _b;
        event.preventDefault();
        var vatTypesRequiringID = ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.vat_required) === '1' || ((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.vat_required) === '2' && isEUCountry(PeachPayCustomer.shipping.country());
        if (vatTypesRequiringID) {
            renderVATIDInput();
        }
    });
}
function renderVATIDInput() {
    var $previousDivs = document.querySelector('#newEUVatDiv');
    $previousDivs === null || $previousDivs === void 0 ? void 0 : $previousDivs.remove();
    var $EUVatDiv = document.createElement('div');
    var $vatForm = document.createElement('form');
    var $vatNumber = document.createElement('input');
    $vatNumber.setAttribute('placeholder', 'required');
    $vatNumber.setAttribute('class', 'vatInput');
    var $prompt = document.createElement('span');
    $prompt.innerHTML = 'Vat Number';
    $vatForm.append($vatNumber);
    $EUVatDiv.append($prompt);
    $EUVatDiv.append($vatForm);
    $EUVatDiv.setAttribute('id', 'EuVatDiv');
    $EUVatDiv.setAttribute('class', 'color-change-text');
    var $insertionLocation;
    var $newCustomer = document.querySelector('#pp-new-customer-checkout');
    if ($newCustomer === null || $newCustomer === void 0 ? void 0 : $newCustomer.classList.contains('hide')) {
        $insertionLocation = document.querySelector('#existing-checkout-card');
        $vatNumber.setAttribute('id', 'ppVatNumExisting');
        $EUVatDiv.setAttribute('class', 'color-change-text');
        $insertionLocation === null || $insertionLocation === void 0 ? void 0 : $insertionLocation.insertAdjacentElement('afterend', $EUVatDiv);
    }
    else {
        $insertionLocation = document.querySelector('#payment-methods');
        $vatNumber.setAttribute('id', 'ppVatNumNew');
        $EUVatDiv.setAttribute('class', 'x-large');
        $EUVatDiv.setAttribute('id', 'newEUVatDiv');
        $insertionLocation === null || $insertionLocation === void 0 ? void 0 : $insertionLocation.insertAdjacentElement('afterend', $EUVatDiv);
    }
}
function getVatNumber() {
    var _a, _b;
    var $newCustomer = document.querySelector('#pp-new-customer-checkout');
    if ($newCustomer === null || $newCustomer === void 0 ? void 0 : $newCustomer.classList.contains('hide')) {
        var $ppVat = document.querySelector('#ppVatNumExisting');
        if (!$ppVat) {
            return '';
        }
        return (_a = $ppVat.value) !== null && _a !== void 0 ? _a : '';
    }
    var $ppVat1 = document.querySelector('#ppVatNumNew');
    if (!$ppVat1) {
        return '';
    }
    return (_b = $ppVat1.value) !== null && _b !== void 0 ? _b : '';
}
function renderVerifyLocation() {
    var $verifyDiv = document.createElement('div');
    var $verifyCheckbox = document.createElement('input');
    var $descriptor = document.createElement('label');
    $verifyCheckbox.setAttribute('id', 'pp_verify_country');
    $verifyCheckbox.setAttribute('type', 'checkbox');
    $verifyCheckbox.setAttribute('value', '1');
    $descriptor.setAttribute('for', 'pp_verify_country');
    $descriptor.innerHTML = getLocaleText('I verify that the country I have entered is the one I reside in');
    $verifyDiv.append($verifyCheckbox);
    $verifyDiv.append($descriptor);
    var $divClone = $verifyDiv.cloneNode(true);
    var $insertionLocation = $qs('#existing-checkout-card');
    var $insertLocation2 = $qs('#payment-methods');
    $insertionLocation === null || $insertionLocation === void 0 ? void 0 : $insertionLocation.insertAdjacentElement('afterend', $verifyDiv);
    $insertLocation2 === null || $insertLocation2 === void 0 ? void 0 : $insertLocation2.insertAdjacentElement('afterend', $divClone);
}
function getVerify() {
    var $isVerified = document.querySelectorAll('#pp_verify_country');
    if ($isVerified[0].checked || $isVerified[1].checked) {
        return '1';
    }
    return '';
}
function placeWCOrder(transaction, extraFormData) {
    var _a, _b, _c;
    if (extraFormData === void 0) { extraFormData = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var requestMessage, currentPage, loginType, isRegistration, loginType1, isRegistration1, _d, validAddress, errorMessage, response, message;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    requestMessage = {
                        session: {
                            id: PeachPayOrder.sessionId()
                        },
                        order: {
                            paymentProvider: PaymentConfiguration.selectedProvider(),
                            paymentMethod: PaymentConfiguration.selectedProviderMethod(),
                            gateway: PaymentConfiguration.selectedMethodConfiguration().gateway,
                            billingAddress: PeachPayCustomer.wcBillingAddress(),
                            formRecord: __assign(__assign({}, PeachPayOrder.orderFormRecord()), extraFormData),
                            deliveryDate: collectDeliveryDate(),
                            merchantCustomerAccountType: '',
                            merchantCustomerAccountEmail: '',
                            merchantCustomerAccountPassword: '',
                            vatNum: '',
                            vatSelfVerify: ''
                        }
                    };
                    currentPage = Environment.modalUI.page();
                    if (currentPage == 'payment' && getMerchantCustomerAccountLoginType(newCustomerFormIdDifferentiator) !== 'none') {
                        loginType = getMerchantCustomerAccountLoginType(newCustomerFormIdDifferentiator);
                        isRegistration = loginType === 'register';
                        requestMessage.order.merchantCustomerAccountType = loginType;
                        requestMessage.order.merchantCustomerAccountEmail = getMerchantCustomerAccountEmailValue(newCustomerFormIdDifferentiator, isRegistration);
                        requestMessage.order.merchantCustomerAccountPassword = getMerchantCustomerAccountPasswordValue(newCustomerFormIdDifferentiator, isRegistration);
                    }
                    else if (currentPage == 'returning' && getMerchantCustomerAccountLoginType(returningCustomerFormIdDifferentiator) !== 'none') {
                        loginType1 = getMerchantCustomerAccountLoginType(returningCustomerFormIdDifferentiator);
                        isRegistration1 = loginType1 === 'register';
                        requestMessage.order.merchantCustomerAccountType = loginType1;
                        requestMessage.order.merchantCustomerAccountEmail = getMerchantCustomerAccountEmailValue(returningCustomerFormIdDifferentiator, isRegistration1);
                        requestMessage.order.merchantCustomerAccountPassword = getMerchantCustomerAccountPasswordValue(returningCustomerFormIdDifferentiator, isRegistration1);
                    }
                    if ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.vat_required) {
                        requestMessage.order.vatNum = getVatNumber();
                    }
                    if ((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.vat_self_verify) {
                        requestMessage.order.vatSelfVerify = getVerify();
                    }
                    _d = validateAddress1(requestMessage.order.formRecord), validAddress = _d[0], errorMessage = _d[1];
                    if (!validAddress) {
                        captureSentryException(new Error("Invalid checkout form data at ".concat(MerchantConfiguration.hostName(), ". Error: ").concat(errorMessage)));
                        store.dispatch(setOrderError("".concat(errorMessage)));
                        transaction === null || transaction === void 0 ? void 0 : transaction.update({
                            orderStatus: 'creationfailed',
                            note: 'Invalid checkout form data'
                        });
                        return [2, {
                                result: 'failure',
                                messages: "".concat(errorMessage),
                                order_id: 0,
                                order_key: '',
                                redirect: '',
                                details: {
                                    id: '',
                                    order_key: '',
                                    total: ''
                                }
                            }];
                    }
                    return [4, fetchHostWindowData('pp-place-order', requestMessage)];
                case 1:
                    response = _e.sent();
                    if (response.result === 'failure') {
                        message = response.message || stripHtml((_c = response.messages) !== null && _c !== void 0 ? _c : '', null) || getLocaleText('Unknown order error occurred');
                        store.dispatch(setOrderError(message));
                        transaction === null || transaction === void 0 ? void 0 : transaction.update({
                            orderStatus: 'creationfailed',
                            order: response,
                            note: message
                        });
                    }
                    transaction === null || transaction === void 0 ? void 0 : transaction.update({
                        orderStatus: 'pending',
                        order: response
                    });
                    return [2, response];
            }
        });
    });
}
function getOrderRedirect(order) {
    var _a;
    var url = order.redirect;
    var orderId = order.order_id;
    var orderKey = order.order_key;
    if ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_woo_thank_you_page_nextmove_lite_active) {
        return "".concat(url.replace('/checkout', ''), "/thank-you/?order_id=").concat(orderId, "&key=").concat(orderKey);
    }
    if (MerchantConfiguration.hostName() === 'rapidfiresupplies.co.uk') {
        return "https://".concat(MerchantConfiguration.hostName(), "/thank-you-for-purchasing-from-us/");
    }
    return order.redirect;
}
function requestCartCalculation(initial) {
    if (initial === void 0) { initial = false; }
    return __awaiter(this, void 0, void 0, function () {
        var requestData, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestData = initial ? {
                        initial: true
                    } : {
                        order: {
                            payment_method: PaymentConfiguration.selectedMethodConfiguration().gateway,
                            payment_method_variation: PaymentConfiguration.selectedProviderMethod(),
                            selected_shipping: PeachPayOrder.collectSelectedShipping(),
                            shipping_location: PeachPayCustomer.shippingShortAddress()
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetchHostWindowData('pp-calculate-cart', requestData)];
                case 2:
                    response = _a.sent();
                    consumeCartCalculationResponse(response);
                    return [3, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        captureSentryException(new Error("Cart calculation V2 failed on ".concat(MerchantConfiguration.hostName(), ". Error: ").concat(error_2.message)));
                    }
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function setInProgressCustomer(customer) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var iFrameWindow;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iFrameWindow = (_a = document.querySelector('#one-click-iframe')) === null || _a === void 0 ? void 0 : _a.contentWindow;
                    if (!iFrameWindow) {
                        return [2, false];
                    }
                    return [4, fetchWindowData(iFrameWindow, 'pp-set-inprogress-customer-data', customer)];
                case 1: return [2, _b.sent()];
            }
        });
    });
}
function initCustomerEvents(message) {
    var _this = this;
    var _a, _b, _c, _d;
    (_a = $qs('#open-shipping-details')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formFields, formFields1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!event.target.checked) return [3, 2];
                    formFields = PeachPayCustomer.data().form_fields;
                    delete formFields['ship_to_different_address'];
                    store.dispatch(updateCustomerFields(formFields));
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [3, 3];
                case 2:
                    formFields1 = PeachPayCustomer.data().form_fields;
                    formFields1['ship_to_different_address'] = '1';
                    store.dispatch(updateCustomerFields(formFields1));
                    _a.label = 3;
                case 3: return [2];
            }
        });
    }); });
    (_b = $qs('#pp-info-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
        var _a;
        var target = event.target;
        if (target && ((_a = target.closest('select')) === null || _a === void 0 ? void 0 : _a.name) === 'billing_country') {
            renderCorrectProvinceField(message.phpData);
            if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                setTimeout(function () {
                    wcCountryLocaleRuleRender('info');
                });
            }
        }
        setTimeout(function () {
            syncCustomerFieldChanges('#pp-info-form');
        });
    });
    (_c = $qs('#pp-info-form-returning')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', function (event) {
        var _a;
        var target = event.target;
        var countryChanged = target && ((_a = target.closest('select')) === null || _a === void 0 ? void 0 : _a.name) === 'billing_country';
        handleReturningInfoformChanges(countryChanged, message.phpData);
    });
    (_d = $qs('#pp-different-shipping-details')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function (event) {
        var _a;
        var target = event.target;
        if (target && ((_a = target.closest('select')) === null || _a === void 0 ? void 0 : _a.name) === 'shipping_country') {
            renderCorrectProvinceField(message.phpData);
            if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                setTimeout(function () {
                    wcCountryLocaleRuleRender('shipping');
                });
            }
        }
        setTimeout(function () {
            if (PeachPayCustomer.shipToDifferentAddress()) {
                syncCustomerFieldChanges('#pp-different-shipping-details');
            }
        });
    });
    var previousShipToDifferentAddress = PeachPayCustomer.shipToDifferentAddress();
    var previousCustomerStr = JSON.stringify(PeachPayCustomer.data()) + Environment.customer.existing();
    var previousOpen = Environment.modalUI.open();
    var previousModalPage = Environment.modalUI.page();
    store.subscribe(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        if (Environment.modalUI.open()) {
            var customer = PeachPayCustomer.data();
            var shipToDifferentAddress = PeachPayCustomer.shipToDifferentAddress();
            var customerStr = JSON.stringify(customer);
            var modalPage_1 = Environment.modalUI.page();
            var cartIsVirtual_1 = Carts.virtual();
            if (Environment.modalUI.open() && !previousOpen) {
                renderCountryAndStateList((_a = message.phpData.wc_location_info) !== null && _a !== void 0 ? _a : undefined);
                renderCorrectProvinceField(message.phpData);
                if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                    setTimeout(function () {
                        wcCountryLocaleRuleRender(modalPage_1);
                    });
                }
            }
            if (shipToDifferentAddress && !previousShipToDifferentAddress) {
                renderCountryAndStateList((_b = message.phpData.wc_location_info) !== null && _b !== void 0 ? _b : undefined);
                if (previousModalPage === 'returning') {
                    renderCorrectProvinceField(message.phpData, 'info');
                    renderCorrectProvinceField(message.phpData, 'shipping');
                    if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                        setTimeout(function () {
                            wcCountryLocaleRuleRender('info');
                            wcCountryLocaleRuleRender('shipping');
                        });
                    }
                }
                else {
                    renderCorrectProvinceField(message.phpData);
                    if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                        setTimeout(function () {
                            wcCountryLocaleRuleRender(modalPage_1);
                        });
                    }
                }
            }
            if (modalPage_1 === 'info' || modalPage_1 === 'shipping' || modalPage_1 === 'returning') {
                if (Carts.virtual()) {
                    if (Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS)) {
                        hideShippingDetails(true, (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields) !== null && _d !== void 0 ? _d : [], (_f = (_e = message.phpData) === null || _e === void 0 ? void 0 : _e.billing_fields_order) !== null && _f !== void 0 ? _f : []);
                        $qs('span[data-i18n=", "]', function (element) {
                            element.classList.add('hide');
                        });
                        $qs('#pp-refresh-shipping-options', function ($element) {
                            $element.style.display = 'none';
                        });
                    }
                    else {
                        hideShippingDetails(false, (_h = (_g = message.phpData) === null || _g === void 0 ? void 0 : _g.billing_fields) !== null && _h !== void 0 ? _h : [], (_k = (_j = message.phpData) === null || _j === void 0 ? void 0 : _j.billing_fields_order) !== null && _k !== void 0 ? _k : []);
                    }
                    $qs('#open-shipping-details', function ($element) {
                        $element.checked = false;
                        $element.disabled = true;
                    });
                    $qs('#pp-shipping-options', function ($element) { return $element.classList.add('hide'); });
                    (_l = $qs('#shipping-details')) === null || _l === void 0 ? void 0 : _l.classList.add('hide');
                    (_m = $qs('#shipping-details fieldset')) === null || _m === void 0 ? void 0 : _m.setAttribute('disabled', '');
                    $qs('#shipping-options-container-address', function ($element) { return $element.classList.remove('pp-opacity-0'); });
                    $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
                }
                else {
                    hideShippingDetails(false, (_p = (_o = message.phpData) === null || _o === void 0 ? void 0 : _o.billing_fields) !== null && _p !== void 0 ? _p : [], (_r = (_q = message.phpData) === null || _q === void 0 ? void 0 : _q.billing_fields_order) !== null && _r !== void 0 ? _r : []);
                    if (PeachPayCustomer.shipToDifferentAddress()) {
                        $qs('#open-shipping-details', function ($element) {
                            $element.checked = true;
                            $element.disabled = false;
                        });
                        (_s = $qs('#shipping-details')) === null || _s === void 0 ? void 0 : _s.classList.remove('hide');
                        (_t = $qs('#shipping-details fieldset')) === null || _t === void 0 ? void 0 : _t.removeAttribute('disabled');
                        $qs('#pp-refresh-shipping-options', function ($element) {
                            $element.style.display = 'block';
                        });
                        $qs('#shipping-options-container-address', function ($element) { return $element.classList.add('pp-opacity-0'); });
                        $qs('#pp-shipping-options', function ($element) { return $element.classList.add('hide'); });
                        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
                    }
                    else {
                        (_u = $qs('#shipping-details')) === null || _u === void 0 ? void 0 : _u.classList.add('hide');
                        $qs('#pp-refresh-shipping-options', function ($element) {
                            $element.style.display = 'none';
                        });
                        $qs('#shipping-options-container-address', function ($element) { return $element.classList.remove('pp-opacity-0'); });
                        $qs('#pp-shipping-options', function ($element) { return $element.classList.remove('hide'); });
                        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
                    }
                }
            }
            if (modalPage_1 === 'shipping' || modalPage_1 === 'returning') {
                renderCustomerHeader(customer);
                if (cartIsVirtual_1) {
                    $qs('#open-shipping-details-href', function (element) {
                        element.classList.add('hide');
                    });
                    $qs('#pp-return-address-line', function (element) {
                        element.classList.add('hide');
                    });
                    $qs('#pp-shipping-details-container', function (element) {
                        element.classList.add('hide');
                    });
                }
                else {
                    $qs('#open-shipping-details-href', function (element) {
                        element.classList.remove('hide');
                    });
                    $qs('#pp-return-address-line', function (element) {
                        element.classList.remove('hide');
                    });
                    $qs('#pp-shipping-details-container', function (element) {
                        element.classList.remove('hide');
                    });
                }
            }
            if ((previousCustomerStr !== customerStr || previousModalPage !== modalPage_1) && (modalPage_1 !== 'returning' || !previousOpen)) {
                renderCustomerFields(customer);
                setInProgressCustomer(customer);
            }
            previousShipToDifferentAddress = shipToDifferentAddress;
            previousCustomerStr = customerStr;
            previousModalPage = modalPage_1;
            previousOpen = true;
        }
        else {
            previousOpen = false;
            return;
        }
    });
}
function hideShippingDetails(hide, fieldData, fieldOrder) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var defaultFieldNames = [
        'billing_address_1',
        'billing_address_2',
        'billing_postcode',
        'billing_city',
        'billing_state',
        'billing_country',
    ];
    var customerDataRequiredFields = [];
    fieldOrder.forEach(function (order) {
        if (defaultFieldNames.includes(fieldData[order].field_name) && fieldData[order].field_required) {
            customerDataRequiredFields.push(fieldData[order].field_name);
        }
    });
    var customerDataEnableFields = [];
    fieldOrder.forEach(function (order) {
        if (defaultFieldNames.includes(fieldData[order].field_name) && fieldData[order].field_enable) {
            customerDataEnableFields.push(fieldData[order].field_name);
        }
    });
    var formName = "pp-info-form".concat(Environment.customer.existing() ? '-returning' : '-new');
    if (hide) {
        customerDataEnableFields.forEach(function (fieldName) {
            $qsAll(".".concat(formName, " .").concat(fieldName, "-field"), function ($element) {
                $element.classList.add('hide');
            });
        });
    }
    else if (!hide) {
        customerDataEnableFields.forEach(function (fieldName) {
            $qsAll(".".concat(formName, " .").concat(fieldName, "-field"), function ($element) {
                $element.classList.remove('hide');
            });
        });
    }
    var info = PeachPayCustomer.billing;
    var stateFieldInfo = (_d = (_c = (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_location_info) === null || _b === void 0 ? void 0 : _b.country_locale_data) === null || _c === void 0 ? void 0 : _c[info.country()]) === null || _d === void 0 ? void 0 : _d.state;
    var postalFieldInfo = (_h = (_g = (_f = (_e = GLOBAL.phpData) === null || _e === void 0 ? void 0 : _e.wc_location_info) === null || _f === void 0 ? void 0 : _f.country_locale_data) === null || _g === void 0 ? void 0 : _g[info.country()]) === null || _h === void 0 ? void 0 : _h.state;
    if (hide) {
        customerDataRequiredFields.forEach(function (fieldName) {
            if ((fieldName === 'billing_country' || fieldName === 'billing_state') && !isRequiredField(fieldName, fieldData)) {
                $qs(".".concat(formName, " .").concat(fieldName, "-field select"), function ($element) {
                    $element.removeAttribute('required');
                });
                return;
            }
            $qs(".".concat(formName, " .").concat(fieldName, "-field input"), function ($element) {
                $element.removeAttribute('required');
            });
        });
    }
    else if (!hide) {
        customerDataRequiredFields.forEach(function (fieldName) {
            if (fieldName === 'billing_country') {
                $qs(".".concat(formName, " .").concat(fieldName, "-field select"), function ($element) {
                    $element.setAttribute('required', '');
                });
                return;
            }
            if (fieldName === 'billing_state') {
                $qs(".".concat(formName, " .").concat(fieldName, "-field select"), function ($element) {
                    $element.required = isRequiredField(fieldName, fieldData, stateFieldInfo);
                });
                return;
            }
            if (fieldName === 'billing_postcode') {
                $qs(".".concat(formName, " .").concat(fieldName, "-field input"), function ($element) {
                    $element.required = isRequiredField(fieldName, fieldData, postalFieldInfo);
                });
                return;
            }
            $qs(".".concat(formName, " .").concat(fieldName, "-field input"), function ($element) {
                $element.setAttribute('required', '');
            });
        });
    }
}
function handleReturningInfoformChanges(countryChanged, phpData) {
    var _a;
    if (countryChanged) {
        renderCorrectProvinceField(phpData);
        if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
            setTimeout(function () {
                wcCountryLocaleRuleRender('returning');
            });
        }
    }
    (_a = $qs('#pp-ship-to-existing-save')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
}
function wcCountryLocaleRuleRender(page) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var infoFormName;
    var section;
    if (page === 'shipping') {
        infoFormName = '#pp-different-shipping-details';
        section = 'shipping';
    }
    else if (page === 'info') {
        infoFormName = '#pp-info-form';
        section = 'billing';
    }
    else if (page === 'returning') {
        infoFormName = '#pp-info-form-returning';
        section = 'billing';
    }
    else {
        return;
    }
    var countryElement = $qs("".concat(infoFormName, " [name=\"").concat(section, "_country\"]"));
    var country = countryElement.value;
    if (!country) {
        return;
    }
    var fieldData = section === 'billing' ? (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [] : (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields) !== null && _d !== void 0 ? _d : [];
    var fieldStateFieldInfo = (_g = (_f = (_e = GLOBAL.phpData) === null || _e === void 0 ? void 0 : _e.wc_location_info) === null || _f === void 0 ? void 0 : _f.country_locale_data[country]) === null || _g === void 0 ? void 0 : _g.state;
    var fieldPostalCodeFieldInfo = (_k = (_j = (_h = GLOBAL.phpData) === null || _h === void 0 ? void 0 : _h.wc_location_info) === null || _j === void 0 ? void 0 : _j.country_locale_data[country]) === null || _k === void 0 ? void 0 : _k.postcode;
    var fieldCityFieldInfo = (_o = (_m = (_l = GLOBAL.phpData) === null || _l === void 0 ? void 0 : _l.wc_location_info) === null || _m === void 0 ? void 0 : _m.country_locale_data[country]) === null || _o === void 0 ? void 0 : _o.city;
    if (fieldStateFieldInfo) {
        wcStatefieldRule(fieldStateFieldInfo, section, infoFormName);
    }
    else {
        unhideFields('state', section, fieldData, infoFormName);
    }
    if (fieldPostalCodeFieldInfo) {
        wcPostalCodeFieldRule(fieldPostalCodeFieldInfo, section, infoFormName);
    }
    else {
        unhideFields('postcode', section, fieldData, infoFormName);
    }
    if (fieldCityFieldInfo) {
        wcCityFieldRule(fieldCityFieldInfo, section, infoFormName);
    }
    else {
        unhideFields('city', section, fieldData, infoFormName);
    }
}
function wcStatefieldRule(stateFieldInfo, section, formIdentifier) {
    var _a, _b, _c, _d;
    var stateField = "".concat(section, "_state-field");
    var fieldData = section === 'billing' ? (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [] : (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields) !== null && _d !== void 0 ? _d : [];
    if ((stateFieldInfo === null || stateFieldInfo === void 0 ? void 0 : stateFieldInfo.hidden) !== undefined && stateFieldInfo.hidden) {
        $qs("".concat(formIdentifier, " .").concat(stateField), function ($element) {
            var _a;
            $element.setAttribute('style', 'display : none;');
            var list = (_a = $element.closest('.pp-form-row')) === null || _a === void 0 ? void 0 : _a.children;
            if (list !== undefined) {
                for (var i = 0; i < list.length; i++) {
                    if (!list[i].classList.contains(stateField)) {
                        list[i].setAttribute('style', 'flex-grow : 1;');
                    }
                    else {
                        list[i].classList.add('hide');
                    }
                }
            }
        });
    }
    else {
        $qs("".concat(formIdentifier, " .").concat(stateField), function ($element) {
            var _a;
            $element.removeAttribute('style');
            var list = (_a = $element.closest('.pp-form-row')) === null || _a === void 0 ? void 0 : _a.children;
            if (list !== undefined) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].classList.contains(stateField)) {
                        list[i].classList.remove('hide');
                    }
                    else {
                        list[i].removeAttribute('style');
                    }
                }
            }
        });
    }
    $qs("".concat(formIdentifier, " [name=\"").concat(section, "_state\"]"), function ($element) {
        $element.required = isRequiredField("".concat(section, "_state"), fieldData, stateFieldInfo);
    });
}
function wcPostalCodeFieldRule(postcodeFieldInfo, section, formIdentifier) {
    var _a, _b, _c, _d;
    var postcodeField = "".concat(section, "_postcode-field");
    var fieldData = section === 'billing' ? (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [] : (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields) !== null && _d !== void 0 ? _d : [];
    if ((postcodeFieldInfo === null || postcodeFieldInfo === void 0 ? void 0 : postcodeFieldInfo.hidden) !== undefined && postcodeFieldInfo.hidden) {
        $qs("".concat(formIdentifier, " .").concat(postcodeField), function ($element) {
            var _a;
            $element.setAttribute('style', 'display : none;');
            var list = (_a = $element.closest('.pp-form-row')) === null || _a === void 0 ? void 0 : _a.children;
            if (list !== undefined) {
                for (var i = 0; i < list.length; i++) {
                    if (!list[i].classList.contains(postcodeField)) {
                        list[i].setAttribute('style', 'flex-grow : 1;');
                    }
                    else {
                        list[i].classList.add('hide');
                    }
                }
            }
        });
    }
    else {
        $qs("".concat(formIdentifier, " .").concat(postcodeField), function ($element) {
            var _a;
            $element.removeAttribute('style');
            var list = (_a = $element.closest('.pp-form-row')) === null || _a === void 0 ? void 0 : _a.children;
            if (list !== undefined) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].classList.contains(postcodeField)) {
                        list[i].classList.remove('hide');
                    }
                    else {
                        list[i].removeAttribute('style');
                    }
                }
            }
        });
    }
    $qs("".concat(formIdentifier, " [name=\"").concat(section, "_postcode\"]"), function ($element) {
        $element.required = isRequiredField("".concat(section, "_postcode"), fieldData, postcodeFieldInfo);
    });
}
function wcCityFieldRule(cityFieldInfo, section, formIdentifier) {
    var _a, _b, _c, _d;
    var fieldData = section === 'billing' ? (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [] : (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields) !== null && _d !== void 0 ? _d : [];
    $qs("".concat(formIdentifier, " [name=\"").concat(section, "_city\"]"), function ($element) {
        $element.required = isRequiredField("".concat(section, "_city"), fieldData, cityFieldInfo);
    });
}
function unhideFields(fieldName, section, fieldData, formIdentifier) {
    var _a, _b, _c, _d;
    var fieldAttributeName = section + '_' + fieldName;
    $qs("".concat(formIdentifier, " [name=\"").concat(fieldAttributeName, "\"]"), function ($element) {
        $element.required = isRequiredField("".concat(fieldAttributeName), fieldData);
    });
    if (fieldName === 'city') {
        return;
    }
    var fieldOrder = section === 'billing' ? (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields_order) !== null && _b !== void 0 ? _b : [] : (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields_order) !== null && _d !== void 0 ? _d : [];
    var enabledField = false;
    fieldOrder.forEach(function (order) {
        if (fieldData[order].field_name === fieldAttributeName && fieldData[order].field_enable) {
            enabledField = true;
            return;
        }
    });
    if (enabledField) {
        $qs("".concat(formIdentifier, " .").concat(fieldAttributeName, "-field"), function ($element) {
            var _a;
            $element.removeAttribute('style');
            var list = (_a = $element.closest('.pp-form-row')) === null || _a === void 0 ? void 0 : _a.children;
            if (list !== undefined) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].classList.contains("".concat(fieldAttributeName, "-field"))) {
                        list[i].classList.remove('hide');
                    }
                    else {
                        list[i].removeAttribute('style');
                    }
                }
            }
        });
    }
}
function collectCustomerFieldData(formIdentifier, requestedFields) {
    var $form = $qs(formIdentifier);
    if ($form) {
        var formData_1 = new FormData($form);
        var formFields_1 = __assign({}, PeachPayCustomer.data().form_fields);
        var selector_1 = '';
        if (requestedFields) {
            requestedFields.forEach(function (fieldName, index) {
                selector_1 += "".concat(formIdentifier, " [name=\"").concat(fieldName, "\"]");
                if (index < requestedFields.length - 1) {
                    selector_1 += ', ';
                }
            });
        }
        else {
            selector_1 = "".concat(formIdentifier, " .pp-form-row :not(label):not(div):not(span):not([disabled]):not([name=\"off\"])");
        }
        $qsAll(selector_1, function (element) {
            var _a, _b, _c;
            switch (element.tagName) {
                case 'INPUT':
                    {
                        var input = element;
                        if (input.type === 'radio' && input.checked) {
                            var fieldName = (_c = (_b = (_a = input.closest('.pp-radio-field')) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.getAttribute('for')) !== null && _c !== void 0 ? _c : '';
                            formFields_1[fieldName] = formEntry(formData_1, input.name);
                        }
                        else {
                            formFields_1[input.name] = formEntry(formData_1, input.name);
                        }
                        break;
                    }
                case 'SELECT':
                    {
                        var select = element;
                        formFields_1[select.name] = formEntry(formData_1, select.name);
                        break;
                    }
            }
        });
        return formFields_1;
    }
    return null;
}
function syncCustomerFieldChanges(formIdentifier) {
    var formFields = collectCustomerFieldData(formIdentifier);
    if (formFields) {
        cleanFormFields(formFields);
        var refreshCurrencySwitchFeature = formFields.billing_country !== PeachPayCustomer.billing.country();
        store.dispatch(updateCustomerFields(formFields));
        if (refreshCurrencySwitchFeature) {
            self.dispatchEvent(new CustomEvent('pp-update-currency-switcher-feature'));
        }
    }
}
function loadCustomer() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var customer, inprogressCustomer, locationInfo;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, getCustomer()];
                case 1:
                    customer = _c.sent();
                    if (!(customer === null)) return [3, 3];
                    return [4, getInProgressCustomer()];
                case 2:
                    inprogressCustomer = _c.sent();
                    if (inprogressCustomer !== null) {
                        store.dispatch(updateCustomer(inprogressCustomer));
                        return [2];
                    }
                    locationInfo = MerchantConfiguration.general.wcLocationInfoData();
                    store.dispatch(updateCustomerFields(__assign(__assign({}, PeachPayCustomer.data().form_fields), { shipping_country: (_b = (_a = locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.customer_default_country) !== null && _a !== void 0 ? _a : locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.store_country) !== null && _b !== void 0 ? _b : '' })));
                    return [2];
                case 3:
                    cleanFormFields(customer.form_fields);
                    store.dispatch(updateCustomer(customer));
                    store.dispatch(updateEnvironment({
                        customerExists: true,
                        modalPageType: 'returning'
                    }));
                    return [2];
            }
        });
    });
}
function setCustomer(customer) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var iFrameWindow;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iFrameWindow = (_a = document.querySelector('#one-click-iframe')) === null || _a === void 0 ? void 0 : _a.contentWindow;
                    if (!iFrameWindow) {
                        return [2, false];
                    }
                    return [4, fetchWindowData(iFrameWindow, 'pp-set-existing-customer-data', customer)];
                case 1: return [2, _b.sent()];
            }
        });
    });
}
function saveCustomerToBrowser() {
    return __awaiter(this, void 0, void 0, function () {
        var customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customer = PeachPayCustomer.data();
                    if (!Environment.customer.saveToLocalStorage()) return [3, 2];
                    return [4, setCustomer(customer)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2, customer];
            }
        });
    });
}
function formatCurrencyString(cost) {
    var _a = MerchantConfiguration.currency.configuration(), symbol = _a.symbol, position = _a.position;
    if (typeof cost !== 'number') {
        cost = 0;
    }
    var formattedCurrency = '';
    if (position === 'left' || position === 'left_space') {
        var negSymbol = '';
        var formattedCost = formatCostString(cost);
        if (cost < 0) {
            negSymbol = '−';
            formattedCost = formatCostString(Math.abs(cost));
        }
        formattedCurrency = "".concat(negSymbol).concat(symbol).concat(position === 'left_space' ? ' ' : '').concat(formattedCost);
    }
    else {
        formattedCurrency = "".concat(formatCostString(cost)).concat(position === 'right_space' ? ' ' : '').concat(symbol);
    }
    return formattedCurrency;
}
function formatCostString(cost) {
    var _a, _b;
    var _c = MerchantConfiguration.currency.configuration(), code = _c.code, thousandsSeparator = _c.thousands_separator, decimalSeparator = _c.decimal_separator, rounding = _c.rounding, decimals = _c.number_of_decimals;
    if (typeof cost !== 'number') {
        cost = 0;
    }
    if (code === 'JPY') {
        return cost.toString();
    }
    var numberOfDecimals = decimals || 2;
    switch (rounding) {
        case 'up':
            switch (numberOfDecimals) {
                case 0:
                    cost = Math.ceil(cost);
                    break;
                case 1:
                    cost = Math.ceil(cost * 10) / 10;
                    break;
                case 2:
                    cost = Math.ceil(cost * 100) / 100;
                    break;
                case 3:
                    cost = Math.ceil(cost * 1000) / 1000;
                    break;
                default:
                    cost = Math.ceil(cost);
                    break;
            }
            break;
        case 'down':
            switch (numberOfDecimals) {
                case 0:
                    cost = Math.floor(cost);
                    break;
                case 1:
                    cost = Math.floor(cost * 10) / 10;
                    break;
                case 2:
                    cost = Math.floor(cost * 100) / 100;
                    break;
                case 3:
                    cost = Math.floor(cost * 1000) / 1000;
                    break;
                default:
                    cost = Math.floor(cost);
                    break;
            }
            break;
        case 'nearest':
            switch (numberOfDecimals) {
                case 0:
                    cost = Math.round(cost);
                    break;
                case 1:
                    cost = Math.round(cost * 10) / 10;
                    break;
                case 2:
                    cost = Math.round(cost * 100) / 100;
                    break;
                case 3:
                    cost = Math.round(cost * 1000) / 1000;
                    break;
                default:
                    cost = Math.round(cost);
                    break;
            }
            break;
        default:
            break;
    }
    cost = Number.parseFloat(cost.toFixed(decimals));
    var formattedPrice = '';
    try {
        var currencySplit = cost.toFixed(numberOfDecimals).split('.');
        var dollarAmount = currencySplit[0];
        var centsAmount = currencySplit[1] || '';
        var rev = currencySplit[0].split('').reverse().join('');
        var revFormat = (_b = (_a = rev.match(/.{1,3}/g)) === null || _a === void 0 ? void 0 : _a.join(thousandsSeparator)) !== null && _b !== void 0 ? _b : '';
        dollarAmount = revFormat.split('').reverse().join('');
        formattedPrice += dollarAmount;
        if (centsAmount !== '') {
            formattedPrice += decimalSeparator + centsAmount;
        }
        return formattedPrice;
    }
    catch (_d) {
        return cost.toFixed(decimals);
    }
}
function clearInput(selector) {
    for (var _i = 0, _a = $qsAll(selector); _i < _a.length; _i++) {
        var $element = _a[_i];
        $element.value = '';
    }
}
function renderDropDownList(data, defaultOption) {
    if (defaultOption === void 0) { defaultOption = ''; }
    if (!data) {
        data = {};
    }
    var list = Object.entries(data).map(function (_a) {
        var key = _a[0], value = _a[1];
        return "<option value=\"".concat(key, "\"> ").concat(value, " </option>");
    });
    if (defaultOption) {
        return "<option hidden disabled selected value=\"\">".concat(defaultOption, "</option>").concat(list.join(''));
    }
    return list.join('');
}
function renderCorrectProvinceField(phpData, modalPage) {
    var _a, _b, _c, _d;
    var merchantShipping = MerchantConfiguration.general.wcLocationInfoData();
    if (merchantShipping) {
        var name_1;
        var section_1;
        if (modalPage == undefined) {
            modalPage = Environment.modalUI.page();
        }
        if (modalPage === 'info') {
            name_1 = '#pp-info-form';
            section_1 = 'billing';
        }
        else if (modalPage === 'shipping' && PeachPayCustomer.shipToDifferentAddress()) {
            name_1 = '#pp-different-shipping-details';
            section_1 = 'shipping';
        }
        else if (modalPage === 'returning') {
            name_1 = '#pp-info-form-returning';
            section_1 = 'billing';
        }
        else {
            return;
        }
        var countryElement = $qs("".concat(name_1, " [name=\"").concat(section_1, "_country\"]"));
        var country = countryElement ? countryElement.value : '';
        if (country === '') {
            return;
        }
        var _e = stateProvinceOrCounty(country), defaultOption_1 = _e[0], label_1 = _e[1];
        var stateOrProvinceOptions_1 = (_a = merchantShipping.allowed_states_or_provinces[country]) !== null && _a !== void 0 ? _a : {};
        var countryFieldInfo = merchantShipping.country_locale_data[country];
        var stateFieldInfo = countryFieldInfo ? countryFieldInfo['state'] : [];
        var isStateRequired = (_b = stateFieldInfo.required) !== null && _b !== void 0 ? _b : true;
        if (stateOrProvinceOptions_1 && Object.keys(stateOrProvinceOptions_1).length > 0 && isStateRequired) {
            $qs("".concat(name_1, " .").concat(section_1, "_state-field select"), function ($stateOrProvincesSelect) {
                var _a, _b, _c;
                $stateOrProvincesSelect.innerHTML = renderDropDownList(stateOrProvinceOptions_1, defaultOption_1);
                $stateOrProvincesSelect.disabled = false;
                $stateOrProvincesSelect.setAttribute('name', "".concat(section_1, "_state"));
                $stateOrProvincesSelect.required = isRequiredField("".concat(section_1, "_state"), section_1 === 'billing' ? (_a = phpData.billing_fields) !== null && _a !== void 0 ? _a : [] : (_b = phpData.shipping_fields) !== null && _b !== void 0 ? _b : []);
                var firstOption = $stateOrProvincesSelect.firstElementChild;
                $stateOrProvincesSelect.value = firstOption ? firstOption.value : '';
                $stateOrProvincesSelect.classList.remove('hide');
                var chevron = (_c = $stateOrProvincesSelect.parentNode) === null || _c === void 0 ? void 0 : _c.lastElementChild;
                chevron === null || chevron === void 0 ? void 0 : chevron.classList.remove('hide');
            });
            $qs("".concat(name_1, " .").concat(section_1, "_state-field label.pp-select-label"), function ($element) {
                $element.textContent = label_1 !== null && label_1 !== void 0 ? label_1 : defaultOption_1;
                $element.classList.remove('hide');
            });
            $qs("".concat(name_1, " .").concat(section_1, "_state-field input"), function ($stateOrProvincesText) {
                $stateOrProvincesText.disabled = true;
                $stateOrProvincesText.setAttribute('name', 'off');
                $stateOrProvincesText.required = false;
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.add('hide');
            });
            (_c = $qs("".concat(name_1, " .").concat(section_1, "_state-field label:not(.pp-select-label)"))) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        }
        else {
            $qs("".concat(name_1, " .").concat(section_1, "_state-field select"), function ($stateOrProvincesSelect) {
                var _a;
                $stateOrProvincesSelect.disabled = true;
                $stateOrProvincesSelect.setAttribute('name', 'off');
                $stateOrProvincesSelect.required = false;
                $stateOrProvincesSelect.classList.add('hide');
                var chevron = (_a = $stateOrProvincesSelect.parentNode) === null || _a === void 0 ? void 0 : _a.lastElementChild;
                chevron === null || chevron === void 0 ? void 0 : chevron.classList.add('hide');
            });
            (_d = $qs("".concat(name_1, " .").concat(section_1, "_state-field label.pp-select-label"))) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
            $qs("".concat(name_1, " .").concat(section_1, "_state-field input"), function ($stateOrProvincesText) {
                var _a, _b;
                $stateOrProvincesText.disabled = false;
                $stateOrProvincesText.setAttribute('name', "".concat(section_1, "_state"));
                $stateOrProvincesText.required = isRequiredField("".concat(section_1, "_state"), section_1 === 'billing' ? (_a = phpData.billing_fields) !== null && _a !== void 0 ? _a : [] : (_b = phpData.shipping_fields) !== null && _b !== void 0 ? _b : []);
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.remove('hide');
            });
            $qs("".concat(name_1, " .").concat(section_1, "_state-field label:not(.pp-select-label)"), function ($element) {
                $element.textContent = label_1 !== null && label_1 !== void 0 ? label_1 : defaultOption_1;
                $element.classList.remove('hide');
            });
        }
    }
}
function selectDropdown($select, value) {
    if (!$select) {
        return;
    }
    $select.value = value;
}
function renderCountryAndStateList(merchantLocationInfo) {
    if (!merchantLocationInfo) {
        console.warn('Warning: No WC Location info. Please update the PeachPay Plugin.');
        return;
    }
    var infoForms = [
        {
            name: '#pp-info-form',
            section: 'billing'
        },
        {
            name: '#pp-info-form-returning',
            section: 'billing'
        }
    ];
    if (PeachPayCustomer.shipToDifferentAddress()) {
        infoForms.push({
            name: '#pp-different-shipping-details',
            section: 'shipping'
        });
    }
    infoForms.forEach(function (_a) {
        var name = _a.name, section = _a.section;
        var $countries = $qs("".concat(name, " [name=\"").concat(section, "_country\"]"));
        if ($countries && $countries.children.length <= 1) {
            var selectACountry = getLocaleText('Select a country');
            var countryOptions = merchantLocationInfo.allowed_countries;
            $countries.innerHTML = renderDropDownList(countryOptions, selectACountry);
            var country = section === 'billing' ? PeachPayCustomer.billing.country() : PeachPayCustomer.shipping.country();
            selectDropdown($countries, country || merchantLocationInfo.customer_default_country || merchantLocationInfo.store_country);
            if ($countries.options.length === 2) {
                $countries.selectedIndex = 1;
            }
            $countries.dispatchEvent(new Event('change'));
        }
    });
}
function renderCustomerFields(customer) {
    var infoFormName;
    switch (Environment.modalUI.page()) {
        case 'info':
            {
                infoFormName = '#pp-info-form';
                break;
            }
        case 'shipping':
            {
                infoFormName = '#pp-different-shipping-details';
                break;
            }
        case 'returning':
            {
                infoFormName = '#pp-info-form-returning';
                break;
            }
        default:
            {
                return;
            }
    }
    Object.keys(customer.form_fields).forEach(function (key) {
        if (customer.form_fields[key] !== undefined) {
            $qsAll("".concat(infoFormName, " .").concat(key, "-field [name=\"").concat(key, "\"]"), function (element) {
                switch (element.tagName) {
                    case 'INPUT':
                        {
                            var input = element;
                            if (input.type === 'radio') {
                                input.checked = input.value === customer.form_fields[key];
                            }
                            else {
                                input.value = customer.form_fields[key];
                            }
                            break;
                        }
                    case 'SELECT':
                        {
                            var select = element;
                            select.value = customer.form_fields[key];
                            break;
                        }
                }
            });
        }
    });
}
function renderCustomerHeader(customer) {
    var _a, _b;
    if (PeachPayCustomer.shipToDifferentAddress()) {
        (_a = $qs('#shipping-options-container-address')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    }
    else {
        (_b = $qs('#shipping-options-container-address')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        var section_2 = 'billing';
        var shortAddress_1 = getShortAddress();
        var fullAddress_1 = getFullAddress(section_2);
        var fullName_1 = getFullName(section_2);
        $qsAll("#existing-email", function ($element) { return $element.innerHTML = customer.form_fields["".concat(section_2, "_email")]; });
        if (fullName_1.replace(/\s/g, '') === '' && shortAddress_1.replace(/\s/g, '') === '') {
            $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "shipping-seperator"), function ($element) { return $element.classList.add('hide'); });
            return;
        }
        $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "full-name"), function ($element) { return $element.innerHTML = fullName_1; });
        $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "shipping-seperator"), function ($element) { return $element.classList.remove('hide'); });
        $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "pp-address"), function ($element) { return $element.innerHTML = shortAddress_1; });
        $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "pp-address-hidden"), function ($element) { return $element.innerHTML = fullAddress_1; });
        $qsAll("".concat(Environment.customer.existing() ? '#existing-' : '.', "pp-return-address-line"), function ($element) { return $element.innerHTML = fullAddress_1; });
    }
}
function getFullAddress(section) {
    var _a, _b;
    var fullAddress = '';
    var customerInfoType = PeachPayCustomer.shipping;
    if (section === 'billing') {
        customerInfoType = PeachPayCustomer.billing;
    }
    if (customerInfoType.country() === 'JP') {
        var fullState = (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_location_info) === null || _b === void 0 ? void 0 : _b.allowed_states_or_provinces.JP[customerInfoType.state()];
        fullAddress = "".concat(customerInfoType.postal() ? customerInfoType.postal() + ', ' : '', "\n\t\t").concat((fullState !== null && fullState !== void 0 ? fullState : customerInfoType.state()) ? customerInfoType.state() + ' ' : '', "\n\t\t").concat(customerInfoType.city() ? customerInfoType.city() + ', ' : '', "\n\t\t").concat(customerInfoType.address1() ? customerInfoType.address1() + ', ' : '', "\n\t\t").concat(customerInfoType.address2() ? customerInfoType.address2() : '');
    }
    else {
        fullAddress = "".concat(customerInfoType.address1() ? customerInfoType.address1() + ', ' : '', "\n\t\t").concat(customerInfoType.address2() ? customerInfoType.address2() + ', ' : '', "\n\t\t").concat(customerInfoType.city() ? customerInfoType.city() + ', ' : '', "\n\t\t").concat(customerInfoType.state() ? customerInfoType.state() + ' ' : '', "\n\t\t").concat(customerInfoType.postal() ? customerInfoType.postal() + ', ' : '', "\n\t\t").concat(customerInfoType.country() ? customerInfoType.country() : '');
    }
    return fullAddress;
}
function getFullName(section) {
    var customerInfoType = PeachPayCustomer.shipping;
    if (section === 'billing') {
        customerInfoType = PeachPayCustomer.billing;
    }
    return "\n\t\t".concat(customerInfoType.firstName() ? customerInfoType.firstName() + ' ' : '', "\n\t\t").concat(customerInfoType.lastName() ? customerInfoType.lastName() : '');
}
function getShortAddress() {
    var shortAddress = '';
    if (PeachPayCustomer.shipping.country() === 'JP') {
        shortAddress = "".concat(PeachPayCustomer.shipping.postal() ? PeachPayCustomer.shipping.postal() + ', ' : '') + "".concat(PeachPayCustomer.shipping.address1() ? PeachPayCustomer.shipping.address1() + ', ' : '') + "".concat(PeachPayCustomer.shipping.address2() ? PeachPayCustomer.shipping.address2() : '');
    }
    else {
        shortAddress = "".concat(PeachPayCustomer.shipping.address1() ? PeachPayCustomer.shipping.address1().trim() : '') + "".concat(PeachPayCustomer.shipping.address2() ? ' ' + PeachPayCustomer.shipping.address2().trim() : '') + "".concat(PeachPayCustomer.shipping.postal() ? ', ' + PeachPayCustomer.shipping.postal().trim() : '');
    }
    return shortAddress;
}
function renderSelectedPM() {
    var _a, _b, _c, _d, _e, _f, _g;
    var providerKey = PaymentConfiguration.selectedProvider();
    var methodKey = PaymentConfiguration.selectedProviderMethod();
    var savedIndex = PaymentConfiguration.selectedProviderMethodIndex();
    var _h = PeachPayCustomer.retrieveSavedPaymentMethod(providerKey, methodKey, savedIndex), savedMethod = _h[0], methodConfig = _h[1];
    if (!methodConfig) {
        return;
    }
    if (!Environment.customer.existing() && (methodConfig.reusable && !savedMethod && !savedIndex || methodConfig.requireInput && !savedIndex)) {
        (_a = $qs('#pp-selected-pm')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-pms-existing hr')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#pp-pm-expander')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        if (!$qs('#pp-pm-expander img.selected')) {
            (_d = $qs('#pp-pm-expander img')) === null || _d === void 0 ? void 0 : _d.click();
        }
        return;
    }
    else {
        (_e = $qs('#pp-selected-pm')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('#pp-pms-existing hr')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
        (_g = $qs('#pp-pm-expander')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
    }
    $qsAll('#pp-selected-pm .pp-pm-selected-option', function ($el) { return $el.classList.add('hide'); });
    var $existingSelectedOption = $qs("#pp-selected-pm .pp-pm-selected-option[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"][data-index=\"").concat(savedIndex, "\"]"));
    if ($existingSelectedOption) {
        $existingSelectedOption.classList.remove('hide');
    }
    else {
        var html_1 = buildSelectedPMTemplate(providerKey, methodKey, savedIndex, methodConfig, savedMethod);
        $qs('#pp-selected-pm', function ($el) { return $el.insertAdjacentHTML('beforeend', html_1); });
    }
}
function buildSelectedPMTemplate(providerKey, methodKey, index, method, saved) {
    var buildSelectedNonReusableTemplate = function () {
        var _a, _b, _c, _d, _e, _f;
        return "\n<div class=\"pp-pm-selected-option\" data-provider=\"".concat(providerKey, "\" data-method=\"").concat(methodKey, "\" data-index=\"").concat(index, "\">\n\t<span>\n\t\t<img class=\"pp-pm-display-badge\" style=\"transform: scale(").concat((_b = (_a = method.assets.title) === null || _a === void 0 ? void 0 : _a.scale) !== null && _b !== void 0 ? _b : '1', ") translateX(").concat((_d = (_c = method.assets.title) === null || _c === void 0 ? void 0 : _c.translateX) !== null && _d !== void 0 ? _d : '0', "px)\" src=\"").concat((_f = (_e = method.assets.title) === null || _e === void 0 ? void 0 : _e.src) !== null && _f !== void 0 ? _f : '', "\" draggable=\"false\">\n\t</span>\n</div>");
    };
    var buildSelectedCardTemplate = function () {
        var _a, _b, _c;
        return "\n<div class=\"pp-pm-selected-option\" data-provider=\"".concat(providerKey, "\" data-method=\"").concat(methodKey, "\" data-index=\"").concat(index, "\">\n\t<span>\n\t\t<img class=\"pp-pm-display-badge\" src=\"img/marks/").concat((_a = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _a === void 0 ? void 0 : _a['brand'], ".svg\" draggable=\"false\">\n\t\t\u2022\u2022\u2022\u2022\n\t\t").concat((_c = (_b = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _b === void 0 ? void 0 : _b['last4']) !== null && _c !== void 0 ? _c : '', "\n\t</span>\n\t<span style=\"float: right;\">\n\t\t").concat(getLocaleText('Verified'), "\n\t\t<img class=\"pp-pm-checkmark\" src=\"img/check-circle-solid.svg\" draggable=\"false\">\n\t</span>\n</div>");
    };
    if (!saved) {
        return buildSelectedNonReusableTemplate();
    }
    else {
        if (saved.type === 'card') {
            return buildSelectedCardTemplate();
        }
        else {
            return buildSelectedNonReusableTemplate();
        }
    }
}
function handlePMTabOptionsEvents() {
    var _this = this;
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var $target, $pmType, providerKey, methodKey, _a, savedMethods, method, event_1, pmData;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        $target = e.target;
                        $pmType = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-type:not(.pp-more-options)');
                        if (!$pmType) {
                            return [2];
                        }
                        providerKey = (_b = $pmType.dataset.provider) !== null && _b !== void 0 ? _b : '';
                        methodKey = (_c = $pmType.dataset.method) !== null && _c !== void 0 ? _c : '';
                        _a = PeachPayCustomer.retrieveSavedPaymentMethods(providerKey, methodKey), savedMethods = _a[0], method = _a[1];
                        if (((_d = method === null || method === void 0 ? void 0 : method.supports) === null || _d === void 0 ? void 0 : _d.defaultCurrency) !== 'none' && !PaymentConfiguration.methodSupportsCurrentCurrency(providerKey, methodKey)) {
                            event_1 = new CustomEvent('pp-change-currency', {
                                detail: method === null || method === void 0 ? void 0 : method.supports.defaultCurrency
                            });
                            self.dispatchEvent(event_1);
                        }
                        pmData = {
                            provider: providerKey,
                            method: methodKey
                        };
                        if ((method === null || method === void 0 ? void 0 : method.reusable) && (savedMethods === null || savedMethods === void 0 ? void 0 : savedMethods.length)) {
                            pmData.index = '0';
                        }
                        store.dispatch(setPaymentMethod(pmData));
                        store.dispatch(startModalLoading());
                        return [4, requestCartCalculation()];
                    case 1:
                        _e.sent();
                        store.dispatch(stopModalLoading());
                        self.dispatchEvent(new CustomEvent('pp-pm-updated'));
                        return [2];
                }
            });
        }); });
        $el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var $target = e.target;
                $target.click();
            }
        });
    });
}
function processPMTabOptions() {
    renderMoreOptionsTab();
    renderPMTabDisplay();
    renderPMTabOrder();
    var data = PaymentConfiguration.data();
    for (var providerKey in data.providers) {
        var provider = data.providers[providerKey];
        if (!provider) {
            continue;
        }
        for (var methodKey in provider.methods) {
            var method = provider.methods[methodKey];
            if (!method) {
                continue;
            }
            renderPMTabOption(providerKey, methodKey, method);
        }
    }
}
function renderPMTabOrder() {
    $qsAll('.pp-pms', function ($target) {
        var slot1 = store.getState().paymentConfiguration.ui.primaryMethods[0];
        var slot2 = store.getState().paymentConfiguration.ui.primaryMethods[1];
        var slot3 = store.getState().paymentConfiguration.ui.primaryMethods[2];
        var $tab1 = $target.querySelector(".pp-pm-type[data-provider=".concat(slot1 === null || slot1 === void 0 ? void 0 : slot1.provider, "][data-method=").concat(slot1 === null || slot1 === void 0 ? void 0 : slot1.method, "]"));
        var $tab2 = $target.querySelector(".pp-pm-type[data-provider=".concat(slot2 === null || slot2 === void 0 ? void 0 : slot2.provider, "][data-method=").concat(slot2 === null || slot2 === void 0 ? void 0 : slot2.method, "]"));
        var $tab3 = $target.querySelector(".pp-pm-type[data-provider=".concat(slot3 === null || slot3 === void 0 ? void 0 : slot3.provider, "][data-method=").concat(slot3 === null || slot3 === void 0 ? void 0 : slot3.method, "]"));
        if (!$tab1 || !$tab2) {
            return;
        }
        $tab2 === null || $tab2 === void 0 ? void 0 : $tab2.before($tab1);
        if (!$tab3) {
            return;
        }
        $tab3 === null || $tab3 === void 0 ? void 0 : $tab3.before($tab2);
    });
}
function renderPMTabDisplay() {
    if (PaymentConfiguration.eligibleMethodCount() <= 1) {
        $qs('#pp-pms-existing .header', function ($el) { return $el.classList.add('hide'); });
    }
    else {
        $qs('#pp-pms-existing .header', function ($el) { return $el.classList.remove('hide'); });
    }
    if (PaymentConfiguration.eligibleMethodCount() < 1) {
        $qs('#pp-pms-new .header', function ($el) { return $el.classList.add('hide'); });
    }
    else {
        $qs('#pp-pms-new .header', function ($el) { return $el.classList.remove('hide'); });
    }
}
function renderPMTabOption(providerKey, methodKey, method) {
    var $existingTypeOption = $qsAll(".pp-pm-type[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"], .pp-pm-type-single[data-provider=\"").concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
    if ($existingTypeOption.length) {
        var single = PaymentConfiguration.eligibleMethodCount() === 1;
        if (!single && $existingTypeOption[0].classList.contains('pp-pm-type-single') || single && $existingTypeOption[0].classList.contains('pp-pm-type')) {
            var html_2 = buildPMTabOptionTemplate(providerKey, methodKey, method);
            $qsAll('.pp-pms .header', function ($el) {
                $el.innerHTML = html_2;
            });
        }
        else {
            updatePMTabOptionHTML($existingTypeOption, providerKey, methodKey);
        }
    }
    else {
        var html1_1 = buildPMTabOptionTemplate(providerKey, methodKey, method);
        $qsAll('.pp-pms .pp-pm-type.pp-more-options', function ($el) { return $el.insertAdjacentHTML('beforebegin', html1_1); });
    }
    renderSavedPMOptionsContainer(providerKey, methodKey);
    processSavedPMOptions(providerKey, methodKey);
}
function updatePMTabOptionHTML($existingOption, providerKey, methodKey) {
    var isEligible = PaymentConfiguration.eligibleMethod(providerKey, methodKey) && PaymentConfiguration.isPrimaryMethod(providerKey, methodKey);
    var isSelected = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey);
    if (isSelected) {
        $existingOption.forEach(function ($el) { return $el.classList.add('selected'); });
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.remove('selected'); });
    }
    if (isEligible) {
        $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.add('hide'); });
    }
    updateCurrencyWarning($existingOption, providerKey, methodKey);
}
function buildPMTabOptionTemplate(providerKey, methodKey, method) {
    var isSelected = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey);
    var single = PaymentConfiguration.eligibleMethodCount() === 1;
    if (single) {
        return "<div class=\"pp-pm-type-single ".concat(isSelected ? 'selected' : '', "\" tabindex=\"0\" role=\"button\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t\t\t<span class=\"pp-question-mark hide\">\n\t\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t\t</span>\n\t\t</div>");
    }
    return "\n\t<div class=\"pp-pm-type ".concat(isSelected ? 'selected' : '', "\" tabindex=\"0\" role=\"button\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t\t<img class=\"pp-pm-full-badge\" src=\"").concat(method.assets.badge.src, "\" draggable=\"false\">\n\t\t<span>").concat(method.name, "</span>\n\t\t<span class=\"pp-question-mark hide\">\n\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t</span>\n\t</div>");
}
function handleMoreOptionsEvents() {
    $qs('body', function ($el) {
        $el.addEventListener('click', function (e) {
            var $target = e.target;
            var $pmOptionSelector = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-more-container');
            if (!$pmOptionSelector) {
                $qsAll('.pp-pm-more-container', function ($el) { return $el.classList.add('hide'); });
            }
        });
    });
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) {
            var _a;
            var $target = e.target;
            var $pmType = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-type.pp-more-options');
            if (!$pmType) {
                $qsAll('.pp-pm-more-container', function ($el) { return $el.classList.add('hide'); });
                return;
            }
            (_a = $pmType.querySelector('.pp-pm-more-container')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hide');
            $qsAll('.pp-pm-sos-container', function ($el) { return $el.classList.add('hide'); });
            e.preventDefault();
            e.stopPropagation();
            var $option = $target === null || $target === void 0 ? void 0 : $target.closest('li[data-provider][data-method]');
            if (!$option) {
                return;
            }
            var providerKey = $option === null || $option === void 0 ? void 0 : $option.dataset.provider;
            var methodKey = $option === null || $option === void 0 ? void 0 : $option.dataset.method;
            if (!providerKey || !methodKey) {
                return;
            }
            store.dispatch(swapPrimaryWithSecondary({
                method: methodKey,
                provider: providerKey
            }));
            store.dispatch(setPaymentMethod({
                method: methodKey,
                provider: providerKey
            }));
        });
    });
}
function renderMoreOptionsTab() {
    var $existingMoreOptionsTab = $qsAll(".pp-pm-type.pp-more-options");
    if ($existingMoreOptionsTab.length) {
        updateMoreOptionsHTML($existingMoreOptionsTab);
    }
    else {
        var html_3 = buildMoreOptionsTemplate();
        $qsAll('.pp-pms div.header', function ($el) { return $el.insertAdjacentHTML('beforeend', html_3); });
    }
}
function updateMoreOptionsHTML($existingOption) {
    var isVisible = PaymentConfiguration.eligibleMethodCount() > 3;
    var availableOptionsHTML = PaymentConfiguration.allEligibleMethods().filter(function (info) { return !PaymentConfiguration.isPrimaryMethod(info.provider, info.method); }).map(function (info) { return "\n<li data-provider=\"".concat(info.provider, "\" data-method=\"").concat(info.method, "\" role=\"button\" tabindex=\"-1\">\n\t<img class=\"pp-more-option-badge\" src=\"").concat(info.config.assets.badge.src, "\" draggable=\"false\">\n\t<span>").concat(info.config.name, "</span>\n</li>"); }).join('');
    $existingOption.forEach(function ($el) {
        if (isVisible) {
            $el.classList.remove('hide');
        }
        else {
            $el.classList.add('hide');
        }
        var $list = $el.querySelector('.pp-pm-more');
        if ($list) {
            $list.innerHTML = availableOptionsHTML;
        }
    });
}
function buildMoreOptionsTemplate() {
    return "\n\t<div class=\"pp-pm-type pp-more-options\" tabindex=\"0\" role=\"button\">\n\t\t<img class=\"pp-pm-more-options\" src=\"img/dot-dot-dot.svg\" draggable=\"false\">\n\t\t<span class=\"pp-pm-more-container hide\">\n\t\t\t<ul class=\"pp-pm-more\"></ul>\n\t\t</span>\n\t\t<span class=\"pp-question-mark hide\">\n\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t</span>\n\t</div>";
}
function renderSavedPMOptionsContainer(providerKey, methodKey) {
    var $existingTypeOptionContainer = $qsAll(".pp-pm-container[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
    if ($existingTypeOptionContainer.length) {
        updateSavedPMOptionsContainerHTML($existingTypeOptionContainer, providerKey, methodKey);
    }
    else {
        var html_4 = buildSavedPMOptionsContainerTemplate(providerKey, methodKey);
        $qsAll('.pp-pms div.body', function ($el) { return $el.insertAdjacentHTML('beforeend', html_4); });
    }
}
function updateSavedPMOptionsContainerHTML($existingContainer, providerKey, methodKey) {
    var isEligible = PaymentConfiguration.eligibleMethod(providerKey, methodKey) && PaymentConfiguration.isPrimaryMethod(providerKey, methodKey);
    var isVisible = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey);
    if (isVisible && isEligible) {
        $existingContainer.forEach(function ($el) { return $el.classList.remove('hide'); });
    }
    else {
        $existingContainer.forEach(function ($el) { return $el.classList.add('hide'); });
    }
}
function buildSavedPMOptionsContainerTemplate(providerKey, methodKey) {
    var isVisible = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey);
    return "\n<div class=\"pp-pm-container ".concat(isVisible ? '' : 'hide', "\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t<div class=\"pp-pm-options\"></div>\n\t<div class=\"pp-pm-controls\"></div>\n\t<span class=\"pp-question-mark hide\">\n\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t</span>\n</div>");
}
function handleSavedPMOptionEvents() {
    $qs('body', function ($el) {
        $el.addEventListener('click', function (e) {
            var $target = e.target;
            var $pmOptionSelector = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-sos-container,.pp-pm-sos-toggle');
            if (!$pmOptionSelector) {
                $qsAll('.pp-pm-sos-container', function ($el) { return $el.classList.add('hide'); });
            }
        });
    });
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) {
            var _a, _b, _c, _d;
            var $target = e.target;
            var $savedOption = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-saved-option ');
            var $sosToggle = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-sos-toggle');
            var $sosContainer = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-sos');
            var $sosRemove = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-sos li[data-remove]');
            var $input = $target === null || $target === void 0 ? void 0 : $target.closest('input');
            var $label = $target === null || $target === void 0 ? void 0 : $target.closest('label');
            if (!$savedOption) {
                return;
            }
            $qsAll('.pp-pm-more-container', function ($el) { return $el.classList.add('hide'); });
            if (!$input && !$label) {
                e.preventDefault();
                e.stopPropagation();
            }
            var providerKey = (_a = $savedOption.dataset.provider) !== null && _a !== void 0 ? _a : '';
            var methodKey = (_b = $savedOption.dataset.method) !== null && _b !== void 0 ? _b : '';
            var savedIndex = (_c = $savedOption.dataset.index) !== null && _c !== void 0 ? _c : '';
            $qsAll('.pp-pm-sos-container', function ($el) { return $el.classList.add('hide'); });
            if (!$sosToggle && !$sosContainer) {
                store.dispatch(setPaymentMethod({
                    provider: providerKey,
                    method: methodKey,
                    index: savedIndex
                }));
            }
            else if ($sosContainer) {
                if ($sosRemove) {
                    var $existingOptions = $qsAll(".pp-pm-saved-option[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
                    $existingOptions.forEach(function ($option) {
                        if ($option.dataset.index) {
                            $option.remove();
                        }
                    });
                    var $existingSelectedOptions = $qsAll("#pp-selected-pm .pp-pm-selected-option[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
                    $existingSelectedOptions.forEach(function ($option) {
                        if ($option.dataset.index) {
                            $option.remove();
                        }
                    });
                    store.dispatch(removeSavedPaymentMethod({
                        id: providerKey + ':' + methodKey,
                        index: savedIndex
                    }));
                    saveCustomerToBrowser();
                    var pm = PaymentConfiguration.checkEligibleOrFindAlternate({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: PaymentConfiguration.selectedProviderMethodIndex()
                    });
                    if (pm) {
                        store.dispatch(setPaymentMethod(pm));
                    }
                }
            }
            else {
                (_d = $savedOption.querySelector('.pp-pm-sos-container')) === null || _d === void 0 ? void 0 : _d.classList.toggle('hide');
            }
        });
    });
}
function processSavedPMOptions(providerKey, methodKey) {
    var _a = PeachPayCustomer.retrieveSavedPaymentMethods(providerKey, methodKey), savedMethods = _a[0], methodConfig = _a[1];
    if (!methodConfig) {
        return;
    }
    renderSavedPMOption(providerKey, methodKey, '', methodConfig);
    if (!methodConfig.reusable) {
        return;
    }
    savedMethods === null || savedMethods === void 0 ? void 0 : savedMethods.forEach(function (saved, index) { return renderSavedPMOption(providerKey, methodKey, String(index), methodConfig, saved); });
    renderNewPMOptionButton(providerKey, methodKey, methodConfig);
    renderSavedPMOptionButton(providerKey, methodKey, methodConfig);
}
function renderSavedPMOption(providerKey, methodKey, index, method, saved) {
    var $existingOption = $qsAll(".pp-pm-saved-option[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"][data-index=\"").concat(index, "\"]"));
    if ($existingOption.length) {
        updateSavedPMOptionHTML($existingOption, providerKey, methodKey, index, method);
    }
    else {
        var html_5 = buildSavedPMOptionTemplate(providerKey, methodKey, index, method, saved);
        $qsAll(".pp-pm-container[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"] .pp-pm-options"), function ($el) { return $el.insertAdjacentHTML('beforeend', html_5); });
    }
}
function updateSavedPMOptionHTML($existingOption, providerKey, methodKey, index, method) {
    var isSelected = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey, index);
    if (isSelected && index) {
        $existingOption.forEach(function ($el) { return $el.classList.add('selected'); });
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.remove('selected'); });
    }
    var indexActive = PaymentConfiguration.selectedProviderMethodIndex();
    if (method.reusable) {
        if (indexActive && index) {
            $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
        }
        else if (!indexActive && !index) {
            $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
        }
        else {
            $existingOption.forEach(function ($el) { return $el.classList.add('hide'); });
        }
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
    }
}
function buildSavedPMOptionTemplate(providerKey, methodKey, index, method, saved) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var isSelected = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey, index);
    var indexActive = PaymentConfiguration.selectedProviderMethodIndex();
    if (!method.reusable || !index || !saved) {
        return "\n<div class=\"pp-pm-saved-option ".concat(indexActive ? 'hide' : '', "\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\" data-index=\"\">\n\t").concat(method.description, "\n</div>");
    }
    return "\n<div class=\"pp-pm-saved-option ".concat(isSelected ? 'selected' : '', " ").concat(indexActive ? '' : 'hide', "\" tabindex=\"0\" role=\"button\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\" data-index=\"").concat(index, "\">\n\t<span style=\"font-family: 'Helvetica', 'Arial',monospace;\">\n\t\t<span style=\"width: 3rem;padding-right: 4px;\">\n\t\t\t<img class=\"pp-pm-title\" src=\"img/marks/").concat((_b = (_a = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _a === void 0 ? void 0 : _a['brand']) !== null && _b !== void 0 ? _b : '', ".svg\" draggable=\"false\">\n\t\t</span>\n\t\t\u2022\u2022\u2022\u2022\n\t\t").concat((_d = (_c = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _c === void 0 ? void 0 : _c['last4']) !== null && _d !== void 0 ? _d : '', "\n\t</span>\n\t<span class=\"muted\" style=\"float:right;display: inline-block;padding: 0.2rem;\">\n\t\t").concat((_f = (_e = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _e === void 0 ? void 0 : _e['exp_month']) !== null && _f !== void 0 ? _f : 'MM', "/").concat((_h = (_g = saved === null || saved === void 0 ? void 0 : saved.metadata) === null || _g === void 0 ? void 0 : _g['exp_year']) !== null && _h !== void 0 ? _h : 'YY', "\n\t\t<img class=\"pp-pm-sos-toggle\" src=\"img/dot-dot-dot.svg\" draggable=\"false\">\n\t\t<span class=\"pp-pm-sos-container hide\">\n\t\t\t<ul class=\"pp-pm-sos\">\n\t\t\t\t<li data-remove role=\"button\" tabindex=\"-1\">").concat(getLocaleText('Remove'), "</li>\n\t\t\t\t<li data-cancel role=\"button\" tabindex=\"-1\">").concat(getLocaleText('Cancel'), "</li>\n\t\t\t</ul>\n\t\t</span>\n\t</span>\n</div>");
}
function handleNewPMOptionButtonEvents() {
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) {
            var _a, _b;
            var $target = e.target;
            var $pmType = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-option-new');
            var $pmSpan = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-option-new span');
            if (!$pmType || !$pmSpan) {
                return;
            }
            var providerKey = (_a = $pmType.dataset.provider) !== null && _a !== void 0 ? _a : '';
            var methodKey = (_b = $pmType.dataset.method) !== null && _b !== void 0 ? _b : '';
            store.dispatch(setPaymentMethod({
                provider: providerKey,
                method: methodKey
            }));
        });
    });
}
function renderNewPMOptionButton(providerKey, methodKey, method) {
    var $existingOption = $qsAll(".pp-pm-option-new[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
    if ($existingOption.length) {
        updateNewPMOptionButtonHTML($existingOption);
    }
    else {
        var html_6 = buildNewPMOptionButtonTemplate(providerKey, methodKey, method);
        $qsAll(".pp-pm-container[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"] .pp-pm-controls"), function ($el) { return $el.insertAdjacentHTML('beforeend', html_6); });
    }
}
function updateNewPMOptionButtonHTML($existingOption) {
    var isVisible = PaymentConfiguration.selectedProviderMethodIndex();
    if (isVisible) {
        $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.add('hide'); });
    }
}
function buildNewPMOptionButtonTemplate(providerKey, methodKey, method) {
    var _a;
    var isVisible = PaymentConfiguration.selectedProviderMethodIndex();
    return "\n<div class=\"pp-pm-option-new pp-pm-option-control ".concat(isVisible ? '' : 'hide', "\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t<span class=\"muted\" tabindex=\"0\" role=\"button\">").concat((_a = method.addNewButton) !== null && _a !== void 0 ? _a : '', "</span>\n</div>");
}
function handleSavedPMOptionButtonEvents() {
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) {
            var _a, _b;
            var $target = e.target;
            var $pmType = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-option-saved');
            var $pmSpan = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-option-saved span');
            if (!$pmType || !$pmSpan) {
                return;
            }
            var providerKey = (_a = $pmType.dataset.provider) !== null && _a !== void 0 ? _a : '';
            var methodKey = (_b = $pmType.dataset.method) !== null && _b !== void 0 ? _b : '';
            store.dispatch(setPaymentMethod({
                provider: providerKey,
                method: methodKey,
                index: '0'
            }));
        });
    });
}
function renderSavedPMOptionButton(providerKey, methodKey, method) {
    var $existingOption = $qsAll(".pp-pm-option-saved[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"]"));
    if ($existingOption.length) {
        updateSavedPMOptionButtonHTML($existingOption, providerKey, methodKey);
    }
    else {
        var html_7 = buildSavedPMOptionButtonTemplate(providerKey, methodKey, method);
        $qsAll(".pp-pm-container[data-provider=\"".concat(providerKey, "\"][data-method=\"").concat(methodKey, "\"] .pp-pm-controls"), function ($el) { return $el.insertAdjacentHTML('beforeend', html_7); });
    }
}
function updateSavedPMOptionButtonHTML($existingOption, providerKey, methodKey) {
    var _a;
    var isVisible = !PaymentConfiguration.selectedProviderMethodIndex() && ((_a = PeachPayCustomer.retrieveSavedPaymentMethods(providerKey, methodKey)[0]) === null || _a === void 0 ? void 0 : _a.length);
    if (isVisible && Environment.modalUI.loadingMode() !== 'processing') {
        $existingOption.forEach(function ($el) { return $el.classList.remove('hide'); });
    }
    else {
        $existingOption.forEach(function ($el) { return $el.classList.add('hide'); });
    }
}
function buildSavedPMOptionButtonTemplate(providerKey, methodKey, method) {
    var _a;
    var isVisible = PaymentConfiguration.selectedProviderMethodIndex();
    return "\n<div class=\"pp-pm-option-saved pp-pm-option-control ".concat(isVisible ? '' : 'hide', "\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t<span class=\"muted\" tabindex=\"0\" role=\"button\">").concat((_a = method.savedButton) !== null && _a !== void 0 ? _a : '', "</span>\n</div>");
}
function handleToggleCurrencyTooltip(event) {
    var _a, _b, _c, _d;
    event.stopPropagation();
    var tooltip = (_c = (_b = (_a = (event === null || event === void 0 ? void 0 : event.target)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children[0];
    if (((_d = tooltip.style) === null || _d === void 0 ? void 0 : _d.visibility) === 'visible') {
        tooltip.style.visibility = '';
    }
    else {
        tooltip.style.visibility = 'visible';
    }
}
function updateCurrencyWarning($existingOption, providerKey, methodKey) {
    var defaultCurrency = PaymentConfiguration.getMethodDefaultCurrency(providerKey, methodKey);
    var supportsCurrentCurrency = PaymentConfiguration.methodSupportsCurrentCurrency(providerKey, methodKey);
    var paymentSupportMessage = "\n<span class=\"pp-currency-tooltip\">\n\t".concat(getLocaleText('This payment method does not support the selected currency. On selecting this, the currency will switch to'), " ").concat(defaultCurrency, "\n</span>");
    if (defaultCurrency && !supportsCurrentCurrency) {
        $existingOption.forEach(function ($el) {
            var _a, _b;
            if ($el.querySelector('.pp-currency-tooltip')) {
                return;
            }
            $el.classList.add('pp-semi-disabled');
            $el.insertAdjacentHTML('afterbegin', paymentSupportMessage);
            (_a = $el.querySelector('.pp-question-mark')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
            (_b = $el.querySelector('.pp-question-mark')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', handleToggleCurrencyTooltip);
        });
    }
    else {
        $existingOption.forEach(function ($el) {
            var _a, _b;
            if (!$el.querySelector('.pp-currency-tooltip')) {
                return;
            }
            $el.classList.remove('pp-semi-disabled');
            (_a = $el.querySelector('.pp-currency-tooltip')) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = $el.querySelector('.pp-question-mark')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        });
    }
}
function additionalFieldsChangeCallback(e) {
    var $form = e.target.closest('form');
    if ($form.id === 'additional-fields-new') {
        hideNonExpressFields();
    }
    if ($form.id === 'pp-info-form') {
        setTimeout(function () {
            hideNonExpressFields();
        }, 1);
    }
    checkRequiredFields1();
}
function handleExpressOptionEvents() {
    $qsAll('.pp-pm-type', function ($el) {
        $el.addEventListener('click', function () {
            checkRequiredFields1();
            document.dispatchEvent(new Event('pp-insert-button'));
            $qsAll('.pp-pm-type', function ($el2) {
                if ($el2 !== $el) {
                    $el2.classList.remove('selected');
                }
            });
            $el === null || $el === void 0 ? void 0 : $el.classList.toggle('selected');
            var selected = $el === null || $el === void 0 ? void 0 : $el.classList.contains('selected');
            setupExpressPaymentSection(selected);
            var providerKey = $el === null || $el === void 0 ? void 0 : $el.dataset.provider;
            var methodKey = $el === null || $el === void 0 ? void 0 : $el.dataset.method;
            if (!providerKey || !methodKey) {
                return;
            }
        });
    });
}
function setupExpressPaymentSection(selected) {
    var _a, _b;
    if (selected) {
        if ((window === null || window === void 0 ? void 0 : window.innerWidth) > 900) {
            $qs('#pp-express-payments', function ($el) { return $el === null || $el === void 0 ? void 0 : $el.classList.remove('pp-section-mt'); });
        }
        else {
            $qs('#pp-express-payments', function ($el) { return $el === null || $el === void 0 ? void 0 : $el.classList.add('pp-section-mt'); });
            $qs('.pp-order-summary-mobile', function ($el) { return $el === null || $el === void 0 ? void 0 : $el.classList.remove('pp-section-mt'); });
        }
        $qs('#additional-fields-new', function ($el) {
            $qs('#pp-info-form', function ($el2) {
                $el2.after($el);
                $el === null || $el === void 0 ? void 0 : $el.addEventListener('change', additionalFieldsChangeCallback, false);
                $el2 === null || $el2 === void 0 ? void 0 : $el2.addEventListener('change', additionalFieldsChangeCallback, false);
            });
        });
        (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.classList.remove('pp-section-mt');
    }
    else {
        $qs('#additional-fields-new', function ($el) {
            $qs('#pp-related-products-section', function ($el2) {
                var _a;
                $el2.after($el);
                $el === null || $el === void 0 ? void 0 : $el.removeEventListener('change', additionalFieldsChangeCallback, false);
                (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', additionalFieldsChangeCallback, false);
            });
        });
        (_b = $qs('#pp-info-form')) === null || _b === void 0 ? void 0 : _b.classList.add('pp-section-mt');
    }
    hideNonExpressFields(selected);
}
function openSlideUpView(modalName) {
    var _a, _b, _c, _d;
    var backgroundElement = $qs("#pp-slide-up-".concat(modalName, "-existing .pp-slide-up-view-bg"));
    var backarrow = $qs("#pp-slide-up-".concat(modalName, "-existing .pp-slide-up-header"));
    (_a = $qs("#pp-slide-up-".concat(modalName, "-existing"))) === null || _a === void 0 ? void 0 : _a.classList.add('expanded');
    self.addEventListener('resize', handleResponsiveness);
    setTimeout(function () {
        handleResponsiveness();
    }, 100);
    if (modalName === 'cart') {
        (_b = $qs("#pp-dropdown".concat(Environment.modalUI.page() === 'returning' ? '' : '-new'))) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-expanded', 'true');
    }
    var tapToClose = function (e) {
        var _a;
        e.stopImmediatePropagation();
        closeSlideUpView(modalName);
        backgroundElement === null || backgroundElement === void 0 ? void 0 : backgroundElement.removeEventListener('click', tapToClose);
        backarrow === null || backarrow === void 0 ? void 0 : backarrow.removeEventListener('click', tapToClose);
        self.removeEventListener('resize', handleResponsiveness);
        if (modalName === 'cart') {
            var dropDown = $qs("#pp-dropdown".concat(Environment.modalUI.page() === 'returning' ? '' : '-new'));
            dropDown === null || dropDown === void 0 ? void 0 : dropDown.removeEventListener('click', tapToClose);
            dropDown === null || dropDown === void 0 ? void 0 : dropDown.removeEventListener('keypress', closeCartWithKeyPress);
            dropDown === null || dropDown === void 0 ? void 0 : dropDown.addEventListener('keypress', openCartWithKeyPress);
            dropDown === null || dropDown === void 0 ? void 0 : dropDown.addEventListener('click', openCart);
        }
        else {
            (_a = $qs("#pp-".concat(modalName, "-cancel"))) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', tapToClose);
        }
    };
    var cancelAndClose = function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        e.stopImmediatePropagation();
        var modalPage = Environment.modalUI.page();
        var formID = modalPage === 'info' ? '#pp-info-form' : modalPage === 'returning' ? '.pp-info-form-returning' : '#pp-different-shipping-details';
        var infoFormValidity = (_b = (_a = $qs("".concat(formID))) === null || _a === void 0 ? void 0 : _a.checkValidity()) !== null && _b !== void 0 ? _b : false;
        if ((_c = $qs("#pp-".concat(modalName, "-existing-save"))) === null || _c === void 0 ? void 0 : _c.hasAttribute('disabled')) {
            if (!infoFormValidity) {
                openSlideUpView('ship-to');
                (_d = $qs("".concat(formID))) === null || _d === void 0 ? void 0 : _d.reportValidity();
                return;
            }
            closeSlideUpView(modalName);
            backgroundElement === null || backgroundElement === void 0 ? void 0 : backgroundElement.removeEventListener('click', cancelAndClose);
            backarrow === null || backarrow === void 0 ? void 0 : backarrow.removeEventListener('click', cancelAndClose);
            self.removeEventListener('resize', handleResponsiveness);
            (_e = $qs("#pp-".concat(modalName, "-cancel .exit-back-btn"))) === null || _e === void 0 ? void 0 : _e.removeEventListener('click', cancelAndClose);
        }
        else {
            if (!infoFormValidity) {
                openSlideUpView('ship-to');
                (_f = $qs("".concat(formID))) === null || _f === void 0 ? void 0 : _f.reportValidity();
                return;
            }
            if (confirm('Close without saving changes?')) {
                store.dispatch(startModalLoading());
                closeSlideUpView(modalName);
                backgroundElement === null || backgroundElement === void 0 ? void 0 : backgroundElement.removeEventListener('click', cancelAndClose);
                backarrow === null || backarrow === void 0 ? void 0 : backarrow.removeEventListener('click', cancelAndClose);
                self.removeEventListener('resize', handleResponsiveness);
                (_g = $qs("#pp-".concat(modalName, "-cancel .exit-back-btn"))) === null || _g === void 0 ? void 0 : _g.removeEventListener('click', cancelAndClose);
                renderCustomerFields(PeachPayCustomer.data());
                (_h = $qs("#pp-".concat(modalName, "-existing-save"))) === null || _h === void 0 ? void 0 : _h.setAttribute('disabled', '');
                store.dispatch(stopModalLoading());
            }
        }
    };
    var closeCartWithKeyPress = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.key === 'Enter' || event.key === ' ') {
            tapToClose(event);
        }
    };
    if (modalName === 'ship-to') {
        backgroundElement === null || backgroundElement === void 0 ? void 0 : backgroundElement.addEventListener('click', cancelAndClose);
        backarrow === null || backarrow === void 0 ? void 0 : backarrow.addEventListener('click', cancelAndClose);
        (_c = $qs("#pp-".concat(modalName, "-cancel .exit-back-btn"))) === null || _c === void 0 ? void 0 : _c.addEventListener('click', cancelAndClose);
    }
    else {
        backgroundElement === null || backgroundElement === void 0 ? void 0 : backgroundElement.addEventListener('click', tapToClose);
        backarrow === null || backarrow === void 0 ? void 0 : backarrow.addEventListener('click', tapToClose);
        if (modalName !== 'cart') {
            (_d = $qs("#pp-".concat(modalName, "-cancel"))) === null || _d === void 0 ? void 0 : _d.addEventListener('click', tapToClose);
        }
    }
    if (modalName === 'cart') {
        var dropDown = $qs("#pp-dropdown".concat(Environment.modalUI.page() === 'returning' ? '' : '-new'));
        dropDown === null || dropDown === void 0 ? void 0 : dropDown.addEventListener('click', tapToClose);
        dropDown === null || dropDown === void 0 ? void 0 : dropDown.addEventListener('keypress', closeCartWithKeyPress);
        dropDown === null || dropDown === void 0 ? void 0 : dropDown.removeEventListener('click', openCart);
        dropDown === null || dropDown === void 0 ? void 0 : dropDown.removeEventListener('keypress', openCartWithKeyPress);
    }
}
function checkRequiredFields() {
    var _a, _b, _c, _d, _e, _f, _g;
    var shouldCheckInfoForm = Environment.modalUI.page() === 'returning' || Environment.modalUI.page() === 'info' || Environment.modalUI.page() === 'shipping';
    if (shouldCheckInfoForm) {
        var modalPage = Environment.modalUI.page();
        var formID = modalPage === 'info' ? '#pp-info-form' : modalPage === 'returning' ? '#pp-info-form-returning' : '#pp-different-shipping-details';
        var infoFormValidity = (_b = (_a = $qs("".concat(formID))) === null || _a === void 0 ? void 0 : _a.checkValidity()) !== null && _b !== void 0 ? _b : false;
        if (!infoFormValidity) {
            store.dispatch(updateEnvironment({
                modalPageType: modalPage,
                customerExists: modalPage === 'returning',
                requestedPage: undefined
            }));
            openSlideUpView('ship-to');
            (_c = $qs("".concat(formID))) === null || _c === void 0 ? void 0 : _c.reportValidity();
            return false;
        }
    }
    var shouldCheckAdditionalFieldsOrAccountInfo = Environment.modalUI.requestedPage() !== 'shipping';
    if (!shouldCheckAdditionalFieldsOrAccountInfo) {
        return true;
    }
    var location1 = Environment.customer.existing() ? 'existing' : 'new';
    var locationAltNames = {
        existing: 'returning',
        new: 'new'
    };
    var additionalFieldsValidity = (_d = $qs("#additional-fields-".concat(location1))) === null || _d === void 0 ? void 0 : _d.checkValidity();
    if (!additionalFieldsValidity) {
        if (Environment.modalUI.requestedPage() === 'payment' && Environment.modalUI.page() !== 'shipping') {
            store.dispatch(updateEnvironment({
                modalPageType: 'shipping',
                requestedPage: undefined
            }));
        }
        if (Environment.modalUI.page() === 'returning') {
            openSlideUpView('additional');
        }
        var additionalFieldsCount_1 = 0;
        $qsAll('.extra-field:invalid').forEach(function ($el) {
            var _a, _b, _c, _d;
            additionalFieldsCount_1++;
            var accordionInner = $el.inputMode === 'checkbox' ? (_b = (_a = $el.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode : [
                'INPUT',
                'TEXTAREA'
            ].includes($el.tagName) ? (_c = $el.parentNode) === null || _c === void 0 ? void 0 : _c.parentNode : $el.parentNode;
            if (accordionInner) {
                var accordionHeader = (_d = accordionInner.parentNode) === null || _d === void 0 ? void 0 : _d.firstElementChild;
                if (accordionHeader) {
                    accordionHeader.classList.add('fill');
                    var $chevron = accordionHeader.getElementsByTagName('img')[0];
                    if ($chevron) {
                        $chevron.style.transform = 'scaleY(-1)';
                    }
                }
                accordionInner.classList.remove('collapse');
                accordionInner.classList.remove('dim');
            }
        });
        setTimeout(function () {
            var _a;
            (_a = $qs("#additional-fields-".concat(location1))) === null || _a === void 0 ? void 0 : _a.reportValidity();
        }, additionalFieldsCount_1 > 1 ? 600 : 0);
        return false;
    }
    var shouldCheckAccountInfo = Environment.modalUI.requestedPage() === undefined;
    if (!shouldCheckAccountInfo) {
        return true;
    }
    var accountInfoValidity = (_f = (_e = $qs("#pp-".concat(locationAltNames[location1], "-customer-store-account-info-form"))) === null || _e === void 0 ? void 0 : _e.checkValidity()) !== null && _f !== void 0 ? _f : true;
    if (accountInfoValidity) {
        return true;
    }
    else {
        (_g = $qs("#pp-".concat(locationAltNames[location1], "-customer-store-account-info-form"))) === null || _g === void 0 ? void 0 : _g.reportValidity();
        return false;
    }
}
function shippingToPayment(event) {
    dispatchRequestedPage('payment');
    event.preventDefault();
    if (checkRequiredFields()) {
        store.dispatch(updateEnvironment({
            modalPageType: 'payment',
            requestedPage: undefined
        }));
    }
}
function continueToPayment() {
    dispatchRequestedPage('payment');
    if (checkRequiredFields()) {
        store.dispatch(updateEnvironment({
            modalPageType: 'payment',
            requestedPage: undefined
        }));
    }
}
function backToInfo() {
    store.dispatch(updateEnvironment({
        modalPageType: 'info',
        customerExists: false
    }));
    store.dispatch(updateCustomerAddressValidation(false));
}
function backToShipping(event, shipToDifferentAddress) {
    if (shipToDifferentAddress === void 0) { shipToDifferentAddress = false; }
    event.preventDefault();
    store.dispatch(updateCustomerAddressValidation(false));
    if (shipToDifferentAddress) {
        var formFields = PeachPayCustomer.data().form_fields;
        formFields['ship_to_different_address'] = '1';
        store.dispatch(updateCustomerFields(formFields));
        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
        $qs('#pp-refresh-shipping-options', function ($element) {
            $element.style.display = 'block';
        });
        $qs('#shipping-options-container-address', function ($element) { return $element.classList.add('pp-opacity-0'); });
        $qs('#pp-shipping-options', function ($element) { return $element.classList.add('hide'); });
    }
    store.dispatch(updateEnvironment({
        modalPageType: 'shipping',
        customerExists: false
    }));
}
function initModal(message) {
    var _this = this;
    var _a, _b, _c, _d;
    initPageSwitch();
    insertCustomCheckoutCSS(message);
    var prevCurrencyCode = '';
    var prevModalPage = '';
    var prevCartContainedSubscription = false;
    store.subscribe(function () {
        var _a, _b;
        if (Environment.modalUI.open()) {
            $qs('#pp-modal-content', function ($element) { return $element.style.display = 'flex'; });
        }
        else if (!Environment.modalUI.open()) {
            $qs('#pp-modal-content', function ($element) { return $element.style.display = 'none'; });
            return;
        }
        addReferralLink();
        renderButtonColorTheme(Environment.plugin.buttonColor());
        renderTestModeBannerDisplay(Environment.testMode());
        renderModalPageIndicator(Environment.modalUI.page());
        renderLogoContainer();
        renderModalNavigation(Environment.modalUI.page());
        renderContinueButtonDisplay(Environment.modalUI.page());
        renderContinueError(Environment.modalUI.page(), PeachPayOrder.errorMessage());
        renderContinueButtonLoading(Environment.modalUI.loadingMode());
        ppDisabledLoading(Environment.modalUI.loadingMode());
        ppDisableProcessing(Environment.modalUI.loadingMode());
        ppBlurOnRecalculate(Environment.modalUI.loadingMode(), prevCurrencyCode !== MerchantConfiguration.currency.code());
        prevCurrencyCode = MerchantConfiguration.currency.code();
        if (prevModalPage !== Environment.modalUI.page()) {
            resetModalHeight();
            prevModalPage = Environment.modalUI.page();
        }
        renderModalPage(Environment.modalUI.page());
        renderTermsAndCondition(Environment.modalUI.page(), (_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.wc_terms_conditions) !== null && _b !== void 0 ? _b : '');
        skipShippingPage();
        renderFreeOrderDisplay(DefaultCart.contents().length, Carts.total());
        renderHideOnMobile(Environment.customer.mobile());
        renderMerchantCustomerAccountFormFields1(prevCartContainedSubscription !== Carts.subscriptionPresent());
        prevCartContainedSubscription = Carts.subscriptionPresent();
        displayErrorMessage(PeachPayOrder.errorMessage());
        renderSummaryBorder();
        if (Environment.modalUI.open()) {
            checkCurrentSentrySpan(Environment.modalUI.page(), Environment.modalUI.loadingMode(), Environment.customer.existing());
        }
        centerModal();
    });
    onWindowMessage('UI::modalOpened', function (_) {
        store.dispatch(updateEnvironment({
            modalIsOpen: true
        }));
    });
    onWindowMessage('UI::modalClosed', function (_) {
        store.dispatch(updateEnvironment({
            modalIsOpen: false
        }));
        resetModalHeight();
        $qs('#pp-express-payments', function ($el) {
            if ($el !== null) {
                var $el2 = $el.querySelector('.pp-pm-type');
                if ($el2 !== null) {
                    $el2.classList.remove('selected');
                    setupExpressPaymentSection(false);
                }
            }
        });
        store.dispatch(stopModalLoading());
    });
    onWindowMessage('buttonClicked', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    openCheckoutModal();
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation(!Environment.customer.existing())];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    }); });
    $qsAll('.pp-exit', function (element) {
        element.addEventListener('click', requestCloseModal);
    });
    (_a = $qs('.pp-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', requestCloseModal);
    (_b = $qs('.pp-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('keypress', requestCloseModal);
    self.addEventListener('keydown', tabToExit);
    $qsAll('.pp-existing-chevron-right.pp-default-to-new-checkout', function (element) {
        element.addEventListener('click', backToInfo);
    });
    $qs('#edit-info', function ($element) {
        $element.addEventListener('click', function (event) {
            backToShipping(event, true);
        });
    });
    $qsAll('.pp-back-to-info', function (element) {
        element.addEventListener('click', backToInfo);
    });
    $qsAll('.pp-back-to-shipping', function (element) {
        element.addEventListener('click', backToShipping);
    });
    (_c = $qs('#pp-continue-to-payment')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', continueToPayment);
    (_d = $qs('#pp-continue-to-payment-mobile')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', continueToPayment);
}
function initShipping(message) {
    initShippingEvents();
    store.dispatch(updateMerchantGeneralConfig(__assign(__assign({}, store.getState().merchantConfiguration.general), { wcLocationInfoData: message.phpData.wc_location_info })));
    store.dispatch(updateMerchantShippingConfig({
        shippingZones: Number.parseInt(message.phpData.num_shipping_zones)
    }));
}
function cartIsVirtual(cart) {
    var _a;
    if ((cart === null || cart === void 0 ? void 0 : cart.length) === 0) {
        return true;
    }
    return (_a = cart === null || cart === void 0 ? void 0 : cart.every(function (v) { return v.virtual; })) !== null && _a !== void 0 ? _a : true;
}
function buildSubscriptionPriceMetaData(meta, __short) {
    if (__short === void 0) { __short = false; }
    if (!meta.subscription) {
        return '';
    }
    if (Number.parseInt(String(meta.subscription.period_interval)) === 1) {
        return " / ".concat(meta.subscription.period);
    }
    if (__short) {
        return " every ".concat(meta.subscription.period_interval, " ").concat(meta.subscription.period, "s");
    }
    return " every ".concat(meta.subscription.period_interval, " ").concat(meta.subscription.period, "s for ").concat(meta.subscription.length, " ").concat(meta.subscription.period, "s");
}
function getOneClickURL(merchantHostname, isTestMode) {
    if (isTestMode) {
        switch (merchantHostname) {
            case 'store.local':
            case 'woo.store.local':
                return 'https://dev-connect.peachpay.local/';
            default:
                return 'https://dev-connect-v2.peachpaycheckout.com/';
        }
    }
    switch (merchantHostname) {
        case 'localhost':
        case '127.0.0.1':
        case 'woo.peachpay.app':
        case 'theme1.peachpay.app':
        case 'theme2.peachpay.app':
        case 'theme3.peachpay.app':
        case 'theme4.peachpay.app':
        case 'theme5.peachpay.app':
        case 'qa.peachpay.app':
        case 'qa-david.peachpay.app':
        case 'qa-vikrant.peachpay.app':
        case 'demo-plum.peachpay.app':
        case 'demo.peachpay.app':
            return 'https://dev-connect-v2.peachpaycheckout.com/';
        case 'store.local':
        case 'woo.store.local':
            return 'https://connect.peachpay.local/';
        default:
            return 'https://connect-v2.peachpaycheckout.com/';
    }
}
function determinePageType(isCartPage, isCheckoutPage, isShopPage) {
    if (isCartPage) {
        return 'cart';
    }
    if (isCheckoutPage) {
        return 'checkout';
    }
    if (isShopPage) {
        return 'shop';
    }
    return 'product';
}
function initShippingForm() {
    $qs('#pp-different-shipping-details', function ($element) {
        $element.addEventListener('submit', function (e) {
            e.preventDefault();
            return false;
        });
    });
}
function formGenerator(fieldData, fieldOrder, section, formIdDifferentiator) {
    if (formIdDifferentiator === void 0) { formIdDifferentiator = ''; }
    var formId = "pp-".concat(formIdDifferentiator + (formIdDifferentiator ? '-' : ''), "info-form");
    var form = section === '' ? "<form id=\"".concat(formId, "\" class=\"pp-info-form flex col\"><div class=\"flex col pp-form-rows-container\">") : '';
    var i = 0;
    var rowSpace = 100;
    var rowElement = '';
    var labelNameTranslations = {
        'Shipping': getLocaleText('Shipping'),
        'Billing': getLocaleText('Billing'),
        'Personal': getLocaleText('Personal')
    };
    while (fieldData[fieldOrder[i]]) {
        var fieldWidth = parseInt(fieldData[fieldOrder[i]].width);
        var label = labelNameTranslations[fieldData[fieldOrder[i]].field_label] ? labelNameTranslations[fieldData[fieldOrder[i]].field_label] : fieldData[fieldOrder[i]].field_label;
        if (fieldData[fieldOrder[i]].type_list === 'header') {
            if (rowElement.length !== 0) {
                if (rowSpace !== 0) {
                    rowElement += "<div class=\"pp-fw-".concat(rowSpace, "\"></div>");
                }
                rowElement += '</div>';
                form += rowElement;
                rowSpace = 100;
                rowElement = '';
            }
            if (fieldData[fieldOrder[i]].field_name.match(/-store-account-form-header/)) {
                form += "<div id=\"".concat(fieldData[fieldOrder[i]].field_name, "-field\" class=\"").concat(fieldData[fieldOrder[i]].field_name, " pp-tooltip\">\n\t\t\t\t\t<span class=\"pp-title pp-account-title\">").concat(label, "</span>\n\t\t\t\t\t<span class=\"pp-question-mark\"><img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\"></span>\n\t\t\t\t\t<span class=\"pp-tooltipHidden\">").concat(accountLoginExplanation(), "</span>\n\t\t\t\t</div>");
            }
            else {
                form += "<div id=\"".concat(fieldData[fieldOrder[i]].field_name, "-field\" class=\"").concat(fieldData[fieldOrder[i]].field_name, "\"><span class=\"pp-info-form-header\">").concat(label, "</span></div>");
            }
            i++;
            continue;
        }
        if (rowSpace < fieldWidth) {
            if (rowSpace !== 0) {
                rowElement += "<div class=\"pp-fw-".concat(rowSpace, "\"></div>");
            }
            rowElement += '</div>';
            form += rowElement;
            rowSpace = 100;
            rowElement = '';
        }
        if (rowSpace >= fieldWidth) {
            if (rowElement.length === 0) {
                rowElement = '<div class="flex pp-form-row">';
            }
            rowElement += generateFieldElement1(fieldData[fieldOrder[i]], section);
            rowSpace -= fieldWidth;
            i++;
        }
    }
    if (rowElement.length !== 0) {
        if (rowSpace !== 0) {
            rowElement += "<div class=\"pp-fw-".concat(rowSpace, "\"></div>");
        }
        rowElement += '</div>';
        form += rowElement;
    }
    return form;
}
function generateFieldElement1(fieldData, section) {
    var _a, _b;
    var fieldWidth = parseInt(fieldData.width);
    var elementString = "<div\n\t\t\tclass=\"".concat(fieldData.field_name, "-field") + (fieldData.type_list === 'radio' ? ' flex-col' : ' flex') + " pp-fw-".concat(fieldWidth, "\"\n\t\t\t").concat(fieldData.type_list === 'checkbox' ? 'style="align-items: center;"' : '', "\n\t\t>");
    var optional = fieldWidth <= 30 ? '<span class="optional"> (opt.) </span>' : '<span class="optional"> (optional) </span>';
    var labelNameTranslations = {
        'Street address': getLocaleText('Street address'),
        'Apartment': getLocaleText('Apartment'),
        'City': getLocaleText('City'),
        'Country': getLocaleText('Country'),
        'Email': getLocaleText('Email'),
        'First name': getLocaleText('First name'),
        'Last name': getLocaleText('Last name'),
        'Phone number': getLocaleText('Phone number'),
        'Postal code': getLocaleText('Postal code'),
        'State': getLocaleText('State'),
        'Province': getLocaleText('Province')
    };
    var label = labelNameTranslations[fieldData.field_label] ? labelNameTranslations[fieldData.field_label] : fieldData.field_label;
    var labelBuilder = function () { return "<label title=\"".concat(label, "\" for=\"").concat(fieldData.field_name, "\"\n\t\tclass=\"").concat(fieldData.type_list === 'checkbox' || fieldData.type_list === 'radio' ? 'pp-alt-label' : 'pp-form-label', "\n\t\t").concat(fieldData.type_list === 'select' ? ' pp-select-label' : '', "\">\n\t\t\t").concat(getLimitedLabel(fieldData, label), "\n\t\t\t").concat(!fieldData.field_required && ![
        'Apartment',
        'Apt.'
    ].includes(fieldData.field_label) ? optional : '', "\n\t\t</label>").concat(fieldData.type_list === 'select' ? '<div class="pp-form-chevron"><img src="img/chevron-down-solid.svg"/></div>' : ''); };
    var inputBuilder = function () { return "<input type=\"".concat(fieldData.type_list, "\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tplaceholder=\" \"") + (fieldData.field_default ? "value=\"".concat(fieldData.field_default.replaceAll('"', '&quot;'), "\"") : '') + "class=\"pp-fw-100 text-input\"" + (fieldData.field_required ? ' required' : '') + '/>'; };
    var selectBuilder = function (optionOrder) { return "<select name=".concat(fieldData.field_name, "\n\t\t\tclass=\"pp-fw-100\"\n\t\t\t").concat(fieldData.field_required ? 'required' : '', ">\n\t\t\t\t").concat(optionBuilder(optionOrder), "\n\t\t</select>\n\t\t").concat(labelBuilder()); };
    var optionBuilder = function (optionOrder) {
        if (optionOrder.length === 0) {
            return;
        }
        var optionList = '<option value="">Please Select</option>';
        optionOrder.forEach(function (value) {
            if (value[0] && value[1]) {
                optionList += "<option value=\"".concat(value[0], "\">").concat(value[1].replaceAll('\\"', '"').replaceAll("\\'", "'"), "</option>");
            }
        });
        return optionList;
    };
    var radioFieldBuilder = function (optionOrder) {
        var radioFields = "<div class=\"pp-radio-field\">";
        if (fieldData.field_name.match(/-store-account-login-type/)) {
            radioFields += "<div class=\"pp-tooltip\">\n\t\t\t\t<span class=\"pp-title pp-account-title\">".concat(label, "</span>\n\t\t\t\t<span class=\"pp-question-mark\"><img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\"></span>\n\t\t\t\t<span class=\"pp-tooltipHidden\">").concat(accountLoginExplanation(), "</span>\n\t\t\t</div>");
        }
        else {
            radioFields += fieldData.field_label ? labelBuilder() : '';
        }
        radioFields += '<div class="pp-radio-option-container">';
        var first = true;
        optionOrder.forEach(function (value) {
            if (value[0] && value[1]) {
                radioFields += "<label class=\"pp-radio-line\"><input type=".concat(fieldData.type_list, "\n\t\t\t\tname=\"").concat(fieldData.field_name, "\"") + "value=\"".concat(value[0], "\"") + "class=\"pp-radio-input\"" + (fieldData.field_required && first ? ' required' : '') + (fieldData.field_default === value[0] ? ' checked' : '') + '/>';
                radioFields += "<span class=\"radio-option-label\">".concat(value[1].replaceAll('\\"', '"').replaceAll("\\'", "'"), "</span></label>");
                if (first) {
                    first = false;
                }
            }
        });
        radioFields += '</div></div>';
        return radioFields;
    };
    var checkbox = function () { return "\n\t<div class=\"pp-checkbox-input-container\">\n\t\t<input\n\t\t\ttype=\"checkbox\"\n\t\t\tclass=\"pp-form-checkbox\"\n\t\t\tname=\"".concat(fieldData.field_name, "\"\n\t\t\tvalue=\"").concat(fieldData.field_default ? fieldData.field_default : '1', "\"\n\t\t\tstyle=\"float: right;\"\n\t\t\t").concat(fieldData.field_required ? 'required' : '', "\n\t\t>\n\t</div>\n\t").concat(labelBuilder(), "\n\t"); };
    var stateRegionBuilder = function (section) { return "\n\t\t<input name=\"".concat(section, "_province\" class=\"pp-fw-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"").concat(section, "_province\" class=\"pp-form-label\">").concat(labelNameTranslations['Province'] + optional, "</label>\n\t\t<select name=\"").concat(fieldData.field_name, "\" class=\"pp-fw-100 select hide\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"").concat(fieldData.field_name, "\" class=\"pp-form-label pp-select-label hide\"></label>\n\t\t<div class=\"pp-form-chevron\"><img src=\"img/chevron-down-solid.svg\"/></div>\n\t\t"); };
    var countryFieldBuilder = function () { return "\n\t\t<select class=\"w-100\" name=\"".concat(fieldData.field_name, "\" size=\"1\" ").concat(fieldData.field_required ? 'required' : '', ">\n\t\t\t<option hidden disabled selected>\n\t\t\t\t").concat(getLocaleText('Select a country'), "\n\t\t\t</option>\n\t\t</select>\n\t\t<label for=\"").concat(fieldData.field_name, "\" class=\"pp-form-label pp-select-label\">\n\t\t\t").concat(getLocaleText('Country'), "\n\t\t</label>\n\t\t<div class=\"pp-form-chevron\"><img src=\"img/chevron-down-solid.svg\"/></div>\n\t"); };
    var passwordInputBuilder = function () { return "<input type=\"".concat(fieldData.type_list, "\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tplaceholder=\" \"\n\t\t\tminlength=\"8\"") + (fieldData.field_default ? "value=\"".concat(fieldData.field_default.replaceAll('"', '&quot;'), "\"") : '') + "class=\"pp-fw-100 text-input\"" + (fieldData.field_required ? ' required' : '') + '/>'; };
    if (fieldData.type_list === 'text' || fieldData.type_list === 'email' || fieldData.type_list === 'tel') {
        elementString += inputBuilder() + (fieldData.field_label ? labelBuilder() : '');
        elementString += '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'select') {
        elementString += selectBuilder((_a = fieldData.option_order) !== null && _a !== void 0 ? _a : []);
        elementString += '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'radio') {
        elementString += radioFieldBuilder((_b = fieldData.option_order) !== null && _b !== void 0 ? _b : []);
        elementString += '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'checkbox') {
        elementString += checkbox();
        elementString += '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'country') {
        elementString += countryFieldBuilder() + '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'state') {
        elementString += stateRegionBuilder(section) + '</div>';
        return elementString;
    }
    else if (fieldData.type_list === 'password') {
        elementString += passwordInputBuilder() + (fieldData.field_label ? labelBuilder() : '');
        elementString += '</div>';
        return elementString;
    }
    elementString += '</div>';
    return elementString;
}
function getLimitedLabel(fieldData, label) {
    var fieldWidth = parseInt(fieldData.width);
    if (fieldWidth === 100 && fieldData.type_list === 'radio') {
        return label;
    }
    else {
        try {
            var isOptional = !fieldData.field_required && ![
                'Apartment',
                'Apt.'
            ].includes(fieldData.field_label);
            var optionalTagWidth_1 = 0;
            if (isOptional)
                optionalTagWidth_1 = fieldWidth <= 30 ? 40 : 68;
            var maxWidth_1 = 0;
            if (fieldWidth <= 30) {
                maxWidth_1 = 75;
            }
            else if (fieldWidth <= 50) {
                maxWidth_1 = 164;
            }
            else if (fieldWidth <= 70) {
                maxWidth_1 = 250;
            }
            else {
                maxWidth_1 = 378;
            }
            var $canvas = document.createElement('canvas');
            var ctx_1 = $canvas === null || $canvas === void 0 ? void 0 : $canvas.getContext('2d');
            if (!ctx_1) {
                $canvas.remove();
                return label;
            }
            var font = '14.4px Inter, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans\', Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\'';
            ctx_1.font = font;
            var tooLong = function () { return ctx_1.measureText(label).width + optionalTagWidth_1 > maxWidth_1; };
            if (tooLong()) {
                while (tooLong()) {
                    label = label.slice(0, label.length - 1);
                }
                label += '…';
            }
            $canvas.remove();
            return label;
        }
        catch (_a) {
            return label;
        }
    }
}
function createStore(reducer, preloadedState) {
    var isDispatching = false;
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var dispatch = function (action) {
        if (typeof action !== 'object') {
            throw new TypeError('You may only dispatch plain objects. Received: ' + typeof action);
        }
        if (typeof action.type === 'undefined') {
            throw new TypeError('You may not have an undefined "type" property.');
        }
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }
        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        }
        finally {
            isDispatching = false;
        }
        var listeners = currentListeners = nextListeners;
        for (var i = 0; i < (listeners === null || listeners === void 0 ? void 0 : listeners.length); i++) {
            var listener = listeners[i];
            listener();
        }
        return action;
    };
    var getState = function () {
        if (isDispatching) {
            throw new Error('You may not call getState from within a reducer.');
        }
        return currentState;
    };
    var subscribe = function (listener) {
        var _a;
        if (typeof listener !== 'function') {
            throw new TypeError('Expected a listener to be a function. Instead received: ' + typeof listener);
        }
        if (isDispatching) {
            throw new Error('You may not add a subscriber from a subscription function.');
        }
        var isSubscribed = true;
        if (nextListeners === currentListeners) {
            nextListeners = (_a = currentListeners === null || currentListeners === void 0 ? void 0 : currentListeners.slice()) !== null && _a !== void 0 ? _a : null;
        }
        nextListeners === null || nextListeners === void 0 ? void 0 : nextListeners.push(listener);
        return function () {
            var _a, _b;
            if (!isSubscribed) {
                return;
            }
            if (isDispatching) {
                throw new Error('You may not remove a subscriber while reducing or inside a subscription function.');
            }
            isSubscribed = false;
            if (nextListeners === currentListeners) {
                nextListeners = (_a = currentListeners === null || currentListeners === void 0 ? void 0 : currentListeners.slice()) !== null && _a !== void 0 ? _a : null;
            }
            var index = (_b = nextListeners === null || nextListeners === void 0 ? void 0 : nextListeners.indexOf(listener)) !== null && _b !== void 0 ? _b : 0;
            nextListeners.slice(index, 1);
            currentListeners = null;
        };
    };
    dispatch({
        type: 'init'
    });
    var store = {
        dispatch: dispatch,
        getState: getState,
        subscribe: subscribe
    };
    return store;
}
function safeDispatch(callback) {
    setTimeout(callback, 0);
}
var render = createDispatchUpdate(DispatchActionType.INIT);
cartSummaryViewData('0');
function cartSummaryViewData(cartKey) {
    return function () {
        var calculatedCart = store.getState().calculatedCarts[cartKey];
        if (!calculatedCart) {
            return {
                cartSummary: new Array(),
                cartMeta: {
                    is_virtual: false
                }
            };
        }
        var cartSummary = [];
        var cartMeta = calculatedCart.cart_meta;
        cartSummary.push({
            key: getLocaleText('Subtotal'),
            value: calculatedCart.summary.subtotal
        });
        if (calculatedCart.cart.length > 0) {
            for (var _i = 0, _a = Object.entries(calculatedCart.summary.coupons_record); _i < _a.length; _i++) {
                var _b = _a[_i], coupon = _b[0], amount = _b[1];
                if (!amount) {
                    continue;
                }
                cartSummary.push({
                    key: "".concat(getLocaleText('coupon'), " - (").concat(coupon, ") <button class=\"pp-coupon-remove-button\" data-coupon=\"").concat(coupon, "\" type=\"button\" tabindex=\"0\">[&times;]</button>"),
                    value: -amount
                });
            }
        }
        for (var _c = 0, _d = Object.entries(calculatedCart.summary.fees_record); _c < _d.length; _c++) {
            var _e = _d[_c], fee = _e[0], amount1 = _e[1];
            if (!amount1) {
                continue;
            }
            cartSummary.push({
                key: "Fee - (".concat(fee, ")"),
                value: amount1
            });
        }
        if (!calculatedCart.cart_meta.is_virtual) {
            cartSummary.push({
                key: getLocaleText('Shipping'),
                value: calculatedCart.summary.total_shipping
            });
        }
        if (MerchantConfiguration.tax.displayMode() === 'excludeTax') {
            cartSummary.push({
                key: getLocaleText('Tax'),
                value: calculatedCart.summary.total_tax
            });
        }
        if (calculatedCart.cart.length > 0) {
            for (var _f = 0, _g = Object.entries(calculatedCart.summary.gift_card_record); _f < _g.length; _f++) {
                var _h = _g[_f], giftCard = _h[0], amount2 = _h[1];
                if (!amount2) {
                    continue;
                }
                cartSummary.push({
                    key: "Gift card - (".concat(giftCard, ")"),
                    value: -amount2
                });
            }
        }
        cartSummary.push({
            key: getLocaleText('Total'),
            value: calculatedCart.summary.total
        });
        return {
            cartSummary: cartSummary,
            cartMeta: cartMeta
        };
    };
}
var MerchantCustomer = {
    loggedIn: function () { return store.getState().merchantCustomer.loggedIn; }
};
function ppBlurOnRecalculate(loadingMode, currencyChanged) {
    if (loadingMode === 'loading') {
        $qsAll('.pp-recalculate-blur', function (element) {
            element.classList.add('pp-blur');
        });
        if (currencyChanged) {
            $qsAll('.pp-currency-blur', function (element) {
                element.classList.add('pp-blur');
            });
        }
    }
    else {
        $qsAll('.pp-recalculate-blur', function (element) {
            element.classList.remove('pp-blur');
        });
        $qsAll('.pp-currency-blur', function (element) {
            element.classList.remove('pp-blur');
        });
    }
}
function renderFreeOrderDisplay(cartCount, allCartsTotal) {
    if (cartCount > 0 && allCartsTotal === 0) {
        $qsAll('.pp-hide-on-free-order', function ($el) { return $el.classList.add('hide'); });
    }
    else {
        $qsAll('.pp-hide-on-free-order', function ($el) { return $el.classList.remove('hide'); });
    }
}
function displayErrorMessage(errorMessage) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (errorMessage !== '') {
        (_a = $qs('#pp-payment-form')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#payment-methods')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        for (var _i = 0, _j = $qsAll('.hide-when-invalid'); _i < _j.length; _i++) {
            var $element = _j[_i];
            $element.classList.add('hide');
        }
        (_c = $qs('#invalid-order-message')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        (_d = $qs('#invalid-order-message-existing')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        $qs('#invalid-order-message', function ($element) { return $element.innerHTML = errorMessage; });
        $qs('#invalid-order-message-existing', function ($element) { return $element.innerHTML = errorMessage; });
    }
    else {
        (_e = $qs('#pp-payment-form')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('#payment-methods')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
        for (var _k = 0, _l = $qsAll('.hide-when-invalid'); _k < _l.length; _k++) {
            var $element1 = _l[_k];
            $element1.classList.remove('hide');
        }
        (_g = $qs('#invalid-order-message')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#invalid-order-message-existing')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
    }
}
function openCheckoutModal() {
    var _a;
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage('openModal', '*');
}
function requestCloseModal(event) {
    var _a;
    if (!eventClick(event)) {
        return;
    }
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage('closeModal', '*');
}
function tabToExit(event) {
    if (event.key === 'Tab') {
        if (event.target.classList.contains('peachpay-logo-link')) {
            event.preventDefault();
            $qs('.pp-close', function ($element) { return $element.focus(); });
        }
    }
}
function renderContinueButtonDisplay(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (modalPage === 'info') {
        (_a = $qs('#pp-continue-to-shipping-mobile')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#pp-continue-to-payment-mobile')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('.pay-button-container-mobile')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
    }
    else if (modalPage === 'shipping') {
        (_d = $qs('#pp-continue-to-shipping-mobile')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        (_e = $qs('#pp-continue-to-payment-mobile')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('.pay-button-container-mobile')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
    }
    else if (modalPage === 'payment') {
        (_g = $qs('#pp-continue-to-shipping-mobile')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#pp-continue-to-payment-mobile')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
        (_j = $qs('.pay-button-container-mobile')) === null || _j === void 0 ? void 0 : _j.classList.remove('hide');
    }
}
function renderContinueError(modalPage, errorMessage) {
    $qsAll('.pp-continue-order-error', function (element) {
        element.innerHTML = '';
        element.classList.remove('pp-error');
    });
    if (modalPage === 'info' && errorMessage !== '') {
        $qsAll('.pp-continue-order-error', function (element) {
            element.innerHTML = errorMessage;
            element.classList.add('pp-error');
        });
    }
}
function renderContinueButtonLoading(loadingMode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (loadingMode === 'loading') {
        $qs('#pp-continue-to-shipping', function ($element) { return $element.disabled = true; });
        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
        $qs('#pp-continue-to-shipping-mobile', function ($element) { return $element.disabled = true; });
        (_a = $qs('#continue-spinner-shipping')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#continue-spinner-payment')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#continue-spinner-shipping-mobile')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        (_d = $qs('#continue-spinner-payment-mobile')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        $qsAll('.modal-lock-icon', function ($element) { return $element.classList.add('hide'); });
    }
    else {
        $qs('#pp-continue-to-shipping', function ($element) { return $element.disabled = false; });
        if (!PeachPayCustomer.shipToDifferentAddress() || ((_e = $qs('#pp-refresh-shipping-options')) === null || _e === void 0 ? void 0 : _e.style.display) !== 'block') {
            $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
        }
        $qs('#pp-continue-to-shipping-mobile', function ($element) { return $element.disabled = false; });
        (_f = $qs('#continue-spinner-shipping')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        (_g = $qs('#continue-spinner-payment')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#continue-spinner-shipping-mobile')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
        (_j = $qs('#continue-spinner-payment-mobile')) === null || _j === void 0 ? void 0 : _j.classList.add('hide');
        $qsAll('.modal-lock-icon', function ($element) { return $element.classList.remove('hide'); });
    }
}
function ppDisableProcessing(loadingMode) {
    if (loadingMode === 'processing') {
        $qsAll('.pp-disabled-processing', function ($element) {
            $element.classList.add('pp-disabled');
            $element.disabled = true;
        });
    }
    else {
        $qsAll('.pp-disabled-processing', function ($element) {
            $element.classList.remove('pp-disabled');
            $element.disabled = false;
        });
    }
}
function ppDisabledLoading(loadingMode) {
    if (loadingMode !== 'finished') {
        $qsAll('.pp-disabled-loading', function ($element) {
            $element.classList.add('pp-disabled');
            $element.tabIndex = 0;
        });
    }
    else {
        $qsAll('.pp-disabled-loading', function ($element) {
            $element.classList.remove('pp-disabled');
            $element.tabIndex = -1;
        });
    }
}
function renderLogoContainer() {
    $qs('.logo-container', function ($el) {
        if (Environment.customer.existing()) {
            $el.classList.add('logo-container-existing-customer');
        }
        else {
            $el.classList.remove('logo-container-existing-customer');
        }
    });
}
function renderTestModeBannerDisplay(testMode) {
    var _a, _b, _c;
    if (testMode) {
        (_a = $qs('#pp-modal-content')) === null || _a === void 0 ? void 0 : _a.classList.add('test-mode-border');
        (_b = $qs('.test-mode-banner')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        $qs('#pp-modal-content', function ($element) { return $element.style.paddingTop = '1.25rem'; });
        (_c = $qs('.pp-close')) === null || _c === void 0 ? void 0 : _c.classList.add('pp-close-test-mode');
    }
}
function renderButtonColorTheme(color) {
    if (color === void 0) { color = '#FF876C'; }
    document.documentElement.style.setProperty('--peachpay-theme-color', color);
    document.documentElement.style.setProperty('--peachpay-theme-color-opaque', color + '80');
    document.documentElement.style.setProperty('--peachpay-theme-color-light', color + '20');
}
function dispatchRequestedPage(page) {
    store.dispatch(updateEnvironment({
        requestedPage: page
    }));
}
function dispatchPayment() {
    dispatchRequestedPage('payment');
}
function skipShippingPage() {
    var _a, _b, _c;
    var shouldSkipShippingPage = cartIsVirtual(DefaultCart.contents()) && ((_a = $qs('#additional-fields-new')) === null || _a === void 0 ? void 0 : _a.classList.contains('hide'));
    if (shouldSkipShippingPage) {
        (_b = $qs('#pp-checkout-status-middle')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        $qsAll('#pp-continue-to-shipping, #pp-continue-to-shipping-mobile').forEach(function ($el) {
            $el.addEventListener('click', dispatchPayment);
        });
        $qsAll('.pp-back-to-shipping', function (element) {
            element.addEventListener('click', backToInfo);
        });
    }
    else {
        (_c = $qs('#pp-checkout-status-middle')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        $qsAll('#pp-continue-to-shipping, #pp-continue-to-shipping-mobile').forEach(function ($el) {
            $el.removeEventListener('click', dispatchPayment);
        });
        $qsAll('.pp-back-to-shipping', function (element) {
            element.removeEventListener('click', backToInfo);
        });
    }
}
function resetModalHeight() {
    var modal = $qs('#pp-modal-content');
    if (modal) {
        modal.style.removeProperty('height');
    }
}
function centerModal() {
    var modal = $qs('#pp-modal-content');
    var ppContainer = $qs('.pp-container');
    if (modal && ppContainer) {
        var minHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
        if (ppContainer.scrollHeight <= minHeight) {
            if (window.matchMedia('(max-width: 900px)').matches) {
                modal.style.height = "".concat(minHeight, "px");
                ppContainer.parentElement.style.removeProperty('height');
            }
            else {
                ppContainer.parentElement.style.height = '100vh';
            }
        }
    }
}
function closeSlideUpView(modalName) {
    var _a, _b, _c;
    var ppModalContent = $qs("#pp-modal-content");
    if (ppModalContent) {
        ppModalContent.style.removeProperty('height');
        ppModalContent.style.removeProperty('overflow');
        ppModalContent.classList.add('pp-content-pb');
    }
    var location1 = (ppModalContent === null || ppModalContent === void 0 ? void 0 : ppModalContent.classList.contains('pp-content-returning')) ? 'existing' : 'new';
    (_a = $qs("#pp-slide-up-".concat(modalName, "-existing"))) === null || _a === void 0 ? void 0 : _a.classList.remove('expanded');
    (_b = $qs("#pp-".concat(location1, "-customer-checkout"))) === null || _b === void 0 ? void 0 : _b.classList.remove('pp-dark-blur');
    if (modalName === 'cart') {
        (_c = $qs("#pp-dropdown".concat(Environment.modalUI.page() === 'returning' ? '' : '-new'))) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-expanded', 'false');
    }
    centerModal();
}
function openCart() {
    openSlideUpView('cart');
}
function openCartWithKeyPress(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.key === 'Enter' || event.key === ' ') {
        openSlideUpView('cart');
    }
}
function renderHideOnMobile(isMobile) {
    if (isMobile) {
        $qsAll('.pp-hide-on-mobile', function ($el) { return $el.classList.add('hide'); });
    }
    else {
        $qsAll('.pp-hide-on-mobile', function ($el) { return $el.classList.remove('hide'); });
    }
}
function renderTermsAndCondition(page, terms) {
    if (page === 'payment' || page === 'returning') {
        var merchantTermsConditions_1 = terms ? "".concat(getLocaleText("the store's"), " <a href='").concat(terms, "' target='_blank'>").concat(getLocaleText('terms and conditions'), "</a> ").concat(getLocaleText('and')) : '';
        $qsAll('.pp-tc-section', function ($el) {
            var _a;
            $el.innerHTML = '';
            if (location.hostname === 'legoudalier.com' || location.hostname === 'www.findyourvalues.com') {
                $el.innerHTML += "<div>\n\t\t\t\t\t\t<input type=\"checkbox\" id=\"save-payment-info-checkbox\" ".concat(Environment.customer.saveToLocalStorage() ? 'checked' : '', ">\n\t\t\t\t\t\t<label for=\"save-payment-info-checkbox\">Save information for one click checkout when returning</label>\n\t\t\t\t\t</div>");
                (_a = document.getElementById('save-payment-info-checkbox')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
                    var ischecked = event.target.checked;
                    store.dispatch(updateEnvironment({
                        saveToLocalStorage: ischecked
                    }));
                });
            }
            $el.innerHTML += "<label class='pp-tc-contents'>".concat(getLocaleText('By clicking the button above, you agree to'), " ").concat(merchantTermsConditions_1, " ").concat(getLocaleText('the'), " PeachPay <a href='https://peachpay.app/terms' target='_blank'>").concat(getLocaleText('terms'), "</a> ").concat(getLocaleText('and'), " <a href='https://peachpay.app/privacy' target='_blank'>").concat(getLocaleText('privacy policy'), "</a>.</label>");
            $el.classList.remove('hide');
        });
    }
    else {
        $qsAll('.pp-tc-section', function ($el) { return $el.classList.add('hide'); });
    }
}
function insertCustomCheckoutCSS(message) {
    var _a, _b;
    var $body = document.querySelector('body');
    if ($body) {
        var $style = document.createElement('style');
        $style.id = 'pp-custom-checkout-css';
        $style.appendChild(document.createTextNode((_b = (_a = message.phpData.custom_checkout_css) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : ''));
        $body.insertAdjacentElement('beforeend', $style);
    }
}
function checkCurrentSentrySpan(page, loadingMode, existingCustomer) {
    var _a;
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage({
        event: 'sentryUpdate',
        page: page,
        loadingMode: loadingMode,
        existingCustomer: existingCustomer
    }, '*');
}
function addReferralLink() {
    $qsAll('.peachpay-logo-link', function ($el) {
        $el.href = "https://peachpay.app/?referral=".concat(encodeURIComponent(MerchantConfiguration.name()));
    });
}
function openPayPalSentrySpan() {
    var _a;
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage({
        event: 'sentryUpdate',
        page: 'paypal',
        loadingMode: 'finished',
        existingCustomer: true
    }, '*');
}
function shouldShowMerchantCustomerAccountRegistrationEmailField() {
    return true;
}
function shouldShowMerchantCustomerAccountRegistrationPasswordField() {
    return !MerchantConfiguration.accounts.generatePasswordEnabled();
}
function shouldShowMerchantCustomerAccountLoginTypeCheckboxes() {
    var checkboxCount = 0;
    if (shouldAllowMerchantCustomerAccountLogin())
        checkboxCount++;
    if (shouldAllowMerchantCustomerAccountRegistration())
        checkboxCount++;
    if (shouldAllowMerchantCustomerAccountOmission())
        checkboxCount++;
    return checkboxCount >= 2;
}
function shouldAllowMerchantCustomerAccountLogin() {
    if (MerchantCustomer.loggedIn()) {
        return false;
    }
    if (Carts.subscriptionPresent()) {
        return true;
    }
    return MerchantConfiguration.accounts.loginDuringCheckoutEnabled();
}
function shouldAllowMerchantCustomerAccountRegistration() {
    if (MerchantCustomer.loggedIn()) {
        return false;
    }
    if (Carts.subscriptionPresent()) {
        return true;
    }
    return MerchantConfiguration.accounts.registrationDuringCheckoutEnabled();
}
function shouldAllowMerchantCustomerAccountOmission() {
    if (Carts.subscriptionPresent()) {
        return false;
    }
    return MerchantConfiguration.accounts.allowGuestCheckout();
}
function addLoginTypeRadioEventListener(idDifferentiator) {
    if (document.querySelector("input[name=\"".concat(idDifferentiator, "-store-account-login-type\"]"))) {
        document.querySelectorAll("input[name=\"".concat(idDifferentiator, "-store-account-login-type\"]")).forEach(function (element) {
            element.addEventListener('change', function () {
                renderMerchantCustomerAccountFormFields(idDifferentiator);
            });
        });
    }
}
function setEmailFieldDefaultValues(idDifferentiator) {
    var $accountLoginEmailField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-email\"]"));
    var $accountRegistrationEmailField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-registration-email\"]"));
    if ($accountLoginEmailField) {
        $accountLoginEmailField.value = PeachPayCustomer.billing.email();
    }
    if ($accountRegistrationEmailField) {
        $accountRegistrationEmailField.value = PeachPayCustomer.billing.email();
    }
}
function renderMerchantCustomerAccountFormFields(idDifferentiator) {
    var _a, _b;
    var loginType = getMerchantCustomerAccountLoginType(idDifferentiator);
    var $accountLoginEmailField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-email\"]"));
    var $accountRegistrationEmailField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-registration-email\"]"));
    var $accountLoginPasswordField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-login-password\"]"));
    var $accountRegistrationPasswordField = $qs("input[name=\"".concat(idDifferentiator, "-store-account-registration-password\"]"));
    var $accountLoginFields = (_a = $accountLoginEmailField === null || $accountLoginEmailField === void 0 ? void 0 : $accountLoginEmailField.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    var $accountRegistrationFields = (_b = $accountRegistrationEmailField === null || $accountRegistrationEmailField === void 0 ? void 0 : $accountRegistrationEmailField.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    switch (loginType) {
        case 'login':
            {
                $accountLoginFields === null || $accountLoginFields === void 0 ? void 0 : $accountLoginFields.classList.remove('hide');
                $accountLoginEmailField === null || $accountLoginEmailField === void 0 ? void 0 : $accountLoginEmailField.setAttribute('required', '');
                $accountLoginPasswordField === null || $accountLoginPasswordField === void 0 ? void 0 : $accountLoginPasswordField.setAttribute('required', '');
                $accountRegistrationFields === null || $accountRegistrationFields === void 0 ? void 0 : $accountRegistrationFields.classList.add('hide');
                $accountRegistrationEmailField === null || $accountRegistrationEmailField === void 0 ? void 0 : $accountRegistrationEmailField.removeAttribute('required');
                $accountRegistrationPasswordField === null || $accountRegistrationPasswordField === void 0 ? void 0 : $accountRegistrationPasswordField.removeAttribute('required');
                return;
            }
        case 'register':
            {
                $accountLoginFields === null || $accountLoginFields === void 0 ? void 0 : $accountLoginFields.classList.add('hide');
                $accountLoginEmailField === null || $accountLoginEmailField === void 0 ? void 0 : $accountLoginEmailField.removeAttribute('required');
                $accountLoginPasswordField === null || $accountLoginPasswordField === void 0 ? void 0 : $accountLoginPasswordField.removeAttribute('required');
                $accountRegistrationFields === null || $accountRegistrationFields === void 0 ? void 0 : $accountRegistrationFields.classList.remove('hide');
                $accountRegistrationEmailField === null || $accountRegistrationEmailField === void 0 ? void 0 : $accountRegistrationEmailField.setAttribute('required', '');
                $accountRegistrationPasswordField === null || $accountRegistrationPasswordField === void 0 ? void 0 : $accountRegistrationPasswordField.setAttribute('required', '');
                return;
            }
        case 'none':
        default:
            {
                $accountLoginFields === null || $accountLoginFields === void 0 ? void 0 : $accountLoginFields.classList.add('hide');
                $accountLoginEmailField === null || $accountLoginEmailField === void 0 ? void 0 : $accountLoginEmailField.removeAttribute('required');
                $accountLoginPasswordField === null || $accountLoginPasswordField === void 0 ? void 0 : $accountLoginPasswordField.removeAttribute('required');
                $accountRegistrationFields === null || $accountRegistrationFields === void 0 ? void 0 : $accountRegistrationFields.classList.add('hide');
                $accountRegistrationEmailField === null || $accountRegistrationEmailField === void 0 ? void 0 : $accountRegistrationEmailField.removeAttribute('required');
                $accountRegistrationPasswordField === null || $accountRegistrationPasswordField === void 0 ? void 0 : $accountRegistrationPasswordField.removeAttribute('required');
                return;
            }
    }
}
var customerAccountFormHeader = {
    'field_default': '',
    'field_enable': 'yes',
    'field_label': '',
    'field_name': '',
    'field_required': 'yes',
    'field_placeholder': '',
    'type_list': 'header',
    'width': '100'
};
var loginTypeRadio = {
    'field_default': '',
    'field_enable': 'yes',
    'field_label': '',
    'field_name': '',
    'field_required': 'yes',
    'field_placeholder': '',
    'type_list': 'radio',
    'width': '100'
};
var loginOption = function () {
    return [
        'login',
        getLocaleText('Login')
    ];
};
var registerOption = function () {
    return [
        'register',
        getLocaleText('Register')
    ];
};
var noneOption = function () {
    return [
        'none',
        getLocaleText('No thanks')
    ];
};
var emailField = function () {
    return {
        'field_default': '',
        'field_enable': 'yes',
        'field_label': getLocaleText('Email'),
        'field_name': '',
        'field_required': 'no',
        'field_placeholder': '',
        'type_list': 'email',
        'width': '50'
    };
};
var passwordField = function () {
    return {
        'field_default': '',
        'field_enable': 'yes',
        'field_label': getLocaleText('Password'),
        'field_name': '',
        'field_required': 'no',
        'field_placeholder': '',
        'type_list': 'password',
        'width': '50'
    };
};
function installMerchantCustomerAccountFormFields() {
    var formNewCustomer = generateMerchantCustomerAccountForm(newCustomerFormIdDifferentiator);
    var $accountLoginFormNewCustomer = $qs('#pp-store-account-info');
    if ($accountLoginFormNewCustomer) {
        $accountLoginFormNewCustomer.innerHTML = formNewCustomer;
        if (shouldRenderAccountLoginForms()) {
            $accountLoginFormNewCustomer.classList.add('pp-section-mt');
        }
    }
    addLoginTypeRadioEventListener(newCustomerFormIdDifferentiator);
    renderMerchantCustomerAccountFormFields(newCustomerFormIdDifferentiator);
    var formReturningCustomer = generateMerchantCustomerAccountForm(returningCustomerFormIdDifferentiator);
    var $accountLoginFormReturningCustomer = $qs('#pp-store-account-info-existing');
    if ($accountLoginFormReturningCustomer) {
        $accountLoginFormReturningCustomer.innerHTML = formReturningCustomer;
        if (shouldRenderAccountLoginForms()) {
            $accountLoginFormReturningCustomer.classList.add('pp-section-mt');
        }
    }
    addLoginTypeRadioEventListener(returningCustomerFormIdDifferentiator);
    renderMerchantCustomerAccountFormFields(returningCustomerFormIdDifferentiator);
}
function renderMerchantCustomerAccountFormFields1(subscriptionsChanged) {
    if (subscriptionsChanged) {
        installMerchantCustomerAccountFormFields();
    }
}
function initPageSwitch() {
    var _a, _b, _c, _d;
    (_a = $qs('#pp-continue-to-shipping')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        dispatchRequestedPage('shipping');
    });
    (_b = $qs('#pp-continue-to-shipping-mobile')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        dispatchRequestedPage('shipping');
    });
    (_c = $qs('#pp-checkout-status-middle')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        dispatchRequestedPage('shipping');
    });
    (_d = $qs('#pp-checkout-status-right')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        dispatchRequestedPage('payment');
    });
}
function renderSummaryBorder() {
    var itemsHeight = 0;
    $qs('#pp-summary-body', function ($parent) {
        var $children = $parent === null || $parent === void 0 ? void 0 : $parent.querySelectorAll('.pp-order-summary-item');
        if (!$children) {
            return;
        }
        for (var _i = 0, _a = Array.from($children); _i < _a.length; _i++) {
            var $child = _a[_i];
            itemsHeight += $child === null || $child === void 0 ? void 0 : $child.clientHeight;
        }
        if (($parent === null || $parent === void 0 ? void 0 : $parent.clientHeight) < itemsHeight) {
            $parent.classList.add('pp-review-border');
        }
        else {
            $parent.classList.remove('pp-review-border');
        }
    });
}
function initShippingEvents() {
    var _this = this;
    var _a, _b, _c, _d, _e;
    store.subscribe(renderShipping);
    (_a = $qs('#pp-shipping-options-existing')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', handleShippingSelectionEvent);
    (_b = $qs('#pp-shipping-options')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', handleShippingSelectionEvent);
    (_c = $qs('#pp-refresh-shipping-options')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var isValidAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalLoading());
                    isValidAddress = true;
                    if (!(!Carts.virtual() || !Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS))) return [3, 2];
                    return [4, validateAddress()];
                case 1:
                    isValidAddress = _a.sent();
                    _a.label = 2;
                case 2: return [4, requestCartCalculation()];
                case 3:
                    _a.sent();
                    store.dispatch(updateCustomerAddressValidation(isValidAddress));
                    store.dispatch(stopModalLoading());
                    if (isValidAddress) {
                        $qs('#pp-refresh-shipping-options', function ($element) { return $element.style.display = 'none'; });
                        $qs('#shipping-options-container-address', function ($element) { return $element.classList.remove('pp-opacity-0'); });
                        $qs('#pp-shipping-options', function ($element) { return $element.classList.remove('hide'); });
                        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
                    }
                    return [2];
            }
        });
    }); });
    (_d = $qs('#pp-info-form-returning')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var form, requiredFieldsFilled, isValidAddress;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event.preventDefault();
                    store.dispatch(startModalLoading());
                    form = $qs('#pp-info-form-returning');
                    requiredFieldsFilled = (_a = form.checkValidity()) !== null && _a !== void 0 ? _a : false;
                    if (!!requiredFieldsFilled) return [3, 1];
                    store.dispatch(stopModalLoading());
                    form.reportValidity();
                    return [3, 6];
                case 1:
                    isValidAddress = true;
                    if (!(!Carts.virtual() || !Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS))) return [3, 3];
                    return [4, validateAddress()];
                case 2:
                    isValidAddress = _c.sent();
                    _c.label = 3;
                case 3:
                    if (!(isValidAddress && !PeachPayOrder.errorMessage())) return [3, 5];
                    syncCustomerFieldChanges('#pp-info-form-returning');
                    self.dispatchEvent(new CustomEvent('pp-update-currency-switcher-feature'));
                    (_b = $qs('#pp-ship-to-existing-save')) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', '');
                    return [4, requestCartCalculation()];
                case 4:
                    _c.sent();
                    store.dispatch(stopModalLoading());
                    closeSlideUpView('ship-to');
                    return [3, 6];
                case 5:
                    alert('Error saving form.');
                    store.dispatch(stopModalLoading());
                    _c.label = 6;
                case 6: return [2];
            }
        });
    }); });
    (_e = $qs('#pp-info-form')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var isValidAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    store.dispatch(startModalLoading());
                    setTimeout(function () {
                        syncCustomerFieldChanges('#pp-info-form');
                    });
                    isValidAddress = true;
                    if (!(!Carts.virtual() || !Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS))) return [3, 2];
                    return [4, validateAddress()];
                case 1:
                    isValidAddress = _a.sent();
                    _a.label = 2;
                case 2: return [4, requestCartCalculation()];
                case 3:
                    _a.sent();
                    store.dispatch(updateCustomerAddressValidation(isValidAddress));
                    if (isValidAddress && !PeachPayOrder.errorMessage() && checkRequiredFields()) {
                        self.dispatchEvent(new CustomEvent('pp-update-currency-switcher-feature'));
                        store.dispatch(updateEnvironment({
                            modalPageType: Environment.modalUI.requestedPage(),
                            requestedPage: undefined
                        }));
                    }
                    else {
                        store.dispatch(updateEnvironment({
                            requestedPage: undefined
                        }));
                    }
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    }); });
}
function validateAddress() {
    return __awaiter(this, void 0, void 0, function () {
        var wcBillingFields;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(Environment.modalUI.page() !== 'returning')) return [3, 2];
                    return [4, fetchHostWindowData('pp-validate-billing-address', __assign(__assign(__assign({}, PeachPayCustomer.wcBillingAddress()), PeachPayCustomer.wcShippingAddress()), { ship_to_different_address: Environment.modalUI.page() !== 'info' && PeachPayCustomer.shipToDifferentAddress() }))];
                case 1: return [2, _a.sent()];
                case 2:
                    wcBillingFields = [
                        'billing_first_name',
                        'billing_last_name',
                        'billing_company',
                        'billing_email',
                        'billing_phone',
                        'billing_country',
                        'billing_address_1',
                        'billing_address_2',
                        'billing_city',
                        'billing_state',
                        'billing_postcode',
                    ];
                    return [4, fetchHostWindowData('pp-validate-billing-address', __assign(__assign({}, collectCustomerFieldData('#pp-info-form-returning', wcBillingFields)), { ship_to_different_address: false }))];
                case 3: return [2, _a.sent()];
            }
        });
    });
}
function handleShippingSelectionEvent(event) {
    return __awaiter(this, void 0, void 0, function () {
        var $target, $targetContainer, shippingMethodId, cartKey, packageKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $target = event.target;
                    $targetContainer = $target.closest('[data-cart-key]');
                    shippingMethodId = $target.value;
                    cartKey = $targetContainer.dataset.cartKey;
                    packageKey = $targetContainer.dataset.packageKey;
                    store.dispatch(updateCartPackageShippingMethod({
                        cartKey: cartKey !== null && cartKey !== void 0 ? cartKey : '',
                        shippingPackageKey: packageKey !== null && packageKey !== void 0 ? packageKey : '',
                        packageMethodId: shippingMethodId !== null && shippingMethodId !== void 0 ? shippingMethodId : ''
                    }));
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    });
}
function renderShipping() {
    var _a, _b, _c, _d, _e, _f;
    renderOrderHeader(DefaultCart.contents());
    if (cartIsVirtual(DefaultCart.contents())) {
        (_a = $qs('#existing-checkout-delivery')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-checkout-status-middle-text+span')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#pp-checkout-status-middle-text+span+span')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
    }
    else {
        (_d = $qs('#existing-checkout-delivery')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        (_e = $qs('#pp-checkout-status-middle-text+span')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('#pp-checkout-status-middle-text+span+span')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        renderCartShippingOptions(store.getState().calculatedCarts);
    }
}
function renderOrderHeader(cart) {
    var _a, _b, _c, _d;
    if (cartIsVirtual(cart)) {
        (_a = $qs('.shipping-address-header')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('.billing-address-header')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        for (var _i = 0, _e = $qsAll('.hide-for-virtual-carts'); _i < _e.length; _i++) {
            var $element = _e[_i];
            $element.classList.add('hide');
        }
        for (var _f = 0, _g = $qsAll('.show-for-virtual-carts'); _f < _g.length; _f++) {
            var $element1 = _g[_f];
            if (getFullName('shipping').replace(/\s/g, '') === '' && getFullAddress('shipping').replace(/\s/g, '') === '') {
                return;
            }
            $element1.classList.remove('hide');
        }
    }
    else {
        (_c = $qs('.shipping-address-header')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        (_d = $qs('.billing-address-header')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        for (var _h = 0, _j = $qsAll('.hide-for-virtual-carts'); _h < _j.length; _h++) {
            var $element2 = _j[_h];
            $element2.classList.remove('hide');
        }
        for (var _k = 0, _l = $qsAll('.show-for-virtual-carts'); _k < _l.length; _k++) {
            var $element3 = _l[_k];
            $element3.classList.add('hide');
        }
    }
}
function renderCartShippingOptions(calculatedCarts) {
    var shippingOptionsHTML = '';
    var shippingOptionsDisplayHTML = '';
    for (var _i = 0, _a = Object.entries(calculatedCarts); _i < _a.length; _i++) {
        var _b = _a[_i], cartKey = _b[0], cartCalculation = _b[1];
        if (!cartCalculation) {
            continue;
        }
        for (var _c = 0, _d = Object.entries(cartCalculation.package_record); _c < _d.length; _c++) {
            var _e = _d[_c], shippingPackageKey = _e[0], shippingPackage = _e[1];
            if (!shippingPackage) {
                continue;
            }
            shippingOptionsHTML += renderShippingPackageOptions(cartKey, shippingPackageKey, shippingPackage, cartCalculation.cart_meta, Object.entries(calculatedCarts).length > 1);
            shippingOptionsDisplayHTML += renderShippingPackageOptionsDisplay(cartKey, shippingPackageKey, shippingPackage, cartCalculation.cart_meta);
        }
    }
    $qs('#pp-shipping-options', function ($element) { return $element.innerHTML = shippingOptionsHTML; });
    $qs('#pp-shipping-options-existing', function ($element) { return $element.innerHTML = shippingOptionsHTML; });
    $qs('#pp-shipping-options-display-existing', function ($element) { return $element.innerHTML = shippingOptionsDisplayHTML; });
}
function renderShippingPackageOptions(cartKey, shippingPackageKey, shippingPackage, cartMeta, shouldShowPackageName) {
    var packageMethodKey = cartKey === '0' ? shippingPackageKey : "".concat(cartKey, "_").concat(shippingPackageKey);
    var methodOptionBuilder = function (methodKey, method, selected) { return "\n<div class=\"pp-disabled-loading pp-radio-line pp-shipping-option-row".concat(selected ? ' fill' : '', "\" for=\"shipping_method_").concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\">\n\t<div class=\"pp-shipping-option-bg\"></div>\n\t<input class=\"pp-disabled-loading\" id=\"shipping_method_").concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\" name=\"shipping_method[").concat(packageMethodKey, "]\" value=\"").concat(methodKey, "\" type=\"radio\" ").concat(selected ? 'checked' : '', " required>\n\t").concat(method.description ? "<div class=\"flex col w-100\">\n\t\t\t\t<label for=\"shipping_method_".concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\">\n\t\t\t\t\t<span>").concat(method.title, "</span>\n\t\t\t\t\t<span class=\"shipping-price pp-currency-blur\">\n\t\t\t\t\t\t").concat(formatCurrencyString(method.total), "\n\t\t\t\t\t\t<span class=\"muted\">").concat(buildSubscriptionPriceMetaData(cartMeta), "</span>\n\t\t\t\t\t</span>\n\t\t\t\t</label>\n\t\t\t<div>").concat(method.description, "</div>\n\t\t</div>") : "<label for=\"shipping_method_".concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\">\n\t\t\t\t<span>").concat(method.title, "</span> <span class=\"shipping-price pp-currency-blur\">").concat(formatCurrencyString(method.total), "\n\t\t\t\t<span class=\"muted\">").concat(buildSubscriptionPriceMetaData(cartMeta), "</span></span>\n\t\t\t\t</label>"), "\n</div>"); };
    var packageNameTranslations = {
        'Shipping': getLocaleText('Shipping'),
        'Initial Shipment': getLocaleText('Initial Shipment')
    };
    var packageName = shippingPackage.package_name in packageNameTranslations ? packageNameTranslations[shippingPackage.package_name] : shippingPackage.package_name;
    var packageNameHTML = "<div class=\"pp-title\">".concat(packageName, "</div>");
    var packageMethodOptionsHTML = Object.entries(shippingPackage.methods).map(function (_a) {
        var shippingMethodKey = _a[0], shippingMethod = _a[1];
        return shippingMethod ? methodOptionBuilder(shippingMethodKey, shippingMethod, shippingPackage.selected_method === shippingMethodKey) : '';
    }).join('');
    return "".concat(shouldShowPackageName ? packageNameHTML : '', "\n\t<div class=\"pp-shipping-options-container\" data-cart-key=\"").concat(cartKey, "\" data-package-key=\"").concat(shippingPackageKey, "\">\n\t").concat(packageMethodOptionsHTML, "\n\t</div>");
}
function renderShippingPackageOptionsDisplay(cartKey, shippingPackageKey, shippingPackage, cartMeta) {
    var methodOptionBuilder = function (method, selected) { return selected ? "\n<div class=\"pp-subheading\">\n\t".concat(method.description ? "<div style=\"width: 100%;\">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span style=\"display: inline-block; flex-grow: 1; margin-left: 8px;\">".concat(method.title, "</span>\n\t\t\t\t\t\t\t<span style=\"display: inline-block; min-width: 30%; text-align: right;\" class=\"shipping-price pp-currency-blur\">").concat(formatCurrencyString(method.total), "<span class=\"muted\">").concat(buildSubscriptionPriceMetaData(cartMeta), "</span></span>\n\t\t\t\t</div>\n\t\t\t\t<div style=\"font-size: 12px;\">").concat(method.description, "</div>\n\t\t\t</div>") : "<label>\n\t\t\t\t<span class=\"shipping-price pp-currency-blur\">".concat(formatCurrencyString(method.total), "\n\t\t\t\t<span class=\"muted\">").concat(buildSubscriptionPriceMetaData(cartMeta), "</span></span> <span>").concat(method.title, "</span>\n\t\t\t</label>"), "\n</div>") : ''; };
    var packageNameTranslations = {
        'Shipping': getLocaleText('Shipping method'),
        'Initial Shipment': getLocaleText('Initial Shipment')
    };
    var packageName = shippingPackage.package_name in packageNameTranslations ? packageNameTranslations[shippingPackage.package_name] : shippingPackage.package_name;
    var packageNameHTML = "<div class=\"pp-title\">".concat(packageName, "</div>");
    var packageMethodOptionsDisplayHTML = Object.entries(shippingPackage.methods).map(function (_a) {
        var shippingMethodKey = _a[0], shippingMethod = _a[1];
        return shippingMethod ? methodOptionBuilder(shippingMethod, shippingPackage.selected_method === shippingMethodKey) : '';
    }).join('');
    return "\n<div data-cart-key=\"".concat(cartKey, "\" data-package-key=\"").concat(shippingPackageKey, "\">\n\t").concat(packageNameHTML, "\n\t").concat(packageMethodOptionsDisplayHTML, "\n</div>");
}
function shippingIsValid() {
    if (cartIsVirtual(DefaultCart.contents())) {
        return true;
    }
    if (MerchantConfiguration.shipping.shippingZones() === 0) {
        return true;
    }
    if (!Carts.anyShippingMethodsAvailable()) {
        return false;
    }
    return true;
}
function consumeCartCalculationResponse(response) {
    if (response.notices) {
        if (response.notices.error) {
            var cartErrors = '';
            for (var i = 0; i < response.notices.error.length; i++) {
                renderOrderNotice(response.notices.error[i].notice);
                cartErrors += response.notices.error[i].notice;
            }
            store.dispatch(setOrderError(cartErrors));
        }
        if (response.notices.success) {
            for (var i1 = 0; i1 < response.notices.success.length; i1++) {
                renderOrderNotice(response.notices.success[i1].notice);
            }
        }
        if (response.notices.notice) {
            for (var i2 = 0; i2 < response.notices.notice.length; i2++) {
                renderOrderNotice(response.notices.notice[i2].notice);
            }
        }
    }
    if (response.data) {
        store.dispatch(setOrderError(''));
        store.dispatch(updateCartCalculation(response.data.cart_calculation_record));
        store.dispatch(updateCustomerShippingShortAddress(response.data.shipping_location));
        if (DefaultCart.contents().length === 0) {
            store.dispatch(setOrderError("<span>".concat(getLocaleText('Cart is empty'), "</span>")));
        }
        else if (!shippingIsValid()) {
            if (PeachPayCustomer.shipping.country() === '' || PeachPayCustomer.shipping.city() === '' || PeachPayCustomer.shipping.postal() === '') {
                return;
            }
            store.dispatch(setOrderError("<span>".concat(getLocaleText('Sorry, this store does not ship to your location.'), "</span>")));
        }
    }
}
function renderOrderNotice(data) {
    var _a, _b, _c;
    var message = stripHtml(data);
    var buildNotice = function (divStyle) {
        if (divStyle === void 0) { divStyle = ''; }
        return "<div style=\"".concat(divStyle, "\" class=\"pp-notice\">").concat(message, "</div>");
    };
    $qsAll('.pp-notice-container').forEach(function (element) {
        element.classList.remove('hide');
        if (window.innerWidth > 900 && element.id === 'pp-notice-container-mobile') {
            element.classList.add('hide');
        }
        setTimeout(function () {
            element.classList.add('hide');
        }, 10050);
    });
    (_a = $qs('#pp-notice-container-existing')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', buildNotice());
    (_b = $qs('#pp-notice-container-new')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterbegin', buildNotice());
    if (Environment.customer.mobile() || window.innerWidth <= 900) {
        (_c = $qs('#pp-notice-container-mobile')) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML('afterbegin', buildNotice());
    }
    $qsAll('.pp-notice', function ($el) { return setTimeout(function () {
        $el === null || $el === void 0 ? void 0 : $el.remove();
    }, 10000); });
}
function validateAddress1(address) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var errorLabels = {};
    var requiredFields = [];
    var shippingFields = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields;
    var shippingFieldsOrder = (_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.shipping_fields_order;
    var countryLocaleRuleBilling = (_f = (_e = (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.wc_location_info) === null || _d === void 0 ? void 0 : _d.country_locale_data) === null || _e === void 0 ? void 0 : _e[PeachPayCustomer.billing.country()]) === null || _f === void 0 ? void 0 : _f.state;
    var countryLocaleRuleShipping = (_k = (_j = (_h = (_g = GLOBAL.phpData) === null || _g === void 0 ? void 0 : _g.wc_location_info) === null || _h === void 0 ? void 0 : _h.country_locale_data) === null || _j === void 0 ? void 0 : _j[PeachPayCustomer.shipping.country()]) === null || _k === void 0 ? void 0 : _k.state;
    var billingFields = (_l = GLOBAL.phpData) === null || _l === void 0 ? void 0 : _l.billing_fields;
    var billingFieldsOrder = (_m = GLOBAL.phpData) === null || _m === void 0 ? void 0 : _m.billing_fields_order;
    var billingAddressFields = Carts.virtual() && Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS) ? [
        'billing_address_1',
        'billing_address_2',
        'billing_postcode',
        'billing_city',
        'billing_state',
        'billing_country',
    ] : [];
    var isOpenShippingChecked = PeachPayCustomer.shipToDifferentAddress();
    if (billingFields != null && billingFieldsOrder != null) {
        for (var i = 0; i < billingFieldsOrder.length; i++) {
            var field = billingFields[billingFieldsOrder[i]];
            if (field.field_enable === 'yes' && field.field_required === 'yes' && isRequiredField(field.field_name, billingFields, countryLocaleRuleBilling) && !billingAddressFields.includes(field.field_name)) {
                errorLabels[field.field_name] = field.field_label;
                requiredFields.push(field.field_name);
            }
        }
    }
    if (isOpenShippingChecked && shippingFields != null && shippingFieldsOrder != null) {
        for (var i1 = 0; i1 < shippingFieldsOrder.length; i1++) {
            var field1 = shippingFields[shippingFieldsOrder[i1]];
            if (field1.field_enable === 'yes' && field1.field_required === 'yes' && isRequiredField(field1.field_name, shippingFields, countryLocaleRuleShipping) && !billingAddressFields.includes(field1.field_name)) {
                errorLabels[field1.field_name] = field1.field_label;
                requiredFields.push(field1.field_name);
            }
        }
    }
    var _loop_2 = function (key, value) {
        if (requiredFields.includes(key)) {
            if (value.length === 0 || value === null) {
                return { value: [
                        false,
                        "".concat(getLocaleText('Please go back and try again. Missing required field'), ": ").concat(errorLabels[key], ".")
                    ] };
            }
            else {
                requiredFields = requiredFields.filter(function (e) { return e !== key; });
            }
        }
    };
    for (var _i = 0, _o = Object.entries(address); _i < _o.length; _i++) {
        var _p = _o[_i], key = _p[0], value = _p[1];
        var state_1 = _loop_2(key, value);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (requiredFields.length !== 0) {
        return [
            false,
            "".concat(getLocaleText('Please go back and try again. Missing required field'), ": ").concat(errorLabels[requiredFields[0]], ".")
        ];
    }
    return [
        true,
        null
    ];
}
function createPaymentTransaction(paymentGateway, paymentGatewayVariation) {
    if (paymentGatewayVariation === void 0) { paymentGatewayVariation = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var response, body, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/transaction/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session: {
                                    id: PeachPayOrder.sessionId(),
                                    merchant_id: MerchantConfiguration.id(),
                                    merchant_name: MerchantConfiguration.name(),
                                    merchant_url: MerchantConfiguration.hostName(),
                                    plugin_version: Environment.plugin.version()
                                },
                                transaction: {
                                    payment_method: paymentGateway,
                                    payment_method_variation: paymentGatewayVariation
                                }
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    body = _a.sent();
                    if (!response.ok || !body.success) {
                        captureSentryException(new Error('Failed to create a new payment transaction'));
                        return [2, null];
                    }
                    return [2, body.data.transaction_id];
                case 3:
                    error_3 = _a.sent();
                    captureSentryException(new Error("Unknown error while attempting to create a new payment transaction :: ".concat(error_3)));
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function updatePaymentTransaction(transactionId, options) {
    return __awaiter(this, void 0, void 0, function () {
        var requestURL, requestBody, response, responseBody, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    requestURL = getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/transaction/update';
                    requestBody = JSON.stringify({
                        session: {
                            id: PeachPayOrder.sessionId(),
                            merchant_id: MerchantConfiguration.id(),
                            merchant_name: MerchantConfiguration.name(),
                            merchant_url: MerchantConfiguration.hostName(),
                            plugin_version: Environment.plugin.version()
                        },
                        transaction: {
                            id: transactionId,
                            paypal: options.paypal,
                            stripe: options.stripe,
                            square: options.square,
                            purchase_order: options.purchaseOrder,
                            note: options.note
                        },
                        order: {
                            payment_status: options.paymentStatus,
                            order_status: options.orderStatus,
                            data: options.order
                        }
                    });
                    return [4, fetch(requestURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: requestBody
                        })];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    responseBody = _a.sent();
                    if (!response.ok || !responseBody.success) {
                        captureSentryException(new Error("Failed to update an existing payment transaction"), {
                            transaction_id: transactionId
                        });
                        return [2, false];
                    }
                    return [2, true];
                case 3:
                    error_4 = _a.sent();
                    captureSentryException(new Error("Unknown error while attempting to update a existing payment transaction :: ".concat(error_4)), {
                        transaction_id: transactionId
                    });
                    return [2, false];
                case 4: return [2];
            }
        });
    });
}
function generateMerchantCustomerAccountForm(idDifferentiator) {
    if (!shouldRenderAccountLoginForms()) {
        return '';
    }
    var fieldData = [];
    var optionOrder = [];
    var merchantName = MerchantConfiguration.name();
    if (shouldShowMerchantCustomerAccountLoginTypeCheckboxes()) {
        loginTypeRadio.field_default = getLoginTypeDefault();
        loginTypeRadio.field_label = merchantName + ' ' + getLocaleText('Account');
        loginTypeRadio.field_name = idDifferentiator + '-store-account-login-type';
        if (shouldAllowMerchantCustomerAccountLogin()) {
            optionOrder.push(loginOption());
        }
        if (shouldAllowMerchantCustomerAccountRegistration()) {
            optionOrder.push(registerOption());
        }
        if (shouldAllowMerchantCustomerAccountOmission()) {
            optionOrder.push(noneOption());
        }
        loginTypeRadio.option_order = optionOrder;
        fieldData.push(loginTypeRadio);
    }
    else {
        customerAccountFormHeader.field_name = idDifferentiator + '-store-account-form-header';
        customerAccountFormHeader.field_label = getCustomerAccountFormHeaderLabel(idDifferentiator);
        fieldData.push(customerAccountFormHeader);
    }
    var loginEmailField = __assign({}, emailField());
    var loginPasswordField = __assign({}, passwordField());
    loginEmailField.field_label = getLocaleText('Email or Username');
    loginEmailField.type_list = 'text';
    loginEmailField.field_name = idDifferentiator + '-store-account-login-email';
    loginPasswordField.field_name = idDifferentiator + '-store-account-login-password';
    loginEmailField.width = '50';
    loginPasswordField.width = '50';
    fieldData.push(loginEmailField);
    fieldData.push(loginPasswordField);
    var registrationEmailField = __assign({}, emailField());
    var registrationPasswordField = __assign({}, passwordField());
    registrationEmailField.field_name = idDifferentiator + '-store-account-registration-email';
    registrationPasswordField.field_name = idDifferentiator + '-store-account-registration-password';
    if (shouldShowMerchantCustomerAccountRegistrationEmailField() && shouldShowMerchantCustomerAccountRegistrationPasswordField()) {
        registrationEmailField.width = '50';
        registrationPasswordField.width = '50';
        fieldData.push(registrationEmailField);
        fieldData.push(registrationPasswordField);
    }
    else if (shouldShowMerchantCustomerAccountRegistrationEmailField()) {
        registrationEmailField.width = '100';
        fieldData.push(registrationEmailField);
    }
    else if (shouldShowMerchantCustomerAccountRegistrationPasswordField()) {
        registrationPasswordField.width = '100';
        fieldData.push(registrationPasswordField);
    }
    var fieldOrder = Array.from(Array(fieldData.length).keys());
    return formGenerator(fieldData, fieldOrder, '', idDifferentiator + '-store-account') + '</div></form>';
}
function renderDeliveryDate() {
    var _a, _b, _c, _d;
    if (!GLOBAL.phpData) {
        return;
    }
    if (!GLOBAL.phpData.plugin_woocommerce_order_delivery_active) {
        return;
    }
    (_a = $qs('#existing-checkout-delivery-date')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    (_b = $qs('#checkout-delivery-date')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    var todayDate = new Date();
    var maxDate = new Date();
    maxDate.setDate(todayDate.getDate() + ((_d = (_c = GLOBAL.phpData.plugin_woocommerce_order_delivery_options) === null || _c === void 0 ? void 0 : _c.wc_od_max_delivery_days) !== null && _d !== void 0 ? _d : 0));
    var $shippingDate = $qs('#delivery-date');
    var $existingCustomerShippingDate = $qs('#existing-delivery-date');
    if (!$shippingDate || !$existingCustomerShippingDate) {
        return;
    }
    $shippingDate.required = true;
    $existingCustomerShippingDate.min = todayDate.toISOString().slice(0, 10);
    $shippingDate.min = todayDate.toISOString().slice(0, 10);
    $existingCustomerShippingDate.max = maxDate.toISOString().slice(0, 10);
    $shippingDate.max = maxDate.toISOString().slice(0, 10);
}
function updateDeliveryDate() {
    var _a, _b;
    var $deliveryDate = $qs('#delivery-date');
    if (!$deliveryDate) {
        return;
    }
    $deliveryDate.value = (_b = (_a = $qs('#existing-delivery-date')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
}
function checkDeliveryDateIsValid(event) {
    if (!event.target) {
        return;
    }
    if (!validateDateIsAvailable(event.target.value)) {
        event.target.value = '';
        peachpayAlert('Please select another delivery date.');
    }
}
function validateDateIsAvailable(dateString) {
    var _a, _b;
    if (!GLOBAL.phpData) {
        return false;
    }
    var day = new Date(dateString + 'T00:00:00').getDay();
    return !((_b = (_a = GLOBAL.phpData.plugin_woocommerce_order_delivery_options) === null || _a === void 0 ? void 0 : _a.delivery_unchecked_day) === null || _b === void 0 ? void 0 : _b.includes(String(day)));
}
function initSentry(message) {
    try {
        if (window['Sentry']) {
            var merchantUrl = message.merchantHostname;
            var apiUrl = getBaseURL(merchantUrl, message.isTestMode);
            var isDev = isDevEnvironment(merchantUrl);
            Sentry.init({
                dsn: 'https://39b5a2e17e264bb5a6ea5abe9bc6cf61@o470066.ingest.sentry.io/5660513',
                environment: isDev ? 'development' : 'production',
                release: "peachpay-plugin@".concat(message.phpData.version),
                ignoreErrors: [
                    'TypeError: Failed to fetch',
                    'TypeError: NetworkError when attempting to fetch resource.',
                    'TypeError: cancelled',
                    'TypeError: cancelado',
                    'TypeError: Abgebrochen',
                    'TypeError: annulé',
                    'Window navigated away',
                    'annullato',
                    'Load failed',
                ],
                integrations: [
                    new Sentry.Integrations.BrowserTracing({
                        tracingOrigins: [
                            apiUrl,
                            merchantUrl,
                            /^\//
                        ],
                        startTransactionOnLocationChange: false
                    }),
                ],
                tracesSampleRate: 1.0
            });
        }
    }
    catch (_a) { }
}
function cartItemQuantity(cartItem) {
    var _a;
    return typeof (cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) === 'string' ? Number.parseInt(cartItem.quantity) : (_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) !== null && _a !== void 0 ? _a : 0;
}
function cartItemLabel(item) {
    var name = item.name;
    if (MerchantConfiguration.hostName() === 'ugoprobaseball.com' && item.formatted_item_data && item.name_with_variation) {
        name = item.name_with_variation;
    }
    if (!item.is_part_of_bundle) {
        name = '<span>' + name + '</span>';
    }
    var variationTitle = !item.attributes && item.variation_title ? " - ".concat(item.variation_title) : '';
    var label = "".concat(name).concat(variationTitle);
    return label;
}
function cartItemDisplayAmount(item) {
    var _a, _b, _c, _d, _e;
    if (item.is_subscription) {
        var stringAmount = !((_a = item.subscription_price_string) === null || _a === void 0 ? void 0 : _a.indexOf(String((_b = item.display_price) !== null && _b !== void 0 ? _b : item.price))) ? '' : formatCostString(Number.parseFloat((_c = item.display_price) !== null && _c !== void 0 ? _c : item.price));
        return "".concat(MerchantConfiguration.currency.symbol()).concat(stringAmount).concat((_d = item.subscription_price_string) !== null && _d !== void 0 ? _d : '');
    }
    return "".concat(formatCurrencyString(Number.parseFloat((_e = item.display_price) !== null && _e !== void 0 ? _e : item.price) * cartItemQuantity(item)));
}
function cartItemVariationHTML(item) {
    if (item.formatted_item_data) {
        return "".concat(metaDataRowsHTML(item)).concat(formattedItemDataHTMLTemplate(item));
    }
    var variationRowHTML = '';
    if (!item.attributes) {
        return variationRowHTML;
    }
    var keys = Object.keys(item.attributes);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var formattedKey = capitalizeFirstLetter(key.replace('attribute_', '').replace('pa_', '').replace(/-/g, ' '));
        var formattedValue = String(item.attributes[key]).toUpperCase();
        variationRowHTML += "<dt>".concat(formattedKey, ": </dt><dd>").concat(formattedValue, "</dd>");
    }
    return "".concat(metaDataRowsHTML(item), "<dl>").concat(variationRowHTML, "</dl>");
}
function metaDataRowsHTML(item) {
    if (!item.meta_data || Object.entries(item.meta_data).length === 0) {
        return '';
    }
    var html = '';
    for (var _i = 0, _a = item.meta_data; _i < _a.length; _i++) {
        var meta = _a[_i];
        var keyText = capitalizeFirstLetter(meta.key.replace(/_/g, ' '));
        html += "<dt>".concat(keyText, ": </dt><dd>").concat(meta.value || '(none)', "</dd>");
    }
    return "<dl>".concat(html, "</dl>");
}
function formattedItemDataHTMLTemplate(item) {
    if (!item.formatted_item_data) {
        return '';
    }
    return item.formatted_item_data.replace(/&nbsp;/g, '');
}
function buildSubscriptionFirstRenewalString(meta) {
    if (!meta.subscription || !meta.subscription.first_renewal) {
        return '';
    }
    var date = new Date(meta.subscription.first_renewal);
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return "First renewal: ".concat(date.toLocaleString(Environment.language(), options));
}
function renderInfoPageDisplay(modalPage) {
    var _a, _b;
    if (modalPage === 'info') {
        (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    else {
        (_b = $qs('#pp-info')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
    }
}
function renderShippingPageDisplay(modalPage) {
    var _a, _b;
    if (modalPage === 'shipping') {
        (_a = $qs('#pp-shipping')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    else {
        (_b = $qs('#pp-shipping')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
    }
}
function renderPaymentPageDisplay(modalPage) {
    var _a, _b, _c;
    if (modalPage === 'payment') {
        (_a = $qs('#pp-payment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#extra-fields-section')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        (_c = $qs('#pp-payment')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
    }
}
function renderReturningPageDisplay(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    if (modalPage === 'returning') {
        (_a = $qs('#pp-new-customer-checkout')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-existing-customer-checkout')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#pp-modal-content')) === null || _c === void 0 ? void 0 : _c.classList.add('col');
        (_d = $qs('.pp-content')) === null || _d === void 0 ? void 0 : _d.classList.add('pp-content-returning');
        for (var _i = 0, _s = $qsAll('.split'); _i < _s.length; _i++) {
            var $element = _s[_i];
            $element.style.setProperty('float', 'left', 'important');
        }
        (_e = $qs('#pp-dropdown')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', openCart);
        (_f = $qs('#pp-dropdown')) === null || _f === void 0 ? void 0 : _f.addEventListener('keypress', openCartWithKeyPress);
        (_g = $qs('#pp-edit-info-existing')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () {
            openSlideUpView('ship-to');
        });
        (_h = $qs('#pp-shipping-existing')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function () {
            openSlideUpView('shipping');
        });
        (_j = $qs('#pp-pm-expander')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', function () {
            openSlideUpView('payment');
        });
        (_k = $qs('#pp-additional-existing')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', function () {
            openSlideUpView('additional');
        });
        $qsAll('.pp-existing-checkout-group').forEach(function ($ecg) {
            $ecg.addEventListener('mouseover', existingGroupHovered);
        });
        $qsAll('#pp_currency_select_div', function ($csd) {
            $csd.classList.remove('pp-section-mb');
        });
        $qsAll('#pp_currency_select_div', function ($csd) {
            $csd.classList.add('pp-existing-checkout-group-static');
        });
    }
    else {
        (_l = $qs('#pp-new-customer-checkout')) === null || _l === void 0 ? void 0 : _l.classList.remove('hide');
        (_m = $qs('#pp-existing-customer-checkout')) === null || _m === void 0 ? void 0 : _m.classList.add('hide');
        (_o = $qs('#pp-modal-content')) === null || _o === void 0 ? void 0 : _o.classList.remove('col');
        (_p = $qs('.pp-content')) === null || _p === void 0 ? void 0 : _p.classList.remove('pp-content-returning');
        for (var _t = 0, _u = $qsAll('.split'); _t < _u.length; _t++) {
            var $element1 = _u[_t];
            $element1.style.removeProperty('float');
        }
        $qsAll('#pp_currency_select_div', function ($csd) {
            $csd.classList.add('pp-section-mb');
        });
        $qsAll('#pp_currency_select_div', function ($csd) {
            $csd.classList.remove('pp-existing-checkout-group-static');
        });
        (_q = $qs('#pp-dropdown-new')) === null || _q === void 0 ? void 0 : _q.addEventListener('click', openCart);
        (_r = $qs('#pp-dropdown-new')) === null || _r === void 0 ? void 0 : _r.addEventListener('keypress', openCartWithKeyPress);
    }
}
function existingGroupHovered(event) {
    var eventTarget = event.target;
    var $ecg = eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.closest('.pp-existing-checkout-group');
    event.stopImmediatePropagation();
    $ecg.style.cursor = 'pointer';
    $ecg.addEventListener('click', existingGroupClicked);
}
function existingGroupClicked(event) {
    var eventTarget = event.target;
    var $ecg = eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.closest('.pp-existing-checkout-group');
    $ecg.removeEventListener('click', existingGroupClicked);
    $ecg.addEventListener('mouseover', existingGroupHovered);
    $ecg.style.cursor = 'default';
    var chevronRight = $ecg === null || $ecg === void 0 ? void 0 : $ecg.querySelector('.pp-existing-chevron-right');
    switch (chevronRight === null || chevronRight === void 0 ? void 0 : chevronRight.id) {
        case 'pp-edit-info-existing':
            openSlideUpView('ship-to');
            return;
        case 'pp-shipping-existing':
            openSlideUpView('shipping');
            return;
        case 'pp-pm-expander':
            openSlideUpView('payment');
            return;
        case 'pp-additional-existing':
            openSlideUpView('additional');
            return;
    }
}
function renderModalButtonShadow() {
    var buttonShadowClass = 'btn-shadow';
    if (Feature.enabled(FeatureFlag.BUTTON_SHADOW)) {
        $qsAll('.btn', function ($element) { return $element.classList.add(buttonShadowClass); });
    }
    else {
        $qsAll('.btn', function ($element) { return $element.classList.remove(buttonShadowClass); });
    }
}
function hideNonExpressFields(selected) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    if (selected === void 0) { selected = true; }
    if (selected) {
        (_a = $qs('#checkout-status')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-continue-to-shipping')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#pp-continue-to-shipping-mobile')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('#pp-stripe-payment-request-checkout-btn')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        (_e = $qs('#pp-stripe-payment-request-checkout-btn-mobile')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
    }
    else {
        (_f = $qs('#checkout-status')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
        (_g = $qs('#pp-express-payments')) === null || _g === void 0 ? void 0 : _g.classList.add('pp-section-mt');
        (_h = $qs('#pp-stripe-payment-request-checkout-btn')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
        (_j = $qs('#pp-stripe-payment-request-checkout-btn-mobile')) === null || _j === void 0 ? void 0 : _j.classList.add('hide');
        (_k = $qs('#pp-continue-to-shipping')) === null || _k === void 0 ? void 0 : _k.classList.remove('hide');
        (_l = $qs('#pp-continue-to-shipping-mobile')) === null || _l === void 0 ? void 0 : _l.classList.remove('hide');
        (_m = $qs('.pp-temp-input')) === null || _m === void 0 ? void 0 : _m.remove();
    }
    var shippingFields = (_o = GLOBAL.phpData) === null || _o === void 0 ? void 0 : _o.shipping_fields;
    var shippingFieldsOrder = (_p = GLOBAL.phpData) === null || _p === void 0 ? void 0 : _p.shipping_fields_order;
    if (shippingFields === undefined || shippingFieldsOrder === undefined) {
        return;
    }
    shippingFieldsOrder === null || shippingFieldsOrder === void 0 ? void 0 : shippingFieldsOrder.forEach(function (order) {
        var field = shippingFields[order];
        if ([
            'shipping_personal_header',
            'shipping_address_header',
            'shipping_email',
            'shipping_phone',
            'shipping_first_name',
            'shipping_last_name',
            'shipping_address_1',
            'shipping_address_2',
            'shipping_postcode',
            'shipping_city',
            'shipping_state',
            'shipping_country',
        ].includes(field === null || field === void 0 ? void 0 : field.field_name)) {
            $qs("#".concat(field === null || field === void 0 ? void 0 : field.field_name, "-field"), function ($el) {
                if (selected) {
                    $el === null || $el === void 0 ? void 0 : $el.classList.add('hide');
                }
                else {
                    $el === null || $el === void 0 ? void 0 : $el.classList.remove('hide');
                }
            });
        }
    });
    var billingFields = (_q = GLOBAL.phpData) === null || _q === void 0 ? void 0 : _q.billing_fields;
    var billingFieldsOrder = (_r = GLOBAL.phpData) === null || _r === void 0 ? void 0 : _r.billing_fields_order;
    if (billingFields === undefined || billingFieldsOrder === undefined) {
        return;
    }
    billingFieldsOrder === null || billingFieldsOrder === void 0 ? void 0 : billingFieldsOrder.forEach(function (order) {
        var field = billingFields[order];
        if ([
            'billing_personal_header',
            'billing_address_header',
            'billing_email',
            'billing_phone',
            'billing_first_name',
            'billing_last_name',
            'billing_address_1',
            'billing_address_2',
            'billing_postcode',
            'billing_city',
            'billing_state',
            'billing_country',
        ].includes(field === null || field === void 0 ? void 0 : field.field_name)) {
            $qs("#".concat(field === null || field === void 0 ? void 0 : field.field_name, "-field"), function ($el) {
                if (selected) {
                    $el === null || $el === void 0 ? void 0 : $el.classList.add('hide');
                }
                else {
                    $el === null || $el === void 0 ? void 0 : $el.classList.remove('hide');
                }
            });
        }
    });
}
function checkRequiredFields1() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var nonRequired = [
        'shipping_company',
        'shipping_email',
        'shipping_phone',
        'shipping_first_name',
        'shipping_last_name',
        'shipping_address_1',
        'shipping_address_2',
        'shipping_city',
        'shipping_state',
        'shipping_country',
        'shipping_postcode',
        'billing_company',
        'billing_email',
        'billing_phone',
        'billing_first_name',
        'billing_last_name',
        'billing_address_1',
        'billing_address_2',
        'billing_city',
        'billing_state',
        'billing_country',
        'billing_postcode',
    ];
    var requiredFields = [];
    var shippingFields = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields;
    var shippingFieldsOrder = (_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.shipping_fields_order;
    var billingFields = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields;
    var billingFieldsOrder = (_d = GLOBAL.phpData) === null || _d === void 0 ? void 0 : _d.billing_fields_order;
    var additionalFields = (_e = GLOBAL.phpData) === null || _e === void 0 ? void 0 : _e.additional_fields;
    var additionalFieldsOrder = (_f = GLOBAL.phpData) === null || _f === void 0 ? void 0 : _f.additional_fields_order;
    if (shippingFields != null && shippingFieldsOrder != null) {
        for (var i = 0; i < shippingFieldsOrder.length; i++) {
            var field = shippingFields[shippingFieldsOrder[i]];
            if (field.field_enable === 'yes' && field.field_required === 'yes' && !nonRequired.includes(field.field_name) && field.type_list !== 'radio') {
                requiredFields.push(field.field_name);
            }
            else if (field.field_enable === 'yes' && field.field_required === 'yes' && !nonRequired.includes(field.field_name) && field.type_list === 'radio') {
                var selected = false;
                if (field.option_order !== undefined) {
                    for (var i1 = 1; i1 <= ((_g = field === null || field === void 0 ? void 0 : field.option_order) === null || _g === void 0 ? void 0 : _g.length); i1++) {
                        var radio = $qs("#".concat(field.field_name, "-").concat(i1));
                        if (radio.checked === true) {
                            selected = true;
                        }
                    }
                }
                if (!selected) {
                    requiredFields.push('unselected_radio');
                }
            }
        }
    }
    if (billingFields != null && billingFieldsOrder != null) {
        for (var i2 = 0; i2 < billingFieldsOrder.length; i2++) {
            var field1 = billingFields[billingFieldsOrder[i2]];
            if (field1.field_enable === 'yes' && field1.field_required === 'yes' && !nonRequired.includes(field1.field_name) && field1.type_list !== 'radio') {
                requiredFields.push(field1.field_name);
            }
            else if (field1.field_enable === 'yes' && field1.field_required === 'yes' && !nonRequired.includes(field1.field_name) && field1.type_list === 'radio') {
                var selected1 = false;
                if (field1.option_order !== undefined) {
                    for (var i3 = 1; i3 <= ((_h = field1 === null || field1 === void 0 ? void 0 : field1.option_order) === null || _h === void 0 ? void 0 : _h.length); i3++) {
                        var radio1 = $qs("#".concat(field1.field_name, "-").concat(i3));
                        if (radio1.checked === true) {
                            selected1 = true;
                        }
                    }
                }
                if (!selected1) {
                    requiredFields.push('unselected_radio');
                }
            }
        }
    }
    if (additionalFields != null && additionalFieldsOrder != null) {
        for (var i4 = 0; i4 < additionalFieldsOrder.length; i4++) {
            var field2 = additionalFields[additionalFieldsOrder[i4]];
            if (field2.field_enable === 'yes' && field2.field_required === 'yes' && !nonRequired.includes(field2.field_name) && field2.type_list !== 'radio') {
                requiredFields.push("".concat(field2.field_name, "-new"));
            }
            else if (field2.field_enable === 'yes' && field2.field_required === 'yes' && !nonRequired.includes(field2.field_name) && field2.type_list === 'radio') {
                var selected2 = false;
                if (field2.option_order !== undefined) {
                    for (var i5 = 1; i5 <= ((_j = field2 === null || field2 === void 0 ? void 0 : field2.option_order) === null || _j === void 0 ? void 0 : _j.length); i5++) {
                        var radio2 = $qs("#".concat(field2.field_name, "-new-").concat(i5));
                        if (radio2.checked === true) {
                            selected2 = true;
                        }
                    }
                }
                if (!selected2) {
                    requiredFields.push('unselected_radio');
                }
            }
        }
    }
    requiredFields.forEach(function (key) {
        if (key !== 'unselected_radio') {
            var ele = $qs("#".concat(key));
            var value = (ele === null || ele === void 0 ? void 0 : ele.type) === 'checkbox' ? ele === null || ele === void 0 ? void 0 : ele.checked : ele === null || ele === void 0 ? void 0 : ele.value;
            if (typeof value === 'string' && (value === null || value === void 0 ? void 0 : value.length) !== 0 && value !== null) {
                requiredFields = requiredFields.filter(function (e) { return e !== key; });
            }
            else if (typeof value === 'boolean' && value === true) {
                requiredFields = requiredFields.filter(function (e) { return e !== key; });
            }
        }
    });
    var wrapper = $qs('#pp-stripe-payment-request-checkout-wrapper');
    var wrapperMobile = $qs('#pp-stripe-payment-request-checkout-wrapper-mobile');
    var button = $qs('#pp-stripe-payment-request-checkout-btn');
    var buttonMobile = $qs('#pp-stripe-payment-request-checkout-btn');
    if (requiredFields.length !== 0) {
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.classList.add('pp-button-mute');
        wrapperMobile === null || wrapperMobile === void 0 ? void 0 : wrapperMobile.classList.add('pp-button-mute');
        button.style.pointerEvents = 'none';
        buttonMobile.style.pointerEvents = 'none';
    }
    else {
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.classList.remove('pp-button-mute');
        wrapperMobile === null || wrapperMobile === void 0 ? void 0 : wrapperMobile.classList.remove('pp-button-mute');
        button.style.pointerEvents = 'auto';
        buttonMobile.style.pointerEvents = 'auto';
    }
}
function initCurrency(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    initCurrencyEvents();
    store.dispatch(updateMerchantCurrencyConfig({
        name: (_b = (_a = message.phpData.currency_info) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'United States Dollar',
        code: (_d = (_c = message.phpData.currency_info) === null || _c === void 0 ? void 0 : _c.code) !== null && _d !== void 0 ? _d : 'USD',
        symbol: (_g = (_f = (_e = message.phpData) === null || _e === void 0 ? void 0 : _e.currency_info) === null || _f === void 0 ? void 0 : _f.symbol) !== null && _g !== void 0 ? _g : '$',
        thousands_separator: (_j = (_h = message.phpData.currency_info) === null || _h === void 0 ? void 0 : _h.thousands_separator) !== null && _j !== void 0 ? _j : ',',
        decimal_separator: (_l = (_k = message.phpData.currency_info) === null || _k === void 0 ? void 0 : _k.decimal_separator) !== null && _l !== void 0 ? _l : '.',
        number_of_decimals: (_o = (_m = message.phpData.currency_info) === null || _m === void 0 ? void 0 : _m.number_of_decimals) !== null && _o !== void 0 ? _o : 2,
        position: (_q = (_p = message.phpData.currency_info) === null || _p === void 0 ? void 0 : _p.position) !== null && _q !== void 0 ? _q : 'left',
        rounding: (_s = (_r = message.phpData.currency_info) === null || _r === void 0 ? void 0 : _r.rounding) !== null && _s !== void 0 ? _s : 'disabled',
        hidden: (_u = (_t = message.phpData.currency_info) === null || _t === void 0 ? void 0 : _t.hidden) !== null && _u !== void 0 ? _u : false
    }));
}
function initCurrencyEvents() {
    store.subscribe(function () {
        renderCurrencySymbols();
    });
}
function renderCurrencySymbols() {
    var _a = MerchantConfiguration.currency.configuration(), position = _a.position, symbol = _a.symbol;
    var right = position === 'right' || position === 'right_space';
    for (var _i = 0, _b = $qsAll(".currency-symbol".concat(right ? '-after' : '')); _i < _b.length; _i++) {
        var $element = _b[_i];
        $element.innerHTML = symbol;
    }
}
function initGiftCardInput(_message) {
    var _a;
    if (!Feature.enabled(FeatureFlag.GIFTCARD_INPUT) || MerchantConfiguration.hostName() === 'skregear.com') {
        return;
    }
    initGiftCardEvents();
    for (var _i = 0, _b = $qsAll('.gift-card-option'); _i < _b.length; _i++) {
        var $form = _b[_i];
        $form.classList.remove('hide');
    }
    (_a = $qs('#gift-card-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    if (Feature.enabled(FeatureFlag.COUPON_INPUT)) {
        $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '25rem'; });
    }
    else {
        $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '23.5rem'; });
    }
}
function initGiftCardEvents() {
    var _this = this;
    onWindowMessage('giftCardApplied', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var _i, _a, $message, _b, _c, $message1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    for (_i = 0, _a = $qsAll('.invalid-gift-card'); _i < _a.length; _i++) {
                        $message = _a[_i];
                        $message.classList.add('hide');
                    }
                    if (!message.success) {
                        hideGiftCardLoadingState();
                        for (_b = 0, _c = $qsAll('.invalid-gift-card'); _b < _c.length; _b++) {
                            $message1 = _c[_b];
                            $message1.textContent = message.message;
                            $message1.classList.remove('hide');
                        }
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    clearInput('.gift-card-input');
                    return [4, requestCartCalculation()];
                case 1:
                    _d.sent();
                    hideGiftCardLoadingState();
                    store.dispatch(stopModalLoading());
                    hideGiftCardLoadingState();
                    return [2];
            }
        });
    }); });
    var _loop_3 = function ($form) {
        $form.addEventListener('submit', function (event) {
            var _a, _b;
            event.preventDefault();
            if (!$form.checkValidity()) {
                $form.reportValidity();
                return;
            }
            showGiftCardLoadingState();
            store.dispatch(startModalLoading());
            var data = new FormData(event.target);
            var giftCardNumber = (_b = (_a = data.get('card_number')) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            window.parent.postMessage({
                event: 'redeemGiftCard',
                cardNumber: giftCardNumber
            }, '*');
        });
    };
    for (var _i = 0, _a = $qsAll('form.pw-wc-gift-card'); _i < _a.length; _i++) {
        var $form = _a[_i];
        _loop_3($form);
    }
    for (var _b = 0, _c = $qsAll('.gift-card-option'); _b < _c.length; _b++) {
        var $div = _c[_b];
        $div.addEventListener('click', showGiftCardInput);
    }
    for (var _d = 0, _e = $qsAll('.exit-button-gift'); _d < _e.length; _d++) {
        var $exitGift = _e[_d];
        $exitGift.addEventListener('click', hideGiftCardInput);
    }
}
function showGiftCardInput() {
    for (var _i = 0, _a = $qsAll('form.pw-wc-gift-card'); _i < _a.length; _i++) {
        var $coupon = _a[_i];
        $coupon.classList.remove('hide');
    }
    for (var _b = 0, _c = $qsAll('.gift-card-option'); _b < _c.length; _b++) {
        var $option = _c[_b];
        $option.classList.add('hide');
    }
}
function hideGiftCardInput() {
    for (var _i = 0, _a = $qsAll('form.pw-wc-gift-card'); _i < _a.length; _i++) {
        var $coupon = _a[_i];
        $coupon.classList.add('hide');
    }
    for (var _b = 0, _c = $qsAll('.gift-card-option'); _b < _c.length; _b++) {
        var $option = _c[_b];
        $option.classList.remove('hide');
    }
    for (var _d = 0, _e = $qsAll('.invalid-gift-card'); _d < _e.length; _d++) {
        var $invalid = _e[_d];
        $invalid.classList.add('hide');
    }
    clearInput('.gift-card-input');
}
function hideGiftCardLoadingState() {
    for (var _i = 0, _a = $qsAll('.gift-card-spinner'); _i < _a.length; _i++) {
        var $spinner = _a[_i];
        $spinner.classList.add('hide');
    }
    for (var _b = 0, _c = $qsAll('.gift-card-input'); _b < _c.length; _b++) {
        var $border = _c[_b];
        $border.classList.remove('remove-right-border');
    }
    for (var _d = 0, _e = $qsAll('.gift-card-apply'); _d < _e.length; _d++) {
        var $applyButton = _e[_d];
        $applyButton.disabled = false;
    }
}
function showGiftCardLoadingState() {
    for (var _i = 0, _a = $qsAll('.gift-card-spinner'); _i < _a.length; _i++) {
        var $spinner = _a[_i];
        $spinner.classList.remove('hide');
    }
    for (var _b = 0, _c = $qsAll('.gift-card-input'); _b < _c.length; _b++) {
        var $border = _c[_b];
        $border.classList.add('remove-right-border');
    }
    for (var _d = 0, _e = $qsAll('.gift-card-apply'); _d < _e.length; _d++) {
        var $applyButton = _e[_d];
        $applyButton.disabled = true;
    }
}
function initCouponInput(_message) {
    if (!Feature.enabled(FeatureFlag.COUPON_INPUT)) {
        return;
    }
    showCouponEntrySupport();
    initCouponInputEvents();
}
function removeCoupon(code) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchHostWindowData('pp-remove-coupon', {
                        code: code
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function initCouponInputEvents() {
    var _this = this;
    onWindowMessage('stopCouponLoading', function (_) {
        store.dispatch(stopModalLoading());
        hideCouponLoadingState();
    });
    var _loop_4 = function ($form) {
        $form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var data, code, response;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        event.preventDefault();
                        if (!$form.checkValidity()) {
                            $form.reportValidity();
                            return [2];
                        }
                        store.dispatch(startModalLoading());
                        showCouponLoadingState();
                        data = new FormData((_a = event.target) !== null && _a !== void 0 ? _a : undefined);
                        code = (_c = (_b = data.get('coupon_code')) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '';
                        return [4, fetchHostWindowData('pp-add-coupon', {
                                code: code
                            })];
                    case 1:
                        response = _d.sent();
                        couponCleanup(response);
                        store.dispatch(stopModalLoading());
                        hideCouponLoadingState();
                        return [2];
                }
            });
        }); });
    };
    for (var _i = 0, _a = $qsAll('form.wc-coupon-code'); _i < _a.length; _i++) {
        var $form = _a[_i];
        _loop_4($form);
    }
    for (var _b = 0, _c = $qsAll('.coupon-code-option'); _b < _c.length; _b++) {
        var $openCoupon = _c[_b];
        $openCoupon.addEventListener('click', showCouponInput);
        $openCoupon.addEventListener('keypress', showCouponInput);
    }
    hideCouponLoadingState();
    handleCouponRemoval();
}
function handleCouponRemoval() {
    var _this = this;
    $qsAll('#pp-summary-lines-body, #pp-summary-lines-body-existing, #pp-summary-lines-body-mobile', function ($removeButtons) {
        $removeButtons.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var $target, $removeButton, coupon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $target = event.target;
                        if (!$target) {
                            return [2];
                        }
                        $removeButton = $target.closest('.pp-coupon-remove-button[data-coupon]');
                        if (!$removeButton) {
                            return [2];
                        }
                        coupon = $removeButton.dataset.coupon;
                        if (!coupon) {
                            return [2];
                        }
                        store.dispatch(startModalLoading());
                        return [4, removeCoupon(coupon)];
                    case 1:
                        _a.sent();
                        return [4, requestCartCalculation()];
                    case 2:
                        _a.sent();
                        store.dispatch(stopModalLoading());
                        hideCouponLoadingState();
                        return [2];
                }
            });
        }); });
    });
}
function couponCleanup(message) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, $message, _b, _c, $message1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    for (_i = 0, _a = $qsAll('.wc-invalid-coupon'); _i < _a.length; _i++) {
                        $message = _a[_i];
                        $message.classList.add('hide');
                    }
                    if (message !== undefined && message.data && message.data.status === 404) {
                        hideCouponLoadingState();
                        for (_b = 0, _c = $qsAll('.wc-invalid-coupon'); _b < _c.length; _b++) {
                            $message1 = _c[_b];
                            $message1.classList.remove('hide');
                        }
                        return [2];
                    }
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 1:
                    _d.sent();
                    store.dispatch(stopModalLoading());
                    hideCouponLoadingState();
                    clearInput('.wc-coupon-code-input');
                    return [2];
            }
        });
    });
}
function showCouponEntrySupport() {
    var _a;
    for (var _i = 0, _b = $qsAll('.coupon-code-option'); _i < _b.length; _i++) {
        var $form = _b[_i];
        $form.classList.remove('hide');
    }
    (_a = $qs('#coupon-code-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
}
function showCouponInput(event) {
    var _a;
    if (!eventClick(event)) {
        return;
    }
    for (var _i = 0, _b = $qsAll('form.wc-coupon-code'); _i < _b.length; _i++) {
        var $coupon = _b[_i];
        $coupon.classList.remove('hide');
    }
    for (var _c = 0, _d = $qsAll('.coupon-code-option'); _c < _d.length; _c++) {
        var $option = _d[_c];
        $option.classList.add('hide');
    }
    $qsAll('.pp-dropdown', function ($dd) {
        $dd === null || $dd === void 0 ? void 0 : $dd.classList.add('shorten');
    });
    (_a = $qs('#pp-modal-content')) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', detectExitTap);
}
function hideCouponInput() {
    var _a;
    for (var _i = 0, _b = $qsAll('form.wc-coupon-code'); _i < _b.length; _i++) {
        var $coupon = _b[_i];
        $coupon.classList.add('hide');
    }
    for (var _c = 0, _d = $qsAll('.coupon-code-option'); _c < _d.length; _c++) {
        var $option = _d[_c];
        $option.classList.remove('hide');
    }
    for (var _e = 0, _f = $qsAll('.wc-invalid-coupon'); _e < _f.length; _e++) {
        var $invalid = _f[_e];
        $invalid.classList.add('hide');
    }
    $qsAll('.pp-dropdown', function ($dd) {
        $dd === null || $dd === void 0 ? void 0 : $dd.classList.remove('shorten');
    });
    (_a = $qs('#pp-modal-content')) === null || _a === void 0 ? void 0 : _a.removeEventListener('mousedown', detectExitTap);
    clearInput('.wc-coupon-code-input');
}
function detectExitTap(e) {
    for (var _i = 0, _a = $qsAll('form.wc-coupon-code'); _i < _a.length; _i++) {
        var $el = _a[_i];
        if ($el.contains(e.target)) {
            return;
        }
    }
    hideCouponInput();
}
function hideCouponLoadingState() {
    for (var _i = 0, _a = $qsAll('.wc-coupon-spinner'); _i < _a.length; _i++) {
        var $spinner = _a[_i];
        $spinner.classList.add('hide');
    }
    for (var _b = 0, _c = $qsAll('.wc-coupon-code-input'); _b < _c.length; _b++) {
        var $border = _c[_b];
        $border.classList.remove('remove-right-border');
    }
    for (var _d = 0, _e = $qsAll('.wc-coupon-code-apply'); _d < _e.length; _d++) {
        var $applyButton = _e[_d];
        $applyButton.disabled = false;
    }
}
function showCouponLoadingState() {
    for (var _i = 0, _a = $qsAll('.wc-coupon-spinner'); _i < _a.length; _i++) {
        var $spinner = _a[_i];
        $spinner.classList.remove('hide');
    }
    for (var _b = 0, _c = $qsAll('.wc-coupon-code-input'); _b < _c.length; _b++) {
        var $border = _c[_b];
        $border.classList.add('remove-right-border');
    }
    for (var _d = 0, _e = $qsAll('.wc-coupon-code-apply'); _d < _e.length; _d++) {
        var $applyButton = _e[_d];
        $applyButton.disabled = true;
    }
}
function initLanguage(message) {
    initLanguageEvents();
    var language = message.phpData.language === 'detect-from-page' ? message.pageLanguage : message.phpData.language;
    store.dispatch(updateLanguage(language));
}
function initLanguageEvents() {
    onWindowMessage('pageLanguageChange', function (message) {
        store.dispatch(updateLanguage(message.language));
    });
    store.subscribe(function () {
        renderLocaleText();
    });
}
function renderLocaleText() {
    var _a, _b, _c, _d, _e, _f, _g;
    for (var _i = 0, _h = $qsAll('[data-i18n]'); _i < _h.length; _i++) {
        var $element = _h[_i];
        if ($element.nodeName === 'INPUT' && $element.type === 'submit') {
            $element.value = getLocaleText((_b = (_a = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _a === void 0 ? void 0 : _a.i18n) !== null && _b !== void 0 ? _b : '');
        }
        else if ($element.nodeName === 'INPUT') {
            $element.placeholder = getLocaleText((_d = (_c = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _c === void 0 ? void 0 : _c.i18n) !== null && _d !== void 0 ? _d : '');
        }
        else if (((_e = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _e === void 0 ? void 0 : _e.i18n) === 'Back' && Environment.language() !== 'en-US') {
            $element.textContent = getLocaleText('Return');
        }
        else {
            $element.textContent = getLocaleText((_g = (_f = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _f === void 0 ? void 0 : _f.i18n) !== null && _g !== void 0 ? _g : '');
        }
    }
    if (Environment.language() === 'ro-RO') {
        setCustomValidityMessage();
    }
}
function setCustomValidityMessage() {
    var _loop_5 = function ($input) {
        $input.addEventListener('invalid', function () {
            $input.setCustomValidity('Te rugăm sa completezi acest câmp.');
        });
        $input.addEventListener('input', function () {
            $input.setCustomValidity('');
        });
    };
    for (var _i = 0, _a = $qsAll('form input'); _i < _a.length; _i++) {
        var $input = _a[_i];
        _loop_5($input);
    }
}
function initQuantityChangerEvent() {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.QUANTITY_CHANGER)) {
        $qsAll('#pp-summary-body, #pp-summary-body-existing', function ($removeButtons) {
            $removeButtons.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var $target, cartItemKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            $target = event.target;
                            if (!$target.closest('.pp-item-remover-btn')) return [3, 2];
                            cartItemKey = $target.closest('.pp-item-remover-btn').dataset.qid;
                            return [4, changeQuantity(cartItemKey, 0, true)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            }); });
        });
        return;
    }
    $qsAll('#pp-summary-body, #pp-summary-body-existing, #pp-summary-body-mobile, .pp-related-product-body', function ($cartContainer) {
        $cartContainer.addEventListener('click', handleCartContainerEvent);
        $cartContainer.addEventListener('keypress', handleCartContainerEvent);
    });
}
function handleCartContainerEvent(event) {
    return __awaiter(this, void 0, void 0, function () {
        var $target, $inputTarget_1, cartItemKey_1, $button, cartItemKey1, cartItemKey2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $target = event.target;
                    if (!($target.closest('.qty-fs') && event.type === 'keypress')) return [3, 5];
                    $inputTarget_1 = event.target;
                    cartItemKey_1 = $target.closest('.qty-fs').dataset.qid;
                    if (!($inputTarget_1.value && $inputTarget_1.checkValidity())) return [3, 4];
                    if (!eventClick(event)) return [3, 2];
                    return [4, changeQuantity(cartItemKey_1, Number.parseInt($inputTarget_1.value), true)];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2:
                    if (!(event.type === 'keypress')) return [3, 4];
                    $target.addEventListener('blur', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, changeQuantity(cartItemKey_1, Number.parseInt($inputTarget_1.value), true)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); }, {
                        once: true
                    });
                    return [4, new Promise(function (r) { return setTimeout(r, 750); })];
                case 3:
                    _a.sent();
                    if (!document.activeElement.classList.contains('qty-fs')) {
                        return [2];
                    }
                    $target.blur();
                    _a.label = 4;
                case 4: return [2];
                case 5:
                    if (!eventClick(event)) {
                        return [2];
                    }
                    if (!$target.closest('.qty-btn') && !$target.closest('.qty-fs') && !$target.closest('.pp-item-remover-btn')) {
                        return [2];
                    }
                    if (!$target.closest('.qty-btn')) return [3, 10];
                    $button = $target.closest('.qty-btn');
                    cartItemKey1 = $button.dataset.qid;
                    if (!$button.classList.contains('decrease-qty')) return [3, 7];
                    return [4, changeQuantity(cartItemKey1, -1, false)];
                case 6:
                    _a.sent();
                    return [3, 9];
                case 7:
                    if (!$button.classList.contains('increase-qty')) return [3, 9];
                    return [4, changeQuantity(cartItemKey1, 1, false)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3, 12];
                case 10:
                    if (!$target.closest('.pp-item-remover-btn')) return [3, 12];
                    cartItemKey2 = $target.closest('.pp-item-remover-btn').dataset.qid;
                    return [4, changeQuantity(cartItemKey2, 0, true)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2];
            }
        });
    });
}
function changeQuantity(cartItemKey, amount, set) {
    if (amount === void 0) { amount = 1; }
    if (set === void 0) { set = false; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Environment.modalUI.loadingMode() !== 'finished') {
                        return [2];
                    }
                    store.dispatch(startModalLoading());
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetchHostWindowData('pp-change-quantity', {
                            key: cartItemKey,
                            amount: amount,
                            set: set
                        })];
                case 2:
                    response = _a.sent();
                    consumeCartCalculationResponse(response);
                    return [3, 4];
                case 3:
                    error_5 = _a.sent();
                    if (error_5 instanceof Error) {
                        captureSentryException(new Error("Quantity failed to change on ".concat(MerchantConfiguration.hostName(), ". Error").concat(error_5.message)));
                    }
                    return [3, 4];
                case 4:
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    });
}
function initCart() {
    var _this = this;
    initCartEvents();
    initQuantityChangerEvent();
    onWindowMessage('pp-update-cart', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    }); });
}
function initCartEvents() {
    var previousCartData = '';
    var previousCurrencyData = '';
    store.subscribe(function () {
        var cartData = JSON.stringify(DefaultCart.contents());
        var currencyData = JSON.stringify(MerchantConfiguration.currency.configuration());
        if (cartData !== previousCartData || currencyData !== previousCurrencyData) {
            previousCartData = cartData;
            previousCurrencyData = currencyData;
            renderOrderSummaryItems(DefaultCart.contents());
        }
    });
}
function renderOrderSummaryItems(cart) {
    var $tbody = $qs('#pp-summary-body');
    var $tbodyExisting = $qs('#pp-summary-body-existing');
    if (!$tbody || !$tbodyExisting) {
        return;
    }
    clearOrderSummary();
    if (DefaultCart.contents().length === 0) {
        var $message = "<div class=\"pp-order-summary-item\"><p>".concat(getLocaleText('Cart is empty'), "</p></div>");
        $tbody.innerHTML = $message;
        $tbodyExisting.innerHTML = $message;
        return;
    }
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        if (cartItemQuantity(item) === 0) {
            continue;
        }
        var $cartRow = void 0;
        if (item.is_part_of_bundle) {
            continue;
        }
        else {
            var itemBundle = [];
            itemBundle.push(item);
            for (var j = i + 1; j < cart.length; j++) {
                var nextItem = cart[j];
                if (nextItem && nextItem.is_part_of_bundle) {
                    itemBundle.push(nextItem);
                }
                else {
                    break;
                }
            }
            $cartRow = renderCartItem(itemBundle);
        }
        if (i != 0) {
            $cartRow.classList.add('pp-order-summary-item-border');
        }
        $tbody.append($cartRow);
        $tbodyExisting.append($cartRow.cloneNode(true));
    }
}
function renderBundleItem(item) {
    var $bundleItem = document.createElement('div');
    $bundleItem.className = 'pp-bundle-summary-item';
    var $imgDiv = getImgQtyDiv(item);
    var $labelDiv = document.createElement('div');
    $labelDiv.className = 'pp-bundle-label';
    $labelDiv.innerHTML = cartItemLabel(item) + cartItemVariationHTML(item);
    $bundleItem.appendChild($imgDiv);
    $bundleItem.appendChild($labelDiv);
    return $bundleItem;
}
function renderCartItem(itemBundle) {
    var _a, _b;
    var item = itemBundle[0];
    var $cartRow = document.createElement('div');
    var imageSrc = (_b = (_a = item.image) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    var showImage = Feature.enabled(FeatureFlag.PRODUCT_IMAGES) && imageSrc && imageSrc !== 'unknown' && imageSrc !== '(unknown)';
    $cartRow.className = 'pp-order-summary-item';
    !showImage ? $cartRow.style.gap = '16px' : '';
    var $imgQtyDiv = getImgQtyDiv(item);
    var $itemInfoContainer = document.createElement('div');
    $itemInfoContainer.className = 'pp-cart-item-info-container';
    var $itemInfo = document.createElement('div');
    $itemInfo.className = 'pp-cart-item-info';
    var $labelDiv = document.createElement('div');
    $labelDiv.className = 'pp-item-label';
    $labelDiv.innerHTML = cartItemLabel(item);
    $itemInfo.appendChild($labelDiv);
    var $amountDiv = document.createElement('div');
    $amountDiv.className = 'pp-item-amount';
    var $amountP = document.createElement('p');
    $amountP.classList.add('pp-recalculate-blur');
    $amountP.innerHTML = cartItemDisplayAmount(item);
    $amountDiv.appendChild($amountP);
    $itemInfo.appendChild($amountDiv);
    var $removerDiv = document.createElement('div');
    $removerDiv.className = 'pp-item-remover';
    $removerDiv.innerHTML = "<button class=\"pp-item-remover-btn pp-disabled-processing\" data-qid=\"".concat(item.item_key, "\">\n\t<img src=\"img/trashcan.svg\" class=\"pp-item-remover-img\"/>\n\t<img src=\"img/trashcan-red.svg\" class=\"pp-item-remover-hover-img\"/>\n\t</button>");
    $itemInfo.appendChild($removerDiv);
    $itemInfoContainer.appendChild($itemInfo);
    var $variationInfo = document.createElement('div');
    $variationInfo.className = 'pp-cart-item-info';
    $variationInfo.innerHTML = cartItemVariationHTML(item);
    $itemInfoContainer.appendChild($variationInfo);
    for (var i = 1; i < itemBundle.length; i++) {
        var $bundleItem = renderBundleItem(itemBundle[i]);
        $itemInfoContainer.appendChild($bundleItem);
    }
    if ($imgQtyDiv.innerHTML !== '') {
        $cartRow.appendChild($imgQtyDiv);
    }
    $cartRow.appendChild($itemInfoContainer);
    return $cartRow;
}
function clearOrderSummary() {
    for (var _i = 0, _a = $qsAll('.pp-order-summary-item'); _i < _a.length; _i++) {
        var $item = _a[_i];
        $item.remove();
    }
}
function getImgQtyDiv(item) {
    var _a, _b;
    var imageSrc = (_b = (_a = item.image) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    var showImage = Feature.enabled(FeatureFlag.PRODUCT_IMAGES) && imageSrc && imageSrc !== 'unknown' && imageSrc !== '(unknown)';
    var showQuantityChanger = Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && !item.is_part_of_bundle;
    var $div = document.createElement('div');
    $div.className = 'pp-cart-img-qty';
    if (!showImage && !showQuantityChanger) {
        if (item.is_part_of_bundle) {
            $div.className = 'pp-cart-img';
            return $div;
        }
        $div.className = 'pp-cart-img-qty-empty';
        $div.innerHTML += buildQuantityChanger(showImage, item);
        return $div;
    }
    if (showImage) {
        if (item.is_part_of_bundle) {
            $div.className = 'pp-cart-img';
            $div.innerHTML = "<div class=\"product-img-td-b0\"><img class=\"pp-bundle-img-size\" src=\"".concat(item.image ? item.image[0] : '', "\"/></div>");
            return $div;
        }
        else {
            $div.innerHTML = "<div class=\"product-img-td-b0\"><img class=\"pp-product-img-size\" src=\"".concat(item.image ? item.image[0] : '', "\"/></div>");
        }
        $div.innerHTML += buildQuantityChanger(showImage, item);
    }
    else {
        var $qtyContainer = document.createElement('div');
        $qtyContainer.className = 'pp-cart-img-qty-empty';
        $qtyContainer.innerHTML = buildQuantityChanger(showImage, item);
        $div.append($qtyContainer);
    }
    return $div;
}
function buildQuantityChanger(showImage, item) {
    var width = "".concat(cartItemQuantity(item)).length;
    var showQuantityChanger = Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && !item.is_part_of_bundle;
    var quantityNumber = "<div class=\"pp-qty-changer-disabled ".concat(showImage ? 'pp-qty-changer-with-img' : '', "\">").concat(cartItemQuantity(item), "</div>");
    var quantityChanger = "\n\t<div class=\"quantityChanger ".concat(showImage ? 'pp-qty-changer-with-img' : '', "\">\n\t\t<button type=\"button\" class=\"flex-center qty-btn decrease-qty ").concat(cartItemQuantity(item) <= 1 ? 'pp-qty-scroll-end' : 'pp-qty-btn-hide', "\" data-qid=\"").concat(item.item_key, "\">\n\t\t\t<img class=\"pp-qty-symbol\" src=\"img/qty-minus.svg\">\n\t\t</button>\n\t\t<input type=\"number\" min=\"0\" max=\"").concat(item.stock_qty ? item.stock_qty : '', "\" class=\"qty-fs\" value=\"").concat(cartItemQuantity(item), "\" data-qid=\"").concat(item.item_key, "\" required style=\"width: ").concat(width, "ch;\"/>\n\t\t<button type=\"button\" class=\"flex-center qty-btn increase-qty ").concat(item.stock_qty && cartItemQuantity(item) >= item.stock_qty ? 'pp-qty-scroll-end' : 'pp-qty-btn-hide', "\" data-qid=\"").concat(item.item_key, "\">\n\t\t\t<img class=\"pp-qty-symbol\" src=\"img/qty-plus.svg\">\n\t\t</button>\n\t</div>");
    return showQuantityChanger ? quantityChanger : quantityNumber;
}
function initSummary(message) {
    var _a;
    initSummaryEvents();
    store.dispatch(updateMerchantTaxConfig({
        displayPricesInCartAndCheckout: ((_a = message.phpData) === null || _a === void 0 ? void 0 : _a.wc_tax_price_display) === 'incl' ? 'includeTax' : 'excludeTax'
    }));
}
function initSummaryEvents() {
    store.subscribe(function () {
        renderSummaries();
        renderCartTotals();
    });
}
function renderSummaries() {
    var _a, _b, _c;
    clearRenderedSummaries();
    var cartSummariesHTML = '';
    for (var _i = 0, _d = Object.keys(store.getState().calculatedCarts); _i < _d.length; _i++) {
        var cartKey = _d[_i];
        var summaryHTML = '';
        var _e = cartSummaryViewData(cartKey)(), cartSummary = _e.cartSummary, cartMeta = _e.cartMeta;
        var summaryTitleHTML = cartKey === '0' ? '' : "\n<li class=\"summary-title\">\n\t<div>Recurring totals</div>\n\t<div></div>\n</li>";
        for (var _f = 0, cartSummary_1 = cartSummary; _f < cartSummary_1.length; _f++) {
            var line = cartSummary_1[_f];
            summaryHTML += line === cartSummary[cartSummary.length - 1] ? '<hr>' : '';
            summaryHTML += renderSummaryLine(line.key, line.value, cartMeta);
        }
        cartSummariesHTML += "\n<div class=\"cart-summary\" data-cart-key=\"".concat(cartKey, "\">\n\t<ul class=\"cart-summary-list\">\n\t\t<hr>\n\t\t").concat(summaryTitleHTML, "\n\t\t").concat(summaryHTML, "\n\t</ul>\n\t<p class=\"first-renewal muted\">").concat(buildSubscriptionFirstRenewalString(cartMeta), "</p>\n</div>");
    }
    (_a = $qs('#pp-summary-lines-body')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', cartSummariesHTML);
    (_b = $qs('#pp-summary-lines-body-existing')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('beforeend', cartSummariesHTML);
    (_c = $qs('#pp-summary-lines-body-mobile')) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML('beforeend', cartSummariesHTML);
}
function clearRenderedSummaries() {
    for (var _i = 0, _a = $qsAll('.cart-summary'); _i < _a.length; _i++) {
        var $summary = _a[_i];
        $summary.remove();
    }
}
function renderSummaryLine(name, amount, cartMeta) {
    var priceMetaHTML = '';
    if (cartMeta.subscription) {
        priceMetaHTML = "<span class=\"muted\">".concat(buildSubscriptionPriceMetaData(cartMeta), "</span>");
    }
    return "\n<li class=\"summary-line\" data-raw-cost=\"".concat(amount, "\">\n\t<div>").concat(name, "</div>\n\t<div class=\"pp-recalculate-blur\" >").concat(formatCurrencyString(amount)).concat(priceMetaHTML, "</div>\n</li>");
}
function renderCartTotals() {
    $qsAll('.pp-summary-total', function ($element) { return $element.innerHTML = ''; });
    for (var _i = 0, _a = Object.keys(store.getState().calculatedCarts); _i < _a.length; _i++) {
        var cartKey = _a[_i];
        var calculatedCart = store.getState().calculatedCarts[cartKey];
        if (!calculatedCart) {
            continue;
        }
        renderCartTotal(calculatedCart.summary.total, calculatedCart.cart_meta);
    }
}
function renderCartTotal(total, cartMeta) {
    if (!cartMeta.subscription) {
        $qsAll('.pp-summary-total', function ($element) { return $element.innerHTML += "<span>".concat(formatCurrencyString(total), "</span>"); });
    }
    else {
        $qsAll('.pp-summary-total', function ($element) { return $element.innerHTML += " <span class=\"muted\"> + </span><span class=\"muted\">".concat(formatCurrencyString(total)).concat(buildSubscriptionPriceMetaData(cartMeta, true), "</span>"); });
    }
}
function initMetrics() {
    var _a, _b, _c, _d, _e;
    (_a = $qs('#pp-pay')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay'); });
    (_b = $qs('#pp-pay-mobile')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay-mobile'); });
    (_c = $qs('#pp-pay-existing')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay-existing'); });
    (_d = $qs('#pp-continue-to-shipping')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return recordNonPPButtonClick('pp-continue-to-shipping'); });
    (_e = $qs('#pp-continue-to-shipping-mobile')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return recordNonPPButtonClick('pp-continue-to-shipping-mobile'); });
    onWindowMessage('buttonClicked', function (message) {
        recordButtonClick(buttonTypeValidation(message.buttonID), getPPButtonLocation(message));
    });
}
function buttonTypeValidation(buttonType) {
    return buttonType === undefined ? 'unknown' : buttonType;
}
function recordNonPPButtonClick(buttonType) {
    recordButtonClick(buttonType, PPButtonLocation.NotApplicable);
}
function recordButtonClick(buttonType, ppButtonLocation) {
    postButtonMetrics({
        domain: MerchantConfiguration.hostName(),
        buttonType: buttonType,
        ppButtonLocation: ppButtonLocation,
        isMobile: Environment.customer.mobile(),
        isTestMode: Environment.testMode()
    });
}
var PPButtonLocation;
(function (PPButtonLocation) {
    PPButtonLocation["Product"] = 'product';
    PPButtonLocation["Checkout"] = 'checkout';
    PPButtonLocation["MiniCart"] = 'mini-cart';
    PPButtonLocation["Cart"] = 'cart';
    PPButtonLocation["NotApplicable"] = 'not-applicable';
})(PPButtonLocation || (PPButtonLocation = {}));
function getPPButtonLocation(message) {
    if (message.isMiniCart) {
        return PPButtonLocation.MiniCart;
    }
    switch (Environment.plugin.pageType()) {
        case 'cart':
            return PPButtonLocation.Cart;
        case 'checkout':
            return PPButtonLocation.Checkout;
        case 'product':
            return PPButtonLocation.Product;
        default:
            return PPButtonLocation.NotApplicable;
    }
}
function postButtonMetrics(options) {
    if (!options.isTestMode) {
        fetch("https://2fad6w3exg.execute-api.us-east-1.amazonaws.com/v1/buttonstats?domain=".concat(options.domain, "&buttonType=").concat(options.buttonType, "&ppButtonLocation=").concat(String(options.ppButtonLocation), "&isMobile=").concat(String(options.isMobile), "&isProductionData=").concat(String(isProductionDomain(options.domain)))).then(function () { }).catch(function () { });
    }
}
function isProductionDomain(domain) {
    switch (domain) {
        case 'localhost':
        case '127.0.0.1':
        case 'store.local':
        case 'woo.store.local':
        case 'woo.peachpay.app':
        case 'theme1.peachpay.app':
        case 'theme2.peachpay.app':
        case 'theme3.peachpay.app':
        case 'theme4.peachpay.app':
        case 'theme5.peachpay.app':
        case 'qa.peachpay.app':
        case 'qa-david.peachpay.app':
        case 'qa-vikrant.peachpay.app':
        case 'demo-plum.peachpay.app':
        case 'demo.peachpay.app':
            return false;
        default:
            return true;
    }
}
function installOneClickCheckout(testMode) {
    var oneClickURL = getOneClickURL(location.hostname, testMode);
    var $body = document.querySelector('body');
    $body === null || $body === void 0 ? void 0 : $body.insertAdjacentHTML('beforeend', "\n\t<iframe id=\"one-click-iframe\" \n\t\tframeborder=\"0\" \n\t\tallowtransparency=\"true\" \n\t\tscrolling=\"no\" \n\t\tallow=\"payment *\"\n\t\taria-hidden=\"true\" \n\t\ttabindex=\"-1\" \n\t\tstyle=\"border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; visibility: hidden !important; position: fixed !important; height: 1px !important; pointer-events: none !important; user-select: none !important;\"\n\t\tsrc=\"".concat(oneClickURL, "one-click.html\"\n\t>\n\t\tUnable to load PeachPay One Click Checkout Support\n\t</iframe>"));
}
function initCurrencySwitcher() {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.CURRENCY_SWITCHER_INPUT)) {
        return;
    }
    if (Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'add_conversion_fees')) {
        self.addEventListener('pp-pm-updated', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store.dispatch(startModalLoading());
                        return [4, requestCartCalculation()];
                    case 1:
                        _a.sent();
                        store.dispatch(stopModalLoading());
                        return [2];
                }
            });
        }); });
    }
    self.addEventListener('pp-update-currency-switcher-feature', updateCurrencySwitcherFeature);
    renderCurrencySelector();
    self.addEventListener('pp-change-currency', currencyDefaultChange);
}
function renderCurrencySelector() {
    var _a;
    $qsAll('#pp_currency_select, #pp_currency_select_div', function ($removeSelector) {
        $removeSelector.remove();
    });
    var $insertionLocationExisting = $qs('#pp-pms-existing-container');
    var $insertionLocationNew = (_a = $qs('#pp-summary-body')) === null || _a === void 0 ? void 0 : _a.parentElement;
    var $insertionLocationMobile = $qs('#pp-pms-new-container');
    var currencies = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currencies');
    var currencyInfo = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
    if (!currencies || !currencyInfo) {
        return;
    }
    $insertionLocationExisting === null || $insertionLocationExisting === void 0 ? void 0 : $insertionLocationExisting.insertAdjacentElement('beforebegin', buildCurrencySelectDiv(currencyInfo));
    $insertionLocationNew === null || $insertionLocationNew === void 0 ? void 0 : $insertionLocationNew.insertAdjacentElement('afterend', buildCurrencySelectDiv(currencyInfo));
    $insertionLocationMobile === null || $insertionLocationMobile === void 0 ? void 0 : $insertionLocationMobile.insertAdjacentElement('afterend', buildCurrencySelectDiv(currencyInfo, 'pp-currency-mobile'));
}
function buildCurrencySelectDiv(data, customClasses) {
    if (customClasses === void 0) { customClasses = ''; }
    var $options = renderCurrencyList(getCurrencyDropDownInfo(data), MerchantConfiguration.currency.code());
    var currencyContainer = document.createElement('div');
    var $currencySelectTitle = document.createElement('span');
    $currencySelectTitle.innerHTML = getLocaleText('Currency');
    $currencySelectTitle.setAttribute('class', 'pp-title');
    currencyContainer.id = 'pp_currency_select_div';
    currencyContainer.setAttribute('class', 'pp-section-mb ' + customClasses);
    currencyContainer.append($currencySelectTitle);
    var $currencySelect = document.createElement('select');
    $currencySelect.innerHTML = $options;
    $currencySelect.classList.add('pp-currency-selector');
    selectDropdown($currencySelect, MerchantConfiguration.currency.code());
    var selectContainer = document.createElement('div');
    selectContainer.classList.add('pp-currency-selector-container');
    selectContainer.append($currencySelect);
    currencyContainer.append(selectContainer);
    $currencySelect.addEventListener('change', currencyEventListener);
    return currencyContainer;
}
function getCurrencyDropDownInfo(currencyInfo) {
    var mappedCurrencies = {};
    for (var _i = 0, _a = Object.keys(currencyInfo); _i < _a.length; _i++) {
        var key = _a[_i];
        var currency = currencyInfo[key];
        if (currency.hidden) {
            mappedCurrencies[key + ' disabled'] = "(".concat(currency.symbol, ") - ").concat(currency.name);
        }
        else {
            mappedCurrencies[key] = "(".concat(currency.symbol, ") - ").concat(currency.name);
        }
    }
    return mappedCurrencies;
}
function sendCurrencySwitchMessage(currency) {
    var _a;
    var message = {
        event: 'currencyUpdate',
        currency: currency
    };
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage(message, '*');
}
function currencyEventListener(event) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var currencyInfo, $target, method;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault();
                    currencyInfo = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
                    $target = event.target;
                    $target.blur();
                    if (!((currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[$target.value]) && $target.value !== MerchantConfiguration.currency.code())) return [3, 2];
                    store.dispatch(startModalLoading());
                    store.dispatch(updateMerchantCurrencyConfig(__assign(__assign({}, MerchantConfiguration.currency.configuration()), { code: (_a = currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[$target.value].code) !== null && _a !== void 0 ? _a : MerchantConfiguration.currency.code() })));
                    method = PaymentConfiguration.checkEligibleOrFindAlternate({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: PaymentConfiguration.selectedProviderMethodIndex()
                    });
                    if (method) {
                        store.dispatch(setPaymentMethod(method));
                    }
                    else {
                        store.dispatch(setOrderError(getLocaleText('There are no eligible or active payment methods available for this order.')));
                    }
                    store.dispatch(initilizePrimaryPaymentMethodUI());
                    sendCurrencySwitchMessage($target.value);
                    return [4, requestCartCalculation()];
                case 1:
                    _b.sent();
                    store.dispatch(updateMerchantCurrencyConfig(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[$target.value]));
                    $qsAll('.pp-currency-selector', function ($el) {
                        selectDropdown($el, MerchantConfiguration.currency.code());
                    });
                    store.dispatch(stopModalLoading());
                    _b.label = 2;
                case 2: return [2];
            }
        });
    });
}
function renderCurrencyList(data, defaultOption) {
    if (defaultOption === void 0) { defaultOption = ''; }
    if (!data) {
        data = {};
    }
    var list = Object.entries(data).map(function (_a) {
        var key = _a[0], value = _a[1];
        return "<option value=".concat(key, " ").concat(key === defaultOption ? 'selected' : '', "> ").concat(value, " </option>");
    });
    return list.join('');
}
function currencyDefaultChange(event) {
    return __awaiter(this, void 0, void 0, function () {
        var currency, currencyInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currency = event === null || event === void 0 ? void 0 : event.detail;
                    currencyInfo = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
                    if (!currencyInfo) return [3, 2];
                    store.dispatch(updateMerchantCurrencyConfig(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[currency]));
                    store.dispatch(initilizePrimaryPaymentMethodUI());
                    sendCurrencySwitchMessage(currency);
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    $qsAll('.pp-currency-selector', function ($el) {
                        selectDropdown($el, MerchantConfiguration.currency.code());
                    });
                    store.dispatch(stopModalLoading());
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function refreshCurrencySelected() {
    var currency = MerchantConfiguration.currency.code();
    var currencyInfo = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
    if (!currency || currencyInfo === null || !(currency in currencyInfo)) {
        return;
    }
    var event = new CustomEvent('pp-change-currency', {
        detail: currency
    });
    self.dispatchEvent(event);
}
function getCurrencyDefaultTo() {
    return Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'how_currency_defaults');
}
function updateCurrencySwitcherForCountry(country) {
    return __awaiter(this, void 0, void 0, function () {
        var countryCSinput, switcherEnabledforCountry, curFeatureState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalLoading());
                    return [4, fetchHostWindowData('pp-get-modal-currency-data', {
                            country: country
                        })];
                case 1:
                    countryCSinput = _a.sent();
                    if (!countryCSinput) {
                        return [2];
                    }
                    switcherEnabledforCountry = countryCSinput.enabled;
                    curFeatureState = store.getState().environment.plugin.featureSupport;
                    curFeatureState['currency_switcher_input'] = countryCSinput;
                    store.dispatch(setFeatureSupport(curFeatureState));
                    if (!switcherEnabledforCountry && countryCSinput.metadata.active_currency) {
                        sendCurrencySwitchMessage(countryCSinput.metadata.active_currency.code);
                        store.dispatch(updateMerchantCurrencyConfig(countryCSinput.metadata.active_currency));
                    }
                    else if (switcherEnabledforCountry && !(MerchantConfiguration.currency.code() in countryCSinput.metadata.currency_info)) {
                        sendCurrencySwitchMessage(countryCSinput.metadata.set_cur);
                        store.dispatch(updateMerchantCurrencyConfig(countryCSinput.metadata.currency_info[countryCSinput.metadata.set_cur]));
                    }
                    else {
                        sendCurrencySwitchMessage(MerchantConfiguration.currency.code());
                    }
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    });
}
function updateCurrencySwitcherFeature() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(getCurrencyDefaultTo() === 'billing_country' && PeachPayCustomer.billing.country() && PeachPayCustomer.billing.country() !== '')) return [3, 3];
                    return [4, fetchHostWindowData('pp-set-wc-billing-country', {
                            country: PeachPayCustomer.billing.country()
                        })];
                case 1:
                    _a.sent();
                    return [4, updateCurrencySwitcherForCountry(PeachPayCustomer.billing.country())];
                case 2:
                    _a.sent();
                    renderCurrencySelector();
                    _a.label = 3;
                case 3:
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 4:
                    _a.sent();
                    refreshCurrencySelected();
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    });
}
function getStripeInstance(context, usePeachPayStripe) {
    if (usePeachPayStripe) {
        return [
            context.peachpayStripe,
            context.peachpayElements
        ];
    }
    return [
        context.connectStripe,
        context.connectElements
    ];
}
function getCurrentlyUsedTransactionThreshold(featureFlag, paymentMethod, minOrMax) {
    var _a, _b;
    var data;
    if ([
        FeatureFlag.STRIPE,
        FeatureFlag.SQUARE
    ].includes(featureFlag)) {
        var temp = Feature.metadata(featureFlag, paymentMethod);
        if (!temp) {
            return 'n/a';
        }
        data = temp.limits;
    }
    else {
        var temp1 = Feature.metadata(featureFlag, 'limits');
        if (!temp1) {
            return 'n/a';
        }
        data = temp1;
    }
    if (!data) {
        return 'n/a';
    }
    var defaultCurrency = data['default_currency'];
    var currentCurrency = MerchantConfiguration.currency.code();
    if (defaultCurrency !== currentCurrency) {
        return 'n/a';
    }
    else {
        var pmVal = (_a = data["pm_".concat(minOrMax)]) !== null && _a !== void 0 ? _a : 'n/a';
        var merchantVal = (_b = data["merchant_".concat(minOrMax)]) !== null && _b !== void 0 ? _b : 'n/a';
        if (merchantVal !== 'n/a') {
            return merchantVal;
        }
        return pmVal;
    }
}
function uuidv4() {
    var d = new Date().getTime(), d2 = performance && performance.now && performance.now() * 1000 || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
    });
}
var PEACHPAY_SESSION_KEY = 'PP_SESSION_KEY';
function createSession() {
    var key = "session_".concat(uuidv4());
    return {
        key: key,
        created_on: new Date().toJSON()
    };
}
function getSession() {
    var getData = function () {
        try {
            return localStorage.getItem(PEACHPAY_SESSION_KEY);
        }
        catch (_a) {
            return null;
        }
    };
    var sessionData = getData();
    var parseSession = function (data) {
        if (!data) {
            return createSession();
        }
        var session = JSON.parse(data);
        var currentDate = new Date();
        var sessionDate = new Date(session.created_on);
        if (currentDate.getMilliseconds() - sessionDate.getMilliseconds() > 432000000) {
            return createSession();
        }
        return session;
    };
    return parseSession(sessionData);
}
function saveSession(session) {
    try {
        localStorage.setItem(PEACHPAY_SESSION_KEY, JSON.stringify(session));
        return true;
    }
    catch (_a) {
        return false;
    }
}
function loadSession() {
    var session = getSession();
    store.dispatch(setSessionId(session.key));
    saveSession(session);
}
function clearLocalSession() {
    try {
        localStorage.removeItem(PEACHPAY_SESSION_KEY);
    }
    catch (_a) { }
}
function initOneClickUpsell() {
    if (!Feature.enabled(FeatureFlag.ONE_CLICK_UPSELL)) {
        return;
    }
    var ocuFlow = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'pp_ocu_flow');
    if (ocuFlow === 'pp_button') {
        store.subscribe(function () {
            var _a;
            if (((_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-expanded')) === 'false') {
                displayOCUPage(ocuFlow);
            }
        });
    }
    else if (ocuFlow === 'before_payment') {
        $qsAll('#pp-continue-to-payment, #pp-continue-to-payment-mobile', function (element) { return element.addEventListener('click', function () {
            store.subscribe(function () {
                var _a;
                if (((_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-expanded')) === 'false') {
                    displayOCUPage(ocuFlow);
                }
            });
        }); });
    }
}
function displayOCUPage(flow) {
    var ocuHeadline = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'headline_text');
    var ocuSubHeadline = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'sub_headline_text');
    var acceptBtnText = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'accept_button_text');
    var declineBtnText = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'decline_button_text');
    var customDesc = Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'custom_description');
    var ocuProducts = Feature.dynamicMetadata(FeatureFlag.ONE_CLICK_UPSELL, 'pp_ocu_products');
    $qsAll('#pp-modal-content, #pp-related-products-section', function ($el) { return $el.style.zIndex = '-1'; });
    renderOCUPage(ocuHeadline, ocuSubHeadline, customDesc, acceptBtnText, declineBtnText, ocuProducts);
    if (flow !== 'after_payment') {
        initOCUEvents();
    }
}
function renderOCUPage(ocuHeadline, subHeadline, customDesc, acceptBtnText, declineBtnText, ocuProducts) {
    clearOCUSection();
    if (ocuProducts) {
        var ocuContainer = $qs('#pp-ocu-container');
        ocuContainer === null || ocuContainer === void 0 ? void 0 : ocuContainer.classList.remove('hide');
        ocuContainer === null || ocuContainer === void 0 ? void 0 : ocuContainer.setAttribute('aria-expanded', 'true');
        var ocuBody = document.createElement('div');
        ocuBody.className = 'pp-ocu-body';
        ocuBody.innerHTML = "\n                <button class=\"pp-ocu-close\">&times;</button>\n                <span class=\"pp-ocu-headline\">".concat(ocuHeadline, "</span>\n                <div class=\"pp-ocu-sub-headline ").concat(subHeadline ? '' : 'hide', "\">\n                    <span>").concat(subHeadline, "</span>\n                </div>\n                <div class=\"pp-ocu-contents\">\n                    <img class=\"pp-ocu-product-img\" src=").concat(ocuProducts.image, ">\n                    <span class=\"pp-ocu-product-name\">").concat(ocuProducts.name, "</span>\n                    <span class=\"pp-ocu-product-description ").concat(customDesc ? '' : 'hide', "\">").concat(customDesc, "</span>\n                    <div class=\"pp-ocu-product-price\">").concat(ocuProducts.price, "</div>\n                </div>\n                <button class=\"pp-ocu-accept-button\" data-ocu_id=").concat(ocuProducts.id, ">").concat(acceptBtnText, "</button>\n                <button class=\"pp-ocu-decline-button\">").concat(declineBtnText, "</button>");
        ocuContainer === null || ocuContainer === void 0 ? void 0 : ocuContainer.prepend(ocuBody);
    }
}
function clearOCUSection() {
    for (var _i = 0, _a = $qsAll('.pp-ocu-body'); _i < _a.length; _i++) {
        var ocuProduct = _a[_i];
        ocuProduct.remove();
    }
}
function initOCUEvents() {
    var _a;
    for (var _i = 0, _b = $qsAll('.pp-ocu-close, .pp-ocu-decline-button'); _i < _b.length; _i++) {
        var ocuClose = _b[_i];
        ocuClose.addEventListener('click', function () {
            closeOCUPage();
        });
    }
    (_a = $qs('.pp-ocu-accept-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
        event.target.disabled = true;
        event.target.innerHTML = '<img src="img/spinner.svg" class="ocu-spinner"/> Updating your order ...';
        addOCUProductToCart(event.target);
    });
}
function closeOCUPage() {
    var _a;
    (_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.classList.add('pp-blowup-close');
    setTimeout(function () {
        var _a;
        $qs('#pp-ocu-container', function ($el) { return $el.style.backgroundColor = 'unset'; });
        $qsAll('#pp-modal-content, #pp-related-products-section', function ($el) { return $el.style.zIndex = '1'; });
        (_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    }, 500);
}
function addOCUProductToCart(ocuProduct) {
    window.parent.postMessage({
        event: 'addLinkedProduct',
        productID: ocuProduct.dataset.ocu_id
    }, '*');
    onWindowMessage('pp-update-cart', function () {
        ocuProduct.innerHTML = '<img src="img/check-solid.svg" class="ocu-checkmark"/> Product added successfully!';
        setTimeout(closeOCUPage, 3000);
    });
}
function initStripeAffirmMethod() {
    var _this = this;
    return {
        config: {
            name: 'Affirm',
            slug: 'affirm',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting pay you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/affirm.svg'
                },
                badge: {
                    src: 'img/marks/affirm.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'affirm_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'affirm_payments', 'max'),
                currencies: [
                    'USD'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'US'
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'affirm',
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmAffirmPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripeAfterPayMethod() {
    var _this = this;
    return {
        config: {
            name: 'Afterpay',
            slug: 'afterpay',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting pay you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/afterpay.svg'
                },
                badge: {
                    src: 'img/marks/afterpay.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'afterpay_clearpay_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'afterpay_clearpay_payments', 'max'),
                currencies: [
                    'USD',
                    'CAD',
                    'GBP',
                    'AUD',
                    'NZD'
                ],
                productTypes: [],
                virtualProducts: false,
                shippingMethods: [],
                customerCountries: [
                    'US',
                    'CA',
                    'GB',
                    'AU',
                    'NZ'
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'afterpay_clearpay',
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmAfterpayClearpayPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripeBancontactMethod() {
    var _this = this;
    return {
        config: {
            name: 'Bancontact',
            slug: 'bancontact',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/bancontact.svg'
                },
                badge: {
                    src: 'img/marks/bancontact.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'bancontact_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'bancontact_payments', 'max'),
                currencies: [
                    'EUR'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'BE'
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'bancontact',
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmBancontactPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function setupStripeButton() {
    store.subscribe(function () {
        renderStripeButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode(), Carts.total());
        renderStripeButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
    });
}
function renderStripeButtonDisplay(provider, loadingMode, allCartsTotal) {
    if (provider === 'stripe' && allCartsTotal > 0) {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (provider === 'stripe' && loadingMode !== 'loading' && allCartsTotal > 0) {
        $qsAll('.stripe-btn', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn', function ($element) { return $element.classList.add('hide'); });
    }
}
function renderStripeButtonLoading(provider, mode) {
    if (provider !== 'stripe') {
        return;
    }
    if (mode === 'finished') {
        $qsAll('.stripe-btn', function ($element) { return $element.disabled = false; });
    }
    else {
        $qsAll('.stripe-btn', function ($element) { return $element.disabled = true; });
    }
    if (mode === 'loading') {
        $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-btn-spinner-container ', function ($element) { return $element.classList.add('hide'); });
    }
    if (mode === 'processing') {
        $qsAll('.stripe-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('Processing'); });
        $qsAll('.stripe-btn-spinner', function ($element) { return $element.classList.remove('hide'); });
        $qsAll('.modal-lock-icon', function ($element) { return $element.classList.add('hide'); });
    }
    else {
        $qsAll('.stripe-btn > .button-text', function ($element) { return $element.innerHTML = "".concat(getLocaleText('Pay'), " ").concat(formatCurrencyString(DefaultCart.total())); });
        $qsAll('.stripe-btn-spinner', function ($element) { return $element.classList.add('hide'); });
    }
}
function initStripeCardMethod() {
    var _this = this;
    var config = {
        name: getLocaleText('Card'),
        slug: 'card',
        gateway: 'peachpay_stripe',
        description: '',
        addNewButton: getLocaleText('+ NEW CARD'),
        savedButton: getLocaleText('VIEW SAVED CARDS'),
        reusable: true,
        showName: true,
        assets: {
            title: {
                src: 'img/marks/credit-card-regular.svg'
            },
            badge: {
                src: 'img/marks/credit-card-regular.svg'
            }
        },
        supports: {
            minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'card_payments', 'min'),
            maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'card_payments', 'max'),
            currencies: [
                'ALL'
            ],
            productTypes: [
                'subscriptions'
            ],
            virtualProducts: true,
            shippingMethods: [],
            customerCountries: [
                'ALL'
            ]
        }
    };
    return {
        config: config,
        saveMethod: function (paymentMethod) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return [
                'stripe:card',
                {
                    id: paymentMethod.id,
                    name: 'Card',
                    provider: 'stripe',
                    type: 'card',
                    metadata: {
                        brand: (_b = (_a = paymentMethod.card) === null || _a === void 0 ? void 0 : _a.brand) !== null && _b !== void 0 ? _b : '',
                        last4: (_d = (_c = paymentMethod.card) === null || _c === void 0 ? void 0 : _c.last4) !== null && _d !== void 0 ? _d : '',
                        exp_month: (_f = (_e = paymentMethod.card) === null || _e === void 0 ? void 0 : _e.exp_month) !== null && _f !== void 0 ? _f : '',
                        exp_year: (_h = (_g = paymentMethod.card) === null || _g === void 0 ? void 0 : _g.exp_year) !== null && _h !== void 0 ? _h : '',
                        funding: (_k = (_j = paymentMethod.card) === null || _j === void 0 ? void 0 : _j.funding) !== null && _k !== void 0 ? _k : 'unknown'
                    }
                }
            ];
        },
        activate: function (context) {
            var _a = getStripeInstance(context, true), _ = _a[0], elements = _a[1];
            var style = {
                base: {
                    color: '#333',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '18px',
                    '::placeholder': {
                        color: '#999'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            };
            var $card = elements.create('card', {
                style: style,
                hidePostalCode: false
            });
            $qsAll("div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"card\"][data-index=\"\"]", function ($el) { return $el.innerHTML = ''; });
            var previousCustomerMode = null;
            store.subscribe(function () {
                var currentCustomerMode = Environment.customer.existing();
                if (PaymentConfiguration.selectedPaymentMethod() === 'stripe:card' && previousCustomerMode !== currentCustomerMode) {
                    previousCustomerMode = currentCustomerMode;
                    $card.unmount();
                    if (Environment.customer.existing()) {
                        $card.mount("#pp-pms-existing div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"card\"][data-index=\"\"]");
                    }
                    else {
                        $card.mount("#pp-pms-new div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"card\"][data-index=\"\"]");
                    }
                }
            });
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stripe, elements, $card, config, _b, paymentMethod, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = getStripeInstance(context, true), stripe = _a[0], elements = _a[1];
                        $card = elements.getElement('card');
                        if (!$card) {
                            return [2, null];
                        }
                        config = {
                            type: 'card',
                            card: $card,
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _b = _c.sent(), paymentMethod = _b.paymentMethod, error = _b.error;
                        if (error) {
                            displayCardError(error.message);
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        displayPaymentIntentError: displayCardError,
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, _a, error, paymentIntent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, stripe.confirmCardPayment(clientSecret)];
                    case 1:
                        _a = _b.sent(), error = _a.error, paymentIntent = _a.paymentIntent;
                        if (!error) return [3, 3];
                        displayCardError(error.message);
                        store.dispatch(stopModalLoading());
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'failed',
                                note: error.message
                            }))];
                    case 2:
                        _b.sent();
                        return [2, [
                                false,
                                error.message
                            ]];
                    case 3:
                        if (!paymentIntent) return [3, 5];
                        if (!(paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture')) return [3, 5];
                        if (!window.top) return [3, 5];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 4:
                        _b.sent();
                        clearLocalSession();
                        window.top.location = options.directURL;
                        _b.label = 5;
                    case 5: return [2, [
                            false
                        ]];
                }
            });
        }); },
        setup: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, _a, error, setupIntent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, stripe.confirmCardSetup(clientSecret)];
                    case 1:
                        _a = _b.sent(), error = _a.error, setupIntent = _a.setupIntent;
                        if (!error) return [3, 3];
                        displayCardError(error.message);
                        store.dispatch(stopModalLoading());
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'failed',
                                note: error.message
                            }))];
                    case 2:
                        _b.sent();
                        return [2, [
                                false,
                                error.message
                            ]];
                    case 3:
                        if (!(setupIntent.status === 'succeeded' || setupIntent.status === 'requires_capture')) return [3, 5];
                        if (!window.top) return [3, 5];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 4:
                        _b.sent();
                        clearLocalSession();
                        window.top.location = options.directURL;
                        _b.label = 5;
                    case 5: return [2, [
                            false
                        ]];
                }
            });
        }); }
    };
}
function addCardError(error) {
    var _a;
    var $container = $qsAll("div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"card\"][data-index=\"\"]");
    $container.forEach(function ($el) {
        $el.insertAdjacentHTML('afterend', "<div class=\"pp-pm-error-text\"><span>".concat(error, "</span></div>"));
    });
    (_a = $qs('#pp-selected-pm')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', "<div class=\"pp-pm-error-text\"><span>".concat(error, "</span></div>"));
    setTimeout(function () {
        $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    }, 5000);
}
function displayCardError(error) {
    $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    if (Environment.modalUI.page() === 'returning') {
        setTimeout(function () {
            openSlideUpView('payment');
        }, 500);
        setTimeout(function () {
            addCardError(error);
        }, 200);
    }
    else {
        addCardError(error);
    }
}
function initStripeEPSMethod() {
    var _this = this;
    return {
        config: {
            name: 'EPS',
            slug: 'eps',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/eps.svg'
                },
                badge: {
                    src: 'img/marks/eps.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'eps_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'eps_payments', 'max'),
                currencies: [
                    'EUR'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'AT'
                ]
            }
        },
        activate: function (context) {
            var SELECTOR_BASE = 'div.pp-pm-saved-option[data-provider="stripe"][data-method="eps"][data-index=""]';
            var _a = getStripeInstance(context, false), _ = _a[0], elements = _a[1];
            var options = {
                style: {
                    base: {
                        padding: '5px 0',
                        color: '#32325d',
                        fontSize: '16px'
                    }
                }
            };
            var $epsBank = elements.create('epsBank', options);
            $qsAll(SELECTOR_BASE, function ($el) { return $el.innerHTML = "\n<div style=\"text-align: left; display: flex; flex-direction: column;\">\n    <label>\n        <span style=\"font-weight: 600;\">".concat(getLocaleText('Name'), "</span>\n    </label>\n    <span class=\"eps-accountholder-name\" style=\"margin-bottom: 1rem;\">").concat(PeachPayCustomer.billing.fullName(), "</span>\n   \n    <div style=\"border-radius: 4px; background-color: #f4f4f4; padding: 0.1rem 0.5rem;\">\n        <label style=\"font-weight: 600; font-size: 13px; color: #707070;\">").concat(getLocaleText('eps Bank'), "</label>\n        <div class=\"eps-container-element\"></div>\n    </div>\n    <hr>\n    <p class=\"muted\" style=\"text-align: center; margin: 0.5rem 0\">").concat(getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'), "</p>\n</div>\n"); });
            var previousCustomerMode = null;
            store.subscribe(function () {
                $qsAll('.eps-accountholder-name', function ($el) { return $el.innerHTML = PeachPayCustomer.billing.fullName(); });
                var currentCustomerMode = Environment.customer.existing();
                if (PaymentConfiguration.selectedPaymentMethod() !== 'stripe:eps' || previousCustomerMode === currentCustomerMode) {
                    return;
                }
                previousCustomerMode = currentCustomerMode;
                $epsBank.unmount();
                if (Environment.customer.existing()) {
                    $epsBank.mount("#pp-pms-existing ".concat(SELECTOR_BASE, " .eps-container-element"));
                }
                else {
                    $epsBank.mount("#pp-pms-new ".concat(SELECTOR_BASE, " .eps-container-element"));
                }
            });
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stripe, elements, $epsBank, config, _b, paymentMethod, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = getStripeInstance(context, false), stripe = _a[0], elements = _a[1];
                        $epsBank = elements.getElement('epsBank');
                        if (!$epsBank) {
                            return [2, null];
                        }
                        config = {
                            type: 'eps',
                            eps: $epsBank,
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _b = _c.sent(), paymentMethod = _b.paymentMethod, error = _b.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmEpsPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripeGiropayMethod() {
    var _this = this;
    return {
        config: {
            name: 'giropay',
            slug: 'giropay',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/giropay.svg'
                },
                badge: {
                    src: 'img/marks/giropay.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'giropay_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'giropay_payments', 'max'),
                currencies: [
                    'EUR'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'DE'
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'giropay',
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmGiropayPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripeIdealMethod() {
    var _this = this;
    return {
        config: {
            name: 'iDEAL',
            slug: 'ideal',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/ideal.svg'
                },
                badge: {
                    src: 'img/marks/ideal.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'ideal_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'ideal_payments', 'max'),
                currencies: [
                    'EUR'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'NL'
                ]
            }
        },
        activate: function (context) {
            var _a = getStripeInstance(context, false), _ = _a[0], elements = _a[1];
            var options = {
                style: {
                    base: {
                        padding: '5px 0',
                        color: '#32325d',
                        fontSize: '16px'
                    }
                }
            };
            var $idealBank = elements.create('idealBank', options);
            $qsAll("div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"ideal\"][data-index=\"\"]", function ($el) { return $el.innerHTML = "\n<div style=\"text-align: left; display: flex; flex-direction: column;\">\n    <label>\n        <span style=\"font-weight: 600;\">".concat(getLocaleText('Account name'), "</span>\n    </label>\n    <span class=\"ideal-accountholder-name\" style=\"margin-bottom: 1rem;\">").concat(PeachPayCustomer.billing.fullName(), "</span>\n    <div style=\"border-radius: 4px; background-color: #f4f4f4; padding: 0.1rem 0.5rem;\">\n        <label style=\"font-weight: 600; font-size: 13px; color: #707070;\">").concat(getLocaleText('iDEAL Bank'), "</label>\n        <div class=\"ideal-container-element\"></div>\n    </div>\n    <hr>\n    <p class=\"muted\" style=\"text-align: center; margin: 0.5rem 0\">").concat(getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'), "</p>\n</div>\n"); });
            var previousCustomerMode = null;
            store.subscribe(function () {
                $qsAll('.ideal-accountholder-name', function ($el) { return $el.innerHTML = PeachPayCustomer.billing.fullName(); });
                var currentCustomerMode = Environment.customer.existing();
                if (PaymentConfiguration.selectedPaymentMethod() !== 'stripe:ideal' || previousCustomerMode === currentCustomerMode) {
                    return;
                }
                previousCustomerMode = currentCustomerMode;
                $idealBank.unmount();
                if (Environment.customer.existing()) {
                    $idealBank.mount("#pp-pms-existing div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"ideal\"][data-index=\"\"] .ideal-container-element");
                }
                else {
                    $idealBank.mount("#pp-pms-new div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"ideal\"][data-index=\"\"] .ideal-container-element");
                }
            });
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stripe, elements, $idealBank, config, _b, paymentMethod, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = getStripeInstance(context, false), stripe = _a[0], elements = _a[1];
                        $idealBank = elements.getElement('idealBank');
                        if (!$idealBank) {
                            return [2, null];
                        }
                        config = {
                            type: 'ideal',
                            ideal: $idealBank,
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _b = _c.sent(), paymentMethod = _b.paymentMethod, error = _b.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmIdealPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function getKlarnaAccountSupportDetails(account) {
    if (account.country === 'US') {
        return [
            [
                'US'
            ],
            [
                'USD'
            ],
        ];
    }
    return [
        [
            'AT',
            'BE',
            'DK',
            'FI',
            'FR',
            'DE',
            'IE',
            'IT',
            'NL',
            'NO',
            'ES',
            'SE',
            'GB'
        ],
        [
            'EUR',
            'GBP',
            'DKK',
            'SEK',
            'NOK'
        ],
    ];
}
function initStripeKlarnaMethod(account) {
    var _this = this;
    var _a = getKlarnaAccountSupportDetails(account), countries = _a[0], currencies = _a[1];
    return {
        config: {
            name: 'Klarna',
            slug: 'klarna',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting pay you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/klarna.svg'
                },
                badge: {
                    src: 'img/marks/klarna.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'klarna_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'klarna_payments', 'max'),
                currencies: currencies,
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: countries
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'klarna',
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmKlarnaPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripeP24Method() {
    var _this = this;
    return {
        config: {
            name: 'Przelewy24',
            slug: 'p24',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/p24.svg'
                },
                badge: {
                    src: 'img/marks/p24.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'p24_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'p24_payments', 'max'),
                currencies: [
                    'EUR',
                    'PLN'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'PL'
                ]
            }
        },
        activate: function (context) {
            var SELECTOR_BASE = 'div.pp-pm-saved-option[data-provider="stripe"][data-method="p24"][data-index=""]';
            var _a = getStripeInstance(context, false), _ = _a[0], elements = _a[1];
            var options = {
                style: {
                    base: {
                        padding: '5px 0',
                        color: '#32325d',
                        fontSize: '16px'
                    }
                }
            };
            var $p24Bank = elements.create('p24Bank', options);
            $qsAll(SELECTOR_BASE, function ($el) { return $el.innerHTML = "\n<div style=\"text-align: left; display: flex; flex-direction: column;\">\n    <label>\n        <span style=\"font-weight: 600;\">".concat(getLocaleText('Name'), "</span>\n    </label>\n    <span class=\"p24-accountholder-name\">").concat(PeachPayCustomer.billing.fullName(), "</span>\n    <label>\n        <span style=\"font-weight: 600;\">").concat(getLocaleText('Email'), "</span>\n    </label>\n    <span class=\"p24-accountholder-email\" style=\"margin-bottom: 1rem;\">").concat(PeachPayCustomer.billing.email(), "</span>\n\n    <div style=\"border-radius: 4px; background-color: #f4f4f4; padding: 0.1rem 0.5rem;\">\n        <label style=\"font-weight: 600; font-size: 13px; color: #707070;\">").concat(getLocaleText('P24 Bank'), "</label>\n        <div class=\"p24-container-element\"></div>\n    </div>\n    <hr>\n    <p class=\"muted\" style=\"text-align: center; margin: 0.5rem 0\">").concat(getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'), "</p>\n</div>\n"); });
            var previousCustomerMode = null;
            store.subscribe(function () {
                $qsAll('.p24-accountholder-name', function ($el) { return $el.innerHTML = PeachPayCustomer.billing.fullName(); });
                $qsAll('.p24-accountholder-email', function ($el) { return $el.innerHTML = PeachPayCustomer.billing.email(); });
                var currentCustomerMode = Environment.customer.existing();
                if (PaymentConfiguration.selectedPaymentMethod() !== 'stripe:p24' || previousCustomerMode === currentCustomerMode) {
                    return;
                }
                previousCustomerMode = currentCustomerMode;
                $p24Bank.unmount();
                if (Environment.customer.existing()) {
                    $p24Bank.mount("#pp-pms-existing ".concat(SELECTOR_BASE, " .p24-container-element"));
                }
                else {
                    $p24Bank.mount("#pp-pms-new ".concat(SELECTOR_BASE, " .p24-container-element"));
                }
            });
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stripe, elements, $p24Bank, config, _b, paymentMethod, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = getStripeInstance(context, false), stripe = _a[0], elements = _a[1];
                        $p24Bank = elements.getElement('p24Bank');
                        if (!$p24Bank) {
                            return [2, null];
                        }
                        config = {
                            type: 'p24',
                            p24: $p24Bank,
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _b = _c.sent(), paymentMethod = _b.paymentMethod, error = _b.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmP24Payment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function activateStripePaymentRequest(context, orderService) {
    var _this = this;
    var _a;
    if (!Feature.enabled(FeatureFlag.STRIPE_PAYMENT_REQUEST)) {
        return;
    }
    var applePay = Feature.metadata(FeatureFlag.STRIPE_PAYMENT_REQUEST, 'apple_pay');
    var googlePay = Feature.metadata(FeatureFlag.STRIPE_PAYMENT_REQUEST, 'google_pay');
    if (!applePay && !googlePay) {
        return;
    }
    var initMessage = {
        event: 'pp-init-stripe-payment-request',
        isProductPage: Environment.plugin.pageType() === 'product',
        currencyCode: MerchantConfiguration.currency.code(),
        cartCalculationRecord: store.getState().calculatedCarts,
        stripe: {
            publicKey: context.getPublicKey(),
            connectId: context.getConnectId(),
            applePay: applePay !== null && applePay !== void 0 ? applePay : false,
            googlePay: googlePay !== null && googlePay !== void 0 ? googlePay : false
        }
    };
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage(initMessage, '*');
    pploadScript('https://js.stripe.com/v3/', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ppInitStripePaymentRequestSupport(initMessage, context)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    onWindowDataFetch('pp-stripe-payment-request-address-change', handleStripePaymentRequestAddressChange);
    onWindowDataFetch('pp-stripe-payment-request-shipping-change', handleStripePaymentRequestShippingChange);
    onWindowDataFetch('pp-stripe-payment-request-confirm', function (request) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, handleStripePaymentRequestProcessPayment(request, context, orderService)];
            case 1: return [2, _a.sent()];
        }
    }); }); });
    var previousUpdateData = '';
    var unsubscribePaymentRequestUpdates = store.subscribe(function () {
        var _a;
        var paymentRequestDataUpdate = getStripePaymentRequestUpdate();
        var updateData = JSON.stringify(paymentRequestDataUpdate);
        if (previousUpdateData !== updateData) {
            (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage(paymentRequestDataUpdate, '*');
        }
    });
    onWindowMessage('pp-stripe-payment-request-stop', unsubscribePaymentRequestUpdates);
}
function getBrowserType() {
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
        return 1;
    }
    else if (userAgent.match(/firefox|fxios/i)) {
        return 1;
    }
    else if (userAgent.match(/opr\//i)) {
        return 1;
    }
    else if (userAgent.match(/edg/i)) {
        return 1;
    }
    else if (userAgent.match(/safari/i)) {
        return 2;
    }
    else {
        return 0;
    }
}
function getStripePaymentRequestUpdate() {
    return {
        event: 'pp-update-stripe-payment-request',
        currencyCode: MerchantConfiguration.currency.code(),
        cartCalculationRecord: store.getState().calculatedCarts
    };
}
function handleStripePaymentRequestProcessPayment(request, context, orderService) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var transaction, customerFieldsCopy, extraFormData, orderResponse, paymentIntentResponse, stripe, _g, error, paymentIntent, error1_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4, orderService.startTransaction('peachpay_stripe', 'payment_request')];
                case 1:
                    transaction = _h.sent();
                    customerFieldsCopy = __assign({}, store.getState().peachPayCustomer.form_fields);
                    extraFormData = Object.fromEntries(Object.entries(customerFieldsCopy).filter(function (_a) {
                        var key = _a[0], _value = _a[1];
                        return ![
                            'shipping_company',
                            'shipping_email',
                            'shipping_phone',
                            'shipping_first_name',
                            'shipping_last_name',
                            'shipping_address_1',
                            'shipping_address_2',
                            'shipping_city',
                            'shipping_state',
                            'shipping_country',
                            'shipping_postcode',
                            'billing_company',
                            'billing_email',
                            'billing_phone',
                            'billing_first_name',
                            'billing_last_name',
                            'billing_address_1',
                            'billing_address_2',
                            'billing_city',
                            'billing_state',
                            'billing_country',
                            'billing_postcode',
                        ].includes(key);
                    }));
                    store.dispatch(updateCustomerFields(__assign({ shipping_company: '', shipping_email: request.payerEmail, shipping_phone: request.payerPhone, shipping_first_name: (_a = request.payerName.split(' ')[0]) !== null && _a !== void 0 ? _a : '', shipping_last_name: (_b = request.payerName.split(' ')[1]) !== null && _b !== void 0 ? _b : '', shipping_address_1: request.shippingAddress.addressLine[0], shipping_address_2: (_c = request.shippingAddress.addressLine[1]) !== null && _c !== void 0 ? _c : '', shipping_city: request.shippingAddress.city, shipping_state: request.shippingAddress.region, shipping_country: request.shippingAddress.country, shipping_postcode: request.shippingAddress.postalCode, billing_company: '', billing_email: request.payerEmail, billing_phone: request.payerPhone, billing_first_name: (_d = request.payerName.split(' ')[0]) !== null && _d !== void 0 ? _d : '', billing_last_name: (_e = request.payerName.split(' ')[1]) !== null && _e !== void 0 ? _e : '', billing_address_1: request.shippingAddress.addressLine[0], billing_address_2: (_f = request.shippingAddress.addressLine[1]) !== null && _f !== void 0 ? _f : '', billing_city: request.shippingAddress.city, billing_state: request.shippingAddress.region, billing_country: request.shippingAddress.country, billing_postcode: request.shippingAddress.postalCode }, extraFormData)));
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 16, , 18]);
                    return [4, validateAddress()];
                case 3:
                    if (!!(_h.sent())) return [3, 5];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'failed',
                            note: 'Invalid address for Stripe payment request.'
                        }))];
                case 4:
                    _h.sent();
                    return [2, {
                            status: 'invalid_shipping_address'
                        }];
                case 5: return [4, orderService.placeOrder(transaction)];
                case 6:
                    orderResponse = _h.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 8];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 7:
                    _h.sent();
                    captureSentryException(new Error("Order failed to be placed for the payment request flow."), {
                        'payment_request': request,
                        'order_response': orderResponse
                    });
                    return [2, {
                            status: 'fail'
                        }];
                case 8: return [4, context.createIntent('payment', orderResponse, {
                        paymentMethodType: 'none'
                    })];
                case 9:
                    paymentIntentResponse = _h.sent();
                    if (!!paymentIntentResponse.success) return [3, 11];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'creationfailed',
                            note: 'Failed to create payment intent for Stripe payment request flow'
                        }))];
                case 10:
                    _h.sent();
                    captureSentryException(new Error("Creating payment intent failed for payment request flow."), {
                        'payment_request': request,
                        'payment_intent_response': paymentIntentResponse
                    });
                    return [2, {
                            status: 'fail'
                        }];
                case 11:
                    stripe = getStripeInstance(context, false)[0];
                    return [4, stripe.confirmCardPayment(paymentIntentResponse.data.stripe.client_secret, {
                            payment_method: {
                                card: {
                                    token: request.token.id
                                },
                                billing_details: PeachPayCustomer.stripeBillingDetails()
                            }
                        })];
                case 12:
                    _g = _h.sent(), error = _g.error, paymentIntent = _g.paymentIntent;
                    if (!(!error && paymentIntent && paymentIntent.status === 'succeeded')) return [3, 14];
                    clearLocalSession();
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'success'
                        }))];
                case 13:
                    _h.sent();
                    return [2, {
                            status: 'success',
                            redirectURL: orderService.getOrderRedirect(orderResponse)
                        }];
                case 14: return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                        paymentStatus: 'failed'
                    }))];
                case 15:
                    _h.sent();
                    return [2, {
                            status: 'fail'
                        }];
                case 16:
                    error1_1 = _h.sent();
                    captureSentryException(new Error("Stripe payment request flow failed"), {
                        exception: error1_1
                    });
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'failed',
                            note: 'An unknown error occurred in the Stripe payment request flow'
                        }))];
                case 17:
                    _h.sent();
                    return [2, {
                            status: 'fail'
                        }];
                case 18: return [2];
            }
        });
    });
}
function handleStripePaymentRequestAddressChange(request) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    store.dispatch(updateCustomerFields(__assign(__assign({}, PeachPayCustomer.data().form_fields), { shipping_address_1: (_a = request.addressLine[0]) !== null && _a !== void 0 ? _a : '', shipping_address_2: (_b = request.addressLine[1]) !== null && _b !== void 0 ? _b : '', shipping_city: (_c = request.city) !== null && _c !== void 0 ? _c : '', shipping_postcode: (_d = request.postalCode) !== null && _d !== void 0 ? _d : '', shipping_state: (_e = request.region) !== null && _e !== void 0 ? _e : '', shipping_country: (_f = request.country) !== null && _f !== void 0 ? _f : '' })));
                    return [4, requestCartCalculation()];
                case 1:
                    _g.sent();
                    hideNonExpressFields();
                    return [2, getStripePaymentRequestUpdate()];
            }
        });
    });
}
function handleStripePaymentRequestShippingChange(request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(updateCartPackageShippingMethod({
                        cartKey: '0',
                        shippingPackageKey: '0',
                        packageMethodId: request.id
                    }));
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    hideNonExpressFields();
                    return [2, getStripePaymentRequestUpdate()];
            }
        });
    });
}
function pploadScript(src, callback) {
    if (document.querySelector("script[src=\"".concat(src, "\"]")) || window['Stripe']) {
        callback();
        return;
    }
    var $script = document.createElement('script');
    $script.type = 'text/javascript';
    $script.src = src;
    $script.onreadystatechange = callback;
    $script.onload = callback;
    document.head.appendChild($script);
}
function ppInitStripePaymentRequestSupport(message, context) {
    return __awaiter(this, void 0, void 0, function () {
        var stripe, elements, paymentRequest, availableMethods, stripeService, injectStripeService, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    stripe = getStripeInstance(context, false)[0];
                    elements = stripe.elements();
                    paymentRequest = stripe.paymentRequest({
                        country: 'US',
                        currency: message.currencyCode.toLowerCase(),
                        total: {
                            label: 'Total',
                            amount: ppCurrencyAmountToStripeFormat(message.cartCalculationRecord[0].summary.total, message.currencyCode)
                        },
                        displayItems: ppGetPaymentRequestDisplayItems(message.cartCalculationRecord, message.currencyCode),
                        shippingOptions: ppGetPaymentRequestShippingOptions(message.cartCalculationRecord, message.currencyCode),
                        requestPayerName: true,
                        requestPayerEmail: true,
                        requestPayerPhone: true,
                        requestShipping: true
                    });
                    return [4, paymentRequest.canMakePayment()];
                case 1:
                    availableMethods = _a.sent();
                    if (!(availableMethods === null || availableMethods === void 0 ? void 0 : availableMethods.applePay) && !(availableMethods === null || availableMethods === void 0 ? void 0 : availableMethods.googlePay) || !message.stripe.applePay && availableMethods.applePay || !message.stripe.googlePay && availableMethods.googlePay) {
                        return [2];
                    }
                    stripeService = {
                        stripe: stripe,
                        elements: elements,
                        paymentRequest: paymentRequest
                    };
                    injectStripeService = function (stripeService, handler) { return function (stripeEvent) {
                        handler(stripeService, stripeEvent);
                    }; };
                    paymentRequest.on('shippingaddresschange', ppHandleShippingAddressChangeEvent);
                    paymentRequest.on('shippingoptionchange', ppHandleShippingOptionChangeEvent);
                    paymentRequest.on('token', injectStripeService(stripeService, ppHandleTokenEvent));
                    paymentRequest.on('cancel', injectStripeService(stripeService, ppHandleCancelEvent));
                    ppInsertAvailablePaymentRequestButton(stripeService);
                    return [3, 3];
                case 2:
                    error_6 = _a.sent();
                    if (error_6 instanceof Error) {
                        captureSentryException(new Error("Google Pay/Apple Pay failed to Initialize on ".concat(location.hostname, ". Error: ").concat(error_6.message)));
                    }
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
function ppCurrencyAmountToStripeFormat(amount, currencyCode) {
    var zeroDecimalCurrencies = new Set([
        'BIF',
        'CLP',
        'DJF',
        'GNF',
        'JPY',
        'KMF',
        'KRW',
        'MGA',
        'PYG',
        'RWF',
        'UGX',
        'VND',
        'VUV',
        'XAF',
        'XOF',
        'XPF',
    ]);
    if (!zeroDecimalCurrencies.has(currencyCode)) {
        return Math.round(amount * 100);
    }
    return Math.round(amount);
}
function ppGetPaymentRequestDisplayItems(cartCalculationRecord, currencyCode) {
    var items = [];
    items.push({
        label: 'Subtotal',
        amount: ppCurrencyAmountToStripeFormat(cartCalculationRecord[0].summary.subtotal, currencyCode)
    });
    for (var _i = 0, _a = Object.entries(cartCalculationRecord[0].summary.coupons_record); _i < _a.length; _i++) {
        var _b = _a[_i], coupon = _b[0], amount = _b[1];
        if (!amount) {
            continue;
        }
        items.push({
            label: "Coupon - (".concat(coupon, ")"),
            amount: -ppCurrencyAmountToStripeFormat(amount, currencyCode)
        });
    }
    for (var _c = 0, _d = Object.entries(cartCalculationRecord[0].summary.fees_record); _c < _d.length; _c++) {
        var _e = _d[_c], fee = _e[0], amount1 = _e[1];
        if (!amount1) {
            continue;
        }
        items.push({
            label: "Fee - (".concat(fee, ")"),
            amount: ppCurrencyAmountToStripeFormat(amount1, currencyCode)
        });
    }
    if (!cartCalculationRecord[0].cart_meta.is_virtual) {
        items.push({
            label: 'Shipping',
            amount: ppCurrencyAmountToStripeFormat(cartCalculationRecord[0].summary.total_shipping, currencyCode)
        });
    }
    if (cartCalculationRecord[0].summary.total_tax > 0) {
        items.push({
            label: 'Tax',
            amount: ppCurrencyAmountToStripeFormat(cartCalculationRecord[0].summary.total_tax, currencyCode)
        });
    }
    for (var _f = 0, _g = Object.entries(cartCalculationRecord[0].summary.gift_card_record); _f < _g.length; _f++) {
        var _h = _g[_f], giftCard = _h[0], amount2 = _h[1];
        if (!amount2) {
            continue;
        }
        items.push({
            label: "Gift card - (".concat(giftCard, ")"),
            amount: -ppCurrencyAmountToStripeFormat(amount2, currencyCode)
        });
    }
    return items;
}
function ppGetPaymentRequestShippingOptions(cartCalculationRecord, currencyCode) {
    var _a, _b, _c, _d, _e, _f;
    var options = [];
    if (cartCalculationRecord[0].cart_meta.is_virtual) {
        return [
            {
                id: 'no-shipping-available',
                label: 'No Shipping',
                amount: 0
            }
        ];
    }
    var shippingMethods = (_b = (_a = cartCalculationRecord[0].package_record[0]) === null || _a === void 0 ? void 0 : _a.methods) !== null && _b !== void 0 ? _b : {};
    for (var _i = 0, _g = Object.keys(shippingMethods); _i < _g.length; _i++) {
        var methodKey = _g[_i];
        options.push({
            id: methodKey,
            label: (_d = (_c = shippingMethods[methodKey]) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '',
            amount: ppCurrencyAmountToStripeFormat((_f = (_e = shippingMethods[methodKey]) === null || _e === void 0 ? void 0 : _e.total) !== null && _f !== void 0 ? _f : 0, currencyCode)
        });
    }
    return options;
}
function ppHandleShippingAddressChangeEvent(event) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_7, isVirtual, methods;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    response = null;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4, handleStripePaymentRequestAddressChange(event.shippingAddress)];
                case 2:
                    response = _c.sent();
                    return [3, 4];
                case 3:
                    error_7 = _c.sent();
                    if (error_7 instanceof Error) {
                        event.updateWith({
                            status: 'fail'
                        });
                        captureSentryException(new Error("Google Pay/Apple Pay failed requesting shipping address change on ".concat(location.hostname, ". Error: ").concat(error_7.message)));
                    }
                    return [2];
                case 4:
                    isVirtual = response.cartCalculationRecord[0].cart_meta.is_virtual;
                    methods = Object.entries((_b = (_a = response.cartCalculationRecord[0].package_record[0]) === null || _a === void 0 ? void 0 : _a.methods) !== null && _b !== void 0 ? _b : {});
                    if (!isVirtual && methods.length === 0) {
                        event.updateWith({
                            status: 'invalid_shipping_address',
                            total: {
                                label: 'Total',
                                amount: ppCurrencyAmountToStripeFormat(response.cartCalculationRecord[0].summary.total, response.currencyCode)
                            },
                            displayItems: ppGetPaymentRequestDisplayItems(response.cartCalculationRecord, response.currencyCode),
                            shippingOptions: ppGetPaymentRequestShippingOptions(response.cartCalculationRecord, response.currencyCode)
                        });
                    }
                    else {
                        event.updateWith({
                            status: 'success',
                            total: {
                                label: 'Total',
                                amount: ppCurrencyAmountToStripeFormat(response.cartCalculationRecord[0].summary.total, response.currencyCode)
                            },
                            displayItems: ppGetPaymentRequestDisplayItems(response.cartCalculationRecord, response.currencyCode),
                            shippingOptions: ppGetPaymentRequestShippingOptions(response.cartCalculationRecord, response.currencyCode)
                        });
                    }
                    return [2];
            }
        });
    });
}
function ppHandleShippingOptionChangeEvent(event) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, handleStripePaymentRequestShippingChange(event.shippingOption)];
                case 1:
                    response = _a.sent();
                    event.updateWith({
                        status: 'success',
                        total: {
                            label: 'Total',
                            amount: ppCurrencyAmountToStripeFormat(response.cartCalculationRecord[0].summary.total, response.currencyCode)
                        },
                        displayItems: ppGetPaymentRequestDisplayItems(response.cartCalculationRecord, response.currencyCode),
                        shippingOptions: ppGetPaymentRequestShippingOptions(response.cartCalculationRecord, response.currencyCode)
                    });
                    return [3, 3];
                case 2:
                    error_8 = _a.sent();
                    if (error_8 instanceof Error) {
                        captureSentryException(new Error("Google Pay/Apple Pay failed changing shipping option on ".concat(location.hostname, ". Error: ").concat(error_8.message)));
                    }
                    event.updateWith({
                        status: 'fail'
                    });
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
function ppHandleTokenEvent(_stripeService, event) {
    return __awaiter(this, void 0, void 0, function () {
        var request, response, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    request = {
                        token: event.token,
                        payerName: event.payerName,
                        payerEmail: event.payerEmail,
                        payerPhone: event.payerPhone,
                        shippingAddress: event.shippingAddress,
                        shippingOption: event.shippingOption,
                        walletName: event.walletName
                    };
                    return [4, ppFetchIframeData('pp-stripe-payment-request-confirm', request)];
                case 1:
                    response = _a.sent();
                    event.complete(response.status);
                    if (response.status !== 'success') {
                        return [2];
                    }
                    window.location = response.redirectURL;
                    return [3, 3];
                case 2:
                    error_9 = _a.sent();
                    if (error_9 instanceof Error) {
                        if (error_9.message === 'invalid_shipping_address') {
                            event.complete('invalid_shipping_address');
                            return [2];
                        }
                        captureSentryException(new Error("Google Pay/Apple Pay failed to handle token on ".concat(location.hostname, ". Error: ").concat(error_9.message)));
                        event.complete('fail');
                    }
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
function ppHandleCancelEvent(_stripeService) { }
function ppInsertAvailablePaymentRequestButton(_a) {
    var elements = _a.elements, paymentRequest = _a.paymentRequest;
    var expressPayments = document.querySelector('#pp-express-payments');
    var infoForm = document.querySelector('#pp-info-form');
    var browserType = getBrowserType();
    if (expressPayments !== null && infoForm !== null && (browserType === 1 || browserType === 2)) {
        expressPayments.classList.remove('hide');
        infoForm.before(expressPayments);
        var expressPaymentIcon = document.querySelector('#pp-express-payments-icon');
        if (expressPaymentIcon !== null) {
            expressPaymentIcon.src = browserType === 1 ? 'img/marks/google-pay.svg' : 'img/marks/apple-pay.svg';
        }
    }
    var $button = elements.create('paymentRequestButton', {
        paymentRequest: paymentRequest
    });
    if ((window === null || window === void 0 ? void 0 : window.innerWidth) > 900) {
        $button.mount('#pp-stripe-payment-request-checkout-btn');
        var $buttonContainer = document.querySelector('#pp-stripe-payment-request-checkout-btn');
        if ($buttonContainer) {
            $buttonContainer.style.display = 'block';
        }
    }
    else {
        $button.mount('#pp-stripe-payment-request-checkout-btn-mobile');
        var $buttonContainer1 = document.querySelector('#pp-stripe-payment-request-checkout-btn-mobile');
        if ($buttonContainer1) {
            $buttonContainer1.style.display = 'block';
        }
    }
    var resizeDirection = 0;
    document.addEventListener('pp-insert-button', function () {
        $button.unmount();
        if ((window === null || window === void 0 ? void 0 : window.innerWidth) > 900) {
            $button.mount('#pp-stripe-payment-request-checkout-btn');
            var $buttonContainer = document.querySelector('#pp-stripe-payment-request-checkout-btn');
            if ($buttonContainer) {
                $buttonContainer.style.display = 'block';
            }
        }
        else {
            $button.mount('#pp-stripe-payment-request-checkout-btn-mobile');
            var $buttonContainer1 = document.querySelector('#pp-stripe-payment-request-checkout-btn-mobile');
            if ($buttonContainer1) {
                $buttonContainer1.style.display = 'block';
            }
        }
    });
    var expressSelected = function () {
        var res = false;
        $qsAll('.pp-pm-type').forEach(function ($el) {
            if ($el === null || $el === void 0 ? void 0 : $el.classList.contains('selected')) {
                res = true;
            }
        });
        return res;
    };
    self.window.addEventListener('resize', function () {
        if ((window === null || window === void 0 ? void 0 : window.innerWidth) > 900 && (resizeDirection === 0 || resizeDirection === 2)) {
            document.dispatchEvent(new Event('pp-insert-button'));
            if (resizeDirection === 2 && expressSelected()) {
                var $container = document.querySelector('#pp-express-payments');
                if ($container) {
                    $container.classList.remove('pp-section-mt');
                }
            }
            resizeDirection = 1;
        }
        else if ((window === null || window === void 0 ? void 0 : window.innerWidth) < 900 && (resizeDirection == 0 || resizeDirection == 1)) {
            document.dispatchEvent(new Event('pp-insert-button'));
            var $container1 = document.querySelector('#pp-express-payments');
            if ($container1) {
                $container1.classList.add('pp-section-mt');
            }
            if (resizeDirection === 1 && expressSelected()) {
                var $mobileSummary = document.querySelector('.pp-order-summary-mobile');
                if ($mobileSummary) {
                    $mobileSummary.classList.remove('pp-section-mt');
                }
            }
            resizeDirection = 2;
        }
    });
}
function ppFetchIframeData(endpoint, request) {
    return ppFetchWindowData(window, endpoint, request);
}
function ppFetchWindowData(targetWindow, endpoint, request) {
    return new Promise(function (resolve, reject) {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (_a) {
            var data = _a.data;
            channel.port1.close();
            if (data.error) {
                reject(data.error);
            }
            else {
                resolve(data.result);
            }
        };
        if (!targetWindow) {
            reject('Target window is not valid.');
        }
        else {
            targetWindow.postMessage({
                event: endpoint,
                request: request
            }, '*', [
                channel.port2
            ]);
        }
    });
}
function initStripeSofortMethod() {
    var _this = this;
    return {
        config: {
            name: 'Sofort',
            slug: 'sofort',
            gateway: 'peachpay_stripe',
            description: getLocaleText('After selecting <b>Pay</b> you will be redirected to complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/klarna.svg'
                },
                badge: {
                    src: 'img/marks/klarna.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'sofort_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'sofort_payments', 'max'),
                currencies: [
                    'EUR'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'AT',
                    'BE',
                    'DE',
                    'IT',
                    'NL',
                    'ES'
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        config = {
                            type: 'sofort',
                            sofort: {
                                country: PeachPayCustomer.billing.country()
                            },
                            billing_details: __assign({}, PeachPayCustomer.stripeBillingDetails())
                        };
                        return [4, stripe.createPaymentMethod(config)];
                    case 1:
                        _a = _b.sent(), paymentMethod = _a.paymentMethod, error = _a.error;
                        if (error) {
                            return [2, null];
                        }
                        return [2, paymentMethod];
                }
            });
        }); },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                    case 1:
                        _a.sent();
                        return [4, stripe.confirmSofortPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 2:
                        error = (_a.sent()).error;
                        if (error) {
                            return [2, [
                                    true,
                                    error.message
                                ]];
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function initStripePaymentProvider(orderService, pluginCapabilities) {
    if (!Feature.enabled(FeatureFlag.STRIPE) || !(pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.stripe.connected)) {
        return;
    }
    var connectAccount = pluginCapabilities.stripe.account;
    var stripeConfig = pluginCapabilities.stripe.config;
    var peachpayStripeOptions = buildStripeOptions(connectAccount.connect_id, true);
    var peachpayStripe = Stripe(stripeConfig.public_key, peachpayStripeOptions);
    var peachpayElements = peachpayStripe.elements();
    var connectStripeOptions = buildStripeOptions(connectAccount.connect_id, false);
    var connectStripe = Stripe(stripeConfig.public_key, connectStripeOptions);
    var connectElements = connectStripe.elements();
    var context = {
        peachpayStripe: peachpayStripe,
        peachpayElements: peachpayElements,
        connectStripe: connectStripe,
        connectElements: connectElements,
        getPublicKey: function () { return stripeConfig.public_key; },
        getConnectId: function () { return connectAccount.connect_id; },
        createIntent: intentFactory(connectAccount.connect_id)
    };
    var paymentMethods = setupStripeMethods(connectAccount);
    activateStripeMethods(context, paymentMethods, orderService);
    setupStripeButton();
    activateStripePaymentRequest(context, orderService);
}
function cancelStripeIntent(stripeContext, intentId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch("".concat(Environment.apiURL(), "api/v1/stripe/payment-intent/cancel"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session: {
                                    id: PeachPayOrder.sessionId(),
                                    merchant_url: MerchantConfiguration.hostName()
                                },
                                transaction: {
                                    stripe: {
                                        connect_id: stripeContext.getConnectId(),
                                        payment_intent_id: intentId,
                                        cancellation_reason: 'requested_by_customer'
                                    }
                                }
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    data = _a.sent();
                    return [2, data.success];
                case 3:
                    error_10 = _a.sent();
                    captureSentryException(new Error('Failed to cancel stripe payment intent :: ' + error_10));
                    return [2, false];
                case 4: return [2];
            }
        });
    });
}
function initStripeACHDebitMethod() {
    var _this = this;
    return {
        config: {
            name: getLocaleText('US bank account'),
            description: "<p style=\"margin: 0;\">".concat(getLocaleText('After selecting <b>Pay</b> a prompt will appear to select a bank account.'), "</p><hr><p class=\"muted\" style=\"margin: 0;\">").concat(getLocaleText('Note: Payments may take up to 5 days to complete.'), "</p>"),
            showName: true,
            slug: 'us_bank_account',
            gateway: 'peachpay_stripe',
            reusable: true,
            assets: {
                title: {
                    src: 'img/marks/bank.svg'
                },
                badge: {
                    src: 'img/marks/bank.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'us_bank_account_ach_payments', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.STRIPE, 'us_bank_account_ach_payments', 'max'),
                currencies: [
                    'USD'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'US'
                ]
            }
        },
        createPaymentMethod: function () {
            var method = {
                'id': '',
                'type': 'us_bank_account'
            };
            return method;
        },
        confirm: function (context, transaction, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, params, _a, collectError, collectIntent, message, message1, mandateResponse, message2, _b, confirmError, confirmIntent, message3, message4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stripe = getStripeInstance(context, false)[0];
                        params = {
                            'payment_method_type': 'us_bank_account',
                            'payment_method_data': {
                                'billing_details': {
                                    'email': PeachPayCustomer.billing.email(),
                                    'name': PeachPayCustomer.billing.firstName() + ' ' + PeachPayCustomer.billing.lastName()
                                }
                            }
                        };
                        return [4, stripe.collectBankAccountForPayment({
                                clientSecret: clientSecret,
                                params: params
                            })];
                    case 1:
                        _a = _c.sent(), collectError = _a.error, collectIntent = _a.paymentIntent;
                        if (!(collectError || !collectIntent)) return [3, 3];
                        message = retrieveStripeErrorForCustomer(collectError);
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'creationfailed',
                                note: message
                            }))];
                    case 2:
                        _c.sent();
                        store.dispatch(stopModalLoading());
                        displayCustomerError(message);
                        return [2, [
                                false
                            ]];
                    case 3:
                        if (!(collectIntent.status !== 'requires_confirmation')) return [3, 6];
                        message1 = getLocaleText('The customer canceled choosing a bank account.');
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                note: message1
                            }))];
                    case 4:
                        _c.sent();
                        return [4, cancelStripeIntent(context, collectIntent.id)];
                    case 5:
                        _c.sent();
                        store.dispatch(stopModalLoading());
                        return [2, [
                                false
                            ]];
                    case 6: return [4, displayMandate({
                            fullName: PeachPayCustomer.billing.fullName(),
                            clientName: MerchantConfiguration.name()
                        })];
                    case 7:
                        mandateResponse = _c.sent();
                        if (!!mandateResponse) return [3, 10];
                        message2 = getLocaleText('The required mandate was not accepted. Payment canceled.');
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                note: message2
                            }))];
                    case 8:
                        _c.sent();
                        return [4, cancelStripeIntent(context, collectIntent.id)];
                    case 9:
                        _c.sent();
                        store.dispatch(stopModalLoading());
                        return [2, [
                                false
                            ]];
                    case 10: return [4, stripe.confirmUsBankAccountPayment(collectIntent.client_secret)];
                    case 11:
                        _b = _c.sent(), confirmError = _b.error, confirmIntent = _b.paymentIntent;
                        if (!(confirmError || !confirmIntent)) return [3, 13];
                        message3 = retrieveStripeErrorForCustomer(confirmError);
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'failed',
                                note: message3
                            }))];
                    case 12:
                        _c.sent();
                        store.dispatch(stopModalLoading());
                        displayCustomerError(message3);
                        return [2, [
                                false
                            ]];
                    case 13:
                        if (!(confirmIntent.status !== 'processing')) return [3, 17];
                        message4 = retrieveStripeConfirmStatusErrorForCustomer(confirmIntent);
                        return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                note: message4
                            }))];
                    case 14:
                        _c.sent();
                        if (!(confirmIntent.status !== 'requires_payment_method')) return [3, 16];
                        return [4, cancelStripeIntent(context, collectIntent.id)];
                    case 15:
                        _c.sent();
                        _c.label = 16;
                    case 16:
                        store.dispatch(stopModalLoading());
                        displayCustomerError(message4);
                        return [2, [
                                false
                            ]];
                    case 17:
                        if (window.top) {
                            clearLocalSession();
                            window.top.location = options.directURL;
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function setupStripeMethods(account) {
    var paymentMethods = {};
    if (isPaymentMethodActive(account, 'card_payments')) {
        var cardMethod = initStripeCardMethod();
        paymentMethods['card'] = cardMethod;
    }
    if (isPaymentMethodActive(account, 'affirm_payments')) {
        var affirmMethod = initStripeAffirmMethod();
        paymentMethods['affirm'] = affirmMethod;
    }
    if (isPaymentMethodActive(account, 'klarna_payments')) {
        var klarnaMethod = initStripeKlarnaMethod(account);
        paymentMethods['klarna'] = klarnaMethod;
    }
    if (isPaymentMethodActive(account, 'afterpay_clearpay_payments')) {
        var afterpayMethod = initStripeAfterPayMethod();
        paymentMethods['afterpay_clearpay'] = afterpayMethod;
    }
    if (isPaymentMethodActive(account, 'sofort_payments')) {
        var sofortMethod = initStripeSofortMethod();
        paymentMethods['sofort_payments'] = sofortMethod;
    }
    if (isPaymentMethodActive(account, 'us_bank_account_ach_payments')) {
        var achDebit = initStripeACHDebitMethod();
        paymentMethods['us_bank_account'] = achDebit;
    }
    if (isPaymentMethodActive(account, 'eps_payments')) {
        var epsMethod = initStripeEPSMethod();
        paymentMethods['eps'] = epsMethod;
    }
    if (isPaymentMethodActive(account, 'p24_payments')) {
        var p24Method = initStripeP24Method();
        paymentMethods['p24'] = p24Method;
    }
    if (isPaymentMethodActive(account, 'bancontact_payments')) {
        var bancontactMethod = initStripeBancontactMethod();
        paymentMethods['bancontact'] = bancontactMethod;
    }
    if (isPaymentMethodActive(account, 'giropay_payments')) {
        var giropayMethod = initStripeGiropayMethod();
        paymentMethods['giropay'] = giropayMethod;
    }
    if (isPaymentMethodActive(account, 'ideal_payments')) {
        var idealMethod = initStripeIdealMethod();
        paymentMethods['ideal'] = idealMethod;
    }
    var stripeProvider = {
        'methods': {}
    };
    for (var method in paymentMethods) {
        stripeProvider.methods[method] = paymentMethods[method].config;
    }
    store.dispatch(registerPaymentProvider({
        'stripe': stripeProvider
    }));
    return paymentMethods;
}
function isPaymentMethodActive(account, selector) {
    var _a;
    if (!account) {
        return false;
    }
    var hasCapability = Boolean(((_a = account.capabilities) === null || _a === void 0 ? void 0 : _a[selector]) === 'active');
    var enabled = Boolean(Feature.metadata(FeatureFlag.STRIPE, selector));
    return hasCapability && enabled;
}
function activateStripeMethods(context, methods, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var activations, key, method, confirm1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activations = [];
                    for (key in methods) {
                        method = methods[key];
                        if (method.activate) {
                            activations.push(method === null || method === void 0 ? void 0 : method.activate(context));
                        }
                    }
                    return [4, Promise.all(activations)];
                case 1:
                    _a.sent();
                    confirm1 = function (event) {
                        var requiredFieldsVerification = checkRequiredFields();
                        if (!requiredFieldsVerification) {
                            return;
                        }
                        var $target = event.target;
                        var $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
                        if (!$button) {
                            return;
                        }
                        var method = methods[PaymentConfiguration.selectedProviderMethod()];
                        if (!method || PaymentConfiguration.selectedProvider() !== 'stripe') {
                            return;
                        }
                        if (($target === null || $target === void 0 ? void 0 : $target.classList.contains('pp-ocu-close')) || ($target === null || $target === void 0 ? void 0 : $target.classList.contains('pp-ocu-decline-button'))) {
                            closeOCUPage();
                        }
                        if ($target === null || $target === void 0 ? void 0 : $target.classList.contains('pp-ocu-accept-button')) {
                            $target.disabled = true;
                            $target.innerHTML = '<img src="img/spinner.svg" class="ocu-spinner"/> Updating your order ...';
                            window.parent.postMessage({
                                event: 'addLinkedProduct',
                                productID: $target.dataset.ocu_id
                            }, '*');
                            onWindowMessage('pp-update-cart', function () {
                                $target.innerHTML = '<img src="img/check-solid.svg" class="ocu-checkmark"/> Product added successfully!';
                                setTimeout(function () {
                                    closeOCUPage();
                                    existingPaymentMethodFlow(context, method, orderService);
                                }, 3000);
                            });
                        }
                        else {
                            existingPaymentMethodFlow(context, method, orderService);
                        }
                        return;
                    };
                    $qsAll('.stripe-btn', function ($el) { return $el.addEventListener('click', function (event) {
                        var _a;
                        var requiredFieldsVerification = checkRequiredFields();
                        if (Feature.enabled(FeatureFlag.ONE_CLICK_UPSELL) && 'after_payment' === Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'pp_ocu_flow') && requiredFieldsVerification && ((_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-expanded')) === 'false') {
                            displayOCUPage('after_payment');
                            $qsAll('.pp-ocu-close, .pp-ocu-decline-button, .pp-ocu-accept-button', function ($el) { return $el.addEventListener('click', confirm1); });
                        }
                        else {
                            confirm1(event);
                        }
                    }); });
                    return [2];
            }
        });
    });
}
function newPaymentMethodFlow(context, providerMethod, orderService) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var transaction, paymentMethod, orderResponse, stripeIntentResponse, note, note1, savedDetails, successURL, intermediateURL, handlePaymentFlowError, _d, unhandledError, message, _e, unhandledError1, message1;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4, orderService.startTransaction(providerMethod.config.gateway, providerMethod.config.slug)];
                case 1:
                    transaction = _f.sent();
                    return [4, providerMethod.createPaymentMethod(context)];
                case 2:
                    paymentMethod = _f.sent();
                    if (!!paymentMethod) return [3, 4];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'creationfailed',
                            note: 'Creating Stripe payment method failed.'
                        }))];
                case 3:
                    _f.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 4: return [4, orderService.placeOrder(transaction)];
                case 5:
                    orderResponse = _f.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 7];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 6:
                    _f.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 7: return [4, context.createIntent(DefaultCart.total() === 0 ? 'setup' : 'payment', orderResponse, {
                        transactionId: (_a = transaction === null || transaction === void 0 ? void 0 : transaction.getId()) !== null && _a !== void 0 ? _a : '',
                        paymentMethodId: paymentMethod.id,
                        paymentMethodType: PaymentConfiguration.selectedProviderMethod()
                    })];
                case 8:
                    stripeIntentResponse = _f.sent();
                    if (!!stripeIntentResponse.success) return [3, 15];
                    store.dispatch(stopModalLoading());
                    if (!(stripeIntentResponse.message && providerMethod.displayPaymentIntentError)) return [3, 11];
                    note = 'Payment attempt failed. Reason: ' + stripeIntentResponse.message;
                    providerMethod.displayPaymentIntentError(stripeIntentResponse.message);
                    return [4, orderService.addOrderNote(orderResponse, note)];
                case 9:
                    _f.sent();
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'creationfailed',
                            note: note
                        }))];
                case 10:
                    _f.sent();
                    return [3, 14];
                case 11:
                    note1 = 'Sorry, something went wrong. Please refresh the page and try again.';
                    return [4, orderService.addOrderNote(orderResponse, note1)];
                case 12:
                    _f.sent();
                    store.dispatch(setOrderError(getLocaleText(note1)));
                    captureSentryException(new Error("Creating payment intent failed for new payment method flow."), {
                        'payment_method': paymentMethod,
                        'stripe_intent_response': stripeIntentResponse,
                        note: 'Sorry, something went wrong. Please refresh the page and try again.'
                    });
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'creationfailed',
                            note: note1
                        }))];
                case 13:
                    _f.sent();
                    _f.label = 14;
                case 14: return [2];
                case 15:
                    store.dispatch(updateCustomerStripeId(stripeIntentResponse.data.stripe.customer_id));
                    if (providerMethod.saveMethod) {
                        savedDetails = providerMethod.saveMethod(paymentMethod);
                        store.dispatch(addSavedPaymentMethod(savedDetails));
                    }
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: providerMethod.config.reusable ? '0' : ''
                    }));
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    intermediateURL = buildRedirectStateURL(context, successURL, (_c = (_b = window.top) === null || _b === void 0 ? void 0 : _b.location.href) !== null && _c !== void 0 ? _c : '');
                    handlePaymentFlowError = function (confirmFailureMessage, sentryError) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    store.dispatch(stopModalLoading());
                                    store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                            paymentStatus: 'failed',
                                            note: confirmFailureMessage
                                        }))];
                                case 1:
                                    _a.sent();
                                    captureSentryException(sentryError, {
                                        'confirm_failure': confirmFailureMessage,
                                        'payment_method': paymentMethod,
                                        'stripe_intent_response': stripeIntentResponse,
                                        'success_url': successURL,
                                        'intermediate_url': intermediateURL
                                    });
                                    return [2];
                            }
                        });
                    }); };
                    if (!(stripeIntentResponse.data.type === 'setup')) return [3, 21];
                    if (!!providerMethod.setup) return [3, 17];
                    return [4, handlePaymentFlowError(undefined, new Error('providerMethod for stripe SetupIntent does not support SetupIntent.'))];
                case 16:
                    _f.sent();
                    return [2];
                case 17: return [4, providerMethod.setup(context, transaction, stripeIntentResponse.data.stripe.client_secret, {
                        intermediateURL: intermediateURL,
                        directURL: orderResponse.redirect
                    })];
                case 18:
                    _d = _f.sent(), unhandledError = _d[0], message = _d[1];
                    if (!unhandledError) return [3, 20];
                    return [4, handlePaymentFlowError(message, new Error("Confirming setup intent failed for new payment flow."))];
                case 19:
                    _f.sent();
                    _f.label = 20;
                case 20: return [2];
                case 21: return [4, providerMethod.confirm(context, transaction, stripeIntentResponse.data.stripe.client_secret, {
                        intermediateURL: intermediateURL,
                        directURL: orderResponse.redirect
                    })];
                case 22:
                    _e = _f.sent(), unhandledError1 = _e[0], message1 = _e[1];
                    if (!unhandledError1) return [3, 24];
                    return [4, handlePaymentFlowError(message1, new Error("Confirming payment intent failed for new payment flow."))];
                case 23:
                    _f.sent();
                    return [2];
                case 24: return [2];
            }
        });
    });
}
function existingPaymentMethodFlow(context, providerMethod, orderService) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var transaction, savedPaymentMethod, orderResponse, stripeIntentResponse, note, note1, successURL, intermediateURL, handlePaymentFlowError, _d, unhandledError, message, _e, unhandledError1, message1;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    if (!providerMethod.config.reusable || !PaymentConfiguration.selectedProviderMethodIndex()) {
                        return [2, newPaymentMethodFlow(context, providerMethod, orderService)];
                    }
                    return [4, orderService.startTransaction(providerMethod.config.gateway, providerMethod.config.slug)];
                case 1:
                    transaction = _f.sent();
                    savedPaymentMethod = PeachPayCustomer.retrieveSavedPaymentMethod(PaymentConfiguration.selectedProvider(), PaymentConfiguration.selectedProviderMethod(), PaymentConfiguration.selectedProviderMethodIndex())[0];
                    if (!savedPaymentMethod || !savedPaymentMethod.id) {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    return [4, orderService.placeOrder(transaction)];
                case 2:
                    orderResponse = _f.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 4];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 3:
                    _f.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 4: return [4, context.createIntent(DefaultCart.total() === 0 ? 'setup' : 'payment', orderResponse, {
                        transactionId: (_a = transaction === null || transaction === void 0 ? void 0 : transaction.getId()) !== null && _a !== void 0 ? _a : '',
                        paymentMethodId: savedPaymentMethod.id,
                        paymentMethodType: PaymentConfiguration.selectedProviderMethod()
                    })];
                case 5:
                    stripeIntentResponse = _f.sent();
                    if (!!stripeIntentResponse.success) return [3, 12];
                    store.dispatch(stopModalLoading());
                    if (!(stripeIntentResponse.message && providerMethod.displayPaymentIntentError)) return [3, 8];
                    note = 'Payment attempt failed. Reason: ' + stripeIntentResponse.message;
                    return [4, orderService.addOrderNote(orderResponse, note)];
                case 6:
                    _f.sent();
                    providerMethod.displayPaymentIntentError(stripeIntentResponse.message);
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'failed',
                            note: note
                        }))];
                case 7:
                    _f.sent();
                    return [3, 11];
                case 8:
                    note1 = 'Payment attempt failed. Reason: An unknown error occured while creating the Stripe Payment Intent';
                    return [4, orderService.addOrderNote(orderResponse, note1)];
                case 9:
                    _f.sent();
                    store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                    captureSentryException(new Error("Creating Stripe payment intent failed for existing payment flow."), {
                        'saved_method': savedPaymentMethod,
                        'stripe_intent_response': stripeIntentResponse,
                        'note': note1
                    });
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'failed',
                            note: note1
                        }))];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11: return [2];
                case 12:
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: PaymentConfiguration.selectedProviderMethodIndex()
                    }));
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    intermediateURL = buildRedirectStateURL(context, successURL, (_c = (_b = window.top) === null || _b === void 0 ? void 0 : _b.location.href) !== null && _c !== void 0 ? _c : '');
                    handlePaymentFlowError = function (confirmFailureMessage, sentryError) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    store.dispatch(stopModalLoading());
                                    store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                            paymentStatus: 'failed',
                                            note: confirmFailureMessage
                                        }))];
                                case 1:
                                    _a.sent();
                                    captureSentryException(sentryError, {
                                        'confirm_failure': confirmFailureMessage,
                                        'saved_method': savedPaymentMethod,
                                        'stripe_intent_response': stripeIntentResponse,
                                        'success_url': successURL,
                                        'intermediate_url': intermediateURL
                                    });
                                    return [2];
                            }
                        });
                    }); };
                    if (!(stripeIntentResponse.data.type === 'setup')) return [3, 18];
                    if (!!providerMethod.setup) return [3, 14];
                    return [4, handlePaymentFlowError(undefined, new Error('providerMethod for stripe SetupIntent does not support SetupIntent.'))];
                case 13:
                    _f.sent();
                    return [2];
                case 14: return [4, providerMethod.setup(context, transaction, stripeIntentResponse.data.stripe.client_secret, {
                        intermediateURL: intermediateURL,
                        directURL: orderResponse.redirect
                    })];
                case 15:
                    _d = _f.sent(), unhandledError = _d[0], message = _d[1];
                    if (!unhandledError) return [3, 17];
                    return [4, handlePaymentFlowError(message, new Error("Confirming setup intent failed for existing payment flow."))];
                case 16:
                    _f.sent();
                    _f.label = 17;
                case 17: return [2];
                case 18: return [4, providerMethod.confirm(context, transaction, stripeIntentResponse.data.stripe.client_secret, {
                        intermediateURL: intermediateURL,
                        directURL: orderResponse.redirect
                    })];
                case 19:
                    _e = _f.sent(), unhandledError1 = _e[0], message1 = _e[1];
                    if (!unhandledError1) return [3, 21];
                    return [4, handlePaymentFlowError(message1, new Error("Confirming payment intent failed for existing payment flow."))];
                case 20:
                    _f.sent();
                    return [2];
                case 21: return [2];
            }
        });
    });
}
function buildRedirectStateURL(context, successURL, failureURL) {
    var _a;
    var createState = function () {
        return {
            key: context.getPublicKey(),
            sessionId: PeachPayOrder.sessionId(),
            intentCancelURL: "".concat(Environment.apiURL(), "api/v1/stripe/payment-intent/cancel"),
            connectId: context.getConnectId(),
            successURL: successURL,
            failureURL: failureURL,
            color: Environment.plugin.buttonColor()
        };
    };
    var state = btoa(JSON.stringify(createState()));
    var url = new URL((_a = Feature.metadata(FeatureFlag.STRIPE, 'redirect_url_base')) !== null && _a !== void 0 ? _a : '');
    var params = new URLSearchParams();
    params.append('state', state);
    url.search = params.toString();
    return url.toString();
}
function buildStripeOptions(connectId, isPeachPayConfig) {
    var _a, _b;
    if (isPeachPayConfig) {
        return {
            locale: (_a = Environment.language()) !== null && _a !== void 0 ? _a : 'auto'
        };
    }
    else {
        return {
            locale: (_b = Environment.language()) !== null && _b !== void 0 ? _b : 'auto',
            stripeAccount: connectId
        };
    }
}
function intentFactory(connectId) {
    return function (type, order, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, fetchHostWindowData("pp-create-stripe-".concat(type, "-intent"), {
                                type: type,
                                session: {
                                    id: PeachPayOrder.sessionId(),
                                    stripe: {
                                        customer_id: PeachPayCustomer.stripeId(),
                                        connect_id: connectId,
                                        payment_method_id: (_a = options.paymentMethodId) !== null && _a !== void 0 ? _a : '',
                                        payment_method_type: options.paymentMethodType
                                    }
                                },
                                transaction: {
                                    id: options.transactionId
                                },
                                order: {
                                    id: order.order_id,
                                    data: order
                                }
                            })];
                    case 1:
                        response = _b.sent();
                        if (!response) {
                            return [2, {
                                    success: false
                                }];
                        }
                        return [2, response];
                    case 2:
                        error_11 = _b.sent();
                        if (error_11 instanceof Error) {
                            captureSentryException(new Error("Failed to create Stripe payment intent"), {
                                'exception': error_11
                            });
                        }
                        return [2, {
                                success: false
                            }];
                    case 3: return [2];
                }
            });
        });
    };
}
function retrieveStripeErrorForCustomer(error) {
    if (!error) {
        return getLocaleText('An unknown error occurred. Please refresh the page and try again.');
    }
    return error.message;
}
function retrieveStripeConfirmStatusErrorForCustomer(intent) {
    if (intent.status === 'verify_with_microdeposits') {
        return getLocaleText('Unable to verify this bank account. Please use a different bank account or choose a new payment method.');
    }
    return getLocaleText("An unexpected error occurred (".concat(intent.status, "). Please refresh the page and try again."));
}
function displayMandate(options) {
    return new Promise(function (res, rej) {
        $qs('body', function ($el) { return $el.insertAdjacentHTML('beforeend', mandateTemplate(options)); });
        var $container = $qs('#ach-mandate-container');
        var $acceptButton = $qs('#ach-button-accept');
        var $cancelButton = $qs('#ach-button-cancel');
        var $xButton = $qs('#ach-button-x');
        if (!$container || !$acceptButton || !$cancelButton || !$xButton) {
            $container === null || $container === void 0 ? void 0 : $container.remove();
            return rej(new Error('Developer error: Mandate was not mounted.'));
        }
        $acceptButton.addEventListener('click', function () {
            $container.remove();
            res(true);
        });
        $cancelButton.addEventListener('click', function () {
            $container.remove();
            res(false);
        });
        $xButton.addEventListener('click', function () {
            $container.remove();
            res(false);
        });
    });
}
function displayCustomerError(error) {
    $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    var $container = $qsAll("div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"us_bank_account\"][data-index=\"\"]");
    $container.forEach(function ($el) {
        $el.insertAdjacentHTML('afterend', "<div class=\"pp-pm-error-text\"><span>".concat(error, "</span></div>"));
    });
    setTimeout(function () {
        $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    }, 5000);
}
function mandateTemplate(options) {
    var date = new Date().toLocaleDateString();
    var template = "\n<div id=\"ach-mandate-container\">\n    <div id=\"ach-mandate-modal\">\n        <div id=\"ach-mandate-header\">\n            <button id=\"ach-button-x\" class=\"txt-btn\" style=\"font-size: 2rem;\">\u00D7</button>\n        </div>\n        <div id=\"ach-mandate-body\">\n            <span>\n                <p>Name: ".concat(options.fullName, "</p>\n                <p>Date: ").concat(date, "</p>\n            </span>\n            <br>\n            <p>\n                <!-- Note this text is only applicable to non recurring orders! -->\n                ").concat(getLocaleText('By clicking <b>Accept</b>, you authorize'), " <span class=\"client\">").concat(options.clientName, "</span> \n                ").concat(getLocaleText('to debit the bank account specified above for any amount owed for charges arising from your use of'), "\n                <span class=\"client\">").concat(options.clientName, "'s</span> ").concat(getLocaleText('services and/or purchase of products from '), "\n                <span class=\"client\">").concat(options.clientName, "</span>, ").concat(getLocaleText('pursuant to'), " <span class=\"client\">").concat(options.clientName, "'s</span> ").concat(getLocaleText('website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to '), "\n                <span class=\"client\">").concat(options.clientName, "</span> ").concat(getLocaleText('with 30 (thirty) days notice.'), "\n            </p>\n            <br>\n            <div style=\"text-align: center;\">\n                <button id=\"ach-button-accept\" class=\"btn\" style=\"padding: 9px; width: 7rem;\">").concat(getLocaleText('Accept'), "</button>\n                <button id=\"ach-button-cancel\" class=\"txt-btn\">").concat(getLocaleText('Cancel'), "</button>\n            </div>\n        </div>\n    </div>\n    <style>\n        #ach-mandate-container{\n            position: fixed;\n            left: 0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            background-color: rgba(0,0,0,0.5);\n            animation-name: fadein;\n            animation-duration: 0.4s;\n        }\n\n        @keyframes fadein{\n            from {\n                background-color: rgba(0,0,0,0);\n            }\n            to {\n                background-color: rgba(0,0,0,0.5);\n            }\n        }\n\n        #ach-mandate-container .client{\n            border: 1px solid #e6e6e6;\n            border-radius: 0.2rem;\n            background-color: #e6e6e6;\n            padding: 0 4px;\n            margin-bottom: 1px;\n            display: inline-block;\n        }\n\n        #ach-mandate-modal{\n            position: absolute;\n            background-color: white;\n            border-radius: 0.4rem;\n            z-index: 10000000000;\n            width: 50vw;\n            box-shadow:  2px 8px 20px 3px rgb(0 0 0 / 20%);\n            margin: 0 calc(49vw / 2);\n            top: 10vh;\n        }\n\n        #ach-mandate-header{\n            padding: 0 0.5rem;\n            text-align: right;\n            border-bottom: 1px solid #e6e6e6;\n        }\n\n        #ach-mandate-body{\n            padding: 1.5rem;\n        }\n\n        #ach-mandate-body p {\n            margin: 0;\n            padding: 0;\n        }\n        \n        #ach-mandate-modal .txt-btn{\n            border: none;\n            background: none;\n            color: grey;\n            font-weight: 400;\n        }\n\n        #ach-mandate-modal .txt-btn:hover{\n            cursor: pointer;\n            color: red;\n        } \n\n        @media screen and (max-width: 768px) {\n\n            \n            #ach-mandate-modal{\n                width: 100%;\n                margin: 0;\n                left: 0;\n                right: 0;\n\n                animation-duration: 0.8s;\n                animation-name: slideup;\n                top: unset;\n                bottom: 0;\n                border-bottom-left-radius: 0;\n                border-bottom-right-radius: 0;\n            }\n\n            @keyframes slideup{\n                from {\n                    bottom: -100%\n                }\n                to {\n                    bottom: 0;\n                }\n            }\n\n        }\n\n        /*This prevents the background from being scrollable*/\n        body{\n            overflow: hidden !important;\n            touch-action: none !important;\n        }\n    </style>\n</div>");
    return template;
}
function setupPayPalButton() {
    store.subscribe(function () {
        renderPayPalButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
        renderPayPalButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
    });
}
function renderPayPalButtonDisplay(provider, loadingMode) {
    var _a, _b, _c, _d, _e, _f;
    if (provider === 'paypal' && loadingMode === 'finished' && PaymentConfiguration.methodSupportsCurrentCurrency('paypal', 'default')) {
        (_a = $qs('#paypal-btn-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#paypal-btn-container-existing')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#paypal-btn-container-mobile')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        $qsAll('.pp-paypal-info').forEach(function (element) {
            element.remove();
        });
    }
    else {
        (_d = $qs('#paypal-btn-container')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        (_e = $qs('#paypal-btn-container-existing')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
        (_f = $qs('#paypal-btn-container-mobile')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
    }
    renderCurrencyWarnings('paypal', 'default');
}
function renderPayPalButtonLoading(provider, loadingMode) {
    if (provider === 'paypal' && loadingMode !== 'finished') {
        $qsAll('.pp-paypal-spinner-container', function ($el) { return $el.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-paypal-spinner-container', function ($el) { return $el.classList.add('hide'); });
    }
}
function changeCurrency() {
    var defaultCurrency = PaymentConfiguration.getMethodDefaultCurrency('paypal', 'default');
    if (defaultCurrency) {
        var event_2 = new CustomEvent('pp-change-currency', {
            detail: defaultCurrency
        });
        self.dispatchEvent(event_2);
    }
}
function renderCurrencyWarnings(provider, method) {
    var defaultCurrency = PaymentConfiguration.getMethodDefaultCurrency(provider, method);
    var supports = PaymentConfiguration.methodSupportsCurrentCurrency(provider, method);
    if (defaultCurrency && PaymentConfiguration.selectedProvider() === provider && !supports) {
        var paymentSupportMessage_1 = "\n<div class=\"pp-currency-warning pp-".concat(provider, "-info hide\">\n\t").concat(getLocaleText('This payment method does not support the selected currency, on clicking this message the currency will switch to'), " ").concat(defaultCurrency, "\n</div>");
        if (!$qs(".pp-".concat(provider, "-info"))) {
            $qsAll('.pay-button-container').forEach(function (element) {
                element.insertAdjacentHTML('afterbegin', paymentSupportMessage_1);
            });
        }
        $qsAll('.pp-currency-warning').forEach(function (element) {
            if (defaultCurrency) {
                element.addEventListener('click', changeCurrency);
            }
        });
        $qsAll(".pp-".concat(provider, "-info")).forEach(function (element) {
            element.classList.remove('hide');
        });
    }
    else if (defaultCurrency === 'none' && PaymentConfiguration.selectedProvider() === provider && !supports) {
        var noPaymentOption_1 = "\n<div class=\" pp-currency-disabled pp-".concat(provider, "-info hide\">\n\t").concat(getLocaleText('This payment method does not support the selected currency. Please switch currencies.'), "\n</div>");
        if (!$qs(".pp-".concat(provider, "-info"))) {
            $qsAll('.pay-button-container').forEach(function (element) {
                element.insertAdjacentHTML('afterbegin', noPaymentOption_1);
            });
        }
        $qsAll(".pp-".concat(provider, "-info")).forEach(function (element) {
            element.classList.remove('hide');
        });
    }
    else {
        $qsAll(".pp-".concat(provider, "-info")).forEach(function (element) {
            element.classList.add('hide');
        });
    }
}
function initPayPalDefaultMethod() {
    return {
        config: {
            name: 'PayPal',
            slug: 'default',
            gateway: 'peachpay_paypal',
            description: getLocaleText('After selecting pay, a window will appear where you can complete your payment.'),
            reusable: false,
            assets: {
                title: {
                    src: 'img/marks/paypal.svg'
                },
                badge: {
                    src: 'img/marks/paypal.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.PAYPAL, 'paypal', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.PAYPAL, 'paypal', 'max'),
                currencies: [
                    'AUD',
                    'CAD',
                    'CZK',
                    'DKK',
                    'EUR',
                    'HKD',
                    'HUF',
                    'ILS',
                    'MXN',
                    'TWD',
                    'NZD',
                    'NOK',
                    'PHP',
                    'PLN',
                    'GBP',
                    'RUB',
                    'SGD',
                    'SEK',
                    'CHF',
                    'TBH',
                    'USD',
                    'JPY',
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'ALL'
                ],
                defaultCurrency: getDefaultCurrency()
            }
        }
    };
}
function getDefaultCurrency() {
    var _a;
    var defaultCurrency = (_a = Feature.metadata(FeatureFlag.PAYPAL, 'default_currency')) !== null && _a !== void 0 ? _a : null;
    return defaultCurrency === 'none' || !defaultCurrency ? null : defaultCurrency;
}
var paypalMerchantID = null;
var BN_CODE_SANDBOX = 'FLAVORsb-6jopv6540275_MP';
var BN_CODE_PRODUCTION = 'Peach_SP_PPCP';
paypalLoadScripts.loaded = new Set();
var transaction = null;
function initPayPalPaymentProvider(orderService, pluginCapabilities) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.PAYPAL) || !(pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.paypal.connected)) {
        return;
    }
    setupPayPalMethods();
    setupPayPalButton();
    var previousInitilizedCode = '';
    var previousCurrencyCode = '';
    store.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
        var currentCurrencyCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentCurrencyCode = MerchantConfiguration.currency.code();
                    if (previousCurrencyCode === currentCurrencyCode) {
                        return [2];
                    }
                    previousCurrencyCode = currentCurrencyCode;
                    if (!(PaymentConfiguration.eligibleMethod('paypal', 'default') && previousInitilizedCode !== currentCurrencyCode && PaymentConfiguration.methodSupportsCurrentCurrency('paypal', 'default'))) return [3, 2];
                    previousInitilizedCode = currentCurrencyCode;
                    return [4, loadPayPalScript()];
                case 1:
                    if (_a.sent()) {
                        initPayPalPaymentFlow(orderService);
                    }
                    _a.label = 2;
                case 2: return [2];
            }
        });
    }); });
}
function setupPayPalMethods() {
    var paymentMethods = {};
    var defaultMethod = initPayPalDefaultMethod();
    paymentMethods['default'] = defaultMethod;
    var paypalProvider = {
        'methods': {}
    };
    for (var method in paymentMethods) {
        paypalProvider.methods[method] = paymentMethods[method].config;
    }
    store.dispatch(registerPaymentProvider({
        'paypal': paypalProvider
    }));
    return paymentMethods;
}
function paypalLoadScripts(scriptURLs) {
    return __awaiter(this, void 0, void 0, function () {
        var load, promises, _i, scriptURLs_1, scriptURL, _a, scriptURLs_2, scriptURL1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    load = function (scriptURL) {
                        return new Promise(function (resolve, _) {
                            if (paypalLoadScripts.loaded.has(scriptURL)) {
                                resolve();
                            }
                            else {
                                var script = document.createElement('script');
                                script.addEventListener('load', resolve);
                                script.src = scriptURL;
                                script.dataset.dataPartnerAttributionId = isDevEnvironment(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode())) ? BN_CODE_SANDBOX : BN_CODE_PRODUCTION;
                                document.head.append(script);
                            }
                        });
                    };
                    promises = [];
                    for (_i = 0, scriptURLs_1 = scriptURLs; _i < scriptURLs_1.length; _i++) {
                        scriptURL = scriptURLs_1[_i];
                        promises.push(load(scriptURL));
                    }
                    return [4, Promise.all(promises)];
                case 1:
                    _b.sent();
                    paypalLoadScripts.loaded = new Set();
                    for (_a = 0, scriptURLs_2 = scriptURLs; _a < scriptURLs_2.length; _a++) {
                        scriptURL1 = scriptURLs_2[_a];
                        paypalLoadScripts.loaded.add(scriptURL1);
                    }
                    return [2];
            }
        });
    });
}
function loadPayPalScript() {
    return __awaiter(this, void 0, void 0, function () {
        var response, merchant, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + "api/v1/paypal/merchantAndClient?merchantHostname=".concat(MerchantConfiguration.hostName()), {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    merchant = _a.sent();
                    paypalMerchantID = merchant.paypalMerchantID;
                    return [4, paypalLoadScripts([
                            "https://www.paypal.com/sdk/js?&client-id=".concat(merchant.clientID, "&merchant-id=").concat(merchant.paypalMerchantID, "&disable-funding=paylater,card,bancontact,blik,eps,giropay,ideal,mybank,p24,sofort,mercadopago,sepa,venmo&currency=").concat(MerchantConfiguration.currency.code()),
                        ])];
                case 3:
                    _a.sent();
                    return [3, 5];
                case 4:
                    error_12 = _a.sent();
                    if (error_12 instanceof Error) {
                        captureSentryException(error_12);
                    }
                    return [2, false];
                case 5: return [2, true];
            }
        });
    });
}
function initPayPalPaymentFlow(orderService) {
    var $paypalButton = paypal.Buttons({
        style: {
            height: 55
        },
        onClick: function () {
            return __awaiter(this, void 0, void 0, function () {
                var fieldsValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fieldsValid = checkRequiredFields();
                            if (!fieldsValid) {
                                return [2, false];
                            }
                            openPayPalSentrySpan();
                            return [4, orderService.startTransaction('peachpay_paypal', 'default')];
                        case 1:
                            transaction = _a.sent();
                            return [2, true];
                    }
                });
            });
        },
        createOrder: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, createPayPalOrder()];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        },
        onApprove: function (data, actions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            store.dispatch(startModalProcessing());
                            return [4, handlePayPalApprove(data, actions, orderService)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        },
        onCancel: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'canceled',
                                note: 'Customer canceled payment by closing PayPal.'
                            }))];
                        case 1:
                            _a.sent();
                            transaction = null;
                            return [2];
                    }
                });
            });
        },
        onError: function (error) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                                paymentStatus: 'failed',
                                note: 'PayPal payment failed with error: ' + JSON.stringify(error)
                            }))];
                        case 1:
                            _a.sent();
                            transaction = null;
                            return [2];
                    }
                });
            });
        }
    });
    $paypalButton.render('#paypal-btn-container');
    $paypalButton.render('#paypal-btn-container-mobile');
    $paypalButton.render('#paypal-btn-container-existing');
}
function createPayPalOrder() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var toFixed, mockOrderResult, _c, validOrder, error, body, response, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    toFixed = MerchantConfiguration.currency.configuration().number_of_decimals;
                    mockOrderResult = {
                        'domain': MerchantConfiguration.hostName(),
                        'merchant_name': MerchantConfiguration.name(),
                        'details': {
                            'id': '',
                            'number': '',
                            'currency': MerchantConfiguration.currency.code(),
                            'discount_total': DefaultCart.totalAppliedCoupons().toFixed(toFixed),
                            'shipping_total': DefaultCart.totalShipping().toFixed(toFixed),
                            'total': DefaultCart.total().toFixed(toFixed),
                            'total_tax': ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_prices_include_tax) ? '0' : DefaultCart.totalTax().toFixed(toFixed),
                            'shipping': paypalCustomerAddress(),
                            'line_items': getLineItems(),
                            'shipping_lines': getShippingLines(),
                            'fee_total': DefaultCart.totalAppliedFees().toFixed(toFixed)
                        },
                        'currency_meta': {
                            'currency_decimals': MerchantConfiguration.currency.configuration().number_of_decimals
                        }
                    };
                    _c = validateOrder(mockOrderResult), validOrder = _c[0], error = _c[1];
                    if (!validOrder) {
                        transaction === null || transaction === void 0 ? void 0 : transaction.update({
                            paymentStatus: 'creationfailed',
                            note: "PayPal order creation failed: ".concat(error)
                        });
                        captureSentryException(new Error("".concat(error)));
                        store.dispatch(stopModalLoading());
                        return [2, 0];
                    }
                    body = {
                        statusCallbackUrl: (_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.wp_site_url,
                        orderResult: mockOrderResult,
                        sessionID: PeachPayOrder.sessionId(),
                        paypalMerchantID: paypalMerchantID
                    };
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/paypal/order', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        })];
                case 1:
                    response = _d.sent();
                    return [4, response.json()];
                case 2:
                    result = _d.sent();
                    return [2, result.id];
            }
        });
    });
}
function paypalCustomerAddress() {
    var _a = PeachPayCustomer.shipping, firstName = _a.firstName, lastName = _a.lastName, address1 = _a.address1, address2 = _a.address2, city = _a.city, state = _a.state, postal = _a.postal, country = _a.country, phone = _a.phone, email = _a.email;
    return {
        first_name: firstName(),
        last_name: lastName(),
        company: '',
        address_1: address1(),
        address_2: address2(),
        city: city(),
        state: state(),
        postcode: postal(),
        country: country(),
        phone: phone(),
        email: email()
    };
}
function getLineItems() {
    var _a, _b;
    var items = [];
    for (var _i = 0, _c = DefaultCart.contents(); _i < _c.length; _i++) {
        var item = _c[_i];
        var lineItem = {
            'id': item.product_id,
            'name': item.name_with_variation || item.name + (item.variation_title ? " - ".concat(item.variation_title) : ''),
            'quantity': String(item.quantity),
            'subtotal': String(Number.parseFloat(item.total) * Number.parseInt(item.quantity)),
            'subtotal_tax': '0'
        };
        if (((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_prices_include_tax) && item.display_price) {
            lineItem.subtotal = String(Number.parseFloat(item.display_price) * Number.parseInt(item.quantity));
        }
        items.push(lineItem);
    }
    if (!((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.wc_prices_include_tax)) {
        items[0].subtotal_tax = String(DefaultCart.totalTax());
    }
    return items;
}
function getShippingLines() {
    return {
        0: (function () {
            var _a, _b;
            var shippingDetails = DefaultCart.selectedShippingMethodDetails('0');
            if (!shippingDetails) {
                return undefined;
            }
            return {
                method_id: shippingDetails.selected_method,
                total: String(DefaultCart.totalShipping()),
                method_title: (_b = (_a = shippingDetails.methods[shippingDetails.selected_method]) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'Undefined'
            };
        })()
    };
}
function handlePayPalApprove(data, actions, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var orderResponse, error_13, capture, transactionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, orderService.placeOrder(transaction)];
                case 1:
                    orderResponse = _a.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 3];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 2:
                    _a.sent();
                    transaction = null;
                    store.dispatch(stopModalLoading());
                    actions.restart();
                    return [2];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4, updatePayPalOrderWithFinalAmount(data.orderID, orderResponse)];
                case 4:
                    _a.sent();
                    return [3, 6];
                case 5:
                    error_13 = _a.sent();
                    captureSentryException(new Error('Error while updating PayPal order with final amount'), {
                        exception: error_13
                    });
                    return [3, 6];
                case 6: return [4, capturePayPalOrder(data.orderID)];
                case 7:
                    capture = _a.sent();
                    if (!!capture) return [3, 10];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'failed',
                            note: 'Capturing PayPal order failed.'
                        }))];
                case 8:
                    _a.sent();
                    transaction = null;
                    return [4, orderService.addOrderNote(orderResponse, 'PayPal payment attempt failed. Reason: An unknown error occured while capturing the payment.')];
                case 9:
                    _a.sent();
                    store.dispatch(setOrderError('Something went wrong'));
                    actions.restart();
                    return [2];
                case 10:
                    if (!((capture === null || capture === void 0 ? void 0 : capture.status) === 'COMPLETED')) return [3, 14];
                    transactionId = capture.purchase_units[0].payments.captures[0].id;
                    transaction === null || transaction === void 0 ? void 0 : transaction.update({
                        paymentStatus: 'success'
                    });
                    return [4, orderService.setOrderStatus(orderResponse, transaction, {
                            orderStatus: 'success',
                            paypal: {
                                transaction_id: transactionId
                            }
                        })];
                case 11:
                    _a.sent();
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: 'paypal',
                        method: 'default'
                    }));
                    saveCustomerToBrowser();
                    clearLocalSession();
                    if (!window.top) return [3, 13];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 12:
                    _a.sent();
                    transaction = null;
                    window.top.location = orderService.getOrderRedirect(orderResponse);
                    _a.label = 13;
                case 13: return [2];
                case 14:
                    transaction === null || transaction === void 0 ? void 0 : transaction.update({
                        paymentStatus: 'failed'
                    });
                    if (!((capture === null || capture === void 0 ? void 0 : capture.details[0].issue) === 'INSTRUMENT_DECLINED')) return [3, 16];
                    return [4, orderService.setOrderStatus(orderResponse, transaction, {
                            orderStatus: 'failed',
                            paymentStatus: 'failed',
                            note: capture.details[0].description
                        })];
                case 15:
                    _a.sent();
                    store.dispatch(setOrderError(capture.details[0].description));
                    return [3, 18];
                case 16: return [4, orderService.setOrderStatus(orderResponse, transaction, {
                        paymentStatus: 'failed',
                        orderStatus: 'failed',
                        note: 'Something went wrong'
                    })];
                case 17:
                    _a.sent();
                    store.dispatch(setOrderError('Something went wrong'));
                    _a.label = 18;
                case 18:
                    store.dispatch(stopModalLoading());
                    actions.restart();
                    return [2];
            }
        });
    });
}
function capturePayPalOrder(orderID) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/paypal/capture', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderID: orderID,
                                sessionID: PeachPayOrder.sessionId(),
                                paypalMerchantID: paypalMerchantID
                            })
                        })];
                case 1:
                    response = _a.sent();
                    return [2, response.json()];
                case 2:
                    error_14 = _a.sent();
                    captureSentryException(new Error('Error while capturing PayPal order'), {
                        exception: error_14
                    });
                    return [2, null];
                case 3: return [2];
            }
        });
    });
}
function updatePayPalOrderWithFinalAmount(paypalOrderID, orderResult) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/paypal/order/update', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionID: PeachPayOrder.sessionId(),
                            paypalMerchantID: paypalMerchantID,
                            paypalOrderID: paypalOrderID,
                            orderResult: orderResult
                        })
                    })];
                case 1:
                    response = _a.sent();
                    return [2, response.json()];
            }
        });
    });
}
function validateOrder(order) {
    if (order.details.line_items.length == 0) {
        return [
            false,
            'Unable to process order because the cart is empty.'
        ];
    }
    if (Number.parseFloat(order.details.total) <= 0) {
        return [
            false,
            'Unable to process order because PayPal cannot process orders with negative or zero totals.'
        ];
    }
    return [
        true,
        null
    ];
}
function setupAmazonPayButton() {
    store.subscribe(function () {
        renderAmazonPayButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode(), Carts.total(), Carts.subscriptionPresent());
    });
}
function renderAmazonPayButtonDisplay(provider, loadingMode, allCartsTotal, hasSubscription) {
    var _a, _b, _c, _d, _e, _f, _g;
    (_a = $qs('.pp-pm-type[data-method="amazon-pay"]')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    if (provider === 'amazonpay' && loadingMode === 'finished' && !hasSubscription && allCartsTotal > 0) {
        (_b = $qs('#amazon-pay-btn-container')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#amazon-pay-btn-container-existing')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        (_d = $qs('#amazon-pay-btn-container-mobile')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
    }
    else {
        (_e = $qs('#amazon-pay-btn-container')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
        (_f = $qs('#amazon-pay-btn-container-existing')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        (_g = $qs('#amazon-pay-btn-container-mobile')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
    }
}
function amazonCustomerAddress() {
    var _a = PeachPayCustomer.shipping, firstName = _a.firstName, lastName = _a.lastName, address1 = _a.address1, address2 = _a.address2, city = _a.city, state = _a.state, postal = _a.postal, country = _a.country, phone = _a.phone;
    var additionalData = address2().length == 0 ? {} : {
        'addressLine1': address2()
    };
    return __assign({ 'name': firstName() + ' ' + lastName(), 'addressLine1': address1(), 'city': city(), 'stateOrRegion': state(), 'postalCode': postal(), 'countryCode': country(), 'phoneNumber': phone() }, additionalData);
}
function getAmazonPayCheckoutScript(country) {
    switch (country) {
        case 'US':
            return 'https://static-na.payments-amazon.com/checkout.js';
        case 'JP':
            return 'https://static-fe.payments-amazon.com/checkout.js';
        case 'GB':
        case 'DK':
        case 'FR':
        case 'DE':
        case 'HU':
        case 'IT':
        case 'LU':
        case 'AW':
        case 'PT':
        case 'ES':
        case 'SE':
            return 'https://static-eu.payments-amazon.com/checkout.js';
        default:
            return undefined;
    }
}
function createPopupWindow(url, windowName, win, w, h) {
    if (win !== null && win.top !== null) {
        var y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
        var x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
        return win.open(url, windowName, "toolbar=no, location=no, directories=no, status=yes, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=".concat(w, ", height=").concat(h, ", top=").concat(y, ", left=").concat(x));
    }
    else {
        return null;
    }
}
function generateAmazonPaySignature(payload, sandbox) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/amazonpay/signature', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            session: {
                                id: PeachPayOrder.sessionId(),
                                merchant_id: MerchantConfiguration.id(),
                                merchant_url: MerchantConfiguration.hostName(),
                                merchant_name: MerchantConfiguration.name(),
                                plugin_version: Environment.plugin.version(),
                                platform: 'woocommerce'
                            },
                            transaction: {
                                amazonpay: {
                                    payload: payload,
                                    sandbox: sandbox
                                }
                            }
                        })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        return [2];
                    }
                    return [4, response.json()];
                case 2:
                    result = _a.sent();
                    return [2, result.signature];
            }
        });
    });
}
function AmazonPaySession(returnURL) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var publicKeyId, storeId, merchantId, sandbox, toFixed, addressDetails, payload, signature;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    publicKeyId = (_a = Feature.metadata(FeatureFlag.AMAZON, 'public_key_id')) !== null && _a !== void 0 ? _a : '';
                    storeId = (_b = Feature.metadata(FeatureFlag.AMAZON, 'store_id')) !== null && _b !== void 0 ? _b : '';
                    merchantId = (_c = Feature.metadata(FeatureFlag.AMAZON, 'merchant_id')) !== null && _c !== void 0 ? _c : '';
                    sandbox = Environment.isTestOrDevSite();
                    toFixed = MerchantConfiguration.currency.configuration().number_of_decimals;
                    addressDetails = Carts.virtual() ? {} : {
                        'addressDetails': amazonCustomerAddress()
                    };
                    payload = __assign({ 'webCheckoutDetails': {
                            'checkoutResultReturnUrl': returnURL,
                            'checkoutMode': 'ProcessOrder'
                        }, 'storeId': storeId, 'scopes': [
                            'name',
                            'email',
                            'phoneNumber',
                            'billingAddress'
                        ], 'paymentDetails': {
                            'paymentIntent': 'AuthorizeWithCapture',
                            'chargeAmount': {
                                'amount': DefaultCart.total().toFixed(toFixed),
                                'currencyCode': MerchantConfiguration.currency.code()
                            },
                            'presentmentCurrency': MerchantConfiguration.currency.code()
                        } }, addressDetails);
                    return [4, generateAmazonPaySignature(payload, sandbox)];
                case 1:
                    signature = _d.sent();
                    return [2, {
                            publicKeyId: publicKeyId,
                            storeId: storeId,
                            merchantId: merchantId,
                            sandbox: sandbox,
                            addressDetails: addressDetails,
                            payload: payload,
                            signature: signature
                        }];
            }
        });
    });
}
function initAmazonPayPaymentProvider(orderService) {
    if (!Feature.enabled(FeatureFlag.AMAZON)) {
        return;
    }
    setupAmazonPayMethod();
    setupAmazonPayButton();
    var previousMethod = '';
    var previousPage = Environment.modalUI.page();
    store.subscribe(function () {
        if (DefaultCart.total() === 0) {
            return;
        }
        if (PaymentConfiguration.selectedPaymentMethod() === 'amazonpay:amazonpay' && previousMethod !== 'amazonpay:amazonpay' || PaymentConfiguration.selectedPaymentMethod() === 'amazonpay:amazonpay' && Environment.modalUI.page() === 'payment' && previousPage !== 'payment') {
            previousMethod = 'amazonpay:amazonpay';
            previousPage = 'payment';
            initAmazonPayPaymentFlow(orderService);
        }
        if (PaymentConfiguration.selectedPaymentMethod() !== previousMethod) {
            previousMethod = PaymentConfiguration.selectedPaymentMethod();
        }
        if (Environment.modalUI.page() !== previousPage) {
            previousPage = Environment.modalUI.page();
        }
    });
}
function initAmazonPayMethod() {
    return {
        config: {
            name: 'Amazon Pay',
            slug: 'amazonpay',
            gateway: 'peachpay_amazonpay',
            description: 'Please click the Amazon Pay button to complete your checkout.',
            reusable: false,
            showName: false,
            assets: {
                title: {
                    src: 'img/marks/amazon-pay-card.svg'
                },
                badge: {
                    src: 'img/marks/amazon-pay-card.svg'
                }
            },
            supports: {
                minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.AMAZON, 'amazonpay', 'min'),
                maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.AMAZON, 'amazonpay', 'max'),
                currencies: [
                    'AUD',
                    'GBP',
                    'DKK',
                    'EUR',
                    'HKD',
                    'JPY',
                    'NZD',
                    'NOK',
                    'ZAR',
                    'SEK',
                    'CHF',
                    'USD',
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                customerCountries: [
                    'US',
                    'UK',
                    'DK',
                    'FR',
                    'DE',
                    'HU',
                    'IT',
                    'JP',
                    'LU',
                    'AW',
                    'PT',
                    'ES',
                    'SE'
                ]
            }
        }
    };
}
function setupAmazonPayMethod() {
    var paymentMethods = {};
    var amazonPay = initAmazonPayMethod();
    paymentMethods['amazonpay'] = amazonPay;
    var amazonPayProvider = {
        'methods': {}
    };
    for (var method in paymentMethods) {
        amazonPayProvider.methods[method] = paymentMethods[method].config;
    }
    store.dispatch(registerPaymentProvider({
        'amazonpay': amazonPayProvider
    }));
    return paymentMethods;
}
function initAmazonPayPaymentFlow(orderService) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var returnURL, amazonSession;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    $qsAll('.pp-amazon-pay-btn-container', function ($el) {
                        var elId = $el.id;
                        var $parentEl = $el.parentElement;
                        $parentEl === null || $parentEl === void 0 ? void 0 : $parentEl.replaceChildren();
                        if ($parentEl !== null)
                            $parentEl.innerHTML = '';
                        var htmlString = "<div id=\"".concat(elId, "\" class=\"\"></div>");
                        $parentEl === null || $parentEl === void 0 ? void 0 : $parentEl.insertAdjacentHTML('beforeend', htmlString);
                    });
                    (_a = $qs('#amazon-pay-btn-container')) === null || _a === void 0 ? void 0 : _a.classList.add('pp-amazon-pay-btn-container');
                    (_b = $qs('#amazon-pay-btn-container-mobile')) === null || _b === void 0 ? void 0 : _b.classList.add('pp-amazon-pay-btn-container');
                    (_c = $qs('#amazon-pay-btn-container-existing')) === null || _c === void 0 ? void 0 : _c.classList.add('pp-amazon-pay-btn-container');
                    returnURL = 'https://' + MerchantConfiguration.hostName() + "/wp-content/plugins/peachpay-for-woocommerce/public/dist/".concat(Environment.plugin.version(), "/checkout-modal/amazon-checkout.html");
                    return [4, AmazonPaySession(returnURL)];
                case 1:
                    amazonSession = _d.sent();
                    [
                        '#amazon-pay-btn-container',
                        '#amazon-pay-btn-container-mobile',
                        '#amazon-pay-btn-container-existing'
                    ].forEach(function (elementID) {
                        var amazonPayButton = amazon.Pay.renderButton(elementID, {
                            merchantId: amazonSession.merchantId,
                            publicKeyId: amazonSession.publicKeyId,
                            ledgerCurrency: MerchantConfiguration.currency.code(),
                            checkoutLanguage: 'en_US',
                            productType: Carts.virtual() ? 'PayOnly' : 'PayAndShip',
                            placement: 'Cart',
                            buttonColor: 'Gold',
                            sandbox: amazonSession.sandbox
                        });
                        amazonPayButton.onClick(function () {
                            var _a;
                            (_a = $qs('body')) === null || _a === void 0 ? void 0 : _a.classList.add('pp-disabled');
                            var popupURL = 'https://' + MerchantConfiguration.hostName() + "/wp-content/plugins/peachpay-for-woocommerce/public/dist/".concat(Environment.plugin.version(), "/checkout-modal/amazon-checkout.html");
                            openAmazonPayPopup(amazonSession, popupURL, orderService);
                        });
                    });
                    return [2];
            }
        });
    });
}
function openAmazonPayPopup(amazonSession, popupURL, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var toFixed, popupWindow, closedCheck, transaction_1, orderResponse_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toFixed = MerchantConfiguration.currency.configuration().number_of_decimals;
                    popupWindow = createPopupWindow(popupURL, 'amazonPayPopup', window, 550, 515);
                    closedCheck = setInterval(function () {
                        var _a;
                        if (popupWindow === null || popupWindow === void 0 ? void 0 : popupWindow.closed) {
                            clearInterval(closedCheck);
                            (_a = $qs('body')) === null || _a === void 0 ? void 0 : _a.classList.remove('pp-disabled');
                        }
                    }, 1000);
                    if (!(popupWindow !== null)) return [3, 3];
                    popupWindow.addEventListener('DOMContentLoaded', function () {
                        popupWindow.postMessage({
                            event: 'pp-init-amazon-button',
                            amazonData: {
                                buttonData: {
                                    merchantId: amazonSession.merchantId,
                                    publicKeyId: amazonSession.publicKeyId,
                                    ledgerCurrency: MerchantConfiguration.currency.code(),
                                    checkoutLanguage: Environment.language().replace('-', '_'),
                                    productType: Carts.virtual() ? 'PayOnly' : 'PayAndShip',
                                    placement: 'Cart',
                                    buttonColor: 'Gold',
                                    sandbox: amazonSession.sandbox
                                },
                                initCheckoutData: {
                                    createCheckoutSessionConfig: {
                                        payloadJSON: JSON.stringify(amazonSession.payload),
                                        signature: amazonSession.signature,
                                        publicKeyId: amazonSession.publicKeyId
                                    }
                                },
                                scriptLink: getAmazonPayCheckoutScript(PeachPayCustomer.billing.country())
                            }
                        }, '*');
                    });
                    return [4, orderService.startTransaction('peachpay_amazonpay', 'default')];
                case 1:
                    transaction_1 = _a.sent();
                    return [4, orderService.placeOrder(transaction_1)];
                case 2:
                    orderResponse_1 = _a.sent();
                    if (!transaction_1 || orderResponse_1.result !== 'success') {
                        return [2];
                    }
                    onWindowDataFetch('pp-amazon-popup-closed', function () {
                        var _a;
                        (_a = $qs('body')) === null || _a === void 0 ? void 0 : _a.classList.remove('pp-disabled');
                    });
                    onWindowMessage('pp-amazon-checkout-failed', function (winMessage) {
                        store.dispatch(stopModalLoading());
                        window.alert("Amazon Pay was unable to proceed with checkout due to the following:\n".concat(winMessage.message));
                        captureSentryException(new Error(winMessage.message), {
                            amazonpay_session: amazonSession
                        });
                    });
                    onWindowMessage('pp-amazon-checkout-complete', function (message) { return __awaiter(_this, void 0, void 0, function () {
                        var checkoutSessionId, request, response, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    checkoutSessionId = message.sessionId;
                                    popupWindow.postMessage({
                                        event: 'pp-amazon-received-session-id'
                                    }, '*');
                                    request = {
                                        session: {
                                            id: PeachPayOrder.sessionId(),
                                            merchant_id: MerchantConfiguration.id(),
                                            merchant_url: MerchantConfiguration.hostName(),
                                            merchant_name: MerchantConfiguration.name(),
                                            plugin_version: Environment.plugin.version(),
                                            platform: 'woocommerce'
                                        },
                                        transaction: {
                                            amazonpay: {
                                                payload: {
                                                    chargeAmount: {
                                                        amount: DefaultCart.total().toFixed(toFixed),
                                                        currencyCode: MerchantConfiguration.currency.code()
                                                    }
                                                },
                                                session_id: checkoutSessionId,
                                                sandbox: amazonSession.sandbox
                                            }
                                        },
                                        order: {
                                            id: orderResponse_1.order_id,
                                            amount: DefaultCart.total().toFixed(toFixed),
                                            currency: MerchantConfiguration.currency.code(),
                                            data: orderResponse_1
                                        }
                                    };
                                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/amazonpay/checkout', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(request)
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) {
                                        captureSentryException(new Error('Call to PeachPay API /amazonpay/checkout failed'), {
                                            amazonpay_session: amazonSession,
                                            request: request,
                                            response: response
                                        });
                                        return [2];
                                    }
                                    return [4, response.json()];
                                case 2:
                                    result = _a.sent();
                                    store.dispatch(startModalProcessing());
                                    return [4, handleAmazonCompletion(result, checkoutSessionId, orderService, transaction_1, orderResponse_1)];
                                case 3:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
}
function handleAmazonCompletion(result, checkoutSessionId, orderService, transaction, order) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(result.data.statusDetails.state !== 'Completed')) return [3, 1];
                    store.dispatch(stopModalLoading());
                    return [2];
                case 1: return [4, orderService.setOrderStatus(order, transaction, {
                        amazonpay: {
                            session_id: checkoutSessionId
                        },
                        paymentStatus: 'success',
                        orderStatus: 'success'
                    })];
                case 2:
                    _a.sent();
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: 'amazonpay',
                        method: 'amazonpay'
                    }));
                    saveCustomerToBrowser();
                    clearLocalSession();
                    if (window.top) {
                        window.top.location = order.redirect;
                    }
                    return [2];
            }
        });
    });
}
function initRelatedProducts() {
    if (!Feature.enabled(FeatureFlag.RECOMMENDED_PRODUCTS)) {
        return;
    }
    var previousCurrencyData = '';
    var previousCartData = '';
    store.subscribe(function () {
        var header = Feature.metadata(FeatureFlag.RECOMMENDED_PRODUCTS, 'rp_header') ? Feature.metadata(FeatureFlag.RECOMMENDED_PRODUCTS, 'rp_header') : getLocaleText('Recommended for you');
        var recommendedProducts = Feature.dynamicMetadata(FeatureFlag.RECOMMENDED_PRODUCTS, 'recommended_products');
        var cartData = JSON.stringify(DefaultCart.contents());
        var currencyData = JSON.stringify(MerchantConfiguration.currency.configuration());
        if (recommendedProducts && recommendedProducts.length > 0 && header) {
            if (cartData !== previousCartData || currencyData !== previousCurrencyData) {
                previousCartData = cartData;
                previousCurrencyData = currencyData;
                renderRecommendedProductsMiniSlider(recommendedProducts, header);
            }
        }
    });
    $qsAll('#pp-products-list-related, .pp-products-list-related-mobile-existing', function ($el) {
        $el.addEventListener('scroll', function () {
            var $elName = $el.id ? '#' + $el.id : '.' + $el.className;
            fadeAdjuster($elName, $el.scrollLeft === 0, Math.round($el.offsetWidth + $el.scrollLeft) >= $el.scrollWidth);
        });
    });
}
function renderRecommendedProductsMiniSlider(products, title) {
    var _a, _b, _c;
    $qsAll('.pp-related-product-body', function ($el) { return $el.remove(); });
    (_a = $qs('.pp-rp-spacer')) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = $qs('#pp-related-products-section')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    (_c = $qs('#pp-related-products-section-mobile-existing')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
    for (var _i = 0, _d = $qsAll('.related-products-title'); _i < _d.length; _i++) {
        var element = _d[_i];
        element.innerHTML = title;
        element.classList.remove('hide');
    }
    var relatedList = $qs('#pp-products-list-related-main');
    var relatedListMobile = $qs('.pp-products-list-related-mobile');
    var relatedListMobileExisting = $qs('.pp-products-list-related-mobile-existing');
    for (var _e = 0, products_1 = products; _e < products_1.length; _e++) {
        var item = products_1[_e];
        var isBundleOrVariable = item.bundle || item.variable;
        var rpBody = document.createElement('div');
        rpBody.id = String(item.id);
        rpBody.className = 'pp-related-product-body';
        rpBody.innerHTML = "<div class=\"pp-rp-content\">\n\t\t\t\t\t\t\t\t<img class=\"pp-related-product-img ".concat(item.img_src ? '' : 'hide', "\" src=").concat(item.img_src, ">\n\t\t\t\t\t\t\t\t<div class=\"flex col\">\n\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-title\">").concat(item.name, "</span>\n\t\t\t\t\t\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"img/sale.svg\" class=\"").concat(item.sale ? 'pp-rp-sale' : 'hide', "\"></img>\n\t\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-price").concat(item.sale && !isBundleOrVariable ? ' pp-rp-price-sale' : item.sale && isBundleOrVariable ? ' pp-rp-bv-sale' : '', "\">\n\t\t\t\t\t\t\t\t\t\t\t").concat(isBundleOrVariable ? item.price.replace(' &ndash; ', '<span> - </span>') : item.price, "\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>");
        item.variable ? rpBody.append(renderVariationFields(item)) : '';
        var qtyChanger = renderQuantityChanger(item.id);
        qtyChanger ? rpBody.append(qtyChanger) : rpBody.innerHTML += "<div>\n\t\t".concat(item.bundle ? "<a href=\"".concat(item.permalink, "\" class=\"pp-lp-btn\" target=\"_parent\">").concat(getLocaleText('View options'), "</a>") : "<button class=\"pp-lp-btn ".concat(item.variable ? 'pp-js-display' : 'pp-js-add-btn', "\" data-pid=").concat(item.id, ">\n\t\t\t\t\t").concat(item.variable ? '' : "<span style=\"pointer-events: none;\">+</span>", "\n\t\t\t\t\t<span style=\"pointer-events: none;\">").concat(item.variable ? getLocaleText('Customize') : getLocaleText('Add'), "</span>\n\t\t\t\t</button>"), "\n\t\t</div>");
        relatedList === null || relatedList === void 0 ? void 0 : relatedList.append(rpBody);
        relatedListMobile === null || relatedListMobile === void 0 ? void 0 : relatedListMobile.append(rpBody.cloneNode(true));
        relatedListMobileExisting === null || relatedListMobileExisting === void 0 ? void 0 : relatedListMobileExisting.append(rpBody.cloneNode(true));
    }
    variationFieldsUI();
    initQuantityChangerEvent();
    for (var _f = 0, _g = $qsAll('.pp-js-add-btn'); _f < _g.length; _f++) {
        var addBtn = _g[_f];
        addBtn.addEventListener('click', function (event) {
            store.dispatch(startModalLoading());
            event.target.disabled = true;
            event.target.innerHTML = '<img src="img/spinner-dark.svg" class="linked-product-spinner"/>';
            addProducttoCart(event.target);
        });
    }
}
function addProducttoCart(product) {
    window.parent.postMessage({
        event: 'addLinkedProduct',
        productID: product.dataset.pid
    }, '*');
}
function fadeAdjuster(elementName, isAtLeftEnd, isAtRightEnd) {
    var _a, _b, _c, _d;
    if (isAtLeftEnd) {
        (_a = $qs("".concat(elementName, "+.pp-rp-fade-left"))) === null || _a === void 0 ? void 0 : _a.classList.add('pp-rp-fade-left-hide');
    }
    else {
        (_b = $qs("".concat(elementName, "+.pp-rp-fade-left"))) === null || _b === void 0 ? void 0 : _b.classList.remove('pp-rp-fade-left-hide');
    }
    if (isAtRightEnd) {
        (_c = $qs("".concat(elementName, "+.pp-rp-fade-left+.pp-rp-fade-right"))) === null || _c === void 0 ? void 0 : _c.classList.add('pp-rp-fade-right-hide');
    }
    else {
        (_d = $qs("".concat(elementName, "+.pp-rp-fade-left+.pp-rp-fade-right"))) === null || _d === void 0 ? void 0 : _d.classList.remove('pp-rp-fade-right-hide');
    }
}
function renderVariationFields(item) {
    var formContainer = document.createElement('div');
    formContainer.setAttribute('data-pid', item.id.toString());
    formContainer.classList.add('flex', 'col', 'hide', 'pp-lp-form-container');
    var variationForm = document.createElement('form');
    variationForm.setAttribute('data-pid', item.id.toString());
    variationForm.className = 'pp-variation-form';
    for (var _i = 0, _a = item.attributes; _i < _a.length; _i++) {
        var attr = _a[_i];
        var container = document.createElement('div');
        container.className = 'pp-variation-select-field';
        var label = document.createElement('label');
        label.setAttribute('for', attr.name);
        label.innerHTML = attr.label;
        var select = document.createElement('select');
        select.name = 'attribute_' + attr.name;
        select.setAttribute('data-attribute_name', 'attribute_' + attr.name);
        for (var _b = 0, _c = attr.options; _b < _c.length; _b++) {
            var option = _c[_b];
            var opt = document.createElement('option');
            opt.value = option;
            opt.text = option.charAt(0).toUpperCase() + option.slice(1);
            select.add(opt, null);
        }
        container.append(label);
        container.append(select);
        variationForm.append(container);
    }
    var addToCartButton = document.createElement('button');
    addToCartButton.classList.add('pp-lp-btn', 'pp-variable-add-btn');
    addToCartButton.setAttribute('data-pid', item.id.toString());
    addToCartButton.innerHTML = "<span style=\"pointer-events: none;\">+</span><span style=\"pointer-events: none;\">".concat(getLocaleText('ADD'), "</span>");
    var cancelButton = document.createElement('button');
    cancelButton.classList.add('pp-variation-cancel-btn', 'pp-js-cancel-btn');
    cancelButton.setAttribute('data-pid', item.id.toString());
    cancelButton.innerText = getLocaleText('Close');
    formContainer.append(variationForm);
    formContainer.append(addToCartButton);
    formContainer.append(cancelButton);
    return formContainer;
}
function renderQuantityChanger(id) {
    var cart = DefaultCart.contents();
    for (var i = cart.length - 1; i >= 0; i--) {
        var item = cart[i];
        if (id === item.product_id) {
            var $div = document.createElement('div');
            $div.innerHTML += "\n\t\t\t\t<div class=\"pp-quantity-changer\" style=\"justify-content: center;\">\n\t\t\t\t\t<button type=\"button\" class=\"flex-center decrease-qty qty-btn ".concat(cartItemQuantity(item) <= 1 ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/minus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t\t\t\t<input style=\"color: black;\" type=\"number\" min=\"0\" max=\"").concat(item.stock_qty ? item.stock_qty : '', "\" class=\"qty-fs\" value=\"").concat(cartItemQuantity(item), "\" data-qid=\"").concat(item.item_key, "\" required/>\n\t\t\t\t\t<button type=\"button\" class=\"flex-center increase-qty qty-btn ").concat(item.stock_qty && cartItemQuantity(item) >= item.stock_qty ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/plus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t\t\t</div>");
            return $div;
        }
    }
    return '';
}
function addVariableProduct(element) {
    var productID = element.dataset.pid;
    var variationForm = $qs('.pp-variation-form[data-pid=\'' + productID + '\']');
    var formElements = Array.from(variationForm.elements);
    var variationData = [];
    formElements.forEach(function (element) {
        var data = [
            element.name,
            element.value
        ];
        variationData.push(data);
    });
    window.parent.postMessage({
        event: 'addVariableProduct',
        productID: productID,
        variationData: variationData
    }, '*');
    onWindowMessage('pp-variation-fail', function () {
        element.disabled = false;
        element.innerHTML = "<span style=\"pointer-events: none;\">+</span><span style=\"pointer-events: none;\">".concat(getLocaleText('ADD'), "</span>");
        store.dispatch(stopModalLoading());
    });
}
function variationFieldsUI() {
    for (var _i = 0, _a = $qsAll('.pp-js-display'); _i < _a.length; _i++) {
        var button = _a[_i];
        button.addEventListener('click', function (event) {
            var id = event.target.dataset.pid;
            var container = $qsAll('.pp-lp-form-container[data-pid=\'' + id + '\']');
            container === null || container === void 0 ? void 0 : container.forEach(function (element) { return element.classList.remove('hide'); });
            $qsAll('.pp-js-display[data-pid=\'' + id + '\']', function (element) { return element === null || element === void 0 ? void 0 : element.classList.add('hide'); });
        });
    }
    for (var _b = 0, _c = $qsAll('.pp-js-cancel-btn'); _b < _c.length; _b++) {
        var button1 = _c[_b];
        button1.addEventListener('click', function (event) {
            var id = event.target.dataset.pid;
            var container = $qsAll('.pp-lp-form-container[data-pid=\'' + id + '\']');
            container === null || container === void 0 ? void 0 : container.forEach(function (element) { return element.classList.add('hide'); });
            $qsAll('.pp-js-display[data-pid=\'' + id + '\']', function (element) { return element === null || element === void 0 ? void 0 : element.classList.remove('hide'); });
        });
    }
    for (var _d = 0, _e = $qsAll('.pp-variable-add-btn'); _d < _e.length; _d++) {
        var variationBtn = _e[_d];
        variationBtn.addEventListener('click', function (event) {
            store.dispatch(startModalLoading());
            event.target.disabled = true;
            event.target.innerHTML = '<img src="img/spinner-dark.svg" class="linked-product-spinner"/>';
            addVariableProduct(event.target);
        });
    }
}
function setupFreeOrderButton() {
    store.subscribe(function () {
        renderFreeOrderButtonDisplay(DefaultCart.contents().length, Carts.total(), Environment.modalUI.loadingMode());
        renderFreeOrderButtonLoading(Environment.modalUI.loadingMode());
    });
}
function renderFreeOrderButtonDisplay(cartSize, allCartsTotal, loadingMode) {
    if (cartSize > 0 && allCartsTotal === 0) {
        $qsAll('.free-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.free-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (loadingMode !== 'loading' && allCartsTotal === 0) {
        $qsAll('.free-btn', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.free-btn', function ($element) { return $element.classList.add('hide'); });
    }
}
function renderFreeOrderButtonLoading(mode) {
    if (mode === 'finished') {
        $qsAll('.free-btn', function ($element) { return $element.disabled = false; });
    }
    else {
        $qsAll('.free-btn', function ($element) { return $element.disabled = true; });
    }
    if (mode === 'loading') {
        $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-btn-spinner-container ', function ($element) { return $element.classList.add('hide'); });
    }
    if (mode === 'processing') {
        $qsAll('.free-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('Processing'); });
        $qsAll('.free-btn-spinner', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.free-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('Place order'); });
        $qsAll('.free-btn-spinner', function ($element) { return $element.classList.add('hide'); });
    }
}
function initFreeOrderSupport(orderService) {
    var _this = this;
    var confirm1 = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var $target, $button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!checkRequiredFields()) {
                        return [2];
                    }
                    $target = event.target;
                    $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
                    if (!$button) {
                        return [2];
                    }
                    return [4, freeOrderFlow(orderService)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); };
    $qsAll('.free-btn', function ($el) { return $el.addEventListener('click', confirm1); });
    setupFreeOrderButton();
}
function freeOrderFlow(orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, orderResponse, successURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    return [4, orderService.startTransaction('peachpay_free')];
                case 1:
                    transaction = _a.sent();
                    return [4, orderService.placeOrder(transaction)];
                case 2:
                    orderResponse = _a.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 4];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 3:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 4:
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    if (!window.top) return [3, 6];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            paymentStatus: 'success',
                            orderStatus: 'success',
                            note: 'PeachPay free order flow'
                        }))];
                case 5:
                    _a.sent();
                    window.top.location = successURL;
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
}
var shippingAutocomplete;
var newCustomerBillingAutocomplete;
var returningCustomerBillingAutocomplete;
function initAddressAutocomplete(message) {
    if (!Feature.enabled(FeatureFlag.ADDRESS_AUTOCOMPLETE)) {
        return;
    }
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAL_j0UvKJacQhZ3OedCj_bkcTbuO63MVU&libraries=places', 'google', function () {
        var shippingInput = $qs("#pp-different-shipping-details [name=\"shipping_address_1\"]");
        var newBillingInput = $qs("#pp-info-form [name=\"billing_address_1\"]");
        var returningBillingInput = $qs("#pp-info-form-returning [name=\"billing_address_1\"]");
        var shippingOptions = {
            fields: [
                'address_components',
                'formatted_address'
            ],
            types: [
                'address'
            ]
        };
        var billingOptions = {
            fields: [
                'address_components',
                'formatted_address'
            ],
            types: [
                'address'
            ]
        };
        shippingAutocomplete = new google.maps.places.Autocomplete(shippingInput, shippingOptions);
        shippingAutocomplete.addListener('place_changed', function () {
            fillInAddress('shipping', 'shipping', message.phpData);
        });
        newCustomerBillingAutocomplete = new google.maps.places.Autocomplete(newBillingInput, billingOptions);
        newCustomerBillingAutocomplete.addListener('place_changed', function () {
            fillInAddress('billing', 'info', message.phpData);
        });
        returningCustomerBillingAutocomplete = new google.maps.places.Autocomplete(returningBillingInput, billingOptions);
        returningCustomerBillingAutocomplete.addListener('place_changed', function () {
            fillInAddress('billing', 'returning', message.phpData);
        });
        $qsAll('#pp-info-form, #pp-info-form-returning, #pp-different-shipping-details', function ($form) {
            $form.addEventListener('keypress', preventSubmitListener);
        });
    });
}
function preventSubmitListener(event) {
    var key = event.key || 0;
    if (key === 'Enter') {
        event.preventDefault();
    }
}
function fillInAddress(section, modalPage, phpData) {
    var formIdentifier = modalPage === 'info' ? '#pp-info-form' : modalPage === 'returning' ? '#pp-info-form-returning' : '#pp-different-shipping-details';
    var address1Field = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_address_1\"]"));
    var address2Field = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_address_2\"]"));
    var postalField = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_postcode\"]"));
    var cityField = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_city\"]"));
    var stateField = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_state\"]"));
    var provinceField = $qs("".concat(formIdentifier, " [name=\"").concat(section, "_province\"]"));
    if (address1Field) {
        address1Field.value = '';
    }
    if (address2Field) {
        address2Field.value = '';
    }
    if (postalField) {
        postalField.value = '';
    }
    if (cityField) {
        cityField.value = '';
    }
    if (stateField) {
        stateField.value = '';
    }
    if (provinceField) {
        provinceField.value = '';
    }
    var place = undefined;
    if (modalPage === 'info') {
        place = newCustomerBillingAutocomplete.getPlace();
    }
    if (modalPage === 'returning') {
        place = returningCustomerBillingAutocomplete.getPlace();
    }
    if (modalPage === 'shipping') {
        place = shippingAutocomplete.getPlace();
    }
    var country = place.address_components.find(function (component) { return component.types[0] === 'country'; });
    var countryField = document.querySelector("".concat(formIdentifier, " [name=\"").concat(section, "_country\"]"));
    if (countryField) {
        var previousCountryFieldValue = countryField.value;
        countryField.value = country.short_name;
        if (previousCountryFieldValue !== country.short_name) {
            renderCorrectProvinceField(phpData, modalPage);
            if (Feature.enabled(FeatureFlag.USE_WC_COUNTRY_LOCALE)) {
                setTimeout(function () {
                    wcCountryLocaleRuleRender(modalPage);
                });
            }
        }
        if (modalPage === 'returning') {
            handleReturningInfoformChanges(true, phpData);
        }
        else {
            setTimeout(function () {
                syncCustomerFieldChanges(formIdentifier);
            }, 200);
        }
    }
    var postcode = '';
    for (var _i = 0, _a = place.address_components; _i < _a.length; _i++) {
        var component = _a[_i];
        var componentType = component.types[0];
        switch (componentType) {
            case 'postal_code':
                {
                    postcode = "".concat(component.long_name).concat(postcode);
                    break;
                }
            case 'locality':
            case 'postal_town':
                {
                    if (cityField) {
                        cityField.value = component.long_name;
                    }
                    break;
                }
            case 'administrative_area_level_1':
                {
                    if (stateField) {
                        stateField.value = component.short_name;
                    }
                    if (provinceField) {
                        provinceField.value = component.short_name;
                    }
                    break;
                }
            case 'country':
                break;
        }
    }
    if (address1Field) {
        address1Field.value = getFormattedStreetAddress(place.formatted_address);
    }
    if (postalField) {
        postalField.value = postcode;
    }
    if (modalPage === 'returning') {
        handleReturningInfoformChanges(false, phpData);
    }
    else {
        setTimeout(function () {
            syncCustomerFieldChanges(formIdentifier);
        }, 200);
    }
    if (address2Field) {
        address2Field.focus();
    }
}
function getFormattedStreetAddress(formattedAddress) {
    var addressChunks = formattedAddress.split(', ');
    if (addressChunks.length == 1) {
        return formattedAddress.split(' - ')[0];
    }
    var regexContainsHouseNumber = /\d+/g;
    if (!regexContainsHouseNumber.test(addressChunks[0]) && regexContainsHouseNumber.test(addressChunks[1])) {
        return "".concat(addressChunks[0], ", ").concat(addressChunks[1]);
    }
    return addressChunks[0];
}
function initCustomOrderMessaging() {
    if (Feature.enabled(FeatureFlag.STORE_SUPPORT_MESSAGE)) {
        store.subscribe(function () {
            renderCustomOrderMessaging();
        });
    }
}
function renderCustomOrderMessaging() {
    var text = Feature.metadata(FeatureFlag.STORE_SUPPORT_MESSAGE, 'text');
    var type = Feature.metadata(FeatureFlag.STORE_SUPPORT_MESSAGE, 'type');
    if (text && type) {
        if (type === 'inline') {
            $qsAll('.pp-custom-order-message-inline').forEach(function ($el) {
                $el.classList.remove('hide');
            });
        }
        else {
            $qsAll('#pp-custom-order-message-hover', function ($el) { return $el.classList.remove('hide'); });
        }
        var $temp_1 = document.createElement('div');
        $temp_1.innerHTML = text;
        $temp_1.querySelectorAll('a').forEach(function ($a) { return $a.setAttribute('target', '_blank'); });
        $temp_1.querySelectorAll(':not(a,br,h1,h1,h3,h4,h5,p,div,li,ul,ol,span,img)').forEach(function ($el) { return $el.remove(); });
        $qsAll('.pp-custom-order-message', function ($el) { return $el.innerHTML = $temp_1.innerHTML; });
    }
    else {
        $qsAll('.pp-custom-order-message-inline').forEach(function ($el) {
            $el.classList.add('hide');
        });
        $qsAll('#pp-custom-order-message-hover', function ($el) { return $el.classList.add('hide'); });
    }
}
function isChrome() {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== 'undefined';
    var isIEedge = winNav.userAgent.indexOf('Edg') > -1;
    var isIOSChrome = winNav.userAgent.match('CriOS');
    if (isIOSChrome) {
        return true;
    }
    else if (isChromium !== null && typeof isChromium !== 'undefined' && vendorName === 'Google Inc.' && isOpera === false && isIEedge === false) {
        return true;
    }
    else {
        return false;
    }
}
function isOpera() {
    return /Opera|OPR\//.test(navigator.userAgent);
}
function isBrave() {
    return !!navigator.brave;
}
var customButtonMethods = new Set([
    'google_pay',
    'apple_pay',
]);
function setupSquareButton(paymentMethods) {
    store.subscribe(function () {
        renderSquareButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.page(), Environment.modalUI.loadingMode(), DefaultCart.total());
        renderSquareButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
        renderSquareCustomButtonDisplay(paymentMethods);
    });
}
function renderSquareCustomButtonDisplay(paymentMethods) {
    var _a, _b, _c;
    if (PaymentConfiguration.selectedProvider() !== 'square') {
        return;
    }
    var methods = Object.entries(paymentMethods).sort(function (_a, _b) {
        var _c, _d, _e, _f, _g;
        var _ = _a[0], m1 = _a[1];
        var __ = _b[0], m2 = _b[1];
        return ((_e = (_d = (_c = m2.state) === null || _c === void 0 ? void 0 : _c.mountTarget) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0) - ((_g = (_f = m1.state) === null || _f === void 0 ? void 0 : _f.mountTarget.length) !== null && _g !== void 0 ? _g : 0);
    });
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var _d = methods_1[_i], _ = _d[0], method = _d[1];
        if (!method.state) {
            method.state = {
                mountTarget: ''
            };
        }
        var newMountTarget = customButtonMountTargetBase();
        if (method.state.mountTarget && method.state.mountTarget !== newMountTarget) {
            (_a = method === null || method === void 0 ? void 0 : method.detach) === null || _a === void 0 ? void 0 : _a.call(method);
            method.state.mountTarget = '';
        }
        if (PaymentConfiguration.selectedProviderMethod() === method.config.slug) {
            if (method.state.mountTarget) {
                continue;
            }
            (_b = method === null || method === void 0 ? void 0 : method.attach) === null || _b === void 0 ? void 0 : _b.call(method, newMountTarget);
            method.state.mountTarget = newMountTarget;
        }
        else {
            if (!method.state.mountTarget) {
                continue;
            }
            (_c = method === null || method === void 0 ? void 0 : method.detach) === null || _c === void 0 ? void 0 : _c.call(method);
            method.state.mountTarget = '';
        }
    }
}
function renderSquareButtonDisplay(provider, page, loadingMode, cartTotal) {
    if (provider === 'square' && (page === 'payment' || page === 'returning') && cartTotal > 0) {
        $qsAll('.square-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.square-btn-container', function ($element) {
            $element.classList.add('hide');
            $element.classList.remove('active');
        });
    }
    if ((page === 'payment' || page === 'returning') && provider === 'square' && loadingMode !== 'loading' && cartTotal > 0) {
        if (customButtonMethods.has(PaymentConfiguration.selectedProviderMethod())) {
            $qsAll('.square-btn', function ($element) { return $element.classList.add('hide'); });
            $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.remove('hide'); });
        }
        else {
            $qsAll('.square-btn', function ($element) { return $element.classList.remove('hide'); });
            $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.add('hide'); });
        }
    }
    else {
        $qsAll('.square-btn', function ($element) { return $element.classList.add('hide'); });
    }
}
function renderSquareButtonLoading(provider, mode) {
    if (provider !== 'square') {
        return;
    }
    if (mode === 'finished') {
        $qsAll('.square-btn', function ($element) { return $element.disabled = false; });
    }
    else {
        $qsAll('.square-btn', function ($element) { return $element.disabled = true; });
    }
    if (mode === 'loading') {
        $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.remove('hide'); });
        $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    else {
        $qsAll('.pp-btn-spinner-container ', function ($element) { return $element.classList.add('hide'); });
        $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    if (customButtonMethods.has(PaymentConfiguration.selectedProviderMethod())) {
        if (mode === 'processing') {
            $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.remove('hide'); });
            $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.add('hide'); });
        }
        else {
            $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.add('hide'); });
            $qsAll('.square-custom-btn-container', function ($element) { return $element.classList.remove('hide'); });
        }
    }
    else {
        if (mode === 'processing') {
            $qsAll('.square-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('Processing'); });
            $qsAll('.square-btn-spinner', function ($element) { return $element.classList.remove('hide'); });
        }
        else {
            $qsAll('.square-btn > .button-text', function ($element) { return $element.innerHTML = "".concat(getLocaleText('Pay'), " ").concat(formatCurrencyString(DefaultCart.total())); });
            $qsAll('.square-btn-spinner', function ($element) { return $element.classList.add('hide'); });
        }
    }
}
function customButtonMountTargetBase() {
    if (Environment.customer.mobile()) {
        return '#mobile-customer-pay-button';
    }
    else if (Environment.customer.existing()) {
        return '#existing-customer-pay-button';
    }
    else {
        return '#new-customer-pay-button';
    }
}
var SQUARE_PRODUCTION_SCRIPT = 'https://web.squarecdn.com/v1/square.js';
var SQUARE_SANDBOX_SCRIPT = 'https://sandbox.web.squarecdn.com/v1/square.js';
function initSquarePaymentProvider(orderService, pluginCapabilities) {
    if (!Feature.enabled(FeatureFlag.SQUARE) || !(pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.square.connected)) {
        return;
    }
    var scriptURL = Environment.isTestOrDevSite() ? SQUARE_SANDBOX_SCRIPT : SQUARE_PRODUCTION_SCRIPT;
    loadScript(scriptURL, 'Square', function () {
        var _a, _b, _c, _d, _e;
        var account = (_a = pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.square) === null || _a === void 0 ? void 0 : _a.account;
        var applicationId = (_b = pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.square.config.application_id) !== null && _b !== void 0 ? _b : '';
        var locationId = (_e = (_d = (_c = pluginCapabilities === null || pluginCapabilities === void 0 ? void 0 : pluginCapabilities.square) === null || _c === void 0 ? void 0 : _c.account) === null || _d === void 0 ? void 0 : _d.location_id) !== null && _e !== void 0 ? _e : '';
        var payments = Square.payments(applicationId, locationId);
        var paymentRequest = payments.paymentRequest(squarePaymentRequestOptions());
        var context = {
            Square: Square,
            payments: payments,
            paymentRequest: paymentRequest
        };
        var paymentMethods = setupSquareMethods(account);
        activateSquareMethods(context, paymentMethods, orderService);
        activatePaymentRequest(context);
        setupSquareButton(paymentMethods);
    });
}
function handleTokenResult(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    var extractErrorMessage = function () {
        var _a, _b;
        var message = '';
        if (result.errors && Array.isArray(result.errors)) {
            result.errors.forEach(function (error) {
                message += error.message + '. ';
            });
        }
        else {
            message += (_b = (_a = result.errors) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : '';
        }
        return message;
    };
    switch (result.status) {
        case 'OK':
            {
                var billingContact = result.details.billing;
                var shippingContact = (_c = (_b = (_a = result.details) === null || _a === void 0 ? void 0 : _a.shipping) === null || _b === void 0 ? void 0 : _b.contact) !== null && _c !== void 0 ? _c : result.details.billing;
                store.dispatch(updateCustomerFields(__assign(__assign({}, PeachPayCustomer.data()['form_fields']), { ship_to_different_address: '1', billing_email: (_d = billingContact.email) !== null && _d !== void 0 ? _d : PeachPayCustomer.billing.email(), billing_first_name: (_e = billingContact.givenName) !== null && _e !== void 0 ? _e : PeachPayCustomer.billing.firstName(), billing_last_name: (_f = billingContact.familyName) !== null && _f !== void 0 ? _f : PeachPayCustomer.billing.lastName(), billing_phone: (_g = billingContact.phone) !== null && _g !== void 0 ? _g : PeachPayCustomer.billing.phone(), billing_address_1: (_j = (_h = billingContact.addressLines) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : PeachPayCustomer.billing.address1(), billing_address_2: (_l = (_k = billingContact.addressLines) === null || _k === void 0 ? void 0 : _k[1]) !== null && _l !== void 0 ? _l : PeachPayCustomer.billing.address2(), billing_city: (_m = billingContact.city) !== null && _m !== void 0 ? _m : PeachPayCustomer.billing.city(), billing_state: (_o = billingContact.state) !== null && _o !== void 0 ? _o : PeachPayCustomer.billing.state(), billing_postcode: (_p = billingContact.postalCode) !== null && _p !== void 0 ? _p : PeachPayCustomer.billing.postal(), billing_country: (_q = billingContact.countryCode) !== null && _q !== void 0 ? _q : PeachPayCustomer.billing.country(), shipping_email: (_r = shippingContact.email) !== null && _r !== void 0 ? _r : PeachPayCustomer.shipping.email(), shipping_first_name: (_s = shippingContact.givenName) !== null && _s !== void 0 ? _s : PeachPayCustomer.shipping.firstName(), shipping_last_name: (_t = shippingContact.familyName) !== null && _t !== void 0 ? _t : PeachPayCustomer.shipping.lastName(), shipping_phone: (_u = shippingContact.phone) !== null && _u !== void 0 ? _u : PeachPayCustomer.shipping.phone(), shipping_address_1: (_w = (_v = shippingContact.addressLines) === null || _v === void 0 ? void 0 : _v[0]) !== null && _w !== void 0 ? _w : PeachPayCustomer.shipping.address1(), shipping_address_2: (_y = (_x = shippingContact.addressLines) === null || _x === void 0 ? void 0 : _x[1]) !== null && _y !== void 0 ? _y : PeachPayCustomer.shipping.address2(), shipping_city: (_z = shippingContact.city) !== null && _z !== void 0 ? _z : PeachPayCustomer.shipping.city(), shipping_state: (_0 = shippingContact.state) !== null && _0 !== void 0 ? _0 : PeachPayCustomer.shipping.state(), shipping_postcode: (_1 = shippingContact.postalCode) !== null && _1 !== void 0 ? _1 : PeachPayCustomer.shipping.postal(), shipping_country: (_2 = shippingContact.countryCode) !== null && _2 !== void 0 ? _2 : PeachPayCustomer.shipping.country() })));
                if ((_4 = (_3 = result.details) === null || _3 === void 0 ? void 0 : _3.shipping) === null || _4 === void 0 ? void 0 : _4.option) {
                    store.dispatch(updateCartPackageShippingMethod({
                        cartKey: '0',
                        shippingPackageKey: '0',
                        packageMethodId: result.details.shipping.option.id
                    }));
                }
                return [
                    result.token,
                    null,
                    {}
                ];
            }
        case 'Cancel':
            return [
                null,
                null,
                {
                    note: 'Customer canceled the Payment. ' + extractErrorMessage(),
                    paymentStatus: 'canceled'
                }
            ];
        case 'Abort':
            return [
                null,
                null,
                {
                    note: 'Tokenizing the payment method was aborted. ' + extractErrorMessage(),
                    paymentStatus: 'creationfailed'
                }
            ];
        case 'Error':
            return [
                null,
                null,
                {
                    note: 'Tokenizing the payment method encountered an error. ' + extractErrorMessage(),
                    paymentStatus: 'creationfailed'
                }
            ];
        case 'Invalid':
            return [
                null,
                null,
                {
                    note: 'Tokenizing the payment method encountered an invalid status. ' + extractErrorMessage(),
                    paymentStatus: 'creationfailed'
                }
            ];
        case 'Unknown':
        default:
            return [
                null,
                null,
                {
                    note: 'Tokenizing the payment method encountered an unknown status. ' + extractErrorMessage(),
                    paymentStatus: 'creationfailed'
                }
            ];
    }
}
function initSquareCardMethod(account) {
    var _this = this;
    var config = {
        name: getLocaleText('Card'),
        slug: 'card',
        gateway: 'peachpay_square',
        description: '',
        reusable: true,
        assets: {
            title: {
                src: 'img/marks/credit-card-regular.svg'
            },
            badge: {
                src: 'img/marks/credit-card-regular.svg'
            }
        },
        supports: {
            minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.SQUARE, 'card_payments', 'min'),
            maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.SQUARE, 'card_payments', 'max'),
            currencies: [
                account.currency
            ],
            productTypes: [],
            virtualProducts: true,
            shippingMethods: [],
            customerCountries: [
                'ALL'
            ]
        }
    };
    var newCardElement = null;
    var existingCardElement = null;
    return {
        config: config,
        activate: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var payments, squareCardOptions, previousPaymentMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payments = context.payments;
                        squareCardOptions = {
                            style: {
                                '.input-container': {
                                    borderWidth: '1px'
                                }
                            }
                        };
                        $qsAll("div.pp-pm-saved-option[data-provider=\"square\"][data-method=\"card\"][data-index=\"\"]", function ($el) {
                            $el.style.padding = '0';
                            $el.style.border = 'unset';
                        });
                        return [4, payments.card(squareCardOptions)];
                    case 1:
                        newCardElement = _a.sent();
                        newCardElement.attach('#pp-pms-new div.pp-pm-saved-option[data-provider="square"][data-method="card"][data-index=""]');
                        return [4, payments.card(squareCardOptions)];
                    case 2:
                        existingCardElement = _a.sent();
                        existingCardElement.attach('#pp-pms-existing div.pp-pm-saved-option[data-provider="square"][data-method="card"][data-index=""]');
                        previousPaymentMethod = '';
                        store.subscribe(function () {
                            var currentPaymentMethod = PaymentConfiguration.selectedPaymentMethod();
                            if (currentPaymentMethod === previousPaymentMethod) {
                                return;
                            }
                            previousPaymentMethod = currentPaymentMethod;
                            newCardElement === null || newCardElement === void 0 ? void 0 : newCardElement.recalculateSize();
                            existingCardElement === null || existingCardElement === void 0 ? void 0 : existingCardElement.recalculateSize();
                        });
                        return [2];
                }
            });
        }); },
        tokenize: function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var payments, cardElement, tokenResult, _a, sourceId, _, transactionUpdate, response, error_15;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payments = context.payments;
                            cardElement = Environment.customer.existing() ? existingCardElement : newCardElement;
                            if (!cardElement) {
                                return [2, [
                                        null,
                                        null,
                                        {
                                            paymentStatus: 'creationfailed',
                                            note: 'Square Card element not found while attempting to tokenize card.'
                                        }
                                    ]];
                            }
                            return [4, cardElement.tokenize()];
                        case 1:
                            tokenResult = _b.sent();
                            _a = handleTokenResult(tokenResult), sourceId = _a[0], _ = _a[1], transactionUpdate = _a[2];
                            if (!sourceId) {
                                return [2, [
                                        null,
                                        null,
                                        transactionUpdate
                                    ]];
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4, payments.verifyBuyer(sourceId, {
                                    intent: 'CHARGE',
                                    amount: String(DefaultCart.total()),
                                    currencyCode: MerchantConfiguration.currency.code(),
                                    billingContact: {
                                        addressLines: [
                                            PeachPayCustomer.billing.address1(),
                                            PeachPayCustomer.billing.address2()
                                        ],
                                        city: PeachPayCustomer.billing.city(),
                                        countryCode: PeachPayCustomer.billing.country(),
                                        email: PeachPayCustomer.billing.email(),
                                        familyName: PeachPayCustomer.billing.lastName(),
                                        givenName: PeachPayCustomer.billing.firstName(),
                                        phone: PeachPayCustomer.billing.phone(),
                                        state: PeachPayCustomer.billing.state(),
                                        postalCode: PeachPayCustomer.billing.postal()
                                    }
                                })];
                        case 3:
                            response = _b.sent();
                            return [2, [
                                    sourceId,
                                    response.token,
                                    {}
                                ]];
                        case 4:
                            error_15 = _b.sent();
                            return [2, [
                                    null,
                                    null,
                                    {
                                        paymentStatus: 'creationfailed',
                                        note: "Verifying Square buyer failed with error: ".concat(error_15.message)
                                    }
                                ]];
                        case 5: return [2];
                    }
                });
            });
        }
    };
}
function initSquareGooglePayMethod(account) {
    var _this = this;
    var gpay = null;
    var config = {
        initialized: false,
        name: getLocaleText('Google Pay'),
        slug: 'google_pay',
        gateway: 'peachpay_square',
        description: getDescription1(),
        reusable: false,
        assets: {
            badge: {
                src: 'img/marks/google-pay.svg'
            },
            title: {
                src: 'img/marks/google-pay.svg'
            }
        },
        supports: {
            browser: isChrome() || isOpera() || isBrave(),
            currencies: [
                account.currency
            ],
            productTypes: [],
            virtualProducts: true,
            shippingMethods: [],
            customerCountries: [
                'ALL'
            ]
        }
    };
    return {
        config: config,
        activate: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var payments, paymentRequest, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        payments = context.payments, paymentRequest = context.paymentRequest;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, payments.googlePay(paymentRequest)];
                    case 2:
                        gpay = _b.sent();
                        config.initialized = true;
                        store.dispatch(render());
                        return [3, 4];
                    case 3:
                        _a = _b.sent();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); },
        attach: function (baseTarget) {
            gpay === null || gpay === void 0 ? void 0 : gpay.attach(baseTarget + ' .square-custom-btn-container', {
                buttonColor: 'black',
                buttonSizeMode: 'fill'
            });
        },
        detach: function () {
            gpay === null || gpay === void 0 ? void 0 : gpay.detach();
        },
        tokenize: function (_) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_16, update;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            if (!gpay) {
                                return [2, [
                                        null,
                                        null,
                                        {
                                            paymentStatus: 'creationfailed',
                                            note: 'Failed to find Google Pay instance while attempting to tokenize the payment.'
                                        }
                                    ]];
                            }
                            return [4, gpay.tokenize()];
                        case 1:
                            result = _a.sent();
                            return [2, handleTokenResult(result)];
                        case 2:
                            error_16 = _a.sent();
                            update = {
                                paymentStatus: 'creationfailed',
                                note: 'An unknown exception occured while tokenizing the payment.'
                            };
                            if (error_16 instanceof Error) {
                                update.note = error_16.message;
                            }
                            return [2, [
                                    null,
                                    null,
                                    update
                                ]];
                        case 3: return [2];
                    }
                });
            });
        }
    };
}
function initSquareApplePayMethod(account) {
    var apay = null;
    var $button = getButton();
    var config = {
        initialized: false,
        name: getLocaleText('Apple Pay'),
        slug: 'apple_pay',
        gateway: 'peachpay_square',
        description: getDescription(),
        reusable: true,
        assets: {
            badge: {
                src: 'img/marks/apple-pay.svg'
            },
            title: {
                src: 'img/marks/apple-pay.svg'
            }
        },
        supports: {
            browser: window['ApplePaySession'] !== undefined,
            currencies: [
                account.currency
            ],
            productTypes: [],
            virtualProducts: true,
            shippingMethods: [],
            customerCountries: [
                'ALL'
            ]
        }
    };
    return {
        config: config,
        activate: function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var payments, paymentRequest, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payments = context.payments, paymentRequest = context.paymentRequest;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4, payments.applePay(paymentRequest)];
                        case 2:
                            apay = _b.sent();
                            config.initialized = true;
                            store.dispatch(render());
                            return [3, 4];
                        case 3:
                            _a = _b.sent();
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        },
        attach: function (baseTarget) {
            $qs("".concat(baseTarget, " .square-custom-btn-container"), function ($el) { return $el.insertAdjacentElement('afterbegin', $button); });
        },
        detach: function () {
            $button.remove();
        },
        tokenize: function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_17, update;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            if (!apay) {
                                return [2, [
                                        null,
                                        null,
                                        {
                                            paymentStatus: 'creationfailed',
                                            note: 'Failed to find Apple Pay instance while attempting to tokenize the payment.'
                                        }
                                    ]];
                            }
                            return [4, apay.tokenize()];
                        case 1:
                            result = _a.sent();
                            return [2, handleTokenResult(result)];
                        case 2:
                            error_17 = _a.sent();
                            update = {
                                paymentStatus: 'creationfailed',
                                note: 'An unknown exception occured while tokenizing the payment.'
                            };
                            if (error_17 instanceof Error) {
                                update.note = error_17.message;
                            }
                            return [2, [
                                    null,
                                    null,
                                    update
                                ]];
                        case 3: return [2];
                    }
                });
            });
        }
    };
}
function setupSquareMethods(account) {
    var paymentMethods = {};
    if (isPaymentMethodActive1(account, 'card_payments')) {
        var cardMethod = initSquareCardMethod(account);
        paymentMethods['card'] = cardMethod;
    }
    if (isPaymentMethodActive1(account, 'google_pay_payments')) {
        var googlePayMethod = initSquareGooglePayMethod(account);
        paymentMethods['google_pay'] = googlePayMethod;
    }
    if (isPaymentMethodActive1(account, 'apple_pay_payments')) {
        var applePayMethod = initSquareApplePayMethod(account);
        paymentMethods['apple_pay'] = applePayMethod;
    }
    var stripeProvider = {
        'methods': {}
    };
    for (var method in paymentMethods) {
        stripeProvider.methods[method] = paymentMethods[method].config;
    }
    store.dispatch(registerPaymentProvider({
        'square': stripeProvider
    }));
    return paymentMethods;
}
function activatePaymentRequest(context) {
    var _this = this;
    var paymentRequest = context.paymentRequest;
    var previousState = '';
    var shippingInitialized = false;
    store.subscribe(function () {
        var data = squarePaymentRequestOptions();
        var currentState = JSON.stringify(data);
        if (previousState === currentState || Environment.modalUI.loadingMode() !== 'finished' || PaymentConfiguration.selectedProvider() !== 'square') {
            return;
        }
        previousState = currentState;
        if (!Carts.virtual() && !shippingInitialized) {
            shippingInitialized = true;
            paymentRequest.addEventListener('shippingoptionchanged', function (option) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            store.dispatch(updateCartPackageShippingMethod({
                                cartKey: '0',
                                shippingPackageKey: '0',
                                packageMethodId: option.id
                            }));
                            return [4, requestCartCalculation()];
                        case 1:
                            _a.sent();
                            return [2, squarePaymentRequestEventUpdate()];
                    }
                });
            }); });
            paymentRequest.addEventListener('shippingcontactchanged', function (contact) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            store.dispatch(updateCustomerFields(__assign(__assign({}, PeachPayCustomer.data()['form_fields']), { ship_to_different_address: '1', shipping_email: (_a = contact.email) !== null && _a !== void 0 ? _a : PeachPayCustomer.shipping.email(), shipping_first_name: (_b = contact.givenName) !== null && _b !== void 0 ? _b : PeachPayCustomer.shipping.firstName(), shipping_last_name: (_c = contact.familyName) !== null && _c !== void 0 ? _c : PeachPayCustomer.shipping.lastName(), shipping_phone: (_d = contact.phone) !== null && _d !== void 0 ? _d : PeachPayCustomer.shipping.phone(), shipping_address_1: (_f = (_e = contact.addressLines) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : PeachPayCustomer.shipping.address1(), shipping_address_2: (_h = (_g = contact.addressLines) === null || _g === void 0 ? void 0 : _g[1]) !== null && _h !== void 0 ? _h : PeachPayCustomer.shipping.address2(), shipping_city: (_j = contact.city) !== null && _j !== void 0 ? _j : PeachPayCustomer.shipping.city(), shipping_state: (_k = contact.state) !== null && _k !== void 0 ? _k : PeachPayCustomer.shipping.state(), shipping_postcode: (_l = contact.postalCode) !== null && _l !== void 0 ? _l : PeachPayCustomer.shipping.postal(), shipping_country: (_m = contact.countryCode) !== null && _m !== void 0 ? _m : PeachPayCustomer.shipping.country() })));
                            return [4, requestCartCalculation()];
                        case 1:
                            _o.sent();
                            return [2, squarePaymentRequestEventUpdate()];
                    }
                });
            }); });
        }
        paymentRequest.update(data);
    });
}
function isPaymentMethodActive1(account, selector) {
    var hasCapability = false;
    switch (selector) {
        case 'card_payments':
        case 'apple_pay_payments':
        case 'google_pay_payments':
            hasCapability = account.capabilities.includes('CREDIT_CARD_PROCESSING');
            break;
        default:
            hasCapability = false;
            break;
    }
    var enabled = Boolean(Feature.metadata(FeatureFlag.SQUARE, selector));
    return hasCapability && enabled;
}
function activateSquareMethods(context, methods, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var activations, key, method, _a, confirm1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    activations = [];
                    for (key in methods) {
                        method = methods[key];
                        if (method.activate) {
                            activations.push(method === null || method === void 0 ? void 0 : method.activate(context));
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, Promise.all(activations)];
                case 2:
                    _b.sent();
                    return [3, 4];
                case 3:
                    _a = _b.sent();
                    return [3, 4];
                case 4:
                    confirm1 = function (event) {
                        if (!checkRequiredFields()) {
                            return;
                        }
                        var $target = event.target;
                        var $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
                        if (!$button) {
                            return;
                        }
                        var method = methods[PaymentConfiguration.selectedProviderMethod()];
                        if (!method || PaymentConfiguration.selectedProvider() !== 'square') {
                            return;
                        }
                        squarePaymentFlow(context, method, orderService);
                    };
                    $qsAll('.square-btn', function ($button) { return $button.addEventListener('click', confirm1); });
                    $qsAll('.square-custom-btn-container', function ($paymentRequest) { return $paymentRequest.addEventListener('click', confirm1); });
                    return [2];
            }
        });
    });
}
function squarePaymentFlow(context, method, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, sourceId, verificationToken, transactionUpdate, transaction, order, payment, successURL;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    return [4, method.tokenize(context)];
                case 1:
                    _a = _b.sent(), sourceId = _a[0], verificationToken = _a[1], transactionUpdate = _a[2];
                    return [4, orderService.startTransaction(method.config.gateway, method.config.slug)];
                case 2:
                    transaction = _b.sent();
                    if (!!sourceId) return [3, 4];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete(transactionUpdate))];
                case 3:
                    _b.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 4: return [4, orderService.placeOrder(transaction)];
                case 5:
                    order = _b.sent();
                    if (!(order.result === 'failure')) return [3, 7];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 6:
                    _b.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 7: return [4, createSquarePayment(order, transaction, sourceId, verificationToken, 'card')];
                case 8:
                    payment = _b.sent();
                    if (!!payment.success) return [3, 10];
                    displaySquareError(payment.message);
                    return [4, orderService.setOrderStatus(order, transaction, {
                            paymentStatus: 'failed',
                            orderStatus: 'failed',
                            note: payment.message
                        })];
                case 9:
                    _b.sent();
                    store.dispatch(stopModalLoading());
                    transaction === null || transaction === void 0 ? void 0 : transaction.complete();
                    return [2];
                case 10:
                    saveCustomerToBrowser();
                    clearLocalSession();
                    successURL = orderService.getOrderRedirect(order);
                    if (!window.top) return [3, 12];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 11:
                    _b.sent();
                    window.top.location = successURL;
                    _b.label = 12;
                case 12: return [2];
            }
        });
    });
}
function displaySquareError(error) {
    $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    if (!error) {
        return;
    }
    var method = PaymentConfiguration.selectedProviderMethod();
    var $container = $qsAll("div.pp-pm-saved-option[data-provider=\"square\"][data-method=\"".concat(method, "\"][data-index=\"\"]"));
    $container.forEach(function ($el) {
        $el.insertAdjacentHTML('beforebegin', "<div class=\"pp-pm-error-text\"><span>".concat(error, "</span></div>"));
    });
    setTimeout(function () {
        $qsAll('.pp-pm-error-text', function ($el) { return $el.remove(); });
    }, 5000);
}
function createSquarePayment(order, transaction, sourceId, verificationToken, paymentMethod) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_18;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4, fetchHostWindowData('pp-create-square-payment', {
                            session: {
                                id: PeachPayOrder.sessionId()
                            },
                            transaction: {
                                id: (_a = transaction === null || transaction === void 0 ? void 0 : transaction.getId()) !== null && _a !== void 0 ? _a : '',
                                square: {
                                    source_id: sourceId,
                                    verification_token: verificationToken,
                                    payment_method_type: paymentMethod
                                }
                            },
                            order: {
                                id: order.order_id,
                                data: order
                            }
                        })];
                case 1:
                    response = _b.sent();
                    if (!response) {
                        transaction === null || transaction === void 0 ? void 0 : transaction.update({
                            paymentStatus: 'failed'
                        });
                        return [2, {
                                success: false
                            }];
                    }
                    if (!response.success) {
                        transaction === null || transaction === void 0 ? void 0 : transaction.update({
                            paymentStatus: 'failed',
                            note: response.message
                        });
                    }
                    return [2, response];
                case 2:
                    error_18 = _b.sent();
                    if (error_18 instanceof Error) {
                        captureSentryException(new Error("Failed to create Square payment"), {
                            'exception': error_18
                        });
                    }
                    transaction === null || transaction === void 0 ? void 0 : transaction.update({
                        paymentStatus: 'failed',
                        note: "Unknown error creating Square payment :: ".concat(JSON.stringify(error_18))
                    });
                    return [2, {
                            success: false
                        }];
                case 3: return [2];
            }
        });
    });
}
function squarePaymentRequestOptions() {
    var _a, _b;
    var paymentRequestOptions = {
        countryCode: (_b = (_a = MerchantConfiguration.general.wcLocationInfoData()) === null || _a === void 0 ? void 0 : _a.store_country) !== null && _b !== void 0 ? _b : 'US',
        currencyCode: MerchantConfiguration.currency.code(),
        requestBillingContact: true,
        requestShippingContact: false,
        lineItems: squarePaymentRequestLineItems(),
        discounts: squarePaymentRequestDiscountOptions(),
        taxLineItems: [
            {
                label: getLocaleText('Tax'),
                amount: DefaultCart.totalTax().toFixed(2)
            }
        ],
        total: {
            label: getLocaleText('Total'),
            amount: DefaultCart.total().toFixed(2)
        }
    };
    if (!Carts.virtual()) {
        paymentRequestOptions.requestShippingContact = true;
        paymentRequestOptions.shippingOptions = squarePaymentRequestShippingOptions();
        paymentRequestOptions.shippingLineItems = [
            {
                amount: DefaultCart.totalShipping().toFixed(2),
                label: getLocaleText('Shipping')
            }
        ];
        paymentRequestOptions.shippingContact = {
            addressLines: [
                PeachPayCustomer.shipping.address1(),
                PeachPayCustomer.shipping.address2(),
            ],
            city: PeachPayCustomer.shipping.city(),
            countryCode: PeachPayCustomer.shipping.country(),
            email: PeachPayCustomer.shipping.email(),
            familyName: PeachPayCustomer.shipping.lastName(),
            givenName: PeachPayCustomer.shipping.firstName(),
            phone: PeachPayCustomer.shipping.phone(),
            postalCode: PeachPayCustomer.shipping.postal(),
            state: PeachPayCustomer.shipping.state()
        };
    }
    return paymentRequestOptions;
}
function squarePaymentRequestEventUpdate() {
    var update = {
        lineItems: squarePaymentRequestLineItems(),
        discounts: squarePaymentRequestDiscountOptions(),
        taxLineItems: [
            {
                label: getLocaleText('Tax'),
                amount: DefaultCart.totalTax().toFixed(2)
            }
        ],
        total: {
            label: getLocaleText('Total'),
            amount: DefaultCart.total().toFixed(2)
        }
    };
    if (!Carts.virtual()) {
        update.shippingOptions = squarePaymentRequestShippingOptions();
        update.shippingLineItems = [
            {
                amount: DefaultCart.totalShipping().toFixed(2),
                label: getLocaleText('Shipping')
            }
        ];
    }
    return update;
}
function squarePaymentRequestLineItems() {
    var _a, _b, _c;
    var lineItems = new Array();
    for (var _i = 0, _d = DefaultCart.contents(); _i < _d.length; _i++) {
        var cartItem = _d[_i];
        lineItems.push({
            label: cartItem.name + ' × ' + cartItemQuantity(cartItem),
            amount: (Number.parseFloat((_a = cartItem.display_price) !== null && _a !== void 0 ? _a : cartItem.price) * cartItemQuantity(cartItem)).toFixed(2),
            imageUrl: (_c = (_b = cartItem.image) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : undefined
        });
    }
    return lineItems;
}
function squarePaymentRequestShippingOptions() {
    var _a;
    var options = new Array();
    for (var _i = 0, _b = DefaultCart.shippingMethods(); _i < _b.length; _i++) {
        var method = _b[_i];
        if (DefaultCart.selectedShippingMethod() === method.id) {
            options.push({
                id: (_a = method.id) !== null && _a !== void 0 ? _a : '',
                label: method.title,
                amount: method.total.toFixed(2)
            });
        }
    }
    return options;
}
function squarePaymentRequestDiscountOptions() {
    var discounts = new Array();
    for (var _i = 0, _a = Object.entries(DefaultCart.couponRecord()); _i < _a.length; _i++) {
        var _b = _a[_i], coupon = _b[0], amount = _b[1];
        if (!amount) {
            continue;
        }
        discounts.push({
            id: coupon,
            amount: amount.toFixed(2),
            label: coupon
        });
    }
    return discounts;
}
function getDescription() {
    return "\n<img style=\"display: block; text-align: left; height: 1.5rem; \" src=\"img/marks/apple-pay.svg\">\n<p style=\"text-align: left; margin: 0.5rem 0;\">".concat(getLocaleText('Apple Pay selected for checkout.'), "</p>\n<hr/>\n<p style=\"text-align: left; margin: 0.5rem 0 0;\" class=\"muted\">").concat(getLocaleText('Another step will appear after submitting your order to complete your purchase details.'), "<p>\n    ");
}
function getButton() {
    var $temp = document.createElement('div');
    $temp.innerHTML = "<button class=\"square-apay-btn\">\n        <style>\n            .square-apay-btn{\n                background-image: url('img/apple-pay-button.png');\n                background-color: black;\n                border: none; height: 55px;\n                width: 15rem;\n                background-size: contain;\n                border-radius: 0.2rem;\n                background-position: center;\n            }\n\n            .square-apay-btn:hover{\n                opacity: 0.8;\n            }\n        </style>\n    </button>";
    return $temp.querySelector('button');
}
function getDescription1() {
    return "\n<img style=\"display: block; text-align: left; height: 1.5rem; \" src=\"img/marks/google-pay.svg\">\n<p style=\"text-align: left; margin: 0.5rem 0;\">".concat(getLocaleText('Google Pay selected for checkout.'), "</p>\n<hr/>\n<p style=\"text-align: left; margin: 0.5rem 0 0;\" class=\"muted\">").concat(getLocaleText('Another step will appear after submitting your order to complete your purchase details.'), "<p>\n    ");
}
function setupPeachpayButton() {
    store.subscribe(function () {
        renderButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.page(), Environment.modalUI.loadingMode(), Carts.total());
        renderButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
    });
}
function renderButtonDisplay(provider, page, loadingMode, allCartsTotal) {
    if (provider === 'peachpay' && (page === 'payment' || page === 'returning') && allCartsTotal > 0) {
        $qsAll('.pp-js-peachpay-order-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-js-peachpay-order-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (provider === 'peachpay' && (page === 'payment' || page === 'returning') && allCartsTotal > 0 && loadingMode !== 'loading') {
        $qsAll('.pp-js-peachpay-order-btn', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-js-peachpay-order-btn', function ($element) { return $element.classList.add('hide'); });
    }
}
function renderButtonLoading(provider, mode) {
    if (provider !== 'peachpay') {
        return;
    }
    if (mode === 'finished') {
        $qsAll('.pp-js-peachpay-order-btn', function ($element) { return $element.disabled = false; });
    }
    else {
        $qsAll('.pp-js-peachpay-order-btn', function ($element) { return $element.disabled = true; });
    }
    if (mode === 'loading') {
        $qsAll('.pp-btn-spinner-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-btn-spinner-container ', function ($element) { return $element.classList.add('hide'); });
    }
    if (mode === 'processing') {
        $qsAll('.pp-js-peachpay-order-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('Processing'); });
        $qsAll('.pp-js-peachpay-order-btn-spinner', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-js-peachpay-order-btn > .button-text', function ($element) { return $element.innerHTML = "".concat(getLocaleText('Pay'), " ").concat(formatCurrencyString(DefaultCart.total())); });
        $qsAll('.pp-js-peachpay-order-btn-spinner', function ($element) { return $element.classList.add('hide'); });
    }
}
var buttonListeners = {};
function addButtonListener(method, listener) {
    buttonListeners[method] = listener;
}
function defaultOrderFlow(orderService, transaction, extraFormData) {
    if (extraFormData === void 0) { extraFormData = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var orderResponse, successURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    return [4, orderService.placeOrder(transaction, extraFormData)];
                case 1:
                    orderResponse = _a.sent();
                    if (!(orderResponse.result === 'failure')) return [3, 3];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete())];
                case 2:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
                case 3:
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: ''
                    }));
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    if (!window.top) return [3, 5];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            order: orderResponse,
                            paymentStatus: 'on-hold',
                            orderStatus: 'on-hold',
                            note: 'We do not track the status after on-hold for this Payment Method.'
                        }))];
                case 4:
                    _a.sent();
                    window.top.location = successURL;
                    _a.label = 5;
                case 5: return [2];
            }
        });
    });
}
function initPurchaseOrderSupport(orderService) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.PURCHASE_ORDER)) {
        return;
    }
    injectPurchaseOrderFields();
    addButtonListener(getPurchaseOrderMethodConfiguration().slug, function (event) { return __awaiter(_this, void 0, void 0, function () {
        var $form, $input, transaction, purchaseOrderNumber, $target, $button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $form = null;
                    $input = null;
                    return [4, orderService.startTransaction('peachpay', getPurchaseOrderMethodConfiguration().slug)];
                case 1:
                    transaction = _a.sent();
                    if (Environment.customer.existing()) {
                        $form = $qs('#pp-pms-existing form.pp-purchase-order-field');
                        $input = $qs('#pp-pms-existing input[name="purchase-order"]');
                    }
                    else {
                        $form = $qs('#pp-pms-new form.pp-purchase-order-field');
                        $input = $qs('#pp-pms-new input[name="purchase-order"]');
                    }
                    if (!(!$input || !$form)) return [3, 3];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            note: 'Failed to find the Purchase Order input and form.'
                        }))];
                case 2:
                    _a.sent();
                    return [2];
                case 3:
                    purchaseOrderNumber = $input.value;
                    if (!(!purchaseOrderNumber || !$form.checkValidity())) return [3, 5];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            note: 'Purchase Order number was missing or invalid.'
                        }))];
                case 4:
                    _a.sent();
                    if (Environment.modalUI.page() === 'returning') {
                        setTimeout(function () {
                            openSlideUpView('payment');
                        }, 500);
                        setTimeout(function () {
                            $form === null || $form === void 0 ? void 0 : $form.reportValidity();
                        }, 200);
                    }
                    else {
                        $form.reportValidity();
                    }
                    return [2];
                case 5:
                    $target = event.target;
                    $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
                    if (!!$button) return [3, 7];
                    return [4, (transaction === null || transaction === void 0 ? void 0 : transaction.complete({
                            note: 'Purchase Order button was not found.'
                        }))];
                case 6:
                    _a.sent();
                    return [2];
                case 7:
                    transaction === null || transaction === void 0 ? void 0 : transaction.update({
                        purchaseOrder: {
                            purchase_order_number: purchaseOrderNumber
                        }
                    });
                    defaultOrderFlow(orderService, transaction, {
                        'purchase_order_number': purchaseOrderNumber
                    });
                    return [2];
            }
        });
    }); });
}
function getPurchaseOrderMethodConfiguration() {
    return {
        name: getFieldName(),
        gateway: 'peachpay_purchase_order',
        slug: 'purchase_order',
        description: "<span>".concat(getDescription2(), "</span>"),
        reusable: false,
        requireInput: true,
        showName: true,
        assets: {
            title: {
                src: 'img/marks/purchase-order.svg'
            },
            badge: {
                src: 'img/marks/purchase-order.svg'
            }
        },
        supports: {
            minimumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.PURCHASE_ORDER, 'peachpay_purchase_order', 'min'),
            maximumTotal: getCurrentlyUsedTransactionThreshold(FeatureFlag.PURCHASE_ORDER, 'peachpay_purchase_order', 'max'),
            currencies: [
                'ALL'
            ],
            productTypes: [],
            virtualProducts: true,
            shippingMethods: [],
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initCODSupport(orderService) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.COD_PAYMENT)) {
        return;
    }
    addButtonListener(getCODMethodConfiguration().slug, function () { return __awaiter(_this, void 0, void 0, function () {
        var transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, orderService.startTransaction('peachpay_woocommerce', getCODMethodConfiguration().slug)];
                case 1:
                    transaction = _a.sent();
                    return [4, defaultOrderFlow(orderService, transaction)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); });
}
function getCODMethodConfiguration() {
    return {
        name: getTitle(),
        slug: 'cod',
        gateway: 'cod',
        description: getDescription3(),
        reusable: false,
        showName: true,
        assets: {
            title: {
                src: 'img/marks/cash.svg'
            },
            badge: {
                src: 'img/marks/cash.svg'
            }
        },
        supports: {
            currencies: [
                'ALL'
            ],
            productTypes: [],
            virtualProducts: getVirtualProductSupport(),
            shippingMethods: getShippingMethods(),
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initChequeSupport(orderService) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.CHEQUE_PAYMENT)) {
        return;
    }
    addButtonListener(getChequeMethodConfiguration().slug, function () { return __awaiter(_this, void 0, void 0, function () {
        var transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, orderService.startTransaction('peachpay_woocommerce', getChequeMethodConfiguration().slug)];
                case 1:
                    transaction = _a.sent();
                    return [4, defaultOrderFlow(orderService, transaction)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); });
}
function getChequeMethodConfiguration() {
    return {
        name: getTitle1(),
        slug: 'cheque',
        gateway: 'cheque',
        description: getDescription4(),
        reusable: false,
        showName: true,
        assets: {
            title: {
                src: 'img/marks/check.svg'
            },
            badge: {
                src: 'img/marks/check.svg'
            }
        },
        supports: {
            currencies: [
                'ALL'
            ],
            productTypes: [],
            virtualProducts: getVirtualProductSupport1(),
            shippingMethods: getShippingMethods1(),
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initBacsSupport(orderService) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.BACS_PAYMENT)) {
        return;
    }
    addButtonListener(getBacsMethodConfiguration().slug, function () { return __awaiter(_this, void 0, void 0, function () {
        var transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, orderService.startTransaction('peachpay_woocommerce', getBacsMethodConfiguration().slug)];
                case 1:
                    transaction = _a.sent();
                    return [4, defaultOrderFlow(orderService, transaction)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); });
}
function getBacsMethodConfiguration() {
    return {
        name: getTitle2(),
        slug: 'bacs',
        gateway: 'bacs',
        description: getDescription5(),
        reusable: false,
        showName: true,
        assets: {
            title: {
                src: 'img/marks/transfer.svg'
            },
            badge: {
                src: 'img/marks/transfer.svg'
            }
        },
        supports: {
            currencies: [
                'ALL'
            ],
            productTypes: [],
            virtualProducts: getVirtualProductSupport2(),
            shippingMethods: getShippingMethods2(),
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initPeachPayMethods(orderService) {
    setupPeachpayButton();
    registerMethods();
    initPurchaseOrderSupport(orderService);
    initCODSupport(orderService);
    initChequeSupport(orderService);
    initBacsSupport(orderService);
    $qsAll('.pp-js-peachpay-order-btn', function ($el) { return $el.addEventListener('click', function (event) {
        var requiredFieldsVerification = checkRequiredFields();
        if (Environment.modalUI.page() === 'returning' && !requiredFieldsVerification)
            return;
        var $target = event.target;
        var $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
        if (!$button)
            return;
        var listener = buttonListeners[PaymentConfiguration.selectedProviderMethod()];
        if (listener)
            listener(event);
    }); });
}
function registerMethods() {
    var methods = {};
    if (Feature.enabled(FeatureFlag.PURCHASE_ORDER)) {
        var config = getPurchaseOrderMethodConfiguration();
        methods[config.slug] = config;
    }
    if (Feature.enabled(FeatureFlag.COD_PAYMENT)) {
        var config1 = getCODMethodConfiguration();
        methods[config1.slug] = config1;
    }
    if (Feature.enabled(FeatureFlag.CHEQUE_PAYMENT)) {
        var config2 = getChequeMethodConfiguration();
        methods[config2.slug] = config2;
    }
    if (Feature.enabled(FeatureFlag.BACS_PAYMENT)) {
        var config3 = getBacsMethodConfiguration();
        methods[config3.slug] = config3;
    }
    store.dispatch(registerPaymentProvider({
        'peachpay': {
            'methods': methods
        }
    }));
}
function injectPurchaseOrderFields() {
    var existingCustomerDiv = $qs('#pp-pms-existing div.pp-pm-saved-option[data-provider="peachpay"][data-method="purchase_order"]');
    var newCustomerDiv = $qs('#pp-pms-new div.pp-pm-saved-option[data-provider="peachpay"][data-method="purchase_order"]');
    existingCustomerDiv === null || existingCustomerDiv === void 0 ? void 0 : existingCustomerDiv.insertAdjacentHTML('beforeend', "<form class=\"pp-purchase-order-field\">\n\t\t\t<input id=\"pp-existing-purchase-order-input\" name=\"purchase-order\" type=\"text\" class=\"text-input\" placeholder=\" \" required>\n\t\t\t<label for=\"pp-existing-purchase-order-input\" class=\"pp-form-label\">".concat(getFieldName(), "</label>\n\t\t</form>"));
    newCustomerDiv === null || newCustomerDiv === void 0 ? void 0 : newCustomerDiv.insertAdjacentHTML('beforeend', "<form class=\"pp-purchase-order-field\">\n\t\t\t<input id=\"pp-new-purchase-order-input\" name=\"purchase-order\" type=\"text\" class=\"text-input\" placeholder=\" \" required>\n\t\t\t<label for=\"pp-new-purchase-order-input\" class=\"pp-form-label\">".concat(getFieldName(), "</label>\n\t\t</form>"));
}
function getFieldName() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.PURCHASE_ORDER, 'field_name')) !== null && _a !== void 0 ? _a : getLocaleText('Purchase order');
}
function getDescription2() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.PURCHASE_ORDER, 'description')) !== null && _a !== void 0 ? _a : '';
}
function getTitle() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.COD_PAYMENT, 'title')) !== null && _a !== void 0 ? _a : getLocaleText('Cheque');
}
function getDescription3() {
    var _a, _b;
    var description = (_a = Feature.metadata(FeatureFlag.COD_PAYMENT, 'description')) !== null && _a !== void 0 ? _a : getLocaleText('Pay with a cheque');
    var instructions = (_b = Feature.metadata(FeatureFlag.COD_PAYMENT, 'instructions')) !== null && _b !== void 0 ? _b : '';
    if (instructions) {
        return "\n\t\t\t<span>".concat(description, "</span>\n\t\t\t</br></br>\n\t\t\t<span>").concat(instructions, "</span>\n\t\t");
    }
    else {
        return description;
    }
}
function getShippingMethods() {
    var methods = Feature.metadata(FeatureFlag.COD_PAYMENT, 'enable_for_shipping_methods');
    if (typeof methods !== 'object')
        return [];
    return methods;
}
function getVirtualProductSupport() {
    return !!Feature.metadata(FeatureFlag.COD_PAYMENT, 'enabled_for_virtual');
}
function getTitle1() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.CHEQUE_PAYMENT, 'title')) !== null && _a !== void 0 ? _a : getLocaleText('Cheque');
}
function getDescription4() {
    var _a, _b;
    var description = (_a = Feature.metadata(FeatureFlag.CHEQUE_PAYMENT, 'description')) !== null && _a !== void 0 ? _a : getLocaleText('Pay with a cheque');
    var instructions = (_b = Feature.metadata(FeatureFlag.CHEQUE_PAYMENT, 'instructions')) !== null && _b !== void 0 ? _b : '';
    if (instructions) {
        return "\n\t\t\t<span>".concat(description, "</span>\n\t\t\t</br></br>\n\t\t\t<span>").concat(instructions, "</span>\n\t\t");
    }
    else {
        return description;
    }
}
function getShippingMethods1() {
    var methods = Feature.metadata(FeatureFlag.CHEQUE_PAYMENT, 'enable_for_shipping_methods');
    if (typeof methods !== 'object')
        return [];
    return methods;
}
function getVirtualProductSupport1() {
    return !!Feature.metadata(FeatureFlag.CHEQUE_PAYMENT, 'enabled_for_virtual');
}
function getTitle2() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.BACS_PAYMENT, 'title')) !== null && _a !== void 0 ? _a : getLocaleText('Wire/Bank Transfer');
}
function getDescription5() {
    var _a, _b;
    var description = (_a = Feature.metadata(FeatureFlag.BACS_PAYMENT, 'description')) !== null && _a !== void 0 ? _a : getLocaleText('Payment via Wire/Bank Transfer');
    var instructions = (_b = Feature.metadata(FeatureFlag.BACS_PAYMENT, 'instructions')) !== null && _b !== void 0 ? _b : '';
    if (instructions) {
        return "\n\t\t\t<span>".concat(description, "</span>\n\t\t\t</br></br>\n\t\t\t<span>").concat(instructions, "</span>\n\t\t");
    }
    else {
        return description;
    }
}
function getShippingMethods2() {
    var methods = Feature.metadata(FeatureFlag.BACS_PAYMENT, 'enable_for_shipping_methods');
    if (typeof methods !== 'object')
        return [];
    return methods;
}
function getVirtualProductSupport2() {
    return !!Feature.metadata(FeatureFlag.BACS_PAYMENT, 'enabled_for_virtual');
}
function initNoPaymentProviders() {
    store.subscribe(function () {
        if (PaymentConfiguration.eligibleMethodCount() === 0) {
            safeDispatch(function () {
                store.dispatch(setOrderError(getLocaleText('The merchant has not enabled any payment methods')));
            });
        }
    });
}
function initMerchantLogo() {
    var _a, _b;
    var logoSrc = Feature.metadata(FeatureFlag.MERCHANT_LOGO, 'logo_src');
    if (Feature.enabled(FeatureFlag.MERCHANT_LOGO) && logoSrc) {
        $qsAll('.pp-merchant-logo-container', function ($el) {
            $el.insertAdjacentHTML('afterbegin', "<img class=\"pp-merchant-logo\" src=\"".concat(logoSrc, "\">"));
            $el.style.opacity = '1';
            $el.classList.remove('hide');
        });
        (_a = $qs('#pp-checkout-status-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('center');
        (_b = $qs('#pp-checkout-status-container')) === null || _b === void 0 ? void 0 : _b.classList.add('merchant-logo');
    }
    else {
        $qsAll('.pp-merchant-logo-container', function ($el) {
            $el.style.opacity = '0';
        });
    }
}
function initWatchWindowSize() {
    var _a;
    var resizeTimer = -1;
    try {
        (_a = window.top) === null || _a === void 0 ? void 0 : _a.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                var _a, _b;
                var innerWidth = (_b = (_a = window === null || window === void 0 ? void 0 : window.top) === null || _a === void 0 ? void 0 : _a.innerWidth) !== null && _b !== void 0 ? _b : null;
                if (innerWidth === null) {
                    return;
                }
                store.dispatch(updateEnvironment({
                    customerIsMobile: innerWidth < 900
                }));
            }, 100);
        });
    }
    catch (_b) { }
}
(function () {
    var _this = this;
    onWindowMessage('init', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var pluginCapabilities, orderService;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initSentry(message);
                    GLOBAL.phpData = message.phpData;
                    initLanguage(message);
                    store.dispatch(updateMerchantHostName(message.merchantHostname));
                    installCustomerFormFields(message);
                    installCustomerBillingFields(message);
                    loadSession();
                    store.dispatch(updateMerchantHostName(message.merchantHostname));
                    store.dispatch(updateMerchantName(message.phpData.merchant_name));
                    store.dispatch(updateMerchantId(message.phpData.merchant_id));
                    store.dispatch(setFeatureSupport(message.phpData.feature_support));
                    store.dispatch(updateLanguage(message.phpData.language === 'detect-from-page' ? message.pageLanguage : message.phpData.language));
                    store.dispatch(updateEnvironment({
                        pluginIsTestMode: Boolean(message.isTestMode),
                        pluginPageType: determinePageType(message.isCartPage, message.isCheckoutPage, message.isShopPage),
                        customerIsMobile: message.isMobile,
                        pluginButtonColor: message.phpData.button_color,
                        pluginVersion: message.phpData.version
                    }));
                    initOneClickUpsell();
                    initDeliveryDate();
                    initMetrics();
                    initCart();
                    initSummary(message);
                    initCouponInput(message);
                    initGiftCardInput(message);
                    initShipping(message);
                    initShippingForm();
                    initCustomer(message);
                    initCurrency(message);
                    initMerchantAccount(message);
                    initVAT(message);
                    initRelatedProducts();
                    initAdditionalFields(message);
                    initCurrencySwitcher();
                    initPaymentMethods();
                    initModal(message);
                    initAddressAutocomplete(message);
                    initCustomOrderMessaging();
                    installMerchantCustomerAccountFormFields();
                    initMerchantLogo();
                    initWatchWindowSize();
                    return [4, getPluginCapabilities()];
                case 1:
                    pluginCapabilities = _a.sent();
                    orderService = getOrderService();
                    initStripePaymentProvider(orderService, pluginCapabilities);
                    initPayPalPaymentProvider(orderService, pluginCapabilities);
                    initSquarePaymentProvider(orderService, pluginCapabilities);
                    initAmazonPayPaymentProvider(orderService);
                    initPeachPayMethods(orderService);
                    initFreeOrderSupport(orderService);
                    initNoPaymentProviders();
                    onWindowMessage('pp-one-click-loaded', function () { return __awaiter(_this, void 0, void 0, function () {
                        var selectedMethod;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, loadCustomer()];
                                case 1:
                                    _b.sent();
                                    store.dispatch(startModalLoading());
                                    if (!store.getState().peachPayCustomer.preferred_payment_method) {
                                        store.dispatch(updateEnvironment({
                                            modalPageType: 'info',
                                            customerExists: false
                                        }));
                                    }
                                    selectedMethod = PaymentConfiguration.checkEligibleOrFindAlternate(PeachPayCustomer.preferredPaymentMethod());
                                    if (selectedMethod) {
                                        store.dispatch(setPaymentMethod(selectedMethod));
                                    }
                                    else {
                                        store.dispatch(setOrderError(getLocaleText('There are no eligible or active payment methods available for this order.')));
                                    }
                                    store.dispatch(initilizePrimaryPaymentMethodUI());
                                    return [4, requestCartCalculation()];
                                case 2:
                                    _b.sent();
                                    store.dispatch(stopModalLoading());
                                    (_a = self.parent) === null || _a === void 0 ? void 0 : _a.postMessage('pp-loaded', '*');
                                    return [2];
                            }
                        });
                    }); });
                    installOneClickCheckout(message.isTestMode);
                    return [2];
            }
        });
    }); });
})();
function getPluginCapabilities() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4, fetch("".concat(Environment.apiURL(), "api/v1/plugin/capabilities"), {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                domain: MerchantConfiguration.hostName(),
                                merchant_id: MerchantConfiguration.id()
                            })
                        })];
                case 1:
                    response = _b.sent();
                    return [4, response.json()];
                case 2:
                    data = _b.sent();
                    if (!data.success) {
                        return [2, null];
                    }
                    return [2, data.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
