"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCreateAccessToken(jwt, secret, options) {
    if (!options)
        options = {};
    return function createAssessToken(payload) {
        return jwt.sign(payload, secret, options);
    };
}
exports.default = createCreateAccessToken;
//# sourceMappingURL=createAccessToken.js.map