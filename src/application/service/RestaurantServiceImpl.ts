import { Restaurant } from '../domain/Restaurant'
import { RestaurantCreateDTO } from '../dto/restaurant/RestaurantCreateDTO'
import { RestaurantService } from '../ports/in/RestaurantService'
import { RestaurantRepository } from '../ports/out/RestaurantRepository'

export class RestaurantServiceImpl implements RestaurantService {

    constructor(
        private readonly restaurantRepository: RestaurantRepository
    ) {}
    
    async register(restaurantCreateDTO: RestaurantCreateDTO): Promise<Restaurant> {
        const restaurant = new Restaurant({
            name: restaurantCreateDTO.name, 
            address: restaurantCreateDTO.address,
            meals: new Array()
        })

        return await this.restaurantRepository.create(restaurant)
    }

    addMeal(restaurantId: string, mealId: string): Promise<Restaurant> {
        throw new Error('Method not implemented.');
    }
    
    removeMeal(restaurantId: string, mealId: string): Promise<Restaurant> {
        throw new Error('Method not implemented.');
    }

}