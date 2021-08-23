import { Component } from '@angular/core';
import { Video } from './model/video';
import { DataService } from './shared/services/data.service';
import { SideBarType } from './sidebar-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-player'
  currentVideo!:Video
  eSidebarType = SideBarType
  sideBarType = SideBarType.History
  bookmarked =0

  constructor(private dataService: DataService){}

  toggle(sideBar: SideBarType){
    this.sideBarType = sideBar
  }

  bookmark(){
    this.dataService.bookmarkVideo(this.currentVideo)
    this.currentVideo.isBookmarked = !this.currentVideo.isBookmarked
  }

  onBookmarked(numberOfBookmarks: any){
    this.bookmarked = numberOfBookmarks
    console.log("bookmark size : " + this.bookmarked)
  }

  onNewSearch(video: any){
    this.currentVideo = video
    this.dataService.addToHistory(video)
  }
  onLoadVideo(video: any){
    this.currentVideo = video
  }
}
