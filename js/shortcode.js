document.addEventListener('DOMContentLoaded', pp_placeShortcode);

function pp_placeShortcode() {
	if (!window.peachpayShortcodeData || !window.peachpayShortcodeData.cart) {
		return;
	}

	document.querySelector('body').insertAdjacentHTML('beforeend', pp_checkoutForm);
	init({width: peachpay_data.button_width_product_page});

	if (peachpayShortcodeData.cart.length > 0) {
		peachpay_data.cart = peachpayShortcodeData.cart;
		peachpay_data.is_shortcode = true;
	}
}
