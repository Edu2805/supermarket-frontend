import { OtherAddition } from "../../other-addition/model/other-addition"
import { OtherDiscount } from "../../other-discount/model/other-discount"

export interface Salary {
    id?: string,
    position: string,
    salaryRange: string,
    grossSalary: number,
    netSalary?: number,
    inss?: number,
    fgts?: number,
    salaryAdvance: number,
    benefits: string,
    competenceStart: string,
    finalCompetence: string
    otherDiscounts?: OtherDiscount[],
    otherAdditions?: OtherAddition[]
}