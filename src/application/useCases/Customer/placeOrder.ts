import { Order } from '../../domain/Order'
import { PlaceNewOrderDTO } from '../../dto/OrderDTO'
import { OrderRepository } from '../../ports/OrderRepository'
import { RestaurantRepository } from '../../ports/RestaurantRepository'
import { assertMealItemsAreCorrect } from './util/assertMealItemsAreCorrect'

export async function placeOrder(
    orderDTO: PlaceNewOrderDTO,
    restaurantRepository: RestaurantRepository,
    orderRepository: OrderRepository
) {

    await assertMealItemsAreCorrect(orderDTO.restaurantId, orderDTO.orderItems, restaurantRepository)

    return await orderRepository.save(Order.NewOne({...orderDTO}))
}