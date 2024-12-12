export interface User {
    usuario : string,
    password : string,
    nombre : string,
    cliente_id: number,
    created_at : string,
    updated_at : string,
    rol : string
}

export type UserWithoutPassword = Omit<User, 'password'>;