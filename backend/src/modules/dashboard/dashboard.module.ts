import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';
import { DashboardRepository } from './dashboard.repository.js';
import { IDashboardService } from './interfaces/dashboard.service.interface.js';
import { IDashboardRepository } from './interfaces/dashboard.repository.interface.js';

@Module({
  controllers: [DashboardController],
  providers: [
    { provide: IDashboardService, useClass: DashboardService },
    { provide: IDashboardRepository, useClass: DashboardRepository },
  ],
})
export class DashboardModule {}
