export interface requestResult<T> {
    status: number;
    msg: string;
    result: T;
}

export interface listResult<T> {
    total: number;
    data: Array<T>;
}




