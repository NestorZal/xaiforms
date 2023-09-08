<?php
namespace Xaifos\PaymentForms\Gateway\FluidPay;

class FluidPayOption
{
    private static $option_name = 'wp-fluidpay-integration-options';
    private static $option_page = 'wp-fluidpay-integration-options-page';
    private static $option_group = 'wp-fluidpay-integration-options-group';

    private $option_values;

    public static function option_name()
    {
        return self::$option_name;
    }

    public static function option_page()
    {
        return self::$option_page;
    }

    public static function option_group()
    {
        return self::$option_group;
    }

    public function get_value( string $field )
    {
        $values = $this->get_values();
        return isset($values[$field]) ? $values[$field] : false;
    }

    public function get_values()
    {
        if (!$this->option_values) {
            $this->option_values = get_option(self::option_name());
        }
        return $this->option_values;
    }
}