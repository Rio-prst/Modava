import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  DocumentType,
  CreateDocumentInput,
  UpdateDocumentStatusInput,
  ILegalitasRepository,
} from './interfaces/legalitas.repository.interface.js';

@Injectable()
export class LegalitasRepository implements ILegalitasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true },
    });
  }

  findUmkmProfileWithUserId(umkmProfileId: string) {
    return this.prisma.uMKMProfile.findUnique({
      where: { id: umkmProfileId },
      select: { id: true, userId: true },
    });
  }

  findUserByClerkUserId(clerkUserId: string) {
    return this.prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });
  }

  findAllGuides() {
    return this.prisma.legalitasGuide.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findGuideByDocumentType(documentType: DocumentType) {
    return this.prisma.legalitasGuide.findUnique({
      where: { documentType },
    });
  }

  findDocumentById(id: string) {
    return this.prisma.legalitasDocument.findUnique({
      where: { id },
    });
  }

  findDocumentByType(umkmProfileId: string, documentType: DocumentType) {
    return this.prisma.legalitasDocument.findUnique({
      where: { umkmProfileId_documentType: { umkmProfileId, documentType } },
    });
  }

  findAllDocumentsByUmkmProfileId(umkmProfileId: string) {
    return this.prisma.legalitasDocument.findMany({
      where: { umkmProfileId },
      orderBy: { submittedAt: 'desc' },
    });
  }

  findAllDocuments() {
    return this.prisma.legalitasDocument.findMany({
      orderBy: { submittedAt: 'desc' },
    });
  }

  createDocument(data: CreateDocumentInput) {
    return this.prisma.legalitasDocument.create({ data });
  }

  updateDocumentStatus(id: string, data: UpdateDocumentStatusInput) {
    return this.prisma.legalitasDocument.update({
      where: { id },
      data: {
        status: data.status,
        verifiedById: data.verifiedById,
        notes: data.notes ?? null,
        verifiedAt: new Date(),
      },
    });
  }
}
