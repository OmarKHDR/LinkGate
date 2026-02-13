import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { GroupRole, MemberStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the member' })
  @IsString()
  name: string;

  @ApiProperty({ example: 123, description: 'ID of the member' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the member' })
  @IsString()
  email: string;
}

export class GroupMemberDto {
  @ApiProperty({ enum: MemberStatus, example: 'PENDING', description: 'Membership status' })
  status: MemberStatus;

  @ApiProperty({ enum: GroupRole, example: 'ADMIN', description: 'Role within the group' })
  role: GroupRole;

  @ApiProperty({
    type: MemberDto,
    description: 'Member details'
  })
  member: {
    name: string;
    id: number;
    email: string;
  };
}

