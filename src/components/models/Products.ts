import { IProduct } from '../../types';

export class Products {
    private items: IProduct[];
    private selectedItem: IProduct | null;

    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    setItems(products: IProduct[]): void {
        this.items = products;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setSelectedItem(product: IProduct | null): void {
        this.selectedItem = product;
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }
}