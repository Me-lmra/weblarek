export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface IBuyer {
    payment: 'card' | 'cash' | '';
    address: string;
    email: string;
    phone: string;
}

export interface IProductResponse {
    total: number;       // общее количество товаров на сервере
    items: IProduct[];   // сам массив товаров, который нам нужен
}

export interface IOrderRequest extends IBuyer {
    total: number;       // итоговая стоимость всей корзины
    items: string[];     // массив id (строк) купленных товаров
}

export interface IOrderResponse {
    id: string;          // уникальный id созданного заказа на сервере
    total: number;       // сумма
}