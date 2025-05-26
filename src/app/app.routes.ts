import { Routes } from '@angular/router';
import { TaskListComponent } from './listComponent/task-list/task-list.component';
import { InicioComponent } from './listComponent/inicio/inicio.component';
import { TaskFormComponent } from './listComponent/task-form/task-form.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'todoList', component: TaskListComponent },
    { path: 'newTask', component: TaskFormComponent },
    { path: 'newTask/:id/:nombre/:descripcion', component: TaskFormComponent }
];
