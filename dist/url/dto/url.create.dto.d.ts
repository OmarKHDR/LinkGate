import { UrlAccess } from '@prisma/client';
export declare class CreateUrlDto {
    fullUrl: string;
    access: UrlAccess;
    groupId?: number;
}
