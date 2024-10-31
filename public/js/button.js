// deno-lint-ignore-file camelcase
let variationID = '';
let loaded = false;
let buttonClickedBeforeLoad = false;
let buttonClickedBeforeLoadID = '';
const selectedOutOfStockItems = new Set();
const pendingVariationDetailRequests = 0;

// deno-lint-ignore no-unused-vars
const peachpayVersion = peachpay_data.version;

// In order to make sure the mini cart is always placed put this here and it on
// loading the window will always place it.
if (peachpay_data.hide_mini_cart !== '1') {
	self.addEventListener('DOMContentLoaded', () => {
		peachpay_placeButtonMiniCart();
		jQuery(document.body).on(
			'wc_fragments_loaded wc_fragments_refreshed',
			() => {
				peachpay_placeButtonMiniCart();
			},
		);
	});
}

function ppOnWindowDataFetch(endpoint, requestCallback) {
	self.addEventListener('message', async (message) => {
		if (message.data.event === endpoint) {
			try {
				const response = await requestCallback(message.data.request);
				// eslint-disable-next-line unicorn/require-post-message-target-origin
				message.ports[0].postMessage({ result: response });
			} catch (error) {
				// eslint-disable-next-line unicorn/require-post-message-target-origin
				message.ports[0].postMessage({ error });
			}
		}
	});
}

// deno-lint-ignore no-unused-vars
function ppOnWindowMessage(eventName, cb) {
	self.addEventListener('message', async (event) => {
		if (event.data.event === eventName) {
			await cb(event.data);
		}
	}, false);
}

ppOnWindowDataFetch('pp-create-stripe-payment-intent', (request) => {
	return setupStripeIntent('payment', request);
});
ppOnWindowDataFetch('pp-create-stripe-setup-intent', (request) => {
	return setupStripeIntent('setup', request);
});

async function setupStripeIntent(intentType, request) {
	const formData = new FormData();

	formData.append('type', intentType);
	formData.append('session[id]', request.session.id);
	formData.append('session[stripe][customer_id]', request.session.stripe.customer_id);
	formData.append('session[stripe][connect_id]', request.session.stripe.connect_id);
	formData.append('session[stripe][payment_method_id]', request.session.stripe.payment_method_id);
	formData.append('session[stripe][payment_method_type]', request.session.stripe.payment_method_type);
	formData.append('transaction[id]', request.transaction.id);
	formData.append('order[id]', request.order.id);
	formData.append('order[data]', JSON.stringify(request.order.data));

	const response = await fetch(`${peachpay_data.wp_site_url}?wc-ajax=pp-create-stripe-${intentType}-intent`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		return null;
	}

	return response.json();
}

ppOnWindowDataFetch('pp-create-square-payment', async (request) => {
	const formData = new FormData();

	formData.append(`session[id]`, request.session.id);
	formData.append(`transaction[id]`, request.transaction.id);
	formData.append('transaction[square][source_id]', request.transaction.square.source_id);
	formData.append('transaction[square][verification_token]', request.transaction.square.verification_token);
	formData.append('order[id]', request.order.id);
	formData.append('order[data]', JSON.stringify(request.order.data));

	const response = await fetch(`${peachpay_data.wp_site_url}?wc-ajax=pp-create-square-payment`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		return null;
	}

	return response.json();
});

ppOnWindowDataFetch('pp-create-authnet-payment', async (request) => {
	const formData = new FormData();

	formData.append(`session[id]`, request.session.id);
	formData.append(`transaction[id]`, request.transaction.id);
	formData.append('transaction[authnet][data_value]', request.transaction.authnet.data_value);
	formData.append('transaction[authnet][data_descriptor]', request.transaction.authnet.data_descriptor);
	formData.append('order[id]', request.order.id);
	formData.append('order[data]', JSON.stringify(request.order.data));

	const response = await fetch(`${peachpay_data.wp_site_url}?wc-ajax=pp-create-authnet-payment`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		return null;
	}

	return response.json();
});

ppOnWindowDataFetch('pp-place-order', placeOrder);
ppOnWindowDataFetch('pp-set-order-status', async (data) => {
	const response = await setOrderStatus(data.order.id, {
		status: data.order.status,
		message: data.order.message,
		paymentMethod: {
			method: data.order.paymentMethod,
			id: data.order.stripeCustomerId,
			transactionID: data.order.paypalTransactionId,
		},
	});

	if (response.ok) {
		return true;
	}

	return false;
});

ppOnWindowDataFetch('pp-add-order-note', async (data) => {
	const formData = new FormData();

	formData.append('id', data.id);
	formData.append('note', data.note);

	const response = await fetch(`${peachpay_data.wp_site_url}?wc-ajax=pp-order-note`, {
		method: 'POST',
		body: formData,
	});

	return response.ok;
});

ppOnWindowDataFetch('pp-validate-billing-address', (data) => validateAddress(formDataFromInfo(data)));

ppOnWindowDataFetch('pp-calculate-cart', async (data) => {
	const formData = new FormData();

	if (!data.initial) {
		for (const methodKey of Object.keys(data.order.selected_shipping)) {
			formData.append(`order[selected_shipping][${methodKey}]`, data.order.selected_shipping[methodKey]);
		}

		formData.append('order[shipping_location][country]', data.order.shipping_location.country);
		formData.append('order[shipping_location][state]', data.order.shipping_location.state);
		formData.append('order[shipping_location][city]', data.order.shipping_location.city);
		formData.append('order[shipping_location][postcode]', data.order.shipping_location.postcode);
		formData.append('order[payment_method]', data.order.payment_method);
		formData.append('order[payment_method_variation]', data.order.payment_method_variation);
	}

	return await peachpayCartUpdate(formData);
});

self.addEventListener('message', async (event) => {
	if (event.data === 'openModal') {
		if (peachpay_data.custom_checkout_js) {
			const frame = document.querySelector('#peachpay-iframe');
			const frag = document.createRange().createContextualFragment(peachpay_data.custom_checkout_js);
			[...frag.children].forEach((child) => {
				child.classList.add('pp-custom-js');
			});
			frame.contentDocument.body.appendChild(frag);
		}

		document.querySelector('#peachpay-iframe').classList.remove('hide');
		document.querySelector('#peachpay-iframe').contentWindow.postMessage({ event: 'UI::modalOpened' }, '*');
		document.querySelector('#loading-spinner-iframe').classList.add('hide');
		document.querySelector('#pp-modal-overlay').style.display = 'block';

		document.body.style.overflow = 'hidden';
		if (/iPhone|iPad/i.test(navigator.userAgent)) {
			document.body.style.position = 'fixed';
		}
		document.body.style.touchAction = 'none';
		peachpay_hideLoadingSpinner();
		/* This setTimeout is necessary to bring the transition
		to a different thread on the browser level so that
		it utilizes the transition on all pages. */
		setTimeout(function () {
			document.querySelector('#peachpay-iframe').style.opacity = 1;
			document.querySelector('#peachpay-iframe').style.top = 0;
			document.querySelector('.pp-overlay').style.background = 'rgba(0, 0, 0, 0.85)';
		}, 1);
	}

	if (event.data.event === 'currencyUpdate') {
		peachpayUpdateCurrencyCookie(event.data.currency);
	}

	if (event.data === 'closeModal') {
		closeModal();
		if (
			peachpay_data.feature_support.currency_switcher_input &&
			(peachpay_data.feature_support.currency_switcher_input.metadata.how_currency_defaults === 'billing_country' || peachpay_data.feature_support.currency_switcher_input.enabled === true)
		) {
			window.location.reload();
		}
	}

	if (event.data === 'pp-loaded') {
		peachpayInitCouponSupport();
		loaded = true;
		if (buttonClickedBeforeLoad) {
			const options = {
				isMiniCart: buttonClickedBeforeLoadID === 'pp-button-mini',
				clickID: buttonClickedBeforeLoadID,
			};
			sendButtonClickedMessage(options);
		}
	}

	if (event.data.event === 'redeemGiftCard') {
		redeemGiftCard(peachpay_data, event.data.cardNumber);
	}

	if (event.data.event === 'addLinkedProduct' || event.data.event === 'addUpsellItem') {
		const message = 'Something went wrong, please try again.';

		if (await peachpay_addLinkedProductToCart(event)) {
			document.querySelector('#peachpay-iframe').contentWindow.postMessage({
				event: 'pp-update-cart',
			}, '*');
		} else {
			alert(message);
		}
	}

	if (event.data.event === 'addVariableProduct') {
		if (await peachpay_addVariableProduct(event)) {
			document.querySelector('#peachpay-iframe').contentWindow.postMessage({
				event: 'pp-update-cart',
			}, '*');
		} else {
			alert('Sorry, no products matched your selection. Please choose a different combination.');
			document.querySelector('#peachpay-iframe').contentWindow.postMessage({
				event: 'pp-variation-fail',
			}, '*');
		}
	}
});

