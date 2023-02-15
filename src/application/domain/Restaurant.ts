import { v4 as uuid } from 'uuid'
import { Address } from './Address'
import { Meal } from './Meal'

type restaurantProperties = {
    name: string,
    address: Address,
    meals: Meal[]
}
Error
export class Restaurant {

    id: string
    name: string
    address: Address
    meals: Meal[]
    
    constructor(props: restaurantProperties, id?: string) {
        this.id = id || uuid()
        this.name = props.name
        this.address = props.address
        this.meals = props.meals
    }
}