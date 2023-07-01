import { Full__Product } from "../Products/Full__Product";
import { Base__Cart } from "./Base__Cart";

export class Full__Cart extends Base__Cart {
    /**
     *
     */
    constructor(id: string, customerId: string, companyId: string, productsList: Array<Full__Product>, total_Amount: number, abandoned: Boolean, submitted: Boolean, total_Discounted: number, discount_Rate: number) {

        total_Discounted = total_Discounted;
        discount_Rate = discount_Rate;

        super(id, customerId, companyId, productsList, total_Amount,  abandoned, submitted);
        
    }
}