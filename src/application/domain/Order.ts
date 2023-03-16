import { v4 as uuid } from 'uuid'
import { Address } from './Address'

export type OrderItem = {
    mealId: string,
    quantity: number
}

type OrderProperties = {
    customerId: string,
    restaurantId: string,
    orderItems: OrderItem[],
    deliverAddress: Address
}

export class Order {
    id: string
    customerId: string
    restaurantId: string
    orderItems: OrderItem[]
    deliverAddress: Address

    private constructor(props: OrderProperties, id?:string) {
        this.id = id || uuid()
        this.customerId = props.customerId
        this.restaurantId = props.restaurantId
        this.orderItems = props.orderItems
        this.deliverAddress = props.deliverAddress
    }

    static NewOne(props: OrderProperties) {
        return new Order(props)
    }
}