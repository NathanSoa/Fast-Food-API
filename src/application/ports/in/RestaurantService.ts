import { Restaurant } from '../../domain/Restaurant'
import { RestaurantCreateDTO } from '../../dto/RestaurantDTO'

export interface RestaurantService {

    register(restaurantCreateDTO: RestaurantCreateDTO): Promise<Restaurant>
    addMeal(restaurantId: string, mealId: string): Promise<Restaurant>
    removeMeal(restaurantId: string, mealId: string): Promise<Restaurant>
}