import { IProduct } from '../../types';

class Basket {
    private _selectedItems: IProduct[];

    constructor() {
        this._selectedItems = [];
    }

    getItems (): IProduct[] { // получение массива товаров в корзине (то, что уже лежит)
        return this._selectedItems;
    }

    setItems (item: IProduct[]): void { // добавление товара в массив корзины
        this._selectedItems.push();
    }

    delete(): void {
        if (this._selectedItems) {
            this._selectedItems.splice();
        }
    }
}