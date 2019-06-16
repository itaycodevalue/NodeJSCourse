"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const controllers_1 = require("./controllers");
const controllers_2 = require("./controllers");
const app = express();
exports.app = app;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
controllers_1.projects(app);
controllers_2.products(app);
//# sourceMappingURL=app.js.map