import { validate as cnpjValidate } from 'cnpj';

export function cnpj(cnpj: string) {
    return cnpjValidate(cnpj);
}
