import type {
  CreateUmkmProfileInput,
  UpdateUmkmProfileInput,
  UmkmProfileResponse,
} from './umkm-profile.repository.interface.js';

export const IUmkmProfileService = Symbol('IUmkmProfileService');

export interface IUmkmProfileService {
  create(
    clerkUserId: string,
    data: CreateUmkmProfileInput,
  ): Promise<UmkmProfileResponse>;
  findByClerkUserId(clerkUserId: string): Promise<UmkmProfileResponse>;
  update(
    clerkUserId: string,
    data: UpdateUmkmProfileInput,
  ): Promise<UmkmProfileResponse>;
}
