import { MainSection } from "../../mainsection/model/mainsection";

export interface SubSection {
    id: string,
    name: string,
    code?: number,
    department: MainSection
}