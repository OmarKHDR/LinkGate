import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() body: UserAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.authenticateUser(body);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @Public()
  @Get('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies?.refresh_token;
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.authService.verifyData(refreshToken);
    console.log(payload);
    const userId = payload.payload.sub;
    if (!userId) throw new UnauthorizedException();

    const accessToken = await this.authService.signUserById(userId);
    return {
      accessToken,
    };
  }
}
