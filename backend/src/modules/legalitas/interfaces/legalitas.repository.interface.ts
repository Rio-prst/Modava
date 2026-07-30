export type DocumentType = 'NIB' | 'NPWP' | 'IUMK' | 'SERTIFIKAT_HALAL' | 'TDP';
export type DocumentStatus = 'SUBMITTED' | 'VERIFIED' | 'REJECTED';

export interface GuideResponse {
  id: string;
  documentType: DocumentType;
  title: string;
  content: string;
  steps: unknown;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentInput {
  umkmProfileId: string;
  documentType: DocumentType;
  fileUrl: string;
  fileName: string;
}

export interface UpdateDocumentStatusInput {
  status: DocumentStatus;
  verifiedById: string;
  notes?: string;
}

export interface DocumentResponse {
  id: string;
  umkmProfileId: string;
  documentType: DocumentType;
  status: DocumentStatus;
  fileUrl: string;
  fileName: string;
  notes: string | null;
  verifiedById: string | null;
  submittedAt: Date;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalUmkmProfile {
  id: string;
}

export interface LocalUmkmProfileWithUser {
  id: string;
  userId: string;
}

export interface LocalUser {
  id: string;
}

export const ILegalitasRepository = Symbol('ILegalitasRepository');

export interface ILegalitasRepository {
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  findUmkmProfileWithUserId(
    umkmProfileId: string,
  ): Promise<LocalUmkmProfileWithUser | null>;
  findUserByClerkUserId(clerkUserId: string): Promise<LocalUser | null>;
  findGuideByDocumentType(
    documentType: DocumentType,
  ): Promise<GuideResponse | null>;
  findAllGuides(): Promise<GuideResponse[]>;
  findDocumentById(id: string): Promise<DocumentResponse | null>;
  findDocumentByType(
    umkmProfileId: string,
    documentType: DocumentType,
  ): Promise<DocumentResponse | null>;
  findAllDocumentsByUmkmProfileId(
    umkmProfileId: string,
  ): Promise<DocumentResponse[]>;
  findAllDocuments(): Promise<DocumentResponse[]>;
  createDocument(data: CreateDocumentInput): Promise<DocumentResponse>;
  updateDocumentStatus(
    id: string,
    data: UpdateDocumentStatusInput,
  ): Promise<DocumentResponse>;
}
