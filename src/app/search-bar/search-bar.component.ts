import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchValue!:string
//  urlPattern = "^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*"
  urlPattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
  @Output() newSearch = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }


  search(data: any){
    let video = {id : (data.searchValue.split("v=")[1]), url:data.searchValue}
    this.newSearch.emit(video)
    this.searchValue=""
  }

}
