import { UserData } from "../../account/models/user-data";
import { Attachment } from "../../attachment/model/attachment-data";

export interface Person {
    id?: string,
    firstName: string,
    middleName: string,
    lastName: string,
    cpf: string,
    rg?: string,
    nationality?: string,
    naturalness?: string,
    birthDate: string,
    scholarity?: string,
    dependents?: boolean,
    fatherName?: string,
    motherName: string,
    email: string,
    userData: UserData,
    productPhoto?: Attachment
}