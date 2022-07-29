import { Response } from 'express';
import { Errors } from './httpExeption';

const globalHandler = (response: Response, statusCode: number, message: any) => {
    console.log('lib - handler - globalHandler');
    console.log(`[${statusCode}]`);
    return response
        .status(statusCode)
        .json({
            statusCode,
            message,
        })
        .end();
};

const handlerError = (response: Response, error: any) => {
    console.log('lib - handler - handlerError');

    if (!error) {
        console.dir(Errors.INTERNAL_SERVER_ERROR());
    }

    console.log('Error handler:');
    console.dir(error);

    const statusCode: number = error.statusCode;

    return response
        .status(statusCode)
        .json({
            statusCode: error.statusCode,
            title: error.title,
            message: {
                result: 'error',
                msg: error.errors,
            },
        })
        .end();
};

export async function HandlerJson(response: Response, promise: Promise<any>) {
    console.log('lib - handler - json');

    let result;
    if (promise) {
        try {
            let res = await promise;
            result = globalHandler(response, 200, res);
        } catch (error) {
            result = handlerError(response, error);
        }
    } else {
        result = handlerError(response, null);
    }
    return result;
}
