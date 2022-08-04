import { Router, Request, Response } from 'express';
import { HandlerJson } from './common/lib/handle';
import InvestmentFund from './controllers/investmentFund';
import Transactions from './controllers/transactions';

const router = Router();

// INVESTMENT FUND
const investmentFund = new InvestmentFund();
// GET list
router.get('/investment-fund', (request: Request, response: Response) => {
    console.log('route - investment-fund - list');
    const promise = investmentFund.list(request, response);
    HandlerJson(response, promise);
});
// GET fromId
router.get('/investment-fund/:id', (request: Request, response: Response) => {
    console.log('route - investment-fund - fromId');
    const promise = investmentFund.fromId(request, response);
    HandlerJson(response, promise);
});
// POST create
router.post('/investment-fund', (request: Request, response: Response) => {
    console.log('route - investment-fund - create');
    const promise = investmentFund.create(request, response);
    HandlerJson(response, promise);
});
// PUT update
router.put('/investment-fund/:id', (request: Request, response: Response) => {
    console.log('route - investment-fund - update');
    const promise = investmentFund.update(request, response);
    HandlerJson(response, promise);
});
router.delete('/investment-fund/:id', (request: Request, response: Response) => {
    console.log('rouet - investment-fund - remove');
    const promise = investmentFund.remove(request, response);
    HandlerJson(response, promise);
});

// TRANSACTIONS
const transactions = new Transactions();
// GET list
router.get('/transactions', (request: Request, response: Response) => {
    console.log('route - transactions - list');
    const promise = transactions.list(request, response);
    HandlerJson(response, promise);
});
// GET lazyList
router.get('/transactions/lazy', (request: Request, response: Response) => {
    console.log('route - transactions - lazyList');
    const promise = transactions.lazyList(request, response);
    HandlerJson(response, promise);
});
// GET fromId
router.get('/transactions/:id', (request: Request, response: Response) => {
    console.log('route - transactions - fromId');
    const promise = transactions.fromId(request, response);
    HandlerJson(response, promise);
});
// POST create
router.post('/transactions', (request: Request, response: Response) => {
    console.log('route - transactions - create');
    const promise = transactions.create(request, response);
    HandlerJson(response, promise);
});
// PUT update
router.put('/transactions/:id', (request: Request, response: Response) => {
    console.log('route - transactions - update');
    const promise = transactions.update(request, response);
    HandlerJson(response, promise);
});
// DELETE delete
router.delete('/transactions/:id', (request: Request, response: Response) => {
    console.log('route - transactions - remove');
    const promise = transactions.remove(request, response);
    HandlerJson(response, promise);
});

export default router;
