import { v4 as uuid } from 'uuid'
import { Address } from './Address'
import { Meal } from './Meal'

type restaurantWithMealProperties = {
    name: string,
    address: Address,
    meals: Meal[]
}

type restaurantWithoutMealProperties = {
    name: string,
    address: Address
}
export class Restaurant {

    id: string
    name: string
    address: Address
    meals: Meal[]
    
    private constructor(props: restaurantWithMealProperties, id?: string) {
        this.id = id || uuid()
        this.name = props.name
        this.address = props.address
        this.meals = props.meals
    }

    static withMeal(props: restaurantWithMealProperties, id?: string): Restaurant {
        return new Restaurant(props, id)
    } 

    static withoutMeal(props: restaurantWithoutMealProperties, id?: string): Restaurant {
        return new Restaurant({...props, meals: new Array()}, id)
    }
}