import { Router, Request, Response } from 'express';
import { HandlerJson } from './common/lib/handle';
import InvestmentFund from './api/investmentFund';

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
    console.log(request.body);

    const promise = investmentFund.update(request, response);
    HandlerJson(response, promise);
});
// PUT activate
router.put('/investment-fund/activate/:id', (request: Request, response: Response) => {
    console.log('route - investment-fund - activate');
    const promise = investmentFund.activate(request, response);
    HandlerJson(response, promise);
});
// PUT deactivate
router.put('/investment-fund/deactivate/:id', (request: Request, response: Response) => {
    console.log('route - investment-fund - deactivate');
    const promise = investmentFund.deactivate(request, response);
    HandlerJson(response, promise);
});

export default router;
