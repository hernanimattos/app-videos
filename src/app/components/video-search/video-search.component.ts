import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Button } from 'protractor';


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
  totalPages: Number;

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
    this.removeStorage('pages');

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

  putPageButtons({total_pages, page}) {
    this.pageButtons = [];
    this.totalPages = total_pages;
    this.hasPagination = total_pages > 1 ? true : false;

    this.setLocalStorage('pages',
      {
        total_pages,
        page,
      }
    );

    for(let i = 0; i < total_pages; i++){
      this.pageButtons.push(i);
    }
  }

  onSearchChange(value) {
    if(!value){
      this.noResults = false
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

  backPage() {
    const pages = this.getLocalStorage('pages');
    let {
      page: currentPage,
      total_pages,
    } = JSON.parse(pages);
    const button = document.getElementsByClassName('pagination-next')[0];
    button.removeAttribute('disabled');

    if(currentPage <= 1) {

      return;
    };

    currentPage = currentPage - 1;
    this.setLocalStorage('pages',
      {
        total_pages,
        page: currentPage,
      }
    );
    this.changePage(currentPage);
  }

  nextPage() {
    const pages = this.getLocalStorage('pages');
    let {
      page: currentPage,
      total_pages,
    } = JSON.parse(pages)

    const button = document.getElementsByClassName('pagination-next')[0];

    if(currentPage >= total_pages) {
      button.setAttribute('disabled', 'true');
      return;
    }

    currentPage = currentPage + 1;
    this.setLocalStorage('pages',
      {
        total_pages,
        page: currentPage,
      }
    );
    this.changePage(currentPage);
  }

  setLocalStorage(key, value) {
    const parserValue = JSON.stringify(value)
    localStorage.setItem(key, parserValue)
  }

  getLocalStorage(keyName) {
    return localStorage.getItem(keyName);
  }

  removeStorage(keyName) {
    return localStorage.removeItem(keyName);
  }
}
