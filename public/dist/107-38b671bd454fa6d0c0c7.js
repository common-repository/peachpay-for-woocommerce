!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="f2b0a956-73f0-4fa3-8b03-b33c9d1fabc8",e._sentryDebugIdIdentifier="sentry-dbid-f2b0a956-73f0-4fa3-8b03-b33c9d1fabc8")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"1.100.0"},(self.webpackChunkpeachpay_for_woocommerce=self.webpackChunkpeachpay_for_woocommerce||[]).push([[107],{9654:()=>{},4161:(e,t,n)=>{n.r(t),n.d(t,{createVerifyBuyerDetails:()=>B,default:()=>R,handleTokenResult:()=>F,squarePaymentRequestOptions:()=>J});var a=n(3940),r=n(7705),o=n(8072),i=n(1682),c=n(2815),s=n(3984),l=n(7150),u=n(3458),d=n(1650),p=n(4284),h=n(8472),f=n(2494),y=n(3629);function g(e){u.h.subscribe((function(){!function(e,t,n,a){e.startsWith("peachpay_square_")&&"payment"===t?(0,y.HD)(".square-btn-container",(function(e){e.classList.remove("hide")})):(0,y.HD)(".square-btn-container",(function(e){e.classList.add("hide")}));"finished"===n&&(null==a?void 0:a.hasCustomButton)?(0,y.HD)(".square-custom-btn-container",(function(e){e.classList.remove("hide")})):(0,y.HD)(".square-custom-btn-container",(function(e){e.classList.add("hide")}));"loading"===n||(null==a?void 0:a.hasCustomButton)?(0,y.HD)(".square-btn",(function(e){e.classList.add("hide")})):(0,y.HD)(".square-btn",(function(e){e.classList.remove("hide")}))}(s.hv.selectedGateway(),i.qA.modalUI.page(),i.qA.modalUI.loadingMode(),s.hv.gatewayConfig(s.hv.selectedGateway())),function(e,t){"loading"===e||"processing"===e&&(null==t?void 0:t.hasCustomButton)?(0,y.HD)(".square-spinner-container",(function(e){e.classList.remove("hide")})):(0,y.HD)(".square-spinner-container",(function(e){e.classList.add("hide")}));"processing"===e?(0,y.HD)(".square-btn-spinner",(function(e){e.classList.remove("hide")})):(0,y.HD)(".square-btn-spinner",(function(e){e.classList.add("hide")}));"processing"===e?(0,y.HD)(".square-btn > .button-text",(function(e){e.innerHTML=(0,p.M)("Processing")})):(0,y.HD)(".square-btn > .button-text",(function(e){e.innerHTML="".concat((0,p.M)("Pay")," ").concat((0,f.o)(o.AQ.total()))}));"finished"===e?(0,y.HD)(".square-btn",(function(e){e.disabled=!1})):(0,y.HD)(".square-btn",(function(e){e.disabled=!0}))}(i.qA.modalUI.loadingMode(),s.hv.gatewayConfig(s.hv.selectedGateway())),function(e){var t,n,r,o,i;if(!s.hv.selectedGateway().startsWith("peachpay_square_"))return;try{for(var c=(0,a.XA)(Object.entries(e).sort((function(e,t){var n,r,o,i,c,s=(0,a.CR)(e,2),l=(s[0],s[1]),u=(0,a.CR)(t,2);u[0];return(null!==(o=null===(r=null===(n=u[1].state)||void 0===n?void 0:n.mountTarget)||void 0===r?void 0:r.length)&&void 0!==o?o:0)-(null!==(c=null===(i=l.state)||void 0===i?void 0:i.mountTarget.length)&&void 0!==c?c:0)}))),l=c.next();!l.done;l=c.next()){var u=(0,a.CR)(l.value,2),d=(u[0],u[1]);d.state||(d.state={mountTarget:""});var p=v();if(d.state.mountTarget&&d.state.mountTarget!==p&&(null===(r=null==d?void 0:d.detach)||void 0===r||r.call(d),d.state.mountTarget=""),s.hv.selectedGateway()===d.config.gatewayId){if(d.state.mountTarget)continue;null===(o=null==d?void 0:d.attach)||void 0===o||o.call(d,p),d.state.mountTarget=p}else{if(!d.state.mountTarget)continue;null===(i=null==d?void 0:d.detach)||void 0===i||i.call(d),d.state.mountTarget=""}}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}}(e)}))}function v(){return(0,y.tq)()?"#mobile-customer-pay-button .square-custom-btn-container":"#pay-button .square-custom-btn-container"}var m=n(9256),b=n(9402),w=n(6159);var _=n(9654),q=n(1924),k=n(4143);function A(e,t){var n,a=this;return void 0===t&&(t=300),function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){e.apply(a,r)}),t)}}function I(){var e=i.L0.metadata("peachpay_square_afterpay_gateway","title");if(e&&"Afterpay"!==e&&"Clearpay"!==e)return e;switch(l.gx.billing.country()){case"GB":case"ES":case"FR":case"IT":return"Clearpay";default:return"Afterpay"}}const x=n.p+"img/4eb6a57eeeccfe1617eb-cashapp-green.svg",z=n.p+"img/efa03ef0d084294ce629-cashapp-green-logo-only.svg";var C=n(6857),M=n(3041);const E=n.p+"img/d067b36f63345d495b52-apple-pay-button.png";function L(){var e,t,n,r=this,o=null,c=((n=document.createElement("div")).innerHTML='<button class="square-apay-btn">\n        <style>\n            .square-apay-btn{\n                background-image: url('.concat(E,");\n                background-color: black;\n                border: none; height: 55px;\n                width: 15rem;\n                background-size: contain;\n                border-radius: 0.2rem;\n                background-position: center;\n            }\n\n            .square-apay-btn:hover{\n                opacity: 0.8;\n            }\n        </style>\n    </button>"),n.querySelector("button")),l={name:null!==(e=i.L0.metadata("peachpay_square_applepay_gateway","title"))&&void 0!==e?e:(0,p.M)("Apple Pay"),gatewayId:"peachpay_square_applepay",description:'\n<img style="display: block; text-align: left; height: 1.5rem; " src="'.concat(M,'">\n<p style="text-align: left; margin: 0.5rem 0;">').concat((0,p.M)("Apple Pay selected for checkout."),'</p>\n<hr/>\n<p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat((0,p.M)("Another step will appear after submitting your order to complete your purchase details."),"<p>"),assets:{badge:{src:C},title:{src:M}},browser:void 0!==window.ApplePaySession,hasCustomButton:!0},d=A((function(e,t){return(0,a.mG)(r,void 0,void 0,(function(){var n;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(o)return[2];if(s.hv.eligibleGateway(l.gatewayId)!==k.L.Eligible)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,e.applePay(t)];case 2:return o=a.sent(),l.initialized=!0,u.h.dispatch((0,m.s)()),[3,4];case 3:return n=a.sent(),l.initialized=!1,n instanceof _.PaymentMethodUnsupportedError&&(l.browser=!1),u.h.dispatch((0,m.s)()),console.error(n),(0,w.W)(n,{paymentRequest:t}),[3,4];case 4:return[2]}}))}))}));return{config:l,activate:d,reset:function(){var e;clearInterval(t);var n=o;o=null,null===(e=null==n?void 0:n.destroy())||void 0===e||e.catch((function(e){e instanceof _.PaymentMethodAlreadyDestroyedError||(console.error(e),(0,w.W)(e))}))},attach:function(e){clearInterval(t),t=setInterval((function(){o&&(clearInterval(t),(0,y.MW)(e,(function(e){return e.insertAdjacentElement("afterbegin",c)})))}),200)},detach:function(){c.remove()},tokenize:function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,t;return(0,a.Jh)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),o?[4,o.tokenize()]:[2,[null,null,{paymentStatus:"creationfailed",note:"Failed to find Apple Pay instance while attempting to tokenize the payment."}]];case 1:return[2,F(n.sent())];case 2:return e=n.sent(),t={paymentStatus:"creationfailed",note:"An unknown exception occured while tokenizing the payment."},e instanceof Error&&(t.note=e.message),[2,[null,null,t]];case 3:return[2]}}))}))}}}var S=n(8883),P=n(5792);var D=n(410),G=n(3172);var T=n(7246),H=n(4681);function R(e){return(0,a.mG)(this,void 0,void 0,(function(){var t,n,o,c,d,h,f,v=this;return(0,a.Jh)(this,(function(C){switch(C.label){case 0:return t=i.L0.metadata("peachpay_square_gateways","application_id"),n=i.L0.metadata("peachpay_square_gateways","location_id"),o=i.L0.metadata("peachpay_square_gateways","script_src"),t&&n&&o?[4,(0,y.ve)(o,"Square")]:[2];case 1:return C.sent(),window.Square?(c=window.Square.payments(t,n),d=function(){var e={},t={};if(i.L0.enabled("peachpay_square_card_gateway")){var n=function(){var e,t=null,n=!1;return{config:{name:null!==(e=i.L0.metadata("peachpay_square_card_gateway","title"))&&void 0!==e?e:(0,p.M)("Card"),gatewayId:"peachpay_square_card",description:"",assets:{title:{src:P},badge:{src:S}}},activate:function(e){return(0,a.mG)(this,void 0,void 0,(function(){var r,o;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return n?[2]:(n=!0,r={style:{".input-container":{borderWidth:"1px"}}},(0,y.HD)('div.pp-pm-saved-option[data-gateway="peachpay_square_card"]',(function(e){e.style.padding="0",e.style.border="unset"})),[4,e.card(r)]);case 1:return(t=a.sent()).attach('#pp-pms-new div.pp-pm-saved-option[data-gateway="peachpay_square_card"]').catch((function(){})),null==t||t.recalculateSize(),o="",u.h.subscribe((function(){var e=s.hv.selectedGateway();e!==o&&(o=e,null==t||t.recalculateSize())})),[2]}}))}))},tokenize:function(e){var n;return(0,a.mG)(this,void 0,void 0,(function(){var r,o,i,c,s,l,u;return(0,a.Jh)(this,(function(d){switch(d.label){case 0:if(!t)return[2,[null,null,{paymentStatus:"creationfailed",note:"Square Card element not found while attempting to tokenize card."}]];d.label=1;case 1:return d.trys.push([1,3,,4]),[4,t.tokenize()];case 2:return r=d.sent(),[3,4];case 3:return o=d.sent(),[2,[null,null,{paymentStatus:"creationfailed",note:"Square Card element tokenization failed with error: ".concat(o.message)}]];case 4:if(i=(0,a.CR)(F(r),3),c=i[0],i[1],s=i[2],!c)return[2,[null,null,s]];d.label=5;case 5:return d.trys.push([5,7,,8]),[4,e.verifyBuyer(c,B())];case 6:return l=d.sent(),[2,[c,null!==(n=null==l?void 0:l.token)&&void 0!==n?n:null,{}]];case 7:return u=d.sent(),[2,[null,null,{paymentStatus:"creationfailed",note:"Verifying Square buyer failed with error: ".concat(u.message)}]];case 8:return[2]}}))}))}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(i.L0.enabled("peachpay_square_card_gateway")){n=function(){var e,t,n=this,r=null,o={gatewayId:"peachpay_square_googlepay",name:null!==(e=i.L0.metadata("peachpay_square_googlepay_gateway","title"))&&void 0!==e?e:(0,p.M)("Google Pay"),description:'\n<img style="display: block; text-align: left; height: 1.5rem; " src="'.concat(G,'">\n<p style="text-align: left; margin: 0.5rem 0;">').concat((0,p.M)("Google Pay selected for checkout."),'</p>\n<hr/>\n<p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat((0,p.M)("Another step will appear after submitting your order to complete your purchase details."),"<p>"),assets:{badge:{src:D},title:{src:G}},hasCustomButton:!0},c=A((function(e,t){return(0,a.mG)(n,void 0,void 0,(function(){var n;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(r)return[2];if(s.hv.eligibleGateway(o.gatewayId)!==k.L.Eligible)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,e.googlePay(t)];case 2:return r=a.sent(),u.h.dispatch((0,m.s)()),o.initialized=!0,u.h.dispatch((0,m.s)()),[3,4];case 3:return n=a.sent(),o.initialized=!1,n instanceof _.PaymentMethodUnsupportedError&&(o.browser=!1),u.h.dispatch((0,m.s)()),console.error(n),(0,w.W)(n,{paymentRequest:t}),[3,4];case 4:return[2]}}))}))}));return{config:o,activate:c,reset:function(){clearInterval(t);var e=r;r=null,null==e||e.destroy().catch((function(e){e instanceof _.PaymentMethodAlreadyDestroyedError||(console.error(e),(0,w.W)(e))}))},attach:function(e){clearInterval(t),t=setInterval((function(){var n;r&&(clearInterval(t),null===(n=null==r?void 0:r.attach(e,{buttonColor:"black",buttonSizeMode:"fill"}))||void 0===n||n.catch((function(t){o.initialized=!1,u.h.dispatch((0,m.s)()),t instanceof _.PaymentMethodUnsupportedError?console.log(t):(console.error(t),(0,w.W)(t,{selector:e}))})))}),200)},detach:function(){var e;clearInterval(t),null===(e=null==r?void 0:r.detach())||void 0===e||e.catch((function(e){e instanceof _.PaymentMethodNotAttachedError||(o.initialized=!1,u.h.dispatch((0,m.s)()),e instanceof _.PaymentMethodAlreadyDestroyedError?r=null:(console.error(e),(0,w.W)(e)))}))},tokenize:function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,t;return(0,a.Jh)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),r?[4,r.tokenize()]:[2,[null,null,{paymentStatus:"creationfailed",note:"Failed to find Google Pay instance while attempting to tokenize the payment."}]];case 1:return[2,F(n.sent())];case 2:return e=n.sent(),t={paymentStatus:"creationfailed",note:"An unknown exception occured while tokenizing the payment."},e instanceof Error&&(t.note=e.message),[2,[null,null,t]];case 3:return[2]}}))}))}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(i.L0.enabled("peachpay_square_applepay_gateway")){e[(n=L()).config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(i.L0.enabled("peachpay_square_ach_gateway")){n=function(){var e,t=null,n=!1,r={name:null!==(e=i.L0.metadata("peachpay_square_ach_gateway","title"))&&void 0!==e?e:(0,p.M)("US Bank Account"),gatewayId:"peachpay_square_ach",description:'\n\t<p style="margin: 0;">\n\t\t'.concat((0,p.M)("After selecting <b>Pay</b> a prompt will appear to select a bank account."),'\n\t</p>\n\t<hr>\n\t<p class="muted" style="margin: 0;">\n\t\t').concat((0,p.M)("Note: Payments may take up to 5 days to complete."),"\n\t</p>\n\t"),assets:{badge:{src:b},title:{src:b}}};return{config:r,activate:function(e){return(0,a.mG)(this,void 0,void 0,(function(){var o;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(n)return[2];n=!0,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,e.ach({redirectURI:window.location.href,transactionId:"0"})];case 2:return(t=a.sent()).addEventListener("ontokenization",(function(e){})),r.initialized=!0,u.h.dispatch((0,m.s)()),[3,4];case 3:return o=a.sent(),r.initialized=!1,u.h.dispatch((0,m.s)()),console.error(o),(0,w.W)(o),[3,4];case 4:return[2]}}))}))},tokenize:function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,n;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),t?[4,t.tokenize({accountHolderName:l.gx.billing.fullName()})]:[2,[null,null,{paymentStatus:"creationfailed",note:"Failed to find ACH Bank instance while attempting to tokenize the payment."}]];case 1:return[2,F(a.sent())];case 2:return e=a.sent(),n={paymentStatus:"creationfailed",note:"An unknown exception occured while tokenizing the payment."},e instanceof Error&&(n.note=e.message),[2,[null,null,n]];case 3:return[2]}}))}))}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(i.L0.enabled("peachpay_square_afterpay_gateway")){n=function(){var e,t,n=this,r=null,o={name:I(),gatewayId:"peachpay_square_afterpay",description:(t=I(),'\n<img style="display: block; text-align: left; height: 1.5rem; " src='.concat(q,'>\n<p style="text-align: left; margin: 0.5rem 0;">').concat(t," ").concat((0,p.M)("selected for checkout."),'</p>\n<hr/>\n<p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat((0,p.M)("Another step will appear after submitting your order to complete your purchase details."),"<p>")),assets:{title:{src:q},badge:{src:q}},hasCustomButton:!0};u.h.subscribe((function(){o.name=I(),(0,y.HD)('.pp-pm-type[data-gateway="peachpay_square_afterpay"]',(function(e){var t=e.querySelector("span");t&&(t.innerText=o.name)}))}));var i=A((function(e,t){return(0,a.mG)(n,void 0,void 0,(function(){var n;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(r)return[2];if(s.hv.eligibleGateway(o.gatewayId)!==k.L.Eligible)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,e.afterpayClearpay(t)];case 2:return r=a.sent(),o.initialized=!0,u.h.dispatch((0,m.s)()),[3,4];case 3:return n=a.sent(),o.initialized=!1,n instanceof _.PaymentMethodUnsupportedError&&(o.browser=!1),u.h.dispatch((0,m.s)()),console.error("Square Afterpay/Clearpay activation error:"),console.error(n),(0,w.W)(n),[3,4];case 4:return[2]}}))}))}));return{config:o,activate:i,reset:function(){var t;clearInterval(e);var n=r;r=null,null===(t=null==n?void 0:n.destroy())||void 0===t||t.catch((function(e){e instanceof _.PaymentMethodAlreadyDestroyedError||(console.error(e),(0,w.W)(e))}))},attach:function(t){clearInterval(e),e=setInterval((function(){var n;r&&(clearInterval(e),null===(n=r.attach(t,{buttonColor:"black",buttonType:"checkout_with_afterpay",finalCtaButtonType:"buy_now"}))||void 0===n||n.catch((function(e){o.initialized=!1,u.h.dispatch((0,m.s)()),e instanceof _.PaymentMethodUnsupportedError?console.log(e):(console.error(e),(0,w.W)(e,{selector:t}))})))}),200)},detach:function(){var t;clearInterval(e),null===(t=null==r?void 0:r.detach())||void 0===t||t.catch((function(e){e instanceof _.PaymentMethodNotAttachedError||(o.initialized=!1,u.h.dispatch((0,m.s)()),e instanceof _.PaymentMethodAlreadyDestroyedError?r=null:(console.error(e),(0,w.W)(e)))}))},tokenize:function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,t;return(0,a.Jh)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),r?[4,r.tokenize()]:[2,[null,null,{paymentStatus:"creationfailed",note:"Failure processing Afterpay/Clearpay payment."}]];case 1:return[2,F(n.sent())];case 2:return e=n.sent(),t={paymentStatus:"creationfailed",note:"An unknown exception occured while tokenizing the payment."},e instanceof Error&&(t.note=e.message),[2,[null,null,t]];case 3:return[2]}}))}))}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}if(i.L0.enabled("peachpay_square_cashapp_gateway")){n=function(){var e,t,n=this,r=null,o=null,c=null,l={name:null!==(e=i.L0.metadata("peachpay_square_cashapp_gateway","title"))&&void 0!==e?e:(0,p.M)("Cash App"),gatewayId:"peachpay_square_cashapp",description:'\n<img style="display: block; text-align: left; height: 1.5rem; " src='.concat(x,'>\n<p style="text-align: left; margin: 0.5rem 0;">').concat((0,p.M)("Cash App selected for checkout."),'</p>\n<hr/>\n<p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat((0,p.M)("After pressing the Cash App button you'll be prompted to scan a QR code or approve the payment through the Cash App mobile app."),"<p>"),assets:{title:{src:x},badge:{src:z}},hasCustomButton:!0},d=A((function(e,t){return(0,a.mG)(n,void 0,void 0,(function(){var n,i,d;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:if(r)return[2];if(s.hv.eligibleGateway(l.gatewayId)!==k.L.Eligible)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,e.cashAppPay(t,{redirectURL:null!==(d=null===(i=window.top)||void 0===i?void 0:i.location.href)&&void 0!==d?d:""})];case 2:return(r=a.sent()).addEventListener("ontokenization",(function(e){var t=e.detail;t.tokenResult&&o?o(t.tokenResult):c&&c("An unknown tokenization error occured")})),r.addEventListener("customerDismissed",(function(e){c&&c("Customer closed cashapp popup")})),l.initialized=!0,u.h.dispatch((0,m.s)()),[3,4];case 3:return n=a.sent(),l.initialized=!1,n instanceof _.PaymentMethodUnsupportedError&&(l.browser=!1),u.h.dispatch((0,m.s)()),console.error(n),(0,w.W)(n),[3,4];case 4:return[2]}}))}))}));return{config:l,activate:d,reset:function(){var e;if(clearInterval(t),r){var n=r;r=null,o=null,c=null,null===(e=null==n?void 0:n.destroy())||void 0===e||e.catch((function(e){e instanceof _.PaymentMethodAlreadyDestroyedError||(console.error(e),(0,w.W)(e))}))}},attach:function(e){clearInterval(t),t=setInterval((function(){var n;r&&(clearInterval(t),null===(n=null==r?void 0:r.attach(e,{shape:"semiround",size:"medium"}))||void 0===n||n.catch((function(t){l.initialized=!1,u.h.dispatch((0,m.s)()),t instanceof _.PaymentMethodUnsupportedError?console.log(t):(console.error(t),(0,w.W)(t,{selector:e}))})))}),200)},detach:function(){var e;clearInterval(t),null===(e=null==r?void 0:r.detach())||void 0===e||e.catch((function(e){e instanceof _.PaymentMethodNotAttachedError||(l.initialized=!1,u.h.dispatch((0,m.s)()),e instanceof _.PaymentMethodAlreadyDestroyedError?r=null:(console.error(e),(0,w.W)(e)))}))},tokenize:function(){return(0,a.mG)(this,void 0,void 0,(function(){var e,t,n,i;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),r?(e=new Promise((function(e,t){o=e,c=t})),t=F,[4,e]):[2,[null,null,{paymentStatus:"creationfailed",note:"Failed to find Cash App instance while attempting to tokenize the payment."}]];case 1:return[2,t.apply(void 0,[a.sent()])];case 2:return n=a.sent(),i={paymentStatus:"creationfailed",note:"An unknown exception occured while tokenizing the payment."},"Customer closed cashapp popup"===n&&(i.note=n),n instanceof Error&&(i.note=n.message),[2,[null,null,i]];case 3:return[2]}}))}))}}}();e[n.config.gatewayId]=n,t[n.config.gatewayId]=n.config}return u.h.dispatch((0,s.Cj)(t)),e}(),g(d),h=function(t){return(0,a.mG)(v,void 0,void 0,(function(){var n,o,i,l;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return(0,r.N6)()?(n=t.target,((null==n?void 0:n.closest("button"))||(null===(l=null===(i=null==n?void 0:n.closest("div"))||void 0===i?void 0:i.shadowRoot)||void 0===l?void 0:l.querySelector("button")))&&(o=d[s.hv.selectedGateway()])?[4,W(c,o,e)]:[2]):[2];case 1:return a.sent(),[2]}}))}))},(0,y.HD)(".square-btn",(function(e){e.addEventListener("click",h)})),(0,y.HD)(".square-custom-btn-container",(function(e){e.addEventListener("click",h)})),f="",u.h.subscribe((function(){var e,t,n,r=J(),o=JSON.stringify(r);if(f!==o&&"finished"===i.qA.modalUI.loadingMode()){f=o;try{for(var s=(0,a.XA)(Object.entries(d)),l=s.next();!l.done;l=s.next()){var u=(0,a.CR)(l.value,2),p=(u[0],u[1]);null===(n=null==p?void 0:p.reset)||void 0===n||n.call(p),p.state=void 0,p.activate(c,c.paymentRequest(r))}}catch(t){e={error:t}}finally{try{l&&!l.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}}})),[2]):[2]}}))}))}function W(e,t,n){return(0,a.mG)(this,void 0,void 0,(function(){var r,o,c,s,l,d,f,y,g,v,m,b,w;return(0,a.Jh)(this,(function(_){switch(_.label){case 0:return r="peachpay_square_cashapp"===t.config.gatewayId,"peachpay_square_cashapp"!==t.config.gatewayId&&u.h.dispatch((0,i.N5)()),[4,t.tokenize(e)];case 1:return o=a.CR.apply(void 0,[_.sent(),3]),c=o[0],s=o[1],l=o[2],r&&u.h.dispatch((0,i.N5)()),[4,n.startTransaction(t.config.gatewayId)];case 2:return d=_.sent(),f=d.error,y=d.result,f||!y?(g=f?(0,H.H)(f):(0,p.M)("An unknown error occured while starting the transaction. Please refresh the page and try again."),(0,T.j1)(g),u.h.dispatch((0,i.tv)()),[2]):c?[3,4]:((0,T.j1)(l.note),[4,y.complete(l)]);case 3:return _.sent(),u.h.dispatch((0,i.tv)()),[2];case 4:return v={peachpay_square_source_id:c},s&&(v.peachpay_square_verification_id=s),[4,n.placeOrder(y,v)];case 5:return m=_.sent(),b=m.error,w=m.result,b||!w||"success"!==w.result?(u.h.dispatch((0,i.tv)()),[2]):((0,h.c)(),window.top?[4,y.complete()]:[3,7]);case 6:_.sent(),window.top.location=w.redirect,_.label=7;case 7:return[2]}}))}))}function J(){var e,t;return{countryCode:null!==(t=null===(e=c.l9.general.wcLocationInfoData())||void 0===e?void 0:e.store_country)&&void 0!==t?t:"US",currencyCode:c.l9.currency.code(),lineItems:N(),discounts:U(),taxLineItems:[{label:(0,p.M)("Tax"),amount:o.AQ.totalTax().toFixed(2)}],total:{label:(0,p.M)("Total"),amount:o.AQ.total().toFixed(2)}}}function N(){var e,t,n,r=new Array;try{for(var i=(0,a.XA)(o.AQ.contents()),c=i.next();!c.done;c=i.next()){var s=c.value;r.push({label:s.name+" × "+(0,d.Qw)(s),amount:(Number.parseFloat(null!==(n=s.display_price)&&void 0!==n?n:s.price)*(0,d.Qw)(s)).toFixed(2)})}}catch(t){e={error:t}}finally{try{c&&!c.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}return r}function U(){var e,t,n=new Array;try{for(var r=(0,a.XA)(Object.entries(o.AQ.couponRecord())),i=r.next();!i.done;i=r.next()){var c=(0,a.CR)(i.value,2),s=c[0],l=c[1];l&&n.push({id:s,amount:l.toFixed(2),label:s})}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return n}function B(){var e={addressLines:[l.gx.billing.address1(),l.gx.billing.address2()],city:l.gx.billing.city(),countryCode:l.gx.billing.country(),email:l.gx.billing.email(),familyName:l.gx.billing.lastName(),givenName:l.gx.billing.firstName(),phone:l.gx.billing.phone(),state:l.gx.billing.state(),postalCode:l.gx.billing.postal()};return o.AQ.total()>0?{intent:"CHARGE",currencyCode:c.l9.currency.code(),amount:String(o.AQ.total()),billingContact:e}:{intent:"STORE",billingContact:e}}function F(e){var t,n=function(){var t="";return e.errors&&Array.isArray(e.errors)&&e.errors.forEach((function(e){t+=e.message+". "})),t};switch(e.status){case"OK":return[null!==(t=e.token)&&void 0!==t?t:null,null,{}];case"Cancel":return[null,null,{note:"Customer canceled the Payment. "+n(),paymentStatus:"canceled"}];case"Abort":return[null,null,{note:"Tokenizing the payment method was aborted. "+n(),paymentStatus:"creationfailed"}];case"Error":return[null,null,{note:"Tokenizing the payment method encountered an error. "+n(),paymentStatus:"creationfailed"}];case"Invalid":return[null,null,{note:n(),paymentStatus:"creationfailed"}];default:return[null,null,{note:"Tokenizing the payment method encountered an unknown status. "+n(),paymentStatus:"creationfailed"}]}}},6857:(e,t,n)=>{e.exports=n.p+"img/d0db1eb027413f38ddb3-apple-pay.svg"},8883:(e,t,n)=>{e.exports=n.p+"img/d2a66f3e82ab3efab425-card.svg"},410:(e,t,n)=>{e.exports=n.p+"img/7aba4ceea17fbd040a20-google-pay.svg"},1924:(e,t,n)=>{e.exports=n.p+"img/070ee8f2835a668d3bed-afterpay.svg"},3041:(e,t,n)=>{e.exports=n.p+"img/0a580c7c9daca59b189c-apple-pay.svg"},9402:(e,t,n)=>{e.exports=n.p+"img/e7542fee9125d1af4d23-bank.svg"},5792:(e,t,n)=>{e.exports=n.p+"img/b2c8b12eb49165de87d5-credit-card-regular.svg"},3172:(e,t,n)=>{e.exports=n.p+"img/b6a9922efb467e7f87c3-google-pay.svg"}}]);
//# sourceMappingURL=107-38b671bd454fa6d0c0c7.js.map