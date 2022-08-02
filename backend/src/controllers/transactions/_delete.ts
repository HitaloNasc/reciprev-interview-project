import { prismaClient } from '../../database/prismaClient';
import _ from 'lodash';
import Transactions from '../transactions';

export async function _delete(id: string) {
    console.log('api - transactions - _delete');

    const transacntion = await prismaClient.transactions.delete({ where: { id } });

    return transacntion;
}
