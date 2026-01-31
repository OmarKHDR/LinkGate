/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { UrlAccess } from 'src/generated/prisma/client';

export class CreateUrlDto {
  @IsString()
  fullUrl: string;

  @IsEnum(UrlAccess)
  access: UrlAccess;

  @IsOptional()
  @IsNumber()
  groupId?: number;
}
