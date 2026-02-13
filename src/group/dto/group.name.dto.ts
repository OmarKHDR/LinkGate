import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupNameDto {
  @ApiProperty({ example: 'omar' })
  @IsString()
  name: string;

  @ApiProperty({ example: 11, description: 'group id' })
  @IsNumber()
  id: number;
}
