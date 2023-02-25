import { Restaurant } from '../../../application/domain/Restaurant'
import { RestaurantRepository } from '../../../application/ports/RestaurantRepository'

export class InMemoryRestaurantRepository implements RestaurantRepository {
    items = new Array()

    async create(restaurant: Restaurant): Promise<Restaurant> {
        this.items.push(restaurant)
        return restaurant
    }
 
    async update(restaurant: Restaurant): Promise<Restaurant> {
        const databaseRestaurant = await this.findById(restaurant.id)
        databaseRestaurant.name = restaurant.name
        databaseRestaurant.address = restaurant.address
        databaseRestaurant.meals = restaurant.meals

        return databaseRestaurant
    }
    
    async existByName(name: string): Promise<boolean> {
        return this.items.find(each => each.name === name)
    }
    
    async findById(id: string): Promise<Restaurant> {
        return this.items.find(each => each.id === id)
    }
}