-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "receipt_thumbnail_url" TEXT,
ALTER COLUMN "receipt_url" DROP NOT NULL;
