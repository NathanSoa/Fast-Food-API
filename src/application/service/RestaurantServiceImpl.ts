import { Meal } from '../domain/Meal'
import { Restaurant } from '../domain/Restaurant'
import { RestaurantCreateDTO } from '../dto/RestaurantDTO'
import { DuplicatedEntityError } from '../exception/DuplicatedEntityError'
import { RestaurantService } from '../ports/in/RestaurantService'
import { MealRepository } from '../ports/out/MealRepository'
import { RestaurantRepository } from '../ports/out/RestaurantRepository'

export class RestaurantServiceImpl implements RestaurantService {

    constructor(
        private readonly restaurantRepository: RestaurantRepository,
        private readonly mealRepository: MealRepository
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

    async addMeal(restaurantId: string, mealId: string): Promise<Restaurant> {
        const meal = await this.mealRepository.findById(mealId)
        const restaurant = await this.restaurantRepository.findById(restaurantId)
        
        if(this.isMealNotDuplicated(meal, restaurant)) {
            meal.restaurant = restaurant
            restaurant.meals.push(meal)
        }
       
        return restaurant
    }
    
    removeMeal(restaurantId: string, mealId: string): Promise<Restaurant> {
        throw new Error('Method not implemented.');
    }

    isMealNotDuplicated(meal: Meal, restaurant: Restaurant) {
        return restaurant.meals.filter(eachMeal => eachMeal.id === meal.id).length === 0
    }
}