import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { Observable, fromEvent, pipe, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ResultsComponent } from './component/results/results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  term: string;
  
  @ViewChild(ResultsComponent) private resultsComponent: ResultsComponent;

  ngAfterViewInit(): void {
    const input = document.getElementById('search'),
    input$ = fromEvent(input, 'keyup').pipe(debounceTime(400), distinctUntilChanged());

    input$.subscribe(() => {
      console.log("Hello", this.term);

      if (this.term) {
        this.resultsComponent.getMovies(this.term);
      }
    });
  }
}