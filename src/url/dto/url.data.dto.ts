import { IsString } from 'class-validator';
import { UrlAccess } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from './fullurl.dto';

export class UrlMetaDto {
  @ApiProperty({ example: 'affeqf' })
  @IsString()
  shortenedUrl: string;

  @ApiProperty({
    description: 'Who can access the url: [PUBLIC, PRIVATE, GROUP]',
    example: 'PUBLIC',
  })
  access: UrlAccess;

  @ApiProperty({ type: OwnerDto })
  owner: OwnerDto;
}
