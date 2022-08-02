/*
  Warnings:

  - You are about to drop the `tansactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tansactions` DROP FOREIGN KEY `tansactions_investment_fund_id_fkey`;

-- DropTable
DROP TABLE `tansactions`;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `investment_fund_id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `quota_amount` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `transactions_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_investment_fund_id_fkey` FOREIGN KEY (`investment_fund_id`) REFERENCES `investment_fund`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
