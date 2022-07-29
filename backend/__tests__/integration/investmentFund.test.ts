import request from 'supertest';
import app from '../../src/app';
import { prismaClient } from '../../src/database/prismaClient';

const FIRST_FUND = { name: 'Entregas Expressas Ltda', CNPJ: '80.881.052/0001-53' };

const STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    PRECONDITION_FAILED: 412,
    INTERNAL_SERVER_ERROR: 500,
};

beforeAll(async () => {
    await prismaClient.investmentFund.createMany({
        data: [FIRST_FUND],
    });

    console.log('✨ 1 investment funds successfully created!');
});

afterAll(async () => {
    const deleteInvestmentFund = prismaClient.investmentFund.deleteMany();

    await prismaClient.$transaction([deleteInvestmentFund]);

    await prismaClient.$disconnect();
});

describe('## INVESTMENT FUND ##', () => {
    describe('GET /investment-fund', () => {
        it('should receive all investment funds', async () => {
            const response = await request(app).get('/investment-fund');
            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('GET /investment-fund/:id', () => {
        it('should return error when investment fund does not exists', async () => {
            const response = await request(app).get(`/investment-fund/this-id-not-already-exists`);
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });
        it('should receive a single investment fund by id', async () => {
            const fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: FIRST_FUND.CNPJ } });
            //@ts-ignore
            const response = await request(app).get(`/investment-fund/${fund.id}`);

            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('POST /investment-fund', () => {
        // {REFACTORY} CNPJ DEVE SER VÁLIDO
        // should return error when CNPJ is invalid
        it('should return error when payload is invalid', async () => {
            const fund = {};
            const response = await request(app).post('/investment-fund').send(fund);
            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        it('should return error when investment fund already exists', async () => {
            const response = await request(app).post('/investment-fund').send(FIRST_FUND);
            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        it('should create 1 new investment fund', async () => {
            const fund = { name: 'Telas Ltda', CNPJ: '25.102.935/0001-00' };
            const response = await request(app).post('/investment-fund').send(fund);
            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('PUT /investment-fund/:id', () => {
        it('should return error when investment fund does not exists', async () => {
            const response = await request(app).get(`/investment-fund/this-id-not-already-exists`).send({ name: 'Not Exists LTDA' });
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });
        it('should updated an investment fund', async () => {
            const fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: '80.881.052/0001-53' } });
            //@ts-ignore
            const response = await request(app).put(`/investment-fund/${fund.id}`).send({ name: 'Atualiza Ltda' });

            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('PUT /investment-fund/activate/:id', () => {
        it('should return error when investment fund does not exists', async () => {
            const response = await request(app).get(`/investment-fund/activate/this-id-not-already-exists`);
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });
        it('should return error when ivestment fund already active', async () => {
            const data_fund = { name: 'Mariah', CNPJ: '36.236.394/0001-29' };
            const fund = await prismaClient.investmentFund.create({ data: data_fund });
            //@ts-ignore
            const response = await request(app).put(`/investment-fund/activate/${fund.id}`);

            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        it('should activated an investment fund', async () => {
            const _fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: FIRST_FUND.CNPJ } });
            const data_fund = { ..._fund, status: 0 };
            const fund = await prismaClient.investmentFund.update({ where: { id: data_fund.id }, data: { ...data_fund } });

            //@ts-ignore
            const response = await request(app).put(`/investment-fund/activate/${fund.id}`);

            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('PUT /investment-fund/deactivate/:id', () => {
        it('should return error when investment fund does not exists', async () => {
            const response = await request(app).get(`/investment-fund/deactivate/this-id-not-already-exists`);
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });
        it('should return error when ivestment fund already deactivate', async () => {
            const _fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: FIRST_FUND.CNPJ } });
            const data_fund = { ..._fund, status: 0 };
            const fund = await prismaClient.investmentFund.update({ where: { id: data_fund.id }, data: { ...data_fund } });

            //@ts-ignore
            const response = await request(app).put(`/investment-fund/deactivate/${fund.id}`);

            expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        });
        it('should deactivate an investment fund', async () => {
            const fund = await prismaClient.investmentFund.create({ data: { name: 'Limpeza ME', CNPJ: '02.529.354/0001-53' } });
            //@ts-ignore
            const response = await request(app).put(`/investment-fund/deactivate/${fund.id}`);

            expect(response.status).toBe(STATUS.OK);
        });
    });
});
