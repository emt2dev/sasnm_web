import { Full__Product } from "../Products/Full__Product";

export class Base__Cart {
    /**
     *
     */
    constructor(public id: string, public customerId: string, public companyId: string, public productsList: Array<Full__Product>, public total_Amount: number, public abandoned: Boolean, public submitted: Boolean) {
        id = id;
        customerId = customerId;
        companyId = companyId;
        productsList = productsList;
        total_Amount = total_Amount;
        abandoned = abandoned;
        submitted = submitted;
    }
}