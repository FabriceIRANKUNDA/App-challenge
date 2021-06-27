import { removeSpinner, loadSpinner } from "./spinnerController.js";

const removePost = () => {
  const modal = document.querySelector(".backdrop");
  modal.parentNode.removeChild(modal);
};

const renderPost = (data, name) => {
  const post = `
      <div class="backdrop">
          <div class="modal">
            <header class="header">
              <h2>${data.title}</h2>
            </header>
            <div class="content">
              <p class="message">${data.body}</p>
            </div>
            <footer class="actions">
              <p>Posted by ${name}</p>
              <button class="action-btn">Okay</button>
            </footer>
          </div>
        </div>
      `;

  document.querySelector("#post").insertAdjacentHTML("afterbegin", post);
  document.querySelector(".backdrop").addEventListener("click", removePost);
};

export const viewPostHandler = (event) => {
  loadSpinner();
  const id = event.target.dataset.userId;
  const name = event.target.dataset.userName;
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      removeSpinner();
      renderPost(data, name);
    })
    .catch((err) => {
      removeSpinner();
      alert("Error, Please try again later.");
    });
};
