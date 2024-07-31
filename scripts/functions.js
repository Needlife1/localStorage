import { save, load } from "./storage.js";

const STORAGE_KEY = "tasks";
let currentId = 0;

const myInput = document.querySelector("#myInput");

function fillTasksList() {
  const currentState = load(STORAGE_KEY);

  if (currentState !== undefined) {
    currentState.forEach(({ text, isDone, id }) => {
      createLi(text, isDone, id);
    });
    currentId =
      currentState.langth !== 0
        ? currentState[currentState.length - 1].id + 1
        : 0;
  }
}

function addNewTask() {
  const inputValue = myInput.value.trim();
  if (inputValue === "") {
    alert("You must write something!");
    return;
  }

  createLi(inputValue);
  myInput.value = "";
  addTaskToStorage(inputValue);
}

function createLi(text, isDone = false, id = currentId) {
  const liEl = document.createElement("li");
  const liText = document.createTextNode(text);
  liEl.appendChild(liText);
  liEl.dataset.id = id;
  if (isDone) liEl.classList.add("checked");
  myUL.appendChild(liEl);
  addCross(liEl);
}

function handeleTaskBehaviour({ target }) {
  const currentState = load(STORAGE_KEY);
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    const taskIndex = currentState.findIndex(
      (task) => +task.id === +target.dataset.id
    );
    currentState[taskIndex].isDone = !currentState[taskIndex]?.isDone;
    save(STORAGE_KEY, currentState);
  } else if (target.classList.contains("close")) {
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(
      (task) => +task.id === +target.parentNode.dataset.id
    );
    currentState.splice(taskIndex, 1);
  }
  save(STORAGE_KEY, currentState);
}

function addCross(target) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  target.appendChild(span);
}

function createTaskObject(text, isDone) {
  return {
    text,
    isDone,
    id: currentId,
  };
}

function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    save(STORAGE_KEY, [createTaskObject(text, isDone)]);
  } else {
    currentState.push(createTaskObject(text, isDone));
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}

export { addNewTask, handeleTaskBehaviour, fillTasksList };
