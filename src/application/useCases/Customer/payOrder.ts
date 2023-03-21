import { OrderStatus } from '../../domain/Order'
import { PayOrderDTO } from '../../dto/OrderDTO'
import { PaymentError } from '../../exception/PaymentError'
import { CustomerRepository } from '../../ports/CustomerRepository'
import { OrderRepository } from '../../ports/OrderRepository'
import { PaymentGateway } from '../../ports/PaymentGateway'
import { assertOrderAndCustomer } from './util/assertOrderAndCustomer'

export async function payOrder(
    payOrderDTO: PayOrderDTO,
    orderRepository: OrderRepository,
    customerRepository: CustomerRepository,
    paymentGateway: PaymentGateway
 ): Promise<boolean> {
    await assertOrderAndCustomer(payOrderDTO.customerId, payOrderDTO.orderId, orderRepository)

    const order = await orderRepository.findById(payOrderDTO.orderId)
    const customer = await customerRepository.findById(payOrderDTO.customerId)

    const success = await paymentGateway.process(order.total, customer.cardNumber)

    if(!success) {
        throw new PaymentError('Something went wrong, please try again!')
    }
    
    orderRepository.updateStatus(payOrderDTO.orderId, OrderStatus.PAID)
    return true
}   