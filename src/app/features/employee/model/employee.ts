import { JobPosition } from "../../jobposition/model/jobposition";
import { Person } from "../../person/model/person";
import { SubSection } from "../../subsection/model/subsection";

export interface Employee {
    id: string,
    registerNumber: number,
    fullName: string,
    person: Person,
    subSection: SubSection,
    jobPosition: JobPosition
}