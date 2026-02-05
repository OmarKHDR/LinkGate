import { UserService } from 'src/user/user.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Jwt, AccessPayload, RefreshPayload, StringValue } from 'src/shared/types/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    authenticateUser(user: UserAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signUserById(userId: number): Promise<{
        accessToken: string;
    }>;
    signData(payload: AccessPayload | RefreshPayload, expiresIn: StringValue): Promise<string>;
    verifyData(jwt: string): Promise<Jwt>;
}
