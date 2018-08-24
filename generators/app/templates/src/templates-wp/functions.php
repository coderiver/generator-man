<?php
// function fjarrett_remove_wp_version_strings( $src ) {
//     global $wp_version;
//     parse_str(parse_url($src, PHP_URL_QUERY), $query);
//     if ( !empty($query[‘ver’]) && $query[‘ver’] === $wp_version ) {
//     $src = remove_query_arg(‘ver’, $src);
//     }
//     return $src;
//     }
//     add_filter( 'script_loader_src', 'fjarrett_remove_wp_version_strings' );
//     add_filter( 'style_loader_src', 'fjarrett_remove_wp_version_strings' );
    
//     /* Hide WP version strings from generator meta tag */
//     function wpmudev_remove_version() {
//     return ' ';
//     }
//     add_filter('the_generator', 'wpmudev_remove_version');


// if( function_exists('acf_add_options_page') ) {
  
//     acf_add_options_page(array(
//       'page_title'  => 'Theme General Settings',
//       'menu_title'  => 'Опции сайта',
//       'menu_slug'   => 'theme-general-settings',
//       'capability'  => 'edit_posts',
//       'redirect'    => false
//     ));

// }

// svg support
// add_theme_support( 'post-thumbnails' );

// function cc_mime_types($mimes) {
//     $mimes['svg'] = 'image/svg+xml';
//     return $mimes;
//   }
//   add_filter('upload_mimes', 'cc_mime_types'); 





 






 

