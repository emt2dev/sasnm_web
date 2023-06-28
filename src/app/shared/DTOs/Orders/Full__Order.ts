import { Full__Product } from "../Products/Full__Product";
import { Base__Order } from "./Base__Order";

export class Full__Order extends Base__Order {
    /**
     *
     */
    constructor(Id: string,
        deliveryDriver_Id: number,
        Customer_Id: string,
        CompanyId: string,
        CartId: string,
        Products: Array<Full__Product>,
        DestinationAddress: string,
        CurrentStatus: string,
        Time__Touched: Date,
        Time__Delivered: Date,
        Payment_Complete: Boolean, public Destination_latitude: string, public Destination_longitude: string, public Payment_Amount: number, public Time_Submitted: Date) {
        super(Id, deliveryDriver_Id, Customer_Id, CompanyId, CartId, Products, DestinationAddress, CurrentStatus, Time__Touched, Time__Delivered, Payment_Complete);
            Destination_latitude = Destination_latitude;
            Destination_longitude = Destination_longitude;
            Payment_Amount = Payment_Amount;
            Time_Submitted = Time_Submitted;
    }
}