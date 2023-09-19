<?php
namespace XaiForms\Admin;

use XaiForms\Admin\Settings;
use XaiForms\Admin\PaymentGateways;

class RegisterAdminPages
{

    public function setup(): void
    {
        new Settings();
        new PaymentGateways();
    }
}