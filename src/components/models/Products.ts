import { IProduct } from '../../types';
import {IEvents} from "../base/Events.ts";

export class Products {
    private items: IProduct[];
    private selectedItem: IProduct | null;

    constructor(protected events: IEvents) {
        this.items = [];
        this.selectedItem = null;
    }

    setItems(products: IProduct[]): void {
        this.items = products;

        this.events.emit('catalog:changed', { items: this.items });
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setSelectedItem(product: IProduct | null): void {
        this.selectedItem = product;
        if (product) {
            this.events.emit('card:selected', { item: product });
        }

       this.events.emit('card:selected', { item: this.selectedItem });
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }
}