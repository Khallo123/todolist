export interface IRegisterUser {
    email: string
    phone_number: string
    password: string
    fullname: string
    confirmPassword: string
}

export interface ILoginUser {
    email: string
    password: string
}