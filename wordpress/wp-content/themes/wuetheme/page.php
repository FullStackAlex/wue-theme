<?php
get_header();
?>
<body>
<?php

if ( technomad_bot_detected() ) {

	get_template_part( "template-parts/bot-markup/post" );

} else {

	initial_loader();

	if ( have_posts() ) {

		// Load posts loop.
		while ( have_posts() ) {
			the_post();
			$data                          = [];
			$data["post"]["title"]         = apply_filters( "the_title", get_the_title() );
			$data["post"]["content"]       = apply_filters( "the_content", get_the_content() );
			$data["post"]["datePublished"] = get_the_date("c");
			$data["post"]["dateModified"]  = get_the_modified_date("c");
		}
	}

	?>

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