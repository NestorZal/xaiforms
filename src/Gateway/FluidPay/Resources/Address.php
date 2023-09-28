<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Gateway\FluidPay\Resources\RequestObject;
use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;

class Address extends RequestObject
{
    private array $full_name = [];

    protected string $first_name = '';
    protected string $last_name = '';
    protected string $company = '';
    protected string $address_line_1 = '';
    protected string $address_line_2 = '';
    protected string $city = '';
    protected string $state = '';
    protected string $postal_code = '';
    protected string $country = '';
    protected string $phone = '';
    protected string $fax = '';
    protected string $email = '';

    public function __construct( SanitizedPayload $payload, $parent_key = '' )
    {
        $this->set_all($payload, 1, $parent_key);
    }

    protected function set_first_name( SanitizedPayload $payload ): void
    {
        $first_name = $payload->get('first_name', 1, 'billing_address');
        if ( !$first_name ) {
            $full_name = $payload->get('billing_name', 1, 'billing_address');
            $split_name = $this->split_name($full_name);
            $first_name = $split_name['first_name'] ?? '';
        }

        $this->first_name = $first_name;
    }

    protected function set_last_name( SanitizedPayload $payload ): void
    {
        $last_name = $payload->get('last_name', 1, 'billing_address');
        if ( !$last_name ) {
            $full_name = $payload->get('billing_name', 1, 'billing_address');
            $split_name = $this->split_name($full_name);
            $last_name = $split_name['last_name'] ?? '';
        }

        $this->last_name = $last_name;
    }

    private function split_name($name): array
    {
        if ( !$this->full_name ) {
            $name = trim($name);
            $last_name = (!str_contains($name, ' ')) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
            $first_name = trim( preg_replace('#'.preg_quote($last_name,'#').'#', '', $name ) );

            $this->full_name = [
                'first_name' => $first_name,
                'last_name' => $last_name
            ];
        }
        return $this->full_name;
    }
}