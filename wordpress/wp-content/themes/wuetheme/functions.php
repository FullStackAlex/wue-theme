<?php
if ( current_user_can( "administrator" ) ) {
	define( 'ALLOW_UNFILTERED_UPLOADS', true );
};


add_theme_support( 'post-thumbnails' );

get_template_part( "inc/custom-post-types/custom-post-types" );

/**
 * remove wordpress version number from files
 **/
remove_action( 'wp_head', 'wp_generator' );


/**
 * Enable the option "show" in rest
 **/
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

/**
 * Enable the option "edit" in rest
 **/
add_filter( 'acf/rest_api/field_settings/edit_in_rest', '__return_true' );


get_template_part( "inc/custom-endpoints/functions" );


/**
 * enable orderby menu_order in the wp rest api
 **/
add_filter( 'rest_post_collection_params', 'technomad_prefix_add_rest_orderby_params', 10, 1 );

function technomad_prefix_add_rest_orderby_params( $params ) {
	$params['orderby']['enum'][] = 'menu_order';

	return $params;
}


/**
 * include footer scripts
 **/
function enqueue_footer_scripts() {
	$theme_directory_name = get_template();


	$appBundlePath           = ABSPATH . "/wp-content/themes/$theme_directory_name/app/app.bundle.js";
	$babelPolyfillBundlePath = ABSPATH . "/wp-content/themes/$theme_directory_name/app/babelPolyfill.bundle.js";
	$appBundleUrl            = "/wp-content/themes/$theme_directory_name/app/app.bundle.js";
	$babelPolyfillBundleUrl  = "/wp-content/themes/$theme_directory_name/app/babelPolyfill.bundle.js";

	/**
	 * append last edit timestamp to production bundles to be able to
	 * load latest versions of the file if http caching is enabled
	 * (as we have disabled webpack hashing
	 * to be able to know which files we have to enqueue):
	 **/
	$appBundleTime           = filemtime( $appBundlePath );
	$babelPolyfillBundleTime = filemtime( $babelPolyfillBundlePath );

	wp_enqueue_script( 'babel-polyfill-bundle', $babelPolyfillBundleUrl, "", $babelPolyfillBundleTime );
	wp_enqueue_script( 'technomad-app-bundle', $appBundleUrl, "babel-polyfill-bundle", $appBundleTime );
}

function enqueue_header_script() {
	//header scripts
}




/**
 * check if user agent is bot
 * https://stackoverflow.com/questions/677419/how-to-detect-search-engine-bots-with-php
 **/

function technomad_bot_detected() {
	return (
		isset($_SERVER['HTTP_USER_AGENT'])
		&& preg_match('/bot|crawl|slurp|spider|mediapartners/i', $_SERVER['HTTP_USER_AGENT'])
	);
}


/**
 * enqueue app scripts only if not a bot (as they cause errors and unnecessary load)
 **/
if(!technomad_bot_detected()){
	add_action( 'wp_footer', 'enqueue_footer_scripts' );
	add_action( 'wp_header', 'enqueue_header_scripts' );
}




function initial_loader() {
	get_template_part( "template-parts/initial-loader" );
}



/**
 * remove "Archive:" from get_the_archive_title()
 **/
add_filter( 'get_the_archive_title', function ( $title ) {
	if ( is_post_type_archive() ) {
		$title = post_type_archive_title( ' ', false );
	} elseif ( is_archive() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	} elseif ( is_author() ) {
		$title = '<span class="vcard">' . get_the_author() . '</span>';
	} elseif ( is_category() ) {
		$title = single_cat_title( '', false );
	}

	return $title;
} );



add_filter( 'template_include', 'var_template_include', 1000 );
function var_template_include( $t ) {
	$GLOBALS['current_theme_template'] = basename( $t );

	return $t;
}


register_nav_menus(
	array(
		'header-menu'   => 'Header Menu',
		'footer-menu-1' => 'Footer Menu 1',
		'footer-menu-2' => 'Footer Menu 2',
		'footer-menu-3' => 'Footer Menu 3',
		'footer-menu-4' => 'Footer Menu 4',
	)
);


/**
 * disable listing user data in rest api
 **/
add_filter( 'rest_endpoints', function ( $endpoints ) {
	if ( isset( $endpoints['/wp/v2/users'] ) ) {
		unset( $endpoints['/wp/v2/users'] );
	}
	if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
		unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	}

	return $endpoints;
} );


/**
 * custom image size named "500"
 **/
add_image_size( '500', "500" );



/**
 * custom functions used on the demo site wuetheme.tech-nomad.de but not included in the Github Repo
 **/
get_template_part("inc/wuetheme-tech-nomad-de/functions");




/**
 * sometimes usefull
 **/
function get_current_template( $echo = false ) {
	if ( ! isset( $GLOBALS['current_theme_template'] ) ) {
		return false;
	}
	if ( $echo ) {
		echo $GLOBALS['current_theme_template'];
	} else {
		return $GLOBALS['current_theme_template'];
	}
}




function load_template_part( $template_name, $part_name = null ) {
	ob_start();
	get_template_part( $template_name, $part_name );
	$var = ob_get_contents();
	ob_end_clean();

	return $var;
}


function load_thumbnail( $id ) {
	ob_start();
	the_post_thumbnail( $id );
	write_log( "bla" . $id );
	$var = ob_get_contents();
	ob_end_clean();

	return $var;
}


function write_log( $log ) {
	if ( is_array( $log ) || is_object( $log ) ) {
		error_log( print_r( $log, true ) );
	} else {
		error_log( $log );
	}
}
