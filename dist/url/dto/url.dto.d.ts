import { UrlAccess } from '@prisma/client';
export declare class UrlDto {
    id: number;
    groupId: number | null;
    fullUrl: string;
    shortenedUrl: string;
    access: UrlAccess;
    ownerId: number;
}
