const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const rootDirectory = path.join(__dirname, 'font_files');

app.use(express.static(rootDirectory));

app.get('/list', (req, res) => {
    function listPNGFiles(directory, filesList) {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            if (fs.statSync(filePath).isDirectory()) {
                listPNGFiles(filePath, filesList);
            } else if (file.endsWith('.png')) {
                filesList.push(filePath);
            }
        });
    }

    const pngFiles = [];
    listPNGFiles(rootDirectory, pngFiles);
    res.json(pngFiles);
});

// Set cache-control headers to instruct the browser not to cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
