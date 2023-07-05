import { Base__Product } from "./Base__Product";

export class Full__Product extends Base__Product {

/**
 *
 */
constructor(id: string,
    name: string,
    price_Normal: number,
    price_Sale: number,
    imageURL: string,
    companyId: string,
    keyword: string, public description: string, public price_Current: number, public modifiers: string, public quantity: number) {
    super(id,
        name,
        price_Normal,
        price_Sale,
        imageURL,
        companyId,
        keyword,);
        description = description;
        price_Current = price_Current;
        modifiers = modifiers;
        quantity = quantity;
    }
}