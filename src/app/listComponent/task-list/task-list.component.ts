import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppService } from '../../app.service';
import { ITask } from '../../models';


@Component({
	selector: 'app-task-list',
	imports: [
		MatButtonModule,
		MatFormFieldModule, 
		MatIconModule, 
		MatInputModule, 
		MatCardModule, 
		MatCheckboxModule, 
		FormsModule, 
		CommonModule, 
		MatDialogModule, 
		ReactiveFormsModule,
		MatTooltipModule
	],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {

	todoList: ITask[];
	formTask: FormGroup;

	constructor(
		private service: AppService,
		private dialog: MatDialog,
		private fb: FormBuilder
	) {
		this.formTask = new FormGroup({});
		this.todoList = this.service.getTaskList();
	}

	ngOnInit(): void {
		this.getFormBuilder();
	}

	getFormBuilder() {
		this.formTask = this.fb.group({
			id: [this.todoList.length + 1],
			nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15),]],
			descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15),]],
			finalizado: [false]
		});
	}

	selectedIndex: number = -1;

	save(): void {
		if (this.formTask.valid){
			this.service.addNewTask(this.formTask.value);
			this.todoList = this.service.getTaskList();
			this.cancel();
		}
	}

	edit(){

	}
	
	cancel(){
		this.formTask.reset();
	}

	checkmarkChanged(id: number): void {
		this.todoList = this.todoList.filter((i) => i.id === id);
	}


	deleteConfirmation(index: number): void {
		/*this.dialog.open(ConfirmationComponent, {
		  width: '250px'
		}).afterClosed().subscribe((res: any) => {
		  if (res === 'Si') {
			this.todoList().splice(index, 1);
		  }
		});*/
	}

	editItem(index: number, item: any): void {
		this.selectedIndex = index;

	}

	updateItem() {
		if (this.selectedIndex >= 0) {
			//this.todoList()[this.selectedIndex].descripcion = this.description();
			this.selectedIndex = -1;
		}
	}

	ngOnDestroy(): void {
	}
}
