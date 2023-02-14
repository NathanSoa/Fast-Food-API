export class AppResponse {
    
    private constructor(
        private readonly status: string,
        private readonly content: any
    ){}

    static success(content: any): AppResponse {
        return new AppResponse('Success', content || 'No content')
    }

    static stringError(content: any): AppResponse {
        return new AppResponse('Error', content || 'No content')
    }

    static jsonError(content: any): AppResponse {
        return new AppResponse('Error', JSON.parse(content) || 'No content')
    }
}