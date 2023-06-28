import { Full__Product } from "../Products/Full__Product";

export class Base__Order {
    /**
     *
     */
    constructor(public Id: string,
        public deliveryDriver_Id: number,
        public Customer_Id: string,
        public CompanyId: string,
        public CartId: string,
        public Products: Array<Full__Product>,
        public DestinationAddress: string,
        public CurrentStatus: string,
        public Time__Touched: Date,
        public Time__Delivered: Date,
        public Payment_Complete: Boolean) {
            Id = Id;
            deliveryDriver_Id = deliveryDriver_Id;
            Customer_Id = Customer_Id;
            CompanyId = CompanyId;
            CartId = CartId;
            Products = Products;
            DestinationAddress = DestinationAddress;
            CurrentStatus = CurrentStatus;
            Time__Touched = Time__Touched;
            Time__Delivered = Time__Delivered;
            Payment_Complete = Payment_Complete;
    }
}