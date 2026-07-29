import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { UmkmProfileModule } from './modules/umkm-profile/umkm-profile.module.js';
import { CashFlowModule } from './modules/cash-flow/cash-flow.module.js';
import { CampaignModule } from './modules/campaign/campaign.module.js';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    UmkmProfileModule,
    CashFlowModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
