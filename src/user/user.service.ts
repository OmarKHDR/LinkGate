import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from 'src/generated/prisma/client.js';
import { hashPassword, verifyPassword } from 'src/utils/hashing';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    if (!prisma.user) {
      throw new Error('PrismaService not properly initialized');
    }
  }
  async getUsers(selector: Prisma.UserWhereInput): Promise<User[]> {
    const user: User[] = await this.prisma.user.findMany({ where: selector });
    return user;
  }

  async getUser(selector: Prisma.UserWhereUniqueInput) {
    const user: User | null = await this.prisma.user.findUnique({
      where: selector,
    });
    return user;
  }

  async getGroupMembers(groupId: number) {
    const members = await this.prisma.user.findMany({
      where: {
        groups: {
          some: {
            groupId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        groups: {
          where: { groupId },
          select: {
            role: true,
            status: true,
          },
        },
      },
    });
    return members;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<string | null> {
    user.password = hashPassword(user.password);
    const createdUser: User = await this.prisma.user.create({
      data: user,
    });
    const payload = { sub: createdUser.id, name: createdUser.name };
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }

  async validateUser(
    selector: Prisma.UserWhereUniqueInput,
    password: string,
  ): Promise<boolean> {
    const user: User | null = await this.getUser(selector);
    if (user !== null) {
      const isCorrectPassword = verifyPassword(password, user.password);
      return isCorrectPassword;
    }
    return false;
  }

  async deleteUser(user: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.delete({
      where: {
        ...user,
      },
    });
  }
}
