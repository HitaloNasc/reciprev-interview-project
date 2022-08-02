import { prismaClient } from '../../database/prismaClient';
import Transactions from '../transactions';

const transactions = new Transactions();

export async function _deleteMany() {
    console.log('api - ivestment-fund - _deleteMany');

    await transactions._deleteMany();

    const investmentFunds = await prismaClient.investmentFund.deleteMany();

    return investmentFunds;
}
