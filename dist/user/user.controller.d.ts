import { UserService } from './user.service';
import type { Request } from 'express';
import { UserCreateDto } from './dto/user.create.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: Request): Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
    } | null>;
    createUser(user: UserCreateDto): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    deleteUser(): Promise<void>;
}
