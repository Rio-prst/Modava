import { Module } from '@nestjs/common';
import { LegalitasController } from './legalitas.controller.js';
import { LegalitasService } from './legalitas.service.js';
import { LegalitasRepository } from './legalitas.repository.js';
import { ILegalitasRepository } from './interfaces/legalitas.repository.interface.js';
import { ILegalitasService } from './interfaces/legalitas.service.interface.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({
  imports: [NotificationModule],
  controllers: [LegalitasController],
  providers: [
    { provide: ILegalitasService, useClass: LegalitasService },
    { provide: ILegalitasRepository, useClass: LegalitasRepository },
  ],
  exports: [ILegalitasService],
})
export class LegalitasModule {}
