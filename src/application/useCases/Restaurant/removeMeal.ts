import { Meal } from '../../domain/Meal'
import { Restaurant } from '../../domain/Restaurant'
import { MealRepository } from '../../ports/MealRepository'
import { RestaurantRepository } from '../../ports/RestaurantRepository'
import { assertMealAndRestaurantExistance } from './util/assertMealAndRestaurantExistance'

export async function removeMeal(
        restaurantId: string, 
        mealId: string,
        restaurantRepository: RestaurantRepository,
        mealRepository: MealRepository
    ): Promise<Restaurant> {

        if(!assertMealAndRestaurantExistance(mealId, restaurantId, mealRepository, restaurantRepository)) {
            throw new Error('Invalid ID was sent!')
        }
        
        const meal = await mealRepository.findById(mealId)
        const restaurant = await restaurantRepository.findById(restaurantId)

        if(mealExistInRestaurant(meal, restaurant)) {
            restaurant.meals = restaurant.meals.filter(each => each.id != meal.id)
            meal.restaurant = undefined
            restaurantRepository.update(restaurant)
        }

        return restaurant
}

function mealExistInRestaurant(meal: Meal, restaurant: Restaurant) {
   return restaurant.meals.find(eachMeal => eachMeal.id === meal.id) 
}