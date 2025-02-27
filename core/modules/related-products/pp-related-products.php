<?php
/**
 * PeachPay Related Product Settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require plugin_dir_path( __FILE__ ) . 'includes/class-peachpay-related-products.php';

/**
 * Begins execution of the plugin.
 */
function run_pp_related_products() {
	$plugin = new Peachpay_Related_Products();
	$plugin->run();
}

/**
 * Generates the related products field settings
 */
function peachpay_related_products() {
	add_settings_section(
		'peachpay_related_products',
		'',
		'peachpay_feedback_cb',
		'peachpay'
	);

	add_settings_field(
		'peachpay_upsell_cross_sell_field',
		__( 'Cross-sell/upsell', 'peachpay-for-woocommerce' ),
		'peachpay_upsell_and_cross_sell_section',
		'peachpay',
		'peachpay_related_products',
		array( 'class' => 'pp-header' )
	);

	add_settings_field(
		'peachpay_related_products_field',
		__( 'Related products', 'peachpay-for-woocommerce' ),
		'peachpay_related_products_section',
		'peachpay',
		'peachpay_related_products',
		array( 'class' => 'pp-header' )
	);
}

/**
 * Callback for selecting the number of related products to be displayed
 */
function peachpay_display_nproducts_cb() {
	?>
	<input
		id="peachpay_display_nproducts"
		name="peachpay_related_products_options[peachpay_related_nproducts]"
		type="number"
		style="width: 5rem"
		placeholder="ie 99"
		value="<?php echo esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' ) ); ?>"
	>
	<?php
}

/**
 * Callback for selecting the type of related products to be displayed
 */
function peachpay_product_relation_cb() {
	?>
	<?php
	$basedonarray = array(
		'product_cat' => __( 'Product Category', 'peachpay-for-woocommerce' ),
		'product_tag' => __( 'Product TAG', 'peachpay-for-woocommerce' ),
		'attribute'   => __( 'Product Attributes', 'peachpay-for-woocommerce' ),
	);
	?>
	<select name="peachpay_related_products_options[peachpay_product_relation]">
		<?php
		if ( esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_product_relation' ) ) !== '' ) {
			?>
			<option value="<?php echo esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_product_relation' ) ); ?>" selected="selected" >
				<?php
				foreach ( $basedonarray as $basedon_value => $basedon_label ) {
					if ( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_product_relation' ) === $basedon_value ) {
						echo esc_html( $basedon_label );
					}
				}
				?>
			</option>
			<?php
		}
		?>
		<?php
		foreach ( $basedonarray as $basedon_value => $basedon_label ) {
			?>
			<option value="<?php echo esc_html( $basedon_value ); ?>">
				<?php
				echo esc_html( $basedon_label );
				?>
			</option>
			<?php
		}
		?>
	</select>
	<?php
}

/**
 * Callback for Taxonomy ids to be excluded
 */
function peachpay_exclude_id_cb() {
	?>
	<input
	type="text"
	name="peachpay_related_products_options[peachpay_exclude_id]"
	value="<?php echo esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_exclude_id' ) ); ?>"
	placeholder="ie 12,45,32 "/>
	<?php
}

/**
 * Displays the related product section into product page
 *
 * @param string $atts Attributes.
 */
function peachpayrpdisplay( $atts ) {
	if ( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' ) === 0 ) {
		return false;
	}
	// needs improvement.
	// will be removed later as it is used only to make easier the transition from 1.x to 2.x.
	$basedonf = esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_product_relation' ) );
	if ( 'category' === $basedonf ) {
		$basedonf = 'product_cat';
	}
	if ( 'tag' === $basedonf ) {
		$basedonf = 'product_tag';
	}
	if ( 'attribute' === $basedonf ) {
		peachpayrprr_wc_taxonomy( $atts );
	} else {
		peachpayrprr_wp_taxonomy( $basedonf, $atts );
	}
}

/**
 * Display related products with relation of either category or tag
 *
 * @param string $basedonf Category or Tag relation.
 * @param string $atts Attributes.
 */
