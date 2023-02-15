import { v4 as uuid } from 'uuid'
import { Restaurant } from './Restaurant'

type mealProperties = {
    name: string,
    price: number,
    description: string,
    restaurant: Restaurant | undefined,
    categories: string[]
}

export class Meal {

	id: string
	price: number
	description: string
	restaurant: Restaurant | undefined
	categories: string[]

    constructor(props: mealProperties, id?:string) {
        
        this.id = id || uuid()
        this.price = props.price
        this.description = props.description
        this.categories = props.categories

		if(props.restaurant) {
			props.restaurant.meals = new Array()
			this.restaurant = props.restaurant
		}
    }   
}