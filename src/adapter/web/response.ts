export class AppResponse {
    
    private constructor(
        private readonly status: string,
        private readonly content: any
    ){}

    static success(content: any): AppResponse {
        return new AppResponse('Success', content || 'No content')
    }

    static error(content: any): AppResponse {
        return new AppResponse('Error', content || 'No content')
    }
}