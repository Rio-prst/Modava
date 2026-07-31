import type { UserResponse } from './users.repository.interface.js';

export const IUsersService = Symbol('IUsersService');

export interface IUsersService {
  sync(
    clerkUserId: string,
    email: string,
    name: string | null,
    avatarUrl: string | null,
  ): Promise<UserResponse>;
  findById(id: string): Promise<UserResponse | null>;
  findByClerkUserId(clerkUserId: string): Promise<UserResponse | null>;
}
