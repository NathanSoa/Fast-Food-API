import { Router } from 'express'
import { TokenGenerator } from '../../../../application/ports/TokenGenerator'
import { UserDTOValidator } from '../../../../application/ports/UserDTOValidator'
import { UserRepository } from '../../../../application/ports/UserRepository'
import { register } from '../../../../application/useCases/User/register'
import { authenticate } from '../../../../application/useCases/User/authenticate'
import { JWTTokenGenerator } from '../../../infra/authentication/JWTTokenGenerator'
import { InMemoryUserRepository } from '../../../infra/repository/InMemoryUserRepository'
import { zodUserDTOValidator } from '../../../validator/zodUserDTOValidator'
import { AppResponse } from '../../presentation'

const userRoute = Router()

const repository: UserRepository = new InMemoryUserRepository()
const tokenGenerator: TokenGenerator = new JWTTokenGenerator()
const DTOValidator: UserDTOValidator = new zodUserDTOValidator()

userRoute.route('/user')
        .post((req, res) => {
            const validatedResponse = DTOValidator.validateUserRegister(req.body)
            const response = register(validatedResponse, repository).then(value => value)
            res.status(201).send(AppResponse.success(response))
        })

userRoute.route('/user/auth')
        .post((req, res) => {
            const validatedResponse = DTOValidator.validateUserLogin(req.body)
            const response = authenticate(validatedResponse, repository, tokenGenerator).then(value => value)
            res.send(AppResponse.success(response))
        })

export { userRoute }
