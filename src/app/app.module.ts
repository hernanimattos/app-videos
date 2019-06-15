import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { VideoSearchComponent } from './components/video-search/video-search.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoResultsComponent } from './components/no-results/no-results.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoDetailsComponent,
    VideoSearchComponent,
    VideoCardComponent,
    LoadingComponent,
    NoResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
