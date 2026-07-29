import type {
  DocumentType,
  GuideResponse,
  DocumentResponse,
} from './legalitas.repository.interface.js';

export interface CreateDocumentDtoInput {
  documentType: DocumentType;
  fileUrl: string;
  fileName: string;
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
}
