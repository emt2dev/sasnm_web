import { Base__Cart } from "../DTOs/Carts/Base__Cart";

export class PagedResults {
    /**
     *
     */
    constructor(public TotalCount: number, public PageNumber: number, public RecordNumber: number, public Records: Array<Base__Cart>) {
        TotalCount = TotalCount;
        PageNumber = PageNumber;
        RecordNumber = RecordNumber;
        Records = Records;
    }

}