/*------- built in module of node.js for crete a server--------------*/
const http = require('http');

/*------- http has createServer() method which we can use for creting server -------------*/
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        /*------- fs for use of file system in server--------------*/
        const fs = require('fs');
        let HTML = fs.readFileSync('./index.html');
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(HTML)
    }else if(req.url === '/api/user'){
        res.writeHead(200,{'Content-type':'application/json'});
        const data = JSON.stringify({
            name : 'Prakash',
            cars : ['Scoda','Ford','Oddi']
        })
        res.end(data)
    }else {
        res.writeHead(404);
        res.end()
    }
})
/*------- server is listening for port 8181 for req --------------*/
server.listen(8181,'127.0.0.1');
console.log('server is running');
/*------- run terminal and node server.js for run our server --------------*/

