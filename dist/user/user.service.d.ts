import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(selector: Prisma.UserWhereInput): Promise<User[]>;
    getUser(selector: Prisma.UserWhereUniqueInput): Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
    } | null>;
    getGroupMembers(groupId: number): Promise<{
        name: string;
        id: number;
        email: string;
        groups: {
            role: import("@prisma/client").$Enums.GroupRole;
            status: import("@prisma/client").$Enums.MemberStatus;
        }[];
    }[]>;
    createUser(user: Prisma.UserCreateInput): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    validateUser(selector: Prisma.UserWhereUniqueInput, password: string): Promise<boolean>;
    deleteUser(user: Prisma.UserWhereUniqueInput): Promise<{
        name: string;
        id: number;
        email: string;
        password: string;
    }>;
}
