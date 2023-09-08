<?php ?>
<div style="margin-bottom: 30px; color: #00a0d2; font-size: 24px; ">TESTING FORM</div>
<form method="post" action="">
    <input type="hidden" name="token" value="asdfwe12454"/>
   <step>

       <email name="emailAddress" label="Your Email" wrapper-class="email-address" required error-msg-required="Your email is required." error-msg-invalid="Your email is invalid. Please try again!"/>

       <select name="paymentOption" label="Select an option">
           <option value="opt-1">Option 1 sdfsgtr wrtrt wrt</option>
           <option value="opt-2">Option 2</option>
           <option value="opt-3">Option 3</option>
       </select>

        <input name="billingName" placeholder="Credit Card Holder" required  wrapper-class="billing-name" label="Name on credit card" error-msg-required="Your Name is required." />

        <cardnumber  name="cardNumber" wrapper-class="form-group row" label="Credit card number" class="form-control lock-icon" error-msg-required="Please enter your credit card."/>
        <expirydate name="expiryDate" label="Epiry date" error-msg-invalid="Please try again and insert a valid expiration date."/>
        <cvc name="cvc" label="CVC (3 or 4 digit code)"/>
        <input type="price" required name="amount" error-msg-required="The amount to pay is required."/>

       <button type="next">Next Step</button   >

    </step>

    <step>
        <div>Hello Final STEP</div>
        <fieldvalue name="emailAddress"    >
        <fieldvalue name="paymentOption" />
        <fieldvalue name="billingName">
        <fieldvalue format="cardnumber" name="cardNumber">
        <fieldvalue name="expiryDate"/>
        <fieldvalue name="cvc">
        <fieldvalue format="price" name="amount"/>

        <button type="back">Step Back</button>
        <button type="submit">Submit</button>
    </step>
</form>