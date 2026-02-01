import { Controller, Get, Post, Body, Req, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';
import { UserCreateDto } from './dto/user.create.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUser(@Req() req: Request) {
    return await this.userService.getUser({ id: req.user.id });
  }

  @Post('')
  async createUser(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }

  @Delete('')
  async deleteUser() {}
}
