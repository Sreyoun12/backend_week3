// server.js - refactored to Express
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.type('html').send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple Express server (refactored from native http).</p>
            </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
    res.type('html').send(`
        <html>
            <head><title>About</title></head>
            <body>
                <h1>About Us</h1>
                <p>At CADT, we love Node.js and Express!</p>
            </body>
        </html>
    `);
});

app.get('/contact', (req, res) => {
    res.type('html').send(`
        <html>
            <head><title>Contact</title></head>
            <body>
                <h1>You can reach us via this email</h1>
                <p>Email: scdt@cadt.edu.kh</p>
            </body>
        </html>
    `);
});

app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 },
        { id: 3, name: 'Product C', price: 30 }
    ];
    res.json(products);
});

app.get('/projects', (req, res) => {
    res.type('html').send(`
        <html>
            <head><title>Projects</title></head>
            <body>
                <h1>Our Projects</h1>
                <p>Here are some of our awesome projects.</p>
            </body>
        </html>
    `);
});

// 404 handler
app.use((req, res) => {
    res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});