function closeModal() {
	if (peachpay_data.custom_checkout_js) {
		const frame = document.querySelector('#peachpay-iframe');
		frame.contentDocument.querySelectorAll('.pp-custom-js').forEach((ele) => {
			ele.remove();
		});
	}

	if (window.location.href.includes('?open_peachpay')) {
		window.location = `${peachpay_data.wc_cart_url}`;
	}

	// This updates the background pages native cart
	if (peachpay_data.is_checkout_page) {
		jQuery(document.body).trigger('update_checkout', { update_shipping_method: false });
	} else if (peachpay_data.is_cart_page) {
		jQuery(document.body).trigger('wc_update_cart');
	}

	if (!peachpay_data.is_cart_page || document.querySelector('#pp-button') && document.querySelector('#pp-button').classList.contains('pp-button-float')) {
		jQuery(document.body).trigger('wc_fragment_refresh');
	}

	document.querySelector('#peachpay-iframe').style.opacity = 0;
	document.querySelector('#peachpay-iframe').style.top = '50%';
	document.querySelector('.pp-overlay').style.background = 'rgba(40, 40, 40, 0)';

	if (peachpay_data.button_mobile_product_page == 'fixed' && document.querySelector('#pp-button-container')) {
		document.querySelector('#pp-button-container').classList.remove('hide');
	}

	setTimeout(function () {
		document.querySelector('#peachpay-iframe').contentWindow.postMessage({ event: 'UI::modalClosed' }, '*');
		document.querySelector('#pp-modal-overlay').style.display = 'none';
		document.body.style.overflow = 'auto';
		document.body.style.position = '';
		document.body.style.touchAction = 'auto';
	}, 300);
}

function baseStoreURL() {
	return location.hostname === 'localhost' ? `http://${location.hostname}:8000` : `https://${peachpay_data.wp_hostname}`;
}

