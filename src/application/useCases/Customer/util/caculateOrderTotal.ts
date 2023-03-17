import { OrderItem } from '../../../domain/Order'
import { MealRepository } from '../../../ports/MealRepository'

export async function calculateOrderTotal(
    mealRepository: MealRepository,
    orderItems: OrderItem[]
): Promise<number> {
    let total = 0

    for(const item of orderItems) {
        const meal = await mealRepository.findById(item.mealId)

        total += meal.calculateTotal(item.quantity)
    }

    return total
}