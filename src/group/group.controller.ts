import {
  Controller,
  Get,
  Req,
  Param,
  ParseIntPipe,
  UnauthorizedException,
  Post,
  Body,
  Delete,
  ConflictException,
  Patch,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UrlService } from 'src/url/url.service';
import type { Request } from 'express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GroupNameDto } from './dto/group.name.dto';
import { UrlMetaDto } from 'src/url/dto/url.data.dto';
import { CreateGroupDto } from './dto/group.create.dto';
import { GroupMemberDto } from './dto/group.member.dto';
import { AcceptRequestsDto } from './dto/accept.requests.dto';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private urlService: UrlService,
  ) {}

  @ApiOperation({ summary: 'Retrieve all groups for the authenticated user' })
  @ApiOkResponse({ type: GroupNameDto, isArray: true })
  @Get('/')
  async getUserGroups(@Req() req: Request) {
    return await this.groupService.getUserGroups(req.user.sub);
  }

  @ApiOperation({ summary: 'Create a new group' })
  @ApiBody({ type: CreateGroupDto })
  @ApiOkResponse({ type: GroupNameDto })
  @Post('/')
  async createGroup(@Req() req: Request, @Body() body: CreateGroupDto) {
    return await this.groupService.createGroup({ ...body, creatorId: req.user.sub });
  }

  @ApiOperation({ summary: 'Retrieve all URLs for a specific group' })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'The ID of the group',
    type: Number,
  })
  @ApiOkResponse({ type: UrlMetaDto, isArray: true })
  @Get('/:groupId/urls')
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

  @ApiOperation({ summary: 'Delete a group' })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'The ID of the group',
    type: Number,
  })
  @ApiOkResponse({ description: 'Group deleted successfully' })
  @Delete('/:groupId')
  async deleteGroup(@Req() req: Request, @Param('groupId', ParseIntPipe) groupId: number) {
    if (req.user) {
      await this.groupService.deleteGroup({ id: groupId });
      return { success: true, message: 'Group deleted successfully' };
    } else throw new UnauthorizedException();
  }

  @ApiOperation({ summary: 'Get pending join requests for a group' })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'The ID of the group',
    type: Number,
  })

  @Post(':groupId/join')
  @ApiOperation({ summary: 'Request to join a specific group' })
  @ApiOkResponse({ description: 'Join request sent successfully' })
  async joinGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    try {
      return await this.groupService.createJoinRequest(userId, groupId);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('You have already requested to join this group.');
      }
      throw error;
    }
  }

  @Get(':groupId/pending')
  @ApiOperation({ summary: 'Get all pending join requests for a group' })
  @ApiOkResponse({ description: 'List of pending members' })
  async getPendingRequests(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.groupService.getPendingReq(groupId);
  }

  @Patch(':groupId/pending/accept')
  @ApiOperation({ summary: 'Accept multiple pending requests' })
  @ApiBody({ type: AcceptRequestsDto })
  @ApiOkResponse({ description: 'Members accepted successfully' })
  async acceptRequests(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() acceptDto: AcceptRequestsDto,
  ) {
    await this.groupService.acceptPendingRequests(groupId, acceptDto.userIds, req.user.sub);
    
    return { 
      message: 'Requests processed', 
      acceptedCount: acceptDto.userIds.length 
    };
  }
}
