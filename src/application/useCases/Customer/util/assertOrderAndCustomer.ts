import { OrderRepository } from '../../../ports/OrderRepository'

export async function assertOrderAndCustomer(
    customerId: string,
    orderId: string,
    orderRepository: OrderRepository
): Promise<void> {
    const order = await orderRepository.findById(orderId)

    if(order.customerId !== customerId) {
        throw new Error('Mismatch Error! Customer id sent isn\'t the same in order')
    }
}