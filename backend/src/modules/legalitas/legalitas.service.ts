import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ILegalitasRepository } from './interfaces/legalitas.repository.interface.js';
import type { DocumentType } from './interfaces/legalitas.repository.interface.js';
import { ILegalitasService } from './interfaces/legalitas.service.interface.js';
import type { CreateDocumentDtoInput } from './interfaces/legalitas.service.interface.js';

@Injectable()
export class LegalitasService implements ILegalitasService {
  constructor(
    @Inject(ILegalitasRepository)
    private readonly legalitasRepository: ILegalitasRepository,
  ) {}

  getAllGuides() {
    return this.legalitasRepository.findAllGuides();
  }

  async getGuideByDocumentType(documentType: DocumentType) {
    const guide =
      await this.legalitasRepository.findGuideByDocumentType(documentType);

    if (!guide) {
      throw new NotFoundException('Guide not found for document type.');
    }

    return guide;
  }

  async getDocuments(clerkUserId: string) {
    const profile =
      await this.legalitasRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.legalitasRepository.findAllDocumentsByUmkmProfileId(profile.id);
  }

  async uploadDocument(clerkUserId: string, data: CreateDocumentDtoInput) {
    const profile =
      await this.legalitasRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const existing = await this.legalitasRepository.findDocumentByType(
      profile.id,
      data.documentType,
    );

    if (existing) {
      throw new ConflictException('Document already exists for this type.');
    }

    return this.legalitasRepository.createDocument({
      umkmProfileId: profile.id,
      ...data,
    });
  }
}
