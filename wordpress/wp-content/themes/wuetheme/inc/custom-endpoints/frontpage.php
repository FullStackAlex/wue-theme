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

	return $data;

}

?>