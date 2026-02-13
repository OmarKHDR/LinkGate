import { Group, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/group.create.dto';
import { GroupMemberDto } from './dto/group.member.dto';
export declare class GroupService {
    private prisma;
    constructor(prisma: PrismaService);
    createGroup(groupData: CreateGroupDto & {
        creatorId: number;
    }): Promise<Group>;
    getUserGroups(userId: number): Promise<Group[]>;
    getPendingReq(groupId: number): Promise<{
        status: import("@prisma/client").$Enums.MemberStatus;
        role: import("@prisma/client").$Enums.GroupRole;
        member: {
            name: string;
            id: number;
            email: string;
        };
    }[]>;
    acceptPendingRequests(groupId: number, userIds: number[], adminId: number): Promise<Prisma.BatchPayload>;
    createJoinRequest(userId: number, groupId: number): Promise<void>;
    getGroupMembershipContext(groupId: number, userId: number): Promise<GroupMemberDto | null>;
    deleteGroup(group: Prisma.GroupWhereUniqueInput): Promise<void>;
}
