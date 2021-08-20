import { Component } from '@angular/core';
import { SideBarType } from './sidebar-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-player';
  eSidebarType = SideBarType
  sideBarType = SideBarType.History
  bookmarked =0

  toggle(sideBar: SideBarType){
    this.sideBarType = sideBar
  }

  onBookmarked(numberOfBookmarks: any){

    this.bookmarked = numberOfBookmarks
    console.log("bookmark size : " + this.bookmarked)
  }
}