function peachpayrprr_wp_taxonomy( $basedonf, $atts ) {
	global $post;
	$started = '';
	$sc      = '';
	$terms   = get_the_terms( $post->ID, $basedonf );
	if ( ! empty( $atts['id'] ) ) {
		$sc    = 'woo-related-shortcode';
		$terms = get_the_terms( $atts['id'], $basedonf );
	} else {
		$sc = '';
	}
	if ( ! empty( $atts['title'] ) ) {
		$no_title = $atts['title'] . '-title';
	} else {
		$no_title = ''; }
	if ( empty( $terms ) ) {
		return false;
	}

	$product_based_id = array();
	foreach ( $terms as $term ) {
		$product_based_id[] = $term->term_id;
	}
	// exlude ids.
	$exclude          = explode( ',', peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_exclude_id' ) );
	$product_based_id = array_diff( $product_based_id, $exclude );

	?>
	<div class="woo-related-products-container <?php echo esc_attr( $sc ); ?>">
	<?php
	$h2title = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_title' );
	?>
	<h2 class="woorelated-title <?php echo esc_attr( $no_title ); ?>">
									<?php
									if ( strlen( $h2title ) === 0 ) {
										esc_html_e( 'Related Products', 'woo-related-products' );
									} else {
										echo esc_html( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_title' ) );
									}
									?>
	</h2>
	<?php
	$products_number = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' );
	if ( ! empty( $atts['number'] ) ) {
		$products_number = $atts['number'];
	}
	if ( '' !== $sc ) {
		woocommerce_product_loop_start();
		$started = 'yes';
	}
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_slider' ) && 'yes' !== $started ) {
		woocommerce_product_loop_start();
		$sc      = '';
		$started = 'yes';
	}
	if ( ! empty( $atts['id'] ) && 'yes' !== $started ) {
		woocommerce_product_loop_start();
		$sc = '';
	}
	if ( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_slider' ) && 'woo-related-shortcode' !== $sc ) {
		// needs improvement asap
		// $products_number = -1;.
		?>
		<ul id="woorelatedproducts" class="products owl-carousel owl-theme <?php echo esc_attr( $sc ); ?>">
		<?php
	}
	remove_all_filters( 'posts_orderby' );
	$args = array(
		'post_type'      => 'product',
		'post__not_in'   => array( $post->ID ),
		//phpcs:ignore
		'tax_query'      => array(
			array(
				'taxonomy' => $basedonf,
				'field'    => 'id',
				'terms'    => $product_based_id,
			),
		),
		'posts_per_page' => $products_number,
		'orderby'        => 'rand',
		//phpcs:ignore
		'meta_query'     => array(
			array(
				'key'   => '_stock_status',
				'value' => 'instock',
			),
		),
	);
	$loop = new WP_Query( $args );
	while ( $loop->have_posts() ) :
		$loop->the_post();
		if ( function_exists( 'wc_get_template_part' ) ) {
			wc_get_template_part( 'content', 'product' );
		} else {
			woocommerce_get_template_part( 'content', 'product' );
		}
	endwhile;
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_slider' ) ) {
		woocommerce_product_loop_end();
	} else {
		echo '</ul>';
		echo '<div class="customNavigation">
		<a class="wprr btn prev">Previous</a> - <a class="wprr btn next">Next</a>
	</div>';
	}
	echo '</div>';
	//phpcs:ignore
	wp_reset_query();
}

/**
 * Display related product with relation set to attribute
 */
