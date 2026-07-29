import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ILegalitasRepository } from './interfaces/legalitas.repository.interface.js';
import type {
  DocumentType,
  DocumentStatus,
} from './interfaces/legalitas.repository.interface.js';
import { ILegalitasService } from './interfaces/legalitas.service.interface.js';
import type {
  CreateDocumentDtoInput,
  UploadFileInfo,
} from './interfaces/legalitas.service.interface.js';
import { INotificationService } from '../notification/interfaces/notification.service.interface.js';
import { SUPABASE_CLIENT } from '../../common/supabase/supabase.module.js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class LegalitasService implements ILegalitasService {
  constructor(
    @Inject(ILegalitasRepository)
    private readonly legalitasRepository: ILegalitasRepository,
    @Inject(INotificationService)
    private readonly notificationService: INotificationService,
    @Inject(SUPABASE_CLIENT)
    private readonly supabase: SupabaseClient,
    private readonly prisma: PrismaService,
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

  async uploadDocumentFile(
    clerkUserId: string,
    file: UploadFileInfo,
    documentType: DocumentType,
  ) {
    const profile =
      await this.legalitasRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const existing = await this.legalitasRepository.findDocumentByType(
      profile.id,
      documentType,
    );

    if (existing) {
      throw new ConflictException('Document already exists for this type.');
    }

    const filePath = `${profile.id}/${documentType}/${Date.now()}_${file.originalName}`;

    const bucketName =
      process.env.SUPABASE_STORAGE_BUCKET ?? 'legalitas-documents';

    const { error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimeType,
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    return this.legalitasRepository.createDocument({
      umkmProfileId: profile.id,
      documentType,
      fileUrl,
      fileName: file.originalName,
    });
  }

  async getAllDocuments() {
    return this.legalitasRepository.findAllDocuments();
  }

  async generateLetter(
    clerkUserId: string,
    letterType: 'SURAT_KETERANGAN_USAHA',
  ) {
    const profile = await this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      include: {
        user: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    if (letterType === 'SURAT_KETERANGAN_USAHA') {
      return this.generateSuratKeteranganUsaha(profile);
    }

    throw new BadRequestException('Unsupported letter type.');
  }

  private async generateSuratKeteranganUsaha(profile: {
    businessName: string;
    description: string | null;
    address: string | null;
    city: string | null;
    province: string | null;
    nibNumber: string | null;
    npwpNumber: string | null;
    user: { name: string | null };
    category: { name: string } | null;
  }) {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin;

    const titleSize = 16;
    const textSize = 11;
    const lineGap = 18;

    const drawText = (
      text: string,
      size: number,
      x: number,
      bold: boolean = false,
    ) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? fontBold : font,
        color: rgb(0, 0, 0),
      });
    };

    const centerText = (text: string, size: number, bold: boolean = false) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      drawText(text, size, (width - textWidth) / 2, bold);
    };

    y -= 20;
    centerText('SURAT KETERANGAN USAHA', titleSize, true);
    y -= lineGap;
    centerText(
      'Nomor: SKU/' + profile.businessName.replace(/\s+/g, '-') + '/2026',
      textSize,
    );
    y -= lineGap * 2;

    const today = new Date();
    const dateStr = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const lines = [
      'Yang bertanda tangan di bawah ini,',
      `Nama Pemilik: ${profile.user.name ?? '-'}`,
      `Nama Usaha: ${profile.businessName}`,
      `Kategori Usaha: ${profile.category?.name ?? '-'}`,
      `Alamat: ${profile.address ?? '-'}, ${profile.city ?? '-'}, ${profile.province ?? '-'}`,
      `NIB: ${profile.nibNumber ?? '-'}`,
      `NPWP: ${profile.npwpNumber ?? '-'}`,
      '',
      'Dengan ini menyatakan bahwa usaha tersebut di atas benar-benar',
      'beroperasi dan dikelola oleh pemilik yang bersangkutan.',
      'Surat keterangan ini dibuat untuk keperluan administratif.',
    ];

    for (const line of lines) {
      if (line === '') {
        y -= lineGap * 0.5;
        continue;
      }
      drawText(line, textSize, margin);
      y -= lineGap;
    }

    y -= lineGap;
    drawText(
      `Dibuat di ${profile.city ?? '________'}, ${dateStr}`,
      textSize,
      margin,
    );
    y -= lineGap * 3;
    drawText('(_________________________)', textSize, width - margin - 150);
    y -= lineGap;
    drawText('Pemilik Usaha', textSize, width - margin - 120);

    const pdfBytes = await pdfDoc.save();
    const fileName = `SKU_${profile.businessName.replace(/\s+/g, '_')}.pdf`;

    return { fileName, buffer: pdfBytes };
  }

  calculateTax(omzet: number) {
    const TAX_RATE = 0.005;
    const pphFinal = omzet * TAX_RATE;

    return { omzet, pphFinal, tarif: '0.5%' };
  }

  async verifyDocument(
    adminClerkUserId: string,
    documentId: string,
    status: DocumentStatus,
    notes?: string,
  ) {
    const admin =
      await this.legalitasRepository.findUserByClerkUserId(adminClerkUserId);

    if (!admin) {
      throw new NotFoundException('Admin user not found.');
    }

    const document =
      await this.legalitasRepository.findDocumentById(documentId);

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    if (document.status !== 'SUBMITTED') {
      throw new ConflictException('Document is not in SUBMITTED status.');
    }

    const updated = await this.legalitasRepository.updateDocumentStatus(
      documentId,
      {
        status,
        verifiedById: admin.id,
        notes,
      },
    );

    if (status === 'VERIFIED' || status === 'REJECTED') {
      const profile = await this.legalitasRepository.findUmkmProfileWithUserId(
        document.umkmProfileId,
      );

      if (profile) {
        const docTypeLabels: Record<string, string> = {
          NIB: 'NIB',
          NPWP: 'NPWP',
          IUMK: 'IUMK',
          SERTIFIKAT_HALAL: 'Sertifikat Halal',
          TDP: 'TDP',
        };

        const docLabel =
          docTypeLabels[document.documentType] ?? document.documentType;

        await this.notificationService.create({
          userId: profile.userId,
          type:
            status === 'VERIFIED' ? 'LEGALITAS_VERIFIED' : 'LEGALITAS_REJECTED',
          title:
            status === 'VERIFIED'
              ? 'Dokumen terverifikasi!'
              : 'Dokumen ditolak',
          message:
            status === 'VERIFIED'
              ? `Dokumen ${docLabel} Anda telah diverifikasi oleh admin.`
              : `Dokumen ${docLabel} Anda ditolak. Catatan: ${document.notes ?? 'Tidak ada keterangan.'}`,
          referenceId: documentId,
          referenceType: 'legalitas',
        });
      }
    }

    return updated;
  }
}
