import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Video } from 'src/app/model/video';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  defaultVideo = {
    id:''
  }
  private video = new BehaviorSubject<Video>(this.defaultVideo)
  currentVideo = this.video.asObservable()

  constructor() { }

  loadVideo(video: Video) {
    console.log("new url:", video)
    this.video.next(video)
  }
}
