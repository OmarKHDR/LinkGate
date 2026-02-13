import { UrlAccess } from '@prisma/client';
export declare class OwnerDto {
    id: number;
    name: string;
}
export declare class UrlFullDataDto {
    id: number;
    groupId: number | null;
    fullUrl: string;
    shortenedUrl: string;
    access: UrlAccess;
    owner: OwnerDto;
}
