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
var DispatchActionType;
(function (DispatchActionType1) {
    DispatchActionType1["INIT"] = 'init';
    DispatchActionType1["ENVIRONMENT"] = 'environment';
    DispatchActionType1["ORDER_SESSIONID"] = 'peachpayOrder/sessionId';
    DispatchActionType1["ORDER_ADDRESS_VALIDATED"] = 'peachpayOrder/addressValidated';
    DispatchActionType1["ORDER_SET_EXTRA_FIELDS"] = 'peachpayOrder/extraFields/set';
    DispatchActionType1["ORDER_SET_ERROR_MESSAGE"] = 'peachpayOrder/errorMessage/set';
    DispatchActionType1["PEACHPAY_CUSTOMER"] = 'peachpay/customer';
    DispatchActionType1["PEACHPAY_CUSTOMER_STRIPE_ID"] = 'peachpay/customer/stripeId';
    DispatchActionType1["PEACHPAY_CUSTOMER_PAYMENT_METHOD"] = 'peachpay/customer/payment_method';
    DispatchActionType1["MERCHANT_CUSTOMER"] = 'merchant/customer';
    DispatchActionType1["MERCHANT_CUSTOMER_EXIST"] = 'merchant/customer/exist';
    DispatchActionType1["ENVIRONMENT_LANGUAGE"] = 'modal/language';
    DispatchActionType1["MERCHANT_NAME"] = 'merchant/name';
    DispatchActionType1["MERCHANT_HOSTNAME"] = 'merchant/hostname';
    DispatchActionType1["MERCHANT_GENERAL"] = 'merchant/general';
    DispatchActionType1["MERCHANT_GENERAL_CURRENCY"] = 'merchant/general/currency';
    DispatchActionType1["MERCHANT_ACCOUNT"] = 'merchant/accounts';
    DispatchActionType1["MERCHANT_TAX"] = 'merchant/tax';
    DispatchActionType1["MERCHANT_SHIPPING"] = 'merchant/shipping';
    DispatchActionType1["DEFAULT_CART_CONTENTS"] = 'default/cart/contents';
    DispatchActionType1["DEFAULT_CART_CALCULATION"] = 'default/cart/calculation';
    DispatchActionType1["CART_CALCULATION"] = 'cart/calculation';
    DispatchActionType1["CART_SHIPPING_SELECTION"] = 'cart/shipping/selection';
    DispatchActionType1["ENVIRONMENT_SET_FEATURES"] = 'ENVIRONMENT_SET_FEATURES';
    DispatchActionType1["PEACHPAY_CUSTOMER_SHIPPING"] = 'PEACHPAY_CUSTOMER_SHIPPING';
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
            mobile: false
        },
        modalUI: {
            open: false,
            page: 'info',
            loadingMode: 'finished'
        }
    },
    peachPayOrder: {
        sessionId: '',
        customerAddressValidated: false,
        additionalFields: {},
        errorMessage: ''
    },
    peachPayCustomer: {
        email: '',
        name_first: '',
        name_last: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postal: '',
        phone: ''
    },
    merchantCustomer: {
        username: '',
        loggedIn: false,
        usernameIsRegistered: false
    },
    merchantConfiguration: {
        name: '',
        hostName: '',
        general: {
            currency: {
                code: 'USD',
                symbol: '$',
                position: 'left',
                thousands_separator: ',',
                decimal_separator: '.',
                rounding: 'disabled',
                number_of_decimals: 2
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
            allowAccountCreationOrLoginDuringCheckout: true,
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
    }
};
function createDispatchUpdate(type) {
    return function (payload) { return ({
        type: type,
        payload: payload
    }); };
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
function peachPayOrderReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.ORDER_SESSIONID:
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
        case DispatchActionType.MERCHANT_CUSTOMER_EXIST:
            return __assign(__assign({}, state), { usernameIsRegistered: action.payload });
        default:
            return __assign({}, state);
    }
}
function peachPayCustomerReducer(state, action) {
    switch (action.type) {
        case DispatchActionType.PEACHPAY_CUSTOMER:
            return __assign({}, action.payload);
        case DispatchActionType.PEACHPAY_CUSTOMER_STRIPE_ID:
            return __assign(__assign({}, state), { stripe_customer_id: action.payload });
        case DispatchActionType.PEACHPAY_CUSTOMER_PAYMENT_METHOD:
            return __assign(__assign({}, state), { payment_option: action.payload });
        case DispatchActionType.PEACHPAY_CUSTOMER_SHIPPING:
            return __assign(__assign(__assign({}, state), action.payload), { postal: action.payload.postcode });
        default:
            return __assign({}, state);
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
function rootReducer(state, action) {
    if (state === void 0) { state = initialState; }
    return __assign(__assign({}, state), { peachPayOrder: peachPayOrderReducer(state.peachPayOrder, action), environment: environmentReducer(state.environment, action), merchantCustomer: merchantCustomerReducer(state.merchantCustomer, action), peachPayCustomer: peachPayCustomerReducer(state.peachPayCustomer, action), merchantConfiguration: merchantConfigurationReducer(state.merchantConfiguration, action), calculatedCarts: cartReducer(state.calculatedCarts, action) });
}
var store = createStore(rootReducer);
function updateEnvironment(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return {
        type: DispatchActionType.ENVIRONMENT,
        payload: {
            language: (_a = options.language) !== null && _a !== void 0 ? _a : Environment.language(),
            customer: {
                existing: (_b = options.customerExists) !== null && _b !== void 0 ? _b : Environment.customer.existing(),
                mobile: (_c = options.customerIsMobile) !== null && _c !== void 0 ? _c : Environment.customer.mobile()
            },
            plugin: {
                version: (_d = options.pluginVersion) !== null && _d !== void 0 ? _d : Environment.plugin.version(),
                mode: typeof options.pluginIsTestMode === 'boolean' ? options.pluginIsTestMode ? 'test' : 'live' : Environment.plugin.mode(),
                buttonColor: (_e = options.pluginButtonColor) !== null && _e !== void 0 ? _e : Environment.plugin.buttonColor(),
                pageType: (_f = options.pluginPageType) !== null && _f !== void 0 ? _f : Environment.plugin.pageType(),
                featureSupport: store.getState().environment.plugin.featureSupport
            },
            modalUI: {
                open: (_g = options.modalIsOpen) !== null && _g !== void 0 ? _g : Environment.modalUI.open(),
                page: (_h = options.modalPageType) !== null && _h !== void 0 ? _h : Environment.modalUI.page(),
                loadingMode: (_j = options.modalLoading) !== null && _j !== void 0 ? _j : Environment.modalUI.loadingMode()
            }
        }
    };
}
function setFeatureSupport(features, phpData) {
    if (features === void 0) { features = {}; }
    if (!features[FeatureFlag.COUPON_INPUT]) {
        features[FeatureFlag.COUPON_INPUT] = {
            enabled: Boolean(phpData.enable_coupons),
            version: 0
        };
    }
    if (!features[FeatureFlag.ORDER_NOTES]) {
        features[FeatureFlag.ORDER_NOTES] = {
            enabled: Boolean(phpData.enable_order_notes),
            version: 0
        };
    }
    if (!features[FeatureFlag.GIFTCARD_INPUT]) {
        features[FeatureFlag.GIFTCARD_INPUT] = {
            enabled: Boolean(phpData.plugin_pw_woocommerce_gift_cards_active),
            version: 0
        };
    }
    if (!features[FeatureFlag.STRIPE]) {
        features[FeatureFlag.STRIPE] = {
            enabled: true,
            version: 0
        };
    }
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
    customer: {
        existing: function () { return store.getState().environment.customer.existing; },
        mobile: function () { return store.getState().environment.customer.mobile; }
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
        loadingMode: function () { return store.getState().environment.modalUI.loadingMode; }
    }
};
function getLocaleText(key) {
    if (!peachpayi18n[key]) {
        return peachpayi18n.unknown[Environment.language()];
    }
    return peachpayi18n[key][Environment.language()];
}
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
        loginDuringCheckoutEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.allowAccountCreationOrLoginDuringCheckout; },
        allowGuestCheckout: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.allowGuestCheckout; },
        generatePasswordEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.autoGeneratePassword; },
        generateUsernameEnabled: function () { return store.getState().merchantConfiguration.accountsAndPrivacy.autoGenerateUsername; }
    }
};
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
    var store1 = {
        dispatch: dispatch,
        getState: getState,
        subscribe: subscribe
    };
    return store1;
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
        totalAppliedFees: function () {
            var _a, _b;
            return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.fees_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
                var _ = _a[0], value = _a[1];
                return previousValue + (value !== null && value !== void 0 ? value : 0);
            }, 0);
        },
        couponTotal: function (coupon) { var _a, _b; return (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record[coupon]) !== null && _b !== void 0 ? _b : 0; },
        totalAppliedCoupons: function () {
            var _a, _b;
            return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
                var _ = _a[0], value = _a[1];
                return previousValue + (value !== null && value !== void 0 ? value : 0);
            }, 0);
        },
        couponRecord: function () { var _a; return (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.coupons_record; },
        giftCardTotal: function (giftCard) { var _a, _b, _c; return (_c = (_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) === null || _b === void 0 ? void 0 : _b[giftCard]) !== null && _c !== void 0 ? _c : 0; },
        totalAppliedGiftCards: function () {
            var _a, _b;
            return Object.entries((_b = (_a = store.getState().calculatedCarts[cartKey]) === null || _a === void 0 ? void 0 : _a.summary.gift_card_record) !== null && _b !== void 0 ? _b : {}).reduce(function (previousValue, _a) {
                var _ = _a[0], value = _a[1];
                return previousValue + (value !== null && value !== void 0 ? value : 0);
            }, 0);
        },
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
            key: getLocaleText('subtotal'),
            value: calculatedCart.summary.subtotal
        });
        for (var _i = 0, _a = Object.entries(calculatedCart.summary.coupons_record); _i < _a.length; _i++) {
            var _b = _a[_i], coupon = _b[0], amount = _b[1];
            if (!amount) {
                continue;
            }
            cartSummary.push({
                key: "".concat(getLocaleText('coupon'), " - (").concat(coupon, ")"),
                value: -amount
            });
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
                key: getLocaleText('shipping'),
                value: calculatedCart.summary.total_shipping
            });
        }
        if (MerchantConfiguration.tax.displayMode() === 'excludeTax') {
            cartSummary.push({
                key: getLocaleText('tax'),
                value: calculatedCart.summary.total_tax
            });
        }
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
        cartSummary.push({
            key: getLocaleText('total'),
            value: calculatedCart.summary.total
        });
        return {
            cartSummary: cartSummary,
            cartMeta: cartMeta
        };
    };
}
var peachpayi18n = {
    add: {
        'de-DE': '+ Hinzufügen',
        'en-US': '+ Add',
        'es-ES': '+ Agregar',
        fr: '+ Ajouter',
        it: '+ Aggiungere',
        ja: '+ 追加',
        'ro-RO': '+ Adăuga',
        ar: 'يضيف +',
        ca: '+ Afegeix',
        'cs-CZ': '+ Přidat',
        'da-DK': '+ Tilføje',
        el: '+ Προσθήκη',
        'hi-IN': '+ जोड़ें',
        'ko-KR': '+ 추가하다',
        'lb-LU': '+ Addéieren',
        'nl-NL': '+ Toevoegen',
        'pt-PT': '+ Adicionar',
        'ru-RU': '+ Добавлять',
        'sl-SI': '+ Dodaj',
        'sv-SE': '+ Lägg till',
        th: '+ เพิ่ม',
        uk: '+ Додати',
        'zh-CN': '+ 添加',
        'zh-TW': '+ 添加'
    },
    'Cart is empty': {
        'en-US': 'Cart is empty',
        'de-DE': 'Kurven er tom',
        'es-ES': 'El carrito esta vacío',
        fr: 'Le panier est vide',
        it: 'Il carrello è vuoto',
        ja: 'カートが空です',
        'ro-RO': 'Coșul este gol',
        ar: 'البطاقه خاليه',
        ca: 'El carretó està buit',
        'cs-CZ': 'Košík je prázdný',
        'da-DK': 'Košarica je prazna',
        el: 'Το καλάθι είναι άδειο',
        'hi-IN': 'कार्ट खाली है',
        'ko-KR': '장바구니가 비어 있습니다.',
        'lb-LU': 'Weenchen ass eidel',
        'nl-NL': 'Winkelwagen is leeg',
        'pt-PT': 'carrinho esta vazio',
        'ru-RU': 'Корзина пуста',
        'sl-SI': 'Košarica je prazna',
        'sv-SE': 'Varukorgen är tom',
        th: 'รถเข็นว่างเปล่า',
        uk: 'Кошик порожній',
        'zh-CN': '购物车是空的',
        'zh-TW': '购物车是空的'
    },
    'You might also like...': {
        'de-DE': 'Das könnte dir auch gefallen...',
        'en-US': 'You might also like...',
        'es-ES': 'También podría gustarte...',
        fr: 'vous pourriez aussi aimer...',
        it: 'Potrebbe piacerti anche...',
        ja: 'あなたはおそらくそれも好きでしょう...',
        'ro-RO': 'S-ar putea sa-ti placa si...',
        ar: 'قد يعجبك ايضا',
        ca: 'potser també t\'agrada...',
        'cs-CZ': 'mohlo by se vám líbit...',
        'da-DK': 'Du kan også lide...',
        el: 'Μπορεί επίσης να σας αρέσει...',
        'hi-IN': 'शायद तुम्हे यह भी अच्छा लगे...',
        'ko-KR': '당신은 또한 좋아할 수도 있습니다...',
        'lb-LU': 'Dir kënnt och gären...',
        'nl-NL': 'Misschien vind je dit ook leuk...',
        'pt-PT': 'você pode gostar também...',
        'ru-RU': 'Вам также может понравиться...',
        'sl-SI': 'Morda vam bo všeč tudi...',
        'sv-SE': 'Du kanske också gillar...',
        th: 'คุณอาจชอบ...',
        uk: 'Вам також може сподобатися...',
        'zh-CN': '你可能还喜欢...',
        'zh-TW': '你可能還喜歡...'
    },
    verified: {
        'de-DE': 'Verifiziert',
        'en-US': 'Verified',
        'es-ES': 'Verificado',
        fr: 'Vérifié',
        it: 'verificato',
        ja: '確認済み',
        'ro-RO': 'Verificat',
        ar: 'تم التحقق',
        ca: 'Verificat',
        'cs-CZ': 'Ověřeno',
        'da-DK': 'Verificeret',
        el: 'Επαληθευμένο',
        'hi-IN': 'सत्यापित',
        'ko-KR': '확인됨',
        'lb-LU': 'Verifizéiert',
        'nl-NL': 'Geverifieerd',
        'pt-PT': 'Verificada',
        'ru-RU': 'Проверено',
        'sl-SI': 'Preverjeno',
        'sv-SE': 'Verifierad',
        th: 'ตรวจสอบแล้ว',
        uk: 'Перевірено',
        'zh-CN': '已验证',
        'zh-TW': '已驗證'
    },
    '+ ADD A COUPON CODE': {
        'de-DE': '+ EINEN GUTSCHEIN CODE HINZUFÜGEN',
        'en-US': '+ ADD A COUPON CODE',
        'es-ES': '+ AÑADIR UN CÓDIGO DE CUPÓN',
        fr: '+ AJOUTER UN CODE COUPON',
        it: '+ AGGIUNGI UN CODICE COUPON',
        ja: '+ クーポンコードを追加',
        'ro-RO': '+ ADĂUGAȚI UN COD DE CUPON',
        ar: 'أضف رمز القسيمة',
        ca: 'Afegiu un codi de cupó',
        'cs-CZ': 'Přidejte kód kupónu',
        'da-DK': 'Tilføj en kuponkode',
        el: 'Προσθέστε έναν κωδικό κουπονιού',
        'hi-IN': 'कूपन कोड जोड़ें',
        'ko-KR': '쿠폰 코드 추가',
        'lb-LU': 'Füügt e Coupon Code derbäi',
        'nl-NL': 'Voeg een couponcode toe',
        'pt-PT': 'Adicionar um código de cupom',
        'ru-RU': 'Добавьте код купона',
        'sl-SI': 'Dodajte kodo kupona',
        'sv-SE': 'Lägg till en kupongkod',
        th: 'เพิ่มรหัสคูปอง',
        uk: 'Додайте код купона',
        'zh-CN': '添加优惠券代码',
        'zh-TW': '添加優惠券代碼'
    },
    'error-occurred': {
        'de-DE': 'Entschuldigung, etwas ist schief gelaufen. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.',
        'en-US': 'Sorry, something went wrong. Please refresh the page and try again.',
        'es-ES': 'Perdón, algo salió mal. Actualice la página y vuelva a intentarlo.',
        fr: 'Désolé, quelque chose s\'est mal passé. Veuillez actualiser la page et réessayer.',
        it: 'Scusa, qualcosa è andato storto. Perfavore ricarica la pagina e riprova.',
        'ro-RO': 'Scuze, ceva a mers greșit. Actualizați pagina și încercați din nou.',
        ar: 'عذرا، هناك خطأ ما. يرجى تحديث الصفحة وحاول مرة أخرى.',
        ca: 'Ho sentim, alguna cosa ha anat malament. Actualitzeu la pàgina i torneu-ho a provar.',
        'cs-CZ': 'Promiň, něco se pokazilo. Obnovte stránku a zkuste to znovu.',
        'da-DK': 'Undskyld, noget gik galt. Opdater siden, og prøv igen.',
        el: 'Συγνώμη, κάτι πήγε στραβά. Ανανεώστε τη σελίδα και δοκιμάστε ξανά.',
        'hi-IN': 'क्षमा करें, कुछ गलत हो गया। पृष्ठ को रीफ्रेश करें और पुन: प्रयास करें।',
        'ko-KR': '죄송합니다. 문제가 발생했습니다. 페이지를 새로고침하고 다시 시도하십시오.',
        'lb-LU': 'Entschëllegt, eppes ass falsch gaang. Erfrëscht w.e.g. d\'Säit a probéiert nach eng Kéier.',
        'nl-NL': 'Sorry, er ging iets mis. Ververs de pagina en probeer het opnieuw.',
        'pt-PT': 'Desculpe, algo deu errado. Atualize a página e tente novamente.',
        'ru-RU': 'Извините, что-то пошло не так. Обновите страницу и попробуйте еще раз.',
        'sl-SI': 'Oprostite, nekaj je šlo narobe. Osvežite stran in poskusite znova.',
        'sv-SE': 'Förlåt, något gick fel. Uppdatera sidan och försök igen.',
        th: 'ขอโทษมีบางอย่างผิดพลาด. โปรดรีเฟรชหน้าแล้วลองอีกครั้ง',
        uk: 'Вибачте, щось пішло не так. Оновіть сторінку та повторіть спробу.',
        'zh-CN': '抱歉，出了一些问题。 请刷新页面并重试。',
        'zh-TW': '抱歉，出了一些問題。 請刷新頁面並重試。'
    },
    '+ REDEEM GIFT CARD/STORE CREDIT': {
        'de-DE': '+ GESCHENKKARTE/GESCHENK-KREDIT EINLÖSEN',
        'en-US': '+ REDEEM GIFT CARD/STORE CREDIT',
        'es-ES': '+ CANJEAR TARJETA DE REGALO/CRÉDITO DE TIENDA',
        fr: '+ ÉCHANGER LA CARTE-CADEAU/LE CRÉDIT DU MAGASIN',
        it: '+ UTILIZZA CARTA REGALO/CREDITO NEGOZIO',
        ja: '+ ギフトカード/ストアクレジットを利用する',
        'ro-RO': '+ RĂscumpărați cardul/cadoul de credit cadou',
        ar: 'استرداد بطاقة الهدايا / رصيد المتجر',
        ca: 'Bescanvia el crèdit de la targeta regal o de la botiga',
        'cs-CZ': 'Uplatněte dárkovou kartu/kredit obchodu',
        'da-DK': 'Indløs gavekort/butikskredit',
        el: 'Εξαργυρώστε πιστωτική κάρτα δώρου/κατάστημα',
        'hi-IN': 'उपहार कार्ड/स्टोर क्रेडिट रिडीम करें',
        'ko-KR': '기프트 카드/스토어 크레딧 사용',
        'lb-LU': 'Erléis Kaddokaart/Geschäftskreditt',
        'nl-NL': 'Cadeaukaart/winkeltegoed inwisselen',
        'pt-PT': 'Resgatar cartão-presente / crédito da loja',
        'ru-RU': 'Погасить подарочную карту / кредит магазина',
        'sl-SI': 'Unovčite darilno kartico/dobroimetje v trgovini',
        'sv-SE': 'Lös in presentkort/butikskredit',
        th: 'แลกบัตรของขวัญ/เครดิตร้านค้า',
        uk: 'Активуйте подарункову картку/кредит у магазині',
        'zh-CN': '兑换礼品卡/商店信用',
        'zh-TW': '兌換禮品卡/商店信用'
    },
    'Send to': {
        'de-DE': 'Senden an',
        'en-US': 'Send to',
        'es-ES': 'Enviar a',
        fr: 'Envoyer à',
        it: 'Inviare a',
        ja: '送信先',
        'ro-RO': 'Trimite catre',
        ar: 'ارسل إلى',
        ca: 'Envia a',
        'cs-CZ': 'Poslat komu',
        'da-DK': 'Send til',
        el: 'Στέλνω σε',
        'hi-IN': 'भेजना',
        'ko-KR': '보내기',
        'lb-LU': 'Schécken',
        'nl-NL': 'Verzenden naar',
        'pt-PT': 'Enviar para',
        'ru-RU': 'Отправить',
        'sl-SI': 'Pošlji',
        'sv-SE': 'Skicka till',
        th: 'ส่งถึง',
        uk: 'Відправити',
        'zh-CN': '发给',
        'zh-TW': '發給'
    },
    'My order': {
        'de-DE': 'Meine Bestellung',
        'en-US': 'My order',
        'es-ES': 'Mi pedido',
        fr: 'Ma commande',
        it: 'Il mio ordine',
        ja: '注文',
        'ro-RO': 'Comanda mea',
        ar: 'طلبي',
        ca: 'El meu ordre',
        'cs-CZ': 'Moje objednávka',
        'da-DK': 'Min bestilling',
        el: 'Η παραγγελία μου',
        'hi-IN': 'मेरे आदेश',
        'ko-KR': '내 주문',
        'lb-LU': 'Meng Bestellung',
        'nl-NL': 'Mijn bestelling',
        'pt-PT': 'Meu pedido',
        'ru-RU': 'Мой заказ',
        'sl-SI': 'Moj ukaz',
        'sv-SE': 'Min order',
        th: 'คำสั่งของฉัน',
        uk: 'Моє замовлення',
        'zh-CN': '我的订单',
        'zh-TW': '我的訂單'
    },
    'Ready to check out?': {
        'de-DE': 'Bereit zum Auschecken?',
        'en-US': 'Ready to check out?',
        'es-ES': '¿Listo para salir?',
        fr: 'Prêt à vérifier ?',
        it: 'Pronto per il check-out?',
        ja: '支払いをする準備はできましたか?',
        'ro-RO': 'Sunteți gata să vizitați?',
        ar: 'هل أنت جاهز للتسجيل؟',
        ca: 'A punt per fer el check-out?',
        'cs-CZ': 'Jste připraveni se podívat?',
        'da-DK': 'Klar til at tjekke ud?',
        el: 'Είστε έτοιμοι για check out;',
        'hi-IN': 'चेक आउट करने के लिए तैयार हैं?',
        'ko-KR': '체크아웃할 준비가 되셨나요?',
        'lb-LU': 'Prett fir ze checken?',
        'nl-NL': 'Klaar om uit te checken?',
        'pt-PT': 'Pronto para finalizar a compra?',
        'ru-RU': 'Готовы проверить?',
        'sl-SI': 'Ste pripravljeni na odjavo?',
        'sv-SE': 'Klar att checka ut?',
        th: 'พร้อมที่จะเช็คเอาท์?',
        uk: 'Готові перевірити?',
        'zh-CN': '准备退房了吗？',
        'zh-TW': '準備退房了嗎？'
    },
    info: {
        'de-DE': 'Information',
        'en-US': 'Info',
        'es-ES': 'Información',
        fr: 'Information',
        it: 'Informazioni',
        ja: '情報',
        'ro-RO': 'Informație',
        ar: 'معلومة',
        ca: 'Informació',
        'cs-CZ': 'Informace',
        'da-DK': 'Information',
        el: 'Πληροφορίες',
        'hi-IN': 'जानकारी',
        'ko-KR': '정보',
        'lb-LU': 'Informatiounen',
        'nl-NL': 'Informatie',
        'pt-PT': 'Em formação',
        'ru-RU': 'Информация',
        'sl-SI': 'Informacije',
        'sv-SE': 'Information',
        th: 'ข้อมูล',
        uk: 'Інформація',
        'zh-CN': '信息',
        'zh-TW': '信息'
    },
    payment: {
        'de-DE': 'Zahlung',
        'en-US': 'Payment',
        'es-ES': 'Pago',
        fr: 'Paiement',
        it: 'Pagamento',
        ja: '支払い',
        'ro-RO': 'Plată',
        ar: 'قسط',
        ca: 'Pagament',
        'cs-CZ': 'Způsob platby',
        'da-DK': 'Betaling',
        el: 'Πληρωμή',
        'hi-IN': 'भुगतान',
        'ko-KR': '지불',
        'lb-LU': 'Bezuelen',
        'nl-NL': 'Betaling',
        'pt-PT': 'Pagamento',
        'ru-RU': 'Оплата',
        'sl-SI': 'Plačilo',
        'sv-SE': 'Betalning',
        th: 'การชำระเงิน',
        uk: 'Оплата',
        'zh-CN': '支付',
        'zh-TW': '支付'
    },
    personal: {
        'de-DE': 'Persönlich',
        'en-US': 'Personal',
        'es-ES': 'Personal',
        fr: 'Coordonnées',
        it: 'Personale',
        ja: '個人',
        'ro-RO': 'Personal',
        ar: 'شخصي',
        ca: 'Personal',
        'cs-CZ': 'Osobní',
        'da-DK': 'Personlig',
        el: 'Προσωπικός',
        'hi-IN': 'निजी',
        'ko-KR': '개인의',
        'lb-LU': 'Perséinlech',
        'nl-NL': 'persoonlijk',
        'pt-PT': 'Pessoal',
        'ru-RU': 'Личное',
        'sl-SI': 'Osebno',
        'sv-SE': 'Personlig',
        th: 'ส่วนตัว',
        uk: 'Особисті',
        'zh-CN': '个人的',
        'zh-TW': '個人的'
    },
    shipping: {
        'de-DE': 'Versand',
        'en-US': 'Shipping',
        'es-ES': 'Envio',
        fr: 'Livraison',
        it: 'Spedizione',
        ja: '発送',
        'ro-RO': 'Livrare',
        ar: 'شحن',
        ca: 'Enviament',
        'cs-CZ': 'Lodní doprava',
        'da-DK': 'Forsendelse',
        el: 'Αποστολή',
        'hi-IN': 'शिपिंग',
        'ko-KR': '배송',
        'lb-LU': 'Liwwerung',
        'nl-NL': 'Verzending',
        'pt-PT': 'Envio',
        'ru-RU': 'Перевозки',
        'sl-SI': 'Dostava',
        'sv-SE': 'Frakt',
        th: 'การส่งสินค้า',
        uk: 'Доставка',
        'zh-CN': '船运',
        'zh-TW': '船運'
    },
    billing: {
        'de-DE': 'Rechnungsadresse',
        'en-US': 'Billing',
        'es-ES': 'Dirección de facturación',
        fr: 'Adresse de facturation',
        it: 'Indirizzo di fatturazione',
        ja: '請求',
        'ro-RO': 'Facturare',
        ar: 'الفواتير',
        ca: 'Facturació',
        'cs-CZ': 'Fakturace',
        'da-DK': 'Fakturering',
        el: 'Χρέωση',
        'hi-IN': 'बिलिंग',
        'ko-KR': '청구',
        'lb-LU': 'Rechnung',
        'nl-NL': 'Facturering',
        'pt-PT': 'Cobrança',
        'ru-RU': 'Биллинг',
        'sl-SI': 'Obračunavanje',
        'sv-SE': 'Fakturering',
        th: 'การเรียกเก็บเงิน',
        uk: 'Виставлення рахунків',
        'zh-CN': '计费',
        'zh-TW': '計費'
    },
    continue: {
        'de-DE': 'Weiter',
        'en-US': 'Continue',
        'es-ES': 'Continuar',
        fr: 'Continuez',
        it: 'Continua',
        ja: '続きへ',
        'ro-RO': 'Continua',
        ar: 'يكمل',
        ca: 'Continua',
        'cs-CZ': 'Pokračovat',
        'da-DK': 'Blive ved',
        el: 'Να συνεχίσει',
        'hi-IN': 'जारी रखना',
        'ko-KR': '계속하다',
        'lb-LU': 'Fuert weider',
        'nl-NL': 'Doorgaan met',
        'pt-PT': 'Prosseguir',
        'ru-RU': 'Продолжать',
        'sl-SI': 'Nadaljuj',
        'sv-SE': 'Fortsätta',
        th: 'ดำเนินการต่อ',
        uk: 'Продовжити',
        'zh-CN': '继续',
        'zh-TW': '繼續'
    },
    'Secured by': {
        'de-DE': 'Gesichert durch ',
        'en-US': 'Secured by',
        'es-ES': 'Protegido por',
        fr: 'Sécurisé par',
        it: 'Protetto da',
        ja: '保護されています',
        'ro-RO': 'Garantat de',
        ar: 'بضمان',
        ca: 'Garantit per',
        'cs-CZ': 'Zajištěno',
        'da-DK': 'Sikret af',
        el: 'Εξασφαλίζεται από',
        'hi-IN': 'इसके जरिए सुरक्षित',
        'ko-KR': '보안',
        'lb-LU': 'Geséchert vun',
        'nl-NL': 'Beveiligd door',
        'pt-PT': 'Assegurado por',
        'ru-RU': 'Обеспечено',
        'sl-SI': 'Zavarovano s',
        'sv-SE': 'Säkrad av',
        th: 'ปลอดภัยโดย',
        uk: 'Забезпечується',
        'zh-CN': '担保人',
        'zh-TW': '擔保人'
    },
    exit: {
        'de-DE': 'Kasse verlassen',
        'en-US': 'Exit Checkout',
        'es-ES': 'Salir de la caja',
        fr: 'Quitter',
        it: 'Esci dal checkout',
        ja: '支払いを終了',
        'ro-RO': 'Înapoi la pagina produsului',
        ar: 'الخروج من الخروج',
        ca: 'Surt de Google Checkout',
        'cs-CZ': 'Ukončit pokladnu',
        'da-DK': 'Afslut Checkout',
        el: 'Έξοδος από το ταμείο',
        'hi-IN': 'चेकआउट से बाहर निकलें',
        'ko-KR': '체크아웃 종료',
        'lb-LU': 'Exit Checkout',
        'nl-NL': 'Afrekenen afsluiten',
        'pt-PT': 'Sair do checkout',
        'ru-RU': 'Выйти из кассы',
        'sl-SI': 'Zaprite Checkout',
        'sv-SE': 'Avsluta kassan',
        th: 'ออกจากการชำระเงิน',
        uk: 'Вийти з Checkout',
        'zh-CN': '退出结帐',
        'zh-TW': '退出結帳'
    },
    'Order summary': {
        'de-DE': 'Bestellzusammenfassung',
        'en-US': 'Order summary',
        'es-ES': 'Resumen del pedido',
        fr: 'Récapitulatif de la commande',
        it: 'Riepilogo dell\'ordine',
        ja: '注文の概要',
        'ro-RO': 'Rezumat Comandă',
        ar: 'ملخص الطلب',
        ca: 'Resum de la comanda',
        'cs-CZ': 'Přehled objednávky',
        'da-DK': 'Ordresammendrag',
        el: 'Περίληψη παραγγελίας',
        'hi-IN': 'आदेश सारांश',
        'ko-KR': '주문 요약',
        'lb-LU': 'Uerdnung Resumé',
        'nl-NL': 'Overzicht van de bestelling',
        'pt-PT': 'Resumo do pedido',
        'ru-RU': 'Итог заказа',
        'sl-SI': 'Povzetek naročila',
        'sv-SE': 'Ordersammanfattning',
        th: 'สรุปคำสั่งซื้อ',
        uk: 'Підсумок Замовлення',
        'zh-CN': '订单摘要',
        'zh-TW': '訂單摘要'
    },
    subtotal: {
        'de-DE': 'Zwischensumme',
        'en-US': 'Subtotal',
        'es-ES': 'Subtotal',
        fr: 'Sous-total',
        it: 'Totale parziale',
        ja: '小計',
        'ro-RO': 'Subtotal',
        ar: 'المجموع الفرعي',
        ca: 'Subtotal',
        'cs-CZ': 'Mezisoučet',
        'da-DK': 'Subtotal',
        el: 'ΜΕΡΙΚΟ ΣΥΝΟΛΟ',
        'hi-IN': 'उप-योग',
        'ko-KR': '소계',
        'lb-LU': 'Subtotal',
        'nl-NL': 'Subtotaal',
        'pt-PT': 'Subtotal',
        'ru-RU': 'Промежуточный итог',
        'sl-SI': 'Vmesni seštevek',
        'sv-SE': 'Delsumma',
        th: 'ยอดรวม',
        uk: 'Проміжний підсумок',
        'zh-CN': '小计',
        'zh-TW': '小計'
    },
    tax: {
        'de-DE': 'Steuer',
        'en-US': 'Tax',
        'es-ES': 'Impuesto',
        fr: 'Impôt',
        it: 'Tassa',
        ja: '税',
        'ro-RO': 'Impozit',
        ar: 'ضريبة',
        ca: 'Impostos',
        'cs-CZ': 'Daň',
        'da-DK': 'Skat',
        el: 'Φόρος',
        'hi-IN': 'कर',
        'ko-KR': '세',
        'lb-LU': 'Steier',
        'nl-NL': 'Belasting',
        'pt-PT': 'Imposto',
        'ru-RU': 'Налог',
        'sl-SI': 'Davek',
        'sv-SE': 'Beskatta',
        th: 'ภาษี',
        uk: 'Податок',
        'zh-CN': '税',
        'zh-TW': '稅'
    },
    total: {
        'de-DE': 'Gesamt',
        'en-US': 'Total',
        'es-ES': 'Total',
        fr: 'Total',
        it: 'Totale',
        ja: '合計',
        'ro-RO': 'Total',
        ar: 'المجموع',
        ca: 'Total',
        'cs-CZ': 'Celkový',
        'da-DK': 'i alt',
        el: 'Σύνολο',
        'hi-IN': 'कुल',
        'ko-KR': '총',
        'lb-LU': 'Insgesamt',
        'nl-NL': 'Totaal',
        'pt-PT': 'Total',
        'ru-RU': 'Общий',
        'sl-SI': 'Skupaj',
        'sv-SE': 'Total',
        th: 'รวม',
        uk: 'Всього',
        'zh-CN': '全部的',
        'zh-TW': '全部的'
    },
    coupon: {
        'de-DE': 'Coupon',
        'en-US': 'Coupon',
        'es-ES': 'Cupón',
        fr: 'Coupon',
        it: 'Coupon',
        ja: 'クーポン',
        'ro-RO': 'Cupon',
        ar: 'قسيمة',
        ca: 'Cupó',
        'cs-CZ': 'Kupón',
        'da-DK': 'Kupon',
        el: 'Κουπόνι',
        'hi-IN': 'कूपन',
        'ko-KR': '쿠폰',
        'lb-LU': 'Coupon',
        'nl-NL': 'Coupon',
        'pt-PT': 'Cupom',
        'ru-RU': 'Купон',
        'sl-SI': 'Kupon',
        'sv-SE': 'Kupong',
        th: 'คูปอง',
        uk: 'Купон',
        'zh-CN': '优惠券',
        'zh-TW': '優惠券'
    },
    'Coupon code': {
        'de-DE': 'Gutscheincode',
        'en-US': 'Coupon code',
        'es-ES': 'Código promocional',
        fr: 'Code de coupon',
        it: 'Codice coupon',
        ja: 'クーポンコード',
        'ro-RO': 'Cod cupon',
        ar: 'رمز الكوبون',
        ca: 'Codi de cupó',
        'cs-CZ': 'Kód kupónu',
        'da-DK': 'Kuponkode',
        el: 'Κωδικός κουπονιού',
        'hi-IN': 'कूपन कोड',
        'ko-KR': '쿠폰 코드',
        'lb-LU': 'Coupon Code',
        'nl-NL': 'Coupon code',
        'pt-PT': 'Código do cupom',
        'ru-RU': 'Код купона',
        'sl-SI': 'Koda kupona',
        'sv-SE': 'Kupongskod',
        th: 'รหัสคูปอง',
        uk: 'Код купона',
        'zh-CN': '优惠卷号码',
        'zh-TW': '優惠卷號碼'
    },
    'You entered an invalid coupon code': {
        'de-DE': 'Sie haben einen ungültigen Gutscheincode eingegeben',
        'en-US': 'You entered an invalid coupon code',
        'es-ES': 'Ingresaste un código de cupón no válido',
        fr: 'Vous avez entré un code de coupon non valide',
        it: 'Hai inserito un codice coupon non valido',
        ja: '無効なクーポンコードを入力しました',
        'ro-RO': 'Ați introdus un cod de cupon nevalid',
        ar: 'لقد أدخلت رمز قسيمة غير صالح',
        ca: 'Heu introduït un codi de cupó no vàlid',
        'cs-CZ': 'Zadali jste neplatný kód kupónu',
        'da-DK': 'Du har indtastet en ugyldig kuponkode',
        el: 'Καταχωρίσατε έναν μη έγκυρο κωδικό κουπονιού',
        'hi-IN': 'आपने एक अमान्य कूपन कोड दर्ज किया है',
        'ko-KR': '잘못된 쿠폰 코드를 입력했습니다.',
        'lb-LU': 'Dir hutt en ongëltege Couponcode aginn',
        'nl-NL': 'U heeft een ongeldige couponcode ingevoerd',
        'pt-PT': 'Você inseriu um código de cupom inválido',
        'ru-RU': 'Вы ввели неверный код купона',
        'sl-SI': 'Vnesli ste neveljavno kodo kupona',
        'sv-SE': 'Du har angett en ogiltig kupongkod',
        th: 'คุณป้อนรหัสคูปองไม่ถูกต้อง',
        uk: 'Ви ввели недійсний код купона',
        'zh-CN': '您输入了无效的优惠券代码',
        'zh-TW': '您輸入了無效的優惠券代碼'
    },
    apply: {
        'de-DE': 'Einlösen',
        'en-US': 'Apply',
        'es-ES': 'Aplicar',
        fr: 'Appliquer',
        it: 'Applicare',
        ja: '申込み',
        'ro-RO': 'Aplica',
        ar: 'تطبيق',
        ca: 'Aplicar',
        'cs-CZ': 'Aplikovat',
        'da-DK': 'ansøge',
        el: 'Ισχύουν',
        'hi-IN': 'लागू करना',
        'ko-KR': '적용하다',
        'lb-LU': 'Gëlle',
        'nl-NL': 'Van toepassing zijn',
        'pt-PT': 'Aplicar',
        'ru-RU': 'Подать заявление',
        'sl-SI': 'Uporabi',
        'sv-SE': 'Tillämpa',
        th: 'นำมาใช้',
        uk: 'Застосувати',
        'zh-CN': '申请',
        'zh-TW': '申請'
    },
    'gift-card': {
        'de-DE': 'Geschenkkarte',
        'en-US': 'Gift card',
        'es-ES': 'Tarjeta de regalo',
        fr: 'Carte cadeau',
        it: 'Carta regalo',
        ja: 'ギフトカード',
        'ro-RO': 'Card cadou',
        ar: 'كرت هدية',
        ca: 'Targeta regal',
        'cs-CZ': 'Dárková poukázka',
        'da-DK': 'Gavekort',
        el: 'Δωροκάρτα',
        'hi-IN': 'उपहार पत्र',
        'ko-KR': '기프트 카드',
        'lb-LU': 'Kaddokaart',
        'nl-NL': 'Cadeaukaart',
        'pt-PT': 'Cartão Presente',
        'ru-RU': 'Подарочная карта',
        'sl-SI': 'Darilne kartice',
        'sv-SE': 'Present kort',
        th: 'บัตรของขวัญ',
        uk: 'Подарункова картка',
        'zh-CN': '礼物卡',
        'zh-TW': '禮物卡'
    },
    'Gift card number': {
        'de-DE': 'Geschenkkartennummer',
        'en-US': 'Gift card number',
        'es-ES': 'Numero de tarjeta de regalo',
        fr: 'Numéro de la carte-cadeau',
        it: 'Numero della carta regalo',
        ja: 'ギフトカード番号',
        'ro-RO': 'Numărul cardului cadou',
        ar: 'رقم بطاقة الهدية',
        ca: 'Número de targeta regal',
        'cs-CZ': 'Číslo dárkové karty',
        'da-DK': 'Gavekortnummer',
        el: 'Αριθμός δωροκάρτας',
        'hi-IN': 'गिफ्ट कार्ड नंबर',
        'ko-KR': '기프트 카드 번호',
        'lb-LU': 'Geschenkkaart Nummer',
        'nl-NL': 'Cadeaukaartnummer',
        'pt-PT': 'Número do cartão-presente',
        'ru-RU': 'Номер подарочной карты',
        'sl-SI': 'Številka darilne kartice',
        'sv-SE': 'Presentkortnummer',
        th: 'หมายเลขบัตรของขวัญ',
        uk: 'Номер подарункової картки',
        'zh-CN': '礼品卡号',
        'zh-TW': '禮品卡號'
    },
    'You entered an invalid gift card': {
        'de-DE': 'Sie haben eine ungültige Geschenkkarte eingegeben',
        'en-US': 'You entered an invalid gift card',
        'es-ES': 'Ingresaste una tarjeta de regalo no válida',
        fr: 'Vous avez entré une carte-cadeau non valide',
        it: 'Hai inserito una carta regalo non valida',
        ja: '無効なギフトカードを入力しました',
        'ro-RO': 'Ați introdus un card cadou nevalid',
        ar: 'لقد أدخلت بطاقة هدايا غير صالحة',
        ca: 'Heu introduït una targeta regal no vàlida',
        'cs-CZ': 'Zadali jste neplatnou dárkovou kartu',
        'da-DK': 'Du har indtastet et ugyldigt gavekort',
        el: 'Καταχωρίσατε μια μη έγκυρη δωροκάρτα',
        'hi-IN': 'आपने एक अमान्य उपहार कार्ड दर्ज किया है',
        'ko-KR': '잘못된 기프트 카드를 입력했습니다.',
        'lb-LU': 'Dir hutt eng ongëlteg Kaddokaart aginn',
        'nl-NL': 'Je hebt een ongeldige cadeaubon ingevoerd',
        'pt-PT': 'Você inseriu um vale-presente inválido',
        'ru-RU': 'Вы ввели недействительную подарочную карту',
        'sl-SI': 'Vnesli ste neveljavno darilno kartico',
        'sv-SE': 'Du har angett ett ogiltigt presentkort',
        th: 'คุณป้อนบัตรของขวัญที่ไม่ถูกต้อง',
        uk: 'Ви ввели недійсну подарункову картку',
        'zh-CN': '您输入了无效的礼品卡',
        'zh-TW': '您輸入了無效的禮品卡'
    },
    'gift-card-already-applied': {
        'de-DE': 'Diese Geschenkkarte wurde bereits angewendet.',
        'en-US': 'This gift card has already been applied.',
        'es-ES': 'Esta tarjeta de regalo ya se aplicó.',
        fr: 'Cette carte-cadeau a déjà été appliquée.',
        it: 'Questa carta regalo è già stata applicata.',
        ja: 'このギフトカードはすでに適用されています。',
        'ro-RO': 'Acest card cadou a fost deja aplicat.',
        ar: 'تم تطبيق بطاقة الهدايا هذه بالفعل.',
        ca: 'Aquesta targeta regal ja s\'ha aplicat.',
        'cs-CZ': 'Tato dárková karta již byla použita.',
        'da-DK': 'Dette gavekort er allerede anvendt.',
        el: 'Αυτή η δωροκάρτα έχει ήδη εφαρμοστεί.',
        'hi-IN': 'यह उपहार कार्ड पहले ही लागू किया जा चुका है।',
        'ko-KR': '이 기프트 카드는 이미 적용되었습니다.',
        'lb-LU': 'Dës Kaddokaart gouf scho applizéiert.',
        'nl-NL': 'Deze cadeaubon is al toegepast.',
        'pt-PT': 'Este vale-presente já foi aplicado.',
        'ru-RU': 'Эта подарочная карта уже была применена.',
        'sl-SI': 'Ta darilna kartica je že bila uporabljena.',
        'sv-SE': 'Detta presentkort har redan tillämpats.',
        th: 'มีการใช้บัตรของขวัญนี้แล้ว',
        uk: 'Цю подарункову картку вже застосовано.',
        'zh-CN': '此礼品卡已被应用。',
        'zh-TW': '此禮品卡已被應用。'
    },
    'ship-to': {
        'de-DE': 'Versand nach',
        'en-US': 'Ship to',
        'es-ES': 'Enviar a',
        fr: 'Envoyez à',
        it: 'Spedire a',
        ja: '配送先',
        'ro-RO': 'Îmbarca spre',
        ar: 'سافر على متن سفينة ل',
        ca: 'Envia a',
        'cs-CZ': 'Dopravit do',
        'da-DK': 'Send til',
        el: 'Αποστολή προς',
        'hi-IN': 'यहां भेजें',
        'ko-KR': '배송지',
        'lb-LU': 'Schécken un',
        'nl-NL': 'Verzend naar',
        'pt-PT': 'Enviar para',
        'ru-RU': 'Доставка до',
        'sl-SI': 'Poslati v',
        'sv-SE': 'Frakta till',
        th: 'ส่งไปที่',
        uk: 'Відправити до',
        'zh-CN': '运送到',
        'zh-TW': '運送到'
    },
    'Credit or debit card': {
        'de-DE': 'Kredit- oder Debitkarte',
        'en-US': 'Credit or debit card',
        'es-ES': 'Tarjeta de crédito o débito',
        fr: 'Carte de crédit ou de débit',
        it: 'Carta di credito o di debito',
        ja: 'クレジットもしくはデビットカード',
        'ro-RO': 'Card de credit sau debit',
        ar: 'بطاقة الائتمان أو الخصم',
        ca: 'Targeta de crèdit o dèbit',
        'cs-CZ': 'Kreditní nebo debetní karta',
        'da-DK': 'Kredit- eller betalingskort',
        el: 'Πιστωτική ή χρεωστική κάρτα',
        'hi-IN': 'क्रेडिट या डेबिट कार्ड',
        'ko-KR': '신용카드 또는 직불카드',
        'lb-LU': 'Kreditt- oder Bankkaart',
        'nl-NL': 'Creditcard of bankpas',
        'pt-PT': 'Cartão de crédito ou débito',
        'ru-RU': 'Кредитная или дебетовая карта',
        'sl-SI': 'Kreditna ali debetna kartica',
        'sv-SE': 'Kredit-eller betalkort',
        th: 'บัตรเครดิตหรือบัตรเดบิต',
        uk: 'Кредитна або дебетова картка',
        'zh-CN': '信用卡或借记卡',
        'zh-TW': '信用卡或借記卡'
    },
    pay: {
        'de-DE': 'Zahlen',
        'en-US': 'Pay',
        'es-ES': 'Pagar',
        fr: 'Payer',
        it: 'Pagare',
        ja: '支払い',
        'ro-RO': 'Plătește',
        ar: 'يدفع',
        ca: 'Paga',
        'cs-CZ': 'Platit',
        'da-DK': 'Betale',
        el: 'Πληρωμή',
        'hi-IN': 'वेतन',
        'ko-KR': '지불',
        'lb-LU': 'Bezuelen',
        'nl-NL': 'Betalen',
        'pt-PT': 'Pagar',
        'ru-RU': 'Платить',
        'sl-SI': 'Plačaj',
        'sv-SE': 'Betala',
        th: 'จ่าย',
        uk: 'Оплата',
        'zh-CN': '支付',
        'zh-TW': '支付'
    },
    back: {
        'de-DE': 'Zurück zu Informationen',
        'en-US': 'Back to info',
        'es-ES': 'Volver a información',
        fr: 'Retour aux informations',
        it: 'Torna alle informazioni',
        ja: '情報に戻る',
        'ro-RO': 'Înapoi la informații',
        ar: 'رجوع إلى المعلومات',
        ca: 'Torna a la informació',
        'cs-CZ': 'Zpět k informacím',
        'da-DK': 'Tilbage til information',
        el: 'Επιστροφή στις πληροφορίες',
        'hi-IN': 'जानकारी पर वापस जाएं',
        'ko-KR': '정보로 돌아가기',
        'lb-LU': 'Zréck op Informatioun',
        'nl-NL': 'Terug naar informatie',
        'pt-PT': 'Voltar para a informação',
        'ru-RU': 'Вернуться к информации',
        'sl-SI': 'Nazaj na informacije',
        'sv-SE': 'Tillbaka till information',
        th: 'กลับไปที่ข้อมูล',
        uk: 'Назад до інформації',
        'zh-CN': '返回信息',
        'zh-TW': '返回信息'
    },
    email: {
        'de-DE': 'Email',
        'en-US': 'Email',
        'es-ES': 'Correo',
        fr: 'Email',
        it: 'Email',
        ja: 'メールアドレス',
        'ro-RO': 'Email',
        ar: 'بريد الالكتروني',
        ca: 'Correu electrònic',
        'cs-CZ': 'E-mailem',
        'da-DK': 'E -mail',
        el: 'ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ',
        'hi-IN': 'ईमेल',
        'ko-KR': '이메일',
        'lb-LU': 'Email',
        'nl-NL': 'E-mail',
        'pt-PT': 'O email',
        'ru-RU': 'Эл. адрес',
        'sl-SI': 'E-naslov',
        'sv-SE': 'E-post',
        th: 'อีเมล',
        uk: 'Електронна пошта',
        'zh-CN': '电子邮件',
        'zh-TW': '電子郵件'
    },
    delivery: {
        'de-DE': 'Lieferung',
        'en-US': 'Delivery',
        'es-ES': 'Entrega',
        fr: 'Livraison',
        it: 'Consegna',
        ja: '配送',
        'ro-RO': 'Livrare',
        ar: 'توصيل',
        ca: 'Lliurament',
        'cs-CZ': 'dodávka',
        'da-DK': 'Levering',
        el: 'Διανομή',
        'hi-IN': 'वितरण',
        'ko-KR': '배달',
        'lb-LU': 'Liwwerung',
        'nl-NL': 'Levering',
        'pt-PT': 'Entrega',
        'ru-RU': 'Доставка',
        'sl-SI': 'Dostava',
        'sv-SE': 'Leverans',
        th: 'จัดส่ง',
        uk: 'Доставка',
        'zh-CN': '送货',
        'zh-TW': '送貨'
    },
    card: {
        'de-DE': 'Karte',
        'en-US': 'Card',
        'es-ES': 'Tarjeta',
        fr: 'Carte',
        it: 'Carta',
        ja: 'カード',
        'ro-RO': 'Card',
        ar: 'بطاقة',
        ca: 'Targeta',
        'cs-CZ': 'Kartu',
        'da-DK': 'Kort',
        el: 'Κάρτα',
        'hi-IN': 'कार्ड',
        'ko-KR': '카드',
        'lb-LU': 'Kaart',
        'nl-NL': 'Kaart',
        'pt-PT': 'Cartão',
        'ru-RU': 'Карта',
        'sl-SI': 'Kartica',
        'sv-SE': 'Kort',
        th: 'การ์ด',
        uk: 'Картка',
        'zh-CN': '卡片',
        'zh-TW': '卡片'
    },
    edit: {
        'de-DE': 'Bearbeiten',
        'en-US': 'Edit',
        'es-ES': 'Editar',
        fr: 'Éditer',
        it: 'Modificare',
        ja: '編集',
        'ro-RO': 'Edita',
        ar: 'يحرر',
        ca: 'Edita',
        'cs-CZ': 'Upravit',
        'da-DK': 'Redigere',
        el: 'Επεξεργασία',
        'hi-IN': 'संपादित करें',
        'ko-KR': '편집하다',
        'lb-LU': 'Editéieren',
        'nl-NL': 'Bewerking',
        'pt-PT': 'Editar',
        'ru-RU': 'Редактировать',
        'sl-SI': 'Uredi',
        'sv-SE': 'Redigera',
        th: 'แก้ไข',
        uk: 'Редагувати',
        'zh-CN': '编辑',
        'zh-TW': '編輯'
    },
    'Sorry, this store does not ship to your location.': {
        'de-DE': 'Dieser Shop liefert leider nicht an Ihren Standort.',
        'en-US': 'Sorry, this store does not ship to your location.',
        'es-ES': 'Lo sentimos, esta tienda no se envía a su ubicación.',
        fr: 'Désolé, ce magasin ne livre pas à votre emplacement.',
        it: 'Siamo spiacenti, questo negozio non viene spedito alla tua posizione.',
        ja: '申し訳ありませんが、このストアはお住まいの地域に発送されません。',
        'ro-RO': 'Ne pare rău, acest magazin nu este livrat în locația dvs.',
        ar: 'عذرا ، هذا المتجر لا يشحن إلى موقعك.',
        ca: 'Aquesta botiga no s\'envia a la vostra ubicació.',
        'cs-CZ': 'Je nám líto, tento obchod vám nedoručíme.',
        'da-DK': 'Beklager, denne butik sender ikke til din lokation.',
        el: 'Λυπούμαστε, αυτό το κατάστημα δεν αποστέλλεται στην τοποθεσία σας.',
        'hi-IN': 'क्षमा करें, यह स्टोर आपके स्थान पर शिप नहीं करता है।',
        'ko-KR': '죄송합니다. 이 상점은 귀하의 위치로 배송되지 않습니다.',
        'lb-LU': 'Entschëllegt, dëse Buttek gëtt net op Är Location verschéckt.',
        'nl-NL': 'Sorry, deze winkel verzendt niet naar jouw locatie.',
        'pt-PT': 'Desculpe, esta loja não envia para o seu local.',
        'ru-RU': 'К сожалению, доставка в этот магазин не осуществляется.',
        'sl-SI': 'Ta trgovina žal ni dostavljena na vašo lokacijo.',
        'sv-SE': 'Den här butiken skickas inte till din plats.',
        th: 'ขออภัย ร้านค้านี้ไม่ได้จัดส่งไปยังตำแหน่งของคุณ',
        uk: 'На жаль, цей магазин не доставляється до вашого місцезнаходження.',
        'zh-CN': '抱歉，这家商店不发货到您所在的位置。',
        'zh-TW': '抱歉，這家商店不發貨到您所在的位置。'
    },
    processing: {
        'de-DE': 'Verarbeitung',
        'en-US': 'Processing',
        'es-ES': 'Procesamiento',
        fr: 'Traitement',
        it: 'Elaborazione',
        ja: '進行中',
        'ro-RO': 'Prelucrare',
        ar: 'يعالج',
        ca: 'Processament',
        'cs-CZ': 'zpracovává se',
        'da-DK': 'Forarbejdning',
        el: 'Επεξεργασία',
        'hi-IN': 'प्रसंस्करण',
        'ko-KR': '처리',
        'lb-LU': 'Veraarbechtung',
        'nl-NL': 'Verwerken',
        'pt-PT': 'Em processamento',
        'ru-RU': 'Обработка',
        'sl-SI': 'Obravnavati',
        'sv-SE': 'Bearbetning',
        th: 'กำลังประมวลผล',
        uk: 'Обробка',
        'zh-CN': '加工',
        'zh-TW': '加工'
    },
    'payment-failed': {
        'de-DE': 'Zahlung fehlgeschlagen',
        'en-US': 'Payment failed',
        'es-ES': 'Pago fallido',
        fr: 'Paiement échoué',
        it: 'Pagamento non riuscito',
        ja: '支払い失敗',
        'ro-RO': 'Plata esuata',
        ar: 'عملية الدفع فشلت',
        ca: 'El pagament ha fallat',
        'cs-CZ': 'Platba selhala',
        'da-DK': 'Betaling mislykkedes',
        el: 'Η πληρωμή απέτυχε',
        'hi-IN': 'भुगतान असफल हुआ',
        'ko-KR': '결제 실패',
        'lb-LU': 'Bezuelung gescheitert',
        'nl-NL': 'Betaling mislukt',
        'pt-PT': 'Pagamento falhou',
        'ru-RU': 'Платеж не прошел',
        'sl-SI': 'Plačilo ni uspelo',
        'sv-SE': 'Betalning misslyckades',
        th: 'การชำระเงินล้มเหลว',
        uk: 'Не вдалося здійснити платіж',
        'zh-CN': '支付失败',
        'zh-TW': '支付失敗'
    },
    'first-name': {
        'de-DE': 'Vorname',
        'en-US': 'First name',
        'es-ES': 'Nombre',
        fr: 'Prénom',
        it: 'Nome',
        ja: '名',
        'ro-RO': 'Nume',
        ar: 'الاسم الأول',
        ca: 'Nom',
        'cs-CZ': 'Jméno',
        'da-DK': 'Fornavn',
        el: 'Ονομα',
        'hi-IN': 'पहला नाम',
        'ko-KR': '이름',
        'lb-LU': 'Virnumm',
        'nl-NL': 'Voornaam',
        'pt-PT': 'Primeiro nome',
        'ru-RU': 'Имя',
        'sl-SI': 'Ime',
        'sv-SE': 'Förnamn',
        th: 'ชื่อจริง',
        uk: 'Ім\'я',
        'zh-CN': '名',
        'zh-TW': '名'
    },
    'last-name': {
        'de-DE': 'Nachname',
        'en-US': 'Last name',
        'es-ES': 'Apellido',
        fr: 'Nom',
        it: 'Cognome',
        ja: '姓',
        'ro-RO': 'Numele de familie',
        ar: 'الكنية',
        ca: 'Cognom',
        'cs-CZ': 'Příjmení',
        'da-DK': 'Efternavn',
        el: 'Επίθετο',
        'hi-IN': 'उपनाम',
        'ko-KR': '성',
        'lb-LU': 'Familljennumm',
        'nl-NL': 'Achternaam',
        'pt-PT': 'Último nome',
        'ru-RU': 'Фамилия',
        'sl-SI': 'Priimek',
        'sv-SE': 'Efternamn',
        th: 'นามสกุล',
        uk: 'Прізвище',
        'zh-CN': '姓',
        'zh-TW': '姓'
    },
    phone: {
        'de-DE': 'Telefon',
        'en-US': 'Phone number',
        'es-ES': 'Teléfono',
        fr: 'Téléphone',
        it: 'Telefono',
        ja: '電話番号',
        'ro-RO': 'Telefon',
        ar: 'رقم الهاتف',
        ca: 'Número de telèfon',
        'cs-CZ': 'Telefonní číslo',
        'da-DK': 'Telefonnummer',
        el: 'Τηλεφωνικό νούμερο',
        'hi-IN': 'फ़ोन नंबर',
        'ko-KR': '전화 번호',
        'lb-LU': 'Telefonsnummer',
        'nl-NL': 'Telefoonnummer',
        'pt-PT': 'Número de telefone',
        'ru-RU': 'Номер телефона',
        'sl-SI': 'Telefonska številka',
        'sv-SE': 'Telefonnummer',
        th: 'หมายเลขโทรศัพท์',
        uk: 'Телефонний номер',
        'zh-CN': '电话号码',
        'zh-TW': '電話號碼'
    },
    street: {
        'de-DE': 'Straße und Hausnummer',
        'en-US': 'Street address',
        'es-ES': 'Dirección',
        fr: 'Adresse',
        it: 'Indirizzo',
        ja: '住所詳細',
        'ro-RO': 'Adresă',
        ar: 'عنوان الشارع',
        ca: 'adreça',
        'cs-CZ': 'adresa ulice',
        'da-DK': 'Vejnavn',
        el: 'διεύθυνση',
        'hi-IN': 'गली का पता',
        'ko-KR': '주소',
        'lb-LU': 'Strooss Adress',
        'nl-NL': 'woonadres',
        'pt-PT': 'endereço da Rua',
        'ru-RU': 'адрес улицы',
        'sl-SI': 'naslov ceste',
        'sv-SE': 'Gatuadress',
        th: 'ที่อยู่ถนน',
        uk: 'Адреса вулиці',
        'zh-CN': '街道地址',
        'zh-TW': '街道地址'
    },
    apt: {
        'de-DE': 'Apartment #',
        'en-US': 'Apt. #',
        'es-ES': 'Apartamento #',
        fr: 'Appartement #',
        it: 'Appartamento #',
        ja: '部屋番号など',
        'ro-RO': 'Apartament #',
        ar: 'شقة #',
        ca: 'Apartament #',
        'cs-CZ': 'Byt #',
        'da-DK': 'Lejlighed #',
        el: 'Διαμέρισμα #',
        'hi-IN': 'अपार्टमेंट #',
        'ko-KR': '아파트 #',
        'lb-LU': 'Appartement #',
        'nl-NL': 'Appartement #',
        'pt-PT': 'Apartamento #',
        'ru-RU': 'Квартира #',
        'sl-SI': 'Stanovanje št.',
        'sv-SE': 'Lägenhet #',
        th: 'อพาร์ทเม้น #',
        uk: 'Квартира №',
        'zh-CN': '公寓 ＃',
        'zh-TW': '公寓 ＃'
    },
    postal: {
        'de-DE': 'Postleitzahl',
        'en-US': 'Postal code',
        'es-ES': 'Código Postal',
        fr: 'Code postal',
        it: 'Codice postale',
        ja: '郵便番号',
        'ro-RO': 'Cod postal',
        ar: 'الرمز البريدي',
        ca: 'Codi Postal',
        'cs-CZ': 'Poštovní směrovací číslo',
        'da-DK': 'Postnummer',
        el: 'Ταχυδρομικός Κώδικας',
        'hi-IN': 'डाक कोड',
        'ko-KR': '우편 번호',
        'lb-LU': 'Postleitzuel',
        'nl-NL': 'Postcode',
        'pt-PT': 'Código postal',
        'ru-RU': 'Почтовый Код',
        'sl-SI': 'Poštna številka',
        'sv-SE': 'Postnummer',
        th: 'รหัสไปรษณีย์',
        uk: 'Поштовий індекс',
        'zh-CN': '邮政编码',
        'zh-TW': '郵政編碼'
    },
    city: {
        'de-DE': 'Stadt',
        'en-US': 'City',
        'es-ES': 'Ciudad',
        fr: 'Ville',
        it: 'Citta',
        ja: '市',
        'ro-RO': 'Oraș',
        ar: 'مدينة',
        ca: 'ciutat',
        'cs-CZ': 'Město',
        'da-DK': 'By',
        el: 'Πόλη',
        'hi-IN': 'शहर',
        'ko-KR': '도시',
        'lb-LU': 'Stad',
        'nl-NL': 'Stad',
        'pt-PT': 'Cidade',
        'ru-RU': 'Город',
        'sl-SI': 'Mesto',
        'sv-SE': 'Stad',
        th: 'เมือง',
        uk: 'Місто',
        'zh-CN': '城市',
        'zh-TW': '城市'
    },
    province: {
        'de-DE': 'Provinz',
        'en-US': 'Province',
        'es-ES': 'Provincia',
        fr: 'Département',
        it: 'Provincia',
        ja: '県',
        'ro-RO': 'Judet',
        ar: 'مقاطعة',
        ca: 'Província',
        'cs-CZ': 'Provincie',
        'da-DK': 'Provins',
        el: 'Επαρχία',
        'hi-IN': 'प्रांत',
        'ko-KR': '주',
        'lb-LU': 'Provënz',
        'nl-NL': 'Provincie',
        'pt-PT': 'Província',
        'ru-RU': 'Провинция',
        'sl-SI': 'Pokrajina',
        'sv-SE': 'Provins',
        th: 'จังหวัด',
        uk: 'Провінція',
        'zh-CN': '省',
        'zh-TW': '省'
    },
    'Select a Province': {
        'de-DE': 'Wählen Sie eine Provinz',
        'en-US': 'Select a Province',
        'es-ES': 'Seleccione una provincia',
        fr: 'Sélectionnez une province',
        it: 'Seleziona una provincia',
        ja: '都道府県を選択',
        'ro-RO': 'Selectați o provincie',
        ar: 'اختر المحافظة',
        ca: 'Seleccioneu una província',
        'cs-CZ': 'Vyberte provincii',
        'da-DK': 'Vælg en provins',
        el: 'Επιλέξτε μια επαρχία',
        'hi-IN': 'एक प्रांत का चयन करें',
        'ko-KR': '주를 선택하십시오',
        'lb-LU': 'Wielt eng Provënz',
        'nl-NL': 'Selecteer een provincie',
        'pt-PT': 'Selecione uma província',
        'ru-RU': 'Выберите провинцию',
        'sl-SI': 'Izberite provinco',
        'sv-SE': 'Välj en provins',
        th: 'เลือกจังหวัด',
        uk: 'Виберіть провінцію',
        'zh-CN': '选择省份',
        'zh-TW': '選擇省份'
    },
    state: {
        'de-DE': 'Bundesland',
        'en-US': 'State',
        'es-ES': 'Estado',
        fr: 'État',
        it: 'Stato',
        ja: '県',
        'ro-RO': 'Stat',
        ar: 'ولاية',
        ca: 'Estat',
        'cs-CZ': 'Stát',
        'da-DK': 'Stat',
        el: 'κατάσταση',
        'hi-IN': 'राज्य',
        'ko-KR': '상태',
        'lb-LU': 'Staat',
        'nl-NL': 'Staat',
        'pt-PT': 'Estada',
        'ru-RU': 'Состояние',
        'sl-SI': 'Država',
        'sv-SE': 'stat',
        th: 'สถานะ',
        uk: 'Держава',
        'zh-CN': '州',
        'zh-TW': '州'
    },
    'Select a State': {
        'de-DE': 'Wähle einen Staat',
        'en-US': 'Select a State',
        'es-ES': 'Selecciona un Estado',
        fr: 'Sélectionner un état',
        it: 'Seleziona uno Stato',
        ja: '州を選択',
        'ro-RO': 'Selecteaza un stat',
        ar: 'حدد ولاية',
        ca: 'Seleccioneu un estat',
        'cs-CZ': 'Vyberte stát',
        'da-DK': 'Vælg en stat',
        el: 'Επιλέξτε μια πολιτεία',
        'hi-IN': 'एक राज्य का चयन करें',
        'ko-KR': '주 선택',
        'lb-LU': 'Wielt e Staat',
        'nl-NL': 'Selecteer een staat',
        'pt-PT': 'Selecione um Estado',
        'ru-RU': 'Выберите штат',
        'sl-SI': 'Izberite državo',
        'sv-SE': 'Välj en stat',
        th: 'เลือกรัฐ',
        uk: 'Виберіть штат',
        'zh-CN': '选择一个州',
        'zh-TW': '選擇一個州'
    },
    county: {
        'de-DE': 'Bezirk',
        'en-US': 'County',
        'es-ES': 'Condado',
        fr: 'Comté',
        it: 'Contea',
        ja: '郡',
        'ro-RO': 'Județul',
        ar: 'مقاطعة',
        ca: 'comtat',
        'cs-CZ': 'okres',
        'da-DK': 'Amt',
        el: 'Κομητεία',
        'hi-IN': 'काउंटी',
        'ko-KR': '군',
        'lb-LU': 'Grofschaft',
        'nl-NL': 'district',
        'pt-PT': 'condado',
        'ru-RU': 'округ',
        'sl-SI': 'Okrožje',
        'sv-SE': 'Grevskap',
        th: 'เขต',
        uk: 'Повіт',
        'zh-CN': '县',
        'zh-TW': '縣'
    },
    country: {
        'de-DE': 'Wählen Sie ein Land',
        'en-US': 'Select a country',
        'es-ES': 'Seleccione un país',
        fr: 'Pays',
        it: 'Seleziona un paese',
        ja: '国',
        'ro-RO': 'Selecteaza o tara',
        ar: 'اختر دولة',
        ca: 'Seleccioneu un país',
        'cs-CZ': 'Vyber zemi',
        'da-DK': 'Vælg et land',
        el: 'Επιλέξτε χώρα',
        'hi-IN': 'कोई देश चुनें',
        'ko-KR': '국가를 고르시 오',
        'lb-LU': 'Wielt e Land',
        'nl-NL': 'Selecteer een land',
        'pt-PT': 'Selecione um pais',
        'ru-RU': 'Выберите страну',
        'sl-SI': 'Izberite državo',
        'sv-SE': 'Välj ett land',
        th: 'เลือกประเทศ',
        uk: 'Виберіть країну',
        'zh-CN': '选择一个国家',
        'zh-TW': '選擇一個國家'
    },
    'country-label': {
        'de-DE': 'Land',
        'en-US': 'Country',
        'es-ES': 'País',
        fr: 'Pays',
        it: 'Nazione',
        ja: '国',
        'ro-RO': 'Țară',
        ar: 'دولة',
        ca: 'País',
        'cs-CZ': 'Země',
        el: 'Χώρα',
        'hi-IN': 'देश',
        'ko-KR': '국가',
        'lb-LU': 'Land',
        'nl-NL': 'Land',
        'pt-PT': 'País',
        'ru-RU': 'Страна',
        'sl-SI': 'Država',
        'sv-SE': 'Land',
        th: 'ประเทศ',
        uk: 'Країна',
        'zh-CN': '国家',
        'zh-TW': '國家'
    },
    'Order notes (optional):': {
        'de-DE': 'Bestellnotizen (optional):',
        'en-US': 'Order notes (optional):',
        'es-ES': 'Notas de pedido opcional:',
        fr: 'Notes de commande (facultatif):',
        it: 'Note dell\'ordine (opzionale):',
        ja: '注文メモ（オプション):',
        'ro-RO': 'Note de comandă (opțional):',
        ar: 'ملاحظات الطلب (اختياري):',
        ca: 'notes de comanda (opcional):',
        'cs-CZ': 'poznámky k objednávce (volitelné):',
        el: 'σημειώσεις παραγγελίας (προαιρετικό):',
        'hi-IN': 'आदेश नोट्स (वैकल्पिक):',
        'ko-KR': '주문 메모(선택 사항):',
        'lb-LU': 'Bestellungsnotizen (optional):',
        'nl-NL': 'bestelnotities (optioneel):',
        'pt-PT': 'notas do pedido (opcional):',
        'ru-RU': 'примечания к заказу (необязательно): ',
        'sl-SI': 'opombe o naročilu (neobvezno): ',
        'sv-SE': 'beställningsanteckningar (valfritt):',
        th: 'หมายเหตุการสั่งซื้อ (ไม่บังคับ):',
        uk: 'примітки до замовлення (необов\'язково)',
        'zh-CN': '订单备注（可选）:',
        'zh-TW': '訂單備註（可選）:"'
    },
    'Something went wrong, but the payment may have been made. Please check before placing another order.': {
        'de-DE': 'Es ist ein Fehler aufgetreten, aber die Zahlung wurde möglicherweise geleistet. Bitte überprüfen Sie dies, bevor Sie eine weitere Bestellung aufgeben.',
        'en-US': 'Something went wrong, but the payment may have been made. Please check before placing another order.',
        'es-ES': 'Se produjo un error, pero es posible que se haya realizado el pago. Verifique antes de realizar otro pedido.',
        fr: 'Une erreur s\'est produite, mais le paiement a peut-être été effectué. Veuillez vérifier avant de passer une autre commande.',
        it: 'Qualcosa è andato storto, ma il pagamento potrebbe essere stato effettuato. Si prega di controllare prima di effettuare un altro ordine.',
        ja: '何か問題が発生しましたが、支払いが行われた可能性があります。 別の注文をする前に確認してください。',
        'ro-RO': 'Ceva nu a funcționat corect, dar este posibil ca plata să fi fost efectuată. Vă rugăm să verificați înainte de a plasa o altă comandă.',
        ar: 'حدث خطأ ما ، ولكن ربما تم السداد. يرجى التحقق قبل تقديم طلب آخر.',
        ca: 'S\'ha produït un error, però és possible que s\'hagi efectuat el pagament. Comproveu-ho abans de fer una altra comanda.',
        'cs-CZ': 'Něco se pokazilo, ale platba možná byla provedena. Před zadáním další objednávky prosím zkontrolujte.',
        'da-DK': 'Noget gik galt, men betalingen kan være foretaget. Kontroller venligst, før du afgiver en anden ordre.',
        el: 'Κάτι πήγε στραβά, αλλά η πληρωμή μπορεί να έχει γίνει. Παρακαλώ ελέγξτε πριν κάνετε άλλη παραγγελία.',
        'hi-IN': 'कुछ गलत हुआ, लेकिन हो सकता है कि भुगतान हो गया हो. कृपया एक और आदेश देने से पहले जांच लें।',
        'ko-KR': '문제가 발생했지만 결제가 완료되었을 수 있습니다. 다른 주문을 하기 전에 확인하시기 바랍니다.',
        'lb-LU': 'Eppes ass falsch gaang, awer d\'Bezuelung ass vläicht gemaach ginn. Préift w.e.g. ier Dir eng aner Bestellung plazéiert.',
        'nl-NL': 'Er is iets misgegaan, maar de betaling kan zijn gedaan. Controleer dit voordat u een nieuwe bestelling plaatst.',
        'pt-PT': 'Algo deu errado, mas o pagamento pode ter sido feito. Por favor, verifique antes de fazer outro pedido.',
        'ru-RU': 'Что-то пошло не так, но оплата могла быть произведена. Пожалуйста, проверьте перед размещением другого заказа.',
        'sl-SI': 'Nekaj je šlo narobe, morda pa je bilo plačilo izvedeno. Preden oddate novo naročilo, preverite.',
        'sv-SE': 'Något gick fel, men betalningen kan ha gjorts. Kontrollera innan du gör en annan beställning.',
        th: 'มีบางอย่างผิดพลาด แต่อาจมีการชำระเงินแล้ว โปรดตรวจสอบก่อนทำการสั่งซื้ออื่น',
        uk: 'Щось пішло не так, але оплата, можливо, була здійснена. Будь ласка, перевірте, перш ніж робити інше замовлення.',
        'zh-CN': '出了点问题，但可能已付款。 请在下另一个订单之前检查。',
        'zh-TW': '出了點問題，但可能已付款。 請在下另一個訂單之前檢查。'
    },
    'Something went wrong, but don\'t worry. We have your order details, and your payment has been made. There is no need to place another order.': {
        'de-DE': 'Etwas ist schief gelaufen, aber keine Sorge. Wir haben Ihre Bestelldaten und Ihre Zahlung ist erfolgt. Eine weitere Bestellung ist nicht erforderlich.',
        'en-US': 'Something went wrong, but don\'t worry. We have your order details, and your payment has been made. There is no need to place another order.',
        'es-ES': 'Algo salió mal, pero no se preocupe. Tenemos los detalles de su pedido y su pago se ha realizado. No es necesario realizar otro pedido.',
        fr: 'Quelque chose s\'est mal passé, mais ne vous inquiétez pas. Nous avons les détails de votre commande et votre paiement a été effectué. Il n\'est pas nécessaire de passer une autre commande.',
        it: 'Qualcosa è andato storto, ma non preoccuparti. Abbiamo i dettagli del tuo ordine e il pagamento è stato effettuato. Non è necessario effettuare un altro ordine.',
        ja: '何か問題が発生しましたが、心配しないでください。 ご注文の詳細があり、お支払いが完了しました。 別の注文をする必要はありません。',
        'ro-RO': 'Ceva a mers prost, dar nu vă faceți griji. Avem detaliile comenzii dvs. și plata dvs. a fost efectuată. Nu este nevoie să plasați o altă comandă.',
        ar: 'حدث خطأ ما ، لكن لا تقلق. لدينا تفاصيل طلبك ، وقد تم سداد دفعتك. ليست هناك حاجة لتقديم طلب آخر.',
        ca: 'S\'ha produït un error, però no us preocupeu. Tenim les dades de la vostra comanda i s’ha efectuat el pagament. No cal fer una altra comanda.',
        'cs-CZ': 'Něco se pokazilo, ale nebojte se. Máme podrobnosti o vaší objednávce a vaše platba byla provedena. Není třeba zadávat další objednávku.',
        'da-DK': 'Noget gik galt, men bare rolig. Vi har dine ordreoplysninger, og din betaling er foretaget. Det er ikke nødvendigt at afgive en anden ordre.',
        el: 'Κάτι πήγε στραβά, αλλά μην ανησυχείτε. Έχουμε τα στοιχεία της παραγγελίας σας και η πληρωμή σας έχει πραγματοποιηθεί. Δεν χρειάζεται να κάνετε άλλη παραγγελία.',
        'hi-IN': 'कुछ गलत हो गया, लेकिन चिंता न करें। हमारे पास आपके आदेश का विवरण है, और आपका भुगतान कर दिया गया है। दूसरा आदेश देने की कोई आवश्यकता नहीं है।',
        'ko-KR': '문제가 발생했지만 걱정하지 마세요. 주문 세부정보가 있으며 결제가 완료되었습니다. 다른 주문을 할 필요가 없습니다.',
        'lb-LU': 'Eppes ass falsch gaang, awer maach der keng Suergen. Mir hunn Är Bestellungsdetailer, an Är Bezuelung gouf gemaach. Et ass net néideg eng aner Bestellung ze maachen.',
        'nl-NL': 'Er is iets misgegaan, maar maak je geen zorgen. We hebben uw bestelgegevens en uw betaling is gedaan. Het is niet nodig om nog een bestelling te plaatsen.',
        'pt-PT': 'Algo deu errado, mas não se preocupe. Temos os detalhes do seu pedido e seu pagamento foi efetuado. Não há necessidade de fazer outro pedido.',
        'ru-RU': 'Что-то пошло не так, но не волнуйтесь. У нас есть данные о вашем заказе, и ваш платеж был произведен. Очередной заказ делать не нужно.',
        'sl-SI': 'Nekaj je šlo narobe, vendar ne skrbite. Podatke o naročilu imamo in plačilo je bilo opravljeno. Drugega naročila ni treba oddati.',
        'sv-SE': 'Något gick fel, men oroa dig inte. Vi har dina beställningsuppgifter och din betalning har gjorts. Det finns ingen anledning att göra en annan beställning.',
        th: 'มีบางอย่างผิดพลาด แต่ไม่ต้องกังวล เรามีรายละเอียดการสั่งซื้อของคุณและชำระเงินเรียบร้อยแล้ว ไม่จำเป็นต้องทำการสั่งซื้ออื่น',
        uk: 'Щось пішло не так, але не хвилюйтесь. У нас є дані вашого замовлення, і ваш платіж здійснено. Немає необхідності робити інше замовлення.',
        'zh-CN': '出了点问题，但别担心。 我们有您的订单详细信息，您的付款已完成。 无需再下订单。',
        'zh-TW': '出了點問題，但別擔心。 我們有您的訂單詳細信息，您的付款已完成。 無需再下訂單。'
    },
    'Delivery date': {
        'de-DE': 'Liefertermin',
        'en-US': 'Delivery date',
        'es-ES': 'Fecha de entrega',
        fr: 'Date de livraison',
        it: 'Data di consegna',
        ja: '配送日',
        'ro-RO': 'Data livrării',
        ar: 'تاريخ التسليم او الوصول',
        ca: 'Data de lliurament',
        'cs-CZ': 'Datum doručení',
        'da-DK': 'Leveringsdato',
        el: 'Ημερομηνία παράδοσης',
        'hi-IN': 'डिलीवरी की तारीख',
        'ko-KR': '배송 날짜',
        'lb-LU': 'Liwwerungsdatum',
        'nl-NL': 'Bezorgdatum',
        'pt-PT': 'Data de entrega',
        'ru-RU': 'Дата доставки',
        'sl-SI': 'Datum dostave',
        'sv-SE': 'Leveransdatum',
        th: 'วันที่จัดส่ง',
        uk: 'Дата доставки',
        'zh-CN': '邮寄日期',
        'zh-TW': '郵寄日期'
    },
    'First renewal': {
        'de-DE': 'Erste Verlängerung',
        'en-US': 'First renewal',
        'es-ES': 'Primera renovación',
        fr: 'Premier renouvellement',
        it: 'Primo Rinnovo',
        ja: '最初の更新',
        'ro-RO': 'Prima reînnoire',
        ar: 'التجديد الأول',
        ca: 'Primera renovació',
        'cs-CZ': 'První obnova',
        'da-DK': 'Første fornyelse',
        el: 'Πρώτη ανανέωση',
        'hi-IN': 'पहला नवीनीकरण',
        'ko-KR': '첫 번째 갱신',
        'lb-LU': 'Éischt Erneierung',
        'nl-NL': 'Eerste verlenging',
        'pt-PT': 'Primeira renovação',
        'ru-RU': 'Первое обновление',
        'sl-SI': 'Prva obnova',
        'sv-SE': 'Första förnyelsen',
        th: 'ต่ออายุครั้งแรก',
        uk: 'Перше оновлення',
        'zh-CN': '第一次续订',
        'zh-TW': '第一次續訂'
    },
    'Recurring total': {
        'de-DE': 'Wiederkehrende Summe',
        'en-US': 'Recurring total',
        'es-ES': 'Total recurrente',
        fr: 'Total récurrent',
        it: 'Totale ricorrente',
        ja: '定期合計',
        'ro-RO': 'Total recurent',
        ar: 'المجموع المتكرر',
        ca: 'Total recurrent',
        'cs-CZ': 'Opakující se celkem',
        'da-DK': 'Tilbagevendende total',
        el: 'Επαναλαμβανόμενο σύνολο',
        'hi-IN': 'आवर्ती कुल',
        'ko-KR': '반복 합계',
        'lb-LU': 'Widderhuelend Total',
        'nl-NL': 'Terugkerend totaal',
        'pt-PT': 'Total recorrente',
        'ru-RU': 'Повторяющаяся сумма',
        'sl-SI': 'Ponavljajoče se skupaj',
        'sv-SE': 'Återkommande totalt',
        th: 'ยอดรวมที่เกิดซ้ำ',
        uk: 'Повторювана сума',
        'zh-CN': '经常性总计',
        'zh-TW': '經常性總計'
    },
    'initial-summary': {
        'de-DE': 'Anfangssumme',
        'en-US': 'Initial total',
        'es-ES': 'Total inicial',
        fr: 'Total initial',
        it: 'Totale iniziale',
        ja: '初期合計',
        'ro-RO': 'Total inițial',
        ar: 'المجموع الأولي',
        ca: 'Total inicial',
        'cs-CZ': 'Počáteční celkem',
        'da-DK': 'Indledende total',
        el: 'Αρχικό σύνολο',
        'hi-IN': 'प्रारंभिक कुल',
        'ko-KR': '초기 합계',
        'lb-LU': 'Ufanks total',
        'nl-NL': 'Initieel totaal',
        'pt-PT': 'Total inicial',
        'ru-RU': 'Исходная сумма',
        'sl-SI': 'Začetni seštevek',
        'sv-SE': 'Initial summa',
        th: 'ยอดรวมเริ่มต้น',
        uk: 'Початкова сума',
        'zh-CN': '初始总数',
        'zh-TW': '初始總數'
    },
    'recurring-shipping': {
        'de-DE': 'Wiederkehrender Versand',
        'en-US': 'Recurring shipping',
        'es-ES': 'Envíos recurrentes',
        fr: 'Expédition récurrente',
        it: 'Totale iniziale',
        ja: '定期配送',
        'ro-RO': 'Total inițial',
        ar: 'الشحن المتكرر',
        ca: 'Enviament periòdic',
        'cs-CZ': 'Opakovaná doprava',
        'da-DK': 'Tilbagevendende forsendelse',
        el: 'Επαναλαμβανόμενη αποστολή',
        'hi-IN': 'आवर्ती शिपिंग',
        'ko-KR': '반복 배송',
        'lb-LU': 'Widderhuelend Versand',
        'nl-NL': 'Terugkerende verzending',
        'pt-PT': 'Remessa recorrente',
        'ru-RU': 'Периодическая доставка',
        'sl-SI': 'Ponavljajoča se dostava',
        'sv-SE': 'Återkommande frakt',
        th: 'ส่งสินค้าประจำ',
        uk: 'Повторна доставка',
        'zh-CN': '经常性运输',
        'zh-TW': '經常性運輸'
    },
    'initial-shipping': {
        'de-DE': 'Erster Versand',
        'en-US': 'Initial shipping',
        'es-ES': 'Envío inicial',
        fr: 'Expédition initiale',
        it: 'Spedizione iniziale',
        ja: '初期発送',
        'ro-RO': 'Expediere inițială',
        ar: 'الشحن الأولي',
        ca: 'Enviament inicial',
        'cs-CZ': 'Počáteční odeslání',
        'da-DK': 'Første forsendelse',
        el: 'Αρχική αποστολή',
        'hi-IN': 'प्रारंभिक शिपिंग',
        'ko-KR': '초기 배송',
        'lb-LU': 'Ufanks Versand',
        'nl-NL': 'Eerste verzending',
        'pt-PT': 'Envio inicial',
        'ru-RU': 'Первоначальная доставка',
        'sl-SI': 'Začetna dostava',
        'sv-SE': 'Första frakten',
        th: 'การจัดส่งสินค้าเบื้องต้น',
        uk: 'Початкова доставка',
        'zh-CN': '初始运输',
        'zh-TW': '初始運輸'
    },
    'Create a new password, or use an existing one if you already have an account for': {
        'de-DE': 'Erstellen Sie ein neues Passwort oder verwenden Sie ein bestehendes, wenn Sie bereits ein Konto für . haben',
        'en-US': 'Create a new password, or use an existing one if you already have an account for',
        'es-ES': 'Cree una nueva contraseña o use una existente si ya tiene una cuenta. tener',
        fr: 'Créez un nouveau mot de passe ou utilisez-en un existant si vous avez déjà un compte pour',
        it: 'Crea una nuova password o usane una esistente se hai già un account per',
        ja: '新しいパスワードを作成するか、すでにアカウントをお持ちの場合は既存のパスワードを使用してください',
        'ro-RO': 'Creați o parolă nouă sau utilizați una existentă dacă aveți deja un cont pentru',
        ar: 'أنشئ كلمة مرور جديدة ، أو استخدم كلمة مرور موجودة إذا كان لديك بالفعل حساب لـ',
        ca: 'Creeu una contrasenya nova o utilitzeu-ne una si ja teniu un compte',
        'cs-CZ': 'Vytvořte nové heslo nebo použijte stávající, pokud již máte účet',
        'da-DK': 'Opret en ny adgangskode, eller brug en eksisterende, hvis du allerede har en konto til',
        el: 'Δημιουργήστε έναν νέο κωδικό πρόσβασης ή χρησιμοποιήστε έναν υπάρχοντα, εάν έχετε ήδη λογαριασμό',
        'hi-IN': 'एक नया पासवर्ड बनाएं, या किसी मौजूदा पासवर्ड का उपयोग करें यदि आपके पास पहले से ही एक खाता है',
        'ko-KR': '새 비밀번호를 생성하거나 이미 계정이 있는 경우 기존 비밀번호를 사용하십시오.',
        'lb-LU': 'Erstellt en neit Passwuert, oder benotzt en existent Passwuert wann Dir schonn e Kont hutt',
        'nl-NL': 'Maak een nieuw wachtwoord aan, of gebruik een bestaand wachtwoord als je al een account hebt voor',
        'pt-PT': 'Crie uma nova senha ou use uma existente se você já tiver uma conta para',
        'ru-RU': 'Создайте новый пароль или используйте существующий, если у вас уже есть учетная запись для',
        'sl-SI': 'Ustvarite novo geslo ali uporabite obstoječe, če že imate račun',
        'sv-SE': 'Skapa ett nytt lösenord, eller använd ett befintligt om du redan har ett konto för',
        th: 'สร้างรหัสผ่านใหม่หรือใช้รหัสผ่านที่มีอยู่ถ้าคุณมีบัญชีสำหรับ',
        uk: 'Створіть новий пароль або використовуйте існуючий, якщо у вас вже є обліковий запис',
        'zh-CN': '创建一个新密码，如果您已经有一个帐户，则使用现有的密码',
        'zh-TW': '創建一個新密碼，如果您已經有一個帳戶，則使用現有的密碼'
    },
    'Password': {
        'de-DE': 'Passwort',
        'en-US': 'Password',
        'es-ES': 'Clave',
        fr: 'Mot de passe',
        it: 'Parola d\'ordine',
        ja: 'パスワード',
        'ro-RO': 'Parola',
        ar: 'كلمه السر',
        ca: 'Contrasenya',
        'cs-CZ': 'Heslo',
        'da-DK': 'Adgangskode',
        el: 'Κωδικός πρόσβασης',
        'hi-IN': 'पासवर्ड',
        'ko-KR': '비밀번호',
        'lb-LU': 'Passwuert',
        'nl-NL': 'Wachtwoord',
        'pt-PT': 'Senha',
        'ru-RU': 'Пароль',
        'sl-SI': 'Geslo',
        'sv-SE': 'Lösenord',
        th: 'รหัสผ่าน',
        uk: 'Пароль',
        'zh-CN': '密码',
        'zh-TW': '密碼'
    },
    'The password entered must be at least 8 characters long.': {
        'de-DE': 'Das eingegebene Passwort muss mindestens 8 Zeichen lang sein.',
        'en-US': 'The password entered must be at least 8 characters long.',
        'es-ES': 'La contraseña ingresada debe tener al menos 8 caracteres.',
        fr: 'Le mot de passe saisi doit comporter au moins 8 caractères.',
        it: 'La password inserita deve essere lunga almeno 8 caratteri.',
        ja: '入力するパスワードは8文字以上である必要があります。',
        'ro-RO': 'Parola introdusă trebuie să aibă cel puțin 8 caractere.',
        ar: 'يجب أن تتكون كلمة المرور المدخلة من 8 أحرف على الأقل.',
        ca: 'La contrasenya introduïda ha de tenir com a mínim 8 caràcters.',
        'cs-CZ': 'Zadané heslo musí mít alespoň 8 znaků.',
        'da-DK': 'Den indtastede adgangskode skal være mindst 8 tegn lang.',
        el: 'Ο κωδικός πρόσβασης που έχει εισαχθεί πρέπει να έχει τουλάχιστον 8 χαρακτήρες.',
        'hi-IN': 'दर्ज किया गया पासवर्ड कम से कम 8 वर्ण लंबा होना चाहिए।',
        'ko-KR': '입력한 비밀번호는 8자 이상이어야 합니다.',
        'lb-LU': 'D\'Passwuert dat aginn ass muss op d\'mannst 8 Zeeche laang sinn.',
        'nl-NL': 'Het ingevoerde wachtwoord moet minimaal 8 tekens lang zijn.',
        'pt-PT': 'A senha inserida deve ter pelo menos 8 caracteres.',
        'ru-RU': 'Введенный пароль должен состоять не менее чем из 8 символов.',
        'sl-SI': 'Vneseno geslo mora biti dolgo najmanj 8 znakov.',
        'sv-SE': 'Lösenordet måste vara minst 8 tecken långt.',
        th: 'รหัสผ่านที่ป้อนต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
        uk: 'Введений пароль повинен містити не менше 8 символів.',
        'zh-CN': '输入的密码长度必须至少为 8 个字符。',
        'zh-TW': '輸入的密碼長度必須至少為 8 個字符。'
    },
    unknown: {
        'de-DE': 'Unbekannt',
        'en-US': 'Unknown',
        'es-ES': 'Desconocido',
        fr: 'Inconnu',
        it: 'Sconosciuto',
        ja: '不明',
        'ro-RO': 'Necunoscut',
        ar: 'مجهول',
        ca: 'Desconegut',
        'cs-CZ': 'Neznámý',
        'da-DK': 'Ukendt',
        el: 'Αγνωστος',
        'hi-IN': 'अनजान',
        'ko-KR': '알려지지 않은',
        'lb-LU': 'Onbekannt',
        'nl-NL': 'Onbekend',
        'pt-PT': 'Desconhecida',
        'ru-RU': 'Неизвестный',
        'sl-SI': 'Neznano',
        'sv-SE': 'Okänd',
        th: 'ไม่รู้จัก',
        uk: 'Невідомий',
        'zh-CN': '未知',
        'zh-TW': '未知'
    },
    'Test mode: customers cannot see PeachPay': {
        'de-DE': 'Testmodus: Kunden können PeachPay nicht sehen',
        'en-US': 'Test mode: customers cannot see PeachPay',
        'es-ES': 'Modo de prueba: los clientes no pueden ver PeachPay',
        fr: 'Mode test : les clients ne peuvent pas voir PeachPay',
        it: 'Modalità test: i clienti non possono vedere PeachPay',
        ja: 'テストモード：顧客はPeachPayを見ることができません',
        'ro-RO': 'Mod de testare: clienții nu pot vedea PeachPay',
        ar: 'وضع الاختبار: لا يمكن للعملاء رؤية PeachPay',
        ca: 'Mode de prova: els clients no poden veure PeachPay',
        'cs-CZ': 'Testovací režim: zákazníci nevidí PeachPay',
        'da-DK': 'Testtilstand: kunder kan ikke se PeachPay',
        el: 'Λειτουργία δοκιμής: οι πελάτες δεν μπορούν να δουν το PeachPay',
        'hi-IN': 'परीक्षण मोड: ग्राहक पीचपे नहीं देख सकते हैं',
        'ko-KR': '테스트 모드: 고객이 PeachPay를 볼 수 없습니다.',
        'lb-LU': 'Testmodus: Clienten kënnen PeachPay net gesinn',
        'nl-NL': 'Testmodus: klanten kunnen PeachPay niet zien',
        'pt-PT': 'Modo de teste: os clientes não podem ver o PeachPay',
        'ru-RU': 'Тестовый режим: клиенты не видят PeachPay',
        'sl-SI': 'Testni način: stranke ne vidijo PeachPay',
        'sv-SE': 'Testläge: kunder kan inte se PeachPay',
        th: 'โหมดทดสอบ: ลูกค้าไม่สามารถเห็น PeachPay',
        uk: 'Тестовий режим: клієнти не можуть бачити PeachPay',
        'zh-CN': '测试模式：客户看不到PeachPay',
        'zh-TW': '測試模式：客戶看不到PeachPay'
    },
    'I verify that the country I have entered is the one I reside in': {
        'de-DE': 'Ich bestätige, dass das Land, in dem ich eingereist bin, das Land ist, in dem ich wohne',
        'en-US': 'I verify that the country I have entered is the one I reside in',
        'es-ES': 'Verifico que el país al que he entrado es en el que resido',
        fr: 'Je vérifie que le pays dans lequel je suis entré est celui dans lequel je réside',
        it: 'Verifico che il paese in cui sono entrato sia quello in cui risiedo',
        ja: '入力した国が居住国であることを確認します',
        'ro-RO': 'Verific că țara în care am intrat este cea în care locuiesc',
        ar: 'أتحقق من أن البلد الذي أدخلته هو البلد الذي أقيم فيه',
        ca: 'Verifico que el país on he entrat és el on visc',
        'cs-CZ': 'Ověřuji, že země, do které jsem zadal, je zemí, ve které bydlím',
        'da-DK': 'Jeg bekræfter, at det land, jeg har indtastet, er det, jeg bor i',
        el: 'Επαληθεύω ότι η χώρα στην οποία έχω εισέλθει είναι αυτή στην οποία διαμένω',
        'hi-IN': 'मैं सत्यापित करता/करती हूं कि जिस देश में मैंने प्रवेश किया है वह वही देश है जिसमें मैं रहता हूं',
        'ko-KR': '내가 입력한 국가가 내가 거주하는 국가인지 확인합니다.',
        'lb-LU': 'Ech verifizéieren datt d\'Land wou ech aginn hunn ass deen an deem ech wunnen',
        'nl-NL': 'Ik verifieer dat het land dat ik heb ingevoerd het land is waarin ik woon',
        'pt-PT': 'Eu verifico se o país que eu inseri é aquele em que resido',
        'ru-RU': 'Я подтверждаю, что страна, в которую я въехал, является той, в которой я проживаю',
        'si-SI': 'Potrjujem, da je država, v katero sem vstopil, tista, v kateri prebivam',
        'si-SE': 'Jag verifierar att det land jag har angett är det jag bor i',
        th: 'ฉันยืนยันว่าประเทศที่ฉันเข้ามาเป็นประเทศที่ฉันอาศัยอยู่',
        uk: 'Я підтверджую, що країна, в яку я ввійшов, є тією, в якій я проживаю',
        'zh-CN': '我确认我进入的国家是我居住的国家',
        'zh-TW': '我確認我進入的國家是我居住的國家'
    }
};
var Feature = {
    enabled: function (flag) { var _a, _b; return (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : false; },
    version: function (flag) { var _a, _b; return (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : 0; },
    metaData: function (flag, key) { var _a, _b, _c; return (_c = (_b = (_a = store.getState().environment.plugin.featureSupport[flag]) === null || _a === void 0 ? void 0 : _a.meta_data) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : null; }
};
var FeatureFlag;
(function (FeatureFlag1) {
    FeatureFlag1["CART_CALCULATION"] = 'cart_calculation';
    FeatureFlag1["COUPON_INPUT"] = 'coupon_input';
    FeatureFlag1["GIFTCARD_INPUT"] = 'giftcard_input';
    FeatureFlag1["ORDER_NOTES"] = 'order_notes_input';
    FeatureFlag1["ADDITIONAL_FIELDS"] = 'additional_fields';
    FeatureFlag1["STRIPE"] = 'stripe_payment_method';
    FeatureFlag1["STRIPE_PAYMENT_REQUEST"] = 'stripe_payment_request';
    FeatureFlag1["QUANTITY_CHANGER"] = 'quantity_changer';
    FeatureFlag1["CURRENCY_SWITCHER_INPUT"] = 'currency_switcher_input';
})(FeatureFlag || (FeatureFlag = {}));
var updateCustomerStripeId = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_STRIPE_ID);
var updateCustomer = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER);
var updateCustomerShippingShortAddress = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_SHIPPING);
var updatePreferredPaymentMethod = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_PAYMENT_METHOD);
var PeachPayCustomer = {
    data: function () { return store.getState().peachPayCustomer; },
    email: function () { return store.getState().peachPayCustomer.email; },
    firstName: function () { return store.getState().peachPayCustomer.name_first; },
    lastName: function () { return store.getState().peachPayCustomer.name_last; },
    phone: function () { return store.getState().peachPayCustomer.phone; },
    address1: function () { return store.getState().peachPayCustomer.address1; },
    address2: function () { return store.getState().peachPayCustomer.address2; },
    city: function () { return store.getState().peachPayCustomer.city; },
    state: function () { return store.getState().peachPayCustomer.state; },
    country: function () { return store.getState().peachPayCustomer.country; },
    postal: function () { return store.getState().peachPayCustomer.postal; },
    card: function () { return store.getState().peachPayCustomer.card; },
    preferredPaymentMethod: function () { var _a; return (_a = store.getState().peachPayCustomer.payment_option) !== null && _a !== void 0 ? _a : 'stripe'; },
    stripeId: function () { var _a; return (_a = store.getState().peachPayCustomer.stripe_customer_id) !== null && _a !== void 0 ? _a : ''; },
    stripeDetails: function () { return ({
        name: store.getState().peachPayCustomer.name_first + ' ' + store.getState().peachPayCustomer.name_last,
        email: store.getState().peachPayCustomer.email,
        phone: store.getState().peachPayCustomer.phone
    }); },
    shortAddress: function () { return ({
        country: PeachPayCustomer.country(),
        state: PeachPayCustomer.state(),
        city: PeachPayCustomer.city(),
        postcode: PeachPayCustomer.postal()
    }); },
    shippingAddress: function () { return ({
        shipping_first_name: PeachPayCustomer.firstName(),
        shipping_last_name: PeachPayCustomer.lastName(),
        shipping_company: '',
        shipping_country: PeachPayCustomer.country(),
        shipping_address_1: PeachPayCustomer.address1(),
        shipping_address_2: PeachPayCustomer.address2(),
        shipping_city: PeachPayCustomer.city(),
        shipping_state: PeachPayCustomer.state(),
        shipping_postcode: PeachPayCustomer.postal()
    }); },
    billingAddress: function () { return ({
        billing_first_name: PeachPayCustomer.firstName(),
        billing_last_name: PeachPayCustomer.lastName(),
        billing_company: '',
        billing_email: PeachPayCustomer.email(),
        billing_phone: PeachPayCustomer.phone(),
        billing_country: PeachPayCustomer.country(),
        billing_address_1: PeachPayCustomer.address1(),
        billing_address_2: PeachPayCustomer.address2(),
        billing_city: PeachPayCustomer.city(),
        billing_state: PeachPayCustomer.state(),
        billing_postcode: PeachPayCustomer.postal()
    }); }
};
function updateCustomerMerchantAccount(merchantCustomer) {
    return {
        type: DispatchActionType.MERCHANT_CUSTOMER,
        payload: merchantCustomer
    };
}
function updateCustomerMerchantAccountExistence(exist) {
    return {
        type: DispatchActionType.MERCHANT_CUSTOMER_EXIST,
        payload: exist
    };
}
var MerchantCustomer = {
    loggedIn: function () { return store.getState().merchantCustomer.loggedIn; },
    usernameExist: function () { return store.getState().merchantCustomer.usernameIsRegistered; }
};
var updateSessionId = createDispatchUpdate(DispatchActionType.ORDER_SESSIONID);
var updateCustomerAddressValidation = createDispatchUpdate(DispatchActionType.ORDER_ADDRESS_VALIDATED);
var setExtraFields = createDispatchUpdate(DispatchActionType.ORDER_SET_EXTRA_FIELDS);
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
    customerAddressValidated: function () { return store.getState().peachPayOrder.customerAddressValidated; },
    extraFieldsRecord: function () { return store.getState().peachPayOrder.additionalFields; }
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
            cost = Math.ceil(cost);
            break;
        case 'down':
            cost = Math.floor(cost);
            break;
        case 'nearest':
            cost = Math.round(cost);
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
function selectDropdown($select, value) {
    if (!$select) {
        return;
    }
    $select.value = value;
}
function formEntry(formData, key) {
    var _a;
    if (formData.get(key) === null) {
        return '';
    }
    return (_a = formData.get(key)) !== null && _a !== void 0 ? _a : '';
}
function getCountryName(countryCode) {
    var _a, _b;
    if (!peachpayCountries[countryCode]) {
        return 'Unknown Country Code: ' + countryCode;
    }
    return (_b = (_a = peachpayCountries === null || peachpayCountries === void 0 ? void 0 : peachpayCountries[countryCode]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown Country Code: ' + countryCode;
}
function stateProvinceOrCounty(countryCode) {
    switch (countryCode) {
        case 'US':
        case 'MY':
        case 'AU':
            return getLocaleText('Select a State');
        case 'GB':
            return getLocaleText('county');
        default:
            return getLocaleText('Select a Province');
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
var peachpayCountries = {
    AF: {
        name: 'Afghanistan'
    },
    AX: {
        name: 'Åland Islands'
    },
    AL: {
        name: 'Albania'
    },
    DZ: {
        name: 'Algeria'
    },
    AS: {
        name: 'American Samoa'
    },
    AD: {
        name: 'Andorra'
    },
    AO: {
        name: 'Angola'
    },
    AI: {
        name: 'Anguilla'
    },
    AQ: {
        name: 'Antarctica'
    },
    AG: {
        name: 'Antigua and Barbuda'
    },
    AR: {
        name: 'Argentina'
    },
    AM: {
        name: 'Armenia'
    },
    AW: {
        name: 'Aruba'
    },
    AU: {
        name: 'Australia'
    },
    AT: {
        name: 'Austria'
    },
    AZ: {
        name: 'Azerbaijan'
    },
    BS: {
        name: 'Bahamas'
    },
    BH: {
        name: 'Bahrain'
    },
    BD: {
        name: 'Bangladesh'
    },
    BB: {
        name: 'Barbados'
    },
    BY: {
        name: 'Belarus'
    },
    BE: {
        name: 'Belgium'
    },
    BZ: {
        name: 'Belize'
    },
    BJ: {
        name: 'Benin'
    },
    BM: {
        name: 'Bermuda'
    },
    BT: {
        name: 'Bhutan'
    },
    BO: {
        name: 'Bolivia, Plurinational State of'
    },
    BQ: {
        name: 'Bonaire, Sint Eustatius and Saba'
    },
    BA: {
        name: 'Bosnia and Herzegovina'
    },
    BW: {
        name: 'Botswana'
    },
    BV: {
        name: 'Bouvet Island'
    },
    BR: {
        name: 'Brazil'
    },
    IO: {
        name: 'British Indian Ocean Territory'
    },
    BN: {
        name: 'Brunei Darussalam'
    },
    BG: {
        name: 'Bulgaria'
    },
    BF: {
        name: 'Burkina Faso'
    },
    BI: {
        name: 'Burundi'
    },
    KH: {
        name: 'Cambodia'
    },
    CM: {
        name: 'Cameroon'
    },
    CA: {
        name: 'Canada'
    },
    CV: {
        name: 'Cape Verde'
    },
    KY: {
        name: 'Cayman Islands'
    },
    CF: {
        name: 'Central African Republic'
    },
    TD: {
        name: 'Chad'
    },
    CL: {
        name: 'Chile'
    },
    CN: {
        name: 'China'
    },
    CX: {
        name: 'Christmas Island'
    },
    CC: {
        name: 'Cocos (Keeling) Islands'
    },
    CO: {
        name: 'Colombia'
    },
    KM: {
        name: 'Comoros'
    },
    CG: {
        name: 'Congo'
    },
    CD: {
        name: 'Congo, the Democratic Republic of the'
    },
    CK: {
        name: 'Cook Islands'
    },
    CR: {
        name: 'Costa Rica'
    },
    CI: {
        name: 'Côte d\'Ivoire'
    },
    HR: {
        name: 'Croatia'
    },
    CU: {
        name: 'Cuba'
    },
    CW: {
        name: 'Curaçao'
    },
    CY: {
        name: 'Cyprus'
    },
    CZ: {
        name: 'Czech Republic'
    },
    DK: {
        name: 'Denmark'
    },
    DJ: {
        name: 'Djibouti'
    },
    DM: {
        name: 'Dominica'
    },
    DO: {
        name: 'Dominican Republic'
    },
    EC: {
        name: 'Ecuador'
    },
    EG: {
        name: 'Egypt'
    },
    SV: {
        name: 'El Salvador'
    },
    GQ: {
        name: 'Equatorial Guinea'
    },
    ER: {
        name: 'Eritrea'
    },
    EE: {
        name: 'Estonia'
    },
    ET: {
        name: 'Ethiopia'
    },
    FK: {
        name: 'Falkland Islands (Malvinas)'
    },
    FO: {
        name: 'Faroe Islands'
    },
    FJ: {
        name: 'Fiji'
    },
    FI: {
        name: 'Finland'
    },
    FR: {
        name: 'France'
    },
    GF: {
        name: 'French Guiana'
    },
    PF: {
        name: 'French Polynesia'
    },
    TF: {
        name: 'French Southern Territories'
    },
    GA: {
        name: 'Gabon'
    },
    GM: {
        name: 'Gambia'
    },
    GE: {
        name: 'Georgia'
    },
    DE: {
        name: 'Germany'
    },
    GH: {
        name: 'Ghana'
    },
    GI: {
        name: 'Gibraltar'
    },
    GR: {
        name: 'Greece'
    },
    GL: {
        name: 'Greenland'
    },
    GD: {
        name: 'Grenada'
    },
    GP: {
        name: 'Guadeloupe'
    },
    GU: {
        name: 'Guam'
    },
    GT: {
        name: 'Guatemala'
    },
    GG: {
        name: 'Guernsey'
    },
    GN: {
        name: 'Guinea'
    },
    GW: {
        name: 'Guinea-Bissau'
    },
    GY: {
        name: 'Guyana'
    },
    HT: {
        name: 'Haiti'
    },
    HM: {
        name: 'Heard Island and McDonald Islands'
    },
    VA: {
        name: 'Holy See (Vatican City State)'
    },
    HN: {
        name: 'Honduras'
    },
    HK: {
        name: 'Hong Kong'
    },
    HU: {
        name: 'Hungary'
    },
    IS: {
        name: 'Iceland'
    },
    IN: {
        name: 'India'
    },
    ID: {
        name: 'Indonesia'
    },
    IR: {
        name: 'Iran, Islamic Republic of'
    },
    IQ: {
        name: 'Iraq'
    },
    IE: {
        name: 'Ireland'
    },
    IM: {
        name: 'Isle of Man'
    },
    IL: {
        name: 'Israel'
    },
    IT: {
        name: 'Italy'
    },
    JM: {
        name: 'Jamaica'
    },
    JP: {
        name: 'Japan'
    },
    JE: {
        name: 'Jersey'
    },
    JO: {
        name: 'Jordan'
    },
    KZ: {
        name: 'Kazakhstan'
    },
    KE: {
        name: 'Kenya'
    },
    KI: {
        name: 'Kiribati'
    },
    KP: {
        name: 'Korea Democratic People\'s Republic of'
    },
    KR: {
        name: 'Korea Republic of'
    },
    KW: {
        name: 'Kuwait'
    },
    KG: {
        name: 'Kyrgyzstan'
    },
    LA: {
        name: 'Lao People\'s Democratic Republic'
    },
    LV: {
        name: 'Latvia'
    },
    LB: {
        name: 'Lebanon'
    },
    LS: {
        name: 'Lesotho'
    },
    LR: {
        name: 'Liberia'
    },
    LY: {
        name: 'Libya'
    },
    LI: {
        name: 'Liechtenstein'
    },
    LT: {
        name: 'Lithuania'
    },
    LU: {
        name: 'Luxembourg'
    },
    MO: {
        name: 'Macao'
    },
    MK: {
        name: 'Macedonia, the former Yugoslav Republic of'
    },
    MG: {
        name: 'Madagascar'
    },
    MW: {
        name: 'Malawi'
    },
    MY: {
        name: 'Malaysia'
    },
    MV: {
        name: 'Maldives'
    },
    ML: {
        name: 'Mali'
    },
    MT: {
        name: 'Malta'
    },
    MH: {
        name: 'Marshall Islands'
    },
    MQ: {
        name: 'Martinique'
    },
    MR: {
        name: 'Mauritania'
    },
    MU: {
        name: 'Mauritius'
    },
    YT: {
        name: 'Mayotte'
    },
    MX: {
        name: 'Mexico'
    },
    FM: {
        name: 'Micronesia, Federated States of'
    },
    MD: {
        name: 'Moldova, Republic of'
    },
    MC: {
        name: 'Monaco'
    },
    MN: {
        name: 'Mongolia'
    },
    ME: {
        name: 'Montenegro'
    },
    MS: {
        name: 'Montserrat'
    },
    MA: {
        name: 'Morocco'
    },
    MZ: {
        name: 'Mozambique'
    },
    MM: {
        name: 'Myanmar'
    },
    NA: {
        name: 'Namibia'
    },
    NR: {
        name: 'Nauru'
    },
    NP: {
        name: 'Nepal'
    },
    NL: {
        name: 'Netherlands'
    },
    NC: {
        name: 'New Caledonia'
    },
    NZ: {
        name: 'New Zealand'
    },
    NI: {
        name: 'Nicaragua'
    },
    NE: {
        name: 'Niger'
    },
    NG: {
        name: 'Nigeria'
    },
    NU: {
        name: 'Niue'
    },
    NF: {
        name: 'Norfolk Island'
    },
    MP: {
        name: 'Northern Mariana Islands'
    },
    NO: {
        name: 'Norway'
    },
    OM: {
        name: 'Oman'
    },
    PK: {
        name: 'Pakistan'
    },
    PW: {
        name: 'Palau'
    },
    PS: {
        name: 'Palestinian Territory'
    },
    PA: {
        name: 'Panama'
    },
    PG: {
        name: 'Papua New Guinea'
    },
    PY: {
        name: 'Paraguay'
    },
    PE: {
        name: 'Peru'
    },
    PH: {
        name: 'Philippines'
    },
    PN: {
        name: 'Pitcairn'
    },
    PL: {
        name: 'Poland'
    },
    PT: {
        name: 'Portugal'
    },
    PR: {
        name: 'Puerto Rico'
    },
    QA: {
        name: 'Qatar'
    },
    RE: {
        name: 'Réunion'
    },
    RO: {
        name: 'Romania'
    },
    RU: {
        name: 'Russian Federation'
    },
    RW: {
        name: 'Rwanda'
    },
    BL: {
        name: 'Saint Barthélemy'
    },
    SH: {
        name: 'Saint Helena, Ascension and Tristan da Cunha'
    },
    KN: {
        name: 'Saint Kitts and Nevis'
    },
    LC: {
        name: 'Saint Lucia'
    },
    MF: {
        name: 'Saint Martin (French part)'
    },
    PM: {
        name: 'Saint Pierre and Miquelon'
    },
    VC: {
        name: 'Saint Vincent and the Grenadines'
    },
    WS: {
        name: 'Samoa'
    },
    SM: {
        name: 'San Marino'
    },
    ST: {
        name: 'Sao Tome and Principe'
    },
    SA: {
        name: 'Saudi Arabia'
    },
    SN: {
        name: 'Senegal'
    },
    RS: {
        name: 'Serbia'
    },
    SC: {
        name: 'Seychelles'
    },
    SL: {
        name: 'Sierra Leone'
    },
    SG: {
        name: 'Singapore'
    },
    SX: {
        name: 'Sint Maarten (Dutch part)'
    },
    SK: {
        name: 'Slovakia'
    },
    SI: {
        name: 'Slovenia'
    },
    SB: {
        name: 'Solomon Islands'
    },
    SO: {
        name: 'Somalia'
    },
    ZA: {
        name: 'South Africa'
    },
    GS: {
        name: 'South Georgia and the South Sandwich Islands'
    },
    SS: {
        name: 'South Sudan'
    },
    ES: {
        name: 'Spain'
    },
    LK: {
        name: 'Sri Lanka'
    },
    SD: {
        name: 'Sudan'
    },
    SR: {
        name: 'Suriname'
    },
    SJ: {
        name: 'Svalbard and Jan Mayen'
    },
    SZ: {
        name: 'Swaziland'
    },
    SE: {
        name: 'Sweden'
    },
    CH: {
        name: 'Switzerland'
    },
    SY: {
        name: 'Syrian Arab Republic'
    },
    TW: {
        name: 'Taiwan'
    },
    TJ: {
        name: 'Tajikistan'
    },
    TZ: {
        name: 'Tanzania United Republic of'
    },
    TH: {
        name: 'Thailand'
    },
    TL: {
        name: 'Timor-Leste'
    },
    TG: {
        name: 'Togo'
    },
    TK: {
        name: 'Tokelau'
    },
    TO: {
        name: 'Tonga'
    },
    TT: {
        name: 'Trinidad and Tobago'
    },
    TN: {
        name: 'Tunisia'
    },
    TR: {
        name: 'Turkey'
    },
    TM: {
        name: 'Turkmenistan'
    },
    TC: {
        name: 'Turks and Caicos Islands'
    },
    TV: {
        name: 'Tuvalu'
    },
    UG: {
        name: 'Uganda'
    },
    UA: {
        name: 'Ukraine'
    },
    AE: {
        name: 'United Arab Emirates'
    },
    GB: {
        name: 'United Kingdom'
    },
    US: {
        name: 'United States'
    },
    UM: {
        name: 'United States Minor Outlying Islands'
    },
    UY: {
        name: 'Uruguay'
    },
    UZ: {
        name: 'Uzbekistan'
    },
    VU: {
        name: 'Vanuatu'
    },
    VE: {
        name: 'Venezuela, Bolivarian Republic of'
    },
    VN: {
        name: 'Vietnam'
    },
    VG: {
        name: 'Virgin Islands'
    },
    VI: {
        name: 'Virgin Islands, U.S'
    },
    WF: {
        name: 'Wallis and Futuna'
    },
    EH: {
        name: 'Western Sahara'
    },
    YE: {
        name: 'Yemen'
    },
    ZM: {
        name: 'Zambia'
    },
    ZW: {
        name: 'Zimbabwe'
    }
};
var GLOBAL = {
    completedOrder: null,
    phpData: null,
    linkedProductsIds: []
};
function peachpayAlert(message, action) {
    var _a;
    if (action === void 0) { action = ''; }
    if ((_a = GLOBAL === null || GLOBAL === void 0 ? void 0 : GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.alertSupport) {
        window.parent.postMessage({
            event: 'peachpayAlert',
            action: action,
            message: message
        }, '*');
    }
    else {
        alert(message);
        if (action) {
            window.parent.postMessage(action, '*');
        }
    }
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
                    return [4, fetchWindowData(iFrameWindow, 'pp-get-existing-customer-data')];
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
function cartIsVirtual(cart) {
    var _a;
    if ((cart === null || cart === void 0 ? void 0 : cart.length) === 0) {
        return true;
    }
    return (_a = cart === null || cart === void 0 ? void 0 : cart.every(function (v) { return v.virtual; })) !== null && _a !== void 0 ? _a : true;
}
function itemsInCart(cart) {
    var _a;
    return (_a = cart === null || cart === void 0 ? void 0 : cart.length) !== null && _a !== void 0 ? _a : 0;
}
function cartItemQuantity(cartItem) {
    var _a;
    return typeof (cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) === 'string' ? Number.parseInt(cartItem.quantity) : (_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) !== null && _a !== void 0 ? _a : 0;
}
function restrictedCartProductsByCountry(cart, selectedCountryCode) {
    return cart.filter(function (v) {
        if (v.wc_country_base_restrictions) {
            if (v.wc_country_base_restrictions.type === 'specific' && !v.wc_country_base_restrictions.countries.includes(selectedCountryCode)) {
                return true;
            }
            if (v.wc_country_base_restrictions.type === 'excluded' && v.wc_country_base_restrictions.countries.includes(selectedCountryCode)) {
                return true;
            }
        }
        return false;
    });
}
function validateCartItemsWithCustomer(cart, useLocalStorage) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var customer, countryValue, invalidCartItems_1, invalidCartItems;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, getCustomer()];
                case 1:
                    customer = _c.sent();
                    countryValue = (_b = (_a = $qs('#country')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
                    if (useLocalStorage && customer) {
                        invalidCartItems_1 = restrictedCartProductsByCountry(cart, customer.country);
                        if (invalidCartItems_1.length === 0) {
                            return [2, true];
                        }
                        peachpayAlert("The following cart items cannot be shipped to ".concat(getCountryName(countryValue), ":\n ").concat(invalidCartItems_1.map(function (v) { return v.name; }).join(','), ".\n Please remove them from your cart."), 'closeModal');
                        return [2, false];
                    }
                    invalidCartItems = restrictedCartProductsByCountry(cart, countryValue);
                    if (invalidCartItems.length === 0) {
                        return [2, true];
                    }
                    peachpayAlert("The following cart items cannot be shipped to ".concat(getCountryName(countryValue), ":\n ").concat(invalidCartItems.map(function (v) { return v.name; }).join(','), ".\n Please remove them from your cart."), 'closeModal');
                    return [2, false];
            }
        });
    });
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
function initMerchantAccount(message) {
    var _a, _b, _c, _d, _e, _f, _g;
    initMerchantAccountEvents();
    var accountDetails = message.phpData.merchant_customer_account;
    store.dispatch(updateMerchantAccountConfig({
        allowGuestCheckout: (_a = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.allow_guest_checkout) !== null && _a !== void 0 ? _a : true,
        allowAccountCreationOrLoginDuringCheckout: (_b = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.logins_and_registrations_enabled) !== null && _b !== void 0 ? _b : true,
        autoGenerateUsername: (_c = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.auto_generate_username) !== null && _c !== void 0 ? _c : false,
        autoGeneratePassword: (_d = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.auto_generate_password) !== null && _d !== void 0 ? _d : false
    }));
    store.dispatch(updateCustomerMerchantAccount({
        username: (_e = accountDetails.email) !== null && _e !== void 0 ? _e : '',
        loggedIn: (_f = accountDetails.logged_in) !== null && _f !== void 0 ? _f : false,
        usernameIsRegistered: (_g = accountDetails.logged_in) !== null && _g !== void 0 ? _g : false
    }));
}
function initMerchantAccountEvents() {
    var _a;
    store.subscribe(function () {
        renderMerchantCustomerAccountPasswordInput(MerchantConfiguration.hostName(), !Environment.customer.existing() && Environment.modalUI.page() === 'payment');
    });
    (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        requestMerchantAccountExistence(PeachPayCustomer.email());
    });
    onWindowMessage('emailExist', function (message) {
        store.dispatch(updateCustomerMerchantAccountExistence(Boolean(message.emailResult)));
    });
}
function requestMerchantAccountExistence(email) {
    var _a;
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage({
        event: 'emailExist',
        email: email
    }, '*');
}
function getMerchantCustomerAccountPasswordValue() {
    var $input = $qs('#account-password');
    var $inputExisting = $qs('#account-password-existing');
    if (!$input || !$inputExisting) {
        return '';
    }
    if ($inputExisting.value !== '') {
        return $inputExisting.value;
    }
    return $input.value;
}
function validateMerchantCustomerPasswordField() {
    var password = getMerchantCustomerAccountPasswordValue();
    var $redText = $qs('#account-password-error');
    var $redTextExisting = $qs('#account-password-error-existing');
    if (!$redText || !$redTextExisting) {
        return false;
    }
    if (password === '' || password.length < 8) {
        $redText.textContent = getLocaleText('The password entered must be at least 8 characters long.');
        $redTextExisting.textContent = getLocaleText('The password entered must be at least 8 characters long.');
        return false;
    }
    $redText.textContent = '';
    $redTextExisting.textContent = '';
    return true;
}
function shouldShowMerchantCustomerAccountPasswordField() {
    if (MerchantCustomer.loggedIn()) {
        return false;
    }
    if (!Carts.subscriptionPresent()) {
        if (!MerchantConfiguration.accounts.allowGuestCheckout()) {
            if (MerchantConfiguration.accounts.generatePasswordEnabled() && !MerchantCustomer.usernameExist()) {
                return false;
            }
        }
        else {
            return false;
        }
        if (!MerchantConfiguration.accounts.loginDuringCheckoutEnabled() && !MerchantCustomer.usernameExist()) {
            return false;
        }
        if (MerchantConfiguration.accounts.generatePasswordEnabled() && !MerchantCustomer.usernameExist()) {
            return false;
        }
    }
    else {
        if (MerchantConfiguration.accounts.generatePasswordEnabled() && !MerchantCustomer.usernameExist()) {
            return false;
        }
    }
    return true;
}
function renderMerchantCustomerAccountPasswordInput(merchantHostname, onNewPaymentScreen) {
    if (onNewPaymentScreen === void 0) { onNewPaymentScreen = false; }
    var $input = $qs('#pp-account-password');
    var $inputExisting = $qs('#pp-account-password-existing');
    if (!$input || !$inputExisting) {
        return;
    }
    $input.value = '';
    $inputExisting.value = '';
    var labelHTML = getLocaleText('Create a new password, or use an existing one if you already have an account for') + ' ' + merchantHostname;
    $qs('#pp-account-password-label', function ($element) { return $element.innerHTML = labelHTML; });
    $qs('#pp-account-password-label-existing', function ($element) { return $element.innerHTML = labelHTML; });
    if (shouldShowMerchantCustomerAccountPasswordField()) {
        if (onNewPaymentScreen) {
            $input.classList.remove('hide');
        }
        else {
            $input.classList.add('hide');
        }
        $inputExisting.classList.remove('hide');
    }
    else {
        $input.classList.add('hide');
        $inputExisting.classList.add('hide');
    }
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
function checkDeliveryDateIsEmpty() {
    var _a, _b;
    return ((_b = (_a = $qs('#existing-delivery-date')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '') === '';
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
function initOrderNotes() {
    if (Feature.enabled(FeatureFlag.ORDER_NOTES)) {
        for (var _i = 0, _a = $qsAll('.order-notes'); _i < _a.length; _i++) {
            var $form = _a[_i];
            $form.classList.remove('hide');
        }
    }
}
function collectOrderNotes() {
    var orderNotes = $qs('#order-notes');
    var orderNotesExisting = $qs('#order-notes-existing');
    if (orderNotes !== null && orderNotesExisting !== null) {
        if (orderNotes.value !== '' && orderNotesExisting.value === '') {
            return orderNotes.value;
        }
        if (orderNotes.value === '' && orderNotesExisting.value !== '') {
            return orderNotesExisting.value;
        }
    }
    return '';
}
function syncOrderNotes(exitModule) {
    if (exitModule === void 0) { exitModule = false; }
    var orderNotesExisting = $qs('#order-notes-existing');
    var orderNotes = $qs('#order-notes');
    if (orderNotes !== null && orderNotesExisting !== null) {
        if (Environment.customer.existing() && orderNotes.value !== '' && exitModule) {
            orderNotesExisting.value = orderNotes.value;
            orderNotes.value = '';
            return;
        }
        if (orderNotesExisting.value !== '' && !exitModule) {
            orderNotes.value = orderNotesExisting.value;
            orderNotesExisting.value = '';
        }
    }
}
function initVAT(message) {
    initVatEvents();
    if (message.phpData.vat_self_verify === '1') {
        renderVerifyLocation();
    }
    var vatTypesRequiringID = message.phpData.vat_required === '1' || message.phpData.vat_required === '2' && isEUCountry(PeachPayCustomer.country());
    if (vatTypesRequiringID) {
        renderVATIDInput();
    }
}
function initVatEvents() {
    var _a;
    (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        var _a, _b;
        event.preventDefault();
        var vatTypesRequiringID = ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.vat_required) === '1' || ((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.vat_required) === '2' && isEUCountry(PeachPayCustomer.country());
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
        var $ppVat_1 = document.querySelector('#ppVatNumExisting');
        if (!$ppVat_1) {
            return '';
        }
        return (_a = $ppVat_1.value) !== null && _a !== void 0 ? _a : '';
    }
    var $ppVat = document.querySelector('#ppVatNumNew');
    if (!$ppVat) {
        return '';
    }
    return (_b = $ppVat.value) !== null && _b !== void 0 ? _b : '';
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
function determinePageType(isCartPage, isCheckoutPage) {
    if (isCartPage) {
        return 'cart';
    }
    if (isCheckoutPage) {
        return 'checkout';
    }
    return 'product';
}
function syncFields(event) {
    var $form = event.target.closest('form');
    var fieldRecord = {};
    for (var _i = 0, _a = Array.from($form.elements); _i < _a.length; _i++) {
        var $input = _a[_i];
        fieldRecord[$input.name] = $input.value;
    }
    store.dispatch(setExtraFields(fieldRecord));
}
function renderAdditionalFields(fieldData, fieldOrder) {
    var _a, _b, _c, _d;
    if (fieldData.length === 0 || fieldOrder.length === 0) {
        return;
    }
    (_a = $qs('#additional-fields-new')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    (_b = $qs('#additional-fields-existing')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    for (var _i = 0, fieldOrder_1 = fieldOrder; _i < fieldOrder_1.length; _i++) {
        var i = fieldOrder_1[_i];
        if (fieldData[i].field_enable) {
            generateFields(fieldData[i]);
        }
    }
    (_c = $qs('#additional-fields-new')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', syncFields);
    (_d = $qs('#additional-fields-existing')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', syncFields);
    store.subscribe(function () {
        renderExtraFields(PeachPayOrder.extraFieldsRecord());
    });
}
function renderExtraFields(extraFieldData) {
    var _loop_1 = function (key, value) {
        $qsAll("[name=\"".concat(key, "\"].extra-field"), function ($element) { return $element.value = value; });
    };
    for (var _i = 0, _a = Object.entries(extraFieldData); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        _loop_1(key, value);
    }
}
function generateFields(fieldData) {
    var field = function (location) { return '<div class="new-field">' + generateFieldElement(location, fieldData) + '</div>'; };
    var newPageElements = document.querySelector('#additional-fields-new');
    var exsitPageElement = document.querySelector('#additional-fields-existing');
    if (newPageElements) {
        newPageElements.innerHTML += field('-new');
    }
    if (exsitPageElement) {
        exsitPageElement.innerHTML += field('-existing');
    }
}
function generateFieldElement(location1, fieldData) {
    var elementString = '';
    var optional = '<span class="optional"> (optional) </span>';
    var required = '<abbr class="required" title="required" style="color:red;">*</abbr>';
    var labelBuilder = function (location) { return "\n\t\t<label for=\"".concat(fieldData.field_name).concat(location, "\" class=\"form-label-").concat(fieldData.type_list, "\" >") + "".concat(fieldData.field_label) + (fieldData.field_required ? required : optional) + '</label>'; };
    var inputBuilder = function (location) { return "<input type=".concat(fieldData.type_list, " \n\t\t\tname=").concat(fieldData.field_name, " \n\t\t\tid=\"").concat(fieldData.field_name).concat(location, "\"\n\t\t\tplaceholder=\" \"\n\t\t\tvalue=\"").concat(fieldData.field_default, "\" \n\t\t\tclass=\"input-box-").concat(fieldData.type_list, " extra-field\"") + (fieldData.field_required ? 'required' : '') + '/>'; };
    if (fieldData.type_list === 'text') {
        elementString = inputBuilder(location1) + (fieldData.field_label ? labelBuilder(location1) : '');
        return elementString;
    }
    return elementString;
}
function collectAdditionalFieldData(fieldData, fieldOrder) {
    var _a, _b;
    var fieldDataArray = [];
    for (var _i = 0, fieldOrder_2 = fieldOrder; _i < fieldOrder_2.length; _i++) {
        var orderNumber = fieldOrder_2[_i];
        if (fieldData[orderNumber].field_enable && ((_a = $qs("#".concat(fieldData[orderNumber].field_name, "-existing"))) === null || _a === void 0 ? void 0 : _a.value)) {
            var temporaryData = {
                name: ''
            };
            temporaryData.label = fieldData[orderNumber].field_label;
            temporaryData.name = fieldData[orderNumber].field_name;
            temporaryData.value = (_b = $qs("#".concat(fieldData[orderNumber].field_name, "-existing"))) === null || _b === void 0 ? void 0 : _b.value;
            fieldDataArray.push(temporaryData);
        }
    }
    return fieldDataArray;
}
function checkRequiredFields() {
    var _a, _b, _c, _d;
    if (Environment.customer.existing()) {
        return (_b = (_a = $qs('#additional-fields-existing')) === null || _a === void 0 ? void 0 : _a.reportValidity()) !== null && _b !== void 0 ? _b : false;
    }
    return (_d = (_c = $qs('#additional-fields-new')) === null || _c === void 0 ? void 0 : _c.reportValidity()) !== null && _d !== void 0 ? _d : false;
}
function captureSentryException(error, extra, fingerprint) {
    try {
        Sentry.withScope(function (scope) {
            if (extra) {
                try {
                    Object.entries(extra).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return scope.setExtra(key, value);
                    });
                }
                catch (_a) { }
            }
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
        placeOrder: placeOrder,
        setOrderStatus: setOrderStatus,
        setPaymentStatus: recordSuccessfulPayment,
        deprecated: {
            placeOrder: legacyPlaceOrder,
            setOrderStatus: legacySetOrderStatus
        }
    };
}
function initShipping(message) {
    initShippingEvents();
    store.dispatch(updateMerchantGeneralConfig(__assign(__assign({}, store.getState().merchantConfiguration.general), { wcLocationInfoData: message.phpData.wc_location_info })));
    store.dispatch(updateMerchantShippingConfig({
        shippingZones: Number.parseInt(message.phpData.num_shipping_zones)
    }));
}
function setOrderStatus(order, status, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!GLOBAL.phpData) {
                        return [2, ''];
                    }
                    request = {
                        session: {
                            id: PeachPayOrder.sessionId()
                        },
                        order: {
                            id: order.orderID,
                            status: status,
                            message: (_a = options.message) !== null && _a !== void 0 ? _a : '',
                            paymentMethod: PeachPayCustomer.preferredPaymentMethod(),
                            stripeCustomerId: PeachPayCustomer.preferredPaymentMethod() === 'stripe' ? options.stripeCustomerId : undefined,
                            paypalTransactionId: PeachPayCustomer.preferredPaymentMethod() === 'paypal' ? options.paypalTransactionId : undefined,
                            stripeTransactionId: PeachPayCustomer.preferredPaymentMethod() === 'stripe' ? options.stripeTransactionId : undefined
                        }
                    };
                    return [4, fetchHostWindowData('pp-set-order-status', request)];
                case 1:
                    if (_b.sent()) {
                        return [2, wcOrderReceivedURLWithParameters(GLOBAL.phpData.wc_order_received_url, order, MerchantConfiguration.hostName())];
                    }
                    return [2, ''];
            }
        });
    });
}
function placeOrder() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var requestMessage;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    requestMessage = {
                        session: {
                            id: PeachPayOrder.sessionId()
                        },
                        order: {
                            paymentMethod: PeachPayCustomer.preferredPaymentMethod(),
                            billingAddress: PeachPayCustomer.billingAddress(),
                            shippingAddress: PeachPayCustomer.shippingAddress(),
                            shippingMethods: PeachPayOrder.collectSelectedShipping(),
                            deliveryDate: collectDeliveryDate(),
                            merchantCustomerAccountPassword: '',
                            vatNum: '',
                            vatSelfVerify: '',
                            customerOrderNotes: collectOrderNotes()
                        }
                    };
                    if (shouldShowMerchantCustomerAccountPasswordField()) {
                        requestMessage.order.merchantCustomerAccountPassword = getMerchantCustomerAccountPasswordValue();
                    }
                    if ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.vat_required) {
                        requestMessage.order.vatNum = getVatNumber();
                    }
                    if ((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.vat_self_verify) {
                        requestMessage.order.vatSelfVerify = getVerify();
                    }
                    return [4, fetchHostWindowData('pp-place-order', requestMessage)];
                case 1: return [2, _c.sent()];
            }
        });
    });
}
function legacyPlaceOrder(isPaypal) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (((_a = GLOBAL === null || GLOBAL === void 0 ? void 0 : GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_woocommerce_order_delivery_active) && checkDeliveryDateIsEmpty()) {
        peachpayAlert('Please select delivery date.');
        store.dispatch(stopModalLoading());
        return;
    }
    var message = {
        'event': 'placeOrderDirectly',
        'sessionID': PeachPayOrder.sessionId(),
        'billingAddress': PeachPayCustomer.billingAddress(),
        'shippingAddress': PeachPayCustomer.shippingAddress(),
        'shipping_method': PeachPayOrder.collectSelectedShipping(),
        'deliveryDate': collectDeliveryDate(),
        'isProductPageButton': Environment.plugin.pageType() === 'product',
        'isPaypal': isPaypal !== null && isPaypal !== void 0 ? isPaypal : false,
        'merchantCustomerAccountPassword': '',
        'vatNum': '',
        'selfVerify': '',
        'customerOrderNotes': collectOrderNotes(),
        'additionalFields': Feature.enabled(FeatureFlag.ADDITIONAL_FIELDS) ? collectAdditionalFieldData((_c = (_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.additional_fields) !== null && _c !== void 0 ? _c : [], (_e = (_d = GLOBAL.phpData) === null || _d === void 0 ? void 0 : _d.additional_fields_order) !== null && _e !== void 0 ? _e : []) : [],
        'upsell_items': GLOBAL.linkedProductsIds
    };
    if (shouldShowMerchantCustomerAccountPasswordField()) {
        if (!validateMerchantCustomerPasswordField()) {
            store.dispatch(stopModalLoading());
            return;
        }
        message.merchantCustomerAccountPassword = getMerchantCustomerAccountPasswordValue();
    }
    if ((_f = GLOBAL.phpData) === null || _f === void 0 ? void 0 : _f.vat_required) {
        message.vatNum = getVatNumber();
    }
    if ((_g = GLOBAL.phpData) === null || _g === void 0 ? void 0 : _g.vat_self_verify) {
        message.selfVerify = getVerify();
    }
    window.parent.postMessage(message, '*');
}
function wcOrderReceivedURLWithParameters(wcOrderReceivedURL, order, domain) {
    if (!GLOBAL.phpData) {
        return '';
    }
    var s = domain === 'localhost' ? '' : 's';
    var port = domain === 'localhost' ? ':8000' : '';
    var url = wcOrderReceivedURL ? wcOrderReceivedURL : "http".concat(s, "://").concat(domain).concat(port, "/checkout/order-received");
    var orderID = order.id || order.details.id;
    var key = order.order_key || order.details.order_key;
    if (GLOBAL.phpData.plugin_woo_thank_you_page_nextmove_lite_active || domain === 'uberbracelets.com') {
        return "".concat(url.replace('/checkout', ''), "/thank-you/?order_id=").concat(orderID, "&key=").concat(key);
    }
    if (MerchantConfiguration.hostName() === 'rapidfiresupplies.co.uk') {
        return "http".concat(s, "://").concat(domain).concat(port, "/thank-you-for-purchasing-from-us/");
    }
    return "".concat(url, "/").concat(orderID, "/?key=").concat(key);
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
                            selected_shipping: PeachPayOrder.collectSelectedShipping(),
                            shipping_location: PeachPayCustomer.shortAddress()
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
function initShippingEvents() {
    var _this = this;
    var _a, _b, _c;
    store.subscribe(renderShipping);
    onWindowMessage('validateAddressSuccess', function (_) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(updateCustomerAddressValidation(true));
                    store.dispatch(updateEnvironment({
                        modalPageType: 'payment'
                    }));
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    }); });
    (_a = $qs('#pp-info-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        store.dispatch(startModalLoading());
        if (!validateCartItemsWithCustomer(DefaultCart.contents(), false)) {
            store.dispatch(stopModalLoading());
            return;
        }
        window.parent.postMessage({
            event: 'validateAddress',
            billingAddress: PeachPayCustomer.billingAddress()
        }, '*');
    });
    (_b = $qs('#pp-shipping-options-existing')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', handleShippingSelectionEvent);
    (_c = $qs('#pp-shipping-options')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', handleShippingSelectionEvent);
}
function validateAddress() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchHostWindowData('pp-validate-billing-address', PeachPayCustomer.billingAddress())];
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
    var _a, _b;
    renderOrderHeader(DefaultCart.contents());
    if (cartIsVirtual(DefaultCart.contents())) {
        (_a = $qs('#existing-checkout-delivery')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    }
    else {
        (_b = $qs('#existing-checkout-delivery')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
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
            $element1.classList.remove('hide');
        }
    }
    else {
        (_c = $qs('.shipping-address-header')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
        (_d = $qs('.billing-address-header')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
        for (var _h = 0, _j = $qsAll('.hide-for-virtual-carts'); _h < _j.length; _h++) {
            var $element = _j[_h];
            $element.classList.remove('hide');
        }
        for (var _k = 0, _l = $qsAll('.show-for-virtual-carts'); _k < _l.length; _k++) {
            var $element2 = _l[_k];
            $element2.classList.add('hide');
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
            shippingHTML += renderShippingPackageOptions(cartKey, shippingPackageKey, shippingPackage, cartCalculation.cart_meta);
        }
    }
    $qs('#pp-shipping-options', function ($element) { return $element.innerHTML = shippingHTML; });
    $qs('#pp-shipping-options-existing', function ($element) { return $element.innerHTML = shippingHTML; });
}
function renderShippingPackageOptions(cartKey, shippingPackageKey, shippingPackage, cartMeta) {
    var _a;
    var packageMethodKey = cartKey === '0' ? shippingPackageKey : "".concat(cartKey, "_").concat(shippingPackageKey);
    var methodOptionBuilder = function (methodKey, method, selected) { return "\n<label for=\"shipping_method_".concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\" style=\"margin: 0 0 3px 0; display: flex; flex-direction: row; cursor: pointer;\">\n\t<input style=\"vertical-align: top;\" id=\"shipping_method_").concat(packageMethodKey, "_").concat(methodKey.replace(/:/g, ''), "\" name=\"shipping_method[").concat(packageMethodKey, "]\" value=\"").concat(methodKey, "\" type=\"radio\" ").concat(selected ? 'checked' : '', " required>\n\t<span style=\"display: inline-block; flex-grow: 1;\">").concat(method.title, "</span>\n\t<span style=\"display: inline-block; min-width: 30%; text-align: right;\" class=\"shipping-price\">").concat(formatCurrencyString(method.total), "<span class=\"muted\">").concat(buildSubscriptionPriceMetaData(cartMeta), "</span></span>\n</label>"); };
    var packageNameHTML = "<h4 class=\"shipping-header color-change-text\">".concat((_a = shippingPackage.package_name) !== null && _a !== void 0 ? _a : getLocaleText('shipping'), "</h4>");
    var packageMethodOptionsHTML = Object.entries(shippingPackage.methods).map(function (_a) {
        var shippingMethodKey = _a[0], shippingMethod = _a[1];
        return shippingMethod ? methodOptionBuilder(shippingMethodKey, shippingMethod, shippingPackage.selected_method === shippingMethodKey) : '';
    }).join('');
    return "\n<div data-cart-key=\"".concat(cartKey, "\" data-package-key=\"").concat(shippingPackageKey, "\">\n\t").concat(packageNameHTML, "\n\t").concat(packageMethodOptionsHTML, "\n</div>");
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
    if (response.data) {
        store.dispatch(setOrderError(''));
        store.dispatch(updateCartCalculation(response.data.cart_calculation_record));
        store.dispatch(updateCustomerShippingShortAddress(response.data.shipping_location));
        if (DefaultCart.contents().length === 0) {
            store.dispatch(setOrderError("<span>".concat(getLocaleText('Cart is empty'), "</span>")));
        }
        else if (!shippingIsValid()) {
            store.dispatch(setOrderError("<span>".concat(getLocaleText('Sorry, this store does not ship to your location.'), "</span>")));
        }
    }
}
function productBundlesProductPage() {
    var _a;
    return ((_a = GLOBAL === null || GLOBAL === void 0 ? void 0 : GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_woocommerce_product_bundles_active) === '1' && !(Environment.plugin.pageType() === 'cart');
}
function recordSuccessfulPayment(sessionID, clearSession) {
    return fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/session/pay/record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sessionID: sessionID,
            clearSession: clearSession || false
        })
    });
}
function legacySetOrderStatus(order, _a) {
    var status = _a.status, message = _a.message, paymentType = _a.paymentType, transactionID = _a.transactionID;
    if (!GLOBAL.phpData) {
        return;
    }
    window.parent.postMessage({
        event: 'setOrderStatus',
        orderID: order.orderID,
        status: status,
        message: message,
        paymentType: paymentType,
        transactionID: transactionID,
        customerStripeId: PeachPayCustomer.stripeId(),
        redirectURL: wcOrderReceivedURLWithParameters(GLOBAL.phpData.wc_order_received_url, order, MerchantConfiguration.hostName())
    }, '*');
}
function renderShippingSection() {
    var _a, _b;
    if (PeachPayOrder.customerAddressValidated()) {
        (_a = $qs('#pp-shipping-payment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    else {
        (_b = $qs('#pp-shipping-payment')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
    }
}
function initCustomer(message) {
    initCustomerEvents();
    renderCountryAndStateList(message.phpData.wc_location_info);
}
function initCustomerEvents() {
    var _a, _b;
    (_a = $qs('#country')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', renderCorrectProvinceField);
    (_b = $qs('#pp-info-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function () { return setTimeout(syncCustomerFieldChanges); });
    var previousCustomerData = '';
    store.subscribe(function () {
        var customer = PeachPayCustomer.data();
        if (Environment.modalUI.page() === 'info') {
            var customerData = JSON.stringify(customer);
            if (customerData !== previousCustomerData) {
                previousCustomerData = customerData;
                renderCustomerFields(customer);
            }
        }
        if (Environment.modalUI.page() === 'payment') {
            renderCustomerHeader(customer, Environment.customer.existing());
            if (Environment.customer.existing()) {
                renderExistingCustomerCheckout(customer);
            }
        }
    });
}
function syncCustomerFieldChanges() {
    return __awaiter(this, void 0, void 0, function () {
        var $form, formData, previousAddressInfo, currentAddressInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $form = $qs('#pp-info-form');
                    if (!$form) {
                        return [2];
                    }
                    formData = new FormData($form);
                    previousAddressInfo = PeachPayCustomer.shortAddress();
                    store.dispatch(updateCustomer({
                        email: formEntry(formData, 'email'),
                        name_first: formEntry(formData, 'name_first'),
                        name_last: formEntry(formData, 'name_last'),
                        address1: formEntry(formData, 'address1'),
                        address2: formEntry(formData, 'address2'),
                        city: formEntry(formData, 'city'),
                        state: formEntry(formData, 'state'),
                        postal: formEntry(formData, 'postal'),
                        country: formEntry(formData, 'country'),
                        phone: formEntry(formData, 'phone')
                    }));
                    currentAddressInfo = PeachPayCustomer.shortAddress();
                    if (!(JSON.stringify(previousAddressInfo) !== JSON.stringify(currentAddressInfo) && currentAddressInfo.country !== '')) return [3, 2];
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function loadCustomer() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var customer, locationInfo;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, getCustomer()];
                case 1:
                    customer = _c.sent();
                    if (customer === null) {
                        locationInfo = MerchantConfiguration.general.wcLocationInfoData();
                        store.dispatch(updateCustomer(__assign(__assign({}, PeachPayCustomer.data()), { country: (_b = ((_a = locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.customer_default_country) !== null && _a !== void 0 ? _a : locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo.store_country)) !== null && _b !== void 0 ? _b : '' })));
                        return [2];
                    }
                    store.dispatch(updateCustomer(customer));
                    store.dispatch(updateEnvironment({
                        customerExists: true,
                        modalPageType: 'payment'
                    }));
                    return [2];
            }
        });
    });
}
function saveCustomerToBrowser(customerID, brand, last4, paymentOption) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, lastName, email, phone, address1, address2, postal, city, state, country, customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firstName = PeachPayCustomer.firstName, lastName = PeachPayCustomer.lastName, email = PeachPayCustomer.email, phone = PeachPayCustomer.phone, address1 = PeachPayCustomer.address1, address2 = PeachPayCustomer.address2, postal = PeachPayCustomer.postal, city = PeachPayCustomer.city, state = PeachPayCustomer.state, country = PeachPayCustomer.country;
                    customer = {
                        'name_first': firstName(),
                        'name_last': lastName(),
                        'email': email(),
                        'phone': phone(),
                        'address1': address1(),
                        'address2': address2(),
                        'postal': postal(),
                        'city': city(),
                        'state': state(),
                        'country': country(),
                        'stripe_customer_id': customerID,
                        'card': {
                            brand: brand,
                            last4: last4
                        },
                        'payment_option': paymentOption
                    };
                    return [4, setCustomer(customer)];
                case 1:
                    _a.sent();
                    return [2, customer];
            }
        });
    });
}
function displayCCLogo(customer) {
    var _a, _b;
    var ccBrand = '';
    switch ((_a = customer.card) === null || _a === void 0 ? void 0 : _a.brand) {
        case 'Visa':
            ccBrand = 'visa';
            break;
        case 'MasterCard':
            ccBrand = 'mastercard';
            break;
        case 'American Express':
            ccBrand = 'amex';
            break;
        case 'Discover':
            ccBrand = 'discover';
            break;
        case 'Diners Club':
            ccBrand = 'diners';
            break;
        case 'JCB':
            ccBrand = 'jcb';
            break;
        case 'UnionPay':
            ccBrand = 'unionpay';
            break;
        default:
            ccBrand = '';
    }
    (_b = $qs('#cc-' + ccBrand)) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
}
function renderExistingCustomerCheckout(customer) {
    var _a, _b, _c, _d, _e, _f;
    if (customer.payment_option === 'paypal') {
        (_a = $qs('#paypal-button-container-existing')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        if (((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.paypal) === '1') {
            (_c = $qs('#existing-checkout-card')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
            adjustOrderSummaryHeight(true);
        }
        else {
            (_d = $qs('#existing-checkout-card-number')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
            (_e = $qs('#existing-checkout-no-card')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        }
    }
    else {
        (_f = $qs('#paypal-button-container-existing')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
        adjustOrderSummaryHeight(false);
    }
}
function renderCorrectProvinceField() {
    var _a, _b, _c, _d, _e, _f;
    var merchantShipping = MerchantConfiguration.general.wcLocationInfoData();
    if (merchantShipping) {
        var $countries = $qs('#country');
        if (!$countries) {
            return;
        }
        var defaultOption_1 = stateProvinceOrCounty($countries.value);
        var stateOrProvinceOptions = (_b = merchantShipping.allowed_states_or_provinces[(_a = $countries.value) !== null && _a !== void 0 ? _a : '']) !== null && _b !== void 0 ? _b : {};
        if (stateOrProvinceOptions && Object.keys(stateOrProvinceOptions).length > 0) {
            var $stateOrProvincesSelect = $qs('#dynamic-states');
            if ($stateOrProvincesSelect) {
                $stateOrProvincesSelect.innerHTML = renderDropDownList(stateOrProvinceOptions, defaultOption_1);
                $stateOrProvincesSelect.disabled = false;
                $stateOrProvincesSelect.setAttribute('name', 'state');
                if (defaultOption_1 === getLocaleText('Select a Province')) {
                    $qs('label[for="dynamic-states"]', function ($element) { return $element.textContent = getLocaleText('province'); });
                }
                else if (defaultOption_1 === getLocaleText('Select a State')) {
                    $qs('label[for="dynamic-states"]', function ($element) { return $element.textContent = getLocaleText('state'); });
                }
                else {
                    $qs('label[for="dynamic-states"]', function ($element) { return $element.textContent = defaultOption_1; });
                }
                $stateOrProvincesSelect.required = true;
                $stateOrProvincesSelect.classList.remove('hide');
                (_c = $qs('label[for="dynamic-states"]')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
            }
            var $stateOrProvincesText = $qs('#province');
            if ($stateOrProvincesText) {
                $stateOrProvincesText.disabled = true;
                $stateOrProvincesText.setAttribute('name', 'off');
                $stateOrProvincesText.required = false;
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.add('hide');
                (_d = $qs('label[for="province"]')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
            }
        }
        else {
            var $stateOrProvincesSelect = $qs('#dynamic-states');
            if ($stateOrProvincesSelect) {
                $stateOrProvincesSelect.disabled = true;
                $stateOrProvincesSelect.setAttribute('name', 'off');
                $stateOrProvincesSelect.required = false;
                $stateOrProvincesSelect.classList.add('hide');
                (_e = $qs('label[for="dynamic-states"]')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
            }
            var $stateOrProvincesText = $qs('#province');
            if ($stateOrProvincesText) {
                $stateOrProvincesText.disabled = false;
                $stateOrProvincesText.setAttribute('name', 'state');
                if (defaultOption_1 === getLocaleText('Select a Province')) {
                    $qs('label[for="province"]', function ($element) { return $element.textContent = getLocaleText('province'); });
                }
                else if (defaultOption_1 === getLocaleText('Select a State')) {
                    $qs('label[for="province"]', function ($element) { return $element.textContent = getLocaleText('state'); });
                }
                else {
                    $qs('label[for="province"]', function ($element) { return $element.textContent = defaultOption_1; });
                }
                $stateOrProvincesText.value = '';
                $stateOrProvincesText.classList.remove('hide');
                (_f = $qs('label[for="province"]')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
            }
        }
    }
}
function renderCountryAndStateList(merchantLocationInfo) {
    if (!merchantLocationInfo) {
        console.warn('Warning: No WC Location info. Please update the PeachPay Plugin.');
        return;
    }
    var $countries = $qs('#country');
    if (!$countries) {
        return;
    }
    var selectACountry = getLocaleText('country');
    var countryOptions = merchantLocationInfo.allowed_countries;
    $countries.innerHTML = renderDropDownList(countryOptions, selectACountry);
    selectDropdown($countries, merchantLocationInfo.customer_default_country || merchantLocationInfo.store_country);
    if ($countries.options.length === 2) {
        $countries.selectedIndex = 1;
    }
    $countries.dispatchEvent(new Event('change'));
}
function renderCustomerFields(customer) {
    $qs('#pp-info-form input[name="name_first"]', function ($element) { return $element.value = customer.name_first; });
    $qs('#pp-info-form input[name="name_last"]', function ($element) { return $element.value = customer.name_last; });
    $qs('#pp-info-form input[name="email"]', function ($element) { return $element.value = customer.email; });
    $qs('#pp-info-form input[name="phone"]', function ($element) { return $element.value = customer.phone; });
    $qs('#pp-info-form input[name="address1"]', function ($element) { return $element.value = customer.address1; });
    $qs('#pp-info-form input[name="address2"]', function ($element) { return $element.value = customer.address2; });
    $qs('#pp-info-form input[name="postal"]', function ($element) { return $element.value = customer.postal; });
    $qs('#pp-info-form input[name="city"]', function ($element) { return $element.value = customer.city; });
    $qs('#pp-info-form input[name="country"]', function ($element) { return $element.value = customer.country; });
    renderCorrectProvinceField();
    $qs('#pp-info-form [name="state"]', function ($element) { return $element.value = customer.state; });
}
function renderCustomerHeader(customer, existingCustomer) {
    var _a, _b, _c, _d;
    if (existingCustomer) {
        $qs('#existing-email', function ($element) { return $element.textContent = customer.email; });
        $qs('#existing-name_first', function ($element) { return $element.textContent = customer.name_first; });
        $qs('#existing-name_last', function ($element) { return $element.textContent = customer.name_last; });
        $qs('#existing-address1', function ($element) { return $element.textContent = customer.address1; });
        $qs('#existing-address2', function ($element) { return $element.textContent = customer.address2 ? ' ' + customer.address2 : ''; });
        $qs('#existing-city', function ($element) { return $element.textContent = customer.city; });
        if (customer.country === 'JP') {
            var fullStateName_1 = (_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_location_info) === null || _b === void 0 ? void 0 : _b.allowed_states_or_provinces.JP[customer.state];
            $qs('#existing-state', function ($element) { return $element.textContent = fullStateName_1 !== null && fullStateName_1 !== void 0 ? fullStateName_1 : ''; });
        }
        else {
            $qs('#existing-state', function ($element) { return $element.textContent = customer.state; });
        }
        $qs('#existing-country', function ($element) { return $element.textContent = getCountryName(customer.country); });
        $qs('#existing-postal', function ($element) { return $element.textContent = customer.postal; });
        displayCCLogo(customer);
        $qs('#existing-last4', function ($element) { var _a, _b; return $element.textContent = (_b = (_a = customer === null || customer === void 0 ? void 0 : customer.card) === null || _a === void 0 ? void 0 : _a.last4) !== null && _b !== void 0 ? _b : ''; });
    }
    else {
        var fullAddress_1 = '';
        if (customer.country === 'JP') {
            var fullState = (_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.wc_location_info) === null || _d === void 0 ? void 0 : _d.allowed_states_or_provinces.JP[customer.state];
            fullAddress_1 = "".concat(customer.postal, ", ").concat(fullState !== null && fullState !== void 0 ? fullState : customer.state, ",  ").concat(customer.city, ", ").concat(customer.address1).concat(customer.address2 ? ' ' + customer.address2 : '');
        }
        else {
            fullAddress_1 = "".concat(customer.address1).concat(customer.address2 ? ' ' + customer.address2 + ', ' : ',', " ").concat(customer.city, ", ").concat(customer.state, " ").concat(customer.postal, ", ").concat(customer.country);
        }
        var fullName_1 = "".concat(customer.name_first, " ").concat(customer.name_last);
        $qs('.email', function ($element) { return $element.innerHTML = customer.email; });
        $qs('.full-name', function ($element) { return $element.innerHTML = fullName_1; });
        $qs('.pp-address', function ($element) { return $element.innerHTML = fullAddress_1; });
    }
}
function adjustOrderSummaryHeight(isPaypalUsed) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.enable_coupons) && GLOBAL.phpData.plugin_pw_woocommerce_gift_cards_active && GLOBAL.phpData.enable_order_notes && !productBundlesProductPage()) {
        isPaypalUsed ? $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '28rem'; }) : $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '32rem'; });
    }
    else if (((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.enable_coupons) && GLOBAL.phpData.plugin_pw_woocommerce_gift_cards_active && !GLOBAL.phpData.enable_order_notes && !productBundlesProductPage()) {
        isPaypalUsed ? $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '19rem'; }) : $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '23rem'; });
    }
    else if (((_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.enable_coupons) && !GLOBAL.phpData.plugin_pw_woocommerce_gift_cards_active && GLOBAL.phpData.enable_order_notes || !((_d = GLOBAL.phpData) === null || _d === void 0 ? void 0 : _d.enable_coupons) && ((_e = GLOBAL.phpData) === null || _e === void 0 ? void 0 : _e.plugin_pw_woocommerce_gift_cards_active) && GLOBAL.phpData.enable_order_notes && !productBundlesProductPage()) {
        isPaypalUsed ? $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '26.5rem'; }) : $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '29.5rem'; });
    }
    else if (!((_f = GLOBAL.phpData) === null || _f === void 0 ? void 0 : _f.enable_coupons) && !((_g = GLOBAL.phpData) === null || _g === void 0 ? void 0 : _g.plugin_pw_woocommerce_gift_cards_active) && ((_h = GLOBAL.phpData) === null || _h === void 0 ? void 0 : _h.enable_order_notes)) {
        isPaypalUsed ? $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '23rem'; }) : $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '26.5rem'; });
    }
    else if (((_j = GLOBAL.phpData) === null || _j === void 0 ? void 0 : _j.enable_coupons) || ((_k = GLOBAL.phpData) === null || _k === void 0 ? void 0 : _k.plugin_pw_woocommerce_gift_cards_active) && !productBundlesProductPage()) {
        isPaypalUsed ? $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '17rem'; }) : $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '21.5rem'; });
    }
    else if (isPaypalUsed) {
        $qs('#pp-summary-body-existing', function ($element) { return $element.style.maxHeight = '15rem'; });
    }
}
function initCurrency(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    initCurrencyEvents();
    store.dispatch(updateMerchantCurrencyConfig({
        code: (_b = (_a = message.phpData.currency_info) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : 'USD',
        symbol: (_e = (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.currency_info) === null || _d === void 0 ? void 0 : _d.symbol) !== null && _e !== void 0 ? _e : '$',
        thousands_separator: (_g = (_f = message.phpData.currency_info) === null || _f === void 0 ? void 0 : _f.thousands_separator) !== null && _g !== void 0 ? _g : ',',
        decimal_separator: (_j = (_h = message.phpData.currency_info) === null || _h === void 0 ? void 0 : _h.decimal_separator) !== null && _j !== void 0 ? _j : '.',
        number_of_decimals: (_l = (_k = message.phpData.currency_info) === null || _k === void 0 ? void 0 : _k.number_of_decimals) !== null && _l !== void 0 ? _l : 2,
        position: (_o = (_m = message.phpData.currency_info) === null || _m === void 0 ? void 0 : _m.position) !== null && _o !== void 0 ? _o : 'left',
        rounding: (_q = (_p = message.phpData.currency_info) === null || _p === void 0 ? void 0 : _p.rounding) !== null && _q !== void 0 ? _q : 'disabled'
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
    if (!Feature.enabled(FeatureFlag.GIFTCARD_INPUT) || productBundlesProductPage() || MerchantConfiguration.hostName() === 'skregear.com') {
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
        var _i, _a, $message, _b, _c, $message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!GLOBAL.phpData) {
                        return [2];
                    }
                    for (_i = 0, _a = $qsAll('.invalid-gift-card'); _i < _a.length; _i++) {
                        $message = _a[_i];
                        $message.classList.add('hide');
                    }
                    if (!message.success) {
                        hideGiftCardLoadingState();
                        for (_b = 0, _c = $qsAll('.invalid-gift-card'); _b < _c.length; _b++) {
                            $message = _c[_b];
                            $message.textContent = message.message;
                            $message.classList.remove('hide');
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
    var _loop_2 = function ($form) {
        $form.addEventListener('submit', function (event) {
            var _a, _b;
            event.preventDefault();
            if (!$form.checkValidity()) {
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
        _loop_2($form);
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
    if (!Feature.enabled(FeatureFlag.COUPON_INPUT) || Feature.version(FeatureFlag.COUPON_INPUT) < 2 && Environment.plugin.pageType() === 'product') {
        return;
    }
    showCouponEntrySupport();
    initCouponInputEvents();
}
function initCouponInputEvents() {
    var _this = this;
    onWindowMessage('coupon', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var _i, _a, $message, _b, _c, $message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    for (_i = 0, _a = $qsAll('.wc-invalid-coupon'); _i < _a.length; _i++) {
                        $message = _a[_i];
                        $message.classList.add('hide');
                    }
                    if (message.data && message.data.status === 404) {
                        hideCouponLoadingState();
                        for (_b = 0, _c = $qsAll('.wc-invalid-coupon'); _b < _c.length; _b++) {
                            $message = _c[_b];
                            $message.classList.remove('hide');
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
    }); });
    onWindowMessage('stopCouponLoading', function (_) {
        store.dispatch(stopModalLoading());
        hideCouponLoadingState();
    });
    var _loop_3 = function ($form) {
        $form.addEventListener('submit', function (event) {
            var _a, _b, _c;
            event.preventDefault();
            if (!$form.checkValidity()) {
                return;
            }
            store.dispatch(startModalLoading());
            showCouponLoadingState();
            var data = new FormData((_a = event.target) !== null && _a !== void 0 ? _a : undefined);
            var couponCode = (_c = (_b = data.get('coupon_code')) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '';
            window.parent.postMessage({
                event: 'fetchCoupon',
                code: couponCode
            }, '*');
        });
    };
    for (var _i = 0, _a = $qsAll('form.wc-coupon-code'); _i < _a.length; _i++) {
        var $form = _a[_i];
        _loop_3($form);
    }
    for (var _b = 0, _c = $qsAll('.coupon-code-option'); _b < _c.length; _b++) {
        var $openCoupon = _c[_b];
        $openCoupon.addEventListener('click', showCouponInput);
    }
    for (var _d = 0, _e = $qsAll('.exit-button-coupon'); _d < _e.length; _d++) {
        var $exitCoupon = _e[_d];
        $exitCoupon.addEventListener('click', hideCouponInput);
    }
    hideCouponLoadingState();
}
function showCouponEntrySupport() {
    var _a;
    for (var _i = 0, _b = $qsAll('.coupon-code-option'); _i < _b.length; _i++) {
        var $form = _b[_i];
        $form.classList.remove('hide');
    }
    (_a = $qs('#coupon-code-section')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
}
function showCouponInput() {
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
    var englishVariants = new Set([
        'en-AU',
        'en-CA',
        'en-GB',
        'en-NZ',
        'en-ZA'
    ]);
    if (englishVariants.has(language)) {
        language = 'en-US';
    }
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
    var _loop_4 = function ($input) {
        $input.addEventListener('invalid', function () {
            $input.setCustomValidity('Te rugăm sa completezi acest câmp.');
        });
        $input.addEventListener('input', function () {
            $input.setCustomValidity('');
        });
    };
    for (var _i = 0, _a = $qsAll('form input'); _i < _a.length; _i++) {
        var $input = _a[_i];
        _loop_4($input);
    }
}
function capitalizeFirstLetter(string) {
    var stringToUpper = String(string);
    return stringToUpper.charAt(0).toUpperCase() + stringToUpper.slice(1);
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
                            if (!$target.closest('.item-remover')) return [3, 2];
                            cartItemKey = $target.closest('.item-remover').dataset.qid;
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
    $qsAll('#pp-summary-body, #pp-summary-body-existing, #pp-summary-body-mobile', function ($cartContainer) {
        $cartContainer.addEventListener('click', function (event1) { return __awaiter(_this, void 0, void 0, function () {
            var $target, $button, cartItemKey, previousTimeoutId_1, currentValue_1, cartItemKey_1, cartItemKey;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $target = event1.target;
                        if (!$target.closest('.qty-btn') && !$target.closest('.qty-fs') && !$target.closest('.item-remover')) {
                            return [2];
                        }
                        if (!$target.closest('.qty-btn')) return [3, 5];
                        $button = $target.closest('.qty-btn');
                        cartItemKey = $button.dataset.qid;
                        if (!$button.classList.contains('decrease-qty')) return [3, 2];
                        return [4, changeQuantity(cartItemKey, -1, false)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!$button.classList.contains('increase-qty')) return [3, 4];
                        return [4, changeQuantity(cartItemKey, 1, false)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3, 8];
                    case 5:
                        if (!$target.closest('.qty-fs')) return [3, 6];
                        previousTimeoutId_1 = null;
                        currentValue_1 = $target.closest('.qty-fs').value;
                        cartItemKey_1 = $target.closest('.qty-fs').dataset.qid;
                        $target.addEventListener('input', function (event) {
                            var $inputTarget = event.target;
                            if (previousTimeoutId_1 !== null) {
                                clearTimeout(previousTimeoutId_1);
                            }
                            previousTimeoutId_1 = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            previousTimeoutId_1 = null;
                                            if (!($inputTarget.value && currentValue_1 !== $inputTarget.value && $inputTarget.checkValidity())) return [3, 2];
                                            return [4, changeQuantity(cartItemKey_1, Number.parseInt($inputTarget.value), true)];
                                        case 1:
                                            _a.sent();
                                            return [3, 3];
                                        case 2:
                                            $inputTarget.reportValidity();
                                            _a.label = 3;
                                        case 3: return [2];
                                    }
                                });
                            }); }, 750);
                        });
                        $target.addEventListener('blur', function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var $inputTarget;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        $inputTarget = event.target;
                                        if (previousTimeoutId_1 !== null) {
                                            clearTimeout(previousTimeoutId_1);
                                        }
                                        if (!($inputTarget.value && currentValue_1 !== $inputTarget.value && $inputTarget.checkValidity())) return [3, 2];
                                        return [4, changeQuantity(cartItemKey_1, Number.parseInt($inputTarget.value), true)];
                                    case 1:
                                        _a.sent();
                                        return [3, 3];
                                    case 2:
                                        $inputTarget.value = currentValue_1;
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        }); });
                        return [3, 8];
                    case 6:
                        if (!$target.closest('.item-remover')) return [3, 8];
                        cartItemKey = $target.closest('.item-remover').dataset.qid;
                        return [4, changeQuantity(cartItemKey, 0, true)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        }); });
    });
}
function changeQuantity(cartItemKey, amount, set) {
    if (amount === void 0) { amount = 1; }
    if (set === void 0) { set = false; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
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
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        captureSentryException(new Error("Quantity failed to change on ".concat(MerchantConfiguration.hostName(), ". Error").concat(error_3.message)));
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var $tbody = $qs('#pp-summary-body');
    var $tbodyExisting = $qs('#pp-summary-body-existing');
    var $tbodyMobile = $qs('#pp-summary-body-mobile');
    if (!$tbody || !$tbodyExisting || !$tbodyMobile) {
        return;
    }
    function getVariationHTML(item) {
        var variationRowHTML = '';
        if (!item.attributes) {
            return variationRowHTML;
        }
        var keys = Object.keys(item.attributes);
        if (keys.length === 0) {
            return variationRowHTML;
        }
        variationRowHTML = '';
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var formattedKey = capitalizeFirstLetter(key.replace('attribute_', '').replace('pa_', '').replace(/-/g, ' '));
            var formattedValue = String(item.attributes[key]).toUpperCase();
            variationRowHTML += "<br><span class=\"".concat(item.is_part_of_bundle ? '' : 'muted', " pl-3/2\">").concat(formattedKey, ": ").concat(formattedValue, "</span>");
        }
        return variationRowHTML;
    }
    clearOrderSummary();
    if (DefaultCart.contents().length === 0) {
        var $message = "<tr class=\"order-summary-item\"><td style=\"text-align: center; \">".concat(getLocaleText('Cart is empty'), "</td></tr>");
        $tbody.innerHTML = $message;
        $tbodyMobile.innerHTML = $message;
        $tbodyExisting.innerHTML = $message;
        return;
    }
    var _loop_5 = function (i) {
        var item = cart[i];
        if (item.quantity === '' || Number.parseInt(String(item.quantity)) === 0) {
            return "continue";
        }
        var name_1 = item.name;
        if (MerchantConfiguration.hostName() === 'ugoprobaseball.com' && item.formatted_item_data && item.name_with_variation) {
            name_1 = item.name_with_variation;
        }
        var variationTitle = !item.attributes && item.variation_title ? " - ".concat((_a = item.variation_title) !== null && _a !== void 0 ? _a : '') : '';
        var label = "".concat(name_1.bold()).concat(variationTitle, " ").concat(metaDataRowsHTML(item), " ").concat(item.formatted_item_data ? formattedItemDataHTML(item) : getVariationHTML(item));
        var amount = "".concat(formatCurrencyString(Number.parseFloat((_b = item.display_price) !== null && _b !== void 0 ? _b : item.price) * cartItemQuantity(item)));
        if (item.is_part_of_bundle) {
            amount = '';
        }
        if (item.is_subscription) {
            var stringAmount = !((_c = item.subscription_price_string) === null || _c === void 0 ? void 0 : _c.indexOf(String((_d = item.display_price) !== null && _d !== void 0 ? _d : item.price))) ? '' : formatCostString(Number.parseFloat((_e = item.display_price) !== null && _e !== void 0 ? _e : item.price));
            amount = "".concat(MerchantConfiguration.currency.symbol()).concat(stringAmount).concat((_f = item.subscription_price_string) !== null && _f !== void 0 ? _f : '');
        }
        var $row = document.createElement('tr');
        $row.className = 'order-summary-item';
        var $itemRemover = function (tdClass) {
            if (tdClass === void 0) { tdClass = ''; }
            return "\n\t\t<td class=\"item-remover-td non-bundled-item ".concat(tdClass, "\">\n\t\t\t<button class=\"item-remover\" data-qid=\"").concat(item.item_key, "\">&times;</button>\n\t\t</td>");
        };
        var $qtyChanger = function (tdClass) {
            if (tdClass === void 0) { tdClass = ''; }
            return "\n\t\t<td class=\"qty-td ".concat(tdClass, "\">\n\t\t\t<div class=\"quantity-changer\">\n\t\t\t\t<button type=\"button\" class=\"pr-0 decrease-qty qty-btn ").concat(cartItemQuantity(item) <= 1 ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\">&#8722;</button>\n\t\t\t\t<form onSubmit=\"return false;\" class=\"mb-0\">\n\t\t\t\t\t<input type=\"number\" min=\"0\" max=\"").concat(item.stock_qty ? item.stock_qty : '', "\" class=\"qty-fs\" value=\"").concat(cartItemQuantity(item), "\" data-qid=\"").concat(item.item_key, "\" required/>\n\t\t\t\t</form>\n\t\t\t\t<button type=\"button\" class=\"pl-0 increase-qty qty-btn ").concat(item.stock_qty && cartItemQuantity(item) >= item.stock_qty ? 'scroll-end' : '', "\" data-qid=\"").concat(item.item_key, "\">+</button>\n\t\t\t</div>\n\t\t</td>");
        };
        var itemAmount = "<span class='muted'> &times ".concat(cartItemQuantity(item), "</span>");
        var showQuantityChanger = Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && Environment.plugin.pageType() === 'cart' || Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && Feature.version(FeatureFlag.QUANTITY_CHANGER) >= 2;
        if (!item.is_part_of_bundle) {
            if (i < cart.length - 1 && cart[i + 1].is_part_of_bundle) {
                $row.innerHTML += $itemRemover('remove-border');
                if (((_g = item.image) === null || _g === void 0 ? void 0 : _g[0]) && ((_h = item.image) === null || _h === void 0 ? void 0 : _h[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"product-img-td-b0\" id=\"product-img\"><img class=\"product-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('bundle-name remove-border') : '', "\n\t\t\t\t\t<td class=\"bundle-name\">").concat(label, " ").concat(showQuantityChanger ? '' : itemAmount, "</td>\n\t\t\t\t\t<td class=\"bundle-name bold\">").concat(amount, "</td>\n\t\t\t\t");
            }
            else {
                $row.innerHTML += $itemRemover();
                if (((_j = item.image) === null || _j === void 0 ? void 0 : _j[0]) && ((_k = item.image) === null || _k === void 0 ? void 0 : _k[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"product-img-td\" id=\"product-img\"><img class=\"product-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('non-bundled-item') : '', "\n\t\t\t\t\t<td class=\"non-bundled-item\">").concat(label, " ").concat(showQuantityChanger ? '' : itemAmount, "</td>\n\t\t\t\t\t<td class=\"non-bundled-item bold\">").concat(amount, "</td>\n\t\t\t\t");
            }
        }
        else if (item.is_part_of_bundle) {
            if (i < cart.length - 1 && !cart[i + 1].is_part_of_bundle || i === cart.length - 1) {
                if (((_l = item.image) === null || _l === void 0 ? void 0 : _l[0]) && ((_m = item.image) === null || _m === void 0 ? void 0 : _m[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"muted pl-3/2 bb-1 product-img-td\" id=\"product-img\"><img class=\"bundle-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t<td class=\"muted pl-3/2 bb-1\">".concat(label, "</td>\n\t\t\t\t\t<td class=\"muted pl-3/2 bb-1\">").concat(amount, "</td>\n\t\t\t\t");
            }
            else {
                if (((_o = item.image) === null || _o === void 0 ? void 0 : _o[0]) && ((_p = item.image) === null || _p === void 0 ? void 0 : _p[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"muted pl-3/2 bundle-padding product-img-td-b0\" id=\"product-img\"><img class=\"bundle-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t<td class=\"muted pl-3/2 bundle-padding\">".concat(label, "</td>\n\t\t\t\t\t<td class=\"muted pl-3/2 bundle-padding\">").concat(amount, "</td>\n\t\t\t\t");
            }
        }
        if (itemsInCart(cart) === 1 || i === itemsInCart(cart) - 1) {
            var $one = document.createElement('tr');
            $one.className = 'order-summary-item';
            if (item.is_part_of_bundle) {
                if (((_q = item.image) === null || _q === void 0 ? void 0 : _q[0]) && ((_r = item.image) === null || _r === void 0 ? void 0 : _r[0]) !== '(unknown)') {
                    $one.innerHTML += "<td class=\"muted pl-3/2 bb-1 product-img-td remove-border\" id=\"product-img\"><img class=\"bundle-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $one.innerHTML += "\n\t\t\t\t\t<td class=\"muted pl-3/2 bb-1 remove-border\">".concat(label, "</td>\n\t\t\t\t\t<td class=\"muted pl-3/2 bb-1 remove-border\">").concat(amount, "</td>\n\t\t\t\t");
            }
            else {
                $one.innerHTML += $itemRemover('remove-border');
                if (((_s = item.image) === null || _s === void 0 ? void 0 : _s[0]) && ((_t = item.image) === null || _t === void 0 ? void 0 : _t[0]) !== '(unknown)') {
                    $one.innerHTML += "<td class=\"product-img-td remove-border\" id=\"product-img\"><img class=\"product-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $one.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('non-bundled-item remove-border') : '', "\n\t\t\t\t\t<td class=\"non-bundled-item remove-border\">").concat(label, " ").concat(showQuantityChanger ? '' : itemAmount, "</td>\n\t\t\t\t\t<td class=\"non-bundled-item remove-border bold\">").concat(amount, "</td>\n\t\t\t\t");
            }
            $tbody.prepend($one);
            $tbodyMobile.prepend($one.cloneNode(true));
        }
        else {
            $tbody.prepend($row);
            $tbodyMobile.prepend($row.cloneNode(true));
        }
        $tbodyExisting.prepend($row.cloneNode(true));
    };
    for (var i = cart.length - 1; i >= 0; i--) {
        _loop_5(i);
    }
}
function clearOrderSummary() {
    for (var _i = 0, _a = $qsAll('.order-summary-item'); _i < _a.length; _i++) {
        var $item = _a[_i];
        $item.remove();
    }
}
function metaDataRowsHTML(item) {
    if (!item.meta_data) {
        return '';
    }
    var html = '';
    for (var _i = 0, _a = item.meta_data; _i < _a.length; _i++) {
        var meta = _a[_i];
        var keyText = capitalizeFirstLetter(meta.key.replace(/_/g, ' '));
        html += "<br><span class=\"muted ml-half\"><b>".concat(keyText, "</b>: ").concat(meta.value || '(none)', "</span>");
    }
    return html;
}
function formattedItemDataHTML(item) {
    if (!item.formatted_item_data) {
        return '';
    }
    return item.formatted_item_data.replace(/&nbsp;/g, '');
}
function greaterThan(a, b) {
    var _a = String(a).split('.').map(function (n) { return Number(n); }), majorA = _a[0], minorA = _a[1], patchA = _a[2];
    var _b = String(b).split('.').map(function (n) { return Number(n); }), majorB = _b[0], minorB = _b[1], patchB = _b[2];
    var result = majorA - majorB || minorA - minorB || patchA - patchB;
    return result > 0;
}
function initStripeButton() {
    var _a;
    showStripePaymentOption();
    (_a = $qs('#stripe-option')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', selectStripePaymentMethod);
    store.subscribe(function () {
        renderStripeButtonDisplay(PeachPayCustomer.preferredPaymentMethod(), Environment.modalUI.page(), Environment.modalUI.loadingMode());
        renderStripePaymentMethod(PeachPayCustomer.preferredPaymentMethod(), Environment.modalUI.page());
        renderStripeButtonLoading(PeachPayCustomer.preferredPaymentMethod(), Environment.modalUI.loadingMode());
    });
}
function renderStripeButtonDisplay(method, page, loadingMode) {
    if (method === 'stripe' && page === 'payment') {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn-container', function ($element) { return $element.classList.add('hide'); });
    }
    if (method === 'stripe' && page === 'payment' && loadingMode !== 'loading') {
        $qsAll('.stripe-btn', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn', function ($element) { return $element.classList.add('hide'); });
    }
}
function renderStripeButtonLoading(method, mode) {
    if (method !== 'stripe') {
        return;
    }
    if (mode === 'finished') {
        $qsAll('.stripe-btn', function ($element) { return $element.disabled = false; });
    }
    else {
        $qsAll('.stripe-btn', function ($element) { return $element.disabled = true; });
    }
    if (mode === 'loading') {
        $qsAll('.stripe-btn-shipping-spinner', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn-shipping-spinner', function ($element) { return $element.classList.add('hide'); });
    }
    if (mode === 'processing') {
        $qsAll('.stripe-btn > .button-text', function ($element) { return $element.innerHTML = getLocaleText('processing'); });
        $qsAll('.stripe-btn-spinner', function ($element) { return $element.classList.remove('hide'); });
    }
    else {
        $qsAll('.stripe-btn > .button-text', function ($element) { return $element.innerHTML = "".concat(getLocaleText('pay'), " ").concat(formatCurrencyString(DefaultCart.total())); });
        $qsAll('.stripe-btn-spinner', function ($element) { return $element.classList.add('hide'); });
    }
}
function showStripePaymentOption() {
    var _a;
    (_a = $qs('#stripe-option')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    for (var _i = 0, _b = $qsAll('.stripe-btn-container'); _i < _b.length; _i++) {
        var $container = _b[_i];
        $container.classList.remove('hide');
    }
}
function selectStripePaymentMethod() {
    store.dispatch(updatePreferredPaymentMethod('stripe'));
}
function renderStripePaymentMethod(method, page) {
    var _a, _b, _c, _d;
    if (method === 'stripe' && page === 'payment') {
        $qs('#stripe-pm', function ($element) { return $element.checked = true; });
        (_a = $qs('#stripe-pm')) === null || _a === void 0 ? void 0 : _a.setAttribute('checked', 'true');
        $qs('#stripe-option', function ($element) { return $element.style.backgroundColor = 'white'; });
        (_b = $qs('#card-element')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        $qs('#stripe-pm', function ($element) { return $element.checked = false; });
        (_c = $qs('#stripe-pm')) === null || _c === void 0 ? void 0 : _c.removeAttribute('checked');
        $qs('#stripe-option', function ($element) { return $element.style.backgroundColor = '#f4f4f4'; });
        (_d = $qs('#card-element')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
}
function initStripePaymentRequest(message, stripeService, orderService) {
    var _this = this;
    var _a;
    if (!Feature.enabled(FeatureFlag.STRIPE_PAYMENT_REQUEST) || Environment.plugin.pageType() === 'product') {
        return;
    }
    var initMessage = {
        event: 'pp-init-stripe-payment-request',
        stripe: {
            locale: message.browserLocale,
            live: !isDevEnvironment(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()))
        },
        currencyCode: MerchantConfiguration.currency.code(),
        cartCalculationRecord: store.getState().calculatedCarts
    };
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage(initMessage, '*');
    onWindowDataFetch('pp-stripe-payment-request-address-change', handleStripePaymentRequestAddressChange);
    onWindowDataFetch('pp-stripe-payment-request-shipping-change', handleStripePaymentRequestShippingChange);
    onWindowDataFetch('pp-stripe-payment-request-process-payment', function (request) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, handleStripePaymentRequestProcessPayment(request, stripeService, orderService)];
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
function handleStripePaymentRequestProcessPayment(request, stripeService, orderService) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var stripeCustomerId, order, paymentResult, orderStatusResult, error_4;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, stripeService.createStripeCustomer(request.token.id, {
                        name: request.payerName,
                        email: request.payerEmail,
                        phone: request.payerPhone
                    })];
                case 1:
                    stripeCustomerId = _d.sent();
                    store.dispatch(updateCustomer({
                        email: request.payerEmail,
                        phone: request.payerPhone,
                        name_first: (_a = request.payerName.split(' ')[0]) !== null && _a !== void 0 ? _a : '',
                        name_last: (_b = request.payerName.split(' ')[1]) !== null && _b !== void 0 ? _b : '',
                        address1: request.shippingAddress.addressLine[0],
                        address2: (_c = request.shippingAddress.addressLine[1]) !== null && _c !== void 0 ? _c : '',
                        city: request.shippingAddress.city,
                        state: request.shippingAddress.region,
                        country: request.shippingAddress.country,
                        postal: request.shippingAddress.postalCode,
                        card: {
                            brand: request.token.card.brand,
                            last4: request.token.card.last4
                        },
                        stripe_customer_id: stripeCustomerId,
                        payment_option: 'stripe'
                    }));
                    return [4, validateAddress()];
                case 2:
                    if (!(_d.sent())) {
                        return [2, {
                                status: 'invalid_shipping_address'
                            }];
                    }
                    saveCustomerToBrowser(stripeCustomerId, request.token.card.brand, request.token.card.last4, 'stripe');
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 10, , 11]);
                    return [4, orderService.placeOrder()];
                case 4:
                    order = _d.sent();
                    return [4, stripeService.processPayment(order)];
                case 5:
                    paymentResult = _d.sent();
                    return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 6:
                    if (!(_d.sent()).ok) {
                        return [2, {
                                status: 'fail'
                            }];
                    }
                    if (!!paymentResult) return [3, 8];
                    return [4, orderService.setOrderStatus(order, 'wc-failed', {
                            stripeCustomerId: stripeCustomerId
                        })];
                case 7:
                    _d.sent();
                    return [2, {
                            status: 'fail'
                        }];
                case 8: return [4, orderService.setOrderStatus(order, 'wc-processing', {
                        stripeCustomerId: stripeCustomerId
                    })];
                case 9:
                    orderStatusResult = _d.sent();
                    if (!orderStatusResult) {
                        return [2, {
                                status: 'fail'
                            }];
                    }
                    return [2, {
                            status: 'success',
                            redirectURL: orderStatusResult
                        }];
                case 10:
                    error_4 = _d.sent();
                    if (error_4 instanceof Error) {
                        captureSentryException(new Error("Stripe payment request process payment failed on ".concat(MerchantConfiguration.hostName(), ". Error: ").concat(error_4.message)));
                    }
                    return [2, {
                            status: 'fail'
                        }];
                case 11: return [2];
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
                    store.dispatch(updateCustomer(__assign(__assign({}, PeachPayCustomer.data()), { address1: (_a = request.addressLine[0]) !== null && _a !== void 0 ? _a : '', address2: (_b = request.addressLine[1]) !== null && _b !== void 0 ? _b : '', city: (_c = request.city) !== null && _c !== void 0 ? _c : '', postal: (_d = request.postalCode) !== null && _d !== void 0 ? _d : '', state: (_e = request.region) !== null && _e !== void 0 ? _e : '', country: (_f = request.country) !== null && _f !== void 0 ? _f : '' })));
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
function initStripeSupport(message1, orderService) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var connectedStripeAccount, isDevMode, key, options, stripeAccount, stripeForCheckingPaymentIntent, stripe, elements, style, $card, stripeService, handleInjectedProcessPayment;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    connectedStripeAccount = message1.phpData.connected_stripe_account;
                    isDevMode = isDevEnvironment(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()));
                    if (greaterThan(Environment.plugin.version(), '1.57.1') && !connectedStripeAccount && !Environment.testMode()) {
                        return [2];
                    }
                    if (!Feature.enabled(FeatureFlag.STRIPE)) {
                        return [2];
                    }
                    key = isDevMode ? 'pk_test_CnL2kA52V5dRqZbjlJ0sZ2gr00uBrOEmQQ' : 'pk_live_oROnIQDuexHZpnEOcUff3CRz00asaOOCAL';
                    options = {
                        locale: (_a = message1 === null || message1 === void 0 ? void 0 : message1.browserLocale) !== null && _a !== void 0 ? _a : 'auto'
                    };
                    if (!(MerchantConfiguration.hostName() !== 'woo.peachpay.app' && MerchantConfiguration.hostName() !== 'shop.peachpay.app')) return [3, 2];
                    return [4, fetchStripeAccount(MerchantConfiguration.hostName())];
                case 1:
                    stripeAccount = _f.sent();
                    if (stripeAccount) {
                        options = __assign(__assign({}, options), { stripeAccount: stripeAccount });
                    }
                    _f.label = 2;
                case 2:
                    stripeForCheckingPaymentIntent = Stripe(key, options);
                    stripe = Stripe(key, {
                        locale: (_b = message1.browserLocale) !== null && _b !== void 0 ? _b : 'auto'
                    });
                    elements = stripe.elements();
                    style = {
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
                    $card = elements.create('card', {
                        style: style,
                        hidePostalCode: true
                    });
                    $card.mount('#card-element');
                    $card.on('change', function (event) {
                        $qs('#card-errors', function ($element) { var _a, _b; return $element.textContent = (_b = (_a = event.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : ''; });
                    });
                    stripeService = {
                        $card: $card,
                        elements: elements,
                        stripe: stripe,
                        stripeForPaymentIntent: stripeForCheckingPaymentIntent,
                        createStripeCustomer: addCardToStripeCustomer,
                        processPayment: function (order) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, handleStripePayment(order)];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); }
                    };
                    handleInjectedProcessPayment = function (event) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!checkRequiredFields()) {
                                        return [2];
                                    }
                                    return [4, handleProcessPayment(event, stripeService, orderService)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); };
                    initStripeButton();
                    initStripePaymentRequest(message1, stripeService, orderService);
                    onWindowMessage('3DS-authentication-complete', function (message) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, on3DSComplete(message.paymentIntentClientSecret, stripeService, orderService)];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    onWindowMessage('submitPayment', function (message) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    GLOBAL.completedOrder = message.order;
                                    return [4, legacyHandleStripePayment(message.order, orderService)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    (_c = $qs('#pp-pay')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', handleInjectedProcessPayment);
                    (_d = $qs('#pp-pay-mobile')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', handleInjectedProcessPayment);
                    (_e = $qs('#pp-pay-existing')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', handleInjectedProcessPayment);
                    return [2];
            }
        });
    });
}
function handleProcessPayment(event, stripeService, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var $card, stripe, result, _a, _b, _c, error_5;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    $card = stripeService.$card, stripe = stripeService.stripe;
                    event.preventDefault();
                    store.dispatch(startModalProcessing());
                    if (!!Environment.customer.existing()) return [3, 5];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4, stripe.createToken($card)];
                case 2:
                    result = _d.sent();
                    if (result.error) {
                        handleTokenError(result.error);
                        return [2];
                    }
                    _b = (_a = store).dispatch;
                    _c = updateCustomerStripeId;
                    return [4, addCardToStripeCustomer(result.token.id, PeachPayCustomer.stripeDetails())];
                case 3:
                    _b.apply(_a, [_c.apply(void 0, [_d.sent()])]);
                    saveCustomerToBrowser(PeachPayCustomer.stripeId(), result.token.card.brand, result.token.card.last4, 'stripe');
                    return [3, 5];
                case 4:
                    error_5 = _d.sent();
                    if (error_5 instanceof Error) {
                        captureSentryException(new Error("Failed tokenizing or creating a new stripe customer on ".concat(MerchantConfiguration.hostName(), " Error: ").concat(error_5.message)));
                    }
                    store.dispatch(stopModalLoading());
                    return [2];
                case 5:
                    orderService.deprecated.placeOrder();
                    return [2];
            }
        });
    });
}
function fetchStripeAccount(domain) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + "api/v1/merchants/".concat(domain, "/stripe-account"))];
                case 1:
                    response = _a.sent();
                    if (response.status !== 200) {
                        return [2, ''];
                    }
                    return [2, response.text()];
            }
        });
    });
}
function handleTokenError(error) {
    $qs('#card-errors', function ($element) { return $element.textContent = error.message; });
    store.dispatch(stopModalLoading());
}
function on3DSComplete(paymentIntentClientSecret, stripeService, orderService) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var stripeForPaymentIntent, stripe, getPaymentIntent, result, paymentStatus, response;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    stripeForPaymentIntent = stripeService.stripeForPaymentIntent, stripe = stripeService.stripe;
                    (_a = $qs('#stripe-3DS-modal')) === null || _a === void 0 ? void 0 : _a.remove();
                    getPaymentIntent = function () { return __awaiter(_this, void 0, void 0, function () {
                        var domain, isOurStore;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    domain = location.hostname;
                                    isOurStore = domain === 'woo.peachpay.app' || domain === 'shop.peachpay.app' || domain === 'localhost' || domain === 'woo.store.local' || domain === 'store.local';
                                    if (!isOurStore) return [3, 2];
                                    return [4, stripe.retrievePaymentIntent(paymentIntentClientSecret)];
                                case 1: return [2, _a.sent()];
                                case 2: return [4, stripeForPaymentIntent.retrievePaymentIntent(paymentIntentClientSecret)];
                                case 3: return [2, _a.sent()];
                            }
                        });
                    }); };
                    return [4, getPaymentIntent()];
                case 1:
                    result = _b.sent();
                    if (result.error || result.paymentIntent.status === 'requires_payment_method') {
                        handle3DSError();
                        return [2];
                    }
                    if (!(result.paymentIntent.status === 'succeeded' && GLOBAL.completedOrder)) return [3, 4];
                    return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 2:
                    paymentStatus = _b.sent();
                    if (!paymentStatus.ok) {
                        return [2];
                    }
                    return [4, paymentStatus.json()];
                case 3:
                    response = _b.sent();
                    orderService.deprecated.setOrderStatus(GLOBAL.completedOrder, {
                        status: 'wc-processing',
                        paymentType: 'Stripe',
                        transactionID: response.chargeId
                    });
                    _b.label = 4;
                case 4: return [2];
            }
        });
    });
}
function addCardToStripeCustomer(tokenID, customer) {
    return __awaiter(this, void 0, void 0, function () {
        var body, options, response, data_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        'customer_id': null,
                        'card_token': tokenID,
                        'name': customer.name,
                        'email': customer.email,
                        'phone': customer.phone
                    };
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    };
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'card', options)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3, 3];
                    return [4, response.text()];
                case 2:
                    data_1 = _a.sent();
                    peachpayAlert(data_1);
                    throw new Error("Failed to create Stripe Customer on ".concat(MerchantConfiguration.hostName(), ". Error: ").concat(data_1));
                case 3: return [4, response.json()];
                case 4:
                    data = _a.sent();
                    return [2, data.customer];
            }
        });
    });
}
function show3DSecureModal(url) {
    var _a;
    var iframe = document.createElement('iframe');
    iframe.id = 'stripe-3DS-modal';
    iframe.classList.add('stripe-3ds-frame');
    iframe.src = url;
    (_a = $qs('#pp-modal-content')) === null || _a === void 0 ? void 0 : _a.append(iframe);
    showLoadingScreen();
    hideOtherScrollBars();
}
function handle3DSError() {
    hideLoadingScreen();
    showOtherScrollBars();
    peachpayAlert(getLocaleText('Something went wrong, but the payment may have been made. Please check before placing another order.'));
    store.dispatch(stopModalLoading());
}
function handleStripePayment(order) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var body, options, response, result;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    body = {
                        sessionID: PeachPayOrder.sessionId(),
                        stripeCustomerID: PeachPayCustomer.stripeId(),
                        order: order,
                        returnURL: "".concat((_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_asset_url) !== null && _b !== void 0 ? _b : '', "/public/dist/").concat((_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.version) !== null && _d !== void 0 ? _d : '', "/checkout-modal/3ds.html")
                    };
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    };
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/session/pay', options)];
                case 1:
                    response = _e.sent();
                    return [4, response.json()];
                case 2:
                    result = _e.sent();
                    return [2, result.status === 'success'];
            }
        });
    });
}
function legacyHandleStripePayment(order, orderService) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var body, options, response, result, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    body = {
                        sessionID: PeachPayOrder.sessionId(),
                        stripeCustomerID: PeachPayCustomer.stripeId(),
                        order: order,
                        returnURL: "".concat((_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_asset_url) !== null && _b !== void 0 ? _b : '', "/public/dist/").concat((_d = (_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.version) !== null && _d !== void 0 ? _d : '', "/checkout-modal/3ds.html")
                    };
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    };
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/session/pay', options)];
                case 1:
                    response = _h.sent();
                    return [4, response.json()];
                case 2:
                    result = _h.sent();
                    _g = result.status;
                    switch (_g) {
                        case 'success': return [3, 3];
                        case 'requires_action': return [3, 5];
                        case 'failure': return [3, 6];
                    }
                    return [3, 7];
                case 3: return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 4:
                    if (!(_h.sent()).ok) {
                        return [3, 7];
                    }
                    orderService.deprecated.setOrderStatus(order, {
                        status: 'wc-processing',
                        paymentType: 'Stripe',
                        transactionID: result.chargeId
                    });
                    return [3, 7];
                case 5:
                    show3DSecureModal((_e = result === null || result === void 0 ? void 0 : result.url) !== null && _e !== void 0 ? _e : '');
                    return [3, 7];
                case 6:
                    orderService.deprecated.setOrderStatus(order, {
                        status: 'wc-failed',
                        message: result.message
                    });
                    store.dispatch(stopModalLoading());
                    peachpayAlert((_f = result === null || result === void 0 ? void 0 : result.message) !== null && _f !== void 0 ? _f : '');
                    return [3, 7];
                case 7: return [2];
            }
        });
    });
}
function hideOtherScrollBars() {
    $qs('#pp-modal-content', function ($element) {
        if ($element.parentElement) {
            $element.parentElement.style.overflowY = 'hidden';
        }
    });
}
function showOtherScrollBars() {
    $qs('#pp-modal-content', function ($element) {
        if ($element.parentElement) {
            $element.parentElement.style.overflowY = 'scroll';
        }
    });
}
function hideLoadingScreen() {
    var _a, _b;
    (_a = $qs('#loading')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    (_b = $qs('#loading')) === null || _b === void 0 ? void 0 : _b.classList.remove('flex-container');
}
function showLoadingScreen() {
    var _a, _b;
    (_a = $qs('#loading')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    (_b = $qs('#loading')) === null || _b === void 0 ? void 0 : _b.classList.add('flex-container');
}
var paypalMerchantID = null;
var BN_CODE_SANDBOX = 'FLAVORsb-6jopv6540275_MP';
var BN_CODE_PRODUCTION = 'Peach_SP_PPCP';
function initPayPalEvents() {
    var _a;
    (_a = $qs('#paypal-option')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', paypalPaymentOption);
    store.subscribe(function () {
        renderPayPalButton(PeachPayCustomer.preferredPaymentMethod() === 'paypal' && Environment.modalUI.page() === 'payment' && isCurrencySupportedByPaypal());
    });
}
function paypalLoadScripts(scriptURLs) {
    return __awaiter(this, void 0, void 0, function () {
        function load(scriptURL) {
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
        }
        var promises, _i, scriptURLs_1, scriptURL2, _a, scriptURLs_2, scriptURL1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promises = [];
                    for (_i = 0, scriptURLs_1 = scriptURLs; _i < scriptURLs_1.length; _i++) {
                        scriptURL2 = scriptURLs_1[_i];
                        promises.push(load(scriptURL2));
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
paypalLoadScripts.loaded = new Set();
function loadPayPalScript() {
    return __awaiter(this, void 0, void 0, function () {
        var response, merchant, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
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
                    if (!(merchant.paypalMerchantID !== '' && isCurrencySupportedByPaypal())) return [3, 4];
                    paypalMerchantID = merchant.paypalMerchantID;
                    return [4, paypalLoadScripts([
                            "https://www.paypal.com/sdk/js?&client-id=".concat(merchant.clientID, "&merchant-id=").concat(merchant.paypalMerchantID, "&disable-funding=paylater,card,bancontact,blik,eps,giropay,ideal,mybank,p24,sofort,mercadopago,sepa,venmo&currency=").concat(MerchantConfiguration.currency.code()),
                        ])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3, 6];
                case 5:
                    error_6 = _a.sent();
                    if (error_6 instanceof Error) {
                        captureSentryException(new Error("Failed to retrieve paypal merchant Id or load Paypal Scripts on ".concat(location.hostname, ". Plugin Mode: ").concat(Environment.plugin.mode(), ". Error: ").concat(error_6.message)));
                    }
                    return [2, false];
                case 6: return [2, true];
            }
        });
    });
}
function initPayPalSupport(message, orderService) {
    return __awaiter(this, void 0, void 0, function () {
        var paypalChecked, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    paypalChecked = message.phpData.paypal;
                    if (!paypalChecked) {
                        return [2];
                    }
                    initPayPalEvents();
                    _a = !isCurrencySupportedByPaypal();
                    if (_a) return [3, 2];
                    return [4, loadPayPalScript()];
                case 1:
                    _a = !(_b.sent());
                    _b.label = 2;
                case 2:
                    if (_a) {
                        return [2];
                    }
                    if (!(paypalMerchantID && Number.parseInt(paypalChecked !== null && paypalChecked !== void 0 ? paypalChecked : '0'))) return [3, 4];
                    return [4, initPayPalButton(orderService)];
                case 3:
                    _b.sent();
                    showPayPalButton();
                    _b.label = 4;
                case 4: return [2];
            }
        });
    });
}
function initPayPalButton(orderService) {
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
            showPayPalLoadingSpinner();
            placeOrderOnStoreAndListenForCompletion(data, actions, orderService);
        },
        onClick: function () {
            return checkRequiredFields();
        }
    });
    $paypalButton.render('#paypal-button-container');
    $paypalButton.render('#paypal-button-container-mobile');
    $paypalButton.render('#paypal-button-container-existing');
}
function restartAction(actions) {
    self.addEventListener('message', function (event) {
        if (event.data.event === 'paypalRestart') {
            actions.restart();
        }
    });
}
function createPayPalOrder() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var mockOrderResult, body, response, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mockOrderResult = {
                        domain: MerchantConfiguration.hostName(),
                        details: {
                            id: '',
                            number: '',
                            currency: MerchantConfiguration.currency.code(),
                            discount_total: DefaultCart.totalAppliedCoupons().toFixed(2),
                            shipping_total: DefaultCart.totalShipping().toFixed(2),
                            total: DefaultCart.total().toFixed(2),
                            total_tax: ((_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.wc_prices_include_tax) ? '0.00' : DefaultCart.totalTax().toFixed(2),
                            shipping: paypalCustomerAddress(),
                            line_items: getLineItems(),
                            shipping_lines: getShippingLines(),
                            fee_total: DefaultCart.totalAppliedFees().toFixed(2)
                        }
                    };
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
                    response = _b.sent();
                    return [4, response.json()];
                case 2:
                    result = _b.sent();
                    return [2, result.id];
            }
        });
    });
}
function paypalCustomerAddress() {
    var firstName = PeachPayCustomer.firstName, lastName = PeachPayCustomer.lastName, address1 = PeachPayCustomer.address1, address2 = PeachPayCustomer.address2, city = PeachPayCustomer.city, state = PeachPayCustomer.state, postal = PeachPayCustomer.postal, country = PeachPayCustomer.country, phone = PeachPayCustomer.phone, email = PeachPayCustomer.email;
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
            'subtotal_tax': '0.00'
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
                method_title: (_b = (_a = shippingDetails.methods[shippingDetails.selected_method]) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : ''
            };
        })()
    };
}
function showPayPalLoadingSpinner(show) {
    var _a, _b, _c, _d;
    if (show === void 0) { show = true; }
    var spinners = [
        '#paypal-spinner',
        '#paypal-spinner-mobile',
        '#paypal-spinner-existing',
    ];
    for (var _i = 0, spinners_1 = spinners; _i < spinners_1.length; _i++) {
        var spinner = spinners_1[_i];
        if (show) {
            (_a = $qs(spinner)) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        }
        else {
            (_b = $qs(spinner)) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        }
    }
    var paypalButtonContainers = [
        '#paypal-button-container',
        '#paypal-button-container-mobile',
        '#paypal-button-container-existing',
    ];
    for (var _e = 0, paypalButtonContainers_1 = paypalButtonContainers; _e < paypalButtonContainers_1.length; _e++) {
        var container = paypalButtonContainers_1[_e];
        if (show) {
            (_c = $qs(container)) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        }
        else {
            (_d = $qs(container)) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        }
    }
}
var latestOrderAttempt = 0;
function placeOrderOnStoreAndListenForCompletion(data, actions, orderService) {
    var _this = this;
    latestOrderAttempt++;
    var orderAttempt = latestOrderAttempt;
    onWindowMessage('submitPaypalOrder', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var error_7, error1_1, capture, error2_1, customer, stripeCustomerID, cardBrand, cardLast4, transactionID;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (latestOrderAttempt !== orderAttempt) {
                        return [2];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4, updatePayPalOrderWithFinalAmount(data.orderID, message.order)];
                case 2:
                    _e.sent();
                    return [3, 4];
                case 3:
                    error_7 = _e.sent();
                    captureSentryException(new Error('Error while updating PayPal order with final amount: ' + JSON.stringify(error_7)));
                    return [3, 4];
                case 4:
                    _e.trys.push([4, 6, , 7]);
                    return [4, updatePayPalOrderWithFinalAmount(data.orderID, message.order)];
                case 5:
                    _e.sent();
                    return [3, 7];
                case 6:
                    error1_1 = _e.sent();
                    captureSentryException(new Error('Error while updating PayPal order with final amount: ' + JSON.stringify(error1_1)));
                    return [3, 7];
                case 7:
                    capture = null;
                    _e.label = 8;
                case 8:
                    _e.trys.push([8, 10, , 11]);
                    return [4, capturePayPalOrder(data.orderID)];
                case 9:
                    capture = _e.sent();
                    return [3, 11];
                case 10:
                    error2_1 = _e.sent();
                    captureSentryException(new Error('Error while capturing PayPal order: ' + JSON.stringify(error2_1)));
                    return [3, 11];
                case 11:
                    if (!((capture === null || capture === void 0 ? void 0 : capture.status) === 'COMPLETED')) return [3, 14];
                    return [4, getCustomer()];
                case 12:
                    customer = _e.sent();
                    if (customer === null) {
                        saveCustomerToBrowser(null, null, null, 'paypal');
                    }
                    else {
                        stripeCustomerID = customer.stripe_customer_id ? customer.stripe_customer_id : null;
                        cardBrand = (_b = (_a = customer.card) === null || _a === void 0 ? void 0 : _a.brand) !== null && _b !== void 0 ? _b : null;
                        cardLast4 = (_d = (_c = customer.card) === null || _c === void 0 ? void 0 : _c.last4) !== null && _d !== void 0 ? _d : null;
                        saveCustomerToBrowser(stripeCustomerID, cardBrand, cardLast4, 'paypal');
                    }
                    return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 13:
                    if (!(_e.sent()).ok) {
                        return [2];
                    }
                    transactionID = capture.purchase_units[0].payments.captures[0].id;
                    orderService.deprecated.setOrderStatus(message.order, {
                        status: 'wc-processing',
                        paymentType: 'PayPal',
                        transactionID: transactionID
                    });
                    return [3, 15];
                case 14:
                    if ((capture === null || capture === void 0 ? void 0 : capture.details[0].issue) === 'INSTRUMENT_DECLINED') {
                        showPayPalLoadingSpinner(false);
                        orderService.deprecated.setOrderStatus(message.order, {
                            status: 'wc-failed',
                            message: capture.details[0].description
                        });
                        window.parent.postMessage({
                            event: 'paypalAlert',
                            message: capture.details[0].description
                        }, '*');
                        restartAction(actions);
                    }
                    else {
                        showPayPalLoadingSpinner(false);
                        orderService.deprecated.setOrderStatus(message.order, {
                            status: 'wc-failed',
                            message: 'Something went wrong.'
                        });
                        window.parent.postMessage({
                            event: 'paypalAlert',
                            message: 'Something went wrong.'
                        }, '*');
                        restartAction(actions);
                    }
                    _e.label = 15;
                case 15: return [2];
            }
        });
    }); });
    orderService.deprecated.placeOrder({
        isPaypal: true
    });
}
function capturePayPalOrder(orderID) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'api/v1/paypal/capture', {
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
function showPayPalButton() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = $qs('#shipping-options-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('mt-payment');
    $qs('#pp-shipping-options', function ($element) { return $element.style.marginBottom = '0.5rem'; });
    (_b = $qs('.form-row')) === null || _b === void 0 ? void 0 : _b.classList.remove('mb-payment');
    $qs('#payment-methods', function ($element) { return $element.style.marginTop = '1rem'; });
    (_c = $qs('#stripe-option')) === null || _c === void 0 ? void 0 : _c.classList.remove('paypal-disabled');
    (_d = $qs('#stripe-option')) === null || _d === void 0 ? void 0 : _d.classList.add('pm-option-block');
    (_e = $qs('#cc-regular')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
    (_f = $qs('#stripe-box')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
    (_g = $qs('#paypal-option')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
    (_h = $qs('#pp-pay-btn')) === null || _h === void 0 ? void 0 : _h.classList.remove('paypal-disabled-btn');
    (_j = $qs('#pp-pay-btn')) === null || _j === void 0 ? void 0 : _j.classList.add('pp-pay-mt');
}
function paypalPaymentOption() {
    store.dispatch(updatePreferredPaymentMethod('paypal'));
}
function renderPayPalButton(display) {
    var _a, _b, _c, _d, _e, _f;
    if (display) {
        $qs('#paypal-pm', function ($element) { return $element.checked = true; });
        (_a = $qs('#paypal-pm')) === null || _a === void 0 ? void 0 : _a.setAttribute('checked', 'true');
        $qs('#paypal-option', function ($element) { return $element.style.backgroundColor = 'white'; });
        (_b = $qs('#paypal-button-container')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
        (_c = $qs('#paypal-button-container-mobile')) === null || _c === void 0 ? void 0 : _c.classList.remove('hide');
    }
    else {
        $qs('#paypal-pm', function ($element) { return $element.checked = false; });
        (_d = $qs('#paypal-pm')) === null || _d === void 0 ? void 0 : _d.removeAttribute('checked');
        $qs('#paypal-option', function ($element) { return $element.style.backgroundColor = '#f4f4f4'; });
        (_e = $qs('#paypal-button-container')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
        (_f = $qs('#paypal-button-container-mobile')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
    }
}
function reloadPaypalScriptsWithNewCurrency() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, loadPayPalScript()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function isCurrencySupportedByPaypal() {
    var supportedCurrencies = [
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
    ];
    if (supportedCurrencies.includes(MerchantConfiguration.currency.code())) {
        return true;
    }
    if (PeachPayCustomer.preferredPaymentMethod() === 'paypal') {
        if (Environment.modalUI.open()) {
            peachpayAlert('Sorry, this currency is not supported by PayPal. Please use another payment option');
            var paypalButton = $qs('#paypal-button-container');
            if (paypalButton) {
                paypalButton.innerHTML = '';
            }
        }
        console.log(Environment.customer.existing);
        if (Environment.customer.existing()) {
            store.dispatch(updateEnvironment({
                modalPageType: 'info',
                customerExists: false
            }));
        }
        store.dispatch(updatePreferredPaymentMethod('stripe'));
    }
    return false;
}
function recreatePaypalButton() {
    return __awaiter(this, void 0, void 0, function () {
        var $locations, locations, _i, locations_1, location_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, initPayPalButton(getOrderService())];
                case 1:
                    _a.sent();
                    $locations = document.querySelectorAll('[title="PayPal"]');
                    locations = Array.prototype.slice.call($locations, 0);
                    for (_i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                        location_1 = locations_1[_i];
                        location_1.setAttribute('style', location_1.getAttribute('style') + 'height: 55px;');
                    }
                    showPayPalButton();
                    return [2];
            }
        });
    });
}
function initCurrencySwitcher() {
    if (Feature.enabled(FeatureFlag.CURRENCY_SWITCHER_INPUT)) {
        renderCurrencySelector();
        store.subscribe(function () {
            selectDropdown(document.querySelector('#pp_currency_select'), MerchantConfiguration.currency.code());
        });
    }
}
function renderCurrencySelector() {
    var $previousLocation = $qs('#pp_currency_select');
    if ($previousLocation) {
        $previousLocation.remove();
    }
    var currencies = Feature.metaData(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currencies');
    if (currencies === null) {
        return;
    }
    var $insertionLocationExisting = $qs('#existing-checkout-card');
    var $insertionLocationNew = $qs('#payment-methods');
    var $currencySelectDiv = document.createElement('div');
    var $currencySelectTitle = document.createElement('h4');
    $currencySelectTitle.innerHTML = 'Currency';
    $currencySelectTitle.setAttribute('class', 'color-change-text');
    $currencySelectDiv.id = 'pp_currency_select_div';
    $currencySelectDiv.append($currencySelectTitle);
    var $currencySelectDivClone = $currencySelectDiv.cloneNode(true);
    var $currencySelect = document.createElement('select');
    $currencySelect.setAttribute('id', 'pp_currency_select_existing');
    $currencySelect.innerHTML = 'Currency';
    var $currencySelectClone = document.createElement('select');
    $currencySelectClone.setAttribute('id', 'pp_currency_select_new');
    $currencySelectClone.innerHTML = 'Currency';
    var $options = renderDropDownList(currencies, MerchantConfiguration.currency.code());
    var $optionsClone = renderDropDownList(currencies, MerchantConfiguration.currency.code());
    $currencySelect.innerHTML += $options;
    $currencySelectClone.innerHTML += $optionsClone;
    $currencySelectDiv.append($currencySelect);
    $currencySelectDivClone.append($currencySelectClone);
    $currencySelect.addEventListener('change', currencyEventListener);
    $currencySelectClone.addEventListener('change', currencyEventListener);
    $insertionLocationExisting === null || $insertionLocationExisting === void 0 ? void 0 : $insertionLocationExisting.insertAdjacentElement('afterend', $currencySelectDiv);
    $insertionLocationNew === null || $insertionLocationNew === void 0 ? void 0 : $insertionLocationNew.insertAdjacentElement('afterend', $currencySelectDivClone);
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
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var currencyInfo, target;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    currencyInfo = Feature.metaData(FeatureFlag.CURRENCY_SWITCHER_INPUT, 'currency_info');
                    target = event.target;
                    if (!((currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[target.value]) && target.value !== MerchantConfiguration.currency.code())) return [3, 6];
                    store.dispatch(updateMerchantCurrencyConfig(__assign(__assign({}, MerchantConfiguration.currency.configuration()), { code: (_a = currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[target.value].code) !== null && _a !== void 0 ? _a : MerchantConfiguration.currency.code() })));
                    store.dispatch(startModalLoading());
                    sendCurrencySwitchMessage(target.value);
                    return [4, requestCartCalculation()];
                case 1:
                    _d.sent();
                    store.dispatch(updateMerchantCurrencyConfig(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo[target.value]));
                    if (!(((_b = GLOBAL.phpData) === null || _b === void 0 ? void 0 : _b.paypal) && ((_c = GLOBAL.phpData) === null || _c === void 0 ? void 0 : _c.paypal) !== '0' && isCurrencySupportedByPaypal())) return [3, 4];
                    return [4, reloadPaypalScriptsWithNewCurrency()];
                case 2:
                    _d.sent();
                    return [4, recreatePaypalButton()];
                case 3:
                    _d.sent();
                    return [3, 5];
                case 4:
                    store.dispatch(updatePreferredPaymentMethod('stripe'));
                    _d.label = 5;
                case 5:
                    $qs('#pp_currency_select_new').value = event.target.value;
                    store.dispatch(stopModalLoading());
                    _d.label = 6;
                case 6: return [2];
            }
        });
    });
}
function initSummary(message) {
    var _a;
    initSummaryEvents();
    store.dispatch(updateMerchantTaxConfig({
        displayPricesInCartAndCheckout: ((_a = message.phpData) === null || _a === void 0 ? void 0 : _a.wc_tax_price_display) === 'incl' ? 'includeTax' : 'excludeTax'
    }));
}
function initSummaryEvents() {
    var _a, _b, _c;
    (_a = $qs('#pp-dropdown')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', orderSummaryDropdown);
    (_b = $qs('#pp-dropdown')) === null || _b === void 0 ? void 0 : _b.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            orderSummaryDropdown();
        }
    });
    (_c = $qs('#pp-dropdown-new')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', orderSummaryDropdown);
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
    return "\n<tr class=\"summary-line\" data-raw-cost=\"".concat(amount, "\">\n\t<td>").concat(name, "</td>\n\t<td>").concat(formatCurrencyString(amount)).concat(priceMetaHTML, "</td>\n</tr>");
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
function initModal() {
    var _this = this;
    var _a, _b, _c;
    store.subscribe(function () {
        if (Environment.modalUI.open()) {
            $qs('#pp-modal-content', function ($element) { return $element.style.display = 'flex'; });
        }
        else if (!Environment.modalUI.open()) {
            $qs('#pp-modal-content', function ($element) { return $element.style.display = 'none'; });
            return;
        }
        renderButtonColorTheme(Environment.plugin.buttonColor());
        renderTestModeBannerDisplay(Environment.testMode());
        renderModalPageIndicator(Environment.modalUI.page());
        renderModalNavigation(Environment.modalUI.page());
        renderContinueButtonDisplay(Environment.modalUI.page());
        renderContinueButtonLoading(Environment.modalUI.loadingMode());
        renderInfoPageDisplay(Environment.modalUI.page());
        renderPaymentPageDisplay(Environment.modalUI.page(), Environment.customer.existing(), Environment.customer.mobile());
        displayErrorMessage(PeachPayOrder.errorMessage());
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
        store.dispatch(stopModalLoading());
    });
    onWindowMessage('hideContinueSpinner', function (_) {
        store.dispatch(stopModalLoading());
    });
    onWindowMessage('buttonClicked', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    openCheckoutModal();
                    validateCartItemsWithCustomer(DefaultCart.contents(), true);
                    store.dispatch(startModalLoading());
                    return [4, requestCartCalculation(!Environment.customer.existing())];
                case 1:
                    _a.sent();
                    store.dispatch(stopModalLoading());
                    return [2];
            }
        });
    }); });
    onWindowMessage('stopPaymentProcessingAnimations', function (message) {
        store.dispatch(stopModalLoading());
        if (message.closeModal) {
            requestCloseModal();
        }
        if (message.errorMessage) {
            store.dispatch(setOrderError(message.errorMessage));
        }
    });
    (_a = $qs('.pp-exit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', requestCloseModal);
    (_b = $qs('.pp-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', requestCloseModal);
    (_c = $qs('#edit-info')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', backToInfo);
    for (var _i = 0, _d = $qsAll('.pp-back-to-info'); _i < _d.length; _i++) {
        var $element1 = _d[_i];
        $element1.addEventListener('click', backToInfo);
    }
}
function displayErrorMessage(errorMessage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (errorMessage !== '') {
        (_a = $qs('#shipping-options-container')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
        (_b = $qs('#pp-payment-form')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        (_c = $qs('#payment-methods')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        for (var _i = 0, _l = $qsAll('.pay-button-container'); _i < _l.length; _i++) {
            var $element3 = _l[_i];
            $element3.classList.add('hide');
        }
        for (var _m = 0, _o = $qsAll('.hide-when-invalid'); _m < _o.length; _m++) {
            var $element2 = _o[_m];
            $element2.classList.add('hide');
        }
        (_d = $qs('#invalid-order-message')) === null || _d === void 0 ? void 0 : _d.classList.remove('hide');
        (_e = $qs('#invalid-order-message-existing')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        $qs('#invalid-order-message', function ($element) { return $element.innerHTML = errorMessage; });
        $qs('#invalid-order-message-existing', function ($element) { return $element.innerHTML = errorMessage; });
    }
    else {
        (_f = $qs('#shipping-options-container')) === null || _f === void 0 ? void 0 : _f.classList.remove('hide');
        (_g = $qs('#pp-payment-form')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
        (_h = $qs('#payment-methods')) === null || _h === void 0 ? void 0 : _h.classList.remove('hide');
        for (var _p = 0, _q = $qsAll('.pay-button-container'); _p < _q.length; _p++) {
            var $element = _q[_p];
            $element.classList.remove('hide');
        }
        for (var _r = 0, _s = $qsAll('.hide-when-invalid'); _r < _s.length; _r++) {
            var $element5 = _s[_r];
            $element5.classList.remove('hide');
        }
        (_j = $qs('#invalid-order-message')) === null || _j === void 0 ? void 0 : _j.classList.add('hide');
        (_k = $qs('#invalid-order-message-existing')) === null || _k === void 0 ? void 0 : _k.classList.add('hide');
    }
}
function openCheckoutModal() {
    var _a;
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage('openModal', '*');
}
function requestCloseModal() {
    var _a;
    syncOrderNotes(true);
    (_a = window.top) === null || _a === void 0 ? void 0 : _a.postMessage('closeModal', '*');
}
function backToInfo() {
    store.dispatch(updateEnvironment({
        modalPageType: 'info',
        customerExists: false
    }));
    store.dispatch(updateCustomerAddressValidation(false));
    syncOrderNotes();
}
function renderContinueButtonDisplay(modalPage) {
    var _a, _b, _c, _d;
    if (modalPage === 'info') {
        (_a = $qs('#pp-continue')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#pp-continue-mobile')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        (_c = $qs('#pp-continue')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('#pp-continue-mobile')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
}
function renderContinueButtonLoading(loadingMode) {
    var _a, _b, _c, _d;
    if (loadingMode === 'loading') {
        $qs('#pp-continue', function ($element) { return $element.disabled = true; });
        $qs('#pp-continue-mobile', function ($element) { return $element.disabled = true; });
        (_a = $qs('#continue-spinner')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#continue-spinner-mobile')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        $qs('#pp-continue', function ($element) { return $element.disabled = false; });
        $qs('#pp-continue-mobile', function ($element) { return $element.disabled = false; });
        (_c = $qs('#continue-spinner')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('#continue-spinner-mobile')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
}
function renderModalNavigation(modalPage) {
    var _a, _b;
    if (modalPage === 'info') {
        (_a = $qs('.pp-exit')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        for (var _i = 0, _c = $qsAll('.pp-back-to-info'); _i < _c.length; _i++) {
            var $element = _c[_i];
            $element.classList.add('hide');
        }
    }
    else if (modalPage === 'payment') {
        (_b = $qs('.pp-exit')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
        for (var _d = 0, _e = $qsAll('.pp-back-to-info'); _d < _e.length; _d++) {
            var $element = _e[_d];
            $element.classList.remove('hide');
        }
    }
}
function renderModalPageIndicator(modalPage) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (modalPage === 'info') {
        (_a = $qs('.color-changing-info')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('#checkout-status')) === null || _b === void 0 ? void 0 : _b.classList.add('circle-logo-one');
    }
    else {
        (_c = $qs('.color-changing-info')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('#checkout-status')) === null || _d === void 0 ? void 0 : _d.classList.remove('circle-logo-one');
    }
    if (modalPage === 'payment') {
        (_e = $qs('.color-changing-payment')) === null || _e === void 0 ? void 0 : _e.classList.remove('hide');
        (_f = $qs('#checkout-status')) === null || _f === void 0 ? void 0 : _f.classList.add('circle-logo-two');
    }
    else {
        (_g = $qs('.color-changing-payment')) === null || _g === void 0 ? void 0 : _g.classList.add('hide');
        (_h = $qs('#checkout-status')) === null || _h === void 0 ? void 0 : _h.classList.remove('circle-logo-two');
    }
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
}
function renderPaymentPageDisplay(modalPage, existingCustomer, isMobile) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    if (modalPage === 'payment') {
        if (existingCustomer) {
            (_a = $qs('#pp-new-customer-checkout')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
            (_b = $qs('#pp-existing-customer-checkout')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
            (_c = $qs('#pp-modal-content')) === null || _c === void 0 ? void 0 : _c.classList.add('col');
            (_d = $qs('#pp-modal-content')) === null || _d === void 0 ? void 0 : _d.classList.add('w-existing-checkout');
            (_e = $qs('#pp-modal-content')) === null || _e === void 0 ? void 0 : _e.classList.add('p-1-5');
            (_f = $qs('.order-summary-heading')) === null || _f === void 0 ? void 0 : _f.classList.add('hide');
            $qs('#pp-summary-body', function ($element) { return $element.style.borderBottom = 'none'; });
            for (var _i = 0, _v = $qsAll('.split'); _i < _v.length; _i++) {
                var $element6 = _v[_i];
                $element6.style.setProperty('float', 'left', 'important');
            }
        }
        else {
            (_g = $qs('#pp-new-customer-checkout')) === null || _g === void 0 ? void 0 : _g.classList.remove('hide');
            (_h = $qs('#pp-existing-customer-checkout')) === null || _h === void 0 ? void 0 : _h.classList.add('hide');
            (_j = $qs('#pp-modal-content')) === null || _j === void 0 ? void 0 : _j.classList.remove('col');
            (_k = $qs('#pp-modal-content')) === null || _k === void 0 ? void 0 : _k.classList.remove('w-existing-checkout');
            (_l = $qs('#pp-modal-content')) === null || _l === void 0 ? void 0 : _l.classList.remove('p-1-5');
        }
        (_m = $qs('#extra-fields-section')) === null || _m === void 0 ? void 0 : _m.classList.remove('hide');
    }
    else {
        if (isMobile) {
            (_o = $qs('#extra-fields-section')) === null || _o === void 0 ? void 0 : _o.classList.add('hide');
        }
        (_p = $qs('.order-summary-heading')) === null || _p === void 0 ? void 0 : _p.classList.remove('hide');
        (_q = $qs('#pp-new-customer-checkout')) === null || _q === void 0 ? void 0 : _q.classList.remove('hide');
        (_r = $qs('#pp-existing-customer-checkout')) === null || _r === void 0 ? void 0 : _r.classList.add('hide');
        (_s = $qs('#pp-modal-content')) === null || _s === void 0 ? void 0 : _s.classList.remove('col');
        (_t = $qs('#pp-modal-content')) === null || _t === void 0 ? void 0 : _t.classList.remove('w-existing-checkout');
        (_u = $qs('#pp-modal-content')) === null || _u === void 0 ? void 0 : _u.classList.remove('p-1-5');
    }
}
function renderInfoPageDisplay(modalPage) {
    var _a, _b;
    if (modalPage === 'info') {
        (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        for (var _i = 0, _c = $qsAll('.split'); _i < _c.length; _i++) {
            var $element = _c[_i];
            $element.style.setProperty('float', 'none', 'important');
        }
    }
    else {
        (_b = $qs('#pp-info')) === null || _b === void 0 ? void 0 : _b.classList.add('hide');
    }
}
function initMetrics() {
    var _a, _b, _c, _d, _e;
    (_a = $qs('#pp-pay')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay'); });
    (_b = $qs('#pp-pay-mobile')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay-mobile'); });
    (_c = $qs('#pp-pay-existing')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return recordNonPPButtonClick('pp-pay-existing'); });
    (_d = $qs('#pp-continue')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return recordNonPPButtonClick('pp-continue'); });
    (_e = $qs('#pp-continue-mobile')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return recordNonPPButtonClick('pp-continue-mobile'); });
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
(function (PPButtonLocation1) {
    PPButtonLocation1["Product"] = 'product';
    PPButtonLocation1["Checkout"] = 'checkout';
    PPButtonLocation1["MiniCart"] = 'mini-cart';
    PPButtonLocation1["Cart"] = 'cart';
    PPButtonLocation1["NotApplicable"] = 'not-applicable';
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
var defaultFormHTML = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"phone\" class=\"w-100 text-input\" type=\"tel\" name=\"phone\" placeholder=\" \"required>\n\t\t<label for=\"phone\" data-i18n=\"phone\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\" type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-70\">\n\t\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n\t</div>\n\t<div class=\"flex w-30\">\n\t\t<input id=\"address2\" type=\"text\" name=\"address2\" placeholder=\" \" class=\"w-100 text-input\">\n\t\t<label for=\"address2\" data-i18n=\"apt\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\" data-i18n=\"state\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-label\" class=\"form-label region-country-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"Delivery date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
var japaneseFormHTML = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"phone\" class=\"w-100 text-input\" type=\"tel\" name=\"phone\" placeholder=\" \" required>\n\t\t<label for=\"phone\" data-i18n=\"phone\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\"  type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"select-country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-labely\" class=\"form-label region-country-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value>State</option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\">Region</label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-70\">\n\t\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n\t</div>\n\t<div class=\"flex w-30\">\n\t\t<input id=\"address2\" type=\"text\" name=\"address2\" placeholder=\" \" class=\"w-100 text-input\">\n\t\t<label for=\"address2\" data-i18n=\"apt\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"Delivery date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
var checkoutFormNoPhoneNoApt = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\" type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\" data-i18n=\"state\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-label\" class=\"form-label region-country-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"Delivery date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
function initLinkedProducts() {
    var _a, _b, _c;
    (_a = $qs('.prev-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', scrollLeft);
    (_b = $qs('.next-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', scrollRight);
    (_c = $qs('#products-list')) === null || _c === void 0 ? void 0 : _c.addEventListener('scroll', scrollAdjuster);
    var previousCartData = '';
    store.subscribe(function () {
        if (Environment.plugin.pageType() === 'product' || Environment.plugin.pageType() === 'cart') {
            var cartData = JSON.stringify(DefaultCart.contents());
            if (cartData !== previousCartData) {
                previousCartData = cartData;
                renderLinkedProducts(DefaultCart.contents());
                setAddButtonColor(Environment.plugin.buttonColor());
            }
        }
    });
}
function clearLinkedProducts() {
    for (var _i = 0, _a = $qsAll('.product-body'); _i < _a.length; _i++) {
        var linkedItem = _a[_i];
        linkedItem.remove();
    }
}
function setAddButtonColor(color) {
    if (color === void 0) { color = '#FF876C'; }
    for (var _i = 0, _a = $qsAll('.add-btn'); _i < _a.length; _i++) {
        var addBtn = _a[_i];
        addBtn.style.backgroundColor = color;
        addBtn.style.border = '1px solid' + color;
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
                if (linkedItem.has_stock === undefined) {
                    linkedItem.has_stock = true;
                }
                if (!linkedItem.variable && !linkedItem.bundle && linkedItem.has_stock && !hasSameLinkedProduct(linkedItem.id)) {
                    var productsList = $qs('#products-list');
                    var productBody = document.createElement('div');
                    productBody.className = 'product-body';
                    productBody.id = String(linkedItem.id);
                    if (linkedItem.img_src) {
                        productBody.innerHTML = "<img class=\"linked-product-img\" src=".concat(linkedItem.img_src, ">");
                    }
                    productBody.innerHTML += "<div class=\"linked-product-desc\">\n\t\t\t\t\t\t\t\t\t\t\t\t <span class=\"linked-product-name\">".concat(linkedItem.name, "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t <span class=\"linked-product-quantity\">Quantity: 1</span>\n\t\t\t\t\t\t\t\t\t\t\t\t <span class=\"linked-product-price\">").concat(formatCurrencyString(Number.parseFloat(linkedItem.price)), "</span>\n\t\t\t\t\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t\t\t\t\t <button class=\"add-btn\" data-pid=").concat(linkedItem.id, " data-i18n=\"add\"></button>");
                    productsList === null || productsList === void 0 ? void 0 : productsList.prepend(productBody);
                }
            }
        }
    }
    setAddButtonColor();
    removeLinkedProduct(cart);
    for (var _b = 0, _c = $qsAll('.add-btn'); _b < _c.length; _b++) {
        var addBtn = _c[_b];
        addBtn.addEventListener('click', function (event) {
            store.dispatch(startModalLoading());
            event.target.disabled = true;
            event.target.innerHTML = '<img src="img/spinner.svg" class="linked-product-spinner"/>';
            addLinkedProducttoCart(event.target);
        });
    }
}
function addLinkedProducttoCart(linkedProduct) {
    var _a;
    (_a = GLOBAL.linkedProductsIds) === null || _a === void 0 ? void 0 : _a.push(Number.parseInt(linkedProduct.dataset.pid));
    window.parent.postMessage({
        event: 'addLinkedProduct',
        productID: linkedProduct.dataset.pid
    }, '*');
}
function removeLinkedProduct(cart) {
    var _a, _b, _c, _d, _e;
    for (var _i = 0, _f = $qsAll('.product-body'); _i < _f.length; _i++) {
        var linkedProduct = _f[_i];
        for (var i = cart.length - 1; i >= 0; i--) {
            var item = cart[i];
            if (item.product_id === Number.parseInt(linkedProduct.id)) {
                linkedProduct.remove();
            }
        }
    }
    if ($qsAll('.product-body').length > 1) {
        (_a = $qs('.prev-btn')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
        (_b = $qs('.next-btn')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
    else {
        (_c = $qs('.prev-btn')) === null || _c === void 0 ? void 0 : _c.classList.add('hide');
        (_d = $qs('.next-btn')) === null || _d === void 0 ? void 0 : _d.classList.add('hide');
    }
    if (!$qs('.product-body')) {
        (_e = $qs('#linked-products-section')) === null || _e === void 0 ? void 0 : _e.classList.add('hide');
    }
    scrollAdjuster();
}
function hasSameLinkedProduct(productID) {
    for (var _i = 0, _a = $qsAll('.product-body'); _i < _a.length; _i++) {
        var product = _a[_i];
        if (Number.parseInt(product.id) === productID) {
            return true;
        }
    }
    return false;
}
function scrollRight() {
    var _a;
    (_a = $qs('.prev-btn')) === null || _a === void 0 ? void 0 : _a.classList.remove('scroll-end');
    $qs('#products-list', function ($element) { return $element.scrollLeft += 392; });
}
function scrollLeft() {
    var _a;
    (_a = $qs('.next-btn')) === null || _a === void 0 ? void 0 : _a.classList.remove('scroll-end');
    $qs('#products-list', function ($element) { return $element.scrollLeft -= 392; });
}
function scrollAdjuster() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var scrollEnd = ((_a = $qs('#products-list')) === null || _a === void 0 ? void 0 : _a.scrollLeft) ? (_b = $qs('#products-list')) === null || _b === void 0 ? void 0 : _b.scrollLeft : 1;
    var offset = (_c = $qs('#products-list')) === null || _c === void 0 ? void 0 : _c.offsetWidth;
    var scrollWidth = (_d = $qs('#products-list')) === null || _d === void 0 ? void 0 : _d.scrollWidth;
    if (((_e = $qs('#products-list')) === null || _e === void 0 ? void 0 : _e.scrollLeft) === 0) {
        (_f = $qs('.prev-btn')) === null || _f === void 0 ? void 0 : _f.classList.add('scroll-end');
        (_g = $qs('.next-btn')) === null || _g === void 0 ? void 0 : _g.classList.remove('scroll-end');
    }
    else if (scrollEnd && scrollWidth && offset && scrollEnd + 1 >= scrollWidth - offset) {
        (_h = $qs('.next-btn')) === null || _h === void 0 ? void 0 : _h.classList.add('scroll-end');
        (_j = $qs('.prev-btn')) === null || _j === void 0 ? void 0 : _j.classList.remove('scroll-end');
    }
    else {
        (_k = $qs('.next-btn')) === null || _k === void 0 ? void 0 : _k.classList.remove('scroll-end');
        (_l = $qs('.prev-btn')) === null || _l === void 0 ? void 0 : _l.classList.remove('scroll-end');
    }
}
function sendCartItems(_cart, sessionID) {
    return __awaiter(this, void 0, void 0, function () {
        var requestBody, options, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!GLOBAL.phpData) {
                        return [2];
                    }
                    if (!GLOBAL.phpData.has_valid_key) {
                        return [2];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    requestBody = {
                        'session_id': sessionID,
                        'items': [],
                        'merchant_name': MerchantConfiguration.name(),
                        'merchant_hostname': MerchantConfiguration.hostName()
                    };
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    };
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'session/item', options)];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    error_8 = _a.sent();
                    if (error_8 instanceof Error) {
                        captureSentryException(new Error("Send cart items failed on ".concat(MerchantConfiguration.hostName(), ", Error: ").concat(error_8.message)));
                    }
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function initOneClickCheckout(testMode) {
    var oneClickURL = getOneClickURL(location.hostname, testMode);
    var $body = document.querySelector('body');
    $body === null || $body === void 0 ? void 0 : $body.insertAdjacentHTML('beforeend', "\n\t<iframe id=\"one-click-iframe\" \n\t\tframeborder=\"0\" \n\t\tallowtransparency=\"true\" \n\t\tscrolling=\"no\" \n\t\tallow=\"payment *\"\n\t\taria-hidden=\"true\" \n\t\ttabindex=\"-1\" \n\t\tstyle=\"border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; visibility: hidden !important; position: fixed !important; height: 1px !important; pointer-events: none !important; user-select: none !important;\"\n\t\tsrc=\"".concat(oneClickURL, "one-click.html\"\n\t>\n\t\tUnable to load PeachPay One Click Checkout Support\n\t</iframe>"));
}
(function () {
    var _this = this;
    onWindowMessage('init', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var orderService, sessionResponse, session;
        var _this = this;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    store.dispatch(updateMerchantHostName(message.merchantHostname));
                    addFormFields(message.phpData.language);
                    GLOBAL.phpData = message.phpData;
                    if (typeof GLOBAL.phpData.has_valid_key === 'undefined') {
                        GLOBAL.phpData.has_valid_key = true;
                    }
                    store.dispatch(updateMerchantName(message.phpData.merchant_name));
                    store.dispatch(setFeatureSupport(message.phpData.feature_support, message.phpData));
                    store.dispatch(updateLanguage(message.phpData.language === 'detect-from-page' ? message.pageLanguage : message.phpData.language));
                    store.dispatch(updateEnvironment({
                        pluginIsTestMode: Boolean(message.isTestMode),
                        pluginPageType: determinePageType(message.isCartPage, message.isCheckoutPage),
                        customerIsMobile: message.isMobile,
                        pluginButtonColor: message.phpData.button_color,
                        pluginVersion: message.phpData.version
                    }));
                    initModal();
                    initDeliveryDate();
                    initMetrics();
                    initLinkedProducts();
                    initOrderNotes();
                    initCart();
                    initLanguage(message);
                    initSummary(message);
                    initCouponInput(message);
                    initGiftCardInput(message);
                    initShipping(message);
                    initCustomer(message);
                    initCurrency(message);
                    initMerchantAccount(message);
                    initVAT(message);
                    initCurrencySwitcher();
                    if (Feature.enabled(FeatureFlag.ADDITIONAL_FIELDS)) {
                        renderAdditionalFields((_b = (_a = message.phpData) === null || _a === void 0 ? void 0 : _a.additional_fields) !== null && _b !== void 0 ? _b : [], (_d = (_c = message.phpData) === null || _c === void 0 ? void 0 : _c.additional_fields_order) !== null && _d !== void 0 ? _d : []);
                    }
                    orderService = getOrderService();
                    return [4, initStripeSupport(message, orderService)];
                case 1:
                    _e.sent();
                    return [4, initPayPalSupport(message, orderService)];
                case 2:
                    _e.sent();
                    return [4, fetch(getBaseURL(MerchantConfiguration.hostName(), Environment.testMode()) + 'session')];
                case 3:
                    sessionResponse = _e.sent();
                    return [4, sessionResponse.json()];
                case 4:
                    session = _e.sent();
                    store.dispatch(updateSessionId(session.id));
                    return [4, sendCartItems(DefaultCart.contents(), session.id)];
                case 5:
                    _e.sent();
                    initOneClickCheckout(message.isTestMode);
                    onWindowMessage('pp-one-click-loaded', function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, loadCustomer()];
                                case 1:
                                    _b.sent();
                                    store.dispatch(startModalLoading());
                                    if (!message.phpData.paypal && PeachPayCustomer.preferredPaymentMethod() === 'paypal' || !isCurrencySupportedByPaypal()) {
                                        store.dispatch(updatePreferredPaymentMethod('stripe'));
                                        store.dispatch(updateEnvironment({
                                            modalPageType: 'info',
                                            customerExists: false
                                        }));
                                    }
                                    return [4, requestCartCalculation()];
                                case 2:
                                    _b.sent();
                                    store.dispatch(stopModalLoading());
                                    (_a = self.parent) === null || _a === void 0 ? void 0 : _a.postMessage('loaded', '*');
                                    return [2];
                            }
                        });
                    }); });
                    return [2];
            }
        });
    }); });
})();
function addFormFields(lang) {
    var _a;
    var form = defaultFormHTML;
    if (lang === 'ja') {
        form = japaneseFormHTML;
    }
    if (MerchantConfiguration.hostName() === 'initialaudio.com') {
        form = checkoutFormNoPhoneNoApt;
    }
    (_a = $qs('#pp-info')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', form);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJtZWRpYXRlL2J1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxTQUFTLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBUztJQUFULG1CQUFBLEVBQUEsU0FBUztJQUM1QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksUUFBUSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRO0lBQzlCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBSSxRQUFRLEVBQUU7UUFDVixLQUF1QixVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU0sRUFBQztZQUF6QixJQUFNLFFBQVEsZUFBQTtZQUNmLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQXRDLGlCQU1DO0lBTEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFPLEtBQUs7Ozs7eUJBQ3JDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFBLEVBQTlCLGNBQThCO29CQUM5QixXQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztTQUU1QixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLGVBQWU7SUFBcEQsaUJBZUM7SUFkRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQU8sT0FBTzs7Ozs7eUJBQ3ZDLENBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFBLEVBQS9CLGNBQStCOzs7O29CQUVWLFdBQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUF0RCxRQUFRLEdBQUcsU0FBMkM7b0JBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUN6QixNQUFNLEVBQUUsUUFBUTtxQkFDbkIsQ0FBQyxDQUFDOzs7O29CQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUN6QixLQUFLLFNBQUE7cUJBQ1IsQ0FBQyxDQUFDOzs7OztTQUdkLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU87SUFDcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQy9CLElBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBQyxFQUFTO2dCQUFQLElBQUksVUFBQTtZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0gsWUFBWSxDQUFDLFdBQVcsQ0FBQztnQkFDckIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxTQUFBO2FBQ1YsRUFBRSxHQUFHLEVBQUU7Z0JBQ0osT0FBTyxDQUFDLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPO0lBQzFDLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFDRCxJQUFJLGtCQUFrQixDQUFDO0FBQ3ZCLENBQUMsVUFBUyxtQkFBbUI7SUFDekIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3JDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsQ0FBQztJQUNuRCxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLHlCQUF5QixDQUFDO0lBQ25FLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEdBQUcsZ0NBQWdDLENBQUM7SUFDbEYsbUJBQW1CLENBQUMsd0JBQXdCLENBQUMsR0FBRywrQkFBK0IsQ0FBQztJQUNoRixtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLGdDQUFnQyxDQUFDO0lBQ2xGLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsbUJBQW1CLENBQUM7SUFDL0QsbUJBQW1CLENBQUMsNkJBQTZCLENBQUMsR0FBRyw0QkFBNEIsQ0FBQztJQUNsRixtQkFBbUIsQ0FBQyxrQ0FBa0MsQ0FBQyxHQUFHLGtDQUFrQyxDQUFDO0lBQzdGLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsbUJBQW1CLENBQUM7SUFDL0QsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsR0FBRyx5QkFBeUIsQ0FBQztJQUMzRSxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO0lBQy9ELG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsQ0FBQztJQUN2RCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0lBQy9ELG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsa0JBQWtCLENBQUM7SUFDN0QsbUJBQW1CLENBQUMsMkJBQTJCLENBQUMsR0FBRywyQkFBMkIsQ0FBQztJQUMvRSxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0lBQzlELG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztJQUNyRCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0lBQy9ELG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLEdBQUcsdUJBQXVCLENBQUM7SUFDdkUsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsR0FBRywwQkFBMEIsQ0FBQztJQUM3RSxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0lBQzdELG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEdBQUcseUJBQXlCLENBQUM7SUFDM0UsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsR0FBRywwQkFBMEIsQ0FBQztJQUM3RSxtQkFBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLDRCQUE0QixDQUFDO0FBQ3JGLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCxJQUFNLFlBQVksR0FBRztJQUNqQixXQUFXLEVBQUU7UUFDVCxRQUFRLEVBQUUsT0FBTztRQUNqQixNQUFNLEVBQUU7WUFDSixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsY0FBYyxFQUFFLEVBQUU7U0FDckI7UUFDRCxRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxVQUFVO1NBQzFCO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLHdCQUF3QixFQUFFLEtBQUs7UUFDL0IsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixZQUFZLEVBQUUsRUFBRTtLQUNuQjtJQUNELGdCQUFnQixFQUFFO1FBQ2QsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxFQUFFO1FBQ1YsS0FBSyxFQUFFLEVBQUU7S0FDWjtJQUNELGdCQUFnQixFQUFFO1FBQ2QsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsS0FBSztRQUNmLG9CQUFvQixFQUFFLEtBQUs7S0FDOUI7SUFDRCxxQkFBcUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osT0FBTyxFQUFFO1lBQ0wsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxLQUFLO2dCQUNYLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixtQkFBbUIsRUFBRSxHQUFHO2dCQUN4QixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsa0JBQWtCLEVBQUUsQ0FBQzthQUN4QjtTQUNKO1FBQ0QsUUFBUSxFQUFFO1lBQ04sYUFBYSxFQUFFLENBQUM7U0FDbkI7UUFDRCxHQUFHLEVBQUU7WUFDRCw4QkFBOEIsRUFBRSxZQUFZO1NBQy9DO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDaEIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4Qix5Q0FBeUMsRUFBRSxJQUFJO1lBQy9DLG9CQUFvQixFQUFFLEtBQUs7WUFDM0Isb0JBQW9CLEVBQUUsS0FBSztTQUM5QjtLQUNKO0lBQ0QsZUFBZSxFQUFFO1FBQ2IsQ0FBQyxFQUFFO1lBQ0MsY0FBYyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixTQUFTLEVBQUUsQ0FBQztnQkFDWixLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxLQUFLO2FBQ3BCO1NBQ0o7S0FDSjtDQUNKLENBQUM7QUFDRixTQUFTLG9CQUFvQixDQUFDLElBQUk7SUFDOUIsT0FBTyxVQUFDLE9BQU8sSUFBRyxPQUFBLENBQUM7UUFDWCxJQUFJLE1BQUE7UUFDSixPQUFPLFNBQUE7S0FDVixDQUFDLEVBSFksQ0FHWixDQUNMO0FBQ0wsQ0FBQztBQUNELFNBQVMsNEJBQTRCLENBQUMsS0FBSyxFQUFFLE1BQU07SUFDL0MsUUFBTyxNQUFNLENBQUMsSUFBSSxFQUFDO1FBQ2YsS0FBSyxrQkFBa0IsQ0FBQyx5QkFBeUI7WUFDN0MsNkJBQ08sS0FBSyxLQUNSLE9BQU8sd0JBQ0EsS0FBSyxDQUFDLE9BQU8sS0FDaEIsUUFBUSxlQUNELE1BQU0sQ0FBQyxPQUFPLFFBRzNCO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyxnQkFBZ0I7WUFDcEMsNkJBQ08sS0FBSyxLQUNSLE9BQU8sZUFDQSxNQUFNLENBQUMsT0FBTyxLQUV2QjtRQUNOLEtBQUssa0JBQWtCLENBQUMsZ0JBQWdCO1lBQ3BDLDZCQUNPLEtBQUssS0FDUixrQkFBa0IsZUFDWCxNQUFNLENBQUMsT0FBTyxLQUV2QjtRQUNOLEtBQUssa0JBQWtCLENBQUMsWUFBWTtZQUNoQyw2QkFDTyxLQUFLLEtBQ1IsR0FBRyxlQUNJLE1BQU0sQ0FBQyxPQUFPLEtBRXZCO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyxpQkFBaUI7WUFDckMsNkJBQ08sS0FBSyxLQUNSLFFBQVEsZUFDRCxNQUFNLENBQUMsT0FBTyxLQUV2QjtRQUNOLEtBQUssa0JBQWtCLENBQUMsaUJBQWlCO1lBQ3JDLDZCQUNPLEtBQUssS0FDUixRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDMUI7UUFDTixLQUFLLGtCQUFrQixDQUFDLGFBQWE7WUFDakMsNkJBQ08sS0FBSyxLQUNSLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxJQUN0QjtRQUNOO1lBQ0ksT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2QztBQUNMLENBQUM7QUFDRCxTQUFTLG9CQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNO0lBQ3ZDLFFBQU8sTUFBTSxDQUFDLElBQUksRUFBQztRQUNmLEtBQUssa0JBQWtCLENBQUMsZUFBZTtZQUNuQyw2QkFDTyxLQUFLLEtBQ1IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQzNCO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyx1QkFBdUI7WUFDM0MsNkJBQ08sS0FBSyxLQUNSLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQzFDO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyxzQkFBc0I7WUFDMUMsNkJBQ08sS0FBSyxLQUNSLGdCQUFnQixlQUNULE1BQU0sQ0FBQyxPQUFPLEtBRXZCO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyx1QkFBdUI7WUFDM0MsNkJBQ08sS0FBSyxLQUNSLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxJQUM5QjtRQUNOO1lBQ0ksb0JBQ08sS0FBSyxFQUNWO0tBQ1Q7QUFDTCxDQUFDO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsTUFBTTtJQUNyQyxRQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUM7UUFDZixLQUFLLGtCQUFrQixDQUFDLFdBQVc7WUFDL0IsNkJBQ08sTUFBTSxDQUFDLE9BQU8sS0FDakIsUUFBUSxlQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUU5QixNQUFNLGVBQ0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBRTVCLE9BQU8sZUFDQSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FFL0I7UUFDTixLQUFLLGtCQUFrQixDQUFDLG9CQUFvQjtZQUN4Qyw2QkFDTyxLQUFLLEtBQ1IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQzFCO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyx3QkFBd0I7WUFDNUMsNkJBQ08sS0FBSyxLQUNSLE1BQU0sd0JBQ0MsS0FBSyxDQUFDLE1BQU0sS0FDZixjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sT0FFcEM7UUFDTjtZQUNJLDZCQUNPLEtBQUssS0FDUixPQUFPLGVBQ0EsS0FBSyxDQUFDLE9BQU8sS0FFdEI7S0FDVDtBQUNMLENBQUM7QUFDRCxTQUFTLHVCQUF1QixDQUFDLEtBQUssRUFBRSxNQUFNO0lBQzFDLFFBQU8sTUFBTSxDQUFDLElBQUksRUFBQztRQUNmLEtBQUssa0JBQWtCLENBQUMsaUJBQWlCO1lBQ3JDLG9CQUNPLE1BQU0sQ0FBQyxPQUFPLEVBQ25CO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyx1QkFBdUI7WUFDM0MsNkJBQ08sS0FBSyxLQUNSLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQ3RDO1FBQ047WUFDSSxvQkFDTyxLQUFLLEVBQ1Y7S0FDVDtBQUNMLENBQUM7QUFDRCxTQUFTLHVCQUF1QixDQUFDLEtBQUssRUFBRSxNQUFNO0lBQzFDLFFBQU8sTUFBTSxDQUFDLElBQUksRUFBQztRQUNmLEtBQUssa0JBQWtCLENBQUMsaUJBQWlCO1lBQ3JDLG9CQUNPLE1BQU0sQ0FBQyxPQUFPLEVBQ25CO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQywyQkFBMkI7WUFDL0MsNkJBQ08sS0FBSyxLQUNSLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQ3BDO1FBQ04sS0FBSyxrQkFBa0IsQ0FBQyxnQ0FBZ0M7WUFDcEQsNkJBQ08sS0FBSyxLQUNSLGNBQWMsRUFBRSxNQUFNLENBQUMsT0FBTyxJQUNoQztRQUNOLEtBQUssa0JBQWtCLENBQUMsMEJBQTBCO1lBQzlDLHNDQUNPLEtBQUssR0FDTCxNQUFNLENBQUMsT0FBTyxLQUNqQixNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQ2pDO1FBQ047WUFDSSxvQkFDTyxLQUFLLEVBQ1Y7S0FDVDtBQUNMLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTTs7SUFDOUIsUUFBTyxNQUFNLENBQUMsSUFBSSxFQUFDO1FBQ2YsS0FBSyxrQkFBa0IsQ0FBQyxxQkFBcUI7WUFDekMsNkJBQ08sS0FBSyxLQUNSLENBQUMsd0JBQ00sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUNiLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxPQUUxQjtRQUNOLEtBQUssa0JBQWtCLENBQUMsd0JBQXdCO1lBQzVDLDZCQUNPLEtBQUssS0FDUixDQUFDLGVBQ00sTUFBTSxDQUFDLE9BQU8sS0FFdkI7UUFDTixLQUFLLGtCQUFrQixDQUFDLGdCQUFnQjtZQUNwQyxvQkFDTyxNQUFNLENBQUMsT0FBTyxFQUNuQjtRQUNOLEtBQUssa0JBQWtCLENBQUMsdUJBQXVCO1lBQzNDO2dCQUNJLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQy9CLElBQU0sUUFBUSxnQkFDUCxLQUFLLENBQ1gsQ0FBQztnQkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxjQUFjLENBQUEsRUFBRTtvQkFDMUUsT0FBTyxRQUFRLENBQUM7aUJBQ25CO2dCQUNELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO29CQUM1QyxPQUFPLFFBQVEsQ0FBQztpQkFDbkI7Z0JBQ0QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO2dCQUNwRixPQUFPLFFBQVEsQ0FBQzthQUNuQjtRQUNMO1lBQ0ksb0JBQ08sS0FBSyxFQUNWO0tBQ1Q7QUFDTCxDQUFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsS0FBb0IsRUFBRSxNQUFNO0lBQTVCLHNCQUFBLEVBQUEsb0JBQW9CO0lBQ3JDLDZCQUNPLEtBQUssS0FDUixhQUFhLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFDaEUsV0FBVyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEVBQzFELGdCQUFnQixFQUFFLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFDekUsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUN6RSxxQkFBcUIsRUFBRSw0QkFBNEIsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLEVBQ3hGLGVBQWUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFDN0Q7QUFDTixDQUFDO0FBQ0QsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZDLFNBQVMsaUJBQWlCLENBQUMsT0FBTzs7SUFDOUIsT0FBTztRQUNILElBQUksRUFBRSxrQkFBa0IsQ0FBQyxXQUFXO1FBQ3BDLE9BQU8sRUFBRTtZQUNMLFFBQVEsRUFBRSxNQUFBLE9BQU8sQ0FBQyxRQUFRLG1DQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDcEQsUUFBUSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxNQUFBLE9BQU8sQ0FBQyxjQUFjLG1DQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNuRSxNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsZ0JBQWdCLG1DQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2FBQ3BFO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxNQUFBLE9BQU8sQ0FBQyxhQUFhLG1DQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUM5RCxJQUFJLEVBQUUsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDNUgsV0FBVyxFQUFFLE1BQUEsT0FBTyxDQUFDLGlCQUFpQixtQ0FBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDMUUsUUFBUSxFQUFFLE1BQUEsT0FBTyxDQUFDLGNBQWMsbUNBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pFLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjO2FBQ3JFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxNQUFBLE9BQU8sQ0FBQyxXQUFXLG1DQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUN2RCxJQUFJLEVBQUUsTUFBQSxPQUFPLENBQUMsYUFBYSxtQ0FBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDekQsV0FBVyxFQUFFLE1BQUEsT0FBTyxDQUFDLFlBQVksbUNBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7YUFDekU7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxRQUFhLEVBQUUsT0FBTztJQUF0Qix5QkFBQSxFQUFBLGFBQWE7SUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDckMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRztZQUNqQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDeEMsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFDO0tBQ0w7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHO1lBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQzVDLE9BQU8sRUFBRSxDQUFDO1NBQ2IsQ0FBQztLQUNMO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDdkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRztZQUNuQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQztZQUNqRSxPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUM7S0FDTDtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQy9CLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDM0IsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUM7S0FDTDtJQUNELE9BQU87UUFDSCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsd0JBQXdCO1FBQ2pELE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7QUFDTixDQUFDO0FBQ0QsSUFBTSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRixJQUFNLGlCQUFpQixHQUFHLGNBQUksT0FBQSxpQkFBaUIsQ0FBQztJQUN4QyxZQUFZLEVBQUUsU0FBUztDQUMxQixDQUFDLEVBRndCLENBRXhCLENBQ0w7QUFDRCxJQUFNLG9CQUFvQixHQUFHLGNBQUksT0FBQSxpQkFBaUIsQ0FBQztJQUMzQyxZQUFZLEVBQUUsWUFBWTtDQUM3QixDQUFDLEVBRjJCLENBRTNCLENBQ0w7QUFDRCxJQUFNLGdCQUFnQixHQUFHLGNBQUksT0FBQSxpQkFBaUIsQ0FBQztJQUN2QyxZQUFZLEVBQUUsVUFBVTtDQUMzQixDQUFDLEVBRnVCLENBRXZCLENBQ0w7QUFDRCxJQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQTVCLENBQTRCO0lBRTdDLFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQXJDLENBQXFDO0lBRW5ELFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBbkQsQ0FBbUQ7SUFFakUsUUFBUSxFQUFFO1FBQ04sUUFBUSxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQTlDLENBQThDO1FBRTVELE1BQU0sRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUE1QyxDQUE0QztLQUMzRDtJQUNELE1BQU0sRUFBRTtRQUNKLE9BQU8sRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUEzQyxDQUEyQztRQUV4RCxJQUFJLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBeEMsQ0FBd0M7UUFFbEQsV0FBVyxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQS9DLENBQStDO1FBRWhFLFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUE1QyxDQUE0QztLQUM3RDtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUF6QyxDQUF5QztRQUVuRCxJQUFJLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBekMsQ0FBeUM7UUFFbkQsV0FBVyxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQWhELENBQWdEO0tBQ3BFO0NBQ0osQ0FBQztBQUNGLFNBQVMsYUFBYSxDQUFDLEdBQUc7SUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNwQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDdkQ7SUFDRCxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBQ0QsSUFBTSw0QkFBNEIsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3hHLElBQU0sdUJBQXVCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEYsSUFBTSwyQkFBMkIsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlGLElBQU0sMkJBQTJCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RixJQUFNLDRCQUE0QixHQUFHLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDaEcsSUFBTSxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzFGLElBQU0sa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEYsSUFBTSxxQkFBcUIsR0FBRztJQUMxQixJQUFJLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQTNDLENBQTJDO0lBRXJELFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBL0MsQ0FBK0M7SUFFN0QsT0FBTyxFQUFFO1FBQ0wsa0JBQWtCLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQWpFLENBQWlFO0tBQzVGO0lBQ0QsUUFBUSxFQUFFO1FBQ04sYUFBYSxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBdkQsQ0FBdUQ7UUFFMUUsSUFBSSxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQTVELENBQTREO1FBRXRFLE1BQU0sRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUE5RCxDQUE4RDtLQUM3RTtJQUNELEdBQUcsRUFBRTtRQUNELFdBQVcsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBekUsQ0FBeUU7S0FDN0Y7SUFDRCxRQUFRLEVBQUU7UUFDTixhQUFhLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUE3RCxDQUE2RDtLQUNuRjtJQUNELFFBQVEsRUFBRTtRQUNOLDBCQUEwQixFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMseUNBQXlDLEVBQW5HLENBQW1HO1FBRW5JLGtCQUFrQixFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLEVBQTVFLENBQTRFO1FBRXBHLHVCQUF1QixFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQTlFLENBQThFO1FBRTNHLHVCQUF1QixFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQTlFLENBQThFO0tBQzlHO0NBQ0osQ0FBQztBQUNGLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxjQUFjO0lBQ3hDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMxQixJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDL0IsSUFBSSxZQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ2xDLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzFCLElBQUksYUFBYSxHQUFHLGdCQUFnQixDQUFDO0lBQ3JDLElBQU0sUUFBUSxHQUFHLFVBQUMsTUFBTTtRQUNwQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLElBQUksU0FBUyxDQUFDLGlEQUFpRCxHQUFHLE9BQU8sTUFBTSxDQUFDLENBQUM7U0FDMUY7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDcEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxJQUFJO1lBQ0EsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNyQixZQUFZLEdBQUcsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2RDtnQkFBUTtZQUNMLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDekI7UUFDRCxJQUFNLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDbkQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFHLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxNQUFNLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN0QyxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsUUFBUSxFQUFFLENBQUM7U0FDZDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztJQUNGLElBQU0sUUFBUSxHQUFHO1FBQ2IsSUFBSSxhQUFhLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDLENBQUM7SUFDRixJQUFNLFNBQVMsR0FBRyxVQUFDLFFBQVE7O1FBQ3ZCLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQztTQUNyRztRQUNELElBQUksYUFBYSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksYUFBYSxLQUFLLGdCQUFnQixFQUFFO1lBQ3BDLGFBQWEsR0FBRyxNQUFBLGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLEtBQUssRUFBRSxtQ0FBSSxJQUFJLENBQUM7U0FDckQ7UUFDRCxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU87O1lBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixPQUFPO2FBQ1Y7WUFDRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7YUFDeEc7WUFDRCxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksYUFBYSxLQUFLLGdCQUFnQixFQUFFO2dCQUNwQyxhQUFhLEdBQUcsTUFBQSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxLQUFLLEVBQUUsbUNBQUksSUFBSSxDQUFDO2FBQ3JEO1lBQ0QsSUFBTSxLQUFLLEdBQUcsTUFBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxDQUFDLENBQUM7WUFDcEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztJQUNGLFFBQVEsQ0FBQztRQUNMLElBQUksRUFBRSxNQUFNO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsSUFBTSxNQUFNLEdBQUc7UUFDWCxRQUFRLFVBQUE7UUFDUixRQUFRLFVBQUE7UUFDUixTQUFTLFdBQUE7S0FDWixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELElBQU0scUJBQXFCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RixvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQy9ELElBQU0sK0JBQStCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUN6RyxTQUFTLG1CQUFtQixDQUFDLE9BQWE7SUFBYix3QkFBQSxFQUFBLGFBQWE7SUFDdEMsT0FBTztRQUNILHNCQUFzQixFQUFFLFVBQUMsVUFBZ0I7O1lBQWhCLDJCQUFBLEVBQUEsZ0JBQWdCO1lBQUcsT0FBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLGNBQWMsMENBQUcsVUFBVSxDQUFDLDBDQUFFLGVBQWUsbUNBQUksRUFBRSxDQUFBO1NBQUE7UUFFMUksNkJBQTZCLEVBQUUsVUFBQyxVQUFnQjs7WUFBaEIsMkJBQUEsRUFBQSxnQkFBZ0I7WUFBRyxPQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLGNBQWMsMENBQUcsVUFBVSxDQUFDLG1DQUFJLElBQUksQ0FBQTtTQUFBO1FBRWxJLFFBQVEsRUFBRSwwQkFBSSxPQUFBLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxJQUFJLG1DQUFJLEVBQUUsQ0FBQSxFQUFBO1FBRW5FLFFBQVEsRUFBRSwwQkFBSSxPQUFBLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxPQUFPLENBQUMsUUFBUSxtQ0FBSSxDQUFDLENBQUEsRUFBQTtRQUU5RSxRQUFRLEVBQUUsVUFBQyxHQUFHLGdCQUFHLE9BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG1DQUFJLENBQUMsQ0FBQSxFQUFBO1FBRXpGLGdCQUFnQixFQUFFOztZQUFJLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLFdBQVcsbUNBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxFQUFFLEVBQVU7b0JBQVQsQ0FBQyxRQUFBLEVBQUUsS0FBSyxRQUFBO2dCQUFJLE9BQUEsYUFBYSxHQUFHLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksQ0FBQyxDQUFDO1lBQTVCLENBQTRCLEVBQ3JLLENBQUMsQ0FBQyxDQUFBO1NBQUE7UUFFUixXQUFXLEVBQUUsVUFBQyxNQUFNLGdCQUFHLE9BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLG1DQUFJLENBQUMsQ0FBQSxFQUFBO1FBRXJHLG1CQUFtQixFQUFFOztZQUFJLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxFQUFFLEVBQVU7b0JBQVQsQ0FBQyxRQUFBLEVBQUUsS0FBSyxRQUFBO2dCQUFJLE9BQUEsYUFBYSxHQUFHLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksQ0FBQyxDQUFDO1lBQTVCLENBQTRCLEVBQzNLLENBQUMsQ0FBQyxDQUFBO1NBQUE7UUFFUixZQUFZLEVBQUUsc0JBQUksT0FBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUEsRUFBQTtRQUVuRixhQUFhLEVBQUUsVUFBQyxRQUFRLG9CQUFHLE9BQUEsTUFBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLGdCQUFnQiwwQ0FBRyxRQUFRLENBQUMsbUNBQUksQ0FBQyxDQUFBLEVBQUE7UUFFL0cscUJBQXFCLEVBQUU7O1lBQUksT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxPQUFPLENBQUMsZ0JBQWdCLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGFBQWEsRUFBRSxFQUFVO29CQUFULENBQUMsUUFBQSxFQUFFLEtBQUssUUFBQTtnQkFBSSxPQUFBLGFBQWEsR0FBRyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLENBQUMsQ0FBQztZQUE1QixDQUE0QixFQUMvSyxDQUFDLENBQUMsQ0FBQTtTQUFBO1FBRVIsYUFBYSxFQUFFLDBCQUFJLE9BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxjQUFjLG1DQUFJLENBQUMsQ0FBQSxFQUFBO1FBRXpGLFFBQVEsRUFBRSwwQkFBSSxPQUFBLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxPQUFPLENBQUMsU0FBUyxtQ0FBSSxDQUFDLENBQUEsRUFBQTtRQUUvRSxLQUFLLEVBQUUsMEJBQUksT0FBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLEtBQUssbUNBQUksQ0FBQyxDQUFBLEVBQUE7S0FDM0UsQ0FBQztBQUNOLENBQUM7QUFDRCxJQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QyxJQUFNLEtBQUssR0FBRztJQUNWLDJCQUEyQixFQUFFO1FBQ3pCLEtBQXNCLFVBQTZDLEVBQTdDLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQTdDLGNBQTZDLEVBQTdDLElBQTZDLEVBQUM7WUFBL0QsSUFBTSxPQUFPLFNBQUE7WUFDZCxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLFNBQVM7YUFDWjtZQUNELEtBQXlCLFVBQTBDLEVBQTFDLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQTFDLGNBQTBDLEVBQTFDLElBQTBDLEVBQUM7Z0JBQS9ELElBQU0sVUFBVSxTQUFBO2dCQUNqQixJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzFFLFNBQVM7aUJBQ1o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELHVCQUF1QixFQUFFOztRQUNyQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQy9DLElBQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ25DLEtBQW1CLFVBQW9CLEVBQXBCLEtBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0IsRUFBQztZQUFuQyxJQUFNLElBQUksU0FBQTtZQUNYLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsU0FBUzthQUNaO1lBQ0QsS0FBMEMsVUFBeUMsRUFBekMsS0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsSUFBSSxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDLEVBQXpDLGNBQXlDLEVBQXpDLElBQXlDLEVBQUM7Z0JBQXpFLElBQUEsV0FBMkIsRUFBMUIsVUFBVSxRQUFBLEVBQUUsYUFBYSxRQUFBO2dCQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNoQixTQUFTO2lCQUNaO2dCQUNELHVCQUF1QixDQUFDLElBQUksQ0FBQztvQkFDekIsU0FBUyxFQUFFLFVBQUcsVUFBVSxDQUFFO29CQUMxQixnQkFBZ0IsRUFBRSxhQUFhLENBQUMsZUFBZTtpQkFDbEQsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUNELE9BQU8sdUJBQXVCLENBQUM7SUFDbkMsQ0FBQztJQUNELG1CQUFtQixFQUFFO1FBQ2pCLEtBQXNCLFVBQTZDLEVBQTdDLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQTdDLGNBQTZDLEVBQTdDLElBQTZDLEVBQUM7WUFBL0QsSUFBTSxPQUFPLFNBQUE7WUFDZCxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLFNBQVM7YUFDWjtZQUNELElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDO0FBQ0YsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsU0FBUyxtQkFBbUIsQ0FBQyxPQUFPO0lBQ2hDLE9BQU87UUFDSCxJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsT0FBTztnQkFDSCxXQUFXLEVBQUUsSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRTtvQkFDTixVQUFVLEVBQUUsS0FBSztpQkFDcEI7YUFDSixDQUFDO1NBQ0w7UUFDRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2IsR0FBRyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDOUIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUTtTQUN6QyxDQUFDLENBQUM7UUFDSCxLQUErQixVQUFxRCxFQUFyRCxLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBckQsY0FBcUQsRUFBckQsSUFBcUQsRUFBQztZQUExRSxJQUFBLFdBQWdCLEVBQWYsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsU0FBUzthQUNaO1lBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDYixHQUFHLEVBQUUsVUFBRyxhQUFhLENBQUMsUUFBUSxDQUFDLGlCQUFPLE1BQU0sTUFBRztnQkFDL0MsS0FBSyxFQUFFLENBQUMsTUFBTTthQUNqQixDQUFDLENBQUM7U0FDTjtRQUNELEtBQTZCLFVBQWtELEVBQWxELEtBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFsRCxjQUFrRCxFQUFsRCxJQUFrRCxFQUFDO1lBQXJFLElBQUEsV0FBYyxFQUFiLEdBQUcsUUFBQSxFQUFFLE9BQU8sUUFBQTtZQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLFNBQVM7YUFDWjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsR0FBRyxFQUFFLGlCQUFVLEdBQUcsTUFBRztnQkFDckIsS0FBSyxFQUFFLE9BQU87YUFDakIsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDYixHQUFHLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYzthQUMvQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUkscUJBQXFCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksRUFBRTtZQUMxRCxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNiLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDO2dCQUN6QixLQUFLLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTO2FBQzFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsS0FBa0MsVUFBdUQsRUFBdkQsS0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBdkQsY0FBdUQsRUFBdkQsSUFBdUQsRUFBQztZQUEvRSxJQUFBLFdBQW1CLEVBQWxCLFFBQVEsUUFBQSxFQUFFLE9BQU8sUUFBQTtZQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLFNBQVM7YUFDWjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsR0FBRyxFQUFFLHVCQUFnQixRQUFRLE1BQUc7Z0JBQ2hDLEtBQUssRUFBRSxDQUFDLE9BQU87YUFDbEIsQ0FBQyxDQUFDO1NBQ047UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2IsR0FBRyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDM0IsS0FBSyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSztTQUN0QyxDQUFDLENBQUM7UUFDSCxPQUFPO1lBQ0gsV0FBVyxhQUFBO1lBQ1gsUUFBUSxVQUFBO1NBQ1gsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxJQUFNLFlBQVksR0FBRztJQUNqQixHQUFHLEVBQUU7UUFDRCxPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsV0FBVztRQUNwQixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxjQUFjO1FBQ2xCLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLFFBQVE7UUFDWixFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsZUFBZSxFQUFFO1FBQ2IsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLEVBQUUsRUFBRSxxQkFBcUI7UUFDekIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLEVBQUUsRUFBRSx1QkFBdUI7UUFDM0IsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxRQUFRO0tBQ3BCO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDdEIsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsRUFBRSxFQUFFLDhCQUE4QjtRQUNsQyxFQUFFLEVBQUUsNEJBQTRCO1FBQ2hDLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxFQUFFLEVBQUUsZUFBZTtRQUNuQixFQUFFLEVBQUUsMkJBQTJCO1FBQy9CLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixFQUFFLEVBQUUsZ0NBQWdDO1FBQ3BDLE9BQU8sRUFBRSxnQ0FBZ0M7UUFDekMsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLE9BQU8sRUFBRSxtQ0FBbUM7UUFDNUMsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUUsZ0NBQWdDO1FBQ3pDLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsK0JBQStCO1FBQ25DLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxXQUFXO0tBQ3ZCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFlBQVk7UUFDckIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsWUFBWTtRQUNoQixFQUFFLEVBQUUsTUFBTTtRQUNWLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLFdBQVc7UUFDZixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsYUFBYTtRQUN0QixFQUFFLEVBQUUsY0FBYztRQUNsQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxxQkFBcUIsRUFBRTtRQUNuQixPQUFPLEVBQUUsbUNBQW1DO1FBQzVDLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxFQUFFLEVBQUUsMEJBQTBCO1FBQzlCLEVBQUUsRUFBRSw2QkFBNkI7UUFDakMsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLEVBQUUsRUFBRSx3QkFBd0I7UUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLEVBQUUsRUFBRSxpQ0FBaUM7UUFDckMsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFNBQVM7S0FDckI7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLE9BQU8sRUFBRSwyR0FBMkc7UUFDcEgsT0FBTyxFQUFFLHFFQUFxRTtRQUM5RSxPQUFPLEVBQUUsb0VBQW9FO1FBQzdFLEVBQUUsRUFBRSxtRkFBbUY7UUFDdkYsRUFBRSxFQUFFLDBFQUEwRTtRQUM5RSxPQUFPLEVBQUUscUVBQXFFO1FBQzlFLEVBQUUsRUFBRSxzREFBc0Q7UUFDMUQsRUFBRSxFQUFFLHNGQUFzRjtRQUMxRixPQUFPLEVBQUUsOERBQThEO1FBQ3ZFLE9BQU8sRUFBRSx3REFBd0Q7UUFDakUsRUFBRSxFQUFFLG9FQUFvRTtRQUN4RSxPQUFPLEVBQUUsd0VBQXdFO1FBQ2pGLE9BQU8sRUFBRSwyQ0FBMkM7UUFDcEQsT0FBTyxFQUFFLDRGQUE0RjtRQUNyRyxPQUFPLEVBQUUsb0VBQW9FO1FBQzdFLE9BQU8sRUFBRSxpRUFBaUU7UUFDMUUsT0FBTyxFQUFFLHdFQUF3RTtRQUNqRixPQUFPLEVBQUUsb0VBQW9FO1FBQzdFLE9BQU8sRUFBRSwwREFBMEQ7UUFDbkUsRUFBRSxFQUFFLHVEQUF1RDtRQUMzRCxFQUFFLEVBQUUsbUVBQW1FO1FBQ3ZFLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsT0FBTyxFQUFFLHNCQUFzQjtLQUNsQztJQUNELGlDQUFpQyxFQUFFO1FBQy9CLE9BQU8sRUFBRSwwQ0FBMEM7UUFDbkQsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxPQUFPLEVBQUUsK0NBQStDO1FBQ3hELEVBQUUsRUFBRSxpREFBaUQ7UUFDckQsRUFBRSxFQUFFLHlDQUF5QztRQUM3QyxFQUFFLEVBQUUsd0JBQXdCO1FBQzVCLE9BQU8sRUFBRSw4Q0FBOEM7UUFDdkQsRUFBRSxFQUFFLHFDQUFxQztRQUN6QyxFQUFFLEVBQUUsd0RBQXdEO1FBQzVELE9BQU8sRUFBRSx5Q0FBeUM7UUFDbEQsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxFQUFFLEVBQUUsNkNBQTZDO1FBQ2pELE9BQU8sRUFBRSxzQ0FBc0M7UUFDL0MsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLE9BQU8sRUFBRSxxQ0FBcUM7UUFDOUMsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELE9BQU8sRUFBRSxpREFBaUQ7UUFDMUQsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxFQUFFLEVBQUUsOEJBQThCO1FBQ2xDLEVBQUUsRUFBRSxnREFBZ0Q7UUFDcEQsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFlBQVk7S0FDeEI7SUFDRCxTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsVUFBVTtRQUNkLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLFdBQVc7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsRUFBRSxFQUFFLFFBQVE7UUFDWixFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsV0FBVztRQUNwQixFQUFFLEVBQUUsYUFBYTtRQUNqQixFQUFFLEVBQUUsZUFBZTtRQUNuQixFQUFFLEVBQUUsSUFBSTtRQUNSLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLGdCQUFnQjtRQUNwQixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QscUJBQXFCLEVBQUU7UUFDbkIsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixFQUFFLEVBQUUsMEJBQTBCO1FBQzlCLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLEVBQUUsRUFBRSw4QkFBOEI7UUFDbEMsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLEVBQUUsRUFBRSw4QkFBOEI7UUFDbEMsT0FBTyxFQUFFLGdDQUFnQztRQUN6QyxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsT0FBTyxFQUFFLDBCQUEwQjtRQUNuQyxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsU0FBUztLQUNyQjtJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLGFBQWE7UUFDdEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLElBQUk7UUFDUixPQUFPLEVBQUUsWUFBWTtRQUNyQixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsYUFBYTtRQUN0QixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDTCxPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLFdBQVc7UUFDZixFQUFFLEVBQUUsS0FBSztRQUNULE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsU0FBUztRQUNiLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLGFBQWE7UUFDakIsRUFBRSxFQUFFLFdBQVc7UUFDZixFQUFFLEVBQUUsSUFBSTtRQUNSLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsV0FBVztRQUNwQixFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsT0FBTztRQUNoQixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEVBQUUsRUFBRSxJQUFJO1FBQ1IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxVQUFVO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsT0FBTztRQUNoQixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDTCxPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsRUFBRSxFQUFFLHdCQUF3QjtRQUM1QixFQUFFLEVBQUUsMkJBQTJCO1FBQy9CLEVBQUUsRUFBRSxJQUFJO1FBQ1IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLFVBQVU7UUFDZCxFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsYUFBYTtRQUN0QixFQUFFLEVBQUUsUUFBUTtRQUNaLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFDTixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsV0FBVztRQUNwQixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxVQUFVO1FBQ2QsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsV0FBVztRQUNwQixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsYUFBYTtRQUNqQixFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELGVBQWUsRUFBRTtRQUNiLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixFQUFFLEVBQUUsOEJBQThCO1FBQ2xDLEVBQUUsRUFBRSx3QkFBd0I7UUFDNUIsRUFBRSxFQUFFLE9BQU87UUFDWCxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEVBQUUsRUFBRSxxQkFBcUI7UUFDekIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFFLHFCQUFxQjtRQUN6QixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLFlBQVk7UUFDaEIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsSUFBSTtRQUNSLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsZUFBZTtRQUNuQixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsSUFBSTtLQUNoQjtJQUNELEdBQUcsRUFBRTtRQUNELE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxHQUFHO1FBQ1AsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLE1BQU07UUFDZixFQUFFLEVBQUUsT0FBTztRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxJQUFJO1FBQ1IsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsT0FBTztRQUNYLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxRQUFRO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsR0FBRztRQUNaLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLFFBQVE7UUFDWixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsTUFBTTtRQUNWLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLE9BQU87UUFDWCxPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLFlBQVk7UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE9BQU87S0FDbkI7SUFDRCxvQ0FBb0MsRUFBRTtRQUNsQyxPQUFPLEVBQUUscURBQXFEO1FBQzlELE9BQU8sRUFBRSxvQ0FBb0M7UUFDN0MsT0FBTyxFQUFFLHlDQUF5QztRQUNsRCxFQUFFLEVBQUUsOENBQThDO1FBQ2xELEVBQUUsRUFBRSwwQ0FBMEM7UUFDOUMsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsc0NBQXNDO1FBQy9DLEVBQUUsRUFBRSw4QkFBOEI7UUFDbEMsRUFBRSxFQUFFLHdDQUF3QztRQUM1QyxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsRUFBRSxFQUFFLDhDQUE4QztRQUNsRCxPQUFPLEVBQUUsc0NBQXNDO1FBQy9DLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLHdDQUF3QztRQUNqRCxPQUFPLEVBQUUsNENBQTRDO1FBQ3JELE9BQU8sRUFBRSwwQ0FBMEM7UUFDbkQsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxPQUFPLEVBQUUsbUNBQW1DO1FBQzVDLE9BQU8sRUFBRSxvQ0FBb0M7UUFDN0MsRUFBRSxFQUFFLDRCQUE0QjtRQUNoQyxFQUFFLEVBQUUsK0JBQStCO1FBQ25DLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxjQUFjO0tBQzFCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLFdBQVc7UUFDZixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxLQUFLO1FBQ1QsT0FBTyxFQUFFLFFBQVE7UUFDakIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsU0FBUztRQUNiLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsYUFBYTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsUUFBUTtRQUNaLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLGVBQWU7UUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELGtCQUFrQixFQUFFO1FBQ2hCLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLEVBQUUsRUFBRSwyQkFBMkI7UUFDL0IsRUFBRSxFQUFFLDJCQUEyQjtRQUMvQixFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixFQUFFLEVBQUUseUJBQXlCO1FBQzdCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxPQUFPLEVBQUUsMEJBQTBCO1FBQ25DLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixFQUFFLEVBQUUsMkJBQTJCO1FBQy9CLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxrQ0FBa0MsRUFBRTtRQUNoQyxPQUFPLEVBQUUsbURBQW1EO1FBQzVELE9BQU8sRUFBRSxrQ0FBa0M7UUFDM0MsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxFQUFFLEVBQUUsNkNBQTZDO1FBQ2pELEVBQUUsRUFBRSwwQ0FBMEM7UUFDOUMsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLEVBQUUsRUFBRSxpQ0FBaUM7UUFDckMsRUFBRSxFQUFFLDJDQUEyQztRQUMvQyxPQUFPLEVBQUUsc0NBQXNDO1FBQy9DLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsRUFBRSxFQUFFLHNDQUFzQztRQUMxQyxPQUFPLEVBQUUseUNBQXlDO1FBQ2xELE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLHdDQUF3QztRQUNqRCxPQUFPLEVBQUUsMkNBQTJDO1FBQ3BELE9BQU8sRUFBRSx3Q0FBd0M7UUFDakQsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxPQUFPLEVBQUUsdUNBQXVDO1FBQ2hELE9BQU8sRUFBRSx3Q0FBd0M7UUFDakQsRUFBRSxFQUFFLGlDQUFpQztRQUNyQyxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxZQUFZO0tBQ3hCO0lBQ0QsMkJBQTJCLEVBQUU7UUFDekIsT0FBTyxFQUFFLCtDQUErQztRQUN4RCxPQUFPLEVBQUUsMENBQTBDO1FBQ25ELE9BQU8sRUFBRSxzQ0FBc0M7UUFDL0MsRUFBRSxFQUFFLDBDQUEwQztRQUM5QyxFQUFFLEVBQUUsNENBQTRDO1FBQ2hELEVBQUUsRUFBRSx1QkFBdUI7UUFDM0IsT0FBTyxFQUFFLHVDQUF1QztRQUNoRCxFQUFFLEVBQUUsb0NBQW9DO1FBQ3hDLEVBQUUsRUFBRSx5Q0FBeUM7UUFDN0MsT0FBTyxFQUFFLHNDQUFzQztRQUMvQyxPQUFPLEVBQUUscUNBQXFDO1FBQzlDLEVBQUUsRUFBRSx1Q0FBdUM7UUFDM0MsT0FBTyxFQUFFLDhDQUE4QztRQUN2RCxPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxPQUFPLEVBQUUscUNBQXFDO1FBQzlDLE9BQU8sRUFBRSwwQ0FBMEM7UUFDbkQsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxPQUFPLEVBQUUseUNBQXlDO1FBQ2xELEVBQUUsRUFBRSw0QkFBNEI7UUFDaEMsRUFBRSxFQUFFLHdDQUF3QztRQUM1QyxPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsV0FBVztLQUN2QjtJQUNELFNBQVMsRUFBRTtRQUNQLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLFdBQVc7UUFDZixFQUFFLEVBQUUsS0FBSztRQUNULE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsZUFBZTtRQUNuQixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLGVBQWU7UUFDbkIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELHNCQUFzQixFQUFFO1FBQ3BCLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLEVBQUUsRUFBRSw2QkFBNkI7UUFDakMsRUFBRSxFQUFFLDhCQUE4QjtRQUNsQyxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixFQUFFLEVBQUUsMkJBQTJCO1FBQy9CLE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxFQUFFLEVBQUUsNkJBQTZCO1FBQ2pDLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxPQUFPLEVBQUUsOEJBQThCO1FBQ3ZDLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixFQUFFLEVBQUUsOEJBQThCO1FBQ2xDLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsRUFBRSxFQUFFLE1BQU07UUFDVixFQUFFLEVBQUUsUUFBUTtRQUNaLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixFQUFFLEVBQUUseUJBQXlCO1FBQzdCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLEVBQUUsRUFBRSx1QkFBdUI7UUFDM0IsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLEVBQUUsRUFBRSw0QkFBNEI7UUFDaEMsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsT0FBTyxFQUFFLDBCQUEwQjtRQUNuQyxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLEVBQUUsRUFBRSxxQkFBcUI7UUFDekIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsU0FBUztRQUNiLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsUUFBUTtRQUNqQixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNOLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLFVBQVU7UUFDZCxFQUFFLEVBQUUsSUFBSTtRQUNSLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLFlBQVk7UUFDaEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxPQUFPO1FBQ1gsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsUUFBUTtRQUNqQixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEVBQUUsRUFBRSxJQUFJO1FBQ1IsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLE1BQU07UUFDVixFQUFFLEVBQUUsT0FBTztRQUNYLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsbURBQW1ELEVBQUU7UUFDakQsT0FBTyxFQUFFLHFEQUFxRDtRQUM5RCxPQUFPLEVBQUUsbURBQW1EO1FBQzVELE9BQU8sRUFBRSxzREFBc0Q7UUFDL0QsRUFBRSxFQUFFLHNEQUFzRDtRQUMxRCxFQUFFLEVBQUUsdUVBQXVFO1FBQzNFLEVBQUUsRUFBRSxrQ0FBa0M7UUFDdEMsT0FBTyxFQUFFLDJEQUEyRDtRQUNwRSxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLEVBQUUsRUFBRSxrREFBa0Q7UUFDdEQsT0FBTyxFQUFFLDJDQUEyQztRQUNwRCxPQUFPLEVBQUUscURBQXFEO1FBQzlELEVBQUUsRUFBRSxvRUFBb0U7UUFDeEUsT0FBTyxFQUFFLHNEQUFzRDtRQUMvRCxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLE9BQU8sRUFBRSwrREFBK0Q7UUFDeEUsT0FBTyxFQUFFLHFEQUFxRDtRQUM5RCxPQUFPLEVBQUUsaURBQWlEO1FBQzFELE9BQU8sRUFBRSx5REFBeUQ7UUFDbEUsT0FBTyxFQUFFLGtEQUFrRDtRQUMzRCxPQUFPLEVBQUUsOENBQThDO1FBQ3ZELEVBQUUsRUFBRSxpREFBaUQ7UUFDckQsRUFBRSxFQUFFLG1FQUFtRTtRQUN2RSxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEM7SUFDRCxVQUFVLEVBQUU7UUFDUixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsWUFBWTtRQUNoQixFQUFFLEVBQUUsY0FBYztRQUNsQixFQUFFLEVBQUUsS0FBSztRQUNULE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLGNBQWM7UUFDbEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsT0FBTyxFQUFFLFlBQVk7UUFDckIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsRUFBRSxFQUFFLGVBQWU7UUFDbkIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLGNBQWM7UUFDdkIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsd0JBQXdCO1FBQzVCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsT0FBTyxFQUFFLGNBQWM7UUFDdkIsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixFQUFFLEVBQUUsNkJBQTZCO1FBQ2pDLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsUUFBUTtRQUNqQixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLEdBQUc7UUFDUCxPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEVBQUUsRUFBRSxLQUFLO1FBQ1QsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLE9BQU87UUFDWCxPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsVUFBVTtRQUNkLEVBQUUsRUFBRSxPQUFPO1FBQ1gsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxHQUFHO1FBQ1AsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxRQUFRO1FBQ1osT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLFNBQVM7UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsR0FBRztRQUNaLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsR0FBRztRQUNaLE9BQU8sRUFBRSxHQUFHO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDSCxPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsVUFBVTtRQUNuQixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLE1BQU07UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsWUFBWTtRQUNoQixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLFFBQVE7UUFDakIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxHQUFHLEVBQUU7UUFDRCxPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsZUFBZTtRQUNuQixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxRQUFRO1FBQ1osT0FBTyxFQUFFLGNBQWM7UUFDdkIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsY0FBYztRQUNsQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsYUFBYTtRQUN0QixFQUFFLEVBQUUsY0FBYztRQUNsQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLEVBQUUsRUFBRSxjQUFjO1FBQ2xCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFDRCxNQUFNLEVBQUU7UUFDSixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsYUFBYTtRQUNqQixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLFlBQVk7UUFDckIsRUFBRSxFQUFFLGVBQWU7UUFDbkIsRUFBRSxFQUFFLGFBQWE7UUFDakIsT0FBTyxFQUFFLDBCQUEwQjtRQUNuQyxPQUFPLEVBQUUsWUFBWTtRQUNyQixFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLFlBQVk7UUFDckIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsUUFBUTtRQUNqQixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLEdBQUc7UUFDUCxPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsSUFBSTtRQUNiLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLE9BQU87UUFDWCxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsRUFBRSxFQUFFLFdBQVc7UUFDZixFQUFFLEVBQUUsR0FBRztRQUNQLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLFdBQVc7UUFDZixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixFQUFFLEVBQUUsU0FBUztRQUNiLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxHQUFHO1FBQ1osT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxHQUFHO1FBQ1osT0FBTyxFQUFFLEdBQUc7S0FDZjtJQUNELG1CQUFtQixFQUFFO1FBQ2pCLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUsMEJBQTBCO1FBQ25DLEVBQUUsRUFBRSwyQkFBMkI7UUFDL0IsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixFQUFFLEVBQUUsU0FBUztRQUNiLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsRUFBRSxFQUFFLGVBQWU7UUFDbkIsRUFBRSxFQUFFLDJCQUEyQjtRQUMvQixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEVBQUUsRUFBRSxjQUFjO1FBQ2xCLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsR0FBRztRQUNQLE9BQU8sRUFBRSxNQUFNO1FBQ2YsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsT0FBTztRQUNYLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07UUFDZixFQUFFLEVBQUUsV0FBVztRQUNmLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLE1BQU07UUFDZixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxTQUFTO1FBQ2IsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLEVBQUUsRUFBRSxxQkFBcUI7UUFDekIsRUFBRSxFQUFFLE1BQU07UUFDVixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsY0FBYztRQUN2QixFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsY0FBYztRQUN2QixFQUFFLEVBQUUsVUFBVTtRQUNkLEVBQUUsRUFBRSxlQUFlO1FBQ25CLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO0tBQ25CO0lBQ0QsTUFBTSxFQUFFO1FBQ0osT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxHQUFHO1FBQ1AsT0FBTyxFQUFFLFNBQVM7UUFDbEIsRUFBRSxFQUFFLFFBQVE7UUFDWixFQUFFLEVBQUUsUUFBUTtRQUNaLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsRUFBRSxFQUFFLFVBQVU7UUFDZCxPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsR0FBRztRQUNaLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLE9BQU87UUFDWCxPQUFPLEVBQUUsR0FBRztRQUNaLE9BQU8sRUFBRSxHQUFHO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDTCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsRUFBRSxFQUFFLEdBQUc7UUFDUCxPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLHFCQUFxQjtRQUN6QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsY0FBYztRQUN2QixFQUFFLEVBQUUsZUFBZTtRQUNuQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7S0FDcEI7SUFDRCxlQUFlLEVBQUU7UUFDYixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsRUFBRSxFQUFFLE1BQU07UUFDVixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxHQUFHO1FBQ1AsT0FBTyxFQUFFLE1BQU07UUFDZixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxNQUFNO1FBQ1YsT0FBTyxFQUFFLE1BQU07UUFDZixFQUFFLEVBQUUsTUFBTTtRQUNWLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsTUFBTTtRQUNmLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QseUJBQXlCLEVBQUU7UUFDdkIsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsRUFBRSxFQUFFLGlDQUFpQztRQUNyQyxFQUFFLEVBQUUsZ0NBQWdDO1FBQ3BDLEVBQUUsRUFBRSxjQUFjO1FBQ2xCLE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsRUFBRSxFQUFFLDBCQUEwQjtRQUM5QixFQUFFLEVBQUUsOEJBQThCO1FBQ2xDLE9BQU8sRUFBRSxvQ0FBb0M7UUFDN0MsRUFBRSxFQUFFLHVDQUF1QztRQUMzQyxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0M7UUFDekMsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxPQUFPLEVBQUUsc0NBQXNDO1FBQy9DLEVBQUUsRUFBRSxrQ0FBa0M7UUFDdEMsRUFBRSxFQUFFLHlDQUF5QztRQUM3QyxPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsWUFBWTtLQUN4QjtJQUNELHNHQUFzRyxFQUFFO1FBQ3BHLE9BQU8sRUFBRSx3SkFBd0o7UUFDakssT0FBTyxFQUFFLHNHQUFzRztRQUMvRyxPQUFPLEVBQUUsOEdBQThHO1FBQ3ZILEVBQUUsRUFBRSw4SEFBOEg7UUFDbEksRUFBRSxFQUFFLDBJQUEwSTtRQUM5SSxFQUFFLEVBQUUsbURBQW1EO1FBQ3ZELE9BQU8sRUFBRSx3SUFBd0k7UUFDakosRUFBRSxFQUFFLGtFQUFrRTtRQUN0RSxFQUFFLEVBQUUseUhBQXlIO1FBQzdILE9BQU8sRUFBRSx1R0FBdUc7UUFDaEgsT0FBTyxFQUFFLHdHQUF3RztRQUNqSCxFQUFFLEVBQUUsc0dBQXNHO1FBQzFHLE9BQU8sRUFBRSw0RkFBNEY7UUFDckcsT0FBTyxFQUFFLHNEQUFzRDtRQUMvRCxPQUFPLEVBQUUsMEhBQTBIO1FBQ25JLE9BQU8sRUFBRSxpSEFBaUg7UUFDMUgsT0FBTyxFQUFFLHlHQUF5RztRQUNsSCxPQUFPLEVBQUUsZ0hBQWdIO1FBQ3pILE9BQU8sRUFBRSxpR0FBaUc7UUFDMUcsT0FBTyxFQUFFLCtGQUErRjtRQUN4RyxFQUFFLEVBQUUsNEVBQTRFO1FBQ2hGLEVBQUUsRUFBRSxpSEFBaUg7UUFDckgsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxPQUFPLEVBQUUsNkJBQTZCO0tBQ3pDO0lBQ0QsOElBQThJLEVBQUU7UUFDNUksT0FBTyxFQUFFLHdKQUF3SjtRQUNqSyxPQUFPLEVBQUUsOElBQThJO1FBQ3ZKLE9BQU8sRUFBRSx5SUFBeUk7UUFDbEosRUFBRSxFQUFFLCtMQUErTDtRQUNuTSxFQUFFLEVBQUUsa0tBQWtLO1FBQ3RLLEVBQUUsRUFBRSxrRUFBa0U7UUFDdEUsT0FBTyxFQUFFLG1KQUFtSjtRQUM1SixFQUFFLEVBQUUsaUdBQWlHO1FBQ3JHLEVBQUUsRUFBRSwrSUFBK0k7UUFDbkosT0FBTyxFQUFFLHlJQUF5STtRQUNsSixPQUFPLEVBQUUsOElBQThJO1FBQ3ZKLEVBQUUsRUFBRSxpS0FBaUs7UUFDckssT0FBTyxFQUFFLDhJQUE4STtRQUN2SixPQUFPLEVBQUUsa0VBQWtFO1FBQzNFLE9BQU8sRUFBRSx1S0FBdUs7UUFDaEwsT0FBTyxFQUFFLDRKQUE0SjtRQUNySyxPQUFPLEVBQUUsK0lBQStJO1FBQ3hKLE9BQU8sRUFBRSx3SUFBd0k7UUFDakosT0FBTyxFQUFFLG1JQUFtSTtRQUM1SSxPQUFPLEVBQUUsNkpBQTZKO1FBQ3RLLEVBQUUsRUFBRSwySEFBMkg7UUFDL0gsRUFBRSxFQUFFLDBJQUEwSTtRQUM5SSxPQUFPLEVBQUUsMENBQTBDO1FBQ25ELE9BQU8sRUFBRSwwQ0FBMEM7S0FDdEQ7SUFDRCxlQUFlLEVBQUU7UUFDYixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixFQUFFLEVBQUUsS0FBSztRQUNULE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSx5QkFBeUI7UUFDN0IsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLGVBQWU7UUFDbkIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELGVBQWUsRUFBRTtRQUNiLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixFQUFFLEVBQUUsd0JBQXdCO1FBQzVCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLEVBQUUsRUFBRSxPQUFPO1FBQ1gsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixFQUFFLEVBQUUsZUFBZTtRQUNuQixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsRUFBRSxFQUFFLGdCQUFnQjtRQUNwQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO0tBQ25CO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsRUFBRSxFQUFFLE1BQU07UUFDVixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsRUFBRSxFQUFFLHlCQUF5QjtRQUM3QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLE9BQU87S0FDbkI7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLEVBQUUsRUFBRSxpQkFBaUI7UUFDckIsRUFBRSxFQUFFLE1BQU07UUFDVixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixFQUFFLEVBQUUsZUFBZTtRQUNuQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsZUFBZTtRQUN4QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELG9CQUFvQixFQUFFO1FBQ2xCLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLEVBQUUsRUFBRSx1QkFBdUI7UUFDM0IsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixFQUFFLEVBQUUsTUFBTTtRQUNWLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSxlQUFlO1FBQ25CLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLEVBQUUsRUFBRSwyQkFBMkI7UUFDL0IsT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsRUFBRSxFQUFFLGdCQUFnQjtRQUNwQixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO0tBQ25CO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDaEIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEVBQUUsRUFBRSxxQkFBcUI7UUFDekIsRUFBRSxFQUFFLHFCQUFxQjtRQUN6QixFQUFFLEVBQUUsTUFBTTtRQUNWLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsRUFBRSxFQUFFLGlCQUFpQjtRQUNyQixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixFQUFFLEVBQUUsMEJBQTBCO1FBQzlCLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELGtGQUFrRixFQUFFO1FBQ2hGLE9BQU8sRUFBRSw2R0FBNkc7UUFDdEgsT0FBTyxFQUFFLGtGQUFrRjtRQUMzRixPQUFPLEVBQUUsNkVBQTZFO1FBQ3RGLEVBQUUsRUFBRSwyRkFBMkY7UUFDL0YsRUFBRSxFQUFFLHlFQUF5RTtRQUM3RSxFQUFFLEVBQUUsa0RBQWtEO1FBQ3RELE9BQU8sRUFBRSxpRkFBaUY7UUFDMUYsRUFBRSxFQUFFLCtFQUErRTtRQUNuRixFQUFFLEVBQUUscUVBQXFFO1FBQ3pFLE9BQU8sRUFBRSxrRUFBa0U7UUFDM0UsT0FBTyxFQUFFLHdGQUF3RjtRQUNqRyxFQUFFLEVBQUUsa0dBQWtHO1FBQ3RHLE9BQU8sRUFBRSwrRkFBK0Y7UUFDeEcsT0FBTyxFQUFFLDZDQUE2QztRQUN0RCxPQUFPLEVBQUUsNEZBQTRGO1FBQ3JHLE9BQU8sRUFBRSxtR0FBbUc7UUFDNUcsT0FBTyxFQUFFLDBFQUEwRTtRQUNuRixPQUFPLEVBQUUsNEZBQTRGO1FBQ3JHLE9BQU8sRUFBRSxpRUFBaUU7UUFDMUUsT0FBTyxFQUFFLG9GQUFvRjtRQUM3RixFQUFFLEVBQUUsOERBQThEO1FBQ2xFLEVBQUUsRUFBRSxxRkFBcUY7UUFDekYsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxPQUFPLEVBQUUsNkJBQTZCO0tBQ3pDO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsT0FBTyxFQUFFLE9BQU87UUFDaEIsRUFBRSxFQUFFLGNBQWM7UUFDbEIsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixFQUFFLEVBQUUsT0FBTztRQUNYLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLGFBQWE7UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLFFBQVE7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsMERBQTBELEVBQUU7UUFDeEQsT0FBTyxFQUFFLCtEQUErRDtRQUN4RSxPQUFPLEVBQUUsMERBQTBEO1FBQ25FLE9BQU8sRUFBRSwyREFBMkQ7UUFDcEUsRUFBRSxFQUFFLDZEQUE2RDtRQUNqRSxFQUFFLEVBQUUsNERBQTREO1FBQ2hFLEVBQUUsRUFBRSw0QkFBNEI7UUFDaEMsT0FBTyxFQUFFLHlEQUF5RDtRQUNsRSxFQUFFLEVBQUUsdURBQXVEO1FBQzNELEVBQUUsRUFBRSxnRUFBZ0U7UUFDcEUsT0FBTyxFQUFFLHdDQUF3QztRQUNqRCxPQUFPLEVBQUUsMERBQTBEO1FBQ25FLEVBQUUsRUFBRSxnRkFBZ0Y7UUFDcEYsT0FBTyxFQUFFLHdEQUF3RDtRQUNqRSxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxtRUFBbUU7UUFDNUUsT0FBTyxFQUFFLDZEQUE2RDtRQUN0RSxPQUFPLEVBQUUsb0RBQW9EO1FBQzdELE9BQU8sRUFBRSw4REFBOEQ7UUFDdkUsT0FBTyxFQUFFLGlEQUFpRDtRQUMxRCxPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELEVBQUUsRUFBRSxrREFBa0Q7UUFDdEQsRUFBRSxFQUFFLHNEQUFzRDtRQUMxRCxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxxQkFBcUI7S0FDakM7SUFDRCxPQUFPLEVBQUU7UUFDTCxPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsYUFBYTtRQUN0QixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEVBQUUsRUFBRSxJQUFJO1FBQ1IsT0FBTyxFQUFFLFlBQVk7UUFDckIsRUFBRSxFQUFFLE9BQU87UUFDWCxFQUFFLEVBQUUsWUFBWTtRQUNoQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsUUFBUTtRQUNqQixFQUFFLEVBQUUsVUFBVTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsRUFBRSxFQUFFLFdBQVc7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsMENBQTBDLEVBQUU7UUFDeEMsT0FBTyxFQUFFLCtDQUErQztRQUN4RCxPQUFPLEVBQUUsMENBQTBDO1FBQ25ELE9BQU8sRUFBRSxxREFBcUQ7UUFDOUQsRUFBRSxFQUFFLHNEQUFzRDtRQUMxRCxFQUFFLEVBQUUsc0RBQXNEO1FBQzFELEVBQUUsRUFBRSwrQkFBK0I7UUFDbkMsT0FBTyxFQUFFLGdEQUFnRDtRQUN6RCxFQUFFLEVBQUUsNkNBQTZDO1FBQ2pELEVBQUUsRUFBRSxvREFBb0Q7UUFDeEQsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxPQUFPLEVBQUUsMkNBQTJDO1FBQ3BELEVBQUUsRUFBRSxnRUFBZ0U7UUFDcEUsT0FBTyxFQUFFLDZDQUE2QztRQUN0RCxPQUFPLEVBQUUsaUNBQWlDO1FBQzFDLE9BQU8sRUFBRSxnREFBZ0Q7UUFDekQsT0FBTyxFQUFFLDhDQUE4QztRQUN2RCxPQUFPLEVBQUUscURBQXFEO1FBQzlELE9BQU8sRUFBRSwyQ0FBMkM7UUFDcEQsT0FBTyxFQUFFLDBDQUEwQztRQUNuRCxPQUFPLEVBQUUsdUNBQXVDO1FBQ2hELEVBQUUsRUFBRSx5Q0FBeUM7UUFDN0MsRUFBRSxFQUFFLG1EQUFtRDtRQUN2RCxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEM7SUFDRCxpRUFBaUUsRUFBRTtRQUMvRCxPQUFPLEVBQUUseUZBQXlGO1FBQ2xHLE9BQU8sRUFBRSxpRUFBaUU7UUFDMUUsT0FBTyxFQUFFLDREQUE0RDtRQUNyRSxFQUFFLEVBQUUsa0ZBQWtGO1FBQ3RGLEVBQUUsRUFBRSxxRUFBcUU7UUFDekUsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixPQUFPLEVBQUUsNkRBQTZEO1FBQ3RFLEVBQUUsRUFBRSxzREFBc0Q7UUFDMUQsRUFBRSxFQUFFLGlEQUFpRDtRQUNyRCxPQUFPLEVBQUUsaUVBQWlFO1FBQzFFLE9BQU8sRUFBRSxrRUFBa0U7UUFDM0UsRUFBRSxFQUFFLDRFQUE0RTtRQUNoRixPQUFPLEVBQUUsa0dBQWtHO1FBQzNHLE9BQU8sRUFBRSxnQ0FBZ0M7UUFDekMsT0FBTyxFQUFFLCtFQUErRTtRQUN4RixPQUFPLEVBQUUsMkVBQTJFO1FBQ3BGLE9BQU8sRUFBRSw0REFBNEQ7UUFDckUsT0FBTyxFQUFFLG1GQUFtRjtRQUM1RixPQUFPLEVBQUUseUVBQXlFO1FBQ2xGLE9BQU8sRUFBRSw2REFBNkQ7UUFDdEUsRUFBRSxFQUFFLHlEQUF5RDtRQUM3RCxFQUFFLEVBQUUsc0VBQXNFO1FBQzFFLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLGtCQUFrQjtLQUM5QjtDQUNKLENBQUM7QUFDRixJQUFNLE9BQU8sR0FBRztJQUNaLE9BQU8sRUFBRSxVQUFDLElBQUksZ0JBQUcsT0FBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQywwQ0FBRSxPQUFPLG1DQUFJLEtBQUssQ0FBQSxFQUFBO0lBRTNGLE9BQU8sRUFBRSxVQUFDLElBQUksZ0JBQUcsT0FBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQywwQ0FBRSxPQUFPLG1DQUFJLENBQUMsQ0FBQSxFQUFBO0lBRXZGLFFBQVEsRUFBRSxVQUFDLElBQUksRUFBRSxHQUFHLG9CQUFHLE9BQUEsTUFBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQywwQ0FBRSxTQUFTLDBDQUFHLEdBQUcsQ0FBQyxtQ0FBSSxJQUFJLENBQUEsRUFBQTtDQUM1RyxDQUFDO0FBQ0YsSUFBSSxXQUFXLENBQUM7QUFDaEIsQ0FBQyxVQUFTLFlBQVk7SUFDbEIsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsa0JBQWtCLENBQUM7SUFDdEQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztJQUM5QyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsRCxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsbUJBQW1CLENBQUM7SUFDbEQsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsbUJBQW1CLENBQUM7SUFDeEQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLHVCQUF1QixDQUFDO0lBQ2pELFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLHdCQUF3QixDQUFDO0lBQ2xFLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0lBQ3RELFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLHlCQUF5QixDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLElBQU0sc0JBQXNCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNwRyxJQUFNLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2xGLElBQU0sa0NBQWtDLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMvRyxJQUFNLDRCQUE0QixHQUFHLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDL0csSUFBTSxnQkFBZ0IsR0FBRztJQUNyQixJQUFJLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBakMsQ0FBaUM7SUFFM0MsS0FBSyxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUF2QyxDQUF1QztJQUVsRCxTQUFTLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQTVDLENBQTRDO0lBRTNELFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBM0MsQ0FBMkM7SUFFekQsS0FBSyxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUF2QyxDQUF1QztJQUVsRCxRQUFRLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQTFDLENBQTBDO0lBRXhELFFBQVEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBMUMsQ0FBMEM7SUFFeEQsSUFBSSxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUF0QyxDQUFzQztJQUVoRCxLQUFLLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQXZDLENBQXVDO0lBRWxELE9BQU8sRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBekMsQ0FBeUM7SUFFdEQsTUFBTSxFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUF4QyxDQUF3QztJQUVwRCxJQUFJLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQXRDLENBQXNDO0lBRWhELHNCQUFzQixFQUFFLHNCQUFJLE9BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxtQ0FBSSxRQUFRLENBQUEsRUFBQTtJQUV4RixRQUFRLEVBQUUsc0JBQUksT0FBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsbUNBQUksRUFBRSxDQUFBLEVBQUE7SUFFeEUsYUFBYSxFQUFFLGNBQUksT0FBQSxDQUFDO1FBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTO1FBQ3RHLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSztRQUM5QyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7S0FDakQsQ0FBQyxFQUphLENBSWI7SUFFTixZQUFZLEVBQUUsY0FBSSxPQUFBLENBQUM7UUFDWCxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ25DLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7UUFDL0IsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRTtRQUM3QixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0tBQ3RDLENBQUMsRUFMWSxDQUtaO0lBRU4sZUFBZSxFQUFFLGNBQUksT0FBQSxDQUFDO1FBQ2QsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO1FBQ2pELGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtRQUMvQyxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM1QyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7UUFDL0Msa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1FBQy9DLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7UUFDdEMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLEtBQUssRUFBRTtRQUN4QyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7S0FDL0MsQ0FBQyxFQVZlLENBVWY7SUFFTixjQUFjLEVBQUUsY0FBSSxPQUFBLENBQUM7UUFDYixrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7UUFDaEQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1FBQzlDLGVBQWUsRUFBRSxFQUFFO1FBQ25CLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7UUFDdkMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEtBQUssRUFBRTtRQUN2QyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzNDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtRQUM5QyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7UUFDOUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRTtRQUNyQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1FBQ3ZDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtLQUM5QyxDQUFDLEVBWmMsQ0FZZDtDQUNULENBQUM7QUFDRixTQUFTLDZCQUE2QixDQUFDLGdCQUFnQjtJQUNuRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGtCQUFrQixDQUFDLGlCQUFpQjtRQUMxQyxPQUFPLEVBQUUsZ0JBQWdCO0tBQzVCLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxzQ0FBc0MsQ0FBQyxLQUFLO0lBQ2pELE9BQU87UUFDSCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCO1FBQ2hELE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsSUFBTSxnQkFBZ0IsR0FBRztJQUNyQixRQUFRLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQTFDLENBQTBDO0lBRXhELGFBQWEsRUFBRSxjQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUF0RCxDQUFzRDtDQUM1RSxDQUFDO0FBQ0YsSUFBTSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakYsSUFBTSwrQkFBK0IsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3pHLElBQU0sY0FBYyxHQUFHLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDdkYsSUFBTSxhQUFhLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUN2RixJQUFNLGFBQWEsR0FBRztJQUNsQixTQUFTLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUF4QyxDQUF3QztJQUV2RCxRQUFRLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUF4QyxDQUF3QztJQUV0RCxZQUFZLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUEzQyxDQUEyQztJQUU3RCx1QkFBdUIsRUFBRTs7UUFDckIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxJQUFNLDZCQUE2QixHQUFHLEVBQUUsQ0FBQztRQUN6QyxLQUFzQixVQUFrQixFQUFsQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUM7WUFBcEMsSUFBTSxPQUFPLFNBQUE7WUFDZCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxTQUFTO2FBQ1o7WUFDRCxLQUF5QixVQUFzQyxFQUF0QyxLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsRUFBdEMsY0FBc0MsRUFBdEMsSUFBc0MsRUFBQztnQkFBM0QsSUFBTSxVQUFVLFNBQUE7Z0JBQ2pCLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ2hCLFNBQVM7aUJBQ1o7Z0JBQ0QsSUFBTSxXQUFXLEdBQUcsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFHLE9BQU8sY0FBSSxVQUFVLENBQUUsQ0FBQztnQkFDOUUsNkJBQTZCLENBQUMsV0FBVyxDQUFDLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUM5RTtTQUNKO1FBQ0QsT0FBTyw2QkFBNkIsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsd0JBQXdCLEVBQUUsY0FBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQXZELENBQXVEO0lBRXJGLGlCQUFpQixFQUFFLGNBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUEvQyxDQUErQztDQUN6RSxDQUFDO0FBQ0YsU0FBUyxvQkFBb0IsQ0FBQyxJQUFJO0lBQ3hCLElBQUEsS0FBeUIscUJBQXFCLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFyRSxNQUFNLFlBQUEsRUFBRyxRQUFRLGNBQW9ELENBQUM7SUFDOUUsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNaO0lBQ0QsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDbEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksYUFBYSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNWLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDaEIsYUFBYSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUNELGlCQUFpQixHQUFHLFVBQUcsU0FBUyxTQUFHLE1BQU0sU0FBRyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBRyxhQUFhLENBQUUsQ0FBQztLQUN0RztTQUFNO1FBQ0gsaUJBQWlCLEdBQUcsVUFBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBRyxRQUFRLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBRyxNQUFNLENBQUUsQ0FBQztLQUNwRztJQUNELE9BQU8saUJBQWlCLENBQUM7QUFDN0IsQ0FBQztBQUNELFNBQVMsZ0JBQWdCLENBQUMsSUFBSTs7SUFDcEIsSUFBQSxLQUFzSSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQWxMLElBQUksVUFBQSxFQUF3QixrQkFBa0IseUJBQUEsRUFBc0IsZ0JBQWdCLHVCQUFBLEVBQUcsUUFBUSxjQUFBLEVBQXVCLFFBQVEsd0JBQW9ELENBQUM7SUFDM0wsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNaO0lBQ0QsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzFCO0lBQ0QsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLFFBQU8sUUFBUSxFQUFDO1FBQ1osS0FBSyxJQUFJO1lBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixNQUFNO1FBQ1Y7WUFDSSxNQUFNO0tBQ2I7SUFDRCxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLElBQUk7UUFDQSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQU0sU0FBUyxHQUFHLE1BQUEsTUFBQSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQywwQ0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ3ZFLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxjQUFjLElBQUksWUFBWSxDQUFDO1FBQy9CLElBQUksV0FBVyxLQUFLLEVBQUUsRUFBRTtZQUNwQixjQUFjLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxjQUFjLENBQUM7S0FDekI7SUFBQyxXQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0wsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLFFBQVE7SUFDeEIsS0FBdUIsVUFBZ0IsRUFBaEIsS0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCLEVBQUM7UUFBbkMsSUFBTSxRQUFRLFNBQUE7UUFDZixRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUN2QjtBQUNMLENBQUM7QUFDRCxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRSxhQUFrQjtJQUFsQiw4QkFBQSxFQUFBLGtCQUFrQjtJQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFZO1lBQVgsR0FBRyxRQUFBLEVBQUUsS0FBSyxRQUFBO1FBQUksT0FBQSwwQkFBa0IsR0FBRyxpQkFBTSxLQUFLLGVBQVk7SUFBNUMsQ0FBNEMsQ0FDakcsQ0FBQztJQUNGLElBQUksYUFBYSxFQUFFO1FBQ2YsT0FBTyxzREFBNkMsYUFBYSxzQkFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7S0FDaEc7SUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLO0lBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDVixPQUFPO0tBQ1Y7SUFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUMxQixDQUFDO0FBQ0QsU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUc7O0lBQzVCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDNUIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLFdBQVc7O0lBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNqQyxPQUFPLHdCQUF3QixHQUFHLFdBQVcsQ0FBQztLQUNqRDtJQUNELE9BQU8sTUFBQSxNQUFBLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFHLFdBQVcsQ0FBQywwQ0FBRSxJQUFJLG1DQUFJLHdCQUF3QixHQUFHLFdBQVcsQ0FBQztBQUM1RixDQUFDO0FBQ0QsU0FBUyxxQkFBcUIsQ0FBQyxXQUFXO0lBQ3RDLFFBQU8sV0FBVyxFQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssSUFBSTtZQUNMLE9BQU8sYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsS0FBSyxJQUFJO1lBQ0wsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkM7WUFDSSxPQUFPLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ2pEO0FBQ0wsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLFdBQVc7SUFDNUIsSUFBTSxXQUFXLEdBQUc7UUFDaEIsSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSTtRQUNKLElBQUk7S0FDUCxDQUFDO0lBQ0YsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsSUFBTSxpQkFBaUIsR0FBRztJQUN0QixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsYUFBYTtLQUN0QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxnQkFBZ0I7S0FDekI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxxQkFBcUI7S0FDOUI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxpQ0FBaUM7S0FDMUM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsa0NBQWtDO0tBQzNDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLHdCQUF3QjtLQUNqQztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxVQUFVO0tBQ25CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGVBQWU7S0FDeEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxnQ0FBZ0M7S0FDekM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsbUJBQW1CO0tBQzVCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsY0FBYztLQUN2QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsZ0JBQWdCO0tBQ3pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLDBCQUEwQjtLQUNuQztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSx5QkFBeUI7S0FDbEM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsdUNBQXVDO0tBQ2hEO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGNBQWM7S0FDdkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxnQkFBZ0I7S0FDekI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGdCQUFnQjtLQUN6QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxvQkFBb0I7S0FDN0I7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsbUJBQW1CO0tBQzVCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxVQUFVO0tBQ25CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLDZCQUE2QjtLQUN0QztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsZUFBZTtLQUN4QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxrQkFBa0I7S0FDM0I7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsNkJBQTZCO0tBQ3RDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxXQUFXO0tBQ3BCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFdBQVc7S0FDcEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGVBQWU7S0FDeEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLG1DQUFtQztLQUM1QztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSwrQkFBK0I7S0FDeEM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxXQUFXO0tBQ3BCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFdBQVc7S0FDcEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsMkJBQTJCO0tBQ3BDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsd0NBQXdDO0tBQ2pEO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLG1CQUFtQjtLQUM1QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsbUNBQW1DO0tBQzVDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFdBQVc7S0FDcEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLDRDQUE0QztLQUNyRDtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxVQUFVO0tBQ25CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsaUNBQWlDO0tBQzFDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLHNCQUFzQjtLQUMvQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsZUFBZTtLQUN4QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFdBQVc7S0FDcEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxnQkFBZ0I7S0FDekI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsMEJBQTBCO0tBQ25DO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSx1QkFBdUI7S0FDaEM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxrQkFBa0I7S0FDM0I7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsYUFBYTtLQUN0QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxVQUFVO0tBQ25CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLG9CQUFvQjtLQUM3QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSw4Q0FBOEM7S0FDdkQ7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsdUJBQXVCO0tBQ2hDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsNEJBQTRCO0tBQ3JDO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLDJCQUEyQjtLQUNwQztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxrQ0FBa0M7S0FDM0M7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLHVCQUF1QjtLQUNoQztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxjQUFjO0tBQ3ZCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGNBQWM7S0FDdkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSwyQkFBMkI7S0FDcEM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxVQUFVO0tBQ25CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGlCQUFpQjtLQUMxQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGNBQWM7S0FDdkI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsOENBQThDO0tBQ3ZEO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxXQUFXO0tBQ3BCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSx3QkFBd0I7S0FDakM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsV0FBVztLQUNwQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGFBQWE7S0FDdEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsc0JBQXNCO0tBQy9CO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSw2QkFBNkI7S0FDdEM7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLE9BQU87S0FDaEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUscUJBQXFCO0tBQzlCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxjQUFjO0tBQ3ZCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLDBCQUEwQjtLQUNuQztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsU0FBUztLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxzQkFBc0I7S0FDL0I7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsZ0JBQWdCO0tBQ3pCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGVBQWU7S0FDeEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsc0NBQXNDO0tBQy9DO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFNBQVM7S0FDbEI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLG1DQUFtQztLQUM1QztJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGdCQUFnQjtLQUN6QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxxQkFBcUI7S0FDOUI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsbUJBQW1CO0tBQzVCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLGdCQUFnQjtLQUN6QjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsVUFBVTtLQUNuQjtDQUNKLENBQUM7QUFDRixJQUFNLE1BQU0sR0FBRztJQUNYLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsaUJBQWlCLEVBQUUsRUFBRTtDQUN4QixDQUFDO0FBQ0YsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQVc7O0lBQVgsdUJBQUEsRUFBQSxXQUFXO0lBQ3ZDLElBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTywwQ0FBRSxZQUFZLEVBQUU7UUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEIsS0FBSyxFQUFFLGVBQWU7WUFDdEIsTUFBTSxRQUFBO1lBQ04sT0FBTyxTQUFBO1NBQ1YsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNYO1NBQU07UUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxQztLQUNKO0FBQ0wsQ0FBQztBQUNELFNBQWUsV0FBVzs7Ozs7OztvQkFDaEIsWUFBWSxHQUFHLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQywwQ0FBRSxhQUFhLENBQUM7b0JBQ2hGLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2YsV0FBTyxJQUFJLEVBQUM7cUJBQ2Y7b0JBQ00sV0FBTSxlQUFlLENBQUMsWUFBWSxFQUFFLCtCQUErQixDQUFDLEVBQUE7d0JBQTNFLFdBQU8sU0FBb0UsRUFBQzs7OztDQUMvRTtBQUNELFNBQWUsV0FBVyxDQUFDLFFBQVE7Ozs7Ozs7b0JBQ3pCLFlBQVksR0FBRyxNQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsMENBQUUsYUFBYSxDQUFDO29CQUNoRixJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUNmLFdBQU8sS0FBSyxFQUFDO3FCQUNoQjtvQkFDTSxXQUFNLGVBQWUsQ0FBQyxZQUFZLEVBQUUsK0JBQStCLEVBQUUsUUFBUSxDQUFDLEVBQUE7d0JBQXJGLFdBQU8sU0FBOEUsRUFBQzs7OztDQUN6RjtBQUNELFNBQVMsYUFBYSxDQUFDLElBQUk7O0lBQ3ZCLElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxNQUFLLENBQUMsRUFBRTtRQUNwQixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUcsT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFULENBQVMsQ0FDaEMsbUNBQUksSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLElBQUk7O0lBQ3JCLE9BQU8sTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUNELFNBQVMsZ0JBQWdCLENBQUMsUUFBUTs7SUFDOUIsT0FBTyxPQUFPLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsbUNBQUksQ0FBQyxDQUFDO0FBQ2pILENBQUM7QUFDRCxTQUFTLCtCQUErQixDQUFDLElBQUksRUFBRSxtQkFBbUI7SUFDOUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyw0QkFBNEIsRUFBRTtZQUNoQyxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDL0gsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLElBQUksS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDOUgsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBZSw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsZUFBZTs7Ozs7O3dCQUM3QyxXQUFNLFdBQVcsRUFBRSxFQUFBOztvQkFBOUIsUUFBUSxHQUFHLFNBQW1CO29CQUM5QixZQUFZLEdBQUcsTUFBQSxNQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsMENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQUM7b0JBQ2xELElBQUksZUFBZSxJQUFJLFFBQVEsRUFBRTt3QkFDdkIscUJBQW1CLCtCQUErQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pGLElBQUksa0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDL0IsV0FBTyxJQUFJLEVBQUM7eUJBQ2Y7d0JBQ0QsYUFBYSxDQUFDLHdEQUFpRCxjQUFjLENBQUMsWUFBWSxDQUFDLGlCQUFPLGtCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBRyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUNqSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkNBQXdDLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ25FLFdBQU8sS0FBSyxFQUFDO3FCQUNoQjtvQkFDSyxnQkFBZ0IsR0FBRywrQkFBK0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQzdFLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDL0IsV0FBTyxJQUFJLEVBQUM7cUJBQ2Y7b0JBQ0QsYUFBYSxDQUFDLHdEQUFpRCxjQUFjLENBQUMsWUFBWSxDQUFDLGlCQUFPLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBRyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUNqSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkNBQXdDLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ25FLFdBQU8sS0FBSyxFQUFDOzs7O0NBQ2hCO0FBQ0QsU0FBUyw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsT0FBZTtJQUFmLHdCQUFBLEVBQUEsZUFBZTtJQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNwQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xFLE9BQU8sYUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBRSxDQUFDO0tBQzNDO0lBQ0QsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLGlCQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxjQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxNQUFHLENBQUM7S0FDckY7SUFDRCxPQUFPLGlCQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxjQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxtQkFBUyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sY0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sTUFBRyxDQUFDO0FBQ25KLENBQUM7QUFDRCxTQUFTLG1DQUFtQyxDQUFDLElBQUk7SUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtRQUN4RCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxJQUFNLE9BQU8sR0FBRztRQUNaLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsU0FBUztLQUNqQixDQUFDO0lBQ0YsT0FBTyx5QkFBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUUsQ0FBQztBQUNwRixDQUFDO0FBQ0QsU0FBUyxtQkFBbUIsQ0FBQyxPQUFPOztJQUNoQyx5QkFBeUIsRUFBRSxDQUFDO0lBQzVCLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDakUsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQztRQUN2QyxrQkFBa0IsRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxvQkFBb0IsbUNBQUksSUFBSTtRQUNoRSx5Q0FBeUMsRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxnQ0FBZ0MsbUNBQUksSUFBSTtRQUNuRyxvQkFBb0IsRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxzQkFBc0IsbUNBQUksS0FBSztRQUNyRSxvQkFBb0IsRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxzQkFBc0IsbUNBQUksS0FBSztLQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNKLEtBQUssQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUM7UUFDekMsUUFBUSxFQUFFLE1BQUEsY0FBYyxDQUFDLEtBQUssbUNBQUksRUFBRTtRQUNwQyxRQUFRLEVBQUUsTUFBQSxjQUFjLENBQUMsU0FBUyxtQ0FBSSxLQUFLO1FBQzNDLG9CQUFvQixFQUFFLE1BQUEsY0FBYyxDQUFDLFNBQVMsbUNBQUksS0FBSztLQUMxRCxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUM7QUFDRCxTQUFTLHlCQUF5Qjs7SUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLDBDQUEwQyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQy9KLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBQSxHQUFHLENBQUMsZUFBZSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7UUFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLCtCQUErQixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsWUFBWSxFQUFFLFVBQUMsT0FBTztRQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsK0JBQStCLENBQUMsS0FBSzs7SUFDMUMsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxXQUFXLENBQUM7UUFDcEIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsS0FBSyxPQUFBO0tBQ1IsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUM7QUFDRCxTQUFTLHVDQUF1QztJQUM1QyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN4QyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN6RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQzVCLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQzdCLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQztLQUMvQjtJQUNELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN4QixDQUFDO0FBQ0QsU0FBUyxxQ0FBcUM7SUFDMUMsSUFBTSxRQUFRLEdBQUcsdUNBQXVDLEVBQUUsQ0FBQztJQUMzRCxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNoRCxJQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ2pFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNoQyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksUUFBUSxLQUFLLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QyxRQUFRLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ2pHLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUN6RyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELFFBQVEsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQzFCLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDbEMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELFNBQVMsOENBQThDO0lBQ25ELElBQUksZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDN0IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7UUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ3RELElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDL0YsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNuRyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUMvRixPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQU07UUFDSCxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDL0YsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxTQUFTLDBDQUEwQyxDQUFDLGdCQUFnQixFQUFFLGtCQUEwQjtJQUExQixtQ0FBQSxFQUFBLDBCQUEwQjtJQUM1RixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUM1RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQzVCLE9BQU87S0FDVjtJQUNELE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLGNBQWMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQzFCLElBQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxrRkFBa0YsQ0FBQyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3SSxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsRUFBOUIsQ0FBOEIsQ0FDM0UsQ0FBQztJQUNGLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxFQUE5QixDQUE4QixDQUNwRixDQUFDO0lBQ0YsSUFBSSw4Q0FBOEMsRUFBRSxFQUFFO1FBQ2xELElBQUksa0JBQWtCLEVBQUU7WUFDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0M7U0FBTTtRQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hDO0FBQ0wsQ0FBQztBQUNELFNBQVMsZ0JBQWdCOztJQUNyQixNQUFBLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUNyRixNQUFBLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUMvRSxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUM1RSxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ1osa0JBQWtCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLG1CQUFtQjs7SUFDeEIsT0FBTyxNQUFBLE1BQUEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLEtBQUssbUNBQUksRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFDRCxTQUFTLGtCQUFrQjs7SUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDakIsT0FBTztLQUNWO0lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0NBQXdDLEVBQUU7UUFDMUQsT0FBTztLQUNWO0lBQ0QsTUFBQSxHQUFHLENBQUMsa0NBQWtDLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRSxNQUFBLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELElBQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDN0IsSUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQUEsTUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLHlDQUF5QywwQ0FBRSx1QkFBdUIsbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoSSxJQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM1QyxJQUFNLDZCQUE2QixHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JFLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtRQUNsRCxPQUFPO0tBQ1Y7SUFDRCxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUM5Qiw2QkFBNkIsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsYUFBYSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCw2QkFBNkIsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkUsYUFBYSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBQ0QsU0FBUyx3QkFBd0I7O0lBQzdCLE9BQU8sQ0FBQyxNQUFBLE1BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLDBDQUFFLEtBQUssbUNBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hFLENBQUM7QUFDRCxTQUFTLGtCQUFrQjs7SUFDdkIsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNoQixPQUFPO0tBQ1Y7SUFDRCxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQUEsTUFBQSxHQUFHLENBQUMseUJBQXlCLENBQUMsMENBQUUsS0FBSyxtQ0FBSSxFQUFFLENBQUM7QUFDdEUsQ0FBQztBQUNELFNBQVMsd0JBQXdCLENBQUMsS0FBSztJQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNmLE9BQU87S0FDVjtJQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN4QixhQUFhLENBQUMsc0NBQXNDLENBQUMsQ0FBQztLQUN6RDtBQUNMLENBQUM7QUFDRCxTQUFTLHVCQUF1QixDQUFDLFVBQVU7O0lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hELE9BQU8sQ0FBQyxDQUFBLE1BQUEsTUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLHlDQUF5QywwQ0FBRSxzQkFBc0IsMENBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7QUFDcEgsQ0FBQztBQUNELFNBQVMsY0FBYztJQUNuQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzFDLEtBQW9CLFVBQXNCLEVBQXRCLEtBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFDO1lBQXRDLElBQU0sS0FBSyxTQUFBO1lBQ1osS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7S0FDSjtBQUNMLENBQUM7QUFDRCxTQUFTLGlCQUFpQjtJQUN0QixJQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkMsSUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN4RCxJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksa0JBQWtCLEtBQUssSUFBSSxFQUFFO1FBQ3BELElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksa0JBQWtCLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUM1RCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLGtCQUFrQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDNUQsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7U0FDbkM7S0FDSjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLFVBQWtCO0lBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO0lBQ3RDLElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDeEQsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7UUFDcEQsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLFVBQVUsRUFBRTtZQUMxRSxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM1QyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUN0QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLGtCQUFrQixDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDaEQsVUFBVSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFDNUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNqQztLQUNKO0FBQ0wsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLE9BQU87SUFDcEIsYUFBYSxFQUFFLENBQUM7SUFDaEIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxHQUFHLEVBQUU7UUFDekMsb0JBQW9CLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwSixJQUFJLG1CQUFtQixFQUFFO1FBQ3JCLGdCQUFnQixFQUFFLENBQUM7S0FDdEI7QUFDTCxDQUFDO0FBQ0QsU0FBUyxhQUFhOztJQUNsQixNQUFBLEdBQUcsQ0FBQyxlQUFlLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSzs7UUFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQU0sbUJBQW1CLEdBQUcsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLFlBQVksTUFBSyxHQUFHLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLFlBQVksTUFBSyxHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEosSUFBSSxtQkFBbUIsRUFBRTtZQUNyQixnQkFBZ0IsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0I7SUFDckIsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RCxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsTUFBTSxFQUFFLENBQUM7SUFDeEIsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6QyxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELElBQUksa0JBQWtCLENBQUM7SUFDdkIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3pFLElBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDMUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZFLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbEQsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDcEU7U0FBTTtRQUNILGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3QyxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1QyxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDcEU7QUFDTCxDQUFDO0FBQ0QsU0FBUyxZQUFZOztJQUNqQixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekUsSUFBSSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMxQyxJQUFNLFFBQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQU0sRUFBRTtZQUNULE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLE1BQUEsUUFBTSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDO0tBQzdCO0lBQ0QsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUNELFNBQVMsb0JBQW9CO0lBQ3pCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakQsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0MsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNyRCxXQUFXLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO0lBQ3pHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDMUQsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRCxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEUsZ0JBQWdCLGFBQWhCLGdCQUFnQix1QkFBaEIsZ0JBQWdCLENBQUUscUJBQXFCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFDRCxTQUFTLFNBQVM7SUFDZCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNwRSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtRQUNsRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPO0lBQzdCLE9BQU8sT0FBTyxLQUFLLDJCQUEyQixJQUFJLE9BQU8sS0FBSyw2QkFBNkIsSUFBSSxPQUFPLEtBQUssOEJBQThCLENBQUM7QUFDOUksQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVU7SUFDNUMsSUFBSSxVQUFVLEVBQUU7UUFDWixRQUFPLGdCQUFnQixFQUFDO1lBQ3BCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssaUJBQWlCO2dCQUNsQixPQUFPLDZCQUE2QixDQUFDO1lBQ3pDO2dCQUNJLE9BQU8sMkJBQTJCLENBQUM7U0FDMUM7S0FDSjtJQUNELFFBQU8sZ0JBQWdCLEVBQUM7UUFDcEIsS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyxrQkFBa0IsQ0FBQztRQUN4QixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxxQkFBcUIsQ0FBQztRQUMzQixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxpQkFBaUIsQ0FBQztRQUN2QixLQUFLLG1CQUFtQjtZQUNwQixPQUFPLDJCQUEyQixDQUFDO1FBQ3ZDLEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssaUJBQWlCO1lBQ2xCLE9BQU8sOEJBQThCLENBQUM7UUFDMUM7WUFDSSxPQUFPLDRCQUE0QixDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLFVBQVU7SUFDaEQsSUFBSSxVQUFVLEVBQUU7UUFDWixRQUFPLGdCQUFnQixFQUFDO1lBQ3BCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssaUJBQWlCO2dCQUNsQixPQUFPLHFDQUFxQyxDQUFDO1lBQ2pEO2dCQUNJLE9BQU8sOENBQThDLENBQUM7U0FDN0Q7S0FDSjtJQUNELFFBQU8sZ0JBQWdCLEVBQUM7UUFDcEIsS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyxrQkFBa0IsQ0FBQztRQUN4QixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxxQkFBcUIsQ0FBQztRQUMzQixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxpQkFBaUIsQ0FBQztRQUN2QixLQUFLLG1CQUFtQjtZQUNwQixPQUFPLDhDQUE4QyxDQUFDO1FBQzFELEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssaUJBQWlCO1lBQ2xCLE9BQU8saUNBQWlDLENBQUM7UUFDN0M7WUFDSSxPQUFPLDBDQUEwQyxDQUFDO0tBQ3pEO0FBQ0wsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGNBQWM7SUFDakQsSUFBSSxVQUFVLEVBQUU7UUFDWixPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELElBQUksY0FBYyxFQUFFO1FBQ2hCLE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLEtBQUs7SUFDckIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQXFCLFVBQTBCLEVBQTFCLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQTFCLGNBQTBCLEVBQTFCLElBQTBCLEVBQUM7UUFBM0MsSUFBTSxNQUFNLFNBQUE7UUFDYixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDM0M7SUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxVQUFVOztJQUNqRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25ELE9BQU87S0FDVjtJQUNELE1BQUEsR0FBRyxDQUFDLHdCQUF3QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEQsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxLQUFnQixVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVUsRUFBQztRQUF0QixJQUFNLENBQUMsbUJBQUE7UUFDUixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDM0IsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0o7SUFDRCxNQUFBLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEUsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNFLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDWixpQkFBaUIsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsY0FBYzs0QkFDekIsR0FBRyxFQUFFLEtBQUs7UUFDbEIsTUFBTSxDQUFDLGtCQUFVLEdBQUcsb0JBQWdCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBdEIsQ0FBc0IsQ0FDdkUsQ0FBQzs7SUFGTixLQUEyQixVQUE4QixFQUE5QixLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQTlCLGNBQThCLEVBQTlCLElBQThCO1FBQTlDLElBQUEsV0FBWSxFQUFYLEdBQUcsUUFBQSxFQUFFLEtBQUssUUFBQTtnQkFBVixHQUFHLEVBQUUsS0FBSztLQUdyQjtBQUNMLENBQUM7QUFDRCxTQUFTLGNBQWMsQ0FBQyxTQUFTO0lBQzdCLElBQU0sS0FBSyxHQUFHLFVBQUMsUUFBUSxJQUFHLE9BQUEseUJBQXlCLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLFFBQVEsRUFBaEYsQ0FBZ0YsQ0FDekc7SUFDRCxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDekUsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDL0UsSUFBSSxlQUFlLEVBQUU7UUFDakIsZUFBZSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7SUFDRCxJQUFJLGdCQUFnQixFQUFFO1FBQ2xCLGdCQUFnQixDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDcEQ7QUFDTCxDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsU0FBUztJQUM5QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBTSxRQUFRLEdBQUcsNENBQTRDLENBQUM7SUFDOUQsSUFBTSxRQUFRLEdBQUcscUVBQXFFLENBQUM7SUFDdkYsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFRLElBQUcsT0FBQSw2QkFDckIsU0FBUyxDQUFDLFVBQVUsU0FBRyxRQUFRLG1DQUF1QixTQUFTLENBQUMsU0FBUyxTQUFLLEdBQUcsVUFBRyxTQUFTLENBQUMsV0FBVyxDQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsRUFEdEosQ0FDc0osQ0FDdEw7SUFDRCxJQUFNLFlBQVksR0FBRyxVQUFDLFFBQVEsSUFBRyxPQUFBLHNCQUFlLFNBQVMsQ0FBQyxTQUFTLDJCQUM3RCxTQUFTLENBQUMsVUFBVSwyQkFDckIsU0FBUyxDQUFDLFVBQVUsU0FBRyxRQUFRLHdEQUU1QixTQUFTLENBQUMsYUFBYSwwQ0FDYixTQUFTLENBQUMsU0FBUyxtQkFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBTHpFLENBS3lFLENBQ3pHO0lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUNoQyxhQUFhLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRyxPQUFPLGFBQWEsQ0FBQztLQUN4QjtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFDRCxTQUFTLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxVQUFVOztJQUNyRCxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDMUIsS0FBMEIsVUFBVSxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVLEVBQUM7UUFBaEMsSUFBTSxXQUFXLG1CQUFBO1FBQ2xCLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksS0FBSSxNQUFBLEdBQUcsQ0FBQyxXQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLGNBQVcsQ0FBQywwQ0FBRSxLQUFLLENBQUEsRUFBRTtZQUNyRyxJQUFNLGFBQWEsR0FBRztnQkFDbEIsSUFBSSxFQUFFLEVBQUU7YUFDWCxDQUFDO1lBQ0YsYUFBYSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3pELGFBQWEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUN2RCxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQUEsR0FBRyxDQUFDLFdBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsY0FBVyxDQUFDLDBDQUFFLEtBQUssQ0FBQztZQUNuRixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3RDO0tBQ0o7SUFDRCxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDO0FBQ0QsU0FBUyxtQkFBbUI7O0lBQ3hCLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqQyxPQUFPLE1BQUEsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsY0FBYyxFQUFFLG1DQUFJLEtBQUssQ0FBQztLQUN4RTtJQUNELE9BQU8sTUFBQSxNQUFBLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQywwQ0FBRSxjQUFjLEVBQUUsbUNBQUksS0FBSyxDQUFDO0FBQ3BFLENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVztJQUNyRCxJQUFJO1FBQ0EsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDbkIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsSUFBSTtvQkFDQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQVk7NEJBQVgsR0FBRyxRQUFBLEVBQUUsS0FBSyxRQUFBO3dCQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO29CQUExQixDQUEwQixDQUNuRSxDQUFDO2lCQUNMO2dCQUFDLFdBQU8sR0FBRTthQUNkO1lBQ0QsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSTtvQkFDQSxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNyQztnQkFBQyxXQUFPLEdBQUU7YUFDZDtZQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztLQUNOO0lBQUMsV0FBTyxHQUFFO0FBQ2YsQ0FBQztBQUNELFNBQVMsZUFBZTtJQUNwQixPQUFPO1FBQ0gsVUFBVSxZQUFBO1FBQ1YsY0FBYyxnQkFBQTtRQUNkLGdCQUFnQixFQUFFLHVCQUF1QjtRQUN6QyxVQUFVLEVBQUU7WUFDUixVQUFVLEVBQUUsZ0JBQWdCO1lBQzVCLGNBQWMsRUFBRSxvQkFBb0I7U0FDdkM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDekIsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLDJCQUEyQix1QkFDbkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sS0FDakQsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFDdEQsQ0FBQyxDQUFDO0lBQ0osS0FBSyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztRQUN4QyxhQUFhLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0tBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQztBQUNELFNBQWUsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTzs7Ozs7OztvQkFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2pCLFdBQU8sRUFBRSxFQUFDO3FCQUNiO29CQUNLLE9BQU8sR0FBRzt3QkFDWixPQUFPLEVBQUU7NEJBQ0wsRUFBRSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUU7eUJBQ2hDO3dCQUNELEtBQUssRUFBRTs0QkFDSCxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ2pCLE1BQU0sUUFBQTs0QkFDTixPQUFPLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxFQUFFOzRCQUM5QixhQUFhLEVBQUUsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUU7NEJBQ3hELGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVM7NEJBQy9HLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFNBQVM7NEJBQ3JILG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFNBQVM7eUJBQ3hIO3FCQUNKLENBQUM7b0JBQ0UsV0FBTSxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsRUFBQTs7b0JBQTdELElBQUksU0FBeUQsRUFBRTt3QkFDM0QsV0FBTyxnQ0FBZ0MsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDO3FCQUMxSDtvQkFDRCxXQUFPLEVBQUUsRUFBQzs7OztDQUNiO0FBQ0QsU0FBZSxVQUFVOzs7Ozs7O29CQUNmLGNBQWMsR0FBRzt3QkFDbkIsT0FBTyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFO3lCQUNoQzt3QkFDRCxLQUFLLEVBQUU7NEJBQ0gsYUFBYSxFQUFFLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFOzRCQUN4RCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsY0FBYyxFQUFFOzRCQUNqRCxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsZUFBZSxFQUFFOzRCQUNuRCxlQUFlLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixFQUFFOzRCQUN4RCxZQUFZLEVBQUUsbUJBQW1CLEVBQUU7NEJBQ25DLCtCQUErQixFQUFFLEVBQUU7NEJBQ25DLE1BQU0sRUFBRSxFQUFFOzRCQUNWLGFBQWEsRUFBRSxFQUFFOzRCQUNqQixrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRTt5QkFDMUM7cUJBQ0osQ0FBQztvQkFDRixJQUFJLDhDQUE4QyxFQUFFLEVBQUU7d0JBQ2xELGNBQWMsQ0FBQyxLQUFLLENBQUMsK0JBQStCLEdBQUcsdUNBQXVDLEVBQUUsQ0FBQztxQkFDcEc7b0JBQ0QsSUFBSSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLFlBQVksRUFBRTt3QkFDOUIsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7cUJBQ2hEO29CQUNELElBQUksTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxlQUFlLEVBQUU7d0JBQ2pDLGNBQWMsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFNBQVMsRUFBRSxDQUFDO3FCQUNwRDtvQkFDTSxXQUFNLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxFQUFBO3dCQUFsRSxXQUFPLFNBQTJELEVBQUM7Ozs7Q0FDdEU7QUFDRCxTQUFTLGdCQUFnQixDQUFDLFFBQVE7O0lBQzlCLElBQUksQ0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLDBDQUFFLHdDQUF3QyxLQUFJLHdCQUF3QixFQUFFLEVBQUU7UUFDekYsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDbkMsT0FBTztLQUNWO0lBQ0QsSUFBTSxPQUFPLEdBQUc7UUFDWixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLFdBQVcsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFO1FBQ3RDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLGNBQWMsRUFBRTtRQUNuRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7UUFDckQsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixFQUFFO1FBQzFELGNBQWMsRUFBRSxtQkFBbUIsRUFBRTtRQUNyQyxxQkFBcUIsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLFNBQVM7UUFDbEUsVUFBVSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEtBQUs7UUFDN0IsaUNBQWlDLEVBQUUsRUFBRTtRQUNyQyxRQUFRLEVBQUUsRUFBRTtRQUNaLFlBQVksRUFBRSxFQUFFO1FBQ2hCLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLE1BQUEsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxpQkFBaUIsbUNBQUksRUFBRSxFQUFFLE1BQUEsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSx1QkFBdUIsbUNBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDNUwsY0FBYyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7S0FDM0MsQ0FBQztJQUNGLElBQUksOENBQThDLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMscUNBQXFDLEVBQUUsRUFBRTtZQUMxQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxPQUFPLENBQUMsK0JBQStCLEdBQUcsdUNBQXVDLEVBQUUsQ0FBQztLQUN2RjtJQUNELElBQUksTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxZQUFZLEVBQUU7UUFDOUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztLQUNuQztJQUNELElBQUksTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxlQUFlLEVBQUU7UUFDakMsT0FBTyxDQUFDLFVBQVUsR0FBRyxTQUFTLEVBQUUsQ0FBQztLQUNwQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBQ0QsU0FBUyxnQ0FBZ0MsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsTUFBTTtJQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBTSxDQUFDLEdBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUMsSUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbkQsSUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxjQUFPLENBQUMsZ0JBQU0sTUFBTSxTQUFHLElBQUksNkJBQTBCLENBQUM7SUFDNUcsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ3ZELElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsSUFBSSxNQUFNLEtBQUssbUJBQW1CLEVBQUU7UUFDakcsT0FBTyxVQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxrQ0FBd0IsT0FBTyxrQkFBUSxHQUFHLENBQUUsQ0FBQztLQUN0RjtJQUNELElBQUkscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUsseUJBQXlCLEVBQUU7UUFDaEUsT0FBTyxjQUFPLENBQUMsZ0JBQU0sTUFBTSxTQUFHLElBQUksdUNBQW9DLENBQUM7S0FDMUU7SUFDRCxPQUFPLFVBQUcsR0FBRyxjQUFJLE9BQU8sbUJBQVMsR0FBRyxDQUFFLENBQUM7QUFDM0MsQ0FBQztBQUNELFNBQWUsc0JBQXNCLENBQUMsT0FBZTtJQUFmLHdCQUFBLEVBQUEsZUFBZTs7Ozs7O29CQUMzQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsQ0FBQyxDQUFDO3dCQUNBLEtBQUssRUFBRTs0QkFDSCxpQkFBaUIsRUFBRSxhQUFhLENBQUMsdUJBQXVCLEVBQUU7NEJBQzFELGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLFlBQVksRUFBRTt5QkFDckQ7cUJBQ0osQ0FBQzs7OztvQkFFbUIsV0FBTSxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsRUFBQTs7b0JBQXRFLFFBQVEsR0FBRyxTQUEyRDtvQkFDNUUsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0JBRXpDLElBQUksT0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsd0NBQWlDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxzQkFBWSxPQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNuSTs7Ozs7O0NBRVI7QUFDRCxTQUFTLGtCQUFrQjtJQUEzQixpQkF3QkM7O0lBdkJHLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLFVBQU8sQ0FBQzs7O3dCQUM5QyxXQUFNLHNCQUFzQixFQUFFLEVBQUE7O29CQUE5QixTQUE4QixDQUFDO29CQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RELEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7d0JBQzdCLGFBQWEsRUFBRSxTQUFTO3FCQUMzQixDQUFDLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7OztTQUN0QyxDQUFDLENBQUM7SUFDSCxNQUFBLEdBQUcsQ0FBQyxlQUFlLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSztRQUNuRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMvRCxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN0QixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUU7U0FDcEQsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBQSxHQUFHLENBQUMsK0JBQStCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDL0YsTUFBQSxHQUFHLENBQUMsc0JBQXNCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUNELFNBQWUsZUFBZTs7Ozt3QkFDbkIsV0FBTSxtQkFBbUIsQ0FBQyw2QkFBNkIsRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFBO3dCQUFsRyxXQUFPLFNBQTJGLEVBQUM7Ozs7Q0FDdEc7QUFDRCxTQUFlLDRCQUE0QixDQUFDLEtBQUs7Ozs7OztvQkFDdkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3ZCLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDdEQsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDakMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQzNDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUN2RCxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDO3dCQUMzQyxPQUFPLEVBQUUsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksRUFBRTt3QkFDdEIsa0JBQWtCLEVBQUUsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksRUFBRTt3QkFDcEMsZUFBZSxFQUFFLGdCQUFnQixhQUFoQixnQkFBZ0IsY0FBaEIsZ0JBQWdCLEdBQUksRUFBRTtxQkFDMUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFdBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0JBQTlCLFNBQThCLENBQUM7b0JBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUN0QztBQUNELFNBQVMsY0FBYzs7SUFDbkIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDMUMsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7UUFDdkMsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3RDtTQUFNO1FBQ0gsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDL0Q7SUFDRCxxQkFBcUIsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFDRCxTQUFTLGlCQUFpQixDQUFDLElBQUk7O0lBQzNCLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE1BQUEsR0FBRyxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsTUFBQSxHQUFHLENBQUMseUJBQXlCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxLQUF1QixVQUFpQyxFQUFqQyxLQUFBLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFDO1lBQXBELElBQU0sUUFBUSxTQUFBO1lBQ2YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7UUFDRCxLQUF3QixVQUFpQyxFQUFqQyxLQUFBLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFDO1lBQXJELElBQU0sU0FBUyxTQUFBO1lBQ2hCLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0tBQ0o7U0FBTTtRQUNILE1BQUEsR0FBRyxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBQSxHQUFHLENBQUMseUJBQXlCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxLQUF1QixVQUFpQyxFQUFqQyxLQUFBLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFDO1lBQXBELElBQU0sUUFBUSxTQUFBO1lBQ2YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7UUFDRCxLQUF3QixVQUFpQyxFQUFqQyxLQUFBLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFDO1lBQXJELElBQU0sU0FBUyxTQUFBO1lBQ2hCLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7QUFDTCxDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxlQUFlO0lBQzlDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN0QixLQUF5QyxVQUErQixFQUEvQixLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQS9CLGNBQStCLEVBQS9CLElBQStCLEVBQUM7UUFBOUQsSUFBQSxXQUEwQixFQUF6QixPQUFPLFFBQUEsRUFBRSxlQUFlLFFBQUE7UUFDaEMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsQixTQUFTO1NBQ1o7UUFDRCxLQUFvRCxVQUE4QyxFQUE5QyxLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxFQUE5QyxjQUE4QyxFQUE5QyxJQUE4QyxFQUFDO1lBQXhGLElBQUEsV0FBcUMsRUFBcEMsa0JBQWtCLFFBQUEsRUFBRSxlQUFlLFFBQUE7WUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDbEIsU0FBUzthQUNaO1lBQ0QsWUFBWSxJQUFJLDRCQUE0QixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pIO0tBQ0o7SUFDRCxHQUFHLENBQUMsc0JBQXNCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxHQUFHLFlBQVksRUFBakMsQ0FBaUMsQ0FDeEUsQ0FBQztJQUNGLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxFQUFqQyxDQUFpQyxDQUNqRixDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxRQUFROztJQUN4RixJQUFNLGdCQUFnQixHQUFHLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxVQUFHLE9BQU8sY0FBSSxrQkFBa0IsQ0FBRSxDQUFDO0lBQ25HLElBQU0sbUJBQW1CLEdBQUcsVUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsSUFBRyxPQUFBLHlDQUNqQyxnQkFBZ0IsY0FBSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsaUtBQ2xCLGdCQUFnQixjQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyx1Q0FBMkIsZ0JBQWdCLHlCQUFhLFNBQVMsK0JBQWtCLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdGQUNoSyxNQUFNLENBQUMsS0FBSywySEFDZ0Msb0JBQW9CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBdUIsOEJBQThCLENBQUMsUUFBUSxDQUFDLDZCQUMxTCxFQUxzRCxDQUt0RCxDQUNKO0lBQ0QsSUFBTSxlQUFlLEdBQUcsMERBQWlELE1BQUEsZUFBZSxDQUFDLFlBQVksbUNBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFPLENBQUM7SUFDMUksSUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFtQztZQUFsQyxpQkFBaUIsUUFBQSxFQUFFLGNBQWMsUUFBQTtRQUFJLE9BQUEsY0FBYyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLGVBQWUsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQW5JLENBQW1JLENBQ3RQLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsT0FBTyxpQ0FDVyxPQUFPLG1DQUF1QixrQkFBa0Isb0JBQ25FLGVBQWUsaUJBQ2Ysd0JBQXdCLGFBQ3BCLENBQUM7QUFDUixDQUFDO0FBQ0QsU0FBUyxlQUFlO0lBQ3BCLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDdEQsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsRUFBRTtRQUN0QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxTQUFTLDhCQUE4QixDQUFDLFFBQVE7SUFDNUMsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1FBQzdFLEtBQUssQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBUyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVMsQ0FBQyxDQUFDLENBQUM7U0FDbkY7YUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQVMsYUFBYSxDQUFDLG1EQUFtRCxDQUFDLFlBQVMsQ0FBQyxDQUFDLENBQUM7U0FDdkg7S0FDSjtBQUNMLENBQUM7QUFDRCxTQUFTLHlCQUF5Qjs7SUFDOUIsT0FBTyxDQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sMENBQUUseUNBQXlDLE1BQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQzdILENBQUM7QUFDRCxTQUFTLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxZQUFZO0lBQ3BELE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRywyQkFBMkIsRUFBRTtRQUM3RyxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNMLGNBQWMsRUFBRSxrQkFBa0I7U0FDckM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQixTQUFTLFdBQUE7WUFDVCxZQUFZLEVBQUUsWUFBWSxJQUFJLEtBQUs7U0FDdEMsQ0FBQztLQUNMLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLG9CQUFvQixDQUFDLEtBQUssRUFBRSxFQUFtRDtRQUFqRCxNQUFNLFlBQUEsRUFBRyxPQUFPLGFBQUEsRUFBRyxXQUFXLGlCQUFBLEVBQUcsYUFBYSxtQkFBQTtJQUNqRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNqQixPQUFPO0tBQ1Y7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztRQUN0QixNQUFNLFFBQUE7UUFDTixPQUFPLFNBQUE7UUFDUCxXQUFXLGFBQUE7UUFDWCxhQUFhLGVBQUE7UUFDYixnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7UUFDN0MsV0FBVyxFQUFFLGdDQUFnQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9ILEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixDQUFDO0FBQ0QsU0FBUyxxQkFBcUI7O0lBQzFCLElBQUksYUFBYSxDQUFDLHdCQUF3QixFQUFFLEVBQUU7UUFDMUMsTUFBQSxHQUFHLENBQUMsc0JBQXNCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6RDtTQUFNO1FBQ0gsTUFBQSxHQUFHLENBQUMsc0JBQXNCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0RDtBQUNMLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxPQUFPO0lBQ3pCLGtCQUFrQixFQUFFLENBQUM7SUFDckIseUJBQXlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFDRCxTQUFTLGtCQUFrQjs7SUFDdkIsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hFLE1BQUEsR0FBRyxDQUFDLGVBQWUsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsY0FBSSxPQUFBLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFwQyxDQUFvQyxDQUN4RixDQUFDO0lBQ0YsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLElBQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdkMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxJQUFJLFlBQVksS0FBSyxvQkFBb0IsRUFBRTtnQkFDdkMsb0JBQW9CLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBQ0QsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtZQUMxQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUM7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQWUsd0JBQXdCOzs7Ozs7b0JBQzdCLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsV0FBTztxQkFDVjtvQkFDSyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9CLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO29CQUM1RCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQzt3QkFDMUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO3dCQUNuQyxVQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7d0JBQzdDLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzt3QkFDM0MsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO3dCQUN6QyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7d0JBQ3pDLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzt3QkFDakMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO3dCQUNuQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7d0JBQ3JDLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzt3QkFDdkMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO3FCQUN0QyxDQUFDLENBQUMsQ0FBQztvQkFDRSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt5QkFDdkQsQ0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUEsRUFBL0csY0FBK0c7b0JBQy9HLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxXQUFNLHNCQUFzQixFQUFFLEVBQUE7O29CQUE5QixTQUE4QixDQUFDO29CQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7Ozs7O0NBRTFDO0FBQ0QsU0FBZSxZQUFZOzs7Ozs7d0JBQ04sV0FBTSxXQUFXLEVBQUUsRUFBQTs7b0JBQTlCLFFBQVEsR0FBRyxTQUFtQjtvQkFDcEMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO3dCQUNiLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDeEUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLHVCQUN0QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FDMUIsT0FBTyxFQUFFLE1BQUEsQ0FBQyxNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSx3QkFBd0IsbUNBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLGFBQWEsQ0FBQyxtQ0FBSSxFQUFFLElBQ3hGLENBQUMsQ0FBQzt3QkFDSixXQUFPO3FCQUNWO29CQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7d0JBQzdCLGNBQWMsRUFBRSxJQUFJO3dCQUNwQixhQUFhLEVBQUUsU0FBUztxQkFDM0IsQ0FBQyxDQUFDLENBQUM7Ozs7O0NBQ1A7QUFDRCxTQUFlLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWE7Ozs7OztvQkFDaEUsU0FBUyxHQUF5RixnQkFBZ0IsVUFBekcsRUFBRyxRQUFRLEdBQThFLGdCQUFnQixTQUE5RixFQUFHLEtBQUssR0FBc0UsZ0JBQWdCLE1BQXRGLEVBQUcsS0FBSyxHQUE4RCxnQkFBZ0IsTUFBOUUsRUFBRyxRQUFRLEdBQW1ELGdCQUFnQixTQUFuRSxFQUFHLFFBQVEsR0FBd0MsZ0JBQWdCLFNBQXhELEVBQUcsTUFBTSxHQUErQixnQkFBZ0IsT0FBL0MsRUFBRyxJQUFJLEdBQXdCLGdCQUFnQixLQUF4QyxFQUFHLEtBQUssR0FBZ0IsZ0JBQWdCLE1BQWhDLEVBQUcsT0FBTyxHQUFNLGdCQUFnQixRQUF0QixDQUF1QjtvQkFDckgsUUFBUSxHQUFHO3dCQUNiLFlBQVksRUFBRSxTQUFTLEVBQUU7d0JBQ3pCLFdBQVcsRUFBRSxRQUFRLEVBQUU7d0JBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRSxLQUFLLEVBQUU7d0JBQ2hCLFVBQVUsRUFBRSxRQUFRLEVBQUU7d0JBQ3RCLFVBQVUsRUFBRSxRQUFRLEVBQUU7d0JBQ3RCLFFBQVEsRUFBRSxNQUFNLEVBQUU7d0JBQ2xCLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBQ2QsT0FBTyxFQUFFLEtBQUssRUFBRTt3QkFDaEIsU0FBUyxFQUFFLE9BQU8sRUFBRTt3QkFDcEIsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsTUFBTSxFQUFFOzRCQUNKLEtBQUssT0FBQTs0QkFDTCxLQUFLLE9BQUE7eUJBQ1I7d0JBQ0QsZ0JBQWdCLEVBQUUsYUFBYTtxQkFDbEMsQ0FBQztvQkFDRixXQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBQTs7b0JBQTNCLFNBQTJCLENBQUM7b0JBQzVCLFdBQU8sUUFBUSxFQUFDOzs7O0NBQ25CO0FBQ0QsU0FBUyxhQUFhLENBQUMsUUFBUTs7SUFDM0IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLFFBQU8sTUFBQSxRQUFRLENBQUMsSUFBSSwwQ0FBRSxLQUFLLEVBQUM7UUFDeEIsS0FBSyxNQUFNO1lBQ1AsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNqQixNQUFNO1FBQ1YsS0FBSyxZQUFZO1lBQ2IsT0FBTyxHQUFHLFlBQVksQ0FBQztZQUN2QixNQUFNO1FBQ1YsS0FBSyxrQkFBa0I7WUFDbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNqQixNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixNQUFNO1FBQ1YsS0FBSyxhQUFhO1lBQ2QsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUNuQixNQUFNO1FBQ1YsS0FBSyxLQUFLO1lBQ04sT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixNQUFNO1FBQ1Y7WUFDSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBQ0QsTUFBQSxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFDRCxTQUFTLDhCQUE4QixDQUFDLFFBQVE7O0lBQzVDLElBQUksUUFBUSxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUU7UUFDdEMsTUFBQSxHQUFHLENBQUMsbUNBQW1DLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxNQUFNLE1BQUssR0FBRyxFQUFFO1lBQ2hDLE1BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNILE1BQUEsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0QsTUFBQSxHQUFHLENBQUMsNEJBQTRCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvRDtLQUNKO1NBQU07UUFDSCxNQUFBLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0FBQ0wsQ0FBQztBQUNELFNBQVMsMEJBQTBCOztJQUMvQixJQUFNLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVFLElBQUksZ0JBQWdCLEVBQUU7UUFDbEIsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPO1NBQ1Y7UUFDRCxJQUFNLGVBQWEsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsSUFBTSxzQkFBc0IsR0FBRyxNQUFBLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLE1BQUEsVUFBVSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUMxRyxJQUFJLHNCQUFzQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkQsSUFBSSx1QkFBdUIsRUFBRTtnQkFDekIsdUJBQXVCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLGVBQWEsQ0FBQyxDQUFDO2dCQUM5Rix1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN6Qyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLGVBQWEsS0FBSyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDdEQsR0FBRyxDQUFDLDZCQUE2QixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQWhELENBQWdELENBQzlGLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxlQUFhLEtBQUssYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQzFELEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUE3QyxDQUE2QyxDQUMzRixDQUFDO2lCQUNMO3FCQUFNO29CQUNILEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBYSxFQUFwQyxDQUFvQyxDQUNsRixDQUFDO2lCQUNMO2dCQUNELHVCQUF1QixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3hDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELE1BQUEsR0FBRyxDQUFDLDZCQUE2QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEU7WUFDRCxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQyxJQUFJLHFCQUFxQixFQUFFO2dCQUN2QixxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN0QyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN2QyxxQkFBcUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNqQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxNQUFBLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0o7YUFBTTtZQUNILElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkQsSUFBSSx1QkFBdUIsRUFBRTtnQkFDekIsdUJBQXVCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDeEMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDcEQsdUJBQXVCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUMsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9DLElBQUkscUJBQXFCLEVBQUU7Z0JBQ3ZCLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BELElBQUksZUFBYSxLQUFLLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO29CQUN0RCxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBaEQsQ0FBZ0QsQ0FDeEYsQ0FBQztpQkFDTDtxQkFBTSxJQUFJLGVBQWEsS0FBSyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDMUQsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQTdDLENBQTZDLENBQ3JGLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxlQUFhLEVBQXBDLENBQW9DLENBQzVFLENBQUM7aUJBQ0w7Z0JBQ0QscUJBQXFCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakMscUJBQXFCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsTUFBQSxHQUFHLENBQUMsdUJBQXVCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxRDtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxvQkFBb0I7SUFDbkQsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUNqRixPQUFPO0tBQ1Y7SUFDRCxJQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNiLE9BQU87S0FDVjtJQUNELElBQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxJQUFNLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUM5RCxVQUFVLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxRSxjQUFjLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLHdCQUF3QixJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hILElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2pDLFVBQVUsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFDRCxTQUFTLG9CQUFvQixDQUFDLFFBQVE7SUFDbEMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFwQyxDQUFvQyxDQUM3RixDQUFDO0lBQ0YsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFuQyxDQUFtQyxDQUMzRixDQUFDO0lBQ0YsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUEvQixDQUErQixDQUNuRixDQUFDO0lBQ0YsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUEvQixDQUErQixDQUNuRixDQUFDO0lBQ0YsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFsQyxDQUFrQyxDQUN6RixDQUFDO0lBQ0YsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFsQyxDQUFrQyxDQUN6RixDQUFDO0lBQ0YsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFoQyxDQUFnQyxDQUNyRixDQUFDO0lBQ0YsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxFQUE5QixDQUE4QixDQUNqRixDQUFDO0lBQ0YsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFqQyxDQUFpQyxDQUN2RixDQUFDO0lBQ0YsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsOEJBQThCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQS9CLENBQStCLENBQzlFLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCOztJQUNwRCxJQUFJLGdCQUFnQixFQUFFO1FBQ2xCLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBckMsQ0FBcUMsQ0FDdkUsQ0FBQztRQUNGLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBMUMsQ0FBMEMsQ0FDakYsQ0FBQztRQUNGLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBekMsQ0FBeUMsQ0FDL0UsQ0FBQztRQUNGLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBeEMsQ0FBd0MsQ0FDN0UsQ0FBQztRQUNGLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBdkUsQ0FBdUUsQ0FDNUcsQ0FBQztRQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBcEMsQ0FBb0MsQ0FDckUsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBTSxlQUFhLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGdCQUFnQiwwQ0FBRSwyQkFBMkIsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZHLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBYSxhQUFiLGVBQWEsY0FBYixlQUFhLEdBQUksRUFBRSxFQUExQyxDQUEwQyxDQUM1RSxDQUFDO1NBQ0w7YUFBTTtZQUNILEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBckMsQ0FBcUMsQ0FDdkUsQ0FBQztTQUNMO1FBQ0QsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUF2RCxDQUF1RCxDQUMzRixDQUFDO1FBQ0YsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUF0QyxDQUFzQyxDQUN6RSxDQUFDO1FBQ0YsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLFFBQVEsZ0JBQUcsT0FBQSxRQUFRLENBQUMsV0FBVyxHQUFHLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSwwQ0FBRSxLQUFLLG1DQUFJLEVBQUUsQ0FBQSxFQUFBLENBQ3BGLENBQUM7S0FDTDtTQUFNO1FBQ0gsSUFBSSxhQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBTSxTQUFTLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGdCQUFnQiwwQ0FBRSwyQkFBMkIsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25HLGFBQVcsR0FBRyxVQUFHLFFBQVEsQ0FBQyxNQUFNLGVBQUssU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksUUFBUSxDQUFDLEtBQUssZ0JBQU0sUUFBUSxDQUFDLElBQUksZUFBSyxRQUFRLENBQUMsUUFBUSxTQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQztTQUNsSzthQUFNO1lBQ0gsYUFBVyxHQUFHLFVBQUcsUUFBUSxDQUFDLFFBQVEsU0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBSSxRQUFRLENBQUMsSUFBSSxlQUFLLFFBQVEsQ0FBQyxLQUFLLGNBQUksUUFBUSxDQUFDLE1BQU0sZUFBSyxRQUFRLENBQUMsT0FBTyxDQUFFLENBQUM7U0FDL0s7UUFDRCxJQUFNLFVBQVEsR0FBRyxVQUFHLFFBQVEsQ0FBQyxVQUFVLGNBQUksUUFBUSxDQUFDLFNBQVMsQ0FBRSxDQUFDO1FBQ2hFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQW5DLENBQW1DLENBQzVELENBQUM7UUFDRixHQUFHLENBQUMsWUFBWSxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFRLEVBQTdCLENBQTZCLENBQzFELENBQUM7UUFDRixHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxhQUFXLEVBQWhDLENBQWdDLENBQzlELENBQUM7S0FDTDtBQUNMLENBQUM7QUFDRCxTQUFTLHdCQUF3QixDQUFDLFlBQVk7O0lBQzFDLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGNBQWMsS0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1FBQy9KLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxFQUFsQyxDQUFrQyxDQUM3RixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLEVBQWxDLENBQWtDLENBQ2xGLENBQUM7S0FDTDtTQUFNLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGNBQWMsS0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQUU7UUFDdkssWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLEVBQWxDLENBQWtDLENBQzdGLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sRUFBbEMsQ0FBa0MsQ0FDbEYsQ0FBQztLQUNMO1NBQU0sSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUsY0FBYyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGNBQWMsQ0FBQSxLQUFJLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUsdUNBQXVDLENBQUEsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRTtRQUMxUyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsRUFBcEMsQ0FBb0MsQ0FDL0YsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxFQUFwQyxDQUFvQyxDQUNwRixDQUFDO0tBQ0w7U0FBTSxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGNBQWMsQ0FBQSxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLHVDQUF1QyxDQUFBLEtBQUksTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxrQkFBa0IsQ0FBQSxFQUFFO1FBQzFJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxFQUFsQyxDQUFrQyxDQUM3RixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQXBDLENBQW9DLENBQ3BGLENBQUM7S0FDTDtTQUFNLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGNBQWMsS0FBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUsdUNBQXVDLEtBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFO1FBQ2xJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxFQUFsQyxDQUFrQyxDQUM3RixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQXBDLENBQW9DLENBQ3BGLENBQUM7S0FDTDtTQUFNLElBQUksWUFBWSxFQUFFO1FBQ3JCLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sRUFBbEMsQ0FBa0MsQ0FDOUUsQ0FBQztLQUNMO0FBQ0wsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLE9BQU87O0lBQ3pCLGtCQUFrQixFQUFFLENBQUM7SUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztRQUN4QyxJQUFJLEVBQUUsTUFBQSxNQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwQ0FBRSxJQUFJLG1DQUFJLEtBQUs7UUFDbEQsTUFBTSxFQUFFLE1BQUEsTUFBQSxNQUFBLE9BQU8sQ0FBQyxPQUFPLDBDQUFFLGFBQWEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHO1FBQ3JELG1CQUFtQixFQUFFLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsMENBQUUsbUJBQW1CLG1DQUFJLEdBQUc7UUFDOUUsaUJBQWlCLEVBQUUsTUFBQSxNQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwQ0FBRSxpQkFBaUIsbUNBQUksR0FBRztRQUMxRSxrQkFBa0IsRUFBRSxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLDBDQUFFLGtCQUFrQixtQ0FBSSxDQUFDO1FBQzFFLFFBQVEsRUFBRSxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLDBDQUFFLFFBQVEsbUNBQUksTUFBTTtRQUMzRCxRQUFRLEVBQUUsTUFBQSxNQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwQ0FBRSxRQUFRLG1DQUFJLFVBQVU7S0FDbEUsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDO0FBQ0QsU0FBUyxrQkFBa0I7SUFDdkIsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLHFCQUFxQixFQUFFLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxxQkFBcUI7SUFDcEIsSUFBQSxLQUF5QixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQXJFLFFBQVEsY0FBQSxFQUFHLE1BQU0sWUFBb0QsQ0FBQztJQUM5RSxJQUFNLEtBQUssR0FBRyxRQUFRLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxhQUFhLENBQUM7SUFDakUsS0FBdUIsVUFBa0QsRUFBbEQsS0FBQSxNQUFNLENBQUMsMEJBQW1CLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQyxFQUFsRCxjQUFrRCxFQUFsRCxJQUFrRCxFQUFDO1FBQXJFLElBQU0sUUFBUSxTQUFBO1FBQ2YsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7S0FDL0I7QUFDTCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxRQUFROztJQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUkseUJBQXlCLEVBQUUsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxjQUFjLEVBQUU7UUFDcEksT0FBTztLQUNWO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixLQUFvQixVQUEyQixFQUEzQixLQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUEzQixjQUEyQixFQUEzQixJQUEyQixFQUFDO1FBQTNDLElBQU0sS0FBSyxTQUFBO1FBQ1osS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEM7SUFDRCxNQUFBLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDM0MsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxFQUFsQyxDQUFrQyxDQUM5RSxDQUFDO0tBQ0w7U0FBTTtRQUNILEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsRUFBcEMsQ0FBb0MsQ0FDaEYsQ0FBQztLQUNMO0FBQ0wsQ0FBQztBQUNELFNBQVMsa0JBQWtCO0lBQTNCLGlCQTZDQztJQTVDRyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsVUFBTyxPQUFPOzs7OztvQkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2pCLFdBQU87cUJBQ1Y7b0JBQ0QsV0FBbUQsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQzt3QkFBekMsUUFBUTt3QkFDZixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQ2xCLHdCQUF3QixFQUFFLENBQUM7d0JBQzNCLFdBQW1ELEVBQTVCLEtBQUEsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQTVCLGNBQTRCLEVBQTVCLElBQTRCLEVBQUM7NEJBQXpDLFFBQVE7NEJBQ2YsUUFBUSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOzRCQUN2QyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7d0JBQ25DLFdBQU87cUJBQ1Y7b0JBQ0QsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQy9CLFdBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0JBQTlCLFNBQThCLENBQUM7b0JBQy9CLHdCQUF3QixFQUFFLENBQUM7b0JBQzNCLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO29CQUNuQyx3QkFBd0IsRUFBRSxDQUFDOzs7O1NBQzlCLENBQUMsQ0FBQzs0QkFDUSxLQUFLO1FBQ1osS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7O1lBQ25DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUN4QixPQUFPO2FBQ1Y7WUFDRCx3QkFBd0IsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLElBQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxJQUFNLGNBQWMsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQztZQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDdEIsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsVUFBVSxFQUFFLGNBQWM7YUFDN0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDOztJQWRQLEtBQW9CLFVBQThCLEVBQTlCLEtBQUEsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQTlCLGNBQThCLEVBQTlCLElBQThCO1FBQTdDLElBQU0sS0FBSyxTQUFBO2dCQUFMLEtBQUs7S0FlZjtJQUNELEtBQW1CLFVBQTJCLEVBQTNCLEtBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQTNCLGNBQTJCLEVBQTNCLElBQTJCLEVBQUM7UUFBMUMsSUFBTSxJQUFJLFNBQUE7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7S0FDckQ7SUFDRCxLQUF3QixVQUEyQixFQUEzQixLQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUEzQixjQUEyQixFQUEzQixJQUEyQixFQUFDO1FBQS9DLElBQU0sU0FBUyxTQUFBO1FBQ2hCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztLQUMxRDtBQUNMLENBQUM7QUFDRCxTQUFTLGlCQUFpQjtJQUN0QixLQUFzQixVQUE4QixFQUE5QixLQUFBLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUE5QixjQUE4QixFQUE5QixJQUE4QixFQUFDO1FBQWhELElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7SUFDRCxLQUFzQixVQUEyQixFQUEzQixLQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUEzQixjQUEyQixFQUEzQixJQUEyQixFQUFDO1FBQTdDLElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUI7SUFDdEIsS0FBc0IsVUFBOEIsRUFBOUIsS0FBQSxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBOUIsY0FBOEIsRUFBOUIsSUFBOEIsRUFBQztRQUFoRCxJQUFNLE9BQU8sU0FBQTtRQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsS0FBc0IsVUFBMkIsRUFBM0IsS0FBQSxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBM0IsY0FBMkIsRUFBM0IsSUFBMkIsRUFBQztRQUE3QyxJQUFNLE9BQU8sU0FBQTtRQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsS0FBdUIsVUFBNEIsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQztRQUEvQyxJQUFNLFFBQVEsU0FBQTtRQUNmLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUNELFNBQVMsd0JBQXdCO0lBQzdCLEtBQXVCLFVBQTRCLEVBQTVCLEtBQUEsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQTVCLGNBQTRCLEVBQTVCLElBQTRCLEVBQUM7UUFBL0MsSUFBTSxRQUFRLFNBQUE7UUFDZixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQztJQUNELEtBQXNCLFVBQTBCLEVBQTFCLEtBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQTFCLGNBQTBCLEVBQTFCLElBQTBCLEVBQUM7UUFBNUMsSUFBTSxPQUFPLFNBQUE7UUFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsS0FBMkIsVUFBMEIsRUFBMUIsS0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEIsRUFBQztRQUFqRCxJQUFNLFlBQVksU0FBQTtRQUNuQixZQUFZLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUNqQztBQUNMLENBQUM7QUFDRCxTQUFTLHdCQUF3QjtJQUM3QixLQUF1QixVQUE0QixFQUE1QixLQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QixFQUFDO1FBQS9DLElBQU0sUUFBUSxTQUFBO1FBQ2YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFDRCxLQUFzQixVQUEwQixFQUExQixLQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUExQixjQUEwQixFQUExQixJQUEwQixFQUFDO1FBQTVDLElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUNoRDtJQUNELEtBQTJCLFVBQTBCLEVBQTFCLEtBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQTFCLGNBQTBCLEVBQTFCLElBQTBCLEVBQUM7UUFBakQsSUFBTSxZQUFZLFNBQUE7UUFDbkIsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDaEM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsUUFBUTtJQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssU0FBUyxFQUFFO1FBQzVJLE9BQU87S0FDVjtJQUNELHNCQUFzQixFQUFFLENBQUM7SUFDekIscUJBQXFCLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBQ0QsU0FBUyxxQkFBcUI7SUFBOUIsaUJBNkNDO0lBNUNHLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBTyxPQUFPOzs7OztvQkFDcEMsV0FBbUQsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQzt3QkFBekMsUUFBUTt3QkFDZixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDN0Msc0JBQXNCLEVBQUUsQ0FBQzt3QkFDekIsV0FBbUQsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQzs0QkFBekMsUUFBUTs0QkFDZixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0QsV0FBTztxQkFDVjtvQkFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQkFDcEMsV0FBTSxzQkFBc0IsRUFBRSxFQUFBOztvQkFBOUIsU0FBOEIsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7b0JBQ25DLHNCQUFzQixFQUFFLENBQUM7b0JBQ3pCLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1NBQ3ZDLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDbkMsc0JBQXNCLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQzs0QkFDUSxLQUFLO1FBQ1osS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7O1lBQ25DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUN4QixPQUFPO2FBQ1Y7WUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUNwQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3pCLElBQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQUEsS0FBSyxDQUFDLE1BQU0sbUNBQUksU0FBUyxDQUFDLENBQUM7WUFDckQsSUFBTSxVQUFVLEdBQUcsTUFBQSxNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLDBDQUFFLElBQUksRUFBRSxtQ0FBSSxFQUFFLENBQUM7WUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsVUFBVTthQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7O0lBZFAsS0FBb0IsVUFBNkIsRUFBN0IsS0FBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsRUFBN0IsY0FBNkIsRUFBN0IsSUFBNkI7UUFBNUMsSUFBTSxLQUFLLFNBQUE7Z0JBQUwsS0FBSztLQWVmO0lBQ0QsS0FBMEIsVUFBNkIsRUFBN0IsS0FBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsRUFBN0IsY0FBNkIsRUFBN0IsSUFBNkIsRUFBQztRQUFuRCxJQUFNLFdBQVcsU0FBQTtRQUNsQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsS0FBMEIsVUFBNkIsRUFBN0IsS0FBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsRUFBN0IsY0FBNkIsRUFBN0IsSUFBNkIsRUFBQztRQUFuRCxJQUFNLFdBQVcsU0FBQTtRQUNsQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQzFEO0lBQ0Qsc0JBQXNCLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBQ0QsU0FBUyxzQkFBc0I7O0lBQzNCLEtBQW9CLFVBQTZCLEVBQTdCLEtBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQTdCLGNBQTZCLEVBQTdCLElBQTZCLEVBQUM7UUFBN0MsSUFBTSxLQUFLLFNBQUE7UUFDWixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQztJQUNELE1BQUEsR0FBRyxDQUFDLHNCQUFzQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELFNBQVMsZUFBZTtJQUNwQixLQUFzQixVQUE2QixFQUE3QixLQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUE3QixjQUE2QixFQUE3QixJQUE2QixFQUFDO1FBQS9DLElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7SUFDRCxLQUFzQixVQUE2QixFQUE3QixLQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUE3QixjQUE2QixFQUE3QixJQUE2QixFQUFDO1FBQS9DLElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxlQUFlO0lBQ3BCLEtBQXNCLFVBQTZCLEVBQTdCLEtBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQTdCLGNBQTZCLEVBQTdCLElBQTZCLEVBQUM7UUFBL0MsSUFBTSxPQUFPLFNBQUE7UUFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQztJQUNELEtBQXNCLFVBQTZCLEVBQTdCLEtBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQTdCLGNBQTZCLEVBQTdCLElBQTZCLEVBQUM7UUFBL0MsSUFBTSxPQUFPLFNBQUE7UUFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQztJQUNELEtBQXVCLFVBQTRCLEVBQTVCLEtBQUEsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQTVCLGNBQTRCLEVBQTVCLElBQTRCLEVBQUM7UUFBL0MsSUFBTSxRQUFRLFNBQUE7UUFDZixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQztJQUNELFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFDRCxTQUFTLHNCQUFzQjtJQUMzQixLQUF1QixVQUE0QixFQUE1QixLQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QixFQUFDO1FBQS9DLElBQU0sUUFBUSxTQUFBO1FBQ2YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEM7SUFDRCxLQUFzQixVQUErQixFQUEvQixLQUFBLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUEvQixjQUErQixFQUEvQixJQUErQixFQUFDO1FBQWpELElBQU0sT0FBTyxTQUFBO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUNuRDtJQUNELEtBQTJCLFVBQStCLEVBQS9CLEtBQUEsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQS9CLGNBQStCLEVBQS9CLElBQStCLEVBQUM7UUFBdEQsSUFBTSxZQUFZLFNBQUE7UUFDbkIsWUFBWSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxzQkFBc0I7SUFDM0IsS0FBdUIsVUFBNEIsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQztRQUEvQyxJQUFNLFFBQVEsU0FBQTtRQUNmLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsS0FBc0IsVUFBK0IsRUFBL0IsS0FBQSxNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFBL0IsY0FBK0IsRUFBL0IsSUFBK0IsRUFBQztRQUFqRCxJQUFNLE9BQU8sU0FBQTtRQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDaEQ7SUFDRCxLQUEyQixVQUErQixFQUEvQixLQUFBLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUEvQixjQUErQixFQUEvQixJQUErQixFQUFDO1FBQXRELElBQU0sWUFBWSxTQUFBO1FBQ25CLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDekIsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDakgsSUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDNUIsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87S0FDVixDQUFDLENBQUM7SUFDSCxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0IsUUFBUSxHQUFHLE9BQU8sQ0FBQztLQUN0QjtJQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUNELFNBQVMsa0JBQWtCO0lBQ3ZCLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLE9BQU87UUFDMUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ1osZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLGdCQUFnQjs7SUFDckIsS0FBdUIsVUFBcUIsRUFBckIsS0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCLEVBQUM7UUFBeEMsSUFBTSxRQUFRLFNBQUE7UUFDZixJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzdELFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN0QyxRQUFRLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxNQUFBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sMENBQUUsSUFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0gsUUFBUSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsTUFBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLElBQUksbUNBQUksRUFBRSxDQUFDLENBQUM7U0FDdkU7S0FDSjtJQUNELElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sRUFBRTtRQUNwQyx3QkFBd0IsRUFBRSxDQUFDO0tBQzlCO0FBQ0wsQ0FBQztBQUNELFNBQVMsd0JBQXdCOzRCQUNsQixNQUFNO1FBQ2IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtZQUMvQixNQUFNLENBQUMsaUJBQWlCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDOztJQU5QLEtBQXFCLFVBQW9CLEVBQXBCLEtBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFwQixjQUFvQixFQUFwQixJQUFvQjtRQUFwQyxJQUFNLE1BQU0sU0FBQTtnQkFBTixNQUFNO0tBT2hCO0FBQ0wsQ0FBQztBQUNELFNBQVMscUJBQXFCLENBQUMsTUFBTTtJQUNqQyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQUNELFNBQVMsd0JBQXdCO0lBQWpDLGlCQThEQztJQTdERyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRCxNQUFNLENBQUMsc0VBQXNFLEVBQUUsVUFBQyxjQUFjO1lBQzFGLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBTyxLQUFLOzs7Ozs0QkFDM0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7aUNBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQWhDLGNBQWdDOzRCQUMxQixXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzRCQUNqRSxXQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFBOzs0QkFBMUMsU0FBMEMsQ0FBQzs7Ozs7aUJBRWxELENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTztLQUNWO0lBQ0QsTUFBTSxDQUFDLHNFQUFzRSxFQUFFLFVBQUMsY0FBYztRQUMxRixjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQU8sTUFBTTs7Ozs7O3dCQUM1QyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTs0QkFDbEcsV0FBTzt5QkFDVjs2QkFDRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUEzQixjQUEyQjt3QkFDckIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3RDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs2QkFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQTFDLGNBQTBDO3dCQUMxQyxXQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUE1QyxTQUE0QyxDQUFDOzs7NkJBQ3RDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUExQyxjQUEwQzt3QkFDakQsV0FBTSxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQTNDLFNBQTJDLENBQUM7Ozs7NkJBRXpDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQTFCLGNBQTBCO3dCQUM3QixzQkFBb0IsSUFBSSxDQUFDO3dCQUN2QixpQkFBZSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDaEQsZ0JBQWMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUMzRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSzs0QkFDcEMsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDbEMsSUFBSSxtQkFBaUIsS0FBSyxJQUFJLEVBQUU7Z0NBQzVCLFlBQVksQ0FBQyxtQkFBaUIsQ0FBQyxDQUFDOzZCQUNuQzs0QkFDRCxtQkFBaUIsR0FBRyxVQUFVLENBQUM7Ozs7NENBQzNCLG1CQUFpQixHQUFHLElBQUksQ0FBQztpREFDckIsQ0FBQSxZQUFZLENBQUMsS0FBSyxJQUFJLGNBQVksS0FBSyxZQUFZLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQSxFQUF6RixjQUF5Rjs0Q0FDekYsV0FBTSxjQUFjLENBQUMsYUFBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFBOzs0Q0FBNUUsU0FBNEUsQ0FBQzs7OzRDQUU3RSxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O2lDQUVyQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNaLENBQUMsQ0FBQyxDQUFDO3dCQUNILE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBTyxLQUFLOzs7Ozt3Q0FDbkMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7d0NBQ2xDLElBQUksbUJBQWlCLEtBQUssSUFBSSxFQUFFOzRDQUM1QixZQUFZLENBQUMsbUJBQWlCLENBQUMsQ0FBQzt5Q0FDbkM7NkNBQ0csQ0FBQSxZQUFZLENBQUMsS0FBSyxJQUFJLGNBQVksS0FBSyxZQUFZLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQSxFQUF6RixjQUF5Rjt3Q0FDekYsV0FBTSxjQUFjLENBQUMsYUFBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFBOzt3Q0FBNUUsU0FBNEUsQ0FBQzs7O3dDQUU3RSxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQVksQ0FBQzs7Ozs7NkJBRXpDLENBQUMsQ0FBQzs7OzZCQUNJLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQWhDLGNBQWdDO3dCQUNqQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNqRSxXQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBMUMsU0FBMEMsQ0FBQzs7Ozs7YUFFbEQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBZSxjQUFjLENBQUMsV0FBVyxFQUFFLE1BQVUsRUFBRSxHQUFXO0lBQXZCLHVCQUFBLEVBQUEsVUFBVTtJQUFFLG9CQUFBLEVBQUEsV0FBVzs7Ozs7O29CQUM5RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxFQUFFO3dCQUNsRCxXQUFPO3FCQUNWO29CQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDOzs7O29CQUVmLFdBQU0sbUJBQW1CLENBQUMsb0JBQW9CLEVBQUU7NEJBQzdELEdBQUcsRUFBRSxXQUFXOzRCQUNoQixNQUFNLFFBQUE7NEJBQ04sR0FBRyxLQUFBO3lCQUNOLENBQUMsRUFBQTs7b0JBSkksUUFBUSxHQUFHLFNBSWY7b0JBQ0YsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0JBRXpDLElBQUksT0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsdUNBQWdDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxvQkFBVSxPQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNoSTs7O29CQUVMLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUN0QztBQUNELFNBQVMsUUFBUTtJQUFqQixpQkFPQztJQU5HLGNBQWMsRUFBRSxDQUFDO0lBQ2pCLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsZUFBZSxDQUFDLGdCQUFnQixFQUFFOzs7d0JBQzlCLFdBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0JBQTlCLFNBQThCLENBQUM7b0JBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDOzs7O1NBQ3RDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLGNBQWM7SUFDbkIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDMUIsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNwRixJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxZQUFZLEtBQUssb0JBQW9CLEVBQUU7WUFDeEUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLG9CQUFvQixHQUFHLFlBQVksQ0FBQztZQUNwQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsdUJBQXVCLENBQUMsSUFBSTs7SUFDakMsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDeEQsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUM3QyxPQUFPO0tBQ1Y7SUFDRCxTQUFTLGdCQUFnQixDQUFDLElBQUk7UUFDMUIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsT0FBTyxnQkFBZ0IsQ0FBQztTQUMzQjtRQUNELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxnQkFBZ0IsQ0FBQztTQUMzQjtRQUNELGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFrQixVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSSxFQUFDO1lBQWxCLElBQU0sR0FBRyxhQUFBO1lBQ1YsSUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEgsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsRSxnQkFBZ0IsSUFBSSw0QkFBb0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sdUJBQVksWUFBWSxlQUFLLGNBQWMsWUFBUyxDQUFDO1NBQ3JJO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLElBQU0sUUFBUSxHQUFHLDhFQUFtRSxhQUFhLENBQUMsZUFBZSxDQUFDLGVBQVksQ0FBQztRQUMvSCxNQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixZQUFZLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUNsQyxjQUFjLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxPQUFPO0tBQ1Y7NEJBQ08sQ0FBQztRQUNMLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs7U0FFekU7UUFDRCxJQUFJLE1BQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUkscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUssb0JBQW9CLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUNuSCxNQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ25DO1FBQ0QsSUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGFBQU0sTUFBQSxJQUFJLENBQUMsZUFBZSxtQ0FBSSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFHLElBQU0sS0FBSyxHQUFHLFVBQUcsTUFBSSxDQUFDLElBQUksRUFBRSxTQUFHLGNBQWMsY0FBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBQzdKLElBQUksTUFBTSxHQUFHLFVBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFBLElBQUksQ0FBQyxhQUFhLG1DQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDckgsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyx5QkFBeUIsMENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFBLElBQUksQ0FBQyxhQUFhLG1DQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFBLElBQUksQ0FBQyxhQUFhLG1DQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JMLE1BQU0sR0FBRyxVQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBRyxZQUFZLFNBQUcsTUFBQSxJQUFJLENBQUMseUJBQXlCLG1DQUFJLEVBQUUsQ0FBRSxDQUFDO1NBQy9HO1FBQ0QsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO1FBQ3RDLElBQU0sWUFBWSxHQUFHLFVBQUMsT0FBWTtZQUFaLHdCQUFBLEVBQUEsWUFBWTtZQUFHLE9BQUEsNkRBQ0csT0FBTyxrRUFDWCxJQUFJLENBQUMsUUFBUSxtQ0FDakQ7UUFIcUMsQ0FHckMsQ0FDQztRQUNELElBQU0sV0FBVyxHQUFHLFVBQUMsT0FBWTtZQUFaLHdCQUFBLEVBQUEsWUFBWTtZQUFHLE9BQUEsbUNBQ3RCLE9BQU8sNEhBRWdDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLDJCQUFlLElBQUksQ0FBQyxRQUFRLDZJQUUvRixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLHlDQUEyQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsMkJBQWUsSUFBSSxDQUFDLFFBQVEsK0dBRTdGLElBQUksQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLDJCQUFlLElBQUksQ0FBQyxRQUFRLDJDQUUvSjtRQVRvQyxDQVNwQyxDQUNDO1FBQ0QsSUFBTSxVQUFVLEdBQUcsc0NBQStCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFTLENBQUM7UUFDbEYsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN04sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFO2dCQUN0RCxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxNQUFLLFdBQVcsRUFBRTtvQkFDcEQsSUFBSSxDQUFDLFNBQVMsSUFBSSxtR0FBcUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBVSxDQUFDO2lCQUNsSTtnQkFDRCxJQUFJLENBQUMsU0FBUyxJQUFJLHNCQUMzQixtQkFBbUIsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsbURBQzNDLEtBQUssY0FBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLDZEQUN6QyxNQUFNLG9CQUNyQyxDQUFDO2FBQ087aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxNQUFLLFdBQVcsRUFBRTtvQkFDcEQsSUFBSSxDQUFDLFNBQVMsSUFBSSxnR0FBa0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBVSxDQUFDO2lCQUMvSDtnQkFDRCxJQUFJLENBQUMsU0FBUyxJQUFJLHNCQUMzQixtQkFBbUIsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsd0RBQzdCLEtBQUssY0FBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLGtFQUN6QyxNQUFNLG9CQUMxQyxDQUFDO2FBQ087U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hGLElBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxLQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRyxDQUFDLENBQUMsTUFBSyxXQUFXLEVBQUU7b0JBQ3BELElBQUksQ0FBQyxTQUFTLElBQUksaUhBQW1HLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQVUsQ0FBQztpQkFDaEo7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsSUFBSSxzREFDRyxLQUFLLDhEQUNMLE1BQU0sb0JBQ3RDLENBQUM7YUFDTztpQkFBTTtnQkFDSCxJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRyxDQUFDLENBQUMsS0FBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUcsQ0FBQyxDQUFDLE1BQUssV0FBVyxFQUFFO29CQUNwRCxJQUFJLENBQUMsU0FBUyxJQUFJLDhIQUFnSCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFVLENBQUM7aUJBQzdKO2dCQUNELElBQUksQ0FBQyxTQUFTLElBQUksZ0VBQ2EsS0FBSyx3RUFDTCxNQUFNLG9CQUNoRCxDQUFDO2FBQ087U0FDSjtRQUNELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4RCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7WUFDdEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxLQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRyxDQUFDLENBQUMsTUFBSyxXQUFXLEVBQUU7b0JBQ3BELElBQUksQ0FBQyxTQUFTLElBQUksK0hBQWlILElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQVUsQ0FBQztpQkFDOUo7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsSUFBSSxvRUFDaUIsS0FBSyw0RUFDTCxNQUFNLG9CQUNwRCxDQUFDO2FBQ087aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxLQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRyxDQUFDLENBQUMsTUFBSyxXQUFXLEVBQUU7b0JBQ3BELElBQUksQ0FBQyxTQUFTLElBQUksOEdBQWdHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQVUsQ0FBQztpQkFDN0k7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsSUFBSSxzQkFDM0IsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLHNFQUM3QixLQUFLLGNBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxnRkFDekMsTUFBTSxvQkFDeEQsQ0FBQzthQUNPO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztJQTVHakQsS0FBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBaEMsQ0FBQztLQTZHUjtBQUNMLENBQUM7QUFDRCxTQUFTLGlCQUFpQjtJQUN0QixLQUFvQixVQUE2QixFQUE3QixLQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxFQUE3QixjQUE2QixFQUE3QixJQUE2QixFQUFDO1FBQTdDLElBQU0sS0FBSyxTQUFBO1FBQ1osS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2xCO0FBQ0wsQ0FBQztBQUNELFNBQVMsZ0JBQWdCLENBQUMsSUFBSTtJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsS0FBbUIsVUFBYyxFQUFkLEtBQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxjQUFjLEVBQWQsSUFBYyxFQUFDO1FBQTdCLElBQU0sSUFBSSxTQUFBO1FBQ1gsSUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLCtDQUFzQyxPQUFPLG1CQUFTLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxZQUFTLENBQUM7S0FDakc7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsU0FBUyxxQkFBcUIsQ0FBQyxJQUFJO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDM0IsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2YsSUFBQSxLQUEyQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBRyxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTLENBQ3ZFLEVBRE0sTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUM1QixDQUFDO0lBQ0ksSUFBQSxLQUEyQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBRyxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTLENBQ3ZFLEVBRE0sTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUM1QixDQUFDO0lBQ0YsSUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDckUsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLGdCQUFnQjs7SUFDckIsdUJBQXVCLEVBQUUsQ0FBQztJQUMxQixNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUM1RSxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ1oseUJBQXlCLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwSSx5QkFBeUIsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRyx5QkFBeUIsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1RyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVztJQUN4RCxJQUFJLE1BQU0sS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUMzQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBakMsQ0FBaUMsQ0FDNUUsQ0FBQztLQUNMO1NBQU07UUFDSCxNQUFNLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBOUIsQ0FBOEIsQ0FDekUsQ0FBQztLQUNMO0lBQ0QsSUFBSSxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUN4RSxNQUFNLENBQUMsYUFBYSxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQ2xFLENBQUM7S0FDTDtTQUFNO1FBQ0gsTUFBTSxDQUFDLGFBQWEsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixDQUMvRCxDQUFDO0tBQ0w7QUFDTCxDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsSUFBSTtJQUMzQyxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDckIsT0FBTztLQUNWO0lBQ0QsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ3JCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBekIsQ0FBeUIsQ0FDMUQsQ0FBQztLQUNMO1NBQU07UUFDSCxNQUFNLENBQUMsYUFBYSxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQXhCLENBQXdCLENBQ3pELENBQUM7S0FDTDtJQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUNwQixNQUFNLENBQUMsOEJBQThCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBakMsQ0FBaUMsQ0FDbkYsQ0FBQztLQUNMO1NBQU07UUFDSCxNQUFNLENBQUMsOEJBQThCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBOUIsQ0FBOEIsQ0FDaEYsQ0FBQztLQUNMO0lBQ0QsSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFoRCxDQUFnRCxDQUNoRyxDQUFDO1FBQ0YsTUFBTSxDQUFDLHFCQUFxQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQzFFLENBQUM7S0FDTDtTQUFNO1FBQ0gsTUFBTSxDQUFDLDRCQUE0QixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsY0FBSSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBRSxFQUEzRixDQUEyRixDQUMzSSxDQUFDO1FBQ0YsTUFBTSxDQUFDLHFCQUFxQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQTlCLENBQThCLENBQ3ZFLENBQUM7S0FDTDtBQUNMLENBQUM7QUFDRCxTQUFTLHVCQUF1Qjs7SUFDNUIsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxLQUF5QixVQUErQixFQUEvQixLQUFBLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUEvQixjQUErQixFQUEvQixJQUErQixFQUFDO1FBQXBELElBQU0sVUFBVSxTQUFBO1FBQ2pCLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0wsQ0FBQztBQUNELFNBQVMseUJBQXlCO0lBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsSUFBSTs7SUFDM0MsSUFBSSxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDM0MsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUF2QixDQUF1QixDQUNwRCxDQUFDO1FBQ0YsTUFBQSxHQUFHLENBQUMsWUFBWSxDQUFDLDBDQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsT0FBTyxFQUF4QyxDQUF3QyxDQUN6RSxDQUFDO1FBQ0YsTUFBQSxHQUFHLENBQUMsZUFBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBeEIsQ0FBd0IsQ0FDckQsQ0FBQztRQUNGLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxFQUExQyxDQUEwQyxDQUMzRSxDQUFDO1FBQ0YsTUFBQSxHQUFHLENBQUMsZUFBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0M7QUFDTCxDQUFDO0FBQ0QsU0FBUyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVk7SUFBdEUsaUJBMkJDOztJQTFCRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLFNBQVMsRUFBRTtRQUNyRyxPQUFPO0tBQ1Y7SUFDRCxJQUFNLFdBQVcsR0FBRztRQUNoQixLQUFLLEVBQUUsZ0NBQWdDO1FBQ3ZDLE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRSxPQUFPLENBQUMsYUFBYTtZQUM3QixJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDaEc7UUFDRCxZQUFZLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNuRCxxQkFBcUIsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZTtLQUMxRCxDQUFDO0lBQ0YsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxXQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLGlCQUFpQixDQUFDLDBDQUEwQyxFQUFFLHVDQUF1QyxDQUFDLENBQUM7SUFDdkcsaUJBQWlCLENBQUMsMkNBQTJDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUN6RyxpQkFBaUIsQ0FBQywyQ0FBMkMsRUFBRSxVQUFPLE9BQU87O29CQUFHLFdBQU0sd0NBQXdDLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsRUFBQTtvQkFBcEYsV0FBQSxTQUFvRixFQUFBOzthQUFBLENBQ25LLENBQUM7SUFDRixJQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUM5QixJQUFNLGdDQUFnQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7O1FBQ3JELElBQU0sd0JBQXdCLEdBQUcsNkJBQTZCLEVBQUUsQ0FBQztRQUNqRSxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDNUQsSUFBSSxrQkFBa0IsS0FBSyxVQUFVLEVBQUU7WUFDbkMsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxXQUFXLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3hGLENBQUM7QUFDRCxTQUFTLDZCQUE2QjtJQUNsQyxPQUFPO1FBQ0gsS0FBSyxFQUFFLGtDQUFrQztRQUN6QyxZQUFZLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNuRCxxQkFBcUIsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZTtLQUMxRCxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQWUsd0NBQXdDLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZOzs7Ozs7d0JBQy9ELFdBQU0sYUFBYSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO3dCQUNoRixJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVM7d0JBQ3ZCLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVTt3QkFDekIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVO3FCQUM1QixDQUFDLEVBQUE7O29CQUpJLGdCQUFnQixHQUFHLFNBSXZCO29CQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO3dCQUMxQixLQUFLLEVBQUUsT0FBTyxDQUFDLFVBQVU7d0JBQ3pCLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVTt3QkFDekIsVUFBVSxFQUFFLE1BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUU7d0JBQ2pELFNBQVMsRUFBRSxNQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO3dCQUNoRCxRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxRQUFRLEVBQUUsTUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRTt3QkFDdEQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSTt3QkFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTTt3QkFDckMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTzt3QkFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVTt3QkFDMUMsSUFBSSxFQUFFOzRCQUNGLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLOzRCQUMvQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSzt5QkFDbEM7d0JBQ0Qsa0JBQWtCLEVBQUUsZ0JBQWdCO3dCQUNwQyxjQUFjLEVBQUUsUUFBUTtxQkFDM0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0MsV0FBTSxlQUFlLEVBQUUsRUFBQTs7b0JBQTVCLElBQUksQ0FBQyxDQUFBLFNBQXVCLENBQUEsRUFBRTt3QkFDMUIsV0FBTztnQ0FDSCxNQUFNLEVBQUUsMEJBQTBCOzZCQUNyQyxFQUFDO3FCQUNMO29CQUNELHFCQUFxQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7b0JBRXBGLFdBQU0sWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFBOztvQkFBdkMsS0FBSyxHQUFHLFNBQStCO29CQUN2QixXQUFNLGFBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUE7O29CQUF6RCxhQUFhLEdBQUcsU0FBeUM7b0JBQ3pELFdBQU0sWUFBWSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBQTs7b0JBQTFFLElBQUksQ0FBQyxDQUFDLFNBQW9FLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQzVFLFdBQU87Z0NBQ0gsTUFBTSxFQUFFLE1BQU07NkJBQ2pCLEVBQUM7cUJBQ0w7eUJBQ0csQ0FBQyxhQUFhLEVBQWQsY0FBYztvQkFDZCxXQUFNLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRTs0QkFDbEQsZ0JBQWdCLGtCQUFBO3lCQUNuQixDQUFDLEVBQUE7O29CQUZGLFNBRUUsQ0FBQztvQkFDSCxXQUFPOzRCQUNILE1BQU0sRUFBRSxNQUFNO3lCQUNqQixFQUFDO3dCQUVvQixXQUFNLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRTt3QkFDaEYsZ0JBQWdCLGtCQUFBO3FCQUNuQixDQUFDLEVBQUE7O29CQUZJLGlCQUFpQixHQUFHLFNBRXhCO29CQUNGLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt3QkFDcEIsV0FBTztnQ0FDSCxNQUFNLEVBQUUsTUFBTTs2QkFDakIsRUFBQztxQkFDTDtvQkFDRCxXQUFPOzRCQUNILE1BQU0sRUFBRSxTQUFTOzRCQUNqQixXQUFXLEVBQUUsaUJBQWlCO3lCQUNqQyxFQUFDOzs7b0JBRUYsSUFBSSxPQUFLLFlBQVksS0FBSyxFQUFFO3dCQUN4QixzQkFBc0IsQ0FBQyxJQUFJLEtBQUssQ0FBQywyREFBb0QscUJBQXFCLENBQUMsUUFBUSxFQUFFLHNCQUFZLE9BQUssQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3RKO29CQUNELFdBQU87NEJBQ0gsTUFBTSxFQUFFLE1BQU07eUJBQ2pCLEVBQUM7Ozs7O0NBRVQ7QUFDRCxTQUFlLHVDQUF1QyxDQUFDLE9BQU87Ozs7OztvQkFDMUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLHVCQUN0QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FDMUIsUUFBUSxFQUFFLE1BQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxFQUN0QyxRQUFRLEVBQUUsTUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLEVBQ3RDLElBQUksRUFBRSxNQUFBLE9BQU8sQ0FBQyxJQUFJLG1DQUFJLEVBQUUsRUFDeEIsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLFVBQVUsbUNBQUksRUFBRSxFQUNoQyxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxFQUFFLEVBQzNCLE9BQU8sRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsSUFDaEMsQ0FBQyxDQUFDO29CQUNKLFdBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0JBQTlCLFNBQThCLENBQUM7b0JBQy9CLFdBQU8sNkJBQTZCLEVBQUUsRUFBQzs7OztDQUMxQztBQUNELFNBQWUsd0NBQXdDLENBQUMsT0FBTzs7Ozs7b0JBQzNELEtBQUssQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUM7d0JBQzNDLE9BQU8sRUFBRSxHQUFHO3dCQUNaLGtCQUFrQixFQUFFLEdBQUc7d0JBQ3ZCLGVBQWUsRUFBRSxPQUFPLENBQUMsRUFBRTtxQkFDOUIsQ0FBQyxDQUFDLENBQUM7b0JBQ0osV0FBTSxzQkFBc0IsRUFBRSxFQUFBOztvQkFBOUIsU0FBOEIsQ0FBQztvQkFDL0IsV0FBTyw2QkFBNkIsRUFBRSxFQUFDOzs7O0NBQzFDO0FBQ0QsU0FBZSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWTs7Ozs7Ozs7b0JBQzdDLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7b0JBQ25FLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUMzRyxXQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDdEMsV0FBTztxQkFDVjtvQkFDSyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUMsNENBQTRDLENBQUM7b0JBQ2hILE9BQU8sR0FBRzt3QkFDVixNQUFNLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsYUFBYSxtQ0FBSSxNQUFNO3FCQUM1QyxDQUFDO3lCQUNFLENBQUEscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUssa0JBQWtCLElBQUkscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUssbUJBQW1CLENBQUEsRUFBbkgsY0FBbUg7b0JBQzdGLFdBQU0sa0JBQWtCLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQTs7b0JBQTFFLGFBQWEsR0FBRyxTQUEwRDtvQkFDaEYsSUFBSSxhQUFhLEVBQUU7d0JBQ2YsT0FBTyx5QkFDQSxPQUFPLEtBQ1YsYUFBYSxlQUFBLEdBQ2hCLENBQUM7cUJBQ0w7OztvQkFFQyw4QkFBOEIsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN0RCxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRTt3QkFDdkIsTUFBTSxFQUFFLE1BQUEsUUFBUSxDQUFDLGFBQWEsbUNBQUksTUFBTTtxQkFDM0MsQ0FBQyxDQUFDO29CQUNHLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzdCLEtBQUssR0FBRzt3QkFDVixJQUFJLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLHlDQUF5Qzs0QkFDckQsYUFBYSxFQUFFLGFBQWE7NEJBQzVCLFFBQVEsRUFBRSxNQUFNOzRCQUNoQixlQUFlLEVBQUU7Z0NBQ2IsS0FBSyxFQUFFLE1BQU07NkJBQ2hCO3lCQUNKO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxLQUFLLEVBQUUsU0FBUzs0QkFDaEIsU0FBUyxFQUFFLFNBQVM7eUJBQ3ZCO3FCQUNKLENBQUM7b0JBQ0ksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO3dCQUNsQyxLQUFLLE9BQUE7d0JBQ0wsY0FBYyxFQUFFLElBQUk7cUJBQ3ZCLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7d0JBQ3JCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBQyxRQUFRLGdCQUFHLE9BQUEsUUFBUSxDQUFDLFdBQVcsR0FBRyxNQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssMENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQUEsRUFBQSxDQUNoRixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO29CQUNHLGFBQWEsR0FBRzt3QkFDbEIsS0FBSyxPQUFBO3dCQUNMLFFBQVEsVUFBQTt3QkFDUixNQUFNLFFBQUE7d0JBQ04sc0JBQXNCLEVBQUUsOEJBQThCO3dCQUN0RCxvQkFBb0IsRUFBRSx1QkFBdUI7d0JBQzdDLGNBQWMsRUFBRSxVQUFPLEtBQUs7O3dDQUFHLFdBQU0sbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUE7d0NBQWhDLFdBQUEsU0FBZ0MsRUFBQTs7aUNBQUE7cUJBQ2xFLENBQUM7b0JBQ0ksNEJBQTRCLEdBQUcsVUFBTyxLQUFLOzs7O29DQUM3QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTt3Q0FDeEIsV0FBTztxQ0FDVjtvQ0FDRCxXQUFNLG9CQUFvQixDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUE7O29DQUE5RCxTQUE4RCxDQUFDOzs7O3lCQUNsRSxDQUFDO29CQUNGLGdCQUFnQixFQUFFLENBQUM7b0JBQ25CLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ2hFLGVBQWUsQ0FBQyw2QkFBNkIsRUFBRSxVQUFPLE9BQU87O29DQUFHLFdBQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUE7b0NBQW5GLFdBQUEsU0FBbUYsRUFBQTs7NkJBQUEsQ0FDbEosQ0FBQztvQkFDRixlQUFlLENBQUMsZUFBZSxFQUFFLFVBQU8sT0FBTzs7OztvQ0FDM0MsTUFBTSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29DQUN0QyxXQUFNLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUE7O29DQUE1RCxTQUE0RCxDQUFDOzs7O3lCQUNoRSxDQUFDLENBQUM7b0JBQ0gsTUFBQSxHQUFHLENBQUMsU0FBUyxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO29CQUN4RSxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztvQkFDL0UsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDLENBQUM7Ozs7O0NBQ3BGO0FBQ0QsU0FBZSxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFlBQVk7Ozs7OztvQkFDMUQsS0FBSyxHQUFlLGFBQWEsTUFBNUIsRUFBRyxNQUFNLEdBQU0sYUFBYSxPQUFuQixDQUFvQjtvQkFDMUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzt5QkFDbkMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFoQyxjQUFnQzs7OztvQkFFYixXQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUE7O29CQUF4QyxNQUFNLEdBQUcsU0FBK0I7b0JBQzlDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDZCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQy9CLFdBQU87cUJBQ1Y7b0JBQ0QsS0FBQSxDQUFBLEtBQUEsS0FBSyxDQUFBLENBQUMsUUFBUSxDQUFBO29CQUFDLEtBQUEsc0JBQXNCLENBQUE7b0JBQUMsV0FBTSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFBOztvQkFBdEgsY0FBZSxrQkFBdUIsU0FBZ0YsRUFBQyxFQUFDLENBQUM7b0JBQ3pILHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7b0JBRS9HLElBQUksT0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsaUVBQTBELHFCQUFxQixDQUFDLFFBQVEsRUFBRSxxQkFBVyxPQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMzSjtvQkFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDbkMsV0FBTzs7b0JBR2YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7Q0FDeEM7QUFDRCxTQUFlLGtCQUFrQixDQUFDLE1BQU07Ozs7O3dCQUNuQixXQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsMkJBQW9CLE1BQU0sb0JBQWlCLENBQUMsRUFBQTs7b0JBQTFJLFFBQVEsR0FBRyxTQUErSDtvQkFDaEosSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDekIsV0FBTyxFQUFFLEVBQUM7cUJBQ2I7b0JBQ0QsV0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUM7Ozs7Q0FDMUI7QUFDRCxTQUFTLGdCQUFnQixDQUFDLEtBQUs7SUFDM0IsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBcEMsQ0FBb0MsQ0FDbkUsQ0FBQztJQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFDRCxTQUFlLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxhQUFhLEVBQUUsWUFBWTs7Ozs7Ozs7b0JBQ3ZFLHNCQUFzQixHQUFlLGFBQWEsdUJBQTVCLEVBQUcsTUFBTSxHQUFNLGFBQWEsT0FBbkIsQ0FBb0I7b0JBQzNELE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLE1BQU0sRUFBRSxDQUFDO29CQUM3QixnQkFBZ0IsR0FBRzs7Ozs7b0NBQ2YsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0NBQzNCLFVBQVUsR0FBRyxNQUFNLEtBQUssa0JBQWtCLElBQUksTUFBTSxLQUFLLG1CQUFtQixJQUFJLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLGlCQUFpQixJQUFJLE1BQU0sS0FBSyxhQUFhLENBQUM7eUNBQ3JLLFVBQVUsRUFBVixjQUFVO29DQUNILFdBQU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDLEVBQUE7d0NBQXBFLFdBQU8sU0FBNkQsRUFBQzt3Q0FFOUQsV0FBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFBO3dDQUFwRixXQUFPLFNBQTZFLEVBQUM7Ozt5QkFFNUYsQ0FBQztvQkFDYSxXQUFNLGdCQUFnQixFQUFFLEVBQUE7O29CQUFqQyxNQUFNLEdBQUcsU0FBd0I7b0JBQ3ZDLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyx5QkFBeUIsRUFBRTt3QkFDM0UsY0FBYyxFQUFFLENBQUM7d0JBQ2pCLFdBQU87cUJBQ1Y7eUJBQ0csQ0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQSxFQUFwRSxjQUFvRTtvQkFDOUMsV0FBTSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBcEYsYUFBYSxHQUFHLFNBQW9FO29CQUMxRixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRTt3QkFDbkIsV0FBTztxQkFDVjtvQkFDZ0IsV0FBTSxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUFyQyxRQUFRLEdBQUcsU0FBMEI7b0JBQzNDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7d0JBQzFELE1BQU0sRUFBRSxlQUFlO3dCQUN2QixXQUFXLEVBQUUsUUFBUTt3QkFDckIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxRQUFRO3FCQUNuQyxDQUFDLENBQUM7Ozs7OztDQUVWO0FBQ0QsU0FBZSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsUUFBUTs7Ozs7O29CQUM5QyxJQUFJLEdBQUc7d0JBQ1QsYUFBYSxFQUFFLElBQUk7d0JBQ25CLFlBQVksRUFBRSxPQUFPO3dCQUNyQixNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUk7d0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSzt3QkFDdkIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLO3FCQUMxQixDQUFDO29CQUNJLE9BQU8sR0FBRzt3QkFDWixNQUFNLEVBQUUsTUFBTTt3QkFDZCxPQUFPLEVBQUU7NEJBQ0wsY0FBYyxFQUFFLGtCQUFrQjt5QkFDckM7d0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO3FCQUM3QixDQUFDO29CQUNlLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE5RyxRQUFRLEdBQUcsU0FBbUc7eUJBQ2hILENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBWixjQUFZO29CQUNDLFdBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBNUIsU0FBTyxTQUFxQjtvQkFDbEMsYUFBYSxDQUFDLE1BQUksQ0FBQyxDQUFDO29CQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUF1QyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsc0JBQVksTUFBSSxDQUFFLENBQUMsQ0FBQzt3QkFFbEcsV0FBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUE1QixJQUFJLEdBQUcsU0FBcUI7b0JBQ2xDLFdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBQzs7OztDQUN4QjtBQUNELFNBQVMsaUJBQWlCLENBQUMsR0FBRzs7SUFDMUIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDO0lBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsTUFBQSxHQUFHLENBQUMsbUJBQW1CLENBQUMsMENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsbUJBQW1CLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBQ0QsU0FBUyxjQUFjO0lBQ25CLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsbUJBQW1CLEVBQUUsQ0FBQztJQUN0QixhQUFhLENBQUMsYUFBYSxDQUFDLHNHQUFzRyxDQUFDLENBQUMsQ0FBQztJQUNySSxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBQ0QsU0FBZSxtQkFBbUIsQ0FBQyxLQUFLOzs7Ozs7O29CQUM5QixJQUFJLEdBQUc7d0JBQ1QsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUU7d0JBQ3BDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTt3QkFDN0MsS0FBSyxPQUFBO3dCQUNMLFNBQVMsRUFBRSxVQUFHLE1BQUEsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxnQkFBZ0IsbUNBQUksRUFBRSwwQkFBZ0IsTUFBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLE9BQU8sbUNBQUksRUFBRSw2QkFBMEI7cUJBQzlILENBQUM7b0JBQ0ksT0FBTyxHQUFHO3dCQUNaLE1BQU0sRUFBRSxNQUFNO3dCQUNkLE9BQU8sRUFBRTs0QkFDTCxjQUFjLEVBQUUsa0JBQWtCO3lCQUNyQzt3QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7cUJBQzdCLENBQUM7b0JBQ2UsV0FBTSxLQUFLLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBNUgsUUFBUSxHQUFHLFNBQWlIO29CQUNuSCxXQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQTlCLE1BQU0sR0FBRyxTQUFxQjtvQkFDcEMsV0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQzs7OztDQUN0QztBQUNELFNBQWUseUJBQXlCLENBQUMsS0FBSyxFQUFFLFlBQVk7Ozs7Ozs7b0JBQ2xELElBQUksR0FBRzt3QkFDVCxTQUFTLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRTt3QkFDcEMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO3dCQUM3QyxLQUFLLE9BQUE7d0JBQ0wsU0FBUyxFQUFFLFVBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLGdCQUFnQixtQ0FBSSxFQUFFLDBCQUFnQixNQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUsT0FBTyxtQ0FBSSxFQUFFLDZCQUEwQjtxQkFDOUgsQ0FBQztvQkFDSSxPQUFPLEdBQUc7d0JBQ1osTUFBTSxFQUFFLE1BQU07d0JBQ2QsT0FBTyxFQUFFOzRCQUNMLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ3JDO3dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztxQkFDN0IsQ0FBQztvQkFDZSxXQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUE1SCxRQUFRLEdBQUcsU0FBaUg7b0JBQ25ILFdBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBOUIsTUFBTSxHQUFHLFNBQXFCO29CQUM3QixLQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUE7OzZCQUNYLFNBQVMsQ0FBQyxDQUFWLGNBQVM7NkJBVVQsaUJBQWlCLENBQUMsQ0FBbEIsY0FBaUI7NkJBR2pCLFNBQVMsQ0FBQyxDQUFWLGNBQVM7Ozt3QkFaSixXQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUExRSxJQUFJLENBQUMsQ0FBQyxTQUFvRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUM1RSxjQUFNO3FCQUNUO29CQUNELFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTt3QkFDMUMsTUFBTSxFQUFFLGVBQWU7d0JBQ3ZCLFdBQVcsRUFBRSxRQUFRO3dCQUNyQixhQUFhLEVBQUUsTUFBTSxDQUFDLFFBQVE7cUJBQ2pDLENBQUMsQ0FBQztvQkFDSCxjQUFNOztvQkFFTixpQkFBaUIsQ0FBQyxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNyQyxjQUFNOztvQkFFTixZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7d0JBQzFDLE1BQU0sRUFBRSxXQUFXO3dCQUNuQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87cUJBQzFCLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDbkMsYUFBYSxDQUFDLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3JDLGNBQU07Ozs7O0NBR2pCO0FBQ0QsU0FBUyxtQkFBbUI7SUFDeEIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsUUFBUTtRQUM5QixJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDeEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUNyRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsbUJBQW1CO0lBQ3hCLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFFBQVE7UUFDOUIsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDckQ7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLGlCQUFpQjs7SUFDdEIsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUI7O0lBQ3RCLE1BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLE1BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDckQsQ0FBQztBQUNELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzVCLElBQU0sZUFBZSxHQUFHLDBCQUEwQixDQUFDO0FBQ25ELElBQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFDO0FBQzNDLFNBQVMsZ0JBQWdCOztJQUNyQixNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN0RSxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ1osa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxRQUFRLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxTQUFTLElBQUksMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQzVKLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQWUsaUJBQWlCLENBQUMsVUFBVTs7UUFDdkMsU0FBUyxJQUFJLENBQUMsU0FBUztZQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFCLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDekMsT0FBTyxFQUFFLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0gsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7b0JBQ3hLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7Ozs7b0JBQ0ssUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsV0FBbUMsRUFBVix5QkFBVSxFQUFWLHdCQUFVLEVBQVYsSUFBVSxFQUFDO3dCQUF6QixVQUFVO3dCQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxXQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUE7O29CQUEzQixTQUEyQixDQUFDO29CQUM1QixpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDckMsV0FBbUMsRUFBVix5QkFBVSxFQUFWLHdCQUFVLEVBQVYsSUFBVSxFQUFDO3dCQUF6QixVQUFVO3dCQUNqQixpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM1Qzs7Ozs7Q0FDSjtBQUNELGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLFNBQWUsZ0JBQWdCOzs7Ozs7O29CQUVOLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRywyREFBb0QscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUUsRUFBRTs0QkFDeEwsT0FBTyxFQUFFO2dDQUNMLGNBQWMsRUFBRSxrQkFBa0I7NkJBQ3JDO3lCQUNKLENBQUMsRUFBQTs7b0JBSkksUUFBUSxHQUFHLFNBSWY7b0JBQ2UsV0FBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUFoQyxRQUFRLEdBQUcsU0FBcUI7eUJBQ2xDLENBQUEsUUFBUSxDQUFDLGdCQUFnQixLQUFLLEVBQUUsSUFBSSwyQkFBMkIsRUFBRSxDQUFBLEVBQWpFLGNBQWlFO29CQUNqRSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdDLFdBQU0saUJBQWlCLENBQUM7NEJBQ3BCLG1EQUE0QyxRQUFRLENBQUMsUUFBUSwwQkFBZ0IsUUFBUSxDQUFDLGdCQUFnQixnSUFBc0gscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFFO3lCQUN0USxDQUFDLEVBQUE7O29CQUZGLFNBRUUsQ0FBQzs7Ozs7b0JBR1AsSUFBSSxPQUFLLFlBQVksS0FBSyxFQUFFO3dCQUN4QixzQkFBc0IsQ0FBQyxJQUFJLEtBQUssQ0FBQywwRUFBbUUsUUFBUSxDQUFDLFFBQVEsNEJBQWtCLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHNCQUFZLE9BQUssQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ2pNO29CQUNELFdBQU8sS0FBSyxFQUFDO3dCQUVqQixXQUFPLElBQUksRUFBQzs7OztDQUNmO0FBQ0QsU0FBZSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsWUFBWTs7Ozs7O29CQUM1QyxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ2hCLFdBQU87cUJBQ1Y7b0JBQ0QsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDZixLQUFBLENBQUMsMkJBQTJCLEVBQUUsQ0FBQTs0QkFBOUIsY0FBOEI7b0JBQUssV0FBTSxnQkFBZ0IsRUFBRSxFQUFBOztvQkFBekIsS0FBQSxDQUFDLENBQUEsU0FBd0IsQ0FBQSxDQUFBOzs7b0JBQS9ELFFBQWlFO3dCQUM3RCxXQUFPO3FCQUNWO3lCQUNHLENBQUEsZ0JBQWdCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxHQUFHLENBQUMsQ0FBQSxFQUF6RCxjQUF5RDtvQkFDekQsV0FBTSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBQTs7b0JBQXBDLFNBQW9DLENBQUM7b0JBQ3JDLGdCQUFnQixFQUFFLENBQUM7Ozs7OztDQUUxQjtBQUNELFNBQVMsZ0JBQWdCLENBQUMsWUFBWTtJQUNsQyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLEtBQUssRUFBRTtZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDSyxXQUFXOzs7O2dDQUNOLFdBQU0saUJBQWlCLEVBQUUsRUFBQTtnQ0FBaEMsV0FBTyxTQUF5QixFQUFDOzs7O1NBQ3BDO1FBQ0QsU0FBUyxZQUFFLElBQUksRUFBRSxPQUFPO1lBQ3BCLHdCQUF3QixFQUFFLENBQUM7WUFDM0IsdUNBQXVDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsT0FBTztZQUNILE9BQU8sbUJBQW1CLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2pELGFBQWEsQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN4RCxhQUFhLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUNELFNBQVMsYUFBYSxDQUFDLE9BQU87SUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7UUFDbkMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLEVBQUU7WUFDdEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBZSxpQkFBaUI7Ozs7Ozs7b0JBQ3RCLGVBQWUsR0FBRzt3QkFDcEIsTUFBTSxFQUFFLHFCQUFxQixDQUFDLFFBQVEsRUFBRTt3QkFDeEMsT0FBTyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxFQUFFOzRCQUNOLE1BQU0sRUFBRSxFQUFFOzRCQUNWLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFOzRCQUMvQyxjQUFjLEVBQUUsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDNUQsY0FBYyxFQUFFLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLFNBQVMsRUFBRSxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQzdGLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTs0QkFDakMsVUFBVSxFQUFFLFlBQVksRUFBRTs0QkFDMUIsY0FBYyxFQUFFLGdCQUFnQixFQUFFOzRCQUNsQyxTQUFTLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDdkQ7cUJBQ0osQ0FBQztvQkFDSSxJQUFJLEdBQUc7d0JBQ1QsV0FBVyxFQUFFLGVBQWU7d0JBQzVCLFNBQVMsRUFBRSxhQUFhLENBQUMsU0FBUyxFQUFFO3dCQUNwQyxnQkFBZ0Isa0JBQUE7cUJBQ25CLENBQUM7b0JBQ2UsV0FBTSxLQUFLLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLHFCQUFxQixFQUFFOzRCQUN2SCxNQUFNLEVBQUUsTUFBTTs0QkFDZCxPQUFPLEVBQUU7Z0NBQ0wsY0FBYyxFQUFFLGtCQUFrQjs2QkFDckM7NEJBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO3lCQUM3QixDQUFDLEVBQUE7O29CQU5JLFFBQVEsR0FBRyxTQU1mO29CQUNhLFdBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBOUIsTUFBTSxHQUFHLFNBQXFCO29CQUNwQyxXQUFPLE1BQU0sQ0FBQyxFQUFFLEVBQUM7Ozs7Q0FDcEI7QUFDRCxTQUFTLHFCQUFxQjtJQUNsQixJQUFBLFNBQVMsR0FBMkYsZ0JBQWdCLFVBQTNHLEVBQUcsUUFBUSxHQUFnRixnQkFBZ0IsU0FBaEcsRUFBRyxRQUFRLEdBQXFFLGdCQUFnQixTQUFyRixFQUFHLFFBQVEsR0FBMEQsZ0JBQWdCLFNBQTFFLEVBQUcsSUFBSSxHQUFtRCxnQkFBZ0IsS0FBbkUsRUFBRyxLQUFLLEdBQTJDLGdCQUFnQixNQUEzRCxFQUFHLE1BQU0sR0FBa0MsZ0JBQWdCLE9BQWxELEVBQUcsT0FBTyxHQUF3QixnQkFBZ0IsUUFBeEMsRUFBRyxLQUFLLEdBQWdCLGdCQUFnQixNQUFoQyxFQUFHLEtBQUssR0FBUSxnQkFBZ0IsTUFBeEIsQ0FBeUI7SUFDN0gsT0FBTztRQUNILFVBQVUsRUFBRSxTQUFTLEVBQUU7UUFDdkIsU0FBUyxFQUFFLFFBQVEsRUFBRTtRQUNyQixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxRQUFRLEVBQUU7UUFDckIsU0FBUyxFQUFFLFFBQVEsRUFBRTtRQUNyQixJQUFJLEVBQUUsSUFBSSxFQUFFO1FBQ1osS0FBSyxFQUFFLEtBQUssRUFBRTtRQUNkLFFBQVEsRUFBRSxNQUFNLEVBQUU7UUFDbEIsT0FBTyxFQUFFLE9BQU8sRUFBRTtRQUNsQixLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQ2QsS0FBSyxFQUFFLEtBQUssRUFBRTtLQUNqQixDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsWUFBWTs7SUFDakIsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLEtBQW1CLFVBQXNCLEVBQXRCLEtBQUEsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFDO1FBQXJDLElBQU0sSUFBSSxTQUFBO1FBQ1gsSUFBTSxRQUFRLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsYUFBTSxJQUFJLENBQUMsZUFBZSxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRixjQUFjLEVBQUUsTUFBTTtTQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUscUJBQXFCLEtBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM3RCxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3RHO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4QjtJQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUscUJBQXFCLENBQUEsRUFBRTtRQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMxRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxTQUFTLGdCQUFnQjtJQUNyQixPQUFPO1FBQ0gsQ0FBQyxFQUFFLENBQUM7O1lBQ0EsSUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xCLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTztnQkFDSCxTQUFTLEVBQUUsZUFBZSxDQUFDLGVBQWU7Z0JBQzFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQyxZQUFZLEVBQUUsTUFBQSxNQUFBLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQywwQ0FBRSxLQUFLLG1DQUFJLEVBQUU7YUFDdEYsQ0FBQztRQUNOLENBQUMsQ0FBQyxFQUFFO0tBQ1AsQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLHdCQUF3QixDQUFDLElBQVc7O0lBQVgscUJBQUEsRUFBQSxXQUFXO0lBQ3pDLElBQU0sUUFBUSxHQUFHO1FBQ2IsaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4QiwwQkFBMEI7S0FDN0IsQ0FBQztJQUNGLEtBQXNCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFDO1FBQTFCLElBQU0sT0FBTyxpQkFBQTtRQUNkLElBQUksSUFBSSxFQUFFO1lBQ04sTUFBQSxHQUFHLENBQUMsT0FBTyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNILE1BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0o7SUFDRCxJQUFNLHNCQUFzQixHQUFHO1FBQzNCLDBCQUEwQjtRQUMxQixpQ0FBaUM7UUFDakMsbUNBQW1DO0tBQ3RDLENBQUM7SUFDRixLQUF3QixVQUFzQixFQUF0QixpREFBc0IsRUFBdEIsb0NBQXNCLEVBQXRCLElBQXNCLEVBQUM7UUFBMUMsSUFBTSxTQUFTLCtCQUFBO1FBQ2hCLElBQUksSUFBSSxFQUFFO1lBQ04sTUFBQSxHQUFHLENBQUMsU0FBUyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNILE1BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO0tBQ0o7QUFDTCxDQUFDO0FBQ0QsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsU0FBUyx1Q0FBdUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVk7SUFBNUUsaUJBcUVDO0lBcEVHLGtCQUFrQixFQUFFLENBQUM7SUFDckIsSUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7SUFDeEMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLFVBQU8sT0FBTzs7Ozs7O29CQUMvQyxJQUFJLGtCQUFrQixLQUFLLFlBQVksRUFBRTt3QkFDckMsV0FBTztxQkFDVjs7OztvQkFFRyxXQUFNLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFBOztvQkFBbkUsU0FBbUUsQ0FBQzs7OztvQkFFcEUsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsdURBQXVELEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7b0JBR25ILFdBQU0sZ0NBQWdDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUE7O29CQUFuRSxTQUFtRSxDQUFDOzs7O29CQUVwRSxzQkFBc0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyx1REFBdUQsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O29CQUVwSCxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7O29CQUVMLFdBQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztvQkFBaEQsT0FBTyxHQUFHLFNBQXNDLENBQUM7Ozs7b0JBRWpELHNCQUFzQixDQUFDLElBQUksS0FBSyxDQUFDLHNDQUFzQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7eUJBRW5HLENBQUEsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxNQUFLLFdBQVcsQ0FBQSxFQUEvQixlQUErQjtvQkFDZCxXQUFNLFdBQVcsRUFBRSxFQUFBOztvQkFBOUIsUUFBUSxHQUFHLFNBQW1CO29CQUNwQyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7d0JBQ25CLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNyRDt5QkFBTTt3QkFDRyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNwRixTQUFTLEdBQUcsTUFBQSxNQUFBLFFBQVEsQ0FBQyxJQUFJLDBDQUFFLEtBQUssbUNBQUksSUFBSSxDQUFDO3dCQUN6QyxTQUFTLEdBQUcsTUFBQSxNQUFBLFFBQVEsQ0FBQyxJQUFJLDBDQUFFLEtBQUssbUNBQUksSUFBSSxDQUFDO3dCQUMvQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUMzRTtvQkFDSyxXQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUExRSxJQUFJLENBQUMsQ0FBQyxTQUFvRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUM1RSxXQUFPO3FCQUNWO29CQUNLLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4RSxZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNsRCxNQUFNLEVBQUUsZUFBZTt3QkFDdkIsV0FBVyxFQUFFLFFBQVE7d0JBQ3JCLGFBQWEsZUFBQTtxQkFDaEIsQ0FBQyxDQUFDOzs7b0JBQ0EsSUFBSSxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBSyxxQkFBcUIsRUFBRTt3QkFDNUQsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7NEJBQ2xELE1BQU0sRUFBRSxXQUFXOzRCQUNuQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO3lCQUMxQyxDQUFDLENBQUM7d0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7NEJBQ3RCLEtBQUssRUFBRSxhQUFhOzRCQUNwQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO3lCQUMxQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDMUI7eUJBQU07d0JBQ0gsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7NEJBQ2xELE1BQU0sRUFBRSxXQUFXOzRCQUNuQixPQUFPLEVBQUUsdUJBQXVCO3lCQUNuQyxDQUFDLENBQUM7d0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7NEJBQ3RCLEtBQUssRUFBRSxhQUFhOzRCQUNwQixPQUFPLEVBQUUsdUJBQXVCO3lCQUNuQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDMUI7Ozs7O1NBQ0osQ0FBQyxDQUFDO0lBQ0gsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDL0IsUUFBUSxFQUFFLElBQUk7S0FDakIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQWUsa0JBQWtCLENBQUMsT0FBTzs7Ozs7d0JBQ3BCLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyx1QkFBdUIsRUFBRTt3QkFDekgsTUFBTSxFQUFFLE1BQU07d0JBQ2QsT0FBTyxFQUFFOzRCQUNMLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ3JDO3dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOzRCQUNqQixPQUFPLFNBQUE7NEJBQ1AsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUU7NEJBQ3BDLGdCQUFnQixrQkFBQTt5QkFDbkIsQ0FBQztxQkFDTCxDQUFDLEVBQUE7O29CQVZJLFFBQVEsR0FBRyxTQVVmO29CQUNGLFdBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDOzs7O0NBQzFCO0FBQ0QsU0FBZSxnQ0FBZ0MsQ0FBQyxhQUFhLEVBQUUsV0FBVzs7Ozs7d0JBQ3JELFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyw0QkFBNEIsRUFBRTt3QkFDOUgsTUFBTSxFQUFFLE9BQU87d0JBQ2YsT0FBTyxFQUFFOzRCQUNMLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ3JDO3dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOzRCQUNqQixTQUFTLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRTs0QkFDcEMsZ0JBQWdCLGtCQUFBOzRCQUNoQixhQUFhLGVBQUE7NEJBQ2IsV0FBVyxhQUFBO3lCQUNkLENBQUM7cUJBQ0wsQ0FBQyxFQUFBOztvQkFYSSxRQUFRLEdBQUcsU0FXZjtvQkFDRixXQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQzs7OztDQUMxQjtBQUNELFNBQVMsZ0JBQWdCOztJQUNyQixNQUFBLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25FLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsRUFBdEMsQ0FBc0MsQ0FDN0UsQ0FBQztJQUNGLE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBakMsQ0FBaUMsQ0FDcEUsQ0FBQztJQUNGLE1BQUEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMzRCxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDeEQsTUFBQSxHQUFHLENBQUMsYUFBYSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsTUFBQSxHQUFHLENBQUMsYUFBYSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxNQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVELE1BQUEsR0FBRyxDQUFDLGFBQWEsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFDRCxTQUFTLG1CQUFtQjtJQUN4QixLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUNELFNBQVMsa0JBQWtCLENBQUMsT0FBTzs7SUFDL0IsSUFBSSxPQUFPLEVBQUU7UUFDVCxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQXZCLENBQXVCLENBQ3BELENBQUM7UUFDRixNQUFBLEdBQUcsQ0FBQyxZQUFZLENBQUMsMENBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLEVBQXhDLENBQXdDLENBQ3pFLENBQUM7UUFDRixNQUFBLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE1BQUEsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEU7U0FBTTtRQUNILEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBeEIsQ0FBd0IsQ0FDckQsQ0FBQztRQUNGLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxFQUExQyxDQUEwQyxDQUMzRSxDQUFDO1FBQ0YsTUFBQSxHQUFHLENBQUMsMEJBQTBCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxNQUFBLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQztBQUNELFNBQWUsa0NBQWtDOzs7O3dCQUM3QyxXQUFNLGdCQUFnQixFQUFFLEVBQUE7O29CQUF4QixTQUF3QixDQUFDOzs7OztDQUM1QjtBQUNELFNBQVMsMkJBQTJCO0lBQ2hDLElBQU0sbUJBQW1CLEdBQUc7UUFDeEIsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO0tBQ1IsQ0FBQztJQUNGLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3JFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxJQUFJLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLEtBQUssUUFBUSxFQUFFO1FBQ3hELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixhQUFhLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztZQUNwRyxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUNyRCxJQUFJLFlBQVksRUFBRTtnQkFDZCxZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzthQUMvQjtTQUNKO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO2dCQUM3QixhQUFhLEVBQUUsTUFBTTtnQkFDckIsY0FBYyxFQUFFLEtBQUs7YUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDUDtRQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxTQUFlLG9CQUFvQjs7Ozs7d0JBQy9CLFdBQU0sZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBQTs7b0JBQXpDLFNBQXlDLENBQUM7b0JBQ3BDLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDM0QsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzVELFdBQWdDLEVBQVQsdUJBQVMsRUFBVCx1QkFBUyxFQUFULElBQVMsRUFBQzt3QkFBNUI7d0JBQ0QsVUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztxQkFDcEY7b0JBQ0QsZ0JBQWdCLEVBQUUsQ0FBQzs7Ozs7Q0FDdEI7QUFDRCxTQUFTLG9CQUFvQjtJQUN6QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDdEQsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ1osY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6RyxDQUFDLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQztBQUNELFNBQVMsc0JBQXNCO0lBQzNCLElBQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckQsSUFBSSxpQkFBaUIsRUFBRTtRQUNuQixpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM5QjtJQUNELElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZGLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtRQUNyQixPQUFPO0tBQ1Y7SUFDRCxJQUFNLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2xFLElBQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsSUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELElBQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0lBQzVDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNoRSxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsd0JBQXdCLENBQUM7SUFDakQsa0JBQWtCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEQsSUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkUsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RCxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2xFLGVBQWUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0lBQ3ZDLElBQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RCxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDbEUsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztJQUM1QyxJQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkYsSUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVGLGVBQWUsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQ3RDLG9CQUFvQixDQUFDLFNBQVMsSUFBSSxhQUFhLENBQUM7SUFDaEQsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNsRSxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUN2RSwwQkFBMEIsYUFBMUIsMEJBQTBCLHVCQUExQiwwQkFBMEIsQ0FBRSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNsRixxQkFBcUIsYUFBckIscUJBQXFCLHVCQUFyQixxQkFBcUIsQ0FBRSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxRQUFROztJQUN2QyxJQUFNLE9BQU8sR0FBRztRQUNaLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsUUFBUSxVQUFBO0tBQ1gsQ0FBQztJQUNGLE1BQUEsTUFBTSxDQUFDLEdBQUcsMENBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBQ0QsU0FBZSxxQkFBcUIsQ0FBQyxLQUFLOzs7Ozs7O29CQUNoQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQ3RGLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO3lCQUN4QixDQUFBLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSSxNQUFNLENBQUMsS0FBSyxLQUFLLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxFQUF0RixjQUFzRjtvQkFDdEYsS0FBSyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsdUJBQ3BDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FDakQsSUFBSSxFQUFFLE1BQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxtQ0FBSSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQ2xGLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQkFDcEMseUJBQXlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxXQUFNLHNCQUFzQixFQUFFLEVBQUE7O29CQUE5QixTQUE4QixDQUFDO29CQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN2RSxDQUFBLENBQUEsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxNQUFNLEtBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLE1BQU0sTUFBSyxHQUFHLElBQUksMkJBQTJCLEVBQUUsQ0FBQSxFQUF6RixjQUF5RjtvQkFDekYsV0FBTSxrQ0FBa0MsRUFBRSxFQUFBOztvQkFBMUMsU0FBMEMsQ0FBQztvQkFDM0MsV0FBTSxvQkFBb0IsRUFBRSxFQUFBOztvQkFBNUIsU0FBNEIsQ0FBQzs7O29CQUU3QixLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztvQkFFM0QsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7Ozs7O0NBRTFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsT0FBTzs7SUFDeEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixLQUFLLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDO1FBQ25DLDhCQUE4QixFQUFFLENBQUEsTUFBQSxPQUFPLENBQUMsT0FBTywwQ0FBRSxvQkFBb0IsTUFBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWTtLQUNqSCxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUM7QUFDRCxTQUFTLGlCQUFpQjs7SUFDdEIsTUFBQSxHQUFHLENBQUMsY0FBYyxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JFLE1BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1FBQ3BELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUU7WUFDNUMsb0JBQW9CLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDekUsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLGdCQUFnQixFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxlQUFlOztJQUNwQixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQXNCLFVBQTZDLEVBQTdDLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQTdDLGNBQTZDLEVBQTdDLElBQTZDLEVBQUM7UUFBL0QsSUFBTSxPQUFPLFNBQUE7UUFDZCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDZixJQUFBLEtBQThCLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQTFELFdBQVcsaUJBQUEsRUFBRyxRQUFRLGNBQW9DLENBQUM7UUFDbkUsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlGQUlsRCxDQUFDO1FBQ0MsS0FBbUIsVUFBVyxFQUFYLDJCQUFXLEVBQVgseUJBQVcsRUFBWCxJQUFXLEVBQUM7WUFBMUIsSUFBTSxJQUFJLG9CQUFBO1lBQ1gsV0FBVyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwRTtRQUNELGlCQUFpQixJQUFJLHdEQUNjLE9BQU8saUNBRTlDLGdCQUFnQixtQkFDaEIsV0FBVyw4REFFbUIsbUNBQW1DLENBQUMsUUFBUSxDQUFDLGlCQUN4RSxDQUFDO0tBQ0g7SUFDRCxNQUFBLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQywwQ0FBRSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNsRixNQUFBLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQywwQ0FBRSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMzRixNQUFBLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQywwQ0FBRSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBQ0QsU0FBUyxzQkFBc0I7SUFDM0IsS0FBdUIsVUFBdUIsRUFBdkIsS0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQXZCLGNBQXVCLEVBQXZCLElBQXVCLEVBQUM7UUFBMUMsSUFBTSxRQUFRLFNBQUE7UUFDZixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDckI7QUFDTCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7SUFDN0MsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtRQUN2QixhQUFhLEdBQUcsZ0NBQXVCLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxZQUFTLENBQUM7S0FDNUY7SUFDRCxPQUFPLHVEQUMrQixNQUFNLHdCQUN6QyxJQUFJLDBCQUNKLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxTQUFHLGFBQWEsaUJBQzdDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxvQkFBb0I7O0lBQ3pCLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRTtRQUNqRCxJQUFJLFdBQVcsR0FBRyxNQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekUsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQ3hCLE1BQUEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFlBQVksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEUsV0FBVyxHQUFHLE1BQUEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0gsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRCxXQUFXLEdBQUcsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQ3hCLE1BQUEsR0FBRyxDQUFDLG9CQUFvQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFBLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDMUY7YUFBTTtZQUNILE1BQUEsR0FBRyxDQUFDLG9CQUFvQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxNQUFBLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDN0Y7S0FDSjtJQUNELElBQUksUUFBUSxHQUFHLE1BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEUsSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQ3JCLE1BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVELFFBQVEsR0FBRyxNQUFBLEdBQUcsQ0FBQyxjQUFjLENBQUMsMENBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2pFO1NBQU07UUFDSCxNQUFBLEdBQUcsQ0FBQyxjQUFjLENBQUMsMENBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxRQUFRLEdBQUcsTUFBQSxHQUFHLENBQUMsY0FBYyxDQUFDLDBDQUFFLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNqRTtJQUNELElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUNyQixNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUNsRjtTQUFNO1FBQ0gsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFBLEdBQUcsQ0FBQyxjQUFjLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxNQUFBLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDckY7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0I7SUFDckIsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQXZCLENBQXVCLENBQzlELENBQUM7SUFDRixLQUFzQixVQUE2QyxFQUE3QyxLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUE3QyxjQUE2QyxFQUE3QyxJQUE2QyxFQUFDO1FBQS9ELElBQU0sT0FBTyxTQUFBO1FBQ2QsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLFNBQVM7U0FDWjtRQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDM0U7QUFDTCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVE7SUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDeEIsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsSUFBSSxnQkFBUyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsWUFBUyxFQUFuRSxDQUFtRSxDQUMxRyxDQUFDO0tBQ0w7U0FBTTtRQUNILE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLElBQUksaUVBQXNELG9CQUFvQixDQUFDLEtBQUssQ0FBQyxTQUFHLDhCQUE4QixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBUyxFQUFqSyxDQUFpSyxDQUN4TSxDQUFDO0tBQ0w7QUFDTCxDQUFDO0FBQ0QsU0FBUyxTQUFTO0lBQWxCLGlCQXdEQzs7SUF2REcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNaLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLEVBQS9CLENBQStCLENBQ25FLENBQUM7U0FDTDthQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sRUFBL0IsQ0FBK0IsQ0FDbkUsQ0FBQztZQUNGLE9BQU87U0FDVjtRQUNELHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN6RCwyQkFBMkIsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRCx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckQscUJBQXFCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RCwyQkFBMkIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0QscUJBQXFCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckgsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixXQUFXLEVBQUUsS0FBSztTQUNyQixDQUFDLENBQUMsQ0FBQztRQUNKLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLHFCQUFxQixFQUFFLFVBQUMsQ0FBQztRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNILGVBQWUsQ0FBQyxlQUFlLEVBQUU7Ozs7b0JBQzdCLGlCQUFpQixFQUFFLENBQUM7b0JBQ3BCLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDNUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFdBQU0sc0JBQXNCLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUE7O29CQUE5RCxTQUE4RCxDQUFDO29CQUMvRCxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7OztTQUN0QyxDQUFDLENBQUM7SUFDSCxlQUFlLENBQUMsaUNBQWlDLEVBQUUsVUFBQyxPQUFPO1FBQ3ZELEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9ELE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsS0FBd0IsVUFBMEIsRUFBMUIsS0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEIsRUFBQztRQUE5QyxJQUFNLFNBQVMsU0FBQTtRQUNoQixTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO0FBQ0wsQ0FBQztBQUNELFNBQVMsbUJBQW1CLENBQUMsWUFBWTs7SUFDckMsSUFBSSxZQUFZLEtBQUssRUFBRSxFQUFFO1FBQ3JCLE1BQUEsR0FBRyxDQUFDLDZCQUE2QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLEtBQXdCLFVBQStCLEVBQS9CLEtBQUEsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQS9CLGNBQStCLEVBQS9CLElBQStCLEVBQUM7WUFBbkQsSUFBTSxTQUFTLFNBQUE7WUFDaEIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFDRCxLQUF3QixVQUE0QixFQUE1QixLQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QixFQUFDO1lBQWhELElBQU0sU0FBUyxTQUFBO1lBQ2hCLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsTUFBQSxHQUFHLENBQUMsd0JBQXdCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxNQUFBLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxFQUFqQyxDQUFpQyxDQUMxRSxDQUFDO1FBQ0YsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFNBQVMsR0FBRyxZQUFZLEVBQWpDLENBQWlDLENBQ25GLENBQUM7S0FDTDtTQUFNO1FBQ0gsTUFBQSxHQUFHLENBQUMsNkJBQTZCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxNQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE1BQUEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsS0FBdUIsVUFBK0IsRUFBL0IsS0FBQSxNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFBL0IsY0FBK0IsRUFBL0IsSUFBK0IsRUFBQztZQUFsRCxJQUFNLFFBQVEsU0FBQTtZQUNmLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsS0FBd0IsVUFBNEIsRUFBNUIsS0FBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEIsRUFBQztZQUFoRCxJQUFNLFNBQVMsU0FBQTtZQUNoQixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QztRQUNELE1BQUEsR0FBRyxDQUFDLHdCQUF3QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsTUFBQSxHQUFHLENBQUMsaUNBQWlDLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRTtBQUNMLENBQUM7QUFDRCxTQUFTLGlCQUFpQjs7SUFDdEIsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxXQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFDRCxTQUFTLGlCQUFpQjs7SUFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLE1BQUEsTUFBTSxDQUFDLEdBQUcsMENBQUUsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBQ0QsU0FBUyxVQUFVO0lBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUM3QixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsS0FBSztLQUN4QixDQUFDLENBQUMsQ0FBQztJQUNKLEtBQUssQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RCxjQUFjLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBQ0QsU0FBUywyQkFBMkIsQ0FBQyxTQUFTOztJQUMxQyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDdEIsTUFBQSxHQUFHLENBQUMsY0FBYyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsTUFBQSxHQUFHLENBQUMscUJBQXFCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN4RDtTQUFNO1FBQ0gsTUFBQSxHQUFHLENBQUMsY0FBYyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBQSxHQUFHLENBQUMscUJBQXFCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyRDtBQUNMLENBQUM7QUFDRCxTQUFTLDJCQUEyQixDQUFDLFdBQVc7O0lBQzVDLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUMzQixHQUFHLENBQUMsY0FBYyxFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQXhCLENBQXdCLENBQ3ZELENBQUM7UUFDRixHQUFHLENBQUMscUJBQXFCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBeEIsQ0FBd0IsQ0FDOUQsQ0FBQztRQUNGLE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsTUFBQSxHQUFHLENBQUMsMEJBQTBCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3RDtTQUFNO1FBQ0gsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUF6QixDQUF5QixDQUN4RCxDQUFDO1FBQ0YsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQXpCLENBQXlCLENBQy9ELENBQUM7UUFDRixNQUFBLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE1BQUEsR0FBRyxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUQ7QUFDTCxDQUFDO0FBQ0QsU0FBUyxxQkFBcUIsQ0FBQyxTQUFTOztJQUNwQyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDdEIsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsS0FBdUIsVUFBMEIsRUFBMUIsS0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEIsRUFBQztZQUE3QyxJQUFNLFFBQVEsU0FBQTtZQUNmLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO0tBQ0o7U0FBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDaEMsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBdUIsVUFBMEIsRUFBMUIsS0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEIsRUFBQztZQUE3QyxJQUFNLFFBQVEsU0FBQTtZQUNmLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO0tBQ0o7QUFDTCxDQUFDO0FBQ0QsU0FBUyx3QkFBd0IsQ0FBQyxTQUFTOztJQUN2QyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDdEIsTUFBQSxHQUFHLENBQUMsc0JBQXNCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxNQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDN0Q7U0FBTTtRQUNILE1BQUEsR0FBRyxDQUFDLHNCQUFzQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3pCLE1BQUEsR0FBRyxDQUFDLHlCQUF5QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsTUFBQSxHQUFHLENBQUMsa0JBQWtCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQzdEO1NBQU07UUFDSCxNQUFBLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELE1BQUEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUNoRTtBQUNMLENBQUM7QUFDRCxTQUFTLDJCQUEyQixDQUFDLFFBQVE7O0lBQ3pDLElBQUksUUFBUSxFQUFFO1FBQ1YsTUFBQSxHQUFHLENBQUMsbUJBQW1CLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVELE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsUUFBUSxJQUFHLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxFQUFyQyxDQUFxQyxDQUN6RSxDQUFDO1FBQ0YsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsRUFBN0IsQ0FBNkIsQ0FDekQsQ0FBQztRQUNGLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQTVCLENBQTRCLENBQ3hELENBQUM7S0FDTDtBQUNMLENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUFDLEtBQWlCO0lBQWpCLHNCQUFBLEVBQUEsaUJBQWlCO0lBQzdDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBQ0QsU0FBUyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUTs7SUFDbkUsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3pCLElBQUksZ0JBQWdCLEVBQUU7WUFDbEIsTUFBQSxHQUFHLENBQUMsMkJBQTJCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RCxNQUFBLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsTUFBQSxHQUFHLENBQUMsbUJBQW1CLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQy9ELE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsTUFBQSxHQUFHLENBQUMsd0JBQXdCLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFNLEVBQXBDLENBQW9DLENBQ3ZFLENBQUM7WUFDRixLQUF3QixVQUFnQixFQUFoQixLQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBQztnQkFBcEMsSUFBTSxTQUFTLFNBQUE7Z0JBQ2hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDN0Q7U0FDSjthQUFNO1lBQ0gsTUFBQSxHQUFHLENBQUMsMkJBQTJCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxNQUFBLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsTUFBQSxHQUFHLENBQUMsbUJBQW1CLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xFLE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxNQUFBLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFEO1NBQU07UUFDSCxJQUFJLFFBQVEsRUFBRTtZQUNWLE1BQUEsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxNQUFBLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQUEsR0FBRyxDQUFDLDJCQUEyQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBQSxHQUFHLENBQUMsZ0NBQWdDLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxNQUFBLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELE1BQUEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsRSxNQUFBLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZEO0FBQ0wsQ0FBQztBQUNELFNBQVMscUJBQXFCLENBQUMsU0FBUzs7SUFDcEMsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3RCLE1BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLEtBQXVCLFVBQWdCLEVBQWhCLEtBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFoQixjQUFnQixFQUFoQixJQUFnQixFQUFDO1lBQW5DLElBQU0sUUFBUSxTQUFBO1lBQ2YsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM1RDtLQUNKO1NBQU07UUFDSCxNQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztBQUNMLENBQUM7QUFDRCxTQUFTLFdBQVc7O0lBQ2hCLE1BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSSxPQUFBLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFoQyxDQUFnQyxDQUM3RSxDQUFDO0lBQ0YsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUksT0FBQSxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBdkMsQ0FBdUMsQ0FDM0YsQ0FBQztJQUNGLE1BQUEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFJLE9BQUEsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsRUFBekMsQ0FBeUMsQ0FDL0YsQ0FBQztJQUNGLE1BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBSSxPQUFBLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxFQUFyQyxDQUFxQyxDQUN2RixDQUFDO0lBQ0YsTUFBQSxHQUFHLENBQUMscUJBQXFCLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQUksT0FBQSxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUE1QyxDQUE0QyxDQUNyRyxDQUFDO0lBQ0YsZUFBZSxDQUFDLGVBQWUsRUFBRSxVQUFDLE9BQU87UUFDckMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FBQyxVQUFVO0lBQ3BDLE9BQU8sVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDN0QsQ0FBQztBQUNELFNBQVMsc0JBQXNCLENBQUMsVUFBVTtJQUN0QyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGdCQUFnQjtJQUNuRCxpQkFBaUIsQ0FBQztRQUNkLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7UUFDeEMsVUFBVSxZQUFBO1FBQ1YsZ0JBQWdCLGtCQUFBO1FBQ2hCLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUN2QyxVQUFVLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTtLQUNyQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixDQUFDLFVBQVMsaUJBQWlCO0lBQ3ZCLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUN6QyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDM0MsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQzVDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNuQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEQsU0FBUyxtQkFBbUIsQ0FBQyxPQUFPO0lBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUNwQixPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztLQUNwQztJQUNELFFBQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBQztRQUNqQyxLQUFLLE1BQU07WUFDUCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQUNqQyxLQUFLLFVBQVU7WUFDWCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUNyQyxLQUFLLFNBQVM7WUFDVixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUNwQztZQUNJLE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0tBQzdDO0FBQ0wsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsT0FBTztJQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUNyQixLQUFLLENBQUMsdUZBQWdGLE9BQU8sQ0FBQyxNQUFNLHlCQUFlLE9BQU8sQ0FBQyxVQUFVLCtCQUFxQixNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHVCQUFhLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLCtCQUFxQixNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2hVO0FBQ0wsQ0FBQztBQUNELFNBQVMsa0JBQWtCLENBQUMsTUFBTTtJQUM5QixRQUFPLE1BQU0sRUFBQztRQUNWLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssaUJBQWlCLENBQUM7UUFDdkIsS0FBSyxrQkFBa0IsQ0FBQztRQUN4QixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxxQkFBcUIsQ0FBQztRQUMzQixLQUFLLHFCQUFxQixDQUFDO1FBQzNCLEtBQUsscUJBQXFCLENBQUM7UUFDM0IsS0FBSyxpQkFBaUIsQ0FBQztRQUN2QixLQUFLLG1CQUFtQjtZQUNwQixPQUFPLEtBQUssQ0FBQztRQUNqQjtZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQztBQUNELElBQU0sZUFBZSxHQUFHLGl1R0FnRWhCLENBQUM7QUFDVCxJQUFNLGdCQUFnQixHQUFHLGd1R0FnRWpCLENBQUM7QUFDVCxJQUFNLHdCQUF3QixHQUFHLCtzRkFvRHpCLENBQUM7QUFDVCxTQUFTLGtCQUFrQjs7SUFDdkIsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN4RCxNQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELE1BQUEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRSxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ1osSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN6RixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksUUFBUSxLQUFLLGdCQUFnQixFQUFFO2dCQUMvQixnQkFBZ0IsR0FBRyxRQUFRLENBQUM7Z0JBQzVCLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDdkQ7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsbUJBQW1CO0lBQ3hCLEtBQXlCLFVBQXVCLEVBQXZCLEtBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUF2QixjQUF1QixFQUF2QixJQUF1QixFQUFDO1FBQTVDLElBQU0sVUFBVSxTQUFBO1FBQ2pCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN2QjtBQUNMLENBQUM7QUFDRCxTQUFTLGlCQUFpQixDQUFDLEtBQWlCO0lBQWpCLHNCQUFBLEVBQUEsaUJBQWlCO0lBQ3hDLEtBQXFCLFVBQWtCLEVBQWxCLEtBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFsQixjQUFrQixFQUFsQixJQUFrQixFQUFDO1FBQW5DLElBQU0sTUFBTSxTQUFBO1FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDN0M7QUFDTCxDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FBQyxJQUFJOztJQUM5QixtQkFBbUIsRUFBRSxDQUFDO0lBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztRQUNyQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxjQUFjLFNBQUEsQ0FBQztRQUNuQixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0YsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDdEM7YUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyRyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQzFDO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDaEIsTUFBQSxHQUFHLENBQUMsMEJBQTBCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxLQUF5QixVQUFjLEVBQWQsaUNBQWMsRUFBZCw0QkFBYyxFQUFkLElBQWMsRUFBQztnQkFBbkMsSUFBTSxVQUFVLHVCQUFBO2dCQUNqQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNwQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzVHLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMzQyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxXQUFXLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztvQkFDdkMsV0FBVyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7d0JBQ3BCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsZ0RBQXVDLFVBQVUsQ0FBQyxPQUFPLE1BQUcsQ0FBQztxQkFDeEY7b0JBQ0QsV0FBVyxDQUFDLFNBQVMsSUFBSSw0R0FDSSxVQUFVLENBQUMsSUFBSSx5S0FFZCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQywrR0FFNUQsVUFBVSxDQUFDLEVBQUUsaUNBQTRCLENBQUM7b0JBQ3JFLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixLQUFxQixVQUFrQixFQUFsQixLQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0IsRUFBQztRQUFuQyxJQUFNLE1BQU0sU0FBQTtRQUNiLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLO1lBQ25DLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyw2REFBNkQsQ0FBQztZQUN2RixzQkFBc0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUNMLENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUFDLGFBQWE7O0lBQ3pDLE1BQUEsTUFBTSxDQUFDLGlCQUFpQiwwQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEIsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixTQUFTLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHO0tBQ3ZDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWixDQUFDO0FBQ0QsU0FBUyxtQkFBbUIsQ0FBQyxJQUFJOztJQUM3QixLQUE0QixVQUF1QixFQUF2QixLQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBdkIsY0FBdUIsRUFBdkIsSUFBdUIsRUFBQztRQUEvQyxJQUFNLGFBQWEsU0FBQTtRQUNwQixLQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDckMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDdkQsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzFCO1NBQ0o7S0FDSjtJQUNELElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDcEMsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7U0FBTTtRQUNILE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNDO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN2QixNQUFBLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsY0FBYyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUNELFNBQVMsb0JBQW9CLENBQUMsU0FBUztJQUNuQyxLQUFzQixVQUF1QixFQUF2QixLQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBdkIsY0FBdUIsRUFBdkIsSUFBdUIsRUFBQztRQUF6QyxJQUFNLE9BQU8sU0FBQTtRQUNkLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxTQUFTLFdBQVc7O0lBQ2hCLE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLFFBQVEsSUFBRyxPQUFBLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUExQixDQUEwQixDQUMzRCxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsVUFBVTs7SUFDZixNQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxRQUFRLElBQUcsT0FBQSxRQUFRLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBMUIsQ0FBMEIsQ0FDM0QsQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLGNBQWM7O0lBQ25CLElBQU0sU0FBUyxHQUFHLENBQUEsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RixJQUFNLE1BQU0sR0FBRyxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxXQUFXLENBQUM7SUFDbEQsSUFBTSxXQUFXLEdBQUcsTUFBQSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsMENBQUUsV0FBVyxDQUFDO0lBQ3ZELElBQUksQ0FBQSxNQUFBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBRSxVQUFVLE1BQUssQ0FBQyxFQUFFO1FBQ3pDLE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BEO1NBQU0sSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLE1BQU0sSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxNQUFNLEVBQUU7UUFDcEYsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsTUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEQ7U0FBTTtRQUNILE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELE1BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BEO0FBQ0wsQ0FBQztBQUNELFNBQWUsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTOzs7Ozs7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNqQixXQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTt3QkFDL0IsV0FBTztxQkFDVjs7OztvQkFFUyxXQUFXLEdBQUc7d0JBQ2hCLFlBQVksRUFBRSxTQUFTO3dCQUN2QixPQUFPLEVBQUUsRUFBRTt3QkFDWCxlQUFlLEVBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFO3dCQUM3QyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7cUJBQ3hELENBQUM7b0JBQ0ksT0FBTyxHQUFHO3dCQUNaLE1BQU0sRUFBRSxNQUFNO3dCQUNkLE9BQU8sRUFBRTs0QkFDTCxjQUFjLEVBQUUsa0JBQWtCO3lCQUNyQzt3QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7cUJBQ3BDLENBQUM7b0JBQ0YsV0FBTSxLQUFLLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxPQUFPLENBQUMsRUFBQTs7b0JBQTNHLFNBQTJHLENBQUM7Ozs7b0JBRTVHLElBQUksT0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsb0NBQTZCLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxzQkFBWSxPQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMvSDs7Ozs7O0NBRVI7QUFDRCxTQUFTLG9CQUFvQixDQUFDLFFBQVE7SUFDbEMsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLDBpQkFTbEMsV0FBVywrRkFHVCxDQUFDLENBQUM7QUFDYixDQUFDO0FBQ0QsQ0FBQztJQUFBLGlCQTREQTtJQTNERyxlQUFlLENBQUMsTUFBTSxFQUFFLFVBQU8sT0FBTzs7Ozs7OztvQkFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUNqQyxJQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssV0FBVyxFQUFFO3dCQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7cUJBQ3ZDO29CQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNwRixLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNsSSxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO3dCQUM3QixnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzt3QkFDN0MsY0FBYyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQzt3QkFDN0UsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFFBQVE7d0JBQ2xDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWTt3QkFDL0MsYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTztxQkFDekMsQ0FBQyxDQUFDLENBQUM7b0JBQ0osU0FBUyxFQUFFLENBQUM7b0JBQ1osZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsV0FBVyxFQUFFLENBQUM7b0JBQ2Qsa0JBQWtCLEVBQUUsQ0FBQztvQkFDckIsY0FBYyxFQUFFLENBQUM7b0JBQ2pCLFFBQVEsRUFBRSxDQUFDO29CQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQixlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0QixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQixvQkFBb0IsRUFBRSxDQUFDO29CQUN2QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7d0JBQ2hELHNCQUFzQixDQUFDLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTywwQ0FBRSxpQkFBaUIsbUNBQUksRUFBRSxFQUFFLE1BQUEsTUFBQSxPQUFPLENBQUMsT0FBTywwQ0FBRSx1QkFBdUIsbUNBQUksRUFBRSxDQUFDLENBQUM7cUJBQ3BIO29CQUNLLFlBQVksR0FBRyxlQUFlLEVBQUUsQ0FBQztvQkFDdkMsV0FBTSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUE7O29CQUE5QyxTQUE4QyxDQUFDO29CQUMvQyxXQUFNLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsRUFBQTs7b0JBQTlDLFNBQThDLENBQUM7b0JBQ3ZCLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBQTs7b0JBQS9HLGVBQWUsR0FBRyxTQUE2RjtvQkFDckcsV0FBTSxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUF0QyxPQUFPLEdBQUcsU0FBNEI7b0JBQzVDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxXQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFBOztvQkFBdkQsU0FBdUQsQ0FBQztvQkFDeEQsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QyxlQUFlLENBQUMscUJBQXFCLEVBQUU7Ozs7d0NBQ25DLFdBQU0sWUFBWSxFQUFFLEVBQUE7O29DQUFwQixTQUFvQixDQUFDO29DQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQ0FDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLEtBQUssUUFBUSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsRUFBRTt3Q0FDckgsS0FBSyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dDQUN2RCxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDOzRDQUM3QixhQUFhLEVBQUUsTUFBTTs0Q0FDckIsY0FBYyxFQUFFLEtBQUs7eUNBQ3hCLENBQUMsQ0FBQyxDQUFDO3FDQUNQO29DQUNELFdBQU0sc0JBQXNCLEVBQUUsRUFBQTs7b0NBQTlCLFNBQThCLENBQUM7b0NBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO29DQUNuQyxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7eUJBQzNDLENBQUMsQ0FBQzs7OztTQUNOLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDTCxTQUFTLGFBQWEsQ0FBQyxJQUFJOztJQUN2QixJQUFJLElBQUksR0FBRyxlQUFlLENBQUM7SUFDM0IsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2YsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0tBQzNCO0lBQ0QsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxrQkFBa0IsRUFBRTtRQUN6RCxJQUFJLEdBQUcsd0JBQXdCLENBQUM7S0FDbkM7SUFDRCxNQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsMENBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkZW5vLWZtdC1pZ25vcmUtZmlsZVxuLy8gZGVuby1saW50LWlnbm9yZS1maWxlXG4vLyBUaGlzIGNvZGUgd2FzIGJ1bmRsZWQgdXNpbmcgYGRlbm8gYnVuZGxlYCBhbmQgaXQncyBub3QgcmVjb21tZW5kZWQgdG8gZWRpdCBpdCBtYW51YWxseVxuXG5mdW5jdGlvbiAkcXMoc2VsZWN0b3IsIGNiID0gbnVsbCkge1xuICAgIGNvbnN0ICRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgaWYgKCRlbGVtZW50ICYmIGNiICE9PSBudWxsKSB7XG4gICAgICAgIGNiKCRlbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuICRlbGVtZW50O1xufVxuZnVuY3Rpb24gJHFzQWxsKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mIHJlc3VsdCl7XG4gICAgICAgICAgICBjYWxsYmFjaygkZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uV2luZG93TWVzc2FnZShldmVudE5hbWUsIGNiKSB7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gZXZlbnROYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCBjYihldmVudC5kYXRhKTtcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIG9uV2luZG93RGF0YUZldGNoKGVuZHBvaW50LCByZXF1ZXN0Q2FsbGJhY2spIHtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YS5ldmVudCA9PT0gZW5kcG9pbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Q2FsbGJhY2sobWVzc2FnZS5kYXRhLnJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UucG9ydHNbMF0ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UucG9ydHNbMF0ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaFdpbmRvd0RhdGEodGFyZ2V0V2luZG93LCBlbmRwb2ludCwgcmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBjb25zdCBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gKHsgZGF0YSAgfSk9PntcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDEuY2xvc2UoKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCF0YXJnZXRXaW5kb3cpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RhcmdldCB3aW5kb3cgaXMgbm90IHZhbGlkLicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGVuZHBvaW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIH0sICcqJywgW1xuICAgICAgICAgICAgICAgIGNoYW5uZWwucG9ydDJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaEhvc3RXaW5kb3dEYXRhKGVuZHBvaW50LCByZXF1ZXN0KSB7XG4gICAgcmV0dXJuIGZldGNoV2luZG93RGF0YSh3aW5kb3cudG9wLCBlbmRwb2ludCwgcmVxdWVzdCk7XG59XG52YXIgRGlzcGF0Y2hBY3Rpb25UeXBlO1xuKGZ1bmN0aW9uKERpc3BhdGNoQWN0aW9uVHlwZTEpIHtcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiSU5JVFwiXSA9ICdpbml0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiRU5WSVJPTk1FTlRcIl0gPSAnZW52aXJvbm1lbnQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9TRVNTSU9OSURcIl0gPSAncGVhY2hwYXlPcmRlci9zZXNzaW9uSWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9BRERSRVNTX1ZBTElEQVRFRFwiXSA9ICdwZWFjaHBheU9yZGVyL2FkZHJlc3NWYWxpZGF0ZWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9TRVRfRVhUUkFfRklFTERTXCJdID0gJ3BlYWNocGF5T3JkZXIvZXh0cmFGaWVsZHMvc2V0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiT1JERVJfU0VUX0VSUk9SX01FU1NBR0VcIl0gPSAncGVhY2hwYXlPcmRlci9lcnJvck1lc3NhZ2Uvc2V0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiUEVBQ0hQQVlfQ1VTVE9NRVJcIl0gPSAncGVhY2hwYXkvY3VzdG9tZXInO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJQRUFDSFBBWV9DVVNUT01FUl9TVFJJUEVfSURcIl0gPSAncGVhY2hwYXkvY3VzdG9tZXIvc3RyaXBlSWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJQRUFDSFBBWV9DVVNUT01FUl9QQVlNRU5UX01FVEhPRFwiXSA9ICdwZWFjaHBheS9jdXN0b21lci9wYXltZW50X21ldGhvZCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0NVU1RPTUVSXCJdID0gJ21lcmNoYW50L2N1c3RvbWVyJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfQ1VTVE9NRVJfRVhJU1RcIl0gPSAnbWVyY2hhbnQvY3VzdG9tZXIvZXhpc3QnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJFTlZJUk9OTUVOVF9MQU5HVUFHRVwiXSA9ICdtb2RhbC9sYW5ndWFnZSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX05BTUVcIl0gPSAnbWVyY2hhbnQvbmFtZSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0hPU1ROQU1FXCJdID0gJ21lcmNoYW50L2hvc3RuYW1lJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfR0VORVJBTFwiXSA9ICdtZXJjaGFudC9nZW5lcmFsJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfR0VORVJBTF9DVVJSRU5DWVwiXSA9ICdtZXJjaGFudC9nZW5lcmFsL2N1cnJlbmN5JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfQUNDT1VOVFwiXSA9ICdtZXJjaGFudC9hY2NvdW50cyc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX1RBWFwiXSA9ICdtZXJjaGFudC90YXgnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9TSElQUElOR1wiXSA9ICdtZXJjaGFudC9zaGlwcGluZyc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIkRFRkFVTFRfQ0FSVF9DT05URU5UU1wiXSA9ICdkZWZhdWx0L2NhcnQvY29udGVudHMnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJERUZBVUxUX0NBUlRfQ0FMQ1VMQVRJT05cIl0gPSAnZGVmYXVsdC9jYXJ0L2NhbGN1bGF0aW9uJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiQ0FSVF9DQUxDVUxBVElPTlwiXSA9ICdjYXJ0L2NhbGN1bGF0aW9uJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiQ0FSVF9TSElQUElOR19TRUxFQ1RJT05cIl0gPSAnY2FydC9zaGlwcGluZy9zZWxlY3Rpb24nO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJFTlZJUk9OTUVOVF9TRVRfRkVBVFVSRVNcIl0gPSAnRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiUEVBQ0hQQVlfQ1VTVE9NRVJfU0hJUFBJTkdcIl0gPSAnUEVBQ0hQQVlfQ1VTVE9NRVJfU0hJUFBJTkcnO1xufSkoRGlzcGF0Y2hBY3Rpb25UeXBlIHx8IChEaXNwYXRjaEFjdGlvblR5cGUgPSB7fSkpO1xuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIGxhbmd1YWdlOiAnZW4tVVMnLFxuICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgIHZlcnNpb246ICcnLFxuICAgICAgICAgICAgbW9kZTogJ2xpdmUnLFxuICAgICAgICAgICAgcGFnZVR5cGU6ICdjYXJ0JyxcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiAnI0ZGODc2QycsXG4gICAgICAgICAgICBmZWF0dXJlU3VwcG9ydDoge31cbiAgICAgICAgfSxcbiAgICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgICAgIGV4aXN0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIG1vYmlsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbW9kYWxVSToge1xuICAgICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICBwYWdlOiAnaW5mbycsXG4gICAgICAgICAgICBsb2FkaW5nTW9kZTogJ2ZpbmlzaGVkJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwZWFjaFBheU9yZGVyOiB7XG4gICAgICAgIHNlc3Npb25JZDogJycsXG4gICAgICAgIGN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgIGFkZGl0aW9uYWxGaWVsZHM6IHt9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6ICcnXG4gICAgfSxcbiAgICBwZWFjaFBheUN1c3RvbWVyOiB7XG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgbmFtZV9maXJzdDogJycsXG4gICAgICAgIG5hbWVfbGFzdDogJycsXG4gICAgICAgIGFkZHJlc3MxOiAnJyxcbiAgICAgICAgYWRkcmVzczI6ICcnLFxuICAgICAgICBjaXR5OiAnJyxcbiAgICAgICAgc3RhdGU6ICcnLFxuICAgICAgICBjb3VudHJ5OiAnJyxcbiAgICAgICAgcG9zdGFsOiAnJyxcbiAgICAgICAgcGhvbmU6ICcnXG4gICAgfSxcbiAgICBtZXJjaGFudEN1c3RvbWVyOiB7XG4gICAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgICAgbG9nZ2VkSW46IGZhbHNlLFxuICAgICAgICB1c2VybmFtZUlzUmVnaXN0ZXJlZDogZmFsc2VcbiAgICB9LFxuICAgIG1lcmNoYW50Q29uZmlndXJhdGlvbjoge1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaG9zdE5hbWU6ICcnLFxuICAgICAgICBnZW5lcmFsOiB7XG4gICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgIGNvZGU6ICdVU0QnLFxuICAgICAgICAgICAgICAgIHN5bWJvbDogJyQnLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRzX3NlcGFyYXRvcjogJywnLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxfc2VwYXJhdG9yOiAnLicsXG4gICAgICAgICAgICAgICAgcm91bmRpbmc6ICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgbnVtYmVyX29mX2RlY2ltYWxzOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNoaXBwaW5nOiB7XG4gICAgICAgICAgICBzaGlwcGluZ1pvbmVzOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHRheDoge1xuICAgICAgICAgICAgZGlzcGxheVByaWNlc0luQ2FydEFuZENoZWNrb3V0OiAnZXhjbHVkZVRheCdcbiAgICAgICAgfSxcbiAgICAgICAgYWNjb3VudHNBbmRQcml2YWN5OiB7XG4gICAgICAgICAgICBhbGxvd0d1ZXN0Q2hlY2tvdXQ6IHRydWUsXG4gICAgICAgICAgICBhbGxvd0FjY291bnRDcmVhdGlvbk9yTG9naW5EdXJpbmdDaGVja291dDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9HZW5lcmF0ZVVzZXJuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9HZW5lcmF0ZVBhc3N3b3JkOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjYWxjdWxhdGVkQ2FydHM6IHtcbiAgICAgICAgMDoge1xuICAgICAgICAgICAgcGFja2FnZV9yZWNvcmQ6IHt9LFxuICAgICAgICAgICAgY2FydDogW10sXG4gICAgICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICAgICAgZmVlc19yZWNvcmQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvdXBvbnNfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgICAgICBnaWZ0X2NhcmRfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgICAgICBzdWJ0b3RhbDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbF9zaGlwcGluZzogMCxcbiAgICAgICAgICAgICAgICB0b3RhbF90YXg6IDAsXG4gICAgICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXJ0X21ldGE6IHtcbiAgICAgICAgICAgICAgICBpc192aXJ0dWFsOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZURpc3BhdGNoVXBkYXRlKHR5cGUpIHtcbiAgICByZXR1cm4gKHBheWxvYWQpPT4oe1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHBheWxvYWRcbiAgICAgICAgfSlcbiAgICA7XG59XG5mdW5jdGlvbiBtZXJjaGFudENvbmZpZ3VyYXRpb25SZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9HRU5FUkFMX0NVUlJFTkNZOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBnZW5lcmFsOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmdlbmVyYWwsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgZ2VuZXJhbDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0FDQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGFjY291bnRzQW5kUHJpdmFjeToge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1RBWDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgdGF4OiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfU0hJUFBJTkc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNoaXBwaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfSE9TVE5BTUU6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGhvc3ROYW1lOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfTkFNRTpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBlYWNoUGF5T3JkZXJSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVNTSU9OSUQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHNlc3Npb25JZDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX0FERFJFU1NfVkFMSURBVEVEOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBjdXN0b21lckFkZHJlc3NWYWxpZGF0ZWQ6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVRfRVhUUkFfRklFTERTOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VUX0VSUk9SX01FU1NBR0U6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVudmlyb25tZW50UmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQucGx1Z2luXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RhbFVJOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLm1vZGFsVUlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5FTlZJUk9OTUVOVF9MQU5HVUFHRTpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5FTlZJUk9OTUVOVF9TRVRfRkVBVFVSRVM6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHBsdWdpbjoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5wbHVnaW4sXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVTdXBwb3J0OiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIG1vZGFsVUk6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUubW9kYWxVSVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gbWVyY2hhbnRDdXN0b21lclJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0NVU1RPTUVSOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfQ1VTVE9NRVJfRVhJU1Q6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lSXNSZWdpc3RlcmVkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gcGVhY2hQYXlDdXN0b21lclJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfU1RSSVBFX0lEOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzdHJpcGVfY3VzdG9tZXJfaWQ6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUl9QQVlNRU5UX01FVEhPRDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgcGF5bWVudF9vcHRpb246IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUl9TSElQUElORzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgICAgICAgcG9zdGFsOiBhY3Rpb24ucGF5bG9hZC5wb3N0Y29kZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gY2FydFJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DT05URU5UUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVsnMCddLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0OiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DQUxDVUxBVElPTjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfQ0FMQ1VMQVRJT046XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5DQVJUX1NISVBQSU5HX1NFTEVDVElPTjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoIW5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0gfHwgIW5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0/LnBhY2thZ2VfcmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFja2FnZVJlY29yZCA9IG5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0ucGFja2FnZV9yZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCFwYWNrYWdlUmVjb3JkW3BheWxvYWQuc2hpcHBpbmdQYWNrYWdlS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhY2thZ2VSZWNvcmRbcGF5bG9hZC5zaGlwcGluZ1BhY2thZ2VLZXldLnNlbGVjdGVkX21ldGhvZCA9IHBheWxvYWQucGFja2FnZU1ldGhvZElkO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gcm9vdFJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwZWFjaFBheU9yZGVyOiBwZWFjaFBheU9yZGVyUmVkdWNlcihzdGF0ZS5wZWFjaFBheU9yZGVyLCBhY3Rpb24pLFxuICAgICAgICBlbnZpcm9ubWVudDogZW52aXJvbm1lbnRSZWR1Y2VyKHN0YXRlLmVudmlyb25tZW50LCBhY3Rpb24pLFxuICAgICAgICBtZXJjaGFudEN1c3RvbWVyOiBtZXJjaGFudEN1c3RvbWVyUmVkdWNlcihzdGF0ZS5tZXJjaGFudEN1c3RvbWVyLCBhY3Rpb24pLFxuICAgICAgICBwZWFjaFBheUN1c3RvbWVyOiBwZWFjaFBheUN1c3RvbWVyUmVkdWNlcihzdGF0ZS5wZWFjaFBheUN1c3RvbWVyLCBhY3Rpb24pLFxuICAgICAgICBtZXJjaGFudENvbmZpZ3VyYXRpb246IG1lcmNoYW50Q29uZmlndXJhdGlvblJlZHVjZXIoc3RhdGUubWVyY2hhbnRDb25maWd1cmF0aW9uLCBhY3Rpb24pLFxuICAgICAgICBjYWxjdWxhdGVkQ2FydHM6IGNhcnRSZWR1Y2VyKHN0YXRlLmNhbGN1bGF0ZWRDYXJ0cywgYWN0aW9uKVxuICAgIH07XG59XG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyKTtcbmZ1bmN0aW9uIHVwZGF0ZUVudmlyb25tZW50KG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlQsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBvcHRpb25zLmxhbmd1YWdlID8/IEVudmlyb25tZW50Lmxhbmd1YWdlKCksXG4gICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nOiBvcHRpb25zLmN1c3RvbWVyRXhpc3RzID8/IEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCksXG4gICAgICAgICAgICAgICAgbW9iaWxlOiBvcHRpb25zLmN1c3RvbWVySXNNb2JpbGUgPz8gRW52aXJvbm1lbnQuY3VzdG9tZXIubW9iaWxlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBvcHRpb25zLnBsdWdpblZlcnNpb24gPz8gRW52aXJvbm1lbnQucGx1Z2luLnZlcnNpb24oKSxcbiAgICAgICAgICAgICAgICBtb2RlOiB0eXBlb2Ygb3B0aW9ucy5wbHVnaW5Jc1Rlc3RNb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnBsdWdpbklzVGVzdE1vZGUgPyAndGVzdCcgOiAnbGl2ZScgOiBFbnZpcm9ubWVudC5wbHVnaW4ubW9kZSgpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBvcHRpb25zLnBsdWdpbkJ1dHRvbkNvbG9yID8/IEVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvcigpLFxuICAgICAgICAgICAgICAgIHBhZ2VUeXBlOiBvcHRpb25zLnBsdWdpblBhZ2VUeXBlID8/IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVTdXBwb3J0OiBzdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vZGFsVUk6IHtcbiAgICAgICAgICAgICAgICBvcGVuOiBvcHRpb25zLm1vZGFsSXNPcGVuID8/IEVudmlyb25tZW50Lm1vZGFsVUkub3BlbigpLFxuICAgICAgICAgICAgICAgIHBhZ2U6IG9wdGlvbnMubW9kYWxQYWdlVHlwZSA/PyBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nTW9kZTogb3B0aW9ucy5tb2RhbExvYWRpbmcgPz8gRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0RmVhdHVyZVN1cHBvcnQoZmVhdHVyZXMgPSB7fSwgcGhwRGF0YSkge1xuICAgIGlmICghZmVhdHVyZXNbRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUXSkge1xuICAgICAgICBmZWF0dXJlc1tGZWF0dXJlRmxhZy5DT1VQT05fSU5QVVRdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihwaHBEYXRhLmVuYWJsZV9jb3Vwb25zKSxcbiAgICAgICAgICAgIHZlcnNpb246IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlc1tGZWF0dXJlRmxhZy5PUkRFUl9OT1RFU10pIHtcbiAgICAgICAgZmVhdHVyZXNbRmVhdHVyZUZsYWcuT1JERVJfTk9URVNdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihwaHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyksXG4gICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghZmVhdHVyZXNbRmVhdHVyZUZsYWcuR0lGVENBUkRfSU5QVVRdKSB7XG4gICAgICAgIGZlYXR1cmVzW0ZlYXR1cmVGbGFnLkdJRlRDQVJEX0lOUFVUXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IEJvb2xlYW4ocGhwRGF0YS5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUpLFxuICAgICAgICAgICAgdmVyc2lvbjogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmVzW0ZlYXR1cmVGbGFnLlNUUklQRV0pIHtcbiAgICAgICAgZmVhdHVyZXNbRmVhdHVyZUZsYWcuU1RSSVBFXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5FTlZJUk9OTUVOVF9TRVRfRkVBVFVSRVMsXG4gICAgICAgIHBheWxvYWQ6IGZlYXR1cmVzXG4gICAgfTtcbn1cbmNvbnN0IHVwZGF0ZUxhbmd1YWdlID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkVOVklST05NRU5UX0xBTkdVQUdFKTtcbmNvbnN0IHN0YXJ0TW9kYWxMb2FkaW5nID0gKCk9PnVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxMb2FkaW5nOiAnbG9hZGluZydcbiAgICB9KVxuO1xuY29uc3Qgc3RhcnRNb2RhbFByb2Nlc3NpbmcgPSAoKT0+dXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICBtb2RhbExvYWRpbmc6ICdwcm9jZXNzaW5nJ1xuICAgIH0pXG47XG5jb25zdCBzdG9wTW9kYWxMb2FkaW5nID0gKCk9PnVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxMb2FkaW5nOiAnZmluaXNoZWQnXG4gICAgfSlcbjtcbmNvbnN0IEVudmlyb25tZW50ID0ge1xuICAgIGVudmlyb25tZW50OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudFxuICAgICxcbiAgICBsYW5ndWFnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubGFuZ3VhZ2VcbiAgICAsXG4gICAgdGVzdE1vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5tb2RlID09PSAndGVzdCdcbiAgICAsXG4gICAgY3VzdG9tZXI6IHtcbiAgICAgICAgZXhpc3Rpbmc6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nXG4gICAgICAgICxcbiAgICAgICAgbW9iaWxlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5jdXN0b21lci5tb2JpbGVcbiAgICB9LFxuICAgIHBsdWdpbjoge1xuICAgICAgICB2ZXJzaW9uOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4udmVyc2lvblxuICAgICAgICAsXG4gICAgICAgIG1vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5tb2RlXG4gICAgICAgICxcbiAgICAgICAgYnV0dG9uQ29sb3I6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvclxuICAgICAgICAsXG4gICAgICAgIHBhZ2VUeXBlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGVcbiAgICB9LFxuICAgIG1vZGFsVUk6IHtcbiAgICAgICAgb3BlbjogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubW9kYWxVSS5vcGVuXG4gICAgICAgICxcbiAgICAgICAgcGFnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubW9kYWxVSS5wYWdlXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ01vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50Lm1vZGFsVUkubG9hZGluZ01vZGVcbiAgICB9XG59O1xuZnVuY3Rpb24gZ2V0TG9jYWxlVGV4dChrZXkpIHtcbiAgICBpZiAoIXBlYWNocGF5aTE4bltrZXldKSB7XG4gICAgICAgIHJldHVybiBwZWFjaHBheWkxOG4udW5rbm93bltFbnZpcm9ubWVudC5sYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgcmV0dXJuIHBlYWNocGF5aTE4bltrZXldW0Vudmlyb25tZW50Lmxhbmd1YWdlKCldO1xufVxuY29uc3QgdXBkYXRlTWVyY2hhbnRDdXJyZW5jeUNvbmZpZyA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9HRU5FUkFMX0NVUlJFTkNZKTtcbmNvbnN0IHVwZGF0ZU1lcmNoYW50VGF4Q29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1RBWCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudEdlbmVyYWxDb25maWcgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudEFjY291bnRDb25maWcgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfQUNDT1VOVCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudFNoaXBwaW5nQ29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1NISVBQSU5HKTtcbmNvbnN0IHVwZGF0ZU1lcmNoYW50SG9zdE5hbWUgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfSE9TVE5BTUUpO1xuY29uc3QgdXBkYXRlTWVyY2hhbnROYW1lID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX05BTUUpO1xuY29uc3QgTWVyY2hhbnRDb25maWd1cmF0aW9uID0ge1xuICAgIG5hbWU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5uYW1lXG4gICAgLFxuICAgIGhvc3ROYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWVcbiAgICAsXG4gICAgZ2VuZXJhbDoge1xuICAgICAgICB3Y0xvY2F0aW9uSW5mb0RhdGE6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLndjTG9jYXRpb25JbmZvRGF0YVxuICAgIH0sXG4gICAgY3VycmVuY3k6IHtcbiAgICAgICAgY29uZmlndXJhdGlvbjogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwuY3VycmVuY3lcbiAgICAgICAgLFxuICAgICAgICBjb2RlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC5jdXJyZW5jeS5jb2RlXG4gICAgICAgICxcbiAgICAgICAgc3ltYm9sOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC5jdXJyZW5jeS5zeW1ib2xcbiAgICB9LFxuICAgIHRheDoge1xuICAgICAgICBkaXNwbGF5TW9kZTogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLnRheC5kaXNwbGF5UHJpY2VzSW5DYXJ0QW5kQ2hlY2tvdXRcbiAgICB9LFxuICAgIHNoaXBwaW5nOiB7XG4gICAgICAgIHNoaXBwaW5nWm9uZXM6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5zaGlwcGluZy5zaGlwcGluZ1pvbmVzXG4gICAgfSxcbiAgICBhY2NvdW50czoge1xuICAgICAgICBsb2dpbkR1cmluZ0NoZWNrb3V0RW5hYmxlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hbGxvd0FjY291bnRDcmVhdGlvbk9yTG9naW5EdXJpbmdDaGVja291dFxuICAgICAgICAsXG4gICAgICAgIGFsbG93R3Vlc3RDaGVja291dDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hbGxvd0d1ZXN0Q2hlY2tvdXRcbiAgICAgICAgLFxuICAgICAgICBnZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hdXRvR2VuZXJhdGVQYXNzd29yZFxuICAgICAgICAsXG4gICAgICAgIGdlbmVyYXRlVXNlcm5hbWVFbmFibGVkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uYWNjb3VudHNBbmRQcml2YWN5LmF1dG9HZW5lcmF0ZVVzZXJuYW1lXG4gICAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKSB7XG4gICAgbGV0IGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICBjb25zdCBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gICAgbGV0IGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICAgIGxldCBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gICAgbGV0IG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICAgIGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbik9PntcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbWF5IG9ubHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0cy4gUmVjZWl2ZWQ6ICcgKyB0eXBlb2YgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgfSBmaW5hbGx5e1xuICAgICAgICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzPy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9O1xuICAgIGNvbnN0IGdldFN0YXRlID0gKCk9PntcbiAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgY2FsbCBnZXRTdGF0ZSBmcm9tIHdpdGhpbiBhIHJlZHVjZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgICB9O1xuICAgIGNvbnN0IHN1YnNjcmliZSA9IChsaXN0ZW5lcik9PntcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBhZGQgYSBzdWJzY3JpYmVyIGZyb20gYSBzdWJzY3JpcHRpb24gZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycz8uc2xpY2UoKSA/PyBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG5leHRMaXN0ZW5lcnM/LnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IHJlbW92ZSBhIHN1YnNjcmliZXIgd2hpbGUgcmVkdWNpbmcgb3IgaW5zaWRlIGEgc3Vic2NyaXB0aW9uIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzPy5zbGljZSgpID8/IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IG5leHRMaXN0ZW5lcnM/LmluZGV4T2YobGlzdGVuZXIpID8/IDA7XG4gICAgICAgICAgICBuZXh0TGlzdGVuZXJzLnNsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGN1cnJlbnRMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnaW5pdCdcbiAgICB9KTtcbiAgICBjb25zdCBzdG9yZTEgPSB7XG4gICAgICAgIGRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICAgc3Vic2NyaWJlXG4gICAgfTtcbiAgICByZXR1cm4gc3RvcmUxO1xufVxuY29uc3QgdXBkYXRlQ2FydENhbGN1bGF0aW9uID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfQ0FMQ1VMQVRJT04pO1xuY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DT05URU5UUyk7XG5jb25zdCB1cGRhdGVDYXJ0UGFja2FnZVNoaXBwaW5nTWV0aG9kID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfU0hJUFBJTkdfU0VMRUNUSU9OKTtcbmZ1bmN0aW9uIGNyZWF0ZUNhcnRTZWxlY3RvcnMoY2FydEtleSA9ICcwJykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2Q6IChwYWNrYWdlS2V5ID0gJzAnKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnBhY2thZ2VfcmVjb3JkPy5bcGFja2FnZUtleV0/LnNlbGVjdGVkX21ldGhvZCA/PyAnJ1xuICAgICAgICAsXG4gICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2REZXRhaWxzOiAocGFja2FnZUtleSA9ICcwJyk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5wYWNrYWdlX3JlY29yZD8uW3BhY2thZ2VLZXldID8/IG51bGxcbiAgICAgICAgLFxuICAgICAgICBjb250ZW50czogKCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5jYXJ0ID8/IFtdXG4gICAgICAgICxcbiAgICAgICAgc3VidG90YWw6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5zdWJ0b3RhbCA/PyAwXG4gICAgICAgICxcbiAgICAgICAgZmVlVG90YWw6IChmZWUpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5mZWVzX3JlY29yZFtmZWVdID8/IDBcbiAgICAgICAgLFxuICAgICAgICB0b3RhbEFwcGxpZWRGZWVzOiAoKT0+T2JqZWN0LmVudHJpZXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZmVlc19yZWNvcmQgPz8ge30pLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgW18sIHZhbHVlXSk9PnByZXZpb3VzVmFsdWUgKyAodmFsdWUgPz8gMClcbiAgICAgICAgICAgICwgMClcbiAgICAgICAgLFxuICAgICAgICBjb3Vwb25Ub3RhbDogKGNvdXBvbik9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmNvdXBvbnNfcmVjb3JkW2NvdXBvbl0gPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsQXBwbGllZENvdXBvbnM6ICgpPT5PYmplY3QuZW50cmllcyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5jb3Vwb25zX3JlY29yZCA/PyB7fSkucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBbXywgdmFsdWVdKT0+cHJldmlvdXNWYWx1ZSArICh2YWx1ZSA/PyAwKVxuICAgICAgICAgICAgLCAwKVxuICAgICAgICAsXG4gICAgICAgIGNvdXBvblJlY29yZDogKCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmNvdXBvbnNfcmVjb3JkXG4gICAgICAgICxcbiAgICAgICAgZ2lmdENhcmRUb3RhbDogKGdpZnRDYXJkKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZ2lmdF9jYXJkX3JlY29yZD8uW2dpZnRDYXJkXSA/PyAwXG4gICAgICAgICxcbiAgICAgICAgdG90YWxBcHBsaWVkR2lmdENhcmRzOiAoKT0+T2JqZWN0LmVudHJpZXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZ2lmdF9jYXJkX3JlY29yZCA/PyB7fSkucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBbXywgdmFsdWVdKT0+cHJldmlvdXNWYWx1ZSArICh2YWx1ZSA/PyAwKVxuICAgICAgICAgICAgLCAwKVxuICAgICAgICAsXG4gICAgICAgIHRvdGFsU2hpcHBpbmc6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS50b3RhbF9zaGlwcGluZyA/PyAwXG4gICAgICAgICxcbiAgICAgICAgdG90YWxUYXg6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS50b3RhbF90YXggPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkudG90YWwgPz8gMFxuICAgIH07XG59XG5jb25zdCBEZWZhdWx0Q2FydCA9IGNyZWF0ZUNhcnRTZWxlY3RvcnMoJzAnKTtcbmNvbnN0IENhcnRzID0ge1xuICAgIGFueVNoaXBwaW5nTWV0aG9kc0F2YWlsYWJsZTogKCk9PntcbiAgICAgICAgZm9yIChjb25zdCBjYXJ0S2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkQ2FydCA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldO1xuICAgICAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBwYWNrYWdlS2V5IG9mIE9iamVjdC5rZXlzKGNhbGN1bGF0ZWRDYXJ0LnBhY2thZ2VfcmVjb3JkKSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcHBpbmdQYWNrYWdlID0gY2FsY3VsYXRlZENhcnQucGFja2FnZV9yZWNvcmRbcGFja2FnZUtleV07XG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwcGluZ1BhY2thZ2UgfHwgT2JqZWN0LmVudHJpZXMoc2hpcHBpbmdQYWNrYWdlLm1ldGhvZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY29sbGVjdFNlbGVjdGVkU2hpcHBpbmc6ICgpPT57XG4gICAgICAgIGNvbnN0IGNhcnRzID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHM7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY2FydCBvZiBPYmplY3QudmFsdWVzKGNhcnRzKSl7XG4gICAgICAgICAgICBpZiAoIWNhcnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgW3BhY2thZ2VLZXksIHBhY2thZ2VSZWNvcmRdIG9mIE9iamVjdC5lbnRyaWVzKGNhcnQucGFja2FnZV9yZWNvcmQgPz8ge30pKXtcbiAgICAgICAgICAgICAgICBpZiAoIXBhY2thZ2VSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RLZXk6IGAke3BhY2thZ2VLZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwcGluZzogcGFja2FnZVJlY29yZC5zZWxlY3RlZF9tZXRob2RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTaGlwcGluZ01ldGhvZHM7XG4gICAgfSxcbiAgICBzdWJzY3JpcHRpb25QcmVzZW50OiAoKT0+e1xuICAgICAgICBmb3IgKGNvbnN0IGNhcnRLZXkgb2YgT2JqZWN0LmtleXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHMpKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRDYXJ0ID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV07XG4gICAgICAgICAgICBpZiAoIWNhbGN1bGF0ZWRDYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsY3VsYXRlZENhcnQuY2FydF9tZXRhLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuY2FydFN1bW1hcnlWaWV3RGF0YSgnMCcpO1xuZnVuY3Rpb24gY2FydFN1bW1hcnlWaWV3RGF0YShjYXJ0S2V5KSB7XG4gICAgcmV0dXJuICgpPT57XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRDYXJ0ID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV07XG4gICAgICAgIGlmICghY2FsY3VsYXRlZENhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FydFN1bW1hcnk6IG5ldyBBcnJheSgpLFxuICAgICAgICAgICAgICAgIGNhcnRNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlzX3ZpcnR1YWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJ0U3VtbWFyeSA9IFtdO1xuICAgICAgICBjb25zdCBjYXJ0TWV0YSA9IGNhbGN1bGF0ZWRDYXJ0LmNhcnRfbWV0YTtcbiAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGdldExvY2FsZVRleHQoJ3N1YnRvdGFsJyksXG4gICAgICAgICAgICB2YWx1ZTogY2FsY3VsYXRlZENhcnQuc3VtbWFyeS5zdWJ0b3RhbFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCBbY291cG9uLCBhbW91bnRdIG9mIE9iamVjdC5lbnRyaWVzKGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkuY291cG9uc19yZWNvcmQpKXtcbiAgICAgICAgICAgIGlmICghYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGAke2dldExvY2FsZVRleHQoJ2NvdXBvbicpfSAtICgke2NvdXBvbn0pYCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogLWFtb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbZmVlLCBhbW91bnQxXSBvZiBPYmplY3QuZW50cmllcyhjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LmZlZXNfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIWFtb3VudDEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogYEZlZSAtICgke2ZlZX0pYCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYW1vdW50MVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydC5jYXJ0X21ldGEuaXNfdmlydHVhbCkge1xuICAgICAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBnZXRMb2NhbGVUZXh0KCdzaGlwcGluZycpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LnRvdGFsX3NoaXBwaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLnRheC5kaXNwbGF5TW9kZSgpID09PSAnZXhjbHVkZVRheCcpIHtcbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogZ2V0TG9jYWxlVGV4dCgndGF4JyksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkudG90YWxfdGF4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtnaWZ0Q2FyZCwgYW1vdW50Ml0gb2YgT2JqZWN0LmVudHJpZXMoY2FsY3VsYXRlZENhcnQuc3VtbWFyeS5naWZ0X2NhcmRfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIWFtb3VudDIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogYEdpZnQgY2FyZCAtICgke2dpZnRDYXJkfSlgLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAtYW1vdW50MlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGdldExvY2FsZVRleHQoJ3RvdGFsJyksXG4gICAgICAgICAgICB2YWx1ZTogY2FsY3VsYXRlZENhcnQuc3VtbWFyeS50b3RhbFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LFxuICAgICAgICAgICAgY2FydE1ldGFcbiAgICAgICAgfTtcbiAgICB9O1xufVxuY29uc3QgcGVhY2hwYXlpMThuID0ge1xuICAgIGFkZDoge1xuICAgICAgICAnZGUtREUnOiAnKyBIaW56dWbDvGdlbicsXG4gICAgICAgICdlbi1VUyc6ICcrIEFkZCcsXG4gICAgICAgICdlcy1FUyc6ICcrIEFncmVnYXInLFxuICAgICAgICBmcjogJysgQWpvdXRlcicsXG4gICAgICAgIGl0OiAnKyBBZ2dpdW5nZXJlJyxcbiAgICAgICAgamE6ICcrIOi/veWKoCcsXG4gICAgICAgICdyby1STyc6ICcrIEFkxIN1Z2EnLFxuICAgICAgICBhcjogJ9mK2LbZitmBICsnLFxuICAgICAgICBjYTogJysgQWZlZ2VpeCcsXG4gICAgICAgICdjcy1DWic6ICcrIFDFmWlkYXQnLFxuICAgICAgICAnZGEtREsnOiAnKyBUaWxmw7hqZScsXG4gICAgICAgIGVsOiAnKyDOoM+Bzr/Pg864zq7Ous63JyxcbiAgICAgICAgJ2hpLUlOJzogJysg4KSc4KWL4KSh4KS84KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJysg7LaU6rCA7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJysgQWRkw6lpZXJlbicsXG4gICAgICAgICdubC1OTCc6ICcrIFRvZXZvZWdlbicsXG4gICAgICAgICdwdC1QVCc6ICcrIEFkaWNpb25hcicsXG4gICAgICAgICdydS1SVSc6ICcrINCU0L7QsdCw0LLQu9GP0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICcrIERvZGFqJyxcbiAgICAgICAgJ3N2LVNFJzogJysgTMOkZ2cgdGlsbCcsXG4gICAgICAgIHRoOiAnKyDguYDguJ7guLTguYjguKEnLFxuICAgICAgICB1azogJysg0JTQvtC00LDRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJysg5re75YqgJyxcbiAgICAgICAgJ3poLVRXJzogJysg5re75YqgJ1xuICAgIH0sXG4gICAgJ0NhcnQgaXMgZW1wdHknOiB7XG4gICAgICAgICdlbi1VUyc6ICdDYXJ0IGlzIGVtcHR5JyxcbiAgICAgICAgJ2RlLURFJzogJ0t1cnZlbiBlciB0b20nLFxuICAgICAgICAnZXMtRVMnOiAnRWwgY2Fycml0byBlc3RhIHZhY8OtbycsXG4gICAgICAgIGZyOiAnTGUgcGFuaWVyIGVzdCB2aWRlJyxcbiAgICAgICAgaXQ6ICdJbCBjYXJyZWxsbyDDqCB2dW90bycsXG4gICAgICAgIGphOiAn44Kr44O844OI44GM56m644Gn44GZJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NvyJl1bCBlc3RlIGdvbCcsXG4gICAgICAgIGFyOiAn2KfZhNio2LfYp9mC2Ycg2K7Yp9mE2YrZhycsXG4gICAgICAgIGNhOiAnRWwgY2FycmV0w7MgZXN0w6AgYnVpdCcsXG4gICAgICAgICdjcy1DWic6ICdLb8Whw61rIGplIHByw6F6ZG7DvScsXG4gICAgICAgICdkYS1ESyc6ICdLb8WhYXJpY2EgamUgcHJhem5hJyxcbiAgICAgICAgZWw6ICfOpM6/IM66zrHOu86szrjOuSDOtc6vzr3Osc65IM6szrTOtc65zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KS+4KSw4KWN4KSfIOCkluCkvuCksuClgCDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6l67CU6rWs64uI6rCAIOu5hOyWtCDsnojsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dlZW5jaGVuIGFzcyBlaWRlbCcsXG4gICAgICAgICdubC1OTCc6ICdXaW5rZWx3YWdlbiBpcyBsZWVnJyxcbiAgICAgICAgJ3B0LVBUJzogJ2NhcnJpbmhvIGVzdGEgdmF6aW8nLFxuICAgICAgICAncnUtUlUnOiAn0JrQvtGA0LfQuNC90LAg0L/Rg9GB0YLQsCcsXG4gICAgICAgICdzbC1TSSc6ICdLb8WhYXJpY2EgamUgcHJhem5hJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ZhcnVrb3JnZW4gw6RyIHRvbScsXG4gICAgICAgIHRoOiAn4Lij4LiW4LmA4LiC4LmH4LiZ4Lin4LmI4Liy4LiH4LmA4Lib4Lil4LmI4LiyJyxcbiAgICAgICAgdWs6ICfQmtC+0YjQuNC6INC/0L7RgNC+0LbQvdGW0LknLFxuICAgICAgICAnemgtQ04nOiAn6LSt54mp6L2m5piv56m655qEJyxcbiAgICAgICAgJ3poLVRXJzogJ+i0reeJqei9puaYr+epuueahCdcbiAgICB9LFxuICAgICdZb3UgbWlnaHQgYWxzbyBsaWtlLi4uJzoge1xuICAgICAgICAnZGUtREUnOiAnRGFzIGvDtm5udGUgZGlyIGF1Y2ggZ2VmYWxsZW4uLi4nLFxuICAgICAgICAnZW4tVVMnOiAnWW91IG1pZ2h0IGFsc28gbGlrZS4uLicsXG4gICAgICAgICdlcy1FUyc6ICdUYW1iacOpbiBwb2Ryw61hIGd1c3RhcnRlLi4uJyxcbiAgICAgICAgZnI6ICd2b3VzIHBvdXJyaWV6IGF1c3NpIGFpbWVyLi4uJyxcbiAgICAgICAgaXQ6ICdQb3RyZWJiZSBwaWFjZXJ0aSBhbmNoZS4uLicsXG4gICAgICAgIGphOiAn44GC44Gq44Gf44Gv44GK44Gd44KJ44GP44Gd44KM44KC5aW944GN44Gn44GX44KH44GGLi4uJyxcbiAgICAgICAgJ3JvLVJPJzogJ1MtYXIgcHV0ZWEgc2EtdGkgcGxhY2Egc2kuLi4nLFxuICAgICAgICBhcjogJ9mC2K8g2YrYudis2KjZgyDYp9mK2LbYpycsXG4gICAgICAgIGNhOiAncG90c2VyIHRhbWLDqSB0XFwnYWdyYWRhLi4uJyxcbiAgICAgICAgJ2NzLUNaJzogJ21vaGxvIGJ5IHNlIHbDoW0gbMOtYml0Li4uJyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGthbiBvZ3PDpSBsaWRlLi4uJyxcbiAgICAgICAgZWw6ICfOnM+Azr/Pgc61zq8gzrXPgM6vz4POt8+CIM69zrEgz4POsc+CIM6xz4HOrc+DzrXOuS4uLicsXG4gICAgICAgICdoaS1JTic6ICfgpLbgpL7gpK/gpKYg4KSk4KWB4KSu4KWN4KS54KWHIOCkr+CkuSDgpK3gpYAg4KSF4KSa4KWN4KSb4KS+IOCksuCkl+Clhy4uLicsXG4gICAgICAgICdrby1LUic6ICfri7nsi6DsnYAg65iQ7ZWcIOyii+yVhO2VoCDsiJjrj4Qg7J6I7Iq164uI64ukLi4uJyxcbiAgICAgICAgJ2xiLUxVJzogJ0RpciBrw6tubnQgb2NoIGfDpHJlbi4uLicsXG4gICAgICAgICdubC1OTCc6ICdNaXNzY2hpZW4gdmluZCBqZSBkaXQgb29rIGxldWsuLi4nLFxuICAgICAgICAncHQtUFQnOiAndm9jw6ogcG9kZSBnb3N0YXIgdGFtYsOpbS4uLicsXG4gICAgICAgICdydS1SVSc6ICfQktCw0Lwg0YLQsNC60LbQtSDQvNC+0LbQtdGCINC/0L7QvdGA0LDQstC40YLRjNGB0Y8uLi4nLFxuICAgICAgICAnc2wtU0knOiAnTW9yZGEgdmFtIGJvIHbFoWXEjSB0dWRpLi4uJyxcbiAgICAgICAgJ3N2LVNFJzogJ0R1IGthbnNrZSBvY2tzw6UgZ2lsbGFyLi4uJyxcbiAgICAgICAgdGg6ICfguITguLjguJPguK3guLLguIjguIrguK3guJouLi4nLFxuICAgICAgICB1azogJ9CS0LDQvCDRgtCw0LrQvtC2INC80L7QttC1INGB0L/QvtC00L7QsdCw0YLQuNGB0Y8uLi4nLFxuICAgICAgICAnemgtQ04nOiAn5L2g5Y+v6IO96L+Y5Zac5qyiLi4uJyxcbiAgICAgICAgJ3poLVRXJzogJ+S9oOWPr+iDvemChOWWnOatoS4uLidcbiAgICB9LFxuICAgIHZlcmlmaWVkOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJpZml6aWVydCcsXG4gICAgICAgICdlbi1VUyc6ICdWZXJpZmllZCcsXG4gICAgICAgICdlcy1FUyc6ICdWZXJpZmljYWRvJyxcbiAgICAgICAgZnI6ICdWw6lyaWZpw6knLFxuICAgICAgICBpdDogJ3ZlcmlmaWNhdG8nLFxuICAgICAgICBqYTogJ+eiuuiqjea4iOOBvycsXG4gICAgICAgICdyby1STyc6ICdWZXJpZmljYXQnLFxuICAgICAgICBhcjogJ9iq2YUg2KfZhNiq2K3ZgtmCJyxcbiAgICAgICAgY2E6ICdWZXJpZmljYXQnLFxuICAgICAgICAnY3MtQ1onOiAnT3bEm8WZZW5vJyxcbiAgICAgICAgJ2RhLURLJzogJ1ZlcmlmaWNlcmV0JyxcbiAgICAgICAgZWw6ICfOlc+AzrHOu863zrjOtc+FzrzOrc69zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KS44KSk4KWN4KSv4KS+4KSq4KS/4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+2ZleyduOuQqCcsXG4gICAgICAgICdsYi1MVSc6ICdWZXJpZml6w6lpZXJ0JyxcbiAgICAgICAgJ25sLU5MJzogJ0dldmVyaWZpZWVyZCcsXG4gICAgICAgICdwdC1QVCc6ICdWZXJpZmljYWRhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtCy0LXRgNC10L3QvicsXG4gICAgICAgICdzbC1TSSc6ICdQcmV2ZXJqZW5vJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ZlcmlmaWVyYWQnLFxuICAgICAgICB0aDogJ+C4leC4o+C4p+C4iOC4quC4reC4muC5geC4peC5ieC4pycsXG4gICAgICAgIHVrOiAn0J/QtdGA0LXQstGW0YDQtdC90L4nLFxuICAgICAgICAnemgtQ04nOiAn5bey6aqM6K+BJyxcbiAgICAgICAgJ3poLVRXJzogJ+W3sumpl+itiSdcbiAgICB9LFxuICAgICcrIEFERCBBIENPVVBPTiBDT0RFJzoge1xuICAgICAgICAnZGUtREUnOiAnKyBFSU5FTiBHVVRTQ0hFSU4gQ09ERSBISU5aVUbDnEdFTicsXG4gICAgICAgICdlbi1VUyc6ICcrIEFERCBBIENPVVBPTiBDT0RFJyxcbiAgICAgICAgJ2VzLUVTJzogJysgQcORQURJUiBVTiBDw5NESUdPIERFIENVUMOTTicsXG4gICAgICAgIGZyOiAnKyBBSk9VVEVSIFVOIENPREUgQ09VUE9OJyxcbiAgICAgICAgaXQ6ICcrIEFHR0lVTkdJIFVOIENPRElDRSBDT1VQT04nLFxuICAgICAgICBqYTogJysg44Kv44O844Od44Oz44Kz44O844OJ44KS6L+95YqgJyxcbiAgICAgICAgJ3JvLVJPJzogJysgQUTEglVHQciaSSBVTiBDT0QgREUgQ1VQT04nLFxuICAgICAgICBhcjogJ9ij2LbZgSDYsdmF2LIg2KfZhNmC2LPZitmF2KknLFxuICAgICAgICBjYTogJ0FmZWdpdSB1biBjb2RpIGRlIGN1cMOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ1DFmWlkZWp0ZSBrw7NkIGt1cMOzbnUnLFxuICAgICAgICAnZGEtREsnOiAnVGlsZsO4aiBlbiBrdXBvbmtvZGUnLFxuICAgICAgICBlbDogJ86gz4HOv8+DzrjOrc+Dz4TOtSDOrc69zrHOvSDOus+JzrTOuc66z4wgzrrOv8+Fz4DOv869zrnOv8+NJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleClguCkquCkqCDgpJXgpYvgpKEg4KSc4KWL4KSh4KS84KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y/oO2PsCDsvZTrk5wg7LaU6rCAJyxcbiAgICAgICAgJ2xiLUxVJzogJ0bDvMO8Z3QgZSBDb3Vwb24gQ29kZSBkZXJiw6RpJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZvZWcgZWVuIGNvdXBvbmNvZGUgdG9lJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FkaWNpb25hciB1bSBjw7NkaWdvIGRlIGN1cG9tJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CU0L7QsdCw0LLRjNGC0LUg0LrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdEb2RhanRlIGtvZG8ga3Vwb25hJyxcbiAgICAgICAgJ3N2LVNFJzogJ0zDpGdnIHRpbGwgZW4ga3Vwb25na29kJyxcbiAgICAgICAgdGg6ICfguYDguJ7guLTguYjguKHguKPguKvguLHguKrguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9CU0L7QtNCw0LnRgtC1INC60L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5re75Yqg5LyY5oOg5Yi45Luj56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+a3u+WKoOWEquaDoOWIuOS7o+eivCdcbiAgICB9LFxuICAgICdlcnJvci1vY2N1cnJlZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0VudHNjaHVsZGlndW5nLCBldHdhcyBpc3Qgc2NoaWVmIGdlbGF1ZmVuLiBCaXR0ZSBha3R1YWxpc2llcmVuIFNpZSBkaWUgU2VpdGUgdW5kIHZlcnN1Y2hlbiBTaWUgZXMgZXJuZXV0LicsXG4gICAgICAgICdlbi1VUyc6ICdTb3JyeSwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSByZWZyZXNoIHRoZSBwYWdlIGFuZCB0cnkgYWdhaW4uJyxcbiAgICAgICAgJ2VzLUVTJzogJ1BlcmTDs24sIGFsZ28gc2FsacOzIG1hbC4gQWN0dWFsaWNlIGxhIHDDoWdpbmEgeSB2dWVsdmEgYSBpbnRlbnRhcmxvLicsXG4gICAgICAgIGZyOiAnRMOpc29sw6ksIHF1ZWxxdWUgY2hvc2Ugc1xcJ2VzdCBtYWwgcGFzc8OpLiBWZXVpbGxleiBhY3R1YWxpc2VyIGxhIHBhZ2UgZXQgcsOpZXNzYXllci4nLFxuICAgICAgICBpdDogJ1NjdXNhLCBxdWFsY29zYSDDqCBhbmRhdG8gc3RvcnRvLiBQZXJmYXZvcmUgcmljYXJpY2EgbGEgcGFnaW5hIGUgcmlwcm92YS4nLFxuICAgICAgICAncm8tUk8nOiAnU2N1emUsIGNldmEgYSBtZXJzIGdyZciZaXQuIEFjdHVhbGl6YcibaSBwYWdpbmEgyJlpIMOubmNlcmNhyJtpIGRpbiBub3UuJyxcbiAgICAgICAgYXI6ICfYudiw2LHYp9iMINmH2YbYp9mDINiu2LfYoyDZhdinLiDZitix2KzZiSDYqtit2K/ZitirINin2YTYtdmB2K3YqSDZiNit2KfZiNmEINmF2LHYqSDYo9iu2LHZiS4nLFxuICAgICAgICBjYTogJ0hvIHNlbnRpbSwgYWxndW5hIGNvc2EgaGEgYW5hdCBtYWxhbWVudC4gQWN0dWFsaXR6ZXUgbGEgcMOgZ2luYSBpIHRvcm5ldS1obyBhIHByb3Zhci4nLFxuICAgICAgICAnY3MtQ1onOiAnUHJvbWnFiCwgbsSbY28gc2UgcG9rYXppbG8uIE9ibm92dGUgc3Ryw6Fua3UgYSB6a3VzdGUgdG8gem5vdnUuJyxcbiAgICAgICAgJ2RhLURLJzogJ1VuZHNreWxkLCBub2dldCBnaWsgZ2FsdC4gT3BkYXRlciBzaWRlbiwgb2cgcHLDuHYgaWdlbi4nLFxuICAgICAgICBlbDogJ86jz4XOs869z47OvM63LCDOus6sz4TOuSDPgM6uzrPOtSDPg8+Ez4HOsc6yzqwuIM6Rzr3Osc69zrXPjs+Dz4TOtSDPhM63IM+DzrXOu86vzrTOsSDOus6xzrkgzrTOv866zrnOvM6sz4PPhM61IM6+zrHOvc6sLicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpY3gpLfgpK7gpL4g4KSV4KSw4KWH4KSCLCDgpJXgpYHgpJsg4KSX4KSy4KSkIOCkueCliyDgpJfgpK/gpL7gpaQg4KSq4KWD4KS34KWN4KSgIOCkleCliyDgpLDgpYDgpKvgpY3gpLDgpYfgpLYg4KSV4KSw4KWH4KSCIOCklOCksCDgpKrgpYHgpKg6IOCkquCljeCksOCkr+CkvuCkuCDgpJXgpLDgpYfgpILgpaQnLFxuICAgICAgICAna28tS1InOiAn7KOE7Iah7ZWp64uI64ukLiDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDtjpjsnbTsp4Drpbwg7IOI66Gc6rOg7Lmo7ZWY6rOgIOuLpOyLnCDsi5zrj4TtlZjsi63si5zsmKQuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VudHNjaMOrbGxlZ3QsIGVwcGVzIGFzcyBmYWxzY2ggZ2FhbmcuIEVyZnLDq3NjaHQgdy5lLmcuIGRcXCdTw6RpdCBhIHByb2LDqWllcnQgbmFjaCBlbmcgS8OpaWVyLicsXG4gICAgICAgICdubC1OTCc6ICdTb3JyeSwgZXIgZ2luZyBpZXRzIG1pcy4gVmVydmVycyBkZSBwYWdpbmEgZW4gcHJvYmVlciBoZXQgb3BuaWV1dy4nLFxuICAgICAgICAncHQtUFQnOiAnRGVzY3VscGUsIGFsZ28gZGV1IGVycmFkby4gQXR1YWxpemUgYSBww6FnaW5hIGUgdGVudGUgbm92YW1lbnRlLicsXG4gICAgICAgICdydS1SVSc6ICfQmNC30LLQuNC90LjRgtC1LCDRh9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQntCx0L3QvtCy0LjRgtC1INGB0YLRgNCw0L3QuNGG0YMg0Lgg0L/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQty4nLFxuICAgICAgICAnc2wtU0knOiAnT3Byb3N0aXRlLCBuZWthaiBqZSDFoWxvIG5hcm9iZS4gT3N2ZcW+aXRlIHN0cmFuIGluIHBvc2t1c2l0ZSB6bm92YS4nLFxuICAgICAgICAnc3YtU0UnOiAnRsO2cmzDpXQsIG7DpWdvdCBnaWNrIGZlbC4gVXBwZGF0ZXJhIHNpZGFuIG9jaCBmw7Zyc8O2ayBpZ2VuLicsXG4gICAgICAgIHRoOiAn4LiC4Lit4LmC4LiX4Lip4Lih4Li14Lia4Liy4LiH4Lit4Lii4LmI4Liy4LiH4Lic4Li04LiU4Lie4Lil4Liy4LiULiDguYLguJvguKPguJTguKPguLXguYDguJ/guKPguIrguKvguJnguYnguLLguYHguKXguYnguKfguKXguK3guIfguK3guLXguIHguITguKPguLHguYnguIcnLFxuICAgICAgICB1azogJ9CS0LjQsdCw0YfRgtC1LCDRidC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6LiDQntC90L7QstGW0YLRjCDRgdGC0L7RgNGW0L3QutGDINGC0LAg0L/QvtCy0YLQvtGA0ZbRgtGMINGB0L/RgNC+0LHRgy4nLFxuICAgICAgICAnemgtQ04nOiAn5oqx5q2J77yM5Ye65LqG5LiA5Lqb6Zeu6aKY44CCIOivt+WIt+aWsOmhtemdouW5tumHjeivleOAgicsXG4gICAgICAgICd6aC1UVyc6ICfmirHmrYnvvIzlh7rkuobkuIDkupvllY/poYzjgIIg6KuL5Yi35paw6aCB6Z2i5Lim6YeN6Kmm44CCJ1xuICAgIH0sXG4gICAgJysgUkVERUVNIEdJRlQgQ0FSRC9TVE9SRSBDUkVESVQnOiB7XG4gICAgICAgICdkZS1ERSc6ICcrIEdFU0NIRU5LS0FSVEUvR0VTQ0hFTkstS1JFRElUIEVJTkzDllNFTicsXG4gICAgICAgICdlbi1VUyc6ICcrIFJFREVFTSBHSUZUIENBUkQvU1RPUkUgQ1JFRElUJyxcbiAgICAgICAgJ2VzLUVTJzogJysgQ0FOSkVBUiBUQVJKRVRBIERFIFJFR0FMTy9DUsOJRElUTyBERSBUSUVOREEnLFxuICAgICAgICBmcjogJysgw4lDSEFOR0VSIExBIENBUlRFLUNBREVBVS9MRSBDUsOJRElUIERVIE1BR0FTSU4nLFxuICAgICAgICBpdDogJysgVVRJTElaWkEgQ0FSVEEgUkVHQUxPL0NSRURJVE8gTkVHT1pJTycsXG4gICAgICAgIGphOiAnKyDjgq7jg5Xjg4jjgqvjg7zjg4kv44K544OI44Ki44Kv44Os44K444OD44OI44KS5Yip55So44GZ44KLJyxcbiAgICAgICAgJ3JvLVJPJzogJysgUsSCc2N1bXDEg3JhyJtpIGNhcmR1bC9jYWRvdWwgZGUgY3JlZGl0IGNhZG91JyxcbiAgICAgICAgYXI6ICfYp9iz2KrYsdiv2KfYryDYqNi32KfZgtipINin2YTZh9iv2KfZitinIC8g2LHYtdmK2K8g2KfZhNmF2KrYrNixJyxcbiAgICAgICAgY2E6ICdCZXNjYW52aWEgZWwgY3LDqGRpdCBkZSBsYSB0YXJnZXRhIHJlZ2FsIG8gZGUgbGEgYm90aWdhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1VwbGF0bsSbdGUgZMOhcmtvdm91IGthcnR1L2tyZWRpdCBvYmNob2R1JyxcbiAgICAgICAgJ2RhLURLJzogJ0luZGzDuHMgZ2F2ZWtvcnQvYnV0aWtza3JlZGl0JyxcbiAgICAgICAgZWw6ICfOlc6+zrHPgc6zz4XPgc+Oz4PPhM61IM+AzrnPg8+Ez4nPhM65zrrOriDOus6sz4HPhM6xIM60z47Pgc6/z4UvzrrOsc+EzqzPg8+EzrfOvM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkieCkquCkueCkvuCksCDgpJXgpL7gpLDgpY3gpKEv4KS44KWN4KSf4KWL4KSwIOCkleCljeCksOClh+CkoeCkv+CknyDgpLDgpL/gpKHgpYDgpK4g4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wv7Iqk7Yag7Ja0IO2BrOugiOuUpyDsgqzsmqknLFxuICAgICAgICAnbGItTFUnOiAnRXJsw6lpcyBLYWRkb2thYXJ0L0dlc2Now6RmdHNrcmVkaXR0JyxcbiAgICAgICAgJ25sLU5MJzogJ0NhZGVhdWthYXJ0L3dpbmtlbHRlZ29lZCBpbndpc3NlbGVuJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Jlc2dhdGFyIGNhcnTDo28tcHJlc2VudGUgLyBjcsOpZGl0byBkYSBsb2phJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7Qs9Cw0YHQuNGC0Ywg0L/QvtC00LDRgNC+0YfQvdGD0Y4g0LrQsNGA0YLRgyAvINC60YDQtdC00LjRgiDQvNCw0LPQsNC30LjQvdCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1Vub3bEjWl0ZSBkYXJpbG5vIGthcnRpY28vZG9icm9pbWV0amUgdiB0cmdvdmluaScsXG4gICAgICAgICdzdi1TRSc6ICdMw7ZzIGluIHByZXNlbnRrb3J0L2J1dGlrc2tyZWRpdCcsXG4gICAgICAgIHRoOiAn4LmB4Lil4LiB4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNL+C5gOC4hOC4o+C4lOC4tOC4leC4o+C5ieC4suC4meC4hOC5ieC4sicsXG4gICAgICAgIHVrOiAn0JDQutGC0LjQstGD0LnRgtC1INC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDL9C60YDQtdC00LjRgiDRgyDQvNCw0LPQsNC30LjQvdGWJyxcbiAgICAgICAgJ3poLUNOJzogJ+WFkeaNouekvOWTgeWNoS/llYblupfkv6HnlKgnLFxuICAgICAgICAnemgtVFcnOiAn5YWM5o+b56au5ZOB5Y2hL+WVhuW6l+S/oeeUqCdcbiAgICB9LFxuICAgICdTZW5kIHRvJzoge1xuICAgICAgICAnZGUtREUnOiAnU2VuZGVuIGFuJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NlbmQgdG8nLFxuICAgICAgICAnZXMtRVMnOiAnRW52aWFyIGEnLFxuICAgICAgICBmcjogJ0Vudm95ZXIgw6AnLFxuICAgICAgICBpdDogJ0ludmlhcmUgYScsXG4gICAgICAgIGphOiAn6YCB5L+h5YWIJyxcbiAgICAgICAgJ3JvLVJPJzogJ1RyaW1pdGUgY2F0cmUnLFxuICAgICAgICBhcjogJ9in2LHYs9mEINil2YTZiScsXG4gICAgICAgIGNhOiAnRW52aWEgYScsXG4gICAgICAgICdjcy1DWic6ICdQb3NsYXQga29tdScsXG4gICAgICAgICdkYS1ESyc6ICdTZW5kIHRpbCcsXG4gICAgICAgIGVsOiAnzqPPhM6tzrvOvc+JIM+DzrUnLFxuICAgICAgICAnaGktSU4nOiAn4KSt4KWH4KSc4KSo4KS+JyxcbiAgICAgICAgJ2tvLUtSJzogJ+uztOuCtOq4sCcsXG4gICAgICAgICdsYi1MVSc6ICdTY2jDqWNrZW4nLFxuICAgICAgICAnbmwtTkwnOiAnVmVyemVuZGVuIG5hYXInLFxuICAgICAgICAncHQtUFQnOiAnRW52aWFyIHBhcmEnLFxuICAgICAgICAncnUtUlUnOiAn0J7RgtC/0YDQsNCy0LjRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvxaFsamknLFxuICAgICAgICAnc3YtU0UnOiAnU2tpY2thIHRpbGwnLFxuICAgICAgICB0aDogJ+C4quC5iOC4h+C4luC4tuC4hycsXG4gICAgICAgIHVrOiAn0JLRltC00L/RgNCw0LLQuNGC0LgnLFxuICAgICAgICAnemgtQ04nOiAn5Y+R57uZJyxcbiAgICAgICAgJ3poLVRXJzogJ+eZvOe1pidcbiAgICB9LFxuICAgICdNeSBvcmRlcic6IHtcbiAgICAgICAgJ2RlLURFJzogJ01laW5lIEJlc3RlbGx1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnTXkgb3JkZXInLFxuICAgICAgICAnZXMtRVMnOiAnTWkgcGVkaWRvJyxcbiAgICAgICAgZnI6ICdNYSBjb21tYW5kZScsXG4gICAgICAgIGl0OiAnSWwgbWlvIG9yZGluZScsXG4gICAgICAgIGphOiAn5rOo5paHJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NvbWFuZGEgbWVhJyxcbiAgICAgICAgYXI6ICfYt9mE2KjZiicsXG4gICAgICAgIGNhOiAnRWwgbWV1IG9yZHJlJyxcbiAgICAgICAgJ2NzLUNaJzogJ01vamUgb2JqZWRuw6F2a2EnLFxuICAgICAgICAnZGEtREsnOiAnTWluIGJlc3RpbGxpbmcnLFxuICAgICAgICBlbDogJ86XIM+AzrHPgc6xzrPOs861zrvOr86xIM68zr/PhScsXG4gICAgICAgICdoaS1JTic6ICfgpK7gpYfgpLDgpYcg4KSG4KSm4KWH4KS2JyxcbiAgICAgICAgJ2tvLUtSJzogJ+uCtCDso7zrrLgnLFxuICAgICAgICAnbGItTFUnOiAnTWVuZyBCZXN0ZWxsdW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ01pam4gYmVzdGVsbGluZycsXG4gICAgICAgICdwdC1QVCc6ICdNZXUgcGVkaWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cc0L7QuSDQt9Cw0LrQsNC3JyxcbiAgICAgICAgJ3NsLVNJJzogJ01vaiB1a2F6JyxcbiAgICAgICAgJ3N2LVNFJzogJ01pbiBvcmRlcicsXG4gICAgICAgIHRoOiAn4LiE4Liz4Liq4Lix4LmI4LiH4LiC4Lit4LiH4LiJ4Lix4LiZJyxcbiAgICAgICAgdWs6ICfQnNC+0ZQg0LfQsNC80L7QstC70LXQvdC90Y8nLFxuICAgICAgICAnemgtQ04nOiAn5oiR55qE6K6i5Y2VJyxcbiAgICAgICAgJ3poLVRXJzogJ+aIkeeahOioguWWridcbiAgICB9LFxuICAgICdSZWFkeSB0byBjaGVjayBvdXQ/Jzoge1xuICAgICAgICAnZGUtREUnOiAnQmVyZWl0IHp1bSBBdXNjaGVja2VuPycsXG4gICAgICAgICdlbi1VUyc6ICdSZWFkeSB0byBjaGVjayBvdXQ/JyxcbiAgICAgICAgJ2VzLUVTJzogJ8K/TGlzdG8gcGFyYSBzYWxpcj8nLFxuICAgICAgICBmcjogJ1Byw6p0IMOgIHbDqXJpZmllciA/JyxcbiAgICAgICAgaXQ6ICdQcm9udG8gcGVyIGlsIGNoZWNrLW91dD8nLFxuICAgICAgICBqYTogJ+aUr+aJleOBhOOCkuOBmeOCi+a6luWCmeOBr+OBp+OBjeOBvuOBl+OBn+OBiz8nLFxuICAgICAgICAncm8tUk8nOiAnU3VudGXIm2kgZ2F0YSBzxIMgdml6aXRhyJtpPycsXG4gICAgICAgIGFyOiAn2YfZhCDYo9mG2Kog2KzYp9mH2LIg2YTZhNiq2LPYrNmK2YTYnycsXG4gICAgICAgIGNhOiAnQSBwdW50IHBlciBmZXIgZWwgY2hlY2stb3V0PycsXG4gICAgICAgICdjcy1DWic6ICdKc3RlIHDFmWlwcmF2ZW5pIHNlIHBvZMOtdmF0PycsXG4gICAgICAgICdkYS1ESyc6ICdLbGFyIHRpbCBhdCB0amVra2UgdWQ/JyxcbiAgICAgICAgZWw6ICfOlc6vz4PPhM61IM6tz4TOv865zrzOv865IM6zzrnOsSBjaGVjayBvdXQ7JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkmuClh+CklSDgpIbgpIngpJ8g4KSV4KSw4KSo4KWHIOCkleClhyDgpLLgpL/gpI8g4KSk4KWI4KSv4KS+4KSwIOCkueCliOCkgj8nLFxuICAgICAgICAna28tS1InOiAn7LK07YGs7JWE7JuD7ZWgIOykgOu5hOqwgCDrkJjshajrgpjsmpQ/JyxcbiAgICAgICAgJ2xiLUxVJzogJ1ByZXR0IGZpciB6ZSBjaGVja2VuPycsXG4gICAgICAgICdubC1OTCc6ICdLbGFhciBvbSB1aXQgdGUgY2hlY2tlbj8nLFxuICAgICAgICAncHQtUFQnOiAnUHJvbnRvIHBhcmEgZmluYWxpemFyIGEgY29tcHJhPycsXG4gICAgICAgICdydS1SVSc6ICfQk9C+0YLQvtCy0Ysg0L/RgNC+0LLQtdGA0LjRgtGMPycsXG4gICAgICAgICdzbC1TSSc6ICdTdGUgcHJpcHJhdmxqZW5pIG5hIG9kamF2bz8nLFxuICAgICAgICAnc3YtU0UnOiAnS2xhciBhdHQgY2hlY2thIHV0PycsXG4gICAgICAgIHRoOiAn4Lie4Lij4LmJ4Lit4Lih4LiX4Li14LmI4LiI4Liw4LmA4LiK4LmH4LiE4LmA4Lit4Liy4LiX4LmMPycsXG4gICAgICAgIHVrOiAn0JPQvtGC0L7QstGWINC/0LXRgNC10LLRltGA0LjRgtC4PycsXG4gICAgICAgICd6aC1DTic6ICflh4blpIfpgIDmiL/kuoblkJfvvJ8nLFxuICAgICAgICAnemgtVFcnOiAn5rqW5YKZ6YCA5oi/5LqG5ZeO77yfJ1xuICAgIH0sXG4gICAgaW5mbzoge1xuICAgICAgICAnZGUtREUnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICAnZW4tVVMnOiAnSW5mbycsXG4gICAgICAgICdlcy1FUyc6ICdJbmZvcm1hY2nDs24nLFxuICAgICAgICBmcjogJ0luZm9ybWF0aW9uJyxcbiAgICAgICAgaXQ6ICdJbmZvcm1hemlvbmknLFxuICAgICAgICBqYTogJ+aDheWgsScsXG4gICAgICAgICdyby1STyc6ICdJbmZvcm1hyJtpZScsXG4gICAgICAgIGFyOiAn2YXYudmE2YjZhdipJyxcbiAgICAgICAgY2E6ICdJbmZvcm1hY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdJbmZvcm1hY2UnLFxuICAgICAgICAnZGEtREsnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICBlbDogJ86gzrvOt8+Bzr/Phs6/z4HOr861z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSc4KS+4KSo4KSV4KS+4KSw4KWAJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ygleuztCcsXG4gICAgICAgICdsYi1MVSc6ICdJbmZvcm1hdGlvdW5lbicsXG4gICAgICAgICdubC1OTCc6ICdJbmZvcm1hdGllJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VtIGZvcm1hw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0JjQvdGE0L7RgNC80LDRhtC40Y8nLFxuICAgICAgICAnc2wtU0knOiAnSW5mb3JtYWNpamUnLFxuICAgICAgICAnc3YtU0UnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICB0aDogJ+C4guC5ieC4reC4oeC4ueC4pScsXG4gICAgICAgIHVrOiAn0IbQvdGE0L7RgNC80LDRhtGW0Y8nLFxuICAgICAgICAnemgtQ04nOiAn5L+h5oGvJyxcbiAgICAgICAgJ3poLVRXJzogJ+S/oeaBrydcbiAgICB9LFxuICAgIHBheW1lbnQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ1phaGx1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnUGF5bWVudCcsXG4gICAgICAgICdlcy1FUyc6ICdQYWdvJyxcbiAgICAgICAgZnI6ICdQYWllbWVudCcsXG4gICAgICAgIGl0OiAnUGFnYW1lbnRvJyxcbiAgICAgICAgamE6ICfmlK/miZXjgYQnLFxuICAgICAgICAncm8tUk8nOiAnUGxhdMSDJyxcbiAgICAgICAgYXI6ICfZgtiz2LcnLFxuICAgICAgICBjYTogJ1BhZ2FtZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ1pwxa9zb2IgcGxhdGJ5JyxcbiAgICAgICAgJ2RhLURLJzogJ0JldGFsaW5nJyxcbiAgICAgICAgZWw6ICfOoM67zrfPgc+JzrzOricsXG4gICAgICAgICdoaS1JTic6ICfgpK3gpYHgpJfgpKTgpL7gpKgnLFxuICAgICAgICAna28tS1InOiAn7KeA67aIJyxcbiAgICAgICAgJ2xiLUxVJzogJ0JlenVlbGVuJyxcbiAgICAgICAgJ25sLU5MJzogJ0JldGFsaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1BhZ2FtZW50bycsXG4gICAgICAgICdydS1SVSc6ICfQntC/0LvQsNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnUGxhxI1pbG8nLFxuICAgICAgICAnc3YtU0UnOiAnQmV0YWxuaW5nJyxcbiAgICAgICAgdGg6ICfguIHguLLguKPguIrguLPguKPguLDguYDguIfguLTguJknLFxuICAgICAgICB1azogJ9Ce0L/Qu9Cw0YLQsCcsXG4gICAgICAgICd6aC1DTic6ICfmlK/ku5gnLFxuICAgICAgICAnemgtVFcnOiAn5pSv5LuYJ1xuICAgIH0sXG4gICAgcGVyc29uYWw6IHtcbiAgICAgICAgJ2RlLURFJzogJ1BlcnPDtm5saWNoJyxcbiAgICAgICAgJ2VuLVVTJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgZnI6ICdDb29yZG9ubsOpZXMnLFxuICAgICAgICBpdDogJ1BlcnNvbmFsZScsXG4gICAgICAgIGphOiAn5YCL5Lq6JyxcbiAgICAgICAgJ3JvLVJPJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgYXI6ICfYtNiu2LXZiicsXG4gICAgICAgIGNhOiAnUGVyc29uYWwnLFxuICAgICAgICAnY3MtQ1onOiAnT3NvYm7DrScsXG4gICAgICAgICdkYS1ESyc6ICdQZXJzb25saWcnLFxuICAgICAgICBlbDogJ86gz4HOv8+Dz4nPgM65zrrPjM+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkqOCkv+CknOClgCcsXG4gICAgICAgICdrby1LUic6ICfqsJzsnbjsnZgnLFxuICAgICAgICAnbGItTFUnOiAnUGVyc8OpaW5sZWNoJyxcbiAgICAgICAgJ25sLU5MJzogJ3BlcnNvb25saWprJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Blc3NvYWwnLFxuICAgICAgICAncnUtUlUnOiAn0JvQuNGH0L3QvtC1JyxcbiAgICAgICAgJ3NsLVNJJzogJ09zZWJubycsXG4gICAgICAgICdzdi1TRSc6ICdQZXJzb25saWcnLFxuICAgICAgICB0aDogJ+C4quC5iOC4p+C4meC4leC4seC4pycsXG4gICAgICAgIHVrOiAn0J7RgdC+0LHQuNGB0YLRlicsXG4gICAgICAgICd6aC1DTic6ICfkuKrkurrnmoQnLFxuICAgICAgICAnemgtVFcnOiAn5YCL5Lq655qEJ1xuICAgIH0sXG4gICAgc2hpcHBpbmc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1ZlcnNhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnU2hpcHBpbmcnLFxuICAgICAgICAnZXMtRVMnOiAnRW52aW8nLFxuICAgICAgICBmcjogJ0xpdnJhaXNvbicsXG4gICAgICAgIGl0OiAnU3BlZGl6aW9uZScsXG4gICAgICAgIGphOiAn55m66YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0xpdnJhcmUnLFxuICAgICAgICBhcjogJ9i02K3ZhicsXG4gICAgICAgIGNhOiAnRW52aWFtZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ0xvZG7DrSBkb3ByYXZhJyxcbiAgICAgICAgJ2RhLURLJzogJ0ZvcnNlbmRlbHNlJyxcbiAgICAgICAgZWw6ICfOkc+Azr/Pg8+Ezr/Ou86uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CktuCkv+CkquCkv+CkguCklycsXG4gICAgICAgICdrby1LUic6ICfrsLDshqEnLFxuICAgICAgICAnbGItTFUnOiAnTGl3d2VydW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZlcnplbmRpbmcnLFxuICAgICAgICAncHQtUFQnOiAnRW52aW8nLFxuICAgICAgICAncnUtUlUnOiAn0J/QtdGA0LXQstC+0LfQutC4JyxcbiAgICAgICAgJ3NsLVNJJzogJ0Rvc3RhdmEnLFxuICAgICAgICAnc3YtU0UnOiAnRnJha3QnLFxuICAgICAgICB0aDogJ+C4geC4suC4o+C4quC5iOC4h+C4quC4tOC4meC4hOC5ieC4sicsXG4gICAgICAgIHVrOiAn0JTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfoiLnov5AnLFxuICAgICAgICAnemgtVFcnOiAn6Ii56YGLJ1xuICAgIH0sXG4gICAgYmlsbGluZzoge1xuICAgICAgICAnZGUtREUnOiAnUmVjaG51bmdzYWRyZXNzZScsXG4gICAgICAgICdlbi1VUyc6ICdCaWxsaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ0RpcmVjY2nDs24gZGUgZmFjdHVyYWNpw7NuJyxcbiAgICAgICAgZnI6ICdBZHJlc3NlIGRlIGZhY3R1cmF0aW9uJyxcbiAgICAgICAgaXQ6ICdJbmRpcml6em8gZGkgZmF0dHVyYXppb25lJyxcbiAgICAgICAgamE6ICfoq4vmsYInLFxuICAgICAgICAncm8tUk8nOiAnRmFjdHVyYXJlJyxcbiAgICAgICAgYXI6ICfYp9mE2YHZiNin2KrZitixJyxcbiAgICAgICAgY2E6ICdGYWN0dXJhY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdGYWt0dXJhY2UnLFxuICAgICAgICAnZGEtREsnOiAnRmFrdHVyZXJpbmcnLFxuICAgICAgICBlbDogJ86nz4HOrc+Jz4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpKzgpL/gpLLgpL/gpILgpJcnLFxuICAgICAgICAna28tS1InOiAn7LKt6rWsJyxcbiAgICAgICAgJ2xiLUxVJzogJ1JlY2hudW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ0ZhY3R1cmVyaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0NvYnJhbsOnYScsXG4gICAgICAgICdydS1SVSc6ICfQkdC40LvQu9C40L3QsycsXG4gICAgICAgICdzbC1TSSc6ICdPYnJhxI11bmF2YW5qZScsXG4gICAgICAgICdzdi1TRSc6ICdGYWt0dXJlcmluZycsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LmA4Lij4Li14Lii4LiB4LmA4LiB4LmH4Lia4LmA4LiH4Li04LiZJyxcbiAgICAgICAgdWs6ICfQktC40YHRgtCw0LLQu9C10L3QvdGPINGA0LDRhdGD0L3QutGW0LInLFxuICAgICAgICAnemgtQ04nOiAn6K6h6LS5JyxcbiAgICAgICAgJ3poLVRXJzogJ+ioiOiyuydcbiAgICB9LFxuICAgIGNvbnRpbnVlOiB7XG4gICAgICAgICdkZS1ERSc6ICdXZWl0ZXInLFxuICAgICAgICAnZW4tVVMnOiAnQ29udGludWUnLFxuICAgICAgICAnZXMtRVMnOiAnQ29udGludWFyJyxcbiAgICAgICAgZnI6ICdDb250aW51ZXonLFxuICAgICAgICBpdDogJ0NvbnRpbnVhJyxcbiAgICAgICAgamE6ICfntprjgY3jgbgnLFxuICAgICAgICAncm8tUk8nOiAnQ29udGludWEnLFxuICAgICAgICBhcjogJ9mK2YPZhdmEJyxcbiAgICAgICAgY2E6ICdDb250aW51YScsXG4gICAgICAgICdjcy1DWic6ICdQb2tyYcSNb3ZhdCcsXG4gICAgICAgICdkYS1ESyc6ICdCbGl2ZSB2ZWQnLFxuICAgICAgICBlbDogJ86dzrEgz4PPhc69zrXPh86vz4POtc65JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CknOCkvuCksOClgCDgpLDgpJbgpKjgpL4nLFxuICAgICAgICAna28tS1InOiAn6rOE7IaN7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJ0Z1ZXJ0IHdlaWRlcicsXG4gICAgICAgICdubC1OTCc6ICdEb29yZ2FhbiBtZXQnLFxuICAgICAgICAncHQtUFQnOiAnUHJvc3NlZ3VpcicsXG4gICAgICAgICdydS1SVSc6ICfQn9GA0L7QtNC+0LvQttCw0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICdOYWRhbGp1aicsXG4gICAgICAgICdzdi1TRSc6ICdGb3J0c8OkdHRhJyxcbiAgICAgICAgdGg6ICfguJTguLPguYDguJnguLTguJnguIHguLLguKPguJXguYjguK0nLFxuICAgICAgICB1azogJ9Cf0YDQvtC00L7QstC20LjRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+e7p+e7rScsXG4gICAgICAgICd6aC1UVyc6ICfnubznuownXG4gICAgfSxcbiAgICAnU2VjdXJlZCBieSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0dlc2ljaGVydCBkdXJjaCAnLFxuICAgICAgICAnZW4tVVMnOiAnU2VjdXJlZCBieScsXG4gICAgICAgICdlcy1FUyc6ICdQcm90ZWdpZG8gcG9yJyxcbiAgICAgICAgZnI6ICdTw6ljdXJpc8OpIHBhcicsXG4gICAgICAgIGl0OiAnUHJvdGV0dG8gZGEnLFxuICAgICAgICBqYTogJ+S/neitt+OBleOCjOOBpuOBhOOBvuOBmScsXG4gICAgICAgICdyby1STyc6ICdHYXJhbnRhdCBkZScsXG4gICAgICAgIGFyOiAn2KjYttmF2KfZhicsXG4gICAgICAgIGNhOiAnR2FyYW50aXQgcGVyJyxcbiAgICAgICAgJ2NzLUNaJzogJ1phamnFoXTEm25vJyxcbiAgICAgICAgJ2RhLURLJzogJ1Npa3JldCBhZicsXG4gICAgICAgIGVsOiAnzpXOvs6xz4PPhs6xzrvOr862zrXPhM6xzrkgzrHPgM+MJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckh+CkuOCkleClhyDgpJzgpLDgpL/gpI8g4KS44KWB4KSw4KSV4KWN4KS34KS/4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uztOyViCcsXG4gICAgICAgICdsYi1MVSc6ICdHZXPDqWNoZXJ0IHZ1bicsXG4gICAgICAgICdubC1OTCc6ICdCZXZlaWxpZ2QgZG9vcicsXG4gICAgICAgICdwdC1QVCc6ICdBc3NlZ3VyYWRvIHBvcicsXG4gICAgICAgICdydS1SVSc6ICfQntCx0LXRgdC/0LXRh9C10L3QvicsXG4gICAgICAgICdzbC1TSSc6ICdaYXZhcm92YW5vIHMnLFxuICAgICAgICAnc3YtU0UnOiAnU8Oka3JhZCBhdicsXG4gICAgICAgIHRoOiAn4Lib4Lil4Lit4LiU4Lig4Lix4Lii4LmC4LiU4LiiJyxcbiAgICAgICAgdWs6ICfQl9Cw0LHQtdC30L/QtdGH0YPRlNGC0YzRgdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+aLheS/neS6uicsXG4gICAgICAgICd6aC1UVyc6ICfmk5Tkv53kuronXG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICAgICdkZS1ERSc6ICdLYXNzZSB2ZXJsYXNzZW4nLFxuICAgICAgICAnZW4tVVMnOiAnRXhpdCBDaGVja291dCcsXG4gICAgICAgICdlcy1FUyc6ICdTYWxpciBkZSBsYSBjYWphJyxcbiAgICAgICAgZnI6ICdRdWl0dGVyJyxcbiAgICAgICAgaXQ6ICdFc2NpIGRhbCBjaGVja291dCcsXG4gICAgICAgIGphOiAn5pSv5omV44GE44KS57WC5LqGJyxcbiAgICAgICAgJ3JvLVJPJzogJ8OObmFwb2kgbGEgcGFnaW5hIHByb2R1c3VsdWknLFxuICAgICAgICBhcjogJ9in2YTYrtix2YjYrCDZhdmGINin2YTYrtix2YjYrCcsXG4gICAgICAgIGNhOiAnU3VydCBkZSBHb29nbGUgQ2hlY2tvdXQnLFxuICAgICAgICAnY3MtQ1onOiAnVWtvbsSNaXQgcG9rbGFkbnUnLFxuICAgICAgICAnZGEtREsnOiAnQWZzbHV0IENoZWNrb3V0JyxcbiAgICAgICAgZWw6ICfOiM6+zr/OtM6/z4IgzrHPgM+MIM+Ezr8gz4TOsc68zrXOr86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkmuClh+CkleCkhuCkieCknyDgpLjgpYcg4KSs4KS+4KS54KSwIOCkqOCkv+CkleCksuClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfssrTtgazslYTsm4Mg7KKF66OMJyxcbiAgICAgICAgJ2xiLUxVJzogJ0V4aXQgQ2hlY2tvdXQnLFxuICAgICAgICAnbmwtTkwnOiAnQWZyZWtlbmVuIGFmc2x1aXRlbicsXG4gICAgICAgICdwdC1QVCc6ICdTYWlyIGRvIGNoZWNrb3V0JyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0YvQudGC0Lgg0LjQtyDQutCw0YHRgdGLJyxcbiAgICAgICAgJ3NsLVNJJzogJ1phcHJpdGUgQ2hlY2tvdXQnLFxuICAgICAgICAnc3YtU0UnOiAnQXZzbHV0YSBrYXNzYW4nLFxuICAgICAgICB0aDogJ+C4reC4reC4geC4iOC4suC4geC4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4mScsXG4gICAgICAgIHVrOiAn0JLQuNC50YLQuCDQtyBDaGVja291dCcsXG4gICAgICAgICd6aC1DTic6ICfpgIDlh7rnu5PluJAnLFxuICAgICAgICAnemgtVFcnOiAn6YCA5Ye657WQ5bizJ1xuICAgIH0sXG4gICAgJ09yZGVyIHN1bW1hcnknOiB7XG4gICAgICAgICdkZS1ERSc6ICdCZXN0ZWxsenVzYW1tZW5mYXNzdW5nJyxcbiAgICAgICAgJ2VuLVVTJzogJ09yZGVyIHN1bW1hcnknLFxuICAgICAgICAnZXMtRVMnOiAnUmVzdW1lbiBkZWwgcGVkaWRvJyxcbiAgICAgICAgZnI6ICdSw6ljYXBpdHVsYXRpZiBkZSBsYSBjb21tYW5kZScsXG4gICAgICAgIGl0OiAnUmllcGlsb2dvIGRlbGxcXCdvcmRpbmUnLFxuICAgICAgICBqYTogJ+azqOaWh+OBruamguimgScsXG4gICAgICAgICdyby1STyc6ICdSZXp1bWF0IENvbWFuZMSDJyxcbiAgICAgICAgYXI6ICfZhdmE2K7YtSDYp9mE2LfZhNioJyxcbiAgICAgICAgY2E6ICdSZXN1bSBkZSBsYSBjb21hbmRhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1DFmWVobGVkIG9iamVkbsOhdmt5JyxcbiAgICAgICAgJ2RhLURLJzogJ09yZHJlc2FtbWVuZHJhZycsXG4gICAgICAgIGVsOiAnzqDOtc+Bzq/Ou863z4jOtyDPgM6xz4HOsc6zzrPOtc67zq/Osc+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkpuClh+CktiDgpLjgpL7gpLDgpL7gpILgpLYnLFxuICAgICAgICAna28tS1InOiAn7KO866y4IOyalOyVvScsXG4gICAgICAgICdsYi1MVSc6ICdVZXJkbnVuZyBSZXN1bcOpJyxcbiAgICAgICAgJ25sLU5MJzogJ092ZXJ6aWNodCB2YW4gZGUgYmVzdGVsbGluZycsXG4gICAgICAgICdwdC1QVCc6ICdSZXN1bW8gZG8gcGVkaWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CY0YLQvtCzINC30LDQutCw0LfQsCcsXG4gICAgICAgICdzbC1TSSc6ICdQb3Z6ZXRlayBuYXJvxI1pbGEnLFxuICAgICAgICAnc3YtU0UnOiAnT3JkZXJzYW1tYW5mYXR0bmluZycsXG4gICAgICAgIHRoOiAn4Liq4Lij4Li44Lib4LiE4Liz4Liq4Lix4LmI4LiH4LiL4Li34LmJ4LitJyxcbiAgICAgICAgdWs6ICfQn9GW0LTRgdGD0LzQvtC6INCX0LDQvNC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+iuouWNleaRmOimgScsXG4gICAgICAgICd6aC1UVyc6ICfoqILllq7mkZjopoEnXG4gICAgfSxcbiAgICBzdWJ0b3RhbDoge1xuICAgICAgICAnZGUtREUnOiAnWndpc2NoZW5zdW1tZScsXG4gICAgICAgICdlbi1VUyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgICdlcy1FUyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgIGZyOiAnU291cy10b3RhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlIHBhcnppYWxlJyxcbiAgICAgICAgamE6ICflsI/oqIgnLFxuICAgICAgICAncm8tUk8nOiAnU3VidG90YWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5INin2YTZgdix2LnZiicsXG4gICAgICAgIGNhOiAnU3VidG90YWwnLFxuICAgICAgICAnY3MtQ1onOiAnTWV6aXNvdcSNZXQnLFxuICAgICAgICAnZGEtREsnOiAnU3VidG90YWwnLFxuICAgICAgICBlbDogJ86czpXOoc6ZzprOnyDOo86lzp3On86bzp8nLFxuICAgICAgICAnaGktSU4nOiAn4KSJ4KSqLeCkr+Cli+CklycsXG4gICAgICAgICdrby1LUic6ICfshozqs4QnLFxuICAgICAgICAnbGItTFUnOiAnU3VidG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnU3VidG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1N1YnRvdGFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtC80LXQttGD0YLQvtGH0L3Ri9C5INC40YLQvtCzJyxcbiAgICAgICAgJ3NsLVNJJzogJ1ZtZXNuaSBzZcWhdGV2ZWsnLFxuICAgICAgICAnc3YtU0UnOiAnRGVsc3VtbWEnLFxuICAgICAgICB0aDogJ+C4ouC4reC4lOC4o+C4p+C4oScsXG4gICAgICAgIHVrOiAn0J/RgNC+0LzRltC20L3QuNC5INC/0ZbQtNGB0YPQvNC+0LonLFxuICAgICAgICAnemgtQ04nOiAn5bCP6K6hJyxcbiAgICAgICAgJ3poLVRXJzogJ+Wwj+ioiCdcbiAgICB9LFxuICAgIHRheDoge1xuICAgICAgICAnZGUtREUnOiAnU3RldWVyJyxcbiAgICAgICAgJ2VuLVVTJzogJ1RheCcsXG4gICAgICAgICdlcy1FUyc6ICdJbXB1ZXN0bycsXG4gICAgICAgIGZyOiAnSW1ww7R0JyxcbiAgICAgICAgaXQ6ICdUYXNzYScsXG4gICAgICAgIGphOiAn56iOJyxcbiAgICAgICAgJ3JvLVJPJzogJ0ltcG96aXQnLFxuICAgICAgICBhcjogJ9i22LHZitio2KknLFxuICAgICAgICBjYTogJ0ltcG9zdG9zJyxcbiAgICAgICAgJ2NzLUNaJzogJ0RhxYgnLFxuICAgICAgICAnZGEtREsnOiAnU2thdCcsXG4gICAgICAgIGVsOiAnzqbPjM+Bzr/PgicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpLAnLFxuICAgICAgICAna28tS1InOiAn7IS4JyxcbiAgICAgICAgJ2xiLUxVJzogJ1N0ZWllcicsXG4gICAgICAgICdubC1OTCc6ICdCZWxhc3RpbmcnLFxuICAgICAgICAncHQtUFQnOiAnSW1wb3N0bycsXG4gICAgICAgICdydS1SVSc6ICfQndCw0LvQvtCzJyxcbiAgICAgICAgJ3NsLVNJJzogJ0RhdmVrJyxcbiAgICAgICAgJ3N2LVNFJzogJ0Jlc2thdHRhJyxcbiAgICAgICAgdGg6ICfguKDguLLguKnguLUnLFxuICAgICAgICB1azogJ9Cf0L7QtNCw0YLQvtC6JyxcbiAgICAgICAgJ3poLUNOJzogJ+eojicsXG4gICAgICAgICd6aC1UVyc6ICfnqIUnXG4gICAgfSxcbiAgICB0b3RhbDoge1xuICAgICAgICAnZGUtREUnOiAnR2VzYW10JyxcbiAgICAgICAgJ2VuLVVTJzogJ1RvdGFsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1RvdGFsJyxcbiAgICAgICAgZnI6ICdUb3RhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlJyxcbiAgICAgICAgamE6ICflkIjoqIgnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5JyxcbiAgICAgICAgY2E6ICdUb3RhbCcsXG4gICAgICAgICdjcy1DWic6ICdDZWxrb3bDvScsXG4gICAgICAgICdkYS1ESyc6ICdpIGFsdCcsXG4gICAgICAgIGVsOiAnzqPPjc69zr/Ou86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleClgeCksicsXG4gICAgICAgICdrby1LUic6ICfstJ0nLFxuICAgICAgICAnbGItTFUnOiAnSW5zZ2VzYW10JyxcbiAgICAgICAgJ25sLU5MJzogJ1RvdGFhbCcsXG4gICAgICAgICdwdC1QVCc6ICdUb3RhbCcsXG4gICAgICAgICdydS1SVSc6ICfQntCx0YnQuNC5JyxcbiAgICAgICAgJ3NsLVNJJzogJ1NrdXBhaicsXG4gICAgICAgICdzdi1TRSc6ICdUb3RhbCcsXG4gICAgICAgIHRoOiAn4Lij4Lin4LihJyxcbiAgICAgICAgdWs6ICfQktGB0YzQvtCz0L4nLFxuICAgICAgICAnemgtQ04nOiAn5YWo6YOo55qEJyxcbiAgICAgICAgJ3poLVRXJzogJ+WFqOmDqOeahCdcbiAgICB9LFxuICAgIGNvdXBvbjoge1xuICAgICAgICAnZGUtREUnOiAnQ291cG9uJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NvdXBvbicsXG4gICAgICAgICdlcy1FUyc6ICdDdXDDs24nLFxuICAgICAgICBmcjogJ0NvdXBvbicsXG4gICAgICAgIGl0OiAnQ291cG9uJyxcbiAgICAgICAgamE6ICfjgq/jg7zjg53jg7MnLFxuICAgICAgICAncm8tUk8nOiAnQ3Vwb24nLFxuICAgICAgICBhcjogJ9mC2LPZitmF2KknLFxuICAgICAgICBjYTogJ0N1cMOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ0t1cMOzbicsXG4gICAgICAgICdkYS1ESyc6ICdLdXBvbicsXG4gICAgICAgIGVsOiAnzprOv8+Fz4DPjM69zrknLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWC4KSq4KSoJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y/oO2PsCcsXG4gICAgICAgICdsYi1MVSc6ICdDb3Vwb24nLFxuICAgICAgICAnbmwtTkwnOiAnQ291cG9uJyxcbiAgICAgICAgJ3B0LVBUJzogJ0N1cG9tJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0YPQv9C+0L0nLFxuICAgICAgICAnc2wtU0knOiAnS3Vwb24nLFxuICAgICAgICAnc3YtU0UnOiAnS3Vwb25nJyxcbiAgICAgICAgdGg6ICfguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9Ca0YPQv9C+0L0nLFxuICAgICAgICAnemgtQ04nOiAn5LyY5oOg5Yi4JyxcbiAgICAgICAgJ3poLVRXJzogJ+WEquaDoOWIuCdcbiAgICB9LFxuICAgICdDb3Vwb24gY29kZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0d1dHNjaGVpbmNvZGUnLFxuICAgICAgICAnZW4tVVMnOiAnQ291cG9uIGNvZGUnLFxuICAgICAgICAnZXMtRVMnOiAnQ8OzZGlnbyBwcm9tb2Npb25hbCcsXG4gICAgICAgIGZyOiAnQ29kZSBkZSBjb3Vwb24nLFxuICAgICAgICBpdDogJ0NvZGljZSBjb3Vwb24nLFxuICAgICAgICBqYTogJ+OCr+ODvOODneODs+OCs+ODvOODiScsXG4gICAgICAgICdyby1STyc6ICdDb2QgY3Vwb24nLFxuICAgICAgICBhcjogJ9ix2YXYsiDYp9mE2YPZiNio2YjZhicsXG4gICAgICAgIGNhOiAnQ29kaSBkZSBjdXDDsycsXG4gICAgICAgICdjcy1DWic6ICdLw7NkIGt1cMOzbnUnLFxuICAgICAgICAnZGEtREsnOiAnS3Vwb25rb2RlJyxcbiAgICAgICAgZWw6ICfOms+JzrTOuc66z4zPgiDOus6/z4XPgM6/zr3Ouc6/z40nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWC4KSq4KSoIOCkleCli+CkoScsXG4gICAgICAgICdrby1LUic6ICfsv6Dtj7Ag7L2U65OcJyxcbiAgICAgICAgJ2xiLUxVJzogJ0NvdXBvbiBDb2RlJyxcbiAgICAgICAgJ25sLU5MJzogJ0NvdXBvbiBjb2RlJyxcbiAgICAgICAgJ3B0LVBUJzogJ0PDs2RpZ28gZG8gY3Vwb20nLFxuICAgICAgICAncnUtUlUnOiAn0JrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdLb2RhIGt1cG9uYScsXG4gICAgICAgICdzdi1TRSc6ICdLdXBvbmdza29kJyxcbiAgICAgICAgdGg6ICfguKPguKvguLHguKrguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9Ca0L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5LyY5oOg5Y235Y+356CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+WEquaDoOWNt+iZn+eivCdcbiAgICB9LFxuICAgICdZb3UgZW50ZXJlZCBhbiBpbnZhbGlkIGNvdXBvbiBjb2RlJzoge1xuICAgICAgICAnZGUtREUnOiAnU2llIGhhYmVuIGVpbmVuIHVuZ8O8bHRpZ2VuIEd1dHNjaGVpbmNvZGUgZWluZ2VnZWJlbicsXG4gICAgICAgICdlbi1VUyc6ICdZb3UgZW50ZXJlZCBhbiBpbnZhbGlkIGNvdXBvbiBjb2RlJyxcbiAgICAgICAgJ2VzLUVTJzogJ0luZ3Jlc2FzdGUgdW4gY8OzZGlnbyBkZSBjdXDDs24gbm8gdsOhbGlkbycsXG4gICAgICAgIGZyOiAnVm91cyBhdmV6IGVudHLDqSB1biBjb2RlIGRlIGNvdXBvbiBub24gdmFsaWRlJyxcbiAgICAgICAgaXQ6ICdIYWkgaW5zZXJpdG8gdW4gY29kaWNlIGNvdXBvbiBub24gdmFsaWRvJyxcbiAgICAgICAgamE6ICfnhKHlirnjgarjgq/jg7zjg53jg7PjgrPjg7zjg4njgpLlhaXlipvjgZfjgb7jgZfjgZ8nLFxuICAgICAgICAncm8tUk8nOiAnQcibaSBpbnRyb2R1cyB1biBjb2QgZGUgY3Vwb24gbmV2YWxpZCcsXG4gICAgICAgIGFyOiAn2YTZgtivINij2K/YrtmE2Kog2LHZhdiyINmC2LPZitmF2Kkg2LrZitixINi12KfZhNitJyxcbiAgICAgICAgY2E6ICdIZXUgaW50cm9kdcOvdCB1biBjb2RpIGRlIGN1cMOzIG5vIHbDoGxpZCcsXG4gICAgICAgICdjcy1DWic6ICdaYWRhbGkganN0ZSBuZXBsYXRuw70ga8OzZCBrdXDDs251JyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGhhciBpbmR0YXN0ZXQgZW4gdWd5bGRpZyBrdXBvbmtvZGUnLFxuICAgICAgICBlbDogJ86azrHPhM6xz4fPic+Bzq/Pg86xz4TOtSDOrc69zrHOvSDOvM63IM6tzrPOus+Fz4HOvyDOus+JzrTOuc66z4wgzrrOv8+Fz4DOv869zrnOv8+NJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkquCkqOClhyDgpI/gpJUg4KSF4KSu4KS+4KSo4KWN4KSvIOCkleClguCkquCkqCDgpJXgpYvgpKEg4KSm4KSw4KWN4KScIOCkleCkv+Ckr+CkviDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6Y66q765CcIOy/oO2PsCDsvZTrk5zrpbwg7J6F66Cl7ZaI7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdEaXIgaHV0dCBlbiBvbmfDq2x0ZWdlIENvdXBvbmNvZGUgYWdpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnVSBoZWVmdCBlZW4gb25nZWxkaWdlIGNvdXBvbmNvZGUgaW5nZXZvZXJkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ZvY8OqIGluc2VyaXUgdW0gY8OzZGlnbyBkZSBjdXBvbSBpbnbDoWxpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0JLRiyDQstCy0LXQu9C4INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdWbmVzbGkgc3RlIG5ldmVsamF2bm8ga29kbyBrdXBvbmEnLFxuICAgICAgICAnc3YtU0UnOiAnRHUgaGFyIGFuZ2V0dCBlbiBvZ2lsdGlnIGt1cG9uZ2tvZCcsXG4gICAgICAgIHRoOiAn4LiE4Li44LiT4Lib4LmJ4Lit4LiZ4Lij4Lir4Lix4Liq4LiE4Li54Lib4Lit4LiH4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHJyxcbiAgICAgICAgdWs6ICfQktC4INCy0LLQtdC70Lgg0L3QtdC00ZbQudGB0L3QuNC5INC60L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5oKo6L6T5YWl5LqG5peg5pWI55qE5LyY5oOg5Yi45Luj56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+aCqOi8uOWFpeS6hueEoeaViOeahOWEquaDoOWIuOS7o+eivCdcbiAgICB9LFxuICAgIGFwcGx5OiB7XG4gICAgICAgICdkZS1ERSc6ICdFaW5sw7ZzZW4nLFxuICAgICAgICAnZW4tVVMnOiAnQXBwbHknLFxuICAgICAgICAnZXMtRVMnOiAnQXBsaWNhcicsXG4gICAgICAgIGZyOiAnQXBwbGlxdWVyJyxcbiAgICAgICAgaXQ6ICdBcHBsaWNhcmUnLFxuICAgICAgICBqYTogJ+eUs+i+vOOBvycsXG4gICAgICAgICdyby1STyc6ICdBcGxpY2EnLFxuICAgICAgICBhcjogJ9iq2LfYqNmK2YInLFxuICAgICAgICBjYTogJ0FwbGljYXInLFxuICAgICAgICAnY3MtQ1onOiAnQXBsaWtvdmF0JyxcbiAgICAgICAgJ2RhLURLJzogJ2Fuc8O4Z2UnLFxuICAgICAgICBlbDogJ86Zz4PPh8+Nzr/Phc69JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CksuCkvuCkl+ClgiDgpJXgpLDgpKjgpL4nLFxuICAgICAgICAna28tS1InOiAn7KCB7Jqp7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJ0fDq2xsZScsXG4gICAgICAgICdubC1OTCc6ICdWYW4gdG9lcGFzc2luZyB6aWpuJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FwbGljYXInLFxuICAgICAgICAncnUtUlUnOiAn0J/QvtC00LDRgtGMINC30LDRj9Cy0LvQtdC90LjQtScsXG4gICAgICAgICdzbC1TSSc6ICdVcG9yYWJpJyxcbiAgICAgICAgJ3N2LVNFJzogJ1RpbGzDpG1wYScsXG4gICAgICAgIHRoOiAn4LiZ4Liz4Lih4Liy4LmD4LiK4LmJJyxcbiAgICAgICAgdWs6ICfQl9Cw0YHRgtC+0YHRg9Cy0LDRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+eUs+ivtycsXG4gICAgICAgICd6aC1UVyc6ICfnlLPoq4snXG4gICAgfSxcbiAgICAnZ2lmdC1jYXJkJzoge1xuICAgICAgICAnZGUtREUnOiAnR2VzY2hlbmtrYXJ0ZScsXG4gICAgICAgICdlbi1VUyc6ICdHaWZ0IGNhcmQnLFxuICAgICAgICAnZXMtRVMnOiAnVGFyamV0YSBkZSByZWdhbG8nLFxuICAgICAgICBmcjogJ0NhcnRlIGNhZGVhdScsXG4gICAgICAgIGl0OiAnQ2FydGEgcmVnYWxvJyxcbiAgICAgICAgamE6ICfjgq7jg5Xjg4jjgqvjg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnQ2FyZCBjYWRvdScsXG4gICAgICAgIGFyOiAn2YPYsdiqINmH2K/ZitipJyxcbiAgICAgICAgY2E6ICdUYXJnZXRhIHJlZ2FsJyxcbiAgICAgICAgJ2NzLUNaJzogJ0TDoXJrb3bDoSBwb3Vrw6F6a2EnLFxuICAgICAgICAnZGEtREsnOiAnR2F2ZWtvcnQnLFxuICAgICAgICBlbDogJ86Uz4nPgc6/zrrOrM+Bz4TOsScsXG4gICAgICAgICdoaS1JTic6ICfgpIngpKrgpLngpL7gpLAg4KSq4KSk4KWN4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS2FkZG9rYWFydCcsXG4gICAgICAgICdubC1OTCc6ICdDYWRlYXVrYWFydCcsXG4gICAgICAgICdwdC1QVCc6ICdDYXJ0w6NvIFByZXNlbnRlJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7QtNCw0YDQvtGH0L3QsNGPINC60LDRgNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnRGFyaWxuZSBrYXJ0aWNlJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ByZXNlbnQga29ydCcsXG4gICAgICAgIHRoOiAn4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNJyxcbiAgICAgICAgdWs6ICfQn9C+0LTQsNGA0YPQvdC60L7QstCwINC60LDRgNGC0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfnpLznianljaEnLFxuICAgICAgICAnemgtVFcnOiAn56au54mp5Y2hJ1xuICAgIH0sXG4gICAgJ0dpZnQgY2FyZCBudW1iZXInOiB7XG4gICAgICAgICdkZS1ERSc6ICdHZXNjaGVua2thcnRlbm51bW1lcicsXG4gICAgICAgICdlbi1VUyc6ICdHaWZ0IGNhcmQgbnVtYmVyJyxcbiAgICAgICAgJ2VzLUVTJzogJ051bWVybyBkZSB0YXJqZXRhIGRlIHJlZ2FsbycsXG4gICAgICAgIGZyOiAnTnVtw6lybyBkZSBsYSBjYXJ0ZS1jYWRlYXUnLFxuICAgICAgICBpdDogJ051bWVybyBkZWxsYSBjYXJ0YSByZWdhbG8nLFxuICAgICAgICBqYTogJ+OCruODleODiOOCq+ODvOODieeVquWPtycsXG4gICAgICAgICdyby1STyc6ICdOdW3Eg3J1bCBjYXJkdWx1aSBjYWRvdScsXG4gICAgICAgIGFyOiAn2LHZgtmFINio2LfYp9mC2Kkg2KfZhNmH2K/ZitipJyxcbiAgICAgICAgY2E6ICdOw7ptZXJvIGRlIHRhcmdldGEgcmVnYWwnLFxuICAgICAgICAnY3MtQ1onOiAnxIzDrXNsbyBkw6Fya292w6kga2FydHknLFxuICAgICAgICAnZGEtREsnOiAnR2F2ZWtvcnRudW1tZXInLFxuICAgICAgICBlbDogJ86Rz4HOuc64zrzPjM+CIM60z4nPgc6/zrrOrM+Bz4TOsc+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckl+Ckv+Ckq+CljeCknyDgpJXgpL7gpLDgpY3gpKEg4KSo4KSC4KSs4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wg67KI7Zi4JyxcbiAgICAgICAgJ2xiLUxVJzogJ0dlc2NoZW5ra2FhcnQgTnVtbWVyJyxcbiAgICAgICAgJ25sLU5MJzogJ0NhZGVhdWthYXJ0bnVtbWVyJyxcbiAgICAgICAgJ3B0LVBUJzogJ07Dum1lcm8gZG8gY2FydMOjby1wcmVzZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQndC+0LzQtdGAINC/0L7QtNCw0YDQvtGH0L3QvtC5INC60LDRgNGC0YsnLFxuICAgICAgICAnc2wtU0knOiAnxaB0ZXZpbGthIGRhcmlsbmUga2FydGljZScsXG4gICAgICAgICdzdi1TRSc6ICdQcmVzZW50a29ydG51bW1lcicsXG4gICAgICAgIHRoOiAn4Lir4Lih4Liy4Lii4LmA4Lil4LiC4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNJyxcbiAgICAgICAgdWs6ICfQndC+0LzQtdGAINC/0L7QtNCw0YDRg9C90LrQvtCy0L7RlyDQutCw0YDRgtC60LgnLFxuICAgICAgICAnemgtQ04nOiAn56S85ZOB5Y2h5Y+3JyxcbiAgICAgICAgJ3poLVRXJzogJ+emruWTgeWNoeiZnydcbiAgICB9LFxuICAgICdZb3UgZW50ZXJlZCBhbiBpbnZhbGlkIGdpZnQgY2FyZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1NpZSBoYWJlbiBlaW5lIHVuZ8O8bHRpZ2UgR2VzY2hlbmtrYXJ0ZSBlaW5nZWdlYmVuJyxcbiAgICAgICAgJ2VuLVVTJzogJ1lvdSBlbnRlcmVkIGFuIGludmFsaWQgZ2lmdCBjYXJkJyxcbiAgICAgICAgJ2VzLUVTJzogJ0luZ3Jlc2FzdGUgdW5hIHRhcmpldGEgZGUgcmVnYWxvIG5vIHbDoWxpZGEnLFxuICAgICAgICBmcjogJ1ZvdXMgYXZleiBlbnRyw6kgdW5lIGNhcnRlLWNhZGVhdSBub24gdmFsaWRlJyxcbiAgICAgICAgaXQ6ICdIYWkgaW5zZXJpdG8gdW5hIGNhcnRhIHJlZ2FsbyBub24gdmFsaWRhJyxcbiAgICAgICAgamE6ICfnhKHlirnjgarjgq7jg5Xjg4jjgqvjg7zjg4njgpLlhaXlipvjgZfjgb7jgZfjgZ8nLFxuICAgICAgICAncm8tUk8nOiAnQcibaSBpbnRyb2R1cyB1biBjYXJkIGNhZG91IG5ldmFsaWQnLFxuICAgICAgICBhcjogJ9mE2YLYryDYo9iv2K7ZhNiqINio2LfYp9mC2Kkg2YfYr9in2YrYpyDYutmK2LEg2LXYp9mE2K3YqScsXG4gICAgICAgIGNhOiAnSGV1IGludHJvZHXDr3QgdW5hIHRhcmdldGEgcmVnYWwgbm8gdsOgbGlkYScsXG4gICAgICAgICdjcy1DWic6ICdaYWRhbGkganN0ZSBuZXBsYXRub3UgZMOhcmtvdm91IGthcnR1JyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGhhciBpbmR0YXN0ZXQgZXQgdWd5bGRpZ3QgZ2F2ZWtvcnQnLFxuICAgICAgICBlbDogJ86azrHPhM6xz4fPic+Bzq/Pg86xz4TOtSDOvM65zrEgzrzOtyDOrc6zzrrPhc+BzrcgzrTPic+Bzr/Ous6sz4HPhM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkquCkqOClhyDgpI/gpJUg4KSF4KSu4KS+4KSo4KWN4KSvIOCkieCkquCkueCkvuCksCDgpJXgpL7gpLDgpY3gpKEg4KSm4KSw4KWN4KScIOCkleCkv+Ckr+CkviDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6Y66q765CcIOq4sO2UhO2KuCDsubTrk5zrpbwg7J6F66Cl7ZaI7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdEaXIgaHV0dCBlbmcgb25nw6tsdGVnIEthZGRva2FhcnQgYWdpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnSmUgaGVidCBlZW4gb25nZWxkaWdlIGNhZGVhdWJvbiBpbmdldm9lcmQnLFxuICAgICAgICAncHQtUFQnOiAnVm9jw6ogaW5zZXJpdSB1bSB2YWxlLXByZXNlbnRlIGludsOhbGlkbycsXG4gICAgICAgICdydS1SVSc6ICfQktGLINCy0LLQtdC70Lgg0L3QtdC00LXQudGB0YLQstC40YLQtdC70YzQvdGD0Y4g0L/QvtC00LDRgNC+0YfQvdGD0Y4g0LrQsNGA0YLRgycsXG4gICAgICAgICdzbC1TSSc6ICdWbmVzbGkgc3RlIG5ldmVsamF2bm8gZGFyaWxubyBrYXJ0aWNvJyxcbiAgICAgICAgJ3N2LVNFJzogJ0R1IGhhciBhbmdldHQgZXR0IG9naWx0aWd0IHByZXNlbnRrb3J0JyxcbiAgICAgICAgdGg6ICfguITguLjguJPguJvguYnguK3guJnguJrguLHguJXguKPguILguK3guIfguILguKfguLHguI3guJfguLXguYjguYTguKHguYjguJbguLnguIHguJXguYnguK3guIcnLFxuICAgICAgICB1azogJ9CS0Lgg0LLQstC10LvQuCDQvdC10LTRltC50YHQvdGDINC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDJyxcbiAgICAgICAgJ3poLUNOJzogJ+aCqOi+k+WFpeS6huaXoOaViOeahOekvOWTgeWNoScsXG4gICAgICAgICd6aC1UVyc6ICfmgqjovLjlhaXkuobnhKHmlYjnmoTnpq7lk4HljaEnXG4gICAgfSxcbiAgICAnZ2lmdC1jYXJkLWFscmVhZHktYXBwbGllZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0RpZXNlIEdlc2NoZW5ra2FydGUgd3VyZGUgYmVyZWl0cyBhbmdld2VuZGV0LicsXG4gICAgICAgICdlbi1VUyc6ICdUaGlzIGdpZnQgY2FyZCBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQuJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VzdGEgdGFyamV0YSBkZSByZWdhbG8geWEgc2UgYXBsaWPDsy4nLFxuICAgICAgICBmcjogJ0NldHRlIGNhcnRlLWNhZGVhdSBhIGTDqWrDoCDDqXTDqSBhcHBsaXF1w6llLicsXG4gICAgICAgIGl0OiAnUXVlc3RhIGNhcnRhIHJlZ2FsbyDDqCBnacOgIHN0YXRhIGFwcGxpY2F0YS4nLFxuICAgICAgICBqYTogJ+OBk+OBruOCruODleODiOOCq+ODvOODieOBr+OBmeOBp+OBq+mBqeeUqOOBleOCjOOBpuOBhOOBvuOBmeOAgicsXG4gICAgICAgICdyby1STyc6ICdBY2VzdCBjYXJkIGNhZG91IGEgZm9zdCBkZWphIGFwbGljYXQuJyxcbiAgICAgICAgYXI6ICfYqtmFINiq2LfYqNmK2YIg2KjYt9in2YLYqSDYp9mE2YfYr9in2YrYpyDZh9iw2Ycg2KjYp9mE2YHYudmELicsXG4gICAgICAgIGNhOiAnQXF1ZXN0YSB0YXJnZXRhIHJlZ2FsIGphIHNcXCdoYSBhcGxpY2F0LicsXG4gICAgICAgICdjcy1DWic6ICdUYXRvIGTDoXJrb3bDoSBrYXJ0YSBqacW+IGJ5bGEgcG91xb5pdGEuJyxcbiAgICAgICAgJ2RhLURLJzogJ0RldHRlIGdhdmVrb3J0IGVyIGFsbGVyZWRlIGFudmVuZHQuJyxcbiAgICAgICAgZWw6ICfOkc+Fz4TOriDOtyDOtM+Jz4HOv866zqzPgc+EzrEgzq3Ph861zrkgzq7OtM63IM61z4bOsc+BzrzOv8+Dz4TOtc6vLicsXG4gICAgICAgICdoaS1JTic6ICfgpK/gpLkg4KSJ4KSq4KS54KS+4KSwIOCkleCkvuCksOCljeCkoSDgpKrgpLngpLLgpYcg4KS54KWAIOCksuCkvuCkl+ClgiDgpJXgpL/gpK/gpL4g4KSc4KS+IOCkmuClgeCkleCkviDgpLngpYjgpaQnLFxuICAgICAgICAna28tS1InOiAn7J20IOq4sO2UhO2KuCDsubTrk5zripQg7J2066+4IOyggeyaqeuQmOyXiOyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRMOrcyBLYWRkb2thYXJ0IGdvdWYgc2NobyBhcHBsaXrDqWllcnQuJyxcbiAgICAgICAgJ25sLU5MJzogJ0RlemUgY2FkZWF1Ym9uIGlzIGFsIHRvZWdlcGFzdC4nLFxuICAgICAgICAncHQtUFQnOiAnRXN0ZSB2YWxlLXByZXNlbnRlIGrDoSBmb2kgYXBsaWNhZG8uJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ct0YLQsCDQv9C+0LTQsNGA0L7Rh9C90LDRjyDQutCw0YDRgtCwINGD0LbQtSDQsdGL0LvQsCDQv9GA0LjQvNC10L3QtdC90LAuJyxcbiAgICAgICAgJ3NsLVNJJzogJ1RhIGRhcmlsbmEga2FydGljYSBqZSDFvmUgYmlsYSB1cG9yYWJsamVuYS4nLFxuICAgICAgICAnc3YtU0UnOiAnRGV0dGEgcHJlc2VudGtvcnQgaGFyIHJlZGFuIHRpbGzDpG1wYXRzLicsXG4gICAgICAgIHRoOiAn4Lih4Li14LiB4Liy4Lij4LmD4LiK4LmJ4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiN4LiZ4Li14LmJ4LmB4Lil4LmJ4LinJyxcbiAgICAgICAgdWs6ICfQptGOINC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDINCy0LbQtSDQt9Cw0YHRgtC+0YHQvtCy0LDQvdC+LicsXG4gICAgICAgICd6aC1DTic6ICfmraTnpLzlk4HljaHlt7LooqvlupTnlKjjgIInLFxuICAgICAgICAnemgtVFcnOiAn5q2k56au5ZOB5Y2h5bey6KKr5oeJ55So44CCJ1xuICAgIH0sXG4gICAgJ3NoaXAtdG8nOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJzYW5kIG5hY2gnLFxuICAgICAgICAnZW4tVVMnOiAnU2hpcCB0bycsXG4gICAgICAgICdlcy1FUyc6ICdFbnZpYXIgYScsXG4gICAgICAgIGZyOiAnRW52b3lleiDDoCcsXG4gICAgICAgIGl0OiAnU3BlZGlyZSBhJyxcbiAgICAgICAgamE6ICfphY3pgIHlhYgnLFxuICAgICAgICAncm8tUk8nOiAnw45tYmFyY2Egc3ByZScsXG4gICAgICAgIGFyOiAn2LPYp9mB2LEg2LnZhNmJINmF2KrZhiDYs9mB2YrZhtipINmEJyxcbiAgICAgICAgY2E6ICdFbnZpYSBhJyxcbiAgICAgICAgJ2NzLUNaJzogJ0RvcHJhdml0IGRvJyxcbiAgICAgICAgJ2RhLURLJzogJ1NlbmQgdGlsJyxcbiAgICAgICAgZWw6ICfOkc+Azr/Pg8+Ezr/Ou86uIM+Az4HOv8+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckr+CkueCkvuCkgiDgpK3gpYfgpJzgpYfgpIInLFxuICAgICAgICAna28tS1InOiAn67Cw7Iah7KeAJyxcbiAgICAgICAgJ2xiLUxVJzogJ1NjaMOpY2tlbiB1bicsXG4gICAgICAgICdubC1OTCc6ICdWZXJ6ZW5kIG5hYXInLFxuICAgICAgICAncHQtUFQnOiAnRW52aWFyIHBhcmEnLFxuICAgICAgICAncnUtUlUnOiAn0JTQvtGB0YLQsNCy0LrQsCDQtNC+JyxcbiAgICAgICAgJ3NsLVNJJzogJ1Bvc2xhdGkgdicsXG4gICAgICAgICdzdi1TRSc6ICdGcmFrdGEgdGlsbCcsXG4gICAgICAgIHRoOiAn4Liq4LmI4LiH4LmE4Lib4LiX4Li14LmIJyxcbiAgICAgICAgdWs6ICfQktGW0LTQv9GA0LDQstC40YLQuCDQtNC+JyxcbiAgICAgICAgJ3poLUNOJzogJ+i/kOmAgeWIsCcsXG4gICAgICAgICd6aC1UVyc6ICfpgYvpgIHliLAnXG4gICAgfSxcbiAgICAnQ3JlZGl0IG9yIGRlYml0IGNhcmQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdLcmVkaXQtIG9kZXIgRGViaXRrYXJ0ZScsXG4gICAgICAgICdlbi1VUyc6ICdDcmVkaXQgb3IgZGViaXQgY2FyZCcsXG4gICAgICAgICdlcy1FUyc6ICdUYXJqZXRhIGRlIGNyw6lkaXRvIG8gZMOpYml0bycsXG4gICAgICAgIGZyOiAnQ2FydGUgZGUgY3LDqWRpdCBvdSBkZSBkw6liaXQnLFxuICAgICAgICBpdDogJ0NhcnRhIGRpIGNyZWRpdG8gbyBkaSBkZWJpdG8nLFxuICAgICAgICBqYTogJ+OCr+ODrOOCuOODg+ODiOOCguOBl+OBj+OBr+ODh+ODk+ODg+ODiOOCq+ODvOODiScsXG4gICAgICAgICdyby1STyc6ICdDYXJkIGRlIGNyZWRpdCBzYXUgZGViaXQnLFxuICAgICAgICBhcjogJ9io2LfYp9mC2Kkg2KfZhNin2KbYqtmF2KfZhiDYo9mIINin2YTYrti12YUnLFxuICAgICAgICBjYTogJ1RhcmdldGEgZGUgY3LDqGRpdCBvIGTDqGJpdCcsXG4gICAgICAgICdjcy1DWic6ICdLcmVkaXRuw60gbmVibyBkZWJldG7DrSBrYXJ0YScsXG4gICAgICAgICdkYS1ESyc6ICdLcmVkaXQtIGVsbGVyIGJldGFsaW5nc2tvcnQnLFxuICAgICAgICBlbDogJ86gzrnPg8+Ez4nPhM65zrrOriDOriDPh8+BzrXPic+Dz4TOuc66zq4gzrrOrM+Bz4TOsScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpY3gpLDgpYfgpKHgpL/gpJ8g4KSv4KS+IOCkoeClh+CkrOCkv+CknyDgpJXgpL7gpLDgpY3gpKEnLFxuICAgICAgICAna28tS1InOiAn7Iug7Jqp7Lm065OcIOuYkOuKlCDsp4HrtojsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS3JlZGl0dC0gb2RlciBCYW5ra2FhcnQnLFxuICAgICAgICAnbmwtTkwnOiAnQ3JlZGl0Y2FyZCBvZiBiYW5rcGFzJyxcbiAgICAgICAgJ3B0LVBUJzogJ0NhcnTDo28gZGUgY3LDqWRpdG8gb3UgZMOpYml0bycsXG4gICAgICAgICdydS1SVSc6ICfQmtGA0LXQtNC40YLQvdCw0Y8g0LjQu9C4INC00LXQsdC10YLQvtCy0LDRjyDQutCw0YDRgtCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0tyZWRpdG5hIGFsaSBkZWJldG5hIGthcnRpY2EnLFxuICAgICAgICAnc3YtU0UnOiAnS3JlZGl0LWVsbGVyIGJldGFsa29ydCcsXG4gICAgICAgIHRoOiAn4Lia4Lix4LiV4Lij4LmA4LiE4Lij4LiU4Li04LiV4Lir4Lij4Li34Lit4Lia4Lix4LiV4Lij4LmA4LiU4Lia4Li04LiVJyxcbiAgICAgICAgdWs6ICfQmtGA0LXQtNC40YLQvdCwINCw0LHQviDQtNC10LHQtdGC0L7QstCwINC60LDRgNGC0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfkv6HnlKjljaHmiJblgJ/orrDljaEnLFxuICAgICAgICAnemgtVFcnOiAn5L+h55So5Y2h5oiW5YCf6KiY5Y2hJ1xuICAgIH0sXG4gICAgcGF5OiB7XG4gICAgICAgICdkZS1ERSc6ICdaYWhsZW4nLFxuICAgICAgICAnZW4tVVMnOiAnUGF5JyxcbiAgICAgICAgJ2VzLUVTJzogJ1BhZ2FyJyxcbiAgICAgICAgZnI6ICdQYXllcicsXG4gICAgICAgIGl0OiAnUGFnYXJlJyxcbiAgICAgICAgamE6ICfmlK/miZXjgYQnLFxuICAgICAgICAncm8tUk8nOiAnUGzEg3RlyJl0ZScsXG4gICAgICAgIGFyOiAn2YrYr9mB2LknLFxuICAgICAgICBjYTogJ1BhZ2EnLFxuICAgICAgICAnY3MtQ1onOiAnUGxhdGl0JyxcbiAgICAgICAgJ2RhLURLJzogJ0JldGFsZScsXG4gICAgICAgIGVsOiAnzqDOu863z4HPic68zq4nLFxuICAgICAgICAnaGktSU4nOiAn4KS14KWH4KSk4KSoJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yngOu2iCcsXG4gICAgICAgICdsYi1MVSc6ICdCZXp1ZWxlbicsXG4gICAgICAgICdubC1OTCc6ICdCZXRhbGVuJyxcbiAgICAgICAgJ3B0LVBUJzogJ1BhZ2FyJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LvQsNGC0LjRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BsYcSNYWonLFxuICAgICAgICAnc3YtU0UnOiAnQmV0YWxhJyxcbiAgICAgICAgdGg6ICfguIjguYjguLLguKInLFxuICAgICAgICB1azogJ9Ce0L/Qu9Cw0YLQsCcsXG4gICAgICAgICd6aC1DTic6ICfmlK/ku5gnLFxuICAgICAgICAnemgtVFcnOiAn5pSv5LuYJ1xuICAgIH0sXG4gICAgYmFjazoge1xuICAgICAgICAnZGUtREUnOiAnWnVyw7xjayB6dSBJbmZvcm1hdGlvbmVuJyxcbiAgICAgICAgJ2VuLVVTJzogJ0JhY2sgdG8gaW5mbycsXG4gICAgICAgICdlcy1FUyc6ICdWb2x2ZXIgYSBpbmZvcm1hY2nDs24nLFxuICAgICAgICBmcjogJ1JldG91ciBhdXggaW5mb3JtYXRpb25zJyxcbiAgICAgICAgaXQ6ICdUb3JuYSBhbGxlIGluZm9ybWF6aW9uaScsXG4gICAgICAgIGphOiAn5oOF5aCx44Gr5oi744KLJyxcbiAgICAgICAgJ3JvLVJPJzogJ8OObmFwb2kgbGEgaW5mb3JtYcibaWknLFxuICAgICAgICBhcjogJ9ix2KzZiNi5INil2YTZiSDYp9mE2YXYudmE2YjZhdin2KonLFxuICAgICAgICBjYTogJ1Rvcm5hIGEgbGEgaW5mb3JtYWNpw7MnLFxuICAgICAgICAnY3MtQ1onOiAnWnDEm3QgayBpbmZvcm1hY8OtbScsXG4gICAgICAgICdkYS1ESyc6ICdUaWxiYWdlIHRpbCBpbmZvcm1hdGlvbicsXG4gICAgICAgIGVsOiAnzpXPgM65z4PPhM+Bzr/Phs6uIM+Dz4TOuc+CIM+AzrvOt8+Bzr/Phs6/z4HOr861z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSc4KS+4KSo4KSV4KS+4KSw4KWAIOCkquCksCDgpLXgpL7gpKrgpLgg4KSc4KS+4KSP4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ygleuztOuhnCDrj4zslYTqsIDquLAnLFxuICAgICAgICAnbGItTFUnOiAnWnLDqWNrIG9wIEluZm9ybWF0aW91bicsXG4gICAgICAgICdubC1OTCc6ICdUZXJ1ZyBuYWFyIGluZm9ybWF0aWUnLFxuICAgICAgICAncHQtUFQnOiAnVm9sdGFyIHBhcmEgYSBpbmZvcm1hw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0JLQtdGA0L3Rg9GC0YzRgdGPINC6INC40L3RhNC+0YDQvNCw0YbQuNC4JyxcbiAgICAgICAgJ3NsLVNJJzogJ05hemFqIG5hIGluZm9ybWFjaWplJyxcbiAgICAgICAgJ3N2LVNFJzogJ1RpbGxiYWthIHRpbGwgaW5mb3JtYXRpb24nLFxuICAgICAgICB0aDogJ+C4geC4peC4seC4muC5hOC4m+C4l+C4teC5iOC4guC5ieC4reC4oeC4ueC4pScsXG4gICAgICAgIHVrOiAn0J3QsNC30LDQtCDQtNC+INGW0L3RhNC+0YDQvNCw0YbRltGXJyxcbiAgICAgICAgJ3poLUNOJzogJ+i/lOWbnuS/oeaBrycsXG4gICAgICAgICd6aC1UVyc6ICfov5Tlm57kv6Hmga8nXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgICAnZGUtREUnOiAnRW1haWwnLFxuICAgICAgICAnZW4tVVMnOiAnRW1haWwnLFxuICAgICAgICAnZXMtRVMnOiAnQ29ycmVvJyxcbiAgICAgICAgZnI6ICdFbWFpbCcsXG4gICAgICAgIGl0OiAnRW1haWwnLFxuICAgICAgICBqYTogJ+ODoeODvOODq+OCouODieODrOOCuScsXG4gICAgICAgICdyby1STyc6ICdFbWFpbCcsXG4gICAgICAgIGFyOiAn2KjYsdmK2K8g2KfZhNin2YTZg9iq2LHZiNmG2YonLFxuICAgICAgICBjYTogJ0NvcnJldSBlbGVjdHLDsm5pYycsXG4gICAgICAgICdjcy1DWic6ICdFLW1haWxlbScsXG4gICAgICAgICdkYS1ESyc6ICdFIC1tYWlsJyxcbiAgICAgICAgZWw6ICfOl86bzpXOms6kzqHOn86dzpnOms6XIM6UzpnOlc6lzpjOpc6dzqPOlycsXG4gICAgICAgICdoaS1JTic6ICfgpIjgpK7gpYfgpLInLFxuICAgICAgICAna28tS1InOiAn7J2066mU7J28JyxcbiAgICAgICAgJ2xiLUxVJzogJ0VtYWlsJyxcbiAgICAgICAgJ25sLU5MJzogJ0UtbWFpbCcsXG4gICAgICAgICdwdC1QVCc6ICdPIGVtYWlsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ct0LsuINCw0LTRgNC10YEnLFxuICAgICAgICAnc2wtU0knOiAnRS1uYXNsb3YnLFxuICAgICAgICAnc3YtU0UnOiAnRS1wb3N0JyxcbiAgICAgICAgdGg6ICfguK3guLXguYDguKHguKUnLFxuICAgICAgICB1azogJ9CV0LvQtdC60YLRgNC+0L3QvdCwINC/0L7RiNGC0LAnLFxuICAgICAgICAnemgtQ04nOiAn55S15a2Q6YKu5Lu2JyxcbiAgICAgICAgJ3poLVRXJzogJ+mbu+WtkOmDteS7tidcbiAgICB9LFxuICAgIGRlbGl2ZXJ5OiB7XG4gICAgICAgICdkZS1ERSc6ICdMaWVmZXJ1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnRGVsaXZlcnknLFxuICAgICAgICAnZXMtRVMnOiAnRW50cmVnYScsXG4gICAgICAgIGZyOiAnTGl2cmFpc29uJyxcbiAgICAgICAgaXQ6ICdDb25zZWduYScsXG4gICAgICAgIGphOiAn6YWN6YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0xpdnJhcmUnLFxuICAgICAgICBhcjogJ9iq2YjYtdmK2YQnLFxuICAgICAgICBjYTogJ0xsaXVyYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnZG9kw6F2a2EnLFxuICAgICAgICAnZGEtREsnOiAnTGV2ZXJpbmcnLFxuICAgICAgICBlbDogJ86UzrnOsc69zr/OvM6uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkteCkv+CkpOCksOCkoycsXG4gICAgICAgICdrby1LUic6ICfrsLDri6wnLFxuICAgICAgICAnbGItTFUnOiAnTGl3d2VydW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ0xldmVyaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VudHJlZ2EnLFxuICAgICAgICAncnUtUlUnOiAn0JTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICdzbC1TSSc6ICdEb3N0YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0xldmVyYW5zJyxcbiAgICAgICAgdGg6ICfguIjguLHguJTguKrguYjguIcnLFxuICAgICAgICB1azogJ9CU0L7RgdGC0LDQstC60LAnLFxuICAgICAgICAnemgtQ04nOiAn6YCB6LSnJyxcbiAgICAgICAgJ3poLVRXJzogJ+mAgeiyqCdcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ0thcnRlJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NhcmQnLFxuICAgICAgICAnZXMtRVMnOiAnVGFyamV0YScsXG4gICAgICAgIGZyOiAnQ2FydGUnLFxuICAgICAgICBpdDogJ0NhcnRhJyxcbiAgICAgICAgamE6ICfjgqvjg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnQ2FyZCcsXG4gICAgICAgIGFyOiAn2KjYt9in2YLYqScsXG4gICAgICAgIGNhOiAnVGFyZ2V0YScsXG4gICAgICAgICdjcy1DWic6ICdLYXJ0dScsXG4gICAgICAgICdkYS1ESyc6ICdLb3J0JyxcbiAgICAgICAgZWw6ICfOms6sz4HPhM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCkvuCksOCljeCkoScsXG4gICAgICAgICdrby1LUic6ICfsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS2FhcnQnLFxuICAgICAgICAnbmwtTkwnOiAnS2FhcnQnLFxuICAgICAgICAncHQtUFQnOiAnQ2FydMOjbycsXG4gICAgICAgICdydS1SVSc6ICfQmtCw0YDRgtCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0thcnRpY2EnLFxuICAgICAgICAnc3YtU0UnOiAnS29ydCcsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LmM4LiUJyxcbiAgICAgICAgdWs6ICfQmtCw0YDRgtC60LAnLFxuICAgICAgICAnemgtQ04nOiAn5Y2h54mHJyxcbiAgICAgICAgJ3poLVRXJzogJ+WNoeeJhydcbiAgICB9LFxuICAgIGVkaXQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ0JlYXJiZWl0ZW4nLFxuICAgICAgICAnZW4tVVMnOiAnRWRpdCcsXG4gICAgICAgICdlcy1FUyc6ICdFZGl0YXInLFxuICAgICAgICBmcjogJ8OJZGl0ZXInLFxuICAgICAgICBpdDogJ01vZGlmaWNhcmUnLFxuICAgICAgICBqYTogJ+e3qOmbhicsXG4gICAgICAgICdyby1STyc6ICdFZGl0YScsXG4gICAgICAgIGFyOiAn2YrYrdix2LEnLFxuICAgICAgICBjYTogJ0VkaXRhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1VwcmF2aXQnLFxuICAgICAgICAnZGEtREsnOiAnUmVkaWdlcmUnLFxuICAgICAgICBlbDogJ86Vz4DOtc6+zrXPgc6zzrHPg86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KS44KSC4KSq4KS+4KSm4KS/4KSkIOCkleCksOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICftjrjsp5HtlZjri6QnLFxuICAgICAgICAnbGItTFUnOiAnRWRpdMOpaWVyZW4nLFxuICAgICAgICAnbmwtTkwnOiAnQmV3ZXJraW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VkaXRhcicsXG4gICAgICAgICdydS1SVSc6ICfQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICdVcmVkaScsXG4gICAgICAgICdzdi1TRSc6ICdSZWRpZ2VyYScsXG4gICAgICAgIHRoOiAn4LmB4LiB4LmJ4LmE4LiCJyxcbiAgICAgICAgdWs6ICfQoNC10LTQsNCz0YPQstCw0YLQuCcsXG4gICAgICAgICd6aC1DTic6ICfnvJbovpEnLFxuICAgICAgICAnemgtVFcnOiAn57eo6LyvJ1xuICAgIH0sXG4gICAgJ1NvcnJ5LCB0aGlzIHN0b3JlIGRvZXMgbm90IHNoaXAgdG8geW91ciBsb2NhdGlvbi4nOiB7XG4gICAgICAgICdkZS1ERSc6ICdEaWVzZXIgU2hvcCBsaWVmZXJ0IGxlaWRlciBuaWNodCBhbiBJaHJlbiBTdGFuZG9ydC4nLFxuICAgICAgICAnZW4tVVMnOiAnU29ycnksIHRoaXMgc3RvcmUgZG9lcyBub3Qgc2hpcCB0byB5b3VyIGxvY2F0aW9uLicsXG4gICAgICAgICdlcy1FUyc6ICdMbyBzZW50aW1vcywgZXN0YSB0aWVuZGEgbm8gc2UgZW52w61hIGEgc3UgdWJpY2FjacOzbi4nLFxuICAgICAgICBmcjogJ0TDqXNvbMOpLCBjZSBtYWdhc2luIG5lIGxpdnJlIHBhcyDDoCB2b3RyZSBlbXBsYWNlbWVudC4nLFxuICAgICAgICBpdDogJ1NpYW1vIHNwaWFjZW50aSwgcXVlc3RvIG5lZ296aW8gbm9uIHZpZW5lIHNwZWRpdG8gYWxsYSB0dWEgcG9zaXppb25lLicsXG4gICAgICAgIGphOiAn55Sz44GX6Kiz44GC44KK44G+44Gb44KT44GM44CB44GT44Gu44K544OI44Ki44Gv44GK5L2P44G+44GE44Gu5Zyw5Z+f44Gr55m66YCB44GV44KM44G+44Gb44KT44CCJyxcbiAgICAgICAgJ3JvLVJPJzogJ05lIHBhcmUgcsSDdSwgYWNlc3QgbWFnYXppbiBudSBlc3RlIGxpdnJhdCDDrm4gbG9jYcibaWEgZHZzLicsXG4gICAgICAgIGFyOiAn2LnYsNix2Kcg2Iwg2YfYsNinINin2YTZhdiq2KzYsSDZhNinINmK2LTYrdmGINil2YTZiSDZhdmI2YLYudmDLicsXG4gICAgICAgIGNhOiAnQXF1ZXN0YSBib3RpZ2Egbm8gc1xcJ2VudmlhIGEgbGEgdm9zdHJhIHViaWNhY2nDsy4nLFxuICAgICAgICAnY3MtQ1onOiAnSmUgbsOhbSBsw610bywgdGVudG8gb2JjaG9kIHbDoW0gbmVkb3J1xI3DrW1lLicsXG4gICAgICAgICdkYS1ESyc6ICdCZWtsYWdlciwgZGVubmUgYnV0aWsgc2VuZGVyIGlra2UgdGlsIGRpbiBsb2thdGlvbi4nLFxuICAgICAgICBlbDogJ86bz4XPgM6/z43OvM6xz4PPhM61LCDOsc+Fz4TPjCDPhM6/IM66zrHPhM6sz4PPhM63zrzOsSDOtM61zr0gzrHPgM6/z4PPhM6tzrvOu861z4TOsc65IM+Dz4TOt869IM+Ezr/PgM6/zrjOtc+Dzq/OsSDPg86xz4IuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCljeCkt+CkruCkviDgpJXgpLDgpYfgpIIsIOCkr+CkuSDgpLjgpY3gpJ/gpYvgpLAg4KSG4KSq4KSV4KWHIOCkuOCljeCkpeCkvuCkqCDgpKrgpLAg4KS24KS/4KSqIOCkqOCkueClgOCkgiDgpJXgpLDgpKTgpL4g4KS54KWI4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjhOyGoe2VqeuLiOuLpC4g7J20IOyDgeygkOydgCDqt4DtlZjsnZgg7JyE7LmY66GcIOuwsOyGoeuQmOyngCDslYrsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VudHNjaMOrbGxlZ3QsIGTDq3NlIEJ1dHRlayBnw6t0dCBuZXQgb3Agw4RyIExvY2F0aW9uIHZlcnNjaMOpY2t0LicsXG4gICAgICAgICdubC1OTCc6ICdTb3JyeSwgZGV6ZSB3aW5rZWwgdmVyemVuZHQgbmlldCBuYWFyIGpvdXcgbG9jYXRpZS4nLFxuICAgICAgICAncHQtUFQnOiAnRGVzY3VscGUsIGVzdGEgbG9qYSBuw6NvIGVudmlhIHBhcmEgbyBzZXUgbG9jYWwuJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CaINGB0L7QttCw0LvQtdC90LjRjiwg0LTQvtGB0YLQsNCy0LrQsCDQsiDRjdGC0L7RgiDQvNCw0LPQsNC30LjQvSDQvdC1INC+0YHRg9GJ0LXRgdGC0LLQu9GP0LXRgtGB0Y8uJyxcbiAgICAgICAgJ3NsLVNJJzogJ1RhIHRyZ292aW5hIMW+YWwgbmkgZG9zdGF2bGplbmEgbmEgdmHFoW8gbG9rYWNpam8uJyxcbiAgICAgICAgJ3N2LVNFJzogJ0RlbiBow6RyIGJ1dGlrZW4gc2tpY2thcyBpbnRlIHRpbGwgZGluIHBsYXRzLicsXG4gICAgICAgIHRoOiAn4LiC4Lit4Lit4Lig4Lix4LiiIOC4o+C5ieC4suC4meC4hOC5ieC4suC4meC4teC5ieC5hOC4oeC5iOC5hOC4lOC5ieC4iOC4seC4lOC4quC5iOC4h+C5hOC4m+C4ouC4seC4h+C4leC4s+C5geC4q+C4meC5iOC4h+C4guC4reC4h+C4hOC4uOC4kycsXG4gICAgICAgIHVrOiAn0J3QsCDQttCw0LvRjCwg0YbQtdC5INC80LDQs9Cw0LfQuNC9INC90LUg0LTQvtGB0YLQsNCy0LvRj9GU0YLRjNGB0Y8g0LTQviDQstCw0YjQvtCz0L4g0LzRltGB0YbQtdC30L3QsNGF0L7QtNC20LXQvdC90Y8uJyxcbiAgICAgICAgJ3poLUNOJzogJ+aKseatie+8jOi/meWutuWVhuW6l+S4jeWPkei0p+WIsOaCqOaJgOWcqOeahOS9jee9ruOAgicsXG4gICAgICAgICd6aC1UVyc6ICfmirHmrYnvvIzpgJnlrrbllYblupfkuI3nmbzosqjliLDmgqjmiYDlnKjnmoTkvY3nva7jgIInXG4gICAgfSxcbiAgICBwcm9jZXNzaW5nOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJhcmJlaXR1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnUHJvY2Vzc2luZycsXG4gICAgICAgICdlcy1FUyc6ICdQcm9jZXNhbWllbnRvJyxcbiAgICAgICAgZnI6ICdUcmFpdGVtZW50JyxcbiAgICAgICAgaXQ6ICdFbGFib3JhemlvbmUnLFxuICAgICAgICBqYTogJ+mAsuihjOS4rScsXG4gICAgICAgICdyby1STyc6ICdQcmVsdWNyYXJlJyxcbiAgICAgICAgYXI6ICfZiti52KfZhNisJyxcbiAgICAgICAgY2E6ICdQcm9jZXNzYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnenByYWNvdsOhdsOhIHNlJyxcbiAgICAgICAgJ2RhLURLJzogJ0ZvcmFyYmVqZG5pbmcnLFxuICAgICAgICBlbDogJ86Vz4DOtc6+zrXPgc6zzrHPg86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS44KSC4KS44KWN4KSV4KSw4KSjJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yymOumrCcsXG4gICAgICAgICdsYi1MVSc6ICdWZXJhYXJiZWNodHVuZycsXG4gICAgICAgICdubC1OTCc6ICdWZXJ3ZXJrZW4nLFxuICAgICAgICAncHQtUFQnOiAnRW0gcHJvY2Vzc2FtZW50bycsXG4gICAgICAgICdydS1SVSc6ICfQntCx0YDQsNCx0L7RgtC60LAnLFxuICAgICAgICAnc2wtU0knOiAnT2JyYXZuYXZhdGknLFxuICAgICAgICAnc3YtU0UnOiAnQmVhcmJldG5pbmcnLFxuICAgICAgICB0aDogJ+C4geC4s+C4peC4seC4h+C4m+C4o+C4sOC4oeC4p+C4peC4nOC4pScsXG4gICAgICAgIHVrOiAn0J7QsdGA0L7QsdC60LAnLFxuICAgICAgICAnemgtQ04nOiAn5Yqg5belJyxcbiAgICAgICAgJ3poLVRXJzogJ+WKoOW3pSdcbiAgICB9LFxuICAgICdwYXltZW50LWZhaWxlZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1phaGx1bmcgZmVobGdlc2NobGFnZW4nLFxuICAgICAgICAnZW4tVVMnOiAnUGF5bWVudCBmYWlsZWQnLFxuICAgICAgICAnZXMtRVMnOiAnUGFnbyBmYWxsaWRvJyxcbiAgICAgICAgZnI6ICdQYWllbWVudCDDqWNob3XDqScsXG4gICAgICAgIGl0OiAnUGFnYW1lbnRvIG5vbiByaXVzY2l0bycsXG4gICAgICAgIGphOiAn5pSv5omV44GE5aSx5pWXJyxcbiAgICAgICAgJ3JvLVJPJzogJ1BsYXRhIGVzdWF0YScsXG4gICAgICAgIGFyOiAn2LnZhdmE2YrYqSDYp9mE2K/Zgdi5INmB2LTZhNiqJyxcbiAgICAgICAgY2E6ICdFbCBwYWdhbWVudCBoYSBmYWxsYXQnLFxuICAgICAgICAnY3MtQ1onOiAnUGxhdGJhIHNlbGhhbGEnLFxuICAgICAgICAnZGEtREsnOiAnQmV0YWxpbmcgbWlzbHlra2VkZXMnLFxuICAgICAgICBlbDogJ86XIM+AzrvOt8+Bz4nOvM6uIM6xz4DOrc+Ez4XPh861JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkreClgeCkl+CkpOCkvuCkqCDgpIXgpLjgpKvgpLIg4KS54KWB4KSGJyxcbiAgICAgICAgJ2tvLUtSJzogJ+qysOygnCDsi6TtjKgnLFxuICAgICAgICAnbGItTFUnOiAnQmV6dWVsdW5nIGdlc2NoZWl0ZXJ0JyxcbiAgICAgICAgJ25sLU5MJzogJ0JldGFsaW5nIG1pc2x1a3QnLFxuICAgICAgICAncHQtUFQnOiAnUGFnYW1lbnRvIGZhbGhvdScsXG4gICAgICAgICdydS1SVSc6ICfQn9C70LDRgtC10LYg0L3QtSDQv9GA0L7RiNC10LsnLFxuICAgICAgICAnc2wtU0knOiAnUGxhxI1pbG8gbmkgdXNwZWxvJyxcbiAgICAgICAgJ3N2LVNFJzogJ0JldGFsbmluZyBtaXNzbHlja2FkZXMnLFxuICAgICAgICB0aDogJ+C4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4meC4peC5ieC4oeC5gOC4q+C4peC4pycsXG4gICAgICAgIHVrOiAn0J3QtSDQstC00LDQu9C+0YHRjyDQt9C00ZbQudGB0L3QuNGC0Lgg0L/Qu9Cw0YLRltC2JyxcbiAgICAgICAgJ3poLUNOJzogJ+aUr+S7mOWksei0pScsXG4gICAgICAgICd6aC1UVyc6ICfmlK/ku5jlpLHmlZcnXG4gICAgfSxcbiAgICAnZmlyc3QtbmFtZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Zvcm5hbWUnLFxuICAgICAgICAnZW4tVVMnOiAnRmlyc3QgbmFtZScsXG4gICAgICAgICdlcy1FUyc6ICdOb21icmUnLFxuICAgICAgICBmcjogJ1Byw6lub20nLFxuICAgICAgICBpdDogJ05vbWUnLFxuICAgICAgICBqYTogJ+WQjScsXG4gICAgICAgICdyby1STyc6ICdOdW1lJyxcbiAgICAgICAgYXI6ICfYp9mE2KfYs9mFINin2YTYo9mI2YQnLFxuICAgICAgICBjYTogJ05vbScsXG4gICAgICAgICdjcy1DWic6ICdKbcOpbm8nLFxuICAgICAgICAnZGEtREsnOiAnRm9ybmF2bicsXG4gICAgICAgIGVsOiAnzp/Ovc6/zrzOsScsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpLngpLLgpL4g4KSo4KS+4KSuJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ydtOumhCcsXG4gICAgICAgICdsYi1MVSc6ICdWaXJudW1tJyxcbiAgICAgICAgJ25sLU5MJzogJ1Zvb3JuYWFtJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ByaW1laXJvIG5vbWUnLFxuICAgICAgICAncnUtUlUnOiAn0JjQvNGPJyxcbiAgICAgICAgJ3NsLVNJJzogJ0ltZScsXG4gICAgICAgICdzdi1TRSc6ICdGw7ZybmFtbicsXG4gICAgICAgIHRoOiAn4LiK4Li34LmI4Lit4LiI4Lij4Li04LiHJyxcbiAgICAgICAgdWs6ICfQhtC8XFwn0Y8nLFxuICAgICAgICAnemgtQ04nOiAn5ZCNJyxcbiAgICAgICAgJ3poLVRXJzogJ+WQjSdcbiAgICB9LFxuICAgICdsYXN0LW5hbWUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdOYWNobmFtZScsXG4gICAgICAgICdlbi1VUyc6ICdMYXN0IG5hbWUnLFxuICAgICAgICAnZXMtRVMnOiAnQXBlbGxpZG8nLFxuICAgICAgICBmcjogJ05vbScsXG4gICAgICAgIGl0OiAnQ29nbm9tZScsXG4gICAgICAgIGphOiAn5aeTJyxcbiAgICAgICAgJ3JvLVJPJzogJ051bWVsZSBkZSBmYW1pbGllJyxcbiAgICAgICAgYXI6ICfYp9mE2YPZhtmK2KknLFxuICAgICAgICBjYTogJ0NvZ25vbScsXG4gICAgICAgICdjcy1DWic6ICdQxZnDrWptZW7DrScsXG4gICAgICAgICdkYS1ESyc6ICdFZnRlcm5hdm4nLFxuICAgICAgICBlbDogJ86Vz4DOr864zrXPhM6/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkieCkquCkqOCkvuCkricsXG4gICAgICAgICdrby1LUic6ICfshLEnLFxuICAgICAgICAnbGItTFUnOiAnRmFtaWxsamVubnVtbScsXG4gICAgICAgICdubC1OTCc6ICdBY2h0ZXJuYWFtJyxcbiAgICAgICAgJ3B0LVBUJzogJ8OabHRpbW8gbm9tZScsXG4gICAgICAgICdydS1SVSc6ICfQpNCw0LzQuNC70LjRjycsXG4gICAgICAgICdzbC1TSSc6ICdQcmlpbWVrJyxcbiAgICAgICAgJ3N2LVNFJzogJ0VmdGVybmFtbicsXG4gICAgICAgIHRoOiAn4LiZ4Liy4Lih4Liq4LiB4Li44LilJyxcbiAgICAgICAgdWs6ICfQn9GA0ZbQt9Cy0LjRidC1JyxcbiAgICAgICAgJ3poLUNOJzogJ+WnkycsXG4gICAgICAgICd6aC1UVyc6ICflp5MnXG4gICAgfSxcbiAgICBwaG9uZToge1xuICAgICAgICAnZGUtREUnOiAnVGVsZWZvbicsXG4gICAgICAgICdlbi1VUyc6ICdQaG9uZSBudW1iZXInLFxuICAgICAgICAnZXMtRVMnOiAnVGVsw6lmb25vJyxcbiAgICAgICAgZnI6ICdUw6lsw6lwaG9uZScsXG4gICAgICAgIGl0OiAnVGVsZWZvbm8nLFxuICAgICAgICBqYTogJ+mbu+ipseeVquWPtycsXG4gICAgICAgICdyby1STyc6ICdUZWxlZm9uJyxcbiAgICAgICAgYXI6ICfYsdmC2YUg2KfZhNmH2KfYqtmBJyxcbiAgICAgICAgY2E6ICdOw7ptZXJvIGRlIHRlbMOoZm9uJyxcbiAgICAgICAgJ2NzLUNaJzogJ1RlbGVmb25uw60gxI3DrXNsbycsXG4gICAgICAgICdkYS1ESyc6ICdUZWxlZm9ubnVtbWVyJyxcbiAgICAgICAgZWw6ICfOpM63zrvOtc+Gz4nOvc65zrrPjCDOvc6/z43OvM61z4HOvycsXG4gICAgICAgICdoaS1JTic6ICfgpKvgpLzgpYvgpKgg4KSo4KSC4KSs4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yghO2ZlCDrsojtmLgnLFxuICAgICAgICAnbGItTFUnOiAnVGVsZWZvbnNudW1tZXInLFxuICAgICAgICAnbmwtTkwnOiAnVGVsZWZvb25udW1tZXInLFxuICAgICAgICAncHQtUFQnOiAnTsO6bWVybyBkZSB0ZWxlZm9uZScsXG4gICAgICAgICdydS1SVSc6ICfQndC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAnLFxuICAgICAgICAnc2wtU0knOiAnVGVsZWZvbnNrYSDFoXRldmlsa2EnLFxuICAgICAgICAnc3YtU0UnOiAnVGVsZWZvbm51bW1lcicsXG4gICAgICAgIHRoOiAn4Lir4Lih4Liy4Lii4LmA4Lil4LiC4LmC4LiX4Lij4Lio4Lix4Lie4LiX4LmMJyxcbiAgICAgICAgdWs6ICfQotC10LvQtdGE0L7QvdC90LjQuSDQvdC+0LzQtdGAJyxcbiAgICAgICAgJ3poLUNOJzogJ+eUteivneWPt+eggScsXG4gICAgICAgICd6aC1UVyc6ICfpm7voqbHomZ/norwnXG4gICAgfSxcbiAgICBzdHJlZXQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ1N0cmHDn2UgdW5kIEhhdXNudW1tZXInLFxuICAgICAgICAnZW4tVVMnOiAnU3RyZWV0IGFkZHJlc3MnLFxuICAgICAgICAnZXMtRVMnOiAnRGlyZWNjacOzbicsXG4gICAgICAgIGZyOiAnQWRyZXNzZScsXG4gICAgICAgIGl0OiAnSW5kaXJpenpvJyxcbiAgICAgICAgamE6ICfkvY/miYDoqbPntLAnLFxuICAgICAgICAncm8tUk8nOiAnQWRyZXPEgycsXG4gICAgICAgIGFyOiAn2LnZhtmI2KfZhiDYp9mE2LTYp9ix2LknLFxuICAgICAgICBjYTogJ2FkcmXDp2EnLFxuICAgICAgICAnY3MtQ1onOiAnYWRyZXNhIHVsaWNlJyxcbiAgICAgICAgJ2RhLURLJzogJ1Zlam5hdm4nLFxuICAgICAgICBlbDogJ860zrnOtc+NzrjPhc69z4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpJfgpLLgpYAg4KSV4KS+IOCkquCkpOCkvicsXG4gICAgICAgICdrby1LUic6ICfso7zshownLFxuICAgICAgICAnbGItTFUnOiAnU3Ryb29zcyBBZHJlc3MnLFxuICAgICAgICAnbmwtTkwnOiAnd29vbmFkcmVzJyxcbiAgICAgICAgJ3B0LVBUJzogJ2VuZGVyZcOnbyBkYSBSdWEnLFxuICAgICAgICAncnUtUlUnOiAn0LDQtNGA0LXRgSDRg9C70LjRhtGLJyxcbiAgICAgICAgJ3NsLVNJJzogJ25hc2xvdiBjZXN0ZScsXG4gICAgICAgICdzdi1TRSc6ICdHYXR1YWRyZXNzJyxcbiAgICAgICAgdGg6ICfguJfguLXguYjguK3guKLguLnguYjguJbguJnguJknLFxuICAgICAgICB1azogJ9CQ0LTRgNC10YHQsCDQstGD0LvQuNGG0ZYnLFxuICAgICAgICAnemgtQ04nOiAn6KGX6YGT5Zyw5Z2AJyxcbiAgICAgICAgJ3poLVRXJzogJ+ihl+mBk+WcsOWdgCdcbiAgICB9LFxuICAgIGFwdDoge1xuICAgICAgICAnZGUtREUnOiAnQXBhcnRtZW50ICMnLFxuICAgICAgICAnZW4tVVMnOiAnQXB0LiAjJyxcbiAgICAgICAgJ2VzLUVTJzogJ0FwYXJ0YW1lbnRvICMnLFxuICAgICAgICBmcjogJ0FwcGFydGVtZW50ICMnLFxuICAgICAgICBpdDogJ0FwcGFydGFtZW50byAjJyxcbiAgICAgICAgamE6ICfpg6jlsYvnlarlj7fjgarjgaknLFxuICAgICAgICAncm8tUk8nOiAnQXBhcnRhbWVudCAjJyxcbiAgICAgICAgYXI6ICfYtNmC2KkgIycsXG4gICAgICAgIGNhOiAnQXBhcnRhbWVudCAjJyxcbiAgICAgICAgJ2NzLUNaJzogJ0J5dCAjJyxcbiAgICAgICAgJ2RhLURLJzogJ0xlamxpZ2hlZCAjJyxcbiAgICAgICAgZWw6ICfOlM65zrHOvM6tz4HOuc+DzrzOsSAjJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkheCkquCkvuCksOCljeCkn+CkruClh+CkguCknyAjJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yVhO2MjO2KuCAjJyxcbiAgICAgICAgJ2xiLUxVJzogJ0FwcGFydGVtZW50ICMnLFxuICAgICAgICAnbmwtTkwnOiAnQXBwYXJ0ZW1lbnQgIycsXG4gICAgICAgICdwdC1QVCc6ICdBcGFydGFtZW50byAjJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0LLQsNGA0YLQuNGA0LAgIycsXG4gICAgICAgICdzbC1TSSc6ICdTdGFub3ZhbmplIMWhdC4nLFxuICAgICAgICAnc3YtU0UnOiAnTMOkZ2VuaGV0ICMnLFxuICAgICAgICB0aDogJ+C4reC4nuC4suC4o+C5jOC4l+C5gOC4oeC5ieC4mSAjJyxcbiAgICAgICAgdWs6ICfQmtCy0LDRgNGC0LjRgNCwIOKElicsXG4gICAgICAgICd6aC1DTic6ICflhazlr5Mg77yDJyxcbiAgICAgICAgJ3poLVRXJzogJ+WFrOWvkyDvvIMnXG4gICAgfSxcbiAgICBwb3N0YWw6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Bvc3RsZWl0emFobCcsXG4gICAgICAgICdlbi1VUyc6ICdQb3N0YWwgY29kZScsXG4gICAgICAgICdlcy1FUyc6ICdDw7NkaWdvIFBvc3RhbCcsXG4gICAgICAgIGZyOiAnQ29kZSBwb3N0YWwnLFxuICAgICAgICBpdDogJ0NvZGljZSBwb3N0YWxlJyxcbiAgICAgICAgamE6ICfpg7Xkvr/nlarlj7cnLFxuICAgICAgICAncm8tUk8nOiAnQ29kIHBvc3RhbCcsXG4gICAgICAgIGFyOiAn2KfZhNix2YXYsiDYp9mE2KjYsdmK2K/ZiicsXG4gICAgICAgIGNhOiAnQ29kaSBQb3N0YWwnLFxuICAgICAgICAnY3MtQ1onOiAnUG/FoXRvdm7DrSBzbcSbcm92YWPDrSDEjcOtc2xvJyxcbiAgICAgICAgJ2RhLURLJzogJ1Bvc3RudW1tZXInLFxuICAgICAgICBlbDogJ86kzrHPh8+FzrTPgc6/zrzOuc66z4zPgiDOms+OzrTOuc66zrHPgicsXG4gICAgICAgICdoaS1JTic6ICfgpKHgpL7gpJUg4KSV4KWL4KShJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yasO2OuCDrsojtmLgnLFxuICAgICAgICAnbGItTFUnOiAnUG9zdGxlaXR6dWVsJyxcbiAgICAgICAgJ25sLU5MJzogJ1Bvc3Rjb2RlJyxcbiAgICAgICAgJ3B0LVBUJzogJ0PDs2RpZ28gcG9zdGFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7Rh9GC0L7QstGL0Lkg0JrQvtC0JyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvxaF0bmEgxaF0ZXZpbGthJyxcbiAgICAgICAgJ3N2LVNFJzogJ1Bvc3RudW1tZXInLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC5hOC4m+C4o+C4qeC4k+C4teC4ouC5jCcsXG4gICAgICAgIHVrOiAn0J/QvtGI0YLQvtCy0LjQuSDRltC90LTQtdC60YEnLFxuICAgICAgICAnemgtQ04nOiAn6YKu5pS/57yW56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+mDteaUv+e3qOeivCdcbiAgICB9LFxuICAgIGNpdHk6IHtcbiAgICAgICAgJ2RlLURFJzogJ1N0YWR0JyxcbiAgICAgICAgJ2VuLVVTJzogJ0NpdHknLFxuICAgICAgICAnZXMtRVMnOiAnQ2l1ZGFkJyxcbiAgICAgICAgZnI6ICdWaWxsZScsXG4gICAgICAgIGl0OiAnQ2l0dGEnLFxuICAgICAgICBqYTogJ+W4gicsXG4gICAgICAgICdyby1STyc6ICdPcmHImScsXG4gICAgICAgIGFyOiAn2YXYr9mK2YbYqScsXG4gICAgICAgIGNhOiAnY2l1dGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ03Em3N0bycsXG4gICAgICAgICdkYS1ESyc6ICdCeScsXG4gICAgICAgIGVsOiAnzqDPjM67zrcnLFxuICAgICAgICAnaGktSU4nOiAn4KS24KS54KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uPhOyLnCcsXG4gICAgICAgICdsYi1MVSc6ICdTdGFkJyxcbiAgICAgICAgJ25sLU5MJzogJ1N0YWQnLFxuICAgICAgICAncHQtUFQnOiAnQ2lkYWRlJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CT0L7RgNC+0LQnLFxuICAgICAgICAnc2wtU0knOiAnTWVzdG8nLFxuICAgICAgICAnc3YtU0UnOiAnU3RhZCcsXG4gICAgICAgIHRoOiAn4LmA4Lih4Li34Lit4LiHJyxcbiAgICAgICAgdWs6ICfQnNGW0YHRgtC+JyxcbiAgICAgICAgJ3poLUNOJzogJ+WfjuW4gicsXG4gICAgICAgICd6aC1UVyc6ICfln47luIInXG4gICAgfSxcbiAgICBwcm92aW5jZToge1xuICAgICAgICAnZGUtREUnOiAnUHJvdmlueicsXG4gICAgICAgICdlbi1VUyc6ICdQcm92aW5jZScsXG4gICAgICAgICdlcy1FUyc6ICdQcm92aW5jaWEnLFxuICAgICAgICBmcjogJ0TDqXBhcnRlbWVudCcsXG4gICAgICAgIGl0OiAnUHJvdmluY2lhJyxcbiAgICAgICAgamE6ICfnnIwnLFxuICAgICAgICAncm8tUk8nOiAnSnVkZXQnLFxuICAgICAgICBhcjogJ9mF2YLYp9i32LnYqScsXG4gICAgICAgIGNhOiAnUHJvdsOtbmNpYScsXG4gICAgICAgICdjcy1DWic6ICdQcm92aW5jaWUnLFxuICAgICAgICAnZGEtREsnOiAnUHJvdmlucycsXG4gICAgICAgIGVsOiAnzpXPgM6xz4HPh86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS+4KSC4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvCcsXG4gICAgICAgICdsYi1MVSc6ICdQcm92w6tueicsXG4gICAgICAgICdubC1OTCc6ICdQcm92aW5jaWUnLFxuICAgICAgICAncHQtUFQnOiAnUHJvdsOtbmNpYScsXG4gICAgICAgICdydS1SVSc6ICfQn9GA0L7QstC40L3RhtC40Y8nLFxuICAgICAgICAnc2wtU0knOiAnUG9rcmFqaW5hJyxcbiAgICAgICAgJ3N2LVNFJzogJ1Byb3ZpbnMnLFxuICAgICAgICB0aDogJ+C4iOC4seC4h+C4q+C4p+C4seC4lCcsXG4gICAgICAgIHVrOiAn0J/RgNC+0LLRltC90YbRltGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+ecgScsXG4gICAgICAgICd6aC1UVyc6ICfnnIEnXG4gICAgfSxcbiAgICAnU2VsZWN0IGEgUHJvdmluY2UnOiB7XG4gICAgICAgICdkZS1ERSc6ICdXw6RobGVuIFNpZSBlaW5lIFByb3ZpbnonLFxuICAgICAgICAnZW4tVVMnOiAnU2VsZWN0IGEgUHJvdmluY2UnLFxuICAgICAgICAnZXMtRVMnOiAnU2VsZWNjaW9uZSB1bmEgcHJvdmluY2lhJyxcbiAgICAgICAgZnI6ICdTw6lsZWN0aW9ubmV6IHVuZSBwcm92aW5jZScsXG4gICAgICAgIGl0OiAnU2VsZXppb25hIHVuYSBwcm92aW5jaWEnLFxuICAgICAgICBqYTogJ+mDvemBk+W6nOecjOOCkumBuOaKnicsXG4gICAgICAgICdyby1STyc6ICdTZWxlY3RhyJtpIG8gcHJvdmluY2llJyxcbiAgICAgICAgYXI6ICfYp9iu2KrYsSDYp9mE2YXYrdin2YHYuNipJyxcbiAgICAgICAgY2E6ICdTZWxlY2Npb25ldSB1bmEgcHJvdsOtbmNpYScsXG4gICAgICAgICdjcy1DWic6ICdWeWJlcnRlIHByb3ZpbmNpaScsXG4gICAgICAgICdkYS1ESyc6ICdWw6ZsZyBlbiBwcm92aW5zJyxcbiAgICAgICAgZWw6ICfOlc+AzrnOu86tzr7PhM61IM68zrnOsSDOtc+AzrHPgc+Hzq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpI/gpJUg4KSq4KWN4KSw4KS+4KSC4KSkIOCkleCkviDgpJrgpK/gpKgg4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvOulvCDshKDtg53tlZjsi63si5zsmKQnLFxuICAgICAgICAnbGItTFUnOiAnV2llbHQgZW5nIFByb3bDq256JyxcbiAgICAgICAgJ25sLU5MJzogJ1NlbGVjdGVlciBlZW4gcHJvdmluY2llJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbGVjaW9uZSB1bWEgcHJvdsOtbmNpYScsXG4gICAgICAgICdydS1SVSc6ICfQktGL0LHQtdGA0LjRgtC1INC/0YDQvtCy0LjQvdGG0LjRjicsXG4gICAgICAgICdzbC1TSSc6ICdJemJlcml0ZSBwcm92aW5jbycsXG4gICAgICAgICdzdi1TRSc6ICdWw6RsaiBlbiBwcm92aW5zJyxcbiAgICAgICAgdGg6ICfguYDguKXguLfguK3guIHguIjguLHguIfguKvguKfguLHguJQnLFxuICAgICAgICB1azogJ9CS0LjQsdC10YDRltGC0Ywg0L/RgNC+0LLRltC90YbRltGOJyxcbiAgICAgICAgJ3poLUNOJzogJ+mAieaLqeecgeS7vScsXG4gICAgICAgICd6aC1UVyc6ICfpgbjmk4fnnIHku70nXG4gICAgfSxcbiAgICBzdGF0ZToge1xuICAgICAgICAnZGUtREUnOiAnQnVuZGVzbGFuZCcsXG4gICAgICAgICdlbi1VUyc6ICdTdGF0ZScsXG4gICAgICAgICdlcy1FUyc6ICdFc3RhZG8nLFxuICAgICAgICBmcjogJ8OJdGF0JyxcbiAgICAgICAgaXQ6ICdTdGF0bycsXG4gICAgICAgIGphOiAn55yMJyxcbiAgICAgICAgJ3JvLVJPJzogJ1N0YXQnLFxuICAgICAgICBhcjogJ9mI2YTYp9mK2KknLFxuICAgICAgICBjYTogJ0VzdGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ1N0w6F0JyxcbiAgICAgICAgJ2RhLURLJzogJ1N0YXQnLFxuICAgICAgICBlbDogJ866zrHPhM6sz4PPhM6xz4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpLDgpL7gpJzgpY3gpK8nLFxuICAgICAgICAna28tS1InOiAn7IOB7YOcJyxcbiAgICAgICAgJ2xiLUxVJzogJ1N0YWF0JyxcbiAgICAgICAgJ25sLU5MJzogJ1N0YWF0JyxcbiAgICAgICAgJ3B0LVBUJzogJ0VzdGFkYScsXG4gICAgICAgICdydS1SVSc6ICfQodC+0YHRgtC+0Y/QvdC40LUnLFxuICAgICAgICAnc2wtU0knOiAnRHLFvmF2YScsXG4gICAgICAgICdzdi1TRSc6ICdzdGF0JyxcbiAgICAgICAgdGg6ICfguKrguJbguLLguJnguLAnLFxuICAgICAgICB1azogJ9CU0LXRgNC20LDQstCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+W3nicsXG4gICAgICAgICd6aC1UVyc6ICflt54nXG4gICAgfSxcbiAgICAnU2VsZWN0IGEgU3RhdGUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdXw6RobGUgZWluZW4gU3RhYXQnLFxuICAgICAgICAnZW4tVVMnOiAnU2VsZWN0IGEgU3RhdGUnLFxuICAgICAgICAnZXMtRVMnOiAnU2VsZWNjaW9uYSB1biBFc3RhZG8nLFxuICAgICAgICBmcjogJ1PDqWxlY3Rpb25uZXIgdW4gw6l0YXQnLFxuICAgICAgICBpdDogJ1NlbGV6aW9uYSB1bm8gU3RhdG8nLFxuICAgICAgICBqYTogJ+W3nuOCkumBuOaKnicsXG4gICAgICAgICdyby1STyc6ICdTZWxlY3RlYXphIHVuIHN0YXQnLFxuICAgICAgICBhcjogJ9it2K/YryDZiNmE2KfZitipJyxcbiAgICAgICAgY2E6ICdTZWxlY2Npb25ldSB1biBlc3RhdCcsXG4gICAgICAgICdjcy1DWic6ICdWeWJlcnRlIHN0w6F0JyxcbiAgICAgICAgJ2RhLURLJzogJ1bDpmxnIGVuIHN0YXQnLFxuICAgICAgICBlbDogJ86Vz4DOuc67zq3Ovs+EzrUgzrzOuc6xIM+Azr/Ou865z4TOtc6vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSP4KSVIOCksOCkvuCknOCljeCkryDgpJXgpL4g4KSa4KSv4KSoIOCkleCksOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfso7wg7ISg7YOdJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dpZWx0IGUgU3RhYXQnLFxuICAgICAgICAnbmwtTkwnOiAnU2VsZWN0ZWVyIGVlbiBzdGFhdCcsXG4gICAgICAgICdwdC1QVCc6ICdTZWxlY2lvbmUgdW0gRXN0YWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0YvQsdC10YDQuNGC0LUg0YjRgtCw0YInLFxuICAgICAgICAnc2wtU0knOiAnSXpiZXJpdGUgZHLFvmF2bycsXG4gICAgICAgICdzdi1TRSc6ICdWw6RsaiBlbiBzdGF0JyxcbiAgICAgICAgdGg6ICfguYDguKXguLfguK3guIHguKPguLHguJAnLFxuICAgICAgICB1azogJ9CS0LjQsdC10YDRltGC0Ywg0YjRgtCw0YInLFxuICAgICAgICAnemgtQ04nOiAn6YCJ5oup5LiA5Liq5beeJyxcbiAgICAgICAgJ3poLVRXJzogJ+mBuOaTh+S4gOWAi+W3nidcbiAgICB9LFxuICAgIGNvdW50eToge1xuICAgICAgICAnZGUtREUnOiAnQmV6aXJrJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NvdW50eScsXG4gICAgICAgICdlcy1FUyc6ICdDb25kYWRvJyxcbiAgICAgICAgZnI6ICdDb210w6knLFxuICAgICAgICBpdDogJ0NvbnRlYScsXG4gICAgICAgIGphOiAn6YOhJyxcbiAgICAgICAgJ3JvLVJPJzogJ0p1ZGXIm3VsJyxcbiAgICAgICAgYXI6ICfZhdmC2KfYt9i52KknLFxuICAgICAgICBjYTogJ2NvbXRhdCcsXG4gICAgICAgICdjcy1DWic6ICdva3JlcycsXG4gICAgICAgICdkYS1ESyc6ICdBbXQnLFxuICAgICAgICBlbDogJ86azr/OvM63z4TOtc6vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KS+4KSJ4KSC4KSf4KWAJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q1sCcsXG4gICAgICAgICdsYi1MVSc6ICdHcm9mc2NoYWZ0JyxcbiAgICAgICAgJ25sLU5MJzogJ2Rpc3RyaWN0JyxcbiAgICAgICAgJ3B0LVBUJzogJ2NvbmRhZG8nLFxuICAgICAgICAncnUtUlUnOiAn0L7QutGA0YPQsycsXG4gICAgICAgICdzbC1TSSc6ICdPa3Jvxb5qZScsXG4gICAgICAgICdzdi1TRSc6ICdHcmV2c2thcCcsXG4gICAgICAgIHRoOiAn4LmA4LiC4LiVJyxcbiAgICAgICAgdWs6ICfQn9C+0LLRltGCJyxcbiAgICAgICAgJ3poLUNOJzogJ+WOvycsXG4gICAgICAgICd6aC1UVyc6ICfnuKMnXG4gICAgfSxcbiAgICBjb3VudHJ5OiB7XG4gICAgICAgICdkZS1ERSc6ICdXw6RobGVuIFNpZSBlaW4gTGFuZCcsXG4gICAgICAgICdlbi1VUyc6ICdTZWxlY3QgYSBjb3VudHJ5JyxcbiAgICAgICAgJ2VzLUVTJzogJ1NlbGVjY2lvbmUgdW4gcGHDrXMnLFxuICAgICAgICBmcjogJ1BheXMnLFxuICAgICAgICBpdDogJ1NlbGV6aW9uYSB1biBwYWVzZScsXG4gICAgICAgIGphOiAn5Zu9JyxcbiAgICAgICAgJ3JvLVJPJzogJ1NlbGVjdGVhemEgbyB0YXJhJyxcbiAgICAgICAgYXI6ICfYp9iu2KrYsSDYr9mI2YTYqScsXG4gICAgICAgIGNhOiAnU2VsZWNjaW9uZXUgdW4gcGHDrXMnLFxuICAgICAgICAnY3MtQ1onOiAnVnliZXIgemVtaScsXG4gICAgICAgICdkYS1ESyc6ICdWw6ZsZyBldCBsYW5kJyxcbiAgICAgICAgZWw6ICfOlc+AzrnOu86tzr7PhM61IM+Hz47Pgc6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCli+CkiCDgpKbgpYfgpLYg4KSa4KWB4KSo4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q1reqwgOulvCDqs6DrpbTsi5wg7JikJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dpZWx0IGUgTGFuZCcsXG4gICAgICAgICdubC1OTCc6ICdTZWxlY3RlZXIgZWVuIGxhbmQnLFxuICAgICAgICAncHQtUFQnOiAnU2VsZWNpb25lIHVtIHBhaXMnLFxuICAgICAgICAncnUtUlUnOiAn0JLRi9Cx0LXRgNC40YLQtSDRgdGC0YDQsNC90YMnLFxuICAgICAgICAnc2wtU0knOiAnSXpiZXJpdGUgZHLFvmF2bycsXG4gICAgICAgICdzdi1TRSc6ICdWw6RsaiBldHQgbGFuZCcsXG4gICAgICAgIHRoOiAn4LmA4Lil4Li34Lit4LiB4Lib4Lij4Liw4LmA4LiX4LioJyxcbiAgICAgICAgdWs6ICfQktC40LHQtdGA0ZbRgtGMINC60YDQsNGX0L3RgycsXG4gICAgICAgICd6aC1DTic6ICfpgInmi6nkuIDkuKrlm73lrrYnLFxuICAgICAgICAnemgtVFcnOiAn6YG45pOH5LiA5YCL5ZyL5a62J1xuICAgIH0sXG4gICAgJ2NvdW50cnktbGFiZWwnOiB7XG4gICAgICAgICdkZS1ERSc6ICdMYW5kJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NvdW50cnknLFxuICAgICAgICAnZXMtRVMnOiAnUGHDrXMnLFxuICAgICAgICBmcjogJ1BheXMnLFxuICAgICAgICBpdDogJ05hemlvbmUnLFxuICAgICAgICBqYTogJ+WbvScsXG4gICAgICAgICdyby1STyc6ICfImmFyxIMnLFxuICAgICAgICBhcjogJ9iv2YjZhNipJyxcbiAgICAgICAgY2E6ICdQYcOtcycsXG4gICAgICAgICdjcy1DWic6ICdaZW3EmycsXG4gICAgICAgIGVsOiAnzqfPjs+BzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSm4KWH4KS2JyxcbiAgICAgICAgJ2tvLUtSJzogJ+q1reqwgCcsXG4gICAgICAgICdsYi1MVSc6ICdMYW5kJyxcbiAgICAgICAgJ25sLU5MJzogJ0xhbmQnLFxuICAgICAgICAncHQtUFQnOiAnUGHDrXMnLFxuICAgICAgICAncnUtUlUnOiAn0KHRgtGA0LDQvdCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0Ryxb5hdmEnLFxuICAgICAgICAnc3YtU0UnOiAnTGFuZCcsXG4gICAgICAgIHRoOiAn4Lib4Lij4Liw4LmA4LiX4LioJyxcbiAgICAgICAgdWs6ICfQmtGA0LDRl9C90LAnLFxuICAgICAgICAnemgtQ04nOiAn5Zu95a62JyxcbiAgICAgICAgJ3poLVRXJzogJ+Wci+WutidcbiAgICB9LFxuICAgICdPcmRlciBub3RlcyAob3B0aW9uYWwpOic6IHtcbiAgICAgICAgJ2RlLURFJzogJ0Jlc3RlbGxub3RpemVuIChvcHRpb25hbCk6JyxcbiAgICAgICAgJ2VuLVVTJzogJ09yZGVyIG5vdGVzIChvcHRpb25hbCk6JyxcbiAgICAgICAgJ2VzLUVTJzogJ05vdGFzIGRlIHBlZGlkbyBvcGNpb25hbDonLFxuICAgICAgICBmcjogJ05vdGVzIGRlIGNvbW1hbmRlIChmYWN1bHRhdGlmKTonLFxuICAgICAgICBpdDogJ05vdGUgZGVsbFxcJ29yZGluZSAob3B6aW9uYWxlKTonLFxuICAgICAgICBqYTogJ+azqOaWh+ODoeODou+8iOOCquODl+OCt+ODp+ODsyk6JyxcbiAgICAgICAgJ3JvLVJPJzogJ05vdGUgZGUgY29tYW5kxIMgKG9wyJtpb25hbCk6JyxcbiAgICAgICAgYXI6ICfZhdmE2KfYrdi42KfYqiDYp9mE2LfZhNioICjYp9iu2KrZitin2LHZiik6JyxcbiAgICAgICAgY2E6ICdub3RlcyBkZSBjb21hbmRhIChvcGNpb25hbCk6JyxcbiAgICAgICAgJ2NzLUNaJzogJ3Bvem7DoW1reSBrIG9iamVkbsOhdmNlICh2b2xpdGVsbsOpKTonLFxuICAgICAgICBlbDogJ8+DzrfOvM61zrnPjs+DzrXOuc+CIM+AzrHPgc6xzrPOs861zrvOr86xz4IgKM+Az4HOv86xzrnPgc61z4TOuc66z4wpOicsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpKbgpYfgpLYg4KSo4KWL4KSf4KWN4KS4ICjgpLXgpYjgpJXgpLLgpY3gpKrgpL/gpJUpOicsXG4gICAgICAgICdrby1LUic6ICfso7zrrLgg66mU66qoKOyEoO2DnSDsgqztla0pOicsXG4gICAgICAgICdsYi1MVSc6ICdCZXN0ZWxsdW5nc25vdGl6ZW4gKG9wdGlvbmFsKTonLFxuICAgICAgICAnbmwtTkwnOiAnYmVzdGVsbm90aXRpZXMgKG9wdGlvbmVlbCk6JyxcbiAgICAgICAgJ3B0LVBUJzogJ25vdGFzIGRvIHBlZGlkbyAob3BjaW9uYWwpOicsXG4gICAgICAgICdydS1SVSc6ICfQv9GA0LjQvNC10YfQsNC90LjRjyDQuiDQt9Cw0LrQsNC30YMgKNC90LXQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+KTogJyxcbiAgICAgICAgJ3NsLVNJJzogJ29wb21iZSBvIG5hcm/EjWlsdSAobmVvYnZlem5vKTogJyxcbiAgICAgICAgJ3N2LVNFJzogJ2Jlc3TDpGxsbmluZ3NhbnRlY2tuaW5nYXIgKHZhbGZyaXR0KTonLFxuICAgICAgICB0aDogJ+C4q+C4oeC4suC4ouC5gOC4q+C4leC4uOC4geC4suC4o+C4quC4seC5iOC4h+C4i+C4t+C5ieC4rSAo4LmE4Lih4LmI4Lia4Lix4LiH4LiE4Lix4LiaKTonLFxuICAgICAgICB1azogJ9C/0YDQuNC80ZbRgtC60Lgg0LTQviDQt9Cw0LzQvtCy0LvQtdC90L3RjyAo0L3QtdC+0LHQvtCyXFwn0Y/Qt9C60L7QstC+KScsXG4gICAgICAgICd6aC1DTic6ICforqLljZXlpIfms6jvvIjlj6/pgInvvIk6JyxcbiAgICAgICAgJ3poLVRXJzogJ+ioguWWruWCmeiou++8iOWPr+mBuO+8iTpcIidcbiAgICB9LFxuICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgYnV0IHRoZSBwYXltZW50IG1heSBoYXZlIGJlZW4gbWFkZS4gUGxlYXNlIGNoZWNrIGJlZm9yZSBwbGFjaW5nIGFub3RoZXIgb3JkZXIuJzoge1xuICAgICAgICAnZGUtREUnOiAnRXMgaXN0IGVpbiBGZWhsZXIgYXVmZ2V0cmV0ZW4sIGFiZXIgZGllIFphaGx1bmcgd3VyZGUgbcO2Z2xpY2hlcndlaXNlIGdlbGVpc3RldC4gQml0dGUgw7xiZXJwcsO8ZmVuIFNpZSBkaWVzLCBiZXZvciBTaWUgZWluZSB3ZWl0ZXJlIEJlc3RlbGx1bmcgYXVmZ2ViZW4uJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBidXQgdGhlIHBheW1lbnQgbWF5IGhhdmUgYmVlbiBtYWRlLiBQbGVhc2UgY2hlY2sgYmVmb3JlIHBsYWNpbmcgYW5vdGhlciBvcmRlci4nLFxuICAgICAgICAnZXMtRVMnOiAnU2UgcHJvZHVqbyB1biBlcnJvciwgcGVybyBlcyBwb3NpYmxlIHF1ZSBzZSBoYXlhIHJlYWxpemFkbyBlbCBwYWdvLiBWZXJpZmlxdWUgYW50ZXMgZGUgcmVhbGl6YXIgb3RybyBwZWRpZG8uJyxcbiAgICAgICAgZnI6ICdVbmUgZXJyZXVyIHNcXCdlc3QgcHJvZHVpdGUsIG1haXMgbGUgcGFpZW1lbnQgYSBwZXV0LcOqdHJlIMOpdMOpIGVmZmVjdHXDqS4gVmV1aWxsZXogdsOpcmlmaWVyIGF2YW50IGRlIHBhc3NlciB1bmUgYXV0cmUgY29tbWFuZGUuJyxcbiAgICAgICAgaXQ6ICdRdWFsY29zYSDDqCBhbmRhdG8gc3RvcnRvLCBtYSBpbCBwYWdhbWVudG8gcG90cmViYmUgZXNzZXJlIHN0YXRvIGVmZmV0dHVhdG8uIFNpIHByZWdhIGRpIGNvbnRyb2xsYXJlIHByaW1hIGRpIGVmZmV0dHVhcmUgdW4gYWx0cm8gb3JkaW5lLicsXG4gICAgICAgIGphOiAn5L2V44GL5ZWP6aGM44GM55m655Sf44GX44G+44GX44Gf44GM44CB5pSv5omV44GE44GM6KGM44KP44KM44Gf5Y+v6IO95oCn44GM44GC44KK44G+44GZ44CCIOWIpeOBruazqOaWh+OCkuOBmeOCi+WJjeOBq+eiuuiqjeOBl+OBpuOBj+OBoOOBleOBhOOAgicsXG4gICAgICAgICdyby1STyc6ICdDZXZhIG51IGEgZnVuY8ibaW9uYXQgY29yZWN0LCBkYXIgZXN0ZSBwb3NpYmlsIGNhIHBsYXRhIHPEgyBmaSBmb3N0IGVmZWN0dWF0xIMuIFbEgyBydWfEg20gc8SDIHZlcmlmaWNhyJtpIMOubmFpbnRlIGRlIGEgcGxhc2EgbyBhbHTEgyBjb21hbmTEgy4nLFxuICAgICAgICBhcjogJ9it2K/YqyDYrti32KMg2YXYpyDYjCDZiNmE2YPZhiDYsdio2YXYpyDYqtmFINin2YTYs9iv2KfYry4g2YrYsdis2Ykg2KfZhNiq2K3ZgtmCINmC2KjZhCDYqtmC2K/ZitmFINi32YTYqCDYotiu2LEuJyxcbiAgICAgICAgY2E6ICdTXFwnaGEgcHJvZHXDr3QgdW4gZXJyb3IsIHBlcsOyIMOpcyBwb3NzaWJsZSBxdWUgc1xcJ2hhZ2kgZWZlY3R1YXQgZWwgcGFnYW1lbnQuIENvbXByb3ZldS1obyBhYmFucyBkZSBmZXIgdW5hIGFsdHJhIGNvbWFuZGEuJyxcbiAgICAgICAgJ2NzLUNaJzogJ07Em2NvIHNlIHBva2F6aWxvLCBhbGUgcGxhdGJhIG1vxb5uw6EgYnlsYSBwcm92ZWRlbmEuIFDFmWVkIHphZMOhbsOtbSBkYWzFocOtIG9iamVkbsOhdmt5IHByb3PDrW0gemtvbnRyb2x1anRlLicsXG4gICAgICAgICdkYS1ESyc6ICdOb2dldCBnaWsgZ2FsdCwgbWVuIGJldGFsaW5nZW4ga2FuIHbDpnJlIGZvcmV0YWdldC4gS29udHJvbGxlciB2ZW5saWdzdCwgZsO4ciBkdSBhZmdpdmVyIGVuIGFuZGVuIG9yZHJlLicsXG4gICAgICAgIGVsOiAnzprOrM+Ezrkgz4DOrs6zzrUgz4PPhM+BzrHOss6sLCDOsc67zrvOrCDOtyDPgM67zrfPgc+JzrzOriDOvM+Azr/Pgc61zq8gzr3OsSDOrc+HzrXOuSDOs86vzr3Otc65LiDOoM6xz4HOsc66zrHOu8+OIM61zrvOrc6zzr7PhM61IM+Az4HOuc69IM66zqzOvc61z4TOtSDOrM67zrvOtyDPgM6xz4HOsc6zzrPOtc67zq/OsS4nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWB4KSbIOCkl+CksuCkpCDgpLngpYHgpIYsIOCksuClh+CkleCkv+CkqCDgpLngpYsg4KS44KSV4KSk4KS+IOCkueCliCDgpJXgpL8g4KSt4KWB4KSX4KSk4KS+4KSoIOCkueCliyDgpJfgpK/gpL4g4KS54KWLLiDgpJXgpYPgpKrgpK/gpL4g4KSP4KSVIOCklOCksCDgpIbgpKbgpYfgpLYg4KSm4KWH4KSo4KWHIOCkuOClhyDgpKrgpLngpLLgpYcg4KSc4KS+4KSC4KSaIOCksuClh+CkguClpCcsXG4gICAgICAgICdrby1LUic6ICfrrLjsoJzqsIAg67Cc7IOd7ZaI7KeA66eMIOqysOygnOqwgCDsmYTro4zrkJjsl4jsnYQg7IiYIOyeiOyKteuLiOuLpC4g64uk66W4IOyjvOusuOydhCDtlZjquLAg7KCE7JeQIO2ZleyduO2VmOyLnOq4sCDrsJTrno3ri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VwcGVzIGFzcyBmYWxzY2ggZ2FhbmcsIGF3ZXIgZFxcJ0JlenVlbHVuZyBhc3MgdmzDpGljaHQgZ2VtYWFjaCBnaW5uLiBQcsOpaWZ0IHcuZS5nLiBpZXIgRGlyIGVuZyBhbmVyIEJlc3RlbGx1bmcgcGxhesOpaWVydC4nLFxuICAgICAgICAnbmwtTkwnOiAnRXIgaXMgaWV0cyBtaXNnZWdhYW4sIG1hYXIgZGUgYmV0YWxpbmcga2FuIHppam4gZ2VkYWFuLiBDb250cm9sZWVyIGRpdCB2b29yZGF0IHUgZWVuIG5pZXV3ZSBiZXN0ZWxsaW5nIHBsYWF0c3QuJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FsZ28gZGV1IGVycmFkbywgbWFzIG8gcGFnYW1lbnRvIHBvZGUgdGVyIHNpZG8gZmVpdG8uIFBvciBmYXZvciwgdmVyaWZpcXVlIGFudGVzIGRlIGZhemVyIG91dHJvIHBlZGlkby4nLFxuICAgICAgICAncnUtUlUnOiAn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0L3QviDQvtC/0LvQsNGC0LAg0LzQvtCz0LvQsCDQsdGL0YLRjCDQv9GA0L7QuNC30LLQtdC00LXQvdCwLiDQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0LXRgNC10LQg0YDQsNC30LzQtdGJ0LXQvdC40LXQvCDQtNGA0YPQs9C+0LPQviDQt9Cw0LrQsNC30LAuJyxcbiAgICAgICAgJ3NsLVNJJzogJ05la2FqIGplIMWhbG8gbmFyb2JlLCBtb3JkYSBwYSBqZSBiaWxvIHBsYcSNaWxvIGl6dmVkZW5vLiBQcmVkZW4gb2RkYXRlIG5vdm8gbmFyb8SNaWxvLCBwcmV2ZXJpdGUuJyxcbiAgICAgICAgJ3N2LVNFJzogJ07DpWdvdCBnaWNrIGZlbCwgbWVuIGJldGFsbmluZ2VuIGthbiBoYSBnam9ydHMuIEtvbnRyb2xsZXJhIGlubmFuIGR1IGfDtnIgZW4gYW5uYW4gYmVzdMOkbGxuaW5nLicsXG4gICAgICAgIHRoOiAn4Lih4Li14Lia4Liy4LiH4Lit4Lii4LmI4Liy4LiH4Lic4Li04LiU4Lie4Lil4Liy4LiUIOC5geC4leC5iOC4reC4suC4iOC4oeC4teC4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4meC5geC4peC5ieC4pyDguYLguJvguKPguJTguJXguKPguKfguIjguKrguK3guJrguIHguYjguK3guJnguJfguLPguIHguLLguKPguKrguLHguYjguIfguIvguLfguYnguK3guK3guLfguYjguJknLFxuICAgICAgICB1azogJ9Cp0L7RgdGMINC/0ZbRiNC70L4g0L3QtSDRgtCw0LosINCw0LvQtSDQvtC/0LvQsNGC0LAsINC80L7QttC70LjQstC+LCDQsdGD0LvQsCDQt9C00ZbQudGB0L3QtdC90LAuINCR0YPQtNGMINC70LDRgdC60LAsINC/0LXRgNC10LLRltGA0YLQtSwg0L/QtdGA0Ygg0L3RltC2INGA0L7QsdC40YLQuCDRltC90YjQtSDQt9Cw0LzQvtCy0LvQtdC90L3Rjy4nLFxuICAgICAgICAnemgtQ04nOiAn5Ye65LqG54K56Zeu6aKY77yM5L2G5Y+v6IO95bey5LuY5qy+44CCIOivt+WcqOS4i+WPpuS4gOS4quiuouWNleS5i+WJjeajgOafpeOAgicsXG4gICAgICAgICd6aC1UVyc6ICflh7rkuobpu57llY/poYzvvIzkvYblj6/og73lt7Lku5jmrL7jgIIg6KuL5Zyo5LiL5Y+m5LiA5YCL6KiC5Zau5LmL5YmN5qqi5p+l44CCJ1xuICAgIH0sXG4gICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBidXQgZG9uXFwndCB3b3JyeS4gV2UgaGF2ZSB5b3VyIG9yZGVyIGRldGFpbHMsIGFuZCB5b3VyIHBheW1lbnQgaGFzIGJlZW4gbWFkZS4gVGhlcmUgaXMgbm8gbmVlZCB0byBwbGFjZSBhbm90aGVyIG9yZGVyLic6IHtcbiAgICAgICAgJ2RlLURFJzogJ0V0d2FzIGlzdCBzY2hpZWYgZ2VsYXVmZW4sIGFiZXIga2VpbmUgU29yZ2UuIFdpciBoYWJlbiBJaHJlIEJlc3RlbGxkYXRlbiB1bmQgSWhyZSBaYWhsdW5nIGlzdCBlcmZvbGd0LiBFaW5lIHdlaXRlcmUgQmVzdGVsbHVuZyBpc3QgbmljaHQgZXJmb3JkZXJsaWNoLicsXG4gICAgICAgICdlbi1VUyc6ICdTb21ldGhpbmcgd2VudCB3cm9uZywgYnV0IGRvblxcJ3Qgd29ycnkuIFdlIGhhdmUgeW91ciBvcmRlciBkZXRhaWxzLCBhbmQgeW91ciBwYXltZW50IGhhcyBiZWVuIG1hZGUuIFRoZXJlIGlzIG5vIG5lZWQgdG8gcGxhY2UgYW5vdGhlciBvcmRlci4nLFxuICAgICAgICAnZXMtRVMnOiAnQWxnbyBzYWxpw7MgbWFsLCBwZXJvIG5vIHNlIHByZW9jdXBlLiBUZW5lbW9zIGxvcyBkZXRhbGxlcyBkZSBzdSBwZWRpZG8geSBzdSBwYWdvIHNlIGhhIHJlYWxpemFkby4gTm8gZXMgbmVjZXNhcmlvIHJlYWxpemFyIG90cm8gcGVkaWRvLicsXG4gICAgICAgIGZyOiAnUXVlbHF1ZSBjaG9zZSBzXFwnZXN0IG1hbCBwYXNzw6ksIG1haXMgbmUgdm91cyBpbnF1acOpdGV6IHBhcy4gTm91cyBhdm9ucyBsZXMgZMOpdGFpbHMgZGUgdm90cmUgY29tbWFuZGUgZXQgdm90cmUgcGFpZW1lbnQgYSDDqXTDqSBlZmZlY3R1w6kuIElsIG5cXCdlc3QgcGFzIG7DqWNlc3NhaXJlIGRlIHBhc3NlciB1bmUgYXV0cmUgY29tbWFuZGUuJyxcbiAgICAgICAgaXQ6ICdRdWFsY29zYSDDqCBhbmRhdG8gc3RvcnRvLCBtYSBub24gcHJlb2NjdXBhcnRpLiBBYmJpYW1vIGkgZGV0dGFnbGkgZGVsIHR1byBvcmRpbmUgZSBpbCBwYWdhbWVudG8gw6ggc3RhdG8gZWZmZXR0dWF0by4gTm9uIMOoIG5lY2Vzc2FyaW8gZWZmZXR0dWFyZSB1biBhbHRybyBvcmRpbmUuJyxcbiAgICAgICAgamE6ICfkvZXjgYvllY/poYzjgYznmbrnlJ/jgZfjgb7jgZfjgZ/jgYzjgIHlv4PphY3jgZfjgarjgYTjgafjgY/jgaDjgZXjgYTjgIIg44GU5rOo5paH44Gu6Kmz57Sw44GM44GC44KK44CB44GK5pSv5omV44GE44GM5a6M5LqG44GX44G+44GX44Gf44CCIOWIpeOBruazqOaWh+OCkuOBmeOCi+W/heimgeOBr+OBguOCiuOBvuOBm+OCk+OAgicsXG4gICAgICAgICdyby1STyc6ICdDZXZhIGEgbWVycyBwcm9zdCwgZGFyIG51IHbEgyBmYWNlyJtpIGdyaWppLiBBdmVtIGRldGFsaWlsZSBjb21lbnppaSBkdnMuIMiZaSBwbGF0YSBkdnMuIGEgZm9zdCBlZmVjdHVhdMSDLiBOdSBlc3RlIG5ldm9pZSBzxIMgcGxhc2HIm2kgbyBhbHTEgyBjb21hbmTEgy4nLFxuICAgICAgICBhcjogJ9it2K/YqyDYrti32KMg2YXYpyDYjCDZhNmD2YYg2YTYpyDYqtmC2YTZgi4g2YTYr9mK2YbYpyDYqtmB2KfYtdmK2YQg2LfZhNio2YMg2Iwg2YjZgtivINiq2YUg2LPYr9in2K8g2K/Zgdi52KrZgy4g2YTZitiz2Kog2YfZhtin2YMg2K3Yp9is2Kkg2YTYqtmC2K/ZitmFINi32YTYqCDYotiu2LEuJyxcbiAgICAgICAgY2E6ICdTXFwnaGEgcHJvZHXDr3QgdW4gZXJyb3IsIHBlcsOyIG5vIHVzIHByZW9jdXBldS4gVGVuaW0gbGVzIGRhZGVzIGRlIGxhIHZvc3RyYSBjb21hbmRhIGkgc+KAmWhhIGVmZWN0dWF0IGVsIHBhZ2FtZW50LiBObyBjYWwgZmVyIHVuYSBhbHRyYSBjb21hbmRhLicsXG4gICAgICAgICdjcy1DWic6ICdOxJtjbyBzZSBwb2themlsbywgYWxlIG5lYm9qdGUgc2UuIE3DoW1lIHBvZHJvYm5vc3RpIG8gdmHFocOtIG9iamVkbsOhdmNlIGEgdmHFoWUgcGxhdGJhIGJ5bGEgcHJvdmVkZW5hLiBOZW7DrSB0xZllYmEgemFkw6F2YXQgZGFsxaHDrSBvYmplZG7DoXZrdS4nLFxuICAgICAgICAnZGEtREsnOiAnTm9nZXQgZ2lrIGdhbHQsIG1lbiBiYXJlIHJvbGlnLiBWaSBoYXIgZGluZSBvcmRyZW9wbHlzbmluZ2VyLCBvZyBkaW4gYmV0YWxpbmcgZXIgZm9yZXRhZ2V0LiBEZXQgZXIgaWtrZSBuw7hkdmVuZGlndCBhdCBhZmdpdmUgZW4gYW5kZW4gb3JkcmUuJyxcbiAgICAgICAgZWw6ICfOms6sz4TOuSDPgM6uzrPOtSDPg8+Ez4HOsc6yzqwsIM6xzrvOu86sIM68zrfOvSDOsc69zrfPg8+Fz4fOtc6vz4TOtS4gzojPh86/z4XOvM61IM+EzrEgz4PPhM6/zrnPh861zq/OsSDPhM63z4Igz4DOsc+BzrHOs86zzrXOu86vzrHPgiDPg86xz4IgzrrOsc65IM63IM+AzrvOt8+Bz4nOvM6uIM+DzrHPgiDOrc+HzrXOuSDPgM+BzrHOs868zrHPhM6/z4DOv865zrfOuM61zq8uIM6UzrXOvSDPh8+BzrXOuc6szrbOtc+EzrHOuSDOvc6xIM66zqzOvc61z4TOtSDOrM67zrvOtyDPgM6xz4HOsc6zzrPOtc67zq/OsS4nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWB4KSbIOCkl+CksuCkpCDgpLngpYsg4KSX4KSv4KS+LCDgpLLgpYfgpJXgpL/gpKgg4KSa4KS/4KSC4KSk4KS+IOCkqCDgpJXgpLDgpYfgpILgpaQg4KS54KSu4KS+4KSw4KWHIOCkquCkvuCkuCDgpIbgpKrgpJXgpYcg4KSG4KSm4KWH4KS2IOCkleCkviDgpLXgpL/gpLXgpLDgpKMg4KS54KWILCDgpJTgpLAg4KSG4KSq4KSV4KS+IOCkreClgeCkl+CkpOCkvuCkqCDgpJXgpLAg4KSm4KS/4KSv4KS+IOCkl+Ckr+CkviDgpLngpYjgpaQg4KSm4KWC4KS44KSw4KS+IOCkhuCkpuClh+CktiDgpKbgpYfgpKjgpYcg4KSV4KWAIOCkleCli+CkiCDgpIbgpLXgpLbgpY3gpK/gpJXgpKTgpL4g4KSo4KS54KWA4KSCIOCkueCliOClpCcsXG4gICAgICAgICdrby1LUic6ICfrrLjsoJzqsIAg67Cc7IOd7ZaI7KeA66eMIOqxseygle2VmOyngCDrp4jshLjsmpQuIOyjvOusuCDshLjrtoDsoJXrs7TqsIAg7J6I7Jy866mwIOqysOygnOqwgCDsmYTro4zrkJjsl4jsirXri4jri6QuIOuLpOuluCDso7zrrLjsnYQg7ZWgIO2VhOyalOqwgCDsl4bsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VwcGVzIGFzcyBmYWxzY2ggZ2FhbmcsIGF3ZXIgbWFhY2ggZGVyIGtlbmcgU3Vlcmdlbi4gTWlyIGh1bm4gw4RyIEJlc3RlbGx1bmdzZGV0YWlsZXIsIGFuIMOEciBCZXp1ZWx1bmcgZ291ZiBnZW1hYWNoLiBFdCBhc3MgbmV0IG7DqWlkZWcgZW5nIGFuZXIgQmVzdGVsbHVuZyB6ZSBtYWFjaGVuLicsXG4gICAgICAgICdubC1OTCc6ICdFciBpcyBpZXRzIG1pc2dlZ2FhbiwgbWFhciBtYWFrIGplIGdlZW4gem9yZ2VuLiBXZSBoZWJiZW4gdXcgYmVzdGVsZ2VnZXZlbnMgZW4gdXcgYmV0YWxpbmcgaXMgZ2VkYWFuLiBIZXQgaXMgbmlldCBub2RpZyBvbSBub2cgZWVuIGJlc3RlbGxpbmcgdGUgcGxhYXRzZW4uJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FsZ28gZGV1IGVycmFkbywgbWFzIG7Do28gc2UgcHJlb2N1cGUuIFRlbW9zIG9zIGRldGFsaGVzIGRvIHNldSBwZWRpZG8gZSBzZXUgcGFnYW1lbnRvIGZvaSBlZmV0dWFkby4gTsOjbyBow6EgbmVjZXNzaWRhZGUgZGUgZmF6ZXIgb3V0cm8gcGVkaWRvLicsXG4gICAgICAgICdydS1SVSc6ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LCDQvdC+INC90LUg0LLQvtC70L3Rg9C50YLQtdGB0YwuINCjINC90LDRgSDQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0L4g0LLQsNGI0LXQvCDQt9Cw0LrQsNC30LUsINC4INCy0LDRiCDQv9C70LDRgtC10LYg0LHRi9C7INC/0YDQvtC40LfQstC10LTQtdC9LiDQntGH0LXRgNC10LTQvdC+0Lkg0LfQsNC60LDQtyDQtNC10LvQsNGC0Ywg0L3QtSDQvdGD0LbQvdC+LicsXG4gICAgICAgICdzbC1TSSc6ICdOZWthaiBqZSDFoWxvIG5hcm9iZSwgdmVuZGFyIG5lIHNrcmJpdGUuIFBvZGF0a2UgbyBuYXJvxI1pbHUgaW1hbW8gaW4gcGxhxI1pbG8gamUgYmlsbyBvcHJhdmxqZW5vLiBEcnVnZWdhIG5hcm/EjWlsYSBuaSB0cmViYSBvZGRhdGkuJyxcbiAgICAgICAgJ3N2LVNFJzogJ07DpWdvdCBnaWNrIGZlbCwgbWVuIG9yb2EgZGlnIGludGUuIFZpIGhhciBkaW5hIGJlc3TDpGxsbmluZ3N1cHBnaWZ0ZXIgb2NoIGRpbiBiZXRhbG5pbmcgaGFyIGdqb3J0cy4gRGV0IGZpbm5zIGluZ2VuIGFubGVkbmluZyBhdHQgZ8O2cmEgZW4gYW5uYW4gYmVzdMOkbGxuaW5nLicsXG4gICAgICAgIHRoOiAn4Lih4Li14Lia4Liy4LiH4Lit4Lii4LmI4Liy4LiH4Lic4Li04LiU4Lie4Lil4Liy4LiUIOC5geC4leC5iOC5hOC4oeC5iOC4leC5ieC4reC4h+C4geC4seC4h+C4p+C4pSDguYDguKPguLLguKHguLXguKPguLLguKLguKXguLDguYDguK3guLXguKLguJTguIHguLLguKPguKrguLHguYjguIfguIvguLfguYnguK3guILguK3guIfguITguLjguJPguYHguKXguLDguIrguLPguKPguLDguYDguIfguLTguJnguYDguKPguLXguKLguJrguKPguYnguK3guKLguYHguKXguYnguKcg4LmE4Lih4LmI4LiI4Liz4LmA4Lib4LmH4LiZ4LiV4LmJ4Lit4LiH4LiX4Liz4LiB4Liy4Lij4Liq4Lix4LmI4LiH4LiL4Li34LmJ4Lit4Lit4Li34LmI4LiZJyxcbiAgICAgICAgdWs6ICfQqdC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6LCDQsNC70LUg0L3QtSDRhdCy0LjQu9GO0LnRgtC10YHRjC4g0KMg0L3QsNGBINGUINC00LDQvdGWINCy0LDRiNC+0LPQviDQt9Cw0LzQvtCy0LvQtdC90L3Rjywg0ZYg0LLQsNGIINC/0LvQsNGC0ZbQtiDQt9C00ZbQudGB0L3QtdC90L4uINCd0LXQvNCw0ZQg0L3QtdC+0LHRhdGW0LTQvdC+0YHRgtGWINGA0L7QsdC40YLQuCDRltC90YjQtSDQt9Cw0LzQvtCy0LvQtdC90L3Rjy4nLFxuICAgICAgICAnemgtQ04nOiAn5Ye65LqG54K56Zeu6aKY77yM5L2G5Yir5ouF5b+D44CCIOaIkeS7rOacieaCqOeahOiuouWNleivpue7huS/oeaBr++8jOaCqOeahOS7mOasvuW3suWujOaIkOOAgiDml6DpnIDlho3kuIvorqLljZXjgIInLFxuICAgICAgICAnemgtVFcnOiAn5Ye65LqG6bue5ZWP6aGM77yM5L2G5Yil5pOU5b+D44CCIOaIkeWAkeacieaCqOeahOioguWWruips+e0sOS/oeaBr++8jOaCqOeahOS7mOasvuW3suWujOaIkOOAgiDnhKHpnIDlho3kuIvoqILllq7jgIInXG4gICAgfSxcbiAgICAnRGVsaXZlcnkgZGF0ZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0xpZWZlcnRlcm1pbicsXG4gICAgICAgICdlbi1VUyc6ICdEZWxpdmVyeSBkYXRlJyxcbiAgICAgICAgJ2VzLUVTJzogJ0ZlY2hhIGRlIGVudHJlZ2EnLFxuICAgICAgICBmcjogJ0RhdGUgZGUgbGl2cmFpc29uJyxcbiAgICAgICAgaXQ6ICdEYXRhIGRpIGNvbnNlZ25hJyxcbiAgICAgICAgamE6ICfphY3pgIHml6UnLFxuICAgICAgICAncm8tUk8nOiAnRGF0YSBsaXZyxINyaWknLFxuICAgICAgICBhcjogJ9iq2KfYsdmK2K4g2KfZhNiq2LPZhNmK2YUg2KfZiCDYp9mE2YjYtdmI2YQnLFxuICAgICAgICBjYTogJ0RhdGEgZGUgbGxpdXJhbWVudCcsXG4gICAgICAgICdjcy1DWic6ICdEYXR1bSBkb3J1xI1lbsOtJyxcbiAgICAgICAgJ2RhLURLJzogJ0xldmVyaW5nc2RhdG8nLFxuICAgICAgICBlbDogJ86XzrzOtc+Bzr/OvM63zr3Or86xIM+AzrHPgc6szrTOv8+DzrfPgicsXG4gICAgICAgICdoaS1JTic6ICfgpKHgpL/gpLLgpYDgpLXgpLDgpYAg4KSV4KWAIOCkpOCkvuCksOClgOCklicsXG4gICAgICAgICdrby1LUic6ICfrsLDshqEg64Kg7KecJyxcbiAgICAgICAgJ2xiLUxVJzogJ0xpd3dlcnVuZ3NkYXR1bScsXG4gICAgICAgICdubC1OTCc6ICdCZXpvcmdkYXR1bScsXG4gICAgICAgICdwdC1QVCc6ICdEYXRhIGRlIGVudHJlZ2EnLFxuICAgICAgICAncnUtUlUnOiAn0JTQsNGC0LAg0LTQvtGB0YLQsNCy0LrQuCcsXG4gICAgICAgICdzbC1TSSc6ICdEYXR1bSBkb3N0YXZlJyxcbiAgICAgICAgJ3N2LVNFJzogJ0xldmVyYW5zZGF0dW0nLFxuICAgICAgICB0aDogJ+C4p+C4seC4meC4l+C4teC5iOC4iOC4seC4lOC4quC5iOC4hycsXG4gICAgICAgIHVrOiAn0JTQsNGC0LAg0LTQvtGB0YLQsNCy0LrQuCcsXG4gICAgICAgICd6aC1DTic6ICfpgq7lr4Tml6XmnJ8nLFxuICAgICAgICAnemgtVFcnOiAn6YO15a+E5pel5pyfJ1xuICAgIH0sXG4gICAgJ0ZpcnN0IHJlbmV3YWwnOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcnN0ZSBWZXJsw6RuZ2VydW5nJyxcbiAgICAgICAgJ2VuLVVTJzogJ0ZpcnN0IHJlbmV3YWwnLFxuICAgICAgICAnZXMtRVMnOiAnUHJpbWVyYSByZW5vdmFjacOzbicsXG4gICAgICAgIGZyOiAnUHJlbWllciByZW5vdXZlbGxlbWVudCcsXG4gICAgICAgIGl0OiAnUHJpbW8gUmlubm92bycsXG4gICAgICAgIGphOiAn5pyA5Yid44Gu5pu05pawJyxcbiAgICAgICAgJ3JvLVJPJzogJ1ByaW1hIHJlw65ubm9pcmUnLFxuICAgICAgICBhcjogJ9in2YTYqtis2K/ZitivINin2YTYo9mI2YQnLFxuICAgICAgICBjYTogJ1ByaW1lcmEgcmVub3ZhY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdQcnZuw60gb2Jub3ZhJyxcbiAgICAgICAgJ2RhLURLJzogJ0bDuHJzdGUgZm9ybnllbHNlJyxcbiAgICAgICAgZWw6ICfOoM+Bz47PhM63IM6xzr3Osc69zq3Pic+DzrcnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KS54KSy4KS+IOCkqOCkteClgOCkqOClgOCkleCksOCkoycsXG4gICAgICAgICdrby1LUic6ICfssqsg67KI7Ke4IOqwseyLoCcsXG4gICAgICAgICdsYi1MVSc6ICfDiWlzY2h0IEVybmVpZXJ1bmcnLFxuICAgICAgICAnbmwtTkwnOiAnRWVyc3RlIHZlcmxlbmdpbmcnLFxuICAgICAgICAncHQtUFQnOiAnUHJpbWVpcmEgcmVub3Zhw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0J/QtdGA0LLQvtC1INC+0LHQvdC+0LLQu9C10L3QuNC1JyxcbiAgICAgICAgJ3NsLVNJJzogJ1BydmEgb2Jub3ZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0bDtnJzdGEgZsO2cm55ZWxzZW4nLFxuICAgICAgICB0aDogJ+C4leC5iOC4reC4reC4suC4ouC4uOC4hOC4o+C4seC5ieC4h+C5geC4o+C4gScsXG4gICAgICAgIHVrOiAn0J/QtdGA0YjQtSDQvtC90L7QstC70LXQvdC90Y8nLFxuICAgICAgICAnemgtQ04nOiAn56ys5LiA5qyh57ut6K6iJyxcbiAgICAgICAgJ3poLVRXJzogJ+esrOS4gOasoee6jOiogidcbiAgICB9LFxuICAgICdSZWN1cnJpbmcgdG90YWwnOiB7XG4gICAgICAgICdkZS1ERSc6ICdXaWVkZXJrZWhyZW5kZSBTdW1tZScsXG4gICAgICAgICdlbi1VUyc6ICdSZWN1cnJpbmcgdG90YWwnLFxuICAgICAgICAnZXMtRVMnOiAnVG90YWwgcmVjdXJyZW50ZScsXG4gICAgICAgIGZyOiAnVG90YWwgcsOpY3VycmVudCcsXG4gICAgICAgIGl0OiAnVG90YWxlIHJpY29ycmVudGUnLFxuICAgICAgICBqYTogJ+Wumuacn+WQiOioiCcsXG4gICAgICAgICdyby1STyc6ICdUb3RhbCByZWN1cmVudCcsXG4gICAgICAgIGFyOiAn2KfZhNmF2KzZhdmI2Lkg2KfZhNmF2KrZg9ix2LEnLFxuICAgICAgICBjYTogJ1RvdGFsIHJlY3VycmVudCcsXG4gICAgICAgICdjcy1DWic6ICdPcGFrdWrDrWPDrSBzZSBjZWxrZW0nLFxuICAgICAgICAnZGEtREsnOiAnVGlsYmFnZXZlbmRlbmRlIHRvdGFsJyxcbiAgICAgICAgZWw6ICfOlc+AzrHOvc6xzrvOsc68zrLOsc69z4zOvM61zr3OvyDPg8+Nzr3Ov867zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSG4KS14KSw4KWN4KSk4KWAIOCkleClgeCksicsXG4gICAgICAgICdrby1LUic6ICfrsJjrs7Ug7ZWp6rOEJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dpZGRlcmh1ZWxlbmQgVG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnVGVydWdrZXJlbmQgdG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1RvdGFsIHJlY29ycmVudGUnLFxuICAgICAgICAncnUtUlUnOiAn0J/QvtCy0YLQvtGA0Y/RjtGJ0LDRj9GB0Y8g0YHRg9C80LzQsCcsXG4gICAgICAgICdzbC1TSSc6ICdQb25hdmxqYWpvxI1lIHNlIHNrdXBhaicsXG4gICAgICAgICdzdi1TRSc6ICfDhXRlcmtvbW1hbmRlIHRvdGFsdCcsXG4gICAgICAgIHRoOiAn4Lii4Lit4LiU4Lij4Lin4Lih4LiX4Li14LmI4LmA4LiB4Li04LiU4LiL4LmJ4LizJyxcbiAgICAgICAgdWs6ICfQn9C+0LLRgtC+0YDRjtCy0LDQvdCwINGB0YPQvNCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+e7j+W4uOaAp+aAu+iuoScsXG4gICAgICAgICd6aC1UVyc6ICfntpPluLjmgKfnuL3oqIgnXG4gICAgfSxcbiAgICAnaW5pdGlhbC1zdW1tYXJ5Jzoge1xuICAgICAgICAnZGUtREUnOiAnQW5mYW5nc3N1bW1lJyxcbiAgICAgICAgJ2VuLVVTJzogJ0luaXRpYWwgdG90YWwnLFxuICAgICAgICAnZXMtRVMnOiAnVG90YWwgaW5pY2lhbCcsXG4gICAgICAgIGZyOiAnVG90YWwgaW5pdGlhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlIGluaXppYWxlJyxcbiAgICAgICAgamE6ICfliJ3mnJ/lkIjoqIgnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwgaW5pyJtpYWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5INin2YTYo9mI2YTZiicsXG4gICAgICAgIGNhOiAnVG90YWwgaW5pY2lhbCcsXG4gICAgICAgICdjcy1DWic6ICdQb8SNw6F0ZcSNbsOtIGNlbGtlbScsXG4gICAgICAgICdkYS1ESyc6ICdJbmRsZWRlbmRlIHRvdGFsJyxcbiAgICAgICAgZWw6ICfOkc+Bz4fOuc66z4wgz4PPjc69zr/Ou86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCljeCksOCkvuCksOCkguCkreCkv+CklSDgpJXgpYHgpLInLFxuICAgICAgICAna28tS1InOiAn7LSI6riwIO2VqeqzhCcsXG4gICAgICAgICdsYi1MVSc6ICdVZmFua3MgdG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnSW5pdGllZWwgdG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1RvdGFsIGluaWNpYWwnLFxuICAgICAgICAncnUtUlUnOiAn0JjRgdGF0L7QtNC90LDRjyDRgdGD0LzQvNCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1phxI1ldG5pIHNlxaF0ZXZlaycsXG4gICAgICAgICdzdi1TRSc6ICdJbml0aWFsIHN1bW1hJyxcbiAgICAgICAgdGg6ICfguKLguK3guJTguKPguKfguKHguYDguKPguLTguYjguKHguJXguYnguJknLFxuICAgICAgICB1azogJ9Cf0L7Rh9Cw0YLQutC+0LLQsCDRgdGD0LzQsCcsXG4gICAgICAgICd6aC1DTic6ICfliJ3lp4vmgLvmlbAnLFxuICAgICAgICAnemgtVFcnOiAn5Yid5aeL57i95pW4J1xuICAgIH0sXG4gICAgJ3JlY3VycmluZy1zaGlwcGluZyc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1dpZWRlcmtlaHJlbmRlciBWZXJzYW5kJyxcbiAgICAgICAgJ2VuLVVTJzogJ1JlY3VycmluZyBzaGlwcGluZycsXG4gICAgICAgICdlcy1FUyc6ICdFbnbDrW9zIHJlY3VycmVudGVzJyxcbiAgICAgICAgZnI6ICdFeHDDqWRpdGlvbiByw6ljdXJyZW50ZScsXG4gICAgICAgIGl0OiAnVG90YWxlIGluaXppYWxlJyxcbiAgICAgICAgamE6ICflrprmnJ/phY3pgIEnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwgaW5pyJtpYWwnLFxuICAgICAgICBhcjogJ9in2YTYtNit2YYg2KfZhNmF2KrZg9ix2LEnLFxuICAgICAgICBjYTogJ0VudmlhbWVudCBwZXJpw7JkaWMnLFxuICAgICAgICAnY3MtQ1onOiAnT3Bha292YW7DoSBkb3ByYXZhJyxcbiAgICAgICAgJ2RhLURLJzogJ1RpbGJhZ2V2ZW5kZW5kZSBmb3JzZW5kZWxzZScsXG4gICAgICAgIGVsOiAnzpXPgM6xzr3Osc67zrHOvM6yzrHOvc+MzrzOtc69zrcgzrHPgM6/z4PPhM6/zrvOricsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpLXgpLDgpY3gpKTgpYAg4KS24KS/4KSq4KS/4KSC4KSXJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwmOuztSDrsLDshqEnLFxuICAgICAgICAnbGItTFUnOiAnV2lkZGVyaHVlbGVuZCBWZXJzYW5kJyxcbiAgICAgICAgJ25sLU5MJzogJ1RlcnVna2VyZW5kZSB2ZXJ6ZW5kaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1JlbWVzc2EgcmVjb3JyZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQn9C10YDQuNC+0LTQuNGH0LXRgdC60LDRjyDQtNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvbmF2bGpham/EjWEgc2UgZG9zdGF2YScsXG4gICAgICAgICdzdi1TRSc6ICfDhXRlcmtvbW1hbmRlIGZyYWt0JyxcbiAgICAgICAgdGg6ICfguKrguYjguIfguKrguLTguJnguITguYnguLLguJvguKPguLDguIjguLMnLFxuICAgICAgICB1azogJ9Cf0L7QstGC0L7RgNC90LAg0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfnu4/luLjmgKfov5DovpMnLFxuICAgICAgICAnemgtVFcnOiAn57aT5bi45oCn6YGL6Ly4J1xuICAgIH0sXG4gICAgJ2luaXRpYWwtc2hpcHBpbmcnOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcnN0ZXIgVmVyc2FuZCcsXG4gICAgICAgICdlbi1VUyc6ICdJbml0aWFsIHNoaXBwaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VudsOtbyBpbmljaWFsJyxcbiAgICAgICAgZnI6ICdFeHDDqWRpdGlvbiBpbml0aWFsZScsXG4gICAgICAgIGl0OiAnU3BlZGl6aW9uZSBpbml6aWFsZScsXG4gICAgICAgIGphOiAn5Yid5pyf55m66YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0V4cGVkaWVyZSBpbmnIm2lhbMSDJyxcbiAgICAgICAgYXI6ICfYp9mE2LTYrdmGINin2YTYo9mI2YTZiicsXG4gICAgICAgIGNhOiAnRW52aWFtZW50IGluaWNpYWwnLFxuICAgICAgICAnY3MtQ1onOiAnUG/EjcOhdGXEjW7DrSBvZGVzbMOhbsOtJyxcbiAgICAgICAgJ2RhLURLJzogJ0bDuHJzdGUgZm9yc2VuZGVsc2UnLFxuICAgICAgICBlbDogJ86Rz4HPh865zrrOriDOsc+Azr/Pg8+Ezr/Ou86uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCljeCksOCkvuCksOCkguCkreCkv+CklSDgpLbgpL/gpKrgpL/gpILgpJcnLFxuICAgICAgICAna28tS1InOiAn7LSI6riwIOuwsOyGoScsXG4gICAgICAgICdsYi1MVSc6ICdVZmFua3MgVmVyc2FuZCcsXG4gICAgICAgICdubC1OTCc6ICdFZXJzdGUgdmVyemVuZGluZycsXG4gICAgICAgICdwdC1QVCc6ICdFbnZpbyBpbmljaWFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LXRgNCy0L7QvdCw0YfQsNC70YzQvdCw0Y8g0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICdzbC1TSSc6ICdaYcSNZXRuYSBkb3N0YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0bDtnJzdGEgZnJha3RlbicsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LiI4Lix4LiU4Liq4LmI4LiH4Liq4Li04LiZ4LiE4LmJ4Liy4LmA4Lia4Li34LmJ4Lit4LiH4LiV4LmJ4LiZJyxcbiAgICAgICAgdWs6ICfQn9C+0YfQsNGC0LrQvtCy0LAg0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfliJ3lp4vov5DovpMnLFxuICAgICAgICAnemgtVFcnOiAn5Yid5aeL6YGL6Ly4J1xuICAgIH0sXG4gICAgJ0NyZWF0ZSBhIG5ldyBwYXNzd29yZCwgb3IgdXNlIGFuIGV4aXN0aW5nIG9uZSBpZiB5b3UgYWxyZWFkeSBoYXZlIGFuIGFjY291bnQgZm9yJzoge1xuICAgICAgICAnZGUtREUnOiAnRXJzdGVsbGVuIFNpZSBlaW4gbmV1ZXMgUGFzc3dvcnQgb2RlciB2ZXJ3ZW5kZW4gU2llIGVpbiBiZXN0ZWhlbmRlcywgd2VubiBTaWUgYmVyZWl0cyBlaW4gS29udG8gZsO8ciAuIGhhYmVuJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NyZWF0ZSBhIG5ldyBwYXNzd29yZCwgb3IgdXNlIGFuIGV4aXN0aW5nIG9uZSBpZiB5b3UgYWxyZWFkeSBoYXZlIGFuIGFjY291bnQgZm9yJyxcbiAgICAgICAgJ2VzLUVTJzogJ0NyZWUgdW5hIG51ZXZhIGNvbnRyYXNlw7FhIG8gdXNlIHVuYSBleGlzdGVudGUgc2kgeWEgdGllbmUgdW5hIGN1ZW50YS4gdGVuZXInLFxuICAgICAgICBmcjogJ0Nyw6lleiB1biBub3V2ZWF1IG1vdCBkZSBwYXNzZSBvdSB1dGlsaXNlei1lbiB1biBleGlzdGFudCBzaSB2b3VzIGF2ZXogZMOpasOgIHVuIGNvbXB0ZSBwb3VyJyxcbiAgICAgICAgaXQ6ICdDcmVhIHVuYSBudW92YSBwYXNzd29yZCBvIHVzYW5lIHVuYSBlc2lzdGVudGUgc2UgaGFpIGdpw6AgdW4gYWNjb3VudCBwZXInLFxuICAgICAgICBqYTogJ+aWsOOBl+OBhOODkeOCueODr+ODvOODieOCkuS9nOaIkOOBmeOCi+OBi+OAgeOBmeOBp+OBq+OCouOCq+OCpuODs+ODiOOCkuOBiuaMgeOBoeOBruWgtOWQiOOBr+aXouWtmOOBruODkeOCueODr+ODvOODieOCkuS9v+eUqOOBl+OBpuOBj+OBoOOBleOBhCcsXG4gICAgICAgICdyby1STyc6ICdDcmVhyJtpIG8gcGFyb2zEgyBub3XEgyBzYXUgdXRpbGl6YcibaSB1bmEgZXhpc3RlbnTEgyBkYWPEgyBhdmXIm2kgZGVqYSB1biBjb250IHBlbnRydScsXG4gICAgICAgIGFyOiAn2KPZhti02KYg2YPZhNmF2Kkg2YXYsdmI2LEg2KzYr9mK2K/YqSDYjCDYo9mIINin2LPYqtiu2K/ZhSDZg9mE2YXYqSDZhdix2YjYsSDZhdmI2KzZiNiv2Kkg2KXYsNinINmD2KfZhiDZhNiv2YrZgyDYqNin2YTZgdi52YQg2K3Ys9in2Kgg2YTZgCcsXG4gICAgICAgIGNhOiAnQ3JlZXUgdW5hIGNvbnRyYXNlbnlhIG5vdmEgbyB1dGlsaXR6ZXUtbmUgdW5hIHNpIGphIHRlbml1IHVuIGNvbXB0ZScsXG4gICAgICAgICdjcy1DWic6ICdWeXR2b8WZdGUgbm92w6kgaGVzbG8gbmVibyBwb3XFvmlqdGUgc3TDoXZhasOtY8OtLCBwb2t1ZCBqacW+IG3DoXRlIMO6xI1ldCcsXG4gICAgICAgICdkYS1ESyc6ICdPcHJldCBlbiBueSBhZGdhbmdza29kZSwgZWxsZXIgYnJ1ZyBlbiBla3Npc3RlcmVuZGUsIGh2aXMgZHUgYWxsZXJlZGUgaGFyIGVuIGtvbnRvIHRpbCcsXG4gICAgICAgIGVsOiAnzpTOt868zrnOv8+Fz4HOs86uz4PPhM61IM6tzr3Osc69IM69zq3OvyDOus+JzrTOuc66z4wgz4DPgc+Mz4POss6xz4POt8+CIM6uIM+Hz4HOt8+DzrnOvM6/z4DOv865zq7Pg8+EzrUgzq3Ovc6xzr0gz4XPgM6sz4HPh86/zr3PhM6xLCDOtc6szr0gzq3Ph861z4TOtSDOrs60zrcgzrvOv86zzrHPgc65zrHPg868z4wnLFxuICAgICAgICAnaGktSU4nOiAn4KSP4KSVIOCkqOCkr+CkviDgpKrgpL7gpLjgpLXgpLDgpY3gpKEg4KSs4KSo4KS+4KSP4KSCLCDgpK/gpL4g4KSV4KS/4KS44KWAIOCkruCljOCknOClguCkpuCkviDgpKrgpL7gpLjgpLXgpLDgpY3gpKEg4KSV4KS+IOCkieCkquCkr+Cli+CklyDgpJXgpLDgpYfgpIIg4KSv4KSm4KS/IOCkhuCkquCkleClhyDgpKrgpL7gpLgg4KSq4KS54KSy4KWHIOCkuOClhyDgpLngpYAg4KSP4KSVIOCkluCkvuCkpOCkviDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7IOIIOu5hOuwgOuyiO2YuOulvCDsg53shLHtlZjqsbDrgpgg7J2066+4IOqzhOygleydtCDsnojripQg6rK97JqwIOq4sOyhtCDruYTrsIDrsojtmLjrpbwg7IKs7Jqp7ZWY7Iut7Iuc7JikLicsXG4gICAgICAgICdsYi1MVSc6ICdFcnN0ZWxsdCBlbiBuZWl0IFBhc3N3dWVydCwgb2RlciBiZW5vdHp0IGVuIGV4aXN0ZW50IFBhc3N3dWVydCB3YW5uIERpciBzY2hvbm4gZSBLb250IGh1dHQnLFxuICAgICAgICAnbmwtTkwnOiAnTWFhayBlZW4gbmlldXcgd2FjaHR3b29yZCBhYW4sIG9mIGdlYnJ1aWsgZWVuIGJlc3RhYW5kIHdhY2h0d29vcmQgYWxzIGplIGFsIGVlbiBhY2NvdW50IGhlYnQgdm9vcicsXG4gICAgICAgICdwdC1QVCc6ICdDcmllIHVtYSBub3ZhIHNlbmhhIG91IHVzZSB1bWEgZXhpc3RlbnRlIHNlIHZvY8OqIGrDoSB0aXZlciB1bWEgY29udGEgcGFyYScsXG4gICAgICAgICdydS1SVSc6ICfQodC+0LfQtNCw0LnRgtC1INC90L7QstGL0Lkg0L/QsNGA0L7Qu9GMINC40LvQuCDQuNGB0L/QvtC70YzQt9GD0LnRgtC1INGB0YPRidC10YHRgtCy0YPRjtGJ0LjQuSwg0LXRgdC70Lgg0YMg0LLQsNGBINGD0LbQtSDQtdGB0YLRjCDRg9GH0LXRgtC90LDRjyDQt9Cw0L/QuNGB0Ywg0LTQu9GPJyxcbiAgICAgICAgJ3NsLVNJJzogJ1VzdHZhcml0ZSBub3ZvIGdlc2xvIGFsaSB1cG9yYWJpdGUgb2JzdG9qZcSNZSwgxI1lIMW+ZSBpbWF0ZSByYcSNdW4nLFxuICAgICAgICAnc3YtU0UnOiAnU2thcGEgZXR0IG55dHQgbMO2c2Vub3JkLCBlbGxlciBhbnbDpG5kIGV0dCBiZWZpbnRsaWd0IG9tIGR1IHJlZGFuIGhhciBldHQga29udG8gZsO2cicsXG4gICAgICAgIHRoOiAn4Liq4Lij4LmJ4Liy4LiH4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4LmD4Lir4Lih4LmI4Lir4Lij4Li34Lit4LmD4LiK4LmJ4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4LiX4Li14LmI4Lih4Li14Lit4Lii4Li54LmI4LiW4LmJ4Liy4LiE4Li44LiT4Lih4Li14Lia4Lix4LiN4LiK4Li14Liq4Liz4Lir4Lij4Lix4LiaJyxcbiAgICAgICAgdWs6ICfQodGC0LLQvtGA0ZbRgtGMINC90L7QstC40Lkg0L/QsNGA0L7Qu9GMINCw0LHQviDQstC40LrQvtGA0LjRgdGC0L7QstGD0LnRgtC1INGW0YHQvdGD0Y7Rh9C40LksINGP0LrRidC+INGDINCy0LDRgSDQstC20LUg0ZQg0L7QsdC70ZbQutC+0LLQuNC5INC30LDQv9C40YEnLFxuICAgICAgICAnemgtQ04nOiAn5Yib5bu65LiA5Liq5paw5a+G56CB77yM5aaC5p6c5oKo5bey57uP5pyJ5LiA5Liq5biQ5oi377yM5YiZ5L2/55So546w5pyJ55qE5a+G56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+WJteW7uuS4gOWAi+aWsOWvhueivO+8jOWmguaenOaCqOW3sue2k+acieS4gOWAi+W4s+aItu+8jOWJh+S9v+eUqOePvuacieeahOWvhueivCdcbiAgICB9LFxuICAgICdQYXNzd29yZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Bhc3N3b3J0JyxcbiAgICAgICAgJ2VuLVVTJzogJ1Bhc3N3b3JkJyxcbiAgICAgICAgJ2VzLUVTJzogJ0NsYXZlJyxcbiAgICAgICAgZnI6ICdNb3QgZGUgcGFzc2UnLFxuICAgICAgICBpdDogJ1Bhcm9sYSBkXFwnb3JkaW5lJyxcbiAgICAgICAgamE6ICfjg5Hjgrnjg6/jg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnUGFyb2xhJyxcbiAgICAgICAgYXI6ICfZg9mE2YXZhyDYp9mE2LPYsScsXG4gICAgICAgIGNhOiAnQ29udHJhc2VueWEnLFxuICAgICAgICAnY3MtQ1onOiAnSGVzbG8nLFxuICAgICAgICAnZGEtREsnOiAnQWRnYW5nc2tvZGUnLFxuICAgICAgICBlbDogJ86az4nOtM65zrrPjM+CIM+Az4HPjM+DzrLOsc+DzrfPgicsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpL7gpLjgpLXgpLDgpY3gpKEnLFxuICAgICAgICAna28tS1InOiAn67mE67CA67KI7Zi4JyxcbiAgICAgICAgJ2xiLUxVJzogJ1Bhc3N3dWVydCcsXG4gICAgICAgICdubC1OTCc6ICdXYWNodHdvb3JkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbmhhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LDRgNC+0LvRjCcsXG4gICAgICAgICdzbC1TSSc6ICdHZXNsbycsXG4gICAgICAgICdzdi1TRSc6ICdMw7ZzZW5vcmQnLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC4nOC5iOC4suC4mScsXG4gICAgICAgIHVrOiAn0J/QsNGA0L7Qu9GMJyxcbiAgICAgICAgJ3poLUNOJzogJ+WvhueggScsXG4gICAgICAgICd6aC1UVyc6ICflr4bnorwnXG4gICAgfSxcbiAgICAnVGhlIHBhc3N3b3JkIGVudGVyZWQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZy4nOiB7XG4gICAgICAgICdkZS1ERSc6ICdEYXMgZWluZ2VnZWJlbmUgUGFzc3dvcnQgbXVzcyBtaW5kZXN0ZW5zIDggWmVpY2hlbiBsYW5nIHNlaW4uJyxcbiAgICAgICAgJ2VuLVVTJzogJ1RoZSBwYXNzd29yZCBlbnRlcmVkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcuJyxcbiAgICAgICAgJ2VzLUVTJzogJ0xhIGNvbnRyYXNlw7FhIGluZ3Jlc2FkYSBkZWJlIHRlbmVyIGFsIG1lbm9zIDggY2FyYWN0ZXJlcy4nLFxuICAgICAgICBmcjogJ0xlIG1vdCBkZSBwYXNzZSBzYWlzaSBkb2l0IGNvbXBvcnRlciBhdSBtb2lucyA4IGNhcmFjdMOocmVzLicsXG4gICAgICAgIGl0OiAnTGEgcGFzc3dvcmQgaW5zZXJpdGEgZGV2ZSBlc3NlcmUgbHVuZ2EgYWxtZW5vIDggY2FyYXR0ZXJpLicsXG4gICAgICAgIGphOiAn5YWl5Yqb44GZ44KL44OR44K544Ov44O844OJ44GvOOaWh+Wtl+S7peS4iuOBp+OBguOCi+W/heimgeOBjOOBguOCiuOBvuOBmeOAgicsXG4gICAgICAgICdyby1STyc6ICdQYXJvbGEgaW50cm9kdXPEgyB0cmVidWllIHPEgyBhaWLEgyBjZWwgcHXIm2luIDggY2FyYWN0ZXJlLicsXG4gICAgICAgIGFyOiAn2YrYrNioINij2YYg2KrYqtmD2YjZhiDZg9mE2YXYqSDYp9mE2YXYsdmI2LEg2KfZhNmF2K/YrtmE2Kkg2YXZhiA4INij2K3YsdmBINi52YTZiSDYp9mE2KPZgtmELicsXG4gICAgICAgIGNhOiAnTGEgY29udHJhc2VueWEgaW50cm9kdcOvZGEgaGEgZGUgdGVuaXIgY29tIGEgbcOtbmltIDggY2Fyw6BjdGVycy4nLFxuICAgICAgICAnY3MtQ1onOiAnWmFkYW7DqSBoZXNsbyBtdXPDrSBtw610IGFsZXNwb8WIIDggem5ha8WvLicsXG4gICAgICAgICdkYS1ESyc6ICdEZW4gaW5kdGFzdGVkZSBhZGdhbmdza29kZSBza2FsIHbDpnJlIG1pbmRzdCA4IHRlZ24gbGFuZy4nLFxuICAgICAgICBlbDogJ86fIM66z4nOtM65zrrPjM+CIM+Az4HPjM+DzrLOsc+DzrfPgiDPgM6/z4Ugzq3Ph861zrkgzrXOuc+DzrHPh864zrXOryDPgM+Bzq3PgM61zrkgzr3OsSDOrc+HzrXOuSDPhM6/z4XOu86sz4fOuc+Dz4TOv869IDggz4fOsc+BzrHOus+Ezq7Pgc61z4IuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkpuCksOCljeCknCDgpJXgpL/gpK/gpL4g4KSX4KSv4KS+IOCkquCkvuCkuOCkteCksOCljeCkoSDgpJXgpK4g4KS44KWHIOCkleCkriA4IOCkteCksOCljeCkoyDgpLLgpILgpKzgpL4g4KS54KWL4KSo4KS+IOCkmuCkvuCkueCkv+Ckj+ClpCcsXG4gICAgICAgICdrby1LUic6ICfsnoXroKXtlZwg67mE67CA67KI7Zi464qUIDjsnpAg7J207IOB7J207Ja07JW8IO2VqeuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRFxcJ1Bhc3N3dWVydCBkYXQgYWdpbm4gYXNzIG11c3Mgb3AgZFxcJ21hbm5zdCA4IFplZWNoZSBsYWFuZyBzaW5uLicsXG4gICAgICAgICdubC1OTCc6ICdIZXQgaW5nZXZvZXJkZSB3YWNodHdvb3JkIG1vZXQgbWluaW1hYWwgOCB0ZWtlbnMgbGFuZyB6aWpuLicsXG4gICAgICAgICdwdC1QVCc6ICdBIHNlbmhhIGluc2VyaWRhIGRldmUgdGVyIHBlbG8gbWVub3MgOCBjYXJhY3RlcmVzLicsXG4gICAgICAgICdydS1SVSc6ICfQktCy0LXQtNC10L3QvdGL0Lkg0L/QsNGA0L7Qu9GMINC00L7Qu9C20LXQvSDRgdC+0YHRgtC+0Y/RgtGMINC90LUg0LzQtdC90LXQtSDRh9C10Lwg0LjQtyA4INGB0LjQvNCy0L7Qu9C+0LIuJyxcbiAgICAgICAgJ3NsLVNJJzogJ1ZuZXNlbm8gZ2VzbG8gbW9yYSBiaXRpIGRvbGdvIG5ham1hbmogOCB6bmFrb3YuJyxcbiAgICAgICAgJ3N2LVNFJzogJ0zDtnNlbm9yZGV0IG3DpXN0ZSB2YXJhIG1pbnN0IDggdGVja2VuIGzDpW5ndC4nLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC4nOC5iOC4suC4meC4l+C4teC5iOC4m+C5ieC4reC4meC4leC5ieC4reC4h+C4oeC4teC4hOC4p+C4suC4oeC4ouC4suC4p+C4reC4ouC5iOC4suC4h+C4meC5ieC4reC4oiA4IOC4leC4seC4p+C4reC4seC4geC4qeC4oycsXG4gICAgICAgIHVrOiAn0JLQstC10LTQtdC90LjQuSDQv9Cw0YDQvtC70Ywg0L/QvtCy0LjQvdC10L0g0LzRltGB0YLQuNGC0Lgg0L3QtSDQvNC10L3RiNC1IDgg0YHQuNC80LLQvtC70ZbQsi4nLFxuICAgICAgICAnemgtQ04nOiAn6L6T5YWl55qE5a+G56CB6ZW/5bqm5b+F6aG76Iez5bCR5Li6IDgg5Liq5a2X56ym44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+i8uOWFpeeahOWvhueivOmVt+W6puW/hemgiOiHs+WwkeeCuiA4IOWAi+Wtl+espuOAgidcbiAgICB9LFxuICAgIHVua25vd246IHtcbiAgICAgICAgJ2RlLURFJzogJ1VuYmVrYW5udCcsXG4gICAgICAgICdlbi1VUyc6ICdVbmtub3duJyxcbiAgICAgICAgJ2VzLUVTJzogJ0Rlc2Nvbm9jaWRvJyxcbiAgICAgICAgZnI6ICdJbmNvbm51JyxcbiAgICAgICAgaXQ6ICdTY29ub3NjaXV0bycsXG4gICAgICAgIGphOiAn5LiN5piOJyxcbiAgICAgICAgJ3JvLVJPJzogJ05lY3Vub3NjdXQnLFxuICAgICAgICBhcjogJ9mF2KzZh9mI2YQnLFxuICAgICAgICBjYTogJ0Rlc2NvbmVndXQnLFxuICAgICAgICAnY3MtQ1onOiAnTmV6bsOhbcO9JyxcbiAgICAgICAgJ2RhLURLJzogJ1VrZW5kdCcsXG4gICAgICAgIGVsOiAnzpHOs869z4nPg8+Ezr/PgicsXG4gICAgICAgICdoaS1JTic6ICfgpIXgpKjgpJzgpL7gpKgnLFxuICAgICAgICAna28tS1InOiAn7JWM66Ck7KeA7KeAIOyViuydgCcsXG4gICAgICAgICdsYi1MVSc6ICdPbmJla2FubnQnLFxuICAgICAgICAnbmwtTkwnOiAnT25iZWtlbmQnLFxuICAgICAgICAncHQtUFQnOiAnRGVzY29uaGVjaWRhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0LknLFxuICAgICAgICAnc2wtU0knOiAnTmV6bmFubycsXG4gICAgICAgICdzdi1TRSc6ICdPa8OkbmQnLFxuICAgICAgICB0aDogJ+C5hOC4oeC5iOC4o+C4ueC5ieC4iOC4seC4gScsXG4gICAgICAgIHVrOiAn0J3QtdCy0ZbQtNC+0LzQuNC5JyxcbiAgICAgICAgJ3poLUNOJzogJ+acquefpScsXG4gICAgICAgICd6aC1UVyc6ICfmnKrnn6UnXG4gICAgfSxcbiAgICAnVGVzdCBtb2RlOiBjdXN0b21lcnMgY2Fubm90IHNlZSBQZWFjaFBheSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Rlc3Rtb2R1czogS3VuZGVuIGvDtm5uZW4gUGVhY2hQYXkgbmljaHQgc2VoZW4nLFxuICAgICAgICAnZW4tVVMnOiAnVGVzdCBtb2RlOiBjdXN0b21lcnMgY2Fubm90IHNlZSBQZWFjaFBheScsXG4gICAgICAgICdlcy1FUyc6ICdNb2RvIGRlIHBydWViYTogbG9zIGNsaWVudGVzIG5vIHB1ZWRlbiB2ZXIgUGVhY2hQYXknLFxuICAgICAgICBmcjogJ01vZGUgdGVzdCA6IGxlcyBjbGllbnRzIG5lIHBldXZlbnQgcGFzIHZvaXIgUGVhY2hQYXknLFxuICAgICAgICBpdDogJ01vZGFsaXTDoCB0ZXN0OiBpIGNsaWVudGkgbm9uIHBvc3Nvbm8gdmVkZXJlIFBlYWNoUGF5JyxcbiAgICAgICAgamE6ICfjg4bjgrnjg4jjg6Ljg7zjg4nvvJrpoaflrqLjga9QZWFjaFBheeOCkuimi+OCi+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCkycsXG4gICAgICAgICdyby1STyc6ICdNb2QgZGUgdGVzdGFyZTogY2xpZW7Im2lpIG51IHBvdCB2ZWRlYSBQZWFjaFBheScsXG4gICAgICAgIGFyOiAn2YjYtti5INin2YTYp9iu2KrYqNin2LE6INmE2Kcg2YrZhdmD2YYg2YTZhNi52YXZhNin2KEg2LHYpNmK2KkgUGVhY2hQYXknLFxuICAgICAgICBjYTogJ01vZGUgZGUgcHJvdmE6IGVscyBjbGllbnRzIG5vIHBvZGVuIHZldXJlIFBlYWNoUGF5JyxcbiAgICAgICAgJ2NzLUNaJzogJ1Rlc3RvdmFjw60gcmXFvmltOiB6w6FrYXpuw61jaSBuZXZpZMOtIFBlYWNoUGF5JyxcbiAgICAgICAgJ2RhLURLJzogJ1Rlc3R0aWxzdGFuZDoga3VuZGVyIGthbiBpa2tlIHNlIFBlYWNoUGF5JyxcbiAgICAgICAgZWw6ICfOm861zrnPhM6/z4XPgc6zzq/OsSDOtM6/zrrOuc68zq7Pgjogzr/OuSDPgM61zrvOrM+EzrXPgiDOtM61zr0gzrzPgM6/z4HOv8+Nzr0gzr3OsSDOtM6/z4XOvSDPhM6/IFBlYWNoUGF5JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCksOClgOCkleCljeCkt+CkoyDgpK7gpYvgpKE6IOCkl+CljeCksOCkvuCkueCklSDgpKrgpYDgpJrgpKrgpYcg4KSo4KS54KWA4KSCIOCkpuClh+CkliDgpLjgpJXgpKTgpYcg4KS54KWI4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+2FjOyKpO2KuCDrqqjrk5w6IOqzoOqwneydtCBQZWFjaFBheeulvCDrs7wg7IiYIOyXhuyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnVGVzdG1vZHVzOiBDbGllbnRlbiBrw6tubmVuIFBlYWNoUGF5IG5ldCBnZXNpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnVGVzdG1vZHVzOiBrbGFudGVuIGt1bm5lbiBQZWFjaFBheSBuaWV0IHppZW4nLFxuICAgICAgICAncHQtUFQnOiAnTW9kbyBkZSB0ZXN0ZTogb3MgY2xpZW50ZXMgbsOjbyBwb2RlbSB2ZXIgbyBQZWFjaFBheScsXG4gICAgICAgICdydS1SVSc6ICfQotC10YHRgtC+0LLRi9C5INGA0LXQttC40Lw6INC60LvQuNC10L3RgtGLINC90LUg0LLQuNC00Y/RgiBQZWFjaFBheScsXG4gICAgICAgICdzbC1TSSc6ICdUZXN0bmkgbmHEjWluOiBzdHJhbmtlIG5lIHZpZGlqbyBQZWFjaFBheScsXG4gICAgICAgICdzdi1TRSc6ICdUZXN0bMOkZ2U6IGt1bmRlciBrYW4gaW50ZSBzZSBQZWFjaFBheScsXG4gICAgICAgIHRoOiAn4LmC4Lir4Lih4LiU4LiX4LiU4Liq4Lit4LiaOiDguKXguLnguIHguITguYnguLLguYTguKHguYjguKrguLLguKHguLLguKPguJbguYDguKvguYfguJkgUGVhY2hQYXknLFxuICAgICAgICB1azogJ9Ci0LXRgdGC0L7QstC40Lkg0YDQtdC20LjQvDog0LrQu9GW0ZTQvdGC0Lgg0L3QtSDQvNC+0LbRg9GC0Ywg0LHQsNGH0LjRgtC4IFBlYWNoUGF5JyxcbiAgICAgICAgJ3poLUNOJzogJ+a1i+ivleaooeW8j++8muWuouaIt+eci+S4jeWIsFBlYWNoUGF5JyxcbiAgICAgICAgJ3poLVRXJzogJ+a4rOippuaooeW8j++8muWuouaItueci+S4jeWIsFBlYWNoUGF5J1xuICAgIH0sXG4gICAgJ0kgdmVyaWZ5IHRoYXQgdGhlIGNvdW50cnkgSSBoYXZlIGVudGVyZWQgaXMgdGhlIG9uZSBJIHJlc2lkZSBpbic6IHtcbiAgICAgICAgJ2RlLURFJzogJ0ljaCBiZXN0w6R0aWdlLCBkYXNzIGRhcyBMYW5kLCBpbiBkZW0gaWNoIGVpbmdlcmVpc3QgYmluLCBkYXMgTGFuZCBpc3QsIGluIGRlbSBpY2ggd29obmUnLFxuICAgICAgICAnZW4tVVMnOiAnSSB2ZXJpZnkgdGhhdCB0aGUgY291bnRyeSBJIGhhdmUgZW50ZXJlZCBpcyB0aGUgb25lIEkgcmVzaWRlIGluJyxcbiAgICAgICAgJ2VzLUVTJzogJ1ZlcmlmaWNvIHF1ZSBlbCBwYcOtcyBhbCBxdWUgaGUgZW50cmFkbyBlcyBlbiBlbCBxdWUgcmVzaWRvJyxcbiAgICAgICAgZnI6ICdKZSB2w6lyaWZpZSBxdWUgbGUgcGF5cyBkYW5zIGxlcXVlbCBqZSBzdWlzIGVudHLDqSBlc3QgY2VsdWkgZGFucyBsZXF1ZWwgamUgcsOpc2lkZScsXG4gICAgICAgIGl0OiAnVmVyaWZpY28gY2hlIGlsIHBhZXNlIGluIGN1aSBzb25vIGVudHJhdG8gc2lhIHF1ZWxsbyBpbiBjdWkgcmlzaWVkbycsXG4gICAgICAgIGphOiAn5YWl5Yqb44GX44Gf5Zu944GM5bGF5L2P5Zu944Gn44GC44KL44GT44Go44KS56K66KqN44GX44G+44GZJyxcbiAgICAgICAgJ3JvLVJPJzogJ1ZlcmlmaWMgY8SDIMibYXJhIMOubiBjYXJlIGFtIGludHJhdCBlc3RlIGNlYSDDrm4gY2FyZSBsb2N1aWVzYycsXG4gICAgICAgIGFyOiAn2KPYqtit2YLZgiDZhdmGINij2YYg2KfZhNio2YTYryDYp9mE2LDZiiDYo9iv2K7ZhNiq2Ycg2YfZiCDYp9mE2KjZhNivINin2YTYsNmKINij2YLZitmFINmB2YrZhycsXG4gICAgICAgIGNhOiAnVmVyaWZpY28gcXVlIGVsIHBhw61zIG9uIGhlIGVudHJhdCDDqXMgZWwgb24gdmlzYycsXG4gICAgICAgICdjcy1DWic6ICdPdsSbxZl1amksIMW+ZSB6ZW3EmywgZG8ga3RlcsOpIGpzZW0gemFkYWwsIGplIHplbcOtLCB2ZSBrdGVyw6kgYnlkbMOtbScsXG4gICAgICAgICdkYS1ESyc6ICdKZWcgYmVrcsOmZnRlciwgYXQgZGV0IGxhbmQsIGplZyBoYXIgaW5kdGFzdGV0LCBlciBkZXQsIGplZyBib3IgaScsXG4gICAgICAgIGVsOiAnzpXPgM6xzrvOt864zrXPjc+JIM+Mz4TOuSDOtyDPh8+Oz4HOsSDPg8+EzrfOvSDOv8+Azr/Or86xIM6tz4fPiSDOtc65z4POrc67zrjOtc65IM61zq/Ovc6xzrkgzrHPhc+Ezq4gz4PPhM63zr0gzr/PgM6/zq/OsSDOtM65zrHOvM6tzr3PiScsXG4gICAgICAgICdoaS1JTic6ICfgpK7gpYjgpIIg4KS44KSk4KWN4KSv4KS+4KSq4KS/4KSkIOCkleCksOCkpOCkvi/gpJXgpLDgpKTgpYAg4KS54KWC4KSCIOCkleCkvyDgpJzgpL/gpLgg4KSm4KWH4KS2IOCkruClh+CkgiDgpK7gpYjgpILgpKjgpYcg4KSq4KWN4KSw4KS14KWH4KS2IOCkleCkv+Ckr+CkviDgpLngpYgg4KS14KS5IOCkteCkueClgCDgpKbgpYfgpLYg4KS54KWIIOCknOCkv+CkuOCkruClh+CkgiDgpK7gpYjgpIIg4KSw4KS54KSk4KS+IOCkueClguCkgicsXG4gICAgICAgICdrby1LUic6ICfrgrTqsIAg7J6F66Cl7ZWcIOq1reqwgOqwgCDrgrTqsIAg6rGw7KO87ZWY64qUIOq1reqwgOyduOyngCDtmZXsnbjtlanri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VjaCB2ZXJpZml6w6lpZXJlbiBkYXR0IGRcXCdMYW5kIHdvdSBlY2ggYWdpbm4gaHVubiBhc3MgZGVlbiBhbiBkZWVtIGVjaCB3dW5uZW4nLFxuICAgICAgICAnbmwtTkwnOiAnSWsgdmVyaWZpZWVyIGRhdCBoZXQgbGFuZCBkYXQgaWsgaGViIGluZ2V2b2VyZCBoZXQgbGFuZCBpcyB3YWFyaW4gaWsgd29vbicsXG4gICAgICAgICdwdC1QVCc6ICdFdSB2ZXJpZmljbyBzZSBvIHBhw61zIHF1ZSBldSBpbnNlcmkgw6kgYXF1ZWxlIGVtIHF1ZSByZXNpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0K8g0L/QvtC00YLQstC10YDQttC00LDRjiwg0YfRgtC+INGB0YLRgNCw0L3QsCwg0LIg0LrQvtGC0L7RgNGD0Y4g0Y8g0LLRitC10YXQsNC7LCDRj9Cy0LvRj9C10YLRgdGPINGC0L7QuSwg0LIg0LrQvtGC0L7RgNC+0Lkg0Y8g0L/RgNC+0LbQuNCy0LDRjicsXG4gICAgICAgICdzaS1TSSc6ICdQb3RyanVqZW0sIGRhIGplIGRyxb5hdmEsIHYga2F0ZXJvIHNlbSB2c3RvcGlsLCB0aXN0YSwgdiBrYXRlcmkgcHJlYml2YW0nLFxuICAgICAgICAnc2ktU0UnOiAnSmFnIHZlcmlmaWVyYXIgYXR0IGRldCBsYW5kIGphZyBoYXIgYW5nZXR0IMOkciBkZXQgamFnIGJvciBpJyxcbiAgICAgICAgdGg6ICfguInguLHguJnguKLguLfguJnguKLguLHguJnguKfguYjguLLguJvguKPguLDguYDguJfguKjguJfguLXguYjguInguLHguJnguYDguILguYnguLLguKHguLLguYDguJvguYfguJnguJvguKPguLDguYDguJfguKjguJfguLXguYjguInguLHguJnguK3guLLguKjguLHguKLguK3guKLguLnguYgnLFxuICAgICAgICB1azogJ9CvINC/0ZbQtNGC0LLQtdGA0LTQttGD0Y4sINGJ0L4g0LrRgNCw0ZfQvdCwLCDQsiDRj9C60YMg0Y8g0LLQstGW0LnRiNC+0LIsINGUINGC0ZbRlNGOLCDQsiDRj9C60ZbQuSDRjyDQv9GA0L7QttC40LLQsNGOJyxcbiAgICAgICAgJ3poLUNOJzogJ+aIkeehruiupOaIkei/m+WFpeeahOWbveWutuaYr+aIkeWxheS9j+eahOWbveWuticsXG4gICAgICAgICd6aC1UVyc6ICfmiJHnorroqo3miJHpgLLlhaXnmoTlnIvlrrbmmK/miJHlsYXkvY/nmoTlnIvlrrYnXG4gICAgfVxufTtcbmNvbnN0IEZlYXR1cmUgPSB7XG4gICAgZW5hYmxlZDogKGZsYWcpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFtmbGFnXT8uZW5hYmxlZCA/PyBmYWxzZVxuICAgICxcbiAgICB2ZXJzaW9uOiAoZmxhZyk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLmZlYXR1cmVTdXBwb3J0W2ZsYWddPy52ZXJzaW9uID8/IDBcbiAgICAsXG4gICAgbWV0YURhdGE6IChmbGFnLCBrZXkpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFtmbGFnXT8ubWV0YV9kYXRhPy5ba2V5XSA/PyBudWxsXG59O1xudmFyIEZlYXR1cmVGbGFnO1xuKGZ1bmN0aW9uKEZlYXR1cmVGbGFnMSkge1xuICAgIEZlYXR1cmVGbGFnMVtcIkNBUlRfQ0FMQ1VMQVRJT05cIl0gPSAnY2FydF9jYWxjdWxhdGlvbic7XG4gICAgRmVhdHVyZUZsYWcxW1wiQ09VUE9OX0lOUFVUXCJdID0gJ2NvdXBvbl9pbnB1dCc7XG4gICAgRmVhdHVyZUZsYWcxW1wiR0lGVENBUkRfSU5QVVRcIl0gPSAnZ2lmdGNhcmRfaW5wdXQnO1xuICAgIEZlYXR1cmVGbGFnMVtcIk9SREVSX05PVEVTXCJdID0gJ29yZGVyX25vdGVzX2lucHV0JztcbiAgICBGZWF0dXJlRmxhZzFbXCJBRERJVElPTkFMX0ZJRUxEU1wiXSA9ICdhZGRpdGlvbmFsX2ZpZWxkcyc7XG4gICAgRmVhdHVyZUZsYWcxW1wiU1RSSVBFXCJdID0gJ3N0cmlwZV9wYXltZW50X21ldGhvZCc7XG4gICAgRmVhdHVyZUZsYWcxW1wiU1RSSVBFX1BBWU1FTlRfUkVRVUVTVFwiXSA9ICdzdHJpcGVfcGF5bWVudF9yZXF1ZXN0JztcbiAgICBGZWF0dXJlRmxhZzFbXCJRVUFOVElUWV9DSEFOR0VSXCJdID0gJ3F1YW50aXR5X2NoYW5nZXInO1xuICAgIEZlYXR1cmVGbGFnMVtcIkNVUlJFTkNZX1NXSVRDSEVSX0lOUFVUXCJdID0gJ2N1cnJlbmN5X3N3aXRjaGVyX2lucHV0Jztcbn0pKEZlYXR1cmVGbGFnIHx8IChGZWF0dXJlRmxhZyA9IHt9KSk7XG5jb25zdCB1cGRhdGVDdXN0b21lclN0cmlwZUlkID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSX1NUUklQRV9JRCk7XG5jb25zdCB1cGRhdGVDdXN0b21lciA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUik7XG5jb25zdCB1cGRhdGVDdXN0b21lclNoaXBwaW5nU2hvcnRBZGRyZXNzID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSX1NISVBQSU5HKTtcbmNvbnN0IHVwZGF0ZVByZWZlcnJlZFBheW1lbnRNZXRob2QgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfUEFZTUVOVF9NRVRIT0QpO1xuY29uc3QgUGVhY2hQYXlDdXN0b21lciA9IHtcbiAgICBkYXRhOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyXG4gICAgLFxuICAgIGVtYWlsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmVtYWlsXG4gICAgLFxuICAgIGZpcnN0TmFtZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5uYW1lX2ZpcnN0XG4gICAgLFxuICAgIGxhc3ROYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLm5hbWVfbGFzdFxuICAgICxcbiAgICBwaG9uZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5waG9uZVxuICAgICxcbiAgICBhZGRyZXNzMTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMVxuICAgICxcbiAgICBhZGRyZXNzMjogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMlxuICAgICxcbiAgICBjaXR5OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmNpdHlcbiAgICAsXG4gICAgc3RhdGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuc3RhdGVcbiAgICAsXG4gICAgY291bnRyeTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5jb3VudHJ5XG4gICAgLFxuICAgIHBvc3RhbDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5wb3N0YWxcbiAgICAsXG4gICAgY2FyZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5jYXJkXG4gICAgLFxuICAgIHByZWZlcnJlZFBheW1lbnRNZXRob2Q6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIucGF5bWVudF9vcHRpb24gPz8gJ3N0cmlwZSdcbiAgICAsXG4gICAgc3RyaXBlSWQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuc3RyaXBlX2N1c3RvbWVyX2lkID8/ICcnXG4gICAgLFxuICAgIHN0cmlwZURldGFpbHM6ICgpPT4oe1xuICAgICAgICAgICAgbmFtZTogc3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLm5hbWVfZmlyc3QgKyAnICcgKyBzdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIubmFtZV9sYXN0LFxuICAgICAgICAgICAgZW1haWw6IHN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5lbWFpbCxcbiAgICAgICAgICAgIHBob25lOiBzdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIucGhvbmVcbiAgICAgICAgfSlcbiAgICAsXG4gICAgc2hvcnRBZGRyZXNzOiAoKT0+KHtcbiAgICAgICAgICAgIGNvdW50cnk6IFBlYWNoUGF5Q3VzdG9tZXIuY291bnRyeSgpLFxuICAgICAgICAgICAgc3RhdGU6IFBlYWNoUGF5Q3VzdG9tZXIuc3RhdGUoKSxcbiAgICAgICAgICAgIGNpdHk6IFBlYWNoUGF5Q3VzdG9tZXIuY2l0eSgpLFxuICAgICAgICAgICAgcG9zdGNvZGU6IFBlYWNoUGF5Q3VzdG9tZXIucG9zdGFsKClcbiAgICAgICAgfSlcbiAgICAsXG4gICAgc2hpcHBpbmdBZGRyZXNzOiAoKT0+KHtcbiAgICAgICAgICAgIHNoaXBwaW5nX2ZpcnN0X25hbWU6IFBlYWNoUGF5Q3VzdG9tZXIuZmlyc3ROYW1lKCksXG4gICAgICAgICAgICBzaGlwcGluZ19sYXN0X25hbWU6IFBlYWNoUGF5Q3VzdG9tZXIubGFzdE5hbWUoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2NvbXBhbnk6ICcnLFxuICAgICAgICAgICAgc2hpcHBpbmdfY291bnRyeTogUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCksXG4gICAgICAgICAgICBzaGlwcGluZ19hZGRyZXNzXzE6IFBlYWNoUGF5Q3VzdG9tZXIuYWRkcmVzczEoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2FkZHJlc3NfMjogUGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMigpLFxuICAgICAgICAgICAgc2hpcHBpbmdfY2l0eTogUGVhY2hQYXlDdXN0b21lci5jaXR5KCksXG4gICAgICAgICAgICBzaGlwcGluZ19zdGF0ZTogUGVhY2hQYXlDdXN0b21lci5zdGF0ZSgpLFxuICAgICAgICAgICAgc2hpcHBpbmdfcG9zdGNvZGU6IFBlYWNoUGF5Q3VzdG9tZXIucG9zdGFsKClcbiAgICAgICAgfSlcbiAgICAsXG4gICAgYmlsbGluZ0FkZHJlc3M6ICgpPT4oe1xuICAgICAgICAgICAgYmlsbGluZ19maXJzdF9uYW1lOiBQZWFjaFBheUN1c3RvbWVyLmZpcnN0TmFtZSgpLFxuICAgICAgICAgICAgYmlsbGluZ19sYXN0X25hbWU6IFBlYWNoUGF5Q3VzdG9tZXIubGFzdE5hbWUoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfY29tcGFueTogJycsXG4gICAgICAgICAgICBiaWxsaW5nX2VtYWlsOiBQZWFjaFBheUN1c3RvbWVyLmVtYWlsKCksXG4gICAgICAgICAgICBiaWxsaW5nX3Bob25lOiBQZWFjaFBheUN1c3RvbWVyLnBob25lKCksXG4gICAgICAgICAgICBiaWxsaW5nX2NvdW50cnk6IFBlYWNoUGF5Q3VzdG9tZXIuY291bnRyeSgpLFxuICAgICAgICAgICAgYmlsbGluZ19hZGRyZXNzXzE6IFBlYWNoUGF5Q3VzdG9tZXIuYWRkcmVzczEoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfYWRkcmVzc18yOiBQZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MyKCksXG4gICAgICAgICAgICBiaWxsaW5nX2NpdHk6IFBlYWNoUGF5Q3VzdG9tZXIuY2l0eSgpLFxuICAgICAgICAgICAgYmlsbGluZ19zdGF0ZTogUGVhY2hQYXlDdXN0b21lci5zdGF0ZSgpLFxuICAgICAgICAgICAgYmlsbGluZ19wb3N0Y29kZTogUGVhY2hQYXlDdXN0b21lci5wb3N0YWwoKVxuICAgICAgICB9KVxufTtcbmZ1bmN0aW9uIHVwZGF0ZUN1c3RvbWVyTWVyY2hhbnRBY2NvdW50KG1lcmNoYW50Q3VzdG9tZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfQ1VTVE9NRVIsXG4gICAgICAgIHBheWxvYWQ6IG1lcmNoYW50Q3VzdG9tZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gdXBkYXRlQ3VzdG9tZXJNZXJjaGFudEFjY291bnRFeGlzdGVuY2UoZXhpc3QpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfQ1VTVE9NRVJfRVhJU1QsXG4gICAgICAgIHBheWxvYWQ6IGV4aXN0XG4gICAgfTtcbn1cbmNvbnN0IE1lcmNoYW50Q3VzdG9tZXIgPSB7XG4gICAgbG9nZ2VkSW46ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q3VzdG9tZXIubG9nZ2VkSW5cbiAgICAsXG4gICAgdXNlcm5hbWVFeGlzdDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDdXN0b21lci51c2VybmFtZUlzUmVnaXN0ZXJlZFxufTtcbmNvbnN0IHVwZGF0ZVNlc3Npb25JZCA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVNTSU9OSUQpO1xuY29uc3QgdXBkYXRlQ3VzdG9tZXJBZGRyZXNzVmFsaWRhdGlvbiA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9BRERSRVNTX1ZBTElEQVRFRCk7XG5jb25zdCBzZXRFeHRyYUZpZWxkcyA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVRfRVhUUkFfRklFTERTKTtcbmNvbnN0IHNldE9yZGVyRXJyb3IgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VUX0VSUk9SX01FU1NBR0UpO1xuY29uc3QgUGVhY2hQYXlPcmRlciA9IHtcbiAgICBzZXNzaW9uSWQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkXG4gICAgLFxuICAgIGNvbnRlbnRzOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbMF0uY2FydFxuICAgICxcbiAgICBlcnJvck1lc3NhZ2U6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5T3JkZXIuZXJyb3JNZXNzYWdlXG4gICAgLFxuICAgIGNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nOiAoKT0+e1xuICAgICAgICBjb25zdCBjYXJ0cyA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kc1JlY29yZCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGNhcnRLZXkgb2YgT2JqZWN0LmtleXMoY2FydHMpKXtcbiAgICAgICAgICAgIGNvbnN0IGNhcnQgPSBjYXJ0c1tjYXJ0S2V5XTtcbiAgICAgICAgICAgIGlmICghY2FydCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBwYWNrYWdlS2V5IG9mIE9iamVjdC5rZXlzKGNhcnQucGFja2FnZV9yZWNvcmQgPz8ge30pKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWNrYWdlUmVjb3JkID0gY2FydC5wYWNrYWdlX3JlY29yZFtwYWNrYWdlS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhY2thZ2VSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBwaW5nS2V5ID0gY2FydEtleSA9PT0gJzAnID8gcGFja2FnZUtleSA6IGAke2NhcnRLZXl9XyR7cGFja2FnZUtleX1gO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzUmVjb3JkW3NoaXBwaW5nS2V5XSA9IHBhY2thZ2VSZWNvcmQuc2VsZWN0ZWRfbWV0aG9kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kc1JlY29yZDtcbiAgICB9LFxuICAgIGN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5jdXN0b21lckFkZHJlc3NWYWxpZGF0ZWRcbiAgICAsXG4gICAgZXh0cmFGaWVsZHNSZWNvcmQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5T3JkZXIuYWRkaXRpb25hbEZpZWxkc1xufTtcbmZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5U3RyaW5nKGNvc3QpIHtcbiAgICBjb25zdCB7IHN5bWJvbCAsIHBvc2l0aW9uICB9ID0gTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvbmZpZ3VyYXRpb24oKTtcbiAgICBpZiAodHlwZW9mIGNvc3QgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvc3QgPSAwO1xuICAgIH1cbiAgICBsZXQgZm9ybWF0dGVkQ3VycmVuY3kgPSAnJztcbiAgICBpZiAocG9zaXRpb24gPT09ICdsZWZ0JyB8fCBwb3NpdGlvbiA9PT0gJ2xlZnRfc3BhY2UnKSB7XG4gICAgICAgIGxldCBuZWdTeW1ib2wgPSAnJztcbiAgICAgICAgbGV0IGZvcm1hdHRlZENvc3QgPSBmb3JtYXRDb3N0U3RyaW5nKGNvc3QpO1xuICAgICAgICBpZiAoY29zdCA8IDApIHtcbiAgICAgICAgICAgIG5lZ1N5bWJvbCA9ICfiiJInO1xuICAgICAgICAgICAgZm9ybWF0dGVkQ29zdCA9IGZvcm1hdENvc3RTdHJpbmcoTWF0aC5hYnMoY29zdCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZEN1cnJlbmN5ID0gYCR7bmVnU3ltYm9sfSR7c3ltYm9sfSR7cG9zaXRpb24gPT09ICdsZWZ0X3NwYWNlJyA/ICcgJyA6ICcnfSR7Zm9ybWF0dGVkQ29zdH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZEN1cnJlbmN5ID0gYCR7Zm9ybWF0Q29zdFN0cmluZyhjb3N0KX0ke3Bvc2l0aW9uID09PSAncmlnaHRfc3BhY2UnID8gJyAnIDogJyd9JHtzeW1ib2x9YDtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlZEN1cnJlbmN5O1xufVxuZnVuY3Rpb24gZm9ybWF0Q29zdFN0cmluZyhjb3N0KSB7XG4gICAgY29uc3QgeyBjb2RlICwgdGhvdXNhbmRzX3NlcGFyYXRvcjogdGhvdXNhbmRzU2VwYXJhdG9yICwgZGVjaW1hbF9zZXBhcmF0b3I6IGRlY2ltYWxTZXBhcmF0b3IgLCByb3VuZGluZyAsIG51bWJlcl9vZl9kZWNpbWFsczogZGVjaW1hbHMgIH0gPSBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29uZmlndXJhdGlvbigpO1xuICAgIGlmICh0eXBlb2YgY29zdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY29zdCA9IDA7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSAnSlBZJykge1xuICAgICAgICByZXR1cm4gY29zdC50b1N0cmluZygpO1xuICAgIH1cbiAgICBjb25zdCBudW1iZXJPZkRlY2ltYWxzID0gZGVjaW1hbHMgfHwgMjtcbiAgICBzd2l0Y2gocm91bmRpbmcpe1xuICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjb3N0ID0gTWF0aC5jZWlsKGNvc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgY29zdCA9IE1hdGguZmxvb3IoY29zdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmVhcmVzdCc6XG4gICAgICAgICAgICBjb3N0ID0gTWF0aC5yb3VuZChjb3N0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvc3QgPSBOdW1iZXIucGFyc2VGbG9hdChjb3N0LnRvRml4ZWQoZGVjaW1hbHMpKTtcbiAgICBsZXQgZm9ybWF0dGVkUHJpY2UgPSAnJztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjdXJyZW5jeVNwbGl0ID0gY29zdC50b0ZpeGVkKG51bWJlck9mRGVjaW1hbHMpLnNwbGl0KCcuJyk7XG4gICAgICAgIGxldCBkb2xsYXJBbW91bnQgPSBjdXJyZW5jeVNwbGl0WzBdO1xuICAgICAgICBjb25zdCBjZW50c0Ftb3VudCA9IGN1cnJlbmN5U3BsaXRbMV0gfHwgJyc7XG4gICAgICAgIGNvbnN0IHJldiA9IGN1cnJlbmN5U3BsaXRbMF0uc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICAgICAgY29uc3QgcmV2Rm9ybWF0ID0gcmV2Lm1hdGNoKC8uezEsM30vZyk/LmpvaW4odGhvdXNhbmRzU2VwYXJhdG9yKSA/PyAnJztcbiAgICAgICAgZG9sbGFyQW1vdW50ID0gcmV2Rm9ybWF0LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgICAgIGZvcm1hdHRlZFByaWNlICs9IGRvbGxhckFtb3VudDtcbiAgICAgICAgaWYgKGNlbnRzQW1vdW50ICE9PSAnJykge1xuICAgICAgICAgICAgZm9ybWF0dGVkUHJpY2UgKz0gZGVjaW1hbFNlcGFyYXRvciArIGNlbnRzQW1vdW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRQcmljZTtcbiAgICB9IGNhdGNoICB7XG4gICAgICAgIHJldHVybiBjb3N0LnRvRml4ZWQoZGVjaW1hbHMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFySW5wdXQoc2VsZWN0b3IpIHtcbiAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbChzZWxlY3Rvcikpe1xuICAgICAgICAkZWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckRyb3BEb3duTGlzdChkYXRhLCBkZWZhdWx0T3B0aW9uID0gJycpIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBsaXN0ID0gT2JqZWN0LmVudHJpZXMoZGF0YSkubWFwKChba2V5LCB2YWx1ZV0pPT5gPG9wdGlvbiB2YWx1ZT1cIiR7a2V5fVwiPiAke3ZhbHVlfSA8L29wdGlvbj5gXG4gICAgKTtcbiAgICBpZiAoZGVmYXVsdE9wdGlvbikge1xuICAgICAgICByZXR1cm4gYDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlPVwiXCI+JHtkZWZhdWx0T3B0aW9ufTwvb3B0aW9uPiR7bGlzdC5qb2luKCcnKX1gO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdC5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdERyb3Bkb3duKCRzZWxlY3QsIHZhbHVlKSB7XG4gICAgaWYgKCEkc2VsZWN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xufVxuZnVuY3Rpb24gZm9ybUVudHJ5KGZvcm1EYXRhLCBrZXkpIHtcbiAgICBpZiAoZm9ybURhdGEuZ2V0KGtleSkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybURhdGEuZ2V0KGtleSkgPz8gJyc7XG59XG5mdW5jdGlvbiBnZXRDb3VudHJ5TmFtZShjb3VudHJ5Q29kZSkge1xuICAgIGlmICghcGVhY2hwYXlDb3VudHJpZXNbY291bnRyeUNvZGVdKSB7XG4gICAgICAgIHJldHVybiAnVW5rbm93biBDb3VudHJ5IENvZGU6ICcgKyBjb3VudHJ5Q29kZTtcbiAgICB9XG4gICAgcmV0dXJuIHBlYWNocGF5Q291bnRyaWVzPy5bY291bnRyeUNvZGVdPy5uYW1lID8/ICdVbmtub3duIENvdW50cnkgQ29kZTogJyArIGNvdW50cnlDb2RlO1xufVxuZnVuY3Rpb24gc3RhdGVQcm92aW5jZU9yQ291bnR5KGNvdW50cnlDb2RlKSB7XG4gICAgc3dpdGNoKGNvdW50cnlDb2RlKXtcbiAgICAgICAgY2FzZSAnVVMnOlxuICAgICAgICBjYXNlICdNWSc6XG4gICAgICAgIGNhc2UgJ0FVJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRMb2NhbGVUZXh0KCdTZWxlY3QgYSBTdGF0ZScpO1xuICAgICAgICBjYXNlICdHQic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgnY291bnR5Jyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgnU2VsZWN0IGEgUHJvdmluY2UnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc0VVQ291bnRyeShjb3VudHJ5Q29kZSkge1xuICAgIGNvbnN0IEVVQ291bnRyaWVzID0gW1xuICAgICAgICAnQVQnLFxuICAgICAgICAnQkUnLFxuICAgICAgICAnQkcnLFxuICAgICAgICAnQ1knLFxuICAgICAgICAnQ1onLFxuICAgICAgICAnREsnLFxuICAgICAgICAnRUUnLFxuICAgICAgICAnRkknLFxuICAgICAgICAnRlInLFxuICAgICAgICAnREUnLFxuICAgICAgICAnR1InLFxuICAgICAgICAnSFUnLFxuICAgICAgICAnSUUnLFxuICAgICAgICAnSVQnLFxuICAgICAgICAnTFYnLFxuICAgICAgICAnTFQnLFxuICAgICAgICAnTFUnLFxuICAgICAgICAnTVQnLFxuICAgICAgICAnTkwnLFxuICAgICAgICAnUEwnLFxuICAgICAgICAnUFQnLFxuICAgICAgICAnUk8nLFxuICAgICAgICAnU0snLFxuICAgICAgICAnU0knLFxuICAgICAgICAnRVMnLFxuICAgICAgICAnU0UnXG4gICAgXTtcbiAgICBpZiAoRVVDb3VudHJpZXMuaW5jbHVkZXMoY291bnRyeUNvZGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5jb25zdCBwZWFjaHBheUNvdW50cmllcyA9IHtcbiAgICBBRjoge1xuICAgICAgICBuYW1lOiAnQWZnaGFuaXN0YW4nXG4gICAgfSxcbiAgICBBWDoge1xuICAgICAgICBuYW1lOiAnw4VsYW5kIElzbGFuZHMnXG4gICAgfSxcbiAgICBBTDoge1xuICAgICAgICBuYW1lOiAnQWxiYW5pYSdcbiAgICB9LFxuICAgIERaOiB7XG4gICAgICAgIG5hbWU6ICdBbGdlcmlhJ1xuICAgIH0sXG4gICAgQVM6IHtcbiAgICAgICAgbmFtZTogJ0FtZXJpY2FuIFNhbW9hJ1xuICAgIH0sXG4gICAgQUQ6IHtcbiAgICAgICAgbmFtZTogJ0FuZG9ycmEnXG4gICAgfSxcbiAgICBBTzoge1xuICAgICAgICBuYW1lOiAnQW5nb2xhJ1xuICAgIH0sXG4gICAgQUk6IHtcbiAgICAgICAgbmFtZTogJ0FuZ3VpbGxhJ1xuICAgIH0sXG4gICAgQVE6IHtcbiAgICAgICAgbmFtZTogJ0FudGFyY3RpY2EnXG4gICAgfSxcbiAgICBBRzoge1xuICAgICAgICBuYW1lOiAnQW50aWd1YSBhbmQgQmFyYnVkYSdcbiAgICB9LFxuICAgIEFSOiB7XG4gICAgICAgIG5hbWU6ICdBcmdlbnRpbmEnXG4gICAgfSxcbiAgICBBTToge1xuICAgICAgICBuYW1lOiAnQXJtZW5pYSdcbiAgICB9LFxuICAgIEFXOiB7XG4gICAgICAgIG5hbWU6ICdBcnViYSdcbiAgICB9LFxuICAgIEFVOiB7XG4gICAgICAgIG5hbWU6ICdBdXN0cmFsaWEnXG4gICAgfSxcbiAgICBBVDoge1xuICAgICAgICBuYW1lOiAnQXVzdHJpYSdcbiAgICB9LFxuICAgIEFaOiB7XG4gICAgICAgIG5hbWU6ICdBemVyYmFpamFuJ1xuICAgIH0sXG4gICAgQlM6IHtcbiAgICAgICAgbmFtZTogJ0JhaGFtYXMnXG4gICAgfSxcbiAgICBCSDoge1xuICAgICAgICBuYW1lOiAnQmFocmFpbidcbiAgICB9LFxuICAgIEJEOiB7XG4gICAgICAgIG5hbWU6ICdCYW5nbGFkZXNoJ1xuICAgIH0sXG4gICAgQkI6IHtcbiAgICAgICAgbmFtZTogJ0JhcmJhZG9zJ1xuICAgIH0sXG4gICAgQlk6IHtcbiAgICAgICAgbmFtZTogJ0JlbGFydXMnXG4gICAgfSxcbiAgICBCRToge1xuICAgICAgICBuYW1lOiAnQmVsZ2l1bSdcbiAgICB9LFxuICAgIEJaOiB7XG4gICAgICAgIG5hbWU6ICdCZWxpemUnXG4gICAgfSxcbiAgICBCSjoge1xuICAgICAgICBuYW1lOiAnQmVuaW4nXG4gICAgfSxcbiAgICBCTToge1xuICAgICAgICBuYW1lOiAnQmVybXVkYSdcbiAgICB9LFxuICAgIEJUOiB7XG4gICAgICAgIG5hbWU6ICdCaHV0YW4nXG4gICAgfSxcbiAgICBCTzoge1xuICAgICAgICBuYW1lOiAnQm9saXZpYSwgUGx1cmluYXRpb25hbCBTdGF0ZSBvZidcbiAgICB9LFxuICAgIEJROiB7XG4gICAgICAgIG5hbWU6ICdCb25haXJlLCBTaW50IEV1c3RhdGl1cyBhbmQgU2FiYSdcbiAgICB9LFxuICAgIEJBOiB7XG4gICAgICAgIG5hbWU6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJ1xuICAgIH0sXG4gICAgQlc6IHtcbiAgICAgICAgbmFtZTogJ0JvdHN3YW5hJ1xuICAgIH0sXG4gICAgQlY6IHtcbiAgICAgICAgbmFtZTogJ0JvdXZldCBJc2xhbmQnXG4gICAgfSxcbiAgICBCUjoge1xuICAgICAgICBuYW1lOiAnQnJhemlsJ1xuICAgIH0sXG4gICAgSU86IHtcbiAgICAgICAgbmFtZTogJ0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeSdcbiAgICB9LFxuICAgIEJOOiB7XG4gICAgICAgIG5hbWU6ICdCcnVuZWkgRGFydXNzYWxhbSdcbiAgICB9LFxuICAgIEJHOiB7XG4gICAgICAgIG5hbWU6ICdCdWxnYXJpYSdcbiAgICB9LFxuICAgIEJGOiB7XG4gICAgICAgIG5hbWU6ICdCdXJraW5hIEZhc28nXG4gICAgfSxcbiAgICBCSToge1xuICAgICAgICBuYW1lOiAnQnVydW5kaSdcbiAgICB9LFxuICAgIEtIOiB7XG4gICAgICAgIG5hbWU6ICdDYW1ib2RpYSdcbiAgICB9LFxuICAgIENNOiB7XG4gICAgICAgIG5hbWU6ICdDYW1lcm9vbidcbiAgICB9LFxuICAgIENBOiB7XG4gICAgICAgIG5hbWU6ICdDYW5hZGEnXG4gICAgfSxcbiAgICBDVjoge1xuICAgICAgICBuYW1lOiAnQ2FwZSBWZXJkZSdcbiAgICB9LFxuICAgIEtZOiB7XG4gICAgICAgIG5hbWU6ICdDYXltYW4gSXNsYW5kcydcbiAgICB9LFxuICAgIENGOiB7XG4gICAgICAgIG5hbWU6ICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnXG4gICAgfSxcbiAgICBURDoge1xuICAgICAgICBuYW1lOiAnQ2hhZCdcbiAgICB9LFxuICAgIENMOiB7XG4gICAgICAgIG5hbWU6ICdDaGlsZSdcbiAgICB9LFxuICAgIENOOiB7XG4gICAgICAgIG5hbWU6ICdDaGluYSdcbiAgICB9LFxuICAgIENYOiB7XG4gICAgICAgIG5hbWU6ICdDaHJpc3RtYXMgSXNsYW5kJ1xuICAgIH0sXG4gICAgQ0M6IHtcbiAgICAgICAgbmFtZTogJ0NvY29zIChLZWVsaW5nKSBJc2xhbmRzJ1xuICAgIH0sXG4gICAgQ086IHtcbiAgICAgICAgbmFtZTogJ0NvbG9tYmlhJ1xuICAgIH0sXG4gICAgS006IHtcbiAgICAgICAgbmFtZTogJ0NvbW9yb3MnXG4gICAgfSxcbiAgICBDRzoge1xuICAgICAgICBuYW1lOiAnQ29uZ28nXG4gICAgfSxcbiAgICBDRDoge1xuICAgICAgICBuYW1lOiAnQ29uZ28sIHRoZSBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZSdcbiAgICB9LFxuICAgIENLOiB7XG4gICAgICAgIG5hbWU6ICdDb29rIElzbGFuZHMnXG4gICAgfSxcbiAgICBDUjoge1xuICAgICAgICBuYW1lOiAnQ29zdGEgUmljYSdcbiAgICB9LFxuICAgIENJOiB7XG4gICAgICAgIG5hbWU6ICdDw7R0ZSBkXFwnSXZvaXJlJ1xuICAgIH0sXG4gICAgSFI6IHtcbiAgICAgICAgbmFtZTogJ0Nyb2F0aWEnXG4gICAgfSxcbiAgICBDVToge1xuICAgICAgICBuYW1lOiAnQ3ViYSdcbiAgICB9LFxuICAgIENXOiB7XG4gICAgICAgIG5hbWU6ICdDdXJhw6dhbydcbiAgICB9LFxuICAgIENZOiB7XG4gICAgICAgIG5hbWU6ICdDeXBydXMnXG4gICAgfSxcbiAgICBDWjoge1xuICAgICAgICBuYW1lOiAnQ3plY2ggUmVwdWJsaWMnXG4gICAgfSxcbiAgICBESzoge1xuICAgICAgICBuYW1lOiAnRGVubWFyaydcbiAgICB9LFxuICAgIERKOiB7XG4gICAgICAgIG5hbWU6ICdEamlib3V0aSdcbiAgICB9LFxuICAgIERNOiB7XG4gICAgICAgIG5hbWU6ICdEb21pbmljYSdcbiAgICB9LFxuICAgIERPOiB7XG4gICAgICAgIG5hbWU6ICdEb21pbmljYW4gUmVwdWJsaWMnXG4gICAgfSxcbiAgICBFQzoge1xuICAgICAgICBuYW1lOiAnRWN1YWRvcidcbiAgICB9LFxuICAgIEVHOiB7XG4gICAgICAgIG5hbWU6ICdFZ3lwdCdcbiAgICB9LFxuICAgIFNWOiB7XG4gICAgICAgIG5hbWU6ICdFbCBTYWx2YWRvcidcbiAgICB9LFxuICAgIEdROiB7XG4gICAgICAgIG5hbWU6ICdFcXVhdG9yaWFsIEd1aW5lYSdcbiAgICB9LFxuICAgIEVSOiB7XG4gICAgICAgIG5hbWU6ICdFcml0cmVhJ1xuICAgIH0sXG4gICAgRUU6IHtcbiAgICAgICAgbmFtZTogJ0VzdG9uaWEnXG4gICAgfSxcbiAgICBFVDoge1xuICAgICAgICBuYW1lOiAnRXRoaW9waWEnXG4gICAgfSxcbiAgICBGSzoge1xuICAgICAgICBuYW1lOiAnRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpJ1xuICAgIH0sXG4gICAgRk86IHtcbiAgICAgICAgbmFtZTogJ0Zhcm9lIElzbGFuZHMnXG4gICAgfSxcbiAgICBGSjoge1xuICAgICAgICBuYW1lOiAnRmlqaSdcbiAgICB9LFxuICAgIEZJOiB7XG4gICAgICAgIG5hbWU6ICdGaW5sYW5kJ1xuICAgIH0sXG4gICAgRlI6IHtcbiAgICAgICAgbmFtZTogJ0ZyYW5jZSdcbiAgICB9LFxuICAgIEdGOiB7XG4gICAgICAgIG5hbWU6ICdGcmVuY2ggR3VpYW5hJ1xuICAgIH0sXG4gICAgUEY6IHtcbiAgICAgICAgbmFtZTogJ0ZyZW5jaCBQb2x5bmVzaWEnXG4gICAgfSxcbiAgICBURjoge1xuICAgICAgICBuYW1lOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJ1xuICAgIH0sXG4gICAgR0E6IHtcbiAgICAgICAgbmFtZTogJ0dhYm9uJ1xuICAgIH0sXG4gICAgR006IHtcbiAgICAgICAgbmFtZTogJ0dhbWJpYSdcbiAgICB9LFxuICAgIEdFOiB7XG4gICAgICAgIG5hbWU6ICdHZW9yZ2lhJ1xuICAgIH0sXG4gICAgREU6IHtcbiAgICAgICAgbmFtZTogJ0dlcm1hbnknXG4gICAgfSxcbiAgICBHSDoge1xuICAgICAgICBuYW1lOiAnR2hhbmEnXG4gICAgfSxcbiAgICBHSToge1xuICAgICAgICBuYW1lOiAnR2licmFsdGFyJ1xuICAgIH0sXG4gICAgR1I6IHtcbiAgICAgICAgbmFtZTogJ0dyZWVjZSdcbiAgICB9LFxuICAgIEdMOiB7XG4gICAgICAgIG5hbWU6ICdHcmVlbmxhbmQnXG4gICAgfSxcbiAgICBHRDoge1xuICAgICAgICBuYW1lOiAnR3JlbmFkYSdcbiAgICB9LFxuICAgIEdQOiB7XG4gICAgICAgIG5hbWU6ICdHdWFkZWxvdXBlJ1xuICAgIH0sXG4gICAgR1U6IHtcbiAgICAgICAgbmFtZTogJ0d1YW0nXG4gICAgfSxcbiAgICBHVDoge1xuICAgICAgICBuYW1lOiAnR3VhdGVtYWxhJ1xuICAgIH0sXG4gICAgR0c6IHtcbiAgICAgICAgbmFtZTogJ0d1ZXJuc2V5J1xuICAgIH0sXG4gICAgR046IHtcbiAgICAgICAgbmFtZTogJ0d1aW5lYSdcbiAgICB9LFxuICAgIEdXOiB7XG4gICAgICAgIG5hbWU6ICdHdWluZWEtQmlzc2F1J1xuICAgIH0sXG4gICAgR1k6IHtcbiAgICAgICAgbmFtZTogJ0d1eWFuYSdcbiAgICB9LFxuICAgIEhUOiB7XG4gICAgICAgIG5hbWU6ICdIYWl0aSdcbiAgICB9LFxuICAgIEhNOiB7XG4gICAgICAgIG5hbWU6ICdIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHMnXG4gICAgfSxcbiAgICBWQToge1xuICAgICAgICBuYW1lOiAnSG9seSBTZWUgKFZhdGljYW4gQ2l0eSBTdGF0ZSknXG4gICAgfSxcbiAgICBITjoge1xuICAgICAgICBuYW1lOiAnSG9uZHVyYXMnXG4gICAgfSxcbiAgICBISzoge1xuICAgICAgICBuYW1lOiAnSG9uZyBLb25nJ1xuICAgIH0sXG4gICAgSFU6IHtcbiAgICAgICAgbmFtZTogJ0h1bmdhcnknXG4gICAgfSxcbiAgICBJUzoge1xuICAgICAgICBuYW1lOiAnSWNlbGFuZCdcbiAgICB9LFxuICAgIElOOiB7XG4gICAgICAgIG5hbWU6ICdJbmRpYSdcbiAgICB9LFxuICAgIElEOiB7XG4gICAgICAgIG5hbWU6ICdJbmRvbmVzaWEnXG4gICAgfSxcbiAgICBJUjoge1xuICAgICAgICBuYW1lOiAnSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIElROiB7XG4gICAgICAgIG5hbWU6ICdJcmFxJ1xuICAgIH0sXG4gICAgSUU6IHtcbiAgICAgICAgbmFtZTogJ0lyZWxhbmQnXG4gICAgfSxcbiAgICBJTToge1xuICAgICAgICBuYW1lOiAnSXNsZSBvZiBNYW4nXG4gICAgfSxcbiAgICBJTDoge1xuICAgICAgICBuYW1lOiAnSXNyYWVsJ1xuICAgIH0sXG4gICAgSVQ6IHtcbiAgICAgICAgbmFtZTogJ0l0YWx5J1xuICAgIH0sXG4gICAgSk06IHtcbiAgICAgICAgbmFtZTogJ0phbWFpY2EnXG4gICAgfSxcbiAgICBKUDoge1xuICAgICAgICBuYW1lOiAnSmFwYW4nXG4gICAgfSxcbiAgICBKRToge1xuICAgICAgICBuYW1lOiAnSmVyc2V5J1xuICAgIH0sXG4gICAgSk86IHtcbiAgICAgICAgbmFtZTogJ0pvcmRhbidcbiAgICB9LFxuICAgIEtaOiB7XG4gICAgICAgIG5hbWU6ICdLYXpha2hzdGFuJ1xuICAgIH0sXG4gICAgS0U6IHtcbiAgICAgICAgbmFtZTogJ0tlbnlhJ1xuICAgIH0sXG4gICAgS0k6IHtcbiAgICAgICAgbmFtZTogJ0tpcmliYXRpJ1xuICAgIH0sXG4gICAgS1A6IHtcbiAgICAgICAgbmFtZTogJ0tvcmVhIERlbW9jcmF0aWMgUGVvcGxlXFwncyBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIEtSOiB7XG4gICAgICAgIG5hbWU6ICdLb3JlYSBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIEtXOiB7XG4gICAgICAgIG5hbWU6ICdLdXdhaXQnXG4gICAgfSxcbiAgICBLRzoge1xuICAgICAgICBuYW1lOiAnS3lyZ3l6c3RhbidcbiAgICB9LFxuICAgIExBOiB7XG4gICAgICAgIG5hbWU6ICdMYW8gUGVvcGxlXFwncyBEZW1vY3JhdGljIFJlcHVibGljJ1xuICAgIH0sXG4gICAgTFY6IHtcbiAgICAgICAgbmFtZTogJ0xhdHZpYSdcbiAgICB9LFxuICAgIExCOiB7XG4gICAgICAgIG5hbWU6ICdMZWJhbm9uJ1xuICAgIH0sXG4gICAgTFM6IHtcbiAgICAgICAgbmFtZTogJ0xlc290aG8nXG4gICAgfSxcbiAgICBMUjoge1xuICAgICAgICBuYW1lOiAnTGliZXJpYSdcbiAgICB9LFxuICAgIExZOiB7XG4gICAgICAgIG5hbWU6ICdMaWJ5YSdcbiAgICB9LFxuICAgIExJOiB7XG4gICAgICAgIG5hbWU6ICdMaWVjaHRlbnN0ZWluJ1xuICAgIH0sXG4gICAgTFQ6IHtcbiAgICAgICAgbmFtZTogJ0xpdGh1YW5pYSdcbiAgICB9LFxuICAgIExVOiB7XG4gICAgICAgIG5hbWU6ICdMdXhlbWJvdXJnJ1xuICAgIH0sXG4gICAgTU86IHtcbiAgICAgICAgbmFtZTogJ01hY2FvJ1xuICAgIH0sXG4gICAgTUs6IHtcbiAgICAgICAgbmFtZTogJ01hY2Vkb25pYSwgdGhlIGZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIE1HOiB7XG4gICAgICAgIG5hbWU6ICdNYWRhZ2FzY2FyJ1xuICAgIH0sXG4gICAgTVc6IHtcbiAgICAgICAgbmFtZTogJ01hbGF3aSdcbiAgICB9LFxuICAgIE1ZOiB7XG4gICAgICAgIG5hbWU6ICdNYWxheXNpYSdcbiAgICB9LFxuICAgIE1WOiB7XG4gICAgICAgIG5hbWU6ICdNYWxkaXZlcydcbiAgICB9LFxuICAgIE1MOiB7XG4gICAgICAgIG5hbWU6ICdNYWxpJ1xuICAgIH0sXG4gICAgTVQ6IHtcbiAgICAgICAgbmFtZTogJ01hbHRhJ1xuICAgIH0sXG4gICAgTUg6IHtcbiAgICAgICAgbmFtZTogJ01hcnNoYWxsIElzbGFuZHMnXG4gICAgfSxcbiAgICBNUToge1xuICAgICAgICBuYW1lOiAnTWFydGluaXF1ZSdcbiAgICB9LFxuICAgIE1SOiB7XG4gICAgICAgIG5hbWU6ICdNYXVyaXRhbmlhJ1xuICAgIH0sXG4gICAgTVU6IHtcbiAgICAgICAgbmFtZTogJ01hdXJpdGl1cydcbiAgICB9LFxuICAgIFlUOiB7XG4gICAgICAgIG5hbWU6ICdNYXlvdHRlJ1xuICAgIH0sXG4gICAgTVg6IHtcbiAgICAgICAgbmFtZTogJ01leGljbydcbiAgICB9LFxuICAgIEZNOiB7XG4gICAgICAgIG5hbWU6ICdNaWNyb25lc2lhLCBGZWRlcmF0ZWQgU3RhdGVzIG9mJ1xuICAgIH0sXG4gICAgTUQ6IHtcbiAgICAgICAgbmFtZTogJ01vbGRvdmEsIFJlcHVibGljIG9mJ1xuICAgIH0sXG4gICAgTUM6IHtcbiAgICAgICAgbmFtZTogJ01vbmFjbydcbiAgICB9LFxuICAgIE1OOiB7XG4gICAgICAgIG5hbWU6ICdNb25nb2xpYSdcbiAgICB9LFxuICAgIE1FOiB7XG4gICAgICAgIG5hbWU6ICdNb250ZW5lZ3JvJ1xuICAgIH0sXG4gICAgTVM6IHtcbiAgICAgICAgbmFtZTogJ01vbnRzZXJyYXQnXG4gICAgfSxcbiAgICBNQToge1xuICAgICAgICBuYW1lOiAnTW9yb2NjbydcbiAgICB9LFxuICAgIE1aOiB7XG4gICAgICAgIG5hbWU6ICdNb3phbWJpcXVlJ1xuICAgIH0sXG4gICAgTU06IHtcbiAgICAgICAgbmFtZTogJ015YW5tYXInXG4gICAgfSxcbiAgICBOQToge1xuICAgICAgICBuYW1lOiAnTmFtaWJpYSdcbiAgICB9LFxuICAgIE5SOiB7XG4gICAgICAgIG5hbWU6ICdOYXVydSdcbiAgICB9LFxuICAgIE5QOiB7XG4gICAgICAgIG5hbWU6ICdOZXBhbCdcbiAgICB9LFxuICAgIE5MOiB7XG4gICAgICAgIG5hbWU6ICdOZXRoZXJsYW5kcydcbiAgICB9LFxuICAgIE5DOiB7XG4gICAgICAgIG5hbWU6ICdOZXcgQ2FsZWRvbmlhJ1xuICAgIH0sXG4gICAgTlo6IHtcbiAgICAgICAgbmFtZTogJ05ldyBaZWFsYW5kJ1xuICAgIH0sXG4gICAgTkk6IHtcbiAgICAgICAgbmFtZTogJ05pY2FyYWd1YSdcbiAgICB9LFxuICAgIE5FOiB7XG4gICAgICAgIG5hbWU6ICdOaWdlcidcbiAgICB9LFxuICAgIE5HOiB7XG4gICAgICAgIG5hbWU6ICdOaWdlcmlhJ1xuICAgIH0sXG4gICAgTlU6IHtcbiAgICAgICAgbmFtZTogJ05pdWUnXG4gICAgfSxcbiAgICBORjoge1xuICAgICAgICBuYW1lOiAnTm9yZm9sayBJc2xhbmQnXG4gICAgfSxcbiAgICBNUDoge1xuICAgICAgICBuYW1lOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJ1xuICAgIH0sXG4gICAgTk86IHtcbiAgICAgICAgbmFtZTogJ05vcndheSdcbiAgICB9LFxuICAgIE9NOiB7XG4gICAgICAgIG5hbWU6ICdPbWFuJ1xuICAgIH0sXG4gICAgUEs6IHtcbiAgICAgICAgbmFtZTogJ1Bha2lzdGFuJ1xuICAgIH0sXG4gICAgUFc6IHtcbiAgICAgICAgbmFtZTogJ1BhbGF1J1xuICAgIH0sXG4gICAgUFM6IHtcbiAgICAgICAgbmFtZTogJ1BhbGVzdGluaWFuIFRlcnJpdG9yeSdcbiAgICB9LFxuICAgIFBBOiB7XG4gICAgICAgIG5hbWU6ICdQYW5hbWEnXG4gICAgfSxcbiAgICBQRzoge1xuICAgICAgICBuYW1lOiAnUGFwdWEgTmV3IEd1aW5lYSdcbiAgICB9LFxuICAgIFBZOiB7XG4gICAgICAgIG5hbWU6ICdQYXJhZ3VheSdcbiAgICB9LFxuICAgIFBFOiB7XG4gICAgICAgIG5hbWU6ICdQZXJ1J1xuICAgIH0sXG4gICAgUEg6IHtcbiAgICAgICAgbmFtZTogJ1BoaWxpcHBpbmVzJ1xuICAgIH0sXG4gICAgUE46IHtcbiAgICAgICAgbmFtZTogJ1BpdGNhaXJuJ1xuICAgIH0sXG4gICAgUEw6IHtcbiAgICAgICAgbmFtZTogJ1BvbGFuZCdcbiAgICB9LFxuICAgIFBUOiB7XG4gICAgICAgIG5hbWU6ICdQb3J0dWdhbCdcbiAgICB9LFxuICAgIFBSOiB7XG4gICAgICAgIG5hbWU6ICdQdWVydG8gUmljbydcbiAgICB9LFxuICAgIFFBOiB7XG4gICAgICAgIG5hbWU6ICdRYXRhcidcbiAgICB9LFxuICAgIFJFOiB7XG4gICAgICAgIG5hbWU6ICdSw6l1bmlvbidcbiAgICB9LFxuICAgIFJPOiB7XG4gICAgICAgIG5hbWU6ICdSb21hbmlhJ1xuICAgIH0sXG4gICAgUlU6IHtcbiAgICAgICAgbmFtZTogJ1J1c3NpYW4gRmVkZXJhdGlvbidcbiAgICB9LFxuICAgIFJXOiB7XG4gICAgICAgIG5hbWU6ICdSd2FuZGEnXG4gICAgfSxcbiAgICBCTDoge1xuICAgICAgICBuYW1lOiAnU2FpbnQgQmFydGjDqWxlbXknXG4gICAgfSxcbiAgICBTSDoge1xuICAgICAgICBuYW1lOiAnU2FpbnQgSGVsZW5hLCBBc2NlbnNpb24gYW5kIFRyaXN0YW4gZGEgQ3VuaGEnXG4gICAgfSxcbiAgICBLTjoge1xuICAgICAgICBuYW1lOiAnU2FpbnQgS2l0dHMgYW5kIE5ldmlzJ1xuICAgIH0sXG4gICAgTEM6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEx1Y2lhJ1xuICAgIH0sXG4gICAgTUY6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IE1hcnRpbiAoRnJlbmNoIHBhcnQpJ1xuICAgIH0sXG4gICAgUE06IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IFBpZXJyZSBhbmQgTWlxdWVsb24nXG4gICAgfSxcbiAgICBWQzoge1xuICAgICAgICBuYW1lOiAnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnXG4gICAgfSxcbiAgICBXUzoge1xuICAgICAgICBuYW1lOiAnU2Ftb2EnXG4gICAgfSxcbiAgICBTTToge1xuICAgICAgICBuYW1lOiAnU2FuIE1hcmlubydcbiAgICB9LFxuICAgIFNUOiB7XG4gICAgICAgIG5hbWU6ICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnXG4gICAgfSxcbiAgICBTQToge1xuICAgICAgICBuYW1lOiAnU2F1ZGkgQXJhYmlhJ1xuICAgIH0sXG4gICAgU046IHtcbiAgICAgICAgbmFtZTogJ1NlbmVnYWwnXG4gICAgfSxcbiAgICBSUzoge1xuICAgICAgICBuYW1lOiAnU2VyYmlhJ1xuICAgIH0sXG4gICAgU0M6IHtcbiAgICAgICAgbmFtZTogJ1NleWNoZWxsZXMnXG4gICAgfSxcbiAgICBTTDoge1xuICAgICAgICBuYW1lOiAnU2llcnJhIExlb25lJ1xuICAgIH0sXG4gICAgU0c6IHtcbiAgICAgICAgbmFtZTogJ1NpbmdhcG9yZSdcbiAgICB9LFxuICAgIFNYOiB7XG4gICAgICAgIG5hbWU6ICdTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpJ1xuICAgIH0sXG4gICAgU0s6IHtcbiAgICAgICAgbmFtZTogJ1Nsb3Zha2lhJ1xuICAgIH0sXG4gICAgU0k6IHtcbiAgICAgICAgbmFtZTogJ1Nsb3ZlbmlhJ1xuICAgIH0sXG4gICAgU0I6IHtcbiAgICAgICAgbmFtZTogJ1NvbG9tb24gSXNsYW5kcydcbiAgICB9LFxuICAgIFNPOiB7XG4gICAgICAgIG5hbWU6ICdTb21hbGlhJ1xuICAgIH0sXG4gICAgWkE6IHtcbiAgICAgICAgbmFtZTogJ1NvdXRoIEFmcmljYSdcbiAgICB9LFxuICAgIEdTOiB7XG4gICAgICAgIG5hbWU6ICdTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kcydcbiAgICB9LFxuICAgIFNTOiB7XG4gICAgICAgIG5hbWU6ICdTb3V0aCBTdWRhbidcbiAgICB9LFxuICAgIEVTOiB7XG4gICAgICAgIG5hbWU6ICdTcGFpbidcbiAgICB9LFxuICAgIExLOiB7XG4gICAgICAgIG5hbWU6ICdTcmkgTGFua2EnXG4gICAgfSxcbiAgICBTRDoge1xuICAgICAgICBuYW1lOiAnU3VkYW4nXG4gICAgfSxcbiAgICBTUjoge1xuICAgICAgICBuYW1lOiAnU3VyaW5hbWUnXG4gICAgfSxcbiAgICBTSjoge1xuICAgICAgICBuYW1lOiAnU3ZhbGJhcmQgYW5kIEphbiBNYXllbidcbiAgICB9LFxuICAgIFNaOiB7XG4gICAgICAgIG5hbWU6ICdTd2F6aWxhbmQnXG4gICAgfSxcbiAgICBTRToge1xuICAgICAgICBuYW1lOiAnU3dlZGVuJ1xuICAgIH0sXG4gICAgQ0g6IHtcbiAgICAgICAgbmFtZTogJ1N3aXR6ZXJsYW5kJ1xuICAgIH0sXG4gICAgU1k6IHtcbiAgICAgICAgbmFtZTogJ1N5cmlhbiBBcmFiIFJlcHVibGljJ1xuICAgIH0sXG4gICAgVFc6IHtcbiAgICAgICAgbmFtZTogJ1RhaXdhbidcbiAgICB9LFxuICAgIFRKOiB7XG4gICAgICAgIG5hbWU6ICdUYWppa2lzdGFuJ1xuICAgIH0sXG4gICAgVFo6IHtcbiAgICAgICAgbmFtZTogJ1RhbnphbmlhIFVuaXRlZCBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIFRIOiB7XG4gICAgICAgIG5hbWU6ICdUaGFpbGFuZCdcbiAgICB9LFxuICAgIFRMOiB7XG4gICAgICAgIG5hbWU6ICdUaW1vci1MZXN0ZSdcbiAgICB9LFxuICAgIFRHOiB7XG4gICAgICAgIG5hbWU6ICdUb2dvJ1xuICAgIH0sXG4gICAgVEs6IHtcbiAgICAgICAgbmFtZTogJ1Rva2VsYXUnXG4gICAgfSxcbiAgICBUTzoge1xuICAgICAgICBuYW1lOiAnVG9uZ2EnXG4gICAgfSxcbiAgICBUVDoge1xuICAgICAgICBuYW1lOiAnVHJpbmlkYWQgYW5kIFRvYmFnbydcbiAgICB9LFxuICAgIFROOiB7XG4gICAgICAgIG5hbWU6ICdUdW5pc2lhJ1xuICAgIH0sXG4gICAgVFI6IHtcbiAgICAgICAgbmFtZTogJ1R1cmtleSdcbiAgICB9LFxuICAgIFRNOiB7XG4gICAgICAgIG5hbWU6ICdUdXJrbWVuaXN0YW4nXG4gICAgfSxcbiAgICBUQzoge1xuICAgICAgICBuYW1lOiAnVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzJ1xuICAgIH0sXG4gICAgVFY6IHtcbiAgICAgICAgbmFtZTogJ1R1dmFsdSdcbiAgICB9LFxuICAgIFVHOiB7XG4gICAgICAgIG5hbWU6ICdVZ2FuZGEnXG4gICAgfSxcbiAgICBVQToge1xuICAgICAgICBuYW1lOiAnVWtyYWluZSdcbiAgICB9LFxuICAgIEFFOiB7XG4gICAgICAgIG5hbWU6ICdVbml0ZWQgQXJhYiBFbWlyYXRlcydcbiAgICB9LFxuICAgIEdCOiB7XG4gICAgICAgIG5hbWU6ICdVbml0ZWQgS2luZ2RvbSdcbiAgICB9LFxuICAgIFVTOiB7XG4gICAgICAgIG5hbWU6ICdVbml0ZWQgU3RhdGVzJ1xuICAgIH0sXG4gICAgVU06IHtcbiAgICAgICAgbmFtZTogJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcydcbiAgICB9LFxuICAgIFVZOiB7XG4gICAgICAgIG5hbWU6ICdVcnVndWF5J1xuICAgIH0sXG4gICAgVVo6IHtcbiAgICAgICAgbmFtZTogJ1V6YmVraXN0YW4nXG4gICAgfSxcbiAgICBWVToge1xuICAgICAgICBuYW1lOiAnVmFudWF0dSdcbiAgICB9LFxuICAgIFZFOiB7XG4gICAgICAgIG5hbWU6ICdWZW5lenVlbGEsIEJvbGl2YXJpYW4gUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBWTjoge1xuICAgICAgICBuYW1lOiAnVmlldG5hbSdcbiAgICB9LFxuICAgIFZHOiB7XG4gICAgICAgIG5hbWU6ICdWaXJnaW4gSXNsYW5kcydcbiAgICB9LFxuICAgIFZJOiB7XG4gICAgICAgIG5hbWU6ICdWaXJnaW4gSXNsYW5kcywgVS5TJ1xuICAgIH0sXG4gICAgV0Y6IHtcbiAgICAgICAgbmFtZTogJ1dhbGxpcyBhbmQgRnV0dW5hJ1xuICAgIH0sXG4gICAgRUg6IHtcbiAgICAgICAgbmFtZTogJ1dlc3Rlcm4gU2FoYXJhJ1xuICAgIH0sXG4gICAgWUU6IHtcbiAgICAgICAgbmFtZTogJ1llbWVuJ1xuICAgIH0sXG4gICAgWk06IHtcbiAgICAgICAgbmFtZTogJ1phbWJpYSdcbiAgICB9LFxuICAgIFpXOiB7XG4gICAgICAgIG5hbWU6ICdaaW1iYWJ3ZSdcbiAgICB9XG59O1xuY29uc3QgR0xPQkFMID0ge1xuICAgIGNvbXBsZXRlZE9yZGVyOiBudWxsLFxuICAgIHBocERhdGE6IG51bGwsXG4gICAgbGlua2VkUHJvZHVjdHNJZHM6IFtdXG59O1xuZnVuY3Rpb24gcGVhY2hwYXlBbGVydChtZXNzYWdlLCBhY3Rpb24gPSAnJykge1xuICAgIGlmIChHTE9CQUw/LnBocERhdGE/LmFsZXJ0U3VwcG9ydCkge1xuICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGV2ZW50OiAncGVhY2hwYXlBbGVydCcsXG4gICAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH0sICcqJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoYWN0aW9uLCAnKicpO1xuICAgICAgICB9XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VzdG9tZXIoKSB7XG4gICAgY29uc3QgaUZyYW1lV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uZS1jbGljay1pZnJhbWUnKT8uY29udGVudFdpbmRvdztcbiAgICBpZiAoIWlGcmFtZVdpbmRvdykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoV2luZG93RGF0YShpRnJhbWVXaW5kb3csICdwcC1nZXQtZXhpc3RpbmctY3VzdG9tZXItZGF0YScpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2V0Q3VzdG9tZXIoY3VzdG9tZXIpIHtcbiAgICBjb25zdCBpRnJhbWVXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb25lLWNsaWNrLWlmcmFtZScpPy5jb250ZW50V2luZG93O1xuICAgIGlmICghaUZyYW1lV2luZG93KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoV2luZG93RGF0YShpRnJhbWVXaW5kb3csICdwcC1zZXQtZXhpc3RpbmctY3VzdG9tZXItZGF0YScsIGN1c3RvbWVyKTtcbn1cbmZ1bmN0aW9uIGNhcnRJc1ZpcnR1YWwoY2FydCkge1xuICAgIGlmIChjYXJ0Py5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBjYXJ0Py5ldmVyeSgodik9PnYudmlydHVhbFxuICAgICkgPz8gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGl0ZW1zSW5DYXJ0KGNhcnQpIHtcbiAgICByZXR1cm4gY2FydD8ubGVuZ3RoID8/IDA7XG59XG5mdW5jdGlvbiBjYXJ0SXRlbVF1YW50aXR5KGNhcnRJdGVtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjYXJ0SXRlbT8ucXVhbnRpdHkgPT09ICdzdHJpbmcnID8gTnVtYmVyLnBhcnNlSW50KGNhcnRJdGVtLnF1YW50aXR5KSA6IGNhcnRJdGVtPy5xdWFudGl0eSA/PyAwO1xufVxuZnVuY3Rpb24gcmVzdHJpY3RlZENhcnRQcm9kdWN0c0J5Q291bnRyeShjYXJ0LCBzZWxlY3RlZENvdW50cnlDb2RlKSB7XG4gICAgcmV0dXJuIGNhcnQuZmlsdGVyKCh2KT0+e1xuICAgICAgICBpZiAodi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zKSB7XG4gICAgICAgICAgICBpZiAodi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zLnR5cGUgPT09ICdzcGVjaWZpYycgJiYgIXYud2NfY291bnRyeV9iYXNlX3Jlc3RyaWN0aW9ucy5jb3VudHJpZXMuaW5jbHVkZXMoc2VsZWN0ZWRDb3VudHJ5Q29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2LndjX2NvdW50cnlfYmFzZV9yZXN0cmljdGlvbnMudHlwZSA9PT0gJ2V4Y2x1ZGVkJyAmJiB2LndjX2NvdW50cnlfYmFzZV9yZXN0cmljdGlvbnMuY291bnRyaWVzLmluY2x1ZGVzKHNlbGVjdGVkQ291bnRyeUNvZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVDYXJ0SXRlbXNXaXRoQ3VzdG9tZXIoY2FydCwgdXNlTG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3QgY3VzdG9tZXIgPSBhd2FpdCBnZXRDdXN0b21lcigpO1xuICAgIGNvbnN0IGNvdW50cnlWYWx1ZSA9ICRxcygnI2NvdW50cnknKT8udmFsdWUgPz8gJyc7XG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSAmJiBjdXN0b21lcikge1xuICAgICAgICBjb25zdCBpbnZhbGlkQ2FydEl0ZW1zID0gcmVzdHJpY3RlZENhcnRQcm9kdWN0c0J5Q291bnRyeShjYXJ0LCBjdXN0b21lci5jb3VudHJ5KTtcbiAgICAgICAgaWYgKGludmFsaWRDYXJ0SXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwZWFjaHBheUFsZXJ0KGBUaGUgZm9sbG93aW5nIGNhcnQgaXRlbXMgY2Fubm90IGJlIHNoaXBwZWQgdG8gJHtnZXRDb3VudHJ5TmFtZShjb3VudHJ5VmFsdWUpfTpcXG4gJHtpbnZhbGlkQ2FydEl0ZW1zLm1hcCgodik9PnYubmFtZVxuICAgICAgICApLmpvaW4oJywnKX0uXFxuIFBsZWFzZSByZW1vdmUgdGhlbSBmcm9tIHlvdXIgY2FydC5gLCAnY2xvc2VNb2RhbCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWRDYXJ0SXRlbXMgPSByZXN0cmljdGVkQ2FydFByb2R1Y3RzQnlDb3VudHJ5KGNhcnQsIGNvdW50cnlWYWx1ZSk7XG4gICAgaWYgKGludmFsaWRDYXJ0SXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwZWFjaHBheUFsZXJ0KGBUaGUgZm9sbG93aW5nIGNhcnQgaXRlbXMgY2Fubm90IGJlIHNoaXBwZWQgdG8gJHtnZXRDb3VudHJ5TmFtZShjb3VudHJ5VmFsdWUpfTpcXG4gJHtpbnZhbGlkQ2FydEl0ZW1zLm1hcCgodik9PnYubmFtZVxuICAgICkuam9pbignLCcpfS5cXG4gUGxlYXNlIHJlbW92ZSB0aGVtIGZyb20geW91ciBjYXJ0LmAsICdjbG9zZU1vZGFsJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gYnVpbGRTdWJzY3JpcHRpb25QcmljZU1ldGFEYXRhKG1ldGEsIF9fc2hvcnQgPSBmYWxzZSkge1xuICAgIGlmICghbWV0YS5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoTnVtYmVyLnBhcnNlSW50KFN0cmluZyhtZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2RfaW50ZXJ2YWwpKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYCAvICR7bWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kfWA7XG4gICAgfVxuICAgIGlmIChfX3Nob3J0KSB7XG4gICAgICAgIHJldHVybiBgIGV2ZXJ5ICR7bWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kX2ludGVydmFsfSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1zYDtcbiAgICB9XG4gICAgcmV0dXJuIGAgZXZlcnkgJHttZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2RfaW50ZXJ2YWx9ICR7bWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kfXMgZm9yICR7bWV0YS5zdWJzY3JpcHRpb24ubGVuZ3RofSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1zYDtcbn1cbmZ1bmN0aW9uIGJ1aWxkU3Vic2NyaXB0aW9uRmlyc3RSZW5ld2FsU3RyaW5nKG1ldGEpIHtcbiAgICBpZiAoIW1ldGEuc3Vic2NyaXB0aW9uIHx8ICFtZXRhLnN1YnNjcmlwdGlvbi5maXJzdF9yZW5ld2FsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG1ldGEuc3Vic2NyaXB0aW9uLmZpcnN0X3JlbmV3YWwpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9O1xuICAgIHJldHVybiBgRmlyc3QgcmVuZXdhbDogJHtkYXRlLnRvTG9jYWxlU3RyaW5nKEVudmlyb25tZW50Lmxhbmd1YWdlKCksIG9wdGlvbnMpfWA7XG59XG5mdW5jdGlvbiBpbml0TWVyY2hhbnRBY2NvdW50KG1lc3NhZ2UpIHtcbiAgICBpbml0TWVyY2hhbnRBY2NvdW50RXZlbnRzKCk7XG4gICAgY29uc3QgYWNjb3VudERldGFpbHMgPSBtZXNzYWdlLnBocERhdGEubWVyY2hhbnRfY3VzdG9tZXJfYWNjb3VudDtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudEFjY291bnRDb25maWcoe1xuICAgICAgICBhbGxvd0d1ZXN0Q2hlY2tvdXQ6IGFjY291bnREZXRhaWxzPy5hbGxvd19ndWVzdF9jaGVja291dCA/PyB0cnVlLFxuICAgICAgICBhbGxvd0FjY291bnRDcmVhdGlvbk9yTG9naW5EdXJpbmdDaGVja291dDogYWNjb3VudERldGFpbHM/LmxvZ2luc19hbmRfcmVnaXN0cmF0aW9uc19lbmFibGVkID8/IHRydWUsXG4gICAgICAgIGF1dG9HZW5lcmF0ZVVzZXJuYW1lOiBhY2NvdW50RGV0YWlscz8uYXV0b19nZW5lcmF0ZV91c2VybmFtZSA/PyBmYWxzZSxcbiAgICAgICAgYXV0b0dlbmVyYXRlUGFzc3dvcmQ6IGFjY291bnREZXRhaWxzPy5hdXRvX2dlbmVyYXRlX3Bhc3N3b3JkID8/IGZhbHNlXG4gICAgfSkpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyTWVyY2hhbnRBY2NvdW50KHtcbiAgICAgICAgdXNlcm5hbWU6IGFjY291bnREZXRhaWxzLmVtYWlsID8/ICcnLFxuICAgICAgICBsb2dnZWRJbjogYWNjb3VudERldGFpbHMubG9nZ2VkX2luID8/IGZhbHNlLFxuICAgICAgICB1c2VybmFtZUlzUmVnaXN0ZXJlZDogYWNjb3VudERldGFpbHMubG9nZ2VkX2luID8/IGZhbHNlXG4gICAgfSkpO1xufVxuZnVuY3Rpb24gaW5pdE1lcmNoYW50QWNjb3VudEV2ZW50cygpIHtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyTWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZElucHV0KE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCAhRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSAmJiBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSA9PT0gJ3BheW1lbnQnKTtcbiAgICB9KTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0nKT8uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KT0+e1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXF1ZXN0TWVyY2hhbnRBY2NvdW50RXhpc3RlbmNlKFBlYWNoUGF5Q3VzdG9tZXIuZW1haWwoKSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdlbWFpbEV4aXN0JywgKG1lc3NhZ2UpPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyTWVyY2hhbnRBY2NvdW50RXhpc3RlbmNlKEJvb2xlYW4obWVzc2FnZS5lbWFpbFJlc3VsdCkpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlcXVlc3RNZXJjaGFudEFjY291bnRFeGlzdGVuY2UoZW1haWwpIHtcbiAgICB3aW5kb3cudG9wPy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGV2ZW50OiAnZW1haWxFeGlzdCcsXG4gICAgICAgIGVtYWlsXG4gICAgfSwgJyonKTtcbn1cbmZ1bmN0aW9uIGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpIHtcbiAgICBjb25zdCAkaW5wdXQgPSAkcXMoJyNhY2NvdW50LXBhc3N3b3JkJyk7XG4gICAgY29uc3QgJGlucHV0RXhpc3RpbmcgPSAkcXMoJyNhY2NvdW50LXBhc3N3b3JkLWV4aXN0aW5nJyk7XG4gICAgaWYgKCEkaW5wdXQgfHwgISRpbnB1dEV4aXN0aW5nKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKCRpbnB1dEV4aXN0aW5nLnZhbHVlICE9PSAnJykge1xuICAgICAgICByZXR1cm4gJGlucHV0RXhpc3RpbmcudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiAkaW5wdXQudmFsdWU7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZU1lcmNoYW50Q3VzdG9tZXJQYXNzd29yZEZpZWxkKCkge1xuICAgIGNvbnN0IHBhc3N3b3JkID0gZ2V0TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZFZhbHVlKCk7XG4gICAgY29uc3QgJHJlZFRleHQgPSAkcXMoJyNhY2NvdW50LXBhc3N3b3JkLWVycm9yJyk7XG4gICAgY29uc3QgJHJlZFRleHRFeGlzdGluZyA9ICRxcygnI2FjY291bnQtcGFzc3dvcmQtZXJyb3ItZXhpc3RpbmcnKTtcbiAgICBpZiAoISRyZWRUZXh0IHx8ICEkcmVkVGV4dEV4aXN0aW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhc3N3b3JkID09PSAnJyB8fCBwYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgICAgICRyZWRUZXh0LnRleHRDb250ZW50ID0gZ2V0TG9jYWxlVGV4dCgnVGhlIHBhc3N3b3JkIGVudGVyZWQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZy4nKTtcbiAgICAgICAgJHJlZFRleHRFeGlzdGluZy50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ1RoZSBwYXNzd29yZCBlbnRlcmVkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgJHJlZFRleHQudGV4dENvbnRlbnQgPSAnJztcbiAgICAkcmVkVGV4dEV4aXN0aW5nLnRleHRDb250ZW50ID0gJyc7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBzaG91bGRTaG93TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZEZpZWxkKCkge1xuICAgIGlmIChNZXJjaGFudEN1c3RvbWVyLmxvZ2dlZEluKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIUNhcnRzLnN1YnNjcmlwdGlvblByZXNlbnQoKSkge1xuICAgICAgICBpZiAoIU1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5hbGxvd0d1ZXN0Q2hlY2tvdXQoKSkge1xuICAgICAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5nZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIU1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5sb2dpbkR1cmluZ0NoZWNrb3V0RW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uYWNjb3VudHMuZ2VuZXJhdGVQYXNzd29yZEVuYWJsZWQoKSAmJiAhTWVyY2hhbnRDdXN0b21lci51c2VybmFtZUV4aXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uYWNjb3VudHMuZ2VuZXJhdGVQYXNzd29yZEVuYWJsZWQoKSAmJiAhTWVyY2hhbnRDdXN0b21lci51c2VybmFtZUV4aXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRJbnB1dChtZXJjaGFudEhvc3RuYW1lLCBvbk5ld1BheW1lbnRTY3JlZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0ICRpbnB1dCA9ICRxcygnI3BwLWFjY291bnQtcGFzc3dvcmQnKTtcbiAgICBjb25zdCAkaW5wdXRFeGlzdGluZyA9ICRxcygnI3BwLWFjY291bnQtcGFzc3dvcmQtZXhpc3RpbmcnKTtcbiAgICBpZiAoISRpbnB1dCB8fCAhJGlucHV0RXhpc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkaW5wdXQudmFsdWUgPSAnJztcbiAgICAkaW5wdXRFeGlzdGluZy52YWx1ZSA9ICcnO1xuICAgIGNvbnN0IGxhYmVsSFRNTCA9IGdldExvY2FsZVRleHQoJ0NyZWF0ZSBhIG5ldyBwYXNzd29yZCwgb3IgdXNlIGFuIGV4aXN0aW5nIG9uZSBpZiB5b3UgYWxyZWFkeSBoYXZlIGFuIGFjY291bnQgZm9yJykgKyAnICcgKyBtZXJjaGFudEhvc3RuYW1lO1xuICAgICRxcygnI3BwLWFjY291bnQtcGFzc3dvcmQtbGFiZWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBsYWJlbEhUTUxcbiAgICApO1xuICAgICRxcygnI3BwLWFjY291bnQtcGFzc3dvcmQtbGFiZWwtZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBsYWJlbEhUTUxcbiAgICApO1xuICAgIGlmIChzaG91bGRTaG93TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZEZpZWxkKCkpIHtcbiAgICAgICAgaWYgKG9uTmV3UGF5bWVudFNjcmVlbikge1xuICAgICAgICAgICAgJGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgJGlucHV0RXhpc3RpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRpbnB1dC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRpbnB1dEV4aXN0aW5nLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0RGVsaXZlcnlEYXRlKCkge1xuICAgICRxcygnI2V4aXN0aW5nLWRlbGl2ZXJ5LWRhdGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hlY2tEZWxpdmVyeURhdGVJc1ZhbGlkKTtcbiAgICAkcXMoJyNleGlzdGluZy1kZWxpdmVyeS1kYXRlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZURlbGl2ZXJ5RGF0ZSk7XG4gICAgJHFzKCcjZGVsaXZlcnktZGF0ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGVja0RlbGl2ZXJ5RGF0ZUlzVmFsaWQpO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJEZWxpdmVyeURhdGUoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNvbGxlY3REZWxpdmVyeURhdGUoKSB7XG4gICAgcmV0dXJuICRxcygnI2RlbGl2ZXJ5LWRhdGUnKT8udmFsdWUgPz8gJyc7XG59XG5mdW5jdGlvbiByZW5kZXJEZWxpdmVyeURhdGUoKSB7XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X2FjdGl2ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWRlbGl2ZXJ5LWRhdGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI2NoZWNrb3V0LWRlbGl2ZXJ5LWRhdGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbnN0IHRvZGF5RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWF4RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbWF4RGF0ZS5zZXREYXRlKHRvZGF5RGF0ZS5nZXREYXRlKCkgKyAoR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X29wdGlvbnM/LndjX29kX21heF9kZWxpdmVyeV9kYXlzID8/IDApKTtcbiAgICBjb25zdCAkc2hpcHBpbmdEYXRlID0gJHFzKCcjZGVsaXZlcnktZGF0ZScpO1xuICAgIGNvbnN0ICRleGlzdGluZ0N1c3RvbWVyU2hpcHBpbmdEYXRlID0gJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpO1xuICAgIGlmICghJHNoaXBwaW5nRGF0ZSB8fCAhJGV4aXN0aW5nQ3VzdG9tZXJTaGlwcGluZ0RhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkc2hpcHBpbmdEYXRlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAkZXhpc3RpbmdDdXN0b21lclNoaXBwaW5nRGF0ZS5taW4gPSB0b2RheURhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgJHNoaXBwaW5nRGF0ZS5taW4gPSB0b2RheURhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgJGV4aXN0aW5nQ3VzdG9tZXJTaGlwcGluZ0RhdGUubWF4ID0gbWF4RGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICAkc2hpcHBpbmdEYXRlLm1heCA9IG1heERhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG59XG5mdW5jdGlvbiBjaGVja0RlbGl2ZXJ5RGF0ZUlzRW1wdHkoKSB7XG4gICAgcmV0dXJuICgkcXMoJyNleGlzdGluZy1kZWxpdmVyeS1kYXRlJyk/LnZhbHVlID8/ICcnKSA9PT0gJyc7XG59XG5mdW5jdGlvbiB1cGRhdGVEZWxpdmVyeURhdGUoKSB7XG4gICAgY29uc3QgJGRlbGl2ZXJ5RGF0ZSA9ICRxcygnI2RlbGl2ZXJ5LWRhdGUnKTtcbiAgICBpZiAoISRkZWxpdmVyeURhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkZGVsaXZlcnlEYXRlLnZhbHVlID0gJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpPy52YWx1ZSA/PyAnJztcbn1cbmZ1bmN0aW9uIGNoZWNrRGVsaXZlcnlEYXRlSXNWYWxpZChldmVudCkge1xuICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZURhdGVJc0F2YWlsYWJsZShldmVudC50YXJnZXQudmFsdWUpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICBwZWFjaHBheUFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGFub3RoZXIgZGVsaXZlcnkgZGF0ZS4nKTtcbiAgICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZURhdGVJc0F2YWlsYWJsZShkYXRlU3RyaW5nKSB7XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRheSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcgKyAnVDAwOjAwOjAwJykuZ2V0RGF5KCk7XG4gICAgcmV0dXJuICFHTE9CQUwucGhwRGF0YS5wbHVnaW5fd29vY29tbWVyY2Vfb3JkZXJfZGVsaXZlcnlfb3B0aW9ucz8uZGVsaXZlcnlfdW5jaGVja2VkX2RheT8uaW5jbHVkZXMoU3RyaW5nKGRheSkpO1xufVxuZnVuY3Rpb24gaW5pdE9yZGVyTm90ZXMoKSB7XG4gICAgaWYgKEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5PUkRFUl9OT1RFUykpIHtcbiAgICAgICAgZm9yIChjb25zdCAkZm9ybSBvZiAkcXNBbGwoJy5vcmRlci1ub3RlcycpKXtcbiAgICAgICAgICAgICRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbGxlY3RPcmRlck5vdGVzKCkge1xuICAgIGNvbnN0IG9yZGVyTm90ZXMgPSAkcXMoJyNvcmRlci1ub3RlcycpO1xuICAgIGNvbnN0IG9yZGVyTm90ZXNFeGlzdGluZyA9ICRxcygnI29yZGVyLW5vdGVzLWV4aXN0aW5nJyk7XG4gICAgaWYgKG9yZGVyTm90ZXMgIT09IG51bGwgJiYgb3JkZXJOb3Rlc0V4aXN0aW5nICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChvcmRlck5vdGVzLnZhbHVlICE9PSAnJyAmJiBvcmRlck5vdGVzRXhpc3RpbmcudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JkZXJOb3Rlcy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXJOb3Rlcy52YWx1ZSA9PT0gJycgJiYgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5mdW5jdGlvbiBzeW5jT3JkZXJOb3RlcyhleGl0TW9kdWxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBvcmRlck5vdGVzRXhpc3RpbmcgPSAkcXMoJyNvcmRlci1ub3Rlcy1leGlzdGluZycpO1xuICAgIGNvbnN0IG9yZGVyTm90ZXMgPSAkcXMoJyNvcmRlci1ub3RlcycpO1xuICAgIGlmIChvcmRlck5vdGVzICE9PSBudWxsICYmIG9yZGVyTm90ZXNFeGlzdGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSAmJiBvcmRlck5vdGVzLnZhbHVlICE9PSAnJyAmJiBleGl0TW9kdWxlKSB7XG4gICAgICAgICAgICBvcmRlck5vdGVzRXhpc3RpbmcudmFsdWUgPSBvcmRlck5vdGVzLnZhbHVlO1xuICAgICAgICAgICAgb3JkZXJOb3Rlcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmRlck5vdGVzRXhpc3RpbmcudmFsdWUgIT09ICcnICYmICFleGl0TW9kdWxlKSB7XG4gICAgICAgICAgICBvcmRlck5vdGVzLnZhbHVlID0gb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlO1xuICAgICAgICAgICAgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbml0VkFUKG1lc3NhZ2UpIHtcbiAgICBpbml0VmF0RXZlbnRzKCk7XG4gICAgaWYgKG1lc3NhZ2UucGhwRGF0YS52YXRfc2VsZl92ZXJpZnkgPT09ICcxJykge1xuICAgICAgICByZW5kZXJWZXJpZnlMb2NhdGlvbigpO1xuICAgIH1cbiAgICBjb25zdCB2YXRUeXBlc1JlcXVpcmluZ0lEID0gbWVzc2FnZS5waHBEYXRhLnZhdF9yZXF1aXJlZCA9PT0gJzEnIHx8IG1lc3NhZ2UucGhwRGF0YS52YXRfcmVxdWlyZWQgPT09ICcyJyAmJiBpc0VVQ291bnRyeShQZWFjaFBheUN1c3RvbWVyLmNvdW50cnkoKSk7XG4gICAgaWYgKHZhdFR5cGVzUmVxdWlyaW5nSUQpIHtcbiAgICAgICAgcmVuZGVyVkFUSURJbnB1dCgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRWYXRFdmVudHMoKSB7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdmF0VHlwZXNSZXF1aXJpbmdJRCA9IEdMT0JBTC5waHBEYXRhPy52YXRfcmVxdWlyZWQgPT09ICcxJyB8fCBHTE9CQUwucGhwRGF0YT8udmF0X3JlcXVpcmVkID09PSAnMicgJiYgaXNFVUNvdW50cnkoUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCkpO1xuICAgICAgICBpZiAodmF0VHlwZXNSZXF1aXJpbmdJRCkge1xuICAgICAgICAgICAgcmVuZGVyVkFUSURJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJWQVRJRElucHV0KCkge1xuICAgIGNvbnN0ICRwcmV2aW91c0RpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3RVVWYXREaXYnKTtcbiAgICAkcHJldmlvdXNEaXZzPy5yZW1vdmUoKTtcbiAgICBjb25zdCAkRVVWYXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCAkdmF0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCAkdmF0TnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAkdmF0TnVtYmVyLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAncmVxdWlyZWQnKTtcbiAgICAkdmF0TnVtYmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndmF0SW5wdXQnKTtcbiAgICBjb25zdCAkcHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICRwcm9tcHQuaW5uZXJIVE1MID0gJ1ZhdCBOdW1iZXInO1xuICAgICR2YXRGb3JtLmFwcGVuZCgkdmF0TnVtYmVyKTtcbiAgICAkRVVWYXREaXYuYXBwZW5kKCRwcm9tcHQpO1xuICAgICRFVVZhdERpdi5hcHBlbmQoJHZhdEZvcm0pO1xuICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ0V1VmF0RGl2Jyk7XG4gICAgJEVVVmF0RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29sb3ItY2hhbmdlLXRleHQnKTtcbiAgICBsZXQgJGluc2VydGlvbkxvY2F0aW9uO1xuICAgIGNvbnN0ICRuZXdDdXN0b21lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKTtcbiAgICBpZiAoJG5ld0N1c3RvbWVyPy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICAkaW5zZXJ0aW9uTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpc3RpbmctY2hlY2tvdXQtY2FyZCcpO1xuICAgICAgICAkdmF0TnVtYmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncHBWYXROdW1FeGlzdGluZycpO1xuICAgICAgICAkRVVWYXREaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb2xvci1jaGFuZ2UtdGV4dCcpO1xuICAgICAgICAkaW5zZXJ0aW9uTG9jYXRpb24/Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCAkRVVWYXREaXYpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRpbnNlcnRpb25Mb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXltZW50LW1ldGhvZHMnKTtcbiAgICAgICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BwVmF0TnVtTmV3Jyk7XG4gICAgICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3gtbGFyZ2UnKTtcbiAgICAgICAgJEVVVmF0RGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV3RVVWYXREaXYnKTtcbiAgICAgICAgJGluc2VydGlvbkxvY2F0aW9uPy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgJEVVVmF0RGl2KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRWYXROdW1iZXIoKSB7XG4gICAgY29uc3QgJG5ld0N1c3RvbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BwLW5ldy1jdXN0b21lci1jaGVja291dCcpO1xuICAgIGlmICgkbmV3Q3VzdG9tZXI/LmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKSB7XG4gICAgICAgIGNvbnN0ICRwcFZhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcFZhdE51bUV4aXN0aW5nJyk7XG4gICAgICAgIGlmICghJHBwVmF0KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRwcFZhdC52YWx1ZSA/PyAnJztcbiAgICB9XG4gICAgY29uc3QgJHBwVmF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BwVmF0TnVtTmV3Jyk7XG4gICAgaWYgKCEkcHBWYXQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gJHBwVmF0LnZhbHVlID8/ICcnO1xufVxuZnVuY3Rpb24gcmVuZGVyVmVyaWZ5TG9jYXRpb24oKSB7XG4gICAgY29uc3QgJHZlcmlmeURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0ICR2ZXJpZnlDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgJGRlc2NyaXB0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICR2ZXJpZnlDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BwX3ZlcmlmeV9jb3VudHJ5Jyk7XG4gICAgJHZlcmlmeUNoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICR2ZXJpZnlDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJzEnKTtcbiAgICAkZGVzY3JpcHRvci5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdwcF92ZXJpZnlfY291bnRyeScpO1xuICAgICRkZXNjcmlwdG9yLmlubmVySFRNTCA9IGdldExvY2FsZVRleHQoJ0kgdmVyaWZ5IHRoYXQgdGhlIGNvdW50cnkgSSBoYXZlIGVudGVyZWQgaXMgdGhlIG9uZSBJIHJlc2lkZSBpbicpO1xuICAgICR2ZXJpZnlEaXYuYXBwZW5kKCR2ZXJpZnlDaGVja2JveCk7XG4gICAgJHZlcmlmeURpdi5hcHBlbmQoJGRlc2NyaXB0b3IpO1xuICAgIGNvbnN0ICRkaXZDbG9uZSA9ICR2ZXJpZnlEaXYuY2xvbmVOb2RlKHRydWUpO1xuICAgIGNvbnN0ICRpbnNlcnRpb25Mb2NhdGlvbiA9ICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQnKTtcbiAgICBjb25zdCAkaW5zZXJ0TG9jYXRpb24yID0gJHFzKCcjcGF5bWVudC1tZXRob2RzJyk7XG4gICAgJGluc2VydGlvbkxvY2F0aW9uPy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgJHZlcmlmeURpdik7XG4gICAgJGluc2VydExvY2F0aW9uMj8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRkaXZDbG9uZSk7XG59XG5mdW5jdGlvbiBnZXRWZXJpZnkoKSB7XG4gICAgY29uc3QgJGlzVmVyaWZpZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcHBfdmVyaWZ5X2NvdW50cnknKTtcbiAgICBpZiAoJGlzVmVyaWZpZWRbMF0uY2hlY2tlZCB8fCAkaXNWZXJpZmllZFsxXS5jaGVja2VkKSB7XG4gICAgICAgIHJldHVybiAnMSc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cbmZ1bmN0aW9uIGlzRGV2RW52aXJvbm1lbnQoYmFzZVVybCkge1xuICAgIHJldHVybiBiYXNlVXJsID09PSAnaHR0cHM6Ly9kZXYucGVhY2hwYXkuYXBwLycgfHwgYmFzZVVybCA9PT0gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmxvY2FsLycgfHwgYmFzZVVybCA9PT0gJ2h0dHBzOi8vcHJvZC5wZWFjaHBheS5sb2NhbC8nO1xufVxuZnVuY3Rpb24gZ2V0QmFzZVVSTChtZXJjaGFudEhvc3RuYW1lLCBpc1Rlc3RNb2RlKSB7XG4gICAgaWYgKGlzVGVzdE1vZGUpIHtcbiAgICAgICAgc3dpdGNoKG1lcmNoYW50SG9zdG5hbWUpe1xuICAgICAgICAgICAgY2FzZSAnc3RvcmUubG9jYWwnOlxuICAgICAgICAgICAgY2FzZSAnd29vLnN0b3JlLmxvY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmxvY2FsLyc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYucGVhY2hwYXkuYXBwLyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3dpdGNoKG1lcmNoYW50SG9zdG5hbWUpe1xuICAgICAgICBjYXNlICdsb2NhbGhvc3QnOlxuICAgICAgICBjYXNlICcxMjcuMC4wLjEnOlxuICAgICAgICBjYXNlICd3b28ucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUxLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMi5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTMucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWU0LnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICdxYS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICdkZW1vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmFwcC8nO1xuICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vcHJvZC5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL3Byb2QucGVhY2hwYXkuYXBwLyc7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T25lQ2xpY2tVUkwobWVyY2hhbnRIb3N0bmFtZSwgaXNUZXN0TW9kZSkge1xuICAgIGlmIChpc1Rlc3RNb2RlKSB7XG4gICAgICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgICAgIGNhc2UgJ3N0b3JlLmxvY2FsJzpcbiAgICAgICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi1jb25uZWN0LnBlYWNocGF5LmxvY2FsLyc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYtY29ubmVjdC12Mi5wZWFjaHBheWNoZWNrb3V0LmNvbS8nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgICAgY2FzZSAnMTI3LjAuMC4xJzpcbiAgICAgICAgY2FzZSAnd29vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTIucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUzLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNC5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTUucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAncWEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAnZGVtby5wZWFjaHBheS5hcHAnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi1jb25uZWN0LXYyLnBlYWNocGF5Y2hlY2tvdXQuY29tLyc7XG4gICAgICAgIGNhc2UgJ3N0b3JlLmxvY2FsJzpcbiAgICAgICAgY2FzZSAnd29vLnN0b3JlLmxvY2FsJzpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9jb25uZWN0LnBlYWNocGF5LmxvY2FsLyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vY29ubmVjdC12Mi5wZWFjaHBheWNoZWNrb3V0LmNvbS8nO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGVybWluZVBhZ2VUeXBlKGlzQ2FydFBhZ2UsIGlzQ2hlY2tvdXRQYWdlKSB7XG4gICAgaWYgKGlzQ2FydFBhZ2UpIHtcbiAgICAgICAgcmV0dXJuICdjYXJ0JztcbiAgICB9XG4gICAgaWYgKGlzQ2hlY2tvdXRQYWdlKSB7XG4gICAgICAgIHJldHVybiAnY2hlY2tvdXQnO1xuICAgIH1cbiAgICByZXR1cm4gJ3Byb2R1Y3QnO1xufVxuZnVuY3Rpb24gc3luY0ZpZWxkcyhldmVudCkge1xuICAgIGNvbnN0ICRmb3JtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2Zvcm0nKTtcbiAgICBjb25zdCBmaWVsZFJlY29yZCA9IHt9O1xuICAgIGZvciAoY29uc3QgJGlucHV0IG9mIEFycmF5LmZyb20oJGZvcm0uZWxlbWVudHMpKXtcbiAgICAgICAgZmllbGRSZWNvcmRbJGlucHV0Lm5hbWVdID0gJGlucHV0LnZhbHVlO1xuICAgIH1cbiAgICBzdG9yZS5kaXNwYXRjaChzZXRFeHRyYUZpZWxkcyhmaWVsZFJlY29yZCkpO1xufVxuZnVuY3Rpb24gcmVuZGVyQWRkaXRpb25hbEZpZWxkcyhmaWVsZERhdGEsIGZpZWxkT3JkZXIpIHtcbiAgICBpZiAoZmllbGREYXRhLmxlbmd0aCA9PT0gMCB8fCBmaWVsZE9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjYWRkaXRpb25hbC1maWVsZHMtZXhpc3RpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGZvciAoY29uc3QgaSBvZiBmaWVsZE9yZGVyKXtcbiAgICAgICAgaWYgKGZpZWxkRGF0YVtpXS5maWVsZF9lbmFibGUpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlRmllbGRzKGZpZWxkRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHFzKCcjYWRkaXRpb25hbC1maWVsZHMtbmV3Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHN5bmNGaWVsZHMpO1xuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLWV4aXN0aW5nJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHN5bmNGaWVsZHMpO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJFeHRyYUZpZWxkcyhQZWFjaFBheU9yZGVyLmV4dHJhRmllbGRzUmVjb3JkKCkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyRXh0cmFGaWVsZHMoZXh0cmFGaWVsZERhdGEpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhleHRyYUZpZWxkRGF0YSkpe1xuICAgICAgICAkcXNBbGwoYFtuYW1lPVwiJHtrZXl9XCJdLmV4dHJhLWZpZWxkYCwgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSB2YWx1ZVxuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRzKGZpZWxkRGF0YSkge1xuICAgIGNvbnN0IGZpZWxkID0gKGxvY2F0aW9uKT0+JzxkaXYgY2xhc3M9XCJuZXctZmllbGRcIj4nICsgZ2VuZXJhdGVGaWVsZEVsZW1lbnQobG9jYXRpb24sIGZpZWxkRGF0YSkgKyAnPC9kaXY+J1xuICAgIDtcbiAgICBjb25zdCBuZXdQYWdlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkaXRpb25hbC1maWVsZHMtbmV3Jyk7XG4gICAgY29uc3QgZXhzaXRQYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRpdGlvbmFsLWZpZWxkcy1leGlzdGluZycpO1xuICAgIGlmIChuZXdQYWdlRWxlbWVudHMpIHtcbiAgICAgICAgbmV3UGFnZUVsZW1lbnRzLmlubmVySFRNTCArPSBmaWVsZCgnLW5ldycpO1xuICAgIH1cbiAgICBpZiAoZXhzaXRQYWdlRWxlbWVudCkge1xuICAgICAgICBleHNpdFBhZ2VFbGVtZW50LmlubmVySFRNTCArPSBmaWVsZCgnLWV4aXN0aW5nJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVGaWVsZEVsZW1lbnQobG9jYXRpb24xLCBmaWVsZERhdGEpIHtcbiAgICBsZXQgZWxlbWVudFN0cmluZyA9ICcnO1xuICAgIGNvbnN0IG9wdGlvbmFsID0gJzxzcGFuIGNsYXNzPVwib3B0aW9uYWxcIj4gKG9wdGlvbmFsKSA8L3NwYW4+JztcbiAgICBjb25zdCByZXF1aXJlZCA9ICc8YWJiciBjbGFzcz1cInJlcXVpcmVkXCIgdGl0bGU9XCJyZXF1aXJlZFwiIHN0eWxlPVwiY29sb3I6cmVkO1wiPio8L2FiYnI+JztcbiAgICBjb25zdCBsYWJlbEJ1aWxkZXIgPSAobG9jYXRpb24pPT5gXG5cdFx0PGxhYmVsIGZvcj1cIiR7ZmllbGREYXRhLmZpZWxkX25hbWV9JHtsb2NhdGlvbn1cIiBjbGFzcz1cImZvcm0tbGFiZWwtJHtmaWVsZERhdGEudHlwZV9saXN0fVwiID5gICsgYCR7ZmllbGREYXRhLmZpZWxkX2xhYmVsfWAgKyAoZmllbGREYXRhLmZpZWxkX3JlcXVpcmVkID8gcmVxdWlyZWQgOiBvcHRpb25hbCkgKyAnPC9sYWJlbD4nXG4gICAgO1xuICAgIGNvbnN0IGlucHV0QnVpbGRlciA9IChsb2NhdGlvbik9PmA8aW5wdXQgdHlwZT0ke2ZpZWxkRGF0YS50eXBlX2xpc3R9IFxuXHRcdFx0bmFtZT0ke2ZpZWxkRGF0YS5maWVsZF9uYW1lfSBcblx0XHRcdGlkPVwiJHtmaWVsZERhdGEuZmllbGRfbmFtZX0ke2xvY2F0aW9ufVwiXG5cdFx0XHRwbGFjZWhvbGRlcj1cIiBcIlxuXHRcdFx0dmFsdWU9XCIke2ZpZWxkRGF0YS5maWVsZF9kZWZhdWx0fVwiIFxuXHRcdFx0Y2xhc3M9XCJpbnB1dC1ib3gtJHtmaWVsZERhdGEudHlwZV9saXN0fSBleHRyYS1maWVsZFwiYCArIChmaWVsZERhdGEuZmllbGRfcmVxdWlyZWQgPyAncmVxdWlyZWQnIDogJycpICsgJy8+J1xuICAgIDtcbiAgICBpZiAoZmllbGREYXRhLnR5cGVfbGlzdCA9PT0gJ3RleHQnKSB7XG4gICAgICAgIGVsZW1lbnRTdHJpbmcgPSBpbnB1dEJ1aWxkZXIobG9jYXRpb24xKSArIChmaWVsZERhdGEuZmllbGRfbGFiZWwgPyBsYWJlbEJ1aWxkZXIobG9jYXRpb24xKSA6ICcnKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRTdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50U3RyaW5nO1xufVxuZnVuY3Rpb24gY29sbGVjdEFkZGl0aW9uYWxGaWVsZERhdGEoZmllbGREYXRhLCBmaWVsZE9yZGVyKSB7XG4gICAgY29uc3QgZmllbGREYXRhQXJyYXkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9yZGVyTnVtYmVyIG9mIGZpZWxkT3JkZXIpe1xuICAgICAgICBpZiAoZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9lbmFibGUgJiYgJHFzKGAjJHtmaWVsZERhdGFbb3JkZXJOdW1iZXJdLmZpZWxkX25hbWV9LWV4aXN0aW5nYCk/LnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wb3JhcnlEYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGVtcG9yYXJ5RGF0YS5sYWJlbCA9IGZpZWxkRGF0YVtvcmRlck51bWJlcl0uZmllbGRfbGFiZWw7XG4gICAgICAgICAgICB0ZW1wb3JhcnlEYXRhLm5hbWUgPSBmaWVsZERhdGFbb3JkZXJOdW1iZXJdLmZpZWxkX25hbWU7XG4gICAgICAgICAgICB0ZW1wb3JhcnlEYXRhLnZhbHVlID0gJHFzKGAjJHtmaWVsZERhdGFbb3JkZXJOdW1iZXJdLmZpZWxkX25hbWV9LWV4aXN0aW5nYCk/LnZhbHVlO1xuICAgICAgICAgICAgZmllbGREYXRhQXJyYXkucHVzaCh0ZW1wb3JhcnlEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGREYXRhQXJyYXk7XG59XG5mdW5jdGlvbiBjaGVja1JlcXVpcmVkRmllbGRzKCkge1xuICAgIGlmIChFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpKSB7XG4gICAgICAgIHJldHVybiAkcXMoJyNhZGRpdGlvbmFsLWZpZWxkcy1leGlzdGluZycpPy5yZXBvcnRWYWxpZGl0eSgpID8/IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJHFzKCcjYWRkaXRpb25hbC1maWVsZHMtbmV3Jyk/LnJlcG9ydFZhbGlkaXR5KCkgPz8gZmFsc2U7XG59XG5mdW5jdGlvbiBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKGVycm9yLCBleHRyYSwgZmluZ2VycHJpbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBTZW50cnkud2l0aFNjb3BlKChzY29wZSk9PntcbiAgICAgICAgICAgIGlmIChleHRyYSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGV4dHJhKS5tYXAoKFtrZXksIHZhbHVlXSk9PnNjb3BlLnNldEV4dHJhKGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaW5nZXJwcmludCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldEZpbmdlcnByaW50KGZpbmdlcnByaW50KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoICB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU2VudHJ5LmNhcHR1cmVFeGNlcHRpb24oZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoICB7fVxufVxuZnVuY3Rpb24gZ2V0T3JkZXJTZXJ2aWNlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBsYWNlT3JkZXIsXG4gICAgICAgIHNldE9yZGVyU3RhdHVzLFxuICAgICAgICBzZXRQYXltZW50U3RhdHVzOiByZWNvcmRTdWNjZXNzZnVsUGF5bWVudCxcbiAgICAgICAgZGVwcmVjYXRlZDoge1xuICAgICAgICAgICAgcGxhY2VPcmRlcjogbGVnYWN5UGxhY2VPcmRlcixcbiAgICAgICAgICAgIHNldE9yZGVyU3RhdHVzOiBsZWdhY3lTZXRPcmRlclN0YXR1c1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGluaXRTaGlwcGluZyhtZXNzYWdlKSB7XG4gICAgaW5pdFNoaXBwaW5nRXZlbnRzKCk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRHZW5lcmFsQ29uZmlnKHtcbiAgICAgICAgLi4uc3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbCxcbiAgICAgICAgd2NMb2NhdGlvbkluZm9EYXRhOiBtZXNzYWdlLnBocERhdGEud2NfbG9jYXRpb25faW5mb1xuICAgIH0pKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudFNoaXBwaW5nQ29uZmlnKHtcbiAgICAgICAgc2hpcHBpbmdab25lczogTnVtYmVyLnBhcnNlSW50KG1lc3NhZ2UucGhwRGF0YS5udW1fc2hpcHBpbmdfem9uZXMpXG4gICAgfSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2V0T3JkZXJTdGF0dXMob3JkZXIsIHN0YXR1cywgb3B0aW9ucykge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgICBzZXNzaW9uOiB7XG4gICAgICAgICAgICBpZDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKVxuICAgICAgICB9LFxuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgaWQ6IG9yZGVyLm9yZGVySUQsXG4gICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UgPz8gJycsXG4gICAgICAgICAgICBwYXltZW50TWV0aG9kOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSxcbiAgICAgICAgICAgIHN0cmlwZUN1c3RvbWVySWQ6IFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpID09PSAnc3RyaXBlJyA/IG9wdGlvbnMuc3RyaXBlQ3VzdG9tZXJJZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHBheXBhbFRyYW5zYWN0aW9uSWQ6IFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpID09PSAncGF5cGFsJyA/IG9wdGlvbnMucGF5cGFsVHJhbnNhY3Rpb25JZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0cmlwZVRyYW5zYWN0aW9uSWQ6IFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpID09PSAnc3RyaXBlJyA/IG9wdGlvbnMuc3RyaXBlVHJhbnNhY3Rpb25JZCA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoYXdhaXQgZmV0Y2hIb3N0V2luZG93RGF0YSgncHAtc2V0LW9yZGVyLXN0YXR1cycsIHJlcXVlc3QpKSB7XG4gICAgICAgIHJldHVybiB3Y09yZGVyUmVjZWl2ZWRVUkxXaXRoUGFyYW1ldGVycyhHTE9CQUwucGhwRGF0YS53Y19vcmRlcl9yZWNlaXZlZF91cmwsIG9yZGVyLCBNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cbmFzeW5jIGZ1bmN0aW9uIHBsYWNlT3JkZXIoKSB7XG4gICAgY29uc3QgcmVxdWVzdE1lc3NhZ2UgPSB7XG4gICAgICAgIHNlc3Npb246IHtcbiAgICAgICAgICAgIGlkOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICBwYXltZW50TWV0aG9kOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSxcbiAgICAgICAgICAgIGJpbGxpbmdBZGRyZXNzOiBQZWFjaFBheUN1c3RvbWVyLmJpbGxpbmdBZGRyZXNzKCksXG4gICAgICAgICAgICBzaGlwcGluZ0FkZHJlc3M6IFBlYWNoUGF5Q3VzdG9tZXIuc2hpcHBpbmdBZGRyZXNzKCksXG4gICAgICAgICAgICBzaGlwcGluZ01ldGhvZHM6IFBlYWNoUGF5T3JkZXIuY29sbGVjdFNlbGVjdGVkU2hpcHBpbmcoKSxcbiAgICAgICAgICAgIGRlbGl2ZXJ5RGF0ZTogY29sbGVjdERlbGl2ZXJ5RGF0ZSgpLFxuICAgICAgICAgICAgbWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZDogJycsXG4gICAgICAgICAgICB2YXROdW06ICcnLFxuICAgICAgICAgICAgdmF0U2VsZlZlcmlmeTogJycsXG4gICAgICAgICAgICBjdXN0b21lck9yZGVyTm90ZXM6IGNvbGxlY3RPcmRlck5vdGVzKClcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHNob3VsZFNob3dNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkRmllbGQoKSkge1xuICAgICAgICByZXF1ZXN0TWVzc2FnZS5vcmRlci5tZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkID0gZ2V0TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZFZhbHVlKCk7XG4gICAgfVxuICAgIGlmIChHTE9CQUwucGhwRGF0YT8udmF0X3JlcXVpcmVkKSB7XG4gICAgICAgIHJlcXVlc3RNZXNzYWdlLm9yZGVyLnZhdE51bSA9IGdldFZhdE51bWJlcigpO1xuICAgIH1cbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LnZhdF9zZWxmX3ZlcmlmeSkge1xuICAgICAgICByZXF1ZXN0TWVzc2FnZS5vcmRlci52YXRTZWxmVmVyaWZ5ID0gZ2V0VmVyaWZ5KCk7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmZXRjaEhvc3RXaW5kb3dEYXRhKCdwcC1wbGFjZS1vcmRlcicsIHJlcXVlc3RNZXNzYWdlKTtcbn1cbmZ1bmN0aW9uIGxlZ2FjeVBsYWNlT3JkZXIoaXNQYXlwYWwpIHtcbiAgICBpZiAoR0xPQkFMPy5waHBEYXRhPy5wbHVnaW5fd29vY29tbWVyY2Vfb3JkZXJfZGVsaXZlcnlfYWN0aXZlICYmIGNoZWNrRGVsaXZlcnlEYXRlSXNFbXB0eSgpKSB7XG4gICAgICAgIHBlYWNocGF5QWxlcnQoJ1BsZWFzZSBzZWxlY3QgZGVsaXZlcnkgZGF0ZS4nKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAnZXZlbnQnOiAncGxhY2VPcmRlckRpcmVjdGx5JyxcbiAgICAgICAgJ3Nlc3Npb25JRCc6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgICdiaWxsaW5nQWRkcmVzcyc6IFBlYWNoUGF5Q3VzdG9tZXIuYmlsbGluZ0FkZHJlc3MoKSxcbiAgICAgICAgJ3NoaXBwaW5nQWRkcmVzcyc6IFBlYWNoUGF5Q3VzdG9tZXIuc2hpcHBpbmdBZGRyZXNzKCksXG4gICAgICAgICdzaGlwcGluZ19tZXRob2QnOiBQZWFjaFBheU9yZGVyLmNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nKCksXG4gICAgICAgICdkZWxpdmVyeURhdGUnOiBjb2xsZWN0RGVsaXZlcnlEYXRlKCksXG4gICAgICAgICdpc1Byb2R1Y3RQYWdlQnV0dG9uJzogRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdwcm9kdWN0JyxcbiAgICAgICAgJ2lzUGF5cGFsJzogaXNQYXlwYWwgPz8gZmFsc2UsXG4gICAgICAgICdtZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkJzogJycsXG4gICAgICAgICd2YXROdW0nOiAnJyxcbiAgICAgICAgJ3NlbGZWZXJpZnknOiAnJyxcbiAgICAgICAgJ2N1c3RvbWVyT3JkZXJOb3Rlcyc6IGNvbGxlY3RPcmRlck5vdGVzKCksXG4gICAgICAgICdhZGRpdGlvbmFsRmllbGRzJzogRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLkFERElUSU9OQUxfRklFTERTKSA/IGNvbGxlY3RBZGRpdGlvbmFsRmllbGREYXRhKEdMT0JBTC5waHBEYXRhPy5hZGRpdGlvbmFsX2ZpZWxkcyA/PyBbXSwgR0xPQkFMLnBocERhdGE/LmFkZGl0aW9uYWxfZmllbGRzX29yZGVyID8/IFtdKSA6IFtdLFxuICAgICAgICAndXBzZWxsX2l0ZW1zJzogR0xPQkFMLmxpbmtlZFByb2R1Y3RzSWRzXG4gICAgfTtcbiAgICBpZiAoc2hvdWxkU2hvd01lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRGaWVsZCgpKSB7XG4gICAgICAgIGlmICghdmFsaWRhdGVNZXJjaGFudEN1c3RvbWVyUGFzc3dvcmRGaWVsZCgpKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UubWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZCA9IGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpO1xuICAgIH1cbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LnZhdF9yZXF1aXJlZCkge1xuICAgICAgICBtZXNzYWdlLnZhdE51bSA9IGdldFZhdE51bWJlcigpO1xuICAgIH1cbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LnZhdF9zZWxmX3ZlcmlmeSkge1xuICAgICAgICBtZXNzYWdlLnNlbGZWZXJpZnkgPSBnZXRWZXJpZnkoKTtcbiAgICB9XG4gICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZShtZXNzYWdlLCAnKicpO1xufVxuZnVuY3Rpb24gd2NPcmRlclJlY2VpdmVkVVJMV2l0aFBhcmFtZXRlcnMod2NPcmRlclJlY2VpdmVkVVJMLCBvcmRlciwgZG9tYWluKSB7XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IHMgPSBkb21haW4gPT09ICdsb2NhbGhvc3QnID8gJycgOiAncyc7XG4gICAgY29uc3QgcG9ydCA9IGRvbWFpbiA9PT0gJ2xvY2FsaG9zdCcgPyAnOjgwMDAnIDogJyc7XG4gICAgY29uc3QgdXJsID0gd2NPcmRlclJlY2VpdmVkVVJMID8gd2NPcmRlclJlY2VpdmVkVVJMIDogYGh0dHAke3N9Oi8vJHtkb21haW59JHtwb3J0fS9jaGVja291dC9vcmRlci1yZWNlaXZlZGA7XG4gICAgY29uc3Qgb3JkZXJJRCA9IG9yZGVyLmlkIHx8IG9yZGVyLmRldGFpbHMuaWQ7XG4gICAgY29uc3Qga2V5ID0gb3JkZXIub3JkZXJfa2V5IHx8IG9yZGVyLmRldGFpbHMub3JkZXJfa2V5O1xuICAgIGlmIChHTE9CQUwucGhwRGF0YS5wbHVnaW5fd29vX3RoYW5rX3lvdV9wYWdlX25leHRtb3ZlX2xpdGVfYWN0aXZlIHx8IGRvbWFpbiA9PT0gJ3ViZXJicmFjZWxldHMuY29tJykge1xuICAgICAgICByZXR1cm4gYCR7dXJsLnJlcGxhY2UoJy9jaGVja291dCcsICcnKX0vdGhhbmsteW91Lz9vcmRlcl9pZD0ke29yZGVySUR9JmtleT0ke2tleX1gO1xuICAgIH1cbiAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkgPT09ICdyYXBpZGZpcmVzdXBwbGllcy5jby51aycpIHtcbiAgICAgICAgcmV0dXJuIGBodHRwJHtzfTovLyR7ZG9tYWlufSR7cG9ydH0vdGhhbmsteW91LWZvci1wdXJjaGFzaW5nLWZyb20tdXMvYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3VybH0vJHtvcmRlcklEfS8/a2V5PSR7a2V5fWA7XG59XG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKGluaXRpYWwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHJlcXVlc3REYXRhID0gaW5pdGlhbCA/IHtcbiAgICAgICAgaW5pdGlhbDogdHJ1ZVxuICAgIH0gOiB7XG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICBzZWxlY3RlZF9zaGlwcGluZzogUGVhY2hQYXlPcmRlci5jb2xsZWN0U2VsZWN0ZWRTaGlwcGluZygpLFxuICAgICAgICAgICAgc2hpcHBpbmdfbG9jYXRpb246IFBlYWNoUGF5Q3VzdG9tZXIuc2hvcnRBZGRyZXNzKClcbiAgICAgICAgfVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEhvc3RXaW5kb3dEYXRhKCdwcC1jYWxjdWxhdGUtY2FydCcsIHJlcXVlc3REYXRhKTtcbiAgICAgICAgY29uc3VtZUNhcnRDYWxjdWxhdGlvblJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoYENhcnQgY2FsY3VsYXRpb24gVjIgZmFpbGVkIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTaGlwcGluZ0V2ZW50cygpIHtcbiAgICBzdG9yZS5zdWJzY3JpYmUocmVuZGVyU2hpcHBpbmcpO1xuICAgIG9uV2luZG93TWVzc2FnZSgndmFsaWRhdGVBZGRyZXNzU3VjY2VzcycsIGFzeW5jIChfKT0+e1xuICAgICAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRpb24odHJ1ZSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICBtb2RhbFBhZ2VUeXBlOiAncGF5bWVudCdcbiAgICAgICAgfSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgIH0pO1xuICAgICRxcygnI3BwLWluZm8tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpPT57XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBpZiAoIXZhbGlkYXRlQ2FydEl0ZW1zV2l0aEN1c3RvbWVyKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCksIGZhbHNlKSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIGV2ZW50OiAndmFsaWRhdGVBZGRyZXNzJyxcbiAgICAgICAgICAgIGJpbGxpbmdBZGRyZXNzOiBQZWFjaFBheUN1c3RvbWVyLmJpbGxpbmdBZGRyZXNzKClcbiAgICAgICAgfSwgJyonKTtcbiAgICB9KTtcbiAgICAkcXMoJyNwcC1zaGlwcGluZy1vcHRpb25zLWV4aXN0aW5nJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZVNoaXBwaW5nU2VsZWN0aW9uRXZlbnQpO1xuICAgICRxcygnI3BwLXNoaXBwaW5nLW9wdGlvbnMnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlU2hpcHBpbmdTZWxlY3Rpb25FdmVudCk7XG59XG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUFkZHJlc3MoKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLXZhbGlkYXRlLWJpbGxpbmctYWRkcmVzcycsIFBlYWNoUGF5Q3VzdG9tZXIuYmlsbGluZ0FkZHJlc3MoKSk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTaGlwcGluZ1NlbGVjdGlvbkV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgJHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCAkdGFyZ2V0Q29udGFpbmVyID0gJHRhcmdldC5jbG9zZXN0KCdbZGF0YS1jYXJ0LWtleV0nKTtcbiAgICBjb25zdCBzaGlwcGluZ01ldGhvZElkID0gJHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBjYXJ0S2V5ID0gJHRhcmdldENvbnRhaW5lci5kYXRhc2V0LmNhcnRLZXk7XG4gICAgY29uc3QgcGFja2FnZUtleSA9ICR0YXJnZXRDb250YWluZXIuZGF0YXNldC5wYWNrYWdlS2V5O1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUNhcnRQYWNrYWdlU2hpcHBpbmdNZXRob2Qoe1xuICAgICAgICBjYXJ0S2V5OiBjYXJ0S2V5ID8/ICcnLFxuICAgICAgICBzaGlwcGluZ1BhY2thZ2VLZXk6IHBhY2thZ2VLZXkgPz8gJycsXG4gICAgICAgIHBhY2thZ2VNZXRob2RJZDogc2hpcHBpbmdNZXRob2RJZCA/PyAnJ1xuICAgIH0pKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNoaXBwaW5nKCkge1xuICAgIHJlbmRlck9yZGVySGVhZGVyKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpO1xuICAgIGlmIChjYXJ0SXNWaXJ0dWFsKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpKSB7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWRlbGl2ZXJ5Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNleGlzdGluZy1jaGVja291dC1kZWxpdmVyeScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlbmRlckNhcnRTaGlwcGluZ09wdGlvbnMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHMpO1xuICAgIH1cbiAgICByZW5kZXJTaGlwcGluZ1NlY3Rpb24oKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck9yZGVySGVhZGVyKGNhcnQpIHtcbiAgICBpZiAoY2FydElzVmlydHVhbChjYXJ0KSkge1xuICAgICAgICAkcXMoJy5zaGlwcGluZy1hZGRyZXNzLWhlYWRlcicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnLmJpbGxpbmctYWRkcmVzcy1oZWFkZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLmhpZGUtZm9yLXZpcnR1YWwtY2FydHMnKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDEgb2YgJHFzQWxsKCcuc2hvdy1mb3ItdmlydHVhbC1jYXJ0cycpKXtcbiAgICAgICAgICAgICRlbGVtZW50MS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5zaGlwcGluZy1hZGRyZXNzLWhlYWRlcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnLmJpbGxpbmctYWRkcmVzcy1oZWFkZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLmhpZGUtZm9yLXZpcnR1YWwtY2FydHMnKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDIgb2YgJHFzQWxsKCcuc2hvdy1mb3ItdmlydHVhbC1jYXJ0cycpKXtcbiAgICAgICAgICAgICRlbGVtZW50Mi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDYXJ0U2hpcHBpbmdPcHRpb25zKGNhbGN1bGF0ZWRDYXJ0cykge1xuICAgIGxldCBzaGlwcGluZ0hUTUwgPSAnJztcbiAgICBmb3IgKGNvbnN0IFtjYXJ0S2V5LCBjYXJ0Q2FsY3VsYXRpb25dIG9mIE9iamVjdC5lbnRyaWVzKGNhbGN1bGF0ZWRDYXJ0cykpe1xuICAgICAgICBpZiAoIWNhcnRDYWxjdWxhdGlvbikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbc2hpcHBpbmdQYWNrYWdlS2V5LCBzaGlwcGluZ1BhY2thZ2VdIG9mIE9iamVjdC5lbnRyaWVzKGNhcnRDYWxjdWxhdGlvbi5wYWNrYWdlX3JlY29yZCkpe1xuICAgICAgICAgICAgaWYgKCFzaGlwcGluZ1BhY2thZ2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoaXBwaW5nSFRNTCArPSByZW5kZXJTaGlwcGluZ1BhY2thZ2VPcHRpb25zKGNhcnRLZXksIHNoaXBwaW5nUGFja2FnZUtleSwgc2hpcHBpbmdQYWNrYWdlLCBjYXJ0Q2FsY3VsYXRpb24uY2FydF9tZXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAkcXMoJyNwcC1zaGlwcGluZy1vcHRpb25zJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gc2hpcHBpbmdIVE1MXG4gICAgKTtcbiAgICAkcXMoJyNwcC1zaGlwcGluZy1vcHRpb25zLWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gc2hpcHBpbmdIVE1MXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNoaXBwaW5nUGFja2FnZU9wdGlvbnMoY2FydEtleSwgc2hpcHBpbmdQYWNrYWdlS2V5LCBzaGlwcGluZ1BhY2thZ2UsIGNhcnRNZXRhKSB7XG4gICAgY29uc3QgcGFja2FnZU1ldGhvZEtleSA9IGNhcnRLZXkgPT09ICcwJyA/IHNoaXBwaW5nUGFja2FnZUtleSA6IGAke2NhcnRLZXl9XyR7c2hpcHBpbmdQYWNrYWdlS2V5fWA7XG4gICAgY29uc3QgbWV0aG9kT3B0aW9uQnVpbGRlciA9IChtZXRob2RLZXksIG1ldGhvZCwgc2VsZWN0ZWQpPT5gXG48bGFiZWwgZm9yPVwic2hpcHBpbmdfbWV0aG9kXyR7cGFja2FnZU1ldGhvZEtleX1fJHttZXRob2RLZXkucmVwbGFjZSgvOi9nLCAnJyl9XCIgc3R5bGU9XCJtYXJnaW46IDAgMCAzcHggMDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IHJvdzsgY3Vyc29yOiBwb2ludGVyO1wiPlxuXHQ8aW5wdXQgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogdG9wO1wiIGlkPVwic2hpcHBpbmdfbWV0aG9kXyR7cGFja2FnZU1ldGhvZEtleX1fJHttZXRob2RLZXkucmVwbGFjZSgvOi9nLCAnJyl9XCIgbmFtZT1cInNoaXBwaW5nX21ldGhvZFske3BhY2thZ2VNZXRob2RLZXl9XVwiIHZhbHVlPVwiJHttZXRob2RLZXl9XCIgdHlwZT1cInJhZGlvXCIgJHtzZWxlY3RlZCA/ICdjaGVja2VkJyA6ICcnfSByZXF1aXJlZD5cblx0PHNwYW4gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZsZXgtZ3JvdzogMTtcIj4ke21ldGhvZC50aXRsZX08L3NwYW4+XG5cdDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBtaW4td2lkdGg6IDMwJTsgdGV4dC1hbGlnbjogcmlnaHQ7XCIgY2xhc3M9XCJzaGlwcGluZy1wcmljZVwiPiR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcobWV0aG9kLnRvdGFsKX08c3BhbiBjbGFzcz1cIm11dGVkXCI+JHtidWlsZFN1YnNjcmlwdGlvblByaWNlTWV0YURhdGEoY2FydE1ldGEpfTwvc3Bhbj48L3NwYW4+XG48L2xhYmVsPmBcbiAgICA7XG4gICAgY29uc3QgcGFja2FnZU5hbWVIVE1MID0gYDxoNCBjbGFzcz1cInNoaXBwaW5nLWhlYWRlciBjb2xvci1jaGFuZ2UtdGV4dFwiPiR7c2hpcHBpbmdQYWNrYWdlLnBhY2thZ2VfbmFtZSA/PyBnZXRMb2NhbGVUZXh0KCdzaGlwcGluZycpfTwvaDQ+YDtcbiAgICBjb25zdCBwYWNrYWdlTWV0aG9kT3B0aW9uc0hUTUwgPSBPYmplY3QuZW50cmllcyhzaGlwcGluZ1BhY2thZ2UubWV0aG9kcykubWFwKChbc2hpcHBpbmdNZXRob2RLZXksIHNoaXBwaW5nTWV0aG9kXSk9PnNoaXBwaW5nTWV0aG9kID8gbWV0aG9kT3B0aW9uQnVpbGRlcihzaGlwcGluZ01ldGhvZEtleSwgc2hpcHBpbmdNZXRob2QsIHNoaXBwaW5nUGFja2FnZS5zZWxlY3RlZF9tZXRob2QgPT09IHNoaXBwaW5nTWV0aG9kS2V5KSA6ICcnXG4gICAgKS5qb2luKCcnKTtcbiAgICByZXR1cm4gYFxuPGRpdiBkYXRhLWNhcnQta2V5PVwiJHtjYXJ0S2V5fVwiIGRhdGEtcGFja2FnZS1rZXk9XCIke3NoaXBwaW5nUGFja2FnZUtleX1cIj5cblx0JHtwYWNrYWdlTmFtZUhUTUx9XG5cdCR7cGFja2FnZU1ldGhvZE9wdGlvbnNIVE1MfVxuPC9kaXY+YDtcbn1cbmZ1bmN0aW9uIHNoaXBwaW5nSXNWYWxpZCgpIHtcbiAgICBpZiAoY2FydElzVmlydHVhbChEZWZhdWx0Q2FydC5jb250ZW50cygpKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5zaGlwcGluZy5zaGlwcGluZ1pvbmVzKCkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghQ2FydHMuYW55U2hpcHBpbmdNZXRob2RzQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGNvbnN1bWVDYXJ0Q2FsY3VsYXRpb25SZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldE9yZGVyRXJyb3IoJycpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ2FydENhbGN1bGF0aW9uKHJlc3BvbnNlLmRhdGEuY2FydF9jYWxjdWxhdGlvbl9yZWNvcmQpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ3VzdG9tZXJTaGlwcGluZ1Nob3J0QWRkcmVzcyhyZXNwb25zZS5kYXRhLnNoaXBwaW5nX2xvY2F0aW9uKSk7XG4gICAgICAgIGlmIChEZWZhdWx0Q2FydC5jb250ZW50cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0T3JkZXJFcnJvcihgPHNwYW4+JHtnZXRMb2NhbGVUZXh0KCdDYXJ0IGlzIGVtcHR5Jyl9PC9zcGFuPmApKTtcbiAgICAgICAgfSBlbHNlIGlmICghc2hpcHBpbmdJc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldE9yZGVyRXJyb3IoYDxzcGFuPiR7Z2V0TG9jYWxlVGV4dCgnU29ycnksIHRoaXMgc3RvcmUgZG9lcyBub3Qgc2hpcCB0byB5b3VyIGxvY2F0aW9uLicpfTwvc3Bhbj5gKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkge1xuICAgIHJldHVybiBHTE9CQUw/LnBocERhdGE/LnBsdWdpbl93b29jb21tZXJjZV9wcm9kdWN0X2J1bmRsZXNfYWN0aXZlID09PSAnMScgJiYgIShFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ2NhcnQnKTtcbn1cbmZ1bmN0aW9uIHJlY29yZFN1Y2Nlc3NmdWxQYXltZW50KHNlc3Npb25JRCwgY2xlYXJTZXNzaW9uKSB7XG4gICAgcmV0dXJuIGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ2FwaS92MS9zZXNzaW9uL3BheS9yZWNvcmQnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNlc3Npb25JRCxcbiAgICAgICAgICAgIGNsZWFyU2Vzc2lvbjogY2xlYXJTZXNzaW9uIHx8IGZhbHNlXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5mdW5jdGlvbiBsZWdhY3lTZXRPcmRlclN0YXR1cyhvcmRlciwgeyBzdGF0dXMgLCBtZXNzYWdlICwgcGF5bWVudFR5cGUgLCB0cmFuc2FjdGlvbklEICB9KSB7XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogJ3NldE9yZGVyU3RhdHVzJyxcbiAgICAgICAgb3JkZXJJRDogb3JkZXIub3JkZXJJRCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBwYXltZW50VHlwZSxcbiAgICAgICAgdHJhbnNhY3Rpb25JRCxcbiAgICAgICAgY3VzdG9tZXJTdHJpcGVJZDogUGVhY2hQYXlDdXN0b21lci5zdHJpcGVJZCgpLFxuICAgICAgICByZWRpcmVjdFVSTDogd2NPcmRlclJlY2VpdmVkVVJMV2l0aFBhcmFtZXRlcnMoR0xPQkFMLnBocERhdGEud2Nfb3JkZXJfcmVjZWl2ZWRfdXJsLCBvcmRlciwgTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkpXG4gICAgfSwgJyonKTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNoaXBwaW5nU2VjdGlvbigpIHtcbiAgICBpZiAoUGVhY2hQYXlPcmRlci5jdXN0b21lckFkZHJlc3NWYWxpZGF0ZWQoKSkge1xuICAgICAgICAkcXMoJyNwcC1zaGlwcGluZy1wYXltZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1zaGlwcGluZy1wYXltZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0Q3VzdG9tZXIobWVzc2FnZSkge1xuICAgIGluaXRDdXN0b21lckV2ZW50cygpO1xuICAgIHJlbmRlckNvdW50cnlBbmRTdGF0ZUxpc3QobWVzc2FnZS5waHBEYXRhLndjX2xvY2F0aW9uX2luZm8pO1xufVxuZnVuY3Rpb24gaW5pdEN1c3RvbWVyRXZlbnRzKCkge1xuICAgICRxcygnI2NvdW50cnknKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVuZGVyQ29ycmVjdFByb3ZpbmNlRmllbGQpO1xuICAgICRxcygnI3BwLWluZm8tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+c2V0VGltZW91dChzeW5jQ3VzdG9tZXJGaWVsZENoYW5nZXMpXG4gICAgKTtcbiAgICBsZXQgcHJldmlvdXNDdXN0b21lckRhdGEgPSAnJztcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgY29uc3QgY3VzdG9tZXIgPSBQZWFjaFBheUN1c3RvbWVyLmRhdGEoKTtcbiAgICAgICAgaWYgKEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpID09PSAnaW5mbycpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbWVyRGF0YSA9IEpTT04uc3RyaW5naWZ5KGN1c3RvbWVyKTtcbiAgICAgICAgICAgIGlmIChjdXN0b21lckRhdGEgIT09IHByZXZpb3VzQ3VzdG9tZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNDdXN0b21lckRhdGEgPSBjdXN0b21lckRhdGE7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ3VzdG9tZXJGaWVsZHMoY3VzdG9tZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgICAgICByZW5kZXJDdXN0b21lckhlYWRlcihjdXN0b21lciwgRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSk7XG4gICAgICAgICAgICBpZiAoRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJlbmRlckV4aXN0aW5nQ3VzdG9tZXJDaGVja291dChjdXN0b21lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHN5bmNDdXN0b21lckZpZWxkQ2hhbmdlcygpIHtcbiAgICBjb25zdCAkZm9ybSA9ICRxcygnI3BwLWluZm8tZm9ybScpO1xuICAgIGlmICghJGZvcm0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgkZm9ybSk7XG4gICAgY29uc3QgcHJldmlvdXNBZGRyZXNzSW5mbyA9IFBlYWNoUGF5Q3VzdG9tZXIuc2hvcnRBZGRyZXNzKCk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ3VzdG9tZXIoe1xuICAgICAgICBlbWFpbDogZm9ybUVudHJ5KGZvcm1EYXRhLCAnZW1haWwnKSxcbiAgICAgICAgbmFtZV9maXJzdDogZm9ybUVudHJ5KGZvcm1EYXRhLCAnbmFtZV9maXJzdCcpLFxuICAgICAgICBuYW1lX2xhc3Q6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ25hbWVfbGFzdCcpLFxuICAgICAgICBhZGRyZXNzMTogZm9ybUVudHJ5KGZvcm1EYXRhLCAnYWRkcmVzczEnKSxcbiAgICAgICAgYWRkcmVzczI6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2FkZHJlc3MyJyksXG4gICAgICAgIGNpdHk6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2NpdHknKSxcbiAgICAgICAgc3RhdGU6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ3N0YXRlJyksXG4gICAgICAgIHBvc3RhbDogZm9ybUVudHJ5KGZvcm1EYXRhLCAncG9zdGFsJyksXG4gICAgICAgIGNvdW50cnk6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2NvdW50cnknKSxcbiAgICAgICAgcGhvbmU6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ3Bob25lJylcbiAgICB9KSk7XG4gICAgY29uc3QgY3VycmVudEFkZHJlc3NJbmZvID0gUGVhY2hQYXlDdXN0b21lci5zaG9ydEFkZHJlc3MoKTtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkocHJldmlvdXNBZGRyZXNzSW5mbykgIT09IEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBZGRyZXNzSW5mbykgJiYgY3VycmVudEFkZHJlc3NJbmZvLmNvdW50cnkgIT09ICcnKSB7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gbG9hZEN1c3RvbWVyKCkge1xuICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgZ2V0Q3VzdG9tZXIoKTtcbiAgICBpZiAoY3VzdG9tZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JbmZvID0gTWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwud2NMb2NhdGlvbkluZm9EYXRhKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgICAgIC4uLlBlYWNoUGF5Q3VzdG9tZXIuZGF0YSgpLFxuICAgICAgICAgICAgY291bnRyeTogKGxvY2F0aW9uSW5mbz8uY3VzdG9tZXJfZGVmYXVsdF9jb3VudHJ5ID8/IGxvY2F0aW9uSW5mbz8uc3RvcmVfY291bnRyeSkgPz8gJydcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKGN1c3RvbWVyKSk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICBjdXN0b21lckV4aXN0czogdHJ1ZSxcbiAgICAgICAgbW9kYWxQYWdlVHlwZTogJ3BheW1lbnQnXG4gICAgfSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2F2ZUN1c3RvbWVyVG9Ccm93c2VyKGN1c3RvbWVySUQsIGJyYW5kLCBsYXN0NCwgcGF5bWVudE9wdGlvbikge1xuICAgIGNvbnN0IHsgZmlyc3ROYW1lICwgbGFzdE5hbWUgLCBlbWFpbCAsIHBob25lICwgYWRkcmVzczEgLCBhZGRyZXNzMiAsIHBvc3RhbCAsIGNpdHkgLCBzdGF0ZSAsIGNvdW50cnkgIH0gPSBQZWFjaFBheUN1c3RvbWVyO1xuICAgIGNvbnN0IGN1c3RvbWVyID0ge1xuICAgICAgICAnbmFtZV9maXJzdCc6IGZpcnN0TmFtZSgpLFxuICAgICAgICAnbmFtZV9sYXN0JzogbGFzdE5hbWUoKSxcbiAgICAgICAgJ2VtYWlsJzogZW1haWwoKSxcbiAgICAgICAgJ3Bob25lJzogcGhvbmUoKSxcbiAgICAgICAgJ2FkZHJlc3MxJzogYWRkcmVzczEoKSxcbiAgICAgICAgJ2FkZHJlc3MyJzogYWRkcmVzczIoKSxcbiAgICAgICAgJ3Bvc3RhbCc6IHBvc3RhbCgpLFxuICAgICAgICAnY2l0eSc6IGNpdHkoKSxcbiAgICAgICAgJ3N0YXRlJzogc3RhdGUoKSxcbiAgICAgICAgJ2NvdW50cnknOiBjb3VudHJ5KCksXG4gICAgICAgICdzdHJpcGVfY3VzdG9tZXJfaWQnOiBjdXN0b21lcklELFxuICAgICAgICAnY2FyZCc6IHtcbiAgICAgICAgICAgIGJyYW5kLFxuICAgICAgICAgICAgbGFzdDRcbiAgICAgICAgfSxcbiAgICAgICAgJ3BheW1lbnRfb3B0aW9uJzogcGF5bWVudE9wdGlvblxuICAgIH07XG4gICAgYXdhaXQgc2V0Q3VzdG9tZXIoY3VzdG9tZXIpO1xuICAgIHJldHVybiBjdXN0b21lcjtcbn1cbmZ1bmN0aW9uIGRpc3BsYXlDQ0xvZ28oY3VzdG9tZXIpIHtcbiAgICBsZXQgY2NCcmFuZCA9ICcnO1xuICAgIHN3aXRjaChjdXN0b21lci5jYXJkPy5icmFuZCl7XG4gICAgICAgIGNhc2UgJ1Zpc2EnOlxuICAgICAgICAgICAgY2NCcmFuZCA9ICd2aXNhJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNYXN0ZXJDYXJkJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnbWFzdGVyY2FyZCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQW1lcmljYW4gRXhwcmVzcyc6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ2FtZXgnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Rpc2NvdmVyJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnZGlzY292ZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RpbmVycyBDbHViJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnZGluZXJzJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdKQ0InOlxuICAgICAgICAgICAgY2NCcmFuZCA9ICdqY2InO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1VuaW9uUGF5JzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAndW5pb25wYXknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjY0JyYW5kID0gJyc7XG4gICAgfVxuICAgICRxcygnI2NjLScgKyBjY0JyYW5kKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuZnVuY3Rpb24gcmVuZGVyRXhpc3RpbmdDdXN0b21lckNoZWNrb3V0KGN1c3RvbWVyKSB7XG4gICAgaWYgKGN1c3RvbWVyLnBheW1lbnRfb3B0aW9uID09PSAncGF5cGFsJykge1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1leGlzdGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGlmIChHTE9CQUwucGhwRGF0YT8ucGF5cGFsID09PSAnMScpIHtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgYWRqdXN0T3JkZXJTdW1tYXJ5SGVpZ2h0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtY2FyZC1udW1iZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtbm8tY2FyZCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1leGlzdGluZycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGFkanVzdE9yZGVyU3VtbWFyeUhlaWdodChmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ29ycmVjdFByb3ZpbmNlRmllbGQoKSB7XG4gICAgY29uc3QgbWVyY2hhbnRTaGlwcGluZyA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLndjTG9jYXRpb25JbmZvRGF0YSgpO1xuICAgIGlmIChtZXJjaGFudFNoaXBwaW5nKSB7XG4gICAgICAgIGNvbnN0ICRjb3VudHJpZXMgPSAkcXMoJyNjb3VudHJ5Jyk7XG4gICAgICAgIGlmICghJGNvdW50cmllcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb24gPSBzdGF0ZVByb3ZpbmNlT3JDb3VudHkoJGNvdW50cmllcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHN0YXRlT3JQcm92aW5jZU9wdGlvbnMgPSBtZXJjaGFudFNoaXBwaW5nLmFsbG93ZWRfc3RhdGVzX29yX3Byb3ZpbmNlc1skY291bnRyaWVzLnZhbHVlID8/ICcnXSA/PyB7fTtcbiAgICAgICAgaWYgKHN0YXRlT3JQcm92aW5jZU9wdGlvbnMgJiYgT2JqZWN0LmtleXMoc3RhdGVPclByb3ZpbmNlT3B0aW9ucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QgPSAkcXMoJyNkeW5hbWljLXN0YXRlcycpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QuaW5uZXJIVE1MID0gcmVuZGVyRHJvcERvd25MaXN0KHN0YXRlT3JQcm92aW5jZU9wdGlvbnMsIGRlZmF1bHRPcHRpb24pO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3Quc2V0QXR0cmlidXRlKCduYW1lJywgJ3N0YXRlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRPcHRpb24gPT09IGdldExvY2FsZVRleHQoJ1NlbGVjdCBhIFByb3ZpbmNlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZ2V0TG9jYWxlVGV4dCgncHJvdmluY2UnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdE9wdGlvbiA9PT0gZ2V0TG9jYWxlVGV4dCgnU2VsZWN0IGEgU3RhdGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cImR5bmFtaWMtc3RhdGVzXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdzdGF0ZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZGVmYXVsdE9wdGlvblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwiZHluYW1pYy1zdGF0ZXNcIl0nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgJHN0YXRlT3JQcm92aW5jZXNUZXh0ID0gJHFzKCcjcHJvdmluY2UnKTtcbiAgICAgICAgICAgIGlmICgkc3RhdGVPclByb3ZpbmNlc1RleHQpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb2ZmJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0ICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0ID0gJHFzKCcjZHluYW1pYy1zdGF0ZXMnKTtcbiAgICAgICAgICAgIGlmICgkc3RhdGVPclByb3ZpbmNlc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb2ZmJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCAkc3RhdGVPclByb3ZpbmNlc1RleHQgPSAkcXMoJyNwcm92aW5jZScpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzVGV4dCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnc3RhdGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbiA9PT0gZ2V0TG9jYWxlVGV4dCgnU2VsZWN0IGEgUHJvdmluY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdwcm92aW5jZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0T3B0aW9uID09PSBnZXRMb2NhbGVUZXh0KCdTZWxlY3QgYSBTdGF0ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwicHJvdmluY2VcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ3N0YXRlJylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBkZWZhdWx0T3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJwcm92aW5jZVwiXScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDb3VudHJ5QW5kU3RhdGVMaXN0KG1lcmNoYW50TG9jYXRpb25JbmZvKSB7XG4gICAgaWYgKCFtZXJjaGFudExvY2F0aW9uSW5mbykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IE5vIFdDIExvY2F0aW9uIGluZm8uIFBsZWFzZSB1cGRhdGUgdGhlIFBlYWNoUGF5IFBsdWdpbi4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCAkY291bnRyaWVzID0gJHFzKCcjY291bnRyeScpO1xuICAgIGlmICghJGNvdW50cmllcykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdEFDb3VudHJ5ID0gZ2V0TG9jYWxlVGV4dCgnY291bnRyeScpO1xuICAgIGNvbnN0IGNvdW50cnlPcHRpb25zID0gbWVyY2hhbnRMb2NhdGlvbkluZm8uYWxsb3dlZF9jb3VudHJpZXM7XG4gICAgJGNvdW50cmllcy5pbm5lckhUTUwgPSByZW5kZXJEcm9wRG93bkxpc3QoY291bnRyeU9wdGlvbnMsIHNlbGVjdEFDb3VudHJ5KTtcbiAgICBzZWxlY3REcm9wZG93bigkY291bnRyaWVzLCBtZXJjaGFudExvY2F0aW9uSW5mby5jdXN0b21lcl9kZWZhdWx0X2NvdW50cnkgfHwgbWVyY2hhbnRMb2NhdGlvbkluZm8uc3RvcmVfY291bnRyeSk7XG4gICAgaWYgKCRjb3VudHJpZXMub3B0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgJGNvdW50cmllcy5zZWxlY3RlZEluZGV4ID0gMTtcbiAgICB9XG4gICAgJGNvdW50cmllcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xufVxuZnVuY3Rpb24gcmVuZGVyQ3VzdG9tZXJGaWVsZHMoY3VzdG9tZXIpIHtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cIm5hbWVfZmlyc3RcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLm5hbWVfZmlyc3RcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwibmFtZV9sYXN0XCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5uYW1lX2xhc3RcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwiZW1haWxcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLmVtYWlsXG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cInBob25lXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5waG9uZVxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJhZGRyZXNzMVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuYWRkcmVzczFcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwiYWRkcmVzczJcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLmFkZHJlc3MyXG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cInBvc3RhbFwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIucG9zdGFsXG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cImNpdHlcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLmNpdHlcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwiY291bnRyeVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuY291bnRyeVxuICAgICk7XG4gICAgcmVuZGVyQ29ycmVjdFByb3ZpbmNlRmllbGQoKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gW25hbWU9XCJzdGF0ZVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuc3RhdGVcbiAgICApO1xufVxuZnVuY3Rpb24gcmVuZGVyQ3VzdG9tZXJIZWFkZXIoY3VzdG9tZXIsIGV4aXN0aW5nQ3VzdG9tZXIpIHtcbiAgICBpZiAoZXhpc3RpbmdDdXN0b21lcikge1xuICAgICAgICAkcXMoJyNleGlzdGluZy1lbWFpbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIuZW1haWxcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctbmFtZV9maXJzdCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIubmFtZV9maXJzdFxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1uYW1lX2xhc3QnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLm5hbWVfbGFzdFxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1hZGRyZXNzMScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIuYWRkcmVzczFcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctYWRkcmVzczInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLmFkZHJlc3MyID8gJyAnICsgY3VzdG9tZXIuYWRkcmVzczIgOiAnJ1xuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1jaXR5JywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5jaXR5XG4gICAgICAgICk7XG4gICAgICAgIGlmIChjdXN0b21lci5jb3VudHJ5ID09PSAnSlAnKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsU3RhdGVOYW1lID0gR0xPQkFMLnBocERhdGE/LndjX2xvY2F0aW9uX2luZm8/LmFsbG93ZWRfc3RhdGVzX29yX3Byb3ZpbmNlcy5KUFtjdXN0b21lci5zdGF0ZV07XG4gICAgICAgICAgICAkcXMoJyNleGlzdGluZy1zdGF0ZScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZnVsbFN0YXRlTmFtZSA/PyAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLXN0YXRlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5zdGF0ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJyNleGlzdGluZy1jb3VudHJ5JywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRDb3VudHJ5TmFtZShjdXN0b21lci5jb3VudHJ5KVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1wb3N0YWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLnBvc3RhbFxuICAgICAgICApO1xuICAgICAgICBkaXNwbGF5Q0NMb2dvKGN1c3RvbWVyKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctbGFzdDQnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyPy5jYXJkPy5sYXN0NCA/PyAnJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBmdWxsQWRkcmVzcyA9ICcnO1xuICAgICAgICBpZiAoY3VzdG9tZXIuY291bnRyeSA9PT0gJ0pQJykge1xuICAgICAgICAgICAgY29uc3QgZnVsbFN0YXRlID0gR0xPQkFMLnBocERhdGE/LndjX2xvY2F0aW9uX2luZm8/LmFsbG93ZWRfc3RhdGVzX29yX3Byb3ZpbmNlcy5KUFtjdXN0b21lci5zdGF0ZV07XG4gICAgICAgICAgICBmdWxsQWRkcmVzcyA9IGAke2N1c3RvbWVyLnBvc3RhbH0sICR7ZnVsbFN0YXRlID8/IGN1c3RvbWVyLnN0YXRlfSwgICR7Y3VzdG9tZXIuY2l0eX0sICR7Y3VzdG9tZXIuYWRkcmVzczF9JHtjdXN0b21lci5hZGRyZXNzMiA/ICcgJyArIGN1c3RvbWVyLmFkZHJlc3MyIDogJyd9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGxBZGRyZXNzID0gYCR7Y3VzdG9tZXIuYWRkcmVzczF9JHtjdXN0b21lci5hZGRyZXNzMiA/ICcgJyArIGN1c3RvbWVyLmFkZHJlc3MyICsgJywgJyA6ICcsJ30gJHtjdXN0b21lci5jaXR5fSwgJHtjdXN0b21lci5zdGF0ZX0gJHtjdXN0b21lci5wb3N0YWx9LCAke2N1c3RvbWVyLmNvdW50cnl9YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmdWxsTmFtZSA9IGAke2N1c3RvbWVyLm5hbWVfZmlyc3R9ICR7Y3VzdG9tZXIubmFtZV9sYXN0fWA7XG4gICAgICAgICRxcygnLmVtYWlsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gY3VzdG9tZXIuZW1haWxcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcuZnVsbC1uYW1lJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gZnVsbE5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcucHAtYWRkcmVzcycsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGZ1bGxBZGRyZXNzXG4gICAgICAgICk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRqdXN0T3JkZXJTdW1tYXJ5SGVpZ2h0KGlzUGF5cGFsVXNlZCkge1xuICAgIGlmIChHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgJiYgR0xPQkFMLnBocERhdGEucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmIEdMT0JBTC5waHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyAmJiAhcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpKSB7XG4gICAgICAgIGlzUGF5cGFsVXNlZCA/ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyOHJlbSdcbiAgICAgICAgKSA6ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICczMnJlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyAmJiBHTE9CQUwucGhwRGF0YS5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgIUdMT0JBTC5waHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyAmJiAhcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpKSB7XG4gICAgICAgIGlzUGF5cGFsVXNlZCA/ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcxOXJlbSdcbiAgICAgICAgKSA6ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyM3JlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyAmJiAhR0xPQkFMLnBocERhdGEucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmIEdMT0JBTC5waHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyB8fCAhR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zICYmIEdMT0JBTC5waHBEYXRhPy5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgR0xPQkFMLnBocERhdGEuZW5hYmxlX29yZGVyX25vdGVzICYmICFwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkpIHtcbiAgICAgICAgaXNQYXlwYWxVc2VkID8gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzI2LjVyZW0nXG4gICAgICAgICkgOiAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjkuNXJlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgJiYgIUdMT0JBTC5waHBEYXRhPy5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgR0xPQkFMLnBocERhdGE/LmVuYWJsZV9vcmRlcl9ub3Rlcykge1xuICAgICAgICBpc1BheXBhbFVzZWQgPyAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjNyZW0nXG4gICAgICAgICkgOiAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjYuNXJlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyB8fCBHTE9CQUwucGhwRGF0YT8ucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmICFwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkpIHtcbiAgICAgICAgaXNQYXlwYWxVc2VkID8gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzE3cmVtJ1xuICAgICAgICApIDogJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzIxLjVyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc1BheXBhbFVzZWQpIHtcbiAgICAgICAgJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzE1cmVtJ1xuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRDdXJyZW5jeShtZXNzYWdlKSB7XG4gICAgaW5pdEN1cnJlbmN5RXZlbnRzKCk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRDdXJyZW5jeUNvbmZpZyh7XG4gICAgICAgIGNvZGU6IG1lc3NhZ2UucGhwRGF0YS5jdXJyZW5jeV9pbmZvPy5jb2RlID8/ICdVU0QnLFxuICAgICAgICBzeW1ib2w6IG1lc3NhZ2UucGhwRGF0YT8uY3VycmVuY3lfaW5mbz8uc3ltYm9sID8/ICckJyxcbiAgICAgICAgdGhvdXNhbmRzX3NlcGFyYXRvcjogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LnRob3VzYW5kc19zZXBhcmF0b3IgPz8gJywnLFxuICAgICAgICBkZWNpbWFsX3NlcGFyYXRvcjogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LmRlY2ltYWxfc2VwYXJhdG9yID8/ICcuJyxcbiAgICAgICAgbnVtYmVyX29mX2RlY2ltYWxzOiBtZXNzYWdlLnBocERhdGEuY3VycmVuY3lfaW5mbz8ubnVtYmVyX29mX2RlY2ltYWxzID8/IDIsXG4gICAgICAgIHBvc2l0aW9uOiBtZXNzYWdlLnBocERhdGEuY3VycmVuY3lfaW5mbz8ucG9zaXRpb24gPz8gJ2xlZnQnLFxuICAgICAgICByb3VuZGluZzogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LnJvdW5kaW5nID8/ICdkaXNhYmxlZCdcbiAgICB9KSk7XG59XG5mdW5jdGlvbiBpbml0Q3VycmVuY3lFdmVudHMoKSB7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlckN1cnJlbmN5U3ltYm9scygpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyQ3VycmVuY3lTeW1ib2xzKCkge1xuICAgIGNvbnN0IHsgcG9zaXRpb24gLCBzeW1ib2wgIH0gPSBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29uZmlndXJhdGlvbigpO1xuICAgIGNvbnN0IHJpZ2h0ID0gcG9zaXRpb24gPT09ICdyaWdodCcgfHwgcG9zaXRpb24gPT09ICdyaWdodF9zcGFjZSc7XG4gICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoYC5jdXJyZW5jeS1zeW1ib2wke3JpZ2h0ID8gJy1hZnRlcicgOiAnJ31gKSl7XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IHN5bWJvbDtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0R2lmdENhcmRJbnB1dChfbWVzc2FnZSkge1xuICAgIGlmICghRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLkdJRlRDQVJEX0lOUFVUKSB8fCBwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkgfHwgTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkgPT09ICdza3JlZ2Vhci5jb20nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5pdEdpZnRDYXJkRXZlbnRzKCk7XG4gICAgZm9yIChjb25zdCAkZm9ybSBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtb3B0aW9uJykpe1xuICAgICAgICAkZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgICRxcygnI2dpZnQtY2FyZC1zZWN0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBpZiAoRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLkNPVVBPTl9JTlBVVCkpIHtcbiAgICAgICAgJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzI1cmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyMy41cmVtJ1xuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRHaWZ0Q2FyZEV2ZW50cygpIHtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2dpZnRDYXJkQXBwbGllZCcsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBpZiAoIUdMT0JBTC5waHBEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCAkbWVzc2FnZSBvZiAkcXNBbGwoJy5pbnZhbGlkLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgICAgICRtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgaGlkZUdpZnRDYXJkTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0ICRtZXNzYWdlIG9mICRxc0FsbCgnLmludmFsaWQtZ2lmdC1jYXJkJykpe1xuICAgICAgICAgICAgICAgICRtZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICRtZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJJbnB1dCgnLmdpZnQtY2FyZC1pbnB1dCcpO1xuICAgICAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgICAgIGhpZGVHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBoaWRlR2lmdENhcmRMb2FkaW5nU3RhdGUoKTtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0ICRmb3JtIG9mICRxc0FsbCgnZm9ybS5wdy13Yy1naWZ0LWNhcmQnKSl7XG4gICAgICAgICRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoISRmb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBnaWZ0Q2FyZE51bWJlciA9IGRhdGEuZ2V0KCdjYXJkX251bWJlcicpPy50cmltKCkgPz8gJyc7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3JlZGVlbUdpZnRDYXJkJyxcbiAgICAgICAgICAgICAgICBjYXJkTnVtYmVyOiBnaWZ0Q2FyZE51bWJlclxuICAgICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGRpdiBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtb3B0aW9uJykpe1xuICAgICAgICAkZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0dpZnRDYXJkSW5wdXQpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRleGl0R2lmdCBvZiAkcXNBbGwoJy5leGl0LWJ1dHRvbi1naWZ0Jykpe1xuICAgICAgICAkZXhpdEdpZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlR2lmdENhcmRJbnB1dCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2hvd0dpZnRDYXJkSW5wdXQoKSB7XG4gICAgZm9yIChjb25zdCAkY291cG9uIG9mICRxc0FsbCgnZm9ybS5wdy13Yy1naWZ0LWNhcmQnKSl7XG4gICAgICAgICRjb3Vwb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRvcHRpb24gb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLW9wdGlvbicpKXtcbiAgICAgICAgJG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaGlkZUdpZnRDYXJkSW5wdXQoKSB7XG4gICAgZm9yIChjb25zdCAkY291cG9uIG9mICRxc0FsbCgnZm9ybS5wdy13Yy1naWZ0LWNhcmQnKSl7XG4gICAgICAgICRjb3Vwb24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRvcHRpb24gb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLW9wdGlvbicpKXtcbiAgICAgICAgJG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGludmFsaWQgb2YgJHFzQWxsKCcuaW52YWxpZC1naWZ0LWNhcmQnKSl7XG4gICAgICAgICRpbnZhbGlkLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgY2xlYXJJbnB1dCgnLmdpZnQtY2FyZC1pbnB1dCcpO1xufVxuZnVuY3Rpb24gaGlkZUdpZnRDYXJkTG9hZGluZ1N0YXRlKCkge1xuICAgIGZvciAoY29uc3QgJHNwaW5uZXIgb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLXNwaW5uZXInKSl7XG4gICAgICAgICRzcGlubmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYm9yZGVyIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1pbnB1dCcpKXtcbiAgICAgICAgJGJvcmRlci5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtcmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGFwcGx5QnV0dG9uIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1hcHBseScpKXtcbiAgICAgICAgJGFwcGx5QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gc2hvd0dpZnRDYXJkTG9hZGluZ1N0YXRlKCkge1xuICAgIGZvciAoY29uc3QgJHNwaW5uZXIgb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLXNwaW5uZXInKSl7XG4gICAgICAgICRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYm9yZGVyIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1pbnB1dCcpKXtcbiAgICAgICAgJGJvcmRlci5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtcmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGFwcGx5QnV0dG9uIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1hcHBseScpKXtcbiAgICAgICAgJGFwcGx5QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0Q291cG9uSW5wdXQoX21lc3NhZ2UpIHtcbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5DT1VQT05fSU5QVVQpIHx8IEZlYXR1cmUudmVyc2lvbihGZWF0dXJlRmxhZy5DT1VQT05fSU5QVVQpIDwgMiAmJiBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ3Byb2R1Y3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2hvd0NvdXBvbkVudHJ5U3VwcG9ydCgpO1xuICAgIGluaXRDb3Vwb25JbnB1dEV2ZW50cygpO1xufVxuZnVuY3Rpb24gaW5pdENvdXBvbklucHV0RXZlbnRzKCkge1xuICAgIG9uV2luZG93TWVzc2FnZSgnY291cG9uJywgYXN5bmMgKG1lc3NhZ2UpPT57XG4gICAgICAgIGZvciAoY29uc3QgJG1lc3NhZ2Ugb2YgJHFzQWxsKCcud2MtaW52YWxpZC1jb3Vwb24nKSl7XG4gICAgICAgICAgICAkbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YSAmJiBtZXNzYWdlLmRhdGEuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIGhpZGVDb3Vwb25Mb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgJG1lc3NhZ2Ugb2YgJHFzQWxsKCcud2MtaW52YWxpZC1jb3Vwb24nKSl7XG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGhpZGVDb3Vwb25Mb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgY2xlYXJJbnB1dCgnLndjLWNvdXBvbi1jb2RlLWlucHV0Jyk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdzdG9wQ291cG9uTG9hZGluZycsIChfKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBoaWRlQ291cG9uTG9hZGluZ1N0YXRlKCk7XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCAkZm9ybSBvZiAkcXNBbGwoJ2Zvcm0ud2MtY291cG9uLWNvZGUnKSl7XG4gICAgICAgICRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoISRmb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgc2hvd0NvdXBvbkxvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQgPz8gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdXBvbkNvZGUgPSBkYXRhLmdldCgnY291cG9uX2NvZGUnKT8udHJpbSgpID8/ICcnO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdmZXRjaENvdXBvbicsXG4gICAgICAgICAgICAgICAgY29kZTogY291cG9uQ29kZVxuICAgICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJG9wZW5Db3Vwb24gb2YgJHFzQWxsKCcuY291cG9uLWNvZGUtb3B0aW9uJykpe1xuICAgICAgICAkb3BlbkNvdXBvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dDb3Vwb25JbnB1dCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGV4aXRDb3Vwb24gb2YgJHFzQWxsKCcuZXhpdC1idXR0b24tY291cG9uJykpe1xuICAgICAgICAkZXhpdENvdXBvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVDb3Vwb25JbnB1dCk7XG4gICAgfVxuICAgIGhpZGVDb3Vwb25Mb2FkaW5nU3RhdGUoKTtcbn1cbmZ1bmN0aW9uIHNob3dDb3Vwb25FbnRyeVN1cHBvcnQoKSB7XG4gICAgZm9yIChjb25zdCAkZm9ybSBvZiAkcXNBbGwoJy5jb3Vwb24tY29kZS1vcHRpb24nKSl7XG4gICAgICAgICRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgJHFzKCcjY291cG9uLWNvZGUtc2VjdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG59XG5mdW5jdGlvbiBzaG93Q291cG9uSW5wdXQoKSB7XG4gICAgZm9yIChjb25zdCAkY291cG9uIG9mICRxc0FsbCgnZm9ybS53Yy1jb3Vwb24tY29kZScpKXtcbiAgICAgICAgJGNvdXBvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJG9wdGlvbiBvZiAkcXNBbGwoJy5jb3Vwb24tY29kZS1vcHRpb24nKSl7XG4gICAgICAgICRvcHRpb24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGhpZGVDb3Vwb25JbnB1dCgpIHtcbiAgICBmb3IgKGNvbnN0ICRjb3Vwb24gb2YgJHFzQWxsKCdmb3JtLndjLWNvdXBvbi1jb2RlJykpe1xuICAgICAgICAkY291cG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkb3B0aW9uIG9mICRxc0FsbCgnLmNvdXBvbi1jb2RlLW9wdGlvbicpKXtcbiAgICAgICAgJG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGludmFsaWQgb2YgJHFzQWxsKCcud2MtaW52YWxpZC1jb3Vwb24nKSl7XG4gICAgICAgICRpbnZhbGlkLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgY2xlYXJJbnB1dCgnLndjLWNvdXBvbi1jb2RlLWlucHV0Jyk7XG59XG5mdW5jdGlvbiBoaWRlQ291cG9uTG9hZGluZ1N0YXRlKCkge1xuICAgIGZvciAoY29uc3QgJHNwaW5uZXIgb2YgJHFzQWxsKCcud2MtY291cG9uLXNwaW5uZXInKSl7XG4gICAgICAgICRzcGlubmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYm9yZGVyIG9mICRxc0FsbCgnLndjLWNvdXBvbi1jb2RlLWlucHV0Jykpe1xuICAgICAgICAkYm9yZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS1yaWdodC1ib3JkZXInKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYXBwbHlCdXR0b24gb2YgJHFzQWxsKCcud2MtY291cG9uLWNvZGUtYXBwbHknKSl7XG4gICAgICAgICRhcHBseUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNob3dDb3Vwb25Mb2FkaW5nU3RhdGUoKSB7XG4gICAgZm9yIChjb25zdCAkc3Bpbm5lciBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tc3Bpbm5lcicpKXtcbiAgICAgICAgJHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRib3JkZXIgb2YgJHFzQWxsKCcud2MtY291cG9uLWNvZGUtaW5wdXQnKSl7XG4gICAgICAgICRib3JkZXIuY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXJpZ2h0LWJvcmRlcicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRhcHBseUJ1dHRvbiBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tY29kZS1hcHBseScpKXtcbiAgICAgICAgJGFwcGx5QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0TGFuZ3VhZ2UobWVzc2FnZSkge1xuICAgIGluaXRMYW5ndWFnZUV2ZW50cygpO1xuICAgIGxldCBsYW5ndWFnZSA9IG1lc3NhZ2UucGhwRGF0YS5sYW5ndWFnZSA9PT0gJ2RldGVjdC1mcm9tLXBhZ2UnID8gbWVzc2FnZS5wYWdlTGFuZ3VhZ2UgOiBtZXNzYWdlLnBocERhdGEubGFuZ3VhZ2U7XG4gICAgY29uc3QgZW5nbGlzaFZhcmlhbnRzID0gbmV3IFNldChbXG4gICAgICAgICdlbi1BVScsXG4gICAgICAgICdlbi1DQScsXG4gICAgICAgICdlbi1HQicsXG4gICAgICAgICdlbi1OWicsXG4gICAgICAgICdlbi1aQSdcbiAgICBdKTtcbiAgICBpZiAoZW5nbGlzaFZhcmlhbnRzLmhhcyhsYW5ndWFnZSkpIHtcbiAgICAgICAgbGFuZ3VhZ2UgPSAnZW4tVVMnO1xuICAgIH1cbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVMYW5ndWFnZShsYW5ndWFnZSkpO1xufVxuZnVuY3Rpb24gaW5pdExhbmd1YWdlRXZlbnRzKCkge1xuICAgIG9uV2luZG93TWVzc2FnZSgncGFnZUxhbmd1YWdlQ2hhbmdlJywgKG1lc3NhZ2UpPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUxhbmd1YWdlKG1lc3NhZ2UubGFuZ3VhZ2UpKTtcbiAgICB9KTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyTG9jYWxlVGV4dCgpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyTG9jYWxlVGV4dCgpIHtcbiAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnW2RhdGEtaTE4bl0nKSl7XG4gICAgICAgIGlmICgkZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJiAkZWxlbWVudC50eXBlID09PSAnc3VibWl0Jykge1xuICAgICAgICAgICAgJGVsZW1lbnQudmFsdWUgPSBnZXRMb2NhbGVUZXh0KCRlbGVtZW50Py5kYXRhc2V0Py5pMThuID8/ICcnKTtcbiAgICAgICAgfSBlbHNlIGlmICgkZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgJGVsZW1lbnQucGxhY2Vob2xkZXIgPSBnZXRMb2NhbGVUZXh0KCRlbGVtZW50Py5kYXRhc2V0Py5pMThuID8/ICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gZ2V0TG9jYWxlVGV4dCgkZWxlbWVudD8uZGF0YXNldD8uaTE4biA/PyAnJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKEVudmlyb25tZW50Lmxhbmd1YWdlKCkgPT09ICdyby1STycpIHtcbiAgICAgICAgc2V0Q3VzdG9tVmFsaWRpdHlNZXNzYWdlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0Q3VzdG9tVmFsaWRpdHlNZXNzYWdlKCkge1xuICAgIGZvciAoY29uc3QgJGlucHV0IG9mICRxc0FsbCgnZm9ybSBpbnB1dCcpKXtcbiAgICAgICAgJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ludmFsaWQnLCAoKT0+e1xuICAgICAgICAgICAgJGlucHV0LnNldEN1c3RvbVZhbGlkaXR5KCdUZSBydWfEg20gc2EgY29tcGxldGV6aSBhY2VzdCBjw6JtcC4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT57XG4gICAgICAgICAgICAkaW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkoJycpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gICAgY29uc3Qgc3RyaW5nVG9VcHBlciA9IFN0cmluZyhzdHJpbmcpO1xuICAgIHJldHVybiBzdHJpbmdUb1VwcGVyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nVG9VcHBlci5zbGljZSgxKTtcbn1cbmZ1bmN0aW9uIGluaXRRdWFudGl0eUNoYW5nZXJFdmVudCgpIHtcbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSkge1xuICAgICAgICAkcXNBbGwoJyNwcC1zdW1tYXJ5LWJvZHksICNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcsICNwcC1zdW1tYXJ5LWJvZHktbW9iaWxlJywgKCRyZW1vdmVCdXR0b25zKT0+e1xuICAgICAgICAgICAgJHJlbW92ZUJ1dHRvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FydEl0ZW1LZXkgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5pdGVtLXJlbW92ZXInKS5kYXRhc2V0LnFpZDtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIDAsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXNBbGwoJyNwcC1zdW1tYXJ5LWJvZHksICNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcsICNwcC1zdW1tYXJ5LWJvZHktbW9iaWxlJywgKCRjYXJ0Q29udGFpbmVyKT0+e1xuICAgICAgICAkY2FydENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudDEpPT57XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gZXZlbnQxLnRhcmdldDtcbiAgICAgICAgICAgIGlmICghJHRhcmdldC5jbG9zZXN0KCcucXR5LWJ0bicpICYmICEkdGFyZ2V0LmNsb3Nlc3QoJy5xdHktZnMnKSAmJiAhJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJHRhcmdldC5jbG9zZXN0KCcucXR5LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGJ1dHRvbiA9ICR0YXJnZXQuY2xvc2VzdCgnLnF0eS1idG4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJ0SXRlbUtleSA9ICRidXR0b24uZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCRidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWNyZWFzZS1xdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgLTEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbmNyZWFzZS1xdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5jbG9zZXN0KCcucXR5LWZzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICR0YXJnZXQuY2xvc2VzdCgnLnF0eS1mcycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRJdGVtS2V5ID0gJHRhcmdldC5jbG9zZXN0KCcucXR5LWZzJykuZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGlucHV0VGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwcmV2aW91c1RpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0VGFyZ2V0LnZhbHVlICYmIGN1cnJlbnRWYWx1ZSAhPT0gJGlucHV0VGFyZ2V0LnZhbHVlICYmICRpbnB1dFRhcmdldC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgTnVtYmVyLnBhcnNlSW50KCRpbnB1dFRhcmdldC52YWx1ZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRUYXJnZXQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgNzUwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhc3luYyAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRpbnB1dFRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZW91dElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocHJldmlvdXNUaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXRUYXJnZXQudmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSAkaW5wdXRUYXJnZXQudmFsdWUgJiYgJGlucHV0VGFyZ2V0LmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIE51bWJlci5wYXJzZUludCgkaW5wdXRUYXJnZXQudmFsdWUpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dFRhcmdldC52YWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJy5pdGVtLXJlbW92ZXInKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRJdGVtS2V5ID0gJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykuZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIDAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNoYW5nZVF1YW50aXR5KGNhcnRJdGVtS2V5LCBhbW91bnQgPSAxLCBzZXQgPSBmYWxzZSkge1xuICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkgIT09ICdmaW5pc2hlZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLWNoYW5nZS1xdWFudGl0eScsIHtcbiAgICAgICAgICAgIGtleTogY2FydEl0ZW1LZXksXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICBzZXRcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN1bWVDYXJ0Q2FsY3VsYXRpb25SZXNwb25zZShyZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBRdWFudGl0eSBmYWlsZWQgdG8gY2hhbmdlIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LiBFcnJvciR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbn1cbmZ1bmN0aW9uIGluaXRDYXJ0KCkge1xuICAgIGluaXRDYXJ0RXZlbnRzKCk7XG4gICAgaW5pdFF1YW50aXR5Q2hhbmdlckV2ZW50KCk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdwcC11cGRhdGUtY2FydCcsIGFzeW5jICgpPT57XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGluaXRDYXJ0RXZlbnRzKCkge1xuICAgIGxldCBwcmV2aW91c0NhcnREYXRhID0gJyc7XG4gICAgbGV0IHByZXZpb3VzQ3VycmVuY3lEYXRhID0gJyc7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGNvbnN0IGNhcnREYXRhID0gSlNPTi5zdHJpbmdpZnkoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5RGF0YSA9IEpTT04uc3RyaW5naWZ5KE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb25maWd1cmF0aW9uKCkpO1xuICAgICAgICBpZiAoY2FydERhdGEgIT09IHByZXZpb3VzQ2FydERhdGEgfHwgY3VycmVuY3lEYXRhICE9PSBwcmV2aW91c0N1cnJlbmN5RGF0YSkge1xuICAgICAgICAgICAgcHJldmlvdXNDYXJ0RGF0YSA9IGNhcnREYXRhO1xuICAgICAgICAgICAgcHJldmlvdXNDdXJyZW5jeURhdGEgPSBjdXJyZW5jeURhdGE7XG4gICAgICAgICAgICByZW5kZXJPcmRlclN1bW1hcnlJdGVtcyhEZWZhdWx0Q2FydC5jb250ZW50cygpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyT3JkZXJTdW1tYXJ5SXRlbXMoY2FydCkge1xuICAgIGNvbnN0ICR0Ym9keSA9ICRxcygnI3BwLXN1bW1hcnktYm9keScpO1xuICAgIGNvbnN0ICR0Ym9keUV4aXN0aW5nID0gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJyk7XG4gICAgY29uc3QgJHRib2R5TW9iaWxlID0gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LW1vYmlsZScpO1xuICAgIGlmICghJHRib2R5IHx8ICEkdGJvZHlFeGlzdGluZyB8fCAhJHRib2R5TW9iaWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uSFRNTChpdGVtKSB7XG4gICAgICAgIGxldCB2YXJpYXRpb25Sb3dIVE1MID0gJyc7XG4gICAgICAgIGlmICghaXRlbS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWF0aW9uUm93SFRNTDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWF0aW9uUm93SFRNTDtcbiAgICAgICAgfVxuICAgICAgICB2YXJpYXRpb25Sb3dIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpe1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkS2V5ID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGtleS5yZXBsYWNlKCdhdHRyaWJ1dGVfJywgJycpLnJlcGxhY2UoJ3BhXycsICcnKS5yZXBsYWNlKC8tL2csICcgJykpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBTdHJpbmcoaXRlbS5hdHRyaWJ1dGVzW2tleV0pLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXJpYXRpb25Sb3dIVE1MICs9IGA8YnI+PHNwYW4gY2xhc3M9XCIke2l0ZW0uaXNfcGFydF9vZl9idW5kbGUgPyAnJyA6ICdtdXRlZCd9IHBsLTMvMlwiPiR7Zm9ybWF0dGVkS2V5fTogJHtmb3JtYXR0ZWRWYWx1ZX08L3NwYW4+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFyaWF0aW9uUm93SFRNTDtcbiAgICB9XG4gICAgY2xlYXJPcmRlclN1bW1hcnkoKTtcbiAgICBpZiAoRGVmYXVsdENhcnQuY29udGVudHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgJG1lc3NhZ2UgPSBgPHRyIGNsYXNzPVwib3JkZXItc3VtbWFyeS1pdGVtXCI+PHRkIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBcIj4ke2dldExvY2FsZVRleHQoJ0NhcnQgaXMgZW1wdHknKX08L3RkPjwvdHI+YDtcbiAgICAgICAgJHRib2R5LmlubmVySFRNTCA9ICRtZXNzYWdlO1xuICAgICAgICAkdGJvZHlNb2JpbGUuaW5uZXJIVE1MID0gJG1lc3NhZ2U7XG4gICAgICAgICR0Ym9keUV4aXN0aW5nLmlubmVySFRNTCA9ICRtZXNzYWdlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IGNhcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgICBjb25zdCBpdGVtID0gY2FydFtpXTtcbiAgICAgICAgaWYgKGl0ZW0ucXVhbnRpdHkgPT09ICcnIHx8IE51bWJlci5wYXJzZUludChTdHJpbmcoaXRlbS5xdWFudGl0eSkpID09PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpID09PSAndWdvcHJvYmFzZWJhbGwuY29tJyAmJiBpdGVtLmZvcm1hdHRlZF9pdGVtX2RhdGEgJiYgaXRlbS5uYW1lX3dpdGhfdmFyaWF0aW9uKSB7XG4gICAgICAgICAgICBuYW1lID0gaXRlbS5uYW1lX3dpdGhfdmFyaWF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhcmlhdGlvblRpdGxlID0gIWl0ZW0uYXR0cmlidXRlcyAmJiBpdGVtLnZhcmlhdGlvbl90aXRsZSA/IGAgLSAke2l0ZW0udmFyaWF0aW9uX3RpdGxlID8/ICcnfWAgOiAnJztcbiAgICAgICAgY29uc3QgbGFiZWwgPSBgJHtuYW1lLmJvbGQoKX0ke3ZhcmlhdGlvblRpdGxlfSAke21ldGFEYXRhUm93c0hUTUwoaXRlbSl9ICR7aXRlbS5mb3JtYXR0ZWRfaXRlbV9kYXRhID8gZm9ybWF0dGVkSXRlbURhdGFIVE1MKGl0ZW0pIDogZ2V0VmFyaWF0aW9uSFRNTChpdGVtKX1gO1xuICAgICAgICBsZXQgYW1vdW50ID0gYCR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcoTnVtYmVyLnBhcnNlRmxvYXQoaXRlbS5kaXNwbGF5X3ByaWNlID8/IGl0ZW0ucHJpY2UpICogY2FydEl0ZW1RdWFudGl0eShpdGVtKSl9YDtcbiAgICAgICAgaWYgKGl0ZW0uaXNfcGFydF9vZl9idW5kbGUpIHtcbiAgICAgICAgICAgIGFtb3VudCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmlzX3N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nQW1vdW50ID0gIWl0ZW0uc3Vic2NyaXB0aW9uX3ByaWNlX3N0cmluZz8uaW5kZXhPZihTdHJpbmcoaXRlbS5kaXNwbGF5X3ByaWNlID8/IGl0ZW0ucHJpY2UpKSA/ICcnIDogZm9ybWF0Q29zdFN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChpdGVtLmRpc3BsYXlfcHJpY2UgPz8gaXRlbS5wcmljZSkpO1xuICAgICAgICAgICAgYW1vdW50ID0gYCR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LnN5bWJvbCgpfSR7c3RyaW5nQW1vdW50fSR7aXRlbS5zdWJzY3JpcHRpb25fcHJpY2Vfc3RyaW5nID8/ICcnfWA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgJHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICRyb3cuY2xhc3NOYW1lID0gJ29yZGVyLXN1bW1hcnktaXRlbSc7XG4gICAgICAgIGNvbnN0ICRpdGVtUmVtb3ZlciA9ICh0ZENsYXNzID0gJycpPT5gXG5cdFx0PHRkIGNsYXNzPVwiaXRlbS1yZW1vdmVyLXRkIG5vbi1idW5kbGVkLWl0ZW0gJHt0ZENsYXNzfVwiPlxuXHRcdFx0PGJ1dHRvbiBjbGFzcz1cIml0ZW0tcmVtb3ZlclwiIGRhdGEtcWlkPVwiJHtpdGVtLml0ZW1fa2V5fVwiPiZ0aW1lczs8L2J1dHRvbj5cblx0XHQ8L3RkPmBcbiAgICAgICAgO1xuICAgICAgICBjb25zdCAkcXR5Q2hhbmdlciA9ICh0ZENsYXNzID0gJycpPT5gXG5cdFx0PHRkIGNsYXNzPVwicXR5LXRkICR7dGRDbGFzc31cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJxdWFudGl0eS1jaGFuZ2VyXCI+XG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicHItMCBkZWNyZWFzZS1xdHkgcXR5LWJ0biAke2NhcnRJdGVtUXVhbnRpdHkoaXRlbSkgPD0gMSA/ICdzY3JvbGwtZW5kJyA6ICcnfVwiIGRhdGEtcWlkPVwiJHtpdGVtLml0ZW1fa2V5fVwiPiYjODcyMjs8L2J1dHRvbj5cblx0XHRcdFx0PGZvcm0gb25TdWJtaXQ9XCJyZXR1cm4gZmFsc2U7XCIgY2xhc3M9XCJtYi0wXCI+XG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiJHtpdGVtLnN0b2NrX3F0eSA/IGl0ZW0uc3RvY2tfcXR5IDogJyd9XCIgY2xhc3M9XCJxdHktZnNcIiB2YWx1ZT1cIiR7Y2FydEl0ZW1RdWFudGl0eShpdGVtKX1cIiBkYXRhLXFpZD1cIiR7aXRlbS5pdGVtX2tleX1cIiByZXF1aXJlZC8+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwbC0wIGluY3JlYXNlLXF0eSBxdHktYnRuICR7aXRlbS5zdG9ja19xdHkgJiYgY2FydEl0ZW1RdWFudGl0eShpdGVtKSA+PSBpdGVtLnN0b2NrX3F0eSA/ICdzY3JvbGwtZW5kJyA6ICcnfVwiIGRhdGEtcWlkPVwiJHtpdGVtLml0ZW1fa2V5fVwiPis8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvdGQ+YFxuICAgICAgICA7XG4gICAgICAgIGNvbnN0IGl0ZW1BbW91bnQgPSBgPHNwYW4gY2xhc3M9J211dGVkJz4gJnRpbWVzICR7Y2FydEl0ZW1RdWFudGl0eShpdGVtKX08L3NwYW4+YDtcbiAgICAgICAgY29uc3Qgc2hvd1F1YW50aXR5Q2hhbmdlciA9IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSAmJiBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ2NhcnQnIHx8IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSAmJiBGZWF0dXJlLnZlcnNpb24oRmVhdHVyZUZsYWcuUVVBTlRJVFlfQ0hBTkdFUikgPj0gMjtcbiAgICAgICAgaWYgKCFpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGNhcnQubGVuZ3RoIC0gMSAmJiBjYXJ0W2kgKyAxXS5pc19wYXJ0X29mX2J1bmRsZSkge1xuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9ICRpdGVtUmVtb3ZlcigncmVtb3ZlLWJvcmRlcicpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwicHJvZHVjdC1pbWctdGQtYjBcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cInByb2R1Y3QtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdCR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICRxdHlDaGFuZ2VyKCdidW5kbGUtbmFtZSByZW1vdmUtYm9yZGVyJykgOiAnJ31cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJidW5kbGUtbmFtZVwiPiR7bGFiZWx9ICR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICcnIDogaXRlbUFtb3VudH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cImJ1bmRsZS1uYW1lIGJvbGRcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSAkaXRlbVJlbW92ZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cInByb2R1Y3QtaW1nLXRkXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJwcm9kdWN0LWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQke3Nob3dRdWFudGl0eUNoYW5nZXIgPyAkcXR5Q2hhbmdlcignbm9uLWJ1bmRsZWQtaXRlbScpIDogJyd9XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibm9uLWJ1bmRsZWQtaXRlbVwiPiR7bGFiZWx9ICR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICcnIDogaXRlbUFtb3VudH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5vbi1idW5kbGVkLWl0ZW0gYm9sZFwiPiR7YW1vdW50fTwvdGQ+XG5cdFx0XHRcdGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pc19wYXJ0X29mX2J1bmRsZSkge1xuICAgICAgICAgICAgaWYgKGkgPCBjYXJ0Lmxlbmd0aCAtIDEgJiYgIWNhcnRbaSArIDFdLmlzX3BhcnRfb2ZfYnVuZGxlIHx8IGkgPT09IGNhcnQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTEgcHJvZHVjdC1pbWctdGRcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cImJ1bmRsZS1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTFcIj4ke2xhYmVsfTwvdGQ+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTFcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBidW5kbGUtcGFkZGluZyBwcm9kdWN0LWltZy10ZC1iMFwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwiYnVuZGxlLWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYnVuZGxlLXBhZGRpbmdcIj4ke2xhYmVsfTwvdGQ+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJ1bmRsZS1wYWRkaW5nXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbXNJbkNhcnQoY2FydCkgPT09IDEgfHwgaSA9PT0gaXRlbXNJbkNhcnQoY2FydCkgLSAxKSB7XG4gICAgICAgICAgICBjb25zdCAkb25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgICRvbmUuY2xhc3NOYW1lID0gJ29yZGVyLXN1bW1hcnktaXRlbSc7XG4gICAgICAgICAgICBpZiAoaXRlbS5pc19wYXJ0X29mX2J1bmRsZSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkb25lLmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTEgcHJvZHVjdC1pbWctdGQgcmVtb3ZlLWJvcmRlclwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwiYnVuZGxlLWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRvbmUuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMSByZW1vdmUtYm9yZGVyXCI+JHtsYWJlbH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xIHJlbW92ZS1ib3JkZXJcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkb25lLmlubmVySFRNTCArPSAkaXRlbVJlbW92ZXIoJ3JlbW92ZS1ib3JkZXInKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJG9uZS5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cInByb2R1Y3QtaW1nLXRkIHJlbW92ZS1ib3JkZXJcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cInByb2R1Y3QtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJG9uZS5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdCR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICRxdHlDaGFuZ2VyKCdub24tYnVuZGxlZC1pdGVtIHJlbW92ZS1ib3JkZXInKSA6ICcnfVxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5vbi1idW5kbGVkLWl0ZW0gcmVtb3ZlLWJvcmRlclwiPiR7bGFiZWx9ICR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICcnIDogaXRlbUFtb3VudH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5vbi1idW5kbGVkLWl0ZW0gcmVtb3ZlLWJvcmRlciBib2xkXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0Ym9keS5wcmVwZW5kKCRvbmUpO1xuICAgICAgICAgICAgJHRib2R5TW9iaWxlLnByZXBlbmQoJG9uZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRib2R5LnByZXBlbmQoJHJvdyk7XG4gICAgICAgICAgICAkdGJvZHlNb2JpbGUucHJlcGVuZCgkcm93LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgJHRib2R5RXhpc3RpbmcucHJlcGVuZCgkcm93LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJPcmRlclN1bW1hcnkoKSB7XG4gICAgZm9yIChjb25zdCAkaXRlbSBvZiAkcXNBbGwoJy5vcmRlci1zdW1tYXJ5LWl0ZW0nKSl7XG4gICAgICAgICRpdGVtLnJlbW92ZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ldGFEYXRhUm93c0hUTUwoaXRlbSkge1xuICAgIGlmICghaXRlbS5tZXRhX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgaHRtbCA9ICcnO1xuICAgIGZvciAoY29uc3QgbWV0YSBvZiBpdGVtLm1ldGFfZGF0YSl7XG4gICAgICAgIGNvbnN0IGtleVRleHQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIobWV0YS5rZXkucmVwbGFjZSgvXy9nLCAnICcpKTtcbiAgICAgICAgaHRtbCArPSBgPGJyPjxzcGFuIGNsYXNzPVwibXV0ZWQgbWwtaGFsZlwiPjxiPiR7a2V5VGV4dH08L2I+OiAke21ldGEudmFsdWUgfHwgJyhub25lKSd9PC9zcGFuPmA7XG4gICAgfVxuICAgIHJldHVybiBodG1sO1xufVxuZnVuY3Rpb24gZm9ybWF0dGVkSXRlbURhdGFIVE1MKGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0uZm9ybWF0dGVkX2l0ZW1fZGF0YSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBpdGVtLmZvcm1hdHRlZF9pdGVtX2RhdGEucmVwbGFjZSgvJm5ic3A7L2csICcnKTtcbn1cbmZ1bmN0aW9uIGdyZWF0ZXJUaGFuKGEsIGIpIHtcbiAgICBjb25zdCBbbWFqb3JBLCBtaW5vckEsIHBhdGNoQV0gPSBTdHJpbmcoYSkuc3BsaXQoJy4nKS5tYXAoKG4pPT5OdW1iZXIobilcbiAgICApO1xuICAgIGNvbnN0IFttYWpvckIsIG1pbm9yQiwgcGF0Y2hCXSA9IFN0cmluZyhiKS5zcGxpdCgnLicpLm1hcCgobik9Pk51bWJlcihuKVxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gbWFqb3JBIC0gbWFqb3JCIHx8IG1pbm9yQSAtIG1pbm9yQiB8fCBwYXRjaEEgLSBwYXRjaEI7XG4gICAgcmV0dXJuIHJlc3VsdCA+IDA7XG59XG5mdW5jdGlvbiBpbml0U3RyaXBlQnV0dG9uKCkge1xuICAgIHNob3dTdHJpcGVQYXltZW50T3B0aW9uKCk7XG4gICAgJHFzKCcjc3RyaXBlLW9wdGlvbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdFN0cmlwZVBheW1lbnRNZXRob2QpO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJTdHJpcGVCdXR0b25EaXNwbGF5KFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSwgRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpKTtcbiAgICAgICAgcmVuZGVyU3RyaXBlUGF5bWVudE1ldGhvZChQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSwgRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJTdHJpcGVCdXR0b25Mb2FkaW5nKFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyU3RyaXBlQnV0dG9uRGlzcGxheShtZXRob2QsIHBhZ2UsIGxvYWRpbmdNb2RlKSB7XG4gICAgaWYgKG1ldGhvZCA9PT0gJ3N0cmlwZScgJiYgcGFnZSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4tY29udGFpbmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1jb250YWluZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1ldGhvZCA9PT0gJ3N0cmlwZScgJiYgcGFnZSA9PT0gJ3BheW1lbnQnICYmIGxvYWRpbmdNb2RlICE9PSAnbG9hZGluZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJTdHJpcGVCdXR0b25Mb2FkaW5nKG1ldGhvZCwgbW9kZSkge1xuICAgIGlmIChtZXRob2QgIT09ICdzdHJpcGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdmaW5pc2hlZCcpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bicsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtb2RlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1zaGlwcGluZy1zcGlubmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1zaGlwcGluZy1zcGlubmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtb2RlID09PSAncHJvY2Vzc2luZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0biA+IC5idXR0b24tdGV4dCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGdldExvY2FsZVRleHQoJ3Byb2Nlc3NpbmcnKVxuICAgICAgICApO1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuID4gLmJ1dHRvbi10ZXh0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gYCR7Z2V0TG9jYWxlVGV4dCgncGF5Jyl9ICR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcoRGVmYXVsdENhcnQudG90YWwoKSl9YFxuICAgICAgICApO1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzaG93U3RyaXBlUGF5bWVudE9wdGlvbigpIHtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBmb3IgKGNvbnN0ICRjb250YWluZXIgb2YgJHFzQWxsKCcuc3RyaXBlLWJ0bi1jb250YWluZXInKSl7XG4gICAgICAgICRjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdFN0cmlwZVBheW1lbnRNZXRob2QoKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCgnc3RyaXBlJykpO1xufVxuZnVuY3Rpb24gcmVuZGVyU3RyaXBlUGF5bWVudE1ldGhvZChtZXRob2QsIHBhZ2UpIHtcbiAgICBpZiAobWV0aG9kID09PSAnc3RyaXBlJyAmJiBwYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJyk/LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICRxcygnI3N0cmlwZS1vcHRpb24nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2NhcmQtZWxlbWVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3N0cmlwZS1wbScpPy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLW9wdGlvbicsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRmNGY0J1xuICAgICAgICApO1xuICAgICAgICAkcXMoJyNjYXJkLWVsZW1lbnQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTdHJpcGVQYXltZW50UmVxdWVzdChtZXNzYWdlLCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpIHtcbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5TVFJJUEVfUEFZTUVOVF9SRVFVRVNUKSB8fCBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ3Byb2R1Y3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5pdE1lc3NhZ2UgPSB7XG4gICAgICAgIGV2ZW50OiAncHAtaW5pdC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0JyxcbiAgICAgICAgc3RyaXBlOiB7XG4gICAgICAgICAgICBsb2NhbGU6IG1lc3NhZ2UuYnJvd3NlckxvY2FsZSxcbiAgICAgICAgICAgIGxpdmU6ICFpc0RldkVudmlyb25tZW50KGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpKVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW5jeUNvZGU6IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCksXG4gICAgICAgIGNhcnRDYWxjdWxhdGlvblJlY29yZDogc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNcbiAgICB9O1xuICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKGluaXRNZXNzYWdlLCAnKicpO1xuICAgIG9uV2luZG93RGF0YUZldGNoKCdwcC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0LWFkZHJlc3MtY2hhbmdlJywgaGFuZGxlU3RyaXBlUGF5bWVudFJlcXVlc3RBZGRyZXNzQ2hhbmdlKTtcbiAgICBvbldpbmRvd0RhdGFGZXRjaCgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1zaGlwcGluZy1jaGFuZ2UnLCBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdFNoaXBwaW5nQ2hhbmdlKTtcbiAgICBvbldpbmRvd0RhdGFGZXRjaCgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1wcm9jZXNzLXBheW1lbnQnLCBhc3luYyAocmVxdWVzdCk9PmF3YWl0IGhhbmRsZVN0cmlwZVBheW1lbnRSZXF1ZXN0UHJvY2Vzc1BheW1lbnQocmVxdWVzdCwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKVxuICAgICk7XG4gICAgY29uc3QgcHJldmlvdXNVcGRhdGVEYXRhID0gJyc7XG4gICAgY29uc3QgdW5zdWJzY3JpYmVQYXltZW50UmVxdWVzdFVwZGF0ZXMgPSBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgY29uc3QgcGF5bWVudFJlcXVlc3REYXRhVXBkYXRlID0gZ2V0U3RyaXBlUGF5bWVudFJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHBheW1lbnRSZXF1ZXN0RGF0YVVwZGF0ZSk7XG4gICAgICAgIGlmIChwcmV2aW91c1VwZGF0ZURhdGEgIT09IHVwZGF0ZURhdGEpIHtcbiAgICAgICAgICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKHBheW1lbnRSZXF1ZXN0RGF0YVVwZGF0ZSwgJyonKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1zdG9wJywgdW5zdWJzY3JpYmVQYXltZW50UmVxdWVzdFVwZGF0ZXMpO1xufVxuZnVuY3Rpb24gZ2V0U3RyaXBlUGF5bWVudFJlcXVlc3RVcGRhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXZlbnQ6ICdwcC11cGRhdGUtc3RyaXBlLXBheW1lbnQtcmVxdWVzdCcsXG4gICAgICAgIGN1cnJlbmN5Q29kZTogTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSxcbiAgICAgICAgY2FydENhbGN1bGF0aW9uUmVjb3JkOiBzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1xuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdFByb2Nlc3NQYXltZW50KHJlcXVlc3QsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHN0cmlwZUN1c3RvbWVySWQgPSBhd2FpdCBzdHJpcGVTZXJ2aWNlLmNyZWF0ZVN0cmlwZUN1c3RvbWVyKHJlcXVlc3QudG9rZW4uaWQsIHtcbiAgICAgICAgbmFtZTogcmVxdWVzdC5wYXllck5hbWUsXG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWVyRW1haWwsXG4gICAgICAgIHBob25lOiByZXF1ZXN0LnBheWVyUGhvbmVcbiAgICB9KTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lcih7XG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWVyRW1haWwsXG4gICAgICAgIHBob25lOiByZXF1ZXN0LnBheWVyUGhvbmUsXG4gICAgICAgIG5hbWVfZmlyc3Q6IHJlcXVlc3QucGF5ZXJOYW1lLnNwbGl0KCcgJylbMF0gPz8gJycsXG4gICAgICAgIG5hbWVfbGFzdDogcmVxdWVzdC5wYXllck5hbWUuc3BsaXQoJyAnKVsxXSA/PyAnJyxcbiAgICAgICAgYWRkcmVzczE6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmFkZHJlc3NMaW5lWzBdLFxuICAgICAgICBhZGRyZXNzMjogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MuYWRkcmVzc0xpbmVbMV0gPz8gJycsXG4gICAgICAgIGNpdHk6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmNpdHksXG4gICAgICAgIHN0YXRlOiByZXF1ZXN0LnNoaXBwaW5nQWRkcmVzcy5yZWdpb24sXG4gICAgICAgIGNvdW50cnk6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmNvdW50cnksXG4gICAgICAgIHBvc3RhbDogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MucG9zdGFsQ29kZSxcbiAgICAgICAgY2FyZDoge1xuICAgICAgICAgICAgYnJhbmQ6IHJlcXVlc3QudG9rZW4uY2FyZC5icmFuZCxcbiAgICAgICAgICAgIGxhc3Q0OiByZXF1ZXN0LnRva2VuLmNhcmQubGFzdDRcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaXBlX2N1c3RvbWVyX2lkOiBzdHJpcGVDdXN0b21lcklkLFxuICAgICAgICBwYXltZW50X29wdGlvbjogJ3N0cmlwZSdcbiAgICB9KSk7XG4gICAgaWYgKCFhd2FpdCB2YWxpZGF0ZUFkZHJlc3MoKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiAnaW52YWxpZF9zaGlwcGluZ19hZGRyZXNzJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIoc3RyaXBlQ3VzdG9tZXJJZCwgcmVxdWVzdC50b2tlbi5jYXJkLmJyYW5kLCByZXF1ZXN0LnRva2VuLmNhcmQubGFzdDQsICdzdHJpcGUnKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcmRlciA9IGF3YWl0IG9yZGVyU2VydmljZS5wbGFjZU9yZGVyKCk7XG4gICAgICAgIGNvbnN0IHBheW1lbnRSZXN1bHQgPSBhd2FpdCBzdHJpcGVTZXJ2aWNlLnByb2Nlc3NQYXltZW50KG9yZGVyKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgb3JkZXJTZXJ2aWNlLnNldFBheW1lbnRTdGF0dXMoUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSwgdHJ1ZSkpLm9rKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2ZhaWwnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGF5bWVudFJlc3VsdCkge1xuICAgICAgICAgICAgYXdhaXQgb3JkZXJTZXJ2aWNlLnNldE9yZGVyU3RhdHVzKG9yZGVyLCAnd2MtZmFpbGVkJywge1xuICAgICAgICAgICAgICAgIHN0cmlwZUN1c3RvbWVySWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdmYWlsJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmRlclN0YXR1c1Jlc3VsdCA9IGF3YWl0IG9yZGVyU2VydmljZS5zZXRPcmRlclN0YXR1cyhvcmRlciwgJ3djLXByb2Nlc3NpbmcnLCB7XG4gICAgICAgICAgICBzdHJpcGVDdXN0b21lcklkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIW9yZGVyU3RhdHVzUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2ZhaWwnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VVJMOiBvcmRlclN0YXR1c1Jlc3VsdFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgU3RyaXBlIHBheW1lbnQgcmVxdWVzdCBwcm9jZXNzIHBheW1lbnQgZmFpbGVkIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiAnZmFpbCdcbiAgICAgICAgfTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdEFkZHJlc3NDaGFuZ2UocmVxdWVzdCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgLi4uUGVhY2hQYXlDdXN0b21lci5kYXRhKCksXG4gICAgICAgIGFkZHJlc3MxOiByZXF1ZXN0LmFkZHJlc3NMaW5lWzBdID8/ICcnLFxuICAgICAgICBhZGRyZXNzMjogcmVxdWVzdC5hZGRyZXNzTGluZVsxXSA/PyAnJyxcbiAgICAgICAgY2l0eTogcmVxdWVzdC5jaXR5ID8/ICcnLFxuICAgICAgICBwb3N0YWw6IHJlcXVlc3QucG9zdGFsQ29kZSA/PyAnJyxcbiAgICAgICAgc3RhdGU6IHJlcXVlc3QucmVnaW9uID8/ICcnLFxuICAgICAgICBjb3VudHJ5OiByZXF1ZXN0LmNvdW50cnkgPz8gJydcbiAgICB9KSk7XG4gICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgIHJldHVybiBnZXRTdHJpcGVQYXltZW50UmVxdWVzdFVwZGF0ZSgpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3RyaXBlUGF5bWVudFJlcXVlc3RTaGlwcGluZ0NoYW5nZShyZXF1ZXN0KSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ2FydFBhY2thZ2VTaGlwcGluZ01ldGhvZCh7XG4gICAgICAgIGNhcnRLZXk6ICcwJyxcbiAgICAgICAgc2hpcHBpbmdQYWNrYWdlS2V5OiAnMCcsXG4gICAgICAgIHBhY2thZ2VNZXRob2RJZDogcmVxdWVzdC5pZFxuICAgIH0pKTtcbiAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgcmV0dXJuIGdldFN0cmlwZVBheW1lbnRSZXF1ZXN0VXBkYXRlKCk7XG59XG5hc3luYyBmdW5jdGlvbiBpbml0U3RyaXBlU3VwcG9ydChtZXNzYWdlMSwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgY29ubmVjdGVkU3RyaXBlQWNjb3VudCA9IG1lc3NhZ2UxLnBocERhdGEuY29ubmVjdGVkX3N0cmlwZV9hY2NvdW50O1xuICAgIGNvbnN0IGlzRGV2TW9kZSA9IGlzRGV2RW52aXJvbm1lbnQoZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkpO1xuICAgIGlmIChncmVhdGVyVGhhbihFbnZpcm9ubWVudC5wbHVnaW4udmVyc2lvbigpLCAnMS41Ny4xJykgJiYgIWNvbm5lY3RlZFN0cmlwZUFjY291bnQgJiYgIUVudmlyb25tZW50LnRlc3RNb2RlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5TVFJJUEUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gaXNEZXZNb2RlID8gJ3BrX3Rlc3RfQ25MMmtBNTJWNWRScVpiamxKMHNaMmdyMDB1QnJPRW1RUScgOiAncGtfbGl2ZV9vUk9uSVFEdWV4SFpwbkVPY1VmZjNDUnowMGFzYU9PQ0FMJztcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbG9jYWxlOiBtZXNzYWdlMT8uYnJvd3NlckxvY2FsZSA/PyAnYXV0bydcbiAgICB9O1xuICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSAhPT0gJ3dvby5wZWFjaHBheS5hcHAnICYmIE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpICE9PSAnc2hvcC5wZWFjaHBheS5hcHAnKSB7XG4gICAgICAgIGNvbnN0IHN0cmlwZUFjY291bnQgPSBhd2FpdCBmZXRjaFN0cmlwZUFjY291bnQoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkpO1xuICAgICAgICBpZiAoc3RyaXBlQWNjb3VudCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RyaXBlRm9yQ2hlY2tpbmdQYXltZW50SW50ZW50ID0gU3RyaXBlKGtleSwgb3B0aW9ucyk7XG4gICAgY29uc3Qgc3RyaXBlID0gU3RyaXBlKGtleSwge1xuICAgICAgICBsb2NhbGU6IG1lc3NhZ2UxLmJyb3dzZXJMb2NhbGUgPz8gJ2F1dG8nXG4gICAgfSk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBzdHJpcGUuZWxlbWVudHMoKTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgICAgY29sb3I6ICcjMzMzJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXG4gICAgICAgICAgICBmb250U21vb3RoaW5nOiAnYW50aWFsaWFzZWQnLFxuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgICc6OnBsYWNlaG9sZGVyJzoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgICAgY29sb3I6ICcjZmE3NTVhJyxcbiAgICAgICAgICAgIGljb25Db2xvcjogJyNmYTc1NWEnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0ICRjYXJkID0gZWxlbWVudHMuY3JlYXRlKCdjYXJkJywge1xuICAgICAgICBzdHlsZSxcbiAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICB9KTtcbiAgICAkY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICRjYXJkLm9uKCdjaGFuZ2UnLCAoZXZlbnQpPT57XG4gICAgICAgICRxcygnI2NhcmQtZXJyb3JzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBldmVudC5lcnJvcj8ubWVzc2FnZSA/PyAnJ1xuICAgICAgICApO1xuICAgIH0pO1xuICAgIGNvbnN0IHN0cmlwZVNlcnZpY2UgPSB7XG4gICAgICAgICRjYXJkLFxuICAgICAgICBlbGVtZW50cyxcbiAgICAgICAgc3RyaXBlLFxuICAgICAgICBzdHJpcGVGb3JQYXltZW50SW50ZW50OiBzdHJpcGVGb3JDaGVja2luZ1BheW1lbnRJbnRlbnQsXG4gICAgICAgIGNyZWF0ZVN0cmlwZUN1c3RvbWVyOiBhZGRDYXJkVG9TdHJpcGVDdXN0b21lcixcbiAgICAgICAgcHJvY2Vzc1BheW1lbnQ6IGFzeW5jIChvcmRlcik9PmF3YWl0IGhhbmRsZVN0cmlwZVBheW1lbnQob3JkZXIpXG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVJbmplY3RlZFByb2Nlc3NQYXltZW50ID0gYXN5bmMgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoIWNoZWNrUmVxdWlyZWRGaWVsZHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGhhbmRsZVByb2Nlc3NQYXltZW50KGV2ZW50LCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpO1xuICAgIH07XG4gICAgaW5pdFN0cmlwZUJ1dHRvbigpO1xuICAgIGluaXRTdHJpcGVQYXltZW50UmVxdWVzdChtZXNzYWdlMSwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJzNEUy1hdXRoZW50aWNhdGlvbi1jb21wbGV0ZScsIGFzeW5jIChtZXNzYWdlKT0+YXdhaXQgb24zRFNDb21wbGV0ZShtZXNzYWdlLnBheW1lbnRJbnRlbnRDbGllbnRTZWNyZXQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSlcbiAgICApO1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3VibWl0UGF5bWVudCcsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBHTE9CQUwuY29tcGxldGVkT3JkZXIgPSBtZXNzYWdlLm9yZGVyO1xuICAgICAgICBhd2FpdCBsZWdhY3lIYW5kbGVTdHJpcGVQYXltZW50KG1lc3NhZ2Uub3JkZXIsIG9yZGVyU2VydmljZSk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtcGF5Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSW5qZWN0ZWRQcm9jZXNzUGF5bWVudCk7XG4gICAgJHFzKCcjcHAtcGF5LW1vYmlsZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUluamVjdGVkUHJvY2Vzc1BheW1lbnQpO1xuICAgICRxcygnI3BwLXBheS1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUluamVjdGVkUHJvY2Vzc1BheW1lbnQpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUHJvY2Vzc1BheW1lbnQoZXZlbnQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHsgJGNhcmQgLCBzdHJpcGUgIH0gPSBzdHJpcGVTZXJ2aWNlO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbFByb2Nlc3NpbmcoKSk7XG4gICAgaWYgKCFFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdHJpcGUuY3JlYXRlVG9rZW4oJGNhcmQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVRva2VuRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lclN0cmlwZUlkKGF3YWl0IGFkZENhcmRUb1N0cmlwZUN1c3RvbWVyKHJlc3VsdC50b2tlbi5pZCwgUGVhY2hQYXlDdXN0b21lci5zdHJpcGVEZXRhaWxzKCkpKSk7XG4gICAgICAgICAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIoUGVhY2hQYXlDdXN0b21lci5zdHJpcGVJZCgpLCByZXN1bHQudG9rZW4uY2FyZC5icmFuZCwgcmVzdWx0LnRva2VuLmNhcmQubGFzdDQsICdzdHJpcGUnKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoYEZhaWxlZCB0b2tlbml6aW5nIG9yIGNyZWF0aW5nIGEgbmV3IHN0cmlwZSBjdXN0b21lciBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfSBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQucGxhY2VPcmRlcigpO1xufVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hTdHJpcGVBY2NvdW50KGRvbWFpbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyBgYXBpL3YxL21lcmNoYW50cy8ke2RvbWFpbn0vc3RyaXBlLWFjY291bnRgKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xufVxuZnVuY3Rpb24gaGFuZGxlVG9rZW5FcnJvcihlcnJvcikge1xuICAgICRxcygnI2NhcmQtZXJyb3JzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlXG4gICAgKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gb24zRFNDb21wbGV0ZShwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0LCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpIHtcbiAgICBjb25zdCB7IHN0cmlwZUZvclBheW1lbnRJbnRlbnQgLCBzdHJpcGUgIH0gPSBzdHJpcGVTZXJ2aWNlO1xuICAgICRxcygnI3N0cmlwZS0zRFMtbW9kYWwnKT8ucmVtb3ZlKCk7XG4gICAgY29uc3QgZ2V0UGF5bWVudEludGVudCA9IGFzeW5jICgpPT57XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICBjb25zdCBpc091clN0b3JlID0gZG9tYWluID09PSAnd29vLnBlYWNocGF5LmFwcCcgfHwgZG9tYWluID09PSAnc2hvcC5wZWFjaHBheS5hcHAnIHx8IGRvbWFpbiA9PT0gJ2xvY2FsaG9zdCcgfHwgZG9tYWluID09PSAnd29vLnN0b3JlLmxvY2FsJyB8fCBkb21haW4gPT09ICdzdG9yZS5sb2NhbCc7XG4gICAgICAgIGlmIChpc091clN0b3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgc3RyaXBlLnJldHJpZXZlUGF5bWVudEludGVudChwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBzdHJpcGVGb3JQYXltZW50SW50ZW50LnJldHJpZXZlUGF5bWVudEludGVudChwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0UGF5bWVudEludGVudCgpO1xuICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnBheW1lbnRJbnRlbnQuc3RhdHVzID09PSAncmVxdWlyZXNfcGF5bWVudF9tZXRob2QnKSB7XG4gICAgICAgIGhhbmRsZTNEU0Vycm9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5wYXltZW50SW50ZW50LnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgJiYgR0xPQkFMLmNvbXBsZXRlZE9yZGVyKSB7XG4gICAgICAgIGNvbnN0IHBheW1lbnRTdGF0dXMgPSBhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKTtcbiAgICAgICAgaWYgKCFwYXltZW50U3RhdHVzLm9rKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwYXltZW50U3RhdHVzLmpzb24oKTtcbiAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMoR0xPQkFMLmNvbXBsZXRlZE9yZGVyLCB7XG4gICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgIHBheW1lbnRUeXBlOiAnU3RyaXBlJyxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSUQ6IHJlc3BvbnNlLmNoYXJnZUlkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGFkZENhcmRUb1N0cmlwZUN1c3RvbWVyKHRva2VuSUQsIGN1c3RvbWVyKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgJ2N1c3RvbWVyX2lkJzogbnVsbCxcbiAgICAgICAgJ2NhcmRfdG9rZW4nOiB0b2tlbklELFxuICAgICAgICAnbmFtZSc6IGN1c3RvbWVyLm5hbWUsXG4gICAgICAgICdlbWFpbCc6IGN1c3RvbWVyLmVtYWlsLFxuICAgICAgICAncGhvbmUnOiBjdXN0b21lci5waG9uZVxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnY2FyZCcsIG9wdGlvbnMpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgcGVhY2hwYXlBbGVydChkYXRhKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIFN0cmlwZSBDdXN0b21lciBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfS4gRXJyb3I6ICR7ZGF0YX1gKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YS5jdXN0b21lcjtcbn1cbmZ1bmN0aW9uIHNob3czRFNlY3VyZU1vZGFsKHVybCkge1xuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5pZCA9ICdzdHJpcGUtM0RTLW1vZGFsJztcbiAgICBpZnJhbWUuY2xhc3NMaXN0LmFkZCgnc3RyaXBlLTNkcy1mcmFtZScpO1xuICAgIGlmcmFtZS5zcmMgPSB1cmw7XG4gICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5hcHBlbmQoaWZyYW1lKTtcbiAgICBzaG93TG9hZGluZ1NjcmVlbigpO1xuICAgIGhpZGVPdGhlclNjcm9sbEJhcnMoKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZTNEU0Vycm9yKCkge1xuICAgIGhpZGVMb2FkaW5nU2NyZWVuKCk7XG4gICAgc2hvd090aGVyU2Nyb2xsQmFycygpO1xuICAgIHBlYWNocGF5QWxlcnQoZ2V0TG9jYWxlVGV4dCgnU29tZXRoaW5nIHdlbnQgd3JvbmcsIGJ1dCB0aGUgcGF5bWVudCBtYXkgaGF2ZSBiZWVuIG1hZGUuIFBsZWFzZSBjaGVjayBiZWZvcmUgcGxhY2luZyBhbm90aGVyIG9yZGVyLicpKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3RyaXBlUGF5bWVudChvcmRlcikge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgIHNlc3Npb25JRDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSxcbiAgICAgICAgc3RyaXBlQ3VzdG9tZXJJRDogUGVhY2hQYXlDdXN0b21lci5zdHJpcGVJZCgpLFxuICAgICAgICBvcmRlcixcbiAgICAgICAgcmV0dXJuVVJMOiBgJHtHTE9CQUwucGhwRGF0YT8ucGx1Z2luX2Fzc2V0X3VybCA/PyAnJ30vcHVibGljL2Rpc3QvJHtHTE9CQUwucGhwRGF0YT8udmVyc2lvbiA/PyAnJ30vY2hlY2tvdXQtbW9kYWwvM2RzLmh0bWxgXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvc2Vzc2lvbi9wYXknLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJztcbn1cbmFzeW5jIGZ1bmN0aW9uIGxlZ2FjeUhhbmRsZVN0cmlwZVBheW1lbnQob3JkZXIsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgIHNlc3Npb25JRDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSxcbiAgICAgICAgc3RyaXBlQ3VzdG9tZXJJRDogUGVhY2hQYXlDdXN0b21lci5zdHJpcGVJZCgpLFxuICAgICAgICBvcmRlcixcbiAgICAgICAgcmV0dXJuVVJMOiBgJHtHTE9CQUwucGhwRGF0YT8ucGx1Z2luX2Fzc2V0X3VybCA/PyAnJ30vcHVibGljL2Rpc3QvJHtHTE9CQUwucGhwRGF0YT8udmVyc2lvbiA/PyAnJ30vY2hlY2tvdXQtbW9kYWwvM2RzLmh0bWxgXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvc2Vzc2lvbi9wYXknLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgc3dpdGNoKHJlc3VsdC5zdGF0dXMpe1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgIGlmICghKGF3YWl0IG9yZGVyU2VydmljZS5zZXRQYXltZW50U3RhdHVzKFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksIHRydWUpKS5vaykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMob3JkZXIsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgICAgICBwYXltZW50VHlwZTogJ1N0cmlwZScsXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JRDogcmVzdWx0LmNoYXJnZUlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXF1aXJlc19hY3Rpb24nOlxuICAgICAgICAgICAgc2hvdzNEU2VjdXJlTW9kYWwocmVzdWx0Py51cmwgPz8gJycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhaWx1cmUnOlxuICAgICAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMob3JkZXIsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd3Yy1mYWlsZWQnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3VsdC5tZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICBwZWFjaHBheUFsZXJ0KHJlc3VsdD8ubWVzc2FnZSA/PyAnJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICB9XG59XG5mdW5jdGlvbiBoaWRlT3RoZXJTY3JvbGxCYXJzKCkge1xuICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnLCAoJGVsZW1lbnQpPT57XG4gICAgICAgIGlmICgkZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzaG93T3RoZXJTY3JvbGxCYXJzKCkge1xuICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnLCAoJGVsZW1lbnQpPT57XG4gICAgICAgIGlmICgkZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoaWRlTG9hZGluZ1NjcmVlbigpIHtcbiAgICAkcXMoJyNsb2FkaW5nJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAkcXMoJyNsb2FkaW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsZXgtY29udGFpbmVyJyk7XG59XG5mdW5jdGlvbiBzaG93TG9hZGluZ1NjcmVlbigpIHtcbiAgICAkcXMoJyNsb2FkaW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAkcXMoJyNsb2FkaW5nJyk/LmNsYXNzTGlzdC5hZGQoJ2ZsZXgtY29udGFpbmVyJyk7XG59XG5sZXQgcGF5cGFsTWVyY2hhbnRJRCA9IG51bGw7XG5jb25zdCBCTl9DT0RFX1NBTkRCT1ggPSAnRkxBVk9Sc2ItNmpvcHY2NTQwMjc1X01QJztcbmNvbnN0IEJOX0NPREVfUFJPRFVDVElPTiA9ICdQZWFjaF9TUF9QUENQJztcbmZ1bmN0aW9uIGluaXRQYXlQYWxFdmVudHMoKSB7XG4gICAgJHFzKCcjcGF5cGFsLW9wdGlvbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBheXBhbFBheW1lbnRPcHRpb24pO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJQYXlQYWxCdXR0b24oUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCkgPT09ICdwYXlwYWwnICYmIEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpID09PSAncGF5bWVudCcgJiYgaXNDdXJyZW5jeVN1cHBvcnRlZEJ5UGF5cGFsKCkpO1xuICAgIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gcGF5cGFsTG9hZFNjcmlwdHMoc2NyaXB0VVJMcykge1xuICAgIGZ1bmN0aW9uIGxvYWQoc2NyaXB0VVJMKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXyk9PntcbiAgICAgICAgICAgIGlmIChwYXlwYWxMb2FkU2NyaXB0cy5sb2FkZWQuaGFzKHNjcmlwdFVSTCkpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHNjcmlwdFVSTDtcbiAgICAgICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5kYXRhUGFydG5lckF0dHJpYnV0aW9uSWQgPSBpc0RldkVudmlyb25tZW50KGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpKSA/IEJOX0NPREVfU0FOREJPWCA6IEJOX0NPREVfUFJPRFVDVElPTjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChzY3JpcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHNjcmlwdFVSTDIgb2Ygc2NyaXB0VVJMcyl7XG4gICAgICAgIHByb21pc2VzLnB1c2gobG9hZChzY3JpcHRVUkwyKSk7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBwYXlwYWxMb2FkU2NyaXB0cy5sb2FkZWQgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzY3JpcHRVUkwxIG9mIHNjcmlwdFVSTHMpe1xuICAgICAgICBwYXlwYWxMb2FkU2NyaXB0cy5sb2FkZWQuYWRkKHNjcmlwdFVSTDEpO1xuICAgIH1cbn1cbnBheXBhbExvYWRTY3JpcHRzLmxvYWRlZCA9IG5ldyBTZXQoKTtcbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYXlQYWxTY3JpcHQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArIGBhcGkvdjEvcGF5cGFsL21lcmNoYW50QW5kQ2xpZW50P21lcmNoYW50SG9zdG5hbWU9JHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX1gLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWVyY2hhbnQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChtZXJjaGFudC5wYXlwYWxNZXJjaGFudElEICE9PSAnJyAmJiBpc0N1cnJlbmN5U3VwcG9ydGVkQnlQYXlwYWwoKSkge1xuICAgICAgICAgICAgcGF5cGFsTWVyY2hhbnRJRCA9IG1lcmNoYW50LnBheXBhbE1lcmNoYW50SUQ7XG4gICAgICAgICAgICBhd2FpdCBwYXlwYWxMb2FkU2NyaXB0cyhbXG4gICAgICAgICAgICAgICAgYGh0dHBzOi8vd3d3LnBheXBhbC5jb20vc2RrL2pzPyZjbGllbnQtaWQ9JHttZXJjaGFudC5jbGllbnRJRH0mbWVyY2hhbnQtaWQ9JHttZXJjaGFudC5wYXlwYWxNZXJjaGFudElEfSZkaXNhYmxlLWZ1bmRpbmc9cGF5bGF0ZXIsY2FyZCxiYW5jb250YWN0LGJsaWssZXBzLGdpcm9wYXksaWRlYWwsbXliYW5rLHAyNCxzb2ZvcnQsbWVyY2Fkb3BhZ28sc2VwYSx2ZW5tbyZjdXJyZW5jeT0ke01lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCl9YCwgXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgRmFpbGVkIHRvIHJldHJpZXZlIHBheXBhbCBtZXJjaGFudCBJZCBvciBsb2FkIFBheXBhbCBTY3JpcHRzIG9uICR7bG9jYXRpb24uaG9zdG5hbWV9LiBQbHVnaW4gTW9kZTogJHtFbnZpcm9ubWVudC5wbHVnaW4ubW9kZSgpfS4gRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGluaXRQYXlQYWxTdXBwb3J0KG1lc3NhZ2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHBheXBhbENoZWNrZWQgPSBtZXNzYWdlLnBocERhdGEucGF5cGFsO1xuICAgIGlmICghcGF5cGFsQ2hlY2tlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGluaXRQYXlQYWxFdmVudHMoKTtcbiAgICBpZiAoIWlzQ3VycmVuY3lTdXBwb3J0ZWRCeVBheXBhbCgpIHx8ICFhd2FpdCBsb2FkUGF5UGFsU2NyaXB0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGF5cGFsTWVyY2hhbnRJRCAmJiBOdW1iZXIucGFyc2VJbnQocGF5cGFsQ2hlY2tlZCA/PyAnMCcpKSB7XG4gICAgICAgIGF3YWl0IGluaXRQYXlQYWxCdXR0b24ob3JkZXJTZXJ2aWNlKTtcbiAgICAgICAgc2hvd1BheVBhbEJ1dHRvbigpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRQYXlQYWxCdXR0b24ob3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgJHBheXBhbEJ1dHRvbiA9IHBheXBhbC5CdXR0b25zKHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGhlaWdodDogNTVcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgY3JlYXRlT3JkZXIgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGNyZWF0ZVBheVBhbE9yZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXBwcm92ZSAoZGF0YSwgYWN0aW9ucykge1xuICAgICAgICAgICAgc2hvd1BheVBhbExvYWRpbmdTcGlubmVyKCk7XG4gICAgICAgICAgICBwbGFjZU9yZGVyT25TdG9yZUFuZExpc3RlbkZvckNvbXBsZXRpb24oZGF0YSwgYWN0aW9ucywgb3JkZXJTZXJ2aWNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tSZXF1aXJlZEZpZWxkcygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJHBheXBhbEJ1dHRvbi5yZW5kZXIoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lcicpO1xuICAgICRwYXlwYWxCdXR0b24ucmVuZGVyKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItbW9iaWxlJyk7XG4gICAgJHBheXBhbEJ1dHRvbi5yZW5kZXIoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1leGlzdGluZycpO1xufVxuZnVuY3Rpb24gcmVzdGFydEFjdGlvbihhY3Rpb25zKSB7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gJ3BheXBhbFJlc3RhcnQnKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnJlc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGF5UGFsT3JkZXIoKSB7XG4gICAgY29uc3QgbW9ja09yZGVyUmVzdWx0ID0ge1xuICAgICAgICBkb21haW46IE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLFxuICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICBudW1iZXI6ICcnLFxuICAgICAgICAgICAgY3VycmVuY3k6IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCksXG4gICAgICAgICAgICBkaXNjb3VudF90b3RhbDogRGVmYXVsdENhcnQudG90YWxBcHBsaWVkQ291cG9ucygpLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBzaGlwcGluZ190b3RhbDogRGVmYXVsdENhcnQudG90YWxTaGlwcGluZygpLnRvRml4ZWQoMiksXG4gICAgICAgICAgICB0b3RhbDogRGVmYXVsdENhcnQudG90YWwoKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgdG90YWxfdGF4OiBHTE9CQUwucGhwRGF0YT8ud2NfcHJpY2VzX2luY2x1ZGVfdGF4ID8gJzAuMDAnIDogRGVmYXVsdENhcnQudG90YWxUYXgoKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgc2hpcHBpbmc6IHBheXBhbEN1c3RvbWVyQWRkcmVzcygpLFxuICAgICAgICAgICAgbGluZV9pdGVtczogZ2V0TGluZUl0ZW1zKCksXG4gICAgICAgICAgICBzaGlwcGluZ19saW5lczogZ2V0U2hpcHBpbmdMaW5lcygpLFxuICAgICAgICAgICAgZmVlX3RvdGFsOiBEZWZhdWx0Q2FydC50b3RhbEFwcGxpZWRGZWVzKCkudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICBvcmRlclJlc3VsdDogbW9ja09yZGVyUmVzdWx0LFxuICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgIHBheXBhbE1lcmNoYW50SURcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnYXBpL3YxL3BheXBhbC9vcmRlcicsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHJlc3VsdC5pZDtcbn1cbmZ1bmN0aW9uIHBheXBhbEN1c3RvbWVyQWRkcmVzcygpIHtcbiAgICBjb25zdCB7IGZpcnN0TmFtZSAsIGxhc3ROYW1lICwgYWRkcmVzczEgLCBhZGRyZXNzMiAsIGNpdHkgLCBzdGF0ZSAsIHBvc3RhbCAsIGNvdW50cnkgLCBwaG9uZSAsIGVtYWlsICwgIH0gPSBQZWFjaFBheUN1c3RvbWVyO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSgpLFxuICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lKCksXG4gICAgICAgIGNvbXBhbnk6ICcnLFxuICAgICAgICBhZGRyZXNzXzE6IGFkZHJlc3MxKCksXG4gICAgICAgIGFkZHJlc3NfMjogYWRkcmVzczIoKSxcbiAgICAgICAgY2l0eTogY2l0eSgpLFxuICAgICAgICBzdGF0ZTogc3RhdGUoKSxcbiAgICAgICAgcG9zdGNvZGU6IHBvc3RhbCgpLFxuICAgICAgICBjb3VudHJ5OiBjb3VudHJ5KCksXG4gICAgICAgIHBob25lOiBwaG9uZSgpLFxuICAgICAgICBlbWFpbDogZW1haWwoKVxuICAgIH07XG59XG5mdW5jdGlvbiBnZXRMaW5lSXRlbXMoKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgRGVmYXVsdENhcnQuY29udGVudHMoKSl7XG4gICAgICAgIGNvbnN0IGxpbmVJdGVtID0ge1xuICAgICAgICAgICAgJ2lkJzogaXRlbS5wcm9kdWN0X2lkLFxuICAgICAgICAgICAgJ25hbWUnOiBpdGVtLm5hbWVfd2l0aF92YXJpYXRpb24gfHwgaXRlbS5uYW1lICsgKGl0ZW0udmFyaWF0aW9uX3RpdGxlID8gYCAtICR7aXRlbS52YXJpYXRpb25fdGl0bGV9YCA6ICcnKSxcbiAgICAgICAgICAgICdxdWFudGl0eSc6IFN0cmluZyhpdGVtLnF1YW50aXR5KSxcbiAgICAgICAgICAgICdzdWJ0b3RhbCc6IFN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChpdGVtLnRvdGFsKSAqIE51bWJlci5wYXJzZUludChpdGVtLnF1YW50aXR5KSksXG4gICAgICAgICAgICAnc3VidG90YWxfdGF4JzogJzAuMDAnXG4gICAgICAgIH07XG4gICAgICAgIGlmIChHTE9CQUwucGhwRGF0YT8ud2NfcHJpY2VzX2luY2x1ZGVfdGF4ICYmIGl0ZW0uZGlzcGxheV9wcmljZSkge1xuICAgICAgICAgICAgbGluZUl0ZW0uc3VidG90YWwgPSBTdHJpbmcoTnVtYmVyLnBhcnNlRmxvYXQoaXRlbS5kaXNwbGF5X3ByaWNlKSAqIE51bWJlci5wYXJzZUludChpdGVtLnF1YW50aXR5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbXMucHVzaChsaW5lSXRlbSk7XG4gICAgfVxuICAgIGlmICghR0xPQkFMLnBocERhdGE/LndjX3ByaWNlc19pbmNsdWRlX3RheCkge1xuICAgICAgICBpdGVtc1swXS5zdWJ0b3RhbF90YXggPSBTdHJpbmcoRGVmYXVsdENhcnQudG90YWxUYXgoKSk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbn1cbmZ1bmN0aW9uIGdldFNoaXBwaW5nTGluZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgMDogKCgpPT57XG4gICAgICAgICAgICBjb25zdCBzaGlwcGluZ0RldGFpbHMgPSBEZWZhdWx0Q2FydC5zZWxlY3RlZFNoaXBwaW5nTWV0aG9kRGV0YWlscygnMCcpO1xuICAgICAgICAgICAgaWYgKCFzaGlwcGluZ0RldGFpbHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtZXRob2RfaWQ6IHNoaXBwaW5nRGV0YWlscy5zZWxlY3RlZF9tZXRob2QsXG4gICAgICAgICAgICAgICAgdG90YWw6IFN0cmluZyhEZWZhdWx0Q2FydC50b3RhbFNoaXBwaW5nKCkpLFxuICAgICAgICAgICAgICAgIG1ldGhvZF90aXRsZTogc2hpcHBpbmdEZXRhaWxzLm1ldGhvZHNbc2hpcHBpbmdEZXRhaWxzLnNlbGVjdGVkX21ldGhvZF0/LnRpdGxlID8/ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihzaG93ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNwaW5uZXJzID0gW1xuICAgICAgICAnI3BheXBhbC1zcGlubmVyJyxcbiAgICAgICAgJyNwYXlwYWwtc3Bpbm5lci1tb2JpbGUnLFxuICAgICAgICAnI3BheXBhbC1zcGlubmVyLWV4aXN0aW5nJywgXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IHNwaW5uZXIgb2Ygc3Bpbm5lcnMpe1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgJHFzKHNwaW5uZXIpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoc3Bpbm5lcik/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYXlwYWxCdXR0b25Db250YWluZXJzID0gW1xuICAgICAgICAnI3BheXBhbC1idXR0b24tY29udGFpbmVyJyxcbiAgICAgICAgJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnLFxuICAgICAgICAnI3BheXBhbC1idXR0b24tY29udGFpbmVyLWV4aXN0aW5nJywgXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBwYXlwYWxCdXR0b25Db250YWluZXJzKXtcbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgICRxcyhjb250YWluZXIpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoY29udGFpbmVyKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxufVxubGV0IGxhdGVzdE9yZGVyQXR0ZW1wdCA9IDA7XG5mdW5jdGlvbiBwbGFjZU9yZGVyT25TdG9yZUFuZExpc3RlbkZvckNvbXBsZXRpb24oZGF0YSwgYWN0aW9ucywgb3JkZXJTZXJ2aWNlKSB7XG4gICAgbGF0ZXN0T3JkZXJBdHRlbXB0Kys7XG4gICAgY29uc3Qgb3JkZXJBdHRlbXB0ID0gbGF0ZXN0T3JkZXJBdHRlbXB0O1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3VibWl0UGF5cGFsT3JkZXInLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgaWYgKGxhdGVzdE9yZGVyQXR0ZW1wdCAhPT0gb3JkZXJBdHRlbXB0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVBheVBhbE9yZGVyV2l0aEZpbmFsQW1vdW50KGRhdGEub3JkZXJJRCwgbWVzc2FnZS5vcmRlcik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcignRXJyb3Igd2hpbGUgdXBkYXRpbmcgUGF5UGFsIG9yZGVyIHdpdGggZmluYWwgYW1vdW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVBheVBhbE9yZGVyV2l0aEZpbmFsQW1vdW50KGRhdGEub3JkZXJJRCwgbWVzc2FnZS5vcmRlcik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIHVwZGF0aW5nIFBheVBhbCBvcmRlciB3aXRoIGZpbmFsIGFtb3VudDogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yMSkpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FwdHVyZSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjYXB0dXJlID0gYXdhaXQgY2FwdHVyZVBheVBhbE9yZGVyKGRhdGEub3JkZXJJRCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yMikge1xuICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGNhcHR1cmluZyBQYXlQYWwgb3JkZXI6ICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcjIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcHR1cmU/LnN0YXR1cyA9PT0gJ0NPTVBMRVRFRCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgZ2V0Q3VzdG9tZXIoKTtcbiAgICAgICAgICAgIGlmIChjdXN0b21lciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNhdmVDdXN0b21lclRvQnJvd3NlcihudWxsLCBudWxsLCBudWxsLCAncGF5cGFsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0cmlwZUN1c3RvbWVySUQgPSBjdXN0b21lci5zdHJpcGVfY3VzdG9tZXJfaWQgPyBjdXN0b21lci5zdHJpcGVfY3VzdG9tZXJfaWQgOiBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRCcmFuZCA9IGN1c3RvbWVyLmNhcmQ/LmJyYW5kID8/IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZExhc3Q0ID0gY3VzdG9tZXIuY2FyZD8ubGFzdDQgPz8gbnVsbDtcbiAgICAgICAgICAgICAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIoc3RyaXBlQ3VzdG9tZXJJRCwgY2FyZEJyYW5kLCBjYXJkTGFzdDQsICdwYXlwYWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGF3YWl0IG9yZGVyU2VydmljZS5zZXRQYXltZW50U3RhdHVzKFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksIHRydWUpKS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uSUQgPSBjYXB0dXJlLnB1cmNoYXNlX3VuaXRzWzBdLnBheW1lbnRzLmNhcHR1cmVzWzBdLmlkO1xuICAgICAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMobWVzc2FnZS5vcmRlciwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ3djLXByb2Nlc3NpbmcnLFxuICAgICAgICAgICAgICAgIHBheW1lbnRUeXBlOiAnUGF5UGFsJyxcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklEXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjYXB0dXJlPy5kZXRhaWxzWzBdLmlzc3VlID09PSAnSU5TVFJVTUVOVF9ERUNMSU5FRCcpIHtcbiAgICAgICAgICAgIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihmYWxzZSk7XG4gICAgICAgICAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5zZXRPcmRlclN0YXR1cyhtZXNzYWdlLm9yZGVyLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnd2MtZmFpbGVkJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBjYXB0dXJlLmRldGFpbHNbMF0uZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdwYXlwYWxBbGVydCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogY2FwdHVyZS5kZXRhaWxzWzBdLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgICAgcmVzdGFydEFjdGlvbihhY3Rpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihmYWxzZSk7XG4gICAgICAgICAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5zZXRPcmRlclN0YXR1cyhtZXNzYWdlLm9yZGVyLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnd2MtZmFpbGVkJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3BheXBhbEFsZXJ0JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJ1xuICAgICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgICAgIHJlc3RhcnRBY3Rpb24oYWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5wbGFjZU9yZGVyKHtcbiAgICAgICAgaXNQYXlwYWw6IHRydWVcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVQYXlQYWxPcmRlcihvcmRlcklEKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL2NhcHR1cmUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG9yZGVySUQsXG4gICAgICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgICAgICBwYXlwYWxNZXJjaGFudElEXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBheVBhbE9yZGVyV2l0aEZpbmFsQW1vdW50KHBheXBhbE9yZGVySUQsIG9yZGVyUmVzdWx0KSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL29yZGVyL3VwZGF0ZScsIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNlc3Npb25JRDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSxcbiAgICAgICAgICAgIHBheXBhbE1lcmNoYW50SUQsXG4gICAgICAgICAgICBwYXlwYWxPcmRlcklELFxuICAgICAgICAgICAgb3JkZXJSZXN1bHRcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuZnVuY3Rpb24gc2hvd1BheVBhbEJ1dHRvbigpIHtcbiAgICAkcXMoJyNzaGlwcGluZy1vcHRpb25zLWNvbnRhaW5lcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdtdC1wYXltZW50Jyk7XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcwLjVyZW0nXG4gICAgKTtcbiAgICAkcXMoJy5mb3JtLXJvdycpPy5jbGFzc0xpc3QucmVtb3ZlKCdtYi1wYXltZW50Jyk7XG4gICAgJHFzKCcjcGF5bWVudC1tZXRob2RzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gJzFyZW0nXG4gICAgKTtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3BheXBhbC1kaXNhYmxlZCcpO1xuICAgICRxcygnI3N0cmlwZS1vcHRpb24nKT8uY2xhc3NMaXN0LmFkZCgncG0tb3B0aW9uLWJsb2NrJyk7XG4gICAgJHFzKCcjY2MtcmVndWxhcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjc3RyaXBlLWJveCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjcGF5cGFsLW9wdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjcHAtcGF5LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdwYXlwYWwtZGlzYWJsZWQtYnRuJyk7XG4gICAgJHFzKCcjcHAtcGF5LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdwcC1wYXktbXQnKTtcbn1cbmZ1bmN0aW9uIHBheXBhbFBheW1lbnRPcHRpb24oKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCgncGF5cGFsJykpO1xufVxuZnVuY3Rpb24gcmVuZGVyUGF5UGFsQnV0dG9uKGRpc3BsYXkpIHtcbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nKT8uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLW9wdGlvbicsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BheXBhbC1wbScsICgkZWxlbWVudCk9PiRlbGVtZW50LmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nKT8ucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgICRxcygnI3BheXBhbC1vcHRpb24nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0ZjRmNCdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFBheXBhbFNjcmlwdHNXaXRoTmV3Q3VycmVuY3koKSB7XG4gICAgYXdhaXQgbG9hZFBheVBhbFNjcmlwdCgpO1xufVxuZnVuY3Rpb24gaXNDdXJyZW5jeVN1cHBvcnRlZEJ5UGF5cGFsKCkge1xuICAgIGNvbnN0IHN1cHBvcnRlZEN1cnJlbmNpZXMgPSBbXG4gICAgICAgICdBVUQnLFxuICAgICAgICAnQ0FEJyxcbiAgICAgICAgJ0NaSycsXG4gICAgICAgICdES0snLFxuICAgICAgICAnRVVSJyxcbiAgICAgICAgJ0hLRCcsXG4gICAgICAgICdIVUYnLFxuICAgICAgICAnSUxTJyxcbiAgICAgICAgJ01YTicsXG4gICAgICAgICdUV0QnLFxuICAgICAgICAnTlpEJyxcbiAgICAgICAgJ05PSycsXG4gICAgICAgICdQSFAnLFxuICAgICAgICAnUExOJyxcbiAgICAgICAgJ0dCUCcsXG4gICAgICAgICdSVUInLFxuICAgICAgICAnU0dEJyxcbiAgICAgICAgJ1NFSycsXG4gICAgICAgICdDSEYnLFxuICAgICAgICAnVEJIJyxcbiAgICAgICAgJ1VTRCcsIFxuICAgIF07XG4gICAgaWYgKHN1cHBvcnRlZEN1cnJlbmNpZXMuaW5jbHVkZXMoTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3BheXBhbCcpIHtcbiAgICAgICAgaWYgKEVudmlyb25tZW50Lm1vZGFsVUkub3BlbigpKSB7XG4gICAgICAgICAgICBwZWFjaHBheUFsZXJ0KCdTb3JyeSwgdGhpcyBjdXJyZW5jeSBpcyBub3Qgc3VwcG9ydGVkIGJ5IFBheVBhbC4gUGxlYXNlIHVzZSBhbm90aGVyIHBheW1lbnQgb3B0aW9uJyk7XG4gICAgICAgICAgICBjb25zdCBwYXlwYWxCdXR0b24gPSAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgaWYgKHBheXBhbEJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHBheXBhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZyk7XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICAgICAgbW9kYWxQYWdlVHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyRXhpc3RzOiBmYWxzZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZVByZWZlcnJlZFBheW1lbnRNZXRob2QoJ3N0cmlwZScpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVQYXlwYWxCdXR0b24oKSB7XG4gICAgYXdhaXQgaW5pdFBheVBhbEJ1dHRvbihnZXRPcmRlclNlcnZpY2UoKSk7XG4gICAgY29uc3QgJGxvY2F0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0aXRsZT1cIlBheVBhbFwiXScpO1xuICAgIGNvbnN0IGxvY2F0aW9ucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRsb2NhdGlvbnMsIDApO1xuICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgbG9jYXRpb25zKXtcbiAgICAgICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdzdHlsZScsIGxvY2F0aW9uLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSArICdoZWlnaHQ6IDU1cHg7Jyk7XG4gICAgfVxuICAgIHNob3dQYXlQYWxCdXR0b24oKTtcbn1cbmZ1bmN0aW9uIGluaXRDdXJyZW5jeVN3aXRjaGVyKCkge1xuICAgIGlmIChGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuQ1VSUkVOQ1lfU1dJVENIRVJfSU5QVVQpKSB7XG4gICAgICAgIHJlbmRlckN1cnJlbmN5U2VsZWN0b3IoKTtcbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgICAgICBzZWxlY3REcm9wZG93bihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHBfY3VycmVuY3lfc2VsZWN0JyksIE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDdXJyZW5jeVNlbGVjdG9yKCkge1xuICAgIGNvbnN0ICRwcmV2aW91c0xvY2F0aW9uID0gJHFzKCcjcHBfY3VycmVuY3lfc2VsZWN0Jyk7XG4gICAgaWYgKCRwcmV2aW91c0xvY2F0aW9uKSB7XG4gICAgICAgICRwcmV2aW91c0xvY2F0aW9uLnJlbW92ZSgpO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW5jaWVzID0gRmVhdHVyZS5tZXRhRGF0YShGZWF0dXJlRmxhZy5DVVJSRU5DWV9TV0lUQ0hFUl9JTlBVVCwgJ2N1cnJlbmNpZXMnKTtcbiAgICBpZiAoY3VycmVuY2llcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0ICRpbnNlcnRpb25Mb2NhdGlvbkV4aXN0aW5nID0gJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtY2FyZCcpO1xuICAgIGNvbnN0ICRpbnNlcnRpb25Mb2NhdGlvbk5ldyA9ICRxcygnI3BheW1lbnQtbWV0aG9kcycpO1xuICAgIGNvbnN0ICRjdXJyZW5jeVNlbGVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0ICRjdXJyZW5jeVNlbGVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAkY3VycmVuY3lTZWxlY3RUaXRsZS5pbm5lckhUTUwgPSAnQ3VycmVuY3knO1xuICAgICRjdXJyZW5jeVNlbGVjdFRpdGxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29sb3ItY2hhbmdlLXRleHQnKTtcbiAgICAkY3VycmVuY3lTZWxlY3REaXYuaWQgPSAncHBfY3VycmVuY3lfc2VsZWN0X2Rpdic7XG4gICAgJGN1cnJlbmN5U2VsZWN0RGl2LmFwcGVuZCgkY3VycmVuY3lTZWxlY3RUaXRsZSk7XG4gICAgY29uc3QgJGN1cnJlbmN5U2VsZWN0RGl2Q2xvbmUgPSAkY3VycmVuY3lTZWxlY3REaXYuY2xvbmVOb2RlKHRydWUpO1xuICAgIGNvbnN0ICRjdXJyZW5jeVNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICRjdXJyZW5jeVNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BwX2N1cnJlbmN5X3NlbGVjdF9leGlzdGluZycpO1xuICAgICRjdXJyZW5jeVNlbGVjdC5pbm5lckhUTUwgPSAnQ3VycmVuY3knO1xuICAgIGNvbnN0ICRjdXJyZW5jeVNlbGVjdENsb25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgJGN1cnJlbmN5U2VsZWN0Q2xvbmUuc2V0QXR0cmlidXRlKCdpZCcsICdwcF9jdXJyZW5jeV9zZWxlY3RfbmV3Jyk7XG4gICAgJGN1cnJlbmN5U2VsZWN0Q2xvbmUuaW5uZXJIVE1MID0gJ0N1cnJlbmN5JztcbiAgICBjb25zdCAkb3B0aW9ucyA9IHJlbmRlckRyb3BEb3duTGlzdChjdXJyZW5jaWVzLCBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29kZSgpKTtcbiAgICBjb25zdCAkb3B0aW9uc0Nsb25lID0gcmVuZGVyRHJvcERvd25MaXN0KGN1cnJlbmNpZXMsIE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCkpO1xuICAgICRjdXJyZW5jeVNlbGVjdC5pbm5lckhUTUwgKz0gJG9wdGlvbnM7XG4gICAgJGN1cnJlbmN5U2VsZWN0Q2xvbmUuaW5uZXJIVE1MICs9ICRvcHRpb25zQ2xvbmU7XG4gICAgJGN1cnJlbmN5U2VsZWN0RGl2LmFwcGVuZCgkY3VycmVuY3lTZWxlY3QpO1xuICAgICRjdXJyZW5jeVNlbGVjdERpdkNsb25lLmFwcGVuZCgkY3VycmVuY3lTZWxlY3RDbG9uZSk7XG4gICAgJGN1cnJlbmN5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGN1cnJlbmN5RXZlbnRMaXN0ZW5lcik7XG4gICAgJGN1cnJlbmN5U2VsZWN0Q2xvbmUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY3VycmVuY3lFdmVudExpc3RlbmVyKTtcbiAgICAkaW5zZXJ0aW9uTG9jYXRpb25FeGlzdGluZz8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRjdXJyZW5jeVNlbGVjdERpdik7XG4gICAgJGluc2VydGlvbkxvY2F0aW9uTmV3Py5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgJGN1cnJlbmN5U2VsZWN0RGl2Q2xvbmUpO1xufVxuZnVuY3Rpb24gc2VuZEN1cnJlbmN5U3dpdGNoTWVzc2FnZShjdXJyZW5jeSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGV2ZW50OiAnY3VycmVuY3lVcGRhdGUnLFxuICAgICAgICBjdXJyZW5jeVxuICAgIH07XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGN1cnJlbmN5RXZlbnRMaXN0ZW5lcihldmVudCkge1xuICAgIGNvbnN0IGN1cnJlbmN5SW5mbyA9IEZlYXR1cmUubWV0YURhdGEoRmVhdHVyZUZsYWcuQ1VSUkVOQ1lfU1dJVENIRVJfSU5QVVQsICdjdXJyZW5jeV9pbmZvJyk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChjdXJyZW5jeUluZm8/Llt0YXJnZXQudmFsdWVdICYmIHRhcmdldC52YWx1ZSAhPT0gTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudEN1cnJlbmN5Q29uZmlnKHtcbiAgICAgICAgICAgIC4uLk1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb25maWd1cmF0aW9uKCksXG4gICAgICAgICAgICBjb2RlOiBjdXJyZW5jeUluZm8/Llt0YXJnZXQudmFsdWVdLmNvZGUgPz8gTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKVxuICAgICAgICB9KSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBzZW5kQ3VycmVuY3lTd2l0Y2hNZXNzYWdlKHRhcmdldC52YWx1ZSk7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRDdXJyZW5jeUNvbmZpZyhjdXJyZW5jeUluZm8/Llt0YXJnZXQudmFsdWVdKSk7XG4gICAgICAgIGlmIChHTE9CQUwucGhwRGF0YT8ucGF5cGFsICYmIEdMT0JBTC5waHBEYXRhPy5wYXlwYWwgIT09ICcwJyAmJiBpc0N1cnJlbmN5U3VwcG9ydGVkQnlQYXlwYWwoKSkge1xuICAgICAgICAgICAgYXdhaXQgcmVsb2FkUGF5cGFsU2NyaXB0c1dpdGhOZXdDdXJyZW5jeSgpO1xuICAgICAgICAgICAgYXdhaXQgcmVjcmVhdGVQYXlwYWxCdXR0b24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZVByZWZlcnJlZFBheW1lbnRNZXRob2QoJ3N0cmlwZScpKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJyNwcF9jdXJyZW5jeV9zZWxlY3RfbmV3JykudmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFN1bW1hcnkobWVzc2FnZSkge1xuICAgIGluaXRTdW1tYXJ5RXZlbnRzKCk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRUYXhDb25maWcoe1xuICAgICAgICBkaXNwbGF5UHJpY2VzSW5DYXJ0QW5kQ2hlY2tvdXQ6IG1lc3NhZ2UucGhwRGF0YT8ud2NfdGF4X3ByaWNlX2Rpc3BsYXkgPT09ICdpbmNsJyA/ICdpbmNsdWRlVGF4JyA6ICdleGNsdWRlVGF4J1xuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGluaXRTdW1tYXJ5RXZlbnRzKCkge1xuICAgICRxcygnI3BwLWRyb3Bkb3duJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3JkZXJTdW1tYXJ5RHJvcGRvd24pO1xuICAgICRxcygnI3BwLWRyb3Bkb3duJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBvcmRlclN1bW1hcnlEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3JkZXJTdW1tYXJ5RHJvcGRvd24pO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJTdW1tYXJpZXMoKTtcbiAgICAgICAgcmVuZGVyQ2FydFRvdGFscygpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyU3VtbWFyaWVzKCkge1xuICAgIGNsZWFyUmVuZGVyZWRTdW1tYXJpZXMoKTtcbiAgICBsZXQgY2FydFN1bW1hcmllc0hUTUwgPSAnJztcbiAgICBmb3IgKGNvbnN0IGNhcnRLZXkgb2YgT2JqZWN0LmtleXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHMpKXtcbiAgICAgICAgbGV0IHN1bW1hcnlIVE1MID0gJyc7XG4gICAgICAgIGNvbnN0IHsgY2FydFN1bW1hcnkgLCBjYXJ0TWV0YSAgfSA9IGNhcnRTdW1tYXJ5Vmlld0RhdGEoY2FydEtleSkoKTtcbiAgICAgICAgY29uc3Qgc3VtbWFyeVRpdGxlSFRNTCA9IGNhcnRLZXkgPT09ICcwJyA/ICcnIDogYFxuPHRyIGNsYXNzPVwic3VtbWFyeS10aXRsZVwiPlxuXHQ8dGQ+UmVjdXJyaW5nIHRvdGFsczwvdGQ+XG5cdDx0ZD48L3RkPlxuPC90cj5gO1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgY2FydFN1bW1hcnkpe1xuICAgICAgICAgICAgc3VtbWFyeUhUTUwgKz0gcmVuZGVyU3VtbWFyeUxpbmUobGluZS5rZXksIGxpbmUudmFsdWUsIGNhcnRNZXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXJ0U3VtbWFyaWVzSFRNTCArPSBgXG48ZGl2IGNsYXNzPVwiY2FydC1zdW1tYXJ5XCIgZGF0YS1jYXJ0LWtleT1cIiR7Y2FydEtleX1cIj5cblx0PHRhYmxlPlxuXHRcdCR7c3VtbWFyeVRpdGxlSFRNTH1cblx0XHQke3N1bW1hcnlIVE1MfVxuXHQ8L3RhYmxlPlxuXHQ8cCBjbGFzcz1cImZpcnN0LXJlbmV3YWwgbXV0ZWRcIj4ke2J1aWxkU3Vic2NyaXB0aW9uRmlyc3RSZW5ld2FsU3RyaW5nKGNhcnRNZXRhKX08L3A+XG48L2Rpdj5gO1xuICAgIH1cbiAgICAkcXMoJyNwcC1zdW1tYXJ5LWxpbmVzLWJvZHknKT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjYXJ0U3VtbWFyaWVzSFRNTCk7XG4gICAgJHFzKCcjcHAtc3VtbWFyeS1saW5lcy1ib2R5LWV4aXN0aW5nJyk/Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY2FydFN1bW1hcmllc0hUTUwpO1xuICAgICRxcygnI3BwLXN1bW1hcnktbGluZXMtYm9keS1tb2JpbGUnKT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjYXJ0U3VtbWFyaWVzSFRNTCk7XG59XG5mdW5jdGlvbiBjbGVhclJlbmRlcmVkU3VtbWFyaWVzKCkge1xuICAgIGZvciAoY29uc3QgJHN1bW1hcnkgb2YgJHFzQWxsKCcuY2FydC1zdW1tYXJ5Jykpe1xuICAgICAgICAkc3VtbWFyeS5yZW1vdmUoKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJTdW1tYXJ5TGluZShuYW1lLCBhbW91bnQsIGNhcnRNZXRhKSB7XG4gICAgbGV0IHByaWNlTWV0YUhUTUwgPSAnJztcbiAgICBpZiAoY2FydE1ldGEuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHByaWNlTWV0YUhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtdXRlZFwiPiR7YnVpbGRTdWJzY3JpcHRpb25QcmljZU1ldGFEYXRhKGNhcnRNZXRhKX08L3NwYW4+YDtcbiAgICB9XG4gICAgcmV0dXJuIGBcbjx0ciBjbGFzcz1cInN1bW1hcnktbGluZVwiIGRhdGEtcmF3LWNvc3Q9XCIke2Ftb3VudH1cIj5cblx0PHRkPiR7bmFtZX08L3RkPlxuXHQ8dGQ+JHtmb3JtYXRDdXJyZW5jeVN0cmluZyhhbW91bnQpfSR7cHJpY2VNZXRhSFRNTH08L3RkPlxuPC90cj5gO1xufVxuZnVuY3Rpb24gb3JkZXJTdW1tYXJ5RHJvcGRvd24oKSB7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA5MDBweCknKS5tYXRjaGVzKSB7XG4gICAgICAgIGxldCBuZXdDdXN0b21lciA9ICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICAgICAgaWYgKG5ld0N1c3RvbWVyID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgIG5ld0N1c3RvbWVyID0gJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICBuZXdDdXN0b21lciA9ICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Q3VzdG9tZXIgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJHFzKCcjZHJvcGRvd24tZG93bi1uZXcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjZHJvcGRvd24tdXAtbmV3Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI29yZGVyLXN1bW1hcnktY29udGVudHMtbmV3Jyk/LmNsYXNzTGlzdC5hZGQoJ29yZGVyLXN1bW1hcnktY29udGVudHMtbmV3LW9wZW5lZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjZHJvcGRvd24tZG93bi1uZXcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjZHJvcGRvd24tdXAtbmV3Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI29yZGVyLXN1bW1hcnktY29udGVudHMtbmV3Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ29yZGVyLXN1bW1hcnktY29udGVudHMtbmV3LW9wZW5lZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBleGlzdGluZyA9ICRxcygnI3BwLWRyb3Bkb3duJyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgIGlmIChleGlzdGluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICRxcygnI3BwLWRyb3Bkb3duJyk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBleGlzdGluZyA9ICRxcygnI3BwLWRyb3Bkb3duJyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BwLWRyb3Bkb3duJyk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIGV4aXN0aW5nID0gJHFzKCcjcHAtZHJvcGRvd24nKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgfVxuICAgIGlmIChleGlzdGluZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICRxcygnLmRyb3Bkb3duLWRvd24nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJy5kcm9wZG93bi11cCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI29yZGVyLXN1bW1hcnktY29udGVudHMnKT8uY2xhc3NMaXN0LmFkZCgnb3JkZXItc3VtbWFyeS1jb250ZW50cy1vcGVuZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5kcm9wZG93bi1kb3duJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcuZHJvcGRvd24tdXAnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNvcmRlci1zdW1tYXJ5LWNvbnRlbnRzJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ29yZGVyLXN1bW1hcnktY29udGVudHMtb3BlbmVkJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ2FydFRvdGFscygpIHtcbiAgICAkcXNBbGwoJy5wcC1zdW1tYXJ5LXRvdGFsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgICApO1xuICAgIGZvciAoY29uc3QgY2FydEtleSBvZiBPYmplY3Qua2V5cyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0cykpe1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVkQ2FydCA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldO1xuICAgICAgICBpZiAoIWNhbGN1bGF0ZWRDYXJ0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJDYXJ0VG90YWwoY2FsY3VsYXRlZENhcnQuc3VtbWFyeS50b3RhbCwgY2FsY3VsYXRlZENhcnQuY2FydF9tZXRhKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDYXJ0VG90YWwodG90YWwsIGNhcnRNZXRhKSB7XG4gICAgaWYgKCFjYXJ0TWV0YS5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgJHFzQWxsKCcucHAtc3VtbWFyeS10b3RhbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCArPSBgPHNwYW4+JHtmb3JtYXRDdXJyZW5jeVN0cmluZyh0b3RhbCl9PC9zcGFuPmBcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5wcC1zdW1tYXJ5LXRvdGFsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MICs9IGAgPHNwYW4gY2xhc3M9XCJtdXRlZFwiPiArIDwvc3Bhbj48c3BhbiBjbGFzcz1cIm11dGVkXCI+JHtmb3JtYXRDdXJyZW5jeVN0cmluZyh0b3RhbCl9JHtidWlsZFN1YnNjcmlwdGlvblByaWNlTWV0YURhdGEoY2FydE1ldGEsIHRydWUpfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdE1vZGFsKCkge1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICBpZiAoRW52aXJvbm1lbnQubW9kYWxVSS5vcGVuKCkpIHtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKCFFbnZpcm9ubWVudC5tb2RhbFVJLm9wZW4oKSkge1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyQnV0dG9uQ29sb3JUaGVtZShFbnZpcm9ubWVudC5wbHVnaW4uYnV0dG9uQ29sb3IoKSk7XG4gICAgICAgIHJlbmRlclRlc3RNb2RlQmFubmVyRGlzcGxheShFbnZpcm9ubWVudC50ZXN0TW9kZSgpKTtcbiAgICAgICAgcmVuZGVyTW9kYWxQYWdlSW5kaWNhdG9yKEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpKTtcbiAgICAgICAgcmVuZGVyTW9kYWxOYXZpZ2F0aW9uKEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpKTtcbiAgICAgICAgcmVuZGVyQ29udGludWVCdXR0b25EaXNwbGF5KEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpKTtcbiAgICAgICAgcmVuZGVyQ29udGludWVCdXR0b25Mb2FkaW5nKEVudmlyb25tZW50Lm1vZGFsVUkubG9hZGluZ01vZGUoKSk7XG4gICAgICAgIHJlbmRlckluZm9QYWdlRGlzcGxheShFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSk7XG4gICAgICAgIHJlbmRlclBheW1lbnRQYWdlRGlzcGxheShFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSwgRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSwgRW52aXJvbm1lbnQuY3VzdG9tZXIubW9iaWxlKCkpO1xuICAgICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKFBlYWNoUGF5T3JkZXIuZXJyb3JNZXNzYWdlKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnVUk6Om1vZGFsT3BlbmVkJywgKF8pPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgICAgIG1vZGFsSXNPcGVuOiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ1VJOjptb2RhbENsb3NlZCcsIChfKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICBtb2RhbElzT3BlbjogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnaGlkZUNvbnRpbnVlU3Bpbm5lcicsIChfKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnYnV0dG9uQ2xpY2tlZCcsIGFzeW5jICgpPT57XG4gICAgICAgIG9wZW5DaGVja291dE1vZGFsKCk7XG4gICAgICAgIHZhbGlkYXRlQ2FydEl0ZW1zV2l0aEN1c3RvbWVyKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCksIHRydWUpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbighRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdzdG9wUGF5bWVudFByb2Nlc3NpbmdBbmltYXRpb25zJywgKG1lc3NhZ2UpPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGlmIChtZXNzYWdlLmNsb3NlTW9kYWwpIHtcbiAgICAgICAgICAgIHJlcXVlc3RDbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRPcmRlckVycm9yKG1lc3NhZ2UuZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkcXMoJy5wcC1leGl0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVxdWVzdENsb3NlTW9kYWwpO1xuICAgICRxcygnLnBwLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVxdWVzdENsb3NlTW9kYWwpO1xuICAgICRxcygnI2VkaXQtaW5mbycpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tUb0luZm8pO1xuICAgIGZvciAoY29uc3QgJGVsZW1lbnQxIG9mICRxc0FsbCgnLnBwLWJhY2stdG8taW5mbycpKXtcbiAgICAgICAgJGVsZW1lbnQxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvSW5mbyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGlzcGxheUVycm9yTWVzc2FnZShlcnJvck1lc3NhZ2UpIHtcbiAgICBpZiAoZXJyb3JNZXNzYWdlICE9PSAnJykge1xuICAgICAgICAkcXMoJyNzaGlwcGluZy1vcHRpb25zLWNvbnRhaW5lcicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLXBheW1lbnQtZm9ybScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BheW1lbnQtbWV0aG9kcycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQzIG9mICRxc0FsbCgnLnBheS1idXR0b24tY29udGFpbmVyJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50MiBvZiAkcXNBbGwoJy5oaWRlLXdoZW4taW52YWxpZCcpKXtcbiAgICAgICAgICAgICRlbGVtZW50Mi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlLWV4aXN0aW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGVycm9yTWVzc2FnZVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3NoaXBwaW5nLW9wdGlvbnMtY29udGFpbmVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtcGF5bWVudC1mb3JtJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcGF5bWVudC1tZXRob2RzJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5wYXktYnV0dG9uLWNvbnRhaW5lcicpKXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50NSBvZiAkcXNBbGwoJy5oaWRlLXdoZW4taW52YWxpZCcpKXtcbiAgICAgICAgICAgICRlbGVtZW50NS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlLWV4aXN0aW5nJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBvcGVuQ2hlY2tvdXRNb2RhbCgpIHtcbiAgICB3aW5kb3cudG9wPy5wb3N0TWVzc2FnZSgnb3Blbk1vZGFsJywgJyonKTtcbn1cbmZ1bmN0aW9uIHJlcXVlc3RDbG9zZU1vZGFsKCkge1xuICAgIHN5bmNPcmRlck5vdGVzKHRydWUpO1xuICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKCdjbG9zZU1vZGFsJywgJyonKTtcbn1cbmZ1bmN0aW9uIGJhY2tUb0luZm8oKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICBtb2RhbFBhZ2VUeXBlOiAnaW5mbycsXG4gICAgICAgIGN1c3RvbWVyRXhpc3RzOiBmYWxzZVxuICAgIH0pKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lckFkZHJlc3NWYWxpZGF0aW9uKGZhbHNlKSk7XG4gICAgc3luY09yZGVyTm90ZXMoKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckNvbnRpbnVlQnV0dG9uRGlzcGxheShtb2RhbFBhZ2UpIHtcbiAgICBpZiAobW9kYWxQYWdlID09PSAnaW5mbycpIHtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZS1tb2JpbGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUtbW9iaWxlJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDb250aW51ZUJ1dHRvbkxvYWRpbmcobG9hZGluZ01vZGUpIHtcbiAgICBpZiAobG9hZGluZ01vZGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZS1tb2JpbGUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjY29udGludWUtc3Bpbm5lcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NvbnRpbnVlLXNwaW5uZXItbW9iaWxlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUtbW9iaWxlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNjb250aW51ZS1zcGlubmVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY29udGludWUtc3Bpbm5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlck1vZGFsTmF2aWdhdGlvbihtb2RhbFBhZ2UpIHtcbiAgICBpZiAobW9kYWxQYWdlID09PSAnaW5mbycpIHtcbiAgICAgICAgJHFzKCcucHAtZXhpdCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcucHAtYmFjay10by1pbmZvJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RhbFBhZ2UgPT09ICdwYXltZW50Jykge1xuICAgICAgICAkcXMoJy5wcC1leGl0Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5wcC1iYWNrLXRvLWluZm8nKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJNb2RhbFBhZ2VJbmRpY2F0b3IobW9kYWxQYWdlKSB7XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICRxcygnLmNvbG9yLWNoYW5naW5nLWluZm8nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjaGVja291dC1zdGF0dXMnKT8uY2xhc3NMaXN0LmFkZCgnY2lyY2xlLWxvZ28tb25lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcuY29sb3ItY2hhbmdpbmctaW5mbycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NoZWNrb3V0LXN0YXR1cycpPy5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGUtbG9nby1vbmUnKTtcbiAgICB9XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgICRxcygnLmNvbG9yLWNoYW5naW5nLXBheW1lbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjaGVja291dC1zdGF0dXMnKT8uY2xhc3NMaXN0LmFkZCgnY2lyY2xlLWxvZ28tdHdvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcuY29sb3ItY2hhbmdpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NoZWNrb3V0LXN0YXR1cycpPy5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGUtbG9nby10d28nKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJUZXN0TW9kZUJhbm5lckRpc3BsYXkodGVzdE1vZGUpIHtcbiAgICBpZiAodGVzdE1vZGUpIHtcbiAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QuYWRkKCd0ZXN0LW1vZGUtYm9yZGVyJyk7XG4gICAgICAgICRxcygnLnRlc3QtbW9kZS1iYW5uZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9ICcxLjI1cmVtJ1xuICAgICAgICApO1xuICAgICAgICAkcXMoJy5wcC1jbG9zZScsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLnRvcCA9ICcwLjhyZW0nXG4gICAgICAgICk7XG4gICAgICAgICRxcygnLnBwLWNsb3NlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUucmlnaHQgPSAnNHB4J1xuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckJ1dHRvbkNvbG9yVGhlbWUoY29sb3IgPSAnI0ZGODc2QycpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tcGVhY2hwYXktdGhlbWUtY29sb3InLCBjb2xvcik7XG59XG5mdW5jdGlvbiByZW5kZXJQYXltZW50UGFnZURpc3BsYXkobW9kYWxQYWdlLCBleGlzdGluZ0N1c3RvbWVyLCBpc01vYmlsZSkge1xuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdwYXltZW50Jykge1xuICAgICAgICBpZiAoZXhpc3RpbmdDdXN0b21lcikge1xuICAgICAgICAgICAgJHFzKCcjcHAtbmV3LWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI3BwLWV4aXN0aW5nLWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LmFkZCgnY29sJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ3ctZXhpc3RpbmctY2hlY2tvdXQnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LmFkZCgncC0xLTUnKTtcbiAgICAgICAgICAgICRxcygnLm9yZGVyLXN1bW1hcnktaGVhZGluZycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1zdW1tYXJ5LWJvZHknLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b20gPSAnbm9uZSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50NiBvZiAkcXNBbGwoJy5zcGxpdCcpKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudDYuc3R5bGUuc2V0UHJvcGVydHkoJ2Zsb2F0JywgJ2xlZnQnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjcHAtZXhpc3RpbmctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdjb2wnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgndy1leGlzdGluZy1jaGVja291dCcpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdwLTEtNScpO1xuICAgICAgICB9XG4gICAgICAgICRxcygnI2V4dHJhLWZpZWxkcy1zZWN0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgICAgICAgICRxcygnI2V4dHJhLWZpZWxkcy1zZWN0aW9uJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJy5vcmRlci1zdW1tYXJ5LWhlYWRpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1leGlzdGluZy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnY29sJyk7XG4gICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgndy1leGlzdGluZy1jaGVja291dCcpO1xuICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3AtMS01Jyk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVySW5mb1BhZ2VEaXNwbGF5KG1vZGFsUGFnZSkge1xuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdpbmZvJykge1xuICAgICAgICAkcXMoJyNwcC1pbmZvJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5zcGxpdCcpKXtcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCdmbG9hdCcsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtaW5mbycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdE1ldHJpY3MoKSB7XG4gICAgJHFzKCcjcHAtcGF5Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnJlY29yZE5vblBQQnV0dG9uQ2xpY2soJ3BwLXBheScpXG4gICAgKTtcbiAgICAkcXMoJyNwcC1wYXktbW9iaWxlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnJlY29yZE5vblBQQnV0dG9uQ2xpY2soJ3BwLXBheS1tb2JpbGUnKVxuICAgICk7XG4gICAgJHFzKCcjcHAtcGF5LWV4aXN0aW5nJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnJlY29yZE5vblBQQnV0dG9uQ2xpY2soJ3BwLXBheS1leGlzdGluZycpXG4gICAgKTtcbiAgICAkcXMoJyNwcC1jb250aW51ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5yZWNvcmROb25QUEJ1dHRvbkNsaWNrKCdwcC1jb250aW51ZScpXG4gICAgKTtcbiAgICAkcXMoJyNwcC1jb250aW51ZS1tb2JpbGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+cmVjb3JkTm9uUFBCdXR0b25DbGljaygncHAtY29udGludWUtbW9iaWxlJylcbiAgICApO1xuICAgIG9uV2luZG93TWVzc2FnZSgnYnV0dG9uQ2xpY2tlZCcsIChtZXNzYWdlKT0+e1xuICAgICAgICByZWNvcmRCdXR0b25DbGljayhidXR0b25UeXBlVmFsaWRhdGlvbihtZXNzYWdlLmJ1dHRvbklEKSwgZ2V0UFBCdXR0b25Mb2NhdGlvbihtZXNzYWdlKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBidXR0b25UeXBlVmFsaWRhdGlvbihidXR0b25UeXBlKSB7XG4gICAgcmV0dXJuIGJ1dHRvblR5cGUgPT09IHVuZGVmaW5lZCA/ICd1bmtub3duJyA6IGJ1dHRvblR5cGU7XG59XG5mdW5jdGlvbiByZWNvcmROb25QUEJ1dHRvbkNsaWNrKGJ1dHRvblR5cGUpIHtcbiAgICByZWNvcmRCdXR0b25DbGljayhidXR0b25UeXBlLCBQUEJ1dHRvbkxvY2F0aW9uLk5vdEFwcGxpY2FibGUpO1xufVxuZnVuY3Rpb24gcmVjb3JkQnV0dG9uQ2xpY2soYnV0dG9uVHlwZSwgcHBCdXR0b25Mb2NhdGlvbikge1xuICAgIHBvc3RCdXR0b25NZXRyaWNzKHtcbiAgICAgICAgZG9tYWluOiBNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSxcbiAgICAgICAgYnV0dG9uVHlwZSxcbiAgICAgICAgcHBCdXR0b25Mb2NhdGlvbixcbiAgICAgICAgaXNNb2JpbGU6IEVudmlyb25tZW50LmN1c3RvbWVyLm1vYmlsZSgpLFxuICAgICAgICBpc1Rlc3RNb2RlOiBFbnZpcm9ubWVudC50ZXN0TW9kZSgpXG4gICAgfSk7XG59XG52YXIgUFBCdXR0b25Mb2NhdGlvbjtcbihmdW5jdGlvbihQUEJ1dHRvbkxvY2F0aW9uMSkge1xuICAgIFBQQnV0dG9uTG9jYXRpb24xW1wiUHJvZHVjdFwiXSA9ICdwcm9kdWN0JztcbiAgICBQUEJ1dHRvbkxvY2F0aW9uMVtcIkNoZWNrb3V0XCJdID0gJ2NoZWNrb3V0JztcbiAgICBQUEJ1dHRvbkxvY2F0aW9uMVtcIk1pbmlDYXJ0XCJdID0gJ21pbmktY2FydCc7XG4gICAgUFBCdXR0b25Mb2NhdGlvbjFbXCJDYXJ0XCJdID0gJ2NhcnQnO1xuICAgIFBQQnV0dG9uTG9jYXRpb24xW1wiTm90QXBwbGljYWJsZVwiXSA9ICdub3QtYXBwbGljYWJsZSc7XG59KShQUEJ1dHRvbkxvY2F0aW9uIHx8IChQUEJ1dHRvbkxvY2F0aW9uID0ge30pKTtcbmZ1bmN0aW9uIGdldFBQQnV0dG9uTG9jYXRpb24obWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLmlzTWluaUNhcnQpIHtcbiAgICAgICAgcmV0dXJuIFBQQnV0dG9uTG9jYXRpb24uTWluaUNhcnQ7XG4gICAgfVxuICAgIHN3aXRjaChFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSl7XG4gICAgICAgIGNhc2UgJ2NhcnQnOlxuICAgICAgICAgICAgcmV0dXJuIFBQQnV0dG9uTG9jYXRpb24uQ2FydDtcbiAgICAgICAgY2FzZSAnY2hlY2tvdXQnOlxuICAgICAgICAgICAgcmV0dXJuIFBQQnV0dG9uTG9jYXRpb24uQ2hlY2tvdXQ7XG4gICAgICAgIGNhc2UgJ3Byb2R1Y3QnOlxuICAgICAgICAgICAgcmV0dXJuIFBQQnV0dG9uTG9jYXRpb24uUHJvZHVjdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBQUEJ1dHRvbkxvY2F0aW9uLk5vdEFwcGxpY2FibGU7XG4gICAgfVxufVxuZnVuY3Rpb24gcG9zdEJ1dHRvbk1ldHJpY3Mob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5pc1Rlc3RNb2RlKSB7XG4gICAgICAgIGZldGNoKGBodHRwczovLzJmYWQ2dzNleGcuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdjEvYnV0dG9uc3RhdHM/ZG9tYWluPSR7b3B0aW9ucy5kb21haW59JmJ1dHRvblR5cGU9JHtvcHRpb25zLmJ1dHRvblR5cGV9JnBwQnV0dG9uTG9jYXRpb249JHtTdHJpbmcob3B0aW9ucy5wcEJ1dHRvbkxvY2F0aW9uKX0maXNNb2JpbGU9JHtTdHJpbmcob3B0aW9ucy5pc01vYmlsZSl9JmlzUHJvZHVjdGlvbkRhdGE9JHtTdHJpbmcoaXNQcm9kdWN0aW9uRG9tYWluKG9wdGlvbnMuZG9tYWluKSl9YCkudGhlbigoKT0+e30pLmNhdGNoKCgpPT57fSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNQcm9kdWN0aW9uRG9tYWluKGRvbWFpbikge1xuICAgIHN3aXRjaChkb21haW4pe1xuICAgICAgICBjYXNlICdsb2NhbGhvc3QnOlxuICAgICAgICBjYXNlICcxMjcuMC4wLjEnOlxuICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgIGNhc2UgJ3dvby5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUyLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMy5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTQucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWU1LnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3FhLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ2RlbW8ucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmNvbnN0IGRlZmF1bHRGb3JtSFRNTCA9IGA8Zm9ybSBpZD1cInBwLWluZm8tZm9ybVwiPlxuPGgyPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInBlcnNvbmFsXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwiZW1haWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiZW1haWxcIiBkYXRhLWkxOG49XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicGhvbmVcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGVsXCIgbmFtZT1cInBob25lXCIgcGxhY2Vob2xkZXI9XCIgXCJyZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicGhvbmVcIiBkYXRhLWkxOG49XCJwaG9uZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9maXJzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfZmlyc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9maXJzdFwiIGRhdGEtaTE4bj1cImZpcnN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHRcdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9sYXN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9sYXN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfbGFzdFwiIGRhdGEtaTE4bj1cImxhc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48aDIgY2xhc3M9XCJzaGlwcGluZy1hZGRyZXNzLWhlYWRlclwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInNoaXBwaW5nXCI+PC9zcGFuPjwvaDI+XG48aDIgY2xhc3M9XCJiaWxsaW5nLWFkZHJlc3MtaGVhZGVyIGhpZGVcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJiaWxsaW5nXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTcwXCI+XG5cdFx0PGlucHV0IGlkPVwiYWRkcmVzczFcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJhZGRyZXNzMVwiIGRhdGEtaTE4bj1cInN0cmVldFwiIGNsYXNzPVwiZm9ybS1sYWJlbCBmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctMzBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJhZGRyZXNzMlwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MyXCIgcGxhY2Vob2xkZXI9XCIgXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCI+XG5cdFx0PGxhYmVsIGZvcj1cImFkZHJlc3MyXCIgZGF0YS1pMThuPVwiYXB0XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwb3N0YWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJwb3N0YWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicG9zdGFsXCIgZGF0YS1pMThuPVwicG9zdGFsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJjaXR5XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJjaXR5XCIgZGF0YS1pMThuPVwiY2l0eVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicHJvdmluY2VcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJvZmZcIiBwbGFjZWhvbGRlcj1cIiBcIj5cblx0XHQ8bGFiZWwgZm9yPVwicHJvdmluY2VcIiBjbGFzcz1cImZvcm0tbGFiZWxcIiBkYXRhLWkxOG49XCJwcm92aW5jZVwiPjwvbGFiZWw+XG5cdFx0PHNlbGVjdCBpZD1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJ3LTEwMCBzZWxlY3QgaGlkZVwiIG5hbWU9XCJzdGF0ZVwiIHNpemU9XCIxXCI+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT48L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWwgaGlkZVwiIGRhdGEtaTE4bj1cInN0YXRlXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8c2VsZWN0IGlkPVwiY291bnRyeVwiIGNsYXNzPVwidy0xMDBcIiBuYW1lPVwiY291bnRyeVwiIHNpemU9XCIxXCIgcmVxdWlyZWQ+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZSBkYXRhLWkxOG49XCJjb3VudHJ5XCI+PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImNvdW50cnlcIiBkYXRhLWkxOG49XCJjb3VudHJ5LWxhYmVsXCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgaWQ9XCJjaGVja291dC1kZWxpdmVyeS1kYXRlXCIgY2xhc3M9XCJoaWRlXCI+XG5cdDxoMiBkYXRhLWkxOG49XCJEZWxpdmVyeSBkYXRlXCI+PC9oMj5cblx0PGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkZWxpdmVyeS1kYXRlXCIgbmFtZT1cImRlbGl2ZXJ5LWRhdGVcIiB2YWx1ZT1cIlwiIG1pbj1cIlwiPlxuPC9kaXY+XG48L2Zvcm0+YDtcbmNvbnN0IGphcGFuZXNlRm9ybUhUTUwgPSBgPGZvcm0gaWQ9XCJwcC1pbmZvLWZvcm1cIj5cbjxoMj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJwZXJzb25hbFwiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cImVtYWlsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImVtYWlsXCIgZGF0YS1pMThuPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInBob25lXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRlbFwiIG5hbWU9XCJwaG9uZVwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJwaG9uZVwiIGRhdGEtaTE4bj1cInBob25lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2xhc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiAgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9sYXN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfbGFzdFwiIGRhdGEtaTE4bj1cImxhc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9maXJzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfZmlyc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9maXJzdFwiIGRhdGEtaTE4bj1cImZpcnN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGgyIGNsYXNzPVwic2hpcHBpbmctYWRkcmVzcy1oZWFkZXJcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJzaGlwcGluZ1wiPjwvc3Bhbj48L2gyPlxuPGgyIGNsYXNzPVwiYmlsbGluZy1hZGRyZXNzLWhlYWRlciBoaWRlXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwiYmlsbGluZ1wiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxzZWxlY3QgaWQ9XCJjb3VudHJ5XCIgY2xhc3M9XCJ3LTEwMFwiIG5hbWU9XCJjb3VudHJ5XCIgc2l6ZT1cIjFcIiByZXF1aXJlZD5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlIGRhdGEtaTE4bj1cInNlbGVjdC1jb3VudHJ5XCI+PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImNvdW50cnlcIiBkYXRhLWkxOG49XCJjb3VudHJ5LWxhYmVseVwiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicG9zdGFsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwicG9zdGFsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInBvc3RhbFwiIGRhdGEtaTE4bj1cInBvc3RhbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicHJvdmluY2VcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJvZmZcIiBwbGFjZWhvbGRlcj1cIiBcIj5cblx0XHQ8bGFiZWwgZm9yPVwicHJvdmluY2VcIiBjbGFzcz1cImZvcm0tbGFiZWxcIiBkYXRhLWkxOG49XCJwcm92aW5jZVwiPjwvbGFiZWw+XG5cdFx0PHNlbGVjdCBpZD1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJ3LTEwMCBzZWxlY3QgaGlkZVwiIG5hbWU9XCJzdGF0ZVwiIHNpemU9XCIxXCI+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT5TdGF0ZTwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbCBoaWRlXCI+UmVnaW9uPC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJjaXR5XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJjaXR5XCIgZGF0YS1pMThuPVwiY2l0eVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTcwXCI+XG5cdFx0PGlucHV0IGlkPVwiYWRkcmVzczFcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJhZGRyZXNzMVwiIGRhdGEtaTE4bj1cInN0cmVldFwiIGNsYXNzPVwiZm9ybS1sYWJlbCBmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctMzBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJhZGRyZXNzMlwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MyXCIgcGxhY2Vob2xkZXI9XCIgXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCI+XG5cdFx0PGxhYmVsIGZvcj1cImFkZHJlc3MyXCIgZGF0YS1pMThuPVwiYXB0XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgaWQ9XCJjaGVja291dC1kZWxpdmVyeS1kYXRlXCIgY2xhc3M9XCJoaWRlXCI+XG5cdDxoMiBkYXRhLWkxOG49XCJEZWxpdmVyeSBkYXRlXCI+PC9oMj5cblx0PGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkZWxpdmVyeS1kYXRlXCIgbmFtZT1cImRlbGl2ZXJ5LWRhdGVcIiB2YWx1ZT1cIlwiIG1pbj1cIlwiPlxuPC9kaXY+XG48L2Zvcm0+YDtcbmNvbnN0IGNoZWNrb3V0Rm9ybU5vUGhvbmVOb0FwdCA9IGA8Zm9ybSBpZD1cInBwLWluZm8tZm9ybVwiPlxuPGgyPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInBlcnNvbmFsXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8aW5wdXQgaWQ9XCJlbWFpbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHQ8bGFiZWwgZm9yPVwiZW1haWxcIiBkYXRhLWkxOG49XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2ZpcnN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9maXJzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2ZpcnN0XCIgZGF0YS1pMThuPVwiZmlyc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2xhc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2xhc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9sYXN0XCIgZGF0YS1pMThuPVwibGFzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxoMiBjbGFzcz1cInNoaXBwaW5nLWFkZHJlc3MtaGVhZGVyXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwic2hpcHBpbmdcIj48L3NwYW4+PC9oMj5cbjxoMiBjbGFzcz1cImJpbGxpbmctYWRkcmVzcy1oZWFkZXIgaGlkZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cImJpbGxpbmdcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxpbnB1dCBpZD1cImFkZHJlc3MxXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczFcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0PGxhYmVsIGZvcj1cImFkZHJlc3MxXCIgZGF0YS1pMThuPVwic3RyZWV0XCIgY2xhc3M9XCJmb3JtLWxhYmVsIGZvcm0tbGFiZWxcIj48L2xhYmVsPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicG9zdGFsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwicG9zdGFsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInBvc3RhbFwiIGRhdGEtaTE4bj1cInBvc3RhbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwiY2l0eVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiY2l0eVwiIGRhdGEtaTE4bj1cImNpdHlcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInByb3ZpbmNlXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwib2ZmXCIgcGxhY2Vob2xkZXI9XCIgXCI+XG5cdFx0PGxhYmVsIGZvcj1cInByb3ZpbmNlXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCIgZGF0YS1pMThuPVwicHJvdmluY2VcIj48L2xhYmVsPlxuXHRcdDxzZWxlY3QgaWQ9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwidy0xMDAgc2VsZWN0IGhpZGVcIiBuYW1lPVwic3RhdGVcIiBzaXplPVwiMVwiPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWU+PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsIGhpZGVcIiBkYXRhLWkxOG49XCJzdGF0ZVwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PHNlbGVjdCBpZD1cImNvdW50cnlcIiBjbGFzcz1cInctMTAwXCIgbmFtZT1cImNvdW50cnlcIiBzaXplPVwiMVwiIHJlcXVpcmVkPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWUgZGF0YS1pMThuPVwiY291bnRyeVwiPjwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJjb3VudHJ5XCIgZGF0YS1pMThuPVwiY291bnRyeS1sYWJlbFwiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGlkPVwiY2hlY2tvdXQtZGVsaXZlcnktZGF0ZVwiIGNsYXNzPVwiaGlkZVwiPlxuXHQ8aDIgZGF0YS1pMThuPVwiRGVsaXZlcnkgZGF0ZVwiPjwvaDI+XG5cdDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZGVsaXZlcnktZGF0ZVwiIG5hbWU9XCJkZWxpdmVyeS1kYXRlXCIgdmFsdWU9XCJcIiBtaW49XCJcIj5cbjwvZGl2PlxuPC9mb3JtPmA7XG5mdW5jdGlvbiBpbml0TGlua2VkUHJvZHVjdHMoKSB7XG4gICAgJHFzKCcucHJldi1idG4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxMZWZ0KTtcbiAgICAkcXMoJy5uZXh0LWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFJpZ2h0KTtcbiAgICAkcXMoJyNwcm9kdWN0cy1saXN0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbEFkanVzdGVyKTtcbiAgICBsZXQgcHJldmlvdXNDYXJ0RGF0YSA9ICcnO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICBpZiAoRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdwcm9kdWN0JyB8fCBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ2NhcnQnKSB7XG4gICAgICAgICAgICBjb25zdCBjYXJ0RGF0YSA9IEpTT04uc3RyaW5naWZ5KERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpO1xuICAgICAgICAgICAgaWYgKGNhcnREYXRhICE9PSBwcmV2aW91c0NhcnREYXRhKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNDYXJ0RGF0YSA9IGNhcnREYXRhO1xuICAgICAgICAgICAgICAgIHJlbmRlckxpbmtlZFByb2R1Y3RzKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpO1xuICAgICAgICAgICAgICAgIHNldEFkZEJ1dHRvbkNvbG9yKEVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gY2xlYXJMaW5rZWRQcm9kdWN0cygpIHtcbiAgICBmb3IgKGNvbnN0IGxpbmtlZEl0ZW0gb2YgJHFzQWxsKCcucHJvZHVjdC1ib2R5Jykpe1xuICAgICAgICBsaW5rZWRJdGVtLnJlbW92ZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldEFkZEJ1dHRvbkNvbG9yKGNvbG9yID0gJyNGRjg3NkMnKSB7XG4gICAgZm9yIChjb25zdCBhZGRCdG4gb2YgJHFzQWxsKCcuYWRkLWJ0bicpKXtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgICBhZGRCdG4uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCcgKyBjb2xvcjtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJMaW5rZWRQcm9kdWN0cyhjYXJ0KSB7XG4gICAgY2xlYXJMaW5rZWRQcm9kdWN0cygpO1xuICAgIGZvcihsZXQgaSA9IGNhcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgICBjb25zdCBpdGVtID0gY2FydFtpXTtcbiAgICAgICAgbGV0IGxpbmtlZFByb2R1Y3RzO1xuICAgICAgICBpZiAoRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdwcm9kdWN0JyAmJiAhaXRlbS5pc19wYXJ0X29mX2J1bmRsZSAmJiBpdGVtLnVwc2VsbF9pdGVtcykge1xuICAgICAgICAgICAgbGlua2VkUHJvZHVjdHMgPSBpdGVtLnVwc2VsbF9pdGVtcztcbiAgICAgICAgfSBlbHNlIGlmIChFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ2NhcnQnICYmICFpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlICYmIGl0ZW0uY3Jvc3Nfc2VsbF9pdGVtcykge1xuICAgICAgICAgICAgbGlua2VkUHJvZHVjdHMgPSBpdGVtLmNyb3NzX3NlbGxfaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbmtlZFByb2R1Y3RzKSB7XG4gICAgICAgICAgICAkcXMoJyNsaW5rZWQtcHJvZHVjdHMtc2VjdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpbmtlZEl0ZW0gb2YgbGlua2VkUHJvZHVjdHMpe1xuICAgICAgICAgICAgICAgIGlmIChsaW5rZWRJdGVtLmhhc19zdG9jayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtlZEl0ZW0uaGFzX3N0b2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFsaW5rZWRJdGVtLnZhcmlhYmxlICYmICFsaW5rZWRJdGVtLmJ1bmRsZSAmJiBsaW5rZWRJdGVtLmhhc19zdG9jayAmJiAhaGFzU2FtZUxpbmtlZFByb2R1Y3QobGlua2VkSXRlbS5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdHNMaXN0ID0gJHFzKCcjcHJvZHVjdHMtbGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0Qm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Qm9keS5jbGFzc05hbWUgPSAncHJvZHVjdC1ib2R5JztcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEJvZHkuaWQgPSBTdHJpbmcobGlua2VkSXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRJdGVtLmltZ19zcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RCb2R5LmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwibGlua2VkLXByb2R1Y3QtaW1nXCIgc3JjPSR7bGlua2VkSXRlbS5pbWdfc3JjfT5gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RCb2R5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LWRlc2NcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCA8c3BhbiBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LW5hbWVcIj4ke2xpbmtlZEl0ZW0ubmFtZX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgPHNwYW4gY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1xdWFudGl0eVwiPlF1YW50aXR5OiAxPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IDxzcGFuIGNsYXNzPVwibGlua2VkLXByb2R1Y3QtcHJpY2VcIj4ke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKE51bWJlci5wYXJzZUZsb2F0KGxpbmtlZEl0ZW0ucHJpY2UpKX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0IDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCA8YnV0dG9uIGNsYXNzPVwiYWRkLWJ0blwiIGRhdGEtcGlkPSR7bGlua2VkSXRlbS5pZH0gZGF0YS1pMThuPVwiYWRkXCI+PC9idXR0b24+YDtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHNMaXN0Py5wcmVwZW5kKHByb2R1Y3RCb2R5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0QWRkQnV0dG9uQ29sb3IoKTtcbiAgICByZW1vdmVMaW5rZWRQcm9kdWN0KGNhcnQpO1xuICAgIGZvciAoY29uc3QgYWRkQnRuIG9mICRxc0FsbCgnLmFkZC1idG4nKSl7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCJpbWcvc3Bpbm5lci5zdmdcIiBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LXNwaW5uZXJcIi8+JztcbiAgICAgICAgICAgIGFkZExpbmtlZFByb2R1Y3R0b0NhcnQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkTGlua2VkUHJvZHVjdHRvQ2FydChsaW5rZWRQcm9kdWN0KSB7XG4gICAgR0xPQkFMLmxpbmtlZFByb2R1Y3RzSWRzPy5wdXNoKE51bWJlci5wYXJzZUludChsaW5rZWRQcm9kdWN0LmRhdGFzZXQucGlkKSk7XG4gICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGV2ZW50OiAnYWRkTGlua2VkUHJvZHVjdCcsXG4gICAgICAgIHByb2R1Y3RJRDogbGlua2VkUHJvZHVjdC5kYXRhc2V0LnBpZFxuICAgIH0sICcqJyk7XG59XG5mdW5jdGlvbiByZW1vdmVMaW5rZWRQcm9kdWN0KGNhcnQpIHtcbiAgICBmb3IgKGNvbnN0IGxpbmtlZFByb2R1Y3Qgb2YgJHFzQWxsKCcucHJvZHVjdC1ib2R5Jykpe1xuICAgICAgICBmb3IobGV0IGkgPSBjYXJ0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBjYXJ0W2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJvZHVjdF9pZCA9PT0gTnVtYmVyLnBhcnNlSW50KGxpbmtlZFByb2R1Y3QuaWQpKSB7XG4gICAgICAgICAgICAgICAgbGlua2VkUHJvZHVjdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoJHFzQWxsKCcucHJvZHVjdC1ib2R5JykubGVuZ3RoID4gMSkge1xuICAgICAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgaWYgKCEkcXMoJy5wcm9kdWN0LWJvZHknKSkge1xuICAgICAgICAkcXMoJyNsaW5rZWQtcHJvZHVjdHMtc2VjdGlvbicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIHNjcm9sbEFkanVzdGVyKCk7XG59XG5mdW5jdGlvbiBoYXNTYW1lTGlua2VkUHJvZHVjdChwcm9kdWN0SUQpIHtcbiAgICBmb3IgKGNvbnN0IHByb2R1Y3Qgb2YgJHFzQWxsKCcucHJvZHVjdC1ib2R5Jykpe1xuICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHByb2R1Y3QuaWQpID09PSBwcm9kdWN0SUQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHNjcm9sbFJpZ2h0KCkge1xuICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICAkcXMoJyNwcm9kdWN0cy1saXN0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc2Nyb2xsTGVmdCArPSAzOTJcbiAgICApO1xufVxuZnVuY3Rpb24gc2Nyb2xsTGVmdCgpIHtcbiAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgJHFzKCcjcHJvZHVjdHMtbGlzdCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnNjcm9sbExlZnQgLT0gMzkyXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHNjcm9sbEFkanVzdGVyKCkge1xuICAgIGNvbnN0IHNjcm9sbEVuZCA9ICRxcygnI3Byb2R1Y3RzLWxpc3QnKT8uc2Nyb2xsTGVmdCA/ICRxcygnI3Byb2R1Y3RzLWxpc3QnKT8uc2Nyb2xsTGVmdCA6IDE7XG4gICAgY29uc3Qgb2Zmc2V0ID0gJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBzY3JvbGxXaWR0aCA9ICRxcygnI3Byb2R1Y3RzLWxpc3QnKT8uc2Nyb2xsV2lkdGg7XG4gICAgaWYgKCRxcygnI3Byb2R1Y3RzLWxpc3QnKT8uc2Nyb2xsTGVmdCA9PT0gMCkge1xuICAgICAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtZW5kJyk7XG4gICAgICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbEVuZCAmJiBzY3JvbGxXaWR0aCAmJiBvZmZzZXQgJiYgc2Nyb2xsRW5kICsgMSA+PSBzY3JvbGxXaWR0aCAtIG9mZnNldCkge1xuICAgICAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtZW5kJyk7XG4gICAgICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBzZW5kQ2FydEl0ZW1zKF9jYXJ0LCBzZXNzaW9uSUQpIHtcbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YS5oYXNfdmFsaWRfa2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgICAgICAgICAnc2Vzc2lvbl9pZCc6IHNlc3Npb25JRCxcbiAgICAgICAgICAgICdpdGVtcyc6IFtdLFxuICAgICAgICAgICAgJ21lcmNoYW50X25hbWUnOiBNZXJjaGFudENvbmZpZ3VyYXRpb24ubmFtZSgpLFxuICAgICAgICAgICAgJ21lcmNoYW50X2hvc3RuYW1lJzogTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKClcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSlcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnc2Vzc2lvbi9pdGVtJywgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBTZW5kIGNhcnQgaXRlbXMgZmFpbGVkIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LCBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRPbmVDbGlja0NoZWNrb3V0KHRlc3RNb2RlKSB7XG4gICAgY29uc3Qgb25lQ2xpY2tVUkwgPSBnZXRPbmVDbGlja1VSTChsb2NhdGlvbi5ob3N0bmFtZSwgdGVzdE1vZGUpO1xuICAgIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICRib2R5Py5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcblx0PGlmcmFtZSBpZD1cIm9uZS1jbGljay1pZnJhbWVcIiBcblx0XHRmcmFtZWJvcmRlcj1cIjBcIiBcblx0XHRhbGxvd3RyYW5zcGFyZW5jeT1cInRydWVcIiBcblx0XHRzY3JvbGxpbmc9XCJub1wiIFxuXHRcdGFsbG93PVwicGF5bWVudCAqXCJcblx0XHRhcmlhLWhpZGRlbj1cInRydWVcIiBcblx0XHR0YWJpbmRleD1cIi0xXCIgXG5cdFx0c3R5bGU9XCJib3JkZXI6IG5vbmUgIWltcG9ydGFudDsgbWFyZ2luOiAwcHggIWltcG9ydGFudDsgcGFkZGluZzogMHB4ICFpbXBvcnRhbnQ7IHdpZHRoOiAxcHggIWltcG9ydGFudDsgbWluLXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDsgdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7IHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50OyBoZWlnaHQ6IDFweCAhaW1wb3J0YW50OyBwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyB1c2VyLXNlbGVjdDogbm9uZSAhaW1wb3J0YW50O1wiXG5cdFx0c3JjPVwiJHtvbmVDbGlja1VSTH1vbmUtY2xpY2suaHRtbFwiXG5cdD5cblx0XHRVbmFibGUgdG8gbG9hZCBQZWFjaFBheSBPbmUgQ2xpY2sgQ2hlY2tvdXQgU3VwcG9ydFxuXHQ8L2lmcmFtZT5gKTtcbn1cbihmdW5jdGlvbigpIHtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2luaXQnLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRIb3N0TmFtZShtZXNzYWdlLm1lcmNoYW50SG9zdG5hbWUpKTtcbiAgICAgICAgYWRkRm9ybUZpZWxkcyhtZXNzYWdlLnBocERhdGEubGFuZ3VhZ2UpO1xuICAgICAgICBHTE9CQUwucGhwRGF0YSA9IG1lc3NhZ2UucGhwRGF0YTtcbiAgICAgICAgaWYgKHR5cGVvZiBHTE9CQUwucGhwRGF0YS5oYXNfdmFsaWRfa2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgR0xPQkFMLnBocERhdGEuaGFzX3ZhbGlkX2tleSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnROYW1lKG1lc3NhZ2UucGhwRGF0YS5tZXJjaGFudF9uYW1lKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldEZlYXR1cmVTdXBwb3J0KG1lc3NhZ2UucGhwRGF0YS5mZWF0dXJlX3N1cHBvcnQsIG1lc3NhZ2UucGhwRGF0YSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVMYW5ndWFnZShtZXNzYWdlLnBocERhdGEubGFuZ3VhZ2UgPT09ICdkZXRlY3QtZnJvbS1wYWdlJyA/IG1lc3NhZ2UucGFnZUxhbmd1YWdlIDogbWVzc2FnZS5waHBEYXRhLmxhbmd1YWdlKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgICAgIHBsdWdpbklzVGVzdE1vZGU6IEJvb2xlYW4obWVzc2FnZS5pc1Rlc3RNb2RlKSxcbiAgICAgICAgICAgIHBsdWdpblBhZ2VUeXBlOiBkZXRlcm1pbmVQYWdlVHlwZShtZXNzYWdlLmlzQ2FydFBhZ2UsIG1lc3NhZ2UuaXNDaGVja291dFBhZ2UpLFxuICAgICAgICAgICAgY3VzdG9tZXJJc01vYmlsZTogbWVzc2FnZS5pc01vYmlsZSxcbiAgICAgICAgICAgIHBsdWdpbkJ1dHRvbkNvbG9yOiBtZXNzYWdlLnBocERhdGEuYnV0dG9uX2NvbG9yLFxuICAgICAgICAgICAgcGx1Z2luVmVyc2lvbjogbWVzc2FnZS5waHBEYXRhLnZlcnNpb25cbiAgICAgICAgfSkpO1xuICAgICAgICBpbml0TW9kYWwoKTtcbiAgICAgICAgaW5pdERlbGl2ZXJ5RGF0ZSgpO1xuICAgICAgICBpbml0TWV0cmljcygpO1xuICAgICAgICBpbml0TGlua2VkUHJvZHVjdHMoKTtcbiAgICAgICAgaW5pdE9yZGVyTm90ZXMoKTtcbiAgICAgICAgaW5pdENhcnQoKTtcbiAgICAgICAgaW5pdExhbmd1YWdlKG1lc3NhZ2UpO1xuICAgICAgICBpbml0U3VtbWFyeShtZXNzYWdlKTtcbiAgICAgICAgaW5pdENvdXBvbklucHV0KG1lc3NhZ2UpO1xuICAgICAgICBpbml0R2lmdENhcmRJbnB1dChtZXNzYWdlKTtcbiAgICAgICAgaW5pdFNoaXBwaW5nKG1lc3NhZ2UpO1xuICAgICAgICBpbml0Q3VzdG9tZXIobWVzc2FnZSk7XG4gICAgICAgIGluaXRDdXJyZW5jeShtZXNzYWdlKTtcbiAgICAgICAgaW5pdE1lcmNoYW50QWNjb3VudChtZXNzYWdlKTtcbiAgICAgICAgaW5pdFZBVChtZXNzYWdlKTtcbiAgICAgICAgaW5pdEN1cnJlbmN5U3dpdGNoZXIoKTtcbiAgICAgICAgaWYgKEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5BRERJVElPTkFMX0ZJRUxEUykpIHtcbiAgICAgICAgICAgIHJlbmRlckFkZGl0aW9uYWxGaWVsZHMobWVzc2FnZS5waHBEYXRhPy5hZGRpdGlvbmFsX2ZpZWxkcyA/PyBbXSwgbWVzc2FnZS5waHBEYXRhPy5hZGRpdGlvbmFsX2ZpZWxkc19vcmRlciA/PyBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JkZXJTZXJ2aWNlID0gZ2V0T3JkZXJTZXJ2aWNlKCk7XG4gICAgICAgIGF3YWl0IGluaXRTdHJpcGVTdXBwb3J0KG1lc3NhZ2UsIG9yZGVyU2VydmljZSk7XG4gICAgICAgIGF3YWl0IGluaXRQYXlQYWxTdXBwb3J0KG1lc3NhZ2UsIG9yZGVyU2VydmljZSk7XG4gICAgICAgIGNvbnN0IHNlc3Npb25SZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ3Nlc3Npb24nKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHNlc3Npb25SZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZVNlc3Npb25JZChzZXNzaW9uLmlkKSk7XG4gICAgICAgIGF3YWl0IHNlbmRDYXJ0SXRlbXMoRGVmYXVsdENhcnQuY29udGVudHMoKSwgc2Vzc2lvbi5pZCk7XG4gICAgICAgIGluaXRPbmVDbGlja0NoZWNrb3V0KG1lc3NhZ2UuaXNUZXN0TW9kZSk7XG4gICAgICAgIG9uV2luZG93TWVzc2FnZSgncHAtb25lLWNsaWNrLWxvYWRlZCcsIGFzeW5jICgpPT57XG4gICAgICAgICAgICBhd2FpdCBsb2FkQ3VzdG9tZXIoKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLnBocERhdGEucGF5cGFsICYmIFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpID09PSAncGF5cGFsJyB8fCAhaXNDdXJyZW5jeVN1cHBvcnRlZEJ5UGF5cGFsKCkpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVQcmVmZXJyZWRQYXltZW50TWV0aG9kKCdzdHJpcGUnKSk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VUeXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyRXhpc3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICBzZWxmLnBhcmVudD8ucG9zdE1lc3NhZ2UoJ2xvYWRlZCcsICcqJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTtcbmZ1bmN0aW9uIGFkZEZvcm1GaWVsZHMobGFuZykge1xuICAgIGxldCBmb3JtID0gZGVmYXVsdEZvcm1IVE1MO1xuICAgIGlmIChsYW5nID09PSAnamEnKSB7XG4gICAgICAgIGZvcm0gPSBqYXBhbmVzZUZvcm1IVE1MO1xuICAgIH1cbiAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkgPT09ICdpbml0aWFsYXVkaW8uY29tJykge1xuICAgICAgICBmb3JtID0gY2hlY2tvdXRGb3JtTm9QaG9uZU5vQXB0O1xuICAgIH1cbiAgICAkcXMoJyNwcC1pbmZvJyk/Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZm9ybSk7XG59XG4iXX0=