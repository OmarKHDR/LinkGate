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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const shortener_1 = require("../utils/shortener");
let UrlService = class UrlService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUserUrls(userId) {
        const urls = await this.prisma.url.findMany({
            where: {
                ownerId: userId,
            },
        });
        return urls;
    }
    async getFullUrl(shortUrl, userId) {
        console.log(userId);
        console.log(shortUrl);
        const fullUrl = await this.prisma.url.findUnique({
            where: {
                shortenedUrl: shortUrl,
                OR: [
                    { access: client_1.UrlAccess.PUBLIC },
                    {
                        access: client_1.UrlAccess.PRIVATE,
                        ownerId: userId ?? -1,
                    },
                    {
                        access: client_1.UrlAccess.GROUP,
                        group: {
                            members: {
                                some: { id: userId ?? -1,
                                    status: client_1.MemberStatus.ACCEPTED,
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                shortenedUrl: true,
                fullUrl: true,
                access: true,
                groupId: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!fullUrl)
            throw new common_1.NotFoundException('url not found or you are not authorized to access it');
        return fullUrl;
    }
    async getGroupUrls(groupId) {
        const urls = await this.prisma.url.findMany({
            where: {
                groupId,
            },
            select: {
                shortenedUrl: true,
                access: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return urls;
    }
    async createShortUrl(url, ownerId) {
        if (url.access === client_1.UrlAccess.GROUP && !url.groupId)
            throw new common_1.BadRequestException('groupId required for COMPANY access');
        let u;
        for (let i = 0; i < 5; i += 1) {
            try {
                u = await this.prisma.url.create({
                    data: {
                        fullUrl: url.fullUrl,
                        shortenedUrl: (0, shortener_1.generateShortId)(i),
                        access: url.access,
                        ownerId,
                        groupId: url.groupId || null,
                    },
                });
                return u;
            }
            catch (e) {
                if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (e.code === 'P2002')
                        continue;
                    else {
                        throw e;
                    }
                }
            }
        }
        throw new common_1.RequestTimeoutException('Failed to generate unique short url');
    }
    async deleteUrl(url) {
        await this.prisma.url.delete({
            where: { ...url },
        });
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UrlService);
//# sourceMappingURL=url.service.js.map