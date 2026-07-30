import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  Inject,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import { AdminGuard } from '../../common/guards/admin.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import type { DocumentType } from './interfaces/legalitas.repository.interface.js';
import { ILegalitasService } from './interfaces/legalitas.service.interface.js';
import type { UploadFileInfo } from './interfaces/legalitas.service.interface.js';
import { UploadDocumentDto } from './dto/upload-document.dto.js';
import { VerifyDocumentDto } from './dto/verify-document.dto.js';
import { CalculateTaxDto } from './dto/calculate-tax.dto.js';
import { GenerateLetterDto } from './dto/generate-letter.dto.js';
import type { Response } from 'express';

interface MulterFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

function isDocumentType(value: string): value is DocumentType {
  return (
    value === 'NIB' ||
    value === 'NPWP' ||
    value === 'IUMK' ||
    value === 'SERTIFIKAT_HALAL' ||
    value === 'TDP'
  );
}

@Controller('legalitas')
export class LegalitasController {
  constructor(
    @Inject(ILegalitasService)
    private readonly legalitasService: ILegalitasService,
  ) {}

  @Get('guides')
  async getAllGuides() {
    const guides = await this.legalitasService.getAllGuides();
    return { data: guides };
  }

  @Get('guides/:documentType')
  async getGuideByDocumentType(@Param('documentType') documentType: string) {
    if (!isDocumentType(documentType)) {
      throw new NotFoundException('Invalid document type.');
    }

    const guide =
      await this.legalitasService.getGuideByDocumentType(documentType);
    return { data: guide };
  }

  @Get('documents')
  @UseGuards(ClerkAuthGuard)
  async getDocuments(@Req() req: AuthenticatedRequest) {
    const documents = await this.legalitasService.getDocuments(
      req.user.clerkUserId,
    );
    return { data: documents };
  }

  @Post('documents')
  @UseGuards(ClerkAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: MulterFile,
    @Body() dto: UploadDocumentDto,
  ) {
    if (!file) {
      throw new NotFoundException('File is required.');
    }

    const fileInfo: UploadFileInfo = {
      buffer: file.buffer,
      originalName: file.originalname,
      mimeType: file.mimetype,
    };

    const document = await this.legalitasService.uploadDocumentFile(
      req.user.clerkUserId,
      fileInfo,
      dto.documentType,
    );
    return { data: document };
  }

  @Get('admin/documents')
  @UseGuards(ClerkAuthGuard, AdminGuard)
  async adminGetAllDocuments() {
    const documents = await this.legalitasService.getAllDocuments();
    return { data: documents };
  }

  @Post('template-surat')
  @UseGuards(ClerkAuthGuard)
  async generateLetter(
    @Req() req: AuthenticatedRequest,
    @Body() dto: GenerateLetterDto,
    @Res() res: Response,
  ) {
    const result = await this.legalitasService.generateLetter(
      req.user.clerkUserId,
      dto.letterType,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${result.fileName}"`,
    );
    res.end(result.buffer);
  }

  @Post('tax-calculator')
  calculateTax(@Body() dto: CalculateTaxDto) {
    const result = this.legalitasService.calculateTax(dto.omzet);
    return { data: result };
  }

  @Patch('admin/documents/:id/verify')
  @UseGuards(ClerkAuthGuard, AdminGuard)
  async verifyDocument(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: VerifyDocumentDto,
  ) {
    const document = await this.legalitasService.verifyDocument(
      req.user.clerkUserId,
      id,
      dto.status,
      dto.notes,
    );
    return { data: document };
  }
}
