<?php
/**
 * Plugin Name:  XaiForms
 * Description:  Plugin help you to create custom forms or payment forms using basic html forms. Includes integration with several Payment Gateways.
 * Version:      1.0.0
 * Author:       Xaifos
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
// Plugin version.
define('XAIFORMS_VERSION', '1.0.0');
// Plugin Folder Path.
define('XAIFORMS_DIR', plugin_dir_path(__FILE__));
// Plugin Folder URL.
define('XAIFORMS_URL', plugin_dir_url(__FILE__));

require_once XAIFORMS_DIR . 'vendor/autoload.php';

if (!class_exists('XaiFormsInit')) {
    class XaiFormsInit
    {
        public function __construct()
        {
            add_action('plugins_loaded', array( new \XaiForms\Includes\Loader(), 'init' ) );
        }
    }
    new XaiFormsInit();
}