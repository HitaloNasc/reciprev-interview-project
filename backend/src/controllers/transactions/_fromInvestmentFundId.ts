import { prismaClient } from '../../database/prismaClient';

export async function _fromInvestmentFundId(investmentFundId: string) {
    console.log('api - transactions - _fromInvestmentFundId');
    console.log(`[${investmentFundId}]`);

    const transactions = await prismaClient.transactions.findMany({ where: { investmentFundId } });

    console.log(transactions);

    return transactions;
}
