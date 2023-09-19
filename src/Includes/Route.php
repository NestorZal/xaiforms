<?php
namespace XaiForms\Includes;

abstract class Route
{
    abstract public function route(): void;
    abstract public function route_names(): array;

    public function register(): void
    {
        add_action( 'rest_api_init', array( $this, 'route' ) );
    }

    public function get_route( string $route_name ): string|null
    {
        $routes = $this->route_names();
        return $routes[$route_name] ?? null;
    }

    public function get_namespace(): string
    {
        return 'xaiforms/v1';
    }

    public function get_route_path( string $route_name ): ?string
    {
        $route = $this->get_route($route_name);
        return $route ? '/wp-json/' . $this->get_namespace() . $route : '';
    }

    public function get_route_url( string $route_name ): ?string
    {
        return home_url($this->get_route_path($route_name));
    }


}