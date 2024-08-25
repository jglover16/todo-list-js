const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updateCount(){
    const textLength = tasks.children.length;
    messageSpan.textContent =`You have ${textLength} pending tasks. Get to work!`;
};
updateCount();

function addTask(){
    addForm.addEventListener("submit", event => {
        event.preventDefault();
        const value = addForm.task.value.trim(); //remove whitespace
    
        if(value.length){
            tasks.innerHTML += `<li>
                <span>${value}</span>
                <i class="bi bi-trash-fill delete"></i>
            </li>`
            addForm.reset();
            updateCount();
        }
    });
};
addTask();

function deleteTask(){
    tasks.addEventListener("click", event => {
        // console.log(event); // confirm where clicking is correct
        if(event.target.classList.contains("delete")){
            // console.log(event.target); //should only show when click on delete icon
            event.target.parentElement.remove();
        }
        updateCount();
    })
};
deleteTask();

function clearTasks(){
    clearAll.addEventListener("click", event => {
        const taskItems = tasks.querySelectorAll("li"); // when click button select all li from tasks
        taskItems.forEach(item => {
            item.remove();
        })
        updateCount();
    })
}
clearTasks();

function filterTask(term){
    Array.from(tasks.children) //select all children and convert to array
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term); //creates a list of all items that dont include the term
    }) //convert html collection to array
    .forEach(task => {
        task.classList.add("hide");
    });
    //after deleting task in search bar it returns empty which they all are so it reutnrs them fa alls
    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term); //creates array and filters out all items that include the term
    })
    .forEach(task => {
        task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup", event => {
    const term = searchForm.task.value.trim().toLowerCase(); //select term and trim whitepsace
    filterTask(term);
});

searchForm.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim(); //select term and trim whitepsace
        filterTask(term);
    }
})

