import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _fromId } from './_fromId';

export async function fromId(request: Request, response: Response) {
    console.log('api - ivestment-fund - fromId');

    const { id } = request.params;

    const investmentFund = await _fromId(id);

    if (!investmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    return investmentFund;
}
