import { Address } from '../domain/Address'
import { OrderItem } from '../domain/Order'

export type PlaceNewOrderDTO = {
    customerId: string
    restaurantId: string
    orderItems: OrderItem[]
    deliverAddress: Address
}

export type PayOrderDTO = {
    customerId: string, 
    orderId: string
}