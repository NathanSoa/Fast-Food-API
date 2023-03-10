import { beforeAll, describe, expect, it } from 'vitest'
import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { Meal } from '../../src/application/domain/Meal'
import { Restaurant } from '../../src/application/domain/Restaurant'
import { findMeal } from '../../src/application/useCases/Customer/findMeal'

describe('Customer use cases', () => {

    const mealRepository = new InMemoryMealRepository()

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
        })

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
        const filteredMeals = await findMeal(mealRepository, {restaurant: 'Test Restaurant', maxPrice: 20})

        expect(filteredMeals).toBeTruthy()
        expect(filteredMeals.length).toBe(2)
    })

    it('should return all meals if no filter is sent', async () => {
        const filteredMeals = await findMeal(mealRepository, {})

        expect(filteredMeals).toBeTruthy()
        expect(filteredMeals.length).toBe(4)
    })
})