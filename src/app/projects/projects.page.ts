import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  url='http://localhost:3000/projects';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let response = this.http.get(this.url);
    response.subscribe((resp)=>console.log(resp));
  }

  searchData(title, search){

  }

  getDeatails(){

  }

}
