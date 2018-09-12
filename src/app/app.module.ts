import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultsComponent } from './component/results/results.component';
import { FetchService } from './services/fetch.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
