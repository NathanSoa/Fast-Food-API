import { Order } from '../../domain/Order'
import { RestaurantRepository } from '../../ports/RestaurantRepository'
import { assertMealItemsAreCorrect } from './util/assertMealItemsAreCorrect'

export async function placeOrder(
    order: Order,
    restaurantRepository: RestaurantRepository
) {

    await assertMealItemsAreCorrect(order.restaurantId, order.orderItems, restaurantRepository)
}