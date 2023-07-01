import { Base__Order } from "../DTOs/Orders/Base__Order";

export class PagedResults {
    /**
     *
     */
    constructor(public totalCount: number, public pageNumber: number, public recordNumber: number, public records: Array<Base__Order>) {
        totalCount = totalCount;
        pageNumber = pageNumber;
        recordNumber = recordNumber;
        records = records;
    }

}