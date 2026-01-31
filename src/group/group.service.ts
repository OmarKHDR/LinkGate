import { Injectable } from '@nestjs/common';
import { Group, GroupRole, MemberStatus } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(groupData: CreateGroupDto): Promise<Group> {
    const group: Group = await this.prisma.group.create({
      data: {
        name: groupData.name,
        members: {
          create: {
            memberId: groupData.creatorId,
            role: GroupRole.OWNER,
            status: MemberStatus.ACCEPTED,
          },
        },
      },
    });
    return group;
  }

  async getAllGroups(): Promise<Group[]> {
    const groups = await this.prisma.group.findMany({});
    return groups;
  }

  async getUserGroups(userId: number): Promise<Group[]> {
    const groups = await this.prisma.group.findMany({
      where: {
        members: {
          some: {
            memberId: userId,
          },
        },
      },
    });
    return groups;
  }

  async getPendingReq(groupId: number) {
    const pendingMembers = await this.prisma.groupMembers.findMany({
      where: {
        groupId,
        status: MemberStatus.PENDING,
      },
      select: {
        role: true,
        status: true,
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return pendingMembers;
  }

  async acceptPendingRequests(groupId: number, userIds: number[]) {
    await this.prisma.groupMembers.updateMany({
      where: {
        groupId,
        memberId: {
          in: userIds,
        },
        status: MemberStatus.PENDING,
      },
      data: {
        status: MemberStatus.ACCEPTED,
      },
    });
  }

  async createJoinRequest(userId: number, groupId: number) {
    await this.prisma.groupMembers.create({
      data: {
        groupId,
        memberId: userId,
        status: MemberStatus.PENDING,
      },
    });
  }
}
