import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserCreateDto {
  @ApiProperty({ example: 'omar' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'omar@omar.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'this_is_strong_password' })
  @IsString()
  password: string;
}
