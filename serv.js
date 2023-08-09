import { createServer, request } from 'node:http';
import {URL} from 'node:url';
import { say } from 'cowsay';
import { compileFile } from 'pug';


const
    fn = compileFile('./html.pug'),
    port = 3333,
    server = createServer((request, response) => {
        console.log(request.method, request.url, 'HTTP/' + request.httpVersion);
        const
            urlObject = new URL(request.url, `http://${request.headers.host}`);
        text = urlObject.searchParams.get('text') || 'hi',
            cow = say({ text }),
            html = fn({ cow });
        response.end(html);
    });

server.listen(port, () => console.log('сервер работает на http://localhost:' + port));
