import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UrlModule, UserModule, PrismaModule, GroupModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
