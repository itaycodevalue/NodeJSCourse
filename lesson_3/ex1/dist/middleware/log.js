"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(req, res, next) {
    // tslint:disable-next-line: no-console
    console.log('Time:', Date.now());
    next();
}
exports.log = log;
//# sourceMappingURL=log.js.map