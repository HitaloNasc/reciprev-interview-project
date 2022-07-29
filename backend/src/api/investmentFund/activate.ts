import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { prismaClient } from '../../database/prismaClient';
import INVESTMENTFUND from '../../common/consts/InvestmentFund.const';

export async function activate(request: Request, response: Response) {
    const { id } = request.params;

    console.log('api - ivestment-fund - activate');
    console.log(`[${id}]`);

    const cInvestmentFund = await prismaClient.investmentFund.findUnique({ where: { id } });

    if (!cInvestmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    if (cInvestmentFund.status === INVESTMENTFUND.STATUS.ACTIVE)
        throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__already_active', data: { id } }]);

    const investmentFund = await prismaClient.investmentFund.update({
        where: { id },
        data: {
            status: INVESTMENTFUND.STATUS.ACTIVE,
        },
    });

    return investmentFund;
}
