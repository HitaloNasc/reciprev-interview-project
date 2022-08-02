-- CreateTable
CREATE TABLE `tansactions` (
    `id` VARCHAR(191) NOT NULL,
    `investment_fund_id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `quota_amount` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tansactions` ADD CONSTRAINT `tansactions_investment_fund_id_fkey` FOREIGN KEY (`investment_fund_id`) REFERENCES `investment_fund`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
