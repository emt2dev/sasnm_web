import { Base__Company } from "../DTOs/Companies/Base__Company";

export class PagedResults {
    /**
     *
     */
    constructor(public totalCount: number, public pageNumber: number, public recordNumber: number, public records: Array<Base__Company>) {
        totalCount = totalCount;
        pageNumber = pageNumber;
        recordNumber = recordNumber;
        records = records;
    }

}