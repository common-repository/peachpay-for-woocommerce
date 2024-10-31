<?php
/**
 * PeachPay Admin settings primary navigation HTML view.
 *
 * @var array $bread_crumbs The array of breadcrumbs passed to the breadcrumb view.
 *
 * @package PeachPay
 */

defined( 'PEACHPAY_ABSPATH' ) || exit;

require_once PEACHPAY_ABSPATH . 'core/admin/views/utilities.php';

?>
<div id="peachpay-nav" class="col">
	<div class='peachpay-header'>
		<div class="peachpay-heading">
			<div class="left">
				<div class="hamburger-menu icon"></div>
				<a class="peachpay-logo" href="<?php Peachpay_Admin::admin_settings_url(); ?>"></a>
			</div>
			<div class="right" style="<?php echo esc_attr( ! PeachPay::has_premium() ? '' : 'margin-right: -6px;' ); ?>">
				<?php peachpay_generate_top_nav_link( null, 'https://peachpay.notion.site/8526d0ee6f984b679afd4e9a60fd25d7?v=712cb377635f47dd8c8a920a089ab7b4', 'docs-icon', 'Docs' ); ?>
				<?php peachpay_generate_top_nav_link( null, 'https://twitter.com/peachpayhq/', 'twitter-icon', 'Twitter' ); ?>
			</div>
		</div>
		<?php require PeachPay::get_plugin_path() . '/core/admin/views/html-bread-crumbs.php'; ?>
	</div>
</div>
<?php
