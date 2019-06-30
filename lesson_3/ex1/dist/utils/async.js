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
function asyncRouteHandler(route, then, successStatusCode) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield route(req, res, next);
            if (then)
                then(result, res);
            if (successStatusCode)
                res.status(successStatusCode);
        }
        catch (err) {
            next(err);
        }
    });
}
function wrapAsync(route) {
    return asyncRouteHandler(route);
}
exports.wrapAsync = wrapAsync;
function wrapAsyncAndSend(route, successStatusCode = 200) {
    return asyncRouteHandler(route, (value, res) => res.send(value), successStatusCode);
}
exports.wrapAsyncAndSend = wrapAsyncAndSend;
//# sourceMappingURL=async.js.map