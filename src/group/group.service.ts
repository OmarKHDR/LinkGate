import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Group, GroupRole, MemberStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/group.create.dto';
import { GroupMemberDto } from './dto/group.member.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(
    groupData: CreateGroupDto & { creatorId: number },
  ): Promise<Group> {
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

  // closed for more privacy for now, a user should only see his own groups
  // async getAllGroups(): Promise<Group[]> {
  //   const groups = await this.prisma.group.findMany({});
  //   return groups;
  // }

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

  async acceptPendingRequests(
    groupId: number,
    userIds: number[],
    adminId: number,
  ) {
    const user = await this.getGroupMembershipContext(groupId, adminId);
    if (user?.role === GroupRole.ADMIN || user?.role === GroupRole.OWNER) {
      return await this.prisma.groupMembers.updateMany({
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
    } else {
      throw new UnauthorizedException('you must be admin to accept users');
    }
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

  async getGroupMembershipContext(
    groupId: number,
    userId: number,
  ): Promise<GroupMemberDto | null> {
    const member = await this.prisma.groupMembers.findUnique({
      where: {
        groupId_memberId: {
          groupId,
          memberId: userId,
        },
      },
      select: {
        role: true,
        status: true,
        member: {
          select: {
            name: true,
            id: true,
            email: true,
          },
        },
      },
    });
    return member;
  }

  async deleteGroup(group: Prisma.GroupWhereUniqueInput) {
    await this.prisma.group.delete({
      where: { ...group },
    });
  }
}
