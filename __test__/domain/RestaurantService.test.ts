import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { RestaurantCreateDTO } from '../../src/application/dto/RestaurantDTO'
import { Meal } from '../../src/application/domain/Meal'
import { register } from '../../src/application/useCases/Restaurant/register'
import { addMeal } from '../../src/application/useCases/Restaurant/addMeal'
import { removeMeal } from '../../src/application/useCases/Restaurant/removeMeal'

describe('Restaurant use cases', () => {

    const restaurantRepository = new InMemoryRestaurantRepository()
    const mealRepository = new InMemoryMealRepository()

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

        const createdRestaurant = await register(restaurantCreateDTO, restaurantRepository)

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

        await register(restaurantCreateDTO, restaurantRepository)

        expect(register(restaurantCreateDTO, restaurantRepository)).rejects.toThrow()
        expect(restaurantRepository.items.length).toBe(1)
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

        const meal = Meal.withoutRestaurant({
            name: "Pizza",
            description: "Pizza",
            price: 30,
            categories: [
                "Pizza",
                "Fast Food"
            ]
        })

        mealRepository.items.push(meal)
        let restaurant = await register(restaurantCreateDTO, restaurantRepository)
        restaurant = await addMeal(restaurant.id, meal.id, restaurantRepository, mealRepository)

        expect(mealRepository.items[0].restaurant).toBeTruthy()
        expect(restaurant.meals.length).toBe(1)
    })

    it('should throw an error if cannot find any restaurant', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        const meal = Meal.withoutRestaurant({
            name: "Pizza",
            description: "Pizza",
            price: 30,
            categories: [
                "Pizza",
                "Fast Food"
            ]
        })

        mealRepository.items.push(meal)
        await register(restaurantCreateDTO, restaurantRepository)
        
        expect(addMeal("2342342342af", meal.id, restaurantRepository, mealRepository)).rejects.toThrow()
    })

    it('should throw an error if cannot find any meal', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        const meal = Meal.withoutRestaurant({
            name: "Pizza",
            description: "Pizza",
            price: 30,
            categories: [
                "Pizza",
                "Fast Food"
            ]
        })

        mealRepository.items.push(meal)
        const restaurant = await register(restaurantCreateDTO, restaurantRepository)
        
        expect(addMeal(restaurant.id, "2342342342af", restaurantRepository, mealRepository)).rejects.toThrow()
    })

    it('should remove a meal', async () => {
        const restaurantCreateDTO: RestaurantCreateDTO = {
            name: "Great Restaurant",
            address: {
                streetName:"Restaurant street",
                zipCode: "123321",
                cityName: "Restaurant city",
                stateName: "RS"
            }
        }

        const meal = Meal.withoutRestaurant({
            name: "Pizza",
            description: "Pizza",
            price: 30,
            categories: [
                "Pizza",
                "Fast Food"
            ]
        })

        mealRepository.items.push(meal)
        let restaurant = await register(restaurantCreateDTO, restaurantRepository)
        restaurant.meals.push(meal)

        restaurant = await removeMeal(restaurant.id, meal.id, restaurantRepository, mealRepository)
        
        expect(restaurant.meals.length).toBe(0)
        expect(meal.restaurant).toBeFalsy()
    })
})