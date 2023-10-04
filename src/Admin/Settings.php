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
                        'file' => 'public/scripts/RenderTemplate.js',
                        'deps' => ['wp-element'],
                    ],
                    [
                        'file' => 'public/styles/default.css',
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
        <div class="render-template">
            <?php
                ob_start();
                include_once XAIFORMS_DIR . 'src/templates/default.payment.form.php';

                $html = ob_get_clean();
                ob_end_flush();

                echo $helper->close_html_tags($html);
            ?>
        </div>
        <?php
    }

}