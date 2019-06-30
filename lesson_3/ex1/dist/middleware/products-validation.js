"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const loadCategories = store_1.store.loadCategories;
function validateProduct(req, res, next) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
        const existing = categories.find(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (!existing) {
            res.sendStatus(500).send({ error: "something went wrong!" });
            return;
        }
        next();
    })
        .catch(next);
}
exports.validateProduct = validateProduct;
//# sourceMappingURL=products-validation.js.map