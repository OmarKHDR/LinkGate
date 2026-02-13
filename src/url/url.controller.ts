import { Controller, Get, Param, Post, Body, Req, Delete, UnauthorizedException } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/url.create.dto';
import type { Request } from 'express';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UrlFullDataDto } from './dto/fullurl.dto';
import { UrlDto } from './dto/url.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @ApiOperation({ summary: 'Retrieve all URLs for the authenticated user' })
  @ApiOkResponse({ type: UrlDto, isArray: true })
  @Get('')
  async getUrls(@Req() req: Request) {
    return await this.urlService.getAllUserUrls(req.user.sub);
  }

  @ApiOperation({ summary: 'Retrieve full URL from a shortened link' })
  @ApiOkResponse({ type: UrlFullDataDto })
  @ApiParam({
    name: 'shortendUrl',
    required: true,
    description: 'The unique code for the shortened URL',
    type: String,
  })
  @Get('/:shortendUrl')
  @Public()
  async getFullUrl(
    @Req() req: Request,
    @Param() param: { shortendUrl: string },
  ) {
    return await this.urlService.getFullUrl(param.shortendUrl, req.user?.sub);
  }

  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiOkResponse({ type: UrlDto })
  @Post('')
  async createUrl(
    @Req() req: Request,
    @Body() body: CreateUrlDto,
  ): Promise<UrlDto> {
    return await this.urlService.createShortUrl(body, req.user.sub);
  }

  @ApiOperation({ summary: 'Delete a shortened URL' })
  @ApiParam({
    name: 'shortendUrl',
    required: true,
    description: 'The unique code for the shortened URL',
    type: String,
  })
  @ApiOkResponse({ description: 'URL deleted successfully' })
  @Delete('/:shortendUrl')
  async deleteUrl(@Req() req: Request, @Param('shortendUrl') shortendUrl: string ) {
    if (req.user) {
      await this.urlService.deleteUrl({ shortenedUrl: shortendUrl as string });
      return { success: true, message: 'URL deleted successfully' };
    } else throw new UnauthorizedException();
  }
}
