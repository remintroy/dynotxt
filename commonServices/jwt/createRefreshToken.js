"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCreateRefreshToken(jwt, secret, options) {
    if (!options)
        options = {};
    return function createRefreshToken(payload) {
        return jwt.sign(payload, secret, options);
    };
}
exports.default = createCreateRefreshToken;
//# sourceMappingURL=createRefreshToken.js.map