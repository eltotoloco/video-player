import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from 'src/app/model/video';
import { LoadRequest } from './load-request';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private requestSource = new Subject<LoadRequest>()
  videoRequested$ = this.requestSource.asObservable()
  private bookmarkVideoSource = new Subject<Video>()
  videoBookmarked$ = this.bookmarkVideoSource.asObservable()

  
  constructor() { }
  
  loadVideo(request: LoadRequest) {
    this.requestSource.next(request)
  }

  bookmarkVideo(video:Video){
    this.bookmarkVideoSource.next(video)
  }
  
  getHistory(): Video[] {
    return localStorage.getItem("history") ?  JSON.parse(localStorage.getItem("history")!) : []
  }
  getBookmarks(): Video[] {
    return localStorage.getItem("bookmarks") ?  JSON.parse(localStorage.getItem("bookmarks")!) : []
  }
  
}
