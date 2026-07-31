import { Module } from '@nestjs/common';
import { PledgeController } from './pledge.controller.js';
import { PledgeService } from './pledge.service.js';
import { PledgeRepository } from './pledge.repository.js';
import { IPledgeRepository } from './interfaces/pledge.repository.interface.js';
import { IPledgeService } from './interfaces/pledge.service.interface.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({
  imports: [NotificationModule],
  controllers: [PledgeController],
  providers: [
    { provide: IPledgeService, useClass: PledgeService },
    { provide: IPledgeRepository, useClass: PledgeRepository },
  ],
  exports: [IPledgeService],
})
export class PledgeModule {}
