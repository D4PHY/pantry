const pantryList = document.querySelector(".pantry-list");
const pantryInput = document.querySelector(".pantry-input");
const pantryAddBtn = document.querySelector(".pantry-add-btn");

let idIndex = 1;
const localPantry = [];

function saveToLocal(val) {
  if (!localStorage.getItem("localPantry")) {
    localStorage.setItem("localPantry", JSON.stringify(localPantry));
  } else {
    localPantry.push(val);
  }
}

function addToPantry() {
  let inputId = `pantry-item-${idIndex}`;

  const pantryItem = document.createElement("div");
  pantryItem.classList.add("pantry-item");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = inputId;

  input.value = inputId;

  const label = document.createElement("label");
  label.textContent = pantryInput.value;
  label.setAttribute("for", inputId);

  pantryItem.appendChild(input);
  pantryItem.appendChild(label);

  pantryList.appendChild(pantryItem);

  saveToLocal(pantryInput.value);

  pantryInput.value = "";

  idIndex++;
  console.log("id index:", idIndex, "input id:", inputId);
}

pantryAddBtn.addEventListener("click", addToPantry);
