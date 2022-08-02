import { prismaClient } from '../../database/prismaClient';
import _ from 'lodash';
import Transactions from '../transactions';

const transactions = new Transactions();

export async function _delete(id: string) {
    console.log('api - ivestment-fund - _delete');
    console.log(`[${id}]`);

    const transactions_by_id = await transactions._fromInvestmentFundId(id);

    if (transactions_by_id || !_.isEmpty(transactions_by_id)) await transactions._deleteByInvestmentFundId(id);

    const investmentFund = await prismaClient.investmentFund.delete({ where: { id } });

    return investmentFund;
}
