export interface CreateUmkmProfileInput {
  businessName: string;
  description?: string;
  categoryId?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phoneNumber?: string;
  nibNumber?: string;
  npwpNumber?: string;
}

export interface UpdateUmkmProfileInput {
  businessName?: string;
  description?: string;
  categoryId?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phoneNumber?: string;
  nibNumber?: string;
  npwpNumber?: string;
}

export interface UmkmProfileResponse {
  id: string;
  userId: string;
  businessName: string;
  description: string | null;
  categoryId: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  phoneNumber: string | null;
  nibNumber: string | null;
  npwpNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalUser {
  id: string;
}

export const IUmkmProfileRepository = Symbol('IUmkmProfileRepository');

export interface IUmkmProfileRepository {
  findUserByClerkId(clerkUserId: string): Promise<LocalUser | null>;
  findByUserId(userId: string): Promise<UmkmProfileResponse | null>;
  create(
    userId: string,
    data: CreateUmkmProfileInput,
  ): Promise<UmkmProfileResponse>;
  update(
    userId: string,
    data: UpdateUmkmProfileInput,
  ): Promise<UmkmProfileResponse>;
}
