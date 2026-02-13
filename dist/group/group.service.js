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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupService = class GroupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createGroup(groupData) {
        const group = await this.prisma.group.create({
            data: {
                name: groupData.name,
                members: {
                    create: {
                        memberId: groupData.creatorId,
                        role: client_1.GroupRole.OWNER,
                        status: client_1.MemberStatus.ACCEPTED,
                    },
                },
            },
        });
        return group;
    }
    async getUserGroups(userId) {
        const groups = await this.prisma.group.findMany({
            where: {
                members: {
                    some: {
                        memberId: userId,
                    },
                },
            },
        });
        return groups;
    }
    async getPendingReq(groupId) {
        const pendingMembers = await this.prisma.groupMembers.findMany({
            where: {
                groupId,
                status: client_1.MemberStatus.PENDING,
            },
            select: {
                role: true,
                status: true,
                member: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return pendingMembers;
    }
    async acceptPendingRequests(groupId, userIds, adminId) {
        const user = await this.getGroupMembershipContext(groupId, adminId);
        if (user?.role === client_1.GroupRole.ADMIN || user?.role === client_1.GroupRole.OWNER) {
            return await this.prisma.groupMembers.updateMany({
                where: {
                    groupId,
                    memberId: {
                        in: userIds,
                    },
                    status: client_1.MemberStatus.PENDING,
                },
                data: {
                    status: client_1.MemberStatus.ACCEPTED,
                },
            });
        }
        else {
            throw new common_1.UnauthorizedException("you must be admin to accept users");
        }
    }
    async createJoinRequest(userId, groupId) {
        await this.prisma.groupMembers.create({
            data: {
                groupId,
                memberId: userId,
                status: client_1.MemberStatus.PENDING,
            },
        });
    }
    async getGroupMembershipContext(groupId, userId) {
        const member = await this.prisma.groupMembers.findUnique({
            where: {
                groupId_memberId: {
                    groupId,
                    memberId: userId,
                },
            },
            select: {
                role: true,
                status: true,
                member: {
                    select: {
                        name: true,
                        id: true,
                        email: true,
                    },
                },
            },
        });
        return member;
    }
    async deleteGroup(group) {
        await this.prisma.group.delete({
            where: { ...group },
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map