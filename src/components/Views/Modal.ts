import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { IModalData } from "../../types";

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButton.addEventListener('click', () => this.close());

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');

        this.events.emit('modal:open'); // заблокировать скролл страницы
    }

    close(): void {
        this.container.classList.remove('modal_active');

        this.events.emit('modal:close');
    }
}
