!function(){try{var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=(new Error).stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="c2ab6121-6c7f-466d-89bf-cf9e312287de",t._sentryDebugIdIdentifier="sentry-dbid-c2ab6121-6c7f-466d-89bf-cf9e312287de")}catch(t){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"1.99.8"},(self.webpackChunkpeachpay_for_woocommerce=self.webpackChunkpeachpay_for_woocommerce||[]).push([[585],{2831:(t,e,n)=>{n.r(e),n.d(e,{default:()=>R,paypalDescription:()=>j});var a=n(3940),r=n(2815);function i(t){var e="https://www.paypal.com/sdk/js";t.sdkBaseURL&&(e=t.sdkBaseURL,delete t.sdkBaseURL),function(t){var e=t["merchant-id"],n=t["data-merchant-id"],a="",r="";Array.isArray(e)?e.length>1?(a="*",r=e.toString()):a=e.toString():"string"==typeof e&&e.length>0?a=e:"string"==typeof n&&n.length>0&&(a="*",r=n);t["merchant-id"]=a,t["data-merchant-id"]=r}(t);var n=Object.keys(t).filter((function(e){return void 0!==t[e]&&null!==t[e]&&""!==t[e]})).reduce((function(e,n){var a=t[n].toString();return"data-"===n.substring(0,5)?e.dataAttributes[n]=a:e.queryParams[n]=a,e}),{queryParams:{},dataAttributes:{}}),a=n.queryParams,r=n.dataAttributes;return{url:"".concat(e,"?").concat(o(a)),dataAttributes:r}}function o(t){var e="";return Object.keys(t).forEach((function(n){0!==e.length&&(e+="&"),e+=n+"="+t[n]})),e}function c(t,e){void 0===e&&(e={});var n=document.createElement("script");return n.src=t,Object.keys(e).forEach((function(t){n.setAttribute(t,e[t]),"data-csp-nonce"===t&&n.setAttribute("nonce",e["data-csp-nonce"])})),n}function l(t,e){if(void 0===e&&(e=u()),d(t,e),"undefined"==typeof window)return e.resolve(null);var n=i(t),a=n.url,r=n.dataAttributes,o=r["data-namespace"]||"paypal",l=s(o);return function(t,e){var n=document.querySelector('script[src="'.concat(t,'"]'));if(null===n)return null;var a=c(t,e),r=n.cloneNode();if(delete r.dataset.uidAuto,Object.keys(r.dataset).length!==Object.keys(a.dataset).length)return null;var i=!0;return Object.keys(r.dataset).forEach((function(t){r.dataset[t]!==a.dataset[t]&&(i=!1)})),i?n:null}(a,r)&&l?e.resolve(l):function(t,e){void 0===e&&(e=u());d(t,e);var n=t.url,a=t.attributes;if("string"!=typeof n||0===n.length)throw new Error("Invalid url.");if(void 0!==a&&"object"!=typeof a)throw new Error("Expected attributes to be an object.");return new e((function(t,e){if("undefined"==typeof window)return t();!function(t){var e=t.url,n=t.attributes,a=t.onSuccess,r=t.onError,i=c(e,n);i.onerror=r,i.onload=a,document.head.insertBefore(i,document.head.firstElementChild)}({url:n,attributes:a,onSuccess:function(){return t()},onError:function(){var t=new Error('The script "'.concat(n,'" failed to load.'));return window.fetch?fetch(n).then((function(n){return 200===n.status&&e(t),n.text()})).then((function(t){var n=function(t){var e=t.split("/* Original Error:")[1];return e?e.replace(/\n/g,"").replace("*/","").trim():t}(t);e(new Error(n))})).catch((function(t){e(t)})):e(t)}})}))}({url:a,attributes:r},e).then((function(){var t=s(o);if(t)return t;throw new Error("The window.".concat(o," global variable is not available."))}))}function u(){if("undefined"==typeof Promise)throw new Error("Promise is undefined. To resolve the issue, use a Promise polyfill.");return Promise}function s(t){return window[t]}function d(t,e){if("object"!=typeof t||null===t)throw new Error("Expected an options object.");if(void 0!==e&&"function"!=typeof e)throw new Error("Expected PromisePonyfill to be a function.")}var p=n(1682),y=n(3984),h=n(3458),f=n(4284),v=n(3629),m=n(8072);function g(t){h.h.subscribe((function(){var e,n;e=y.hv.selectedGateway(),n=p.qA.modalUI.loadingMode(),e.startsWith("peachpay_paypal_")&&"finished"===n&&m.AQ.contents().length>0?((0,v.HD)(".paypal-btn-container",(function(t){t.classList.remove("hide")})),(0,v.HD)(".paypal-spinner-container",(function(t){t.classList.add("hide")}))):e.startsWith("peachpay_paypal_")&&m.AQ.contents().length>0?((0,v.HD)(".paypal-btn-container",(function(t){t.classList.add("hide")})),(0,v.HD)(".paypal-spinner-container",(function(t){t.classList.remove("hide")}))):((0,v.HD)(".paypal-btn-container",(function(t){t.classList.add("hide")})),(0,v.HD)(".paypal-spinner-container",(function(t){t.classList.add("hide")}))),function(t){var e,n,r,i,o;if(!y.hv.selectedGateway().startsWith("peachpay_paypal_"))return;try{for(var c=(0,a.XA)(Object.entries(t).sort((function(t,e){var n,r,i,o,c,l=(0,a.CR)(t,2),u=(l[0],l[1]),s=(0,a.CR)(e,2);s[0];return(null!==(i=null===(r=null===(n=s[1].state)||void 0===n?void 0:n.mountTarget)||void 0===r?void 0:r.length)&&void 0!==i?i:0)-(null!==(c=null===(o=u.state)||void 0===o?void 0:o.mountTarget.length)&&void 0!==c?c:0)}))),l=c.next();!l.done;l=c.next()){var u=(0,a.CR)(l.value,2),s=(u[0],u[1]);s.state||(s.state={mountTarget:""});var d=b();if(s.state.mountTarget&&s.state.mountTarget!==d&&(null===(r=null==s?void 0:s.detach)||void 0===r||r.call(s),s.state.mountTarget=""),y.hv.selectedGateway()===s.config.gatewayId){if(s.state.mountTarget)continue;null===(i=null==s?void 0:s.attach)||void 0===i||i.call(s,d),s.state.mountTarget=d}else{if(!s.state.mountTarget)continue;null===(o=null==s?void 0:s.detach)||void 0===o||o.call(s),s.state.mountTarget=""}}}catch(t){e={error:t}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(e)throw e.error}}}(t)}))}function b(){return(0,v.tq)()?"#mobile-customer-pay-button .paypal-btn-container":"#pay-button .paypal-btn-container"}const w=n.p+"img/173aa60cc278bf30fb32-paypal.svg",_=n.p+"img/8c8968a2f7f7a789c35a-paypal.svg";var P=n(4209),E=n(7246),L=n(4681),T=n(8472),C=function(){function t(t,e,n){this.paypal=t,this.orderService=e,this.gatewayId=n.gatewayId,this.fundingType=n.fundingType,this.buttonStyle=n.buttonStyle,this.isMounted=!1,this.mountContainer=null,this.currentPaymentDetails=null,this.currentTransaction=null,this.button=this.createButtonComponent()}return t.prototype.isEligible=function(){var t,e;return null!==(e=null===(t=this.button)||void 0===t?void 0:t.isEligible())&&void 0!==e&&e},t.prototype.mount=function(t){var e,n;if(!this.isMounted){var a=(0,v.MW)(t);a&&(this.button||(this.button=this.createButtonComponent()),this.mountContainer?null===(e=this.mountContainer)||void 0===e||e.classList.remove("hide"):(this.mountContainer=document.createElement("div"),a.insertAdjacentElement("beforeend",this.mountContainer),null===(n=this.button)||void 0===n||n.render(this.mountContainer).catch((function(){}))),this.isMounted=!0)}},t.prototype.unmount=function(){var t;this.isMounted&&(null===(t=this.mountContainer)||void 0===t||t.remove(),this.mountContainer=null,this.button=null,this.isMounted=!1)},t.prototype.createButtonComponent=function(){var t,e,n,r=this.orderService,i=this;return null!==(n=null===(e=null===(t=this.paypal)||void 0===t?void 0:t.Buttons)||void 0===e?void 0:e.call(t,{fundingSource:this.fundingType,style:this.buttonStyle,onClick:function(){h.h.dispatch((0,p.N5)())},createOrder:function(t,e){var n;return(0,a.mG)(this,void 0,void 0,(function(){var t,e,o,c,l,u,s,d,y,v,m,g,b;return(0,a.Jh)(this,(function(w){switch(w.label){case 0:return w.trys.push([0,6,,9]),[4,r.startTransaction(i.gatewayId)];case 1:return t=w.sent(),e=t.error,o=t.result,e||!o?(c=e?(0,L.H)(e):(0,f.M)("An unknown error occured while starting the transaction. Please refresh the page and try again."),(0,E.j1)(c),h.h.dispatch((0,p.tv)()),[2,""]):(i.currentTransaction=o,[4,r.placeOrder(i.currentTransaction)]);case 2:return l=w.sent(),u=l.error,s=l.result,u||!s||"success"!==s.result?(h.h.dispatch((0,p.tv)()),[2,""]):(d=new URL(s.redirect),y=(0,a.CR)(d.hash.split("="),2),v=y[0],m=y[1],"#payment_data"===v&&m?[3,5]:[4,i.currentTransaction.complete({note:"Failed to retrieve paypal payment details from url: "+s.redirect})]);case 3:case 7:return w.sent(),[4,(0,E.t9)()];case 4:case 8:return w.sent(),h.h.dispatch((0,p.tv)()),[2,""];case 5:return g=JSON.parse(atob(decodeURIComponent(m))),i.currentPaymentDetails=g,[2,g.data.id];case 6:return b=w.sent(),[4,null===(n=i.currentTransaction)||void 0===n?void 0:n.complete({note:"Failed creating paypal order: "+(0,L.H)(b)})];case 9:return[2]}}))}))},onApprove:function(t,e){var n,r,o,c,l,u;return(0,a.mG)(this,void 0,void 0,(function(){var t,s,d,y,v,m;return(0,a.Jh)(this,(function(a){switch(a.label){case 0:return(null===(n=i.currentPaymentDetails)||void 0===n?void 0:n.order_id)?[3,3]:[4,null===(r=i.currentTransaction)||void 0===r?void 0:r.complete({note:'Failed approving paypal order: "Missing payment details"'})];case 1:return a.sent(),e.restart(),[4,(0,E.t9)()];case 2:return a.sent(),h.h.dispatch((0,p.tv)()),[2];case 3:return(t=p.L0.metadata("peachpay_paypal_gateways","approve_order_url"))?[3,6]:[4,null===(o=i.currentTransaction)||void 0===o?void 0:o.complete({note:'Failed approving paypal order: "Missing required approve URL or approve URL security nonce"'})];case 4:return a.sent(),e.restart(),[4,(0,E.t9)()];case 5:return a.sent(),h.h.dispatch((0,p.tv)()),[2];case 6:return(s=new FormData).append("order_id",i.currentPaymentDetails.order_id),[4,fetch(t,{method:"POST",body:s})];case 7:d=a.sent(),a.label=8;case 8:return a.trys.push([8,13,,18]),[4,d.json()];case 9:return(y=a.sent()).success?[3,12]:[4,null===(c=i.currentTransaction)||void 0===c?void 0:c.complete({note:y.message})];case 10:return a.sent(),e.restart(),[4,(0,E.t9)()];case 11:return a.sent(),h.h.dispatch((0,p.tv)()),[2];case 12:return[3,18];case 13:return v=a.sent(),[4,null===(l=e.order)||void 0===l?void 0:l.get()];case 14:return"APPROVED"===(null==(m=a.sent())?void 0:m.status)||"COMPLETED"===(null==m?void 0:m.status)?[3,17]:(h.h.dispatch((0,P.Qe)((0,f.M)("PayPal order failed to finish."))),[4,null===(u=i.currentTransaction)||void 0===u?void 0:u.complete({note:"PayPal order failed to finish: ".concat((0,L.H)(v))})]);case 15:return a.sent(),e.restart(),[4,(0,E.t9)()];case 16:return a.sent(),h.h.dispatch((0,p.tv)()),[2];case 17:return[3,18];case 18:return(0,T.c)(),window.top?window.top.location.href=i.currentPaymentDetails.success_url:e.redirect(i.currentPaymentDetails.success_url),[2]}}))}))},onCancel:function(t,e){var n,r;return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(t){switch(t.label){case 0:return i.currentPaymentDetails?[3,3]:[4,null===(n=i.currentTransaction)||void 0===n?void 0:n.complete({paymentStatus:"CANCELED",orderStatus:"unknown",note:'Payment canceled by customer. Order status "unknown" because of missing payment details.'})];case 1:return t.sent(),[4,(0,E.t9)()];case 2:return t.sent(),h.h.dispatch((0,p.tv)()),[2];case 3:return[4,null===(r=null==i?void 0:i.currentTransaction)||void 0===r?void 0:r.complete({paymentStatus:"CANCELED",orderStatus:"canceled"})];case 4:return t.sent(),function(t){try{var e=new XMLHttpRequest;e.open("GET",t),e.send()}catch(t){}}(i.currentPaymentDetails.cancel_url),h.h.dispatch((0,p.tv)()),[2]}}))}))},onError:function(t){var e;return(0,a.mG)(this,void 0,void 0,(function(){return(0,a.Jh)(this,(function(n){switch(n.label){case 0:return[4,null===(e=i.currentTransaction)||void 0===e?void 0:e.complete({note:(0,L.H)(t)})];case 1:return n.sent(),i.currentTransaction=null,i.currentPaymentDetails=null,[4,(0,E.t9)()];case 2:return n.sent(),h.h.dispatch((0,p.tv)()),[2]}}))}))}}))&&void 0!==n?n:null},t}();var D=n(9256);const I=n.p+"img/cad4a91407099c0b1e1f-paypal-paylater.svg";const S=n.p+"img/2598d60ef6ba61ecf216-venmo.svg",A=n.p+"img/29b34a2d06a2137a30a2-venmo.svg";var k=n(6159);function R(t){return(0,a.mG)(this,void 0,void 0,(function(){var e,n,i,o,c,u,s=this;return(0,a.Jh)(this,(function(d){return p.L0.enabled("peachpay_paypal_gateways")?(e=p.L0.metadata("peachpay_paypal_gateways","client_id"),n=p.L0.metadata("peachpay_paypal_gateways","merchant_id"),i=p.L0.metadata("peachpay_paypal_gateways","partner_attribution_id"),e&&n&&i?(o=function(){var t={},e={};if(p.L0.enabled("peachpay_paypal_wallet_gateway")){var n=function(){var t,e,n=null,a={name:null!==(t=p.L0.metadata("peachpay_paypal_wallet_gateway","title"))&&void 0!==t?t:"PayPal",gatewayId:"peachpay_paypal_wallet",description:j("PayPal",_,(0,f.M)("After selecting the PayPal button you will be prompted to complete your payment.")),assets:{badge:{src:w},title:{src:_}}};return{config:a,activate:function(t,e){var r;n=new C(t,e,{gatewayId:"peachpay_paypal_wallet",fundingType:"paypal",buttonStyle:null!==(r=p.L0.metadata("peachpay_paypal_wallet_gateway","button_style"))&&void 0!==r?r:void 0}),a.initialized=n.isEligible(),h.h.dispatch((0,D.s)())},reset:function(){null==n||n.unmount(),n=null,a.initialized=!1,h.h.dispatch((0,D.s)())},attach:function(t){clearInterval(e),e=setInterval((function(){n&&(n.mount(t),clearInterval(e))}),200)},detach:function(){null==n||n.unmount()}}}();t[n.config.gatewayId]=n,e[n.config.gatewayId]=n.config}if(p.L0.enabled("peachpay_paypal_venmo_gateway")){n=function(){var t,e=null,n={name:null!==(t=p.L0.metadata("peachpay_paypal_venmo_gateway","title"))&&void 0!==t?t:"Venmo",gatewayId:"peachpay_paypal_venmo",description:j("Venmo",A,(0,f.M)("After selecting the Venmo button you will be prompted to complete your payment.")),assets:{badge:{src:S},title:{src:A}}};return{config:n,activate:function(t,a){var r;e=new C(t,a,{gatewayId:"peachpay_paypal_venmo",fundingType:"venmo",buttonStyle:null!==(r=p.L0.metadata("peachpay_paypal_venmo_gateway","button_style"))&&void 0!==r?r:void 0}),n.initialized=e.isEligible(),h.h.dispatch((0,D.s)())},reset:function(){null==e||e.unmount(),e=null,n.initialized=!1,h.h.dispatch((0,D.s)())},attach:function(t){null==e||e.mount(t)},detach:function(){null==e||e.unmount()}}}();t[n.config.gatewayId]=n,e[n.config.gatewayId]=n.config}if(p.L0.enabled("peachpay_paypal_paylater_gateway")){n=function(){var t,e=null,n={name:null!==(t=p.L0.metadata("peachpay_paypal_paylater_gateway","title"))&&void 0!==t?t:"PayPal Pay Later",gatewayId:"peachpay_paypal_paylater",description:j("PayPal Pay Later",I,(0,f.M)("After selecting the PayPal Pay Later button you will be prompted to complete your payment.")),assets:{badge:{src:w},title:{src:I}}};return{config:n,activate:function(t,a){var r;e=new C(t,a,{gatewayId:"peachpay_paypal_paylater",fundingType:"paylater",buttonStyle:null!==(r=p.L0.metadata("peachpay_paypal_paylater_gateway","button_style"))&&void 0!==r?r:void 0}),n.initialized=e.isEligible(),h.h.dispatch((0,D.s)())},reset:function(){null==e||e.unmount(),e=null,n.initialized=!1,h.h.dispatch((0,D.s)())},attach:function(t){null==e||e.mount(t)},detach:function(){null==e||e.unmount()}}}();t[n.config.gatewayId]=n,e[n.config.gatewayId]=n.config}if(p.L0.enabled("peachpay_paypal_credit_gateway")){n=function(){var t,e=null,n={name:null!==(t=p.L0.metadata("peachpay_paypal_credit_gateway","title"))&&void 0!==t?t:"PayPal Credit",gatewayId:"peachpay_paypal_credit",description:j("PayPal Credit",_,(0,f.M)("After selecting the PayPal Credit button you will be prompted to complete your payment.")),assets:{badge:{src:w},title:{src:_}}};return{config:n,activate:function(t,a){var r;e=new C(t,a,{gatewayId:"peachpay_paypal_credit",fundingType:"credit",buttonStyle:null!==(r=p.L0.metadata("peachpay_paypal_credit_gateway","button_style"))&&void 0!==r?r:void 0}),n.initialized=e.isEligible(),h.h.dispatch((0,D.s)())},reset:function(){null==e||e.unmount(),e=null,n.initialized=!1,h.h.dispatch((0,D.s)())},attach:function(t){null==e||e.mount(t)},detach:function(){null==e||e.unmount()}}}();t[n.config.gatewayId]=n,e[n.config.gatewayId]=n.config}return h.h.dispatch((0,y.Cj)(e)),t}(),g(o),c=new Set(["USD","AUD","BRL","CAD","CZK","DKK","EUR","HKD","HUF","ILS","JPY","MYR","MXN","TWD","NZD","NOK","PHP","PLN","GBP","RUB","SGD","SEK","CHF","THB"]),u="",h.h.subscribe((function(){return(0,a.mG)(s,void 0,void 0,(function(){var s,d,p,y,h,f,v,m,g;return(0,a.Jh)(this,(function(b){switch(b.label){case 0:if((s=r.l9.currency.code())===u)return[2];u=s;try{for(d=(0,a.XA)(Object.entries(o)),p=d.next();!p.done;p=d.next())y=(0,a.CR)(p.value,2),y[0],(h=y[1]).reset(),h.state=void 0}catch(t){m={error:t}}finally{try{p&&!p.done&&(g=d.return)&&g.call(d)}finally{if(m)throw m.error}}if(!c.has(s))return[2];b.label=1;case 1:return b.trys.push([1,4,,5]),[4,l({"client-id":e,"merchant-id":n,"data-partner-attribution-id":i,"enable-funding":"venmo",currency:r.l9.currency.code(),"data-page-type":"checkout"})];case 2:return(f=b.sent())?[4,M(f,o,t)]:[2];case 3:return b.sent(),[3,5];case 4:return v=b.sent(),(0,k.W)(new Error("PayPal SDK failed to load"),{error:v}),[3,5];case 5:return[2]}}))}))})),[2]):[2]):[2]}))}))}function M(t,e,n){return(0,a.mG)(this,void 0,void 0,(function(){var r,i,o,c,l,u,s;return(0,a.Jh)(this,(function(d){switch(d.label){case 0:r=[];try{for(i=(0,a.XA)(Object.entries(e)),o=i.next();!o.done;o=i.next())c=(0,a.CR)(o.value,2),c[0],(l=c[1]).activate&&r.push(l.activate(t,n))}catch(t){u={error:t}}finally{try{o&&!o.done&&(s=i.return)&&s.call(i)}finally{if(u)throw u.error}}return[4,Promise.all(r)];case 1:return d.sent(),[2]}}))}))}function j(t,e,n){return'\n    <img style="display: block; text-align: left; height: 1.7rem; " src="'.concat(e,'">\n    <p style="text-align: left; margin: 0.5rem 0;">').concat(t," ").concat((0,f.M)("selected for checkout."),'</p>\n    <hr>\n    <p style="text-align: left; margin: 0.5rem 0 0;" class="muted">').concat(n,"</p>")}}}]);
//# sourceMappingURL=585-8623a84cf8779ce682a6.js.map