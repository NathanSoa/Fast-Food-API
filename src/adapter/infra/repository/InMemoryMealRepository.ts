import { Meal } from '../../../application/domain/Meal'
import { MealRepository } from '../../../application/ports/MealRepository'
import { mealFilterParams } from '../../../application/useCases/Customer/findMeal'

export class InMemoryMealRepository implements MealRepository {
    
    items: Meal[] = new Array()
    
    async findById(id: string): Promise<Meal | undefined> {
       return this.items.find(each => each.id === id)
    }

    async findFiltered(filters: mealFilterParams): Promise<Meal[]> {
        let meals = new Array()
                    
        if(filters.name) {
            meals = this.items.filter(each => each.description === filters.name)
        }

        if(filters.restaurant) {
            meals = this.items.filter(each => each.restaurant?.name === filters.restaurant)
        }

        if(filters.maxPrice) {
            //@ts-ignore
            meals = meals.filter(each => each.price <= filters.maxPrice)
        }

        return meals
    }
}