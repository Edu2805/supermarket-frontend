export interface HistoricalPurchaseReportsOutput {
    name: string;
    productCode: number;
    inventory: number;
    providerProductName: string;
    departmentName: string;
    mainsectionName: string;
    subsectionName: string;
    invoiceNumber: string;
    totalInvoice: number;
    registrationDate: Date;
    received: boolean;
}