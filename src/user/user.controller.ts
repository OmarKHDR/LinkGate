import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';
import { UserCreateDto } from './dto/user.create.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUser(@Req() req: Request) {
    if (req.user) {
      console.log(req.user);
      return await this.userService.getUser({ id: req.user.sub });
    } else throw new UnauthorizedException();
  }

  @Public()
  @Post('')
  async createUser(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }

  @Delete('')
  async deleteUser() {}
}
