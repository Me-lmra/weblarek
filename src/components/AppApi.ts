import { IApi } from '../types';
import { IProductResponse, IOrderRequest, IOrderResponse } from '../types';


export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductResponse> {
        return this.api.get<IProductResponse>('/product/');
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}