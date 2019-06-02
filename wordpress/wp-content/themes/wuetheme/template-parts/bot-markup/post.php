<?php
get_template_part( "template-parts/bot-markup/dequeue-scripts" );
get_template_part( "template-parts/bot-markup/header-nav" );

if ( have_posts() ) {

	$publishedDate     = get_the_date();
	$publishedDateTime = date( 'Y-m-d', strtotime( $publishedDate ) );
	$modifiedDate      = get_the_modified_date();
	$modifiedDateTime  = date( 'Y-m-d', strtotime( $modifiedDate ) );

	while ( have_posts() ) {
		the_post();
		?>
        <header>
            <h1>
				<?php the_title() ?>
            </h1>
            <time datetime="<?php echo $publishedDateTime ?>" itemprop="datePublished"><?php echo $publishedDate ?></time>
            <br>
			<?php if ($publishedDate !== $modifiedDate) { ?>
                <time datetime="<?php echo $modifiedDateTime ?>" itemprop="dateModified"><?php echo $modifiedDate ?></time>
			<?php } ?>
        </header>
        <main>
			<?php the_content(); ?>
        </main>
		<?php
	}
}
get_template_part( "template-parts/bot-markup/footer" );
