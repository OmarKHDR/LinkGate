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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const hashing_1 = require("../utils/hashing");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        if (!prisma.user) {
            throw new Error('PrismaService not properly initialized');
        }
    }
    async getUsers(selector) {
        const user = await this.prisma.user.findMany({ where: selector });
        return user;
    }
    async getUser(selector) {
        const user = await this.prisma.user.findUnique({
            where: selector,
        });
        return user;
    }
    async getGroupMembers(groupId) {
        const members = await this.prisma.user.findMany({
            where: {
                groups: {
                    some: {
                        groupId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                groups: {
                    where: { groupId },
                    select: {
                        role: true,
                        status: true,
                    },
                },
            },
        });
        return members;
    }
    async createUser(user) {
        user.password = await (0, hashing_1.hashPassword)(user.password);
        console.log(user.password);
        const createdUser = await this.prisma.user.create({
            data: user,
        });
        const payload = {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        };
        return payload;
    }
    async validateUser(selector, password) {
        const user = await this.getUser(selector);
        if (user !== null) {
            const isCorrectPassword = await (0, hashing_1.verifyPassword)(password, user.password);
            return isCorrectPassword;
        }
        return false;
    }
    async deleteUser(user) {
        return await this.prisma.user.delete({
            where: {
                ...user,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map