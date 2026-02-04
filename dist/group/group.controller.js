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
    async getGroupUrls(req, groupId) {
        const user = await this.groupService.getGroupMembershipContext(groupId, req.user.sub);
        if (!user)
            throw new common_1.UnauthorizedException();
        return await this.urlService.getGroupUrls(groupId);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getUserGroups", null);
__decorate([
    (0, common_1.Get)(':groupId/urls'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupUrls", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        url_service_1.UrlService])
], GroupController);
//# sourceMappingURL=group.controller.js.map