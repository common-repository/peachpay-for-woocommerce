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
    peachpayAlert(getLocaleText('something-went-wrong'));
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
        var error_7, capture, error1_1, customer, stripeCustomerID, cardBrand, cardLast4, transactionID;
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
                    capture = null;
                    _e.label = 5;
                case 5:
                    _e.trys.push([5, 7, , 8]);
                    return [4, capturePayPalOrder(data.orderID)];
                case 6:
                    capture = _e.sent();
                    return [3, 8];
                case 7:
                    error1_1 = _e.sent();
                    captureSentryException(new Error('Error while capturing PayPal order: ' + JSON.stringify(error1_1)));
                    return [3, 8];
                case 8:
                    if (!((capture === null || capture === void 0 ? void 0 : capture.status) === 'COMPLETED')) return [3, 11];
                    return [4, getCustomer()];
                case 9:
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
                case 10:
                    if (!(_e.sent()).ok) {
                        return [2];
                    }
                    transactionID = capture.purchase_units[0].payments.captures[0].id;
                    orderService.deprecated.setOrderStatus(message.order, {
                        status: 'wc-processing',
                        paymentType: 'PayPal',
                        transactionID: transactionID
                    });
                    return [3, 12];
                case 11:
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
                    _e.label = 12;
                case 12: return [2];
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
                                    store.dispatch(startModalLoading());
                                    return [4, requestCartCalculation(!Environment.customer.existing())];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJtZWRpYXRlL2J1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxTQUFTLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBUztJQUFULG1CQUFBLEVBQUEsU0FBUztJQUM1QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksUUFBUSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDekIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRO0lBQzlCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBSSxRQUFRLEVBQUU7UUFDVixLQUF1QixVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU0sRUFBQztZQUF6QixJQUFNLFFBQVEsZUFBQTtZQUNmLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQXRDLGlCQU1DO0lBTEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFPLEtBQUs7Ozs7eUJBQ3JDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFBLEVBQTlCLGNBQThCO29CQUM5QixXQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztTQUU1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QUFJLENBQUMsTUFBTSwwQ0FBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7O3lCQUMzQyxDQUFDLENBQUM7Ozs7U0FDTixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ0wsU0FBUyxhQUFhLENBQUMsSUFBSTs7SUFDdkIsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDO0lBQzNCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNmLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztLQUMzQjtJQUNELElBQUkscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUssa0JBQWtCLEVBQUU7UUFDekQsSUFBSSxHQUFHLHdCQUF3QixDQUFDO0tBQ25DO0lBQ0QsTUFBQSxHQUFHLENBQUMsVUFBVSxDQUFDLDBDQUFFLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZGVuby1mbXQtaWdub3JlLWZpbGVcbi8vIGRlbm8tbGludC1pZ25vcmUtZmlsZVxuLy8gVGhpcyBjb2RlIHdhcyBidW5kbGVkIHVzaW5nIGBkZW5vIGJ1bmRsZWAgYW5kIGl0J3Mgbm90IHJlY29tbWVuZGVkIHRvIGVkaXQgaXQgbWFudWFsbHlcblxuZnVuY3Rpb24gJHFzKHNlbGVjdG9yLCBjYiA9IG51bGwpIHtcbiAgICBjb25zdCAkZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIGlmICgkZWxlbWVudCAmJiBjYiAhPT0gbnVsbCkge1xuICAgICAgICBjYigkZWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiAkZWxlbWVudDtcbn1cbmZ1bmN0aW9uICRxc0FsbChzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICBjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiByZXN1bHQpe1xuICAgICAgICAgICAgY2FsbGJhY2soJGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbldpbmRvd01lc3NhZ2UoZXZlbnROYW1lLCBjYikge1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGFzeW5jIChldmVudCk9PntcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgYXdhaXQgY2IoZXZlbnQuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG59XG5mdW5jdGlvbiBvbldpbmRvd0RhdGFGZXRjaChlbmRwb2ludCwgcmVxdWVzdENhbGxiYWNrKSB7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgKG1lc3NhZ2UpPT57XG4gICAgICAgIGlmIChtZXNzYWdlLmRhdGEuZXZlbnQgPT09IGVuZHBvaW50KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdENhbGxiYWNrKG1lc3NhZ2UuZGF0YS5yZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBvcnRzWzBdLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXNwb25zZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBvcnRzWzBdLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hXaW5kb3dEYXRhKHRhcmdldFdpbmRvdywgZW5kcG9pbnQsIHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9ICh7IGRhdGEgIH0pPT57XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQxLmNsb3NlKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChkYXRhLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGFyZ2V0V2luZG93KSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUYXJnZXQgd2luZG93IGlzIG5vdCB2YWxpZC4nKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRXaW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiBlbmRwb2ludCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICB9LCAnKicsIFtcbiAgICAgICAgICAgICAgICBjaGFubmVsLnBvcnQyXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hIb3N0V2luZG93RGF0YShlbmRwb2ludCwgcmVxdWVzdCkge1xuICAgIHJldHVybiBmZXRjaFdpbmRvd0RhdGEod2luZG93LnRvcCwgZW5kcG9pbnQsIHJlcXVlc3QpO1xufVxudmFyIERpc3BhdGNoQWN0aW9uVHlwZTtcbihmdW5jdGlvbihEaXNwYXRjaEFjdGlvblR5cGUxKSB7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIklOSVRcIl0gPSAnaW5pdCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIkVOVklST05NRU5UXCJdID0gJ2Vudmlyb25tZW50JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiT1JERVJfU0VTU0lPTklEXCJdID0gJ3BlYWNocGF5T3JkZXIvc2Vzc2lvbklkJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiT1JERVJfQUREUkVTU19WQUxJREFURURcIl0gPSAncGVhY2hwYXlPcmRlci9hZGRyZXNzVmFsaWRhdGVkJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiT1JERVJfU0VUX0VYVFJBX0ZJRUxEU1wiXSA9ICdwZWFjaHBheU9yZGVyL2V4dHJhRmllbGRzL3NldCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk9SREVSX1NFVF9FUlJPUl9NRVNTQUdFXCJdID0gJ3BlYWNocGF5T3JkZXIvZXJyb3JNZXNzYWdlL3NldCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIlBFQUNIUEFZX0NVU1RPTUVSXCJdID0gJ3BlYWNocGF5L2N1c3RvbWVyJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiUEVBQ0hQQVlfQ1VTVE9NRVJfU1RSSVBFX0lEXCJdID0gJ3BlYWNocGF5L2N1c3RvbWVyL3N0cmlwZUlkJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiUEVBQ0hQQVlfQ1VTVE9NRVJfUEFZTUVOVF9NRVRIT0RcIl0gPSAncGVhY2hwYXkvY3VzdG9tZXIvcGF5bWVudF9tZXRob2QnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9DVVNUT01FUlwiXSA9ICdtZXJjaGFudC9jdXN0b21lcic7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0NVU1RPTUVSX0VYSVNUXCJdID0gJ21lcmNoYW50L2N1c3RvbWVyL2V4aXN0JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiRU5WSVJPTk1FTlRfTEFOR1VBR0VcIl0gPSAnbW9kYWwvbGFuZ3VhZ2UnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9OQU1FXCJdID0gJ21lcmNoYW50L25hbWUnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9IT1NUTkFNRVwiXSA9ICdtZXJjaGFudC9ob3N0bmFtZSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0dFTkVSQUxcIl0gPSAnbWVyY2hhbnQvZ2VuZXJhbCc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0dFTkVSQUxfQ1VSUkVOQ1lcIl0gPSAnbWVyY2hhbnQvZ2VuZXJhbC9jdXJyZW5jeSc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIk1FUkNIQU5UX0FDQ09VTlRcIl0gPSAnbWVyY2hhbnQvYWNjb3VudHMnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJNRVJDSEFOVF9UQVhcIl0gPSAnbWVyY2hhbnQvdGF4JztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiTUVSQ0hBTlRfU0hJUFBJTkdcIl0gPSAnbWVyY2hhbnQvc2hpcHBpbmcnO1xuICAgIERpc3BhdGNoQWN0aW9uVHlwZTFbXCJERUZBVUxUX0NBUlRfQ09OVEVOVFNcIl0gPSAnZGVmYXVsdC9jYXJ0L2NvbnRlbnRzJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiREVGQVVMVF9DQVJUX0NBTENVTEFUSU9OXCJdID0gJ2RlZmF1bHQvY2FydC9jYWxjdWxhdGlvbic7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIkNBUlRfQ0FMQ1VMQVRJT05cIl0gPSAnY2FydC9jYWxjdWxhdGlvbic7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIkNBUlRfU0hJUFBJTkdfU0VMRUNUSU9OXCJdID0gJ2NhcnQvc2hpcHBpbmcvc2VsZWN0aW9uJztcbiAgICBEaXNwYXRjaEFjdGlvblR5cGUxW1wiRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTXCJdID0gJ0VOVklST05NRU5UX1NFVF9GRUFUVVJFUyc7XG4gICAgRGlzcGF0Y2hBY3Rpb25UeXBlMVtcIlBFQUNIUEFZX0NVU1RPTUVSX1NISVBQSU5HXCJdID0gJ1BFQUNIUEFZX0NVU1RPTUVSX1NISVBQSU5HJztcbn0pKERpc3BhdGNoQWN0aW9uVHlwZSB8fCAoRGlzcGF0Y2hBY3Rpb25UeXBlID0ge30pKTtcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBsYW5ndWFnZTogJ2VuLVVTJyxcbiAgICAgICAgcGx1Z2luOiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiAnJyxcbiAgICAgICAgICAgIG1vZGU6ICdsaXZlJyxcbiAgICAgICAgICAgIHBhZ2VUeXBlOiAnY2FydCcsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogJyNGRjg3NkMnLFxuICAgICAgICAgICAgZmVhdHVyZVN1cHBvcnQ6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgICAgICBleGlzdGluZzogZmFsc2UsXG4gICAgICAgICAgICBtb2JpbGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIG1vZGFsVUk6IHtcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcGFnZTogJ2luZm8nLFxuICAgICAgICAgICAgbG9hZGluZ01vZGU6ICdmaW5pc2hlZCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGVhY2hQYXlPcmRlcjoge1xuICAgICAgICBzZXNzaW9uSWQ6ICcnLFxuICAgICAgICBjdXN0b21lckFkZHJlc3NWYWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICBhZGRpdGlvbmFsRmllbGRzOiB7fSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnJ1xuICAgIH0sXG4gICAgcGVhY2hQYXlDdXN0b21lcjoge1xuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIG5hbWVfZmlyc3Q6ICcnLFxuICAgICAgICBuYW1lX2xhc3Q6ICcnLFxuICAgICAgICBhZGRyZXNzMTogJycsXG4gICAgICAgIGFkZHJlc3MyOiAnJyxcbiAgICAgICAgY2l0eTogJycsXG4gICAgICAgIHN0YXRlOiAnJyxcbiAgICAgICAgY291bnRyeTogJycsXG4gICAgICAgIHBvc3RhbDogJycsXG4gICAgICAgIHBob25lOiAnJ1xuICAgIH0sXG4gICAgbWVyY2hhbnRDdXN0b21lcjoge1xuICAgICAgICB1c2VybmFtZTogJycsXG4gICAgICAgIGxvZ2dlZEluOiBmYWxzZSxcbiAgICAgICAgdXNlcm5hbWVJc1JlZ2lzdGVyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBtZXJjaGFudENvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGhvc3ROYW1lOiAnJyxcbiAgICAgICAgZ2VuZXJhbDoge1xuICAgICAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICAgICAgICBjb2RlOiAnVVNEJyxcbiAgICAgICAgICAgICAgICBzeW1ib2w6ICckJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcjogJywnLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcbiAgICAgICAgICAgICAgICByb3VuZGluZzogJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaGlwcGluZzoge1xuICAgICAgICAgICAgc2hpcHBpbmdab25lczogMFxuICAgICAgICB9LFxuICAgICAgICB0YXg6IHtcbiAgICAgICAgICAgIGRpc3BsYXlQcmljZXNJbkNhcnRBbmRDaGVja291dDogJ2V4Y2x1ZGVUYXgnXG4gICAgICAgIH0sXG4gICAgICAgIGFjY291bnRzQW5kUHJpdmFjeToge1xuICAgICAgICAgICAgYWxsb3dHdWVzdENoZWNrb3V0OiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dBY2NvdW50Q3JlYXRpb25PckxvZ2luRHVyaW5nQ2hlY2tvdXQ6IHRydWUsXG4gICAgICAgICAgICBhdXRvR2VuZXJhdGVVc2VybmFtZTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvR2VuZXJhdGVQYXNzd29yZDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2FsY3VsYXRlZENhcnRzOiB7XG4gICAgICAgIDA6IHtcbiAgICAgICAgICAgIHBhY2thZ2VfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgIGNhcnQ6IFtdLFxuICAgICAgICAgICAgc3VtbWFyeToge1xuICAgICAgICAgICAgICAgIGZlZXNfcmVjb3JkOiB7fSxcbiAgICAgICAgICAgICAgICBjb3Vwb25zX3JlY29yZDoge30sXG4gICAgICAgICAgICAgICAgZ2lmdF9jYXJkX3JlY29yZDoge30sXG4gICAgICAgICAgICAgICAgc3VidG90YWw6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxfc2hpcHBpbmc6IDAsXG4gICAgICAgICAgICAgICAgdG90YWxfdGF4OiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FydF9tZXRhOiB7XG4gICAgICAgICAgICAgICAgaXNfdmlydHVhbDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaFVwZGF0ZSh0eXBlKSB7XG4gICAgcmV0dXJuIChwYXlsb2FkKT0+KHtcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBwYXlsb2FkXG4gICAgICAgIH0pXG4gICAgO1xufVxuZnVuY3Rpb24gbWVyY2hhbnRDb25maWd1cmF0aW9uUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTF9DVVJSRU5DWTpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgZ2VuZXJhbDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5nZW5lcmFsLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0dFTkVSQUw6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGdlbmVyYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9BQ0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBhY2NvdW50c0FuZFByaXZhY3k6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9UQVg6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHRheDoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX1NISVBQSU5HOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzaGlwcGluZzoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0hPU1ROQU1FOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBob3N0TmFtZTogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX05BTUU6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBwZWFjaFBheU9yZGVyUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VTU0lPTklEOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9BRERSRVNTX1ZBTElEQVRFRDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuT1JERVJfU0VUX0VYVFJBX0ZJRUxEUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbEZpZWxkczoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFVF9FUlJPUl9NRVNTQUdFOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZVxuICAgICAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbnZpcm9ubWVudFJlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLkVOVklST05NRU5UOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5jdXN0b21lclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLnBsdWdpblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kYWxVSToge1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5tb2RhbFVJXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlRfTEFOR1VBR0U6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlU3VwcG9ydDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBtb2RhbFVJOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLm1vZGFsVUlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmNoYW50Q3VzdG9tZXJSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0NVU1RPTUVSX0VYSVNUOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZUlzUmVnaXN0ZXJlZDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBlYWNoUGF5Q3VzdG9tZXJSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSX1NUUklQRV9JRDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc3RyaXBlX2N1c3RvbWVyX2lkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfUEFZTUVOVF9NRVRIT0Q6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHBheW1lbnRfb3B0aW9uOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfU0hJUFBJTkc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgICAgICAgIHBvc3RhbDogYWN0aW9uLnBheWxvYWQucG9zdGNvZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNhcnRSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5ERUZBVUxUX0NBUlRfQ09OVEVOVFM6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGVbJzAnXSxcbiAgICAgICAgICAgICAgICAgICAgY2FydDogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5ERUZBVUxUX0NBUlRfQ0FMQ1VMQVRJT046XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIERpc3BhdGNoQWN0aW9uVHlwZS5DQVJUX0NBTENVTEFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBEaXNwYXRjaEFjdGlvblR5cGUuQ0FSVF9TSElQUElOR19TRUxFQ1RJT046XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKCFuZXdTdGF0ZVtwYXlsb2FkLmNhcnRLZXldIHx8ICFuZXdTdGF0ZVtwYXlsb2FkLmNhcnRLZXldPy5wYWNrYWdlX3JlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VSZWNvcmQgPSBuZXdTdGF0ZVtwYXlsb2FkLmNhcnRLZXldLnBhY2thZ2VfcmVjb3JkO1xuICAgICAgICAgICAgICAgIGlmICghcGFja2FnZVJlY29yZFtwYXlsb2FkLnNoaXBwaW5nUGFja2FnZUtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYWNrYWdlUmVjb3JkW3BheWxvYWQuc2hpcHBpbmdQYWNrYWdlS2V5XS5zZWxlY3RlZF9tZXRob2QgPSBwYXlsb2FkLnBhY2thZ2VNZXRob2RJZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJvb3RSZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGVhY2hQYXlPcmRlcjogcGVhY2hQYXlPcmRlclJlZHVjZXIoc3RhdGUucGVhY2hQYXlPcmRlciwgYWN0aW9uKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IGVudmlyb25tZW50UmVkdWNlcihzdGF0ZS5lbnZpcm9ubWVudCwgYWN0aW9uKSxcbiAgICAgICAgbWVyY2hhbnRDdXN0b21lcjogbWVyY2hhbnRDdXN0b21lclJlZHVjZXIoc3RhdGUubWVyY2hhbnRDdXN0b21lciwgYWN0aW9uKSxcbiAgICAgICAgcGVhY2hQYXlDdXN0b21lcjogcGVhY2hQYXlDdXN0b21lclJlZHVjZXIoc3RhdGUucGVhY2hQYXlDdXN0b21lciwgYWN0aW9uKSxcbiAgICAgICAgbWVyY2hhbnRDb25maWd1cmF0aW9uOiBtZXJjaGFudENvbmZpZ3VyYXRpb25SZWR1Y2VyKHN0YXRlLm1lcmNoYW50Q29uZmlndXJhdGlvbiwgYWN0aW9uKSxcbiAgICAgICAgY2FsY3VsYXRlZENhcnRzOiBjYXJ0UmVkdWNlcihzdGF0ZS5jYWxjdWxhdGVkQ2FydHMsIGFjdGlvbilcbiAgICB9O1xufVxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyb290UmVkdWNlcik7XG5mdW5jdGlvbiB1cGRhdGVFbnZpcm9ubWVudChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogRGlzcGF0Y2hBY3Rpb25UeXBlLkVOVklST05NRU5ULFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBsYW5ndWFnZTogb3B0aW9ucy5sYW5ndWFnZSA/PyBFbnZpcm9ubWVudC5sYW5ndWFnZSgpLFxuICAgICAgICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgICAgICAgICBleGlzdGluZzogb3B0aW9ucy5jdXN0b21lckV4aXN0cyA/PyBFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogb3B0aW9ucy5jdXN0b21lcklzTW9iaWxlID8/IEVudmlyb25tZW50LmN1c3RvbWVyLm1vYmlsZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogb3B0aW9ucy5wbHVnaW5WZXJzaW9uID8/IEVudmlyb25tZW50LnBsdWdpbi52ZXJzaW9uKCksXG4gICAgICAgICAgICAgICAgbW9kZTogdHlwZW9mIG9wdGlvbnMucGx1Z2luSXNUZXN0TW9kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5wbHVnaW5Jc1Rlc3RNb2RlID8gJ3Rlc3QnIDogJ2xpdmUnIDogRW52aXJvbm1lbnQucGx1Z2luLm1vZGUoKSxcbiAgICAgICAgICAgICAgICBidXR0b25Db2xvcjogb3B0aW9ucy5wbHVnaW5CdXR0b25Db2xvciA/PyBFbnZpcm9ubWVudC5wbHVnaW4uYnV0dG9uQ29sb3IoKSxcbiAgICAgICAgICAgICAgICBwYWdlVHlwZTogb3B0aW9ucy5wbHVnaW5QYWdlVHlwZSA/PyBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSxcbiAgICAgICAgICAgICAgICBmZWF0dXJlU3VwcG9ydDogc3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4uZmVhdHVyZVN1cHBvcnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2RhbFVJOiB7XG4gICAgICAgICAgICAgICAgb3Blbjogb3B0aW9ucy5tb2RhbElzT3BlbiA/PyBFbnZpcm9ubWVudC5tb2RhbFVJLm9wZW4oKSxcbiAgICAgICAgICAgICAgICBwYWdlOiBvcHRpb25zLm1vZGFsUGFnZVR5cGUgPz8gRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCksXG4gICAgICAgICAgICAgICAgbG9hZGluZ01vZGU6IG9wdGlvbnMubW9kYWxMb2FkaW5nID8/IEVudmlyb25tZW50Lm1vZGFsVUkubG9hZGluZ01vZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldEZlYXR1cmVTdXBwb3J0KGZlYXR1cmVzID0ge30sIHBocERhdGEpIHtcbiAgICBpZiAoIWZlYXR1cmVzW0ZlYXR1cmVGbGFnLkNPVVBPTl9JTlBVVF0pIHtcbiAgICAgICAgZmVhdHVyZXNbRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IEJvb2xlYW4ocGhwRGF0YS5lbmFibGVfY291cG9ucyksXG4gICAgICAgICAgICB2ZXJzaW9uOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghZmVhdHVyZXNbRmVhdHVyZUZsYWcuT1JERVJfTk9URVNdKSB7XG4gICAgICAgIGZlYXR1cmVzW0ZlYXR1cmVGbGFnLk9SREVSX05PVEVTXSA9IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IEJvb2xlYW4ocGhwRGF0YS5lbmFibGVfb3JkZXJfbm90ZXMpLFxuICAgICAgICAgICAgdmVyc2lvbjogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmVzW0ZlYXR1cmVGbGFnLkdJRlRDQVJEX0lOUFVUXSkge1xuICAgICAgICBmZWF0dXJlc1tGZWF0dXJlRmxhZy5HSUZUQ0FSRF9JTlBVVF0gPSB7XG4gICAgICAgICAgICBlbmFibGVkOiBCb29sZWFuKHBocERhdGEucGx1Z2luX3B3X3dvb2NvbW1lcmNlX2dpZnRfY2FyZHNfYWN0aXZlKSxcbiAgICAgICAgICAgIHZlcnNpb246IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlc1tGZWF0dXJlRmxhZy5TVFJJUEVdKSB7XG4gICAgICAgIGZlYXR1cmVzW0ZlYXR1cmVGbGFnLlNUUklQRV0gPSB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdmVyc2lvbjogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBEaXNwYXRjaEFjdGlvblR5cGUuRU5WSVJPTk1FTlRfU0VUX0ZFQVRVUkVTLFxuICAgICAgICBwYXlsb2FkOiBmZWF0dXJlc1xuICAgIH07XG59XG5jb25zdCB1cGRhdGVMYW5ndWFnZSA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5FTlZJUk9OTUVOVF9MQU5HVUFHRSk7XG5jb25zdCBzdGFydE1vZGFsTG9hZGluZyA9ICgpPT51cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgIG1vZGFsTG9hZGluZzogJ2xvYWRpbmcnXG4gICAgfSlcbjtcbmNvbnN0IHN0YXJ0TW9kYWxQcm9jZXNzaW5nID0gKCk9PnVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxMb2FkaW5nOiAncHJvY2Vzc2luZydcbiAgICB9KVxuO1xuY29uc3Qgc3RvcE1vZGFsTG9hZGluZyA9ICgpPT51cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgIG1vZGFsTG9hZGluZzogJ2ZpbmlzaGVkJ1xuICAgIH0pXG47XG5jb25zdCBFbnZpcm9ubWVudCA9IHtcbiAgICBlbnZpcm9ubWVudDogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnRcbiAgICAsXG4gICAgbGFuZ3VhZ2U6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50Lmxhbmd1YWdlXG4gICAgLFxuICAgIHRlc3RNb2RlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4ubW9kZSA9PT0gJ3Rlc3QnXG4gICAgLFxuICAgIGN1c3RvbWVyOiB7XG4gICAgICAgIGV4aXN0aW5nOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZ1xuICAgICAgICAsXG4gICAgICAgIG1vYmlsZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQuY3VzdG9tZXIubW9iaWxlXG4gICAgfSxcbiAgICBwbHVnaW46IHtcbiAgICAgICAgdmVyc2lvbjogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLnZlcnNpb25cbiAgICAgICAgLFxuICAgICAgICBtb2RlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4ubW9kZVxuICAgICAgICAsXG4gICAgICAgIGJ1dHRvbkNvbG9yOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5wbHVnaW4uYnV0dG9uQ29sb3JcbiAgICAgICAgLFxuICAgICAgICBwYWdlVHlwZTogKCk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlXG4gICAgfSxcbiAgICBtb2RhbFVJOiB7XG4gICAgICAgIG9wZW46ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50Lm1vZGFsVUkub3BlblxuICAgICAgICAsXG4gICAgICAgIHBhZ2U6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50Lm1vZGFsVUkucGFnZVxuICAgICAgICAsXG4gICAgICAgIGxvYWRpbmdNb2RlOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5lbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlXG4gICAgfVxufTtcbmZ1bmN0aW9uIGdldExvY2FsZVRleHQoa2V5KSB7XG4gICAgaWYgKCFwZWFjaHBheWkxOG5ba2V5XSkge1xuICAgICAgICByZXR1cm4gcGVhY2hwYXlpMThuLnVua25vd25bRW52aXJvbm1lbnQubGFuZ3VhZ2UoKV07XG4gICAgfVxuICAgIHJldHVybiBwZWFjaHBheWkxOG5ba2V5XVtFbnZpcm9ubWVudC5sYW5ndWFnZSgpXTtcbn1cbmNvbnN0IHVwZGF0ZU1lcmNoYW50Q3VycmVuY3lDb25maWcgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuTUVSQ0hBTlRfR0VORVJBTF9DVVJSRU5DWSk7XG5jb25zdCB1cGRhdGVNZXJjaGFudFRheENvbmZpZyA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9UQVgpO1xuY29uc3QgdXBkYXRlTWVyY2hhbnRHZW5lcmFsQ29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0dFTkVSQUwpO1xuY29uc3QgdXBkYXRlTWVyY2hhbnRBY2NvdW50Q29uZmlnID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0FDQ09VTlQpO1xuY29uc3QgdXBkYXRlTWVyY2hhbnRTaGlwcGluZ0NvbmZpZyA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9TSElQUElORyk7XG5jb25zdCB1cGRhdGVNZXJjaGFudEhvc3ROYW1lID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk1FUkNIQU5UX0hPU1ROQU1FKTtcbmNvbnN0IHVwZGF0ZU1lcmNoYW50TmFtZSA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9OQU1FKTtcbmNvbnN0IE1lcmNoYW50Q29uZmlndXJhdGlvbiA9IHtcbiAgICBuYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24ubmFtZVxuICAgICxcbiAgICBob3N0TmFtZTogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lXG4gICAgLFxuICAgIGdlbmVyYWw6IHtcbiAgICAgICAgd2NMb2NhdGlvbkluZm9EYXRhOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC53Y0xvY2F0aW9uSW5mb0RhdGFcbiAgICB9LFxuICAgIGN1cnJlbmN5OiB7XG4gICAgICAgIGNvbmZpZ3VyYXRpb246ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLmN1cnJlbmN5XG4gICAgICAgICxcbiAgICAgICAgY29kZTogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwuY3VycmVuY3kuY29kZVxuICAgICAgICAsXG4gICAgICAgIHN5bWJvbDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwuY3VycmVuY3kuc3ltYm9sXG4gICAgfSxcbiAgICB0YXg6IHtcbiAgICAgICAgZGlzcGxheU1vZGU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi50YXguZGlzcGxheVByaWNlc0luQ2FydEFuZENoZWNrb3V0XG4gICAgfSxcbiAgICBzaGlwcGluZzoge1xuICAgICAgICBzaGlwcGluZ1pvbmVzOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudENvbmZpZ3VyYXRpb24uc2hpcHBpbmcuc2hpcHBpbmdab25lc1xuICAgIH0sXG4gICAgYWNjb3VudHM6IHtcbiAgICAgICAgbG9naW5EdXJpbmdDaGVja291dEVuYWJsZWQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50c0FuZFByaXZhY3kuYWxsb3dBY2NvdW50Q3JlYXRpb25PckxvZ2luRHVyaW5nQ2hlY2tvdXRcbiAgICAgICAgLFxuICAgICAgICBhbGxvd0d1ZXN0Q2hlY2tvdXQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50c0FuZFByaXZhY3kuYWxsb3dHdWVzdENoZWNrb3V0XG4gICAgICAgICxcbiAgICAgICAgZ2VuZXJhdGVQYXNzd29yZEVuYWJsZWQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLm1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50c0FuZFByaXZhY3kuYXV0b0dlbmVyYXRlUGFzc3dvcmRcbiAgICAgICAgLFxuICAgICAgICBnZW5lcmF0ZVVzZXJuYW1lRW5hYmxlZDogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzQW5kUHJpdmFjeS5hdXRvR2VuZXJhdGVVc2VybmFtZVxuICAgIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSkge1xuICAgIGxldCBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgY29uc3QgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICAgIGxldCBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBsZXQgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICAgIGxldCBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgICBjb25zdCBkaXNwYXRjaCA9IChhY3Rpb24pPT57XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG1heSBvbmx5IGRpc3BhdGNoIHBsYWluIG9iamVjdHMuIFJlY2VpdmVkOiAnICsgdHlwZW9mIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgICAgIH0gZmluYWxseXtcbiAgICAgICAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycz8ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgICAgICBsaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGF0ZSA9ICgpPT57XG4gICAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IGNhbGwgZ2V0U3RhdGUgZnJvbSB3aXRoaW4gYSByZWR1Y2VyLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgfTtcbiAgICBjb25zdCBzdWJzY3JpYmUgPSAobGlzdGVuZXIpPT57XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4gSW5zdGVhZCByZWNlaXZlZDogJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgYWRkIGEgc3Vic2NyaWJlciBmcm9tIGEgc3Vic2NyaXB0aW9uIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc1N1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM/LnNsaWNlKCkgPz8gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBuZXh0TGlzdGVuZXJzPy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuICgpPT57XG4gICAgICAgICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCByZW1vdmUgYSBzdWJzY3JpYmVyIHdoaWxlIHJlZHVjaW5nIG9yIGluc2lkZSBhIHN1YnNjcmlwdGlvbiBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycz8uc2xpY2UoKSA/PyBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBuZXh0TGlzdGVuZXJzPy5pbmRleE9mKGxpc3RlbmVyKSA/PyAwO1xuICAgICAgICAgICAgbmV4dExpc3RlbmVycy5zbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBjdXJyZW50TGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ2luaXQnXG4gICAgfSk7XG4gICAgY29uc3Qgc3RvcmUxID0ge1xuICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUsXG4gICAgICAgIHN1YnNjcmliZVxuICAgIH07XG4gICAgcmV0dXJuIHN0b3JlMTtcbn1cbmNvbnN0IHVwZGF0ZUNhcnRDYWxjdWxhdGlvbiA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5DQVJUX0NBTENVTEFUSU9OKTtcbmNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5ERUZBVUxUX0NBUlRfQ09OVEVOVFMpO1xuY29uc3QgdXBkYXRlQ2FydFBhY2thZ2VTaGlwcGluZ01ldGhvZCA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5DQVJUX1NISVBQSU5HX1NFTEVDVElPTik7XG5mdW5jdGlvbiBjcmVhdGVDYXJ0U2VsZWN0b3JzKGNhcnRLZXkgPSAnMCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kOiAocGFja2FnZUtleSA9ICcwJyk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5wYWNrYWdlX3JlY29yZD8uW3BhY2thZ2VLZXldPy5zZWxlY3RlZF9tZXRob2QgPz8gJydcbiAgICAgICAgLFxuICAgICAgICBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kRGV0YWlsczogKHBhY2thZ2VLZXkgPSAnMCcpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8ucGFja2FnZV9yZWNvcmQ/LltwYWNrYWdlS2V5XSA/PyBudWxsXG4gICAgICAgICxcbiAgICAgICAgY29udGVudHM6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uY2FydCA/PyBbXVxuICAgICAgICAsXG4gICAgICAgIHN1YnRvdGFsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuc3VidG90YWwgPz8gMFxuICAgICAgICAsXG4gICAgICAgIGZlZVRvdGFsOiAoZmVlKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuZmVlc19yZWNvcmRbZmVlXSA/PyAwXG4gICAgICAgICxcbiAgICAgICAgdG90YWxBcHBsaWVkRmVlczogKCk9Pk9iamVjdC5lbnRyaWVzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmZlZXNfcmVjb3JkID8/IHt9KS5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIFtfLCB2YWx1ZV0pPT5wcmV2aW91c1ZhbHVlICsgKHZhbHVlID8/IDApXG4gICAgICAgICAgICAsIDApXG4gICAgICAgICxcbiAgICAgICAgY291cG9uVG90YWw6IChjb3Vwb24pPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5jb3Vwb25zX3JlY29yZFtjb3Vwb25dID8/IDBcbiAgICAgICAgLFxuICAgICAgICB0b3RhbEFwcGxpZWRDb3Vwb25zOiAoKT0+T2JqZWN0LmVudHJpZXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkuY291cG9uc19yZWNvcmQgPz8ge30pLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgW18sIHZhbHVlXSk9PnByZXZpb3VzVmFsdWUgKyAodmFsdWUgPz8gMClcbiAgICAgICAgICAgICwgMClcbiAgICAgICAgLFxuICAgICAgICBjb3Vwb25SZWNvcmQ6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XT8uc3VtbWFyeS5jb3Vwb25zX3JlY29yZFxuICAgICAgICAsXG4gICAgICAgIGdpZnRDYXJkVG90YWw6IChnaWZ0Q2FyZCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmdpZnRfY2FyZF9yZWNvcmQ/LltnaWZ0Q2FyZF0gPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsQXBwbGllZEdpZnRDYXJkczogKCk9Pk9iamVjdC5lbnRyaWVzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LmdpZnRfY2FyZF9yZWNvcmQgPz8ge30pLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgW18sIHZhbHVlXSk9PnByZXZpb3VzVmFsdWUgKyAodmFsdWUgPz8gMClcbiAgICAgICAgICAgICwgMClcbiAgICAgICAgLFxuICAgICAgICB0b3RhbFNoaXBwaW5nOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkudG90YWxfc2hpcHBpbmcgPz8gMFxuICAgICAgICAsXG4gICAgICAgIHRvdGFsVGF4OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNbY2FydEtleV0/LnN1bW1hcnkudG90YWxfdGF4ID8/IDBcbiAgICAgICAgLFxuICAgICAgICB0b3RhbDogKCk9PnN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldPy5zdW1tYXJ5LnRvdGFsID8/IDBcbiAgICB9O1xufVxuY29uc3QgRGVmYXVsdENhcnQgPSBjcmVhdGVDYXJ0U2VsZWN0b3JzKCcwJyk7XG5jb25zdCBDYXJ0cyA9IHtcbiAgICBhbnlTaGlwcGluZ01ldGhvZHNBdmFpbGFibGU6ICgpPT57XG4gICAgICAgIGZvciAoY29uc3QgY2FydEtleSBvZiBPYmplY3Qua2V5cyhzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0cykpe1xuICAgICAgICAgICAgY29uc3QgY2FsY3VsYXRlZENhcnQgPSBzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XTtcbiAgICAgICAgICAgIGlmICghY2FsY3VsYXRlZENhcnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFja2FnZUtleSBvZiBPYmplY3Qua2V5cyhjYWxjdWxhdGVkQ2FydC5wYWNrYWdlX3JlY29yZCkpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBwaW5nUGFja2FnZSA9IGNhbGN1bGF0ZWRDYXJ0LnBhY2thZ2VfcmVjb3JkW3BhY2thZ2VLZXldO1xuICAgICAgICAgICAgICAgIGlmICghc2hpcHBpbmdQYWNrYWdlIHx8IE9iamVjdC5lbnRyaWVzKHNoaXBwaW5nUGFja2FnZS5tZXRob2RzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nOiAoKT0+e1xuICAgICAgICBjb25zdCBjYXJ0cyA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNhcnQgb2YgT2JqZWN0LnZhbHVlcyhjYXJ0cykpe1xuICAgICAgICAgICAgaWYgKCFjYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtwYWNrYWdlS2V5LCBwYWNrYWdlUmVjb3JkXSBvZiBPYmplY3QuZW50cmllcyhjYXJ0LnBhY2thZ2VfcmVjb3JkID8/IHt9KSl7XG4gICAgICAgICAgICAgICAgaWYgKCFwYWNrYWdlUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBwaW5nTWV0aG9kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kS2V5OiBgJHtwYWNrYWdlS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2hpcHBpbmc6IHBhY2thZ2VSZWNvcmQuc2VsZWN0ZWRfbWV0aG9kXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzO1xuICAgIH0sXG4gICAgc3Vic2NyaXB0aW9uUHJlc2VudDogKCk9PntcbiAgICAgICAgZm9yIChjb25zdCBjYXJ0S2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkQ2FydCA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldO1xuICAgICAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGN1bGF0ZWRDYXJ0LmNhcnRfbWV0YS5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmNhcnRTdW1tYXJ5Vmlld0RhdGEoJzAnKTtcbmZ1bmN0aW9uIGNhcnRTdW1tYXJ5Vmlld0RhdGEoY2FydEtleSkge1xuICAgIHJldHVybiAoKT0+e1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVkQ2FydCA9IHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzW2NhcnRLZXldO1xuICAgICAgICBpZiAoIWNhbGN1bGF0ZWRDYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcnRTdW1tYXJ5OiBuZXcgQXJyYXkoKSxcbiAgICAgICAgICAgICAgICBjYXJ0TWV0YToge1xuICAgICAgICAgICAgICAgICAgICBpc192aXJ0dWFsOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FydFN1bW1hcnkgPSBbXTtcbiAgICAgICAgY29uc3QgY2FydE1ldGEgPSBjYWxjdWxhdGVkQ2FydC5jYXJ0X21ldGE7XG4gICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAga2V5OiBnZXRMb2NhbGVUZXh0KCdzdWJ0b3RhbCcpLFxuICAgICAgICAgICAgdmFsdWU6IGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkuc3VidG90YWxcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAoY29uc3QgW2NvdXBvbiwgYW1vdW50XSBvZiBPYmplY3QuZW50cmllcyhjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LmNvdXBvbnNfcmVjb3JkKSl7XG4gICAgICAgICAgICBpZiAoIWFtb3VudCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FydFN1bW1hcnkucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBgJHtnZXRMb2NhbGVUZXh0KCdjb3Vwb24nKX0gLSAoJHtjb3Vwb259KWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6IC1hbW91bnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW2ZlZSwgYW1vdW50MV0gb2YgT2JqZWN0LmVudHJpZXMoY2FsY3VsYXRlZENhcnQuc3VtbWFyeS5mZWVzX3JlY29yZCkpe1xuICAgICAgICAgICAgaWYgKCFhbW91bnQxKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGBGZWUgLSAoJHtmZWV9KWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGFtb3VudDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsY3VsYXRlZENhcnQuY2FydF9tZXRhLmlzX3ZpcnR1YWwpIHtcbiAgICAgICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAgICAgIGtleTogZ2V0TG9jYWxlVGV4dCgnc2hpcHBpbmcnKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY2FsY3VsYXRlZENhcnQuc3VtbWFyeS50b3RhbF9zaGlwcGluZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi50YXguZGlzcGxheU1vZGUoKSA9PT0gJ2V4Y2x1ZGVUYXgnKSB7XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGdldExvY2FsZVRleHQoJ3RheCcpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBjYWxjdWxhdGVkQ2FydC5zdW1tYXJ5LnRvdGFsX3RheFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbZ2lmdENhcmQsIGFtb3VudDJdIG9mIE9iamVjdC5lbnRyaWVzKGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkuZ2lmdF9jYXJkX3JlY29yZCkpe1xuICAgICAgICAgICAgaWYgKCFhbW91bnQyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeS5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGBHaWZ0IGNhcmQgLSAoJHtnaWZ0Q2FyZH0pYCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogLWFtb3VudDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhcnRTdW1tYXJ5LnB1c2goe1xuICAgICAgICAgICAga2V5OiBnZXRMb2NhbGVUZXh0KCd0b3RhbCcpLFxuICAgICAgICAgICAgdmFsdWU6IGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkudG90YWxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYXJ0U3VtbWFyeSxcbiAgICAgICAgICAgIGNhcnRNZXRhXG4gICAgICAgIH07XG4gICAgfTtcbn1cbmNvbnN0IHBlYWNocGF5aTE4biA9IHtcbiAgICBhZGQ6IHtcbiAgICAgICAgJ2RlLURFJzogJysgSGluenVmw7xnZW4nLFxuICAgICAgICAnZW4tVVMnOiAnKyBBZGQnLFxuICAgICAgICAnZXMtRVMnOiAnKyBBZ3JlZ2FyJyxcbiAgICAgICAgZnI6ICcrIEFqb3V0ZXInLFxuICAgICAgICBpdDogJysgQWdnaXVuZ2VyZScsXG4gICAgICAgIGphOiAnKyDov73liqAnLFxuICAgICAgICAncm8tUk8nOiAnKyBBZMSDdWdhJyxcbiAgICAgICAgYXI6ICfZiti22YrZgSArJyxcbiAgICAgICAgY2E6ICcrIEFmZWdlaXgnLFxuICAgICAgICAnY3MtQ1onOiAnKyBQxZlpZGF0JyxcbiAgICAgICAgJ2RhLURLJzogJysgVGlsZsO4amUnLFxuICAgICAgICBlbDogJysgzqDPgc6/z4POuM6uzrrOtycsXG4gICAgICAgICdoaS1JTic6ICcrIOCknOCli+CkoeCkvOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICcrIOy2lOqwgO2VmOuLpCcsXG4gICAgICAgICdsYi1MVSc6ICcrIEFkZMOpaWVyZW4nLFxuICAgICAgICAnbmwtTkwnOiAnKyBUb2V2b2VnZW4nLFxuICAgICAgICAncHQtUFQnOiAnKyBBZGljaW9uYXInLFxuICAgICAgICAncnUtUlUnOiAnKyDQlNC+0LHQsNCy0LvRj9GC0YwnLFxuICAgICAgICAnc2wtU0knOiAnKyBEb2RhaicsXG4gICAgICAgICdzdi1TRSc6ICcrIEzDpGdnIHRpbGwnLFxuICAgICAgICB0aDogJysg4LmA4Lie4Li04LmI4LihJyxcbiAgICAgICAgdWs6ICcrINCU0L7QtNCw0YLQuCcsXG4gICAgICAgICd6aC1DTic6ICcrIOa3u+WKoCcsXG4gICAgICAgICd6aC1UVyc6ICcrIOa3u+WKoCdcbiAgICB9LFxuICAgICdlbXB0eS1jYXJ0Jzoge1xuICAgICAgICAnZW4tVVMnOiAnQ2FydCBpcyBlbXB0eScsXG4gICAgICAgICdkZS1ERSc6ICdLdXJ2ZW4gZXIgdG9tJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VsIGNhcnJpdG8gZXN0YSB2YWPDrW8nLFxuICAgICAgICBmcjogJ0xlIHBhbmllciBlc3QgdmlkZScsXG4gICAgICAgIGl0OiAnSWwgY2FycmVsbG8gw6ggdnVvdG8nLFxuICAgICAgICBqYTogJ+OCq+ODvOODiOOBjOepuuOBp+OBmScsXG4gICAgICAgICdyby1STyc6ICdDb8iZdWwgZXN0ZSBnb2wnLFxuICAgICAgICBhcjogJ9in2YTYqNi32KfZgtmHINiu2KfZhNmK2YcnLFxuICAgICAgICBjYTogJ0VsIGNhcnJldMOzIGVzdMOgIGJ1aXQnLFxuICAgICAgICAnY3MtQ1onOiAnS2/FocOtayBqZSBwcsOhemRuw70nLFxuICAgICAgICAnZGEtREsnOiAnS2/FoWFyaWNhIGplIHByYXpuYScsXG4gICAgICAgIGVsOiAnzqTOvyDOus6xzrvOrM64zrkgzrXOr869zrHOuSDOrM60zrXOuc6/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCkvuCksOCljeCknyDgpJbgpL7gpLLgpYAg4KS54KWIJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yepeuwlOq1rOuLiOqwgCDruYTslrQg7J6I7Iq164uI64ukLicsXG4gICAgICAgICdsYi1MVSc6ICdXZWVuY2hlbiBhc3MgZWlkZWwnLFxuICAgICAgICAnbmwtTkwnOiAnV2lua2Vsd2FnZW4gaXMgbGVlZycsXG4gICAgICAgICdwdC1QVCc6ICdjYXJyaW5obyBlc3RhIHZhemlvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0L7RgNC30LjQvdCwINC/0YPRgdGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnS2/FoWFyaWNhIGplIHByYXpuYScsXG4gICAgICAgICdzdi1TRSc6ICdWYXJ1a29yZ2VuIMOkciB0b20nLFxuICAgICAgICB0aDogJ+C4o+C4luC5gOC4guC5h+C4meC4p+C5iOC4suC4h+C5gOC4m+C4peC5iOC4sicsXG4gICAgICAgIHVrOiAn0JrQvtGI0LjQuiDQv9C+0YDQvtC20L3RltC5JyxcbiAgICAgICAgJ3poLUNOJzogJ+i0reeJqei9puaYr+epuueahCcsXG4gICAgICAgICd6aC1UVyc6ICfotK3nianovabmmK/nqbrnmoQnXG4gICAgfSxcbiAgICAnbGlua2VkLXByb2R1Y3RzLXRpdGxlJzoge1xuICAgICAgICAnZGUtREUnOiAnRGFzIGvDtm5udGUgZGlyIGF1Y2ggZ2VmYWxsZW4uLi4nLFxuICAgICAgICAnZW4tVVMnOiAnWW91IG1pZ2h0IGFsc28gbGlrZS4uLicsXG4gICAgICAgICdlcy1FUyc6ICdUYW1iacOpbiBwb2Ryw61hIGd1c3RhcnRlLi4uJyxcbiAgICAgICAgZnI6ICd2b3VzIHBvdXJyaWV6IGF1c3NpIGFpbWVyLi4uJyxcbiAgICAgICAgaXQ6ICdQb3RyZWJiZSBwaWFjZXJ0aSBhbmNoZS4uLicsXG4gICAgICAgIGphOiAn44GC44Gq44Gf44Gv44GK44Gd44KJ44GP44Gd44KM44KC5aW944GN44Gn44GX44KH44GGLi4uJyxcbiAgICAgICAgJ3JvLVJPJzogJ1MtYXIgcHV0ZWEgc2EtdGkgcGxhY2Egc2kuLi4nLFxuICAgICAgICBhcjogJ9mC2K8g2YrYudis2KjZgyDYp9mK2LbYpycsXG4gICAgICAgIGNhOiAncG90c2VyIHRhbWLDqSB0XFwnYWdyYWRhLi4uJyxcbiAgICAgICAgJ2NzLUNaJzogJ21vaGxvIGJ5IHNlIHbDoW0gbMOtYml0Li4uJyxcbiAgICAgICAgJ2RhLURLJzogJ0R1IGthbiBvZ3PDpSBsaWRlLi4uJyxcbiAgICAgICAgZWw6ICfOnM+Azr/Pgc61zq8gzrXPgM6vz4POt8+CIM69zrEgz4POsc+CIM6xz4HOrc+DzrXOuS4uLicsXG4gICAgICAgICdoaS1JTic6ICfgpLbgpL7gpK/gpKYg4KSk4KWB4KSu4KWN4KS54KWHIOCkr+CkuSDgpK3gpYAg4KSF4KSa4KWN4KSb4KS+IOCksuCkl+Clhy4uLicsXG4gICAgICAgICdrby1LUic6ICfri7nsi6DsnYAg65iQ7ZWcIOyii+yVhO2VoCDsiJjrj4Qg7J6I7Iq164uI64ukLi4uJyxcbiAgICAgICAgJ2xiLUxVJzogJ0RpciBrw6tubnQgb2NoIGfDpHJlbi4uLicsXG4gICAgICAgICdubC1OTCc6ICdNaXNzY2hpZW4gdmluZCBqZSBkaXQgb29rIGxldWsuLi4nLFxuICAgICAgICAncHQtUFQnOiAndm9jw6ogcG9kZSBnb3N0YXIgdGFtYsOpbS4uLicsXG4gICAgICAgICdydS1SVSc6ICfQktCw0Lwg0YLQsNC60LbQtSDQvNC+0LbQtdGCINC/0L7QvdGA0LDQstC40YLRjNGB0Y8uLi4nLFxuICAgICAgICAnc2wtU0knOiAnTW9yZGEgdmFtIGJvIHbFoWXEjSB0dWRpLi4uJyxcbiAgICAgICAgJ3N2LVNFJzogJ0R1IGthbnNrZSBvY2tzw6UgZ2lsbGFyLi4uJyxcbiAgICAgICAgdGg6ICfguITguLjguJPguK3guLLguIjguIrguK3guJouLi4nLFxuICAgICAgICB1azogJ9CS0LDQvCDRgtCw0LrQvtC2INC80L7QttC1INGB0L/QvtC00L7QsdCw0YLQuNGB0Y8uLi4nLFxuICAgICAgICAnemgtQ04nOiAn5L2g5Y+v6IO96L+Y5Zac5qyiLi4uJyxcbiAgICAgICAgJ3poLVRXJzogJ+S9oOWPr+iDvemChOWWnOatoS4uLidcbiAgICB9LFxuICAgIHZlcmlmaWVkOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJpZml6aWVydCcsXG4gICAgICAgICdlbi1VUyc6ICdWZXJpZmllZCcsXG4gICAgICAgICdlcy1FUyc6ICdWZXJpZmljYWRvJyxcbiAgICAgICAgZnI6ICdWw6lyaWZpw6knLFxuICAgICAgICBpdDogJ3ZlcmlmaWNhdG8nLFxuICAgICAgICBqYTogJ+eiuuiqjea4iOOBvycsXG4gICAgICAgICdyby1STyc6ICdWZXJpZmljYXQnLFxuICAgICAgICBhcjogJ9iq2YUg2KfZhNiq2K3ZgtmCJyxcbiAgICAgICAgY2E6ICdWZXJpZmljYXQnLFxuICAgICAgICAnY3MtQ1onOiAnT3bEm8WZZW5vJyxcbiAgICAgICAgJ2RhLURLJzogJ1ZlcmlmaWNlcmV0JyxcbiAgICAgICAgZWw6ICfOlc+AzrHOu863zrjOtc+FzrzOrc69zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KS44KSk4KWN4KSv4KS+4KSq4KS/4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+2ZleyduOuQqCcsXG4gICAgICAgICdsYi1MVSc6ICdWZXJpZml6w6lpZXJ0JyxcbiAgICAgICAgJ25sLU5MJzogJ0dldmVyaWZpZWVyZCcsXG4gICAgICAgICdwdC1QVCc6ICdWZXJpZmljYWRhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtCy0LXRgNC10L3QvicsXG4gICAgICAgICdzbC1TSSc6ICdQcmV2ZXJqZW5vJyxcbiAgICAgICAgJ3N2LVNFJzogJ1ZlcmlmaWVyYWQnLFxuICAgICAgICB0aDogJ+C4leC4o+C4p+C4iOC4quC4reC4muC5geC4peC5ieC4pycsXG4gICAgICAgIHVrOiAn0J/QtdGA0LXQstGW0YDQtdC90L4nLFxuICAgICAgICAnemgtQ04nOiAn5bey6aqM6K+BJyxcbiAgICAgICAgJ3poLVRXJzogJ+W3sumpl+itiSdcbiAgICB9LFxuICAgICdjb3Vwb24tb3B0aW9uJzoge1xuICAgICAgICAnZGUtREUnOiAnKyBFSU5FTiBHVVRTQ0hFSU4gQ09ERSBISU5aVUbDnEdFTicsXG4gICAgICAgICdlbi1VUyc6ICcrIEFERCBBIENPVVBPTiBDT0RFJyxcbiAgICAgICAgJ2VzLUVTJzogJysgQcORQURJUiBVTiBDw5NESUdPIERFIENVUMOTTicsXG4gICAgICAgIGZyOiAnKyBBSk9VVEVSIFVOIENPREUgQ09VUE9OJyxcbiAgICAgICAgaXQ6ICcrIEFHR0lVTkdJIFVOIENPRElDRSBDT1VQT04nLFxuICAgICAgICBqYTogJysg44Kv44O844Od44Oz44Kz44O844OJ44KS6L+95YqgJyxcbiAgICAgICAgJ3JvLVJPJzogJysgQUTEglVHQciaSSBVTiBDT0QgREUgQ1VQT04nLFxuICAgICAgICBhcjogJ9ij2LbZgSDYsdmF2LIg2KfZhNmC2LPZitmF2KknLFxuICAgICAgICBjYTogJ0FmZWdpdSB1biBjb2RpIGRlIGN1cMOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ1DFmWlkZWp0ZSBrw7NkIGt1cMOzbnUnLFxuICAgICAgICAnZGEtREsnOiAnVGlsZsO4aiBlbiBrdXBvbmtvZGUnLFxuICAgICAgICBlbDogJ86gz4HOv8+DzrjOrc+Dz4TOtSDOrc69zrHOvSDOus+JzrTOuc66z4wgzrrOv8+Fz4DOv869zrnOv8+NJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleClguCkquCkqCDgpJXgpYvgpKEg4KSc4KWL4KSh4KS84KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y/oO2PsCDsvZTrk5wg7LaU6rCAJyxcbiAgICAgICAgJ2xiLUxVJzogJ0bDvMO8Z3QgZSBDb3Vwb24gQ29kZSBkZXJiw6RpJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZvZWcgZWVuIGNvdXBvbmNvZGUgdG9lJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FkaWNpb25hciB1bSBjw7NkaWdvIGRlIGN1cG9tJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CU0L7QsdCw0LLRjNGC0LUg0LrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdEb2RhanRlIGtvZG8ga3Vwb25hJyxcbiAgICAgICAgJ3N2LVNFJzogJ0zDpGdnIHRpbGwgZW4ga3Vwb25na29kJyxcbiAgICAgICAgdGg6ICfguYDguJ7guLTguYjguKHguKPguKvguLHguKrguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9CU0L7QtNCw0LnRgtC1INC60L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5re75Yqg5LyY5oOg5Yi45Luj56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+a3u+WKoOWEquaDoOWIuOS7o+eivCdcbiAgICB9LFxuICAgICdlcnJvci1vY2N1cnJlZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0VudHNjaHVsZGlndW5nLCBldHdhcyBpc3Qgc2NoaWVmIGdlbGF1ZmVuLiBCaXR0ZSBha3R1YWxpc2llcmVuIFNpZSBkaWUgU2VpdGUgdW5kIHZlcnN1Y2hlbiBTaWUgZXMgZXJuZXV0LicsXG4gICAgICAgICdlbi1VUyc6ICdTb3JyeSwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSByZWZyZXNoIHRoZSBwYWdlIGFuZCB0cnkgYWdhaW4uJyxcbiAgICAgICAgJ2VzLUVTJzogJ1BlcmTDs24sIGFsZ28gc2FsacOzIG1hbC4gQWN0dWFsaWNlIGxhIHDDoWdpbmEgeSB2dWVsdmEgYSBpbnRlbnRhcmxvLicsXG4gICAgICAgIGZyOiAnRMOpc29sw6ksIHF1ZWxxdWUgY2hvc2Ugc1xcJ2VzdCBtYWwgcGFzc8OpLiBWZXVpbGxleiBhY3R1YWxpc2VyIGxhIHBhZ2UgZXQgcsOpZXNzYXllci4nLFxuICAgICAgICBpdDogJ1NjdXNhLCBxdWFsY29zYSDDqCBhbmRhdG8gc3RvcnRvLiBQZXJmYXZvcmUgcmljYXJpY2EgbGEgcGFnaW5hIGUgcmlwcm92YS4nLFxuICAgICAgICAncm8tUk8nOiAnU2N1emUsIGNldmEgYSBtZXJzIGdyZciZaXQuIEFjdHVhbGl6YcibaSBwYWdpbmEgyJlpIMOubmNlcmNhyJtpIGRpbiBub3UuJyxcbiAgICAgICAgYXI6ICfYudiw2LHYp9iMINmH2YbYp9mDINiu2LfYoyDZhdinLiDZitix2KzZiSDYqtit2K/ZitirINin2YTYtdmB2K3YqSDZiNit2KfZiNmEINmF2LHYqSDYo9iu2LHZiS4nLFxuICAgICAgICBjYTogJ0hvIHNlbnRpbSwgYWxndW5hIGNvc2EgaGEgYW5hdCBtYWxhbWVudC4gQWN0dWFsaXR6ZXUgbGEgcMOgZ2luYSBpIHRvcm5ldS1obyBhIHByb3Zhci4nLFxuICAgICAgICAnY3MtQ1onOiAnUHJvbWnFiCwgbsSbY28gc2UgcG9rYXppbG8uIE9ibm92dGUgc3Ryw6Fua3UgYSB6a3VzdGUgdG8gem5vdnUuJyxcbiAgICAgICAgJ2RhLURLJzogJ1VuZHNreWxkLCBub2dldCBnaWsgZ2FsdC4gT3BkYXRlciBzaWRlbiwgb2cgcHLDuHYgaWdlbi4nLFxuICAgICAgICBlbDogJ86jz4XOs869z47OvM63LCDOus6sz4TOuSDPgM6uzrPOtSDPg8+Ez4HOsc6yzqwuIM6Rzr3Osc69zrXPjs+Dz4TOtSDPhM63IM+DzrXOu86vzrTOsSDOus6xzrkgzrTOv866zrnOvM6sz4PPhM61IM6+zrHOvc6sLicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpY3gpLfgpK7gpL4g4KSV4KSw4KWH4KSCLCDgpJXgpYHgpJsg4KSX4KSy4KSkIOCkueCliyDgpJfgpK/gpL7gpaQg4KSq4KWD4KS34KWN4KSgIOCkleCliyDgpLDgpYDgpKvgpY3gpLDgpYfgpLYg4KSV4KSw4KWH4KSCIOCklOCksCDgpKrgpYHgpKg6IOCkquCljeCksOCkr+CkvuCkuCDgpJXgpLDgpYfgpILgpaQnLFxuICAgICAgICAna28tS1InOiAn7KOE7Iah7ZWp64uI64ukLiDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDtjpjsnbTsp4Drpbwg7IOI66Gc6rOg7Lmo7ZWY6rOgIOuLpOyLnCDsi5zrj4TtlZjsi63si5zsmKQuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VudHNjaMOrbGxlZ3QsIGVwcGVzIGFzcyBmYWxzY2ggZ2FhbmcuIEVyZnLDq3NjaHQgdy5lLmcuIGRcXCdTw6RpdCBhIHByb2LDqWllcnQgbmFjaCBlbmcgS8OpaWVyLicsXG4gICAgICAgICdubC1OTCc6ICdTb3JyeSwgZXIgZ2luZyBpZXRzIG1pcy4gVmVydmVycyBkZSBwYWdpbmEgZW4gcHJvYmVlciBoZXQgb3BuaWV1dy4nLFxuICAgICAgICAncHQtUFQnOiAnRGVzY3VscGUsIGFsZ28gZGV1IGVycmFkby4gQXR1YWxpemUgYSBww6FnaW5hIGUgdGVudGUgbm92YW1lbnRlLicsXG4gICAgICAgICdydS1SVSc6ICfQmNC30LLQuNC90LjRgtC1LCDRh9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQntCx0L3QvtCy0LjRgtC1INGB0YLRgNCw0L3QuNGG0YMg0Lgg0L/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQty4nLFxuICAgICAgICAnc2wtU0knOiAnT3Byb3N0aXRlLCBuZWthaiBqZSDFoWxvIG5hcm9iZS4gT3N2ZcW+aXRlIHN0cmFuIGluIHBvc2t1c2l0ZSB6bm92YS4nLFxuICAgICAgICAnc3YtU0UnOiAnRsO2cmzDpXQsIG7DpWdvdCBnaWNrIGZlbC4gVXBwZGF0ZXJhIHNpZGFuIG9jaCBmw7Zyc8O2ayBpZ2VuLicsXG4gICAgICAgIHRoOiAn4LiC4Lit4LmC4LiX4Lip4Lih4Li14Lia4Liy4LiH4Lit4Lii4LmI4Liy4LiH4Lic4Li04LiU4Lie4Lil4Liy4LiULiDguYLguJvguKPguJTguKPguLXguYDguJ/guKPguIrguKvguJnguYnguLLguYHguKXguYnguKfguKXguK3guIfguK3guLXguIHguITguKPguLHguYnguIcnLFxuICAgICAgICB1azogJ9CS0LjQsdCw0YfRgtC1LCDRidC+0YHRjCDQv9GW0YjQu9C+INC90LUg0YLQsNC6LiDQntC90L7QstGW0YLRjCDRgdGC0L7RgNGW0L3QutGDINGC0LAg0L/QvtCy0YLQvtGA0ZbRgtGMINGB0L/RgNC+0LHRgy4nLFxuICAgICAgICAnemgtQ04nOiAn5oqx5q2J77yM5Ye65LqG5LiA5Lqb6Zeu6aKY44CCIOivt+WIt+aWsOmhtemdouW5tumHjeivleOAgicsXG4gICAgICAgICd6aC1UVyc6ICfmirHmrYnvvIzlh7rkuobkuIDkupvllY/poYzjgIIg6KuL5Yi35paw6aCB6Z2i5Lim6YeN6Kmm44CCJ1xuICAgIH0sXG4gICAgJ2dpZnQtb3B0aW9uJzoge1xuICAgICAgICAnZGUtREUnOiAnKyBHRVNDSEVOS0tBUlRFL0dFU0NIRU5LLUtSRURJVCBFSU5Mw5ZTRU4nLFxuICAgICAgICAnZW4tVVMnOiAnKyBSRURFRU0gR0lGVCBDQVJEL1NUT1JFIENSRURJVCcsXG4gICAgICAgICdlcy1FUyc6ICcrIENBTkpFQVIgVEFSSkVUQSBERSBSRUdBTE8vQ1LDiURJVE8gREUgVElFTkRBJyxcbiAgICAgICAgZnI6ICcrIMOJQ0hBTkdFUiBMQSBDQVJURS1DQURFQVUvTEUgQ1LDiURJVCBEVSBNQUdBU0lOJyxcbiAgICAgICAgaXQ6ICcrIFVUSUxJWlpBIENBUlRBIFJFR0FMTy9DUkVESVRPIE5FR09aSU8nLFxuICAgICAgICBqYTogJysg44Ku44OV44OI44Kr44O844OJL+OCueODiOOCouOCr+ODrOOCuOODg+ODiOOCkuWIqeeUqOOBmeOCiycsXG4gICAgICAgICdyby1STyc6ICcrIFLEgnNjdW1wxINyYcibaSBjYXJkdWwvY2Fkb3VsIGRlIGNyZWRpdCBjYWRvdScsXG4gICAgICAgIGFyOiAn2KfYs9iq2LHYr9in2K8g2KjYt9in2YLYqSDYp9mE2YfYr9in2YrYpyAvINix2LXZitivINin2YTZhdiq2KzYsScsXG4gICAgICAgIGNhOiAnQmVzY2FudmlhIGVsIGNyw6hkaXQgZGUgbGEgdGFyZ2V0YSByZWdhbCBvIGRlIGxhIGJvdGlnYScsXG4gICAgICAgICdjcy1DWic6ICdVcGxhdG7Em3RlIGTDoXJrb3ZvdSBrYXJ0dS9rcmVkaXQgb2JjaG9kdScsXG4gICAgICAgICdkYS1ESyc6ICdJbmRsw7hzIGdhdmVrb3J0L2J1dGlrc2tyZWRpdCcsXG4gICAgICAgIGVsOiAnzpXOvs6xz4HOs8+Fz4HPjs+Dz4TOtSDPgM65z4PPhM+Jz4TOuc66zq4gzrrOrM+Bz4TOsSDOtM+Oz4HOv8+FL866zrHPhM6sz4PPhM63zrzOsScsXG4gICAgICAgICdoaS1JTic6ICfgpIngpKrgpLngpL7gpLAg4KSV4KS+4KSw4KWN4KShL+CkuOCljeCkn+Cli+CksCDgpJXgpY3gpLDgpYfgpKHgpL/gpJ8g4KSw4KS/4KSh4KWA4KSuIOCkleCksOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfquLDtlITtirgg7Lm065OcL+yKpO2GoOyWtCDtgazroIjrlKcg7IKs7JqpJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VybMOpaXMgS2FkZG9rYWFydC9HZXNjaMOkZnRza3JlZGl0dCcsXG4gICAgICAgICdubC1OTCc6ICdDYWRlYXVrYWFydC93aW5rZWx0ZWdvZWQgaW53aXNzZWxlbicsXG4gICAgICAgICdwdC1QVCc6ICdSZXNnYXRhciBjYXJ0w6NvLXByZXNlbnRlIC8gY3LDqWRpdG8gZGEgbG9qYScsXG4gICAgICAgICdydS1SVSc6ICfQn9C+0LPQsNGB0LjRgtGMINC/0L7QtNCw0YDQvtGH0L3Rg9GOINC60LDRgNGC0YMgLyDQutGA0LXQtNC40YIg0LzQsNCz0LDQt9C40L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdVbm92xI1pdGUgZGFyaWxubyBrYXJ0aWNvL2RvYnJvaW1ldGplIHYgdHJnb3ZpbmknLFxuICAgICAgICAnc3YtU0UnOiAnTMO2cyBpbiBwcmVzZW50a29ydC9idXRpa3NrcmVkaXQnLFxuICAgICAgICB0aDogJ+C5geC4peC4geC4muC4seC4leC4o+C4guC4reC4h+C4guC4p+C4seC4jS/guYDguITguKPguJTguLTguJXguKPguYnguLLguJnguITguYnguLInLFxuICAgICAgICB1azogJ9CQ0LrRgtC40LLRg9C50YLQtSDQv9C+0LTQsNGA0YPQvdC60L7QstGDINC60LDRgNGC0LrRgy/QutGA0LXQtNC40YIg0YMg0LzQsNCz0LDQt9C40L3RlicsXG4gICAgICAgICd6aC1DTic6ICflhZHmjaLnpLzlk4HljaEv5ZWG5bqX5L+h55SoJyxcbiAgICAgICAgJ3poLVRXJzogJ+WFjOaPm+emruWTgeWNoS/llYblupfkv6HnlKgnXG4gICAgfSxcbiAgICAnc2VuZC10byc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1NlbmRlbiBhbicsXG4gICAgICAgICdlbi1VUyc6ICdTZW5kIHRvJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VudmlhciBhJyxcbiAgICAgICAgZnI6ICdFbnZveWVyIMOgJyxcbiAgICAgICAgaXQ6ICdJbnZpYXJlIGEnLFxuICAgICAgICBqYTogJ+mAgeS/oeWFiCcsXG4gICAgICAgICdyby1STyc6ICdUcmltaXRlIGNhdHJlJyxcbiAgICAgICAgYXI6ICfYp9ix2LPZhCDYpdmE2YknLFxuICAgICAgICBjYTogJ0VudmlhIGEnLFxuICAgICAgICAnY3MtQ1onOiAnUG9zbGF0IGtvbXUnLFxuICAgICAgICAnZGEtREsnOiAnU2VuZCB0aWwnLFxuICAgICAgICBlbDogJ86jz4TOrc67zr3PiSDPg861JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkreClh+CknOCkqOCkvicsXG4gICAgICAgICdrby1LUic6ICfrs7TrgrTquLAnLFxuICAgICAgICAnbGItTFUnOiAnU2Now6lja2VuJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZlcnplbmRlbiBuYWFyJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VudmlhciBwYXJhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ce0YLQv9GA0LDQstC40YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICdQb8WhbGppJyxcbiAgICAgICAgJ3N2LVNFJzogJ1NraWNrYSB0aWxsJyxcbiAgICAgICAgdGg6ICfguKrguYjguIfguJbguLbguIcnLFxuICAgICAgICB1azogJ9CS0ZbQtNC/0YDQsNCy0LjRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+WPkee7mScsXG4gICAgICAgICd6aC1UVyc6ICfnmbzntaYnXG4gICAgfSxcbiAgICAnbXktb3JkZXInOiB7XG4gICAgICAgICdkZS1ERSc6ICdNZWluZSBCZXN0ZWxsdW5nJyxcbiAgICAgICAgJ2VuLVVTJzogJ015IG9yZGVyJyxcbiAgICAgICAgJ2VzLUVTJzogJ01pIHBlZGlkbycsXG4gICAgICAgIGZyOiAnTWEgY29tbWFuZGUnLFxuICAgICAgICBpdDogJ0lsIG1pbyBvcmRpbmUnLFxuICAgICAgICBqYTogJ+azqOaWhycsXG4gICAgICAgICdyby1STyc6ICdDb21hbmRhIG1lYScsXG4gICAgICAgIGFyOiAn2LfZhNio2YonLFxuICAgICAgICBjYTogJ0VsIG1ldSBvcmRyZScsXG4gICAgICAgICdjcy1DWic6ICdNb2plIG9iamVkbsOhdmthJyxcbiAgICAgICAgJ2RhLURLJzogJ01pbiBiZXN0aWxsaW5nJyxcbiAgICAgICAgZWw6ICfOlyDPgM6xz4HOsc6zzrPOtc67zq/OsSDOvM6/z4UnLFxuICAgICAgICAnaGktSU4nOiAn4KSu4KWH4KSw4KWHIOCkhuCkpuClh+CkticsXG4gICAgICAgICdrby1LUic6ICfrgrQg7KO866y4JyxcbiAgICAgICAgJ2xiLUxVJzogJ01lbmcgQmVzdGVsbHVuZycsXG4gICAgICAgICdubC1OTCc6ICdNaWpuIGJlc3RlbGxpbmcnLFxuICAgICAgICAncHQtUFQnOiAnTWV1IHBlZGlkbycsXG4gICAgICAgICdydS1SVSc6ICfQnNC+0Lkg0LfQsNC60LDQtycsXG4gICAgICAgICdzbC1TSSc6ICdNb2ogdWtheicsXG4gICAgICAgICdzdi1TRSc6ICdNaW4gb3JkZXInLFxuICAgICAgICB0aDogJ+C4hOC4s+C4quC4seC5iOC4h+C4guC4reC4h+C4ieC4seC4mScsXG4gICAgICAgIHVrOiAn0JzQvtGUINC30LDQvNC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+aIkeeahOiuouWNlScsXG4gICAgICAgICd6aC1UVyc6ICfmiJHnmoToqILllq4nXG4gICAgfSxcbiAgICAncmVhZHktdG8tY2hlY2stb3V0Jzoge1xuICAgICAgICAnZGUtREUnOiAnQmVyZWl0IHp1bSBBdXNjaGVja2VuPycsXG4gICAgICAgICdlbi1VUyc6ICdSZWFkeSB0byBjaGVjayBvdXQ/JyxcbiAgICAgICAgJ2VzLUVTJzogJ8K/TGlzdG8gcGFyYSBzYWxpcj8nLFxuICAgICAgICBmcjogJ1Byw6p0IMOgIHbDqXJpZmllciA/JyxcbiAgICAgICAgaXQ6ICdQcm9udG8gcGVyIGlsIGNoZWNrLW91dD8nLFxuICAgICAgICBqYTogJ+aUr+aJleOBhOOCkuOBmeOCi+a6luWCmeOBr+OBp+OBjeOBvuOBl+OBn+OBiz8nLFxuICAgICAgICAncm8tUk8nOiAnU3VudGXIm2kgZ2F0YSBzxIMgdml6aXRhyJtpPycsXG4gICAgICAgIGFyOiAn2YfZhCDYo9mG2Kog2KzYp9mH2LIg2YTZhNiq2LPYrNmK2YTYnycsXG4gICAgICAgIGNhOiAnQSBwdW50IHBlciBmZXIgZWwgY2hlY2stb3V0PycsXG4gICAgICAgICdjcy1DWic6ICdKc3RlIHDFmWlwcmF2ZW5pIHNlIHBvZMOtdmF0PycsXG4gICAgICAgICdkYS1ESyc6ICdLbGFyIHRpbCBhdCB0amVra2UgdWQ/JyxcbiAgICAgICAgZWw6ICfOlc6vz4PPhM61IM6tz4TOv865zrzOv865IM6zzrnOsSBjaGVjayBvdXQ7JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkmuClh+CklSDgpIbgpIngpJ8g4KSV4KSw4KSo4KWHIOCkleClhyDgpLLgpL/gpI8g4KSk4KWI4KSv4KS+4KSwIOCkueCliOCkgj8nLFxuICAgICAgICAna28tS1InOiAn7LK07YGs7JWE7JuD7ZWgIOykgOu5hOqwgCDrkJjshajrgpjsmpQ/JyxcbiAgICAgICAgJ2xiLUxVJzogJ1ByZXR0IGZpciB6ZSBjaGVja2VuPycsXG4gICAgICAgICdubC1OTCc6ICdLbGFhciBvbSB1aXQgdGUgY2hlY2tlbj8nLFxuICAgICAgICAncHQtUFQnOiAnUHJvbnRvIHBhcmEgZmluYWxpemFyIGEgY29tcHJhPycsXG4gICAgICAgICdydS1SVSc6ICfQk9C+0YLQvtCy0Ysg0L/RgNC+0LLQtdGA0LjRgtGMPycsXG4gICAgICAgICdzbC1TSSc6ICdTdGUgcHJpcHJhdmxqZW5pIG5hIG9kamF2bz8nLFxuICAgICAgICAnc3YtU0UnOiAnS2xhciBhdHQgY2hlY2thIHV0PycsXG4gICAgICAgIHRoOiAn4Lie4Lij4LmJ4Lit4Lih4LiX4Li14LmI4LiI4Liw4LmA4LiK4LmH4LiE4LmA4Lit4Liy4LiX4LmMPycsXG4gICAgICAgIHVrOiAn0JPQvtGC0L7QstGWINC/0LXRgNC10LLRltGA0LjRgtC4PycsXG4gICAgICAgICd6aC1DTic6ICflh4blpIfpgIDmiL/kuoblkJfvvJ8nLFxuICAgICAgICAnemgtVFcnOiAn5rqW5YKZ6YCA5oi/5LqG5ZeO77yfJ1xuICAgIH0sXG4gICAgaW5mbzoge1xuICAgICAgICAnZGUtREUnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICAnZW4tVVMnOiAnSW5mbycsXG4gICAgICAgICdlcy1FUyc6ICdJbmZvcm1hY2nDs24nLFxuICAgICAgICBmcjogJ0luZm9ybWF0aW9uJyxcbiAgICAgICAgaXQ6ICdJbmZvcm1hemlvbmknLFxuICAgICAgICBqYTogJ+aDheWgsScsXG4gICAgICAgICdyby1STyc6ICdJbmZvcm1hyJtpZScsXG4gICAgICAgIGFyOiAn2YXYudmE2YjZhdipJyxcbiAgICAgICAgY2E6ICdJbmZvcm1hY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdJbmZvcm1hY2UnLFxuICAgICAgICAnZGEtREsnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICBlbDogJ86gzrvOt8+Bzr/Phs6/z4HOr861z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSc4KS+4KSo4KSV4KS+4KSw4KWAJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ygleuztCcsXG4gICAgICAgICdsYi1MVSc6ICdJbmZvcm1hdGlvdW5lbicsXG4gICAgICAgICdubC1OTCc6ICdJbmZvcm1hdGllJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VtIGZvcm1hw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0JjQvdGE0L7RgNC80LDRhtC40Y8nLFxuICAgICAgICAnc2wtU0knOiAnSW5mb3JtYWNpamUnLFxuICAgICAgICAnc3YtU0UnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICB0aDogJ+C4guC5ieC4reC4oeC4ueC4pScsXG4gICAgICAgIHVrOiAn0IbQvdGE0L7RgNC80LDRhtGW0Y8nLFxuICAgICAgICAnemgtQ04nOiAn5L+h5oGvJyxcbiAgICAgICAgJ3poLVRXJzogJ+S/oeaBrydcbiAgICB9LFxuICAgIHBheW1lbnQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ1phaGx1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnUGF5bWVudCcsXG4gICAgICAgICdlcy1FUyc6ICdQYWdvJyxcbiAgICAgICAgZnI6ICdQYWllbWVudCcsXG4gICAgICAgIGl0OiAnUGFnYW1lbnRvJyxcbiAgICAgICAgamE6ICfmlK/miZXjgYQnLFxuICAgICAgICAncm8tUk8nOiAnUGxhdMSDJyxcbiAgICAgICAgYXI6ICfZgtiz2LcnLFxuICAgICAgICBjYTogJ1BhZ2FtZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ1pwxa9zb2IgcGxhdGJ5JyxcbiAgICAgICAgJ2RhLURLJzogJ0JldGFsaW5nJyxcbiAgICAgICAgZWw6ICfOoM67zrfPgc+JzrzOricsXG4gICAgICAgICdoaS1JTic6ICfgpK3gpYHgpJfgpKTgpL7gpKgnLFxuICAgICAgICAna28tS1InOiAn7KeA67aIJyxcbiAgICAgICAgJ2xiLUxVJzogJ0JlenVlbGVuJyxcbiAgICAgICAgJ25sLU5MJzogJ0JldGFsaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1BhZ2FtZW50bycsXG4gICAgICAgICdydS1SVSc6ICfQntC/0LvQsNGC0LAnLFxuICAgICAgICAnc2wtU0knOiAnUGxhxI1pbG8nLFxuICAgICAgICAnc3YtU0UnOiAnQmV0YWxuaW5nJyxcbiAgICAgICAgdGg6ICfguIHguLLguKPguIrguLPguKPguLDguYDguIfguLTguJknLFxuICAgICAgICB1azogJ9Ce0L/Qu9Cw0YLQsCcsXG4gICAgICAgICd6aC1DTic6ICfmlK/ku5gnLFxuICAgICAgICAnemgtVFcnOiAn5pSv5LuYJ1xuICAgIH0sXG4gICAgcGVyc29uYWw6IHtcbiAgICAgICAgJ2RlLURFJzogJ1BlcnPDtm5saWNoJyxcbiAgICAgICAgJ2VuLVVTJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgZnI6ICdDb29yZG9ubsOpZXMnLFxuICAgICAgICBpdDogJ1BlcnNvbmFsZScsXG4gICAgICAgIGphOiAn5YCL5Lq6JyxcbiAgICAgICAgJ3JvLVJPJzogJ1BlcnNvbmFsJyxcbiAgICAgICAgYXI6ICfYtNiu2LXZiicsXG4gICAgICAgIGNhOiAnUGVyc29uYWwnLFxuICAgICAgICAnY3MtQ1onOiAnT3NvYm7DrScsXG4gICAgICAgICdkYS1ESyc6ICdQZXJzb25saWcnLFxuICAgICAgICBlbDogJ86gz4HOv8+Dz4nPgM65zrrPjM+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkqOCkv+CknOClgCcsXG4gICAgICAgICdrby1LUic6ICfqsJzsnbjsnZgnLFxuICAgICAgICAnbGItTFUnOiAnUGVyc8OpaW5sZWNoJyxcbiAgICAgICAgJ25sLU5MJzogJ3BlcnNvb25saWprJyxcbiAgICAgICAgJ3B0LVBUJzogJ1Blc3NvYWwnLFxuICAgICAgICAncnUtUlUnOiAn0JvQuNGH0L3QvtC1JyxcbiAgICAgICAgJ3NsLVNJJzogJ09zZWJubycsXG4gICAgICAgICdzdi1TRSc6ICdQZXJzb25saWcnLFxuICAgICAgICB0aDogJ+C4quC5iOC4p+C4meC4leC4seC4pycsXG4gICAgICAgIHVrOiAn0J7RgdC+0LHQuNGB0YLRlicsXG4gICAgICAgICd6aC1DTic6ICfkuKrkurrnmoQnLFxuICAgICAgICAnemgtVFcnOiAn5YCL5Lq655qEJ1xuICAgIH0sXG4gICAgc2hpcHBpbmc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1ZlcnNhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnU2hpcHBpbmcnLFxuICAgICAgICAnZXMtRVMnOiAnRW52aW8nLFxuICAgICAgICBmcjogJ0xpdnJhaXNvbicsXG4gICAgICAgIGl0OiAnU3BlZGl6aW9uZScsXG4gICAgICAgIGphOiAn55m66YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0xpdnJhcmUnLFxuICAgICAgICBhcjogJ9i02K3ZhicsXG4gICAgICAgIGNhOiAnRW52aWFtZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ0xvZG7DrSBkb3ByYXZhJyxcbiAgICAgICAgJ2RhLURLJzogJ0ZvcnNlbmRlbHNlJyxcbiAgICAgICAgZWw6ICfOkc+Azr/Pg8+Ezr/Ou86uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CktuCkv+CkquCkv+CkguCklycsXG4gICAgICAgICdrby1LUic6ICfrsLDshqEnLFxuICAgICAgICAnbGItTFUnOiAnTGl3d2VydW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ1ZlcnplbmRpbmcnLFxuICAgICAgICAncHQtUFQnOiAnRW52aW8nLFxuICAgICAgICAncnUtUlUnOiAn0J/QtdGA0LXQstC+0LfQutC4JyxcbiAgICAgICAgJ3NsLVNJJzogJ0Rvc3RhdmEnLFxuICAgICAgICAnc3YtU0UnOiAnRnJha3QnLFxuICAgICAgICB0aDogJ+C4geC4suC4o+C4quC5iOC4h+C4quC4tOC4meC4hOC5ieC4sicsXG4gICAgICAgIHVrOiAn0JTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfoiLnov5AnLFxuICAgICAgICAnemgtVFcnOiAn6Ii56YGLJ1xuICAgIH0sXG4gICAgYmlsbGluZzoge1xuICAgICAgICAnZGUtREUnOiAnUmVjaG51bmdzYWRyZXNzZScsXG4gICAgICAgICdlbi1VUyc6ICdCaWxsaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ0RpcmVjY2nDs24gZGUgZmFjdHVyYWNpw7NuJyxcbiAgICAgICAgZnI6ICdBZHJlc3NlIGRlIGZhY3R1cmF0aW9uJyxcbiAgICAgICAgaXQ6ICdJbmRpcml6em8gZGkgZmF0dHVyYXppb25lJyxcbiAgICAgICAgamE6ICfoq4vmsYInLFxuICAgICAgICAncm8tUk8nOiAnRmFjdHVyYXJlJyxcbiAgICAgICAgYXI6ICfYp9mE2YHZiNin2KrZitixJyxcbiAgICAgICAgY2E6ICdGYWN0dXJhY2nDsycsXG4gICAgICAgICdjcy1DWic6ICdGYWt0dXJhY2UnLFxuICAgICAgICAnZGEtREsnOiAnRmFrdHVyZXJpbmcnLFxuICAgICAgICBlbDogJ86nz4HOrc+Jz4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpKzgpL/gpLLgpL/gpILgpJcnLFxuICAgICAgICAna28tS1InOiAn7LKt6rWsJyxcbiAgICAgICAgJ2xiLUxVJzogJ1JlY2hudW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ0ZhY3R1cmVyaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0NvYnJhbsOnYScsXG4gICAgICAgICdydS1SVSc6ICfQkdC40LvQu9C40L3QsycsXG4gICAgICAgICdzbC1TSSc6ICdPYnJhxI11bmF2YW5qZScsXG4gICAgICAgICdzdi1TRSc6ICdGYWt0dXJlcmluZycsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LmA4Lij4Li14Lii4LiB4LmA4LiB4LmH4Lia4LmA4LiH4Li04LiZJyxcbiAgICAgICAgdWs6ICfQktC40YHRgtCw0LLQu9C10L3QvdGPINGA0LDRhdGD0L3QutGW0LInLFxuICAgICAgICAnemgtQ04nOiAn6K6h6LS5JyxcbiAgICAgICAgJ3poLVRXJzogJ+ioiOiyuydcbiAgICB9LFxuICAgIGNvbnRpbnVlOiB7XG4gICAgICAgICdkZS1ERSc6ICdXZWl0ZXInLFxuICAgICAgICAnZW4tVVMnOiAnQ29udGludWUnLFxuICAgICAgICAnZXMtRVMnOiAnQ29udGludWFyJyxcbiAgICAgICAgZnI6ICdDb250aW51ZXonLFxuICAgICAgICBpdDogJ0NvbnRpbnVhJyxcbiAgICAgICAgamE6ICfntprjgY3jgbgnLFxuICAgICAgICAncm8tUk8nOiAnQ29udGludWEnLFxuICAgICAgICBhcjogJ9mK2YPZhdmEJyxcbiAgICAgICAgY2E6ICdDb250aW51YScsXG4gICAgICAgICdjcy1DWic6ICdQb2tyYcSNb3ZhdCcsXG4gICAgICAgICdkYS1ESyc6ICdCbGl2ZSB2ZWQnLFxuICAgICAgICBlbDogJ86dzrEgz4PPhc69zrXPh86vz4POtc65JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CknOCkvuCksOClgCDgpLDgpJbgpKjgpL4nLFxuICAgICAgICAna28tS1InOiAn6rOE7IaN7ZWY64ukJyxcbiAgICAgICAgJ2xiLUxVJzogJ0Z1ZXJ0IHdlaWRlcicsXG4gICAgICAgICdubC1OTCc6ICdEb29yZ2FhbiBtZXQnLFxuICAgICAgICAncHQtUFQnOiAnUHJvc3NlZ3VpcicsXG4gICAgICAgICdydS1SVSc6ICfQn9GA0L7QtNC+0LvQttCw0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICdOYWRhbGp1aicsXG4gICAgICAgICdzdi1TRSc6ICdGb3J0c8OkdHRhJyxcbiAgICAgICAgdGg6ICfguJTguLPguYDguJnguLTguJnguIHguLLguKPguJXguYjguK0nLFxuICAgICAgICB1azogJ9Cf0YDQvtC00L7QstC20LjRgtC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+e7p+e7rScsXG4gICAgICAgICd6aC1UVyc6ICfnubznuownXG4gICAgfSxcbiAgICAnc2VjdXJlLW5vdGljZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0dlc2ljaGVydCBkdXJjaCAnLFxuICAgICAgICAnZW4tVVMnOiAnU2VjdXJlZCBieScsXG4gICAgICAgICdlcy1FUyc6ICdQcm90ZWdpZG8gcG9yJyxcbiAgICAgICAgZnI6ICdTw6ljdXJpc8OpIHBhcicsXG4gICAgICAgIGl0OiAnUHJvdGV0dG8gZGEnLFxuICAgICAgICBqYTogJ+S/neitt+OBleOCjOOBpuOBhOOBvuOBmScsXG4gICAgICAgICdyby1STyc6ICdHYXJhbnRhdCBkZScsXG4gICAgICAgIGFyOiAn2KjYttmF2KfZhicsXG4gICAgICAgIGNhOiAnR2FyYW50aXQgcGVyJyxcbiAgICAgICAgJ2NzLUNaJzogJ1phamnFoXTEm25vJyxcbiAgICAgICAgJ2RhLURLJzogJ1Npa3JldCBhZicsXG4gICAgICAgIGVsOiAnzpXOvs6xz4PPhs6xzrvOr862zrXPhM6xzrkgzrHPgM+MJyxcbiAgICAgICAgJ2hpLUlOJzogJ+Ckh+CkuOCkleClhyDgpJzgpLDgpL/gpI8g4KS44KWB4KSw4KSV4KWN4KS34KS/4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uztOyViCcsXG4gICAgICAgICdsYi1MVSc6ICdHZXPDqWNoZXJ0IHZ1bicsXG4gICAgICAgICdubC1OTCc6ICdCZXZlaWxpZ2QgZG9vcicsXG4gICAgICAgICdwdC1QVCc6ICdBc3NlZ3VyYWRvIHBvcicsXG4gICAgICAgICdydS1SVSc6ICfQntCx0LXRgdC/0LXRh9C10L3QvicsXG4gICAgICAgICdzbC1TSSc6ICdaYXZhcm92YW5vIHMnLFxuICAgICAgICAnc3YtU0UnOiAnU8Oka3JhZCBhdicsXG4gICAgICAgIHRoOiAn4Lib4Lil4Lit4LiU4Lig4Lix4Lii4LmC4LiU4LiiJyxcbiAgICAgICAgdWs6ICfQl9Cw0LHQtdC30L/QtdGH0YPRlNGC0YzRgdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+aLheS/neS6uicsXG4gICAgICAgICd6aC1UVyc6ICfmk5Tkv53kuronXG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICAgICdkZS1ERSc6ICdLYXNzZSB2ZXJsYXNzZW4nLFxuICAgICAgICAnZW4tVVMnOiAnRXhpdCBDaGVja291dCcsXG4gICAgICAgICdlcy1FUyc6ICdTYWxpciBkZSBsYSBjYWphJyxcbiAgICAgICAgZnI6ICdRdWl0dGVyJyxcbiAgICAgICAgaXQ6ICdFc2NpIGRhbCBjaGVja291dCcsXG4gICAgICAgIGphOiAn5pSv5omV44GE44KS57WC5LqGJyxcbiAgICAgICAgJ3JvLVJPJzogJ8OObmFwb2kgbGEgcGFnaW5hIHByb2R1c3VsdWknLFxuICAgICAgICBhcjogJ9in2YTYrtix2YjYrCDZhdmGINin2YTYrtix2YjYrCcsXG4gICAgICAgIGNhOiAnU3VydCBkZSBHb29nbGUgQ2hlY2tvdXQnLFxuICAgICAgICAnY3MtQ1onOiAnVWtvbsSNaXQgcG9rbGFkbnUnLFxuICAgICAgICAnZGEtREsnOiAnQWZzbHV0IENoZWNrb3V0JyxcbiAgICAgICAgZWw6ICfOiM6+zr/OtM6/z4IgzrHPgM+MIM+Ezr8gz4TOsc68zrXOr86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkmuClh+CkleCkhuCkieCknyDgpLjgpYcg4KSs4KS+4KS54KSwIOCkqOCkv+CkleCksuClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfssrTtgazslYTsm4Mg7KKF66OMJyxcbiAgICAgICAgJ2xiLUxVJzogJ0V4aXQgQ2hlY2tvdXQnLFxuICAgICAgICAnbmwtTkwnOiAnQWZyZWtlbmVuIGFmc2x1aXRlbicsXG4gICAgICAgICdwdC1QVCc6ICdTYWlyIGRvIGNoZWNrb3V0JyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0YvQudGC0Lgg0LjQtyDQutCw0YHRgdGLJyxcbiAgICAgICAgJ3NsLVNJJzogJ1phcHJpdGUgQ2hlY2tvdXQnLFxuICAgICAgICAnc3YtU0UnOiAnQXZzbHV0YSBrYXNzYW4nLFxuICAgICAgICB0aDogJ+C4reC4reC4geC4iOC4suC4geC4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4mScsXG4gICAgICAgIHVrOiAn0JLQuNC50YLQuCDQtyBDaGVja291dCcsXG4gICAgICAgICd6aC1DTic6ICfpgIDlh7rnu5PluJAnLFxuICAgICAgICAnemgtVFcnOiAn6YCA5Ye657WQ5bizJ1xuICAgIH0sXG4gICAgJ29yZGVyLXN1bW1hcnknOiB7XG4gICAgICAgICdkZS1ERSc6ICdCZXN0ZWxsenVzYW1tZW5mYXNzdW5nJyxcbiAgICAgICAgJ2VuLVVTJzogJ09yZGVyIHN1bW1hcnknLFxuICAgICAgICAnZXMtRVMnOiAnUmVzdW1lbiBkZWwgcGVkaWRvJyxcbiAgICAgICAgZnI6ICdSw6ljYXBpdHVsYXRpZiBkZSBsYSBjb21tYW5kZScsXG4gICAgICAgIGl0OiAnUmllcGlsb2dvIGRlbGxcXCdvcmRpbmUnLFxuICAgICAgICBqYTogJ+azqOaWh+OBruamguimgScsXG4gICAgICAgICdyby1STyc6ICdSZXp1bWF0IENvbWFuZMSDJyxcbiAgICAgICAgYXI6ICfZhdmE2K7YtSDYp9mE2LfZhNioJyxcbiAgICAgICAgY2E6ICdSZXN1bSBkZSBsYSBjb21hbmRhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1DFmWVobGVkIG9iamVkbsOhdmt5JyxcbiAgICAgICAgJ2RhLURLJzogJ09yZHJlc2FtbWVuZHJhZycsXG4gICAgICAgIGVsOiAnzqDOtc+Bzq/Ou863z4jOtyDPgM6xz4HOsc6zzrPOtc67zq/Osc+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkpuClh+CktiDgpLjgpL7gpLDgpL7gpILgpLYnLFxuICAgICAgICAna28tS1InOiAn7KO866y4IOyalOyVvScsXG4gICAgICAgICdsYi1MVSc6ICdVZXJkbnVuZyBSZXN1bcOpJyxcbiAgICAgICAgJ25sLU5MJzogJ092ZXJ6aWNodCB2YW4gZGUgYmVzdGVsbGluZycsXG4gICAgICAgICdwdC1QVCc6ICdSZXN1bW8gZG8gcGVkaWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CY0YLQvtCzINC30LDQutCw0LfQsCcsXG4gICAgICAgICdzbC1TSSc6ICdQb3Z6ZXRlayBuYXJvxI1pbGEnLFxuICAgICAgICAnc3YtU0UnOiAnT3JkZXJzYW1tYW5mYXR0bmluZycsXG4gICAgICAgIHRoOiAn4Liq4Lij4Li44Lib4LiE4Liz4Liq4Lix4LmI4LiH4LiL4Li34LmJ4LitJyxcbiAgICAgICAgdWs6ICfQn9GW0LTRgdGD0LzQvtC6INCX0LDQvNC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+iuouWNleaRmOimgScsXG4gICAgICAgICd6aC1UVyc6ICfoqILllq7mkZjopoEnXG4gICAgfSxcbiAgICBzdWJ0b3RhbDoge1xuICAgICAgICAnZGUtREUnOiAnWndpc2NoZW5zdW1tZScsXG4gICAgICAgICdlbi1VUyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgICdlcy1FUyc6ICdTdWJ0b3RhbCcsXG4gICAgICAgIGZyOiAnU291cy10b3RhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlIHBhcnppYWxlJyxcbiAgICAgICAgamE6ICflsI/oqIgnLFxuICAgICAgICAncm8tUk8nOiAnU3VidG90YWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5INin2YTZgdix2LnZiicsXG4gICAgICAgIGNhOiAnU3VidG90YWwnLFxuICAgICAgICAnY3MtQ1onOiAnTWV6aXNvdcSNZXQnLFxuICAgICAgICAnZGEtREsnOiAnU3VidG90YWwnLFxuICAgICAgICBlbDogJ86czpXOoc6ZzprOnyDOo86lzp3On86bzp8nLFxuICAgICAgICAnaGktSU4nOiAn4KSJ4KSqLeCkr+Cli+CklycsXG4gICAgICAgICdrby1LUic6ICfshozqs4QnLFxuICAgICAgICAnbGItTFUnOiAnU3VidG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnU3VidG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1N1YnRvdGFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0YDQvtC80LXQttGD0YLQvtGH0L3Ri9C5INC40YLQvtCzJyxcbiAgICAgICAgJ3NsLVNJJzogJ1ZtZXNuaSBzZcWhdGV2ZWsnLFxuICAgICAgICAnc3YtU0UnOiAnRGVsc3VtbWEnLFxuICAgICAgICB0aDogJ+C4ouC4reC4lOC4o+C4p+C4oScsXG4gICAgICAgIHVrOiAn0J/RgNC+0LzRltC20L3QuNC5INC/0ZbQtNGB0YPQvNC+0LonLFxuICAgICAgICAnemgtQ04nOiAn5bCP6K6hJyxcbiAgICAgICAgJ3poLVRXJzogJ+Wwj+ioiCdcbiAgICB9LFxuICAgIHRheDoge1xuICAgICAgICAnZGUtREUnOiAnU3RldWVyJyxcbiAgICAgICAgJ2VuLVVTJzogJ1RheCcsXG4gICAgICAgICdlcy1FUyc6ICdJbXB1ZXN0bycsXG4gICAgICAgIGZyOiAnSW1ww7R0JyxcbiAgICAgICAgaXQ6ICdUYXNzYScsXG4gICAgICAgIGphOiAn56iOJyxcbiAgICAgICAgJ3JvLVJPJzogJ0ltcG96aXQnLFxuICAgICAgICBhcjogJ9i22LHZitio2KknLFxuICAgICAgICBjYTogJ0ltcG9zdG9zJyxcbiAgICAgICAgJ2NzLUNaJzogJ0RhxYgnLFxuICAgICAgICAnZGEtREsnOiAnU2thdCcsXG4gICAgICAgIGVsOiAnzqbPjM+Bzr/PgicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpLAnLFxuICAgICAgICAna28tS1InOiAn7IS4JyxcbiAgICAgICAgJ2xiLUxVJzogJ1N0ZWllcicsXG4gICAgICAgICdubC1OTCc6ICdCZWxhc3RpbmcnLFxuICAgICAgICAncHQtUFQnOiAnSW1wb3N0bycsXG4gICAgICAgICdydS1SVSc6ICfQndCw0LvQvtCzJyxcbiAgICAgICAgJ3NsLVNJJzogJ0RhdmVrJyxcbiAgICAgICAgJ3N2LVNFJzogJ0Jlc2thdHRhJyxcbiAgICAgICAgdGg6ICfguKDguLLguKnguLUnLFxuICAgICAgICB1azogJ9Cf0L7QtNCw0YLQvtC6JyxcbiAgICAgICAgJ3poLUNOJzogJ+eojicsXG4gICAgICAgICd6aC1UVyc6ICfnqIUnXG4gICAgfSxcbiAgICB0b3RhbDoge1xuICAgICAgICAnZGUtREUnOiAnR2VzYW10JyxcbiAgICAgICAgJ2VuLVVTJzogJ1RvdGFsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1RvdGFsJyxcbiAgICAgICAgZnI6ICdUb3RhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlJyxcbiAgICAgICAgamE6ICflkIjoqIgnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5JyxcbiAgICAgICAgY2E6ICdUb3RhbCcsXG4gICAgICAgICdjcy1DWic6ICdDZWxrb3bDvScsXG4gICAgICAgICdkYS1ESyc6ICdpIGFsdCcsXG4gICAgICAgIGVsOiAnzqPPjc69zr/Ou86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleClgeCksicsXG4gICAgICAgICdrby1LUic6ICfstJ0nLFxuICAgICAgICAnbGItTFUnOiAnSW5zZ2VzYW10JyxcbiAgICAgICAgJ25sLU5MJzogJ1RvdGFhbCcsXG4gICAgICAgICdwdC1QVCc6ICdUb3RhbCcsXG4gICAgICAgICdydS1SVSc6ICfQntCx0YnQuNC5JyxcbiAgICAgICAgJ3NsLVNJJzogJ1NrdXBhaicsXG4gICAgICAgICdzdi1TRSc6ICdUb3RhbCcsXG4gICAgICAgIHRoOiAn4Lij4Lin4LihJyxcbiAgICAgICAgdWs6ICfQktGB0YzQvtCz0L4nLFxuICAgICAgICAnemgtQ04nOiAn5YWo6YOo55qEJyxcbiAgICAgICAgJ3poLVRXJzogJ+WFqOmDqOeahCdcbiAgICB9LFxuICAgIGNvdXBvbjoge1xuICAgICAgICAnZGUtREUnOiAnQ291cG9uJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NvdXBvbicsXG4gICAgICAgICdlcy1FUyc6ICdDdXDDs24nLFxuICAgICAgICBmcjogJ0NvdXBvbicsXG4gICAgICAgIGl0OiAnQ291cG9uJyxcbiAgICAgICAgamE6ICfjgq/jg7zjg53jg7MnLFxuICAgICAgICAncm8tUk8nOiAnQ3Vwb24nLFxuICAgICAgICBhcjogJ9mC2LPZitmF2KknLFxuICAgICAgICBjYTogJ0N1cMOzJyxcbiAgICAgICAgJ2NzLUNaJzogJ0t1cMOzbicsXG4gICAgICAgICdkYS1ESyc6ICdLdXBvbicsXG4gICAgICAgIGVsOiAnzprOv8+Fz4DPjM69zrknLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWC4KSq4KSoJyxcbiAgICAgICAgJ2tvLUtSJzogJ+y/oO2PsCcsXG4gICAgICAgICdsYi1MVSc6ICdDb3Vwb24nLFxuICAgICAgICAnbmwtTkwnOiAnQ291cG9uJyxcbiAgICAgICAgJ3B0LVBUJzogJ0N1cG9tJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0YPQv9C+0L0nLFxuICAgICAgICAnc2wtU0knOiAnS3Vwb24nLFxuICAgICAgICAnc3YtU0UnOiAnS3Vwb25nJyxcbiAgICAgICAgdGg6ICfguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9Ca0YPQv9C+0L0nLFxuICAgICAgICAnemgtQ04nOiAn5LyY5oOg5Yi4JyxcbiAgICAgICAgJ3poLVRXJzogJ+WEquaDoOWIuCdcbiAgICB9LFxuICAgICd3Yy1jb3Vwb24tY29kZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0d1dHNjaGVpbmNvZGUnLFxuICAgICAgICAnZW4tVVMnOiAnQ291cG9uIGNvZGUnLFxuICAgICAgICAnZXMtRVMnOiAnQ8OzZGlnbyBwcm9tb2Npb25hbCcsXG4gICAgICAgIGZyOiAnQ29kZSBkZSBjb3Vwb24nLFxuICAgICAgICBpdDogJ0NvZGljZSBjb3Vwb24nLFxuICAgICAgICBqYTogJ+OCr+ODvOODneODs+OCs+ODvOODiScsXG4gICAgICAgICdyby1STyc6ICdDb2QgY3Vwb24nLFxuICAgICAgICBhcjogJ9ix2YXYsiDYp9mE2YPZiNio2YjZhicsXG4gICAgICAgIGNhOiAnQ29kaSBkZSBjdXDDsycsXG4gICAgICAgICdjcy1DWic6ICdLw7NkIGt1cMOzbnUnLFxuICAgICAgICAnZGEtREsnOiAnS3Vwb25rb2RlJyxcbiAgICAgICAgZWw6ICfOms+JzrTOuc66z4zPgiDOus6/z4XPgM6/zr3Ouc6/z40nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWC4KSq4KSoIOCkleCli+CkoScsXG4gICAgICAgICdrby1LUic6ICfsv6Dtj7Ag7L2U65OcJyxcbiAgICAgICAgJ2xiLUxVJzogJ0NvdXBvbiBDb2RlJyxcbiAgICAgICAgJ25sLU5MJzogJ0NvdXBvbiBjb2RlJyxcbiAgICAgICAgJ3B0LVBUJzogJ0PDs2RpZ28gZG8gY3Vwb20nLFxuICAgICAgICAncnUtUlUnOiAn0JrQvtC0INC60YPQv9C+0L3QsCcsXG4gICAgICAgICdzbC1TSSc6ICdLb2RhIGt1cG9uYScsXG4gICAgICAgICdzdi1TRSc6ICdLdXBvbmdza29kJyxcbiAgICAgICAgdGg6ICfguKPguKvguLHguKrguITguLnguJvguK3guIcnLFxuICAgICAgICB1azogJ9Ca0L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnemgtQ04nOiAn5LyY5oOg5Y235Y+356CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+WEquaDoOWNt+iZn+eivCdcbiAgICB9LFxuICAgICd3Yy1pbnZhbGlkLWNvdXBvbic6IHtcbiAgICAgICAgJ2RlLURFJzogJ1NpZSBoYWJlbiBlaW5lbiB1bmfDvGx0aWdlbiBHdXRzY2hlaW5jb2RlIGVpbmdlZ2ViZW4nLFxuICAgICAgICAnZW4tVVMnOiAnWW91IGVudGVyZWQgYW4gaW52YWxpZCBjb3Vwb24gY29kZScsXG4gICAgICAgICdlcy1FUyc6ICdJbmdyZXNhc3RlIHVuIGPDs2RpZ28gZGUgY3Vww7NuIG5vIHbDoWxpZG8nLFxuICAgICAgICBmcjogJ1ZvdXMgYXZleiBlbnRyw6kgdW4gY29kZSBkZSBjb3Vwb24gbm9uIHZhbGlkZScsXG4gICAgICAgIGl0OiAnSGFpIGluc2VyaXRvIHVuIGNvZGljZSBjb3Vwb24gbm9uIHZhbGlkbycsXG4gICAgICAgIGphOiAn54Sh5Yq544Gq44Kv44O844Od44Oz44Kz44O844OJ44KS5YWl5Yqb44GX44G+44GX44GfJyxcbiAgICAgICAgJ3JvLVJPJzogJ0HIm2kgaW50cm9kdXMgdW4gY29kIGRlIGN1cG9uIG5ldmFsaWQnLFxuICAgICAgICBhcjogJ9mE2YLYryDYo9iv2K7ZhNiqINix2YXYsiDZgtiz2YrZhdipINi62YrYsSDYtdin2YTYrScsXG4gICAgICAgIGNhOiAnSGV1IGludHJvZHXDr3QgdW4gY29kaSBkZSBjdXDDsyBubyB2w6BsaWQnLFxuICAgICAgICAnY3MtQ1onOiAnWmFkYWxpIGpzdGUgbmVwbGF0bsO9IGvDs2Qga3Vww7NudScsXG4gICAgICAgICdkYS1ESyc6ICdEdSBoYXIgaW5kdGFzdGV0IGVuIHVneWxkaWcga3Vwb25rb2RlJyxcbiAgICAgICAgZWw6ICfOms6xz4TOsc+Hz4nPgc6vz4POsc+EzrUgzq3Ovc6xzr0gzrzOtyDOrc6zzrrPhc+Bzr8gzrrPic60zrnOus+MIM66zr/Phc+Azr/Ovc65zr/PjScsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpKrgpKjgpYcg4KSP4KSVIOCkheCkruCkvuCkqOCljeCkryDgpJXgpYLgpKrgpKgg4KSV4KWL4KShIOCkpuCksOCljeCknCDgpJXgpL/gpK/gpL4g4KS54KWIJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yemOuqu+uQnCDsv6Dtj7Ag7L2U65Oc66W8IOyeheugpe2WiOyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRGlyIGh1dHQgZW4gb25nw6tsdGVnZSBDb3Vwb25jb2RlIGFnaW5uJyxcbiAgICAgICAgJ25sLU5MJzogJ1UgaGVlZnQgZWVuIG9uZ2VsZGlnZSBjb3Vwb25jb2RlIGluZ2V2b2VyZCcsXG4gICAgICAgICdwdC1QVCc6ICdWb2PDqiBpbnNlcml1IHVtIGPDs2RpZ28gZGUgY3Vwb20gaW52w6FsaWRvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CS0Ysg0LLQstC10LvQuCDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQutGD0L/QvtC90LAnLFxuICAgICAgICAnc2wtU0knOiAnVm5lc2xpIHN0ZSBuZXZlbGphdm5vIGtvZG8ga3Vwb25hJyxcbiAgICAgICAgJ3N2LVNFJzogJ0R1IGhhciBhbmdldHQgZW4gb2dpbHRpZyBrdXBvbmdrb2QnLFxuICAgICAgICB0aDogJ+C4hOC4uOC4k+C4m+C5ieC4reC4meC4o+C4q+C4seC4quC4hOC4ueC4m+C4reC4h+C5hOC4oeC5iOC4luC4ueC4geC4leC5ieC4reC4hycsXG4gICAgICAgIHVrOiAn0JLQuCDQstCy0LXQu9C4INC90LXQtNGW0LnRgdC90LjQuSDQutC+0LQg0LrRg9C/0L7QvdCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+aCqOi+k+WFpeS6huaXoOaViOeahOS8mOaDoOWIuOS7o+eggScsXG4gICAgICAgICd6aC1UVyc6ICfmgqjovLjlhaXkuobnhKHmlYjnmoTlhKrmg6DliLjku6PnorwnXG4gICAgfSxcbiAgICBhcHBseToge1xuICAgICAgICAnZGUtREUnOiAnRWlubMO2c2VuJyxcbiAgICAgICAgJ2VuLVVTJzogJ0FwcGx5JyxcbiAgICAgICAgJ2VzLUVTJzogJ0FwbGljYXInLFxuICAgICAgICBmcjogJ0FwcGxpcXVlcicsXG4gICAgICAgIGl0OiAnQXBwbGljYXJlJyxcbiAgICAgICAgamE6ICfnlLPovrzjgb8nLFxuICAgICAgICAncm8tUk8nOiAnQXBsaWNhJyxcbiAgICAgICAgYXI6ICfYqti32KjZitmCJyxcbiAgICAgICAgY2E6ICdBcGxpY2FyJyxcbiAgICAgICAgJ2NzLUNaJzogJ0FwbGlrb3ZhdCcsXG4gICAgICAgICdkYS1ESyc6ICdhbnPDuGdlJyxcbiAgICAgICAgZWw6ICfOmc+Dz4fPjc6/z4XOvScsXG4gICAgICAgICdoaS1JTic6ICfgpLLgpL7gpJfgpYIg4KSV4KSw4KSo4KS+JyxcbiAgICAgICAgJ2tvLUtSJzogJ+yggeyaqe2VmOuLpCcsXG4gICAgICAgICdsYi1MVSc6ICdHw6tsbGUnLFxuICAgICAgICAnbmwtTkwnOiAnVmFuIHRvZXBhc3NpbmcgemlqbicsXG4gICAgICAgICdwdC1QVCc6ICdBcGxpY2FyJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7QtNCw0YLRjCDQt9Cw0Y/QstC70LXQvdC40LUnLFxuICAgICAgICAnc2wtU0knOiAnVXBvcmFiaScsXG4gICAgICAgICdzdi1TRSc6ICdUaWxsw6RtcGEnLFxuICAgICAgICB0aDogJ+C4meC4s+C4oeC4suC5g+C4iuC5iScsXG4gICAgICAgIHVrOiAn0JfQsNGB0YLQvtGB0YPQstCw0YLQuCcsXG4gICAgICAgICd6aC1DTic6ICfnlLPor7cnLFxuICAgICAgICAnemgtVFcnOiAn55Sz6KuLJ1xuICAgIH0sXG4gICAgJ2dpZnQtY2FyZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0dlc2NoZW5ra2FydGUnLFxuICAgICAgICAnZW4tVVMnOiAnR2lmdCBjYXJkJyxcbiAgICAgICAgJ2VzLUVTJzogJ1RhcmpldGEgZGUgcmVnYWxvJyxcbiAgICAgICAgZnI6ICdDYXJ0ZSBjYWRlYXUnLFxuICAgICAgICBpdDogJ0NhcnRhIHJlZ2FsbycsXG4gICAgICAgIGphOiAn44Ku44OV44OI44Kr44O844OJJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NhcmQgY2Fkb3UnLFxuICAgICAgICBhcjogJ9mD2LHYqiDZh9iv2YrYqScsXG4gICAgICAgIGNhOiAnVGFyZ2V0YSByZWdhbCcsXG4gICAgICAgICdjcy1DWic6ICdEw6Fya292w6EgcG91a8OhemthJyxcbiAgICAgICAgJ2RhLURLJzogJ0dhdmVrb3J0JyxcbiAgICAgICAgZWw6ICfOlM+Jz4HOv866zqzPgc+EzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSJ4KSq4KS54KS+4KSwIOCkquCkpOCljeCksCcsXG4gICAgICAgICdrby1LUic6ICfquLDtlITtirgg7Lm065OcJyxcbiAgICAgICAgJ2xiLUxVJzogJ0thZGRva2FhcnQnLFxuICAgICAgICAnbmwtTkwnOiAnQ2FkZWF1a2FhcnQnLFxuICAgICAgICAncHQtUFQnOiAnQ2FydMOjbyBQcmVzZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQn9C+0LTQsNGA0L7Rh9C90LDRjyDQutCw0YDRgtCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0RhcmlsbmUga2FydGljZScsXG4gICAgICAgICdzdi1TRSc6ICdQcmVzZW50IGtvcnQnLFxuICAgICAgICB0aDogJ+C4muC4seC4leC4o+C4guC4reC4h+C4guC4p+C4seC4jScsXG4gICAgICAgIHVrOiAn0J/QvtC00LDRgNGD0L3QutC+0LLQsCDQutCw0YDRgtC60LAnLFxuICAgICAgICAnemgtQ04nOiAn56S854mp5Y2hJyxcbiAgICAgICAgJ3poLVRXJzogJ+emrueJqeWNoSdcbiAgICB9LFxuICAgICdnaWZ0LWNhcmQtbnVtYmVyJzoge1xuICAgICAgICAnZGUtREUnOiAnR2VzY2hlbmtrYXJ0ZW5udW1tZXInLFxuICAgICAgICAnZW4tVVMnOiAnR2lmdCBjYXJkIG51bWJlcicsXG4gICAgICAgICdlcy1FUyc6ICdOdW1lcm8gZGUgdGFyamV0YSBkZSByZWdhbG8nLFxuICAgICAgICBmcjogJ051bcOpcm8gZGUgbGEgY2FydGUtY2FkZWF1JyxcbiAgICAgICAgaXQ6ICdOdW1lcm8gZGVsbGEgY2FydGEgcmVnYWxvJyxcbiAgICAgICAgamE6ICfjgq7jg5Xjg4jjgqvjg7zjg4nnlarlj7cnLFxuICAgICAgICAncm8tUk8nOiAnTnVtxINydWwgY2FyZHVsdWkgY2Fkb3UnLFxuICAgICAgICBhcjogJ9ix2YLZhSDYqNi32KfZgtipINin2YTZh9iv2YrYqScsXG4gICAgICAgIGNhOiAnTsO6bWVybyBkZSB0YXJnZXRhIHJlZ2FsJyxcbiAgICAgICAgJ2NzLUNaJzogJ8SMw61zbG8gZMOhcmtvdsOpIGthcnR5JyxcbiAgICAgICAgJ2RhLURLJzogJ0dhdmVrb3J0bnVtbWVyJyxcbiAgICAgICAgZWw6ICfOkc+BzrnOuM68z4zPgiDOtM+Jz4HOv866zqzPgc+EzrHPgicsXG4gICAgICAgICdoaS1JTic6ICfgpJfgpL/gpKvgpY3gpJ8g4KSV4KS+4KSw4KWN4KShIOCkqOCkguCkrOCksCcsXG4gICAgICAgICdrby1LUic6ICfquLDtlITtirgg7Lm065OcIOuyiO2YuCcsXG4gICAgICAgICdsYi1MVSc6ICdHZXNjaGVua2thYXJ0IE51bW1lcicsXG4gICAgICAgICdubC1OTCc6ICdDYWRlYXVrYWFydG51bW1lcicsXG4gICAgICAgICdwdC1QVCc6ICdOw7ptZXJvIGRvIGNhcnTDo28tcHJlc2VudGUnLFxuICAgICAgICAncnUtUlUnOiAn0J3QvtC80LXRgCDQv9C+0LTQsNGA0L7Rh9C90L7QuSDQutCw0YDRgtGLJyxcbiAgICAgICAgJ3NsLVNJJzogJ8WgdGV2aWxrYSBkYXJpbG5lIGthcnRpY2UnLFxuICAgICAgICAnc3YtU0UnOiAnUHJlc2VudGtvcnRudW1tZXInLFxuICAgICAgICB0aDogJ+C4q+C4oeC4suC4ouC5gOC4peC4guC4muC4seC4leC4o+C4guC4reC4h+C4guC4p+C4seC4jScsXG4gICAgICAgIHVrOiAn0J3QvtC80LXRgCDQv9C+0LTQsNGA0YPQvdC60L7QstC+0Zcg0LrQsNGA0YLQutC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+ekvOWTgeWNoeWPtycsXG4gICAgICAgICd6aC1UVyc6ICfnpq7lk4HljaHomZ8nXG4gICAgfSxcbiAgICAnaW52YWxpZC1naWZ0LWNhcmQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdTaWUgaGFiZW4gZWluZSB1bmfDvGx0aWdlIEdlc2NoZW5ra2FydGUgZWluZ2VnZWJlbicsXG4gICAgICAgICdlbi1VUyc6ICdZb3UgZW50ZXJlZCBhbiBpbnZhbGlkIGdpZnQgY2FyZCcsXG4gICAgICAgICdlcy1FUyc6ICdJbmdyZXNhc3RlIHVuYSB0YXJqZXRhIGRlIHJlZ2FsbyBubyB2w6FsaWRhJyxcbiAgICAgICAgZnI6ICdWb3VzIGF2ZXogZW50csOpIHVuZSBjYXJ0ZS1jYWRlYXUgbm9uIHZhbGlkZScsXG4gICAgICAgIGl0OiAnSGFpIGluc2VyaXRvIHVuYSBjYXJ0YSByZWdhbG8gbm9uIHZhbGlkYScsXG4gICAgICAgIGphOiAn54Sh5Yq544Gq44Ku44OV44OI44Kr44O844OJ44KS5YWl5Yqb44GX44G+44GX44GfJyxcbiAgICAgICAgJ3JvLVJPJzogJ0HIm2kgaW50cm9kdXMgdW4gY2FyZCBjYWRvdSBuZXZhbGlkJyxcbiAgICAgICAgYXI6ICfZhNmC2K8g2KPYr9iu2YTYqiDYqNi32KfZgtipINmH2K/Yp9mK2Kcg2LrZitixINi12KfZhNit2KknLFxuICAgICAgICBjYTogJ0hldSBpbnRyb2R1w690IHVuYSB0YXJnZXRhIHJlZ2FsIG5vIHbDoGxpZGEnLFxuICAgICAgICAnY3MtQ1onOiAnWmFkYWxpIGpzdGUgbmVwbGF0bm91IGTDoXJrb3ZvdSBrYXJ0dScsXG4gICAgICAgICdkYS1ESyc6ICdEdSBoYXIgaW5kdGFzdGV0IGV0IHVneWxkaWd0IGdhdmVrb3J0JyxcbiAgICAgICAgZWw6ICfOms6xz4TOsc+Hz4nPgc6vz4POsc+EzrUgzrzOuc6xIM68zrcgzq3Os866z4XPgc63IM60z4nPgc6/zrrOrM+Bz4TOsScsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpKrgpKjgpYcg4KSP4KSVIOCkheCkruCkvuCkqOCljeCkryDgpIngpKrgpLngpL7gpLAg4KSV4KS+4KSw4KWN4KShIOCkpuCksOCljeCknCDgpJXgpL/gpK/gpL4g4KS54KWIJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yemOuqu+uQnCDquLDtlITtirgg7Lm065Oc66W8IOyeheugpe2WiOyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRGlyIGh1dHQgZW5nIG9uZ8OrbHRlZyBLYWRkb2thYXJ0IGFnaW5uJyxcbiAgICAgICAgJ25sLU5MJzogJ0plIGhlYnQgZWVuIG9uZ2VsZGlnZSBjYWRlYXVib24gaW5nZXZvZXJkJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ZvY8OqIGluc2VyaXUgdW0gdmFsZS1wcmVzZW50ZSBpbnbDoWxpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0JLRiyDQstCy0LXQu9C4INC90LXQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3Rg9GOINC/0L7QtNCw0YDQvtGH0L3Rg9GOINC60LDRgNGC0YMnLFxuICAgICAgICAnc2wtU0knOiAnVm5lc2xpIHN0ZSBuZXZlbGphdm5vIGRhcmlsbm8ga2FydGljbycsXG4gICAgICAgICdzdi1TRSc6ICdEdSBoYXIgYW5nZXR0IGV0dCBvZ2lsdGlndCBwcmVzZW50a29ydCcsXG4gICAgICAgIHRoOiAn4LiE4Li44LiT4Lib4LmJ4Lit4LiZ4Lia4Lix4LiV4Lij4LiC4Lit4LiH4LiC4Lin4Lix4LiN4LiX4Li14LmI4LmE4Lih4LmI4LiW4Li54LiB4LiV4LmJ4Lit4LiHJyxcbiAgICAgICAgdWs6ICfQktC4INCy0LLQtdC70Lgg0L3QtdC00ZbQudGB0L3RgyDQv9C+0LTQsNGA0YPQvdC60L7QstGDINC60LDRgNGC0LrRgycsXG4gICAgICAgICd6aC1DTic6ICfmgqjovpPlhaXkuobml6DmlYjnmoTnpLzlk4HljaEnLFxuICAgICAgICAnemgtVFcnOiAn5oKo6Ly45YWl5LqG54Sh5pWI55qE56au5ZOB5Y2hJ1xuICAgIH0sXG4gICAgJ2dpZnQtY2FyZC1hbHJlYWR5LWFwcGxpZWQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdEaWVzZSBHZXNjaGVua2thcnRlIHd1cmRlIGJlcmVpdHMgYW5nZXdlbmRldC4nLFxuICAgICAgICAnZW4tVVMnOiAnVGhpcyBnaWZ0IGNhcmQgaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkLicsXG4gICAgICAgICdlcy1FUyc6ICdFc3RhIHRhcmpldGEgZGUgcmVnYWxvIHlhIHNlIGFwbGljw7MuJyxcbiAgICAgICAgZnI6ICdDZXR0ZSBjYXJ0ZS1jYWRlYXUgYSBkw6lqw6Agw6l0w6kgYXBwbGlxdcOpZS4nLFxuICAgICAgICBpdDogJ1F1ZXN0YSBjYXJ0YSByZWdhbG8gw6ggZ2nDoCBzdGF0YSBhcHBsaWNhdGEuJyxcbiAgICAgICAgamE6ICfjgZPjga7jgq7jg5Xjg4jjgqvjg7zjg4njga/jgZnjgafjgavpgannlKjjgZXjgozjgabjgYTjgb7jgZnjgIInLFxuICAgICAgICAncm8tUk8nOiAnQWNlc3QgY2FyZCBjYWRvdSBhIGZvc3QgZGVqYSBhcGxpY2F0LicsXG4gICAgICAgIGFyOiAn2KrZhSDYqti32KjZitmCINio2LfYp9mC2Kkg2KfZhNmH2K/Yp9mK2Kcg2YfYsNmHINio2KfZhNmB2LnZhC4nLFxuICAgICAgICBjYTogJ0FxdWVzdGEgdGFyZ2V0YSByZWdhbCBqYSBzXFwnaGEgYXBsaWNhdC4nLFxuICAgICAgICAnY3MtQ1onOiAnVGF0byBkw6Fya292w6Ega2FydGEgamnFviBieWxhIHBvdcW+aXRhLicsXG4gICAgICAgICdkYS1ESyc6ICdEZXR0ZSBnYXZla29ydCBlciBhbGxlcmVkZSBhbnZlbmR0LicsXG4gICAgICAgIGVsOiAnzpHPhc+Ezq4gzrcgzrTPic+Bzr/Ous6sz4HPhM6xIM6tz4fOtc65IM6uzrTOtyDOtc+GzrHPgc68zr/Pg8+EzrXOry4nLFxuICAgICAgICAnaGktSU4nOiAn4KSv4KS5IOCkieCkquCkueCkvuCksCDgpJXgpL7gpLDgpY3gpKEg4KSq4KS54KSy4KWHIOCkueClgCDgpLLgpL7gpJfgpYIg4KSV4KS/4KSv4KS+IOCknOCkviDgpJrgpYHgpJXgpL4g4KS54KWI4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ydtCDquLDtlITtirgg7Lm065Oc64qUIOydtOuvuCDsoIHsmqnrkJjsl4jsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0TDq3MgS2FkZG9rYWFydCBnb3VmIHNjaG8gYXBwbGl6w6lpZXJ0LicsXG4gICAgICAgICdubC1OTCc6ICdEZXplIGNhZGVhdWJvbiBpcyBhbCB0b2VnZXBhc3QuJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VzdGUgdmFsZS1wcmVzZW50ZSBqw6EgZm9pIGFwbGljYWRvLicsXG4gICAgICAgICdydS1SVSc6ICfQrdGC0LAg0L/QvtC00LDRgNC+0YfQvdCw0Y8g0LrQsNGA0YLQsCDRg9C20LUg0LHRi9C70LAg0L/RgNC40LzQtdC90LXQvdCwLicsXG4gICAgICAgICdzbC1TSSc6ICdUYSBkYXJpbG5hIGthcnRpY2EgamUgxb5lIGJpbGEgdXBvcmFibGplbmEuJyxcbiAgICAgICAgJ3N2LVNFJzogJ0RldHRhIHByZXNlbnRrb3J0IGhhciByZWRhbiB0aWxsw6RtcGF0cy4nLFxuICAgICAgICB0aDogJ+C4oeC4teC4geC4suC4o+C5g+C4iuC5ieC4muC4seC4leC4o+C4guC4reC4h+C4guC4p+C4seC4jeC4meC4teC5ieC5geC4peC5ieC4pycsXG4gICAgICAgIHVrOiAn0KbRjiDQv9C+0LTQsNGA0YPQvdC60L7QstGDINC60LDRgNGC0LrRgyDQstC20LUg0LfQsNGB0YLQvtGB0L7QstCw0L3Qvi4nLFxuICAgICAgICAnemgtQ04nOiAn5q2k56S85ZOB5Y2h5bey6KKr5bqU55So44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+atpOemruWTgeWNoeW3suiiq+aHieeUqOOAgidcbiAgICB9LFxuICAgICdzaGlwLXRvJzoge1xuICAgICAgICAnZGUtREUnOiAnVmVyc2FuZCBuYWNoJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NoaXAgdG8nLFxuICAgICAgICAnZXMtRVMnOiAnRW52aWFyIGEnLFxuICAgICAgICBmcjogJ0Vudm95ZXogw6AnLFxuICAgICAgICBpdDogJ1NwZWRpcmUgYScsXG4gICAgICAgIGphOiAn6YWN6YCB5YWIJyxcbiAgICAgICAgJ3JvLVJPJzogJ8OObWJhcmNhIHNwcmUnLFxuICAgICAgICBhcjogJ9iz2KfZgdixINi52YTZiSDZhdiq2YYg2LPZgdmK2YbYqSDZhCcsXG4gICAgICAgIGNhOiAnRW52aWEgYScsXG4gICAgICAgICdjcy1DWic6ICdEb3ByYXZpdCBkbycsXG4gICAgICAgICdkYS1ESyc6ICdTZW5kIHRpbCcsXG4gICAgICAgIGVsOiAnzpHPgM6/z4PPhM6/zrvOriDPgM+Bzr/PgicsXG4gICAgICAgICdoaS1JTic6ICfgpK/gpLngpL7gpIIg4KSt4KWH4KSc4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwsOyGoeyngCcsXG4gICAgICAgICdsYi1MVSc6ICdTY2jDqWNrZW4gdW4nLFxuICAgICAgICAnbmwtTkwnOiAnVmVyemVuZCBuYWFyJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VudmlhciBwYXJhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CU0L7RgdGC0LDQstC60LAg0LTQvicsXG4gICAgICAgICdzbC1TSSc6ICdQb3NsYXRpIHYnLFxuICAgICAgICAnc3YtU0UnOiAnRnJha3RhIHRpbGwnLFxuICAgICAgICB0aDogJ+C4quC5iOC4h+C5hOC4m+C4l+C4teC5iCcsXG4gICAgICAgIHVrOiAn0JLRltC00L/RgNCw0LLQuNGC0Lgg0LTQvicsXG4gICAgICAgICd6aC1DTic6ICfov5DpgIHliLAnLFxuICAgICAgICAnemgtVFcnOiAn6YGL6YCB5YiwJ1xuICAgIH0sXG4gICAgJ2NhcmQtbGFiZWwnOiB7XG4gICAgICAgICdkZS1ERSc6ICdLcmVkaXQtIG9kZXIgRGViaXRrYXJ0ZScsXG4gICAgICAgICdlbi1VUyc6ICdDcmVkaXQgb3IgZGViaXQgY2FyZCcsXG4gICAgICAgICdlcy1FUyc6ICdUYXJqZXRhIGRlIGNyw6lkaXRvIG8gZMOpYml0bycsXG4gICAgICAgIGZyOiAnQ2FydGUgZGUgY3LDqWRpdCBvdSBkZSBkw6liaXQnLFxuICAgICAgICBpdDogJ0NhcnRhIGRpIGNyZWRpdG8gbyBkaSBkZWJpdG8nLFxuICAgICAgICBqYTogJ+OCr+ODrOOCuOODg+ODiOOCguOBl+OBj+OBr+ODh+ODk+ODg+ODiOOCq+ODvOODiScsXG4gICAgICAgICdyby1STyc6ICdDYXJkIGRlIGNyZWRpdCBzYXUgZGViaXQnLFxuICAgICAgICBhcjogJ9io2LfYp9mC2Kkg2KfZhNin2KbYqtmF2KfZhiDYo9mIINin2YTYrti12YUnLFxuICAgICAgICBjYTogJ1RhcmdldGEgZGUgY3LDqGRpdCBvIGTDqGJpdCcsXG4gICAgICAgICdjcy1DWic6ICdLcmVkaXRuw60gbmVibyBkZWJldG7DrSBrYXJ0YScsXG4gICAgICAgICdkYS1ESyc6ICdLcmVkaXQtIGVsbGVyIGJldGFsaW5nc2tvcnQnLFxuICAgICAgICBlbDogJ86gzrnPg8+Ez4nPhM65zrrOriDOriDPh8+BzrXPic+Dz4TOuc66zq4gzrrOrM+Bz4TOsScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpY3gpLDgpYfgpKHgpL/gpJ8g4KSv4KS+IOCkoeClh+CkrOCkv+CknyDgpJXgpL7gpLDgpY3gpKEnLFxuICAgICAgICAna28tS1InOiAn7Iug7Jqp7Lm065OcIOuYkOuKlCDsp4HrtojsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS3JlZGl0dC0gb2RlciBCYW5ra2FhcnQnLFxuICAgICAgICAnbmwtTkwnOiAnQ3JlZGl0Y2FyZCBvZiBiYW5rcGFzJyxcbiAgICAgICAgJ3B0LVBUJzogJ0NhcnTDo28gZGUgY3LDqWRpdG8gb3UgZMOpYml0bycsXG4gICAgICAgICdydS1SVSc6ICfQmtGA0LXQtNC40YLQvdCw0Y8g0LjQu9C4INC00LXQsdC10YLQvtCy0LDRjyDQutCw0YDRgtCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0tyZWRpdG5hIGFsaSBkZWJldG5hIGthcnRpY2EnLFxuICAgICAgICAnc3YtU0UnOiAnS3JlZGl0LWVsbGVyIGJldGFsa29ydCcsXG4gICAgICAgIHRoOiAn4Lia4Lix4LiV4Lij4LmA4LiE4Lij4LiU4Li04LiV4Lir4Lij4Li34Lit4Lia4Lix4LiV4Lij4LmA4LiU4Lia4Li04LiVJyxcbiAgICAgICAgdWs6ICfQmtGA0LXQtNC40YLQvdCwINCw0LHQviDQtNC10LHQtdGC0L7QstCwINC60LDRgNGC0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfkv6HnlKjljaHmiJblgJ/orrDljaEnLFxuICAgICAgICAnemgtVFcnOiAn5L+h55So5Y2h5oiW5YCf6KiY5Y2hJ1xuICAgIH0sXG4gICAgcGF5OiB7XG4gICAgICAgICdkZS1ERSc6ICdaYWhsZW4nLFxuICAgICAgICAnZW4tVVMnOiAnUGF5JyxcbiAgICAgICAgJ2VzLUVTJzogJ1BhZ2FyJyxcbiAgICAgICAgZnI6ICdQYXllcicsXG4gICAgICAgIGl0OiAnUGFnYXJlJyxcbiAgICAgICAgamE6ICfmlK/miZXjgYQnLFxuICAgICAgICAncm8tUk8nOiAnUGzEg3RlyJl0ZScsXG4gICAgICAgIGFyOiAn2YrYr9mB2LknLFxuICAgICAgICBjYTogJ1BhZ2EnLFxuICAgICAgICAnY3MtQ1onOiAnUGxhdGl0JyxcbiAgICAgICAgJ2RhLURLJzogJ0JldGFsZScsXG4gICAgICAgIGVsOiAnzqDOu863z4HPic68zq4nLFxuICAgICAgICAnaGktSU4nOiAn4KS14KWH4KSk4KSoJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yngOu2iCcsXG4gICAgICAgICdsYi1MVSc6ICdCZXp1ZWxlbicsXG4gICAgICAgICdubC1OTCc6ICdCZXRhbGVuJyxcbiAgICAgICAgJ3B0LVBUJzogJ1BhZ2FyJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LvQsNGC0LjRgtGMJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BsYcSNYWonLFxuICAgICAgICAnc3YtU0UnOiAnQmV0YWxhJyxcbiAgICAgICAgdGg6ICfguIjguYjguLLguKInLFxuICAgICAgICB1azogJ9Ce0L/Qu9Cw0YLQsCcsXG4gICAgICAgICd6aC1DTic6ICfmlK/ku5gnLFxuICAgICAgICAnemgtVFcnOiAn5pSv5LuYJ1xuICAgIH0sXG4gICAgYmFjazoge1xuICAgICAgICAnZGUtREUnOiAnWnVyw7xjayB6dSBJbmZvcm1hdGlvbmVuJyxcbiAgICAgICAgJ2VuLVVTJzogJ0JhY2sgdG8gaW5mbycsXG4gICAgICAgICdlcy1FUyc6ICdWb2x2ZXIgYSBpbmZvcm1hY2nDs24nLFxuICAgICAgICBmcjogJ1JldG91ciBhdXggaW5mb3JtYXRpb25zJyxcbiAgICAgICAgaXQ6ICdUb3JuYSBhbGxlIGluZm9ybWF6aW9uaScsXG4gICAgICAgIGphOiAn5oOF5aCx44Gr5oi744KLJyxcbiAgICAgICAgJ3JvLVJPJzogJ8OObmFwb2kgbGEgaW5mb3JtYcibaWknLFxuICAgICAgICBhcjogJ9ix2KzZiNi5INil2YTZiSDYp9mE2YXYudmE2YjZhdin2KonLFxuICAgICAgICBjYTogJ1Rvcm5hIGEgbGEgaW5mb3JtYWNpw7MnLFxuICAgICAgICAnY3MtQ1onOiAnWnDEm3QgayBpbmZvcm1hY8OtbScsXG4gICAgICAgICdkYS1ESyc6ICdUaWxiYWdlIHRpbCBpbmZvcm1hdGlvbicsXG4gICAgICAgIGVsOiAnzpXPgM65z4PPhM+Bzr/Phs6uIM+Dz4TOuc+CIM+AzrvOt8+Bzr/Phs6/z4HOr861z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSc4KS+4KSo4KSV4KS+4KSw4KWAIOCkquCksCDgpLXgpL7gpKrgpLgg4KSc4KS+4KSP4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ygleuztOuhnCDrj4zslYTqsIDquLAnLFxuICAgICAgICAnbGItTFUnOiAnWnLDqWNrIG9wIEluZm9ybWF0aW91bicsXG4gICAgICAgICdubC1OTCc6ICdUZXJ1ZyBuYWFyIGluZm9ybWF0aWUnLFxuICAgICAgICAncHQtUFQnOiAnVm9sdGFyIHBhcmEgYSBpbmZvcm1hw6fDo28nLFxuICAgICAgICAncnUtUlUnOiAn0JLQtdGA0L3Rg9GC0YzRgdGPINC6INC40L3RhNC+0YDQvNCw0YbQuNC4JyxcbiAgICAgICAgJ3NsLVNJJzogJ05hemFqIG5hIGluZm9ybWFjaWplJyxcbiAgICAgICAgJ3N2LVNFJzogJ1RpbGxiYWthIHRpbGwgaW5mb3JtYXRpb24nLFxuICAgICAgICB0aDogJ+C4geC4peC4seC4muC5hOC4m+C4l+C4teC5iOC4guC5ieC4reC4oeC4ueC4pScsXG4gICAgICAgIHVrOiAn0J3QsNC30LDQtCDQtNC+INGW0L3RhNC+0YDQvNCw0YbRltGXJyxcbiAgICAgICAgJ3poLUNOJzogJ+i/lOWbnuS/oeaBrycsXG4gICAgICAgICd6aC1UVyc6ICfov5Tlm57kv6Hmga8nXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgICAnZGUtREUnOiAnRW1haWwnLFxuICAgICAgICAnZW4tVVMnOiAnRW1haWwnLFxuICAgICAgICAnZXMtRVMnOiAnQ29ycmVvJyxcbiAgICAgICAgZnI6ICdFbWFpbCcsXG4gICAgICAgIGl0OiAnRW1haWwnLFxuICAgICAgICBqYTogJ+ODoeODvOODq+OCouODieODrOOCuScsXG4gICAgICAgICdyby1STyc6ICdFbWFpbCcsXG4gICAgICAgIGFyOiAn2KjYsdmK2K8g2KfZhNin2YTZg9iq2LHZiNmG2YonLFxuICAgICAgICBjYTogJ0NvcnJldSBlbGVjdHLDsm5pYycsXG4gICAgICAgICdjcy1DWic6ICdFLW1haWxlbScsXG4gICAgICAgICdkYS1ESyc6ICdFIC1tYWlsJyxcbiAgICAgICAgZWw6ICfOl86bzpXOms6kzqHOn86dzpnOms6XIM6UzpnOlc6lzpjOpc6dzqPOlycsXG4gICAgICAgICdoaS1JTic6ICfgpIjgpK7gpYfgpLInLFxuICAgICAgICAna28tS1InOiAn7J2066mU7J28JyxcbiAgICAgICAgJ2xiLUxVJzogJ0VtYWlsJyxcbiAgICAgICAgJ25sLU5MJzogJ0UtbWFpbCcsXG4gICAgICAgICdwdC1QVCc6ICdPIGVtYWlsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ct0LsuINCw0LTRgNC10YEnLFxuICAgICAgICAnc2wtU0knOiAnRS1uYXNsb3YnLFxuICAgICAgICAnc3YtU0UnOiAnRS1wb3N0JyxcbiAgICAgICAgdGg6ICfguK3guLXguYDguKHguKUnLFxuICAgICAgICB1azogJ9CV0LvQtdC60YLRgNC+0L3QvdCwINC/0L7RiNGC0LAnLFxuICAgICAgICAnemgtQ04nOiAn55S15a2Q6YKu5Lu2JyxcbiAgICAgICAgJ3poLVRXJzogJ+mbu+WtkOmDteS7tidcbiAgICB9LFxuICAgIGRlbGl2ZXJ5OiB7XG4gICAgICAgICdkZS1ERSc6ICdMaWVmZXJ1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnRGVsaXZlcnknLFxuICAgICAgICAnZXMtRVMnOiAnRW50cmVnYScsXG4gICAgICAgIGZyOiAnTGl2cmFpc29uJyxcbiAgICAgICAgaXQ6ICdDb25zZWduYScsXG4gICAgICAgIGphOiAn6YWN6YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0xpdnJhcmUnLFxuICAgICAgICBhcjogJ9iq2YjYtdmK2YQnLFxuICAgICAgICBjYTogJ0xsaXVyYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnZG9kw6F2a2EnLFxuICAgICAgICAnZGEtREsnOiAnTGV2ZXJpbmcnLFxuICAgICAgICBlbDogJ86UzrnOsc69zr/OvM6uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkteCkv+CkpOCksOCkoycsXG4gICAgICAgICdrby1LUic6ICfrsLDri6wnLFxuICAgICAgICAnbGItTFUnOiAnTGl3d2VydW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ0xldmVyaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VudHJlZ2EnLFxuICAgICAgICAncnUtUlUnOiAn0JTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICdzbC1TSSc6ICdEb3N0YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0xldmVyYW5zJyxcbiAgICAgICAgdGg6ICfguIjguLHguJTguKrguYjguIcnLFxuICAgICAgICB1azogJ9CU0L7RgdGC0LDQstC60LAnLFxuICAgICAgICAnemgtQ04nOiAn6YCB6LSnJyxcbiAgICAgICAgJ3poLVRXJzogJ+mAgeiyqCdcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ0thcnRlJyxcbiAgICAgICAgJ2VuLVVTJzogJ0NhcmQnLFxuICAgICAgICAnZXMtRVMnOiAnVGFyamV0YScsXG4gICAgICAgIGZyOiAnQ2FydGUnLFxuICAgICAgICBpdDogJ0NhcnRhJyxcbiAgICAgICAgamE6ICfjgqvjg7zjg4knLFxuICAgICAgICAncm8tUk8nOiAnQ2FyZCcsXG4gICAgICAgIGFyOiAn2KjYt9in2YLYqScsXG4gICAgICAgIGNhOiAnVGFyZ2V0YScsXG4gICAgICAgICdjcy1DWic6ICdLYXJ0dScsXG4gICAgICAgICdkYS1ESyc6ICdLb3J0JyxcbiAgICAgICAgZWw6ICfOms6sz4HPhM6xJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCkvuCksOCljeCkoScsXG4gICAgICAgICdrby1LUic6ICfsubTrk5wnLFxuICAgICAgICAnbGItTFUnOiAnS2FhcnQnLFxuICAgICAgICAnbmwtTkwnOiAnS2FhcnQnLFxuICAgICAgICAncHQtUFQnOiAnQ2FydMOjbycsXG4gICAgICAgICdydS1SVSc6ICfQmtCw0YDRgtCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ0thcnRpY2EnLFxuICAgICAgICAnc3YtU0UnOiAnS29ydCcsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LmM4LiUJyxcbiAgICAgICAgdWs6ICfQmtCw0YDRgtC60LAnLFxuICAgICAgICAnemgtQ04nOiAn5Y2h54mHJyxcbiAgICAgICAgJ3poLVRXJzogJ+WNoeeJhydcbiAgICB9LFxuICAgIGVkaXQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ0JlYXJiZWl0ZW4nLFxuICAgICAgICAnZW4tVVMnOiAnRWRpdCcsXG4gICAgICAgICdlcy1FUyc6ICdFZGl0YXInLFxuICAgICAgICBmcjogJ8OJZGl0ZXInLFxuICAgICAgICBpdDogJ01vZGlmaWNhcmUnLFxuICAgICAgICBqYTogJ+e3qOmbhicsXG4gICAgICAgICdyby1STyc6ICdFZGl0YScsXG4gICAgICAgIGFyOiAn2YrYrdix2LEnLFxuICAgICAgICBjYTogJ0VkaXRhJyxcbiAgICAgICAgJ2NzLUNaJzogJ1VwcmF2aXQnLFxuICAgICAgICAnZGEtREsnOiAnUmVkaWdlcmUnLFxuICAgICAgICBlbDogJ86Vz4DOtc6+zrXPgc6zzrHPg86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KS44KSC4KSq4KS+4KSm4KS/4KSkIOCkleCksOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICftjrjsp5HtlZjri6QnLFxuICAgICAgICAnbGItTFUnOiAnRWRpdMOpaWVyZW4nLFxuICAgICAgICAnbmwtTkwnOiAnQmV3ZXJraW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ0VkaXRhcicsXG4gICAgICAgICdydS1SVSc6ICfQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCcsXG4gICAgICAgICdzbC1TSSc6ICdVcmVkaScsXG4gICAgICAgICdzdi1TRSc6ICdSZWRpZ2VyYScsXG4gICAgICAgIHRoOiAn4LmB4LiB4LmJ4LmE4LiCJyxcbiAgICAgICAgdWs6ICfQoNC10LTQsNCz0YPQstCw0YLQuCcsXG4gICAgICAgICd6aC1DTic6ICfnvJbovpEnLFxuICAgICAgICAnemgtVFcnOiAn57eo6LyvJ1xuICAgIH0sXG4gICAgJ25vLXNoaXAnOiB7XG4gICAgICAgICdkZS1ERSc6ICdEaWVzZXIgU2hvcCBsaWVmZXJ0IGxlaWRlciBuaWNodCBhbiBJaHJlbiBTdGFuZG9ydC4nLFxuICAgICAgICAnZW4tVVMnOiAnU29ycnksIHRoaXMgc3RvcmUgZG9lcyBub3Qgc2hpcCB0byB5b3VyIGxvY2F0aW9uLicsXG4gICAgICAgICdlcy1FUyc6ICdMbyBzZW50aW1vcywgZXN0YSB0aWVuZGEgbm8gc2UgZW52w61hIGEgc3UgdWJpY2FjacOzbi4nLFxuICAgICAgICBmcjogJ0TDqXNvbMOpLCBjZSBtYWdhc2luIG5lIGxpdnJlIHBhcyDDoCB2b3RyZSBlbXBsYWNlbWVudC4nLFxuICAgICAgICBpdDogJ1NpYW1vIHNwaWFjZW50aSwgcXVlc3RvIG5lZ296aW8gbm9uIHZpZW5lIHNwZWRpdG8gYWxsYSB0dWEgcG9zaXppb25lLicsXG4gICAgICAgIGphOiAn55Sz44GX6Kiz44GC44KK44G+44Gb44KT44GM44CB44GT44Gu44K544OI44Ki44Gv44GK5L2P44G+44GE44Gu5Zyw5Z+f44Gr55m66YCB44GV44KM44G+44Gb44KT44CCJyxcbiAgICAgICAgJ3JvLVJPJzogJ05lIHBhcmUgcsSDdSwgYWNlc3QgbWFnYXppbiBudSBlc3RlIGxpdnJhdCDDrm4gbG9jYcibaWEgZHZzLicsXG4gICAgICAgIGFyOiAn2LnYsNix2Kcg2Iwg2YfYsNinINin2YTZhdiq2KzYsSDZhNinINmK2LTYrdmGINil2YTZiSDZhdmI2YLYudmDLicsXG4gICAgICAgIGNhOiAnQXF1ZXN0YSBib3RpZ2Egbm8gc1xcJ2VudmlhIGEgbGEgdm9zdHJhIHViaWNhY2nDsy4nLFxuICAgICAgICAnY3MtQ1onOiAnSmUgbsOhbSBsw610bywgdGVudG8gb2JjaG9kIHbDoW0gbmVkb3J1xI3DrW1lLicsXG4gICAgICAgICdkYS1ESyc6ICdCZWtsYWdlciwgZGVubmUgYnV0aWsgc2VuZGVyIGlra2UgdGlsIGRpbiBsb2thdGlvbi4nLFxuICAgICAgICBlbDogJ86bz4XPgM6/z43OvM6xz4PPhM61LCDOsc+Fz4TPjCDPhM6/IM66zrHPhM6sz4PPhM63zrzOsSDOtM61zr0gzrHPgM6/z4PPhM6tzrvOu861z4TOsc65IM+Dz4TOt869IM+Ezr/PgM6/zrjOtc+Dzq/OsSDPg86xz4IuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkleCljeCkt+CkruCkviDgpJXgpLDgpYfgpIIsIOCkr+CkuSDgpLjgpY3gpJ/gpYvgpLAg4KSG4KSq4KSV4KWHIOCkuOCljeCkpeCkvuCkqCDgpKrgpLAg4KS24KS/4KSqIOCkqOCkueClgOCkgiDgpJXgpLDgpKTgpL4g4KS54KWI4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjhOyGoe2VqeuLiOuLpC4g7J20IOyDgeygkOydgCDqt4DtlZjsnZgg7JyE7LmY66GcIOuwsOyGoeuQmOyngCDslYrsirXri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VudHNjaMOrbGxlZ3QsIGTDq3NlIEJ1dHRlayBnw6t0dCBuZXQgb3Agw4RyIExvY2F0aW9uIHZlcnNjaMOpY2t0LicsXG4gICAgICAgICdubC1OTCc6ICdTb3JyeSwgZGV6ZSB3aW5rZWwgdmVyemVuZHQgbmlldCBuYWFyIGpvdXcgbG9jYXRpZS4nLFxuICAgICAgICAncHQtUFQnOiAnRGVzY3VscGUsIGVzdGEgbG9qYSBuw6NvIGVudmlhIHBhcmEgbyBzZXUgbG9jYWwuJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CaINGB0L7QttCw0LvQtdC90LjRjiwg0LTQvtGB0YLQsNCy0LrQsCDQsiDRjdGC0L7RgiDQvNCw0LPQsNC30LjQvSDQvdC1INC+0YHRg9GJ0LXRgdGC0LLQu9GP0LXRgtGB0Y8uJyxcbiAgICAgICAgJ3NsLVNJJzogJ1RhIHRyZ292aW5hIMW+YWwgbmkgZG9zdGF2bGplbmEgbmEgdmHFoW8gbG9rYWNpam8uJyxcbiAgICAgICAgJ3N2LVNFJzogJ0RlbiBow6RyIGJ1dGlrZW4gc2tpY2thcyBpbnRlIHRpbGwgZGluIHBsYXRzLicsXG4gICAgICAgIHRoOiAn4LiC4Lit4Lit4Lig4Lix4LiiIOC4o+C5ieC4suC4meC4hOC5ieC4suC4meC4teC5ieC5hOC4oeC5iOC5hOC4lOC5ieC4iOC4seC4lOC4quC5iOC4h+C5hOC4m+C4ouC4seC4h+C4leC4s+C5geC4q+C4meC5iOC4h+C4guC4reC4h+C4hOC4uOC4kycsXG4gICAgICAgIHVrOiAn0J3QsCDQttCw0LvRjCwg0YbQtdC5INC80LDQs9Cw0LfQuNC9INC90LUg0LTQvtGB0YLQsNCy0LvRj9GU0YLRjNGB0Y8g0LTQviDQstCw0YjQvtCz0L4g0LzRltGB0YbQtdC30L3QsNGF0L7QtNC20LXQvdC90Y8uJyxcbiAgICAgICAgJ3poLUNOJzogJ+aKseatie+8jOi/meWutuWVhuW6l+S4jeWPkei0p+WIsOaCqOaJgOWcqOeahOS9jee9ruOAgicsXG4gICAgICAgICd6aC1UVyc6ICfmirHmrYnvvIzpgJnlrrbllYblupfkuI3nmbzosqjliLDmgqjmiYDlnKjnmoTkvY3nva7jgIInXG4gICAgfSxcbiAgICBwcm9jZXNzaW5nOiB7XG4gICAgICAgICdkZS1ERSc6ICdWZXJhcmJlaXR1bmcnLFxuICAgICAgICAnZW4tVVMnOiAnUHJvY2Vzc2luZycsXG4gICAgICAgICdlcy1FUyc6ICdQcm9jZXNhbWllbnRvJyxcbiAgICAgICAgZnI6ICdUcmFpdGVtZW50JyxcbiAgICAgICAgaXQ6ICdFbGFib3JhemlvbmUnLFxuICAgICAgICBqYTogJ+mAsuihjOS4rScsXG4gICAgICAgICdyby1STyc6ICdQcmVsdWNyYXJlJyxcbiAgICAgICAgYXI6ICfZiti52KfZhNisJyxcbiAgICAgICAgY2E6ICdQcm9jZXNzYW1lbnQnLFxuICAgICAgICAnY3MtQ1onOiAnenByYWNvdsOhdsOhIHNlJyxcbiAgICAgICAgJ2RhLURLJzogJ0ZvcmFyYmVqZG5pbmcnLFxuICAgICAgICBlbDogJ86Vz4DOtc6+zrXPgc6zzrHPg86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS44KSC4KS44KWN4KSV4KSw4KSjJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yymOumrCcsXG4gICAgICAgICdsYi1MVSc6ICdWZXJhYXJiZWNodHVuZycsXG4gICAgICAgICdubC1OTCc6ICdWZXJ3ZXJrZW4nLFxuICAgICAgICAncHQtUFQnOiAnRW0gcHJvY2Vzc2FtZW50bycsXG4gICAgICAgICdydS1SVSc6ICfQntCx0YDQsNCx0L7RgtC60LAnLFxuICAgICAgICAnc2wtU0knOiAnT2JyYXZuYXZhdGknLFxuICAgICAgICAnc3YtU0UnOiAnQmVhcmJldG5pbmcnLFxuICAgICAgICB0aDogJ+C4geC4s+C4peC4seC4h+C4m+C4o+C4sOC4oeC4p+C4peC4nOC4pScsXG4gICAgICAgIHVrOiAn0J7QsdGA0L7QsdC60LAnLFxuICAgICAgICAnemgtQ04nOiAn5Yqg5belJyxcbiAgICAgICAgJ3poLVRXJzogJ+WKoOW3pSdcbiAgICB9LFxuICAgICdwYXltZW50LWZhaWxlZCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1phaGx1bmcgZmVobGdlc2NobGFnZW4nLFxuICAgICAgICAnZW4tVVMnOiAnUGF5bWVudCBmYWlsZWQnLFxuICAgICAgICAnZXMtRVMnOiAnUGFnbyBmYWxsaWRvJyxcbiAgICAgICAgZnI6ICdQYWllbWVudCDDqWNob3XDqScsXG4gICAgICAgIGl0OiAnUGFnYW1lbnRvIG5vbiByaXVzY2l0bycsXG4gICAgICAgIGphOiAn5pSv5omV44GE5aSx5pWXJyxcbiAgICAgICAgJ3JvLVJPJzogJ1BsYXRhIGVzdWF0YScsXG4gICAgICAgIGFyOiAn2LnZhdmE2YrYqSDYp9mE2K/Zgdi5INmB2LTZhNiqJyxcbiAgICAgICAgY2E6ICdFbCBwYWdhbWVudCBoYSBmYWxsYXQnLFxuICAgICAgICAnY3MtQ1onOiAnUGxhdGJhIHNlbGhhbGEnLFxuICAgICAgICAnZGEtREsnOiAnQmV0YWxpbmcgbWlzbHlra2VkZXMnLFxuICAgICAgICBlbDogJ86XIM+AzrvOt8+Bz4nOvM6uIM6xz4DOrc+Ez4XPh861JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkreClgeCkl+CkpOCkvuCkqCDgpIXgpLjgpKvgpLIg4KS54KWB4KSGJyxcbiAgICAgICAgJ2tvLUtSJzogJ+qysOygnCDsi6TtjKgnLFxuICAgICAgICAnbGItTFUnOiAnQmV6dWVsdW5nIGdlc2NoZWl0ZXJ0JyxcbiAgICAgICAgJ25sLU5MJzogJ0JldGFsaW5nIG1pc2x1a3QnLFxuICAgICAgICAncHQtUFQnOiAnUGFnYW1lbnRvIGZhbGhvdScsXG4gICAgICAgICdydS1SVSc6ICfQn9C70LDRgtC10LYg0L3QtSDQv9GA0L7RiNC10LsnLFxuICAgICAgICAnc2wtU0knOiAnUGxhxI1pbG8gbmkgdXNwZWxvJyxcbiAgICAgICAgJ3N2LVNFJzogJ0JldGFsbmluZyBtaXNzbHlja2FkZXMnLFxuICAgICAgICB0aDogJ+C4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4meC4peC5ieC4oeC5gOC4q+C4peC4pycsXG4gICAgICAgIHVrOiAn0J3QtSDQstC00LDQu9C+0YHRjyDQt9C00ZbQudGB0L3QuNGC0Lgg0L/Qu9Cw0YLRltC2JyxcbiAgICAgICAgJ3poLUNOJzogJ+aUr+S7mOWksei0pScsXG4gICAgICAgICd6aC1UVyc6ICfmlK/ku5jlpLHmlZcnXG4gICAgfSxcbiAgICAnZmlyc3QtbmFtZSc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Zvcm5hbWUnLFxuICAgICAgICAnZW4tVVMnOiAnRmlyc3QgbmFtZScsXG4gICAgICAgICdlcy1FUyc6ICdOb21icmUnLFxuICAgICAgICBmcjogJ1Byw6lub20nLFxuICAgICAgICBpdDogJ05vbWUnLFxuICAgICAgICBqYTogJ+WQjScsXG4gICAgICAgICdyby1STyc6ICdOdW1lJyxcbiAgICAgICAgYXI6ICfYp9mE2KfYs9mFINin2YTYo9mI2YQnLFxuICAgICAgICBjYTogJ05vbScsXG4gICAgICAgICdjcy1DWic6ICdKbcOpbm8nLFxuICAgICAgICAnZGEtREsnOiAnRm9ybmF2bicsXG4gICAgICAgIGVsOiAnzp/Ovc6/zrzOsScsXG4gICAgICAgICdoaS1JTic6ICfgpKrgpLngpLLgpL4g4KSo4KS+4KSuJyxcbiAgICAgICAgJ2tvLUtSJzogJ+ydtOumhCcsXG4gICAgICAgICdsYi1MVSc6ICdWaXJudW1tJyxcbiAgICAgICAgJ25sLU5MJzogJ1Zvb3JuYWFtJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ByaW1laXJvIG5vbWUnLFxuICAgICAgICAncnUtUlUnOiAn0JjQvNGPJyxcbiAgICAgICAgJ3NsLVNJJzogJ0ltZScsXG4gICAgICAgICdzdi1TRSc6ICdGw7ZybmFtbicsXG4gICAgICAgIHRoOiAn4LiK4Li34LmI4Lit4LiI4Lij4Li04LiHJyxcbiAgICAgICAgdWs6ICfQhtC8XFwn0Y8nLFxuICAgICAgICAnemgtQ04nOiAn5ZCNJyxcbiAgICAgICAgJ3poLVRXJzogJ+WQjSdcbiAgICB9LFxuICAgICdsYXN0LW5hbWUnOiB7XG4gICAgICAgICdkZS1ERSc6ICdOYWNobmFtZScsXG4gICAgICAgICdlbi1VUyc6ICdMYXN0IG5hbWUnLFxuICAgICAgICAnZXMtRVMnOiAnQXBlbGxpZG8nLFxuICAgICAgICBmcjogJ05vbScsXG4gICAgICAgIGl0OiAnQ29nbm9tZScsXG4gICAgICAgIGphOiAn5aeTJyxcbiAgICAgICAgJ3JvLVJPJzogJ051bWVsZSBkZSBmYW1pbGllJyxcbiAgICAgICAgYXI6ICfYp9mE2YPZhtmK2KknLFxuICAgICAgICBjYTogJ0NvZ25vbScsXG4gICAgICAgICdjcy1DWic6ICdQxZnDrWptZW7DrScsXG4gICAgICAgICdkYS1ESyc6ICdFZnRlcm5hdm4nLFxuICAgICAgICBlbDogJ86Vz4DOr864zrXPhM6/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkieCkquCkqOCkvuCkricsXG4gICAgICAgICdrby1LUic6ICfshLEnLFxuICAgICAgICAnbGItTFUnOiAnRmFtaWxsamVubnVtbScsXG4gICAgICAgICdubC1OTCc6ICdBY2h0ZXJuYWFtJyxcbiAgICAgICAgJ3B0LVBUJzogJ8OabHRpbW8gbm9tZScsXG4gICAgICAgICdydS1SVSc6ICfQpNCw0LzQuNC70LjRjycsXG4gICAgICAgICdzbC1TSSc6ICdQcmlpbWVrJyxcbiAgICAgICAgJ3N2LVNFJzogJ0VmdGVybmFtbicsXG4gICAgICAgIHRoOiAn4LiZ4Liy4Lih4Liq4LiB4Li44LilJyxcbiAgICAgICAgdWs6ICfQn9GA0ZbQt9Cy0LjRidC1JyxcbiAgICAgICAgJ3poLUNOJzogJ+WnkycsXG4gICAgICAgICd6aC1UVyc6ICflp5MnXG4gICAgfSxcbiAgICBwaG9uZToge1xuICAgICAgICAnZGUtREUnOiAnVGVsZWZvbicsXG4gICAgICAgICdlbi1VUyc6ICdQaG9uZSBudW1iZXInLFxuICAgICAgICAnZXMtRVMnOiAnVGVsw6lmb25vJyxcbiAgICAgICAgZnI6ICdUw6lsw6lwaG9uZScsXG4gICAgICAgIGl0OiAnVGVsZWZvbm8nLFxuICAgICAgICBqYTogJ+mbu+ipseeVquWPtycsXG4gICAgICAgICdyby1STyc6ICdUZWxlZm9uJyxcbiAgICAgICAgYXI6ICfYsdmC2YUg2KfZhNmH2KfYqtmBJyxcbiAgICAgICAgY2E6ICdOw7ptZXJvIGRlIHRlbMOoZm9uJyxcbiAgICAgICAgJ2NzLUNaJzogJ1RlbGVmb25uw60gxI3DrXNsbycsXG4gICAgICAgICdkYS1ESyc6ICdUZWxlZm9ubnVtbWVyJyxcbiAgICAgICAgZWw6ICfOpM63zrvOtc+Gz4nOvc65zrrPjCDOvc6/z43OvM61z4HOvycsXG4gICAgICAgICdoaS1JTic6ICfgpKvgpLzgpYvgpKgg4KSo4KSC4KSs4KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yghO2ZlCDrsojtmLgnLFxuICAgICAgICAnbGItTFUnOiAnVGVsZWZvbnNudW1tZXInLFxuICAgICAgICAnbmwtTkwnOiAnVGVsZWZvb25udW1tZXInLFxuICAgICAgICAncHQtUFQnOiAnTsO6bWVybyBkZSB0ZWxlZm9uZScsXG4gICAgICAgICdydS1SVSc6ICfQndC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAnLFxuICAgICAgICAnc2wtU0knOiAnVGVsZWZvbnNrYSDFoXRldmlsa2EnLFxuICAgICAgICAnc3YtU0UnOiAnVGVsZWZvbm51bW1lcicsXG4gICAgICAgIHRoOiAn4Lir4Lih4Liy4Lii4LmA4Lil4LiC4LmC4LiX4Lij4Lio4Lix4Lie4LiX4LmMJyxcbiAgICAgICAgdWs6ICfQotC10LvQtdGE0L7QvdC90LjQuSDQvdC+0LzQtdGAJyxcbiAgICAgICAgJ3poLUNOJzogJ+eUteivneWPt+eggScsXG4gICAgICAgICd6aC1UVyc6ICfpm7voqbHomZ/norwnXG4gICAgfSxcbiAgICBzdHJlZXQ6IHtcbiAgICAgICAgJ2RlLURFJzogJ1N0cmHDn2UgdW5kIEhhdXNudW1tZXInLFxuICAgICAgICAnZW4tVVMnOiAnU3RyZWV0IGFkZHJlc3MnLFxuICAgICAgICAnZXMtRVMnOiAnRGlyZWNjacOzbicsXG4gICAgICAgIGZyOiAnQWRyZXNzZScsXG4gICAgICAgIGl0OiAnSW5kaXJpenpvJyxcbiAgICAgICAgamE6ICfkvY/miYDoqbPntLAnLFxuICAgICAgICAncm8tUk8nOiAnQWRyZXPEgycsXG4gICAgICAgIGFyOiAn2LnZhtmI2KfZhiDYp9mE2LTYp9ix2LknLFxuICAgICAgICBjYTogJ2FkcmXDp2EnLFxuICAgICAgICAnY3MtQ1onOiAnYWRyZXNhIHVsaWNlJyxcbiAgICAgICAgJ2RhLURLJzogJ1Zlam5hdm4nLFxuICAgICAgICBlbDogJ860zrnOtc+NzrjPhc69z4POtycsXG4gICAgICAgICdoaS1JTic6ICfgpJfgpLLgpYAg4KSV4KS+IOCkquCkpOCkvicsXG4gICAgICAgICdrby1LUic6ICfso7zshownLFxuICAgICAgICAnbGItTFUnOiAnU3Ryb29zcyBBZHJlc3MnLFxuICAgICAgICAnbmwtTkwnOiAnd29vbmFkcmVzJyxcbiAgICAgICAgJ3B0LVBUJzogJ2VuZGVyZcOnbyBkYSBSdWEnLFxuICAgICAgICAncnUtUlUnOiAn0LDQtNGA0LXRgSDRg9C70LjRhtGLJyxcbiAgICAgICAgJ3NsLVNJJzogJ25hc2xvdiBjZXN0ZScsXG4gICAgICAgICdzdi1TRSc6ICdHYXR1YWRyZXNzJyxcbiAgICAgICAgdGg6ICfguJfguLXguYjguK3guKLguLnguYjguJbguJnguJknLFxuICAgICAgICB1azogJ9CQ0LTRgNC10YHQsCDQstGD0LvQuNGG0ZYnLFxuICAgICAgICAnemgtQ04nOiAn6KGX6YGT5Zyw5Z2AJyxcbiAgICAgICAgJ3poLVRXJzogJ+ihl+mBk+WcsOWdgCdcbiAgICB9LFxuICAgIGFwdDoge1xuICAgICAgICAnZGUtREUnOiAnQXBhcnRtZW50ICMnLFxuICAgICAgICAnZW4tVVMnOiAnQXB0LiAjJyxcbiAgICAgICAgJ2VzLUVTJzogJ0FwYXJ0YW1lbnRvICMnLFxuICAgICAgICBmcjogJ0FwcGFydGVtZW50ICMnLFxuICAgICAgICBpdDogJ0FwcGFydGFtZW50byAjJyxcbiAgICAgICAgamE6ICfpg6jlsYvnlarlj7fjgarjgaknLFxuICAgICAgICAncm8tUk8nOiAnQXBhcnRhbWVudCAjJyxcbiAgICAgICAgYXI6ICfYtNmC2KkgIycsXG4gICAgICAgIGNhOiAnQXBhcnRhbWVudCAjJyxcbiAgICAgICAgJ2NzLUNaJzogJ0J5dCAjJyxcbiAgICAgICAgJ2RhLURLJzogJ0xlamxpZ2hlZCAjJyxcbiAgICAgICAgZWw6ICfOlM65zrHOvM6tz4HOuc+DzrzOsSAjJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkheCkquCkvuCksOCljeCkn+CkruClh+CkguCknyAjJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yVhO2MjO2KuCAjJyxcbiAgICAgICAgJ2xiLUxVJzogJ0FwcGFydGVtZW50ICMnLFxuICAgICAgICAnbmwtTkwnOiAnQXBwYXJ0ZW1lbnQgIycsXG4gICAgICAgICdwdC1QVCc6ICdBcGFydGFtZW50byAjJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ca0LLQsNGA0YLQuNGA0LAgIycsXG4gICAgICAgICdzbC1TSSc6ICdTdGFub3ZhbmplIMWhdC4nLFxuICAgICAgICAnc3YtU0UnOiAnTMOkZ2VuaGV0ICMnLFxuICAgICAgICB0aDogJ+C4reC4nuC4suC4o+C5jOC4l+C5gOC4oeC5ieC4mSAjJyxcbiAgICAgICAgdWs6ICfQmtCy0LDRgNGC0LjRgNCwIOKElicsXG4gICAgICAgICd6aC1DTic6ICflhazlr5Mg77yDJyxcbiAgICAgICAgJ3poLVRXJzogJ+WFrOWvkyDvvIMnXG4gICAgfSxcbiAgICBwb3N0YWw6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Bvc3RsZWl0emFobCcsXG4gICAgICAgICdlbi1VUyc6ICdQb3N0YWwgY29kZScsXG4gICAgICAgICdlcy1FUyc6ICdDw7NkaWdvIFBvc3RhbCcsXG4gICAgICAgIGZyOiAnQ29kZSBwb3N0YWwnLFxuICAgICAgICBpdDogJ0NvZGljZSBwb3N0YWxlJyxcbiAgICAgICAgamE6ICfpg7Xkvr/nlarlj7cnLFxuICAgICAgICAncm8tUk8nOiAnQ29kIHBvc3RhbCcsXG4gICAgICAgIGFyOiAn2KfZhNix2YXYsiDYp9mE2KjYsdmK2K/ZiicsXG4gICAgICAgIGNhOiAnQ29kaSBQb3N0YWwnLFxuICAgICAgICAnY3MtQ1onOiAnUG/FoXRvdm7DrSBzbcSbcm92YWPDrSDEjcOtc2xvJyxcbiAgICAgICAgJ2RhLURLJzogJ1Bvc3RudW1tZXInLFxuICAgICAgICBlbDogJ86kzrHPh8+FzrTPgc6/zrzOuc66z4zPgiDOms+OzrTOuc66zrHPgicsXG4gICAgICAgICdoaS1JTic6ICfgpKHgpL7gpJUg4KSV4KWL4KShJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yasO2OuCDrsojtmLgnLFxuICAgICAgICAnbGItTFUnOiAnUG9zdGxlaXR6dWVsJyxcbiAgICAgICAgJ25sLU5MJzogJ1Bvc3Rjb2RlJyxcbiAgICAgICAgJ3B0LVBUJzogJ0PDs2RpZ28gcG9zdGFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0L7Rh9GC0L7QstGL0Lkg0JrQvtC0JyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvxaF0bmEgxaF0ZXZpbGthJyxcbiAgICAgICAgJ3N2LVNFJzogJ1Bvc3RudW1tZXInLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC5hOC4m+C4o+C4qeC4k+C4teC4ouC5jCcsXG4gICAgICAgIHVrOiAn0J/QvtGI0YLQvtCy0LjQuSDRltC90LTQtdC60YEnLFxuICAgICAgICAnemgtQ04nOiAn6YKu5pS/57yW56CBJyxcbiAgICAgICAgJ3poLVRXJzogJ+mDteaUv+e3qOeivCdcbiAgICB9LFxuICAgIGNpdHk6IHtcbiAgICAgICAgJ2RlLURFJzogJ1N0YWR0JyxcbiAgICAgICAgJ2VuLVVTJzogJ0NpdHknLFxuICAgICAgICAnZXMtRVMnOiAnQ2l1ZGFkJyxcbiAgICAgICAgZnI6ICdWaWxsZScsXG4gICAgICAgIGl0OiAnQ2l0dGEnLFxuICAgICAgICBqYTogJ+W4gicsXG4gICAgICAgICdyby1STyc6ICdPcmHImScsXG4gICAgICAgIGFyOiAn2YXYr9mK2YbYqScsXG4gICAgICAgIGNhOiAnY2l1dGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ03Em3N0bycsXG4gICAgICAgICdkYS1ESyc6ICdCeScsXG4gICAgICAgIGVsOiAnzqDPjM67zrcnLFxuICAgICAgICAnaGktSU4nOiAn4KS24KS54KSwJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uPhOyLnCcsXG4gICAgICAgICdsYi1MVSc6ICdTdGFkJyxcbiAgICAgICAgJ25sLU5MJzogJ1N0YWQnLFxuICAgICAgICAncHQtUFQnOiAnQ2lkYWRlJyxcbiAgICAgICAgJ3J1LVJVJzogJ9CT0L7RgNC+0LQnLFxuICAgICAgICAnc2wtU0knOiAnTWVzdG8nLFxuICAgICAgICAnc3YtU0UnOiAnU3RhZCcsXG4gICAgICAgIHRoOiAn4LmA4Lih4Li34Lit4LiHJyxcbiAgICAgICAgdWs6ICfQnNGW0YHRgtC+JyxcbiAgICAgICAgJ3poLUNOJzogJ+WfjuW4gicsXG4gICAgICAgICd6aC1UVyc6ICfln47luIInXG4gICAgfSxcbiAgICBwcm92aW5jZToge1xuICAgICAgICAnZGUtREUnOiAnUHJvdmlueicsXG4gICAgICAgICdlbi1VUyc6ICdQcm92aW5jZScsXG4gICAgICAgICdlcy1FUyc6ICdQcm92aW5jaWEnLFxuICAgICAgICBmcjogJ0TDqXBhcnRlbWVudCcsXG4gICAgICAgIGl0OiAnUHJvdmluY2lhJyxcbiAgICAgICAgamE6ICfnnIwnLFxuICAgICAgICAncm8tUk8nOiAnSnVkZXQnLFxuICAgICAgICBhcjogJ9mF2YLYp9i32LnYqScsXG4gICAgICAgIGNhOiAnUHJvdsOtbmNpYScsXG4gICAgICAgICdjcy1DWic6ICdQcm92aW5jaWUnLFxuICAgICAgICAnZGEtREsnOiAnUHJvdmlucycsXG4gICAgICAgIGVsOiAnzpXPgM6xz4HPh86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KWN4KSw4KS+4KSC4KSkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvCcsXG4gICAgICAgICdsYi1MVSc6ICdQcm92w6tueicsXG4gICAgICAgICdubC1OTCc6ICdQcm92aW5jaWUnLFxuICAgICAgICAncHQtUFQnOiAnUHJvdsOtbmNpYScsXG4gICAgICAgICdydS1SVSc6ICfQn9GA0L7QstC40L3RhtC40Y8nLFxuICAgICAgICAnc2wtU0knOiAnUG9rcmFqaW5hJyxcbiAgICAgICAgJ3N2LVNFJzogJ1Byb3ZpbnMnLFxuICAgICAgICB0aDogJ+C4iOC4seC4h+C4q+C4p+C4seC4lCcsXG4gICAgICAgIHVrOiAn0J/RgNC+0LLRltC90YbRltGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+ecgScsXG4gICAgICAgICd6aC1UVyc6ICfnnIEnXG4gICAgfSxcbiAgICAncHJvdmluY2Utc2VsZWN0Jzoge1xuICAgICAgICAnZGUtREUnOiAnV8OkaGxlbiBTaWUgZWluZSBQcm92aW56JyxcbiAgICAgICAgJ2VuLVVTJzogJ1NlbGVjdCBhIFByb3ZpbmNlJyxcbiAgICAgICAgJ2VzLUVTJzogJ1NlbGVjY2lvbmUgdW5hIHByb3ZpbmNpYScsXG4gICAgICAgIGZyOiAnU8OpbGVjdGlvbm5leiB1bmUgcHJvdmluY2UnLFxuICAgICAgICBpdDogJ1NlbGV6aW9uYSB1bmEgcHJvdmluY2lhJyxcbiAgICAgICAgamE6ICfpg73pgZPlupznnIzjgpLpgbjmip4nLFxuICAgICAgICAncm8tUk8nOiAnU2VsZWN0YcibaSBvIHByb3ZpbmNpZScsXG4gICAgICAgIGFyOiAn2KfYrtiq2LEg2KfZhNmF2K3Yp9mB2LjYqScsXG4gICAgICAgIGNhOiAnU2VsZWNjaW9uZXUgdW5hIHByb3bDrW5jaWEnLFxuICAgICAgICAnY3MtQ1onOiAnVnliZXJ0ZSBwcm92aW5jaWknLFxuICAgICAgICAnZGEtREsnOiAnVsOmbGcgZW4gcHJvdmlucycsXG4gICAgICAgIGVsOiAnzpXPgM65zrvOrc6+z4TOtSDOvM65zrEgzrXPgM6xz4HPh86vzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSP4KSVIOCkquCljeCksOCkvuCkguCkpCDgpJXgpL4g4KSa4KSv4KSoIOCkleCksOClh+CkgicsXG4gICAgICAgICdrby1LUic6ICfso7zrpbwg7ISg7YOd7ZWY7Iut7Iuc7JikJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dpZWx0IGVuZyBQcm92w6tueicsXG4gICAgICAgICdubC1OTCc6ICdTZWxlY3RlZXIgZWVuIHByb3ZpbmNpZScsXG4gICAgICAgICdwdC1QVCc6ICdTZWxlY2lvbmUgdW1hIHByb3bDrW5jaWEnLFxuICAgICAgICAncnUtUlUnOiAn0JLRi9Cx0LXRgNC40YLQtSDQv9GA0L7QstC40L3RhtC40Y4nLFxuICAgICAgICAnc2wtU0knOiAnSXpiZXJpdGUgcHJvdmluY28nLFxuICAgICAgICAnc3YtU0UnOiAnVsOkbGogZW4gcHJvdmlucycsXG4gICAgICAgIHRoOiAn4LmA4Lil4Li34Lit4LiB4LiI4Lix4LiH4Lir4Lin4Lix4LiUJyxcbiAgICAgICAgdWs6ICfQktC40LHQtdGA0ZbRgtGMINC/0YDQvtCy0ZbQvdGG0ZbRjicsXG4gICAgICAgICd6aC1DTic6ICfpgInmi6nnnIHku70nLFxuICAgICAgICAnemgtVFcnOiAn6YG45pOH55yB5Lu9J1xuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgICAgJ2RlLURFJzogJ0J1bmRlc2xhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnU3RhdGUnLFxuICAgICAgICAnZXMtRVMnOiAnRXN0YWRvJyxcbiAgICAgICAgZnI6ICfDiXRhdCcsXG4gICAgICAgIGl0OiAnU3RhdG8nLFxuICAgICAgICBqYTogJ+ecjCcsXG4gICAgICAgICdyby1STyc6ICdTdGF0JyxcbiAgICAgICAgYXI6ICfZiNmE2KfZitipJyxcbiAgICAgICAgY2E6ICdFc3RhdCcsXG4gICAgICAgICdjcy1DWic6ICdTdMOhdCcsXG4gICAgICAgICdkYS1ESyc6ICdTdGF0JyxcbiAgICAgICAgZWw6ICfOus6xz4TOrM+Dz4TOsc+DzrcnLFxuICAgICAgICAnaGktSU4nOiAn4KSw4KS+4KSc4KWN4KSvJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yDge2DnCcsXG4gICAgICAgICdsYi1MVSc6ICdTdGFhdCcsXG4gICAgICAgICdubC1OTCc6ICdTdGFhdCcsXG4gICAgICAgICdwdC1QVCc6ICdFc3RhZGEnLFxuICAgICAgICAncnUtUlUnOiAn0KHQvtGB0YLQvtGP0L3QuNC1JyxcbiAgICAgICAgJ3NsLVNJJzogJ0Ryxb5hdmEnLFxuICAgICAgICAnc3YtU0UnOiAnc3RhdCcsXG4gICAgICAgIHRoOiAn4Liq4LiW4Liy4LiZ4LiwJyxcbiAgICAgICAgdWs6ICfQlNC10YDQttCw0LLQsCcsXG4gICAgICAgICd6aC1DTic6ICflt54nLFxuICAgICAgICAnemgtVFcnOiAn5beeJ1xuICAgIH0sXG4gICAgJ3N0YXRlLXNlbGVjdCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1fDpGhsZSBlaW5lbiBTdGFhdCcsXG4gICAgICAgICdlbi1VUyc6ICdTZWxlY3QgYSBTdGF0ZScsXG4gICAgICAgICdlcy1FUyc6ICdTZWxlY2Npb25hIHVuIEVzdGFkbycsXG4gICAgICAgIGZyOiAnU8OpbGVjdGlvbm5lciB1biDDqXRhdCcsXG4gICAgICAgIGl0OiAnU2VsZXppb25hIHVubyBTdGF0bycsXG4gICAgICAgIGphOiAn5bee44KS6YG45oqeJyxcbiAgICAgICAgJ3JvLVJPJzogJ1NlbGVjdGVhemEgdW4gc3RhdCcsXG4gICAgICAgIGFyOiAn2K3Yr9ivINmI2YTYp9mK2KknLFxuICAgICAgICBjYTogJ1NlbGVjY2lvbmV1IHVuIGVzdGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ1Z5YmVydGUgc3TDoXQnLFxuICAgICAgICAnZGEtREsnOiAnVsOmbGcgZW4gc3RhdCcsXG4gICAgICAgIGVsOiAnzpXPgM65zrvOrc6+z4TOtSDOvM65zrEgz4DOv867zrnPhM61zq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpI/gpJUg4KSw4KS+4KSc4KWN4KSvIOCkleCkviDgpJrgpK/gpKgg4KSV4KSw4KWH4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvCDshKDtg50nLFxuICAgICAgICAnbGItTFUnOiAnV2llbHQgZSBTdGFhdCcsXG4gICAgICAgICdubC1OTCc6ICdTZWxlY3RlZXIgZWVuIHN0YWF0JyxcbiAgICAgICAgJ3B0LVBUJzogJ1NlbGVjaW9uZSB1bSBFc3RhZG8nLFxuICAgICAgICAncnUtUlUnOiAn0JLRi9Cx0LXRgNC40YLQtSDRiNGC0LDRgicsXG4gICAgICAgICdzbC1TSSc6ICdJemJlcml0ZSBkcsW+YXZvJyxcbiAgICAgICAgJ3N2LVNFJzogJ1bDpGxqIGVuIHN0YXQnLFxuICAgICAgICB0aDogJ+C5gOC4peC4t+C4reC4geC4o+C4seC4kCcsXG4gICAgICAgIHVrOiAn0JLQuNCx0LXRgNGW0YLRjCDRiNGC0LDRgicsXG4gICAgICAgICd6aC1DTic6ICfpgInmi6nkuIDkuKrlt54nLFxuICAgICAgICAnemgtVFcnOiAn6YG45pOH5LiA5YCL5beeJ1xuICAgIH0sXG4gICAgY291bnR5OiB7XG4gICAgICAgICdkZS1ERSc6ICdCZXppcmsnLFxuICAgICAgICAnZW4tVVMnOiAnQ291bnR5JyxcbiAgICAgICAgJ2VzLUVTJzogJ0NvbmRhZG8nLFxuICAgICAgICBmcjogJ0NvbXTDqScsXG4gICAgICAgIGl0OiAnQ29udGVhJyxcbiAgICAgICAgamE6ICfpg6EnLFxuICAgICAgICAncm8tUk8nOiAnSnVkZcibdWwnLFxuICAgICAgICBhcjogJ9mF2YLYp9i32LnYqScsXG4gICAgICAgIGNhOiAnY29tdGF0JyxcbiAgICAgICAgJ2NzLUNaJzogJ29rcmVzJyxcbiAgICAgICAgJ2RhLURLJzogJ0FtdCcsXG4gICAgICAgIGVsOiAnzprOv868zrfPhM61zq/OsScsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpL7gpIngpILgpJ/gpYAnLFxuICAgICAgICAna28tS1InOiAn6rWwJyxcbiAgICAgICAgJ2xiLUxVJzogJ0dyb2ZzY2hhZnQnLFxuICAgICAgICAnbmwtTkwnOiAnZGlzdHJpY3QnLFxuICAgICAgICAncHQtUFQnOiAnY29uZGFkbycsXG4gICAgICAgICdydS1SVSc6ICfQvtC60YDRg9CzJyxcbiAgICAgICAgJ3NsLVNJJzogJ09rcm/FvmplJyxcbiAgICAgICAgJ3N2LVNFJzogJ0dyZXZza2FwJyxcbiAgICAgICAgdGg6ICfguYDguILguJUnLFxuICAgICAgICB1azogJ9Cf0L7QstGW0YInLFxuICAgICAgICAnemgtQ04nOiAn5Y6/JyxcbiAgICAgICAgJ3poLVRXJzogJ+e4oydcbiAgICB9LFxuICAgIGNvdW50cnk6IHtcbiAgICAgICAgJ2RlLURFJzogJ1fDpGhsZW4gU2llIGVpbiBMYW5kJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NlbGVjdCBhIGNvdW50cnknLFxuICAgICAgICAnZXMtRVMnOiAnU2VsZWNjaW9uZSB1biBwYcOtcycsXG4gICAgICAgIGZyOiAnUGF5cycsXG4gICAgICAgIGl0OiAnU2VsZXppb25hIHVuIHBhZXNlJyxcbiAgICAgICAgamE6ICflm70nLFxuICAgICAgICAncm8tUk8nOiAnU2VsZWN0ZWF6YSBvIHRhcmEnLFxuICAgICAgICBhcjogJ9in2K7YqtixINiv2YjZhNipJyxcbiAgICAgICAgY2E6ICdTZWxlY2Npb25ldSB1biBwYcOtcycsXG4gICAgICAgICdjcy1DWic6ICdWeWJlciB6ZW1pJyxcbiAgICAgICAgJ2RhLURLJzogJ1bDpmxnIGV0IGxhbmQnLFxuICAgICAgICBlbDogJ86Vz4DOuc67zq3Ovs+EzrUgz4fPjs+BzrEnLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWL4KSIIOCkpuClh+CktiDgpJrgpYHgpKjgpYfgpIInLFxuICAgICAgICAna28tS1InOiAn6rWt6rCA66W8IOqzoOultOyLnCDsmKQnLFxuICAgICAgICAnbGItTFUnOiAnV2llbHQgZSBMYW5kJyxcbiAgICAgICAgJ25sLU5MJzogJ1NlbGVjdGVlciBlZW4gbGFuZCcsXG4gICAgICAgICdwdC1QVCc6ICdTZWxlY2lvbmUgdW0gcGFpcycsXG4gICAgICAgICdydS1SVSc6ICfQktGL0LHQtdGA0LjRgtC1INGB0YLRgNCw0L3RgycsXG4gICAgICAgICdzbC1TSSc6ICdJemJlcml0ZSBkcsW+YXZvJyxcbiAgICAgICAgJ3N2LVNFJzogJ1bDpGxqIGV0dCBsYW5kJyxcbiAgICAgICAgdGg6ICfguYDguKXguLfguK3guIHguJvguKPguLDguYDguJfguKgnLFxuICAgICAgICB1azogJ9CS0LjQsdC10YDRltGC0Ywg0LrRgNCw0ZfQvdGDJyxcbiAgICAgICAgJ3poLUNOJzogJ+mAieaLqeS4gOS4quWbveWuticsXG4gICAgICAgICd6aC1UVyc6ICfpgbjmk4fkuIDlgIvlnIvlrrYnXG4gICAgfSxcbiAgICAnY291bnRyeS1sYWJlbCc6IHtcbiAgICAgICAgJ2RlLURFJzogJ0xhbmQnLFxuICAgICAgICAnZW4tVVMnOiAnQ291bnRyeScsXG4gICAgICAgICdlcy1FUyc6ICdQYcOtcycsXG4gICAgICAgIGZyOiAnUGF5cycsXG4gICAgICAgIGl0OiAnTmF6aW9uZScsXG4gICAgICAgIGphOiAn5Zu9JyxcbiAgICAgICAgJ3JvLVJPJzogJ8iaYXLEgycsXG4gICAgICAgIGFyOiAn2K/ZiNmE2KknLFxuICAgICAgICBjYTogJ1Bhw61zJyxcbiAgICAgICAgJ2NzLUNaJzogJ1plbcSbJyxcbiAgICAgICAgZWw6ICfOp8+Oz4HOsScsXG4gICAgICAgICdoaS1JTic6ICfgpKbgpYfgpLYnLFxuICAgICAgICAna28tS1InOiAn6rWt6rCAJyxcbiAgICAgICAgJ2xiLUxVJzogJ0xhbmQnLFxuICAgICAgICAnbmwtTkwnOiAnTGFuZCcsXG4gICAgICAgICdwdC1QVCc6ICdQYcOtcycsXG4gICAgICAgICdydS1SVSc6ICfQodGC0YDQsNC90LAnLFxuICAgICAgICAnc2wtU0knOiAnRHLFvmF2YScsXG4gICAgICAgICdzdi1TRSc6ICdMYW5kJyxcbiAgICAgICAgdGg6ICfguJvguKPguLDguYDguJfguKgnLFxuICAgICAgICB1azogJ9Ca0YDQsNGX0L3QsCcsXG4gICAgICAgICd6aC1DTic6ICflm73lrrYnLFxuICAgICAgICAnemgtVFcnOiAn5ZyL5a62J1xuICAgIH0sXG4gICAgJ29yZGVyLW5vdGVzJzoge1xuICAgICAgICAnZGUtREUnOiAnQmVzdGVsbG5vdGl6ZW4gKG9wdGlvbmFsKTonLFxuICAgICAgICAnZW4tVVMnOiAnT3JkZXIgbm90ZXMgKG9wdGlvbmFsKTonLFxuICAgICAgICAnZXMtRVMnOiAnTm90YXMgZGUgcGVkaWRvIG9wY2lvbmFsOicsXG4gICAgICAgIGZyOiAnTm90ZXMgZGUgY29tbWFuZGUgKGZhY3VsdGF0aWYpOicsXG4gICAgICAgIGl0OiAnTm90ZSBkZWxsXFwnb3JkaW5lIChvcHppb25hbGUpOicsXG4gICAgICAgIGphOiAn5rOo5paH44Oh44Oi77yI44Kq44OX44K344On44OzKTonLFxuICAgICAgICAncm8tUk8nOiAnTm90ZSBkZSBjb21hbmTEgyAob3DIm2lvbmFsKTonLFxuICAgICAgICBhcjogJ9mF2YTYp9it2LjYp9iqINin2YTYt9mE2KggKNin2K7YqtmK2KfYsdmKKTonLFxuICAgICAgICBjYTogJ25vdGVzIGRlIGNvbWFuZGEgKG9wY2lvbmFsKTonLFxuICAgICAgICAnY3MtQ1onOiAncG96bsOhbWt5IGsgb2JqZWRuw6F2Y2UgKHZvbGl0ZWxuw6kpOicsXG4gICAgICAgIGVsOiAnz4POt868zrXOuc+Oz4POtc65z4Igz4DOsc+BzrHOs86zzrXOu86vzrHPgiAoz4DPgc6/zrHOuc+BzrXPhM65zrrPjCk6JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkhuCkpuClh+CktiDgpKjgpYvgpJ/gpY3gpLggKOCkteCliOCkleCksuCljeCkquCkv+CklSk6JyxcbiAgICAgICAgJ2tvLUtSJzogJ+yjvOusuCDrqZTrqqgo7ISg7YOdIOyCrO2VrSk6JyxcbiAgICAgICAgJ2xiLUxVJzogJ0Jlc3RlbGx1bmdzbm90aXplbiAob3B0aW9uYWwpOicsXG4gICAgICAgICdubC1OTCc6ICdiZXN0ZWxub3RpdGllcyAob3B0aW9uZWVsKTonLFxuICAgICAgICAncHQtUFQnOiAnbm90YXMgZG8gcGVkaWRvIChvcGNpb25hbCk6JyxcbiAgICAgICAgJ3J1LVJVJzogJ9C/0YDQuNC80LXRh9Cw0L3QuNGPINC6INC30LDQutCw0LfRgyAo0L3QtdC+0LHRj9C30LDRgtC10LvRjNC90L4pOiAnLFxuICAgICAgICAnc2wtU0knOiAnb3BvbWJlIG8gbmFyb8SNaWx1IChuZW9idmV6bm8pOiAnLFxuICAgICAgICAnc3YtU0UnOiAnYmVzdMOkbGxuaW5nc2FudGVja25pbmdhciAodmFsZnJpdHQpOicsXG4gICAgICAgIHRoOiAn4Lir4Lih4Liy4Lii4LmA4Lir4LiV4Li44LiB4Liy4Lij4Liq4Lix4LmI4LiH4LiL4Li34LmJ4LitICjguYTguKHguYjguJrguLHguIfguITguLHguJopOicsXG4gICAgICAgIHVrOiAn0L/RgNC40LzRltGC0LrQuCDQtNC+INC30LDQvNC+0LLQu9C10L3QvdGPICjQvdC10L7QsdC+0LJcXCfRj9C30LrQvtCy0L4pJyxcbiAgICAgICAgJ3poLUNOJzogJ+iuouWNleWkh+azqO+8iOWPr+mAie+8iTonLFxuICAgICAgICAnemgtVFcnOiAn6KiC5Zau5YKZ6Ki777yI5Y+v6YG477yJOlwiJ1xuICAgIH0sXG4gICAgJ3NvbWV0aGluZy13ZW50LXdyb25nJzoge1xuICAgICAgICAnZGUtREUnOiAnRXMgaXN0IGVpbiBGZWhsZXIgYXVmZ2V0cmV0ZW4sIGFiZXIgZGllIFphaGx1bmcgd3VyZGUgbcO2Z2xpY2hlcndlaXNlIGdlbGVpc3RldC4gQml0dGUgw7xiZXJwcsO8ZmVuIFNpZSBkaWVzLCBiZXZvciBTaWUgZWluZSB3ZWl0ZXJlIEJlc3RlbGx1bmcgYXVmZ2ViZW4uJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBidXQgdGhlIHBheW1lbnQgbWF5IGhhdmUgYmVlbiBtYWRlLiBQbGVhc2UgY2hlY2sgYmVmb3JlIHBsYWNpbmcgYW5vdGhlciBvcmRlci4nLFxuICAgICAgICAnZXMtRVMnOiAnU2UgcHJvZHVqbyB1biBlcnJvciwgcGVybyBlcyBwb3NpYmxlIHF1ZSBzZSBoYXlhIHJlYWxpemFkbyBlbCBwYWdvLiBWZXJpZmlxdWUgYW50ZXMgZGUgcmVhbGl6YXIgb3RybyBwZWRpZG8uJyxcbiAgICAgICAgZnI6ICdVbmUgZXJyZXVyIHNcXCdlc3QgcHJvZHVpdGUsIG1haXMgbGUgcGFpZW1lbnQgYSBwZXV0LcOqdHJlIMOpdMOpIGVmZmVjdHXDqS4gVmV1aWxsZXogdsOpcmlmaWVyIGF2YW50IGRlIHBhc3NlciB1bmUgYXV0cmUgY29tbWFuZGUuJyxcbiAgICAgICAgaXQ6ICdRdWFsY29zYSDDqCBhbmRhdG8gc3RvcnRvLCBtYSBpbCBwYWdhbWVudG8gcG90cmViYmUgZXNzZXJlIHN0YXRvIGVmZmV0dHVhdG8uIFNpIHByZWdhIGRpIGNvbnRyb2xsYXJlIHByaW1hIGRpIGVmZmV0dHVhcmUgdW4gYWx0cm8gb3JkaW5lLicsXG4gICAgICAgIGphOiAn5L2V44GL5ZWP6aGM44GM55m655Sf44GX44G+44GX44Gf44GM44CB5pSv5omV44GE44GM6KGM44KP44KM44Gf5Y+v6IO95oCn44GM44GC44KK44G+44GZ44CCIOWIpeOBruazqOaWh+OCkuOBmeOCi+WJjeOBq+eiuuiqjeOBl+OBpuOBj+OBoOOBleOBhOOAgicsXG4gICAgICAgICdyby1STyc6ICdDZXZhIG51IGEgZnVuY8ibaW9uYXQgY29yZWN0LCBkYXIgZXN0ZSBwb3NpYmlsIGNhIHBsYXRhIHPEgyBmaSBmb3N0IGVmZWN0dWF0xIMuIFbEgyBydWfEg20gc8SDIHZlcmlmaWNhyJtpIMOubmFpbnRlIGRlIGEgcGxhc2EgbyBhbHTEgyBjb21hbmTEgy4nLFxuICAgICAgICBhcjogJ9it2K/YqyDYrti32KMg2YXYpyDYjCDZiNmE2YPZhiDYsdio2YXYpyDYqtmFINin2YTYs9iv2KfYry4g2YrYsdis2Ykg2KfZhNiq2K3ZgtmCINmC2KjZhCDYqtmC2K/ZitmFINi32YTYqCDYotiu2LEuJyxcbiAgICAgICAgY2E6ICdTXFwnaGEgcHJvZHXDr3QgdW4gZXJyb3IsIHBlcsOyIMOpcyBwb3NzaWJsZSBxdWUgc1xcJ2hhZ2kgZWZlY3R1YXQgZWwgcGFnYW1lbnQuIENvbXByb3ZldS1obyBhYmFucyBkZSBmZXIgdW5hIGFsdHJhIGNvbWFuZGEuJyxcbiAgICAgICAgJ2NzLUNaJzogJ07Em2NvIHNlIHBva2F6aWxvLCBhbGUgcGxhdGJhIG1vxb5uw6EgYnlsYSBwcm92ZWRlbmEuIFDFmWVkIHphZMOhbsOtbSBkYWzFocOtIG9iamVkbsOhdmt5IHByb3PDrW0gemtvbnRyb2x1anRlLicsXG4gICAgICAgICdkYS1ESyc6ICdOb2dldCBnaWsgZ2FsdCwgbWVuIGJldGFsaW5nZW4ga2FuIHbDpnJlIGZvcmV0YWdldC4gS29udHJvbGxlciB2ZW5saWdzdCwgZsO4ciBkdSBhZmdpdmVyIGVuIGFuZGVuIG9yZHJlLicsXG4gICAgICAgIGVsOiAnzprOrM+Ezrkgz4DOrs6zzrUgz4PPhM+BzrHOss6sLCDOsc67zrvOrCDOtyDPgM67zrfPgc+JzrzOriDOvM+Azr/Pgc61zq8gzr3OsSDOrc+HzrXOuSDOs86vzr3Otc65LiDOoM6xz4HOsc66zrHOu8+OIM61zrvOrc6zzr7PhM61IM+Az4HOuc69IM66zqzOvc61z4TOtSDOrM67zrvOtyDPgM6xz4HOsc6zzrPOtc67zq/OsS4nLFxuICAgICAgICAnaGktSU4nOiAn4KSV4KWB4KSbIOCkl+CksuCkpCDgpLngpYHgpIYsIOCksuClh+CkleCkv+CkqCDgpLngpYsg4KS44KSV4KSk4KS+IOCkueCliCDgpJXgpL8g4KSt4KWB4KSX4KSk4KS+4KSoIOCkueCliyDgpJfgpK/gpL4g4KS54KWLLiDgpJXgpYPgpKrgpK/gpL4g4KSP4KSVIOCklOCksCDgpIbgpKbgpYfgpLYg4KSm4KWH4KSo4KWHIOCkuOClhyDgpKrgpLngpLLgpYcg4KSc4KS+4KSC4KSaIOCksuClh+CkguClpCcsXG4gICAgICAgICdrby1LUic6ICfrrLjsoJzqsIAg67Cc7IOd7ZaI7KeA66eMIOqysOygnOqwgCDsmYTro4zrkJjsl4jsnYQg7IiYIOyeiOyKteuLiOuLpC4g64uk66W4IOyjvOusuOydhCDtlZjquLAg7KCE7JeQIO2ZleyduO2VmOyLnOq4sCDrsJTrno3ri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VwcGVzIGFzcyBmYWxzY2ggZ2FhbmcsIGF3ZXIgZFxcJ0JlenVlbHVuZyBhc3MgdmzDpGljaHQgZ2VtYWFjaCBnaW5uLiBQcsOpaWZ0IHcuZS5nLiBpZXIgRGlyIGVuZyBhbmVyIEJlc3RlbGx1bmcgcGxhesOpaWVydC4nLFxuICAgICAgICAnbmwtTkwnOiAnRXIgaXMgaWV0cyBtaXNnZWdhYW4sIG1hYXIgZGUgYmV0YWxpbmcga2FuIHppam4gZ2VkYWFuLiBDb250cm9sZWVyIGRpdCB2b29yZGF0IHUgZWVuIG5pZXV3ZSBiZXN0ZWxsaW5nIHBsYWF0c3QuJyxcbiAgICAgICAgJ3B0LVBUJzogJ0FsZ28gZGV1IGVycmFkbywgbWFzIG8gcGFnYW1lbnRvIHBvZGUgdGVyIHNpZG8gZmVpdG8uIFBvciBmYXZvciwgdmVyaWZpcXVlIGFudGVzIGRlIGZhemVyIG91dHJvIHBlZGlkby4nLFxuICAgICAgICAncnUtUlUnOiAn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0L3QviDQvtC/0LvQsNGC0LAg0LzQvtCz0LvQsCDQsdGL0YLRjCDQv9GA0L7QuNC30LLQtdC00LXQvdCwLiDQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0LXRgNC10LQg0YDQsNC30LzQtdGJ0LXQvdC40LXQvCDQtNGA0YPQs9C+0LPQviDQt9Cw0LrQsNC30LAuJyxcbiAgICAgICAgJ3NsLVNJJzogJ05la2FqIGplIMWhbG8gbmFyb2JlLCBtb3JkYSBwYSBqZSBiaWxvIHBsYcSNaWxvIGl6dmVkZW5vLiBQcmVkZW4gb2RkYXRlIG5vdm8gbmFyb8SNaWxvLCBwcmV2ZXJpdGUuJyxcbiAgICAgICAgJ3N2LVNFJzogJ07DpWdvdCBnaWNrIGZlbCwgbWVuIGJldGFsbmluZ2VuIGthbiBoYSBnam9ydHMuIEtvbnRyb2xsZXJhIGlubmFuIGR1IGfDtnIgZW4gYW5uYW4gYmVzdMOkbGxuaW5nLicsXG4gICAgICAgIHRoOiAn4Lih4Li14Lia4Liy4LiH4Lit4Lii4LmI4Liy4LiH4Lic4Li04LiU4Lie4Lil4Liy4LiUIOC5geC4leC5iOC4reC4suC4iOC4oeC4teC4geC4suC4o+C4iuC4s+C4o+C4sOC5gOC4h+C4tOC4meC5geC4peC5ieC4pyDguYLguJvguKPguJTguJXguKPguKfguIjguKrguK3guJrguIHguYjguK3guJnguJfguLPguIHguLLguKPguKrguLHguYjguIfguIvguLfguYnguK3guK3guLfguYjguJknLFxuICAgICAgICB1azogJ9Cp0L7RgdGMINC/0ZbRiNC70L4g0L3QtSDRgtCw0LosINCw0LvQtSDQvtC/0LvQsNGC0LAsINC80L7QttC70LjQstC+LCDQsdGD0LvQsCDQt9C00ZbQudGB0L3QtdC90LAuINCR0YPQtNGMINC70LDRgdC60LAsINC/0LXRgNC10LLRltGA0YLQtSwg0L/QtdGA0Ygg0L3RltC2INGA0L7QsdC40YLQuCDRltC90YjQtSDQt9Cw0LzQvtCy0LvQtdC90L3Rjy4nLFxuICAgICAgICAnemgtQ04nOiAn5Ye65LqG54K56Zeu6aKY77yM5L2G5Y+v6IO95bey5LuY5qy+44CCIOivt+WcqOS4i+WPpuS4gOS4quiuouWNleS5i+WJjeajgOafpeOAgicsXG4gICAgICAgICd6aC1UVyc6ICflh7rkuobpu57llY/poYzvvIzkvYblj6/og73lt7Lku5jmrL7jgIIg6KuL5Zyo5LiL5Y+m5LiA5YCL6KiC5Zau5LmL5YmN5qqi5p+l44CCJ1xuICAgIH0sXG4gICAgJ3NvbWV0aGluZy13ZW50LXdyb25nLW9yZGVyJzoge1xuICAgICAgICAnZGUtREUnOiAnRXR3YXMgaXN0IHNjaGllZiBnZWxhdWZlbiwgYWJlciBrZWluZSBTb3JnZS4gV2lyIGhhYmVuIElocmUgQmVzdGVsbGRhdGVuIHVuZCBJaHJlIFphaGx1bmcgaXN0IGVyZm9sZ3QuIEVpbmUgd2VpdGVyZSBCZXN0ZWxsdW5nIGlzdCBuaWNodCBlcmZvcmRlcmxpY2guJyxcbiAgICAgICAgJ2VuLVVTJzogJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBidXQgZG9uXFwndCB3b3JyeS4gV2UgaGF2ZSB5b3VyIG9yZGVyIGRldGFpbHMsIGFuZCB5b3VyIHBheW1lbnQgaGFzIGJlZW4gbWFkZS4gVGhlcmUgaXMgbm8gbmVlZCB0byBwbGFjZSBhbm90aGVyIG9yZGVyLicsXG4gICAgICAgICdlcy1FUyc6ICdBbGdvIHNhbGnDsyBtYWwsIHBlcm8gbm8gc2UgcHJlb2N1cGUuIFRlbmVtb3MgbG9zIGRldGFsbGVzIGRlIHN1IHBlZGlkbyB5IHN1IHBhZ28gc2UgaGEgcmVhbGl6YWRvLiBObyBlcyBuZWNlc2FyaW8gcmVhbGl6YXIgb3RybyBwZWRpZG8uJyxcbiAgICAgICAgZnI6ICdRdWVscXVlIGNob3NlIHNcXCdlc3QgbWFsIHBhc3PDqSwgbWFpcyBuZSB2b3VzIGlucXVpw6l0ZXogcGFzLiBOb3VzIGF2b25zIGxlcyBkw6l0YWlscyBkZSB2b3RyZSBjb21tYW5kZSBldCB2b3RyZSBwYWllbWVudCBhIMOpdMOpIGVmZmVjdHXDqS4gSWwgblxcJ2VzdCBwYXMgbsOpY2Vzc2FpcmUgZGUgcGFzc2VyIHVuZSBhdXRyZSBjb21tYW5kZS4nLFxuICAgICAgICBpdDogJ1F1YWxjb3NhIMOoIGFuZGF0byBzdG9ydG8sIG1hIG5vbiBwcmVvY2N1cGFydGkuIEFiYmlhbW8gaSBkZXR0YWdsaSBkZWwgdHVvIG9yZGluZSBlIGlsIHBhZ2FtZW50byDDqCBzdGF0byBlZmZldHR1YXRvLiBOb24gw6ggbmVjZXNzYXJpbyBlZmZldHR1YXJlIHVuIGFsdHJvIG9yZGluZS4nLFxuICAgICAgICBqYTogJ+S9leOBi+WVj+mhjOOBjOeZuueUn+OBl+OBvuOBl+OBn+OBjOOAgeW/g+mFjeOBl+OBquOBhOOBp+OBj+OBoOOBleOBhOOAgiDjgZTms6jmlofjga7oqbPntLDjgYzjgYLjgorjgIHjgYrmlK/miZXjgYTjgYzlrozkuobjgZfjgb7jgZfjgZ/jgIIg5Yil44Gu5rOo5paH44KS44GZ44KL5b+F6KaB44Gv44GC44KK44G+44Gb44KT44CCJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NldmEgYSBtZXJzIHByb3N0LCBkYXIgbnUgdsSDIGZhY2XIm2kgZ3JpamkuIEF2ZW0gZGV0YWxpaWxlIGNvbWVuemlpIGR2cy4gyJlpIHBsYXRhIGR2cy4gYSBmb3N0IGVmZWN0dWF0xIMuIE51IGVzdGUgbmV2b2llIHPEgyBwbGFzYcibaSBvIGFsdMSDIGNvbWFuZMSDLicsXG4gICAgICAgIGFyOiAn2K3Yr9irINiu2LfYoyDZhdinINiMINmE2YPZhiDZhNinINiq2YLZhNmCLiDZhNiv2YrZhtinINiq2YHYp9i12YrZhCDYt9mE2KjZgyDYjCDZiNmC2K8g2KrZhSDYs9iv2KfYryDYr9mB2LnYqtmDLiDZhNmK2LPYqiDZh9mG2KfZgyDYrdin2KzYqSDZhNiq2YLYr9mK2YUg2LfZhNioINii2K7YsS4nLFxuICAgICAgICBjYTogJ1NcXCdoYSBwcm9kdcOvdCB1biBlcnJvciwgcGVyw7Igbm8gdXMgcHJlb2N1cGV1LiBUZW5pbSBsZXMgZGFkZXMgZGUgbGEgdm9zdHJhIGNvbWFuZGEgaSBz4oCZaGEgZWZlY3R1YXQgZWwgcGFnYW1lbnQuIE5vIGNhbCBmZXIgdW5hIGFsdHJhIGNvbWFuZGEuJyxcbiAgICAgICAgJ2NzLUNaJzogJ07Em2NvIHNlIHBva2F6aWxvLCBhbGUgbmVib2p0ZSBzZS4gTcOhbWUgcG9kcm9ibm9zdGkgbyB2YcWhw60gb2JqZWRuw6F2Y2UgYSB2YcWhZSBwbGF0YmEgYnlsYSBwcm92ZWRlbmEuIE5lbsOtIHTFmWViYSB6YWTDoXZhdCBkYWzFocOtIG9iamVkbsOhdmt1LicsXG4gICAgICAgICdkYS1ESyc6ICdOb2dldCBnaWsgZ2FsdCwgbWVuIGJhcmUgcm9saWcuIFZpIGhhciBkaW5lIG9yZHJlb3BseXNuaW5nZXIsIG9nIGRpbiBiZXRhbGluZyBlciBmb3JldGFnZXQuIERldCBlciBpa2tlIG7DuGR2ZW5kaWd0IGF0IGFmZ2l2ZSBlbiBhbmRlbiBvcmRyZS4nLFxuICAgICAgICBlbDogJ86azqzPhM65IM+Azq7Os861IM+Dz4TPgc6xzrLOrCwgzrHOu867zqwgzrzOt869IM6xzr3Ot8+Dz4XPh861zq/PhM61LiDOiM+Hzr/Phc68zrUgz4TOsSDPg8+Ezr/Ouc+HzrXOr86xIM+EzrfPgiDPgM6xz4HOsc6zzrPOtc67zq/Osc+CIM+DzrHPgiDOus6xzrkgzrcgz4DOu863z4HPic68zq4gz4POsc+CIM6tz4fOtc65IM+Az4HOsc6zzrzOsc+Ezr/PgM6/zrnOt864zrXOry4gzpTOtc69IM+Hz4HOtc65zqzOts61z4TOsc65IM69zrEgzrrOrM69zrXPhM61IM6szrvOu863IM+AzrHPgc6xzrPOs861zrvOr86xLicsXG4gICAgICAgICdoaS1JTic6ICfgpJXgpYHgpJsg4KSX4KSy4KSkIOCkueCliyDgpJfgpK/gpL4sIOCksuClh+CkleCkv+CkqCDgpJrgpL/gpILgpKTgpL4g4KSoIOCkleCksOClh+CkguClpCDgpLngpK7gpL7gpLDgpYcg4KSq4KS+4KS4IOCkhuCkquCkleClhyDgpIbgpKbgpYfgpLYg4KSV4KS+IOCkteCkv+CkteCksOCkoyDgpLngpYgsIOCklOCksCDgpIbgpKrgpJXgpL4g4KSt4KWB4KSX4KSk4KS+4KSoIOCkleCksCDgpKbgpL/gpK/gpL4g4KSX4KSv4KS+IOCkueCliOClpCDgpKbgpYLgpLjgpLDgpL4g4KSG4KSm4KWH4KS2IOCkpuClh+CkqOClhyDgpJXgpYAg4KSV4KWL4KSIIOCkhuCkteCktuCljeCkr+CkleCkpOCkviDgpKjgpLngpYDgpIIg4KS54KWI4KWkJyxcbiAgICAgICAgJ2tvLUtSJzogJ+usuOygnOqwgCDrsJzsg53tlojsp4Drp4wg6rGx7KCV7ZWY7KeAIOuniOyEuOyalC4g7KO866y4IOyEuOu2gOygleuztOqwgCDsnojsnLzrqbAg6rKw7KCc6rCAIOyZhOujjOuQmOyXiOyKteuLiOuLpC4g64uk66W4IOyjvOusuOydhCDtlaAg7ZWE7JqU6rCAIOyXhuyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRXBwZXMgYXNzIGZhbHNjaCBnYWFuZywgYXdlciBtYWFjaCBkZXIga2VuZyBTdWVyZ2VuLiBNaXIgaHVubiDDhHIgQmVzdGVsbHVuZ3NkZXRhaWxlciwgYW4gw4RyIEJlenVlbHVuZyBnb3VmIGdlbWFhY2guIEV0IGFzcyBuZXQgbsOpaWRlZyBlbmcgYW5lciBCZXN0ZWxsdW5nIHplIG1hYWNoZW4uJyxcbiAgICAgICAgJ25sLU5MJzogJ0VyIGlzIGlldHMgbWlzZ2VnYWFuLCBtYWFyIG1hYWsgamUgZ2VlbiB6b3JnZW4uIFdlIGhlYmJlbiB1dyBiZXN0ZWxnZWdldmVucyBlbiB1dyBiZXRhbGluZyBpcyBnZWRhYW4uIEhldCBpcyBuaWV0IG5vZGlnIG9tIG5vZyBlZW4gYmVzdGVsbGluZyB0ZSBwbGFhdHNlbi4nLFxuICAgICAgICAncHQtUFQnOiAnQWxnbyBkZXUgZXJyYWRvLCBtYXMgbsOjbyBzZSBwcmVvY3VwZS4gVGVtb3Mgb3MgZGV0YWxoZXMgZG8gc2V1IHBlZGlkbyBlIHNldSBwYWdhbWVudG8gZm9pIGVmZXR1YWRvLiBOw6NvIGjDoSBuZWNlc3NpZGFkZSBkZSBmYXplciBvdXRybyBwZWRpZG8uJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSDQstC+0LvQvdGD0LnRgtC10YHRjC4g0KMg0L3QsNGBINC10YHRgtGMINC00LDQvdC90YvQtSDQviDQstCw0YjQtdC8INC30LDQutCw0LfQtSwg0Lgg0LLQsNGIINC/0LvQsNGC0LXQtiDQsdGL0Lsg0L/RgNC+0LjQt9Cy0LXQtNC10L0uINCe0YfQtdGA0LXQtNC90L7QuSDQt9Cw0LrQsNC3INC00LXQu9Cw0YLRjCDQvdC1INC90YPQttC90L4uJyxcbiAgICAgICAgJ3NsLVNJJzogJ05la2FqIGplIMWhbG8gbmFyb2JlLCB2ZW5kYXIgbmUgc2tyYml0ZS4gUG9kYXRrZSBvIG5hcm/EjWlsdSBpbWFtbyBpbiBwbGHEjWlsbyBqZSBiaWxvIG9wcmF2bGplbm8uIERydWdlZ2EgbmFyb8SNaWxhIG5pIHRyZWJhIG9kZGF0aS4nLFxuICAgICAgICAnc3YtU0UnOiAnTsOlZ290IGdpY2sgZmVsLCBtZW4gb3JvYSBkaWcgaW50ZS4gVmkgaGFyIGRpbmEgYmVzdMOkbGxuaW5nc3VwcGdpZnRlciBvY2ggZGluIGJldGFsbmluZyBoYXIgZ2pvcnRzLiBEZXQgZmlubnMgaW5nZW4gYW5sZWRuaW5nIGF0dCBnw7ZyYSBlbiBhbm5hbiBiZXN0w6RsbG5pbmcuJyxcbiAgICAgICAgdGg6ICfguKHguLXguJrguLLguIfguK3guKLguYjguLLguIfguJzguLTguJTguJ7guKXguLLguJQg4LmB4LiV4LmI4LmE4Lih4LmI4LiV4LmJ4Lit4LiH4LiB4Lix4LiH4Lin4LilIOC5gOC4o+C4suC4oeC4teC4o+C4suC4ouC4peC4sOC5gOC4reC4teC4ouC4lOC4geC4suC4o+C4quC4seC5iOC4h+C4i+C4t+C5ieC4reC4guC4reC4h+C4hOC4uOC4k+C5geC4peC4sOC4iuC4s+C4o+C4sOC5gOC4h+C4tOC4meC5gOC4o+C4teC4ouC4muC4o+C5ieC4reC4ouC5geC4peC5ieC4pyDguYTguKHguYjguIjguLPguYDguJvguYfguJnguJXguYnguK3guIfguJfguLPguIHguLLguKPguKrguLHguYjguIfguIvguLfguYnguK3guK3guLfguYjguJknLFxuICAgICAgICB1azogJ9Cp0L7RgdGMINC/0ZbRiNC70L4g0L3QtSDRgtCw0LosINCw0LvQtSDQvdC1INGF0LLQuNC70Y7QudGC0LXRgdGMLiDQoyDQvdCw0YEg0ZQg0LTQsNC90ZYg0LLQsNGI0L7Qs9C+INC30LDQvNC+0LLQu9C10L3QvdGPLCDRliDQstCw0Ygg0L/Qu9Cw0YLRltC2INC30LTRltC50YHQvdC10L3Qvi4g0J3QtdC80LDRlCDQvdC10L7QsdGF0ZbQtNC90L7RgdGC0ZYg0YDQvtCx0LjRgtC4INGW0L3RiNC1INC30LDQvNC+0LLQu9C10L3QvdGPLicsXG4gICAgICAgICd6aC1DTic6ICflh7rkuobngrnpl67popjvvIzkvYbliKvmi4Xlv4PjgIIg5oiR5Lus5pyJ5oKo55qE6K6i5Y2V6K+m57uG5L+h5oGv77yM5oKo55qE5LuY5qy+5bey5a6M5oiQ44CCIOaXoOmcgOWGjeS4i+iuouWNleOAgicsXG4gICAgICAgICd6aC1UVyc6ICflh7rkuobpu57llY/poYzvvIzkvYbliKXmk5Tlv4PjgIIg5oiR5YCR5pyJ5oKo55qE6KiC5Zau6Kmz57Sw5L+h5oGv77yM5oKo55qE5LuY5qy+5bey5a6M5oiQ44CCIOeEoemcgOWGjeS4i+ioguWWruOAgidcbiAgICB9LFxuICAgICdkZWxpdmVyeS1kYXRlJzoge1xuICAgICAgICAnZGUtREUnOiAnTGllZmVydGVybWluJyxcbiAgICAgICAgJ2VuLVVTJzogJ0RlbGl2ZXJ5IGRhdGUnLFxuICAgICAgICAnZXMtRVMnOiAnRmVjaGEgZGUgZW50cmVnYScsXG4gICAgICAgIGZyOiAnRGF0ZSBkZSBsaXZyYWlzb24nLFxuICAgICAgICBpdDogJ0RhdGEgZGkgY29uc2VnbmEnLFxuICAgICAgICBqYTogJ+mFjemAgeaXpScsXG4gICAgICAgICdyby1STyc6ICdEYXRhIGxpdnLEg3JpaScsXG4gICAgICAgIGFyOiAn2KrYp9ix2YrYriDYp9mE2KrYs9mE2YrZhSDYp9mIINin2YTZiNi12YjZhCcsXG4gICAgICAgIGNhOiAnRGF0YSBkZSBsbGl1cmFtZW50JyxcbiAgICAgICAgJ2NzLUNaJzogJ0RhdHVtIGRvcnXEjWVuw60nLFxuICAgICAgICAnZGEtREsnOiAnTGV2ZXJpbmdzZGF0bycsXG4gICAgICAgIGVsOiAnzpfOvM61z4HOv868zrfOvc6vzrEgz4DOsc+BzqzOtM6/z4POt8+CJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkoeCkv+CksuClgOCkteCksOClgCDgpJXgpYAg4KSk4KS+4KSw4KWA4KSWJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwsOyGoSDrgqDsp5wnLFxuICAgICAgICAnbGItTFUnOiAnTGl3d2VydW5nc2RhdHVtJyxcbiAgICAgICAgJ25sLU5MJzogJ0Jlem9yZ2RhdHVtJyxcbiAgICAgICAgJ3B0LVBUJzogJ0RhdGEgZGUgZW50cmVnYScsXG4gICAgICAgICdydS1SVSc6ICfQlNCw0YLQsCDQtNC+0YHRgtCw0LLQutC4JyxcbiAgICAgICAgJ3NsLVNJJzogJ0RhdHVtIGRvc3RhdmUnLFxuICAgICAgICAnc3YtU0UnOiAnTGV2ZXJhbnNkYXR1bScsXG4gICAgICAgIHRoOiAn4Lin4Lix4LiZ4LiX4Li14LmI4LiI4Lix4LiU4Liq4LmI4LiHJyxcbiAgICAgICAgdWs6ICfQlNCw0YLQsCDQtNC+0YHRgtCw0LLQutC4JyxcbiAgICAgICAgJ3poLUNOJzogJ+mCruWvhOaXpeacnycsXG4gICAgICAgICd6aC1UVyc6ICfpg7Xlr4Tml6XmnJ8nXG4gICAgfSxcbiAgICAnZmlyc3QtcmVuZXdhbC1kYXRlJzoge1xuICAgICAgICAnZGUtREUnOiAnRXJzdGUgVmVybMOkbmdlcnVuZycsXG4gICAgICAgICdlbi1VUyc6ICdGaXJzdCByZW5ld2FsJyxcbiAgICAgICAgJ2VzLUVTJzogJ1ByaW1lcmEgcmVub3ZhY2nDs24nLFxuICAgICAgICBmcjogJ1ByZW1pZXIgcmVub3V2ZWxsZW1lbnQnLFxuICAgICAgICBpdDogJ1ByaW1vIFJpbm5vdm8nLFxuICAgICAgICBqYTogJ+acgOWIneOBruabtOaWsCcsXG4gICAgICAgICdyby1STyc6ICdQcmltYSByZcOubm5vaXJlJyxcbiAgICAgICAgYXI6ICfYp9mE2KrYrNiv2YrYryDYp9mE2KPZiNmEJyxcbiAgICAgICAgY2E6ICdQcmltZXJhIHJlbm92YWNpw7MnLFxuICAgICAgICAnY3MtQ1onOiAnUHJ2bsOtIG9ibm92YScsXG4gICAgICAgICdkYS1ESyc6ICdGw7hyc3RlIGZvcm55ZWxzZScsXG4gICAgICAgIGVsOiAnzqDPgc+Oz4TOtyDOsc69zrHOvc6tz4nPg863JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCkueCksuCkviDgpKjgpLXgpYDgpKjgpYDgpJXgpLDgpKMnLFxuICAgICAgICAna28tS1InOiAn7LKrIOuyiOynuCDqsLHsi6AnLFxuICAgICAgICAnbGItTFUnOiAnw4lpc2NodCBFcm5laWVydW5nJyxcbiAgICAgICAgJ25sLU5MJzogJ0VlcnN0ZSB2ZXJsZW5naW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1ByaW1laXJhIHJlbm92YcOnw6NvJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LXRgNCy0L7QtSDQvtCx0L3QvtCy0LvQtdC90LjQtScsXG4gICAgICAgICdzbC1TSSc6ICdQcnZhIG9ibm92YScsXG4gICAgICAgICdzdi1TRSc6ICdGw7Zyc3RhIGbDtnJueWVsc2VuJyxcbiAgICAgICAgdGg6ICfguJXguYjguK3guK3guLLguKLguLjguITguKPguLHguYnguIfguYHguKPguIEnLFxuICAgICAgICB1azogJ9Cf0LXRgNGI0LUg0L7QvdC+0LLQu9C10L3QvdGPJyxcbiAgICAgICAgJ3poLUNOJzogJ+esrOS4gOasoee7reiuoicsXG4gICAgICAgICd6aC1UVyc6ICfnrKzkuIDmrKHnuozoqIInXG4gICAgfSxcbiAgICAnc3Vic2NyaXB0aW9uLXN1bW1hcnknOiB7XG4gICAgICAgICdkZS1ERSc6ICdXaWVkZXJrZWhyZW5kZSBTdW1tZScsXG4gICAgICAgICdlbi1VUyc6ICdSZWN1cnJpbmcgdG90YWwnLFxuICAgICAgICAnZXMtRVMnOiAnVG90YWwgcmVjdXJyZW50ZScsXG4gICAgICAgIGZyOiAnVG90YWwgcsOpY3VycmVudCcsXG4gICAgICAgIGl0OiAnVG90YWxlIHJpY29ycmVudGUnLFxuICAgICAgICBqYTogJ+Wumuacn+WQiOioiCcsXG4gICAgICAgICdyby1STyc6ICdUb3RhbCByZWN1cmVudCcsXG4gICAgICAgIGFyOiAn2KfZhNmF2KzZhdmI2Lkg2KfZhNmF2KrZg9ix2LEnLFxuICAgICAgICBjYTogJ1RvdGFsIHJlY3VycmVudCcsXG4gICAgICAgICdjcy1DWic6ICdPcGFrdWrDrWPDrSBzZSBjZWxrZW0nLFxuICAgICAgICAnZGEtREsnOiAnVGlsYmFnZXZlbmRlbmRlIHRvdGFsJyxcbiAgICAgICAgZWw6ICfOlc+AzrHOvc6xzrvOsc68zrLOsc69z4zOvM61zr3OvyDPg8+Nzr3Ov867zr8nLFxuICAgICAgICAnaGktSU4nOiAn4KSG4KS14KSw4KWN4KSk4KWAIOCkleClgeCksicsXG4gICAgICAgICdrby1LUic6ICfrsJjrs7Ug7ZWp6rOEJyxcbiAgICAgICAgJ2xiLUxVJzogJ1dpZGRlcmh1ZWxlbmQgVG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnVGVydWdrZXJlbmQgdG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1RvdGFsIHJlY29ycmVudGUnLFxuICAgICAgICAncnUtUlUnOiAn0J/QvtCy0YLQvtGA0Y/RjtGJ0LDRj9GB0Y8g0YHRg9C80LzQsCcsXG4gICAgICAgICdzbC1TSSc6ICdQb25hdmxqYWpvxI1lIHNlIHNrdXBhaicsXG4gICAgICAgICdzdi1TRSc6ICfDhXRlcmtvbW1hbmRlIHRvdGFsdCcsXG4gICAgICAgIHRoOiAn4Lii4Lit4LiU4Lij4Lin4Lih4LiX4Li14LmI4LmA4LiB4Li04LiU4LiL4LmJ4LizJyxcbiAgICAgICAgdWs6ICfQn9C+0LLRgtC+0YDRjtCy0LDQvdCwINGB0YPQvNCwJyxcbiAgICAgICAgJ3poLUNOJzogJ+e7j+W4uOaAp+aAu+iuoScsXG4gICAgICAgICd6aC1UVyc6ICfntpPluLjmgKfnuL3oqIgnXG4gICAgfSxcbiAgICAnaW5pdGlhbC1zdW1tYXJ5Jzoge1xuICAgICAgICAnZGUtREUnOiAnQW5mYW5nc3N1bW1lJyxcbiAgICAgICAgJ2VuLVVTJzogJ0luaXRpYWwgdG90YWwnLFxuICAgICAgICAnZXMtRVMnOiAnVG90YWwgaW5pY2lhbCcsXG4gICAgICAgIGZyOiAnVG90YWwgaW5pdGlhbCcsXG4gICAgICAgIGl0OiAnVG90YWxlIGluaXppYWxlJyxcbiAgICAgICAgamE6ICfliJ3mnJ/lkIjoqIgnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwgaW5pyJtpYWwnLFxuICAgICAgICBhcjogJ9in2YTZhdis2YXZiNi5INin2YTYo9mI2YTZiicsXG4gICAgICAgIGNhOiAnVG90YWwgaW5pY2lhbCcsXG4gICAgICAgICdjcy1DWic6ICdQb8SNw6F0ZcSNbsOtIGNlbGtlbScsXG4gICAgICAgICdkYS1ESyc6ICdJbmRsZWRlbmRlIHRvdGFsJyxcbiAgICAgICAgZWw6ICfOkc+Bz4fOuc66z4wgz4PPjc69zr/Ou86/JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCljeCksOCkvuCksOCkguCkreCkv+CklSDgpJXgpYHgpLInLFxuICAgICAgICAna28tS1InOiAn7LSI6riwIO2VqeqzhCcsXG4gICAgICAgICdsYi1MVSc6ICdVZmFua3MgdG90YWwnLFxuICAgICAgICAnbmwtTkwnOiAnSW5pdGllZWwgdG90YWFsJyxcbiAgICAgICAgJ3B0LVBUJzogJ1RvdGFsIGluaWNpYWwnLFxuICAgICAgICAncnUtUlUnOiAn0JjRgdGF0L7QtNC90LDRjyDRgdGD0LzQvNCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1phxI1ldG5pIHNlxaF0ZXZlaycsXG4gICAgICAgICdzdi1TRSc6ICdJbml0aWFsIHN1bW1hJyxcbiAgICAgICAgdGg6ICfguKLguK3guJTguKPguKfguKHguYDguKPguLTguYjguKHguJXguYnguJknLFxuICAgICAgICB1azogJ9Cf0L7Rh9Cw0YLQutC+0LLQsCDRgdGD0LzQsCcsXG4gICAgICAgICd6aC1DTic6ICfliJ3lp4vmgLvmlbAnLFxuICAgICAgICAnemgtVFcnOiAn5Yid5aeL57i95pW4J1xuICAgIH0sXG4gICAgJ3JlY3VycmluZy1zaGlwcGluZyc6IHtcbiAgICAgICAgJ2RlLURFJzogJ1dpZWRlcmtlaHJlbmRlciBWZXJzYW5kJyxcbiAgICAgICAgJ2VuLVVTJzogJ1JlY3VycmluZyBzaGlwcGluZycsXG4gICAgICAgICdlcy1FUyc6ICdFbnbDrW9zIHJlY3VycmVudGVzJyxcbiAgICAgICAgZnI6ICdFeHDDqWRpdGlvbiByw6ljdXJyZW50ZScsXG4gICAgICAgIGl0OiAnVG90YWxlIGluaXppYWxlJyxcbiAgICAgICAgamE6ICflrprmnJ/phY3pgIEnLFxuICAgICAgICAncm8tUk8nOiAnVG90YWwgaW5pyJtpYWwnLFxuICAgICAgICBhcjogJ9in2YTYtNit2YYg2KfZhNmF2KrZg9ix2LEnLFxuICAgICAgICBjYTogJ0VudmlhbWVudCBwZXJpw7JkaWMnLFxuICAgICAgICAnY3MtQ1onOiAnT3Bha292YW7DoSBkb3ByYXZhJyxcbiAgICAgICAgJ2RhLURLJzogJ1RpbGJhZ2V2ZW5kZW5kZSBmb3JzZW5kZWxzZScsXG4gICAgICAgIGVsOiAnzpXPgM6xzr3Osc67zrHOvM6yzrHOvc+MzrzOtc69zrcgzrHPgM6/z4PPhM6/zrvOricsXG4gICAgICAgICdoaS1JTic6ICfgpIbgpLXgpLDgpY3gpKTgpYAg4KS24KS/4KSq4KS/4KSC4KSXJyxcbiAgICAgICAgJ2tvLUtSJzogJ+uwmOuztSDrsLDshqEnLFxuICAgICAgICAnbGItTFUnOiAnV2lkZGVyaHVlbGVuZCBWZXJzYW5kJyxcbiAgICAgICAgJ25sLU5MJzogJ1RlcnVna2VyZW5kZSB2ZXJ6ZW5kaW5nJyxcbiAgICAgICAgJ3B0LVBUJzogJ1JlbWVzc2EgcmVjb3JyZW50ZScsXG4gICAgICAgICdydS1SVSc6ICfQn9C10YDQuNC+0LTQuNGH0LXRgdC60LDRjyDQtNC+0YHRgtCw0LLQutCwJyxcbiAgICAgICAgJ3NsLVNJJzogJ1BvbmF2bGpham/EjWEgc2UgZG9zdGF2YScsXG4gICAgICAgICdzdi1TRSc6ICfDhXRlcmtvbW1hbmRlIGZyYWt0JyxcbiAgICAgICAgdGg6ICfguKrguYjguIfguKrguLTguJnguITguYnguLLguJvguKPguLDguIjguLMnLFxuICAgICAgICB1azogJ9Cf0L7QstGC0L7RgNC90LAg0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfnu4/luLjmgKfov5DovpMnLFxuICAgICAgICAnemgtVFcnOiAn57aT5bi45oCn6YGL6Ly4J1xuICAgIH0sXG4gICAgJ2luaXRpYWwtc2hpcHBpbmcnOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcnN0ZXIgVmVyc2FuZCcsXG4gICAgICAgICdlbi1VUyc6ICdJbml0aWFsIHNoaXBwaW5nJyxcbiAgICAgICAgJ2VzLUVTJzogJ0VudsOtbyBpbmljaWFsJyxcbiAgICAgICAgZnI6ICdFeHDDqWRpdGlvbiBpbml0aWFsZScsXG4gICAgICAgIGl0OiAnU3BlZGl6aW9uZSBpbml6aWFsZScsXG4gICAgICAgIGphOiAn5Yid5pyf55m66YCBJyxcbiAgICAgICAgJ3JvLVJPJzogJ0V4cGVkaWVyZSBpbmnIm2lhbMSDJyxcbiAgICAgICAgYXI6ICfYp9mE2LTYrdmGINin2YTYo9mI2YTZiicsXG4gICAgICAgIGNhOiAnRW52aWFtZW50IGluaWNpYWwnLFxuICAgICAgICAnY3MtQ1onOiAnUG/EjcOhdGXEjW7DrSBvZGVzbMOhbsOtJyxcbiAgICAgICAgJ2RhLURLJzogJ0bDuHJzdGUgZm9yc2VuZGVsc2UnLFxuICAgICAgICBlbDogJ86Rz4HPh865zrrOriDOsc+Azr/Pg8+Ezr/Ou86uJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCljeCksOCkvuCksOCkguCkreCkv+CklSDgpLbgpL/gpKrgpL/gpILgpJcnLFxuICAgICAgICAna28tS1InOiAn7LSI6riwIOuwsOyGoScsXG4gICAgICAgICdsYi1MVSc6ICdVZmFua3MgVmVyc2FuZCcsXG4gICAgICAgICdubC1OTCc6ICdFZXJzdGUgdmVyemVuZGluZycsXG4gICAgICAgICdwdC1QVCc6ICdFbnZpbyBpbmljaWFsJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cf0LXRgNCy0L7QvdCw0YfQsNC70YzQvdCw0Y8g0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICdzbC1TSSc6ICdaYcSNZXRuYSBkb3N0YXZhJyxcbiAgICAgICAgJ3N2LVNFJzogJ0bDtnJzdGEgZnJha3RlbicsXG4gICAgICAgIHRoOiAn4LiB4Liy4Lij4LiI4Lix4LiU4Liq4LmI4LiH4Liq4Li04LiZ4LiE4LmJ4Liy4LmA4Lia4Li34LmJ4Lit4LiH4LiV4LmJ4LiZJyxcbiAgICAgICAgdWs6ICfQn9C+0YfQsNGC0LrQvtCy0LAg0LTQvtGB0YLQsNCy0LrQsCcsXG4gICAgICAgICd6aC1DTic6ICfliJ3lp4vov5DovpMnLFxuICAgICAgICAnemgtVFcnOiAn5Yid5aeL6YGL6Ly4J1xuICAgIH0sXG4gICAgJ2FjY291bnQtcGFzc3dvcmQtZXhwbGFuYXRpb24nOiB7XG4gICAgICAgICdkZS1ERSc6ICdFcnN0ZWxsZW4gU2llIGVpbiBuZXVlcyBQYXNzd29ydCBvZGVyIHZlcndlbmRlbiBTaWUgZWluIGJlc3RlaGVuZGVzLCB3ZW5uIFNpZSBiZXJlaXRzIGVpbiBLb250byBmw7xyIC4gaGFiZW4nLFxuICAgICAgICAnZW4tVVMnOiAnQ3JlYXRlIGEgbmV3IHBhc3N3b3JkLCBvciB1c2UgYW4gZXhpc3Rpbmcgb25lIGlmIHlvdSBhbHJlYWR5IGhhdmUgYW4gYWNjb3VudCBmb3InLFxuICAgICAgICAnZXMtRVMnOiAnQ3JlZSB1bmEgbnVldmEgY29udHJhc2XDsWEgbyB1c2UgdW5hIGV4aXN0ZW50ZSBzaSB5YSB0aWVuZSB1bmEgY3VlbnRhLiB0ZW5lcicsXG4gICAgICAgIGZyOiAnQ3LDqWV6IHVuIG5vdXZlYXUgbW90IGRlIHBhc3NlIG91IHV0aWxpc2V6LWVuIHVuIGV4aXN0YW50IHNpIHZvdXMgYXZleiBkw6lqw6AgdW4gY29tcHRlIHBvdXInLFxuICAgICAgICBpdDogJ0NyZWEgdW5hIG51b3ZhIHBhc3N3b3JkIG8gdXNhbmUgdW5hIGVzaXN0ZW50ZSBzZSBoYWkgZ2nDoCB1biBhY2NvdW50IHBlcicsXG4gICAgICAgIGphOiAn5paw44GX44GE44OR44K544Ov44O844OJ44KS5L2c5oiQ44GZ44KL44GL44CB44GZ44Gn44Gr44Ki44Kr44Km44Oz44OI44KS44GK5oyB44Gh44Gu5aC05ZCI44Gv5pei5a2Y44Gu44OR44K544Ov44O844OJ44KS5L2/55So44GX44Gm44GP44Gg44GV44GEJyxcbiAgICAgICAgJ3JvLVJPJzogJ0NyZWHIm2kgbyBwYXJvbMSDIG5vdcSDIHNhdSB1dGlsaXphyJtpIHVuYSBleGlzdGVudMSDIGRhY8SDIGF2ZcibaSBkZWphIHVuIGNvbnQgcGVudHJ1JyxcbiAgICAgICAgYXI6ICfYo9mG2LTYpiDZg9mE2YXYqSDZhdix2YjYsSDYrNiv2YrYr9ipINiMINij2Ygg2KfYs9iq2K7Yr9mFINmD2YTZhdipINmF2LHZiNixINmF2YjYrNmI2K/YqSDYpdiw2Kcg2YPYp9mGINmE2K/ZitmDINio2KfZhNmB2LnZhCDYrdiz2KfYqCDZhNmAJyxcbiAgICAgICAgY2E6ICdDcmVldSB1bmEgY29udHJhc2VueWEgbm92YSBvIHV0aWxpdHpldS1uZSB1bmEgc2kgamEgdGVuaXUgdW4gY29tcHRlJyxcbiAgICAgICAgJ2NzLUNaJzogJ1Z5dHZvxZl0ZSBub3bDqSBoZXNsbyBuZWJvIHBvdcW+aWp0ZSBzdMOhdmFqw61jw60sIHBva3VkIGppxb4gbcOhdGUgw7rEjWV0JyxcbiAgICAgICAgJ2RhLURLJzogJ09wcmV0IGVuIG55IGFkZ2FuZ3Nrb2RlLCBlbGxlciBicnVnIGVuIGVrc2lzdGVyZW5kZSwgaHZpcyBkdSBhbGxlcmVkZSBoYXIgZW4ga29udG8gdGlsJyxcbiAgICAgICAgZWw6ICfOlM63zrzOuc6/z4XPgc6zzq7Pg8+EzrUgzq3Ovc6xzr0gzr3Orc6/IM66z4nOtM65zrrPjCDPgM+Bz4zPg86yzrHPg863z4Igzq4gz4fPgc63z4POuc68zr/PgM6/zrnOrs+Dz4TOtSDOrc69zrHOvSDPhc+AzqzPgc+Hzr/Ovc+EzrEsIM61zqzOvSDOrc+HzrXPhM61IM6uzrTOtyDOu86/zrPOsc+BzrnOsc+DzrzPjCcsXG4gICAgICAgICdoaS1JTic6ICfgpI/gpJUg4KSo4KSv4KS+IOCkquCkvuCkuOCkteCksOCljeCkoSDgpKzgpKjgpL7gpI/gpIIsIOCkr+CkviDgpJXgpL/gpLjgpYAg4KSu4KWM4KSc4KWC4KSm4KS+IOCkquCkvuCkuOCkteCksOCljeCkoSDgpJXgpL4g4KSJ4KSq4KSv4KWL4KSXIOCkleCksOClh+CkgiDgpK/gpKbgpL8g4KSG4KSq4KSV4KWHIOCkquCkvuCkuCDgpKrgpLngpLLgpYcg4KS44KWHIOCkueClgCDgpI/gpJUg4KSW4KS+4KSk4KS+IOCkueCliCcsXG4gICAgICAgICdrby1LUic6ICfsg4gg67mE67CA67KI7Zi466W8IOyDneyEse2VmOqxsOuCmCDsnbTrr7gg6rOE7KCV7J20IOyeiOuKlCDqsr3smrAg6riw7KG0IOu5hOuwgOuyiO2YuOulvCDsgqzsmqntlZjsi63si5zsmKQuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0Vyc3RlbGx0IGVuIG5laXQgUGFzc3d1ZXJ0LCBvZGVyIGJlbm90enQgZW4gZXhpc3RlbnQgUGFzc3d1ZXJ0IHdhbm4gRGlyIHNjaG9ubiBlIEtvbnQgaHV0dCcsXG4gICAgICAgICdubC1OTCc6ICdNYWFrIGVlbiBuaWV1dyB3YWNodHdvb3JkIGFhbiwgb2YgZ2VicnVpayBlZW4gYmVzdGFhbmQgd2FjaHR3b29yZCBhbHMgamUgYWwgZWVuIGFjY291bnQgaGVidCB2b29yJyxcbiAgICAgICAgJ3B0LVBUJzogJ0NyaWUgdW1hIG5vdmEgc2VuaGEgb3UgdXNlIHVtYSBleGlzdGVudGUgc2Ugdm9jw6ogasOhIHRpdmVyIHVtYSBjb250YSBwYXJhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Ch0L7Qt9C00LDQudGC0LUg0L3QvtCy0YvQuSDQv9Cw0YDQvtC70Ywg0LjQu9C4INC40YHQv9C+0LvRjNC30YPQudGC0LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC5LCDQtdGB0LvQuCDRgyDQstCw0YEg0YPQttC1INC10YHRgtGMINGD0YfQtdGC0L3QsNGPINC30LDQv9C40YHRjCDQtNC70Y8nLFxuICAgICAgICAnc2wtU0knOiAnVXN0dmFyaXRlIG5vdm8gZ2VzbG8gYWxpIHVwb3JhYml0ZSBvYnN0b2plxI1lLCDEjWUgxb5lIGltYXRlIHJhxI11bicsXG4gICAgICAgICdzdi1TRSc6ICdTa2FwYSBldHQgbnl0dCBsw7ZzZW5vcmQsIGVsbGVyIGFudsOkbmQgZXR0IGJlZmludGxpZ3Qgb20gZHUgcmVkYW4gaGFyIGV0dCBrb250byBmw7ZyJyxcbiAgICAgICAgdGg6ICfguKrguKPguYnguLLguIfguKPguKvguLHguKrguJzguYjguLLguJnguYPguKvguKHguYjguKvguKPguLfguK3guYPguIrguYnguKPguKvguLHguKrguJzguYjguLLguJnguJfguLXguYjguKHguLXguK3guKLguLnguYjguJbguYnguLLguITguLjguJPguKHguLXguJrguLHguI3guIrguLXguKrguLPguKvguKPguLHguJonLFxuICAgICAgICB1azogJ9Ch0YLQstC+0YDRltGC0Ywg0L3QvtCy0LjQuSDQv9Cw0YDQvtC70Ywg0LDQsdC+INCy0LjQutC+0YDQuNGB0YLQvtCy0YPQudGC0LUg0ZbRgdC90YPRjtGH0LjQuSwg0Y/QutGJ0L4g0YMg0LLQsNGBINCy0LbQtSDRlCDQvtCx0LvRltC60L7QstC40Lkg0LfQsNC/0LjRgScsXG4gICAgICAgICd6aC1DTic6ICfliJvlu7rkuIDkuKrmlrDlr4bnoIHvvIzlpoLmnpzmgqjlt7Lnu4/mnInkuIDkuKrluJDmiLfvvIzliJnkvb/nlKjnjrDmnInnmoTlr4bnoIEnLFxuICAgICAgICAnemgtVFcnOiAn5Ym15bu65LiA5YCL5paw5a+G56K877yM5aaC5p6c5oKo5bey57aT5pyJ5LiA5YCL5biz5oi277yM5YmH5L2/55So54++5pyJ55qE5a+G56K8J1xuICAgIH0sXG4gICAgJ2FjY291bnQtcGFzc3dvcmQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdQYXNzd29ydCcsXG4gICAgICAgICdlbi1VUyc6ICdQYXNzd29yZCcsXG4gICAgICAgICdlcy1FUyc6ICdDbGF2ZScsXG4gICAgICAgIGZyOiAnTW90IGRlIHBhc3NlJyxcbiAgICAgICAgaXQ6ICdQYXJvbGEgZFxcJ29yZGluZScsXG4gICAgICAgIGphOiAn44OR44K544Ov44O844OJJyxcbiAgICAgICAgJ3JvLVJPJzogJ1Bhcm9sYScsXG4gICAgICAgIGFyOiAn2YPZhNmF2Ycg2KfZhNiz2LEnLFxuICAgICAgICBjYTogJ0NvbnRyYXNlbnlhJyxcbiAgICAgICAgJ2NzLUNaJzogJ0hlc2xvJyxcbiAgICAgICAgJ2RhLURLJzogJ0FkZ2FuZ3Nrb2RlJyxcbiAgICAgICAgZWw6ICfOms+JzrTOuc66z4zPgiDPgM+Bz4zPg86yzrHPg863z4InLFxuICAgICAgICAnaGktSU4nOiAn4KSq4KS+4KS44KS14KSw4KWN4KShJyxcbiAgICAgICAgJ2tvLUtSJzogJ+u5hOuwgOuyiO2YuCcsXG4gICAgICAgICdsYi1MVSc6ICdQYXNzd3VlcnQnLFxuICAgICAgICAnbmwtTkwnOiAnV2FjaHR3b29yZCcsXG4gICAgICAgICdwdC1QVCc6ICdTZW5oYScsXG4gICAgICAgICdydS1SVSc6ICfQn9Cw0YDQvtC70YwnLFxuICAgICAgICAnc2wtU0knOiAnR2VzbG8nLFxuICAgICAgICAnc3YtU0UnOiAnTMO2c2Vub3JkJyxcbiAgICAgICAgdGg6ICfguKPguKvguLHguKrguJzguYjguLLguJknLFxuICAgICAgICB1azogJ9Cf0LDRgNC+0LvRjCcsXG4gICAgICAgICd6aC1DTic6ICflr4bnoIEnLFxuICAgICAgICAnemgtVFcnOiAn5a+G56K8J1xuICAgIH0sXG4gICAgJ2ludmFsaWQtbWVyY2hhbnQtcGFzc3dvcmQnOiB7XG4gICAgICAgICdkZS1ERSc6ICdEYXMgZWluZ2VnZWJlbmUgUGFzc3dvcnQgbXVzcyBtaW5kZXN0ZW5zIDggWmVpY2hlbiBsYW5nIHNlaW4uJyxcbiAgICAgICAgJ2VuLVVTJzogJ1RoZSBwYXNzd29yZCBlbnRlcmVkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcuJyxcbiAgICAgICAgJ2VzLUVTJzogJ0xhIGNvbnRyYXNlw7FhIGluZ3Jlc2FkYSBkZWJlIHRlbmVyIGFsIG1lbm9zIDggY2FyYWN0ZXJlcy4nLFxuICAgICAgICBmcjogJ0xlIG1vdCBkZSBwYXNzZSBzYWlzaSBkb2l0IGNvbXBvcnRlciBhdSBtb2lucyA4IGNhcmFjdMOocmVzLicsXG4gICAgICAgIGl0OiAnTGEgcGFzc3dvcmQgaW5zZXJpdGEgZGV2ZSBlc3NlcmUgbHVuZ2EgYWxtZW5vIDggY2FyYXR0ZXJpLicsXG4gICAgICAgIGphOiAn5YWl5Yqb44GZ44KL44OR44K544Ov44O844OJ44GvOOaWh+Wtl+S7peS4iuOBp+OBguOCi+W/heimgeOBjOOBguOCiuOBvuOBmeOAgicsXG4gICAgICAgICdyby1STyc6ICdQYXJvbGEgaW50cm9kdXPEgyB0cmVidWllIHPEgyBhaWLEgyBjZWwgcHXIm2luIDggY2FyYWN0ZXJlLicsXG4gICAgICAgIGFyOiAn2YrYrNioINij2YYg2KrYqtmD2YjZhiDZg9mE2YXYqSDYp9mE2YXYsdmI2LEg2KfZhNmF2K/YrtmE2Kkg2YXZhiA4INij2K3YsdmBINi52YTZiSDYp9mE2KPZgtmELicsXG4gICAgICAgIGNhOiAnTGEgY29udHJhc2VueWEgaW50cm9kdcOvZGEgaGEgZGUgdGVuaXIgY29tIGEgbcOtbmltIDggY2Fyw6BjdGVycy4nLFxuICAgICAgICAnY3MtQ1onOiAnWmFkYW7DqSBoZXNsbyBtdXPDrSBtw610IGFsZXNwb8WIIDggem5ha8WvLicsXG4gICAgICAgICdkYS1ESyc6ICdEZW4gaW5kdGFzdGVkZSBhZGdhbmdza29kZSBza2FsIHbDpnJlIG1pbmRzdCA4IHRlZ24gbGFuZy4nLFxuICAgICAgICBlbDogJ86fIM66z4nOtM65zrrPjM+CIM+Az4HPjM+DzrLOsc+DzrfPgiDPgM6/z4Ugzq3Ph861zrkgzrXOuc+DzrHPh864zrXOryDPgM+Bzq3PgM61zrkgzr3OsSDOrc+HzrXOuSDPhM6/z4XOu86sz4fOuc+Dz4TOv869IDggz4fOsc+BzrHOus+Ezq7Pgc61z4IuJyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkpuCksOCljeCknCDgpJXgpL/gpK/gpL4g4KSX4KSv4KS+IOCkquCkvuCkuOCkteCksOCljeCkoSDgpJXgpK4g4KS44KWHIOCkleCkriA4IOCkteCksOCljeCkoyDgpLLgpILgpKzgpL4g4KS54KWL4KSo4KS+IOCkmuCkvuCkueCkv+Ckj+ClpCcsXG4gICAgICAgICdrby1LUic6ICfsnoXroKXtlZwg67mE67CA67KI7Zi464qUIDjsnpAg7J207IOB7J207Ja07JW8IO2VqeuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnRFxcJ1Bhc3N3dWVydCBkYXQgYWdpbm4gYXNzIG11c3Mgb3AgZFxcJ21hbm5zdCA4IFplZWNoZSBsYWFuZyBzaW5uLicsXG4gICAgICAgICdubC1OTCc6ICdIZXQgaW5nZXZvZXJkZSB3YWNodHdvb3JkIG1vZXQgbWluaW1hYWwgOCB0ZWtlbnMgbGFuZyB6aWpuLicsXG4gICAgICAgICdwdC1QVCc6ICdBIHNlbmhhIGluc2VyaWRhIGRldmUgdGVyIHBlbG8gbWVub3MgOCBjYXJhY3RlcmVzLicsXG4gICAgICAgICdydS1SVSc6ICfQktCy0LXQtNC10L3QvdGL0Lkg0L/QsNGA0L7Qu9GMINC00L7Qu9C20LXQvSDRgdC+0YHRgtC+0Y/RgtGMINC90LUg0LzQtdC90LXQtSDRh9C10Lwg0LjQtyA4INGB0LjQvNCy0L7Qu9C+0LIuJyxcbiAgICAgICAgJ3NsLVNJJzogJ1ZuZXNlbm8gZ2VzbG8gbW9yYSBiaXRpIGRvbGdvIG5ham1hbmogOCB6bmFrb3YuJyxcbiAgICAgICAgJ3N2LVNFJzogJ0zDtnNlbm9yZGV0IG3DpXN0ZSB2YXJhIG1pbnN0IDggdGVja2VuIGzDpW5ndC4nLFxuICAgICAgICB0aDogJ+C4o+C4q+C4seC4quC4nOC5iOC4suC4meC4l+C4teC5iOC4m+C5ieC4reC4meC4leC5ieC4reC4h+C4oeC4teC4hOC4p+C4suC4oeC4ouC4suC4p+C4reC4ouC5iOC4suC4h+C4meC5ieC4reC4oiA4IOC4leC4seC4p+C4reC4seC4geC4qeC4oycsXG4gICAgICAgIHVrOiAn0JLQstC10LTQtdC90LjQuSDQv9Cw0YDQvtC70Ywg0L/QvtCy0LjQvdC10L0g0LzRltGB0YLQuNGC0Lgg0L3QtSDQvNC10L3RiNC1IDgg0YHQuNC80LLQvtC70ZbQsi4nLFxuICAgICAgICAnemgtQ04nOiAn6L6T5YWl55qE5a+G56CB6ZW/5bqm5b+F6aG76Iez5bCR5Li6IDgg5Liq5a2X56ym44CCJyxcbiAgICAgICAgJ3poLVRXJzogJ+i8uOWFpeeahOWvhueivOmVt+W6puW/hemgiOiHs+WwkeeCuiA4IOWAi+Wtl+espuOAgidcbiAgICB9LFxuICAgIHVua25vd246IHtcbiAgICAgICAgJ2RlLURFJzogJ1VuYmVrYW5udCcsXG4gICAgICAgICdlbi1VUyc6ICdVbmtub3duJyxcbiAgICAgICAgJ2VzLUVTJzogJ0Rlc2Nvbm9jaWRvJyxcbiAgICAgICAgZnI6ICdJbmNvbm51JyxcbiAgICAgICAgaXQ6ICdTY29ub3NjaXV0bycsXG4gICAgICAgIGphOiAn5LiN5piOJyxcbiAgICAgICAgJ3JvLVJPJzogJ05lY3Vub3NjdXQnLFxuICAgICAgICBhcjogJ9mF2KzZh9mI2YQnLFxuICAgICAgICBjYTogJ0Rlc2NvbmVndXQnLFxuICAgICAgICAnY3MtQ1onOiAnTmV6bsOhbcO9JyxcbiAgICAgICAgJ2RhLURLJzogJ1VrZW5kdCcsXG4gICAgICAgIGVsOiAnzpHOs869z4nPg8+Ezr/PgicsXG4gICAgICAgICdoaS1JTic6ICfgpIXgpKjgpJzgpL7gpKgnLFxuICAgICAgICAna28tS1InOiAn7JWM66Ck7KeA7KeAIOyViuydgCcsXG4gICAgICAgICdsYi1MVSc6ICdPbmJla2FubnQnLFxuICAgICAgICAnbmwtTkwnOiAnT25iZWtlbmQnLFxuICAgICAgICAncHQtUFQnOiAnRGVzY29uaGVjaWRhJyxcbiAgICAgICAgJ3J1LVJVJzogJ9Cd0LXQuNC30LLQtdGB0YLQvdGL0LknLFxuICAgICAgICAnc2wtU0knOiAnTmV6bmFubycsXG4gICAgICAgICdzdi1TRSc6ICdPa8OkbmQnLFxuICAgICAgICB0aDogJ+C5hOC4oeC5iOC4o+C4ueC5ieC4iOC4seC4gScsXG4gICAgICAgIHVrOiAn0J3QtdCy0ZbQtNC+0LzQuNC5JyxcbiAgICAgICAgJ3poLUNOJzogJ+acquefpScsXG4gICAgICAgICd6aC1UVyc6ICfmnKrnn6UnXG4gICAgfSxcbiAgICAndGVzdC1tb2RlLWJhbm5lcic6IHtcbiAgICAgICAgJ2RlLURFJzogJ1Rlc3Rtb2R1czogS3VuZGVuIGvDtm5uZW4gUGVhY2hQYXkgbmljaHQgc2VoZW4nLFxuICAgICAgICAnZW4tVVMnOiAnVGVzdCBtb2RlOiBjdXN0b21lcnMgY2Fubm90IHNlZSBQZWFjaFBheScsXG4gICAgICAgICdlcy1FUyc6ICdNb2RvIGRlIHBydWViYTogbG9zIGNsaWVudGVzIG5vIHB1ZWRlbiB2ZXIgUGVhY2hQYXknLFxuICAgICAgICBmcjogJ01vZGUgdGVzdCA6IGxlcyBjbGllbnRzIG5lIHBldXZlbnQgcGFzIHZvaXIgUGVhY2hQYXknLFxuICAgICAgICBpdDogJ01vZGFsaXTDoCB0ZXN0OiBpIGNsaWVudGkgbm9uIHBvc3Nvbm8gdmVkZXJlIFBlYWNoUGF5JyxcbiAgICAgICAgamE6ICfjg4bjgrnjg4jjg6Ljg7zjg4nvvJrpoaflrqLjga9QZWFjaFBheeOCkuimi+OCi+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCkycsXG4gICAgICAgICdyby1STyc6ICdNb2QgZGUgdGVzdGFyZTogY2xpZW7Im2lpIG51IHBvdCB2ZWRlYSBQZWFjaFBheScsXG4gICAgICAgIGFyOiAn2YjYtti5INin2YTYp9iu2KrYqNin2LE6INmE2Kcg2YrZhdmD2YYg2YTZhNi52YXZhNin2KEg2LHYpNmK2KkgUGVhY2hQYXknLFxuICAgICAgICBjYTogJ01vZGUgZGUgcHJvdmE6IGVscyBjbGllbnRzIG5vIHBvZGVuIHZldXJlIFBlYWNoUGF5JyxcbiAgICAgICAgJ2NzLUNaJzogJ1Rlc3RvdmFjw60gcmXFvmltOiB6w6FrYXpuw61jaSBuZXZpZMOtIFBlYWNoUGF5JyxcbiAgICAgICAgJ2RhLURLJzogJ1Rlc3R0aWxzdGFuZDoga3VuZGVyIGthbiBpa2tlIHNlIFBlYWNoUGF5JyxcbiAgICAgICAgZWw6ICfOm861zrnPhM6/z4XPgc6zzq/OsSDOtM6/zrrOuc68zq7Pgjogzr/OuSDPgM61zrvOrM+EzrXPgiDOtM61zr0gzrzPgM6/z4HOv8+Nzr0gzr3OsSDOtM6/z4XOvSDPhM6/IFBlYWNoUGF5JyxcbiAgICAgICAgJ2hpLUlOJzogJ+CkquCksOClgOCkleCljeCkt+CkoyDgpK7gpYvgpKE6IOCkl+CljeCksOCkvuCkueCklSDgpKrgpYDgpJrgpKrgpYcg4KSo4KS54KWA4KSCIOCkpuClh+CkliDgpLjgpJXgpKTgpYcg4KS54KWI4KSCJyxcbiAgICAgICAgJ2tvLUtSJzogJ+2FjOyKpO2KuCDrqqjrk5w6IOqzoOqwneydtCBQZWFjaFBheeulvCDrs7wg7IiYIOyXhuyKteuLiOuLpC4nLFxuICAgICAgICAnbGItTFUnOiAnVGVzdG1vZHVzOiBDbGllbnRlbiBrw6tubmVuIFBlYWNoUGF5IG5ldCBnZXNpbm4nLFxuICAgICAgICAnbmwtTkwnOiAnVGVzdG1vZHVzOiBrbGFudGVuIGt1bm5lbiBQZWFjaFBheSBuaWV0IHppZW4nLFxuICAgICAgICAncHQtUFQnOiAnTW9kbyBkZSB0ZXN0ZTogb3MgY2xpZW50ZXMgbsOjbyBwb2RlbSB2ZXIgbyBQZWFjaFBheScsXG4gICAgICAgICdydS1SVSc6ICfQotC10YHRgtC+0LLRi9C5INGA0LXQttC40Lw6INC60LvQuNC10L3RgtGLINC90LUg0LLQuNC00Y/RgiBQZWFjaFBheScsXG4gICAgICAgICdzbC1TSSc6ICdUZXN0bmkgbmHEjWluOiBzdHJhbmtlIG5lIHZpZGlqbyBQZWFjaFBheScsXG4gICAgICAgICdzdi1TRSc6ICdUZXN0bMOkZ2U6IGt1bmRlciBrYW4gaW50ZSBzZSBQZWFjaFBheScsXG4gICAgICAgIHRoOiAn4LmC4Lir4Lih4LiU4LiX4LiU4Liq4Lit4LiaOiDguKXguLnguIHguITguYnguLLguYTguKHguYjguKrguLLguKHguLLguKPguJbguYDguKvguYfguJkgUGVhY2hQYXknLFxuICAgICAgICB1azogJ9Ci0LXRgdGC0L7QstC40Lkg0YDQtdC20LjQvDog0LrQu9GW0ZTQvdGC0Lgg0L3QtSDQvNC+0LbRg9GC0Ywg0LHQsNGH0LjRgtC4IFBlYWNoUGF5JyxcbiAgICAgICAgJ3poLUNOJzogJ+a1i+ivleaooeW8j++8muWuouaIt+eci+S4jeWIsFBlYWNoUGF5JyxcbiAgICAgICAgJ3poLVRXJzogJ+a4rOippuaooeW8j++8muWuouaItueci+S4jeWIsFBlYWNoUGF5J1xuICAgIH0sXG4gICAgJ3ZlcmlmeS1sb2NhdGlvbic6IHtcbiAgICAgICAgJ2RlLURFJzogJ0ljaCBiZXN0w6R0aWdlLCBkYXNzIGRhcyBMYW5kLCBpbiBkZW0gaWNoIGVpbmdlcmVpc3QgYmluLCBkYXMgTGFuZCBpc3QsIGluIGRlbSBpY2ggd29obmUnLFxuICAgICAgICAnZW4tVVMnOiAnSSB2ZXJpZnkgdGhhdCB0aGUgY291bnRyeSBJIGhhdmUgZW50ZXJlZCBpcyB0aGUgb25lIEkgcmVzaWRlIGluJyxcbiAgICAgICAgJ2VzLUVTJzogJ1ZlcmlmaWNvIHF1ZSBlbCBwYcOtcyBhbCBxdWUgaGUgZW50cmFkbyBlcyBlbiBlbCBxdWUgcmVzaWRvJyxcbiAgICAgICAgZnI6ICdKZSB2w6lyaWZpZSBxdWUgbGUgcGF5cyBkYW5zIGxlcXVlbCBqZSBzdWlzIGVudHLDqSBlc3QgY2VsdWkgZGFucyBsZXF1ZWwgamUgcsOpc2lkZScsXG4gICAgICAgIGl0OiAnVmVyaWZpY28gY2hlIGlsIHBhZXNlIGluIGN1aSBzb25vIGVudHJhdG8gc2lhIHF1ZWxsbyBpbiBjdWkgcmlzaWVkbycsXG4gICAgICAgIGphOiAn5YWl5Yqb44GX44Gf5Zu944GM5bGF5L2P5Zu944Gn44GC44KL44GT44Go44KS56K66KqN44GX44G+44GZJyxcbiAgICAgICAgJ3JvLVJPJzogJ1ZlcmlmaWMgY8SDIMibYXJhIMOubiBjYXJlIGFtIGludHJhdCBlc3RlIGNlYSDDrm4gY2FyZSBsb2N1aWVzYycsXG4gICAgICAgIGFyOiAn2KPYqtit2YLZgiDZhdmGINij2YYg2KfZhNio2YTYryDYp9mE2LDZiiDYo9iv2K7ZhNiq2Ycg2YfZiCDYp9mE2KjZhNivINin2YTYsNmKINij2YLZitmFINmB2YrZhycsXG4gICAgICAgIGNhOiAnVmVyaWZpY28gcXVlIGVsIHBhw61zIG9uIGhlIGVudHJhdCDDqXMgZWwgb24gdmlzYycsXG4gICAgICAgICdjcy1DWic6ICdPdsSbxZl1amksIMW+ZSB6ZW3EmywgZG8ga3RlcsOpIGpzZW0gemFkYWwsIGplIHplbcOtLCB2ZSBrdGVyw6kgYnlkbMOtbScsXG4gICAgICAgICdkYS1ESyc6ICdKZWcgYmVrcsOmZnRlciwgYXQgZGV0IGxhbmQsIGplZyBoYXIgaW5kdGFzdGV0LCBlciBkZXQsIGplZyBib3IgaScsXG4gICAgICAgIGVsOiAnzpXPgM6xzrvOt864zrXPjc+JIM+Mz4TOuSDOtyDPh8+Oz4HOsSDPg8+EzrfOvSDOv8+Azr/Or86xIM6tz4fPiSDOtc65z4POrc67zrjOtc65IM61zq/Ovc6xzrkgzrHPhc+Ezq4gz4PPhM63zr0gzr/PgM6/zq/OsSDOtM65zrHOvM6tzr3PiScsXG4gICAgICAgICdoaS1JTic6ICfgpK7gpYjgpIIg4KS44KSk4KWN4KSv4KS+4KSq4KS/4KSkIOCkleCksOCkpOCkvi/gpJXgpLDgpKTgpYAg4KS54KWC4KSCIOCkleCkvyDgpJzgpL/gpLgg4KSm4KWH4KS2IOCkruClh+CkgiDgpK7gpYjgpILgpKjgpYcg4KSq4KWN4KSw4KS14KWH4KS2IOCkleCkv+Ckr+CkviDgpLngpYgg4KS14KS5IOCkteCkueClgCDgpKbgpYfgpLYg4KS54KWIIOCknOCkv+CkuOCkruClh+CkgiDgpK7gpYjgpIIg4KSw4KS54KSk4KS+IOCkueClguCkgicsXG4gICAgICAgICdrby1LUic6ICfrgrTqsIAg7J6F66Cl7ZWcIOq1reqwgOqwgCDrgrTqsIAg6rGw7KO87ZWY64qUIOq1reqwgOyduOyngCDtmZXsnbjtlanri4jri6QuJyxcbiAgICAgICAgJ2xiLUxVJzogJ0VjaCB2ZXJpZml6w6lpZXJlbiBkYXR0IGRcXCdMYW5kIHdvdSBlY2ggYWdpbm4gaHVubiBhc3MgZGVlbiBhbiBkZWVtIGVjaCB3dW5uZW4nLFxuICAgICAgICAnbmwtTkwnOiAnSWsgdmVyaWZpZWVyIGRhdCBoZXQgbGFuZCBkYXQgaWsgaGViIGluZ2V2b2VyZCBoZXQgbGFuZCBpcyB3YWFyaW4gaWsgd29vbicsXG4gICAgICAgICdwdC1QVCc6ICdFdSB2ZXJpZmljbyBzZSBvIHBhw61zIHF1ZSBldSBpbnNlcmkgw6kgYXF1ZWxlIGVtIHF1ZSByZXNpZG8nLFxuICAgICAgICAncnUtUlUnOiAn0K8g0L/QvtC00YLQstC10YDQttC00LDRjiwg0YfRgtC+INGB0YLRgNCw0L3QsCwg0LIg0LrQvtGC0L7RgNGD0Y4g0Y8g0LLRitC10YXQsNC7LCDRj9Cy0LvRj9C10YLRgdGPINGC0L7QuSwg0LIg0LrQvtGC0L7RgNC+0Lkg0Y8g0L/RgNC+0LbQuNCy0LDRjicsXG4gICAgICAgICdzaS1TSSc6ICdQb3RyanVqZW0sIGRhIGplIGRyxb5hdmEsIHYga2F0ZXJvIHNlbSB2c3RvcGlsLCB0aXN0YSwgdiBrYXRlcmkgcHJlYml2YW0nLFxuICAgICAgICAnc2ktU0UnOiAnSmFnIHZlcmlmaWVyYXIgYXR0IGRldCBsYW5kIGphZyBoYXIgYW5nZXR0IMOkciBkZXQgamFnIGJvciBpJyxcbiAgICAgICAgdGg6ICfguInguLHguJnguKLguLfguJnguKLguLHguJnguKfguYjguLLguJvguKPguLDguYDguJfguKjguJfguLXguYjguInguLHguJnguYDguILguYnguLLguKHguLLguYDguJvguYfguJnguJvguKPguLDguYDguJfguKjguJfguLXguYjguInguLHguJnguK3guLLguKjguLHguKLguK3guKLguLnguYgnLFxuICAgICAgICB1azogJ9CvINC/0ZbQtNGC0LLQtdGA0LTQttGD0Y4sINGJ0L4g0LrRgNCw0ZfQvdCwLCDQsiDRj9C60YMg0Y8g0LLQstGW0LnRiNC+0LIsINGUINGC0ZbRlNGOLCDQsiDRj9C60ZbQuSDRjyDQv9GA0L7QttC40LLQsNGOJyxcbiAgICAgICAgJ3poLUNOJzogJ+aIkeehruiupOaIkei/m+WFpeeahOWbveWutuaYr+aIkeWxheS9j+eahOWbveWuticsXG4gICAgICAgICd6aC1UVyc6ICfmiJHnorroqo3miJHpgLLlhaXnmoTlnIvlrrbmmK/miJHlsYXkvY/nmoTlnIvlrrYnXG4gICAgfVxufTtcbmNvbnN0IEZlYXR1cmUgPSB7XG4gICAgZW5hYmxlZDogKGZsYWcpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFtmbGFnXT8uZW5hYmxlZCA/PyBmYWxzZVxuICAgICxcbiAgICB2ZXJzaW9uOiAoZmxhZyk9PnN0b3JlLmdldFN0YXRlKCkuZW52aXJvbm1lbnQucGx1Z2luLmZlYXR1cmVTdXBwb3J0W2ZsYWddPy52ZXJzaW9uID8/IDBcbiAgICAsXG4gICAgbWV0YURhdGE6IChmbGFnLCBrZXkpPT5zdG9yZS5nZXRTdGF0ZSgpLmVudmlyb25tZW50LnBsdWdpbi5mZWF0dXJlU3VwcG9ydFtmbGFnXT8ubWV0YV9kYXRhPy5ba2V5XSA/PyBudWxsXG59O1xudmFyIEZlYXR1cmVGbGFnO1xuKGZ1bmN0aW9uKEZlYXR1cmVGbGFnMSkge1xuICAgIEZlYXR1cmVGbGFnMVtcIkNBUlRfQ0FMQ1VMQVRJT05cIl0gPSAnY2FydF9jYWxjdWxhdGlvbic7XG4gICAgRmVhdHVyZUZsYWcxW1wiQ09VUE9OX0lOUFVUXCJdID0gJ2NvdXBvbl9pbnB1dCc7XG4gICAgRmVhdHVyZUZsYWcxW1wiR0lGVENBUkRfSU5QVVRcIl0gPSAnZ2lmdGNhcmRfaW5wdXQnO1xuICAgIEZlYXR1cmVGbGFnMVtcIk9SREVSX05PVEVTXCJdID0gJ29yZGVyX25vdGVzX2lucHV0JztcbiAgICBGZWF0dXJlRmxhZzFbXCJBRERJVElPTkFMX0ZJRUxEU1wiXSA9ICdhZGRpdGlvbmFsX2ZpZWxkcyc7XG4gICAgRmVhdHVyZUZsYWcxW1wiU1RSSVBFXCJdID0gJ3N0cmlwZV9wYXltZW50X21ldGhvZCc7XG4gICAgRmVhdHVyZUZsYWcxW1wiU1RSSVBFX1BBWU1FTlRfUkVRVUVTVFwiXSA9ICdzdHJpcGVfcGF5bWVudF9yZXF1ZXN0JztcbiAgICBGZWF0dXJlRmxhZzFbXCJRVUFOVElUWV9DSEFOR0VSXCJdID0gJ3F1YW50aXR5X2NoYW5nZXInO1xufSkoRmVhdHVyZUZsYWcgfHwgKEZlYXR1cmVGbGFnID0ge30pKTtcbmNvbnN0IHVwZGF0ZUN1c3RvbWVyU3RyaXBlSWQgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfU1RSSVBFX0lEKTtcbmNvbnN0IHVwZGF0ZUN1c3RvbWVyID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLlBFQUNIUEFZX0NVU1RPTUVSKTtcbmNvbnN0IHVwZGF0ZUN1c3RvbWVyU2hpcHBpbmdTaG9ydEFkZHJlc3MgPSBjcmVhdGVEaXNwYXRjaFVwZGF0ZShEaXNwYXRjaEFjdGlvblR5cGUuUEVBQ0hQQVlfQ1VTVE9NRVJfU0hJUFBJTkcpO1xuY29uc3QgdXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5QRUFDSFBBWV9DVVNUT01FUl9QQVlNRU5UX01FVEhPRCk7XG5jb25zdCBQZWFjaFBheUN1c3RvbWVyID0ge1xuICAgIGRhdGE6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXJcbiAgICAsXG4gICAgZW1haWw6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuZW1haWxcbiAgICAsXG4gICAgZmlyc3ROYW1lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLm5hbWVfZmlyc3RcbiAgICAsXG4gICAgbGFzdE5hbWU6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIubmFtZV9sYXN0XG4gICAgLFxuICAgIHBob25lOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLnBob25lXG4gICAgLFxuICAgIGFkZHJlc3MxOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MxXG4gICAgLFxuICAgIGFkZHJlc3MyOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MyXG4gICAgLFxuICAgIGNpdHk6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIuY2l0eVxuICAgICxcbiAgICBzdGF0ZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5zdGF0ZVxuICAgICxcbiAgICBjb3VudHJ5OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmNvdW50cnlcbiAgICAsXG4gICAgcG9zdGFsOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLnBvc3RhbFxuICAgICxcbiAgICBjYXJkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmNhcmRcbiAgICAsXG4gICAgcHJlZmVycmVkUGF5bWVudE1ldGhvZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5wYXltZW50X29wdGlvbiA/PyAnc3RyaXBlJ1xuICAgICxcbiAgICBzdHJpcGVJZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5zdHJpcGVfY3VzdG9tZXJfaWQgPz8gJydcbiAgICAsXG4gICAgc3RyaXBlRGV0YWlsczogKCk9Pih7XG4gICAgICAgICAgICBuYW1lOiBzdG9yZS5nZXRTdGF0ZSgpLnBlYWNoUGF5Q3VzdG9tZXIubmFtZV9maXJzdCArICcgJyArIHN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5uYW1lX2xhc3QsXG4gICAgICAgICAgICBlbWFpbDogc3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheUN1c3RvbWVyLmVtYWlsLFxuICAgICAgICAgICAgcGhvbmU6IHN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlDdXN0b21lci5waG9uZVxuICAgICAgICB9KVxuICAgICxcbiAgICBzaG9ydEFkZHJlc3M6ICgpPT4oe1xuICAgICAgICAgICAgY291bnRyeTogUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCksXG4gICAgICAgICAgICBzdGF0ZTogUGVhY2hQYXlDdXN0b21lci5zdGF0ZSgpLFxuICAgICAgICAgICAgY2l0eTogUGVhY2hQYXlDdXN0b21lci5jaXR5KCksXG4gICAgICAgICAgICBwb3N0Y29kZTogUGVhY2hQYXlDdXN0b21lci5wb3N0YWwoKVxuICAgICAgICB9KVxuICAgICxcbiAgICBzaGlwcGluZ0FkZHJlc3M6ICgpPT4oe1xuICAgICAgICAgICAgc2hpcHBpbmdfZmlyc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5maXJzdE5hbWUoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2xhc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5sYXN0TmFtZSgpLFxuICAgICAgICAgICAgc2hpcHBpbmdfY29tcGFueTogJycsXG4gICAgICAgICAgICBzaGlwcGluZ19jb3VudHJ5OiBQZWFjaFBheUN1c3RvbWVyLmNvdW50cnkoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2FkZHJlc3NfMTogUGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMSgpLFxuICAgICAgICAgICAgc2hpcHBpbmdfYWRkcmVzc18yOiBQZWFjaFBheUN1c3RvbWVyLmFkZHJlc3MyKCksXG4gICAgICAgICAgICBzaGlwcGluZ19jaXR5OiBQZWFjaFBheUN1c3RvbWVyLmNpdHkoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX3N0YXRlOiBQZWFjaFBheUN1c3RvbWVyLnN0YXRlKCksXG4gICAgICAgICAgICBzaGlwcGluZ19wb3N0Y29kZTogUGVhY2hQYXlDdXN0b21lci5wb3N0YWwoKVxuICAgICAgICB9KVxuICAgICxcbiAgICBiaWxsaW5nQWRkcmVzczogKCk9Pih7XG4gICAgICAgICAgICBiaWxsaW5nX2ZpcnN0X25hbWU6IFBlYWNoUGF5Q3VzdG9tZXIuZmlyc3ROYW1lKCksXG4gICAgICAgICAgICBiaWxsaW5nX2xhc3RfbmFtZTogUGVhY2hQYXlDdXN0b21lci5sYXN0TmFtZSgpLFxuICAgICAgICAgICAgYmlsbGluZ19jb21wYW55OiAnJyxcbiAgICAgICAgICAgIGJpbGxpbmdfZW1haWw6IFBlYWNoUGF5Q3VzdG9tZXIuZW1haWwoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfcGhvbmU6IFBlYWNoUGF5Q3VzdG9tZXIucGhvbmUoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfY291bnRyeTogUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCksXG4gICAgICAgICAgICBiaWxsaW5nX2FkZHJlc3NfMTogUGVhY2hQYXlDdXN0b21lci5hZGRyZXNzMSgpLFxuICAgICAgICAgICAgYmlsbGluZ19hZGRyZXNzXzI6IFBlYWNoUGF5Q3VzdG9tZXIuYWRkcmVzczIoKSxcbiAgICAgICAgICAgIGJpbGxpbmdfY2l0eTogUGVhY2hQYXlDdXN0b21lci5jaXR5KCksXG4gICAgICAgICAgICBiaWxsaW5nX3N0YXRlOiBQZWFjaFBheUN1c3RvbWVyLnN0YXRlKCksXG4gICAgICAgICAgICBiaWxsaW5nX3Bvc3Rjb2RlOiBQZWFjaFBheUN1c3RvbWVyLnBvc3RhbCgpXG4gICAgICAgIH0pXG59O1xuZnVuY3Rpb24gdXBkYXRlQ3VzdG9tZXJNZXJjaGFudEFjY291bnQobWVyY2hhbnRDdXN0b21lcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUixcbiAgICAgICAgcGF5bG9hZDogbWVyY2hhbnRDdXN0b21lclxuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShleGlzdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERpc3BhdGNoQWN0aW9uVHlwZS5NRVJDSEFOVF9DVVNUT01FUl9FWElTVCxcbiAgICAgICAgcGF5bG9hZDogZXhpc3RcbiAgICB9O1xufVxuY29uc3QgTWVyY2hhbnRDdXN0b21lciA9IHtcbiAgICBsb2dnZWRJbjogKCk9PnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDdXN0b21lci5sb2dnZWRJblxuICAgICxcbiAgICB1c2VybmFtZUV4aXN0OiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5tZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lSXNSZWdpc3RlcmVkXG59O1xuY29uc3QgdXBkYXRlU2Vzc2lvbklkID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFU1NJT05JRCk7XG5jb25zdCB1cGRhdGVDdXN0b21lckFkZHJlc3NWYWxpZGF0aW9uID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX0FERFJFU1NfVkFMSURBVEVEKTtcbmNvbnN0IHNldEV4dHJhRmllbGRzID0gY3JlYXRlRGlzcGF0Y2hVcGRhdGUoRGlzcGF0Y2hBY3Rpb25UeXBlLk9SREVSX1NFVF9FWFRSQV9GSUVMRFMpO1xuY29uc3Qgc2V0T3JkZXJFcnJvciA9IGNyZWF0ZURpc3BhdGNoVXBkYXRlKERpc3BhdGNoQWN0aW9uVHlwZS5PUkRFUl9TRVRfRVJST1JfTUVTU0FHRSk7XG5jb25zdCBQZWFjaFBheU9yZGVyID0ge1xuICAgIHNlc3Npb25JZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5zZXNzaW9uSWRcbiAgICAsXG4gICAgY29udGVudHM6ICgpPT5zdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1swXS5jYXJ0XG4gICAgLFxuICAgIGVycm9yTWVzc2FnZTogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5lcnJvck1lc3NhZ2VcbiAgICAsXG4gICAgY29sbGVjdFNlbGVjdGVkU2hpcHBpbmc6ICgpPT57XG4gICAgICAgIGNvbnN0IGNhcnRzID0gc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHM7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzUmVjb3JkID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY2FydEtleSBvZiBPYmplY3Qua2V5cyhjYXJ0cykpe1xuICAgICAgICAgICAgY29uc3QgY2FydCA9IGNhcnRzW2NhcnRLZXldO1xuICAgICAgICAgICAgaWYgKCFjYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhY2thZ2VLZXkgb2YgT2JqZWN0LmtleXMoY2FydC5wYWNrYWdlX3JlY29yZCA/PyB7fSkpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VSZWNvcmQgPSBjYXJ0LnBhY2thZ2VfcmVjb3JkW3BhY2thZ2VLZXldO1xuICAgICAgICAgICAgICAgIGlmICghcGFja2FnZVJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcHBpbmdLZXkgPSBjYXJ0S2V5ID09PSAnMCcgPyBwYWNrYWdlS2V5IDogYCR7Y2FydEtleX1fJHtwYWNrYWdlS2V5fWA7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRTaGlwcGluZ01ldGhvZHNSZWNvcmRbc2hpcHBpbmdLZXldID0gcGFja2FnZVJlY29yZC5zZWxlY3RlZF9tZXRob2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2hpcHBpbmdNZXRob2RzUmVjb3JkO1xuICAgIH0sXG4gICAgY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkOiAoKT0+c3RvcmUuZ2V0U3RhdGUoKS5wZWFjaFBheU9yZGVyLmN1c3RvbWVyQWRkcmVzc1ZhbGlkYXRlZFxuICAgICxcbiAgICBleHRyYUZpZWxkc1JlY29yZDogKCk9PnN0b3JlLmdldFN0YXRlKCkucGVhY2hQYXlPcmRlci5hZGRpdGlvbmFsRmllbGRzXG59O1xuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3lTdHJpbmcoY29zdCkge1xuICAgIGNvbnN0IHsgc3ltYm9sICwgcG9zaXRpb24gIH0gPSBNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuY29uZmlndXJhdGlvbigpO1xuICAgIGlmICh0eXBlb2YgY29zdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY29zdCA9IDA7XG4gICAgfVxuICAgIGxldCBmb3JtYXR0ZWRDdXJyZW5jeSA9ICcnO1xuICAgIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHBvc2l0aW9uID09PSAnbGVmdF9zcGFjZScpIHtcbiAgICAgICAgbGV0IG5lZ1N5bWJvbCA9ICcnO1xuICAgICAgICBsZXQgZm9ybWF0dGVkQ29zdCA9IGZvcm1hdENvc3RTdHJpbmcoY29zdCk7XG4gICAgICAgIGlmIChjb3N0IDwgMCkge1xuICAgICAgICAgICAgbmVnU3ltYm9sID0gJ+KIkic7XG4gICAgICAgICAgICBmb3JtYXR0ZWRDb3N0ID0gZm9ybWF0Q29zdFN0cmluZyhNYXRoLmFicyhjb3N0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0dGVkQ3VycmVuY3kgPSBgJHtuZWdTeW1ib2x9JHtzeW1ib2x9JHtwb3NpdGlvbiA9PT0gJ2xlZnRfc3BhY2UnID8gJyAnIDogJyd9JHtmb3JtYXR0ZWRDb3N0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkQ3VycmVuY3kgPSBgJHtmb3JtYXRDb3N0U3RyaW5nKGNvc3QpfSR7cG9zaXRpb24gPT09ICdyaWdodF9zcGFjZScgPyAnICcgOiAnJ30ke3N5bWJvbH1gO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkQ3VycmVuY3k7XG59XG5mdW5jdGlvbiBmb3JtYXRDb3N0U3RyaW5nKGNvc3QpIHtcbiAgICBjb25zdCB7IGNvZGUgLCB0aG91c2FuZHNTZXBhcmF0b3IgLCBkZWNpbWFsU2VwYXJhdG9yICwgcm91bmRpbmcgLCBkZWNpbWFscyAgfSA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb25maWd1cmF0aW9uKCk7XG4gICAgaWYgKHR5cGVvZiBjb3N0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBjb3N0ID0gMDtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09ICdKUFknKSB7XG4gICAgICAgIHJldHVybiBjb3N0LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGNvbnN0IG51bWJlck9mRGVjaW1hbHMgPSBkZWNpbWFscyB8fCAyO1xuICAgIHN3aXRjaChyb3VuZGluZyl7XG4gICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNvc3QgPSBNYXRoLmNlaWwoY29zdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICBjb3N0ID0gTWF0aC5mbG9vcihjb3N0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduZWFyZXN0JzpcbiAgICAgICAgICAgIGNvc3QgPSBNYXRoLnJvdW5kKGNvc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29zdCA9IE51bWJlci5wYXJzZUZsb2F0KGNvc3QudG9GaXhlZChkZWNpbWFscykpO1xuICAgIGxldCBmb3JtYXR0ZWRQcmljZSA9ICcnO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5U3BsaXQgPSBjb3N0LnRvRml4ZWQobnVtYmVyT2ZEZWNpbWFscykuc3BsaXQoJy4nKTtcbiAgICAgICAgbGV0IGRvbGxhckFtb3VudCA9IGN1cnJlbmN5U3BsaXRbMF07XG4gICAgICAgIGNvbnN0IGNlbnRzQW1vdW50ID0gY3VycmVuY3lTcGxpdFsxXSB8fCAnJztcbiAgICAgICAgY29uc3QgcmV2ID0gY3VycmVuY3lTcGxpdFswXS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgICAgICBjb25zdCByZXZGb3JtYXQgPSByZXYubWF0Y2goLy57MSwzfS9nKT8uam9pbih0aG91c2FuZHNTZXBhcmF0b3IpID8/ICcnO1xuICAgICAgICBkb2xsYXJBbW91bnQgPSByZXZGb3JtYXQuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICAgICAgZm9ybWF0dGVkUHJpY2UgKz0gZG9sbGFyQW1vdW50O1xuICAgICAgICBpZiAoY2VudHNBbW91bnQgIT09ICcnKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRQcmljZSArPSBkZWNpbWFsU2VwYXJhdG9yICsgY2VudHNBbW91bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFByaWNlO1xuICAgIH0gY2F0Y2ggIHtcbiAgICAgICAgcmV0dXJuIGNvc3QudG9GaXhlZChkZWNpbWFscyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJJbnB1dChzZWxlY3Rvcikge1xuICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKHNlbGVjdG9yKSl7XG4gICAgICAgICRlbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyRHJvcERvd25MaXN0KGRhdGEsIGRlZmF1bHRPcHRpb24gPSAnJykge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIGNvbnN0IGxpc3QgPSBPYmplY3QuZW50cmllcyhkYXRhKS5tYXAoKFtrZXksIHZhbHVlXSk9PmA8b3B0aW9uIHZhbHVlPVwiJHtrZXl9XCI+ICR7dmFsdWV9IDwvb3B0aW9uPmBcbiAgICApO1xuICAgIGlmIChkZWZhdWx0T3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBgPG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWU9XCJcIj4ke2RlZmF1bHRPcHRpb259PC9vcHRpb24+JHtsaXN0LmpvaW4oJycpfWA7XG4gICAgfVxuICAgIHJldHVybiBsaXN0LmpvaW4oJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0RHJvcGRvd24oJHNlbGVjdCwgdmFsdWUpIHtcbiAgICBpZiAoISRzZWxlY3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkc2VsZWN0LnZhbHVlID0gdmFsdWU7XG59XG5mdW5jdGlvbiBmb3JtRW50cnkoZm9ybURhdGEsIGtleSkge1xuICAgIGlmIChmb3JtRGF0YS5nZXQoa2V5KSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBmb3JtRGF0YS5nZXQoa2V5KSA/PyAnJztcbn1cbmZ1bmN0aW9uIGdldENvdW50cnlOYW1lKGNvdW50cnlDb2RlKSB7XG4gICAgaWYgKCFwZWFjaHBheUNvdW50cmllc1tjb3VudHJ5Q29kZV0pIHtcbiAgICAgICAgcmV0dXJuICdVbmtub3duIENvdW50cnkgQ29kZTogJyArIGNvdW50cnlDb2RlO1xuICAgIH1cbiAgICByZXR1cm4gcGVhY2hwYXlDb3VudHJpZXM/Lltjb3VudHJ5Q29kZV0/Lm5hbWUgPz8gJ1Vua25vd24gQ291bnRyeSBDb2RlOiAnICsgY291bnRyeUNvZGU7XG59XG5mdW5jdGlvbiBzdGF0ZVByb3ZpbmNlT3JDb3VudHkoY291bnRyeUNvZGUpIHtcbiAgICBzd2l0Y2goY291bnRyeUNvZGUpe1xuICAgICAgICBjYXNlICdVUyc6XG4gICAgICAgIGNhc2UgJ01ZJzpcbiAgICAgICAgY2FzZSAnQVUnOlxuICAgICAgICAgICAgcmV0dXJuIGdldExvY2FsZVRleHQoJ3N0YXRlLXNlbGVjdCcpO1xuICAgICAgICBjYXNlICdHQic6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgnY291bnR5Jyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZ2V0TG9jYWxlVGV4dCgncHJvdmluY2Utc2VsZWN0Jyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNFVUNvdW50cnkoY291bnRyeUNvZGUpIHtcbiAgICBjb25zdCBFVUNvdW50cmllcyA9IFtcbiAgICAgICAgJ0FUJyxcbiAgICAgICAgJ0JFJyxcbiAgICAgICAgJ0JHJyxcbiAgICAgICAgJ0NZJyxcbiAgICAgICAgJ0NaJyxcbiAgICAgICAgJ0RLJyxcbiAgICAgICAgJ0VFJyxcbiAgICAgICAgJ0ZJJyxcbiAgICAgICAgJ0ZSJyxcbiAgICAgICAgJ0RFJyxcbiAgICAgICAgJ0dSJyxcbiAgICAgICAgJ0hVJyxcbiAgICAgICAgJ0lFJyxcbiAgICAgICAgJ0lUJyxcbiAgICAgICAgJ0xWJyxcbiAgICAgICAgJ0xUJyxcbiAgICAgICAgJ0xVJyxcbiAgICAgICAgJ01UJyxcbiAgICAgICAgJ05MJyxcbiAgICAgICAgJ1BMJyxcbiAgICAgICAgJ1BUJyxcbiAgICAgICAgJ1JPJyxcbiAgICAgICAgJ1NLJyxcbiAgICAgICAgJ1NJJyxcbiAgICAgICAgJ0VTJyxcbiAgICAgICAgJ1NFJ1xuICAgIF07XG4gICAgaWYgKEVVQ291bnRyaWVzLmluY2x1ZGVzKGNvdW50cnlDb2RlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuY29uc3QgcGVhY2hwYXlDb3VudHJpZXMgPSB7XG4gICAgQUY6IHtcbiAgICAgICAgbmFtZTogJ0FmZ2hhbmlzdGFuJ1xuICAgIH0sXG4gICAgQVg6IHtcbiAgICAgICAgbmFtZTogJ8OFbGFuZCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgQUw6IHtcbiAgICAgICAgbmFtZTogJ0FsYmFuaWEnXG4gICAgfSxcbiAgICBEWjoge1xuICAgICAgICBuYW1lOiAnQWxnZXJpYSdcbiAgICB9LFxuICAgIEFTOiB7XG4gICAgICAgIG5hbWU6ICdBbWVyaWNhbiBTYW1vYSdcbiAgICB9LFxuICAgIEFEOiB7XG4gICAgICAgIG5hbWU6ICdBbmRvcnJhJ1xuICAgIH0sXG4gICAgQU86IHtcbiAgICAgICAgbmFtZTogJ0FuZ29sYSdcbiAgICB9LFxuICAgIEFJOiB7XG4gICAgICAgIG5hbWU6ICdBbmd1aWxsYSdcbiAgICB9LFxuICAgIEFROiB7XG4gICAgICAgIG5hbWU6ICdBbnRhcmN0aWNhJ1xuICAgIH0sXG4gICAgQUc6IHtcbiAgICAgICAgbmFtZTogJ0FudGlndWEgYW5kIEJhcmJ1ZGEnXG4gICAgfSxcbiAgICBBUjoge1xuICAgICAgICBuYW1lOiAnQXJnZW50aW5hJ1xuICAgIH0sXG4gICAgQU06IHtcbiAgICAgICAgbmFtZTogJ0FybWVuaWEnXG4gICAgfSxcbiAgICBBVzoge1xuICAgICAgICBuYW1lOiAnQXJ1YmEnXG4gICAgfSxcbiAgICBBVToge1xuICAgICAgICBuYW1lOiAnQXVzdHJhbGlhJ1xuICAgIH0sXG4gICAgQVQ6IHtcbiAgICAgICAgbmFtZTogJ0F1c3RyaWEnXG4gICAgfSxcbiAgICBBWjoge1xuICAgICAgICBuYW1lOiAnQXplcmJhaWphbidcbiAgICB9LFxuICAgIEJTOiB7XG4gICAgICAgIG5hbWU6ICdCYWhhbWFzJ1xuICAgIH0sXG4gICAgQkg6IHtcbiAgICAgICAgbmFtZTogJ0JhaHJhaW4nXG4gICAgfSxcbiAgICBCRDoge1xuICAgICAgICBuYW1lOiAnQmFuZ2xhZGVzaCdcbiAgICB9LFxuICAgIEJCOiB7XG4gICAgICAgIG5hbWU6ICdCYXJiYWRvcydcbiAgICB9LFxuICAgIEJZOiB7XG4gICAgICAgIG5hbWU6ICdCZWxhcnVzJ1xuICAgIH0sXG4gICAgQkU6IHtcbiAgICAgICAgbmFtZTogJ0JlbGdpdW0nXG4gICAgfSxcbiAgICBCWjoge1xuICAgICAgICBuYW1lOiAnQmVsaXplJ1xuICAgIH0sXG4gICAgQko6IHtcbiAgICAgICAgbmFtZTogJ0JlbmluJ1xuICAgIH0sXG4gICAgQk06IHtcbiAgICAgICAgbmFtZTogJ0Jlcm11ZGEnXG4gICAgfSxcbiAgICBCVDoge1xuICAgICAgICBuYW1lOiAnQmh1dGFuJ1xuICAgIH0sXG4gICAgQk86IHtcbiAgICAgICAgbmFtZTogJ0JvbGl2aWEsIFBsdXJpbmF0aW9uYWwgU3RhdGUgb2YnXG4gICAgfSxcbiAgICBCUToge1xuICAgICAgICBuYW1lOiAnQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmEnXG4gICAgfSxcbiAgICBCQToge1xuICAgICAgICBuYW1lOiAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYSdcbiAgICB9LFxuICAgIEJXOiB7XG4gICAgICAgIG5hbWU6ICdCb3Rzd2FuYSdcbiAgICB9LFxuICAgIEJWOiB7XG4gICAgICAgIG5hbWU6ICdCb3V2ZXQgSXNsYW5kJ1xuICAgIH0sXG4gICAgQlI6IHtcbiAgICAgICAgbmFtZTogJ0JyYXppbCdcbiAgICB9LFxuICAgIElPOiB7XG4gICAgICAgIG5hbWU6ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknXG4gICAgfSxcbiAgICBCTjoge1xuICAgICAgICBuYW1lOiAnQnJ1bmVpIERhcnVzc2FsYW0nXG4gICAgfSxcbiAgICBCRzoge1xuICAgICAgICBuYW1lOiAnQnVsZ2FyaWEnXG4gICAgfSxcbiAgICBCRjoge1xuICAgICAgICBuYW1lOiAnQnVya2luYSBGYXNvJ1xuICAgIH0sXG4gICAgQkk6IHtcbiAgICAgICAgbmFtZTogJ0J1cnVuZGknXG4gICAgfSxcbiAgICBLSDoge1xuICAgICAgICBuYW1lOiAnQ2FtYm9kaWEnXG4gICAgfSxcbiAgICBDTToge1xuICAgICAgICBuYW1lOiAnQ2FtZXJvb24nXG4gICAgfSxcbiAgICBDQToge1xuICAgICAgICBuYW1lOiAnQ2FuYWRhJ1xuICAgIH0sXG4gICAgQ1Y6IHtcbiAgICAgICAgbmFtZTogJ0NhcGUgVmVyZGUnXG4gICAgfSxcbiAgICBLWToge1xuICAgICAgICBuYW1lOiAnQ2F5bWFuIElzbGFuZHMnXG4gICAgfSxcbiAgICBDRjoge1xuICAgICAgICBuYW1lOiAnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJ1xuICAgIH0sXG4gICAgVEQ6IHtcbiAgICAgICAgbmFtZTogJ0NoYWQnXG4gICAgfSxcbiAgICBDTDoge1xuICAgICAgICBuYW1lOiAnQ2hpbGUnXG4gICAgfSxcbiAgICBDTjoge1xuICAgICAgICBuYW1lOiAnQ2hpbmEnXG4gICAgfSxcbiAgICBDWDoge1xuICAgICAgICBuYW1lOiAnQ2hyaXN0bWFzIElzbGFuZCdcbiAgICB9LFxuICAgIENDOiB7XG4gICAgICAgIG5hbWU6ICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcydcbiAgICB9LFxuICAgIENPOiB7XG4gICAgICAgIG5hbWU6ICdDb2xvbWJpYSdcbiAgICB9LFxuICAgIEtNOiB7XG4gICAgICAgIG5hbWU6ICdDb21vcm9zJ1xuICAgIH0sXG4gICAgQ0c6IHtcbiAgICAgICAgbmFtZTogJ0NvbmdvJ1xuICAgIH0sXG4gICAgQ0Q6IHtcbiAgICAgICAgbmFtZTogJ0NvbmdvLCB0aGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUnXG4gICAgfSxcbiAgICBDSzoge1xuICAgICAgICBuYW1lOiAnQ29vayBJc2xhbmRzJ1xuICAgIH0sXG4gICAgQ1I6IHtcbiAgICAgICAgbmFtZTogJ0Nvc3RhIFJpY2EnXG4gICAgfSxcbiAgICBDSToge1xuICAgICAgICBuYW1lOiAnQ8O0dGUgZFxcJ0l2b2lyZSdcbiAgICB9LFxuICAgIEhSOiB7XG4gICAgICAgIG5hbWU6ICdDcm9hdGlhJ1xuICAgIH0sXG4gICAgQ1U6IHtcbiAgICAgICAgbmFtZTogJ0N1YmEnXG4gICAgfSxcbiAgICBDVzoge1xuICAgICAgICBuYW1lOiAnQ3VyYcOnYW8nXG4gICAgfSxcbiAgICBDWToge1xuICAgICAgICBuYW1lOiAnQ3lwcnVzJ1xuICAgIH0sXG4gICAgQ1o6IHtcbiAgICAgICAgbmFtZTogJ0N6ZWNoIFJlcHVibGljJ1xuICAgIH0sXG4gICAgREs6IHtcbiAgICAgICAgbmFtZTogJ0Rlbm1hcmsnXG4gICAgfSxcbiAgICBESjoge1xuICAgICAgICBuYW1lOiAnRGppYm91dGknXG4gICAgfSxcbiAgICBETToge1xuICAgICAgICBuYW1lOiAnRG9taW5pY2EnXG4gICAgfSxcbiAgICBETzoge1xuICAgICAgICBuYW1lOiAnRG9taW5pY2FuIFJlcHVibGljJ1xuICAgIH0sXG4gICAgRUM6IHtcbiAgICAgICAgbmFtZTogJ0VjdWFkb3InXG4gICAgfSxcbiAgICBFRzoge1xuICAgICAgICBuYW1lOiAnRWd5cHQnXG4gICAgfSxcbiAgICBTVjoge1xuICAgICAgICBuYW1lOiAnRWwgU2FsdmFkb3InXG4gICAgfSxcbiAgICBHUToge1xuICAgICAgICBuYW1lOiAnRXF1YXRvcmlhbCBHdWluZWEnXG4gICAgfSxcbiAgICBFUjoge1xuICAgICAgICBuYW1lOiAnRXJpdHJlYSdcbiAgICB9LFxuICAgIEVFOiB7XG4gICAgICAgIG5hbWU6ICdFc3RvbmlhJ1xuICAgIH0sXG4gICAgRVQ6IHtcbiAgICAgICAgbmFtZTogJ0V0aGlvcGlhJ1xuICAgIH0sXG4gICAgRks6IHtcbiAgICAgICAgbmFtZTogJ0ZhbGtsYW5kIElzbGFuZHMgKE1hbHZpbmFzKSdcbiAgICB9LFxuICAgIEZPOiB7XG4gICAgICAgIG5hbWU6ICdGYXJvZSBJc2xhbmRzJ1xuICAgIH0sXG4gICAgRko6IHtcbiAgICAgICAgbmFtZTogJ0ZpamknXG4gICAgfSxcbiAgICBGSToge1xuICAgICAgICBuYW1lOiAnRmlubGFuZCdcbiAgICB9LFxuICAgIEZSOiB7XG4gICAgICAgIG5hbWU6ICdGcmFuY2UnXG4gICAgfSxcbiAgICBHRjoge1xuICAgICAgICBuYW1lOiAnRnJlbmNoIEd1aWFuYSdcbiAgICB9LFxuICAgIFBGOiB7XG4gICAgICAgIG5hbWU6ICdGcmVuY2ggUG9seW5lc2lhJ1xuICAgIH0sXG4gICAgVEY6IHtcbiAgICAgICAgbmFtZTogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcydcbiAgICB9LFxuICAgIEdBOiB7XG4gICAgICAgIG5hbWU6ICdHYWJvbidcbiAgICB9LFxuICAgIEdNOiB7XG4gICAgICAgIG5hbWU6ICdHYW1iaWEnXG4gICAgfSxcbiAgICBHRToge1xuICAgICAgICBuYW1lOiAnR2VvcmdpYSdcbiAgICB9LFxuICAgIERFOiB7XG4gICAgICAgIG5hbWU6ICdHZXJtYW55J1xuICAgIH0sXG4gICAgR0g6IHtcbiAgICAgICAgbmFtZTogJ0doYW5hJ1xuICAgIH0sXG4gICAgR0k6IHtcbiAgICAgICAgbmFtZTogJ0dpYnJhbHRhcidcbiAgICB9LFxuICAgIEdSOiB7XG4gICAgICAgIG5hbWU6ICdHcmVlY2UnXG4gICAgfSxcbiAgICBHTDoge1xuICAgICAgICBuYW1lOiAnR3JlZW5sYW5kJ1xuICAgIH0sXG4gICAgR0Q6IHtcbiAgICAgICAgbmFtZTogJ0dyZW5hZGEnXG4gICAgfSxcbiAgICBHUDoge1xuICAgICAgICBuYW1lOiAnR3VhZGVsb3VwZSdcbiAgICB9LFxuICAgIEdVOiB7XG4gICAgICAgIG5hbWU6ICdHdWFtJ1xuICAgIH0sXG4gICAgR1Q6IHtcbiAgICAgICAgbmFtZTogJ0d1YXRlbWFsYSdcbiAgICB9LFxuICAgIEdHOiB7XG4gICAgICAgIG5hbWU6ICdHdWVybnNleSdcbiAgICB9LFxuICAgIEdOOiB7XG4gICAgICAgIG5hbWU6ICdHdWluZWEnXG4gICAgfSxcbiAgICBHVzoge1xuICAgICAgICBuYW1lOiAnR3VpbmVhLUJpc3NhdSdcbiAgICB9LFxuICAgIEdZOiB7XG4gICAgICAgIG5hbWU6ICdHdXlhbmEnXG4gICAgfSxcbiAgICBIVDoge1xuICAgICAgICBuYW1lOiAnSGFpdGknXG4gICAgfSxcbiAgICBITToge1xuICAgICAgICBuYW1lOiAnSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgVkE6IHtcbiAgICAgICAgbmFtZTogJ0hvbHkgU2VlIChWYXRpY2FuIENpdHkgU3RhdGUpJ1xuICAgIH0sXG4gICAgSE46IHtcbiAgICAgICAgbmFtZTogJ0hvbmR1cmFzJ1xuICAgIH0sXG4gICAgSEs6IHtcbiAgICAgICAgbmFtZTogJ0hvbmcgS29uZydcbiAgICB9LFxuICAgIEhVOiB7XG4gICAgICAgIG5hbWU6ICdIdW5nYXJ5J1xuICAgIH0sXG4gICAgSVM6IHtcbiAgICAgICAgbmFtZTogJ0ljZWxhbmQnXG4gICAgfSxcbiAgICBJTjoge1xuICAgICAgICBuYW1lOiAnSW5kaWEnXG4gICAgfSxcbiAgICBJRDoge1xuICAgICAgICBuYW1lOiAnSW5kb25lc2lhJ1xuICAgIH0sXG4gICAgSVI6IHtcbiAgICAgICAgbmFtZTogJ0lyYW4sIElzbGFtaWMgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBJUToge1xuICAgICAgICBuYW1lOiAnSXJhcSdcbiAgICB9LFxuICAgIElFOiB7XG4gICAgICAgIG5hbWU6ICdJcmVsYW5kJ1xuICAgIH0sXG4gICAgSU06IHtcbiAgICAgICAgbmFtZTogJ0lzbGUgb2YgTWFuJ1xuICAgIH0sXG4gICAgSUw6IHtcbiAgICAgICAgbmFtZTogJ0lzcmFlbCdcbiAgICB9LFxuICAgIElUOiB7XG4gICAgICAgIG5hbWU6ICdJdGFseSdcbiAgICB9LFxuICAgIEpNOiB7XG4gICAgICAgIG5hbWU6ICdKYW1haWNhJ1xuICAgIH0sXG4gICAgSlA6IHtcbiAgICAgICAgbmFtZTogJ0phcGFuJ1xuICAgIH0sXG4gICAgSkU6IHtcbiAgICAgICAgbmFtZTogJ0plcnNleSdcbiAgICB9LFxuICAgIEpPOiB7XG4gICAgICAgIG5hbWU6ICdKb3JkYW4nXG4gICAgfSxcbiAgICBLWjoge1xuICAgICAgICBuYW1lOiAnS2F6YWtoc3RhbidcbiAgICB9LFxuICAgIEtFOiB7XG4gICAgICAgIG5hbWU6ICdLZW55YSdcbiAgICB9LFxuICAgIEtJOiB7XG4gICAgICAgIG5hbWU6ICdLaXJpYmF0aSdcbiAgICB9LFxuICAgIEtQOiB7XG4gICAgICAgIG5hbWU6ICdLb3JlYSBEZW1vY3JhdGljIFBlb3BsZVxcJ3MgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBLUjoge1xuICAgICAgICBuYW1lOiAnS29yZWEgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBLVzoge1xuICAgICAgICBuYW1lOiAnS3V3YWl0J1xuICAgIH0sXG4gICAgS0c6IHtcbiAgICAgICAgbmFtZTogJ0t5cmd5enN0YW4nXG4gICAgfSxcbiAgICBMQToge1xuICAgICAgICBuYW1lOiAnTGFvIFBlb3BsZVxcJ3MgRGVtb2NyYXRpYyBSZXB1YmxpYydcbiAgICB9LFxuICAgIExWOiB7XG4gICAgICAgIG5hbWU6ICdMYXR2aWEnXG4gICAgfSxcbiAgICBMQjoge1xuICAgICAgICBuYW1lOiAnTGViYW5vbidcbiAgICB9LFxuICAgIExTOiB7XG4gICAgICAgIG5hbWU6ICdMZXNvdGhvJ1xuICAgIH0sXG4gICAgTFI6IHtcbiAgICAgICAgbmFtZTogJ0xpYmVyaWEnXG4gICAgfSxcbiAgICBMWToge1xuICAgICAgICBuYW1lOiAnTGlieWEnXG4gICAgfSxcbiAgICBMSToge1xuICAgICAgICBuYW1lOiAnTGllY2h0ZW5zdGVpbidcbiAgICB9LFxuICAgIExUOiB7XG4gICAgICAgIG5hbWU6ICdMaXRodWFuaWEnXG4gICAgfSxcbiAgICBMVToge1xuICAgICAgICBuYW1lOiAnTHV4ZW1ib3VyZydcbiAgICB9LFxuICAgIE1POiB7XG4gICAgICAgIG5hbWU6ICdNYWNhbydcbiAgICB9LFxuICAgIE1LOiB7XG4gICAgICAgIG5hbWU6ICdNYWNlZG9uaWEsIHRoZSBmb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBNRzoge1xuICAgICAgICBuYW1lOiAnTWFkYWdhc2NhcidcbiAgICB9LFxuICAgIE1XOiB7XG4gICAgICAgIG5hbWU6ICdNYWxhd2knXG4gICAgfSxcbiAgICBNWToge1xuICAgICAgICBuYW1lOiAnTWFsYXlzaWEnXG4gICAgfSxcbiAgICBNVjoge1xuICAgICAgICBuYW1lOiAnTWFsZGl2ZXMnXG4gICAgfSxcbiAgICBNTDoge1xuICAgICAgICBuYW1lOiAnTWFsaSdcbiAgICB9LFxuICAgIE1UOiB7XG4gICAgICAgIG5hbWU6ICdNYWx0YSdcbiAgICB9LFxuICAgIE1IOiB7XG4gICAgICAgIG5hbWU6ICdNYXJzaGFsbCBJc2xhbmRzJ1xuICAgIH0sXG4gICAgTVE6IHtcbiAgICAgICAgbmFtZTogJ01hcnRpbmlxdWUnXG4gICAgfSxcbiAgICBNUjoge1xuICAgICAgICBuYW1lOiAnTWF1cml0YW5pYSdcbiAgICB9LFxuICAgIE1VOiB7XG4gICAgICAgIG5hbWU6ICdNYXVyaXRpdXMnXG4gICAgfSxcbiAgICBZVDoge1xuICAgICAgICBuYW1lOiAnTWF5b3R0ZSdcbiAgICB9LFxuICAgIE1YOiB7XG4gICAgICAgIG5hbWU6ICdNZXhpY28nXG4gICAgfSxcbiAgICBGTToge1xuICAgICAgICBuYW1lOiAnTWljcm9uZXNpYSwgRmVkZXJhdGVkIFN0YXRlcyBvZidcbiAgICB9LFxuICAgIE1EOiB7XG4gICAgICAgIG5hbWU6ICdNb2xkb3ZhLCBSZXB1YmxpYyBvZidcbiAgICB9LFxuICAgIE1DOiB7XG4gICAgICAgIG5hbWU6ICdNb25hY28nXG4gICAgfSxcbiAgICBNTjoge1xuICAgICAgICBuYW1lOiAnTW9uZ29saWEnXG4gICAgfSxcbiAgICBNRToge1xuICAgICAgICBuYW1lOiAnTW9udGVuZWdybydcbiAgICB9LFxuICAgIE1TOiB7XG4gICAgICAgIG5hbWU6ICdNb250c2VycmF0J1xuICAgIH0sXG4gICAgTUE6IHtcbiAgICAgICAgbmFtZTogJ01vcm9jY28nXG4gICAgfSxcbiAgICBNWjoge1xuICAgICAgICBuYW1lOiAnTW96YW1iaXF1ZSdcbiAgICB9LFxuICAgIE1NOiB7XG4gICAgICAgIG5hbWU6ICdNeWFubWFyJ1xuICAgIH0sXG4gICAgTkE6IHtcbiAgICAgICAgbmFtZTogJ05hbWliaWEnXG4gICAgfSxcbiAgICBOUjoge1xuICAgICAgICBuYW1lOiAnTmF1cnUnXG4gICAgfSxcbiAgICBOUDoge1xuICAgICAgICBuYW1lOiAnTmVwYWwnXG4gICAgfSxcbiAgICBOTDoge1xuICAgICAgICBuYW1lOiAnTmV0aGVybGFuZHMnXG4gICAgfSxcbiAgICBOQzoge1xuICAgICAgICBuYW1lOiAnTmV3IENhbGVkb25pYSdcbiAgICB9LFxuICAgIE5aOiB7XG4gICAgICAgIG5hbWU6ICdOZXcgWmVhbGFuZCdcbiAgICB9LFxuICAgIE5JOiB7XG4gICAgICAgIG5hbWU6ICdOaWNhcmFndWEnXG4gICAgfSxcbiAgICBORToge1xuICAgICAgICBuYW1lOiAnTmlnZXInXG4gICAgfSxcbiAgICBORzoge1xuICAgICAgICBuYW1lOiAnTmlnZXJpYSdcbiAgICB9LFxuICAgIE5VOiB7XG4gICAgICAgIG5hbWU6ICdOaXVlJ1xuICAgIH0sXG4gICAgTkY6IHtcbiAgICAgICAgbmFtZTogJ05vcmZvbGsgSXNsYW5kJ1xuICAgIH0sXG4gICAgTVA6IHtcbiAgICAgICAgbmFtZTogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcydcbiAgICB9LFxuICAgIE5POiB7XG4gICAgICAgIG5hbWU6ICdOb3J3YXknXG4gICAgfSxcbiAgICBPTToge1xuICAgICAgICBuYW1lOiAnT21hbidcbiAgICB9LFxuICAgIFBLOiB7XG4gICAgICAgIG5hbWU6ICdQYWtpc3RhbidcbiAgICB9LFxuICAgIFBXOiB7XG4gICAgICAgIG5hbWU6ICdQYWxhdSdcbiAgICB9LFxuICAgIFBTOiB7XG4gICAgICAgIG5hbWU6ICdQYWxlc3RpbmlhbiBUZXJyaXRvcnknXG4gICAgfSxcbiAgICBQQToge1xuICAgICAgICBuYW1lOiAnUGFuYW1hJ1xuICAgIH0sXG4gICAgUEc6IHtcbiAgICAgICAgbmFtZTogJ1BhcHVhIE5ldyBHdWluZWEnXG4gICAgfSxcbiAgICBQWToge1xuICAgICAgICBuYW1lOiAnUGFyYWd1YXknXG4gICAgfSxcbiAgICBQRToge1xuICAgICAgICBuYW1lOiAnUGVydSdcbiAgICB9LFxuICAgIFBIOiB7XG4gICAgICAgIG5hbWU6ICdQaGlsaXBwaW5lcydcbiAgICB9LFxuICAgIFBOOiB7XG4gICAgICAgIG5hbWU6ICdQaXRjYWlybidcbiAgICB9LFxuICAgIFBMOiB7XG4gICAgICAgIG5hbWU6ICdQb2xhbmQnXG4gICAgfSxcbiAgICBQVDoge1xuICAgICAgICBuYW1lOiAnUG9ydHVnYWwnXG4gICAgfSxcbiAgICBQUjoge1xuICAgICAgICBuYW1lOiAnUHVlcnRvIFJpY28nXG4gICAgfSxcbiAgICBRQToge1xuICAgICAgICBuYW1lOiAnUWF0YXInXG4gICAgfSxcbiAgICBSRToge1xuICAgICAgICBuYW1lOiAnUsOpdW5pb24nXG4gICAgfSxcbiAgICBSTzoge1xuICAgICAgICBuYW1lOiAnUm9tYW5pYSdcbiAgICB9LFxuICAgIFJVOiB7XG4gICAgICAgIG5hbWU6ICdSdXNzaWFuIEZlZGVyYXRpb24nXG4gICAgfSxcbiAgICBSVzoge1xuICAgICAgICBuYW1lOiAnUndhbmRhJ1xuICAgIH0sXG4gICAgQkw6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEJhcnRow6lsZW15J1xuICAgIH0sXG4gICAgU0g6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJ1xuICAgIH0sXG4gICAgS046IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IEtpdHRzIGFuZCBOZXZpcydcbiAgICB9LFxuICAgIExDOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBMdWNpYSdcbiAgICB9LFxuICAgIE1GOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KSdcbiAgICB9LFxuICAgIFBNOiB7XG4gICAgICAgIG5hbWU6ICdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJ1xuICAgIH0sXG4gICAgVkM6IHtcbiAgICAgICAgbmFtZTogJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJ1xuICAgIH0sXG4gICAgV1M6IHtcbiAgICAgICAgbmFtZTogJ1NhbW9hJ1xuICAgIH0sXG4gICAgU006IHtcbiAgICAgICAgbmFtZTogJ1NhbiBNYXJpbm8nXG4gICAgfSxcbiAgICBTVDoge1xuICAgICAgICBuYW1lOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJ1xuICAgIH0sXG4gICAgU0E6IHtcbiAgICAgICAgbmFtZTogJ1NhdWRpIEFyYWJpYSdcbiAgICB9LFxuICAgIFNOOiB7XG4gICAgICAgIG5hbWU6ICdTZW5lZ2FsJ1xuICAgIH0sXG4gICAgUlM6IHtcbiAgICAgICAgbmFtZTogJ1NlcmJpYSdcbiAgICB9LFxuICAgIFNDOiB7XG4gICAgICAgIG5hbWU6ICdTZXljaGVsbGVzJ1xuICAgIH0sXG4gICAgU0w6IHtcbiAgICAgICAgbmFtZTogJ1NpZXJyYSBMZW9uZSdcbiAgICB9LFxuICAgIFNHOiB7XG4gICAgICAgIG5hbWU6ICdTaW5nYXBvcmUnXG4gICAgfSxcbiAgICBTWDoge1xuICAgICAgICBuYW1lOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KSdcbiAgICB9LFxuICAgIFNLOiB7XG4gICAgICAgIG5hbWU6ICdTbG92YWtpYSdcbiAgICB9LFxuICAgIFNJOiB7XG4gICAgICAgIG5hbWU6ICdTbG92ZW5pYSdcbiAgICB9LFxuICAgIFNCOiB7XG4gICAgICAgIG5hbWU6ICdTb2xvbW9uIElzbGFuZHMnXG4gICAgfSxcbiAgICBTTzoge1xuICAgICAgICBuYW1lOiAnU29tYWxpYSdcbiAgICB9LFxuICAgIFpBOiB7XG4gICAgICAgIG5hbWU6ICdTb3V0aCBBZnJpY2EnXG4gICAgfSxcbiAgICBHUzoge1xuICAgICAgICBuYW1lOiAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnXG4gICAgfSxcbiAgICBTUzoge1xuICAgICAgICBuYW1lOiAnU291dGggU3VkYW4nXG4gICAgfSxcbiAgICBFUzoge1xuICAgICAgICBuYW1lOiAnU3BhaW4nXG4gICAgfSxcbiAgICBMSzoge1xuICAgICAgICBuYW1lOiAnU3JpIExhbmthJ1xuICAgIH0sXG4gICAgU0Q6IHtcbiAgICAgICAgbmFtZTogJ1N1ZGFuJ1xuICAgIH0sXG4gICAgU1I6IHtcbiAgICAgICAgbmFtZTogJ1N1cmluYW1lJ1xuICAgIH0sXG4gICAgU0o6IHtcbiAgICAgICAgbmFtZTogJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nXG4gICAgfSxcbiAgICBTWjoge1xuICAgICAgICBuYW1lOiAnU3dhemlsYW5kJ1xuICAgIH0sXG4gICAgU0U6IHtcbiAgICAgICAgbmFtZTogJ1N3ZWRlbidcbiAgICB9LFxuICAgIENIOiB7XG4gICAgICAgIG5hbWU6ICdTd2l0emVybGFuZCdcbiAgICB9LFxuICAgIFNZOiB7XG4gICAgICAgIG5hbWU6ICdTeXJpYW4gQXJhYiBSZXB1YmxpYydcbiAgICB9LFxuICAgIFRXOiB7XG4gICAgICAgIG5hbWU6ICdUYWl3YW4nXG4gICAgfSxcbiAgICBUSjoge1xuICAgICAgICBuYW1lOiAnVGFqaWtpc3RhbidcbiAgICB9LFxuICAgIFRaOiB7XG4gICAgICAgIG5hbWU6ICdUYW56YW5pYSBVbml0ZWQgUmVwdWJsaWMgb2YnXG4gICAgfSxcbiAgICBUSDoge1xuICAgICAgICBuYW1lOiAnVGhhaWxhbmQnXG4gICAgfSxcbiAgICBUTDoge1xuICAgICAgICBuYW1lOiAnVGltb3ItTGVzdGUnXG4gICAgfSxcbiAgICBURzoge1xuICAgICAgICBuYW1lOiAnVG9nbydcbiAgICB9LFxuICAgIFRLOiB7XG4gICAgICAgIG5hbWU6ICdUb2tlbGF1J1xuICAgIH0sXG4gICAgVE86IHtcbiAgICAgICAgbmFtZTogJ1RvbmdhJ1xuICAgIH0sXG4gICAgVFQ6IHtcbiAgICAgICAgbmFtZTogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nXG4gICAgfSxcbiAgICBUTjoge1xuICAgICAgICBuYW1lOiAnVHVuaXNpYSdcbiAgICB9LFxuICAgIFRSOiB7XG4gICAgICAgIG5hbWU6ICdUdXJrZXknXG4gICAgfSxcbiAgICBUTToge1xuICAgICAgICBuYW1lOiAnVHVya21lbmlzdGFuJ1xuICAgIH0sXG4gICAgVEM6IHtcbiAgICAgICAgbmFtZTogJ1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcydcbiAgICB9LFxuICAgIFRWOiB7XG4gICAgICAgIG5hbWU6ICdUdXZhbHUnXG4gICAgfSxcbiAgICBVRzoge1xuICAgICAgICBuYW1lOiAnVWdhbmRhJ1xuICAgIH0sXG4gICAgVUE6IHtcbiAgICAgICAgbmFtZTogJ1VrcmFpbmUnXG4gICAgfSxcbiAgICBBRToge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnXG4gICAgfSxcbiAgICBHQjoge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIEtpbmdkb20nXG4gICAgfSxcbiAgICBVUzoge1xuICAgICAgICBuYW1lOiAnVW5pdGVkIFN0YXRlcydcbiAgICB9LFxuICAgIFVNOiB7XG4gICAgICAgIG5hbWU6ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnXG4gICAgfSxcbiAgICBVWToge1xuICAgICAgICBuYW1lOiAnVXJ1Z3VheSdcbiAgICB9LFxuICAgIFVaOiB7XG4gICAgICAgIG5hbWU6ICdVemJla2lzdGFuJ1xuICAgIH0sXG4gICAgVlU6IHtcbiAgICAgICAgbmFtZTogJ1ZhbnVhdHUnXG4gICAgfSxcbiAgICBWRToge1xuICAgICAgICBuYW1lOiAnVmVuZXp1ZWxhLCBCb2xpdmFyaWFuIFJlcHVibGljIG9mJ1xuICAgIH0sXG4gICAgVk46IHtcbiAgICAgICAgbmFtZTogJ1ZpZXRuYW0nXG4gICAgfSxcbiAgICBWRzoge1xuICAgICAgICBuYW1lOiAnVmlyZ2luIElzbGFuZHMnXG4gICAgfSxcbiAgICBWSToge1xuICAgICAgICBuYW1lOiAnVmlyZ2luIElzbGFuZHMsIFUuUydcbiAgICB9LFxuICAgIFdGOiB7XG4gICAgICAgIG5hbWU6ICdXYWxsaXMgYW5kIEZ1dHVuYSdcbiAgICB9LFxuICAgIEVIOiB7XG4gICAgICAgIG5hbWU6ICdXZXN0ZXJuIFNhaGFyYSdcbiAgICB9LFxuICAgIFlFOiB7XG4gICAgICAgIG5hbWU6ICdZZW1lbidcbiAgICB9LFxuICAgIFpNOiB7XG4gICAgICAgIG5hbWU6ICdaYW1iaWEnXG4gICAgfSxcbiAgICBaVzoge1xuICAgICAgICBuYW1lOiAnWmltYmFid2UnXG4gICAgfVxufTtcbmNvbnN0IEdMT0JBTCA9IHtcbiAgICBjb21wbGV0ZWRPcmRlcjogbnVsbCxcbiAgICBwaHBEYXRhOiBudWxsLFxuICAgIGxpbmtlZFByb2R1Y3RzSWRzOiBbXVxufTtcbmZ1bmN0aW9uIHBlYWNocGF5QWxlcnQobWVzc2FnZSwgYWN0aW9uID0gJycpIHtcbiAgICBpZiAoR0xPQkFMPy5waHBEYXRhPy5hbGVydFN1cHBvcnQpIHtcbiAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBldmVudDogJ3BlYWNocGF5QWxlcnQnLFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9LCAnKicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKGFjdGlvbiwgJyonKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbWVyKCkge1xuICAgIGNvbnN0IGlGcmFtZVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvbmUtY2xpY2staWZyYW1lJyk/LmNvbnRlbnRXaW5kb3c7XG4gICAgaWYgKCFpRnJhbWVXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmZXRjaFdpbmRvd0RhdGEoaUZyYW1lV2luZG93LCAncHAtZ2V0LWV4aXN0aW5nLWN1c3RvbWVyLWRhdGEnKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldEN1c3RvbWVyKGN1c3RvbWVyKSB7XG4gICAgY29uc3QgaUZyYW1lV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29uZS1jbGljay1pZnJhbWUnKT8uY29udGVudFdpbmRvdztcbiAgICBpZiAoIWlGcmFtZVdpbmRvdykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmZXRjaFdpbmRvd0RhdGEoaUZyYW1lV2luZG93LCAncHAtc2V0LWV4aXN0aW5nLWN1c3RvbWVyLWRhdGEnLCBjdXN0b21lcik7XG59XG5mdW5jdGlvbiBjYXJ0SXNWaXJ0dWFsKGNhcnQpIHtcbiAgICBpZiAoY2FydD8ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gY2FydD8uZXZlcnkoKHYpPT52LnZpcnR1YWxcbiAgICApID8/IHRydWU7XG59XG5mdW5jdGlvbiBpdGVtc0luQ2FydChjYXJ0KSB7XG4gICAgcmV0dXJuIGNhcnQ/Lmxlbmd0aCA/PyAwO1xufVxuZnVuY3Rpb24gY2FydEl0ZW1RdWFudGl0eShjYXJ0SXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgY2FydEl0ZW0/LnF1YW50aXR5ID09PSAnc3RyaW5nJyA/IE51bWJlci5wYXJzZUludChjYXJ0SXRlbS5xdWFudGl0eSkgOiBjYXJ0SXRlbT8ucXVhbnRpdHkgPz8gMDtcbn1cbmZ1bmN0aW9uIHJlc3RyaWN0ZWRDYXJ0UHJvZHVjdHNCeUNvdW50cnkoY2FydCwgc2VsZWN0ZWRDb3VudHJ5Q29kZSkge1xuICAgIHJldHVybiBjYXJ0LmZpbHRlcigodik9PntcbiAgICAgICAgaWYgKHYud2NfY291bnRyeV9iYXNlX3Jlc3RyaWN0aW9ucykge1xuICAgICAgICAgICAgaWYgKHYud2NfY291bnRyeV9iYXNlX3Jlc3RyaWN0aW9ucy50eXBlID09PSAnc3BlY2lmaWMnICYmICF2LndjX2NvdW50cnlfYmFzZV9yZXN0cmljdGlvbnMuY291bnRyaWVzLmluY2x1ZGVzKHNlbGVjdGVkQ291bnRyeUNvZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zLnR5cGUgPT09ICdleGNsdWRlZCcgJiYgdi53Y19jb3VudHJ5X2Jhc2VfcmVzdHJpY3Rpb25zLmNvdW50cmllcy5pbmNsdWRlcyhzZWxlY3RlZENvdW50cnlDb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQ2FydEl0ZW1zV2l0aEN1c3RvbWVyKGNhcnQsIHVzZUxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgZ2V0Q3VzdG9tZXIoKTtcbiAgICBjb25zdCBjb3VudHJ5VmFsdWUgPSAkcXMoJyNjb3VudHJ5Jyk/LnZhbHVlID8/ICcnO1xuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UgJiYgY3VzdG9tZXIpIHtcbiAgICAgICAgY29uc3QgaW52YWxpZENhcnRJdGVtcyA9IHJlc3RyaWN0ZWRDYXJ0UHJvZHVjdHNCeUNvdW50cnkoY2FydCwgY3VzdG9tZXIuY291bnRyeSk7XG4gICAgICAgIGlmIChpbnZhbGlkQ2FydEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcGVhY2hwYXlBbGVydChgVGhlIGZvbGxvd2luZyBjYXJ0IGl0ZW1zIGNhbm5vdCBiZSBzaGlwcGVkIHRvICR7Z2V0Q291bnRyeU5hbWUoY291bnRyeVZhbHVlKX06XFxuICR7aW52YWxpZENhcnRJdGVtcy5tYXAoKHYpPT52Lm5hbWVcbiAgICAgICAgKS5qb2luKCcsJyl9LlxcbiBQbGVhc2UgcmVtb3ZlIHRoZW0gZnJvbSB5b3VyIGNhcnQuYCwgJ2Nsb3NlTW9kYWwnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkQ2FydEl0ZW1zID0gcmVzdHJpY3RlZENhcnRQcm9kdWN0c0J5Q291bnRyeShjYXJ0LCBjb3VudHJ5VmFsdWUpO1xuICAgIGlmIChpbnZhbGlkQ2FydEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGVhY2hwYXlBbGVydChgVGhlIGZvbGxvd2luZyBjYXJ0IGl0ZW1zIGNhbm5vdCBiZSBzaGlwcGVkIHRvICR7Z2V0Q291bnRyeU5hbWUoY291bnRyeVZhbHVlKX06XFxuICR7aW52YWxpZENhcnRJdGVtcy5tYXAoKHYpPT52Lm5hbWVcbiAgICApLmpvaW4oJywnKX0uXFxuIFBsZWFzZSByZW1vdmUgdGhlbSBmcm9tIHlvdXIgY2FydC5gLCAnY2xvc2VNb2RhbCcpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGJ1aWxkU3Vic2NyaXB0aW9uUHJpY2VNZXRhRGF0YShtZXRhLCBfX3Nob3J0ID0gZmFsc2UpIHtcbiAgICBpZiAoIW1ldGEuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKE51bWJlci5wYXJzZUludChTdHJpbmcobWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kX2ludGVydmFsKSkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGAgLyAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1gO1xuICAgIH1cbiAgICBpZiAoX19zaG9ydCkge1xuICAgICAgICByZXR1cm4gYCBldmVyeSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZF9pbnRlcnZhbH0gJHttZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2R9c2A7XG4gICAgfVxuICAgIHJldHVybiBgIGV2ZXJ5ICR7bWV0YS5zdWJzY3JpcHRpb24ucGVyaW9kX2ludGVydmFsfSAke21ldGEuc3Vic2NyaXB0aW9uLnBlcmlvZH1zIGZvciAke21ldGEuc3Vic2NyaXB0aW9uLmxlbmd0aH0gJHttZXRhLnN1YnNjcmlwdGlvbi5wZXJpb2R9c2A7XG59XG5mdW5jdGlvbiBidWlsZFN1YnNjcmlwdGlvbkZpcnN0UmVuZXdhbFN0cmluZyhtZXRhKSB7XG4gICAgaWYgKCFtZXRhLnN1YnNjcmlwdGlvbiB8fCAhbWV0YS5zdWJzY3JpcHRpb24uZmlyc3RfcmVuZXdhbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShtZXRhLnN1YnNjcmlwdGlvbi5maXJzdF9yZW5ld2FsKTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfTtcbiAgICByZXR1cm4gYEZpcnN0IHJlbmV3YWw6ICR7ZGF0ZS50b0xvY2FsZVN0cmluZyhFbnZpcm9ubWVudC5sYW5ndWFnZSgpLCBvcHRpb25zKX1gO1xufVxuZnVuY3Rpb24gaW5pdE1lcmNoYW50QWNjb3VudChtZXNzYWdlKSB7XG4gICAgaW5pdE1lcmNoYW50QWNjb3VudEV2ZW50cygpO1xuICAgIGNvbnN0IGFjY291bnREZXRhaWxzID0gbWVzc2FnZS5waHBEYXRhLm1lcmNoYW50X2N1c3RvbWVyX2FjY291bnQ7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRBY2NvdW50Q29uZmlnKHtcbiAgICAgICAgYWxsb3dHdWVzdENoZWNrb3V0OiBhY2NvdW50RGV0YWlscz8uYWxsb3dfZ3Vlc3RfY2hlY2tvdXQgPz8gdHJ1ZSxcbiAgICAgICAgYWxsb3dBY2NvdW50Q3JlYXRpb25PckxvZ2luRHVyaW5nQ2hlY2tvdXQ6IGFjY291bnREZXRhaWxzPy5sb2dpbnNfYW5kX3JlZ2lzdHJhdGlvbnNfZW5hYmxlZCA/PyB0cnVlLFxuICAgICAgICBhdXRvR2VuZXJhdGVVc2VybmFtZTogYWNjb3VudERldGFpbHM/LmF1dG9fZ2VuZXJhdGVfdXNlcm5hbWUgPz8gZmFsc2UsXG4gICAgICAgIGF1dG9HZW5lcmF0ZVBhc3N3b3JkOiBhY2NvdW50RGV0YWlscz8uYXV0b19nZW5lcmF0ZV9wYXNzd29yZCA/PyBmYWxzZVxuICAgIH0pKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudCh7XG4gICAgICAgIHVzZXJuYW1lOiBhY2NvdW50RGV0YWlscy5lbWFpbCA/PyAnJyxcbiAgICAgICAgbG9nZ2VkSW46IGFjY291bnREZXRhaWxzLmxvZ2dlZF9pbiA/PyBmYWxzZSxcbiAgICAgICAgdXNlcm5hbWVJc1JlZ2lzdGVyZWQ6IGFjY291bnREZXRhaWxzLmxvZ2dlZF9pbiA/PyBmYWxzZVxuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGluaXRNZXJjaGFudEFjY291bnRFdmVudHMoKSB7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIHJlbmRlck1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRJbnB1dChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgIUVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkgJiYgRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkgPT09ICdwYXltZW50Jyk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCk9PntcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmVxdWVzdE1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShQZWFjaFBheUN1c3RvbWVyLmVtYWlsKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnZW1haWxFeGlzdCcsIChtZXNzYWdlKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lck1lcmNoYW50QWNjb3VudEV4aXN0ZW5jZShCb29sZWFuKG1lc3NhZ2UuZW1haWxSZXN1bHQpKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZXF1ZXN0TWVyY2hhbnRBY2NvdW50RXhpc3RlbmNlKGVtYWlsKSB7XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogJ2VtYWlsRXhpc3QnLFxuICAgICAgICBlbWFpbFxuICAgIH0sICcqJyk7XG59XG5mdW5jdGlvbiBnZXRNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkVmFsdWUoKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZCcpO1xuICAgIGNvbnN0ICRpbnB1dEV4aXN0aW5nID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZC1leGlzdGluZycpO1xuICAgIGlmICghJGlucHV0IHx8ICEkaW5wdXRFeGlzdGluZykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICgkaW5wdXRFeGlzdGluZy52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgcmV0dXJuICRpbnB1dEV4aXN0aW5nLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gJGlucHV0LnZhbHVlO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVNZXJjaGFudEN1c3RvbWVyUGFzc3dvcmRGaWVsZCgpIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpO1xuICAgIGNvbnN0ICRyZWRUZXh0ID0gJHFzKCcjYWNjb3VudC1wYXNzd29yZC1lcnJvcicpO1xuICAgIGNvbnN0ICRyZWRUZXh0RXhpc3RpbmcgPSAkcXMoJyNhY2NvdW50LXBhc3N3b3JkLWVycm9yLWV4aXN0aW5nJyk7XG4gICAgaWYgKCEkcmVkVGV4dCB8fCAhJHJlZFRleHRFeGlzdGluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwYXNzd29yZCA9PT0gJycgfHwgcGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgICAkcmVkVGV4dC50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ2ludmFsaWQtbWVyY2hhbnQtcGFzc3dvcmQnKTtcbiAgICAgICAgJHJlZFRleHRFeGlzdGluZy50ZXh0Q29udGVudCA9IGdldExvY2FsZVRleHQoJ2ludmFsaWQtbWVyY2hhbnQtcGFzc3dvcmQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkcmVkVGV4dC50ZXh0Q29udGVudCA9ICcnO1xuICAgICRyZWRUZXh0RXhpc3RpbmcudGV4dENvbnRlbnQgPSAnJztcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNob3VsZFNob3dNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkRmllbGQoKSB7XG4gICAgaWYgKE1lcmNoYW50Q3VzdG9tZXIubG9nZ2VkSW4oKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghQ2FydHMuc3Vic2NyaXB0aW9uUHJlc2VudCgpKSB7XG4gICAgICAgIGlmICghTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmFsbG93R3Vlc3RDaGVja291dCgpKSB7XG4gICAgICAgICAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmdlbmVyYXRlUGFzc3dvcmRFbmFibGVkKCkgJiYgIU1lcmNoYW50Q3VzdG9tZXIudXNlcm5hbWVFeGlzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghTWVyY2hhbnRDb25maWd1cmF0aW9uLmFjY291bnRzLmxvZ2luRHVyaW5nQ2hlY2tvdXRFbmFibGVkKCkgJiYgIU1lcmNoYW50Q3VzdG9tZXIudXNlcm5hbWVFeGlzdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5nZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5hY2NvdW50cy5nZW5lcmF0ZVBhc3N3b3JkRW5hYmxlZCgpICYmICFNZXJjaGFudEN1c3RvbWVyLnVzZXJuYW1lRXhpc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gcmVuZGVyTWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZElucHV0KG1lcmNoYW50SG9zdG5hbWUsIG9uTmV3UGF5bWVudFNjcmVlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJHFzKCcjcHAtYWNjb3VudC1wYXNzd29yZCcpO1xuICAgIGNvbnN0ICRpbnB1dEV4aXN0aW5nID0gJHFzKCcjcHAtYWNjb3VudC1wYXNzd29yZC1leGlzdGluZycpO1xuICAgIGlmICghJGlucHV0IHx8ICEkaW5wdXRFeGlzdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICRpbnB1dC52YWx1ZSA9ICcnO1xuICAgICRpbnB1dEV4aXN0aW5nLnZhbHVlID0gJyc7XG4gICAgY29uc3QgbGFiZWxIVE1MID0gZ2V0TG9jYWxlVGV4dCgnYWNjb3VudC1wYXNzd29yZC1leHBsYW5hdGlvbicpICsgJyAnICsgbWVyY2hhbnRIb3N0bmFtZTtcbiAgICAkcXMoJyNwcC1hY2NvdW50LXBhc3N3b3JkLWxhYmVsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxIVE1MXG4gICAgKTtcbiAgICAkcXMoJyNwcC1hY2NvdW50LXBhc3N3b3JkLWxhYmVsLWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxIVE1MXG4gICAgKTtcbiAgICBpZiAoc2hvdWxkU2hvd01lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRGaWVsZCgpKSB7XG4gICAgICAgIGlmIChvbk5ld1BheW1lbnRTY3JlZW4pIHtcbiAgICAgICAgICAgICRpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgICRpbnB1dEV4aXN0aW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkaW5wdXRFeGlzdGluZy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdERlbGl2ZXJ5RGF0ZSgpIHtcbiAgICAkcXMoJyNleGlzdGluZy1kZWxpdmVyeS1kYXRlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoZWNrRGVsaXZlcnlEYXRlSXNWYWxpZCk7XG4gICAgJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVEZWxpdmVyeURhdGUpO1xuICAgICRxcygnI2RlbGl2ZXJ5LWRhdGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hlY2tEZWxpdmVyeURhdGVJc1ZhbGlkKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyRGVsaXZlcnlEYXRlKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjb2xsZWN0RGVsaXZlcnlEYXRlKCkge1xuICAgIHJldHVybiAkcXMoJyNkZWxpdmVyeS1kYXRlJyk/LnZhbHVlID8/ICcnO1xufVxuZnVuY3Rpb24gcmVuZGVyRGVsaXZlcnlEYXRlKCkge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhLnBsdWdpbl93b29jb21tZXJjZV9vcmRlcl9kZWxpdmVyeV9hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXMoJyNleGlzdGluZy1jaGVja291dC1kZWxpdmVyeS1kYXRlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAkcXMoJyNjaGVja291dC1kZWxpdmVyeS1kYXRlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25zdCB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1heERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIG1heERhdGUuc2V0RGF0ZSh0b2RheURhdGUuZ2V0RGF0ZSgpICsgKEdMT0JBTC5waHBEYXRhLnBsdWdpbl93b29jb21tZXJjZV9vcmRlcl9kZWxpdmVyeV9vcHRpb25zPy53Y19vZF9tYXhfZGVsaXZlcnlfZGF5cyA/PyAwKSk7XG4gICAgY29uc3QgJHNoaXBwaW5nRGF0ZSA9ICRxcygnI2RlbGl2ZXJ5LWRhdGUnKTtcbiAgICBjb25zdCAkZXhpc3RpbmdDdXN0b21lclNoaXBwaW5nRGF0ZSA9ICRxcygnI2V4aXN0aW5nLWRlbGl2ZXJ5LWRhdGUnKTtcbiAgICBpZiAoISRzaGlwcGluZ0RhdGUgfHwgISRleGlzdGluZ0N1c3RvbWVyU2hpcHBpbmdEYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJHNoaXBwaW5nRGF0ZS5yZXF1aXJlZCA9IHRydWU7XG4gICAgJGV4aXN0aW5nQ3VzdG9tZXJTaGlwcGluZ0RhdGUubWluID0gdG9kYXlEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICRzaGlwcGluZ0RhdGUubWluID0gdG9kYXlEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICRleGlzdGluZ0N1c3RvbWVyU2hpcHBpbmdEYXRlLm1heCA9IG1heERhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgJHNoaXBwaW5nRGF0ZS5tYXggPSBtYXhEYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xufVxuZnVuY3Rpb24gY2hlY2tEZWxpdmVyeURhdGVJc0VtcHR5KCkge1xuICAgIHJldHVybiAoJHFzKCcjZXhpc3RpbmctZGVsaXZlcnktZGF0ZScpPy52YWx1ZSA/PyAnJykgPT09ICcnO1xufVxuZnVuY3Rpb24gdXBkYXRlRGVsaXZlcnlEYXRlKCkge1xuICAgIGNvbnN0ICRkZWxpdmVyeURhdGUgPSAkcXMoJyNkZWxpdmVyeS1kYXRlJyk7XG4gICAgaWYgKCEkZGVsaXZlcnlEYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJGRlbGl2ZXJ5RGF0ZS52YWx1ZSA9ICRxcygnI2V4aXN0aW5nLWRlbGl2ZXJ5LWRhdGUnKT8udmFsdWUgPz8gJyc7XG59XG5mdW5jdGlvbiBjaGVja0RlbGl2ZXJ5RGF0ZUlzVmFsaWQoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdmFsaWRhdGVEYXRlSXNBdmFpbGFibGUoZXZlbnQudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgICAgcGVhY2hwYXlBbGVydCgnUGxlYXNlIHNlbGVjdCBhbm90aGVyIGRlbGl2ZXJ5IGRhdGUuJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlSXNBdmFpbGFibGUoZGF0ZVN0cmluZykge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkYXkgPSBuZXcgRGF0ZShkYXRlU3RyaW5nICsgJ1QwMDowMDowMCcpLmdldERheSgpO1xuICAgIHJldHVybiAhR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X29wdGlvbnM/LmRlbGl2ZXJ5X3VuY2hlY2tlZF9kYXk/LmluY2x1ZGVzKFN0cmluZyhkYXkpKTtcbn1cbmZ1bmN0aW9uIGluaXRPcmRlck5vdGVzKCkge1xuICAgIGlmIChGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuT1JERVJfTk9URVMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCcub3JkZXItbm90ZXMnKSl7XG4gICAgICAgICAgICAkZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBjb2xsZWN0T3JkZXJOb3RlcygpIHtcbiAgICBjb25zdCBvcmRlck5vdGVzID0gJHFzKCcjb3JkZXItbm90ZXMnKTtcbiAgICBjb25zdCBvcmRlck5vdGVzRXhpc3RpbmcgPSAkcXMoJyNvcmRlci1ub3Rlcy1leGlzdGluZycpO1xuICAgIGlmIChvcmRlck5vdGVzICE9PSBudWxsICYmIG9yZGVyTm90ZXNFeGlzdGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAob3JkZXJOb3Rlcy52YWx1ZSAhPT0gJycgJiYgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIG9yZGVyTm90ZXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyTm90ZXMudmFsdWUgPT09ICcnICYmIG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmRlck5vdGVzRXhpc3RpbmcudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuZnVuY3Rpb24gc3luY09yZGVyTm90ZXMoZXhpdE1vZHVsZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgb3JkZXJOb3Rlc0V4aXN0aW5nID0gJHFzKCcjb3JkZXItbm90ZXMtZXhpc3RpbmcnKTtcbiAgICBjb25zdCBvcmRlck5vdGVzID0gJHFzKCcjb3JkZXItbm90ZXMnKTtcbiAgICBpZiAob3JkZXJOb3RlcyAhPT0gbnVsbCAmJiBvcmRlck5vdGVzRXhpc3RpbmcgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkgJiYgb3JkZXJOb3Rlcy52YWx1ZSAhPT0gJycgJiYgZXhpdE1vZHVsZSkge1xuICAgICAgICAgICAgb3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlID0gb3JkZXJOb3Rlcy52YWx1ZTtcbiAgICAgICAgICAgIG9yZGVyTm90ZXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXJOb3Rlc0V4aXN0aW5nLnZhbHVlICE9PSAnJyAmJiAhZXhpdE1vZHVsZSkge1xuICAgICAgICAgICAgb3JkZXJOb3Rlcy52YWx1ZSA9IG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZTtcbiAgICAgICAgICAgIG9yZGVyTm90ZXNFeGlzdGluZy52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFZBVChtZXNzYWdlKSB7XG4gICAgaW5pdFZhdEV2ZW50cygpO1xuICAgIGlmIChtZXNzYWdlLnBocERhdGEudmF0X3NlbGZfdmVyaWZ5ID09PSAnMScpIHtcbiAgICAgICAgcmVuZGVyVmVyaWZ5TG9jYXRpb24oKTtcbiAgICB9XG4gICAgY29uc3QgdmF0VHlwZXNSZXF1aXJpbmdJRCA9IG1lc3NhZ2UucGhwRGF0YS52YXRfcmVxdWlyZWQgPT09ICcxJyB8fCBtZXNzYWdlLnBocERhdGEudmF0X3JlcXVpcmVkID09PSAnMicgJiYgaXNFVUNvdW50cnkoUGVhY2hQYXlDdXN0b21lci5jb3VudHJ5KCkpO1xuICAgIGlmICh2YXRUeXBlc1JlcXVpcmluZ0lEKSB7XG4gICAgICAgIHJlbmRlclZBVElESW5wdXQoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0VmF0RXZlbnRzKCkge1xuICAgICRxcygnI3BwLWluZm8tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpPT57XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHZhdFR5cGVzUmVxdWlyaW5nSUQgPSBHTE9CQUwucGhwRGF0YT8udmF0X3JlcXVpcmVkID09PSAnMScgfHwgR0xPQkFMLnBocERhdGE/LnZhdF9yZXF1aXJlZCA9PT0gJzInICYmIGlzRVVDb3VudHJ5KFBlYWNoUGF5Q3VzdG9tZXIuY291bnRyeSgpKTtcbiAgICAgICAgaWYgKHZhdFR5cGVzUmVxdWlyaW5nSUQpIHtcbiAgICAgICAgICAgIHJlbmRlclZBVElESW5wdXQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyVkFUSURJbnB1dCgpIHtcbiAgICBjb25zdCAkcHJldmlvdXNEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld0VVVmF0RGl2Jyk7XG4gICAgJHByZXZpb3VzRGl2cz8ucmVtb3ZlKCk7XG4gICAgY29uc3QgJEVVVmF0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgJHZhdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgY29uc3QgJHZhdE51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ3JlcXVpcmVkJyk7XG4gICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3ZhdElucHV0Jyk7XG4gICAgY29uc3QgJHByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAkcHJvbXB0LmlubmVySFRNTCA9ICdWYXQgTnVtYmVyJztcbiAgICAkdmF0Rm9ybS5hcHBlbmQoJHZhdE51bWJlcik7XG4gICAgJEVVVmF0RGl2LmFwcGVuZCgkcHJvbXB0KTtcbiAgICAkRVVWYXREaXYuYXBwZW5kKCR2YXRGb3JtKTtcbiAgICAkRVVWYXREaXYuc2V0QXR0cmlidXRlKCdpZCcsICdFdVZhdERpdicpO1xuICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbG9yLWNoYW5nZS10ZXh0Jyk7XG4gICAgbGV0ICRpbnNlcnRpb25Mb2NhdGlvbjtcbiAgICBjb25zdCAkbmV3Q3VzdG9tZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHAtbmV3LWN1c3RvbWVyLWNoZWNrb3V0Jyk7XG4gICAgaWYgKCRuZXdDdXN0b21lcj8uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgJGluc2VydGlvbkxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQnKTtcbiAgICAgICAgJHZhdE51bWJlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BwVmF0TnVtRXhpc3RpbmcnKTtcbiAgICAgICAgJEVVVmF0RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29sb3ItY2hhbmdlLXRleHQnKTtcbiAgICAgICAgJGluc2VydGlvbkxvY2F0aW9uPy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgJEVVVmF0RGl2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkaW5zZXJ0aW9uTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF5bWVudC1tZXRob2RzJyk7XG4gICAgICAgICR2YXROdW1iZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcFZhdE51bU5ldycpO1xuICAgICAgICAkRVVWYXREaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICd4LWxhcmdlJyk7XG4gICAgICAgICRFVVZhdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25ld0VVVmF0RGl2Jyk7XG4gICAgICAgICRpbnNlcnRpb25Mb2NhdGlvbj8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICRFVVZhdERpdik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VmF0TnVtYmVyKCkge1xuICAgIGNvbnN0ICRuZXdDdXN0b21lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcC1uZXctY3VzdG9tZXItY2hlY2tvdXQnKTtcbiAgICBpZiAoJG5ld0N1c3RvbWVyPy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKSkge1xuICAgICAgICBjb25zdCAkcHBWYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHBWYXROdW1FeGlzdGluZycpO1xuICAgICAgICBpZiAoISRwcFZhdCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcHBWYXQudmFsdWUgPz8gJyc7XG4gICAgfVxuICAgIGNvbnN0ICRwcFZhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcFZhdE51bU5ldycpO1xuICAgIGlmICghJHBwVmF0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuICRwcFZhdC52YWx1ZSA/PyAnJztcbn1cbmZ1bmN0aW9uIHJlbmRlclZlcmlmeUxvY2F0aW9uKCkge1xuICAgIGNvbnN0ICR2ZXJpZnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCAkdmVyaWZ5Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0ICRkZXNjcmlwdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAkdmVyaWZ5Q2hlY2tib3guc2V0QXR0cmlidXRlKCdpZCcsICdwcF92ZXJpZnlfY291bnRyeScpO1xuICAgICR2ZXJpZnlDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAkdmVyaWZ5Q2hlY2tib3guc2V0QXR0cmlidXRlKCd2YWx1ZScsICcxJyk7XG4gICAgJGRlc2NyaXB0b3Iuc2V0QXR0cmlidXRlKCdmb3InLCAncHBfdmVyaWZ5X2NvdW50cnknKTtcbiAgICAkZGVzY3JpcHRvci5pbm5lckhUTUwgPSBnZXRMb2NhbGVUZXh0KCd2ZXJpZnktbG9jYXRpb24nKTtcbiAgICAkdmVyaWZ5RGl2LmFwcGVuZCgkdmVyaWZ5Q2hlY2tib3gpO1xuICAgICR2ZXJpZnlEaXYuYXBwZW5kKCRkZXNjcmlwdG9yKTtcbiAgICBjb25zdCAkZGl2Q2xvbmUgPSAkdmVyaWZ5RGl2LmNsb25lTm9kZSh0cnVlKTtcbiAgICBjb25zdCAkaW5zZXJ0aW9uTG9jYXRpb24gPSAkcXMoJyNleGlzdGluZy1jaGVja291dC1jYXJkJyk7XG4gICAgY29uc3QgJGluc2VydExvY2F0aW9uMiA9ICRxcygnI3BheW1lbnQtbWV0aG9kcycpO1xuICAgICRpbnNlcnRpb25Mb2NhdGlvbj8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsICR2ZXJpZnlEaXYpO1xuICAgICRpbnNlcnRMb2NhdGlvbjI/Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCAkZGl2Q2xvbmUpO1xufVxuZnVuY3Rpb24gZ2V0VmVyaWZ5KCkge1xuICAgIGNvbnN0ICRpc1ZlcmlmaWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BwX3ZlcmlmeV9jb3VudHJ5Jyk7XG4gICAgaWYgKCRpc1ZlcmlmaWVkWzBdLmNoZWNrZWQgfHwgJGlzVmVyaWZpZWRbMV0uY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gJzEnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5mdW5jdGlvbiBpc0RldkVudmlyb25tZW50KGJhc2VVcmwpIHtcbiAgICByZXR1cm4gYmFzZVVybCA9PT0gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmFwcC8nIHx8IGJhc2VVcmwgPT09ICdodHRwczovL2Rldi5wZWFjaHBheS5sb2NhbC8nIHx8IGJhc2VVcmwgPT09ICdodHRwczovL3Byb2QucGVhY2hwYXkubG9jYWwvJztcbn1cbmZ1bmN0aW9uIGdldEJhc2VVUkwobWVyY2hhbnRIb3N0bmFtZSwgaXNUZXN0TW9kZSkge1xuICAgIGlmIChpc1Rlc3RNb2RlKSB7XG4gICAgICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgICAgIGNhc2UgJ3N0b3JlLmxvY2FsJzpcbiAgICAgICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LnBlYWNocGF5LmFwcC8nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaChtZXJjaGFudEhvc3RuYW1lKXtcbiAgICAgICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgICAgY2FzZSAnMTI3LjAuMC4xJzpcbiAgICAgICAgY2FzZSAnd29vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTIucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUzLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNC5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTUucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAncWEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAnZGVtby5wZWFjaHBheS5hcHAnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Rldi5wZWFjaHBheS5hcHAvJztcbiAgICAgICAgY2FzZSAnc3RvcmUubG9jYWwnOlxuICAgICAgICBjYXNlICd3b28uc3RvcmUubG9jYWwnOlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL3Byb2QucGVhY2hwYXkubG9jYWwvJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9wcm9kLnBlYWNocGF5LmFwcC8nO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9uZUNsaWNrVVJMKG1lcmNoYW50SG9zdG5hbWUsIGlzVGVzdE1vZGUpIHtcbiAgICBpZiAoaXNUZXN0TW9kZSkge1xuICAgICAgICBzd2l0Y2gobWVyY2hhbnRIb3N0bmFtZSl7XG4gICAgICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICBjYXNlICd3b28uc3RvcmUubG9jYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYtY29ubmVjdC5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2LWNvbm5lY3QtdjIucGVhY2hwYXljaGVja291dC5jb20vJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2gobWVyY2hhbnRIb3N0bmFtZSl7XG4gICAgICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICAgIGNhc2UgJzEyNy4wLjAuMSc6XG4gICAgICAgIGNhc2UgJ3dvby5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTEucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUyLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMy5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTQucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWU1LnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3FhLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ2RlbW8ucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXYtY29ubmVjdC12Mi5wZWFjaHBheWNoZWNrb3V0LmNvbS8nO1xuICAgICAgICBjYXNlICdzdG9yZS5sb2NhbCc6XG4gICAgICAgIGNhc2UgJ3dvby5zdG9yZS5sb2NhbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHBzOi8vY29ubmVjdC5wZWFjaHBheS5sb2NhbC8nO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICdodHRwczovL2Nvbm5lY3QtdjIucGVhY2hwYXljaGVja291dC5jb20vJztcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRlcm1pbmVQYWdlVHlwZShpc0NhcnRQYWdlLCBpc0NoZWNrb3V0UGFnZSkge1xuICAgIGlmIChpc0NhcnRQYWdlKSB7XG4gICAgICAgIHJldHVybiAnY2FydCc7XG4gICAgfVxuICAgIGlmIChpc0NoZWNrb3V0UGFnZSkge1xuICAgICAgICByZXR1cm4gJ2NoZWNrb3V0JztcbiAgICB9XG4gICAgcmV0dXJuICdwcm9kdWN0Jztcbn1cbmZ1bmN0aW9uIHN5bmNGaWVsZHMoZXZlbnQpIHtcbiAgICBjb25zdCAkZm9ybSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdmb3JtJyk7XG4gICAgY29uc3QgZmllbGRSZWNvcmQgPSB7fTtcbiAgICBmb3IgKGNvbnN0ICRpbnB1dCBvZiBBcnJheS5mcm9tKCRmb3JtLmVsZW1lbnRzKSl7XG4gICAgICAgIGZpZWxkUmVjb3JkWyRpbnB1dC5uYW1lXSA9ICRpbnB1dC52YWx1ZTtcbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2goc2V0RXh0cmFGaWVsZHMoZmllbGRSZWNvcmQpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckFkZGl0aW9uYWxGaWVsZHMoZmllbGREYXRhLCBmaWVsZE9yZGVyKSB7XG4gICAgaWYgKGZpZWxkRGF0YS5sZW5ndGggPT09IDAgfHwgZmllbGRPcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkcXMoJyNhZGRpdGlvbmFsLWZpZWxkcy1uZXcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLWV4aXN0aW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgZmllbGRPcmRlcil7XG4gICAgICAgIGlmIChmaWVsZERhdGFbaV0uZmllbGRfZW5hYmxlKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZUZpZWxkcyhmaWVsZERhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzeW5jRmllbGRzKTtcbiAgICAkcXMoJyNhZGRpdGlvbmFsLWZpZWxkcy1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzeW5jRmllbGRzKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyRXh0cmFGaWVsZHMoUGVhY2hQYXlPcmRlci5leHRyYUZpZWxkc1JlY29yZCgpKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckV4dHJhRmllbGRzKGV4dHJhRmllbGREYXRhKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZXh0cmFGaWVsZERhdGEpKXtcbiAgICAgICAgJHFzQWxsKGBbbmFtZT1cIiR7a2V5fVwiXS5leHRyYS1maWVsZGAsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUZpZWxkcyhmaWVsZERhdGEpIHtcbiAgICBjb25zdCBmaWVsZCA9IChsb2NhdGlvbik9Pic8ZGl2IGNsYXNzPVwibmV3LWZpZWxkXCI+JyArIGdlbmVyYXRlRmllbGRFbGVtZW50KGxvY2F0aW9uLCBmaWVsZERhdGEpICsgJzwvZGl2PidcbiAgICA7XG4gICAgY29uc3QgbmV3UGFnZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpO1xuICAgIGNvbnN0IGV4c2l0UGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkaXRpb25hbC1maWVsZHMtZXhpc3RpbmcnKTtcbiAgICBpZiAobmV3UGFnZUVsZW1lbnRzKSB7XG4gICAgICAgIG5ld1BhZ2VFbGVtZW50cy5pbm5lckhUTUwgKz0gZmllbGQoJy1uZXcnKTtcbiAgICB9XG4gICAgaWYgKGV4c2l0UGFnZUVsZW1lbnQpIHtcbiAgICAgICAgZXhzaXRQYWdlRWxlbWVudC5pbm5lckhUTUwgKz0gZmllbGQoJy1leGlzdGluZycpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRFbGVtZW50KGxvY2F0aW9uMSwgZmllbGREYXRhKSB7XG4gICAgbGV0IGVsZW1lbnRTdHJpbmcgPSAnJztcbiAgICBjb25zdCBvcHRpb25hbCA9ICc8c3BhbiBjbGFzcz1cIm9wdGlvbmFsXCI+IChvcHRpb25hbCkgPC9zcGFuPic7XG4gICAgY29uc3QgcmVxdWlyZWQgPSAnPGFiYnIgY2xhc3M9XCJyZXF1aXJlZFwiIHRpdGxlPVwicmVxdWlyZWRcIiBzdHlsZT1cImNvbG9yOnJlZDtcIj4qPC9hYmJyPic7XG4gICAgY29uc3QgbGFiZWxCdWlsZGVyID0gKGxvY2F0aW9uKT0+YFxuXHRcdDxsYWJlbCBmb3I9XCIke2ZpZWxkRGF0YS5maWVsZF9uYW1lfSR7bG9jYXRpb259XCIgY2xhc3M9XCJmb3JtLWxhYmVsLSR7ZmllbGREYXRhLnR5cGVfbGlzdH1cIiA+YCArIGAke2ZpZWxkRGF0YS5maWVsZF9sYWJlbH1gICsgKGZpZWxkRGF0YS5maWVsZF9yZXF1aXJlZCA/IHJlcXVpcmVkIDogb3B0aW9uYWwpICsgJzwvbGFiZWw+J1xuICAgIDtcbiAgICBjb25zdCBpbnB1dEJ1aWxkZXIgPSAobG9jYXRpb24pPT5gPGlucHV0IHR5cGU9JHtmaWVsZERhdGEudHlwZV9saXN0fSBcblx0XHRcdG5hbWU9JHtmaWVsZERhdGEuZmllbGRfbmFtZX0gXG5cdFx0XHRpZD1cIiR7ZmllbGREYXRhLmZpZWxkX25hbWV9JHtsb2NhdGlvbn1cIlxuXHRcdFx0cGxhY2Vob2xkZXI9XCIgXCJcblx0XHRcdHZhbHVlPVwiJHtmaWVsZERhdGEuZmllbGRfZGVmYXVsdH1cIiBcblx0XHRcdGNsYXNzPVwiaW5wdXQtYm94LSR7ZmllbGREYXRhLnR5cGVfbGlzdH0gZXh0cmEtZmllbGRcImAgKyAoZmllbGREYXRhLmZpZWxkX3JlcXVpcmVkID8gJ3JlcXVpcmVkJyA6ICcnKSArICcvPidcbiAgICA7XG4gICAgaWYgKGZpZWxkRGF0YS50eXBlX2xpc3QgPT09ICd0ZXh0Jykge1xuICAgICAgICBlbGVtZW50U3RyaW5nID0gaW5wdXRCdWlsZGVyKGxvY2F0aW9uMSkgKyAoZmllbGREYXRhLmZpZWxkX2xhYmVsID8gbGFiZWxCdWlsZGVyKGxvY2F0aW9uMSkgOiAnJyk7XG4gICAgICAgIHJldHVybiBlbGVtZW50U3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFN0cmluZztcbn1cbmZ1bmN0aW9uIGNvbGxlY3RBZGRpdGlvbmFsRmllbGREYXRhKGZpZWxkRGF0YSwgZmllbGRPcmRlcikge1xuICAgIGNvbnN0IGZpZWxkRGF0YUFycmF5ID0gW107XG4gICAgZm9yIChjb25zdCBvcmRlck51bWJlciBvZiBmaWVsZE9yZGVyKXtcbiAgICAgICAgaWYgKGZpZWxkRGF0YVtvcmRlck51bWJlcl0uZmllbGRfZW5hYmxlICYmICRxcyhgIyR7ZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lfS1leGlzdGluZ2ApPy52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcG9yYXJ5RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBvcmFyeURhdGEubGFiZWwgPSBmaWVsZERhdGFbb3JkZXJOdW1iZXJdLmZpZWxkX2xhYmVsO1xuICAgICAgICAgICAgdGVtcG9yYXJ5RGF0YS5uYW1lID0gZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lO1xuICAgICAgICAgICAgdGVtcG9yYXJ5RGF0YS52YWx1ZSA9ICRxcyhgIyR7ZmllbGREYXRhW29yZGVyTnVtYmVyXS5maWVsZF9uYW1lfS1leGlzdGluZ2ApPy52YWx1ZTtcbiAgICAgICAgICAgIGZpZWxkRGF0YUFycmF5LnB1c2godGVtcG9yYXJ5RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkRGF0YUFycmF5O1xufVxuZnVuY3Rpb24gY2hlY2tSZXF1aXJlZEZpZWxkcygpIHtcbiAgICBpZiAoRW52aXJvbm1lbnQuY3VzdG9tZXIuZXhpc3RpbmcoKSkge1xuICAgICAgICByZXR1cm4gJHFzKCcjYWRkaXRpb25hbC1maWVsZHMtZXhpc3RpbmcnKT8ucmVwb3J0VmFsaWRpdHkoKSA/PyBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICRxcygnI2FkZGl0aW9uYWwtZmllbGRzLW5ldycpPy5yZXBvcnRWYWxpZGl0eSgpID8/IGZhbHNlO1xufVxuZnVuY3Rpb24gY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihlcnJvciwgZXh0cmEsIGZpbmdlcnByaW50KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgU2VudHJ5LndpdGhTY29wZSgoc2NvcGUpPT57XG4gICAgICAgICAgICBpZiAoZXh0cmEpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhleHRyYSkubWFwKChba2V5LCB2YWx1ZV0pPT5zY29wZS5zZXRFeHRyYShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmluZ2VycHJpbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRGaW5nZXJwcmludChmaW5nZXJwcmludCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAge31cbn1cbmZ1bmN0aW9uIGdldE9yZGVyU2VydmljZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZU9yZGVyLFxuICAgICAgICBzZXRPcmRlclN0YXR1cyxcbiAgICAgICAgc2V0UGF5bWVudFN0YXR1czogcmVjb3JkU3VjY2Vzc2Z1bFBheW1lbnQsXG4gICAgICAgIGRlcHJlY2F0ZWQ6IHtcbiAgICAgICAgICAgIHBsYWNlT3JkZXI6IGxlZ2FjeVBsYWNlT3JkZXIsXG4gICAgICAgICAgICBzZXRPcmRlclN0YXR1czogbGVnYWN5U2V0T3JkZXJTdGF0dXNcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBpbml0U2hpcHBpbmcobWVzc2FnZSkge1xuICAgIGluaXRTaGlwcGluZ0V2ZW50cygpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50R2VuZXJhbENvbmZpZyh7XG4gICAgICAgIC4uLnN0b3JlLmdldFN0YXRlKCkubWVyY2hhbnRDb25maWd1cmF0aW9uLmdlbmVyYWwsXG4gICAgICAgIHdjTG9jYXRpb25JbmZvRGF0YTogbWVzc2FnZS5waHBEYXRhLndjX2xvY2F0aW9uX2luZm9cbiAgICB9KSk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTWVyY2hhbnRTaGlwcGluZ0NvbmZpZyh7XG4gICAgICAgIHNoaXBwaW5nWm9uZXM6IE51bWJlci5wYXJzZUludChtZXNzYWdlLnBocERhdGEubnVtX3NoaXBwaW5nX3pvbmVzKVxuICAgIH0pKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldE9yZGVyU3RhdHVzKG9yZGVyLCBzdGF0dXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIUdMT0JBTC5waHBEYXRhKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgICAgc2Vzc2lvbjoge1xuICAgICAgICAgICAgaWQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKClcbiAgICAgICAgfSxcbiAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIGlkOiBvcmRlci5vcmRlcklELFxuICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlID8/ICcnLFxuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksXG4gICAgICAgICAgICBzdHJpcGVDdXN0b21lcklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3N0cmlwZScgPyBvcHRpb25zLnN0cmlwZUN1c3RvbWVySWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwYXlwYWxUcmFuc2FjdGlvbklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3BheXBhbCcgPyBvcHRpb25zLnBheXBhbFRyYW5zYWN0aW9uSWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdHJpcGVUcmFuc2FjdGlvbklkOiBQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSA9PT0gJ3N0cmlwZScgPyBvcHRpb25zLnN0cmlwZVRyYW5zYWN0aW9uSWQgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGF3YWl0IGZldGNoSG9zdFdpbmRvd0RhdGEoJ3BwLXNldC1vcmRlci1zdGF0dXMnLCByZXF1ZXN0KSkge1xuICAgICAgICByZXR1cm4gd2NPcmRlclJlY2VpdmVkVVJMV2l0aFBhcmFtZXRlcnMoR0xPQkFMLnBocERhdGEud2Nfb3JkZXJfcmVjZWl2ZWRfdXJsLCBvcmRlciwgTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5hc3luYyBmdW5jdGlvbiBwbGFjZU9yZGVyKCkge1xuICAgIGNvbnN0IHJlcXVlc3RNZXNzYWdlID0ge1xuICAgICAgICBzZXNzaW9uOiB7XG4gICAgICAgICAgICBpZDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKVxuICAgICAgICB9LFxuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogUGVhY2hQYXlDdXN0b21lci5wcmVmZXJyZWRQYXltZW50TWV0aG9kKCksXG4gICAgICAgICAgICBiaWxsaW5nQWRkcmVzczogUGVhY2hQYXlDdXN0b21lci5iaWxsaW5nQWRkcmVzcygpLFxuICAgICAgICAgICAgc2hpcHBpbmdBZGRyZXNzOiBQZWFjaFBheUN1c3RvbWVyLnNoaXBwaW5nQWRkcmVzcygpLFxuICAgICAgICAgICAgc2hpcHBpbmdNZXRob2RzOiBQZWFjaFBheU9yZGVyLmNvbGxlY3RTZWxlY3RlZFNoaXBwaW5nKCksXG4gICAgICAgICAgICBkZWxpdmVyeURhdGU6IGNvbGxlY3REZWxpdmVyeURhdGUoKSxcbiAgICAgICAgICAgIG1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgdmF0TnVtOiAnJyxcbiAgICAgICAgICAgIHZhdFNlbGZWZXJpZnk6ICcnLFxuICAgICAgICAgICAgY3VzdG9tZXJPcmRlck5vdGVzOiBjb2xsZWN0T3JkZXJOb3RlcygpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChzaG91bGRTaG93TWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZEZpZWxkKCkpIHtcbiAgICAgICAgcmVxdWVzdE1lc3NhZ2Uub3JkZXIubWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZCA9IGdldE1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmRWYWx1ZSgpO1xuICAgIH1cbiAgICBpZiAoR0xPQkFMLnBocERhdGE/LnZhdF9yZXF1aXJlZCkge1xuICAgICAgICByZXF1ZXN0TWVzc2FnZS5vcmRlci52YXROdW0gPSBnZXRWYXROdW1iZXIoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfc2VsZl92ZXJpZnkpIHtcbiAgICAgICAgcmVxdWVzdE1lc3NhZ2Uub3JkZXIudmF0U2VsZlZlcmlmeSA9IGdldFZlcmlmeSgpO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgZmV0Y2hIb3N0V2luZG93RGF0YSgncHAtcGxhY2Utb3JkZXInLCByZXF1ZXN0TWVzc2FnZSk7XG59XG5mdW5jdGlvbiBsZWdhY3lQbGFjZU9yZGVyKGlzUGF5cGFsKSB7XG4gICAgaWYgKEdMT0JBTD8ucGhwRGF0YT8ucGx1Z2luX3dvb2NvbW1lcmNlX29yZGVyX2RlbGl2ZXJ5X2FjdGl2ZSAmJiBjaGVja0RlbGl2ZXJ5RGF0ZUlzRW1wdHkoKSkge1xuICAgICAgICBwZWFjaHBheUFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGRlbGl2ZXJ5IGRhdGUuJyk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgJ2V2ZW50JzogJ3BsYWNlT3JkZXJEaXJlY3RseScsXG4gICAgICAgICdzZXNzaW9uSUQnOiBQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLFxuICAgICAgICAnYmlsbGluZ0FkZHJlc3MnOiBQZWFjaFBheUN1c3RvbWVyLmJpbGxpbmdBZGRyZXNzKCksXG4gICAgICAgICdzaGlwcGluZ0FkZHJlc3MnOiBQZWFjaFBheUN1c3RvbWVyLnNoaXBwaW5nQWRkcmVzcygpLFxuICAgICAgICAnc2hpcHBpbmdfbWV0aG9kJzogUGVhY2hQYXlPcmRlci5jb2xsZWN0U2VsZWN0ZWRTaGlwcGluZygpLFxuICAgICAgICAnZGVsaXZlcnlEYXRlJzogY29sbGVjdERlbGl2ZXJ5RGF0ZSgpLFxuICAgICAgICAnaXNQcm9kdWN0UGFnZUJ1dHRvbic6IEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcsXG4gICAgICAgICdpc1BheXBhbCc6IGlzUGF5cGFsID8/IGZhbHNlLFxuICAgICAgICAnbWVyY2hhbnRDdXN0b21lckFjY291bnRQYXNzd29yZCc6ICcnLFxuICAgICAgICAndmF0TnVtJzogJycsXG4gICAgICAgICdzZWxmVmVyaWZ5JzogJycsXG4gICAgICAgICdjdXN0b21lck9yZGVyTm90ZXMnOiBjb2xsZWN0T3JkZXJOb3RlcygpLFxuICAgICAgICAnYWRkaXRpb25hbEZpZWxkcyc6IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5BRERJVElPTkFMX0ZJRUxEUykgPyBjb2xsZWN0QWRkaXRpb25hbEZpZWxkRGF0YShHTE9CQUwucGhwRGF0YT8uYWRkaXRpb25hbF9maWVsZHMgPz8gW10sIEdMT0JBTC5waHBEYXRhPy5hZGRpdGlvbmFsX2ZpZWxkc19vcmRlciA/PyBbXSkgOiBbXSxcbiAgICAgICAgJ3Vwc2VsbF9pdGVtcyc6IEdMT0JBTC5saW5rZWRQcm9kdWN0c0lkc1xuICAgIH07XG4gICAgaWYgKHNob3VsZFNob3dNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkRmllbGQoKSkge1xuICAgICAgICBpZiAoIXZhbGlkYXRlTWVyY2hhbnRDdXN0b21lclBhc3N3b3JkRmllbGQoKSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlLm1lcmNoYW50Q3VzdG9tZXJBY2NvdW50UGFzc3dvcmQgPSBnZXRNZXJjaGFudEN1c3RvbWVyQWNjb3VudFBhc3N3b3JkVmFsdWUoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfcmVxdWlyZWQpIHtcbiAgICAgICAgbWVzc2FnZS52YXROdW0gPSBnZXRWYXROdW1iZXIoKTtcbiAgICB9XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy52YXRfc2VsZl92ZXJpZnkpIHtcbiAgICAgICAgbWVzc2FnZS5zZWxmVmVyaWZ5ID0gZ2V0VmVyaWZ5KCk7XG4gICAgfVxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKTtcbn1cbmZ1bmN0aW9uIHdjT3JkZXJSZWNlaXZlZFVSTFdpdGhQYXJhbWV0ZXJzKHdjT3JkZXJSZWNlaXZlZFVSTCwgb3JkZXIsIGRvbWFpbikge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBzID0gZG9tYWluID09PSAnbG9jYWxob3N0JyA/ICcnIDogJ3MnO1xuICAgIGNvbnN0IHBvcnQgPSBkb21haW4gPT09ICdsb2NhbGhvc3QnID8gJzo4MDAwJyA6ICcnO1xuICAgIGNvbnN0IHVybCA9IHdjT3JkZXJSZWNlaXZlZFVSTCA/IHdjT3JkZXJSZWNlaXZlZFVSTCA6IGBodHRwJHtzfTovLyR7ZG9tYWlufSR7cG9ydH0vY2hlY2tvdXQvb3JkZXItcmVjZWl2ZWRgO1xuICAgIGNvbnN0IG9yZGVySUQgPSBvcmRlci5pZCB8fCBvcmRlci5kZXRhaWxzLmlkO1xuICAgIGNvbnN0IGtleSA9IG9yZGVyLm9yZGVyX2tleSB8fCBvcmRlci5kZXRhaWxzLm9yZGVyX2tleTtcbiAgICBpZiAoR0xPQkFMLnBocERhdGEucGx1Z2luX3dvb190aGFua195b3VfcGFnZV9uZXh0bW92ZV9saXRlX2FjdGl2ZSB8fCBkb21haW4gPT09ICd1YmVyYnJhY2VsZXRzLmNvbScpIHtcbiAgICAgICAgcmV0dXJuIGAke3VybC5yZXBsYWNlKCcvY2hlY2tvdXQnLCAnJyl9L3RoYW5rLXlvdS8/b3JkZXJfaWQ9JHtvcmRlcklEfSZrZXk9JHtrZXl9YDtcbiAgICB9XG4gICAgaWYgKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpID09PSAncmFwaWRmaXJlc3VwcGxpZXMuY28udWsnKSB7XG4gICAgICAgIHJldHVybiBgaHR0cCR7c306Ly8ke2RvbWFpbn0ke3BvcnR9L3RoYW5rLXlvdS1mb3ItcHVyY2hhc2luZy1mcm9tLXVzL2A7XG4gICAgfVxuICAgIHJldHVybiBgJHt1cmx9LyR7b3JkZXJJRH0vP2tleT0ke2tleX1gO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdENhcnRDYWxjdWxhdGlvbihpbml0aWFsID0gZmFsc2UpIHtcbiAgICBjb25zdCByZXF1ZXN0RGF0YSA9IGluaXRpYWwgPyB7XG4gICAgICAgIGluaXRpYWw6IHRydWVcbiAgICB9IDoge1xuICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgc2VsZWN0ZWRfc2hpcHBpbmc6IFBlYWNoUGF5T3JkZXIuY29sbGVjdFNlbGVjdGVkU2hpcHBpbmcoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2xvY2F0aW9uOiBQZWFjaFBheUN1c3RvbWVyLnNob3J0QWRkcmVzcygpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hIb3N0V2luZG93RGF0YSgncHAtY2FsY3VsYXRlLWNhcnQnLCByZXF1ZXN0RGF0YSk7XG4gICAgICAgIGNvbnN1bWVDYXJ0Q2FsY3VsYXRpb25SZXNwb25zZShyZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKGBDYXJ0IGNhbGN1bGF0aW9uIFYyIGZhaWxlZCBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfS4gRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbml0U2hpcHBpbmdFdmVudHMoKSB7XG4gICAgc3RvcmUuc3Vic2NyaWJlKHJlbmRlclNoaXBwaW5nKTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ3ZhbGlkYXRlQWRkcmVzc1N1Y2Nlc3MnLCBhc3luYyAoXyk9PntcbiAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lckFkZHJlc3NWYWxpZGF0aW9uKHRydWUpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICAgICAgbW9kYWxQYWdlVHlwZTogJ3BheW1lbnQnXG4gICAgICAgIH0pKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICB9KTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0nKT8uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KT0+e1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZUNhcnRJdGVtc1dpdGhDdXN0b21lcihEZWZhdWx0Q2FydC5jb250ZW50cygpLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBldmVudDogJ3ZhbGlkYXRlQWRkcmVzcycsXG4gICAgICAgICAgICBiaWxsaW5nQWRkcmVzczogUGVhY2hQYXlDdXN0b21lci5iaWxsaW5nQWRkcmVzcygpXG4gICAgICAgIH0sICcqJyk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucy1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVTaGlwcGluZ1NlbGVjdGlvbkV2ZW50KTtcbiAgICAkcXMoJyNwcC1zaGlwcGluZy1vcHRpb25zJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZVNoaXBwaW5nU2VsZWN0aW9uRXZlbnQpO1xufVxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVBZGRyZXNzKCkge1xuICAgIHJldHVybiBhd2FpdCBmZXRjaEhvc3RXaW5kb3dEYXRhKCdwcC12YWxpZGF0ZS1iaWxsaW5nLWFkZHJlc3MnLCBQZWFjaFBheUN1c3RvbWVyLmJpbGxpbmdBZGRyZXNzKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU2hpcHBpbmdTZWxlY3Rpb25FdmVudChldmVudCkge1xuICAgIGNvbnN0ICR0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgJHRhcmdldENvbnRhaW5lciA9ICR0YXJnZXQuY2xvc2VzdCgnW2RhdGEtY2FydC1rZXldJyk7XG4gICAgY29uc3Qgc2hpcHBpbmdNZXRob2RJZCA9ICR0YXJnZXQudmFsdWU7XG4gICAgY29uc3QgY2FydEtleSA9ICR0YXJnZXRDb250YWluZXIuZGF0YXNldC5jYXJ0S2V5O1xuICAgIGNvbnN0IHBhY2thZ2VLZXkgPSAkdGFyZ2V0Q29udGFpbmVyLmRhdGFzZXQucGFja2FnZUtleTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDYXJ0UGFja2FnZVNoaXBwaW5nTWV0aG9kKHtcbiAgICAgICAgY2FydEtleTogY2FydEtleSA/PyAnJyxcbiAgICAgICAgc2hpcHBpbmdQYWNrYWdlS2V5OiBwYWNrYWdlS2V5ID8/ICcnLFxuICAgICAgICBwYWNrYWdlTWV0aG9kSWQ6IHNoaXBwaW5nTWV0aG9kSWQgPz8gJydcbiAgICB9KSk7XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG59XG5mdW5jdGlvbiByZW5kZXJTaGlwcGluZygpIHtcbiAgICByZW5kZXJPcmRlckhlYWRlcihEZWZhdWx0Q2FydC5jb250ZW50cygpKTtcbiAgICBpZiAoY2FydElzVmlydHVhbChEZWZhdWx0Q2FydC5jb250ZW50cygpKSkge1xuICAgICAgICAkcXMoJyNleGlzdGluZy1jaGVja291dC1kZWxpdmVyeScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjZXhpc3RpbmctY2hlY2tvdXQtZGVsaXZlcnknKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICByZW5kZXJDYXJ0U2hpcHBpbmdPcHRpb25zKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKTtcbiAgICB9XG4gICAgcmVuZGVyU2hpcHBpbmdTZWN0aW9uKCk7XG59XG5mdW5jdGlvbiByZW5kZXJPcmRlckhlYWRlcihjYXJ0KSB7XG4gICAgaWYgKGNhcnRJc1ZpcnR1YWwoY2FydCkpIHtcbiAgICAgICAgJHFzKCcuc2hpcHBpbmctYWRkcmVzcy1oZWFkZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJy5iaWxsaW5nLWFkZHJlc3MtaGVhZGVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5oaWRlLWZvci12aXJ0dWFsLWNhcnRzJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQxIG9mICRxc0FsbCgnLnNob3ctZm9yLXZpcnR1YWwtY2FydHMnKSl7XG4gICAgICAgICAgICAkZWxlbWVudDEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcuc2hpcHBpbmctYWRkcmVzcy1oZWFkZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJy5iaWxsaW5nLWFkZHJlc3MtaGVhZGVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudCBvZiAkcXNBbGwoJy5oaWRlLWZvci12aXJ0dWFsLWNhcnRzJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQyIG9mICRxc0FsbCgnLnNob3ctZm9yLXZpcnR1YWwtY2FydHMnKSl7XG4gICAgICAgICAgICAkZWxlbWVudDIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ2FydFNoaXBwaW5nT3B0aW9ucyhjYWxjdWxhdGVkQ2FydHMpIHtcbiAgICBsZXQgc2hpcHBpbmdIVE1MID0gJyc7XG4gICAgZm9yIChjb25zdCBbY2FydEtleSwgY2FydENhbGN1bGF0aW9uXSBvZiBPYmplY3QuZW50cmllcyhjYWxjdWxhdGVkQ2FydHMpKXtcbiAgICAgICAgaWYgKCFjYXJ0Q2FsY3VsYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW3NoaXBwaW5nUGFja2FnZUtleSwgc2hpcHBpbmdQYWNrYWdlXSBvZiBPYmplY3QuZW50cmllcyhjYXJ0Q2FsY3VsYXRpb24ucGFja2FnZV9yZWNvcmQpKXtcbiAgICAgICAgICAgIGlmICghc2hpcHBpbmdQYWNrYWdlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGlwcGluZ0hUTUwgKz0gcmVuZGVyU2hpcHBpbmdQYWNrYWdlT3B0aW9ucyhjYXJ0S2V5LCBzaGlwcGluZ1BhY2thZ2VLZXksIHNoaXBwaW5nUGFja2FnZSwgY2FydENhbGN1bGF0aW9uLmNhcnRfbWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucycsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IHNoaXBwaW5nSFRNTFxuICAgICk7XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucy1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IHNoaXBwaW5nSFRNTFxuICAgICk7XG59XG5mdW5jdGlvbiByZW5kZXJTaGlwcGluZ1BhY2thZ2VPcHRpb25zKGNhcnRLZXksIHNoaXBwaW5nUGFja2FnZUtleSwgc2hpcHBpbmdQYWNrYWdlLCBjYXJ0TWV0YSkge1xuICAgIGNvbnN0IHBhY2thZ2VNZXRob2RLZXkgPSBjYXJ0S2V5ID09PSAnMCcgPyBzaGlwcGluZ1BhY2thZ2VLZXkgOiBgJHtjYXJ0S2V5fV8ke3NoaXBwaW5nUGFja2FnZUtleX1gO1xuICAgIGNvbnN0IG1ldGhvZE9wdGlvbkJ1aWxkZXIgPSAobWV0aG9kS2V5LCBtZXRob2QsIHNlbGVjdGVkKT0+YFxuPGxhYmVsIGZvcj1cInNoaXBwaW5nX21ldGhvZF8ke3BhY2thZ2VNZXRob2RLZXl9XyR7bWV0aG9kS2V5LnJlcGxhY2UoLzovZywgJycpfVwiIHN0eWxlPVwibWFyZ2luOiAwIDAgM3B4IDA7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiByb3c7IGN1cnNvcjogcG9pbnRlcjtcIj5cblx0PGlucHV0IHN0eWxlPVwidmVydGljYWwtYWxpZ246IHRvcDtcIiBpZD1cInNoaXBwaW5nX21ldGhvZF8ke3BhY2thZ2VNZXRob2RLZXl9XyR7bWV0aG9kS2V5LnJlcGxhY2UoLzovZywgJycpfVwiIG5hbWU9XCJzaGlwcGluZ19tZXRob2RbJHtwYWNrYWdlTWV0aG9kS2V5fV1cIiB2YWx1ZT1cIiR7bWV0aG9kS2V5fVwiIHR5cGU9XCJyYWRpb1wiICR7c2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAnJ30gcmVxdWlyZWQ+XG5cdDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBmbGV4LWdyb3c6IDE7XCI+JHttZXRob2QudGl0bGV9PC9zcGFuPlxuXHQ8c3BhbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWluLXdpZHRoOiAzMCU7IHRleHQtYWxpZ246IHJpZ2h0O1wiIGNsYXNzPVwic2hpcHBpbmctcHJpY2VcIj4ke2Zvcm1hdEN1cnJlbmN5U3RyaW5nKG1ldGhvZC50b3RhbCl9PHNwYW4gY2xhc3M9XCJtdXRlZFwiPiR7YnVpbGRTdWJzY3JpcHRpb25QcmljZU1ldGFEYXRhKGNhcnRNZXRhKX08L3NwYW4+PC9zcGFuPlxuPC9sYWJlbD5gXG4gICAgO1xuICAgIGNvbnN0IHBhY2thZ2VOYW1lSFRNTCA9IGA8aDQgY2xhc3M9XCJzaGlwcGluZy1oZWFkZXIgY29sb3ItY2hhbmdlLXRleHRcIj4ke3NoaXBwaW5nUGFja2FnZS5wYWNrYWdlX25hbWUgPz8gZ2V0TG9jYWxlVGV4dCgnc2hpcHBpbmcnKX08L2g0PmA7XG4gICAgY29uc3QgcGFja2FnZU1ldGhvZE9wdGlvbnNIVE1MID0gT2JqZWN0LmVudHJpZXMoc2hpcHBpbmdQYWNrYWdlLm1ldGhvZHMpLm1hcCgoW3NoaXBwaW5nTWV0aG9kS2V5LCBzaGlwcGluZ01ldGhvZF0pPT5zaGlwcGluZ01ldGhvZCA/IG1ldGhvZE9wdGlvbkJ1aWxkZXIoc2hpcHBpbmdNZXRob2RLZXksIHNoaXBwaW5nTWV0aG9kLCBzaGlwcGluZ1BhY2thZ2Uuc2VsZWN0ZWRfbWV0aG9kID09PSBzaGlwcGluZ01ldGhvZEtleSkgOiAnJ1xuICAgICkuam9pbignJyk7XG4gICAgcmV0dXJuIGBcbjxkaXYgZGF0YS1jYXJ0LWtleT1cIiR7Y2FydEtleX1cIiBkYXRhLXBhY2thZ2Uta2V5PVwiJHtzaGlwcGluZ1BhY2thZ2VLZXl9XCI+XG5cdCR7cGFja2FnZU5hbWVIVE1MfVxuXHQke3BhY2thZ2VNZXRob2RPcHRpb25zSFRNTH1cbjwvZGl2PmA7XG59XG5mdW5jdGlvbiBzaGlwcGluZ0lzVmFsaWQoKSB7XG4gICAgaWYgKGNhcnRJc1ZpcnR1YWwoRGVmYXVsdENhcnQuY29udGVudHMoKSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uc2hpcHBpbmcuc2hpcHBpbmdab25lcygpID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIUNhcnRzLmFueVNoaXBwaW5nTWV0aG9kc0F2YWlsYWJsZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBjb25zdW1lQ2FydENhbGN1bGF0aW9uUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRPcmRlckVycm9yKCcnKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUNhcnRDYWxjdWxhdGlvbihyZXNwb25zZS5kYXRhLmNhcnRfY2FsY3VsYXRpb25fcmVjb3JkKSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyU2hpcHBpbmdTaG9ydEFkZHJlc3MocmVzcG9uc2UuZGF0YS5zaGlwcGluZ19sb2NhdGlvbikpO1xuICAgICAgICBpZiAoRGVmYXVsdENhcnQuY29udGVudHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldE9yZGVyRXJyb3IoYDxzcGFuPiR7Z2V0TG9jYWxlVGV4dCgnZW1wdHktY2FydCcpfTwvc3Bhbj5gKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXNoaXBwaW5nSXNWYWxpZCgpKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRPcmRlckVycm9yKGA8c3Bhbj4ke2dldExvY2FsZVRleHQoJ25vLXNoaXAnKX08L3NwYW4+YCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcHJvZHVjdEJ1bmRsZXNQcm9kdWN0UGFnZSgpIHtcbiAgICByZXR1cm4gR0xPQkFMPy5waHBEYXRhPy5wbHVnaW5fd29vY29tbWVyY2VfcHJvZHVjdF9idW5kbGVzX2FjdGl2ZSA9PT0gJzEnICYmICEoRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdjYXJ0Jyk7XG59XG5mdW5jdGlvbiByZWNvcmRTdWNjZXNzZnVsUGF5bWVudChzZXNzaW9uSUQsIGNsZWFyU2Vzc2lvbikge1xuICAgIHJldHVybiBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvc2Vzc2lvbi9wYXkvcmVjb3JkJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzZXNzaW9uSUQsXG4gICAgICAgICAgICBjbGVhclNlc3Npb246IGNsZWFyU2Vzc2lvbiB8fCBmYWxzZVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuZnVuY3Rpb24gbGVnYWN5U2V0T3JkZXJTdGF0dXMob3JkZXIsIHsgc3RhdHVzICwgbWVzc2FnZSAsIHBheW1lbnRUeXBlICwgdHJhbnNhY3Rpb25JRCAgfSkge1xuICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZXZlbnQ6ICdzZXRPcmRlclN0YXR1cycsXG4gICAgICAgIG9yZGVySUQ6IG9yZGVyLm9yZGVySUQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgcGF5bWVudFR5cGUsXG4gICAgICAgIHRyYW5zYWN0aW9uSUQsXG4gICAgICAgIGN1c3RvbWVyU3RyaXBlSWQ6IFBlYWNoUGF5Q3VzdG9tZXIuc3RyaXBlSWQoKSxcbiAgICAgICAgcmVkaXJlY3RVUkw6IHdjT3JkZXJSZWNlaXZlZFVSTFdpdGhQYXJhbWV0ZXJzKEdMT0JBTC5waHBEYXRhLndjX29yZGVyX3JlY2VpdmVkX3VybCwgb3JkZXIsIE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpKVxuICAgIH0sICcqJyk7XG59XG5mdW5jdGlvbiByZW5kZXJTaGlwcGluZ1NlY3Rpb24oKSB7XG4gICAgaWYgKFBlYWNoUGF5T3JkZXIuY3VzdG9tZXJBZGRyZXNzVmFsaWRhdGVkKCkpIHtcbiAgICAgICAgJHFzKCcjcHAtc2hpcHBpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtc2hpcHBpbmctcGF5bWVudCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEN1c3RvbWVyKG1lc3NhZ2UpIHtcbiAgICBpbml0Q3VzdG9tZXJFdmVudHMoKTtcbiAgICByZW5kZXJDb3VudHJ5QW5kU3RhdGVMaXN0KG1lc3NhZ2UucGhwRGF0YS53Y19sb2NhdGlvbl9pbmZvKTtcbn1cbmZ1bmN0aW9uIGluaXRDdXN0b21lckV2ZW50cygpIHtcbiAgICAkcXMoJyNjb3VudHJ5Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlckNvcnJlY3RQcm92aW5jZUZpZWxkKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PnNldFRpbWVvdXQoc3luY0N1c3RvbWVyRmllbGRDaGFuZ2VzKVxuICAgICk7XG4gICAgbGV0IHByZXZpb3VzQ3VzdG9tZXJEYXRhID0gJyc7XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpPT57XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyID0gUGVhY2hQYXlDdXN0b21lci5kYXRhKCk7XG4gICAgICAgIGlmIChFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21lckRhdGEgPSBKU09OLnN0cmluZ2lmeShjdXN0b21lcik7XG4gICAgICAgICAgICBpZiAoY3VzdG9tZXJEYXRhICE9PSBwcmV2aW91c0N1c3RvbWVyRGF0YSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzQ3VzdG9tZXJEYXRhID0gY3VzdG9tZXJEYXRhO1xuICAgICAgICAgICAgICAgIHJlbmRlckN1c3RvbWVyRmllbGRzKGN1c3RvbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkgPT09ICdwYXltZW50Jykge1xuICAgICAgICAgICAgcmVuZGVyQ3VzdG9tZXJIZWFkZXIoY3VzdG9tZXIsIEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpO1xuICAgICAgICAgICAgaWYgKEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJFeGlzdGluZ0N1c3RvbWVyQ2hlY2tvdXQoY3VzdG9tZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzeW5jQ3VzdG9tZXJGaWVsZENoYW5nZXMoKSB7XG4gICAgY29uc3QgJGZvcm0gPSAkcXMoJyNwcC1pbmZvLWZvcm0nKTtcbiAgICBpZiAoISRmb3JtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoJGZvcm0pO1xuICAgIGNvbnN0IHByZXZpb3VzQWRkcmVzc0luZm8gPSBQZWFjaFBheUN1c3RvbWVyLnNob3J0QWRkcmVzcygpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgZW1haWw6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2VtYWlsJyksXG4gICAgICAgIG5hbWVfZmlyc3Q6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ25hbWVfZmlyc3QnKSxcbiAgICAgICAgbmFtZV9sYXN0OiBmb3JtRW50cnkoZm9ybURhdGEsICduYW1lX2xhc3QnKSxcbiAgICAgICAgYWRkcmVzczE6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ2FkZHJlc3MxJyksXG4gICAgICAgIGFkZHJlc3MyOiBmb3JtRW50cnkoZm9ybURhdGEsICdhZGRyZXNzMicpLFxuICAgICAgICBjaXR5OiBmb3JtRW50cnkoZm9ybURhdGEsICdjaXR5JyksXG4gICAgICAgIHN0YXRlOiBmb3JtRW50cnkoZm9ybURhdGEsICdzdGF0ZScpLFxuICAgICAgICBwb3N0YWw6IGZvcm1FbnRyeShmb3JtRGF0YSwgJ3Bvc3RhbCcpLFxuICAgICAgICBjb3VudHJ5OiBmb3JtRW50cnkoZm9ybURhdGEsICdjb3VudHJ5JyksXG4gICAgICAgIHBob25lOiBmb3JtRW50cnkoZm9ybURhdGEsICdwaG9uZScpXG4gICAgfSkpO1xuICAgIGNvbnN0IGN1cnJlbnRBZGRyZXNzSW5mbyA9IFBlYWNoUGF5Q3VzdG9tZXIuc2hvcnRBZGRyZXNzKCk7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHByZXZpb3VzQWRkcmVzc0luZm8pICE9PSBKU09OLnN0cmluZ2lmeShjdXJyZW50QWRkcmVzc0luZm8pICYmIGN1cnJlbnRBZGRyZXNzSW5mby5jb3VudHJ5ICE9PSAnJykge1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGxvYWRDdXN0b21lcigpIHtcbiAgICBjb25zdCBjdXN0b21lciA9IGF3YWl0IGdldEN1c3RvbWVyKCk7XG4gICAgaWYgKGN1c3RvbWVyID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uSW5mbyA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5nZW5lcmFsLndjTG9jYXRpb25JbmZvRGF0YSgpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lcih7XG4gICAgICAgICAgICAuLi5QZWFjaFBheUN1c3RvbWVyLmRhdGEoKSxcbiAgICAgICAgICAgIGNvdW50cnk6IChsb2NhdGlvbkluZm8/LmN1c3RvbWVyX2RlZmF1bHRfY291bnRyeSA/PyBsb2NhdGlvbkluZm8/LnN0b3JlX2NvdW50cnkpID8/ICcnXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lcihjdXN0b21lcikpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgY3VzdG9tZXJFeGlzdHM6IHRydWUsXG4gICAgICAgIG1vZGFsUGFnZVR5cGU6ICdwYXltZW50J1xuICAgIH0pKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNhdmVDdXN0b21lclRvQnJvd3NlcihjdXN0b21lcklELCBicmFuZCwgbGFzdDQsIHBheW1lbnRPcHRpb24pIHtcbiAgICBjb25zdCB7IGZpcnN0TmFtZSAsIGxhc3ROYW1lICwgZW1haWwgLCBwaG9uZSAsIGFkZHJlc3MxICwgYWRkcmVzczIgLCBwb3N0YWwgLCBjaXR5ICwgc3RhdGUgLCBjb3VudHJ5ICB9ID0gUGVhY2hQYXlDdXN0b21lcjtcbiAgICBjb25zdCBjdXN0b21lciA9IHtcbiAgICAgICAgJ25hbWVfZmlyc3QnOiBmaXJzdE5hbWUoKSxcbiAgICAgICAgJ25hbWVfbGFzdCc6IGxhc3ROYW1lKCksXG4gICAgICAgICdlbWFpbCc6IGVtYWlsKCksXG4gICAgICAgICdwaG9uZSc6IHBob25lKCksXG4gICAgICAgICdhZGRyZXNzMSc6IGFkZHJlc3MxKCksXG4gICAgICAgICdhZGRyZXNzMic6IGFkZHJlc3MyKCksXG4gICAgICAgICdwb3N0YWwnOiBwb3N0YWwoKSxcbiAgICAgICAgJ2NpdHknOiBjaXR5KCksXG4gICAgICAgICdzdGF0ZSc6IHN0YXRlKCksXG4gICAgICAgICdjb3VudHJ5JzogY291bnRyeSgpLFxuICAgICAgICAnc3RyaXBlX2N1c3RvbWVyX2lkJzogY3VzdG9tZXJJRCxcbiAgICAgICAgJ2NhcmQnOiB7XG4gICAgICAgICAgICBicmFuZCxcbiAgICAgICAgICAgIGxhc3Q0XG4gICAgICAgIH0sXG4gICAgICAgICdwYXltZW50X29wdGlvbic6IHBheW1lbnRPcHRpb25cbiAgICB9O1xuICAgIGF3YWl0IHNldEN1c3RvbWVyKGN1c3RvbWVyKTtcbiAgICByZXR1cm4gY3VzdG9tZXI7XG59XG5mdW5jdGlvbiBkaXNwbGF5Q0NMb2dvKGN1c3RvbWVyKSB7XG4gICAgbGV0IGNjQnJhbmQgPSAnJztcbiAgICBzd2l0Y2goY3VzdG9tZXIuY2FyZD8uYnJhbmQpe1xuICAgICAgICBjYXNlICdWaXNhJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAndmlzYSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTWFzdGVyQ2FyZCc6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ21hc3RlcmNhcmQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0FtZXJpY2FuIEV4cHJlc3MnOlxuICAgICAgICAgICAgY2NCcmFuZCA9ICdhbWV4JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEaXNjb3Zlcic6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ2Rpc2NvdmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEaW5lcnMgQ2x1Yic6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ2RpbmVycyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSkNCJzpcbiAgICAgICAgICAgIGNjQnJhbmQgPSAnamNiJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdVbmlvblBheSc6XG4gICAgICAgICAgICBjY0JyYW5kID0gJ3VuaW9ucGF5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2NCcmFuZCA9ICcnO1xuICAgIH1cbiAgICAkcXMoJyNjYy0nICsgY2NCcmFuZCk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckV4aXN0aW5nQ3VzdG9tZXJDaGVja291dChjdXN0b21lcikge1xuICAgIGlmIChjdXN0b21lci5wYXltZW50X29wdGlvbiA9PT0gJ3BheXBhbCcpIHtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItZXhpc3RpbmcnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBpZiAoR0xPQkFMLnBocERhdGE/LnBheXBhbCA9PT0gJzEnKSB7XG4gICAgICAgICAgICAkcXMoJyNleGlzdGluZy1jaGVja291dC1jYXJkJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGFkanVzdE9yZGVyU3VtbWFyeUhlaWdodCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LWNhcmQtbnVtYmVyJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLWNoZWNrb3V0LW5vLWNhcmQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXItZXhpc3RpbmcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBhZGp1c3RPcmRlclN1bW1hcnlIZWlnaHQoZmFsc2UpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNvcnJlY3RQcm92aW5jZUZpZWxkKCkge1xuICAgIGNvbnN0IG1lcmNoYW50U2hpcHBpbmcgPSBNZXJjaGFudENvbmZpZ3VyYXRpb24uZ2VuZXJhbC53Y0xvY2F0aW9uSW5mb0RhdGEoKTtcbiAgICBpZiAobWVyY2hhbnRTaGlwcGluZykge1xuICAgICAgICBjb25zdCAkY291bnRyaWVzID0gJHFzKCcjY291bnRyeScpO1xuICAgICAgICBpZiAoISRjb3VudHJpZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9uID0gc3RhdGVQcm92aW5jZU9yQ291bnR5KCRjb3VudHJpZXMudmFsdWUpO1xuICAgICAgICBjb25zdCBzdGF0ZU9yUHJvdmluY2VPcHRpb25zID0gbWVyY2hhbnRTaGlwcGluZy5hbGxvd2VkX3N0YXRlc19vcl9wcm92aW5jZXNbJGNvdW50cmllcy52YWx1ZSA/PyAnJ10gPz8ge307XG4gICAgICAgIGlmIChzdGF0ZU9yUHJvdmluY2VPcHRpb25zICYmIE9iamVjdC5rZXlzKHN0YXRlT3JQcm92aW5jZU9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0ICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0ID0gJHFzKCcjZHluYW1pYy1zdGF0ZXMnKTtcbiAgICAgICAgICAgIGlmICgkc3RhdGVPclByb3ZpbmNlc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmlubmVySFRNTCA9IHJlbmRlckRyb3BEb3duTGlzdChzdGF0ZU9yUHJvdmluY2VPcHRpb25zLCBkZWZhdWx0T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdzdGF0ZScpO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0T3B0aW9uID09PSBnZXRMb2NhbGVUZXh0KCdwcm92aW5jZS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cImR5bmFtaWMtc3RhdGVzXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdwcm92aW5jZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0T3B0aW9uID09PSBnZXRMb2NhbGVUZXh0KCdzdGF0ZS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cImR5bmFtaWMtc3RhdGVzXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCdzdGF0ZScpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZGVmYXVsdE9wdGlvblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwiZHluYW1pYy1zdGF0ZXNcIl0nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgJHN0YXRlT3JQcm92aW5jZXNUZXh0ID0gJHFzKCcjcHJvdmluY2UnKTtcbiAgICAgICAgICAgIGlmICgkc3RhdGVPclByb3ZpbmNlc1RleHQpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1RleHQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb2ZmJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0ICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0ID0gJHFzKCcjZHluYW1pYy1zdGF0ZXMnKTtcbiAgICAgICAgICAgIGlmICgkc3RhdGVPclByb3ZpbmNlc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzU2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb2ZmJyk7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNTZWxlY3QucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc3RhdGVPclByb3ZpbmNlc1NlbGVjdC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJkeW5hbWljLXN0YXRlc1wiXScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCAkc3RhdGVPclByb3ZpbmNlc1RleHQgPSAkcXMoJyNwcm92aW5jZScpO1xuICAgICAgICAgICAgaWYgKCRzdGF0ZU9yUHJvdmluY2VzVGV4dCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzdGF0ZU9yUHJvdmluY2VzVGV4dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnc3RhdGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbiA9PT0gZ2V0TG9jYWxlVGV4dCgncHJvdmluY2Utc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJwcm92aW5jZVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZ2V0TG9jYWxlVGV4dCgncHJvdmluY2UnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdE9wdGlvbiA9PT0gZ2V0TG9jYWxlVGV4dCgnc3RhdGUtc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJHFzKCdsYWJlbFtmb3I9XCJwcm92aW5jZVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gZ2V0TG9jYWxlVGV4dCgnc3RhdGUnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRxcygnbGFiZWxbZm9yPVwicHJvdmluY2VcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGRlZmF1bHRPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgJHN0YXRlT3JQcm92aW5jZXNUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkcXMoJ2xhYmVsW2Zvcj1cInByb3ZpbmNlXCJdJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNvdW50cnlBbmRTdGF0ZUxpc3QobWVyY2hhbnRMb2NhdGlvbkluZm8pIHtcbiAgICBpZiAoIW1lcmNoYW50TG9jYXRpb25JbmZvKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogTm8gV0MgTG9jYXRpb24gaW5mby4gUGxlYXNlIHVwZGF0ZSB0aGUgUGVhY2hQYXkgUGx1Z2luLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0ICRjb3VudHJpZXMgPSAkcXMoJyNjb3VudHJ5Jyk7XG4gICAgaWYgKCEkY291bnRyaWVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0QUNvdW50cnkgPSBnZXRMb2NhbGVUZXh0KCdjb3VudHJ5Jyk7XG4gICAgY29uc3QgY291bnRyeU9wdGlvbnMgPSBtZXJjaGFudExvY2F0aW9uSW5mby5hbGxvd2VkX2NvdW50cmllcztcbiAgICAkY291bnRyaWVzLmlubmVySFRNTCA9IHJlbmRlckRyb3BEb3duTGlzdChjb3VudHJ5T3B0aW9ucywgc2VsZWN0QUNvdW50cnkpO1xuICAgIHNlbGVjdERyb3Bkb3duKCRjb3VudHJpZXMsIG1lcmNoYW50TG9jYXRpb25JbmZvLmN1c3RvbWVyX2RlZmF1bHRfY291bnRyeSB8fCBtZXJjaGFudExvY2F0aW9uSW5mby5zdG9yZV9jb3VudHJ5KTtcbiAgICBpZiAoJGNvdW50cmllcy5vcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAkY291bnRyaWVzLnNlbGVjdGVkSW5kZXggPSAxO1xuICAgIH1cbiAgICAkY291bnRyaWVzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG59XG5mdW5jdGlvbiByZW5kZXJDdXN0b21lckZpZWxkcyhjdXN0b21lcikge1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwibmFtZV9maXJzdFwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIubmFtZV9maXJzdFxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJuYW1lX2xhc3RcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLm5hbWVfbGFzdFxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJlbWFpbFwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuZW1haWxcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwicGhvbmVcIl0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC52YWx1ZSA9IGN1c3RvbWVyLnBob25lXG4gICAgKTtcbiAgICAkcXMoJyNwcC1pbmZvLWZvcm0gaW5wdXRbbmFtZT1cImFkZHJlc3MxXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5hZGRyZXNzMVxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJhZGRyZXNzMlwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuYWRkcmVzczJcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwicG9zdGFsXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5wb3N0YWxcbiAgICApO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBpbnB1dFtuYW1lPVwiY2l0eVwiXScsICgkZWxlbWVudCk9PiRlbGVtZW50LnZhbHVlID0gY3VzdG9tZXIuY2l0eVxuICAgICk7XG4gICAgJHFzKCcjcHAtaW5mby1mb3JtIGlucHV0W25hbWU9XCJjb3VudHJ5XCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5jb3VudHJ5XG4gICAgKTtcbiAgICByZW5kZXJDb3JyZWN0UHJvdmluY2VGaWVsZCgpO1xuICAgICRxcygnI3BwLWluZm8tZm9ybSBbbmFtZT1cInN0YXRlXCJdJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudmFsdWUgPSBjdXN0b21lci5zdGF0ZVxuICAgICk7XG59XG5mdW5jdGlvbiByZW5kZXJDdXN0b21lckhlYWRlcihjdXN0b21lciwgZXhpc3RpbmdDdXN0b21lcikge1xuICAgIGlmIChleGlzdGluZ0N1c3RvbWVyKSB7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWVtYWlsJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5lbWFpbFxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1uYW1lX2ZpcnN0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5uYW1lX2ZpcnN0XG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLW5hbWVfbGFzdCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIubmFtZV9sYXN0XG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWFkZHJlc3MxJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXN0b21lci5hZGRyZXNzMVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1hZGRyZXNzMicsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIuYWRkcmVzczIgPyAnICcgKyBjdXN0b21lci5hZGRyZXNzMiA6ICcnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWNpdHknLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLmNpdHlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGN1c3RvbWVyLmNvdW50cnkgPT09ICdKUCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxTdGF0ZU5hbWUgPSBHTE9CQUwucGhwRGF0YT8ud2NfbG9jYXRpb25faW5mbz8uYWxsb3dlZF9zdGF0ZXNfb3JfcHJvdmluY2VzLkpQW2N1c3RvbWVyLnN0YXRlXTtcbiAgICAgICAgICAgICRxcygnI2V4aXN0aW5nLXN0YXRlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBmdWxsU3RhdGVOYW1lID8/ICcnXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjZXhpc3Rpbmctc3RhdGUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGN1c3RvbWVyLnN0YXRlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgICRxcygnI2V4aXN0aW5nLWNvdW50cnknLCAoJGVsZW1lbnQpPT4kZWxlbWVudC50ZXh0Q29udGVudCA9IGdldENvdW50cnlOYW1lKGN1c3RvbWVyLmNvdW50cnkpXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2V4aXN0aW5nLXBvc3RhbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXIucG9zdGFsXG4gICAgICAgICk7XG4gICAgICAgIGRpc3BsYXlDQ0xvZ28oY3VzdG9tZXIpO1xuICAgICAgICAkcXMoJyNleGlzdGluZy1sYXN0NCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnRleHRDb250ZW50ID0gY3VzdG9tZXI/LmNhcmQ/Lmxhc3Q0ID8/ICcnXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZ1bGxBZGRyZXNzID0gJyc7XG4gICAgICAgIGlmIChjdXN0b21lci5jb3VudHJ5ID09PSAnSlAnKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsU3RhdGUgPSBHTE9CQUwucGhwRGF0YT8ud2NfbG9jYXRpb25faW5mbz8uYWxsb3dlZF9zdGF0ZXNfb3JfcHJvdmluY2VzLkpQW2N1c3RvbWVyLnN0YXRlXTtcbiAgICAgICAgICAgIGZ1bGxBZGRyZXNzID0gYCR7Y3VzdG9tZXIucG9zdGFsfSwgJHtmdWxsU3RhdGUgPz8gY3VzdG9tZXIuc3RhdGV9LCAgJHtjdXN0b21lci5jaXR5fSwgJHtjdXN0b21lci5hZGRyZXNzMX0ke2N1c3RvbWVyLmFkZHJlc3MyID8gJyAnICsgY3VzdG9tZXIuYWRkcmVzczIgOiAnJ31gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsbEFkZHJlc3MgPSBgJHtjdXN0b21lci5hZGRyZXNzMX0ke2N1c3RvbWVyLmFkZHJlc3MyID8gJyAnICsgY3VzdG9tZXIuYWRkcmVzczIgKyAnLCAnIDogJywnfSAke2N1c3RvbWVyLmNpdHl9LCAke2N1c3RvbWVyLnN0YXRlfSAke2N1c3RvbWVyLnBvc3RhbH0sICR7Y3VzdG9tZXIuY291bnRyeX1gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZ1bGxOYW1lID0gYCR7Y3VzdG9tZXIubmFtZV9maXJzdH0gJHtjdXN0b21lci5uYW1lX2xhc3R9YDtcbiAgICAgICAgJHFzKCcuZW1haWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBjdXN0b21lci5lbWFpbFxuICAgICAgICApO1xuICAgICAgICAkcXMoJy5mdWxsLW5hbWUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBmdWxsTmFtZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJy5wcC1hZGRyZXNzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gZnVsbEFkZHJlc3NcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGp1c3RPcmRlclN1bW1hcnlIZWlnaHQoaXNQYXlwYWxVc2VkKSB7XG4gICAgaWYgKEdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyAmJiBHTE9CQUwucGhwRGF0YS5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgR0xPQkFMLnBocERhdGEuZW5hYmxlX29yZGVyX25vdGVzICYmICFwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkpIHtcbiAgICAgICAgaXNQYXlwYWxVc2VkID8gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzI4cmVtJ1xuICAgICAgICApIDogJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzMycmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAoR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zICYmIEdMT0JBTC5waHBEYXRhLnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiAhR0xPQkFMLnBocERhdGEuZW5hYmxlX29yZGVyX25vdGVzICYmICFwcm9kdWN0QnVuZGxlc1Byb2R1Y3RQYWdlKCkpIHtcbiAgICAgICAgaXNQYXlwYWxVc2VkID8gJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzE5cmVtJ1xuICAgICAgICApIDogJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzIzcmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAoR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zICYmICFHTE9CQUwucGhwRGF0YS5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgR0xPQkFMLnBocERhdGEuZW5hYmxlX29yZGVyX25vdGVzIHx8ICFHTE9CQUwucGhwRGF0YT8uZW5hYmxlX2NvdXBvbnMgJiYgR0xPQkFMLnBocERhdGE/LnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiBHTE9CQUwucGhwRGF0YS5lbmFibGVfb3JkZXJfbm90ZXMgJiYgIXByb2R1Y3RCdW5kbGVzUHJvZHVjdFBhZ2UoKSkge1xuICAgICAgICBpc1BheXBhbFVzZWQgPyAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjYuNXJlbSdcbiAgICAgICAgKSA6ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyOS41cmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAoIUdMT0JBTC5waHBEYXRhPy5lbmFibGVfY291cG9ucyAmJiAhR0xPQkFMLnBocERhdGE/LnBsdWdpbl9wd193b29jb21tZXJjZV9naWZ0X2NhcmRzX2FjdGl2ZSAmJiBHTE9CQUwucGhwRGF0YT8uZW5hYmxlX29yZGVyX25vdGVzKSB7XG4gICAgICAgIGlzUGF5cGFsVXNlZCA/ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyM3JlbSdcbiAgICAgICAgKSA6ICRxcygnI3BwLXN1bW1hcnktYm9keS1leGlzdGluZycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICcyNi41cmVtJ1xuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAoR0xPQkFMLnBocERhdGE/LmVuYWJsZV9jb3Vwb25zIHx8IEdMT0JBTC5waHBEYXRhPy5wbHVnaW5fcHdfd29vY29tbWVyY2VfZ2lmdF9jYXJkc19hY3RpdmUgJiYgIXByb2R1Y3RCdW5kbGVzUHJvZHVjdFBhZ2UoKSkge1xuICAgICAgICBpc1BheXBhbFVzZWQgPyAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMTdyZW0nXG4gICAgICAgICkgOiAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjEuNXJlbSdcbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzUGF5cGFsVXNlZCkge1xuICAgICAgICAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMTVyZW0nXG4gICAgICAgICk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEN1cnJlbmN5KG1lc3NhZ2UpIHtcbiAgICBpbml0Q3VycmVuY3lFdmVudHMoKTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVNZXJjaGFudEN1cnJlbmN5Q29uZmlnKHtcbiAgICAgICAgY29kZTogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LmNvZGUgPz8gJ1VTRCcsXG4gICAgICAgIHN5bWJvbDogbWVzc2FnZS5waHBEYXRhPy5jdXJyZW5jeV9pbmZvPy5zeW1ib2wgPz8gJyQnLFxuICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3I6IG1lc3NhZ2UucGhwRGF0YS5jdXJyZW5jeV9pbmZvPy50aG91c2FuZHNfc2VwYXJhdG9yID8/ICcsJyxcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogbWVzc2FnZS5waHBEYXRhLmN1cnJlbmN5X2luZm8/LmRlY2ltYWxfc2VwYXJhdG9yID8/ICcuJyxcbiAgICAgICAgZGVjaW1hbHM6IG1lc3NhZ2UucGhwRGF0YS5jdXJyZW5jeV9pbmZvPy5udW1iZXJfb2ZfZGVjaW1hbHMgPz8gMixcbiAgICAgICAgcG9zaXRpb246IG1lc3NhZ2UucGhwRGF0YS5jdXJyZW5jeV9pbmZvPy5wb3NpdGlvbiA/PyAnbGVmdCcsXG4gICAgICAgIHJvdW5kaW5nOiBtZXNzYWdlLnBocERhdGEuY3VycmVuY3lfaW5mbz8ucm91bmRpbmcgPz8gJ2Rpc2FibGVkJ1xuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGluaXRDdXJyZW5jeUV2ZW50cygpIHtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyQ3VycmVuY3lTeW1ib2xzKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJDdXJyZW5jeVN5bWJvbHMoKSB7XG4gICAgY29uc3QgeyBwb3NpdGlvbiAsIHN5bWJvbCAgfSA9IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb25maWd1cmF0aW9uKCk7XG4gICAgY29uc3QgcmlnaHQgPSBwb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCBwb3NpdGlvbiA9PT0gJ3JpZ2h0X3NwYWNlJztcbiAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbChgLmN1cnJlbmN5LXN5bWJvbCR7cmlnaHQgPyAnLWFmdGVyJyA6ICcnfWApKXtcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gc3ltYm9sO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRHaWZ0Q2FyZElucHV0KF9tZXNzYWdlKSB7XG4gICAgaWYgKCFGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuR0lGVENBUkRfSU5QVVQpIHx8IHByb2R1Y3RCdW5kbGVzUHJvZHVjdFBhZ2UoKSB8fCBNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSA9PT0gJ3NrcmVnZWFyLmNvbScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbml0R2lmdENhcmRFdmVudHMoKTtcbiAgICBmb3IgKGNvbnN0ICRmb3JtIG9mICRxc0FsbCgnLmdpZnQtY2FyZC1vcHRpb24nKSl7XG4gICAgICAgICRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgJHFzKCcjZ2lmdC1jYXJkLXNlY3Rpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGlmIChGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuQ09VUE9OX0lOUFVUKSkge1xuICAgICAgICAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMjVyZW0nXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzIzLjVyZW0nXG4gICAgICAgICk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEdpZnRDYXJkRXZlbnRzKCkge1xuICAgIG9uV2luZG93TWVzc2FnZSgnZ2lmdENhcmRBcHBsaWVkJywgYXN5bmMgKG1lc3NhZ2UpPT57XG4gICAgICAgIGlmICghR0xPQkFMLnBocERhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0ICRtZXNzYWdlIG9mICRxc0FsbCgnLmludmFsaWQtZ2lmdC1jYXJkJykpe1xuICAgICAgICAgICAgJG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBoaWRlR2lmdENhcmRMb2FkaW5nU3RhdGUoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgJG1lc3NhZ2Ugb2YgJHFzQWxsKCcuaW52YWxpZC1naWZ0LWNhcmQnKSl7XG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgJG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhcklucHV0KCcuZ2lmdC1jYXJkLWlucHV0Jyk7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgaGlkZUdpZnRDYXJkTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGhpZGVHaWZ0Q2FyZExvYWRpbmdTdGF0ZSgpO1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgJGZvcm0gb2YgJHFzQWxsKCdmb3JtLnB3LXdjLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgJGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KT0+e1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghJGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0dpZnRDYXJkTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGdpZnRDYXJkTnVtYmVyID0gZGF0YS5nZXQoJ2NhcmRfbnVtYmVyJyk/LnRyaW0oKSA/PyAnJztcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiAncmVkZWVtR2lmdENhcmQnLFxuICAgICAgICAgICAgICAgIGNhcmROdW1iZXI6IGdpZnRDYXJkTnVtYmVyXG4gICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkZGl2IG9mICRxc0FsbCgnLmdpZnQtY2FyZC1vcHRpb24nKSl7XG4gICAgICAgICRkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93R2lmdENhcmRJbnB1dCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGV4aXRHaWZ0IG9mICRxc0FsbCgnLmV4aXQtYnV0dG9uLWdpZnQnKSl7XG4gICAgICAgICRleGl0R2lmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVHaWZ0Q2FyZElucHV0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBzaG93R2lmdENhcmRJbnB1dCgpIHtcbiAgICBmb3IgKGNvbnN0ICRjb3Vwb24gb2YgJHFzQWxsKCdmb3JtLnB3LXdjLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgJGNvdXBvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJG9wdGlvbiBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtb3B0aW9uJykpe1xuICAgICAgICAkb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoaWRlR2lmdENhcmRJbnB1dCgpIHtcbiAgICBmb3IgKGNvbnN0ICRjb3Vwb24gb2YgJHFzQWxsKCdmb3JtLnB3LXdjLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgJGNvdXBvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJG9wdGlvbiBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtb3B0aW9uJykpe1xuICAgICAgICAkb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkaW52YWxpZCBvZiAkcXNBbGwoJy5pbnZhbGlkLWdpZnQtY2FyZCcpKXtcbiAgICAgICAgJGludmFsaWQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBjbGVhcklucHV0KCcuZ2lmdC1jYXJkLWlucHV0Jyk7XG59XG5mdW5jdGlvbiBoaWRlR2lmdENhcmRMb2FkaW5nU3RhdGUoKSB7XG4gICAgZm9yIChjb25zdCAkc3Bpbm5lciBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtc3Bpbm5lcicpKXtcbiAgICAgICAgJHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRib3JkZXIgb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLWlucHV0Jykpe1xuICAgICAgICAkYm9yZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS1yaWdodC1ib3JkZXInKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYXBwbHlCdXR0b24gb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLWFwcGx5Jykpe1xuICAgICAgICAkYXBwbHlCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBzaG93R2lmdENhcmRMb2FkaW5nU3RhdGUoKSB7XG4gICAgZm9yIChjb25zdCAkc3Bpbm5lciBvZiAkcXNBbGwoJy5naWZ0LWNhcmQtc3Bpbm5lcicpKXtcbiAgICAgICAgJHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRib3JkZXIgb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLWlucHV0Jykpe1xuICAgICAgICAkYm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS1yaWdodC1ib3JkZXInKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkYXBwbHlCdXR0b24gb2YgJHFzQWxsKCcuZ2lmdC1jYXJkLWFwcGx5Jykpe1xuICAgICAgICAkYXBwbHlCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRDb3Vwb25JbnB1dChfbWVzc2FnZSkge1xuICAgIGlmICghRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLkNPVVBPTl9JTlBVVCkgfHwgRmVhdHVyZS52ZXJzaW9uKEZlYXR1cmVGbGFnLkNPVVBPTl9JTlBVVCkgPCAyICYmIEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzaG93Q291cG9uRW50cnlTdXBwb3J0KCk7XG4gICAgaW5pdENvdXBvbklucHV0RXZlbnRzKCk7XG59XG5mdW5jdGlvbiBpbml0Q291cG9uSW5wdXRFdmVudHMoKSB7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdjb3Vwb24nLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgZm9yIChjb25zdCAkbWVzc2FnZSBvZiAkcXNBbGwoJy53Yy1pbnZhbGlkLWNvdXBvbicpKXtcbiAgICAgICAgICAgICRtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5kYXRhICYmIG1lc3NhZ2UuZGF0YS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgaGlkZUNvdXBvbkxvYWRpbmdTdGF0ZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCAkbWVzc2FnZSBvZiAkcXNBbGwoJy53Yy1pbnZhbGlkLWNvdXBvbicpKXtcbiAgICAgICAgICAgICAgICAkbWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgaGlkZUNvdXBvbkxvYWRpbmdTdGF0ZSgpO1xuICAgICAgICBjbGVhcklucHV0KCcud2MtY291cG9uLWNvZGUtaW5wdXQnKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ3N0b3BDb3Vwb25Mb2FkaW5nJywgKF8pPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGhpZGVDb3Vwb25Mb2FkaW5nU3RhdGUoKTtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0ICRmb3JtIG9mICRxc0FsbCgnZm9ybS53Yy1jb3Vwb24tY29kZScpKXtcbiAgICAgICAgJGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KT0+e1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghJGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICBzaG93Q291cG9uTG9hZGluZ1N0YXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCA/PyB1bmRlZmluZWQpO1xuICAgICAgICAgICAgY29uc3QgY291cG9uQ29kZSA9IGRhdGEuZ2V0KCdjb3Vwb25fY29kZScpPy50cmltKCkgPz8gJyc7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ2ZldGNoQ291cG9uJyxcbiAgICAgICAgICAgICAgICBjb2RlOiBjb3Vwb25Db2RlXG4gICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkb3BlbkNvdXBvbiBvZiAkcXNBbGwoJy5jb3Vwb24tY29kZS1vcHRpb24nKSl7XG4gICAgICAgICRvcGVuQ291cG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0NvdXBvbklucHV0KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkZXhpdENvdXBvbiBvZiAkcXNBbGwoJy5leGl0LWJ1dHRvbi1jb3Vwb24nKSl7XG4gICAgICAgICRleGl0Q291cG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZUNvdXBvbklucHV0KTtcbiAgICB9XG4gICAgaGlkZUNvdXBvbkxvYWRpbmdTdGF0ZSgpO1xufVxuZnVuY3Rpb24gc2hvd0NvdXBvbkVudHJ5U3VwcG9ydCgpIHtcbiAgICBmb3IgKGNvbnN0ICRmb3JtIG9mICRxc0FsbCgnLmNvdXBvbi1jb2RlLW9wdGlvbicpKXtcbiAgICAgICAgJGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICAkcXMoJyNjb3Vwb24tY29kZS1zZWN0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbn1cbmZ1bmN0aW9uIHNob3dDb3Vwb25JbnB1dCgpIHtcbiAgICBmb3IgKGNvbnN0ICRjb3Vwb24gb2YgJHFzQWxsKCdmb3JtLndjLWNvdXBvbi1jb2RlJykpe1xuICAgICAgICAkY291cG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkb3B0aW9uIG9mICRxc0FsbCgnLmNvdXBvbi1jb2RlLW9wdGlvbicpKXtcbiAgICAgICAgJG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaGlkZUNvdXBvbklucHV0KCkge1xuICAgIGZvciAoY29uc3QgJGNvdXBvbiBvZiAkcXNBbGwoJ2Zvcm0ud2MtY291cG9uLWNvZGUnKSl7XG4gICAgICAgICRjb3Vwb24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRvcHRpb24gb2YgJHFzQWxsKCcuY291cG9uLWNvZGUtb3B0aW9uJykpe1xuICAgICAgICAkb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCAkaW52YWxpZCBvZiAkcXNBbGwoJy53Yy1pbnZhbGlkLWNvdXBvbicpKXtcbiAgICAgICAgJGludmFsaWQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBjbGVhcklucHV0KCcud2MtY291cG9uLWNvZGUtaW5wdXQnKTtcbn1cbmZ1bmN0aW9uIGhpZGVDb3Vwb25Mb2FkaW5nU3RhdGUoKSB7XG4gICAgZm9yIChjb25zdCAkc3Bpbm5lciBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tc3Bpbm5lcicpKXtcbiAgICAgICAgJHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRib3JkZXIgb2YgJHFzQWxsKCcud2MtY291cG9uLWNvZGUtaW5wdXQnKSl7XG4gICAgICAgICRib3JkZXIuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlLXJpZ2h0LWJvcmRlcicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0ICRhcHBseUJ1dHRvbiBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tY29kZS1hcHBseScpKXtcbiAgICAgICAgJGFwcGx5QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gc2hvd0NvdXBvbkxvYWRpbmdTdGF0ZSgpIHtcbiAgICBmb3IgKGNvbnN0ICRzcGlubmVyIG9mICRxc0FsbCgnLndjLWNvdXBvbi1zcGlubmVyJykpe1xuICAgICAgICAkc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGJvcmRlciBvZiAkcXNBbGwoJy53Yy1jb3Vwb24tY29kZS1pbnB1dCcpKXtcbiAgICAgICAgJGJvcmRlci5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtcmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgJGFwcGx5QnV0dG9uIG9mICRxc0FsbCgnLndjLWNvdXBvbi1jb2RlLWFwcGx5Jykpe1xuICAgICAgICAkYXBwbHlCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRMYW5ndWFnZShtZXNzYWdlKSB7XG4gICAgaW5pdExhbmd1YWdlRXZlbnRzKCk7XG4gICAgbGV0IGxhbmd1YWdlID0gbWVzc2FnZS5waHBEYXRhLmxhbmd1YWdlID09PSAnZGV0ZWN0LWZyb20tcGFnZScgPyBtZXNzYWdlLnBhZ2VMYW5ndWFnZSA6IG1lc3NhZ2UucGhwRGF0YS5sYW5ndWFnZTtcbiAgICBjb25zdCBlbmdsaXNoVmFyaWFudHMgPSBuZXcgU2V0KFtcbiAgICAgICAgJ2VuLUFVJyxcbiAgICAgICAgJ2VuLUNBJyxcbiAgICAgICAgJ2VuLUdCJyxcbiAgICAgICAgJ2VuLU5aJyxcbiAgICAgICAgJ2VuLVpBJ1xuICAgIF0pO1xuICAgIGlmIChlbmdsaXNoVmFyaWFudHMuaGFzKGxhbmd1YWdlKSkge1xuICAgICAgICBsYW5ndWFnZSA9ICdlbi1VUyc7XG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUxhbmd1YWdlKGxhbmd1YWdlKSk7XG59XG5mdW5jdGlvbiBpbml0TGFuZ3VhZ2VFdmVudHMoKSB7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdwYWdlTGFuZ3VhZ2VDaGFuZ2UnLCAobWVzc2FnZSk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTGFuZ3VhZ2UobWVzc2FnZS5sYW5ndWFnZSkpO1xuICAgIH0pO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJMb2NhbGVUZXh0KCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJMb2NhbGVUZXh0KCkge1xuICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCdbZGF0YS1pMThuXScpKXtcbiAgICAgICAgaWYgKCRlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnICYmICRlbGVtZW50LnR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgICAgICAkZWxlbWVudC52YWx1ZSA9IGdldExvY2FsZVRleHQoJGVsZW1lbnQ/LmRhdGFzZXQ/LmkxOG4gPz8gJycpO1xuICAgICAgICB9IGVsc2UgaWYgKCRlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICAkZWxlbWVudC5wbGFjZWhvbGRlciA9IGdldExvY2FsZVRleHQoJGVsZW1lbnQ/LmRhdGFzZXQ/LmkxOG4gPz8gJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSBnZXRMb2NhbGVUZXh0KCRlbGVtZW50Py5kYXRhc2V0Py5pMThuID8/ICcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoRW52aXJvbm1lbnQubGFuZ3VhZ2UoKSA9PT0gJ3JvLVJPJykge1xuICAgICAgICBzZXRDdXN0b21WYWxpZGl0eU1lc3NhZ2UoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRDdXN0b21WYWxpZGl0eU1lc3NhZ2UoKSB7XG4gICAgZm9yIChjb25zdCAkaW5wdXQgb2YgJHFzQWxsKCdmb3JtIGlucHV0Jykpe1xuICAgICAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW52YWxpZCcsICgpPT57XG4gICAgICAgICAgICAkaW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkoJ1RlIHJ1Z8SDbSBzYSBjb21wbGV0ZXppIGFjZXN0IGPDom1wLicpO1xuICAgICAgICB9KTtcbiAgICAgICAgJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9PntcbiAgICAgICAgICAgICRpbnB1dC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICBjb25zdCBzdHJpbmdUb1VwcGVyID0gU3RyaW5nKHN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZ1RvVXBwZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmdUb1VwcGVyLnNsaWNlKDEpO1xufVxuZnVuY3Rpb24gaW5pdFF1YW50aXR5Q2hhbmdlckV2ZW50KCkge1xuICAgIGlmICghRmVhdHVyZS5lbmFibGVkKEZlYXR1cmVGbGFnLlFVQU5USVRZX0NIQU5HRVIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJHFzQWxsKCcjcHAtc3VtbWFyeS1ib2R5LCAjcHAtc3VtbWFyeS1ib2R5LWV4aXN0aW5nLCAjcHAtc3VtbWFyeS1ib2R5LW1vYmlsZScsICgkY2FydENvbnRhaW5lcik9PntcbiAgICAgICAgJGNhcnRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQxKT0+e1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9IGV2ZW50MS50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISR0YXJnZXQuY2xvc2VzdCgnLnF0eS1idG4nKSAmJiAhJHRhcmdldC5jbG9zZXN0KCcucXR5LWZzJykgJiYgISR0YXJnZXQuY2xvc2VzdCgnLml0ZW0tcmVtb3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCR0YXJnZXQuY2xvc2VzdCgnLnF0eS1idG4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRidXR0b24gPSAkdGFyZ2V0LmNsb3Nlc3QoJy5xdHktYnRuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FydEl0ZW1LZXkgPSAkYnV0dG9uLmRhdGFzZXQucWlkO1xuICAgICAgICAgICAgICAgIGlmICgkYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZGVjcmVhc2UtcXR5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIC0xLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnaW5jcmVhc2UtcXR5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuY2xvc2VzdCgnLnF0eS1mcycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzVGltZW91dElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5xdHktZnMnKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJ0SXRlbUtleSA9ICR0YXJnZXQuY2xvc2VzdCgnLnF0eS1mcycpLmRhdGFzZXQucWlkO1xuICAgICAgICAgICAgICAgICR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRpbnB1dFRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZW91dElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocHJldmlvdXNUaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVGltZW91dElkID0gc2V0VGltZW91dChhc3luYyAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRpbnB1dFRhcmdldC52YWx1ZSAmJiBjdXJyZW50VmFsdWUgIT09ICRpbnB1dFRhcmdldC52YWx1ZSAmJiAkaW5wdXRUYXJnZXQuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbmdlUXVhbnRpdHkoY2FydEl0ZW1LZXksIE51bWJlci5wYXJzZUludCgkaW5wdXRUYXJnZXQudmFsdWUpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0VGFyZ2V0LnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIDc1MCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYXN5bmMgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkaW5wdXRUYXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1RpbWVvdXRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByZXZpb3VzVGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0VGFyZ2V0LnZhbHVlICYmIGN1cnJlbnRWYWx1ZSAhPT0gJGlucHV0VGFyZ2V0LnZhbHVlICYmICRpbnB1dFRhcmdldC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNoYW5nZVF1YW50aXR5KGNhcnRJdGVtS2V5LCBOdW1iZXIucGFyc2VJbnQoJGlucHV0VGFyZ2V0LnZhbHVlKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRUYXJnZXQudmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5jbG9zZXN0KCcuaXRlbS1yZW1vdmVyJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJ0SXRlbUtleSA9ICR0YXJnZXQuY2xvc2VzdCgnLml0ZW0tcmVtb3ZlcicpLmRhdGFzZXQucWlkO1xuICAgICAgICAgICAgICAgIGF3YWl0IGNoYW5nZVF1YW50aXR5KGNhcnRJdGVtS2V5LCAwLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VRdWFudGl0eShjYXJ0SXRlbUtleSwgYW1vdW50ID0gMSwgc2V0ID0gZmFsc2UpIHtcbiAgICBpZiAoRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpICE9PSAnZmluaXNoZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEhvc3RXaW5kb3dEYXRhKCdwcC1jaGFuZ2UtcXVhbnRpdHknLCB7XG4gICAgICAgICAgICBrZXk6IGNhcnRJdGVtS2V5LFxuICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgc2V0XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdW1lQ2FydENhbGN1bGF0aW9uUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgUXVhbnRpdHkgZmFpbGVkIHRvIGNoYW5nZSBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfS4gRXJyb3Ike2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG59XG5mdW5jdGlvbiBpbml0Q2FydCgpIHtcbiAgICBpbml0Q2FydEV2ZW50cygpO1xuICAgIGluaXRRdWFudGl0eUNoYW5nZXJFdmVudCgpO1xuICAgIG9uV2luZG93TWVzc2FnZSgncHAtdXBkYXRlLWNhcnQnLCBhc3luYyAoKT0+e1xuICAgICAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpbml0Q2FydEV2ZW50cygpIHtcbiAgICBsZXQgcHJldmlvdXNDYXJ0RGF0YSA9ICcnO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICBjb25zdCBjYXJ0RGF0YSA9IEpTT04uc3RyaW5naWZ5KERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpO1xuICAgICAgICBpZiAoY2FydERhdGEgIT09IHByZXZpb3VzQ2FydERhdGEpIHtcbiAgICAgICAgICAgIHByZXZpb3VzQ2FydERhdGEgPSBjYXJ0RGF0YTtcbiAgICAgICAgICAgIHJlbmRlck9yZGVyU3VtbWFyeUl0ZW1zKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJPcmRlclN1bW1hcnlJdGVtcyhjYXJ0KSB7XG4gICAgY29uc3QgJHRib2R5ID0gJHFzKCcjcHAtc3VtbWFyeS1ib2R5Jyk7XG4gICAgY29uc3QgJHRib2R5RXhpc3RpbmcgPSAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktZXhpc3RpbmcnKTtcbiAgICBjb25zdCAkdGJvZHlNb2JpbGUgPSAkcXMoJyNwcC1zdW1tYXJ5LWJvZHktbW9iaWxlJyk7XG4gICAgaWYgKCEkdGJvZHkgfHwgISR0Ym9keUV4aXN0aW5nIHx8ICEkdGJvZHlNb2JpbGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRWYXJpYXRpb25IVE1MKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhcmlhdGlvblJvd0hUTUwgPSAnJztcbiAgICAgICAgaWYgKCFpdGVtLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJpYXRpb25Sb3dIVE1MO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtLmF0dHJpYnV0ZXMpO1xuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJpYXRpb25Sb3dIVE1MO1xuICAgICAgICB9XG4gICAgICAgIHZhcmlhdGlvblJvd0hUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cyl7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRLZXkgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoa2V5LnJlcGxhY2UoJ2F0dHJpYnV0ZV8nLCAnJykucmVwbGFjZSgncGFfJywgJycpLnJlcGxhY2UoLy0vZywgJyAnKSk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IFN0cmluZyhpdGVtLmF0dHJpYnV0ZXNba2V5XSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIHZhcmlhdGlvblJvd0hUTUwgKz0gYDxicj48c3BhbiBjbGFzcz1cIiR7aXRlbS5pc19wYXJ0X29mX2J1bmRsZSA/ICcnIDogJ211dGVkJ30gcGwtMy8yXCI+JHtmb3JtYXR0ZWRLZXl9OiAke2Zvcm1hdHRlZFZhbHVlfTwvc3Bhbj5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YXJpYXRpb25Sb3dIVE1MO1xuICAgIH1cbiAgICBjbGVhck9yZGVyU3VtbWFyeSgpO1xuICAgIGlmIChEZWZhdWx0Q2FydC5jb250ZW50cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCAkbWVzc2FnZSA9IGA8dHIgY2xhc3M9XCJvcmRlci1zdW1tYXJ5LWl0ZW1cIj48dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IFwiPiR7Z2V0TG9jYWxlVGV4dCgnZW1wdHktY2FydCcpfTwvdGQ+PC90cj5gO1xuICAgICAgICAkdGJvZHkuaW5uZXJIVE1MID0gJG1lc3NhZ2U7XG4gICAgICAgICR0Ym9keU1vYmlsZS5pbm5lckhUTUwgPSAkbWVzc2FnZTtcbiAgICAgICAgJHRib2R5RXhpc3RpbmcuaW5uZXJIVE1MID0gJG1lc3NhZ2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gY2FydC5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjYXJ0W2ldO1xuICAgICAgICBpZiAoaXRlbS5xdWFudGl0eSA9PT0gJycgfHwgTnVtYmVyLnBhcnNlSW50KFN0cmluZyhpdGVtLnF1YW50aXR5KSkgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICBpZiAoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkgPT09ICd1Z29wcm9iYXNlYmFsbC5jb20nICYmIGl0ZW0uZm9ybWF0dGVkX2l0ZW1fZGF0YSAmJiBpdGVtLm5hbWVfd2l0aF92YXJpYXRpb24pIHtcbiAgICAgICAgICAgIG5hbWUgPSBpdGVtLm5hbWVfd2l0aF92YXJpYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFyaWF0aW9uVGl0bGUgPSAhaXRlbS5hdHRyaWJ1dGVzICYmIGl0ZW0udmFyaWF0aW9uX3RpdGxlID8gYCAtICR7aXRlbS52YXJpYXRpb25fdGl0bGUgPz8gJyd9YCA6ICcnO1xuICAgICAgICBjb25zdCBsYWJlbCA9IGAke25hbWUuYm9sZCgpfSR7dmFyaWF0aW9uVGl0bGV9ICR7bWV0YURhdGFSb3dzSFRNTChpdGVtKX0gJHtpdGVtLmZvcm1hdHRlZF9pdGVtX2RhdGEgPyBmb3JtYXR0ZWRJdGVtRGF0YUhUTUwoaXRlbSkgOiBnZXRWYXJpYXRpb25IVE1MKGl0ZW0pfWA7XG4gICAgICAgIGxldCBhbW91bnQgPSBgJHtmb3JtYXRDdXJyZW5jeVN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChpdGVtLmRpc3BsYXlfcHJpY2UgPz8gaXRlbS5wcmljZSkgKiBjYXJ0SXRlbVF1YW50aXR5KGl0ZW0pKX1gO1xuICAgICAgICBpZiAoaXRlbS5pc19wYXJ0X29mX2J1bmRsZSkge1xuICAgICAgICAgICAgYW1vdW50ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0uaXNfc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmdBbW91bnQgPSAhaXRlbS5zdWJzY3JpcHRpb25fcHJpY2Vfc3RyaW5nPy5pbmRleE9mKFN0cmluZyhpdGVtLmRpc3BsYXlfcHJpY2UgPz8gaXRlbS5wcmljZSkpID8gJycgOiBmb3JtYXRDb3N0U3RyaW5nKE51bWJlci5wYXJzZUZsb2F0KGl0ZW0uZGlzcGxheV9wcmljZSA/PyBpdGVtLnByaWNlKSk7XG4gICAgICAgICAgICBhbW91bnQgPSBgJHtNZXJjaGFudENvbmZpZ3VyYXRpb24uY3VycmVuY3kuc3ltYm9sKCl9JHtzdHJpbmdBbW91bnR9JHtpdGVtLnN1YnNjcmlwdGlvbl9wcmljZV9zdHJpbmcgPz8gJyd9YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCAkcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgJHJvdy5jbGFzc05hbWUgPSAnb3JkZXItc3VtbWFyeS1pdGVtJztcbiAgICAgICAgY29uc3QgJGl0ZW1SZW1vdmVyID0gKHRkQ2xhc3MgPSAnJyk9PmBcblx0XHQ8dGQgY2xhc3M9XCJpdGVtLXJlbW92ZXItdGQgbm9uLWJ1bmRsZWQtaXRlbSAke3RkQ2xhc3N9XCI+XG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiaXRlbS1yZW1vdmVyXCIgZGF0YS1xaWQ9XCIke2l0ZW0uaXRlbV9rZXl9XCI+JnRpbWVzOzwvYnV0dG9uPlxuXHRcdDwvdGQ+YFxuICAgICAgICA7XG4gICAgICAgIGNvbnN0ICRxdHlDaGFuZ2VyID0gKHRkQ2xhc3MgPSAnJyk9PmBcblx0XHQ8dGQgY2xhc3M9XCJxdHktdGQgJHt0ZENsYXNzfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInF1YW50aXR5LWNoYW5nZXJcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwci0wIGRlY3JlYXNlLXF0eSBxdHktYnRuICR7Y2FydEl0ZW1RdWFudGl0eShpdGVtKSA8PSAxID8gJ3Njcm9sbC1lbmQnIDogJyd9XCIgZGF0YS1xaWQ9XCIke2l0ZW0uaXRlbV9rZXl9XCI+JiM4NzIyOzwvYnV0dG9uPlxuXHRcdFx0XHQ8Zm9ybSBvblN1Ym1pdD1cInJldHVybiBmYWxzZTtcIiBjbGFzcz1cIm1iLTBcIj5cblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIke2l0ZW0uc3RvY2tfcXR5ID8gaXRlbS5zdG9ja19xdHkgOiAnJ31cIiBjbGFzcz1cInF0eS1mc1wiIHZhbHVlPVwiJHtjYXJ0SXRlbVF1YW50aXR5KGl0ZW0pfVwiIGRhdGEtcWlkPVwiJHtpdGVtLml0ZW1fa2V5fVwiIHJlcXVpcmVkLz5cblx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBsLTAgaW5jcmVhc2UtcXR5IHF0eS1idG4gJHtpdGVtLnN0b2NrX3F0eSAmJiBjYXJ0SXRlbVF1YW50aXR5KGl0ZW0pID49IGl0ZW0uc3RvY2tfcXR5ID8gJ3Njcm9sbC1lbmQnIDogJyd9XCIgZGF0YS1xaWQ9XCIke2l0ZW0uaXRlbV9rZXl9XCI+KzwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC90ZD5gXG4gICAgICAgIDtcbiAgICAgICAgY29uc3Qgc2hvd1F1YW50aXR5Q2hhbmdlciA9IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSAmJiBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ2NhcnQnIHx8IEZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5RVUFOVElUWV9DSEFOR0VSKSAmJiBGZWF0dXJlLnZlcnNpb24oRmVhdHVyZUZsYWcuUVVBTlRJVFlfQ0hBTkdFUikgPj0gMjtcbiAgICAgICAgaWYgKCFpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGNhcnQubGVuZ3RoIC0gMSAmJiBjYXJ0W2kgKyAxXS5pc19wYXJ0X29mX2J1bmRsZSkge1xuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9ICRpdGVtUmVtb3ZlcigncmVtb3ZlLWJvcmRlcicpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwicHJvZHVjdC1pbWctdGQtYjBcIiBpZD1cInByb2R1Y3QtaW1nXCI+PGltZyBjbGFzcz1cInByb2R1Y3QtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdCR7c2hvd1F1YW50aXR5Q2hhbmdlciA/ICRxdHlDaGFuZ2VyKCdidW5kbGUtbmFtZSByZW1vdmUtYm9yZGVyJykgOiAnJ31cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJidW5kbGUtbmFtZVwiPiR7bGFiZWx9PC90ZD5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJidW5kbGUtbmFtZSBib2xkXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gJGl0ZW1SZW1vdmVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwcm9kdWN0LWltZy10ZFwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwicHJvZHVjdC1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0JHtzaG93UXVhbnRpdHlDaGFuZ2VyID8gJHF0eUNoYW5nZXIoJ25vbi1idW5kbGVkLWl0ZW0nKSA6ICcnfVxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5vbi1idW5kbGVkLWl0ZW1cIj4ke2xhYmVsfTwvdGQ+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibm9uLWJ1bmRsZWQtaXRlbSBib2xkXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGNhcnQubGVuZ3RoIC0gMSAmJiAhY2FydFtpICsgMV0uaXNfcGFydF9vZl9idW5kbGUgfHwgaSA9PT0gY2FydC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMSBwcm9kdWN0LWltZy10ZFwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwiYnVuZGxlLWltZy1zaXplXCIgc3JjPVwiJHtpdGVtLmltYWdlWzBdfVwiLz48L3RkPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRyb3cuaW5uZXJIVE1MICs9IGBcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMVwiPiR7bGFiZWx9PC90ZD5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMVwiPiR7YW1vdW50fTwvdGQ+XG5cdFx0XHRcdGA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkcm93LmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJ1bmRsZS1wYWRkaW5nIHByb2R1Y3QtaW1nLXRkLWIwXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJidW5kbGUtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBidW5kbGUtcGFkZGluZ1wiPiR7bGFiZWx9PC90ZD5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYnVuZGxlLXBhZGRpbmdcIj4ke2Ftb3VudH08L3RkPlxuXHRcdFx0XHRgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtc0luQ2FydChjYXJ0KSA9PT0gMSB8fCBpID09PSBpdGVtc0luQ2FydChjYXJ0KSAtIDEpIHtcbiAgICAgICAgICAgIGNvbnN0ICRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgJG9uZS5jbGFzc05hbWUgPSAnb3JkZXItc3VtbWFyeS1pdGVtJztcbiAgICAgICAgICAgIGlmIChpdGVtLmlzX3BhcnRfb2ZfYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1hZ2U/LlswXSAmJiBpdGVtLmltYWdlPy5bMF0gIT09ICcodW5rbm93biknKSB7XG4gICAgICAgICAgICAgICAgICAgICRvbmUuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJtdXRlZCBwbC0zLzIgYmItMSBwcm9kdWN0LWltZy10ZCByZW1vdmUtYm9yZGVyXCIgaWQ9XCJwcm9kdWN0LWltZ1wiPjxpbWcgY2xhc3M9XCJidW5kbGUtaW1nLXNpemVcIiBzcmM9XCIke2l0ZW0uaW1hZ2VbMF19XCIvPjwvdGQ+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJG9uZS5pbm5lckhUTUwgKz0gYFxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm11dGVkIHBsLTMvMiBiYi0xIHJlbW92ZS1ib3JkZXJcIj4ke2xhYmVsfTwvdGQ+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibXV0ZWQgcGwtMy8yIGJiLTEgcmVtb3ZlLWJvcmRlclwiPiR7YW1vdW50fTwvdGQ+XG5cdFx0XHRcdGA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRvbmUuaW5uZXJIVE1MICs9ICRpdGVtUmVtb3ZlcigncmVtb3ZlLWJvcmRlcicpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmltYWdlPy5bMF0gJiYgaXRlbS5pbWFnZT8uWzBdICE9PSAnKHVua25vd24pJykge1xuICAgICAgICAgICAgICAgICAgICAkb25lLmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwicHJvZHVjdC1pbWctdGQgcmVtb3ZlLWJvcmRlclwiIGlkPVwicHJvZHVjdC1pbWdcIj48aW1nIGNsYXNzPVwicHJvZHVjdC1pbWctc2l6ZVwiIHNyYz1cIiR7aXRlbS5pbWFnZVswXX1cIi8+PC90ZD5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkb25lLmlubmVySFRNTCArPSBgXG5cdFx0XHRcdFx0JHtzaG93UXVhbnRpdHlDaGFuZ2VyID8gJHF0eUNoYW5nZXIoJ25vbi1idW5kbGVkLWl0ZW0gcmVtb3ZlLWJvcmRlcicpIDogJyd9XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwibm9uLWJ1bmRsZWQtaXRlbSByZW1vdmUtYm9yZGVyXCI+JHtsYWJlbH08L3RkPlxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5vbi1idW5kbGVkLWl0ZW0gcmVtb3ZlLWJvcmRlciBib2xkXCI+JHthbW91bnR9PC90ZD5cblx0XHRcdFx0YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0Ym9keS5wcmVwZW5kKCRvbmUpO1xuICAgICAgICAgICAgJHRib2R5TW9iaWxlLnByZXBlbmQoJG9uZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRib2R5LnByZXBlbmQoJHJvdyk7XG4gICAgICAgICAgICAkdGJvZHlNb2JpbGUucHJlcGVuZCgkcm93LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgJHRib2R5RXhpc3RpbmcucHJlcGVuZCgkcm93LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJPcmRlclN1bW1hcnkoKSB7XG4gICAgZm9yIChjb25zdCAkaXRlbSBvZiAkcXNBbGwoJy5vcmRlci1zdW1tYXJ5LWl0ZW0nKSl7XG4gICAgICAgICRpdGVtLnJlbW92ZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ldGFEYXRhUm93c0hUTUwoaXRlbSkge1xuICAgIGlmICghaXRlbS5tZXRhX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgaHRtbCA9ICcnO1xuICAgIGZvciAoY29uc3QgbWV0YSBvZiBpdGVtLm1ldGFfZGF0YSl7XG4gICAgICAgIGNvbnN0IGtleVRleHQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIobWV0YS5rZXkucmVwbGFjZSgvXy9nLCAnICcpKTtcbiAgICAgICAgaHRtbCArPSBgPGJyPjxzcGFuIGNsYXNzPVwibXV0ZWQgbWwtaGFsZlwiPjxiPiR7a2V5VGV4dH08L2I+OiAke21ldGEudmFsdWUgfHwgJyhub25lKSd9PC9zcGFuPmA7XG4gICAgfVxuICAgIHJldHVybiBodG1sO1xufVxuZnVuY3Rpb24gZm9ybWF0dGVkSXRlbURhdGFIVE1MKGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0uZm9ybWF0dGVkX2l0ZW1fZGF0YSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBpdGVtLmZvcm1hdHRlZF9pdGVtX2RhdGEucmVwbGFjZSgvJm5ic3A7L2csICcnKTtcbn1cbmZ1bmN0aW9uIGdyZWF0ZXJUaGFuKGEsIGIpIHtcbiAgICBjb25zdCBbbWFqb3JBLCBtaW5vckEsIHBhdGNoQV0gPSBTdHJpbmcoYSkuc3BsaXQoJy4nKS5tYXAoKG4pPT5OdW1iZXIobilcbiAgICApO1xuICAgIGNvbnN0IFttYWpvckIsIG1pbm9yQiwgcGF0Y2hCXSA9IFN0cmluZyhiKS5zcGxpdCgnLicpLm1hcCgobik9Pk51bWJlcihuKVxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gbWFqb3JBIC0gbWFqb3JCIHx8IG1pbm9yQSAtIG1pbm9yQiB8fCBwYXRjaEEgLSBwYXRjaEI7XG4gICAgcmV0dXJuIHJlc3VsdCA+IDA7XG59XG5mdW5jdGlvbiBpbml0U3RyaXBlQnV0dG9uKCkge1xuICAgIHNob3dTdHJpcGVQYXltZW50T3B0aW9uKCk7XG4gICAgJHFzKCcjc3RyaXBlLW9wdGlvbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdFN0cmlwZVBheW1lbnRNZXRob2QpO1xuICAgIHN0b3JlLnN1YnNjcmliZSgoKT0+e1xuICAgICAgICByZW5kZXJTdHJpcGVCdXR0b25EaXNwbGF5KFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSwgRW52aXJvbm1lbnQubW9kYWxVSS5sb2FkaW5nTW9kZSgpKTtcbiAgICAgICAgcmVuZGVyU3RyaXBlUGF5bWVudE1ldGhvZChQZWFjaFBheUN1c3RvbWVyLnByZWZlcnJlZFBheW1lbnRNZXRob2QoKSwgRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJTdHJpcGVCdXR0b25Mb2FkaW5nKFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpLCBFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyU3RyaXBlQnV0dG9uRGlzcGxheShtZXRob2QsIHBhZ2UsIGxvYWRpbmdNb2RlKSB7XG4gICAgaWYgKG1ldGhvZCA9PT0gJ3N0cmlwZScgJiYgcGFnZSA9PT0gJ3BheW1lbnQnKSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4tY29udGFpbmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1jb250YWluZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1ldGhvZCA9PT0gJ3N0cmlwZScgJiYgcGFnZSA9PT0gJ3BheW1lbnQnICYmIGxvYWRpbmdNb2RlICE9PSAnbG9hZGluZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bicsICgkZWxlbWVudCk9PiRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxc0FsbCgnLnN0cmlwZS1idG4nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJTdHJpcGVCdXR0b25Mb2FkaW5nKG1ldGhvZCwgbW9kZSkge1xuICAgIGlmIChtZXRob2QgIT09ICdzdHJpcGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdmaW5pc2hlZCcpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bicsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtb2RlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1zaGlwcGluZy1zcGlubmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0bi1zaGlwcGluZy1zcGlubmVyJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtb2RlID09PSAncHJvY2Vzc2luZycpIHtcbiAgICAgICAgJHFzQWxsKCcuc3RyaXBlLWJ0biA+IC5idXR0b24tdGV4dCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGdldExvY2FsZVRleHQoJ3Byb2Nlc3NpbmcnKVxuICAgICAgICApO1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuID4gLmJ1dHRvbi10ZXh0JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuaW5uZXJIVE1MID0gYCR7Z2V0TG9jYWxlVGV4dCgncGF5Jyl9ICR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcoRGVmYXVsdENhcnQudG90YWwoKSl9YFxuICAgICAgICApO1xuICAgICAgICAkcXNBbGwoJy5zdHJpcGUtYnRuLXNwaW5uZXInLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzaG93U3RyaXBlUGF5bWVudE9wdGlvbigpIHtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBmb3IgKGNvbnN0ICRjb250YWluZXIgb2YgJHFzQWxsKCcuc3RyaXBlLWJ0bi1jb250YWluZXInKSl7XG4gICAgICAgICRjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdFN0cmlwZVBheW1lbnRNZXRob2QoKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCgnc3RyaXBlJykpO1xufVxuZnVuY3Rpb24gcmVuZGVyU3RyaXBlUGF5bWVudE1ldGhvZChtZXRob2QsIHBhZ2UpIHtcbiAgICBpZiAobWV0aG9kID09PSAnc3RyaXBlJyAmJiBwYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJyk/LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICd0cnVlJyk7XG4gICAgICAgICRxcygnI3N0cmlwZS1vcHRpb24nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2NhcmQtZWxlbWVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjc3RyaXBlLXBtJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3N0cmlwZS1wbScpPy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgJHFzKCcjc3RyaXBlLW9wdGlvbicsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRmNGY0J1xuICAgICAgICApO1xuICAgICAgICAkcXMoJyNjYXJkLWVsZW1lbnQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTdHJpcGVQYXltZW50UmVxdWVzdChtZXNzYWdlLCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpIHtcbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5TVFJJUEVfUEFZTUVOVF9SRVFVRVNUKSB8fCBFbnZpcm9ubWVudC5wbHVnaW4ucGFnZVR5cGUoKSA9PT0gJ3Byb2R1Y3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5pdE1lc3NhZ2UgPSB7XG4gICAgICAgIGV2ZW50OiAncHAtaW5pdC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0JyxcbiAgICAgICAgc3RyaXBlOiB7XG4gICAgICAgICAgICBsb2NhbGU6IG1lc3NhZ2UuYnJvd3NlckxvY2FsZSxcbiAgICAgICAgICAgIGxpdmU6ICFpc0RldkVudmlyb25tZW50KGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpKVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW5jeUNvZGU6IE1lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCksXG4gICAgICAgIGNhcnRDYWxjdWxhdGlvblJlY29yZDogc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHNcbiAgICB9O1xuICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKGluaXRNZXNzYWdlLCAnKicpO1xuICAgIG9uV2luZG93RGF0YUZldGNoKCdwcC1zdHJpcGUtcGF5bWVudC1yZXF1ZXN0LWFkZHJlc3MtY2hhbmdlJywgaGFuZGxlU3RyaXBlUGF5bWVudFJlcXVlc3RBZGRyZXNzQ2hhbmdlKTtcbiAgICBvbldpbmRvd0RhdGFGZXRjaCgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1zaGlwcGluZy1jaGFuZ2UnLCBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdFNoaXBwaW5nQ2hhbmdlKTtcbiAgICBvbldpbmRvd0RhdGFGZXRjaCgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1wcm9jZXNzLXBheW1lbnQnLCBhc3luYyAocmVxdWVzdCk9PmF3YWl0IGhhbmRsZVN0cmlwZVBheW1lbnRSZXF1ZXN0UHJvY2Vzc1BheW1lbnQocmVxdWVzdCwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKVxuICAgICk7XG4gICAgY29uc3QgcHJldmlvdXNVcGRhdGVEYXRhID0gJyc7XG4gICAgY29uc3QgdW5zdWJzY3JpYmVQYXltZW50UmVxdWVzdFVwZGF0ZXMgPSBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgY29uc3QgcGF5bWVudFJlcXVlc3REYXRhVXBkYXRlID0gZ2V0U3RyaXBlUGF5bWVudFJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHBheW1lbnRSZXF1ZXN0RGF0YVVwZGF0ZSk7XG4gICAgICAgIGlmIChwcmV2aW91c1VwZGF0ZURhdGEgIT09IHVwZGF0ZURhdGEpIHtcbiAgICAgICAgICAgIHdpbmRvdy50b3A/LnBvc3RNZXNzYWdlKHBheW1lbnRSZXF1ZXN0RGF0YVVwZGF0ZSwgJyonKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgncHAtc3RyaXBlLXBheW1lbnQtcmVxdWVzdC1zdG9wJywgdW5zdWJzY3JpYmVQYXltZW50UmVxdWVzdFVwZGF0ZXMpO1xufVxuZnVuY3Rpb24gZ2V0U3RyaXBlUGF5bWVudFJlcXVlc3RVcGRhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXZlbnQ6ICdwcC11cGRhdGUtc3RyaXBlLXBheW1lbnQtcmVxdWVzdCcsXG4gICAgICAgIGN1cnJlbmN5Q29kZTogTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSxcbiAgICAgICAgY2FydENhbGN1bGF0aW9uUmVjb3JkOiBzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1xuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdFByb2Nlc3NQYXltZW50KHJlcXVlc3QsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHN0cmlwZUN1c3RvbWVySWQgPSBhd2FpdCBzdHJpcGVTZXJ2aWNlLmNyZWF0ZVN0cmlwZUN1c3RvbWVyKHJlcXVlc3QudG9rZW4uaWQsIHtcbiAgICAgICAgbmFtZTogcmVxdWVzdC5wYXllck5hbWUsXG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWVyRW1haWwsXG4gICAgICAgIHBob25lOiByZXF1ZXN0LnBheWVyUGhvbmVcbiAgICB9KTtcbiAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lcih7XG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnBheWVyRW1haWwsXG4gICAgICAgIHBob25lOiByZXF1ZXN0LnBheWVyUGhvbmUsXG4gICAgICAgIG5hbWVfZmlyc3Q6IHJlcXVlc3QucGF5ZXJOYW1lLnNwbGl0KCcgJylbMF0gPz8gJycsXG4gICAgICAgIG5hbWVfbGFzdDogcmVxdWVzdC5wYXllck5hbWUuc3BsaXQoJyAnKVsxXSA/PyAnJyxcbiAgICAgICAgYWRkcmVzczE6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmFkZHJlc3NMaW5lWzBdLFxuICAgICAgICBhZGRyZXNzMjogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MuYWRkcmVzc0xpbmVbMV0gPz8gJycsXG4gICAgICAgIGNpdHk6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmNpdHksXG4gICAgICAgIHN0YXRlOiByZXF1ZXN0LnNoaXBwaW5nQWRkcmVzcy5yZWdpb24sXG4gICAgICAgIGNvdW50cnk6IHJlcXVlc3Quc2hpcHBpbmdBZGRyZXNzLmNvdW50cnksXG4gICAgICAgIHBvc3RhbDogcmVxdWVzdC5zaGlwcGluZ0FkZHJlc3MucG9zdGFsQ29kZSxcbiAgICAgICAgY2FyZDoge1xuICAgICAgICAgICAgYnJhbmQ6IHJlcXVlc3QudG9rZW4uY2FyZC5icmFuZCxcbiAgICAgICAgICAgIGxhc3Q0OiByZXF1ZXN0LnRva2VuLmNhcmQubGFzdDRcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaXBlX2N1c3RvbWVyX2lkOiBzdHJpcGVDdXN0b21lcklkLFxuICAgICAgICBwYXltZW50X29wdGlvbjogJ3N0cmlwZSdcbiAgICB9KSk7XG4gICAgaWYgKCFhd2FpdCB2YWxpZGF0ZUFkZHJlc3MoKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiAnaW52YWxpZF9zaGlwcGluZ19hZGRyZXNzJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIoc3RyaXBlQ3VzdG9tZXJJZCwgcmVxdWVzdC50b2tlbi5jYXJkLmJyYW5kLCByZXF1ZXN0LnRva2VuLmNhcmQubGFzdDQsICdzdHJpcGUnKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcmRlciA9IGF3YWl0IG9yZGVyU2VydmljZS5wbGFjZU9yZGVyKCk7XG4gICAgICAgIGNvbnN0IHBheW1lbnRSZXN1bHQgPSBhd2FpdCBzdHJpcGVTZXJ2aWNlLnByb2Nlc3NQYXltZW50KG9yZGVyKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgb3JkZXJTZXJ2aWNlLnNldFBheW1lbnRTdGF0dXMoUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSwgdHJ1ZSkpLm9rKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2ZhaWwnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGF5bWVudFJlc3VsdCkge1xuICAgICAgICAgICAgYXdhaXQgb3JkZXJTZXJ2aWNlLnNldE9yZGVyU3RhdHVzKG9yZGVyLCAnd2MtZmFpbGVkJywge1xuICAgICAgICAgICAgICAgIHN0cmlwZUN1c3RvbWVySWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdmYWlsJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmRlclN0YXR1c1Jlc3VsdCA9IGF3YWl0IG9yZGVyU2VydmljZS5zZXRPcmRlclN0YXR1cyhvcmRlciwgJ3djLXByb2Nlc3NpbmcnLCB7XG4gICAgICAgICAgICBzdHJpcGVDdXN0b21lcklkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIW9yZGVyU3RhdHVzUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2ZhaWwnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VVJMOiBvcmRlclN0YXR1c1Jlc3VsdFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgU3RyaXBlIHBheW1lbnQgcmVxdWVzdCBwcm9jZXNzIHBheW1lbnQgZmFpbGVkIG9uICR7TWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCl9LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiAnZmFpbCdcbiAgICAgICAgfTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdHJpcGVQYXltZW50UmVxdWVzdEFkZHJlc3NDaGFuZ2UocmVxdWVzdCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUN1c3RvbWVyKHtcbiAgICAgICAgLi4uUGVhY2hQYXlDdXN0b21lci5kYXRhKCksXG4gICAgICAgIGFkZHJlc3MxOiByZXF1ZXN0LmFkZHJlc3NMaW5lWzBdID8/ICcnLFxuICAgICAgICBhZGRyZXNzMjogcmVxdWVzdC5hZGRyZXNzTGluZVsxXSA/PyAnJyxcbiAgICAgICAgY2l0eTogcmVxdWVzdC5jaXR5ID8/ICcnLFxuICAgICAgICBwb3N0YWw6IHJlcXVlc3QucG9zdGFsQ29kZSA/PyAnJyxcbiAgICAgICAgc3RhdGU6IHJlcXVlc3QucmVnaW9uID8/ICcnLFxuICAgICAgICBjb3VudHJ5OiByZXF1ZXN0LmNvdW50cnkgPz8gJydcbiAgICB9KSk7XG4gICAgYXdhaXQgcmVxdWVzdENhcnRDYWxjdWxhdGlvbigpO1xuICAgIHJldHVybiBnZXRTdHJpcGVQYXltZW50UmVxdWVzdFVwZGF0ZSgpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3RyaXBlUGF5bWVudFJlcXVlc3RTaGlwcGluZ0NoYW5nZShyZXF1ZXN0KSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ2FydFBhY2thZ2VTaGlwcGluZ01ldGhvZCh7XG4gICAgICAgIGNhcnRLZXk6ICcwJyxcbiAgICAgICAgc2hpcHBpbmdQYWNrYWdlS2V5OiAnMCcsXG4gICAgICAgIHBhY2thZ2VNZXRob2RJZDogcmVxdWVzdC5pZFxuICAgIH0pKTtcbiAgICBhd2FpdCByZXF1ZXN0Q2FydENhbGN1bGF0aW9uKCk7XG4gICAgcmV0dXJuIGdldFN0cmlwZVBheW1lbnRSZXF1ZXN0VXBkYXRlKCk7XG59XG5hc3luYyBmdW5jdGlvbiBpbml0U3RyaXBlU3VwcG9ydChtZXNzYWdlMSwgb3JkZXJTZXJ2aWNlKSB7XG4gICAgY29uc3QgY29ubmVjdGVkU3RyaXBlQWNjb3VudCA9IG1lc3NhZ2UxLnBocERhdGEuY29ubmVjdGVkX3N0cmlwZV9hY2NvdW50O1xuICAgIGNvbnN0IGlzRGV2TW9kZSA9IGlzRGV2RW52aXJvbm1lbnQoZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkpO1xuICAgIGlmIChncmVhdGVyVGhhbihFbnZpcm9ubWVudC5wbHVnaW4udmVyc2lvbigpLCAnMS41Ny4xJykgJiYgIWNvbm5lY3RlZFN0cmlwZUFjY291bnQgJiYgIUVudmlyb25tZW50LnRlc3RNb2RlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIUZlYXR1cmUuZW5hYmxlZChGZWF0dXJlRmxhZy5TVFJJUEUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gaXNEZXZNb2RlID8gJ3BrX3Rlc3RfQ25MMmtBNTJWNWRScVpiamxKMHNaMmdyMDB1QnJPRW1RUScgOiAncGtfbGl2ZV9vUk9uSVFEdWV4SFpwbkVPY1VmZjNDUnowMGFzYU9PQ0FMJztcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbG9jYWxlOiBtZXNzYWdlMT8uYnJvd3NlckxvY2FsZSA/PyAnYXV0bydcbiAgICB9O1xuICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSAhPT0gJ3dvby5wZWFjaHBheS5hcHAnICYmIE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpICE9PSAnc2hvcC5wZWFjaHBheS5hcHAnKSB7XG4gICAgICAgIGNvbnN0IHN0cmlwZUFjY291bnQgPSBhd2FpdCBmZXRjaFN0cmlwZUFjY291bnQoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCkpO1xuICAgICAgICBpZiAoc3RyaXBlQWNjb3VudCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RyaXBlRm9yQ2hlY2tpbmdQYXltZW50SW50ZW50ID0gU3RyaXBlKGtleSwgb3B0aW9ucyk7XG4gICAgY29uc3Qgc3RyaXBlID0gU3RyaXBlKGtleSwge1xuICAgICAgICBsb2NhbGU6IG1lc3NhZ2UxLmJyb3dzZXJMb2NhbGUgPz8gJ2F1dG8nXG4gICAgfSk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBzdHJpcGUuZWxlbWVudHMoKTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgICAgY29sb3I6ICcjMzMzJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXG4gICAgICAgICAgICBmb250U21vb3RoaW5nOiAnYW50aWFsaWFzZWQnLFxuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgICc6OnBsYWNlaG9sZGVyJzoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgICAgY29sb3I6ICcjZmE3NTVhJyxcbiAgICAgICAgICAgIGljb25Db2xvcjogJyNmYTc1NWEnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0ICRjYXJkID0gZWxlbWVudHMuY3JlYXRlKCdjYXJkJywge1xuICAgICAgICBzdHlsZSxcbiAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICB9KTtcbiAgICAkY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICRjYXJkLm9uKCdjaGFuZ2UnLCAoZXZlbnQpPT57XG4gICAgICAgICRxcygnI2NhcmQtZXJyb3JzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBldmVudC5lcnJvcj8ubWVzc2FnZSA/PyAnJ1xuICAgICAgICApO1xuICAgIH0pO1xuICAgIGNvbnN0IHN0cmlwZVNlcnZpY2UgPSB7XG4gICAgICAgICRjYXJkLFxuICAgICAgICBlbGVtZW50cyxcbiAgICAgICAgc3RyaXBlLFxuICAgICAgICBzdHJpcGVGb3JQYXltZW50SW50ZW50OiBzdHJpcGVGb3JDaGVja2luZ1BheW1lbnRJbnRlbnQsXG4gICAgICAgIGNyZWF0ZVN0cmlwZUN1c3RvbWVyOiBhZGRDYXJkVG9TdHJpcGVDdXN0b21lcixcbiAgICAgICAgcHJvY2Vzc1BheW1lbnQ6IGFzeW5jIChvcmRlcik9PmF3YWl0IGhhbmRsZVN0cmlwZVBheW1lbnQob3JkZXIpXG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVJbmplY3RlZFByb2Nlc3NQYXltZW50ID0gYXN5bmMgKGV2ZW50KT0+e1xuICAgICAgICBpZiAoIWNoZWNrUmVxdWlyZWRGaWVsZHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGhhbmRsZVByb2Nlc3NQYXltZW50KGV2ZW50LCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpO1xuICAgIH07XG4gICAgaW5pdFN0cmlwZUJ1dHRvbigpO1xuICAgIGluaXRTdHJpcGVQYXltZW50UmVxdWVzdChtZXNzYWdlMSwgc3RyaXBlU2VydmljZSwgb3JkZXJTZXJ2aWNlKTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJzNEUy1hdXRoZW50aWNhdGlvbi1jb21wbGV0ZScsIGFzeW5jIChtZXNzYWdlKT0+YXdhaXQgb24zRFNDb21wbGV0ZShtZXNzYWdlLnBheW1lbnRJbnRlbnRDbGllbnRTZWNyZXQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSlcbiAgICApO1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3VibWl0UGF5bWVudCcsIGFzeW5jIChtZXNzYWdlKT0+e1xuICAgICAgICBHTE9CQUwuY29tcGxldGVkT3JkZXIgPSBtZXNzYWdlLm9yZGVyO1xuICAgICAgICBhd2FpdCBsZWdhY3lIYW5kbGVTdHJpcGVQYXltZW50KG1lc3NhZ2Uub3JkZXIsIG9yZGVyU2VydmljZSk7XG4gICAgfSk7XG4gICAgJHFzKCcjcHAtcGF5Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSW5qZWN0ZWRQcm9jZXNzUGF5bWVudCk7XG4gICAgJHFzKCcjcHAtcGF5LW1vYmlsZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUluamVjdGVkUHJvY2Vzc1BheW1lbnQpO1xuICAgICRxcygnI3BwLXBheS1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUluamVjdGVkUHJvY2Vzc1BheW1lbnQpO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUHJvY2Vzc1BheW1lbnQoZXZlbnQsIHN0cmlwZVNlcnZpY2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHsgJGNhcmQgLCBzdHJpcGUgIH0gPSBzdHJpcGVTZXJ2aWNlO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbFByb2Nlc3NpbmcoKSk7XG4gICAgaWYgKCFFbnZpcm9ubWVudC5jdXN0b21lci5leGlzdGluZygpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdHJpcGUuY3JlYXRlVG9rZW4oJGNhcmQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVRva2VuRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVDdXN0b21lclN0cmlwZUlkKGF3YWl0IGFkZENhcmRUb1N0cmlwZUN1c3RvbWVyKHJlc3VsdC50b2tlbi5pZCwgUGVhY2hQYXlDdXN0b21lci5zdHJpcGVEZXRhaWxzKCkpKSk7XG4gICAgICAgICAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIoUGVhY2hQYXlDdXN0b21lci5zdHJpcGVJZCgpLCByZXN1bHQudG9rZW4uY2FyZC5icmFuZCwgcmVzdWx0LnRva2VuLmNhcmQubGFzdDQsICdzdHJpcGUnKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZVNlbnRyeUV4Y2VwdGlvbihuZXcgRXJyb3IoYEZhaWxlZCB0b2tlbml6aW5nIG9yIGNyZWF0aW5nIGEgbmV3IHN0cmlwZSBjdXN0b21lciBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfSBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHN0b3BNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQucGxhY2VPcmRlcigpO1xufVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hTdHJpcGVBY2NvdW50KGRvbWFpbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyBgYXBpL3YxL21lcmNoYW50cy8ke2RvbWFpbn0vc3RyaXBlLWFjY291bnRgKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xufVxuZnVuY3Rpb24gaGFuZGxlVG9rZW5FcnJvcihlcnJvcikge1xuICAgICRxcygnI2NhcmQtZXJyb3JzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlXG4gICAgKTtcbiAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gb24zRFNDb21wbGV0ZShwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0LCBzdHJpcGVTZXJ2aWNlLCBvcmRlclNlcnZpY2UpIHtcbiAgICBjb25zdCB7IHN0cmlwZUZvclBheW1lbnRJbnRlbnQgLCBzdHJpcGUgIH0gPSBzdHJpcGVTZXJ2aWNlO1xuICAgICRxcygnI3N0cmlwZS0zRFMtbW9kYWwnKT8ucmVtb3ZlKCk7XG4gICAgY29uc3QgZ2V0UGF5bWVudEludGVudCA9IGFzeW5jICgpPT57XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICBjb25zdCBpc091clN0b3JlID0gZG9tYWluID09PSAnd29vLnBlYWNocGF5LmFwcCcgfHwgZG9tYWluID09PSAnc2hvcC5wZWFjaHBheS5hcHAnIHx8IGRvbWFpbiA9PT0gJ2xvY2FsaG9zdCcgfHwgZG9tYWluID09PSAnd29vLnN0b3JlLmxvY2FsJyB8fCBkb21haW4gPT09ICdzdG9yZS5sb2NhbCc7XG4gICAgICAgIGlmIChpc091clN0b3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgc3RyaXBlLnJldHJpZXZlUGF5bWVudEludGVudChwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBzdHJpcGVGb3JQYXltZW50SW50ZW50LnJldHJpZXZlUGF5bWVudEludGVudChwYXltZW50SW50ZW50Q2xpZW50U2VjcmV0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0UGF5bWVudEludGVudCgpO1xuICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnBheW1lbnRJbnRlbnQuc3RhdHVzID09PSAncmVxdWlyZXNfcGF5bWVudF9tZXRob2QnKSB7XG4gICAgICAgIGhhbmRsZTNEU0Vycm9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5wYXltZW50SW50ZW50LnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgJiYgR0xPQkFMLmNvbXBsZXRlZE9yZGVyKSB7XG4gICAgICAgIGNvbnN0IHBheW1lbnRTdGF0dXMgPSBhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKTtcbiAgICAgICAgaWYgKCFwYXltZW50U3RhdHVzLm9rKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwYXltZW50U3RhdHVzLmpzb24oKTtcbiAgICAgICAgb3JkZXJTZXJ2aWNlLmRlcHJlY2F0ZWQuc2V0T3JkZXJTdGF0dXMoR0xPQkFMLmNvbXBsZXRlZE9yZGVyLCB7XG4gICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgIHBheW1lbnRUeXBlOiAnU3RyaXBlJyxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSUQ6IHJlc3BvbnNlLmNoYXJnZUlkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGFkZENhcmRUb1N0cmlwZUN1c3RvbWVyKHRva2VuSUQsIGN1c3RvbWVyKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgJ2N1c3RvbWVyX2lkJzogbnVsbCxcbiAgICAgICAgJ2NhcmRfdG9rZW4nOiB0b2tlbklELFxuICAgICAgICAnbmFtZSc6IGN1c3RvbWVyLm5hbWUsXG4gICAgICAgICdlbWFpbCc6IGN1c3RvbWVyLmVtYWlsLFxuICAgICAgICAncGhvbmUnOiBjdXN0b21lci5waG9uZVxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnY2FyZCcsIG9wdGlvbnMpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgcGVhY2hwYXlBbGVydChkYXRhKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIFN0cmlwZSBDdXN0b21lciBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfS4gRXJyb3I6ICR7ZGF0YX1gKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YS5jdXN0b21lcjtcbn1cbmZ1bmN0aW9uIHNob3czRFNlY3VyZU1vZGFsKHVybCkge1xuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5pZCA9ICdzdHJpcGUtM0RTLW1vZGFsJztcbiAgICBpZnJhbWUuY2xhc3NMaXN0LmFkZCgnc3RyaXBlLTNkcy1mcmFtZScpO1xuICAgIGlmcmFtZS5zcmMgPSB1cmw7XG4gICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5hcHBlbmQoaWZyYW1lKTtcbiAgICBzaG93TG9hZGluZ1NjcmVlbigpO1xuICAgIGhpZGVPdGhlclNjcm9sbEJhcnMoKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZTNEU0Vycm9yKCkge1xuICAgIGhpZGVMb2FkaW5nU2NyZWVuKCk7XG4gICAgc2hvd090aGVyU2Nyb2xsQmFycygpO1xuICAgIHBlYWNocGF5QWxlcnQoZ2V0TG9jYWxlVGV4dCgnc29tZXRoaW5nLXdlbnQtd3JvbmcnKSk7XG4gICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN0cmlwZVBheW1lbnQob3JkZXIpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgIHN0cmlwZUN1c3RvbWVySUQ6IFBlYWNoUGF5Q3VzdG9tZXIuc3RyaXBlSWQoKSxcbiAgICAgICAgb3JkZXIsXG4gICAgICAgIHJldHVyblVSTDogYCR7R0xPQkFMLnBocERhdGE/LnBsdWdpbl9hc3NldF91cmwgPz8gJyd9L3B1YmxpYy9kaXN0LyR7R0xPQkFMLnBocERhdGE/LnZlcnNpb24gPz8gJyd9L2NoZWNrb3V0LW1vZGFsLzNkcy5odG1sYFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnYXBpL3YxL3Nlc3Npb24vcGF5Jywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiByZXN1bHQuc3RhdHVzID09PSAnc3VjY2Vzcyc7XG59XG5hc3luYyBmdW5jdGlvbiBsZWdhY3lIYW5kbGVTdHJpcGVQYXltZW50KG9yZGVyLCBvcmRlclNlcnZpY2UpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgIHN0cmlwZUN1c3RvbWVySUQ6IFBlYWNoUGF5Q3VzdG9tZXIuc3RyaXBlSWQoKSxcbiAgICAgICAgb3JkZXIsXG4gICAgICAgIHJldHVyblVSTDogYCR7R0xPQkFMLnBocERhdGE/LnBsdWdpbl9hc3NldF91cmwgPz8gJyd9L3B1YmxpYy9kaXN0LyR7R0xPQkFMLnBocERhdGE/LnZlcnNpb24gPz8gJyd9L2NoZWNrb3V0LW1vZGFsLzNkcy5odG1sYFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0QmFzZVVSTChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSwgRW52aXJvbm1lbnQudGVzdE1vZGUoKSkgKyAnYXBpL3YxL3Nlc3Npb24vcGF5Jywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHN3aXRjaChyZXN1bHQuc3RhdHVzKXtcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICBpZiAoIShhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKSkub2spIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9yZGVyU2VydmljZS5kZXByZWNhdGVkLnNldE9yZGVyU3RhdHVzKG9yZGVyLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnd2MtcHJvY2Vzc2luZycsXG4gICAgICAgICAgICAgICAgcGF5bWVudFR5cGU6ICdTdHJpcGUnLFxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uSUQ6IHJlc3VsdC5jaGFyZ2VJZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVxdWlyZXNfYWN0aW9uJzpcbiAgICAgICAgICAgIHNob3czRFNlY3VyZU1vZGFsKHJlc3VsdD8udXJsID8/ICcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYWlsdXJlJzpcbiAgICAgICAgICAgIG9yZGVyU2VydmljZS5kZXByZWNhdGVkLnNldE9yZGVyU3RhdHVzKG9yZGVyLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnd2MtZmFpbGVkJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXN1bHQubWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICAgICAgcGVhY2hwYXlBbGVydChyZXN1bHQ/Lm1lc3NhZ2UgPz8gJycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgfVxufVxuZnVuY3Rpb24gaGlkZU90aGVyU2Nyb2xsQmFycygpIHtcbiAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50JywgKCRlbGVtZW50KT0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gc2hvd090aGVyU2Nyb2xsQmFycygpIHtcbiAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50JywgKCRlbGVtZW50KT0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGlkZUxvYWRpbmdTY3JlZW4oKSB7XG4gICAgJHFzKCcjbG9hZGluZycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgJHFzKCcjbG9hZGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdmbGV4LWNvbnRhaW5lcicpO1xufVxuZnVuY3Rpb24gc2hvd0xvYWRpbmdTY3JlZW4oKSB7XG4gICAgJHFzKCcjbG9hZGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjbG9hZGluZycpPy5jbGFzc0xpc3QuYWRkKCdmbGV4LWNvbnRhaW5lcicpO1xufVxubGV0IHBheXBhbE1lcmNoYW50SUQgPSBudWxsO1xuY29uc3QgQk5fQ09ERV9TQU5EQk9YID0gJ0ZMQVZPUnNiLTZqb3B2NjU0MDI3NV9NUCc7XG5jb25zdCBCTl9DT0RFX1BST0RVQ1RJT04gPSAnUGVhY2hfU1BfUFBDUCc7XG5mdW5jdGlvbiBpbml0UGF5UGFsRXZlbnRzKCkge1xuICAgICRxcygnI3BheXBhbC1vcHRpb24nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXlwYWxQYXltZW50T3B0aW9uKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyUGF5UGFsQnV0dG9uKFBlYWNoUGF5Q3VzdG9tZXIucHJlZmVycmVkUGF5bWVudE1ldGhvZCgpID09PSAncGF5cGFsJyAmJiBFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSA9PT0gJ3BheW1lbnQnKTtcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHBheXBhbExvYWRTY3JpcHRzKHNjcmlwdFVSTHMpIHtcbiAgICBmdW5jdGlvbiBsb2FkKHNjcmlwdFVSTCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF8pPT57XG4gICAgICAgICAgICBpZiAocGF5cGFsTG9hZFNjcmlwdHMubG9hZGVkLmhhcyhzY3JpcHRVUkwpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBzY3JpcHRVUkw7XG4gICAgICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuZGF0YVBhcnRuZXJBdHRyaWJ1dGlvbklkID0gaXNEZXZFbnZpcm9ubWVudChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSkgPyBCTl9DT0RFX1NBTkRCT1ggOiBCTl9DT0RFX1BST0RVQ1RJT047XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoc2NyaXB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgZm9yIChjb25zdCBzY3JpcHRVUkwyIG9mIHNjcmlwdFVSTHMpe1xuICAgICAgICBwcm9taXNlcy5wdXNoKGxvYWQoc2NyaXB0VVJMMikpO1xuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgZm9yIChjb25zdCBzY3JpcHRVUkwxIG9mIHNjcmlwdFVSTHMpe1xuICAgICAgICBwYXlwYWxMb2FkU2NyaXB0cy5sb2FkZWQuYWRkKHNjcmlwdFVSTDEpO1xuICAgIH1cbn1cbnBheXBhbExvYWRTY3JpcHRzLmxvYWRlZCA9IG5ldyBTZXQoKTtcbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYXlQYWxTY3JpcHQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArIGBhcGkvdjEvcGF5cGFsL21lcmNoYW50QW5kQ2xpZW50P21lcmNoYW50SG9zdG5hbWU9JHtNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKX1gLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWVyY2hhbnQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChtZXJjaGFudC5wYXlwYWxNZXJjaGFudElEICE9PSAnJykge1xuICAgICAgICAgICAgcGF5cGFsTWVyY2hhbnRJRCA9IG1lcmNoYW50LnBheXBhbE1lcmNoYW50SUQ7XG4gICAgICAgICAgICBhd2FpdCBwYXlwYWxMb2FkU2NyaXB0cyhbXG4gICAgICAgICAgICAgICAgYGh0dHBzOi8vd3d3LnBheXBhbC5jb20vc2RrL2pzPyZjbGllbnQtaWQ9JHttZXJjaGFudC5jbGllbnRJRH0mbWVyY2hhbnQtaWQ9JHttZXJjaGFudC5wYXlwYWxNZXJjaGFudElEfSZkaXNhYmxlLWZ1bmRpbmc9cGF5bGF0ZXIsY2FyZCxiYW5jb250YWN0LGJsaWssZXBzLGdpcm9wYXksaWRlYWwsbXliYW5rLHAyNCxzb2ZvcnQsbWVyY2Fkb3BhZ28sc2VwYSx2ZW5tbyZjdXJyZW5jeT0ke01lcmNoYW50Q29uZmlndXJhdGlvbi5jdXJyZW5jeS5jb2RlKCl9YCwgXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgRmFpbGVkIHRvIHJldHJpZXZlIHBheXBhbCBtZXJjaGFudCBJZCBvciBsb2FkIFBheXBhbCBTY3JpcHRzIG9uICR7bG9jYXRpb24uaG9zdG5hbWV9LiBQbHVnaW4gTW9kZTogJHtFbnZpcm9ubWVudC5wbHVnaW4ubW9kZSgpfS4gRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGluaXRQYXlQYWxTdXBwb3J0KG1lc3NhZ2UsIG9yZGVyU2VydmljZSkge1xuICAgIGNvbnN0IHBheXBhbENoZWNrZWQgPSBtZXNzYWdlLnBocERhdGEucGF5cGFsO1xuICAgIGlmICghcGF5cGFsQ2hlY2tlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYXdhaXQgbG9hZFBheVBhbFNjcmlwdCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5pdFBheVBhbEV2ZW50cygpO1xuICAgIGlmIChwYXlwYWxNZXJjaGFudElEICYmIE51bWJlci5wYXJzZUludChwYXlwYWxDaGVja2VkID8/ICcwJykpIHtcbiAgICAgICAgYXdhaXQgaW5pdFBheVBhbEJ1dHRvbihvcmRlclNlcnZpY2UpO1xuICAgICAgICBzaG93UGF5UGFsQnV0dG9uKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdFBheVBhbEJ1dHRvbihvcmRlclNlcnZpY2UpIHtcbiAgICBjb25zdCAkcGF5cGFsQnV0dG9uID0gcGF5cGFsLkJ1dHRvbnMoe1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiA1NVxuICAgICAgICB9LFxuICAgICAgICBhc3luYyBjcmVhdGVPcmRlciAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgY3JlYXRlUGF5UGFsT3JkZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcHByb3ZlIChkYXRhLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICBzaG93UGF5UGFsTG9hZGluZ1NwaW5uZXIoKTtcbiAgICAgICAgICAgIHBsYWNlT3JkZXJPblN0b3JlQW5kTGlzdGVuRm9yQ29tcGxldGlvbihkYXRhLCBhY3Rpb25zLCBvcmRlclNlcnZpY2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja1JlcXVpcmVkRmllbGRzKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkcGF5cGFsQnV0dG9uLnJlbmRlcignI3BheXBhbC1idXR0b24tY29udGFpbmVyJyk7XG4gICAgJHBheXBhbEJ1dHRvbi5yZW5kZXIoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnKTtcbiAgICAkcGF5cGFsQnV0dG9uLnJlbmRlcignI3BheXBhbC1idXR0b24tY29udGFpbmVyLWV4aXN0aW5nJyk7XG59XG5mdW5jdGlvbiByZXN0YXJ0QWN0aW9uKGFjdGlvbnMpIHtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpPT57XG4gICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSAncGF5cGFsUmVzdGFydCcpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucmVzdGFydCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVQYXlQYWxPcmRlcigpIHtcbiAgICBjb25zdCBtb2NrT3JkZXJSZXN1bHQgPSB7XG4gICAgICAgIGRvbWFpbjogTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksXG4gICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgIG51bWJlcjogJycsXG4gICAgICAgICAgICBjdXJyZW5jeTogTWVyY2hhbnRDb25maWd1cmF0aW9uLmN1cnJlbmN5LmNvZGUoKSxcbiAgICAgICAgICAgIGRpc2NvdW50X3RvdGFsOiBEZWZhdWx0Q2FydC50b3RhbEFwcGxpZWRDb3Vwb25zKCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX3RvdGFsOiBEZWZhdWx0Q2FydC50b3RhbFNoaXBwaW5nKCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHRvdGFsOiBEZWZhdWx0Q2FydC50b3RhbCgpLnRvRml4ZWQoMiksXG4gICAgICAgICAgICB0b3RhbF90YXg6IEdMT0JBTC5waHBEYXRhPy53Y19wcmljZXNfaW5jbHVkZV90YXggPyAnMC4wMCcgOiBEZWZhdWx0Q2FydC50b3RhbFRheCgpLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBzaGlwcGluZzogcGF5cGFsQ3VzdG9tZXJBZGRyZXNzKCksXG4gICAgICAgICAgICBsaW5lX2l0ZW1zOiBnZXRMaW5lSXRlbXMoKSxcbiAgICAgICAgICAgIHNoaXBwaW5nX2xpbmVzOiBnZXRTaGlwcGluZ0xpbmVzKCksXG4gICAgICAgICAgICBmZWVfdG90YWw6IERlZmF1bHRDYXJ0LnRvdGFsQXBwbGllZEZlZXMoKS50b0ZpeGVkKDIpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgIG9yZGVyUmVzdWx0OiBtb2NrT3JkZXJSZXN1bHQsXG4gICAgICAgIHNlc3Npb25JRDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSxcbiAgICAgICAgcGF5cGFsTWVyY2hhbnRJRFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL29yZGVyJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gcmVzdWx0LmlkO1xufVxuZnVuY3Rpb24gcGF5cGFsQ3VzdG9tZXJBZGRyZXNzKCkge1xuICAgIGNvbnN0IHsgZmlyc3ROYW1lICwgbGFzdE5hbWUgLCBhZGRyZXNzMSAsIGFkZHJlc3MyICwgY2l0eSAsIHN0YXRlICwgcG9zdGFsICwgY291bnRyeSAsIHBob25lICwgZW1haWwgIH0gPSBQZWFjaFBheUN1c3RvbWVyO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSgpLFxuICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lKCksXG4gICAgICAgIGNvbXBhbnk6ICcnLFxuICAgICAgICBhZGRyZXNzXzE6IGFkZHJlc3MxKCksXG4gICAgICAgIGFkZHJlc3NfMjogYWRkcmVzczIoKSxcbiAgICAgICAgY2l0eTogY2l0eSgpLFxuICAgICAgICBzdGF0ZTogc3RhdGUoKSxcbiAgICAgICAgcG9zdGNvZGU6IHBvc3RhbCgpLFxuICAgICAgICBjb3VudHJ5OiBjb3VudHJ5KCksXG4gICAgICAgIHBob25lOiBwaG9uZSgpLFxuICAgICAgICBlbWFpbDogZW1haWwoKVxuICAgIH07XG59XG5mdW5jdGlvbiBnZXRMaW5lSXRlbXMoKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgRGVmYXVsdENhcnQuY29udGVudHMoKSl7XG4gICAgICAgIGNvbnN0IGxpbmVJdGVtID0ge1xuICAgICAgICAgICAgJ2lkJzogaXRlbS5wcm9kdWN0X2lkLFxuICAgICAgICAgICAgJ25hbWUnOiBpdGVtLm5hbWVfd2l0aF92YXJpYXRpb24gfHwgaXRlbS5uYW1lICsgKGl0ZW0udmFyaWF0aW9uX3RpdGxlID8gYCAtICR7aXRlbS52YXJpYXRpb25fdGl0bGV9YCA6ICcnKSxcbiAgICAgICAgICAgICdxdWFudGl0eSc6IFN0cmluZyhpdGVtLnF1YW50aXR5KSxcbiAgICAgICAgICAgICdzdWJ0b3RhbCc6IFN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChpdGVtLnRvdGFsKSAqIE51bWJlci5wYXJzZUludChpdGVtLnF1YW50aXR5KSksXG4gICAgICAgICAgICAnc3VidG90YWxfdGF4JzogJzAuMDAnXG4gICAgICAgIH07XG4gICAgICAgIGlmIChHTE9CQUwucGhwRGF0YT8ud2NfcHJpY2VzX2luY2x1ZGVfdGF4ICYmIGl0ZW0uZGlzcGxheV9wcmljZSkge1xuICAgICAgICAgICAgbGluZUl0ZW0uc3VidG90YWwgPSBTdHJpbmcoTnVtYmVyLnBhcnNlRmxvYXQoaXRlbS5kaXNwbGF5X3ByaWNlKSAqIE51bWJlci5wYXJzZUludChpdGVtLnF1YW50aXR5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbXMucHVzaChsaW5lSXRlbSk7XG4gICAgfVxuICAgIGlmICghR0xPQkFMLnBocERhdGE/LndjX3ByaWNlc19pbmNsdWRlX3RheCkge1xuICAgICAgICBpdGVtc1swXS5zdWJ0b3RhbF90YXggPSBTdHJpbmcoRGVmYXVsdENhcnQudG90YWxUYXgoKSk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbn1cbmZ1bmN0aW9uIGdldFNoaXBwaW5nTGluZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgMDogKCgpPT57XG4gICAgICAgICAgICBjb25zdCBzaGlwcGluZ0RldGFpbHMgPSBEZWZhdWx0Q2FydC5zZWxlY3RlZFNoaXBwaW5nTWV0aG9kRGV0YWlscygnMCcpO1xuICAgICAgICAgICAgaWYgKCFzaGlwcGluZ0RldGFpbHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtZXRob2RfaWQ6IHNoaXBwaW5nRGV0YWlscy5zZWxlY3RlZF9tZXRob2QsXG4gICAgICAgICAgICAgICAgdG90YWw6IFN0cmluZyhEZWZhdWx0Q2FydC50b3RhbFNoaXBwaW5nKCkpLFxuICAgICAgICAgICAgICAgIG1ldGhvZF90aXRsZTogc2hpcHBpbmdEZXRhaWxzLm1ldGhvZHNbc2hpcHBpbmdEZXRhaWxzLnNlbGVjdGVkX21ldGhvZF0/LnRpdGxlID8/ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihzaG93ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNwaW5uZXJzID0gW1xuICAgICAgICAnI3BheXBhbC1zcGlubmVyJyxcbiAgICAgICAgJyNwYXlwYWwtc3Bpbm5lci1tb2JpbGUnLFxuICAgICAgICAnI3BheXBhbC1zcGlubmVyLWV4aXN0aW5nJywgXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IHNwaW5uZXIgb2Ygc3Bpbm5lcnMpe1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgJHFzKHNwaW5uZXIpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoc3Bpbm5lcik/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYXlwYWxCdXR0b25Db250YWluZXJzID0gW1xuICAgICAgICAnI3BheXBhbC1idXR0b24tY29udGFpbmVyJyxcbiAgICAgICAgJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnLFxuICAgICAgICAnI3BheXBhbC1idXR0b24tY29udGFpbmVyLWV4aXN0aW5nJywgXG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBwYXlwYWxCdXR0b25Db250YWluZXJzKXtcbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgICRxcyhjb250YWluZXIpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcXMoY29udGFpbmVyKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxufVxubGV0IGxhdGVzdE9yZGVyQXR0ZW1wdCA9IDA7XG5mdW5jdGlvbiBwbGFjZU9yZGVyT25TdG9yZUFuZExpc3RlbkZvckNvbXBsZXRpb24oZGF0YSwgYWN0aW9ucywgb3JkZXJTZXJ2aWNlKSB7XG4gICAgbGF0ZXN0T3JkZXJBdHRlbXB0Kys7XG4gICAgY29uc3Qgb3JkZXJBdHRlbXB0ID0gbGF0ZXN0T3JkZXJBdHRlbXB0O1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3VibWl0UGF5cGFsT3JkZXInLCBhc3luYyAobWVzc2FnZSk9PntcbiAgICAgICAgaWYgKGxhdGVzdE9yZGVyQXR0ZW1wdCAhPT0gb3JkZXJBdHRlbXB0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVBheVBhbE9yZGVyV2l0aEZpbmFsQW1vdW50KGRhdGEub3JkZXJJRCwgbWVzc2FnZS5vcmRlcik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcignRXJyb3Igd2hpbGUgdXBkYXRpbmcgUGF5UGFsIG9yZGVyIHdpdGggZmluYWwgYW1vdW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhcHR1cmUgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2FwdHVyZSA9IGF3YWl0IGNhcHR1cmVQYXlQYWxPcmRlcihkYXRhLm9yZGVySUQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICAgIGNhcHR1cmVTZW50cnlFeGNlcHRpb24obmV3IEVycm9yKCdFcnJvciB3aGlsZSBjYXB0dXJpbmcgUGF5UGFsIG9yZGVyOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IxKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXB0dXJlPy5zdGF0dXMgPT09ICdDT01QTEVURUQnKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21lciA9IGF3YWl0IGdldEN1c3RvbWVyKCk7XG4gICAgICAgICAgICBpZiAoY3VzdG9tZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzYXZlQ3VzdG9tZXJUb0Jyb3dzZXIobnVsbCwgbnVsbCwgbnVsbCwgJ3BheXBhbCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpcGVDdXN0b21lcklEID0gY3VzdG9tZXIuc3RyaXBlX2N1c3RvbWVyX2lkID8gY3VzdG9tZXIuc3RyaXBlX2N1c3RvbWVyX2lkIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkQnJhbmQgPSBjdXN0b21lci5jYXJkPy5icmFuZCA/PyBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRMYXN0NCA9IGN1c3RvbWVyLmNhcmQ/Lmxhc3Q0ID8/IG51bGw7XG4gICAgICAgICAgICAgICAgc2F2ZUN1c3RvbWVyVG9Ccm93c2VyKHN0cmlwZUN1c3RvbWVySUQsIGNhcmRCcmFuZCwgY2FyZExhc3Q0LCAncGF5cGFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShhd2FpdCBvcmRlclNlcnZpY2Uuc2V0UGF5bWVudFN0YXR1cyhQZWFjaFBheU9yZGVyLnNlc3Npb25JZCgpLCB0cnVlKSkub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbklEID0gY2FwdHVyZS5wdXJjaGFzZV91bml0c1swXS5wYXltZW50cy5jYXB0dXJlc1swXS5pZDtcbiAgICAgICAgICAgIG9yZGVyU2VydmljZS5kZXByZWNhdGVkLnNldE9yZGVyU3RhdHVzKG1lc3NhZ2Uub3JkZXIsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd3Yy1wcm9jZXNzaW5nJyxcbiAgICAgICAgICAgICAgICBwYXltZW50VHlwZTogJ1BheVBhbCcsXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JRFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FwdHVyZT8uZGV0YWlsc1swXS5pc3N1ZSA9PT0gJ0lOU1RSVU1FTlRfREVDTElORUQnKSB7XG4gICAgICAgICAgICBzaG93UGF5UGFsTG9hZGluZ1NwaW5uZXIoZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdwYXlwYWxBbGVydCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogY2FwdHVyZS5kZXRhaWxzWzBdLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgICAgcmVzdGFydEFjdGlvbihhY3Rpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dQYXlQYWxMb2FkaW5nU3Bpbm5lcihmYWxzZSk7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3BheXBhbEFsZXJ0JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJ1xuICAgICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgICAgIHJlc3RhcnRBY3Rpb24oYWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvcmRlclNlcnZpY2UuZGVwcmVjYXRlZC5wbGFjZU9yZGVyKHtcbiAgICAgICAgaXNQYXlwYWw6IHRydWVcbiAgICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVQYXlQYWxPcmRlcihvcmRlcklEKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL2NhcHR1cmUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG9yZGVySUQsXG4gICAgICAgICAgICBzZXNzaW9uSUQ6IFBlYWNoUGF5T3JkZXIuc2Vzc2lvbklkKCksXG4gICAgICAgICAgICBwYXlwYWxNZXJjaGFudElEXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBheVBhbE9yZGVyV2l0aEZpbmFsQW1vdW50KHBheXBhbE9yZGVySUQsIG9yZGVyUmVzdWx0KSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdhcGkvdjEvcGF5cGFsL29yZGVyL3VwZGF0ZScsIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNlc3Npb25JRDogUGVhY2hQYXlPcmRlci5zZXNzaW9uSWQoKSxcbiAgICAgICAgICAgIHBheXBhbE1lcmNoYW50SUQsXG4gICAgICAgICAgICBwYXlwYWxPcmRlcklELFxuICAgICAgICAgICAgb3JkZXJSZXN1bHRcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuZnVuY3Rpb24gc2hvd1BheVBhbEJ1dHRvbigpIHtcbiAgICAkcXMoJyNzaGlwcGluZy1vcHRpb25zLWNvbnRhaW5lcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdtdC1wYXltZW50Jyk7XG4gICAgJHFzKCcjcHAtc2hpcHBpbmctb3B0aW9ucycsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcwLjVyZW0nXG4gICAgKTtcbiAgICAkcXMoJy5mb3JtLXJvdycpPy5jbGFzc0xpc3QucmVtb3ZlKCdtYi1wYXltZW50Jyk7XG4gICAgJHFzKCcjcGF5bWVudC1tZXRob2RzJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gJzFyZW0nXG4gICAgKTtcbiAgICAkcXMoJyNzdHJpcGUtb3B0aW9uJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3BheXBhbC1kaXNhYmxlZCcpO1xuICAgICRxcygnI3N0cmlwZS1vcHRpb24nKT8uY2xhc3NMaXN0LmFkZCgncG0tb3B0aW9uLWJsb2NrJyk7XG4gICAgJHFzKCcjY2MtcmVndWxhcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjc3RyaXBlLWJveCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjcGF5cGFsLW9wdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgJHFzKCcjcHAtcGF5LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdwYXlwYWwtZGlzYWJsZWQtYnRuJyk7XG4gICAgJHFzKCcjcHAtcGF5LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdwcC1wYXktbXQnKTtcbn1cbmZ1bmN0aW9uIHBheXBhbFBheW1lbnRPcHRpb24oKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlUHJlZmVycmVkUGF5bWVudE1ldGhvZCgncGF5cGFsJykpO1xufVxuZnVuY3Rpb24gcmVuZGVyUGF5UGFsQnV0dG9uKGRpc3BsYXkpIHtcbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nKT8uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLW9wdGlvbicsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BheXBhbC1wbScsICgkZWxlbWVudCk9PiRlbGVtZW50LmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNwYXlwYWwtcG0nKT8ucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgICRxcygnI3BheXBhbC1vcHRpb24nLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0ZjRmNCdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcGF5cGFsLWJ1dHRvbi1jb250YWluZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXlwYWwtYnV0dG9uLWNvbnRhaW5lci1tb2JpbGUnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTdW1tYXJ5KG1lc3NhZ2UpIHtcbiAgICBpbml0U3VtbWFyeUV2ZW50cygpO1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50VGF4Q29uZmlnKHtcbiAgICAgICAgZGlzcGxheVByaWNlc0luQ2FydEFuZENoZWNrb3V0OiBtZXNzYWdlLnBocERhdGE/LndjX3RheF9wcmljZV9kaXNwbGF5ID09PSAnaW5jbCcgPyAnaW5jbHVkZVRheCcgOiAnZXhjbHVkZVRheCdcbiAgICB9KSk7XG59XG5mdW5jdGlvbiBpbml0U3VtbWFyeUV2ZW50cygpIHtcbiAgICAkcXMoJyNwcC1kcm9wZG93bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9yZGVyU3VtbWFyeURyb3Bkb3duKTtcbiAgICAkcXMoJyNwcC1kcm9wZG93bicpPy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudCk9PntcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgb3JkZXJTdW1tYXJ5RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9yZGVyU3VtbWFyeURyb3Bkb3duKTtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgcmVuZGVyU3VtbWFyaWVzKCk7XG4gICAgICAgIHJlbmRlckNhcnRUb3RhbHMoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlclN1bW1hcmllcygpIHtcbiAgICBjbGVhclJlbmRlcmVkU3VtbWFyaWVzKCk7XG4gICAgbGV0IGNhcnRTdW1tYXJpZXNIVE1MID0gJyc7XG4gICAgZm9yIChjb25zdCBjYXJ0S2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlLmdldFN0YXRlKCkuY2FsY3VsYXRlZENhcnRzKSl7XG4gICAgICAgIGxldCBzdW1tYXJ5SFRNTCA9ICcnO1xuICAgICAgICBjb25zdCB7IGNhcnRTdW1tYXJ5ICwgY2FydE1ldGEgIH0gPSBjYXJ0U3VtbWFyeVZpZXdEYXRhKGNhcnRLZXkpKCk7XG4gICAgICAgIGNvbnN0IHN1bW1hcnlUaXRsZUhUTUwgPSBjYXJ0S2V5ID09PSAnMCcgPyAnJyA6IGBcbjx0ciBjbGFzcz1cInN1bW1hcnktdGl0bGVcIj5cblx0PHRkPlJlY3VycmluZyB0b3RhbHM8L3RkPlxuXHQ8dGQ+PC90ZD5cbjwvdHI+YDtcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGNhcnRTdW1tYXJ5KXtcbiAgICAgICAgICAgIHN1bW1hcnlIVE1MICs9IHJlbmRlclN1bW1hcnlMaW5lKGxpbmUua2V5LCBsaW5lLnZhbHVlLCBjYXJ0TWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FydFN1bW1hcmllc0hUTUwgKz0gYFxuPGRpdiBjbGFzcz1cImNhcnQtc3VtbWFyeVwiIGRhdGEtY2FydC1rZXk9XCIke2NhcnRLZXl9XCI+XG5cdDx0YWJsZT5cblx0XHQke3N1bW1hcnlUaXRsZUhUTUx9XG5cdFx0JHtzdW1tYXJ5SFRNTH1cblx0PC90YWJsZT5cblx0PHAgY2xhc3M9XCJmaXJzdC1yZW5ld2FsIG11dGVkXCI+JHtidWlsZFN1YnNjcmlwdGlvbkZpcnN0UmVuZXdhbFN0cmluZyhjYXJ0TWV0YSl9PC9wPlxuPC9kaXY+YDtcbiAgICB9XG4gICAgJHFzKCcjcHAtc3VtbWFyeS1saW5lcy1ib2R5Jyk/Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY2FydFN1bW1hcmllc0hUTUwpO1xuICAgICRxcygnI3BwLXN1bW1hcnktbGluZXMtYm9keS1leGlzdGluZycpPy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNhcnRTdW1tYXJpZXNIVE1MKTtcbiAgICAkcXMoJyNwcC1zdW1tYXJ5LWxpbmVzLWJvZHktbW9iaWxlJyk/Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY2FydFN1bW1hcmllc0hUTUwpO1xufVxuZnVuY3Rpb24gY2xlYXJSZW5kZXJlZFN1bW1hcmllcygpIHtcbiAgICBmb3IgKGNvbnN0ICRzdW1tYXJ5IG9mICRxc0FsbCgnLmNhcnQtc3VtbWFyeScpKXtcbiAgICAgICAgJHN1bW1hcnkucmVtb3ZlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyU3VtbWFyeUxpbmUobmFtZSwgYW1vdW50LCBjYXJ0TWV0YSkge1xuICAgIGxldCBwcmljZU1ldGFIVE1MID0gJyc7XG4gICAgaWYgKGNhcnRNZXRhLnN1YnNjcmlwdGlvbikge1xuICAgICAgICBwcmljZU1ldGFIVE1MID0gYDxzcGFuIGNsYXNzPVwibXV0ZWRcIj4ke2J1aWxkU3Vic2NyaXB0aW9uUHJpY2VNZXRhRGF0YShjYXJ0TWV0YSl9PC9zcGFuPmA7XG4gICAgfVxuICAgIHJldHVybiBgXG48dHIgY2xhc3M9XCJzdW1tYXJ5LWxpbmVcIiBkYXRhLXJhdy1jb3N0PVwiJHthbW91bnR9XCI+XG5cdDx0ZD4ke25hbWV9PC90ZD5cblx0PHRkPiR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcoYW1vdW50KX0ke3ByaWNlTWV0YUhUTUx9PC90ZD5cbjwvdHI+YDtcbn1cbmZ1bmN0aW9uIG9yZGVyU3VtbWFyeURyb3Bkb3duKCkge1xuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogOTAwcHgpJykubWF0Y2hlcykge1xuICAgICAgICBsZXQgbmV3Q3VzdG9tZXIgPSAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgICAgIGlmIChuZXdDdXN0b21lciA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICBuZXdDdXN0b21lciA9ICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcygnI3BwLWRyb3Bkb3duLW5ldycpPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgbmV3Q3VzdG9tZXIgPSAkcXMoJyNwcC1kcm9wZG93bi1uZXcnKT8uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0N1c3RvbWVyID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICRxcygnI2Ryb3Bkb3duLWRvd24tbmV3Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI2Ryb3Bkb3duLXVwLW5ldycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW5ldycpPy5jbGFzc0xpc3QuYWRkKCdvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW5ldy1vcGVuZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRxcygnI2Ryb3Bkb3duLWRvd24tbmV3Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI2Ryb3Bkb3duLXVwLW5ldycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW5ldycpPy5jbGFzc0xpc3QucmVtb3ZlKCdvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW5ldy1vcGVuZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZXhpc3RpbmcgPSAkcXMoJyNwcC1kcm9wZG93bicpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICBpZiAoZXhpc3RpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAkcXMoJyNwcC1kcm9wZG93bicpPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgZXhpc3RpbmcgPSAkcXMoJyNwcC1kcm9wZG93bicpPy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1kcm9wZG93bicpPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICBleGlzdGluZyA9ICRxcygnI3BwLWRyb3Bkb3duJyk/LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpO1xuICAgIH1cbiAgICBpZiAoZXhpc3RpbmcgPT09ICd0cnVlJykge1xuICAgICAgICAkcXMoJy5kcm9wZG93bi1kb3duJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcuZHJvcGRvd24tdXAnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNvcmRlci1zdW1tYXJ5LWNvbnRlbnRzJyk/LmNsYXNzTGlzdC5hZGQoJ29yZGVyLXN1bW1hcnktY29udGVudHMtb3BlbmVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcuZHJvcGRvd24tZG93bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnLmRyb3Bkb3duLXVwJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjb3JkZXItc3VtbWFyeS1jb250ZW50cycpPy5jbGFzc0xpc3QucmVtb3ZlKCdvcmRlci1zdW1tYXJ5LWNvbnRlbnRzLW9wZW5lZCcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNhcnRUb3RhbHMoKSB7XG4gICAgJHFzQWxsKCcucHAtc3VtbWFyeS10b3RhbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IGNhcnRLZXkgb2YgT2JqZWN0LmtleXMoc3RvcmUuZ2V0U3RhdGUoKS5jYWxjdWxhdGVkQ2FydHMpKXtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlZENhcnQgPSBzdG9yZS5nZXRTdGF0ZSgpLmNhbGN1bGF0ZWRDYXJ0c1tjYXJ0S2V5XTtcbiAgICAgICAgaWYgKCFjYWxjdWxhdGVkQ2FydCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyQ2FydFRvdGFsKGNhbGN1bGF0ZWRDYXJ0LnN1bW1hcnkudG90YWwsIGNhbGN1bGF0ZWRDYXJ0LmNhcnRfbWV0YSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ2FydFRvdGFsKHRvdGFsLCBjYXJ0TWV0YSkge1xuICAgIGlmICghY2FydE1ldGEuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICRxc0FsbCgnLnBwLXN1bW1hcnktdG90YWwnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgKz0gYDxzcGFuPiR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcodG90YWwpfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzQWxsKCcucHAtc3VtbWFyeS10b3RhbCcsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCArPSBgIDxzcGFuIGNsYXNzPVwibXV0ZWRcIj4gKyA8L3NwYW4+PHNwYW4gY2xhc3M9XCJtdXRlZFwiPiR7Zm9ybWF0Q3VycmVuY3lTdHJpbmcodG90YWwpfSR7YnVpbGRTdWJzY3JpcHRpb25QcmljZU1ldGFEYXRhKGNhcnRNZXRhLCB0cnVlKX08L3NwYW4+YFxuICAgICAgICApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRNb2RhbCgpIHtcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgaWYgKEVudmlyb25tZW50Lm1vZGFsVUkub3BlbigpKSB7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghRW52aXJvbm1lbnQubW9kYWxVSS5vcGVuKCkpIHtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlckJ1dHRvbkNvbG9yVGhlbWUoRW52aXJvbm1lbnQucGx1Z2luLmJ1dHRvbkNvbG9yKCkpO1xuICAgICAgICByZW5kZXJUZXN0TW9kZUJhbm5lckRpc3BsYXkoRW52aXJvbm1lbnQudGVzdE1vZGUoKSk7XG4gICAgICAgIHJlbmRlck1vZGFsUGFnZUluZGljYXRvcihFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSk7XG4gICAgICAgIHJlbmRlck1vZGFsTmF2aWdhdGlvbihFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSk7XG4gICAgICAgIHJlbmRlckNvbnRpbnVlQnV0dG9uRGlzcGxheShFbnZpcm9ubWVudC5tb2RhbFVJLnBhZ2UoKSk7XG4gICAgICAgIHJlbmRlckNvbnRpbnVlQnV0dG9uTG9hZGluZyhFbnZpcm9ubWVudC5tb2RhbFVJLmxvYWRpbmdNb2RlKCkpO1xuICAgICAgICByZW5kZXJJbmZvUGFnZURpc3BsYXkoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCkpO1xuICAgICAgICByZW5kZXJQYXltZW50UGFnZURpc3BsYXkoRW52aXJvbm1lbnQubW9kYWxVSS5wYWdlKCksIEVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCksIEVudmlyb25tZW50LmN1c3RvbWVyLm1vYmlsZSgpKTtcbiAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShQZWFjaFBheU9yZGVyLmVycm9yTWVzc2FnZSgpKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ1VJOjptb2RhbE9wZW5lZCcsIChfKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICBtb2RhbElzT3BlbjogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgfSk7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdVSTo6bW9kYWxDbG9zZWQnLCAoXyk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlRW52aXJvbm1lbnQoe1xuICAgICAgICAgICAgbW9kYWxJc09wZW46IGZhbHNlXG4gICAgICAgIH0pKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2hpZGVDb250aW51ZVNwaW5uZXInLCAoXyk9PntcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICB9KTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2J1dHRvbkNsaWNrZWQnLCBhc3luYyAoKT0+e1xuICAgICAgICBvcGVuQ2hlY2tvdXRNb2RhbCgpO1xuICAgICAgICB2YWxpZGF0ZUNhcnRJdGVtc1dpdGhDdXN0b21lcihEZWZhdWx0Q2FydC5jb250ZW50cygpLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RhcnRNb2RhbExvYWRpbmcoKSk7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oIUVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgIH0pO1xuICAgIG9uV2luZG93TWVzc2FnZSgnc3RvcFBheW1lbnRQcm9jZXNzaW5nQW5pbWF0aW9ucycsIChtZXNzYWdlKT0+e1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzdG9wTW9kYWxMb2FkaW5nKCkpO1xuICAgICAgICBpZiAobWVzc2FnZS5jbG9zZU1vZGFsKSB7XG4gICAgICAgICAgICByZXF1ZXN0Q2xvc2VNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0T3JkZXJFcnJvcihtZXNzYWdlLmVycm9yTWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJHFzKCcucHAtZXhpdCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcXVlc3RDbG9zZU1vZGFsKTtcbiAgICAkcXMoJy5wcC1jbG9zZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcXVlc3RDbG9zZU1vZGFsKTtcbiAgICAkcXMoJyNlZGl0LWluZm8nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9JbmZvKTtcbiAgICBmb3IgKGNvbnN0ICRlbGVtZW50MSBvZiAkcXNBbGwoJy5wcC1iYWNrLXRvLWluZm8nKSl7XG4gICAgICAgICRlbGVtZW50MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tUb0luZm8pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3JNZXNzYWdlKSB7XG4gICAgaWYgKGVycm9yTWVzc2FnZSAhPT0gJycpIHtcbiAgICAgICAgJHFzKCcjc2hpcHBpbmctb3B0aW9ucy1jb250YWluZXInKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1wYXltZW50LWZvcm0nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwYXltZW50LW1ldGhvZHMnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50MyBvZiAkcXNBbGwoJy5wYXktYnV0dG9uLWNvbnRhaW5lcicpKXtcbiAgICAgICAgICAgICRlbGVtZW50My5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDIgb2YgJHFzQWxsKCcuaGlkZS13aGVuLWludmFsaWQnKSl7XG4gICAgICAgICAgICAkZWxlbWVudDIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZS1leGlzdGluZycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmlubmVySFRNTCA9IGVycm9yTWVzc2FnZVxuICAgICAgICApO1xuICAgICAgICAkcXMoJyNpbnZhbGlkLW9yZGVyLW1lc3NhZ2UtZXhpc3RpbmcnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2VcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNzaGlwcGluZy1vcHRpb25zLWNvbnRhaW5lcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLXBheW1lbnQtZm9ybScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BheW1lbnQtbWV0aG9kcycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcucGF5LWJ1dHRvbi1jb250YWluZXInKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDUgb2YgJHFzQWxsKCcuaGlkZS13aGVuLWludmFsaWQnKSl7XG4gICAgICAgICAgICAkZWxlbWVudDUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2ludmFsaWQtb3JkZXItbWVzc2FnZS1leGlzdGluZycpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gb3BlbkNoZWNrb3V0TW9kYWwoKSB7XG4gICAgd2luZG93LnRvcD8ucG9zdE1lc3NhZ2UoJ29wZW5Nb2RhbCcsICcqJyk7XG59XG5mdW5jdGlvbiByZXF1ZXN0Q2xvc2VNb2RhbCgpIHtcbiAgICBzeW5jT3JkZXJOb3Rlcyh0cnVlKTtcbiAgICB3aW5kb3cudG9wPy5wb3N0TWVzc2FnZSgnY2xvc2VNb2RhbCcsICcqJyk7XG59XG5mdW5jdGlvbiBiYWNrVG9JbmZvKCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZUVudmlyb25tZW50KHtcbiAgICAgICAgbW9kYWxQYWdlVHlwZTogJ2luZm8nLFxuICAgICAgICBjdXN0b21lckV4aXN0czogZmFsc2VcbiAgICB9KSk7XG4gICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlQ3VzdG9tZXJBZGRyZXNzVmFsaWRhdGlvbihmYWxzZSkpO1xuICAgIHN5bmNPcmRlck5vdGVzKCk7XG59XG5mdW5jdGlvbiByZW5kZXJDb250aW51ZUJ1dHRvbkRpc3BsYXkobW9kYWxQYWdlKSB7XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUtbW9iaWxlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkcXMoJyNwcC1jb250aW51ZScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlLW1vYmlsZScpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyQ29udGludWVCdXR0b25Mb2FkaW5nKGxvYWRpbmdNb2RlKSB7XG4gICAgaWYgKGxvYWRpbmdNb2RlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUtbW9iaWxlJywgKCRlbGVtZW50KT0+JGVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI2NvbnRpbnVlLXNwaW5uZXInKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjb250aW51ZS1zcGlubmVyLW1vYmlsZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcjcHAtY29udGludWUnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgICRxcygnI3BwLWNvbnRpbnVlLW1vYmlsZScsICgkZWxlbWVudCk9PiRlbGVtZW50LmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcjY29udGludWUtc3Bpbm5lcicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICRxcygnI2NvbnRpbnVlLXNwaW5uZXItbW9iaWxlJyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJNb2RhbE5hdmlnYXRpb24obW9kYWxQYWdlKSB7XG4gICAgaWYgKG1vZGFsUGFnZSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICRxcygnLnBwLWV4aXQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBmb3IgKGNvbnN0ICRlbGVtZW50IG9mICRxc0FsbCgnLnBwLWJhY2stdG8taW5mbycpKXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kYWxQYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgJHFzKCcucHAtZXhpdCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcucHAtYmFjay10by1pbmZvJykpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyTW9kYWxQYWdlSW5kaWNhdG9yKG1vZGFsUGFnZSkge1xuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdpbmZvJykge1xuICAgICAgICAkcXMoJy5jb2xvci1jaGFuZ2luZy1pbmZvJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY2hlY2tvdXQtc3RhdHVzJyk/LmNsYXNzTGlzdC5hZGQoJ2NpcmNsZS1sb2dvLW9uZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLmNvbG9yLWNoYW5naW5nLWluZm8nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjaGVja291dC1zdGF0dXMnKT8uY2xhc3NMaXN0LnJlbW92ZSgnY2lyY2xlLWxvZ28tb25lJyk7XG4gICAgfVxuICAgIGlmIChtb2RhbFBhZ2UgPT09ICdwYXltZW50Jykge1xuICAgICAgICAkcXMoJy5jb2xvci1jaGFuZ2luZy1wYXltZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjY2hlY2tvdXQtc3RhdHVzJyk/LmNsYXNzTGlzdC5hZGQoJ2NpcmNsZS1sb2dvLXR3bycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnLmNvbG9yLWNoYW5naW5nLXBheW1lbnQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNjaGVja291dC1zdGF0dXMnKT8uY2xhc3NMaXN0LnJlbW92ZSgnY2lyY2xlLWxvZ28tdHdvJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyVGVzdE1vZGVCYW5uZXJEaXNwbGF5KHRlc3RNb2RlKSB7XG4gICAgaWYgKHRlc3RNb2RlKSB7XG4gICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LmFkZCgndGVzdC1tb2RlLWJvcmRlcicpO1xuICAgICAgICAkcXMoJy50ZXN0LW1vZGUtYmFubmVyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSAnMS4yNXJlbSdcbiAgICAgICAgKTtcbiAgICAgICAgJHFzKCcucHAtY2xvc2UnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zdHlsZS50b3AgPSAnMC44cmVtJ1xuICAgICAgICApO1xuICAgICAgICAkcXMoJy5wcC1jbG9zZScsICgkZWxlbWVudCk9PiRlbGVtZW50LnN0eWxlLnJpZ2h0ID0gJzRweCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJCdXR0b25Db2xvclRoZW1lKGNvbG9yID0gJyNGRjg3NkMnKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBlYWNocGF5LXRoZW1lLWNvbG9yJywgY29sb3IpO1xufVxuZnVuY3Rpb24gcmVuZGVyUGF5bWVudFBhZ2VEaXNwbGF5KG1vZGFsUGFnZSwgZXhpc3RpbmdDdXN0b21lciwgaXNNb2JpbGUpIHtcbiAgICBpZiAobW9kYWxQYWdlID09PSAncGF5bWVudCcpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nQ3VzdG9tZXIpIHtcbiAgICAgICAgICAgICRxcygnI3BwLW5ldy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1leGlzdGluZy1jdXN0b21lci1jaGVja291dCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ2NvbCcpO1xuICAgICAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QuYWRkKCd3LWV4aXN0aW5nLWNoZWNrb3V0Jyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5hZGQoJ3AtMS01Jyk7XG4gICAgICAgICAgICAkcXMoJy5vcmRlci1zdW1tYXJ5LWhlYWRpbmcnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgJHFzKCcjcHAtc3VtbWFyeS1ib2R5JywgKCRlbGVtZW50KT0+JGVsZW1lbnQuc3R5bGUuYm9yZGVyQm90dG9tID0gJ25vbmUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZm9yIChjb25zdCAkZWxlbWVudDYgb2YgJHFzQWxsKCcuc3BsaXQnKSl7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQ2LnN0eWxlLnNldFByb3BlcnR5KCdmbG9hdCcsICdsZWZ0JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHFzKCcjcHAtbmV3LWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI3BwLWV4aXN0aW5nLWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnY29sJyk7XG4gICAgICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3ctZXhpc3RpbmctY2hlY2tvdXQnKTtcbiAgICAgICAgICAgICRxcygnI3BwLW1vZGFsLWNvbnRlbnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgncC0xLTUnKTtcbiAgICAgICAgfVxuICAgICAgICAkcXMoJyNleHRyYS1maWVsZHMtc2VjdGlvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzTW9iaWxlKSB7XG4gICAgICAgICAgICAkcXMoJyNleHRyYS1maWVsZHMtc2VjdGlvbicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgJHFzKCcub3JkZXItc3VtbWFyeS1oZWFkaW5nJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtbmV3LWN1c3RvbWVyLWNoZWNrb3V0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgJHFzKCcjcHAtZXhpc3RpbmctY3VzdG9tZXItY2hlY2tvdXQnKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbCcpO1xuICAgICAgICAkcXMoJyNwcC1tb2RhbC1jb250ZW50Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3ctZXhpc3RpbmctY2hlY2tvdXQnKTtcbiAgICAgICAgJHFzKCcjcHAtbW9kYWwtY29udGVudCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdwLTEtNScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckluZm9QYWdlRGlzcGxheShtb2RhbFBhZ2UpIHtcbiAgICBpZiAobW9kYWxQYWdlID09PSAnaW5mbycpIHtcbiAgICAgICAgJHFzKCcjcHAtaW5mbycpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIGZvciAoY29uc3QgJGVsZW1lbnQgb2YgJHFzQWxsKCcuc3BsaXQnKSl7XG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxvYXQnLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICRxcygnI3BwLWluZm8nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRNZXRyaWNzKCkge1xuICAgICRxcygnI3BwLXBheScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5yZWNvcmROb25QUEJ1dHRvbkNsaWNrKCdwcC1wYXknKVxuICAgICk7XG4gICAgJHFzKCcjcHAtcGF5LW1vYmlsZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5yZWNvcmROb25QUEJ1dHRvbkNsaWNrKCdwcC1wYXktbW9iaWxlJylcbiAgICApO1xuICAgICRxcygnI3BwLXBheS1leGlzdGluZycpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5yZWNvcmROb25QUEJ1dHRvbkNsaWNrKCdwcC1wYXktZXhpc3RpbmcnKVxuICAgICk7XG4gICAgJHFzKCcjcHAtY29udGludWUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+cmVjb3JkTm9uUFBCdXR0b25DbGljaygncHAtY29udGludWUnKVxuICAgICk7XG4gICAgJHFzKCcjcHAtY29udGludWUtbW9iaWxlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnJlY29yZE5vblBQQnV0dG9uQ2xpY2soJ3BwLWNvbnRpbnVlLW1vYmlsZScpXG4gICAgKTtcbiAgICBvbldpbmRvd01lc3NhZ2UoJ2J1dHRvbkNsaWNrZWQnLCAobWVzc2FnZSk9PntcbiAgICAgICAgcmVjb3JkQnV0dG9uQ2xpY2soYnV0dG9uVHlwZVZhbGlkYXRpb24obWVzc2FnZS5idXR0b25JRCksIGdldFBQQnV0dG9uTG9jYXRpb24obWVzc2FnZSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYnV0dG9uVHlwZVZhbGlkYXRpb24oYnV0dG9uVHlwZSkge1xuICAgIHJldHVybiBidXR0b25UeXBlID09PSB1bmRlZmluZWQgPyAndW5rbm93bicgOiBidXR0b25UeXBlO1xufVxuZnVuY3Rpb24gcmVjb3JkTm9uUFBCdXR0b25DbGljayhidXR0b25UeXBlKSB7XG4gICAgcmVjb3JkQnV0dG9uQ2xpY2soYnV0dG9uVHlwZSwgUFBCdXR0b25Mb2NhdGlvbi5Ob3RBcHBsaWNhYmxlKTtcbn1cbmZ1bmN0aW9uIHJlY29yZEJ1dHRvbkNsaWNrKGJ1dHRvblR5cGUsIHBwQnV0dG9uTG9jYXRpb24pIHtcbiAgICBwb3N0QnV0dG9uTWV0cmljcyh7XG4gICAgICAgIGRvbWFpbjogTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksXG4gICAgICAgIGJ1dHRvblR5cGUsXG4gICAgICAgIHBwQnV0dG9uTG9jYXRpb24sXG4gICAgICAgIGlzTW9iaWxlOiBFbnZpcm9ubWVudC5jdXN0b21lci5tb2JpbGUoKSxcbiAgICAgICAgaXNUZXN0TW9kZTogRW52aXJvbm1lbnQudGVzdE1vZGUoKVxuICAgIH0pO1xufVxudmFyIFBQQnV0dG9uTG9jYXRpb247XG4oZnVuY3Rpb24oUFBCdXR0b25Mb2NhdGlvbjEpIHtcbiAgICBQUEJ1dHRvbkxvY2F0aW9uMVtcIlByb2R1Y3RcIl0gPSAncHJvZHVjdCc7XG4gICAgUFBCdXR0b25Mb2NhdGlvbjFbXCJDaGVja291dFwiXSA9ICdjaGVja291dCc7XG4gICAgUFBCdXR0b25Mb2NhdGlvbjFbXCJNaW5pQ2FydFwiXSA9ICdtaW5pLWNhcnQnO1xuICAgIFBQQnV0dG9uTG9jYXRpb24xW1wiQ2FydFwiXSA9ICdjYXJ0JztcbiAgICBQUEJ1dHRvbkxvY2F0aW9uMVtcIk5vdEFwcGxpY2FibGVcIl0gPSAnbm90LWFwcGxpY2FibGUnO1xufSkoUFBCdXR0b25Mb2NhdGlvbiB8fCAoUFBCdXR0b25Mb2NhdGlvbiA9IHt9KSk7XG5mdW5jdGlvbiBnZXRQUEJ1dHRvbkxvY2F0aW9uKG1lc3NhZ2UpIHtcbiAgICBpZiAobWVzc2FnZS5pc01pbmlDYXJ0KSB7XG4gICAgICAgIHJldHVybiBQUEJ1dHRvbkxvY2F0aW9uLk1pbmlDYXJ0O1xuICAgIH1cbiAgICBzd2l0Y2goRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkpe1xuICAgICAgICBjYXNlICdjYXJ0JzpcbiAgICAgICAgICAgIHJldHVybiBQUEJ1dHRvbkxvY2F0aW9uLkNhcnQ7XG4gICAgICAgIGNhc2UgJ2NoZWNrb3V0JzpcbiAgICAgICAgICAgIHJldHVybiBQUEJ1dHRvbkxvY2F0aW9uLkNoZWNrb3V0O1xuICAgICAgICBjYXNlICdwcm9kdWN0JzpcbiAgICAgICAgICAgIHJldHVybiBQUEJ1dHRvbkxvY2F0aW9uLlByb2R1Y3Q7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gUFBCdXR0b25Mb2NhdGlvbi5Ob3RBcHBsaWNhYmxlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBvc3RCdXR0b25NZXRyaWNzKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMuaXNUZXN0TW9kZSkge1xuICAgICAgICBmZXRjaChgaHR0cHM6Ly8yZmFkNnczZXhnLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3YxL2J1dHRvbnN0YXRzP2RvbWFpbj0ke29wdGlvbnMuZG9tYWlufSZidXR0b25UeXBlPSR7b3B0aW9ucy5idXR0b25UeXBlfSZwcEJ1dHRvbkxvY2F0aW9uPSR7U3RyaW5nKG9wdGlvbnMucHBCdXR0b25Mb2NhdGlvbil9JmlzTW9iaWxlPSR7U3RyaW5nKG9wdGlvbnMuaXNNb2JpbGUpfSZpc1Byb2R1Y3Rpb25EYXRhPSR7U3RyaW5nKGlzUHJvZHVjdGlvbkRvbWFpbihvcHRpb25zLmRvbWFpbikpfWApLnRoZW4oKCk9Pnt9KS5jYXRjaCgoKT0+e30pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzUHJvZHVjdGlvbkRvbWFpbihkb21haW4pIHtcbiAgICBzd2l0Y2goZG9tYWluKXtcbiAgICAgICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgICAgY2FzZSAnMTI3LjAuMC4xJzpcbiAgICAgICAgY2FzZSAnc3RvcmUubG9jYWwnOlxuICAgICAgICBjYXNlICd3b28uc3RvcmUubG9jYWwnOlxuICAgICAgICBjYXNlICd3b28ucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWUxLnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lMi5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICd0aGVtZTMucGVhY2hwYXkuYXBwJzpcbiAgICAgICAgY2FzZSAndGhlbWU0LnBlYWNocGF5LmFwcCc6XG4gICAgICAgIGNhc2UgJ3RoZW1lNS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICdxYS5wZWFjaHBheS5hcHAnOlxuICAgICAgICBjYXNlICdkZW1vLnBlYWNocGF5LmFwcCc6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5jb25zdCBkZWZhdWx0Rm9ybUhUTUwgPSBgPGZvcm0gaWQ9XCJwcC1pbmZvLWZvcm1cIj5cbjxoMj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJwZXJzb25hbFwiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cImVtYWlsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImVtYWlsXCIgZGF0YS1pMThuPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInBob25lXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRlbFwiIG5hbWU9XCJwaG9uZVwiIHBsYWNlaG9sZGVyPVwiIFwicmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInBob25lXCIgZGF0YS1pMThuPVwicGhvbmVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfZmlyc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2ZpcnN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfZmlyc3RcIiBkYXRhLWkxOG49XCJmaXJzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0XHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfbGFzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfbGFzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2xhc3RcIiBkYXRhLWkxOG49XCJsYXN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGgyIGNsYXNzPVwic2hpcHBpbmctYWRkcmVzcy1oZWFkZXJcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJzaGlwcGluZ1wiPjwvc3Bhbj48L2gyPlxuPGgyIGNsYXNzPVwiYmlsbGluZy1hZGRyZXNzLWhlYWRlciBoaWRlXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwiYmlsbGluZ1wiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy03MFwiPlxuXHRcdDxpbnB1dCBpZD1cImFkZHJlc3MxXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczFcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiYWRkcmVzczFcIiBkYXRhLWkxOG49XCJzdHJlZXRcIiBjbGFzcz1cImZvcm0tbGFiZWwgZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTMwXCI+XG5cdFx0PGlucHV0IGlkPVwiYWRkcmVzczJcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMlwiIHBsYWNlaG9sZGVyPVwiIFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJhZGRyZXNzMlwiIGRhdGEtaTE4bj1cImFwdFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwicG9zdGFsXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwicG9zdGFsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cInBvc3RhbFwiIGRhdGEtaTE4bj1cInBvc3RhbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwiY2l0eVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiY2l0eVwiIGRhdGEtaTE4bj1cImNpdHlcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInByb3ZpbmNlXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwib2ZmXCIgcGxhY2Vob2xkZXI9XCIgXCI+XG5cdFx0PGxhYmVsIGZvcj1cInByb3ZpbmNlXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCIgZGF0YS1pMThuPVwicHJvdmluY2VcIj48L2xhYmVsPlxuXHRcdDxzZWxlY3QgaWQ9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwidy0xMDAgc2VsZWN0IGhpZGVcIiBuYW1lPVwic3RhdGVcIiBzaXplPVwiMVwiPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWU+PC9vcHRpb24+XG5cdFx0PC9zZWxlY3Q+XG5cdFx0PGxhYmVsIGZvcj1cImR5bmFtaWMtc3RhdGVzXCIgY2xhc3M9XCJmb3JtLWxhYmVsIHJlZ2lvbi1jb3VudHJ5LWxhYmVsIGhpZGVcIiBkYXRhLWkxOG49XCJzdGF0ZVwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PHNlbGVjdCBpZD1cImNvdW50cnlcIiBjbGFzcz1cInctMTAwXCIgbmFtZT1cImNvdW50cnlcIiBzaXplPVwiMVwiIHJlcXVpcmVkPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWUgZGF0YS1pMThuPVwiY291bnRyeVwiPjwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJjb3VudHJ5XCIgZGF0YS1pMThuPVwiY291bnRyeS1sYWJlbFwiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGlkPVwiY2hlY2tvdXQtZGVsaXZlcnktZGF0ZVwiIGNsYXNzPVwiaGlkZVwiPlxuXHQ8aDIgZGF0YS1pMThuPVwiZGVsaXZlcnktZGF0ZVwiPjwvaDI+XG5cdDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZGVsaXZlcnktZGF0ZVwiIG5hbWU9XCJkZWxpdmVyeS1kYXRlXCIgdmFsdWU9XCJcIiBtaW49XCJcIj5cbjwvZGl2PlxuPC9mb3JtPmA7XG5jb25zdCBqYXBhbmVzZUZvcm1IVE1MID0gYDxmb3JtIGlkPVwicHAtaW5mby1mb3JtXCI+XG48aDI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwicGVyc29uYWxcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJlbWFpbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJlbWFpbFwiIGRhdGEtaTE4bj1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwaG9uZVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZWxcIiBuYW1lPVwicGhvbmVcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwicGhvbmVcIiBkYXRhLWkxOG49XCJwaG9uZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9sYXN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfbGFzdFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJuYW1lX2xhc3RcIiBkYXRhLWkxOG49XCJsYXN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cIm5hbWVfZmlyc3RcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lX2ZpcnN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfZmlyc3RcIiBkYXRhLWkxOG49XCJmaXJzdC1uYW1lXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxoMiBjbGFzcz1cInNoaXBwaW5nLWFkZHJlc3MtaGVhZGVyXCI+PHNwYW4gY2xhc3M9XCJib2xkXCIgZGF0YS1pMThuPVwic2hpcHBpbmdcIj48L3NwYW4+PC9oMj5cbjxoMiBjbGFzcz1cImJpbGxpbmctYWRkcmVzcy1oZWFkZXIgaGlkZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cImJpbGxpbmdcIj48L3NwYW4+PC9oMj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8c2VsZWN0IGlkPVwiY291bnRyeVwiIGNsYXNzPVwidy0xMDBcIiBuYW1lPVwiY291bnRyeVwiIHNpemU9XCIxXCIgcmVxdWlyZWQ+XG5cdFx0XHQ8b3B0aW9uIGhpZGRlbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZSBkYXRhLWkxOG49XCJzZWxlY3QtY291bnRyeVwiPjwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJjb3VudHJ5XCIgZGF0YS1pMThuPVwiY291bnRyeS1sYWJlbHlcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInBvc3RhbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBvc3RhbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJwb3N0YWxcIiBkYXRhLWkxOG49XCJwb3N0YWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInByb3ZpbmNlXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwib2ZmXCIgcGxhY2Vob2xkZXI9XCIgXCI+XG5cdFx0PGxhYmVsIGZvcj1cInByb3ZpbmNlXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCIgZGF0YS1pMThuPVwicHJvdmluY2VcIj48L2xhYmVsPlxuXHRcdDxzZWxlY3QgaWQ9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwidy0xMDAgc2VsZWN0IGhpZGVcIiBuYW1lPVwic3RhdGVcIiBzaXplPVwiMVwiPlxuXHRcdFx0PG9wdGlvbiBoaWRkZW4gZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWU+U3RhdGU8L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWwgaGlkZVwiPlJlZ2lvbjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwiY2l0eVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiY2l0eVwiIGRhdGEtaTE4bj1cImNpdHlcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy03MFwiPlxuXHRcdDxpbnB1dCBpZD1cImFkZHJlc3MxXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkcmVzczFcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwiYWRkcmVzczFcIiBkYXRhLWkxOG49XCJzdHJlZXRcIiBjbGFzcz1cImZvcm0tbGFiZWwgZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTMwXCI+XG5cdFx0PGlucHV0IGlkPVwiYWRkcmVzczJcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRyZXNzMlwiIHBsYWNlaG9sZGVyPVwiIFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJhZGRyZXNzMlwiIGRhdGEtaTE4bj1cImFwdFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48ZGl2IGlkPVwiY2hlY2tvdXQtZGVsaXZlcnktZGF0ZVwiIGNsYXNzPVwiaGlkZVwiPlxuXHQ8aDIgZGF0YS1pMThuPVwiZGVsaXZlcnktZGF0ZVwiPjwvaDI+XG5cdDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZGVsaXZlcnktZGF0ZVwiIG5hbWU9XCJkZWxpdmVyeS1kYXRlXCIgdmFsdWU9XCJcIiBtaW49XCJcIj5cbjwvZGl2PlxuPC9mb3JtPmA7XG5jb25zdCBjaGVja291dEZvcm1Ob1Bob25lTm9BcHQgPSBgPGZvcm0gaWQ9XCJwcC1pbmZvLWZvcm1cIj5cbjxoMj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJwZXJzb25hbFwiPjwvc3Bhbj48L2gyPlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGlucHV0IGlkPVwiZW1haWxcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0PGxhYmVsIGZvcj1cImVtYWlsXCIgZGF0YS1pMThuPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9maXJzdFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVfZmlyc3RcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cblx0XHQ8bGFiZWwgZm9yPVwibmFtZV9maXJzdFwiIGRhdGEtaTE4bj1cImZpcnN0LW5hbWVcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHRcdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCB3LTUwXCI+XG5cdFx0PGlucHV0IGlkPVwibmFtZV9sYXN0XCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZV9sYXN0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cIm5hbWVfbGFzdFwiIGRhdGEtaTE4bj1cImxhc3QtbmFtZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPjwvbGFiZWw+XG5cdDwvZGl2PlxuPC9kaXY+XG48aDIgY2xhc3M9XCJzaGlwcGluZy1hZGRyZXNzLWhlYWRlclwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiIGRhdGEtaTE4bj1cInNoaXBwaW5nXCI+PC9zcGFuPjwvaDI+XG48aDIgY2xhc3M9XCJiaWxsaW5nLWFkZHJlc3MtaGVhZGVyIGhpZGVcIj48c3BhbiBjbGFzcz1cImJvbGRcIiBkYXRhLWkxOG49XCJiaWxsaW5nXCI+PC9zcGFuPjwvaDI+XG48ZGl2IGNsYXNzPVwiZmxleFwiPlxuXHQ8aW5wdXQgaWQ9XCJhZGRyZXNzMVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZHJlc3MxXCIgY2xhc3M9XCJ3LTEwMCB0ZXh0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdDxsYWJlbCBmb3I9XCJhZGRyZXNzMVwiIGRhdGEtaTE4bj1cInN0cmVldFwiIGNsYXNzPVwiZm9ybS1sYWJlbCBmb3JtLWxhYmVsXCI+PC9sYWJlbD5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZsZXhcIj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cInBvc3RhbFwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBvc3RhbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxuXHRcdDxsYWJlbCBmb3I9XCJwb3N0YWxcIiBkYXRhLWkxOG49XCJwb3N0YWxcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxpbnB1dCBpZD1cImNpdHlcIiBjbGFzcz1cInctMTAwIHRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaXR5XCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XG5cdFx0PGxhYmVsIGZvcj1cImNpdHlcIiBkYXRhLWkxOG49XCJjaXR5XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+PC9sYWJlbD5cblx0PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJmbGV4XCI+XG5cdDxkaXYgY2xhc3M9XCJmbGV4IHctNTBcIj5cblx0XHQ8aW5wdXQgaWQ9XCJwcm92aW5jZVwiIGNsYXNzPVwidy0xMDAgdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm9mZlwiIHBsYWNlaG9sZGVyPVwiIFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJwcm92aW5jZVwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGRhdGEtaTE4bj1cInByb3ZpbmNlXCI+PC9sYWJlbD5cblx0XHQ8c2VsZWN0IGlkPVwiZHluYW1pYy1zdGF0ZXNcIiBjbGFzcz1cInctMTAwIHNlbGVjdCBoaWRlXCIgbmFtZT1cInN0YXRlXCIgc2l6ZT1cIjFcIj5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlPjwvb3B0aW9uPlxuXHRcdDwvc2VsZWN0PlxuXHRcdDxsYWJlbCBmb3I9XCJkeW5hbWljLXN0YXRlc1wiIGNsYXNzPVwiZm9ybS1sYWJlbCByZWdpb24tY291bnRyeS1sYWJlbCBoaWRlXCIgZGF0YS1pMThuPVwic3RhdGVcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImZsZXggdy01MFwiPlxuXHRcdDxzZWxlY3QgaWQ9XCJjb3VudHJ5XCIgY2xhc3M9XCJ3LTEwMFwiIG5hbWU9XCJjb3VudHJ5XCIgc2l6ZT1cIjFcIiByZXF1aXJlZD5cblx0XHRcdDxvcHRpb24gaGlkZGVuIGRpc2FibGVkIHNlbGVjdGVkIHZhbHVlIGRhdGEtaTE4bj1cImNvdW50cnlcIj48L29wdGlvbj5cblx0XHQ8L3NlbGVjdD5cblx0XHQ8bGFiZWwgZm9yPVwiY291bnRyeVwiIGRhdGEtaTE4bj1cImNvdW50cnktbGFiZWxcIiBjbGFzcz1cImZvcm0tbGFiZWwgcmVnaW9uLWNvdW50cnktbGFiZWxcIj48L2xhYmVsPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuPGRpdiBpZD1cImNoZWNrb3V0LWRlbGl2ZXJ5LWRhdGVcIiBjbGFzcz1cImhpZGVcIj5cblx0PGgyIGRhdGEtaTE4bj1cImRlbGl2ZXJ5LWRhdGVcIj48L2gyPlxuXHQ8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImRlbGl2ZXJ5LWRhdGVcIiBuYW1lPVwiZGVsaXZlcnktZGF0ZVwiIHZhbHVlPVwiXCIgbWluPVwiXCI+XG48L2Rpdj5cbjwvZm9ybT5gO1xuZnVuY3Rpb24gaW5pdExpbmtlZFByb2R1Y3RzKCkge1xuICAgICRxcygnLnByZXYtYnRuJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTGVmdCk7XG4gICAgJHFzKCcubmV4dC1idG4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxSaWdodCk7XG4gICAgJHFzKCcjcHJvZHVjdHMtbGlzdCcpPy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxBZGp1c3Rlcik7XG4gICAgbGV0IHByZXZpb3VzQ2FydERhdGEgPSAnJztcbiAgICBzdG9yZS5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgaWYgKEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcgfHwgRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdjYXJ0Jykge1xuICAgICAgICAgICAgY29uc3QgY2FydERhdGEgPSBKU09OLnN0cmluZ2lmeShEZWZhdWx0Q2FydC5jb250ZW50cygpKTtcbiAgICAgICAgICAgIGlmIChjYXJ0RGF0YSAhPT0gcHJldmlvdXNDYXJ0RGF0YSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzQ2FydERhdGEgPSBjYXJ0RGF0YTtcbiAgICAgICAgICAgICAgICByZW5kZXJMaW5rZWRQcm9kdWN0cyhEZWZhdWx0Q2FydC5jb250ZW50cygpKTtcbiAgICAgICAgICAgICAgICBzZXRBZGRCdXR0b25Db2xvcihFbnZpcm9ubWVudC5wbHVnaW4uYnV0dG9uQ29sb3IoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNsZWFyTGlua2VkUHJvZHVjdHMoKSB7XG4gICAgZm9yIChjb25zdCBsaW5rZWRJdGVtIG9mICRxc0FsbCgnLnByb2R1Y3QtYm9keScpKXtcbiAgICAgICAgbGlua2VkSXRlbS5yZW1vdmUoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRBZGRCdXR0b25Db2xvcihjb2xvciA9ICcjRkY4NzZDJykge1xuICAgIGZvciAoY29uc3QgYWRkQnRuIG9mICRxc0FsbCgnLmFkZC1idG4nKSl7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQnICsgY29sb3I7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyTGlua2VkUHJvZHVjdHMoY2FydCkge1xuICAgIGNsZWFyTGlua2VkUHJvZHVjdHMoKTtcbiAgICBmb3IobGV0IGkgPSBjYXJ0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgICAgY29uc3QgaXRlbSA9IGNhcnRbaV07XG4gICAgICAgIGxldCBsaW5rZWRQcm9kdWN0cztcbiAgICAgICAgaWYgKEVudmlyb25tZW50LnBsdWdpbi5wYWdlVHlwZSgpID09PSAncHJvZHVjdCcgJiYgIWl0ZW0uaXNfcGFydF9vZl9idW5kbGUgJiYgaXRlbS51cHNlbGxfaXRlbXMpIHtcbiAgICAgICAgICAgIGxpbmtlZFByb2R1Y3RzID0gaXRlbS51cHNlbGxfaXRlbXM7XG4gICAgICAgIH0gZWxzZSBpZiAoRW52aXJvbm1lbnQucGx1Z2luLnBhZ2VUeXBlKCkgPT09ICdjYXJ0JyAmJiAhaXRlbS5pc19wYXJ0X29mX2J1bmRsZSAmJiBpdGVtLmNyb3NzX3NlbGxfaXRlbXMpIHtcbiAgICAgICAgICAgIGxpbmtlZFByb2R1Y3RzID0gaXRlbS5jcm9zc19zZWxsX2l0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5rZWRQcm9kdWN0cykge1xuICAgICAgICAgICAgJHFzKCcjbGlua2VkLXByb2R1Y3RzLXNlY3Rpb24nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaW5rZWRJdGVtIG9mIGxpbmtlZFByb2R1Y3RzKXtcbiAgICAgICAgICAgICAgICBpZiAobGlua2VkSXRlbS5oYXNfc3RvY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5rZWRJdGVtLmhhc19zdG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghbGlua2VkSXRlbS52YXJpYWJsZSAmJiAhbGlua2VkSXRlbS5idW5kbGUgJiYgbGlua2VkSXRlbS5oYXNfc3RvY2sgJiYgIWhhc1NhbWVMaW5rZWRQcm9kdWN0KGxpbmtlZEl0ZW0uaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RzTGlzdCA9ICRxcygnI3Byb2R1Y3RzLWxpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEJvZHkuY2xhc3NOYW1lID0gJ3Byb2R1Y3QtYm9keSc7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RCb2R5LmlkID0gU3RyaW5nKGxpbmtlZEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkSXRlbS5pbWdfc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Qm9keS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LWltZ1wiIHNyYz0ke2xpbmtlZEl0ZW0uaW1nX3NyY30+YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Qm9keS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1kZXNjXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgPHNwYW4gY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1uYW1lXCI+JHtsaW5rZWRJdGVtLm5hbWV9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IDxzcGFuIGNsYXNzPVwibGlua2VkLXByb2R1Y3QtcXVhbnRpdHlcIj5RdWFudGl0eTogMTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCA8c3BhbiBjbGFzcz1cImxpbmtlZC1wcm9kdWN0LXByaWNlXCI+JHtmb3JtYXRDdXJyZW5jeVN0cmluZyhOdW1iZXIucGFyc2VGbG9hdChsaW5rZWRJdGVtLnByaWNlKSl9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCA8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgPGJ1dHRvbiBjbGFzcz1cImFkZC1idG5cIiBkYXRhLXBpZD0ke2xpbmtlZEl0ZW0uaWR9IGRhdGEtaTE4bj1cImFkZFwiPjwvYnV0dG9uPmA7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzTGlzdD8ucHJlcGVuZChwcm9kdWN0Qm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldEFkZEJ1dHRvbkNvbG9yKCk7XG4gICAgcmVtb3ZlTGlua2VkUHJvZHVjdChjYXJ0KTtcbiAgICBmb3IgKGNvbnN0IGFkZEJ0biBvZiAkcXNBbGwoJy5hZGQtYnRuJykpe1xuICAgICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiaW1nL3NwaW5uZXIuc3ZnXCIgY2xhc3M9XCJsaW5rZWQtcHJvZHVjdC1zcGlubmVyXCIvPic7XG4gICAgICAgICAgICBhZGRMaW5rZWRQcm9kdWN0dG9DYXJ0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZExpbmtlZFByb2R1Y3R0b0NhcnQobGlua2VkUHJvZHVjdCkge1xuICAgIEdMT0JBTC5saW5rZWRQcm9kdWN0c0lkcz8ucHVzaChOdW1iZXIucGFyc2VJbnQobGlua2VkUHJvZHVjdC5kYXRhc2V0LnBpZCkpO1xuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogJ2FkZExpbmtlZFByb2R1Y3QnLFxuICAgICAgICBwcm9kdWN0SUQ6IGxpbmtlZFByb2R1Y3QuZGF0YXNldC5waWRcbiAgICB9LCAnKicpO1xufVxuZnVuY3Rpb24gcmVtb3ZlTGlua2VkUHJvZHVjdChjYXJ0KSB7XG4gICAgZm9yIChjb25zdCBsaW5rZWRQcm9kdWN0IG9mICRxc0FsbCgnLnByb2R1Y3QtYm9keScpKXtcbiAgICAgICAgZm9yKGxldCBpID0gY2FydC5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gY2FydFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtLnByb2R1Y3RfaWQgPT09IE51bWJlci5wYXJzZUludChsaW5rZWRQcm9kdWN0LmlkKSkge1xuICAgICAgICAgICAgICAgIGxpbmtlZFByb2R1Y3QucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCRxc0FsbCgnLnByb2R1Y3QtYm9keScpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGlmICghJHFzKCcucHJvZHVjdC1ib2R5JykpIHtcbiAgICAgICAgJHFzKCcjbGlua2VkLXByb2R1Y3RzLXNlY3Rpb24nKT8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgICBzY3JvbGxBZGp1c3RlcigpO1xufVxuZnVuY3Rpb24gaGFzU2FtZUxpbmtlZFByb2R1Y3QocHJvZHVjdElEKSB7XG4gICAgZm9yIChjb25zdCBwcm9kdWN0IG9mICRxc0FsbCgnLnByb2R1Y3QtYm9keScpKXtcbiAgICAgICAgaWYgKE51bWJlci5wYXJzZUludChwcm9kdWN0LmlkKSA9PT0gcHJvZHVjdElEKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBzY3JvbGxSaWdodCgpIHtcbiAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgJHFzKCcjcHJvZHVjdHMtbGlzdCcsICgkZWxlbWVudCk9PiRlbGVtZW50LnNjcm9sbExlZnQgKz0gMzkyXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHNjcm9sbExlZnQoKSB7XG4gICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgICRxcygnI3Byb2R1Y3RzLWxpc3QnLCAoJGVsZW1lbnQpPT4kZWxlbWVudC5zY3JvbGxMZWZ0IC09IDM5MlxuICAgICk7XG59XG5mdW5jdGlvbiBzY3JvbGxBZGp1c3RlcigpIHtcbiAgICBjb25zdCBzY3JvbGxFbmQgPSAkcXMoJyNwcm9kdWN0cy1saXN0Jyk/LnNjcm9sbExlZnQgPyAkcXMoJyNwcm9kdWN0cy1saXN0Jyk/LnNjcm9sbExlZnQgOiAxO1xuICAgIGNvbnN0IG9mZnNldCA9ICRxcygnI3Byb2R1Y3RzLWxpc3QnKT8ub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgc2Nyb2xsV2lkdGggPSAkcXMoJyNwcm9kdWN0cy1saXN0Jyk/LnNjcm9sbFdpZHRoO1xuICAgIGlmICgkcXMoJyNwcm9kdWN0cy1saXN0Jyk/LnNjcm9sbExlZnQgPT09IDApIHtcbiAgICAgICAgJHFzKCcucHJldi1idG4nKT8uY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWVuZCcpO1xuICAgICAgICAkcXMoJy5uZXh0LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxFbmQgJiYgc2Nyb2xsV2lkdGggJiYgb2Zmc2V0ICYmIHNjcm9sbEVuZCArIDEgPj0gc2Nyb2xsV2lkdGggLSBvZmZzZXQpIHtcbiAgICAgICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWVuZCcpO1xuICAgICAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHFzKCcubmV4dC1idG4nKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsLWVuZCcpO1xuICAgICAgICAkcXMoJy5wcmV2LWJ0bicpPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtZW5kJyk7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gc2VuZENhcnRJdGVtcyhfY2FydCwgc2Vzc2lvbklEKSB7XG4gICAgaWYgKCFHTE9CQUwucGhwRGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghR0xPQkFMLnBocERhdGEuaGFzX3ZhbGlkX2tleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICAgICAgICAgJ3Nlc3Npb25faWQnOiBzZXNzaW9uSUQsXG4gICAgICAgICAgICAnaXRlbXMnOiBbXSxcbiAgICAgICAgICAgICdtZXJjaGFudF9uYW1lJzogTWVyY2hhbnRDb25maWd1cmF0aW9uLm5hbWUoKSxcbiAgICAgICAgICAgICdtZXJjaGFudF9ob3N0bmFtZSc6IE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpXG4gICAgICAgIH07XG4gICAgICAgIGF3YWl0IGZldGNoKGdldEJhc2VVUkwoTWVyY2hhbnRDb25maWd1cmF0aW9uLmhvc3ROYW1lKCksIEVudmlyb25tZW50LnRlc3RNb2RlKCkpICsgJ3Nlc3Npb24vaXRlbScsIG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjYXB0dXJlU2VudHJ5RXhjZXB0aW9uKG5ldyBFcnJvcihgU2VuZCBjYXJ0IGl0ZW1zIGZhaWxlZCBvbiAke01lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpfSwgRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbml0T25lQ2xpY2tDaGVja291dCh0ZXN0TW9kZSkge1xuICAgIGNvbnN0IG9uZUNsaWNrVVJMID0gZ2V0T25lQ2xpY2tVUkwobG9jYXRpb24uaG9zdG5hbWUsIHRlc3RNb2RlKTtcbiAgICBjb25zdCAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAkYm9keT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG5cdDxpZnJhbWUgaWQ9XCJvbmUtY2xpY2staWZyYW1lXCIgXG5cdFx0ZnJhbWVib3JkZXI9XCIwXCIgXG5cdFx0YWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCIgXG5cdFx0c2Nyb2xsaW5nPVwibm9cIiBcblx0XHRhbGxvdz1cInBheW1lbnQgKlwiXG5cdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCIgXG5cdFx0dGFiaW5kZXg9XCItMVwiIFxuXHRcdHN0eWxlPVwiYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7IHBhZGRpbmc6IDBweCAhaW1wb3J0YW50OyB3aWR0aDogMXB4ICFpbXBvcnRhbnQ7IG1pbi13aWR0aDogMTAwJSAhaW1wb3J0YW50OyBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7IGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7IHZpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50OyBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDsgaGVpZ2h0OiAxcHggIWltcG9ydGFudDsgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgdXNlci1zZWxlY3Q6IG5vbmUgIWltcG9ydGFudDtcIlxuXHRcdHNyYz1cIiR7b25lQ2xpY2tVUkx9b25lLWNsaWNrLmh0bWxcIlxuXHQ+XG5cdFx0VW5hYmxlIHRvIGxvYWQgUGVhY2hQYXkgT25lIENsaWNrIENoZWNrb3V0IFN1cHBvcnRcblx0PC9pZnJhbWU+YCk7XG59XG4oZnVuY3Rpb24oKSB7XG4gICAgb25XaW5kb3dNZXNzYWdlKCdpbml0JywgYXN5bmMgKG1lc3NhZ2UpPT57XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50SG9zdE5hbWUobWVzc2FnZS5tZXJjaGFudEhvc3RuYW1lKSk7XG4gICAgICAgIGFkZEZvcm1GaWVsZHMobWVzc2FnZS5waHBEYXRhLmxhbmd1YWdlKTtcbiAgICAgICAgR0xPQkFMLnBocERhdGEgPSBtZXNzYWdlLnBocERhdGE7XG4gICAgICAgIGlmICh0eXBlb2YgR0xPQkFMLnBocERhdGEuaGFzX3ZhbGlkX2tleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIEdMT0JBTC5waHBEYXRhLmhhc192YWxpZF9rZXkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHVwZGF0ZU1lcmNoYW50TmFtZShtZXNzYWdlLnBocERhdGEubWVyY2hhbnRfbmFtZSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRGZWF0dXJlU3VwcG9ydChtZXNzYWdlLnBocERhdGEuZmVhdHVyZV9zdXBwb3J0LCBtZXNzYWdlLnBocERhdGEpKTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlTGFuZ3VhZ2UobWVzc2FnZS5waHBEYXRhLmxhbmd1YWdlID09PSAnZGV0ZWN0LWZyb20tcGFnZScgPyBtZXNzYWdlLnBhZ2VMYW5ndWFnZSA6IG1lc3NhZ2UucGhwRGF0YS5sYW5ndWFnZSkpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICBwbHVnaW5Jc1Rlc3RNb2RlOiBCb29sZWFuKG1lc3NhZ2UuaXNUZXN0TW9kZSksXG4gICAgICAgICAgICBwbHVnaW5QYWdlVHlwZTogZGV0ZXJtaW5lUGFnZVR5cGUobWVzc2FnZS5pc0NhcnRQYWdlLCBtZXNzYWdlLmlzQ2hlY2tvdXRQYWdlKSxcbiAgICAgICAgICAgIGN1c3RvbWVySXNNb2JpbGU6IG1lc3NhZ2UuaXNNb2JpbGUsXG4gICAgICAgICAgICBwbHVnaW5CdXR0b25Db2xvcjogbWVzc2FnZS5waHBEYXRhLmJ1dHRvbl9jb2xvcixcbiAgICAgICAgICAgIHBsdWdpblZlcnNpb246IG1lc3NhZ2UucGhwRGF0YS52ZXJzaW9uXG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdE1vZGFsKCk7XG4gICAgICAgIGluaXREZWxpdmVyeURhdGUoKTtcbiAgICAgICAgaW5pdE1ldHJpY3MoKTtcbiAgICAgICAgaW5pdExpbmtlZFByb2R1Y3RzKCk7XG4gICAgICAgIGluaXRPcmRlck5vdGVzKCk7XG4gICAgICAgIGluaXRDYXJ0KCk7XG4gICAgICAgIGluaXRMYW5ndWFnZShtZXNzYWdlKTtcbiAgICAgICAgaW5pdFN1bW1hcnkobWVzc2FnZSk7XG4gICAgICAgIGluaXRDb3Vwb25JbnB1dChtZXNzYWdlKTtcbiAgICAgICAgaW5pdEdpZnRDYXJkSW5wdXQobWVzc2FnZSk7XG4gICAgICAgIGluaXRTaGlwcGluZyhtZXNzYWdlKTtcbiAgICAgICAgaW5pdEN1c3RvbWVyKG1lc3NhZ2UpO1xuICAgICAgICBpbml0Q3VycmVuY3kobWVzc2FnZSk7XG4gICAgICAgIGluaXRNZXJjaGFudEFjY291bnQobWVzc2FnZSk7XG4gICAgICAgIGluaXRWQVQobWVzc2FnZSk7XG4gICAgICAgIGlmIChGZWF0dXJlLmVuYWJsZWQoRmVhdHVyZUZsYWcuQURESVRJT05BTF9GSUVMRFMpKSB7XG4gICAgICAgICAgICByZW5kZXJBZGRpdGlvbmFsRmllbGRzKG1lc3NhZ2UucGhwRGF0YT8uYWRkaXRpb25hbF9maWVsZHMgPz8gW10sIG1lc3NhZ2UucGhwRGF0YT8uYWRkaXRpb25hbF9maWVsZHNfb3JkZXIgPz8gW10pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yZGVyU2VydmljZSA9IGdldE9yZGVyU2VydmljZSgpO1xuICAgICAgICBhd2FpdCBpbml0U3RyaXBlU3VwcG9ydChtZXNzYWdlLCBvcmRlclNlcnZpY2UpO1xuICAgICAgICBhd2FpdCBpbml0UGF5UGFsU3VwcG9ydChtZXNzYWdlLCBvcmRlclNlcnZpY2UpO1xuICAgICAgICBjb25zdCBzZXNzaW9uUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRCYXNlVVJMKE1lcmNoYW50Q29uZmlndXJhdGlvbi5ob3N0TmFtZSgpLCBFbnZpcm9ubWVudC50ZXN0TW9kZSgpKSArICdzZXNzaW9uJyk7XG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzZXNzaW9uUmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVTZXNzaW9uSWQoc2Vzc2lvbi5pZCkpO1xuICAgICAgICBhd2FpdCBzZW5kQ2FydEl0ZW1zKERlZmF1bHRDYXJ0LmNvbnRlbnRzKCksIHNlc3Npb24uaWQpO1xuICAgICAgICBpbml0T25lQ2xpY2tDaGVja291dChtZXNzYWdlLmlzVGVzdE1vZGUpO1xuICAgICAgICBvbldpbmRvd01lc3NhZ2UoJ3BwLW9uZS1jbGljay1sb2FkZWQnLCBhc3luYyAoKT0+e1xuICAgICAgICAgICAgYXdhaXQgbG9hZEN1c3RvbWVyKCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzdGFydE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIGF3YWl0IHJlcXVlc3RDYXJ0Q2FsY3VsYXRpb24oIUVudmlyb25tZW50LmN1c3RvbWVyLmV4aXN0aW5nKCkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc3RvcE1vZGFsTG9hZGluZygpKTtcbiAgICAgICAgICAgIHNlbGYucGFyZW50Py5wb3N0TWVzc2FnZSgnbG9hZGVkJywgJyonKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KSgpO1xuZnVuY3Rpb24gYWRkRm9ybUZpZWxkcyhsYW5nKSB7XG4gICAgbGV0IGZvcm0gPSBkZWZhdWx0Rm9ybUhUTUw7XG4gICAgaWYgKGxhbmcgPT09ICdqYScpIHtcbiAgICAgICAgZm9ybSA9IGphcGFuZXNlRm9ybUhUTUw7XG4gICAgfVxuICAgIGlmIChNZXJjaGFudENvbmZpZ3VyYXRpb24uaG9zdE5hbWUoKSA9PT0gJ2luaXRpYWxhdWRpby5jb20nKSB7XG4gICAgICAgIGZvcm0gPSBjaGVja291dEZvcm1Ob1Bob25lTm9BcHQ7XG4gICAgfVxuICAgICRxcygnI3BwLWluZm8nKT8uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBmb3JtKTtcbn1cbiJdfQ==