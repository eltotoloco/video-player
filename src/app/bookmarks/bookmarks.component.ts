import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../model/video';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit, OnDestroy {
  
  videoList!:Video[]
  selectedVideo?:Video
  subscription!: Subscription;
  @Output() newBookmark = new EventEmitter<any>();
  
  constructor(private dataService: DataService) { }
  
  
  ngOnInit() {
    this.videoList = this.dataService.getBookmarks()
    this.subscription = this.dataService.videoBookmarked$.subscribe(video =>{ 
      if(video && video.id){
        console.log("is already bookmarked : " + video.isBookmarked)
        if(!video.isBookmarked){
          let index = this.videoList.findIndex(item => {return item.id === video.id} )
          if(index>-1){
            this.videoList.splice(index,1)
          }  
        }else{
          this.videoList.unshift(video)
        }
        localStorage.setItem("bookmarks", JSON.stringify(this.videoList))

        this.newBookmark.emit(this.videoList.length);
      }
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  isBookmarked(videoId:string){
    return this.videoList.findIndex(video=> video.id === videoId) > -1
  }

  
  onSelect(video:Video){
    video.isBookmarked=true
    this.dataService.loadVideo({video:video})
  }
  
}
