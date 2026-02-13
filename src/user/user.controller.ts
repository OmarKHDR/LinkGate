import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';
import { UserCreateDto } from './dto/user.create.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserResDto } from './dto/user.response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve the authenticated user' })
  @ApiOkResponse({ type: UserResDto })
  @Get('/')
  async getUser(@Req() req: Request) {
    if (req.user) {
      console.log(req.user);
      const user = await this.userService.getUser({ id: req.user.sub });
      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      };
    } else throw new UnauthorizedException();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: UserResDto })
  @ApiBody({ type: UserCreateDto })
  @Public()
  @Post('')
  async createUser(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: 'Delete the authenticated user' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @Delete('/')
  async deleteUser(@Req() req: Request) {
    if (req.user) {
      try {
        await this.userService.deleteUser({ id: req.user.sub });
        return { success: true, message: 'User deleted successfully' };
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete user');
      }
    } else throw new UnauthorizedException();
  }
}
