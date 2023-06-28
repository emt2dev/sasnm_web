import { Base__Order } from "../DTOs/Orders/Base__Order";

export class PagedResults {
    /**
     *
     */
    constructor(public TotalCount: number, public PageNumber: number, public RecordNumber: number, public Records: Array<Base__Order>) {
        TotalCount = TotalCount;
        PageNumber = PageNumber;
        RecordNumber = RecordNumber;
        Records = Records;
    }

}