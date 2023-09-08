<?php
namespace Xaifos\WpFluidPayIntegration\Gateway\Resources;

use Xaifos\WpFluidPayIntegration\Gateway\Resources\RequestObject;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\SanitizedPayload;

class Address extends RequestObject
{

    protected $first_name = '';
    protected $last_name = '';
    protected $company = '';
    protected $address_line_1 = '';
    protected $address_line_2 = '';
    protected $city = '';
    protected $state = '';
    protected $postal_code = '';
    protected $country = '';
    protected $phone = '';
    protected $fax = '';
    protected $email = '';

    public function __construct( SanitizedPayload $payload, $parent_key = '' )
    {
        $this->set_all($payload, 1, $parent_key);
    }
}