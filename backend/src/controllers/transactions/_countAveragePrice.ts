import { prismaClient } from '../../database/prismaClient';
import TRANSACTIONS from '../../common/consts/transactions.const';

export async function _countAveragePrice(investmentFundId: string, unitPrice: number, quotaAmaunt: number, type: number) {
    console.log('api - transacntions - _countAveregePrice');
    console.log(`[${investmentFundId}]`);

    const transacntions = await prismaClient.transactions.findMany({ where: { investmentFundId } });

    let averagePrice: number = 0;

    if (transacntions) {
        const operations = transacntions.map((transacntion) => {
            return { type: transacntion.type, quotaAmaunt: transacntion.quotaAmaunt, unitPrice: transacntion.unitPrice };
        });

        const purchaseOperations = operations.filter((operation) => operation.type === TRANSACTIONS.TYPE.PURCHASE);

        if (type === TRANSACTIONS.TYPE.PURCHASE) purchaseOperations.push({ quotaAmaunt, unitPrice, type });

        let averagePurchase = 0;
        purchaseOperations.forEach((operation) => {
            averagePurchase += operation.quotaAmaunt * operation.unitPrice;
        });

        averagePrice = averagePurchase / purchaseOperations.length;
    }

    return averagePrice;
}
