import { prismaClient } from '../../database/prismaClient';

export async function _deleteByInvestmentFundId(investmentFundId: string) {
    console.log('api - transactions - _deleteByInvestmentFundId');
    console.log(`[${investmentFundId}]`);

    const transactions = await prismaClient.transactions.deleteMany({ where: { investmentFundId } });

    return transactions;
}
