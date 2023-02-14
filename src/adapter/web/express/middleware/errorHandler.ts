import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../../../../application/exception/ValidationError'
import { AppResponse } from '../../presentation'

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {

    if(error instanceof ValidationError) {
        res.status(400).json(AppResponse.jsonError(error.message))
    }
}