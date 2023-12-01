interface Task {
    description: string,
    completed: boolean,
    key: number
};

var tasks: Task[] = [];

function addTask(): void {
    var str: string = (document.getElementById('task') as HTMLInputElement).value;
    if (str.length === 0 || str === null) {
        alert('Cannot add an empty task!');
    } else {
        tasks.push({
            description: str,
            completed: false,
            key: tasks.length + 1
        });
        alert('Task added to the list!');
        const taskList = document.getElementById("taskList");

        if (taskList) {
            const tr = document.createElement("tr");
            tr.innerHTML = taskGenerator(tasks[tasks.length - 1]);
            tr.setAttribute('id', `i${tasks[tasks.length-1].key}`);
            taskList.appendChild(tr);
            (document.getElementById('task') as HTMLInputElement).value = '';
        } else {
            console.error("Element with id 'taskList' not found.");
        }
    }
}

function renderTable(): void {
    const taskList = document.getElementById('taskList');

    if (taskList !== null) {
        // Clear existing content
        taskList.innerHTML = '';

        // Add each task as a new row
        tasks.forEach(task => {
            const tr = document.createElement('tr');
            tr.innerHTML = taskGenerator(task);
            taskList.appendChild(tr);
        });
    } else {
        console.error("Element with id 'taskList' not found.");
    }
}

// Function to delete a task
function removeTask(keytobeDeleted: number): void {
    tasks = tasks.filter(function (item) {
        return item.key !== keytobeDeleted;
    });
    const parent = document.getElementById("taskList");
            const childToRemove = document.getElementById(`i${keytobeDeleted}`);

            if (parent && childToRemove) {
                parent.removeChild(childToRemove);
            } else {
                console.error("Parent or child element not found.");
            }
}

function taskCompleted(keyCompleted: number): void {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].key === keyCompleted) {
            tasks[i].completed = true;
        }
    }
}



let isModalOpen = false;

function editTask(key:number,description:string): void {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById(`myBtn${key}`);
    const span = document.getElementsByClassName("close")[0] as HTMLElement | undefined;
    const submitbtn = document.getElementById("editbtn");
    if (btn && modal && span && submitbtn) {
        
            if (!isModalOpen) {
                modal.style.display = "block";
                isModalOpen = true;
            } else {
                modal.style.display = "none";
                isModalOpen = false;
            }

            // save changes
            submitbtn.onclick = function () {
                const x = document.getElementById('edit') as HTMLInputElement;
                let str: string = x.value; 
                const field = document.getElementById(`t${key}`);
                
                if (field) {
                    field.innerHTML = str; 
                } else {
                    console.error(`Field with id 't${key}' not found.`);
                }
            
                modal.style.display = "none";
                isModalOpen = false;
            };
            

        span.onclick = function () {
            modal.style.display = "none";
            isModalOpen = false;
        }

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                isModalOpen = false;
            }
        }
    } else {
        console.error("Element not found.");
    }
    const ip = document.getElementById('edit') as HTMLInputElement;
    ip.value = description;
    
}

// Function to generate a task on table
function taskGenerator(item: Task): string {

    const taskItem =
        `
        <td><input type="checkbox" onchange="checkboxText(${item.key}, this.checked)"/></td>
       ${ item.completed === false ? `<td class="task-text" style="font-size: 20px;" id="t${item.key}">${item.description} </td>`:   `<td class="task-text" style="font-size: 20px;"id="t${item.key}"><strike>${item.description}</strike></td>`}
       <td class="task-icon tooltip" onClick="editTask(${item.key},'${item.description}')"
    id="myBtn${item.key}">
    <i class="fa-solid fa-pen" style="color: #969FA2;"></i>
    <span class="tooltiptext">Edit</span>
</td>

        <td class="task-icon tooltip" onClick="removeTask(${item.key})" ><i class="fa-solid fa-xmark" style="color: #969FA2; font-size: 24px;"></i><span class="tooltiptext">Remove</span></td>
      `
return taskItem;
}



function checkboxText(key: number, isChecked: boolean): void {
    const elem = document.getElementById(`t${key}`);
    if(isChecked){
        elem?.setAttribute('class','strikeText');
    }else{
        elem?.setAttribute('class','plainText');
    }
}

