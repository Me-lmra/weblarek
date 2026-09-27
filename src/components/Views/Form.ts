import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IFormState {
    valid: boolean;
    errors: string;
}

export class Form extends Component<IFormState> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            const formName = (this.container as HTMLFormElement).name;
            this.events.emit(`${formName}.${field}:change`, { field, value });
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const formName = (this.container as HTMLFormElement).name;
            this.events.emit(`${formName}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}

export class OrderForm extends Form {
    protected cardPayButton: HTMLButtonElement;
    protected cashPayButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.cardPayButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashPayButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.cardPayButton.addEventListener('click', () => {
            this.events.emit('order.payment:change', { target: 'card' });
        });

        this.cashPayButton.addEventListener('click', () => {
            this.events.emit('order.payment:change', { target: 'cash' });
        });
    }

    set payment(value: 'card' | 'cash' | '') {
        this.cardPayButton.classList.toggle('button_alt-active', value === 'card');
        this.cashPayButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}

export class ContactsForm extends Form {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}
