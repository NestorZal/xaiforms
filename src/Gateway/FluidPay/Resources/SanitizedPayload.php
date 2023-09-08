<?php
namespace Xaifos\WpFluidPayIntegration\Gateway\Resources;

class SanitizedPayload
{
    private $payload = [];

    public function __construct( $payload )
    {
        if (is_array($payload) && !empty($payload)) {
            foreach ( $payload as $key => $value ) {
                $key = sanitize_key($key);

                if (is_array($value)) {
                    $value = $this->sanitize_array($value);
                }
                else {
                    $value = $value ? $this->sanitize_value($value, $key) : '';
                }
                $this->payload[ $key ] = $value;
            }
        }
    }

    public function all()
    {
        return $this->payload;
    }

    public function get( string $key, $level = 0, $parent_key = '' )
    {
        if (0 === $level) {
            return isset($this->payload[$key]) ? $this->payload[$key] : null;
        }
        else {
            $payload = isset($this->payload[$parent_key]) ? $this->payload[$parent_key] : null;
            return is_array($payload) ? $this->get_in_depth($payload, $key, $level, 1) : null;
        }
    }

    private function get_in_depth( array $payload, string $key, $level = 0, $current_level = 0 )
    {
        $value = null;

        foreach ($payload as $_key => $_value ) {
            if (($level == $current_level) && ($key == $_key) ) {
                return $_value;
            }
            else if (($level > $current_level) && is_array($_value) ) {
                $value = $this->get_in_depth($_value, $key, $level, ++$current_level);
                if ($value) {
                    return $value;
                }
            }
            else {
                continue;
            }
        }

        return $value;
    }

    private function sanitize_value( string $value, $key = '' )
    {
        switch ( $key ) {
        case 'email':
        case 'email_address':
            $sanitized_value = sanitize_email($value);
            break;

        case 'description':
            $sanitized_value = sanitize_textarea_field($value);
            break;

        default:
            $sanitized_value = sanitize_text_field($value);
            break;
        }

        return $sanitized_value;
    }

    private function sanitize_array(array $array)
    {
        $sanitized_array = [];
        foreach ($array as $key => $value) {
            $key = sanitize_key($key);

            if (is_array($value)) {
                $value = $this->sanitize_array($value);
            }
            else {
                $value = $value ? $this->sanitize_value($value, $key) : '';
            }

            $sanitized_array[$key] = $value;
        }

        return $sanitized_array;
    }

}