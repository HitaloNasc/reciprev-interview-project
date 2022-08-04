import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _create } from './_create';
import { _fromCNPJ } from './_fromCNPJ';

export async function create(request: Request, response: Response) {
    console.log('api - ivestment-fund - create');

    const { name, CNPJ } = request.body;

    console.log({ name, CNPJ });

    const checkObrigatoriesParams = !name || !CNPJ;
    if (checkObrigatoriesParams) throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__not_has_mandatory_parameters' }]);

    const checkAlreadyExists = await _fromCNPJ(CNPJ);

    if (checkAlreadyExists) throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__already_exist', data: { CNPJ } }]);

    const investmentFund = await _create(name, CNPJ);

    return investmentFund;
}
