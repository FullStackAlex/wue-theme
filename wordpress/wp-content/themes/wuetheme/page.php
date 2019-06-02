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
			$data            = [];
			$data["title"]   = get_the_title();
			$data["content"] = get_the_content();
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