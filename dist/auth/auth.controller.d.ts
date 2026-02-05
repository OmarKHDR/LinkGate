import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/user/dto/user.auth.dto';
import type { Response, Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: UserAuthDto, res: Response): Promise<{
        accessToken: string;
    }>;
    refresh(req: Request): Promise<{
        accessToken: {
            accessToken: string;
        };
    }>;
}
