
export class v2_ProductDTO {
    constructor(
        public id: number , 
        public companyId: number , 
        public stripeId: string , 
        public name: string , 
        public description: string , 
        public default_price: number , 
        public quantity: number , 
        public livemode: Boolean , 
        public package_dimensions: string , 
        public statement_descriptor: string , 
        public unit_label: string , 
        public shippable: Boolean , 
        public image: string , 
        public url: string , 
        public priceInString: string , 
        public seo: string , 
        public keyword: string , 
        public imageToBeUploaded: any)
        {
            id = id;
            companyId = companyId;
            stripeId = stripeId;
            name = name;
            description = description;
            default_price = default_price;
            quantity = quantity;
            livemode = livemode;
            package_dimensions = statement_descriptor;
            unit_label = unit_label;
            shippable = shippable;
            image = image;
            url = url;
            priceInString = priceInString;
            seo = seo;
            keyword = keyword;
            imageToBeUploaded = imageToBeUploaded;
    }
}