-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('UMKM', 'CONTRIBUTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NIB', 'NPWP', 'IUMK', 'SERTIFIKAT_HALAL', 'TDP');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('SUBMITTED', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'FUNDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PLEDGE_NEW', 'TARGET_REACHED', 'CAMPAIGN_ENDED', 'LEGALITAS_VERIFIED', 'LEGALITAS_REJECTED', 'SCORE_UPDATED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "FundUsageStatus" AS ENUM ('PLANNED', 'SPENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'UMKM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UMKMProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT,
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "phoneNumber" TEXT,
    "nibNumber" TEXT,
    "npwpNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UMKMProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalitasGuide" (
    "id" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "steps" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalitasGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalitasDocument" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'SUBMITTED',
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "notes" TEXT,
    "verifiedById" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalitasDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowTransaction" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashFlowTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowMonthlySummary" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalIncome" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalExpense" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "netProfit" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "transactionCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashFlowMonthlySummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditScore" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "cashFlowScore" DOUBLE PRECISION NOT NULL,
    "legalitasScore" DOUBLE PRECISION NOT NULL,
    "platformHistoryScore" DOUBLE PRECISION NOT NULL,
    "tier" TEXT NOT NULL,
    "breakdown" JSONB,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanSimulation" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "tenor" INTEGER NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "monthlyPayment" DECIMAL(15,2) NOT NULL,
    "totalPayment" DECIMAL(15,2) NOT NULL,
    "totalInterest" DECIMAL(15,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanSimulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "umkmProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fundingGoal" DECIMAL(15,2) NOT NULL,
    "amountRaised" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "loanSimulationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignMedia" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" "MediaType" NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundUsageReport" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "status" "FundUsageStatus" NOT NULL DEFAULT 'PLANNED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundUsageReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pledge" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "referenceId" TEXT,
    "referenceType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_name_key" ON "BusinessCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_slug_key" ON "BusinessCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UMKMProfile_userId_key" ON "UMKMProfile"("userId");

-- CreateIndex
CREATE INDEX "UMKMProfile_categoryId_idx" ON "UMKMProfile"("categoryId");

-- CreateIndex
CREATE INDEX "UMKMProfile_city_idx" ON "UMKMProfile"("city");

-- CreateIndex
CREATE INDEX "UMKMProfile_province_idx" ON "UMKMProfile"("province");

-- CreateIndex
CREATE UNIQUE INDEX "LegalitasGuide_documentType_key" ON "LegalitasGuide"("documentType");

-- CreateIndex
CREATE INDEX "LegalitasDocument_umkmProfileId_idx" ON "LegalitasDocument"("umkmProfileId");

-- CreateIndex
CREATE INDEX "LegalitasDocument_status_idx" ON "LegalitasDocument"("status");

-- CreateIndex
CREATE INDEX "LegalitasDocument_verifiedById_idx" ON "LegalitasDocument"("verifiedById");

-- CreateIndex
CREATE UNIQUE INDEX "LegalitasDocument_umkmProfileId_documentType_key" ON "LegalitasDocument"("umkmProfileId", "documentType");

-- CreateIndex
CREATE INDEX "CashFlowTransaction_umkmProfileId_transactionDate_idx" ON "CashFlowTransaction"("umkmProfileId", "transactionDate");

-- CreateIndex
CREATE INDEX "CashFlowTransaction_umkmProfileId_type_idx" ON "CashFlowTransaction"("umkmProfileId", "type");

-- CreateIndex
CREATE INDEX "CashFlowMonthlySummary_umkmProfileId_idx" ON "CashFlowMonthlySummary"("umkmProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CashFlowMonthlySummary_umkmProfileId_month_year_key" ON "CashFlowMonthlySummary"("umkmProfileId", "month", "year");

-- CreateIndex
CREATE INDEX "CreditScore_umkmProfileId_idx" ON "CreditScore"("umkmProfileId");

-- CreateIndex
CREATE INDEX "CreditScore_overallScore_idx" ON "CreditScore"("overallScore");

-- CreateIndex
CREATE INDEX "LoanSimulation_umkmProfileId_idx" ON "LoanSimulation"("umkmProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_loanSimulationId_key" ON "Campaign"("loanSimulationId");

-- CreateIndex
CREATE INDEX "Campaign_umkmProfileId_idx" ON "Campaign"("umkmProfileId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "CampaignMedia_campaignId_idx" ON "CampaignMedia"("campaignId");

-- CreateIndex
CREATE INDEX "FundUsageReport_campaignId_idx" ON "FundUsageReport"("campaignId");

-- CreateIndex
CREATE INDEX "Pledge_campaignId_idx" ON "Pledge"("campaignId");

-- CreateIndex
CREATE INDEX "Pledge_userId_idx" ON "Pledge"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "UMKMProfile" ADD CONSTRAINT "UMKMProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UMKMProfile" ADD CONSTRAINT "UMKMProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BusinessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalitasDocument" ADD CONSTRAINT "LegalitasDocument_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalitasDocument" ADD CONSTRAINT "LegalitasDocument_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlowTransaction" ADD CONSTRAINT "CashFlowTransaction_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlowMonthlySummary" ADD CONSTRAINT "CashFlowMonthlySummary_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditScore" ADD CONSTRAINT "CreditScore_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanSimulation" ADD CONSTRAINT "LoanSimulation_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_umkmProfileId_fkey" FOREIGN KEY ("umkmProfileId") REFERENCES "UMKMProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_loanSimulationId_fkey" FOREIGN KEY ("loanSimulationId") REFERENCES "LoanSimulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignMedia" ADD CONSTRAINT "CampaignMedia_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundUsageReport" ADD CONSTRAINT "FundUsageReport_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pledge" ADD CONSTRAINT "Pledge_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pledge" ADD CONSTRAINT "Pledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
