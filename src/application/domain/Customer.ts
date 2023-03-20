import { v4 as uuid } from 'uuid'

type customerProperties = {
    cardNumber: string,
    name: string,
    birthdate: Date
}

export class Customer {
    id: string
    name: string
    birthdate: Date
    cardNumber: string

    constructor(props: customerProperties, id?: string){
        this.id = id || uuid()
        this.name = props.name
        this.birthdate = props.birthdate
        this.cardNumber = props.cardNumber
    }
}