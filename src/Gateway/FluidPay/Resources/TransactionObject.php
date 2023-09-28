<?php
namespace XaiForms\Gateway\FluidPay\Resources;

use XaiForms\Gateway\FluidPay\Resources\Address;
use XaiForms\Gateway\FluidPay\Resources\RequestObject;
use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;
use XaiForms\Gateway\FluidPay\Resources\ACH;

class TransactionObject extends RequestObject
{
    protected string $type = '';

    protected int|float $amount = 0;

    protected string $currency = 'USD';

    protected string $description = '';

    protected bool $email_receipt = false;

    protected string $email_address = '';

    protected bool $create_vault_record = true;

    protected string $processor_id = '';

    protected array $payment_method = [];

    protected ?Address $billing_address = null;

    protected ?Address $shipping_address = null;

    public function __construct( SanitizedPayload $payload )
    {
        $this->set_all($payload);
    }

    protected function set_type( SanitizedPayload $payload ): void
    {
        $types = array('sale', 'authorize', 'verification', 'credit');
        $type = $payload->get('type');
        $this->type = in_array($type, $types, true) ? $type : 'sale';
    }

    protected function set_amount( SanitizedPayload $payload ): void
    {
        $amount = $payload->get('amount');
        $this->amount = (float) $amount * 100;
    }

    protected function set_payment_method( SanitizedPayload $payload ): void
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

    protected function set_billing_address( SanitizedPayload $payload ): void
    {
        $billing_address = $payload->get('billing_address');
        if (is_array($billing_address) && !empty($billing_address) ) {
            $this->billing_address = new Address($payload, 'billing_address');
        }
    }

    protected function set_shipping_address( SanitizedPayload $payload ): void
    {
        $shipping_address = $payload->get('shipping_address');
        if (is_array($shipping_address) && !empty($shipping_address) ) {
            $this->shipping_address = new Address($payload, 'shipping_address');
        }
    }
}