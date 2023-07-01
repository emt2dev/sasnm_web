import { Base__Cart } from "../DTOs/Carts/Base__Cart";

export class PagedResults {
    /**
     *
     */
    constructor(public totalCount: number, public pageNumber: number, public recordNumber: number, public records: Array<Base__Cart>) {
        totalCount = totalCount;
        pageNumber = pageNumber;
        recordNumber = recordNumber;
        records = records;
    }

}