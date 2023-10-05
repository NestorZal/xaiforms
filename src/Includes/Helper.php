<?php
namespace XaiForms\Includes;

class Helper
{

    /**
     *  Auto version based on modification file date for scripts and styles.
     *
     * @param  string $path
     * @return bool|int
     */
    public function auto_version( string $path ): bool|int
    {
        // Check if it is a valid path or not.
        if (! file_exists(XAIFORMS_DIR . $path) ) {
            return false;
        }

        // Retrieving the file modification time.
        return filemtime(XAIFORMS_DIR . $path);
    }

    public function sanitize_value( string $value, string $key = '' ): string
    {
        return match ($key) {
            'email', 'email_address' => sanitize_email($value),
            'description' => sanitize_textarea_field($value),
            default => sanitize_text_field($value),
        };
    }

    public function sanitize_array( array $array ): array
    {
        $sanitized_array = [];
        if (empty($array)) {
            return $sanitized_array;
        }

        foreach ($array as $key => $value) {
            $key = sanitize_key($key);

            if (is_array($value)) {
                $value = $this->sanitize_array($value);
            }
            else {
                $value = $value ? $this->sanitize_value($value, $key) : '';
            }

            $sanitized_array[$key] = $value;
        }

        return $sanitized_array;
    }

    public function enqueue_assets( array $assets ): void
    {
        if (empty($assets)) {
            return;
        }

        foreach ($assets as $asset) {
            $file = $asset['file'] ?? '';
            $deps = $asset['deps'] ?? [];

            if (!$file) {
                continue;
            }

            $handle = basename($file);
            if ( str_contains($handle, ' ') ) {
                $handle = str_replace(' ', '-', $handle);
            }
            $handle = 'xaiforms-' . $handle;

            if ( str_contains($handle, '.css') ) {
                $handle = str_replace('.css', '', $handle);

                if ( !wp_script_is($handle) ) {
                    wp_register_style($handle, XAIFORMS_URL . $file, $deps, $this->auto_version($file));
                    wp_enqueue_style($handle);
                }
            }
            else if ( str_contains($handle, '.js') ) {
                $handle = str_replace('.js', '', $handle);

                if ( !wp_script_is($handle) ) {
                    wp_register_script($handle, XAIFORMS_URL . $file, $deps, $this->auto_version($file), true);
                    wp_enqueue_script($handle);
                }
            }
        }
    }

    public function close_html_tags( $html ): bool|string|null
    {
        if ( !$html ) {
            return null;
        }

        $dom = new \DOMDocument();
        $dom->loadHTML( '<?xml encoding="'.get_bloginfo('charset').'" ?>' . $html, LIBXML_NOERROR );
        return $dom->saveHTML();
    }
}