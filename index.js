const taskList = document.getElementById("list");

// Add handler to add tasks
function addTask() {
  const taskname = document.getElementById("taskname").value;
  if (taskname === "") {
    document.getElementById("error").innerHTML = "Please enter some value";
    document.getElementById("error").style.display = "block";
  } else {
    document.getElementById("error").style.display = "none";
    const li = document.createElement("li");
    // definining the layout for the task added
    li.innerHTML = `
                        <div style="display:flex; flex-direction:column">
                        <span style="font-weight:bold; font-size:30px;" >${taskname}</span>
                        <div style="margin-top:10px">
                        <button onclick="editTask(this)" id="edit" class="styled-action-buttons">Edit</button>
                        <button onclick="deleteTask(this)" id="delete" class="styled-action-buttons">Delete</button>
                        <button onclick="markAsDone(this)" id="mark" class="styled-action-buttons">Mark as Done</button>  
                        </div>
                        </div>`;
    taskList.appendChild(li);
    document.getElementById("taskname").value = "";
  }
}


// edit handler to edit any specific tasks
function editTask(button) {
  const li = button.parentElement.parentElement;

  const span = li.querySelector("span");

  const editButton = li.querySelector("button");

  const newText = span.textContent;

  span.innerHTML = `<input style="background-color:white" type="text" value="${newText}">`;

  editButton.textContent = "Save";

  editButton.onclick = function () {
    const input = span.querySelector("input");

    const updatedText = input.value.trim();

    if (updatedText !== "") {
      span.innerHTML = updatedText;

      editButton.textContent = "Edit";

      editButton.onclick = function () {
        editTask(editButton);
      };
    }
  };
}


// done handler
function markAsDone(button) {
  const li = button.parentElement.parentElement;

  const span = li.querySelector("span");

  span.classList.toggle("completed"); // Toggle the completed class for strikethrough effect

  button.disabled = true; // Disable the "Mark as Done" button

  const editButton = li.querySelector("button");

  editButton.disabled = true; // Disable the "Edit" button
}


// delete task handler
function deleteTask(button) {
  const li = button.parentElement.parentElement.parentElement;
  taskList.removeChild(li);
}
