import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../model/video';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() video!:Video
  safeUrl!:SafeResourceUrl
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges){
    for (let propName in changes) {
      if (propName === 'video') {
        this.updateUrl();
      }
    }  
  }

  updateUrl() { 
    if(this.video)
      this.safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.id); 
}

}
