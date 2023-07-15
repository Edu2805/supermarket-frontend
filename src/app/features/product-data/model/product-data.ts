import { Provider } from "../../provider/model/provider";
import { SubSection } from "../../subsection/model/subsection";

export interface ProductData {
    id: string,
    name: string,
    code: number,
    unity: number,
    purchase_price: number,
    sale_price: number,
    margin?: number,
    ean13?: string,
    dun14?: string,
    inventory: number,
    subsection: SubSection,
    provider: Provider
}