/**
 * Email Tracker endpoint for PeachPay.
 */

ppOnWindowDataFetch('pp-update-email', async (data) => {
	return await peachpayUpdateEmail(data);
});

async function peachpayUpdateEmail(data) {
	const formData = new FormData();

	formData.append('email', data.email);

	const response = await fetch(`${peachpay_data.wp_home_url}/?wc-ajax=pp-update-email`, {
		method: 'POST',
		body: formData,
	});

	const message = await response.ok;

	return message;
}
