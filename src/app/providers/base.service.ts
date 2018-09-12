import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private http: Http) { }

  get(apiurl) {
    return this.http.get(apiurl);
  }
}