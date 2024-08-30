import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './routes/overview/overview.component';
import { CardComponent } from './components/card/card.component';
import { RatingComponent } from './components/rating/rating.component';
import { StatusComponent } from './components/status/status.component';
import { TablesComponent } from './routes/tables/tables.component';
import { HighlightDirective } from './directives/highlight.directive';
import { MarkedPipe } from './pipes/marked.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { ProfileComponent } from './routes/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CardComponent,
    RatingComponent,
    StatusComponent,
    TablesComponent,
    HighlightDirective,
    MarkedPipe,
    SanitizePipe,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
