import type {
  DocumentType,
  DocumentStatus,
  GuideResponse,
  DocumentResponse,
} from './legalitas.repository.interface.js';

export interface CreateDocumentDtoInput {
  documentType: DocumentType;
  fileUrl: string;
  fileName: string;
}

export interface VerifyDocumentDtoInput {
  status: DocumentStatus;
  notes?: string;
}

export interface UploadFileInfo {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

export interface LetterGenerationResult {
  fileName: string;
  buffer: Uint8Array;
}

export interface TaxCalculationResult {
  omzet: number;
  pphFinal: number;
  tarif: string;
}

export const ILegalitasService = Symbol('ILegalitasService');

export interface ILegalitasService {
  getAllGuides(): Promise<GuideResponse[]>;
  getGuideByDocumentType(documentType: DocumentType): Promise<GuideResponse>;
  getDocuments(clerkUserId: string): Promise<DocumentResponse[]>;
  uploadDocument(
    clerkUserId: string,
    data: CreateDocumentDtoInput,
  ): Promise<DocumentResponse>;
  uploadDocumentFile(
    clerkUserId: string,
    file: UploadFileInfo,
    documentType: DocumentType,
  ): Promise<DocumentResponse>;
  getAllDocuments(): Promise<DocumentResponse[]>;
  verifyDocument(
    adminClerkUserId: string,
    documentId: string,
    status: DocumentStatus,
    notes?: string,
  ): Promise<DocumentResponse>;
  calculateTax(omzet: number): TaxCalculationResult;
  generateLetter(
    clerkUserId: string,
    letterType: 'SURAT_KETERANGAN_USAHA',
  ): Promise<LetterGenerationResult>;
}
