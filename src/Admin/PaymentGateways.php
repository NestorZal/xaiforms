<?php
namespace XaiForms\Admin;

use XaiForms\Admin\AdminPage;
class PaymentGateways extends AdminPage
{
    public function __construct()
    {
        $this->set_all(
            [
                'title' => 'Payment Gateways',
                'capability' => 'manage_options',
                'slug' => 'xaiforms-gateways-settings',
            ]
        );

        parent::__construct();

        $this->register();
    }

    public function render()
    {
        ?>
        <div class="wrap">

        </div>
        <?php
    }
}