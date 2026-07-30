import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersRepository } from './users.repository.js';
import { IUsersRepository } from './interfaces/users.repository.interface.js';
import { IUsersService } from './interfaces/users.service.interface.js';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: IUsersService, useClass: UsersService },
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
  exports: [IUsersService],
})
export class UsersModule {}
