export interface UserDataDetailsOutput {
    id?: string,
    userName: string,
    password: string,
    confirmPassword?: string,
    role: string,
    registrationDate?: string,
    employee?: boolean,
    approved?: boolean,
}
