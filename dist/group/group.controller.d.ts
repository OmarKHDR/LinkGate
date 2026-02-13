import { GroupService } from './group.service';
import { UrlService } from 'src/url/url.service';
import type { Request } from 'express';
import { UrlMetaDto } from 'src/url/dto/url.data.dto';
import { CreateGroupDto } from './dto/group.create.dto';
import { AcceptRequestsDto } from './dto/accept.requests.dto';
export declare class GroupController {
    private groupService;
    private urlService;
    constructor(groupService: GroupService, urlService: UrlService);
    getUserGroups(req: Request): Promise<{
        name: string;
        id: number;
    }[]>;
    createGroup(req: Request, body: CreateGroupDto): Promise<{
        name: string;
        id: number;
    }>;
    getGroupUrls(req: Request, groupId: number): Promise<UrlMetaDto[]>;
    deleteGroup(req: Request, groupId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    joinGroup(groupId: number, req: any): Promise<void>;
    getPendingRequests(groupId: number): Promise<{
        status: import("@prisma/client").$Enums.MemberStatus;
        role: import("@prisma/client").$Enums.GroupRole;
        member: {
            name: string;
            id: number;
            email: string;
        };
    }[]>;
    acceptRequests(req: Request, groupId: number, acceptDto: AcceptRequestsDto): Promise<{
        message: string;
        acceptedCount: number;
    }>;
}
