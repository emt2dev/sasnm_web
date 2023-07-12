export class v2_CustomerDTO {
    constructor(public id: string , public name: string , public description: string, public addressStreet: string, public addressCity: string, public addressState: string, public addressPostal_Code: string, public currency: string, public livemode: Boolean, public password: string, public email: string) {
        id = id; name = name; description = description; addressStreet = addressStreet; addressCity = addressCity; addressState = addressState; addressPostal_Code = addressPostal_Code; currency = currency; livemode = false; password = ''; email = email;
    }
}