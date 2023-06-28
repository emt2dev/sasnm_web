import { Base__Company } from "../DTOs/Companies/Base__Company";

export class PagedResults {
    /**
     *
     */
    constructor(public TotalCount: number, public PageNumber: number, public RecordNumber: number, public Records: Array<Base__Company>) {
        TotalCount = TotalCount;
        PageNumber = PageNumber;
        RecordNumber = RecordNumber;
        Records = Records;
    }

}