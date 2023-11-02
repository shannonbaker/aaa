<!DOCTYPE html>
<html>
<head>
    <title>Font Files</title>
</head>
<body>
    <h1>Font Files</h1>
    <ul>
        <?php
        $directory = 'font_files';

        // Check if the directory exists
        if (is_dir($directory)) {
            // Open a directory handle
            if ($handle = opendir($directory)) {
                // Loop through the directory and list files
                while (false !== ($file = readdir($handle))) {
                    if ($file != "." && $file != "..") {
                        echo "<li><a href='$directory/$file'>$file</a></li>";
                    }
                }
                closedir($handle);
            }
        }
        ?>
    </ul>
</body>
</html>
