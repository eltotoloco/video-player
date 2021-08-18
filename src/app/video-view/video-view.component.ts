import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';
import { Video } from '../model/video';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy {

  video!: Video
  safeUrl!:SafeResourceUrl
  constructor(private sanitizer: DomSanitizer, private data: DataService) { }
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.data.currentVideo.subscribe(video =>{ 
      this.video = video
      if(video.id)
        this.safeUrl = this.getSanitizedUrl(video.id)
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSanitizedUrl(id : string) { 
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id); 
}

}
