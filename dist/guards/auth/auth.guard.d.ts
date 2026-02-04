import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
export declare class AuthGuard implements CanActivate {
    private authService;
    private reflector;
    constructor(authService: AuthService, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
    validateRequest(req: Request): Promise<boolean>;
}
