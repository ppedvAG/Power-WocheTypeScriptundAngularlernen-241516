import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './routes/task-list/task-list.component';
import { TaskFormComponent } from './routes/task-form/task-form.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TaskListComponent,
  },
  {
    path: 'new',
    component: TaskFormComponent,
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
