
export class newProductDTO {
    constructor(public Id: string, public Name: string, public Price_Normal: number, public Price_Sale: number, public ImageURL: any, public CompanyId: string, public Keyword: string) {
        Id = Id;
        Name = Name;
        Price_Normal = Price_Normal;
        Price_Sale = Price_Sale;
        ImageURL = ImageURL;
        CompanyId = CompanyId;
        Keyword = Keyword;
    }
}