!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e005dc4b-3d68-4b42-9822-748288c883cb",e._sentryDebugIdIdentifier="sentry-dbid-e005dc4b-3d68-4b42-9822-748288c883cb")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"1.107.0"},(()=>{"use strict";function e(){var e=function(e,n){void 0===n&&(n=null);var d=document.querySelector(e);return d&&null!==n&&n(d),d}("ul.woocommerce-PaymentMethods.payment_methods.methods");e&&e.querySelectorAll("li").forEach((function(e){e.className.includes("peachpay")&&!e.className.includes("payment_method_peachpay_stripe_card")&&e.remove()}))}document.addEventListener("DOMContentLoaded",(function(){e()}))})();
//# sourceMappingURL=add-payment-method.bundle.js.map