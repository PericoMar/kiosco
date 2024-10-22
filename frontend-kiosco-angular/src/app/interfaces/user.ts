export interface User {
    username : string,
    password : string,
    name : string,
    rol : string
}

export type UserWithoutPassword = Omit<User, 'password'>;