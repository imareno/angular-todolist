import { Injectable } from '@angular/core';
import { ITask } from '../models';
import { UUIDTypes } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class TaskService {

	  private apiUrl = 'http://localhost:3000/tasks';

	constructor(private httpClient: HttpClient) { }

	todoList: ITask[] = [];

	getTaskList(): any {
		return this.todoList;
	}
	getTaskListDbJson(): Observable<ITask[]>{
       return this.httpClient.get<ITask[]>(this.apiUrl)
	}

	addNewTask(newTask: ITask): void {
		this.todoList.push(newTask);
	}
	addNewTaskDbJson(newTask:ITask):Observable<ITask>{
        return this.httpClient.post<ITask>(this.apiUrl, newTask);
	}

	editTask(task:ITask):void{
		const index = this.todoList.findIndex(t => t.id === task.id);
		this.todoList[index] = task;
	}
	editTaskDbJson(task:ITask):Observable<ITask>{
        return this.httpClient.put<ITask>(`${this.apiUrl}/${task.id}`, task);
	}

   deleteTask(idTask:string):void{
    const index = this.todoList.findIndex(t => t.id === idTask);
    this.todoList.splice(index, 1);
   }
   deleteTaskDbJson(id: string):Observable<void>{
		return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
   }

}

