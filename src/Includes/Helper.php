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
    public function auto_version( string $path )
    {
        // Check if it is a valid path or not.
        if (! file_exists(XAIFORMS_DIR . $path) ) {
            return false;
        }

        // Retrieving the file modification time.
        return filemtime(XAIFORMS_DIR . $path);
    }

    public function close_custom_html_tags( string $html ) {
        if (!$html) {
            return '';
        }

        $custom_tags = ['fieldvalue', 'email', 'cardnumber', 'cvc', 'expirydate', 'price'];

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

}