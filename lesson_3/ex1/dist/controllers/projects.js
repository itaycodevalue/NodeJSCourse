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
const projectsRoutes = __importStar(require("../routes/projects"));
const store_1 = require("../store");
const async_1 = require("../utils/async");
const loadProjects = store_1.store.loadProjects;
const router = express_1.default.Router();
exports.router = router;
router.get('/', projectsRoutes.getAll);
// TODO: route handlers should be in a separate module (e.g. src/routes/projects)
router.get('/:id', async_1.wrapAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
    const id = req.params.id;
    const existing = (yield loadProjects()).find(p => p.id === id);
    if (!existing) {
        // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
        res.sendStatus(404);
        return;
    }
    res.send(existing);
})));
//# sourceMappingURL=projects.js.map