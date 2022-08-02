import { Request, Response } from 'express';
import _ from 'lodash';
import { Errors } from '../../common/lib/httpExeption';
import { _fromInvestmentFundId } from './_fromInvestmentFundId';

export async function fromInvestmentFundId(request: Request, response: Response) {
    console.log('api - transactions - fromInvestmentFundId');

    const { investmentFundId } = request.params;

    const transactions = await _fromInvestmentFundId(investmentFundId);

    if (!transactions || _.isEmpty(transactions)) throw Errors.NOT_FOUND([{ key: 'transactions__does_not_found', data: { investmentFundId } }]);

    return transactions;
}
