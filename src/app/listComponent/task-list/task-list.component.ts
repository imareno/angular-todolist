import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ITask } from '../../models';
import { Router } from '@angular/router';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { TaskService } from '../Task.service';


@Component({
	selector: 'task-list',
	  standalone: true,
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
		TaskDetailComponent
	],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

	todoList: ITask[] = [];
	formTask: FormGroup;

	constructor(
		private service: TaskService,
		private dialog: MatDialog,
		private router: Router
	) {
		this.formTask = new FormGroup({});
	}

	ngOnInit(): void {
		this.service.getTaskListDbJson().subscribe(
			data => { this.todoList = data }
		)
		
	}
	
    onTaskEditing(task:ITask ){
       this.router.navigate(['/newTask', task.id, task.nombre, task.descripcion]);
	}

	onTaskDelete(id:string){
		this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {
			 
			 this.service.deleteTaskDbJson(id).subscribe(() => {
				this.todoList = this.todoList.filter(u => u.id !== id);
			 });
		  }
		});
	}

	onTaskComplete(id:string){
		this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {

			const task = this.todoList.filter(u => u.id === id)[0];
			task.finalizado = true;
			this.service.editTaskDbJson(task).subscribe((objeto:ITask) => {
			
			});
		  }
		});
	}
}
