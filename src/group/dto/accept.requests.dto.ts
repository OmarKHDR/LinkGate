import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AcceptRequestsDto {
  @ApiProperty({
    description: 'Array of user IDs to accept into the group',
    example: [1, 5, 12],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}