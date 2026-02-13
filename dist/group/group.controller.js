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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const url_service_1 = require("../url/url.service");
const swagger_1 = require("@nestjs/swagger");
const group_name_dto_1 = require("./dto/group.name.dto");
const url_data_dto_1 = require("../url/dto/url.data.dto");
const group_create_dto_1 = require("./dto/group.create.dto");
const accept_requests_dto_1 = require("./dto/accept.requests.dto");
let GroupController = class GroupController {
    groupService;
    urlService;
    constructor(groupService, urlService) {
        this.groupService = groupService;
        this.urlService = urlService;
    }
    async getUserGroups(req) {
        return await this.groupService.getUserGroups(req.user.sub);
    }
    async createGroup(req, body) {
        return await this.groupService.createGroup({ ...body, creatorId: req.user.sub });
    }
    async getGroupUrls(req, groupId) {
        const user = await this.groupService.getGroupMembershipContext(groupId, req.user.sub);
        if (!user)
            throw new common_1.UnauthorizedException();
        return await this.urlService.getGroupUrls(groupId);
    }
    async deleteGroup(req, groupId) {
        if (req.user) {
            await this.groupService.deleteGroup({ id: groupId });
            return { success: true, message: 'Group deleted successfully' };
        }
        else
            throw new common_1.UnauthorizedException();
    }
    async joinGroup(groupId, req) {
        const userId = req.user.id;
        try {
            return await this.groupService.createJoinRequest(userId, groupId);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('You have already requested to join this group.');
            }
            throw error;
        }
    }
    async getPendingRequests(groupId) {
        return await this.groupService.getPendingReq(groupId);
    }
    async acceptRequests(req, groupId, acceptDto) {
        await this.groupService.acceptPendingRequests(groupId, acceptDto.userIds, req.user.sub);
        return {
            message: 'Requests processed',
            acceptedCount: acceptDto.userIds.length
        };
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all groups for the authenticated user' }),
    (0, swagger_1.ApiOkResponse)({ type: group_name_dto_1.GroupNameDto, isArray: true }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getUserGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new group' }),
    (0, swagger_1.ApiBody)({ type: group_create_dto_1.CreateGroupDto }),
    (0, swagger_1.ApiOkResponse)({ type: group_name_dto_1.GroupNameDto }),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, group_create_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all URLs for a specific group' }),
    (0, swagger_1.ApiParam)({
        name: 'groupId',
        required: true,
        description: 'The ID of the group',
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({ type: url_data_dto_1.UrlMetaDto, isArray: true }),
    (0, common_1.Get)('/:groupId/urls'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupUrls", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a group' }),
    (0, swagger_1.ApiParam)({
        name: 'groupId',
        required: true,
        description: 'The ID of the group',
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Group deleted successfully' }),
    (0, common_1.Delete)('/:groupId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get pending join requests for a group' }),
    (0, swagger_1.ApiParam)({
        name: 'groupId',
        required: true,
        description: 'The ID of the group',
        type: Number,
    }),
    (0, common_1.Post)(':groupId/join'),
    (0, swagger_1.ApiOperation)({ summary: 'Request to join a specific group' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Join request sent successfully' }),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Get)(':groupId/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending join requests for a group' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of pending members' }),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Patch)(':groupId/pending/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept multiple pending requests' }),
    (0, swagger_1.ApiBody)({ type: accept_requests_dto_1.AcceptRequestsDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Members accepted successfully' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, accept_requests_dto_1.AcceptRequestsDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "acceptRequests", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        url_service_1.UrlService])
], GroupController);
//# sourceMappingURL=group.controller.js.map