function basePeachPayAPIURL(merchantHostname) {
	if (peachpay_data.test_mode) {
		switch (merchantHostname) {
			case 'store.local':
			case 'woo.store.local':
				return 'https://dev.peachpay.local'; // Local https
			default:
				return 'https://dev.peachpay.app';
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
		case 'qa-david.peachpay.app':
		case 'qa-vikrant.peachpay.app':
		case 'demo-plum.peachpay.app':
		case 'demo.peachpay.app':
		case 'ui-test.peachpayp.app':
			return 'https://dev.peachpay.app';
		case 'store.local':
		case 'woo.store.local':
			return 'https://prod.peachpay.local'; // Local https
		default:
			return 'https://prod.peachpay.app';
	}
}

// deno-lint-ignore no-unused-vars
function isDevEnvironment(baseUrl) {
	return baseUrl === 'https://dev.peachpay.app' ||
		baseUrl === 'https://dev.peachpay.local' ||
		baseUrl === 'https://prod.peachpay.local';
}

/**
 * Initializes the peachpay button.
 *
 * @param { IButtonConfigurationOptions } options Peachpay button configuration options.
 */
function peachpay_initButton(options) {
	peachpay_installCheckoutIframe();

	peachpay_initButtonContainer(options);
	peachpay_initButtonEvents(options);
}

/**
 * Installs the PeachPay Iframe into the DOM if it has not already been added.
 */
function peachpay_installCheckoutIframe() {
	if (document.querySelector('#pp-modal-overlay')) {
		return;
	}

	const $div = document.createElement('div');
	$div.innerHTML = peachpay_checkoutFormHTMLTemplate();

	const $iframeContainer = $div.querySelector('#pp-modal-overlay');
	const $iframe = $div.querySelector('#peachpay-iframe');

	$iframe.addEventListener('load', () => {
		// For detecting support of peachpay alerts to prevent silent failures of messages
		$iframe.contentWindow.postMessage({
			event: 'init',
			// wp_hostname is based on site_url(), which prevents bugs for subdirectory-based sites
			merchantHostname: peachpay_data.wp_hostname,
			isTestMode: peachpay_data.test_mode,
			isCartPage: peachpay_data.is_cart_page,
			isCheckoutPage: peachpay_data.is_checkout_page,
			isShopPage: peachpay_data.is_shop_page,
			isGroupedProduct: isGroupedProduct(),
			isMobile: peachpay_isMobile(),
			phpData: peachpay_data,
			browserLocale: navigator.language || 'en-US',
			// This is different from the above because it is what the site
			// owner sets, whereas browserLocale is how the user configures
			// their browser.
			pageLanguage: languageCodeToLocale(getPageLanguage()),
		}, '*');
	});

	// Add iframe to DOM to load.
	document.querySelector('body').insertAdjacentElement('beforeend', $iframeContainer);
}

document.addEventListener('DOMContentLoaded', () => {
	if (!peachpay_data.cart) {
		peachpay_data.cart = [];
	}

	if (document.querySelector('#pp-button') && document.querySelector('#pp-button').classList.contains('pp-button-float')) {
		peachpay_initButton({ isMiniCart: false });
	}

	// Start the button mute observer, now that the button to observe has loaded
	const $addToCart = document.querySelector('.single_add_to_cart_button');
	if ($addToCart) {
		peachpay_stock_observer.observe($addToCart, { attributes: true });
	}
});

function peachpay_initButtonEvents(options) {
	const elmtIdExt = options.isMiniCart ? '-mini' : options.isShortcode ? '-shortcode' : '';
	const button = document.querySelector(`#pp-button${elmtIdExt}`);
	const paymentRequest = document.querySelector('#pp-stripe-payment-request-wrapper') || document.querySelector('#pp-button-shortcode');

	// Apply some dynamic styles to the button
	if (!options.isElementor && !button.classList.contains('pp-button-float')) {
		button.style.width = options.width || '100%';
		button.style.setProperty('--pp-button-background-color', peachpay_data.button_color || '#ff876c');
		button.style.setProperty('--pp-button-text-color', peachpay_data.button_text_color || '#ffffff');
		if (options.borderRadius && !options.isMiniCart) {
			button.style.borderRadius = options.borderRadius.toString() + 'px';
		}
		if (options.width) {
			paymentRequest.style.width = options.width;
		}
	}

	tryToMatchFontSize(button, options.isMiniCart);

	// It's easier to handle extra cart features such as coupons on the actual
	// cart page since the product pages were not exactly built for that, so
	// redirect to the cart page for these extra features
	if (shouldRedirectToCartPage()) {
		button.addEventListener('click', async () => {
			peachpay_showLoadingSpinner(options.isMiniCart);

			if (!peachpay_validateProductPageForm(options)) {
				peachpay_hideLoadingSpinner();
				return;
			}

			const success = await peachpay_addProductToCart(options);

			if (success) {
				window.location = `${peachpay_data.wc_cart_url}?open_peachpay`;
			}

			peachpay_hideLoadingSpinner();
		});
		return;
	}

	button.addEventListener('click', (event) => {
		if (button.classList.contains('pp-button-float') && document.querySelector('#pp-item-count') && parseInt(document.querySelector('#pp-item-count').innerHTML) === 0) {
			document.querySelector('#empty-cart-msg').classList.remove('hide');
			setTimeout(() => {
				document.querySelector('#empty-cart-msg').classList.add('hide');
			}, 1000);
		} else {
			openPeachPay({ event, options });
		}
	});

	const itemCount = document.querySelector('#pp-item-count');
	if (itemCount && window.matchMedia('(max-width: 900px)').matches && !peachpay_data.test_mode) {
		parseInt(document.querySelector('#pp-item-count').innerHTML) > 0 ? document.querySelector('.pp-float-container').classList.remove('hide') : '';
	}

	// If coming from an extra feature redirect, open up PeachPay right away
	const urlParameters = new URLSearchParams(location.search);
	if (urlParameters.has('open_peachpay')) {
		// Show a loading overlay so it's clear that something is loading
		document.querySelector('#peachpay-iframe').classList.add('hide');
		document.querySelector('#loading-spinner-iframe').classList.remove('hide');
		document.querySelector('#pp-modal-overlay').style.display = 'flex';
		document.querySelector('body').style.overflow = 'hidden';

		openPeachPay({
			alternateEvent: 'pp-button',
			options: options,
		});
	}
}

function tryToMatchFontSize(button, isMiniCart) {
	if (isMiniCart) {
		return;
	}

	const selector = peachpay_data.is_cart_page ? '.wc-proceed-to-checkout .button.checkout-button' : 'button[name="add-to-cart"]';
	const elementToCopy = document.querySelector(selector);
	const buttonIcon = document.querySelector('#button-icon-regular');
	if (elementToCopy) {
		button.style.fontSize = window.getComputedStyle(elementToCopy).fontSize;
		if (window.getComputedStyle(elementToCopy).fontSize > '16px' && buttonIcon) {
			if (peachpay_data.button_icon === 'mountain') {
				buttonIcon.style = 'height: 15px !important';
			} else {
				buttonIcon.style = 'width: 24px !important; height: 24px !important;';
			}
		}
	}
}

/**
 * Check if the the stores's product page button should redirect to cart page.
 * This is used to bypass issues that are difficult to fix on the product
 * page.
 */
function shouldRedirectToCartPage() {
	if (peachpay_data.is_cart_page || peachpay_data.is_checkout_page) {
		return false;
	}

	const sites = new Set([
		'counterattackgame.com',
	]);

	if (sites.has(location.hostname)) {
		return true;
	}

	return false;
}

/**
 * Collects information about what button was click and then sends click message.
 *
 * @param { { event?: Event,alternateEvent?: string, options: IButtonConfigurationOptions} } context The button click context.
 */
function openPeachPay(context) {
	let targetID = '';

	if (context.event) {
		targetID = context.event.currentTarget ? context.event.currentTarget.id : 'redirect';
	} else {
		targetID = context.alternateEvent;
	}

	peachpay_showLoadingSpinner(context.options.isMiniCart);

	if (!loaded || pendingVariationDetailRequests > 0) {
		buttonClickedBeforeLoad = true;
		buttonClickedBeforeLoadID = targetID;
		return;
	}

	context.options.clickID = targetID;
	sendButtonClickedMessage(context.options);
}

/**
 * Initializes the PeachPay button container.
 *
 * @param { IButtonConfigurationOptions } options PeachPay button configuration options.
 */
function peachpay_initButtonContainer(options) {
	if (options.isMiniCart || options.isShortcode) {
		// They cannot change the position of the button in the mini cart because
		// only the native style looks good
		if (!peachpay_data.test_mode) {
			document.querySelector('#pp-button-container-shortcode')?.classList.remove('hide');
		}
		return;
	}

	const container = document.querySelector('#pp-button-container');
	// On the product page, no position option is provided
	if (!options.isElementor) {
		container.style.textAlign = options.alignment || 'inherit';
	}

	container.style.justifyContent = options.alignment || 'inherit';
}

function getPageLanguage() {
	const $html = document.querySelector('html');
	if (!$html) {
		return 'en-US';
	}

	return document.querySelector('html').lang || 'en-US';
}

function peachpay_isProductInWCCart(formData) {
	let isBundleProduct = false;
	// Get variation id from variation product
	let variationId = Number.parseInt(formData.get('variation_id'));
	// Get variation id from bundle product that includes variation id
	for (const key of formData.keys()) {
		if (key.includes('bundle_variation')) {
			isBundleProduct = true;
			variationId = Number.parseInt(formData.get(key));
		}
	}

	// Get product id from product ('add-to-cart' is used in simple product and bundle product)
	const productId = Number.parseInt(formData.get('add-to-cart'));
	for (const item of peachpay_data.cart) {
		if (isBundleProduct) {
			// If current product is part of a bundle and also a variation product, check for variation id
			if (Number.parseInt(item.product_id) === variationId) {
				return true;
			}
		} else if ((Number.parseInt(item.product_id) === variationId || Number.parseInt(item.product_id) === productId) && !item.is_part_of_bundle) {
			return true;
		}
	}

	return false;
}

async function sendButtonClickedMessage(options) {
	const isShopPage = document.querySelector('#pp-button') && document.querySelector('#pp-button').classList.contains('pp-button-float');
	const isProductPage = !peachpay_data.is_cart_page && !peachpay_data.is_checkout_page && !options.isMiniCart && !isShopPage && !options.isElementor;

	if (isProductPage || options.isShortcode || (options.isElementor && peachpay_data.is_elementor_product_page)) {
		if (!peachpay_validateProductPageForm(options)) {
			peachpay_hideLoadingSpinner();
			return;
		}

		if (!peachpay_isProductInWCCart(peachpay_getAddToCartFormData(options))) {
			const success = await peachpay_addProductToCart(options);

			peachpay_hideLoadingSpinner();

			if (!success) {
				return;
			}
		}
	}

	const data = {
		event: 'buttonClicked',
		buttonID: options.clickID,
	};

	if (peachpay_data.button_mobile_product_page == 'fixed' && document.querySelector('#pp-button-container')) {
		document.querySelector('#pp-button-container').classList.add('hide');
	}

	const peachpay = document.querySelector('#peachpay-iframe');
	peachpay.contentWindow.postMessage(data, '*');
}

function peachpay_validateProductPageForm(options) {
	if (options.isShortcode) {
		return true;
	}

	if (!checkValidityOf('form.cart')) {
		return false;
	}

	if (!inStockAndVariationSelected(options.isShortcode)) {
		return false;
	}

	return true;
}

function peachpay_insertFragments(fragments) {
	for (const fragmentKey of Object.keys(fragments)) {
		const $target = document.querySelector(fragmentKey);

		if (!$target) {
			continue;
		}

		$target.innerHTML = fragments[fragmentKey];
	}
}

/**
 * Used to update the rest of the native woocommerce page after peachpay cart manipulations. Not async
 * to avoid blocking
 */
function peachpay_refreshFragments(response) {
	if (response) {
		response.json().then((data) => {
			peachpay_insertFragments(data.fragments);
		}).catch(() => {
			// Do no harm.
		});

		return;
	}

	// Using promises and not (await/async) to avoid blocking.
	fetch(`${peachpay_data.wp_home_url}/?wc-ajax=get_refreshed_fragments`, {
		method: 'POST',
		time: Date.now(),
	}).then((response) => {
		if (!response.ok) {
			return;
		}

		return response.json();
	}).then((data) => {
		peachpay_insertFragments(data.fragments);
	}).catch(() => {
		// Do no harm.
	});
}

function checkValidityOf(selector) {
	const $form = document.querySelector(selector);
	let result = false;
	if ($form) {
		result = $form.checkValidity();
		$form.reportValidity();
	}

	return result;
}

function inStockAndVariationSelected(isMiniCart) {
	// Some product pages can have multiple products listed, usually through a plugin
	const $form = document.querySelector('form.cart');
	if (!$form) {
		return false;
	}
	const multipleProducts = Array.from($form.querySelectorAll('input.variation_id')).length > 1;

	if (selectedOutOfStockItems.size > 0 && !isMiniCart) {
		let outOfStockAlertText;
		if (multipleProducts) {
			outOfStockAlertText = getPluginLocaleText('Please select the remaining product options before adding this product to your cart.');
		} else {
			outOfStockAlertText = getPluginLocaleText('Sorry, this product is out of stock.');
		}

		alert(outOfStockAlertText);
		// We need to reset this, otherwise after seeing the above alert, then selecting
		// a variation, the PeachPay window will open right away which is an unexpected
		// behavior.
		buttonClickedBeforeLoad = false;
		peachpay_hideLoadingSpinner();
		return false;
	}

	if (!variationSelected() && !isMiniCart) {
		let notSelectedAlertText;
		if (multipleProducts) {
			notSelectedAlertText = getPluginLocaleText('Please select the remaining product options before adding this bundle to your cart.');
		} else {
			notSelectedAlertText = getPluginLocaleText('Please select the remaining product options before adding this product to your cart.');
		}

		alert(notSelectedAlertText);
		buttonClickedBeforeLoad = false;
		return false;
	}

	return true;
}

/**
 * Since this hidden input field which represents the currently selected
 * variation is changed by WooCommerce JS, there is no 'change' event that is
 * fired. This function is used primarily for that: to dispatch a change event
 * when the input's value is changed by JS. This method also preserves the
 * behavior set by other plugins' code.
 *
 * @param input The input element.
 */
function setDetectChangeHandler(input) {
	const superProps = Object.getPrototypeOf(input);
	const superSet = Object.getOwnPropertyDescriptor(superProps, 'value').set;
	const superGet = Object.getOwnPropertyDescriptor(superProps, 'value').get;
	const newProps = {
		get: function () {
			return Reflect.apply(superGet, this, arguments);
		},
		set: function () {
			setTimeout(() => this.dispatchEvent(new Event('change')), 50);
			return Reflect.apply(superSet, this, arguments);
		},
	};
	Object.defineProperty(input, 'value', newProps);
}

function setCustomVariationChangeHandler(input) {
	setDetectChangeHandler(input);

	input.addEventListener('change', (event) => {
		if (event.target.value === '') {
			return;
		}

		variationID = event.target.value;
		updateOutOfStockSelection(variationID);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const $variations = Array.from(document.querySelectorAll('.variation_id'));
	for (const $v of $variations) {
		setCustomVariationChangeHandler($v);
	}
});

function updateOutOfStockSelection(variationID) {
	const variationStockRecord = collectVariationStock();

	if (variationStockRecord.size === 0) {
		// It's possible that the variation IDs collected by collectVariationStock
		// are all just the value false (not sure why some stores do this). In this case, we want
		// to do nothing instead of letting it fall into the else block below erroneously.
		return;
	}

	if (variationStockRecord.get(variationID)) {
		// Turn it into an array for easy iteration
		const selectedOutOfStockItemsArray = Array.from(selectedOutOfStockItems);
		for (let i = 0; i < selectedOutOfStockItems.size; i++) {
			const group = collectVariationGroup(selectedOutOfStockItemsArray[i]);
			if (group.includes(variationID) && (variationID !== selectedOutOfStockItemsArray[i])) {
				// A replacement variation has been chosen for a previously selected out-of-stock item,
				// so we can remove the out-of-stock variation from the set
				selectedOutOfStockItems.delete(selectedOutOfStockItemsArray[i]);
			}
		}
	} else {
		selectedOutOfStockItems.add(variationID);
	}
}

/**
 * New Place order function for use with window fetch.
 */
async function placeOrder(data) {
	// Permission is denied we should only prompt for permission instead of placing a test order.
	if (!peachpay_data.has_valid_key) {
		peachpay_promptPermissions();
		return;
	}

	// Make sure Route Shipping Protection fee by route.com is not added
	// until we add compatibility for it
	if (peachpay_data.plugin_routeapp_active) {
		await removeRouteFee();
	}

	// Field editor resolves need for next line.
	const isBeYourBag = location.hostname === 'www.beyourbag.it' ||
		location.hostname === 'woocommerce-187306-844159.cloudwaysapps.com';

	const formData = formDataFromInfo(data.order.formRecord);

	formData.append('peachpay_checkout_nonce', peachpay_data.checkout_nonce);

	formData.append('payment_method', data.order.gateway);
	formData.append('payment_method_variation', data.order.paymentMethod);

	formData.append('terms', isBeYourBag ? 'on' : 1);

	// The following are not found on a standard WooCommerce checkout page, but
	// may be added by themes or plugins. It doesn't hurt if the field is
	// included when not required; it will be ignored.
	formData.append('european_gdpr', 1);
	formData.append('ct-ultimate-gdpr-consent-field', 'on');
	formData.append('ct-ultimate-gdpr-consent-field-additional', '1');
	formData.append('ct-ultimate-gdpr-consent-field-label-text', '1');
	formData.append('delivery_date', data.order.deliveryDate);

	// These are for www.veilevents.com until we find a more permanent solution.
	if (location.hostname === 'www.veilevents.com') {
		formData.append(
			'shipping_company',
			`${data.order.billingAddress.shipping_first_name} ${data.order.billingAddress.shipping_last_name}`,
		);
		formData.append('additional_where', 'Website');
	}

	if (data.order.merchantCustomerAccountType && data.order.merchantCustomerAccountType !== '') {
		formData.append('account_type', data.order.merchantCustomerAccountType);
	}

	if (data.order.merchantCustomerAccountEmail && data.order.merchantCustomerAccountEmail !== '') {
		formData.append('account_user_id', data.order.merchantCustomerAccountEmail);
	}

	if (data.order.merchantCustomerAccountPassword && data.order.merchantCustomerAccountPassword !== '') {
		formData.append('account_password', data.order.merchantCustomerAccountPassword);
	}

	if (data.order.customerOrderNotes && data.order.customerOrderNotes !== '') {
		formData.append('order_comments', data.order.customerOrderNotes);
	}

	if (peachpay_data.test_mode) {
		formData.append('peachpay_is_test_mode', true);
	}

	const orderResponse = await fetch(`${baseStoreURL()}/?wc-ajax=pp-order-create`, {
		method: 'POST',
		credentials: 'same-origin',
		body: formData,
	});

	const orderResult = await orderResponse.json();

	if (orderResult.result === 'failure' || orderResult.success === false) {
		orderResult.result = 'failure';
		if (orderResult.data) {
			const message = `<ul class="woocommerce-error message-wrapper" role="alert">
			<li>
				<div class="message-container container alert-color medium-text-center">
					<span class="message-icon icon-close"></span>
					${orderResult.data}
				</div>
			</li>
			</ul>`;
			orderResult.messages = message;
		}

		const errorContext = {
			type: 'WC-Order',
			merchant: location.hostname,
			sessionID: data.session.id,
			createOrderResponseStatus: orderResponse.status,
			orderResult,
			orderResultErrorText: parseWooCommerceHTMLError(orderResult.messages),
			formData: Object.fromEntries(formData),
		};

		await fetch(`${basePeachPayAPIURL(location.hostname)}/api/v1/error-log`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ errorContext }),
		});

		return orderResult;
	}

	await removeGiftCardsFromSession();

	return orderResult;
}

