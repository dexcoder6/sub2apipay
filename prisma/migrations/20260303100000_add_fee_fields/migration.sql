-- AlterTable
ALTER TABLE "orders" ADD COLUMN "pay_amount" DECIMAL(10,2),
ADD COLUMN "fee_rate" DECIMAL(5,2);
