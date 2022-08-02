import { _list } from './_list';

export async function list() {
    console.log('api - ivestment-fund - list');

    const investmentFunds = await _list();

    return investmentFunds;
}
