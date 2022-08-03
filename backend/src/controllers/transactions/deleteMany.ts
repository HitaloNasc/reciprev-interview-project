import { Request, Response } from 'express';
import { Errors } from '../../common/lib/httpExeption';
import { _deleteMany } from './_deleteMany';

export async function deleteMany(request: Request, response: Response) {
    console.log('api - transactions - deleteMany');

    const transaction = await _deleteMany();

    return transaction;
}
