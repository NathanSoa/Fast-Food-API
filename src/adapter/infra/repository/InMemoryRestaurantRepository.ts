import { Restaurant } from '../../../application/domain/Restaurant'
import { RestaurantRepository } from '../../../application/ports/out/RestaurantRepository'

export class InMemoryRestaurantRepository implements RestaurantRepository {
    items = new Array()

    async create(restaurant: Restaurant): Promise<Restaurant> {
        this.items.push(restaurant)
        return restaurant
    }
    
    async existByName(name: string): Promise<boolean> {
        return this.items.filter(each => each.name === name).length > 0
    }
    
    async findById(id: string): Promise<Restaurant> {
        return this.items.filter(each => each.id = id)[0]
    }
}