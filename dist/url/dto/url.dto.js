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
exports.UrlFullDataDto = exports.UrlMetaDto = exports.CreateUrlDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateUrlDto {
    fullUrl;
    access;
    groupId;
}
exports.CreateUrlDto = CreateUrlDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUrlDto.prototype, "fullUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.UrlAccess),
    __metadata("design:type", String)
], CreateUrlDto.prototype, "access", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUrlDto.prototype, "groupId", void 0);
class UrlMetaDto {
    shortenedUrl;
    access;
    owner;
}
exports.UrlMetaDto = UrlMetaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrlMetaDto.prototype, "shortenedUrl", void 0);
class UrlFullDataDto {
    id;
    groupId;
    fullUrl;
    shortenedUrl;
    access;
    ownerId;
    owner;
}
exports.UrlFullDataDto = UrlFullDataDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UrlFullDataDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], UrlFullDataDto.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrlFullDataDto.prototype, "fullUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrlFullDataDto.prototype, "shortenedUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UrlFullDataDto.prototype, "ownerId", void 0);
//# sourceMappingURL=url.dto.js.map