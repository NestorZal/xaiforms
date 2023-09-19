<?php
namespace XaiForms\Includes;

use XaiForms\Admin\RegisterAdminPages;
use XaiForms\Gateway\FluidPay\FluidPayRoute;

class Loader
{
    public function init(): void
    {
        // Admin pages
        if ( is_admin() ) {
            $admin_pages = new \XaiForms\Admin\RegisterAdminPages();
            $admin_pages->setup();
        }

        // Routes
        $fluidpay_route = new FluidPayRoute();
        $fluidpay_route->register();
    }

}