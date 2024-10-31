!function(){"use strict";var e={465:function(e,t,n){n.d(t,{J:function(){return u}});var r="https://js.stripe.com/v3",a=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,o="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",c=null,s=Promise.resolve().then((function(){return e=null,null!==c||(c=new Promise((function(t,n){if("undefined"!=typeof window&&"undefined"!=typeof document)if(window.Stripe&&e&&console.warn(o),window.Stripe)t(window.Stripe);else try{var c=function(){for(var e=document.querySelectorAll('script[src^="'.concat(r,'"]')),t=0;t<e.length;t++){var n=e[t];if(a.test(n.src))return n}return null}();c&&e?console.warn(o):c||(c=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(r).concat(t);var a=document.head||document.body;if(!a)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return a.appendChild(n),n}(e)),c.addEventListener("load",(function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))})),c.addEventListener("error",(function(){n(new Error("Failed to load Stripe.js"))}))}catch(e){return void n(e)}else t(null)}))),c;var e})),i=!1;s.catch((function(e){i||console.warn(e)}));var u=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];i=!0;var r=Date.now();return s.then((function(e){return function(e,t,n){if(null===e)return null;var r=e.apply(void 0,t);return function(e,t){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"2.2.0",startTime:t})}(r,n),r}(e,t,r)}))}},127:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(86),a=n(412),o=n(736);function c(e){return e.currency?(0,r.createElement)("div",{style:{display:"flex",flexDirection:"column"}},(0,r.createElement)("p",{style:{textAlign:"justify",margin:"0.5rem 0 0",fontSize:"smaller"}},e.name," ",(0,o.__)("does not support the currency you currently have chosen.","peachpay-for-woocommerce")," ",(0,r.createElement)("b",null,(0,o.__)("Update to","peachpay-for-woocommerce")," ",e.currency)," ",(0,o.__)("below to use this payment method.","peachpay-for-woocommerce")),(0,r.createElement)("button",{type:"button",className:"button currency-fallback-button",style:{fontSize:"smaller",marginBottom:"16px"},onClick:function(){e.currency&&((0,a.k)(e.currency),window.location.reload())}},(0,o.__)("Update to","peachpay-for-woocommerce")," ",e.currency)):null}},583:function(e,t,n){n.d(t,{Jb:function(){return u},Nm:function(){return f},Rp:function(){return l}});var r=n(861),a=n(284),o=n.n(a),c=n(465),s=n(877),i=n(22),u=function(){var e=(0,r.Z)(o().mark((function e(t,n){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){try{if(window.peachpay_stripe)return void e(window.peachpay_stripe);window.peachpay_stripe=(0,c.J)(t,{locale:"auto",stripeAccount:n}),e(window.peachpay_stripe)}catch(t){e(t.message)}})));case 1:case"end":return e.stop()}}),e)})));return function(_x,t){return e.apply(this,arguments)}}(),p=i.z.object({setup_intent_details:i.z.object({client_secret:i.z.string()})});function l(e){return d.apply(this,arguments)}function d(){return(d=(0,r.Z)(o().mark((function e(t){var n,r,a,c,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("security",t.setup_intent_nonce),n.append("payment_method_type",t.payment_method_type),t.payment_method_ID&&n.append("payment_method",t.payment_method_ID),e.next=6,(0,s.Fi)(t.setup_intent_url,{method:"POST",body:n});case 6:if(r=e.sent,a=r.error,c=r.result,!a&&null!=c&&c.data){e.next=11;break}return e.abrupt("return",null);case 11:if((i=p.safeParse(c.data)).success){e.next=14;break}return e.abrupt("return",null);case 14:return e.abrupt("return",i.data);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){var t,n=i.z.object({data:i.z.object({client_secret:i.z.string()}),intermediate_url:i.z.string(),success_url:i.z.string(),transaction_id:i.z.string()});try{t=JSON.parse(atob(decodeURIComponent(e)))}catch(e){return console.error(e),null}var r=n.safeParse(t);return r.success?r.data:(console.error(r.error),null)}},412:function(e,t,n){function r(e){document.cookie=`pp_active_currency=${e};path=/`}n.d(t,{k:function(){return r}})},906:function(e,t,n){function r(e){return function(e){if(function(e){return"object"==typeof e&&null!==e&&"message"in e&&"string"==typeof e.message}(e))return e;try{return new Error(JSON.stringify(e))}catch(t){return new Error(String(e))}}(e).message}n.d(t,{e$:function(){return r}})},877:function(e,t,n){n.d(t,{Fi:function(){return c}});var r=n(861),a=n(284),o=n.n(a);function c(e,t){return s.apply(this,arguments)}function s(){return s=(0,r.Z)(o().mark((function e(t,n){var a,c=arguments;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=c.length>2&&void 0!==c[2]?c[2]:/\{\s*"[\s\S]*[^{}]*\}/g,e.abrupt("return",fetch(t,n).then(function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.text());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){try{return{result:JSON.parse(e)}}catch(n){var t=a.exec(e);return null!==t&&t[0]?(console.log("Fixed malformed JSON. Original:"),console.log(e),{result:JSON.parse(t[0])}):(console.log("Unable to fix malformed JSON"),{error:n})}})).catch((function(e){return{error:e}})));case 2:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},86:function(e){e.exports=window.React},284:function(e){e.exports=window.regeneratorRuntime},22:function(e){e.exports=window.peachpay_checkout_blocks},613:function(e){e.exports=window.wc.wcBlocksRegistry},617:function(e){e.exports=window.wc.wcSettings},629:function(e){e.exports=window.wp.htmlEntities},736:function(e){e.exports=window.wp.i18n},907:function(e,t,n){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},878:function(e,t,n){function r(e){if(Array.isArray(e))return e}n.d(t,{Z:function(){return r}})},861:function(e,t,n){function r(e,t,n,r,a,o,c){try{var s=e[o](c),i=s.value}catch(e){return void n(e)}s.done?t(i):Promise.resolve(i).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var c=e.apply(t,n);function s(e){r(c,a,o,s,i,"next",e)}function i(e){r(c,a,o,s,i,"throw",e)}s(void 0)}))}}n.d(t,{Z:function(){return a}})},902:function(e,t,n){function r(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,c,s=[],i=!0,u=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=o.call(n)).done)&&(s.push(r.value),s.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw a}}return s}}n.d(t,{Z:function(){return r}})},267:function(e,t,n){function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,{Z:function(){return r}})},324:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(878),a=n(902),o=n(181),c=n(267);function s(e,t){return(0,r.Z)(e)||(0,a.Z)(e,t)||(0,o.Z)(e,t)||(0,c.Z)()}},181:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(907);function a(e,t){if(e){if("string"==typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,r.Z)(e,t):void 0}}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e=n(324),t=n(861),r=n(86),a=n(284),o=n.n(a),c=n(736),s=n(613),i=n(617),u=n(629),p=n(583),l=n(22),d=n(127),f=n(906),m=l.z.object({connect_id:l.z.string(),currency_fallback_required:l.z.string().nullable(),description:l.z.string(),icon_url:l.z.string(),public_key:l.z.string(),setup_intent_nonce:l.z.string(),setup_intent_url:l.z.string(),supports:l.z.string().array(),title:l.z.string()}).safeParse((0,i.getSetting)("peachpay_stripe_achdebit_data",!1));if(!m.success)throw new Error(`PeachPay Stripe ACH Debit data is not available \n\n${m.error.message}`);var y=m.data,h=(0,u.decodeEntities)(y.title),_=(0,u.decodeEntities)(y.description);function w(){var e,t=null===(e=window.top)||void 0===e?void 0:e.location.hostname;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)("hr",{style:{margin:"0.5rem 0"}}),(0,r.createElement)("p",null,"By placing an order, you authorize ",(0,r.createElement)("strong",null,t)," to debit the bank account specified for any amount owed for charges arising from your use of"," ",(0,r.createElement)("strong",null,t),"'s services and/or purchase of products from"," ",(0,r.createElement)("strong",null,t),", pursuant to ",(0,r.createElement)("strong",null,t),"'s website and terms, until this authorization is revoked. You may amend or cancel this authorization at any time by providing notice to ",(0,r.createElement)("strong",null,t)," with 30 (thirty) days notice."))}(0,p.Jb)(y.public_key,y.connect_id).then((function(n){if(null===n)throw new Error((0,c.__)("Stripe is null","peachpay-for-woocommerce"));if("string"==typeof n)throw new Error(n);var a=function(a){var s=a.emitResponse,i=a.eventRegistration,u=a.billing,m=i.onPaymentSetup,b=i.onCheckoutSuccess,g=i.onCheckoutFail;return(0,r.useEffect)((function(){return m((0,t.Z)(o().mark((function e(){var t,r,a,i,d,m,h,_,w,b,g;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,l.startTransaction)("peachpay_stripe_achdebit");case 3:if(!(t=e.sent).error){e.next=6;break}return e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,f.e$)(t.error)});case 6:if(void 0!==t.result){e.next=8;break}return e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,c.__)("Missing transaction ID","peachpay-for-woocommerce")});case 8:return r=t.result,e.next=11,(0,p.Rp)({payment_method_type:"us_bank_account",setup_intent_url:y.setup_intent_url,setup_intent_nonce:y.setup_intent_nonce});case 11:if(null!==(a=e.sent)){e.next=17;break}return i=(0,c.__)("Failed to create setup intent.","peachpay-for-woocommerce"),e.next=16,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:i});case 16:return e.abrupt("return",{type:s.responseTypes.ERROR,message:i});case 17:return e.next=19,n.collectBankAccountForSetup({clientSecret:a.setup_intent_details.client_secret,params:{payment_method_type:"us_bank_account",payment_method_data:{billing_details:{email:u.billingAddress.email,name:u.billingAddress.first_name+" "+u.billingAddress.last_name}}}});case 19:if(!(d=e.sent).error&&d.setupIntent){e.next=25;break}return m=(0,c.__)("Failed to collect bank account.","peachpay-for-woocommerce"),e.next=24,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:m});case 24:return e.abrupt("return",{type:s.responseTypes.ERROR,message:m});case 25:if("requires_confirmation"===d.setupIntent.status){e.next=30;break}return h=(0,c.__)("Cancelled choosing a bank account.","peachpay-for-woocommerce"),e.next=29,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:h});case 29:return e.abrupt("return",{type:s.responseTypes.ERROR,message:h});case 30:return e.next=32,n.confirmUsBankAccountSetup(a.setup_intent_details.client_secret);case 32:if(!(_=e.sent).error&&_.setupIntent){e.next=38;break}return w=(0,c.__)("Failed to confirm setup intent.","peachpay-for-woocommerce"),e.next=37,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:w});case 37:return e.abrupt("return",{type:s.responseTypes.ERROR,message:w});case 38:if("succeeded"===_.setupIntent.status){e.next=43;break}return b=(0,c.__)("Setup intent resulted in an invalid status","peachpay-for-woocommerce")+`: ${_.setupIntent.status}`,e.next=42,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:b});case 42:return e.abrupt("return",{type:s.responseTypes.ERROR,message:b});case 43:if("object"!=typeof _.setupIntent.payment_method&&null!==_.setupIntent.payment_method){e.next=48;break}return g=(0,c.__)("Payment method invalid type:","peachpay-for-woocommerce")+`(${typeof _.setupIntent.payment_method})`,e.next=47,(0,l.updateTransaction)(r,{paymentStatus:"creationfailed",note:g});case 47:return e.abrupt("return",{type:s.responseTypes.ERROR,message:g});case 48:return e.abrupt("return",{type:s.responseTypes.SUCCESS,meta:{paymentMethodData:{peachpay_transaction_id:r,peachpay_stripe_payment_method_id:_.setupIntent.payment_method}}});case 51:return e.prev=51,e.t0=e.catch(0),e.abrupt("return",{type:s.responseTypes.ERROR,message:(0,f.e$)(e.t0)});case 54:case"end":return e.stop()}}),e,null,[[0,51]])}))))}),[u.billingAddress,m]),(0,r.useEffect)((function(){var r=b(function(){var r=(0,t.Z)(o().mark((function t(r){var a,i,u,d,f,m,y,h,_,w,b,g,v,x,E;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=new URL(r.redirectUrl),i=a.hash.split("="),u=(0,e.Z)(i,2),d=u[0],f=u[1],""!==a.hash&&"#payment_data"===d&&f){t.next=4;break}return t.abrupt("return");case 4:if(null!==(m=(0,p.Nm)(f))){t.next=7;break}return t.abrupt("return",{type:s.responseTypes.ERROR,message:(0,c.__)("Failed to parse payment data","peachpay-for-woocommerce")});case 7:return y=m.transaction_id,h=m.data.client_secret,_=m.success_url,t.next=12,n.retrievePaymentIntent(h);case 12:if(w=t.sent,b=w.paymentIntent,!(g=w.error)){t.next=20;break}return x=null!==(v=null==g?void 0:g.message)&&void 0!==v?v:(0,c.__)("Failed to retrieve payment intent.","peachpay-for-woocommerce"),t.next=19,(0,l.updateTransaction)(y,{note:x});case 19:return t.abrupt("return",{type:s.responseTypes.ERROR,message:x,messageContext:s.noticeContexts.PAYMENTS});case 20:if(!b){t.next=22;break}return t.abrupt("return",{type:s.responseTypes.SUCCESS,redirectUrl:_});case 22:return E=(0,c.__)("Payment intent missing","peachpay-for-woocommerce"),t.next=25,(0,l.updateTransaction)(y,{note:E});case 25:return t.abrupt("return",{type:s.responseTypes.ERROR,message:E,messageContext:s.noticeContexts.PAYMENTS});case 26:case"end":return t.stop()}}),t)})));return function(_x){return r.apply(this,arguments)}}());return r}),[b]),(0,r.useEffect)((function(){return g((function(e){var t,n,r;return(null===(t=e.processingResponse)||void 0===t?void 0:t.paymentStatus)===s.responseTypes.FAIL?{type:s.responseTypes.FAIL,message:e.processingResponse.paymentDetails.message,messageContext:s.noticeContexts.PAYMENTS}:{type:s.responseTypes.FAIL,message:null!==(n=null===(r=e.processingResponse)||void 0===r?void 0:r.message)&&void 0!==n?n:(0,c.__)("Checkout failed unexpectedly","peachpay-for-woocommerce")+`${JSON.stringify(e)}`,messageContext:s.noticeContexts.PAYMENTS}}))}),[g]),y.currency_fallback_required?(0,r.createElement)(d.Z,{name:h,currency:y.currency_fallback_required}):(0,r.createElement)(r.Fragment,null,(0,r.createElement)("img",{style:{maxHeight:"25px"},src:y.icon_url}),(0,r.createElement)("p",{style:{textAlign:"left",margin:"0.5rem 0 0"}},_),(0,r.createElement)(w,null))};(0,s.registerPaymentMethod)({ariaLabel:h,canMakePayment(e){return e.paymentMethods.includes("peachpay_stripe_achdebit")},content:(0,r.createElement)(a,null),edit:(0,r.createElement)(a,null),label:(0,r.createElement)((function(e){var t=e.components,n=t.PaymentMethodLabel,a=t.PaymentMethodIcons;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(n,{text:h}),(0,r.createElement)(a,{className:"pp-label-icon",icons:[{id:"peachpay_stripe_achdebit",src:y.icon_url,alt:h}]}))}),null),name:"peachpay_stripe_achdebit",supports:{features:y.supports,showSavedCards:!1,showSaveOption:!1}})})).catch((function(e){throw new Error((0,f.e$)(e))}))}()}();
//# sourceMappingURL=peachpay_stripe_achdebit-blocks.js.map