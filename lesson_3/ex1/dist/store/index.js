"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projects_json_1 = __importDefault(require("./projects.json"));
const categories_json_1 = __importDefault(require("./categories.json"));
const products_json_1 = __importDefault(require("./products.json"));
const store = {
    loadProjects: () => Promise.resolve(projects_json_1.default),
    loadCategories: () => Promise.resolve(categories_json_1.default),
    loadProducts: () => Promise.resolve(products_json_1.default),
    categories: categories_json_1.default
};
exports.store = store;
//# sourceMappingURL=index.js.map