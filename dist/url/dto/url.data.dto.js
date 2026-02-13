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
exports.UrlMetaDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const fullurl_dto_1 = require("./fullurl.dto");
class UrlMetaDto {
    shortenedUrl;
    access;
    owner;
}
exports.UrlMetaDto = UrlMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'affeqf' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UrlMetaDto.prototype, "shortenedUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Who can access the url: [PUBLIC, PRIVATE, GROUP]',
        example: 'PUBLIC',
    }),
    __metadata("design:type", String)
], UrlMetaDto.prototype, "access", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: fullurl_dto_1.OwnerDto }),
    __metadata("design:type", fullurl_dto_1.OwnerDto)
], UrlMetaDto.prototype, "owner", void 0);
//# sourceMappingURL=url.data.dto.js.map