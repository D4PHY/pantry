// Select DOM Elements:
const pantryInput = document.querySelector(".pantry-input");
const pantryAddBtn = document.querySelector(".pantry-add-btn");
const pantryList = document.querySelector(".pantry-list");

// Save pantry list in local storage:
let localPantry = [];
const savedPantry = localStorage.getItem("localPantry");
if (savedPantry) {
  localPantry = JSON.parse(savedPantry);
}

// Add item in pantryList, update localPantry and render the pantry list:
function addToPantry() {
  if (pantryInput.value !== "") {
    localPantry.push({ itemName: pantryInput.value, isChecked: false });

    updateLocalPantry();
    renderPantryList();
  }

  pantryInput.value = "";
}

// Create and configure pantry item:
function renderItem(itemVal, isChecked, index) {
  let inputId = `pantry-item-${index + 1}`;

  const pantryItem = document.createElement("div");
  pantryItem.classList.add("pantry-item");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = inputId;
  input.checked = isChecked;
  input.value = itemVal;
  input.addEventListener("change", handleCheckbox);

  const label = document.createElement("label");
  label.textContent = itemVal;
  label.setAttribute("for", inputId);

  pantryItem.appendChild(input);
  pantryItem.appendChild(label);

  return pantryItem;
}

// Empty pantryList & Populate pantryList with all items from local storage:
function renderPantryList() {
  pantryList.innerHTML = "";
  localPantry.forEach(function (itemVal, index) {
    const item = renderItem(itemVal.itemName, itemVal.isChecked, index);
    pantryList.appendChild(item);
  });
}

// Update localStorage:
function updateLocalPantry() {
  localStorage.setItem("localPantry", JSON.stringify(localPantry));
}

function handleCheckbox(e) {
  const found = localPantry.find(function (i) {
    return i.itemName === e.target.value;
  });
  found.isChecked = e.target.checked;

  updateLocalPantry();
}

// Add event handlers:
document.addEventListener("DOMContentLoaded", renderPantryList);
pantryAddBtn.addEventListener("click", addToPantry);
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addToPantry();
  }
});

// localStorage.clear();
