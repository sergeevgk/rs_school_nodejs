export const bodyTemplate = `
<tbody id='table-body'>
    <% items.forEach(function(item) { %>
        <tr>
          <td class="pa3 bb b--black-10">
            <%= item.id %>
          </td>
          <td class="pa3 bb b--black-10">
            <%= item.name %>
          </td>
          <td class="pa3 bb b--black-10">
            <%= item.login %>
          </td>
          <td class="pa3 bb b--black-10">
            <%= item.registeredAt %>
          </td>
          <td class="pa3 bb b--black-10">
            <%= item.numberOfTasks %>
          </td>
          <td>
            <%= item.actions %>
          </td>
        </tr>
    <% }); %>
</tbody>`;