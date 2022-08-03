import { prismaClient } from '../../database/prismaClient';

interface Transactions {
    investmentFundId: string;
    type: number;
    transactionDate: Date;
    quotaAmaunt: number;
    unitPrice: number;
    amount?: number;
    averagePrice?: number;
    returnOperation?: number;
    balance?: number;
    created?: Date;
    updated?: Date;
}

export async function _create({
    investmentFundId,
    type,
    transactionDate,
    quotaAmaunt,
    unitPrice,
    amount,
    averagePrice,
    returnOperation,
    balance,
    created,
    updated,
}: Transactions) {
    console.log('api - transacntions - _create');

    const transaction_data: Transactions = {
        investmentFundId,
        type,
        transactionDate,
        quotaAmaunt,
        unitPrice,
        amount,
        averagePrice,
        returnOperation,
        balance,
        created,
        updated,
    };

    const transactions = await prismaClient.transactions.create({ data: transaction_data });

    return transactions;
}
