!function(){"use strict";var e={465:function(e,t,n){n.d(t,{J:function(){return u}});var r="https://js.stripe.com/v3",o=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,a="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",i=null,s=Promise.resolve().then((function(){return e=null,null!==i||(i=new Promise((function(t,n){if("undefined"!=typeof window&&"undefined"!=typeof document)if(window.Stripe&&e&&console.warn(a),window.Stripe)t(window.Stripe);else try{var i=function(){for(var e=document.querySelectorAll('script[src^="'.concat(r,'"]')),t=0;t<e.length;t++){var n=e[t];if(o.test(n.src))return n}return null}();i&&e?console.warn(a):i||(i=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(r).concat(t);var o=document.head||document.body;if(!o)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return o.appendChild(n),n}(e)),i.addEventListener("load",(function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))})),i.addEventListener("error",(function(){n(new Error("Failed to load Stripe.js"))}))}catch(e){return void n(e)}else t(null)}))),i;var e})),c=!1;s.catch((function(e){c||console.warn(e)}));var u=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];c=!0;var r=Date.now();return s.then((function(e){return function(e,t,n){if(null===e)return null;var r=e.apply(void 0,t);return function(e,t){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"2.2.0",startTime:t})}(r,n),r}(e,t,r)}))}},127:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(86),o=n(412),a=n(736);function i(e){return e.currency?(0,r.createElement)("div",{style:{display:"flex",flexDirection:"column"}},(0,r.createElement)("p",{style:{textAlign:"justify",margin:"0.5rem 0 0",fontSize:"smaller"}},e.name," ",(0,a.__)("does not support the currency you currently have chosen.","peachpay-for-woocommerce")," ",(0,r.createElement)("b",null,(0,a.__)("Update to","peachpay-for-woocommerce")," ",e.currency)," ",(0,a.__)("below to use this payment method.","peachpay-for-woocommerce")),(0,r.createElement)("button",{type:"button",className:"button currency-fallback-button",style:{fontSize:"smaller",marginBottom:"16px"},onClick:function(){e.currency&&((0,o.k)(e.currency),window.location.reload())}},(0,a.__)("Update to","peachpay-for-woocommerce")," ",e.currency)):null}},583:function(e,t,n){n.d(t,{Jb:function(){return c},Nm:function(){return u}});var r=n(861),o=n(284),a=n.n(o),i=n(465),s=(n(877),n(22)),c=function(){var e=(0,r.Z)(a().mark((function e(t,n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){try{if(window.peachpay_stripe)return void e(window.peachpay_stripe);window.peachpay_stripe=(0,i.J)(t,{locale:"auto",stripeAccount:n}),e(window.peachpay_stripe)}catch(t){e(t.message)}})));case 1:case"end":return e.stop()}}),e)})));return function(_x,t){return e.apply(this,arguments)}}();function u(e){var t,n=s.z.object({data:s.z.object({client_secret:s.z.string()}),intermediate_url:s.z.string(),success_url:s.z.string(),transaction_id:s.z.string()});try{t=JSON.parse(atob(decodeURIComponent(e)))}catch(e){return console.error(e),null}var r=n.safeParse(t);return r.success?r.data:(console.error(r.error),null)}s.z.object({setup_intent_details:s.z.object({client_secret:s.z.string()})})},412:function(e,t,n){function r(e){document.cookie=`pp_active_currency=${e};path=/`}n.d(t,{k:function(){return r}})},906:function(e,t,n){function r(e){return function(e){if(function(e){return"object"==typeof e&&null!==e&&"message"in e&&"string"==typeof e.message}(e))return e;try{return new Error(JSON.stringify(e))}catch(t){return new Error(String(e))}}(e).message}n.d(t,{e$:function(){return r}})},877:function(e,t,n){n(284)},86:function(e){e.exports=window.React},284:function(e){e.exports=window.regeneratorRuntime},22:function(e){e.exports=window.peachpay_checkout_blocks},613:function(e){e.exports=window.wc.wcBlocksRegistry},617:function(e){e.exports=window.wc.wcSettings},629:function(e){e.exports=window.wp.htmlEntities},736:function(e){e.exports=window.wp.i18n},907:function(e,t,n){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},878:function(e,t,n){function r(e){if(Array.isArray(e))return e}n.d(t,{Z:function(){return r}})},861:function(e,t,n){function r(e,t,n,r,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function s(e){r(i,o,a,s,c,"next",e)}function c(e){r(i,o,a,s,c,"throw",e)}s(void 0)}))}}n.d(t,{Z:function(){return o}})},902:function(e,t,n){function r(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,s=[],c=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw o}}return s}}n.d(t,{Z:function(){return r}})},267:function(e,t,n){function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,{Z:function(){return r}})},324:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(878),o=n(902),a=n(181),i=n(267);function s(e,t){return(0,r.Z)(e)||(0,o.Z)(e,t)||(0,a.Z)(e,t)||(0,i.Z)()}},181:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(907);function o(e,t){if(e){if("string"==typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.Z)(e,t):void 0}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e=n(324),t=n(861),r=n(86),o=n(284),a=n.n(o),i=n(736),s=n(613),c=n(617),u=n(629),l=n(583),p=n(22),d=n(127),f=n(906),m=p.z.object({connect_id:p.z.string(),currency_fallback_required:p.z.string().nullable(),description:p.z.string(),icon_url:p.z.string(),public_key:p.z.string(),setup_intent_nonce:p.z.string(),setup_intent_url:p.z.string(),supports:p.z.string().array(),title:p.z.string()}).safeParse((0,c.getSetting)("peachpay_stripe_eps_data",!1));if(!m.success)throw new Error(`PeachPay Stripe EPS data is not available \n\n${m.error.message}`);var y=m.data,h=(0,u.decodeEntities)(y.title),w=(0,u.decodeEntities)(y.description);(0,l.Jb)(y.public_key,y.connect_id).then((function(n){if(null===n)throw new Error((0,i.__)("Stripe is null","peachpay-for-woocommerce"));if("string"==typeof n)throw new Error(n);var o=function(o){var s=o.emitResponse,c=o.eventRegistration,u=o.billing,m=c.onPaymentSetup,g=c.onCheckoutSuccess,_=c.onCheckoutFail;return(0,r.useEffect)((function(){return m((0,t.Z)(a().mark((function e(){var t,r,o,c,l;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,p.startTransaction)("peachpay_stripe_eps");case 3:if(!(t=e.sent).error){e.next=6;break}return e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,f.e$)(t.error)});case 6:if(void 0!==t.result){e.next=8;break}return e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,i.__)("Missing transaction ID","peachpay-for-woocommerce")});case 8:return r=t.result,e.next=11,n.createPaymentMethod({type:"eps",eps:{},billing_details:{name:`${u.billingAddress.first_name} ${u.billingAddress.last_name}`,email:u.billingAddress.email,phone:u.billingAddress.phone,address:{city:u.billingAddress.city,country:u.billingAddress.country,line1:u.billingAddress.address_1,line2:u.billingAddress.address_2,postal_code:u.billingAddress.postcode,state:u.billingAddress.state}}});case 11:if(o=e.sent,c=o.paymentMethod,!o.error&&c.id){e.next=19;break}return l=(0,i.__)("Failed to create payment method","peachpay-for-woocommerce"),e.next=18,(0,p.updateTransaction)(r,{paymentStatus:"creationfailed",note:l});case 18:return e.abrupt("return",{type:s.responseTypes.ERROR,message:l});case 19:return e.abrupt("return",{type:s.responseTypes.SUCCESS,meta:{paymentMethodData:{peachpay_transaction_id:r,peachpay_stripe_payment_method_id:c.id}}});case 22:return e.prev=22,e.t0=e.catch(0),e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,f.e$)(e.t0)});case 25:case"end":return e.stop()}}),e,null,[[0,22]])}))))}),[u.billingAddress,m]),(0,r.useEffect)((function(){var r=g(function(){var r=(0,t.Z)(a().mark((function t(r){var o,c,u,d,f,m,y,h,w,g,_,v,b,x,E,S;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=new URL(r.redirectUrl),c=o.hash.split("="),u=(0,e.Z)(c,2),d=u[0],f=u[1],""!==o.hash&&"#payment_data"===d&&f){t.next=4;break}return t.abrupt("return");case 4:if(null!==(m=(0,l.Nm)(f))){t.next=7;break}return t.abrupt("return",{type:s.responseTypes.ERROR,message:(0,i.__)("Failed to parse payment data","peachpay-for-woocommerce")});case 7:return y=m.transaction_id,h=m.data.client_secret,w=m.intermediate_url,g=m.success_url,t.next=13,n.confirmEpsPayment(h,{return_url:w});case 13:if(_=t.sent,v=_.paymentIntent,!(b=_.error)){t.next=21;break}return E=null!==(x=null==b?void 0:b.message)&&void 0!==x?x:(0,i.__)("Failed to confirm payment intent.","peachpay-for-woocommerce"),t.next=20,(0,p.updateTransaction)(y,{note:E});case 20:return t.abrupt("return",{type:s.responseTypes.ERROR,message:E,messageContext:s.noticeContexts.PAYMENTS});case 21:if(!v){t.next=23;break}return t.abrupt("return",{type:s.responseTypes.SUCCESS,redirectUrl:g});case 23:return S=(0,i.__)("Payment intent missing","peachpay-for-woocommerce"),t.next=26,(0,p.updateTransaction)(y,{note:S});case 26:return t.abrupt("return",{type:s.responseTypes.ERROR,message:S,messageContext:s.noticeContexts.PAYMENTS});case 27:case"end":return t.stop()}}),t)})));return function(_x){return r.apply(this,arguments)}}());return r}),[g]),(0,r.useEffect)((function(){return _((function(e){var t,n,r;return(null===(t=e.processingResponse)||void 0===t?void 0:t.paymentStatus)===s.responseTypes.FAIL?{type:s.responseTypes.FAIL,message:e.processingResponse.paymentDetails.message,messageContext:s.noticeContexts.PAYMENTS}:{type:s.responseTypes.FAIL,message:null!==(n=null===(r=e.processingResponse)||void 0===r?void 0:r.message)&&void 0!==n?n:(0,i.__)("Checkout failed unexpectedly","peachpay-for-woocommerce")+`${JSON.stringify(e)}`,messageContext:s.noticeContexts.PAYMENTS}}))}),[_]),y.currency_fallback_required?(0,r.createElement)(d.Z,{name:h,currency:y.currency_fallback_required}):(0,r.createElement)(r.Fragment,null,(0,r.createElement)("img",{style:{maxHeight:"25px"},src:y.icon_url}),(0,r.createElement)("p",{style:{textAlign:"left",margin:"0.5rem 0 0"}},w))};(0,s.registerPaymentMethod)({ariaLabel:h,canMakePayment(e){return e.paymentMethods.includes("peachpay_stripe_eps")},content:(0,r.createElement)(o,null),edit:(0,r.createElement)(o,null),label:(0,r.createElement)((function(e){var t=e.components,n=t.PaymentMethodLabel,o=t.PaymentMethodIcons;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(n,{text:h}),(0,r.createElement)(o,{className:"pp-label-icon",icons:[{id:"peachpay_stripe_eps",src:y.icon_url,alt:h}]}))}),null),name:"peachpay_stripe_eps",supports:{features:y.supports,showSavedCards:!1,showSaveOption:!1}})})).catch((function(e){throw new Error((0,f.e$)(e))}))}()}();
//# sourceMappingURL=peachpay_stripe_eps-blocks.js.map