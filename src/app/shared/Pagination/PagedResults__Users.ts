import { Base__User } from "../DTOs/APIUsers/Base__APIUser";

export class PagedResults {
    /**
     *
     */
    constructor(public TotalCount: number, public PageNumber: number, public RecordNumber: number, public Records: Array<Base__User>) {
        TotalCount = TotalCount;
        PageNumber = PageNumber;
        RecordNumber = RecordNumber;
        Records = Records;
    }

}