// Deno-lint-ignore camelcase
function peachpay_promptPermissions() {
	if (confirm('PeachPay requires permission to place test orders. Would you like to give permission? (Page will redirect)')) {
		window.location = peachpay_data.authorize_url;
	}

	closeModal();
}

function formDataFromInfo(info = {}) {
	const formData = new FormData();

	for (const key in info) {
		formData.append(key, info[key]);
	}

	return formData;
}

/**
 * Adds a product to the Woocommerce Cart.
 * @param { IButtonConfigurationOptions } options PeachPay button configuration options.
 * @returns {Promise<boolean>}
 */
async function peachpay_addProductToCart(options) {
	if (options.isMiniCart) {
		return true;
	}

	try {
		const formData = peachpay_getAddToCartFormData(options);
		const response = await fetch(peachpay_data.wp_home_url + '/?wc-ajax=add-to-cart', {
			method: 'POST',
			headers: { 'Accept': 'application/json' },
			body: formData,
		});

		if (!response.ok) {
			return false;
		}

		if (location.hostname === 'www.nomadicsupply.com') {
			const $selectedWarranty = document.querySelector('#cps_wordpress_warranty .selected');

			if ($selectedWarranty) {
				const warrantyId = $selectedWarranty.getAttribute('warranty-attr');

				const response = await fetch(peachpay_data.wp_home_url + '/?quantity=' + formData.get('quantity') + '&add-to-cart=' + String(warrantyId), {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
				});

				if (!response.ok) {
					return false;
				}
			}
		}

		peachpay_refreshFragments(response);

		return true;
	} catch (error) {
		if (error instanceof Error) {
			captureSentryException(new Error(`Product page "add to cart" failed on ${peachpay_data.wp_home_url}. Error: ` + error.message));
			alert(getPluginLocaleText('Sorry, something went wrong. Please refresh the page and try again.'));
		}

		return false;
	}
}

