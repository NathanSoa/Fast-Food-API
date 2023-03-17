import { OrderItem } from '../../../domain/Order'
import { RestaurantRepository } from '../../../ports/RestaurantRepository'

export async function assertMealItemsAreCorrect(
    restaurantId: string, 
    orderItems: OrderItem[],
    restaurantRepository: RestaurantRepository
    ) {
        const restaurant = await restaurantRepository.findById(restaurantId)
        for(const orderItem of orderItems) {
            let exist = false

            for(const meal of restaurant.meals) {
                if(orderItem.mealId === meal.id) {
                    exist = true
                }
            }

            if(!exist) {
                throw new Error(`An invalid meal was sent!`)
            }
        }
}