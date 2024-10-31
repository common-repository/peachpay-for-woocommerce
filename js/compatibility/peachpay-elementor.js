class PeachPayHandlerClass extends elementorModules.frontend.handlers.Base {
	getDefaultSettings() {
		const button = document.querySelector('#pp-data');
		const button_text = button.dataset.text;
		const button_color = button.dataset.color;
		peachpay_data.button_text = button_text;
		peachpay_data.button_color = button_color;
	}
}

jQuery(window).on('elementor/frontend/init', () => {
	const addHandler = $element => {
		elementorFrontend.elementsHandler.addHandler(PeachPayHandlerClass, {
			$element,
		});
	};

	elementorFrontend.hooks.addAction('frontend/element_ready/peachpay.default', addHandler);
});

document.addEventListener('DOMContentLoaded', () => {
	if (peachpay_isElementor()) {
		document.querySelector('body').insertAdjacentHTML('beforeend', pp_checkoutForm);
		init({width: '350'});
	}
});
