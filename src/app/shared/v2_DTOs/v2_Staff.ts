export class v2_StaffDTO {
    constructor(public id: string , public name: string , public position: string, public giveAdminPrivledges: Boolean, public longitude: string, public latitude: string, public coordinates: string, public password: string, public email: string) {
        id = id; name = name; position = position; giveAdminPrivledges = giveAdminPrivledges; longitude = longitude; latitude = latitude; coordinates = coordinates; password = ''; email = email;
    }
}