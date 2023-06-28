import { Base__Product } from "../DTOs/Products/Base__Product";

export class PagedResults {
    /**
     *
     */
    constructor(public TotalCount: number, public PageNumber: number, public RecordNumber: number, public Records: Array<Base__Product>) {
        TotalCount = TotalCount;
        PageNumber = PageNumber;
        RecordNumber = RecordNumber;
        Records = Records;
    }

}