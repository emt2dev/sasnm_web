import { v2_ProductDTO } from "./v2_ProductStripe";
import { v2_StaffDTO } from "./v2_Staff";


export class v2_CompanyDTO {
    constructor(public id: number , public name: string , public description: string, public phoneNumber: string, public addressStreet: string, public addressSuite: string, public addressCity: string, public addressState: string, public addressPostal_Code: string, public addressCountry: string, public smallTagline: string, public menuDescription: string, public headerImage: string, public aboutUsImageUrl: string, public locationImageUrl: string, public logoImageUrl: string, public miscImageUrl: string, public listOfAllProducts: Array<v2_ProductDTO>, public owner: v2_StaffDTO, public administratorOne: v2_StaffDTO, public administratorTwo: v2_StaffDTO) {
        id = id;
        name = name;
        description = description;
        phoneNumber = phoneNumber;
        addressCity = addressCity;
        addressCountry = addressCountry;
        addressPostal_Code = addressPostal_Code;
        addressState = addressState;
        addressStreet = addressStreet;
        addressSuite = addressSuite;
        smallTagline = smallTagline;
        menuDescription = menuDescription;
        headerImage = headerImage;
        aboutUsImageUrl = aboutUsImageUrl;
        locationImageUrl = locationImageUrl;
        logoImageUrl = logoImageUrl;
        miscImageUrl = miscImageUrl;
        listOfAllProducts = listOfAllProducts;
        owner = owner;
        administratorOne = administratorOne;
        administratorTwo = administratorTwo;
    }
}