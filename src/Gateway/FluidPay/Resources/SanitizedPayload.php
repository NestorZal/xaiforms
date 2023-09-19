<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Includes\Helper;

class SanitizedPayload
{
    private array $payload = [];

    public function __construct( $payload )
    {
        $helper = new Helper();
        $this->payload = $helper->sanitize_array( $payload );
    }

    public function all(): array
    {
        return $this->payload;
    }

    public function get( string $key, $level = 0, $parent_key = '' )
    {
        if (0 === $level) {
            return $this->payload[$key] ?? null;
        }
        else {
            $payload = $this->payload[$parent_key] ?? null;
            return is_array($payload) ? $this->get_in_depth($payload, $key, $level, 1) : null;
        }
    }

    private function get_in_depth( array $payload, string $key, $level = 0, $current_level = 0 )
    {
        $value = null;

        foreach ( $payload as $_key => $_value ) {
            if ( ($level == $current_level) && ($key == $_key) ) {
                return $_value;
            }
            else if ( ($level > $current_level) && is_array($_value) ) {
                $value = $this->get_in_depth($_value, $key, $level, ++$current_level);
                if ($value) {
                    return $value;
                }
            }
        }

        return $value;
    }
}