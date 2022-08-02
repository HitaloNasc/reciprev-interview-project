import { Request, Response } from 'express';
import { _list } from './_list';

export async function list(request: Request, response: Response) {
    console.log('api - transactions - list');

    const transactions = await _list();

    return transactions;
}
