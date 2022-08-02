/*
  Warnings:

  - You are about to drop the `fund_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fund_account` DROP FOREIGN KEY `fund_account_investiment_fund_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `average_price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `balance` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `return_operation` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `fund_account`;
