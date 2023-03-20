import { Customer } from '../../../application/domain/Customer';
import { CreateCustomerDTO } from '../../../application/dto/CustomerDTO';
import { CustomerRepository } from '../../../application/ports/CustomerRepository'

export class InMemoryCustomerRepository implements CustomerRepository {
    
    items = new Array()

    async findById(id: string): Promise<Customer> {
        return this.items.find(each => each.id === id)
    }
    
    async register(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const customer = new Customer(createCustomerDTO)
        this.items.push(customer)
        return customer
    }
}