"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createVerifyRefreshToken({ jwt, secret }) {
    return function verifyRefreshToken(token) {
        return jwt.verify(token, secret);
    };
}
exports.default = createVerifyRefreshToken;
//# sourceMappingURL=verifyRefreshToken.js.map