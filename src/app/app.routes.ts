import { Routes } from '@angular/router';
import { TaskListComponent } from './listComponent/task-list/task-list.component';
import { InicioComponent } from './listComponent/inicio/inicio.component';
import { TaskNewComponent } from './listComponent/task-new/task-new.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'todoList', component: TaskListComponent },
    { path: 'newTask', component: TaskNewComponent },
    { path: 'newTask/:id/:nombre/:descripcion', component: TaskNewComponent }
];
