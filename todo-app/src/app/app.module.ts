import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './routes/task-list/task-list.component';
import { StatusElementComponent } from './shared/status-element/status-element.component';
import { TaskFormComponent } from './routes/task-form/task-form.component';
import { ToastListComponent } from './shared/toast-list/toast-list.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { TermsOfUseComponent } from './routes/terms-of-use/terms-of-use.component';
import { TaskQuickComponent } from './components/task-quick/task-quick.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskItemComponent,
    TaskListComponent,
    StatusElementComponent,
    TaskFormComponent,
    ToastListComponent,
    RelativeDatePipe,
    NotFoundComponent,
    TermsOfUseComponent,
    TaskQuickComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
