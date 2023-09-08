<?php
namespace XaiForms\Admin;

use XaiForms\Admin\Settings;

class RegisterAdminPages
{

    public function setup(): void
    {
        new Settings();
    }
}