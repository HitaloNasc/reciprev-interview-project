import { prismaClient } from '../../database/prismaClient';

export async function _list() {
    console.log('api - ivestment-fund - _list');

    const investmentFunds = await prismaClient.investmentFund.findMany();

    return investmentFunds;
}
