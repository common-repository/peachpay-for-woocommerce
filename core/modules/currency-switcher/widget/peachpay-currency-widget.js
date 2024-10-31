
const peachpayCurrencySwitcherWidget = document.querySelector('#pp-currency-widget');

if(peachpayCurrencySwitcherWidget) {
    peachpayCurrencySwitcherWidget.addEventListener('change', (event) => {
        peachpayUpdateCurrencyCookie(event.target.value);
        window.location.reload();
    });
}

self.addEventListener('DOMContentLoaded', peachpaySetCurrencyAlertButtonColor);

function peachpaySetCurrencyAlertButtonColor() {
	const $alert = document.querySelector('.pp-currency-set-notice');
	if ($alert) {
		$alert.classList.remove('hide');
		$alert.style.setProperty('--pp-button-background-color', peachpay_data.button_color || '#21105d');
		$alert.style.setProperty('--pp-button-text-color', peachpay_data.button_text_color || '#ffffff');
		$alert.style.animation = 'peachpay-fade 7s';
		if (peachpay_isMobile()) {
			$alert.style.setProperty('bottom', '10%');
		}
		setTimeout(() => {
			$alert.remove();
		}, 7000);
	}
}
