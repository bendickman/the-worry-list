export interface IUser {
    displayName: string,
    userName: string,
    token: string,
    profileImage?: string,
}

export interface IUserFormValues {
    email: string,
    password: string,
    displayName?: string,
    userName?: string,
}