import { ProductData } from "../../product-data/model/product-data";

export interface GoodsReceipt {
    id: string,
    controlNumber: number,
    invoice: string,
    productsTotal: number,
    registrationDate: string,
    received: boolean,
    productDataList: ProductData[],
    producReceiptList: string[]
}