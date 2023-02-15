import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryRestaurantRepository } from '../../src/adapter/infra/repository/InMemoryRestaurantRepository'
import { RestaurantCreateDTO } from '../../src/application/dto/RestaurantDTO'
import { RestaurantService } from '../../src/application/ports/in/RestaurantService'
import { RestaurantServiceImpl } from '../../src/application/service/RestaurantServiceImpl'

describe('Restaurant use cases', () => {

    const restaurantRepository = new InMemoryRestaurantRepository()
    const restaurantService: RestaurantService = new RestaurantServiceImpl(restaurantRepository)

    beforeEach(() => {
        restaurantRepository.items = new Array()
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
})