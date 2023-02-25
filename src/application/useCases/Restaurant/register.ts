import { Restaurant } from '../../domain/Restaurant'
import { RestaurantCreateDTO } from '../../dto/RestaurantDTO'
import { DuplicatedEntityError } from '../../exception/DuplicatedEntityError'
import { RestaurantRepository } from '../../ports/RestaurantRepository'

export async function register(
        restaurantCreateDTO: RestaurantCreateDTO,
        restaurantRepository: RestaurantRepository
    ): Promise<Restaurant> {

    if(await restaurantRepository.existByName(restaurantCreateDTO.name)){
        throw new DuplicatedEntityError(`Restaurant with name ${restaurantCreateDTO.name} already exists!`)
    }

    const restaurant = Restaurant.withoutMeal(restaurantCreateDTO)
    
    return await restaurantRepository.create(restaurant)
}