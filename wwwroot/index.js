import { createTable } from "./table.js";
import { makePagination } from "./pagination.js";
import { addClickHadlers } from "./event-handler.js";


const onDocumentLoad = async () => {
    await addClickHadlers();
    await createTable();
    makePagination();
}

$(document).ready(onDocumentLoad);