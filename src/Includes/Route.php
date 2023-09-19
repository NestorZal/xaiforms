<?php
namespace XaiForms\Includes;

abstract class Route
{
    protected string $namespace = 'xaiforms/v1';
    abstract function route() : void;
}