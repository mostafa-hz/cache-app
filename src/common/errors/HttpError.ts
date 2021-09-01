export abstract class HttpError extends Error{
    abstract readonly statusCode: number;
    abstract readonly message: string;
}
