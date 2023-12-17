export interface HistoricalGoodsReceipt {
    id: string,
    name: string,
    productCode: number,
    purchasePrice: number,
    inventory: number,
    providerProductName: string,
    departmentName: string,
    mainsectionName: string,
    subsectionName: string,
    invoice: string,
    totalInvoice: number,
    registrationDate: string,
    received: boolean,
    sourceId: string
}