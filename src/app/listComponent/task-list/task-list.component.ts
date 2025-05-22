import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ITask } from '../../models';
import { Router } from '@angular/router';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../task.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';


@Component({
	selector: 'app-task-list',
	imports: [
		MatButtonModule,
		MatFormFieldModule, 
		MatIconModule, 
		MatInputModule, 
		MatCardModule, 
		 
		FormsModule, 
		CommonModule, 
		MatDialogModule, 
		ReactiveFormsModule,
		MatTooltipModule,
		TaskItemComponent
	],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

	todoList: ITask[];
	formTask: FormGroup;

	constructor(
		private service: TaskService,
		private dialog: MatDialog,
		private router: Router
	) {
		this.formTask = new FormGroup({});
		this.todoList = this.service.getTaskList();
	}

	ngOnInit(): void {
	}
	
	selectedIndex: number = -1;

    onTaskEditing(task:ITask ){
       this.router.navigate(['/newTask', task.id, task.nombre, task.descripcion]);
	}

	onTaskDelete(id:string){
		this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {
			this.service.deleteTask(id);
		  }
		});
	}

	onTaskComplete(id:string){
		this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {
			this.service.completeTask(id);
		  }
		});
	}
}
