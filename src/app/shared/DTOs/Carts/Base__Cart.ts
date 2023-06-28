import { Full__Product } from "../Products/Full__Product";

export class Base__Cart {
    /**
     *
     */
    constructor(public Id: string, public CustomerId: string, public CompanyId: string, public ProductsList: Array<Full__Product>, public Total_Amount: number, public Abandoned: Boolean, public Submitted: Boolean) {
        Id = Id;
        CustomerId = CustomerId;
        CompanyId = CompanyId;
        ProductsList = ProductsList;
        Total_Amount = Total_Amount;
        Abandoned = Abandoned;
        Submitted = Submitted;
    }
}