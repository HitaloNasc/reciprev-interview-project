import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { prismaClient } from '../../database/prismaClient';
import INVESTMENTFUND from '../../common/consts/InvestmentFund.const';

export async function deactivate(request: Request, response: Response) {
    const { id } = request.params;

    console.log('api - ivestment-fund - deactivate');
    console.log(`[${id}]`);

    const cInvestmentFund = await prismaClient.investmentFund.findUnique({ where: { id } });

    if (!cInvestmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    if (cInvestmentFund.status === INVESTMENTFUND.STATUS.INACTIVE)
        throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__already_inactive', data: { id } }]);

    const investmentFund = await prismaClient.investmentFund.update({
        where: { id },
        data: {
            status: INVESTMENTFUND.STATUS.INACTIVE,
        },
    });

    return investmentFund;
}
