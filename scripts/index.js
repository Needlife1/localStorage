import {
  addNewTask,
  handeleTaskBehaviour,
  fillTasksList,
} from "./functions.js";

const addBtn = document.querySelector(".addBtn");
const myUL = document.querySelector("#myUL");

addBtn.addEventListener("click", addNewTask);
myUL.addEventListener("click", handeleTaskBehaviour);
window.addEventListener("DOMContentLoaded", fillTasksList);
