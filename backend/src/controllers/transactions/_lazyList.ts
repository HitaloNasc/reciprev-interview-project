import { prismaClient } from '../../database/prismaClient';
import _ from 'lodash';

interface Transactions {
    investmentFundId?: object;
    type?: object;
    transactionDate?: object;
    quotaAmaunt?: object;
    unitPrice?: object;
    amount?: object;
    averagePrice?: object;
    returnOperation?: object;
    balance?: object;
}

export async function _lazyList({
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
    console.log('api - transactions - _lazyList');

    let where: Transactions = {};

    if (investmentFundId) where.investmentFundId = { contains: investmentFundId };
    if (investmentFundId) where.type = { contains: type };
    if (investmentFundId) where.transactionDate = { contains: transactionDate };
    if (investmentFundId) where.quotaAmaunt = { contains: quotaAmaunt };
    if (investmentFundId) where.unitPrice = { contains: unitPrice };
    if (investmentFundId) where.amount = { contains: amount };
    if (investmentFundId) where.averagePrice = { contains: averagePrice };
    if (investmentFundId) where.returnOperation = { contains: returnOperation };
    if (investmentFundId) where.balance = { contains: balance };

    const transactions = await prismaClient.transactions.findMany({ where });

    return transactions;
}
