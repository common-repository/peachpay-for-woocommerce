document.addEventListener('DOMContentLoaded', pp_placeButtonCheckoutPage);

function bugFixForNorthCostKeyless() {
	if (location.hostname === 'northcoastkeyless.com' && !document.querySelector('.warranty_info')) {
		// This store added code that moves the PeachPay button, but if the
		// element they are trying to move it next to doesn't exist, such as
		// on the cart and checkout pages, then the end result is that
		// PeachPay disappears.
		return '<p class="warranty_info"></p>';
	}

	return '';
}

function pp_placeButtonCheckoutPage() {
	if (!peachpay_data.is_checkout_page) {
		return;
	}

	const buttonContainer = `
		<div class="checkout-container ${(peachpay_data.test_mode && !peachpay_data.wp_admin_or_editor) ? 'hide' : ''}">
			<h2 class="checkout-header">${window.pp_i18n['Check out with PeachPay'][getLanguage()]}</h2>
			${bugFixForNorthCostKeyless()}
			${pp_peachpayButton}
			<p class="peachpay-description">
				${window.pp_i18n['The next time you come back, you’ll have one-click checkout and won’t have to waste time filling out the fields below.'][getLanguage()]}
			</p>
		</div>
	`;

	const $checkoutForm = document.querySelector('form.checkout');
	if (!$checkoutForm) {
		// The receipt page is also considered the checkout page, but we cannot
		// add the button there.
		return;
	}

	$checkoutForm.insertAdjacentHTML('beforebegin', buttonContainer);

	// We must do this because we changed the <img> tags to <object> tags to
	// fix a Safari issue where it would not load animated SVGs. If we have
	// the hide class on the element right away, the SVG is not loaded, so the
	// first time you click the button it's not there. Only after it is visible
	// does it load, so we allow it to be visible for a split second before
	// hiding it here.
	hideLoadingSpinner();

	// Add the checkout window iframe to the page
	document.querySelector('body').insertAdjacentHTML('beforeend', pp_checkoutForm);

	const full = peachpay_data.button_position_checkout_page === 'full';
	const width = full ? '100%' : ((peachpay_data.button_width_checkout_page || '320') + 'px');

	init({
		width,
		position: peachpay_data.button_position_checkout_page,
		borderRadius: peachpay_data.button_border_radius,
	});
}
