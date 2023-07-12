import { v2_ShoppingCartDTO } from "./v2_ShoppingCart";
import { v2_StaffDTO } from "./v2_Staff";


export class v2_OrderDTO {
    constructor(public id: number , public cart: v2_ShoppingCartDTO, public driver: v2_StaffDTO, public delivery: Boolean, public timeDelivered: string, public pickedUpByCustomer: Boolean, public timePickedUpByCustomer: string, public orderCompleted: Boolean) {
        id = id; cart = cart; driver = driver; delivery = delivery; timeDelivered = timeDelivered; pickedUpByCustomer = pickedUpByCustomer; timePickedUpByCustomer = timePickedUpByCustomer; orderCompleted = orderCompleted;
    }
}