import { IProduct } from '../../types';

export class Products {
    private _items: IProduct[];
    private _selectedItem: IProduct | null;

    constructor() {
        this._items = [];
        this._selectedItem = null;
    }

    setItems(products: IProduct[]): void {
        this._items = products;
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getItemById(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    setSelectedItem(product: IProduct | null): void {
        this._selectedItem = product;
    }

    getSelectedItem(): IProduct | null {
        return this._selectedItem;
    }
}