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
                thousandsSeparator: ',',
                decimalSeparator: '.',
                rounding: 'disabled',
                decimals: 2
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
    'empty-cart': {
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
    'linked-products-title': {
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
    'coupon-option': {
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
    'gift-option': {
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
    'send-to': {
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
    'my-order': {
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
    'ready-to-check-out': {
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
    'secure-notice': {
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
    'order-summary': {
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
    'wc-coupon-code': {
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
    'wc-invalid-coupon': {
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
    'gift-card-number': {
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
    'invalid-gift-card': {
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
    'card-label': {
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
    'no-ship': {
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
    'province-select': {
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
    'state-select': {
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
    'order-notes': {
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
    'something-went-wrong': {
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
    'something-went-wrong-order': {
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
    'delivery-date': {
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
    'first-renewal-date': {
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
    'subscription-summary': {
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
    'account-password-explanation': {
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
    'account-password': {
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
    'invalid-merchant-password': {
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
    'test-mode-banner': {
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
    'verify-location': {
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
})(FeatureFlag || (FeatureFlag = {}));
var updateCustomerStripeId = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER_STRIPE_ID);
var updateCustomer = createDispatchUpdate(DispatchActionType.PEACHPAY_CUSTOMER);
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
    var _c = MerchantConfiguration.currency.configuration(), code = _c.code, thousandsSeparator = _c.thousandsSeparator, decimalSeparator = _c.decimalSeparator, rounding = _c.rounding, decimals = _c.decimals;
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
            return getLocaleText('state-select');
        case 'GB':
            return getLocaleText('county');
        default:
            return getLocaleText('province-select');
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
        $redText.textContent = getLocaleText('invalid-merchant-password');
        $redTextExisting.textContent = getLocaleText('invalid-merchant-password');
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
    var labelHTML = getLocaleText('account-password-explanation') + ' ' + merchantHostname;
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
    $descriptor.innerHTML = getLocaleText('verify-location');
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
function requestCartCalculation() {
    return __awaiter(this, void 0, void 0, function () {
        var requestData, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestData = {
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
        if (DefaultCart.contents().length === 0) {
            store.dispatch(setOrderError("<span>".concat(getLocaleText('empty-cart'), "</span>")));
        }
        else if (!shippingIsValid()) {
            store.dispatch(setOrderError("<span>".concat(getLocaleText('no-ship'), "</span>")));
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
    var $form = $qs('#pp-info-form');
    if (!$form) {
        return;
    }
    var formData = new FormData($form);
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
                if (defaultOption_1 === getLocaleText('province-select')) {
                    $qs('label[for="dynamic-states"]', function ($element) { return $element.textContent = getLocaleText('province'); });
                }
                else if (defaultOption_1 === getLocaleText('state-select')) {
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
                if (defaultOption_1 === getLocaleText('province-select')) {
                    $qs('label[for="province"]', function ($element) { return $element.textContent = getLocaleText('province'); });
                }
                else if (defaultOption_1 === getLocaleText('state-select')) {
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
        thousandsSeparator: (_g = (_f = message.phpData.currency_info) === null || _f === void 0 ? void 0 : _f.thousands_separator) !== null && _g !== void 0 ? _g : ',',
        decimalSeparator: (_j = (_h = message.phpData.currency_info) === null || _h === void 0 ? void 0 : _h.decimal_separator) !== null && _j !== void 0 ? _j : '.',
        decimals: (_l = (_k = message.phpData.currency_info) === null || _k === void 0 ? void 0 : _k.number_of_decimals) !== null && _l !== void 0 ? _l : 2,
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
    store.subscribe(function () {
        var cartData = JSON.stringify(DefaultCart.contents());
        if (cartData !== previousCartData) {
            previousCartData = cartData;
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
        var $message = "<tr class=\"order-summary-item\"><td style=\"text-align: center; \">".concat(getLocaleText('empty-cart'), "</td></tr>");
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
        var showQuantityChanger = Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && Environment.plugin.pageType() === 'cart' || Feature.enabled(FeatureFlag.QUANTITY_CHANGER) && Feature.version(FeatureFlag.QUANTITY_CHANGER) >= 2;
        if (!item.is_part_of_bundle) {
            if (i < cart.length - 1 && cart[i + 1].is_part_of_bundle) {
                $row.innerHTML += $itemRemover('remove-border');
                if (((_g = item.image) === null || _g === void 0 ? void 0 : _g[0]) && ((_h = item.image) === null || _h === void 0 ? void 0 : _h[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"product-img-td-b0\" id=\"product-img\"><img class=\"product-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('bundle-name remove-border') : '', "\n\t\t\t\t\t<td class=\"bundle-name\">").concat(label, "</td>\n\t\t\t\t\t<td class=\"bundle-name bold\">").concat(amount, "</td>\n\t\t\t\t");
            }
            else {
                $row.innerHTML += $itemRemover();
                if (((_j = item.image) === null || _j === void 0 ? void 0 : _j[0]) && ((_k = item.image) === null || _k === void 0 ? void 0 : _k[0]) !== '(unknown)') {
                    $row.innerHTML += "<td class=\"product-img-td\" id=\"product-img\"><img class=\"product-img-size\" src=\"".concat(item.image[0], "\"/></td>");
                }
                $row.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('non-bundled-item') : '', "\n\t\t\t\t\t<td class=\"non-bundled-item\">").concat(label, "</td>\n\t\t\t\t\t<td class=\"non-bundled-item bold\">").concat(amount, "</td>\n\t\t\t\t");
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
                $one.innerHTML += "\n\t\t\t\t\t".concat(showQuantityChanger ? $qtyChanger('non-bundled-item remove-border') : '', "\n\t\t\t\t\t<td class=\"non-bundled-item remove-border\">").concat(label, "</td>\n\t\t\t\t\t<td class=\"non-bundled-item remove-border bold\">").concat(amount, "</td>\n\t\t\t\t");
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
        var stripeForPaymentIntent, stripe, getPaymentIntent, result;
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
                    if (!(result.paymentIntent.status === 'succeeded' && GLOBAL.completedOrder)) return [3, 3];
                    return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 2:
                    if (!(_b.sent()).ok) {
                        return [2];
                    }
                    orderService.deprecated.setOrderStatus(GLOBAL.completedOrder, {
                        status: 'wc-processing',
                        paymentType: 'Stripe'
                    });
                    _b.label = 3;
                case 3: return [2];
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
    peachpayAlert(getLocaleText('something-went-wrong'));
    store.dispatch(stopModalLoading());
}
function handleStripePayment(order) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var body, options, response, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    body = {
                        sessionID: PeachPayOrder.sessionId(),
                        stripeCustomerID: PeachPayCustomer.stripeId(),
                        order: order,
                        returnURL: "".concat((_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_asset_url) !== null && _b !== void 0 ? _b : '', "/public/dist/checkout-modal/3ds.html")
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
                    response = _c.sent();
                    return [4, response.json()];
                case 2:
                    result = _c.sent();
                    return [2, result.status === 'success'];
            }
        });
    });
}
function legacyHandleStripePayment(order, orderService) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var body, options, response, result, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    body = {
                        sessionID: PeachPayOrder.sessionId(),
                        stripeCustomerID: PeachPayCustomer.stripeId(),
                        order: order,
                        returnURL: "".concat((_b = (_a = GLOBAL.phpData) === null || _a === void 0 ? void 0 : _a.plugin_asset_url) !== null && _b !== void 0 ? _b : '', "/public/dist/checkout-modal/3ds.html")
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
                    response = _f.sent();
                    return [4, response.json()];
                case 2:
                    result = _f.sent();
                    _e = result.status;
                    switch (_e) {
                        case 'success': return [3, 3];
                        case 'requires_action': return [3, 5];
                        case 'failure': return [3, 6];
                    }
                    return [3, 7];
                case 3: return [4, orderService.setPaymentStatus(PeachPayOrder.sessionId(), true)];
                case 4:
                    if (!(_f.sent()).ok) {
                        return [3, 7];
                    }
                    orderService.deprecated.setOrderStatus(order, {
                        status: 'wc-processing',
                        paymentType: 'Stripe',
                        transactionID: result.chargeId
                    });
                    return [3, 7];
                case 5:
                    show3DSecureModal((_c = result === null || result === void 0 ? void 0 : result.url) !== null && _c !== void 0 ? _c : '');
                    return [3, 7];
                case 6:
                    orderService.deprecated.setOrderStatus(order, {
                        status: 'wc-failed',
                        message: result.message
                    });
                    store.dispatch(stopModalLoading());
                    peachpayAlert((_d = result === null || result === void 0 ? void 0 : result.message) !== null && _d !== void 0 ? _d : '');
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
        renderPayPalButton(PeachPayCustomer.preferredPaymentMethod() === 'paypal' && Environment.modalUI.page() === 'payment');
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
                    if (!(merchant.paypalMerchantID !== '')) return [3, 4];
                    paypalMerchantID = merchant.paypalMerchantID;
                    return [4, paypalLoadScripts([
                            "https://www.paypal.com/sdk/js?&client-id=".concat(merchant.clientID, "&merchant-id=").concat(merchant.paypalMerchantID, "&disable-funding=paylater,card,bancontact,blik,eps,giropay,ideal,mybank,p24,sofort&currency=").concat(MerchantConfiguration.currency.code()),
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
        var paypalChecked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paypalChecked = message.phpData.paypal;
                    if (!paypalChecked) {
                        return [2];
                    }
                    return [4, loadPayPalScript()];
                case 1:
                    if (!(_a.sent())) {
                        return [2];
                    }
                    initPayPalEvents();
                    if (!(paypalMerchantID && Number.parseInt(paypalChecked !== null && paypalChecked !== void 0 ? paypalChecked : '0'))) return [3, 3];
                    return [4, initPayPalButton(orderService)];
                case 2:
                    _a.sent();
                    showPayPalButton();
                    _a.label = 3;
                case 3: return [2];
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
        var capture, error_7, customer, stripeCustomerID, cardBrand, cardLast4, transactionID;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (latestOrderAttempt !== orderAttempt) {
                        return [2];
                    }
                    capture = null;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4, capturePayPalOrder(data.orderID)];
                case 2:
                    capture = _e.sent();
                    return [3, 4];
                case 3:
                    error_7 = _e.sent();
                    captureSentryException(new Error('Error while capturing PayPal order: ' + JSON.stringify(error_7)));
                    return [3, 4];
                case 4:
                    if (!((capture === null || capture === void 0 ? void 0 : capture.status) === 'COMPLETED')) return [3, 7];
                    return [4, getCustomer()];
                case 5:
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
                case 6:
                    if (!(_e.sent()).ok) {
                        return [2];
                    }
                    transactionID = capture.purchase_units[0].payments.captures[0].id;
                    orderService.deprecated.setOrderStatus(message.order, {
                        status: 'wc-processing',
                        paymentType: 'PayPal',
                        transactionID: transactionID
                    });
                    return [3, 8];
                case 7:
                    if ((capture === null || capture === void 0 ? void 0 : capture.details[0].issue) === 'INSTRUMENT_DECLINED') {
                        showPayPalLoadingSpinner(false);
                        window.parent.postMessage({
                            event: 'paypalAlert',
                            message: capture.details[0].description
                        }, '*');
                        restartAction(actions);
                    }
                    else {
                        showPayPalLoadingSpinner(false);
                        window.parent.postMessage({
                            event: 'paypalAlert',
                            message: 'Something went wrong.'
                        }, '*');
                        restartAction(actions);
                    }
                    _e.label = 8;
                case 8: return [2];
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
                    return [4, requestCartCalculation()];
                case 1:
                    _a.sent();
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
var defaultFormHTML = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"phone\" class=\"w-100 text-input\" type=\"tel\" name=\"phone\" placeholder=\" \"required>\n\t\t<label for=\"phone\" data-i18n=\"phone\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\" type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-70\">\n\t\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n\t</div>\n\t<div class=\"flex w-30\">\n\t\t<input id=\"address2\" type=\"text\" name=\"address2\" placeholder=\" \" class=\"w-100 text-input\">\n\t\t<label for=\"address2\" data-i18n=\"apt\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\" data-i18n=\"state\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-label\" class=\"form-label region-country-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"delivery-date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
var japaneseFormHTML = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"phone\" class=\"w-100 text-input\" type=\"tel\" name=\"phone\" placeholder=\" \" required>\n\t\t<label for=\"phone\" data-i18n=\"phone\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\"  type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"select-country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-labely\" class=\"form-label region-country-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value>State</option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\">Region</label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-70\">\n\t\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n\t</div>\n\t<div class=\"flex w-30\">\n\t\t<input id=\"address2\" type=\"text\" name=\"address2\" placeholder=\" \" class=\"w-100 text-input\">\n\t\t<label for=\"address2\" data-i18n=\"apt\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"delivery-date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
var checkoutFormNoPhoneNoApt = "<form id=\"pp-info-form\">\n<h2><span class=\"bold\" data-i18n=\"personal\"></span></h2>\n<div class=\"flex\">\n\t<input id=\"email\" class=\"w-100 text-input\" type=\"email\" name=\"email\" placeholder=\" \" required>\n\t<label for=\"email\" data-i18n=\"email\" class=\"form-label\"></label>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_first\" class=\"w-100 text-input\" type=\"text\" name=\"name_first\" placeholder=\" \" required>\n\t\t<label for=\"name_first\" data-i18n=\"first-name\" class=\"form-label\"></label>\n\t\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"name_last\" class=\"w-100 text-input\" type=\"text\" name=\"name_last\" placeholder=\" \" required>\n\t\t<label for=\"name_last\" data-i18n=\"last-name\" class=\"form-label\"></label>\n\t</div>\n</div>\n<h2 class=\"shipping-address-header\"><span class=\"bold\" data-i18n=\"shipping\"></span></h2>\n<h2 class=\"billing-address-header hide\"><span class=\"bold\" data-i18n=\"billing\"></span></h2>\n<div class=\"flex\">\n\t<input id=\"address1\" type=\"text\" name=\"address1\" class=\"w-100 text-input\" placeholder=\" \" required>\n\t<label for=\"address1\" data-i18n=\"street\" class=\"form-label form-label\"></label>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"postal\" class=\"w-100 text-input\" type=\"text\" name=\"postal\" placeholder=\" \" required>\n\t\t<label for=\"postal\" data-i18n=\"postal\" class=\"form-label\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<input id=\"city\" class=\"w-100 text-input\" type=\"text\" name=\"city\" placeholder=\" \" required>\n\t\t<label for=\"city\" data-i18n=\"city\" class=\"form-label\"></label>\n\t</div>\n</div>\n<div class=\"flex\">\n\t<div class=\"flex w-50\">\n\t\t<input id=\"province\" class=\"w-100 text-input\" type=\"text\" name=\"off\" placeholder=\" \">\n\t\t<label for=\"province\" class=\"form-label\" data-i18n=\"province\"></label>\n\t\t<select id=\"dynamic-states\" class=\"w-100 select hide\" name=\"state\" size=\"1\">\n\t\t\t<option hidden disabled selected value></option>\n\t\t</select>\n\t\t<label for=\"dynamic-states\" class=\"form-label region-country-label hide\" data-i18n=\"state\"></label>\n\t</div>\n\t<div class=\"flex w-50\">\n\t\t<select id=\"country\" class=\"w-100\" name=\"country\" size=\"1\" required>\n\t\t\t<option hidden disabled selected value data-i18n=\"country\"></option>\n\t\t</select>\n\t\t<label for=\"country\" data-i18n=\"country-label\" class=\"form-label region-country-label\"></label>\n\t</div>\n</div>\n<div id=\"checkout-delivery-date\" class=\"hide\">\n\t<h2 data-i18n=\"delivery-date\"></h2>\n\t<input type=\"date\" id=\"delivery-date\" name=\"delivery-date\" value=\"\" min=\"\">\n</div>\n</form>";
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
                                    return [4, requestCartCalculation()];
                                case 2:
                                    _b.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJtZWRpYXRlL2J1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBUztJQUFULG1CQUFBLEVBQUEsU0FBUztJQUM1QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksUUFBUSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRO0lBQzlCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBSSxRQUFRLEVBQUU7UUFDVixLQUF1QixVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU0sRUFBQztZQUF6QixJQUFNLFFBQVEsZUFBQTtZQUNmLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQXRDLGlCQU1DO0lBTEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFPLEtBQUs7Ozs7eUJBQ3JDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFBLEVBQTlCLGNBQThCO29CQUM5QixXQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztTQUU1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QUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDTCxTQUFTLGFBQWEsQ0FBQyxJQUFJOztJQUN2QixJQUFJLElBQUksR0FBRyxlQUFlLENBQUM7SUFDM0IsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2YsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0tBQzNCO0lBQ0QsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxrQkFBa0IsRUFBRTtRQUN6RCxJQUFJLEdBQUcsd0JBQXdCLENBQUM7S0FDbkM7SUFDRCxNQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsMENBQUUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiAkcXMoc2VsZWN0b3IsIGNiID0gbnVsbCkge1xuICAgIGNvbnN0ICRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgaWYgKCRlbGVtZW50ICYmIGNiICE9PSBudWxsKSB7XG4gICAgICAgIGNiKCRlbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuICRlbGVtZW50O1xufVxuZnVuY3Rpb24gJHFzQWxsKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mIHJlc3VsdCl7XG4gICAgICAgICAgICBjYWxsYmFjaygkZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uV2luZG93TWVzc2FnZShldmVudE5hbWUsIGNiKSB7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gZXZlbnROYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCBjYihldmVudC5kYXRhKTtcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIG9uV2luZG93RGF0YUZldGNoKGVuZHBvaW50LCByZXF1ZXN0Q2FsbGJhY2spIHtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YS5ldmVudCA9PT0gZW5kcG9pbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Q2FsbGJhY2sobWVzc2FnZS5kYXRhLnJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UucG9ydHNbMF0ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UucG9ydHNbMF0ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaFdpbmRvd0RhdGEodGFyZ2V0V2luZG93LCBlbmRwb2ludCwgcmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBjb25zdCBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gKHsgZGF0YSAgfSk9PntcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDEuY2xvc2UoKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCF0YXJnZXRXaW5kb3cpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RhcmdldCB3aW5kb3cgaXMgbm90IHZhbGlkLicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGVuZHBvaW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIH0sICcqJywgW1xuICAgICAgICAgICAgICAgIGNoYW5uZWwucG9ydDJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaEhvc3RXaW5kb3dEYXRhKGVuZHBvaW50LCByZXF1ZXN0KSB7XG4gICAgcmV0dXJuIGZldGNoV2luZG93RGF0YSh3aW5kb3cudG9wLCBlbmRwb2ludCwgcmVxdWVzdCk7XG59XG52YXIgRGlzcGF0Y2hBY3Rpb25UeXBlO1xuKGZ1bmN0aW9uKERpc3BhdGNoQWN0aW9uVHlwZTEpIHtcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiSU5JVFwiXSA9ICdpbml0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiRU5WSVJPTk1FTlRcIl0gPSAnZW52aXJvbm1lbnQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9TRVNTSU9OSURcIl0gPSAncGVhY2hwYXlPcmRlci9zZXNzaW9uSWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9BRERSRVNTX1ZBTElEQVRFRFwiXSA9ICdwZWFjaHBheU9yZGVyL2FkZHJlc3NWYWxpZGF0ZWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJPUkRFUl9TRVRfRVhUUkFfRklFTERTXCJdID0gJ3BlYWNocGF5T3JkZXIvZXh0cmFGaWVsZHMvc2V0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiT1JERVJfU0VUX0VSUk9SX01FU1NBR0VcIl0gPSAncGVhY2hwYXlPcmRlci9lcnJvck1lc3NhZ2Uvc2V0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiUEVBQ0hQQVlfQ1VTVE9NRVJcIl0gPSAncGVhY2hwYXkvY3VzdG9tZXInO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJQRUFDSFBBWV9DVVNUT01FUl9TVFJJUEVfSURcIl0gPSAncGVhY2hwYXkvY3VzdG9tZXIvc3RyaXBlSWQnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJQRUFDSFBBWV9DVVNUT01FUl9QQVlNRU5UX01FVEhPRFwiXSA9ICdwZWFjaHBheS9jdXN0b21lci9wYXltZW50X21ldGhvZCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0NVU1RPTUVSXCJdID0gJ21lcmNoYW50L2N1c3RvbWVyJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfQ1VTVE9NRVJfRVhJU1RcIl0gPSAnbWVyY2hhbnQvY3VzdG9tZXIvZXhpc3QnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJFTlZJUk9OTUVOVF9MQU5HVUFHRVwiXSA9ICdtb2RhbC9sYW5ndWFnZSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX05BTUVcIl0gPSAnbWVyY2hhbnQvbmFtZSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0hPU1ROQU1FXCJdID0gJ21lcmNoYW50L2hvc3RuYW1lJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfR0VORVJBTFwiXSA9ICdtZXJjaGFudC9nZW5lcmFsJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfR0VORVJBTF9DVVJSRU5DWVwiXSA9ICdtZXJjaGFudC9nZW5lcmFsL2N1cnJlbmN5JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfQUNDT1VOVFwiXSA9ICdtZXJjaGFudC9hY2NvdW50cyc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX1RBWFwiXSA9ICdtZXJjaGFudC90YXgnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9TSElQUElOR1wiXSA9ICdtZXJjaGFudC9zaGlwcGluZyc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIkRFRkFVTFRfQ0FSVF9DT05URU5UU1wiXSA9ICdkZWZhdWx0L2NhcnQvY29udGVudHMnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJERUZBVUxUX0NBUlRfQ0FMQ1VMQVRJT05cIl0gPSAnZGVmYXVsdC9jYXJ0L2NhbGN1bGF0aW9uJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiQ0FSVF9DQUxDVUxBVElPTlwiXSA9ICdjYXJ0L2NhbGN1bGF0aW9uJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiQ0FSVF9TSElQUElOR19TRUxFQ1RJT05cIl0gPSAnY2FydC9zaGlwcGluZy9zZWxlY3Rpb24nO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJFTlZJUk9OTUVOVF9TRVRfRkVBVFVSRVNcIl0gPSAnRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTJztcbn0pKERpc3BhdGNoQWN0aW9uVHlwZSB8fCAoRGlzcGF0Y2hBY3Rpb25UeXBlID0ge30pKTtcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBsYW5ndWFnZTogJ2VuLVVTJyxcbiAgICAgICAgcGx1Z2luOiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiAnJyxcbiAgICAgICAgICAgIG1vZGU6ICdsaXZlJyxcbiAgICAgICAgICAgIHBhZ2VUeXBlOiAnY2FydCcsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogJyNGRjg3NkMnLFxuICAgICAgICAgICAgZmVhdHVyZVN1cHBvcnQ6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgICAgICBleGlzdGluZzogZmFsc2UsXG4gICAgICAgICAgICBtb2JpbGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIG1vZGFsVUk6IHtcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcGFnZTogJ2luZm8nLFxuICAgICAgICAgICAgbG9hZGluZ01vZGU6ICdmaW5pc2hlZCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGVhY2hQYXlPcmRlcjoge1xuICAgICAgICBzZXNzaW9uSWQ6ICcnLFxuICAgICAgICBjdXN0b21lckFkZHJlc3NWYWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICBhZGRpdGlvbmFsRmllbGRzOiB7fSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnJ1xuICAgIH0sXG4gICAgcGVhY2hQYXlDdXN0b21lcjoge1xuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIG5hbWVfZmlyc3Q6ICcnLFxuICAgICAgICBuYW1lX2xhc3Q6ICcnLFxuICAgICAgICBhZGRyZXNzMTogJycsXG4gICAgICAgIGFkZHJlc3MyOiAnJyxcbiAgICAgICAgY2l0eTogJycsXG4gICAgICAgIHN0YXRlOiAnJyxcbiAgICAgICAgY291bnRyeTogJycsXG4gICAgICAgIHBvc3RhbDogJycsXG4gICAgICAgIHBob25lOiAnJ1xuICAgIH0sXG4gICAgbWVyY2hhbnRDdXN0b21lcjoge1xuICAgICAgICB1c2VybmFtZTogJycsXG4gICAgICAgIGxvZ2dlZEluOiBmYWxzZSxcbiAgICAgICAgdXNlcm5hbWVJc1JlZ2lzdGVyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBtZXJjaGFudENvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGhvc3ROYW1lOiAnJyxcbiAgICAgICAgZ2VuZXJhbDoge1xuICAgICAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICAgICAgICBjb2RlOiAnVVNEJyxcbiAgICAgICAgICAgICAgICBzeW1ib2w6ICckJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcjogJywnLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcbiAgICAgICAgICAgICAgICByb3VuZGluZzogJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaGlwcGluZzoge1xuICAgICAgICAgICAgc2hpcHBpbmdab25lczogMFxuICAgICAgICB9LFxuICAgICAgICB0YXg6IHtcbiAgICAgICAgICAgIGRpc3BsYXlQcmljZXNJbkNhcnRBbmRDaGVja291dDogJ2V4Y2x1ZGVUYXgnXG4gICAgICAgIH0sXG4gICAgICAgIGFjY291bnRzQW5kUHJpdmFjeToge1xuICAgICAgICAgICAgYWxsb3dHdWVzdENoZWNrb3V0OiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dBY2NvdW50Q3JlYXRpb25PckxvZ2luRHVyaW5nQ2hlY2tvdXQ6IHRydWUsXG4gICAgICAgICAgICBhdXRvR2VuZXJhdGVVc2VybmFtZTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvR2VuZXJhdGVQYXNzd29yZDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2FsY3VsYXRlZENhcnRzOiB7XG4gICAgICAgIDA6IHtcbiAgICAgICAgICAgIHBhY2thZ2VfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgIGNhcnQ6IFtdLFxuICAgICAgICAgICAgc3VtbWFyeToge1xuICAgICAgICAgICAgICAgIGZlZXNfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgICAgICBjb3Vwb25zX3JlY29yZDoge30sXG4gICAgICAgICAgICAgICAgZ2lmdF9jYXJkX3JlY29yZDoge30sXG4gICAgICAgICAgICAgICAgc3VidG90YWw6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxfc2hpcHBpbmc6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxfdGF4OiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FydF9tZXRhOiB7XG4gICAgICAgICAgICAgICAgaXNfdmlydHVhbDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaFVwZGF0ZSh0eXBlKSB7XG4gICAgcmV0dXJuIChwYXlsb2FkKT0+KHtcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBwYXlsb2FkXG4gICAgICAgIH0pXG4gICAgO1xufVxuZnVuY3Rpb24gbWVyY2hhbnRDb25maWd1cmF0aW9uUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTF9DVVJSRU5DWTpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgZ2VuZXJhbDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5nZW5lcmFsLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0dFTkVSQUw6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGdlbmVyYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9BQ0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBhY2NvdW50c0FuZFByaXZhY3k6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9UQVg6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHRheDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1NISVBQSU5HOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzaGlwcGluZzoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0hPU1ROQU1FOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBob3N0TmFtZTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX05BTUU6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBwZWFjaFBheU9yZGVyUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VTU0lPTklEOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9BRERSRVNTX1ZBTElEQVRFRDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VUX0VYVFJBX0ZJRUxEUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbEZpZWxkczoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFVF9FUlJPUl9NRVNTQUdFOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZVxuICAgICAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbnZpcm9ubWVudFJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkVOVklST05NRU5UOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5jdXN0b21lclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLnBsdWdpblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kYWxVSToge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5tb2RhbFVJXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlRfTEFOR1VBR0U6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlU3VwcG9ydDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBtb2RhbFVJOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLm1vZGFsVUlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmNoYW50Q3VzdG9tZXJSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0NVU1RPTUVSX0VYSVNUOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZUlzUmVnaXN0ZXJlZDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBlYWNoUGF5Q3VzdG9tZXJSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSX1NUUklQRV9JRDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc3RyaXBlX2N1c3RvbWVyX2lkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfUEFZTUVOVF9NRVRIT0Q6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHBheW1lbnRfb3B0aW9uOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gY2FydFJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DT05URU5UUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVsnMCddLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0OiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DQUxDVUxBVElPTjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfQ0FMQ1VMQVRJT046XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5DQVJUX1NISVBQSU5HX1NFTEVDVElPTjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoIW5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0gfHwgIW5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0/LnBhY2thZ2VfcmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFja2FnZVJlY29yZCA9IG5ld1N0YXRlW3BheWxvYWQuY2FydEtleV0ucGFja2FnZV9yZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCFwYWNrYWdlUmVjb3JkW3BheWxvYWQuc2hpcHBpbmdQYWNrYWdlS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhY2thZ2VSZWNvcmRbcGF5bG9hZC5zaGlwcGluZ1BhY2thZ2VLZXldLnNlbGVjdGVkX21ldGhvZCA9IHBheWxvYWQucGFja2FnZU1ldGhvZElkO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gcm9vdFJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwZWFjaFBheU9yZGVyOiBwZWFjaFBheU9yZGVyUmVkdWNlcihzdGF0ZS5wZWFjaFBheU9yZGVyLCBhY3Rpb24pLFxuICAgICAgICBlbnZpcm9ubWVudDogZW52aXJvbm1lbnRSZWR1Y2VyKHN0YXRlLmVudmlyb25tZW50LCBhY3Rpb24pLFxuICAgICAgICBtZXJjaGFudEN1c3RvbWVyOiBtZXJjaGFudEN1c3RvbWVyUmVkdWNlcihzdGF0ZS5tZXJjaGFudEN1c3RvbWVyLCBhY3Rpb24pLFxuICAgICAgICBwZWFjaFBheUN1c3RvbWVyOiBwZWFjaFBheUN1c3RvbWVyUmVkdWNlcihzdGF0ZS5wZWFjaFBheUN1c3RvbWVyLCBhY3Rpb24pLFxuICAgICAgICBtZXJjaGFudENvbmZpZ3VyYXRpb246IG1lcmNoYW50Q29uZmlndXJhdGlvblJlZHVjZXIoc3RhdGUubWVyY2hhbnRDb25maWd1cmF0aW9uLCBhY3Rpb24pLFxuICAgICAgICBjYWxjdWxhdGVkQ2FydHM6IGNhcnRSZWR1Y2VyKHN0YXRlLmNhbGN1bGF0ZWRDYXJ0cywgYWN0aW9uKVxuICAgIH07XG59XG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyKTtcbmZ1bmN0aW9uIHVwZGF0ZUVudmlyb25tZW50KG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlQsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBvcHRpb25zLmxhbmd1YWdlID8/IEVudmlyb25tZW50Lmxhbmd1YWdlKCksXG4gICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nOiBvcHRpb25zLmN1c3RvbWVyRXhpc3RzID8/IEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCksXG4gICAgICAgICAgICAgICAgbW9iaWxlOiBvcHRpb25zLmN1c3RvbWVySXNNb2JpbGUgPz8gRW52aXJvbm1lbnQuY3VzdG9tZXIubW9iaWxlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBvcHRpb25zLnBsdWdpblZlcnNpb24gPz8gRW52aXJvbm1lbnQucGx1Z2luLnZlcnNpb24oKSxcbiAgICAgICAgICAgICAgICBtb2RlOiB0eXBlb2Ygb3B0aW9ucy5wbHVnaW5Jc1Rlc3RNb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnBsdWdpbklzVGVzdE1vZGUgPyAndGVzdCcgOiAnbGl2ZScgOiBFbnZpcm9ubWVudC5wbHVnaW4ubW9kZSgpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBvcHRpb25zLnBsdWdpbkJ1dHRvbkNvbG9yID8/IEVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvcigpLFxuICAgICAgICAgICAgICAgIHBhZ2VUeXBlOiBvcHRpb25zLnBsdWdpblBhZ2VUeXBlID8/IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVTdXBwb3J0OiBzdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vZGFsVUk6IHtcbiAgICAgICAgICAgICAgICBvcGVuOiBvcHRpb25zLm1vZGFsSXNPcGVuID8/IEVudmlyb25tZW50Lm1vZGFsVUkub3BlbigpLFxuICAgICAgICAgICAgICAgIHBhZ2U6IG9wdGlvbnMubW9kYWxQYWdlVHlwZSA/PyBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nTW9kZTogb3B0aW9ucy5tb2RhbExvYWRpbmcgPz8gRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0RmVhdHVyZVN1cHBvcnQoZmVhdHVyZXMgPSB7fSwgcGhwRGF0YSkge1xuICAgIGlmICghZmVhdHVyZXNbRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUXSkge1xuICAgICAgICBmZWF0dXJlc1tGZWF0dXJlRmxhZy5DT1VQT05fSU5QVVRdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihwaHBEYXRhLmVuYWJsZV9jb3Vwb25zKSxcbiAgICAgICAgICAgIHZlcnNpb246IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlc1tGZWF0dXJlRmxhZy5PUkRFUl9OT1RFU10pIHtcbiAgICAgICAgZmVhdHVyZXNbRmVhdHVyZUZsYWcuT1JERVJfTk9URVNdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihwaHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyksXG4gICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghZmVhdHVyZXNbRmVhdHVyZUZsYWcuR0lGVENBUkRfSU5QVVRdKSB7XG4gICAgICAgIGZlYXR1cmVzW0ZlYXR1cmVGbGFnLkdJRlRDQVJEX0lOUFVUXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IEJvb2xlYW4ocGhwRGF0YS5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUpLFxuICAgICAgICAgICAgdmVyc2lvbjogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmVzW0ZlYXR1cmVGbGFnLlNUUklQRV0pIHtcbiAgICAgICAgZmVhdHVyZXNbRmVhdHVyZUZsYWcuU1RSSVBFXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5FTlZJUk9OTUVOVF9TRVRfRkVBVFVSRVMsXG4gICAgICAgIHBheWxvYWQ6IGZlYXR1cmVzXG4gICAgfTtcbn1cbmNvbnN0IHVwZGF0ZUxhbmd1YWdlID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkVOVklST05NRU5UX0xBTkdVQUdFKTtcbmNvbnN0IHN0YXJ0TW9kYWxMb2FkaW5nID0gKCk9PnVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxMb2FkaW5nOiAnbG9hZGluZydcbiAgICB9KVxuO1xuY29uc3Qgc3RhcnRNb2RhbFByb2Nlc3NpbmcgPSAoKT0+dXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICBtb2RhbExvYWRpbmc6ICdwcm9jZXNzaW5nJ1xuICAgIH0pXG47XG5jb25zdCBzdG9wTW9kYWxMb2FkaW5nID0gKCk9PnVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxMb2FkaW5nOiAnZmluaXNoZWQnXG4gICAgfSlcbjtcbmNvbnN0IEVudmlyb25tZW50ID0ge1xuICAgIGVudmlyb25tZW50OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudFxuICAgICxcbiAgICBsYW5ndWFnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubGFuZ3VhZ2VcbiAgICAsXG4gICAgdGVzdE1vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5tb2RlID09PSAndGVzdCdcbiAgICAsXG4gICAgY3VzdG9tZXI6IHtcbiAgICAgICAgZXhpc3Rpbmc6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nXG4gICAgICAgICxcbiAgICAgICAgbW9iaWxlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5jdXN0b21lci5tb2JpbGVcbiAgICB9LFxuICAgIHBsdWdpbjoge1xuICAgICAgICB2ZXJzaW9uOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4udmVyc2lvblxuICAgICAgICAsXG4gICAgICAgIG1vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5tb2RlXG4gICAgICAgICxcbiAgICAgICAgYnV0dG9uQ29sb3I6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvclxuICAgICAgICAsXG4gICAgICAgIHBhZ2VUeXBlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGVcbiAgICB9LFxuICAgIG1vZGFsVUk6IHtcbiAgICAgICAgb3BlbjogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubW9kYWxVSS5vcGVuXG4gICAgICAgICxcbiAgICAgICAgcGFnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQubW9kYWxVSS5wYWdlXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ01vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50Lm1vZGFsVUkubG9hZGluZ01vZGVcbiAgICB9XG59O1xuZnVuY3Rpb24gZ2V0TG9jYWxlVGV4dChrZXkpIHtcbiAgICBpZiAoIXBlYWNocGF5aTE4bltrZXldKSB7XG4gICAgICAgIHJldHVybiBwZWFjaHBheWkxOG4udW5rbm93bltFbnZpcm9ubWVudC5sYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgcmV0dXJuIHBlYWNocGF5aTE4bltrZXldW0Vudmlyb25tZW50Lmxhbmd1YWdlKCldO1xufVxuY29uc3QgdXBkYXRlTWVyY2hhbnRDdXJyZW5jeUNvbmZpZyA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9HRU5FUkFMX0NVUlJFTkNZKTtcbmNvbnN0IHVwZGF0ZU1lcmNoYW50VGF4Q29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1RBWCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudEdlbmVyYWxDb25maWcgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudEFjY291bnRDb25maWcgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfQUNDT1VOVCk7XG5jb25zdCB1cGRhdGVNZXJjaGFudFNoaXBwaW5nQ29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1NISVBQSU5HKTtcbmNvbnN0IHVwZGF0ZU1lcmNoYW50SG9zdE5hbWUgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfSE9TVE5BTUUpO1xuY29uc3QgdXBkYXRlTWVyY2hhbnROYW1lID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX05BTUUpO1xuY29uc3QgTWVyY2hhbnRDb25maWd1cmF0aW9uID0ge1xuICAgIG5hbWU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5uYW1lXG4gICAgLFxuICAgIGhvc3ROYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWVcbiAgICAsXG4gICAgZ2VuZXJhbDoge1xuICAgICAgICB3Y0xvY2F0aW9uSW5mb0RhdGE6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLndjTG9jYXRpb25JbmZvRGF0YVxuICAgIH0sXG4gICAgY3VycmVuY3k6IHtcbiAgICAgICAgY29uZmlndXJhdGlvbjogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwuY3VycmVuY3lcbiAgICAgICAgLFxuICAgICAgICBjb2RlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC5jdXJyZW5jeS5jb2RlXG4gICAgICAgICxcbiAgICAgICAgc3ltYm9sOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC5jdXJyZW5jeS5zeW1ib2xcbiAgICB9LFxuICAgIHRheDoge1xuICAgICAgICBkaXNwbGF5TW9kZTogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLnRheC5kaXNwbGF5UHJpY2VzSW5DYXJ0QW5kQ2hlY2tvdXRcbiAgICB9LFxuICAgIHNoaXBwaW5nOiB7XG4gICAgICAgIHNoaXBwaW5nWm9uZXM6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5zaGlwcGluZy5zaGlwcGluZ1pvbmVzXG4gICAgfSxcbiAgICBhY2NvdW50czoge1xuICAgICAgICBsb2dpbkR1cmluZ0NoZWNrb3V0RW5hYmxlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hbGxvd0FjY291bnRDcmVhdGlvbk9yTG9naW5EdXJpbmdDaGVja291dFxuICAgICAgICAsXG4gICAgICAgIGFsbG93R3Vlc3RDaGVja291dDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hbGxvd0d1ZXN0Q2hlY2tvdXRcbiAgICAgICAgLFxuICAgICAgICBnZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hdXRvR2VuZXJhdGVQYXNzd29yZFxuICAgICAgICAsXG4gICAgICAgIGdlbmVyYXRlVXNlcm5hbWVFbmFibGVkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uYWNjb3VudHNBbmRQcml2YWN5LmF1dG9HZW5lcmF0ZVVzZXJuYW1lXG4gICAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKSB7XG4gICAgbGV0IGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICBjb25zdCBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gICAgbGV0IGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICAgIGxldCBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gICAgbGV0IG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICAgIGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbik9PntcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbWF5IG9ubHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0cy4gUmVjZWl2ZWQ6ICcgKyB0eXBlb2YgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgfSBmaW5hbGx5e1xuICAgICAgICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzPy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9O1xuICAgIGNvbnN0IGdldFN0YXRlID0gKCk9PntcbiAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgY2FsbCBnZXRTdGF0ZSBmcm9tIHdpdGhpbiBhIHJlZHVjZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgICB9O1xuICAgIGNvbnN0IHN1YnNjcmliZSA9IChsaXN0ZW5lcik9PntcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBhZGQgYSBzdWJzY3JpYmVyIGZyb20gYSBzdWJzY3JpcHRpb24gZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycz8uc2xpY2UoKSA/PyBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG5leHRMaXN0ZW5lcnM/LnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IHJlbW92ZSBhIHN1YnNjcmliZXIgd2hpbGUgcmVkdWNpbmcgb3IgaW5zaWRlIGEgc3Vic2NyaXB0aW9uIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzPy5zbGljZSgpID8/IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IG5leHRMaXN0ZW5lcnM/LmluZGV4T2YobGlzdGVuZXIpID8/IDA7XG4gICAgICAgICAgICBuZXh0TGlzdGVuZXJzLnNsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGN1cnJlbnRMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnaW5pdCdcbiAgICB9KTtcbiAgICBjb25zdCBzdG9yZTEgPSB7XG4gICAgICAgIGRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICAgc3Vic2NyaWJlXG4gICAgfTtcbiAgICByZXR1cm4gc3RvcmUxO1xufVxuY29uc3QgdXBkYXRlQ2FydENhbGN1bGF0aW9uID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfQ0FMQ1VMQVRJT04pO1xuY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkRFRkFVTFRfQ0FSVF9DT05URU5UUyk7XG5jb25zdCB1cGRhdGVDYXJ0UGFja2FnZVNoaXBwaW5nTWV0aG9kID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLkNBUlRfU0hJUFBJTkdfU0VMRUNUSU9OKTtcbmZ1bmN0aW9uIGNyZWF0ZUNhcnRTZWxlY3RvcnMoY2FydEtleSA9ICcwJykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2Q6IChwYWNrYWdlS2V5ID0gJzAnKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnBhY2thZ2VfcmVjb3JkPy5bcGFja2FnZUtleV0/LnNlbGVjdGVkX21ldGhvZCA/PyAnJ1xuICAgICAgICAsXG4gICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2REZXRhaWxzOiAocGFja2FnZUtleSA9ICcwJyk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5wYWNrYWdlX3JlY29yZD8uW3BhY2thZ2VLZXldID8/IG51bGxcbiAgICAgICAgLFxuICAgICAgICBjb250ZW50czogKCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5jYXJ0ID8/IFtdXG4gICAgICAgICxcbiAgICAgICAgc3VidG90YWw6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5zdWJ0b3RhbCA/PyAwXG4gICAgICAgICxcbiAgICAgICAgZmVlVG90YWw6IChmZWUpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5mZWVzX3JlY29yZFtmZWVdID8/IDBcbiAgICAgICAgLFxuICAgICAgICB0b3RhbEFwcGxpZWRGZWVzOiAoKT0+T2JqZWN0LmVudHJpZXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZmVlc19yZWNvcmQgPz8ge30pLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgW18sIHZhbHVlXSk9PnByZXZpb3VzVmFsdWUgKyAodmFsdWUgPz8gMClcbiAgICAgICAgICAgICwgMClcbiAgICAgICAgLFxuICAgICAgICBjb3Vwb25Ub3RhbDogKGNvdXBvbik9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmNvdXBvbnNfcmVjb3JkW2NvdXBvbl0gPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsQXBwbGllZENvdXBvbnM6ICgpPT5PYmplY3QuZW50cmllcyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5jb3Vwb25zX3JlY29yZCA/PyB7fSkucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBbXywgdmFsdWVdKT0+cHJldmlvdXNWYWx1ZSArICh2YWx1ZSA/PyAwKVxuICAgICAgICAgICAgLCAwKVxuICAgICAgICAsXG4gICAgICAgIGNvdXBvblJlY29yZDogKCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmNvdXBvbnNfcmVjb3JkXG4gICAgICAgICxcbiAgICAgICAgZ2lmdENhcmRUb3RhbDogKGdpZnRDYXJkKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZ2lmdF9jYXJkX3JlY29yZD8uW2dpZnRDYXJkXSA/PyAwXG4gICAgICAgICxcbiAgICAgICAgdG90YWxBcHBsaWVkR2lmdENhcmRzOiAoKT0+T2JqZWN0LmVudHJpZXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZ2lmdF9jYXJkX3JlY29yZCA/PyB7fSkucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBbXywgdmFsdWVdKT0+cHJldmlvdXNWYWx1ZSArICh2YWx1ZSA/PyAwKVxuICAgICAgICAgICAgLCAwKVxuICAgICAgICAsXG4gICAgICAgIHRvdGFsU2hpcHBpbmc6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS50b3RhbF9zaGlwcGluZyA/PyAwXG4gICAgICAgICxcbiAgICAgICAgdG90YWxUYXg6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS50b3RhbF90YXggPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkudG90YWwgPz8gMFxuICAgIH07XG59XG5jb25zdCBEZWZhdWx0Q2FydCA9IGNyZWF0ZUNhcnRTZWxlY3RvcnMoJzAnKTtcbmNvbnN0IENhcnRzID0ge1xuICAgIGFueVNoaXBwaW5nTWV0aG9kc0F2YWlsYWJsZTogKCk9PntcbiAgICAgICAgZm9yIChjb25zdCBjYXJ0S2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkQ2FydCA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldO1xuICAgICAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBwYWNrYWdlS2V5IG9mIE9iamVjdC5rZXlzKGNhbGN1bGF0ZWRDYXJ0LnBhY2thZ2VfcmVjb3JkKSl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcHBpbmdQYWNrYWdlID0gY2FsY3VsYXRlZENhcnQucGFja2FnZV9yZWNvcmRbcGFja2FnZUtleV07XG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwcGluZ1BhY2thZ2UgfHwgT2JqZWN0LmVudHJpZXMoc2hpcHBpbmdQYWNrYWdlLm1ldGhvZHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY29sbGVjdFNlbGVjdGVkU2hpcHBpbmc6ICgpPT57XG4gICAgICAgIGNvbnN0IGNhcnRzID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHM7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY2FydCBvZiBPYmplY3QudmFsdWVzKGNhcnRzKSl7XG4gICAgICAgICAgICBpZiAoIWNhcnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgW3BhY2thZ2VLZXksIHBhY2thZ2VSZWNvcmRdIG9mIE9iamVjdC5lbnRyaWVzKGNhcnQucGFja2FnZV9yZWNvcmQgPz8ge30pKXtcbiAgICAgICAgICAgICAgICBpZiAoIXBhY2thZ2VSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RLZXk6IGAke3BhY2thZ2VLZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwcGluZzogcGFja2FnZVJlY29yZC5zZWxlY3RlZF9tZXRob2RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTaGlwcGluZ01ldGhvZHM7XG4gICAgfSxcbiAgICBzdWJzY3JpcHRpb25QcmVzZW50OiAoKT0+e1xuICAgICAgICBmb3IgKGNvbnN0IGNhcnRLZXkgb2YgT2JqZWN0LmtleXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHMpKXtcbiAgICAgICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRDYXJ0ID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV07XG4gICAgICAgICAgICBpZiAoIWNhbGN1bGF0ZWRDYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsY3VsYXRlZENhcnQuY2FydF9tZXRhLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuY2FydFN1bW1hcnlWaWV3RGF0YSgnMCcpO1xuZnVuY3Rpb24gY2FydFN1bW1hcnlWaWV3RGF0YShjYXJ0S2V5KSB7XG4gICAgcmV0dXJuICgpPT57XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRDYXJ0ID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV07XG4gICAgICAgIGlmICghY2FsY3VsYXRlZENhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FydFN1bW1hcnk6IG5ldyBBcnJheSgpLFxuICAgICAgICAgICAgICAgIGNhcnRNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlzX3ZpcnR1YWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXJ0U3VtbWFyeSA9IFtdO1xuICAgICAgICBjb25zdCBjYXJ0TWV0YSA9IGNhbGN1bGF0ZWRDYXJ0LmNhcnRfbWV0YTtcbiAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGdldExvY2FsZVRleHQoJ3N1YnRvdGFsJyksXG4gICAgICAgICAgICB2YWx1ZTogY2FsY3VsYXRlZENhcnQuc3VtbWFyeS5zdWJ0b3RhbFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCBbY291cG9uLCBhbW91bnRdIG9mIE9iamVjdC5lbnRyaWVzKGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkuY291cG9uc19yZWNvcmQpKXtcbiAgICAgICAgICAgIGlmICghYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGAke2dldExvY2FsZVRleHQoJ2NvdXBvbicpfSAtICgke2NvdXBvbn0pYCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogLWFtb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbZmVlLCBhbW91bnQxXSBvZiBPYmplY3QuZW50cmllcyhjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LmZlZXNfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIWFtb3VudDEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogYEZlZSAtICgke2ZlZX0pYCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYW1vdW50MVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydC5jYXJ0X21ldGEuaXNfdmlydHVhbCkge1xuICAgICAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBnZXRMb2NhbGVUZXh0KCdzaGlwcGluZycpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LnRvdGFsX3NoaXBwaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLnRheC5kaXNwbGF5TW9kZSgpID09PSAnZXhjbHVkZVRheCcpIHtcbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogZ2V0TG9jYWxlVGV4dCgndGF4JyksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkudG90YWxfdGF4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtnaWZ0Q2FyZCwgYW1vdW50Ml0gb2YgT2JqZWN0LmVudHJpZXMoY2FsY3VsYXRlZENhcnQuc3VtbWFyeS5naWZ0X2NhcmRfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIWFtb3VudDIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogYEdpZnQgY2FyZCAtICgke2dpZnRDYXJkfSlgLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAtYW1vdW50MlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGdldExvY2FsZVRleHQoJ3RvdGFsJyksXG4gICAgICAgICAgICB2YWx1ZTogY2FsY3VsYXRlZENhcnQuc3VtbWFyeS50b3RhbFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LFxuICAgICAgICAgICAgY2FydE1ldGFcbiAgICAgICAgfTtcbiAgICB9O1xufVxuY29uc3QgcGVhY2hwYXlpMThuID0ge1xuICAgIGFkZDoge1xuICAgICAgICAnZGUtREUnOiAnKyBIaW56dWbDvGdlbicsXG4gICAgICAgICdlbi1VUyc6ICcrIEFkZCcsXG4gICAgICAgICdlcy1FUyc6ICcrIEFncmVnYXInLFxuICAgICAgICBmcjogJysgQWpvdXRlcicsXG4gICAgICAgIGl0OiAnKyBBZ2dpdW5nZXJlJyxcbiAgICAgICAgamE6ICcrIOi/veWKoCcsXG4gICAgICAgICdyby1STyc6ICcrIEFkxIN1Z2EnLFxuICAgICAgICBhcjogJ9mK2LbZitmBICsnLFxuICAgICAgICBjYTogJysgQWZlZ2VpeCcsXG4gICAgICAgICdjcy1DWic6ICcrIFDFmWlkYXQnLFxuICAgICAgICAnZGEtREsnOiAnKyBUaWxmw7hqZScsXG4gICAgICAgIGVsOiAnKyDOoM+Bzr/Pg864zq7Ous63JyxcbiAgICAgICAgJ2hpLUlOJzogJysg4KSc4KWL4KSh4KS84KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJysg7LaU6rCA7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJysgQWRkw6lpZXJlbicsXG4gICAgICAgICdubC1OTCc6ICcrIFRvZXZvZWdlbicsXG4gICAgICAgICdwdC1QVCc6ICcrIEFkaWNpb25hcicsXG4gICAgICAgICdydS1SVSc6ICcrINCU0L7QsdCw0LLQu9GP0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICcrIERvZGFqJyxcbiAgICAgICAgJ3N2LVNFJzogJysgTMOkZ2cgdGlsbCcsXG4gICAgICAgIHRoOiAnKyDguYDguJ7guLTguYjguKEnLFxuICAgICAgICB1azogJysg0JTQvtC00LDRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJysg5re75YqgJyxcbiAgICAgICAgJ3poLVRXJzogJysg5re75YqgJ1xuICAgIH0sXG4gICAgJ2VtcHR5LWNhcnQnOiB7XG4gICAgICAgICdlbi1VUyc6ICdDYXJ0IGlzIGVtcHR5JyxcbiAgICAgICAgJ2RlLURFJzogJ0t1cnZlbiBlciB0b20nLFxuICAgICAgICAnZXMtRVMnOiAnRWwgY2Fycml0byBlc3RhIHZhY8OtbycsXG4gICAgICAgIGZyOiAnTGUgcGFuaWVyIGVzdCB2aWRlJyxcbiAgICAgICAgaXQ6ICdJbCBjYXJyZWxsbyDDqCB2dW90bycsXG4gICAgICAgIGphOiAn44Kr44O844OI44GM56m644Gn44GZJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NvyJl1bCBlc3RlIGdvbCcsXG4gICAgICAgIGFyOiAn2KfZhNio2LfYp9mC2Ycg2K7Yp9mE2YrZhycsXG4gICAgICAgIGNhOiAnRWwgY2FycmV0w7MgZXN0w6AgYnVpdCcsXG4gICAgICAgICdjcy1DWic6ICdLb8Whw61rIGplIHByw6F6ZG7DvScsXG4gICAgICAgICdkYS1ESyc6ICdLb8WhYXJpY2EgamUgcHJhem5hJyxcbiAgICAgICAgZWw6ICfOpM6/IM66zrHOu86szrjOuSDOtc6vzr3Osc65IM6szrTOtc65zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KS+4KSw4KWN4KSfIOCkluCkvuCksuClgCDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6l67CU6rWs64uI6rCAIOu5hOyWtCDsnojsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dlZW5jaGVuIGFzcyBlaWRlbCcsXG4gICAgICAgICdubC1OTCc6ICdXaW5rZWx3YWdlbiBpcyBsZWVnJyxcbiAgICAgICAgJ3B0LVBUJzogJ2NhcnJpbmhvIGVzdGEgdmF6aW8nLFxuICAgICAgICAncnUtUlUnOiAn0JrQvtGA0LfQuNC90LAg0L/Rg9GB0YLQsCcsXG4gICAgICAgICdzbC1TSSc6ICdLb8WhYXJpY2EgamUgcHJhem5hJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ZhcnVrb3JnZW4gw6RyIHRvbScsXG4gICAgICAgIHRoOiAn4Lij4LiW4LmA4LiC4LmH4LiZ4Lin4LmI4Liy4LiH4LmA4Lib4Lil4LmI4LiyJyxcbiAgICAgICAgdWs6ICfQmtC+0YjQuNC6INC/0L7RgNC+0LbQvdGW0LknLFxuICAgICAgICAnemgtQ04nOiAn6LSt54mp6L2m5piv56m655qEJyxcbiAgICAgICAgJ3poLVRXJzogJ+i0reeJqei9puaYr+epuueahCdcbiAgICB9LFxuICAgICdsaW5rZWQtcHJvZHVjdHMtdGl0bGUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdEYXMga8O2bm50ZSBkaXIgYXVjaCBnZWZhbGxlbi4uLicsXG4gICAgICAgICdlbi1VUyc6ICdZb3UgbWlnaHQgYWxzbyBsaWtlLi4uJyxcbiAgICAgICAgJ2VzLUVTJzogJ1RhbWJpw6luIHBvZHLDrWEgZ3VzdGFydGUuLi4nLFxuICAgICAgICBmcjogJ3ZvdXMgcG91cnJpZXogYXVzc2kgYWltZXIuLi4nLFxuICAgICAgICBpdDogJ1BvdHJlYmJlIHBpYWNlcnRpIGFuY2hlLi4uJyxcbiAgICAgICAgamE6ICfjgYLjgarjgZ/jga/jgYrjgZ3jgonjgY/jgZ3jgozjgoLlpb3jgY3jgafjgZfjgofjgYYuLi4nLFxuICAgICAgICAncm8tUk8nOiAnUy1hciBwdXRlYSBzYS10aSBwbGFjYSBzaS4uLicsXG4gICAgICAgIGFyOiAn2YLYryDZiti52KzYqNmDINin2YrYttinJyxcbiAgICAgICAgY2E6ICdwb3RzZXIgdGFtYsOpIHRcXCdhZ3JhZGEuLi4nLFxuICAgICAgICAnY3MtQ1onOiAnbW9obG8gYnkgc2UgdsOhbSBsw61iaXQuLi4nLFxuICAgICAgICAnZGEtREsnOiAnRHUga2FuIG9nc8OlIGxpZGUuLi4nLFxuICAgICAgICBlbDogJ86cz4DOv8+BzrXOryDOtc+Azq/Pg863z4Igzr3OsSDPg86xz4IgzrHPgc6tz4POtc65Li4uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CktuCkvuCkr+CkpiDgpKTgpYHgpK7gpY3gpLngpYcg4KSv4KS5IOCkreClgCDgpIXgpJrgpY3gpJvgpL4g4KSy4KSX4KWHLi4uJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uLueyLoOydgCDrmJDtlZwg7KKL7JWE7ZWgIOyImOuPhCDsnojsirXri4jri6QuLi4nLFxuICAgICAgICAnbGItTFUnOiAnRGlyIGvDq25udCBvY2ggZ8OkcmVuLi4uJyxcbiAgICAgICAgJ25sLU5MJzogJ01pc3NjaGllbiB2aW5kIGplIGRpdCBvb2sgbGV1ay4uLicsXG4gICAgICAgICdwdC1QVCc6ICd2b2PDqiBwb2RlIGdvc3RhciB0YW1iw6ltLi4uJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0LDQvCDRgtCw0LrQttC1INC80L7QttC10YIg0L/QvtC90YDQsNCy0LjRgtGM0YHRjy4uLicsXG4gICAgICAgICdzbC1TSSc6ICdNb3JkYSB2YW0gYm8gdsWhZcSNIHR1ZGkuLi4nLFxuICAgICAgICAnc3YtU0UnOiAnRHUga2Fuc2tlIG9ja3PDpSBnaWxsYXIuLi4nLFxuICAgICAgICB0aDogJ+C4hOC4uOC4k+C4reC4suC4iOC4iuC4reC4mi4uLicsXG4gICAgICAgIHVrOiAn0JLQsNC8INGC0LDQutC+0LYg0LzQvtC20LUg0YHQv9C+0LTQvtCx0LDRgtC40YHRjy4uLicsXG4gICAgICAgICd6aC1DTic6ICfkvaDlj6/og73ov5jllpzmrKIuLi4nLFxuICAgICAgICAnemgtVFcnOiAn5L2g5Y+v6IO96YKE5Zac5q2hLi4uJ1xuICAgIH0sXG4gICAgdmVyaWZpZWQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ1ZlcmlmaXppZXJ0JyxcbiAgICAgICAgJ2VuLVVTJzogJ1ZlcmlmaWVkJyxcbiAgICAgICAgJ2VzLUVTJzogJ1ZlcmlmaWNhZG8nLFxuICAgICAgICBmcjogJ1bDqXJpZmnDqScsXG4gICAgICAgIGl0OiAndmVyaWZpY2F0bycsXG4gICAgICAgIGphOiAn56K66KqN5riI44G/JyxcbiAgICAgICAgJ3JvLVJPJzogJ1ZlcmlmaWNhdCcsXG4gICAgICAgIGFyOiAn2KrZhSDYp9mE2KrYrdmC2YInLFxuICAgICAgICBjYTogJ1ZlcmlmaWNhdCcsXG4gICAgICAgICdjcy1DWic6ICdPdsSbxZllbm8nLFxuICAgICAgICAnZGEtREsnOiAnVmVyaWZpY2VyZXQnLFxuICAgICAgICBlbDogJ86Vz4DOsc67zrfOuM61z4XOvM6tzr3OvycsXG4gICAgICAgICdoaS1JTic6ICfgpLjgpKTgpY3gpK/gpL7gpKrgpL/gpKQnLFxuICAgICAgICAna28tS1InOiAn7ZmV7J2465CoJyxcbiAgICAgICAgJ2xiLUxVJzogJ1ZlcmlmaXrDqWllcnQnLFxuICAgICAgICAnbmwtTkwnOiAnR2V2ZXJpZmllZXJkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ZlcmlmaWNhZGEnLFxuICAgICAgICAncnUtUlUnOiAn0J/RgNC+0LLQtdGA0LXQvdC+JyxcbiAgICAgICAgJ3NsLVNJJzogJ1ByZXZlcmplbm8nLFxuICAgICAgICAnc3YtU0UnOiAnVmVyaWZpZXJhZCcsXG4gICAgICAgIHRoOiAn4LiV4Lij4Lin4LiI4Liq4Lit4Lia4LmB4Lil4LmJ4LinJyxcbiAgICAgICAgdWs6ICfQn9C10YDQtdCy0ZbRgNC10L3QvicsXG4gICAgICAgICd6aC1DTic6ICflt7Lpqozor4EnLFxuICAgICAgICAnemgtVFcnOiAn5bey6amX6K2JJ1xuICAgIH0sXG4gICAgJ2NvdXBvbi1vcHRpb24nOiB7XG4gICAgICAgICdkZS1ERSc6ICcrIEVJTkVOIEdVVFNDSEVJTiBDT0RFIEhJTlpVRsOcR0VOJyxcbiAgICAgICAgJ2VuLVVTJzogJysgQUREIEEgQ09VUE9OIENPREUnLFxuICAgICAgICAnZXMtRVMnOiAnKyBBw5FBRElSIFVOIEPDk0RJR08gREUgQ1VQw5NOJyxcbiAgICAgICAgZnI6ICcrIEFKT1VURVIgVU4gQ09ERSBDT1VQT04nLFxuICAgICAgICBpdDogJysgQUdHSVVOR0kgVU4gQ09ESUNFIENPVVBPTicsXG4gICAgICAgIGphOiAnKyDjgq/jg7zjg53jg7PjgrPjg7zjg4njgpLov73liqAnLFxuICAgICAgICAncm8tUk8nOiAnKyBBRMSCVUdByJpJIFVOIENPRCBERSBDVVBPTicsXG4gICAgICAgIGFyOiAn2KPYttmBINix2YXYsiDYp9mE2YLYs9mK2YXYqScsXG4gICAgICAgIGNhOiAnQWZlZ2l1IHVuIGNvZGkgZGUgY3Vww7MnLFxuICAgICAgICAnY3MtQ1onOiAnUMWZaWRlanRlIGvDs2Qga3Vww7NudScsXG4gICAgICAgICdkYS1ESyc6ICdUaWxmw7hqIGVuIGt1cG9ua29kZScsXG4gICAgICAgIGVsOiAnzqDPgc6/z4POuM6tz4PPhM61IM6tzr3Osc69IM66z4nOtM65zrrPjCDOus6/z4XPgM6/zr3Ouc6/z40nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWC4KSq4KSoIOCkleCli+CkoSDgpJzgpYvgpKHgpLzgpYfgpIInLFxuICAgICAgICAna28tS1InOiAn7L+g7Y+wIOy9lOuTnCDstpTqsIAnLFxuICAgICAgICAnbGItTFUnOiAnRsO8w7xndCBlIENvdXBvbiBDb2RlIGRlcmLDpGknLFxuICAgICAgICAnbmwtTkwnOiAnVm9lZyBlZW4gY291cG9uY29kZSB0b2UnLFxuICAgICAgICAncHQtUFQnOiAnQWRpY2lvbmFyIHVtIGPDs2RpZ28gZGUgY3Vwb20nLFxuICAgICAgICAncnUtUlUnOiAn0JTQvtCx0LDQstGM0YLQtSDQutC+0LQg0LrRg9C/0L7QvdCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0RvZGFqdGUga29kbyBrdXBvbmEnLFxuICAgICAgICAnc3YtU0UnOiAnTMOkZ2cgdGlsbCBlbiBrdXBvbmdrb2QnLFxuICAgICAgICB0aDogJ+C5gOC4nuC4tOC5iOC4oeC4o+C4q+C4seC4quC4hOC4ueC4m+C4reC4hycsXG4gICAgICAgIHVrOiAn0JTQvtC00LDQudGC0LUg0LrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICd6aC1DTic6ICfmt7vliqDkvJjmg6DliLjku6PnoIEnLFxuICAgICAgICAnemgtVFcnOiAn5re75Yqg5YSq5oOg5Yi45Luj56K8J1xuICAgIH0sXG4gICAgJ2Vycm9yLW9jY3VycmVkJzoge1xuICAgICAgICAnZGUtREUnOiAnRW50c2NodWxkaWd1bmcsIGV0d2FzIGlzdCBzY2hpZWYgZ2VsYXVmZW4uIEJpdHRlIGFrdHVhbGlzaWVyZW4gU2llIGRpZSBTZWl0ZSB1bmQgdmVyc3VjaGVuIFNpZSBlcyBlcm5ldXQuJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NvcnJ5LCBzb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UgYW5kIHRyeSBhZ2Fpbi4nLFxuICAgICAgICAnZXMtRVMnOiAnUGVyZMOzbiwgYWxnbyBzYWxpw7MgbWFsLiBBY3R1YWxpY2UgbGEgcMOhZ2luYSB5IHZ1ZWx2YSBhIGludGVudGFybG8uJyxcbiAgICAgICAgZnI6ICdEw6lzb2zDqSwgcXVlbHF1ZSBjaG9zZSBzXFwnZXN0IG1hbCBwYXNzw6kuIFZldWlsbGV6IGFjdHVhbGlzZXIgbGEgcGFnZSBldCByw6llc3NheWVyLicsXG4gICAgICAgIGl0OiAnU2N1c2EsIHF1YWxjb3NhIMOoIGFuZGF0byBzdG9ydG8uIFBlcmZhdm9yZSByaWNhcmljYSBsYSBwYWdpbmEgZSByaXByb3ZhLicsXG4gICAgICAgICdyby1STyc6ICdTY3V6ZSwgY2V2YSBhIG1lcnMgZ3JlyJlpdC4gQWN0dWFsaXphyJtpIHBhZ2luYSDImWkgw65uY2VyY2HIm2kgZGluIG5vdS4nLFxuICAgICAgICBhcjogJ9i52LDYsdin2Iwg2YfZhtin2YMg2K7Yt9ijINmF2KcuINmK2LHYrNmJINiq2K3Yr9mK2Ksg2KfZhNi12YHYrdipINmI2K3Yp9mI2YQg2YXYsdipINij2K7YsdmJLicsXG4gICAgICAgIGNhOiAnSG8gc2VudGltLCBhbGd1bmEgY29zYSBoYSBhbmF0IG1hbGFtZW50LiBBY3R1YWxpdHpldSBsYSBww6BnaW5hIGkgdG9ybmV1LWhvIGEgcHJvdmFyLicsXG4gICAgICAgICdjcy1DWic6ICdQcm9tacWILCBuxJtjbyBzZSBwb2themlsby4gT2Jub3Z0ZSBzdHLDoW5rdSBhIHprdXN0ZSB0byB6bm92dS4nLFxuICAgICAgICAnZGEtREsnOiAnVW5kc2t5bGQsIG5vZ2V0IGdpayBnYWx0LiBPcGRhdGVyIHNpZGVuLCBvZyBwcsO4diBpZ2VuLicsXG4gICAgICAgIGVsOiAnzqPPhc6zzr3Pjs68zrcsIM66zqzPhM65IM+Azq7Os861IM+Dz4TPgc6xzrLOrC4gzpHOvc6xzr3Otc+Oz4PPhM61IM+Ezrcgz4POtc67zq/OtM6xIM66zrHOuSDOtM6/zrrOuc68zqzPg8+EzrUgzr7Osc69zqwuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCljeCkt+CkruCkviDgpJXgpLDgpYfgpIIsIOCkleClgeCkmyDgpJfgpLLgpKQg4KS54KWLIOCkl+Ckr+CkvuClpCDgpKrgpYPgpLfgpY3gpKAg4KSV4KWLIOCksOClgOCkq+CljeCksOClh+CktiDgpJXgpLDgpYfgpIIg4KSU4KSwIOCkquClgeCkqDog4KSq4KWN4KSw4KSv4KS+4KS4IOCkleCksOClh+CkguClpCcsXG4gICAgICAgICdrby1LUic6ICfso4TshqHtlanri4jri6QuIOusuOygnOqwgCDrsJzsg53tlojsirXri4jri6QuIO2OmOydtOyngOulvCDsg4jroZzqs6DsuajtlZjqs6Ag64uk7IucIOyLnOuPhO2VmOyLreyLnOyYpC4nLFxuICAgICAgICAnbGItTFUnOiAnRW50c2Now6tsbGVndCwgZXBwZXMgYXNzIGZhbHNjaCBnYWFuZy4gRXJmcsOrc2NodCB3LmUuZy4gZFxcJ1PDpGl0IGEgcHJvYsOpaWVydCBuYWNoIGVuZyBLw6lpZXIuJyxcbiAgICAgICAgJ25sLU5MJzogJ1NvcnJ5LCBlciBnaW5nIGlldHMgbWlzLiBWZXJ2ZXJzIGRlIHBhZ2luYSBlbiBwcm9iZWVyIGhldCBvcG5pZXV3LicsXG4gICAgICAgICdwdC1QVCc6ICdEZXNjdWxwZSwgYWxnbyBkZXUgZXJyYWRvLiBBdHVhbGl6ZSBhIHDDoWdpbmEgZSB0ZW50ZSBub3ZhbWVudGUuJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CY0LfQstC40L3QuNGC0LUsINGH0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LouINCe0LHQvdC+0LLQuNGC0LUg0YHRgtGA0LDQvdC40YbRgyDQuCDQv9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3LicsXG4gICAgICAgICdzbC1TSSc6ICdPcHJvc3RpdGUsIG5la2FqIGplIMWhbG8gbmFyb2JlLiBPc3Zlxb5pdGUgc3RyYW4gaW4gcG9za3VzaXRlIHpub3ZhLicsXG4gICAgICAgICdzdi1TRSc6ICdGw7ZybMOldCwgbsOlZ290IGdpY2sgZmVsLiBVcHBkYXRlcmEgc2lkYW4gb2NoIGbDtnJzw7ZrIGlnZW4uJyxcbiAgICAgICAgdGg6ICfguILguK3guYLguJfguKnguKHguLXguJrguLLguIfguK3guKLguYjguLLguIfguJzguLTguJTguJ7guKXguLLguJQuIOC5guC4m+C4o+C4lOC4o+C4teC5gOC4n+C4o+C4iuC4q+C4meC5ieC4suC5geC4peC5ieC4p+C4peC4reC4h+C4reC4teC4geC4hOC4o+C4seC5ieC4hycsXG4gICAgICAgIHVrOiAn0JLQuNCx0LDRh9GC0LUsINGJ0L7RgdGMINC/0ZbRiNC70L4g0L3QtSDRgtCw0LouINCe0L3QvtCy0ZbRgtGMINGB0YLQvtGA0ZbQvdC60YMg0YLQsCDQv9C+0LLRgtC+0YDRltGC0Ywg0YHQv9GA0L7QsdGDLicsXG4gICAgICAgICd6aC1DTic6ICfmirHmrYnvvIzlh7rkuobkuIDkupvpl67popjjgIIg6K+35Yi35paw6aG16Z2i5bm26YeN6K+V44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+aKseatie+8jOWHuuS6huS4gOS6m+WVj+mhjOOAgiDoq4vliLfmlrDpoIHpnaLkuKbph43oqabjgIInXG4gICAgfSxcbiAgICAnZ2lmdC1vcHRpb24nOiB7XG4gICAgICAgICdkZS1ERSc6ICcrIEdFU0NIRU5LS0FSVEUvR0VTQ0hFTkstS1JFRElUIEVJTkzDllNFTicsXG4gICAgICAgICdlbi1VUyc6ICcrIFJFREVFTSBHSUZUIENBUkQvU1RPUkUgQ1JFRElUJyxcbiAgICAgICAgJ2VzLUVTJzogJysgQ0FOSkVBUiBUQVJKRVRBIERFIFJFR0FMTy9DUsOJRElUTyBERSBUSUVOREEnLFxuICAgICAgICBmcjogJysgw4lDSEFOR0VSIExBIENBUlRFLUNBREVBVS9MRSBDUsOJRElUIERVIE1BR0FTSU4nLFxuICAgICAgICBpdDogJysgVVRJTElaWkEgQ0FSVEEgUkVHQUxPL0NSRURJVE8gTkVHT1pJTycsXG4gICAgICAgIGphOiAnKyDjgq7jg5Xjg4jjgqvjg7zjg4kv44K544OI44Ki44Kv44Os44K444OD44OI44KS5Yip55So44GZ44KLJyxcbiAgICAgICAgJ3JvLVJPJzogJysgUsSCc2N1bXDEg3JhyJtpIGNhcmR1bC9jYWRvdWwgZGUgY3JlZGl0IGNhZG91JyxcbiAgICAgICAgYXI6ICfYp9iz2KrYsdiv2KfYryDYqNi32KfZgtipINin2YTZh9iv2KfZitinIC8g2LHYtdmK2K8g2KfZhNmF2KrYrNixJyxcbiAgICAgICAgY2E6ICdCZXNjYW52aWEgZWwgY3LDqGRpdCBkZSBsYSB0YXJnZXRhIHJlZ2FsIG8gZGUgbGEgYm90aWdhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1VwbGF0bsSbdGUgZMOhcmtvdm91IGthcnR1L2tyZWRpdCBvYmNob2R1JyxcbiAgICAgICAgJ2RhLURLJzogJ0luZGzDuHMgZ2F2ZWtvcnQvYnV0aWtza3JlZGl0JyxcbiAgICAgICAgZWw6ICfOlc6+zrHPgc6zz4XPgc+Oz4PPhM61IM+AzrnPg8+Ez4nPhM65zrrOriDOus6sz4HPhM6xIM60z47Pgc6/z4UvzrrOsc+EzqzPg8+EzrfOvM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkieCkquCkueCkvuCksCDgpJXgpL7gpLDgpY3gpKEv4KS44KWN4KSf4KWL4KSwIOCkleCljeCksOClh+CkoeCkv+CknyDgpLDgpL/gpKHgpYDgpK4g4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wv7Iqk7Yag7Ja0IO2BrOugiOuUpyDsgqzsmqknLFxuICAgICAgICAnbGItTFUnOiAnRXJsw6lpcyBLYWRkb2thYXJ0L0dlc2Now6RmdHNrcmVkaXR0JyxcbiAgICAgICAgJ25sLU5MJzogJ0NhZGVhdWthYXJ0L3dpbmtlbHRlZ29lZCBpbndpc3NlbGVuJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Jlc2dhdGFyIGNhcnTDo28tcHJlc2VudGUgLyBjcsOpZGl0byBkYSBsb2phJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7Qs9Cw0YHQuNGC0Ywg0L/QvtC00LDRgNC+0YfQvdGD0Y4g0LrQsNGA0YLRgyAvINC60YDQtdC00LjRgiDQvNCw0LPQsNC30LjQvdCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1Vub3bEjWl0ZSBkYXJpbG5vIGthcnRpY28vZG9icm9pbWV0amUgdiB0cmdvdmluaScsXG4gICAgICAgICdzdi1TRSc6ICdMw7ZzIGluIHByZXNlbnRrb3J0L2J1dGlrc2tyZWRpdCcsXG4gICAgICAgIHRoOiAn4LmB4Lil4LiB4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNL+C5gOC4hOC4o+C4lOC4tOC4leC4o+C5ieC4suC4meC4hOC5ieC4sicsXG4gICAgICAgIHVrOiAn0JDQutGC0LjQstGD0LnRgtC1INC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDL9C60YDQtdC00LjRgiDRgyDQvNCw0LPQsNC30LjQvdGWJyxcbiAgICAgICAgJ3poLUNOJzogJ+WFkeaNouekvOWTgeWNoS/llYblupfkv6HnlKgnLFxuICAgICAgICAnemgtVFcnOiAn5YWM5o+b56au5ZOB5Y2hL+WVhuW6l+S/oeeUqCdcbiAgICB9LFxuICAgICdzZW5kLXRvJzoge1xuICAgICAgICAnZGUtREUnOiAnU2VuZGVuIGFuJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NlbmQgdG8nLFxuICAgICAgICAnZXMtRVMnOiAnRW52aWFyIGEnLFxuICAgICAgICBmcjogJ0Vudm95ZXIgw6AnLFxuICAgICAgICBpdDogJ0ludmlhcmUgYScsXG4gICAgICAgIGphOiAn6YCB5L+h5YWIJyxcbiAgICAgICAgJ3JvLVJPJzogJ1RyaW1pdGUgY2F0cmUnLFxuICAgICAgICBhcjogJ9in2LHYs9mEINil2YTZiScsXG4gICAgICAgIGNhOiAnRW52aWEgYScsXG4gICAgICAgICdjcy1DWic6ICdQb3NsYXQga29tdScsXG4gICAgICAgICdkYS1ESyc6ICdTZW5kIHRpbCcsXG4gICAgICAgIGVsOiAnzqPPhM6tzrvOvc+JIM+DzrUnLFxuICAgICAgICAnaGktSU4nOiAn4KSt4KWH4KSc4KSo4KS+JyxcbiAgICAgICAgJ2tvLUtSJzogJ+uztOuCtOq4sCcsXG4gICAgICAgICdsYi1MVSc6ICdTY2jDqWNrZW4nLFxuICAgICAgICAnbmwtTkwnOiAnVmVyemVuZGVuIG5hYXInLFxuICAgICAgICAncHQtUFQnOiAnRW52aWFyIHBhcmEnLFxuICAgICAgICAncnUtUlUnOiAn0J7RgtC/0YDQsNCy0LjRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvxaFsamknLFxuICAgICAgICAnc3YtU0UnOiAnU2tpY2thIHRpbGwnLFxuICAgICAgICB0aDogJ+C4quC5iOC4h+C4luC4tuC4hycsXG4gICAgICAgIHVrOiAn0JLRltC00L/RgNCw0LLQuNGC0LgnLFxuICAgICAgICAnemgtQ04nOiAn5Y+R57uZJyxcbiAgICAgICAgJ3poLVRXJzogJ+eZvOe1pidcbiAgICB9LFxuICAgICdteS1vcmRlcic6IHtcbiAgICAgICAgJ2RlLURFJzogJ01laW5lIEJlc3RlbGx1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnTXkgb3JkZXInLFxuICAgICAgICAnZXMtRVMnOiAnTWkgcGVkaWRvJyxcbiAgICAgICAgZnI6ICdNYSBjb21tYW5kZScsXG4gICAgICAgIGl0OiAnSWwgbWlvIG9yZGluZScsXG4gICAgICAgIGphOiAn5rOo5paHJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NvbWFuZGEgbWVhJyxcbiAgICAgICAgYXI6ICfYt9mE2KjZiicsXG4gICAgICAgIGNhOiAnRWwgbWV1IG9yZHJlJyxcbiAgICAgICAgJ2NzLUNaJzogJ01vamUgb2JqZWRuw6F2a2EnLFxuICAgICAgICAnZGEtREsnOiAnTWluIGJlc3RpbGxpbmcnLFxuICAgICAgICBlbDogJ86XIM+AzrHPgc6xzrPOs861zrvOr86xIM68zr/PhScsXG4gICAgICAgICdoaS1JTic6ICfgpK7gpYfgpLDgpYcg4KSG4KSm4KWH4KS2JyxcbiAgICAgICAgJ2tvLUtSJzogJ+uCtCDso7zrrLgnLFxuICAgICAgICAnbGItTFUnOiAnTWVuZyBCZXN0ZWxsdW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ01pam4gYmVzdGVsbGluZycsXG4gICAgICAgICdwdC1QVCc6ICdNZXUgcGVkaWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cc0L7QuSDQt9Cw0LrQsNC3JyxcbiAgICAgICAgJ3NsLVNJJzogJ01vaiB1a2F6JyxcbiAgICAgICAgJ3N2LVNFJzogJ01pbiBvcmRlcicsXG4gICAgICAgIHRoOiAn4LiE4Liz4Liq4Lix4LmI4LiH4LiC4Lit4LiH4LiJ4Lix4LiZJyxcbiAgICAgICAgdWs6ICfQnNC+0ZQg0LfQsNC80L7QstC70LXQvdC90Y8nLFxuICAgICAgICAnemgtQ04nOiAn5oiR55qE6K6i5Y2VJyxcbiAgICAgICAgJ3poLVRXJzogJ+aIkeeahOioguWWridcbiAgICB9LFxuICAgICdyZWFkeS10by1jaGVjay1vdXQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdCZXJlaXQgenVtIEF1c2NoZWNrZW4/JyxcbiAgICAgICAgJ2VuLVVTJzogJ1JlYWR5IHRvIGNoZWNrIG91dD8nLFxuICAgICAgICAnZXMtRVMnOiAnwr9MaXN0byBwYXJhIHNhbGlyPycsXG4gICAgICAgIGZyOiAnUHLDqnQgw6AgdsOpcmlmaWVyID8nLFxuICAgICAgICBpdDogJ1Byb250byBwZXIgaWwgY2hlY2stb3V0PycsXG4gICAgICAgIGphOiAn5pSv5omV44GE44KS44GZ44KL5rqW5YKZ44Gv44Gn44GN44G+44GX44Gf44GLPycsXG4gICAgICAgICdyby1STyc6ICdTdW50ZcibaSBnYXRhIHPEgyB2aXppdGHIm2k/JyxcbiAgICAgICAgYXI6ICfZh9mEINij2YbYqiDYrNin2YfYsiDZhNmE2KrYs9is2YrZhNifJyxcbiAgICAgICAgY2E6ICdBIHB1bnQgcGVyIGZlciBlbCBjaGVjay1vdXQ/JyxcbiAgICAgICAgJ2NzLUNaJzogJ0pzdGUgcMWZaXByYXZlbmkgc2UgcG9kw612YXQ/JyxcbiAgICAgICAgJ2RhLURLJzogJ0tsYXIgdGlsIGF0IHRqZWtrZSB1ZD8nLFxuICAgICAgICBlbDogJ86Vzq/Pg8+EzrUgzq3PhM6/zrnOvM6/zrkgzrPOuc6xIGNoZWNrIG91dDsnLFxuICAgICAgICAnaGktSU4nOiAn4KSa4KWH4KSVIOCkhuCkieCknyDgpJXgpLDgpKjgpYcg4KSV4KWHIOCksuCkv+CkjyDgpKTgpYjgpK/gpL7gpLAg4KS54KWI4KSCPycsXG4gICAgICAgICdrby1LUic6ICfssrTtgazslYTsm4PtlaAg7KSA67mE6rCAIOuQmOyFqOuCmOyalD8nLFxuICAgICAgICAnbGItTFUnOiAnUHJldHQgZmlyIHplIGNoZWNrZW4/JyxcbiAgICAgICAgJ25sLU5MJzogJ0tsYWFyIG9tIHVpdCB0ZSBjaGVja2VuPycsXG4gICAgICAgICdwdC1QVCc6ICdQcm9udG8gcGFyYSBmaW5hbGl6YXIgYSBjb21wcmE/JyxcbiAgICAgICAgJ3J1LVJVJzogJ9CT0L7RgtC+0LLRiyDQv9GA0L7QstC10YDQuNGC0Yw/JyxcbiAgICAgICAgJ3NsLVNJJzogJ1N0ZSBwcmlwcmF2bGplbmkgbmEgb2RqYXZvPycsXG4gICAgICAgICdzdi1TRSc6ICdLbGFyIGF0dCBjaGVja2EgdXQ/JyxcbiAgICAgICAgdGg6ICfguJ7guKPguYnguK3guKHguJfguLXguYjguIjguLDguYDguIrguYfguITguYDguK3guLLguJfguYw/JyxcbiAgICAgICAgdWs6ICfQk9C+0YLQvtCy0ZYg0L/QtdGA0LXQstGW0YDQuNGC0Lg/JyxcbiAgICAgICAgJ3poLUNOJzogJ+WHhuWkh+mAgOaIv+S6huWQl++8nycsXG4gICAgICAgICd6aC1UVyc6ICfmupblgpnpgIDmiL/kuobll47vvJ8nXG4gICAgfSxcbiAgICBpbmZvOiB7XG4gICAgICAgICdkZS1ERSc6ICdJbmZvcm1hdGlvbicsXG4gICAgICAgICdlbi1VUyc6ICdJbmZvJyxcbiAgICAgICAgJ2VzLUVTJzogJ0luZm9ybWFjacOzbicsXG4gICAgICAgIGZyOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICBpdDogJ0luZm9ybWF6aW9uaScsXG4gICAgICAgIGphOiAn5oOF5aCxJyxcbiAgICAgICAgJ3JvLVJPJzogJ0luZm9ybWHIm2llJyxcbiAgICAgICAgYXI6ICfZhdi52YTZiNmF2KknLFxuICAgICAgICBjYTogJ0luZm9ybWFjacOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ0luZm9ybWFjZScsXG4gICAgICAgICdkYS1ESyc6ICdJbmZvcm1hdGlvbicsXG4gICAgICAgIGVsOiAnzqDOu863z4HOv8+Gzr/Pgc6vzrXPgicsXG4gICAgICAgICdoaS1JTic6ICfgpJzgpL7gpKjgpJXgpL7gpLDgpYAnLFxuICAgICAgICAna28tS1InOiAn7KCV67O0JyxcbiAgICAgICAgJ2xiLUxVJzogJ0luZm9ybWF0aW91bmVuJyxcbiAgICAgICAgJ25sLU5MJzogJ0luZm9ybWF0aWUnLFxuICAgICAgICAncHQtUFQnOiAnRW0gZm9ybWHDp8OjbycsXG4gICAgICAgICdydS1SVSc6ICfQmNC90YTQvtGA0LzQsNGG0LjRjycsXG4gICAgICAgICdzbC1TSSc6ICdJbmZvcm1hY2lqZScsXG4gICAgICAgICdzdi1TRSc6ICdJbmZvcm1hdGlvbicsXG4gICAgICAgIHRoOiAn4LiC4LmJ4Lit4Lih4Li54LilJyxcbiAgICAgICAgdWs6ICfQhtC90YTQvtGA0LzQsNGG0ZbRjycsXG4gICAgICAgICd6aC1DTic6ICfkv6Hmga8nLFxuICAgICAgICAnemgtVFcnOiAn5L+h5oGvJ1xuICAgIH0sXG4gICAgcGF5bWVudDoge1xuICAgICAgICAnZGUtREUnOiAnWmFobHVuZycsXG4gICAgICAgICdlbi1VUyc6ICdQYXltZW50JyxcbiAgICAgICAgJ2VzLUVTJzogJ1BhZ28nLFxuICAgICAgICBmcjogJ1BhaWVtZW50JyxcbiAgICAgICAgaXQ6ICdQYWdhbWVudG8nLFxuICAgICAgICBqYTogJ+aUr+aJleOBhCcsXG4gICAgICAgICdyby1STyc6ICdQbGF0xIMnLFxuICAgICAgICBhcjogJ9mC2LPYtycsXG4gICAgICAgIGNhOiAnUGFnYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnWnDFr3NvYiBwbGF0YnknLFxuICAgICAgICAnZGEtREsnOiAnQmV0YWxpbmcnLFxuICAgICAgICBlbDogJ86gzrvOt8+Bz4nOvM6uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkreClgeCkl+CkpOCkvuCkqCcsXG4gICAgICAgICdrby1LUic6ICfsp4DrtognLFxuICAgICAgICAnbGItTFUnOiAnQmV6dWVsZW4nLFxuICAgICAgICAnbmwtTkwnOiAnQmV0YWxpbmcnLFxuICAgICAgICAncHQtUFQnOiAnUGFnYW1lbnRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ce0L/Qu9Cw0YLQsCcsXG4gICAgICAgICdzbC1TSSc6ICdQbGHEjWlsbycsXG4gICAgICAgICdzdi1TRSc6ICdCZXRhbG5pbmcnLFxuICAgICAgICB0aDogJ+C4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4mScsXG4gICAgICAgIHVrOiAn0J7Qv9C70LDRgtCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+aUr+S7mCcsXG4gICAgICAgICd6aC1UVyc6ICfmlK/ku5gnXG4gICAgfSxcbiAgICBwZXJzb25hbDoge1xuICAgICAgICAnZGUtREUnOiAnUGVyc8O2bmxpY2gnLFxuICAgICAgICAnZW4tVVMnOiAnUGVyc29uYWwnLFxuICAgICAgICAnZXMtRVMnOiAnUGVyc29uYWwnLFxuICAgICAgICBmcjogJ0Nvb3Jkb25uw6llcycsXG4gICAgICAgIGl0OiAnUGVyc29uYWxlJyxcbiAgICAgICAgamE6ICflgIvkuronLFxuICAgICAgICAncm8tUk8nOiAnUGVyc29uYWwnLFxuICAgICAgICBhcjogJ9i02K7YtdmKJyxcbiAgICAgICAgY2E6ICdQZXJzb25hbCcsXG4gICAgICAgICdjcy1DWic6ICdPc29ibsOtJyxcbiAgICAgICAgJ2RhLURLJzogJ1BlcnNvbmxpZycsXG4gICAgICAgIGVsOiAnzqDPgc6/z4PPic+AzrnOus+Mz4InLFxuICAgICAgICAnaGktSU4nOiAn4KSo4KS/4KSc4KWAJyxcbiAgICAgICAgJ2tvLUtSJzogJ+qwnOyduOydmCcsXG4gICAgICAgICdsYi1MVSc6ICdQZXJzw6lpbmxlY2gnLFxuICAgICAgICAnbmwtTkwnOiAncGVyc29vbmxpamsnLFxuICAgICAgICAncHQtUFQnOiAnUGVzc29hbCcsXG4gICAgICAgICdydS1SVSc6ICfQm9C40YfQvdC+0LUnLFxuICAgICAgICAnc2wtU0knOiAnT3NlYm5vJyxcbiAgICAgICAgJ3N2LVNFJzogJ1BlcnNvbmxpZycsXG4gICAgICAgIHRoOiAn4Liq4LmI4Lin4LiZ4LiV4Lix4LinJyxcbiAgICAgICAgdWs6ICfQntGB0L7QsdC40YHRgtGWJyxcbiAgICAgICAgJ3poLUNOJzogJ+S4quS6uueahCcsXG4gICAgICAgICd6aC1UVyc6ICflgIvkurrnmoQnXG4gICAgfSxcbiAgICBzaGlwcGluZzoge1xuICAgICAgICAnZGUtREUnOiAnVmVyc2FuZCcsXG4gICAgICAgICdlbi1VUyc6ICdTaGlwcGluZycsXG4gICAgICAgICdlcy1FUyc6ICdFbnZpbycsXG4gICAgICAgIGZyOiAnTGl2cmFpc29uJyxcbiAgICAgICAgaXQ6ICdTcGVkaXppb25lJyxcbiAgICAgICAgamE6ICfnmbrpgIEnLFxuICAgICAgICAncm8tUk8nOiAnTGl2cmFyZScsXG4gICAgICAgIGFyOiAn2LTYrdmGJyxcbiAgICAgICAgY2E6ICdFbnZpYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnTG9kbsOtIGRvcHJhdmEnLFxuICAgICAgICAnZGEtREsnOiAnRm9yc2VuZGVsc2UnLFxuICAgICAgICBlbDogJ86Rz4DOv8+Dz4TOv867zq4nLFxuICAgICAgICAnaGktSU4nOiAn4KS24KS/4KSq4KS/4KSC4KSXJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwsOyGoScsXG4gICAgICAgICdsYi1MVSc6ICdMaXd3ZXJ1bmcnLFxuICAgICAgICAnbmwtTkwnOiAnVmVyemVuZGluZycsXG4gICAgICAgICdwdC1QVCc6ICdFbnZpbycsXG4gICAgICAgICdydS1SVSc6ICfQn9C10YDQtdCy0L7Qt9C60LgnLFxuICAgICAgICAnc2wtU0knOiAnRG9zdGF2YScsXG4gICAgICAgICdzdi1TRSc6ICdGcmFrdCcsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4Liq4LmI4LiH4Liq4Li04LiZ4LiE4LmJ4LiyJyxcbiAgICAgICAgdWs6ICfQlNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+iIuei/kCcsXG4gICAgICAgICd6aC1UVyc6ICfoiLnpgYsnXG4gICAgfSxcbiAgICBiaWxsaW5nOiB7XG4gICAgICAgICdkZS1ERSc6ICdSZWNobnVuZ3NhZHJlc3NlJyxcbiAgICAgICAgJ2VuLVVTJzogJ0JpbGxpbmcnLFxuICAgICAgICAnZXMtRVMnOiAnRGlyZWNjacOzbiBkZSBmYWN0dXJhY2nDs24nLFxuICAgICAgICBmcjogJ0FkcmVzc2UgZGUgZmFjdHVyYXRpb24nLFxuICAgICAgICBpdDogJ0luZGlyaXp6byBkaSBmYXR0dXJhemlvbmUnLFxuICAgICAgICBqYTogJ+iri+axgicsXG4gICAgICAgICdyby1STyc6ICdGYWN0dXJhcmUnLFxuICAgICAgICBhcjogJ9in2YTZgdmI2KfYqtmK2LEnLFxuICAgICAgICBjYTogJ0ZhY3R1cmFjacOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ0Zha3R1cmFjZScsXG4gICAgICAgICdkYS1ESyc6ICdGYWt0dXJlcmluZycsXG4gICAgICAgIGVsOiAnzqfPgc6tz4nPg863JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkrOCkv+CksuCkv+CkguCklycsXG4gICAgICAgICdrby1LUic6ICfssq3qtawnLFxuICAgICAgICAnbGItTFUnOiAnUmVjaG51bmcnLFxuICAgICAgICAnbmwtTkwnOiAnRmFjdHVyZXJpbmcnLFxuICAgICAgICAncHQtUFQnOiAnQ29icmFuw6dhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CR0LjQu9C70LjQvdCzJyxcbiAgICAgICAgJ3NsLVNJJzogJ09icmHEjXVuYXZhbmplJyxcbiAgICAgICAgJ3N2LVNFJzogJ0Zha3R1cmVyaW5nJyxcbiAgICAgICAgdGg6ICfguIHguLLguKPguYDguKPguLXguKLguIHguYDguIHguYfguJrguYDguIfguLTguJknLFxuICAgICAgICB1azogJ9CS0LjRgdGC0LDQstC70LXQvdC90Y8g0YDQsNGF0YPQvdC60ZbQsicsXG4gICAgICAgICd6aC1DTic6ICforqHotLknLFxuICAgICAgICAnemgtVFcnOiAn6KiI6LK7J1xuICAgIH0sXG4gICAgY29udGludWU6IHtcbiAgICAgICAgJ2RlLURFJzogJ1dlaXRlcicsXG4gICAgICAgICdlbi1VUyc6ICdDb250aW51ZScsXG4gICAgICAgICdlcy1FUyc6ICdDb250aW51YXInLFxuICAgICAgICBmcjogJ0NvbnRpbnVleicsXG4gICAgICAgIGl0OiAnQ29udGludWEnLFxuICAgICAgICBqYTogJ+e2muOBjeOBuCcsXG4gICAgICAgICdyby1STyc6ICdDb250aW51YScsXG4gICAgICAgIGFyOiAn2YrZg9mF2YQnLFxuICAgICAgICBjYTogJ0NvbnRpbnVhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1Bva3JhxI1vdmF0JyxcbiAgICAgICAgJ2RhLURLJzogJ0JsaXZlIHZlZCcsXG4gICAgICAgIGVsOiAnzp3OsSDPg8+Fzr3Otc+Hzq/Pg861zrknLFxuICAgICAgICAnaGktSU4nOiAn4KSc4KS+4KSw4KWAIOCksOCkluCkqOCkvicsXG4gICAgICAgICdrby1LUic6ICfqs4Tsho3tlZjri6QnLFxuICAgICAgICAnbGItTFUnOiAnRnVlcnQgd2VpZGVyJyxcbiAgICAgICAgJ25sLU5MJzogJ0Rvb3JnYWFuIG1ldCcsXG4gICAgICAgICdwdC1QVCc6ICdQcm9zc2VndWlyJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtC00L7Qu9C20LDRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ05hZGFsanVqJyxcbiAgICAgICAgJ3N2LVNFJzogJ0ZvcnRzw6R0dGEnLFxuICAgICAgICB0aDogJ+C4lOC4s+C5gOC4meC4tOC4meC4geC4suC4o+C4leC5iOC4rScsXG4gICAgICAgIHVrOiAn0J/RgNC+0LTQvtCy0LbQuNGC0LgnLFxuICAgICAgICAnemgtQ04nOiAn57un57utJyxcbiAgICAgICAgJ3poLVRXJzogJ+e5vOe6jCdcbiAgICB9LFxuICAgICdzZWN1cmUtbm90aWNlJzoge1xuICAgICAgICAnZGUtREUnOiAnR2VzaWNoZXJ0IGR1cmNoICcsXG4gICAgICAgICdlbi1VUyc6ICdTZWN1cmVkIGJ5JyxcbiAgICAgICAgJ2VzLUVTJzogJ1Byb3RlZ2lkbyBwb3InLFxuICAgICAgICBmcjogJ1PDqWN1cmlzw6kgcGFyJyxcbiAgICAgICAgaXQ6ICdQcm90ZXR0byBkYScsXG4gICAgICAgIGphOiAn5L+d6K2344GV44KM44Gm44GE44G+44GZJyxcbiAgICAgICAgJ3JvLVJPJzogJ0dhcmFudGF0IGRlJyxcbiAgICAgICAgYXI6ICfYqNi22YXYp9mGJyxcbiAgICAgICAgY2E6ICdHYXJhbnRpdCBwZXInLFxuICAgICAgICAnY3MtQ1onOiAnWmFqacWhdMSbbm8nLFxuICAgICAgICAnZGEtREsnOiAnU2lrcmV0IGFmJyxcbiAgICAgICAgZWw6ICfOlc6+zrHPg8+GzrHOu86vzrbOtc+EzrHOuSDOsc+Az4wnLFxuICAgICAgICAnaGktSU4nOiAn4KSH4KS44KSV4KWHIOCknOCksOCkv+CkjyDgpLjgpYHgpLDgpJXgpY3gpLfgpL/gpKQnLFxuICAgICAgICAna28tS1InOiAn67O07JWIJyxcbiAgICAgICAgJ2xiLUxVJzogJ0dlc8OpY2hlcnQgdnVuJyxcbiAgICAgICAgJ25sLU5MJzogJ0JldmVpbGlnZCBkb29yJyxcbiAgICAgICAgJ3B0LVBUJzogJ0Fzc2VndXJhZG8gcG9yJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ce0LHQtdGB0L/QtdGH0LXQvdC+JyxcbiAgICAgICAgJ3NsLVNJJzogJ1phdmFyb3Zhbm8gcycsXG4gICAgICAgICdzdi1TRSc6ICdTw6RrcmFkIGF2JyxcbiAgICAgICAgdGg6ICfguJvguKXguK3guJTguKDguLHguKLguYLguJTguKInLFxuICAgICAgICB1azogJ9CX0LDQsdC10LfQv9C10YfRg9GU0YLRjNGB0Y8nLFxuICAgICAgICAnemgtQ04nOiAn5ouF5L+d5Lq6JyxcbiAgICAgICAgJ3poLVRXJzogJ+aTlOS/neS6uidcbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ0thc3NlIHZlcmxhc3NlbicsXG4gICAgICAgICdlbi1VUyc6ICdFeGl0IENoZWNrb3V0JyxcbiAgICAgICAgJ2VzLUVTJzogJ1NhbGlyIGRlIGxhIGNhamEnLFxuICAgICAgICBmcjogJ1F1aXR0ZXInLFxuICAgICAgICBpdDogJ0VzY2kgZGFsIGNoZWNrb3V0JyxcbiAgICAgICAgamE6ICfmlK/miZXjgYTjgpLntYLkuoYnLFxuICAgICAgICAncm8tUk8nOiAnw45uYXBvaSBsYSBwYWdpbmEgcHJvZHVzdWx1aScsXG4gICAgICAgIGFyOiAn2KfZhNiu2LHZiNisINmF2YYg2KfZhNiu2LHZiNisJyxcbiAgICAgICAgY2E6ICdTdXJ0IGRlIEdvb2dsZSBDaGVja291dCcsXG4gICAgICAgICdjcy1DWic6ICdVa29uxI1pdCBwb2tsYWRudScsXG4gICAgICAgICdkYS1ESyc6ICdBZnNsdXQgQ2hlY2tvdXQnLFxuICAgICAgICBlbDogJ86Izr7Ov860zr/PgiDOsc+Az4wgz4TOvyDPhM6xzrzOtc6vzr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSa4KWH4KSV4KSG4KSJ4KSfIOCkuOClhyDgpKzgpL7gpLngpLAg4KSo4KS/4KSV4KSy4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yytO2BrOyVhOybgyDsooXro4wnLFxuICAgICAgICAnbGItTFUnOiAnRXhpdCBDaGVja291dCcsXG4gICAgICAgICdubC1OTCc6ICdBZnJla2VuZW4gYWZzbHVpdGVuJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NhaXIgZG8gY2hlY2tvdXQnLFxuICAgICAgICAncnUtUlUnOiAn0JLRi9C50YLQuCDQuNC3INC60LDRgdGB0YsnLFxuICAgICAgICAnc2wtU0knOiAnWmFwcml0ZSBDaGVja291dCcsXG4gICAgICAgICdzdi1TRSc6ICdBdnNsdXRhIGthc3NhbicsXG4gICAgICAgIHRoOiAn4Lit4Lit4LiB4LiI4Liy4LiB4LiB4Liy4Lij4LiK4Liz4Lij4Liw4LmA4LiH4Li04LiZJyxcbiAgICAgICAgdWs6ICfQktC40LnRgtC4INC3IENoZWNrb3V0JyxcbiAgICAgICAgJ3poLUNOJzogJ+mAgOWHuue7k+W4kCcsXG4gICAgICAgICd6aC1UVyc6ICfpgIDlh7rntZDluLMnXG4gICAgfSxcbiAgICAnb3JkZXItc3VtbWFyeSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0Jlc3RlbGx6dXNhbW1lbmZhc3N1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnT3JkZXIgc3VtbWFyeScsXG4gICAgICAgICdlcy1FUyc6ICdSZXN1bWVuIGRlbCBwZWRpZG8nLFxuICAgICAgICBmcjogJ1LDqWNhcGl0dWxhdGlmIGRlIGxhIGNvbW1hbmRlJyxcbiAgICAgICAgaXQ6ICdSaWVwaWxvZ28gZGVsbFxcJ29yZGluZScsXG4gICAgICAgIGphOiAn5rOo5paH44Gu5qaC6KaBJyxcbiAgICAgICAgJ3JvLVJPJzogJ1JlenVtYXQgQ29tYW5kxIMnLFxuICAgICAgICBhcjogJ9mF2YTYrti1INin2YTYt9mE2KgnLFxuICAgICAgICBjYTogJ1Jlc3VtIGRlIGxhIGNvbWFuZGEnLFxuICAgICAgICAnY3MtQ1onOiAnUMWZZWhsZWQgb2JqZWRuw6F2a3knLFxuICAgICAgICAnZGEtREsnOiAnT3JkcmVzYW1tZW5kcmFnJyxcbiAgICAgICAgZWw6ICfOoM61z4HOr867zrfPiM63IM+AzrHPgc6xzrPOs861zrvOr86xz4InLFxuICAgICAgICAnaGktSU4nOiAn4KSG4KSm4KWH4KS2IOCkuOCkvuCksOCkvuCkguCkticsXG4gICAgICAgICdrby1LUic6ICfso7zrrLgg7JqU7JW9JyxcbiAgICAgICAgJ2xiLUxVJzogJ1VlcmRudW5nIFJlc3Vtw6knLFxuICAgICAgICAnbmwtTkwnOiAnT3ZlcnppY2h0IHZhbiBkZSBiZXN0ZWxsaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Jlc3VtbyBkbyBwZWRpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0JjRgtC+0LMg0LfQsNC60LDQt9CwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvdnpldGVrIG5hcm/EjWlsYScsXG4gICAgICAgICdzdi1TRSc6ICdPcmRlcnNhbW1hbmZhdHRuaW5nJyxcbiAgICAgICAgdGg6ICfguKrguKPguLjguJvguITguLPguKrguLHguYjguIfguIvguLfguYnguK0nLFxuICAgICAgICB1azogJ9Cf0ZbQtNGB0YPQvNC+0Log0JfQsNC80L7QstC70LXQvdC90Y8nLFxuICAgICAgICAnemgtQ04nOiAn6K6i5Y2V5pGY6KaBJyxcbiAgICAgICAgJ3poLVRXJzogJ+ioguWWruaRmOimgSdcbiAgICB9LFxuICAgIHN1YnRvdGFsOiB7XG4gICAgICAgICdkZS1ERSc6ICdad2lzY2hlbnN1bW1lJyxcbiAgICAgICAgJ2VuLVVTJzogJ1N1YnRvdGFsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1N1YnRvdGFsJyxcbiAgICAgICAgZnI6ICdTb3VzLXRvdGFsJyxcbiAgICAgICAgaXQ6ICdUb3RhbGUgcGFyemlhbGUnLFxuICAgICAgICBqYTogJ+Wwj+ioiCcsXG4gICAgICAgICdyby1STyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgIGFyOiAn2KfZhNmF2KzZhdmI2Lkg2KfZhNmB2LHYudmKJyxcbiAgICAgICAgY2E6ICdTdWJ0b3RhbCcsXG4gICAgICAgICdjcy1DWic6ICdNZXppc291xI1ldCcsXG4gICAgICAgICdkYS1ESyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgIGVsOiAnzpzOlc6hzpnOms6fIM6jzqXOnc6fzpvOnycsXG4gICAgICAgICdoaS1JTic6ICfgpIngpKot4KSv4KWL4KSXJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yGjOqzhCcsXG4gICAgICAgICdsYi1MVSc6ICdTdWJ0b3RhbCcsXG4gICAgICAgICdubC1OTCc6ICdTdWJ0b3RhYWwnLFxuICAgICAgICAncHQtUFQnOiAnU3VidG90YWwnLFxuICAgICAgICAncnUtUlUnOiAn0J/RgNC+0LzQtdC20YPRgtC+0YfQvdGL0Lkg0LjRgtC+0LMnLFxuICAgICAgICAnc2wtU0knOiAnVm1lc25pIHNlxaF0ZXZlaycsXG4gICAgICAgICdzdi1TRSc6ICdEZWxzdW1tYScsXG4gICAgICAgIHRoOiAn4Lii4Lit4LiU4Lij4Lin4LihJyxcbiAgICAgICAgdWs6ICfQn9GA0L7QvNGW0LbQvdC40Lkg0L/RltC00YHRg9C80L7QuicsXG4gICAgICAgICd6aC1DTic6ICflsI/orqEnLFxuICAgICAgICAnemgtVFcnOiAn5bCP6KiIJ1xuICAgIH0sXG4gICAgdGF4OiB7XG4gICAgICAgICdkZS1ERSc6ICdTdGV1ZXInLFxuICAgICAgICAnZW4tVVMnOiAnVGF4JyxcbiAgICAgICAgJ2VzLUVTJzogJ0ltcHVlc3RvJyxcbiAgICAgICAgZnI6ICdJbXDDtHQnLFxuICAgICAgICBpdDogJ1Rhc3NhJyxcbiAgICAgICAgamE6ICfnqI4nLFxuICAgICAgICAncm8tUk8nOiAnSW1wb3ppdCcsXG4gICAgICAgIGFyOiAn2LbYsdmK2KjYqScsXG4gICAgICAgIGNhOiAnSW1wb3N0b3MnLFxuICAgICAgICAnY3MtQ1onOiAnRGHFiCcsXG4gICAgICAgICdkYS1ESyc6ICdTa2F0JyxcbiAgICAgICAgZWw6ICfOps+Mz4HOv8+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCksCcsXG4gICAgICAgICdrby1LUic6ICfshLgnLFxuICAgICAgICAnbGItTFUnOiAnU3RlaWVyJyxcbiAgICAgICAgJ25sLU5MJzogJ0JlbGFzdGluZycsXG4gICAgICAgICdwdC1QVCc6ICdJbXBvc3RvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cd0LDQu9C+0LMnLFxuICAgICAgICAnc2wtU0knOiAnRGF2ZWsnLFxuICAgICAgICAnc3YtU0UnOiAnQmVza2F0dGEnLFxuICAgICAgICB0aDogJ+C4oOC4suC4qeC4tScsXG4gICAgICAgIHVrOiAn0J/QvtC00LDRgtC+0LonLFxuICAgICAgICAnemgtQ04nOiAn56iOJyxcbiAgICAgICAgJ3poLVRXJzogJ+eohSdcbiAgICB9LFxuICAgIHRvdGFsOiB7XG4gICAgICAgICdkZS1ERSc6ICdHZXNhbXQnLFxuICAgICAgICAnZW4tVVMnOiAnVG90YWwnLFxuICAgICAgICAnZXMtRVMnOiAnVG90YWwnLFxuICAgICAgICBmcjogJ1RvdGFsJyxcbiAgICAgICAgaXQ6ICdUb3RhbGUnLFxuICAgICAgICBqYTogJ+WQiOioiCcsXG4gICAgICAgICdyby1STyc6ICdUb3RhbCcsXG4gICAgICAgIGFyOiAn2KfZhNmF2KzZhdmI2LknLFxuICAgICAgICBjYTogJ1RvdGFsJyxcbiAgICAgICAgJ2NzLUNaJzogJ0NlbGtvdsO9JyxcbiAgICAgICAgJ2RhLURLJzogJ2kgYWx0JyxcbiAgICAgICAgZWw6ICfOo8+Nzr3Ov867zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWB4KSyJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y0nScsXG4gICAgICAgICdsYi1MVSc6ICdJbnNnZXNhbXQnLFxuICAgICAgICAnbmwtTkwnOiAnVG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1RvdGFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ce0LHRidC40LknLFxuICAgICAgICAnc2wtU0knOiAnU2t1cGFqJyxcbiAgICAgICAgJ3N2LVNFJzogJ1RvdGFsJyxcbiAgICAgICAgdGg6ICfguKPguKfguKEnLFxuICAgICAgICB1azogJ9CS0YHRjNC+0LPQvicsXG4gICAgICAgICd6aC1DTic6ICflhajpg6jnmoQnLFxuICAgICAgICAnemgtVFcnOiAn5YWo6YOo55qEJ1xuICAgIH0sXG4gICAgY291cG9uOiB7XG4gICAgICAgICdkZS1ERSc6ICdDb3Vwb24nLFxuICAgICAgICAnZW4tVVMnOiAnQ291cG9uJyxcbiAgICAgICAgJ2VzLUVTJzogJ0N1cMOzbicsXG4gICAgICAgIGZyOiAnQ291cG9uJyxcbiAgICAgICAgaXQ6ICdDb3Vwb24nLFxuICAgICAgICBqYTogJ+OCr+ODvOODneODsycsXG4gICAgICAgICdyby1STyc6ICdDdXBvbicsXG4gICAgICAgIGFyOiAn2YLYs9mK2YXYqScsXG4gICAgICAgIGNhOiAnQ3Vww7MnLFxuICAgICAgICAnY3MtQ1onOiAnS3Vww7NuJyxcbiAgICAgICAgJ2RhLURLJzogJ0t1cG9uJyxcbiAgICAgICAgZWw6ICfOms6/z4XPgM+Mzr3OuScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpYLgpKrgpKgnLFxuICAgICAgICAna28tS1InOiAn7L+g7Y+wJyxcbiAgICAgICAgJ2xiLUxVJzogJ0NvdXBvbicsXG4gICAgICAgICdubC1OTCc6ICdDb3Vwb24nLFxuICAgICAgICAncHQtUFQnOiAnQ3Vwb20nLFxuICAgICAgICAncnUtUlUnOiAn0JrRg9C/0L7QvScsXG4gICAgICAgICdzbC1TSSc6ICdLdXBvbicsXG4gICAgICAgICdzdi1TRSc6ICdLdXBvbmcnLFxuICAgICAgICB0aDogJ+C4hOC4ueC4m+C4reC4hycsXG4gICAgICAgIHVrOiAn0JrRg9C/0L7QvScsXG4gICAgICAgICd6aC1DTic6ICfkvJjmg6DliLgnLFxuICAgICAgICAnemgtVFcnOiAn5YSq5oOg5Yi4J1xuICAgIH0sXG4gICAgJ3djLWNvdXBvbi1jb2RlJzoge1xuICAgICAgICAnZGUtREUnOiAnR3V0c2NoZWluY29kZScsXG4gICAgICAgICdlbi1VUyc6ICdDb3Vwb24gY29kZScsXG4gICAgICAgICdlcy1FUyc6ICdDw7NkaWdvIHByb21vY2lvbmFsJyxcbiAgICAgICAgZnI6ICdDb2RlIGRlIGNvdXBvbicsXG4gICAgICAgIGl0OiAnQ29kaWNlIGNvdXBvbicsXG4gICAgICAgIGphOiAn44Kv44O844Od44Oz44Kz44O844OJJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NvZCBjdXBvbicsXG4gICAgICAgIGFyOiAn2LHZhdiyINin2YTZg9mI2KjZiNmGJyxcbiAgICAgICAgY2E6ICdDb2RpIGRlIGN1cMOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ0vDs2Qga3Vww7NudScsXG4gICAgICAgICdkYS1ESyc6ICdLdXBvbmtvZGUnLFxuICAgICAgICBlbDogJ86az4nOtM65zrrPjM+CIM66zr/Phc+Azr/Ovc65zr/PjScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpYLgpKrgpKgg4KSV4KWL4KShJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y/oO2PsCDsvZTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnQ291cG9uIENvZGUnLFxuICAgICAgICAnbmwtTkwnOiAnQ291cG9uIGNvZGUnLFxuICAgICAgICAncHQtUFQnOiAnQ8OzZGlnbyBkbyBjdXBvbScsXG4gICAgICAgICdydS1SVSc6ICfQmtC+0LQg0LrRg9C/0L7QvdCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0tvZGEga3Vwb25hJyxcbiAgICAgICAgJ3N2LVNFJzogJ0t1cG9uZ3Nrb2QnLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC4hOC4ueC4m+C4reC4hycsXG4gICAgICAgIHVrOiAn0JrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICd6aC1DTic6ICfkvJjmg6Dljbflj7fnoIEnLFxuICAgICAgICAnemgtVFcnOiAn5YSq5oOg5Y236Jmf56K8J1xuICAgIH0sXG4gICAgJ3djLWludmFsaWQtY291cG9uJzoge1xuICAgICAgICAnZGUtREUnOiAnU2llIGhhYmVuIGVpbmVuIHVuZ8O8bHRpZ2VuIEd1dHNjaGVpbmNvZGUgZWluZ2VnZWJlbicsXG4gICAgICAgICdlbi1VUyc6ICdZb3UgZW50ZXJlZCBhbiBpbnZhbGlkIGNvdXBvbiBjb2RlJyxcbiAgICAgICAgJ2VzLUVTJzogJ0luZ3Jlc2FzdGUgdW4gY8OzZGlnbyBkZSBjdXDDs24gbm8gdsOhbGlkbycsXG4gICAgICAgIGZyOiAnVm91cyBhdmV6IGVudHLDqSB1biBjb2RlIGRlIGNvdXBvbiBub24gdmFsaWRlJyxcbiAgICAgICAgaXQ6ICdIYWkgaW5zZXJpdG8gdW4gY29kaWNlIGNvdXBvbiBub24gdmFsaWRvJyxcbiAgICAgICAgamE6ICfnhKHlirnjgarjgq/jg7zjg53jg7PjgrPjg7zjg4njgpLlhaXlipvjgZfjgb7jgZfjgZ8nLFxuICAgICAgICAncm8tUk8nOiAnQcibaSBpbnRyb2R1cyB1biBjb2QgZGUgY3Vwb24gbmV2YWxpZCcsXG4gICAgICAgIGFyOiAn2YTZgtivINij2K/YrtmE2Kog2LHZhdiyINmC2LPZitmF2Kkg2LrZitixINi12KfZhNitJyxcbiAgICAgICAgY2E6ICdIZXUgaW50cm9kdcOvdCB1biBjb2RpIGRlIGN1cMOzIG5vIHbDoGxpZCcsXG4gICAgICAgICdjcy1DWic6ICdaYWRhbGkganN0ZSBuZXBsYXRuw70ga8OzZCBrdXDDs251JyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGhhciBpbmR0YXN0ZXQgZW4gdWd5bGRpZyBrdXBvbmtvZGUnLFxuICAgICAgICBlbDogJ86azrHPhM6xz4fPic+Bzq/Pg86xz4TOtSDOrc69zrHOvSDOvM63IM6tzrPOus+Fz4HOvyDOus+JzrTOuc66z4wgzrrOv8+Fz4DOv869zrnOv8+NJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkquCkqOClhyDgpI/gpJUg4KSF4KSu4KS+4KSo4KWN4KSvIOCkleClguCkquCkqCDgpJXgpYvgpKEg4KSm4KSw4KWN4KScIOCkleCkv+Ckr+CkviDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6Y66q765CcIOy/oO2PsCDsvZTrk5zrpbwg7J6F66Cl7ZaI7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdEaXIgaHV0dCBlbiBvbmfDq2x0ZWdlIENvdXBvbmNvZGUgYWdpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnVSBoZWVmdCBlZW4gb25nZWxkaWdlIGNvdXBvbmNvZGUgaW5nZXZvZXJkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ZvY8OqIGluc2VyaXUgdW0gY8OzZGlnbyBkZSBjdXBvbSBpbnbDoWxpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0JLRiyDQstCy0LXQu9C4INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdWbmVzbGkgc3RlIG5ldmVsamF2bm8ga29kbyBrdXBvbmEnLFxuICAgICAgICAnc3YtU0UnOiAnRHUgaGFyIGFuZ2V0dCBlbiBvZ2lsdGlnIGt1cG9uZ2tvZCcsXG4gICAgICAgIHRoOiAn4LiE4Li44LiT4Lib4LmJ4Lit4LiZ4Lij4Lir4Lix4Liq4LiE4Li54Lib4Lit4LiH4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHJyxcbiAgICAgICAgdWs6ICfQktC4INCy0LLQtdC70Lgg0L3QtdC00ZbQudGB0L3QuNC5INC60L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5oKo6L6T5YWl5LqG5peg5pWI55qE5LyY5oOg5Yi45Luj56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+aCqOi8uOWFpeS6hueEoeaViOeahOWEquaDoOWIuOS7o+eivCdcbiAgICB9LFxuICAgIGFwcGx5OiB7XG4gICAgICAgICdkZS1ERSc6ICdFaW5sw7ZzZW4nLFxuICAgICAgICAnZW4tVVMnOiAnQXBwbHknLFxuICAgICAgICAnZXMtRVMnOiAnQXBsaWNhcicsXG4gICAgICAgIGZyOiAnQXBwbGlxdWVyJyxcbiAgICAgICAgaXQ6ICdBcHBsaWNhcmUnLFxuICAgICAgICBqYTogJ+eUs+i+vOOBvycsXG4gICAgICAgICdyby1STyc6ICdBcGxpY2EnLFxuICAgICAgICBhcjogJ9iq2LfYqNmK2YInLFxuICAgICAgICBjYTogJ0FwbGljYXInLFxuICAgICAgICAnY3MtQ1onOiAnQXBsaWtvdmF0JyxcbiAgICAgICAgJ2RhLURLJzogJ2Fuc8O4Z2UnLFxuICAgICAgICBlbDogJ86Zz4PPh8+Nzr/Phc69JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CksuCkvuCkl+ClgiDgpJXgpLDgpKjgpL4nLFxuICAgICAgICAna28tS1InOiAn7KCB7Jqp7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJ0fDq2xsZScsXG4gICAgICAgICdubC1OTCc6ICdWYW4gdG9lcGFzc2luZyB6aWpuJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FwbGljYXInLFxuICAgICAgICAncnUtUlUnOiAn0J/QvtC00LDRgtGMINC30LDRj9Cy0LvQtdC90LjQtScsXG4gICAgICAgICdzbC1TSSc6ICdVcG9yYWJpJyxcbiAgICAgICAgJ3N2LVNFJzogJ1RpbGzDpG1wYScsXG4gICAgICAgIHRoOiAn4LiZ4Liz4Lih4Liy4LmD4LiK4LmJJyxcbiAgICAgICAgdWs6ICfQl9Cw0YHRgtC+0YHRg9Cy0LDRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+eUs+ivtycsXG4gICAgICAgICd6aC1UVyc6ICfnlLPoq4snXG4gICAgfSxcbiAgICAnZ2lmdC1jYXJkJzoge1xuICAgICAgICAnZGUtREUnOiAnR2VzY2hlbmtrYXJ0ZScsXG4gICAgICAgICdlbi1VUyc6ICdHaWZ0IGNhcmQnLFxuICAgICAgICAnZXMtRVMnOiAnVGFyamV0YSBkZSByZWdhbG8nLFxuICAgICAgICBmcjogJ0NhcnRlIGNhZGVhdScsXG4gICAgICAgIGl0OiAnQ2FydGEgcmVnYWxvJyxcbiAgICAgICAgamE6ICfjgq7jg5Xjg4jjgqvjg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnQ2FyZCBjYWRvdScsXG4gICAgICAgIGFyOiAn2YPYsdiqINmH2K/ZitipJyxcbiAgICAgICAgY2E6ICdUYXJnZXRhIHJlZ2FsJyxcbiAgICAgICAgJ2NzLUNaJzogJ0TDoXJrb3bDoSBwb3Vrw6F6a2EnLFxuICAgICAgICAnZGEtREsnOiAnR2F2ZWtvcnQnLFxuICAgICAgICBlbDogJ86Uz4nPgc6/zrrOrM+Bz4TOsScsXG4gICAgICAgICdoaS1JTic6ICfgpIngpKrgpLngpL7gpLAg4KSq4KSk4KWN4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS2FkZG9rYWFydCcsXG4gICAgICAgICdubC1OTCc6ICdDYWRlYXVrYWFydCcsXG4gICAgICAgICdwdC1QVCc6ICdDYXJ0w6NvIFByZXNlbnRlJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7QtNCw0YDQvtGH0L3QsNGPINC60LDRgNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnRGFyaWxuZSBrYXJ0aWNlJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ByZXNlbnQga29ydCcsXG4gICAgICAgIHRoOiAn4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNJyxcbiAgICAgICAgdWs6ICfQn9C+0LTQsNGA0YPQvdC60L7QstCwINC60LDRgNGC0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfnpLznianljaEnLFxuICAgICAgICAnemgtVFcnOiAn56au54mp5Y2hJ1xuICAgIH0sXG4gICAgJ2dpZnQtY2FyZC1udW1iZXInOiB7XG4gICAgICAgICdkZS1ERSc6ICdHZXNjaGVua2thcnRlbm51bW1lcicsXG4gICAgICAgICdlbi1VUyc6ICdHaWZ0IGNhcmQgbnVtYmVyJyxcbiAgICAgICAgJ2VzLUVTJzogJ051bWVybyBkZSB0YXJqZXRhIGRlIHJlZ2FsbycsXG4gICAgICAgIGZyOiAnTnVtw6lybyBkZSBsYSBjYXJ0ZS1jYWRlYXUnLFxuICAgICAgICBpdDogJ051bWVybyBkZWxsYSBjYXJ0YSByZWdhbG8nLFxuICAgICAgICBqYTogJ+OCruODleODiOOCq+ODvOODieeVquWPtycsXG4gICAgICAgICdyby1STyc6ICdOdW3Eg3J1bCBjYXJkdWx1aSBjYWRvdScsXG4gICAgICAgIGFyOiAn2LHZgtmFINio2LfYp9mC2Kkg2KfZhNmH2K/ZitipJyxcbiAgICAgICAgY2E6ICdOw7ptZXJvIGRlIHRhcmdldGEgcmVnYWwnLFxuICAgICAgICAnY3MtQ1onOiAnxIzDrXNsbyBkw6Fya292w6kga2FydHknLFxuICAgICAgICAnZGEtREsnOiAnR2F2ZWtvcnRudW1tZXInLFxuICAgICAgICBlbDogJ86Rz4HOuc64zrzPjM+CIM60z4nPgc6/zrrOrM+Bz4TOsc+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckl+Ckv+Ckq+CljeCknyDgpJXgpL7gpLDgpY3gpKEg4KSo4KSC4KSs4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+q4sO2UhO2KuCDsubTrk5wg67KI7Zi4JyxcbiAgICAgICAgJ2xiLUxVJzogJ0dlc2NoZW5ra2FhcnQgTnVtbWVyJyxcbiAgICAgICAgJ25sLU5MJzogJ0NhZGVhdWthYXJ0bnVtbWVyJyxcbiAgICAgICAgJ3B0LVBUJzogJ07Dum1lcm8gZG8gY2FydMOjby1wcmVzZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQndC+0LzQtdGAINC/0L7QtNCw0YDQvtGH0L3QvtC5INC60LDRgNGC0YsnLFxuICAgICAgICAnc2wtU0knOiAnxaB0ZXZpbGthIGRhcmlsbmUga2FydGljZScsXG4gICAgICAgICdzdi1TRSc6ICdQcmVzZW50a29ydG51bW1lcicsXG4gICAgICAgIHRoOiAn4Lir4Lih4Liy4Lii4LmA4Lil4LiC4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiNJyxcbiAgICAgICAgdWs6ICfQndC+0LzQtdGAINC/0L7QtNCw0YDRg9C90LrQvtCy0L7RlyDQutCw0YDRgtC60LgnLFxuICAgICAgICAnemgtQ04nOiAn56S85ZOB5Y2h5Y+3JyxcbiAgICAgICAgJ3poLVRXJzogJ+emruWTgeWNoeiZnydcbiAgICB9LFxuICAgICdpbnZhbGlkLWdpZnQtY2FyZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1NpZSBoYWJlbiBlaW5lIHVuZ8O8bHRpZ2UgR2VzY2hlbmtrYXJ0ZSBlaW5nZWdlYmVuJyxcbiAgICAgICAgJ2VuLVVTJzogJ1lvdSBlbnRlcmVkIGFuIGludmFsaWQgZ2lmdCBjYXJkJyxcbiAgICAgICAgJ2VzLUVTJzogJ0luZ3Jlc2FzdGUgdW5hIHRhcmpldGEgZGUgcmVnYWxvIG5vIHbDoWxpZGEnLFxuICAgICAgICBmcjogJ1ZvdXMgYXZleiBlbnRyw6kgdW5lIGNhcnRlLWNhZGVhdSBub24gdmFsaWRlJyxcbiAgICAgICAgaXQ6ICdIYWkgaW5zZXJpdG8gdW5hIGNhcnRhIHJlZ2FsbyBub24gdmFsaWRhJyxcbiAgICAgICAgamE6ICfnhKHlirnjgarjgq7jg5Xjg4jjgqvjg7zjg4njgpLlhaXlipvjgZfjgb7jgZfjgZ8nLFxuICAgICAgICAncm8tUk8nOiAnQcibaSBpbnRyb2R1cyB1biBjYXJkIGNhZG91IG5ldmFsaWQnLFxuICAgICAgICBhcjogJ9mE2YLYryDYo9iv2K7ZhNiqINio2LfYp9mC2Kkg2YfYr9in2YrYpyDYutmK2LEg2LXYp9mE2K3YqScsXG4gICAgICAgIGNhOiAnSGV1IGludHJvZHXDr3QgdW5hIHRhcmdldGEgcmVnYWwgbm8gdsOgbGlkYScsXG4gICAgICAgICdjcy1DWic6ICdaYWRhbGkganN0ZSBuZXBsYXRub3UgZMOhcmtvdm91IGthcnR1JyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGhhciBpbmR0YXN0ZXQgZXQgdWd5bGRpZ3QgZ2F2ZWtvcnQnLFxuICAgICAgICBlbDogJ86azrHPhM6xz4fPic+Bzq/Pg86xz4TOtSDOvM65zrEgzrzOtyDOrc6zzrrPhc+BzrcgzrTPic+Bzr/Ous6sz4HPhM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkquCkqOClhyDgpI/gpJUg4KSF4KSu4KS+4KSo4KWN4KSvIOCkieCkquCkueCkvuCksCDgpJXgpL7gpLDgpY3gpKEg4KSm4KSw4KWN4KScIOCkleCkv+Ckr+CkviDgpLngpYgnLFxuICAgICAgICAna28tS1InOiAn7J6Y66q765CcIOq4sO2UhO2KuCDsubTrk5zrpbwg7J6F66Cl7ZaI7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdEaXIgaHV0dCBlbmcgb25nw6tsdGVnIEthZGRva2FhcnQgYWdpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnSmUgaGVidCBlZW4gb25nZWxkaWdlIGNhZGVhdWJvbiBpbmdldm9lcmQnLFxuICAgICAgICAncHQtUFQnOiAnVm9jw6ogaW5zZXJpdSB1bSB2YWxlLXByZXNlbnRlIGludsOhbGlkbycsXG4gICAgICAgICdydS1SVSc6ICfQktGLINCy0LLQtdC70Lgg0L3QtdC00LXQudGB0YLQstC40YLQtdC70YzQvdGD0Y4g0L/QvtC00LDRgNC+0YfQvdGD0Y4g0LrQsNGA0YLRgycsXG4gICAgICAgICdzbC1TSSc6ICdWbmVzbGkgc3RlIG5ldmVsamF2bm8gZGFyaWxubyBrYXJ0aWNvJyxcbiAgICAgICAgJ3N2LVNFJzogJ0R1IGhhciBhbmdldHQgZXR0IG9naWx0aWd0IHByZXNlbnRrb3J0JyxcbiAgICAgICAgdGg6ICfguITguLjguJPguJvguYnguK3guJnguJrguLHguJXguKPguILguK3guIfguILguKfguLHguI3guJfguLXguYjguYTguKHguYjguJbguLnguIHguJXguYnguK3guIcnLFxuICAgICAgICB1azogJ9CS0Lgg0LLQstC10LvQuCDQvdC10LTRltC50YHQvdGDINC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDJyxcbiAgICAgICAgJ3poLUNOJzogJ+aCqOi+k+WFpeS6huaXoOaViOeahOekvOWTgeWNoScsXG4gICAgICAgICd6aC1UVyc6ICfmgqjovLjlhaXkuobnhKHmlYjnmoTnpq7lk4HljaEnXG4gICAgfSxcbiAgICAnZ2lmdC1jYXJkLWFscmVhZHktYXBwbGllZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0RpZXNlIEdlc2NoZW5ra2FydGUgd3VyZGUgYmVyZWl0cyBhbmdld2VuZGV0LicsXG4gICAgICAgICdlbi1VUyc6ICdUaGlzIGdpZnQgY2FyZCBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQuJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VzdGEgdGFyamV0YSBkZSByZWdhbG8geWEgc2UgYXBsaWPDsy4nLFxuICAgICAgICBmcjogJ0NldHRlIGNhcnRlLWNhZGVhdSBhIGTDqWrDoCDDqXTDqSBhcHBsaXF1w6llLicsXG4gICAgICAgIGl0OiAnUXVlc3RhIGNhcnRhIHJlZ2FsbyDDqCBnacOgIHN0YXRhIGFwcGxpY2F0YS4nLFxuICAgICAgICBqYTogJ+OBk+OBruOCruODleODiOOCq+ODvOODieOBr+OBmeOBp+OBq+mBqeeUqOOBleOCjOOBpuOBhOOBvuOBmeOAgicsXG4gICAgICAgICdyby1STyc6ICdBY2VzdCBjYXJkIGNhZG91IGEgZm9zdCBkZWphIGFwbGljYXQuJyxcbiAgICAgICAgYXI6ICfYqtmFINiq2LfYqNmK2YIg2KjYt9in2YLYqSDYp9mE2YfYr9in2YrYpyDZh9iw2Ycg2KjYp9mE2YHYudmELicsXG4gICAgICAgIGNhOiAnQXF1ZXN0YSB0YXJnZXRhIHJlZ2FsIGphIHNcXCdoYSBhcGxpY2F0LicsXG4gICAgICAgICdjcy1DWic6ICdUYXRvIGTDoXJrb3bDoSBrYXJ0YSBqacW+IGJ5bGEgcG91xb5pdGEuJyxcbiAgICAgICAgJ2RhLURLJzogJ0RldHRlIGdhdmVrb3J0IGVyIGFsbGVyZWRlIGFudmVuZHQuJyxcbiAgICAgICAgZWw6ICfOkc+Fz4TOriDOtyDOtM+Jz4HOv866zqzPgc+EzrEgzq3Ph861zrkgzq7OtM63IM61z4bOsc+BzrzOv8+Dz4TOtc6vLicsXG4gICAgICAgICdoaS1JTic6ICfgpK/gpLkg4KSJ4KSq4KS54KS+4KSwIOCkleCkvuCksOCljeCkoSDgpKrgpLngpLLgpYcg4KS54KWAIOCksuCkvuCkl+ClgiDgpJXgpL/gpK/gpL4g4KSc4KS+IOCkmuClgeCkleCkviDgpLngpYjgpaQnLFxuICAgICAgICAna28tS1InOiAn7J20IOq4sO2UhO2KuCDsubTrk5zripQg7J2066+4IOyggeyaqeuQmOyXiOyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRMOrcyBLYWRkb2thYXJ0IGdvdWYgc2NobyBhcHBsaXrDqWllcnQuJyxcbiAgICAgICAgJ25sLU5MJzogJ0RlemUgY2FkZWF1Ym9uIGlzIGFsIHRvZWdlcGFzdC4nLFxuICAgICAgICAncHQtUFQnOiAnRXN0ZSB2YWxlLXByZXNlbnRlIGrDoSBmb2kgYXBsaWNhZG8uJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ct0YLQsCDQv9C+0LTQsNGA0L7Rh9C90LDRjyDQutCw0YDRgtCwINGD0LbQtSDQsdGL0LvQsCDQv9GA0LjQvNC10L3QtdC90LAuJyxcbiAgICAgICAgJ3NsLVNJJzogJ1RhIGRhcmlsbmEga2FydGljYSBqZSDFvmUgYmlsYSB1cG9yYWJsamVuYS4nLFxuICAgICAgICAnc3YtU0UnOiAnRGV0dGEgcHJlc2VudGtvcnQgaGFyIHJlZGFuIHRpbGzDpG1wYXRzLicsXG4gICAgICAgIHRoOiAn4Lih4Li14LiB4Liy4Lij4LmD4LiK4LmJ4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiN4LiZ4Li14LmJ4LmB4Lil4LmJ4LinJyxcbiAgICAgICAgdWs6ICfQptGOINC/0L7QtNCw0YDRg9C90LrQvtCy0YMg0LrQsNGA0YLQutGDINCy0LbQtSDQt9Cw0YHRgtC+0YHQvtCy0LDQvdC+LicsXG4gICAgICAgICd6aC1DTic6ICfmraTnpLzlk4HljaHlt7LooqvlupTnlKjjgIInLFxuICAgICAgICAnemgtVFcnOiAn5q2k56au5ZOB5Y2h5bey6KKr5oeJ55So44CCJ1xuICAgIH0sXG4gICAgJ3NoaXAtdG8nOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJzYW5kIG5hY2gnLFxuICAgICAgICAnZW4tVVMnOiAnU2hpcCB0bycsXG4gICAgICAgICdlcy1FUyc6ICdFbnZpYXIgYScsXG4gICAgICAgIGZyOiAnRW52b3lleiDDoCcsXG4gICAgICAgIGl0OiAnU3BlZGlyZSBhJyxcbiAgICAgICAgamE6ICfphY3pgIHlhYgnLFxuICAgICAgICAncm8tUk8nOiAnw45tYmFyY2Egc3ByZScsXG4gICAgICAgIGFyOiAn2LPYp9mB2LEg2LnZhNmJINmF2KrZhiDYs9mB2YrZhtipINmEJyxcbiAgICAgICAgY2E6ICdFbnZpYSBhJyxcbiAgICAgICAgJ2NzLUNaJzogJ0RvcHJhdml0IGRvJyxcbiAgICAgICAgJ2RhLURLJzogJ1NlbmQgdGlsJyxcbiAgICAgICAgZWw6ICfOkc+Azr/Pg8+Ezr/Ou86uIM+Az4HOv8+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckr+CkueCkvuCkgiDgpK3gpYfgpJzgpYfgpIInLFxuICAgICAgICAna28tS1InOiAn67Cw7Iah7KeAJyxcbiAgICAgICAgJ2xiLUxVJzogJ1NjaMOpY2tlbiB1bicsXG4gICAgICAgICdubC1OTCc6ICdWZXJ6ZW5kIG5hYXInLFxuICAgICAgICAncHQtUFQnOiAnRW52aWFyIHBhcmEnLFxuICAgICAgICAncnUtUlUnOiAn0JTQvtGB0YLQsNCy0LrQsCDQtNC+JyxcbiAgICAgICAgJ3NsLVNJJzogJ1Bvc2xhdGkgdicsXG4gICAgICAgICdzdi1TRSc6ICdGcmFrdGEgdGlsbCcsXG4gICAgICAgIHRoOiAn4Liq4LmI4LiH4LmE4Lib4LiX4Li14LmIJyxcbiAgICAgICAgdWs6ICfQktGW0LTQv9GA0LDQstC40YLQuCDQtNC+JyxcbiAgICAgICAgJ3poLUNOJzogJ+i/kOmAgeWIsCcsXG4gICAgICAgICd6aC1UVyc6ICfpgYvpgIHliLAnXG4gICAgfSxcbiAgICAnY2FyZC1sYWJlbCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0tyZWRpdC0gb2RlciBEZWJpdGthcnRlJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NyZWRpdCBvciBkZWJpdCBjYXJkJyxcbiAgICAgICAgJ2VzLUVTJzogJ1RhcmpldGEgZGUgY3LDqWRpdG8gbyBkw6liaXRvJyxcbiAgICAgICAgZnI6ICdDYXJ0ZSBkZSBjcsOpZGl0IG91IGRlIGTDqWJpdCcsXG4gICAgICAgIGl0OiAnQ2FydGEgZGkgY3JlZGl0byBvIGRpIGRlYml0bycsXG4gICAgICAgIGphOiAn44Kv44Os44K444OD44OI44KC44GX44GP44Gv44OH44OT44OD44OI44Kr44O844OJJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NhcmQgZGUgY3JlZGl0IHNhdSBkZWJpdCcsXG4gICAgICAgIGFyOiAn2KjYt9in2YLYqSDYp9mE2KfYptiq2YXYp9mGINij2Ygg2KfZhNiu2LXZhScsXG4gICAgICAgIGNhOiAnVGFyZ2V0YSBkZSBjcsOoZGl0IG8gZMOoYml0JyxcbiAgICAgICAgJ2NzLUNaJzogJ0tyZWRpdG7DrSBuZWJvIGRlYmV0bsOtIGthcnRhJyxcbiAgICAgICAgJ2RhLURLJzogJ0tyZWRpdC0gZWxsZXIgYmV0YWxpbmdza29ydCcsXG4gICAgICAgIGVsOiAnzqDOuc+Dz4TPic+EzrnOus6uIM6uIM+Hz4HOtc+Jz4PPhM65zrrOriDOus6sz4HPhM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCljeCksOClh+CkoeCkv+CknyDgpK/gpL4g4KSh4KWH4KSs4KS/4KSfIOCkleCkvuCksOCljeCkoScsXG4gICAgICAgICdrby1LUic6ICfsi6DsmqnsubTrk5wg65iQ64qUIOyngeu2iOy5tOuTnCcsXG4gICAgICAgICdsYi1MVSc6ICdLcmVkaXR0LSBvZGVyIEJhbmtrYWFydCcsXG4gICAgICAgICdubC1OTCc6ICdDcmVkaXRjYXJkIG9mIGJhbmtwYXMnLFxuICAgICAgICAncHQtUFQnOiAnQ2FydMOjbyBkZSBjcsOpZGl0byBvdSBkw6liaXRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0YDQtdC00LjRgtC90LDRjyDQuNC70Lgg0LTQtdCx0LXRgtC+0LLQsNGPINC60LDRgNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnS3JlZGl0bmEgYWxpIGRlYmV0bmEga2FydGljYScsXG4gICAgICAgICdzdi1TRSc6ICdLcmVkaXQtZWxsZXIgYmV0YWxrb3J0JyxcbiAgICAgICAgdGg6ICfguJrguLHguJXguKPguYDguITguKPguJTguLTguJXguKvguKPguLfguK3guJrguLHguJXguKPguYDguJTguJrguLTguJUnLFxuICAgICAgICB1azogJ9Ca0YDQtdC00LjRgtC90LAg0LDQsdC+INC00LXQsdC10YLQvtCy0LAg0LrQsNGA0YLQutCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+S/oeeUqOWNoeaIluWAn+iusOWNoScsXG4gICAgICAgICd6aC1UVyc6ICfkv6HnlKjljaHmiJblgJ/oqJjljaEnXG4gICAgfSxcbiAgICBwYXk6IHtcbiAgICAgICAgJ2RlLURFJzogJ1phaGxlbicsXG4gICAgICAgICdlbi1VUyc6ICdQYXknLFxuICAgICAgICAnZXMtRVMnOiAnUGFnYXInLFxuICAgICAgICBmcjogJ1BheWVyJyxcbiAgICAgICAgaXQ6ICdQYWdhcmUnLFxuICAgICAgICBqYTogJ+aUr+aJleOBhCcsXG4gICAgICAgICdyby1STyc6ICdQbMSDdGXImXRlJyxcbiAgICAgICAgYXI6ICfZitiv2YHYuScsXG4gICAgICAgIGNhOiAnUGFnYScsXG4gICAgICAgICdjcy1DWic6ICdQbGF0aXQnLFxuICAgICAgICAnZGEtREsnOiAnQmV0YWxlJyxcbiAgICAgICAgZWw6ICfOoM67zrfPgc+JzrzOricsXG4gICAgICAgICdoaS1JTic6ICfgpLXgpYfgpKTgpKgnLFxuICAgICAgICAna28tS1InOiAn7KeA67aIJyxcbiAgICAgICAgJ2xiLUxVJzogJ0JlenVlbGVuJyxcbiAgICAgICAgJ25sLU5MJzogJ0JldGFsZW4nLFxuICAgICAgICAncHQtUFQnOiAnUGFnYXInLFxuICAgICAgICAncnUtUlUnOiAn0J/Qu9Cw0YLQuNGC0YwnLFxuICAgICAgICAnc2wtU0knOiAnUGxhxI1haicsXG4gICAgICAgICdzdi1TRSc6ICdCZXRhbGEnLFxuICAgICAgICB0aDogJ+C4iOC5iOC4suC4oicsXG4gICAgICAgIHVrOiAn0J7Qv9C70LDRgtCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+aUr+S7mCcsXG4gICAgICAgICd6aC1UVyc6ICfmlK/ku5gnXG4gICAgfSxcbiAgICBiYWNrOiB7XG4gICAgICAgICdkZS1ERSc6ICdadXLDvGNrIHp1IEluZm9ybWF0aW9uZW4nLFxuICAgICAgICAnZW4tVVMnOiAnQmFjayB0byBpbmZvJyxcbiAgICAgICAgJ2VzLUVTJzogJ1ZvbHZlciBhIGluZm9ybWFjacOzbicsXG4gICAgICAgIGZyOiAnUmV0b3VyIGF1eCBpbmZvcm1hdGlvbnMnLFxuICAgICAgICBpdDogJ1Rvcm5hIGFsbGUgaW5mb3JtYXppb25pJyxcbiAgICAgICAgamE6ICfmg4XloLHjgavmiLvjgosnLFxuICAgICAgICAncm8tUk8nOiAnw45uYXBvaSBsYSBpbmZvcm1hyJtpaScsXG4gICAgICAgIGFyOiAn2LHYrNmI2Lkg2KXZhNmJINin2YTZhdi52YTZiNmF2KfYqicsXG4gICAgICAgIGNhOiAnVG9ybmEgYSBsYSBpbmZvcm1hY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdacMSbdCBrIGluZm9ybWFjw61tJyxcbiAgICAgICAgJ2RhLURLJzogJ1RpbGJhZ2UgdGlsIGluZm9ybWF0aW9uJyxcbiAgICAgICAgZWw6ICfOlc+AzrnPg8+Ez4HOv8+Gzq4gz4PPhM65z4Igz4DOu863z4HOv8+Gzr/Pgc6vzrXPgicsXG4gICAgICAgICdoaS1JTic6ICfgpJzgpL7gpKjgpJXgpL7gpLDgpYAg4KSq4KSwIOCkteCkvuCkquCkuCDgpJzgpL7gpI/gpIInLFxuICAgICAgICAna28tS1InOiAn7KCV67O066GcIOuPjOyVhOqwgOq4sCcsXG4gICAgICAgICdsYi1MVSc6ICdacsOpY2sgb3AgSW5mb3JtYXRpb3VuJyxcbiAgICAgICAgJ25sLU5MJzogJ1RlcnVnIG5hYXIgaW5mb3JtYXRpZScsXG4gICAgICAgICdwdC1QVCc6ICdWb2x0YXIgcGFyYSBhIGluZm9ybWHDp8OjbycsXG4gICAgICAgICdydS1SVSc6ICfQktC10YDQvdGD0YLRjNGB0Y8g0Log0LjQvdGE0L7RgNC80LDRhtC40LgnLFxuICAgICAgICAnc2wtU0knOiAnTmF6YWogbmEgaW5mb3JtYWNpamUnLFxuICAgICAgICAnc3YtU0UnOiAnVGlsbGJha2EgdGlsbCBpbmZvcm1hdGlvbicsXG4gICAgICAgIHRoOiAn4LiB4Lil4Lix4Lia4LmE4Lib4LiX4Li14LmI4LiC4LmJ4Lit4Lih4Li54LilJyxcbiAgICAgICAgdWs6ICfQndCw0LfQsNC0INC00L4g0ZbQvdGE0L7RgNC80LDRhtGW0ZcnLFxuICAgICAgICAnemgtQ04nOiAn6L+U5Zue5L+h5oGvJyxcbiAgICAgICAgJ3poLVRXJzogJ+i/lOWbnuS/oeaBrydcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICAgICdkZS1ERSc6ICdFbWFpbCcsXG4gICAgICAgICdlbi1VUyc6ICdFbWFpbCcsXG4gICAgICAgICdlcy1FUyc6ICdDb3JyZW8nLFxuICAgICAgICBmcjogJ0VtYWlsJyxcbiAgICAgICAgaXQ6ICdFbWFpbCcsXG4gICAgICAgIGphOiAn44Oh44O844Or44Ki44OJ44Os44K5JyxcbiAgICAgICAgJ3JvLVJPJzogJ0VtYWlsJyxcbiAgICAgICAgYXI6ICfYqNix2YrYryDYp9mE2KfZhNmD2KrYsdmI2YbZiicsXG4gICAgICAgIGNhOiAnQ29ycmV1IGVsZWN0csOybmljJyxcbiAgICAgICAgJ2NzLUNaJzogJ0UtbWFpbGVtJyxcbiAgICAgICAgJ2RhLURLJzogJ0UgLW1haWwnLFxuICAgICAgICBlbDogJ86XzpvOlc6azqTOoc6fzp3Omc6azpcgzpTOmc6VzqXOmM6lzp3Oo86XJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkiOCkruClh+CksicsXG4gICAgICAgICdrby1LUic6ICfsnbTrqZTsnbwnLFxuICAgICAgICAnbGItTFUnOiAnRW1haWwnLFxuICAgICAgICAnbmwtTkwnOiAnRS1tYWlsJyxcbiAgICAgICAgJ3B0LVBUJzogJ08gZW1haWwnLFxuICAgICAgICAncnUtUlUnOiAn0K3Quy4g0LDQtNGA0LXRgScsXG4gICAgICAgICdzbC1TSSc6ICdFLW5hc2xvdicsXG4gICAgICAgICdzdi1TRSc6ICdFLXBvc3QnLFxuICAgICAgICB0aDogJ+C4reC4teC5gOC4oeC4pScsXG4gICAgICAgIHVrOiAn0JXQu9C10LrRgtGA0L7QvdC90LAg0L/QvtGI0YLQsCcsXG4gICAgICAgICd6aC1DTic6ICfnlLXlrZDpgq7ku7YnLFxuICAgICAgICAnemgtVFcnOiAn6Zu75a2Q6YO15Lu2J1xuICAgIH0sXG4gICAgZGVsaXZlcnk6IHtcbiAgICAgICAgJ2RlLURFJzogJ0xpZWZlcnVuZycsXG4gICAgICAgICdlbi1VUyc6ICdEZWxpdmVyeScsXG4gICAgICAgICdlcy1FUyc6ICdFbnRyZWdhJyxcbiAgICAgICAgZnI6ICdMaXZyYWlzb24nLFxuICAgICAgICBpdDogJ0NvbnNlZ25hJyxcbiAgICAgICAgamE6ICfphY3pgIEnLFxuICAgICAgICAncm8tUk8nOiAnTGl2cmFyZScsXG4gICAgICAgIGFyOiAn2KrZiNi12YrZhCcsXG4gICAgICAgIGNhOiAnTGxpdXJhbWVudCcsXG4gICAgICAgICdjcy1DWic6ICdkb2TDoXZrYScsXG4gICAgICAgICdkYS1ESyc6ICdMZXZlcmluZycsXG4gICAgICAgIGVsOiAnzpTOuc6xzr3Ov868zq4nLFxuICAgICAgICAnaGktSU4nOiAn4KS14KS/4KSk4KSw4KSjJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwsOuLrCcsXG4gICAgICAgICdsYi1MVSc6ICdMaXd3ZXJ1bmcnLFxuICAgICAgICAnbmwtTkwnOiAnTGV2ZXJpbmcnLFxuICAgICAgICAncHQtUFQnOiAnRW50cmVnYScsXG4gICAgICAgICdydS1SVSc6ICfQlNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0Rvc3RhdmEnLFxuICAgICAgICAnc3YtU0UnOiAnTGV2ZXJhbnMnLFxuICAgICAgICB0aDogJ+C4iOC4seC4lOC4quC5iOC4hycsXG4gICAgICAgIHVrOiAn0JTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfpgIHotKcnLFxuICAgICAgICAnemgtVFcnOiAn6YCB6LKoJ1xuICAgIH0sXG4gICAgY2FyZDoge1xuICAgICAgICAnZGUtREUnOiAnS2FydGUnLFxuICAgICAgICAnZW4tVVMnOiAnQ2FyZCcsXG4gICAgICAgICdlcy1FUyc6ICdUYXJqZXRhJyxcbiAgICAgICAgZnI6ICdDYXJ0ZScsXG4gICAgICAgIGl0OiAnQ2FydGEnLFxuICAgICAgICBqYTogJ+OCq+ODvOODiScsXG4gICAgICAgICdyby1STyc6ICdDYXJkJyxcbiAgICAgICAgYXI6ICfYqNi32KfZgtipJyxcbiAgICAgICAgY2E6ICdUYXJnZXRhJyxcbiAgICAgICAgJ2NzLUNaJzogJ0thcnR1JyxcbiAgICAgICAgJ2RhLURLJzogJ0tvcnQnLFxuICAgICAgICBlbDogJ86azqzPgc+EzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KS+4KSw4KWN4KShJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y5tOuTnCcsXG4gICAgICAgICdsYi1MVSc6ICdLYWFydCcsXG4gICAgICAgICdubC1OTCc6ICdLYWFydCcsXG4gICAgICAgICdwdC1QVCc6ICdDYXJ0w6NvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0LDRgNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnS2FydGljYScsXG4gICAgICAgICdzdi1TRSc6ICdLb3J0JyxcbiAgICAgICAgdGg6ICfguIHguLLguKPguYzguJQnLFxuICAgICAgICB1azogJ9Ca0LDRgNGC0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfljaHniYcnLFxuICAgICAgICAnemgtVFcnOiAn5Y2h54mHJ1xuICAgIH0sXG4gICAgZWRpdDoge1xuICAgICAgICAnZGUtREUnOiAnQmVhcmJlaXRlbicsXG4gICAgICAgICdlbi1VUyc6ICdFZGl0JyxcbiAgICAgICAgJ2VzLUVTJzogJ0VkaXRhcicsXG4gICAgICAgIGZyOiAnw4lkaXRlcicsXG4gICAgICAgIGl0OiAnTW9kaWZpY2FyZScsXG4gICAgICAgIGphOiAn57eo6ZuGJyxcbiAgICAgICAgJ3JvLVJPJzogJ0VkaXRhJyxcbiAgICAgICAgYXI6ICfZitit2LHYsScsXG4gICAgICAgIGNhOiAnRWRpdGEnLFxuICAgICAgICAnY3MtQ1onOiAnVXByYXZpdCcsXG4gICAgICAgICdkYS1ESyc6ICdSZWRpZ2VyZScsXG4gICAgICAgIGVsOiAnzpXPgM61zr7Otc+BzrPOsc+Dzq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpLjgpILgpKrgpL7gpKbgpL/gpKQg4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+2OuOynke2VmOuLpCcsXG4gICAgICAgICdsYi1MVSc6ICdFZGl0w6lpZXJlbicsXG4gICAgICAgICdubC1OTCc6ICdCZXdlcmtpbmcnLFxuICAgICAgICAncHQtUFQnOiAnRWRpdGFyJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ1VyZWRpJyxcbiAgICAgICAgJ3N2LVNFJzogJ1JlZGlnZXJhJyxcbiAgICAgICAgdGg6ICfguYHguIHguYnguYTguIInLFxuICAgICAgICB1azogJ9Cg0LXQtNCw0LPRg9Cy0LDRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+e8lui+kScsXG4gICAgICAgICd6aC1UVyc6ICfnt6jovK8nXG4gICAgfSxcbiAgICAnbm8tc2hpcCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0RpZXNlciBTaG9wIGxpZWZlcnQgbGVpZGVyIG5pY2h0IGFuIElocmVuIFN0YW5kb3J0LicsXG4gICAgICAgICdlbi1VUyc6ICdTb3JyeSwgdGhpcyBzdG9yZSBkb2VzIG5vdCBzaGlwIHRvIHlvdXIgbG9jYXRpb24uJyxcbiAgICAgICAgJ2VzLUVTJzogJ0xvIHNlbnRpbW9zLCBlc3RhIHRpZW5kYSBubyBzZSBlbnbDrWEgYSBzdSB1YmljYWNpw7NuLicsXG4gICAgICAgIGZyOiAnRMOpc29sw6ksIGNlIG1hZ2FzaW4gbmUgbGl2cmUgcGFzIMOgIHZvdHJlIGVtcGxhY2VtZW50LicsXG4gICAgICAgIGl0OiAnU2lhbW8gc3BpYWNlbnRpLCBxdWVzdG8gbmVnb3ppbyBub24gdmllbmUgc3BlZGl0byBhbGxhIHR1YSBwb3NpemlvbmUuJyxcbiAgICAgICAgamE6ICfnlLPjgZfoqLPjgYLjgorjgb7jgZvjgpPjgYzjgIHjgZPjga7jgrnjg4jjgqLjga/jgYrkvY/jgb7jgYTjga7lnLDln5/jgavnmbrpgIHjgZXjgozjgb7jgZvjgpPjgIInLFxuICAgICAgICAncm8tUk8nOiAnTmUgcGFyZSByxIN1LCBhY2VzdCBtYWdhemluIG51IGVzdGUgbGl2cmF0IMOubiBsb2NhyJtpYSBkdnMuJyxcbiAgICAgICAgYXI6ICfYudiw2LHYpyDYjCDZh9iw2Kcg2KfZhNmF2KrYrNixINmE2Kcg2YrYtNit2YYg2KXZhNmJINmF2YjZgti52YMuJyxcbiAgICAgICAgY2E6ICdBcXVlc3RhIGJvdGlnYSBubyBzXFwnZW52aWEgYSBsYSB2b3N0cmEgdWJpY2FjacOzLicsXG4gICAgICAgICdjcy1DWic6ICdKZSBuw6FtIGzDrXRvLCB0ZW50byBvYmNob2QgdsOhbSBuZWRvcnXEjcOtbWUuJyxcbiAgICAgICAgJ2RhLURLJzogJ0Jla2xhZ2VyLCBkZW5uZSBidXRpayBzZW5kZXIgaWtrZSB0aWwgZGluIGxva2F0aW9uLicsXG4gICAgICAgIGVsOiAnzpvPhc+Azr/Pjc68zrHPg8+EzrUsIM6xz4XPhM+MIM+Ezr8gzrrOsc+EzqzPg8+EzrfOvM6xIM60zrXOvSDOsc+Azr/Pg8+Ezq3Ou867zrXPhM6xzrkgz4PPhM63zr0gz4TOv8+Azr/OuM61z4POr86xIM+DzrHPgi4nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWN4KS34KSu4KS+IOCkleCksOClh+Ckgiwg4KSv4KS5IOCkuOCljeCkn+Cli+CksCDgpIbgpKrgpJXgpYcg4KS44KWN4KSl4KS+4KSoIOCkquCksCDgpLbgpL/gpKog4KSo4KS54KWA4KSCIOCkleCksOCkpOCkviDgpLngpYjgpaQnLFxuICAgICAgICAna28tS1InOiAn7KOE7Iah7ZWp64uI64ukLiDsnbQg7IOB7KCQ7J2AIOq3gO2VmOydmCDsnITsuZjroZwg67Cw7Iah65CY7KeAIOyViuyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRW50c2Now6tsbGVndCwgZMOrc2UgQnV0dGVrIGfDq3R0IG5ldCBvcCDDhHIgTG9jYXRpb24gdmVyc2Now6lja3QuJyxcbiAgICAgICAgJ25sLU5MJzogJ1NvcnJ5LCBkZXplIHdpbmtlbCB2ZXJ6ZW5kdCBuaWV0IG5hYXIgam91dyBsb2NhdGllLicsXG4gICAgICAgICdwdC1QVCc6ICdEZXNjdWxwZSwgZXN0YSBsb2phIG7Do28gZW52aWEgcGFyYSBvIHNldSBsb2NhbC4nLFxuICAgICAgICAncnUtUlUnOiAn0Jog0YHQvtC20LDQu9C10L3QuNGOLCDQtNC+0YHRgtCw0LLQutCwINCyINGN0YLQvtGCINC80LDQs9Cw0LfQuNC9INC90LUg0L7RgdGD0YnQtdGB0YLQstC70Y/QtdGC0YHRjy4nLFxuICAgICAgICAnc2wtU0knOiAnVGEgdHJnb3ZpbmEgxb5hbCBuaSBkb3N0YXZsamVuYSBuYSB2YcWhbyBsb2thY2lqby4nLFxuICAgICAgICAnc3YtU0UnOiAnRGVuIGjDpHIgYnV0aWtlbiBza2lja2FzIGludGUgdGlsbCBkaW4gcGxhdHMuJyxcbiAgICAgICAgdGg6ICfguILguK3guK3guKDguLHguKIg4Lij4LmJ4Liy4LiZ4LiE4LmJ4Liy4LiZ4Li14LmJ4LmE4Lih4LmI4LmE4LiU4LmJ4LiI4Lix4LiU4Liq4LmI4LiH4LmE4Lib4Lii4Lix4LiH4LiV4Liz4LmB4Lir4LiZ4LmI4LiH4LiC4Lit4LiH4LiE4Li44LiTJyxcbiAgICAgICAgdWs6ICfQndCwINC20LDQu9GMLCDRhtC10Lkg0LzQsNCz0LDQt9C40L0g0L3QtSDQtNC+0YHRgtCw0LLQu9GP0ZTRgtGM0YHRjyDQtNC+INCy0LDRiNC+0LPQviDQvNGW0YHRhtC10LfQvdCw0YXQvtC00LbQtdC90L3Rjy4nLFxuICAgICAgICAnemgtQ04nOiAn5oqx5q2J77yM6L+Z5a625ZWG5bqX5LiN5Y+R6LSn5Yiw5oKo5omA5Zyo55qE5L2N572u44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+aKseatie+8jOmAmeWutuWVhuW6l+S4jeeZvOiyqOWIsOaCqOaJgOWcqOeahOS9jee9ruOAgidcbiAgICB9LFxuICAgIHByb2Nlc3Npbmc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1ZlcmFyYmVpdHVuZycsXG4gICAgICAgICdlbi1VUyc6ICdQcm9jZXNzaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ1Byb2Nlc2FtaWVudG8nLFxuICAgICAgICBmcjogJ1RyYWl0ZW1lbnQnLFxuICAgICAgICBpdDogJ0VsYWJvcmF6aW9uZScsXG4gICAgICAgIGphOiAn6YCy6KGM5LitJyxcbiAgICAgICAgJ3JvLVJPJzogJ1ByZWx1Y3JhcmUnLFxuICAgICAgICBhcjogJ9mK2LnYp9mE2KwnLFxuICAgICAgICBjYTogJ1Byb2Nlc3NhbWVudCcsXG4gICAgICAgICdjcy1DWic6ICd6cHJhY292w6F2w6Egc2UnLFxuICAgICAgICAnZGEtREsnOiAnRm9yYXJiZWpkbmluZycsXG4gICAgICAgIGVsOiAnzpXPgM61zr7Otc+BzrPOsc+Dzq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpY3gpLDgpLjgpILgpLjgpY3gpJXgpLDgpKMnLFxuICAgICAgICAna28tS1InOiAn7LKY66asJyxcbiAgICAgICAgJ2xiLUxVJzogJ1ZlcmFhcmJlY2h0dW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZlcndlcmtlbicsXG4gICAgICAgICdwdC1QVCc6ICdFbSBwcm9jZXNzYW1lbnRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ce0LHRgNCw0LHQvtGC0LrQsCcsXG4gICAgICAgICdzbC1TSSc6ICdPYnJhdm5hdmF0aScsXG4gICAgICAgICdzdi1TRSc6ICdCZWFyYmV0bmluZycsXG4gICAgICAgIHRoOiAn4LiB4Liz4Lil4Lix4LiH4Lib4Lij4Liw4Lih4Lin4Lil4Lic4LilJyxcbiAgICAgICAgdWs6ICfQntCx0YDQvtCx0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfliqDlt6UnLFxuICAgICAgICAnemgtVFcnOiAn5Yqg5belJ1xuICAgIH0sXG4gICAgJ3BheW1lbnQtZmFpbGVkJzoge1xuICAgICAgICAnZGUtREUnOiAnWmFobHVuZyBmZWhsZ2VzY2hsYWdlbicsXG4gICAgICAgICdlbi1VUyc6ICdQYXltZW50IGZhaWxlZCcsXG4gICAgICAgICdlcy1FUyc6ICdQYWdvIGZhbGxpZG8nLFxuICAgICAgICBmcjogJ1BhaWVtZW50IMOpY2hvdcOpJyxcbiAgICAgICAgaXQ6ICdQYWdhbWVudG8gbm9uIHJpdXNjaXRvJyxcbiAgICAgICAgamE6ICfmlK/miZXjgYTlpLHmlZcnLFxuICAgICAgICAncm8tUk8nOiAnUGxhdGEgZXN1YXRhJyxcbiAgICAgICAgYXI6ICfYudmF2YTZitipINin2YTYr9mB2Lkg2YHYtNmE2KonLFxuICAgICAgICBjYTogJ0VsIHBhZ2FtZW50IGhhIGZhbGxhdCcsXG4gICAgICAgICdjcy1DWic6ICdQbGF0YmEgc2VsaGFsYScsXG4gICAgICAgICdkYS1ESyc6ICdCZXRhbGluZyBtaXNseWtrZWRlcycsXG4gICAgICAgIGVsOiAnzpcgz4DOu863z4HPic68zq4gzrHPgM6tz4TPhc+HzrUnLFxuICAgICAgICAnaGktSU4nOiAn4KSt4KWB4KSX4KSk4KS+4KSoIOCkheCkuOCkq+CksiDgpLngpYHgpIYnLFxuICAgICAgICAna28tS1InOiAn6rKw7KCcIOyLpO2MqCcsXG4gICAgICAgICdsYi1MVSc6ICdCZXp1ZWx1bmcgZ2VzY2hlaXRlcnQnLFxuICAgICAgICAnbmwtTkwnOiAnQmV0YWxpbmcgbWlzbHVrdCcsXG4gICAgICAgICdwdC1QVCc6ICdQYWdhbWVudG8gZmFsaG91JyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LvQsNGC0LXQtiDQvdC1INC/0YDQvtGI0LXQuycsXG4gICAgICAgICdzbC1TSSc6ICdQbGHEjWlsbyBuaSB1c3BlbG8nLFxuICAgICAgICAnc3YtU0UnOiAnQmV0YWxuaW5nIG1pc3NseWNrYWRlcycsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LiK4Liz4Lij4Liw4LmA4LiH4Li04LiZ4Lil4LmJ4Lih4LmA4Lir4Lil4LinJyxcbiAgICAgICAgdWs6ICfQndC1INCy0LTQsNC70L7RgdGPINC30LTRltC50YHQvdC40YLQuCDQv9C70LDRgtGW0LYnLFxuICAgICAgICAnemgtQ04nOiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgICAgJ3poLVRXJzogJ+aUr+S7mOWkseaVlydcbiAgICB9LFxuICAgICdmaXJzdC1uYW1lJzoge1xuICAgICAgICAnZGUtREUnOiAnVm9ybmFtZScsXG4gICAgICAgICdlbi1VUyc6ICdGaXJzdCBuYW1lJyxcbiAgICAgICAgJ2VzLUVTJzogJ05vbWJyZScsXG4gICAgICAgIGZyOiAnUHLDqW5vbScsXG4gICAgICAgIGl0OiAnTm9tZScsXG4gICAgICAgIGphOiAn5ZCNJyxcbiAgICAgICAgJ3JvLVJPJzogJ051bWUnLFxuICAgICAgICBhcjogJ9in2YTYp9iz2YUg2KfZhNij2YjZhCcsXG4gICAgICAgIGNhOiAnTm9tJyxcbiAgICAgICAgJ2NzLUNaJzogJ0ptw6lubycsXG4gICAgICAgICdkYS1ESyc6ICdGb3JuYXZuJyxcbiAgICAgICAgZWw6ICfOn869zr/OvM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCkueCksuCkviDgpKjgpL7gpK4nLFxuICAgICAgICAna28tS1InOiAn7J2066aEJyxcbiAgICAgICAgJ2xiLUxVJzogJ1Zpcm51bW0nLFxuICAgICAgICAnbmwtTkwnOiAnVm9vcm5hYW0nLFxuICAgICAgICAncHQtUFQnOiAnUHJpbWVpcm8gbm9tZScsXG4gICAgICAgICdydS1SVSc6ICfQmNC80Y8nLFxuICAgICAgICAnc2wtU0knOiAnSW1lJyxcbiAgICAgICAgJ3N2LVNFJzogJ0bDtnJuYW1uJyxcbiAgICAgICAgdGg6ICfguIrguLfguYjguK3guIjguKPguLTguIcnLFxuICAgICAgICB1azogJ9CG0LxcXCfRjycsXG4gICAgICAgICd6aC1DTic6ICflkI0nLFxuICAgICAgICAnemgtVFcnOiAn5ZCNJ1xuICAgIH0sXG4gICAgJ2xhc3QtbmFtZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ05hY2huYW1lJyxcbiAgICAgICAgJ2VuLVVTJzogJ0xhc3QgbmFtZScsXG4gICAgICAgICdlcy1FUyc6ICdBcGVsbGlkbycsXG4gICAgICAgIGZyOiAnTm9tJyxcbiAgICAgICAgaXQ6ICdDb2dub21lJyxcbiAgICAgICAgamE6ICflp5MnLFxuICAgICAgICAncm8tUk8nOiAnTnVtZWxlIGRlIGZhbWlsaWUnLFxuICAgICAgICBhcjogJ9in2YTZg9mG2YrYqScsXG4gICAgICAgIGNhOiAnQ29nbm9tJyxcbiAgICAgICAgJ2NzLUNaJzogJ1DFmcOtam1lbsOtJyxcbiAgICAgICAgJ2RhLURLJzogJ0VmdGVybmF2bicsXG4gICAgICAgIGVsOiAnzpXPgM6vzrjOtc+Ezr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSJ4KSq4KSo4KS+4KSuJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yEsScsXG4gICAgICAgICdsYi1MVSc6ICdGYW1pbGxqZW5udW1tJyxcbiAgICAgICAgJ25sLU5MJzogJ0FjaHRlcm5hYW0nLFxuICAgICAgICAncHQtUFQnOiAnw5psdGltbyBub21lJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ck0LDQvNC40LvQuNGPJyxcbiAgICAgICAgJ3NsLVNJJzogJ1ByaWltZWsnLFxuICAgICAgICAnc3YtU0UnOiAnRWZ0ZXJuYW1uJyxcbiAgICAgICAgdGg6ICfguJnguLLguKHguKrguIHguLjguKUnLFxuICAgICAgICB1azogJ9Cf0YDRltC30LLQuNGJ0LUnLFxuICAgICAgICAnemgtQ04nOiAn5aeTJyxcbiAgICAgICAgJ3poLVRXJzogJ+WnkydcbiAgICB9LFxuICAgIHBob25lOiB7XG4gICAgICAgICdkZS1ERSc6ICdUZWxlZm9uJyxcbiAgICAgICAgJ2VuLVVTJzogJ1Bob25lIG51bWJlcicsXG4gICAgICAgICdlcy1FUyc6ICdUZWzDqWZvbm8nLFxuICAgICAgICBmcjogJ1TDqWzDqXBob25lJyxcbiAgICAgICAgaXQ6ICdUZWxlZm9ubycsXG4gICAgICAgIGphOiAn6Zu76Kmx55Wq5Y+3JyxcbiAgICAgICAgJ3JvLVJPJzogJ1RlbGVmb24nLFxuICAgICAgICBhcjogJ9ix2YLZhSDYp9mE2YfYp9iq2YEnLFxuICAgICAgICBjYTogJ07Dum1lcm8gZGUgdGVsw6hmb24nLFxuICAgICAgICAnY3MtQ1onOiAnVGVsZWZvbm7DrSDEjcOtc2xvJyxcbiAgICAgICAgJ2RhLURLJzogJ1RlbGVmb25udW1tZXInLFxuICAgICAgICBlbDogJ86kzrfOu861z4bPic69zrnOus+MIM69zr/Pjc68zrXPgc6/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckq+CkvOCli+CkqCDgpKjgpILgpKzgpLAnLFxuICAgICAgICAna28tS1InOiAn7KCE7ZmUIOuyiO2YuCcsXG4gICAgICAgICdsYi1MVSc6ICdUZWxlZm9uc251bW1lcicsXG4gICAgICAgICdubC1OTCc6ICdUZWxlZm9vbm51bW1lcicsXG4gICAgICAgICdwdC1QVCc6ICdOw7ptZXJvIGRlIHRlbGVmb25lJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cd0L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdUZWxlZm9uc2thIMWhdGV2aWxrYScsXG4gICAgICAgICdzdi1TRSc6ICdUZWxlZm9ubnVtbWVyJyxcbiAgICAgICAgdGg6ICfguKvguKHguLLguKLguYDguKXguILguYLguJfguKPguKjguLHguJ7guJfguYwnLFxuICAgICAgICB1azogJ9Ci0LXQu9C10YTQvtC90L3QuNC5INC90L7QvNC10YAnLFxuICAgICAgICAnemgtQ04nOiAn55S16K+d5Y+356CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+mbu+ipseiZn+eivCdcbiAgICB9LFxuICAgIHN0cmVldDoge1xuICAgICAgICAnZGUtREUnOiAnU3RyYcOfZSB1bmQgSGF1c251bW1lcicsXG4gICAgICAgICdlbi1VUyc6ICdTdHJlZXQgYWRkcmVzcycsXG4gICAgICAgICdlcy1FUyc6ICdEaXJlY2Npw7NuJyxcbiAgICAgICAgZnI6ICdBZHJlc3NlJyxcbiAgICAgICAgaXQ6ICdJbmRpcml6em8nLFxuICAgICAgICBqYTogJ+S9j+aJgOips+e0sCcsXG4gICAgICAgICdyby1STyc6ICdBZHJlc8SDJyxcbiAgICAgICAgYXI6ICfYudmG2YjYp9mGINin2YTYtNin2LHYuScsXG4gICAgICAgIGNhOiAnYWRyZcOnYScsXG4gICAgICAgICdjcy1DWic6ICdhZHJlc2EgdWxpY2UnLFxuICAgICAgICAnZGEtREsnOiAnVmVqbmF2bicsXG4gICAgICAgIGVsOiAnzrTOuc61z43OuM+Fzr3Pg863JyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckl+CksuClgCDgpJXgpL4g4KSq4KSk4KS+JyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvOyGjCcsXG4gICAgICAgICdsYi1MVSc6ICdTdHJvb3NzIEFkcmVzcycsXG4gICAgICAgICdubC1OTCc6ICd3b29uYWRyZXMnLFxuICAgICAgICAncHQtUFQnOiAnZW5kZXJlw6dvIGRhIFJ1YScsXG4gICAgICAgICdydS1SVSc6ICfQsNC00YDQtdGBINGD0LvQuNGG0YsnLFxuICAgICAgICAnc2wtU0knOiAnbmFzbG92IGNlc3RlJyxcbiAgICAgICAgJ3N2LVNFJzogJ0dhdHVhZHJlc3MnLFxuICAgICAgICB0aDogJ+C4l+C4teC5iOC4reC4ouC4ueC5iOC4luC4meC4mScsXG4gICAgICAgIHVrOiAn0JDQtNGA0LXRgdCwINCy0YPQu9C40YbRlicsXG4gICAgICAgICd6aC1DTic6ICfooZfpgZPlnLDlnYAnLFxuICAgICAgICAnemgtVFcnOiAn6KGX6YGT5Zyw5Z2AJ1xuICAgIH0sXG4gICAgYXB0OiB7XG4gICAgICAgICdkZS1ERSc6ICdBcGFydG1lbnQgIycsXG4gICAgICAgICdlbi1VUyc6ICdBcHQuICMnLFxuICAgICAgICAnZXMtRVMnOiAnQXBhcnRhbWVudG8gIycsXG4gICAgICAgIGZyOiAnQXBwYXJ0ZW1lbnQgIycsXG4gICAgICAgIGl0OiAnQXBwYXJ0YW1lbnRvICMnLFxuICAgICAgICBqYTogJ+mDqOWxi+eVquWPt+OBquOBqScsXG4gICAgICAgICdyby1STyc6ICdBcGFydGFtZW50ICMnLFxuICAgICAgICBhcjogJ9i02YLYqSAjJyxcbiAgICAgICAgY2E6ICdBcGFydGFtZW50ICMnLFxuICAgICAgICAnY3MtQ1onOiAnQnl0ICMnLFxuICAgICAgICAnZGEtREsnOiAnTGVqbGlnaGVkICMnLFxuICAgICAgICBlbDogJ86UzrnOsc68zq3Pgc65z4POvM6xICMnLFxuICAgICAgICAnaGktSU4nOiAn4KSF4KSq4KS+4KSw4KWN4KSf4KSu4KWH4KSC4KSfICMnLFxuICAgICAgICAna28tS1InOiAn7JWE7YyM7Yq4ICMnLFxuICAgICAgICAnbGItTFUnOiAnQXBwYXJ0ZW1lbnQgIycsXG4gICAgICAgICdubC1OTCc6ICdBcHBhcnRlbWVudCAjJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FwYXJ0YW1lbnRvICMnLFxuICAgICAgICAncnUtUlUnOiAn0JrQstCw0YDRgtC40YDQsCAjJyxcbiAgICAgICAgJ3NsLVNJJzogJ1N0YW5vdmFuamUgxaF0LicsXG4gICAgICAgICdzdi1TRSc6ICdMw6RnZW5oZXQgIycsXG4gICAgICAgIHRoOiAn4Lit4Lie4Liy4Lij4LmM4LiX4LmA4Lih4LmJ4LiZICMnLFxuICAgICAgICB1azogJ9Ca0LLQsNGA0YLQuNGA0LAg4oSWJyxcbiAgICAgICAgJ3poLUNOJzogJ+WFrOWvkyDvvIMnLFxuICAgICAgICAnemgtVFcnOiAn5YWs5a+TIO+8gydcbiAgICB9LFxuICAgIHBvc3RhbDoge1xuICAgICAgICAnZGUtREUnOiAnUG9zdGxlaXR6YWhsJyxcbiAgICAgICAgJ2VuLVVTJzogJ1Bvc3RhbCBjb2RlJyxcbiAgICAgICAgJ2VzLUVTJzogJ0PDs2RpZ28gUG9zdGFsJyxcbiAgICAgICAgZnI6ICdDb2RlIHBvc3RhbCcsXG4gICAgICAgIGl0OiAnQ29kaWNlIHBvc3RhbGUnLFxuICAgICAgICBqYTogJ+mDteS+v+eVquWPtycsXG4gICAgICAgICdyby1STyc6ICdDb2QgcG9zdGFsJyxcbiAgICAgICAgYXI6ICfYp9mE2LHZhdiyINin2YTYqNix2YrYr9mKJyxcbiAgICAgICAgY2E6ICdDb2RpIFBvc3RhbCcsXG4gICAgICAgICdjcy1DWic6ICdQb8WhdG92bsOtIHNtxJtyb3ZhY8OtIMSNw61zbG8nLFxuICAgICAgICAnZGEtREsnOiAnUG9zdG51bW1lcicsXG4gICAgICAgIGVsOiAnzqTOsc+Hz4XOtM+Bzr/OvM65zrrPjM+CIM6az47OtM65zrrOsc+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkoeCkvuCklSDgpJXgpYvgpKEnLFxuICAgICAgICAna28tS1InOiAn7Jqw7Y64IOuyiO2YuCcsXG4gICAgICAgICdsYi1MVSc6ICdQb3N0bGVpdHp1ZWwnLFxuICAgICAgICAnbmwtTkwnOiAnUG9zdGNvZGUnLFxuICAgICAgICAncHQtUFQnOiAnQ8OzZGlnbyBwb3N0YWwnLFxuICAgICAgICAncnUtUlUnOiAn0J/QvtGH0YLQvtCy0YvQuSDQmtC+0LQnLFxuICAgICAgICAnc2wtU0knOiAnUG/FoXRuYSDFoXRldmlsa2EnLFxuICAgICAgICAnc3YtU0UnOiAnUG9zdG51bW1lcicsXG4gICAgICAgIHRoOiAn4Lij4Lir4Lix4Liq4LmE4Lib4Lij4Lip4LiT4Li14Lii4LmMJyxcbiAgICAgICAgdWs6ICfQn9C+0YjRgtC+0LLQuNC5INGW0L3QtNC10LrRgScsXG4gICAgICAgICd6aC1DTic6ICfpgq7mlL/nvJbnoIEnLFxuICAgICAgICAnemgtVFcnOiAn6YO15pS/57eo56K8J1xuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgICAnZGUtREUnOiAnU3RhZHQnLFxuICAgICAgICAnZW4tVVMnOiAnQ2l0eScsXG4gICAgICAgICdlcy1FUyc6ICdDaXVkYWQnLFxuICAgICAgICBmcjogJ1ZpbGxlJyxcbiAgICAgICAgaXQ6ICdDaXR0YScsXG4gICAgICAgIGphOiAn5biCJyxcbiAgICAgICAgJ3JvLVJPJzogJ09yYciZJyxcbiAgICAgICAgYXI6ICfZhdiv2YrZhtipJyxcbiAgICAgICAgY2E6ICdjaXV0YXQnLFxuICAgICAgICAnY3MtQ1onOiAnTcSbc3RvJyxcbiAgICAgICAgJ2RhLURLJzogJ0J5JyxcbiAgICAgICAgZWw6ICfOoM+MzrvOtycsXG4gICAgICAgICdoaS1JTic6ICfgpLbgpLngpLAnLFxuICAgICAgICAna28tS1InOiAn64+E7IucJyxcbiAgICAgICAgJ2xiLUxVJzogJ1N0YWQnLFxuICAgICAgICAnbmwtTkwnOiAnU3RhZCcsXG4gICAgICAgICdwdC1QVCc6ICdDaWRhZGUnLFxuICAgICAgICAncnUtUlUnOiAn0JPQvtGA0L7QtCcsXG4gICAgICAgICdzbC1TSSc6ICdNZXN0bycsXG4gICAgICAgICdzdi1TRSc6ICdTdGFkJyxcbiAgICAgICAgdGg6ICfguYDguKHguLfguK3guIcnLFxuICAgICAgICB1azogJ9Cc0ZbRgdGC0L4nLFxuICAgICAgICAnemgtQ04nOiAn5Z+O5biCJyxcbiAgICAgICAgJ3poLVRXJzogJ+WfjuW4gidcbiAgICB9LFxuICAgIHByb3ZpbmNlOiB7XG4gICAgICAgICdkZS1ERSc6ICdQcm92aW56JyxcbiAgICAgICAgJ2VuLVVTJzogJ1Byb3ZpbmNlJyxcbiAgICAgICAgJ2VzLUVTJzogJ1Byb3ZpbmNpYScsXG4gICAgICAgIGZyOiAnRMOpcGFydGVtZW50JyxcbiAgICAgICAgaXQ6ICdQcm92aW5jaWEnLFxuICAgICAgICBqYTogJ+ecjCcsXG4gICAgICAgICdyby1STyc6ICdKdWRldCcsXG4gICAgICAgIGFyOiAn2YXZgtin2LfYudipJyxcbiAgICAgICAgY2E6ICdQcm92w61uY2lhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1Byb3ZpbmNpZScsXG4gICAgICAgICdkYS1ESyc6ICdQcm92aW5zJyxcbiAgICAgICAgZWw6ICfOlc+AzrHPgc+Hzq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpY3gpLDgpL7gpILgpKQnLFxuICAgICAgICAna28tS1InOiAn7KO8JyxcbiAgICAgICAgJ2xiLUxVJzogJ1Byb3bDq256JyxcbiAgICAgICAgJ25sLU5MJzogJ1Byb3ZpbmNpZScsXG4gICAgICAgICdwdC1QVCc6ICdQcm92w61uY2lhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtCy0LjQvdGG0LjRjycsXG4gICAgICAgICdzbC1TSSc6ICdQb2tyYWppbmEnLFxuICAgICAgICAnc3YtU0UnOiAnUHJvdmlucycsXG4gICAgICAgIHRoOiAn4LiI4Lix4LiH4Lir4Lin4Lix4LiUJyxcbiAgICAgICAgdWs6ICfQn9GA0L7QstGW0L3RhtGW0Y8nLFxuICAgICAgICAnemgtQ04nOiAn55yBJyxcbiAgICAgICAgJ3poLVRXJzogJ+ecgSdcbiAgICB9LFxuICAgICdwcm92aW5jZS1zZWxlY3QnOiB7XG4gICAgICAgICdkZS1ERSc6ICdXw6RobGVuIFNpZSBlaW5lIFByb3ZpbnonLFxuICAgICAgICAnZW4tVVMnOiAnU2VsZWN0IGEgUHJvdmluY2UnLFxuICAgICAgICAnZXMtRVMnOiAnU2VsZWNjaW9uZSB1bmEgcHJvdmluY2lhJyxcbiAgICAgICAgZnI6ICdTw6lsZWN0aW9ubmV6IHVuZSBwcm92aW5jZScsXG4gICAgICAgIGl0OiAnU2VsZXppb25hIHVuYSBwcm92aW5jaWEnLFxuICAgICAgICBqYTogJ+mDvemBk+W6nOecjOOCkumBuOaKnicsXG4gICAgICAgICdyby1STyc6ICdTZWxlY3RhyJtpIG8gcHJvdmluY2llJyxcbiAgICAgICAgYXI6ICfYp9iu2KrYsSDYp9mE2YXYrdin2YHYuNipJyxcbiAgICAgICAgY2E6ICdTZWxlY2Npb25ldSB1bmEgcHJvdsOtbmNpYScsXG4gICAgICAgICdjcy1DWic6ICdWeWJlcnRlIHByb3ZpbmNpaScsXG4gICAgICAgICdkYS1ESyc6ICdWw6ZsZyBlbiBwcm92aW5zJyxcbiAgICAgICAgZWw6ICfOlc+AzrnOu86tzr7PhM61IM68zrnOsSDOtc+AzrHPgc+Hzq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpI/gpJUg4KSq4KWN4KSw4KS+4KSC4KSkIOCkleCkviDgpJrgpK/gpKgg4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvOulvCDshKDtg53tlZjsi63si5zsmKQnLFxuICAgICAgICAnbGItTFUnOiAnV2llbHQgZW5nIFByb3bDq256JyxcbiAgICAgICAgJ25sLU5MJzogJ1NlbGVjdGVlciBlZW4gcHJvdmluY2llJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbGVjaW9uZSB1bWEgcHJvdsOtbmNpYScsXG4gICAgICAgICdydS1SVSc6ICfQktGL0LHQtdGA0LjRgtC1INC/0YDQvtCy0LjQvdGG0LjRjicsXG4gICAgICAgICdzbC1TSSc6ICdJemJlcml0ZSBwcm92aW5jbycsXG4gICAgICAgICdzdi1TRSc6ICdWw6RsaiBlbiBwcm92aW5zJyxcbiAgICAgICAgdGg6ICfguYDguKXguLfguK3guIHguIjguLHguIfguKvguKfguLHguJQnLFxuICAgICAgICB1azogJ9CS0LjQsdC10YDRltGC0Ywg0L/RgNC+0LLRltC90YbRltGOJyxcbiAgICAgICAgJ3poLUNOJzogJ+mAieaLqeecgeS7vScsXG4gICAgICAgICd6aC1UVyc6ICfpgbjmk4fnnIHku70nXG4gICAgfSxcbiAgICBzdGF0ZToge1xuICAgICAgICAnZGUtREUnOiAnQnVuZGVzbGFuZCcsXG4gICAgICAgICdlbi1VUyc6ICdTdGF0ZScsXG4gICAgICAgICdlcy1FUyc6ICdFc3RhZG8nLFxuICAgICAgICBmcjogJ8OJdGF0JyxcbiAgICAgICAgaXQ6ICdTdGF0bycsXG4gICAgICAgIGphOiAn55yMJyxcbiAgICAgICAgJ3JvLVJPJzogJ1N0YXQnLFxuICAgICAgICBhcjogJ9mI2YTYp9mK2KknLFxuICAgICAgICBjYTogJ0VzdGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ1N0w6F0JyxcbiAgICAgICAgJ2RhLURLJzogJ1N0YXQnLFxuICAgICAgICBlbDogJ866zrHPhM6sz4PPhM6xz4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpLDgpL7gpJzgpY3gpK8nLFxuICAgICAgICAna28tS1InOiAn7IOB7YOcJyxcbiAgICAgICAgJ2xiLUxVJzogJ1N0YWF0JyxcbiAgICAgICAgJ25sLU5MJzogJ1N0YWF0JyxcbiAgICAgICAgJ3B0LVBUJzogJ0VzdGFkYScsXG4gICAgICAgICdydS1SVSc6ICfQodC+0YHRgtC+0Y/QvdC40LUnLFxuICAgICAgICAnc2wtU0knOiAnRHLFvmF2YScsXG4gICAgICAgICdzdi1TRSc6ICdzdGF0JyxcbiAgICAgICAgdGg6ICfguKrguJbguLLguJnguLAnLFxuICAgICAgICB1azogJ9CU0LXRgNC20LDQstCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+W3nicsXG4gICAgICAgICd6aC1UVyc6ICflt54nXG4gICAgfSxcbiAgICAnc3RhdGUtc2VsZWN0Jzoge1xuICAgICAgICAnZGUtREUnOiAnV8OkaGxlIGVpbmVuIFN0YWF0JyxcbiAgICAgICAgJ2VuLVVTJzogJ1NlbGVjdCBhIFN0YXRlJyxcbiAgICAgICAgJ2VzLUVTJzogJ1NlbGVjY2lvbmEgdW4gRXN0YWRvJyxcbiAgICAgICAgZnI6ICdTw6lsZWN0aW9ubmVyIHVuIMOpdGF0JyxcbiAgICAgICAgaXQ6ICdTZWxlemlvbmEgdW5vIFN0YXRvJyxcbiAgICAgICAgamE6ICflt57jgpLpgbjmip4nLFxuICAgICAgICAncm8tUk8nOiAnU2VsZWN0ZWF6YSB1biBzdGF0JyxcbiAgICAgICAgYXI6ICfYrdiv2K8g2YjZhNin2YrYqScsXG4gICAgICAgIGNhOiAnU2VsZWNjaW9uZXUgdW4gZXN0YXQnLFxuICAgICAgICAnY3MtQ1onOiAnVnliZXJ0ZSBzdMOhdCcsXG4gICAgICAgICdkYS1ESyc6ICdWw6ZsZyBlbiBzdGF0JyxcbiAgICAgICAgZWw6ICfOlc+AzrnOu86tzr7PhM61IM68zrnOsSDPgM6/zrvOuc+EzrXOr86xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckj+CklSDgpLDgpL7gpJzgpY3gpK8g4KSV4KS+IOCkmuCkr+CkqCDgpJXgpLDgpYfgpIInLFxuICAgICAgICAna28tS1InOiAn7KO8IOyEoO2DnScsXG4gICAgICAgICdsYi1MVSc6ICdXaWVsdCBlIFN0YWF0JyxcbiAgICAgICAgJ25sLU5MJzogJ1NlbGVjdGVlciBlZW4gc3RhYXQnLFxuICAgICAgICAncHQtUFQnOiAnU2VsZWNpb25lIHVtIEVzdGFkbycsXG4gICAgICAgICdydS1SVSc6ICfQktGL0LHQtdGA0LjRgtC1INGI0YLQsNGCJyxcbiAgICAgICAgJ3NsLVNJJzogJ0l6YmVyaXRlIGRyxb5hdm8nLFxuICAgICAgICAnc3YtU0UnOiAnVsOkbGogZW4gc3RhdCcsXG4gICAgICAgIHRoOiAn4LmA4Lil4Li34Lit4LiB4Lij4Lix4LiQJyxcbiAgICAgICAgdWs6ICfQktC40LHQtdGA0ZbRgtGMINGI0YLQsNGCJyxcbiAgICAgICAgJ3poLUNOJzogJ+mAieaLqeS4gOS4quW3nicsXG4gICAgICAgICd6aC1UVyc6ICfpgbjmk4fkuIDlgIvlt54nXG4gICAgfSxcbiAgICBjb3VudHk6IHtcbiAgICAgICAgJ2RlLURFJzogJ0JlemlyaycsXG4gICAgICAgICdlbi1VUyc6ICdDb3VudHknLFxuICAgICAgICAnZXMtRVMnOiAnQ29uZGFkbycsXG4gICAgICAgIGZyOiAnQ29tdMOpJyxcbiAgICAgICAgaXQ6ICdDb250ZWEnLFxuICAgICAgICBqYTogJ+mDoScsXG4gICAgICAgICdyby1STyc6ICdKdWRlyJt1bCcsXG4gICAgICAgIGFyOiAn2YXZgtin2LfYudipJyxcbiAgICAgICAgY2E6ICdjb210YXQnLFxuICAgICAgICAnY3MtQ1onOiAnb2tyZXMnLFxuICAgICAgICAnZGEtREsnOiAnQW10JyxcbiAgICAgICAgZWw6ICfOms6/zrzOt8+EzrXOr86xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCkvuCkieCkguCkn+ClgCcsXG4gICAgICAgICdrby1LUic6ICfqtbAnLFxuICAgICAgICAnbGItTFUnOiAnR3JvZnNjaGFmdCcsXG4gICAgICAgICdubC1OTCc6ICdkaXN0cmljdCcsXG4gICAgICAgICdwdC1QVCc6ICdjb25kYWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9C+0LrRgNGD0LMnLFxuICAgICAgICAnc2wtU0knOiAnT2tyb8W+amUnLFxuICAgICAgICAnc3YtU0UnOiAnR3JldnNrYXAnLFxuICAgICAgICB0aDogJ+C5gOC4guC4lScsXG4gICAgICAgIHVrOiAn0J/QvtCy0ZbRgicsXG4gICAgICAgICd6aC1DTic6ICfljr8nLFxuICAgICAgICAnemgtVFcnOiAn57ijJ1xuICAgIH0sXG4gICAgY291bnRyeToge1xuICAgICAgICAnZGUtREUnOiAnV8OkaGxlbiBTaWUgZWluIExhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnU2VsZWN0IGEgY291bnRyeScsXG4gICAgICAgICdlcy1FUyc6ICdTZWxlY2Npb25lIHVuIHBhw61zJyxcbiAgICAgICAgZnI6ICdQYXlzJyxcbiAgICAgICAgaXQ6ICdTZWxlemlvbmEgdW4gcGFlc2UnLFxuICAgICAgICBqYTogJ+WbvScsXG4gICAgICAgICdyby1STyc6ICdTZWxlY3RlYXphIG8gdGFyYScsXG4gICAgICAgIGFyOiAn2KfYrtiq2LEg2K/ZiNmE2KknLFxuICAgICAgICBjYTogJ1NlbGVjY2lvbmV1IHVuIHBhw61zJyxcbiAgICAgICAgJ2NzLUNaJzogJ1Z5YmVyIHplbWknLFxuICAgICAgICAnZGEtREsnOiAnVsOmbGcgZXQgbGFuZCcsXG4gICAgICAgIGVsOiAnzpXPgM65zrvOrc6+z4TOtSDPh8+Oz4HOsScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpYvgpIgg4KSm4KWH4KS2IOCkmuClgeCkqOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfqta3qsIDrpbwg6rOg66W07IucIOyYpCcsXG4gICAgICAgICdsYi1MVSc6ICdXaWVsdCBlIExhbmQnLFxuICAgICAgICAnbmwtTkwnOiAnU2VsZWN0ZWVyIGVlbiBsYW5kJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbGVjaW9uZSB1bSBwYWlzJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0YvQsdC10YDQuNGC0LUg0YHRgtGA0LDQvdGDJyxcbiAgICAgICAgJ3NsLVNJJzogJ0l6YmVyaXRlIGRyxb5hdm8nLFxuICAgICAgICAnc3YtU0UnOiAnVsOkbGogZXR0IGxhbmQnLFxuICAgICAgICB0aDogJ+C5gOC4peC4t+C4reC4geC4m+C4o+C4sOC5gOC4l+C4qCcsXG4gICAgICAgIHVrOiAn0JLQuNCx0LXRgNGW0YLRjCDQutGA0LDRl9C90YMnLFxuICAgICAgICAnemgtQ04nOiAn6YCJ5oup5LiA5Liq5Zu95a62JyxcbiAgICAgICAgJ3poLVRXJzogJ+mBuOaTh+S4gOWAi+Wci+WutidcbiAgICB9LFxuICAgICdjb3VudHJ5LWxhYmVsJzoge1xuICAgICAgICAnZGUtREUnOiAnTGFuZCcsXG4gICAgICAgICdlbi1VUyc6ICdDb3VudHJ5JyxcbiAgICAgICAgJ2VzLUVTJzogJ1Bhw61zJyxcbiAgICAgICAgZnI6ICdQYXlzJyxcbiAgICAgICAgaXQ6ICdOYXppb25lJyxcbiAgICAgICAgamE6ICflm70nLFxuICAgICAgICAncm8tUk8nOiAnyJphcsSDJyxcbiAgICAgICAgYXI6ICfYr9mI2YTYqScsXG4gICAgICAgIGNhOiAnUGHDrXMnLFxuICAgICAgICAnY3MtQ1onOiAnWmVtxJsnLFxuICAgICAgICBlbDogJ86nz47Pgc6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkpuClh+CkticsXG4gICAgICAgICdrby1LUic6ICfqta3qsIAnLFxuICAgICAgICAnbGItTFUnOiAnTGFuZCcsXG4gICAgICAgICdubC1OTCc6ICdMYW5kJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Bhw61zJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ch0YLRgNCw0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdEcsW+YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0xhbmQnLFxuICAgICAgICB0aDogJ+C4m+C4o+C4sOC5gOC4l+C4qCcsXG4gICAgICAgIHVrOiAn0JrRgNCw0ZfQvdCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+WbveWuticsXG4gICAgICAgICd6aC1UVyc6ICflnIvlrrYnXG4gICAgfSxcbiAgICAnb3JkZXItbm90ZXMnOiB7XG4gICAgICAgICdkZS1ERSc6ICdCZXN0ZWxsbm90aXplbiAob3B0aW9uYWwpOicsXG4gICAgICAgICdlbi1VUyc6ICdPcmRlciBub3RlcyAob3B0aW9uYWwpOicsXG4gICAgICAgICdlcy1FUyc6ICdOb3RhcyBkZSBwZWRpZG8gb3BjaW9uYWw6JyxcbiAgICAgICAgZnI6ICdOb3RlcyBkZSBjb21tYW5kZSAoZmFjdWx0YXRpZik6JyxcbiAgICAgICAgaXQ6ICdOb3RlIGRlbGxcXCdvcmRpbmUgKG9wemlvbmFsZSk6JyxcbiAgICAgICAgamE6ICfms6jmlofjg6Hjg6LvvIjjgqrjg5fjgrfjg6fjg7MpOicsXG4gICAgICAgICdyby1STyc6ICdOb3RlIGRlIGNvbWFuZMSDIChvcMibaW9uYWwpOicsXG4gICAgICAgIGFyOiAn2YXZhNin2K3YuNin2Kog2KfZhNi32YTYqCAo2KfYrtiq2YrYp9ix2YopOicsXG4gICAgICAgIGNhOiAnbm90ZXMgZGUgY29tYW5kYSAob3BjaW9uYWwpOicsXG4gICAgICAgICdjcy1DWic6ICdwb3puw6Fta3kgayBvYmplZG7DoXZjZSAodm9saXRlbG7DqSk6JyxcbiAgICAgICAgZWw6ICfPg863zrzOtc65z47Pg861zrnPgiDPgM6xz4HOsc6zzrPOtc67zq/Osc+CICjPgM+Bzr/Osc65z4HOtc+EzrnOus+MKTonLFxuICAgICAgICAnaGktSU4nOiAn4KSG4KSm4KWH4KS2IOCkqOCli+Ckn+CljeCkuCAo4KS14KWI4KSV4KSy4KWN4KSq4KS/4KSVKTonLFxuICAgICAgICAna28tS1InOiAn7KO866y4IOuplOuqqCjshKDtg50g7IKs7ZWtKTonLFxuICAgICAgICAnbGItTFUnOiAnQmVzdGVsbHVuZ3Nub3RpemVuIChvcHRpb25hbCk6JyxcbiAgICAgICAgJ25sLU5MJzogJ2Jlc3RlbG5vdGl0aWVzIChvcHRpb25lZWwpOicsXG4gICAgICAgICdwdC1QVCc6ICdub3RhcyBkbyBwZWRpZG8gKG9wY2lvbmFsKTonLFxuICAgICAgICAncnUtUlUnOiAn0L/RgNC40LzQtdGH0LDQvdC40Y8g0Log0LfQsNC60LDQt9GDICjQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3Qvik6ICcsXG4gICAgICAgICdzbC1TSSc6ICdvcG9tYmUgbyBuYXJvxI1pbHUgKG5lb2J2ZXpubyk6ICcsXG4gICAgICAgICdzdi1TRSc6ICdiZXN0w6RsbG5pbmdzYW50ZWNrbmluZ2FyICh2YWxmcml0dCk6JyxcbiAgICAgICAgdGg6ICfguKvguKHguLLguKLguYDguKvguJXguLjguIHguLLguKPguKrguLHguYjguIfguIvguLfguYnguK0gKOC5hOC4oeC5iOC4muC4seC4h+C4hOC4seC4mik6JyxcbiAgICAgICAgdWs6ICfQv9GA0LjQvNGW0YLQutC4INC00L4g0LfQsNC80L7QstC70LXQvdC90Y8gKNC90LXQvtCx0L7QslxcJ9GP0LfQutC+0LLQviknLFxuICAgICAgICAnemgtQ04nOiAn6K6i5Y2V5aSH5rOo77yI5Y+v6YCJ77yJOicsXG4gICAgICAgICd6aC1UVyc6ICfoqILllq7lgpnoqLvvvIjlj6/pgbjvvIk6XCInXG4gICAgfSxcbiAgICAnc29tZXRoaW5nLXdlbnQtd3JvbmcnOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcyBpc3QgZWluIEZlaGxlciBhdWZnZXRyZXRlbiwgYWJlciBkaWUgWmFobHVuZyB3dXJkZSBtw7ZnbGljaGVyd2Vpc2UgZ2VsZWlzdGV0LiBCaXR0ZSDDvGJlcnByw7xmZW4gU2llIGRpZXMsIGJldm9yIFNpZSBlaW5lIHdlaXRlcmUgQmVzdGVsbHVuZyBhdWZnZWJlbi4nLFxuICAgICAgICAnZW4tVVMnOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIGJ1dCB0aGUgcGF5bWVudCBtYXkgaGF2ZSBiZWVuIG1hZGUuIFBsZWFzZSBjaGVjayBiZWZvcmUgcGxhY2luZyBhbm90aGVyIG9yZGVyLicsXG4gICAgICAgICdlcy1FUyc6ICdTZSBwcm9kdWpvIHVuIGVycm9yLCBwZXJvIGVzIHBvc2libGUgcXVlIHNlIGhheWEgcmVhbGl6YWRvIGVsIHBhZ28uIFZlcmlmaXF1ZSBhbnRlcyBkZSByZWFsaXphciBvdHJvIHBlZGlkby4nLFxuICAgICAgICBmcjogJ1VuZSBlcnJldXIgc1xcJ2VzdCBwcm9kdWl0ZSwgbWFpcyBsZSBwYWllbWVudCBhIHBldXQtw6p0cmUgw6l0w6kgZWZmZWN0dcOpLiBWZXVpbGxleiB2w6lyaWZpZXIgYXZhbnQgZGUgcGFzc2VyIHVuZSBhdXRyZSBjb21tYW5kZS4nLFxuICAgICAgICBpdDogJ1F1YWxjb3NhIMOoIGFuZGF0byBzdG9ydG8sIG1hIGlsIHBhZ2FtZW50byBwb3RyZWJiZSBlc3NlcmUgc3RhdG8gZWZmZXR0dWF0by4gU2kgcHJlZ2EgZGkgY29udHJvbGxhcmUgcHJpbWEgZGkgZWZmZXR0dWFyZSB1biBhbHRybyBvcmRpbmUuJyxcbiAgICAgICAgamE6ICfkvZXjgYvllY/poYzjgYznmbrnlJ/jgZfjgb7jgZfjgZ/jgYzjgIHmlK/miZXjgYTjgYzooYzjgo/jgozjgZ/lj6/og73mgKfjgYzjgYLjgorjgb7jgZnjgIIg5Yil44Gu5rOo5paH44KS44GZ44KL5YmN44Gr56K66KqN44GX44Gm44GP44Gg44GV44GE44CCJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NldmEgbnUgYSBmdW5jyJtpb25hdCBjb3JlY3QsIGRhciBlc3RlIHBvc2liaWwgY2EgcGxhdGEgc8SDIGZpIGZvc3QgZWZlY3R1YXTEgy4gVsSDIHJ1Z8SDbSBzxIMgdmVyaWZpY2HIm2kgw65uYWludGUgZGUgYSBwbGFzYSBvIGFsdMSDIGNvbWFuZMSDLicsXG4gICAgICAgIGFyOiAn2K3Yr9irINiu2LfYoyDZhdinINiMINmI2YTZg9mGINix2KjZhdinINiq2YUg2KfZhNiz2K/Yp9ivLiDZitix2KzZiSDYp9mE2KrYrdmC2YIg2YLYqNmEINiq2YLYr9mK2YUg2LfZhNioINii2K7YsS4nLFxuICAgICAgICBjYTogJ1NcXCdoYSBwcm9kdcOvdCB1biBlcnJvciwgcGVyw7Igw6lzIHBvc3NpYmxlIHF1ZSBzXFwnaGFnaSBlZmVjdHVhdCBlbCBwYWdhbWVudC4gQ29tcHJvdmV1LWhvIGFiYW5zIGRlIGZlciB1bmEgYWx0cmEgY29tYW5kYS4nLFxuICAgICAgICAnY3MtQ1onOiAnTsSbY28gc2UgcG9rYXppbG8sIGFsZSBwbGF0YmEgbW/Fvm7DoSBieWxhIHByb3ZlZGVuYS4gUMWZZWQgemFkw6Fuw61tIGRhbMWhw60gb2JqZWRuw6F2a3kgcHJvc8OtbSB6a29udHJvbHVqdGUuJyxcbiAgICAgICAgJ2RhLURLJzogJ05vZ2V0IGdpayBnYWx0LCBtZW4gYmV0YWxpbmdlbiBrYW4gdsOmcmUgZm9yZXRhZ2V0LiBLb250cm9sbGVyIHZlbmxpZ3N0LCBmw7hyIGR1IGFmZ2l2ZXIgZW4gYW5kZW4gb3JkcmUuJyxcbiAgICAgICAgZWw6ICfOms6sz4TOuSDPgM6uzrPOtSDPg8+Ez4HOsc6yzqwsIM6xzrvOu86sIM63IM+AzrvOt8+Bz4nOvM6uIM68z4DOv8+BzrXOryDOvc6xIM6tz4fOtc65IM6zzq/Ovc61zrkuIM6gzrHPgc6xzrrOsc67z44gzrXOu86tzrPOvs+EzrUgz4DPgc65zr0gzrrOrM69zrXPhM61IM6szrvOu863IM+AzrHPgc6xzrPOs861zrvOr86xLicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpYHgpJsg4KSX4KSy4KSkIOCkueClgeCkhiwg4KSy4KWH4KSV4KS/4KSoIOCkueCliyDgpLjgpJXgpKTgpL4g4KS54KWIIOCkleCkvyDgpK3gpYHgpJfgpKTgpL7gpKgg4KS54KWLIOCkl+Ckr+CkviDgpLngpYsuIOCkleClg+CkquCkr+CkviDgpI/gpJUg4KSU4KSwIOCkhuCkpuClh+CktiDgpKbgpYfgpKjgpYcg4KS44KWHIOCkquCkueCksuClhyDgpJzgpL7gpILgpJog4KSy4KWH4KSC4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+usuOygnOqwgCDrsJzsg53tlojsp4Drp4wg6rKw7KCc6rCAIOyZhOujjOuQmOyXiOydhCDsiJgg7J6I7Iq164uI64ukLiDri6Trpbgg7KO866y47J2EIO2VmOq4sCDsoITsl5Ag7ZmV7J247ZWY7Iuc6riwIOuwlOuejeuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRXBwZXMgYXNzIGZhbHNjaCBnYWFuZywgYXdlciBkXFwnQmV6dWVsdW5nIGFzcyB2bMOkaWNodCBnZW1hYWNoIGdpbm4uIFByw6lpZnQgdy5lLmcuIGllciBEaXIgZW5nIGFuZXIgQmVzdGVsbHVuZyBwbGF6w6lpZXJ0LicsXG4gICAgICAgICdubC1OTCc6ICdFciBpcyBpZXRzIG1pc2dlZ2FhbiwgbWFhciBkZSBiZXRhbGluZyBrYW4gemlqbiBnZWRhYW4uIENvbnRyb2xlZXIgZGl0IHZvb3JkYXQgdSBlZW4gbmlldXdlIGJlc3RlbGxpbmcgcGxhYXRzdC4nLFxuICAgICAgICAncHQtUFQnOiAnQWxnbyBkZXUgZXJyYWRvLCBtYXMgbyBwYWdhbWVudG8gcG9kZSB0ZXIgc2lkbyBmZWl0by4gUG9yIGZhdm9yLCB2ZXJpZmlxdWUgYW50ZXMgZGUgZmF6ZXIgb3V0cm8gcGVkaWRvLicsXG4gICAgICAgICdydS1SVSc6ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LCDQvdC+INC+0L/Qu9Cw0YLQsCDQvNC+0LPQu9CwINCx0YvRgtGMINC/0YDQvtC40LfQstC10LTQtdC90LAuINCf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/QtdGA0LXQtCDRgNCw0LfQvNC10YnQtdC90LjQtdC8INC00YDRg9Cz0L7Qs9C+INC30LDQutCw0LfQsC4nLFxuICAgICAgICAnc2wtU0knOiAnTmVrYWogamUgxaFsbyBuYXJvYmUsIG1vcmRhIHBhIGplIGJpbG8gcGxhxI1pbG8gaXp2ZWRlbm8uIFByZWRlbiBvZGRhdGUgbm92byBuYXJvxI1pbG8sIHByZXZlcml0ZS4nLFxuICAgICAgICAnc3YtU0UnOiAnTsOlZ290IGdpY2sgZmVsLCBtZW4gYmV0YWxuaW5nZW4ga2FuIGhhIGdqb3J0cy4gS29udHJvbGxlcmEgaW5uYW4gZHUgZ8O2ciBlbiBhbm5hbiBiZXN0w6RsbG5pbmcuJyxcbiAgICAgICAgdGg6ICfguKHguLXguJrguLLguIfguK3guKLguYjguLLguIfguJzguLTguJTguJ7guKXguLLguJQg4LmB4LiV4LmI4Lit4Liy4LiI4Lih4Li14LiB4Liy4Lij4LiK4Liz4Lij4Liw4LmA4LiH4Li04LiZ4LmB4Lil4LmJ4LinIOC5guC4m+C4o+C4lOC4leC4o+C4p+C4iOC4quC4reC4muC4geC5iOC4reC4meC4l+C4s+C4geC4suC4o+C4quC4seC5iOC4h+C4i+C4t+C5ieC4reC4reC4t+C5iOC4mScsXG4gICAgICAgIHVrOiAn0KnQvtGB0Ywg0L/RltGI0LvQviDQvdC1INGC0LDQuiwg0LDQu9C1INC+0L/Qu9Cw0YLQsCwg0LzQvtC20LvQuNCy0L4sINCx0YPQu9CwINC30LTRltC50YHQvdC10L3QsC4g0JHRg9C00Ywg0LvQsNGB0LrQsCwg0L/QtdGA0LXQstGW0YDRgtC1LCDQv9C10YDRiCDQvdGW0LYg0YDQvtCx0LjRgtC4INGW0L3RiNC1INC30LDQvNC+0LLQu9C10L3QvdGPLicsXG4gICAgICAgICd6aC1DTic6ICflh7rkuobngrnpl67popjvvIzkvYblj6/og73lt7Lku5jmrL7jgIIg6K+35Zyo5LiL5Y+m5LiA5Liq6K6i5Y2V5LmL5YmN5qOA5p+l44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+WHuuS6hum7nuWVj+mhjO+8jOS9huWPr+iDveW3suS7mOasvuOAgiDoq4vlnKjkuIvlj6bkuIDlgIvoqILllq7kuYvliY3mqqLmn6XjgIInXG4gICAgfSxcbiAgICAnc29tZXRoaW5nLXdlbnQtd3Jvbmctb3JkZXInOiB7XG4gICAgICAgICdkZS1ERSc6ICdFdHdhcyBpc3Qgc2NoaWVmIGdlbGF1ZmVuLCBhYmVyIGtlaW5lIFNvcmdlLiBXaXIgaGFiZW4gSWhyZSBCZXN0ZWxsZGF0ZW4gdW5kIElocmUgWmFobHVuZyBpc3QgZXJmb2xndC4gRWluZSB3ZWl0ZXJlIEJlc3RlbGx1bmcgaXN0IG5pY2h0IGVyZm9yZGVybGljaC4nLFxuICAgICAgICAnZW4tVVMnOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIGJ1dCBkb25cXCd0IHdvcnJ5LiBXZSBoYXZlIHlvdXIgb3JkZXIgZGV0YWlscywgYW5kIHlvdXIgcGF5bWVudCBoYXMgYmVlbiBtYWRlLiBUaGVyZSBpcyBubyBuZWVkIHRvIHBsYWNlIGFub3RoZXIgb3JkZXIuJyxcbiAgICAgICAgJ2VzLUVTJzogJ0FsZ28gc2FsacOzIG1hbCwgcGVybyBubyBzZSBwcmVvY3VwZS4gVGVuZW1vcyBsb3MgZGV0YWxsZXMgZGUgc3UgcGVkaWRvIHkgc3UgcGFnbyBzZSBoYSByZWFsaXphZG8uIE5vIGVzIG5lY2VzYXJpbyByZWFsaXphciBvdHJvIHBlZGlkby4nLFxuICAgICAgICBmcjogJ1F1ZWxxdWUgY2hvc2Ugc1xcJ2VzdCBtYWwgcGFzc8OpLCBtYWlzIG5lIHZvdXMgaW5xdWnDqXRleiBwYXMuIE5vdXMgYXZvbnMgbGVzIGTDqXRhaWxzIGRlIHZvdHJlIGNvbW1hbmRlIGV0IHZvdHJlIHBhaWVtZW50IGEgw6l0w6kgZWZmZWN0dcOpLiBJbCBuXFwnZXN0IHBhcyBuw6ljZXNzYWlyZSBkZSBwYXNzZXIgdW5lIGF1dHJlIGNvbW1hbmRlLicsXG4gICAgICAgIGl0OiAnUXVhbGNvc2Egw6ggYW5kYXRvIHN0b3J0bywgbWEgbm9uIHByZW9jY3VwYXJ0aS4gQWJiaWFtbyBpIGRldHRhZ2xpIGRlbCB0dW8gb3JkaW5lIGUgaWwgcGFnYW1lbnRvIMOoIHN0YXRvIGVmZmV0dHVhdG8uIE5vbiDDqCBuZWNlc3NhcmlvIGVmZmV0dHVhcmUgdW4gYWx0cm8gb3JkaW5lLicsXG4gICAgICAgIGphOiAn5L2V44GL5ZWP6aGM44GM55m655Sf44GX44G+44GX44Gf44GM44CB5b+D6YWN44GX44Gq44GE44Gn44GP44Gg44GV44GE44CCIOOBlOazqOaWh+OBruips+e0sOOBjOOBguOCiuOAgeOBiuaUr+aJleOBhOOBjOWujOS6huOBl+OBvuOBl+OBn+OAgiDliKXjga7ms6jmlofjgpLjgZnjgovlv4XopoHjga/jgYLjgorjgb7jgZvjgpPjgIInLFxuICAgICAgICAncm8tUk8nOiAnQ2V2YSBhIG1lcnMgcHJvc3QsIGRhciBudSB2xIMgZmFjZcibaSBncmlqaS4gQXZlbSBkZXRhbGlpbGUgY29tZW56aWkgZHZzLiDImWkgcGxhdGEgZHZzLiBhIGZvc3QgZWZlY3R1YXTEgy4gTnUgZXN0ZSBuZXZvaWUgc8SDIHBsYXNhyJtpIG8gYWx0xIMgY29tYW5kxIMuJyxcbiAgICAgICAgYXI6ICfYrdiv2Ksg2K7Yt9ijINmF2Kcg2Iwg2YTZg9mGINmE2Kcg2KrZgtmE2YIuINmE2K/ZitmG2Kcg2KrZgdin2LXZitmEINi32YTYqNmDINiMINmI2YLYryDYqtmFINiz2K/Yp9ivINiv2YHYudiq2YMuINmE2YrYs9iqINmH2YbYp9mDINit2KfYrNipINmE2KrZgtiv2YrZhSDYt9mE2Kgg2KLYrtixLicsXG4gICAgICAgIGNhOiAnU1xcJ2hhIHByb2R1w690IHVuIGVycm9yLCBwZXLDsiBubyB1cyBwcmVvY3VwZXUuIFRlbmltIGxlcyBkYWRlcyBkZSBsYSB2b3N0cmEgY29tYW5kYSBpIHPigJloYSBlZmVjdHVhdCBlbCBwYWdhbWVudC4gTm8gY2FsIGZlciB1bmEgYWx0cmEgY29tYW5kYS4nLFxuICAgICAgICAnY3MtQ1onOiAnTsSbY28gc2UgcG9rYXppbG8sIGFsZSBuZWJvanRlIHNlLiBNw6FtZSBwb2Ryb2Jub3N0aSBvIHZhxaHDrSBvYmplZG7DoXZjZSBhIHZhxaFlIHBsYXRiYSBieWxhIHByb3ZlZGVuYS4gTmVuw60gdMWZZWJhIHphZMOhdmF0IGRhbMWhw60gb2JqZWRuw6F2a3UuJyxcbiAgICAgICAgJ2RhLURLJzogJ05vZ2V0IGdpayBnYWx0LCBtZW4gYmFyZSByb2xpZy4gVmkgaGFyIGRpbmUgb3JkcmVvcGx5c25pbmdlciwgb2cgZGluIGJldGFsaW5nIGVyIGZvcmV0YWdldC4gRGV0IGVyIGlra2UgbsO4ZHZlbmRpZ3QgYXQgYWZnaXZlIGVuIGFuZGVuIG9yZHJlLicsXG4gICAgICAgIGVsOiAnzprOrM+Ezrkgz4DOrs6zzrUgz4PPhM+BzrHOss6sLCDOsc67zrvOrCDOvM63zr0gzrHOvc63z4PPhc+HzrXOr8+EzrUuIM6Iz4fOv8+FzrzOtSDPhM6xIM+Dz4TOv865z4fOtc6vzrEgz4TOt8+CIM+AzrHPgc6xzrPOs861zrvOr86xz4Igz4POsc+CIM66zrHOuSDOtyDPgM67zrfPgc+JzrzOriDPg86xz4Igzq3Ph861zrkgz4DPgc6xzrPOvM6xz4TOv8+Azr/Ouc63zrjOtc6vLiDOlM61zr0gz4fPgc61zrnOrM62zrXPhM6xzrkgzr3OsSDOus6szr3Otc+EzrUgzqzOu867zrcgz4DOsc+BzrHOs86zzrXOu86vzrEuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleClgeCkmyDgpJfgpLLgpKQg4KS54KWLIOCkl+Ckr+Ckviwg4KSy4KWH4KSV4KS/4KSoIOCkmuCkv+CkguCkpOCkviDgpKgg4KSV4KSw4KWH4KSC4KWkIOCkueCkruCkvuCksOClhyDgpKrgpL7gpLgg4KSG4KSq4KSV4KWHIOCkhuCkpuClh+CktiDgpJXgpL4g4KS14KS/4KS14KSw4KSjIOCkueCliCwg4KSU4KSwIOCkhuCkquCkleCkviDgpK3gpYHgpJfgpKTgpL7gpKgg4KSV4KSwIOCkpuCkv+Ckr+CkviDgpJfgpK/gpL4g4KS54KWI4KWkIOCkpuClguCkuOCksOCkviDgpIbgpKbgpYfgpLYg4KSm4KWH4KSo4KWHIOCkleClgCDgpJXgpYvgpIgg4KSG4KS14KS24KWN4KSv4KSV4KSk4KS+IOCkqOCkueClgOCkgiDgpLngpYjgpaQnLFxuICAgICAgICAna28tS1InOiAn66y47KCc6rCAIOuwnOyDne2WiOyngOunjCDqsbHsoJXtlZjsp4Ag66eI7IS47JqULiDso7zrrLgg7IS467aA7KCV67O06rCAIOyeiOycvOupsCDqsrDsoJzqsIAg7JmE66OM65CY7JeI7Iq164uI64ukLiDri6Trpbgg7KO866y47J2EIO2VoCDtlYTsmpTqsIAg7JeG7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdFcHBlcyBhc3MgZmFsc2NoIGdhYW5nLCBhd2VyIG1hYWNoIGRlciBrZW5nIFN1ZXJnZW4uIE1pciBodW5uIMOEciBCZXN0ZWxsdW5nc2RldGFpbGVyLCBhbiDDhHIgQmV6dWVsdW5nIGdvdWYgZ2VtYWFjaC4gRXQgYXNzIG5ldCBuw6lpZGVnIGVuZyBhbmVyIEJlc3RlbGx1bmcgemUgbWFhY2hlbi4nLFxuICAgICAgICAnbmwtTkwnOiAnRXIgaXMgaWV0cyBtaXNnZWdhYW4sIG1hYXIgbWFhayBqZSBnZWVuIHpvcmdlbi4gV2UgaGViYmVuIHV3IGJlc3RlbGdlZ2V2ZW5zIGVuIHV3IGJldGFsaW5nIGlzIGdlZGFhbi4gSGV0IGlzIG5pZXQgbm9kaWcgb20gbm9nIGVlbiBiZXN0ZWxsaW5nIHRlIHBsYWF0c2VuLicsXG4gICAgICAgICdwdC1QVCc6ICdBbGdvIGRldSBlcnJhZG8sIG1hcyBuw6NvIHNlIHByZW9jdXBlLiBUZW1vcyBvcyBkZXRhbGhlcyBkbyBzZXUgcGVkaWRvIGUgc2V1IHBhZ2FtZW50byBmb2kgZWZldHVhZG8uIE7Do28gaMOhIG5lY2Vzc2lkYWRlIGRlIGZhemVyIG91dHJvIHBlZGlkby4nLFxuICAgICAgICAncnUtUlUnOiAn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0L3QviDQvdC1INCy0L7Qu9C90YPQudGC0LXRgdGMLiDQoyDQvdCw0YEg0LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC+INCy0LDRiNC10Lwg0LfQsNC60LDQt9C1LCDQuCDQstCw0Ygg0L/Qu9Cw0YLQtdC2INCx0YvQuyDQv9GA0L7QuNC30LLQtdC00LXQvS4g0J7Rh9C10YDQtdC00L3QvtC5INC30LDQutCw0Lcg0LTQtdC70LDRgtGMINC90LUg0L3Rg9C20L3Qvi4nLFxuICAgICAgICAnc2wtU0knOiAnTmVrYWogamUgxaFsbyBuYXJvYmUsIHZlbmRhciBuZSBza3JiaXRlLiBQb2RhdGtlIG8gbmFyb8SNaWx1IGltYW1vIGluIHBsYcSNaWxvIGplIGJpbG8gb3ByYXZsamVuby4gRHJ1Z2VnYSBuYXJvxI1pbGEgbmkgdHJlYmEgb2RkYXRpLicsXG4gICAgICAgICdzdi1TRSc6ICdOw6Vnb3QgZ2ljayBmZWwsIG1lbiBvcm9hIGRpZyBpbnRlLiBWaSBoYXIgZGluYSBiZXN0w6RsbG5pbmdzdXBwZ2lmdGVyIG9jaCBkaW4gYmV0YWxuaW5nIGhhciBnam9ydHMuIERldCBmaW5ucyBpbmdlbiBhbmxlZG5pbmcgYXR0IGfDtnJhIGVuIGFubmFuIGJlc3TDpGxsbmluZy4nLFxuICAgICAgICB0aDogJ+C4oeC4teC4muC4suC4h+C4reC4ouC5iOC4suC4h+C4nOC4tOC4lOC4nuC4peC4suC4lCDguYHguJXguYjguYTguKHguYjguJXguYnguK3guIfguIHguLHguIfguKfguKUg4LmA4Lij4Liy4Lih4Li14Lij4Liy4Lii4Lil4Liw4LmA4Lit4Li14Lii4LiU4LiB4Liy4Lij4Liq4Lix4LmI4LiH4LiL4Li34LmJ4Lit4LiC4Lit4LiH4LiE4Li44LiT4LmB4Lil4Liw4LiK4Liz4Lij4Liw4LmA4LiH4Li04LiZ4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4Lii4LmB4Lil4LmJ4LinIOC5hOC4oeC5iOC4iOC4s+C5gOC4m+C5h+C4meC4leC5ieC4reC4h+C4l+C4s+C4geC4suC4o+C4quC4seC5iOC4h+C4i+C4t+C5ieC4reC4reC4t+C5iOC4mScsXG4gICAgICAgIHVrOiAn0KnQvtGB0Ywg0L/RltGI0LvQviDQvdC1INGC0LDQuiwg0LDQu9C1INC90LUg0YXQstC40LvRjtC50YLQtdGB0YwuINCjINC90LDRgSDRlCDQtNCw0L3RliDQstCw0YjQvtCz0L4g0LfQsNC80L7QstC70LXQvdC90Y8sINGWINCy0LDRiCDQv9C70LDRgtGW0LYg0LfQtNGW0LnRgdC90LXQvdC+LiDQndC10LzQsNGUINC90LXQvtCx0YXRltC00L3QvtGB0YLRliDRgNC+0LHQuNGC0Lgg0ZbQvdGI0LUg0LfQsNC80L7QstC70LXQvdC90Y8uJyxcbiAgICAgICAgJ3poLUNOJzogJ+WHuuS6hueCuemXrumimO+8jOS9huWIq+aLheW/g+OAgiDmiJHku6zmnInmgqjnmoTorqLljZXor6bnu4bkv6Hmga/vvIzmgqjnmoTku5jmrL7lt7LlrozmiJDjgIIg5peg6ZyA5YaN5LiL6K6i5Y2V44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+WHuuS6hum7nuWVj+mhjO+8jOS9huWIpeaTlOW/g+OAgiDmiJHlgJHmnInmgqjnmoToqILllq7oqbPntLDkv6Hmga/vvIzmgqjnmoTku5jmrL7lt7LlrozmiJDjgIIg54Sh6ZyA5YaN5LiL6KiC5Zau44CCJ1xuICAgIH0sXG4gICAgJ2RlbGl2ZXJ5LWRhdGUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdMaWVmZXJ0ZXJtaW4nLFxuICAgICAgICAnZW4tVVMnOiAnRGVsaXZlcnkgZGF0ZScsXG4gICAgICAgICdlcy1FUyc6ICdGZWNoYSBkZSBlbnRyZWdhJyxcbiAgICAgICAgZnI6ICdEYXRlIGRlIGxpdnJhaXNvbicsXG4gICAgICAgIGl0OiAnRGF0YSBkaSBjb25zZWduYScsXG4gICAgICAgIGphOiAn6YWN6YCB5pelJyxcbiAgICAgICAgJ3JvLVJPJzogJ0RhdGEgbGl2csSDcmlpJyxcbiAgICAgICAgYXI6ICfYqtin2LHZitiuINin2YTYqtiz2YTZitmFINin2Ygg2KfZhNmI2LXZiNmEJyxcbiAgICAgICAgY2E6ICdEYXRhIGRlIGxsaXVyYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnRGF0dW0gZG9ydcSNZW7DrScsXG4gICAgICAgICdkYS1ESyc6ICdMZXZlcmluZ3NkYXRvJyxcbiAgICAgICAgZWw6ICfOl868zrXPgc6/zrzOt869zq/OsSDPgM6xz4HOrM60zr/Pg863z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSh4KS/4KSy4KWA4KS14KSw4KWAIOCkleClgCDgpKTgpL7gpLDgpYDgpJYnLFxuICAgICAgICAna28tS1InOiAn67Cw7IahIOuCoOynnCcsXG4gICAgICAgICdsYi1MVSc6ICdMaXd3ZXJ1bmdzZGF0dW0nLFxuICAgICAgICAnbmwtTkwnOiAnQmV6b3JnZGF0dW0nLFxuICAgICAgICAncHQtUFQnOiAnRGF0YSBkZSBlbnRyZWdhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CU0LDRgtCwINC00L7RgdGC0LDQstC60LgnLFxuICAgICAgICAnc2wtU0knOiAnRGF0dW0gZG9zdGF2ZScsXG4gICAgICAgICdzdi1TRSc6ICdMZXZlcmFuc2RhdHVtJyxcbiAgICAgICAgdGg6ICfguKfguLHguJnguJfguLXguYjguIjguLHguJTguKrguYjguIcnLFxuICAgICAgICB1azogJ9CU0LDRgtCwINC00L7RgdGC0LDQstC60LgnLFxuICAgICAgICAnemgtQ04nOiAn6YKu5a+E5pel5pyfJyxcbiAgICAgICAgJ3poLVRXJzogJ+mDteWvhOaXpeacnydcbiAgICB9LFxuICAgICdmaXJzdC1yZW5ld2FsLWRhdGUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcnN0ZSBWZXJsw6RuZ2VydW5nJyxcbiAgICAgICAgJ2VuLVVTJzogJ0ZpcnN0IHJlbmV3YWwnLFxuICAgICAgICAnZXMtRVMnOiAnUHJpbWVyYSByZW5vdmFjacOzbicsXG4gICAgICAgIGZyOiAnUHJlbWllciByZW5vdXZlbGxlbWVudCcsXG4gICAgICAgIGl0OiAnUHJpbW8gUmlubm92bycsXG4gICAgICAgIGphOiAn5pyA5Yid44Gu5pu05pawJyxcbiAgICAgICAgJ3JvLVJPJzogJ1ByaW1hIHJlw65ubm9pcmUnLFxuICAgICAgICBhcjogJ9in2YTYqtis2K/ZitivINin2YTYo9mI2YQnLFxuICAgICAgICBjYTogJ1ByaW1lcmEgcmVub3ZhY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdQcnZuw60gb2Jub3ZhJyxcbiAgICAgICAgJ2RhLURLJzogJ0bDuHJzdGUgZm9ybnllbHNlJyxcbiAgICAgICAgZWw6ICfOoM+Bz47PhM63IM6xzr3Osc69zq3Pic+DzrcnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KS54KSy4KS+IOCkqOCkteClgOCkqOClgOCkleCksOCkoycsXG4gICAgICAgICdrby1LUic6ICfssqsg67KI7Ke4IOqwseyLoCcsXG4gICAgICAgICdsYi1MVSc6ICfDiWlzY2h0IEVybmVpZXJ1bmcnLFxuICAgICAgICAnbmwtTkwnOiAnRWVyc3RlIHZlcmxlbmdpbmcnLFxuICAgICAgICAncHQtUFQnOiAnUHJpbWVpcmEgcmVub3Zhw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0J/QtdGA0LLQvtC1INC+0LHQvdC+0LLQu9C10L3QuNC1JyxcbiAgICAgICAgJ3NsLVNJJzogJ1BydmEgb2Jub3ZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0bDtnJzdGEgZsO2cm55ZWxzZW4nLFxuICAgICAgICB0aDogJ+C4leC5iOC4reC4reC4suC4ouC4uOC4hOC4o+C4seC5ieC4h+C5geC4o+C4gScsXG4gICAgICAgIHVrOiAn0J/QtdGA0YjQtSDQvtC90L7QstC70LXQvdC90Y8nLFxuICAgICAgICAnemgtQ04nOiAn56ys5LiA5qyh57ut6K6iJyxcbiAgICAgICAgJ3poLVRXJzogJ+esrOS4gOasoee6jOiogidcbiAgICB9LFxuICAgICdzdWJzY3JpcHRpb24tc3VtbWFyeSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1dpZWRlcmtlaHJlbmRlIFN1bW1lJyxcbiAgICAgICAgJ2VuLVVTJzogJ1JlY3VycmluZyB0b3RhbCcsXG4gICAgICAgICdlcy1FUyc6ICdUb3RhbCByZWN1cnJlbnRlJyxcbiAgICAgICAgZnI6ICdUb3RhbCByw6ljdXJyZW50JyxcbiAgICAgICAgaXQ6ICdUb3RhbGUgcmljb3JyZW50ZScsXG4gICAgICAgIGphOiAn5a6a5pyf5ZCI6KiIJyxcbiAgICAgICAgJ3JvLVJPJzogJ1RvdGFsIHJlY3VyZW50JyxcbiAgICAgICAgYXI6ICfYp9mE2YXYrNmF2YjYuSDYp9mE2YXYqtmD2LHYsScsXG4gICAgICAgIGNhOiAnVG90YWwgcmVjdXJyZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ09wYWt1asOtY8OtIHNlIGNlbGtlbScsXG4gICAgICAgICdkYS1ESyc6ICdUaWxiYWdldmVuZGVuZGUgdG90YWwnLFxuICAgICAgICBlbDogJ86Vz4DOsc69zrHOu86xzrzOss6xzr3PjM68zrXOvc6/IM+Dz43Ovc6/zrvOvycsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpLXgpLDgpY3gpKTgpYAg4KSV4KWB4KSyJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwmOuztSDtlanqs4QnLFxuICAgICAgICAnbGItTFUnOiAnV2lkZGVyaHVlbGVuZCBUb3RhbCcsXG4gICAgICAgICdubC1OTCc6ICdUZXJ1Z2tlcmVuZCB0b3RhYWwnLFxuICAgICAgICAncHQtUFQnOiAnVG90YWwgcmVjb3JyZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQn9C+0LLRgtC+0YDRj9GO0YnQsNGP0YHRjyDRgdGD0LzQvNCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvbmF2bGpham/EjWUgc2Ugc2t1cGFqJyxcbiAgICAgICAgJ3N2LVNFJzogJ8OFdGVya29tbWFuZGUgdG90YWx0JyxcbiAgICAgICAgdGg6ICfguKLguK3guJTguKPguKfguKHguJfguLXguYjguYDguIHguLTguJTguIvguYnguLMnLFxuICAgICAgICB1azogJ9Cf0L7QstGC0L7RgNGO0LLQsNC90LAg0YHRg9C80LAnLFxuICAgICAgICAnemgtQ04nOiAn57uP5bi45oCn5oC76K6hJyxcbiAgICAgICAgJ3poLVRXJzogJ+e2k+W4uOaAp+e4veioiCdcbiAgICB9LFxuICAgICdpbml0aWFsLXN1bW1hcnknOiB7XG4gICAgICAgICdkZS1ERSc6ICdBbmZhbmdzc3VtbWUnLFxuICAgICAgICAnZW4tVVMnOiAnSW5pdGlhbCB0b3RhbCcsXG4gICAgICAgICdlcy1FUyc6ICdUb3RhbCBpbmljaWFsJyxcbiAgICAgICAgZnI6ICdUb3RhbCBpbml0aWFsJyxcbiAgICAgICAgaXQ6ICdUb3RhbGUgaW5pemlhbGUnLFxuICAgICAgICBqYTogJ+WIneacn+WQiOioiCcsXG4gICAgICAgICdyby1STyc6ICdUb3RhbCBpbmnIm2lhbCcsXG4gICAgICAgIGFyOiAn2KfZhNmF2KzZhdmI2Lkg2KfZhNij2YjZhNmKJyxcbiAgICAgICAgY2E6ICdUb3RhbCBpbmljaWFsJyxcbiAgICAgICAgJ2NzLUNaJzogJ1BvxI3DoXRlxI1uw60gY2Vsa2VtJyxcbiAgICAgICAgJ2RhLURLJzogJ0luZGxlZGVuZGUgdG90YWwnLFxuICAgICAgICBlbDogJ86Rz4HPh865zrrPjCDPg8+Nzr3Ov867zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS+4KSw4KSC4KSt4KS/4KSVIOCkleClgeCksicsXG4gICAgICAgICdrby1LUic6ICfstIjquLAg7ZWp6rOEJyxcbiAgICAgICAgJ2xiLUxVJzogJ1VmYW5rcyB0b3RhbCcsXG4gICAgICAgICdubC1OTCc6ICdJbml0aWVlbCB0b3RhYWwnLFxuICAgICAgICAncHQtUFQnOiAnVG90YWwgaW5pY2lhbCcsXG4gICAgICAgICdydS1SVSc6ICfQmNGB0YXQvtC00L3QsNGPINGB0YPQvNC80LAnLFxuICAgICAgICAnc2wtU0knOiAnWmHEjWV0bmkgc2XFoXRldmVrJyxcbiAgICAgICAgJ3N2LVNFJzogJ0luaXRpYWwgc3VtbWEnLFxuICAgICAgICB0aDogJ+C4ouC4reC4lOC4o+C4p+C4oeC5gOC4o+C4tOC5iOC4oeC4leC5ieC4mScsXG4gICAgICAgIHVrOiAn0J/QvtGH0LDRgtC60L7QstCwINGB0YPQvNCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+WIneWni+aAu+aVsCcsXG4gICAgICAgICd6aC1UVyc6ICfliJ3lp4vnuL3mlbgnXG4gICAgfSxcbiAgICAncmVjdXJyaW5nLXNoaXBwaW5nJzoge1xuICAgICAgICAnZGUtREUnOiAnV2llZGVya2VocmVuZGVyIFZlcnNhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnUmVjdXJyaW5nIHNoaXBwaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VudsOtb3MgcmVjdXJyZW50ZXMnLFxuICAgICAgICBmcjogJ0V4cMOpZGl0aW9uIHLDqWN1cnJlbnRlJyxcbiAgICAgICAgaXQ6ICdUb3RhbGUgaW5pemlhbGUnLFxuICAgICAgICBqYTogJ+Wumuacn+mFjemAgScsXG4gICAgICAgICdyby1STyc6ICdUb3RhbCBpbmnIm2lhbCcsXG4gICAgICAgIGFyOiAn2KfZhNi02K3ZhiDYp9mE2YXYqtmD2LHYsScsXG4gICAgICAgIGNhOiAnRW52aWFtZW50IHBlcmnDsmRpYycsXG4gICAgICAgICdjcy1DWic6ICdPcGFrb3ZhbsOhIGRvcHJhdmEnLFxuICAgICAgICAnZGEtREsnOiAnVGlsYmFnZXZlbmRlbmRlIGZvcnNlbmRlbHNlJyxcbiAgICAgICAgZWw6ICfOlc+AzrHOvc6xzrvOsc68zrLOsc69z4zOvM61zr3OtyDOsc+Azr/Pg8+Ezr/Ou86uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkteCksOCljeCkpOClgCDgpLbgpL/gpKrgpL/gpILgpJcnLFxuICAgICAgICAna28tS1InOiAn67CY67O1IOuwsOyGoScsXG4gICAgICAgICdsYi1MVSc6ICdXaWRkZXJodWVsZW5kIFZlcnNhbmQnLFxuICAgICAgICAnbmwtTkwnOiAnVGVydWdrZXJlbmRlIHZlcnplbmRpbmcnLFxuICAgICAgICAncHQtUFQnOiAnUmVtZXNzYSByZWNvcnJlbnRlJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LXRgNC40L7QtNC40YfQtdGB0LrQsNGPINC00L7RgdGC0LDQstC60LAnLFxuICAgICAgICAnc2wtU0knOiAnUG9uYXZsamFqb8SNYSBzZSBkb3N0YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ8OFdGVya29tbWFuZGUgZnJha3QnLFxuICAgICAgICB0aDogJ+C4quC5iOC4h+C4quC4tOC4meC4hOC5ieC4suC4m+C4o+C4sOC4iOC4sycsXG4gICAgICAgIHVrOiAn0J/QvtCy0YLQvtGA0L3QsCDQtNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+e7j+W4uOaAp+i/kOi+kycsXG4gICAgICAgICd6aC1UVyc6ICfntpPluLjmgKfpgYvovLgnXG4gICAgfSxcbiAgICAnaW5pdGlhbC1zaGlwcGluZyc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0Vyc3RlciBWZXJzYW5kJyxcbiAgICAgICAgJ2VuLVVTJzogJ0luaXRpYWwgc2hpcHBpbmcnLFxuICAgICAgICAnZXMtRVMnOiAnRW52w61vIGluaWNpYWwnLFxuICAgICAgICBmcjogJ0V4cMOpZGl0aW9uIGluaXRpYWxlJyxcbiAgICAgICAgaXQ6ICdTcGVkaXppb25lIGluaXppYWxlJyxcbiAgICAgICAgamE6ICfliJ3mnJ/nmbrpgIEnLFxuICAgICAgICAncm8tUk8nOiAnRXhwZWRpZXJlIGluacibaWFsxIMnLFxuICAgICAgICBhcjogJ9in2YTYtNit2YYg2KfZhNij2YjZhNmKJyxcbiAgICAgICAgY2E6ICdFbnZpYW1lbnQgaW5pY2lhbCcsXG4gICAgICAgICdjcy1DWic6ICdQb8SNw6F0ZcSNbsOtIG9kZXNsw6Fuw60nLFxuICAgICAgICAnZGEtREsnOiAnRsO4cnN0ZSBmb3JzZW5kZWxzZScsXG4gICAgICAgIGVsOiAnzpHPgc+HzrnOus6uIM6xz4DOv8+Dz4TOv867zq4nLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS+4KSw4KSC4KSt4KS/4KSVIOCktuCkv+CkquCkv+CkguCklycsXG4gICAgICAgICdrby1LUic6ICfstIjquLAg67Cw7IahJyxcbiAgICAgICAgJ2xiLUxVJzogJ1VmYW5rcyBWZXJzYW5kJyxcbiAgICAgICAgJ25sLU5MJzogJ0VlcnN0ZSB2ZXJ6ZW5kaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VudmlvIGluaWNpYWwnLFxuICAgICAgICAncnUtUlUnOiAn0J/QtdGA0LLQvtC90LDRh9Cw0LvRjNC90LDRjyDQtNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1phxI1ldG5hIGRvc3RhdmEnLFxuICAgICAgICAnc3YtU0UnOiAnRsO2cnN0YSBmcmFrdGVuJyxcbiAgICAgICAgdGg6ICfguIHguLLguKPguIjguLHguJTguKrguYjguIfguKrguLTguJnguITguYnguLLguYDguJrguLfguYnguK3guIfguJXguYnguJknLFxuICAgICAgICB1azogJ9Cf0L7Rh9Cw0YLQutC+0LLQsCDQtNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+WIneWni+i/kOi+kycsXG4gICAgICAgICd6aC1UVyc6ICfliJ3lp4vpgYvovLgnXG4gICAgfSxcbiAgICAnYWNjb3VudC1wYXNzd29yZC1leHBsYW5hdGlvbic6IHtcbiAgICAgICAgJ2RlLURFJzogJ0Vyc3RlbGxlbiBTaWUgZWluIG5ldWVzIFBhc3N3b3J0IG9kZXIgdmVyd2VuZGVuIFNpZSBlaW4gYmVzdGVoZW5kZXMsIHdlbm4gU2llIGJlcmVpdHMgZWluIEtvbnRvIGbDvHIgLiBoYWJlbicsXG4gICAgICAgICdlbi1VUyc6ICdDcmVhdGUgYSBuZXcgcGFzc3dvcmQsIG9yIHVzZSBhbiBleGlzdGluZyBvbmUgaWYgeW91IGFscmVhZHkgaGF2ZSBhbiBhY2NvdW50IGZvcicsXG4gICAgICAgICdlcy1FUyc6ICdDcmVlIHVuYSBudWV2YSBjb250cmFzZcOxYSBvIHVzZSB1bmEgZXhpc3RlbnRlIHNpIHlhIHRpZW5lIHVuYSBjdWVudGEuIHRlbmVyJyxcbiAgICAgICAgZnI6ICdDcsOpZXogdW4gbm91dmVhdSBtb3QgZGUgcGFzc2Ugb3UgdXRpbGlzZXotZW4gdW4gZXhpc3RhbnQgc2kgdm91cyBhdmV6IGTDqWrDoCB1biBjb21wdGUgcG91cicsXG4gICAgICAgIGl0OiAnQ3JlYSB1bmEgbnVvdmEgcGFzc3dvcmQgbyB1c2FuZSB1bmEgZXNpc3RlbnRlIHNlIGhhaSBnacOgIHVuIGFjY291bnQgcGVyJyxcbiAgICAgICAgamE6ICfmlrDjgZfjgYTjg5Hjgrnjg6/jg7zjg4njgpLkvZzmiJDjgZnjgovjgYvjgIHjgZnjgafjgavjgqLjgqvjgqbjg7Pjg4jjgpLjgYrmjIHjgaHjga7loLTlkIjjga/ml6LlrZjjga7jg5Hjgrnjg6/jg7zjg4njgpLkvb/nlKjjgZfjgabjgY/jgaDjgZXjgYQnLFxuICAgICAgICAncm8tUk8nOiAnQ3JlYcibaSBvIHBhcm9sxIMgbm91xIMgc2F1IHV0aWxpemHIm2kgdW5hIGV4aXN0ZW50xIMgZGFjxIMgYXZlyJtpIGRlamEgdW4gY29udCBwZW50cnUnLFxuICAgICAgICBhcjogJ9ij2YbYtNimINmD2YTZhdipINmF2LHZiNixINis2K/Zitiv2Kkg2Iwg2KPZiCDYp9iz2KrYrtiv2YUg2YPZhNmF2Kkg2YXYsdmI2LEg2YXZiNis2YjYr9ipINil2LDYpyDZg9in2YYg2YTYr9mK2YMg2KjYp9mE2YHYudmEINit2LPYp9ioINmE2YAnLFxuICAgICAgICBjYTogJ0NyZWV1IHVuYSBjb250cmFzZW55YSBub3ZhIG8gdXRpbGl0emV1LW5lIHVuYSBzaSBqYSB0ZW5pdSB1biBjb21wdGUnLFxuICAgICAgICAnY3MtQ1onOiAnVnl0dm/FmXRlIG5vdsOpIGhlc2xvIG5lYm8gcG91xb5panRlIHN0w6F2YWrDrWPDrSwgcG9rdWQgamnFviBtw6F0ZSDDusSNZXQnLFxuICAgICAgICAnZGEtREsnOiAnT3ByZXQgZW4gbnkgYWRnYW5nc2tvZGUsIGVsbGVyIGJydWcgZW4gZWtzaXN0ZXJlbmRlLCBodmlzIGR1IGFsbGVyZWRlIGhhciBlbiBrb250byB0aWwnLFxuICAgICAgICBlbDogJ86UzrfOvM65zr/Phc+BzrPOrs+Dz4TOtSDOrc69zrHOvSDOvc6tzr8gzrrPic60zrnOus+MIM+Az4HPjM+DzrLOsc+DzrfPgiDOriDPh8+BzrfPg865zrzOv8+Azr/Ouc6uz4PPhM61IM6tzr3Osc69IM+Fz4DOrM+Bz4fOv869z4TOsSwgzrXOrM69IM6tz4fOtc+EzrUgzq7OtM63IM67zr/Os86xz4HOuc6xz4POvM+MJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckj+CklSDgpKjgpK/gpL4g4KSq4KS+4KS44KS14KSw4KWN4KShIOCkrOCkqOCkvuCkj+Ckgiwg4KSv4KS+IOCkleCkv+CkuOClgCDgpK7gpYzgpJzgpYLgpKbgpL4g4KSq4KS+4KS44KS14KSw4KWN4KShIOCkleCkviDgpIngpKrgpK/gpYvgpJcg4KSV4KSw4KWH4KSCIOCkr+CkpuCkvyDgpIbgpKrgpJXgpYcg4KSq4KS+4KS4IOCkquCkueCksuClhyDgpLjgpYcg4KS54KWAIOCkj+CklSDgpJbgpL7gpKTgpL4g4KS54KWIJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yDiCDruYTrsIDrsojtmLjrpbwg7IOd7ISx7ZWY6rGw64KYIOydtOuvuCDqs4TsoJXsnbQg7J6I64qUIOqyveyasCDquLDsobQg67mE67CA67KI7Zi466W8IOyCrOyaqe2VmOyLreyLnOyYpC4nLFxuICAgICAgICAnbGItTFUnOiAnRXJzdGVsbHQgZW4gbmVpdCBQYXNzd3VlcnQsIG9kZXIgYmVub3R6dCBlbiBleGlzdGVudCBQYXNzd3VlcnQgd2FubiBEaXIgc2Nob25uIGUgS29udCBodXR0JyxcbiAgICAgICAgJ25sLU5MJzogJ01hYWsgZWVuIG5pZXV3IHdhY2h0d29vcmQgYWFuLCBvZiBnZWJydWlrIGVlbiBiZXN0YWFuZCB3YWNodHdvb3JkIGFscyBqZSBhbCBlZW4gYWNjb3VudCBoZWJ0IHZvb3InLFxuICAgICAgICAncHQtUFQnOiAnQ3JpZSB1bWEgbm92YSBzZW5oYSBvdSB1c2UgdW1hIGV4aXN0ZW50ZSBzZSB2b2PDqiBqw6EgdGl2ZXIgdW1hIGNvbnRhIHBhcmEnLFxuICAgICAgICAncnUtUlUnOiAn0KHQvtC30LTQsNC50YLQtSDQvdC+0LLRi9C5INC/0LDRgNC+0LvRjCDQuNC70Lgg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LksINC10YHQu9C4INGDINCy0LDRgSDRg9C20LUg0LXRgdGC0Ywg0YPRh9C10YLQvdCw0Y8g0LfQsNC/0LjRgdGMINC00LvRjycsXG4gICAgICAgICdzbC1TSSc6ICdVc3R2YXJpdGUgbm92byBnZXNsbyBhbGkgdXBvcmFiaXRlIG9ic3RvamXEjWUsIMSNZSDFvmUgaW1hdGUgcmHEjXVuJyxcbiAgICAgICAgJ3N2LVNFJzogJ1NrYXBhIGV0dCBueXR0IGzDtnNlbm9yZCwgZWxsZXIgYW52w6RuZCBldHQgYmVmaW50bGlndCBvbSBkdSByZWRhbiBoYXIgZXR0IGtvbnRvIGbDtnInLFxuICAgICAgICB0aDogJ+C4quC4o+C5ieC4suC4h+C4o+C4q+C4seC4quC4nOC5iOC4suC4meC5g+C4q+C4oeC5iOC4q+C4o+C4t+C4reC5g+C4iuC5ieC4o+C4q+C4seC4quC4nOC5iOC4suC4meC4l+C4teC5iOC4oeC4teC4reC4ouC4ueC5iOC4luC5ieC4suC4hOC4uOC4k+C4oeC4teC4muC4seC4jeC4iuC4teC4quC4s+C4q+C4o+C4seC4micsXG4gICAgICAgIHVrOiAn0KHRgtCy0L7RgNGW0YLRjCDQvdC+0LLQuNC5INC/0LDRgNC+0LvRjCDQsNCx0L4g0LLQuNC60L7RgNC40YHRgtC+0LLRg9C50YLQtSDRltGB0L3Rg9GO0YfQuNC5LCDRj9C60YnQviDRgyDQstCw0YEg0LLQttC1INGUINC+0LHQu9GW0LrQvtCy0LjQuSDQt9Cw0L/QuNGBJyxcbiAgICAgICAgJ3poLUNOJzogJ+WIm+W7uuS4gOS4quaWsOWvhuegge+8jOWmguaenOaCqOW3sue7j+acieS4gOS4quW4kOaIt++8jOWImeS9v+eUqOeOsOacieeahOWvhueggScsXG4gICAgICAgICd6aC1UVyc6ICflibXlu7rkuIDlgIvmlrDlr4bnorzvvIzlpoLmnpzmgqjlt7LntpPmnInkuIDlgIvluLPmiLbvvIzliYfkvb/nlKjnj77mnInnmoTlr4bnorwnXG4gICAgfSxcbiAgICAnYWNjb3VudC1wYXNzd29yZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Bhc3N3b3J0JyxcbiAgICAgICAgJ2VuLVVTJzogJ1Bhc3N3b3JkJyxcbiAgICAgICAgJ2VzLUVTJzogJ0NsYXZlJyxcbiAgICAgICAgZnI6ICdNb3QgZGUgcGFzc2UnLFxuICAgICAgICBpdDogJ1Bhcm9sYSBkXFwnb3JkaW5lJyxcbiAgICAgICAgamE6ICfjg5Hjgrnjg6/jg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnUGFyb2xhJyxcbiAgICAgICAgYXI6ICfZg9mE2YXZhyDYp9mE2LPYsScsXG4gICAgICAgIGNhOiAnQ29udHJhc2VueWEnLFxuICAgICAgICAnY3MtQ1onOiAnSGVzbG8nLFxuICAgICAgICAnZGEtREsnOiAnQWRnYW5nc2tvZGUnLFxuICAgICAgICBlbDogJ86az4nOtM65zrrPjM+CIM+Az4HPjM+DzrLOsc+DzrfPgicsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpL7gpLjgpLXgpLDgpY3gpKEnLFxuICAgICAgICAna28tS1InOiAn67mE67CA67KI7Zi4JyxcbiAgICAgICAgJ2xiLUxVJzogJ1Bhc3N3dWVydCcsXG4gICAgICAgICdubC1OTCc6ICdXYWNodHdvb3JkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbmhhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LDRgNC+0LvRjCcsXG4gICAgICAgICdzbC1TSSc6ICdHZXNsbycsXG4gICAgICAgICdzdi1TRSc6ICdMw7ZzZW5vcmQnLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC4nOC5iOC4suC4mScsXG4gICAgICAgIHVrOiAn0J/QsNGA0L7Qu9GMJyxcbiAgICAgICAgJ3poLUNOJzogJ+WvhueggScsXG4gICAgICAgICd6aC1UVyc6ICflr4bnorwnXG4gICAgfSxcbiAgICAnaW52YWxpZC1tZXJjaGFudC1wYXNzd29yZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0RhcyBlaW5nZWdlYmVuZSBQYXNzd29ydCBtdXNzIG1pbmRlc3RlbnMgOCBaZWljaGVuIGxhbmcgc2Vpbi4nLFxuICAgICAgICAnZW4tVVMnOiAnVGhlIHBhc3N3b3JkIGVudGVyZWQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZy4nLFxuICAgICAgICAnZXMtRVMnOiAnTGEgY29udHJhc2XDsWEgaW5ncmVzYWRhIGRlYmUgdGVuZXIgYWwgbWVub3MgOCBjYXJhY3RlcmVzLicsXG4gICAgICAgIGZyOiAnTGUgbW90IGRlIHBhc3NlIHNhaXNpIGRvaXQgY29tcG9ydGVyIGF1IG1vaW5zIDggY2FyYWN0w6hyZXMuJyxcbiAgICAgICAgaXQ6ICdMYSBwYXNzd29yZCBpbnNlcml0YSBkZXZlIGVzc2VyZSBsdW5nYSBhbG1lbm8gOCBjYXJhdHRlcmkuJyxcbiAgICAgICAgamE6ICflhaXlipvjgZnjgovjg5Hjgrnjg6/jg7zjg4njga845paH5a2X5Lul5LiK44Gn44GC44KL5b+F6KaB44GM44GC44KK44G+44GZ44CCJyxcbiAgICAgICAgJ3JvLVJPJzogJ1Bhcm9sYSBpbnRyb2R1c8SDIHRyZWJ1aWUgc8SDIGFpYsSDIGNlbCBwdcibaW4gOCBjYXJhY3RlcmUuJyxcbiAgICAgICAgYXI6ICfZitis2Kgg2KPZhiDYqtiq2YPZiNmGINmD2YTZhdipINin2YTZhdix2YjYsSDYp9mE2YXYr9iu2YTYqSDZhdmGIDgg2KPYrdix2YEg2LnZhNmJINin2YTYo9mC2YQuJyxcbiAgICAgICAgY2E6ICdMYSBjb250cmFzZW55YSBpbnRyb2R1w69kYSBoYSBkZSB0ZW5pciBjb20gYSBtw61uaW0gOCBjYXLDoGN0ZXJzLicsXG4gICAgICAgICdjcy1DWic6ICdaYWRhbsOpIGhlc2xvIG11c8OtIG3DrXQgYWxlc3BvxYggOCB6bmFrxa8uJyxcbiAgICAgICAgJ2RhLURLJzogJ0RlbiBpbmR0YXN0ZWRlIGFkZ2FuZ3Nrb2RlIHNrYWwgdsOmcmUgbWluZHN0IDggdGVnbiBsYW5nLicsXG4gICAgICAgIGVsOiAnzp8gzrrPic60zrnOus+Mz4Igz4DPgc+Mz4POss6xz4POt8+CIM+Azr/PhSDOrc+HzrXOuSDOtc65z4POsc+HzrjOtc6vIM+Az4HOrc+AzrXOuSDOvc6xIM6tz4fOtc65IM+Ezr/Phc67zqzPh865z4PPhM6/zr0gOCDPh86xz4HOsc66z4TOrs+BzrXPgi4nLFxuICAgICAgICAnaGktSU4nOiAn4KSm4KSw4KWN4KScIOCkleCkv+Ckr+CkviDgpJfgpK/gpL4g4KSq4KS+4KS44KS14KSw4KWN4KShIOCkleCkriDgpLjgpYcg4KSV4KSuIDgg4KS14KSw4KWN4KSjIOCksuCkguCkrOCkviDgpLngpYvgpKjgpL4g4KSa4KS+4KS54KS/4KSP4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yeheugpe2VnCDruYTrsIDrsojtmLjripQgOOyekCDsnbTsg4HsnbTslrTslbwg7ZWp64uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdEXFwnUGFzc3d1ZXJ0IGRhdCBhZ2lubiBhc3MgbXVzcyBvcCBkXFwnbWFubnN0IDggWmVlY2hlIGxhYW5nIHNpbm4uJyxcbiAgICAgICAgJ25sLU5MJzogJ0hldCBpbmdldm9lcmRlIHdhY2h0d29vcmQgbW9ldCBtaW5pbWFhbCA4IHRla2VucyBsYW5nIHppam4uJyxcbiAgICAgICAgJ3B0LVBUJzogJ0Egc2VuaGEgaW5zZXJpZGEgZGV2ZSB0ZXIgcGVsbyBtZW5vcyA4IGNhcmFjdGVyZXMuJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0LLQtdC00LXQvdC90YvQuSDQv9Cw0YDQvtC70Ywg0LTQvtC70LbQtdC9INGB0L7RgdGC0L7Rj9GC0Ywg0L3QtSDQvNC10L3QtdC1INGH0LXQvCDQuNC3IDgg0YHQuNC80LLQvtC70L7Qsi4nLFxuICAgICAgICAnc2wtU0knOiAnVm5lc2VubyBnZXNsbyBtb3JhIGJpdGkgZG9sZ28gbmFqbWFuaiA4IHpuYWtvdi4nLFxuICAgICAgICAnc3YtU0UnOiAnTMO2c2Vub3JkZXQgbcOlc3RlIHZhcmEgbWluc3QgOCB0ZWNrZW4gbMOlbmd0LicsXG4gICAgICAgIHRoOiAn4Lij4Lir4Lix4Liq4Lic4LmI4Liy4LiZ4LiX4Li14LmI4Lib4LmJ4Lit4LiZ4LiV4LmJ4Lit4LiH4Lih4Li14LiE4Lin4Liy4Lih4Lii4Liy4Lin4Lit4Lii4LmI4Liy4LiH4LiZ4LmJ4Lit4LiiIDgg4LiV4Lix4Lin4Lit4Lix4LiB4Lip4LijJyxcbiAgICAgICAgdWs6ICfQktCy0LXQtNC10L3QuNC5INC/0LDRgNC+0LvRjCDQv9C+0LLQuNC90LXQvSDQvNGW0YHRgtC40YLQuCDQvdC1INC80LXQvdGI0LUgOCDRgdC40LzQstC+0LvRltCyLicsXG4gICAgICAgICd6aC1DTic6ICfovpPlhaXnmoTlr4bnoIHplb/luqblv4Xpobvoh7PlsJHkuLogOCDkuKrlrZfnrKbjgIInLFxuICAgICAgICAnemgtVFcnOiAn6Ly45YWl55qE5a+G56K86ZW35bqm5b+F6aCI6Iez5bCR54K6IDgg5YCL5a2X56ym44CCJ1xuICAgIH0sXG4gICAgdW5rbm93bjoge1xuICAgICAgICAnZGUtREUnOiAnVW5iZWthbm50JyxcbiAgICAgICAgJ2VuLVVTJzogJ1Vua25vd24nLFxuICAgICAgICAnZXMtRVMnOiAnRGVzY29ub2NpZG8nLFxuICAgICAgICBmcjogJ0luY29ubnUnLFxuICAgICAgICBpdDogJ1Njb25vc2NpdXRvJyxcbiAgICAgICAgamE6ICfkuI3mmI4nLFxuICAgICAgICAncm8tUk8nOiAnTmVjdW5vc2N1dCcsXG4gICAgICAgIGFyOiAn2YXYrNmH2YjZhCcsXG4gICAgICAgIGNhOiAnRGVzY29uZWd1dCcsXG4gICAgICAgICdjcy1DWic6ICdOZXpuw6Ftw70nLFxuICAgICAgICAnZGEtREsnOiAnVWtlbmR0JyxcbiAgICAgICAgZWw6ICfOkc6zzr3Pic+Dz4TOv8+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkheCkqOCknOCkvuCkqCcsXG4gICAgICAgICdrby1LUic6ICfslYzroKTsp4Dsp4Ag7JWK7J2AJyxcbiAgICAgICAgJ2xiLUxVJzogJ09uYmVrYW5udCcsXG4gICAgICAgICdubC1OTCc6ICdPbmJla2VuZCcsXG4gICAgICAgICdwdC1QVCc6ICdEZXNjb25oZWNpZGEnLFxuICAgICAgICAncnUtUlUnOiAn0J3QtdC40LfQstC10YHRgtC90YvQuScsXG4gICAgICAgICdzbC1TSSc6ICdOZXpuYW5vJyxcbiAgICAgICAgJ3N2LVNFJzogJ09rw6RuZCcsXG4gICAgICAgIHRoOiAn4LmE4Lih4LmI4Lij4Li54LmJ4LiI4Lix4LiBJyxcbiAgICAgICAgdWs6ICfQndC10LLRltC00L7QvNC40LknLFxuICAgICAgICAnemgtQ04nOiAn5pyq55+lJyxcbiAgICAgICAgJ3poLVRXJzogJ+acquefpSdcbiAgICB9LFxuICAgICd0ZXN0LW1vZGUtYmFubmVyJzoge1xuICAgICAgICAnZGUtREUnOiAnVGVzdG1vZHVzOiBLdW5kZW4ga8O2bm5lbiBQZWFjaFBheSBuaWNodCBzZWhlbicsXG4gICAgICAgICdlbi1VUyc6ICdUZXN0IG1vZGU6IGN1c3RvbWVycyBjYW5ub3Qgc2VlIFBlYWNoUGF5JyxcbiAgICAgICAgJ2VzLUVTJzogJ01vZG8gZGUgcHJ1ZWJhOiBsb3MgY2xpZW50ZXMgbm8gcHVlZGVuIHZlciBQZWFjaFBheScsXG4gICAgICAgIGZyOiAnTW9kZSB0ZXN0IDogbGVzIGNsaWVudHMgbmUgcGV1dmVudCBwYXMgdm9pciBQZWFjaFBheScsXG4gICAgICAgIGl0OiAnTW9kYWxpdMOgIHRlc3Q6IGkgY2xpZW50aSBub24gcG9zc29ubyB2ZWRlcmUgUGVhY2hQYXknLFxuICAgICAgICBqYTogJ+ODhuOCueODiOODouODvOODie+8mumhp+WuouOBr1BlYWNoUGF544KS6KaL44KL44GT44Go44GM44Gn44GN44G+44Gb44KTJyxcbiAgICAgICAgJ3JvLVJPJzogJ01vZCBkZSB0ZXN0YXJlOiBjbGllbsibaWkgbnUgcG90IHZlZGVhIFBlYWNoUGF5JyxcbiAgICAgICAgYXI6ICfZiNi22Lkg2KfZhNin2K7Yqtio2KfYsTog2YTYpyDZitmF2YPZhiDZhNmE2LnZhdmE2KfYoSDYsdik2YrYqSBQZWFjaFBheScsXG4gICAgICAgIGNhOiAnTW9kZSBkZSBwcm92YTogZWxzIGNsaWVudHMgbm8gcG9kZW4gdmV1cmUgUGVhY2hQYXknLFxuICAgICAgICAnY3MtQ1onOiAnVGVzdG92YWPDrSByZcW+aW06IHrDoWthem7DrWNpIG5ldmlkw60gUGVhY2hQYXknLFxuICAgICAgICAnZGEtREsnOiAnVGVzdHRpbHN0YW5kOiBrdW5kZXIga2FuIGlra2Ugc2UgUGVhY2hQYXknLFxuICAgICAgICBlbDogJ86bzrXOuc+Ezr/Phc+BzrPOr86xIM60zr/Ous65zrzOrs+COiDOv865IM+AzrXOu86sz4TOtc+CIM60zrXOvSDOvM+Azr/Pgc6/z43OvSDOvc6xIM60zr/Phc69IM+Ezr8gUGVhY2hQYXknLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KSw4KWA4KSV4KWN4KS34KSjIOCkruCli+CkoTog4KSX4KWN4KSw4KS+4KS54KSVIOCkquClgOCkmuCkquClhyDgpKjgpLngpYDgpIIg4KSm4KWH4KSWIOCkuOCkleCkpOClhyDgpLngpYjgpIInLFxuICAgICAgICAna28tS1InOiAn7YWM7Iqk7Yq4IOuqqOuTnDog6rOg6rCd7J20IFBlYWNoUGF566W8IOuzvCDsiJgg7JeG7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdUZXN0bW9kdXM6IENsaWVudGVuIGvDq25uZW4gUGVhY2hQYXkgbmV0IGdlc2lubicsXG4gICAgICAgICdubC1OTCc6ICdUZXN0bW9kdXM6IGtsYW50ZW4ga3VubmVuIFBlYWNoUGF5IG5pZXQgemllbicsXG4gICAgICAgICdwdC1QVCc6ICdNb2RvIGRlIHRlc3RlOiBvcyBjbGllbnRlcyBuw6NvIHBvZGVtIHZlciBvIFBlYWNoUGF5JyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ci0LXRgdGC0L7QstGL0Lkg0YDQtdC20LjQvDog0LrQu9C40LXQvdGC0Ysg0L3QtSDQstC40LTRj9GCIFBlYWNoUGF5JyxcbiAgICAgICAgJ3NsLVNJJzogJ1Rlc3RuaSBuYcSNaW46IHN0cmFua2UgbmUgdmlkaWpvIFBlYWNoUGF5JyxcbiAgICAgICAgJ3N2LVNFJzogJ1Rlc3Rsw6RnZToga3VuZGVyIGthbiBpbnRlIHNlIFBlYWNoUGF5JyxcbiAgICAgICAgdGg6ICfguYLguKvguKHguJTguJfguJTguKrguK3guJo6IOC4peC4ueC4geC4hOC5ieC4suC5hOC4oeC5iOC4quC4suC4oeC4suC4o+C4luC5gOC4q+C5h+C4mSBQZWFjaFBheScsXG4gICAgICAgIHVrOiAn0KLQtdGB0YLQvtCy0LjQuSDRgNC10LbQuNC8OiDQutC70ZbRlNC90YLQuCDQvdC1INC80L7QttGD0YLRjCDQsdCw0YfQuNGC0LggUGVhY2hQYXknLFxuICAgICAgICAnemgtQ04nOiAn5rWL6K+V5qih5byP77ya5a6i5oi355yL5LiN5YiwUGVhY2hQYXknLFxuICAgICAgICAnemgtVFcnOiAn5ris6Kmm5qih5byP77ya5a6i5oi255yL5LiN5YiwUGVhY2hQYXknXG4gICAgfSxcbiAgICAndmVyaWZ5LWxvY2F0aW9uJzoge1xuICAgICAgICAnZGUtREUnOiAnSWNoIGJlc3TDpHRpZ2UsIGRhc3MgZGFzIExhbmQsIGluIGRlbSBpY2ggZWluZ2VyZWlzdCBiaW4sIGRhcyBMYW5kIGlzdCwgaW4gZGVtIGljaCB3b2huZScsXG4gICAgICAgICdlbi1VUyc6ICdJIHZlcmlmeSB0aGF0IHRoZSBjb3VudHJ5IEkgaGF2ZSBlbnRlcmVkIGlzIHRoZSBvbmUgSSByZXNpZGUgaW4nLFxuICAgICAgICAnZXMtRVMnOiAnVmVyaWZpY28gcXVlIGVsIHBhw61zIGFsIHF1ZSBoZSBlbnRyYWRvIGVzIGVuIGVsIHF1ZSByZXNpZG8nLFxuICAgICAgICBmcjogJ0plIHbDqXJpZmllIHF1ZSBsZSBwYXlzIGRhbnMgbGVxdWVsIGplIHN1aXMgZW50csOpIGVzdCBjZWx1aSBkYW5zIGxlcXVlbCBqZSByw6lzaWRlJyxcbiAgICAgICAgaXQ6ICdWZXJpZmljbyBjaGUgaWwgcGFlc2UgaW4gY3VpIHNvbm8gZW50cmF0byBzaWEgcXVlbGxvIGluIGN1aSByaXNpZWRvJyxcbiAgICAgICAgamE6ICflhaXlipvjgZfjgZ/lm73jgYzlsYXkvY/lm73jgafjgYLjgovjgZPjgajjgpLnorroqo3jgZfjgb7jgZknLFxuICAgICAgICAncm8tUk8nOiAnVmVyaWZpYyBjxIMgyJthcmEgw65uIGNhcmUgYW0gaW50cmF0IGVzdGUgY2VhIMOubiBjYXJlIGxvY3VpZXNjJyxcbiAgICAgICAgYXI6ICfYo9iq2K3ZgtmCINmF2YYg2KPZhiDYp9mE2KjZhNivINin2YTYsNmKINij2K/YrtmE2KrZhyDZh9mIINin2YTYqNmE2K8g2KfZhNiw2Yog2KPZgtmK2YUg2YHZitmHJyxcbiAgICAgICAgY2E6ICdWZXJpZmljbyBxdWUgZWwgcGHDrXMgb24gaGUgZW50cmF0IMOpcyBlbCBvbiB2aXNjJyxcbiAgICAgICAgJ2NzLUNaJzogJ092xJvFmXVqaSwgxb5lIHplbcSbLCBkbyBrdGVyw6kganNlbSB6YWRhbCwgamUgemVtw60sIHZlIGt0ZXLDqSBieWRsw61tJyxcbiAgICAgICAgJ2RhLURLJzogJ0plZyBiZWtyw6ZmdGVyLCBhdCBkZXQgbGFuZCwgamVnIGhhciBpbmR0YXN0ZXQsIGVyIGRldCwgamVnIGJvciBpJyxcbiAgICAgICAgZWw6ICfOlc+AzrHOu863zrjOtc+Nz4kgz4zPhM65IM63IM+Hz47Pgc6xIM+Dz4TOt869IM6/z4DOv86vzrEgzq3Ph8+JIM61zrnPg86tzrvOuM61zrkgzrXOr869zrHOuSDOsc+Fz4TOriDPg8+EzrfOvSDOv8+Azr/Or86xIM60zrnOsc68zq3Ovc+JJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkruCliOCkgiDgpLjgpKTgpY3gpK/gpL7gpKrgpL/gpKQg4KSV4KSw4KSk4KS+L+CkleCksOCkpOClgCDgpLngpYLgpIIg4KSV4KS/IOCknOCkv+CkuCDgpKbgpYfgpLYg4KSu4KWH4KSCIOCkruCliOCkguCkqOClhyDgpKrgpY3gpLDgpLXgpYfgpLYg4KSV4KS/4KSv4KS+IOCkueCliCDgpLXgpLkg4KS14KS54KWAIOCkpuClh+CktiDgpLngpYgg4KSc4KS/4KS44KSu4KWH4KSCIOCkruCliOCkgiDgpLDgpLngpKTgpL4g4KS54KWC4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uCtOqwgCDsnoXroKXtlZwg6rWt6rCA6rCAIOuCtOqwgCDqsbDso7ztlZjripQg6rWt6rCA7J247KeAIO2ZleyduO2VqeuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRWNoIHZlcmlmaXrDqWllcmVuIGRhdHQgZFxcJ0xhbmQgd291IGVjaCBhZ2lubiBodW5uIGFzcyBkZWVuIGFuIGRlZW0gZWNoIHd1bm5lbicsXG4gICAgICAgICdubC1OTCc6ICdJayB2ZXJpZmllZXIgZGF0IGhldCBsYW5kIGRhdCBpayBoZWIgaW5nZXZvZXJkIGhldCBsYW5kIGlzIHdhYXJpbiBpayB3b29uJyxcbiAgICAgICAgJ3B0LVBUJzogJ0V1IHZlcmlmaWNvIHNlIG8gcGHDrXMgcXVlIGV1IGluc2VyaSDDqSBhcXVlbGUgZW0gcXVlIHJlc2lkbycsXG4gICAgICAgICdydS1SVSc6ICfQryDQv9C+0LTRgtCy0LXRgNC20LTQsNGOLCDRh9GC0L4g0YHRgtGA0LDQvdCwLCDQsiDQutC+0YLQvtGA0YPRjiDRjyDQstGK0LXRhdCw0LssINGP0LLQu9GP0LXRgtGB0Y8g0YLQvtC5LCDQsiDQutC+0YLQvtGA0L7QuSDRjyDQv9GA0L7QttC40LLQsNGOJyxcbiAgICAgICAgJ3NpLVNJJzogJ1BvdHJqdWplbSwgZGEgamUgZHLFvmF2YSwgdiBrYXRlcm8gc2VtIHZzdG9waWwsIHRpc3RhLCB2IGthdGVyaSBwcmViaXZhbScsXG4gICAgICAgICdzaS1TRSc6ICdKYWcgdmVyaWZpZXJhciBhdHQgZGV0IGxhbmQgamFnIGhhciBhbmdldHQgw6RyIGRldCBqYWcgYm9yIGknLFxuICAgICAgICB0aDogJ+C4ieC4seC4meC4ouC4t+C4meC4ouC4seC4meC4p+C5iOC4suC4m+C4o+C4sOC5gOC4l+C4qOC4l+C4teC5iOC4ieC4seC4meC5gOC4guC5ieC4suC4oeC4suC5gOC4m+C5h+C4meC4m+C4o+C4sOC5gOC4l+C4qOC4l+C4teC5iOC4ieC4seC4meC4reC4suC4qOC4seC4ouC4reC4ouC4ueC5iCcsXG4gICAgICAgIHVrOiAn0K8g0L/RltC00YLQstC10YDQtNC20YPRjiwg0YnQviDQutGA0LDRl9C90LAsINCyINGP0LrRgyDRjyDQstCy0ZbQudGI0L7Qsiwg0ZQg0YLRltGU0Y4sINCyINGP0LrRltC5INGPINC/0YDQvtC20LjQstCw0Y4nLFxuICAgICAgICAnemgtQ04nOiAn5oiR56Gu6K6k5oiR6L+b5YWl55qE5Zu95a625piv5oiR5bGF5L2P55qE5Zu95a62JyxcbiAgICAgICAgJ3poLVRXJzogJ+aIkeeiuuiqjeaIkemAsuWFpeeahOWci+WutuaYr+aIkeWxheS9j+eahOWci+WutidcbiAgICB9XG59O1xuY29uc3QgRmVhdHVyZSA9IHtcbiAgICBlbmFibGVkOiAoZmxhZyk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLmZlYXR1cmVTdXBwb3J0W2ZsYWddPy5lbmFibGVkID8/IGZhbHNlXG4gICAgLFxuICAgIHZlcnNpb246IChmbGFnKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4uZmVhdHVyZVN1cHBvcnRbZmxhZ10/LnZlcnNpb24gPz8gMFxuICAgICxcbiAgICBtZXRhRGF0YTogKGZsYWcsIGtleSk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLmZlYXR1cmVTdXBwb3J0W2ZsYWddPy5tZXRhX2RhdGE/LltrZXldID8/IG51bGxcbn07XG52YXIgRmVhdHVyZUZsYWc7XG4oZnVuY3Rpb24oRmVhdHVyZUZsYWcxKSB7XG4gICAgRmVhdHVyZUZsYWcxW1wiQ0FSVF9DQUxDVUxBVElPTlwiXSA9ICdjYXJ0X2NhbGN1bGF0aW9uJztcbiAgICBGZWF0dXJlRmxhZzFbXCJDT1VQT05fSU5QVVRcIl0gPSAnY291cG9uX2lucHV0JztcbiAgICBGZWF0dXJlRmxhZzFbXCJHSUZUQ0FSRF9JTlBVVFwiXSA9ICdnaWZ0Y2FyZF9pbnB1dCc7XG4gICAgRmVhdHVyZUZsYWcxW1wiT1JERVJfTk9URVNcIl0gPSAnb3JkZXJfbm90ZXNfaW5wdXQnO1xuICAgIEZlYXR1cmVGbGFnMVtcIkFERElUSU9OQUxfRklFTERTXCJdID0gJ2FkZGl0aW9uYWxfZmllbGRzJztcbiAgICBGZWF0dXJlRmxhZzFbXCJTVFJJUEVcIl0gPSAnc3RyaXBlX3BheW1lbnRfbWV0aG9kJztcbiAgICBGZWF0dXJlRmxhZzFbXCJTVFJJUEVfUEFZTUVOVF9SRVFVRVNUXCJdID0gJ3N0cmlwZV9wYXltZW50X3JlcXVlc3QnO1xuICAgIEZlYXR1cmVGbGFnMVtcIlFVQU5USVRZX0NIQU5HRVJcIl0gPSAncXVhbnRpdHlfY2hhbmdlcic7XG59KShGZWF0dXJlRmxhZyB8fCAoRmVhdHVyZUZsYWcgPSB7fSkpO1xuY29uc3QgdXBkYXRlQ3VzdG9tZXJTdHJpcGVJZCA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUl9TVFJJUEVfSUQpO1xuY29uc3QgdXBkYXRlQ3VzdG9tZXIgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVIpO1xuY29uc3QgdXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUl9QQVlNRU5UX01FVEhPRCk7XG5jb25zdCBQZWFjaFBheUN1c3RvbWVyID0ge1xuICAgIGRhdGE6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXJcbiAgICAsXG4gICAgZW1haWw6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuZW1haWxcbiAgICAsXG4gICAgZmlyc3ROYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLm5hbWVfZmlyc3RcbiAgICAsXG4gICAgbGFzdE5hbWU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIubmFtZV9sYXN0XG4gICAgLFxuICAgIHBob25lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLnBob25lXG4gICAgLFxuICAgIGFkZHJlc3MxOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MxXG4gICAgLFxuICAgIGFkZHJlc3MyOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MyXG4gICAgLFxuICAgIGNpdHk6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuY2l0eVxuICAgICxcbiAgICBzdGF0ZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5zdGF0ZVxuICAgICxcbiAgICBjb3VudHJ5OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmNvdW50cnlcbiAgICAsXG4gICAgcG9zdGFsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLnBvc3RhbFxuICAgICxcbiAgICBjYXJkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmNhcmRcbiAgICAsXG4gICAgcHJlZmVycmVkUGF5bWVudE1ldGhvZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5wYXltZW50X29wdGlvbiA/PyAnc3RyaXBlJ1xuICAgICxcbiAgICBzdHJpcGVJZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5zdHJpcGVfY3VzdG9tZXJfaWQgPz8gJydcbiAgICAsXG4gICAgc3RyaXBlRGV0YWlsczogKCk9Pih7XG4gICAgICAgICAgICBuYW1lOiBzdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIubmFtZV9maXJzdCArICcgJyArIHN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5uYW1lX2xhc3QsXG4gICAgICAgICAgICBlbWFpbDogc3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmVtYWlsLFxuICAgICAgICAgICAgcGhvbmU6IHN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5waG9uZVxuICAgICAgICB9KVxuICAgICxcbiAgICBzaG9ydEFkZHJlc3M6ICgpPT4oe1xuICAgICAgICAgICAgY291bnRyeTogUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCksXG4gICAgICAgICAgICBzdGF0ZTogUGVhY2hQYXlDdXN0b21lci5zdGF0ZSgpLFxuICAgICAgICAgICAgY2l0eTogUGVhY2hQYXlDdXN0b21lci5jaXR5KCksXG4gICAgICAgICAgICBwb3N0Y29kZTogUGVhY2hQYXlDdXN0b21lci5wb3N0YWwoKVxuICAgICAgICB9KVxuICAgICxcbiAgICBzaGlwcGluZ0FkZHJlc3M6ICgpPT4oe1xuICAgICAgICAgICAgc2hpcHBpbmdfZmlyc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5maXJzdE5hbWUoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2xhc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5sYXN0TmFtZSgpLFxuICAgICAgICAgICAgc2hpcHBpbmdfY29tcGFueTogJycsXG4gICAgICAgICAgICBzaGlwcGluZ19jb3VudHJ5OiBQZWFjaFBheUN1c3RvbWVyLmNvdW50cnkoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2FkZHJlc3NfMTogUGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMSgpLFxuICAgICAgICAgICAgc2hpcHBpbmdfYWRkcmVzc18yOiBQZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MyKCksXG4gICAgICAgICAgICBzaGlwcGluZ19jaXR5OiBQZWFjaFBheUN1c3RvbWVyLmNpdHkoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX3N0YXRlOiBQZWFjaFBheUN1c3RvbWVyLnN0YXRlKCksXG4gICAgICAgICAgICBzaGlwcGluZ19wb3N0Y29kZTogUGVhY2hQYXlDdXN0b21lci5wb3N0YWwoKVxuICAgICAgICB9KVxuICAgICxcbiAgICBiaWxsaW5nQWRkcmVzczogKCk9Pih7XG4gICAgICAgICAgICBiaWxsaW5nX2ZpcnN0X25hbWU6IFBlYWNoUGF5Q3VzdG9tZXIuZmlyc3ROYW1lKCksXG4gICAgICAgICAgICBiaWxsaW5nX2xhc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5sYXN0TmFtZSgpLFxuICAgICAgICAgICAgYmlsbGluZ19jb21wYW55OiAnJyxcbiAgICAgICAgICAgIGJpbGxpbmdfZW1haWw6IFBlYWNoUGF5Q3VzdG9tZXIuZW1haWwoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfcGhvbmU6IFBlYWNoUGF5Q3VzdG9tZXIucGhvbmUoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfY291bnRyeTogUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCksXG4gICAgICAgICAgICBiaWxsaW5nX2FkZHJlc3NfMTogUGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMSgpLFxuICAgICAgICAgICAgYmlsbGluZ19hZGRyZXNzXzI6IFBlYWNoUGF5Q3VzdG9tZXIuYWRkcmVzczIoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfY2l0eTogUGVhY2hQYXlDdXN0b21lci5jaXR5KCksXG4gICAgICAgICAgICBiaWxsaW5nX3N0YXRlOiBQZWFjaFBheUN1c3RvbWVyLnN0YXRlKCksXG4gICAgICAgICAgICBiaWxsaW5nX3Bvc3Rjb2RlOiBQZWFjaFBheUN1c3RvbWVyLnBvc3RhbCgpXG4gICAgICAgIH0pXG59O1xuZnVuY3Rpb24gdXBkYXRlQ3VzdG9tZXJNZXJjaGFudEFjY291bnQobWVyY2hhbnRDdXN0b21lcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUixcbiAgICAgICAgcGF5bG9hZDogbWVyY2hhbnRDdXN0b21lclxuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShleGlzdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUl9FWElTVCxcbiAgICAgICAgcGF5bG9hZDogZXhpc3RcbiAgICB9O1xufVxuY29uc3QgTWVyY2hhbnRDdXN0b21lciA9IHtcbiAgICBsb2dnZWRJbjogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDdXN0b21lci5sb2dnZWRJblxuICAgICxcbiAgICB1c2VybmFtZUV4aXN0OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lSXNSZWdpc3RlcmVkXG59O1xuY29uc3QgdXBkYXRlU2Vzc2lvbklkID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFU1NJT05JRCk7XG5jb25zdCB1cGRhdGVDdXN0b21lckFkZHJlc3NWYWxpZGF0aW9uID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX0FERFJFU1NfVkFMSURBVEVEKTtcbmNvbnN0IHNldEV4dHJhRmllbGRzID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFVF9FWFRSQV9GSUVMRFMpO1xuY29uc3Qgc2V0T3JkZXJFcnJvciA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVRfRVJST1JfTUVTU0FHRSk7XG5jb25zdCBQZWFjaFBheU9yZGVyID0ge1xuICAgIHNlc3Npb25JZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5zZXNzaW9uSWRcbiAgICAsXG4gICAgY29udGVudHM6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1swXS5jYXJ0XG4gICAgLFxuICAgIGVycm9yTWVzc2FnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5lcnJvck1lc3NhZ2VcbiAgICAsXG4gICAgY29sbGVjdFNlbGVjdGVkU2hpcHBpbmc6ICgpPT57XG4gICAgICAgIGNvbnN0IGNhcnRzID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHM7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzUmVjb3JkID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY2FydEtleSBvZiBPYmplY3Qua2V5cyhjYXJ0cykpe1xuICAgICAgICAgICAgY29uc3QgY2FydCA9IGNhcnRzW2NhcnRLZXldO1xuICAgICAgICAgICAgaWYgKCFjYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhY2thZ2VLZXkgb2YgT2JqZWN0LmtleXMoY2FydC5wYWNrYWdlX3JlY29yZCA/PyB7fSkpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VSZWNvcmQgPSBjYXJ0LnBhY2thZ2VfcmVjb3JkW3BhY2thZ2VLZXldO1xuICAgICAgICAgICAgICAgIGlmICghcGFja2FnZVJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcHBpbmdLZXkgPSBjYXJ0S2V5ID09PSAnMCcgPyBwYWNrYWdlS2V5IDogYCR7Y2FydEtleX1fJHtwYWNrYWdlS2V5fWA7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwcGluZ01ldGhvZHNSZWNvcmRbc2hpcHBpbmdLZXldID0gcGFja2FnZVJlY29yZC5zZWxlY3RlZF9tZXRob2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzUmVjb3JkO1xuICAgIH0sXG4gICAgY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheU9yZGVyLmN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRlZFxuICAgICxcbiAgICBleHRyYUZpZWxkc1JlY29yZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5hZGRpdGlvbmFsRmllbGRzXG59O1xuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3lTdHJpbmcoY29zdCkge1xuICAgIGNvbnN0IHsgc3ltYm9sICwgcG9zaXRpb24gIH0gPSBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29uZmlndXJhdGlvbigpO1xuICAgIGlmICh0eXBlb2YgY29zdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY29zdCA9IDA7XG4gICAgfVxuICAgIGxldCBmb3JtYXR0ZWRDdXJyZW5jeSA9ICcnO1xuICAgIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHBvc2l0aW9uID09PSAnbGVmdF9zcGFjZScpIHtcbiAgICAgICAgbGV0IG5lZ1N5bWJvbCA9ICcnO1xuICAgICAgICBsZXQgZm9ybWF0dGVkQ29zdCA9IGZvcm1hdENvc3RTdHJpbmcoY29zdCk7XG4gICAgICAgIGlmIChjb3N0IDwgMCkge1xuICAgICAgICAgICAgbmVnU3ltYm9sID0gJ+KIkic7XG4gICAgICAgICAgICBmb3JtYXR0ZWRDb3N0ID0gZm9ybWF0Q29zdFN0cmluZyhNYXRoLmFicyhjb3N0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0dGVkQ3VycmVuY3kgPSBgJHtuZWdTeW1ib2x9JHtzeW1ib2x9JHtwb3NpdGlvbiA9PT0gJ2xlZnRfc3BhY2UnID8gJyAnIDogJyd9JHtmb3JtYXR0ZWRDb3N0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkQ3VycmVuY3kgPSBgJHtmb3JtYXRDb3N0U3RyaW5nKGNvc3QpfSR7cG9zaXRpb24gPT09ICdyaWdodF9zcGFjZScgPyAnICcgOiAnJ30ke3N5bWJvbH1gO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkQ3VycmVuY3k7XG59XG5mdW5jdGlvbiBmb3JtYXRDb3N0U3RyaW5nKGNvc3QpIHtcbiAgICBjb25zdCB7IGNvZGUgLCB0aG91c2FuZHNTZXBhcmF0b3IgLCBkZWNpbWFsU2VwYXJhdG9yICwgcm91bmRpbmcgLCBkZWNpbWFscyAgfSA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb25maWd1cmF0aW9uKCk7XG4gICAgaWYgKHR5cGVvZiBjb3N0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBjb3N0ID0gMDtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09ICdKUFknKSB7XG4gICAgICAgIHJldHVybiBjb3N0LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGNvbnN0IG51bWJlck9mRGVjaW1hbHMgPSBkZWNpbWFscyB8fCAyO1xuICAgIHN3aXRjaChyb3VuZGluZyl7XG4gICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNvc3QgPSBNYXRoLmNlaWwoY29zdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICBjb3N0ID0gTWF0aC5mbG9vcihjb3N0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduZWFyZXN0JzpcbiAgICAgICAgICAgIGNvc3QgPSBNYXRoLnJvdW5kKGNvc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29zdCA9IE51bWJlci5wYXJzZUZsb2F0KGNvc3QudG9GaXhlZChkZWNpbWFscykpO1xuICAgIGxldCBmb3JtYXR0ZWRQcmljZSA9ICcnO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5U3BsaXQgPSBjb3N0LnRvRml4ZWQobnVtYmVyT2ZEZWNpbWFscykuc3BsaXQoJy4nKTtcbiAgICAgICAgbGV0IGRvbGxhckFtb3VudCA9IGN1cnJlbmN5U3BsaXRbMF07XG4gICAgICAgIGNvbnN0IGNlbnRzQW1vdW50ID0gY3VycmVuY3lTcGxpdFsxXSB8fCAnJztcbiAgICAgICAgY29uc3QgcmV2ID0gY3VycmVuY3lTcGxpdFswXS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgICAgICBjb25zdCByZXZGb3JtYXQgPSByZXYubWF0Y2goLy57MSwzfS9nKT8uam9pbih0aG91c2FuZHNTZXBhcmF0b3IpID8/ICcnO1xuICAgICAgICBkb2xsYXJBbW91bnQgPSByZXZGb3JtYXQuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICAgICAgZm9ybWF0dGVkUHJpY2UgKz0gZG9sbGFyQW1vdW50O1xuICAgICAgICBpZiAoY2VudHNBbW91bnQgIT09ICcnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRQcmljZSArPSBkZWNpbWFsU2VwYXJhdG9yICsgY2VudHNBbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFByaWNlO1xuICAgIH0gY2F0Y2ggIHtcbiAgICAgICAgcmV0dXJuIGNvc3QudG9GaXhlZChkZWNpbWFscyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJJbnB1dChzZWxlY3Rvcikge1xuICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKHNlbGVjdG9yKSl7XG4gICAgICAgICRlbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyRHJvcERvd25MaXN0KGRhdGEsIGRlZmF1bHRPcHRpb24gPSAnJykge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIGNvbnN0IGxpc3QgPSBPYmplY3QuZW50cmllcyhkYXRhKS5tYXAoKFtrZXksIHZhbHVlXSk9PmA8b3B0aW9uIHZhbHVlPVwiJHtrZXl9XCI+ICR7dmFsdWV9IDwvb3B0aW9uPmBcbiAgICApO1xuICAgIGlmIChkZWZhdWx0T3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBgPG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWU9XCJcIj4ke2RlZmF1bHRPcHRpb259PC9vcHRpb24+JHtsaXN0LmpvaW4oJycpfWA7XG4gICAgfVxuICAgIHJldHVybiBsaXN0LmpvaW4oJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0RHJvcGRvd24oJHNlbGVjdCwgdmFsdWUpIHtcbiAgICBpZiAoISRzZWxlY3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkc2VsZWN0LnZhbHVlID0gdmFsdWU7XG59XG5mdW5jdGlvbiBmb3JtRW50cnkoZm9ybURhdGEsIGtleSkge1xuICAgIGlmIChmb3JtRGF0YS5nZXQoa2V5KSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBmb3JtRGF0YS5nZXQoa2V5KSA/PyAnJztcbn1cbmZ1bmN0aW9uIGdldENvdW50cnlOYW1lKGNvdW50cnlDb2RlKSB7XG4gICAgaWYgKCFwZWFjaHBheUNvdW50cmllc1tjb3VudHJ5Q29kZV0pIHtcbiAgICAgICAgcmV0dXJuICdVbmtub3duIENvdW50cnkgQ29kZTogJyArIGNvdW50cnlDb2RlO1xuICAgIH1cbiAgICByZXR1cm4gcGVhY2hwYXlDb3VudHJpZXM/Lltjb3VudHJ5Q29kZV0/Lm5hbWUgPz8gJ1Vua25vd24gQ291bnRyeSBDb2RlOiAnICsgY291bnRyeUNvZGU7XG59XG5mdW5jdGlvbiBzdGF0ZVByb3ZpbmNlT3JDb3VudHkoY291bnRyeUNvZGUpIHtcbiAgICBzd2l0Y2goY291bnRyeUNvZGUpe1xuICAgICAgICBjYXNlICdVUyc6XG4gICAgICAgIGNhc2UgJ01ZJzpcbiAgICAgICAgY2FzZSAnQVUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldExvY2FsZVRleHQoJ3N0YXRlLXNlbGVjdCcpO1xuICAgICAgICBjYXNlICdHQic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgnY291bnR5Jyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgncHJvdmluY2Utc2VsZWN0Jyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNFVUNvdW50cnkoY291bnRyeUNvZGUpIHtcbiAgICBjb25zdCBFVUNvdW50cmllcyA9IFtcbiAgICAgICAgJ0FUJyxcbiAgICAgICAgJ0JFJyxcbiAgICAgICAgJ0JHJyxcbiAgICAgICAgJ0NZJyxcbiAgICAgICAgJ0NaJyxcbiAgICAgICAgJ0RLJyxcbiAgICAgICAgJ0VFJyxcbiAgICAgICAgJ0ZJJyxcbiAgICAgICAgJ0ZSJyxcbiAgICAgICAgJ0RFJyxcbiAgICAgICAgJ0dSJyxcbiAgICAgICAgJ0hVJyxcbiAgICAgICAgJ0lFJyxcbiAgICAgICAgJ0lUJyxcbiAgICAgICAgJ0xWJyxcbiAgICAgICAgJ0xUJyxcbiAgICAgICAgJ0xVJyxcbiAgICAgICAgJ01UJyxcbiAgICAgICAgJ05MJyxcbiAgICAgICAgJ1BMJyxcbiAgICAgICAgJ1BUJyxcbiAgICAgICAgJ1JPJyxcbiAgICAgICAgJ1NLJyxcbiAgICAgICAgJ1NJJyxcbiAgICAgICAgJ0VTJyxcbiAgICAgICAgJ1NFJ1xuICAgIF07XG4gICAgaWYgKEVVQ291bnRyaWVzLmluY2x1ZGVzKGNvdW50cnlDb2RlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuY29uc3QgcGVhY2hwYXlDb3VudHJpZXMgPSB7XG4gICAgQUY6IHtcbiAgICAgICAgbmFtZTogJ0FmZ2hhbmlzdGFuJ1xuICAgIH0sXG4gICAgQVg6IHtcbiAgICAgICAgbmFtZTogJ8OFbGFuZCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgQUw6IHtcbiAgICAgICAgbmFtZTogJ0FsYmFuaWEnXG4gICAgfSxcbiAgICBEWjoge1xuICAgICAgICBuYW1lOiAnQWxnZXJpYSdcbiAgICB9LFxuICAgIEFTOiB7XG4gICAgICAgIG5hbWU6ICdBbWVyaWNhbiBTYW1vYSdcbiAgICB9LFxuICAgIEFEOiB7XG4gICAgICAgIG5hbWU6ICdBbmRvcnJhJ1xuICAgIH0sXG4gICAgQU86IHtcbiAgICAgICAgbmFtZTogJ0FuZ29sYSdcbiAgICB9LFxuICAgIEFJOiB7XG4gICAgICAgIG5hbWU6ICdBbmd1aWxsYSdcbiAgICB9LFxuICAgIEFROiB7XG4gICAgICAgIG5hbWU6ICdBbnRhcmN0aWNhJ1xuICAgIH0sXG4gICAgQUc6IHtcbiAgICAgICAgbmFtZTogJ0FudGlndWEgYW5kIEJhcmJ1ZGEnXG4gICAgfSxcbiAgICBBUjoge1xuICAgICAgICBuYW1lOiAnQXJnZW50aW5hJ1xuICAgIH0sXG4gICAgQU06IHtcbiAgICAgICAgbmFtZTogJ0FybWVuaWEnXG4gICAgfSxcbiAgICBBVzoge1xuICAgICAgICBuYW1lOiAnQXJ1YmEnXG4gICAgfSxcbiAgICBBVToge1xuICAgICAgICBuYW1lOiAnQXVzdHJhbGlhJ1xuICAgIH0sXG4gICAgQVQ6IHtcbiAgICAgICAgbmFtZTogJ0F1c3RyaWEnXG4gICAgfSxcbiAgICBBWjoge1xuICAgICAgICBuYW1lOiAnQXplcmJhaWphbidcbiAgICB9LFxuICAgIEJTOiB7XG4gICAgICAgIG5hbWU6ICdCYWhhbWFzJ1xuICAgIH0sXG4gICAgQkg6IHtcbiAgICAgICAgbmFtZTogJ0JhaHJhaW4nXG4gICAgfSxcbiAgICBCRDoge1xuICAgICAgICBuYW1lOiAnQmFuZ2xhZGVzaCdcbiAgICB9LFxuICAgIEJCOiB7XG4gICAgICAgIG5hbWU6ICdCYXJiYWRvcydcbiAgICB9LFxuICAgIEJZOiB7XG4gICAgICAgIG5hbWU6ICdCZWxhcnVzJ1xuICAgIH0sXG4gICAgQkU6IHtcbiAgICAgICAgbmFtZTogJ0JlbGdpdW0nXG4gICAgfSxcbiAgICBCWjoge1xuICAgICAgICBuYW1lOiAnQmVsaXplJ1xuICAgIH0sXG4gICAgQko6IHtcbiAgICAgICAgbmFtZTogJ0JlbmluJ1xuICAgIH0sXG4gICAgQk06IHtcbiAgICAgICAgbmFtZTogJ0Jlcm11ZGEnXG4gICAgfSxcbiAgICBCVDoge1xuICAgICAgICBuYW1lOiAnQmh1dGFuJ1xuICAgIH0sXG4gICAgQk86IHtcbiAgICAgICAgbmFtZTogJ0JvbGl2aWEsIFBsdXJpbmF0aW9uYWwgU3RhdGUgb2YnXG4gICAgfSxcbiAgICBCUToge1xuICAgICAgICBuYW1lOiAnQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmEnXG4gICAgfSxcbiAgICBCQToge1xuICAgICAgICBuYW1lOiAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYSdcbiAgICB9LFxuICAgIEJXOiB7XG4gICAgICAgIG5hbWU6ICdCb3Rzd2FuYSdcbiAgICB9LFxuICAgIEJWOiB7XG4gICAgICAgIG5hbWU6ICdCb3V2ZXQgSXNsYW5kJ1xuICAgIH0sXG4gICAgQlI6IHtcbiAgICAgICAgbmFtZTogJ0JyYXppbCdcbiAgICB9LFxuICAgIElPOiB7XG4gICAgICAgIG5hbWU6ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknXG4gICAgfSxcbiAgICBCTjoge1xuICAgICAgICBuYW1lOiAnQnJ1bmVpIERhcnVzc2FsYW0nXG4gICAgfSxcbiAgICBCRzoge1xuICAgICAgICBuYW1lOiAnQnVsZ2FyaWEnXG4gICAgfSxcbiAgICBCRjoge1xuICAgICAgICBuYW1lOiAnQnVya2luYSBGYXNvJ1xuICAgIH0sXG4gICAgQkk6IHtcbiAgICAgICAgbmFtZTogJ0J1cnVuZGknXG4gICAgfSxcbiAgICBLSDoge1xuICAgICAgICBuYW1lOiAnQ2FtYm9kaWEnXG4gICAgfSxcbiAgICBDTToge1xuICAgICAgICBuYW1lOiAnQ2FtZXJvb24nXG4gICAgfSxcbiAgICBDQToge1xuICAgICAgICBuYW1lOiAnQ2FuYWRhJ1xuICAgIH0sXG4gICAgQ1Y6IHtcbiAgICAgICAgbmFtZTogJ0NhcGUgVmVyZGUnXG4gICAgfSxcbiAgICBLWToge1xuICAgICAgICBuYW1lOiAnQ2F5bWFuIElzbGFuZHMnXG4gICAgfSxcbiAgICBDRjoge1xuICAgICAgICBuYW1lOiAnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJ1xuICAgIH0sXG4gICAgVEQ6IHtcbiAgICAgICAgbmFtZTogJ0NoYWQnXG4gICAgfSxcbiAgICBDTDoge1xuICAgICAgICBuYW1lOiAnQ2hpbGUnXG4gICAgfSxcbiAgICBDTjoge1xuICAgICAgICBuYW1lOiAnQ2hpbmEnXG4gICAgfSxcbiAgICBDWDoge1xuICAgICAgICBuYW1lOiAnQ2hyaXN0bWFzIElzbGFuZCdcbiAgICB9LFxuICAgIENDOiB7XG4gICAgICAgIG5hbWU6ICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcydcbiAgICB9LFxuICAgIENPOiB7XG4gICAgICAgIG5hbWU6ICdDb2xvbWJpYSdcbiAgICB9LFxuICAgIEtNOiB7XG4gICAgICAgIG5hbWU6ICdDb21vcm9zJ1xuICAgIH0sXG4gICAgQ0c6IHtcbiAgICAgICAgbmFtZTogJ0NvbmdvJ1xuICAgIH0sXG4gICAgQ0Q6IHtcbiAgICAgICAgbmFtZTogJ0NvbmdvLCB0aGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUnXG4gICAgfSxcbiAgICBDSzoge1xuICAgICAgICBuYW1lOiAnQ29vayBJc2xhbmRzJ1xuICAgIH0sXG4gICAgQ1I6IHtcbiAgICAgICAgbmFtZTogJ0Nvc3RhIFJpY2EnXG4gICAgfSxcbiAgICBDSToge1xuICAgICAgICBuYW1lOiAnQ8O0dGUgZFxcJ0l2b2lyZSdcbiAgICB9LFxuICAgIEhSOiB7XG4gICAgICAgIG5hbWU6ICdDcm9hdGlhJ1xuICAgIH0sXG4gICAgQ1U6IHtcbiAgICAgICAgbmFtZTogJ0N1YmEnXG4gICAgfSxcbiAgICBDVzoge1xuICAgICAgICBuYW1lOiAnQ3VyYcOnYW8nXG4gICAgfSxcbiAgICBDWToge1xuICAgICAgICBuYW1lOiAnQ3lwcnVzJ1xuICAgIH0sXG4gICAgQ1o6IHtcbiAgICAgICAgbmFtZTogJ0N6ZWNoIFJlcHVibGljJ1xuICAgIH0sXG4gICAgREs6IHtcbiAgICAgICAgbmFtZTogJ0Rlbm1hcmsnXG4gICAgfSxcbiAgICBESjoge1xuICAgICAgICBuYW1lOiAnRGppYm91dGknXG4gICAgfSxcbiAgICBETToge1xuICAgICAgICBuYW1lOiAnRG9taW5pY2EnXG4gICAgfSxcbiAgICBETzoge1xuICAgICAgICBuYW1lOiAnRG9taW5pY2FuIFJlcHVibGljJ1xuICAgIH0sXG4gICAgRUM6IHtcbiAgICAgICAgbmFtZTogJ0VjdWFkb3InXG4gICAgfSxcbiAgICBFRzoge1xuICAgICAgICBuYW1lOiAnRWd5cHQnXG4gICAgfSxcbiAgICBTVjoge1xuICAgICAgICBuYW1lOiAnRWwgU2FsdmFkb3InXG4gICAgfSxcbiAgICBHUToge1xuICAgICAgICBuYW1lOiAnRXF1YXRvcmlhbCBHdWluZWEnXG4gICAgfSxcbiAgICBFUjoge1xuICAgICAgICBuYW1lOiAnRXJpdHJlYSdcbiAgICB9LFxuICAgIEVFOiB7XG4gICAgICAgIG5hbWU6ICdFc3RvbmlhJ1xuICAgIH0sXG4gICAgRVQ6IHtcbiAgICAgICAgbmFtZTogJ0V0aGlvcGlhJ1xuICAgIH0sXG4gICAgRks6IHtcbiAgICAgICAgbmFtZTogJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKSdcbiAgICB9LFxuICAgIEZPOiB7XG4gICAgICAgIG5hbWU6ICdGYXJvZSBJc2xhbmRzJ1xuICAgIH0sXG4gICAgRko6IHtcbiAgICAgICAgbmFtZTogJ0ZpamknXG4gICAgfSxcbiAgICBGSToge1xuICAgICAgICBuYW1lOiAnRmlubGFuZCdcbiAgICB9LFxuICAgIEZSOiB7XG4gICAgICAgIG5hbWU6ICdGcmFuY2UnXG4gICAgfSxcbiAgICBHRjoge1xuICAgICAgICBuYW1lOiAnRnJlbmNoIEd1aWFuYSdcbiAgICB9LFxuICAgIFBGOiB7XG4gICAgICAgIG5hbWU6ICdGcmVuY2ggUG9seW5lc2lhJ1xuICAgIH0sXG4gICAgVEY6IHtcbiAgICAgICAgbmFtZTogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcydcbiAgICB9LFxuICAgIEdBOiB7XG4gICAgICAgIG5hbWU6ICdHYWJvbidcbiAgICB9LFxuICAgIEdNOiB7XG4gICAgICAgIG5hbWU6ICdHYW1iaWEnXG4gICAgfSxcbiAgICBHRToge1xuICAgICAgICBuYW1lOiAnR2VvcmdpYSdcbiAgICB9LFxuICAgIERFOiB7XG4gICAgICAgIG5hbWU6ICdHZXJtYW55J1xuICAgIH0sXG4gICAgR0g6IHtcbiAgICAgICAgbmFtZTogJ0doYW5hJ1xuICAgIH0sXG4gICAgR0k6IHtcbiAgICAgICAgbmFtZTogJ0dpYnJhbHRhcidcbiAgICB9LFxuICAgIEdSOiB7XG4gICAgICAgIG5hbWU6ICdHcmVlY2UnXG4gICAgfSxcbiAgICBHTDoge1xuICAgICAgICBuYW1lOiAnR3JlZW5sYW5kJ1xuICAgIH0sXG4gICAgR0Q6IHtcbiAgICAgICAgbmFtZTogJ0dyZW5hZGEnXG4gICAgfSxcbiAgICBHUDoge1xuICAgICAgICBuYW1lOiAnR3VhZGVsb3VwZSdcbiAgICB9LFxuICAgIEdVOiB7XG4gICAgICAgIG5hbWU6ICdHdWFtJ1xuICAgIH0sXG4gICAgR1Q6IHtcbiAgICAgICAgbmFtZTogJ0d1YXRlbWFsYSdcbiAgICB9LFxuICAgIEdHOiB7XG4gICAgICAgIG5hbWU6ICdHdWVybnNleSdcbiAgICB9LFxuICAgIEdOOiB7XG4gICAgICAgIG5hbWU6ICdHdWluZWEnXG4gICAgfSxcbiAgICBHVzoge1xuICAgICAgICBuYW1lOiAnR3VpbmVhLUJpc3NhdSdcbiAgICB9LFxuICAgIEdZOiB7XG4gICAgICAgIG5hbWU6ICdHdXlhbmEnXG4gICAgfSxcbiAgICBIVDoge1xuICAgICAgICBuYW1lOiAnSGFpdGknXG4gICAgfSxcbiAgICBITToge1xuICAgICAgICBuYW1lOiAnSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgVkE6IHtcbiAgICAgICAgbmFtZTogJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJ1xuICAgIH0sXG4gICAgSE46IHtcbiAgICAgICAgbmFtZTogJ0hvbmR1cmFzJ1xuICAgIH0sXG4gICAgSEs6IHtcbiAgICAgICAgbmFtZTogJ0hvbmcgS29uZydcbiAgICB9LFxuICAgIEhVOiB7XG4gICAgICAgIG5hbWU6ICdIdW5nYXJ5J1xuICAgIH0sXG4gICAgSVM6IHtcbiAgICAgICAgbmFtZTogJ0ljZWxhbmQnXG4gICAgfSxcbiAgICBJTjoge1xuICAgICAgICBuYW1lOiAnSW5kaWEnXG4gICAgfSxcbiAgICBJRDoge1xuICAgICAgICBuYW1lOiAnSW5kb25lc2lhJ1xuICAgIH0sXG4gICAgSVI6IHtcbiAgICAgICAgbmFtZTogJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBJUToge1xuICAgICAgICBuYW1lOiAnSXJhcSdcbiAgICB9LFxuICAgIElFOiB7XG4gICAgICAgIG5hbWU6ICdJcmVsYW5kJ1xuICAgIH0sXG4gICAgSU06IHtcbiAgICAgICAgbmFtZTogJ0lzbGUgb2YgTWFuJ1xuICAgIH0sXG4gICAgSUw6IHtcbiAgICAgICAgbmFtZTogJ0lzcmFlbCdcbiAgICB9LFxuICAgIElUOiB7XG4gICAgICAgIG5hbWU6ICdJdGFseSdcbiAgICB9LFxuICAgIEpNOiB7XG4gICAgICAgIG5hbWU6ICdKYW1haWNhJ1xuICAgIH0sXG4gICAgSlA6IHtcbiAgICAgICAgbmFtZTogJ0phcGFuJ1xuICAgIH0sXG4gICAgSkU6IHtcbiAgICAgICAgbmFtZTogJ0plcnNleSdcbiAgICB9LFxuICAgIEpPOiB7XG4gICAgICAgIG5hbWU6ICdKb3JkYW4nXG4gICAgfSxcbiAgICBLWjoge1xuICAgICAgICBuYW1lOiAnS2F6YWtoc3RhbidcbiAgICB9LFxuICAgIEtFOiB7XG4gICAgICAgIG5hbWU6ICdLZW55YSdcbiAgICB9LFxuICAgIEtJOiB7XG4gICAgICAgIG5hbWU6ICdLaXJpYmF0aSdcbiAgICB9LFxuICAgIEtQOiB7XG4gICAgICAgIG5hbWU6ICdLb3JlYSBEZW1vY3JhdGljIFBlb3BsZVxcJ3MgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBLUjoge1xuICAgICAgICBuYW1lOiAnS29yZWEgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBLVzoge1xuICAgICAgICBuYW1lOiAnS3V3YWl0J1xuICAgIH0sXG4gICAgS0c6IHtcbiAgICAgICAgbmFtZTogJ0t5cmd5enN0YW4nXG4gICAgfSxcbiAgICBMQToge1xuICAgICAgICBuYW1lOiAnTGFvIFBlb3BsZVxcJ3MgRGVtb2NyYXRpYyBSZXB1YmxpYydcbiAgICB9LFxuICAgIExWOiB7XG4gICAgICAgIG5hbWU6ICdMYXR2aWEnXG4gICAgfSxcbiAgICBMQjoge1xuICAgICAgICBuYW1lOiAnTGViYW5vbidcbiAgICB9LFxuICAgIExTOiB7XG4gICAgICAgIG5hbWU6ICdMZXNvdGhvJ1xuICAgIH0sXG4gICAgTFI6IHtcbiAgICAgICAgbmFtZTogJ0xpYmVyaWEnXG4gICAgfSxcbiAgICBMWToge1xuICAgICAgICBuYW1lOiAnTGlieWEnXG4gICAgfSxcbiAgICBMSToge1xuICAgICAgICBuYW1lOiAnTGllY2h0ZW5zdGVpbidcbiAgICB9LFxuICAgIExUOiB7XG4gICAgICAgIG5hbWU6ICdMaXRodWFuaWEnXG4gICAgfSxcbiAgICBMVToge1xuICAgICAgICBuYW1lOiAnTHV4ZW1ib3VyZydcbiAgICB9LFxuICAgIE1POiB7XG4gICAgICAgIG5hbWU6ICdNYWNhbydcbiAgICB9LFxuICAgIE1LOiB7XG4gICAgICAgIG5hbWU6ICdNYWNlZG9uaWEsIHRoZSBmb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBNRzoge1xuICAgICAgICBuYW1lOiAnTWFkYWdhc2NhcidcbiAgICB9LFxuICAgIE1XOiB7XG4gICAgICAgIG5hbWU6ICdNYWxhd2knXG4gICAgfSxcbiAgICBNWToge1xuICAgICAgICBuYW1lOiAnTWFsYXlzaWEnXG4gICAgfSxcbiAgICBNVjoge1xuICAgICAgICBuYW1lOiAnTWFsZGl2ZXMnXG4gICAgfSxcbiAgICBNTDoge1xuICAgICAgICBuYW1lOiAnTWFsaSdcbiAgICB9LFxuICAgIE1UOiB7XG4gICAgICAgIG5hbWU6ICdNYWx0YSdcbiAgICB9LFxuICAgIE1IOiB7XG4gICAgICAgIG5hbWU6ICdNYXJzaGFsbCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgTVE6IHtcbiAgICAgICAgbmFtZTogJ01hcnRpbmlxdWUnXG4gICAgfSxcbiAgICBNUjoge1xuICAgICAgICBuYW1lOiAnTWF1cml0YW5pYSdcbiAgICB9LFxuICAgIE1VOiB7XG4gICAgICAgIG5hbWU6ICdNYXVyaXRpdXMnXG4gICAgfSxcbiAgICBZVDoge1xuICAgICAgICBuYW1lOiAnTWF5b3R0ZSdcbiAgICB9LFxuICAgIE1YOiB7XG4gICAgICAgIG5hbWU6ICdNZXhpY28nXG4gICAgfSxcbiAgICBGTToge1xuICAgICAgICBuYW1lOiAnTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZidcbiAgICB9LFxuICAgIE1EOiB7XG4gICAgICAgIG5hbWU6ICdNb2xkb3ZhLCBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIE1DOiB7XG4gICAgICAgIG5hbWU6ICdNb25hY28nXG4gICAgfSxcbiAgICBNTjoge1xuICAgICAgICBuYW1lOiAnTW9uZ29saWEnXG4gICAgfSxcbiAgICBNRToge1xuICAgICAgICBuYW1lOiAnTW9udGVuZWdybydcbiAgICB9LFxuICAgIE1TOiB7XG4gICAgICAgIG5hbWU6ICdNb250c2VycmF0J1xuICAgIH0sXG4gICAgTUE6IHtcbiAgICAgICAgbmFtZTogJ01vcm9jY28nXG4gICAgfSxcbiAgICBNWjoge1xuICAgICAgICBuYW1lOiAnTW96YW1iaXF1ZSdcbiAgICB9LFxuICAgIE1NOiB7XG4gICAgICAgIG5hbWU6ICdNeWFubWFyJ1xuICAgIH0sXG4gICAgTkE6IHtcbiAgICAgICAgbmFtZTogJ05hbWliaWEnXG4gICAgfSxcbiAgICBOUjoge1xuICAgICAgICBuYW1lOiAnTmF1cnUnXG4gICAgfSxcbiAgICBOUDoge1xuICAgICAgICBuYW1lOiAnTmVwYWwnXG4gICAgfSxcbiAgICBOTDoge1xuICAgICAgICBuYW1lOiAnTmV0aGVybGFuZHMnXG4gICAgfSxcbiAgICBOQzoge1xuICAgICAgICBuYW1lOiAnTmV3IENhbGVkb25pYSdcbiAgICB9LFxuICAgIE5aOiB7XG4gICAgICAgIG5hbWU6ICdOZXcgWmVhbGFuZCdcbiAgICB9LFxuICAgIE5JOiB7XG4gICAgICAgIG5hbWU6ICdOaWNhcmFndWEnXG4gICAgfSxcbiAgICBORToge1xuICAgICAgICBuYW1lOiAnTmlnZXInXG4gICAgfSxcbiAgICBORzoge1xuICAgICAgICBuYW1lOiAnTmlnZXJpYSdcbiAgICB9LFxuICAgIE5VOiB7XG4gICAgICAgIG5hbWU6ICdOaXVlJ1xuICAgIH0sXG4gICAgTkY6IHtcbiAgICAgICAgbmFtZTogJ05vcmZvbGsgSXNsYW5kJ1xuICAgIH0sXG4gICAgTVA6IHtcbiAgICAgICAgbmFtZTogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcydcbiAgICB9LFxuICAgIE5POiB7XG4gICAgICAgIG5hbWU6ICdOb3J3YXknXG4gICAgfSxcbiAgICBPTToge1xuICAgICAgICBuYW1lOiAnT21hbidcbiAgICB9LFxuICAgIFBLOiB7XG4gICAgICAgIG5hbWU6ICdQYWtpc3RhbidcbiAgICB9LFxuICAgIFBXOiB7XG4gICAgICAgIG5hbWU6ICdQYWxhdSdcbiAgICB9LFxuICAgIFBTOiB7XG4gICAgICAgIG5hbWU6ICdQYWxlc3RpbmlhbiBUZXJyaXRvcnknXG4gICAgfSxcbiAgICBQQToge1xuICAgICAgICBuYW1lOiAnUGFuYW1hJ1xuICAgIH0sXG4gICAgUEc6IHtcbiAgICAgICAgbmFtZTogJ1BhcHVhIE5ldyBHdWluZWEnXG4gICAgfSxcbiAgICBQWToge1xuICAgICAgICBuYW1lOiAnUGFyYWd1YXknXG4gICAgfSxcbiAgICBQRToge1xuICAgICAgICBuYW1lOiAnUGVydSdcbiAgICB9LFxuICAgIFBIOiB7XG4gICAgICAgIG5hbWU6ICdQaGlsaXBwaW5lcydcbiAgICB9LFxuICAgIFBOOiB7XG4gICAgICAgIG5hbWU6ICdQaXRjYWlybidcbiAgICB9LFxuICAgIFBMOiB7XG4gICAgICAgIG5hbWU6ICdQb2xhbmQnXG4gICAgfSxcbiAgICBQVDoge1xuICAgICAgICBuYW1lOiAnUG9ydHVnYWwnXG4gICAgfSxcbiAgICBQUjoge1xuICAgICAgICBuYW1lOiAnUHVlcnRvIFJpY28nXG4gICAgfSxcbiAgICBRQToge1xuICAgICAgICBuYW1lOiAnUWF0YXInXG4gICAgfSxcbiAgICBSRToge1xuICAgICAgICBuYW1lOiAnUsOpdW5pb24nXG4gICAgfSxcbiAgICBSTzoge1xuICAgICAgICBuYW1lOiAnUm9tYW5pYSdcbiAgICB9LFxuICAgIFJVOiB7XG4gICAgICAgIG5hbWU6ICdSdXNzaWFuIEZlZGVyYXRpb24nXG4gICAgfSxcbiAgICBSVzoge1xuICAgICAgICBuYW1lOiAnUndhbmRhJ1xuICAgIH0sXG4gICAgQkw6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEJhcnRow6lsZW15J1xuICAgIH0sXG4gICAgU0g6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJ1xuICAgIH0sXG4gICAgS046IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEtpdHRzIGFuZCBOZXZpcydcbiAgICB9LFxuICAgIExDOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBMdWNpYSdcbiAgICB9LFxuICAgIE1GOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KSdcbiAgICB9LFxuICAgIFBNOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJ1xuICAgIH0sXG4gICAgVkM6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJ1xuICAgIH0sXG4gICAgV1M6IHtcbiAgICAgICAgbmFtZTogJ1NhbW9hJ1xuICAgIH0sXG4gICAgU006IHtcbiAgICAgICAgbmFtZTogJ1NhbiBNYXJpbm8nXG4gICAgfSxcbiAgICBTVDoge1xuICAgICAgICBuYW1lOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJ1xuICAgIH0sXG4gICAgU0E6IHtcbiAgICAgICAgbmFtZTogJ1NhdWRpIEFyYWJpYSdcbiAgICB9LFxuICAgIFNOOiB7XG4gICAgICAgIG5hbWU6ICdTZW5lZ2FsJ1xuICAgIH0sXG4gICAgUlM6IHtcbiAgICAgICAgbmFtZTogJ1NlcmJpYSdcbiAgICB9LFxuICAgIFNDOiB7XG4gICAgICAgIG5hbWU6ICdTZXljaGVsbGVzJ1xuICAgIH0sXG4gICAgU0w6IHtcbiAgICAgICAgbmFtZTogJ1NpZXJyYSBMZW9uZSdcbiAgICB9LFxuICAgIFNHOiB7XG4gICAgICAgIG5hbWU6ICdTaW5nYXBvcmUnXG4gICAgfSxcbiAgICBTWDoge1xuICAgICAgICBuYW1lOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KSdcbiAgICB9LFxuICAgIFNLOiB7XG4gICAgICAgIG5hbWU6ICdTbG92YWtpYSdcbiAgICB9LFxuICAgIFNJOiB7XG4gICAgICAgIG5hbWU6ICdTbG92ZW5pYSdcbiAgICB9LFxuICAgIFNCOiB7XG4gICAgICAgIG5hbWU6ICdTb2xvbW9uIElzbGFuZHMnXG4gICAgfSxcbiAgICBTTzoge1xuICAgICAgICBuYW1lOiAnU29tYWxpYSdcbiAgICB9LFxuICAgIFpBOiB7XG4gICAgICAgIG5hbWU6ICdTb3V0aCBBZnJpY2EnXG4gICAgfSxcbiAgICBHUzoge1xuICAgICAgICBuYW1lOiAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnXG4gICAgfSxcbiAgICBTUzoge1xuICAgICAgICBuYW1lOiAnU291dGggU3VkYW4nXG4gICAgfSxcbiAgICBFUzoge1xuICAgICAgICBuYW1lOiAnU3BhaW4nXG4gICAgfSxcbiAgICBMSzoge1xuICAgICAgICBuYW1lOiAnU3JpIExhbmthJ1xuICAgIH0sXG4gICAgU0Q6IHtcbiAgICAgICAgbmFtZTogJ1N1ZGFuJ1xuICAgIH0sXG4gICAgU1I6IHtcbiAgICAgICAgbmFtZTogJ1N1cmluYW1lJ1xuICAgIH0sXG4gICAgU0o6IHtcbiAgICAgICAgbmFtZTogJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nXG4gICAgfSxcbiAgICBTWjoge1xuICAgICAgICBuYW1lOiAnU3dhemlsYW5kJ1xuICAgIH0sXG4gICAgU0U6IHtcbiAgICAgICAgbmFtZTogJ1N3ZWRlbidcbiAgICB9LFxuICAgIENIOiB7XG4gICAgICAgIG5hbWU6ICdTd2l0emVybGFuZCdcbiAgICB9LFxuICAgIFNZOiB7XG4gICAgICAgIG5hbWU6ICdTeXJpYW4gQXJhYiBSZXB1YmxpYydcbiAgICB9LFxuICAgIFRXOiB7XG4gICAgICAgIG5hbWU6ICdUYWl3YW4nXG4gICAgfSxcbiAgICBUSjoge1xuICAgICAgICBuYW1lOiAnVGFqaWtpc3RhbidcbiAgICB9LFxuICAgIFRaOiB7XG4gICAgICAgIG5hbWU6ICdUYW56YW5pYSBVbml0ZWQgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBUSDoge1xuICAgICAgICBuYW1lOiAnVGhhaWxhbmQnXG4gICAgfSxcbiAgICBUTDoge1xuICAgICAgICBuYW1lOiAnVGltb3ItTGVzdGUnXG4gICAgfSxcbiAgICBURzoge1xuICAgICAgICBuYW1lOiAnVG9nbydcbiAgICB9LFxuICAgIFRLOiB7XG4gICAgICAgIG5hbWU6ICdUb2tlbGF1J1xuICAgIH0sXG4gICAgVE86IHtcbiAgICAgICAgbmFtZTogJ1RvbmdhJ1xuICAgIH0sXG4gICAgVFQ6IHtcbiAgICAgICAgbmFtZTogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nXG4gICAgfSxcbiAgICBUTjoge1xuICAgICAgICBuYW1lOiAnVHVuaXNpYSdcbiAgICB9LFxuICAgIFRSOiB7XG4gICAgICAgIG5hbWU6ICdUdXJrZXknXG4gICAgfSxcbiAgICBUTToge1xuICAgICAgICBuYW1lOiAnVHVya21lbmlzdGFuJ1xuICAgIH0sXG4gICAgVEM6IHtcbiAgICAgICAgbmFtZTogJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcydcbiAgICB9LFxuICAgIFRWOiB7XG4gICAgICAgIG5hbWU6ICdUdXZhbHUnXG4gICAgfSxcbiAgICBVRzoge1xuICAgICAgICBuYW1lOiAnVWdhbmRhJ1xuICAgIH0sXG4gICAgVUE6IHtcbiAgICAgICAgbmFtZTogJ1VrcmFpbmUnXG4gICAgfSxcbiAgICBBRToge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnXG4gICAgfSxcbiAgICBHQjoge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIEtpbmdkb20nXG4gICAgfSxcbiAgICBVUzoge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIFN0YXRlcydcbiAgICB9LFxuICAgIFVNOiB7XG4gICAgICAgIG5hbWU6ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnXG4gICAgfSxcbiAgICBVWToge1xuICAgICAgICBuYW1lOiAnVXJ1Z3VheSdcbiAgICB9LFxuICAgIFVaOiB7XG4gICAgICAgIG5hbWU6ICdVemJla2lzdGFuJ1xuICAgIH0sXG4gICAgVlU6IHtcbiAgICAgICAgbmFtZTogJ1ZhbnVhdHUnXG4gICAgfSxcbiAgICBWRToge1xuICAgICAgICBuYW1lOiAnVmVuZXp1ZWxhLCBCb2xpdmFyaWFuIFJlcHVibGljIG9mJ1xuICAgIH0sXG4gICAgVk46IHtcbiAgICAgICAgbmFtZTogJ1ZpZXRuYW0nXG4gICAgfSxcbiAgICBWRzoge1xuICAgICAgICBuYW1lOiAnVmlyZ2luIElzbGFuZHMnXG4gICAgfSxcbiAgICBWSToge1xuICAgICAgICBuYW1lOiAnVmlyZ2luIElzbGFuZHMsIFUuUydcbiAgICB9LFxuICAgIFdGOiB7XG4gICAgICAgIG5hbWU6ICdXYWxsaXMgYW5kIEZ1dHVuYSdcbiAgICB9LFxuICAgIEVIOiB7XG4gICAgICAgIG5hbWU6ICdXZXN0ZXJuIFNhaGFyYSdcbiAgICB9LFxuICAgIFlFOiB7XG4gICAgICAgIG5hbWU6ICdZZW1lbidcbiAgICB9LFxuICAgIFpNOiB7XG4gICAgICAgIG5hbWU6ICdaYW1iaWEnXG4gICAgfSxcbiAgICBaVzoge1xuICAgICAgICBuYW1lOiAnWmltYmFid2UnXG4gICAgfVxufTtcbmNvbnN0IEdMT0JBTCA9IHtcbiAgICBjb21wbGV0ZWRPcmRlcjogbnVsbCxcbiAgICBwaHBEYXRhOiBudWxsLFxuICAgIGxpbmtlZFByb2R1Y3RzSWRzOiBbXVxufTtcbmZ1bmN0aW9uIHBlYWNocGF5QWxlcnQobWVzc2FnZSwgYWN0aW9uID0gJycpIHtcbiAgICBpZiAoR0xPQkFMPy5waHBEYXRhPy5hbGVydFN1cHBvcnQpIHtcbiAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBldmVudDogJ3BlYWNocGF5QWxlcnQnLFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9LCAnKicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKGFjdGlvbiwgJyonKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbWVyKCkge1xuICAgIGNvbnN0IGlGcmFtZVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvbmUtY2xpY2staWZyYW1lJyk/LmNvbnRlbnRXaW5kb3c7XG4gICAgaWYgKCFpRnJhbWVXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmZXRjaFdpbmRvd0RhdGEoaUZyYW1lV2luZG93LCAncHAtZ2V0LWV4aXN0aW5nLWN1c3RvbWVyLWRhdGEnKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldEN1c3RvbWVyKGN1c3RvbWVyKSB7XG4gICAgY29uc3QgaUZyYW1lV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uZS1jbGljay1pZnJhbWUnKT8uY29udGVudFdpbmRvdztcbiAgICBpZiAoIWlGcmFtZVdpbmRvdykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmZXRjaFdpbmRvd0RhdGEoaUZyYW1lV2luZG93LCAncHAtc2V0LWV4aXN0aW5nLWN1c3RvbWVyLWRhdGEnLCBjdXN0b21lcik7XG59XG5mdW5jdGlvbiBjYXJ0SXNWaXJ0dWFsKGNhcnQpIHtcbiAgICBpZiAoY2FydD8ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gY2FydD8uZXZlcnkoKHYpPT52LnZpcnR1YWxcbiAgICApID8/IHRydWU7XG59XG5mdW5jdGlvbiBpdGVtc0luQ2FydChjYXJ0KSB7XG4gICAgcmV0dXJuIGNhcnQ/Lmxlbmd0aCA/PyAwO1xufVxuZnVuY3Rpb24gY2FydEl0ZW1RdWFudGl0eShjYXJ0SXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgY2FydEl0ZW0/LnF1YW50aXR5ID09PSAnc3RyaW5nJyA/IE51bWJlci5wYXJzZUludChjYXJ0SXRlbS5xdWFudGl0eSkgOiBjYXJ0SXRlbT8ucXVhbnRpdHkgPz8gMDtcbn1cbmZ1bmN0aW9uIHJlc3RyaWN0ZWRDYXJ0UHJvZHVjdHNCeUNvdW50cnkoY2FydCwgc2VsZWN0ZWRDb3VudHJ5Q29kZSkge1xuICAgIHJldHVybiBjYXJ0LmZpbHRlcigodik9PntcbiAgICAgICAgaWYgKHYud2NfY291bnRyeV9iYXNlX3Jlc3RyaWN0aW9ucykge1xuICAgICAgICAgICAgaWYgKHYud2NfY291bnRyeV9iYXNlX3Jlc3RyaWN0aW9ucy50eXBlID09PSAnc3BlY2lmaWMnICYmICF2LndjX2NvdW50cnlfYmFzZV9yZXN0cmljdGlvbnMuY291bnRyaWVzLmluY2x1ZGVzKHNlbGVjdGVkQ291bnRyeUNvZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zLnR5cGUgPT09ICdleGNsdWRlZCcgJiYgdi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zLmNvdW50cmllcy5pbmNsdWRlcyhzZWxlY3RlZENvdW50cnlDb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ2FydEl0ZW1zV2l0aEN1c3RvbWVyKGNhcnQsIHVzZUxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgZ2V0Q3VzdG9tZXIoKTtcbiAgICBjb25zdCBjb3VudHJ5VmFsdWUgPSAkcXMoJyNjb3VudHJ5Jyk/LnZhbHVlID8/ICcnO1xuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UgJiYgY3VzdG9tZXIpIHtcbiAgICAgICAgY29uc3QgaW52YWxpZENhcnRJdGVtcyA9IHJlc3RyaWN0ZWRDYXJ0UHJvZHVjdHNCeUNvdW50cnkoY2FydCwgY3VzdG9tZXIuY291bnRyeSk7XG4gICAgICAgIGlmIChpbnZhbGlkQ2FydEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcGVhY2hwYXlBbGVydChgVGhlIGZvbGxvd2luZyBjYXJ0IGl0ZW1zIGNhbm5vdCBiZSBzaGlwcGVkIHRvICR7Z2V0Q291bnRyeU5hbWUoY291bnRyeVZhbHVlKX06XFxuICR7aW52YWxpZENhcnRJdGVtcy5tYXAoKHYpPT52Lm5hbWVcbiAgICAgICAgKS5qb2luKCcsJyl9LlxcbiBQbGVhc2UgcmVtb3ZlIHRoZW0gZnJvbSB5b3VyIGNhcnQuYCwgJ2Nsb3NlTW9kYWwnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkQ2FydEl0ZW1zID0gcmVzdHJpY3RlZENhcnRQcm9kdWN0c0J5Q291bnRyeShjYXJ0LCBjb3VudHJ5VmFsdWUpO1xuICAgIGlmIChpbnZhbGlkQ2FydEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGVhY2hwYXlBbGVydChgVGhlIGZvbGxvd2luZyBjYXJ0IGl0ZW1zIGNhbm5vdCBiZSBzaGlwcGVkIHRvICR7Z2V0Q291bnRyeU5hbWUoY291bnRyeVZhbHVlKX06XFxuICR7aW52YWxpZENhcnRJdGVtcy5tYXAoKHYpPT52Lm5hbWVcbiAgICApLmpvaW4oJywnKX0uXFxuIFBsZWFzZSByZW1vdmUgdGhlbSBmcm9tIHlvdXIgY2FydC5gLCAnY2xvc2VNb2RhbCcpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGJ1aWxkU3Vic2NyaXB0aW9uUHJpY2VNZXRhRGF0YShtZXRhLCBfX3Nob3J0ID0gZmFsc2UpIHtcbiAgICBpZiAoIW1ldGEuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKE51bWJlci5wYXJzZUludChTdHJpbmcobWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kX2ludGVydmFsKSkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGAgLyAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1gO1xuICAgIH1cbiAgICBpZiAoX19zaG9ydCkge1xuICAgICAgICByZXR1cm4gYCBldmVyeSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZF9pbnRlcnZhbH0gJHttZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2R9c2A7XG4gICAgfVxuICAgIHJldHVybiBgIGV2ZXJ5ICR7bWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kX2ludGVydmFsfSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1zIGZvciAke21ldGEuc3Vic2NyaXB0aW9uLmxlbmd0aH0gJHttZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2R9c2A7XG59XG5mdW5jdGlvbiBidWlsZFN1YnNjcmlwdGlvbkZpcnN0UmVuZXdhbFN0cmluZyhtZXRhKSB7XG4gICAgaWYgKCFtZXRhLnN1YnNjcmlwdGlvbiB8fCAhbWV0YS5zdWJzY3JpcHRpb24uZmlyc3RfcmVuZXdhbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShtZXRhLnN1YnNjcmlwdGlvbi5maXJzdF9yZW5ld2FsKTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfTtcbiAgICByZXR1cm4gYEZpcnN0IHJlbmV3YWw6ICR7ZGF0ZS50b0xvY2FsZVN0cmluZyhFbnZpcm9ubWVudC5sYW5ndWFnZSgpLCBvcHRpb25zKX1gO1xufVxuZnVuY3Rpb24gaW5pdE1lcmNoYW50QWNjb3VudChtZXNzYWdlKSB7XG4gICAgaW5pdE1lcmNoYW50QWNjb3VudEV2ZW50cygpO1xuICAgIGNvbnN0IGFjY291bnREZXRhaWxzID0gbWVzc2FnZS5waHBEYXRhLm1lcmNoYW50X2N1c3RvbWVyX2FjY291bnQ7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRBY2NvdW50Q29uZmlnKHtcbiAgICAgICAgYWxsb3dHdWVzdENoZWNrb3V0OiBhY2NvdW50RGV0YWlscz8uYWxsb3dfZ3Vlc3RfY2hlY2tvdXQgPz8gdHJ1ZSxcbiAgICAgICAgYWxsb3dBY2NvdW50Q3JlYXRpb25PckxvZ2luRHVyaW5nQ2hlY2tvdXQ6IGFjY291bnREZXRhaWxzPy5sb2dpbnNfYW5kX3JlZ2lzdHJhdGlvbnNfZW5hYmxlZCA/PyB0cnVlLFxuICAgICAgICBhdXRvR2VuZXJhdGVVc2VybmFtZTogYWNjb3VudERldGFpbHM/LmF1dG9fZ2VuZXJhdGVfdXNlcm5hbWUgPz8gZmFsc2UsXG4gICAgICAgIGF1dG9HZW5lcmF0ZVBhc3N3b3JkOiBhY2NvdW50RGV0YWlscz8uYXV0b19nZW5lcmF0ZV9wYXNzd29yZCA/PyBmYWxzZVxuICAgIH0pKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudCh7XG4gICAgICAgIHVzZXJuYW1lOiBhY2NvdW50RGV0YWlscy5lbWFpbCA/PyAnJyxcbiAgICAgICAgbG9nZ2VkSW46IGFjY291bnREZXRhaWxzLmxvZ2dlZF9pbiA/PyBmYWxzZSxcbiAgICAgICAgdXNlcm5hbWVJc1JlZ2lzdGVyZWQ6IGFjY291bnREZXRhaWxzLmxvZ2dlZF9pbiA/PyBmYWxzZVxuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGluaXRNZXJjaGFudEFjY291bnRFdmVudHMoKSB7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlck1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRJbnB1dChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgIUVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkgJiYgRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkgPT09ICdwYXltZW50Jyk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmVxdWVzdE1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShQZWFjaFBheUN1c3RvbWVyLmVtYWlsKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnZW1haWxFeGlzdCcsIChtZXNzYWdlKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShCb29sZWFuKG1lc3NhZ2UuZW1haWxSZXN1bHQpKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZXF1ZXN0TWVyY2hhbnRBY2NvdW50RXhpc3RlbmNlKGVtYWlsKSB7XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogJ2VtYWlsRXhpc3QnLFxuICAgICAgICBlbWFpbFxuICAgIH0sICcqJyk7XG59XG5mdW5jdGlvbiBnZXRNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkVmFsdWUoKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZCcpO1xuICAgIGNvbnN0ICRpbnB1dEV4aXN0aW5nID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZC1leGlzdGluZycpO1xuICAgIGlmICghJGlucHV0IHx8ICEkaW5wdXRFeGlzdGluZykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICgkaW5wdXRFeGlzdGluZy52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgcmV0dXJuICRpbnB1dEV4aXN0aW5nLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gJGlucHV0LnZhbHVlO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVNZXJjaGFudEN1c3RvbWVyUGFzc3dvcmRGaWVsZCgpIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpO1xuICAgIGNvbnN0ICRyZWRUZXh0ID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZC1lcnJvcicpO1xuICAgIGNvbnN0ICRyZWRUZXh0RXhpc3RpbmcgPSAkcXMoJyNhY2NvdW50LXBhc3N3b3JkLWVycm9yLWV4aXN0aW5nJyk7XG4gICAgaWYgKCEkcmVkVGV4dCB8fCAhJHJlZFRleHRFeGlzdGluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwYXNzd29yZCA9PT0gJycgfHwgcGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgICAkcmVkVGV4dC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ2ludmFsaWQtbWVyY2hhbnQtcGFzc3dvcmQnKTtcbiAgICAgICAgJHJlZFRleHRFeGlzdGluZy50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ2ludmFsaWQtbWVyY2hhbnQtcGFzc3dvcmQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkcmVkVGV4dC50ZXh0Q29udGVudCA9ICcnO1xuICAgICRyZWRUZXh0RXhpc3RpbmcudGV4dENvbnRlbnQgPSAnJztcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNob3VsZFNob3dNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkRmllbGQoKSB7XG4gICAgaWYgKE1lcmNoYW50Q3VzdG9tZXIubG9nZ2VkSW4oKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghQ2FydHMuc3Vic2NyaXB0aW9uUHJlc2VudCgpKSB7XG4gICAgICAgIGlmICghTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmFsbG93R3Vlc3RDaGVja291dCgpKSB7XG4gICAgICAgICAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmdlbmVyYXRlUGFzc3dvcmRFbmFibGVkKCkgJiYgIU1lcmNoYW50Q3VzdG9tZXIudXNlcm5hbWVFeGlzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmxvZ2luRHVyaW5nQ2hlY2tvdXRFbmFibGVkKCkgJiYgIU1lcmNoYW50Q3VzdG9tZXIudXNlcm5hbWVFeGlzdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5nZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5nZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gcmVuZGVyTWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZElucHV0KG1lcmNoYW50SG9zdG5hbWUsIG9uTmV3UGF5bWVudFNjcmVlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJHFzKCcjcHAtYWNjb3VudC1wYXNzd29yZCcpO1xuICAgIGNvbnN0ICRpbnB1dEV4aXN0aW5nID0gJHFzKCcjcHAtYWNjb3VudC1wYXNzd29yZC1leGlzdGluZycpO1xuICAgIGlmICghJGlucHV0IHx8ICEkaW5wdXRFeGlzdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICRpbnB1dC52YWx1ZSA9ICcnO1xuICAgICRpbnB1dEV4aXN0aW5nLnZhbHVlID0gJyc7XG4gICAgY29uc3QgbGFiZWxIVE1MID0gZ2V0TG9jYWxlVGV4dCgnYWNjb3VudC1wYXNzd29yZC1leHBsYW5hdGlvbicpICsgJyAnICsgbWVyY2hhbnRIb3N0bmFtZTtcbiAgICAkcXMoJyNwcC1hY2NvdW50LXBhc3N3b3JkLWxhYmVsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxIVE1MXG4gICAgKTtcbiAgICAkcXMoJyNwcC1hY2NvdW50LXBhc3N3b3JkLWxhYmVsLWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxIVE1MXG4gICAgKTtcbiAgICBpZiAoc2hvdWxkU2hvd01lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRGaWVsZCgpKSB7XG4gICAgICAgIGlmIChvbk5ld1BheW1lbnRTY3JlZW4pIHtcbiAgICAgICAgICAgICRpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgICRpbnB1dEV4aXN0aW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkaW5wdXRFeGlzdGluZy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdERlbGl2ZXJ5RGF0ZSgpIHtcbiAgICAkcXMoJyNleGlzdGluZy1kZWxpdmVyeS1kYXRlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoZWNrRGVsaXZlcnlEYXRlSXNWYWxpZCk7XG4gICAgJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVEZWxpdmVyeURhdGUpO1xuICAgICRxcygnI2RlbGl2ZXJ5LWRhdGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hlY2tEZWxpdmVyeURhdGVJc1ZhbGlkKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyRGVsaXZlcnlEYXRlKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjb2xsZWN0RGVsaXZlcnlEYXRlKCkge1xuICAgIHJldHVybiAkcXMoJyNkZWxpdmVyeS1kYXRlJyk/LnZhbHVlID8/ICcnO1xufVxuZnVuY3Rpb24gcmVuZGVyRGVsaXZlcnlEYXRlKCkge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhLnBsdWdpbl93b29jb21tZXJjZV9vcmRlcl9kZWxpdmVyeV9hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXMoJyNleGlzdGluZy1jaGVja291dC1kZWxpdmVyeS1kYXRlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAkcXMoJyNjaGVja291dC1kZWxpdmVyeS1kYXRlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25zdCB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1heERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIG1heERhdGUuc2V0RGF0ZSh0b2RheURhdGUuZ2V0RGF0ZSgpICsgKEdMT0JBTC5waHBEYXRhLnBsdWdpbl93b29jb21tZXJjZV9vcmRlcl9kZWxpdmVyeV9vcHRpb25zPy53Y19vZF9tYXhfZGVsaXZlcnlfZGF5cyA/PyAwKSk7XG4gICAgY29uc3QgJHNoaXBwaW5nRGF0ZSA9ICRxcygnI2RlbGl2ZXJ5LWRhdGUnKTtcbiAgICBjb25zdCAkZXhpc3RpbmdDdXN0b21lclNoaXBwaW5nRGF0ZSA9ICRxcygnI2V4aXN0aW5nLWRlbGl2ZXJ5LWRhdGUnKTtcbiAgICBpZiAoISRzaGlwcGluZ0RhdGUgfHwgISRleGlzdGluZ0N1c3RvbWVyU2hpcHBpbmdEYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJHNoaXBwaW5nRGF0ZS5yZXF1aXJlZCA9IHRydWU7XG4gICAgJGV4aXN0aW5nQ3VzdG9tZXJTaGlwcGluZ0RhdGUubWluID0gdG9kYXlEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICRzaGlwcGluZ0RhdGUubWluID0gdG9kYXlEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICRleGlzdGluZ0N1c3RvbWVyU2hpcHBpbmdEYXRlLm1heCA9IG1heERhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgJHNoaXBwaW5nRGF0ZS5tYXggPSBtYXhEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xufVxuZnVuY3Rpb24gY2hlY2tEZWxpdmVyeURhdGVJc0VtcHR5KCkge1xuICAgIHJldHVybiAoJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpPy52YWx1ZSA/PyAnJykgPT09ICcnO1xufVxuZnVuY3Rpb24gdXBkYXRlRGVsaXZlcnlEYXRlKCkge1xuICAgIGNvbnN0ICRkZWxpdmVyeURhdGUgPSAkcXMoJyNkZWxpdmVyeS1kYXRlJyk7XG4gICAgaWYgKCEkZGVsaXZlcnlEYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJGRlbGl2ZXJ5RGF0ZS52YWx1ZSA9ICRxcygnI2V4aXN0aW5nLWRlbGl2ZXJ5LWRhdGUnKT8udmFsdWUgPz8gJyc7XG59XG5mdW5jdGlvbiBjaGVja0RlbGl2ZXJ5RGF0ZUlzVmFsaWQoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdmFsaWRhdGVEYXRlSXNBdmFpbGFibGUoZXZlbnQudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgICAgcGVhY2hwYXlBbGVydCgnUGxlYXNlIHNlbGVjdCBhbm90aGVyIGRlbGl2ZXJ5IGRhdGUuJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlSXNBdmFpbGFibGUoZGF0ZVN0cmluZykge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkYXkgPSBuZXcgRGF0ZShkYXRlU3RyaW5nICsgJ1QwMDowMDowMCcpLmdldERheSgpO1xuICAgIHJldHVybiAhR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X29wdGlvbnM/LmRlbGl2ZXJ5X3VuY2hlY2tlZF9kYXk/LmluY2x1ZGVzKFN0cmluZyhkYXkpKTtcbn1cbmZ1bmN0aW9uIGluaXRPcmRlck5vdGVzKCkge1xuICAgIGlmIChGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuT1JERVJfTk9URVMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCcub3JkZXItbm90ZXMnKSl7XG4gICAgICAgICAgICAkZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBjb2xsZWN0T3JkZXJOb3RlcygpIHtcbiAgICBjb25zdCBvcmRlck5vdGVzID0gJHFzKCcjb3JkZXItbm90ZXMnKTtcbiAgICBjb25zdCBvcmRlck5vdGVzRXhpc3RpbmcgPSAkcXMoJyNvcmRlci1ub3Rlcy1leGlzdGluZycpO1xuICAgIGlmIChvcmRlck5vdGVzICE9PSBudWxsICYmIG9yZGVyTm90ZXNFeGlzdGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAob3JkZXJOb3Rlcy52YWx1ZSAhPT0gJycgJiYgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG9yZGVyTm90ZXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyTm90ZXMudmFsdWUgPT09ICcnICYmIG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmRlck5vdGVzRXhpc3RpbmcudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuZnVuY3Rpb24gc3luY09yZGVyTm90ZXMoZXhpdE1vZHVsZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgb3JkZXJOb3Rlc0V4aXN0aW5nID0gJHFzKCcjb3JkZXItbm90ZXMtZXhpc3RpbmcnKTtcbiAgICBjb25zdCBvcmRlck5vdGVzID0gJHFzKCcjb3JkZXItbm90ZXMnKTtcbiAgICBpZiAob3JkZXJOb3RlcyAhPT0gbnVsbCAmJiBvcmRlck5vdGVzRXhpc3RpbmcgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkgJiYgb3JkZXJOb3Rlcy52YWx1ZSAhPT0gJycgJiYgZXhpdE1vZHVsZSkge1xuICAgICAgICAgICAgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlID0gb3JkZXJOb3Rlcy52YWx1ZTtcbiAgICAgICAgICAgIG9yZGVyTm90ZXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlICE9PSAnJyAmJiAhZXhpdE1vZHVsZSkge1xuICAgICAgICAgICAgb3JkZXJOb3Rlcy52YWx1ZSA9IG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZTtcbiAgICAgICAgICAgIG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFZBVChtZXNzYWdlKSB7XG4gICAgaW5pdFZhdEV2ZW50cygpO1xuICAgIGlmIChtZXNzYWdlLnBocERhdGEudmF0X3NlbGZfdmVyaWZ5ID09PSAnMScpIHtcbiAgICAgICAgcmVuZGVyVmVyaWZ5TG9jYXRpb24oKTtcbiAgICB9XG4gICAgY29uc3QgdmF0VHlwZXNSZXF1aXJpbmdJRCA9IG1lc3NhZ2UucGhwRGF0YS52YXRfcmVxdWlyZWQgPT09ICcxJyB8fCBtZXNzYWdlLnBocERhdGEudmF0X3JlcXVpcmVkID09PSAnMicgJiYgaXNFVUNvdW50cnkoUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCkpO1xuICAgIGlmICh2YXRUeXBlc1JlcXVpcmluZ0lEKSB7XG4gICAgICAgIHJlbmRlclZBVElESW5wdXQoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0VmF0RXZlbnRzKCkge1xuICAgICRxcygnI3BwLWluZm8tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpPT57XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHZhdFR5cGVzUmVxdWlyaW5nSUQgPSBHTE9CQUwucGhwRGF0YT8udmF0X3JlcXVpcmVkID09PSAnMScgfHwgR0xPQkFMLnBocERhdGE/LnZhdF9yZXF1aXJlZCA9PT0gJzInICYmIGlzRVVDb3VudHJ5KFBlYWNoUGF5Q3VzdG9tZXIuY291bnRyeSgpKTtcbiAgICAgICAgaWYgKHZhdFR5cGVzUmVxdWlyaW5nSUQpIHtcbiAgICAgICAgICAgIHJlbmRlclZBVElESW5wdXQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyVkFUSURJbnB1dCgpIHtcbiAgICBjb25zdCAkcHJldmlvdXNEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld0VVVmF0RGl2Jyk7XG4gICAgJHByZXZpb3VzRGl2cz8ucmVtb3ZlKCk7XG4gICAgY29uc3QgJEVVVmF0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgJHZhdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgY29uc3QgJHZhdE51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ3JlcXVpcmVkJyk7XG4gICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3ZhdElucHV0Jyk7XG4gICAgY29uc3QgJHByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAkcHJvbXB0LmlubmVySFRNTCA9ICdWYXQgTnVtYmVyJztcbiAgICAkdmF0Rm9ybS5hcHBlbmQoJHZhdE51bWJlcik7XG4gICAgJEVVVmF0RGl2LmFwcGVuZCgkcHJvbXB0KTtcbiAgICAkRVVWYXREaXYuYXBwZW5kKCR2YXRGb3JtKTtcbiAgICAkRVVWYXREaXYuc2V0QXR0cmlidXRlKCdpZCcsICdFdVZhdERpdicpO1xuICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbG9yLWNoYW5nZS10ZXh0Jyk7XG4gICAgbGV0ICRpbnNlcnRpb25Mb2NhdGlvbjtcbiAgICBjb25zdCAkbmV3Q3VzdG9tZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHAtbmV3LWN1c3RvbWVyLWNoZWNrb3V0Jyk7XG4gICAgaWYgKCRuZXdDdXN0b21lcj8uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgJGluc2VydGlvbkxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQnKTtcbiAgICAgICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BwVmF0TnVtRXhpc3RpbmcnKTtcbiAgICAgICAgJEVVVmF0RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29sb3ItY2hhbmdlLXRleHQnKTtcbiAgICAgICAgJGluc2VydGlvbkxvY2F0aW9uPy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgJEVVVmF0RGl2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkaW5zZXJ0aW9uTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF5bWVudC1tZXRob2RzJyk7XG4gICAgICAgICR2YXROdW1iZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcFZhdE51bU5ldycpO1xuICAgICAgICAkRVVWYXREaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICd4LWxhcmdlJyk7XG4gICAgICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25ld0VVVmF0RGl2Jyk7XG4gICAgICAgICRpbnNlcnRpb25Mb2NhdGlvbj8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRFVVZhdERpdik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VmF0TnVtYmVyKCkge1xuICAgIGNvbnN0ICRuZXdDdXN0b21lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKTtcbiAgICBpZiAoJG5ld0N1c3RvbWVyPy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICBjb25zdCAkcHBWYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHBWYXROdW1FeGlzdGluZycpO1xuICAgICAgICBpZiAoISRwcFZhdCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcHBWYXQudmFsdWUgPz8gJyc7XG4gICAgfVxuICAgIGNvbnN0ICRwcFZhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcFZhdE51bU5ldycpO1xuICAgIGlmICghJHBwVmF0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuICRwcFZhdC52YWx1ZSA/PyAnJztcbn1cbmZ1bmN0aW9uIHJlbmRlclZlcmlmeUxvY2F0aW9uKCkge1xuICAgIGNvbnN0ICR2ZXJpZnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCAkdmVyaWZ5Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0ICRkZXNjcmlwdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAkdmVyaWZ5Q2hlY2tib3guc2V0QXR0cmlidXRlKCdpZCcsICdwcF92ZXJpZnlfY291bnRyeScpO1xuICAgICR2ZXJpZnlDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAkdmVyaWZ5Q2hlY2tib3guc2V0QXR0cmlidXRlKCd2YWx1ZScsICcxJyk7XG4gICAgJGRlc2NyaXB0b3Iuc2V0QXR0cmlidXRlKCdmb3InLCAncHBfdmVyaWZ5X2NvdW50cnknKTtcbiAgICAkZGVzY3JpcHRvci5pbm5lckhUTUwgPSBnZXRMb2NhbGVUZXh0KCd2ZXJpZnktbG9jYXRpb24nKTtcbiAgICAkdmVyaWZ5RGl2LmFwcGVuZCgkdmVyaWZ5Q2hlY2tib3gpO1xuICAgICR2ZXJpZnlEaXYuYXBwZW5kKCRkZXNjcmlwdG9yKTtcbiAgICBjb25zdCAkZGl2Q2xvbmUgPSAkdmVyaWZ5RGl2LmNsb25lTm9kZSh0cnVlKTtcbiAgICBjb25zdCAkaW5zZXJ0aW9uTG9jYXRpb24gPSAkcXMoJyNleGlzdGluZy1jaGVja291dC1jYXJkJyk7XG4gICAgY29uc3QgJGluc2VydExvY2F0aW9uMiA9ICRxcygnI3BheW1lbnQtbWV0aG9kcycpO1xuICAgICRpbnNlcnRpb25Mb2NhdGlvbj8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICR2ZXJpZnlEaXYpO1xuICAgICRpbnNlcnRMb2NhdGlvbjI/Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCAkZGl2Q2xvbmUpO1xufVxuZnVuY3Rpb24gZ2V0VmVyaWZ5KCkge1xuICAgIGNvbnN0ICRpc1ZlcmlmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BwX3ZlcmlmeV9jb3VudHJ5Jyk7XG4gICAgaWYgKCRpc1ZlcmlmaWVkWzBdLmNoZWNrZWQgfHwgJGlzVmVyaWZpZWRbMV0uY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gJzEnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5mdW5jdGlvbiBpc0RldkVudmlyb25tZW50KGJhc2VVcmwpIHtcbiAgICByZXR1cm4gYmFzZVVybCA9PT0gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmFwcC8nIHx8IGJhc2VVcmwgPT09ICdodHRwczovL2Rldi5wZWFjaHBheS5sb2NhbC8nIHx8IGJhc2VVcmwgPT09ICdodHRwczovL3Byb2QucGVhY2hwYXkubG9jYWwvJztcbn1cbmZ1bmN0aW9uIGdldEJhc2VVUkwobWVyY2hhbnRIb3N0bmFtZSwgaXNUZXN0TW9kZSkge1xuICAgIGlmIChpc1Rlc3RNb2RlKSB7XG4gICAgICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgICAgIGNhc2UgJ3N0b3JlLmxvY2FsJzpcbiAgICAgICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmFwcC8nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgICAgY2FzZSAnMTI3LjAuMC4xJzpcbiAgICAgICAgY2FzZSAnd29vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTIucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUzLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNC5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTUucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAncWEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAnZGVtby5wZWFjaHBheS5hcHAnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi5wZWFjaHBheS5hcHAvJztcbiAgICAgICAgY2FzZSAnc3RvcmUubG9jYWwnOlxuICAgICAgICBjYXNlICd3b28uc3RvcmUubG9jYWwnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL3Byb2QucGVhY2hwYXkubG9jYWwvJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9wcm9kLnBlYWNocGF5LmFwcC8nO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9uZUNsaWNrVVJMKG1lcmNoYW50SG9zdG5hbWUsIGlzVGVzdE1vZGUpIHtcbiAgICBpZiAoaXNUZXN0TW9kZSkge1xuICAgICAgICBzd2l0Y2gobWVyY2hhbnRIb3N0bmFtZSl7XG4gICAgICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICBjYXNlICd3b28uc3RvcmUubG9jYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYtY29ubmVjdC5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LWNvbm5lY3QtdjIucGVhY2hwYXljaGVja291dC5jb20vJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2gobWVyY2hhbnRIb3N0bmFtZSl7XG4gICAgICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICAgIGNhc2UgJzEyNy4wLjAuMSc6XG4gICAgICAgIGNhc2UgJ3dvby5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUyLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMy5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTQucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWU1LnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3FhLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ2RlbW8ucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYtY29ubmVjdC12Mi5wZWFjaHBheWNoZWNrb3V0LmNvbS8nO1xuICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vY29ubmVjdC5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Nvbm5lY3QtdjIucGVhY2hwYXljaGVja291dC5jb20vJztcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRlcm1pbmVQYWdlVHlwZShpc0NhcnRQYWdlLCBpc0NoZWNrb3V0UGFnZSkge1xuICAgIGlmIChpc0NhcnRQYWdlKSB7XG4gICAgICAgIHJldHVybiAnY2FydCc7XG4gICAgfVxuICAgIGlmIChpc0NoZWNrb3V0UGFnZSkge1xuICAgICAgICByZXR1cm4gJ2NoZWNrb3V0JztcbiAgICB9XG4gICAgcmV0dXJuICdwcm9kdWN0Jztcbn1cbmZ1bmN0aW9uIHN5bmNGaWVsZHMoZXZlbnQpIHtcbiAgICBjb25zdCAkZm9ybSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdmb3JtJyk7XG4gICAgY29uc3QgZmllbGRSZWNvcmQgPSB7fTtcbiAgICBmb3IgKGNvbnN0ICRpbnB1dCBvZiBBcnJheS5mcm9tKCRmb3JtLmVsZW1lbnRzKSl7XG4gICAgICAgIGZpZWxkUmVjb3JkWyRpbnB1dC5uYW1lXSA9ICRpbnB1dC52YWx1ZTtcbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2goc2V0RXh0cmFGaWVsZHMoZmllbGRSZWNvcmQpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckFkZGl0aW9uYWxGaWVsZHMoZmllbGREYXRhLCBmaWVsZE9yZGVyKSB7XG4gICAgaWYgKGZpZWxkRGF0YS5sZW5ndGggPT09IDAgfHwgZmllbGRPcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXMoJyNhZGRpdGlvbmFsLWZpZWxkcy1uZXcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLWV4aXN0aW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgZmllbGRPcmRlcil7XG4gICAgICAgIGlmIChmaWVsZERhdGFbaV0uZmllbGRfZW5hYmxlKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZUZpZWxkcyhmaWVsZERhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzeW5jRmllbGRzKTtcbiAgICAkcXMoJyNhZGRpdGlvbmFsLWZpZWxkcy1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzeW5jRmllbGRzKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyRXh0cmFGaWVsZHMoUGVhY2hQYXlPcmRlci5leHRyYUZpZWxkc1JlY29yZCgpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckV4dHJhRmllbGRzKGV4dHJhRmllbGREYXRhKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZXh0cmFGaWVsZERhdGEpKXtcbiAgICAgICAgJHFzQWxsKGBbbmFtZT1cIiR7a2V5fVwiXS5leHRyYS1maWVsZGAsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUZpZWxkcyhmaWVsZERhdGEpIHtcbiAgICBjb25zdCBmaWVsZCA9IChsb2NhdGlvbik9Pic8ZGl2IGNsYXNzPVwibmV3LWZpZWxkXCI+JyArIGdlbmVyYXRlRmllbGRFbGVtZW50KGxvY2F0aW9uLCBmaWVsZERhdGEpICsgJzwvZGl2PidcbiAgICA7XG4gICAgY29uc3QgbmV3UGFnZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpO1xuICAgIGNvbnN0IGV4c2l0UGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkaXRpb25hbC1maWVsZHMtZXhpc3RpbmcnKTtcbiAgICBpZiAobmV3UGFnZUVsZW1lbnRzKSB7XG4gICAgICAgIG5ld1BhZ2VFbGVtZW50cy5pbm5lckhUTUwgKz0gZmllbGQoJy1uZXcnKTtcbiAgICB9XG4gICAgaWYgKGV4c2l0UGFnZUVsZW1lbnQpIHtcbiAgICAgICAgZXhzaXRQYWdlRWxlbWVudC5pbm5lckhUTUwgKz0gZmllbGQoJy1leGlzdGluZycpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRFbGVtZW50KGxvY2F0aW9uMSwgZmllbGREYXRhKSB7XG4gICAgbGV0IGVsZW1lbnRTdHJpbmcgPSAnJztcbiAgICBjb25zdCBvcHRpb25hbCA9ICc8c3BhbiBjbGFzcz1cIm9wdGlvbmFsXCI+IChvcHRpb25hbCkgPC9zcGFuPic7XG4gICAgY29uc3QgcmVxdWlyZWQgPSAnPGFiYnIgY2xhc3M9XCJyZXF1aXJlZFwiIHRpdGxlPVwicmVxdWlyZWRcIiBzdHlsZT1cImNvbG9yOnJlZDtcIj4qPC9hYmJyPic7XG4gICAgY29uc3QgbGFiZWxCdWlsZGVyID0gKGxvY2F0aW9uKT0+YFxuXHRcdDxsYWJlbCBmb3I9XCIke2ZpZWxkRGF0YS5maWVsZF9uYW1lfSR7bG9jYXRpb259XCIgY2xhc3M9XCJmb3JtLWxhYmVsLSR7ZmllbGREYXRhLnR5cGVfbGlzdH1cIiA+YCArIGAke2ZpZWxkRGF0YS5maWVsZF9sYWJlbH1gICsgKGZpZWxkRGF0YS5maWVsZF9yZXF1aXJlZCA/IHJlcXVpcmVkIDogb3B0aW9uYWwpICsgJzwvbGFiZWw+J1xuICAgIDtcbiAgICBjb25zdCBpbnB1dEJ1aWxkZXIgPSAobG9jYXRpb24pPT5gPGlucHV0IHR5cGU9JHtmaWVsZERhdGEudHlwZV9saXN0fSBcblx0XHRcdG5hbWU9JHtmaWVsZERhdGEuZmllbGRfbmFtZX0gXG5cdFx0XHRpZD1cIiR7ZmllbGREYXRhLmZpZWxkX25hbWV9JHtsb2NhdGlvbn1cIlxuXHRcdFx0cGxhY2Vob2xkZXI9XCIgXCJcblx0XHRcdHZhbHVlPVwiJHtmaWVsZERhdGEuZmllbGRfZGVmYXVsdH1cIiBcblx0XHRcdGNsYXNzPVwiaW5wdXQtYm94LSR7ZmllbGREYXRhLnR5cGVfbGlzdH0gZXh0cmEtZmllbGRcImAgKyAoZmllbGREYXRhLmZpZWxkX3JlcXVpcmVkID8gJ3JlcXVpcmVkJyA6ICcnKSArICcvPidcbiAgICA7XG4gICAgaWYgKGZpZWxkRGF0YS50eXBlX2xpc3QgPT09ICd0ZXh0Jykge1xuICAgICAgICBlbGVtZW50U3RyaW5nID0gaW5wdXRCdWlsZGVyKGxvY2F0aW9uMSkgKyAoZmllbGREYXRhLmZpZWxkX2xhYmVsID8gbGFiZWxCdWlsZGVyKGxvY2F0aW9uMSkgOiAnJyk7XG4gICAgICAgIHJldHVybiBlbGVtZW50U3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFN0cmluZztcbn1cbmZ1bmN0aW9uIGNvbGxlY3RBZGRpdGlvbmFsRmllbGREYXRhKGZpZWxkRGF0YSwgZmllbGRPcmRlcikge1xuICAgIGNvbnN0IGZpZWxkRGF0YUFycmF5ID0gW107XG4gICAgZm9yIChjb25zdCBvcmRlck51bWJlciBvZiBmaWVsZE9yZGVyKXtcbiAgICAgICAgaWYgKGZpZWxkRGF0YVtvcmRlck51bWJlcl0uZmllbGRfZW5hYmxlICYmICRxcyhgIyR7ZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lfS1leGlzdGluZ2ApPy52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcG9yYXJ5RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBvcmFyeURhdGEubGFiZWwgPSBmaWVsZERhdGFbb3JkZXJOdW1iZXJdLmZpZWxkX2xhYmVsO1xuICAgICAgICAgICAgdGVtcG9yYXJ5RGF0YS5uYW1lID0gZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lO1xuICAgICAgICAgICAgdGVtcG9yYXJ5RGF0YS52YWx1ZSA9ICRxcyhgIyR7ZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lfS1leGlzdGluZ2ApPy52YWx1ZTtcbiAgICAgICAgICAgIGZpZWxkRGF0YUFycmF5LnB1c2godGVtcG9yYXJ5RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkRGF0YUFycmF5O1xufVxuZnVuY3Rpb24gY2hlY2tSZXF1aXJlZEZpZWxkcygpIHtcbiAgICBpZiAoRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSkge1xuICAgICAgICByZXR1cm4gJHFzKCcjYWRkaXRpb25hbC1maWVsZHMtZXhpc3RpbmcnKT8ucmVwb3J0VmFsaWRpdHkoKSA/PyBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpPy5yZXBvcnRWYWxpZGl0eSgpID8/IGZhbHNlO1xufVxuZnVuY3Rpb24gY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihlcnJvciwgZXh0cmEsIGZpbmdlcnByaW50KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgU2VudHJ5LndpdGhTY29wZSgoc2NvcGUpPT57XG4gICAgICAgICAgICBpZiAoZXh0cmEpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhleHRyYSkubWFwKChba2V5LCB2YWx1ZV0pPT5zY29wZS5zZXRFeHRyYShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmluZ2VycHJpbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRGaW5nZXJwcmludChmaW5nZXJwcmludCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAge31cbn1cbmZ1bmN0aW9uIGdldE9yZGVyU2VydmljZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZU9yZGVyLFxuICAgICAgICBzZXRPcmRlclN0YXR1cyxcbiAgICAgICAgc2V0UGF5bWVudFN0YXR1czogcmVjb3JkU3VjY2Vzc2Z1bFBheW1lbnQsXG4gICAgICAgIGRlcHJlY2F0ZWQ6IHtcbiAgICAgICAgICAgIHBsYWNlT3JkZXI6IGxlZ2FjeVBsYWNlT3JkZXIsXG4gICAgICAgICAgICBzZXRPcmRlclN0YXR1czogbGVnYWN5U2V0T3JkZXJTdGF0dXNcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBpbml0U2hpcHBpbmcobWVzc2FnZSkge1xuICAgIGluaXRTaGlwcGluZ0V2ZW50cygpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50R2VuZXJhbENvbmZpZyh7XG4gICAgICAgIC4uLnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwsXG4gICAgICAgIHdjTG9jYXRpb25JbmZvRGF0YTogbWVzc2FnZS5waHBEYXRhLndjX2xvY2F0aW9uX2luZm9cbiAgICB9KSk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRTaGlwcGluZ0NvbmZpZyh7XG4gICAgICAgIHNoaXBwaW5nWm9uZXM6IE51bWJlci5wYXJzZUludChtZXNzYWdlLnBocERhdGEubnVtX3NoaXBwaW5nX3pvbmVzKVxuICAgIH0pKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldE9yZGVyU3RhdHVzKG9yZGVyLCBzdGF0dXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgICAgc2Vzc2lvbjoge1xuICAgICAgICAgICAgaWQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKClcbiAgICAgICAgfSxcbiAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIGlkOiBvcmRlci5vcmRlcklELFxuICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlID8/ICcnLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksXG4gICAgICAgICAgICBzdHJpcGVDdXN0b21lcklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3N0cmlwZScgPyBvcHRpb25zLnN0cmlwZUN1c3RvbWVySWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwYXlwYWxUcmFuc2FjdGlvbklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3BheXBhbCcgPyBvcHRpb25zLnBheXBhbFRyYW5zYWN0aW9uSWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdHJpcGVUcmFuc2FjdGlvbklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3N0cmlwZScgPyBvcHRpb25zLnN0cmlwZVRyYW5zYWN0aW9uSWQgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLXNldC1vcmRlci1zdGF0dXMnLCByZXF1ZXN0KSkge1xuICAgICAgICByZXR1cm4gd2NPcmRlclJlY2VpdmVkVVJMV2l0aFBhcmFtZXRlcnMoR0xPQkFMLnBocERhdGEud2Nfb3JkZXJfcmVjZWl2ZWRfdXJsLCBvcmRlciwgTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5hc3luYyBmdW5jdGlvbiBwbGFjZU9yZGVyKCkge1xuICAgIGNvbnN0IHJlcXVlc3RNZXNzYWdlID0ge1xuICAgICAgICBzZXNzaW9uOiB7XG4gICAgICAgICAgICBpZDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKVxuICAgICAgICB9LFxuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksXG4gICAgICAgICAgICBiaWxsaW5nQWRkcmVzczogUGVhY2hQYXlDdXN0b21lci5iaWxsaW5nQWRkcmVzcygpLFxuICAgICAgICAgICAgc2hpcHBpbmdBZGRyZXNzOiBQZWFjaFBheUN1c3RvbWVyLnNoaXBwaW5nQWRkcmVzcygpLFxuICAgICAgICAgICAgc2hpcHBpbmdNZXRob2RzOiBQZWFjaFBheU9yZGVyLmNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nKCksXG4gICAgICAgICAgICBkZWxpdmVyeURhdGU6IGNvbGxlY3REZWxpdmVyeURhdGUoKSxcbiAgICAgICAgICAgIG1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgdmF0TnVtOiAnJyxcbiAgICAgICAgICAgIHZhdFNlbGZWZXJpZnk6ICcnLFxuICAgICAgICAgICAgY3VzdG9tZXJPcmRlck5vdGVzOiBjb2xsZWN0T3JkZXJOb3RlcygpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChzaG91bGRTaG93TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZEZpZWxkKCkpIHtcbiAgICAgICAgcmVxdWVzdE1lc3NhZ2Uub3JkZXIubWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZCA9IGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpO1xuICAgIH1cbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LnZhdF9yZXF1aXJlZCkge1xuICAgICAgICByZXF1ZXN0TWVzc2FnZS5vcmRlci52YXROdW0gPSBnZXRWYXROdW1iZXIoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfc2VsZl92ZXJpZnkpIHtcbiAgICAgICAgcmVxdWVzdE1lc3NhZ2Uub3JkZXIudmF0U2VsZlZlcmlmeSA9IGdldFZlcmlmeSgpO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgZmV0Y2hIb3N0V2luZG93RGF0YSgncHAtcGxhY2Utb3JkZXInLCByZXF1ZXN0TWVzc2FnZSk7XG59XG5mdW5jdGlvbiBsZWdhY3lQbGFjZU9yZGVyKGlzUGF5cGFsKSB7XG4gICAgaWYgKEdMT0JBTD8ucGhwRGF0YT8ucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X2FjdGl2ZSAmJiBjaGVja0RlbGl2ZXJ5RGF0ZUlzRW1wdHkoKSkge1xuICAgICAgICBwZWFjaHBheUFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGRlbGl2ZXJ5IGRhdGUuJyk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgJ2V2ZW50JzogJ3BsYWNlT3JkZXJEaXJlY3RseScsXG4gICAgICAgICdzZXNzaW9uSUQnOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLFxuICAgICAgICAnYmlsbGluZ0FkZHJlc3MnOiBQZWFjaFBheUN1c3RvbWVyLmJpbGxpbmdBZGRyZXNzKCksXG4gICAgICAgICdzaGlwcGluZ0FkZHJlc3MnOiBQZWFjaFBheUN1c3RvbWVyLnNoaXBwaW5nQWRkcmVzcygpLFxuICAgICAgICAnc2hpcHBpbmdfbWV0aG9kJzogUGVhY2hQYXlPcmRlci5jb2xsZWN0U2VsZWN0ZWRTaGlwcGluZygpLFxuICAgICAgICAnZGVsaXZlcnlEYXRlJzogY29sbGVjdERlbGl2ZXJ5RGF0ZSgpLFxuICAgICAgICAnaXNQcm9kdWN0UGFnZUJ1dHRvbic6IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcsXG4gICAgICAgICdpc1BheXBhbCc6IGlzUGF5cGFsID8/IGZhbHNlLFxuICAgICAgICAnbWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZCc6ICcnLFxuICAgICAgICAndmF0TnVtJzogJycsXG4gICAgICAgICdzZWxmVmVyaWZ5JzogJycsXG4gICAgICAgICdjdXN0b21lck9yZGVyTm90ZXMnOiBjb2xsZWN0T3JkZXJOb3RlcygpLFxuICAgICAgICAnYWRkaXRpb25hbEZpZWxkcyc6IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5BRERJVElPTkFMX0ZJRUxEUykgPyBjb2xsZWN0QWRkaXRpb25hbEZpZWxkRGF0YShHTE9CQUwucGhwRGF0YT8uYWRkaXRpb25hbF9maWVsZHMgPz8gW10sIEdMT0JBTC5waHBEYXRhPy5hZGRpdGlvbmFsX2ZpZWxkc19vcmRlciA/PyBbXSkgOiBbXSxcbiAgICAgICAgJ3Vwc2VsbF9pdGVtcyc6IEdMT0JBTC5saW5rZWRQcm9kdWN0c0lkc1xuICAgIH07XG4gICAgaWYgKHNob3VsZFNob3dNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkRmllbGQoKSkge1xuICAgICAgICBpZiAoIXZhbGlkYXRlTWVyY2hhbnRDdXN0b21lclBhc3N3b3JkRmllbGQoKSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlLm1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmQgPSBnZXRNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkVmFsdWUoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfcmVxdWlyZWQpIHtcbiAgICAgICAgbWVzc2FnZS52YXROdW0gPSBnZXRWYXROdW1iZXIoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfc2VsZl92ZXJpZnkpIHtcbiAgICAgICAgbWVzc2FnZS5zZWxmVmVyaWZ5ID0gZ2V0VmVyaWZ5KCk7XG4gICAgfVxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbn1cbmZ1bmN0aW9uIHdjT3JkZXJSZWNlaXZlZFVSTFdpdGhQYXJhbWV0ZXJzKHdjT3JkZXJSZWNlaXZlZFVSTCwgb3JkZXIsIGRvbWFpbikge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBzID0gZG9tYWluID09PSAnbG9jYWxob3N0JyA/ICcnIDogJ3MnO1xuICAgIGNvbnN0IHBvcnQgPSBkb21haW4gPT09ICdsb2NhbGhvc3QnID8gJzo4MDAwJyA6ICcnO1xuICAgIGNvbnN0IHVybCA9IHdjT3JkZXJSZWNlaXZlZFVSTCA/IHdjT3JkZXJSZWNlaXZlZFVSTCA6IGBodHRwJHtzfTovLyR7ZG9tYWlufSR7cG9ydH0vY2hlY2tvdXQvb3JkZXItcmVjZWl2ZWRgO1xuICAgIGNvbnN0IG9yZGVySUQgPSBvcmRlci5pZCB8fCBvcmRlci5kZXRhaWxzLmlkO1xuICAgIGNvbnN0IGtleSA9IG9yZGVyLm9yZGVyX2tleSB8fCBvcmRlci5kZXRhaWxzLm9yZGVyX2tleTtcbiAgICBpZiAoR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb190aGFua195b3VfcGFnZV9uZXh0bW92ZV9saXRlX2FjdGl2ZSB8fCBkb21haW4gPT09ICd1YmVyYnJhY2VsZXRzLmNvbScpIHtcbiAgICAgICAgcmV0dXJuIGAke3VybC5yZXBsYWNlKCcvY2hlY2tvdXQnLCAnJyl9L3RoYW5rLXlvdS8/b3JkZXJfaWQ9JHtvcmRlcklEfSZrZXk9JHtrZXl9YDtcbiAgICB9XG4gICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpID09PSAncmFwaWRmaXJlc3VwcGxpZXMuY28udWsnKSB7XG4gICAgICAgIHJldHVybiBgaHR0cCR7c306Ly8ke2RvbWFpbn0ke3BvcnR9L3RoYW5rLXlvdS1mb3ItcHVyY2hhc2luZy1mcm9tLXVzL2A7XG4gICAgfVxuICAgIHJldHVybiBgJHt1cmx9LyR7b3JkZXJJRH0vP2tleT0ke2tleX1gO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpIHtcbiAgICBjb25zdCByZXF1ZXN0RGF0YSA9IHtcbiAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIHNlbGVjdGVkX3NoaXBwaW5nOiBQZWFjaFBheU9yZGVyLmNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nKCksXG4gICAgICAgICAgICBzaGlwcGluZ19sb2NhdGlvbjogUGVhY2hQYXlDdXN0b21lci5zaG9ydEFkZHJlc3MoKVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLWNhbGN1bGF0ZS1jYXJ0JywgcmVxdWVzdERhdGEpO1xuICAgICAgICBjb25zdW1lQ2FydENhbGN1bGF0aW9uUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgQ2FydCBjYWxjdWxhdGlvbiBWMiBmYWlsZWQgb24gJHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX0uIEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFNoaXBwaW5nRXZlbnRzKCkge1xuICAgIHN0b3JlLnN1YnNjcmliZShyZW5kZXJTaGlwcGluZyk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCd2YWxpZGF0ZUFkZHJlc3NTdWNjZXNzJywgYXN5bmMgKF8pPT57XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ3VzdG9tZXJBZGRyZXNzVmFsaWRhdGlvbih0cnVlKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgICAgIG1vZGFsUGFnZVR5cGU6ICdwYXltZW50J1xuICAgICAgICB9KSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGlmICghdmFsaWRhdGVDYXJ0SXRlbXNXaXRoQ3VzdG9tZXIoRGVmYXVsdENhcnQuY29udGVudHMoKSwgZmFsc2UpKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgZXZlbnQ6ICd2YWxpZGF0ZUFkZHJlc3MnLFxuICAgICAgICAgICAgYmlsbGluZ0FkZHJlc3M6IFBlYWNoUGF5Q3VzdG9tZXIuYmlsbGluZ0FkZHJlc3MoKVxuICAgICAgICB9LCAnKicpO1xuICAgIH0pO1xuICAgICRxcygnI3BwLXNoaXBwaW5nLW9wdGlvbnMtZXhpc3RpbmcnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlU2hpcHBpbmdTZWxlY3Rpb25FdmVudCk7XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVTaGlwcGluZ1NlbGVjdGlvbkV2ZW50KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQWRkcmVzcygpIHtcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2hIb3N0V2luZG93RGF0YSgncHAtdmFsaWRhdGUtYmlsbGluZy1hZGRyZXNzJywgUGVhY2hQYXlDdXN0b21lci5iaWxsaW5nQWRkcmVzcygpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVNoaXBwaW5nU2VsZWN0aW9uRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0ICR0YXJnZXRDb250YWluZXIgPSAkdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWNhcnQta2V5XScpO1xuICAgIGNvbnN0IHNoaXBwaW5nTWV0aG9kSWQgPSAkdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGNhcnRLZXkgPSAkdGFyZ2V0Q29udGFpbmVyLmRhdGFzZXQuY2FydEtleTtcbiAgICBjb25zdCBwYWNrYWdlS2V5ID0gJHRhcmdldENvbnRhaW5lci5kYXRhc2V0LnBhY2thZ2VLZXk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ2FydFBhY2thZ2VTaGlwcGluZ01ldGhvZCh7XG4gICAgICAgIGNhcnRLZXk6IGNhcnRLZXkgPz8gJycsXG4gICAgICAgIHNoaXBwaW5nUGFja2FnZUtleTogcGFja2FnZUtleSA/PyAnJyxcbiAgICAgICAgcGFja2FnZU1ldGhvZElkOiBzaGlwcGluZ01ldGhvZElkID8/ICcnXG4gICAgfSkpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xufVxuZnVuY3Rpb24gcmVuZGVyU2hpcHBpbmcoKSB7XG4gICAgcmVuZGVyT3JkZXJIZWFkZXIoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgaWYgKGNhcnRJc1ZpcnR1YWwoRGVmYXVsdENhcnQuY29udGVudHMoKSkpIHtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtZGVsaXZlcnknKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWRlbGl2ZXJ5Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVuZGVyQ2FydFNoaXBwaW5nT3B0aW9ucyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0cyk7XG4gICAgfVxuICAgIHJlbmRlclNoaXBwaW5nU2VjdGlvbigpO1xufVxuZnVuY3Rpb24gcmVuZGVyT3JkZXJIZWFkZXIoY2FydCkge1xuICAgIGlmIChjYXJ0SXNWaXJ0dWFsKGNhcnQpKSB7XG4gICAgICAgICRxcygnLnNoaXBwaW5nLWFkZHJlc3MtaGVhZGVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcuYmlsbGluZy1hZGRyZXNzLWhlYWRlcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcuaGlkZS1mb3ItdmlydHVhbC1jYXJ0cycpKXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50MSBvZiAkcXNBbGwoJy5zaG93LWZvci12aXJ0dWFsLWNhcnRzJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQxLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLnNoaXBwaW5nLWFkZHJlc3MtaGVhZGVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcuYmlsbGluZy1hZGRyZXNzLWhlYWRlcicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcuaGlkZS1mb3ItdmlydHVhbC1jYXJ0cycpKXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50MiBvZiAkcXNBbGwoJy5zaG93LWZvci12aXJ0dWFsLWNhcnRzJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNhcnRTaGlwcGluZ09wdGlvbnMoY2FsY3VsYXRlZENhcnRzKSB7XG4gICAgbGV0IHNoaXBwaW5nSFRNTCA9ICcnO1xuICAgIGZvciAoY29uc3QgW2NhcnRLZXksIGNhcnRDYWxjdWxhdGlvbl0gb2YgT2JqZWN0LmVudHJpZXMoY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgIGlmICghY2FydENhbGN1bGF0aW9uKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtzaGlwcGluZ1BhY2thZ2VLZXksIHNoaXBwaW5nUGFja2FnZV0gb2YgT2JqZWN0LmVudHJpZXMoY2FydENhbGN1bGF0aW9uLnBhY2thZ2VfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIXNoaXBwaW5nUGFja2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hpcHBpbmdIVE1MICs9IHJlbmRlclNoaXBwaW5nUGFja2FnZU9wdGlvbnMoY2FydEtleSwgc2hpcHBpbmdQYWNrYWdlS2V5LCBzaGlwcGluZ1BhY2thZ2UsIGNhcnRDYWxjdWxhdGlvbi5jYXJ0X21ldGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgICRxcygnI3BwLXNoaXBwaW5nLW9wdGlvbnMnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBzaGlwcGluZ0hUTUxcbiAgICApO1xuICAgICRxcygnI3BwLXNoaXBwaW5nLW9wdGlvbnMtZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBzaGlwcGluZ0hUTUxcbiAgICApO1xufVxuZnVuY3Rpb24gcmVuZGVyU2hpcHBpbmdQYWNrYWdlT3B0aW9ucyhjYXJ0S2V5LCBzaGlwcGluZ1BhY2thZ2VLZXksIHNoaXBwaW5nUGFja2FnZSwgY2FydE1ldGEpIHtcbiAgICBjb25zdCBwYWNrYWdlTWV0aG9kS2V5ID0gY2FydEtleSA9PT0gJzAnID8gc2hpcHBpbmdQYWNrYWdlS2V5IDogYCR7Y2FydEtleX1fJHtzaGlwcGluZ1BhY2thZ2VLZXl9YDtcbiAgICBjb25zdCBtZXRob2RPcHRpb25CdWlsZGVyID0gKG1ldGhvZEtleSwgbWV0aG9kLCBzZWxlY3RlZCk9PmBcbjxsYWJlbCBmb3I9XCJzaGlwcGluZ19tZXRob2RfJHtwYWNrYWdlTWV0aG9kS2V5fV8ke21ldGhvZEtleS5yZXBsYWNlKC86L2csICcnKX1cIiBzdHlsZT1cIm1hcmdpbjogMCAwIDNweCAwOyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93OyBjdXJzb3I6IHBvaW50ZXI7XCI+XG5cdDxpbnB1dCBzdHlsZT1cInZlcnRpY2FsLWFsaWduOiB0b3A7XCIgaWQ9XCJzaGlwcGluZ19tZXRob2RfJHtwYWNrYWdlTWV0aG9kS2V5fV8ke21ldGhvZEtleS5yZXBsYWNlKC86L2csICcnKX1cIiBuYW1lPVwic2hpcHBpbmdfbWV0aG9kWyR7cGFja2FnZU1ldGhvZEtleX1dXCIgdmFsdWU9XCIke21ldGhvZEtleX1cIiB0eXBlPVwicmFkaW9cIiAke3NlbGVjdGVkID8gJ2NoZWNrZWQnIDogJyd9IHJlcXVpcmVkPlxuXHQ8c3BhbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgZmxleC1ncm93OiAxO1wiPiR7bWV0aG9kLnRpdGxlfTwvc3Bhbj5cblx0PHNwYW4gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1pbi13aWR0aDogMzAlOyB0ZXh0LWFsaWduOiByaWdodDtcIiBjbGFzcz1cInNoaXBwaW5nLXByaWNlXCI+JHtmb3JtYXRDdXJyZW5jeVN0cmluZyhtZXRob2QudG90YWwpfTxzcGFuIGNsYXNzPVwibXV0ZWRcIj4ke2J1aWxkU3Vic2NyaXB0aW9uUHJpY2VNZXRhRGF0YShjYXJ0TWV0YSl9PC9zcGFuPjwvc3Bhbj5cbjwvbGFiZWw+YFxuICAgIDtcbiAgICBjb25zdCBwYWNrYWdlTmFtZUhUTUwgPSBgPGg0IGNsYXNzPVwic2hpcHBpbmctaGVhZGVyIGNvbG9yLWNoYW5nZS10ZXh0XCI+JHtzaGlwcGluZ1BhY2thZ2UucGFja2FnZV9uYW1lID8/IGdldExvY2FsZVRleHQoJ3NoaXBwaW5nJyl9PC9oND5gO1xuICAgIGNvbnN0IHBhY2thZ2VNZXRob2RPcHRpb25zSFRNTCA9IE9iamVjdC5lbnRyaWVzKHNoaXBwaW5nUGFja2FnZS5tZXRob2RzKS5tYXAoKFtzaGlwcGluZ01ldGhvZEtleSwgc2hpcHBpbmdNZXRob2RdKT0+c2hpcHBpbmdNZXRob2QgPyBtZXRob2RPcHRpb25CdWlsZGVyKHNoaXBwaW5nTWV0aG9kS2V5LCBzaGlwcGluZ01ldGhvZCwgc2hpcHBpbmdQYWNrYWdlLnNlbGVjdGVkX21ldGhvZCA9PT0gc2hpcHBpbmdNZXRob2RLZXkpIDogJydcbiAgICApLmpvaW4oJycpO1xuICAgIHJldHVybiBgXG48ZGl2IGRhdGEtY2FydC1rZXk9XCIke2NhcnRLZXl9XCIgZGF0YS1wYWNrYWdlLWtleT1cIiR7c2hpcHBpbmdQYWNrYWdlS2V5fVwiPlxuXHQke3BhY2thZ2VOYW1lSFRNTH1cblx0JHtwYWNrYWdlTWV0aG9kT3B0aW9uc0hUTUx9XG48L2Rpdj5gO1xufVxuZnVuY3Rpb24gc2hpcHBpbmdJc1ZhbGlkKCkge1xuICAgIGlmIChjYXJ0SXNWaXJ0dWFsKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLnNoaXBwaW5nLnNoaXBwaW5nWm9uZXMoKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFDYXJ0cy5hbnlTaGlwcGluZ01ldGhvZHNBdmFpbGFibGUoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gY29uc3VtZUNhcnRDYWxjdWxhdGlvblJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0T3JkZXJFcnJvcignJykpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDYXJ0Q2FsY3VsYXRpb24ocmVzcG9uc2UuZGF0YS5jYXJ0X2NhbGN1bGF0aW9uX3JlY29yZCkpO1xuICAgICAgICBpZiAoRGVmYXVsdENhcnQuY29udGVudHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldE9yZGVyRXJyb3IoYDxzcGFuPiR7Z2V0TG9jYWxlVGV4dCgnZW1wdHktY2FydCcpfTwvc3Bhbj5gKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXNoaXBwaW5nSXNWYWxpZCgpKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRPcmRlckVycm9yKGA8c3Bhbj4ke2dldExvY2FsZVRleHQoJ25vLXNoaXAnKX08L3NwYW4+YCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpIHtcbiAgICByZXR1cm4gR0xPQkFMPy5waHBEYXRhPy5wbHVnaW5fd29vY29tbWVyY2VfcHJvZHVjdF9idW5kbGVzX2FjdGl2ZSA9PT0gJzEnICYmICEoRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdjYXJ0Jyk7XG59XG5mdW5jdGlvbiByZWNvcmRTdWNjZXNzZnVsUGF5bWVudChzZXNzaW9uSUQsIGNsZWFyU2Vzc2lvbikge1xuICAgIHJldHVybiBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvc2Vzc2lvbi9wYXkvcmVjb3JkJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzZXNzaW9uSUQsXG4gICAgICAgICAgICBjbGVhclNlc3Npb246IGNsZWFyU2Vzc2lvbiB8fCBmYWxzZVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuZnVuY3Rpb24gbGVnYWN5U2V0T3JkZXJTdGF0dXMob3JkZXIsIHsgc3RhdHVzICwgbWVzc2FnZSAsIHBheW1lbnRUeXBlICwgdHJhbnNhY3Rpb25JRCAgfSkge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZXZlbnQ6ICdzZXRPcmRlclN0YXR1cycsXG4gICAgICAgIG9yZGVySUQ6IG9yZGVyLm9yZGVySUQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgcGF5bWVudFR5cGUsXG4gICAgICAgIHRyYW5zYWN0aW9uSUQsXG4gICAgICAgIGN1c3RvbWVyU3RyaXBlSWQ6IFBlYWNoUGF5Q3VzdG9tZXIuc3RyaXBlSWQoKSxcbiAgICAgICAgcmVkaXJlY3RVUkw6IHdjT3JkZXJSZWNlaXZlZFVSTFdpdGhQYXJhbWV0ZXJzKEdMT0JBTC5waHBEYXRhLndjX29yZGVyX3JlY2VpdmVkX3VybCwgb3JkZXIsIE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpKVxuICAgIH0sICcqJyk7XG59XG5mdW5jdGlvbiByZW5kZXJTaGlwcGluZ1NlY3Rpb24oKSB7XG4gICAgaWYgKFBlYWNoUGF5T3JkZXIuY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkKCkpIHtcbiAgICAgICAgJHFzKCcjcHAtc2hpcHBpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtc2hpcHBpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEN1c3RvbWVyKG1lc3NhZ2UpIHtcbiAgICBpbml0Q3VzdG9tZXJFdmVudHMoKTtcbiAgICByZW5kZXJDb3VudHJ5QW5kU3RhdGVMaXN0KG1lc3NhZ2UucGhwRGF0YS53Y19sb2NhdGlvbl9pbmZvKTtcbn1cbmZ1bmN0aW9uIGluaXRDdXN0b21lckV2ZW50cygpIHtcbiAgICAkcXMoJyNjb3VudHJ5Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlckNvcnJlY3RQcm92aW5jZUZpZWxkKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PnNldFRpbWVvdXQoc3luY0N1c3RvbWVyRmllbGRDaGFuZ2VzKVxuICAgICk7XG4gICAgbGV0IHByZXZpb3VzQ3VzdG9tZXJEYXRhID0gJyc7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyID0gUGVhY2hQYXlDdXN0b21lci5kYXRhKCk7XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21lckRhdGEgPSBKU09OLnN0cmluZ2lmeShjdXN0b21lcik7XG4gICAgICAgICAgICBpZiAoY3VzdG9tZXJEYXRhICE9PSBwcmV2aW91c0N1c3RvbWVyRGF0YSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzQ3VzdG9tZXJEYXRhID0gY3VzdG9tZXJEYXRhO1xuICAgICAgICAgICAgICAgIHJlbmRlckN1c3RvbWVyRmllbGRzKGN1c3RvbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkgPT09ICdwYXltZW50Jykge1xuICAgICAgICAgICAgcmVuZGVyQ3VzdG9tZXJIZWFkZXIoY3VzdG9tZXIsIEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpO1xuICAgICAgICAgICAgaWYgKEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJFeGlzdGluZ0N1c3RvbWVyQ2hlY2tvdXQoY3VzdG9tZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzeW5jQ3VzdG9tZXJGaWVsZENoYW5nZXMoKSB7XG4gICAgY29uc3QgJGZvcm0gPSAkcXMoJyNwcC1pbmZvLWZvcm0nKTtcbiAgICBpZiAoISRmb3JtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoJGZvcm0pO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgZW1haWw6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2VtYWlsJyksXG4gICAgICAgIG5hbWVfZmlyc3Q6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ25hbWVfZmlyc3QnKSxcbiAgICAgICAgbmFtZV9sYXN0OiBmb3JtRW50cnkoZm9ybURhdGEsICduYW1lX2xhc3QnKSxcbiAgICAgICAgYWRkcmVzczE6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2FkZHJlc3MxJyksXG4gICAgICAgIGFkZHJlc3MyOiBmb3JtRW50cnkoZm9ybURhdGEsICdhZGRyZXNzMicpLFxuICAgICAgICBjaXR5OiBmb3JtRW50cnkoZm9ybURhdGEsICdjaXR5JyksXG4gICAgICAgIHN0YXRlOiBmb3JtRW50cnkoZm9ybURhdGEsICdzdGF0ZScpLFxuICAgICAgICBwb3N0YWw6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ3Bvc3RhbCcpLFxuICAgICAgICBjb3VudHJ5OiBmb3JtRW50cnkoZm9ybURhdGEsICdjb3VudHJ5JyksXG4gICAgICAgIHBob25lOiBmb3JtRW50cnkoZm9ybURhdGEsICdwaG9uZScpXG4gICAgfSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gbG9hZEN1c3RvbWVyKCkge1xuICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgZ2V0Q3VzdG9tZXIoKTtcbiAgICBpZiAoY3VzdG9tZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25JbmZvID0gTWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwud2NMb2NhdGlvbkluZm9EYXRhKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgICAgIC4uLlBlYWNoUGF5Q3VzdG9tZXIuZGF0YSgpLFxuICAgICAgICAgICAgY291bnRyeTogKGxvY2F0aW9uSW5mbz8uY3VzdG9tZXJfZGVmYXVsdF9jb3VudHJ5ID8/IGxvY2F0aW9uSW5mbz8uc3RvcmVfY291bnRyeSkgPz8gJydcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKGN1c3RvbWVyKSk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICBjdXN0b21lckV4aXN0czogdHJ1ZSxcbiAgICAgICAgbW9kYWxQYWdlVHlwZTogJ3BheW1lbnQnXG4gICAgfSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2F2ZUN1c3RvbWVyVG9Ccm93c2VyKGN1c3RvbWVySUQsIGJyYW5kLCBsYXN0NCwgcGF5bWVudE9wdGlvbikge1xuICAgIGNvbnN0IHsgZmlyc3ROYW1lICwgbGFzdE5hbWUgLCBlbWFpbCAsIHBob25lICwgYWRkcmVzczEgLCBhZGRyZXNzMiAsIHBvc3RhbCAsIGNpdHkgLCBzdGF0ZSAsIGNvdW50cnkgIH0gPSBQZWFjaFBheUN1c3RvbWVyO1xuICAgIGNvbnN0IGN1c3RvbWVyID0ge1xuICAgICAgICAnbmFtZV9maXJzdCc6IGZpcnN0TmFtZSgpLFxuICAgICAgICAnbmFtZV9sYXN0JzogbGFzdE5hbWUoKSxcbiAgICAgICAgJ2VtYWlsJzogZW1haWwoKSxcbiAgICAgICAgJ3Bob25lJzogcGhvbmUoKSxcbiAgICAgICAgJ2FkZHJlc3MxJzogYWRkcmVzczEoKSxcbiAgICAgICAgJ2FkZHJlc3MyJzogYWRkcmVzczIoKSxcbiAgICAgICAgJ3Bvc3RhbCc6IHBvc3RhbCgpLFxuICAgICAgICAnY2l0eSc6IGNpdHkoKSxcbiAgICAgICAgJ3N0YXRlJzogc3RhdGUoKSxcbiAgICAgICAgJ2NvdW50cnknOiBjb3VudHJ5KCksXG4gICAgICAgICdzdHJpcGVfY3VzdG9tZXJfaWQnOiBjdXN0b21lcklELFxuICAgICAgICAnY2FyZCc6IHtcbiAgICAgICAgICAgIGJyYW5kLFxuICAgICAgICAgICAgbGFzdDRcbiAgICAgICAgfSxcbiAgICAgICAgJ3BheW1lbnRfb3B0aW9uJzogcGF5bWVudE9wdGlvblxuICAgIH07XG4gICAgYXdhaXQgc2V0Q3VzdG9tZXIoY3VzdG9tZXIpO1xuICAgIHJldHVybiBjdXN0b21lcjtcbn1cbmZ1bmN0aW9uIGRpc3BsYXlDQ0xvZ28oY3VzdG9tZXIpIHtcbiAgICBsZXQgY2NCcmFuZCA9ICcnO1xuICAgIHN3aXRjaChjdXN0b21lci5jYXJkPy5icmFuZCl7XG4gICAgICAgIGNhc2UgJ1Zpc2EnOlxuICAgICAgICAgICAgY2NCcmFuZCA9ICd2aXNhJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNYXN0ZXJDYXJkJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnbWFzdGVyY2FyZCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQW1lcmljYW4gRXhwcmVzcyc6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ2FtZXgnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Rpc2NvdmVyJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnZGlzY292ZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RpbmVycyBDbHViJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnZGluZXJzJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdKQ0InOlxuICAgICAgICAgICAgY2NCcmFuZCA9ICdqY2InO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1VuaW9uUGF5JzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAndW5pb25wYXknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjY0JyYW5kID0gJyc7XG4gICAgfVxuICAgICRxcygnI2NjLScgKyBjY0JyYW5kKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuZnVuY3Rpb24gcmVuZGVyRXhpc3RpbmdDdXN0b21lckNoZWNrb3V0KGN1c3RvbWVyKSB7XG4gICAgaWYgKGN1c3RvbWVyLnBheW1lbnRfb3B0aW9uID09PSAncGF5cGFsJykge1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1leGlzdGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGlmIChHTE9CQUwucGhwRGF0YT8ucGF5cGFsID09PSAnMScpIHtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgYWRqdXN0T3JkZXJTdW1tYXJ5SGVpZ2h0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtY2FyZC1udW1iZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtbm8tY2FyZCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1leGlzdGluZycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGFkanVzdE9yZGVyU3VtbWFyeUhlaWdodChmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ29ycmVjdFByb3ZpbmNlRmllbGQoKSB7XG4gICAgY29uc3QgbWVyY2hhbnRTaGlwcGluZyA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLndjTG9jYXRpb25JbmZvRGF0YSgpO1xuICAgIGlmIChtZXJjaGFudFNoaXBwaW5nKSB7XG4gICAgICAgIGNvbnN0ICRjb3VudHJpZXMgPSAkcXMoJyNjb3VudHJ5Jyk7XG4gICAgICAgIGlmICghJGNvdW50cmllcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb24gPSBzdGF0ZVByb3ZpbmNlT3JDb3VudHkoJGNvdW50cmllcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHN0YXRlT3JQcm92aW5jZU9wdGlvbnMgPSBtZXJjaGFudFNoaXBwaW5nLmFsbG93ZWRfc3RhdGVzX29yX3Byb3ZpbmNlc1skY291bnRyaWVzLnZhbHVlID8/ICcnXSA/PyB7fTtcbiAgICAgICAgaWYgKHN0YXRlT3JQcm92aW5jZU9wdGlvbnMgJiYgT2JqZWN0LmtleXMoc3RhdGVPclByb3ZpbmNlT3B0aW9ucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QgPSAkcXMoJyNkeW5hbWljLXN0YXRlcycpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QuaW5uZXJIVE1MID0gcmVuZGVyRHJvcERvd25MaXN0KHN0YXRlT3JQcm92aW5jZU9wdGlvbnMsIGRlZmF1bHRPcHRpb24pO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3Quc2V0QXR0cmlidXRlKCduYW1lJywgJ3N0YXRlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRPcHRpb24gPT09IGdldExvY2FsZVRleHQoJ3Byb3ZpbmNlLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwiZHluYW1pYy1zdGF0ZXNcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ3Byb3ZpbmNlJylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZmF1bHRPcHRpb24gPT09IGdldExvY2FsZVRleHQoJ3N0YXRlLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwiZHluYW1pYy1zdGF0ZXNcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ3N0YXRlJylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cImR5bmFtaWMtc3RhdGVzXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBkZWZhdWx0T3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCAkc3RhdGVPclByb3ZpbmNlc1RleHQgPSAkcXMoJyNwcm92aW5jZScpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzVGV4dCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdvZmYnKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwicHJvdmluY2VcIl0nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QgPSAkcXMoJyNkeW5hbWljLXN0YXRlcycpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdvZmYnKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cImR5bmFtaWMtc3RhdGVzXCJdJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0ICRzdGF0ZU9yUHJvdmluY2VzVGV4dCA9ICRxcygnI3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICBpZiAoJHN0YXRlT3JQcm92aW5jZXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdzdGF0ZScpO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0T3B0aW9uID09PSBnZXRMb2NhbGVUZXh0KCdwcm92aW5jZS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdwcm92aW5jZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0T3B0aW9uID09PSBnZXRMb2NhbGVUZXh0KCdzdGF0ZS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdzdGF0ZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJwcm92aW5jZVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZGVmYXVsdE9wdGlvblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwicHJvdmluY2VcIl0nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ291bnRyeUFuZFN0YXRlTGlzdChtZXJjaGFudExvY2F0aW9uSW5mbykge1xuICAgIGlmICghbWVyY2hhbnRMb2NhdGlvbkluZm8pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBObyBXQyBMb2NhdGlvbiBpbmZvLiBQbGVhc2UgdXBkYXRlIHRoZSBQZWFjaFBheSBQbHVnaW4uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgJGNvdW50cmllcyA9ICRxcygnI2NvdW50cnknKTtcbiAgICBpZiAoISRjb3VudHJpZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzZWxlY3RBQ291bnRyeSA9IGdldExvY2FsZVRleHQoJ2NvdW50cnknKTtcbiAgICBjb25zdCBjb3VudHJ5T3B0aW9ucyA9IG1lcmNoYW50TG9jYXRpb25JbmZvLmFsbG93ZWRfY291bnRyaWVzO1xuICAgICRjb3VudHJpZXMuaW5uZXJIVE1MID0gcmVuZGVyRHJvcERvd25MaXN0KGNvdW50cnlPcHRpb25zLCBzZWxlY3RBQ291bnRyeSk7XG4gICAgc2VsZWN0RHJvcGRvd24oJGNvdW50cmllcywgbWVyY2hhbnRMb2NhdGlvbkluZm8uY3VzdG9tZXJfZGVmYXVsdF9jb3VudHJ5IHx8IG1lcmNoYW50TG9jYXRpb25JbmZvLnN0b3JlX2NvdW50cnkpO1xuICAgIGlmICgkY291bnRyaWVzLm9wdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICRjb3VudHJpZXMuc2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgfVxuICAgICRjb3VudHJpZXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckN1c3RvbWVyRmllbGRzKGN1c3RvbWVyKSB7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJuYW1lX2ZpcnN0XCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5uYW1lX2ZpcnN0XG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cIm5hbWVfbGFzdFwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIubmFtZV9sYXN0XG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cImVtYWlsXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5lbWFpbFxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJwaG9uZVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIucGhvbmVcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwiYWRkcmVzczFcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLmFkZHJlc3MxXG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cImFkZHJlc3MyXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5hZGRyZXNzMlxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJwb3N0YWxcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLnBvc3RhbFxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJjaXR5XCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5jaXR5XG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cImNvdW50cnlcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLmNvdW50cnlcbiAgICApO1xuICAgIHJlbmRlckNvcnJlY3RQcm92aW5jZUZpZWxkKCk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIFtuYW1lPVwic3RhdGVcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLnN0YXRlXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckN1c3RvbWVySGVhZGVyKGN1c3RvbWVyLCBleGlzdGluZ0N1c3RvbWVyKSB7XG4gICAgaWYgKGV4aXN0aW5nQ3VzdG9tZXIpIHtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctZW1haWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLmVtYWlsXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLW5hbWVfZmlyc3QnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLm5hbWVfZmlyc3RcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctbmFtZV9sYXN0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5uYW1lX2xhc3RcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctYWRkcmVzczEnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLmFkZHJlc3MxXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWFkZHJlc3MyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5hZGRyZXNzMiA/ICcgJyArIGN1c3RvbWVyLmFkZHJlc3MyIDogJydcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctY2l0eScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIuY2l0eVxuICAgICAgICApO1xuICAgICAgICBpZiAoY3VzdG9tZXIuY291bnRyeSA9PT0gJ0pQJykge1xuICAgICAgICAgICAgY29uc3QgZnVsbFN0YXRlTmFtZSA9IEdMT0JBTC5waHBEYXRhPy53Y19sb2NhdGlvbl9pbmZvPy5hbGxvd2VkX3N0YXRlc19vcl9wcm92aW5jZXMuSlBbY3VzdG9tZXIuc3RhdGVdO1xuICAgICAgICAgICAgJHFzKCcjZXhpc3Rpbmctc3RhdGUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGZ1bGxTdGF0ZU5hbWUgPz8gJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoJyNleGlzdGluZy1zdGF0ZScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIuc3RhdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgJHFzKCcjZXhpc3RpbmctY291bnRyeScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZ2V0Q291bnRyeU5hbWUoY3VzdG9tZXIuY291bnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctcG9zdGFsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5wb3N0YWxcbiAgICAgICAgKTtcbiAgICAgICAgZGlzcGxheUNDTG9nbyhjdXN0b21lcik7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWxhc3Q0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lcj8uY2FyZD8ubGFzdDQgPz8gJydcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZnVsbEFkZHJlc3MgPSAnJztcbiAgICAgICAgaWYgKGN1c3RvbWVyLmNvdW50cnkgPT09ICdKUCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxTdGF0ZSA9IEdMT0JBTC5waHBEYXRhPy53Y19sb2NhdGlvbl9pbmZvPy5hbGxvd2VkX3N0YXRlc19vcl9wcm92aW5jZXMuSlBbY3VzdG9tZXIuc3RhdGVdO1xuICAgICAgICAgICAgZnVsbEFkZHJlc3MgPSBgJHtjdXN0b21lci5wb3N0YWx9LCAke2Z1bGxTdGF0ZSA/PyBjdXN0b21lci5zdGF0ZX0sICAke2N1c3RvbWVyLmNpdHl9LCAke2N1c3RvbWVyLmFkZHJlc3MxfSR7Y3VzdG9tZXIuYWRkcmVzczIgPyAnICcgKyBjdXN0b21lci5hZGRyZXNzMiA6ICcnfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdWxsQWRkcmVzcyA9IGAke2N1c3RvbWVyLmFkZHJlc3MxfSR7Y3VzdG9tZXIuYWRkcmVzczIgPyAnICcgKyBjdXN0b21lci5hZGRyZXNzMiArICcsICcgOiAnLCd9ICR7Y3VzdG9tZXIuY2l0eX0sICR7Y3VzdG9tZXIuc3RhdGV9ICR7Y3VzdG9tZXIucG9zdGFsfSwgJHtjdXN0b21lci5jb3VudHJ5fWA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnVsbE5hbWUgPSBgJHtjdXN0b21lci5uYW1lX2ZpcnN0fSAke2N1c3RvbWVyLm5hbWVfbGFzdH1gO1xuICAgICAgICAkcXMoJy5lbWFpbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGN1c3RvbWVyLmVtYWlsXG4gICAgICAgICk7XG4gICAgICAgICRxcygnLmZ1bGwtbmFtZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGZ1bGxOYW1lXG4gICAgICAgICk7XG4gICAgICAgICRxcygnLnBwLWFkZHJlc3MnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBmdWxsQWRkcmVzc1xuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkanVzdE9yZGVyU3VtbWFyeUhlaWdodChpc1BheXBhbFVzZWQpIHtcbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zICYmIEdMT0JBTC5waHBEYXRhLnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiBHTE9CQUwucGhwRGF0YS5lbmFibGVfb3JkZXJfbm90ZXMgJiYgIXByb2R1Y3RCdW5kbGVzUHJvZHVjdFBhZ2UoKSkge1xuICAgICAgICBpc1BheXBhbFVzZWQgPyAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjhyZW0nXG4gICAgICAgICkgOiAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMzJyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmIChHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgJiYgR0xPQkFMLnBocERhdGEucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmICFHTE9CQUwucGhwRGF0YS5lbmFibGVfb3JkZXJfbm90ZXMgJiYgIXByb2R1Y3RCdW5kbGVzUHJvZHVjdFBhZ2UoKSkge1xuICAgICAgICBpc1BheXBhbFVzZWQgPyAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMTlyZW0nXG4gICAgICAgICkgOiAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjNyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmIChHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgJiYgIUdMT0JBTC5waHBEYXRhLnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiBHTE9CQUwucGhwRGF0YS5lbmFibGVfb3JkZXJfbm90ZXMgfHwgIUdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyAmJiBHTE9CQUwucGhwRGF0YT8ucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmIEdMT0JBTC5waHBEYXRhLmVuYWJsZV9vcmRlcl9ub3RlcyAmJiAhcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpKSB7XG4gICAgICAgIGlzUGF5cGFsVXNlZCA/ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyNi41cmVtJ1xuICAgICAgICApIDogJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzI5LjVyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmICghR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zICYmICFHTE9CQUwucGhwRGF0YT8ucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlICYmIEdMT0JBTC5waHBEYXRhPy5lbmFibGVfb3JkZXJfbm90ZXMpIHtcbiAgICAgICAgaXNQYXlwYWxVc2VkID8gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzIzcmVtJ1xuICAgICAgICApIDogJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzI2LjVyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmIChHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgfHwgR0xPQkFMLnBocERhdGE/LnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiAhcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpKSB7XG4gICAgICAgIGlzUGF5cGFsVXNlZCA/ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcxN3JlbSdcbiAgICAgICAgKSA6ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyMS41cmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAoaXNQYXlwYWxVc2VkKSB7XG4gICAgICAgICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcxNXJlbSdcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0Q3VycmVuY3kobWVzc2FnZSkge1xuICAgIGluaXRDdXJyZW5jeUV2ZW50cygpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50Q3VycmVuY3lDb25maWcoe1xuICAgICAgICBjb2RlOiBtZXNzYWdlLnBocERhdGEuY3VycmVuY3lfaW5mbz8uY29kZSA/PyAnVVNEJyxcbiAgICAgICAgc3ltYm9sOiBtZXNzYWdlLnBocERhdGE/LmN1cnJlbmN5X2luZm8/LnN5bWJvbCA/PyAnJCcsXG4gICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcjogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LnRob3VzYW5kc19zZXBhcmF0b3IgPz8gJywnLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBtZXNzYWdlLnBocERhdGEuY3VycmVuY3lfaW5mbz8uZGVjaW1hbF9zZXBhcmF0b3IgPz8gJy4nLFxuICAgICAgICBkZWNpbWFsczogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/Lm51bWJlcl9vZl9kZWNpbWFscyA/PyAyLFxuICAgICAgICBwb3NpdGlvbjogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LnBvc2l0aW9uID8/ICdsZWZ0JyxcbiAgICAgICAgcm91bmRpbmc6IG1lc3NhZ2UucGhwRGF0YS5jdXJyZW5jeV9pbmZvPy5yb3VuZGluZyA/PyAnZGlzYWJsZWQnXG4gICAgfSkpO1xufVxuZnVuY3Rpb24gaW5pdEN1cnJlbmN5RXZlbnRzKCkge1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJDdXJyZW5jeVN5bWJvbHMoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckN1cnJlbmN5U3ltYm9scygpIHtcbiAgICBjb25zdCB7IHBvc2l0aW9uICwgc3ltYm9sICB9ID0gTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvbmZpZ3VyYXRpb24oKTtcbiAgICBjb25zdCByaWdodCA9IHBvc2l0aW9uID09PSAncmlnaHQnIHx8IHBvc2l0aW9uID09PSAncmlnaHRfc3BhY2UnO1xuICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKGAuY3VycmVuY3ktc3ltYm9sJHtyaWdodCA/ICctYWZ0ZXInIDogJyd9YCkpe1xuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBzeW1ib2w7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEdpZnRDYXJkSW5wdXQoX21lc3NhZ2UpIHtcbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5HSUZUQ0FSRF9JTlBVVCkgfHwgcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpIHx8IE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpID09PSAnc2tyZWdlYXIuY29tJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGluaXRHaWZ0Q2FyZEV2ZW50cygpO1xuICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLW9wdGlvbicpKXtcbiAgICAgICAgJGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICAkcXMoJyNnaWZ0LWNhcmQtc2VjdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgaWYgKEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5DT1VQT05fSU5QVVQpKSB7XG4gICAgICAgICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyNXJlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjMuNXJlbSdcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0R2lmdENhcmRFdmVudHMoKSB7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdnaWZ0Q2FyZEFwcGxpZWQnLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgJG1lc3NhZ2Ugb2YgJHFzQWxsKCcuaW52YWxpZC1naWZ0LWNhcmQnKSl7XG4gICAgICAgICAgICAkbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGhpZGVHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCAkbWVzc2FnZSBvZiAkcXNBbGwoJy5pbnZhbGlkLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgICAgICAgICAkbWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2UubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAkbWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFySW5wdXQoJy5naWZ0LWNhcmQtaW5wdXQnKTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgICAgICBoaWRlR2lmdENhcmRMb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgaGlkZUdpZnRDYXJkTG9hZGluZ1N0YXRlKCk7XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCAkZm9ybSBvZiAkcXNBbGwoJ2Zvcm0ucHctd2MtZ2lmdC1jYXJkJykpe1xuICAgICAgICAkZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpPT57XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCEkZm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG93R2lmdENhcmRMb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0YXJ0TW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgZ2lmdENhcmROdW1iZXIgPSBkYXRhLmdldCgnY2FyZF9udW1iZXInKT8udHJpbSgpID8/ICcnO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdyZWRlZW1HaWZ0Q2FyZCcsXG4gICAgICAgICAgICAgICAgY2FyZE51bWJlcjogZ2lmdENhcmROdW1iZXJcbiAgICAgICAgICAgIH0sICcqJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRkaXYgb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLW9wdGlvbicpKXtcbiAgICAgICAgJGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dHaWZ0Q2FyZElucHV0KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkZXhpdEdpZnQgb2YgJHFzQWxsKCcuZXhpdC1idXR0b24tZ2lmdCcpKXtcbiAgICAgICAgJGV4aXRHaWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZUdpZnRDYXJkSW5wdXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNob3dHaWZ0Q2FyZElucHV0KCkge1xuICAgIGZvciAoY29uc3QgJGNvdXBvbiBvZiAkcXNBbGwoJ2Zvcm0ucHctd2MtZ2lmdC1jYXJkJykpe1xuICAgICAgICAkY291cG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkb3B0aW9uIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1vcHRpb24nKSl7XG4gICAgICAgICRvcHRpb24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGhpZGVHaWZ0Q2FyZElucHV0KCkge1xuICAgIGZvciAoY29uc3QgJGNvdXBvbiBvZiAkcXNBbGwoJ2Zvcm0ucHctd2MtZ2lmdC1jYXJkJykpe1xuICAgICAgICAkY291cG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkb3B0aW9uIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1vcHRpb24nKSl7XG4gICAgICAgICRvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRpbnZhbGlkIG9mICRxc0FsbCgnLmludmFsaWQtZ2lmdC1jYXJkJykpe1xuICAgICAgICAkaW52YWxpZC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGNsZWFySW5wdXQoJy5naWZ0LWNhcmQtaW5wdXQnKTtcbn1cbmZ1bmN0aW9uIGhpZGVHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpIHtcbiAgICBmb3IgKGNvbnN0ICRzcGlubmVyIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1zcGlubmVyJykpe1xuICAgICAgICAkc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGJvcmRlciBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtaW5wdXQnKSl7XG4gICAgICAgICRib3JkZXIuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlLXJpZ2h0LWJvcmRlcicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRhcHBseUJ1dHRvbiBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtYXBwbHknKSl7XG4gICAgICAgICRhcHBseUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNob3dHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpIHtcbiAgICBmb3IgKGNvbnN0ICRzcGlubmVyIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1zcGlubmVyJykpe1xuICAgICAgICAkc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGJvcmRlciBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtaW5wdXQnKSl7XG4gICAgICAgICRib3JkZXIuY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXJpZ2h0LWJvcmRlcicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRhcHBseUJ1dHRvbiBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtYXBwbHknKSl7XG4gICAgICAgICRhcHBseUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdENvdXBvbklucHV0KF9tZXNzYWdlKSB7XG4gICAgaWYgKCFGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUKSB8fCBGZWF0dXJlLnZlcnNpb24oRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUKSA8IDIgJiYgRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdwcm9kdWN0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNob3dDb3Vwb25FbnRyeVN1cHBvcnQoKTtcbiAgICBpbml0Q291cG9uSW5wdXRFdmVudHMoKTtcbn1cbmZ1bmN0aW9uIGluaXRDb3Vwb25JbnB1dEV2ZW50cygpIHtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2NvdXBvbicsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBmb3IgKGNvbnN0ICRtZXNzYWdlIG9mICRxc0FsbCgnLndjLWludmFsaWQtY291cG9uJykpe1xuICAgICAgICAgICAgJG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmRhdGEgJiYgbWVzc2FnZS5kYXRhLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICBoaWRlQ291cG9uTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0ICRtZXNzYWdlIG9mICRxc0FsbCgnLndjLWludmFsaWQtY291cG9uJykpe1xuICAgICAgICAgICAgICAgICRtZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBoaWRlQ291cG9uTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgIGNsZWFySW5wdXQoJy53Yy1jb3Vwb24tY29kZS1pbnB1dCcpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3RvcENvdXBvbkxvYWRpbmcnLCAoXyk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgaGlkZUNvdXBvbkxvYWRpbmdTdGF0ZSgpO1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCdmb3JtLndjLWNvdXBvbi1jb2RlJykpe1xuICAgICAgICAkZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpPT57XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCEkZm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHNob3dDb3Vwb25Mb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0ID8/IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBjb25zdCBjb3Vwb25Db2RlID0gZGF0YS5nZXQoJ2NvdXBvbl9jb2RlJyk/LnRyaW0oKSA/PyAnJztcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnZmV0Y2hDb3Vwb24nLFxuICAgICAgICAgICAgICAgIGNvZGU6IGNvdXBvbkNvZGVcbiAgICAgICAgICAgIH0sICcqJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRvcGVuQ291cG9uIG9mICRxc0FsbCgnLmNvdXBvbi1jb2RlLW9wdGlvbicpKXtcbiAgICAgICAgJG9wZW5Db3Vwb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93Q291cG9uSW5wdXQpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRleGl0Q291cG9uIG9mICRxc0FsbCgnLmV4aXQtYnV0dG9uLWNvdXBvbicpKXtcbiAgICAgICAgJGV4aXRDb3Vwb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlQ291cG9uSW5wdXQpO1xuICAgIH1cbiAgICBoaWRlQ291cG9uTG9hZGluZ1N0YXRlKCk7XG59XG5mdW5jdGlvbiBzaG93Q291cG9uRW50cnlTdXBwb3J0KCkge1xuICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCcuY291cG9uLWNvZGUtb3B0aW9uJykpe1xuICAgICAgICAkZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgICRxcygnI2NvdXBvbi1jb2RlLXNlY3Rpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuZnVuY3Rpb24gc2hvd0NvdXBvbklucHV0KCkge1xuICAgIGZvciAoY29uc3QgJGNvdXBvbiBvZiAkcXNBbGwoJ2Zvcm0ud2MtY291cG9uLWNvZGUnKSl7XG4gICAgICAgICRjb3Vwb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRvcHRpb24gb2YgJHFzQWxsKCcuY291cG9uLWNvZGUtb3B0aW9uJykpe1xuICAgICAgICAkb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoaWRlQ291cG9uSW5wdXQoKSB7XG4gICAgZm9yIChjb25zdCAkY291cG9uIG9mICRxc0FsbCgnZm9ybS53Yy1jb3Vwb24tY29kZScpKXtcbiAgICAgICAgJGNvdXBvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJG9wdGlvbiBvZiAkcXNBbGwoJy5jb3Vwb24tY29kZS1vcHRpb24nKSl7XG4gICAgICAgICRvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRpbnZhbGlkIG9mICRxc0FsbCgnLndjLWludmFsaWQtY291cG9uJykpe1xuICAgICAgICAkaW52YWxpZC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGNsZWFySW5wdXQoJy53Yy1jb3Vwb24tY29kZS1pbnB1dCcpO1xufVxuZnVuY3Rpb24gaGlkZUNvdXBvbkxvYWRpbmdTdGF0ZSgpIHtcbiAgICBmb3IgKGNvbnN0ICRzcGlubmVyIG9mICRxc0FsbCgnLndjLWNvdXBvbi1zcGlubmVyJykpe1xuICAgICAgICAkc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGJvcmRlciBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tY29kZS1pbnB1dCcpKXtcbiAgICAgICAgJGJvcmRlci5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtcmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGFwcGx5QnV0dG9uIG9mICRxc0FsbCgnLndjLWNvdXBvbi1jb2RlLWFwcGx5Jykpe1xuICAgICAgICAkYXBwbHlCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBzaG93Q291cG9uTG9hZGluZ1N0YXRlKCkge1xuICAgIGZvciAoY29uc3QgJHNwaW5uZXIgb2YgJHFzQWxsKCcud2MtY291cG9uLXNwaW5uZXInKSl7XG4gICAgICAgICRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYm9yZGVyIG9mICRxc0FsbCgnLndjLWNvdXBvbi1jb2RlLWlucHV0Jykpe1xuICAgICAgICAkYm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS1yaWdodC1ib3JkZXInKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYXBwbHlCdXR0b24gb2YgJHFzQWxsKCcud2MtY291cG9uLWNvZGUtYXBwbHknKSl7XG4gICAgICAgICRhcHBseUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdExhbmd1YWdlKG1lc3NhZ2UpIHtcbiAgICBpbml0TGFuZ3VhZ2VFdmVudHMoKTtcbiAgICBsZXQgbGFuZ3VhZ2UgPSBtZXNzYWdlLnBocERhdGEubGFuZ3VhZ2UgPT09ICdkZXRlY3QtZnJvbS1wYWdlJyA/IG1lc3NhZ2UucGFnZUxhbmd1YWdlIDogbWVzc2FnZS5waHBEYXRhLmxhbmd1YWdlO1xuICAgIGNvbnN0IGVuZ2xpc2hWYXJpYW50cyA9IG5ldyBTZXQoW1xuICAgICAgICAnZW4tQVUnLFxuICAgICAgICAnZW4tQ0EnLFxuICAgICAgICAnZW4tR0InLFxuICAgICAgICAnZW4tTlonLFxuICAgICAgICAnZW4tWkEnXG4gICAgXSk7XG4gICAgaWYgKGVuZ2xpc2hWYXJpYW50cy5oYXMobGFuZ3VhZ2UpKSB7XG4gICAgICAgIGxhbmd1YWdlID0gJ2VuLVVTJztcbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTGFuZ3VhZ2UobGFuZ3VhZ2UpKTtcbn1cbmZ1bmN0aW9uIGluaXRMYW5ndWFnZUV2ZW50cygpIHtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ3BhZ2VMYW5ndWFnZUNoYW5nZScsIChtZXNzYWdlKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVMYW5ndWFnZShtZXNzYWdlLmxhbmd1YWdlKSk7XG4gICAgfSk7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlckxvY2FsZVRleHQoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckxvY2FsZVRleHQoKSB7XG4gICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJ1tkYXRhLWkxOG5dJykpe1xuICAgICAgICBpZiAoJGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcgJiYgJGVsZW1lbnQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgICAgICRlbGVtZW50LnZhbHVlID0gZ2V0TG9jYWxlVGV4dCgkZWxlbWVudD8uZGF0YXNldD8uaTE4biA/PyAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgICRlbGVtZW50LnBsYWNlaG9sZGVyID0gZ2V0TG9jYWxlVGV4dCgkZWxlbWVudD8uZGF0YXNldD8uaTE4biA/PyAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJGVsZW1lbnQ/LmRhdGFzZXQ/LmkxOG4gPz8gJycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChFbnZpcm9ubWVudC5sYW5ndWFnZSgpID09PSAncm8tUk8nKSB7XG4gICAgICAgIHNldEN1c3RvbVZhbGlkaXR5TWVzc2FnZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldEN1c3RvbVZhbGlkaXR5TWVzc2FnZSgpIHtcbiAgICBmb3IgKGNvbnN0ICRpbnB1dCBvZiAkcXNBbGwoJ2Zvcm0gaW5wdXQnKSl7XG4gICAgICAgICRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnZhbGlkJywgKCk9PntcbiAgICAgICAgICAgICRpbnB1dC5zZXRDdXN0b21WYWxpZGl0eSgnVGUgcnVnxINtIHNhIGNvbXBsZXRlemkgYWNlc3QgY8OibXAuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKT0+e1xuICAgICAgICAgICAgJGlucHV0LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuICAgIGNvbnN0IHN0cmluZ1RvVXBwZXIgPSBTdHJpbmcoc3RyaW5nKTtcbiAgICByZXR1cm4gc3RyaW5nVG9VcHBlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZ1RvVXBwZXIuc2xpY2UoMSk7XG59XG5mdW5jdGlvbiBpbml0UXVhbnRpdHlDaGFuZ2VyRXZlbnQoKSB7XG4gICAgaWYgKCFGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuUVVBTlRJVFlfQ0hBTkdFUikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXNBbGwoJyNwcC1zdW1tYXJ5LWJvZHksICNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcsICNwcC1zdW1tYXJ5LWJvZHktbW9iaWxlJywgKCRjYXJ0Q29udGFpbmVyKT0+e1xuICAgICAgICAkY2FydENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudDEpPT57XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gZXZlbnQxLnRhcmdldDtcbiAgICAgICAgICAgIGlmICghJHRhcmdldC5jbG9zZXN0KCcucXR5LWJ0bicpICYmICEkdGFyZ2V0LmNsb3Nlc3QoJy5xdHktZnMnKSAmJiAhJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJHRhcmdldC5jbG9zZXN0KCcucXR5LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGJ1dHRvbiA9ICR0YXJnZXQuY2xvc2VzdCgnLnF0eS1idG4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJ0SXRlbUtleSA9ICRidXR0b24uZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCRidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWNyZWFzZS1xdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgLTEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbmNyZWFzZS1xdHknKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5jbG9zZXN0KCcucXR5LWZzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9ICR0YXJnZXQuY2xvc2VzdCgnLnF0eS1mcycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRJdGVtS2V5ID0gJHRhcmdldC5jbG9zZXN0KCcucXR5LWZzJykuZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGlucHV0VGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwcmV2aW91c1RpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0VGFyZ2V0LnZhbHVlICYmIGN1cnJlbnRWYWx1ZSAhPT0gJGlucHV0VGFyZ2V0LnZhbHVlICYmICRpbnB1dFRhcmdldC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgTnVtYmVyLnBhcnNlSW50KCRpbnB1dFRhcmdldC52YWx1ZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRUYXJnZXQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgNzUwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhc3luYyAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRpbnB1dFRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZW91dElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocHJldmlvdXNUaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXRUYXJnZXQudmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSAkaW5wdXRUYXJnZXQudmFsdWUgJiYgJGlucHV0VGFyZ2V0LmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIE51bWJlci5wYXJzZUludCgkaW5wdXRUYXJnZXQudmFsdWUpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dFRhcmdldC52YWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkdGFyZ2V0LmNsb3Nlc3QoJy5pdGVtLXJlbW92ZXInKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRJdGVtS2V5ID0gJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykuZGF0YXNldC5xaWQ7XG4gICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIDAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNoYW5nZVF1YW50aXR5KGNhcnRJdGVtS2V5LCBhbW91bnQgPSAxLCBzZXQgPSBmYWxzZSkge1xuICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkgIT09ICdmaW5pc2hlZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLWNoYW5nZS1xdWFudGl0eScsIHtcbiAgICAgICAgICAgIGtleTogY2FydEl0ZW1LZXksXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICBzZXRcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN1bWVDYXJ0Q2FsY3VsYXRpb25SZXNwb25zZShyZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBRdWFudGl0eSBmYWlsZWQgdG8gY2hhbmdlIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LiBFcnJvciR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbn1cbmZ1bmN0aW9uIGluaXRDYXJ0KCkge1xuICAgIGluaXRDYXJ0RXZlbnRzKCk7XG4gICAgaW5pdFF1YW50aXR5Q2hhbmdlckV2ZW50KCk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdwcC11cGRhdGUtY2FydCcsIGFzeW5jICgpPT57XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGluaXRDYXJ0RXZlbnRzKCkge1xuICAgIGxldCBwcmV2aW91c0NhcnREYXRhID0gJyc7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGNvbnN0IGNhcnREYXRhID0gSlNPTi5zdHJpbmdpZnkoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgICAgIGlmIChjYXJ0RGF0YSAhPT0gcHJldmlvdXNDYXJ0RGF0YSkge1xuICAgICAgICAgICAgcHJldmlvdXNDYXJ0RGF0YSA9IGNhcnREYXRhO1xuICAgICAgICAgICAgcmVuZGVyT3JkZXJTdW1tYXJ5SXRlbXMoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlck9yZGVyU3VtbWFyeUl0ZW1zKGNhcnQpIHtcbiAgICBjb25zdCAkdGJvZHkgPSAkcXMoJyNwcC1zdW1tYXJ5LWJvZHknKTtcbiAgICBjb25zdCAkdGJvZHlFeGlzdGluZyA9ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycpO1xuICAgIGNvbnN0ICR0Ym9keU1vYmlsZSA9ICRxcygnI3BwLXN1bW1hcnktYm9keS1tb2JpbGUnKTtcbiAgICBpZiAoISR0Ym9keSB8fCAhJHRib2R5RXhpc3RpbmcgfHwgISR0Ym9keU1vYmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFZhcmlhdGlvbkhUTUwoaXRlbSkge1xuICAgICAgICBsZXQgdmFyaWF0aW9uUm93SFRNTCA9ICcnO1xuICAgICAgICBpZiAoIWl0ZW0uYXR0cmlidXRlcykge1xuICAgICAgICAgICAgcmV0dXJuIHZhcmlhdGlvblJvd0hUTUw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0uYXR0cmlidXRlcyk7XG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhcmlhdGlvblJvd0hUTUw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyaWF0aW9uUm93SFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKXtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZEtleSA9IGNhcGl0YWxpemVGaXJzdExldHRlcihrZXkucmVwbGFjZSgnYXR0cmlidXRlXycsICcnKS5yZXBsYWNlKCdwYV8nLCAnJykucmVwbGFjZSgvLS9nLCAnICcpKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gU3RyaW5nKGl0ZW0uYXR0cmlidXRlc1trZXldKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyaWF0aW9uUm93SFRNTCArPSBgPGJyPjxzcGFuIGNsYXNzPVwiJHtpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlID8gJycgOiAnbXV0ZWQnfSBwbC0zLzJcIj4ke2Zvcm1hdHRlZEtleX06ICR7Zm9ybWF0dGVkVmFsdWV9PC9zcGFuPmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhdGlvblJvd0hUTUw7XG4gICAgfVxuICAgIGNsZWFyT3JkZXJTdW1tYXJ5KCk7XG4gICAgaWYgKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0ICRtZXNzYWdlID0gYDx0ciBjbGFzcz1cIm9yZGVyLXN1bW1hcnktaXRlbVwiPjx0ZCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgXCI+JHtnZXRMb2NhbGVUZXh0KCdlbXB0eS1jYXJ0Jyl9PC90ZD48L3RyPmA7XG4gICAgICAgICR0Ym9keS5pbm5lckhUTUwgPSAkbWVzc2FnZTtcbiAgICAgICAgJHRib2R5TW9iaWxlLmlubmVySFRNTCA9ICRtZXNzYWdlO1xuICAgICAgICAkdGJvZHlFeGlzdGluZy5pbm5lckhUTUwgPSAkbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSBjYXJ0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgICAgY29uc3QgaXRlbSA9IGNhcnRbaV07XG4gICAgICAgIGlmIChpdGVtLnF1YW50aXR5ID09PSAnJyB8fCBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKGl0ZW0ucXVhbnRpdHkpKSA9PT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbWUgPSBpdGVtLm5hbWU7XG4gICAgICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSA9PT0gJ3Vnb3Byb2Jhc2ViYWxsLmNvbScgJiYgaXRlbS5mb3JtYXR0ZWRfaXRlbV9kYXRhICYmIGl0ZW0ubmFtZV93aXRoX3ZhcmlhdGlvbikge1xuICAgICAgICAgICAgbmFtZSA9IGl0ZW0ubmFtZV93aXRoX3ZhcmlhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YXJpYXRpb25UaXRsZSA9ICFpdGVtLmF0dHJpYnV0ZXMgJiYgaXRlbS52YXJpYXRpb25fdGl0bGUgPyBgIC0gJHtpdGVtLnZhcmlhdGlvbl90aXRsZSA/PyAnJ31gIDogJyc7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gYCR7bmFtZS5ib2xkKCl9JHt2YXJpYXRpb25UaXRsZX0gJHttZXRhRGF0YVJvd3NIVE1MKGl0ZW0pfSAke2l0ZW0uZm9ybWF0dGVkX2l0ZW1fZGF0YSA/IGZvcm1hdHRlZEl0ZW1EYXRhSFRNTChpdGVtKSA6IGdldFZhcmlhdGlvbkhUTUwoaXRlbSl9YDtcbiAgICAgICAgbGV0IGFtb3VudCA9IGAke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKE51bWJlci5wYXJzZUZsb2F0KGl0ZW0uZGlzcGxheV9wcmljZSA/PyBpdGVtLnByaWNlKSAqIGNhcnRJdGVtUXVhbnRpdHkoaXRlbSkpfWA7XG4gICAgICAgIGlmIChpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICBhbW91bnQgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5pc19zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZ0Ftb3VudCA9ICFpdGVtLnN1YnNjcmlwdGlvbl9wcmljZV9zdHJpbmc/LmluZGV4T2YoU3RyaW5nKGl0ZW0uZGlzcGxheV9wcmljZSA/PyBpdGVtLnByaWNlKSkgPyAnJyA6IGZvcm1hdENvc3RTdHJpbmcoTnVtYmVyLnBhcnNlRmxvYXQoaXRlbS5kaXNwbGF5X3ByaWNlID8/IGl0ZW0ucHJpY2UpKTtcbiAgICAgICAgICAgIGFtb3VudCA9IGAke01lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5zeW1ib2woKX0ke3N0cmluZ0Ftb3VudH0ke2l0ZW0uc3Vic2NyaXB0aW9uX3ByaWNlX3N0cmluZyA/PyAnJ31gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0ICRyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAkcm93LmNsYXNzTmFtZSA9ICdvcmRlci1zdW1tYXJ5LWl0ZW0nO1xuICAgICAgICBjb25zdCAkaXRlbVJlbW92ZXIgPSAodGRDbGFzcyA9ICcnKT0+YFxuXHRcdDx0ZCBjbGFzcz1cIml0ZW0tcmVtb3Zlci10ZCBub24tYnVuZGxlZC1pdGVtICR7dGRDbGFzc31cIj5cblx0XHRcdDxidXR0b24gY2xhc3M9XCJpdGVtLXJlbW92ZXJcIiBkYXRhLXFpZD1cIiR7aXRlbS5pdGVtX2tleX1cIj4mdGltZXM7PC9idXR0b24+XG5cdFx0PC90ZD5gXG4gICAgICAgIDtcbiAgICAgICAgY29uc3QgJHF0eUNoYW5nZXIgPSAodGRDbGFzcyA9ICcnKT0+YFxuXHRcdDx0ZCBjbGFzcz1cInF0eS10ZCAke3RkQ2xhc3N9XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwicXVhbnRpdHktY2hhbmdlclwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInByLTAgZGVjcmVhc2UtcXR5IHF0eS1idG4gJHtjYXJ0SXRlbVF1YW50aXR5KGl0ZW0pIDw9IDEgPyAnc2Nyb2xsLWVuZCcgOiAnJ31cIiBkYXRhLXFpZD1cIiR7aXRlbS5pdGVtX2tleX1cIj4mIzg3MjI7PC9idXR0b24+XG5cdFx0XHRcdDxmb3JtIG9uU3VibWl0PVwicmV0dXJuIGZhbHNlO1wiIGNsYXNzPVwibWItMFwiPlxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIiR7aXRlbS5zdG9ja19xdHkgPyBpdGVtLnN0b2NrX3F0eSA6ICcnfVwiIGNsYXNzPVwicXR5LWZzXCIgdmFsdWU9XCIke2NhcnRJdGVtUXVhbnRpdHkoaXRlbSl9XCIgZGF0YS1xaWQ9XCIke2l0ZW0uaXRlbV9rZXl9XCIgcmVxdWlyZWQvPlxuXHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGwtMCBpbmNyZWFzZS1xdHkgcXR5LWJ0biAke2l0ZW0uc3RvY2tfcXR5ICYmIGNhcnRJdGVtUXVhbnRpdHkoaXRlbSkgPj0gaXRlbS5zdG9ja19xdHkgPyAnc2Nyb2xsLWVuZCcgOiAnJ31cIiBkYXRhLXFpZD1cIiR7aXRlbS5pdGVtX2tleX1cIj4rPC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3RkPmBcbiAgICAgICAgO1xuICAgICAgICBjb25zdCBzaG93UXVhbnRpdHlDaGFuZ2VyID0gRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLlFVQU5USVRZX0NIQU5HRVIpICYmIEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAnY2FydCcgfHwgRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLlFVQU5USVRZX0NIQU5HRVIpICYmIEZlYXR1cmUudmVyc2lvbihGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSA+PSAyO1xuICAgICAgICBpZiAoIWl0ZW0uaXNfcGFydF9vZl9idW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChpIDwgY2FydC5sZW5ndGggLSAxICYmIGNhcnRbaSArIDFdLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gJGl0ZW1SZW1vdmVyKCdyZW1vdmUtYm9yZGVyJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwcm9kdWN0LWltZy10ZC1iMFwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwicHJvZHVjdC1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0JHtzaG93UXVhbnRpdHlDaGFuZ2VyID8gJHF0eUNoYW5nZXIoJ2J1bmRsZS1uYW1lIHJlbW92ZS1ib3JkZXInKSA6ICcnfVxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cImJ1bmRsZS1uYW1lXCI+JHtsYWJlbH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cImJ1bmRsZS1uYW1lIGJvbGRcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSAkaXRlbVJlbW92ZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cInByb2R1Y3QtaW1nLXRkXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJwcm9kdWN0LWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQke3Nob3dRdWFudGl0eUNoYW5nZXIgPyAkcXR5Q2hhbmdlcignbm9uLWJ1bmRsZWQtaXRlbScpIDogJyd9XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibm9uLWJ1bmRsZWQtaXRlbVwiPiR7bGFiZWx9PC90ZD5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJub24tYnVuZGxlZC1pdGVtIGJvbGRcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXNfcGFydF9vZl9idW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChpIDwgY2FydC5sZW5ndGggLSAxICYmICFjYXJ0W2kgKyAxXS5pc19wYXJ0X29mX2J1bmRsZSB8fCBpID09PSBjYXJ0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xIHByb2R1Y3QtaW1nLXRkXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJidW5kbGUtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xXCI+JHtsYWJlbH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYnVuZGxlLXBhZGRpbmcgcHJvZHVjdC1pbWctdGQtYjBcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cImJ1bmRsZS1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJ1bmRsZS1wYWRkaW5nXCI+JHtsYWJlbH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBidW5kbGUtcGFkZGluZ1wiPiR7YW1vdW50fTwvdGQ+XG5cdFx0XHRcdGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1zSW5DYXJ0KGNhcnQpID09PSAxIHx8IGkgPT09IGl0ZW1zSW5DYXJ0KGNhcnQpIC0gMSkge1xuICAgICAgICAgICAgY29uc3QgJG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICAkb25lLmNsYXNzTmFtZSA9ICdvcmRlci1zdW1tYXJ5LWl0ZW0nO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXNfcGFydF9vZl9idW5kbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWFnZT8uWzBdICYmIGl0ZW0uaW1hZ2U/LlswXSAhPT0gJyh1bmtub3duKScpIHtcbiAgICAgICAgICAgICAgICAgICAgJG9uZS5pbm5lckhUTUwgKz0gYDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xIHByb2R1Y3QtaW1nLXRkIHJlbW92ZS1ib3JkZXJcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cImJ1bmRsZS1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkb25lLmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTEgcmVtb3ZlLWJvcmRlclwiPiR7bGFiZWx9PC90ZD5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMSByZW1vdmUtYm9yZGVyXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJG9uZS5pbm5lckhUTUwgKz0gJGl0ZW1SZW1vdmVyKCdyZW1vdmUtYm9yZGVyJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRvbmUuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwcm9kdWN0LWltZy10ZCByZW1vdmUtYm9yZGVyXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJwcm9kdWN0LWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRvbmUuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQke3Nob3dRdWFudGl0eUNoYW5nZXIgPyAkcXR5Q2hhbmdlcignbm9uLWJ1bmRsZWQtaXRlbSByZW1vdmUtYm9yZGVyJykgOiAnJ31cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJub24tYnVuZGxlZC1pdGVtIHJlbW92ZS1ib3JkZXJcIj4ke2xhYmVsfTwvdGQ+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibm9uLWJ1bmRsZWQtaXRlbSByZW1vdmUtYm9yZGVyIGJvbGRcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRib2R5LnByZXBlbmQoJG9uZSk7XG4gICAgICAgICAgICAkdGJvZHlNb2JpbGUucHJlcGVuZCgkb25lLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGJvZHkucHJlcGVuZCgkcm93KTtcbiAgICAgICAgICAgICR0Ym9keU1vYmlsZS5wcmVwZW5kKCRyb3cuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgICAkdGJvZHlFeGlzdGluZy5wcmVwZW5kKCRyb3cuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhck9yZGVyU3VtbWFyeSgpIHtcbiAgICBmb3IgKGNvbnN0ICRpdGVtIG9mICRxc0FsbCgnLm9yZGVyLXN1bW1hcnktaXRlbScpKXtcbiAgICAgICAgJGl0ZW0ucmVtb3ZlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gbWV0YURhdGFSb3dzSFRNTChpdGVtKSB7XG4gICAgaWYgKCFpdGVtLm1ldGFfZGF0YSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBodG1sID0gJyc7XG4gICAgZm9yIChjb25zdCBtZXRhIG9mIGl0ZW0ubWV0YV9kYXRhKXtcbiAgICAgICAgY29uc3Qga2V5VGV4dCA9IGNhcGl0YWxpemVGaXJzdExldHRlcihtZXRhLmtleS5yZXBsYWNlKC9fL2csICcgJykpO1xuICAgICAgICBodG1sICs9IGA8YnI+PHNwYW4gY2xhc3M9XCJtdXRlZCBtbC1oYWxmXCI+PGI+JHtrZXlUZXh0fTwvYj46ICR7bWV0YS52YWx1ZSB8fCAnKG5vbmUpJ308L3NwYW4+YDtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWw7XG59XG5mdW5jdGlvbiBmb3JtYXR0ZWRJdGVtRGF0YUhUTUwoaXRlbSkge1xuICAgIGlmICghaXRlbS5mb3JtYXR0ZWRfaXRlbV9kYXRhKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0uZm9ybWF0dGVkX2l0ZW1fZGF0YS5yZXBsYWNlKC8mbmJzcDsvZywgJycpO1xufVxuZnVuY3Rpb24gZ3JlYXRlclRoYW4oYSwgYikge1xuICAgIGNvbnN0IFttYWpvckEsIG1pbm9yQSwgcGF0Y2hBXSA9IFN0cmluZyhhKS5zcGxpdCgnLicpLm1hcCgobik9Pk51bWJlcihuKVxuICAgICk7XG4gICAgY29uc3QgW21ham9yQiwgbWlub3JCLCBwYXRjaEJdID0gU3RyaW5nKGIpLnNwbGl0KCcuJykubWFwKChuKT0+TnVtYmVyKG4pXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSBtYWpvckEgLSBtYWpvckIgfHwgbWlub3JBIC0gbWlub3JCIHx8IHBhdGNoQSAtIHBhdGNoQjtcbiAgICByZXR1cm4gcmVzdWx0ID4gMDtcbn1cbmZ1bmN0aW9uIGluaXRTdHJpcGVCdXR0b24oKSB7XG4gICAgc2hvd1N0cmlwZVBheW1lbnRPcHRpb24oKTtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0U3RyaXBlUGF5bWVudE1ldGhvZCk7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlclN0cmlwZUJ1dHRvbkRpc3BsYXkoUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksIEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkpO1xuICAgICAgICByZW5kZXJTdHJpcGVQYXltZW50TWV0aG9kKFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSk7XG4gICAgICAgIHJlbmRlclN0cmlwZUJ1dHRvbkxvYWRpbmcoUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksIEVudmlyb25tZW50Lm1vZGFsVUkubG9hZGluZ01vZGUoKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJTdHJpcGVCdXR0b25EaXNwbGF5KG1ldGhvZCwgcGFnZSwgbG9hZGluZ01vZGUpIHtcbiAgICBpZiAobWV0aG9kID09PSAnc3RyaXBlJyAmJiBwYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1jb250YWluZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLWNvbnRhaW5lcicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH1cbiAgICBpZiAobWV0aG9kID09PSAnc3RyaXBlJyAmJiBwYWdlID09PSAncGF5bWVudCcgJiYgbG9hZGluZ01vZGUgIT09ICdsb2FkaW5nJykge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlclN0cmlwZUJ1dHRvbkxvYWRpbmcobWV0aG9kLCBtb2RlKSB7XG4gICAgaWYgKG1ldGhvZCAhPT0gJ3N0cmlwZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobW9kZSA9PT0gJ2ZpbmlzaGVkJykge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNoaXBwaW5nLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNoaXBwaW5nLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuID4gLmJ1dHRvbi10ZXh0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0TG9jYWxlVGV4dCgncHJvY2Vzc2luZycpXG4gICAgICAgICk7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4tc3Bpbm5lcicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4gPiAuYnV0dG9uLXRleHQnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBgJHtnZXRMb2NhbGVUZXh0KCdwYXknKX0gJHtmb3JtYXRDdXJyZW5jeVN0cmluZyhEZWZhdWx0Q2FydC50b3RhbCgpKX1gXG4gICAgICAgICk7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4tc3Bpbm5lcicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNob3dTdHJpcGVQYXltZW50T3B0aW9uKCkge1xuICAgICRxcygnI3N0cmlwZS1vcHRpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGZvciAoY29uc3QgJGNvbnRhaW5lciBvZiAkcXNBbGwoJy5zdHJpcGUtYnRuLWNvbnRhaW5lcicpKXtcbiAgICAgICAgJGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0U3RyaXBlUGF5bWVudE1ldGhvZCgpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVQcmVmZXJyZWRQYXltZW50TWV0aG9kKCdzdHJpcGUnKSk7XG59XG5mdW5jdGlvbiByZW5kZXJTdHJpcGVQYXltZW50TWV0aG9kKG1ldGhvZCwgcGFnZSkge1xuICAgIGlmIChtZXRob2QgPT09ICdzdHJpcGUnICYmIHBhZ2UgPT09ICdwYXltZW50Jykge1xuICAgICAgICAkcXMoJyNzdHJpcGUtcG0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNzdHJpcGUtcG0nKT8uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLW9wdGlvbicsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjY2FyZC1lbGVtZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNzdHJpcGUtcG0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJyk/LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgICAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGY0ZjQnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2NhcmQtZWxlbWVudCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFN0cmlwZVBheW1lbnRSZXF1ZXN0KG1lc3NhZ2UsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGlmICghRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLlNUUklQRV9QQVlNRU5UX1JFUVVFU1QpIHx8IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbml0TWVzc2FnZSA9IHtcbiAgICAgICAgZXZlbnQ6ICdwcC1pbml0LXN0cmlwZS1wYXltZW50LXJlcXVlc3QnLFxuICAgICAgICBzdHJpcGU6IHtcbiAgICAgICAgICAgIGxvY2FsZTogbWVzc2FnZS5icm93c2VyTG9jYWxlLFxuICAgICAgICAgICAgbGl2ZTogIWlzRGV2RW52aXJvbm1lbnQoZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkpXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbmN5Q29kZTogTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSxcbiAgICAgICAgY2FydENhbGN1bGF0aW9uUmVjb3JkOiBzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1xuICAgIH07XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2UoaW5pdE1lc3NhZ2UsICcqJyk7XG4gICAgb25XaW5kb3dEYXRhRmV0Y2goJ3BwLXN0cmlwZS1wYXltZW50LXJlcXVlc3QtYWRkcmVzcy1jaGFuZ2UnLCBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdEFkZHJlc3NDaGFuZ2UpO1xuICAgIG9uV2luZG93RGF0YUZldGNoKCdwcC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0LXNoaXBwaW5nLWNoYW5nZScsIGhhbmRsZVN0cmlwZVBheW1lbnRSZXF1ZXN0U2hpcHBpbmdDaGFuZ2UpO1xuICAgIG9uV2luZG93RGF0YUZldGNoKCdwcC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0LXByb2Nlc3MtcGF5bWVudCcsIGFzeW5jIChyZXF1ZXN0KT0+YXdhaXQgaGFuZGxlU3RyaXBlUGF5bWVudFJlcXVlc3RQcm9jZXNzUGF5bWVudChyZXF1ZXN0LCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpXG4gICAgKTtcbiAgICBjb25zdCBwcmV2aW91c1VwZGF0ZURhdGEgPSAnJztcbiAgICBjb25zdCB1bnN1YnNjcmliZVBheW1lbnRSZXF1ZXN0VXBkYXRlcyA9IHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICBjb25zdCBwYXltZW50UmVxdWVzdERhdGFVcGRhdGUgPSBnZXRTdHJpcGVQYXltZW50UmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0gSlNPTi5zdHJpbmdpZnkocGF5bWVudFJlcXVlc3REYXRhVXBkYXRlKTtcbiAgICAgICAgaWYgKHByZXZpb3VzVXBkYXRlRGF0YSAhPT0gdXBkYXRlRGF0YSkge1xuICAgICAgICAgICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2UocGF5bWVudFJlcXVlc3REYXRhVXBkYXRlLCAnKicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdwcC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0LXN0b3AnLCB1bnN1YnNjcmliZVBheW1lbnRSZXF1ZXN0VXBkYXRlcyk7XG59XG5mdW5jdGlvbiBnZXRTdHJpcGVQYXltZW50UmVxdWVzdFVwZGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBldmVudDogJ3BwLXVwZGF0ZS1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0JyxcbiAgICAgICAgY3VycmVuY3lDb2RlOiBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29kZSgpLFxuICAgICAgICBjYXJ0Q2FsY3VsYXRpb25SZWNvcmQ6IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzXG4gICAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN0cmlwZVBheW1lbnRSZXF1ZXN0UHJvY2Vzc1BheW1lbnQocmVxdWVzdCwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3Qgc3RyaXBlQ3VzdG9tZXJJZCA9IGF3YWl0IHN0cmlwZVNlcnZpY2UuY3JlYXRlU3RyaXBlQ3VzdG9tZXIocmVxdWVzdC50b2tlbi5pZCwge1xuICAgICAgICBuYW1lOiByZXF1ZXN0LnBheWVyTmFtZSxcbiAgICAgICAgZW1haWw6IHJlcXVlc3QucGF5ZXJFbWFpbCxcbiAgICAgICAgcGhvbmU6IHJlcXVlc3QucGF5ZXJQaG9uZVxuICAgIH0pO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgZW1haWw6IHJlcXVlc3QucGF5ZXJFbWFpbCxcbiAgICAgICAgcGhvbmU6IHJlcXVlc3QucGF5ZXJQaG9uZSxcbiAgICAgICAgbmFtZV9maXJzdDogcmVxdWVzdC5wYXllck5hbWUuc3BsaXQoJyAnKVswXSA/PyAnJyxcbiAgICAgICAgbmFtZV9sYXN0OiByZXF1ZXN0LnBheWVyTmFtZS5zcGxpdCgnICcpWzFdID8/ICcnLFxuICAgICAgICBhZGRyZXNzMTogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MuYWRkcmVzc0xpbmVbMF0sXG4gICAgICAgIGFkZHJlc3MyOiByZXF1ZXN0LnNoaXBwaW5nQWRkcmVzcy5hZGRyZXNzTGluZVsxXSA/PyAnJyxcbiAgICAgICAgY2l0eTogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MuY2l0eSxcbiAgICAgICAgc3RhdGU6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLnJlZ2lvbixcbiAgICAgICAgY291bnRyeTogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MuY291bnRyeSxcbiAgICAgICAgcG9zdGFsOiByZXF1ZXN0LnNoaXBwaW5nQWRkcmVzcy5wb3N0YWxDb2RlLFxuICAgICAgICBjYXJkOiB7XG4gICAgICAgICAgICBicmFuZDogcmVxdWVzdC50b2tlbi5jYXJkLmJyYW5kLFxuICAgICAgICAgICAgbGFzdDQ6IHJlcXVlc3QudG9rZW4uY2FyZC5sYXN0NFxuICAgICAgICB9LFxuICAgICAgICBzdHJpcGVfY3VzdG9tZXJfaWQ6IHN0cmlwZUN1c3RvbWVySWQsXG4gICAgICAgIHBheW1lbnRfb3B0aW9uOiAnc3RyaXBlJ1xuICAgIH0pKTtcbiAgICBpZiAoIWF3YWl0IHZhbGlkYXRlQWRkcmVzcygpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdpbnZhbGlkX3NoaXBwaW5nX2FkZHJlc3MnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHNhdmVDdXN0b21lclRvQnJvd3NlcihzdHJpcGVDdXN0b21lcklkLCByZXF1ZXN0LnRva2VuLmNhcmQuYnJhbmQsIHJlcXVlc3QudG9rZW4uY2FyZC5sYXN0NCwgJ3N0cmlwZScpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgb3JkZXJTZXJ2aWNlLnBsYWNlT3JkZXIoKTtcbiAgICAgICAgY29uc3QgcGF5bWVudFJlc3VsdCA9IGF3YWl0IHN0cmlwZVNlcnZpY2UucHJvY2Vzc1BheW1lbnQob3JkZXIpO1xuICAgICAgICBpZiAoIShhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKSkub2spIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnZmFpbCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwYXltZW50UmVzdWx0KSB7XG4gICAgICAgICAgICBhd2FpdCBvcmRlclNlcnZpY2Uuc2V0T3JkZXJTdGF0dXMob3JkZXIsICd3Yy1mYWlsZWQnLCB7XG4gICAgICAgICAgICAgICAgc3RyaXBlQ3VzdG9tZXJJZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2ZhaWwnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yZGVyU3RhdHVzUmVzdWx0ID0gYXdhaXQgb3JkZXJTZXJ2aWNlLnNldE9yZGVyU3RhdHVzKG9yZGVyLCAnd2MtcHJvY2Vzc2luZycsIHtcbiAgICAgICAgICAgIHN0cmlwZUN1c3RvbWVySWRcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghb3JkZXJTdGF0dXNSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnZmFpbCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgcmVkaXJlY3RVUkw6IG9yZGVyU3RhdHVzUmVzdWx0XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBTdHJpcGUgcGF5bWVudCByZXF1ZXN0IHByb2Nlc3MgcGF5bWVudCBmYWlsZWQgb24gJHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX0uIEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdmYWlsJ1xuICAgICAgICB9O1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN0cmlwZVBheW1lbnRSZXF1ZXN0QWRkcmVzc0NoYW5nZShyZXF1ZXN0KSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ3VzdG9tZXIoe1xuICAgICAgICAuLi5QZWFjaFBheUN1c3RvbWVyLmRhdGEoKSxcbiAgICAgICAgYWRkcmVzczE6IHJlcXVlc3QuYWRkcmVzc0xpbmVbMF0gPz8gJycsXG4gICAgICAgIGFkZHJlc3MyOiByZXF1ZXN0LmFkZHJlc3NMaW5lWzFdID8/ICcnLFxuICAgICAgICBjaXR5OiByZXF1ZXN0LmNpdHkgPz8gJycsXG4gICAgICAgIHBvc3RhbDogcmVxdWVzdC5wb3N0YWxDb2RlID8/ICcnLFxuICAgICAgICBzdGF0ZTogcmVxdWVzdC5yZWdpb24gPz8gJycsXG4gICAgICAgIGNvdW50cnk6IHJlcXVlc3QuY291bnRyeSA/PyAnJ1xuICAgIH0pKTtcbiAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgcmV0dXJuIGdldFN0cmlwZVBheW1lbnRSZXF1ZXN0VXBkYXRlKCk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdFNoaXBwaW5nQ2hhbmdlKHJlcXVlc3QpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDYXJ0UGFja2FnZVNoaXBwaW5nTWV0aG9kKHtcbiAgICAgICAgY2FydEtleTogJzAnLFxuICAgICAgICBzaGlwcGluZ1BhY2thZ2VLZXk6ICcwJyxcbiAgICAgICAgcGFja2FnZU1ldGhvZElkOiByZXF1ZXN0LmlkXG4gICAgfSkpO1xuICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICByZXR1cm4gZ2V0U3RyaXBlUGF5bWVudFJlcXVlc3RVcGRhdGUoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGluaXRTdHJpcGVTdXBwb3J0KG1lc3NhZ2UxLCBvcmRlclNlcnZpY2UpIHtcbiAgICBjb25zdCBjb25uZWN0ZWRTdHJpcGVBY2NvdW50ID0gbWVzc2FnZTEucGhwRGF0YS5jb25uZWN0ZWRfc3RyaXBlX2FjY291bnQ7XG4gICAgY29uc3QgaXNEZXZNb2RlID0gaXNEZXZFbnZpcm9ubWVudChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSk7XG4gICAgaWYgKGdyZWF0ZXJUaGFuKEVudmlyb25tZW50LnBsdWdpbi52ZXJzaW9uKCksICcxLjU3LjEnKSAmJiAhY29ubmVjdGVkU3RyaXBlQWNjb3VudCAmJiAhRW52aXJvbm1lbnQudGVzdE1vZGUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLlNUUklQRSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSBpc0Rldk1vZGUgPyAncGtfdGVzdF9Dbkwya0E1MlY1ZFJxWmJqbEowc1oyZ3IwMHVCck9FbVFRJyA6ICdwa19saXZlX29ST25JUUR1ZXhIWnBuRU9jVWZmM0NSejAwYXNhT09DQUwnO1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBsb2NhbGU6IG1lc3NhZ2UxPy5icm93c2VyTG9jYWxlID8/ICdhdXRvJ1xuICAgIH07XG4gICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpICE9PSAnd29vLnBlYWNocGF5LmFwcCcgJiYgTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkgIT09ICdzaG9wLnBlYWNocGF5LmFwcCcpIHtcbiAgICAgICAgY29uc3Qgc3RyaXBlQWNjb3VudCA9IGF3YWl0IGZldGNoU3RyaXBlQWNjb3VudChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSk7XG4gICAgICAgIGlmIChzdHJpcGVBY2NvdW50KSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgc3RyaXBlQWNjb3VudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdHJpcGVGb3JDaGVja2luZ1BheW1lbnRJbnRlbnQgPSBTdHJpcGUoa2V5LCBvcHRpb25zKTtcbiAgICBjb25zdCBzdHJpcGUgPSBTdHJpcGUoa2V5LCB7XG4gICAgICAgIGxvY2FsZTogbWVzc2FnZTEuYnJvd3NlckxvY2FsZSA/PyAnYXV0bydcbiAgICB9KTtcbiAgICBjb25zdCBlbGVtZW50cyA9IHN0cmlwZS5lbGVtZW50cygpO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMzMzMnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJyxcbiAgICAgICAgICAgIGZvbnRTbW9vdGhpbmc6ICdhbnRpYWxpYXNlZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgJzo6cGxhY2Vob2xkZXInOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjOTk5J1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkOiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmYTc1NWEnLFxuICAgICAgICAgICAgaWNvbkNvbG9yOiAnI2ZhNzU1YSdcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgJGNhcmQgPSBlbGVtZW50cy5jcmVhdGUoJ2NhcmQnLCB7XG4gICAgICAgIHN0eWxlLFxuICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgIH0pO1xuICAgICRjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgJGNhcmQub24oJ2NoYW5nZScsIChldmVudCk9PntcbiAgICAgICAgJHFzKCcjY2FyZC1lcnJvcnMnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGV2ZW50LmVycm9yPy5tZXNzYWdlID8/ICcnXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3Qgc3RyaXBlU2VydmljZSA9IHtcbiAgICAgICAgJGNhcmQsXG4gICAgICAgIGVsZW1lbnRzLFxuICAgICAgICBzdHJpcGUsXG4gICAgICAgIHN0cmlwZUZvclBheW1lbnRJbnRlbnQ6IHN0cmlwZUZvckNoZWNraW5nUGF5bWVudEludGVudCxcbiAgICAgICAgY3JlYXRlU3RyaXBlQ3VzdG9tZXI6IGFkZENhcmRUb1N0cmlwZUN1c3RvbWVyLFxuICAgICAgICBwcm9jZXNzUGF5bWVudDogYXN5bmMgKG9yZGVyKT0+YXdhaXQgaGFuZGxlU3RyaXBlUGF5bWVudChvcmRlcilcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUluamVjdGVkUHJvY2Vzc1BheW1lbnQgPSBhc3luYyAoZXZlbnQpPT57XG4gICAgICAgIGlmICghY2hlY2tSZXF1aXJlZEZpZWxkcygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgaGFuZGxlUHJvY2Vzc1BheW1lbnQoZXZlbnQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSk7XG4gICAgfTtcbiAgICBpbml0U3RyaXBlQnV0dG9uKCk7XG4gICAgaW5pdFN0cmlwZVBheW1lbnRSZXF1ZXN0KG1lc3NhZ2UxLCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpO1xuICAgIG9uV2luZG93TWVzc2FnZSgnM0RTLWF1dGhlbnRpY2F0aW9uLWNvbXBsZXRlJywgYXN5bmMgKG1lc3NhZ2UpPT5hd2FpdCBvbjNEU0NvbXBsZXRlKG1lc3NhZ2UucGF5bWVudEludGVudENsaWVudFNlY3JldCwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKVxuICAgICk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdzdWJtaXRQYXltZW50JywgYXN5bmMgKG1lc3NhZ2UpPT57XG4gICAgICAgIEdMT0JBTC5jb21wbGV0ZWRPcmRlciA9IG1lc3NhZ2Uub3JkZXI7XG4gICAgICAgIGF3YWl0IGxlZ2FjeUhhbmRsZVN0cmlwZVBheW1lbnQobWVzc2FnZS5vcmRlciwgb3JkZXJTZXJ2aWNlKTtcbiAgICB9KTtcbiAgICAkcXMoJyNwcC1wYXknKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVJbmplY3RlZFByb2Nlc3NQYXltZW50KTtcbiAgICAkcXMoJyNwcC1wYXktbW9iaWxlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSW5qZWN0ZWRQcm9jZXNzUGF5bWVudCk7XG4gICAgJHFzKCcjcHAtcGF5LWV4aXN0aW5nJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSW5qZWN0ZWRQcm9jZXNzUGF5bWVudCk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVQcm9jZXNzUGF5bWVudChldmVudCwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgeyAkY2FyZCAsIHN0cmlwZSAgfSA9IHN0cmlwZVNlcnZpY2U7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsUHJvY2Vzc2luZygpKTtcbiAgICBpZiAoIUVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN0cmlwZS5jcmVhdGVUb2tlbigkY2FyZCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVG9rZW5FcnJvcihyZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyU3RyaXBlSWQoYXdhaXQgYWRkQ2FyZFRvU3RyaXBlQ3VzdG9tZXIocmVzdWx0LnRva2VuLmlkLCBQZWFjaFBheUN1c3RvbWVyLnN0cmlwZURldGFpbHMoKSkpKTtcbiAgICAgICAgICAgIHNhdmVDdXN0b21lclRvQnJvd3NlcihQZWFjaFBheUN1c3RvbWVyLnN0cmlwZUlkKCksIHJlc3VsdC50b2tlbi5jYXJkLmJyYW5kLCByZXN1bHQudG9rZW4uY2FyZC5sYXN0NCwgJ3N0cmlwZScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgRmFpbGVkIHRva2VuaXppbmcgb3IgY3JlYXRpbmcgYSBuZXcgc3RyaXBlIGN1c3RvbWVyIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9IEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5wbGFjZU9yZGVyKCk7XG59XG5hc3luYyBmdW5jdGlvbiBmZXRjaFN0cmlwZUFjY291bnQoZG9tYWluKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArIGBhcGkvdjEvbWVyY2hhbnRzLyR7ZG9tYWlufS9zdHJpcGUtYWNjb3VudGApO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG59XG5mdW5jdGlvbiBoYW5kbGVUb2tlbkVycm9yKGVycm9yKSB7XG4gICAgJHFzKCcjY2FyZC1lcnJvcnMnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yLm1lc3NhZ2VcbiAgICApO1xuICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG59XG5hc3luYyBmdW5jdGlvbiBvbjNEU0NvbXBsZXRlKHBheW1lbnRJbnRlbnRDbGllbnRTZWNyZXQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHsgc3RyaXBlRm9yUGF5bWVudEludGVudCAsIHN0cmlwZSAgfSA9IHN0cmlwZVNlcnZpY2U7XG4gICAgJHFzKCcjc3RyaXBlLTNEUy1tb2RhbCcpPy5yZW1vdmUoKTtcbiAgICBjb25zdCBnZXRQYXltZW50SW50ZW50ID0gYXN5bmMgKCk9PntcbiAgICAgICAgY29uc3QgZG9tYWluID0gbG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgIGNvbnN0IGlzT3VyU3RvcmUgPSBkb21haW4gPT09ICd3b28ucGVhY2hwYXkuYXBwJyB8fCBkb21haW4gPT09ICdzaG9wLnBlYWNocGF5LmFwcCcgfHwgZG9tYWluID09PSAnbG9jYWxob3N0JyB8fCBkb21haW4gPT09ICd3b28uc3RvcmUubG9jYWwnIHx8IGRvbWFpbiA9PT0gJ3N0b3JlLmxvY2FsJztcbiAgICAgICAgaWYgKGlzT3VyU3RvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBzdHJpcGUucmV0cmlldmVQYXltZW50SW50ZW50KHBheW1lbnRJbnRlbnRDbGllbnRTZWNyZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHN0cmlwZUZvclBheW1lbnRJbnRlbnQucmV0cmlldmVQYXltZW50SW50ZW50KHBheW1lbnRJbnRlbnRDbGllbnRTZWNyZXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRQYXltZW50SW50ZW50KCk7XG4gICAgaWYgKHJlc3VsdC5lcnJvciB8fCByZXN1bHQucGF5bWVudEludGVudC5zdGF0dXMgPT09ICdyZXF1aXJlc19wYXltZW50X21ldGhvZCcpIHtcbiAgICAgICAgaGFuZGxlM0RTRXJyb3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnBheW1lbnRJbnRlbnQuc3RhdHVzID09PSAnc3VjY2VlZGVkJyAmJiBHTE9CQUwuY29tcGxldGVkT3JkZXIpIHtcbiAgICAgICAgaWYgKCEoYXdhaXQgb3JkZXJTZXJ2aWNlLnNldFBheW1lbnRTdGF0dXMoUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSwgdHJ1ZSkpLm9rKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMoR0xPQkFMLmNvbXBsZXRlZE9yZGVyLCB7XG4gICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgIHBheW1lbnRUeXBlOiAnU3RyaXBlJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBhZGRDYXJkVG9TdHJpcGVDdXN0b21lcih0b2tlbklELCBjdXN0b21lcikge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgICdjdXN0b21lcl9pZCc6IG51bGwsXG4gICAgICAgICdjYXJkX3Rva2VuJzogdG9rZW5JRCxcbiAgICAgICAgJ25hbWUnOiBjdXN0b21lci5uYW1lLFxuICAgICAgICAnZW1haWwnOiBjdXN0b21lci5lbWFpbCxcbiAgICAgICAgJ3Bob25lJzogY3VzdG9tZXIucGhvbmVcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ2NhcmQnLCBvcHRpb25zKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIHBlYWNocGF5QWxlcnQoZGF0YSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBTdHJpcGUgQ3VzdG9tZXIgb24gJHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX0uIEVycm9yOiAke2RhdGF9YCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGEuY3VzdG9tZXI7XG59XG5mdW5jdGlvbiBzaG93M0RTZWN1cmVNb2RhbCh1cmwpIHtcbiAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuaWQgPSAnc3RyaXBlLTNEUy1tb2RhbCc7XG4gICAgaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3N0cmlwZS0zZHMtZnJhbWUnKTtcbiAgICBpZnJhbWUuc3JjID0gdXJsO1xuICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uYXBwZW5kKGlmcmFtZSk7XG4gICAgc2hvd0xvYWRpbmdTY3JlZW4oKTtcbiAgICBoaWRlT3RoZXJTY3JvbGxCYXJzKCk7XG59XG5mdW5jdGlvbiBoYW5kbGUzRFNFcnJvcigpIHtcbiAgICBoaWRlTG9hZGluZ1NjcmVlbigpO1xuICAgIHNob3dPdGhlclNjcm9sbEJhcnMoKTtcbiAgICBwZWFjaHBheUFsZXJ0KGdldExvY2FsZVRleHQoJ3NvbWV0aGluZy13ZW50LXdyb25nJykpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50KG9yZGVyKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgc2Vzc2lvbklEOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLFxuICAgICAgICBzdHJpcGVDdXN0b21lcklEOiBQZWFjaFBheUN1c3RvbWVyLnN0cmlwZUlkKCksXG4gICAgICAgIG9yZGVyLFxuICAgICAgICByZXR1cm5VUkw6IGAke0dMT0JBTC5waHBEYXRhPy5wbHVnaW5fYXNzZXRfdXJsID8/ICcnfS9wdWJsaWMvZGlzdC9jaGVja291dC1tb2RhbC8zZHMuaHRtbGBcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ2FwaS92MS9zZXNzaW9uL3BheScsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gcmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnO1xufVxuYXN5bmMgZnVuY3Rpb24gbGVnYWN5SGFuZGxlU3RyaXBlUGF5bWVudChvcmRlciwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgc2Vzc2lvbklEOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLFxuICAgICAgICBzdHJpcGVDdXN0b21lcklEOiBQZWFjaFBheUN1c3RvbWVyLnN0cmlwZUlkKCksXG4gICAgICAgIG9yZGVyLFxuICAgICAgICByZXR1cm5VUkw6IGAke0dMT0JBTC5waHBEYXRhPy5wbHVnaW5fYXNzZXRfdXJsID8/ICcnfS9wdWJsaWMvZGlzdC9jaGVja291dC1tb2RhbC8zZHMuaHRtbGBcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ2FwaS92MS9zZXNzaW9uL3BheScsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBzd2l0Y2gocmVzdWx0LnN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgaWYgKCEoYXdhaXQgb3JkZXJTZXJ2aWNlLnNldFBheW1lbnRTdGF0dXMoUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSwgdHJ1ZSkpLm9rKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5zZXRPcmRlclN0YXR1cyhvcmRlciwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ3djLXByb2Nlc3NpbmcnLFxuICAgICAgICAgICAgICAgIHBheW1lbnRUeXBlOiAnU3RyaXBlJyxcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklEOiByZXN1bHQuY2hhcmdlSWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzX2FjdGlvbic6XG4gICAgICAgICAgICBzaG93M0RTZWN1cmVNb2RhbChyZXN1bHQ/LnVybCA/PyAnJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmFpbHVyZSc6XG4gICAgICAgICAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5zZXRPcmRlclN0YXR1cyhvcmRlciwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ3djLWZhaWxlZCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0Lm1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHBlYWNocGF5QWxlcnQocmVzdWx0Py5tZXNzYWdlID8/ICcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgIH1cbn1cbmZ1bmN0aW9uIGhpZGVPdGhlclNjcm9sbEJhcnMoKSB7XG4gICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcsICgkZWxlbWVudCk9PntcbiAgICAgICAgaWYgKCRlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNob3dPdGhlclNjcm9sbEJhcnMoKSB7XG4gICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcsICgkZWxlbWVudCk9PntcbiAgICAgICAgaWYgKCRlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhpZGVMb2FkaW5nU2NyZWVuKCkge1xuICAgICRxcygnI2xvYWRpbmcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICRxcygnI2xvYWRpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnZmxleC1jb250YWluZXInKTtcbn1cbmZ1bmN0aW9uIHNob3dMb2FkaW5nU2NyZWVuKCkge1xuICAgICRxcygnI2xvYWRpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI2xvYWRpbmcnKT8uY2xhc3NMaXN0LmFkZCgnZmxleC1jb250YWluZXInKTtcbn1cbmxldCBwYXlwYWxNZXJjaGFudElEID0gbnVsbDtcbmNvbnN0IEJOX0NPREVfU0FOREJPWCA9ICdGTEFWT1JzYi02am9wdjY1NDAyNzVfTVAnO1xuY29uc3QgQk5fQ09ERV9QUk9EVUNUSU9OID0gJ1BlYWNoX1NQX1BQQ1AnO1xuZnVuY3Rpb24gaW5pdFBheVBhbEV2ZW50cygpIHtcbiAgICAkcXMoJyNwYXlwYWwtb3B0aW9uJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGF5cGFsUGF5bWVudE9wdGlvbik7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlclBheVBhbEJ1dHRvbihQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3BheXBhbCcgJiYgRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkgPT09ICdwYXltZW50Jyk7XG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBwYXlwYWxMb2FkU2NyaXB0cyhzY3JpcHRVUkxzKSB7XG4gICAgZnVuY3Rpb24gbG9hZChzY3JpcHRVUkwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfKT0+e1xuICAgICAgICAgICAgaWYgKHBheXBhbExvYWRTY3JpcHRzLmxvYWRlZC5oYXMoc2NyaXB0VVJMKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gc2NyaXB0VVJMO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmRhdGFQYXJ0bmVyQXR0cmlidXRpb25JZCA9IGlzRGV2RW52aXJvbm1lbnQoZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkpID8gQk5fQ09ERV9TQU5EQk9YIDogQk5fQ09ERV9QUk9EVUNUSU9OO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHNjcmlwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2NyaXB0VVJMMiBvZiBzY3JpcHRVUkxzKXtcbiAgICAgICAgcHJvbWlzZXMucHVzaChsb2FkKHNjcmlwdFVSTDIpKTtcbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGZvciAoY29uc3Qgc2NyaXB0VVJMMSBvZiBzY3JpcHRVUkxzKXtcbiAgICAgICAgcGF5cGFsTG9hZFNjcmlwdHMubG9hZGVkLmFkZChzY3JpcHRVUkwxKTtcbiAgICB9XG59XG5wYXlwYWxMb2FkU2NyaXB0cy5sb2FkZWQgPSBuZXcgU2V0KCk7XG5hc3luYyBmdW5jdGlvbiBsb2FkUGF5UGFsU2NyaXB0KCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyBgYXBpL3YxL3BheXBhbC9tZXJjaGFudEFuZENsaWVudD9tZXJjaGFudEhvc3RuYW1lPSR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9YCwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1lcmNoYW50ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAobWVyY2hhbnQucGF5cGFsTWVyY2hhbnRJRCAhPT0gJycpIHtcbiAgICAgICAgICAgIHBheXBhbE1lcmNoYW50SUQgPSBtZXJjaGFudC5wYXlwYWxNZXJjaGFudElEO1xuICAgICAgICAgICAgYXdhaXQgcGF5cGFsTG9hZFNjcmlwdHMoW1xuICAgICAgICAgICAgICAgIGBodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz8mY2xpZW50LWlkPSR7bWVyY2hhbnQuY2xpZW50SUR9Jm1lcmNoYW50LWlkPSR7bWVyY2hhbnQucGF5cGFsTWVyY2hhbnRJRH0mZGlzYWJsZS1mdW5kaW5nPXBheWxhdGVyLGNhcmQsYmFuY29udGFjdCxibGlrLGVwcyxnaXJvcGF5LGlkZWFsLG15YmFuayxwMjQsc29mb3J0JmN1cnJlbmN5PSR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKX1gLCBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBGYWlsZWQgdG8gcmV0cmlldmUgcGF5cGFsIG1lcmNoYW50IElkIG9yIGxvYWQgUGF5cGFsIFNjcmlwdHMgb24gJHtsb2NhdGlvbi5ob3N0bmFtZX0uIFBsdWdpbiBNb2RlOiAke0Vudmlyb25tZW50LnBsdWdpbi5tb2RlKCl9LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuYXN5bmMgZnVuY3Rpb24gaW5pdFBheVBhbFN1cHBvcnQobWVzc2FnZSwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgcGF5cGFsQ2hlY2tlZCA9IG1lc3NhZ2UucGhwRGF0YS5wYXlwYWw7XG4gICAgaWYgKCFwYXlwYWxDaGVja2VkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFhd2FpdCBsb2FkUGF5UGFsU2NyaXB0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbml0UGF5UGFsRXZlbnRzKCk7XG4gICAgaWYgKHBheXBhbE1lcmNoYW50SUQgJiYgTnVtYmVyLnBhcnNlSW50KHBheXBhbENoZWNrZWQgPz8gJzAnKSkge1xuICAgICAgICBhd2FpdCBpbml0UGF5UGFsQnV0dG9uKG9yZGVyU2VydmljZSk7XG4gICAgICAgIHNob3dQYXlQYWxCdXR0b24oKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0UGF5UGFsQnV0dG9uKG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0ICRwYXlwYWxCdXR0b24gPSBwYXlwYWwuQnV0dG9ucyh7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IDU1XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGNyZWF0ZU9yZGVyICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGVQYXlQYWxPcmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICBvbkFwcHJvdmUgKGRhdGEsIGFjdGlvbnMpIHtcbiAgICAgICAgICAgIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcigpO1xuICAgICAgICAgICAgcGxhY2VPcmRlck9uU3RvcmVBbmRMaXN0ZW5Gb3JDb21wbGV0aW9uKGRhdGEsIGFjdGlvbnMsIG9yZGVyU2VydmljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xpY2sgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrUmVxdWlyZWRGaWVsZHMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICRwYXlwYWxCdXR0b24ucmVuZGVyKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInKTtcbiAgICAkcGF5cGFsQnV0dG9uLnJlbmRlcignI3BheXBhbC1idXR0b24tY29udGFpbmVyLW1vYmlsZScpO1xuICAgICRwYXlwYWxCdXR0b24ucmVuZGVyKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItZXhpc3RpbmcnKTtcbn1cbmZ1bmN0aW9uIHJlc3RhcnRBY3Rpb24oYWN0aW9ucykge1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCk9PntcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09ICdwYXlwYWxSZXN0YXJ0Jykge1xuICAgICAgICAgICAgYWN0aW9ucy5yZXN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBheVBhbE9yZGVyKCkge1xuICAgIGNvbnN0IG1vY2tPcmRlclJlc3VsdCA9IHtcbiAgICAgICAgZG9tYWluOiBNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSxcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgbnVtYmVyOiAnJyxcbiAgICAgICAgICAgIGN1cnJlbmN5OiBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29kZSgpLFxuICAgICAgICAgICAgZGlzY291bnRfdG90YWw6IERlZmF1bHRDYXJ0LnRvdGFsQXBwbGllZENvdXBvbnMoKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgc2hpcHBpbmdfdG90YWw6IERlZmF1bHRDYXJ0LnRvdGFsU2hpcHBpbmcoKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgdG90YWw6IERlZmF1bHRDYXJ0LnRvdGFsKCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHRvdGFsX3RheDogR0xPQkFMLnBocERhdGE/LndjX3ByaWNlc19pbmNsdWRlX3RheCA/ICcwLjAwJyA6IERlZmF1bHRDYXJ0LnRvdGFsVGF4KCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHNoaXBwaW5nOiBwYXlwYWxDdXN0b21lckFkZHJlc3MoKSxcbiAgICAgICAgICAgIGxpbmVfaXRlbXM6IGdldExpbmVJdGVtcygpLFxuICAgICAgICAgICAgc2hpcHBpbmdfbGluZXM6IGdldFNoaXBwaW5nTGluZXMoKSxcbiAgICAgICAgICAgIGZlZV90b3RhbDogRGVmYXVsdENhcnQudG90YWxBcHBsaWVkRmVlcygpLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgb3JkZXJSZXN1bHQ6IG1vY2tPcmRlclJlc3VsdCxcbiAgICAgICAgc2Vzc2lvbklEOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLFxuICAgICAgICBwYXlwYWxNZXJjaGFudElEXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ2FwaS92MS9wYXlwYWwvb3JkZXInLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiByZXN1bHQuaWQ7XG59XG5mdW5jdGlvbiBwYXlwYWxDdXN0b21lckFkZHJlc3MoKSB7XG4gICAgY29uc3QgeyBmaXJzdE5hbWUgLCBsYXN0TmFtZSAsIGFkZHJlc3MxICwgYWRkcmVzczIgLCBjaXR5ICwgc3RhdGUgLCBwb3N0YWwgLCBjb3VudHJ5ICwgcGhvbmUgLCBlbWFpbCAgfSA9IFBlYWNoUGF5Q3VzdG9tZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlyc3RfbmFtZTogZmlyc3ROYW1lKCksXG4gICAgICAgIGxhc3RfbmFtZTogbGFzdE5hbWUoKSxcbiAgICAgICAgY29tcGFueTogJycsXG4gICAgICAgIGFkZHJlc3NfMTogYWRkcmVzczEoKSxcbiAgICAgICAgYWRkcmVzc18yOiBhZGRyZXNzMigpLFxuICAgICAgICBjaXR5OiBjaXR5KCksXG4gICAgICAgIHN0YXRlOiBzdGF0ZSgpLFxuICAgICAgICBwb3N0Y29kZTogcG9zdGFsKCksXG4gICAgICAgIGNvdW50cnk6IGNvdW50cnkoKSxcbiAgICAgICAgcGhvbmU6IHBob25lKCksXG4gICAgICAgIGVtYWlsOiBlbWFpbCgpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldExpbmVJdGVtcygpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBEZWZhdWx0Q2FydC5jb250ZW50cygpKXtcbiAgICAgICAgY29uc3QgbGluZUl0ZW0gPSB7XG4gICAgICAgICAgICAnaWQnOiBpdGVtLnByb2R1Y3RfaWQsXG4gICAgICAgICAgICAnbmFtZSc6IGl0ZW0ubmFtZV93aXRoX3ZhcmlhdGlvbiB8fCBpdGVtLm5hbWUgKyAoaXRlbS52YXJpYXRpb25fdGl0bGUgPyBgIC0gJHtpdGVtLnZhcmlhdGlvbl90aXRsZX1gIDogJycpLFxuICAgICAgICAgICAgJ3F1YW50aXR5JzogU3RyaW5nKGl0ZW0ucXVhbnRpdHkpLFxuICAgICAgICAgICAgJ3N1YnRvdGFsJzogU3RyaW5nKE51bWJlci5wYXJzZUZsb2F0KGl0ZW0udG90YWwpICogTnVtYmVyLnBhcnNlSW50KGl0ZW0ucXVhbnRpdHkpKSxcbiAgICAgICAgICAgICdzdWJ0b3RhbF90YXgnOiAnMC4wMCdcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKEdMT0JBTC5waHBEYXRhPy53Y19wcmljZXNfaW5jbHVkZV90YXggJiYgaXRlbS5kaXNwbGF5X3ByaWNlKSB7XG4gICAgICAgICAgICBsaW5lSXRlbS5zdWJ0b3RhbCA9IFN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChpdGVtLmRpc3BsYXlfcHJpY2UpICogTnVtYmVyLnBhcnNlSW50KGl0ZW0ucXVhbnRpdHkpKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtcy5wdXNoKGxpbmVJdGVtKTtcbiAgICB9XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YT8ud2NfcHJpY2VzX2luY2x1ZGVfdGF4KSB7XG4gICAgICAgIGl0ZW1zWzBdLnN1YnRvdGFsX3RheCA9IFN0cmluZyhEZWZhdWx0Q2FydC50b3RhbFRheCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zO1xufVxuZnVuY3Rpb24gZ2V0U2hpcHBpbmdMaW5lcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAwOiAoKCk9PntcbiAgICAgICAgICAgIGNvbnN0IHNoaXBwaW5nRGV0YWlscyA9IERlZmF1bHRDYXJ0LnNlbGVjdGVkU2hpcHBpbmdNZXRob2REZXRhaWxzKCcwJyk7XG4gICAgICAgICAgICBpZiAoIXNoaXBwaW5nRGV0YWlscykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1ldGhvZF9pZDogc2hpcHBpbmdEZXRhaWxzLnNlbGVjdGVkX21ldGhvZCxcbiAgICAgICAgICAgICAgICB0b3RhbDogU3RyaW5nKERlZmF1bHRDYXJ0LnRvdGFsU2hpcHBpbmcoKSksXG4gICAgICAgICAgICAgICAgbWV0aG9kX3RpdGxlOiBzaGlwcGluZ0RldGFpbHMubWV0aG9kc1tzaGlwcGluZ0RldGFpbHMuc2VsZWN0ZWRfbWV0aG9kXT8udGl0bGUgPz8gJydcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKClcbiAgICB9O1xufVxuZnVuY3Rpb24gc2hvd1BheVBhbExvYWRpbmdTcGlubmVyKHNob3cgPSB0cnVlKSB7XG4gICAgY29uc3Qgc3Bpbm5lcnMgPSBbXG4gICAgICAgICcjcGF5cGFsLXNwaW5uZXInLFxuICAgICAgICAnI3BheXBhbC1zcGlubmVyLW1vYmlsZScsXG4gICAgICAgICcjcGF5cGFsLXNwaW5uZXItZXhpc3RpbmcnLCBcbiAgICBdO1xuICAgIGZvciAoY29uc3Qgc3Bpbm5lciBvZiBzcGlubmVycyl7XG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAkcXMoc3Bpbm5lcik/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcyhzcGlubmVyKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBheXBhbEJ1dHRvbkNvbnRhaW5lcnMgPSBbXG4gICAgICAgICcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInLFxuICAgICAgICAnI3BheXBhbC1idXR0b24tY29udGFpbmVyLW1vYmlsZScsXG4gICAgICAgICcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItZXhpc3RpbmcnLCBcbiAgICBdO1xuICAgIGZvciAoY29uc3QgY29udGFpbmVyIG9mIHBheXBhbEJ1dHRvbkNvbnRhaW5lcnMpe1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgJHFzKGNvbnRhaW5lcik/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcyhjb250YWluZXIpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5sZXQgbGF0ZXN0T3JkZXJBdHRlbXB0ID0gMDtcbmZ1bmN0aW9uIHBsYWNlT3JkZXJPblN0b3JlQW5kTGlzdGVuRm9yQ29tcGxldGlvbihkYXRhLCBhY3Rpb25zLCBvcmRlclNlcnZpY2UpIHtcbiAgICBsYXRlc3RPcmRlckF0dGVtcHQrKztcbiAgICBjb25zdCBvcmRlckF0dGVtcHQgPSBsYXRlc3RPcmRlckF0dGVtcHQ7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdzdWJtaXRQYXlwYWxPcmRlcicsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBpZiAobGF0ZXN0T3JkZXJBdHRlbXB0ICE9PSBvcmRlckF0dGVtcHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FwdHVyZSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjYXB0dXJlID0gYXdhaXQgY2FwdHVyZVBheVBhbE9yZGVyKGRhdGEub3JkZXJJRCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcignRXJyb3Igd2hpbGUgY2FwdHVyaW5nIFBheVBhbCBvcmRlcjogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXB0dXJlPy5zdGF0dXMgPT09ICdDT01QTEVURUQnKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21lciA9IGF3YWl0IGdldEN1c3RvbWVyKCk7XG4gICAgICAgICAgICBpZiAoY3VzdG9tZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIobnVsbCwgbnVsbCwgbnVsbCwgJ3BheXBhbCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpcGVDdXN0b21lcklEID0gY3VzdG9tZXIuc3RyaXBlX2N1c3RvbWVyX2lkID8gY3VzdG9tZXIuc3RyaXBlX2N1c3RvbWVyX2lkIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkQnJhbmQgPSBjdXN0b21lci5jYXJkPy5icmFuZCA/PyBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRMYXN0NCA9IGN1c3RvbWVyLmNhcmQ/Lmxhc3Q0ID8/IG51bGw7XG4gICAgICAgICAgICAgICAgc2F2ZUN1c3RvbWVyVG9Ccm93c2VyKHN0cmlwZUN1c3RvbWVySUQsIGNhcmRCcmFuZCwgY2FyZExhc3Q0LCAncGF5cGFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKSkub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbklEID0gY2FwdHVyZS5wdXJjaGFzZV91bml0c1swXS5wYXltZW50cy5jYXB0dXJlc1swXS5pZDtcbiAgICAgICAgICAgIG9yZGVyU2VydmljZS5kZXByZWNhdGVkLnNldE9yZGVyU3RhdHVzKG1lc3NhZ2Uub3JkZXIsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgICAgICBwYXltZW50VHlwZTogJ1BheVBhbCcsXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JRFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FwdHVyZT8uZGV0YWlsc1swXS5pc3N1ZSA9PT0gJ0lOU1RSVU1FTlRfREVDTElORUQnKSB7XG4gICAgICAgICAgICBzaG93UGF5UGFsTG9hZGluZ1NwaW5uZXIoZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdwYXlwYWxBbGVydCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogY2FwdHVyZS5kZXRhaWxzWzBdLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgICAgcmVzdGFydEFjdGlvbihhY3Rpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihmYWxzZSk7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3BheXBhbEFsZXJ0JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJ1xuICAgICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgICAgIHJlc3RhcnRBY3Rpb24oYWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5wbGFjZU9yZGVyKHtcbiAgICAgICAgaXNQYXlwYWw6IHRydWVcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVQYXlQYWxPcmRlcihvcmRlcklEKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL2NhcHR1cmUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG9yZGVySUQsXG4gICAgICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgICAgICBwYXlwYWxNZXJjaGFudElEXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cbmZ1bmN0aW9uIHNob3dQYXlQYWxCdXR0b24oKSB7XG4gICAgJHFzKCcjc2hpcHBpbmctb3B0aW9ucy1jb250YWluZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnbXQtcGF5bWVudCcpO1xuICAgICRxcygnI3BwLXNoaXBwaW5nLW9wdGlvbnMnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMC41cmVtJ1xuICAgICk7XG4gICAgJHFzKCcuZm9ybS1yb3cnKT8uY2xhc3NMaXN0LnJlbW92ZSgnbWItcGF5bWVudCcpO1xuICAgICRxcygnI3BheW1lbnQtbWV0aG9kcycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1hcmdpblRvcCA9ICcxcmVtJ1xuICAgICk7XG4gICAgJHFzKCcjc3RyaXBlLW9wdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdwYXlwYWwtZGlzYWJsZWQnKTtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmNsYXNzTGlzdC5hZGQoJ3BtLW9wdGlvbi1ibG9jaycpO1xuICAgICRxcygnI2NjLXJlZ3VsYXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI3N0cmlwZS1ib3gnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI3BheXBhbC1vcHRpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI3BwLXBheS1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgncGF5cGFsLWRpc2FibGVkLWJ0bicpO1xuICAgICRxcygnI3BwLXBheS1idG4nKT8uY2xhc3NMaXN0LmFkZCgncHAtcGF5LW10Jyk7XG59XG5mdW5jdGlvbiBwYXlwYWxQYXltZW50T3B0aW9uKCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZVByZWZlcnJlZFBheW1lbnRNZXRob2QoJ3BheXBhbCcpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlclBheVBhbEJ1dHRvbihkaXNwbGF5KSB7XG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgJHFzKCcjcGF5cGFsLXBtJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLXBtJyk/LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICRxcygnI3BheXBhbC1vcHRpb24nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3BheXBhbC1idXR0b24tY29udGFpbmVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItbW9iaWxlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLXBtJyk/LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgICAgICAkcXMoJyNwYXlwYWwtb3B0aW9uJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGY0ZjQnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3BheXBhbC1idXR0b24tY29udGFpbmVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItbW9iaWxlJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0U3VtbWFyeShtZXNzYWdlKSB7XG4gICAgaW5pdFN1bW1hcnlFdmVudHMoKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudFRheENvbmZpZyh7XG4gICAgICAgIGRpc3BsYXlQcmljZXNJbkNhcnRBbmRDaGVja291dDogbWVzc2FnZS5waHBEYXRhPy53Y190YXhfcHJpY2VfZGlzcGxheSA9PT0gJ2luY2wnID8gJ2luY2x1ZGVUYXgnIDogJ2V4Y2x1ZGVUYXgnXG4gICAgfSkpO1xufVxuZnVuY3Rpb24gaW5pdFN1bW1hcnlFdmVudHMoKSB7XG4gICAgJHFzKCcjcHAtZHJvcGRvd24nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcmRlclN1bW1hcnlEcm9wZG93bik7XG4gICAgJHFzKCcjcHAtZHJvcGRvd24nKT8uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXZlbnQpPT57XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgIG9yZGVyU3VtbWFyeURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcmRlclN1bW1hcnlEcm9wZG93bik7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlclN1bW1hcmllcygpO1xuICAgICAgICByZW5kZXJDYXJ0VG90YWxzKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJTdW1tYXJpZXMoKSB7XG4gICAgY2xlYXJSZW5kZXJlZFN1bW1hcmllcygpO1xuICAgIGxldCBjYXJ0U3VtbWFyaWVzSFRNTCA9ICcnO1xuICAgIGZvciAoY29uc3QgY2FydEtleSBvZiBPYmplY3Qua2V5cyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0cykpe1xuICAgICAgICBsZXQgc3VtbWFyeUhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgeyBjYXJ0U3VtbWFyeSAsIGNhcnRNZXRhICB9ID0gY2FydFN1bW1hcnlWaWV3RGF0YShjYXJ0S2V5KSgpO1xuICAgICAgICBjb25zdCBzdW1tYXJ5VGl0bGVIVE1MID0gY2FydEtleSA9PT0gJzAnID8gJycgOiBgXG48dHIgY2xhc3M9XCJzdW1tYXJ5LXRpdGxlXCI+XG5cdDx0ZD5SZWN1cnJpbmcgdG90YWxzPC90ZD5cblx0PHRkPjwvdGQ+XG48L3RyPmA7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBjYXJ0U3VtbWFyeSl7XG4gICAgICAgICAgICBzdW1tYXJ5SFRNTCArPSByZW5kZXJTdW1tYXJ5TGluZShsaW5lLmtleSwgbGluZS52YWx1ZSwgY2FydE1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhcnRTdW1tYXJpZXNIVE1MICs9IGBcbjxkaXYgY2xhc3M9XCJjYXJ0LXN1bW1hcnlcIiBkYXRhLWNhcnQta2V5PVwiJHtjYXJ0S2V5fVwiPlxuXHQ8dGFibGU+XG5cdFx0JHtzdW1tYXJ5VGl0bGVIVE1MfVxuXHRcdCR7c3VtbWFyeUhUTUx9XG5cdDwvdGFibGU+XG5cdDxwIGNsYXNzPVwiZmlyc3QtcmVuZXdhbCBtdXRlZFwiPiR7YnVpbGRTdWJzY3JpcHRpb25GaXJzdFJlbmV3YWxTdHJpbmcoY2FydE1ldGEpfTwvcD5cbjwvZGl2PmA7XG4gICAgfVxuICAgICRxcygnI3BwLXN1bW1hcnktbGluZXMtYm9keScpPy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNhcnRTdW1tYXJpZXNIVE1MKTtcbiAgICAkcXMoJyNwcC1zdW1tYXJ5LWxpbmVzLWJvZHktZXhpc3RpbmcnKT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjYXJ0U3VtbWFyaWVzSFRNTCk7XG4gICAgJHFzKCcjcHAtc3VtbWFyeS1saW5lcy1ib2R5LW1vYmlsZScpPy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNhcnRTdW1tYXJpZXNIVE1MKTtcbn1cbmZ1bmN0aW9uIGNsZWFyUmVuZGVyZWRTdW1tYXJpZXMoKSB7XG4gICAgZm9yIChjb25zdCAkc3VtbWFyeSBvZiAkcXNBbGwoJy5jYXJ0LXN1bW1hcnknKSl7XG4gICAgICAgICRzdW1tYXJ5LnJlbW92ZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlclN1bW1hcnlMaW5lKG5hbWUsIGFtb3VudCwgY2FydE1ldGEpIHtcbiAgICBsZXQgcHJpY2VNZXRhSFRNTCA9ICcnO1xuICAgIGlmIChjYXJ0TWV0YS5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgcHJpY2VNZXRhSFRNTCA9IGA8c3BhbiBjbGFzcz1cIm11dGVkXCI+JHtidWlsZFN1YnNjcmlwdGlvblByaWNlTWV0YURhdGEoY2FydE1ldGEpfTwvc3Bhbj5gO1xuICAgIH1cbiAgICByZXR1cm4gYFxuPHRyIGNsYXNzPVwic3VtbWFyeS1saW5lXCIgZGF0YS1yYXctY29zdD1cIiR7YW1vdW50fVwiPlxuXHQ8dGQ+JHtuYW1lfTwvdGQ+XG5cdDx0ZD4ke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKGFtb3VudCl9JHtwcmljZU1ldGFIVE1MfTwvdGQ+XG48L3RyPmA7XG59XG5mdW5jdGlvbiBvcmRlclN1bW1hcnlEcm9wZG93bigpIHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDkwMHB4KScpLm1hdGNoZXMpIHtcbiAgICAgICAgbGV0IG5ld0N1c3RvbWVyID0gJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgICAgICBpZiAobmV3Q3VzdG9tZXIgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgbmV3Q3VzdG9tZXIgPSAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIG5ld0N1c3RvbWVyID0gJHFzKCcjcHAtZHJvcGRvd24tbmV3Jyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDdXN0b21lciA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAkcXMoJyNkcm9wZG93bi1kb3duLW5ldycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNkcm9wZG93bi11cC1uZXcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjb3JkZXItc3VtbWFyeS1jb250ZW50cy1uZXcnKT8uY2xhc3NMaXN0LmFkZCgnb3JkZXItc3VtbWFyeS1jb250ZW50cy1uZXctb3BlbmVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoJyNkcm9wZG93bi1kb3duLW5ldycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNkcm9wZG93bi11cC1uZXcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjb3JkZXItc3VtbWFyeS1jb250ZW50cy1uZXcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnb3JkZXItc3VtbWFyeS1jb250ZW50cy1uZXctb3BlbmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGV4aXN0aW5nID0gJHFzKCcjcHAtZHJvcGRvd24nKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgaWYgKGV4aXN0aW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgJHFzKCcjcHAtZHJvcGRvd24nKT8uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIGV4aXN0aW5nID0gJHFzKCcjcHAtZHJvcGRvd24nKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtZHJvcGRvd24nKT8uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgZXhpc3RpbmcgPSAkcXMoJyNwcC1kcm9wZG93bicpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICB9XG4gICAgaWYgKGV4aXN0aW5nID09PSAndHJ1ZScpIHtcbiAgICAgICAgJHFzKCcuZHJvcGRvd24tZG93bicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnLmRyb3Bkb3duLXVwJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjb3JkZXItc3VtbWFyeS1jb250ZW50cycpPy5jbGFzc0xpc3QuYWRkKCdvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW9wZW5lZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLmRyb3Bkb3duLWRvd24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJy5kcm9wZG93bi11cCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI29yZGVyLXN1bW1hcnktY29udGVudHMnKT8uY2xhc3NMaXN0LnJlbW92ZSgnb3JkZXItc3VtbWFyeS1jb250ZW50cy1vcGVuZWQnKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJDYXJ0VG90YWxzKCkge1xuICAgICRxc0FsbCgnLnBwLXN1bW1hcnktdG90YWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICAgICk7XG4gICAgZm9yIChjb25zdCBjYXJ0S2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRDYXJ0ID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV07XG4gICAgICAgIGlmICghY2FsY3VsYXRlZENhcnQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlckNhcnRUb3RhbChjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LnRvdGFsLCBjYWxjdWxhdGVkQ2FydC5jYXJ0X21ldGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNhcnRUb3RhbCh0b3RhbCwgY2FydE1ldGEpIHtcbiAgICBpZiAoIWNhcnRNZXRhLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAkcXNBbGwoJy5wcC1zdW1tYXJ5LXRvdGFsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MICs9IGA8c3Bhbj4ke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKHRvdGFsKX08L3NwYW4+YFxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxc0FsbCgnLnBwLXN1bW1hcnktdG90YWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgKz0gYCA8c3BhbiBjbGFzcz1cIm11dGVkXCI+ICsgPC9zcGFuPjxzcGFuIGNsYXNzPVwibXV0ZWRcIj4ke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKHRvdGFsKX0ke2J1aWxkU3Vic2NyaXB0aW9uUHJpY2VNZXRhRGF0YShjYXJ0TWV0YSwgdHJ1ZSl9PC9zcGFuPmBcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0TW9kYWwoKSB7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLm9wZW4oKSkge1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUVudmlyb25tZW50Lm1vZGFsVUkub3BlbigpKSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJCdXR0b25Db2xvclRoZW1lKEVudmlyb25tZW50LnBsdWdpbi5idXR0b25Db2xvcigpKTtcbiAgICAgICAgcmVuZGVyVGVzdE1vZGVCYW5uZXJEaXNwbGF5KEVudmlyb25tZW50LnRlc3RNb2RlKCkpO1xuICAgICAgICByZW5kZXJNb2RhbFBhZ2VJbmRpY2F0b3IoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJNb2RhbE5hdmlnYXRpb24oRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJDb250aW51ZUJ1dHRvbkRpc3BsYXkoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJDb250aW51ZUJ1dHRvbkxvYWRpbmcoRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpKTtcbiAgICAgICAgcmVuZGVySW5mb1BhZ2VEaXNwbGF5KEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpKTtcbiAgICAgICAgcmVuZGVyUGF5bWVudFBhZ2VEaXNwbGF5KEVudmlyb25tZW50Lm1vZGFsVUkucGFnZSgpLCBFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpLCBFbnZpcm9ubWVudC5jdXN0b21lci5tb2JpbGUoKSk7XG4gICAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoUGVhY2hQYXlPcmRlci5lcnJvck1lc3NhZ2UoKSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdVSTo6bW9kYWxPcGVuZWQnLCAoXyk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICAgICAgbW9kYWxJc09wZW46IHRydWVcbiAgICAgICAgfSkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnVUk6Om1vZGFsQ2xvc2VkJywgKF8pPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgICAgIG1vZGFsSXNPcGVuOiBmYWxzZVxuICAgICAgICB9KSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdoaWRlQ29udGludWVTcGlubmVyJywgKF8pPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdidXR0b25DbGlja2VkJywgYXN5bmMgKCk9PntcbiAgICAgICAgb3BlbkNoZWNrb3V0TW9kYWwoKTtcbiAgICAgICAgdmFsaWRhdGVDYXJ0SXRlbXNXaXRoQ3VzdG9tZXIoRGVmYXVsdENhcnQuY29udGVudHMoKSwgdHJ1ZSk7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ3N0b3BQYXltZW50UHJvY2Vzc2luZ0FuaW1hdGlvbnMnLCAobWVzc2FnZSk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuY2xvc2VNb2RhbCkge1xuICAgICAgICAgICAgcmVxdWVzdENsb3NlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5lcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldE9yZGVyRXJyb3IobWVzc2FnZS5lcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICRxcygnLnBwLWV4aXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXF1ZXN0Q2xvc2VNb2RhbCk7XG4gICAgJHFzKCcucHAtY2xvc2UnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXF1ZXN0Q2xvc2VNb2RhbCk7XG4gICAgJHFzKCcjZWRpdC1pbmZvJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvSW5mbyk7XG4gICAgZm9yIChjb25zdCAkZWxlbWVudDEgb2YgJHFzQWxsKCcucHAtYmFjay10by1pbmZvJykpe1xuICAgICAgICAkZWxlbWVudDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9JbmZvKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yTWVzc2FnZSkge1xuICAgIGlmIChlcnJvck1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgICRxcygnI3NoaXBwaW5nLW9wdGlvbnMtY29udGFpbmVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtcGF5bWVudC1mb3JtJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcGF5bWVudC1tZXRob2RzJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDMgb2YgJHFzQWxsKCcucGF5LWJ1dHRvbi1jb250YWluZXInKSl7XG4gICAgICAgICAgICAkZWxlbWVudDMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQyIG9mICRxc0FsbCgnLmhpZGUtd2hlbi1pbnZhbGlkJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UtZXhpc3RpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2VcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjaW52YWxpZC1vcmRlci1tZXNzYWdlLWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjc2hpcHBpbmctb3B0aW9ucy1jb250YWluZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1wYXltZW50LWZvcm0nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXltZW50LW1ldGhvZHMnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLnBheS1idXR0b24tY29udGFpbmVyJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQ1IG9mICRxc0FsbCgnLmhpZGUtd2hlbi1pbnZhbGlkJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQ1LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UtZXhpc3RpbmcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG9wZW5DaGVja291dE1vZGFsKCkge1xuICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKCdvcGVuTW9kYWwnLCAnKicpO1xufVxuZnVuY3Rpb24gcmVxdWVzdENsb3NlTW9kYWwoKSB7XG4gICAgc3luY09yZGVyTm90ZXModHJ1ZSk7XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2UoJ2Nsb3NlTW9kYWwnLCAnKicpO1xufVxuZnVuY3Rpb24gYmFja1RvSW5mbygpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgIG1vZGFsUGFnZVR5cGU6ICdpbmZvJyxcbiAgICAgICAgY3VzdG9tZXJFeGlzdHM6IGZhbHNlXG4gICAgfSkpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRpb24oZmFsc2UpKTtcbiAgICBzeW5jT3JkZXJOb3RlcygpO1xufVxuZnVuY3Rpb24gcmVuZGVyQ29udGludWVCdXR0b25EaXNwbGF5KG1vZGFsUGFnZSkge1xuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdpbmZvJykge1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlLW1vYmlsZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZS1tb2JpbGUnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNvbnRpbnVlQnV0dG9uTG9hZGluZyhsb2FkaW5nTW9kZSkge1xuICAgIGlmIChsb2FkaW5nTW9kZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlLW1vYmlsZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNjb250aW51ZS1zcGlubmVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY29udGludWUtc3Bpbm5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZS1tb2JpbGUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2NvbnRpbnVlLXNwaW5uZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjb250aW51ZS1zcGlubmVyLW1vYmlsZScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyTW9kYWxOYXZpZ2F0aW9uKG1vZGFsUGFnZSkge1xuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdpbmZvJykge1xuICAgICAgICAkcXMoJy5wcC1leGl0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5wcC1iYWNrLXRvLWluZm8nKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGFsUGFnZSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgICRxcygnLnBwLWV4aXQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLnBwLWJhY2stdG8taW5mbycpKXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlck1vZGFsUGFnZUluZGljYXRvcihtb2RhbFBhZ2UpIHtcbiAgICBpZiAobW9kYWxQYWdlID09PSAnaW5mbycpIHtcbiAgICAgICAgJHFzKCcuY29sb3ItY2hhbmdpbmctaW5mbycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NoZWNrb3V0LXN0YXR1cycpPy5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtbG9nby1vbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5jb2xvci1jaGFuZ2luZy1pbmZvJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY2hlY2tvdXQtc3RhdHVzJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZS1sb2dvLW9uZScpO1xuICAgIH1cbiAgICBpZiAobW9kYWxQYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgJHFzKCcuY29sb3ItY2hhbmdpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NoZWNrb3V0LXN0YXR1cycpPy5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtbG9nby10d28nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJy5jb2xvci1jaGFuZ2luZy1wYXltZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY2hlY2tvdXQtc3RhdHVzJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZS1sb2dvLXR3bycpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlclRlc3RNb2RlQmFubmVyRGlzcGxheSh0ZXN0TW9kZSkge1xuICAgIGlmICh0ZXN0TW9kZSkge1xuICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ3Rlc3QtbW9kZS1ib3JkZXInKTtcbiAgICAgICAgJHFzKCcudGVzdC1tb2RlLWJhbm5lcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5wYWRkaW5nVG9wID0gJzEuMjVyZW0nXG4gICAgICAgICk7XG4gICAgICAgICRxcygnLnBwLWNsb3NlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUudG9wID0gJzAuOHJlbSdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcucHAtY2xvc2UnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5yaWdodCA9ICc0cHgnXG4gICAgICAgICk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQnV0dG9uQ29sb3JUaGVtZShjb2xvciA9ICcjRkY4NzZDJykge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wZWFjaHBheS10aGVtZS1jb2xvcicsIGNvbG9yKTtcbn1cbmZ1bmN0aW9uIHJlbmRlclBheW1lbnRQYWdlRGlzcGxheShtb2RhbFBhZ2UsIGV4aXN0aW5nQ3VzdG9tZXIsIGlzTW9iaWxlKSB7XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgIGlmIChleGlzdGluZ0N1c3RvbWVyKSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjcHAtZXhpc3RpbmctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QuYWRkKCdjb2wnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LmFkZCgndy1leGlzdGluZy1jaGVja291dCcpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QuYWRkKCdwLTEtNScpO1xuICAgICAgICAgICAgJHFzKCcub3JkZXItc3VtbWFyeS1oZWFkaW5nJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI3BwLXN1bW1hcnktYm9keScsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJvcmRlckJvdHRvbSA9ICdub25lJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQ2IG9mICRxc0FsbCgnLnNwbGl0Jykpe1xuICAgICAgICAgICAgICAgICRlbGVtZW50Ni5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxvYXQnLCAnbGVmdCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcygnI3BwLW5ldy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1leGlzdGluZy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbCcpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCd3LWV4aXN0aW5nLWNoZWNrb3V0Jyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3AtMS01Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJHFzKCcjZXh0cmEtZmllbGRzLXNlY3Rpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgICAgICAgJHFzKCcjZXh0cmEtZmllbGRzLXNlY3Rpb24nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgICRxcygnLm9yZGVyLXN1bW1hcnktaGVhZGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLW5ldy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLWV4aXN0aW5nLWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdjb2wnKTtcbiAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCd3LWV4aXN0aW5nLWNoZWNrb3V0Jyk7XG4gICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgncC0xLTUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJJbmZvUGFnZURpc3BsYXkobW9kYWxQYWdlKSB7XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICRxcygnI3BwLWluZm8nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLnNwbGl0Jykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Zsb2F0JywgJ25vbmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1pbmZvJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0TWV0cmljcygpIHtcbiAgICAkcXMoJyNwcC1wYXknKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+cmVjb3JkTm9uUFBCdXR0b25DbGljaygncHAtcGF5JylcbiAgICApO1xuICAgICRxcygnI3BwLXBheS1tb2JpbGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+cmVjb3JkTm9uUFBCdXR0b25DbGljaygncHAtcGF5LW1vYmlsZScpXG4gICAgKTtcbiAgICAkcXMoJyNwcC1wYXktZXhpc3RpbmcnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+cmVjb3JkTm9uUFBCdXR0b25DbGljaygncHAtcGF5LWV4aXN0aW5nJylcbiAgICApO1xuICAgICRxcygnI3BwLWNvbnRpbnVlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnJlY29yZE5vblBQQnV0dG9uQ2xpY2soJ3BwLWNvbnRpbnVlJylcbiAgICApO1xuICAgICRxcygnI3BwLWNvbnRpbnVlLW1vYmlsZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5yZWNvcmROb25QUEJ1dHRvbkNsaWNrKCdwcC1jb250aW51ZS1tb2JpbGUnKVxuICAgICk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdidXR0b25DbGlja2VkJywgKG1lc3NhZ2UpPT57XG4gICAgICAgIHJlY29yZEJ1dHRvbkNsaWNrKGJ1dHRvblR5cGVWYWxpZGF0aW9uKG1lc3NhZ2UuYnV0dG9uSUQpLCBnZXRQUEJ1dHRvbkxvY2F0aW9uKG1lc3NhZ2UpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGJ1dHRvblR5cGVWYWxpZGF0aW9uKGJ1dHRvblR5cGUpIHtcbiAgICByZXR1cm4gYnV0dG9uVHlwZSA9PT0gdW5kZWZpbmVkID8gJ3Vua25vd24nIDogYnV0dG9uVHlwZTtcbn1cbmZ1bmN0aW9uIHJlY29yZE5vblBQQnV0dG9uQ2xpY2soYnV0dG9uVHlwZSkge1xuICAgIHJlY29yZEJ1dHRvbkNsaWNrKGJ1dHRvblR5cGUsIFBQQnV0dG9uTG9jYXRpb24uTm90QXBwbGljYWJsZSk7XG59XG5mdW5jdGlvbiByZWNvcmRCdXR0b25DbGljayhidXR0b25UeXBlLCBwcEJ1dHRvbkxvY2F0aW9uKSB7XG4gICAgcG9zdEJ1dHRvbk1ldHJpY3Moe1xuICAgICAgICBkb21haW46IE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLFxuICAgICAgICBidXR0b25UeXBlLFxuICAgICAgICBwcEJ1dHRvbkxvY2F0aW9uLFxuICAgICAgICBpc01vYmlsZTogRW52aXJvbm1lbnQuY3VzdG9tZXIubW9iaWxlKCksXG4gICAgICAgIGlzVGVzdE1vZGU6IEVudmlyb25tZW50LnRlc3RNb2RlKClcbiAgICB9KTtcbn1cbnZhciBQUEJ1dHRvbkxvY2F0aW9uO1xuKGZ1bmN0aW9uKFBQQnV0dG9uTG9jYXRpb24xKSB7XG4gICAgUFBCdXR0b25Mb2NhdGlvbjFbXCJQcm9kdWN0XCJdID0gJ3Byb2R1Y3QnO1xuICAgIFBQQnV0dG9uTG9jYXRpb24xW1wiQ2hlY2tvdXRcIl0gPSAnY2hlY2tvdXQnO1xuICAgIFBQQnV0dG9uTG9jYXRpb24xW1wiTWluaUNhcnRcIl0gPSAnbWluaS1jYXJ0JztcbiAgICBQUEJ1dHRvbkxvY2F0aW9uMVtcIkNhcnRcIl0gPSAnY2FydCc7XG4gICAgUFBCdXR0b25Mb2NhdGlvbjFbXCJOb3RBcHBsaWNhYmxlXCJdID0gJ25vdC1hcHBsaWNhYmxlJztcbn0pKFBQQnV0dG9uTG9jYXRpb24gfHwgKFBQQnV0dG9uTG9jYXRpb24gPSB7fSkpO1xuZnVuY3Rpb24gZ2V0UFBCdXR0b25Mb2NhdGlvbihtZXNzYWdlKSB7XG4gICAgaWYgKG1lc3NhZ2UuaXNNaW5pQ2FydCkge1xuICAgICAgICByZXR1cm4gUFBCdXR0b25Mb2NhdGlvbi5NaW5pQ2FydDtcbiAgICB9XG4gICAgc3dpdGNoKEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpKXtcbiAgICAgICAgY2FzZSAnY2FydCc6XG4gICAgICAgICAgICByZXR1cm4gUFBCdXR0b25Mb2NhdGlvbi5DYXJ0O1xuICAgICAgICBjYXNlICdjaGVja291dCc6XG4gICAgICAgICAgICByZXR1cm4gUFBCdXR0b25Mb2NhdGlvbi5DaGVja291dDtcbiAgICAgICAgY2FzZSAncHJvZHVjdCc6XG4gICAgICAgICAgICByZXR1cm4gUFBCdXR0b25Mb2NhdGlvbi5Qcm9kdWN0O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFBQQnV0dG9uTG9jYXRpb24uTm90QXBwbGljYWJsZTtcbiAgICB9XG59XG5mdW5jdGlvbiBwb3N0QnV0dG9uTWV0cmljcyhvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmlzVGVzdE1vZGUpIHtcbiAgICAgICAgZmV0Y2goYGh0dHBzOi8vMmZhZDZ3M2V4Zy5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS92MS9idXR0b25zdGF0cz9kb21haW49JHtvcHRpb25zLmRvbWFpbn0mYnV0dG9uVHlwZT0ke29wdGlvbnMuYnV0dG9uVHlwZX0mcHBCdXR0b25Mb2NhdGlvbj0ke1N0cmluZyhvcHRpb25zLnBwQnV0dG9uTG9jYXRpb24pfSZpc01vYmlsZT0ke1N0cmluZyhvcHRpb25zLmlzTW9iaWxlKX0maXNQcm9kdWN0aW9uRGF0YT0ke1N0cmluZyhpc1Byb2R1Y3Rpb25Eb21haW4ob3B0aW9ucy5kb21haW4pKX1gKS50aGVuKCgpPT57fSkuY2F0Y2goKCk9Pnt9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc1Byb2R1Y3Rpb25Eb21haW4oZG9tYWluKSB7XG4gICAgc3dpdGNoKGRvbWFpbil7XG4gICAgICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICAgIGNhc2UgJzEyNy4wLjAuMSc6XG4gICAgICAgIGNhc2UgJ3N0b3JlLmxvY2FsJzpcbiAgICAgICAgY2FzZSAnd29vLnN0b3JlLmxvY2FsJzpcbiAgICAgICAgY2FzZSAnd29vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTIucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUzLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNC5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTUucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAncWEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAnZGVtby5wZWFjaHBheS5hcHAnOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuY29uc3QgZGVmYXVsdEZvcm1IVE1MID0gYDxmb3JtIGlkPVwicHAtaW5mby1mb3JtXCI+XG48aDI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwicGVyc29uYWxcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJlbWFpbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJlbWFpbFwiIGRhdGEtaTE4bj1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwaG9uZVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZWxcIiBuYW1lPVwicGhvbmVcIiBwbGFjZWhvbGRlcj1cIiBcInJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJwaG9uZVwiIGRhdGEtaTE4bj1cInBob25lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2ZpcnN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9maXJzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2ZpcnN0XCIgZGF0YS1pMThuPVwiZmlyc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdFx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2xhc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2xhc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9sYXN0XCIgZGF0YS1pMThuPVwibGFzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxoMiBjbGFzcz1cInNoaXBwaW5nLWFkZHJlc3MtaGVhZGVyXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwic2hpcHBpbmdcIj48L3NwYW4+PC9oMj5cbjxoMiBjbGFzcz1cImJpbGxpbmctYWRkcmVzcy1oZWFkZXIgaGlkZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cImJpbGxpbmdcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNzBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJhZGRyZXNzMVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MxXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImFkZHJlc3MxXCIgZGF0YS1pMThuPVwic3RyZWV0XCIgY2xhc3M9XCJmb3JtLWxhYmVsIGZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy0zMFwiPlxuXHRcdDxpbnB1dCBpZD1cImFkZHJlc3MyXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczJcIiBwbGFjZWhvbGRlcj1cIiBcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIj5cblx0XHQ8bGFiZWwgZm9yPVwiYWRkcmVzczJcIiBkYXRhLWkxOG49XCJhcHRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInBvc3RhbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBvc3RhbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJwb3N0YWxcIiBkYXRhLWkxOG49XCJwb3N0YWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cImNpdHlcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaXR5XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImNpdHlcIiBkYXRhLWkxOG49XCJjaXR5XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwcm92aW5jZVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm9mZlwiIHBsYWNlaG9sZGVyPVwiIFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJwcm92aW5jZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGRhdGEtaTE4bj1cInByb3ZpbmNlXCI+PC9sYWJlbD5cblx0XHQ8c2VsZWN0IGlkPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cInctMTAwIHNlbGVjdCBoaWRlXCIgbmFtZT1cInN0YXRlXCIgc2l6ZT1cIjFcIj5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlPjwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbCBoaWRlXCIgZGF0YS1pMThuPVwic3RhdGVcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxzZWxlY3QgaWQ9XCJjb3VudHJ5XCIgY2xhc3M9XCJ3LTEwMFwiIG5hbWU9XCJjb3VudHJ5XCIgc2l6ZT1cIjFcIiByZXF1aXJlZD5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlIGRhdGEtaTE4bj1cImNvdW50cnlcIj48L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiY291bnRyeVwiIGRhdGEtaTE4bj1cImNvdW50cnktbGFiZWxcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBpZD1cImNoZWNrb3V0LWRlbGl2ZXJ5LWRhdGVcIiBjbGFzcz1cImhpZGVcIj5cblx0PGgyIGRhdGEtaTE4bj1cImRlbGl2ZXJ5LWRhdGVcIj48L2gyPlxuXHQ8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImRlbGl2ZXJ5LWRhdGVcIiBuYW1lPVwiZGVsaXZlcnktZGF0ZVwiIHZhbHVlPVwiXCIgbWluPVwiXCI+XG48L2Rpdj5cbjwvZm9ybT5gO1xuY29uc3QgamFwYW5lc2VGb3JtSFRNTCA9IGA8Zm9ybSBpZD1cInBwLWluZm8tZm9ybVwiPlxuPGgyPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInBlcnNvbmFsXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwiZW1haWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiZW1haWxcIiBkYXRhLWkxOG49XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicGhvbmVcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGVsXCIgbmFtZT1cInBob25lXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInBob25lXCIgZGF0YS1pMThuPVwicGhvbmVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfbGFzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiICB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2xhc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9sYXN0XCIgZGF0YS1pMThuPVwibGFzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJuYW1lX2ZpcnN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9maXJzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2ZpcnN0XCIgZGF0YS1pMThuPVwiZmlyc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48aDIgY2xhc3M9XCJzaGlwcGluZy1hZGRyZXNzLWhlYWRlclwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInNoaXBwaW5nXCI+PC9zcGFuPjwvaDI+XG48aDIgY2xhc3M9XCJiaWxsaW5nLWFkZHJlc3MtaGVhZGVyIGhpZGVcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJiaWxsaW5nXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PHNlbGVjdCBpZD1cImNvdW50cnlcIiBjbGFzcz1cInctMTAwXCIgbmFtZT1cImNvdW50cnlcIiBzaXplPVwiMVwiIHJlcXVpcmVkPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWUgZGF0YS1pMThuPVwic2VsZWN0LWNvdW50cnlcIj48L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiY291bnRyeVwiIGRhdGEtaTE4bj1cImNvdW50cnktbGFiZWx5XCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwb3N0YWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJwb3N0YWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicG9zdGFsXCIgZGF0YS1pMThuPVwicG9zdGFsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwcm92aW5jZVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm9mZlwiIHBsYWNlaG9sZGVyPVwiIFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJwcm92aW5jZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGRhdGEtaTE4bj1cInByb3ZpbmNlXCI+PC9sYWJlbD5cblx0XHQ8c2VsZWN0IGlkPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cInctMTAwIHNlbGVjdCBoaWRlXCIgbmFtZT1cInN0YXRlXCIgc2l6ZT1cIjFcIj5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlPlN0YXRlPC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsIGhpZGVcIj5SZWdpb248L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cImNpdHlcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaXR5XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImNpdHlcIiBkYXRhLWkxOG49XCJjaXR5XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNzBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJhZGRyZXNzMVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MxXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImFkZHJlc3MxXCIgZGF0YS1pMThuPVwic3RyZWV0XCIgY2xhc3M9XCJmb3JtLWxhYmVsIGZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy0zMFwiPlxuXHRcdDxpbnB1dCBpZD1cImFkZHJlc3MyXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczJcIiBwbGFjZWhvbGRlcj1cIiBcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIj5cblx0XHQ8bGFiZWwgZm9yPVwiYWRkcmVzczJcIiBkYXRhLWkxOG49XCJhcHRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBpZD1cImNoZWNrb3V0LWRlbGl2ZXJ5LWRhdGVcIiBjbGFzcz1cImhpZGVcIj5cblx0PGgyIGRhdGEtaTE4bj1cImRlbGl2ZXJ5LWRhdGVcIj48L2gyPlxuXHQ8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImRlbGl2ZXJ5LWRhdGVcIiBuYW1lPVwiZGVsaXZlcnktZGF0ZVwiIHZhbHVlPVwiXCIgbWluPVwiXCI+XG48L2Rpdj5cbjwvZm9ybT5gO1xuY29uc3QgY2hlY2tvdXRGb3JtTm9QaG9uZU5vQXB0ID0gYDxmb3JtIGlkPVwicHAtaW5mby1mb3JtXCI+XG48aDI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwicGVyc29uYWxcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxpbnB1dCBpZD1cImVtYWlsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdDxsYWJlbCBmb3I9XCJlbWFpbFwiIGRhdGEtaTE4bj1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfZmlyc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2ZpcnN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfZmlyc3RcIiBkYXRhLWkxOG49XCJmaXJzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0XHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfbGFzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfbGFzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2xhc3RcIiBkYXRhLWkxOG49XCJsYXN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGgyIGNsYXNzPVwic2hpcHBpbmctYWRkcmVzcy1oZWFkZXJcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJzaGlwcGluZ1wiPjwvc3Bhbj48L2gyPlxuPGgyIGNsYXNzPVwiYmlsbGluZy1hZGRyZXNzLWhlYWRlciBoaWRlXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwiYmlsbGluZ1wiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGlucHV0IGlkPVwiYWRkcmVzczFcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHQ8bGFiZWwgZm9yPVwiYWRkcmVzczFcIiBkYXRhLWkxOG49XCJzdHJlZXRcIiBjbGFzcz1cImZvcm0tbGFiZWwgZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwb3N0YWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJwb3N0YWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicG9zdGFsXCIgZGF0YS1pMThuPVwicG9zdGFsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJjaXR5XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJjaXR5XCIgZGF0YS1pMThuPVwiY2l0eVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicHJvdmluY2VcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJvZmZcIiBwbGFjZWhvbGRlcj1cIiBcIj5cblx0XHQ8bGFiZWwgZm9yPVwicHJvdmluY2VcIiBjbGFzcz1cImZvcm0tbGFiZWxcIiBkYXRhLWkxOG49XCJwcm92aW5jZVwiPjwvbGFiZWw+XG5cdFx0PHNlbGVjdCBpZD1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJ3LTEwMCBzZWxlY3QgaGlkZVwiIG5hbWU9XCJzdGF0ZVwiIHNpemU9XCIxXCI+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT48L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWwgaGlkZVwiIGRhdGEtaTE4bj1cInN0YXRlXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8c2VsZWN0IGlkPVwiY291bnRyeVwiIGNsYXNzPVwidy0xMDBcIiBuYW1lPVwiY291bnRyeVwiIHNpemU9XCIxXCIgcmVxdWlyZWQ+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZSBkYXRhLWkxOG49XCJjb3VudHJ5XCI+PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImNvdW50cnlcIiBkYXRhLWkxOG49XCJjb3VudHJ5LWxhYmVsXCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgaWQ9XCJjaGVja291dC1kZWxpdmVyeS1kYXRlXCIgY2xhc3M9XCJoaWRlXCI+XG5cdDxoMiBkYXRhLWkxOG49XCJkZWxpdmVyeS1kYXRlXCI+PC9oMj5cblx0PGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkZWxpdmVyeS1kYXRlXCIgbmFtZT1cImRlbGl2ZXJ5LWRhdGVcIiB2YWx1ZT1cIlwiIG1pbj1cIlwiPlxuPC9kaXY+XG48L2Zvcm0+YDtcbmZ1bmN0aW9uIGluaXRMaW5rZWRQcm9kdWN0cygpIHtcbiAgICAkcXMoJy5wcmV2LWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbExlZnQpO1xuICAgICRxcygnLm5leHQtYnRuJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUmlnaHQpO1xuICAgICRxcygnI3Byb2R1Y3RzLWxpc3QnKT8uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsQWRqdXN0ZXIpO1xuICAgIGxldCBwcmV2aW91c0NhcnREYXRhID0gJyc7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ3Byb2R1Y3QnIHx8IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAnY2FydCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcnREYXRhID0gSlNPTi5zdHJpbmdpZnkoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgICAgICAgICBpZiAoY2FydERhdGEgIT09IHByZXZpb3VzQ2FydERhdGEpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0NhcnREYXRhID0gY2FydERhdGE7XG4gICAgICAgICAgICAgICAgcmVuZGVyTGlua2VkUHJvZHVjdHMoRGVmYXVsdENhcnQuY29udGVudHMoKSk7XG4gICAgICAgICAgICAgICAgc2V0QWRkQnV0dG9uQ29sb3IoRW52aXJvbm1lbnQucGx1Z2luLmJ1dHRvbkNvbG9yKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjbGVhckxpbmtlZFByb2R1Y3RzKCkge1xuICAgIGZvciAoY29uc3QgbGlua2VkSXRlbSBvZiAkcXNBbGwoJy5wcm9kdWN0LWJvZHknKSl7XG4gICAgICAgIGxpbmtlZEl0ZW0ucmVtb3ZlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0QWRkQnV0dG9uQ29sb3IoY29sb3IgPSAnI0ZGODc2QycpIHtcbiAgICBmb3IgKGNvbnN0IGFkZEJ0biBvZiAkcXNBbGwoJy5hZGQtYnRuJykpe1xuICAgICAgICBhZGRCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkJyArIGNvbG9yO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckxpbmtlZFByb2R1Y3RzKGNhcnQpIHtcbiAgICBjbGVhckxpbmtlZFByb2R1Y3RzKCk7XG4gICAgZm9yKGxldCBpID0gY2FydC5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjYXJ0W2ldO1xuICAgICAgICBsZXQgbGlua2VkUHJvZHVjdHM7XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ3Byb2R1Y3QnICYmICFpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlICYmIGl0ZW0udXBzZWxsX2l0ZW1zKSB7XG4gICAgICAgICAgICBsaW5rZWRQcm9kdWN0cyA9IGl0ZW0udXBzZWxsX2l0ZW1zO1xuICAgICAgICB9IGVsc2UgaWYgKEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAnY2FydCcgJiYgIWl0ZW0uaXNfcGFydF9vZl9idW5kbGUgJiYgaXRlbS5jcm9zc19zZWxsX2l0ZW1zKSB7XG4gICAgICAgICAgICBsaW5rZWRQcm9kdWN0cyA9IGl0ZW0uY3Jvc3Nfc2VsbF9pdGVtcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlua2VkUHJvZHVjdHMpIHtcbiAgICAgICAgICAgICRxcygnI2xpbmtlZC1wcm9kdWN0cy1zZWN0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlua2VkSXRlbSBvZiBsaW5rZWRQcm9kdWN0cyl7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmtlZEl0ZW0uaGFzX3N0b2NrID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkSXRlbS5oYXNfc3RvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWxpbmtlZEl0ZW0udmFyaWFibGUgJiYgIWxpbmtlZEl0ZW0uYnVuZGxlICYmIGxpbmtlZEl0ZW0uaGFzX3N0b2NrICYmICFoYXNTYW1lTGlua2VkUHJvZHVjdChsaW5rZWRJdGVtLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0c0xpc3QgPSAkcXMoJyNwcm9kdWN0cy1saXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RCb2R5LmNsYXNzTmFtZSA9ICdwcm9kdWN0LWJvZHknO1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Qm9keS5pZCA9IFN0cmluZyhsaW5rZWRJdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZEl0ZW0uaW1nX3NyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEJvZHkuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1pbWdcIiBzcmM9JHtsaW5rZWRJdGVtLmltZ19zcmN9PmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEJvZHkuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwibGlua2VkLXByb2R1Y3QtZGVzY1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IDxzcGFuIGNsYXNzPVwibGlua2VkLXByb2R1Y3QtbmFtZVwiPiR7bGlua2VkSXRlbS5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCA8c3BhbiBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LXF1YW50aXR5XCI+UXVhbnRpdHk6IDE8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgPHNwYW4gY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1wcmljZVwiPiR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcoTnVtYmVyLnBhcnNlRmxvYXQobGlua2VkSXRlbS5wcmljZSkpfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgPC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0IDxidXR0b24gY2xhc3M9XCJhZGQtYnRuXCIgZGF0YS1waWQ9JHtsaW5rZWRJdGVtLmlkfSBkYXRhLWkxOG49XCJhZGRcIj48L2J1dHRvbj5gO1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c0xpc3Q/LnByZXBlbmQocHJvZHVjdEJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRBZGRCdXR0b25Db2xvcigpO1xuICAgIHJlbW92ZUxpbmtlZFByb2R1Y3QoY2FydCk7XG4gICAgZm9yIChjb25zdCBhZGRCdG4gb2YgJHFzQWxsKCcuYWRkLWJ0bicpKXtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cImltZy9zcGlubmVyLnN2Z1wiIGNsYXNzPVwibGlua2VkLXByb2R1Y3Qtc3Bpbm5lclwiLz4nO1xuICAgICAgICAgICAgYWRkTGlua2VkUHJvZHVjdHRvQ2FydChldmVudC50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRMaW5rZWRQcm9kdWN0dG9DYXJ0KGxpbmtlZFByb2R1Y3QpIHtcbiAgICBHTE9CQUwubGlua2VkUHJvZHVjdHNJZHM/LnB1c2goTnVtYmVyLnBhcnNlSW50KGxpbmtlZFByb2R1Y3QuZGF0YXNldC5waWQpKTtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZXZlbnQ6ICdhZGRMaW5rZWRQcm9kdWN0JyxcbiAgICAgICAgcHJvZHVjdElEOiBsaW5rZWRQcm9kdWN0LmRhdGFzZXQucGlkXG4gICAgfSwgJyonKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmtlZFByb2R1Y3QoY2FydCkge1xuICAgIGZvciAoY29uc3QgbGlua2VkUHJvZHVjdCBvZiAkcXNBbGwoJy5wcm9kdWN0LWJvZHknKSl7XG4gICAgICAgIGZvcihsZXQgaSA9IGNhcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGNhcnRbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5wcm9kdWN0X2lkID09PSBOdW1iZXIucGFyc2VJbnQobGlua2VkUHJvZHVjdC5pZCkpIHtcbiAgICAgICAgICAgICAgICBsaW5rZWRQcm9kdWN0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICgkcXNBbGwoJy5wcm9kdWN0LWJvZHknKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBpZiAoISRxcygnLnByb2R1Y3QtYm9keScpKSB7XG4gICAgICAgICRxcygnI2xpbmtlZC1wcm9kdWN0cy1zZWN0aW9uJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gICAgc2Nyb2xsQWRqdXN0ZXIoKTtcbn1cbmZ1bmN0aW9uIGhhc1NhbWVMaW5rZWRQcm9kdWN0KHByb2R1Y3RJRCkge1xuICAgIGZvciAoY29uc3QgcHJvZHVjdCBvZiAkcXNBbGwoJy5wcm9kdWN0LWJvZHknKSl7XG4gICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQocHJvZHVjdC5pZCkgPT09IHByb2R1Y3RJRCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc2Nyb2xsUmlnaHQoKSB7XG4gICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgICRxcygnI3Byb2R1Y3RzLWxpc3QnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zY3JvbGxMZWZ0ICs9IDM5MlxuICAgICk7XG59XG5mdW5jdGlvbiBzY3JvbGxMZWZ0KCkge1xuICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICAkcXMoJyNwcm9kdWN0cy1saXN0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc2Nyb2xsTGVmdCAtPSAzOTJcbiAgICApO1xufVxuZnVuY3Rpb24gc2Nyb2xsQWRqdXN0ZXIoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRW5kID0gJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5zY3JvbGxMZWZ0ID8gJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5zY3JvbGxMZWZ0IDogMTtcbiAgICBjb25zdCBvZmZzZXQgPSAkcXMoJyNwcm9kdWN0cy1saXN0Jyk/Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5zY3JvbGxXaWR0aDtcbiAgICBpZiAoJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5zY3JvbGxMZWZ0ID09PSAwKSB7XG4gICAgICAgICRxcygnLnByZXYtYnRuJyk/LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1lbmQnKTtcbiAgICAgICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgIH0gZWxzZSBpZiAoc2Nyb2xsRW5kICYmIHNjcm9sbFdpZHRoICYmIG9mZnNldCAmJiBzY3JvbGxFbmQgKyAxID49IHNjcm9sbFdpZHRoIC0gb2Zmc2V0KSB7XG4gICAgICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1lbmQnKTtcbiAgICAgICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLm5leHQtYnRuJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1lbmQnKTtcbiAgICAgICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIHNlbmRDYXJ0SXRlbXMoX2NhcnQsIHNlc3Npb25JRCkge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhLmhhc192YWxpZF9rZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgICAgICdzZXNzaW9uX2lkJzogc2Vzc2lvbklELFxuICAgICAgICAgICAgJ2l0ZW1zJzogW10sXG4gICAgICAgICAgICAnbWVyY2hhbnRfbmFtZSc6IE1lcmNoYW50Q29uZmlndXJhdGlvbi5uYW1lKCksXG4gICAgICAgICAgICAnbWVyY2hhbnRfaG9zdG5hbWUnOiBNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KVxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdzZXNzaW9uL2l0ZW0nLCBvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoYFNlbmQgY2FydCBpdGVtcyBmYWlsZWQgb24gJHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX0sIEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdE9uZUNsaWNrQ2hlY2tvdXQodGVzdE1vZGUpIHtcbiAgICBjb25zdCBvbmVDbGlja1VSTCA9IGdldE9uZUNsaWNrVVJMKGxvY2F0aW9uLmhvc3RuYW1lLCB0ZXN0TW9kZSk7XG4gICAgY29uc3QgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgJGJvZHk/Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuXHQ8aWZyYW1lIGlkPVwib25lLWNsaWNrLWlmcmFtZVwiIFxuXHRcdGZyYW1lYm9yZGVyPVwiMFwiIFxuXHRcdGFsbG93dHJhbnNwYXJlbmN5PVwidHJ1ZVwiIFxuXHRcdHNjcm9sbGluZz1cIm5vXCIgXG5cdFx0YWxsb3c9XCJwYXltZW50ICpcIlxuXHRcdGFyaWEtaGlkZGVuPVwidHJ1ZVwiIFxuXHRcdHRhYmluZGV4PVwiLTFcIiBcblx0XHRzdHlsZT1cImJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyBtYXJnaW46IDBweCAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggIWltcG9ydGFudDsgd2lkdGg6IDFweCAhaW1wb3J0YW50OyBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50OyBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50OyB2aXNpYmlsaXR5OiBoaWRkZW4gIWltcG9ydGFudDsgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7IGhlaWdodDogMXB4ICFpbXBvcnRhbnQ7IHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IHVzZXItc2VsZWN0OiBub25lICFpbXBvcnRhbnQ7XCJcblx0XHRzcmM9XCIke29uZUNsaWNrVVJMfW9uZS1jbGljay5odG1sXCJcblx0PlxuXHRcdFVuYWJsZSB0byBsb2FkIFBlYWNoUGF5IE9uZSBDbGljayBDaGVja291dCBTdXBwb3J0XG5cdDwvaWZyYW1lPmApO1xufVxuKGZ1bmN0aW9uKCkge1xuICAgIG9uV2luZG93TWVzc2FnZSgnaW5pdCcsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudEhvc3ROYW1lKG1lc3NhZ2UubWVyY2hhbnRIb3N0bmFtZSkpO1xuICAgICAgICBhZGRGb3JtRmllbGRzKG1lc3NhZ2UucGhwRGF0YS5sYW5ndWFnZSk7XG4gICAgICAgIEdMT0JBTC5waHBEYXRhID0gbWVzc2FnZS5waHBEYXRhO1xuICAgICAgICBpZiAodHlwZW9mIEdMT0JBTC5waHBEYXRhLmhhc192YWxpZF9rZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBHTE9CQUwucGhwRGF0YS5oYXNfdmFsaWRfa2V5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudE5hbWUobWVzc2FnZS5waHBEYXRhLm1lcmNoYW50X25hbWUpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0RmVhdHVyZVN1cHBvcnQobWVzc2FnZS5waHBEYXRhLmZlYXR1cmVfc3VwcG9ydCwgbWVzc2FnZS5waHBEYXRhKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUxhbmd1YWdlKG1lc3NhZ2UucGhwRGF0YS5sYW5ndWFnZSA9PT0gJ2RldGVjdC1mcm9tLXBhZ2UnID8gbWVzc2FnZS5wYWdlTGFuZ3VhZ2UgOiBtZXNzYWdlLnBocERhdGEubGFuZ3VhZ2UpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICAgICAgcGx1Z2luSXNUZXN0TW9kZTogQm9vbGVhbihtZXNzYWdlLmlzVGVzdE1vZGUpLFxuICAgICAgICAgICAgcGx1Z2luUGFnZVR5cGU6IGRldGVybWluZVBhZ2VUeXBlKG1lc3NhZ2UuaXNDYXJ0UGFnZSwgbWVzc2FnZS5pc0NoZWNrb3V0UGFnZSksXG4gICAgICAgICAgICBjdXN0b21lcklzTW9iaWxlOiBtZXNzYWdlLmlzTW9iaWxlLFxuICAgICAgICAgICAgcGx1Z2luQnV0dG9uQ29sb3I6IG1lc3NhZ2UucGhwRGF0YS5idXR0b25fY29sb3IsXG4gICAgICAgICAgICBwbHVnaW5WZXJzaW9uOiBtZXNzYWdlLnBocERhdGEudmVyc2lvblxuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRNb2RhbCgpO1xuICAgICAgICBpbml0RGVsaXZlcnlEYXRlKCk7XG4gICAgICAgIGluaXRNZXRyaWNzKCk7XG4gICAgICAgIGluaXRMaW5rZWRQcm9kdWN0cygpO1xuICAgICAgICBpbml0T3JkZXJOb3RlcygpO1xuICAgICAgICBpbml0Q2FydCgpO1xuICAgICAgICBpbml0TGFuZ3VhZ2UobWVzc2FnZSk7XG4gICAgICAgIGluaXRTdW1tYXJ5KG1lc3NhZ2UpO1xuICAgICAgICBpbml0Q291cG9uSW5wdXQobWVzc2FnZSk7XG4gICAgICAgIGluaXRHaWZ0Q2FyZElucHV0KG1lc3NhZ2UpO1xuICAgICAgICBpbml0U2hpcHBpbmcobWVzc2FnZSk7XG4gICAgICAgIGluaXRDdXN0b21lcihtZXNzYWdlKTtcbiAgICAgICAgaW5pdEN1cnJlbmN5KG1lc3NhZ2UpO1xuICAgICAgICBpbml0TWVyY2hhbnRBY2NvdW50KG1lc3NhZ2UpO1xuICAgICAgICBpbml0VkFUKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLkFERElUSU9OQUxfRklFTERTKSkge1xuICAgICAgICAgICAgcmVuZGVyQWRkaXRpb25hbEZpZWxkcyhtZXNzYWdlLnBocERhdGE/LmFkZGl0aW9uYWxfZmllbGRzID8/IFtdLCBtZXNzYWdlLnBocERhdGE/LmFkZGl0aW9uYWxfZmllbGRzX29yZGVyID8/IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmRlclNlcnZpY2UgPSBnZXRPcmRlclNlcnZpY2UoKTtcbiAgICAgICAgYXdhaXQgaW5pdFN0cmlwZVN1cHBvcnQobWVzc2FnZSwgb3JkZXJTZXJ2aWNlKTtcbiAgICAgICAgYXdhaXQgaW5pdFBheVBhbFN1cHBvcnQobWVzc2FnZSwgb3JkZXJTZXJ2aWNlKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvblJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnc2Vzc2lvbicpO1xuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgc2Vzc2lvblJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlU2Vzc2lvbklkKHNlc3Npb24uaWQpKTtcbiAgICAgICAgYXdhaXQgc2VuZENhcnRJdGVtcyhEZWZhdWx0Q2FydC5jb250ZW50cygpLCBzZXNzaW9uLmlkKTtcbiAgICAgICAgaW5pdE9uZUNsaWNrQ2hlY2tvdXQobWVzc2FnZS5pc1Rlc3RNb2RlKTtcbiAgICAgICAgb25XaW5kb3dNZXNzYWdlKCdwcC1vbmUtY2xpY2stbG9hZGVkJywgYXN5bmMgKCk9PntcbiAgICAgICAgICAgIGF3YWl0IGxvYWRDdXN0b21lcigpO1xuICAgICAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgICAgICAgICAgc2VsZi5wYXJlbnQ/LnBvc3RNZXNzYWdlKCdsb2FkZWQnLCAnKicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7XG5mdW5jdGlvbiBhZGRGb3JtRmllbGRzKGxhbmcpIHtcbiAgICBsZXQgZm9ybSA9IGRlZmF1bHRGb3JtSFRNTDtcbiAgICBpZiAobGFuZyA9PT0gJ2phJykge1xuICAgICAgICBmb3JtID0gamFwYW5lc2VGb3JtSFRNTDtcbiAgICB9XG4gICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpID09PSAnaW5pdGlhbGF1ZGlvLmNvbScpIHtcbiAgICAgICAgZm9ybSA9IGNoZWNrb3V0Rm9ybU5vUGhvbmVOb0FwdDtcbiAgICB9XG4gICAgJHFzKCcjcHAtaW5mbycpPy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGZvcm0pO1xufVxuIl19