function peachpay_getAddToCartFormData(options) {
	if (options.isShortcode) {
		return peachpay_getShortCodeAddToCartFormData(options);
	}

	// Product page form data.
	const $form = document.querySelector('form.cart');
	const formData = new FormData($form);

	// Simple products use the submit button as the "add-to-cart" input. This input is only submitted if the
	// button is clicked so here we add the button input data manually.
	const $submitButton = $form.querySelector('button[name="add-to-cart"]');
	if ($submitButton) {
		formData.append('add-to-cart', $submitButton.value);
	}

	return formData;
}

// Only used by paypal now. Probably nothing in the future
function setOrderStatus(orderID, { status, message, paymentMethod }) {
	const formData = new FormData();

	formData.append('order_id', orderID);
	formData.append('transaction_id', paymentMethod.transactionID);
	formData.append('status', status);
	formData.append('status_message', message);

	return fetch(`${peachpay_data.wp_site_url}/?wc-ajax=pp-order-status`, {
		method: 'POST',
		body: formData,
	});
}

function parseWooCommerceHTMLError(html) {
	const element = document.createElement('div');
	element.innerHTML = html;
	const iter = document.createNodeIterator(element, NodeFilter.SHOW_TEXT);
	let textNode = iter.nextNode();
	let messageText = '';
	let i = 0;
	while (textNode) {
		const text = textNode.textContent.trim();

		if (text === '' || text === '\t' || text === '\n') {
			textNode = iter.nextNode();
			continue;
		}

		messageText += text;

		if (i > 0) {
			messageText += ' ';
		}

		textNode = iter.nextNode();
		i++;
	}

	return messageText.trim();
}

async function removeRouteFee() {
	const data = new FormData();
	data.append('action', 'woo_get_ajax_data');
	data.append('checkbox', false);
	const response = await fetch(peachpay_data.wp_ajax_url, {
		method: 'POST',
		body: data,
	});
	return response.status === 200;
}

async function validateAddress(formData) {
	const response = await fetch(`${peachpay_data.wp_site_url}/?wc-ajax=pp-validate-checkout`, {
		method: 'POST',
		body: formData,
	});
	if (response.status !== 200) {
		const error = new Error(`Checkout validation failed on ${peachpay_data.wp_home_url}`);
		captureSentryException(error);
		throw error;
	}

	const responseJson = await response.json();

	if (!responseJson.success) {
		alert(cleanValidateAddressResponse(responseJson.error_messages.join('\n')));
		return false;
	}

	return true;
}

function cleanValidateAddressResponse(message) {
	return message
		.replace(/(<([^>]+)>)/gi, '');
}

function isGroupedProduct() {
	return document.querySelector('form.cart.grouped_form') !== null;
}

function variationSelected() {
	const $form = document.querySelector('form.cart');
	if (!$form) {
		return false;
	}
	let $variations = Array.from($form.querySelectorAll('input.variation_id'));

	if (location.hostname === 'www.kidtoes.com' && peachpay_data.is_cart_page === '') {
		const summary = $form.querySelector('.summary-inner');
		$variations = summary.querySelectorAll('input.variation_id');
	}

	for (const variation of $variations) {
		if (variation !== null && (variation.value === '0' || variation.value === '')) {
			peachpay_hideLoadingSpinner();
			// A variation must be selected if given the option
			return false;
		}
	}

	return true;
}

// Get a map of all variations to whether that variation is in stock or not
function collectVariationStock() {
	const $forms = Array.from(document.querySelectorAll('.variations_form'));
	const variationInStock = new Map();
	for (const $form of $forms) {
		const variations = JSON.parse($form.dataset.product_variations);
		if (!variations) {
			continue;
		}
		for (const v of variations) {
			variationInStock.set(String(v.variation_id), v.is_in_stock);
		}
	}

	return variationInStock;
}

// Get all the variations in the group for a single product given one variation ID
function collectVariationGroup(variationID) {
	const $forms = Array.from(document.querySelectorAll('.variations_form'));
	const group = [];
	// Go through all forms in case there are multiple products on the page, like for product bundles
	for (const $form of $forms) {
		let found = false;
		const variations = JSON.parse($form.dataset.product_variations);
		if (!variations) {
			continue;
		}
		for (const v of variations) {
			if (String(v.variation_id) === variationID) {
				// We found the bundle product that has the given variation ID
				found = true;
			}
		}

		if (found) {
			// Now we add all the variation IDs to the group, which we can use to check
			// if the customer selected a non out-of-stock item after selecting an out-of-stock item
			for (const v of variations) {
				group.push(String(v.variation_id));
			}

			break;
		}
	}

	return group;
}

function peachpay_showLoadingSpinner(isMiniCart) {
	if (isMiniCart) {
		return;
	}

	if (document.querySelector('#pp-button') && !document.querySelector('#pp-button').classList.contains('pp-button-float')) {
		document.querySelectorAll('#loading-spinner').forEach(($el) => $el.classList.remove('hide'));
		document.querySelectorAll('#pp-button-content').forEach(($el) => $el.classList.add('hide'));
	}

	if (document.querySelector('#pp-button-shortcode')) {
		document.querySelectorAll('#loading-spinner').forEach(($el) => $el.classList.remove('hide'));
		document.querySelectorAll('#pp-button-content').forEach(($el) => $el.classList.add('hide'));
	}

	const $ppButton = document.querySelector('#pp-button');
	if ($ppButton) {
		$ppButton.disabled = true;
	}
}

function peachpay_hideLoadingSpinner() {
	const loadingSpinner = document.querySelectorAll('#loading-spinner');
	if (loadingSpinner) {
		loadingSpinner.forEach(($el) => $el.classList.add('hide'));
	}

	const buttonContent = document.querySelectorAll('#pp-button-content');
	if (buttonContent) {
		buttonContent.forEach(($el) => $el.classList.remove('hide'));
	}

	const $ppButton = document.querySelector('#pp-button');
	if ($ppButton) {
		$ppButton.disabled = false;
	}
}

function spinnerURL() {
	// For now we explicity list out the sites that should have a dark loading
	// symbol because of their light button color
	const dark = location.hostname === 'www.blazecandles.co' ? '-dark' : '';
	return `${peachpay_data.plugin_asset_url}public/img/spinner${dark}.svg`;
}

function peachpay_isMobile() {
	return window.innerWidth < 900;
}

function peachpay_pageTypeClass() {
	if (peachpay_data.is_cart_page) {
		return 'pp-cart-page';
	}
	if (peachpay_data.is_checkout_page) {
		return 'pp-product-page';
	}
	if (peachpay_data.is_shop_page) {
		return 'pp-shop-page';
	}

	return 'pp-product-page';
}

