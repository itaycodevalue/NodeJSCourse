const httpClient = require('http');

function tenRequests() {
    for (let i = 0; i < 10; i++) {
        const data = httpClient.get('http://localhost:5000');
        console.log(i, data);

    }
}

module.exports = tenRequests;