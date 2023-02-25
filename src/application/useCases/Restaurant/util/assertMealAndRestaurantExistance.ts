import { MealRepository } from "../../../ports/MealRepository";
import { RestaurantRepository } from "../../../ports/RestaurantRepository";

export async function assertMealAndRestaurantExistance(
    mealId: string,
    restaurantId: string,
    mealRepository: MealRepository,
    restaurantRepository: RestaurantRepository
) {
    const restaurantExists = await restaurantRepository.findById(restaurantId)
    const mealExists = await mealRepository.findById(mealId)

    return restaurantExists && mealExists
}