window.pp_peachpayButton = `
<div class="pp-break"></div>
<div id="pp-button-container" class="button-container pp-button-container ${(peachpay_data.test_mode && !peachpay_data.wp_admin_or_editor) ? 'hide' : ''}">
	<div id="pp-stripe-payment-request-wrapper" style="width: 220px;">
		<div id="pp-stripe-payment-request-btn" style="width: 100%; margin: 5px 0; display: none;">
	</div>
	</div>
	<button id="pp-button" class="pp-button ${peachpay_pageTypeClass()} ${peachpay_data.button_custom_classes}" type="button" style="display: block;">
		<svg id="loading-spinner" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" viewBox="0 0 128 128" xml:space="preserve" class="pp-spinner"><g><circle cx="16" cy="64" r="16" fill-opacity="1"/><circle cx="16" cy="64" r="16" fill-opacity="0.67" transform="rotate(45,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.42" transform="rotate(90,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.2" transform="rotate(135,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.12" transform="rotate(180,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.12" transform="rotate(225,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.12" transform="rotate(270,64,64)"/><circle cx="16" cy="64" r="16" fill-opacity="0.12" transform="rotate(315,64,64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="800ms" repeatCount="indefinite"></animateTransform></g></svg>
		<div id="pp-button-content">
			<span id="pp-button-text">${peachpay_data.button_text}</span>
			<svg id="button-icon-regular" class="" viewBox="0 0 0 0"/>
		</div>
	</button>
	<div id="payment-methods-container" class="cc-company-logos">
		<img class="${
	(peachpay_data.feature_support.paypal_payment_method && peachpay_data.feature_support.paypal_payment_method.enabled) ? 'cc-logo' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/paypal.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.affirm_payments.enabled) ? 'cc-logo' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/affirm.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.klarna_payments.enabled) ? 'cc-logo' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/klarna.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.afterpay_clearpay_payments.enabled) ? 'cc-logo' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/afterpay.svg"/>
<img class="${(peachpay_data.feature_support.amazonpay_payment_method.enabled) ? 'cc-logo' : 'hide'}" src="${peachpay_data.plugin_asset_url}public/img/marks/amazon-pay-card.svg"/>
		<img class="cc-logo" src="${peachpay_data.plugin_asset_url}public/img/marks/visa.svg"/>
		<img class="cc-logo" src="${peachpay_data.plugin_asset_url}public/img/marks/amex.svg"/>
		<img class="cc-logo" src="${peachpay_data.plugin_asset_url}public/img/marks/mastercard.svg"/>
	</div>
</div>
<div class="pp-break"></div>
`;

window.pp_peachpayButtonMobile = `
<div id="pp-button-container" style="background-color:#FF876C;" class="pp-mobile-product-page-button">
	<div id="pp-stripe-payment-request-wrapper" style="width: 100%; margin: 5px 0; display: none;">
	</div>
	<button id="pp-button" class="pp-button ${peachpay_pageTypeClass()}" type="button" style="display: block;">
		<object
			type="image/svg+xml"
			data="${spinnerURL()}"
			id="loading-spinner"
			class="pp-spinner"
			height="20"
			width="20">
		</object>
		<div id="pp-button-content">
			<span id="pp-button-text">${peachpay_data.button_text}</span>
			<img id="button-icon-regular" class=""/>
		</div>
	</button>
</div>
`;

window.pp_peachpayButtonMiniCart = `
<div class="pp-break"></div>
<div id="pp-button-container-mini" class="button-container pp-button-container ${(peachpay_data.test_mode && !peachpay_data.wp_admin_or_editor) ? 'hide' : ''}">
	<button id="pp-button-mini" class="pp-button ${
	peachpay_data.disable_default_font_css == '1' ? '' : 'pp-button-default-font'
} ${peachpay_pageTypeClass()} ${peachpay_data.button_custom_classes}" type="button" style="display: block;">
		<div id="pp-button-content-mini">
			<span id="pp-button-text-mini">${peachpay_data.button_text}</span>
			<svg id="button-icon-minicart" class="" viewBox="0 0 0 0"/>
		</div>
	</button>
	<div id="payment-methods-container-minicart" class="cc-company-logos">
		<img class="${
	(peachpay_data.feature_support.paypal_payment_method && peachpay_data.feature_support.paypal_payment_method.enabled) ? 'cc-logo-sidebar' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/paypal.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.affirm_payments.enabled) ? 'cc-logo-sidebar' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/affirm.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.klarna_payments.enabled) ? 'cc-logo-sidebar' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/klarna.svg"/>
		<img class="${
	(peachpay_data.feature_support.stripe_payment_method && peachpay_data.feature_support.stripe_payment_method.metadata.afterpay_clearpay_payments.enabled) ? 'cc-logo-sidebar' : 'hide'
}" src="${peachpay_data.plugin_asset_url}public/img/marks/afterpay.svg"/>
<img class="${(peachpay_data.feature_support.amazonpay_payment_method.enabled) ? 'cc-logo-sidebar' : 'hide'}" src="${peachpay_data.plugin_asset_url}public/img/marks/amazon-pay-card.svg"/>
		<img class="cc-logo-sidebar" src="${peachpay_data.plugin_asset_url}public/img/marks/visa.svg"/>
		<img class="cc-logo-sidebar" src="${peachpay_data.plugin_asset_url}public/img/marks/amex.svg"/>
		<img class="cc-logo-sidebar" src="${peachpay_data.plugin_asset_url}public/img/marks/mastercard.svg"/>
	</div>
</div>
<div class="pp-break"></div>
`;

function peachpay_checkoutFormHTMLTemplate() {
	const assetURL = peachpay_data.plugin_asset_url;
	const version = peachpay_data.version;
	return /*html*/ `
<div id="pp-modal-overlay" class="pp-overlay">
	<img src="${spinnerURL()}" id="loading-spinner-iframe" class="pp-spinner-iframe hide">
	<iframe id="peachpay-iframe" src="${assetURL}public/dist/${version}/checkout-modal/peachpay-checkout.html">
		Unable to load PeachPay Checkout
	</iframe>
</div>
<div class="peachpay-translate-helper" style="height:0;width:0;overflow:hidden;">translate me</div>
`;
}

// Watches for the WooCommerce out-of-stock behavior on products with variations and adjusts the
// style of the PeachPay checkout button accordingly.
const peachpay_stock_observer = new MutationObserver(function () {
	let needs_muted = false;

	// Checks the status of the WooCommerce cart button. If their button is disabled, PeachPay should be too.
	const checkout_button = document.getElementsByClassName('single_add_to_cart_button');
	if (checkout_button[0]) {
		const cL = checkout_button[0].classList;
		if (cL.contains('disabled')) {
			needs_muted = true;
		}
	}

	// Variable for the PeachPay button.
	const button = document.querySelector('#pp-button');
	const stripe_wrapper = document.querySelector('#pp-stripe-payment-request-wrapper');
	const stripe_button = document.querySelector('#pp-stripe-payment-request-btn');
	if (button) {
		if (needs_muted) {
			button.classList.add('pp-button-mute');
		} else {
			button.classList.remove('pp-button-mute');
		}
	}
	if (stripe_button) {
		if (needs_muted) {
			stripe_wrapper.classList.add('pp-button-mute');
			stripe_button.style.pointerEvents = 'none';
		} else {
			stripe_wrapper.classList.remove('pp-button-mute');
			stripe_button.style.pointerEvents = 'auto';
		}
	}
});

// Per site customization to make the buttons look as native as possible
document.addEventListener('DOMContentLoaded', () => peachpay_addCustomMerchantStyles());

