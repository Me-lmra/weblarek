import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IBasketView } from "../../types";

export class ModalBasket extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.orderButton.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }

    set valid(value: boolean) {
        this.orderButton.disabled = !value;
    }
}
