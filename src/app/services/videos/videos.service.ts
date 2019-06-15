import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  getMovies({query, page}){
     return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=6c5b0b69fe1e7d3316320baaa9d0ff8b&query=${query}&page=${page}`);
  }

  getMovie(id) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6c5b0b69fe1e7d3316320baaa9d0ff8b`);

  }
}
