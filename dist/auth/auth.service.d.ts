import { UserService } from 'src/user/user.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Jwt, JwtPayload } from 'src/shared/types/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    authenticateUser(user: UserAuthDto): Promise<string>;
    signData(payload: JwtPayload): Promise<string>;
    verifyData(jwt: string): Promise<Jwt>;
}
