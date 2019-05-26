const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {



    // Start workers and listen for messages containing notifyRequest

    for (let i = 0; i < 4; i++) {
        cluster.fork({ workerId: i });
    }



} else {
    // Worker processes have a http server.
    http.createServer((req, res) => {
        console.log('[WORKER ' + process.env.workerId + '] request: ' + req.url);


        sleep(2000);
        res.writeHead(200);
        res.end('hello world\n');

        // Notify master about the request
        process.send({ cmd: 'notifyRequest' });
    }).listen(5001);
}

function sleep(ms) { // node.js >= 9.3  blocks event loop
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}