export interface Establishment {
    id: string,
    address: string,
    cnpj: string,
    manager: string,
    municipalRegistration?: string,
    name: string,
    code?: number,
    phone: string,
    stateRegistration: string
}