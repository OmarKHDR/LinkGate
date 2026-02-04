import { Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class GroupService {
    private prisma;
    constructor(prisma: PrismaService);
    createGroup(groupData: CreateGroupDto): Promise<Group>;
    getUserGroups(userId: number): Promise<Group[]>;
    getPendingReq(groupId: number): Promise<{
        role: import("@prisma/client").$Enums.GroupRole;
        status: import("@prisma/client").$Enums.MemberStatus;
        member: {
            name: string;
            id: number;
            email: string;
        };
    }[]>;
    acceptPendingRequests(groupId: number, userIds: number[]): Promise<void>;
    createJoinRequest(userId: number, groupId: number): Promise<void>;
    getGroupMembershipContext(groupId: number, userId: number): Promise<{
        group: {
            name: string;
        };
        role: import("@prisma/client").$Enums.GroupRole;
        status: import("@prisma/client").$Enums.MemberStatus;
        member: {
            name: string;
        };
    } | null>;
}
