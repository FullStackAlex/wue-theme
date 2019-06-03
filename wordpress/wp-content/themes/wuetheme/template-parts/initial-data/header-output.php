<?php
$menus = [];

$menu_locations = get_theme_mod( 'nav_menu_locations' );
asort( $menu_locations );
foreach ( $menu_locations as $menu_name => $menu_id ) {
	if ( ! empty( wp_get_nav_menu_items( $menu_id ) ) ) {

		foreach ( wp_get_nav_menu_items( $menu_id ) as $index => $menu_item ) {

			$menus[ $menu_name ][ $index ]["title"]   = $menu_item->title;
			$menus[ $menu_name ][ $index ]["slug"]    = str_replace( site_url(), "", $menu_item->url );
			$menus[ $menu_name ][ $index ]["classes"] = $menu_item->classes;
		}

	}
}

$header_output = array(
	"host"    => site_url(),
	"bloginfo" => array(
		"name"        => wp_specialchars_decode( get_bloginfo( 'name' ) ),
		"description" => wp_specialchars_decode( get_bloginfo( 'description' ) ),
	),
	"archives" => array(
		"news" => array(
			"excerpt" => get_option( "rss_use_excerpt" ),
			"title"   => get_post( get_option( "page_for_posts" ) )->post_title,
		)
	),
	"nonce"    => wp_create_nonce( 'wp_rest' ),
	"menus"    => $menus,
	"blogpath" => get_post( get_option( 'page_for_posts' ) )->post_name,
);
?>

<script>
    var technomad = <?php
    print_r( json_encode( $header_output ) )
    ?>
</script>