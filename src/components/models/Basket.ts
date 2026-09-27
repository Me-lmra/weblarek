import { IProduct } from '../../types';
import { IEvents}  from "../base/Events";

export class Basket {
    private selectedItems: IProduct[];

    constructor(protected events: IEvents) {
        this.selectedItems = [];
    }

    getItems(): IProduct[] {
        return this.selectedItems;
    }

    addItem(item: IProduct): void {
        this.selectedItems.push(item);

        this.events.emit('basket:changed');
    }

    delete(id: string): void {
        this.selectedItems = this.selectedItems.filter(product => product.id !== id);

        this.events.emit('basket:changed');
    }

    clean(): void {
        this.selectedItems = [];

        this.events.emit('basket:changed');
    }

    getItemsCount(): number {
        return this.selectedItems.length
    }

    hasItem(id: string): boolean {
        return this.selectedItems.some(element => id === element.id);
    }

    getTotalPrice(): number {
        return this.selectedItems.reduce((acc: number, item: IProduct): number => {
            acc = acc + (item.price ?? 0);
            return acc
        }, 0)
    }
}