const http = require('http');

function init() {
    http.createServer((req, res) => {
        sleep(2000);
        res.end("request has ended")
    }).listen(5000)
}

function sleep(ms) { // node.js >= 9.3  blocks event loop
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

module.exports = init;