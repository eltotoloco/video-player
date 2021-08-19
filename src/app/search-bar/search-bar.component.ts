import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/services/data.service';
import { LoadRequest } from '../shared/services/load-request';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchValue!:string

  constructor(private data: DataService) { }

  ngOnInit() {
  }


  search(data: any){
    let video = {id : (data.searchValue.split("v=")[1]), url:data.searchValue}
    let request = { isSearchQuery:true, video:video}
    this.data.loadVideo(request)
    this.searchValue=""
  }

}
