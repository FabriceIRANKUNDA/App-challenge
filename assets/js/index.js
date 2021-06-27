function removeSpinner() {
  const spinner = document.querySelector(".ring");
  document.querySelector(".spinner").classList.remove("backdrop-bg");
  spinner.parentNode.removeChild(spinner);
  return;
}
function loadSpinner() {
  document.querySelector(".spinner").classList.add("backdrop-bg");
  const spinner = `
    <div class="ring">
      Loading
      <span></span>
    </div>`;
  document.querySelector(".spinner").insertAdjacentHTML("afterbegin", spinner);
}
function removePost() {
  const modal = document.querySelector(".backdrop");
  modal.parentNode.removeChild(modal);
}

function renderPost(data) {
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
            <button class="action-btn">Okay</button>
          </footer>
        </div>
      </div>
    `;

  document.querySelector("#post").insertAdjacentHTML("afterbegin", post);
  document.querySelector(".backdrop").addEventListener("click", removePost);
}

function viewPostHandler(event) {
  loadSpinner();
  const id = event.target.dataset.userId;
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      removeSpinner();
      renderPost(data);
    })
    .catch((err) => {
      removeSpinner();
      alert("Error, Please try again later.");
    });
}

function registerEventListerner() {
  Array.from(document.querySelectorAll(".post-btn")).forEach((btn) =>
    btn.addEventListener("click", viewPostHandler)
  );
}

function renderUsers(data) {
  const header = `<h2>All Users</h2>`;
  const html = data.map((user) => {
    return `
        <li>
            <div class="user">
                <div class="users__item">
                    <h3>${user.name}</h3>
                    <h4>${user.email}</h3>
                </div>
                <button class='post-btn' data-user-id=${user.id}>view post</button>
            </div>
        </li>
        `;
  });
  html.unshift(header);
  html.join("");
  document.querySelector(".users").insertAdjacentHTML("afterbegin", html);
  return;
}

function fetchData() {
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
}

fetchData();
