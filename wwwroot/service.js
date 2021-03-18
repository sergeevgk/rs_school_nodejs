const PAGE_SIZE = 5; 
const url = 'http://localhost:4000/users';

export const getUsers = async (params) => {
  const paramString = constructQueryString(params);
  const urlWithQuery = `${url}?${paramString}`;
  
  let response = await fetch(urlWithQuery);
  if (response.ok) {
    let json = await response.json();
    console.log(json)
    return json;
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
  return null;
}

const constructQueryString = (queryParams) => {
  let paramString = '';
  Object.entries(getQueryParams(queryParams)).forEach(entry =>{
    const [key, value] = entry;
    paramString += `${key}=${value}&`
  });
  paramString = paramString.slice(0,-1);
  return paramString;
}

const getQueryParams = ({ name, login, page }) => {
  return {name: name, login: login, skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE};
}




