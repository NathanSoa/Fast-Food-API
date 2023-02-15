export interface TokenGenerator {
    generate(username: string): Promise<string>
}