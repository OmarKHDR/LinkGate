import { PrismaService } from 'src/prisma/prisma.service';
import { Url } from '@prisma/client';
import { UrlMetaDto, CreateUrlDto, UrlFullDataDto } from './dto/url.dto';
export declare class UrlService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUserUrls(userId: number): Promise<Url[]>;
    getFullUrl(shortUrl: string, userId: number): Promise<UrlFullDataDto>;
    getGroupUrls(groupId: number): Promise<UrlMetaDto[]>;
    createShortUrl(url: CreateUrlDto, ownerId: number): Promise<Url>;
}
