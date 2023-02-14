import { Router } from 'express'
import { UserService } from '../../../../application/ports/in/UserService'
import { TokenGenerator } from '../../../../application/ports/out/TokenGenerator'
import { UserDTOValidator } from '../../../../application/ports/out/UserDTOValidator'
import { UserRepository } from '../../../../application/ports/out/UserRepository'
import { UserServiceImpl } from '../../../../application/service/UserServiceImpl'
import { JWTTokenGenerator } from '../../../infra/authentication/JWTTokenGenerator'
import { InMemoryUserRepository } from '../../../infra/repository/InMemoryUserRepository'
import { zodUserDTOValidator } from '../../../validator/zodUserDTOValidator'
import { AppResponse } from '../../presentation'

const userRoute = Router()

const repository: UserRepository = new InMemoryUserRepository()
const tokenGenerator: TokenGenerator = new JWTTokenGenerator()
const service: UserService = new UserServiceImpl(repository, tokenGenerator)
const DTOValidator: UserDTOValidator = new zodUserDTOValidator()

userRoute.route('/user')
        .post((req, res) => {
            const validatedResponse = DTOValidator.validateUserRegister(req.body)
            const response = service.register(validatedResponse).then(value => value)
            res.status(201).send(AppResponse.success(response))
        })

userRoute.route('/user/auth')
        .post((req, res) => {
            const validatedResponse = DTOValidator.validateUserLogin(req.body)
            const response = service.authenticate(validatedResponse).then(value => value)
            res.send(AppResponse.success(response))
        })

export { userRoute }
