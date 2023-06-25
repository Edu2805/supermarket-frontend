import { Establishment } from "../../establishment/model/establishment";

export interface Department {
    id: string,
    name: string,
    code?: number,
    establishment: Establishment
}