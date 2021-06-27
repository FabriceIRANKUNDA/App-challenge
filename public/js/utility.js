import { viewPostHandler } from "./postController.js";

export const registerEventListerner = () => {
  Array.from(document.querySelectorAll(".post-btn")).forEach((btn) =>
    btn.addEventListener("click", viewPostHandler)
  );
};


