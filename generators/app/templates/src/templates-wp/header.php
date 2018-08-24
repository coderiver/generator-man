<!doctype html>
<html <?php language_attributes(); ?> >
<head >
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
    
    <?php wp_head(); ?>

	<link rel="stylesheet" media="all" href="<?php echo get_template_directory_uri(); ?>/css/app.css">
	<link rel="stylesheet" media="all" href="<?php echo get_template_directory_uri(); ?>/style.css">
</head>
<body <?php body_class(); ?> >
