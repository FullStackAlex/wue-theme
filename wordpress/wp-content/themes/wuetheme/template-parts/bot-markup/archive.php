<?php

get_template_part( "template-parts/bot-markup/dequeue-scripts" );
get_template_part( "template-parts/bot-markup/header-nav" );

$data    = [];
$counter = 0;

global $botArchiveQueryArgs;

$post_query = new WP_Query( $botArchiveQueryArgs );

?>
    <header>
        <h1>
			<?php
			if ( $botArchiveQueryArgs["post_type"] === "post" ) {
				echo get_post( get_option( "page_for_posts" ) )->post_title;
			} else {
				echo post_type_archive_title( '', false );
			} ?>
        </h1>
    </header>
    <main>
		<?php
		if ( $post_query->have_posts() ) {

			while ( $post_query->have_posts() ) {
				$post_query->the_post();

				$publishedDate     = get_the_date();
				$publishedDateTime = date( 'Y-m-d', strtotime( $publishedDate ) );
				$modifiedDate      = get_the_modified_date();
				$modifiedDateTime  = date( 'Y-m-d', strtotime( $modifiedDate ) );

				?>
                <article>
                    <a href="<?php the_permalink()?>">
                        <header>
                            <h2><?php the_title(); ?></h2>
                            <time datetime="<?php echo $publishedDateTime ?>"
                                  itemprop="datePublished"><?php echo $publishedDate ?></time>
                            <br>
							<?php if ( $publishedDate !== $modifiedDate ) { ?>
                                <time datetime="<?php echo $modifiedDateTime ?>" itemprop="dateModified"><?php echo $modifiedDate ?></time>
							<?php } ?>
                        </header>
                        <section>
							<?php
							if ( has_post_thumbnail() ) {
								the_post_thumbnail( get_the_ID(), "medium_large" );
							}
							if ( get_option( "rss_use_excerpt" ) ) {
								the_excerpt();
							} else {
								the_content();
							}
							$counter ++;
							?>
                        </section>
                    </a>
                </article>
				<?php
			}
			wp_reset_postdata();
		}
		?>
    </main>
<?php

get_template_part( "template-parts/bot-markup/footer" );