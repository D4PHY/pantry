function pantry() {
  // Select DOM Elements:
  const pantryInput = document.querySelector(".pantry-input");
  const pantryAddBtn = document.querySelector(".pantry-add-btn");
  const pantryList = document.querySelector(".pantry-list");

  // Implement a dynamic value for the id of each new item and save all added items in local storage
  let idIndex = 1;
  let localPantry = [];

  if (localStorage.getItem("localPantry")) {
    localPantry = JSON.parse(localStorage.getItem("localPantry"));
  }

  /* Add a new item on the screen in pantryList, push it in the array used to save item in the local storage
     and update the local storage with the renew array: */
  function addToPantry() {
    if (pantryInput.value !== "") {
      const item = renderItem(pantryInput.value);

      pantryList.appendChild(item);

      localPantry.push({ itemName: pantryInput.value, isChecked: false });

      updateLocalPantry();
    }

    pantryInput.value = "";
  }

  // Populate pantryList with all items from local storage:
  function renderPantryList() {
    const localPantry = JSON.parse(localStorage.getItem("localPantry"));

    for (itemVal of localPantry) {
      const item = renderItem(itemVal.itemName, itemVal.isChecked);

      pantryList.appendChild(item);

      idIndex++;
    }
  }

  // Update localStorage:
  function updateLocalPantry() {
    localStorage.setItem("localPantry", JSON.stringify(localPantry));
  }

  // Create and configure pantry item:
  function renderItem(itemVal, isChecked) {
    let inputId = `pantry-item-${idIndex}`;

    const pantryItem = document.createElement("div");
    pantryItem.classList.add("pantry-item");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = inputId;
    input.checked = isChecked;
    input.addEventListener("change", function (e) {
      for (const itemVal of localPantry) {
        if (itemVal.itemName === e.target.nextElementSibling.textContent) {
          itemVal.isChecked = e.target.checked;
          updateLocalPantry();
        }
      }
    });

    input.value = inputId;

    const label = document.createElement("label");
    label.textContent = itemVal;
    label.setAttribute("for", inputId);

    pantryItem.appendChild(input);
    pantryItem.appendChild(label);

    return pantryItem;
  }

  // Add event handlers:
  document.addEventListener("DOMContentLoaded", renderPantryList);
  pantryAddBtn.addEventListener("click", addToPantry);
}

pantry();

// localStorage.clear();
