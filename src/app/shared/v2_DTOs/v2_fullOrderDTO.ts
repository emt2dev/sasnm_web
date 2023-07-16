import { v2_ProductDTO } from "./v2_ProductStripe";
import { v2_ShoppingCartDTO } from "./v2_ShoppingCart";
import { v2_StaffDTO } from "./v2_Staff";


export class v2_fullOrderDTO {
    constructor(public id: number, public items: Array<v2_ProductDTO>, public delivery: Boolean, public deliveryAddress: string, public timeDelivered: string, public pickedUpByCustomer: Boolean, public timePickedUpByCustomer: string, public orderCompleted: Boolean, public status: string, public eta: string, public method: string) {
        id = id; items = items; delivery = delivery; timeDelivered = timeDelivered; pickedUpByCustomer = pickedUpByCustomer; timePickedUpByCustomer = timePickedUpByCustomer; orderCompleted = orderCompleted; status = status; eta = eta; method = method;
    }
}