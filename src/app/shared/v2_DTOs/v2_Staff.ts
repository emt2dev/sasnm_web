export class v2_StaffDTO {
    constructor(public id: string , public name: string , public position: string, public giveAdminPrivledges: Boolean, public longitude: string, public latitude: string, public coordinates: string, public password: string, public email: string, public addressStreet: string, public addressSuite: string, public addressCity: string, public addressState: string, public addressPostal_Code: string, public addressCountry: string, public phoneNumber: string) {
        id = id; name = name; position = position; giveAdminPrivledges = giveAdminPrivledges; longitude = longitude; latitude = latitude; coordinates = coordinates; password = ''; email = email; addressStreet = addressStreet; addressCity = addressCity; addressState = addressState; addressPostal_Code = addressPostal_Code; addressState=addressState;
        phoneNumber = phoneNumber;
    }
}