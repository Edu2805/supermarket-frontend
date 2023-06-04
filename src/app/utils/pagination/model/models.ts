export interface Page<T> {
    content: Array<T>,
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort?: any,
    numberOfElements: number,
    first: boolean,
    empty: boolean
}
