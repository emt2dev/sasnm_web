

export class CartItem {
    constructor(public id: number, public productId: string, public name: string, public price: number, public imageURL: string, public count: number, public description: string) {
        id = id;
        productId = productId;
        name = name;
        price = price;
        imageURL = imageURL;
        count = count;
        description = description;
    }
}