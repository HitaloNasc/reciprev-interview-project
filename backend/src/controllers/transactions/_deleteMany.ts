import { prismaClient } from '../../database/prismaClient';

export async function _deleteMany() {
    console.log('api - transactions - _deleteMany');

    const transactions = await prismaClient.transactions.deleteMany();

    return transactions;
}
