import { v4 as uuid } from 'uuid'
import { Restaurant } from './Restaurant'

type mealProperties = {
    name: string,
    price: number,
    description: string,
    restaurant: Restaurant | undefined,
    categories: string[]
}

type mealWithRestaurantProperties = {
    name: string,
    price: number,
    description: string,
    restaurant: Restaurant,
    categories: string[]
}

type mealWithoutRestaurantProperties = {
    name: string,
    price: number,
    description: string,
    categories: string[]
}

export class Meal {

	id: string
    name: string
	price: number
	description: string
	restaurant: Restaurant | undefined
	categories: string[]

    private constructor(props: mealProperties, id?:string) {
        
        this.id = id || uuid()
        this.name = props.name
        this.price = props.price
        this.description = props.description
        this.categories = props.categories
        this.restaurant = props.restaurant
    }
    
    public calculateTotal(amount: number): number {
        return this.price * amount
    }

    static withRestaurant(props: mealWithRestaurantProperties, id?: string): Meal {
        return new Meal(props, id)
    }

    static withoutRestaurant(props: mealWithoutRestaurantProperties, id?: string): Meal {
        return new Meal({...props, restaurant: undefined}, id)
    }
}