const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

function getItems() {
    return fetch(`${baseUrl}/items`)
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

function postItems({ name, imageUrl, weather }) {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(checkResponse);
  }
  
  function deleteItems(cardID) {
    return fetch(`${baseUrl}/items/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkResponse);
  }
  
  export { getItems, postItems, deleteItems, checkResponse };

