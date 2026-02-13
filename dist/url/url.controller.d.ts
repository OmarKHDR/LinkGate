import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/url.create.dto';
import type { Request } from 'express';
import { UrlFullDataDto } from './dto/fullurl.dto';
import { UrlDto } from './dto/url.dto';
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlService);
    getUrls(req: Request): Promise<{
        id: number;
        groupId: number | null;
        fullUrl: string;
        shortenedUrl: string;
        access: import("@prisma/client").$Enums.UrlAccess;
        ownerId: number;
    }[]>;
    getFullUrl(req: Request, param: {
        shortendUrl: string;
    }): Promise<UrlFullDataDto>;
    createUrl(req: Request, body: CreateUrlDto): Promise<UrlDto>;
    deleteUrl(req: Request, shortendUrl: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
