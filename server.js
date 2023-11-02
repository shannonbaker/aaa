const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const rootDirectory = path.join(__dirname, 'font_files');

app.use(express.static(rootDirectory));

app.get('/list', (req, res) => {
    // List PNG files recursively and send the list as JSON
    function listPNGFiles(directory) {
        const files = fs.readdirSync(directory);
        const fileList = [];

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.statSync(filePath).isDirectory()) {
                fileList.push(...listPNGFiles(filePath));
            } else if (file.endsWith('.png')) {
                fileList.push(filePath.replace(rootDirectory, ''));
            }
        });

        return fileList;
    }

    const pngFiles = listPNGFiles(rootDirectory);
    res.json(pngFiles);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
