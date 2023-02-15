export type UserCreateDTO = {
    email: string,
    password: string
}

export type UserLoginDTO = {
    username: string,
    password: string
}

export type UserSuccessLoginDTO = {
    jwtToken: string,
    username: string
}