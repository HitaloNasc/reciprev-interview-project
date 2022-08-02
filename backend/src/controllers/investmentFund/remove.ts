import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _delete } from './_delete';

export async function remove(request: Request, response: Response) {
    console.log('api - ivestment-fund - delete');

    const { id } = request.params;

    const investmentFund = await _delete(id);

    if (!investmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    return investmentFund;
}
