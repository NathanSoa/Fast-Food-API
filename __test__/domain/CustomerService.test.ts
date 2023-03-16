import { beforeAll, describe, expect, it } from 'vitest'
import { v4 as uuid } from 'uuid'
import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { Meal } from '../../src/application/domain/Meal'
import { Restaurant } from '../../src/application/domain/Restaurant'
import { findMeal } from '../../src/application/useCases/Customer/findMeal'
import { Order } from '../../src/application/domain/Order'
import { placeOrder } from '../../src/application/useCases/Customer/placeOrder'

describe('Customer use cases', () => {

    const mealRepository = new InMemoryMealRepository()
    const restaurantId = uuid()
    const restaurantRepository = new InMemoryRestaurantRepository()

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

        mealRepository.items.push(Meal.withRestaurant({
            name: 'Burger',
            categories: [
                'Fast Food'
            ],
            price: 20,
            description: 'Very Nice Burger',
            restaurant: testRestaurant
        }))

        mealRepository.items.push(Meal.withRestaurant({
            name: 'Mega Burger',
            categories: [
                'Fast Food'
            ],
            price: 30,
            description: 'Very Nice Mega Burger',
            restaurant: testRestaurant
        }))

        mealRepository.items.push(Meal.withRestaurant({
            name: 'Salad',
            categories: [
                'Health'
            ],
            price: 10,
            description: 'Very Nice Salad',
            restaurant: testRestaurant
        }))

        mealRepository.items.push(Meal.withoutRestaurant({
            name: 'French Fries',
            categories: [
                'Fast Food'
            ],
            price: 15,
            description: 'Very Nice French Fries'
        }))
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

    it('should throw an error if invalid meal is sent to place an order', async () => {
        const frenchFries = mealRepository.items.find(meal => meal.name === 'French Fries')
        const burger = mealRepository.items.find(meal => meal.name === 'Burger')

        const order = Order.NewOne({
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
        })

        expect(placeOrder(order, restaurantRepository)).rejects.toThrow()
    })
})