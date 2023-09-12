<?php
namespace XaiForms\Admin;

use XaiForms\Admin\AdminPage;
use XaiForms\Includes\Helper;

class PaymentGateways extends AdminPage
{
    public function __construct()
    {
        $this->set_all(
            [
                'title' => 'Payment Gateways',
                'capability' => 'manage_options',
                'slug' => 'xaiforms-gateways-settings',
                'assets' => [
                    [
                        'file' => 'public/scripts/RenderHTML.js',
                        'deps' => ['wp-element'],
                    ],
                    [
                        'file' => 'public/styles/admin.css',
                        'type' => 'css'
                    ],
                ],
            ]
        );

        parent::__construct();

        $this->register();
    }

    public function render()
    {
        $helper = new Helper();
        ?>
        <div class="wrap">

            <div class="render-template">
                <tab label="FluidPay">
                    <?php
                    ob_start();
                    include_once XAIFORMS_DIR . 'src/Admin/templates/template-fluidpay-options.php';

                    $html = ob_get_clean();
                    ob_end_flush();

                    echo $helper->close_custom_html_tags($html);
                    ?>
                </tab>
                <tab label="Authorize.Net">
                     COMING SOON!
                    <label>
                        <div>Testing HELLO</div>
                    </label>
                </tab>
            </div>

        </div>
        <?php
    }
}