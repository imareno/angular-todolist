import { Injectable } from '@angular/core';
import { ITask } from '../models';
import { UUIDTypes } from 'uuid';

@Injectable({
	providedIn: 'root'
})

export class TaskService {

	constructor() { }

	todoList: ITask[] = [];

	getTaskList(): any {
		return this.todoList;
	}
	addNewTask(newTask: ITask): void {
		this.todoList.push(newTask);
	}
	editTask(task:ITask):void{
		const index = this.todoList.findIndex(t => t.id === task.id);
		this.todoList[index] = task;
	}
  deleteTask(idTask:string):void{
    const index = this.todoList.findIndex(t => t.id === idTask);
    this.todoList.splice(index, 1);
  }
  completeTask(idTask:string):void{
   this.todoList = this.todoList.map(task => task.id === idTask ? { ...task, finalizado: true } : task );
  }

}

