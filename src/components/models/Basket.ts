import { IProduct } from '../../types';

export class Basket {
    private selectedItems: IProduct[];

    constructor() {
        this.selectedItems = [];
    }

    getItems(): IProduct[] {
        return this.selectedItems;
    }

    addItem(item: IProduct): void {
        this.selectedItems.push(item);
    }

    delete(id: string): void {
        this.selectedItems = this.selectedItems.filter(product => product.id !== id);
    }

    clean(): void {
        this.selectedItems = [];
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