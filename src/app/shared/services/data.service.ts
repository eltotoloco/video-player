import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from 'src/app/model/video';
import { LoadRequest } from './load-request';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private request = new Subject<LoadRequest>()
  videoRequested = this.request.asObservable()
  
  constructor() { }
  
  loadVideo(request: LoadRequest) {
    this.request.next(request)
  }
  
  getHistory(): Video[] {
    return localStorage.getItem("history") ?  JSON.parse(localStorage.getItem("history")!) : []
  }
  
}
