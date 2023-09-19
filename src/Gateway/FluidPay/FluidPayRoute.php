<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Includes\Route;
use XaiForms\Gateway\FluidPay\FluidPayOption;
use XaiForms\Gateway\FluidPay\FluidPayTransaction;

class FluidPayRoute extends Route
{
    public function route_names(): array
    {
        return [
          'save_option' => '/fluidpay/option/save',
          'charge_transaction' => '/fluidpay/charge'
        ];
    }

    public function route(): void
    {
        register_rest_route( $this->get_namespace(), $this->get_route( 'save_option' ), [
            'methods'   => 'POST',
            'callback'  => array( new FluidPayOption(), 'save_option_api_callback' ),
            'permission_callback'   => function () {
                return current_user_can('manage_options');
            }
        ]);

        register_rest_route( $this->get_namespace(), $this->get_route( 'charge_transaction' ), [
            'methods' => 'POST',
            'callback' => array( new FluidPayTransaction(), 'charge_api_callback' ),
            'permission_callback' => '__return_true',
        ]);
    }
}