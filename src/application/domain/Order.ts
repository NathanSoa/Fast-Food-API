import { v4 as uuid } from 'uuid'
import { Address } from './Address'

export type OrderItem = {
    mealId: string,
    quantity: number
}

export enum OrderStatus {
    CANCELLED,
    AWAITING_PAYMENT,
    PAID,
    BEING_PREPARED,
    OUT_FOR_DELIVERY,
    DELIVERED
}

type OrderPropertiesWithoutStatus = {
    customerId: string,
    restaurantId: string,
    orderItems: OrderItem[],
    deliverAddress: Address
}

type OrderProperties = {
    customerId: string,
    restaurantId: string,
    orderItems: OrderItem[],
    deliverAddress: Address,
    status: OrderStatus
}

export class Order {
    id: string
    customerId: string
    restaurantId: string
    orderItems: OrderItem[]
    deliverAddress: Address
    status: OrderStatus

    private constructor(props: OrderProperties, id?:string) {
        this.id = id || uuid()
        this.customerId = props.customerId
        this.restaurantId = props.restaurantId
        this.orderItems = props.orderItems
        this.deliverAddress = props.deliverAddress
        this.status = props.status
    }

    static NewOne(props: OrderPropertiesWithoutStatus) {
        return new Order({...props, status: OrderStatus.AWAITING_PAYMENT})
    }
}