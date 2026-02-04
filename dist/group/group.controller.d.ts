import { GroupService } from './group.service';
import { UrlService } from 'src/url/url.service';
import type { Request } from 'express';
export declare class GroupController {
    private groupService;
    private urlService;
    constructor(groupService: GroupService, urlService: UrlService);
    getUserGroups(req: Request): Promise<{
        name: string;
        id: number;
    }[]>;
    getGroupUrls(req: Request, groupId: number): Promise<import("../url/dto/url.dto").UrlMetaDto[]>;
}
