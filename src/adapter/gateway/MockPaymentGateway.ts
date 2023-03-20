import { PaymentGateway } from '../../application/ports/PaymentGateway'

export class MockPaymentGateway implements PaymentGateway {

    async process(amount: number, cardNumber: string): Promise<boolean> {
        return true;
    }
}