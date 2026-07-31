export interface UpsertUserData {
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

export interface UserResponse {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: 'UMKM' | 'CONTRIBUTOR' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export const IUsersRepository = Symbol('IUsersRepository');

export interface IUsersRepository {
  findByClerkUserId(clerkUserId: string): Promise<UserResponse | null>;
  findById(id: string): Promise<UserResponse | null>;
  upsert(clerkUserId: string, data: UpsertUserData): Promise<UserResponse>;
}
