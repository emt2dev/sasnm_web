import { Full__User } from "../APIUsers/Full__APIUser";
import { Full__Cart } from "../Carts/Full__Cart";
import { Full__Order } from "../Orders/Full__Order";
import { Full__Product } from "../Products/Full__Product";
import { Base__Company } from "./Base__Company";

export class Full__Company extends Base__Company {
/**
 *
 */
    constructor(id: string, name: string, description: string, address: string, phoneNumber: string, public id_admin_one: string, public id_admin_two: string, public staffList: Array<Full__User>, public products: Array<Full__Product>, public orders: Array<Full__Order>, public carts: Array<Full__Cart>) {

        super(id, name, description, address, phoneNumber);
        id_admin_one = id_admin_one;
        id_admin_two = id_admin_two;
        staffList = staffList;
        products = products;
        orders = orders;
        carts = carts;        
    }
}