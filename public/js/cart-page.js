// deno-lint-ignore-file camelcase
/**
 * Entry point for cart-page.js
 */
document.addEventListener('DOMContentLoaded', () => {
	if (!peachpay_data.is_cart_page) {
		return;
	}

	peachpay_maybeRenderButtonCartPage();

	// Instead of trying to find out when the button might specifically be removed we can just
	// listen for any changes to the entire body and check if our button is still present after.
	// This should take care of any scenario that the button is removed from the page.
	const observer = new MutationObserver(peachpay_maybeRenderButtonCartPage);
	let $container = document.querySelector('.cart-collaterals');

	// Essential Addons for Elementor 'Woo Cart' element compatilibity
	const $eaelContainer = $container?.closest('.eael-woo-cart-wrapper');
	if ($eaelContainer) {
		$container = $eaelContainer;
	}

	if ($container) {
		observer.observe($container, {
			attributes: false,
			childList: true,
			subtree: true,
		});
	}
});

// Renders the peachpay button in the cart page
function peachpay_renderButtonCartPage() {
	peachpay_insertButtonCartPage();
	peachpay_addCustomMerchantStyles();

	if (document.querySelector('#button-icon-regular')) {
		update_buttonIcon(peachpay_data.button_icon, 'regular');
	}
}

function peachpay_maybeRenderButtonCartPage() {
	const $button = document.querySelector('#pp-button-container');
	if (!$button) {
		// Remove any existing .pp-break elements so we do not clutter up the DOM if any are present
		Array.from(document.querySelectorAll('.wc-proceed-to-checkout .pp-break')).forEach(($el) => $el.remove());

		peachpay_renderButtonCartPage();
	}
}

function peachpay_insertButtonCartPage() {
	const selector = peachpay_data.custom_button_placement.cart_page;
	const $wcButtonContainer = selector ? document.querySelector(selector) : document.querySelector('.wc-proceed-to-checkout');

	if ($wcButtonContainer) {
		peachpay_insertButtonAt($wcButtonContainer, 'beforeend');
		return;
	}

	const $wpBlocksButton = document.querySelector('.wc-block-cart__payment-options');
	if ($wpBlocksButton) {
		peachpay_insertButtonAt($wpBlocksButton, 'afterbegin');
	}
}

function peachpay_insertButtonAt($element, location) {
	if (!peachpay_data.is_cart_page || peachpay_data.cart_page_hide) {
		return;
	}
	const full = peachpay_data.button_alignment_cart_page === 'full' || !peachpay_data.button_alignment_cart_page;
	const width = full ? '100%' : ((peachpay_data.button_width_cart_page || '220') + 'px');

	$element.insertAdjacentHTML(location, pp_peachpayButton);

	// We must do this because we changed the <img> tags to <object> tags to
	// fix a Safari issue where it would not load animated SVGs. If we have
	// the hide class on the element right away, the SVG is not loaded, so the
	// first time you click the button it's not there. Only after it is visible
	// does it load, so we allow it to be visible for a split second before
	// hiding it here.
	peachpay_hideLoadingSpinner();

	peachpay_initButton({
		width,
		alignment: peachpay_data.button_alignment_cart_page,
		borderRadius: peachpay_data.button_border_radius,
	});

	// Easy way for stripe payment button to be reinserted when removed
	document.dispatchEvent(new Event('pp-insert-button'));
}
