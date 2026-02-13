import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { UrlAccess } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({ example: 'https://google.com' })
  @IsString()
  fullUrl: string;

  @ApiProperty({
    description: 'Who can access the url: [PUBLIC, PRIVATE, GROUP]',
    example: 'PUBLIC',
  })
  @IsEnum(UrlAccess)
  access: UrlAccess;

  @ApiProperty({ example: 11 })
  @IsOptional()
  @IsNumber()
  groupId?: number;
}
