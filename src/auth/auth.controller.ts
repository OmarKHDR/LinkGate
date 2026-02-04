import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: UserAuthDto) {
    return await this.authService.authenticateUser(body);
  }
}
