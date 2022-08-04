import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import TRANSACTIONS from '../../common/consts/transactions.const';
import { _fromId } from './_fromId';
import { _update } from './_update';
import { _countAmount } from './_countAmount';
import { _countBalance } from './_countBalance';
import { _countAveragePrice } from './_countAveragePrice';

interface Transactions {
    investmentFundId?: string;
    type?: number;
    transactionDate?: string;
    quotaAmaunt?: number;
    unitPrice?: number;
    amount?: number;
    averagePrice?: number;
    returnOperation?: number;
    balance?: number;
    created?: string;
    updated?: string;
}

export async function update(request: Request, response: Response) {
    console.log('api - transactions - update');

    const { id } = request.params;

    const { investmentFundId, type, transactionDate, quotaAmaunt, unitPrice } = request.body;

    const cTransaction = await _fromId(id);
    if (!cTransaction) throw Errors.NOT_FOUND([{ key: 'investment_fund__does_not_exist', data: { id } }]);

    let cInvestmentFundId = investmentFundId || cTransaction.investmentFundId;
    let cType = type || cTransaction.type;
    let cTransactionDate = transactionDate || cTransaction.transactionDate;
    let cQuotaAmaunt = quotaAmaunt || cTransaction.quotaAmaunt;
    let cUnitPrice = unitPrice || cTransaction.unitPrice;

    if (cQuotaAmaunt && cQuotaAmaunt <= 0) throw Errors.PRECONDITION_FAILED([{ key: 'transactios__quota_amaunt_is_invalid' }]);

    let amount = await _countAmount(cInvestmentFundId);

    if (cType === TRANSACTIONS.TYPE.SALE && amount - cQuotaAmaunt < 0) {
        throw Errors.PRECONDITION_FAILED([{ key: 'transactios__quota_amaunt_is_invalid' }]);
    }

    if (cType === TRANSACTIONS.TYPE.PURCHASE) amount += cQuotaAmaunt;
    if (cType === TRANSACTIONS.TYPE.SALE) amount -= cQuotaAmaunt;

    let averagePrice = await _countAveragePrice(cInvestmentFundId, cUnitPrice, cQuotaAmaunt, cType);

    const returnOperation = cUnitPrice / averagePrice - 1;

    const balance = await _countBalance(cInvestmentFundId, cUnitPrice, cQuotaAmaunt, cType);

    const transaction_data: Transactions = {
        investmentFundId: cInvestmentFundId,
        type: cType,
        transactionDate: cTransactionDate,
        quotaAmaunt: cQuotaAmaunt,
        unitPrice: cUnitPrice,
        amount,
        averagePrice,
        returnOperation,
        balance,
        updated: new Date().toISOString(),
    };

    const transactions = await _update(id, transaction_data);

    return transactions;
}
