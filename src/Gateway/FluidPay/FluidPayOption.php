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
}