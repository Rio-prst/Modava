import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users.repository.interface.js';
import { IUsersService } from './interfaces/users.service.interface.js';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async sync(
    clerkUserId: string,
    email: string,
    name: string | null,
    avatarUrl: string | null,
  ) {
    return this.usersRepository.upsert(clerkUserId, { email, name, avatarUrl });
  }

  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async findByClerkUserId(clerkUserId: string) {
    return this.usersRepository.findByClerkUserId(clerkUserId);
  }
}
