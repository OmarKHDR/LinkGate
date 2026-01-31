/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('')
  async getUsers(): Promise<Array<string>> {
    return [];
  }

  @Get(':url')
  async getUrl(): Promise<string> {
    return '';
  }
}
