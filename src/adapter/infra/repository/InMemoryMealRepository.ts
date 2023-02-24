import { Meal } from '../../../application/domain/Meal'
import { MealRepository } from '../../../application/ports/MealRepository'

export class InMemoryMealRepository implements MealRepository {
    
    items = new Array()
    
    findById(id: string): Promise<Meal> {
        return this.items.filter(each => each.id = id)[0]
    }

}