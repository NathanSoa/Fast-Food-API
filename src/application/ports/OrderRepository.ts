import { Order, OrderStatus } from '../domain/Order'

export interface OrderRepository {

    save(order: Order): Promise<Order>
    findById(id: string): Promise<Order>
    updateStatus(id: string, orderStatus: OrderStatus): Promise<void>
}