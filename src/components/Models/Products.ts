import { IProduct } from '../../types';

class Products {
    private _items: IProduct[];
    private _selectedItem: IProduct | null;

    constructor() {
        this._items = [];
        this._selectedItem = null;
    }

    setItems(products: IProduct[]): void { // принимает готовый массив товаров и записывает его в приватное поле _items и хранит
        this._items = products;
    }

    getItems(): IProduct[] { // отдает наружу весь массив товаров, который сейчас хранится в модели
        return this._items;
    }

    getItemById(id: string): IProduct | undefined { // получает
        return this._items.find(item => item.id === id); // проверяет есть ли товар с таким id
    }

    setSelectedItem(product: IProduct | null): void {
        this._selectedItem = product; // записывает выбранный товар в поле/сохраняет
    }

    getSelectedItem(): IProduct | null { // получает/возвращает товар, который был сохранён
        return this._selectedItem;
    }
}