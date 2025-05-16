import { Routes } from '@angular/router';
import { TaskListComponent } from './listComponent/task-list/task-list.component';
import { NewTaskComponent } from './listComponent/new-task/new-task.component';
import { InicioComponent } from './listComponent/inicio/inicio.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path:'todoList', component: TaskListComponent },
    { path:'newTask', component: NewTaskComponent }
];
