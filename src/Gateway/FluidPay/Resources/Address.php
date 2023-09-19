<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Gateway\FluidPay\Resources\RequestObject;
use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;

class Address extends RequestObject
{
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
}