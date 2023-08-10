import { createServer} from 'node:http';
import {URL} from 'node:url';
import { say } from 'cowsay';
import { compileFile } from 'pug';

const fn = compileFile('./html.pug');
const port = 3333;

const server = createServer((request, response) => {
    console.log(request.method, request.url, 'HTTP/' + request.httpVersion);

    if (request.method === 'POST') {
        let body = '';

        request.on('data', (data) => {
            body += data;
        });

        request.on('end', () => {
            const requestBody = new URLSearchParams(body);
            const rawText = requestBody.get('text') || 'hi';
            const text = rawText;
            const cow = say({ text });

            response.setHeader('Content-Type', 'text/plain; charset=UTF-8');
            response.end(cow);
        });
    } else {
        const urlObject = new URL(request.url, `http://${request.headers.host}`);
        const rawText = urlObject.searchParams.get('text') || 'hi';
        const text = rawText;
        const cow = say({ text });
        const html = fn({ cow });

        response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        response.end(html);
    }
});

server.listen(port, () => console.log('сервер работает на http://localhost:' + port));
