<?php
namespace XaiForms\Admin;

use XaiForms\Includes\Helper;

abstract class AdminPage
{
    protected string $parent_slug = 'xaiforms-settings';
    protected string $title = '';
    protected string $capability = 'manage_options';
    protected string $slug = '';
    protected string $icon_url = '';
    protected ?int $position = null;

    protected array $assets = [];

    public function __construct() {
        if ( ! is_user_logged_in() ) {
            wp_redirect( wp_login_url() );
            exit;
        }

        if ( ! current_user_can( $this->capability ) ) {
            wp_die( 'Access denied.', 400 );
        }
    }

    protected function set( $property, $value ): void
    {
        if (property_exists($this, $property) ) {
            $this->{$property} = $value;
        }
    }

    protected function get( $property )
    {
        return property_exists($this, $property) ? $this->{$property} : null;
    }

    protected function set_all( $data ): void
    {
        if (is_array($data)) {
            foreach ( $data as $key => $val ) {
                $this->set($key, $val);
            }
        }
    }

    abstract public function render();

    public function add_admin_page(): void
    {
        if (!$this->title || !$this->slug ) {
            return;
        }

        if ( !empty($this->parent_slug) ) {
            add_submenu_page(
                $this->parent_slug,
                $this->title,
                $this->title,
                $this->capability,
                $this->slug,
                array($this, 'render'),
                $this->position
            );
        }
        else {
            add_menu_page(
                $this->title,
                $this->title,
                $this->capability,
                $this->slug,
                array($this, 'render'),
                $this->icon_url,
                $this->position
            );
        }
    }

    public function register(): void
    {
        add_action('admin_menu', array($this, 'add_admin_page'));
        add_action('admin_enqueue_scripts', array($this, 'register_assets'));
    }

    public function register_assets(): void
    {
        $helper = new Helper();
        $helper->enqueue_assets( $this->assets );
    }
}