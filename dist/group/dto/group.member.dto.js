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
exports.GroupMemberDto = exports.MemberDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class MemberDto {
    name;
    id;
    email;
}
exports.MemberDto = MemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Name of the member' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123, description: 'ID of the member' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MemberDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com', description: 'Email of the member' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MemberDto.prototype, "email", void 0);
class GroupMemberDto {
    status;
    role;
    member;
}
exports.GroupMemberDto = GroupMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MemberStatus, example: 'PENDING', description: 'Membership status' }),
    __metadata("design:type", String)
], GroupMemberDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.GroupRole, example: 'ADMIN', description: 'Role within the group' }),
    __metadata("design:type", String)
], GroupMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: MemberDto,
        description: 'Member details'
    }),
    __metadata("design:type", Object)
], GroupMemberDto.prototype, "member", void 0);
//# sourceMappingURL=group.member.dto.js.map