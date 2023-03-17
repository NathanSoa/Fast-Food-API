import { Order } from '../../domain/Order'
import { PlaceNewOrderDTO } from '../../dto/OrderDTO'
import { MealRepository } from '../../ports/MealRepository'
import { OrderRepository } from '../../ports/OrderRepository'
import { RestaurantRepository } from '../../ports/RestaurantRepository'
import { assertMealItemsAreCorrect } from './util/assertMealItemsAreCorrect'
import { calculateOrderTotal } from './util/caculateOrderTotal'

export async function placeOrder(
    orderDTO: PlaceNewOrderDTO,
    restaurantRepository: RestaurantRepository,
    orderRepository: OrderRepository,
    mealRepository: MealRepository
) {

    await assertMealItemsAreCorrect(orderDTO.restaurantId, orderDTO.orderItems, restaurantRepository)
    const total = await calculateOrderTotal(mealRepository, orderDTO.orderItems)
    return await orderRepository.save(Order.NewOne({...orderDTO, total}))
}