import { prismaClient } from '../../database/prismaClient';
import { _fromId } from './_fromId';

interface InvestmentFund {
    name?: string;
    CNPJ?: string;
    status?: number;
    created?: Date;
    updated?: Date;
}

export async function _update(id: string, data: InvestmentFund) {
    console.log('api - ivestment-fund - _update');
    console.log(`[${id}]`);

    const { name, CNPJ, status, created, updated } = data;

    const cInvestmentFund = await _fromId(id);

    const investmentFund = await prismaClient.investmentFund.update({
        where: { id },
        data: {
            name: name || cInvestmentFund?.name,
            CNPJ: CNPJ || cInvestmentFund?.CNPJ,
            status: status || cInvestmentFund?.status,
            created: created || cInvestmentFund?.created,
            updated: updated || cInvestmentFund?.updated,
        },
    });

    return investmentFund;
}
