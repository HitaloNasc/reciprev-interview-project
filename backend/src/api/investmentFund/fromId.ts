import { Request, Response } from 'express';
import _ from 'lodash';
import { prismaClient } from '../../database/prismaClient';
import { Errors } from '../../common/lib/httpExeption';

export async function fromId(request: Request, response: Response) {
    console.log('api - ivestment-fund - fromId');

    const { id } = request.params;
    console.log(`[${id}]`);

    const investmentFund = await prismaClient.investmentFund.findUnique({ where: { id } });

    if (!investmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    return investmentFund;
}
