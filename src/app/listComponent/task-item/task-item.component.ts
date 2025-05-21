import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule} from '@angular/material/chips';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../models';

@Component({
  selector: 'task-item',
  imports: [MatCheckboxModule, MatIconModule, CommonModule, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})


export class TaskItemComponent {

   @Input() task!: ITask;

  ngOnInit(): void { }

  constructor(private router:Router)
  {
  }

  checkmarkChanged(id: string): void {
		//this.todoList = this.todoList.filter((i) => i.id === id);
	}


edit(task:ITask){
  console.log(task);
  this.router.navigate(['/newTask', task.id, task.nombre, task.descripcion]);
}
  
}
