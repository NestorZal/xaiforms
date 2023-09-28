<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;

abstract class RequestObject
{

    protected function set( string $property, SanitizedPayload $payload, $level = 0, $parent_key = '' ): void
    {
        if (property_exists($this, $property) ) {
            $value = $payload->get($property, $level, $parent_key);
            if (null !== $value ) {
                if (is_int($this->{ $property }) ) {
                    $value = (int) $value;
                }
                else if (is_bool($this->{ $property }) ) {
                    $value = (bool) $value;
                }

                $this->{ $property } = $value;
            }
        }
    }

    protected function set_all( SanitizedPayload $payload, $level = 0, $parent_key = '' ): void
    {
        $properties = $this->properties();
        foreach ( $properties as $property ) {
            $method = 'set_' . $property;

            if (method_exists($this, $method) ) {
                $this->{ $method }($payload);
            }
            else {
                $this->set($property, $payload, $level, $parent_key);
            }
        }
    }

    public function data(): array
    {
        return get_object_vars($this);
    }

    public function data_json(): false|string
    {
        return wp_json_encode($this->to_array());
    }

    public function properties(): array
    {
        return array_keys($this->data());
    }

    public function to_array(): array
    {
        $data = $this->data();
        return $this->cast_data_to_array($data);
    }

    private function cast_data_to_array( $data ): array
    {
        $new_data = [];
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_object($value) ) {
                    $_value = [];
                    foreach ($value as $_k => $_v) {
                        $_value[ $_k ] = $_v;
                    }

                    $value = $_value;
                }

                if (is_array($value) ) {
                    $value = $this->cast_data_to_array($value);
                }

                $new_data[$key] = $value;
            }
        }

        return $new_data;
    }
}