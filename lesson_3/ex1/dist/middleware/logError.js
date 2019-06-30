"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logError(error, req, res, next) {
    // tslint:disable-next-line: no-console
    console.log("itay and yarin error");
    next(error);
}
exports.logError = logError;
//# sourceMappingURL=logError.js.map