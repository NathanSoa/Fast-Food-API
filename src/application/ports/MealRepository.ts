import { Meal } from '../domain/Meal'
export interface MealRepository {
    
    findById(id: string): Promise<Meal>
}