import { PrismaService } from 'src/prisma/prisma.service';
import { Url, Prisma } from '@prisma/client';
import { UrlFullDataDto } from './dto/fullurl.dto';
import { CreateUrlDto } from './dto/url.create.dto';
import { UrlMetaDto } from './dto/url.data.dto';
export declare class UrlService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUserUrls(userId: number): Promise<Url[]>;
    getFullUrl(shortUrl: string, userId: number): Promise<UrlFullDataDto>;
    getGroupUrls(groupId: number): Promise<UrlMetaDto[]>;
    createShortUrl(url: CreateUrlDto, ownerId: number): Promise<Url>;
    deleteUrl(url: Prisma.UrlWhereUniqueInput): Promise<void>;
}
