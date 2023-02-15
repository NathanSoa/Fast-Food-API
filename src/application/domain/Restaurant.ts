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

    constructor(props: restaurantProperties, id?: string) {
        this.id = id || uuid()
        this.name = props.name
        this.address = props.address
        this.meals = props.meals
    }

    get id(): string {
        return this.id
    }

    get name(): string {
        return this.name
    }

    get address(): Address {
        return this.address
    }

    get meals(): Meal[] {
        return this.meals
    }

    
    set id(id: string) {
        this.id = id
    }

    set name(name: string) {
        this.name = name
    }

    set address(address: Address) {
        this.address = address
    }

    set meals(meals: Meal[]) {
        this.meals = meals
    }
}