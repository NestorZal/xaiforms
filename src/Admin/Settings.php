<?php
namespace XaiForms\Admin;

use XaiForms\Admin\AdminPage;
use XaiForms\Includes\Helper;

class Settings extends AdminPage
{

    public function __construct()
    {
        $this->set_all(
            [
                'title' => 'XaiForms Settings',
                'capability' => 'manage_options',
                'slug' => $this->parent_slug,
                'parent_slug' => '',
                'assets' => [
                    [
                        'handle' => 'render-payment-form',
                        'file' => 'public/scripts/RenderHTML.js',
                        'deps' => ['wp-element'],
                    ],
                ],
            ]
        );

        parent::__construct();

        $this->register();
    }

    public function render(): void
    {
        $helper = new Helper();
        ?>
        <div id="render-template-form">
            <?php
                ob_start();
                include_once XAIFORMS_DIR . 'src/templates/default.payment.form.php';

                $html = ob_get_clean();
                ob_end_flush();

                echo $helper->close_custom_html_tags($html);
           /// echo htmlspecialchars($helper->close_custom_html_tags($html), ENT_QUOTES);
            ?>
        </div>
        <?php
    }

    private function format_content( $html) {
        if (!$html) {
            return '';
        }
        $newHTML = preg_replace('/<\/fieldvalue(.*?)>/', '', $html);
        $newHTML = preg_replace('/<fieldvalue (.*?)(\/|\S|\s)>/', '<fieldvalue $1></fieldvalue>', $newHTML);
        echo htmlspecialchars($newHTML, ENT_QUOTES);
    }
}