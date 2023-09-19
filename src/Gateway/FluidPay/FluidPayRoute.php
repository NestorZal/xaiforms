<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Includes\Route;
use XaiForms\Gateway\FluidPay\FluidPayOption;
use XaiForms\Gateway\FluidPay\FluidPayTransaction;

class FluidPayRoute extends Route
{
    public function __construct()
    {
        add_action( 'rest_api_init', array($this, 'route'));
    }

    public function route(): void
    {
        register_rest_route( $this->namespace, '/fluidpay/option/save', [
            'methods'   => 'POST',
            'callback'  => array( new FluidPayOption(), 'save_option_api_callback' ),
            'permission_callback'   => function () {
                return current_user_can('manage_options');
            }
        ]);

        register_rest_route($this->namespace, '/fluidpay/charge', [
            'methods' => 'POST',
            'callback' => array( new FluidPayTransaction(), 'charge_api_callback' ),
            'permission_callback' => '__return_true',
        ]);
    }
}