(function () {
  // Select DOM Elements:
  const pantryInput = document.querySelector(".pantry-input");
  const pantryAddBtn = document.querySelector(".pantry-add-btn");
  const pantryList = document.querySelector(".list");

  // Implement a dynamic value for the id of each new item and save all added items in local storage
  let localPantry = [];

  const savedPantry = localStorage.getItem("localPantry");
  if (savedPantry) {
    localPantry = JSON.parse(savedPantry);
  }

  /* Add a new item on the screen in pantryList, push it in the array used to save item in the local storage
     and update the local storage with the renew array: */
  function addToPantry() {
    if (pantryInput.value !== "") {
      localPantry.push({ itemName: pantryInput.value, isChecked: false });

      updateLocalPantry();
      renderPantryList();
    }

    pantryInput.value = "";
  }

  // Populate pantryList with all items from local storage:
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
    input.addEventListener("change", function (e) {
      for (const itemVal of localPantry) {
        if (itemVal.itemName === e.target.value) {
          itemVal.isChecked = e.target.checked;
          updateLocalPantry();
          break;
        }
      }
    });

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
})();

// localStorage.clear();
