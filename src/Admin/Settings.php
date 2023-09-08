<?php
namespace XaiForms\Admin;

use XaiForms\Admin\AdminPage;

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
        ?>
        <div id="render-template-form">
            <?php include_once XAIFORMS_DIR . 'src/templates/default.payment.form.php'; ?>
        </div>
        <?php
    }
}