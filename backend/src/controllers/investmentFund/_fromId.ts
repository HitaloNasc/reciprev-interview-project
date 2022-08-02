import { prismaClient } from '../../database/prismaClient';

export async function _fromId(id: string) {
    console.log('api - ivestment-fund - _fromId');
    console.log(`[${id}]`);

    const investmentFund = await prismaClient.investmentFund.findUnique({ where: { id } });

    return investmentFund;
}
