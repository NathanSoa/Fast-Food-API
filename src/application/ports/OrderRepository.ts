import { Order } from '../domain/Order'

export interface OrderRepository {

    save(order: Order): Promise<Order>
    findById(id: string): Promise<Order>
}