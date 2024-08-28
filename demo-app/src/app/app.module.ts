import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CardComponent } from './components/card/card.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CardComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
