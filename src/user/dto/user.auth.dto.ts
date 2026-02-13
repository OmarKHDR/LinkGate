import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserAuthDto {
  @ApiProperty({ example: 'omar@omar.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'omar' })
  @IsString()
  password: string;
}
