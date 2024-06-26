export interface HistoricalSaleReportsOutput {
    name: string;
    productCode: number;
    ean13: string;
    dun14: string;
    salePrice: number;
    inventory: number;
    providerProductName: string;
    departmentName: string;
    mainsectionName: string;
    subsectionName: string;
    saleNumber: number;
    productsTotal: number;
    registrationDate: Date;
    effectiveSale: boolean
}