function peachpayrprr_wc_taxonomy() {
	?>
	<div>
	<?php
	$h2title = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_title' );
	?>
	<h2>
		<?php
		if ( strlen( $h2title ) === 0 ) {
			esc_attr_e( 'Related Products', 'woo-related-products' );
		} else {
			echo esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_title' ) );
		}
		?>
	</h2>
	<?php
	$products_number = get_option( 'peachpay_related_nproducts' );
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_slider' ) ) {
		woocommerce_product_loop_start();
	} else {

		// needs improvement asap.

		$products_number = - 1;
		echo "<ul id='woorelatedproducts' class='products owl-carousel owl-theme'>";
	}

	remove_all_filters( 'posts_orderby' );
	global $product,$post;
	$term_ids  = array();
	$term_idsa = array();
	$attr      = array();
	$getatt    = $product->get_attributes( $product->get_id() );
	if ( empty( $getatt ) ) {
		return false;
	}
	foreach ( $getatt as $attribute ) {
		$attr[] = $attribute['name'];
	}
	foreach ( $attr as $att ) {
		$current_term = get_the_terms( $product->get_id(), $att );
		if ( $current_term && ! is_wp_error( $current_term ) ) {
			$term_ids = array();
			foreach ( $current_term as $termid ) {
				$term_ids[] = $termid->term_id;
			}
		}

		$term_idsa[] = $term_ids;
	}
	$term_idsa       = call_user_func_array( 'array_merge', $term_idsa );
	$products_number = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' );
	$args            = array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'post__not_in'   => array( $product->get_id() ),
		'posts_per_page' => -1,
		//phpcs:ignore
		'tax_query'      => array( peachpayrprrdtaxo( $attr, $term_idsa ) ),
		'posts_per_page' => $products_number,
		'orderby'        => 'rand',
		//phpcs:ignore
		'meta_query'     => array(
			array(
				'key'   => '_stock_status',
				'value' => 'instock',
			),
		),
	);

	$loop = new WP_Query( $args );
	while ( $loop->have_posts() ) :
		$loop->the_post();
		if ( function_exists( 'wc_get_template_part' ) ) {
			wc_get_template_part( 'content', 'product' );
		} else {
			woocommerce_get_template_part( 'content', 'product' );
		}
	endwhile;
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_slider' ) ) {
		woocommerce_product_loop_end();
	} else {
		echo '</ul>';
		echo '<div class="customNavigation">
		<a class="wprr btn prev">Previous</a> - <a class="wprr btn next">Next</a>
		</div>';
	}

	echo '</div>';
	//phpcs:ignore
	wp_reset_query();
}

/**
 * Dynamic taxonomy Query build
 *
 * @param object $attr Attributes.
 * @param string $term_idsa Terms.
 */
function peachpayrprrdtaxo( $attr, $term_idsa ) {
	$tax_query = array( 'relation' => 'OR' );
	foreach ( $attr as $attrk ) {
		$tax_query[] = array(
			'taxonomy'         => $attrk,
			'field'            => 'id',
			'terms'            => $term_idsa,
			'include_children' => false,
		);

	}
	return $tax_query;
}

/**
 * Shortcode output
 *
 * @param string $atts Attributes.
 */
function peachpayrprr_shortcode_display( $atts ) {
	remove_action( 'woocommerce_after_single_product', 'peachpayrpdisplay' );
	ob_start();
	peachpayrpdisplay( $atts );
	$output = ob_get_contents();
	ob_end_clean();
	return $output;
}

add_filter( 'peachpay_register_feature', 'peachpay_related_products_feature_flag', 10, 1 );
add_filter( 'peachpay_dynamic_feature_metadata', 'peachpay_update_related_product_data', 10, 2 );

/**
 * Returns up-to-date data of related products.
 *
 * @param array  $feature_metadata Peachpay feature metadata.
 * @param string $cart_key The given cart key.
 */
function peachpay_update_related_product_data( $feature_metadata, $cart_key ) {
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_products_checkout_window_enable' ) || '0' !== $cart_key ) {
		return $feature_metadata;
	}

	$related_products_id = peachpay_get_settings_option( 'peachpay_related_products_options', 'pp_related_products_id' );
	$related_products    = array();
	foreach ( $related_products_id as $product_id ) {
		$related_product = wc_get_product( $product_id );
		$item            = array(
			'id'        => $related_product->get_id(),
			'name'      => $related_product->get_name(),
			'price'     => $related_product->get_price_html(),
			'variable'  => $related_product->is_type( 'variable' ),
			'bundle'    => $related_product->is_type( 'bundle' ),
			'img_src'   => is_array( peachpay_product_image( $related_product ) ) ? peachpay_product_image( $related_product )[0] : wc_placeholder_img_src(),
			'has_stock' => $related_product->get_stock_status() === 'instock',
			'permalink' => get_permalink( $product_id ),
			'sale'      => $related_product->is_on_sale(),
		);
		array_push( $related_products, $item );
	}

	$feature_metadata['related_products'] = array( 'related_products' => $related_products );
	return $feature_metadata;
}

/**
 * Function to add a filter to send available related products to checkout modal.
 *
 * @param array $data Peachpay data array.
 */
