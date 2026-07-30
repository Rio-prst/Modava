import { Module } from '@nestjs/common';
import { CashFlowController } from './cash-flow.controller.js';
import { CashFlowService } from './cash-flow.service.js';
import { CashFlowRepository } from './cash-flow.repository.js';
import { ICashFlowRepository } from './interfaces/cash-flow.repository.interface.js';
import { ICashFlowService } from './interfaces/cash-flow.service.interface.js';

@Module({
  controllers: [CashFlowController],
  providers: [
    { provide: ICashFlowService, useClass: CashFlowService },
    { provide: ICashFlowRepository, useClass: CashFlowRepository },
  ],
  exports: [ICashFlowService],
})
export class CashFlowModule {}
