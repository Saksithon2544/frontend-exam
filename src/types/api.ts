export interface ApiResponse<T> {
    [key: string]: T[] | unknown;
    total: number;
    limit: number;
    skip: number;
}