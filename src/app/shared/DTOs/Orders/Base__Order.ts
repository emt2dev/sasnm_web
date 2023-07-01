import { Full__Product } from "../Products/Full__Product";

export class Base__Order {
    /**
     *
     */
    constructor(public id: string,
        public deliveryDriver_Id: number,
        public customer_Id: string,
        public companyId: string,
        public cartId: string,
        public products: Array<Full__Product>,
        public destinationAddress: string,
        public currentStatus: string,
        public time__Touched: Date,
        public time__Delivered: Date,
        public payment_Complete: Boolean) {
            id = id;
            deliveryDriver_Id = deliveryDriver_Id;
            customer_Id = customer_Id;
            companyId = companyId;
            cartId = cartId;
            products = products;
            destinationAddress = destinationAddress;
            currentStatus = currentStatus;
            time__Touched = time__Touched;
            time__Delivered = time__Delivered;
            payment_Complete = payment_Complete;
    }
}