import { IProduct } from '../../types';

export class Basket {
    private _selectedItems: IProduct[];

    constructor() {
        this._selectedItems = [];
    }

    getItems(): IProduct[] {
        return this._selectedItems;
    }

    setItems(item: IProduct): void {
        this._selectedItems.push(item);
    }

    delete(id: string): void {
        if (this._selectedItems) {
            this._selectedItems = this._selectedItems.filter(itemId => itemId.id !== id);
        }
    }

    clean(): void {
        this._selectedItems = [];
    }

    getnumberItems(): number {
        return this._selectedItems.length
    }

    hasnumberItems(id: string): boolean {
        return this._selectedItems.some(element => id === element.id);
    }

    allPrices(): number {
        return this._selectedItems.reduce((acc: number, item: IProduct): number => {
            acc = acc + (item.price ?? 0);
            return acc
        }, 0)
    }
}