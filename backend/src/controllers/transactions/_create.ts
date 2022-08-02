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
    created?: string;
    updated?: string;
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
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
    };

    const transactions = await prismaClient.transactions.create({ data: transaction_data });

    return transactions;
}
