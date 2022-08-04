import { prismaClient } from '../../database/prismaClient';
import _ from 'lodash';

interface Transactions {
    investmentFundId?: object;
    type?: object;
    transactionDate?: object | string;
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
    if (type) where.type = { contains: type };
    if (transactionDate) where.transactionDate = { contains: transactionDate };
    if (quotaAmaunt) where.quotaAmaunt = { contains: quotaAmaunt };
    if (unitPrice) where.unitPrice = { contains: unitPrice };
    if (amount) where.amount = { contains: amount };
    if (averagePrice) where.averagePrice = { contains: averagePrice };
    if (returnOperation) where.returnOperation = { contains: returnOperation };
    if (balance) where.balance = { contains: balance };

    console.log({ where, include: { investmentFund: true } });

    const transactions = await prismaClient.transactions.findMany({ where, include: { investmentFund: true } });

    return transactions;
}
