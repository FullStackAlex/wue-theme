<?php
get_header();
?>

<body>
<?php initial_loader();


$data          = [];
$counter       = 0;

$args = [
	"post_type"      => "post",
	"order"          => "DESC",
	"post_status"    => "publish",
	"posts_per_page" => - 1
];

$post_query = new WP_Query( $args );

?>

<?php
if ( $post_query->have_posts() ) {
	// Load posts loop.
	while ( $post_query->have_posts() ) {
		$post_query->the_post();
		$data["posts"][ $counter ]["title"]["rendered"] = get_the_title();
		$data["posts"][ $counter ]["slug"]              = $post_query->post->post_name;
		if ( has_post_thumbnail() ) {
			$data["posts"][ $counter ]["img"] = get_the_post_thumbnail( get_the_ID(), "medium_large" );
		}

		$data["posts"][ $counter ]["date"]                = get_the_date();
		$data["posts"][ $counter ]["update"]              = get_the_modified_date();
		$data["posts"][ $counter ]["content"]["rendered"] = get_the_content();
		$data["posts"][ $counter ]["id"]                  = get_the_ID();
		$counter ++;
	}
	wp_reset_postdata();
	?>
<?php } ?>
<script>
    technomad.initialData = <?php

	print_r( json_encode( $data ) )

	?>;
</script>
<div id="app"></div>

<?php
get_footer();
?>
</body>
</html>