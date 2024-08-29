import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './routes/task-list/task-list.component';
import { TaskFormComponent } from './routes/task-form/task-form.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { termsOfUseGuard } from './guards/terms-of-use.guard';
import { TermsOfUseComponent } from './routes/terms-of-use/terms-of-use.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full',
    },
    {
        path: 'list',
        component: TaskListComponent,
        canActivate: [termsOfUseGuard],
    },
    {
        path: 'new',
        component: TaskFormComponent,
        canActivate: [termsOfUseGuard],
    },
    {
        path: 'edit/:id',
        component: TaskFormComponent,
        canActivate: [termsOfUseGuard],
    },
    {
        path: 'terms-of-use',
        component: TermsOfUseComponent,
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
