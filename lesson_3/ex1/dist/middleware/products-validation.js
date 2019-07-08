"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const loadCategories = store_1.store.loadCategories;
const loadProducts = store_1.store.loadProducts;
function validatePut(req, res, next) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
        const existing = categories.find(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (!existing) {
            res.sendStatus(500).send({ error: "put went wrong!" });
            return;
        }
        next();
    })
        .catch(next);
}
exports.validatePut = validatePut;
function validateDelete(req, res, next) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
        const existingIndex = categories.findIndex(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (existingIndex < 0) {
            res.sendStatus(500).send({ error: "delete went wrong!" });
            return;
        }
        next();
    })
        .catch(next);
}
exports.validateDelete = validateDelete;
function validateGet(req, res, next) {
    const id = req.params.id;
    loadCategories()
        .then(categories => {
        const existing = categories.find(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(404);
            return;
        }
        if (!existing) {
            res.sendStatus(400).send({ error: "get went wrong!" });
            return;
        }
        next();
    })
        .catch(next);
}
exports.validateGet = validateGet;
function validateGetProducts(req, res, next) {
    const id = req.params.id;
    loadCategories()
        .then((categories) => __awaiter(this, void 0, void 0, function* () {
        const existing = (yield loadProducts()).filter(p => p.categoryId === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (!existing) {
            res.sendStatus(404).send({ error: "get products went wrong!" });
            return;
        }
        next();
    }))
        .catch(next);
}
exports.validateGetProducts = validateGetProducts;
//# sourceMappingURL=products-validation.js.map