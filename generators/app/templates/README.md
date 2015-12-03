<%= projectName %>
=============
Based on [riverco.de](http://riverco.de) gulp boilerplate.

How to run
=============
You need to have [Node.js](https://nodejs.org/en/) installed. Just do:
```
npm install
```
To install all the dependencies. After that run project:
```
gulp
```

Structure
=============
`/src/` - thats where you write code.

`/site/` - compiled code. Do not ever edit this folder.

What is happening
=============
We have two options for building html
1) `/src/index.html` and `/src/partials/` - for old school HTML.

2) Optionally one can use `Jade` (it's commented in gulpfile.js). Basic template is in `/src/jade/`

_Sass_ is compiled and postprocessed with Autoprefixer. We are using `gulp-ruby-sass`, so don't forget to _install Ruby and Sass_ to use this boilerplate.

`src/img/icons` are joined into sprite, which could be used in Sass like this:
```
.icon
    +s(png_name)
```

`src/img/svg` are joined into icon font, and can be used like this:
```
<i class="icon-svg_name"></i>
```

We are also using simplest include system with `gulp-rigger`, works for javascrpt and html:
```
//= partials/partial.html
```

Naming
=============
We use BEM naming, meaning `.block` for independent block. `.block__element` for elements inside that block. And `.block_modification` for modification of the block.

It's nice to name layout blocks with `.l-*` prefixes. So you know it's layout.

States of the blocks use prefix `.is-*`. `.is-running`, `.is-hidden`, `.is-open`.

For javascript hooks we use prefix `.js-*`.