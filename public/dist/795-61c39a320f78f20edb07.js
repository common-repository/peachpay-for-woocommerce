!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="7dab669c-89ee-4a1f-aa57-88e04bbec5c3",e._sentryDebugIdIdentifier="sentry-dbid-7dab669c-89ee-4a1f-aa57-88e04bbec5c3")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"1.100.0"},(self.webpackChunkpeachpay_for_woocommerce=self.webpackChunkpeachpay_for_woocommerce||[]).push([[795],{416:(e,t,n)=>{n.r(t),n.d(t,{default:()=>O,paypalDescription:()=>j});var a=n(3940),i=n(2815);function r(e){var t="";return Object.keys(e).forEach((function(n){0!==t.length&&(t+="&"),t+=n+"="+e[n]})),t}function o(e,t){void 0===t&&(t={});var n=document.createElement("script");return n.src=e,Object.keys(t).forEach((function(e){n.setAttribute(e,t[e]),"data-csp-nonce"===e&&n.setAttribute("nonce",t["data-csp-nonce"])})),n}function l(e,t){if(void 0===t&&(t=Promise),c(e,t),"undefined"==typeof document)return t.resolve(null);var n=function(e){var t="https://www.paypal.com/sdk/js";e.sdkBaseUrl&&(t=e.sdkBaseUrl,delete e.sdkBaseUrl);var n=e,a=Object.keys(n).filter((function(e){return void 0!==n[e]&&null!==n[e]&&""!==n[e]})).reduce((function(e,t){var a,i=n[t].toString();return a=function(e,t){return(t?"-":"")+e.toLowerCase()},"data"===(t=t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,a)).substring(0,4)?e.dataAttributes[t]=i:e.queryParams[t]=i,e}),{queryParams:{},dataAttributes:{}}),i=a.queryParams,o=a.dataAttributes;return i["merchant-id"]&&-1!==i["merchant-id"].indexOf(",")&&(o["data-merchant-id"]=i["merchant-id"],i["merchant-id"]="*"),{url:"".concat(t,"?").concat(r(i)),dataAttributes:o}}(e),a=n.url,i=n.dataAttributes,l=i["data-namespace"]||"paypal",d=s(l);return function(e,t){var n=document.querySelector('script[src="'.concat(e,'"]'));if(null===n)return null;var a=o(e,t),i=n.cloneNode();if(delete i.dataset.uidAuto,Object.keys(i.dataset).length!==Object.keys(a.dataset).length)return null;var r=!0;return Object.keys(i.dataset).forEach((function(e){i.dataset[e]!==a.dataset[e]&&(r=!1)})),r?n:null}(a,i)&&d?t.resolve(d):function(e,t){void 0===t&&(t=Promise);c(e,t);var n=e.url,a=e.attributes;if("string"!=typeof n||0===n.length)throw new Error("Invalid url.");if(void 0!==a&&"object"!=typeof a)throw new Error("Expected attributes to be an object.");return new t((function(e,t){if("undefined"==typeof document)return e();!function(e){var t=e.url,n=e.attributes,a=e.onSuccess,i=e.onError,r=o(t,n);r.onerror=i,r.onload=a,document.head.insertBefore(r,document.head.firstElementChild)}({url:n,attributes:a,onSuccess:function(){return e()},onError:function(){var e=new Error('The script "'.concat(n,'" failed to load. Check the HTTP status code and response body in DevTools to learn more.'));return t(e)}})}))}({url:a,attributes:i},t).then((function(){var e=s(l);if(e)return e;throw new Error("The window.".concat(l," global variable is not available."))}))}function s(e){return window[e]}function c(e,t){if("object"!=typeof e||null===e)throw new Error("Expected an options object.");if(void 0!==t&&"function"!=typeof t)throw new Error("Expected PromisePonyfill to be a function.")}var d=n(1682),u=n(3984),p=n(3458),y=n(4284),v=n(7246),h=n(3629),f=n(8072),m=n(2494);function g(e){p.h.subscribe((function(){var t,n;t=u.hv.selectedGateway(),n=d.qA.modalUI.loadingMode(),t.startsWith("peachpay_paypal_")&&"peachpay_paypal_card"!==t&&"finished"===n&&f.AQ.contents().length>0?((0,h.HD)(".paypal-pay-btn-container",(function(e){e.classList.remove("hide")})),(0,h.HD)(".paypal-pay-spinner-container",(function(e){e.classList.add("hide")}))):t.startsWith("peachpay_paypal_")&&"peachpay_paypal_card"!==t&&f.AQ.contents().length>0?((0,h.HD)(".paypal-pay-btn-container",(function(e){e.classList.add("hide")})),(0,h.HD)(".paypal-pay-spinner-container",(function(e){e.classList.remove("hide")}))):((0,h.HD)(".paypal-pay-btn-container",(function(e){e.classList.add("hide")})),(0,h.HD)(".paypal-pay-spinner-container",(function(e){e.classList.add("hide")}))),function(e){var t,n,i,r,o;if(!u.hv.selectedGateway().startsWith("peachpay_paypal_")&&"peachpay_paypal_card"!==u.hv.selectedGateway())return;try{for(var l=(0,a.XA)(Object.entries(e).sort((function(e,t){var n,i,r,o,l,s=(0,a.CR)(e,2),c=(s[0],s[1]),d=(0,a.CR)(t,2);d[0];return(null!==(r=null===(i=null===(n=d[1].state)||void 0===n?void 0:n.mountTarget)||void 0===i?void 0:i.length)&&void 0!==r?r:0)-(null!==(l=null===(o=c.state)||void 0===o?void 0:o.mountTarget.length)&&void 0!==l?l:0)}))),s=l.next();!s.done;s=l.next()){var c=(0,a.CR)(s.value,2),d=(c[0],c[1]);d.state||(d.state={mountTarget:""});var p=w();if(d.state.mountTarget&&d.state.mountTarget!==p&&(null===(i=null==d?void 0:d.detach)||void 0===i||i.call(d),d.state.mountTarget=""),u.hv.selectedGateway()===d.config.gatewayId){if(d.state.mountTarget)continue;null===(r=null==d?void 0:d.attach)||void 0===r||r.call(d,p),d.state.mountTarget=p}else{if(!d.state.mountTarget)continue;null===(o=null==d?void 0:d.detach)||void 0===o||o.call(d),d.state.mountTarget=""}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=l.return)&&n.call(l)}finally{if(t)throw t.error}}}(e)}))}function b(e){p.h.subscribe((function(){!function(e,t,n,a){e.includes(t)&&"payment"===n?(0,h.HD)(".paypal-btn-container",(function(e){e.classList.remove("hide")})):(0,h.HD)(".paypal-btn-container",(function(e){e.classList.add("hide")}));"loading"===a?(0,h.HD)(".paypal-btn",(function(e){e.classList.add("hide")})):(0,h.HD)(".paypal-btn",(function(e){e.classList.remove("hide")}))}(Object.keys(e),u.hv.selectedGateway(),d.qA.modalUI.page(),d.qA.modalUI.loadingMode()),function(e){"loading"===e?(0,h.HD)(".paypal-spinner-container",(function(e){e.classList.remove("hide")})):(0,h.HD)(".paypal-spinner-container",(function(e){e.classList.add("hide")}));"processing"===e?(0,h.HD)(".paypal-btn-spinner",(function(e){e.classList.remove("hide")})):(0,h.HD)(".paypal-btn-spinner",(function(e){e.classList.add("hide")}));"processing"===e?(0,h.HD)(".paypal-btn > .button-text",(function(e){e.innerHTML=(0,y.M)("Processing")})):(0,h.HD)(".paypal-btn > .button-text",(function(e){e.innerHTML="".concat((0,y.M)("Pay")," ").concat((0,m.o)(f.AQ.total()))}));"finished"===e?(0,h.HD)(".paypal-btn",(function(e){e.disabled=!1})):(0,h.HD)(".paypal-btn",(function(e){e.disabled=!0}))}(d.qA.modalUI.loadingMode())}))}function w(){return(0,h.tq)()?"#mobile-customer-pay-button .paypal-pay-btn-container":"#pay-button .paypal-pay-btn-container"}const _=n.p+"img/173aa60cc278bf30fb32-paypal.svg",E=n.p+"img/8c8968a2f7f7a789c35a-paypal.svg";var P=n(4209),M=n(4681),I=n(8472),L=function(){function e(e,t,n){this.paypal=e,this.orderService=t,this.gatewayId=n.gatewayId,this.fundingType=n.fundingType,this.buttonStyle=n.buttonStyle,this.isMounted=!1,this.mountContainer=null,this.currentPaymentDetails=null,this.currentTransaction=null,this.button=this.createButtonComponent()}return e.prototype.isEligible=function(){var e,t;return null!==(t=null===(e=this.button)||void 0===e?void 0:e.isEligible())&&void 0!==t&&t},e.prototype.mount=function(e){var t,n;if(!this.isMounted){var a=(0,h.MW)(e);a&&(this.button||(this.button=this.createButtonComponent()),this.mountContainer?null===(t=this.mountContainer)||void 0===t||t.classList.remove("hide"):(this.mountContainer=document.createElement("div"),a.insertAdjacentElement("beforeend",this.mountContainer),null===(n=this.button)||void 0===n||n.render(this.mountContainer).catch((function(){}))),this.isMounted=!0)}},e.prototype.unmount=function(){var e;this.isMounted&&(null===(e=this.mountContainer)||void 0===e||e.remove(),this.mountContainer=null,this.button=null,this.isMounted=!1)},e.prototype.createButtonComponent=function(){var e,t,n,i=this.orderService,r=this;return null!==(n=null===(t=null===(e=this.paypal)||void 0===e?void 0:e.Buttons)||void 0===t?void 0:t.call(e,{fundingSource:this.fundingType,style:this.buttonStyle,onClick:function(){p.h.dispatch((0,d.N5)())},createOrder:function(e,t){var n;return(0,a.mG)(this,void 0,void 0,(function(){var e,t,o,l,s,c,u,h,f,m,g,b,w;return(0,a.Jh)(this,(function(_){switch(_.label){case 0:return _.trys.push([0,6,,9]),[4,i.startTransaction(r.gatewayId)];case 1:return e=_.sent(),t=e.error,o=e.result,t||!o?(l=t?(0,M.H)(t):(0,y.M)("An unknown error occured while starting the transaction. Please refresh the page and try again."),(0,v.j1)(l),p.h.dispatch((0,d.tv)()),[2,""]):(r.currentTransaction=o,[4,i.placeOrder(r.currentTransaction)]);case 2:return s=_.sent(),c=s.error,u=s.result,c||!u||"success"!==u.result?(p.h.dispatch((0,d.tv)()),[2,""]):(h=new URL(u.redirect),f=(0,a.CR)(h.hash.split("="),2),m=f[0],g=f[1],"#payment_data"===m&&g?[3,5]:[4,r.currentTransaction.complete({note:"Failed to retrieve paypal payment details from url: "+u.redirect})]);case 3:case 7:return _.sent(),[4,(0,v.t9)()];case 4:case 8:return _.sent(),p.h.dispatch((0,d.tv)()),[2,""];case 5:return b=JSON.parse(atob(decodeURIComponent(g))),r.currentPaymentDetails=b,[2,b.data.id];case 6:return w=_.sent(),[4,null===(n=r.currentTransaction)||void 0===n?void 0:n.complete({note:"Failed creating paypal order: "+(0,M.H)(w)})];case 9:return[2]}}))}))},onApprove:function(e,t){var n,i,o,l,s,c;return(0,a.mG)(this,void 0,void 0,(function(){var e,u,h,f,m,g;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return(null===(n=r.currentPaymentDetails)||void 0===n?void 0:n.order_id)?[3,3]:[4,null===(i=r.currentTransaction)||void 0===i?void 0:i.complete({note:'Failed approving paypal order: "Missing payment details"'})];case 1:return a.sent(),t.restart(),[4,(0,v.t9)()];case 2:return a.sent(),p.h.dispatch((0,d.tv)()),[2];case 3:return(e=d.L0.metadata("peachpay_paypal_gateways","approve_order_url"))?[3,6]:[4,null===(o=r.currentTransaction)||void 0===o?void 0:o.complete({note:'Failed approving paypal order: "Missing required approve URL or approve URL security nonce"'})];case 4:return a.sent(),t.restart(),[4,(0,v.t9)()];case 5:return a.sent(),p.h.dispatch((0,d.tv)()),[2];case 6:return(u=new FormData).append("order_id",r.currentPaymentDetails.order_id),[4,fetch(e,{method:"POST",body:u})];case 7:h=a.sent(),a.label=8;case 8:return a.trys.push([8,13,,18]),[4,h.json()];case 9:return(f=a.sent()).success?[3,12]:[4,null===(l=r.currentTransaction)||void 0===l?void 0:l.complete({note:f.message})];case 10:return a.sent(),t.restart(),[4,(0,v.t9)()];case 11:return a.sent(),p.h.dispatch((0,d.tv)()),[2];case 12:return[3,18];case 13:return m=a.sent(),[4,null===(s=t.order)||void 0===s?void 0:s.get()];case 14:return"APPROVED"===(null==(g=a.sent())?void 0:g.status)||"COMPLETED"===(null==g?void 0:g.status)?[3,17]:(p.h.dispatch((0,P.Qe)((0,y.M)("PayPal order failed to finish."))),[4,null===(c=r.currentTransaction)||void 0===c?void 0:c.complete({note:"PayPal order failed to finish: ".concat((0,M.H)(m))})]);case 15:return a.sent(),t.restart(),[4,(0,v.t9)()];case 16:return a.sent(),p.h.dispatch((0,d.tv)()),[2];case 17:return[3,18];case 18:return(0,I.c)(),window.top?window.top.location.href=r.currentPaymentDetails.success_url:t.redirect(r.currentPaymentDetails.success_url),[2]}}))}))},onCancel:function(e,t){var n,i;return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(e){switch(e.label){case 0:return r.currentPaymentDetails?[3,3]:[4,null===(n=r.currentTransaction)||void 0===n?void 0:n.complete({paymentStatus:"CANCELED",orderStatus:"unknown",note:'Payment canceled by customer. Order status "unknown" because of missing payment details.'})];case 1:return e.sent(),[4,(0,v.t9)()];case 2:return e.sent(),p.h.dispatch((0,d.tv)()),[2];case 3:return[4,null===(i=null==r?void 0:r.currentTransaction)||void 0===i?void 0:i.complete({paymentStatus:"CANCELED",orderStatus:"canceled"})];case 4:return e.sent(),function(e){try{var t=new XMLHttpRequest;t.open("GET",e),t.send()}catch(e){}}(r.currentPaymentDetails.cancel_url),p.h.dispatch((0,d.tv)()),[2]}}))}))},onError:function(e){var t;return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(n){switch(n.label){case 0:return[4,null===(t=r.currentTransaction)||void 0===t?void 0:t.complete({note:(0,M.H)(e)})];case 1:return n.sent(),r.currentTransaction=null,r.currentPaymentDetails=null,[4,(0,v.t9)()];case 2:return n.sent(),p.h.dispatch((0,d.tv)()),[2]}}))}))}}))&&void 0!==n?n:null},e}();var F=n(9256);const C=n.p+"img/cad4a91407099c0b1e1f-paypal-paylater.svg";const T=n.p+"img/2598d60ef6ba61ecf216-venmo.svg",x=n.p+"img/29b34a2d06a2137a30a2-venmo.svg";var D=n(5667),A=function(){function e(e){var t,n,i,r=this;if(this.paypal=e,!this.paypal)throw new Error("PayPal instance is not valid");var o=this;this.cardFields=null!==(i=null===(n=(t=this.paypal).CardFields)||void 0===n?void 0:n.call(t,{createOrder:function(){return(0,a.mG)(r,void 0,void 0,(function(){return(0,a.Jh)(this,(function(e){return[2,o.createOrder()]}))}))},onApprove:function(e){return(0,a.mG)(r,void 0,void 0,(function(){return(0,a.Jh)(this,(function(t){return[2,o.onApprove(e)]}))}))},onError:function(e){return(0,a.mG)(r,void 0,void 0,(function(){return(0,a.Jh)(this,(function(t){return[2,o.onError(e)]}))}))}}))&&void 0!==i?i:null,this.numberField=null,this.expiryField=null,this.cvvField=null,this.paymentAttempt=null}return e.prototype.gatewayId=function(){return"peachpay_paypal_card"},e.prototype.isEligible=function(){var e,t;return null!==(t=null===(e=this.cardFields)||void 0===e?void 0:e.isEligible())&&void 0!==t&&t},e.prototype.isMounted=function(){var e;return"true"===(null===(e=(0,h.MW)("#pp-paypal-card-element"))||void 0===e?void 0:e.dataset.isMounted)},e.prototype.mount=function(){var e,t,n,a,i,r,o;if(!this.isEligible())throw new Error("".concat(this.gatewayId()," is not eligible for this checkout. Element not mounted."));var l=this,s={onFocus:function(e){l.onFocus(e)},onChange:function(e){l.onChange(e)},onBlur:function(e){l.onBlur(e)},onInputSubmitRequest:function(e){l.onInputSubmitRequest(e)}};this.numberField=null!==(t=null===(e=this.cardFields)||void 0===e?void 0:e.NumberField({inputEvents:s}))&&void 0!==t?t:null;var c=(0,h.MW)("#pp-paypal-card-number");this.numberField&&c&&(c.innerHTML="",this.numberField.render(c)),this.expiryField=null!==(a=null===(n=this.cardFields)||void 0===n?void 0:n.ExpiryField({inputEvents:s}))&&void 0!==a?a:null;var d=(0,h.MW)("#pp-paypal-card-expiry");this.expiryField&&d&&(d.innerHTML="",this.expiryField.render(d)),this.cvvField=null!==(r=null===(i=this.cardFields)||void 0===i?void 0:i.CVVField({inputEvents:s}))&&void 0!==r?r:null;var u=(0,h.MW)("#pp-paypal-card-cvv");this.cvvField&&u&&(u.innerHTML="",this.cvvField.render(u)),null===(o=(0,h.MW)("#pp-paypal-card-element"))||void 0===o||o.setAttribute("data-is-mounted","true")},e.prototype.submit=function(e){var t=this;this.paymentAttempt=e,this.isMounted()?e.createTransaction(this.gatewayId()).then((function(){var e;return null===(e=t.cardFields)||void 0===e?void 0:e.submit()})).catch((function(n){return(0,a.mG)(t,void 0,void 0,(function(){var t;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(t=(0,y.M)("An error occurred while validating your card. Please check your card number or try another card."),"INELIGIBLE_CARD_VENDOR"===n.message)t=(0,y.M)("Your card is not eligible for this payment method. Please try another card.");else console.error(n);return[4,e.completeTransaction({note:t})];case 1:return a.sent(),e.setPaymentMessage(t),e.stopLoading(),[2]}}))}))})):console.error("PayPal card element is not mounted.")},e.prototype.createOrder=function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,t,n;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:e=this.paymentAttempt,a.label=1;case 1:return a.trys.push([1,3,,5]),[4,e.submitOrder("paypal")];case 2:return[2,null==(t=a.sent())?void 0:t.data.id];case 3:return n=a.sent(),console.error(n),[4,e.completeTransaction({paymentStatus:"unperformed",orderStatus:"creationfailed",note:(0,M.H)(n)})];case 4:return a.sent(),e.setPaymentMessage((0,y.M)("An error occurred while creating your order. Please try again.")),e.stopLoading(),[2,""];case 5:return[2]}}))}))},e.prototype.onApprove=function(e){return(0,a.mG)(this,void 0,void 0,(function(){var e,t,n,i,r,o;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return e=this.paymentAttempt,(t=e.featureMetadata("peachpay_paypal_gateways","approve_order_url"))?[3,2]:(o=(0,y.M)("Missing required dependencies to Capture/Confirm PayPal order."),[4,e.completeTransaction({note:o})]);case 1:return a.sent(),e.setPaymentMessage(o),e.stopLoading(),[2];case 2:return(n=new FormData).append("order_id",e.getOrderId()),[4,(0,D.Fi)(t,{method:"POST",body:n})];case 3:return i=a.sent(),r=i.result,!i.error&&r?[3,5]:(o=(0,y.M)("An error occurred while capturing your order. Please try again."),[4,e.completeTransaction({note:o})]);case 4:a.sent(),e.setPaymentMessage(o),e.stopLoading(),a.label=5;case 5:return e.redirectSuccess(),[2]}}))}))},e.prototype.onError=function(e){return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(e){return[2]}))}))},e.prototype.onFocus=function(e){var t,n,a;switch(e.emittedBy){case"number":(null===(t=e.fields.cardNumberField)||void 0===t?void 0:t.isPotentiallyValid)?this.setElementMessage("info","Enter your card number."):this.setElementMessage("error","Invalid card number.");break;case"expiry":(null===(n=e.fields.cardExpiryField)||void 0===n?void 0:n.isPotentiallyValid)?this.setElementMessage("info","Enter your expiration date."):this.setElementMessage("error","Invalid expiration date.");break;case"cvv":(null===(a=e.fields.cardCvvField)||void 0===a?void 0:a.isPotentiallyValid)?this.setElementMessage("info","Enter the security code."):this.setElementMessage("error","Invalid security code.")}},e.prototype.onChange=function(e){var t,n,a,i,r,o,l,s;switch(e.emittedBy){case"number":(null===(t=e.fields.cardNumberField)||void 0===t?void 0:t.isPotentiallyValid)?this.setElementMessage("info","Enter your card number."):this.setElementMessage("error","Invalid card number."),(null===(n=e.fields.cardNumberField)||void 0===n?void 0:n.isValid)&&(this.setElementMessage("clear"),null===(a=this.expiryField)||void 0===a||a.focus("expiry").catch((function(){})));break;case"expiry":(null===(i=e.fields.cardExpiryField)||void 0===i?void 0:i.isPotentiallyValid)?this.setElementMessage("info","Enter your expiration date."):this.setElementMessage("error","Invalid expiration date."),(null===(r=e.fields.cardExpiryField)||void 0===r?void 0:r.isValid)&&(this.setElementMessage("clear"),null===(o=this.cvvField)||void 0===o||o.focus("cvv").catch((function(){})));break;case"cvv":(null===(l=e.fields.cardCvvField)||void 0===l?void 0:l.isPotentiallyValid)?this.setElementMessage("error","Enter the security code."):this.setElementMessage("error","Invalid security code."),(null===(s=e.fields.cardCvvField)||void 0===s?void 0:s.isValid)&&this.setElementMessage("clear")}},e.prototype.onBlur=function(e){var t,n,a,i,r,o;(null===(t=e.fields.cardNumberField)||void 0===t?void 0:t.isValid)?(null===(a=e.fields.cardExpiryField)||void 0===a?void 0:a.isValid)?(null===(r=e.fields.cardCvvField)||void 0===r?void 0:r.isValid)?this.setElementMessage("clear"):(null===(o=e.fields.cardCvvField)||void 0===o?void 0:o.isPotentiallyValid)?this.setElementMessage("error","Incomplete security code."):this.setElementMessage("error","Invalid security code."):(null===(i=e.fields.cardExpiryField)||void 0===i?void 0:i.isPotentiallyValid)?this.setElementMessage("error","Incomplete expiration date."):this.setElementMessage("error","Invalid expiration date."):(null===(n=e.fields.cardNumberField)||void 0===n?void 0:n.isPotentiallyValid)?this.setElementMessage("error","Incomplete card number."):this.setElementMessage("error","Invalid card number.")},e.prototype.onInputSubmitRequest=function(e){var t,n,a,i,r,o,l,s,c;return(null===(t=e.fields.cardNumberField)||void 0===t?void 0:t.isValid)?(null===(i=e.fields.cardExpiryField)||void 0===i?void 0:i.isValid)?(null===(l=e.fields.cardCvvField)||void 0===l?void 0:l.isValid)?void(e.isFormValid&&this.setElementMessage("clear")):((null===(s=e.fields.cardCvvField)||void 0===s?void 0:s.isPotentiallyValid)?this.setElementMessage("error","Incomplete security code."):this.setElementMessage("error","Invalid security code."),void(null===(c=this.cvvField)||void 0===c||c.focus("cvv").catch((function(){})))):((null===(r=e.fields.cardExpiryField)||void 0===r?void 0:r.isPotentiallyValid)?this.setElementMessage("error","Incomplete expiration date."):this.setElementMessage("error","Invalid expiration date."),void(null===(o=this.expiryField)||void 0===o||o.focus("expiry").catch((function(){})))):((null===(n=e.fields.cardNumberField)||void 0===n?void 0:n.isPotentiallyValid)?this.setElementMessage("error","Incomplete card number."):this.setElementMessage("error","Invalid card number."),void(null===(a=this.numberField)||void 0===a||a.focus("number").catch((function(){}))))},e.prototype.setElementMessage=function(e,t){var n=(0,h.MW)("#pp-paypal-card-status"),a=(0,h.MW)("#pp-paypal-card-status span");if(n&&a){if("clear"===e||!t)return n.classList.add("hide"),void(a.textContent="");n.classList.remove("hide"),a.textContent=t,"info"===e?n.classList.remove("error"):"error"===e&&n.classList.add("error")}},e}(),H=n(8883),S=n(5792);var k=n(6159),V=n(7705);function O(e){return(0,a.mG)(this,void 0,void 0,(function(){var t,n,r,o,s,c,f,m,w=this;return(0,a.Jh)(this,(function(P){return d.L0.enabled("peachpay_paypal_gateways")?(t=d.L0.metadata("peachpay_paypal_gateways","client_id"),n=d.L0.metadata("peachpay_paypal_gateways","merchant_id"),r=d.L0.metadata("peachpay_paypal_gateways","partner_attribution_id"),t&&n&&r?(o=function(){var e={},t={};if(d.L0.enabled("peachpay_paypal_wallet_gateway")){var n=function(){var e,t,n=null,a={name:null!==(e=d.L0.metadata("peachpay_paypal_wallet_gateway","title"))&&void 0!==e?e:"PayPal",gatewayId:"peachpay_paypal_wallet",description:j("PayPal",E,(0,y.M)("After selecting the PayPal button you will be prompted to complete your payment.")),assets:{badge:{src:_},title:{src:E}}};return{config:a,activate:function(e,t){var i;n=new L(e,t,{gatewayId:"peachpay_paypal_wallet",fundingType:"paypal",buttonStyle:null!==(i=d.L0.metadata("peachpay_paypal_wallet_gateway","button_style"))&&void 0!==i?i:void 0}),a.initialized=n.isEligible(),p.h.dispatch((0,F.s)())},reset:function(){null==n||n.unmount(),n=null,a.initialized=!1,p.h.dispatch((0,F.s)())},attach:function(e){clearInterval(t),t=setInterval((function(){n&&(n.mount(e),clearInterval(t))}),200)},detach:function(){null==n||n.unmount()}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(d.L0.enabled("peachpay_paypal_venmo_gateway")){n=function(){var e,t=null,n={name:null!==(e=d.L0.metadata("peachpay_paypal_venmo_gateway","title"))&&void 0!==e?e:"Venmo",gatewayId:"peachpay_paypal_venmo",description:j("Venmo",x,(0,y.M)("After selecting the Venmo button you will be prompted to complete your payment.")),assets:{badge:{src:T},title:{src:x}}};return{config:n,activate:function(e,a){var i;t=new L(e,a,{gatewayId:"peachpay_paypal_venmo",fundingType:"venmo",buttonStyle:null!==(i=d.L0.metadata("peachpay_paypal_venmo_gateway","button_style"))&&void 0!==i?i:void 0}),n.initialized=t.isEligible(),p.h.dispatch((0,F.s)())},reset:function(){null==t||t.unmount(),t=null,n.initialized=!1,p.h.dispatch((0,F.s)())},attach:function(e){null==t||t.mount(e)},detach:function(){null==t||t.unmount()}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(d.L0.enabled("peachpay_paypal_paylater_gateway")){n=function(){var e,t=null,n={name:null!==(e=d.L0.metadata("peachpay_paypal_paylater_gateway","title"))&&void 0!==e?e:"PayPal Pay Later",gatewayId:"peachpay_paypal_paylater",description:j("PayPal Pay Later",C,(0,y.M)("After selecting the PayPal Pay Later button you will be prompted to complete your payment.")),assets:{badge:{src:_},title:{src:C}}};return{config:n,activate:function(e,a){var i;t=new L(e,a,{gatewayId:"peachpay_paypal_paylater",fundingType:"paylater",buttonStyle:null!==(i=d.L0.metadata("peachpay_paypal_paylater_gateway","button_style"))&&void 0!==i?i:void 0}),n.initialized=t.isEligible(),p.h.dispatch((0,F.s)())},reset:function(){null==t||t.unmount(),t=null,n.initialized=!1,p.h.dispatch((0,F.s)())},attach:function(e){null==t||t.mount(e)},detach:function(){null==t||t.unmount()}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(d.L0.enabled("peachpay_paypal_credit_gateway")){n=function(){var e,t=null,n={name:null!==(e=d.L0.metadata("peachpay_paypal_credit_gateway","title"))&&void 0!==e?e:"PayPal Credit",gatewayId:"peachpay_paypal_credit",description:j("PayPal Credit",E,(0,y.M)("After selecting the PayPal Credit button you will be prompted to complete your payment.")),assets:{badge:{src:_},title:{src:E}}};return{config:n,activate:function(e,a){var i;t=new L(e,a,{gatewayId:"peachpay_paypal_credit",fundingType:"credit",buttonStyle:null!==(i=d.L0.metadata("peachpay_paypal_credit_gateway","button_style"))&&void 0!==i?i:void 0}),n.initialized=t.isEligible(),p.h.dispatch((0,F.s)())},reset:function(){null==t||t.unmount(),t=null,n.initialized=!1,p.h.dispatch((0,F.s)())},attach:function(e){null==t||t.mount(e)},detach:function(){null==t||t.unmount()}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}return p.h.dispatch((0,u.Cj)(t)),e}(),s=function(){var e={},t={};if(d.L0.enabled("peachpay_paypal_card_gateway")){var n=function(){var e,t=null,n={name:null!==(e=d.L0.metadata("peachpay_paypal_card_gateway","title"))&&void 0!==e?e:"Card",gatewayId:"peachpay_paypal_card",description:'\n\t<div>\n\t\t<p style="text-align: left; margin: 0;">\n\t\t\t'.concat((0,y.M)("Pay securely using your credit or debit card."),'\n\t\t<p>\n\t\t<div id="pp-paypal-card-element" data-is-mounted="false">\n\t\t\t<div id="pp-paypal-card-number">\n\t\t\t</div>\n\t\t\t<div id="pp-paypal-card-expiry">\n\t\t\t</div>\n\t\t\t<div id="pp-paypal-card-cvv">\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="pp-paypal-card-status" class="hide" style="display:flex;align-items:center;justify-content:center;gap:4px;">\n\t\t\t<i class="pp-icon-info"></i>\n\t\t\t<span></span>\n\t\t</div>\n\t</div>'),assets:{title:{src:S},badge:{src:H}}};return{config:n,activate:function(e){return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(a){return(t=new A(e)).isEligible()?(t.mount(),[2]):(t=null,n.initialized=!1,p.h.dispatch((0,F.s)()),[2])}))}))},submit:function(e){t?t.submit(e):console.error("PayPal card payment not initialized for submitting payment attempt")}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}return p.h.dispatch((0,u.Cj)(t)),e}(),g(o),b(s),c=new Set(["USD","AUD","BRL","CAD","CZK","DKK","EUR","HKD","HUF","ILS","JPY","MYR","MXN","TWD","NZD","NOK","PHP","PLN","GBP","RUB","SGD","SEK","CHF","THB"]),f="",p.h.subscribe((function(){return(0,a.mG)(w,void 0,void 0,(function(){var d,u,p,y,v,h,m,g,b;return(0,a.Jh)(this,(function(w){switch(w.label){case 0:if((d=i.l9.currency.code())===f)return[2];f=d;try{for(u=(0,a.XA)(Object.entries(o)),p=u.next();!p.done;p=u.next())y=(0,a.CR)(p.value,2),y[0],(v=y[1]).reset(),v.state=void 0}catch(e){g={error:e}}finally{try{p&&!p.done&&(b=u.return)&&b.call(u)}finally{if(g)throw g.error}}if(!c.has(d))return[2];w.label=1;case 1:return w.trys.push([1,5,,6]),[4,l({clientId:t,merchantId:n,dataPartnerAttributionId:r,enableFunding:"venmo",currency:i.l9.currency.code(),dataPageType:"checkout",components:["buttons","card-fields"]})];case 2:return(h=w.sent())?[4,G(h,o,e)]:[2];case 3:return w.sent(),[4,R(h,s)];case 4:return w.sent(),[3,6];case 5:return m=w.sent(),(0,k.W)(new Error("PayPal SDK failed to load"),{error:m}),[3,6];case 6:return[2]}}))}))})),m=function(t){if((0,V.N6)()){var n=t.target;if(null==n?void 0:n.closest("button")){var a=u.hv.selectedGateway(),i=s[a];i&&(p.h.dispatch((0,d.N5)()),i.submit((0,v.Ep)(e)))}}},(0,h.HD)(".paypal-btn",(function(e){e.addEventListener("click",(function(e){m(e)}))})),[2]):[2]):[2]}))}))}function G(e,t,n){return(0,a.mG)(this,void 0,void 0,(function(){var i,r,o,l,s,c,d;return(0,a.Jh)(this,(function(u){switch(u.label){case 0:i=[];try{for(r=(0,a.XA)(Object.entries(t)),o=r.next();!o.done;o=r.next())l=(0,a.CR)(o.value,2),l[0],(s=l[1]).activate&&i.push(s.activate(e,n))}catch(e){c={error:e}}finally{try{o&&!o.done&&(d=r.return)&&d.call(r)}finally{if(c)throw c.error}}return[4,Promise.all(i)];case 1:return u.sent(),[2]}}))}))}function R(e,t){return(0,a.mG)(this,void 0,void 0,(function(){var n,i,r,o,l,s,c;return(0,a.Jh)(this,(function(d){switch(d.label){case 0:n=[];try{for(i=(0,a.XA)(Object.entries(t)),r=i.next();!r.done;r=i.next())o=(0,a.CR)(r.value,2),o[0],(l=o[1]).activate&&n.push(l.activate(e))}catch(e){s={error:e}}finally{try{r&&!r.done&&(c=i.return)&&c.call(i)}finally{if(s)throw s.error}}return[4,Promise.all(n)];case 1:return d.sent(),[2]}}))}))}function j(e,t,n){return'\n    <img style="display: block; text-align: left; height: 1.7rem; " src="'.concat(t,'">\n    <p style="text-align: left; margin: 0.5rem 0;">').concat(e," ").concat((0,y.M)("selected for checkout."),'</p>\n    <hr>\n    <p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat(n,"</p>")}},8883:(e,t,n)=>{e.exports=n.p+"img/d2a66f3e82ab3efab425-card.svg"},5792:(e,t,n)=>{e.exports=n.p+"img/b2c8b12eb49165de87d5-credit-card-regular.svg"}}]);
//# sourceMappingURL=795-61c39a320f78f20edb07.js.map