import {
  Controller,
  Get,
  Req,
  Param,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UrlService } from 'src/url/url.service';
import type { Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private urlService: UrlService,
  ) {}

  @Get('')
  async getUserGroups(@Req() req: Request) {
    return await this.groupService.getUserGroups(req.user.sub);
  }

  @Get(':groupId/urls')
  async getGroupUrls(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    const user = await this.groupService.getGroupMembershipContext(
      groupId,
      req.user.sub,
    );

    if (!user) throw new UnauthorizedException();
    return await this.urlService.getGroupUrls(groupId);
  }
}
