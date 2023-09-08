<?php ?>
<div style="margin-bottom: 30px; color: #00a0d2; font-size: 24px; ">TESTING FORM</div>
<form method="post" action="">
    <input type="hidden" name="token" value="asdfwe12454"/>
   <step>

       <input name="emailAddress" type="email" label="Your Email" wrapper-class="email-address" required error-msg-required="Your email is required." error-msg-invalid="Your email is invalid. Please try again!"/>

       <select name="paymentOption" label="Select an option">
           <option value="opt-1">Option 1 sdfsgtr wrtrt wrt</option>
           <option value="opt-2">Option 2</option>
           <option value="opt-3">Option 3</option>
       </select>

        <input name="billingName" placeholder="Credit Card Holder" required  wrapper-class="billing-name" label="Name on credit card" error-msg-required="Your Name is required." />

        <input type="cardnumber" name="cardNumber" wrapper-class="form-group row" label="Credit card number" class="form-control lock-icon" error-msg-required="Please enter your credit card."/>
        <input type="expirydate" name="expiryDate" label="Epiry date" error-msg-invalid="Please try again and insert a valid expiration date."/>
        <input type="cvc" name="cvc" label="CVC (3 or 4 digit code)"/>
        <input type="price" novalidate name="amount"  error-msg-required="The amount to pay is required."/>

       <button type="next">Next Step</button>

    </step>

    <step>
        <div>Hello Final STEP</div>
        <div><fieldvalue name="emailAddress"/></div>
        <div><fieldvalue name="paymentOption"/></div>
        <div><fieldvalue name="billingName"/></div>
        <div><fieldvalue format="cardnumber" name="cardNumber"/></div>
        <div><fieldvalue name="expiryDate"/></div>
        <div><fieldvalue name="cvc"/></div>
        <div><fieldvalue format="price" name="amount"/></div>
        <button type="back">Step Back</button>
        <button type="submit">Submit</button>
    </step>
</form>