import { Module } from '@nestjs/common';
import { FundUsageReportController } from './fund-usage-report.controller.js';
import { FundUsageReportService } from './fund-usage-report.service.js';
import { FundUsageReportRepository } from './fund-usage-report.repository.js';
import { IFundUsageReportRepository } from './interfaces/fund-usage-report.repository.interface.js';
import { IFundUsageReportService } from './interfaces/fund-usage-report.service.interface.js';

@Module({
  controllers: [FundUsageReportController],
  providers: [
    { provide: IFundUsageReportService, useClass: FundUsageReportService },
    {
      provide: IFundUsageReportRepository,
      useClass: FundUsageReportRepository,
    },
  ],
  exports: [IFundUsageReportService],
})
export class FundUsageReportModule {}
