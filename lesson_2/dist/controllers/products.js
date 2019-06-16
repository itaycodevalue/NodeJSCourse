"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const products = store_1.store.products;
function setup(app) {
    // TODO: route handlers should be in a separate module (e.g. src/routes/projects)
    app.get('/api/products', (req, res) => res.send(products));
    app.get('/api/products/:id', (req, res) => {
        // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
        const id = req.params.id;
        const existing = products.find(p => p.id === id);
        if (isNaN(id)) {
            res.send('the id is not a number').sendStatus(400);
            return;
        }
        if (!existing) {
            // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
            res.sendStatus(404);
            return;
        }
        res.send(existing);
    });
    app.post('/api/products', (req, res) => {
        const product = req.body;
        if (product.name.length < 3) {
            res.sendStatus(409);
            return;
        }
        product.id = (products.length + 1).toString();
        products.push(product);
        res.status(201).send(product);
    });
    app.put('/api/products/:id', (req, res) => {
        const id = req.params.id;
        const existing = products.find(p => p.id === id);
        if (isNaN(id)) {
            res.send('the id is not a number').sendStatus(400);
            return;
        }
        if (!existing) {
            res.sendStatus(404);
            return;
        }
        const product = req.body;
        if (product.name.length < 3) {
            res.sendStatus(409);
            return;
        }
        product.id = id;
        Object.assign(existing, product);
        res.send(product);
    });
    app.delete('/api/products/:id', (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.send('the id is not a number').sendStatus(404);
            return;
        }
        const existingIndex = products.findIndex(p => p.id === id);
        if (existingIndex < 0) {
            res.sendStatus(400);
            return;
        }
        products.splice(existingIndex, 1);
        res.sendStatus(204);
    });
}
exports.default = setup;
//# sourceMappingURL=products.js.map