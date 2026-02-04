import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UrlModule } from 'src/url/url.module';

@Module({
  imports: [PrismaModule, UrlModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
