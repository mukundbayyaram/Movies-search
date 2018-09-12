import { Injectable } from '@angular/core';

import { BaseService } from '../providers/base.service';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private apikey = "f88369e02ba04d42791afea16a6fc58a";
  private url = "https://api.themoviedb.org/3/search/movie?api_key=" + this.apikey + "&language=en-US&page=1&query=";
  // private imdbUrl = "https://omdbapi.com/?i=";
  private detailsUrl = "https://api.themoviedb.org/3/movie/";
  result;

  constructor(private base: BaseService) { }

  getMovies(title): Promise<any> {

    return new Promise((resolve, reject) => {

      this.base.get(this.url + title).subscribe(result => {
        result = result.json();
        resolve(result);
      },
      error => {
        console.log("Error in getMovies()", error);
        reject(error);
      });
    });
  }

  getDetails(id): Promise<any> {

    return new Promise((resolve, reject) => {

      this.base.get(this.detailsUrl + id + '?api_key=' + this.apikey + '&append_to_response=credits')
      .subscribe(result => {
        result = result.json();
        resolve(result);
      },
      error => {
        console.log("Error in getDetails()", error);
        reject(error);
      });
    });
  }

  // getimdb(id) {
  //   if(id != null) return this._http.get(this.imdbUrl + id).map(res => res.json());
  // }
}