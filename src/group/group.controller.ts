import { Controller, Get, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import type { Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('')
  async getUserGroups(@Req() req: Request) {
    return await this.groupService.getUserGroups(req.user.id);
  }

  @Get('urls')
  async getGroupUrls() {}
}
