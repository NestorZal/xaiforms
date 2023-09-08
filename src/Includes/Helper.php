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

}