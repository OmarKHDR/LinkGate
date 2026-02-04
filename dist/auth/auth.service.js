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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const hashing_1 = require("../utils/hashing");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async authenticateUser(user) {
        const u = await this.userService.getUser({ email: user.email });
        if (!u)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (await (0, hashing_1.verifyPassword)(user.password, u.password)) {
            const payload = {
                sub: u.id,
                name: u.name,
            };
            return await this.signData(payload);
        }
        else
            throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async signData(payload) {
        const jwt = await this.jwtService.signAsync({ payload });
        return jwt;
    }
    async verifyData(jwt) {
        return await this.jwtService.verifyAsync(jwt);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map