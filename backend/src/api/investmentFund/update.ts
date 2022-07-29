import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { prismaClient } from '../../database/prismaClient';

export async function update(request: Request, response: Response) {
    const { id } = request.params;
    console.log('api - ivestment-fund - update');
    console.log(`[${id}]`);

    const { name, CNPJ, status, created, updated } = request.body;

    const cInvestmentFund = await prismaClient.investmentFund.findUnique({ where: { id } });

    if (!cInvestmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    const investmentFund = await prismaClient.investmentFund.update({
        where: { id },
        data: {
            name: name || cInvestmentFund.name,
            CNPJ: CNPJ || cInvestmentFund.CNPJ,
            status: status || cInvestmentFund.status,
            created: created || cInvestmentFund.created,
            updated: updated || cInvestmentFund.updated,
        },
    });

    return investmentFund;
}
