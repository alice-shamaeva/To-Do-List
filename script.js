const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskContainer = document.querySelector("#task-container");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue !== "") {
        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed", checkbox.checked);
        });
        deleteBtn.addEventListener("click", () => {
            li.remove();
        });
        deleteBtn.textContent = "Удалить";
        li.textContent = inputValue;
        li.append(deleteBtn);
        li.prepend(checkbox);
        taskContainer.append(li);
        input.value = "";
    }
})
