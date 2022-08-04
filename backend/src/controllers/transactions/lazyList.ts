import { Request, Response } from 'express';
import { _lazyList } from './_lazyList';

interface Transactions {
    investmentFundId?: object;
    type?: object;
    transactionDate?: object;
    quotaAmaunt?: object;
    unitPrice?: object;
    amount?: object;
    averagePrice?: object;
    returnOperation?: object;
    balance?: object;
}

export async function lazyList(request: Request, response: Response) {
    console.log('api - transactions - lazyList');

    const { investmentFundId, type, transactionDate, quotaAmaunt, unitPrice, amount, averagePrice, returnOperation, balance }: Transactions =
        request.query;

    const transactions = await _lazyList({
        investmentFundId,
        type,
        transactionDate,
        quotaAmaunt,
        unitPrice,
        amount,
        averagePrice,
        returnOperation,
        balance,
    });

    return transactions;
}
