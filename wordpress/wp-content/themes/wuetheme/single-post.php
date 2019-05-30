<?php
get_header();
?>
<body>
<?php

initial_loader();

if ( have_posts() ) {
	// Load posts loop.
	while ( have_posts() ) {
		the_post();
		$data                                = [];
		$data["title"]                       = get_the_title();
		$data["post"]["date"]                = get_the_date();
		$data["post"]["update"]              = get_the_modified_date();
		$data["post"]["content"]["rendered"] = do_shortcode( get_the_content() );
	}
}

?>
<script>
    technomad.initialData = <?php

	print_r( json_encode( $data ) );


	?>;
</script>
<div id="app"></div>

<?php
get_footer();
?>

</body>
</html>