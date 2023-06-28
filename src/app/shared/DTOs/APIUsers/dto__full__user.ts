import { dto__base__user } from "./dto__base__user";
import { Full__Cart } from "../Carts/Full__Cart";
import { Full__Order } from "../Orders/Full__Order";

export class dto__full__user extends dto__base__user {
    /**
     *
     */
    constructor(email: string, password: string, public id: string, public name: string, public phoneNumber: string, public companyId: string, public isStaff: Boolean, public cartList: Array<Full__Cart>, public orderList: Array<Full__Order>) {
        super(email, password);
        id = id;
        name = name;
        phoneNumber = phoneNumber;
        companyId = companyId;
        isStaff = isStaff;
        cartList = cartList;
        orderList = orderList;
    }
}