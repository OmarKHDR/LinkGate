import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Url, UrlAccess, Prisma } from '@prisma/client';
import { generateShortId } from 'src/utils/shortener';
import { UrlMetaDto, CreateUrlDto, UrlFullDataDto } from './dto/url.dto';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async getAllUserUrls(userId: number): Promise<Url[]> {
    const urls: Url[] = await this.prisma.url.findMany({
      where: {
        ownerId: userId,
      },
    });
    return urls;
  }

  async getFullUrl(shortUrl: string, userId: number): Promise<UrlFullDataDto> {
    const fullUrl = await this.prisma.url.findUnique({
      where: {
        shortenedUrl: shortUrl,
        OR: [
          { access: UrlAccess.PUBLIC },
          {
            access: UrlAccess.PRIVATE,
            ownerId: userId,
          },
          {
            access: UrlAccess.GROUP,
            group: {
              members: {
                some: { id: userId },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        shortenedUrl: true,
        fullUrl: true,
        access: true,
        ownerId: true,
        groupId: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!fullUrl) throw new NotFoundException('url not found');
    return fullUrl;
  }

  async getGroupUrls(groupId: number) {
    const urls: UrlMetaDto[] = await this.prisma.url.findMany({
      where: {
        groupId,
      },
      select: {
        shortenedUrl: true,
        access: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
    return urls;
  }

  async createShortUrl(url: CreateUrlDto, ownerId: number): Promise<Url> {
    if (url.access === UrlAccess.GROUP && !url.groupId)
      throw new BadRequestException('groupId required for COMPANY access');
    let u: Url;
    for (let i = 0; i < 5; i += 1) {
      try {
        u = await this.prisma.url.create({
          data: {
            fullUrl: url.fullUrl,
            shortenedUrl: generateShortId(i),
            access: url.access,
            ownerId,
            groupId: url.groupId || null,
          },
        });
        return u;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') continue;
          else {
            throw e;
          }
        }
      }
    }
    throw new RequestTimeoutException('Failed to generate unique short url');
  }
}
