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

    public function close_custom_html_tags( string $html ): array|string|null
    {
        if (!$html) {
            return '';
        }

        $custom_tags = ['fieldvalue', 'email', 'cardnumber', 'cvc', 'expirydate', 'price', 'responsevalue'];

        $patterns = [];
        $replacements =[];

        foreach ($custom_tags as $tag) {
            $patterns[] = '/<\/'.$tag.'(.*?)>/';
            $patterns[] = '/<'.$tag.' (.*?)(\/>|\s>|>)/';

            $replacements[] = '';
            $replacements[] = '<'.$tag.' $1></'.$tag.'>';
        }

        return preg_replace($patterns, $replacements, $html);
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
}