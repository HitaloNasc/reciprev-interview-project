export default interface InvestmentFundInterface {
    id?: string;
    name: string;
    CNPJ: string;
    status?: number;
    created?: Date | string;
    updated?: Date | string;
}
