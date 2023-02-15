import { Restaurant } from '../../../application/domain/Restaurant'
import { RestaurantRepository } from '../../../application/ports/out/RestaurantRepository'

export class InMemoryRestaurantRepository implements RestaurantRepository {

    create(restaurant: Restaurant): Promise<Restaurant> {
        throw new Error("Method not implemented.");
    }

}