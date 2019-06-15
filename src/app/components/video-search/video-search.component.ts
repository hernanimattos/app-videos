import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';


@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {
  movies: [];
  hasPagination: Boolean = false;
  private pageButtons: Array<any> = [];
  loading: Boolean = false;
  noResults: Boolean = false;

  constructor(
    private videoService: VideosService
  ) {
  }

  ngOnInit() {
  }
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  setMovies() {
    this.loading = true;
    const {
      query,
    } = this.searchForm.value;

    const params = {
      query,
      page: 1,
    }

    this.videoService.getMovies(params)
      .subscribe((res) => {
        this.loading = false;
        return this.setResultMovies(res)
    });
  }

  setResultMovies(res){
    const {
      results = [],
    } = res || {};

    this.noResults = results.length > 0 ? false : true;
    this.movies = results

    this.putPageButtons(res);
  }


  putPageButtons({total_pages}) {
    this.pageButtons = [];
    this.hasPagination = total_pages > 1 ? true : false;

    for(let i = 1; i < total_pages; i++){
      this.pageButtons.push(i);
    }
  }

  changePage(page) {
    this.loading = true;

    const { query } = this.searchForm.value;
    const params = {
      query,
      page,
    }

    this.videoService.getMovies(params)
      .subscribe((res) => {
        this.loading = false;
        return this.setResultMovies(res)
    });
  }
  onSearchChange(value) {
    if(!value){
      this.noResults = false
    }
  }
}
