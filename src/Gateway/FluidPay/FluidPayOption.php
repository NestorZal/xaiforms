<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Includes\Option;

class FluidPayOption extends Option
{
    public function option_name(): string
    {
        return 'xf-fluidpay-options';
    }

    protected function default_options(): array
    {
        return [
            'env-mode' => 'test',
            'private-key' => ''
        ];
    }

    public function base_urls(): array
    {
        return [
            'test' => 'https://sandbox.fluidpay.com',
            'live' => 'https://app.fluidpay.com'
        ];
    }

    public function get_base_url (): string
    {
        $base_urls = $this->base_urls();
        $env_mode = $this->get_option('env-mode');
        return $base_urls[ $env_mode ];
    }

    public function get_transaction_token(): string
    {
        return wp_hash( $this->get_base_url() );
    }

    public function get_transaction_token_name(): string
    {
        return 'fluidpay-token';
    }

    public function token_field(): void
    {
        echo '<input type="hidden" name="' . $this->get_transaction_token_name() . '" value="' . $this->get_transaction_token() . '"/>';
    }
}