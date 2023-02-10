import { v4 as uuid } from 'uuid'

type userProperties = {
    email: string,
    password: string
}

export class User {
    private id: string
    private email: string
    private password: string

    constructor(props: userProperties, id?: string){
        this.id = id || uuid()
        this.email = props.email
        this.password = props.password
    }

    getID(){
        return this.id
    }

    getEmail(){
        return this.email
    }

    getPassword(){
        return this.password
    }
}