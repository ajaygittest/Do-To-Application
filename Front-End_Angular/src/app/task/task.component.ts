import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.getAllTask();
  }

  newTask:Task = {description:"",completed:false};
  tasks:Task[]=[];
  editingTask:Task |null=null;
  updatedTask:Task={description:"",completed:false};

  createTask():void{
    this.taskService.createTask(this.newTask).subscribe((createdTask)=>{
      this.newTask ={description:"", completed:false};
       this.getAllTask();
    })
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe((task)=>{
      this.tasks= task;
    })
  }


  editTask(task:Task){
    this.editingTask=task;
    this.updatedTask={...task};
  }

  updateTask():void{
    if(this.editingTask){
      this.taskService.updateTask(this.editingTask.id!,this.updatedTask)
      .subscribe((result)=>{
       const index= this.tasks.findIndex((task)=>task.id == this.editingTask!.id)
      if(index !==-1){
        this.tasks[index]=result;
        this.cancelEdit();
      }
      })
    }
  }

  cancelEdit(){
    this.editingTask=null;
    this.updatedTask={description:"",completed:false};
  }

  deleteTask(taskId:number){
    if(confirm('Are you sure want to delete ?'))
    this.taskService.deleteTask(taskId).subscribe((result)=>{
     this.tasks= this.tasks.filter((task)=> task.id !==taskId);
      if(this.editingTask && this.editingTask?.id ===taskId){
        this.cancelEdit();
      }
    })

  }

}
