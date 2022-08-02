import { prismaClient } from '../../database/prismaClient';
import TRANSACTIONS from '../../common/consts/transactions.const';

export async function _countBalance(investmentFundId: string, unitPrice: number, quotaAmaunt: number, type: number) {
    console.log('api - transacntions - _countBalance');
    console.log(`[${investmentFundId}]`);

    const transacntions = await prismaClient.transactions.findMany({ where: { investmentFundId } });

    let balance: number = 0;

    if (transacntions) {
        const operations = transacntions.map((transacntion) => {
            return { type: transacntion.type, quotaAmaunt: transacntion.quotaAmaunt, unitPrice: transacntion.unitPrice };
        });

        operations.push({ type, quotaAmaunt, unitPrice });

        operations.forEach((operation) => {
            operation.type === TRANSACTIONS.TYPE.PURCHASE
                ? (balance += operation.quotaAmaunt * operation.unitPrice)
                : (balance -= operation.quotaAmaunt * operation.unitPrice);
        });
    }

    return balance;
}
