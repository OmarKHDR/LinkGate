import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail } from 'class-validator';

export class UserResDto {
  @ApiProperty({ example: 11 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'omar' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'emal@email.com' })
  @IsEmail()
  email: string;
}
