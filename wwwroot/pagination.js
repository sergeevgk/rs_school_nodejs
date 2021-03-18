import { getUsers } from './service.js';
import { updateTable } from './table.js';
import { paginationNavTemplate } from './templates/pagination-nav-buttons.js';

const getPageNumButton = () => {
    return $("#page-number-button");
}

const paginationButtons = [
    {
        id: "previous-button",
        title: "Previous",
        action: "prevPage"
    },
    {
        id: "page-number-button",
        title: "1",
        action: "doNothing"
    },
    {
        id: "next-button",
        title: "Next",
        action: "nextPage"
    },
];

export async function handleClick(shift = 1) {
    const pageNumButton = getPageNumButton();
    const pageNum = Number.parseInt(pageNumButton.text());
    const newPageNum = pageNum + shift;
    if (newPageNum <= 0) {
        return;
    }
    const usersData = await getUsers({
        page: newPageNum,
        name: sessionStorage.getItem("filter-name"),
        login: sessionStorage.getItem("filter-login")
        }
    );
    if (usersData.length !== 0) {
        updateTable(usersData);
        pageNumButton.html(newPageNum);
    }
}

function createPagination() {
    const paginationTemp = _.template(paginationNavTemplate);
    $("#table-pagination").append(paginationTemp({ items: paginationButtons }));
}

export function makePagination() {
    createPagination();

    paginationButtons.forEach(button => {
        if (button.onClick) {
            $(`#${button.id}`).click(button.onClick);
        }
    });
}