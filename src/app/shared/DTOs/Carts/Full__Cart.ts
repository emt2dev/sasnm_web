import { Full__Product } from "../Products/Full__Product";
import { Base__Cart } from "./Base__Cart";

export class Full__Cart extends Base__Cart {
    /**
     *
     */
    constructor(Id: string, CustomerId: string, CompanyId: string, ProductsList: Array<Full__Product>, Total_Amount: number, Abandoned: Boolean, Submitted: Boolean, Total_Discounted: number, Discount_Rate: number) {
        Total_Discounted = Total_Discounted;
        Discount_Rate = Discount_Rate;
        super(Id, CustomerId, CompanyId, ProductsList, Total_Amount,  Abandoned, Submitted);
        
    }
}