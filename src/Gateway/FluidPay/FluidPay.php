<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Gateway\FluidPay\FluidPayOption;

abstract class FluidPay
{
    private ?string $api_key;
    private array $base_urls = [
        'test' => 'https://sandbox.fluidpay.com',
        'live' => 'https://app.fluidpay.com'
    ];

    protected string $route = '';
    protected string $mode = '';

    public function __construct()
    {
        $option = new FluidPayOption();

        $this->api_key = $option->get_option('private-key');
        if ( !$this->api_key ) {
            wp_die('Access denied!');
        }

        $this->mode = $option->get_option('env-mode');
    }

    protected function endpoint(): string
    {
        return $this->base_urls[ $this->mode ] . $this->route;
    }

    protected function get_api_key()
    {
        return $this->api_key;
    }

    protected function get_token()
    {
        return  wp_hash( $this->base_urls[ $this->mode ] );
    }
}