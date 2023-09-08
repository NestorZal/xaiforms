<?php
namespace Xaifos\WpFluidPayIntegration\Gateway\Resources;

use Xaifos\WpFluidPayIntegration\Gateway\Resources\RequestObject;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\SanitizedPayload;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\ACH;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\Address;

class TransactionObject extends RequestObject
{

    protected $type = '';

    protected $amount = 0;

    protected $currency = 'USD';

    protected $description = '';

    protected $email_receipt = false;

    protected $email_address = '';

    protected $create_vault_record = true;

    protected $processor_id = '';

    protected $payment_method;

    protected $billing_address;

    protected $shipping_address;

    public function __construct( SanitizedPayload $payload )
    {
        $this->set_all($payload);
    }

    protected function set_type( SanitizedPayload $payload )
    {
        $types = array('sale', 'authorize', 'verification', 'credit');
        $type = $payload->get('type');
        $this->type = in_array($type, $types, true) ? $type : 'sale';
    }

    protected function set_amount( SanitizedPayload $payload )
    {
        $amount = $payload->get('amount');
        $this->amount = (float) $amount * 100;
    }

    protected function set_payment_method( SanitizedPayload $payload )
    {
        $payment_method = $payload->get('payment_method');
        if (isset($payment_method['card']) ) {
            $this->payment_method = [
                'card' => new CreditCard($payload)
            ];
        }
        else if (isset($payment_method['ach']) ) {
            $this->payment_method = [
                'ach' => new ACH($payload)
            ];
        }
    }

    protected function set_billing_address( SanitizedPayload $payload )
    {
        $billing_address = $payload->get('billing_address');
        if (is_array($billing_address) && !empty($billing_address) ) {
            $this->billing_address = new Address($payload, 'billing_address');
        }
    }

    protected function set_shipping_address( SanitizedPayload $payload )
    {
        $shipping_address = $payload->get('shipping_address');
        if (is_array($shipping_address) && !empty($shipping_address) ) {
            $this->shipping_address = new Address($payload, 'shipping_address');
        }
    }

}