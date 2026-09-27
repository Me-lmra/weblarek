import { IBuyer } from '../../types';
import { IEvents } from "../base/Events";
import { TPayment } from "../../types";

export type TByuer = Partial<Record<keyof IBuyer, string>>;

export const DEFAULT_BUYER_DATA: IBuyer = {
    payment: '',
    address: '',
    email: '',
    phone: '',
};

export class Buyer {
    private buyerData: IBuyer;

    constructor(protected events: IEvents) {
        this.buyerData = {...DEFAULT_BUYER_DATA};
    }


    setOrderField(field: keyof IBuyer, value: string): void {
        if (field === 'payment') {
            this.buyerData[field] = value as TPayment;
        } else {
            this.buyerData[field] = value;
        }


        this.events.emit('buyer:changed', this.validate());
    }

    /*setBuyerData(data: Partial<IBuyer>): void {
        this.buyerData = {...this.buyerData, ...data};
    }*/

    getBuyerData(): IBuyer {
        return this.buyerData;
    }

    clearBuyerData(): void {
        this.buyerData = {...DEFAULT_BUYER_DATA};

        this.events.emit('buyer:changed', this.validate());
    }

    validate(): TByuer{
        const errors: TByuer = {};

        if (this.buyerData.payment === '') {
            errors.payment = "Необходимо указать способ оплаты";
        }
        if (this.buyerData.address === '') {
            errors.address = "Необходимо указать адрес";
        }
        if (this.buyerData.email === '') {
            errors.email = "Необходимо указать адрес электронной почты";
        }
        if (this.buyerData.phone === '') {
            errors.phone = "Необходимо указать номер телефона";
        }

        return errors;
    }
}