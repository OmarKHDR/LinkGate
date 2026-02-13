import { GroupRole, MemberStatus } from '@prisma/client';
export declare class MemberDto {
    name: string;
    id: number;
    email: string;
}
export declare class GroupMemberDto {
    status: MemberStatus;
    role: GroupRole;
    member: {
        name: string;
        id: number;
        email: string;
    };
}
