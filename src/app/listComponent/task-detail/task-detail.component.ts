import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule} from '@angular/material/chips';
import { ITask } from '../../models';

@Component({
  standalone:true,
  selector: 'task-detail',
  imports: [MatCheckboxModule, MatIconModule, CommonModule, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})


export class TaskDetailComponent {

  @Input() task!: ITask;
  @Output() onTaskEditing = new EventEmitter<ITask>();
  @Output() onTaskDelete = new EventEmitter<string>();
  @Output() onTaskComplete = new EventEmitter<string>();

  ngOnInit(): void { }

  constructor(private router:Router)
  {
  }

edit(task:ITask){
  console.log(task);
  this.onTaskEditing.emit(task);
  
}
delete(task:ITask){
  this.onTaskDelete.emit(task.id);
}
  
complete(task:ITask){
  this.onTaskComplete.emit(task.id);
}

}
