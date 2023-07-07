import { CartItem } from "../Products/CartItem";

export class shoppingCart {
    constructor(public id: number, public customerId: string, public companyId: string, public items: Array<CartItem>, public cost: any, public submitted: Boolean, public abandoned: Boolean) {
        id = id;
        customerId = customerId;
        companyId = companyId;
        items = items;
        cost = cost;
        abandoned = abandoned;
        submitted = submitted;
    }
}