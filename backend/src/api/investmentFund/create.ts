import { Request, Response } from 'express';
import _ from 'lodash';
import { Errors } from '../../common/lib/httpExeption';
import { prismaClient } from '../../database/prismaClient';

export async function create(request: Request, response: Response) {
    console.log('api - ivestment-fund - create');

    const { name, CNPJ } = request.body;

    if (_.isEmpty(name) || _.isNull(name) || _.isEmpty(CNPJ) || _.isNull(CNPJ))
        throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__not_has_mandatory_parameters' }]);

    // {REFACTORY} CNPJ DEVE SER VÁLIDO

    const cInvestmentFund = await prismaClient.investmentFund.findUnique({ where: { CNPJ } });

    if (cInvestmentFund) throw Errors.PRECONDITION_FAILED([{ key: 'investment_fund__already_exist', data: { CNPJ } }]);

    const investmentFund = await prismaClient.investmentFund.create({ data: { name, CNPJ } });

    return investmentFund;
}
