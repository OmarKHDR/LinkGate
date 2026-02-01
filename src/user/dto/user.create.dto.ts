import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
