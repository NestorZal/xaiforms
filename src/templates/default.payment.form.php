<?php
$fluidpay_options = new \XaiForms\Gateway\FluidPay\FluidPayOption();
$fluidpay_route = new \XaiForms\Gateway\FluidPay\FluidPayRoute();
?>
<div style="margin-bottom: 30px; color: #00a0d2; font-size: 24px; ">TESTING FORM</div>

<form method="post" action="<?php echo $fluidpay_route->get_route_url('charge_transaction'); ?>">
    <?php $fluidpay_options->nonce_field(); ?>
    <email name="billing_address[email]" label="Your Email" wrapper-class="email-address" required error-msg-required="Your email is required." error-msg-invalid="Your email is invalid. Please try again!"/>

    <select name="paymentOption" label="Select an option" placeholder="Select one" required>
        <option value="opt-1">Option 1</option>
        <option value="opt-2" selected="selected">Option 2</option>
        <option value="opt-3">Option 3</option>
    </select>

    <input name="billing_address[billing_name]" placeholder="Credit Card Holder" required  wrapper-class="billing-name" label="Name on credit card" error-msg-required="Your Name is required." />

    <card type="number" name="payment_method[card][number]" aria-label="Card number" autocomplete="cc-number" placeholder="Credit card number here"
          class="form-control lock-icon" wrapper-class="col-lg-8 col-xl-6"  label="Credit card number"
          error-msg-required="Please write your credit card number" error-msg-invalid="Please enter a valid credit card number"
    />


    <card type="expiry" label="Expiry date" name="payment_method[card][expiration_date]" class="form-control" wrapper-class="col-sm-6 col-lg-4 col-xl-3"
          error-msg-required="Please insert an expiry date" error-msg-invalid="Please insert a valid expiry date"
    />

    <card type="cvc" label="CVC (3 or 4 digit code)" name="payment_method[card][cvc]" class="form-control" wrapper-class="col-sm-6 col-lg-4 col-xl-3"
          error-msg-required="Please write the CVC number" error-msg-invalid="CVC number must have 3 digits long at least"
    />

    <input type="price" name="amount" class="form-control" wrapper-class="col-sm-6 col-lg-4 col-xl-3" required placeholder-color="#1275db" error-msg-required="The amount to pay is required."/>

    <button type="submit">Pay now!</button>

    <formresponse status="success">
        Thank you! You will receive an email soon with more instructions <responsevalue name="data[billing_address][first_name]"> <responsevalue name="data[billing_address][last_name]"> then we go where ever you want.
    </formresponse>
    <formresponse status="declined">
        Hey <responsevalue name="billingName">, YOur credit card was declined
    </formresponse>
    <formresponse status="failed">
        there was an error in your application: <responsevalue name="msg">
    </formresponse>
    <formresponse status="error">
        there was an error in your application
    </formresponse>

</form>