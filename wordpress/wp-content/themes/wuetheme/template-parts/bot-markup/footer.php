<footer>
    <nav>
		<?php

        
        /**
         * get registered menus (see functions.php)
         * and check if any menus in backend are assigned to them,
         * if so - load the (footer) menu
         **/
		foreach ( get_registered_nav_menus() as $key => $value ) {

			if ( has_nav_menu( $key ) && strpos($key, "footer") === 0) {

				wp_nav_menu( array(
					'theme_location' => $key,
					'container'      => false,
				) );


			}
		}
		?>
    </nav>
</footer>