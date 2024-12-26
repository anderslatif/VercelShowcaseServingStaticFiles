import express from 'express';

const app = express();

// todo: we cannot rely on this to serve static files with Vercel
// app.use(express.static('public'));

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'frontpage', 'frontpage.html'));
});


// We *could* add individual routes for each file in the public directory
// For example: `app.get('/images/it_works.png')`
// But here is a dynamic way to approach it

// Start with the public directory
addStaticRoutes(path.resolve(__dirname, "public"));


function addStaticRoutes(dir, baseUrl = "") {
    // Read everything in the directory
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach((file) => {
        const fullPath = path.join(dir, file.name);
        const routePath = path.join(baseUrl, file.name).replace(/\\/g, "/");

        // If the item is a directory
        if (file.isDirectory()) {
            // Recursively process directories
            addStaticRoutes(fullPath, routePath);
        } else {
            // Otherwise, it is a file. Create a route for the file
            // example: if the file is /public/frontpage/frontpage.css
            // then the route will be /frontpage/frontpage.css
            app.get(`/${routePath}`, (req, res) => {
                res.sendFile(fullPath);
            });
        }
    });
}


const PORT = 8080;
app.listen(8080, () => console.log("Server is running on port", PORT));
