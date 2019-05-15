<?php


add_action( 'init', 'cp_change_post_object' );
// Change dashboard Posts to News
function cp_change_post_object() {
	$get_post_type = get_post_type_object('post');
	$labels = $get_post_type->labels;
	$labels->name = 'News';
	$labels->singular_name = '"News" post';
	$labels->add_new = 'New "News" post';
	$labels->add_new_item = 'New "News" post';
	$labels->edit_item = 'Edit "News" post';
	$labels->new_item = 'News';
	$labels->view_item = 'Show "News" post';
	$labels->search_items = 'Search "News" posts';
	$labels->not_found = 'No "News" posts found';
	$labels->not_found_in_trash = 'No "News" posts found in trash';
	$labels->all_items = 'All "News" posts';
	$labels->menu_name = 'News';
	$labels->name_admin_bar = 'News';
}
