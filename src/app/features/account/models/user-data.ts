export interface UserData {
    id?: string,
    login: string,
    password: string,
    confirmPassword?: string,
    role: string,
    registrationDate?: string,
    employee?: boolean
}
