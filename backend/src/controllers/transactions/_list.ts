import transactionsConst from '../../common/consts/transactions.const';
import { prismaClient } from '../../database/prismaClient';

export async function _list() {
    console.log('api - transactions - _list');

    const transactions = await prismaClient.transactions.findMany({ include: { investmentFund: true } });

    return transactions;
}
