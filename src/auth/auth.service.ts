import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(user: UserAuthDto) {
    const u = await this.userService.getUser({ email: user.email });
    if (!u) throw new UnauthorizedException('Invalid credentials');
    if (verifyPassword(user.password, u.password)) {
      const payload = {
        sub: u.id,
        name: u.name,
      };
      const jwt = await this.jwtService.signAsync({ payload });
      return jwt;
    } else throw new UnauthorizedException('Invalid credentials');
  }
}
