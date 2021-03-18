export const paginationNavTemplate = `
<ul class="pagination">
    <% items.forEach(item => { %>
        <li class="page-item">
            <button id="<%= item.id %>" data-action="<%= item.action%>" class="page-link click-handled">
                <%= item.title %>
            </button>
        </li>
    <% }); %>
</ul>`;