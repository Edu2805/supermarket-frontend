import { JobPosition } from "../../jobposition/model/jobposition"
import { PersonScholarityTypeStringDto } from "../../person/model/person-scholarity-type-string-dto"
import { SubSection } from "../../subsection/model/subsection"

export interface EmployeeDetailsOutput {
    id: string,
    registerNumber: number,
    fullName: string,
    subSection: SubSection,
    jobPosition: JobPosition,
    personScholarityTypeStringDTO: PersonScholarityTypeStringDto
}