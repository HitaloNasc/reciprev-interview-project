import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _fromId } from './_fromId';
import { _delete } from './_delete';

export async function remove(request: Request, response: Response) {
    console.log('api - transactions - remove');

    const { id } = request.params;

    const transactions = await _fromId(id);
    if (!transactions) throw Errors.NOT_FOUND([{ key: 'transactions__does_not_exist', data: { id } }]);

    const transaction = await _delete(id);

    return transaction;
}
