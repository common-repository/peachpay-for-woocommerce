!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},a=(new Error).stack;a&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[a]="0cbcc71f-fe8f-41bc-b77f-0617ee19ad5d",e._sentryDebugIdIdentifier="sentry-dbid-0cbcc71f-fe8f-41bc-b77f-0617ee19ad5d")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"1.99.6"},(self.webpackChunkpeachpay_for_woocommerce=self.webpackChunkpeachpay_for_woocommerce||[]).push([[432],{1985:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var t=n(3940),o=n(3458),c=n(3984),r=n(1682),s=n(2815),i=n(7246),u=n(8072),d=n(3629);function l(){o.h.subscribe((function(){var e,a,n,t;e=c.hv.selectedGateway(),a=r.qA.modalUI.loadingMode(),n=u.z9.total(),t=u.z9.subscriptionPresent(),e.includes("peachpay_amazonpay")&&"finished"===a&&!t&&n>0?(0,d.HD)(".amazon-pay-payment-container").forEach((function(e){e.classList.remove("hide")})):(0,d.HD)(".amazon-pay-payment-container").forEach((function(e){e.classList.add("hide")}))}))}var p=n(7150),h=n(8472),m=n(4209);function y(){var e=p.gx.shipping,a=e.firstName,n=e.lastName,o=e.address1,c=e.address2,r=e.city,s=e.state,i=e.postal,u=e.country,d=e.phone,l=0===c().length?{}:{addressLine1:c()};return(0,t.pi)({name:a()+" "+n(),addressLine1:o(),city:r(),stateOrRegion:s(),postalCode:i(),countryCode:u(),phoneNumber:d()},l)}function f(e){switch(e){case"US":return"https://static-na.payments-amazon.com/checkout.js";case"JP":return"https://static-fe.payments-amazon.com/checkout.js";case"GB":case"DK":case"FR":case"DE":case"HU":case"IT":case"LU":case"AW":case"PT":case"ES":case"SE":return"https://static-eu.payments-amazon.com/checkout.js";default:return}}function b(e){return(0,t.mG)(this,void 0,void 0,(function(){var a;return(0,t.Jh)(this,(function(n){switch(n.label){case 0:return[4,fetch(r.qA.peachpayAPIUrl()+"api/v1/amazonpay/signature",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session:{id:m.Z5.sessionId(),merchant_id:s.l9.id(),merchant_url:s.l9.hostName(),merchant_name:s.l9.name(),plugin_version:r.qA.plugin.version(),platform:"woocommerce"},transaction:{amazonpay:{payload:e,sandbox:!1}}})})];case 1:return(a=n.sent()).ok?[4,a.json()]:[2,""];case 2:return[2,n.sent().signature]}}))}))}function v(e){var a,n,o;return(0,t.mG)(this,void 0,void 0,(function(){var c,i,d,l,p,h,m;return(0,t.Jh)(this,(function(f){switch(f.label){case 0:return c=null!==(a=r.L0.metadata("amazonpay_payment_method","public_key_id"))&&void 0!==a?a:"",i=null!==(n=r.L0.metadata("amazonpay_payment_method","store_id"))&&void 0!==n?n:"",d=null!==(o=r.L0.metadata("amazonpay_payment_method","merchant_id"))&&void 0!==o?o:"",l=s.l9.currency.configuration().number_of_decimals,p=u.z9.virtual()?{}:{addressDetails:y()},[4,b(h=(0,t.pi)({webCheckoutDetails:{checkoutResultReturnUrl:e,checkoutMode:"ProcessOrder"},storeId:i,scopes:["name","email","phoneNumber","billingAddress"],paymentDetails:{paymentIntent:"AuthorizeWithCapture",chargeAmount:{amount:u.AQ.total().toFixed(l),currencyCode:s.l9.currency.code()},presentmentCurrency:s.l9.currency.code()}},p))];case 1:return m=f.sent(),[2,{publicKeyId:c,storeId:i,merchantId:d,addressDetails:p,sandbox:!1,payload:h,signature:m}]}}))}))}const g=n.p+"img/f3896d63aa9fcf4e95c0-amazon.svg",_=n.p+"img/2c43108c2527a9ce8f67-amazon-pay-card.svg";var z=n(6159),w=n(5077),I=n(4681),k=n(4284);function A(e){return(0,t.mG)(this,void 0,void 0,(function(){var a=this;return(0,t.Jh)(this,(function(n){switch(n.label){case 0:return[4,(0,d.ve)("https://static-na.payments-amazon.com/checkout.js","amazon",(function(){var n,s;n={},{}[(s={config:{name:"Amazon Pay",gatewayId:"peachpay_amazonpay",description:"Please click the Amazon Pay button to complete your checkout.",assets:{title:{src:_},badge:{src:g}}}}).config.gatewayId]=s,n[s.config.gatewayId]=s.config,o.h.dispatch((0,c.Cj)(n)),l();var i="",d=r.qA.modalUI.page();o.h.subscribe((function(){return(0,t.mG)(a,void 0,void 0,(function(){return(0,t.Jh)(this,(function(a){switch(a.label){case 0:return 0===u.AQ.total()?[2]:"peachpay_amazonpay"===c.hv.selectedGateway()&&"peachpay_amazonpay"!==i||"peachpay_amazonpay"===c.hv.selectedGateway()&&"payment"===r.qA.modalUI.page()&&"payment"!==d?(i="peachpay_amazonpay",d="payment",[4,C(e)]):[3,2];case 1:a.sent(),a.label=2;case 2:return c.hv.selectedGateway()!==i&&(i=c.hv.selectedGateway()),r.qA.modalUI.page()!==d&&(d=r.qA.modalUI.page()),[2]}}))}))}))}))];case 1:return n.sent(),[2]}}))}))}function C(e){var a,n,o;return(0,t.mG)(this,void 0,void 0,(function(){var c,r=this;return(0,t.Jh)(this,(function(i){switch(i.label){case 0:return(null===(a=w.a.checkoutData)||void 0===a?void 0:a.plugin_asset_url)?((0,d.HD)(".pp-amazon-pay-btn-container",(function(e){var a=e.id,n=e.parentElement;null==n||n.replaceChildren(),null!==n&&(n.innerHTML="");var t='<div id="'.concat(a,'" class=""></div>');null==n||n.insertAdjacentHTML("beforeend",t)})),null===(n=(0,d.MW)("#amazon-pay-btn-container"))||void 0===n||n.classList.add("pp-amazon-pay-btn-container"),null===(o=(0,d.MW)("#amazon-pay-btn-container-mobile"))||void 0===o||o.classList.add("pp-amazon-pay-btn-container"),[4,v("".concat(w.a.checkoutData.plugin_asset_url,"public/amazon-checkout.html"))]):[2];case 1:return c=i.sent(),["#amazon-pay-btn-container","#amazon-pay-btn-container-mobile"].forEach((function(a){amazon.Pay.renderButton(a,{merchantId:c.merchantId,publicKeyId:c.publicKeyId,ledgerCurrency:s.l9.currency.code(),checkoutLanguage:"en_US",productType:u.z9.virtual()?"PayOnly":"PayAndShip",placement:"Cart",buttonColor:"Gold",sandbox:c.sandbox}).onClick((function(){return(0,t.mG)(r,void 0,void 0,(function(){var a,n,o;return(0,t.Jh)(this,(function(t){switch(t.label){case 0:return(null===(n=w.a.checkoutData)||void 0===n?void 0:n.plugin_asset_url)?(null===(o=(0,d.MW)("body"))||void 0===o||o.classList.add("pp-disabled"),a="".concat(w.a.checkoutData.plugin_asset_url,"public/amazon-checkout.html"),[4,P(c,a,e)]):[2];case 1:return t.sent(),[2]}}))}))}))})),[2]}}))}))}function P(e,a,n){return(0,t.mG)(this,void 0,void 0,(function(){var c,l,h,y,b,v,g,_,w,A,C,P=this;return(0,t.Jh)(this,(function(L){switch(L.label){case 0:return c=s.l9.currency.configuration().number_of_decimals,l=btoa(JSON.stringify({buttonData:{merchantId:e.merchantId,publicKeyId:e.publicKeyId,ledgerCurrency:s.l9.currency.code(),checkoutLanguage:r.qA.language().replace("-","_"),productType:u.z9.virtual()?"PayOnly":"PayAndShip",placement:"Cart",buttonColor:"Gold",sandbox:!1},initCheckoutData:{createCheckoutSessionConfig:{payloadJSON:JSON.stringify(e.payload),signature:e.signature,publicKeyId:e.publicKeyId}},scriptLink:f(p.gx.billing.country())})),h=function(e,a,n,t,o){if(null!==(null==n?void 0:n.top)){var c=n.top.outerHeight/2+n.top.screenY-o/2,r=n.top.outerWidth/2+n.top.screenX-t/2;return n.open(e,a,"toolbar=no, location=no, directories=no, status=yes, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=".concat(t,", height=").concat(o,", top=").concat(c,", left=").concat(r))}return null}("".concat(a,"?amazon_data=").concat(l),"amazonPayPopup",window,550,515),y=setInterval((function(){var e;(null==h?void 0:h.closed)&&(clearInterval(y),null===(e=(0,d.MW)("body"))||void 0===e||e.classList.remove("pp-disabled"))}),1e3),null===h?[3,3]:[4,n.startTransaction("peachpay_amazonpay")];case 1:return b=L.sent(),v=b.error,g=b.result,v||!g?(_=v?(0,I.H)(v):(0,k.M)("An unknown error occured while starting the transaction. Please refresh the page and try again."),(0,i.j1)(_),o.h.dispatch((0,r.tv)()),[2]):[4,n.placeOrder(g)];case 2:if(w=L.sent(),A=w.error,C=w.result,A||!C||"success"!==C.result)return o.h.dispatch((0,r.tv)()),[2];(0,d.JM)("pp-amazon-popup-closed",(function(){var e;null===(e=(0,d.MW)("body"))||void 0===e||e.classList.remove("pp-disabled")})),(0,d.ml)("pp-amazon-checkout-failed",(function(a){o.h.dispatch((0,r.tv)()),window.alert("Amazon Pay was unable to proceed with checkout due to the following:\n".concat(a.message)),(0,z.W)(new Error(a.message),{amazonpay_session:e})})),(0,d.ml)("pp-amazon-checkout-complete",(function(a){return(0,t.mG)(P,void 0,void 0,(function(){var n,i,d,l;return(0,t.Jh)(this,(function(t){switch(t.label){case 0:return n=a.sessionId,h.postMessage({event:"pp-amazon-received-session-id"},location.origin),i={session:{id:m.Z5.sessionId(),merchant_id:s.l9.id(),merchant_url:s.l9.hostName(),merchant_name:s.l9.name(),plugin_version:r.qA.plugin.version(),platform:"woocommerce"},transaction:{amazonpay:{payload:{chargeAmount:{amount:u.AQ.total().toFixed(c),currencyCode:s.l9.currency.code()}},session_id:n,sandbox:!1}},order:{id:String(C.order_id),amount:u.AQ.total().toFixed(c),currency:s.l9.currency.code(),data:C}},[4,fetch(r.qA.peachpayAPIUrl()+"api/v1/amazonpay/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})];case 1:return(d=t.sent()).ok?[4,d.json()]:((0,z.W)(new Error("Call to PeachPay API /amazonpay/checkout failed"),{amazonpay_session:e,request:i,response:d}),[2]);case 2:return l=t.sent(),o.h.dispatch((0,r.N5)()),[4,D(l,C)];case 3:return t.sent(),[2]}}))}))})),L.label=3;case 3:return[2]}}))}))}function D(e,a){return(0,t.mG)(this,void 0,void 0,(function(){return(0,t.Jh)(this,(function(n){return"Completed"!==e.data.statusDetails.state?o.h.dispatch((0,r.tv)()):((0,h.c)(),window.top&&"success"===a.result&&(window.top.location=a.redirect)),[2]}))}))}}}]);
//# sourceMappingURL=432-9176ec08c9d2c035b625.js.map