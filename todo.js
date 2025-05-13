const fs = require('fs');

let i=1;
function loadTasks(){
    if(fs.existsSync('todo.json')){
        const data = fs.readFileSync('todo.json','utf-8');
        return JSON.parse(data);
    }else{
        return [];
    }
}

function saveTasks(tasks){
    fs.writeFileSync('todo.json', JSON.stringify(tasks,null,2));
}

function addTask(taskText){
    const tasks = loadTasks();
    tasks.push({
       id:i, text: taskText, done: false
    });
    saveTasks(tasks);
    console.log('task added successfully!');
    i++;
}

function viewTasks(){
    const tasks = loadTasks();
    if(tasks.length===0){
        console.log('No tasks yet!');
        return;
    }
    tasks.forEach((task,index)=>{
        const status = task.done?'✔️' : '❌';
        console.log(`${index+1}. ${status}  ${task.text}`);
    });
}

function MarkDone(index){
    const tasks = loadTasks();
    if(tasks[index-1]){
        tasks[index-1].done=true;
        saveTasks(tasks);
        console.log(`Task ${index} marked as done.`);
    }else{
        console.log('Invalid task number.');
    }
}

function deleteTask(index){
    const tasks = loadTasks();
    if(tasks[index-1]){
        const removed = tasks.splice(index-1,1);
        console.log(`deleted : ${removed[0].text}`);
        saveTasks(tasks);
        i--;
    }else{
        console.log('Invalid task number.');
        
    }
}

const [,, command, ...args] = process.argv;
if(command==='add'){
    addTask(args.join());
}else if(command==='view'){
    viewTasks();
}else if(command==='done'){
    MarkDone(parseInt(args[0]));
}else if(command==='delete'){
    deleteTask(parseInt(args[0]));
}else{
    console.log(`
        Commands:
        node todo.js add "Your Task"
        node todo.js view
        node todo.js done <task number>
        node todo.js delete <task number>
        `);
    
}