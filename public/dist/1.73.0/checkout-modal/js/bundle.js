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
var DispatchActionType;
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
})(DispatchActionType || (DispatchActionType = {}));
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
function createDispatchUpdate(type) {
    return function (payload) { return ({
        type: type,
        payload: payload
    }); };
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
var peachpayi18n = {
    "ar": {
        "+ ADD A COUPON CODE": "+ أضف رمز القسيمة",
        "+ NEW CARD": "+ بطاقة جديدة",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ استرداد بطاقة الهدايا / رصيد المتجر",
        ", ": "و",
        "ADD": "يضيف",
        "Add": "يضيف",
        "Additional Information": "معلومات إضافية",
        "After selecting pay you will be redirected to complete your payment.": "بعد اختيار الدفع ، ستتم إعادة توجيهك لإكمال الدفع.",
        "Apartment": "شقة",
        "Billing": "الفواتير",
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
        "Different shipping details?": "تفاصيل الشحن المختلفة؟",
        "Edit": "تعديل",
        "Email": "بريد الالكتروني",
        "Email or Username": "البريد الإلكتروني أو اسم المستخدم",
        "Exit Checkout": "الخروج من الخروج",
        "First name": "الاسم الأول",
        "First renewal": "التجديد الأول",
        "Gift card number": "رقم بطاقة الهدية",
        "Go Back": "عُد",
        "I verify that the country I have entered is the one I reside in": "أتحقق من أن البلد الذي أدخلته هو البلد الذي أقيم فيه",
        "Initial Shipment": "الشحنة الأولية",
        "Last name": "الكنية",
        "Login": "تسجيل الدخول",
        "My order": "طلبي",
        "No Thanks": "لا شكرا",
        "Order notes": "ترتيب ملاحظات",
        "Password": "كلمه السر",
        "Pay": "دفع",
        "Pay with Card": "الدفع بالبطاقة",
        "Pay with PayPal": "الدفع بواسط باى بال",
        "Pay with a cheque": "ادفع بشيك",
        "Payment": "قسط",
        "Payment via Wire/Bank Transfer": "الدفع عن طريق التحويل البنكي / البنكي",
        "Personal": "الشخصية",
        "Phone number": "رقم الهاتف",
        "Place Purchase Order": "تقديم طلب الشراء",
        "Place order": "مكان الامر",
        "Please go back and try again. Missing required field": "الرجاء العودة والمحاولة مجددا. حقل مطلوب مفقود",
        "Postal code": "الرمز البريدي",
        "Processing": "يعالج",
        "Province": "المحافظة",
        "Purchase Order": "أمر شراء",
        "Ready to check out?": "هل أنت جاهز للمغادرة؟",
        "Recurring total": "المجموع المتكرر",
        "Register": "يسجل",
        "Remove": "إزالة",
        "Secured by": "بضمان",
        "Select a Province": "اختر المحافظة",
        "Select a State": "حدد ولاية",
        "Select a country": "اختر دولة",
        "Send to": "ارسل إلى",
        "Ship to": "سافر على متن سفينة لِـ",
        "Shipping": "شحن",
        "Sorry, something went wrong. Please refresh the page and try again.": "عذرا، هناك خطأ ما. يرجى تحديث الصفحة وحاول مرة أخرى.",
        "Sorry, this store does not ship to your location.": "عذرا ، هذا المتجر لا يشحن إلى موقعك.",
        "State": "حالة",
        "Street address": ".عنوان الشارع",
        "Subtotal": "المجموع الفرعي",
        "Tax": "ضريبة",
        "Test mode: customers cannot see PeachPay": "وضع الاختبار: لا يمكن للعملاء رؤية PeachPay",
        "There are no eligible or active payment methods available for this order.": "لا توجد طرق دفع مؤهلة أو نشطة متاحة لهذا الطلب.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "طريقة الدفع هذه لا تدعم العملة المحددة ، وعند النقر فوق هذه الرسالة سيتم التبديل إلى العملة",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "طريقة الدفع هذه لا تدعم العملة المحددة. عند تحديد هذا ، سيتم التبديل إلى العملة",
        "This payment method does not support the selected currency. Please switch currencies.": "طريقة الدفع هذه لا تدعم العملة المحددة. يرجى تبديل العملات.",
        "Total": "المجموع",
        "Unknown order error occurred": "حدث خطأ طلب غير معروف",
        "VIEW SAVED CARDS": "عرض البطاقات المحفوظة",
        "Verified": "تم التحقق",
        "View options": "عرض الخيارات",
        "Wire/Bank Transfer": "حوالة مصرفية / بنكية",
        "You entered an invalid coupon code": "لقد أدخلت رمز قسيمة غير صالح",
        "You entered an invalid gift card": "لقد أدخلت بطاقة هدية غير صالحة",
        "You may also like...": "ربما يعجبك أيضا...",
        "You might also like...": "قد يعجبك ايضا...",
        "additional": "إضافي",
        "and": "و",
        "coupon": "قسيمة",
        "info": "معلومات",
        "payment": "دفع",
        "privacy policy": "سياسة خاصة",
        "shipping": "الشحن",
        "terms": "مصلحات",
        "terms and conditions": "الأحكام والشروط",
        "the": "ال",
        "the store's": "المتجر"
    },
    "bg-BG": {
        "+ ADD A COUPON CODE": "+ ДОБАВЯНЕ НА КОД НА КУПОН",
        "+ NEW CARD": "+ НОВА КАРТА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ИЗКУПЕТЕ КАРТА ЗА ПОДАРЪК/КРЕДИТ ЗА МАГАЗИН",
        ", ": ",",
        "ADD": "ДОБАВЯНЕ",
        "Add": "Добавете",
        "Additional Information": "Допълнителна информация",
        "After selecting pay you will be redirected to complete your payment.": "След като изберете плащане, ще бъдете пренасочени да завършите плащането си.",
        "Apartment": "Апартамент",
        "Billing": "Таксуване",
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
        "Different shipping details?": "Различни данни за доставка?",
        "Edit": "редактиране",
        "Email": "електронна поща",
        "Email or Username": "Имейл или потребителско име",
        "Exit Checkout": "Излезте от касата",
        "First name": "Първо име",
        "First renewal": "Първо подновяване",
        "Gift card number": "Номер на карта за подарък",
        "Go Back": "Върни се",
        "I verify that the country I have entered is the one I reside in": "Потвърждавам, че държавата, в която съм влязъл, е тази, в която пребивавам",
        "Initial Shipment": "Първоначално изпращане",
        "Last name": "Фамилия",
        "Login": "Влизам",
        "My order": "Моята поръчка",
        "No Thanks": "Не благодаря",
        "Order notes": "Бележки за поръчката",
        "Password": "парола",
        "Pay": "Плати",
        "Pay with Card": "Плащане с карта",
        "Pay with PayPal": "Платете с PayPal",
        "Pay with a cheque": "Платете с чек",
        "Payment": "Плащане",
        "Payment via Wire/Bank Transfer": "Плащане чрез банков превод",
        "Personal": "Лични",
        "Phone number": "Телефонен номер",
        "Place Purchase Order": "Направете поръчка за покупка",
        "Place order": "Поръчай",
        "Please go back and try again. Missing required field": "Моля, върнете се и опитайте отново. Липсва задължително поле",
        "Postal code": "Пощенски код",
        "Processing": "Обработка",
        "Province": "провинция",
        "Purchase Order": "Поръчка",
        "Ready to check out?": "Готови ли сте да проверите?",
        "Recurring total": "Повтарящо се общо",
        "Register": "Регистрирам",
        "Remove": "Премахване",
        "Secured by": "Осигурен от",
        "Select a Province": "Изберете провинция",
        "Select a State": "Изберете държава",
        "Select a country": "Изберете държава",
        "Send to": "Изпрати на",
        "Ship to": "Изпратете до",
        "Shipping": "Доставка",
        "Sorry, something went wrong. Please refresh the page and try again.": "Съжалявам нещо се обърка. Моля, опреснете страницата и опитайте отново.",
        "Sorry, this store does not ship to your location.": "За съжаление този магазин не доставя до вашето местоположение.",
        "State": "състояние",
        "Street address": "Адрес на улица",
        "Subtotal": "Междинна сума",
        "Tax": "данък",
        "Test mode: customers cannot see PeachPay": "Тестов режим: клиентите не могат да виждат PeachPay",
        "There are no eligible or active payment methods available for this order.": "Няма налични подходящи или активни методи на плащане за тази поръчка.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Този начин на плащане не поддържа избраната валута, при щракване върху това съобщение валутата ще премине към",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Този начин на плащане не поддържа избраната валута. При избор на това валутата ще премине към",
        "This payment method does not support the selected currency. Please switch currencies.": "Този начин на плащане не поддържа избраната валута. Моля, сменете валутите.",
        "Total": "Обща сума",
        "Unknown order error occurred": "Възникна грешка при неизвестна поръчка",
        "VIEW SAVED CARDS": "ВИЖТЕ ЗАПАЗЕНИ КАРТИ",
        "Verified": "Потвърдено",
        "View options": "Вижте опциите",
        "Wire/Bank Transfer": "Банков превод",
        "You entered an invalid coupon code": "Въведохте невалиден код на талон",
        "You entered an invalid gift card": "Въведохте невалидна карта за подарък",
        "You may also like...": "Може да харесате още...",
        "You might also like...": "Може да харесате също и...",
        "additional": "допълнителен",
        "and": "и",
        "coupon": "купон",
        "info": "инфо",
        "payment": "плащане",
        "privacy policy": "политика за поверителност",
        "shipping": "доставка",
        "terms": "термини",
        "terms and conditions": "правила и условия",
        "the": "на",
        "the store's": "на магазина"
    },
    "ca": {
        "+ ADD A COUPON CODE": "+ AFEGUEIX UN CODI DE CUPON",
        "+ NEW CARD": "+ NOVA TARGETA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ BENEFICIA DE LA TARGETA REGAL/CREDIT DE LA BOTIGA",
        ", ": ",",
        "ADD": "AFEGIR",
        "Add": "Afegeix",
        "Additional Information": "Informació adicional",
        "After selecting pay you will be redirected to complete your payment.": "Després de seleccionar el pagament, se us redirigirà per completar el pagament.",
        "Apartment": "Apartament",
        "Billing": "Facturació",
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
        "Different shipping details?": "Diferents detalls d'enviament?",
        "Edit": "Edita",
        "Email": "Correu electrònic",
        "Email or Username": "Correu electrònic o nom d'usuari",
        "Exit Checkout": "Sortir de la caixa",
        "First name": "Nom",
        "First renewal": "Primera renovació",
        "Gift card number": "Número de targeta regal",
        "Go Back": "Torna",
        "I verify that the country I have entered is the one I reside in": "Verifico que el país on he entrat és el on visc",
        "Initial Shipment": "Enviament inicial",
        "Last name": "Cognom",
        "Login": "iniciar Sessió",
        "My order": "El meu ordre",
        "No Thanks": "No gràcies",
        "Order notes": "Notes de comanda",
        "Password": "Contrasenya",
        "Pay": "Pagar",
        "Pay with Card": "Pagar amb Targeta",
        "Pay with PayPal": "Paga amb PayPal",
        "Pay with a cheque": "Paga amb un xec",
        "Payment": "Pagament",
        "Payment via Wire/Bank Transfer": "Pagament mitjançant transferència bancària",
        "Personal": "Personal",
        "Phone number": "Número de telèfon",
        "Place Purchase Order": "Fes la comanda de compra",
        "Place order": "Fes la comanda",
        "Please go back and try again. Missing required field": "Si us plau, torneu i torneu-ho a provar. Falta el camp obligatori",
        "Postal code": "Codi Postal",
        "Processing": "Tramitació",
        "Province": "Província",
        "Purchase Order": "Ordre de compra",
        "Ready to check out?": "Preparat per comprovar-ho?",
        "Recurring total": "Total recurrent",
        "Register": "Registra't",
        "Remove": "Eliminar",
        "Secured by": "Assegurat per",
        "Select a Province": "Seleccioneu una província",
        "Select a State": "Seleccioneu un estat",
        "Select a country": "Seleccioneu un país",
        "Send to": "Enviar a",
        "Ship to": "Enviament a",
        "Shipping": "Enviament",
        "Sorry, something went wrong. Please refresh the page and try again.": "Ho sentim, alguna cosa ha anat malament. Actualitzeu la pàgina i torneu-ho a provar.",
        "Sorry, this store does not ship to your location.": "Ho sentim, aquesta botiga no envia a la teva ubicació.",
        "State": "Estat",
        "Street address": "adreça",
        "Subtotal": "Subtotal",
        "Tax": "Impost",
        "Test mode: customers cannot see PeachPay": "Mode de prova: els clients no poden veure PeachPay",
        "There are no eligible or active payment methods available for this order.": "No hi ha mètodes de pagament elegibles o actius disponibles per a aquesta comanda.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Aquest mètode de pagament no admet la moneda seleccionada; en fer clic en aquest missatge, la moneda canviarà",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Aquesta forma de pagament no admet la moneda seleccionada. En seleccionar-ho, la moneda canviarà a",
        "This payment method does not support the selected currency. Please switch currencies.": "Aquesta forma de pagament no admet la moneda seleccionada. Si us plau, canvieu de moneda.",
        "Total": "Total",
        "Unknown order error occurred": "S'ha produït un error de comanda desconegut",
        "VIEW SAVED CARDS": "VISUALITZA TARGETES DESADES",
        "Verified": "Verificat",
        "View options": "Veure opcions",
        "Wire/Bank Transfer": "Transferència bancària",
        "You entered an invalid coupon code": "Heu introduït un codi de cupó no vàlid",
        "You entered an invalid gift card": "Has introduït una targeta regal no vàlida",
        "You may also like...": "També et pot agradar...",
        "You might also like...": "Potser també t'agrada...",
        "additional": "addicionals",
        "and": "i",
        "coupon": "cupó",
        "info": "informació",
        "payment": "pagament",
        "privacy policy": "política de privacitat",
        "shipping": "Enviament",
        "terms": "termes",
        "terms and conditions": "termes i condicions",
        "the": "el",
        "the store's": "de la botiga"
    },
    "cs-CZ": {
        "+ ADD A COUPON CODE": "+ PŘIDEJTE KÓD KUPÓNU",
        "+ NEW CARD": "+ NOVÁ KARTA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ UPLATNĚTE DÁRKOVOU KARTU/KREDIT OBCHOD",
        ", ": ",",
        "ADD": "PŘIDAT",
        "Add": "Přidat",
        "Additional Information": "dodatečné informace",
        "After selecting pay you will be redirected to complete your payment.": "Po výběru platby budete přesměrováni k dokončení platby.",
        "Apartment": "Byt",
        "Billing": "Fakturace",
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
        "Different shipping details?": "Různé dodací údaje?",
        "Edit": "Upravit",
        "Email": "E-mailem",
        "Email or Username": "E-mail nebo uživatelské jméno",
        "Exit Checkout": "Ukončete službu Checkout",
        "First name": "Jméno",
        "First renewal": "První obnovení",
        "Gift card number": "Číslo dárkové karty",
        "Go Back": "Vraťte se zpět",
        "I verify that the country I have entered is the one I reside in": "Ověřuji, že země, do které jsem zadal, je zemí, ve které bydlím",
        "Initial Shipment": "Počáteční zásilka",
        "Last name": "Příjmení",
        "Login": "Přihlásit se",
        "My order": "Moje objednávka",
        "No Thanks": "Ne, díky",
        "Order notes": "Poznámky k objednávce",
        "Password": "Heslo",
        "Pay": "Platit",
        "Pay with Card": "Platit kartou",
        "Pay with PayPal": "Plaťte přes PayPal",
        "Pay with a cheque": "Zaplaťte šekem",
        "Payment": "Způsob platby",
        "Payment via Wire/Bank Transfer": "Platba převodem/bankovním převodem",
        "Personal": "Osobní",
        "Phone number": "Telefonní číslo",
        "Place Purchase Order": "Zadat objednávku",
        "Place order": "Objednejte si",
        "Please go back and try again. Missing required field": "Vraťte se prosím zpět a zkuste to znovu. chybí povinné pole",
        "Postal code": "Poštovní směrovací číslo",
        "Processing": "zpracovává se",
        "Province": "Provincie",
        "Purchase Order": "Nákupní objednávka",
        "Ready to check out?": "Jste připraveni se přihlásit?",
        "Recurring total": "Opakující se celkem",
        "Register": "Registrovat",
        "Remove": "Odstranit",
        "Secured by": "Zabezpečeno",
        "Select a Province": "Vyberte provincii",
        "Select a State": "Vyberte stát",
        "Select a country": "Vyber zemi",
        "Send to": "Poslat komu",
        "Ship to": "Dopravit do",
        "Shipping": "Lodní doprava",
        "Sorry, something went wrong. Please refresh the page and try again.": "Promiň, něco se pokazilo. Obnovte stránku a zkuste to znovu.",
        "Sorry, this store does not ship to your location.": "Litujeme, tento obchod nedodává do vaší lokality.",
        "State": "Stát",
        "Street address": "adresa ulice",
        "Subtotal": "Mezisoučet",
        "Tax": "Daň",
        "Test mode: customers cannot see PeachPay": "Testovací režim: zákazníci nevidí PeachPay",
        "There are no eligible or active payment methods available for this order.": "Pro tuto objednávku nejsou k dispozici žádné způsobilé ani aktivní platební metody.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Tato platební metoda nepodporuje vybranou měnu, po kliknutí na tuto zprávu se měna přepne",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Tato platební metoda nepodporuje vybranou měnu. Při výběru této měny se přepne na",
        "This payment method does not support the selected currency. Please switch currencies.": "Tato platební metoda nepodporuje vybranou měnu. Změňte měny.",
        "Total": "Celkový",
        "Unknown order error occurred": "Došlo k neznámé chybě objednávky",
        "VIEW SAVED CARDS": "ZOBRAZIT ULOŽENÉ KARTY",
        "Verified": "Ověřeno",
        "View options": "Zobrazit možnosti",
        "Wire/Bank Transfer": "Bankovním převodem",
        "You entered an invalid coupon code": "Zadali jste neplatný kód kupónu",
        "You entered an invalid gift card": "Zadali jste neplatnou dárkovou kartu",
        "You may also like...": "Mohlo by se vám také líbit...",
        "You might also like...": "Může se vám také libit...",
        "additional": "další",
        "and": "a",
        "coupon": "kupón",
        "info": "info",
        "payment": "Způsob platby",
        "privacy policy": "Zásady ochrany osobních údajů",
        "shipping": "Lodní doprava",
        "terms": "podmínky",
        "terms and conditions": "pravidla a podmínky",
        "the": "a",
        "the store's": "obchody"
    },
    "da-DK": {
        "+ ADD A COUPON CODE": "+ TILFØJ EN KUPONKODE",
        "+ NEW CARD": "+ NYT KORT",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ INDLØS GAVEKORT/BUTIKSKREDIT",
        ", ": ",",
        "ADD": "TILFØJE",
        "Add": "Tilføje",
        "Additional Information": "Yderligere Information",
        "After selecting pay you will be redirected to complete your payment.": "Når du har valgt betaling, bliver du omdirigeret til at gennemføre din betaling.",
        "Apartment": "Lejlighed",
        "Billing": "Fakturering",
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
        "Different shipping details?": "Forskellige forsendelsesdetaljer?",
        "Edit": "Redigere",
        "Email": "E-mail",
        "Email or Username": "E-mail eller brugernavn",
        "Exit Checkout": "Afslut kassen",
        "First name": "Fornavn",
        "First renewal": "Første fornyelse",
        "Gift card number": "Gavekort nummer",
        "Go Back": "Gå tilbage",
        "I verify that the country I have entered is the one I reside in": "Jeg bekræfter, at det land, jeg har indtastet, er det, jeg bor i",
        "Initial Shipment": "Indledende forsendelse",
        "Last name": "Efternavn",
        "Login": "Log på",
        "My order": "Min bestilling",
        "No Thanks": "Nej tak",
        "Order notes": "Bestillingssedler",
        "Password": "Adgangskode",
        "Pay": "Betale",
        "Pay with Card": "Betal med kort",
        "Pay with PayPal": "Betal med PayPal",
        "Pay with a cheque": "Betal med en check",
        "Payment": "Betaling",
        "Payment via Wire/Bank Transfer": "Betaling via bankoverførsel",
        "Personal": "Personlig",
        "Phone number": "Telefonnummer",
        "Place Purchase Order": "Afgiv købsordre",
        "Place order": "Angiv bestilling",
        "Please go back and try again. Missing required field": "Gå venligst tilbage og prøv igen. Mangler obligatorisk felt",
        "Postal code": "Postnummer",
        "Processing": "Forarbejdning",
        "Province": "Provins",
        "Purchase Order": "Købsordre",
        "Ready to check out?": "Klar til at tjekke ud?",
        "Recurring total": "Tilbagevendende total",
        "Register": "Tilmeld",
        "Remove": "Fjerne",
        "Secured by": "Sikret af",
        "Select a Province": "Vælg en provins",
        "Select a State": "Vælg en stat",
        "Select a country": "Vælg et land",
        "Send to": "Send til",
        "Ship to": "Send til",
        "Shipping": "Forsendelse",
        "Sorry, something went wrong. Please refresh the page and try again.": "Undskyld, noget gik galt. Opdater venligst siden og prøv igen.",
        "Sorry, this store does not ship to your location.": "Beklager, denne butik sender ikke til din placering.",
        "State": "Stat",
        "Street address": "Vejnavn",
        "Subtotal": "Subtotal",
        "Tax": "Skat",
        "Test mode: customers cannot see PeachPay": "Testtilstand: kunder kan ikke se PeachPay",
        "There are no eligible or active payment methods available for this order.": "Der er ingen kvalificerede eller aktive betalingsmetoder tilgængelige for denne ordre.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Denne betalingsmetode understøtter ikke den valgte valuta, ved at klikke på denne meddelelse skifter valutaen til",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Denne betalingsmetode understøtter ikke den valgte valuta. Når du vælger dette, skifter valutaen til",
        "This payment method does not support the selected currency. Please switch currencies.": "Denne betalingsmetode understøtter ikke den valgte valuta. Skift venligst valuta.",
        "Total": "i alt",
        "Unknown order error occurred": "Ukendt ordrefejl opstod",
        "VIEW SAVED CARDS": "SE GEMTE KORT",
        "Verified": "Verificeret",
        "View options": "Se muligheder",
        "Wire/Bank Transfer": "Bankoverførsel",
        "You entered an invalid coupon code": "Du har indtastet en ugyldig kuponkode",
        "You entered an invalid gift card": "Du har indtastet et ugyldigt gavekort",
        "You may also like...": "Du vil måske også syntes om...",
        "You might also like...": "Du kunne måske også lide...",
        "additional": "ekstra",
        "and": "og",
        "coupon": "kupon",
        "info": "info",
        "payment": "betaling",
        "privacy policy": "Fortrolighedspolitik",
        "shipping": "Forsendelse",
        "terms": "vilkår",
        "terms and conditions": "vilkår og betingelser",
        "the": "det",
        "the store's": "butikkens"
    },
    "de-DE": {
        "+ ADD A COUPON CODE": "+ GUTSCHEINCODE HINZUFÜGEN",
        "+ NEW CARD": "+ NEUE KARTE",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ GESCHENKKARTE EINLÖSEN/GUTSCHRIFT AUFBEWAHREN",
        ", ": ",",
        "ADD": "HINZUFÜGEN",
        "Add": "Hinzufügen",
        "Additional Information": "zusätzliche Information",
        "After selecting pay you will be redirected to complete your payment.": "Nachdem Sie „Bezahlen“ ausgewählt haben, werden Sie weitergeleitet, um Ihre Zahlung abzuschließen.",
        "Apartment": "Wohnung",
        "Billing": "Abrechnung",
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
        "Different shipping details?": "Unterschiedliche Versanddetails?",
        "Edit": "Bearbeiten",
        "Email": "Email",
        "Email or Username": "E-Mail Adresse oder Benutzername",
        "Exit Checkout": "Kasse verlassen",
        "First name": "Vorname",
        "First renewal": "Erste Erneuerung",
        "Gift card number": "Geschenkkartennummer",
        "Go Back": "Geh zurück",
        "I verify that the country I have entered is the one I reside in": "Ich bestätige, dass das Land, in das ich eingereist bin, das Land ist, in dem ich wohne",
        "Initial Shipment": "Erstversand",
        "Last name": "Familienname, Nachname",
        "Login": "Anmeldung",
        "My order": "Meine Bestellung",
        "No Thanks": "Nein Danke",
        "Order notes": "Notizen bestellen",
        "Password": "Passwort",
        "Pay": "Zahlen",
        "Pay with Card": "Mit Karte bezahlen",
        "Pay with PayPal": "Zahlen Sie mit PayPal",
        "Pay with a cheque": "Zahlen Sie mit einem Scheck",
        "Payment": "Zahlung",
        "Payment via Wire/Bank Transfer": "Zahlung per Überweisung/Banküberweisung",
        "Personal": "persönlich",
        "Phone number": "Telefonnummer",
        "Place Purchase Order": "Bestellung aufgeben",
        "Place order": "Bestellung aufgeben",
        "Please go back and try again. Missing required field": "Bitte gehen Sie zurück und versuchen Sie es erneut. Pflichtfeld fehlt",
        "Postal code": "Postleitzahl",
        "Processing": "wird bearbeitet",
        "Province": "Provinz",
        "Purchase Order": "Bestellung",
        "Ready to check out?": "Bereit zum Auschecken?",
        "Recurring total": "Wiederkehrende Summe",
        "Register": "Registrieren",
        "Remove": "Entfernen",
        "Secured by": "Gesichert durch",
        "Select a Province": "Wählen Sie eine Provinz",
        "Select a State": "Wähle einen Staat",
        "Select a country": "Wähle ein Land",
        "Send to": "Senden an",
        "Ship to": "Ausliefern",
        "Shipping": "Versand",
        "Sorry, something went wrong. Please refresh the page and try again.": "Entschuldigung, etwas ist schief gelaufen. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",
        "Sorry, this store does not ship to your location.": "Entschuldigung, dieser Shop liefert nicht an Ihren Standort.",
        "State": "Bundesland",
        "Street address": "Adresse",
        "Subtotal": "Zwischensumme",
        "Tax": "Steuer",
        "Test mode: customers cannot see PeachPay": "Testmodus: Kunden können PeachPay nicht sehen",
        "There are no eligible or active payment methods available for this order.": "Für diese Bestellung sind keine zulässigen oder aktiven Zahlungsmethoden verfügbar.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Wenn Sie auf diese Meldung klicken, wird die Währung geändert",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Wenn Sie dies auswählen, wechselt die Währung zu",
        "This payment method does not support the selected currency. Please switch currencies.": "Diese Zahlungsmethode unterstützt die ausgewählte Währung nicht. Bitte Währung wechseln.",
        "Total": "Gesamt",
        "Unknown order error occurred": "Unbekannter Bestellfehler aufgetreten",
        "VIEW SAVED CARDS": "GESPEICHERTE KARTEN ANZEIGEN",
        "Verified": "Verifiziert",
        "View options": "Optionen anzeigen",
        "Wire/Bank Transfer": "Überweisung/Banküberweisung",
        "You entered an invalid coupon code": "Sie haben einen ungültigen Gutscheincode eingegeben",
        "You entered an invalid gift card": "Sie haben eine ungültige Geschenkkarte eingegeben",
        "You may also like...": "Sie können auch mögen...",
        "You might also like...": "Das könnte dir auch gefallen...",
        "additional": "zusätzlich",
        "and": "und",
        "coupon": "Coupon",
        "info": "die Info",
        "payment": "Zahlung",
        "privacy policy": "Datenschutz-Bestimmungen",
        "shipping": "Versand",
        "terms": "Bedingungen",
        "terms and conditions": "Geschäftsbedingungen",
        "the": "das",
        "the store's": "die Läden"
    },
    "el": {
        "+ ADD A COUPON CODE": "+ ΠΡΟΣΘΗΚΗ ΚΩΔΙΚΟΥ ΚΟΥΠΟΝΙΟΥ",
        "+ NEW CARD": "+ ΝΕΑ ΚΑΡΤΑ",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ΕΞΑΡΓΥΡΩΣΤΕ ΔΩΡΟΚΑΡΤΑ/ΠΙΣΤΩΣΗ ΚΑΤΑΣΤΗΜΑΤΟΣ",
        ", ": ",",
        "ADD": "ΠΡΟΣΘΗΚΗ",
        "Add": "Προσθήκη",
        "Additional Information": "Επιπλέον πληροφορίες",
        "After selecting pay you will be redirected to complete your payment.": "Αφού επιλέξετε την πληρωμή, θα ανακατευθυνθείτε για να ολοκληρώσετε την πληρωμή σας.",
        "Apartment": "Διαμέρισμα",
        "Billing": "Χρέωση",
        "By clicking the button above, you agree to": "Κάνοντας κλικ στο παραπάνω κουμπί, συμφωνείτε",
        "Cancel": "Ματαίωση",
        "Card": "Κάρτα",
        "Cart is empty": "Το καλάθι είναι άδειο",
        "Cheque": "Ελεγχος",
        "City": "Πόλη",
        "Click to refresh shipping price": "Κάντε κλικ για ανανέωση της τιμής αποστολής",
        "Close": "Κλείσε",
        "Continue": "Να συνεχίσει",
        "Country": "Χώρα",
        "County": "Κομητεία",
        "Coupon code": "Κωδικός κουπονιού",
        "Currency": "Νόμισμα",
        "Customize": "Προσαρμογή",
        "Delivery date": "Ημερομηνία παράδοσης",
        "Different shipping details?": "Διαφορετικές λεπτομέρειες αποστολής;",
        "Edit": "Επεξεργασία",
        "Email": "ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ",
        "Email or Username": "E-mail ή το όνομα χρήστη",
        "Exit Checkout": "Έξοδος από το ταμείο",
        "First name": "Ονομα",
        "First renewal": "Πρώτη ανανέωση",
        "Gift card number": "Αριθμός δωροκάρτας",
        "Go Back": "Πήγαινε πίσω",
        "I verify that the country I have entered is the one I reside in": "Επαληθεύω ότι η χώρα στην οποία έχω εισέλθει είναι αυτή στην οποία διαμένω",
        "Initial Shipment": "Αρχική Αποστολή",
        "Last name": "Επίθετο",
        "Login": "Σύνδεση",
        "My order": "Η παραγγελία μου",
        "No Thanks": "Οχι ευχαριστώ",
        "Order notes": "Σημειώσεις παραγγελίας",
        "Password": "Κωδικός πρόσβασης",
        "Pay": "Πληρωμή",
        "Pay with Card": "Πληρώστε με Κάρτα",
        "Pay with PayPal": "Πληρώστε με PayPal",
        "Pay with a cheque": "Πληρώστε με επιταγή",
        "Payment": "Πληρωμή",
        "Payment via Wire/Bank Transfer": "Πληρωμή μέσω τραπεζικού εμβάσματος",
        "Personal": "Προσωπικός",
        "Phone number": "Τηλεφωνικό νούμερο",
        "Place Purchase Order": "Τοποθετήστε την παραγγελία αγοράς",
        "Place order": "Παραγγέλνω",
        "Please go back and try again. Missing required field": "Επιστρέψτε και δοκιμάστε ξανά. Λείπει υποχρεωτικό πεδίο",
        "Postal code": "Ταχυδρομικός Κώδικας",
        "Processing": "Επεξεργασία",
        "Province": "Επαρχία",
        "Purchase Order": "Εντολή αγοράς",
        "Ready to check out?": "Έτοιμοι για check out;",
        "Recurring total": "Επαναλαμβανόμενο σύνολο",
        "Register": "Κανω ΕΓΓΡΑΦΗ",
        "Remove": "Αφαιρώ",
        "Secured by": "Με ασφάλεια από",
        "Select a Province": "Επιλέξτε μια επαρχία",
        "Select a State": "Επιλέξτε μια πολιτεία",
        "Select a country": "Επιλέξτε χώρα",
        "Send to": "Στέλνω σε",
        "Ship to": "Αποστολή προς",
        "Shipping": "Αποστολή",
        "Sorry, something went wrong. Please refresh the page and try again.": "Συγνώμη, κάτι πήγε στραβά. Ανανεώστε τη σελίδα και δοκιμάστε ξανά.",
        "Sorry, this store does not ship to your location.": "Λυπούμαστε, αυτό το κατάστημα δεν αποστέλλεται στην τοποθεσία σας.",
        "State": "κατάσταση",
        "Street address": "διεύθυνση",
        "Subtotal": "ΜΕΡΙΚΟ ΣΥΝΟΛΟ",
        "Tax": "Φόρος",
        "Test mode: customers cannot see PeachPay": "Δοκιμαστική λειτουργία: οι πελάτες δεν μπορούν να δουν το PeachPay",
        "There are no eligible or active payment methods available for this order.": "Δεν υπάρχουν διαθέσιμες ή ενεργές μέθοδοι πληρωμής για αυτήν την παραγγελία.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα, κάνοντας κλικ σε αυτό το μήνυμα το νόμισμα θα αλλάξει",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα. Με την επιλογή αυτού, το νόμισμα θα αλλάξει σε",
        "This payment method does not support the selected currency. Please switch currencies.": "Αυτός ο τρόπος πληρωμής δεν υποστηρίζει το επιλεγμένο νόμισμα. Αλλάξτε νόμισμα.",
        "Total": "Σύνολο",
        "Unknown order error occurred": "Παρουσιάστηκε άγνωστο σφάλμα παραγγελίας",
        "VIEW SAVED CARDS": "ΠΡΟΒΟΛΗ ΑΠΟΘΗΚΕΥΜΕΝΩΝ ΚΑΡΤΩΝ",
        "Verified": "Επαληθεύτηκε",
        "View options": "Προβολή επιλογών",
        "Wire/Bank Transfer": "Τραπεζικό έμβασμα",
        "You entered an invalid coupon code": "Εισαγάγατε έναν μη έγκυρο κωδικό κουπονιού",
        "You entered an invalid gift card": "Εισαγάγατε μια μη έγκυρη δωροκάρτα",
        "You may also like...": "Μπορεί να σου αρέσει επίσης...",
        "You might also like...": "Μπορεί επίσης να σας αρέσει...",
        "additional": "πρόσθετος",
        "and": "και",
        "coupon": "κουπόνι",
        "info": "πληροφορίες",
        "payment": "πληρωμή",
        "privacy policy": "πολιτική απορρήτου",
        "shipping": "Αποστολή",
        "terms": "όροι",
        "terms and conditions": "όροι και Προϋποθέσεις",
        "the": "ο",
        "the store's": "τα μαγαζιά"
    },
    "es-ES": {
        "+ ADD A COUPON CODE": "+ AÑADIR UN CÓDIGO DE CUPÓN",
        "+ NEW CARD": "+ NUEVA TARJETA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ CANJEAR TARJETA DE REGALO/CRÉDITO DE LA TIENDA",
        ", ": ",",
        "ADD": "AGREGAR",
        "Add": "Agregar",
        "Additional Information": "Información Adicional",
        "After selecting pay you will be redirected to complete your payment.": "Después de seleccionar pagar, será redirigido para completar su pago.",
        "Apartment": "Departamento",
        "Billing": "Facturación",
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
        "Different shipping details?": "¿Diferentes detalles de envío?",
        "Edit": "Editar",
        "Email": "Correo electrónico",
        "Email or Username": "Correo electrónico o nombre de usuario",
        "Exit Checkout": "Salir de la caja",
        "First name": "Nombre de pila",
        "First renewal": "Primera renovación",
        "Gift card number": "Numero de tarjeta de regalo",
        "Go Back": "Regresa",
        "I verify that the country I have entered is the one I reside in": "Verifico que el país en el que he entrado es en el que resido",
        "Initial Shipment": "Envío inicial",
        "Last name": "Apellido",
        "Login": "Acceso",
        "My order": "Mi pedido",
        "No Thanks": "No, gracias",
        "Order notes": "Pedidos",
        "Password": "Clave",
        "Pay": "Pagar",
        "Pay with Card": "Pagar con Tarjeta",
        "Pay with PayPal": "Pagar con PayPal",
        "Pay with a cheque": "Paga con un cheque",
        "Payment": "Pago",
        "Payment via Wire/Bank Transfer": "Pago mediante transferencia bancaria/cable",
        "Personal": "Personal",
        "Phone number": "Número de teléfono",
        "Place Purchase Order": "Realizar orden de compra",
        "Place order": "Realizar pedido",
        "Please go back and try again. Missing required field": "Por favor, regrese y vuelva a intentarlo. Faltan campos requeridos",
        "Postal code": "Código Postal",
        "Processing": "Procesando",
        "Province": "Provincia",
        "Purchase Order": "Orden de compra",
        "Ready to check out?": "¿Listo para pagar?",
        "Recurring total": "total recurrente",
        "Register": "Registro",
        "Remove": "Remover",
        "Secured by": "Asegurado por",
        "Select a Province": "Seleccione una provincia",
        "Select a State": "Selecciona un Estado",
        "Select a country": "Seleccione un país",
        "Send to": "Enviar a",
        "Ship to": "Envie a",
        "Shipping": "Envío",
        "Sorry, something went wrong. Please refresh the page and try again.": "Perdón, algo salió mal. Actualice la página y vuelva a intentarlo.",
        "Sorry, this store does not ship to your location.": "Lo sentimos, esta tienda no realiza envíos a su ubicación.",
        "State": "Expresar",
        "Street address": "Dirección",
        "Subtotal": "Total parcial",
        "Tax": "Impuesto",
        "Test mode: customers cannot see PeachPay": "Modo de prueba: los clientes no pueden ver PeachPay",
        "There are no eligible or active payment methods available for this order.": "No hay métodos de pago elegibles o activos disponibles para este pedido.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Este método de pago no admite la moneda seleccionada, al hacer clic en este mensaje, la moneda cambiará a",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Este método de pago no admite la moneda seleccionada. Al seleccionar esto, la moneda cambiará a",
        "This payment method does not support the selected currency. Please switch currencies.": "Este método de pago no admite la moneda seleccionada. Cambie de moneda.",
        "Total": "Total",
        "Unknown order error occurred": "Se produjo un error de pedido desconocido",
        "VIEW SAVED CARDS": "VER TARJETAS GUARDADAS",
        "Verified": "Verificado",
        "View options": "Ver opciones",
        "Wire/Bank Transfer": "Transferencia electrónica/bancaria",
        "You entered an invalid coupon code": "Ingresó un código de cupón no válido",
        "You entered an invalid gift card": "Ingresó una tarjeta de regalo no válida",
        "You may also like...": "También te puede interesar...",
        "You might also like...": "También podría gustarte...",
        "additional": "adicional",
        "and": "y",
        "coupon": "cupón",
        "info": "información",
        "payment": "pago",
        "privacy policy": "política de privacidad",
        "shipping": "Envío",
        "terms": "términos",
        "terms and conditions": "Términos y condiciones",
        "the": "la",
        "the store's": "las tiendas"
    },
    "fr-FR": {
        "+ ADD A COUPON CODE": "+ AJOUTER UN CODE PROMO",
        "+ NEW CARD": "+ NOUVELLE CARTE",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ÉCHANGER UNE CARTE-CADEAU OU UN CRÉDIT D’ACHAT",
        ", ": ",",
        "ADD": "AJOUTER",
        "Add": "Ajouter",
        "Additional Information": "Informations Complémentaires",
        "After selecting pay you will be redirected to complete your payment.": "Après avoir sélectionné “payer”, vous serez redirigé pour terminer votre paiement.",
        "Apartment": "L’appartement",
        "Billing": "La facturation",
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
        "Different shipping details?": "Différents détails d'expédition?",
        "Edit": "Modifier",
        "Email": "E-mail",
        "Email or Username": "E-mail ou nom d'utilisateur",
        "Exit Checkout": "Quitter la caisse",
        "First name": "Prénom",
        "First renewal": "Premier renouvellement",
        "Gift card number": "Numéro de la carte-cadeau",
        "Go Back": "Retourner",
        "I verify that the country I have entered is the one I reside in": "Je vérifie que le pays que j'ai entré est celui dans lequel je réside",
        "Initial Shipment": "Expédition initiale",
        "Last name": "Nom de famille",
        "Login": "Connexion",
        "My order": "Ma commande",
        "No Thanks": "Non merci",
        "Order notes": "Notes d'ordre",
        "Password": "Mot de passe",
        "Pay": "Payer",
        "Pay with Card": "Payer par carte",
        "Pay with PayPal": "Payer avec PayPal",
        "Pay with a cheque": "Payer par chèque",
        "Payment": "Paiement",
        "Payment via Wire/Bank Transfer": "Paiement par fil/virement bancaire",
        "Personal": "Personnel",
        "Phone number": "Numéro de téléphone",
        "Place Purchase Order": "Passer un bon de commande",
        "Place order": "Passer la commande",
        "Please go back and try again. Missing required field": "Réessayer. Champ obligatoire manquant",
        "Postal code": "Code Postal",
        "Processing": "Traitement",
        "Province": "Province",
        "Purchase Order": "Un ordre d'achat",
        "Ready to check out?": "Êtes-vous prêt à payer?",
        "Recurring total": "Coût récurrent",
        "Register": "S'inscrire",
        "Remove": "Effacer",
        "Secured by": "Sécurisé par",
        "Select a Province": "Sélectionnez une province",
        "Select a State": "Sélectionner un état",
        "Select a country": "Choisissez un pays",
        "Send to": "Envoyer à",
        "Ship to": "Envoyez à",
        "Shipping": "Expédition",
        "Sorry, something went wrong. Please refresh the page and try again.": "Désolé, quelque chose s'est mal passé. Veuillez actualiser la page et réessayer.",
        "Sorry, this store does not ship to your location.": "Désolé, ce magasin ne livre pas à votre emplacement.",
        "State": "L’état",
        "Street address": "Adresse de la rue",
        "Subtotal": "Sous-total",
        "Tax": "L’impôt",
        "Test mode: customers cannot see PeachPay": "Mode test : les clients ne peuvent pas voir PeachPay",
        "There are no eligible or active payment methods available for this order.": "Aucun mode de paiement éligible ou actif n'est disponible pour cette commande.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Ce mode de paiement ne prend pas en charge la devise sélectionnée, en cliquant sur ce message, la devise passera à",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Ce mode de paiement ne prend pas en charge la devise sélectionnée. En sélectionnant ceci, la devise passera à",
        "This payment method does not support the selected currency. Please switch currencies.": "Ce mode de paiement ne prend pas en charge la devise sélectionnée. Veuillez changer de devise.",
        "Total": "Coûte",
        "Unknown order error occurred": "Une erreur de commande inconnue s'est produite",
        "VIEW SAVED CARDS": "VOIR LES CARTES SAUVEGARDÉES",
        "Verified": "Vérifié",
        "View options": "Options d'affichage",
        "Wire/Bank Transfer": "Virement bancaire/virement bancaire",
        "You entered an invalid coupon code": "Vous avez saisi un code de coupon invalide",
        "You entered an invalid gift card": "Vous avez entré une carte-cadeau invalide",
        "You may also like...": "Tu pourrais aussi aimer...",
        "You might also like...": "Vous pourriez aussi aimer...",
        "additional": "Additionnel",
        "and": "et",
        "coupon": "coupon",
        "info": "Info",
        "payment": "Paiement",
        "privacy policy": "La politique de confidentialité",
        "shipping": "expédition",
        "terms": "Les termes",
        "terms and conditions": "Les termes et conditions",
        "the": "la",
        "the store's": "les magasins"
    },
    "hi-IN": {
        "+ ADD A COUPON CODE": "+ एक कूपन कोड जोड़ें",
        "+ NEW CARD": "+ नया कार्ड",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ रिडीम गिफ्ट कार्ड/स्टोर क्रेडिट",
        ", ": ",",
        "ADD": "जोड़ें",
        "Add": "जोड़ें",
        "Additional Information": "अतिरिक्त जानकारी",
        "After selecting pay you will be redirected to complete your payment.": "वेतन का चयन करने के बाद आपको अपना भुगतान पूरा करने के लिए पुनर्निर्देशित किया जाएगा।",
        "Apartment": "अपार्टमेंट",
        "Billing": "बिलिंग",
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
        "Different shipping details?": "अलग शिपिंग विवरण?",
        "Edit": "संपादन करना",
        "Email": "ईमेल",
        "Email or Username": "ईमेल या उपयोगकर्ता का नाम",
        "Exit Checkout": "चेकआउट से बाहर निकलें",
        "First name": "संतोष",
        "First renewal": "पहला नवीनीकरण",
        "Gift card number": "गिफ्ट कार्ड नंबर",
        "Go Back": "वापस जाओ",
        "I verify that the country I have entered is the one I reside in": "मैं सत्यापित करता/करती हूं कि जिस देश में मैंने प्रवेश किया है वह वही देश है जिसमें मैं रहता हूं",
        "Initial Shipment": "प्रारंभिक शिपमेंट",
        "Last name": "उपनाम",
        "Login": "लॉग इन करें",
        "My order": "मेरे आदेश",
        "No Thanks": "जी नहीं, धन्यवाद",
        "Order notes": "ऑर्डर नोट",
        "Password": "पासवर्ड",
        "Pay": "भुगतान करना",
        "Pay with Card": "कार्ड से भुगतान करें",
        "Pay with PayPal": "पेपैल के साथ भुगतान करें",
        "Pay with a cheque": "चेक से भुगतान करें",
        "Payment": "भुगतान",
        "Payment via Wire/Bank Transfer": "वायर/बैंक हस्तांतरण के माध्यम से भुगतान",
        "Personal": "निजी",
        "Phone number": "फ़ोन नंबर",
        "Place Purchase Order": "खरीद आदेश रखें",
        "Place order": "आदेश देना",
        "Please go back and try again. Missing required field": "कृपया पीछे जाएं और दोबारा कोशिश करें। आवश्यक क्षेत्र उपलभ्ध नही है",
        "Postal code": "डाक कोड",
        "Processing": "प्रसंस्करण",
        "Province": "प्रांत",
        "Purchase Order": "खरीद आदेश",
        "Ready to check out?": "चेक आउट करने के लिए तैयार हैं?",
        "Recurring total": "आवर्ती कुल",
        "Register": "पंजीकरण करवाना",
        "Remove": "हटाना",
        "Secured by": "इसके जरिए सुरक्षित",
        "Select a Province": "एक प्रांत का चयन करें",
        "Select a State": "एक राज्य का चयन करें",
        "Select a country": "एक देश चुनें",
        "Send to": "भेजना",
        "Ship to": "यहां भेजें",
        "Shipping": "शिपिंग",
        "Sorry, something went wrong. Please refresh the page and try again.": "क्षमा करें, कुछ गलत हो गया। पृष्ठ को रीफ्रेश करें और पुन: प्रयास करें।",
        "Sorry, this store does not ship to your location.": "क्षमा करें, यह स्टोर आपके स्थान पर शिप नहीं करता है।",
        "State": "राज्य",
        "Street address": "गली का पता",
        "Subtotal": "उप-योग",
        "Tax": "कर",
        "Test mode: customers cannot see PeachPay": "परीक्षण मोड: ग्राहक पीचपे नहीं देख सकते हैं",
        "There are no eligible or active payment methods available for this order.": "इस आदेश के लिए कोई योग्य या सक्रिय भुगतान विधियां उपलब्ध नहीं हैं।",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है, इस संदेश पर क्लिक करने पर मुद्रा स्विच हो जाएगी",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है। इसे चुनने पर, मुद्रा स्विच हो जाएगी",
        "This payment method does not support the selected currency. Please switch currencies.": "यह भुगतान विधि चयनित मुद्रा का समर्थन नहीं करती है। कृपया मुद्राएं बदलें।",
        "Total": "कुल",
        "Unknown order error occurred": "अज्ञात आदेश त्रुटि हुई",
        "VIEW SAVED CARDS": "सहेजे गए कार्ड देखें",
        "Verified": "सत्यापित",
        "View options": "विकल्प देखें",
        "Wire/Bank Transfer": "वायर/बैंक स्थानांतरण",
        "You entered an invalid coupon code": "आपने एक अमान्य कूपन कोड दर्ज किया है",
        "You entered an invalid gift card": "आपने एक अमान्य उपहार कार्ड दर्ज किया है",
        "You may also like...": "आपको यह भी पसंद आ सकता हैं...",
        "You might also like...": "शायद तुम्हे यह भी अच्छा लगे...",
        "additional": "अतिरिक्त",
        "and": "और",
        "coupon": "कूपन",
        "info": "जानकारी",
        "payment": "भुगतान",
        "privacy policy": "गोपनीयता नीति",
        "shipping": "शिपिंग",
        "terms": "शर्तें",
        "terms and conditions": "नियम और शर्तें",
        "the": "",
        "the store's": "दुकानें"
    },
    "it": {
        "+ ADD A COUPON CODE": "+ AGGIUNGI UN CODICE COUPON",
        "+ NEW CARD": "+ NUOVA CARTA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ UTILIZZA CARTA REGALO/CREDITO NEGOZIO",
        ", ": ",",
        "ADD": "INSERISCI",
        "Add": "Aggiungere",
        "Additional Information": "Informazioni aggiuntive",
        "After selecting pay you will be redirected to complete your payment.": "Dopo aver selezionato paga verrai reindirizzato per completare il pagamento.",
        "Apartment": "Appartamento",
        "Billing": "Fatturazione",
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
        "Different shipping details?": "DDettagli di spedizione diversi?",
        "Edit": "Modificare",
        "Email": "E-mail",
        "Email or Username": "Email o nome utente",
        "Exit Checkout": "Esci dalla cassa",
        "First name": "nome di battesimo",
        "First renewal": "Primo rinnovo",
        "Gift card number": "Numero della carta regalo",
        "Go Back": "Torna indietro",
        "I verify that the country I have entered is the one I reside in": "Verifico che il paese in cui ho inserito è quello in cui risiedo",
        "Initial Shipment": "Spedizione iniziale",
        "Last name": "Cognome",
        "Login": "Login",
        "My order": "Il mio ordine",
        "No Thanks": "No grazie",
        "Order notes": "Note sull'ordine",
        "Password": "Parola d'ordine",
        "Pay": "Paga",
        "Pay with Card": "Paga con Carta",
        "Pay with PayPal": "paga con Paypal",
        "Pay with a cheque": "Paga con un assegno",
        "Payment": "Pagamento",
        "Payment via Wire/Bank Transfer": "Pagamento tramite Bonifico/Bonifico Bancario",
        "Personal": "Personale",
        "Phone number": "Numero di telefono",
        "Place Purchase Order": "Effettua l'ordine di acquisto",
        "Place order": "Invia ordine",
        "Please go back and try again. Missing required field": "Torna indietro e riprova. campo richiesto mancante",
        "Postal code": "Codice postale",
        "Processing": "in lavorazione",
        "Province": "Provincia",
        "Purchase Order": "Ordinazione d'acquisto",
        "Ready to check out?": "Pronto per il check-out?",
        "Recurring total": "Totale ricorrente",
        "Register": "Registrati",
        "Remove": "Rimuovere",
        "Secured by": "Protetto da",
        "Select a Province": "Seleziona una provincia",
        "Select a State": "Seleziona uno Stato",
        "Select a country": "Seleziona un Paese",
        "Send to": "Inviare a",
        "Ship to": "Spedire a",
        "Shipping": "Spedizione",
        "Sorry, something went wrong. Please refresh the page and try again.": "Scusa, qualcosa è andato storto. Perfavore ricarica la pagina e riprova.",
        "Sorry, this store does not ship to your location.": "Siamo spiacenti, questo negozio non effettua spedizioni nella tua posizione.",
        "State": "Stato",
        "Street address": "indirizzo",
        "Subtotal": "totale parziale",
        "Tax": "Imposta",
        "Test mode: customers cannot see PeachPay": "Modalità test: i clienti non possono vedere PeachPay",
        "There are no eligible or active payment methods available for this order.": "Non sono disponibili metodi di pagamento idonei o attivi per questo ordine.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Questo metodo di pagamento non supporta la valuta selezionata, facendo clic su questo messaggio la valuta passerà",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Questo metodo di pagamento non supporta la valuta selezionata. Selezionando questo, la valuta passerà a",
        "This payment method does not support the selected currency. Please switch currencies.": "Questo metodo di pagamento non supporta la valuta selezionata. Si prega di cambiare valuta.",
        "Total": "Totale",
        "Unknown order error occurred": "Si è verificato un errore di ordine sconosciuto",
        "VIEW SAVED CARDS": "VISUALIZZA LE CARTE SALVATE",
        "Verified": "Verificato",
        "View options": "Visualizza opzioni",
        "Wire/Bank Transfer": "Bonifico/Bonifico Bancario",
        "You entered an invalid coupon code": "Hai inserito un codice coupon non valido",
        "You entered an invalid gift card": "Hai inserito una carta regalo non valida",
        "You may also like...": "Potrebbe piacerti anche...",
        "You might also like...": "Potrebbe piacerti anche...",
        "additional": "aggiuntivo",
        "and": "e",
        "coupon": "buono",
        "info": "Informazioni",
        "payment": "pagamento",
        "privacy policy": "politica sulla riservatezza",
        "shipping": "spedizione",
        "terms": "termini",
        "terms and conditions": "Termini e Condizioni",
        "the": "il",
        "the store's": "i negozi"
    },
    "ja": {
        "+ ADD A COUPON CODE": "+クーポンコードを追加する",
        "+ NEW CARD": "+新しいカード",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ギフトカード/ストアクレジットを利用する",
        ", ": "、",
        "ADD": "追加",
        "Add": "追加",
        "Additional Information": "追加情報",
        "After selecting pay you will be redirected to complete your payment.": "支払いを選択すると、支払いを完了するためにリダイレクトされます。",
        "Apartment": "アパート",
        "Billing": "請求する",
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
        "Different shipping details?": "別の配送の詳細？",
        "Edit": "編集",
        "Email": "Eメール",
        "Email or Username": "メールアドレスまたはユーザ名",
        "Exit Checkout": "チェックアウトを終了します",
        "First name": "ファーストネーム",
        "First renewal": "最初の更新",
        "Gift card number": "ギフトカード番号",
        "Go Back": "戻る",
        "I verify that the country I have entered is the one I reside in": "私が入国した国が私が居住している国であることを確認します",
        "Initial Shipment": "最初の出荷",
        "Last name": "苗字",
        "Login": "ログイン",
        "My order": "私の注文",
        "No Thanks": "結構です",
        "Order notes": "注文メモ",
        "Password": "パスワード",
        "Pay": "支払い",
        "Pay with Card": "カードで支払う",
        "Pay with PayPal": "PayPalで支払う",
        "Pay with a cheque": "小切手で支払う",
        "Payment": "支払い",
        "Payment via Wire/Bank Transfer": "電信送金/銀行振込によるお支払い",
        "Personal": "個人的",
        "Phone number": "電話番号",
        "Place Purchase Order": "発注書",
        "Place order": "注文する",
        "Please go back and try again. Missing required field": "戻ってもう一度やり直してください。必須フィールドがありません",
        "Postal code": "郵便番号",
        "Processing": "処理",
        "Province": "州",
        "Purchase Order": "注文書",
        "Ready to check out?": "チェックアウトする準備はできましたか？",
        "Recurring total": "経常合計",
        "Register": "登録",
        "Remove": "削除する",
        "Secured by": "によって保護",
        "Select a Province": "州を選択",
        "Select a State": "州を選択",
        "Select a country": "国を選択",
        "Send to": "に送る",
        "Ship to": "送り先",
        "Shipping": "運送",
        "Sorry, something went wrong. Please refresh the page and try again.": "申し訳ありませんが、問題が発生しました。ページを更新して、もう一度お試しください。",
        "Sorry, this store does not ship to your location.": "申し訳ありませんが、このストアはお住まいの地域に発送されません。",
        "State": "州",
        "Street address": "住所",
        "Subtotal": "小計",
        "Tax": "税",
        "Test mode: customers cannot see PeachPay": "テストモード：顧客はPeachPayを見ることができません",
        "There are no eligible or active payment methods available for this order.": "この注文に利用できる適格または有効な支払い方法はありません。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "この支払い方法は選択した通貨をサポートしていません。このメッセージをクリックすると、通貨がに切り替わります",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "この支払い方法は、選択した通貨をサポートしていません。これを選択すると、通貨はに切り替わります",
        "This payment method does not support the selected currency. Please switch currencies.": "この支払い方法は、選択した通貨をサポートしていません。通貨を切り替えてください。",
        "Total": "合計",
        "Unknown order error occurred": "不明な注文エラーが発生しました",
        "VIEW SAVED CARDS": "保存されたカードを表示する",
        "Verified": "確認済み",
        "View options": "オプションを表示",
        "Wire/Bank Transfer": "電信送金/銀行振込",
        "You entered an invalid coupon code": "無効なクーポンコードを入力しました",
        "You entered an invalid gift card": "無効なギフトカードを入力しました",
        "You may also like...": "あなたも好きかも...",
        "You might also like...": "あなたはおそらくそれも好きでしょう...",
        "additional": "追加",
        "and": "と",
        "coupon": "クーポン",
        "info": "情報",
        "payment": "支払い",
        "privacy policy": "プライバシーポリシー",
        "shipping": "運送",
        "terms": "条項",
        "terms and conditions": "規約と条件",
        "the": "the",
        "the store's": "店舗"
    },
    "ko-KR": {
        "+ ADD A COUPON CODE": "+ 쿠폰 코드 추가",
        "+ NEW CARD": "+ 새 카드",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 기프트 카드/매장 크레딧 사용",
        ", ": ",",
        "ADD": "추가하다",
        "Add": "추가하다",
        "Additional Information": "추가 정보",
        "After selecting pay you will be redirected to complete your payment.": "지불을 선택하면 지불을 완료하기 위해 리디렉션됩니다.",
        "Apartment": "아파트",
        "Billing": "청구",
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
        "Different shipping details?": "배송 정보가 다른가요?",
        "Edit": "편집하다",
        "Email": "이메일",
        "Email or Username": "이메일 또는 사용자 이름",
        "Exit Checkout": "체크아웃 종료",
        "First name": "이름",
        "First renewal": "첫 번째 갱신",
        "Gift card number": "기프트 카드 번호",
        "Go Back": "돌아가기",
        "I verify that the country I have entered is the one I reside in": "내가 입력한 국가가 내가 거주하는 국가인지 확인합니다.",
        "Initial Shipment": "초기 선적",
        "Last name": "성",
        "Login": "로그인",
        "My order": "내 주문",
        "No Thanks": "고맙지 만 사양 할게",
        "Order notes": "주문 메모",
        "Password": "비밀번호",
        "Pay": "지불",
        "Pay with Card": "카드로 결제",
        "Pay with PayPal": "페이팔로 결제",
        "Pay with a cheque": "수표로 지불",
        "Payment": "지불",
        "Payment via Wire/Bank Transfer": "전신환/은행 송금을 통한 지불",
        "Personal": "개인적인",
        "Phone number": "전화 번호",
        "Place Purchase Order": "구매 주문하기",
        "Place order": "주문하기",
        "Please go back and try again. Missing required field": "돌아가서 다시 시도하십시오. 필수 항목 누락",
        "Postal code": "우편 번호",
        "Processing": "처리",
        "Province": "주",
        "Purchase Order": "구매 주문",
        "Ready to check out?": "체크아웃할 준비가 되셨나요?",
        "Recurring total": "반복 합계",
        "Register": "등록하다",
        "Remove": "제거하다",
        "Secured by": "보안",
        "Select a Province": "주를 선택하십시오",
        "Select a State": "주 선택",
        "Select a country": "국가를 고르시 오",
        "Send to": "보내기",
        "Ship to": "배송지",
        "Shipping": "배송",
        "Sorry, something went wrong. Please refresh the page and try again.": "죄송합니다. 문제가 발생했습니다. 페이지를 새로고침하고 다시 시도하십시오.",
        "Sorry, this store does not ship to your location.": "죄송합니다. 이 상점은 귀하의 위치로 배송되지 않습니다.",
        "State": "상태",
        "Street address": "주소",
        "Subtotal": "소계",
        "Tax": "세",
        "Test mode: customers cannot see PeachPay": "테스트 모드: 고객이 PeachPay를 볼 수 없습니다.",
        "There are no eligible or active payment methods available for this order.": "이 주문에 사용할 수 있는 적격 또는 활성 결제 방법이 없습니다.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "이 결제 방법은 선택한 통화를 지원하지 않습니다. 이 메시지를 클릭하면 통화가 다음으로 전환됩니다.",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "이 결제 수단은 선택한 통화를 지원하지 않습니다. 이것을 선택하면 통화가 다음으로 전환됩니다.",
        "This payment method does not support the selected currency. Please switch currencies.": "이 결제 수단은 선택한 통화를 지원하지 않습니다. 통화를 전환하십시오.",
        "Total": "총",
        "Unknown order error occurred": "알 수 없는 주문 오류가 발생했습니다",
        "VIEW SAVED CARDS": "저장된 카드 보기",
        "Verified": "확인됨",
        "View options": "보기 옵션",
        "Wire/Bank Transfer": "전신환/은행 송금",
        "You entered an invalid coupon code": "잘못된 쿠폰 코드를 입력했습니다.",
        "You entered an invalid gift card": "잘못된 기프트 카드를 입력했습니다.",
        "You may also like...": "당신은 또한 좋아할 수 있습니다 ...",
        "You might also like...": "당신은 또한 좋아할 수도 있습니다 ...",
        "additional": "추가의",
        "and": "그리고",
        "coupon": "쿠폰",
        "info": "정보",
        "payment": "지불",
        "privacy policy": "개인 정보 정책",
        "shipping": "배송",
        "terms": "자귀",
        "terms and conditions": "이용약관",
        "the": "그만큼",
        "the store's": "상점들"
    },
    "lb-LU": {
        "+ ADD A COUPON CODE": "+ ENG COUPON CODE bäizefügen",
        "+ NEW CARD": "+ NEW KAART",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ GIFT CARD / STORE CREDIT REDEEM",
        ", ": ",",
        "ADD": "ADD",
        "Add": "Addéieren",
        "Additional Information": "zousätzlech Informatiounen",
        "After selecting pay you will be redirected to complete your payment.": "Nodeems Dir Bezuelung gewielt hutt, gitt Dir ëmgeleet fir Är Bezuelung ofzeschléissen.",
        "Apartment": "Appartement",
        "Billing": "Rechnung",
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
        "Different shipping details?": "Verschidde Versanddetailer?",
        "Edit": "Edit",
        "Email": "E-Mail",
        "Email or Username": "E-Mail oder Benotzernumm",
        "Exit Checkout": "Exit Checkout",
        "First name": "Virnumm",
        "First renewal": "Éischt Erneierung",
        "Gift card number": "Cadeau Kaart Zuel",
        "Go Back": "Géi zréck",
        "I verify that the country I have entered is the one I reside in": "Ech verifizéieren datt d'Land wou ech aginn hunn ass dat an deem ech wunnen",
        "Initial Shipment": "Éischt Versand",
        "Last name": "Familljennumm",
        "Login": "Login",
        "My order": "Meng Bestellung",
        "No Thanks": "Nee Merci",
        "Order notes": "Uerdnung Notizen",
        "Password": "Passwuert",
        "Pay": "Bezuelen",
        "Pay with Card": "Bezuelen mat Kaart",
        "Pay with PayPal": "Bezuelen mat PayPal",
        "Pay with a cheque": "Bezuelen mat engem Scheck",
        "Payment": "Bezuelen",
        "Payment via Wire/Bank Transfer": "Bezuelung iwwer Wire / Bankiwwerweisung",
        "Personal": "Perséinlech",
        "Phone number": "Telefonsnummer",
        "Place Purchase Order": "Place Akeef Uerdnung",
        "Place order": "Bestellung maachen",
        "Please go back and try again. Missing required field": "Gitt w.e.g. zréck a probéiert nach eng Kéier. Vermësst néideg Feld",
        "Postal code": "Postleitzuel",
        "Processing": "Veraarbechtung",
        "Province": "Provënz",
        "Purchase Order": "Akaf Uerdnung",
        "Ready to check out?": "Prett fir auszechecken?",
        "Recurring total": "Widderhuelend Ganzen",
        "Register": "Aschreiwen",
        "Remove": "Ewechzehuelen",
        "Secured by": "Geséchert duerch",
        "Select a Province": "Wielt eng Provënz",
        "Select a State": "Wielt e Staat",
        "Select a country": "Wielt e Land",
        "Send to": "Schécken",
        "Ship to": "Schiff an",
        "Shipping": "Liwwerung",
        "Sorry, something went wrong. Please refresh the page and try again.": "Entschëllegt, eppes ass falsch gaang. Erfrëscht w.e.g. d'Säit a probéiert nach eng Kéier.",
        "Sorry, this store does not ship to your location.": "Entschëllegt, dëse Buttek schéckt net op Är Plaz.",
        "State": "Staat",
        "Street address": "Strooss Adress",
        "Subtotal": "Subtotal",
        "Tax": "Steier",
        "Test mode: customers cannot see PeachPay": "Testmodus: Clienten kënnen PeachPay net gesinn",
        "There are no eligible or active payment methods available for this order.": "Et gi keng berechtegt oder aktiv Bezuelmethoden verfügbar fir dës Bestellung.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung, wann Dir op dëse Message klickt, wiesselt d'Währung op",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung. Wann Dir dëst auswielt, wiesselt d'Währung op",
        "This payment method does not support the selected currency. Please switch currencies.": "Dës Bezuelmethod ënnerstëtzt net déi gewielte Währung. Weg schalt Währungen.",
        "Total": "Ganzen",
        "Unknown order error occurred": "Onbekannte Bestellungsfehler ass geschitt",
        "VIEW SAVED CARDS": "VIEW GESPERT KAARTEN",
        "Verified": "Verifizéiert",
        "View options": "View Optiounen",
        "Wire/Bank Transfer": "Wire / Bank Transfert",
        "You entered an invalid coupon code": "Dir hutt en ongëlteg Coupon Code aginn",
        "You entered an invalid gift card": "Dir hutt eng ongëlteg Geschenkkaart aginn",
        "You may also like...": "Dir kënnt och gär ...",
        "You might also like...": "Dir kënnt och gär ...",
        "additional": "zousätzlech",
        "and": "an",
        "coupon": "Coupon",
        "info": "info",
        "payment": "Bezuelen",
        "privacy policy": "Privatsphär Politik",
        "shipping": "Liwwerung",
        "terms": "Begrëffer",
        "terms and conditions": "Konditioune",
        "the": "den",
        "the store's": "dem Buttek"
    },
    "nl-NL": {
        "+ ADD A COUPON CODE": "+ EEN COUPONCODE TOEVOEGEN",
        "+ NEW CARD": "+ NIEUWE KAART",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ VERWISSEL CADEAUBON/STORE CREDIT",
        ", ": ",",
        "ADD": "TOEVOEGEN",
        "Add": "Toevoegen",
        "Additional Information": "Extra informatie",
        "After selecting pay you will be redirected to complete your payment.": "Na het selecteren van betalen wordt u doorgestuurd om uw betaling af te ronden.",
        "Apartment": "Appartement",
        "Billing": "Facturering",
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
        "Different shipping details?": "Verschillende verzendgegevens?",
        "Edit": "Bewerk",
        "Email": "E-mail",
        "Email or Username": "E-mail of gebruikersnaam",
        "Exit Checkout": "Afrekenen afsluiten",
        "First name": "Voornaam",
        "First renewal": "Eerste verlenging",
        "Gift card number": "Cadeaukaartnummer",
        "Go Back": "Ga terug",
        "I verify that the country I have entered is the one I reside in": "Ik verifieer dat het land dat ik heb ingevoerd het land is waarin ik woon",
        "Initial Shipment": "Eerste zending:",
        "Last name": "Achternaam",
        "Login": "Log in",
        "My order": "Mijn bestelling",
        "No Thanks": "Nee, dank u wel",
        "Order notes": "Bestel notities",
        "Password": "Wachtwoord",
        "Pay": "Betalen",
        "Pay with Card": "Betalen met kaart",
        "Pay with PayPal": "Betaal met PayPal",
        "Pay with a cheque": "Betaal met een cheque",
        "Payment": "Betaling",
        "Payment via Wire/Bank Transfer": "Betaling via overschrijving/bankoverschrijving",
        "Personal": "persoonlijk",
        "Phone number": "Telefoonnummer",
        "Place Purchase Order": "Plaats inkooporder",
        "Place order": "Plaats bestelling",
        "Please go back and try again. Missing required field": "Ga terug en probeer het opnieuw. ontbrekende vereiste veld",
        "Postal code": "Postcode",
        "Processing": "Verwerken",
        "Province": "Provincie",
        "Purchase Order": "Bestelling",
        "Ready to check out?": "Klaar om uit te checken?",
        "Recurring total": "Terugkerend totaal",
        "Register": "Register",
        "Remove": "Verwijderen",
        "Secured by": "Beveiligd door",
        "Select a Province": "Selecteer een provincie",
        "Select a State": "Selecteer een staat",
        "Select a country": "Selecteer een land",
        "Send to": "Verzenden naar",
        "Ship to": "Verzend naar",
        "Shipping": "Verzending",
        "Sorry, something went wrong. Please refresh the page and try again.": "Sorry, er ging iets mis. Ververs de pagina en probeer het opnieuw.",
        "Sorry, this store does not ship to your location.": "Sorry, deze winkel verzendt niet naar jouw locatie.",
        "State": "Staat",
        "Street address": "Adres",
        "Subtotal": "Subtotaal",
        "Tax": "Belasting",
        "Test mode: customers cannot see PeachPay": "Testmodus: klanten kunnen PeachPay niet zien",
        "There are no eligible or active payment methods available for this order.": "Er zijn geen geschikte of actieve betaalmethoden beschikbaar voor deze bestelling.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Deze betaalmethode ondersteunt de geselecteerde valuta niet, bij het klikken op dit bericht zal de valuta overschakelen naar",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Deze betaalmethode ondersteunt de geselecteerde valuta niet. Als u dit selecteert, schakelt de valuta over naar",
        "This payment method does not support the selected currency. Please switch currencies.": "Deze betaalmethode ondersteunt de geselecteerde valuta niet. Wissel alstublieft van valuta.",
        "Total": "Totaal",
        "Unknown order error occurred": "Er is een onbekende bestellingsfout opgetreden",
        "VIEW SAVED CARDS": "OPGESLAGEN KAARTEN BEKIJKEN",
        "Verified": "Geverifieerd",
        "View options": "Bekijk opties",
        "Wire/Bank Transfer": "Overboeking/bankoverschrijving",
        "You entered an invalid coupon code": "U heeft een ongeldige couponcode ingevoerd",
        "You entered an invalid gift card": "Je hebt een ongeldige cadeaubon ingevoerd",
        "You may also like...": "Dit vind je misschien ook leuk...",
        "You might also like...": "Misschien vind je het ook leuk...",
        "additional": "aanvullend",
        "and": "en",
        "coupon": "coupon",
        "info": "info",
        "payment": "betaling",
        "privacy policy": "privacybeleid",
        "shipping": "Verzenden",
        "terms": "termen",
        "terms and conditions": "voorwaarden",
        "the": "de",
        "the store's": "de winkels"
    },
    "pt-PT": {
        "+ ADD A COUPON CODE": "+ ADICIONE UM CÓDIGO DE CUPOM",
        "+ NEW CARD": "+ NOVO CARTÃO",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ RESGATAR CARTÃO-PRESENTE/CRÉDITO NA LOJA",
        ", ": ",",
        "ADD": "ADICIONAR",
        "Add": "Adicionar",
        "Additional Information": "informação adicional",
        "After selecting pay you will be redirected to complete your payment.": "Após selecionar o pagamento, você será redirecionado para concluir seu pagamento.",
        "Apartment": "Apartamento",
        "Billing": "Cobrança",
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
        "Different shipping details?": "Detalhes de envio diferentes?",
        "Edit": "Editar",
        "Email": "E-mail",
        "Email or Username": "Email ou nome de usuário",
        "Exit Checkout": "Sair do Checkout",
        "First name": "Primeiro nome",
        "First renewal": "Primeira renovação",
        "Gift card number": "Número do cartão-presente",
        "Go Back": "Volte",
        "I verify that the country I have entered is the one I reside in": "Certifico que o país em que entrei é aquele em que resido",
        "Initial Shipment": "Remessa inicial",
        "Last name": "Último nome",
        "Login": "Conecte-se",
        "My order": "Meu pedido",
        "No Thanks": "Não, obrigado",
        "Order notes": "Notas de pedidos",
        "Password": "Senha",
        "Pay": "Pagar",
        "Pay with Card": "Pague com cartão",
        "Pay with PayPal": "Pague com PayPal",
        "Pay with a cheque": "Pague com cheque",
        "Payment": "Pagamento",
        "Payment via Wire/Bank Transfer": "Pagamento via Transferência Bancária",
        "Personal": "Pessoal",
        "Phone number": "Número de telefone",
        "Place Purchase Order": "Fazer pedido de compra",
        "Place order": "Faça a encomenda",
        "Please go back and try again. Missing required field": "Por favor volte e tente novamente. Campo obrigatório ausente",
        "Postal code": "Código postal",
        "Processing": "Em processamento",
        "Province": "Província",
        "Purchase Order": "Ordem de Compra",
        "Ready to check out?": "Pronto para conferir?",
        "Recurring total": "Total recorrente",
        "Register": "Registro",
        "Remove": "Remover",
        "Secured by": "Assegurado por",
        "Select a Province": "Selecione uma província",
        "Select a State": "Selecione um Estado",
        "Select a country": "Selecione um pais",
        "Send to": "Enviar para",
        "Ship to": "Enviar para",
        "Shipping": "Envio",
        "Sorry, something went wrong. Please refresh the page and try again.": "Desculpe, algo deu errado. Atualize a página e tente novamente.",
        "Sorry, this store does not ship to your location.": "Desculpe, esta loja não envia para sua localização.",
        "State": "Estado",
        "Street address": "endereço da Rua",
        "Subtotal": "Subtotal",
        "Tax": "Imposto",
        "Test mode: customers cannot see PeachPay": "Modo de teste: os clientes não podem ver o PeachPay",
        "There are no eligible or active payment methods available for this order.": "Não há métodos de pagamento qualificados ou ativos disponíveis para este pedido.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Este método de pagamento não é compatível com a moeda selecionada, ao clicar nesta mensagem a moeda mudará para",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Este método de pagamento não é compatível com a moeda selecionada. Ao selecionar isso, a moeda mudará para",
        "This payment method does not support the selected currency. Please switch currencies.": "Este método de pagamento não é compatível com a moeda selecionada. Por favor, troque as moedas.",
        "Total": "Total",
        "Unknown order error occurred": "Ocorreu um erro de pedido desconhecido",
        "VIEW SAVED CARDS": "VER CARTÕES GUARDADOS",
        "Verified": "Verificado",
        "View options": "Ver opções",
        "Wire/Bank Transfer": "Transferência bancária/eletrônica",
        "You entered an invalid coupon code": "Você inseriu um código de cupom inválido",
        "You entered an invalid gift card": "Você inseriu um vale-presente inválido",
        "You may also like...": "Você pode gostar...",
        "You might also like...": "Você pode gostar também...",
        "additional": "adicional",
        "and": "e",
        "coupon": "cupom",
        "info": "informação",
        "payment": "Forma de pagamento",
        "privacy policy": "política de Privacidade",
        "shipping": "envio",
        "terms": "termos",
        "terms and conditions": "termos e Condições",
        "the": "a",
        "the store's": "as lojas"
    },
    "ro-RO": {
        "+ ADD A COUPON CODE": "+ ADĂUGAȚI UN COD CUPON",
        "+ NEW CARD": "+ CARD NOU",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ RUTILIZAȚI CARDUL CADOU/CREDIT DE MAGAZIN",
        ", ": ",",
        "ADD": "ADĂUGA",
        "Add": "Adăuga",
        "Additional Information": "Informații suplimentare",
        "After selecting pay you will be redirected to complete your payment.": "După ce ați selectat plata, veți fi redirecționat pentru a finaliza plata.",
        "Apartment": "Apartament",
        "Billing": "Facturare",
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
        "Different shipping details?": "Diferite detalii de livrare?",
        "Edit": "Editați | ×",
        "Email": "E-mail",
        "Email or Username": "Adresă de e-mail sau nume de utilizator",
        "Exit Checkout": "Ieșiți din casă",
        "First name": "Nume",
        "First renewal": "Prima reînnoire",
        "Gift card number": "Numărul cardului cadou",
        "Go Back": "Întoarce-te",
        "I verify that the country I have entered is the one I reside in": "Verific că țara în care am intrat este cea în care locuiesc",
        "Initial Shipment": "Livrare inițială",
        "Last name": "Nume",
        "Login": "Autentificare",
        "My order": "Comanda mea",
        "No Thanks": "Nu multumesc",
        "Order notes": "Note de comandă",
        "Password": "Parola",
        "Pay": "A plati",
        "Pay with Card": "Plătiți cu cardul",
        "Pay with PayPal": "Plătiți cu PayPal",
        "Pay with a cheque": "Plătiți cu un cec",
        "Payment": "Plată",
        "Payment via Wire/Bank Transfer": "Plata prin transfer bancar",
        "Personal": "Personal",
        "Phone number": "Numar de telefon",
        "Place Purchase Order": "Plasați comanda de achiziție",
        "Place order": "Plasați comanda",
        "Please go back and try again. Missing required field": "Vă rugăm să reveniți și să încercați din nou. Lipsește câmp obligatoriu",
        "Postal code": "Cod poștal",
        "Processing": "Prelucrare",
        "Province": "Provincie",
        "Purchase Order": "Comandă de achiziție",
        "Ready to check out?": "Ești gata să verifici?",
        "Recurring total": "Total recurent",
        "Register": "Inregistreaza-te",
        "Remove": "Elimina",
        "Secured by": "Securizat de",
        "Select a Province": "Selectați o provincie",
        "Select a State": "Selecteaza un stat",
        "Select a country": "Selecteaza o tara",
        "Send to": "Trimite catre",
        "Ship to": "Îmbarca spre",
        "Shipping": "livrare",
        "Sorry, something went wrong. Please refresh the page and try again.": "Scuze, ceva a mers greșit. Vă rugăm să reîmprospătați pagina și să încercați din nou.",
        "Sorry, this store does not ship to your location.": "Ne pare rău, acest magazin nu se livrează în locația dvs.",
        "State": "Stat",
        "Street address": "adresa străzii",
        "Subtotal": "Subtotal",
        "Tax": "Impozit",
        "Test mode: customers cannot see PeachPay": "Mod de testare: clienții nu pot vedea PeachPay",
        "There are no eligible or active payment methods available for this order.": "Nu există metode de plată eligibile sau active disponibile pentru această comandă.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Această metodă de plată nu acceptă moneda selectată, când faceți clic pe acest mesaj moneda se va comuta",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Această metodă de plată nu acceptă moneda selectată. La selectarea acesteia, moneda va trece la",
        "This payment method does not support the selected currency. Please switch currencies.": "Această metodă de plată nu acceptă moneda selectată. Vă rugăm să schimbați moneda.",
        "Total": "Total",
        "Unknown order error occurred": "A apărut o eroare de comandă necunoscută",
        "VIEW SAVED CARDS": "VEZI CARDURI SALVATE",
        "Verified": "Verificat",
        "View options": "Vizualizați opțiunile",
        "Wire/Bank Transfer": "Transfer bancar",
        "You entered an invalid coupon code": "Ați introdus un cod de cupon nevalid",
        "You entered an invalid gift card": "Ați introdus un card cadou nevalid",
        "You may also like...": "Ați putea dori, de asemenea...",
        "You might also like...": "S-ar putea sa-ti placa si...",
        "additional": "adiţional",
        "and": "și",
        "coupon": "cupon",
        "info": "info",
        "payment": "plată",
        "privacy policy": "Politica de Confidențialitate",
        "shipping": "Transport",
        "terms": "termeni",
        "terms and conditions": "Termeni și condiții",
        "the": "cel",
        "the store's": "magazinele"
    },
    "ru-RU": {
        "+ ADD A COUPON CODE": "+ ДОБАВИТЬ КОД КУПОНА",
        "+ NEW CARD": "+ НОВАЯ КАРТА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ПОКУПАТЬ ПОДАРОЧНУЮ КАРТУ/КРЕДИТ В МАГАЗИНЕ",
        ", ": ",",
        "ADD": "ДОБАВЛЯТЬ",
        "Add": "Добавлять",
        "Additional Information": "Дополнительная информация",
        "After selecting pay you will be redirected to complete your payment.": "После выбора оплаты вы будете перенаправлены для завершения платежа.",
        "Apartment": "Квартира",
        "Billing": "Выставление счетов",
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
        "Different shipping details?": "Различные детали доставки?",
        "Edit": "Редактировать",
        "Email": "Эл. адрес",
        "Email or Username": "Электронная почта или имя пользователя",
        "Exit Checkout": "Выйти из кассы",
        "First name": "Имя",
        "First renewal": "Первое обновление",
        "Gift card number": "Номер подарочной карты",
        "Go Back": "Вернись",
        "I verify that the country I have entered is the one I reside in": "Я подтверждаю, что страна, в которую я въехал, является той, в которой я проживаю",
        "Initial Shipment": "Первоначальная отгрузка",
        "Last name": "Фамилия",
        "Login": "Авторизоваться",
        "My order": "Мой заказ",
        "No Thanks": "Спасибо, не надо",
        "Order notes": "Примечания к заказу",
        "Password": "Пароль",
        "Pay": "Платить",
        "Pay with Card": "Оплатить картой",
        "Pay with PayPal": "Оплата с PayPal",
        "Pay with a cheque": "Оплатить чеком",
        "Payment": "Оплата",
        "Payment via Wire/Bank Transfer": "Оплата банковским переводом/банковским переводом",
        "Personal": "Личный",
        "Phone number": "Телефонный номер",
        "Place Purchase Order": "Разместить заказ на покупку",
        "Place order": "Разместить заказ",
        "Please go back and try again. Missing required field": "Пожалуйста вернитесь и попробуйте снова. Отсутсвует необходимое поле",
        "Postal code": "Почтовый Код",
        "Processing": "Обработка",
        "Province": "Провинция",
        "Purchase Order": "Заказ на покупку",
        "Ready to check out?": "Готовы проверить?",
        "Recurring total": "Общая сумма",
        "Register": "регистр",
        "Remove": "Удалять",
        "Secured by": "Защищено",
        "Select a Province": "Выберите провинцию",
        "Select a State": "Выберите штат",
        "Select a country": "Выберите страну",
        "Send to": "Отправить",
        "Ship to": "Доставить",
        "Shipping": "Перевозки",
        "Sorry, something went wrong. Please refresh the page and try again.": "Извините, что-то пошло не так. Пожалуйста, обновите страницу и повторите попытку.",
        "Sorry, this store does not ship to your location.": "Извините, этот магазин не осуществляет доставку в ваш город.",
        "State": "Состояние",
        "Street address": "адрес улицы",
        "Subtotal": "Промежуточный итог",
        "Tax": "налог",
        "Test mode: customers cannot see PeachPay": "Тестовый режим: клиенты не видят PeachPay",
        "There are no eligible or active payment methods available for this order.": "Для этого заказа нет подходящих или активных способов оплаты.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Этот способ оплаты не поддерживает выбранную валюту, при нажатии на это сообщение валюта изменится на",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Этот способ оплаты не поддерживает выбранную валюту. При выборе этого валюта переключится на",
        "This payment method does not support the selected currency. Please switch currencies.": "Этот способ оплаты не поддерживает выбранную валюту. Пожалуйста, переключите валюту.",
        "Total": "Общее",
        "Unknown order error occurred": "Произошла неизвестная ошибка заказа",
        "VIEW SAVED CARDS": "ПОСМОТРЕТЬ СОХРАНЕННЫЕ КАРТЫ",
        "Verified": "проверено",
        "View options": "Параметры просмотра",
        "Wire/Bank Transfer": "Банковский перевод/банковский перевод",
        "You entered an invalid coupon code": "Вы ввели неверный код купона",
        "You entered an invalid gift card": "Вы ввели недействительную подарочную карту",
        "You may also like...": "Вам также может понравиться...",
        "You might also like...": "Вам также может понравиться...",
        "additional": "дополнительный",
        "and": "и",
        "coupon": "купон",
        "info": "Информация",
        "payment": "оплата",
        "privacy policy": "политика конфиденциальности",
        "shipping": "перевозки",
        "terms": "условия",
        "terms and conditions": "условия и положения",
        "the": "в",
        "the store's": "магазины"
    },
    "sl-SI": {
        "+ ADD A COUPON CODE": "+ DODAJ KODO KUPON",
        "+ NEW CARD": "+ NOVA KARTICA",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ IZKLJUČITE DARILNO KARTICO/KREDIT TRGOVINE",
        ", ": ",",
        "ADD": "DODAJ",
        "Add": "Dodaj",
        "Additional Information": "Dodatne informacije",
        "After selecting pay you will be redirected to complete your payment.": "Po izbiri plačila boste preusmerjeni na dokončanje plačila.",
        "Apartment": "Apartma",
        "Billing": "Zaračunavanje",
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
        "Different shipping details?": "Različni podatki o pošiljanju?",
        "Edit": "Uredi",
        "Email": "E-naslov",
        "Email or Username": "E-poštni naslov ali uporabniško ime",
        "Exit Checkout": "Izhod iz blagajne",
        "First name": "Ime",
        "First renewal": "Prva obnova",
        "Gift card number": "Številka darilne kartice",
        "Go Back": "Pojdi nazaj",
        "I verify that the country I have entered is the one I reside in": "Potrjujem, da je država, v katero sem vstopil, tista, v kateri prebivam",
        "Initial Shipment": "Začetna pošiljka",
        "Last name": "Priimek",
        "Login": "Vpiši se",
        "My order": "Moj ukaz",
        "No Thanks": "Ne hvala",
        "Order notes": "Opombe naročila",
        "Password": "Geslo",
        "Pay": "plačati",
        "Pay with Card": "Plačajte s kartico",
        "Pay with PayPal": "Plačajte s PayPal",
        "Pay with a cheque": "Plačajte s čekom",
        "Payment": "Plačilo",
        "Payment via Wire/Bank Transfer": "Plačilo z bančnim nakazilom",
        "Personal": "Osebno",
        "Phone number": "Telefonska številka",
        "Place Purchase Order": "Oddajte naročilo",
        "Place order": "Naročiti",
        "Please go back and try again. Missing required field": "Prosimo, vrnite se in poskusite znova. Manjka obvezno polje",
        "Postal code": "Poštna številka",
        "Processing": "Obravnavati",
        "Province": "provinca",
        "Purchase Order": "Naročilnica",
        "Ready to check out?": "Ste pripravljeni na odjavo?",
        "Recurring total": "Ponavljajoče se skupno",
        "Register": "Registrirajte se",
        "Remove": "Odstrani",
        "Secured by": "Zavarovano z",
        "Select a Province": "Izberite provinco",
        "Select a State": "Izberite državo",
        "Select a country": "Izberite državo",
        "Send to": "Pošlji",
        "Ship to": "Poslati v",
        "Shipping": "Dostava",
        "Sorry, something went wrong. Please refresh the page and try again.": "Oprostite, nekaj je šlo narobe. Osvežite stran in poskusite znova.",
        "Sorry, this store does not ship to your location.": "Žal ta trgovina ne pošilja na vašo lokacijo.",
        "State": "Država",
        "Street address": "naslov ceste",
        "Subtotal": "Vmesni seštevek",
        "Tax": "davek",
        "Test mode: customers cannot see PeachPay": "Testni način: stranke ne vidijo PeachPay",
        "There are no eligible or active payment methods available for this order.": "Za to naročilo ni na voljo nobenih ustreznih ali aktivnih plačilnih sredstev.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "To plačilno sredstvo ne podpira izbrane valute, s klikom na to sporočilo se bo valuta preklopila",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "To plačilno sredstvo ne podpira izbrane valute. Ko izberete to, se valuta preklopi na",
        "This payment method does not support the selected currency. Please switch currencies.": "To plačilno sredstvo ne podpira izbrane valute. Prosimo, zamenjajte valuto.",
        "Total": "Skupaj",
        "Unknown order error occurred": "Prišlo je do neznane napake pri naročilu",
        "VIEW SAVED CARDS": "OGLED SHRANJENIH KARTIC",
        "Verified": "Preverjeno",
        "View options": "Ogled možnosti",
        "Wire/Bank Transfer": "Bančno nakazilo",
        "You entered an invalid coupon code": "Vnesli ste neveljavno kodo kupona",
        "You entered an invalid gift card": "Vnesli ste neveljavno darilno kartico",
        "You may also like...": "Morda vam bo všeč tudi ...",
        "You might also like...": "Morda bi vam bilo všeč tudi...",
        "additional": "dodatno",
        "and": "in",
        "coupon": "kupon",
        "info": "info",
        "payment": "plačilo",
        "privacy policy": "politika zasebnosti",
        "shipping": "Dostava",
        "terms": "pogojev",
        "terms and conditions": "pogoji",
        "the": "the",
        "the store's": "v trgovini"
    },
    "sv-SE": {
        "+ ADD A COUPON CODE": "+ LÄGG TILL EN KUPONGKOD",
        "+ NEW CARD": "+ NYTT KORT",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ LÖS IN PRESENTKORT/BUTIKKREDIT",
        ", ": ",",
        "ADD": "LÄGG TILL",
        "Add": "Lägg till",
        "Additional Information": "ytterligare information",
        "After selecting pay you will be redirected to complete your payment.": "När du har valt betala kommer du att omdirigeras för att slutföra din betalning.",
        "Apartment": "Lägenhet",
        "Billing": "Fakturering",
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
        "Different shipping details?": "Olika fraktdetaljer?",
        "Edit": "Redigera",
        "Email": "E-post",
        "Email or Username": "Email eller användarnamn",
        "Exit Checkout": "Avsluta kassan",
        "First name": "Förnamn",
        "First renewal": "Första förnyelsen",
        "Gift card number": "Presentkortsnummer",
        "Go Back": "Gå tillbaka",
        "I verify that the country I have entered is the one I reside in": "Jag verifierar att det land jag har angett är det jag bor i",
        "Initial Shipment": "Första leverans",
        "Last name": "Efternamn",
        "Login": "Logga in",
        "My order": "Min order",
        "No Thanks": "Nej tack",
        "Order notes": "Beställ anteckningar",
        "Password": "Lösenord",
        "Pay": "Betala",
        "Pay with Card": "Betala med kort",
        "Pay with PayPal": "Betala med PayPal",
        "Pay with a cheque": "Betala med check",
        "Payment": "Betalning",
        "Payment via Wire/Bank Transfer": "Betalning via banköverföring",
        "Personal": "Personlig",
        "Phone number": "Telefonnummer",
        "Place Purchase Order": "Lägg inköpsorder",
        "Place order": "Beställa",
        "Please go back and try again. Missing required field": "Gå tillbaka och försök igen. Ett nödvändigt fält saknas",
        "Postal code": "Postnummer",
        "Processing": "Bearbetning",
        "Province": "Provins",
        "Purchase Order": "Inköpsorder",
        "Ready to check out?": "Redo att checka ut?",
        "Recurring total": "Återkommande totalt",
        "Register": "Registrera",
        "Remove": "Ta bort",
        "Secured by": "Säkrad av",
        "Select a Province": "Välj en provins",
        "Select a State": "Välj en stat",
        "Select a country": "Välj ett land",
        "Send to": "Skicka till",
        "Ship to": "Frakta till",
        "Shipping": "Frakt",
        "Sorry, something went wrong. Please refresh the page and try again.": "Förlåt, något gick fel. Uppdatera sidan och försök igen.",
        "Sorry, this store does not ship to your location.": "Tyvärr, denna butik skickar inte till din plats.",
        "State": "stat",
        "Street address": "Gatuadress",
        "Subtotal": "Delsumma",
        "Tax": "Beskatta",
        "Test mode: customers cannot see PeachPay": "Testläge: kunder kan inte se PeachPay",
        "There are no eligible or active payment methods available for this order.": "Det finns inga kvalificerade eller aktiva betalningsmetoder tillgängliga för denna beställning.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Den här betalningsmetoden stöder inte den valda valutan, när du klickar på detta meddelande kommer valutan att växla till",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Denna betalningsmetod stöder inte den valda valutan. När du väljer detta kommer valutan att växla till",
        "This payment method does not support the selected currency. Please switch currencies.": "Denna betalningsmetod stöder inte den valda valutan. Vänligen byt valuta.",
        "Total": "Total",
        "Unknown order error occurred": "Okänt beställningsfel uppstod",
        "VIEW SAVED CARDS": "VISA SPARADE KORT",
        "Verified": "Verifierad",
        "View options": "Visa alternativ",
        "Wire/Bank Transfer": "Banköverföring",
        "You entered an invalid coupon code": "Du angav en ogiltig kupongkod",
        "You entered an invalid gift card": "Du angav ett ogiltigt presentkort",
        "You may also like...": "Du kanske också gillar...",
        "You might also like...": "Du kanske också gillar...",
        "additional": "ytterligare",
        "and": "och",
        "coupon": "kupong",
        "info": "info",
        "payment": "betalning",
        "privacy policy": "integritetspolicy",
        "shipping": "frakt",
        "terms": "villkor",
        "terms and conditions": "Villkor",
        "the": "de",
        "the store's": "affärerna"
    },
    "th": {
        "+ ADD A COUPON CODE": "+ เพิ่มรหัสคูปอง",
        "+ NEW CARD": "+ การ์ดใหม่",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ แลกบัตรของขวัญ/เครดิตร้านค้า",
        ", ": ",",
        "ADD": "เพิ่ม",
        "Add": "เพิ่ม",
        "Additional Information": "ข้อมูลเพิ่มเติม",
        "After selecting pay you will be redirected to complete your payment.": "หลังจากเลือกชำระเงินแล้ว ระบบจะเปลี่ยนเส้นทางเพื่อชำระเงินให้เสร็จสิ้น",
        "Apartment": "อพาร์ทเม้น",
        "Billing": "การเรียกเก็บเงิน",
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
        "Different shipping details?": "รายละเอียดการจัดส่งที่แตกต่างกัน?",
        "Edit": "แก้ไข",
        "Email": "อีเมล",
        "Email or Username": "อีเมล์หรือชื่อผู้ใช้",
        "Exit Checkout": "ออกจากการชำระเงิน",
        "First name": "ชื่อจริง",
        "First renewal": "ต่ออายุครั้งแรก",
        "Gift card number": "หมายเลขบัตรของขวัญ",
        "Go Back": "ย้อนกลับ",
        "I verify that the country I have entered is the one I reside in": "ฉันยืนยันว่าประเทศที่ฉันเข้ามาเป็นประเทศที่ฉันอาศัยอยู่",
        "Initial Shipment": "การจัดส่งครั้งแรก",
        "Last name": "นามสกุล",
        "Login": "เข้าสู่ระบบ",
        "My order": "คำสั่งของฉัน",
        "No Thanks": "ไม่เป็นไรขอบคุณ",
        "Order notes": "หมายเหตุการสั่งซื้อ",
        "Password": "รหัสผ่าน",
        "Pay": "จ่าย",
        "Pay with Card": "ชำระด้วยบัตร",
        "Pay with PayPal": "ชำระเงินด้วย PayPal",
        "Pay with a cheque": "จ่ายด้วยเช็ค",
        "Payment": "การชำระเงิน",
        "Payment via Wire/Bank Transfer": "ชำระเงินด้วยการโอนเงินผ่านธนาคาร/โอนเงินผ่านธนาคาร",
        "Personal": "ส่วนตัว",
        "Phone number": "หมายเลขโทรศัพท์",
        "Place Purchase Order": "วางใบสั่งซื้อ",
        "Place order": "สถานที่การสั่งซื้อ",
        "Please go back and try again. Missing required field": "โปรดกลับไปและลองอีกครั้ง ไม่มีช่องที่ต้องกรอก",
        "Postal code": "รหัสไปรษณีย์",
        "Processing": "กำลังประมวลผล",
        "Province": "จังหวัด",
        "Purchase Order": "ใบสั่งซื้อ",
        "Ready to check out?": "พร้อมที่จะเช็คเอาท์?",
        "Recurring total": "ยอดรวมที่เกิดซ้ำ",
        "Register": "ลงทะเบียน",
        "Remove": "ลบ",
        "Secured by": "ปลอดภัยโดย",
        "Select a Province": "เลือกจังหวัด",
        "Select a State": "เลือกรัฐ",
        "Select a country": "เลือกประเทศ",
        "Send to": "ส่งถึง",
        "Ship to": "ส่งไปที่",
        "Shipping": "การส่งสินค้า",
        "Sorry, something went wrong. Please refresh the page and try again.": "ขอโทษมีบางอย่างผิดพลาด. โปรดรีเฟรชหน้าแล้วลองอีกครั้ง",
        "Sorry, this store does not ship to your location.": "ขออภัย ร้านค้านี้ไม่ได้จัดส่งไปยังตำแหน่งของคุณ",
        "State": "สถานะ",
        "Street address": "ที่อยู่ถนน",
        "Subtotal": "ยอดรวม",
        "Tax": "ภาษี",
        "Test mode: customers cannot see PeachPay": "โหมดทดสอบ: ลูกค้าไม่สามารถเห็น PeachPay",
        "There are no eligible or active payment methods available for this order.": "ไม่มีวิธีการชำระเงินที่มีสิทธิ์หรือใช้งานได้สำหรับคำสั่งซื้อนี้",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก เมื่อคลิกข้อความนี้ สกุลเงินจะเปลี่ยนเป็น",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก เมื่อเลือกตัวเลือกนี้ สกุลเงินจะเปลี่ยนเป็น",
        "This payment method does not support the selected currency. Please switch currencies.": "วิธีการชำระเงินนี้ไม่รองรับสกุลเงินที่เลือก กรุณาเปลี่ยนสกุลเงิน",
        "Total": "ทั้งหมด",
        "Unknown order error occurred": "เกิดข้อผิดพลาดในการสั่งซื้อที่ไม่รู้จัก",
        "VIEW SAVED CARDS": "ดูการ์ดที่บันทึกไว้",
        "Verified": "ตรวจสอบแล้ว",
        "View options": "ดูตัวเลือก",
        "Wire/Bank Transfer": "โอนเงิน/โอนเงินผ่านธนาคาร",
        "You entered an invalid coupon code": "คุณป้อนรหัสคูปองไม่ถูกต้อง",
        "You entered an invalid gift card": "คุณป้อนบัตรของขวัญที่ไม่ถูกต้อง",
        "You may also like...": "คุณอาจชอบ...",
        "You might also like...": "คุณอาจชอบ...",
        "additional": "เพิ่มเติม",
        "and": "และ",
        "coupon": "คูปอง",
        "info": "ข้อมูล",
        "payment": "การชำระเงิน",
        "privacy policy": "นโยบายความเป็นส่วนตัว",
        "shipping": "การส่งสินค้า",
        "terms": "เงื่อนไข",
        "terms and conditions": "ข้อกำหนดและเงื่อนไข",
        "the": "ที่",
        "the store's": "ของร้าน"
    },
    "uk": {
        "+ ADD A COUPON CODE": "+ ДОДАТИ КОД КУПОНА",
        "+ NEW CARD": "+ НОВА КАРТКА",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ ВИКЛЮЧИТИ ПОДАРУНКУ КАРТКУ/КРЕДИТ МАГАЗИНУ",
        ", ": ",",
        "ADD": "ДОДАТИ",
        "Add": "додати",
        "Additional Information": "Додаткова інформація",
        "After selecting pay you will be redirected to complete your payment.": "Після вибору оплати вас буде переспрямовано для завершення оплати.",
        "Apartment": "Квартира",
        "Billing": "Виставлення рахунків",
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
        "Different shipping details?": "Інші деталі доставки?",
        "Edit": "Редагувати",
        "Email": "Електронна пошта",
        "Email or Username": "Електронна пошта або ім'я користувача",
        "Exit Checkout": "Вийти з Checkout",
        "First name": "Ім'я",
        "First renewal": "Перше оновлення",
        "Gift card number": "Номер подарункової картки",
        "Go Back": "Повертайся",
        "I verify that the country I have entered is the one I reside in": "Я підтверджую, що країна, в яку я ввійшов, є тією, в якій я проживаю",
        "Initial Shipment": "Початкове відправлення",
        "Last name": "Прізвище",
        "Login": "Логін",
        "My order": "Моє замовлення",
        "No Thanks": "Ні, дякую",
        "Order notes": "Примітки до замовлення",
        "Password": "Пароль",
        "Pay": "Платити",
        "Pay with Card": "Оплата карткою",
        "Pay with PayPal": "Оплатіть через PayPal",
        "Pay with a cheque": "Оплата чеком",
        "Payment": "оплата",
        "Payment via Wire/Bank Transfer": "Оплата банківським переказом",
        "Personal": "Особистий",
        "Phone number": "Номер телефону",
        "Place Purchase Order": "Розмістити замовлення на покупку",
        "Place order": "Зробити замовлення",
        "Please go back and try again. Missing required field": "Будь ласка, поверніться та спробуйте ще раз. Відсутнє обов’язкове поле",
        "Postal code": "Поштовий індекс",
        "Processing": "Обробка",
        "Province": "провінція",
        "Purchase Order": "Замовлення на придбання",
        "Ready to check out?": "Готові перевірити?",
        "Recurring total": "Повторюваний підсумок",
        "Register": "зареєструватися",
        "Remove": "Видалити",
        "Secured by": "Забезпечений",
        "Select a Province": "Виберіть провінцію",
        "Select a State": "Виберіть штат",
        "Select a country": "Виберіть країну",
        "Send to": "Відправити",
        "Ship to": "Відправити до",
        "Shipping": "Доставка",
        "Sorry, something went wrong. Please refresh the page and try again.": "Вибачте, щось пішло не так. Оновіть сторінку та спробуйте ще раз.",
        "Sorry, this store does not ship to your location.": "На жаль, цей магазин не доставляє до вашого місцезнаходження.",
        "State": "держава",
        "Street address": "Адреса вулиці",
        "Subtotal": "Проміжний підсумок",
        "Tax": "податок",
        "Test mode: customers cannot see PeachPay": "Тестовий режим: клієнти не бачать PeachPay",
        "There are no eligible or active payment methods available for this order.": "Для цього замовлення немає доступних або активних способів оплати.",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "Цей спосіб оплати не підтримує вибрану валюту, після натискання на це повідомлення валюта перейде",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "Цей спосіб оплати не підтримує вибрану валюту. Після вибору цього параметра валюта перейде на",
        "This payment method does not support the selected currency. Please switch currencies.": "Цей спосіб оплати не підтримує вибрану валюту. Будь ласка, змініть валюту.",
        "Total": "Всього",
        "Unknown order error occurred": "Сталася невідома помилка замовлення",
        "VIEW SAVED CARDS": "ПЕРЕГЛЯНУТИ ЗБЕРЕЖЕНІ КАРТКИ",
        "Verified": "Перевірено",
        "View options": "Переглянути параметри",
        "Wire/Bank Transfer": "Банківський переказ",
        "You entered an invalid coupon code": "Ви ввели недійсний код купона",
        "You entered an invalid gift card": "Ви ввели недійсну подарункову картку",
        "You may also like...": "Вам також може сподобатися...",
        "You might also like...": "Вам також може сподобатися...",
        "additional": "додатковий",
        "and": "і",
        "coupon": "купон",
        "info": "інформація",
        "payment": "оплата",
        "privacy policy": "політика конфіденційності",
        "shipping": "Доставка",
        "terms": "терміни",
        "terms and conditions": "правила та умови",
        "the": "в",
        "the store's": "магазину"
    },
    "zh-CN": {
        "+ ADD A COUPON CODE": "+ 添加优惠券代码",
        "+ NEW CARD": "+ 新卡",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 兑换礼品卡/商店信用卡",
        ", ": ",",
        "ADD": "添加",
        "Add": "添加",
        "Additional Information": "附加信息",
        "After selecting pay you will be redirected to complete your payment.": "选择付款后，您将被重定向以完成付款。",
        "Apartment": "公寓",
        "Billing": "计费",
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
        "Different shipping details?": "不同的运输细节？",
        "Edit": "编辑",
        "Email": "电子邮件",
        "Email or Username": "电子邮件或用户名",
        "Exit Checkout": "退出结帐",
        "First name": "名",
        "First renewal": "第一次更新",
        "Gift card number": "礼品卡号",
        "Go Back": "回去",
        "I verify that the country I have entered is the one I reside in": "我确认我输入的国家是我居住的国家",
        "Initial Shipment": "初始装运",
        "Last name": "姓",
        "Login": "登录",
        "My order": "我的订单",
        "No Thanks": "不，谢谢",
        "Order notes": "订单备注",
        "Password": "密码",
        "Pay": "支付",
        "Pay with Card": "刷卡支付",
        "Pay with PayPal": "使用贝宝付款",
        "Pay with a cheque": "用支票付款",
        "Payment": "支付",
        "Payment via Wire/Bank Transfer": "通过电汇/银行转账付款",
        "Personal": "个人的",
        "Phone number": "电话号码",
        "Place Purchase Order": "下采购订单",
        "Place order": "下订单",
        "Please go back and try again. Missing required field": "请返回重试。缺少必填字段",
        "Postal code": "邮政编码",
        "Processing": "加工",
        "Province": "省",
        "Purchase Order": "采购订单",
        "Ready to check out?": "准备好退房了吗？",
        "Recurring total": "经常性总计",
        "Register": "登记",
        "Remove": "消除",
        "Secured by": "担保人",
        "Select a Province": "选择一个省份",
        "Select a State": "选择一个州",
        "Select a country": "选择一个国家",
        "Send to": "发送至",
        "Ship to": "运送到",
        "Shipping": "船运",
        "Sorry, something went wrong. Please refresh the page and try again.": "抱歉，出了一些问题。请刷新页面并重试。",
        "Sorry, this store does not ship to your location.": "对不起，这家商店不送货到您的位置。",
        "State": "状态",
        "Street address": "街道地址",
        "Subtotal": "小计",
        "Tax": "税",
        "Test mode: customers cannot see PeachPay": "测试模式：客户看不到PeachPay",
        "There are no eligible or active payment methods available for this order.": "此订单没有可用的合格或有效付款方式。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "此付款方式不支持所选币种，点击此消息后币种将切换为",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "此付款方式不支持所选货币。选择此项后，货币将切换为",
        "This payment method does not support the selected currency. Please switch currencies.": "此付款方式不支持所选货币。请切换货币。",
        "Total": "全部的",
        "Unknown order error occurred": "发生未知订单错误",
        "VIEW SAVED CARDS": "查看保存的卡片",
        "Verified": "已验证",
        "View options": "查看选项",
        "Wire/Bank Transfer": "电汇/银行转账",
        "You entered an invalid coupon code": "您输入的优惠券代码无效",
        "You entered an invalid gift card": "您输入的礼品卡无效",
        "You may also like...": "你也许也喜欢...",
        "You might also like...": "你可能还喜欢...",
        "additional": "额外的",
        "and": "和",
        "coupon": "优惠券",
        "info": "信息",
        "payment": "支付",
        "privacy policy": "隐私政策",
        "shipping": "航运",
        "terms": "条款",
        "terms and conditions": "条款和条件",
        "the": "这",
        "the store's": "商店的"
    },
    "zh-TW": {
        "+ ADD A COUPON CODE": "+ 添加優惠券代碼",
        "+ NEW CARD": "+ 新卡",
        "+ REDEEM GIFT CARD/STORE CREDIT": "+ 兌換禮品卡/商店信用卡",
        ", ": ",",
        "ADD": "添加",
        "Add": "添加",
        "Additional Information": "附加信息",
        "After selecting pay you will be redirected to complete your payment.": "選擇付款後，您將被重定向以完成付款。",
        "Apartment": "公寓",
        "Billing": "計費",
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
        "Different shipping details?": "不同的運輸細節？",
        "Edit": "編輯",
        "Email": "電子郵件",
        "Email or Username": "電子郵件或用戶名",
        "Exit Checkout": "退出結帳",
        "First name": "名",
        "First renewal": "第一次更新",
        "Gift card number": "禮品卡號",
        "Go Back": "回去",
        "I verify that the country I have entered is the one I reside in": "我確認我輸入的國家是我居住的國家",
        "Initial Shipment": "初始裝運",
        "Last name": "姓",
        "Login": "登錄",
        "My order": "我的訂單",
        "No Thanks": "不，謝謝",
        "Order notes": "訂單備註",
        "Password": "密碼",
        "Pay": "支付",
        "Pay with Card": "刷卡支付",
        "Pay with PayPal": "使用貝寶付款",
        "Pay with a cheque": "用支票付款",
        "Payment": "支付",
        "Payment via Wire/Bank Transfer": "通過電匯/銀行轉賬付款",
        "Personal": "個人的",
        "Phone number": "電話號碼",
        "Place Purchase Order": "下採購訂單",
        "Place order": "下訂單",
        "Please go back and try again. Missing required field": "請返回重試。缺少必填字段",
        "Postal code": "郵政編碼",
        "Processing": "加工",
        "Province": "省",
        "Purchase Order": "採購訂單",
        "Ready to check out?": "準備好退房了嗎？",
        "Recurring total": "經常性總計",
        "Register": "登記",
        "Remove": "消除",
        "Secured by": "擔保人",
        "Select a Province": "選擇一個省份",
        "Select a State": "選擇一個州",
        "Select a country": "選擇一個國家",
        "Send to": "發送至",
        "Ship to": "運送到",
        "Shipping": "船運",
        "Sorry, something went wrong. Please refresh the page and try again.": "抱歉，出了一些問題。請刷新頁面並重試。",
        "Sorry, this store does not ship to your location.": "對不起，這家商店不送貨到您的位置。",
        "State": "狀態",
        "Street address": "街道地址",
        "Subtotal": "小計",
        "Tax": "稅",
        "Test mode: customers cannot see PeachPay": "測試模式：客戶看不到PeachPay",
        "There are no eligible or active payment methods available for this order.": "此訂單沒有可用的合格或有效付款方式。",
        "This payment method does not support the selected currency, on clicking this message the currency will switch to": "此付款方式不支持所選幣種，點擊此消息後幣種將切換為",
        "This payment method does not support the selected currency. On selecting this, the currency will switch to": "此付款方式不支持所選貨幣。選擇此項後，貨幣將切換為",
        "This payment method does not support the selected currency. Please switch currencies.": "此付款方式不支持所選貨幣。請切換貨幣。",
        "Total": "全部的",
        "Unknown order error occurred": "發生未知訂單錯誤",
        "VIEW SAVED CARDS": "查看保存的卡片",
        "Verified": "已驗證",
        "View options": "查看選項",
        "Wire/Bank Transfer": "電匯/銀行轉賬",
        "You entered an invalid coupon code": "您輸入的優惠券代碼無效",
        "You entered an invalid gift card": "您輸入的禮品卡無效",
        "You may also like...": "你也許也喜歡...",
        "You might also like...": "你可能還喜歡...",
        "additional": "額外的",
        "and": "和",
        "coupon": "優惠券",
        "info": "信息",
        "payment": "支付",
        "privacy policy": "隱私政策",
        "shipping": "航運",
        "terms": "條款",
        "terms and conditions": "條款和條件",
        "the": "這",
        "the store's": "商店的"
    }
};
function isDevEnvironment(baseUrl) {
    return baseUrl === 'https://dev.peachpay.app/' || baseUrl === 'https://dev.peachpay.local/' || baseUrl === 'https://prod.peachpay.local/';
}
function getBaseURL(merchantHostname, isTestMode) {
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
        case 'demo.peachpay.app':
            return 'https://dev.peachpay.app/';
        case 'store.local':
        case 'woo.store.local':
            return 'https://prod.peachpay.local/';
        default:
            return 'https://prod.peachpay.app/';
    }
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
function stripHtml(html, preFilterSelector) {
    if (preFilterSelector === void 0) { preFilterSelector = 'a'; }
    var temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;
    if (preFilterSelector) {
        temporalDivElement.querySelectorAll(preFilterSelector).forEach(function ($el) { return $el.remove(); });
    }
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
}
var GLOBAL = {
    completedOrder: null,
    phpData: null,
    linkedProductsIds: []
};
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
function isRequiredField(name, fieldData) {
    for (var orderNumber in fieldData) {
        if (name === fieldData[orderNumber].field_name) {
            return fieldData[orderNumber].field_required ? true : false;
        }
    }
    return false;
}
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
var updateMerchantCurrencyConfig = createDispatchUpdate(DispatchActionType.MERCHANT_GENERAL_CURRENCY);
var updateMerchantTaxConfig = createDispatchUpdate(DispatchActionType.MERCHANT_TAX);
var updateMerchantGeneralConfig = createDispatchUpdate(DispatchActionType.MERCHANT_GENERAL);
var updateMerchantAccountConfig = createDispatchUpdate(DispatchActionType.MERCHANT_ACCOUNT);
var updateMerchantShippingConfig = createDispatchUpdate(DispatchActionType.MERCHANT_SHIPPING);
var updateMerchantHostName = createDispatchUpdate(DispatchActionType.MERCHANT_HOSTNAME);
var updateMerchantName = createDispatchUpdate(DispatchActionType.MERCHANT_NAME);
var MerchantConfiguration = {
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
var Environment = {
    environment: function () { return store.getState().environment; },
    language: function () { return store.getState().environment.language; },
    testMode: function () { return store.getState().environment.plugin.mode === 'test'; },
    apiURL: function () { return getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()); },
    isOurStore: function () {
        var domain = MerchantConfiguration.hostName().replace(/^https?:\/\//i, '');
        return domain === 'woo.peachpay.app' || domain === 'shop.peachpay.app' || domain === 'localhost' || domain === 'woo.store.local' || domain === 'store.local' || domain === 'demo.peachpay.app' || domain === 'oneclickcheckout.com';
    },
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
    FeatureFlag["CURRENCY_SWITCHER_INPUT"] = 'currency_switcher_input';
    FeatureFlag["ONE_CLICK_UPSELL"] = 'peachpay_ocu';
    FeatureFlag["RELATED_PRODUCTS"] = 'related_products';
    FeatureFlag["QUANTITY_CHANGER"] = 'display_quantity_changer';
    FeatureFlag["PRODUCT_IMAGES"] = 'display_product_images';
    FeatureFlag["PURCHASE_ORDER"] = 'purchase_order_payment_method';
    FeatureFlag["COD_PAYMENT"] = 'cod_payment_method';
    FeatureFlag["CHEQUE_PAYMENT"] = 'cheque_payment_method';
    FeatureFlag["BACS_PAYMENT"] = 'bacs_payment_method';
    FeatureFlag["STORE_SUPPORT_MESSAGE"] = 'store_support_message';
    FeatureFlag["FIELD_EDITOR"] = 'enable_field_editor';
})(FeatureFlag || (FeatureFlag = {}));
function getLocaleText(key) {
    var wpLocale = Environment.language();
    if (wpLocale == 'en-US' || !peachpayi18n[wpLocale] || !peachpayi18n[wpLocale][key]) {
        return key;
    }
    return peachpayi18n[wpLocale][key];
}
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
var setSessionId = createDispatchUpdate(DispatchActionType.ORDER_SESSION_ID);
var updateCustomerAddressValidation = createDispatchUpdate(DispatchActionType.ORDER_ADDRESS_VALIDATED);
var setExtraFields = createDispatchUpdate(DispatchActionType.ORDER_SET_EXTRA_FIELDS);
var setOrderError = createDispatchUpdate(DispatchActionType.ORDER_SET_ERROR_MESSAGE);
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
function syncFields(event) {
    var $form = event.target.closest('form');
    var fieldRecord = {};
    for (var _i = 0, _a = Array.from($form.elements); _i < _a.length; _i++) {
        var $input = _a[_i];
        if ($input.type === 'radio') {
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
    cleanFormFields(fieldRecord);
    store.dispatch(setExtraFields(fieldRecord));
}
function collectAdditionalFieldData(fieldData, fieldOrder) {
    var _a, _b, _c, _d, _e, _f;
    var fieldDataRecord = {};
    var location1 = Environment.customer.existing() ? 'existing' : 'new';
    for (var _i = 0, fieldOrder_1 = fieldOrder; _i < fieldOrder_1.length; _i++) {
        var orderNumber = fieldOrder_1[_i];
        var temporaryData = {
            name: ''
        };
        temporaryData.label = fieldData[orderNumber].field_label;
        temporaryData.name = fieldData[orderNumber].field_name;
        if (fieldData[orderNumber].field_enable && ((_a = $qs("#".concat(fieldData[orderNumber].field_name, "-").concat(location1))) === null || _a === void 0 ? void 0 : _a.value)) {
            temporaryData.value = (_b = $qs("#".concat(fieldData[orderNumber].field_name, "-").concat(location1))) === null || _b === void 0 ? void 0 : _b.value;
            fieldDataRecord[temporaryData.name] = (_c = temporaryData.value) !== null && _c !== void 0 ? _c : '';
        }
        if (fieldData[orderNumber].type_list === 'radio' && fieldData[orderNumber].field_enable) {
            if ((_d = $qs("input[name=".concat(fieldData[orderNumber].field_name, "]:checked"))) === null || _d === void 0 ? void 0 : _d.value) {
                temporaryData.value = (_e = $qs("input[name=".concat(fieldData[orderNumber].field_name, "]:checked"))) === null || _e === void 0 ? void 0 : _e.value;
                fieldDataRecord[temporaryData.name] = (_f = temporaryData.value) !== null && _f !== void 0 ? _f : '';
            }
        }
    }
    return fieldDataRecord;
}
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
    var _a, _b, _c, _d;
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
    generateFields(fieldData, fieldOrder);
    (_c = $qs('#additional-fields-new')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', syncFields);
    (_d = $qs('#additional-fields-existing')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', syncFields);
    $qsAll('.pp-accordion-header').forEach(function ($ah) {
        $ah.addEventListener('click', function () {
            if ($ah.classList.contains('fill')) {
                $ah.classList.remove('fill');
            }
            else {
                $ah.classList.add('fill');
            }
            var $inner = $ah.nextElementSibling;
            if ($inner) {
                if ($inner.classList.contains('collapse')) {
                    $inner.classList.remove('collapse');
                }
                else {
                    $inner.classList.add('collapse');
                }
            }
            var $chevron = $ah.getElementsByTagName('img')[0];
            if ($chevron) {
                if ($chevron.style.transform === 'scaleY(-1)') {
                    $chevron.style.transform = 'scaleY(1)';
                }
                else {
                    $chevron.style.transform = 'scaleY(-1)';
                }
            }
        });
    });
    store.subscribe(function () {
        renderExtraFields(PeachPayOrder.extraFieldsRecord());
    });
}
function renderExtraFields(extraFieldData) {
    var _loop_2 = function (key, value) {
        var $element = $qs("[name=\"".concat(key, "\"].extra-field"));
        if (($element === null || $element === void 0 ? void 0 : $element.type) === 'radio') {
            $qsAll("[name=\"".concat(key, "\"][value=\"").concat(value, "\"].extra-field"), function ($element) { return $element.checked = true; });
            return "continue";
        }
        if (($element === null || $element === void 0 ? void 0 : $element.type) === 'checkbox') {
            $qsAll("[name=\"".concat(key, "\"][value=\"").concat(value, "\"].extra-field"), function ($element) { return $element.checked = true; });
        }
        else {
            $qsAll("[name=\"".concat(key, "\"].extra-field"), function ($element) { return $element.value = value; });
        }
    };
    for (var _i = 0, _a = Object.entries(extraFieldData); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        _loop_2(key, value);
    }
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
            fieldOrder.forEach(function (orderNumber) {
                var datum = fieldData[orderNumber];
                var fieldItem = field('-existing', datum, true);
                fields1_1 += fieldItem;
            });
            existPageElement.innerHTML += fields1_1;
        }
    }
}
function generateFieldElement(location1, fieldData, accordion) {
    var _a, _b;
    var elementString = '';
    var accordionBuilder = function (inner) {
        return "\n\t\t\t<div class=\"pp-accordion-section\">\n\t\t\t\t<div class=\"pp-accordion-header\">\n\t\t\t\t\t<div class=\"pp-accordion-header-text\">\n\t\t\t\t\t\t".concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src=\"img/chevron-down-solid.svg\" class=\"pp-accordion-arrow\"/>\n\t\t\t\t\t<div class=\"pp-accordion-header-bg\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"accordion-inner collapse\">\n\t\t\t\t\t").concat(inner, "\n\t\t\t\t</div>\n\t\t\t</div>");
    };
    var formLabelBuilder = function (location1) { return "<label for=\"".concat(fieldData.field_name + location1, "\" class=\"pp-form-label\">\n\t\t\t").concat(fieldData.field_label + (fieldData.field_required ? '*' : ''), "\n\t\t</label>"); };
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
        var inner = "\n\t\t\t<div class=\"pp-checkbox\">\n\t\t\t\t<div class=\"pp-alt-label-container\">\n\t\t\t\t\t<div class=\"pp-alt-label\">".concat(fieldData.field_label, "</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"pp-switch-container\">\n\t\t\t\t\t<label class=\"pp-switch\" style=\"float: right;\">\n\t\t\t\t\t\t<input\n\t\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\t\tid=\"").concat(fieldData.field_name, "\" \n\t\t\t\t\t\t\tclass=\"extra-field\"\n\t\t\t\t\t\t\tname=\"").concat(fieldData.field_name, "\" \n\t\t\t\t\t\t\tvalue=\"").concat(fieldData.field_default ? fieldData.field_default : '1', "\" \n\t\t\t\t\t\t\tstyle=\"float: right;\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t<span class=\"pp-slider round\"></span>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>");
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
function checkRequiredFields() {
    var _a, _b, _c, _d, _e, _f, _g;
    var shouldCheckInfoForm = Environment.modalUI.page() === 'returning' || Environment.modalUI.page() === 'info';
    if (shouldCheckInfoForm) {
        var infoFormValidity = (_b = (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.checkValidity()) !== null && _b !== void 0 ? _b : false;
        if (!infoFormValidity) {
            store.dispatch(updateEnvironment({
                modalPageType: 'info',
                customerExists: false,
                requestedPage: undefined
            }));
            (_c = $qs('#pp-info-form')) === null || _c === void 0 ? void 0 : _c.reportValidity();
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
        couponRecord: function () { var _a; return (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record; },
        giftCardTotal: function (giftCard) { var _a, _b, _c; return (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) === null || _b === void 0 ? void 0 : _b[giftCard]) !== null && _c !== void 0 ? _c : 0; },
        totalAppliedGiftCards: function () { var _a, _b; return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
            var _ = _a[0], value = _a[1];
            return previousValue + (value !== null && value !== void 0 ? value : 0);
        }, 0); },
        totalShipping: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total_shipping) !== null && _b !== void 0 ? _b : 0; },
        totalTax: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total_tax) !== null && _b !== void 0 ? _b : 0; },
        total: function () { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.total) !== null && _b !== void 0 ? _b : 0; }
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
    }
};
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
function updateCustomerMerchantAccount(merchantCustomer) {
    return {
        type: DispatchActionType.MERCHANT_CUSTOMER,
        payload: merchantCustomer
    };
}
var MerchantCustomer = {
    loggedIn: function () { return store.getState().merchantCustomer.loggedIn; }
};
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
    var cardIndex = eligibleMethods.findIndex(function (pm) { return pm.provider === 'stripe' && pm.method === 'card'; });
    if (cardIndex !== -1) {
        primaryMethods.push({
            provider: 'stripe',
            method: 'card'
        });
        eligibleMethods.splice(cardIndex, 1);
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
        var cartTotal = DefaultCart.total();
        if (method.supports.minimumTotal && method.supports.minimumTotal > cartTotal) {
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
        var merchantCountryCode = (_b = (_a = MerchantConfiguration.general.wcLocationInfoData()) === null || _a === void 0 ? void 0 : _a.store_country) !== null && _b !== void 0 ? _b : 'US';
        if (!method.supports.merchantCountries.includes(merchantCountryCode) && !method.supports.merchantCountries.includes('ALL')) {
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
function peachpayAlert(message, action) {
    if (action === void 0) { action = ''; }
    window.parent.postMessage({
        event: 'peachpayAlert',
        action: action,
        message: message
    }, '*');
}
function stateProvinceOrCounty(countryCode) {
    switch (countryCode) {
        case 'US':
        case 'MY':
        case 'AU':
            return [
                getLocaleText('Select a State'),
                getLocaleText('State')
            ];
        case 'GB':
            return [
                getLocaleText('County'),
                null
            ];
        default:
            return [
                getLocaleText('Select a Province'),
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
function capitalizeFirstLetter(string) {
    var stringToUpper = String(string);
    return stringToUpper.charAt(0).toUpperCase() + stringToUpper.slice(1);
}
function cartIsVirtual(cart) {
    var _a;
    if ((cart === null || cart === void 0 ? void 0 : cart.length) === 0) {
        return true;
    }
    return (_a = cart === null || cart === void 0 ? void 0 : cart.every(function (v) { return v.virtual; })) !== null && _a !== void 0 ? _a : true;
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
var accountLoginExplanation = getLocaleText("An account with this merchant's store allows you to view recent orders, manage your personal information, and make subscriptions for applicable merchants.");
function generateMainForm(message) {
    var _a, _b, _c, _d;
    return "<form id=\"pp-info-form\" class=\"pp-info-form flex col\"><div class=\"flex col pp-form-rows-container\">" + formGenerator((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.billing_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields_order) !== null && _d !== void 0 ? _d : [], 'billing') + '</div></form>';
}
function generateShippingForm(message) {
    var _a, _b, _c, _d;
    return '<div class="flex col pp-form-rows-container">' + formGenerator((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.shipping_fields_order) !== null && _d !== void 0 ? _d : [], 'shipping') + '</div>';
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
                form += "<div id=\"".concat(fieldData[fieldOrder[i]].field_name, "-field\" class=\"").concat(fieldData[fieldOrder[i]].field_name, " pp-tooltip\">\n\t\t\t\t\t<span class=\"pp-title\">").concat(label, "</span>\n\t\t\t\t\t<span class=\"pp-question-mark\"><img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\"></span>\n\t\t\t\t\t<span class=\"pp-tooltipHidden\">").concat(accountLoginExplanation, "</span>\n\t\t\t\t</div>");
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
    var elementString = "<div\n\t\t\tid=\"".concat(fieldData.field_name, "-field\" \n\t\t\tclass=\"") + (fieldData.type_list === 'radio' ? ' flex-col' : ' flex') + " pp-fw-".concat(fieldWidth, "\"\n\t\t\t").concat(fieldData.type_list === 'checkbox' ? 'style="align-items: center;"' : '', "\n\t\t>");
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
        'State': getLocaleText('State')
    };
    var label = labelNameTranslations[fieldData.field_label] ? labelNameTranslations[fieldData.field_label] : fieldData.field_label;
    var labelBuilder = function () { return "<label title=\"".concat(label, "\" for=\"").concat(fieldData.field_name, "\" \n\t\tclass=\"").concat(fieldData.type_list === 'checkbox' || fieldData.type_list === 'radio' ? 'pp-alt-label' : 'pp-form-label', "\n\t\t").concat(fieldData.type_list === 'select' ? ' pp-select-label' : '', "\">\n\t\t\t").concat(getLimitedLabel(fieldData, label), "\n\t\t\t").concat(!fieldData.field_required && ![
        'Apartment',
        'Apt.'
    ].includes(fieldData.field_label) ? optional : '', "\n\t\t</label>").concat(fieldData.type_list === 'select' ? '<div class="pp-form-chevron"><img src="img/chevron-down-solid.svg"/></div>' : ''); };
    var inputBuilder = function () { return "<input type=\"".concat(fieldData.type_list, "\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tid=\"").concat(fieldData.field_name, "\"\n\t\t\tplaceholder=\" \"") + (fieldData.field_default ? "value=\"".concat(fieldData.field_default.replaceAll('"', '&quot;'), "\"") : '') + "class=\"pp-fw-100 text-input\"" + (fieldData.field_required ? ' required' : '') + '/>'; };
    var selectBuilder = function (optionOrder) { return "<select name=".concat(fieldData.field_name, "\n\t\t\tid=\"").concat(fieldData.field_name, "\"\n\t\t\tclass=\"pp-fw-100\"\n\t\t\t").concat(fieldData.field_required ? 'required' : '', ">\n\t\t\t\t").concat(optionBuilder(optionOrder), "\n\t\t</select> \n\t\t").concat(labelBuilder()); };
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
            radioFields += "<div class=\"pp-tooltip\">\n\t\t\t\t<span class=\"pp-title\">".concat(label, "</span>\n\t\t\t\t<span class=\"pp-question-mark\"><img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\"></span>\n\t\t\t\t<span class=\"pp-tooltipHidden\">").concat(accountLoginExplanation, "</span>\n\t\t\t</div>");
        }
        else {
            radioFields += fieldData.field_label ? labelBuilder() : '';
        }
        radioFields += '<div class="pp-radio-option-container">';
        var first = true;
        optionOrder.forEach(function (value) {
            if (value[0] && value[1]) {
                radioFields += "<label class=\"pp-radio-line\"><input type=".concat(fieldData.type_list, " \n\t\t\t\tname=").concat(fieldData.field_name, " \n\t\t\t\tid=\"").concat(fieldData.field_name, "-").concat(value[0], "\"") + "value=\"".concat(value[0], "\"") + "class=\"pp-radio-input\"" + (fieldData.field_required && first ? ' required' : '') + (fieldData.field_default === value[0] ? ' checked' : '') + '/>';
                radioFields += "<span class=\"radio-option-label\">".concat(value[1].replaceAll('\\"', '"').replaceAll("\\'", "'"), "</span></label>");
                if (first) {
                    first = false;
                }
            }
        });
        radioFields += '</div></div>';
        return radioFields;
    };
    var checkbox = function () { return "<div class=\"pp-checkbox\">\n\t\t\t<div class=\"pp-alt-label-container\">\n\t\t\t\t".concat(labelBuilder(), "\n\t\t\t</div>\n\t\t\t<div class=\"pp-switch-container\">\n\t\t\t\t<label class=\"pp-switch\" style=\"float: right;\">\n\t\t\t\t\t<input\n\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\tid=\"").concat(fieldData.field_name, "\" \n\t\t\t\t\t\tclass=\" \"\n\t\t\t\t\t\tname=\"").concat(fieldData.field_name, "\" \n\t\t\t\t\t\tvalue=\"").concat(fieldData.field_default ? fieldData.field_default : '1', "\" \n\t\t\t\t\t\tstyle=\"float: right;\"\n\t\t\t\t\t>\n\t\t\t\t\t<span class=\"pp-slider round\"></span>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</div>"); };
    var stateRegionBuilder = function (section) { return "\n\t\t<input id=\"".concat(section, "_province\" class=\"pp-fw-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"").concat(section, "_province\" class=\"pp-form-label\"></label>\n\t\t<select id=\"").concat(fieldData.field_name, "\" class=\"pp-fw-100 select hide\" name=\"").concat(fieldData.field_name, "\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"").concat(fieldData.field_name, "\" class=\"pp-form-label pp-select-label hide\"></label>\n\t\t<div class=\"pp-form-chevron\"><img src=\"img/chevron-down-solid.svg\"/></div>\n\t\t"); };
    var countryFieldBuilder = function () { return "\n\t\t<select id=\"".concat(fieldData.field_name, "\" class=\"w-100\" name=\"").concat(fieldData.field_name, "\" size=\"1\" ").concat(fieldData.field_required ? 'required' : '', ">\n\t\t\t<option hidden disabled selected>\n\t\t\t\t").concat(getLocaleText('Select a country'), "\n\t\t\t</option>\n\t\t</select>\n\t\t<label for=\"").concat(fieldData.field_name, "\" class=\"pp-form-label pp-select-label\">\n\t\t\t").concat(getLocaleText('Country'), "\n\t\t</label>\n\t\t<div class=\"pp-form-chevron\"><img src=\"img/chevron-down-solid.svg\"/></div>\n\t"); };
    var passwordInputBuilder = function () { return "<input type=\"".concat(fieldData.type_list, "\"\n\t\t\tname=\"").concat(fieldData.field_name, "\"\n\t\t\tid=\"").concat(fieldData.field_name, "\"\n\t\t\tplaceholder=\" \"\n\t\t\tminlength=\"8\"") + (fieldData.field_default ? "value=\"".concat(fieldData.field_default.replaceAll('"', '&quot;'), "\"") : '') + "class=\"pp-fw-100 text-input\"" + (fieldData.field_required ? ' required' : '') + '/>'; };
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
var currentPage = Environment.modalUI.page();
var returningCustomerFormIdDifferentiator = 'returning-customer';
var newCustomerFormIdDifferentiator = 'new-customer';
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
    switch (loginType) {
        case 'login':
            {
                return getLocaleText("".concat(MerchantConfiguration.name(), " Account Login"));
            }
        case 'register':
            {
                return getLocaleText("".concat(MerchantConfiguration.name(), " Account Registration"));
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
        $input = $qs("#".concat(idDifferentiator, "-store-account-registration-password"));
    }
    else {
        $input = $qs("#".concat(idDifferentiator, "-store-account-login-password"));
    }
    if (!$input) {
        return '';
    }
    return $input.value;
}
function getMerchantCustomerAccountEmailValue(idDifferentiator, isRegistration) {
    var $input;
    if (isRegistration) {
        $input = $qs("#".concat(idDifferentiator, "-store-account-registration-email"));
    }
    else {
        $input = $qs("#".concat(idDifferentiator, "-store-account-login-email"));
    }
    if (!$input) {
        return '';
    }
    return $input.value;
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
    var $accountLoginEmailField = $qs("#".concat(idDifferentiator, "-store-account-login-email"));
    var $accountRegistrationEmailField = $qs("#".concat(idDifferentiator, "-store-account-registration-email"));
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
    var $accountLoginEmailField = $qs("#".concat(idDifferentiator, "-store-account-login-email"));
    var $accountRegistrationEmailField = $qs("#".concat(idDifferentiator, "-store-account-registration-email"));
    var $accountLoginPasswordField = $qs("#".concat(idDifferentiator, "-store-account-login-password"));
    var $accountRegistrationPasswordField = $qs("#".concat(idDifferentiator, "-store-account-registration-password"));
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
var loginOption = [
    'login',
    getLocaleText('Login')
];
var registerOption = [
    'register',
    getLocaleText('Register')
];
var noneOption = [
    'none',
    getLocaleText('No Thanks')
];
var emailField = {
    'field_default': '',
    'field_enable': 'yes',
    'field_label': getLocaleText('Email'),
    'field_name': '',
    'field_required': 'no',
    'field_placeholder': '',
    'type_list': 'email',
    'width': '50'
};
var passwordField = {
    'field_default': '',
    'field_enable': 'yes',
    'field_label': getLocaleText('Password'),
    'field_name': '',
    'field_required': 'no',
    'field_placeholder': '',
    'type_list': 'password',
    'width': '50'
};
function installMerchantCustomerAccountFormFields() {
    var formNewCustomer = generateMerchantCustomerAccountForm(newCustomerFormIdDifferentiator);
    var $accountLoginFormNewCustomer = $qs('#pp-store-account-info');
    if ($accountLoginFormNewCustomer) {
        $accountLoginFormNewCustomer.innerHTML = formNewCustomer;
    }
    addLoginTypeRadioEventListener(newCustomerFormIdDifferentiator);
    renderMerchantCustomerAccountFormFields(newCustomerFormIdDifferentiator);
    var formReturningCustomer = generateMerchantCustomerAccountForm(returningCustomerFormIdDifferentiator);
    var $accountLoginFormReturningCustomer = $qs('#pp-store-account-info-existing');
    if ($accountLoginFormReturningCustomer) {
        $accountLoginFormReturningCustomer.innerHTML = formReturningCustomer;
    }
    addLoginTypeRadioEventListener(returningCustomerFormIdDifferentiator);
    renderMerchantCustomerAccountFormFields(returningCustomerFormIdDifferentiator);
}
function generateMerchantCustomerAccountForm(idDifferentiator) {
    if (!shouldRenderAccountLoginForms()) {
        return '';
    }
    var fieldData = [];
    var optionOrder = [];
    if (shouldShowMerchantCustomerAccountLoginTypeCheckboxes()) {
        loginTypeRadio.field_default = getLoginTypeDefault();
        loginTypeRadio.field_label = getLocaleText("".concat(MerchantConfiguration.name(), " Account"));
        loginTypeRadio.field_name = idDifferentiator + '-store-account-login-type';
        if (shouldAllowMerchantCustomerAccountLogin()) {
            optionOrder.push(loginOption);
        }
        if (shouldAllowMerchantCustomerAccountRegistration()) {
            optionOrder.push(registerOption);
        }
        if (shouldAllowMerchantCustomerAccountOmission()) {
            optionOrder.push(noneOption);
        }
        loginTypeRadio.option_order = optionOrder;
        fieldData.push(loginTypeRadio);
    }
    else {
        customerAccountFormHeader.field_name = idDifferentiator + '-store-account-form-header';
        customerAccountFormHeader.field_label = getCustomerAccountFormHeaderLabel(idDifferentiator);
        fieldData.push(customerAccountFormHeader);
    }
    var loginEmailField = __assign({}, emailField);
    var loginPasswordField = __assign({}, passwordField);
    loginEmailField.field_label = getLocaleText('Email or Username');
    loginEmailField.type_list = 'text';
    loginEmailField.field_name = idDifferentiator + '-store-account-login-email';
    loginPasswordField.field_name = idDifferentiator + '-store-account-login-password';
    loginEmailField.width = '50';
    loginPasswordField.width = '50';
    fieldData.push(loginEmailField);
    fieldData.push(loginPasswordField);
    var registrationEmailField = __assign({}, emailField);
    var registrationPasswordField = __assign({}, passwordField);
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
function selectDropdown($select, value) {
    if (!$select) {
        return;
    }
    $select.value = value;
}
function scrollRight(related) {
    var _a;
    (_a = $qs('.pp-prev-btn' + related)) === null || _a === void 0 ? void 0 : _a.classList.remove('scroll-end');
    $qs('#pp-products-list' + related, function ($element) { return $element.scrollLeft += parseInt("".concat(related.length === 0 ? '260' : '168')); });
}
function scrollLeft(related) {
    var _a;
    (_a = $qs('.pp-next-btn' + related)) === null || _a === void 0 ? void 0 : _a.classList.remove('scroll-end');
    $qs('#pp-products-list' + related, function ($element) { return $element.scrollLeft -= parseInt("".concat(related.length === 0 ? '260' : '168')); });
}
function scrollAdjuster(related) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var scrollEnd = ((_a = $qs('#pp-products-list' + related)) === null || _a === void 0 ? void 0 : _a.scrollLeft) ? (_b = $qs('#pp-products-list' + related)) === null || _b === void 0 ? void 0 : _b.scrollLeft : 1;
    var offset = (_c = $qs('#pp-products-list' + related)) === null || _c === void 0 ? void 0 : _c.offsetWidth;
    var scrollWidth = (_d = $qs('#pp-products-list' + related)) === null || _d === void 0 ? void 0 : _d.scrollWidth;
    if (((_e = $qs('#pp-products-list' + related)) === null || _e === void 0 ? void 0 : _e.scrollLeft) === 0) {
        (_f = $qs('.pp-prev-btn' + related)) === null || _f === void 0 ? void 0 : _f.classList.add('scroll-end');
        (_g = $qs('.pp-next-btn' + related)) === null || _g === void 0 ? void 0 : _g.classList.remove('scroll-end');
    }
    else if (scrollEnd && scrollWidth && offset && scrollEnd + 1 >= scrollWidth - offset) {
        (_h = $qs('.pp-next-btn' + related)) === null || _h === void 0 ? void 0 : _h.classList.add('scroll-end');
        (_j = $qs('.pp-prev-btn' + related)) === null || _j === void 0 ? void 0 : _j.classList.remove('scroll-end');
    }
    else {
        (_k = $qs('.pp-next-btn' + related)) === null || _k === void 0 ? void 0 : _k.classList.remove('scroll-end');
        (_l = $qs('.pp-prev-btn' + related)) === null || _l === void 0 ? void 0 : _l.classList.remove('scroll-end');
    }
}
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
function installCustomerFormFields(message) {
    var _a;
    var form = generateMainForm(message);
    (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', form);
}
function getOrderService() {
    return {
        placeOrder: placeWCOrder,
        setOrderStatus: setWCOrderStatus,
        addOrderNote: addWCOrderNote,
        getOrderRedirect: getOrderRedirect
    };
}
function initShipping(message) {
    initShippingEvents();
    store.dispatch(updateMerchantGeneralConfig(__assign(__assign({}, store.getState().merchantConfiguration.general), { wcLocationInfoData: message.phpData.wc_location_info })));
    store.dispatch(updateMerchantShippingConfig({
        shippingZones: Number.parseInt(message.phpData.num_shipping_zones)
    }));
}
function installCustomerBillingFields(message) {
    var _a;
    var newForm = generateShippingForm(message);
    (_a = $qs('#shipping-details fieldset')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', newForm);
}
function initCustomer(message) {
    initCustomerEvents(message);
    renderCountryAndStateList('billing', message.phpData.wc_location_info);
    renderCountryAndStateList('shipping', message.phpData.wc_location_info);
}
function setWCOrderStatus(order, wcStatus, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function () {
        var request, result;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    request = {
                        session: {
                            id: PeachPayOrder.sessionId()
                        },
                        order: {
                            id: order.order_id,
                            status: wcStatus,
                            message: (_a = options.message) !== null && _a !== void 0 ? _a : '',
                            paymentMethod: PaymentConfiguration.selectedProvider(),
                            stripeCustomerId: (_c = (_b = options === null || options === void 0 ? void 0 : options.stripe) === null || _b === void 0 ? void 0 : _b.customer_id) !== null && _c !== void 0 ? _c : undefined,
                            stripeTransactionId: (_e = (_d = options === null || options === void 0 ? void 0 : options.stripe) === null || _d === void 0 ? void 0 : _d.charge_id) !== null && _e !== void 0 ? _e : undefined,
                            paypalTransactionId: (_g = (_f = options === null || options === void 0 ? void 0 : options.paypal) === null || _f === void 0 ? void 0 : _f.transaction_id) !== null && _g !== void 0 ? _g : undefined
                        }
                    };
                    return [4, fetchHostWindowData('pp-set-order-status', request)];
                case 1:
                    result = _m.sent();
                    if (!result) return [3, 3];
                    return [4, recordTransactionStatus(order, options.paymentStatus, options.orderStatus, {
                            paypal: (_h = options === null || options === void 0 ? void 0 : options.paypal) !== null && _h !== void 0 ? _h : undefined,
                            stripe: (_j = options === null || options === void 0 ? void 0 : options.stripe) !== null && _j !== void 0 ? _j : undefined
                        })];
                case 2:
                    _m.sent();
                    return [3, 5];
                case 3: return [4, recordTransactionStatus(order, options.paymentStatus, 'unknown', {
                        paypal: (_k = options === null || options === void 0 ? void 0 : options.paypal) !== null && _k !== void 0 ? _k : undefined,
                        stripe: (_l = options === null || options === void 0 ? void 0 : options.stripe) !== null && _l !== void 0 ? _l : undefined
                    })];
                case 4:
                    _m.sent();
                    _m.label = 5;
                case 5: return [2, result];
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
function placeWCOrder(extraFormData) {
    var _a, _b;
    if (extraFormData === void 0) { extraFormData = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var requestMessage, currentPage, loginType, isRegistration, loginType1, isRegistration1, _c, validAddress, errorMessage, response;
        return __generator(this, function (_d) {
            switch (_d.label) {
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
                    _c = validateAddress1(requestMessage.order.formRecord), validAddress = _c[0], errorMessage = _c[1];
                    if (!validAddress) {
                        captureSentryException(new Error("Invalid checkout form data at ".concat(MerchantConfiguration.hostName(), ". Error: ").concat(errorMessage)));
                        store.dispatch(setOrderError("".concat(errorMessage)));
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
                    response = _d.sent();
                    if (response.result === 'failure') {
                        store.dispatch(setOrderError(response.messages ? getLocaleText(stripHtml(response.messages, null)) : getLocaleText('Unknown order error occurred')));
                    }
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
                            payment_method: PaymentConfiguration.selectedPaymentMethod(),
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
function initCustomerEvents(message) {
    var _this = this;
    var _a, _b, _c, _d, _e;
    (_a = $qs('#shipping_country')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
        var _a, _b;
        renderCorrectProvinceField('shipping', (_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields) !== null && _b !== void 0 ? _b : []);
    });
    (_b = $qs('#billing_country')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function () {
        var _a, _b;
        renderCorrectProvinceField('billing', (_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields) !== null && _b !== void 0 ? _b : []);
    });
    (_c = $qs('#open-shipping-details')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', function (event) { return __awaiter(_this, void 0, void 0, function () {
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
    (_d = $qs('#pp-info-form')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function () { return setTimeout(function () {
        syncCustomerFieldChanges('#pp-info-form');
    }); });
    (_e = $qs('#pp-different-shipping-details')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', function () {
        setTimeout(function () {
            if (PeachPayCustomer.shipToDifferentAddress()) {
                syncCustomerFieldChanges('#pp-different-shipping-details');
            }
        });
    });
    var previousCustomerData = '';
    store.subscribe(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var customer = PeachPayCustomer.data();
        if (PeachPayCustomer.shipToDifferentAddress()) {
            (_a = $qs('#shipping-details')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
            (_b = $qs('#shipping-details fieldset')) === null || _b === void 0 ? void 0 : _b.removeAttribute('disabled');
        }
        else {
            (_c = $qs('#shipping-details')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
            (_d = $qs('#shipping-details fieldset')) === null || _d === void 0 ? void 0 : _d.setAttribute('disabled', '');
            $qs('#pp-refresh-shipping-options', function ($element) {
                $element.style.display = 'none';
            });
            $qs('#pp-shipping-options', function ($element) { return $element.classList.remove('hide'); });
        }
        var customerData = JSON.stringify(customer);
        if (customerData !== previousCustomerData) {
            previousCustomerData = customerData;
            renderCustomerFields(customer, 'billing', (_f = (_e = message.phpData) === null || _e === void 0 ? void 0 : _e.billing_fields) !== null && _f !== void 0 ? _f : []);
            renderCustomerFields(customer, 'shipping', (_h = (_g = message.phpData) === null || _g === void 0 ? void 0 : _g.shipping_fields) !== null && _h !== void 0 ? _h : []);
            if (PeachPayCustomer.shipToDifferentAddress()) {
                $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
                $qs('#pp-refresh-shipping-options', function ($element) {
                    $element.style.display = 'block';
                });
                $qs('#pp-shipping-options', function ($element) { return $element.classList.add('hide'); });
            }
        }
        if (Environment.modalUI.page() === 'info') {
            setInProgressCustomer(customer);
            if (Carts.virtual() && Feature.enabled(FeatureFlag.VIRTUAL_PRODUCT_FIELDS)) {
                hideShippingDetails(true, (_k = (_j = message.phpData) === null || _j === void 0 ? void 0 : _j.billing_fields) !== null && _k !== void 0 ? _k : [], (_m = (_l = message.phpData) === null || _l === void 0 ? void 0 : _l.billing_fields_order) !== null && _m !== void 0 ? _m : []);
                $qs('#shipping-options-container-address', function (element) {
                    element.classList.add('hide');
                });
                $qs('span[data-i18n=", "]', function (element) {
                    element.classList.add('hide');
                });
            }
            else {
                hideShippingDetails(false, (_p = (_o = message.phpData) === null || _o === void 0 ? void 0 : _o.billing_fields) !== null && _p !== void 0 ? _p : [], (_r = (_q = message.phpData) === null || _q === void 0 ? void 0 : _q.billing_fields_order) !== null && _r !== void 0 ? _r : []);
                $qs('#shipping-options-container-address', function (element) {
                    element.classList.remove('hide');
                });
                $qs('span[data-i18n=", "]', function (element) {
                    element.classList.remove('hide');
                });
            }
        }
        if (Environment.modalUI.page() === 'shipping' || Environment.modalUI.page() === 'returning') {
            renderCustomerHeader(customer);
            if (Carts.virtual()) {
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
    });
}
function hideShippingDetails(hide, fieldData, fieldOrder) {
    var defaultFieldNames = [
        'billing_address_header',
        'billing_address_1',
        'billing_address_2',
        'billing_postcode',
        'billing_city',
        'billing_state',
        'billing_country',
    ];
    var customerDataRequiredFields = [];
    fieldOrder.forEach(function (order) {
        if (defaultFieldNames.includes(fieldData[order].field_name) && fieldData[order].field_required || fieldData[order].field_name === 'shipping_address_header') {
            customerDataRequiredFields.push(fieldData[order].field_name);
        }
    });
    var customerDataEnableFields = [];
    fieldOrder.forEach(function (order) {
        if (defaultFieldNames.includes(fieldData[order].field_name) && fieldData[order].field_enable || fieldData[order].field_name === 'shipping_address_header') {
            customerDataEnableFields.push(fieldData[order].field_name);
        }
    });
    if (hide) {
        customerDataEnableFields.forEach(function (fieldName) {
            $qsAll("#pp-info-form #".concat(fieldName, "-field"), function ($element) {
                $element.classList.add('hide');
            });
        });
    }
    else if (!hide) {
        customerDataEnableFields.forEach(function (fieldName) {
            $qsAll("#pp-info-form #".concat(fieldName, "-field"), function ($element) {
                $element.classList.remove('hide');
            });
        });
    }
    if (hide) {
        customerDataRequiredFields.forEach(function (fieldName) {
            if (fieldName === 'shipping_country' || fieldName === 'shipping_state') {
                $qs("#pp-info-form [name=\"".concat(fieldName, "\"]"), function ($element) {
                    $element.removeAttribute('required');
                });
                return;
            }
            $qs("#pp-info-form [name=\"".concat(fieldName, "\"]"), function ($element) {
                $element.removeAttribute('required');
            });
        });
    }
    else if (!hide) {
        customerDataRequiredFields.forEach(function (fieldName) {
            if (fieldName === 'shipping_country' || fieldName === 'shipping_state') {
                $qs("#pp-info-form [name=\"".concat(fieldName, "\"]"), function ($element) {
                    $element.setAttribute('required', '');
                });
                return;
            }
            $qs("#pp-info-form [name=\"".concat(fieldName, "\"]"), function ($element) {
                $element.setAttribute('required', '');
            });
        });
    }
}
function syncCustomerFieldChanges(formId) {
    var $form = $qs(formId);
    if (!$form) {
        return;
    }
    var formData = new FormData($form);
    var formFields = __assign({}, PeachPayCustomer.data().form_fields);
    for (var _i = 0, _a = Array.from($form.elements); _i < _a.length; _i++) {
        var $input = _a[_i];
        var inputName = $input.name;
        if ($input.hasAttribute('disabled') || $input.classList.contains('hide') || !$input.name) {
            delete formFields[inputName];
            continue;
        }
        if ($input.type === 'radio' && $input.checked) {
            formFields[inputName] = formEntry(formData, inputName);
            continue;
        }
        if ($input.type === 'checkbox' && $input.checked) {
            formFields[inputName] = formEntry(formData, inputName);
            continue;
        }
        formFields[inputName] = formEntry(formData, inputName);
    }
    cleanFormFields(formFields);
    var refreshCurrencySwitchFeature = formFields.shipping_country !== PeachPayCustomer.shipping.country();
    store.dispatch(updateCustomerFields(formFields));
    if (refreshCurrencySwitchFeature) {
        self.dispatchEvent(new CustomEvent('pp-update-currency-switcher-feature'));
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
                    store.dispatch(updateCustomerFields(__assign(__assign({}, PeachPayCustomer.data().form_fields), { shipping_country: (_b = ((_a = locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.customer_default_country) !== null && _a !== void 0 ? _a : locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.store_country)) !== null && _b !== void 0 ? _b : '' })));
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
function renderCorrectProvinceField(section, fieldData) {
    var _a, _b, _c;
    var merchantShipping = MerchantConfiguration.general.wcLocationInfoData();
    if (merchantShipping) {
        var info = section === 'billing' ? PeachPayCustomer.billing : PeachPayCustomer.shipping;
        var _d = stateProvinceOrCounty(info.country()), defaultOption_1 = _d[0], label_1 = _d[1];
        var stateOrProvinceOptions_1 = (_a = merchantShipping.allowed_states_or_provinces[info.country()]) !== null && _a !== void 0 ? _a : {};
        var stateId = "".concat(section, "_state");
        var provinceId = "".concat(section, "_province");
        if (stateOrProvinceOptions_1 && Object.keys(stateOrProvinceOptions_1).length > 0) {
            $qs("#".concat(stateId), function ($stateOrProvincesSelect) {
                var _a;
                $stateOrProvincesSelect.innerHTML = renderDropDownList(stateOrProvinceOptions_1, defaultOption_1);
                $stateOrProvincesSelect.disabled = false;
                $stateOrProvincesSelect.setAttribute('name', "".concat(section, "_state"));
                $qs('label[for="dynamic-states"]', function ($element) { return $element.textContent = label_1 !== null && label_1 !== void 0 ? label_1 : defaultOption_1; });
                $stateOrProvincesSelect.required = isRequiredField("".concat(section, "_state"), fieldData);
                $stateOrProvincesSelect.classList.remove('hide');
                var chevron = (_a = $stateOrProvincesSelect.parentNode) === null || _a === void 0 ? void 0 : _a.lastElementChild;
                chevron === null || chevron === void 0 ? void 0 : chevron.classList.remove('hide');
            });
            $qs("label[for=\"".concat(stateId, "\"]"), function ($element) {
                $element.textContent = label_1 !== null && label_1 !== void 0 ? label_1 : defaultOption_1;
                $element.classList.remove('hide');
            });
            $qs("#".concat(provinceId), function ($stateOrProvincesText) {
                $stateOrProvincesText.disabled = true;
                $stateOrProvincesText.setAttribute('name', 'off');
                $stateOrProvincesText.required = false;
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.add('hide');
            });
            (_b = $qs("label[for=\"".concat(provinceId, "\"]"))) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        }
        else {
            $qs("#".concat(stateId), function ($stateOrProvincesSelect) {
                var _a;
                $stateOrProvincesSelect.disabled = true;
                $stateOrProvincesSelect.setAttribute('name', 'off');
                $stateOrProvincesSelect.required = false;
                $stateOrProvincesSelect.classList.add('hide');
                var chevron = (_a = $stateOrProvincesSelect.parentNode) === null || _a === void 0 ? void 0 : _a.lastElementChild;
                chevron === null || chevron === void 0 ? void 0 : chevron.classList.add('hide');
            });
            (_c = $qs("label[for=\"".concat(stateId, "\"]"))) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
            $qs("#".concat(provinceId), function ($stateOrProvincesText) {
                $stateOrProvincesText.disabled = false;
                $stateOrProvincesText.setAttribute('name', "".concat(section, "_state"));
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.remove('hide');
            });
            $qs("label[for=\"".concat(provinceId, "\"]"), function ($element) {
                $element.textContent = label_1 !== null && label_1 !== void 0 ? label_1 : defaultOption_1;
                $element.classList.remove('hide');
            });
        }
    }
}
function renderCountryAndStateList(section, merchantLocationInfo) {
    if (!merchantLocationInfo) {
        console.warn('Warning: No WC Location info. Please update the PeachPay Plugin.');
        return;
    }
    var $countries = $qs("#".concat(section, "_country"));
    if (!$countries) {
        return;
    }
    var selectACountry = getLocaleText('Select a country');
    var countryOptions = merchantLocationInfo.allowed_countries;
    $countries.innerHTML = renderDropDownList(countryOptions, selectACountry);
    selectDropdown($countries, merchantLocationInfo.customer_default_country || merchantLocationInfo.store_country);
    if ($countries.options.length === 2) {
        $countries.selectedIndex = 1;
    }
    $countries.dispatchEvent(new Event('change'));
}
function renderCustomerFields(customer, section, fieldData) {
    renderCorrectProvinceField(section, fieldData);
    Object.keys(customer.form_fields).forEach(function (key) {
        $qsAll("#".concat(key, "-field [name=\"").concat(key, "\"]"), function (input) {
            if (customer.form_fields[key] !== undefined && input && input.type !== 'radio' && input.type !== 'select-one') {
                input.value = customer.form_fields[key];
            }
            if (customer.form_fields[key] !== undefined && input && input.type === 'select-one') {
                input.value = customer.form_fields[key];
            }
            if (customer.form_fields[key] !== undefined && input && input.type === 'checkbox') {
                input.checked = true;
            }
            if (customer.form_fields[key] !== undefined && input && input.type === 'radio') {
                input.checked = true;
            }
        });
    });
}
function renderCustomerHeader(customer) {
    var fullAddress = getFullAddress();
    var fullName = getFullName();
    $qsAll('.email', function ($element) { return $element.innerHTML = customer.form_fields.shipping_email; });
    if (fullName.replace(/\s/g, '') === '' && fullAddress.replace(/\s/g, '') === '') {
        $qsAll('.shipping-seperator', function ($element) { return $element.classList.add('hide'); });
        return;
    }
    $qsAll('.full-name', function ($element) { return $element.innerHTML = fullName; });
    $qsAll('.shipping-seperator', function ($element) { return $element.classList.remove('hide'); });
    $qsAll('.pp-address', function ($element) { return $element.innerHTML = fullAddress; });
}
function getFullAddress() {
    var _a, _b;
    var fullAddress = '';
    if (PeachPayCustomer.shipping.country() === 'JP') {
        var fullState = (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_location_info) === null || _b === void 0 ? void 0 : _b.allowed_states_or_provinces.JP[PeachPayCustomer.shipping.state()];
        fullAddress = "".concat(PeachPayCustomer.shipping.postal() ? PeachPayCustomer.shipping.postal() + ', ' : '', "\n\t\t").concat((fullState !== null && fullState !== void 0 ? fullState : PeachPayCustomer.shipping.state()) ? PeachPayCustomer.shipping.state() + ' ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.city() ? PeachPayCustomer.shipping.city() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.address1() ? PeachPayCustomer.shipping.address1() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.address2() ? PeachPayCustomer.shipping.address2() : '');
    }
    else {
        fullAddress = "".concat(PeachPayCustomer.shipping.address1() ? PeachPayCustomer.shipping.address1() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.address2() ? PeachPayCustomer.shipping.address2() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.city() ? PeachPayCustomer.shipping.city() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.state() ? PeachPayCustomer.shipping.state() + ' ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.postal() ? PeachPayCustomer.shipping.postal() + ', ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.country() ? PeachPayCustomer.shipping.country() : '');
    }
    return fullAddress;
}
function getFullName() {
    return "\n\t\t".concat(PeachPayCustomer.shipping.firstName() ? PeachPayCustomer.shipping.firstName() + ' ' : '', "\n\t\t").concat(PeachPayCustomer.shipping.lastName() ? PeachPayCustomer.shipping.lastName() : '');
}
function initShippingEvents() {
    var _this = this;
    var _a, _b, _c, _d;
    store.subscribe(renderShipping);
    (_a = $qs('#pp-shipping-options-existing')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', handleShippingSelectionEvent);
    (_b = $qs('#pp-shipping-options')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', handleShippingSelectionEvent);
    (_c = $qs('#pp-refresh-shipping-options')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    $qs('#pp-refresh-shipping-options', function ($element) { return $element.style.display = 'none'; });
                    $qs('#pp-shipping-options', function ($element) { return $element.classList.remove('hide'); });
                    $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
                    return [2];
            }
        });
    }); });
    (_d = $qs('#pp-info-form')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var isValidAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    store.dispatch(startModalLoading());
                    syncCustomerFieldChanges('#pp-info-form');
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchHostWindowData('pp-validate-billing-address', __assign(__assign({}, PeachPayCustomer.wcBillingAddress()), PeachPayCustomer.wcShippingAddress()))];
                case 1: return [2, _a.sent()];
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
    renderShippingSection();
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
            if (getFullName().replace(/\s/g, '') === '' && getFullAddress().replace(/\s/g, '') === '') {
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
    var shippingHTML = '';
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
            shippingHTML += renderShippingPackageOptions(cartKey, shippingPackageKey, shippingPackage, cartCalculation.cart_meta, Object.entries(calculatedCarts).length > 1);
        }
    }
    $qs('#pp-shipping-options', function ($element) { return $element.innerHTML = shippingHTML; });
    $qs('#pp-shipping-options-existing', function ($element) { return $element.innerHTML = shippingHTML; });
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
function recordTransactionStatus(order, orderStatus, paymentStatus, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, text, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/transaction/record', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session: {
                                    id: PeachPayOrder.sessionId(),
                                    merchant_name: MerchantConfiguration.name(),
                                    merchant_url: MerchantConfiguration.hostName(),
                                    plugin_version: Environment.plugin.version(),
                                    paypal: (_a = options === null || options === void 0 ? void 0 : options.paypal) !== null && _a !== void 0 ? _a : undefined,
                                    stripe: (_b = options === null || options === void 0 ? void 0 : options.stripe) !== null && _b !== void 0 ? _b : undefined
                                },
                                order: {
                                    id: order.details.id,
                                    order_status: orderStatus,
                                    payment_status: paymentStatus,
                                    data: order
                                }
                            })
                        })];
                case 1:
                    response = _c.sent();
                    if (!!response.ok) return [3, 3];
                    return [4, response.text()];
                case 2:
                    text = _c.sent();
                    captureSentryException(new Error('Non 200 response while attempting to record transaction in DB'), {
                        response: text
                    });
                    return [2, false];
                case 3: return [2, true];
                case 4:
                    error_3 = _c.sent();
                    captureSentryException(new Error('Recording transaction to DB failed.'), {
                        exception: error_3
                    });
                    return [2, false];
                case 5: return [2];
            }
        });
    });
}
function validateAddress1(address) {
    var _a, _b, _c, _d;
    var errorLabels = {};
    var requiredFields = [];
    var shippingFields = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.shipping_fields;
    var shippingFieldsOrder = (_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.shipping_fields_order;
    var billingFields = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.billing_fields;
    var billingFieldsOrder = (_d = GLOBAL.phpData) === null || _d === void 0 ? void 0 : _d.billing_fields_order;
    var isOpenShippingChecked = PeachPayCustomer.shipToDifferentAddress();
    if (billingFields != null && billingFieldsOrder != null) {
        for (var i = 0; i < billingFieldsOrder.length; i++) {
            var field = billingFields[billingFieldsOrder[i]];
            if (field.field_enable === 'yes' && field.field_required === 'yes') {
                errorLabels[field.field_name] = field.field_label;
                requiredFields.push(field.field_name);
            }
        }
    }
    if (isOpenShippingChecked && shippingFields != null && shippingFieldsOrder != null) {
        for (var i1 = 0; i1 < shippingFieldsOrder.length; i1++) {
            var field1 = shippingFields[shippingFieldsOrder[i1]];
            if (field1.field_enable === 'yes' && field1.field_required === 'yes') {
                errorLabels[field1.field_name] = field1.field_label;
                requiredFields.push(field1.field_name);
            }
        }
    }
    var _loop_3 = function (key, value) {
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
    for (var _i = 0, _e = Object.entries(address); _i < _e.length; _i++) {
        var _f = _e[_i], key = _f[0], value = _f[1];
        var state_1 = _loop_3(key, value);
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
function renderShippingSection() {
    var _a, _b;
    if (PeachPayOrder.customerAddressValidated()) {
        (_a = $qs('#pp-payment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    else {
        (_b = $qs('#pp-payment')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
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
    var _loop_4 = function ($form) {
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
        _loop_4($form);
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
    var _loop_5 = function ($form) {
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
        _loop_5($form);
    }
    for (var _b = 0, _c = $qsAll('.coupon-code-option'); _b < _c.length; _b++) {
        var $openCoupon = _c[_b];
        $openCoupon.addEventListener('click', showCouponInput);
        $openCoupon.addEventListener('keypress', showCouponInput);
    }
    for (var _d = 0, _e = $qsAll('.exit-button-coupon'); _d < _e.length; _d++) {
        var $exitCoupon = _e[_d];
        $exitCoupon.addEventListener('click', hideCouponInput);
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
    if (!eventClick(event)) {
        return;
    }
    for (var _i = 0, _a = $qsAll('form.wc-coupon-code'); _i < _a.length; _i++) {
        var $coupon = _a[_i];
        $coupon.classList.remove('hide');
    }
    for (var _b = 0, _c = $qsAll('.coupon-code-option'); _b < _c.length; _b++) {
        var $option = _c[_b];
        $option.classList.add('hide');
    }
}
function hideCouponInput() {
    for (var _i = 0, _a = $qsAll('form.wc-coupon-code'); _i < _a.length; _i++) {
        var $coupon = _a[_i];
        $coupon.classList.add('hide');
    }
    for (var _b = 0, _c = $qsAll('.coupon-code-option'); _b < _c.length; _b++) {
        var $option = _c[_b];
        $option.classList.remove('hide');
    }
    for (var _d = 0, _e = $qsAll('.wc-invalid-coupon'); _d < _e.length; _d++) {
        var $invalid = _e[_d];
        $invalid.classList.add('hide');
    }
    clearInput('.wc-coupon-code-input');
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
    var _a, _b, _c, _d, _e, _f;
    for (var _i = 0, _g = $qsAll('[data-i18n]'); _i < _g.length; _i++) {
        var $element = _g[_i];
        if ($element.nodeName === 'INPUT' && $element.type === 'submit') {
            $element.value = getLocaleText((_b = (_a = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _a === void 0 ? void 0 : _a.i18n) !== null && _b !== void 0 ? _b : '');
        }
        else if ($element.nodeName === 'INPUT') {
            $element.placeholder = getLocaleText((_d = (_c = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _c === void 0 ? void 0 : _c.i18n) !== null && _d !== void 0 ? _d : '');
        }
        else {
            $element.textContent = getLocaleText((_f = (_e = $element === null || $element === void 0 ? void 0 : $element.dataset) === null || _e === void 0 ? void 0 : _e.i18n) !== null && _f !== void 0 ? _f : '');
        }
    }
    if (Environment.language() === 'ro-RO') {
        setCustomValidityMessage();
    }
}
function setCustomValidityMessage() {
    var _loop_6 = function ($input) {
        $input.addEventListener('invalid', function () {
            $input.setCustomValidity('Te rugăm sa completezi acest câmp.');
        });
        $input.addEventListener('input', function () {
            $input.setCustomValidity('');
        });
    };
    for (var _i = 0, _a = $qsAll('form input'); _i < _a.length; _i++) {
        var $input = _a[_i];
        _loop_6($input);
    }
}
function initQuantityChangerEvent() {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.QUANTITY_CHANGER)) {
        $qsAll('#pp-summary-body, #pp-summary-body-existing, #pp-summary-body-mobile', function ($removeButtons) {
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
    $qsAll('#pp-summary-body, #pp-summary-body-existing, #pp-summary-body-mobile, .pp-product-body', function ($cartContainer) {
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
        var response, error_4;
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
                    error_4 = _a.sent();
                    if (error_4 instanceof Error) {
                        captureSentryException(new Error("Quantity failed to change on ".concat(MerchantConfiguration.hostName(), ". Error").concat(error_4.message)));
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
    var $tbodyMobile = $qs('#pp-summary-body-mobile');
    if (!$tbody || !$tbodyExisting || !$tbodyMobile) {
        return;
    }
    clearOrderSummary();
    if (DefaultCart.contents().length === 0) {
        var $message = "<div class=\"pp-order-summary-item\"><p>".concat(getLocaleText('Cart is empty'), "</p></div>");
        $tbody.innerHTML = $message;
        $tbodyMobile.innerHTML = $message;
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
        $tbodyMobile.append($cartRow.cloneNode(true));
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
    var item = itemBundle[0];
    var $cartRow = document.createElement('div');
    $cartRow.className = 'pp-order-summary-item';
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
    $removerDiv.innerHTML = "<button class=\"pp-item-remover-btn pp-disabled-processing\" data-qid=\"".concat(item.item_key, "\"><img src=\"img/x.svg\" class=\"item-remover\"/></button>");
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
    $cartRow.appendChild($imgQtyDiv);
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
    if (!showImage && !showQuantityChanger) {
        if (item.is_part_of_bundle) {
            $div.className = 'pp-cart-img';
            return $div;
        }
        $div.className = 'pp-cart-img-qty-empty';
        return $div;
    }
    if (showImage) {
        if (item.is_part_of_bundle) {
            $div.className = 'pp-cart-img';
            $div.innerHTML = "<div class=\"product-img-td-b0\" id=\"product-img\"><img class=\"pp-bundle-img-size\" src=\"".concat(item.image ? item.image[0] : '', "\"/></div>");
            return $div;
        }
        else {
            $div.innerHTML = "<div class=\"product-img-td-b0\" id=\"product-img\"><img class=\"pp-product-img-size\" src=\"".concat(item.image ? item.image[0] : '', "\"/></div>");
        }
    }
    $div.className = 'pp-cart-img-qty';
    if (showQuantityChanger) {
        if (!showImage) {
            $div.style.paddingTop = '7px';
        }
        $div.innerHTML += "\n\t\t<div class=\"quantity-changer\">\n\t\t\t<button type=\"button\" class=\"decrease-qty qty-btn ".concat(cartItemQuantity(item) <= 1 ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/minus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t\t<form onSubmit=\"return false;\" class=\"mb-0\">\n\t\t\t\t<input type=\"number\" min=\"0\" max=\"").concat(item.stock_qty ? item.stock_qty : '', "\" class=\"qty-fs\" value=\"").concat(cartItemQuantity(item), "\" data-qid=\"").concat(item.item_key, "\" required/>\n\t\t\t</form>\n\t\t\t<button type=\"button\" class=\"increase-qty qty-btn ").concat(item.stock_qty && cartItemQuantity(item) >= item.stock_qty ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/plus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t</div>");
    }
    return $div;
}
function initSummary(message) {
    var _a;
    initSummaryEvents();
    store.dispatch(updateMerchantTaxConfig({
        displayPricesInCartAndCheckout: ((_a = message.phpData) === null || _a === void 0 ? void 0 : _a.wc_tax_price_display) === 'incl' ? 'includeTax' : 'excludeTax'
    }));
}
function initSummaryEvents() {
    var _a, _b, _c, _d;
    (_a = $qs('#pp-dropdown')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', orderSummaryDropdown);
    (_b = $qs('#pp-dropdown')) === null || _b === void 0 ? void 0 : _b.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            orderSummaryDropdown();
        }
    });
    (_c = $qs('#pp-dropdown-new')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', orderSummaryDropdown);
    (_d = $qs('#pp-modal-content')) === null || _d === void 0 ? void 0 : _d.addEventListener('mousedown', function (e) {
        var _a, _b, _c, _d, _e, _f;
        var target = e.target;
        if (!(((_a = $qs('#order-summary-contents')) === null || _a === void 0 ? void 0 : _a.contains(target)) || ((_b = $qs('#order-summary-contents-new')) === null || _b === void 0 ? void 0 : _b.contains(target)))) {
            if (!(((_c = $qs('#pp-dropdown')) === null || _c === void 0 ? void 0 : _c.contains(target)) || ((_d = $qs('#pp-dropdown-new')) === null || _d === void 0 ? void 0 : _d.contains(target)))) {
                if (((_e = $qs('#pp-dropdown')) === null || _e === void 0 ? void 0 : _e.getAttribute('aria-expanded')) === 'true' || ((_f = $qs('#pp-dropdown-new')) === null || _f === void 0 ? void 0 : _f.getAttribute('aria-expanded')) === 'true') {
                    orderSummaryDropdown();
                }
            }
        }
    });
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
        var summaryTitleHTML = cartKey === '0' ? '' : "\n<tr class=\"summary-title\">\n\t<td>Recurring totals</td>\n\t<td></td>\n</tr>";
        for (var _f = 0, cartSummary_1 = cartSummary; _f < cartSummary_1.length; _f++) {
            var line = cartSummary_1[_f];
            summaryHTML += renderSummaryLine(line.key, line.value, cartMeta);
        }
        cartSummariesHTML += "\n<div class=\"cart-summary\" data-cart-key=\"".concat(cartKey, "\">\n\t<table>\n\t\t").concat(summaryTitleHTML, "\n\t\t").concat(summaryHTML, "\n\t</table>\n\t<p class=\"first-renewal muted\">").concat(buildSubscriptionFirstRenewalString(cartMeta), "</p>\n</div>");
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
    return "\n<tr class=\"summary-line\" data-raw-cost=\"".concat(amount, "\">\n\t<td>").concat(name, "</td>\n\t<td class=\"pp-recalculate-blur\" >").concat(formatCurrencyString(amount)).concat(priceMetaHTML, "</td>\n</tr>");
}
function orderSummaryDropdown() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    if (window.matchMedia('(max-width: 900px)').matches) {
        var newCustomer = (_a = $qs('#pp-dropdown-new')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-expanded');
        if (newCustomer === 'true') {
            (_b = $qs('#pp-dropdown-new')) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-expanded', 'false');
            newCustomer = (_c = $qs('#pp-dropdown-new')) === null || _c === void 0 ? void 0 : _c.getAttribute('aria-expanded');
        }
        else {
            (_d = $qs('#pp-dropdown-new')) === null || _d === void 0 ? void 0 : _d.setAttribute('aria-expanded', 'true');
            newCustomer = (_e = $qs('#pp-dropdown-new')) === null || _e === void 0 ? void 0 : _e.getAttribute('aria-expanded');
        }
        if (newCustomer === 'true') {
            (_f = $qs('#dropdown-down-new')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
            (_g = $qs('#dropdown-up-new')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
            (_h = $qs('#order-summary-contents-new')) === null || _h === void 0 ? void 0 : _h.classList.add('order-summary-contents-new-opened');
        }
        else {
            (_j = $qs('#dropdown-down-new')) === null || _j === void 0 ? void 0 : _j.classList.remove('hide');
            (_k = $qs('#dropdown-up-new')) === null || _k === void 0 ? void 0 : _k.classList.add('hide');
            (_l = $qs('#order-summary-contents-new')) === null || _l === void 0 ? void 0 : _l.classList.remove('order-summary-contents-new-opened');
        }
    }
    var existing = (_m = $qs('#pp-dropdown')) === null || _m === void 0 ? void 0 : _m.getAttribute('aria-expanded');
    if (existing === 'true') {
        (_o = $qs('#pp-dropdown')) === null || _o === void 0 ? void 0 : _o.setAttribute('aria-expanded', 'false');
        existing = (_p = $qs('#pp-dropdown')) === null || _p === void 0 ? void 0 : _p.getAttribute('aria-expanded');
    }
    else {
        (_q = $qs('#pp-dropdown')) === null || _q === void 0 ? void 0 : _q.setAttribute('aria-expanded', 'true');
        existing = (_r = $qs('#pp-dropdown')) === null || _r === void 0 ? void 0 : _r.getAttribute('aria-expanded');
    }
    if (existing === 'true') {
        (_s = $qs('.dropdown-down')) === null || _s === void 0 ? void 0 : _s.classList.add('hide');
        (_t = $qs('.dropdown-up')) === null || _t === void 0 ? void 0 : _t.classList.remove('hide');
        (_u = $qs('#order-summary-contents')) === null || _u === void 0 ? void 0 : _u.classList.add('order-summary-contents-opened');
    }
    else {
        (_v = $qs('.dropdown-down')) === null || _v === void 0 ? void 0 : _v.classList.remove('hide');
        (_w = $qs('.dropdown-up')) === null || _w === void 0 ? void 0 : _w.classList.add('hide');
        (_x = $qs('#order-summary-contents')) === null || _x === void 0 ? void 0 : _x.classList.remove('order-summary-contents-opened');
    }
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
function initModal(message) {
    var _this = this;
    var _a, _b, _c, _d, _e, _f;
    insertCustomCheckoutCSS(message);
    var prevCurrencyCode = '';
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
        renderInfoPageDisplay(Environment.modalUI.page());
        renderShippingPageDisplay(Environment.modalUI.page());
        renderPaymentPageDisplay(Environment.modalUI.page());
        renderReturningPageDisplay(Environment.modalUI.page());
        renderTermsAndCondition(Environment.modalUI.page(), (_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.wc_terms_conditions) !== null && _b !== void 0 ? _b : '');
        skipShippingPage();
        renderFreeOrderDisplay(DefaultCart.contents().length, DefaultCart.total());
        renderHideOnMobile(Environment.customer.mobile());
        renderMerchantCustomerAccountFormFields1(prevCartContainedSubscription !== Carts.subscriptionPresent());
        prevCartContainedSubscription = Carts.subscriptionPresent();
        displayErrorMessage(PeachPayOrder.errorMessage());
        if (Environment.modalUI.open()) {
            checkCurrentSentrySpan(Environment.modalUI.page(), Environment.modalUI.loadingMode(), Environment.customer.existing());
        }
        centerModal();
    });
    onWindowMessage('UI::modalOpened', function (_) {
        var _a, _b, _c;
        store.dispatch(updateEnvironment({
            modalIsOpen: true
        }));
        self.dispatchEvent(new CustomEvent('pp-update-currency-switcher-feature'));
        if (Environment.modalUI.page() !== 'info') {
            var infoFormValidity = (_b = (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.checkValidity()) !== null && _b !== void 0 ? _b : false;
            if (!infoFormValidity) {
                store.dispatch(updateEnvironment({
                    modalPageType: 'info',
                    customerExists: false
                }));
                (_c = $qs('#pp-info-form')) === null || _c === void 0 ? void 0 : _c.reportValidity();
            }
        }
    });
    onWindowMessage('UI::modalClosed', function (_) {
        store.dispatch(updateEnvironment({
            modalIsOpen: false
        }));
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
    (_a = $qs('.pp-exit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', requestCloseModal);
    (_b = $qs('.pp-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', requestCloseModal);
    (_c = $qs('.pp-close')) === null || _c === void 0 ? void 0 : _c.addEventListener('keypress', requestCloseModal);
    self.addEventListener('keydown', tabToExit);
    (_d = $qs('#edit-info')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', backToInfo);
    $qs('#open-shipping-info', function ($element) {
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
    (_e = $qs('#pp-continue-to-payment')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', continueToPayment);
    (_f = $qs('#pp-continue-to-payment-mobile')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', continueToPayment);
}
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
function renderFreeOrderDisplay(cartCount, cartTotal) {
    if (cartCount > 0 && cartTotal === 0) {
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
function backToShipping(event, open) {
    if (open === void 0) { open = false; }
    event.preventDefault();
    store.dispatch(updateEnvironment({
        modalPageType: 'shipping'
    }));
    if (open) {
        var formFields = PeachPayCustomer.data().form_fields;
        formFields['ship_to_different_address'] = '1';
        store.dispatch(updateCustomerFields(formFields));
        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
        $qs('#pp-refresh-shipping-options', function ($element) {
            $element.style.display = 'block';
        });
        $qs('#pp-shipping-options', function ($element) { return $element.classList.add('hide'); });
    }
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
    var _a, _b, _c, _d, _e;
    if (loadingMode === 'loading') {
        $qs('#pp-continue-to-shipping', function ($element) { return $element.disabled = true; });
        $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = true; });
        $qs('#pp-continue-to-shipping-mobile', function ($element) { return $element.disabled = true; });
        (_a = $qs('#continue-spinner')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#continue-spinner-mobile')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        $qs('#pp-continue-to-shipping', function ($element) { return $element.disabled = false; });
        if (!PeachPayCustomer.shipToDifferentAddress() || ((_c = $qs('#pp-refresh-shipping-options')) === null || _c === void 0 ? void 0 : _c.style.display) !== 'block') {
            $qs('#pp-continue-to-payment', function ($element) { return $element.disabled = false; });
        }
        $qs('#pp-continue-to-shipping-mobile', function ($element) { return $element.disabled = false; });
        (_d = $qs('#continue-spinner')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        (_e = $qs('#continue-spinner-mobile')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
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
    var _a, _b;
    if (testMode) {
        (_a = $qs('#pp-modal-content')) === null || _a === void 0 ? void 0 : _a.classList.add('test-mode-border');
        (_b = $qs('.test-mode-banner')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        $qs('#pp-modal-content', function ($element) { return $element.style.paddingTop = '1.25rem'; });
        $qs('.pp-close', function ($element) { return $element.style.top = '0.8rem'; });
        $qs('.pp-close', function ($element) { return $element.style.right = '4px'; });
    }
}
function renderButtonColorTheme(color) {
    if (color === void 0) { color = '#FF876C'; }
    document.documentElement.style.setProperty('--peachpay-theme-color', color);
    document.documentElement.style.setProperty('--peachpay-theme-color-opaque', color + '80');
    document.documentElement.style.setProperty('--peachpay-theme-color-light', color + '20');
}
function renderInfoPageDisplay(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (modalPage === 'info') {
        (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#pp-continue-to-shipping')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            dispatchRequestedPage('shipping');
        });
        (_c = $qs('#pp-continue-to-shipping-mobile')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            dispatchRequestedPage('shipping');
        });
        (_d = $qs('#pp-checkout-status-middle')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
            dispatchRequestedPage('shipping');
        });
        (_e = $qs('#pp-checkout-status-right')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
            dispatchRequestedPage('payment');
        });
    }
    else {
        (_f = $qs('#pp-info')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        (_g = $qs('#pp-checkout-status-middle')) === null || _g === void 0 ? void 0 : _g.removeEventListener('click', function () {
            dispatchRequestedPage('shipping');
        });
    }
}
function renderShippingPageDisplay(modalPage) {
    var _a, _b, _c;
    if (modalPage === 'shipping') {
        (_a = $qs('#pp-shipping')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#pp-checkout-status-right')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            dispatchRequestedPage('payment');
        });
    }
    else {
        (_c = $qs('#pp-shipping')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
    }
}
function renderPaymentPageDisplay(modalPage) {
    var _a, _b, _c, _d;
    if (modalPage === 'payment') {
        (_a = $qs('#pp-payment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#extra-fields-section')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#pp-checkout-status-right')) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', function () {
            dispatchRequestedPage('payment');
        });
    }
    else {
        (_d = $qs('#pp-payment')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
}
function renderReturningPageDisplay(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (modalPage === 'returning') {
        (_a = $qs('#pp-new-customer-checkout')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-existing-customer-checkout')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#pp-modal-content')) === null || _c === void 0 ? void 0 : _c.classList.add('col');
        (_d = $qs('#pp-modal-content')) === null || _d === void 0 ? void 0 : _d.classList.add('w-existing-checkout');
        (_e = $qs('#pp-modal-content')) === null || _e === void 0 ? void 0 : _e.classList.add('p-1-5');
        $qs('#pp-summary-body', function ($element) { return $element.style.borderBottom = 'none'; });
        for (var _i = 0, _l = $qsAll('.split'); _i < _l.length; _i++) {
            var $element = _l[_i];
            $element.style.setProperty('float', 'left', 'important');
        }
    }
    else {
        (_f = $qs('#pp-new-customer-checkout')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
        (_g = $qs('#pp-existing-customer-checkout')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#pp-modal-content')) === null || _h === void 0 ? void 0 : _h.classList.remove('col');
        (_j = $qs('#pp-modal-content')) === null || _j === void 0 ? void 0 : _j.classList.remove('w-existing-checkout');
        (_k = $qs('#pp-modal-content')) === null || _k === void 0 ? void 0 : _k.classList.remove('p-1-5');
        for (var _m = 0, _o = $qsAll('.split'); _m < _o.length; _m++) {
            var $element1 = _o[_m];
            $element1.style.removeProperty('float');
        }
    }
}
function skipShippingPage() {
    var _a, _b, _c, _d;
    var shouldSkipShippingPage = cartIsVirtual(DefaultCart.contents()) && ((_a = $qs('#additional-fields-new')) === null || _a === void 0 ? void 0 : _a.classList.contains('hide')) && ((_b = $qs('#pp-related-products-section')) === null || _b === void 0 ? void 0 : _b.classList.contains('hide'));
    if (shouldSkipShippingPage) {
        (_c = $qs('#pp-checkout-status-middle')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        $qsAll('#pp-continue-to-shipping, #pp-continue-to-shipping-mobile').forEach(function ($el) {
            $el.addEventListener('click', function () {
                dispatchRequestedPage('payment');
            });
        });
        $qsAll('.pp-back-to-shipping', function (element) {
            element.addEventListener('click', backToInfo);
        });
    }
    else {
        (_d = $qs('#pp-checkout-status-middle')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
    }
}
function centerModal() {
    var modal = $qs('#pp-modal-content');
    if ((modal === null || modal === void 0 ? void 0 : modal.scrollHeight) && modal.scrollHeight <= window.innerHeight) {
        if (window.matchMedia('(max-width: 900px)').matches) {
            modal.style.height = "".concat(Math.min(window.innerHeight, document.documentElement.clientHeight), "px");
            document.documentElement.style.removeProperty('height');
        }
        else {
            document.documentElement.style.setProperty('height', '100%');
            modal.style.removeProperty('height');
        }
    }
    else {
        document.documentElement.style.removeProperty('height');
        if (modal) {
            modal.style.removeProperty('height');
        }
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
    if (page === 'payment') {
        var merchantTermsConditions_1 = terms ? "".concat(getLocaleText("the store's"), " <a href='").concat(terms, "' target='_blank'>").concat(getLocaleText('terms and conditions'), "</a> ").concat(getLocaleText('and')) : '';
        $qsAll('.pp-tc-section', function ($el) {
            var _a;
            $el.innerHTML = '';
            if (location.hostname === 'legoudalier.com') {
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
function dispatchRequestedPage(page) {
    store.dispatch(updateEnvironment({
        requestedPage: page
    }));
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
function renderMerchantCustomerAccountFormFields1(subscriptionsChanged) {
    if (subscriptionsChanged) {
        installMerchantCustomerAccountFormFields();
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
        case 'demo.peachpay.app':
            return false;
        default:
            return true;
    }
}
function initLinkedProducts() {
    var _a, _b, _c;
    (_a = $qs('.pp-prev-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return scrollLeft(''); });
    (_b = $qs('.pp-next-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return scrollRight(''); });
    (_c = $qs('#pp-products-list')) === null || _c === void 0 ? void 0 : _c.addEventListener('scroll', function () { return scrollAdjuster(''); });
    var previousCartData = '';
    store.subscribe(function () {
        if (Environment.plugin.pageType() === 'product' || Environment.plugin.pageType() === 'cart') {
            var cartData = JSON.stringify(DefaultCart.contents());
            if (cartData !== previousCartData) {
                previousCartData = cartData;
                renderLinkedProducts(DefaultCart.contents());
            }
        }
    });
}
function clearLinkedProducts() {
    for (var _i = 0, _a = $qsAll('.pp-product-body'); _i < _a.length; _i++) {
        var linkedItem = _a[_i];
        linkedItem.remove();
    }
}
function renderLinkedProducts(cart) {
    var _a;
    clearLinkedProducts();
    for (var i = cart.length - 1; i >= 0; i--) {
        var item = cart[i];
        var linkedProducts = void 0;
        if (Environment.plugin.pageType() === 'product' && !item.is_part_of_bundle && item.upsell_items) {
            linkedProducts = item.upsell_items;
        }
        else if (Environment.plugin.pageType() === 'cart' && !item.is_part_of_bundle && item.cross_sell_items) {
            linkedProducts = item.cross_sell_items;
        }
        if (linkedProducts) {
            (_a = $qs('#linked-products-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
            for (var _i = 0, linkedProducts_1 = linkedProducts; _i < linkedProducts_1.length; _i++) {
                var linkedItem = linkedProducts_1[_i];
                if (!$qs('.pp-product-body[id=\'' + linkedItem.id + '\']')) {
                    var isBundleOrVariable = linkedItem.bundle || linkedItem.variable;
                    var productsList = $qs('#pp-products-list-main');
                    var productBody = document.createElement('div');
                    productBody.className = 'pp-product-body';
                    productBody.id = String(linkedItem.id);
                    productBody.innerHTML = "<div class=\"pp-rp-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"pp-related-product-img ".concat(linkedItem.img_src ? '' : 'hide', "\" src=").concat(linkedItem.img_src, ">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"flex col\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-title\">").concat(linkedItem.name, "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"img/sale.svg\" class=\"").concat(linkedItem.sale ? 'pp-rp-sale' : 'hide', "\"></img>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-price").concat(linkedItem.sale && !isBundleOrVariable ? ' pp-rp-price-sale' : linkedItem.sale && isBundleOrVariable ? ' pp-rp-bv-sale' : '', "\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t").concat(isBundleOrVariable ? linkedItem.price.replace(' &ndash; ', '<span> - </span>') : linkedItem.price, "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>");
                    linkedItem.variable ? productBody.append(renderVariationFields(linkedItem)) : '';
                    var dom = renderQuantityChanger(linkedItem.id, cart);
                    dom ? productBody.append(dom) : productBody.innerHTML += "<div>\n\t\t\t\t\t".concat(linkedItem.bundle ? "<a href=\"".concat(linkedItem.permalink, "\" class=\"pp-lp-btn\" target=\"_parent\">").concat(getLocaleText('View options'), "</a>") : "<button class=\"pp-lp-btn ".concat(linkedItem.variable ? 'pp-js-display' : 'pp-js-add-btn', "\" data-pid=").concat(linkedItem.id, ">\n\t\t\t\t\t\t\t\t").concat(linkedItem.variable ? '' : "<span style=\"pointer-events: none;\">+</span>", "\n\t\t\t\t\t\t\t\t<span style=\"pointer-events: none;\">").concat(linkedItem.variable ? getLocaleText('Customize') : getLocaleText('Add'), "</span>\n\t\t\t\t\t\t\t</button>"), "\n\t\t\t\t\t</div>");
                    productsList === null || productsList === void 0 ? void 0 : productsList.prepend(productBody);
                }
            }
        }
    }
    renderHorizontalScroll();
    variationFieldsUI();
    initQuantityChangerEvent();
    for (var _b = 0, _c = $qsAll('.pp-js-add-btn'); _b < _c.length; _b++) {
        var addBtn = _c[_b];
        addBtn.addEventListener('click', function (event) {
            store.dispatch(startModalLoading());
            event.target.disabled = true;
            event.target.innerHTML = '<img src="img/spinner-dark.svg" class="linked-product-spinner"/>';
            addLinkedProducttoCart(event.target);
        });
    }
}
function variationFieldsUI() {
    for (var _i = 0, _a = $qsAll('.pp-js-display'); _i < _a.length; _i++) {
        var button = _a[_i];
        button.addEventListener('click', function (event) {
            var id = event.target.dataset.pid;
            var container = $qs('.pp-lp-form-container[data-pid=\'' + id + '\']');
            container === null || container === void 0 ? void 0 : container.classList.remove('hide');
            event.target.classList.add('hide');
        });
    }
    for (var _b = 0, _c = $qsAll('.pp-js-cancel-btn'); _b < _c.length; _b++) {
        var button1 = _c[_b];
        button1.addEventListener('click', function (event) {
            var _a;
            var id = event.target.dataset.pid;
            var container = $qs('.pp-lp-form-container[data-pid=\'' + id + '\']');
            container === null || container === void 0 ? void 0 : container.classList.add('hide');
            (_a = $qs('.pp-js-display[data-pid=\'' + id + '\']')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
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
function renderVariationFields(linkedItem) {
    var formContainer = document.createElement('div');
    formContainer.setAttribute('data-pid', linkedItem.id.toString());
    formContainer.classList.add('flex', 'col', 'hide', 'pp-lp-form-container');
    var variationForm = document.createElement('form');
    variationForm.setAttribute('data-pid', linkedItem.id.toString());
    variationForm.className = 'pp-variation-form';
    for (var _i = 0, _a = linkedItem.attributes; _i < _a.length; _i++) {
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
    addToCartButton.setAttribute('data-pid', linkedItem.id.toString());
    addToCartButton.innerHTML = "<span style=\"pointer-events: none;\">+</span><span style=\"pointer-events: none;\">".concat(getLocaleText('ADD'), "</span>");
    var cancelButton = document.createElement('button');
    cancelButton.classList.add('pp-variation-cancel-btn', 'pp-js-cancel-btn');
    cancelButton.setAttribute('data-pid', linkedItem.id.toString());
    cancelButton.innerText = getLocaleText('Close');
    formContainer.append(variationForm);
    formContainer.append(addToCartButton);
    formContainer.append(cancelButton);
    return formContainer;
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
function addLinkedProducttoCart(linkedProduct) {
    window.parent.postMessage({
        event: 'addLinkedProduct',
        productID: linkedProduct.dataset.pid
    }, '*');
}
function renderHorizontalScroll() {
    var _a, _b, _c, _d;
    if ($qsAll('.pp-product-body').length > 1) {
        (_a = $qs('.pp-prev-btn')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('.pp-next-btn')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        (_c = $qs('.pp-prev-btn')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('.pp-next-btn')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
    scrollAdjuster('');
}
function renderQuantityChanger(linkedID, cart) {
    for (var i = cart.length - 1; i >= 0; i--) {
        var item = cart[i];
        if (linkedID === item.product_id) {
            var $div = document.createElement('div');
            $div.innerHTML += "\n\t\t\t\t<div class=\"quantity-changer\" style=\"justify-content: center;\">\n\t\t\t\t\t<button type=\"button\" class=\"decrease-qty qty-btn ".concat(cartItemQuantity(item) <= 1 ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/minus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t\t\t\t<form onSubmit=\"return false;\" class=\"mb-0\">\n\t\t\t\t\t\t<input type=\"number\" min=\"0\" max=\"").concat(item.stock_qty ? item.stock_qty : '', "\" class=\"qty-fs\" value=\"").concat(cartItemQuantity(item), "\" data-qid=\"").concat(item.item_key, "\" required/>\n\t\t\t\t\t</form>\n\t\t\t\t\t<button type=\"button\" class=\"increase-qty qty-btn ").concat(item.stock_qty && cartItemQuantity(item) >= item.stock_qty ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\"><img src=\"img/plus.svg\" class=\"qty-btn-inner\"/></button>\n\t\t\t\t</div>");
            return $div;
        }
    }
    return '';
}
function installOneClickCheckout(testMode) {
    var oneClickURL = getOneClickURL(location.hostname, testMode);
    var $body = document.querySelector('body');
    $body === null || $body === void 0 ? void 0 : $body.insertAdjacentHTML('beforeend', "\n\t<iframe id=\"one-click-iframe\" \n\t\tframeborder=\"0\" \n\t\tallowtransparency=\"true\" \n\t\tscrolling=\"no\" \n\t\tallow=\"payment *\"\n\t\taria-hidden=\"true\" \n\t\ttabindex=\"-1\" \n\t\tstyle=\"border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; visibility: hidden !important; position: fixed !important; height: 1px !important; pointer-events: none !important; user-select: none !important;\"\n\t\tsrc=\"".concat(oneClickURL, "one-click.html\"\n\t>\n\t\tUnable to load PeachPay One Click Checkout Support\n\t</iframe>"));
}
function initCurrencySwitcher() {
    var _this = this;
    self.addEventListener('pp-update-currency-switcher-feature', updateCurrencySwitcherFeature);
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
    if (!Feature.enabled(FeatureFlag.CURRENCY_SWITCHER_INPUT)) {
        return;
    }
    renderCurrencySelector();
    self.addEventListener('pp-change-currency', currencyDefaultChange);
}
function renderCurrencySelector() {
    $qsAll('#pp_currency_select, #pp_currency_select_div', function ($removeSelector) {
        $removeSelector.remove();
    });
    var currencies = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currencies');
    var currencyInfo = Feature.metadata(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
    if (!currencies || !currencyInfo) {
        return;
    }
    var $insertionLocationExisting = $qs('#pp-pms-existing-container');
    var $insertionLocationNew = $qs('#pp-pms-new-container');
    var existingCurrencySelectContainer = document.createElement('div');
    var $currencySelectTitle = document.createElement('span');
    $currencySelectTitle.innerHTML = getLocaleText('Currency');
    $currencySelectTitle.setAttribute('class', 'pp-title');
    existingCurrencySelectContainer.id = 'pp_currency_select_div';
    existingCurrencySelectContainer.setAttribute('class', 'pp-section-mb');
    existingCurrencySelectContainer.append($currencySelectTitle);
    var $newCurrencySelectContainer = existingCurrencySelectContainer.cloneNode(true);
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
    var $options = renderCurrencyList(mappedCurrencies, MerchantConfiguration.currency.code());
    var $existingCurrencySelect = document.createElement('select');
    $existingCurrencySelect.innerHTML = $options;
    $existingCurrencySelect.classList.add('pp-currency-selector');
    selectDropdown($existingCurrencySelect, MerchantConfiguration.currency.code());
    var $divExisting = document.createElement('div');
    $divExisting.classList.add('pp-currency-selector-container');
    $divExisting.append($existingCurrencySelect);
    existingCurrencySelectContainer.append($divExisting);
    var $newCurrencySelect = document.createElement('select');
    $newCurrencySelect.innerHTML = $options;
    $newCurrencySelect.classList.add('pp-currency-selector');
    selectDropdown($newCurrencySelect, MerchantConfiguration.currency.code());
    var $divNew = document.createElement('div');
    $divNew.classList.add('pp-currency-selector-container');
    $divNew.append($newCurrencySelect);
    $newCurrencySelectContainer.append($divNew);
    $existingCurrencySelect.addEventListener('change', currencyEventListener);
    $newCurrencySelect.addEventListener('change', currencyEventListener);
    $insertionLocationExisting === null || $insertionLocationExisting === void 0 ? void 0 : $insertionLocationExisting.insertAdjacentElement('beforebegin', existingCurrencySelectContainer);
    $insertionLocationNew === null || $insertionLocationNew === void 0 ? void 0 : $insertionLocationNew.insertAdjacentElement('beforebegin', $newCurrencySelectContainer);
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
function initPaymentMethods() {
    handleMorePMToggle();
    handlePMTabOptionsEvents();
    handleMoreOptionsEvents();
    handleSavedPMOptionEvents();
    handleNewPMOptionButtonEvents();
    handleSavedPMOptionButtonEvents();
    store.subscribe(function () {
        reactToMethodFiltering();
        renderSelectedPM();
        processPMTabOptions();
        renderPaymentPageCustomerSummary();
        setTabIndex();
    });
}
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
function renderPaymentPageCustomerSummary() {
    var isVirtual = cartIsVirtual(DefaultCart.contents());
    var name = getFullName();
    var address = getFullAddress();
    var html = "\n\t\t<div class=\"pp-pm-single-row\">\n\t\t\t<img class=\"pp-pm-badge-sm\" src=\"img/marks/personal_info.svg\" />\n\t\t\t<span class=\"pp-name\">".concat(name, "</span>\n\t\t</div>\n\t\t<div class=\"pp-pm-single-row\">\n\t\t\t<img class=\"pp-pm-badge-sm\" src=\"img/marks/").concat(isVirtual ? 'billing_address' : 'location_info', ".svg\" />\n\t\t\t<span class=\"pp-name\">").concat(address, "</span>\n\t\t</div>");
    if (name.replace(/\s/g, '') === '' && address.replace(/\s/g, '') === '') {
        return;
    }
    $qsAll('.pp-pms-single').forEach(function ($el) {
        $el.classList.remove('hide');
        $el.innerHTML = html;
    });
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
    if (methodConfig.reusable && !savedMethod && !savedIndex || methodConfig.requireInput && !savedIndex) {
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
    $qsAll('.pp-pms', function ($el) {
        $el.addEventListener('click', function (e) {
            var _a, _b, _c;
            var $target = e.target;
            var $pmType = $target === null || $target === void 0 ? void 0 : $target.closest('.pp-pm-type:not(.pp-more-options)');
            if (!$pmType) {
                return;
            }
            var providerKey = (_a = $pmType.dataset.provider) !== null && _a !== void 0 ? _a : '';
            var methodKey = (_b = $pmType.dataset.method) !== null && _b !== void 0 ? _b : '';
            var _d = PeachPayCustomer.retrieveSavedPaymentMethods(providerKey, methodKey), savedMethods = _d[0], method = _d[1];
            if (((_c = method === null || method === void 0 ? void 0 : method.supports) === null || _c === void 0 ? void 0 : _c.defaultCurrency) !== 'none' && !PaymentConfiguration.methodSupportsCurrentCurrency(providerKey, methodKey)) {
                var event_1 = new CustomEvent('pp-change-currency', {
                    detail: method === null || method === void 0 ? void 0 : method.supports.defaultCurrency
                });
                self.dispatchEvent(event_1);
            }
            var pmData = {
                provider: providerKey,
                method: methodKey
            };
            if ((method === null || method === void 0 ? void 0 : method.reusable) && (savedMethods === null || savedMethods === void 0 ? void 0 : savedMethods.length)) {
                pmData.index = '0';
            }
            store.dispatch(setPaymentMethod(pmData));
            self.dispatchEvent(new CustomEvent('pp-pm-updated'));
        });
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
    var _a, _b;
    var isSelected = PaymentConfiguration.isProviderAndMethodSelected(providerKey, methodKey);
    var single = PaymentConfiguration.eligibleMethodCount() === 1;
    var labelNameTranslations = {
        'Purchase Order': getLocaleText('Place Purchase Order'),
        'PayPal': getLocaleText('Pay with PayPal'),
        'Card': getLocaleText('Pay with Card')
    };
    if (single) {
        return "<div class=\"pp-pm-type-single ".concat(isSelected ? 'selected' : '', "\" tabindex=\"0\" role=\"button\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t\t\t<img class=\"pp-pm-badge-sm\" style=\"transform: scale(").concat(method.assets.badge.scale, ") translateX(").concat((_a = method.assets.badge.translateX) !== null && _a !== void 0 ? _a : '0', "px)\" src=\"").concat(method.assets.badge.src, "\" draggable=\"false\">\n\t\t\t<span class=\"pp-name\">").concat(labelNameTranslations[method.name], "</span>\n\t\t\t<span class=\"pp-question-mark hide\">\n\t\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t\t</span>\n\t\t</div>");
    }
    return "\n\t<div class=\"pp-pm-type ".concat(isSelected ? 'selected' : '', "\" tabindex=\"0\" role=\"button\" data-provider=\"").concat(providerKey, "\" data-method=\"").concat(methodKey, "\">\n\t\t<span>\n\t\t\t<img class=\"pp-pm-full-badge\" style=\"transform: scale(").concat(method.assets.badge.scale, ") translateX(").concat((_b = method.assets.badge.translateX) !== null && _b !== void 0 ? _b : '0', "px)\" src=\"").concat(method.assets.badge.src, "\" draggable=\"false\">\n\t\t</span>\n\t\t").concat(method.showName ? getLocaleText(method.name) : '', "\n\t\t<span class=\"pp-question-mark hide\">\n\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t</span>\n\t</div>");
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
    var availableOptionsHTML = PaymentConfiguration.allEligibleMethods().filter(function (info) { return !PaymentConfiguration.isPrimaryMethod(info.provider, info.method); }).map(function (info) { return "\n<li data-provider=\"".concat(info.provider, "\" data-method=\"").concat(info.method, "\" role=\"button\" tabindex=\"-1\">\n\t<span><img class=\"pp-more-option-badge\" src=\"").concat(info.config.assets.badge.src, "\" draggable=\"false\"></span>\n\t<span>").concat(info.config.name, "</span>\n</li>"); }).join('');
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
    return "\n\t<div class=\"pp-pm-type pp-more-options\" tabindex=\"0\" role=\"button\">\n\t\t<span>\n\t\t\t<img class=\"pp-pm-more-options\" src=\"img/dot-dot-dot.svg\" draggable=\"false\">\n\t\t</span>\n\t\t<span class=\"pp-pm-more-container hide\">\n\t\t\t<ul class=\"pp-pm-more\"></ul>\n\t\t</span>\n\t\t<span class=\"pp-question-mark hide\">\n\t\t\t<img class=\"pp-pm-help-badge\" src=\"img/property-help.svg\">\n\t\t</span>\n\t</div>";
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
    var tooltip = (_c = (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children[0];
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
function getStripeInstance(context, usePeachPayStripe) {
    if (usePeachPayStripe) {
        return [
            context.peachpayStripe,
            context.elements
        ];
    }
    return [
        context.connectStripe,
        context.elements
    ];
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
                minimumTotal: 50,
                currencies: [
                    'USD'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                merchantCountries: [
                    'US'
                ],
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
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
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
        confirm: function (context, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
                        return [4, stripe.confirmAffirmPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 1:
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
                merchantCountries: [
                    'US',
                    'GB',
                    'ES',
                    'IT',
                    'IE',
                    'CA',
                    'AU',
                    'FR',
                    'NZ'
                ],
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
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
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
        confirm: function (context, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
                        return [4, stripe.confirmAfterpayClearpayPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 1:
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
        renderStripeButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode(), DefaultCart.total());
        renderStripeButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
    });
}
function renderStripeButtonDisplay(provider, loadingMode, cartTotal) {
    if (provider === 'stripe' && cartTotal > 0) {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (provider === 'stripe' && loadingMode !== 'loading' && cartTotal > 0) {
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
    }
    else {
        $qsAll('.stripe-btn > .button-text', function ($element) { return $element.innerHTML = "".concat(getLocaleText('Pay'), " ").concat(formatCurrencyString(DefaultCart.total())); });
        $qsAll('.stripe-btn-spinner', function ($element) { return $element.classList.add('hide'); });
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
            currencies: [
                'ALL'
            ],
            productTypes: [
                'subscriptions'
            ],
            virtualProducts: true,
            shippingMethods: [],
            merchantCountries: [
                'ALL'
            ],
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
        confirm: function (context, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, _a, error, paymentIntent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
                        return [4, stripe.confirmCardPayment(clientSecret)];
                    case 1:
                        _a = _b.sent(), error = _a.error, paymentIntent = _a.paymentIntent;
                        if (error) {
                            displayCardError(error.message);
                            store.dispatch(stopModalLoading());
                            return [2, [
                                    false,
                                    error.message
                                ]];
                        }
                        if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture') {
                            if (window.top) {
                                clearLocalSession();
                                window.top.location = options.directURL;
                            }
                        }
                        return [2, [
                                false
                            ]];
                }
            });
        }); }
    };
}
function displayCardError(error) {
    var _a;
    $qsAll('.pp-stripe-pm-error-text', function ($el) { return $el.remove(); });
    var $container = $qsAll("div.pp-pm-saved-option[data-provider=\"stripe\"][data-method=\"card\"][data-index=\"\"]");
    $container.forEach(function ($el) {
        $el.insertAdjacentHTML('afterend', "<div class=\"pp-stripe-pm-error-text\"><span>".concat(error, "</span></div>"));
    });
    (_a = $qs('#pp-selected-pm')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', "<div class=\"pp-stripe-pm-error-text\"><span>".concat(error, "</span></div>"));
    setTimeout(function () {
        $qsAll('.pp-stripe-pm-error-text', function ($el) { return $el.remove(); });
    }, 5000);
}
function initStripeKlarnaMethod() {
    var _this = this;
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
                currencies: [
                    'EUR',
                    'USD',
                    'GBP',
                    'DKK',
                    'SEK',
                    'NOK'
                ],
                productTypes: [],
                virtualProducts: true,
                shippingMethods: [],
                merchantCountries: [
                    'US',
                    'AT',
                    'BE',
                    'DK',
                    'EE',
                    'FI',
                    'FR',
                    'DE',
                    'GR',
                    'IE',
                    'IT',
                    'LV',
                    'LT',
                    'NL',
                    'NO',
                    'SK',
                    'SI',
                    'ES',
                    'SE',
                    'GB',
                ],
                customerCountries: [
                    'US',
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
                    'GB',
                ]
            }
        },
        createPaymentMethod: function (context) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, config, _a, paymentMethod, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
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
        confirm: function (context, clientSecret, options) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripe = getStripeInstance(context, Environment.isOurStore())[0];
                        return [4, stripe.confirmKlarnaPayment(clientSecret, {
                                return_url: options.intermediateURL
                            })];
                    case 1:
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
        isOurStore: Environment.isOurStore(),
        isProductPage: Environment.plugin.pageType() === 'product',
        currencyCode: MerchantConfiguration.currency.code(),
        cartCalculationRecord: store.getState().calculatedCarts,
        stripe: {
            publicKey: context.service.getStripePublicKey(),
            connectId: context.service.getStripeConnectId(),
            applePay: applePay !== null && applePay !== void 0 ? applePay : false,
            googlePay: googlePay !== null && googlePay !== void 0 ? googlePay : false
        }
    };
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage(initMessage, '*');
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
        var orderResponse, paymentIntentResponse, stripe, _g, error, paymentIntent, error1_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    store.dispatch(updateCustomerFields({
                        shipping_company: '',
                        shipping_email: request.payerEmail,
                        shipping_phone: request.payerPhone,
                        shipping_first_name: (_a = request.payerName.split(' ')[0]) !== null && _a !== void 0 ? _a : '',
                        shipping_last_name: (_b = request.payerName.split(' ')[1]) !== null && _b !== void 0 ? _b : '',
                        shipping_address_1: request.shippingAddress.addressLine[0],
                        shipping_address_2: (_c = request.shippingAddress.addressLine[1]) !== null && _c !== void 0 ? _c : '',
                        shipping_city: request.shippingAddress.city,
                        shipping_state: request.shippingAddress.region,
                        shipping_country: request.shippingAddress.country,
                        shipping_postcode: request.shippingAddress.postalCode,
                        billing_company: '',
                        billing_email: request.payerEmail,
                        billing_phone: request.payerPhone,
                        billing_first_name: (_d = request.payerName.split(' ')[0]) !== null && _d !== void 0 ? _d : '',
                        billing_last_name: (_e = request.payerName.split(' ')[1]) !== null && _e !== void 0 ? _e : '',
                        billing_address_1: request.shippingAddress.addressLine[0],
                        billing_address_2: (_f = request.shippingAddress.addressLine[1]) !== null && _f !== void 0 ? _f : '',
                        billing_city: request.shippingAddress.city,
                        billing_state: request.shippingAddress.region,
                        billing_country: request.shippingAddress.country,
                        billing_postcode: request.shippingAddress.postalCode
                    }));
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 6, , 7]);
                    return [4, validateAddress()];
                case 2:
                    if (!(_h.sent())) {
                        return [2, {
                                status: 'invalid_shipping_address'
                            }];
                    }
                    return [4, orderService.placeOrder()];
                case 3:
                    orderResponse = _h.sent();
                    if (orderResponse.result === 'failure') {
                        captureSentryException(new Error("Order failed to be placed for the payment request flow."), {
                            'payment_request': request,
                            'order_response': orderResponse
                        });
                        return [2, {
                                status: 'fail'
                            }];
                    }
                    return [4, context.service.createPaymentIntent(orderResponse, {
                            paymentMethodType: 'none'
                        })];
                case 4:
                    paymentIntentResponse = _h.sent();
                    if (!paymentIntentResponse.success) {
                        captureSentryException(new Error("Creating payment intent failed for payment request flow."), {
                            'payment_request': request,
                            'payment_intent_response': paymentIntentResponse
                        });
                        return [2, {
                                status: 'fail'
                            }];
                    }
                    stripe = getStripeInstance(context, Environment.isOurStore())[0];
                    return [4, stripe.confirmCardPayment(paymentIntentResponse.data.stripe.client_secret, {
                            payment_method: {
                                card: {
                                    token: request.token.id
                                },
                                billing_details: PeachPayCustomer.stripeBillingDetails()
                            }
                        })];
                case 5:
                    _g = _h.sent(), error = _g.error, paymentIntent = _g.paymentIntent;
                    if (!error && paymentIntent.status === 'succeeded') {
                        clearLocalSession();
                        return [2, {
                                status: 'success',
                                redirectURL: orderService.getOrderRedirect(orderResponse)
                            }];
                    }
                    return [2, {
                            status: 'fail'
                        }];
                case 6:
                    error1_1 = _h.sent();
                    if (error1_1 instanceof Error) {
                        captureSentryException(new Error("Stripe payment request flow failed"), {
                            exception: error1_1
                        });
                    }
                    return [2, {
                            status: 'fail'
                        }];
                case 7: return [2];
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
                    return [2, getStripePaymentRequestUpdate()];
            }
        });
    });
}
function setupPoweredByStripe() {
    store.subscribe(function () {
        if (Feature.enabled(FeatureFlag.STRIPE)) {
            $qsAll('.powered-by-stripe', function ($el) { return $el === null || $el === void 0 ? void 0 : $el.classList.remove('hide'); });
        }
        else {
            $qsAll('.powered-by-stripe', function ($el) { return $el === null || $el === void 0 ? void 0 : $el.classList.add('hide'); });
        }
    });
}
var STRIPE_TEST_PK = 'pk_test_CnL2kA52V5dRqZbjlJ0sZ2gr00uBrOEmQQ';
var STRIPE_LIVE_PK = 'pk_live_oROnIQDuexHZpnEOcUff3CRz00asaOOCAL';
function initStripePaymentProvider(message, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var stripePublicKey, peachpayStripeOptions, peachpayStripe, connectStripeOptions, connectStripe, elements, context, capabilities, paymentMethods;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Feature.enabled(FeatureFlag.STRIPE)) {
                        return [2];
                    }
                    stripePublicKey = Environment.isTestOrDevSite() ? STRIPE_TEST_PK : STRIPE_LIVE_PK;
                    peachpayStripeOptions = buildStripeOptions(message, true);
                    peachpayStripe = Stripe(stripePublicKey, peachpayStripeOptions);
                    connectStripeOptions = buildStripeOptions(message, false);
                    connectStripe = Stripe(stripePublicKey, connectStripeOptions);
                    elements = peachpayStripe.elements();
                    context = {
                        peachpayStripe: peachpayStripe,
                        connectStripe: connectStripe,
                        elements: elements,
                        service: {
                            getStripePublicKey: function () { return stripePublicKey; },
                            getStripeConnectId: function () { var _a; return (_a = Feature.metadata(FeatureFlag.STRIPE, 'connected_stripe_account')) !== null && _a !== void 0 ? _a : ''; },
                            createPaymentIntent: createPaymentIntent
                        }
                    };
                    return [4, getStripeAccountCapabilities()];
                case 1:
                    capabilities = _a.sent();
                    paymentMethods = setupStripeMethods(capabilities);
                    activateStripeMethods(context, paymentMethods, orderService);
                    setupStripeButton();
                    setupPoweredByStripe();
                    activateStripePaymentRequest(context, orderService);
                    return [2];
            }
        });
    });
}
function setupStripeMethods(account) {
    var paymentMethods = {};
    var cardMethod = initStripeCardMethod();
    paymentMethods['card'] = cardMethod;
    if (isPaymentMethodActive(account, 'affirm_payments')) {
        var affirmMethod = initStripeAffirmMethod();
        paymentMethods['affirm'] = affirmMethod;
    }
    if (isPaymentMethodActive(account, 'klarna_payments')) {
        var klarnaMethod = initStripeKlarnaMethod();
        paymentMethods['klarna'] = klarnaMethod;
    }
    if (isPaymentMethodActive(account, 'afterpay_clearpay_payments')) {
        var afterpayMethod = initStripeAfterPayMethod();
        paymentMethods['afterpay_clearpay'] = afterpayMethod;
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
        var activations, key, method, confirm;
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
                    confirm = function (event) {
                        if (!checkRequiredFields()) {
                            return;
                        }
                        var $target = event.target;
                        var $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
                        if (!$button) {
                            return;
                        }
                        var method = methods[PaymentConfiguration.selectedProviderMethod()];
                        if (!method) {
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
                        if (Feature.enabled(FeatureFlag.ONE_CLICK_UPSELL) && 'after_payment' === Feature.metadata(FeatureFlag.ONE_CLICK_UPSELL, 'pp_ocu_flow') && checkRequiredFields() && ((_a = $qs('#pp-ocu-container')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-expanded')) === 'false') {
                            displayOCUPage('after_payment');
                            $qsAll('.pp-ocu-close, .pp-ocu-decline-button, .pp-ocu-accept-button', function ($el) { return $el.addEventListener('click', confirm); });
                        }
                        else {
                            confirm(event);
                        }
                    }); });
                    return [2];
            }
        });
    });
}
function newPaymentMethodFlow(context, providerMethod, orderService) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var paymentMethod, orderResponse, paymentIntentResponse, savedDetails, successURL, intermediateURL, _c, unhandledError, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, providerMethod.createPaymentMethod(context)];
                case 1:
                    paymentMethod = _d.sent();
                    if (!paymentMethod) {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    return [4, orderService.placeOrder()];
                case 2:
                    orderResponse = _d.sent();
                    if (orderResponse.result === 'failure') {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    return [4, createPaymentIntent(orderResponse, {
                            paymentMethodId: paymentMethod.id,
                            paymentMethodType: paymentMethod.type
                        })];
                case 3:
                    paymentIntentResponse = _d.sent();
                    if (!!paymentIntentResponse.success) return [3, 8];
                    store.dispatch(stopModalLoading());
                    if (!(paymentIntentResponse.message && providerMethod.displayPaymentIntentError)) return [3, 5];
                    providerMethod.displayPaymentIntentError(paymentIntentResponse.message);
                    return [4, orderService.addOrderNote(orderResponse, 'Payment attempt failed. Reason: ' + paymentIntentResponse.message)];
                case 4:
                    _d.sent();
                    return [3, 7];
                case 5: return [4, orderService.addOrderNote(orderResponse, 'Payment attempt failed. Reason: An unknown error occured while creating the Stripe Payment Intent')];
                case 6:
                    _d.sent();
                    store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                    captureSentryException(new Error("Creating payment intent failed for new payment method flow."), {
                        'payment_method': paymentMethod,
                        'payment_intent_response': paymentIntentResponse
                    });
                    _d.label = 7;
                case 7: return [2];
                case 8:
                    store.dispatch(updateCustomerStripeId(paymentIntentResponse.data.stripe.customer_id));
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
                    intermediateURL = buildRedirectStateURL(successURL, (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.location.href) !== null && _b !== void 0 ? _b : '');
                    return [4, providerMethod.confirm(context, paymentIntentResponse.data.stripe.client_secret, {
                            intermediateURL: intermediateURL,
                            directURL: orderResponse.redirect
                        })];
                case 9:
                    _c = _d.sent(), unhandledError = _c[0], message = _c[1];
                    if (unhandledError) {
                        store.dispatch(stopModalLoading());
                        store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                        captureSentryException(new Error("Confirming Stripe payment intent failed for new payment method flow."), {
                            'confirm_failure': message,
                            'payment_method': paymentMethod,
                            'payment_intent_response': paymentIntentResponse,
                            'success_url': successURL,
                            'intermediate_url': intermediateURL
                        });
                        return [2];
                    }
                    return [2];
            }
        });
    });
}
function existingPaymentMethodFlow(context, providerMethod, orderService) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var savedPaymentMethod, orderResponse, paymentIntentResponse, successURL, intermediateURL, _c, unhandledError, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    if (!providerMethod.config.reusable || !PaymentConfiguration.selectedProviderMethodIndex()) {
                        return [2, newPaymentMethodFlow(context, providerMethod, orderService)];
                    }
                    savedPaymentMethod = PeachPayCustomer.retrieveSavedPaymentMethod(PaymentConfiguration.selectedProvider(), PaymentConfiguration.selectedProviderMethod(), PaymentConfiguration.selectedProviderMethodIndex())[0];
                    if (!savedPaymentMethod || !savedPaymentMethod.id) {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    return [4, orderService.placeOrder()];
                case 1:
                    orderResponse = _d.sent();
                    if (orderResponse.result === 'failure') {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    return [4, createPaymentIntent(orderResponse, {
                            paymentMethodId: savedPaymentMethod.id,
                            paymentMethodType: PaymentConfiguration.selectedProviderMethod()
                        })];
                case 2:
                    paymentIntentResponse = _d.sent();
                    if (!!paymentIntentResponse.success) return [3, 7];
                    store.dispatch(stopModalLoading());
                    if (!(paymentIntentResponse.message && providerMethod.displayPaymentIntentError)) return [3, 4];
                    return [4, orderService.addOrderNote(orderResponse, 'Payment attempt failed. Reason: ' + paymentIntentResponse.message)];
                case 3:
                    _d.sent();
                    providerMethod.displayPaymentIntentError(paymentIntentResponse.message);
                    return [3, 6];
                case 4: return [4, orderService.addOrderNote(orderResponse, 'Payment attempt failed. Reason: An unknown error occured while creating the Stripe Payment Intent')];
                case 5:
                    _d.sent();
                    store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                    captureSentryException(new Error("Creating Stripe payment intent failed for existing payment flow."), {
                        'saved_method': savedPaymentMethod,
                        'payment_intent_response': paymentIntentResponse
                    });
                    _d.label = 6;
                case 6: return [2];
                case 7:
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: PaymentConfiguration.selectedProviderMethodIndex()
                    }));
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    intermediateURL = buildRedirectStateURL(successURL, (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.location.href) !== null && _b !== void 0 ? _b : '');
                    return [4, providerMethod.confirm(context, paymentIntentResponse.data.stripe.client_secret, {
                            intermediateURL: intermediateURL,
                            directURL: orderResponse.redirect
                        })];
                case 8:
                    _c = _d.sent(), unhandledError = _c[0], message = _c[1];
                    if (unhandledError) {
                        store.dispatch(stopModalLoading());
                        store.dispatch(setOrderError(getLocaleText('Sorry, something went wrong. Please refresh the page and try again.')));
                        captureSentryException(new Error("Confirming payment intent failed for existing payment flow."), {
                            'confirm_failure': message,
                            'saved_method': savedPaymentMethod,
                            'payment_intent_response': paymentIntentResponse,
                            'success_url': successURL,
                            'intermediate_url': intermediateURL
                        });
                        return [2];
                    }
                    return [2];
            }
        });
    });
}
function buildRedirectStateURL(successURL, failureURL) {
    var _a;
    var createState = function () {
        if (Environment.isOurStore()) {
            return {
                key: Environment.isTestOrDevSite() ? STRIPE_TEST_PK : STRIPE_LIVE_PK,
                sessionId: PeachPayOrder.sessionId(),
                intentCancelURL: "".concat(Environment.apiURL(), "api/v1/stripe/payment-intent/cancel"),
                successURL: successURL,
                failureURL: failureURL,
                color: Environment.plugin.buttonColor()
            };
        }
        else {
            return {
                key: Environment.isTestOrDevSite() ? STRIPE_TEST_PK : STRIPE_LIVE_PK,
                sessionId: PeachPayOrder.sessionId(),
                intentCancelURL: "".concat(Environment.apiURL(), "api/v1/stripe/payment-intent/cancel"),
                connectId: Feature.metadata(FeatureFlag.STRIPE, 'connected_stripe_account'),
                successURL: successURL,
                failureURL: failureURL,
                color: Environment.plugin.buttonColor()
            };
        }
    };
    var state = btoa(JSON.stringify(createState()));
    var url = new URL((_a = Feature.metadata(FeatureFlag.STRIPE, 'redirect_url_base')) !== null && _a !== void 0 ? _a : '');
    var params = new URLSearchParams();
    params.append('state', state);
    url.search = params.toString();
    return url.toString();
}
function buildStripeOptions(message, isPeachPayConfig) {
    var _a, _b;
    if (isPeachPayConfig) {
        return {
            locale: (_a = message === null || message === void 0 ? void 0 : message.browserLocale) !== null && _a !== void 0 ? _a : 'auto'
        };
    }
    else {
        var stripeConnectAccount = Feature.metadata(FeatureFlag.STRIPE, 'connected_stripe_account');
        return {
            locale: (_b = message === null || message === void 0 ? void 0 : message.browserLocale) !== null && _b !== void 0 ? _b : 'auto',
            stripeAccount: stripeConnectAccount !== null && stripeConnectAccount !== void 0 ? stripeConnectAccount : ''
        };
    }
}
function createPaymentIntent(order, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4, fetchHostWindowData('pp-create-stripe-payment-intent', {
                            session: {
                                id: PeachPayOrder.sessionId(),
                                stripe: {
                                    customer_id: PeachPayCustomer.stripeId(),
                                    connect_id: (_a = Feature.metadata(FeatureFlag.STRIPE, 'connected_stripe_account')) !== null && _a !== void 0 ? _a : '',
                                    payment_method_id: (_b = options.paymentMethodId) !== null && _b !== void 0 ? _b : '',
                                    payment_method_type: options.paymentMethodType
                                }
                            },
                            order: {
                                id: order.order_id,
                                data: order
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!response) {
                        return [2, {
                                success: false
                            }];
                    }
                    return [2, response];
                case 2:
                    error_5 = _c.sent();
                    if (error_5 instanceof Error) {
                        captureSentryException(new Error("Failed to create Stripe payment intent"), {
                            'exception': error_5
                        });
                    }
                    return [2, {
                            success: false
                        }];
                case 3: return [2];
            }
        });
    });
}
function getStripeAccountCapabilities() {
    return __awaiter(this, void 0, void 0, function () {
        var getConnectId, response, json, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    getConnectId = function () {
                        var _a;
                        if (Environment.isOurStore()) {
                            return '';
                        }
                        else {
                            return (_a = Feature.metadata(FeatureFlag.STRIPE, 'connected_stripe_account')) !== null && _a !== void 0 ? _a : '';
                        }
                    };
                    return [4, fetch("".concat(Environment.apiURL(), "api/v1/stripe/capabilities"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session: {
                                    id: PeachPayOrder.sessionId(),
                                    merchant_url: MerchantConfiguration.hostName(),
                                    stripe: {
                                        connect_id: getConnectId()
                                    }
                                }
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response || !response.ok) {
                        return [2, null];
                    }
                    return [4, response.json()];
                case 2:
                    json = _a.sent();
                    if (!json.success) {
                        return [2, null];
                    }
                    return [2, json.data];
                case 3:
                    error_6 = _a.sent();
                    if (error_6 instanceof Error) {
                        captureSentryException(error_6);
                    }
                    return [2, null];
                case 4: return [2];
            }
        });
    });
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
            description: 'After selecting pay, a window will appear where you can complete your payment.',
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
                merchantCountries: [
                    'ALL'
                ],
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
function initPayPalPaymentProvider(orderService) {
    var _this = this;
    if (!Feature.enabled(FeatureFlag.PAYPAL)) {
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
        var response, merchant, error_7;
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
                    error_7 = _a.sent();
                    if (error_7 instanceof Error) {
                        captureSentryException(error_7);
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
        onClick: function () {
            openPayPalSentrySpan();
            return checkRequiredFields();
        }
    });
    $paypalButton.render('#paypal-btn-container');
    $paypalButton.render('#paypal-btn-container-mobile');
    $paypalButton.render('#paypal-btn-container-existing');
}
function createPayPalOrder() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var toFixed, mockOrderResult, _b, validOrder, error, body, response, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
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
                    _b = validateOrder(mockOrderResult), validOrder = _b[0], error = _b[1];
                    if (!validOrder) {
                        captureSentryException(new Error("".concat(error)));
                        store.dispatch(stopModalLoading());
                        return [2, 0];
                    }
                    body = {
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
                    response = _c.sent();
                    return [4, response.json()];
                case 2:
                    result = _c.sent();
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
        var orderResponse, error_8, capture, transactionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, orderService.placeOrder()];
                case 1:
                    orderResponse = _a.sent();
                    if (orderResponse.result === 'failure') {
                        store.dispatch(stopModalLoading());
                        actions.restart();
                        return [2];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, updatePayPalOrderWithFinalAmount(data.orderID, orderResponse)];
                case 3:
                    _a.sent();
                    return [3, 5];
                case 4:
                    error_8 = _a.sent();
                    captureSentryException(new Error('Error while updating PayPal order with final amount'), {
                        exception: error_8
                    });
                    return [3, 5];
                case 5: return [4, capturePayPalOrder(data.orderID)];
                case 6:
                    capture = _a.sent();
                    if (!!capture) return [3, 8];
                    return [4, orderService.addOrderNote(orderResponse, 'PayPal payment attempt failed. Reason: An unknown error occured while capturing the payment.')];
                case 7:
                    _a.sent();
                    store.dispatch(setOrderError('Something went wrong'));
                    actions.restart();
                    return [2];
                case 8:
                    if (!((capture === null || capture === void 0 ? void 0 : capture.status) === 'COMPLETED')) return [3, 10];
                    transactionId = capture.purchase_units[0].payments.captures[0].id;
                    return [4, orderService.setOrderStatus(orderResponse, 'wc-processing', {
                            paypal: {
                                transaction_id: transactionId
                            },
                            paymentStatus: 'success',
                            orderStatus: 'success'
                        })];
                case 9:
                    _a.sent();
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: 'paypal',
                        method: 'default'
                    }));
                    saveCustomerToBrowser();
                    clearLocalSession();
                    if (window.top) {
                        window.top.location = orderService.getOrderRedirect(orderResponse);
                    }
                    return [2];
                case 10:
                    store.dispatch(stopModalLoading());
                    if (!((capture === null || capture === void 0 ? void 0 : capture.details[0].issue) === 'INSTRUMENT_DECLINED')) return [3, 12];
                    return [4, orderService.setOrderStatus(orderResponse, 'wc-failed', {
                            message: capture.details[0].description,
                            orderStatus: 'failed',
                            paymentStatus: 'failed'
                        })];
                case 11:
                    _a.sent();
                    store.dispatch(setOrderError(capture.details[0].description));
                    return [3, 14];
                case 12: return [4, orderService.setOrderStatus(orderResponse, 'wc-failed', {
                        message: 'Something went wrong',
                        orderStatus: 'failed',
                        paymentStatus: 'failed'
                    })];
                case 13:
                    _a.sent();
                    store.dispatch(setOrderError('Something went wrong'));
                    _a.label = 14;
                case 14:
                    actions.restart();
                    return [2];
            }
        });
    });
}
function capturePayPalOrder(orderID) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_9;
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
                    error_9 = _a.sent();
                    captureSentryException(new Error('Error while capturing PayPal order'), {
                        exception: error_9
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
function initRelatedProducts() {
    if (!Feature.enabled(FeatureFlag.RELATED_PRODUCTS)) {
        return;
    }
    relatedProductsDropdown();
    [
        '#pp-products-list-related',
        '.pp-products-list-related-mobile-existing',
    ].forEach(function (scrollElName) {
        var scrollEl = $qs(scrollElName);
        if (scrollEl) {
            scrollEl.addEventListener('scroll', function () {
                scrollAdjuster('-related');
                fadeAdjuster(scrollElName, scrollEl.scrollLeft === 0, scrollEl.offsetWidth + scrollEl.scrollLeft >= scrollEl.scrollWidth);
            });
        }
    });
    var previousCurrencyData = '';
    var previousCartData = '';
    store.subscribe(function () {
        var _a, _b;
        var relatedProductsTitle = Feature.metadata(FeatureFlag.RELATED_PRODUCTS, 'related_products_title') ? Feature.metadata(FeatureFlag.RELATED_PRODUCTS, 'related_products_title') : 'Related Products';
        var relatedProducts = Feature.dynamicMetadata(FeatureFlag.RELATED_PRODUCTS, 'related_products');
        var cartData = JSON.stringify(DefaultCart.contents());
        var currencyData = JSON.stringify(MerchantConfiguration.currency.configuration());
        if (Environment.plugin.pageType() === 'product' && relatedProducts && relatedProductsTitle) {
            if (cartData !== previousCartData || currencyData !== previousCurrencyData) {
                previousCartData = cartData;
                previousCurrencyData = currencyData;
                renderRelatedProducts(relatedProducts, relatedProductsTitle);
                updateRelatedProductButton(DefaultCart.contents());
            }
        }
        else {
            (_a = $qs('#pp-related-products-section')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
            (_b = $qs('#pp-related-products-section-mobile-existing')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
            $qsAll('.related-products-title').forEach(function ($el) {
                $el.classList.add('hide');
            });
        }
    });
}
function clearRelatedProducts() {
    for (var _i = 0, _a = $qsAll('.pp-related-product-body'); _i < _a.length; _i++) {
        var relatedProduct = _a[_i];
        relatedProduct.remove();
    }
}
function renderRelatedProducts(relatedProducts, title) {
    var _a, _b;
    clearRelatedProducts();
    (_a = $qs('#pp-related-products-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    (_b = $qs('#pp-related-products-section-mobile-existing')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    for (var _i = 0, _c = $qsAll('.related-products-title'); _i < _c.length; _i++) {
        var element = _c[_i];
        element.innerHTML = title;
        element.classList.remove('hide');
    }
    var relatedList = $qs('#pp-products-list-related-main');
    var relatedListMobile = $qs('.pp-products-list-related-mobile');
    var relatedListMobileExisting = $qs('.pp-products-list-related-mobile-existing');
    for (var _d = 0, relatedProducts_1 = relatedProducts; _d < relatedProducts_1.length; _d++) {
        var relatedItem = relatedProducts_1[_d];
        var isBundleOrVariable = relatedItem.bundle || relatedItem.variable;
        if (relatedItem.has_stock) {
            var rpBody = document.createElement('div');
            rpBody.className = "pp-related-product-body".concat(isBundleOrVariable && !relatedItem.sale ? ' pp-rp-body-small' : '');
            var rpURl = relatedItem.permalink;
            rpBody.innerHTML = "<a href=\"".concat(rpURl, "\" class=\"pp-rp-content\" target=\"_blank\">\n                                    <img class=\"pp-related-product-img\" src=").concat(relatedItem.img_src, ">\n\t\t\t\t\t\t\t\t\t<div class=\"flex col\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-title\">").concat(relatedItem.name, "</span>\n\t\t\t\t\t\t\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t\t\t\t\t\t\t<img src=\"img/sale.svg\" class=\"").concat(relatedItem.sale ? 'pp-rp-sale' : 'hide', "\"></img>\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"pp-rp-price").concat(relatedItem.sale && !isBundleOrVariable ? ' pp-rp-price-sale' : relatedItem.sale && isBundleOrVariable ? ' pp-rp-bv-sale' : '', "\">\n\t\t\t\t\t\t\t\t\t\t\t\t").concat(isBundleOrVariable ? relatedItem.price.replace(' &ndash; ', '<span> - </span>') : relatedItem.price, "\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n                                    \n                                </a>");
            rpBody.innerHTML += relatedItem.bundle || relatedItem.variable ? "<a href=\"".concat(rpURl, "\" target=\"_blank\" class=\"pp-rp-add-btn\" target=\"_blank\">Options</a>") : "<button data-rpid=".concat(relatedItem.id, " class=\"pp-rp-add-btn\">\n\t\t\t\t\t\t<span>+</span><span>").concat(getLocaleText('ADD'), "</span>\n\t\t\t\t\t</button>");
            relatedList === null || relatedList === void 0 ? void 0 : relatedList.prepend(rpBody);
            relatedListMobile === null || relatedListMobile === void 0 ? void 0 : relatedListMobile.prepend(rpBody.cloneNode(true));
            relatedListMobileExisting === null || relatedListMobileExisting === void 0 ? void 0 : relatedListMobileExisting.prepend(rpBody.cloneNode(true));
        }
    }
    for (var _e = 0, _f = $qsAll('.pp-rp-add-btn'); _e < _f.length; _e++) {
        var addBtn = _f[_e];
        addBtn.addEventListener('click', function (event) {
            store.dispatch(startModalLoading());
            addRelatedProducttoCart(event.target);
        });
    }
}
function addRelatedProducttoCart(relatedProduct) {
    window.parent.postMessage({
        event: 'addLinkedProduct',
        productID: relatedProduct.dataset.rpid
    }, '*');
}
function relatedProductsDropdown() {
    var _a;
    (_a = $qs('#pp-rp-dropdown-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if ((_a = $qs('.pp-rp-dropdown-down')) === null || _a === void 0 ? void 0 : _a.classList.contains('hide')) {
            (_b = $qs('.pp-rp-dropdown-up')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
            (_c = $qs('.pp-rp-dropdown-down')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
            (_d = $qs('#pp-related-products-container')) === null || _d === void 0 ? void 0 : _d.classList.remove('pp-rp-open');
            (_e = $qs('#pp-related-products-container')) === null || _e === void 0 ? void 0 : _e.classList.add('pp-rp-close');
        }
        else if ((_f = $qs('.pp-rp-dropdown-up')) === null || _f === void 0 ? void 0 : _f.classList.contains('hide')) {
            (_g = $qs('.pp-rp-dropdown-up')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
            (_h = $qs('.pp-rp-dropdown-down')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
            (_j = $qs('#pp-related-products-container')) === null || _j === void 0 ? void 0 : _j.classList.remove('pp-rp-close');
            (_k = $qs('#pp-related-products-container')) === null || _k === void 0 ? void 0 : _k.classList.add('pp-rp-open');
        }
    });
}
function updateRelatedProductButton(cart) {
    for (var _i = 0, _a = $qsAll('.pp-rp-add-btn'); _i < _a.length; _i++) {
        var relatedProduct = _a[_i];
        for (var i = cart.length - 1; i >= 0; i--) {
            var item = cart[i];
            if (relatedProduct.dataset.rpid && item.product_id === Number.parseInt(relatedProduct.dataset.rpid)) {
                relatedProduct.innerHTML = 'Added';
            }
        }
    }
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
function setupFreeOrderButton() {
    store.subscribe(function () {
        renderFreeOrderButtonDisplay(DefaultCart.contents().length, DefaultCart.total(), Environment.modalUI.loadingMode());
        renderFreeOrderButtonLoading(Environment.modalUI.loadingMode());
    });
}
function renderFreeOrderButtonDisplay(cartSize, cartTotal, loadingMode) {
    if (cartSize > 0 && cartTotal === 0) {
        $qsAll('.free-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.free-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (loadingMode !== 'loading' && cartTotal === 0) {
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
    var confirm = function (event) { return __awaiter(_this, void 0, void 0, function () {
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
    $qsAll('.free-btn', function ($el) { return $el.addEventListener('click', confirm); });
    setupFreeOrderButton();
}
function freeOrderFlow(orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var orderResponse, successURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    return [4, orderService.placeOrder()];
                case 1:
                    orderResponse = _a.sent();
                    if (orderResponse.result === 'failure') {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    if (window.top) {
                        window.top.location = successURL;
                    }
                    return [2];
            }
        });
    });
}
var shippingAutocomplete;
var billingAutocomplete;
function initAddressAutocomplete(message) {
    if (!message.addressAutocomplete) {
        return;
    }
    var shippingInput = $qs("#shipping_address_1");
    var billingInput = $qs("#billing_address_1");
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
        fillInAddress('shipping');
    });
    billingAutocomplete = new google.maps.places.Autocomplete(billingInput, billingOptions);
    billingAutocomplete.addListener('place_changed', function () {
        fillInAddress('billing');
    });
}
function fillInAddress(section) {
    var address1Field = $qs("#".concat(section, "_address_1"));
    var address2Field = $qs("#".concat(section, "_address_2"));
    var postalField = $qs("#".concat(section, "_postcode"));
    var cityField = $qs("#".concat(section, "_city"));
    var stateField = $qs("#".concat(section, "_state"));
    var provinceField = $qs("#".concat(section, "_province"));
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
    if (section === 'billing') {
        place = billingAutocomplete.getPlace();
    }
    if (section === 'shipping') {
        place = shippingAutocomplete.getPlace();
    }
    var country = place.address_components.find(function (component) { return component.types[0] === 'country'; });
    var countryField = document.querySelector("#".concat(section, "_country"));
    var formId = section === 'billing' ? '#pp-info-form' : '#pp-different-shipping-details';
    if (countryField) {
        countryField.value = country.short_name;
        syncCustomerFieldChanges(formId);
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
    syncCustomerFieldChanges(formId);
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
function setupPeachpayButton() {
    store.subscribe(function () {
        renderButtonDisplay(PaymentConfiguration.selectedProvider(), Environment.modalUI.page(), Environment.modalUI.loadingMode(), DefaultCart.total());
        renderButtonLoading(PaymentConfiguration.selectedProvider(), Environment.modalUI.loadingMode());
    });
}
function renderButtonDisplay(provider, page, loadingMode, cartTotal) {
    if (provider === 'peachpay' && (page === 'payment' || page === 'returning') && cartTotal > 0) {
        $qsAll('.pp-js-peachpay-order-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.pp-js-peachpay-order-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (provider === 'peachpay' && (page === 'payment' || page === 'returning') && cartTotal > 0 && loadingMode !== 'loading') {
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
function defaultOrderFlow(orderService, extraFormData) {
    if (extraFormData === void 0) { extraFormData = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var orderResponse, successURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(startModalProcessing());
                    return [4, orderService.placeOrder(extraFormData)];
                case 1:
                    orderResponse = _a.sent();
                    if (orderResponse.result === 'failure') {
                        store.dispatch(stopModalLoading());
                        return [2];
                    }
                    store.dispatch(updateCustomerPreferredPaymentMethod({
                        provider: PaymentConfiguration.selectedProvider(),
                        method: PaymentConfiguration.selectedProviderMethod(),
                        index: ''
                    }));
                    saveCustomerToBrowser();
                    successURL = orderService.getOrderRedirect(orderResponse);
                    if (window.top) {
                        window.top.location = successURL;
                    }
                    return [2];
            }
        });
    });
}
function initPurchaseOrderSupport(orderService) {
    if (!Feature.enabled(FeatureFlag.PURCHASE_ORDER)) {
        return;
    }
    injectPurchaseOrderFields();
    addButtonListener(getPurchaseOrderMethodConfiguration().slug, function (event) {
        var $form = null;
        var $input = null;
        if (Environment.customer.existing()) {
            $form = $qs('#pp-pms-existing form.pp-purchase-order-field');
            $input = $qs('#pp-pms-existing input[name="purchase-order"]');
        }
        else {
            $form = $qs('#pp-pms-new form.pp-purchase-order-field');
            $input = $qs('#pp-pms-new input[name="purchase-order"]');
        }
        if (!$input || !$form)
            return;
        var purcaseOrderNumber = $input.value;
        if (!purcaseOrderNumber || !$form.checkValidity()) {
            $form.reportValidity();
            return;
        }
        var $target = event.target;
        var $button = $target === null || $target === void 0 ? void 0 : $target.closest('button');
        if (!$button)
            return;
        defaultOrderFlow(orderService, {
            'purchase_order_number': purcaseOrderNumber
        });
    });
}
function getPurchaseOrderMethodConfiguration() {
    return {
        name: getFieldName(),
        gateway: 'peachpay_purchase_order',
        slug: 'purchase_order',
        description: "<span>".concat(getDescription(), "</span>"),
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
            currencies: [
                'ALL'
            ],
            productTypes: [],
            virtualProducts: true,
            shippingMethods: [],
            merchantCountries: [
                'ALL'
            ],
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initCODSupport(orderService) {
    if (!Feature.enabled(FeatureFlag.COD_PAYMENT)) {
        return;
    }
    addButtonListener(getCODMethodConfiguration().slug, function () { return defaultOrderFlow(orderService); });
}
function getCODMethodConfiguration() {
    return {
        name: getTitle(),
        slug: 'cod',
        gateway: 'cod',
        description: getDescription1(),
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
            merchantCountries: [
                'ALL'
            ],
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initChequeSupport(orderService) {
    if (!Feature.enabled(FeatureFlag.CHEQUE_PAYMENT)) {
        return;
    }
    addButtonListener(getChequeMethodConfiguration().slug, function () { return defaultOrderFlow(orderService); });
}
function getChequeMethodConfiguration() {
    return {
        name: getTitle1(),
        slug: 'cheque',
        gateway: 'cheque',
        description: getDescription2(),
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
            merchantCountries: [
                'ALL'
            ],
            customerCountries: [
                'ALL'
            ]
        }
    };
}
function initBacsSupport(orderService) {
    if (!Feature.enabled(FeatureFlag.BACS_PAYMENT)) {
        return;
    }
    addButtonListener(getBacsMethodConfiguration().slug, function () { return defaultOrderFlow(orderService); });
}
function getBacsMethodConfiguration() {
    return {
        name: getTitle2(),
        slug: 'bacs',
        gateway: 'bacs',
        description: getDescription3(),
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
            merchantCountries: [
                'ALL'
            ],
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
        if (Environment.modalUI.page() === 'returning' && !checkRequiredFields())
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
    return (_a = Feature.metadata(FeatureFlag.PURCHASE_ORDER, 'field_name')) !== null && _a !== void 0 ? _a : getLocaleText('Purchase Order');
}
function getDescription() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.PURCHASE_ORDER, 'description')) !== null && _a !== void 0 ? _a : '';
}
function getTitle() {
    var _a;
    return (_a = Feature.metadata(FeatureFlag.COD_PAYMENT, 'title')) !== null && _a !== void 0 ? _a : getLocaleText('Cheque');
}
function getDescription1() {
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
function getDescription2() {
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
function getDescription3() {
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
(function () {
    var _this = this;
    onWindowMessage('init', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var orderService;
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
                    initLinkedProducts();
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
                    orderService = getOrderService();
                    initFreeOrderSupport(orderService);
                    initPeachPayMethods(orderService);
                    return [4, initStripePaymentProvider(message, orderService)];
                case 1:
                    _a.sent();
                    return [4, initPayPalPaymentProvider(orderService)];
                case 2:
                    _a.sent();
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
