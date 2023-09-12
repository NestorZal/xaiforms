let mix = require('laravel-mix');

mix.setPublicPath('public');

mix.js('src/Includes/js/RenderHTML.js', 'scripts').react()
    .webpackConfig({
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
        },
    });

mix.sass('src/Includes/sass/admin.scss', 'styles');