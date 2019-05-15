<!doctype html>
<html lang="en">
<head>


    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Tech Nomad">
    <title>
	    <?php
	    $description = get_bloginfo( 'description' );
	    // remove <br> line breaks from title:
	    $description = str_replace('&lt;br&gt;'," ", $description);
        echo " ". get_bloginfo("name") . " - " . $description;?>
    </title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:400,500,700|Roboto:400,700">

	<?php wp_head(); ?>

    <script>


        var wphost = "<?php echo site_url() ?>";


		<?php
		$menus = [];

		$menu_locations = get_theme_mod( 'nav_menu_locations' );
		asort($menu_locations);
		foreach ( $menu_locations  as $menu_name => $menu_id ) {
			if ( ! empty( wp_get_nav_menu_items( $menu_id)) ) {

			    foreach(wp_get_nav_menu_items( $menu_id ) as $index => $menu_item){

			    $menus[ $menu_name ][$index]["title"] = $menu_item->title;
			    $menus[ $menu_name ][$index]["slug"] = str_replace(site_url(),"",$menu_item->url);
			    $menus[ $menu_name ][$index]["classes"] = $menu_item->classes;
                }

			}
		}

		?>
        var technomad = {
            host: wphost,
            bloginfo: {
                name: "<?php echo wp_specialchars_decode(get_bloginfo( 'name' ))?>",
                description: "<?php echo wp_specialchars_decode( get_bloginfo( 'description' ))?>",
            },
            archives:{
                news:{
                    excerpt: <?php echo get_option( "rss_use_excerpt" ) ?>,
                    title: "<?php echo get_post(get_option("page_for_posts"))->post_title ?>"
                }
            },
            nonce: "<?php echo wp_create_nonce( 'wp_rest' )?>",
            menus: <?php print_r( json_encode( $menus ) ) ?>,
            blogpath: "<?php echo get_post(get_option( 'page_for_posts' ) )->post_name ?>"
        }
    </script>
</head>