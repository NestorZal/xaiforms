<?php
namespace XaiForms\Includes;

use XaiForms\Includes\Helper;

abstract class Option
{
    private ?array $options = [];

    abstract public function option_name(): string;
    abstract protected function default_options(): array;

    public function get_option( string $option_key )
    {
        $options = $this->all();
        return $options[$option_key] ?? false;
    }

    public function all(): ?array
    {
        if ( !$this->options ) {
            $options = get_option( $this->option_name() );
            $options = $options ?: [];
            $this->options = array_merge( $this->default_options(), $options );
        }
        return $this->options;
    }

    public function save_option( array $options ): bool
    {
        $helper = new Helper();

        $options = $helper->sanitize_array($options);
        if (empty($options)) {
            return false;
        }

        $current_options = $this->all();
        foreach ($options as $key => $value) {
            if ( array_key_exists( $key, $current_options ) ) {
                $current_options[$key] = $value;
            }
        }
        return update_option( $this->option_name(), $current_options );
    }

    public function save_option_rest_api( \WP_REST_Request $request ): \WP_REST_Response
    {
        $this->save_option($request->get_params());
        return new \WP_REST_Response(['status' => 'success']);
    }

}