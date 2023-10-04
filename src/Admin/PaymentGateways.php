<?php
namespace XaiForms\Admin;

use XaiForms\Admin\AdminPage;
use XaiForms\Gateway\FluidPay\FluidPayOption;
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
                        'file' => 'public/scripts/RenderTemplate.js',
                        'deps' => ['wp-element'],
                    ],
                    [
                        'file' => 'public/styles/default.css',
                    ],
                    [
                        'file' => 'public/styles/admin.css',
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
        <div class="wrap">

            <div class="render-template">
                <tab label="FluidPay" class="active">
                    <?php
                    ob_start();
                    load_template( XAIFORMS_DIR . 'src/Admin/templates/fluidpay-options.php' );

                    $html = ob_get_clean();
                    ob_end_flush();

                    echo $helper->close_html_tags($html);
                    ?>
                </tab>
                <tab label="Authorize.Net">
                     <h2>COMING SOON!</h2>
                </tab>
            </div>

        </div>
        <?php
    }
}