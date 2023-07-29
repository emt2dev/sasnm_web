
export class v2_newProductDTO {
    constructor
    (
        public companyId: number,
        public name: string,
        public description: string,
        public default_price: number,
        public quantity: number,
        public imageToBeUploaded: File,
    )
    {
        companyId = companyId;
        name = name;
        description = description;
        default_price = default_price;
        quantity = quantity;
        imageToBeUploaded = imageToBeUploaded;
    }
}