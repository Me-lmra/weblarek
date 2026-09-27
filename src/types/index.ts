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

export type TPayment = 'card' | 'cash'

export interface IBuyer {
    payment: TPayment | '';
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

export interface IHeader {
    counter: number;
}

export interface IModalData {
    content: HTMLElement;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    id: string;
    title: string;
    price: number | null;
    category?: string;
    image?: string;
    description?: string;
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export interface ISuccessOrder {
    total: number;
}