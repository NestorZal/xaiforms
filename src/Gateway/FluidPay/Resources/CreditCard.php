<?php
namespace Xaifos\WpFluidPayIntegration\Gateway\Resources;

use Xaifos\WpFluidPayIntegration\Gateway\Resources\RequestObject;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\SanitizedPayload;

class CreditCard extends RequestObject
{

    protected $entry_type = '';
    protected $number = '';
    protected $expiration_date = '';
    protected $cvc = '';

    public function __construct( SanitizedPayload $payload )
    {
        $this->set_all($payload, 2, 'payment_method');
    }

    protected function set_entry_type( SanitizedPayload $payload )
    {
        $entry_types = array( 'keyed', 'swiped' );
        $entry_type = $payload->get('entry_type', 2, 'payment_method');
        $this->entry_type = in_array($entry_type, $entry_types, true) ? $entry_type : 'keyed';
    }

    protected function set_expiration_date( SanitizedPayload $payload )
    {
        $exp_date = $payload->get('expiration_date', 2, 'payment_method');
        $this->expiration_date = str_replace(' ', '', $exp_date);
    }

    protected function set_number( SanitizedPayload $payload )
    {
        $number = $payload->get('number', 2, 'payment_method');
        $this->number = str_replace(' ', '', $number);
    }
}