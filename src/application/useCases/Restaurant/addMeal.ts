import { Meal } from '../../domain/Meal'
import { Restaurant } from '../../domain/Restaurant'
import { MealRepository } from '../../ports/MealRepository'
import { RestaurantRepository } from '../../ports/RestaurantRepository'
import { assertMealAndRestaurantExistance } from './util/assertMealAndRestaurantExistance'

export async function addMeal(
        restaurantId: string, 
        mealId: string,
        restaurantRepository: RestaurantRepository,
        mealRepository: MealRepository
    ): Promise<Restaurant> {

    const meal = await mealRepository.findById(mealId)
    const restaurant = await restaurantRepository.findById(restaurantId)
    
    if(!assertMealAndRestaurantExistance(mealId, restaurantId, mealRepository, restaurantRepository)) {
        throw new Error('Invalid ID was sent!')
    }

    if(isMealNotDuplicated(meal, restaurant)) {
        meal.restaurant = restaurant
        restaurant.meals.push(meal)
    }
   
    return restaurant
}

function isMealNotDuplicated(meal: Meal, restaurant: Restaurant) {
    return restaurant.meals.filter(eachMeal => eachMeal.id === meal.id).length === 0
}