import { IsNumber, IsString, IsOptional } from 'class-validator';
import { UrlAccess } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UrlDto {
  @ApiProperty({ example: 11 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 123 })
  @IsOptional()
  @IsNumber()
  groupId: number | null;

  @ApiProperty({
    description: 'The full string url',
    example: 'https://google.com',
  })
  @IsString()
  fullUrl: string;

  @ApiProperty({ description: 'The shortend url path', example: 'twEGQC' })
  @IsString()
  shortenedUrl: string;

  @ApiProperty({
    description: 'Who can access the url: [PUBLIC, PRIVATE, GROUP]',
    example: 'PUBLIC',
  })
  access: UrlAccess;

  @ApiProperty({ example: 11 })
  ownerId: number;
}
