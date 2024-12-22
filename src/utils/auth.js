import { baseUrl, checkResponse  } from "./api";


export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

async function signUp({ email, password, name, avatar }) {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  });
  
  return checkResponse(res); // Ensure this returns the response
}

async function logIn({ email, password }) {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
}

async function getUserProfile(token) {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
}

async function handleEditProfile({ name, avatar }, token) {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  return checkResponse(res);
}

async function addCardLike(id, token) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
}

async function removeCardLike(id, token) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
}

export {
  signUp,
  logIn,
  getUserProfile,
  handleEditProfile,
  addCardLike,
  removeCardLike,
};
