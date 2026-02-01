import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/creart-url.dto';
import type { Request } from 'express';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get('')
  async getUrls(@Req() req: Request) {
    return await this.urlService.getAllUserUrls(req.user.id);
  }

  @Get('/:shortendUrl')
  async getFullUrl(
    @Req() req: Request,
    @Param() param: { shortendUrl: string },
  ) {
    return await this.urlService.getFullUrl(param.shortendUrl, req.user.id);
  }

  @Post('')
  async createUrl(@Req() req: Request, @Body() body: CreateUrlDto) {
    return await this.urlService.createShortUrl(body, req.user.id);
  }
}
