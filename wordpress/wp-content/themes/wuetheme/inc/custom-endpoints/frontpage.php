<?php

function register_frontpage_endpoint() {
	register_rest_route(
		'technomad',
		'/frontpage/',
		array(
			'methods'  => 'GET',
			'callback' => 'technomad_get_frontpage',
		)
	);
}


add_action( 'rest_api_init', 'register_frontpage_endpoint' );


function technomad_get_frontpage() {

	$data = [];

	$post    = get_post( get_option( 'page_on_front' ) );
	$content = apply_filters( 'the_content', $post->post_content );
	$title   = apply_filters( 'the_title', $post->post_title );

	$data["content"] = $content;
	$data["title"]   = $title;


	/**
	 * some other custom frontpage data example (used  once for a project)
	 **/
	/*
		$attachments = get_posts( array(
			'post_type'   => 'attachment',
			'numberposts' => - 1,
			'status'      => 'publish',
			'tax_query'   => array(
				array(
					'taxonomy' => 'attachment_category',
					'field'    => 'slug',
					'terms'    => 'featured-slider'
				)
			)
		) );

		foreach ( $attachments as $index => $attachment ) {
			$data["featured-slider"][ $index ]["title"]     = $attachment->post_title;
			$data["featured-slider"][ $index ]["ID"]        = $attachment->ID;
			$data["featured-slider"][ $index ]["guid"]      = $attachment->guid;
			$data["featured-slider"][ $index ]["thumbnail"] = wp_get_attachment_image( $attachment->ID, "large" );
		}


		$terms  = get_terms( [
			'taxonomy'   => "attachment_category",
			'hide_empty' => true,
		] );
		foreach ( $terms as $thema ) {
			if ( $thema->slug !== "featured-slider" ) {
				$data["themen"][ $thema->slug ]["slug"]           = $thema->slug;
				$data["themen"][ $thema->slug ]["name"]           = $thema->name;
				$data["themen"][ $thema->slug ]["count"]          = $thema->count;
				$data["themen"][ $thema->slug ]["term_id"]        = $thema->term_id;
				$featured_image                                   = get_field( "featured_image", $thema );
				$data["themen"][ $thema->slug ]["featured_image"] = wp_get_attachment_image( $featured_image, "medium" );
			}
		}*/


	return $data;

}

?>