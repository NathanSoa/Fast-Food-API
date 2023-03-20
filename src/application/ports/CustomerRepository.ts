import { Customer } from '../domain/Customer'
import { CreateCustomerDTO } from '../dto/CustomerDTO'

export interface CustomerRepository {

    findById(id: string): Promise<Customer>
    register(createCustomerDTO: CreateCustomerDTO): Promise<Customer>
}