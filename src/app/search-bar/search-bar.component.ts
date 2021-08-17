import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  videoUrl =''
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(searchForm: string){
    console.log(searchForm)
  }

}
