import { prismaClient } from '../../database/prismaClient';

export async function _create(name: string, CNPJ: string) {
    console.log('api - ivestment-fund - _create');

    const investimentFund_data = {
        name,
        CNPJ,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
    };

    const investmentFund = await prismaClient.investmentFund.create({ data: investimentFund_data });

    return investmentFund;
}
