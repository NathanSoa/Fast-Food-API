import { Meal } from '../../domain/Meal'
import { MealRepository } from '../../ports/MealRepository'

export type mealFilterParams = {
    name?: string,
    restaurant?: string,
    maxPrice?: number
}

export async function findMeal(
    mealRepository: MealRepository,
    mealFilter: mealFilterParams
): Promise<Meal[]> {

    return mealRepository.findFiltered(mealFilter)
}