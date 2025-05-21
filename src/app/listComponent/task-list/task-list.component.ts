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
import { AppService } from '../../app.service';
import { ITask } from '../../models';
import { Router } from '@angular/router';
import { TaskItemComponent } from '../task-item/task-item.component';


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
		private service: AppService,
		private dialog: MatDialog,
		private router: Router
	) {
		this.formTask = new FormGroup({});
		this.todoList = this.service.getTaskList();
	}

	ngOnInit(): void {
		
	}
	
	selectedIndex: number = -1;


	

	deleteConfirmation(index: number): void {
		/*this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {
			this.todoList().splice(index, 1);
		  }
		});*/
	}

	editItem(obj:ITask) {
		this.router.navigate(['/newTask', obj.id, obj.nombre, obj.descripcion]);
		return;
	}

	updateItem() {
		if (this.selectedIndex >= 0) {
			//this.todoList()[this.selectedIndex].descripcion = this.description();
			this.selectedIndex = -1;
		}
	}

	
}
