import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { VideoSearchComponent } from './components/video-search/video-search.component';

const routes: Routes = [
  {
    path: '',
    component: VideoSearchComponent,
  },
  {
    path: 'video-details/:id',
    component: VideoDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
