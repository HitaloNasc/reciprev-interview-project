import { prismaClient } from '../../database/prismaClient';
import TRANSACTIONS from '../../common/consts/transactions.const';

export async function _countAmount(investmentFundId: string) {
    console.log('api - transacntions - _countAmount');
    console.log(`[${investmentFundId}]`);

    const transacntions = await prismaClient.transactions.findMany({ where: { investmentFundId } });

    let amount: number = 0;

    if (transacntions) {
        const operations = transacntions.map((transacntion) => {
            return { type: transacntion.type, quotaAmaunt: transacntion.quotaAmaunt };
        });

        operations.forEach((operation) => {
            operation.type === TRANSACTIONS.TYPE.PURCHASE ? (amount += operation.quotaAmaunt) : (amount -= operation.quotaAmaunt);
        });
    }

    return amount;
}
