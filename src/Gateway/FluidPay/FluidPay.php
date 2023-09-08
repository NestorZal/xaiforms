<?php
namespace Xaifos\PaymentForms\Gateway\FluidPay;

abstract class FluidPay
{

    private $base_urls = [
        'test' => 'https://sandbox.fluidpay.com',
        'live' => 'https://app.fluidpay.com'
    ];

    private $gateway_options;

    protected $route = '';
    protected $mode = '';

    protected function endpoint()
    {
        if (!$this->mode) {
            $mode = $this->get_gateway_option('env_mode');
            $this->mode = $mode ? $mode : 'test';
        }
        return $this->base_urls[$this->mode] . $this->route;
    }

    protected function get_api_key( $private = true )
    {
        return $private ? $this->get_gateway_option('private_key') : $this->get_gateway_option('public_key');
    }

    private function get_gateway_option( string $key )
    {
        if (!$this->gateway_options) {
            $option = new FluidPayOption();
            $this->gateway_options = $option->get_values();
        }
        return $this->gateway_options[$key] ?? null;
    }
}