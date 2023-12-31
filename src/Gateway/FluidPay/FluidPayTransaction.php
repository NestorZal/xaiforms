<?php
namespace XaiForms\Gateway\FluidPay;

use XaiForms\Gateway\FluidPay\FluidPay;
use XaiForms\Gateway\FluidPay\Resources\SanitizedPayload;
use XaiForms\Gateway\FluidPay\Resources\TransactionObject;

class FluidPayTransaction extends FluidPay
{

    public function __construct()
    {
        parent::__construct();
        $this->route = '/api/transaction';
    }

    public function charge( $payload ): \WP_Error|\WP_REST_Response
    {
        $this->verify_api_key();

        if ($payload instanceof SanitizedPayload) {
            $sanitized_payload = $payload;
        }
        else if (is_array($payload) ) {
            $sanitized_payload = new SanitizedPayload($payload);
        }
        else {
            return new \WP_Error( 400, 'Invalid transaction', array( 'status' => 'failed' ) );
        }

        $request = new TransactionObject($sanitized_payload);

        $response = wp_remote_post(
            $this->endpoint(), array(
                'method'      => 'POST',
                'headers'     => array(
                    'Authorization' => $this->get_api_key(),
                    'Content-Type' => 'application/json',
                ),
                'body'        => $request->data_json(),
                'cookies'     => array()
            )
        );

        if (is_wp_error($response) ) {
            return $response;
        }

        $code = $response['response']['code'] ?? 400;
        $data = json_decode( $response['body'] );

        if (isset( $data->status) && ('success' === $data->status)) {
            $status = isset($data->data->response_body->card->response) && $data->data->response_body->card->response === 'declined' ? 'declined' : $data->status;
            $data->status = $status;
        }

        return new \WP_REST_Response( $data, $code );
    }

    public function charge_api_callback( \WP_REST_Request $request ): \WP_Error|\WP_REST_Response
    {
        $params = $request->get_params();

        if ( !is_user_logged_in() ) {
            $nonce = $params[$this->fluidpay_option->nonce_name()];

            if ( !wp_verify_nonce( $nonce, $this->fluidpay_option->nonce_action() ) ) {
                return new \WP_Error(400, 'Invalid transaction', array('status' => 'failed'));
            }
        }

        $sanitized_payload = new SanitizedPayload($params);
        $response = $this->charge($sanitized_payload);

        return apply_filters( 'xaiform_fluidpay_request_after', $response, $sanitized_payload->all() );
    }

}