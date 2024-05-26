"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("./guards/local.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const roles_decorator_1 = require("./roles/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
const azure_ad_guard_1 = require("./guards/azure-ad.guard");
const jwt_1 = require("@nestjs/jwt");
const jwt_decode_1 = require("jwt-decode");
const jwt = require("jsonwebtoken");
let AuthController = class AuthController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    login(req, authDto) {
        return req.user;
    }
    loginRefresh(req) {
        const refreshToken = req.cookies.refreshToken;
        try {
            jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        const decodedToken = (0, jwt_decode_1.jwtDecode)(refreshToken);
        const uniqueName = decodedToken.unique_name;
        let role = 'customer';
        if (decodedToken.iss ===
            'https://sts.windows.net/00968c3f-7e86-471d-b6e2-5811aaae8d59/') {
            role = 'admin';
        }
        const newToken = this.jwtService.sign({
            unique_name: uniqueName,
            iat: Math.floor(Date.now() / 1000),
            role: role,
        }, { expiresIn: '30m' });
        return newToken;
    }
    status(req) {
        return req.user;
    }
    async validateToken(req) {
        let role = 'customer';
        console.log(req.user);
        if (req.user.iss ===
            `https://sts.windows.net/${process.env.MSAL_WEB_TENANT_ID}/`) {
            role = 'admin';
        }
        const newToken = this.jwtService.sign({
            unique_name: req.user.unique_name,
            iat: Math.floor(Date.now() / 1000),
            role: role,
        }, { expiresIn: '30m' });
        return newToken;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, roles_decorator_1.Roles)('*'),
    (0, common_1.UseGuards)(local_guard_1.LocalGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.AuthPayloadDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('refresh'),
    (0, roles_decorator_1.Roles)('*'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginRefresh", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, roles_decorator_1.Roles)('customer', 'admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.Get)('refresh/ms'),
    (0, roles_decorator_1.Roles)('*'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(azure_ad_guard_1.AzureADGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map