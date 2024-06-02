"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const customExtractor = (req) => {
    const tokenFromHeader = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (tokenFromHeader) {
        return tokenFromHeader;
    }
    return req.cookies['refreshToken'];
};
//# sourceMappingURL=refreshTokenExtractor.js.map