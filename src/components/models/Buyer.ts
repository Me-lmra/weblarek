import { IBuyer } from '../../types';

export const DEFAULT_BUYER_DATA: IBuyer = {
    payment: '',
    address: '',
    email: '',
    phone: '',
};

export class Buyer {
    private buyerData: IBuyer;

    constructor() {
        this.buyerData = {...DEFAULT_BUYER_DATA};
    }

    setBuyerData(data: Partial<IBuyer>): void {
        this.buyerData = {...this.buyerData, ...data};
    }

    getBuyerData(): IBuyer {
        return this.buyerData;
    }

    clearBuyerData(): void {
        this.buyerData = {...DEFAULT_BUYER_DATA};
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

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