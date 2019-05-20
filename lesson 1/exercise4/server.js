const cluster = require('cluster');
const http = require('http');
const process = require('process');
const child_process = require('child_process');

if (cluster.isMaster) {



    // Start workers and listen for messages containing notifyRequest

    for (let i = 0; i < 4; i++) {
        cluster.fork({ workerId: i });
    }



} else {
    // Worker processes have a http server.
    http.createServer((req, res) => {
        const child = child_process.fork('calcsum.js');
        child.send([3, 5]);

        child.on('message', message => {
            //console.log('PARENT got message:', message);
            res.writeHead(200);
            res.end('server response = ' + message);

        });
        process.send({ cmd: 'notifyRequest' });
    }).listen(5001);
}
