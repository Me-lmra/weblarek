import { IBuyer } from '../../types';

export class Buyer {
    private _buyerData: IBuyer;
    private _errors: string;

    constructor() {
        this._buyerData = {
            payment: '',
            address: '',
            email: '',
            phone: '',
        };
        this._errors = '';
    }

    setBuyerData(data: Partial<IBuyer>): void {
        this._buyerData = {...this._buyerData, ...data};
    }

    getBuyerData(): IBuyer {
        return this._buyerData;
    }

    clearBuyerData(): void {
        this._buyerData = {
            payment: '',
            address: '',
            email: '',
            phone: '',
        };

        this._errors = '';
    }

    validateBuyer(): boolean {
        this._errors = '';
        if (this._buyerData.payment === '') {
            this._errors = "Необходимо указать способ оплаты";
            return false;
        }
        if (this._buyerData.address === '') {
            this._errors = "Необходимо указать адрес";
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (this._buyerData.email === '') {
            this._errors = "Необходимо указать адрес электронной почты";
            return false;
        } else if (!emailRegex.test(this._buyerData.email)) {
            this._errors = "Некорректный формат электронной почты (пример: user@mail.ru)";
            return false;
        }
        if (this._buyerData.phone === '') {
            this._errors = "Необходимо указать номер телефона";
            return false;
        }

        return true;
    }

    getErrors(): string {
        return this._errors;
    }
}