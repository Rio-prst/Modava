import { Module } from '@nestjs/common';
import { UmkmProfileController } from './umkm-profile.controller.js';
import { UmkmProfileService } from './umkm-profile.service.js';
import { UmkmProfileRepository } from './umkm-profile.repository.js';
import { IUmkmProfileRepository } from './interfaces/umkm-profile.repository.interface.js';
import { IUmkmProfileService } from './interfaces/umkm-profile.service.interface.js';

@Module({
  controllers: [UmkmProfileController],
  providers: [
    { provide: IUmkmProfileService, useClass: UmkmProfileService },
    { provide: IUmkmProfileRepository, useClass: UmkmProfileRepository },
  ],
  exports: [IUmkmProfileService],
})
export class UmkmProfileModule {}
