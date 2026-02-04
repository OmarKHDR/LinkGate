import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { UrlAccess } from '@prisma/client';

export class CreateUrlDto {
  @IsString()
  fullUrl: string;

  @IsEnum(UrlAccess)
  access: UrlAccess;

  @IsOptional()
  @IsNumber()
  groupId?: number;
}

export class UrlMetaDto {
  @IsString()
  shortenedUrl: string;
  access: UrlAccess;
  owner: {
    name: string;
  };
}

export class UrlFullDataDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  groupId: number | null;

  @IsString()
  fullUrl: string;

  @IsString()
  shortenedUrl: string;

  access: UrlAccess;

  @IsNumber()
  ownerId: number;

  owner: {
    name: string;
  };
}
