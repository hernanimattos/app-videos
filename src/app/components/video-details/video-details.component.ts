import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideosService } from '../../services/videos/videos.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  id: Number;
  movie = {};
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideosService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.loading = true

      const { id = '' } = params || {};

      this.videoService.getMovie(parseInt(id, 10))
        .subscribe((resp)=> {

        this.loading = false;

        return this.movie = {...resp}
      });
   });
  }
}
