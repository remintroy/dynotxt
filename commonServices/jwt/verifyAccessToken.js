"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createVerifyAccessToken({ jwt, secret }) {
    return function verifyAssessToken(token) {
        return jwt.verify(token, secret);
    };
}
exports.default = createVerifyAccessToken;
//# sourceMappingURL=verifyAccessToken.js.map