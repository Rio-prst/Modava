import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import type { DocumentType } from './interfaces/legalitas.repository.interface.js';
import { ILegalitasService } from './interfaces/legalitas.service.interface.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';

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
  async uploadDocument(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateDocumentDto,
  ) {
    const document = await this.legalitasService.uploadDocument(
      req.user.clerkUserId,
      dto,
    );
    return { data: document };
  }
}
