import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import TRANSACTIONS from '../../common/consts/transactions.const';
import { _create } from './_create';
import { _countAmount } from './_countAmount';
import { _countAveragePrice } from './_countAveragePrice';
import { _countBalance } from './_countBalance';

interface Transactions {
    investmentFundId: string;
    type: number;
    transactionDate: string;
    quotaAmaunt: number;
    unitPrice: number;
    amount?: number;
    averagePrice?: number;
    returnOperation?: number;
    balance?: number;
    created?: Date;
    updated?: Date;
}

export async function create(request: Request, response: Response) {
    console.log('api - transacntions - create');

    const { investmentFundId, type, transactionDate, quotaAmaunt, unitPrice }: Transactions = request.body;

    // console.log({ investmentFundId, type, transactionDate, quotaAmaunt, unitPrice });

    const obrigatory = ['investmentFundId', 'type', 'transactionDate', 'quotaAmaunt', 'unitPrice'];
    obrigatory.forEach((param) => {
        if (!(param in { investmentFundId, type, transactionDate, quotaAmaunt, unitPrice })) {
            throw Errors.PRECONDITION_FAILED([{ key: `transacntions__${param}_is_a_mandatory_parameters` }]);
        }
    });

    if (quotaAmaunt <= 0) throw Errors.PRECONDITION_FAILED([{ key: 'transactios__quota_amaunt_is_invalid' }]);

    const checkObrigatoriesParams = !investmentFundId || !type || !transactionDate || !quotaAmaunt || !unitPrice;
    if (checkObrigatoriesParams) throw Errors.PRECONDITION_FAILED([{ key: 'transactions__payload_is_invalid' }]);

    let amount = await _countAmount(investmentFundId);

    if (type === TRANSACTIONS.TYPE.SALE && amount - quotaAmaunt < 0) {
        throw Errors.PRECONDITION_FAILED([{ key: 'transactios__quota_amaunt_is_invalid' }]);
    }

    if (type === TRANSACTIONS.TYPE.PURCHASE) amount += quotaAmaunt;
    if (type === TRANSACTIONS.TYPE.SALE) amount -= quotaAmaunt;

    // console.log('amount', amount);

    let averagePrice = await _countAveragePrice(investmentFundId, unitPrice, quotaAmaunt, type);

    // console.log('averagePrice', averagePrice);

    const returnOperation = unitPrice / averagePrice - 1;

    // console.log('returnOperation', returnOperation);

    const balance = await _countBalance(investmentFundId, unitPrice, quotaAmaunt, type);

    // console.log('balance', balance);

    const transaction_data: Transactions = {
        investmentFundId,
        type,
        transactionDate: new Date(transactionDate).toISOString(),
        quotaAmaunt,
        unitPrice,
        amount,
        averagePrice,
        returnOperation,
        balance,
        created: new Date(),
        updated: new Date(),
    };

    const transaction = await _create(transaction_data);

    return transaction;
}
