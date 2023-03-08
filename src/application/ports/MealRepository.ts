import { Meal } from '../domain/Meal'
import { mealFilterParams } from '../useCases/Customer/findMeal'
export interface MealRepository {
    
    findById(id: string): Promise<Meal | undefined>
    findFiltered(filters: mealFilterParams): Promise<Meal[]>
}