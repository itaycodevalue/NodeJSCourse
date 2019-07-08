"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriesRoutes = __importStar(require("../routes/categories"));
const store_1 = require("../store");
const async_1 = require("../utils/async");
const products_validation_1 = require("../middleware/products-validation");
const loadCategories = store_1.store.loadCategories;
const loadProducts = store_1.store.loadProducts;
const router = express_1.default.Router();
exports.router = router;
router.get('/', categoriesRoutes.getAll);
router.get('/:id/products', products_validation_1.validateGetProducts, async_1.wrapAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
    const id = req.params.id;
    const existing = (yield loadProducts()).filter(p => p.categoryId === id);
    res.send(existing);
})));
// TODO: route handlers should be in a separate module (e.g. src/routes/projects)
router.get('/:id', products_validation_1.validateGet, async_1.wrapAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
    const id = req.params.id;
    const existing = (yield loadCategories()).find(p => p.id === id);
    res.send(existing);
})));
router.post('/', (req, res) => {
    const category = req.body;
    const categories = store_1.store.categories;
    category.id = (categories.length + 1).toString();
    categories.push(category);
    res.status(201).send(category);
});
router.put('/:id', products_validation_1.validatePut, (req, res) => {
    const id = req.params.id;
    const categories = store_1.store.categories;
    const existing = categories.find(p => p.id === id);
    const category = req.body;
    category.id = id;
    Object.assign(existing, category);
    res.send(category);
});
router.delete('/:id', products_validation_1.validateDelete, (req, res) => {
    const categories = store_1.store.categories;
    const id = req.params.id;
    const existingIndex = categories.findIndex(p => p.id === id);
    categories.splice(existingIndex, 1);
    res.sendStatus(204);
});
//# sourceMappingURL=categories.js.map