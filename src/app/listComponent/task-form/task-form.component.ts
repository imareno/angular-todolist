import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ITask } from '../../models';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../Task.service';

@Component({
  selector: 'task-form-component',
  imports: [MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {


    constructor(
		private service: TaskService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		private router:Router
	) {
		this.formTask = new FormGroup({});
		this.todoList = this.service.getTaskList();
	}

todoList: ITask[];
formTask: FormGroup;

editing: boolean = false;

  ngOnInit(): void {
	
    const params = this.route.snapshot.params as ITask;
	this.editing = !!params.id;
	this.formBuilder(params.id, params.nombre, params.descripcion);
  }
      	
	save(): void {
		if (this.formTask.valid) {
			this.editing ? this.edit() : this.create();
		}
	}
	create() {

		this.service.addNewTaskDbJson(this.formTask.value).subscribe((objeto:ITask) => {
			this.formTask.reset();
			this.formBuilder("","","");
		});
		//this.service.addNewTask(this.formTask.value);
		return;
	}
	edit() {
		this.service.editTaskDbJson(this.formTask.value).subscribe((objeto:ITask) => {
			this.router.navigate(['/todoList']);
		});
		//this.service.editTask(this.formTask.value)
		return;
	}
	cancel = () => this.editing ? this.router.navigate(['/todoList']) : this.formTask.reset();

  formBuilder(id:string|null, nombre:string|null, detalle:string|null) {
    const nuevoId = uuidv4();
    this.formTask = this.formbuilder.group({
      id: [ this.editing? id: nuevoId],
      nombre: [nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(20),]],
      descripcion: [detalle, [Validators.required, Validators.minLength(5), Validators.maxLength(100),]],
      finalizado: [false]
    });
  }

}
