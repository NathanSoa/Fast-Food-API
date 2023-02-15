import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { RestaurantCreateDTO } from '../../src/application/dto/RestaurantDTO'
import { RestaurantService } from '../../src/application/ports/in/RestaurantService'
import { RestaurantServiceImpl } from '../../src/application/service/RestaurantServiceImpl'
import { Meal } from '../../src/application/domain/Meal'
import { Restaurant } from '../../src/application/domain/Restaurant'

describe('Restaurant use cases', () => {

    const restaurantRepository = new InMemoryRestaurantRepository()
    const mealRepository = new InMemoryMealRepository()
    const restaurantService: RestaurantService = new RestaurantServiceImpl(restaurantRepository, mealRepository)

    beforeEach(() => {
        restaurantRepository.items = new Array()
        mealRepository.items = new Array()
    })

    it('should create a new restaurant', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        const createdRestaurant = await restaurantService.register(restaurantCreateDTO)

        expect(restaurantRepository.items.length).toBe(1)
        expect(createdRestaurant.id).toBeTruthy()
        expect(createdRestaurant.meals.length).toBe(0)

    })

    it('should throw an error if user try to register a restaurant with duplicated name', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        await restaurantService.register(restaurantCreateDTO)

        expect(restaurantService.register(restaurantCreateDTO)).rejects.toThrow()
    })

    it('should add a new meal to restaurant', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        const meal = new Meal({
            name: "Pizza",
            description: "Pizza",
            price: 30,
            restaurant: undefined,
            categories: [
                "Pizza",
                "Fast Food"
            ]
        })

        mealRepository.items.push(meal)
        let restaurant = await restaurantService.register(restaurantCreateDTO)
        restaurant = await restaurantService.addMeal(restaurant.id, meal.id)

        expect(mealRepository.items[0].restaurant).toBeTruthy()
        expect(restaurant.meals.length).toBe(1)
    })
})