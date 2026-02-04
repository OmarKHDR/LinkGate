import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/url.dto';
import type { Request } from 'express';
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlService);
    getUrls(req: Request): Promise<{
        id: number;
        groupId: number | null;
        fullUrl: string;
        access: import("@prisma/client").$Enums.UrlAccess;
        shortenedUrl: string;
        ownerId: number;
    }[]>;
    getFullUrl(req: Request, param: {
        shortendUrl: string;
    }): Promise<import("./dto/url.dto").UrlFullDataDto>;
    createUrl(req: Request, body: CreateUrlDto): Promise<{
        id: number;
        groupId: number | null;
        fullUrl: string;
        access: import("@prisma/client").$Enums.UrlAccess;
        shortenedUrl: string;
        ownerId: number;
    }>;
}
