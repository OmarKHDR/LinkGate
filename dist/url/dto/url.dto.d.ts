import { UrlAccess } from '@prisma/client';
export declare class CreateUrlDto {
    fullUrl: string;
    access: UrlAccess;
    groupId?: number;
}
export declare class UrlMetaDto {
    shortenedUrl: string;
    access: UrlAccess;
    owner: {
        name: string;
    };
}
export declare class UrlFullDataDto {
    id: number;
    groupId: number | null;
    fullUrl: string;
    shortenedUrl: string;
    access: UrlAccess;
    ownerId: number;
    owner: {
        name: string;
    };
}
