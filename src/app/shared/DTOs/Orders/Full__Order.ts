import { Full__Product } from "../Products/Full__Product";
import { Base__Order } from "./Base__Order";

export class Full__Order extends Base__Order {
    /**
     *
     */
    constructor(id: string,
        deliveryDriver_Id: number,
        customer_Id: string,
        companyId: string,
        cartId: string,
        products: Array<Full__Product>,
        destinationAddress: string,
        currentStatus: string,
        time__Touched: Date,
        time__Delivered: Date,
        payment_Complete: Boolean, public destination_latitude: string, public destination_longitude: string, public payment_Amount: number, public Time_Submitted: Date) {
        super(id, deliveryDriver_Id, customer_Id, companyId, cartId, products, destinationAddress, currentStatus, time__Touched, time__Delivered, payment_Complete);
            destination_latitude = destination_latitude;
            destination_longitude = destination_longitude;
            payment_Amount = payment_Amount;
            Time_Submitted = Time_Submitted;
    }
}