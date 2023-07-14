import { v2_ProductDTO } from "./v2_ProductStripe";

export class v2_ShoppingCartDTO {
    constructor(public id: number , public companyId: number, public customerId: string , public items: Array<v2_ProductDTO>, public cost: number, public submitted: Boolean, public abandoned: Boolean, public costInString: string) {
        id = id; companyId = companyId; customerId = customerId; items = items; cost = cost; submitted = submitted; abandoned = abandoned;
    }
}