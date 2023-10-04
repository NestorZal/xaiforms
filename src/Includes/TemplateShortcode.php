<?php
namespace XaiForms\Includes;

use XaiForms\Includes\Helper;

class TemplateShortcode
{
    public function __construct() {
        add_shortcode('xaiform', array($this, 'render_template'));
    }

    public function render_template( $atts ): ?string
    {
        $attributes = shortcode_atts( array(
            'name' => '', // option for templates created by the plugin (coming soon)
            'template' => '',
        ), $atts );

        $template = $attributes['template'] ?? '';
        if ( !$template ) {
            return '';
        }

        $helper = new Helper();
        $helper->enqueue_assets([
            [
                'file' => 'public/scripts/RenderTemplate.js',
                'deps' => ['wp-element'],
            ],
            [
                'file' => 'public/styles/default.css',
            ],
        ]);

        $template = trim($template, '/');
        $template = get_stylesheet_directory() . '/' . $template;

        ob_start();
        load_template( $template );

        $html = ob_get_clean();
        ob_end_flush();

        return
            '<div class="render-template">' .
                $helper->close_html_tags( $html ) .
            '</div>';
    }

}