function peachpay_addCustomMerchantStyles() {
	if (!peachpay_isElementor() && peachpay_data.button_effect === 'fade') {
		peachpay_buttonFade();
	}

	if (!peachpay_isElementor() && !peachpay_data.disable_default_font_css) {
		peachpay_defaultFontCSS();
	}

	if (document.querySelector('#payment-methods-container') && !peachpay_data.button_display_payment_method_icons) {
		document.querySelector('#payment-methods-container').classList.add('hide');
	}

	peachpay_customButtonCSS();

	if (document.querySelector('#button-icon-regular')) {
		update_buttonIcon(peachpay_data.button_icon, 'regular');
	}
}

function peachpay_buttonFade() {
	const ppButtons = document.querySelectorAll('.pp-button');
	ppButtons.forEach((ppButton) => {
		ppButton.classList.add('pp-effect-fade');
	});
}

function peachpay_customButtonCSS() {
	const $body = document.querySelector('body');
	if ($body) {
		const $style = document.createElement('style');
		$style.id = 'pp-custom-css';
		$style.appendChild(document.createTextNode(peachpay_data.button_custom_css.trim()));

		$body.insertAdjacentElement('beforeend', $style);
	}
}

function peachpay_defaultFontCSS() {
	const ppButtons = document.querySelectorAll('.pp-button');
	ppButtons.forEach((ppButton) => {
		ppButton.classList.add('pp-button-default-font');
	});
}

// deno-lint-ignore no-unused-vars
function peachpayTestMode() {
	console.log('Peachpay Version: ' + peachpay_data.version);

	if (document.querySelector('#pp-button-container')) {
		document.querySelector('#pp-button-container').classList.remove('hide');
	}

	if (document.querySelector('#pp-button-container-mini')) {
		document.querySelector('#pp-button-container-mini').classList.remove('hide');
	}

	if (document.querySelector('.checkout-container')) {
		document.querySelector('.checkout-container').classList.remove('hide');
	}
}

/**
 * Assign css selectors and different svg source to the two different PeachPay
 * button types (regular and mini-cart).
 *
 * @param {string} icon_value
 * @param {string} buttonType
 */
function update_buttonIcon(icon_value, buttonType) {
	const icons = document.querySelector('#button-icon-' + buttonType);
	if (icons) {
		if (buttonType === 'regular') {
			icons.classList.remove('skre-icon');
			icons.classList.add('pp-btn-symbol');
		} else {
			icons.classList.remove('skre-icon-mini');
			icons.classList.add('pp-btn-symbol-mini');
		}

		icons.classList.remove('hide');

		const beyourbag = location.hostname === 'www.beyourbag.it';

		switch (icon_value) {
			case 'lock':
				icons.setAttribute('viewBox', '0 0 1190.000000 1280.000000');
				icons.innerHTML = `<g ${beyourbag ? 'fill="black"' : ''} transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
				<path d="M5610 11999 c-1096 -88 -1924 -626 -2375 -1544 -80 -162 -155 -347
				-155 -380 0 -8 -4 -15 -8 -15 -4 0 -8 -8 -9 -17 -1 -19 -6 -38 -16 -63 -17
				-47 -78 -287 -91 -360 -3 -19 -8 -46 -11 -59 -2 -14 -7 -47 -10 -74 -3 -28 -8
				-53 -10 -56 -8 -13 -24 -189 -28 -313 -1 -27 -5 -48 -10 -48 -4 0 -3 -9 3 -20
				8 -14 8 -20 0 -20 -7 0 -8 -6 -1 -19 6 -10 8 -21 5 -24 -3 -3 -5 -392 -4 -865
				l1 -860 -26 -20 c-14 -11 -69 -30 -123 -43 -159 -36 -266 -74 -364 -128 -109
				-60 -149 -91 -240 -183 -206 -208 -334 -560 -353 -968 -5 -99 -4 -3022 1
				-3125 8 -175 28 -319 46 -343 7 -8 7 -12 -1 -12 -7 0 -9 -5 -4 -13 4 -6 8 -16
				9 -22 1 -5 11 -34 23 -62 11 -29 17 -53 13 -53 -4 0 -2 -4 3 -8 10 -7 37 -61
				37 -72 0 -3 6 -12 14 -21 8 -9 12 -18 9 -21 -3 -3 6 -17 20 -32 13 -14 25 -29
				25 -31 0 -14 84 -117 122 -150 24 -21 34 -32 23 -24 -18 13 -19 13 -6 -3 7
				-10 17 -18 22 -18 5 0 17 -8 27 -17 39 -37 67 -57 121 -86 175 -94 267 -121
				521 -153 111 -13 461 -15 3121 -14 3106 0 3123 0 3314 39 221 45 397 134 531
				270 161 162 238 342 269 626 12 107 15 407 15 1696 0 862 -2 1573 -4 1580 -3
				8 -7 63 -10 122 -4 60 -8 112 -10 116 -3 4 -7 27 -10 51 -17 143 -76 342 -137
				463 -30 57 -107 176 -138 211 -62 69 -159 160 -174 164 -13 3 -37 30 -38 44 0
				7 -4 4 -8 -7 -8 -19 -8 -19 -15 3 -5 14 -13 21 -21 18 -8 -3 -19 2 -25 10 -7
				8 -19 14 -26 14 -8 0 -14 5 -14 10 0 6 -7 10 -15 10 -8 0 -15 5 -15 10 0 6 -9
				10 -20 10 -11 0 -20 5 -20 11 0 5 -4 7 -10 4 -5 -3 -10 -1 -10 5 0 6 -4 8 -10
				5 -5 -3 -10 -2 -10 4 0 5 -8 8 -17 6 -10 -1 -30 4 -45 11 -15 8 -31 13 -35 13
				-4 -1 -16 1 -25 4 -46 18 -54 20 -69 23 -9 2 -27 8 -40 13 -13 5 -27 8 -30 7
				-4 0 -17 8 -30 19 -14 13 -20 14 -15 5 4 -8 -4 -2 -18 13 l-26 28 0 847 c-1
				466 -3 883 -5 927 -7 117 -14 206 -19 240 -3 24 -26 169 -40 255 -21 125 -30
				170 -36 170 -4 0 -6 10 -5 23 1 12 -1 27 -5 32 -5 6 -11 24 -13 40 -9 46 -14
				68 -25 96 -6 15 -8 29 -6 32 3 3 -2 22 -10 42 -9 21 -16 47 -16 59 0 16 -2 18
				-9 7 -7 -10 -11 -1 -16 32 -4 26 -12 47 -17 47 -6 0 -8 9 -5 20 3 11 1 20 -4
				20 -5 0 -9 7 -9 15 0 8 -4 15 -10 15 -5 0 -6 7 -3 17 5 11 3 14 -6 8 -10 -6
				-11 -2 -6 15 5 17 4 21 -5 15 -8 -5 -11 -4 -6 3 7 11 -28 93 -96 227 -22 44
				-55 107 -71 140 -17 33 -34 62 -38 65 -3 3 -16 25 -29 49 -12 24 -26 49 -31
				55 -30 36 -84 113 -105 149 -13 23 -24 38 -24 34 0 -4 -6 -2 -14 5 -8 7 -12
				16 -9 20 2 4 -7 19 -21 33 -15 14 -26 31 -26 37 0 6 -3 8 -7 5 -3 -4 -13 2
				-20 13 -8 11 -19 18 -24 15 -5 -4 -9 2 -9 12 0 11 -20 39 -45 63 -24 24 -42
				47 -39 52 3 4 -4 8 -15 8 -11 0 -22 9 -26 20 -3 11 -13 20 -21 20 -8 0 -14 7
				-14 15 0 8 -7 15 -16 15 -8 0 -12 5 -9 10 3 6 -1 10 -9 10 -9 0 -16 5 -16 11
				0 5 -3 8 -7 6 -5 -3 -14 1 -21 9 -7 8 -9 14 -5 14 4 1 -4 8 -19 16 -16 8 -28
				19 -28 24 0 6 -7 10 -15 10 -8 0 -15 5 -15 10 0 6 -5 10 -10 10 -6 0 -21 11
				-34 25 -13 14 -26 25 -30 25 -7 0 -67 41 -76 51 -3 3 -19 13 -37 22 -17 9 -37
				22 -45 29 -18 17 -59 42 -143 85 -38 19 -73 40 -76 45 -3 5 -9 9 -12 9 -4 0
				-26 8 -49 18 -374 158 -665 229 -1072 261 -150 12 -504 11 -656 -1z m475
				-1214 c103 -10 140 -15 240 -31 90 -15 283 -67 314 -85 17 -9 74 -31 79 -30
				10 4 273 -148 292 -170 3 -3 23 -18 44 -35 22 -16 49 -38 60 -49 12 -11 35
				-31 51 -43 17 -13 23 -21 15 -17 -8 4 -1 -6 16 -22 27 -24 98 -107 157 -184
				10 -13 27 -40 38 -59 11 -19 28 -48 39 -65 19 -30 73 -126 75 -135 1 -3 10
				-23 20 -45 10 -22 18 -43 17 -47 -1 -5 2 -8 6 -8 5 0 9 -6 10 -12 2 -29 29
				-88 37 -81 4 5 5 3 1 -4 -4 -7 7 -50 23 -97 16 -46 27 -87 24 -90 -3 -3 0 -12
				7 -21 7 -9 10 -18 7 -22 -4 -3 -2 -12 4 -20 9 -10 8 -13 -2 -13 -9 -1 -8 -5 5
				-15 11 -8 15 -15 8 -15 -8 0 -9 -7 -1 -27 6 -16 12 -37 14 -48 8 -49 27 -203
				29 -230 0 -16 5 -33 11 -37 7 -5 6 -8 0 -8 -6 0 -11 -9 -11 -20 0 -11 4 -20 9
				-20 5 0 4 -6 -2 -14 -9 -11 -9 -15 1 -20 10 -5 10 -7 1 -12 -19 -8 -16 -24 5
				-24 10 0 13 -3 6 -8 -16 -10 -18 -222 -3 -222 8 0 9 -4 0 -13 -8 -10 -12 -215
				-13 -707 l-3 -694 -34 -20 c-34 -20 -56 -20 -1717 -24 -1216 -3 -1683 -1
				-1688 7 -4 6 -22 11 -40 11 -69 0 -65 -59 -66 905 -1 479 -1 872 0 875 1 3 3
				32 5 65 4 65 10 117 26 210 6 33 12 71 13 85 2 14 6 32 10 41 4 9 8 27 10 41
				1 13 5 28 8 33 3 6 9 28 13 50 8 42 47 159 71 212 8 17 14 34 14 39 0 33 188
				356 247 424 36 42 197 200 239 235 110 93 398 240 507 259 7 1 28 7 47 14 58
				19 273 52 382 58 57 4 104 7 105 8 4 3 156 -3 218 -9z"/>
				</g>`;
				break;
			case 'baseball':
				icons.setAttribute('viewBox', '0 0 496 512');
				icons.innerHTML =
					`<path d="M368.5 363.9l28.8-13.9c11.1 22.9 26 43.2 44.1 60.9 34-42.5 54.5-96.3 54.5-154.9 0-58.5-20.4-112.2-54.2-154.6-17.8 17.3-32.6 37.1-43.6 59.5l-28.7-14.1c12.8-26 30-49 50.8-69C375.6 34.7 315 8 248 8 181.1 8 120.5 34.6 75.9 77.7c20.7 19.9 37.9 42.9 50.7 68.8l-28.7 14.1c-11-22.3-25.7-42.1-43.5-59.4C20.4 143.7 0 197.4 0 256c0 58.6 20.4 112.3 54.4 154.7 18.2-17.7 33.2-38 44.3-61l28.8 13.9c-12.9 26.7-30.3 50.3-51.5 70.7 44.5 43.1 105.1 69.7 172 69.7 66.8 0 127.3-26.5 171.9-69.5-21.1-20.4-38.5-43.9-51.4-70.6zm-228.3-32l-30.5-9.8c14.9-46.4 12.7-93.8-.6-134l30.4-10c15 45.6 18 99.9.7 153.8zm216.3-153.4l30.4 10c-13.2 40.1-15.5 87.5-.6 134l-30.5 9.8c-17.3-54-14.3-108.3.7-153.8z"></path>`;
				break;
			case 'arrow':
				icons.setAttribute('viewBox', '0 0 512 512');
				icons.innerHTML =
					`<path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>`;
				break;
			case 'mountain':
				if (buttonType === 'regular') {
					icons.classList.remove('pp-btn-symbol');
					icons.classList.add('skre-icon');
				} else {
					icons.classList.remove('pp-btn-symbol-mini');
					icons.classList.add('skre-icon-mini');
				}

				icons.setAttribute('viewBox', '0 0 24 24');
				icons.innerHTML =
					`<path d="M12 3.19995C11.52 3.19995 11.36 3.51995 11.04 3.83995L1.76001 19.04C1.60001 19.2 1.60001 19.52 1.60001 19.68C1.60001 20.48 2.24001 20.8 2.72001 20.8H21.28C21.92 20.8 22.4 20.48 22.4 19.68C22.4 19.36 22.4 19.36 22.24 19.04L13.12 3.83995C12.8 3.51995 12.48 3.19995 12 3.19995ZM12 5.59995L17.28 14.4H16L13.6 12L12 14.4L10.4 12L8.00001 14.4H6.56001L12 5.59995Z" />`;
				break;
			case 'bag':
				icons.setAttribute('viewBox', '0 0 512 512');
				icons.innerHTML =
					`<path d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path>`;
				break;
			case 'shopping_cart':
				icons.setAttribute('viewBox', '0 0 576 512');
				icons.innerHTML =
					`<path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>`;
				break;
			default:
				icons.setAttribute('viewBox', '0 0 0 0');
				icons.classList.add('hide');
		}
	}
}

