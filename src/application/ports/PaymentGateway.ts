export interface PaymentGateway {
    process(amount: number, cardNumber: string): Promise<boolean>
}