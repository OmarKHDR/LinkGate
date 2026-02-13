import { UserService } from './user.service';
import type { Request } from 'express';
import { UserCreateDto } from './dto/user.create.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: Request): Promise<{
        id: number | undefined;
        name: string | undefined;
        email: string | undefined;
    }>;
    createUser(user: UserCreateDto): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    deleteUser(req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
