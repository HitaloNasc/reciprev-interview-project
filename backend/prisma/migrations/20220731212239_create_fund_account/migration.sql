-- CreateTable
CREATE TABLE `fund_account` (
    `id` VARCHAR(191) NOT NULL,
    `investiment_fund_id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `average_price` DOUBLE NOT NULL,
    `return_operation` DOUBLE NOT NULL,
    `balance` DOUBLE NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fund_account_investiment_fund_id_key`(`investiment_fund_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fund_account` ADD CONSTRAINT `fund_account_investiment_fund_id_fkey` FOREIGN KEY (`investiment_fund_id`) REFERENCES `investment_fund`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
