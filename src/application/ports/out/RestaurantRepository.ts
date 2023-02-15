import { Restaurant } from '../../domain/Restaurant'

export interface RestaurantRepository {

    create(restaurant: Restaurant): Promise<Restaurant>
    existByName(name: string): Promise<boolean>
    findById(id: string): Promise<Restaurant>
}