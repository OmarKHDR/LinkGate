import { UrlAccess } from '@prisma/client';
import { OwnerDto } from './fullurl.dto';
export declare class UrlMetaDto {
    shortenedUrl: string;
    access: UrlAccess;
    owner: OwnerDto;
}
