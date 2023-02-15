import { Restaurant } from '../domain/Restaurant'
import { RestaurantCreateDTO } from '../dto/RestaurantDTO'
import { DuplicatedEntityError } from '../exception/DuplicatedEntityError'
import { RestaurantService } from '../ports/in/RestaurantService'
import { RestaurantRepository } from '../ports/out/RestaurantRepository'

export class RestaurantServiceImpl implements RestaurantService {

    constructor(
        private readonly restaurantRepository: RestaurantRepository
    ) {}
    
    async register(restaurantCreateDTO: RestaurantCreateDTO): Promise<Restaurant> {

        if(await this.restaurantRepository.existByName(restaurantCreateDTO.name)){
            throw new DuplicatedEntityError(`Restaurant with name ${restaurantCreateDTO.name} already exists!`)
        }

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