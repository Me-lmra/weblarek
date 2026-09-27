import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ICard } from "../../types";
import {ICardActions  } from "../../types";


export class Card extends Component<ICard> {
    protected titleCardElement: HTMLElement;
    protected priceCardElement: HTMLElement;

    constructor(container: HTMLElement, protected actions?: ICardActions) {
        super(container);
        this.titleCardElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceCardElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleCardElement.textContent = value;
    }

    set price(value: number | null) {
        value === null
        ? this.priceCardElement.textContent = "Бесценно"
        : this.priceCardElement.textContent = `${value} синапсов`;
    }
}

export class CatalogCard extends Card {
    protected imageCardElement: HTMLImageElement;
    protected categoryCardElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);

        this.imageCardElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryCardElement = ensureElement<HTMLElement>('.card__category', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }

    set image(value: string) {
        this.imageCardElement.src = value;
    }

    set category(value: string) {
        this.categoryCardElement.textContent = value;
    }

    set categoryClass(className: string) {
        this.categoryCardElement.className = `card__category ${className}`;
    }

}

export class BasketCard extends Card {
    protected indexCardElement: HTMLElement;
    protected deleteCardButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);

        this.indexCardElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteCardButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.deleteCardButton.addEventListener('click', actions.onClick);
        }
    }

    set index(value: number) {
        this.indexCardElement.textContent = String(value);
    }
}


export class PreviewCard extends Card {
    protected imageCardElement: HTMLImageElement;
    protected categoryCardElement: HTMLElement;
    protected textCardElement: HTMLElement;
    protected actionButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);

        this.imageCardElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryCardElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.textCardElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.actionButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        if (actions?.onClick) {
            this.actionButton.addEventListener('click', actions.onClick);
        }
    }

    set price(value: number | null) {
        super.price = value; // отдаем родителю отрисовать текст цены или 'Бесценно'

        if (value === null) {
            this.actionButton.disabled = true;
            this.actionButton.textContent = 'Недоступно';
        } else {
            this.actionButton.disabled = false;
        }
    }

    set buttonText(value: string) {
        this.actionButton.textContent = value;
    }

    set image(value: string) {
        this.imageCardElement.src = value;
    }

    set category(value: string) {
        this.categoryCardElement.textContent = value;
    }

    set categoryClass(className: string) {
        this.categoryCardElement.className = `card__category ${className}`;
    }

    set description(value: string) {
        this.textCardElement.textContent = value;
    }
}


