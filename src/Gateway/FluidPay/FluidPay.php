<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Gateway\FluidPay\FluidPayOption;

abstract class FluidPay
{
    private ?string $api_key;

    protected string $route = '';
    protected ?FluidPayOption $fluidpay_option;

    public function __construct()
    {
        $this->fluidpay_option = new FluidPayOption();

        $this->api_key = $this->fluidpay_option->get_option('private-key');
        if ( !$this->api_key ) {
            wp_die('Access denied!');
        }
    }

    protected function endpoint(): string
    {
        return $this->fluidpay_option->get_base_url() . $this->route;
    }

    protected function get_api_key() : string|null
    {
        return $this->api_key;
    }
}