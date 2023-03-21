import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { v4 as uuid } from 'uuid'

import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { InMemoryOrderRepository } from '../../src/adapter/infra/repository/InMemoryOrderRepository'
import { InMemoryCustomerRepository } from '../../src/adapter/infra/repository/InMemoryCustomerRepository'

import { ErrorMockPaymentGateway, MockPaymentGateway } from '../../src/adapter/gateway/MockPaymentGateway'

import { Meal } from '../../src/application/domain/Meal'
import { Customer } from '../../src/application/domain/Customer'
import { Restaurant } from '../../src/application/domain/Restaurant'
import { OrderStatus } from '../../src/application/domain/Order'

import { findMeal } from '../../src/application/useCases/Customer/findMeal'
import { placeOrder } from '../../src/application/useCases/Customer/placeOrder'
import { payOrder } from '../../src/application/useCases/Customer/payOrder'

describe('Customer use cases', () => {

    const mealRepository = new InMemoryMealRepository()
    const restaurantRepository = new InMemoryRestaurantRepository()
    const orderRepository = new InMemoryOrderRepository()
    const customerRepository = new InMemoryCustomerRepository()

    const successPaymentGateway = new MockPaymentGateway()
    const failurePaymentGateway = new ErrorMockPaymentGateway()

    const restaurantId = uuid()
    const customerId = uuid()

    beforeAll(() => {
        mealRepository.items = new Array()

        const testRestaurant = Restaurant.withoutMeal({
            name: 'Test Restaurant',
            address: {
                cityName: 'City',
                stateName: 'State',
                streetName: 'Street',
                zipCode: 'Zip Code'
            }
        }, restaurantId)

        restaurantRepository.create(testRestaurant)

        const burger = Meal.withRestaurant({
            name: 'Burger',
            categories: [
                'Fast Food'
            ],
            price: 20,
            description: 'Very Nice Burger',
            restaurant: testRestaurant
        })

        const megaBurger = Meal.withRestaurant({
            name: 'Mega Burger',
            categories: [
                'Fast Food'
            ],
            price: 30,
            description: 'Very Nice Mega Burger',
            restaurant: testRestaurant
        })

        const salad = Meal.withRestaurant({
            name: 'Salad',
            categories: [
                'Health'
            ],
            price: 10,
            description: 'Very Nice Salad',
            restaurant: testRestaurant
        })

        mealRepository.items.push(Meal.withoutRestaurant({
            name: 'French Fries',
            categories: [
                'Fast Food'
            ],
            price: 15,
            description: 'Very Nice French Fries'
        }))

        mealRepository.items.push(burger, megaBurger, salad)
        testRestaurant.meals.push(burger, megaBurger, salad)

        const costumer = new Customer({
            birthdate: new Date('2000-01-01'),
            cardNumber: '1234 5678 9012',
            name: 'Customer'
        }, customerId)

        customerRepository.items.push(costumer)
    })

    beforeEach(() => {
        orderRepository.items = new Array()
    })

    it('should filter meals correctly', async () => {
        const restaurant = await restaurantRepository.findById(restaurantId)
        const filteredMeals = await findMeal(mealRepository, {restaurant: restaurant.id, maxPrice: 20})

        expect(filteredMeals).toBeTruthy()
        expect(filteredMeals.length).toBe(2)
    })

    it('should return all meals if no filter is sent', async () => {
        const filteredMeals = await findMeal(mealRepository, {})

        expect(filteredMeals).toBeTruthy()
        expect(filteredMeals.length).toBe(4)
    })

    it('should correctly place an order', async () => {
        const megaBurger = mealRepository.items.find(meal => meal.name === 'Mega Burger')
        const burger = mealRepository.items.find(meal => meal.name === 'Burger')

        const order = {
            customerId: uuid(),
            deliverAddress: {
                cityName: 'City',
                stateName: 'State',
                streetName: 'Street',
                zipCode: 'Zip Code'
            },
            orderItems: [
                {
                    mealId: megaBurger.id,
                    quantity: 1
                },
                {
                    mealId: burger.id,
                    quantity: 2
                }
            ],
            restaurantId
        }

        const newOrder = await placeOrder(order, restaurantRepository, orderRepository, mealRepository)

        expect(orderRepository.items.length).toBe(1)
        expect(newOrder.status).toBe(OrderStatus.AWAITING_PAYMENT)
        expect(newOrder.total).toBe(megaBurger.price + burger.price * 2)
    })

    it('should throw an error if invalid meal is sent to place an order', async () => {
        const frenchFries = mealRepository.items.find(meal => meal.name === 'French Fries')
        const burger = mealRepository.items.find(meal => meal.name === 'Burger')

        const order = {
            customerId: uuid(),
            deliverAddress: {
                cityName: 'City',
                stateName: 'State',
                streetName: 'Street',
                zipCode: 'Zip Code'
            },
            orderItems: [
                {
                    mealId: frenchFries.id,
                    quantity: 1
                },
                {
                    mealId: burger.id,
                    quantity: 2
                }
            ],
            restaurantId
        }

        expect(placeOrder(order, restaurantRepository, orderRepository, mealRepository)).rejects.toThrow()
    })

    it ('should correctly update the order status', async () => {
        const megaBurger = mealRepository.items.find(meal => meal.name === 'Mega Burger')
        const burger = mealRepository.items.find(meal => meal.name === 'Burger')

        const order = {
            deliverAddress: {
                cityName: 'City',
                stateName: 'State',
                streetName: 'Street',
                zipCode: 'Zip Code'
            },
            orderItems: [
                {
                    mealId: megaBurger.id,
                    quantity: 1
                },
                {
                    mealId: burger.id,
                    quantity: 2
                }
            ],
            restaurantId,
            customerId
        }

        let thisOrder = await placeOrder(order, restaurantRepository, orderRepository, mealRepository)

        const success = await payOrder({customerId, orderId: thisOrder.id}, orderRepository, customerRepository, successPaymentGateway)
    
        thisOrder = await orderRepository.findById(thisOrder.id)
        
        expect(success).toBeTruthy()
        expect(thisOrder.status).toBe(OrderStatus.PAID)
    })

    it('should throw when there\'s an error with payment', async () => {
        const megaBurger = mealRepository.items.find(meal => meal.name === 'Mega Burger')
        const burger = mealRepository.items.find(meal => meal.name === 'Burger')

        const order = {
            deliverAddress: {
                cityName: 'City',
                stateName: 'State',
                streetName: 'Street',
                zipCode: 'Zip Code'
            },
            orderItems: [
                {
                    mealId: megaBurger.id,
                    quantity: 1
                },
                {
                    mealId: burger.id,
                    quantity: 2
                }
            ],
            restaurantId,
            customerId
        }

        const thisOrder = await placeOrder(order, restaurantRepository, orderRepository, mealRepository)
        expect(payOrder({customerId, orderId: thisOrder.id}, orderRepository, customerRepository, failurePaymentGateway)).rejects.toThrow()
        expect(thisOrder.status).toBe(OrderStatus.AWAITING_PAYMENT)
    })
})