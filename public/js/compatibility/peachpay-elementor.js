class PeachPayHandlerClass extends elementorModules.frontend.handlers.Base {
	getDefaultSettings() {
		const buttonText = document.querySelector('#pp-button-text');
		window.peachpay_data.button_text = buttonText.innerText;
		window.peachpay_data.button_color = window.getComputedStyle(buttonText).color;
	}
}

jQuery(window).on('elementor/frontend/init', () => {
	const addHandler = ($element) => {
		elementorFrontend.elementsHandler.addHandler(PeachPayHandlerClass, {
			$element,
		});
	};

	elementorFrontend.hooks.addAction('frontend/element_ready/peachpay.default', addHandler);
});

document.addEventListener('DOMContentLoaded', () => {
	if (peachpay_isElementor()) {
		const button = document.querySelector('#pp-button-shortcode') || document.querySelector('#pp-button');
		const shortcodeProductId = button?.dataset?.specificProductId;
		const shortcodeProductQuantity = button?.dataset?.specificProductQuantity;
		window.peachpay_data.is_elementor_product_page = button?.dataset?.isElementorProductPage === 'yes';

		if (shortcodeProductId) {
			peachpay_initButton({
				width: '350',
				isShortcode: true,
				isElementor: true,
				shortcodeInfo: {
					productId: shortcodeProductId,
					quantity: shortcodeProductQuantity,
				},
			});
		} else {
			peachpay_initButton({ width: '350', isElementor: true });
		}
	}
});
