import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: UserAuthDto): Promise<string>;
}
