import { Base__User } from "../DTOs/APIUsers/Base__APIUser";

export class PagedResults {
    /**
     *
     */
    constructor(public totalCount: number, public pageNumber: number, public recordNumber: number, public records: Array<Base__User>) {
        totalCount = totalCount;
        pageNumber = pageNumber;
        recordNumber = recordNumber;
        records = records;
    }

}