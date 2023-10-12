import { Salary } from "../../salary/model/salary";

export interface JobPosition {
    id: string,
    name: string,
    code?: number,
    assignments: string,
    salary: Salary
}