function peachpay_related_products_feature_flag( $data ) {
	$data['related_products']['enabled'] = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_products_checkout_window_enable' ) ? true : false;
	$data['related_products']['version'] = 1;

	$metadata = array(
		'related_products'       => peachpay_related_products_in_checkout_window(),
		'related_products_title' => peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_title' ),
	);

	$data['related_products']['metadata'] = $metadata;

	return $data;
}

/**
 * Sends related product data to the checkout window to be rendered.
 */
function peachpay_related_products_in_checkout_window() {
	if ( ! peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_products_checkout_window_enable' ) || ! is_product() ) {
		return false;
	}

	global $post;
	$products_number = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' );
	$exclude         = explode( ',', peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_exclude_id' ) );
	$basedonf        = esc_attr( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_product_relation' ) );
	if ( 'category' === $basedonf ) {
		$basedonf = 'product_cat';
	} elseif ( 'tag' === $basedonf ) {
		$basedonf = 'product_tag';
	}

	$args = array();
	if ( 'product_cat' === $basedonf || 'product_tag' === $basedonf ) {
		$product_based_id = array();
		$terms            = get_the_terms( $post->ID, $basedonf );
		foreach ( $terms as $term ) {
			$product_based_id[] = $term->term_id;
		}
		$product_based_id = array_diff( $product_based_id, $exclude );

		$args = get_posts(
			array(
				'post_type'      => 'product',
				'post__not_in'   => array( $post->ID ),
				'fields'         => 'ids',
			//phpcs:ignore
			'tax_query'      => array(
				array(
					'taxonomy' => $basedonf,
					'field'    => 'id',
					'terms'    => $product_based_id,
				),
			),
				'posts_per_page' => $products_number,
				'orderby'        => 'rand',
			//phpcs:ignore
			'meta_query'     => array(
				array(
					'key'   => '_stock_status',
					'value' => 'instock',
				),
			),
			)
		);
	} elseif ( 'attribute' === $basedonf ) {
		$term_ids  = array();
		$term_idsa = array();
		$attr      = array();
		$product   = wc_get_product( $post->ID );
		$getatt    = $product->get_attributes( $product->get_id() );
		if ( empty( $getatt ) ) {
			return false;
		}
		foreach ( $getatt as $attribute ) {
			$attr[] = $attribute['name'];
		}
		foreach ( $attr as $att ) {
			$current_term = get_the_terms( $product->get_id(), $att );
			if ( $current_term && ! is_wp_error( $current_term ) ) {
				$term_ids = array();
				foreach ( $current_term as $termid ) {
					$term_ids[] = $termid->term_id;
				}
			}

			$term_idsa[] = $term_ids;
		}
		$term_idsa       = call_user_func_array( 'array_merge', $term_idsa );
		$products_number = peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_nproducts' );
		$args            = get_posts(
			array(
				'post_type'      => 'product',
				'post_status'    => 'publish',
				'post__not_in'   => array( $post->ID ),
				'posts_per_page' => -1,
				'fields'         => 'ids',
			//phpcs:ignore
			'tax_query'      => array( peachpayrprrdtaxo( $attr, $term_idsa ) ),
				'posts_per_page' => $products_number,
				'orderby'        => 'rand',
			//phpcs:ignore
			'meta_query'     => array(
				array(
					'key'   => '_stock_status',
					'value' => 'instock',
				),
			),
			)
		);
	}

	peachpay_set_settings_option( 'peachpay_related_products_options', 'pp_related_products_id', $args );
	$related_products = array();
	foreach ( $args as $product_id ) {
		$related_product = wc_get_product( $product_id );
		$item            = array(
			'id'        => $related_product->get_id(),
			'name'      => $related_product->get_name(),
			'price'     => $related_product->get_price_html(),
			'variable'  => $related_product->is_type( 'variable' ),
			'bundle'    => $related_product->is_type( 'bundle' ),
			'img_src'   => is_array( peachpay_product_image( $related_product ) ) ? peachpay_product_image( $related_product )[0] : wc_placeholder_img_src(),
			'has_stock' => $related_product->get_stock_status() === 'instock',
			'permalink' => get_permalink( $product_id ),
			'sale'      => $related_product->is_on_sale(),
		);
		array_push( $related_products, $item );
	}

	return $related_products;
}

// Shortcode registration.
if ( ! shortcode_exists( 'woo-related' ) && peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_enable' ) ) {
	add_shortcode( 'woo-related', 'peachpayrprr_shortcode_display' );
}

if ( peachpay_get_settings_option( 'peachpay_related_products_options', 'peachpay_related_enable' ) ) {
	run_pp_related_products();
	add_action( 'woocommerce_after_single_product', 'peachpayrpdisplay' );
	add_filter( 'widget_text', 'do_shortcode' );
}

/**
 * Render upsell and cross-sell products settings section.
 */
function peachpay_upsell_and_cross_sell_section() {
	?>
	<div class="peachpay-setting-section">
		<?php
		peachpay_admin_input(
			'woocommerce_products_cross_sell',
			'peachpay_related_products_options',
			'display_woocommerce_products_cross_sell',
			1,
			__( 'Show cross-sell items', 'peachpay-for-woocommerce' ),
			__( 'Cross-sells on your products will be displayed in the checkout window', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'woocommerce_products_upsell',
			'peachpay_related_products_options',
			'display_woocommerce_products_upsell',
			1,
			__( 'Show upsell items', 'peachpay-for-woocommerce' ),
			__( 'Upsells on your products will be displayed in the checkout window', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);
		?>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Renders related products settings section.
 */
function peachpay_related_products_section() {
	?>
	<div class="peachpay-setting-section">
		<div>
			<h3 style="font-weight: bold;"><?php esc_html_e( 'Display', 'peachpay-for-woocommerce' ); ?></h3>
			<?php
			peachpay_admin_input(
				'peachpay_related_products_toggle',
				'peachpay_related_products_options',
				'peachpay_related_enable',
				1,
				__( 'Display related products in the product page', 'peachpay-for-woocommerce' ),
				__( 'Display random related products in a slider based on product category, tag, or attribute on every product page.', 'peachpay-for-woocommerce' ),
				array( 'input_type' => 'checkbox' )
			);
			?>
		</div>
		<?php
		peachpay_admin_input(
			'peachpay_related_products_checkout_window_toggle',
			'peachpay_related_products_options',
			'peachpay_related_products_checkout_window_enable',
			1,
			__( 'Display related products in the PeachPay Checkout Window', 'peachpay-for-woocommerce' ),
			__( 'Display random related products based on product category, tag, or attribute in the checkout window.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'peachpay_related_slider_toggle',
			'peachpay_related_products_options',
			'peachpay_related_slider',
			1,
			__( 'Enable auto-slider', 'peachpay-for-woocommerce' ),
			__( 'Enable auto-slider (only available for product page)', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);
		?>
			<div>
				<h3 style="font-weight: bold;"><?php esc_html_e( 'Appearance', 'peachpay-for-woocommerce' ); ?></h3>
			<?php
			peachpay_admin_input(
				'peachpay_related_products_title',
				'peachpay_related_products_options',
				'peachpay_related_title',
				'',
				__( 'Heading text', 'peachpay-for-woocommerce' ),
				'',
				array(
					'input_type'  => 'text',
					'placeholder' => __( 'Related Products', 'peachpay-for-woocommerce' ),
				)
			);
			?>
			</div>
		<div>
			<h3 style="font-weight: bold;"><?php esc_html_e( 'Products', 'peachpay-for-woocommerce' ); ?></h3>
			<div>
				<h4><?php esc_html_e( 'Number of products to display', 'peachpay-for-woocommerce' ); ?></h4>
				<?php peachpay_display_nproducts_cb(); ?>
			</div>
		</div>
		<div>
			<h4><?php esc_html_e( 'Related by', 'peachpay-for-woocommerce' ); ?></h4>
			<?php peachpay_product_relation_cb(); ?>
		</div>
		<?php
		peachpay_admin_input(
			'peachpay_related_products_exclude_id',
			'peachpay_related_products_options',
			'peachpay_exclude_id',
			'',
			__( 'Taxonomy IDs to exclude (comma separated)', 'peachpay-for-woocommerce' ),
			'',
			array(
				'input_type'  => 'text',
				'placeholder' => __( 'ie 12,45,32', 'peachpay-for-woocommerce' ),
			)
		);
		?>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}
