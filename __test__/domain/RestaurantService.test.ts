import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMealRepository } from '../../src/adapter/infra/repository/InMemoryMealRepository'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { RestaurantCreateDTO } from '../../src/application/dto/RestaurantDTO'
import { Meal } from '../../src/application/domain/Meal'
import { register } from '../../src/application/useCases/Restaurant/register'
import { addMeal } from '../../src/application/useCases/Restaurant/addMeal'

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
        let restaurant = await register(restaurantCreateDTO, restaurantRepository)
        restaurant = await addMeal(restaurant.id, meal.id, restaurantRepository, mealRepository)

        expect(mealRepository.items[0].restaurant).toBeTruthy()
        expect(restaurant.meals.length).toBe(1)
    })

    // testar caso quando id não é achado, opção repetida no restaurante
})