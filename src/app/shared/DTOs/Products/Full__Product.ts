import { Base__Product } from "./Base__Product";

export class Full__Product extends Base__Product {

/**
 *
 */
constructor(Id: string,
    Name: string,
    Price_Normal: number,
    Price_Sale: number,
    ImageURL: string,
    CompanyId: string,
    Keyword: string, public Description: string, public Price_Current: number, public Modifiers: string) {
    super(Id,
        Name,
        Price_Normal,
        Price_Sale,
        ImageURL,
        CompanyId,
        Keyword,);
        Description = Description;
        Price_Current = Price_Current;
        Modifiers = Modifiers;
    }
}