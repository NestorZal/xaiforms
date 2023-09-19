<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Gateway\FluidPay\Resources\RequestObject;
use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;

class ACH extends RequestObject
{

    protected string $routing_number = '';
    protected string $account_number = '';
    protected string $sec_code = '';
    protected string $account_type = '';
    protected string $check_number = '';
    protected string $accountholder_authentication = '';

    public function __construct(SanitizedPayload $payload)
    {
        $this->set_all($payload, 2, 'payment_method');
    }

    protected function set_sec_code( SanitizedPayload $payload ): void
    {
        $sec_codes = array( 'web', 'ccd', 'ppd', 'tel' );
        $sec_code = $payload->get('sec_code', 2, 'payment_method');
        $this->sec_code = in_array($sec_code, $sec_codes, true) ? $sec_code : 'ccd';
    }

    protected function set_accountholder_authentication( SanitizedPayload $payload ): void
    {
        $holder_auth = $payload->get('accountholder_authentication', 2, 'payment_method');

        if (empty($holder_auth['dl_state'])) {
            return;
        }

        if (empty($holder_auth['dl_number'])) {
            return;
        }

        $this->accountholder_authentication = $holder_auth;
    }
}