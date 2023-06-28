import { Base__User } from "./Base__APIUser";
import { Full__Cart } from "../Carts/Full__Cart";
import { Full__Order } from "../Orders/Full__Order";

export class Full__User extends Base__User {
    /**
     *
     */
    constructor(Email: string, Password: string, public id: string, public Name: string, public PhoneNumber: string, public CompanyId: string, public IsStaff: Boolean, public CartList: Array<Full__Cart>, public OrderList: Array<Full__Order>) {
        super(Email, Password);
        id = id;
        Name = Name;
        PhoneNumber = PhoneNumber;
        CompanyId = CompanyId;
        IsStaff = IsStaff;
        CartList = CartList;
        OrderList = OrderList;
    }
}