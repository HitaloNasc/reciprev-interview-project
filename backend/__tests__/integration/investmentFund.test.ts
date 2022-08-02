import request from 'supertest';
import app from '../../src/app';
import InvestmentFund from '../../src/controllers/investmentFund';
import { prismaClient } from '../../src/database/prismaClient';
import STATUS from '../../src/common/consts/httpStatus.const';

const investmentFund = new InvestmentFund();

const FIRST_FUND = { name: 'Entregas Expressas Ltda', CNPJ: '80.881.052/0001-60 ' };

beforeAll(async () => {
    await investmentFund._create(FIRST_FUND.name, FIRST_FUND.CNPJ);
    console.log('✨ 1 investment fund has successfully created!');
});

afterAll(async () => {
    await investmentFund._deleteMany();
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
            const fund = await investmentFund._fromCNPJ(FIRST_FUND.CNPJ);
            const response = await request(app).get(`/investment-fund/${fund.id}`);
            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('POST /investment-fund', () => {
        // it('should return error when CNPJ is invalid', async () => {
        //     const fund = { name: 'Text Ltda', CNPJ: '25.102.935/001-0' };
        //     const response = await request(app).post('/investment-fund').send(fund);
        //     expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        // });
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
            const newFund = { name: 'Telas Ltda', CNPJ: '25.000.000/0001-00' };
            const response = await request(app).post('/investment-fund').send(newFund);
            expect(response.status).toBe(STATUS.OK);
        });
    });

    describe('PUT /investment-fund/:id', () => {
        // it('should return error when CNPJ is invalid', async () => {
        //     const fund = await prismaClient.investmentFund.findUnique({ where: { CNPJ: '80.881.052/0001-53' } });
        //     //@ts-ignore
        //     const response = await request(app).put(`/investment-fund/${fund.id}`).send({ CNPJ: '80.881.52/001-53' });
        //     expect(response.status).toBe(STATUS.PRECONDITION_FAILED);
        // });
        it('should return error when investment fund does not exists', async () => {
            const response = await request(app).get(`/investment-fund/this-id-not-already-exists`).send({ name: 'Not Exists LTDA' });
            expect(response.status).toBe(STATUS.NOT_FOUND);
        });
        it('should updated an investment fund', async () => {
            const fund = await investmentFund._fromCNPJ(FIRST_FUND.CNPJ);
            const response = await request(app).put(`/investment-fund/${fund.id}`).send({ name: 'Atualiza Ltda' });
            expect(response.status).toBe(STATUS.OK);
        });
    });
});
