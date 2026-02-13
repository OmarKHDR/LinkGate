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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
const url_create_dto_1 = require("./dto/url.create.dto");
const swagger_1 = require("@nestjs/swagger");
const fullurl_dto_1 = require("./dto/fullurl.dto");
const url_dto_1 = require("./dto/url.dto");
const public_decorator_1 = require("../shared/decorators/public.decorator");
let UrlController = class UrlController {
    urlService;
    constructor(urlService) {
        this.urlService = urlService;
    }
    async getUrls(req) {
        return await this.urlService.getAllUserUrls(req.user.sub);
    }
    async getFullUrl(req, param) {
        return await this.urlService.getFullUrl(param.shortendUrl, req.user?.sub);
    }
    async createUrl(req, body) {
        return await this.urlService.createShortUrl(body, req.user.sub);
    }
    async deleteUrl(req, shortendUrl) {
        if (req.user) {
            await this.urlService.deleteUrl({ shortenedUrl: shortendUrl });
            return { success: true, message: 'URL deleted successfully' };
        }
        else
            throw new common_1.UnauthorizedException();
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all URLs for the authenticated user' }),
    (0, swagger_1.ApiOkResponse)({ type: url_dto_1.UrlDto, isArray: true }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrls", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve full URL from a shortened link' }),
    (0, swagger_1.ApiOkResponse)({ type: fullurl_dto_1.UrlFullDataDto }),
    (0, swagger_1.ApiParam)({
        name: 'shortendUrl',
        required: true,
        description: 'The unique code for the shortened URL',
        type: String,
    }),
    (0, common_1.Get)('/:shortendUrl'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getFullUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shortened URL' }),
    (0, swagger_1.ApiBody)({ type: url_create_dto_1.CreateUrlDto }),
    (0, swagger_1.ApiOkResponse)({ type: url_dto_1.UrlDto }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, url_create_dto_1.CreateUrlDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a shortened URL' }),
    (0, swagger_1.ApiParam)({
        name: 'shortendUrl',
        required: true,
        description: 'The unique code for the shortened URL',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'URL deleted successfully' }),
    (0, common_1.Delete)('/:shortendUrl'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('shortendUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "deleteUrl", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('url'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map