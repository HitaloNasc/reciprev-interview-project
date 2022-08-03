import request from 'supertest';
import app from '../../src/app';
import { prismaClient } from '../../src/database/prismaClient';
import STATUS from '../../src/common/consts/httpStatus.const';
import TRANSACTIONS from '../../src/common/consts/transactions.const';
import Transactions from '../../src/controllers/transactions';
import InvestmentFund from '../../src/controllers/investmentFund';

const transactions = new Transactions();
const investmentFund = new InvestmentFund();

const FIRST_FUND = {
    name: 'Entregas Expressas Ltda',
    CNPJ: '80.881.052/0001-52',
};
const FIRST_TRANSACTION = {
    type: TRANSACTIONS.TYPE.PURCHASE,
    transactionDate: new Date().toISOString(),
    quotaAmaunt: 1,
    unitPrice: 14.95,
};

beforeAll(async () => {
    const fund = await investmentFund._create(FIRST_FUND.name, FIRST_FUND.CNPJ);
    console.log('✨ 1 investment fund has successfully created!');

    await transactions._create({ ...FIRST_TRANSACTION, investmentFundId: fund.id });
    console.log('✨ 1 transaction has successfully created!');
});

afterAll(async () => {
    await investmentFund._deleteMany();
    await prismaClient.$disconnect();
});

describe('## TRANSACTIONS ##', () => {
    describe('GET /transactions', () => {
        it('should receive all transactions', async () => {
            const response = await request(app).get('/transactions');
            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('GET /transactions/:id', () => {
        it('should return error when transaction does not exists', async () => {
            const response = await request(app).get(`/transactions/this-id-not-already-exists`);
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });

        it('should receive a single transaction by id', async () => {
            const fund = await investmentFund._fromCNPJ(FIRST_FUND.CNPJ);
            //@ts-ignore
            const trans = await prismaClient.transactions.findFirst({ where: { investmentFundId: fund.id } });

            const response = await request(app).get(`/transactions/${trans?.id}`);

            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('POST /transactions', () => {
        it('should return error when payload is invalid', async () => {
            const trans = {};
            const response = await request(app).post('/transactions').send(trans);
            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        it('should return error when quotaAmaunt is a invalid value', async () => {
            const fund = await investmentFund._fromCNPJ(FIRST_FUND.CNPJ);
            const transaction_data = {
                investmentFundId: fund?.id,
                type: TRANSACTIONS.TYPE.SALE,
                transactionDate: new Date('2022-07-30 01:01:13.966').toISOString(),
                quotaAmaunt: -10,
                unitPrice: 14.95,
            };

            const response = await request(app).post('/transactions').send(transaction_data);

            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        // it('should return error when quotaAmaunt is greater the balance', async () => {
        //     const fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: FIRST_FUND.CNPJ } });
        //     const trans = {
        //         investmentFundId: fund?.id,
        //         type: TRANSACTIONS.TYPE.SALE,
        //         transactionDate: new Date('2022-07-31 01:01:13.966').toISOString(),
        //         quotaAmaunt: 10,
        //         unitPrice: 14.95,
        //     };

        //     const response = await request(app).post('/transactions').send(trans);

        //     expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        // });
        it('should create 1 new transactions', async () => {
            const fund = await investmentFund._fromCNPJ(FIRST_FUND.CNPJ);
            const transaction_data = {
                investmentFundId: fund?.id,
                type: TRANSACTIONS.TYPE.SALE,
                transactionDate: new Date().toISOString(),
                quotaAmaunt: 1,
                unitPrice: 14.95,
            };

            const response = await request(app).post('/transactions').send(transaction_data);
            expect(response.status).toBe(STATUS.OK);
        });
    });
});
