import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent {

  moviesList: any;
  width;
  clicked = false;
  detailsLoaded = false;
  spinner = false;
  selectedMovie = {'title': ''};
  movieDetails: any
  
  constructor(private fetchService: FetchService) { }

  getMovies(title) {
    this.moviesList = [];

    this.fetchService.getMovies(title).then(res => {
      this.moviesList = res.results;
    })
    .catch(error => {
      console.log("Error in getMovies", error);
    });
  }

  select(movie) {
    this.selectedMovie = movie;
    this.spinner = true;
    this.detailsLoaded = false;
    
    this.fetchService.getDetails(movie.id).then(result => {
      this.movieDetails = result;
      
      this.movieDetails.credits.crew.forEach(function(entry) {
        if(entry.job === 'Director') {
          this.movieDetails.director += ", ";
          this.movieDetails.director += entry.name;
        }
      }.bind(this));
        
      this.spinner = false; 
      this.detailsLoaded = true;
    })
    .catch(error => {
      console.log("Error in select", error);
    });
  }

  getWidth() {
    return this.width = screen.width;
  }
}
