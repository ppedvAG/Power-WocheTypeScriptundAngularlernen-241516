import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './routes/overview/overview.component';
import { TablesComponent } from './routes/tables/tables.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/order',
    pathMatch: 'full',
  },
  {
    path: 'order',
    component: OverviewComponent,
  },
  {
    path: 'tables/:id',
    component: TablesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
