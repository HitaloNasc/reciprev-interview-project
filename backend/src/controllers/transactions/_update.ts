import { prismaClient } from '../../database/prismaClient';
import { _fromId } from './_fromId';

interface Transactions {
    investmentFundId?: string;
    type?: number;
    transactionDate?: string;
    quotaAmaunt?: number;
    unitPrice?: number;
    amount?: number;
    averagePrice?: number;
    returnOperation?: number;
    balance?: number;
    created?: string;
    updated?: string;
}

export async function _update(id: string, data: Transactions) {
    console.log('api - transactions - _update');
    console.log(`[${id}]`);

    const transactions = await prismaClient.transactions.update({
        where: { id },
        data,
        include: { investmentFund: true },
    });

    return transactions;
}
