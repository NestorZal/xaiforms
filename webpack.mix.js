let mix = require('laravel-mix');

mix.setPublicPath('public');

//mix.js('assets/js/admin.js', 'scripts');

mix.js('src/Includes/js/RenderHTML.js', 'scripts').react()
    .webpackConfig({
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
        },
    });

//mix.sass('assets/sass/admin.scss', 'styles');