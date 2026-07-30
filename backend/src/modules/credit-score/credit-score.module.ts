import { Module } from '@nestjs/common';
import { CreditScoreController } from './credit-score.controller.js';
import { CreditScoreService } from './credit-score.service.js';
import { CreditScoreRepository } from './credit-score.repository.js';
import { ICreditScoreRepository } from './interfaces/credit-score.repository.interface.js';
import { ICreditScoreService } from './interfaces/credit-score.service.interface.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({
  imports: [NotificationModule],
  controllers: [CreditScoreController],
  providers: [
    { provide: ICreditScoreService, useClass: CreditScoreService },
    { provide: ICreditScoreRepository, useClass: CreditScoreRepository },
  ],
  exports: [ICreditScoreService],
})
export class CreditScoreModule {}
