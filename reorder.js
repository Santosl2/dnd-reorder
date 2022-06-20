const ARRAY_LIMIT = 5;

const list = document.querySelector("ul");
const orderIndicator = document.getElementById("order");

let itemDragging = null;

const data = Array.from(Array(ARRAY_LIMIT).keys());

function randomData() {
  return data
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);
}

function createElements() {
  list.innerHTML = "";

  randomData()
    .map((a) => a.value)
    .forEach((item) => {
      const li = document.createElement("li");

      li.innerHTML = item + 1;
      li.setAttribute("draggable", true);
      addEventListeners(li);

      list.appendChild(li);
    });

  checkOrder();
}

function addEventListeners(item) {
  if (!item) return;

  item.addEventListener("drag", onDrag);
  item.addEventListener("dragover", onDragOver);
  item.addEventListener("dragenter", onDragEnter);
  item.addEventListener("drop", onDrop);
  item.addEventListener("dragleave", onDragLeave);
  item.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  return item;
}

function onDrag(e) {
  itemDragging = this;

  this.classList.add("dragging");
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e) {
  e.stopPropagation();
  const dragItemText = itemDragging.innerHTML;
  this.classList.remove("dragEnter");

  itemDragging.innerHTML = this.innerHTML;
  this.innerHTML = dragItemText;

  itemDragging.classList.remove("dragging");

  checkOrder();

  itemDragging = null;
}

function onDragLeave() {
  this.classList.remove("dragEnter");
}

function onDragEnter(e) {
  this.classList.add("dragEnter");
}

function setWrongOrCorrectText(type = "wrong") {
  if (type === "correct") {
    orderIndicator.classList.remove("wrong");
    orderIndicator.classList.add("correct");
    orderIndicator.innerText = "Correct! Good Job";
  } else {
    orderIndicator.classList.add("wrong");
    orderIndicator.classList.remove("correct");
    orderIndicator.innerText = "Wrong";
  }
}

function checkOrder() {
  let error = 0;
  list.querySelectorAll("li").forEach((item, index) => {
    const dataToString = String(data[index] + 1);

    if (dataToString !== item.innerText) {
      error += 1;
    }
  });

  return error > 0 ? wrongOrCorrect() : wrongOrCorrect("correct");
}

createElements();
