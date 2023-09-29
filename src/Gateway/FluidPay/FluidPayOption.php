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

    public function nonce_action(): string
    {
        return 'fluidpay_action';
    }

    public function nonce_name(): string
    {
        return 'fluidpay_nonce';
    }

    public function nonce_field(): void
    {
        if ( is_user_logged_in() ) {
            wp_nonce_field('wp_rest', '_wpnonce', false);
        }
        else {
            wp_nonce_field( $this->nonce_action(), $this->nonce_name(), false );
        }
    }
}