ppOnWindowDataFetch('pp-get-modal-currency-data', async (data) => {
	const response = await fetch(`${peachpay_data.wp_home_url}/?wc-ajax=pp-get-modal-currency-data`, {
		method: 'GET',
		headers: {
			'credentials': 'same-origin',
			'currency-country': data['country'],
		},
	});

	if (!response.ok) {
		const error = new Error(`Unable to retrieve country currency on ${peachpay_data.wp_home_url}`);
		captureSentryException(error);
		throw error;
	}

	const result = await response.json();
	if (result.success && result.data) {
		return result.data;
	}

	return undefined;
});

ppOnWindowDataFetch('pp-set-wc-billing-country', async (data) => {
	const formData = new FormData();
	formData.append('country', data.country);

	const response = await fetch(`${peachpay_data.wp_home_url}/?wc-ajax=pp-set-wc-billing-country`, {
		method: 'POST',
		headers: {
			'credentials': 'same-origin',
		},
		body: formData,
	});

	if (!response.ok) {
		const error = new Error(`Unable to post new WC customer country on ${peachpay_data.wp_home_url}`);
		captureSentryException(error);
		throw error;
	}
	const result = response.json();

	return result.success;
});

function peachpayUpdateCurrencyCookie(newCurrency) {
	document.cookie = `pp_active_currency=${newCurrency};path=/`;
}

async function peachpayCartUpdate(formData) {
	const response = await fetch(`${peachpay_data.wp_home_url}/?wc-ajax=pp-cart`, {
		method: 'POST',
		headers: {
			'credentials': 'same-origin',
		},
		body: formData,
	});

	if (!response.ok) {
		const error = new Error(`Cart calculation failed on ${peachpay_data.wp_home_url}`);
		captureSentryException(error);
		throw error;
	}

	const cartCalculationResponse = await response.json();
	if (cartCalculationResponse.success && cartCalculationResponse.data) {
		peachpay_data.cart = cartCalculationResponse.data.cart_calculation_record[0].cart;
	}
	return cartCalculationResponse;
}
