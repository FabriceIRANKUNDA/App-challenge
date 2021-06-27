import { removeSpinner, loadSpinner } from "./spinnerController.js";
import { registerEventListerner } from "./utility.js";

const renderUsers = (data) => {
  const header = `<h2>All Users</h2>`;
  const html = data.map((user) => {
    return `
        <li>
            <div class="user">
                <div class="users__item">
                    <h3>${user.name}</h3>
                    <h4>${user.email}</h3>
                </div>
                <button class='post-btn' data-user-id=${user.id} data-user-name=${user.email}>view post</button>
            </div>
        </li>
        `;
  });
  html.unshift(header);
  html.join("");
  document.querySelector(".users").insertAdjacentHTML("afterbegin", html);
  return;
};

export const fetchUserData = () => {
  loadSpinner();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        alert("Error, Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      removeSpinner();
      renderUsers(data);
      registerEventListerner();
    })
    .catch((error) => {
      removeSpinner();
      alert("Error, Please try again later.");
    });
};
