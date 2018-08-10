import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;
  selectedVideo: Video;
  private newVideo = false;
  constructor(private _VideoService: VideoService) { }

  ngOnInit() {
    console.log(this._VideoService);
    this._VideoService.getVideos('videos').subscribe((response: Array<Video>) => {
      this.videos = response;
      console.log(' Center Response: ', response);
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    this.newVideo = false;
  }
  onSelectVideo(video: any) {
    console.log('Vid:', video);
    this.selectedVideo = video;
    this.newVideo = false;
  }
  addVideoSubmit(video: Video) {
    console.log('asda');
    this._VideoService.addVideo(video)
      .subscribe((resNewVideo: Video) => {
        console.log('1111');
        this.videos.push(resNewVideo);
        this.selectedVideo = resNewVideo;
      });
  }
  hideNewVideo() {
    this.newVideo = !this.newVideo;
  }
}
