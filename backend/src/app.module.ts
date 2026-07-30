import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SupabaseModule } from './common/supabase/supabase.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { UmkmProfileModule } from './modules/umkm-profile/umkm-profile.module.js';
import { CashFlowModule } from './modules/cash-flow/cash-flow.module.js';
import { CampaignModule } from './modules/campaign/campaign.module.js';
import { PledgeModule } from './modules/pledge/pledge.module.js';
import { LoanSimulationModule } from './modules/loan-simulation/loan-simulation.module.js';
import { FundUsageReportModule } from './modules/fund-usage-report/fund-usage-report.module.js';
import { LegalitasModule } from './modules/legalitas/legalitas.module.js';
import { NotificationModule } from './modules/notification/notification.module.js';
import { CreditScoreModule } from './modules/credit-score/credit-score.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    SupabaseModule,
    UsersModule,
    UmkmProfileModule,
    CashFlowModule,
    CampaignModule,
    PledgeModule,
    LoanSimulationModule,
    FundUsageReportModule,
    LegalitasModule,
    NotificationModule,
    CreditScoreModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
