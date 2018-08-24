
<?php get_header(); ?>

    <div class="search-results">
        <h1 class="title search-title">Поиск по: "<?php echo $_GET['s'];?>"</h1>
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <a class="search-link" href="<?php the_permalink();?>"><?php the_title(); ?></a>
        <?php the_content(''); ?>
        <?php endwhile; else: ?>
        <p>Поиск не дал результатов.</p>
        <?php endif;?>
    </div>

 <?php get_footer(); ?>