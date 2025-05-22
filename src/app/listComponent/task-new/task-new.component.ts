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
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-new-component',
  imports: [MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.scss'
})
export class TaskNewComponent implements OnInit {


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
	console.log(this.editing);	
	this.formBuilder(params.id, params.nombre, params.descripcion);
  }


    selectedIndex: number = -1;

    checkmarkChanged(id: string): void {
     this.todoList = this.todoList.filter((i) => i.id === id);
	}
  	
	save(): void {
		if (this.formTask.valid) {
			this.editing ? this.edit() : this.create();
		}
	}
	create() {
		this.service.addNewTask(this.formTask.value);
		this.formTask.reset();
		this.formBuilder("","","");
		return;
	}
	edit() {
		this.service.editTask(this.formTask.value)
		this.router.navigate(['/todoList']);
		return;
	}
	cancel = () => this.editing ? this.router.navigate(['/todoList']) : this.formTask.reset();

  formBuilder(id:string|null, nombre:string|null, detalle:string|null) {
    const nuevoId = uuidv4();
    this.formTask = this.formbuilder.group({
      id: [ this.editing? id: nuevoId],
      nombre: [nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(15),]],
      descripcion: [detalle, [Validators.required, Validators.minLength(5), Validators.maxLength(50),]],
      finalizado: [false]
    });
  }

}
