<?php
namespace XaiForms\Includes;

use XaiForms\Gateway\FluidPay\FluidPayOption;

class Routes
{

    public function __construct()
    {
        add_action( 'rest_api_init', array($this, 'routes'));
    }

    public function routes(): void
    {
        register_rest_route('xaiforms/v1', '/option/fluidpay/save', [
            'methods'   => 'POST',
            'callback'  => array( new FluidPayOption(), 'save_option_rest_api' ),
            'permission_callback'   => function () {
                return current_user_can('manage_options');
            }
        ]);

    }


}