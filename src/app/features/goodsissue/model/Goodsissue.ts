import { ProductData } from "../../product-data/model/product-data";

export interface GoodsIssue {
    id: string,
    saleNumber: number,
    productsTotal: number,
    subtotal: number,
    totalReceived: number,
    change: number,
    isEffectiveSale: boolean,
    paymentOptionsType: string,
    registrationDate: string,
    productDataList: ProductData;
    productList: string[];
}