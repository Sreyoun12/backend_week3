// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const submissionsPath = path.join(__dirname, 'submissions.txt');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const name = (formData.get('name') || '').trim();

            if (name === '') {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                return res.end(`
                    <html>
                        <head><title>Invalid Submission</title></head>
                        <body>
                            <h1>Name is required</h1>
                            <p>Please go back and enter your name.</p>
                            <a href="/contact">Try again</a>
                        </body>
                    </html>
                `);
            }

            const submission = {
                name: name,
                submittedAt: new Date().toISOString()
            };
            const submissionJson = `${JSON.stringify(submission)}\n`;

            console.log('Received form data:', submission);

            fs.appendFile(submissionsPath, submissionJson, (err) => {
                if (err) {
                    console.error('Error writing submission:', err);
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    return res.end(`
                        <html>
                            <head><title>Error</title></head>
                            <body>
                                <h1>Error saving submission</h1>
                                <p>Please try again later.</p>
                            </body>
                        </html>
                    `);
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`
                    <html>
                        <head><title>Submission Saved</title></head>
                        <body>
                            <h1>Thank you, ${name}!</h1>
                            <p>Your submission has been saved.</p>
                            <a href="/contact">Submit another name</a>
                        </body>
                    </html>
                `);
            });
        });
        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});