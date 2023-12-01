;
var tasks = [];
function addTask() {
    var str = document.getElementById('task').value;
    if (str.length === 0 || str === null) {
        alert('Cannot add an empty task!');
    }
    else {
        tasks.push({
            description: str,
            completed: false,
            key: tasks.length + 1
        });
        alert('Task added to the list!');
        var taskList = document.getElementById("taskList");
        if (taskList) {
            var tr = document.createElement("tr");
            tr.innerHTML = taskGenerator(tasks[tasks.length - 1]);
            tr.setAttribute('id', "i".concat(tasks[tasks.length - 1].key));
            taskList.appendChild(tr);
            document.getElementById('task').value = '';
        }
        else {
            console.error("Element with id 'taskList' not found.");
        }
    }
}
function renderTable() {
    var taskList = document.getElementById('taskList');
    if (taskList !== null) {
        // Clear existing content
        taskList.innerHTML = '';
        // Add each task as a new row
        tasks.forEach(function (task) {
            var tr = document.createElement('tr');
            tr.innerHTML = taskGenerator(task);
            taskList.appendChild(tr);
        });
    }
    else {
        console.error("Element with id 'taskList' not found.");
    }
}
function removeTask(keytobeDeleted) {
    tasks = tasks.filter(function (item) {
        return item.key !== keytobeDeleted;
    });
    var parent = document.getElementById("taskList");
    var childToRemove = document.getElementById("i".concat(keytobeDeleted));
    if (parent && childToRemove) {
        parent.removeChild(childToRemove);
    }
    else {
        console.error("Parent or child element not found.");
    }
}
function taskCompleted(keyCompleted) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].key === keyCompleted) {
            tasks[i].completed = true;
        }
    }
}
var isModalOpen = false;
function editTask(key, description) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn".concat(key));
    var span = document.getElementsByClassName("close")[0];
    var submitbtn = document.getElementById("editbtn");
    if (btn && modal && span && submitbtn) {
        if (!isModalOpen) {
            modal.style.display = "block";
            isModalOpen = true;
        }
        else {
            modal.style.display = "none";
            isModalOpen = false;
        }
        submitbtn.onclick = function () {
            var x = document.getElementById('edit');
            var str = x.value; // Assign the value of x to str
            var field = document.getElementById("t".concat(key));
            if (field) {
                field.innerHTML = str; // Update the content of the field with the value of x
            }
            else {
                console.error("Field with id 't".concat(key, "' not found."));
            }
            modal.style.display = "none";
            isModalOpen = false;
        };
        span.onclick = function () {
            modal.style.display = "none";
            isModalOpen = false;
        };
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                isModalOpen = false;
            }
        };
    }
    else {
        console.error("Element not found.");
    }
    var ip = document.getElementById('edit');
    ip.value = description;
}
function taskGenerator(item) {
    var taskItem = "\n        <td><input type=\"checkbox\" onchange=\"checkboxText(".concat(item.key, ", this.checked)\"/></td>\n       ").concat(item.completed === false ? "<td class=\"task-text\" style=\"font-size: 20px;\" id=\"t".concat(item.key, "\">").concat(item.description, " </td>") : "<td class=\"task-text\" style=\"font-size: 20px;\"id=\"t".concat(item.key, "\"><strike>").concat(item.description, "</strike></td>"), "\n       <td class=\"task-icon tooltip\" onClick=\"editTask(").concat(item.key, ",'").concat(item.description, "')\"\n    id=\"myBtn").concat(item.key, "\">\n    <i class=\"fa-solid fa-pen\" style=\"color: #969FA2;\"></i>\n    <span class=\"tooltiptext\">Edit</span>\n</td>\n\n        <td class=\"task-icon tooltip\" onClick=\"removeTask(").concat(item.key, ")\" ><i class=\"fa-solid fa-xmark\" style=\"color: #969FA2; font-size: 24px;\"></i><span class=\"tooltiptext\">Remove</span></td>\n      ");
    return taskItem;
}
function checkboxText(key, isChecked) {
    var elem = document.getElementById("t".concat(key));
    if (isChecked) {
        elem === null || elem === void 0 ? void 0 : elem.setAttribute('class', 'strikeText');
    }
    else {
        elem === null || elem === void 0 ? void 0 : elem.setAttribute('class', 'plainText');
    }
}
