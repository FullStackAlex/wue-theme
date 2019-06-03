<?php
get_header();
?>

<body>
<?php

if ( technomad_bot_detected() ) {

	global $botArchiveQueryArgs;
	$botArchiveQueryArgs = [
		"post_type"      => "post",
		"order"          => "DESC",
		"orderby"        => "date",
		"post_status"    => "publish",
		"posts_per_page" => - 1
	];

	get_template_part( "template-parts/bot-markup/archive" );

} else {

	initial_loader();

	$data    = [];
	$counter = 0;

	$args = [
		"post_type"      => "post",
		"order"          => "DESC",
		"orderby"        => "date",
		"post_status"    => "publish",
		"posts_per_page" => - 1
	];

	$post_query = new WP_Query( $args );

	if ( $post_query->have_posts() ) {
		while ( $post_query->have_posts() ) {
			$post_query->the_post();
			$data["posts"][ $counter ]["title"]["rendered"] = get_the_title();
			$data["posts"][ $counter ]["slug"]              = $post_query->post->post_name;
			if ( has_post_thumbnail() ) {
				$data["posts"][ $counter ]["img"] = get_the_post_thumbnail( get_the_ID(), "medium_large" );
			}
			if ( get_option( "rss_use_excerpt" ) ) {
				$excerpt                                          = apply_filters( "the_excerpt", get_the_excerpt() );
				$data["posts"][ $counter ]["excerpt"]["rendered"] = $excerpt;
			} else {
				$content                                          = apply_filters( "the_content", get_the_content() );
				$data["posts"][ $counter ]["content"]["rendered"] = $content;
			}
			$data["posts"][ $counter ]["id"]     = get_the_ID();
			$data["posts"][ $counter ]["date"]   = get_the_date();
			$data["posts"][ $counter ]["update"] = get_the_modified_date();
			$counter ++;
		}
		wp_reset_postdata();
	} ?>
    <script>
        technomad.initialData = <?php

		print_r( json_encode( $data ) )

		?>;
    </script>
    <div id="app"></div>

	<?php
}
get_footer();
?>
</body>
</html>