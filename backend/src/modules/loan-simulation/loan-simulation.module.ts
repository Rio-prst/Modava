import { Module } from '@nestjs/common';
import { LoanSimulationController } from './loan-simulation.controller.js';
import { LoanSimulationService } from './loan-simulation.service.js';
import { LoanSimulationRepository } from './loan-simulation.repository.js';
import { ILoanSimulationRepository } from './interfaces/loan-simulation.repository.interface.js';
import { ILoanSimulationService } from './interfaces/loan-simulation.service.interface.js';

@Module({
  controllers: [LoanSimulationController],
  providers: [
    { provide: ILoanSimulationService, useClass: LoanSimulationService },
    { provide: ILoanSimulationRepository, useClass: LoanSimulationRepository },
  ],
  exports: [ILoanSimulationService],
})
export class LoanSimulationModule {}
