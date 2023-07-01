import { Base__Product } from "../DTOs/Products/Base__Product";

export class PagedResults {
    /**
     *
     */
    constructor(public totalCount: number, public pageNumber: number, public recordNumber: number, public records: Array<Base__Product>) {
        totalCount = totalCount;
        pageNumber = pageNumber;
        recordNumber = recordNumber;
        records = records;
    }

}