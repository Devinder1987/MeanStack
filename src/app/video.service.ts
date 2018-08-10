import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Video } from './video';

const _url = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class VideoService {

  constructor(private http: HttpClient) { }
  getVideos(url) {
    return this.http.get(_url + url)
      .pipe(map(res => res));
  }
  addVideo(video: Video) {
    return this.http.post(_url + 'video', JSON.stringify(video), httpOptions)
    .pipe(map(res => res));
  }
}
