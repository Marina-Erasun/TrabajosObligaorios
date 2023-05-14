import { users } from "./user.js";
const user = JSON.parse(users);
const list = document.querySelector("ul");

user.forEach(el => {
  const usr = `
    <li>${el.name.first} ${el.name.last} / ${el.location.street.name} ${el.location.street.number} /<img src=${el.picture.thumbnail}> </li>
    `;
  list.innerHTML += usr;
});
