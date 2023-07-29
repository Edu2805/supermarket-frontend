import { Attachment } from "src/app/features/attachment/model/attachment-data";
import { Provider } from "../../provider/model/provider";
import { SubSection } from "../../subsection/model/subsection";

export interface ProductData {
    id?: string,
    name: string,
    code?: number,
    unity: number,
    purchasePrice: number,
    salePrice: number,
    margin?: number,
    ean13?: string,
    dun14?: string,
    inventory: number,
    subSection: SubSection,
    providerProduct: Provider,
    productPhoto?: Attachment
}