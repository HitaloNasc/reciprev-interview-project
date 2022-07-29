import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import INVESTMENTFUND from '../../common/consts/InvestmentFund.const';

export async function list(request: Request, response: Response) {
    console.log('api - ivestment-fund - list');

    const investmentFunds = await prismaClient.investmentFund.findMany({ where: { status: INVESTMENTFUND.STATUS.ACTIVE } });

    return investmentFunds;
}
