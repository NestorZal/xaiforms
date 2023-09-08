<?php
namespace Xaifos\WpFluidPayIntegration\Gateway\Resources;

use Xaifos\WpFluidPayIntegration\Gateway\Resources\RequestObject;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\SanitizedPayload;

class ACH extends RequestObject
{

    protected $routing_number = '';
    protected $account_number = '';
    protected $sec_code = '';
    protected $account_type = '';
    protected $check_number = '';
    protected $accountholder_authentication = '';

    public function __construct(SanitizedPayload $payload)
    {
        $this->set_all($payload, 2, 'payment_method');
    }

    protected function set_sec_code( SanitizedPayload $payload )
    {
        $sec_codes = array( 'web', 'ccd', 'ppd', 'tel' );
        $sec_code = $payload->get('sec_code', 2, 'payment_method');
        $this->sec_code = in_array($sec_code, $sec_codes, true) ? $sec_code : 'ccd';
    }

    protected function set_accountholder_authentication( SanitizedPayload $payload )
    {
        $holder_auth = $payload->get('accountholder_authentication', 2, 'payment_method');

        if (!isset($holder_auth['dl_state']) || empty($holder_auth['dl_state']) ) {
            return;
        }

        if (!isset($holder_auth['dl_number']) || empty($holder_auth['dl_number']) ) {
            return;
        }

        $this->accountholder_authentication = $holder_auth;
    }
}