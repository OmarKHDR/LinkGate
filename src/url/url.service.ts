import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Url, UrlAccess, Prisma } from 'src/generated/prisma/client';
import { CreateUrlDto } from './dto/creart-url.dto';
import { generateShortId } from 'src/utils/shortener';

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
  async getFullUrl(shortUrl: string, userId: number): Promise<string | null> {
    const fullUrl = await this.prisma.url.findFirst({
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
    });
    if (!fullUrl) return null;
    return fullUrl.fullUrl;
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
    throw new Error('Failed to generate unique short url');
  }
}
