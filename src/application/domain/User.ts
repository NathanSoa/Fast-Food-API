import { v4 as uuid } from 'uuid'

type userProperties = {
    email: string,
    password: string
}

export class User {
    id: string
    email: string
    password: string

    constructor(props: userProperties, id?: string){
        this.id = id || uuid()
        this.email = props.email
        this.password = props.password
    }
}