import { Order, OrderStatus } from '../../../application/domain/Order'
import { OrderRepository } from '../../../application/ports/OrderRepository'

export class InMemoryOrderRepository implements OrderRepository {

    items = new Array()

    async save(order: Order): Promise<Order> {
        this.items.push(order)
        return order
    }
    
    async findById(id: string): Promise<Order> {
        return this.items.find(each => each.id === id)
    }

    async updateStatus(id: string, orderStatus: OrderStatus): Promise<void> {
        const order = await this.findById(id)
        order.status = orderStatus
    }
}