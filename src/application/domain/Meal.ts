import { v4 as uuid } from 'uuid'
import { Restaurant } from './Restaurant'

type mealProperties = {
    name: string,
    price: number,
    description: string,
    restaurant: Restaurant,
    categories: string[]
}

export class Meal {

    constructor(props: mealProperties, id?:string) {
        this.id = id || uuid()
        this.price = props.price
        this.description = props.description
        props.restaurant.meals = new Array()
        this.restaurant = props.restaurant
        this.categories = props.categories
    }

	get id (): string {
		return this.id
	}

	get price(): number {
		return this.price
	}

	get description(): string {
		return this.description
	}

	get restaurant(): Restaurant {
		return this.restaurant
	}

	get categories(): string[] {
		return this.categories
	}
	
	set id(id: string) {
		this.id = id
	}

	set price(price: number) {
		this.price = price
	}

	set description(description: string) {
		this.description = description
	}

	set restaurant(restaurant: Restaurant) {
		this.restaurant = restaurant
	}

	set categories(categories: string[]) {
		this.categories = categories
	}    
}