import { User } from "./user"

export type Order = {
        user?: User;
		productName?: string;
        productWeight?: string;
        isEggless?: boolean;
        quantity?: number;
		totalAmount?: number;
		date?: Date;
		message?: string;
        deliveryDetails? : {
            name? : string;
            street? : string;
            city? : string;
            state? : string;
            pinCode? : string;
            phone? : string;
        };
        id?: number;
}