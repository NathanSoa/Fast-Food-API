import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '../../src/adapter/infra/repository/InMemoryUserRepository'
import { JWTTokenGenerator } from '../../src/adapter/infra/authentication/JWTTokenGenerator'

import { UserLoginDTO, UserCreateDTO } from '../../src/application/dto/UserDTO'

import { register } from '../../src/application/useCases/User/register'
import { authenticate } from '../../src/application/useCases/User/authenticate'

describe('User use cases', () => {

    const repository = new InMemoryUserRepository()
    const tokenGenerator = new JWTTokenGenerator()

    beforeEach(() => {
        repository.items = new Array()
    })

    it('should create a new user', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        await register(userCreateDTO, repository)
        expect(repository.items.length).toBe(1)
    })

    it('should throw error when user send a duplicated email', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        await register(userCreateDTO, repository)
        expect(register(userCreateDTO, repository)).rejects.toThrow()
        expect(repository.items.length).toBe(1)
    })

    it('should authenticate an valid user', async () => {
        const userCreateDTO: UserCreateDTO = {email: 'test@mail.com', password: 'supersecurepassword'}
        const userLoginDTO: UserLoginDTO = {username: 'test@mail.com', password: 'supersecurepassword'}

        await register(userCreateDTO, repository)
        const login = await authenticate(userLoginDTO, repository, tokenGenerator)

        expect(login.jwtToken).toBeTruthy()
        expect(login.username).toBe(userLoginDTO.username)
    })
})