import { Component } from '@angular/core';

import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent {

  moviesList: any;
  width;
  detailsLoaded = false;
  spinner = false;
  selectedMovie = {'title': ''};
  movieDetails: any;
  genre: string;
  
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
      
      if (this.movieDetails.genres) {
        let genres = [];

        this.movieDetails.genres.forEach(obj => {
          if (obj.name) {
            genres.push(obj.name);
          }
        });

        this.genre = genres.join(', ');
      }
      else {
        this.genre = null;
      }
        
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