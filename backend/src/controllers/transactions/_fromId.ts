import { prismaClient } from '../../database/prismaClient';

export async function _fromId(id: string) {
    console.log('api - transactions - _fromId');
    console.log(`[${id}]`);

    const transactions = await prismaClient.transactions.findUnique({ where: { id }, include: { investmentFund: true } });

    return transactions;
}
