import { Injectable } from '@angular/core';
import { ITask } from './models';

@Injectable({
	providedIn: 'root'
})

export class AppService {

	constructor() { }

	todoList: ITask[] = [];

	getTaskList(): any {
		return this.todoList;
	}

	addNewTask(newTask: ITask): void {
		this.todoList.push(newTask);
	}

}
