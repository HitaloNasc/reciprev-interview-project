import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _fromId } from './_fromId';

export async function fromId(request: Request, response: Response) {
    console.log('api - transactions - fromId');

    const { id } = request.params;

    const transactions = await _fromId(id);

    if (!transactions) throw Errors.NOT_FOUND([{ key: 'transactions__does_not_exist', data: { id } }]);

    return transactions;
}
