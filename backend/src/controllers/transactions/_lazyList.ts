import { prismaClient } from '../../database/prismaClient';
import _ from 'lodash';

interface Transactions {
    investmentFundId?: string;
    type?: number;
    transactionDate?: Date;
    quotaAmaunt?: number;
    unitPrice?: number;
    created?: string;
    updated?: string;
}

export async function _lazyList({ investmentFundId, type, transactionDate, quotaAmaunt, unitPrice }: Transactions) {
    console.log('api - transactions - _lazyList');

    const by_investmentFundId = investmentFundId && prismaClient.transactions.findMany({ where: { investmentFundId } });
    const by_type = type && prismaClient.transactions.findMany({ where: { type } });
    const by_transactionDate = transactionDate && prismaClient.transactions.findMany({ where: { transactionDate } });
    const by_quotaAmaunt = quotaAmaunt && prismaClient.transactions.findMany({ where: { quotaAmaunt } });
    const by_unitPrice = unitPrice && prismaClient.transactions.findMany({ where: { unitPrice } });

    const fields = [investmentFundId, type, transactionDate, quotaAmaunt, unitPrice];

    const queries = [by_investmentFundId, by_type, by_transactionDate, by_quotaAmaunt, by_unitPrice];

    const query = fields.forEach((field, index) => {
        if (field) return queries[index];
    });

    //@ts-ignore
    const transactions = !_.isEmpty(query) && (await prismaClient.$transaction(query));

    // const transactions = await prismaClient.transactions.findMany({where: {}});

    return transactions;
}
