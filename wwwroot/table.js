import { getUsers } from "./service.js";
import { bodyTemplate } from './templates/table-body.js';
import { actionsTemplate } from './templates/action-buttons.js';


const getTableBody = () => {
    return $('#table-body');
}

export async function createTable() {
    const table = $('#data-table')
    const users = await getUsers({
        page: 1,
        name: sessionStorage.getItem("filter-name"),
        login: sessionStorage.getItem("filter-login")
        }
    );
    const tableBody = createTableBody(users);
    table.append(tableBody)
}

function createTableBody(data) {
    const tableBodyTemplate = _.template(bodyTemplate);
    const items = data.map((item, index) => {
        const actionButtonsTemplate = _.template(actionsTemplate);
        item.actions = actionButtonsTemplate();
        return item;
    });

    return tableBodyTemplate({ items });
}

export function updateTable(data) {
    const htmlData = createTableBody(data);
    getTableBody().replaceWith(htmlData);
}