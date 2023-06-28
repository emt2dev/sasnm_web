import { Full__User } from "../APIUsers/Full__APIUser";
import { Full__Cart } from "../Carts/Full__Cart";
import { Full__Order } from "../Orders/Full__Order";
import { Full__Product } from "../Products/Full__Product";
import { Base__Company } from "./Base__Company";

export class Full__Company extends Base__Company {
/**
 *
 */
    constructor(Id: string, Name: string, Description: string, Address: string, PhoneNumber: string, public Id_admin_one: string, public Id_admin_two: string, public StaffList: Array<Full__User>, public Products: Array<Full__Product>, public Orders: Array<Full__Order>, public Carts: Array<Full__Cart>) {

        super(Id, Name, Description, Address, PhoneNumber);
        Id_admin_one = Id_admin_one;
        Id_admin_two = Id_admin_two;
        StaffList = StaffList;
        Products = Products;
        Orders = Orders;
        Carts = Carts;        
    }
}