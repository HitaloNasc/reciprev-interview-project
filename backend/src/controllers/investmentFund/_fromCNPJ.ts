import { prismaClient } from '../../database/prismaClient';

export async function _fromCNPJ(CNPJ: string) {
    console.log('api - ivestment-fund - _fromCNPJ');
    console.log(`[${CNPJ}]`);

    const investmentFund = await prismaClient.investmentFund.findUnique({ where: { CNPJ } });

    return investmentFund;
}
