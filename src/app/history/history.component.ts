import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../model/video';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  videoList!:Video[]
  selectedVideo?:Video
  subscription!: Subscription;
  
  @Output() loadVideo = new EventEmitter<any>();

  constructor(private dataService: DataService) { }
  
  
  ngOnInit() {
    this.dataService.getHistory().subscribe(data=>{
      this.videoList = data
    })
    
    this.subscription = this.dataService.videoRequested$.subscribe(video =>{ 
      if(video && video.id){  
          this.dataService.callAddToHistory(video).subscribe(data => {
            this.videoList = data
          })
      }
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSelect(video:Video){
    this.loadVideo.emit(video)
  }
  
}
