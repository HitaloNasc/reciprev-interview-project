import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _fromCNPJ } from './_fromCNPJ';

export async function fromCNPJ(request: Request, response: Response) {
    console.log('api - ivestment-fund - fromCNPJ');

    const { CNPJ } = request.params;

    const investmentFund = await _fromCNPJ(CNPJ);

    if (!investmentFund) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { CNPJ } }]);

    return investmentFund;
}
