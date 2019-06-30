"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const async_1 = require("../utils/async");
exports.getAll = async_1.wrapAsyncAndSend((req, res) => store_1.store.loadProjects());
//# sourceMappingURL=projects.js.map