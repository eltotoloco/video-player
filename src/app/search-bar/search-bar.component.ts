import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchValue!:string
  subscription!: Subscription;

  constructor(private data: DataService) { }

  ngOnInit() {
   // this.subscription = this.data.currentUrl.subscribe(url => this.searchValue = url)
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }


  search(data: any){
    console.log(data.searchValue.split("v=")[1])
    
    this.data.loadVideo({id : (data.searchValue.split("v=")[1])})
  }

}
