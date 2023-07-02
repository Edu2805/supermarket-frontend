import { Department } from "../../department/model/department";

export interface MainSection {
    id: string,
    name: string,
    code?: number,
    department: Department
}