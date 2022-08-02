import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _update } from './_update';
import { _fromId } from './_fromId';

export async function update(request: Request, response: Response) {
    console.log('api - ivestment-fund - update');

    const { id } = request.params;

    const { name, CNPJ, status, created, updated } = request.body;

    const cInvestmentFund = await _fromId(id);

    if (!cInvestmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    const investmentFund = await _update(id, { name, CNPJ, status, created, updated });

    return investmentFund;
}
