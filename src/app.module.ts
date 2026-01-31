import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [CompanyModule, UrlModule, UserModule, PrismaModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
