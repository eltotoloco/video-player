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
  @Output() loadVideo = new EventEmitter<any>();
  @Output() newBookmark = new EventEmitter<any>();

  subscription!: Subscription;

  constructor(private dataService: DataService) { }
  
  
  ngOnInit() {
    //On init we retrieve the bookmarks and share the count with the app
    this.dataService.getBookmarks().subscribe(data=>{
      this.videoList = data
      this.newBookmark.emit(this.videoList.length)
    })
    //we subscribe to the bookmarked event to process bookmarking
    this.subscription = this.dataService.videoBookmarked$.subscribe(video =>{ 
      if(video &&video.id){  
          this.dataService.callBookmarkVideo(video).subscribe(data => {
            this.videoList = data
            this.newBookmark.emit(this.videoList.length)
          })
      }
    })
  }
  
  ngOnDestroy() {
  }
  
  isBookmarked(videoId:string){
    return this.videoList.findIndex(video=> video.id === videoId) > -1
  }

  onSelect(video:Video){
    this.loadVideo.emit(video)
  }
  
}
