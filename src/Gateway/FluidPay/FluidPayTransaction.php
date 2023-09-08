<?php
namespace Xaifos\PaymentForms\Gateway\FluidPay;

use Xaifos\WpFluidPayIntegration\Gateway\FluidPay;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\SanitizedPayload;
use Xaifos\WpFluidPayIntegration\Gateway\Resources\TransactionObject;

class FluidPayTransaction extends FluidPay
{
    private $api_key;

    public function __construct()
    {
        $this->route = '/api/transaction';

        $this->api_key = $this->get_api_key(true);
        if (!$this->api_key) {
            wp_die('Access denied!');
        }
    }

    public function charge( $payload )
    {
        if ($payload instanceof SanitizedPayload) {
            $sanitized_payload = $payload;
        }
        else if (is_array($payload) ) {
            $sanitized_payload = new SanitizedPayload($payload);
        }
        else {
            return new \WP_Error(400, 'Invalid transaction', array( 'status' => 'failed' ));
        }

        $request = new TransactionObject($sanitized_payload);

        $response = wp_remote_post(
            $this->endpoint(), array(
                'method'      => 'POST',
                'headers'     => array(
                    'Authorization' => $this->api_key,
                    'Content-Type' => 'application/json',
                ),
                'body'        => $request->data_json(),
                'cookies'     => array()
            )
        );

        if (is_wp_error($response) ) {
            return $response;
        } else {
            $code = isset($response['response']['code']) ? $response['response']['code'] : 400;
            $data = json_decode($response['body']);

            return new \WP_REST_Response($data, $code);
        }

        return new \WP_Error(400, 'Bad request', array( 'status' => 'failed' ));
    }

}