import {getFilterNameText, getFilterLoginText } from "./filter.js";
import { showPrompt } from "./create-form.js";
import { getUsers } from "./service.js"
import { updateTable } from "./table.js"
import { handleClick } from "./pagination.js"


const clickHandlers = {
    async applyFilter(event) {
        sessionStorage.setItem("filter-name", getFilterNameText());
        sessionStorage.setItem("filter-login", getFilterLoginText());
        const usersData = await getUsers({
            page: 1,
            name: sessionStorage.getItem("filter-name"),
            login: sessionStorage.getItem("filter-login")
            }
        );
        updateTable(usersData);
        //pageNumButton.html(newPageNum);
    },
    createUser(event){
        showPrompt("User form", () => {});
    },
    updateUser(event) {
        showPrompt("User form", () => {});
    },
    deleteUser(event) {
      alert("удаление");
    },
    nextPage(event) {
        handleClick(1);
    },
    prevPage(event){
        handleClick(-1);
    },
    doNothing(event){
        return;
    }
};

export const addClickHadlers = async () => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("click-handled")){
            clickHandlers[event.target.dataset.action](event);
        }
    });
}

