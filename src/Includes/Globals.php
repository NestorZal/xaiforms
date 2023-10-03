<?php

function fluidpay_endpoint(): void
{
    $route = new \XaiForms\Gateway\FluidPay\FluidPayRoute();
    echo $route->get_route_url('charge_transaction');
}

function fluidpay_nonce_field(): void
{
    $option = new \XaiForms\Gateway\FluidPay\FluidPayOption();
    $option->nonce_field();
}