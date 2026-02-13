import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/utils/hashing';
import {
  Jwt,
  AccessPayload,
  RefreshPayload,
  StringValue,
} from 'src/shared/types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(user: UserAuthDto) {
    const u = await this.userService.getUser({ email: user.email });
    if (!u) throw new UnauthorizedException('Invalid credentials');
    if (await verifyPassword(user.password, u.password)) {
      const accessPayload = {
        sub: u.id,
        name: u.name,
      };
      const refreshPayload = {
        sub: u.id,
      };
      return {
        accessToken: await this.signAccessToken(accessPayload),
        refreshToken: await this.signRefreshToken(refreshPayload),
      };
    } else throw new UnauthorizedException('Invalid credentials');
  }

  async signUserById(userId: number) {
    const u = await this.userService.getUser({ id: userId });
    if (!u) throw new UnauthorizedException('Invalid credentials');
    const accessPayload = {
      sub: u.id,
      name: u.name,
    };
    return {
      accessToken: await this.signAccessToken(accessPayload),
    };
  }

  async signAccessToken(payload: AccessPayload) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  async signRefreshToken(payload: RefreshPayload) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async signData(
    payload: AccessPayload | RefreshPayload,
    expiresIn: StringValue,
  ) {
    const jwt = await this.jwtService.signAsync(
      { payload },
      {
        expiresIn: expiresIn ?? '15m',
      },
    );
    return jwt;
  }

  async verifyData(jwt: string) {
    return await this.jwtService.verifyAsync<Jwt>(jwt);
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync<Jwt>(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync<Jwt>(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
