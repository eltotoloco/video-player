import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../model/video';
import { DataService } from '../shared/services/data.service';
import { LoadRequest } from '../shared/services/load-request';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  videoList!:Video[]
  selectedVideo?:Video
  subscription!: Subscription;
  
  
  constructor(private dataService: DataService) { }
  
  
  ngOnInit() {
    this.videoList = this.dataService.getHistory()
    
    this.subscription = this.dataService.videoRequested$.subscribe(request =>{ 
      if(request && request.video && request.video.id){  
        if( request.isSearchQuery){  
          console.log("new video :" + request.video.id + " video list" +JSON.stringify(this.videoList)+ "new history :" + localStorage.getItem("history"))
        }else{
          let index = this.videoList.findIndex(video=> {
            console.log("video id: " + video.id + " request video : " + request.video.id)
            return video.id === request.video.id
          })
          console.log("index is :" + index)
          this.videoList.splice(index,1)
        }
        this.videoList.unshift(request.video)
        localStorage.setItem("history", JSON.stringify(this.videoList))
      }
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSelect(video:Video){
    this.dataService.loadVideo({video:video})
  }
  
}
